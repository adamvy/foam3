package net.nanopay.account;

import foam.core.X;
import foam.core.ContextAwareSupport;
import foam.dao.DAO;
import static foam.mlang.MLang.INSTANCE_OF;
import foam.nanos.auth.User;
import foam.nanos.logger.Logger;

import net.nanopay.model.Business;

public class DigitalAccountService
  extends ContextAwareSupport
  implements DigitalAccountServiceInterface {

  public DigitalAccount findDefault(X x, String denomination) {
    User user = (User) x.get("user");
    if ( user instanceof Business || user.getGroup().equals("sme") ) {
      DAO accountDAO = (DAO) x.get("accountDAO");
      OverdraftAccount overdraft = (OverdraftAccount) OverdraftAccount.findDefault(x, user, denomination, new OverdraftAccount()).fclone();
      DebtAccount debtAccount = (DebtAccount) accountDAO.put(new DebtAccount.Builder(x).setDebtorAccount(overdraft.getId()).build());
      overdraft.setDebtAccount(debtAccount.getId());
      overdraft = (OverdraftAccount) accountDAO.put(overdraft).fclone();
      return overdraft;
    } else {
       return DigitalAccount.findDefault(x, user, denomination);
    }
  }
}
