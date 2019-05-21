foam.CLASS({
  package: 'net.nanopay.meter.compliance.dowJones',
  name: 'DowJonesApprovalRequest',
  extends: 'net.nanopay.meter.compliance.ComplianceApprovalRequest',
  documentation: 'Approval request model for a failed dow jones search',

  properties: [
    {
      class: 'FObjectArray',
      of: 'net.nanopay.meter.compliance.dowJones.Match',
      name: 'matches',
      documentation: 'Array of match records returned from the request'
    }
  ]
});
