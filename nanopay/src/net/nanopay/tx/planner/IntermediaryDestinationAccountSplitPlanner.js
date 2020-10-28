/**
 * NANOPAY CONFIDENTIAL
 *
 * [2020] nanopay Corporation
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of nanopay Corporation.
 * The intellectual and technical concepts contained
 * herein are proprietary to nanopay Corporation
 * and may be covered by Canadian and Foreign Patents, patents
 * in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from nanopay Corporation.
 */

foam.CLASS({
  package: 'net.nanopay.tx.planner',
  name: 'IntermediaryDestinationAccountSplitPlanner',
  extends: 'net.nanopay.tx.planner.AbstractTransactionPlanner',

  documentation: `Split src currency to dest currency via intermediary currency
    when the destination amount is given.

    The source amount will be calculated based on the foreign exchanges from the
    destination currency to the intermediary currency then to the source
    currency.`,

  javaImports: [
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.dao.MDAO',
    'net.nanopay.account.Account',
    'net.nanopay.bank.BankAccount',
    'net.nanopay.fx.FXSummaryTransaction',
    'net.nanopay.payment.CorridorService',
    'net.nanopay.payment.PaymentProviderAware',
    'net.nanopay.payment.PaymentProviderCorridor',
    'net.nanopay.tx.TransactionQuote',
    'net.nanopay.tx.model.Transaction',
    'net.nanopay.tx.model.TransactionStatus',
    'java.util.List'
  ],

  properties: [
    {
      name: 'bestPlan',
      value: true
    },
    {
      class: 'Map',
      name: 'intermediaryAccountId',
      javaFactory: `return new java.util.HashMap<String, Long>();`
    },
    {
      class: 'Int',
      name: 'depth',
      javaFactory: `return 1;`
    },
    {
      name: 'multiPlan_',
      value: true
    }
  ],

  methods: [
    {
      name: 'getIntermediateCurrencies',
      args: [
        { name: 'x', type: 'Context' },
        { name: 'requestTxn', type: 'net.nanopay.tx.model.Transaction' },
        { name: 'intermediaryCurrencies', type: 'String[]' }
      ],
      type: 'String[]',
      javaCode: `
        // Figure out best intermediary
        CorridorService cs = (CorridorService) x.get("corridorService");
        List srcCorridors = cs.getAllWithSrc(x, requestTxn.getSourceCurrency());
        List destCorridors = cs.getAllWithTarget(x, requestTxn.getDestinationCurrency());
        MDAO ppcDAO = new MDAO(PaymentProviderCorridor.getOwnClassInfo());

        if ( srcCorridors.size() <= destCorridors.size() ) {
          for (int i=0;i<srcCorridors.size();i++) {
            PaymentProviderCorridor temp = (PaymentProviderCorridor) srcCorridors.get(i);
            for (int j=0;j<temp.getTargetCurrencies().length;j++) {
              List corridorPaymentProviders = cs.getCorridorPaymentProviders(x, temp.getTargetCountry(), ((BankAccount) requestTxn.findDestinationAccount(x)).getCountry(), temp.getTargetCurrencies()[j], requestTxn.getDestinationCurrency());
              for ( int k=0; k< corridorPaymentProviders.size(); k++ ) {
                PaymentProviderCorridor temp2 = (PaymentProviderCorridor) corridorPaymentProviders.get(k);
                temp2.setRanking(temp.getRanking()+temp2.getRanking());
                temp2.setCurrency(temp.getTargetCurrencies()[j]);
                ppcDAO.put(temp2);
              }
            }
          }
        } else {
          for (int i=0;i<destCorridors.size();i++) {
            PaymentProviderCorridor temp = (PaymentProviderCorridor) destCorridors.get(i);
            for (int j=0;j<temp.getSourceCurrencies().length;j++) {
              List corridorPaymentProviders = cs.getCorridorPaymentProviders(x, ((BankAccount) requestTxn.findSourceAccount(x)).getCountry(), temp.getSourceCountry(), requestTxn.getSourceCurrency(), temp.getSourceCurrencies()[j]);
              for ( int k=0; k< corridorPaymentProviders.size(); k++ ) {
                PaymentProviderCorridor temp2 = (PaymentProviderCorridor) corridorPaymentProviders.get(k);
                temp2.setRanking(temp.getRanking() + temp2.getRanking());
                temp2.setCurrency(temp.getSourceCurrencies()[j]);
                ppcDAO.put(temp2);
              }
            }
          }
        }
        ArraySink sink = new ArraySink();
        ppcDAO.orderBy(PaymentProviderCorridor.RANKING).limit(this.getDepth()).select(sink);
        List array = sink.getArray();
        for ( int i=0; i<this.getDepth(); i++) {
          intermediaryCurrencies[i] = ((PaymentProviderCorridor) array.get(i)).getCurrency();
        }
        return intermediaryCurrencies;
      `
    },
    {
      name: 'plan',
      javaCode: `
        if ( requestTxn.getDestinationAmount() > 0 ) {
          String[] intermediaryCurrencies = new String[this.getDepth()];
          getIntermediateCurrencies(x,requestTxn, intermediaryCurrencies);
        
          var dao = (DAO) x.get("localTransactionPlannerDAO");
          var accountDAO = (DAO) x.get("localAccountDAO");

          for ( int i=0; i<this.getDepth(); i++ ) {
            var q1 = new TransactionQuote();

            var intermediaryAccount = (Account) accountDAO.find(this.getIntermediaryAccountId().get(intermediaryCurrencies[i]));

            // plan intermediary to dest currency (leg2)
            var t1 = (Transaction) requestTxn.fclone();
            t1.clearLineItems();
            t1.setSourceCurrency(intermediaryAccount.getDenomination());
            t1.setSourceAccount(intermediaryAccount.getId());
            t1.setAmount(0);
            var leg2 = quoteTxn(x, t1, quote, false);
            if ( leg2 == null ) {
              return null;
            }

            // plan src to intermediary currency (leg1)
            var t2 = (Transaction) requestTxn.fclone();
            t2.setDestinationAccount(intermediaryAccount.getId());
            t2.setDestinationCurrency(intermediaryAccount.getDenomination());
            t2.setDestinationAmount(leg2.getAmount());
            var leg1 = quoteTxn(x, t2, quote, false);

            var fxSummary = new FXSummaryTransaction();
            fxSummary.copyFrom(requestTxn);
            fxSummary.setStatus(TransactionStatus.PENDING);
            fxSummary.setAmount(leg1.getAmount());
            fxSummary.setIntermediateAmount(leg2.getAmount());
            fxSummary.setIntermediateCurrency(intermediaryAccount.getDenomination());
            if ( leg1 instanceof PaymentProviderAware ) {
              var paymentProvider = ((PaymentProviderAware) leg1).getPaymentProvider();
              fxSummary.setPaymentProvider(paymentProvider);
            }

            Transaction l1 = leg1.getNext()[0].getNext()[0];
            Transaction l2 = leg2.getNext()[0].getNext()[0];
            Transaction compliance = createComplianceTransaction(fxSummary);
            l1.setStatus(TransactionStatus.PENDING);
            l2.setStatus(TransactionStatus.PENDING);
            l1.addNext(l2);
            compliance.addNext(l1);
            fxSummary.addNext(compliance);
            quote.getAlternatePlans_().add(fxSummary);
          }
        }
        return null;
      `
    }
  ]
});
