/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'net.nanopay.country.br',
  name: 'NatureCodeApprovalRequest',
  extends: 'foam.nanos.approval.ApprovalRequest',

  documentation: `
    NatureCodeApprovalRequest links NatureCodeData for an approval request that
    relates to a NatureCode
  `,

  requires: [
    'foam.dao.AbstractDAO',
    'foam.u2.dialog.Popup',
    'foam.log.LogLevel',
    'foam.nanos.approval.ApprovalStatus'
  ],

  javaImports: [
    'foam.core.X',
    'foam.core.FObject',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.nanos.auth.*',
    'foam.nanos.logger.Logger',
    'foam.nanos.ruler.Operations',
    'java.util.ArrayList',
    'java.util.List',
    'static foam.mlang.MLang.*'
  ],

  imports: [
    'DAO approvalRequestDAO',
    'ctrl',
    'currentMenu',
    'notify',
    'stack',
    'summaryView?',
    'objectSummaryView?',
    'natureCodeDataDAO'
  ],

  properties: [
    {
      class: 'Reference',
      of: 'net.nanopay.country.br.NatureCode',
      name: 'natureCode',
      section: 'approvalRequestInformation',
      order: 25,
      gridColumns: 6
    },
    {
      class: 'Reference',
      of: 'net.nanopay.country.br.NatureCodeData',
      name: 'natureCodeData',
      section: 'approvalRequestInformation',
      order: 27,
      gridColumns: 6,
      view: function(_, X) {
        var E = foam.mlang.Expressions.create();

        // TODO: for some reason this doesn't update when nature code changes
        // isn't a concern for this use  case however since Nature Code shouldn't be changing
        return {
          class: 'foam.u2.view.ChoiceView',
          dao$: X.data.slot(function(natureCode) {
            return X.natureCodeDataDAO.where(
              E.EQ(net.nanopay.country.br.NatureCodeData.NATURE_CODE, natureCode)
            )
          }),
          objToChoice: function(obj) {
            return obj.toSummary();
          },
          size: 10,
          selectSpec: { class: 'net.nanopay.country.br.NatureCodeSelectView' }
        }
      }
    }
  ],

  actions: [
    {
      name: 'approveWithMemo',
      isAvailable: () => false,
      code: () => { return; }
    },
    {
      name: 'approve',
      section: 'approvalRequestInformation',
      isAvailable: (isTrackingRequest, status) => {
        if (
          status === foam.nanos.approval.ApprovalStatus.REJECTED ||
          status === foam.nanos.approval.ApprovalStatus.APPROVED ||
          status === foam.nanos.approval.ApprovalStatus.CANCELLED
        ) {
          return false;
        }
        return ! isTrackingRequest;
      },
      code: function(X) {
        var objToAdd = X.objectSummaryView ? X.objectSummaryView : X.summaryView;
        objToAdd.add(this.Popup.create({ backgroundColor: 'transparent' }).tag({
          class: "foam.u2.PropertyModal",
          property: this.NATURE_CODE_DATA.clone().copyFrom({ label: '' }),
          isModalRequired: true,
          data$: X.data$,
          propertyData$: X.data.natureCodeData$,
          title: "Please select a nature code for (required)",
          onExecute: this.approveWithData.bind(this, X)
        }));
      }
    },
    {
      name: 'reject',
      section: 'approvalRequestInformation',
      isAvailable: (isTrackingRequest, status) => {
        if (
          status === foam.nanos.approval.ApprovalStatus.REJECTED ||
          status === foam.nanos.approval.ApprovalStatus.APPROVED ||
          status === foam.nanos.approval.ApprovalStatus.CANCELLED
        ) {
          return false;
        }
        return ! isTrackingRequest;
      },
      code: function(X) {
        var objToAdd = X.objectSummaryView ? X.objectSummaryView : X.summaryView;

        objToAdd.add(this.Popup.create({ backgroundColor: 'transparent' }).tag({
          class: "foam.u2.MemoModal",
          onExecute: this.rejectWithMemo.bind(this, X),
          isMemoRequired: true
        }));
      }
    },
  ],
  listeners: [
    {
      name: 'approveWithData',
      code: function(X) {
        var approvedApprovalRequest = this.clone();
        approvedApprovalRequest.status = this.ApprovalStatus.APPROVED;

        this.approvalRequestDAO.put(approvedApprovalRequest).then((req) => {
          this.approvalRequestDAO.cmd(this.AbstractDAO.RESET_CMD);
          this.finished.pub();
          this.notify(this.SUCCESS_APPROVED, '', this.LogLevel.INFO, true);

          X.stack.back();
        }, (e) => {
          this.throwError.pub(e);
          this.notify(e.message, '', this.LogLevel.ERROR, true);
        });
      }
    }
  ]
});
