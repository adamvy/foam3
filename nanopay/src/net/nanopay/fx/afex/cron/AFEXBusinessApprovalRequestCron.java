package net.nanopay.fx.afex.cron;

import static foam.mlang.MLang.AND;
import static foam.mlang.MLang.EQ;
import static foam.mlang.MLang.INSTANCE_OF;

import java.util.Calendar;
import java.util.List;

import foam.core.ContextAgent;
import foam.core.X;
import foam.dao.ArraySink;
import foam.dao.DAO;
import foam.mlang.MLang;
import foam.nanos.approval.ApprovalRequest;
import foam.nanos.approval.ApprovalRequestUtil;
import foam.nanos.approval.ApprovalStatus;
import net.nanopay.fx.afex.AFEXBusiness;
import net.nanopay.fx.afex.AFEXBusinessApprovalRequest;
import net.nanopay.fx.afex.AFEXCredentials;

public class AFEXBusinessApprovalRequestCron implements ContextAgent {

  @Override
  public void execute(X x) {

    process(x);
  }

  public void process(X x) {
    DAO approvalRequestDAO = ((DAO) x.get("approvalRequestDAO"));
    List pendinApprovals = ((ArraySink) approvalRequestDAO
      .where(AND(
        INSTANCE_OF(AFEXBusinessApprovalRequest.class),
        EQ(AFEXBusinessApprovalRequest.STATUS, ApprovalStatus.REQUESTED))
      ).select(new ArraySink())).getArray();

    DAO credentialDAO = (DAO) x.get("afexCredentialDAO");
    DAO afexBusinessDAO = (DAO) x.get("afexBusinessDAO");
    for (Object obj : pendinApprovals) {
      AFEXBusinessApprovalRequest request = (AFEXBusinessApprovalRequest) obj;
      if ( ApprovalRequestUtil.getStatus(x, request.getObjId(), request.getClassification()) == ApprovalStatus.REQUESTED ) {
        if ( ! foam.util.SafetyUtil.isEmpty(request.getAfexBusinessId()) ) {
          AFEXBusiness afexBusiness = (AFEXBusiness) afexBusinessDAO.find(request.getAfexBusinessId());
          AFEXCredentials credentials = (AFEXCredentials) credentialDAO.find(MLang.EQ(AFEXCredentials.SPID, afexBusiness.findUser(x).getSpid()));
          boolean bufferElapsed = false;
          Calendar now = Calendar.getInstance();
          Calendar eta = Calendar.getInstance();
          eta.setTime(request.getCreated());
          eta.add(Calendar.MINUTE, credentials.getClientApprovalDelay());
          bufferElapsed = (now.after(eta));
          if ( bufferElapsed ) {
            request = (AFEXBusinessApprovalRequest) request.fclone();
            request.setStatus(ApprovalStatus.APPROVED);
            approvalRequestDAO.put(request);
          }
        } else {
          Exception e = new Exception("AFEXBusinessApprovalRequest missing afexBusinessId");
          foam.nanos.logger.Logger logger = (foam.nanos.logger.Logger) x.get("logger");
          logger.warning(this.getClass().getSimpleName(), "AFEXBuinessApprovalRequest missing afexBusinessId", request, e);
        }
      } else if ( ApprovalRequestUtil.getStatus(x, request.getObjId(), request.getClassification()) == ApprovalStatus.APPROVED ) {
        approvalRequestDAO.where(AND(
          EQ(ApprovalRequest.DAO_KEY, request.getDaoKey()),
          EQ(ApprovalRequest.OBJ_ID, request.getObjId()),
          EQ(ApprovalRequest.CLASSIFICATION, request.getClassification()),
          EQ(ApprovalRequest.STATUS, ApprovalStatus.REQUESTED)))
        .removeAll();
      }
    }
  }
}
