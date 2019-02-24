/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.nanos.servlet;

import foam.util.SafetyUtil;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.text.StringEscapeUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ResourceImageServlet
  extends ImageServlet
{
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException
  {
    System.out.println("ResourceImageServlet.service uri: "+req.getRequestURI());
    String request = req.getRequestURI().replaceFirst("/?images/?", "/");
    System.out.println("ResourceImageServlet.service request: "+request);
    // tried a few prefixes, /images, /webapp/images, images/, 
    InputStream is = getClass().getResourceAsStream("images/"+request);
    if ( is != null ) {
      String ext = EXTS.get(request.substring(request.lastIndexOf('.') +1));
      try ( BufferedInputStream bis = new BufferedInputStream(is) ) {
        resp.setContentType(!SafetyUtil.isEmpty(ext) ? ext : DEFAULT_EXT);
        resp.setHeader("Content-Disposition", "filename=\"" + StringEscapeUtils.escapeHtml4(request) + "\"");
        //resp.setContentLengthLong(src.length());

        IOUtils.copy(bis, resp.getOutputStream());
        return;
      }
    } else {
      System.out.println("ResourceImageServlet.service is: null");
    }
    resp.sendError(resp.SC_NOT_FOUND);
  }
}
