/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.lib.json;

import foam.lib.parse.*;

public class BooleanParser
  extends ProxyParser
{
  private final static Parser instance__ = new BooleanParser();

  public static Parser instance() { return instance__; }

  private BooleanParser() {
    super(new Alt(new Literal("true") {
      @Override
      public Object value() {
        return true;
      }
    }, new Literal("false") {
      @Override
      public Object value() {
        return false;
      }
    }));
  }
}
