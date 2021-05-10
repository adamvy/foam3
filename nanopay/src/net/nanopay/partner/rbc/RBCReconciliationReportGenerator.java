/**
 * NANOPAY CONFIDENTIAL
 *
 * [2021] nanopay Corporation
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of nanopay Corporation.
 * The intellectual and technical concepts contained
 * herein are proprietary to nanopay Corporation
 * and may be covered by Canadian and Foreign Patents, patents
 * in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from nanopay Corporation.
 */

package net.nanopay.partner.rbc;

import foam.core.X;
import foam.dao.ArraySink;
import foam.dao.DAO;
import foam.nanos.logger.Logger;
import net.nanopay.reporting.ReconciliationReportGenerator;
import net.nanopay.tx.DigitalTransaction;
import net.nanopay.tx.cico.CITransaction;
import net.nanopay.tx.cico.COTransaction;
import net.nanopay.tx.model.Transaction;
import net.nanopay.tx.rbc.RbcCITransaction;
import net.nanopay.tx.rbc.RbcCOTransaction;

import java.util.HashMap;
import java.util.Map;

public abstract class RBCReconciliationReportGenerator extends ReconciliationReportGenerator {

  protected Map<String, CITransaction> ciMap = new HashMap<>();
  protected Map<String, COTransaction> coMap = new HashMap<>();
  protected Map<String, DigitalTransaction> dtMap = new HashMap<>();

  protected void refreshMaps(X x) {
    var transactionDAO = (DAO) x.get("localTransactionDAO");
    var transactions = (ArraySink) transactionDAO.select(new ArraySink());
    for ( var obj : transactions.getArray() ) {
      try {
        var transaction = (Transaction) obj;
        if ( transaction instanceof RbcCITransaction)
          ciMap.put(getRoot(x, transaction), (RbcCITransaction) transaction);
        else if ( transaction instanceof RbcCOTransaction)
          coMap.put(getRoot(x, transaction), (RbcCOTransaction) transaction);
        else if ( transaction instanceof DigitalTransaction)
          dtMap.put(getRoot(x, transaction), (DigitalTransaction) transaction);
      } catch(RuntimeException e) {
        var logger = (Logger) x.get("logger");
        if ( logger != null ) logger.warning(e);
      }
    }
  }

  protected RBCReconciliationReportGenerator(String spid, boolean cached) {
    super(spid, cached);
  }

  protected RBCReconciliationReportGenerator(String spid) {
    super(spid);
  }

}
