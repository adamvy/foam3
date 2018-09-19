package net.nanopay.fx.ascendantfx;

import foam.core.X;
import foam.dao.DAO;
import net.nanopay.fx.FXQuote;
import net.nanopay.fx.FXService;
import net.nanopay.tx.cron.ExchangeRatesCron;

public class AscendantFXServiceTest
    extends foam.nanos.test.Test {

  private FXService fxService;
  protected DAO fxQuoteDAO_;
  protected DAO fxDealDAO_;
  X x_;

  @Override
  public void runTest(X x) {

    fxQuoteDAO_ = (DAO) x.get("fxQuoteDAO");
    fxDealDAO_ = (DAO) x.get("fxDealDAO");
    x_ = x;

    fxService = (FXService) x.get("ascendantFXService");

    testGetFXRate();
    testAcceptFXRate();

  }

  public void testGetFXRate() {
    ExchangeRatesCron cron = new ExchangeRatesCron();
    cron.execute(x_);
    FXQuote fxQuote = fxService.getFXRate("USD", "CAD", 100.0, "Buy", null, 0);
    test( null != fxQuote, "FX Quote was returned" );
    test( fxQuote.getId() > 0, "Quote has an ID: " + fxQuote.getId() );
    test( "USD".equals(fxQuote.getSourceCurrency()), "Quote has Source Currency" );
    test( fxQuote.getRate() > 0, "FX rate was returned: " + fxQuote.getRate() );

  }

  public void testAcceptFXRate() {

    FXQuote fxQuote = fxService.getFXRate("USD", "CAD", 100.0, "Buy", null, 0);
    test( fxQuote.getId() > 0, "Quote has an ID: " + fxQuote.getId() );

    fxQuote = (FXQuote) fxQuoteDAO_.find(fxQuote.getId());
    test( null != fxQuote, "FX Quote was returned" );
    if ( null != fxQuote ) {
      Boolean fxAccepted = fxService.acceptFXRate(String.valueOf(fxQuote.getId()), 0);
      test( fxAccepted, "FX Quote was accepted" );
    }

  }

}
