package net.nanopay.flinks;

import foam.core.*;
import net.nanopay.flinks.model.*;

public abstract class Msg 
  extends ContextAwareSupport 
{
  protected String json_;
  protected FlinksCall model_;
  protected ClassInfo modelInfo_;

  public void setJson(String json) {
    json_ = json;
  }
  public String getJson(){
    return json_;
  }
  public void setModelInfo(ClassInfo modelInfo){
    modelInfo_ = modelInfo;
  }
  public ClassInfo getModelInfo() {
    return modelInfo_;
  }
  public void setModel(FlinksCall model) {
    model_ = model;
  }
  public FlinksCall getModel() {
    return model_;
  }
}