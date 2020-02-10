foam.CLASS({
  package: 'net.nanopay.liquidity.approvalRequest',
  name: 'ApprovableAwareDAO',
  extends: 'foam.dao.ProxyDAO',

  javaImports: [
    'foam.core.X',
    'foam.core.PropertyInfo',
    'java.util.Iterator',
    'foam.dao.DAO',
    'java.util.Map',
    'java.util.List',
    'java.util.Set',
    'foam.mlang.MLang',
    'foam.mlang.MLang.*',
    'foam.core.FObject',
    'foam.dao.ArraySink',
    'java.util.ArrayList',
    'foam.util.SafetyUtil',
    'foam.nanos.auth.User',
    'foam.core.Detachable',
    'foam.dao.AbstractSink',
    'foam.nanos.logger.Logger',
    'foam.lib.PropertyPredicate',
    'foam.nanos.ruler.Operations',
    'foam.nanos.auth.LifecycleState',
    'foam.nanos.auth.LifecycleAware',
    'foam.mlang.predicate.Predicate',
    'net.nanopay.approval.ApprovalStatus',
    'net.nanopay.approval.ApprovalRequest',
    'foam.comics.v2.userfeedback.UserFeedbackAware',
    'foam.comics.v2.userfeedback.UserFeedback',
    'foam.comics.v2.userfeedback.UserFeedbackStatus',
    'foam.comics.v2.userfeedback.UserFeedbackException',
    'net.nanopay.liquidity.ucjQuery.UCJQueryService',
    'net.nanopay.liquidity.approvalRequest.Approvable',
    'net.nanopay.liquidity.crunch.GlobalLiquidCapability',
    'net.nanopay.liquidity.approvalRequest.ApprovableAware',
    'net.nanopay.liquidity.approvalRequest.RoleApprovalRequest'
  ],

  properties: [
    {
      class: 'String',
      name: 'daoKey'
    },
    {
      class: 'Class',
      name: 'of'
    }
  ],

  methods: [
    {
      name: 'sendSingleRequest',
      type: 'void',
      args: [
        { name: 'x', type: 'Context' },
        { name: 'req', type: 'RoleApprovalRequest' },
        { name: 'userId', type: 'long' }
      ],
      javaCode: `
        RoleApprovalRequest request = (RoleApprovalRequest) req.fclone();
        request.clearId();
        request.setApprover(userId);
        ((DAO) x.get("approvalRequestDAO")).put_(x, request);
      `
    },
    {
      name: 'fullSend',
      type: 'void',
      args: [
        { name: 'x', type: 'Context' },
        { name: 'request', type: 'RoleApprovalRequest' },
        { name: 'obj', type: 'FObject' }
      ],
      javaCode:`
      DAO requestingDAO;
      Logger logger = (Logger) x.get("logger");

      if ( request.getDaoKey().equals("approvableDAO") ) {
        DAO approvableDAO = (DAO) x.get("approvableDAO");

        Approvable approvable = (Approvable) approvableDAO.find(request.getObjId());

        requestingDAO = (DAO) x.get(approvable.getDaoKey());
      } else {
        requestingDAO = (DAO) x.get(request.getDaoKey());
      }

      String modelName = requestingDAO.getOf().getObjClass().getSimpleName();

      UCJQueryService ucjQueryService = (UCJQueryService) x.get("ucjQueryService");

      List<Long> approverIds = ucjQueryService.getAllApprovers(getX(), modelName);

      if ( approverIds.size() <= 0 ) {
        logger.error("No Approvers exist for the model: " + modelName);
        throw new RuntimeException("No Approvers exist for the model: " + modelName);
      }

      if ( approverIds.size() == 1 && approverIds.get(0) == request.getInitiatingUser() ) {
        logger.log("The only approver of " + modelName + " is the maker of this request!");
        throw new RuntimeException("The only approver of " + modelName + " is the maker of this request!");
      }

      // makers cannot approve their own requests even if they are an approver for the model
      // however they will receive an approvalRequest which they can only view and not approve or reject
      // so that they can keep track of the status of their requests
      sendSingleRequest(x, request, request.getInitiatingUser());
      approverIds.remove(request.getInitiatingUser());

      for ( int i = 0; i < approverIds.size(); i++ ) {
        sendSingleRequest(getX(), request, approverIds.get(i));
      }
      `
    },
    {
      name: 'remove_',
      javaCode: `
        User user = (User) x.get("user");
        Logger logger = (Logger) x.get("logger");

        // system and admins override the approval process
        if ( user != null && ( user.getId() == User.SYSTEM_USER_ID || user.getGroup().equals("admin") || user.getGroup().equals("system") ) ) return super.remove_(x,obj);

        ApprovableAware approvableAwareObj = (ApprovableAware) obj;
        DAO approvalRequestDAO = ((DAO) getX().get("approvalRequestDAO"));

        List approvedObjRemoveRequests = ((ArraySink) approvalRequestDAO
          .where(
            foam.mlang.MLang.AND(
              foam.mlang.MLang.EQ(ApprovalRequest.DAO_KEY, getDaoKey()),
              foam.mlang.MLang.EQ(ApprovalRequest.OBJ_ID, approvableAwareObj.getApprovableKey()),
              foam.mlang.MLang.EQ(RoleApprovalRequest.OPERATION, Operations.REMOVE),
              foam.mlang.MLang.EQ(RoleApprovalRequest.IS_FULFILLED, false),
              foam.mlang.MLang.OR(
                foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.APPROVED),
                foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.REJECTED)
              )
            )
          ).select(new ArraySink())).getArray();

        if ( approvedObjRemoveRequests.size() == 1 ) {
          RoleApprovalRequest fulfilledRequest = (RoleApprovalRequest) approvedObjRemoveRequests.get(0);
          fulfilledRequest.setIsFulfilled(true);

          approvalRequestDAO.put_(getX(), fulfilledRequest);

          if ( fulfilledRequest.getStatus() == ApprovalStatus.APPROVED ) {
            return super.put_(x,obj);
          } 
          
          return null;  // as request has been REJECTED
        } 
        
        if ( approvedObjRemoveRequests.size() > 1 ) {
          logger.error("Something went wrong cannot have multiple approved/rejected requests for the same request!");
          throw new RuntimeException("Something went wrong cannot have multiple approved/rejected requests for the same request!");
        } 

        RoleApprovalRequest approvalRequest = new RoleApprovalRequest.Builder(getX())
          .setDaoKey(getDaoKey())
          .setObjId(approvableAwareObj.getApprovableKey())
          .setClassification(getOf().getObjClass().getSimpleName())
          .setOperation(Operations.REMOVE)
          .setInitiatingUser(((User) x.get("user")).getId())
          .setStatus(ApprovalStatus.REQUESTED).build(); 

        fullSend(getX(), approvalRequest, obj);

        // we need to prevent the remove_ call from being passed all the way down to actual deletion since
        // we are just creating the approval requests for deleting the object as of now
        // TODO: the following is a temporary fix will need to create an actual exception and pass feedback as a property
        // in the skeleton back to the client

        // UserFeedbackAware feedbackAwareObj = (UserFeedbackAware) obj;
        
        // UserFeedback newUserFeedback = new UserFeedback.Builder(getX())
        //     .setStatus(UserFeedbackStatus.SUCCESS)
        //     .setMessage("An approval request has been sent out.")
        //     .setNext(feedbackAwareObj.getUserFeedback()).build();

        // UserFeedbackException successException = new UserFeedbackException(getX())
        //     .setUserFeedback(newUserFeedback);

        throw new RuntimeException("An approval request has been sent out."); // we aren't updating to deleted
      `
    },
    {
      name: 'put_',
      javaCode: `
      User user = (User) x.get("user");
      Logger logger = (Logger) x.get("logger");

      LifecycleAware lifecycleObj = (LifecycleAware) obj;

      // system and admins override the approval process
      if ( user != null && ( user.getId() == User.SYSTEM_USER_ID || user.getGroup().equals("admin") || user.getGroup().equals("system") ) ) {
        if ( lifecycleObj.getLifecycleState() == LifecycleState.PENDING && user.getId() != User.SYSTEM_USER_ID ){
          lifecycleObj.setLifecycleState(LifecycleState.ACTIVE);
        } 
        else if ( lifecycleObj.getLifecycleState() == LifecycleState.PENDING && user.getId() == User.SYSTEM_USER_ID ) {
          // Adding log message in case this change breaks something unexpected
          Object primaryKey = obj instanceof foam.core.Identifiable ? ((foam.core.Identifiable)obj).getPrimaryKey() : null;
          logger.warning("SYSTEM UPDATE - Not automatically setting LifecycleState from PENDING to ACTIVE for " + obj.getClass().getSimpleName() + ": " + primaryKey);
        }
        return super.put_(x,obj);
      }

      DAO approvalRequestDAO = (DAO) getX().get("approvalRequestDAO");
      DAO dao = (DAO) getX().get(getDaoKey());

      ApprovableAware approvableAwareObj = (ApprovableAware) obj;
      FObject currentObjectInDAO = (FObject) dao.find(approvableAwareObj.getApprovableKey());
      
      if ( obj instanceof LifecycleAware && ((LifecycleAware) obj).getLifecycleState() == LifecycleState.DELETED ) {
        approvableAwareObj = (ApprovableAware) currentObjectInDAO;

        List approvedObjRemoveRequests = ((ArraySink) approvalRequestDAO
          .where(
            foam.mlang.MLang.AND(
              foam.mlang.MLang.EQ(ApprovalRequest.DAO_KEY, getDaoKey()),
              foam.mlang.MLang.EQ(ApprovalRequest.OBJ_ID, approvableAwareObj.getApprovableKey()),
              foam.mlang.MLang.EQ(RoleApprovalRequest.OPERATION, Operations.REMOVE),
              foam.mlang.MLang.EQ(RoleApprovalRequest.IS_FULFILLED, false),
              foam.mlang.MLang.OR(
                foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.APPROVED),
                foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.REJECTED)
              )
            )
          ).select(new ArraySink())).getArray();

        if ( approvedObjRemoveRequests.size() == 1 ) {
          RoleApprovalRequest fulfilledRequest = (RoleApprovalRequest) approvedObjRemoveRequests.get(0);
          fulfilledRequest.setIsFulfilled(true);

          approvalRequestDAO.put_(getX(), fulfilledRequest);

          if ( fulfilledRequest.getStatus() == ApprovalStatus.APPROVED ) {
            return super.put_(x,obj);
          } 

          return null;  // as request has been REJECTED
        } 

        if ( approvedObjRemoveRequests.size() > 1 ) {
          logger.error("Something went wrong cannot have multiple approved/rejected requests for the same request!");
          throw new RuntimeException("Something went wrong cannot have multiple approved/rejected requests for the same request!");
        } 

        RoleApprovalRequest approvalRequest = new RoleApprovalRequest.Builder(getX())
          .setDaoKey(getDaoKey())
          .setObjId(approvableAwareObj.getApprovableKey())
          .setClassification(getOf().getObjClass().getSimpleName())
          .setOperation(Operations.REMOVE)
          .setInitiatingUser(((User) x.get("user")).getId())
          .setStatus(ApprovalStatus.REQUESTED).build();

        fullSend(getX(), approvalRequest, obj);

        // UserFeedbackAware feedbackAwareObj = (UserFeedbackAware) obj;

        // TODO: the following is a temporary fix will need to create an actual exception and pass feedback as a property
        // in the skeleton back to the client

        // UserFeedback newUserFeedback = new UserFeedback.Builder(getX())
        //     .setStatus(UserFeedbackStatus.SUCCESS)
        //     .setMessage("An approval request has been sent out.")
        //     .setNext(feedbackAwareObj.getUserFeedback()).build();

        // UserFeedbackException successException = new UserFeedbackException(getX())
        //     .setUserFeedback(newUserFeedback);

        throw new RuntimeException("An approval request has been sent out."); // we aren't updating to deleted
      }

      if ( currentObjectInDAO == null || ((LifecycleAware) currentObjectInDAO).getLifecycleState() == LifecycleState.PENDING ) {
        if ( lifecycleObj.getLifecycleState() == LifecycleState.ACTIVE ) { 
          return super.put_(x,obj);
        } else if ( lifecycleObj.getLifecycleState() == LifecycleState.PENDING ) {
          List approvedObjCreateRequests = ((ArraySink) approvalRequestDAO
            .where(
              foam.mlang.MLang.AND(
                foam.mlang.MLang.EQ(ApprovalRequest.DAO_KEY, getDaoKey()),
                foam.mlang.MLang.EQ(ApprovalRequest.OBJ_ID, approvableAwareObj.getApprovableKey()),
                foam.mlang.MLang.EQ(RoleApprovalRequest.OPERATION, Operations.CREATE),
                foam.mlang.MLang.EQ(RoleApprovalRequest.IS_FULFILLED, false),
                foam.mlang.MLang.OR(
                  foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.APPROVED),
                  foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.REJECTED)
                )
              )
            ).select(new ArraySink())).getArray();

          if ( approvedObjCreateRequests.size() == 1 ) {
            RoleApprovalRequest fulfilledRequest = (RoleApprovalRequest) approvedObjCreateRequests.get(0);
            fulfilledRequest.setIsFulfilled(true);

            approvalRequestDAO.put_(getX(), fulfilledRequest);

            if ( fulfilledRequest.getStatus() == ApprovalStatus.APPROVED ) {
              lifecycleObj.setLifecycleState(LifecycleState.ACTIVE);
              return super.put_(x,obj);
            } 

            // create request has been rejected is only where we mark the object as REJECTED
            lifecycleObj.setLifecycleState(LifecycleState.REJECTED);
            return super.put_(x,obj); 
          } 
          if ( approvedObjCreateRequests.size() > 1 ) {
            logger.error("Something went wrong cannot have multiple approved/rejected requests for the same request!");
            throw new RuntimeException("Something went wrong cannot have multiple approved/rejected requests for the same request!");
          } 

          RoleApprovalRequest approvalRequest = new RoleApprovalRequest.Builder(getX())
            .setDaoKey(getDaoKey())
            .setObjId(approvableAwareObj.getApprovableKey())
            .setClassification(getOf().getObjClass().getSimpleName())
            .setOperation(Operations.CREATE)
            .setInitiatingUser(((User) x.get("user")).getId())
            .setStatus(ApprovalStatus.REQUESTED).build();

          fullSend(getX(), approvalRequest, obj);

          // we are storing the object in it's related dao with a lifecycle state of PENDING
          // TODO: Add UserFeedback to obj here
          UserFeedbackAware feedbackAwareObj = (UserFeedbackAware) obj;

          UserFeedback newUserFeedback = new UserFeedback.Builder(getX())
            .setStatus(UserFeedbackStatus.SUCCESS)
            .setMessage("An approval request has been sent out.")
            .setNext(feedbackAwareObj.getUserFeedback()).build();

          FObject clonedObj = obj.fclone();

          UserFeedbackAware feedbackAwareClonedObj = (UserFeedbackAware) clonedObj;

          feedbackAwareClonedObj.setUserFeedback(newUserFeedback);

          return super.put_(x,clonedObj);
        } else {
          logger.error("Something went wrong used an invalid lifecycle status for create!");
          throw new RuntimeException("Something went wrong used an invalid lifecycle status for create!");
        }
      } else {
        Iterator allProperties = obj.getClassInfo().getAxiomsByClass(PropertyInfo.class).iterator();

        List<String> storageTransientPropertyNames = new ArrayList<>();

        while ( allProperties.hasNext() ){
          PropertyInfo prop = (PropertyInfo) allProperties.next();

          if ( prop.getStorageTransient() ){
            storageTransientPropertyNames.add(prop.getName());
          }
        }

        // then handle the diff here and attach it into the approval request
        Map updatedProperties = currentObjectInDAO.diff(obj);

        for ( int i = 0; i < storageTransientPropertyNames.size(); i++ ){
          updatedProperties.remove(storageTransientPropertyNames.get(i));
        }

        // No change, just returns obj
        if ( updatedProperties.isEmpty() ) {
          return obj;
        }

        // change last modified by to be the user
        updatedProperties.put("lastModifiedBy", ((User) x.get("user")).getId());
        DAO approvableDAO = (DAO) getX().get("approvableDAO");

        String daoKey = "d" + getDaoKey();
        String objId = ":o" + approvableAwareObj.getApprovableKey();
        String hashedMap = ":m" + String.valueOf(updatedProperties.hashCode());
  
        String hashedId = daoKey + objId + hashedMap;


        List approvedObjUpdateRequests = ((ArraySink) approvalRequestDAO
          .where(
            foam.mlang.MLang.AND(
              foam.mlang.MLang.EQ(ApprovalRequest.DAO_KEY, "approvableDAO"),
              foam.mlang.MLang.EQ(ApprovalRequest.OBJ_ID, hashedId),
              foam.mlang.MLang.EQ(RoleApprovalRequest.OPERATION, Operations.UPDATE),
              foam.mlang.MLang.EQ(RoleApprovalRequest.IS_FULFILLED, false),
              foam.mlang.MLang.OR(
                foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.APPROVED),
                foam.mlang.MLang.EQ(ApprovalRequest.STATUS, ApprovalStatus.REJECTED)
              )
            )
          ).select(new ArraySink())).getArray();

        if ( approvedObjUpdateRequests.size() == 1 ) {
          RoleApprovalRequest fulfilledRequest = (RoleApprovalRequest) approvedObjUpdateRequests.get(0);
          fulfilledRequest.setIsFulfilled(true);

          approvalRequestDAO.put_(getX(), fulfilledRequest);

          if ( fulfilledRequest.getStatus() == ApprovalStatus.APPROVED ) {
            return super.put_(x,obj);
          }

          return null; // as request has been REJECTED
        }

        if ( approvedObjUpdateRequests.size() > 1 ) {
          logger.error("Something went wrong cannot have multiple approved/rejected requests for the same request!");
          throw new RuntimeException("Something went wrong cannot have multiple approved/rejected requests for the same request!");
        }

        Approvable approvable = (Approvable) approvableDAO.put_(getX(), new Approvable.Builder(getX())
          .setId(hashedId)
          .setDaoKey(getDaoKey())
          .setStatus(ApprovalStatus.REQUESTED)
          .setObjId(approvableAwareObj.getApprovableKey())
          .setPropertiesToUpdate(updatedProperties).build());

        RoleApprovalRequest approvalRequest = new RoleApprovalRequest.Builder(getX())
          .setDaoKey("approvableDAO")
          .setObjId(approvable.getId())
          .setClassification(getOf().getObjClass().getSimpleName())
          .setOperation(Operations.UPDATE)
          .setInitiatingUser(((User) x.get("user")).getId())
          .setStatus(ApprovalStatus.REQUESTED).build();

        fullSend(getX(), approvalRequest, obj);

        

        UserFeedbackAware feedbackAwareObj = (UserFeedbackAware) obj;

        UserFeedback newUserFeedback = new UserFeedback.Builder(getX())
          .setStatus(UserFeedbackStatus.SUCCESS)
          .setMessage("An approval request has been sent out.")
          .setNext(feedbackAwareObj.getUserFeedback()).build();

        FObject clonedCurrentObj = currentObjectInDAO.fclone();

        UserFeedbackAware feedbackAwareCurrentObj = (UserFeedbackAware) clonedCurrentObj;

        feedbackAwareCurrentObj.setUserFeedback(newUserFeedback);

        return clonedCurrentObj; // we aren't updating the object just yet so return the old one
      }
      `
    }
  ]
});
