package net.nanopay.tx.tp.stripe;

import foam.core.FObject;
import foam.core.X;
import foam.dao.DAO;
import foam.dao.ProxyDAO;
import foam.util.SafetyUtil;
import net.nanopay.tx.tp.TnxProcessor;
import net.nanopay.tx.tp.stripe.StripeTransactionData;
import net.nanopay.tx.model.Transaction;
import net.nanopay.tx.model.TransactionStatus;

import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.net.RequestOptions;

public class StripeTransactionDAO extends ProxyDAO {
  private static final Long STRIPE_ID = 2L;
  protected RequestOptions options_ = null;

  public StripeTransactionDAO(X x, DAO delegate) {
    this(x, "sk_test_KD0gUbEr1pATM7mTcB3eKNa0", delegate);
  }

  public StripeTransactionDAO(X x, String apiKey, DAO delegate) {
    setX(x);
    this.options_ = RequestOptions.builder().setApiKey(apiKey).build();
    setDelegate(delegate);
  }

  @Override
  public FObject put_(X x, FObject obj) throws RuntimeException {
    Transaction transaction = (Transaction) obj.fclone();
    if ( TnxProcessor.STRIPE.equals(transaction.getTxnProcessorId()) ) {
      transaction.setStatus(TransactionStatus.PENDING);

      Map<String, Object> chargeMap = new HashMap<String, Object>();
      chargeMap.put("amount", transaction.getAmount());
      chargeMap.put("currency", "cad");

      String notes = transaction.getNotes();
      chargeMap.put("description", SafetyUtil.isEmpty(notes) ? null : notes);

      StripeTransactionData data = (StripeTransactionData) transaction.getCicoTransactionData();
      if ( data != null ) {
        chargeMap.put("source", data.getStripeTokenId());
      }

      Charge charge = null;
      try {
        charge = Charge.create(chargeMap, this.options_);
        data.setStripeChargeId(charge.getId());
      } catch (StripeException e){
        if(SafetyUtil.isEmpty(e.getMessage()))
          throw new RuntimeException("Stripe transaction failed.");
        else
          throw new RuntimeException(e.getMessage());
      } finally {
        if(charge == null)
          transaction.setStatus(TransactionStatus.DECLINED);
        else
          transaction.setStatus(TransactionStatus.COMPLETED);

        return getDelegate().put_(x, transaction);
      }
    } else {
      return getDelegate().put_(x, obj);
    }
  }
}
