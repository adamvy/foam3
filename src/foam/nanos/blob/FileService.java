/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.nanos.blob;

import foam.blob.Blob;
import foam.blob.BlobService;
import foam.blob.IdentifiedBlob;
import foam.core.X;
import foam.dao.DAO;
import foam.nanos.app.AppConfig;
import foam.nanos.auth.AuthService;
import foam.nanos.auth.User;
import foam.nanos.fs.File;
import foam.util.SafetyUtil;
import java.io.OutputStream;
import java.util.Base64;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;

public class FileService
  extends HttpBlobService
{
  protected DAO fileDAO_;

  public FileService(X x, BlobService delegate) {
    this(x, "httpFileService", delegate);
  }

  public FileService(X x, String name, BlobService delegate) {
    super(x, name, delegate);
    fileDAO_ = (DAO) x.get("fileDAO");
  }

  @Override
  protected void download(X x) {
    Blob                blob      = null;
    OutputStream        os        = null;
    HttpServletRequest  req       = x.get(HttpServletRequest.class);
    HttpServletResponse resp      = x.get(HttpServletResponse.class);
    AuthService         auth      = (AuthService) x.get("auth");
    AppConfig           appConfig = (AppConfig) x.get("appConfig");

    // TODO: Add better ACL support for files.  In the meantime,
    // fileDAO has been decorated to disallow enumeration and File
    // IDs are unguessable cryptographically strong UUIDs, so no
    // permission check is really necessary.
    // NOTE: 'user' is validated in SessionWebAgent

    try {
      String path = req.getRequestURI();
      String id   = path.replaceFirst("/service/" + name_ + "/", "");

      File file = (File) fileDAO_.find_(x, id);
      if ( file == null ) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return;
      }

      if ( SafetyUtil.isEmpty(file.getDataString()) ){
        BlobService store = (BlobService) x.get("blobStore");
        blob = store.find(file.getId());
      } else {
        //Replace @version@ with actual foam version
        if ( "text/html".equals(file.getMimeType()) ) {
          String fileText = file.getText();
          fileText = fileText.replace("@VERSION@", appConfig.getVersion());
          String encodedString = Base64.getEncoder().encodeToString(fileText.getBytes());
          file.setDataString("data:"+file.getMimeType()+";base64," + encodedString);
        }

        blob = file.getData();
      }
      if ( blob == null ) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return;
      }

      long size = blob.getSize();

      // set response status, content type, content length
      resp.setStatus(HttpServletResponse.SC_OK);
      resp.setContentType(file.getMimeType());
      resp.setHeader("Content-Length", Long.toString(size, 10));
      resp.setHeader("Cache-Control", "public");

      // output data to response
      os = resp.getOutputStream();
      blob.read(os, 0, size);
      os.close();
    } catch (Throwable t) {
      throw new foam.core.FOAMException(t);
    } finally {
      IOUtils.closeQuietly(os);
    }
  }
}
