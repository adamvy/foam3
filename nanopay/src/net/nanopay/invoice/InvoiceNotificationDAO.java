package net.nanopay.invoice;

import foam.core.FObject;
import foam.core.X;
import foam.dao.DAO;
import foam.dao.ProxyDAO;
import foam.nanos.auth.User;
import net.nanopay.invoice.model.Invoice;
import net.nanopay.invoice.ui.NewInvoiceNotification;

public class InvoiceNotificationDAO extends ProxyDAO {

  protected DAO userDAO_;
  protected DAO notificationDAO_;

  enum InvoiceType {
    RECEIVABLE, PAYABLE;
  }

  public InvoiceNotificationDAO(X x, DAO delegate) {
    super(x, delegate);
    userDAO_ = (DAO) x.get("localUserDAO");
    notificationDAO_ = (DAO) x.get("notificationDAO");
  }

  @Override
  public FObject put_(X x, FObject obj) {
    Invoice invoice = (Invoice) obj;
    sendInvoiceNotification(notificationDAO_, invoice);
    // Put to the DAO
    return super.put_(x, invoice);
  }

  private void sendInvoiceNotification(DAO notificationDAO, Invoice invoice) {
    Long sendToUserId;
    Long fromUserId;
    String invoiceType;
    Long payeeId = (Long) invoice.getPayeeId();
    Long payerId = (Long) invoice.getPayerId();
    // for the notification of receivable invoice
    if (payeeId == invoice.getCreatedBy()) {
      sendToUserId = payerId;
      fromUserId = payeeId;
      // for the receiver, the invoice is payable type
      invoiceType = InvoiceType.PAYABLE.name();
    } else {
      sendToUserId = payeeId;
      fromUserId = payerId;
      // for the receiver, the invoice is receivable type
      invoiceType = InvoiceType.RECEIVABLE.name();
    }

    NewInvoiceNotification notification = new NewInvoiceNotification();
    notification.setUserId(sendToUserId);
    notification.setFromUserId(fromUserId);
    notification.setNotificationType("Invoice received");
    notification.setInvoiceType(invoiceType);
    notification.setInvoiceId(invoice.getId());
    notification.setAmount(invoice.getAmount());
    notificationDAO.put(notification);
  }
}