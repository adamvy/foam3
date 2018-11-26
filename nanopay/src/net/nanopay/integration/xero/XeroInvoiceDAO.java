package net.nanopay.integration.xero;

import com.xero.api.XeroClient;
import com.xero.model.InvoiceStatus;
import com.xero.model.Payment;
import foam.core.FObject;
import foam.core.X;
import foam.dao.DAO;
import foam.dao.ProxyDAO;
import foam.dao.RemoveSink;
import foam.nanos.app.AppConfig;
import foam.nanos.auth.Group;
import foam.nanos.auth.User;
import foam.nanos.logger.Logger;
import net.nanopay.account.Account;
import net.nanopay.bank.BankAccount;
import net.nanopay.integration.AccountingBankAccount;
import net.nanopay.integration.ResultResponse;
import net.nanopay.integration.xero.model.XeroInvoice;
import net.nanopay.invoice.model.Invoice;
import net.nanopay.tx.model.Transaction;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class XeroInvoiceDAO
  extends ProxyDAO {
  protected DAO userDAO_;

  public XeroInvoiceDAO(X x, DAO delegate) {
    setX(x);
    setDelegate(delegate);
    userDAO_ = (DAO) x.get("localUserDAO");
  }
  public FObject put_(X x, FObject obj) {

    Transaction            transaction = (Transaction) obj;
    DAO                    invoiceDAO  = (DAO) x.get("invoiceDAO");
    DAO                    accountDAO  = (DAO) x.get("localAccountDAO");
    Invoice                invoice     = (Invoice) invoiceDAO.find(transaction.getInvoiceId());
    Account                account     = (Account) accountDAO.find(transaction.getSourceAccount());
    XeroIntegrationService xero        = (XeroIntegrationService) x.get("xeroSignIn");
    User                   user        = (User) x.get("user");

    if ( ! (account instanceof BankAccount) ) {
      return getDelegate().put_(x, obj);
    }
    if ( ! (invoice instanceof XeroInvoice) ) {
      return getDelegate().put_(x, obj);
    }
    BankAccount bankAccount = (BankAccount) account;
    ResultResponse signedIn = xero.isSignedIn(x, user);
    if ( ! signedIn.getResult() ) {
      throw new RuntimeException("Please Sign into Xero");
    }
    List<AccountingBankAccount> accountingList = xero.pullBanks(x, user);
    if ( accountingList.isEmpty() ) {
      throw new RuntimeException("No bank accounts found in Xero");
    }
    int i;
    AccountingBankAccount intBank;
    boolean foundBank = false;
    for ( i = 0; i < accountingList.size(); i++ ) {
      intBank = accountingList.get(i);
      if ( bankAccount.getIntegrationId().equals(intBank.getAccountingId()) ) {
        foundBank = true;
        break;
      }
    }
    if ( ! foundBank ) {
      throw new RuntimeException("No bank accounts synchronised to Xero");
    }
    FObject             ret          = getDelegate().put_(x, obj);
    Group               group        = user.findGroup(x);
    XeroInvoice         xInvoice     = (XeroInvoice) invoice;
    AppConfig           app          = group.getAppConfig(x);
    DAO                 configDAO    = (DAO) x.get("xeroConfigDAO");
    DAO                 store        = (DAO) x.get("xeroTokenStorageDAO");
    XeroTokenStorage    tokenStorage = (XeroTokenStorage) store.find(user.getId());
    XeroConfig          config       = (XeroConfig)configDAO.find(app.getUrl());
    XeroClient          client_      = new XeroClient(config);
    transaction = (Transaction) ret;
    Logger              logger       = (Logger) x.get("logger");
    client_.setOAuthToken(tokenStorage.getToken(), tokenStorage.getTokenSecret());
    try {

      List<com.xero.model.Account> xeroAccountsList = client_.getAccounts();
      int j;
      for (j = 0; j < xeroAccountsList.size(); j++) {
        com.xero.model.Account xeroAccount = xeroAccountsList.get(j);
        if( xeroAccount.getAccountID().equals(bankAccount.getIntegrationId()) ) {
          break;
        }
      }
      com.xero.model.Invoice           xeroInvoice     = client_.getInvoice(xInvoice.getXeroId());
      com.xero.model.Account           xeroAccount     = xeroAccountsList.get(j);
      List<com.xero.model.Invoice>     xeroInvoiceList = new ArrayList<>();

      // Checks to see if the xero invoice was set to Authorized before; if not sets it to authorized
      if ( ! (InvoiceStatus.AUTHORISED == xeroInvoice.getStatus()) ) {
        xeroInvoice.setStatus(InvoiceStatus.AUTHORISED);
        xeroInvoiceList.add(xeroInvoice);
        client_.updateInvoice(xeroInvoiceList);
      }

      // Creates a payment for the full amount for the invoice and sets it paid to the dummy account on xero
      Payment payment = new Payment();
      payment.setInvoice(xeroInvoice);
      payment.setAccount(xeroAccount);
      Calendar cal = Calendar.getInstance();
      cal.setTime(new Date());
      payment.setDate(cal);
      //TODO: Change when the currency is not CAD and USD
      payment.setAmount(BigDecimal.valueOf(transaction.getAmount()).movePointLeft(2));
      List<Payment> paymentList = new ArrayList<>();
      paymentList.add(payment);
      client_.createPayments(paymentList);
      return ret;
      


    } catch (Throwable e) {
      e.printStackTrace();
      logger.error(e);
      return ret;
    }


















  }
}
