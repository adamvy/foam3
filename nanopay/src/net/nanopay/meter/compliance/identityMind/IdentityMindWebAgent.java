package net.nanopay.meter.compliance.identityMind;

import foam.core.X;
import foam.dao.DAO;
import foam.lib.json.JSONParser;
import foam.nanos.http.HttpParameters;
import foam.nanos.http.WebAgent;
import foam.nanos.logger.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import net.nanopay.approval.ApprovalStatus;
import net.nanopay.meter.compliance.ComplianceApprovalRequest;
import net.nanopay.meter.compliance.ComplianceValidationStatus;

import static foam.mlang.MLang.*;

public class IdentityMindWebAgent implements WebAgent {
  
  public IdentityMindWebAgent() {}

  public void execute(X x) {
    DAO identityMindResponseDAO = (DAO) x.get("identityMindResponseDAO");
    DAO approvalRequestDAO = (DAO) x.get("approvalRequestDAO");
    Logger logger = (Logger) x.get("logger");
    HttpParameters p = x.get(HttpParameters.class);
    String data = p.getParameter("data");
    HttpServletRequest request = x.get(HttpServletRequest.class);
    HttpServletResponse response = x.get(HttpServletResponse.class);
    JSONParser jsonParser = new JSONParser();
    jsonParser.setX(x);

    try {
      IdentityMindResponse webhookResponse = (IdentityMindResponse)
        jsonParser.parseString(data, IdentityMindResponse.class);

      IdentityMindResponse idmResponse = (IdentityMindResponse) identityMindResponseDAO.find(
        EQ(IdentityMindResponse.TID, webhookResponse.getTid())
      );

      idmResponse = (IdentityMindResponse) idmResponse.fclone();
      idmResponse.copyFrom(webhookResponse);
      identityMindResponseDAO.put(idmResponse);

      ComplianceApprovalRequest approvalRequest = (ComplianceApprovalRequest) approvalRequestDAO.find(
        EQ(ComplianceApprovalRequest.CAUSE_ID, idmResponse.getId())
      );

      if ( approvalRequest != null ) {
        approvalRequest = (ComplianceApprovalRequest) approvalRequest.fclone();
        if (idmResponse.getComplianceValidationStatus() == ComplianceValidationStatus.VALIDATED) {
          approvalRequest.setStatus(ApprovalStatus.APPROVED);
        } else if (idmResponse.getComplianceValidationStatus() == ComplianceValidationStatus.REJECTED) {
          approvalRequest.setStatus(ApprovalStatus.REJECTED);
        }
        approvalRequestDAO.put(approvalRequest);
      }
    } catch (Exception e) {
      String message = String.format("IdentityMindWebAgent failed.", request.getClass().getSimpleName());
      logger.error(message, e);
      try {
		    response.sendError(HttpServletResponse.SC_BAD_REQUEST, message);
	     } catch (IOException e1) {
        logger.error(message, e1);
	     }
    }
  }
}
