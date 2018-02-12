package net.nanopay.tx;

import foam.core.FObject;
import foam.core.X;
import foam.dao.DAO;
import foam.dao.Sink;
import foam.dao.ProxyDAO;
import static foam.mlang.MLang.*;
import foam.mlang.sink.Count;
import foam.mlang.sink.Sum;
import foam.nanos.auth.User;
import net.nanopay.model.Account;
import net.nanopay.model.Broker;
import net.nanopay.tx.model.Transaction;
import net.nanopay.cico.model.TransactionType;
import net.nanopay.tx.model.TransactionLimit;
import net.nanopay.tx.model.TransactionLimitTimeFrame;
import net.nanopay.tx.model.TransactionLimitType;
import java.util.Calendar;
import java.util.Date;

public class TransactionLimitCheckDAO
  extends ProxyDAO
{

  // Constants used to get the predefined limit values from the Transaction limits(through the property name)
  protected static final String DEFAULT_USER_TRANSACTION_LIMIT   = "default_user";
  protected static final String DEFAULT_BROKER_TRANSACTION_LIMIT = "default_broker";

  public TransactionLimitCheckDAO(DAO delegate) {
    setDelegate(delegate);
  }

  public TransactionLimitCheckDAO(X x, DAO delegate) {
    setX(x);
    setDelegate(delegate);
  }

  // @Override
  public FObject put_(X x, FObject fObject) throws RuntimeException {
    Transaction transaction = (Transaction) fObject;
    System.out.println("test");
    DAO userDAO = (DAO)  getX().get("localUserDAO");
    User payee  = (User) userDAO.find(transaction.getPayeeId());
    User payer  = (User) userDAO.find(transaction.getPayerId());

    if ( payee == null || payer == null ) {
      throw new RuntimeException("No Payer or Payee.");
    }

    // If It's CICO transaction, ignore transaction limits.
    if ( transaction.getPayeeId() == transaction.getPayerId() ) {
      return getDelegate().put_(x, transaction);
    }


    Long firstLock  = transaction.getPayerId() < transaction.getPayeeId() ? transaction.getPayerId() : transaction.getPayeeId();
    Long secondLock = transaction.getPayerId() > transaction.getPayeeId() ? transaction.getPayerId() : transaction.getPayeeId();

    synchronized ( firstLock ) {
      synchronized ( secondLock ) {

        if ( ! limitsNotAbove(transaction, payer, isBroker(payer), TransactionLimitType.SEND,    true) ||
             ! limitsNotAbove(transaction, payee, isBroker(payee), TransactionLimitType.RECEIVE, false) ) {
          throw new RuntimeException("Transaction Limits overstepped.");
        }

        return getDelegate().put_(x, transaction);
      }
    }
  }

  // Checking whether user is a Broker
  protected boolean isBroker(User user) {
    Sink count    = new Count();
    DAO brokerDAO = (DAO) getX().get("brokerDAO");

    count = brokerDAO.where(EQ(user.getId(), Broker.USER_ID)).limit(1).select(count);

    return ( (Count) count).getValue() > 0;
  }

  // Checking if user overstepped its limits
  protected boolean limitsNotAbove(Transaction transaction, User user, boolean isBroker, TransactionLimitType type, boolean isPayer) {
    DAO transactionLimitDAO = (DAO) getX().get("transactionLimitDAO");
    TransactionLimit[] userLimits = (TransactionLimit[]) user.getTransactionLimits();

    for ( TransactionLimitTimeFrame timeFrame : TransactionLimitTimeFrame.values() ) {
      boolean isDefault      = true;
      long    userLimitValue = 0;

      for ( TransactionLimit userLimit : userLimits ) {
        if ( userLimit.getTimeFrame() == timeFrame && userLimit.getType() == type ) {
          isDefault = false;
          userLimitValue = userLimit.getAmount();
          break;
        }
      }
      if ( isDefault ) {
        String limitName = DEFAULT_USER_TRANSACTION_LIMIT;
        if( isBroker ) {
          limitName = DEFAULT_BROKER_TRANSACTION_LIMIT;
        }
        DAO sumLimitDAO = transactionLimitDAO.where(AND(
            EQ(limitName, TransactionLimit.NAME),
            EQ(type,      TransactionLimit.TYPE),
            EQ(timeFrame, TransactionLimit.TIME_FRAME)));

        userLimitValue = ((Double)(((Sum) sumLimitDAO.select(SUM(TransactionLimit.AMOUNT))).getValue())).longValue();
      }
      if ( isOverTimeFrameLimit(transaction, user, timeFrame, userLimitValue, isPayer) ) {
        return false;
      }
    }
    return true;
  }

  // Check if user reached period for a given timeframe and limit
  protected boolean isOverTimeFrameLimit(Transaction transaction, User user, TransactionLimitTimeFrame timeFrame, long limit, boolean isPayer) {

    long userTransactionAmount = 0;
    switch( (TransactionLimitTimeFrame) timeFrame ) {
      case DAY :
        userTransactionAmount = getTransactionAmounts(user, isPayer, Calendar.HOUR_OF_DAY);
        break;
      case WEEK :
        userTransactionAmount = getTransactionAmounts(user, isPayer, Calendar.DAY_OF_WEEK);
        break;
      case MONTH :
        userTransactionAmount = getTransactionAmounts(user, isPayer, Calendar.DAY_OF_MONTH);
        break;
      case YEAR :
        userTransactionAmount = getTransactionAmounts(user, isPayer, Calendar.DAY_OF_YEAR);
        break;
    }
    return ( ( userTransactionAmount + transaction.getAmount() ) > limit);
  }

  // Getting user amount spent given a time period
  protected long getTransactionAmounts(User user, boolean isPayer, int calendarType) {

    Date firstDate = getDayOfCurrentPeriod(calendarType, MaxOrMin.MIN);
    Date lastDate = getDayOfCurrentPeriod(calendarType, MaxOrMin.MAX);

    DAO list = getDelegate().where(AND(
        EQ(user.getId(), ( isPayer ? Transaction.PAYER_ID : Transaction.PAYEE_ID ) ),
        NEQ(Transaction.TYPE, TransactionType.CASHOUT ),
        NEQ(Transaction.TYPE, TransactionType.CASHIN ),
        GTE(Transaction.DATE, firstDate ),
        LTE(Transaction.DATE, lastDate )));

    return ((Double)(((Sum) list.select(SUM(Transaction.AMOUNT))).getValue())).longValue();
  }

  // Enum to facilitate getting Max or Min hour of each date
  protected enum MaxOrMin {
    MAX, MIN;
  }

  // return min or max date:hour for a specific period according to parameters
  protected Date getDayOfCurrentPeriod(int period, MaxOrMin maxOrMin) {
    // get start of this week in milliseconds
    Calendar cal = Calendar.getInstance();

    if ( maxOrMin == MaxOrMin.MAX ) {
      cal.set(period, cal.getActualMaximum(period));
      return getEndOfDay(cal);
    }

    cal.set(period, cal.getActualMinimum(period));
    return getStartOfDay(cal);
  }

  // Setting hours, minutes, seconds and milliseconds to maximum
  protected Date getEndOfDay(Calendar calendar) {
    calendar.set(Calendar.HOUR_OF_DAY, 23);
    calendar.set(Calendar.MINUTE, 59);
    calendar.set(Calendar.SECOND, 59);
    calendar.set(Calendar.MILLISECOND, 999);
    return calendar.getTime();
  }

  // Setting hours, minutes, seconds and milliseconds to minimum
  protected Date getStartOfDay(Calendar calendar) {
    calendar.set(Calendar.HOUR_OF_DAY, 0);
    calendar.set(Calendar.MINUTE, 0);
    calendar.set(Calendar.SECOND, 0);
    calendar.set(Calendar.MILLISECOND, 0);
    return calendar.getTime();
  }
}
