package net.nanopay.transactionservice;

import foam.core.FObject;
import foam.core.X;
import foam.dao.DAO;
import foam.dao.ProxyDAO;
import net.nanopay.common.model.User;
import net.nanopay.transactionservice.model.Transaction;
import foam.dao.Sink;
import foam.mlang.MLang;
import foam.mlang.order.Comparator;
import foam.mlang.predicate.Predicate;

//TODO:Change print statements to throw exceptions when they are ready
public class AuthenticatedTransactionDAO
  extends ProxyDAO
{
  public AuthenticatedTransactionDAO(DAO delegate) {
    setDelegate(delegate);
  }

  @Override
  public FObject put_(X x, FObject obj) {
    User user               = (User) x.get("user");
    Transaction transaction = (Transaction) obj;

    if ( user == null ) {
      System.out.println("User is not logged in");
      return null;
    }

    if ( transaction.getPayerId() != user.getId() ) {
      System.out.println("User is not allowed");
      return null;
    }

    return getDelegate().put(obj);
  }

  @Override
  public FObject find_(X x, Object id) {
    return null;
  }

  @Override
  public Sink select_(X x, Sink sink, long skip, long limit, Comparator order, Predicate predicate) {
    User user = (User) x.get("user");

    if ( user == null ) {
      System.out.println("User is not logged in");
      return null;
    }

    return getDelegate()
    .where(
      MLang.OR(
        MLang.EQ(Transaction.PAYER_ID, user.getId()),
        MLang.EQ(Transaction.PAYEE_ID, user.getId())
      )
    ).select_(x, sink, skip, limit, order, predicate);
  }

  @Override
  public FObject remove(FObject obj) {
    return null;
  }

  @Override
  public void removeAll() {
    return;
  }
}
