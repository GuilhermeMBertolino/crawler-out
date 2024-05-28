<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="header">
        <div class="subheader">
            <xsl:value-of select="view[@viewid]" />
            <div> 
                <img  class='iconDetails'> 
                    <xsl:attribute name="src">
                        <xsl:choose>
                            <xsl:when test="image">
                                <xsl:value-of select="image/text()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:text>images/wifi.png</xsl:text>
                            </xsl:otherwise>
                        </xsl:choose> 
                    </xsl:attribute>
                </img> 
            </div>        
            <div>                  
                <h4 id="headernamedata" >
                    <xsl:attribute name="ng-bind">
                        '<xsl:value-of select="concat(../@viewid,'.','headername')" />' | translate
                    </xsl:attribute>
                </h4> 
            </div>
            <p id="headerdescriptiondata"> 
                <xsl:attribute name="ng-bind">
                    '<xsl:value-of select="concat(../@viewid,'.','headerdescription')" />' | translate
                </xsl:attribute>
            </p>
        </div>
        <!--<hr />-->         
    </xsl:template>
     <xsl:template match="message" name="message">
    <xsl:if test="warning">
    <div class="alert alert-danger">
          <xsl:if test="@ifcondition">
            <xsl:attribute name="ng-show">
                          <xsl:value-of select="concat(translate(translate(@objectname,'*',''),'.',''),'messagepopup')"/>
            </xsl:attribute>
            <xsl:attribute name="ng-init">
                    <xsl:value-of select="concat('checkWarningMessageCondition(&quot;', @ifparam, '&quot;,&quot;', @ifcondition, '&quot;,&quot;', @ifvalue, '&quot;,&quot;', @url, '&quot;,&quot;' , @polling, '&quot;,&quot;', @interval ,'&quot;,&quot;', concat(translate(translate(@objectname,'*',''),'.',''),'messagepopup'),'&quot;)')"/>
            </xsl:attribute>
         </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                    <xsl:attribute name="ng-if">
                        <xsl:choose>
                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                <xsl:call-template name="multiplevalues">
                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                    <xsl:with-param name="delimiter" select="','"/>
                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                </xsl:call-template>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                            </xsl:otherwise>
                        </xsl:choose>

                    </xsl:attribute>
            </xsl:if> 
            <!--<a class="close" aria-label="close">
                <xsl:attribute name="ng-click">
                            <xsl:value-of select="concat('popupclose(&quot;',translate(translate(@objectname,'*',''),'.',''),'messagepopup','&quot;)')"/>
                </xsl:attribute>&#10006;
            </a>-->
            <p>
                <xsl:value-of select="warning/text()"/>
            </p>
        </div>
    </xsl:if>
     <xsl:if test="info">
    <div class="alert alert-info">
        <xsl:if test="@ifcondition">
            <xsl:attribute name="ng-show">
                          <xsl:value-of select="concat(translate(translate(@objectname,'*',''),'.',''),'messagepopup')"/>
            </xsl:attribute>
            <xsl:attribute name="ng-init">
                    <xsl:value-of select="concat('checkWarningMessageCondition(&quot;', @ifparam, '&quot;,&quot;', @ifcondition, '&quot;,&quot;', @ifvalue, '&quot;,&quot;', @url, '&quot;,&quot;' , @polling, '&quot;,&quot;', @interval ,'&quot;,&quot;', concat(translate(translate(@objectname,'*',''),'.',''),'messagepopup'),'&quot;)')"/>
            </xsl:attribute>
         </xsl:if>
            
        <xsl:if test="@dependsonparamvalue">
                        <xsl:attribute name="ng-if">
                            <xsl:choose>
                                <xsl:when test="contains(@dependsonparamvalue, ',')">
                                    <xsl:call-template name="multiplevalues">
                                        <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                        <xsl:with-param name="delimiter" select="','"/>
                                        <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                        <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                    </xsl:call-template>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                </xsl:otherwise>
                            </xsl:choose>

                        </xsl:attribute>
            </xsl:if> 
           <!-- <a class="close" aria-label="close">
                <xsl:attribute name="ng-click">
                            <xsl:value-of select="concat('popupclose(&quot;',translate(translate(@objectname,'*',''),'.',''),'messagepopup','&quot;)')"/>
                </xsl:attribute>&#10006;
            </a>-->
            <p>
                <xsl:value-of select="info/text()"/>
            </p>
        </div>
    </xsl:if>
     <xsl:if test="success">
    <div class="alert alert-success">
         <xsl:if test="@ifcondition and @ifvalue and @ifparam">
            <xsl:attribute name="ng-show">
                  <xsl:value-of select="concat(translate(translate(@objectname,'*',''),'.',''),'messagepopup')"/>
            </xsl:attribute>
            <xsl:attribute name="ng-init">
                  <xsl:value-of select="concat('checkWarningMessageCondition(&quot;', @ifparam, '&quot;,&quot;', @ifcondition, '&quot;,&quot;', @ifvalue, '&quot;,&quot;', @url, '&quot;,&quot;' , @polling, '&quot;,&quot;', @interval ,'&quot;,&quot;', concat(translate(translate(@objectname,'*',''),'.',''),'messagepopup'),'&quot;)')"/>
            </xsl:attribute>
        </xsl:if>
             <xsl:if test="@dependsonparamvalue">
                            <xsl:attribute name="ng-if">
                                <xsl:choose>
                                    <xsl:when test="contains(@dependsonparamvalue, ',')">
                                        <xsl:call-template name="multiplevalues">
                                            <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                            <xsl:with-param name="delimiter" select="','"/>
                                            <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                            <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                        </xsl:call-template>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                    </xsl:otherwise>
                                </xsl:choose>

                            </xsl:attribute>
                </xsl:if> 
           <!-- <a class="close" aria-label="close">
                <xsl:attribute name="ng-click">
                            <xsl:value-of select="concat('popupclose(&quot;',translate(translate(@objectname,'*',''),'.',''),'messagepopup','&quot;)')"/>
                </xsl:attribute>&#10006;
            </a>-->
            <p>
                <xsl:value-of select="success/text()"/>
            </p>
        </div>
    </xsl:if>
        <!--<hr />-->         
</xsl:template>
    <xsl:template match="name">
    </xsl:template>
    <xsl:template match="subtitle">
    </xsl:template>
    <xsl:template name="label">
        <div class="row">
            <label for="{@name}" class="col-sm-12 col-lg-12 col-md-12 col-xs-12 control-label">
                <xsl:attribute name="ng-bind">'<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate</xsl:attribute>
            </label>
        </div>
    </xsl:template>

    <xsl:template name="string">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 

            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@customdependson">
              <xsl:variable name="replaceand">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text" select="@customdependson"/>
                      <xsl:with-param name="replace" select="'and'"/>
                      <xsl:with-param name="by">&amp;&amp;</xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="replaceor">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text"  select="$replaceand"/>
                      <xsl:with-param name="replace" select="'or'"/>
                      <xsl:with-param name="by">&#124;&#124;</xsl:with-param>
                    </xsl:call-template>
              </xsl:variable>
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="$replaceor"></xsl:value-of>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
                     <xsl:if test="@polling and @interval">
                                <xsl:attribute name="ng-init">
                                    <xsl:value-of select="concat('PollingForParameter(&quot;',$paramobjectname, '&quot;,&quot;',@name,'&quot;, &quot;', @interval,'&quot;)')"/>
                                </xsl:attribute>
                    </xsl:if>
                    <input type="text" class="form-control hidden-dom-removal"  id="{@name}">
                        <xsl:if test="@disabledonparamvalue">
                			<xsl:attribute name="ng-disabled">

                            <xsl:value-of select="concat(translate(translate(@disabledonobject,'.',''),'*',''),'.',@disabledonparam,'==',@disabledonparamvalue)"/> 


                			</xsl:attribute>
            			</xsl:if> 
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                    <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                   
                                </xsl:when>
                                <xsl:otherwise>
                                   {{'Please Enter the value'| translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>    
                       
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when> 
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@minlen">
                            <xsl:attribute name="ng-minlength">
                                <xsl:value-of select="@minlen" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@maxlen">
                            <xsl:attribute name="ng-maxlength">
                                <xsl:value-of select="@maxlen" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-model">
                            <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
							<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                         <xsl:if test="@getObject">
                            <xsl:attribute name="ng-change">
                                <!-- <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>-->
                               <xsl:value-of select="concat('resetValue(&quot;',@child,'&quot;,&quot;',@name,'&quot;,&quot;',concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name), '&quot;)')"/>
                            </xsl:attribute>
                        </xsl:if>
                    </input>
                    <label for="{@name}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/> 
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                        </xsl:attribute>
                    </span>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="@minlen">
                        <xsl:call-template name="minErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                            <xsl:with-param name="minlen" select="@minlen"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="@maxlen">
                        <xsl:call-template name="maxErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                            <xsl:with-param name="maxlength" select="@maxlen"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="mac">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
                    <input type="text" class="form-control hidden-dom-removal"  id="{@name}">
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                      <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter the Valid MAC Address'| translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                        <xsl:attribute name="ng-pattern">
                            /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/
                        </xsl:attribute>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@minlen">
                            <xsl:attribute name="ng-minlength">
                                <xsl:value-of select="@minlen" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@maxlen">
                            <xsl:attribute name="ng-maxlength">
                                <xsl:value-of select="@maxlen" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-model">
                            <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
							<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                    </input>
                    <label for="{@name}" >
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
<!--                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                        </xsl:attribute>
                    </span>-->
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="@minlen">
                        <xsl:call-template name="minErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                            <xsl:with-param name="minlen" select="@minlen"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="@maxlen">
                        <xsl:call-template name="maxErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                            <xsl:with-param name="maxlength" select="@maxlen"/>
                        </xsl:call-template>
                    </xsl:if>
                   
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                           <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/> 
                           this is it
                            <xsl:text>val</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.pattern</xsl:text>
                        </xsl:attribute>
                        Invalid pattern , Example mac address : 00:15:E9:2B:99:3C 
                    </span> 
                         <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                       
                        <xsl:attribute name="ng-show">
                      
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>responsestatus</xsl:text>
                        </xsl:attribute>
                          <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                        </xsl:attribute>
         				</span> 
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="url">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
                    <input xmltype="{@type}" type="text" class="form-control hidden-dom-removal" id="{@name}">
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                     <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter Valid url'|translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                        <xsl:attribute name="ng-pattern">
                            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&amp;//=]*)/i
                        </xsl:attribute>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="@requireddependsonparamvalue and @requireddependsonobject  and  @requireddependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@requireddependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@requireddependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="requireddependsobjectname" select="@requireddependsonobject" />
                                                    <xsl:with-param name="requireddependsparamname" select="@requireddependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@requireddependsonobject,'.',''),'*',''),'.',@requireddependsonparam,'==',@requireddependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-model">
                            <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
							<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                    </input>
                    <label for="{@name}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate
                        </xsl:attribute>
                    </span>
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.pattern</xsl:text>
                            <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            'Invalid url pattern'| translate
                        </xsl:attribute>
                    </span> 
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="ipv4">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
             <xsl:if test="@customdependson">
              <xsl:variable name="replaceand">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text" select="@customdependson"/>
                      <xsl:with-param name="replace" select="'and'"/>
                      <xsl:with-param name="by">&amp;&amp;</xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="replaceor">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text"  select="$replaceand"/>
                      <xsl:with-param name="replace" select="'or'"/>
                      <xsl:with-param name="by">&#124;&#124;</xsl:with-param>
                    </xsl:call-template>
              </xsl:variable>
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="$replaceor"></xsl:value-of>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
                    <input xmltype="{@type}" type="text" class="form-control hidden-dom-removal" id="{@name}">
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                     <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter Valid IPV4 Address'|translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                        <xsl:attribute name="ng-pattern">
                            /^(?!0.0.0.0$)(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(\/([0-9]|[1-2][0-9]|3[0-2]))?$/
                        </xsl:attribute>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-model">
                            <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
							<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                    </input>
                    <label for="{@name}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate
                        </xsl:attribute>
                    </span>
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.pattern</xsl:text>
                            <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            'Invalid pattern , Example IPv4 address : 192.168.1.232'| translate
                        </xsl:attribute>
                    </span> 
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="ipv6">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
             <xsl:if test="@customdependson">
              <xsl:variable name="replaceand">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text" select="@customdependson"/>
                      <xsl:with-param name="replace" select="'and'"/>
                      <xsl:with-param name="by">&amp;&amp;</xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="replaceor">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text"  select="$replaceand"/>
                      <xsl:with-param name="replace" select="'or'"/>
                      <xsl:with-param name="by">&#124;&#124;</xsl:with-param>
                    </xsl:call-template>
              </xsl:variable>
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="$replaceor"></xsl:value-of>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
                    <input xmltype="{@type}" type="text" class="form-control  hidden-dom-removal" id="{@name}">
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                      <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter Valid IPV6 Address'| translate}} 
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                        <xsl:attribute name="ng-pattern">
                            /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
                        </xsl:attribute>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-model">
                            <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
							<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                    </input>
                    <label for="{@name}" >
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate
                        </xsl:attribute>
                    </span>
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.pattern</xsl:text>
                            <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            'Invalid pattern,Example IPv6 address : FE80:0000:0000:0000:0202:B3FF:FE1E:8329' | translate
                        </xsl:attribute>
                    </span>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="ipv4ipv6">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
                    <input xmltype="{@type}" type="text" class="form-control hidden-dom-removal" id="{@name}">
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                      <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter Valid IPV4/IPV6 Address'|translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                        <xsl:attribute name="ng-pattern">
                            /^(?!0.0.0.0$)((\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))$/
                        </xsl:attribute>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-model">
                            <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
							<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                    </input>
                    <label for="{@name}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate
                        </xsl:attribute>
                    </span>
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.pattern</xsl:text>
                            <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            'Invalid pattern ,only IPv4/Ipv6 address values allowed'| translate
                        </xsl:attribute>
                    </span> 
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="multi-checkbox">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
			<xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
        
            </xsl:attribute>
			
           <label for="{@name}" class="col-sm-12 col-md-12 col-lg-12 control-label multi-checkbox-label">
                    <xsl:attribute name="ng-bind">'<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate</xsl:attribute>
                    <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required  active col-sm-12 col-md-2 col-lg-2 control-label
                                </xsl:when>
                                <xsl:otherwise>
                                    active col-sm-12 col-md-12 col-lg-12 control-label
                                </xsl:otherwise>
                            </xsl:choose>
                     </xsl:attribute>
                </label>
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="checkbox-scroll-vr" >
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:choose>
                            <xsl:when test ="@url">
                                <xsl:attribute name="ng-init">
                                    <xsl:value-of select="concat('checkboxurl(&quot;',@url,'&quot;,&quot;',@name,'&quot;,&quot;',@urlparam,'&quot;)')"/>
                                </xsl:attribute>           
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:attribute name="ng-init">
                                    <xsl:value-of select="concat(@name,'=','&quot;',@validvalues,'&quot;')"/>
                                </xsl:attribute>         
                            </xsl:otherwise>
                        </xsl:choose>                          
                        <p class="col-md-3">
                            <xsl:choose>
                                <xsl:when test="(@urlparam or not(contains(@url,'cgi_get'))) and not(@validvalues)">
                                    <xsl:attribute name="ng-repeat">
                                        role in <xsl:value-of select="@name" />
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="ng-repeat">
                                        role in <xsl:value-of select="@name" />
                                        <xsl:text>.split(',')</xsl:text>
                                    </xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
                            <input type="checkbox"> 
                                <xsl:attribute name="id">
                                    <xsl:value-of select="@name" />{{$index+1}}
                                </xsl:attribute>
                                <xsl:attribute name="name">
                                            <xsl:text>role</xsl:text>    
                                </xsl:attribute>
                                <xsl:choose>
                                <xsl:when test="(@urlparam or not(contains(@url,'cgi_get'))) and not(@validvalues)">
                                        <xsl:attribute name="checklist-model" >
                                            <xsl:value-of select="concat('getRoles(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,'&quot;,&quot;true','&quot;)')"/>
                                        </xsl:attribute>
                                        <xsl:if test="(@urlparam or not(contains(@url,'cgi_get'))) and not(@validvalues) and not(@required)">

                                        <xsl:attribute name="checklist-before-change" >
                                            <xsl:value-of select="$formname"/>
                                            <xsl:text>_form.</xsl:text>
                                            <xsl:text>role.$setValidity('required',</xsl:text> 
                                            <xsl:value-of select="concat('getRoles(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,'&quot;,&quot;true','&quot;)')"/>
                                            <xsl:text>.length>0)</xsl:text> 
                                        </xsl:attribute>
                                      </xsl:if>

                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:attribute name="checklist-model" >
                                            <xsl:value-of select="concat('getRoles(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,'&quot;)')"/>
                                        </xsl:attribute>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <xsl:choose>
                                    <xsl:when test="(@urlparam or not(contains(@url,'cgi_get'))) and not(@validvalues)">
                                        <xsl:attribute name="ng-change" >
                                            <xsl:value-of select="concat('check(','role',',checked',',&quot;',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,'&quot;,&quot;true','&quot;)')"/>
                                        </xsl:attribute>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:attribute name="ng-change" >
                                            <xsl:value-of select="concat('check(','role',',checked',',&quot;',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,'&quot;)')"/>
                                        </xsl:attribute>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <xsl:attribute name="checklist-value">
                                    <xsl:text>role</xsl:text>
                                </xsl:attribute>
                            </input>
                            <label class="checkbox-listview">
                                <xsl:attribute name="for">
                                    <xsl:value-of select="@name" />{{$index+1}}
                                </xsl:attribute>
                                <xsl:choose>
                                    <xsl:when test="(@urlparam or not(contains(@url,'cgi_get'))) and not(@validvalues)">
                                        {{role.name}}
                                    </xsl:when>
                                    <xsl:otherwise>
                                        {{role}}
                                    </xsl:otherwise>
                                </xsl:choose>
                            </label>
                        </p>                
                    </div>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                           <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                        </xsl:attribute>
                    </span>
                    <xsl:if test="(@urlparam or not(contains(@url,'cgi_get'))) and not(@validvalues)">
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.$invalid</xsl:text>
                        </xsl:attribute>
                        <xsl:text>This field is required</xsl:text>
                    </span>
                    </xsl:if>
 
                </div>  
                
            
        </div>  
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if> 
            
    </xsl:template>
    
	<xsl:template name="wepkey">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
        
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
		<div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 pwdblock" style="padding-left: 0px; padding-right: 0px;">
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xs-10 input-field">
                        <input  type="password" class="form-control hidden-dom-removal">
                            <xsl:attribute name="id">
                                 <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name)" />
                            </xsl:attribute>
                            <xsl:attribute name="placeholder">
                                <xsl:text>Enter Password web</xsl:text> 
                            </xsl:attribute>
                            <xsl:attribute name="ng-init">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'fieldstatus','=false')" />
                            </xsl:attribute>
                                                 <xsl:choose>
   <xsl:when test="@required">
   </xsl:when>
   <xsl:otherwise>
    <xsl:attribute name="ng-required">
                                   true
                                </xsl:attribute>
                             
                                
    
     </xsl:otherwise>
</xsl:choose>
<xsl:attribute name="ng-pattern">
                        /^[0-9a-fA-F]+$/
                    </xsl:attribute>
<!--                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(@name,'fieldstatus','==false')" />
                            </xsl:attribute>-->
                            <xsl:if test="@minlen">
                                <xsl:attribute name="ng-minlength">
                                    <xsl:value-of select="@minlen" />
                                </xsl:attribute>
                            </xsl:if>
                         
                            <xsl:if test="@maxlen">
                                <xsl:attribute name="ng-maxlength">
                                    <xsl:value-of select="@maxlen" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@access">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:text>
                                        true
                                    </xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="name">
                                <!--<xsl:value-of select="@name"/>-->  
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:if test="@Value">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="@Value" />
                                </xsl:attribute>
								<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="ng-blur">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                            </xsl:attribute>
                        </input>
<!--                        <input  type="text" class="form-control hidden-dom-removal" id="{@name}"  trigger-event="">
                            <xsl:attribute name="placeholder">
                                <xsl:text>Enter Password</xsl:text> 
                            </xsl:attribute>
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(@name,'fieldstatus','==true')" />
                            </xsl:attribute>
                            <xsl:if test="@minlen">
                                <xsl:attribute name="ng-minlength">
                                    <xsl:value-of select="@minlen" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@maxlen">
                                <xsl:attribute name="ng-maxlength">
                                    <xsl:value-of select="@maxlen" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@access">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:text>
                                        true
                                    </xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="name">
                                <xsl:value-of select="@name"/>  
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:if test="@Value">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="@Value" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="ng-blur">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                            </xsl:attribute>
                        </input>-->
                        <label for="{@name}" class="active" >
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                            </xsl:attribute>
                        </label>
                        <xsl:if test="@strengthindicator='true'">
                            <ul id="strength">
                                <xsl:attribute name="check-strength">
                                    <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                                </xsl:attribute>   
                            </ul>
                        </xsl:if>
                        <xsl:if test="@description">
                            <span class="help_btn">
                                <div style="cursor:pointer" help_click="">
                                    <xsl:attribute name="desc_help">
                                        <xsl:value-of select="concat(@name,'_desc',position())" />
                                    </xsl:attribute>
                                    <i class="fa fa-question-circle">
                                    </i>
                                </div>
                            </span>
                        </xsl:if>
                        <span class="error">
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-bind">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                            </xsl:attribute>
                        </span>
                        
                        <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_form.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.pattern</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">

                        'Invalid  WEP Key'| translate



                    </xsl:attribute>
                </span>
   

<!--
    <xsl:call-template name="requiredErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                            </xsl:call-template>
-->
 
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:call-template name="requiredErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="@minlen">
                            <xsl:call-template name="minErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                                <xsl:with-param name="minlen" select="@minlen"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="@maxlen">
                            <xsl:call-template name="maxErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                                <xsl:with-param name="maxlength" select="@maxlen"/>
                            </xsl:call-template>
                        </xsl:if>
                    </div>
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2 pwdtoggle">
                        <input type="checkbox">
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'checkbox')" />
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'fieldstatus')" />
                            </xsl:attribute>
                            <xsl:attribute name="ng-change">
                                <xsl:value-of select="concat('passchange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),@name,'&quot;)')" />
                            </xsl:attribute>
                        </input>
                        <label>
                            <xsl:attribute name="ng-class">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'fieldstatus')" />==true ? 'hidepw checkbox_right_align' : 'showpw checkbox_right_align'
                            </xsl:attribute>
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'checkbox')" />
                            </xsl:attribute>
                        
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="password">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
        
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
		<div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 pwdblock" style="padding-left: 0px; padding-right: 0px;">
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xs-10 input-field">
                        <input  type="password" class="form-control hidden-dom-removal">
                            <xsl:attribute name="id">
                                 <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name)" />
                            </xsl:attribute>
                            <xsl:attribute name="placeholder">
                                <xsl:text>Enter Password</xsl:text> 
                            </xsl:attribute>
                            <xsl:attribute name="ng-init">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'fieldstatus','=false')" />
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test="@required">
                                </xsl:when>
                                <xsl:otherwise>
									<xsl:attribute name="ng-required">
									   true 
									</xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
<!--                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(@name,'fieldstatus','==false')" />
                            </xsl:attribute>-->
                            <xsl:if test="@minlen">
                                <xsl:attribute name="ng-minlength">
                                    <xsl:value-of select="@minlen" />
                                </xsl:attribute>
                            </xsl:if>
                         
                            <xsl:if test="@maxlen">
                                <xsl:attribute name="ng-maxlength">
                                    <xsl:value-of select="@maxlen" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@access">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:text>
                                        true
                                    </xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="name">
                                <!--<xsl:value-of select="@name"/>-->  
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <!--                         <xsl:value-of select="concat(translate($paramobjectname,'.','_'),'.',@name)"/>-->
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:if test="@Value">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="@Value" />
                                </xsl:attribute>
								<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="ng-blur">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                            </xsl:attribute>
                        </input>
<!--                        <input  type="text" class="form-control hidden-dom-removal" id="{@name}"  trigger-event="">
                            <xsl:attribute name="placeholder">
                                <xsl:text>Enter Password</xsl:text> 
                            </xsl:attribute>
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(@name,'fieldstatus','==true')" />
                            </xsl:attribute>
                            <xsl:if test="@minlen">
                                <xsl:attribute name="ng-minlength">
                                    <xsl:value-of select="@minlen" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@maxlen">
                                <xsl:attribute name="ng-maxlength">
                                    <xsl:value-of select="@maxlen" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@access">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:text>
                                        true
                                    </xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="name">
                                <xsl:value-of select="@name"/>  
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:if test="@Value">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="@Value" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="ng-blur">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                            </xsl:attribute>
                        </input>-->
                        <label for="{@name}" class="active" >
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                            </xsl:attribute>
                        </label>
                        <xsl:if test="@strengthindicator='true'">
                            <ul id="strength">
                                <xsl:attribute name="check-strength">
                                    <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                                </xsl:attribute>   
                            </ul>
                        </xsl:if>
                        <xsl:if test="@description">
                            <span class="help_btn">
                                <div style="cursor:pointer" help_click="">
                                    <xsl:attribute name="desc_help">
                                        <xsl:value-of select="concat(@name,'_desc',position())" />
                                    </xsl:attribute>
                                    <i class="fa fa-question-circle">
                                    </i>
                                </div>
                            </span>
                        </xsl:if>
                        <span class="error">
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-bind">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                            </xsl:attribute>
                        </span>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:call-template name="requiredErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="@minlen">
                            <xsl:call-template name="minErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                                <xsl:with-param name="minlen" select="@minlen"/>
                            </xsl:call-template>
                        </xsl:if>
                        <xsl:if test="@maxlen">
                            <xsl:call-template name="maxErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="$paramobjectname"/>
                                <xsl:with-param name="originalObjectname" select="$paramoriginalobjectname"/>
                                <xsl:with-param name="paramname" select="@name"/>
                                <xsl:with-param name="webname" select="@webname"/>
                                <xsl:with-param name="maxlength" select="@maxlen"/>
                            </xsl:call-template>
                        </xsl:if>
                    </div>
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xs-2 pwdtoggle">
                        <input type="checkbox">
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'checkbox')" />
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'fieldstatus')" />
                            </xsl:attribute>
                            <xsl:attribute name="ng-change">
                                <xsl:value-of select="concat('passchange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),@name,'&quot;)')" />
                            </xsl:attribute>
                        </input>
                        <label>
                            <xsl:attribute name="ng-class">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'fieldstatus')" />==true ? 'hidepw checkbox_right_align' : 'showpw checkbox_right_align'
                            </xsl:attribute>
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),@name,'checkbox')" />
                            </xsl:attribute>
                        
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="description">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 wps_txt">
                <xsl:value-of select="@content"/>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="hyperlink">
        <div class="col-sm-12 col-md-6 col-lg-12 col-xs-12" style="text-align:center;" >
            <xsl:value-of select="@heading" />
            <h4>
                <a href="#">
                    <xsl:attribute name="ng-bind">'<xsl:value-of select="concat(../@originalobject,'.',@webname)"/>' | translate</xsl:attribute>
                </a>
            </h4>
        </div>
    </xsl:template>
    <xsl:template name="stringA">
        <div class="input-field">
            <div>
                <input  type="text" class="form-control" id="{@name}" >
                    <xsl:attribute name="ng-model">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-blur">
                        <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        
                    </xsl:attribute>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@dependsonobject,'.',''),'*',''),'&quot;,','&quot;',@dependsonparam,'&quot;,','&quot;',@dependsonparamvalue,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@depends and @parentname">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@parentname,'.',''),'*',''),'&quot;,','&quot;',@depends,'&quot;,','&quot;',@parent,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>

                </input>
                <span class="error">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate 
                    </xsl:attribute>
                </span>
            </div>
        </div>
    </xsl:template>
<xsl:template name="ip4">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <div class="form-group">
            <div>
                <input  type="text" class="form-control" id="{@name}" >
                    <xsl:attribute name="ng-pattern">
                        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                    </xsl:attribute>
                    <xsl:attribute name="ng-model">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-blur">
                        <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        
                    </xsl:attribute>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@dependsonobject,'.',''),'*',''),'&quot;,','&quot;',@dependsonparam,'&quot;,','&quot;',@dependsonparamvalue,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@depends and @parentname">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@parentname,'.',''),'*',''),'&quot;,','&quot;',@depends,'&quot;,','&quot;',@parent,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                </input>
                <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_form.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.pattern</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        'Invalid  IPv4 address'| translate
                    </xsl:attribute>
                </span>
                <span class="error">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate 
                    </xsl:attribute>
                </span>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="ip6">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <div class="form-group">
            <div>
                <input  type="text" class="form-control" id="{@name}" >
                    <xsl:attribute name="ng-pattern">
                        /^([0-9A-Fa-f]{0,4}:){2,7}([0-9A-Fa-f]{1,4}$|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})$/
                    </xsl:attribute>
                    <xsl:attribute name="ng-model">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-blur">
                        <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        
                    </xsl:attribute>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@dependsonobject,'.',''),'*',''),'&quot;,','&quot;',@dependsonparam,'&quot;,','&quot;',@dependsonparamvalue,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@depends and @parentname">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@parentname,'.',''),'*',''),'&quot;,','&quot;',@depends,'&quot;,','&quot;',@parent,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                </input>
                <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_form.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.pattern</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        'Invalid  IPv6 address'| translate
                    </xsl:attribute>
                </span>
                <span class="error">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate 
                    </xsl:attribute>
                </span>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="ip4ip6">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <div class="form-group">
            <div>
                <input  type="text" class="form-control" id="{@name}" >
                    <xsl:attribute name="ng-pattern">
                        /^((\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))$/
                    </xsl:attribute>
                    <xsl:attribute name="ng-required">
                        true
                    </xsl:attribute>
                    <xsl:attribute name="ng-model">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-blur">
                        <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        
                    </xsl:attribute>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@dependsonobject,'.',''),'*',''),'&quot;,','&quot;',@dependsonparam,'&quot;,','&quot;',@dependsonparamvalue,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@depends and @parentname">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@parentname,'.',''),'*',''),'&quot;,','&quot;',@depends,'&quot;,','&quot;',@parent,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                </input>
                <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_form.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.required</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        'This field is required'| translate
                    </xsl:attribute>
                </span>
                <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_form.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.pattern</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        'Invalid  IPv6/IPv4 address'| translate
                    </xsl:attribute>
                </span>
                <span class="error">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate 
                    </xsl:attribute>
                </span>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="macaddress">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <div class="form-group">
            <div>
                <input  type="text" class="form-control" id="{@name}" >
                    <xsl:attribute name="ng-required">
                        true
                    </xsl:attribute>
                    <xsl:attribute name="ng-pattern">
                        /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/
                    </xsl:attribute>
                    <xsl:attribute name="ng-model">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-blur">
                        <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        
                    </xsl:attribute>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@dependsonobject,'.',''),'*',''),'&quot;,','&quot;',@dependsonparam,'&quot;,','&quot;',@dependsonparamvalue,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@depends and @parentname">
                        <xsl:attribute name="ng-disabled">
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>;
                            clearField(<xsl:value-of select="concat('&quot;',translate(translate(@parentname,'.',''),'*',''),'&quot;,','&quot;',@depends,'&quot;,','&quot;',@parent,'&quot;')"/>)
                        </xsl:attribute>
                    </xsl:if>
                </input>
                <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_form.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.pattern</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        'Invalid  MAC address'| translate
                    </xsl:attribute>
                </span>
                <span class="error" >
                    <xsl:attribute name="forname">
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="$formname"/>
                        <xsl:text>_editabletableform.</xsl:text>
                        <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        <xsl:text>.$error.pattern</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        'Invalid  MAC address'| translate
                    </xsl:attribute>
                </span>
                <span class="error">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-bind">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate 
                    </xsl:attribute>
                </span>
                <xsl:call-template name="requiredErrorMessage">
                    <xsl:with-param name="FormName" select="$formname"/>
                    <xsl:with-param name="objectname" select="../@name"/>
                    <xsl:with-param name="originalobject" select="../@originalobject"/>
                    <xsl:with-param name="paramname" select="@name"/>
                    <xsl:with-param name="webname" select="@webname"/>
                </xsl:call-template>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="passwordA">
        <div class="form-group">
            <div>
                <input  type="password" class="form-control" id="{@name}" >
                    <xsl:attribute name="ng-model">
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                        <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-blur">
                        <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        
                    </xsl:attribute>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                        <xsl:attribute name="ng-show">
                            <xsl:choose>
                                <xsl:when test="contains(@dependsonparamvalue, ',')">
                                    <xsl:call-template name="multiplevalues">
                                        <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                        <xsl:with-param name="delimiter" select="','"/>
                                        <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                        <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                    </xsl:call-template>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@depends and @parentname">
                        <xsl:attribute name="ng-show">
                            <xsl:choose>
                                <xsl:when test="contains(@parent, ',')">
                                    <xsl:call-template name="multiplevalues">
                                        <xsl:with-param name="list" select="@parent"/>
                                        <xsl:with-param name="delimiter" select="','"/>
                                        <xsl:with-param name="dependsobjectname" select="@parentname" />
                                        <xsl:with-param name="dependsparamname" select="@depends" />
                                    </xsl:call-template>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                    </xsl:if>

                </input>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="number">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />     
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
             
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
             <xsl:if test="@customdependson">
              <xsl:variable name="replaceand">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text" select="@customdependson"/>
                      <xsl:with-param name="replace" select="'and'"/>
                      <xsl:with-param name="by">&amp;&amp;</xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="replaceor">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text"  select="$replaceand"/>
                      <xsl:with-param name="replace" select="'or'"/>
                      <xsl:with-param name="by">&#124;&#124;</xsl:with-param>
                    </xsl:call-template>
              </xsl:variable>
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="$replaceor"></xsl:value-of>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <!--            <div class="col-sm-1 col-md-1 col-lg-1 col-xs-12 text-right">
                    <input  ng-model='{@name}' type="checkbox" />
                     <input  ng-model='{@name}' type="checkbox" ng-true-value="1" ng-false-value="0"/> 
                </div>                       -->
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">                
                    <input  type="number" class="form-control string-to-number hidden-dom-removal" id="{@name}"  >
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                     <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter the value'| translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                         <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>  
                                    </xsl:when>
                                    <xsl:when test="@parent and @parentname and @depends">
										<xsl:choose>
											<xsl:when test="contains(@parent, ',')">
												<xsl:call-template name="multiplevalues">
													<xsl:with-param name="list" select="@parent"/>
													<xsl:with-param name="delimiter" select="','"/>
													<xsl:with-param name="dependsobjectname" select="@parentname" />
													<xsl:with-param name="dependsparamname" select="@depends" />
												</xsl:call-template>
											</xsl:when>
											<xsl:otherwise>
												<xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
											</xsl:otherwise>
										</xsl:choose>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@minval">
                            <xsl:attribute name="min">
                                <xsl:value-of select="@minval"/>
                            </xsl:attribute>                            
                        </xsl:if>
                        <xsl:if test="@maxval">
                            <xsl:attribute name="max">
                                <xsl:value-of select="@maxval"/>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-model">
                            
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
			<xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
			<xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                    </input>
                    <label for="{@name}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                        </xsl:attribute>
                    </span>
                    
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>   
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.number</xsl:text>
                        </xsl:attribute>
                        {{'validnumbermessage' | translate }}
                    </span>
                    <xsl:if test="@minval">
                        <span class="error" >
                            <xsl:attribute name="forname">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="$formname"/>
                                <xsl:text>_form.</xsl:text>
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                                <xsl:text>.$error.min</xsl:text>
                                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                            </xsl:attribute>
                            <!--{{'minnumbervalmessage' | translate }} <xsl:value-of select="@minval" />-->
                            <span>
                                <xsl:attribute name="ng-bind">
                                    '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname,'.$error','.minval')"/>'|translate
                                </xsl:attribute>
                            </span>
                            <span>
                                <xsl:value-of select="@minval" />
                            </span>
                        </span>
                    </xsl:if>
                    <xsl:if test="@maxval">
                        <span class="error" >
                            <xsl:attribute name="forname">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="$formname"/>
                                <xsl:text>_form.</xsl:text>
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                                <xsl:text>.$error.max</xsl:text>
                                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                            </xsl:attribute>
                            <!--{{'maxnumbervalmessage' | translate }} <xsl:value-of select="@maxval" />-->
                            <span> 
                                <xsl:attribute name="ng-bind">
                                    '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname,'.$error','.maxval')"/>'|translate
                                </xsl:attribute>
                            </span>
                            <span>
                                <xsl:value-of select="@maxval" />
                            </span>
                        </span>
                    </xsl:if>
                </div>   
            </div>
        </div>   
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>                    
    </xsl:template>
     <xsl:template name="wholenumber">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <xsl:param name="paramobjectpreviousname" />        
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
             
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <!--                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>-->
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <!--            <div class="col-sm-1 col-md-1 col-lg-1 col-xs-12 text-right">
                    <input  ng-model='{@name}' type="checkbox" />
                     <input  ng-model='{@name}' type="checkbox" ng-true-value="1" ng-false-value="0"/> 
                </div>                       -->
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">                
                    <input  type="number" class="form-control string-to-number hidden-dom-removal" id="{@name}" pattern="\d+">
                        <xsl:attribute name="placeholder">
                            <xsl:choose>
                                <xsl:when test="@placeholder">
                                     <xsl:choose>
                                     <xsl:when test="$paramobjectpreviousname=''" >
                                     {{'<xsl:value-of select="concat($paramobjectname,'.',@webname,'.','placeholder')"/>' | translate}}
                                     </xsl:when>
                                      <xsl:otherwise>
                                      {{'<xsl:value-of select="concat($paramobjectpreviousname,'.',@webname,'.','placeholder')"/>' | translate}}
                                        </xsl:otherwise>
									</xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    {{'Please Enter the value'| translate}}
                                </xsl:otherwise>
                            </xsl:choose> 
                        </xsl:attribute>
                         <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:when test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>  
                                    </xsl:when>
                                    <xsl:when test="@parent and @parentname and @depends">
										<xsl:choose>
											<xsl:when test="contains(@parent, ',')">
												<xsl:call-template name="multiplevalues">
													<xsl:with-param name="list" select="@parent"/>
													<xsl:with-param name="delimiter" select="','"/>
													<xsl:with-param name="dependsobjectname" select="@parentname" />
													<xsl:with-param name="dependsparamname" select="@depends" />
												</xsl:call-template>
											</xsl:when>
											<xsl:otherwise>
												<xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
											</xsl:otherwise>
										</xsl:choose>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@minval and not(@exceptionvalue)">
                            <xsl:attribute name="min">
                                <xsl:value-of select="@minval"/>
                            </xsl:attribute>                            
                        </xsl:if>
                        <xsl:if test="@maxval and not(@exceptionvalue)">
                            <xsl:attribute name="max">
                                <xsl:value-of select="@maxval"/>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-model">
                            
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="name">
                            <!--<xsl:value-of select="@name"/>-->  
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                       <xsl:choose>
                         <xsl:when test="@exceptionvalue">
                               <xsl:attribute name="ng-blur">
                                    <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,');checkValidity(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,',&quot;', @exceptionvalue,'&quot;,&quot;', @maxval ,'&quot;,&quot;', @minval,'&quot;,&quot;', $formname ,'&quot;)')"/>
                               </xsl:attribute>
                         </xsl:when>
                         <xsl:otherwise>
                               <xsl:attribute name="ng-blur">
                                    <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                               </xsl:attribute>
                         </xsl:otherwise>
                        </xsl:choose>
                        <xsl:if test="@Value">
                                        <xsl:attribute name="value">
                                            <xsl:value-of select="@Value" />
                                        </xsl:attribute>
                        <xsl:attribute name="ng-init">
                               <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                    </input>
                    <label for="{@name}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="not(@Display) and (not(@required) or @required !='false')">
                                    required row active
                                </xsl:when>
                                <xsl:otherwise>
                                    active
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <!--<xsl:attribute name="ng-class">{active:<xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>}</xsl:attribute>-->
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate  
                        </xsl:attribute>
                    </span>
                    
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>   
                    <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.number</xsl:text>
                        </xsl:attribute>
                        {{'validnumbermessage' | translate }}
                    </span>
                     <span class="error" >
                        <xsl:attribute name="forname">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="$formname"/>
                            <xsl:text>_form.</xsl:text>
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            <xsl:text>.$error.pattern</xsl:text>
                        </xsl:attribute>
                        {{'validnumbermessage' | translate }}
                    </span>
                    <xsl:if test="@minval">
                        <span class="error" >
                            <xsl:attribute name="forname">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="$formname"/>
                                <xsl:text>_form.</xsl:text>
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                                <xsl:text>.$error.min</xsl:text>
                                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                            </xsl:attribute>
                            <!--{{'minnumbervalmessage' | translate }} <xsl:value-of select="@minval" />-->
                            <span>
                                <xsl:attribute name="ng-bind">
                                    '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname,'.$error','.minval')"/>'|translate
                                </xsl:attribute>
                            </span>
                            <span>
                                <xsl:value-of select="@minval" />
                            </span>
                        </span>
                    </xsl:if>
                    <xsl:if test="@maxval">
                        <span class="error" >
                            <xsl:attribute name="forname">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="$formname"/>
                                <xsl:text>_form.</xsl:text>
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                                <xsl:text>.$error.max</xsl:text>
                                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
                            </xsl:attribute>
                            <!--{{'maxnumbervalmessage' | translate }} <xsl:value-of select="@maxval" />-->
                            <span> 
                                <xsl:attribute name="ng-bind">
                                    '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname,'.$error','.maxval')"/>'|translate
                                </xsl:attribute>
                            </span>
                            <span>
                                <xsl:value-of select="@maxval" />
                            </span>
                        </span>
                    </xsl:if>
                </div>   
            </div>
        </div>   
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>                    
    </xsl:template>

    <xsl:template name="button1">
               
        <xsl:param name="param"/> 
        <xsl:param name="param1"/> 
        <xsl:param name="param2"/>
        <xsl:param name="param3"/> 
        <div class="btn-align">
           <xsl:if test="@dependsonparam and @dependsonobject">
                <xsl:attribute name="ng-show">
                     <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
           </xsl:if>
           <input type="button" class="waves-effect waves-light btn btn-info" id="{@name}">
                <xsl:attribute name="value">
                    {{'<xsl:value-of select="@webname"/>' | translate }}
                </xsl:attribute>
                <xsl:if test="@buttontype">
                    <xsl:attribute name="buttontype" >
                        <xsl:value-of select="@type" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:attribute name="hiddenparams">
                    <xsl:value-of select="$param1" />
                </xsl:attribute>
                <xsl:attribute name="formname">
                    <xsl:value-of select="$param2"/>
                </xsl:attribute>
                <xsl:attribute name="relationformname">
                    <xsl:value-of select="$param3"/>
                </xsl:attribute>
                <xsl:if test="@disable = 'true'">
                     <xsl:attribute name="ng-disabled">
                        true
                     </xsl:attribute>
                </xsl:if>
                <xsl:if test="@access">
                     <xsl:attribute name="ng-disabled">
                        <xsl:value-of select="@access" />
                     </xsl:attribute>
                </xsl:if>
                <xsl:if test="@routeurl" >
                    <xsl:attribute name="ng-click" >
                        <xsl:value-of select="@routeurl" />
                    </xsl:attribute>
                </xsl:if>
            </input>
        </div>
    </xsl:template>
 <xsl:template name="connectButton">
        <xsl:param name="param" />
        <xsl:param name="param1" />
        <xsl:param name="param2" />
        <xsl:param name="param3" />
        <div class="btn-align">
            <button class="waves-effect waves-light btn btn-info" id="{@name}">
                <xsl:attribute name="value">
                    {{'
                    <xsl:value-of select="@webname" />' | translate }}
                </xsl:attribute>
                <xsl:if test="@buttontype">
                    <xsl:attribute name="buttontype">
                        <xsl:value-of select="@type" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:attribute name="hiddenparams">
                    <xsl:value-of select="$param1" />
                </xsl:attribute>
                <xsl:attribute name="formname">
                    <xsl:value-of select="$param2" />
                </xsl:attribute>
                <xsl:attribute name="relationformname">
                    <xsl:value-of select="$param3" />
                </xsl:attribute>
                <xsl:attribute name="ng-click">
                    <xsl:value-of select="@routeurl" />
                </xsl:attribute>
                <xsl:attribute name="ng-class">
                    {btn_bg_color_grn:
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)" />,btn_bg_color_red:
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'!=',@dependsonparamvalue)" />}
                </xsl:attribute>
                <xsl:attribute name="name">
                    <xsl:text>connect</xsl:text>
                </xsl:attribute>
                <span>
                     <xsl:if test="@dependsonparam and @dependsonobject">
                      <xsl:attribute name="ng-show">
                       <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                      </xsl:attribute>
                     </xsl:if>
                    Connect
                    </span>
                <span>
                    <xsl:if test="@dependsonparam and @dependsonobject">
                      <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'!=',@dependsonparamvalue)"/>
                      </xsl:attribute>
                      </xsl:if>
                    Disconnect</span>
            </button>
        </div>
    </xsl:template>
    <xsl:template name="pagelevelButton">       
        <xsl:param name="param"/> 
        <xsl:param name="param1"/> 
        <xsl:param name="formname"/> 
        <xsl:param name="relationformname"/> 
        <div class="btn-align pull-right">
               
               <input type="button" class="waves-effect waves-light btn btn-info" id="{@name}" >
                <xsl:if test="@disabled">
                   <xsl:attribute name="ng-disabled">
                     true
                   </xsl:attribute>
                </xsl:if>
                <xsl:if test="@access">
                   <xsl:attribute name="ng-disabled">
                     <xsl:value-of select="@access"/>
                   </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="value">
                    <xsl:value-of select="@webname"/>
                </xsl:attribute>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:attribute name="ng-click">
                    <xsl:value-of select="$param1" />
                </xsl:attribute>
                <xsl:attribute name="formname">
                    <xsl:value-of select="$formname" />
                </xsl:attribute>
                <xsl:attribute name="relationformname">
                    <xsl:value-of select="$relationformname" />
                </xsl:attribute>
            </input>
        </div>
    </xsl:template>
    
    <xsl:template name="button2">       
        <xsl:param name="param"/> 
        <div class="btn-align col-lg-offset-8 col-md-offset-8" style="position:absolute;left:30px;bottom:0px">
            <input type="button" class="waves-effect waves-light btn btn-info" id="{@name}" >
               <xsl:if test="@access">
                 <xsl:attribute name="ng-disabled">
                    <xsl:value-of select="@access"/>
                 </xsl:attribute>
               </xsl:if>
                <xsl:attribute name="value">
                    <xsl:value-of select="@webname"/>
                </xsl:attribute>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:if test="@routeurl" >
                    <xsl:attribute name="ng-click" >
                        <xsl:value-of select="@routeurl" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="buttontype" >
                    <xsl:value-of select="@type" />
                </xsl:attribute>
            </input>
        </div>
    </xsl:template>
    <xsl:template name="button">  
        <xsl:param name="param"/>  
        <xsl:param name="formname"/>    
        <div class="btn-align custom_btn">
           <xsl:if test="@dependsonparam and @dependsonobject">
					<xsl:attribute name="ng-show">
						<xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam)" />
					</xsl:attribute>
            </xsl:if>
            <input type="button" class="waves-effect waves-light btn btn-info " id="{@name}">
                <xsl:if test="@access">
					<xsl:attribute name="ng-disabled">
						<xsl:value-of select="@access" />
					</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="value">
                    {{'<xsl:value-of select="@webname"/>' | translate }}
                </xsl:attribute>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:if test="@routeurl" >
                    <xsl:attribute name="ng-click" >
                        <xsl:value-of select="@routeurl" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$formname" >
                    <xsl:attribute name="formname" >
                        <xsl:value-of select="$formname" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@popup">
                    <xsl:attribute name="ng-dialog">
                        firstDialogId
                    </xsl:attribute>
                    <xsl:attribute name="ng-dialog-class">
                        ngdialog-theme-default
                    </xsl:attribute>
                </xsl:if>

            </input>
        </div>
    </xsl:template>
     <xsl:template name="eventbutton">  
        <xsl:param name="param"/>  
        <xsl:param name="formname"/>    
        <div class="btn-align custom_event_btn">
           <xsl:if test="@dependsonparam and @dependsonobject">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                    </xsl:attribute>
                </xsl:if>
            <input type="button" class="waves-effect waves-light btn btn-info " id="{@name}">
                <xsl:attribute name="value">
                    {{'<xsl:value-of select="@webname"/>' | translate }}
                </xsl:attribute>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:if test="@disable = 'true'">
                     <xsl:attribute name="ng-disabled">
                        true
                     </xsl:attribute>
                </xsl:if>
                 <xsl:if test="@access">
                     <xsl:attribute name="ng-disabled">
                        <xsl:value-of select="@access" />
                     </xsl:attribute>
                </xsl:if>
                <xsl:if test="@routeurl" >
                    <xsl:attribute name="ng-click" >
                        <xsl:value-of select="@routeurl" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$formname" >
                    <xsl:attribute name="formname" >
                        <xsl:value-of select="$formname" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@popup">
                    <xsl:attribute name="ng-dialog">
                        firstDialogId
                    </xsl:attribute>
                    <xsl:attribute name="ng-dialog-class">
                        ngdialog-theme-default
                    </xsl:attribute>
                </xsl:if>

            </input>
        </div>
    </xsl:template>
    <xsl:template name="pushbutton">  
        <xsl:param name="param"/>  
        <xsl:param name="formname"/>    
        <div class="btn-align custom_btn">
            <push-button-widget id="{@name}">
                <xsl:attribute name="webname">
                    <xsl:value-of select="@webname"/>
                </xsl:attribute>
                <xsl:attribute name="source">
                    <xsl:value-of select="$param" />
                </xsl:attribute>
                <xsl:if test="@name" >
                    <xsl:attribute name="name" >
                        <xsl:value-of select="@name" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@startname" >
                    <xsl:attribute name="startname" >
                        <xsl:value-of select="@startname" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@stopname" >
                    <xsl:attribute name="stopname" >
                        <xsl:value-of select="@stopname" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@cgistarturl" >
                    <xsl:attribute name="cgistarturl" >
                        <xsl:value-of select="@cgistarturl" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@cgistopurl" >
                    <xsl:attribute name="cgistopurl" >
                        <xsl:value-of select="@cgistopurl" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@startobjectquery" >
                    <xsl:attribute name="startobjectquery" >
                        <xsl:value-of select="@startobjectquery" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@stopobjectquery" >
                    <xsl:attribute name="stopobjectquery" >
                        <xsl:value-of select="@stopobjectquery" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@startclick" >
                    <xsl:attribute name="startclick" >
                        <xsl:value-of select="@startclick" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@stopclick" >
                    <xsl:attribute name="stopclick" >
                        <xsl:value-of select="@stopclick" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@timer" >
                    <xsl:attribute name="timer" >
                        <xsl:value-of select="@timer" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@routeurl" >
                    <xsl:attribute name="routeurl" >
                        <xsl:value-of select="@routeurl" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="@type" >
                    <xsl:attribute name="type" >
                        <xsl:value-of select="@type" />
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="$formname" >
                    <xsl:attribute name="formname" >
                        <xsl:value-of select="$formname" />
                    </xsl:attribute>
                </xsl:if>
<!--                <xsl:if test="@popup">
                    <xsl:attribute name="ng-dialog">
                        firstDialogId
                    </xsl:attribute>
                    <xsl:attribute name="ng-dialog-class">
                        ngdialog-theme-default
                    </xsl:attribute>
                </xsl:if>-->
            </push-button-widget>
        </div>
    </xsl:template>
    <xsl:template name="dropdown">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>
            </xsl:if> 
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </xsl:if>
        <xsl:if test="@customdependson">
              <xsl:variable name="replaceand">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text" select="@customdependson"/>
                      <xsl:with-param name="replace" select="'and'"/>
                      <xsl:with-param name="by">&amp;&amp;</xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="replaceor">
                <xsl:call-template name="string-replace-all">
                      <xsl:with-param name="text"  select="$replaceand"/>
                      <xsl:with-param name="replace" select="'or'"/>
                      <xsl:with-param name="by">&#124;&#124;</xsl:with-param>
                    </xsl:call-template>
              </xsl:variable>
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="$replaceor"></xsl:value-of>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                    <xsl:attribute name="class">
                        required row
                    </xsl:attribute>
                </xsl:if>
                <label for="{@name}" class="col-sm-12 col-lg-12 col-md-12 col-xs-12 control-label">
                    <xsl:attribute name="ng-bind">
                        '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                    </xsl:attribute>
                </label>
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <select class="dropdown-toggle form-control1 hidden-dom-removal" id="{@name}">
                    <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                        <xsl:attribute name="filterData">
                           <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@disabledonparamvalue">
                			<xsl:attribute name="ng-disabled">

                            <xsl:value-of select="concat(translate(translate(@disabledonobject,'.',''),'*',''),'.',@disabledonparam,'==',@disabledonparamvalue)"/> 


                			</xsl:attribute>
            		</xsl:if> 
					<xsl:attribute name="validation">
                            <xsl:value-of select="boolean(@xmlvalidation)" />
                    </xsl:attribute>
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:choose>
                                            <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                    <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </xsl:when>
                                    <xsl:when test ="$parentobjectparentstatus=true and $parentobjectparentnamestatus=true  and  $parentobjectdependsstatus=true">
                                        <xsl:value-of select="concat(translate(translate($parentobjectparentname,'.',''),'*',''),'.',$parentobjectdepends,'==',$parentobjectparent)"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>                            
                        </xsl:if>
                        <xsl:if test ="@dependentparams">
                            <xsl:attribute name="dependentparams">
                                <xsl:value-of select="@dependentparams" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test ="@dependsonparams">
                            <xsl:attribute name="dependsonparams">
                                <xsl:value-of select="@dependsonparams" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@disable" > 
                            <xsl:attribute name="ng-disabled" > 
                                <xsl:value-of select="concat('!',translate(translate(@dependsonparamvalue,'*',''),'.',''),'.',@disable)"/>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@disable" >
                            <xsl:attribute name="ng-disabled" >
                                <xsl:value-of select="concat('!',translate(translate(@parent,'*',''),'.',''),'.',@disable)"/>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-model" >
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-change" >
                            <xsl:choose>
                                <xsl:when test="@ddfun">
                                    <xsl:value-of select="concat(@ddfun,'(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@child,'&quot;,','&quot;',@childparam,'&quot;)')"/>
                                </xsl:when>
                                <xsl:when test="@customfun">
                                    <xsl:value-of select="concat('wifi(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,&quot;',@customfun,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                                </xsl:when>
                                <xsl:when test="@xmlvalidation">
                                    <xsl:value-of
                                        select="concat('dependencychange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',$paramobjectname,'&quot;,&quot;',@name,'&quot;,&quot;',@dependentparams,'&quot;',')')"/> 
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat('ddChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>  
                        <xsl:if test="@customfun"> 
                            <xsl:attribute name="ng-options" >
                                <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                <xsl:if test="@order">
                                    |orderBy:'name'
                                </xsl:if>
                            </xsl:attribute>
                        </xsl:if>
                       <xsl:choose>
                            <xsl:when test="@xmlvalidation and not(@url) and not(@validvalues)">
                                <xsl:attribute name="ng-init" >
                                    <xsl:value-of
                                        select="concat('dependencychange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',$paramobjectname,'&quot;,&quot;',@name,'&quot;,&quot;',@dependentparams,'&quot;,&quot;',$formname,'&quot;,&quot;','init','&quot;)')"/>
                                </xsl:attribute>
                                <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                     <xsl:if test="@order">
                                        |orderBy:'name'
                                    </xsl:if>
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:when test="@xmlvalidation and @url">
                                <xsl:attribute name="ng-init" >
                                    <xsl:value-of
                                        select="concat('depenencyUrl(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,&quot;',@dependentparams,'&quot;,&quot;',$formname,'&quot;,&quot;',@url,'&quot;)')"/>
                                </xsl:attribute>
                                <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                    <xsl:if test="@order">
                                       |orderBy:'name'
                                    </xsl:if>
                                </xsl:attribute>
                            </xsl:when>
                           <xsl:when test="@xmlvalidation and @validvalues">
                               <xsl:attribute name="ng-init" >
                                    <xsl:value-of                                       select="concat('depenencyUrl(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,&quot;',@dependentparams,'&quot;,&quot;',$formname,'&quot;,&quot;',@validvalues,'&quot;)')"/>
                               </xsl:attribute>
                               <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                    <xsl:if test="@order">
                                       |orderBy:'name'
                                    </xsl:if>
                                </xsl:attribute>
                            </xsl:when>

                            <xsl:when test ="@url and not(@urlvalue)">
                                <xsl:attribute name="ng-init" >
                                    <xsl:value-of
                                        select="concat('dropdownUrlReq(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,','&quot;',boolean(@ddfun),'&quot;,&quot;',@firstselect,'&quot;,&quot;',@urlparam,'&quot;,&quot;',@child,'&quot;,&quot;',@childparam,'&quot;',')')"/>                                    
                                </xsl:attribute>
                                <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                     <xsl:if test="@order">
                                        |orderBy:'name'
                                    </xsl:if>
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:when test ="@url and @urlvalue and not(@validvalues)">
                                <xsl:attribute name="ng-mouseover">
                                    <xsl:value-of select="concat('dependent(&quot;',translate(@url,'*',''),@urlvalue,'&quot;,','&quot;',@name,'&quot;)')" />
                                </xsl:attribute>
                                <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                     <xsl:if test="@order">
                                        |orderBy:'name'
                                    </xsl:if>
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:when test ="@url and @urlvalue and @validvalues">
                                <xsl:attribute name="ng-mouseover">
                                    <xsl:value-of select="concat('dependent(&quot;',translate(@url,'*',''),@urlvalue,'&quot;,','&quot;',@name,'&quot;,','&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',boolean(@validvalues),'&quot;)')" />
                                </xsl:attribute>
                                <option value="" class="form-control1" >
                                    <xsl:text>
                                        Select
                                    </xsl:text>
                                </option>
                                <xsl:call-template name="tokenizeString">
                                    <xsl:with-param name="list" select="./@validvalues"/>
                                    <xsl:with-param name="delimiter" select="','"/>
                                </xsl:call-template>
                            </xsl:when>
                            <xsl:when test="not(@url) and not(@validvalues)">
                                <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                                     <xsl:if test="@order">
                                        |orderBy:'name'
                                     </xsl:if>
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:otherwise>
                                <option value="" class="form-control1" >
                                    <xsl:text>
                                        Select
                                    </xsl:text>
                                </option>
                                <xsl:call-template name="tokenizeString">
                                    <xsl:with-param name="list" select="./@validvalues"/>
                                    <xsl:with-param name="delimiter" select="','"/>
                                </xsl:call-template>
                            </xsl:otherwise>
                        </xsl:choose>
                     </select>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name,'val')"/> |translate
                        </xsl:attribute>
                    </span>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="$paramobjectname"/>
                            <xsl:with-param name="originalobject" select="$paramoriginalobjectname"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>                       
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="dropdown1">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 input-field">
            <select class="dropdown-toggle1 form-control1" id="{@name}">
                <xsl:attribute name="ng-model">
                    <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                </xsl:attribute>
                <xsl:attribute name="name">
                    <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                    <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                </xsl:attribute>
                <xsl:attribute name="ng-change" >
                    <xsl:value-of select="concat('ddChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                </xsl:attribute>  
                <xsl:choose>
                    <xsl:when test ="@url">
                        <xsl:attribute name="ng-init" >
                            <xsl:value-of select="concat('jsonreq(&quot;',@name,'&quot;,','&quot;',@url,'&quot;',')')"/>
<!--                            <xsl:text>jsonreq('</xsl:text> 
                            <xsl:value-of select="@url" />
                            <xsl:text>','</xsl:text> 
                            <xsl:value-of select="@name" />
                            <xsl:text>')</xsl:text>-->
                        </xsl:attribute>
                        <xsl:attribute name="ng-options" >
                            <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                             <xsl:if test="@order">
                                    |orderBy:'name'
                            </xsl:if>
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="ng-init">
                            <xsl:value-of select="concat('commaremoval(&quot;',@validvalues,'&quot;,&quot;',@name,'&quot;)')" />
                        </xsl:attribute>
                        <xsl:attribute name="ng-options" >
                            <xsl:value-of select="concat('obj.id as obj.name for obj in ', @name)" />
                             <xsl:if test="@order">
                                    |orderBy:'name'
                            </xsl:if>
                        </xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
            </select>
        </div>
    </xsl:template>
    <xsl:template name="dependentdropdown">
        <xsl:param name="formname" />
        <div class="form-group">
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat(../@name,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                    <xsl:attribute name="class">
                        required row
                    </xsl:attribute>
                </xsl:if>
                <label for="{@name}" class="col-sm-12 col-md-12 col-lg-12 control-label">
                    <xsl:attribute name="ng-bind">'<xsl:value-of select="concat(../@originalobject,'.',@webname)"/>' | translate</xsl:attribute>
                </label>
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <select class="dropdown-toggle1 form-control1" id="{@name}">
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                                    </xsl:when>
                                    <xsl:when test ="../@dependsonparamvalue and ../@dependsonobject  and  ../@dependsonparam">
                                        <xsl:value-of select="concat(translate(translate(../@dependsonobject,'.',''),'*',''),'.',../@dependsonparam,'==',../@dependsonparamvalue)"/>
                                    </xsl:when>
                                    <xsl:when test ="../@parent and ../@parentname  and  ../@depends">
                                        <xsl:value-of select="concat(translate(translate(../@parentname,'.',''),'*',''),'.',../@depends,'==',../@parent)"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>

                        <xsl:attribute name="ng-model">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="name">
                            <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-change" >
                            <xsl:value-of select="concat('ddChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                        </xsl:attribute>
                        <xsl:if test="@urldependentparent and @urldependentparam">
                            <xsl:attribute  name="ng-options">
                                <xsl:value-of select="concat(@name,' for ',@name,' in ',translate(translate(@urldependentparent,'*',''),'.',''),'.',@urldependentparam,'.',@name)" />
                            </xsl:attribute>  
                        </xsl:if>
                        <xsl:choose>
                            <xsl:when test ="@url">
                                <xsl:attribute name="ng-init" >
                                    <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;',')')"/>
                                </xsl:attribute>
                                <xsl:attribute name="ng-options" >
                                    <xsl:value-of select="concat('country for (country, ',@name,')',' in ',@name)" />
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:call-template name="tokenizeString">
                                    <xsl:with-param name="list" select="./@validvalues"/>
                                    <xsl:with-param name="delimiter" select="','"/>
                                </xsl:call-template>
                            </xsl:otherwise>
                        </xsl:choose>
                    </select>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="../@name"/>
                            <xsl:with-param name="originalobject" select="../@originalobject"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>
                </div>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="toggle">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            <xsl:if test="@dependsonparamvalue">
            <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                 </xsl:choose>
            </xsl:attribute>
            </xsl:if>


           <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <!-- <xsl:if test="@dependsonparamvalue and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if> -->
            <div class="row switchblock">
                <label for="{@name}" class="control-label">
                    <xsl:attribute name="ng-bind">'<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate</xsl:attribute>
                </label>
                <div class="text-left">
                    <switch id="{@name}"  on="ON" off="OFF">
                        <xsl:attribute name="ng-model">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="name">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test ="@dependentparams">
                            <xsl:attribute name="dependentparams">
                                <xsl:value-of select="@dependentparams" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test ="@dependsonparams">
                            <xsl:attribute name="dependsonparams">
                                <xsl:value-of select="@dependsonparams" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@xmlvalidation">
                            <xsl:attribute name="customclick">
                                    <xsl:value-of select="concat('dependencychange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,','&quot;',$paramobjectname,'&quot;,&quot;',@name,'&quot;,&quot;',@dependentparams,'&quot;',')')"/> 
                            </xsl:attribute>  
                        </xsl:if>
                        <xsl:attribute name="ng-change">
                            <xsl:text>toggleClick</xsl:text>
                        </xsl:attribute>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disable">
                                true
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
                            <xsl:attribute name="ng-init">
                                <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                    </switch>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="checkboxwithoutlabel">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@parent and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row checkbox-top-align" >
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">                
                    <div class="checkbox1">                        
                        <input type="checkbox" ng-true-value="'true'" class="hidden-dom-removal" ng-false-value="'false'" >  
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <!--                            <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                                <xsl:attribute name="ng-required">
                                    <xsl:choose>
                                        <xsl:when test ="@parent and @parentname  and  @depends">
                                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                                        </xsl:when>
                                        <xsl:when test ="../@parent and ../@parentname  and  ../@depends">
                                            <xsl:value-of select="concat(translate(translate(../@parentname,'.',''),'*',''),'.',../@depends,'==',../@parent)"/>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            true
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:attribute>
                            </xsl:if>-->
                            <xsl:attribute name="ng-model">
                                <!-- <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>-->
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:if test="@access = 'readonly'">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:text>
                                        true
                                    </xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@Value">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="@Value" />
                                </xsl:attribute>
                                <xsl:attribute name="ng-init">
                                    <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="name">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute> 
                            <!-- <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(concat(translate(../@name,'.','_'),'.',@name),'=0')"/>
                            </xsl:attribute> -->
                            <xsl:attribute name="ng-change">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                                
                            </xsl:attribute>
                            <!--                            <xsl:if test='@parent'>
                                <xsl:attribute name="ng-checked">
                                    <xsl:value-of select="concat(@parent,'==','$scope.ddstatus')"/>
                                </xsl:attribute>
                            </xsl:if> -->
                            <xsl:if test="@disable"> 
                                <xsl:attribute name="ng-disabled"> 
                                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'*',''),'.',''),'.',@dependsonparam,'==',@dependsonparamvalue)" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@disable">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:value-of select="concat(translate(translate(@parentname,'*',''),'.',''),'.',@depends,'==',@parent)" />
                                </xsl:attribute>
                            </xsl:if>
                        </input>
                        <label class="checkbox_nolabel">
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                           <!-- <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                            </xsl:attribute>-->
                        </label>
                        <xsl:if test="@description">
                            <span class="help_btn">
                                <div style="cursor:pointer" help_click="">
                                    <xsl:attribute name="desc_help">
                                        <xsl:value-of select="concat(@name,'_desc',position())" />
                                    </xsl:attribute>
                                    <i class="fa fa-question-circle">
                                    </i>
                                </div>
                            </span>
                        </xsl:if>
                        <!--                        <span class="error">
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-bind">
                                <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/>  
                            </xsl:attribute>
                        </span>-->
                        <label>
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                        </label>
                        <!--                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:call-template name="requiredErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="../@name"/>
                                <xsl:with-param name="paramname" select="@name"/>
                            </xsl:call-template>
                        </xsl:if>-->
                    </div>                        
                
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="checkbox">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@parent and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row checkbox-top-align" >
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 text-left">                
                    <div class="checkbox1">                        
                        <input type="checkbox" ng-true-value="'1'" class="hidden-dom-removal" ng-false-value="'0'" >  
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <!--                            <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                                <xsl:attribute name="ng-required">
                                    <xsl:choose>
                                        <xsl:when test ="@parent and @parentname  and  @depends">
                                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                                        </xsl:when>
                                        <xsl:when test ="../@parent and ../@parentname  and  ../@depends">
                                            <xsl:value-of select="concat(translate(translate(../@parentname,'.',''),'*',''),'.',../@depends,'==',../@parent)"/>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            true
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:attribute>
                            </xsl:if>-->
                            <xsl:attribute name="ng-model">
                                <!-- <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>-->
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:if test="@access">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:text>
                                        true
                                    </xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@Value">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="@Value" />
                                </xsl:attribute>
                                <xsl:attribute name="ng-init">
                                    <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="name">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute> 
                            <!-- <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(concat(translate(../@name,'.','_'),'.',@name),'=0')"/>
                            </xsl:attribute> -->
                            <xsl:attribute name="ng-change">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                                
                            </xsl:attribute>
                            <!--                            <xsl:if test='@parent'>
                                <xsl:attribute name="ng-checked">
                                    <xsl:value-of select="concat(@parent,'==','$scope.ddstatus')"/>
                                </xsl:attribute>
                            </xsl:if> -->
                            <xsl:if test="@disable"> 
                                <xsl:attribute name="ng-disabled"> 
                                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'*',''),'.',''),'.',@dependsonparam,'==',@dependsonparamvalue)" />
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="@disable">
                                <xsl:attribute name="ng-disabled">
                                    <xsl:value-of select="concat(translate(translate(@parentname,'*',''),'.',''),'.',@depends,'==',@parent)" />
                                </xsl:attribute>
                            </xsl:if>
                        </input>
                        <label class="checkbox_left_align">
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                            </xsl:attribute>
                        </label>
                        <xsl:if test="@description">
                            <span class="help_btn">
                                <div style="cursor:pointer" help_click="">
                                    <xsl:attribute name="desc_help">
                                        <xsl:value-of select="concat(@name,'_desc',position())" />
                                    </xsl:attribute>
                                    <i class="fa fa-question-circle">
                                    </i>
                                </div>
                            </span>
                        </xsl:if>
                        <!--                        <span class="error">
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-bind">
                                <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/>  
                            </xsl:attribute>
                        </span>-->
                        <label>
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                        </label>
                        <!--                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:call-template name="requiredErrorMessage">
                                <xsl:with-param name="FormName" select="$formname"/>
                                <xsl:with-param name="objectname" select="../@name"/>
                                <xsl:with-param name="paramname" select="@name"/>
                            </xsl:call-template>
                        </xsl:if>-->
                    </div>                        
                
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="checkbox1">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
                
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@parent">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row checkbox-top-align">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 text-left">
                    <input type="checkbox" class="hidden-dom-removal">  
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <!--                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                                    </xsl:when>
                                    <xsl:when test ="../@parent and ../@parentname  and  ../@depends">
                                        <xsl:value-of select="concat(translate(translate(../@parentname,'.',''),'*',''),'.',../@depends,'==',../@parent)"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>-->

                        <xsl:attribute name="ng-model">
                            <!--                        <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@access">
                            <xsl:attribute name="ng-disabled">
                                <xsl:text>
                                    true
                                </xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@Value">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Value" />
                            </xsl:attribute>
                            <xsl:attribute name="ng-init">
                                <xsl:value-of select="concat('defaultvalue(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'&quot;,&quot;',@name,'&quot;,&quot;',@Value,'&quot;)')" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <!--  <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>  -->
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute> 
                        <!-- <xsl:attribute name="ng-init">
                    <xsl:value-of select="concat(concat(translate(../@name,'.','_'),'.',@name),'=0')"/>
                        </xsl:attribute> -->
                        <xsl:attribute name="ng-change">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                        <xsl:if test='@dependsonparamvalue'>
                            <xsl:attribute name="ng-checked">
                                <xsl:value-of select="concat(@dependsonparamvalue,'==','$scope.ddstatus')"/>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test='@parent'>
                            <xsl:attribute name="ng-checked">
                                <xsl:value-of select="concat(@parent,'==','$scope.ddstatus')"/>
                            </xsl:attribute>
                        </xsl:if> 
                    </input>
                    <label class="checkbox_left_align">
                        <xsl:attribute name="for">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                        </xsl:attribute>
                    </label>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <!--                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/>  
                        </xsl:attribute>
                    </span>-->
                    <!--                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="../@name"/>
                            <xsl:with-param name="paramname" select="@name"/>
                        </xsl:call-template>
                    </xsl:if>-->
                </div>                        
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
    <xsl:template name="tokenizeString">
        <!--passed template parameter -->
        <xsl:param name="list"/>
        <xsl:param name="delimiter"/>
        <xsl:choose>
            <xsl:when test="contains($list, $delimiter)">                
                <option class="form-control1">
                    <!-- get everything in front of the first delimiter -->
                    <xsl:value-of select="substring-before($list,$delimiter)"/>
                </option>
                <xsl:call-template name="tokenizeString">
                    <!-- store anything left in another variable -->
                    <xsl:with-param name="list" select="substring-after($list,$delimiter)"/>
                    <xsl:with-param name="delimiter" select="$delimiter"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="$list = ''">
                        <xsl:text/>
                    </xsl:when>
                    <xsl:otherwise>
                        <option class="form-control1">
                            <xsl:value-of select="$list"/>
                        </option>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="string-replace-all">
      <xsl:param name="text"/>
      <xsl:param name="replace"/>
      <xsl:param name="by"/>
      <xsl:choose>
        <xsl:when test="contains($text,$replace)">
          <xsl:value-of select="substring-before($text,$replace)"/>
          <xsl:value-of select="$by"/>
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="substring-after($text,$replace)"/>
            <xsl:with-param name="replace" select="$replace"/>
            <xsl:with-param name="by" select="$by"/>
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$text"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:template>
    <xsl:template name="substring-after-last">
        <xsl:param name="input" />
        <xsl:param name="marker" />
        <xsl:choose>
            <xsl:when test="contains($input,$marker)">
                <xsl:call-template name="substring-after-last">
                    <xsl:with-param name="input"
                                    select="substring-after($input,$marker)" />
                    <xsl:with-param name="marker" select="$marker" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$input" />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    
    <xsl:template name="multiselect">
        <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">
            <dropdown-multiselect model="selectedUserIds" options="users" open="open" >
                <xsl:attribute name="source">
                    <xsl:value-of select="@validvalues"/>
                </xsl:attribute>
                <xsl:attribute name="parameter">
                    <xsl:value-of select="@name"/>
                </xsl:attribute>
                <xsl:attribute name="ng-init">
                    <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;',')')"/>
                </xsl:attribute>
            </dropdown-multiselect>
        </div>
    </xsl:template>
  
    <xsl:template name="editableselect">
        <xsl:param name="formname" />
        <div class="form-group col-lg-6">
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat(../@name,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row">
                <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                    <xsl:attribute name="class">
                        required row
                    </xsl:attribute>
                </xsl:if>
                <label for="{@name}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 control-label no-padding-hr">
                    <xsl:attribute name="ng-bind">'<xsl:value-of select="concat(../@originalobject,'.',@webname)"/>' | translate</xsl:attribute>
                </label>
                <div class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12 input-field">
                    <!--<select class="dropdown-toggle form-control" id="{@name}">-->                
                    <input type="text" class="form-control" id="{@name}" style="margin-left: 10px; margin-right: 10px;">
                        <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                            <xsl:attribute name="ng-required">
                                <xsl:choose>
                                    <xsl:when test ="@dependsonparamvalue and @dependsonobject  and  @dependsonparam">
                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                                    </xsl:when>
                                    <xsl:when test ="@parent and @parentname  and  @depends">
                                        <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                                    </xsl:when>
                                    <xsl:when test ="../@dependsonparamvalue and ../@dependsonobject  and  ../@dependsonparam">
                                        <xsl:value-of select="concat(translate(translate(../@dependsonobject,'.',''),'*',''),'.',../@dependsonparam,'==',../@dependsonparamvalue)"/>
                                    </xsl:when>
                                    <xsl:when test ="../@parent and ../@parentname  and  ../@depends">
                                        <xsl:value-of select="concat(translate(translate(../@parentname,'.',''),'*',''),'.',../@depends,'==',../@parent)"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        true
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="ng-model">
                            <!-- <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>-->
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                        </xsl:attribute>
                        <xsl:if test="@getObject">
                            <xsl:attribute name="ng-change">
                                <!-- <xsl:value-of select="concat(translate(../@name,'.','_'),'.',@name)"/>-->
                               <xsl:value-of select="concat('resetValue(&quot;',@child,'&quot;,&quot;',@name,'&quot;,&quot;',concat(translate(translate(../@name,'*',''),'.',''),'.',@name), '&quot;)')"/>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-blur">
                            <xsl:value-of select="concat('textChange(&quot;',translate(translate(../@name,'*',''),'.',''),'__',@name,'&quot;,',translate(translate(../@name,'*',''),'.',''),'.',@name,')')"/>
                            
                        </xsl:attribute>
                    </input>
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle editableselect"  data-toggle="dropdown">
                            <span class="caret-icon">
                                <i class="fa fa-caret-down"></i>
                            </span>
                        </button>
                        <ul id="color-dropdown-menu" class="dropdown-menu dropdown-menu-right" role="menu">
                            <xsl:attribute name="ng-model" >
                                <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test ="@url">
                                    <xsl:attribute name="ng-init" >
                                        <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;',')')"/>
                                        <!--<xsl:text>dropdownUrlReq()</xsl:text>-->
                                    </xsl:attribute>
                                    <li class="input-lg">
                                        <xsl:attribute name="ng-repeat">
                                            opt in <xsl:value-of select="@name" />
                                        </xsl:attribute>
                                        
                                         <xsl:attribute name="ng-if">
                                            opt.id
                                        </xsl:attribute>
                                        <xsl:variable name="selectedval">{{opt.id}}</xsl:variable>
                                        <xsl:variable name="selectedObjectName">{{opt.objectname}}</xsl:variable>
                                        <a>
                                           <xsl:if test="@getObject">
                                            <xsl:attribute name="getObject" >
                                                <xsl:value-of select="concat(@child , '-',$selectedObjectName,  @getObject)"/>
                                                <!--<xsl:text>dropdownUrlReq()</xsl:text>-->
                                            </xsl:attribute>
                                           </xsl:if>
                                            <xsl:attribute name="ng-click">
                                                <!--<xsl:value-of select="concat('selectedName(','&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',$selectedval,'&quot;)')" />-->
                                                <xsl:text>dropdownliclick($event)</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="parameters">
                                                <xsl:value-of select="concat($selectedval,'?',@name,'?',translate(translate(../@name,'*',''),'.',''))" />
                                            </xsl:attribute>
                                            {{opt.id}}
                                        </a>
                                    </li>
                                </xsl:when>
                                <xsl:otherwise>
                                    <option value="" class="form-control1" >
                                        <xsl:text>
                                            Select
                                        </xsl:text>
                                    </option>
                                    <xsl:call-template name="tokenizeString1">
                                        <xsl:with-param name="list" select="./@validvalues"/>
                                        <xsl:with-param name="delimiter" select="','"/>
                                    </xsl:call-template>
                                </xsl:otherwise>
                            </xsl:choose>
                        </ul>
                        <!--</select>-->
                    </div> 
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>   
                    <span class="error">
                        <xsl:attribute name="ng-show">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'responsestatus')"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-bind">
                            <xsl:value-of select="concat(translate(translate(../@name,'*',''),'.',''),'_',@name,'val')"/> |translate
                        </xsl:attribute>
                    </span>
                    <xsl:if test="not(@Display) and (not(@required) or @required !='false')">
                        <xsl:call-template name="requiredErrorMessage">
                            <xsl:with-param name="FormName" select="$formname"/>
                            <xsl:with-param name="objectname" select="../@name"/>
                            <xsl:with-param name="originalobject" select="../@originalobject"/>
                            <xsl:with-param name="paramname" select="@name"/>
                            <xsl:with-param name="webname" select="@webname"/>
                        </xsl:call-template>
                    </xsl:if>                   
                </div>
            </div>
        </div>
        <div class="form-group no-padding-hr">
                
        </div>
    </xsl:template>  
    
    <xsl:template name="tokenizeString1">
        <!--passed template parameter -->
        <xsl:param name="list"/>
        <xsl:param name="delimiter"/>
        <xsl:choose>
            <xsl:when test="contains($list, $delimiter)">                
                <!--<option class="form-control">-->
                <li class="input-lg">
                    <a>
                        <xsl:attribute name="ng-click">
                            <!--selectedName('<xsl:value-of select="substring-before($list,$delimiter)"/>')-->
                            <xsl:value-of select="concat('selectedNameHard(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;',',&quot;',substring-before($list,$delimiter),'&quot;)')"/>
                            <!--<xsl:value-of select="concat('selectedName(&quot;',substring-before($list,$delimiter),'&quot;)')"/>-->
                            
                        </xsl:attribute>
                        <xsl:value-of select="substring-before($list,$delimiter)"/>
                    </a>
                    <!-- get everything in front of the first delimiter -->
                    
                </li>
                <!--</option>-->
                <xsl:call-template name="tokenizeString1">
                    <!-- store anything left in another variable -->
                    <xsl:with-param name="list" select="substring-after($list,$delimiter)"/>
                    <xsl:with-param name="delimiter" select="$delimiter"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="$list = ''">
                        <xsl:text/>
                    </xsl:when>
                    <xsl:otherwise>
                        <li class="input-lg">
                            <!--<option class="form-control">-->
                            <a>
                                <xsl:attribute name="ng-click">
                                    <!--selectedName('<xsl:value-of select="$list"/>')-->
                                    <xsl:value-of select="concat('selectedNameHard(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;',',&quot;',$list,'&quot;)')"/>
                                </xsl:attribute>
                                <xsl:value-of select="$list"/>
                            </a>
                            <!--</option>-->
                        </li>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="requiredErrorMessage">
        <xsl:param name="FormName"/>
        <xsl:param name="objectname"/>
        <xsl:param name="originalobject"/>
        <xsl:param name="paramname"/>
        <xsl:param name="webname"/>
        <span class="error" >
            <xsl:attribute name="forname">
                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_',$paramname)"/>
            </xsl:attribute>
            <xsl:attribute name="ng-show">
                <xsl:value-of select="$FormName"/>
                <xsl:text>_form.</xsl:text>
                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_',$paramname)"/>
                <xsl:text>.$error.required</xsl:text>
                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
            </xsl:attribute>
            <!--{{'<xsl:value-of select="concat($objectname,'.',$webname)"/>' | translate }} {{'required' | translate }}-->
            <xsl:attribute name="ng-bind">
                '<xsl:value-of select="concat($originalobject,'.',$webname,'.$error','.required')"/>'|translate
            </xsl:attribute>
        </span>
        
    </xsl:template>
    <xsl:template name="minErrorMessage">
        <xsl:param name="FormName"/>
        <xsl:param name="objectname"/>
        <xsl:param name="originalObjectname" />
        <xsl:param name="paramname"/>
        <xsl:param name="webname"/>
        <xsl:param name="minlen"/>
        <span class="error" >
            <xsl:attribute name="forname">
                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_',$paramname)"/>
            </xsl:attribute>
            <xsl:attribute name="ng-show">
                <xsl:value-of select="$FormName"/>
                <xsl:text>_form.</xsl:text>
                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_',$paramname)"/>
                <xsl:text>.$error.minlength</xsl:text>
                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
            </xsl:attribute>
            <!--{{'minlengthmessage' | translate }}  <xsl:value-of select="$minlen" />  {{'characters' | translate }}-->
            <span>
                <xsl:attribute name="ng-bind">
                    '<xsl:value-of select="concat($originalObjectname,'.',$webname,'.$error','.minlen')"/>'|translate
                </xsl:attribute>
            </span>
            <span>
                <xsl:value-of select="$minlen" />
            </span> 
        </span>
    </xsl:template>
    <xsl:template name="maxErrorMessage">
        <xsl:param name="FormName"/>
        <xsl:param name="objectname"/>
        <xsl:param name="originalObjectname" />
        <xsl:param name="paramname"/>
        <xsl:param name="webname"/>
        <xsl:param name="maxlength"/>
        <span class="error" >
            <xsl:attribute name="forname">
                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_',$paramname)"/>
            </xsl:attribute>
            <xsl:attribute name="ng-show">
                <xsl:value-of select="$FormName"/>
                <xsl:text>_form.</xsl:text>
                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_',$paramname)"/>
                <xsl:text>.$error.maxlength</xsl:text>
                <xsl:text>&amp;&amp; formsubmitstatus</xsl:text>
            </xsl:attribute>
            <!--{{'maxlengthmessage' | translate }}  <xsl:value-of select="$maxlength" />  {{'characters' | translate }}-->
            <span> 
                <xsl:attribute name="ng-bind">
                    '<xsl:value-of select="concat($originalObjectname,'.',$webname,'.$error','.maxlen')"/>'|translate
                </xsl:attribute>
            </span>
            <span>
                <xsl:value-of select="$maxlength" />
            </span>
        </span>
    </xsl:template>
    <xsl:template name="multiplevalues">
        <!--passed template parameter -->
        <xsl:param name="list"/>
        <xsl:param name="delimiter"/>
        <xsl:param name="dependsobjectname" />
        <xsl:param name="dependsparamname" />
        <xsl:choose>
            <xsl:when test="contains($list, $delimiter)">                
                <xsl:value-of select="concat(translate(translate($dependsobjectname,'.',''),'*',''),'.',$dependsparamname,'==',substring-before($list,$delimiter),' || ' )"/>    
                <xsl:call-template name="multiplevalues">
                    <xsl:with-param name="list" select="substring-after($list,$delimiter)"/>
                    <xsl:with-param name="delimiter" select="$delimiter"/>
                    <xsl:with-param name="dependsobjectname" select="$dependsobjectname" />
                    <xsl:with-param name="dependsparamname" select="$dependsparamname" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="$list = ''">
                        <xsl:text/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="concat(translate(translate($dependsobjectname,'.',''),'*',''),'.',$dependsparamname,'==',$list)"/>    
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="radio">
        <xsl:param name="formname" />
        <xsl:param name="paramobjectname" />
        <xsl:param name="paramoriginalobjectname" />
        <xsl:param name="parentobjectparent" />
        <xsl:param name="parentobjectparentname" />
        <xsl:param name="parentobjectdepends" />
        <xsl:param name="parentobjectparentstatus" />
        <xsl:param name="parentobjectparentnamestatus" />
        <xsl:param name="parentobjectdependsstatus" />
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="name(parent::*)='col' and count(../../*)='1'">
                        <xsl:text>form-group no-padding-hr col-lg-6 col-xs-12</xsl:text>
                    </xsl:when>
                    <xsl:when test="name(parent::*)='col'">
                        <xsl:text>form-group no-padding-hr col-xs-12 col-lg-</xsl:text>
                        <xsl:value-of select="number(12 div count(../../*))" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>form-group no-padding-hr col-lg-12 col-xs-12</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
               
            </xsl:attribute>
            <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@parent and not(@disable)">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@description">
                <div class="row">
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(@name,'_desc',position(),'=true')" />
                    </xsl:attribute>
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(@name,'_desc',position(),'==false')" />
                    </xsl:attribute>
                    <span class="col-lg-offset-3  col-md-offset-3 col-sm-12 col-lg-6 col-md-6 col-xs-12 descrip_txt">
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="concat($paramobjectname,'.',@webname,'.',@description)"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="row checkbox-top-align" >
                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 text-left radiogroup">
                    <label for="{@name}" class="control-label">
                        <xsl:attribute name="ng-bind">'<xsl:value-of select="concat(../@originalobject,'.',@webname)"/>' | translate</xsl:attribute>
                    </label>  
                    <!--<div class="checkbox1 ">--> 
                    <p>       
                        <xsl:attribute name="ng-repeat">
                            value in  <xsl:value-of select="concat('radiofunction(&quot;',@validvalues,'&quot;)')" />
                        </xsl:attribute>           
                        <input type="radio" class="with-gap"> 
                            <xsl:attribute name="id">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>{{$index+1}}
                            </xsl:attribute>
                            <xsl:attribute name="ng-model">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'.',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="name">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                            </xsl:attribute>
                            <xsl:attribute name="ng-change">
                                <xsl:value-of select="concat('textChange(&quot;',translate(translate($paramobjectname,'*',''),'.',''),'__',@name,'&quot;,',translate(translate($paramobjectname,'*',''),'.',''),'.',@name,')')"/>
                               
                            </xsl:attribute>
                            <xsl:attribute name="value">
                                {{value}}
                            </xsl:attribute>
                        </input>
                        <label class="checkbox_left_align">
                            <xsl:attribute name="for">
                                <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>{{$index+1}}
                            </xsl:attribute>
                            <!--                                <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="concat($paramoriginalobjectname,'.',@webname)"/>' | translate
                            </xsl:attribute>-->
                            {{value}}
                        </label>
                    </p>
                    <xsl:if test="@description">
                        <span class="help_btn">
                            <div style="cursor:pointer" help_click="">
                                <xsl:attribute name="desc_help">
                                    <xsl:value-of select="concat(@name,'_desc',position())" />
                                </xsl:attribute>
                                <i class="fa fa-question-circle">
                                </i>
                            </div>
                        </span>
                    </xsl:if>
                    <label>
                        <xsl:attribute name="for">
                            <xsl:value-of select="concat(translate(translate($paramobjectname,'*',''),'.',''),'_',@name)"/>
                        </xsl:attribute>
                    </label>
                    <!--</div>-->                       
               
                </div>
            </div>
        </div>
        <xsl:if test="name(parent::*)='col' and count(../../*)='1'">
            <div class="form-group no-padding-hr">
                
            </div>
        </xsl:if>
    </xsl:template>
<xsl:template match="object[@viewtype='form']">
        <xsl:param name="layout" />
        <!--<xsl:value-of select="$layout" />-->
        <h4 class="panel_title hide">
            <xsl:value-of select="//subtitle"/>
        </h4>
        <div class="panel panel-default panel-bg1">
		   <xsl:if test="@Display='No'">
                <xsl:attribute name="ng-hide">
                    <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue">
            <xsl:attribute name="ng-show">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                 </xsl:choose>
            </xsl:attribute>
            </xsl:if>

            <xsl:if test="$layout='true'">
                <xsl:attribute name="class">
                    col-lg-6 panel panel-default panel-bg1 no-padding-hr
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@title">
                <div class="panel-heading blu_bg">
                    <xsl:if test="@icon">
                        <img class="panel_icons">
                            <xsl:attribute name="src">
                                <xsl:value-of select="concat('images/icons/',@icon,'.png')" />
                            </xsl:attribute>
                        </img>
                    </xsl:if> 
                             
                    <span>                        
                        <xsl:attribute name="ng-bind">
                            '<xsl:value-of select="@title"/>' | translate
                        </xsl:attribute>
                    </span>
                </div>
            </xsl:if>
            <div class="panel-body no-padding">
                <xsl:variable name="objectname">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>
                    </xsl:if>
                    <xsl:for-each select="./object">
                        <xsl:value-of select="@name"/>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="relationobjectname">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>
                        <xsl:text>,</xsl:text>
                    </xsl:if>
                    <xsl:for-each select="./object">
                        <xsl:value-of select="@name"/>
                        <xsl:text>,</xsl:text>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="hiddenparams">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name">
                            <xsl:value-of select="@name"/>?<xsl:for-each select="parameter | row/col/parameter">
                                <xsl:choose>
                                    <xsl:when test="name(parent::*)='col'">
                                        <!--<xsl:if test="@type != 'button' and  @Display='No' and not(../../../@parent)" >-->
<!--                                        <xsl:if test="@type != 'pushbutton' and @type != 'button' and  @Value and not(../../../@dependsonparamvalue)" >
                                            <xsl:value-of select="@name"/>__<xsl:value-of select="@Value"/>
                                            <xsl:if test="position() != last()">
                                                <xsl:text>,</xsl:text>
                                            </xsl:if>
                                        </xsl:if>-->
                                        <xsl:if test="@type != 'pushbutton' and @type != 'button' and  @Value and not(../../../@parent) and not(../../../@dependsonparamvalue)" >
                                            <xsl:value-of select="@name"/>__<xsl:value-of select="@Value"/>
                                            <xsl:if test="position() != last()">
                                                <xsl:text>,</xsl:text>
                                            </xsl:if>
                                        </xsl:if>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <!--<xsl:if test="@type != 'button' and  @Display='No' and not(../@parent)" >-->
<!--                                        <xsl:if test="@type != 'pushbutton' and @type != 'button'  and @Value and not(../@dependsonparamvalue)" >
                                            <xsl:value-of select="@name"/>__<xsl:value-of select="@Value"/>
                                            <xsl:if test="position() != last()">
                                                <xsl:text>,</xsl:text>
                                            </xsl:if>
                                        </xsl:if>-->
                                        <xsl:if test="@type != 'pushbutton' and @type != 'button'  and @Value and not(../@parent) and not(../@dependsonparamvalue)" >
                                            <xsl:value-of select="@name"/>__<xsl:value-of select="@Value"/>
                                            <xsl:if test="position() != last()">
                                                <xsl:text>,</xsl:text>
                                            </xsl:if>
                                        </xsl:if>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:for-each>
                            <xsl:if test="position() != last()">
                                <xsl:text>&amp;</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>    
                </xsl:variable>
                <xsl:variable name="name">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name">
                            <xsl:value-of select="@name"/>?<xsl:for-each select="parameter | row/col/parameter">
                                <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                    <xsl:value-of select="@name"/>
                                    <xsl:if test="position() != last()">
                                        <xsl:text>,</xsl:text>
                                    </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            <xsl:if test="position() != last()">
                                <xsl:text>&amp;</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="relationname">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name">
                            <xsl:value-of select="@name"/>?<xsl:for-each select="parameter | row/col/parameter">
                                <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                    <xsl:value-of select="@name"/>
                                    <xsl:if test="position() != last()">
                                        <xsl:text>,</xsl:text>
                                    </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            <xsl:if test="position() != last()">
                                <xsl:text>&amp;</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="urlobjects">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name and @url">
                            <xsl:value-of select="@name" />:<xsl:value-of select="@url" />
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="hiddendropdownfields">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@dependsonparam">
                            <xsl:for-each select="parameter[@type='dropdown' and not(@validvalues)] | row/col/parameter[@type='dropdown' and not(@validvalues)]">
                                <xsl:choose>
                                    <xsl:when test="name(parent::*)='col'">
                                        <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../../../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,','&quot;',boolean(@ddfun),'&quot;,&quot;',@firstselect,'&quot;,&quot;',@urlparam,'&quot;',')')"/> 
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,','&quot;',boolean(@ddfun),'&quot;,&quot;',@firstselect,'&quot;,&quot;',@urlparam,'&quot;',')')"/>                         
                                    </xsl:otherwise>
                                </xsl:choose>
                                <xsl:text>;</xsl:text>
                            </xsl:for-each>
                        </xsl:if>
                        <xsl:if test="@depends">
                            <xsl:for-each select="parameter[@type='dropdown' and not(@validvalues)] | row/col/parameter[@type='dropdown' and not(@validvalues)]">
                                <xsl:choose>
                                    <xsl:when test="name(parent::*)='col'">
                                        <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../../../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,','&quot;',boolean(@ddfun),'&quot;,&quot;',@firstselect,'&quot;,&quot;',@urlparam,'&quot;',')')"/> 
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,','&quot;',boolean(@ddfun),'&quot;,&quot;',@firstselect,'&quot;,&quot;',@urlparam,'&quot;',')')"/>                         
                                    </xsl:otherwise>
                                </xsl:choose>
                                <xsl:text>;</xsl:text>
                            </xsl:for-each>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <div class="alert alert-danger">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popup')"/>
                    </xsl:attribute>
                    <a class="close" aria-label="close">
                        <xsl:attribute name="ng-click">
                            <xsl:value-of select="concat('popupclose(&quot;',translate(translate($objectname,'*',''),'.',''),'popup','&quot;)')"/>;
                        </xsl:attribute>&#10006;
                        
                    </a>
                    <p>
                        <xsl:attribute name="ng-bind-html">
                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popupval',' | unsafe')"/>
                        </xsl:attribute>
                    </p>
                </div>
                <!-- onload=="false" (in XML), 
                        To stop data load based in the object name provided in XML
                        Limatation: object name should be ended with '.*'
                        loadstatus used in JS to control data loading.
                        Usage: Used only, To control data load based on other parameter        -->
                <form  polling="{@polling}"  interval="{@interval}" loadstatus="{@onload}" class="form-horizontal formCount lantiq-form-text" >
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="$hiddendropdownfields" />
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_form')"/>
                    </xsl:attribute>
                    <xsl:attribute name="name1">
                        <xsl:value-of select="$name"/>
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                    </xsl:attribute>
                    <xsl:if test="$urlobjects !=''">
                        <xsl:attribute name="urlobjs">
                            <xsl:value-of select="$urlobjects" />
                        </xsl:attribute>
                    </xsl:if>
                    <div class=""> 
                        <xsl:for-each select=". | object">
                            <xsl:if test="position() = 1 or  (count(parameter) - count(parameter[@type = 'submitbutton']) > 0) or (count(row/col/parameter)-count(row/col/parameter[@type = 'submitbutton'])>0)">
                                <xsl:variable name="individualbutton">
<xsl:value-of select="@name"/>?<xsl:for-each select="parameter | row/col/parameter">
                                        <xsl:if test="@type != 'pushbutton' and @type != 'button' and @type != 'label' and @type != 'description'" >
                                            <xsl:value-of select="@name"/>
                                            <xsl:if test="position() != last()">
                                                <xsl:text>,</xsl:text>
                                            </xsl:if>
                                        </xsl:if>
                                    </xsl:for-each>
                                </xsl:variable>
                                <div class="wrapperdiv">
                                     <xsl:if test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                                        <!-- <xsl:attribute name="ng-if">
                                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                                        </xsl:attribute> -->
                                        <xsl:attribute name="ng-if">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                 </xsl:choose>
            </xsl:attribute>

                                    </xsl:if>
                                    <xsl:if test="@parent and @parentname and @depends">
                                        <xsl:attribute name="ng-if">
					                    <xsl:choose>
                                            <xsl:when test="contains(@parent, ',')">
                                                <xsl:call-template name="multiplevalues">
                                                    <xsl:with-param name="list" select="@parent"/>
                                                    <xsl:with-param name="delimiter" select="','"/>
                                                    <xsl:with-param name="dependsobjectname" select="@parentname" />
                                                    <xsl:with-param name="dependsparamname" select="@depends" />
                                                </xsl:call-template>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                 <xsl:value-of       select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                                            </xsl:otherwise>
                                          </xsl:choose>
                                        </xsl:attribute>
                                    </xsl:if>
                                   <xsl:if test="@title and position() != 1">
                                        <div class="panel-heading blu_bg">
                                            <!--{{'<xsl:value-of select="@title"/>' | translate}}-->
                                            <xsl:attribute name="ng-bind">
                                                '<xsl:value-of select="@title"/>' | translate
                                            </xsl:attribute>
                                        </div>
                                    
                                    </xsl:if>
<!--                                    <xsl:if test="@title and position() &gt; 1">
                                        <div  class="block-heading-two">
                                            <h3>
                                                <span>
                                                    <xsl:attribute name="ng-bind">
                                                        '<xsl:value-of select="@title"/>' | translate
                                                    </xsl:attribute>
                                                    
                                                    <xsl:value-of select="@title"/>
                                                </span>
                                            </h3> 
                                        </div>
                                    </xsl:if>-->
                                   
                                    <div class="panel-body">
                                        <xsl:if test="@class">
                                            <xsl:attribute name="child">
                                                <xsl:value-of select="@class" />
                                            </xsl:attribute>
                                        </xsl:if>
                                        <xsl:if test="@subtitle">
                                            <h4>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="@subtitle"/>' | translate
                                                </xsl:attribute>
                                            </h4>
                                        </xsl:if>
                                        <xsl:for-each select="parameter | row/col/parameter">
                                            <xsl:if test="@type = &apos;eventbutton&apos;">
                                                <xsl:call-template name="eventbutton">
                                                    <xsl:with-param name="param" select="$individualbutton"/>
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;string&apos;">
                                                <xsl:call-template name="string" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;url&apos;">
                                                <xsl:call-template name="url" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;mac&apos;">
                                                <xsl:call-template name="mac" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;ipv4&apos;">
                                                <xsl:call-template name="ipv4" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;ipv6&apos;">
                                                <xsl:call-template name="ipv6" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;ipv4ipv6&apos;">
                                                <xsl:call-template name="ipv4ipv6">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
													</xsl:call-template>
                                            </xsl:if>
                                            
                                           <xsl:if test="@type = &apos;wepkey&apos;">
                                                <xsl:call-template name="wepkey" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>




                                            <xsl:if test="@type = &apos;password&apos;">
                                                <xsl:call-template name="password" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>

                                            <xsl:if test="@type = &apos;number&apos;">
                                                <xsl:call-template name="number" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;wholenumber&apos;">
                                                <xsl:call-template name="wholenumber" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@previousname"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@previousname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
											<xsl:if test="@type = &apos;radio&apos;">
                                                <xsl:call-template name="radio">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                     
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;description&apos;">
                                                <xsl:call-template name="description" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;multi-checkbox&apos;">
                                                <xsl:call-template name="multi-checkbox">
												<xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
												 <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                     
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
													 </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;hyperlink&apos;">
                                                <xsl:call-template name="hyperlink" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;label&apos;">
                                                <xsl:call-template name="label" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;dropdown&apos;">
                                                <xsl:call-template name="dropdown">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;dependentdropdown&apos;">
                                                <xsl:call-template name="dependentdropdown">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;editableselect&apos;">
                                                <xsl:call-template name="editableselect">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;button&apos;">
                                                <xsl:call-template name="button">
                                                    <xsl:with-param name="param" select="$individualbutton"/>
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;pushbutton&apos;">
                                                <xsl:call-template name="pushbutton">
                                                    <xsl:with-param name="param" select="$individualbutton"/>
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;toggle&apos;">
                                                <xsl:call-template name="toggle">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;checkbox&apos;">
                                                <xsl:call-template name="checkbox" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;checkbox1&apos;">
                                                <xsl:call-template name="checkbox1">
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@name"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:choose>
                                                            <xsl:when test="name(parent::*)='col'">
                                                                <xsl:value-of select="../../../@originalobject"/>
                                                            </xsl:when> 
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@originalobject" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparamvalue"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparamvalue" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parent"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parent" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonobject"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonobject" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@parentname"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@parentname" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@dependsonparam"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@dependsonparam" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="../../../@depends"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="../@depends" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparamvalue)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parent)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parent)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonobject)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonobject)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@parentname)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@parentname)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@dependsonparam)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@dependsonparam)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:choose>
                                                                    <xsl:when test="name(parent::*)='col'">
                                                                        <xsl:value-of select="boolean(../../../@depends)"/>
                                                                    </xsl:when> 
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="boolean(../@depends)" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;uint&apos;">
                                                <xsl:call-template name="string" />
                                            </xsl:if>
                                        </xsl:for-each>
                                    </div>
                                </div>
                            </xsl:if>
                        </xsl:for-each>
                        <div class="col-lg-12 col-md-12 col-xs-12 text-right">
                            <xsl:for-each select="parameter | object/parameter">
                                <xsl:if test="@type = &apos;endpushbutton&apos;">
                                    <xsl:call-template name="pushbutton">
                                        <xsl:with-param name="param" select="$name"/>
                                        <xsl:with-param name="formname">
                                            <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                        </xsl:with-param>
                                    </xsl:call-template>
                                </xsl:if>
                            </xsl:for-each>
                        </div>
                            <div class="col-lg-12 col-md-12 col-xs-12 text-right">
                                <xsl:for-each select="parameter | object/parameter">
                                <xsl:if test="@type = &apos;submitbutton&apos;">
                                    <xsl:call-template name="button1">
                                        <xsl:with-param name="param" select="$name"/>
                                        <xsl:with-param name="param1" select="$hiddenparams"/>
                                        <xsl:with-param name="param2" select="translate(translate($objectname,'*',''),'.','')"/>
                                        <xsl:with-param name="param3" select="translate(translate($relationobjectname,'*',''),'.','')"/>
                                    </xsl:call-template>
                                </xsl:if>
								<xsl:if test="@type = &apos;connectbutton&apos;">
                                    <xsl:call-template name="connectButton">
                                        <xsl:with-param name="param" select="$name"/>
                                        <xsl:with-param name="param1" select="$hiddenparams"/>
                                        <xsl:with-param name="param2" select="translate(translate($objectname,'*',''),'.','')"/>
                                        <xsl:with-param name="param3" select="translate(translate($relationobjectname,'*',''),'.','')"/>
                                    </xsl:call-template>
                                </xsl:if>	 
                                <xsl:if test="@type = &apos;submitcancel&apos;">
                                    <xsl:call-template name="button" />
                                </xsl:if>
                            </xsl:for-each>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </xsl:template>
	<xsl:template match="object[@viewtype='table']">
        <xsl:param name="layout" />
        <div class="panel">
           <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                   <xsl:choose>
                    <xsl:when test="contains(@dependsonparamvalue, ',')">
                        <xsl:call-template name="multiplevalues">
                           <xsl:with-param name="list" select="@dependsonparamvalue"/>
                           <xsl:with-param name="delimiter" select="','"/>
                           <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                           <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                    </xsl:otherwise>
                   </xsl:choose>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="$layout='true'">
                <xsl:attribute name="class">
                    col-lg-6 col-xs-12 mbl-no-padding-hr
                </xsl:attribute>
            </xsl:if>
          
            <xsl:variable name="objectname">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <xsl:value-of select="@name"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="urlobjects">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name and @url">
                        <xsl:value-of select="@name" />:<xsl:value-of select="@url" />
                        <xsl:if test="position() != last()">
                            <xsl:text>,</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="name">
                <xsl:for-each select=". | object">
                    <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                        <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                            <xsl:value-of select="@name"/>
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                    <xsl:if test="position() != last()">
                        <xsl:text>&amp;</xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="iconicparams">
                <xsl:for-each select=". | object">
                    <xsl:for-each select="parameter">
                        <xsl:if test="@type != 'pushbutton' and @type != 'button' and @iconicurl">
                            <xsl:value-of select="@name"/>
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="obj-param-type">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                        <xsl:value-of select="translate(translate(../@name,'*',''),'.','')"/>__<xsl:value-of select="@name"/>__<xsl:value-of select="@type" />
                        <xsl:if test="position() != last()">
                            <xsl:text>,</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="filterData">
                <xsl:for-each select=". | object">
                    <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                        <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="editValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='edit'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="deleteValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='delete'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            
            <xsl:variable name="viewValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='view'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="downloadValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='download'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
             <xsl:variable name="connectValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='connect'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="connectButtonName">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='connect'">
                        <xsl:value-of select="@webname" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="connectdependsonparam">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='connect'">
                        <xsl:value-of select="@dependsonparam" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
              <xsl:variable name="connectdependsonparamvalue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='connect'">
                        <xsl:value-of select="@dependsonparamvalue" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="popup">
                <xsl:for-each select="./parameter | object/parameter">
                      <xsl:if test="@name='connect'">
                          <xsl:if test="@popup">
                             <xsl:value-of select="@popup" />
                          </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <div class="alert alert-danger">
                <xsl:attribute name="ng-show">
                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popup')"/>
                </xsl:attribute>
                <a class="close" aria-label="close">
                    <xsl:attribute name="ng-click">
                        <xsl:value-of select="concat('popupclose(&quot;',translate(translate($objectname,'*',''),'.',''),'popup','&quot;)')"/>;
                    </xsl:attribute>&#10006;
                </a>
                <p>
                    <xsl:attribute name="ng-bind-html">
                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popupval',' | unsafe')"/>
                    </xsl:attribute>
                </p>
            </div>
            
              <xsl:if test="@title">
                <div class="panel-heading blu_bg">
                    <xsl:if test="@icon">
                        <img class="panel_icons">
                            <xsl:attribute name="src">
                                <xsl:value-of select="concat('images/icons/',@icon,'.png')" />
                            </xsl:attribute>
                        </img>
                    </xsl:if> 
                    
                    <span>                        
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="@title"/>' | translate
                            </xsl:attribute>
                        </span>
                </div>
            </xsl:if>
            <div class="panel-body">
            <div class="table-responsive table-scroll-vr">
                    <table  polling="{@polling}" loadstatus="{@onload}"  interval="{@interval}" class="table table-bordered tableCount theme_intel" formname="{@form}" name="{@name}">
                    <xsl:attribute name="name">
                        <xsl:copy-of select="$name"/>
                    </xsl:attribute>
                        <xsl:attribute name="componenttype">
                            <xsl:value-of select="@viewtype" />
                        </xsl:attribute>
                    <xsl:attribute name="objparamrelation">
                        <xsl:copy-of select="$obj-param-type"/>
                    </xsl:attribute>
                    <xsl:attribute name="iconicparams">
                        <xsl:copy-of select="$iconicparams"/>
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                    </xsl:attribute>
                    <xsl:if test="$urlobjects !=''">
                        <xsl:attribute name="urlobjs">
                            <xsl:value-of select="$urlobjects" />
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:attribute name="filterdata">
                        <xsl:copy-of select="$filterData"/>
                    </xsl:attribute>
                    <thead>
                        <tr>
                            <xsl:for-each select="parameter | object/parameter">
                                <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                    <th id="{@name}">
                                        <xsl:choose>
                                            <xsl:when test="@Display">
                                                <xsl:attribute name="ng-init" >
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','false')" />
                                                    <!-- multple=="true", To create multiple rows for multiple child objects in table  -->
                                                    <xsl:if test="@multiple='true'">
                                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                    </xsl:if>
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-hide" >
                                                    true
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                                
                                            </xsl:when>
                                            <xsl:when test="not(@Display)">
                                                <xsl:choose>
                                                    <xsl:when test="@type='dropdown1'">
                                                        <xsl:attribute name="ng-init" >
                                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,&quot;&quot;,&quot;&quot;,&quot;',@urlparam,'&quot;',')')"/>	
                                                            <xsl:if test="@multiple='true'">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                            </xsl:if>
                                                        </xsl:attribute>
                                                    </xsl:when>
                                                    <xsl:when test="@iconicurl">
                                                         <xsl:attribute name="ng-init" >
                                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat('jsonreq(&quot;',@name,'&quot;,','&quot;',@iconicurl,'&quot;',')')"/>;<xsl:value-of select="concat(@name,'displaystatus','=','false')" />;	
                                                            <xsl:if test="@multiple='true'">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                            </xsl:if>
                                                         </xsl:attribute>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <xsl:attribute name="ng-init">
                                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat(@name,'displaystatus','=','true')" />;
                                                            <xsl:if test="@multiple='true'">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                            </xsl:if>
                                                        </xsl:attribute>
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                            </xsl:when>
                                        </xsl:choose>
                                        <xsl:if test="@multiple='true'">
                                            <xsl:attribute name="multiple">
                                                <xsl:value-of select="@multiple"/>
                                            </xsl:attribute>
                                        </xsl:if>
                                    </th>
                                </xsl:if>
                            </xsl:for-each>
                            <xsl:if test="parameter/@name='edit' or parameter/@name='delete'">
                                <th>
                                    <xsl:text>Actions</xsl:text>
                                </th>
                            </xsl:if>
                        </tr>
                    </thead>
                    <tbody id="bodyData">
                        <tr>
                            <xsl:attribute name="ng-repeat">
                                user in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                            </xsl:attribute>
                            <td  ng-if="false==$last">
                                <xsl:attribute name="ng-repeat">
                                    key in user | keys:'<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'')"/>'
                                </xsl:attribute>
                                <xsl:attribute name="ng-show">
                                    <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>{{$index+1}}
                                </xsl:attribute>
                                <span>
                                    <xsl:attribute name="ng-if">
                                        <xsl:text>'dropdown1' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                    </xsl:attribute>
                                    
                                    {{urldropdownvalue(keyname(key),user[key.split('__')[0]+"__"+key.split('__')[1]])}}
                                    <!--{{urldropdownvalue('1')}}-->
                                </span>
                                <span>
                                        <xsl:attribute name="ng-if">
                                            <xsl:text>'string' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="class">
                                            {{iconictext(user[key.split('__')[0]+"__"+key.split('__')[1]],key.split('__')[1])}}
                                        </xsl:attribute>
                                        <span>  
                                            <xsl:attribute name="ng-if">
                                                <xsl:text>iconicstatus(</xsl:text>key.split('__')[1]<xsl:text>)</xsl:text>
                                            </xsl:attribute>
                                            {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}
                                        </span>
                                    </span>
                               </td>
                            <xsl:if test="parameter/@name='edit' or parameter/@name='delete'">
                                <td ng-repeat="td in user" ng-if="true==$last" class="table-button-group">
								<xsl:if test="parameter/@name='connect'">
                                       <button  class="btn table-btn-txt">
                                            <xsl:attribute name="ng-init">
                                                checkButtonState(user,
                                               <xsl:value-of select="concat('&quot;',$connectdependsonparam,'&quot;,&quot;',$connectdependsonparamvalue, '&quot;)')"></xsl:value-of>
                                            </xsl:attribute>
                                            <xsl:attribute name="ng-click">
                                                <xsl:value-of select="$connectValue" />
                                            </xsl:attribute>
                                            <xsl:attribute name="ng-class">
                                                {btn_bg_color_grn: {{'connect' + user.objectIndex}},btn_bg_color_red: {{'!connect' + user.objectIndex}}}
                                            </xsl:attribute>
                                            <xsl:attribute name="name">
                                                <xsl:text>connect</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="id">
                                             {{td}},{{ 'connect' + user.objectIndex}}
                                            </xsl:attribute>
                                            <xsl:attribute name="tableid">
                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                            </xsl:attribute>
                                            <xsl:if test="$popup = 'true'">
                                                <xsl:attribute name="ng-dialog">
                                                    firstDialogId
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-dialog-class">
                                                    ngdialog-theme-default
                                                </xsl:attribute>
                                            </xsl:if> 
                                            <span>
                                                <xsl:attribute name="ng-show">
                                                   {{'connect' + user.objectIndex}}
                                                </xsl:attribute>
                                                Connect</span>
                                            <span>
                                                 <xsl:attribute name="ng-hide">
                                                   {{'connect' + user.objectIndex}}
                                                </xsl:attribute>
                                                Disconnect</span>
                                            
                                        </button> 
                                    </xsl:if>
                                    <xsl:if test="parameter/@name='edit'">
                                        <button  class="btn btn-xs table-btn">
                                            <xsl:attribute name="ng-click">
                                                <xsl:value-of select="$editValue" />
                                            </xsl:attribute>
                                            <xsl:attribute name="name">
                                                <xsl:text>edit</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="id">
                                                {{td}}
                                            </xsl:attribute>
                                            <span class="fa fa-edit btn_color_grn"> </span>
                                        </button> 
                                    </xsl:if>

                                    <xsl:if test="parameter/@name='view'">
                                        <button  class="btn btn-xs table-btn">
                                            <xsl:attribute name="data-ng-click" >
                                                <xsl:value-of select="$viewValue" />
                                            </xsl:attribute>
                                            <xsl:attribute name="id">{{td}}</xsl:attribute>
                                            <span class="fa fa-file-text-o btn_color_blue"></span>
                                        </button>
                                    </xsl:if>
                                    <xsl:if test="parameter/@name='download'">
                                        <button  class="btn btn-xs">
                                            <xsl:attribute name="ng-click">
                                                <xsl:value-of select="$downloadValue" />
                                            </xsl:attribute>
                                            <xsl:attribute name="id">
                                                {{user["DeviceDeviceInfoVendorLogFile__Name"]}}
                                            </xsl:attribute>
                                            <span class="fa fa-download"> </span>
                                        </button> 
                                    </xsl:if>
									<xsl:if test="parameter/@name='delete'">
                                        <button  class="btn btn-xs table-btn">
                                            <xsl:attribute name="popupinfo">
                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')" />
                                            </xsl:attribute>
                                            <xsl:choose>
                                                <xsl:when test="$deleteValue!=''">
                                                    <xsl:attribute name="ng-click">
                                                        <xsl:value-of select="$deleteValue" />
                                                    </xsl:attribute>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:attribute name="ng-click">
                                                        delete($event)
                                                    </xsl:attribute> 
                                                </xsl:otherwise>
                                            </xsl:choose>
                                            <xsl:attribute name="name">
                                                <xsl:text>delete</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="id">{{td}}</xsl:attribute>
                                            <span class="fa fa-trash-o btn_color_red"></span>
                                        </button>
                                    </xsl:if>
                                </td>
                            </xsl:if>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        <div class="row">
            <xsl:if test="@dependsonparamvalue">
                <xsl:attribute name="ng-if">
                   <xsl:choose>
                    <xsl:when test="contains(@dependsonparamvalue, ',')">
                        <xsl:call-template name="multiplevalues">
                           <xsl:with-param name="list" select="@dependsonparamvalue"/>
                           <xsl:with-param name="delimiter" select="','"/>
                           <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                           <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                    </xsl:otherwise>
                   </xsl:choose>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@access">
                <xsl:attribute name="access">
                    <xsl:value-of select="@access"/>
                </xsl:attribute>
            </xsl:if>
            <div class="col-lg-12 col-md-12 text-right">
                <xsl:for-each select="parameter">
                    <xsl:if test="@type = &apos;button&apos; and @name != &apos;edit&apos; and @name != &apos;delete&apos; and @name != &apos;view&apos; and @name != &apos;download&apos;  and @name != &apos;connect&apos;">
                        <xsl:call-template  name="button" />
                    </xsl:if>
                </xsl:for-each>
            </div>            
        </div>
    </xsl:template>
<xsl:template match="object[@viewtype='tablePlus']">
        <xsl:param name="layout" />
        <!--<xsl:value-of select="$layout" />-->
        <div >
            <xsl:if test="$layout='true'">
                <xsl:attribute name="class">
                    col-lg-6 col-xs-12 mbl-no-padding-hr
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                <xsl:attribute name="ng-show">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@parent and @parentname and @depends">
                <xsl:attribute name="ng-show">
                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                </xsl:attribute>
            </xsl:if>
          
            
            <div class="panel">                   
                <xsl:variable name="objectname">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>
                    </xsl:if>
                    <xsl:for-each select="./object">
                        <xsl:value-of select="@name"/>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="deleteValue">
                    <xsl:for-each select="./parameter | object/parameter">
                        <xsl:if test="@name='delete'">
                            <xsl:value-of select="@routeurl" />
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="editValue">
                    <xsl:for-each select="./parameter | object/parameter">
                        <xsl:if test="@name='edit'">
                            <xsl:value-of select="@routeurl" />
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>                
                <xsl:variable name="name">
                    <xsl:for-each select=". | object">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                <xsl:value-of select="@name"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="urlobjects">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name and @url">
                            <xsl:value-of select="@name" />:<xsl:value-of select="@url" />
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>	
                <xsl:variable name="hiddenparams">
                    <xsl:for-each select=". | object">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button' and @Display">
                                <xsl:value-of select="@name"/>__<xsl:value-of select="@Value"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>	
                <xsl:variable name="obj-param-type">
                    <xsl:for-each select="./parameter | object/parameter">
                        <xsl:value-of select="translate(translate(../@name,'*',''),'.','')"/>__<xsl:if test="@type != 'pushbutton' and @type != 'button'">
                            <xsl:value-of select="@name"/>__<xsl:value-of select="@type" />
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="filterData">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                            <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                            <xsl:if test="position() != last()">
                                <xsl:text>&amp;</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>	
                <div class="alert alert-danger">
                    <xsl:attribute name="ng-show">
                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popup')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ng-init">
                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popup','=false')"/>
                    </xsl:attribute>
                    
                    <a class="close" aria-label="close">
                        <xsl:attribute name="ng-click">
                            <xsl:value-of select="concat('popupclose(&quot;',translate(translate($objectname,'*',''),'.',''),'popup','&quot;)')"/>;
                        </xsl:attribute>&#10006;
                    </a>
                    <p>
                        <xsl:attribute name="ng-bind-html">
                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'popupval',' | unsafe')"/>
                        </xsl:attribute>
                    </p>
                </div>
                <xsl:if test="@title">
                <div class="panel-heading blu_bg">
                    <xsl:if test="@icon">
                        <img class="panel_icons">
                            <xsl:attribute name="src">
                                <xsl:value-of select="concat('images/icons/',@icon,'.png')" />
                            </xsl:attribute>
                        </img>
                    </xsl:if> 
                    
                    <span>                        
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="@title"/>' | translate
                            </xsl:attribute>
                        </span>
                </div>
            </xsl:if>
            <div class="panel-body">
                <div class="table-responsive table-scroll-vr" >
                    <form class="add-ip-addr-form"> 
                        <xsl:attribute name="name">
                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_form')"/>
                            </xsl:attribute>
                            <table class="add-ip-addr table-bordered">
                                <tr>
                                    <xsl:attribute name="ng-show">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>
                                    </xsl:attribute>
                                    <xsl:for-each select="parameter | object/parameter">
                                        <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                            <xsl:if test="not(@Display)">
                                                <td>
                                                    <xsl:if test="@type = &apos;stringA&apos;">
                                                        <xsl:call-template name="stringA" />
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;dropdown&apos;">
                                                        <xsl:call-template name="dropdown" />
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;dropdown1&apos;">
                                                        <xsl:call-template name="dropdown1" />
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;multiselect&apos;">
                                                        <xsl:call-template name="multiselect" />
                                                    </xsl:if>

                                                    <xsl:if test="@type = &apos;checkbox&apos;">
                                                        <xsl:call-template name="checkbox" />
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;checkbox1&apos;">
                                                        <xsl:call-template name="checkbox1" />
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;ip4&apos;">
                                                        <xsl:call-template name="ip4" >
                                                            <xsl:with-param name="formname">
                                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                            </xsl:with-param>
                                                            <xsl:with-param name="paramobjectname">
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:with-param>
                                                        </xsl:call-template>
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;ip6&apos;">
                                                        <xsl:call-template name="ip6" >
                                                            <xsl:with-param name="formname">
                                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                            </xsl:with-param>
                                                            <xsl:with-param name="paramobjectname">
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:with-param>
                                                        </xsl:call-template>
                                                    </xsl:if>
                                                    <xsl:if test="@type = &apos;macaddress&apos;">
                                                        <xsl:call-template name="macaddress" >
                                                            <xsl:with-param name="formname">
                                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                            </xsl:with-param>
                                                            <xsl:with-param name="paramobjectname">
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:with-param>
                                                        </xsl:call-template>
                                                    </xsl:if>
                                                   <xsl:if test="@type = &apos;ip4ip6&apos;">
                                                        <xsl:call-template name="ip4ip6" >
                                                            <xsl:with-param name="formname">
                                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                            </xsl:with-param>
                                                            <xsl:with-param name="paramobjectname">
                                                                <xsl:value-of select="../@name" />
                                                            </xsl:with-param>
                                                        </xsl:call-template>
                                                    </xsl:if>
                                                </td>
                                            </xsl:if>
                                        </xsl:if>
                                    </xsl:for-each>
                        
                                    <td class="table-button-group">
                                        <xsl:for-each select="parameter[@name='Add'] | object/parameter[@name='Add']">
                                            <a class="btn table-btn" componenttype="{../@viewtype}" data-ng-click="{./@routeurl}" >
                                                <xsl:attribute name="showstatus">
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>
                                                </xsl:attribute>
                                                <xsl:attribute name="formname">
                                                    <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                </xsl:attribute>
                                                <xsl:attribute name="id">
                                                    <!-- <xsl:value-of select="translate(@name,'.*','')"/>
                                                    <xsl:value-of select="@viewtype"/> -->
                                                    <xsl:text>Add</xsl:text>
                                                </xsl:attribute>
                                                <xsl:attribute name="source">
                                                    <xsl:value-of select="$name" />
                                                </xsl:attribute>
                                                <xsl:attribute name="hiddenparams">
                                                    <xsl:value-of select="$hiddenparams" />
                                                </xsl:attribute>

                                                <span class="fa fa-check btn_color_grn"></span>
                                            </a>&#xA0;&#xA0;&#xA0;
                                            <a class="btn table-btn" >
                                                <xsl:attribute name="ng-click">
                                                    <xsl:value-of select="concat('rowcancel(&quot;',translate(translate($objectname,'*',''),'.',''),'showstatus','&quot;)')"/>
                                                </xsl:attribute>
                                                <span class="fa fa-times btn_color_red" ></span>
                                            </a>
                                        </xsl:for-each>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <table class="table table-bordered tableCount theme_intel " formname="{@form}" buttonstatus="{@buttons}">
                            <xsl:attribute name="name">
                            <xsl:copy-of select="$name"/>
                        </xsl:attribute>
                        <xsl:attribute name="objparamrelation">
                            <xsl:copy-of select="$obj-param-type"/>
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                        </xsl:attribute>
                        <xsl:if test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                            <xsl:attribute name="depends">
                                <xsl:text>true</xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@parent and @parentname and @depends">
                            <xsl:attribute name="depends">
                                <xsl:text>true</xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="$urlobjects !=''">
                            <xsl:attribute name="urlobjs">
                                <xsl:value-of select="$urlobjects" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="filterdata">
                            <xsl:copy-of select="$filterData"/>
                        </xsl:attribute>
                        <thead>
                            <tr>
                                <xsl:for-each select="parameter | object/parameter">
                                    <!--                                    <xsl:if test="@type != 'button' and @Display">
                                        <th id="{../@name}?{@name}">
                                            <xsl:value-of select="@webname"/>
                                        </th>
                                    </xsl:if>-->
                                    <xsl:if test="@type !='button'">
                                        <th>
                                            <xsl:choose>
                                                <xsl:when test="@Display">
                                                    <xsl:attribute name="ng-init" >
                                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','false')" />
                                                    </xsl:attribute>
                                                    <xsl:attribute name="ng-hide" >
                                                        true
                                                    </xsl:attribute>
                                                    <xsl:attribute name="ng-bind">
                                                        '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                    </xsl:attribute>
                                                
                                                </xsl:when>
                                                <xsl:when test="not(@Display)">
                                                    <xsl:choose>
                                                        <xsl:when test="@type='dropdown1'">
                                                            <xsl:attribute name="ng-init" >
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;',')')"/>	
                                                            </xsl:attribute>
                                                        </xsl:when>
                                                
                                                        <xsl:otherwise>
                                                            <xsl:attribute name="ng-init">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;
                                                            </xsl:attribute>
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                    <xsl:attribute name="ng-bind">
                                                        '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                    </xsl:attribute>
                                                </xsl:when>
                                            </xsl:choose>
                                        </th>
                                    </xsl:if>
                                </xsl:for-each>
                                <xsl:if test="parameter/@name='edit' or parameter/@name='delete' or parameter/@name='Add'">
                                    <xsl:if test="parameter/@name='Add'">
                                        <th>
                                            <a id="{@name}"   class="btn btn-sm btn-info">
                                               <xsl:if test="@dependsonparamvalue">
                                            <xsl:attribute name="ng-if">
                                                <xsl:choose>
                                                    <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                        <xsl:call-template name="multiplevalues">
                                                            <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                            <xsl:with-param name="delimiter" select="','"/>
                                                            <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                            <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                        </xsl:call-template>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                           </xsl:attribute>
                                    </xsl:if>
                                        <xsl:if test="@access">
                                            <xsl:attribute name="ng-disabled">
                                               true
                                            </xsl:attribute>
                                        </xsl:if>
                                                <xsl:attribute name="ng-click">
                                                    <xsl:choose>
                                                        <xsl:when test="@limit">
                                                            <xsl:value-of select="concat('limit(&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;)')"/>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:value-of select="concat('editabletableformdisplaystatus(&quot;',translate(translate($objectname,'*',''),'.',''),'showstatus','&quot;)')"/>
                                                        </xsl:otherwise>
                                                    </xsl:choose> 
                                                </xsl:attribute>
                                                <i class="fa fa-plus icontxtgap"></i>
                                                <span>
                                                    <xsl:attribute name="ng-bind">
                                                        'Add' | translate
                                                    </xsl:attribute>
                                                </span>
                                            </a>
                                        </th>
                                    </xsl:if>
                                </xsl:if>
                            </tr>
                        </thead>
                        <tbody id="bodyData">
                            <xsl:attribute name="ng-class">                                   
                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>==true ? 'showrow' : 'hiderow'
                            </xsl:attribute>

                            <tr ng-init="sectionIndex = $index">
                                <xsl:attribute name="ng-repeat">
                                    user in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                                </xsl:attribute>
                                <td ng-if="false==$last" >
                                    <xsl:attribute name="ng-repeat">
                                        key in user | keys:'<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'')"/>'
                                    </xsl:attribute>
                                    <xsl:attribute name="localaddfun">
                                        user.localaddfun
                                    </xsl:attribute>
                                    <xsl:attribute name="ng-show">
                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')" />{{$index+1}}
                                    </xsl:attribute>
                                    <span  e-form="rowform" >
                                        <xsl:attribute name="ng-if">
                                            <xsl:text>'stringA' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="editable-text">
                                            user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-name">
                                            {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-ng-blur">
                                            textchangeEditable1(key,$data,user.z,<xsl:value-of select="concat('&quot;',$objectname,'&quot;')"/>,sectionIndex+1)
                                        </xsl:attribute>
                                        {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}   
                                    </span>
                                        <span  e-form="rowform" onbeforesave="checkIpv4($data)">
                                            <xsl:attribute name="ng-if">
                                                <xsl:text>'ip4' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="editable-text">
                                                user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-name">
                                                {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-ng-blur">
                                                textchangeEditable1(key,$data,user.z,<xsl:value-of select="concat('&quot;',$objectname,'&quot;')"/>,sectionIndex+1)
                                            </xsl:attribute>
                                            {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}   
                                        </span>
                                        <span  e-form="rowform" onbeforesave="checkIpv6($data)">
                                            <xsl:attribute name="ng-if">
                                                <xsl:text>'ip6' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="editable-text">
                                                user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-name">
                                                {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-ng-blur">
                                                textchangeEditable1(key,$data,user.z,<xsl:value-of select="concat('&quot;',$objectname,'&quot;')"/>,sectionIndex+1)
                                            </xsl:attribute>
                                            {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}   
                                        </span>
                                        <span  e-form="rowform">
                                            <xsl:attribute name="ng-if">
                                                <xsl:text>'ip4ip6' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="editable-text">
                                                user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-name">
                                                {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-ng-blur">
                                                textchangeEditable1(key,$data,user.z,<xsl:value-of select="concat('&quot;',$objectname,'&quot;')"/>,sectionIndex+1)
                                            </xsl:attribute>
                                            {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}   
                                        </span>
                                        <span  e-form="rowform" onbeforesave="checkmac($data)">
                                            <xsl:attribute name="ng-if">
                                                <xsl:text>'macaddress' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="editable-text">
                                                user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-name">
                                                {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                            </xsl:attribute>
                                            <xsl:attribute name="e-ng-blur">
                                                textchangeEditable1(key,$data,user.z,<xsl:value-of select="concat('&quot;',$objectname,'&quot;')"/>,sectionIndex+1)
                                            </xsl:attribute>
                                            {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}   
                                        </span>
                                    <span  e-form="rowform">
                                        <xsl:attribute name="ng-if">
                                            <xsl:text>'dropdown1' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="editable-select">
                                            user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-name">
                                            {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-temp">
                                            keyname(key)
                                        </xsl:attribute>
                                        <xsl:attribute name="e-ng-options" >
                                            <xsl:text>obj.id as obj.name for obj in {{keyname(key)}}</xsl:text>   
                                        </xsl:attribute>
                                        <xsl:attribute name="e-ng-change">
                                            textchangeEditable1(key,$data,user.z,<xsl:value-of select="concat('&quot;',$objectname,'&quot;')"/>,sectionIndex+1)
                                        </xsl:attribute>
                                        <!--{{user[key.split('__')[0]+"__"+key.split('__')[1]]}}-->   
                                        {{urldropdownvalue(keyname(key),user[key.split('__')[0]+"__"+key.split('__')[1]])}}
                                    </span>
                                </td>
                                <td ng-repeat="(key, value) in user" ng-if="true==$last" style="display:none" >
                                    <span  e-form="rowform">
                                        <xsl:attribute name="editable-text">
                                            user.{{key}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-name">
                                            {{key}}
                                        </xsl:attribute>
                                        {{value}}   
                                    </span>
                                </td>
                                <!-- <td ng-repeat="td in user" ng-if="true==$last" style="white-space: nowrap"> -->
                                <xsl:if test="parameter/@name='edit' or parameter/@name='delete' or parameter/@name='Add'">    
                                    <td class="table-button-group no-padding-hr">
                                        <form  name="rowform" ng-show="rowform.$visible"  class="form-buttons form-inline editable-form" shown="inserted == user">
                                            <!--                                            <xsl:attribute name="formname">
                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_form')"/>
                                            </xsl:attribute>-->
                                            <xsl:attribute name="id">
                                                <xsl:text>{{user.z}}</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="localadd">
                                                <xsl:text>{{user.localadd}}</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="tableplusrowindex">
                                                {{sectionIndex}}
                                            </xsl:attribute> 
                                            <xsl:attribute name="onaftersave">
                                                <xsl:choose>
                                                    <xsl:when test="$editValue!=''">
                                                        <xsl:value-of select="$editValue"/>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <!--editableApply($data)-->
                                                        <xsl:text>editableApply($data,</xsl:text>
                                                        <xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>
                                                        <xsl:text>)</xsl:text>
                                                    </xsl:otherwise>
                                                    
                                                </xsl:choose>
                                            </xsl:attribute>
                                            <button type="submit"  ng-disabled="rowform.$waiting"  class="btn btn-info table-btn">
                                                <!--<xsl:attribute name="name">
                                                    <xsl:text>save</xsl:text>
                                                </xsl:attribute>
                                                <xsl:text>save</xsl:text>-->
                                                <i class="fa fa-save btn_color_blue"></i>
                                            </button>&#xA0;&#xA0;&#xA0;
                                            <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-info table-btn">
                                                <!--<xsl:attribute name="name">
                                                    <xsl:text>cancel</xsl:text>
                                                </xsl:attribute>
                                                <xsl:text>cancel</xsl:text>-->
                                                <i class="fa fa-times btn_color_red"></i>
                                            </button>  
                                        </form>  
                                        <div class="buttons" ng-show="!rowform.$visible">
                                            <xsl:if test="parameter/@name='edit'">
                                                <button class="btn table-btn" ng-click="rowform.$show()">
                                                    <xsl:attribute name="name">
                                                        <xsl:text>edit</xsl:text>
                                                    </xsl:attribute>
                                                    <i class="fa fa-edit btn_color_grn"></i>
                                                </button>&#xA0;&#xA0;&#xA0;
                                            </xsl:if>
                                            <xsl:if test="parameter/@name='delete'">
                                                <button class="btn table-btn" data-ng-click="delete($event,user)" >
												<xsl:attribute name="popupinfo">
                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')" />
                                            </xsl:attribute>
                                                    <xsl:attribute name="data-ng-click">
                                                        <xsl:value-of select="$deleteValue" />
                                                    </xsl:attribute>
                                                    <xsl:attribute name="tableplusrowindex">
                                                        {{sectionIndex}}
                                                    </xsl:attribute> 
                                                    <xsl:attribute name="name">
                                                        <xsl:text>delete</xsl:text>
                                                    </xsl:attribute>
                                                    <xsl:attribute name="id">
                                                        <xsl:text>{{user.z}}</xsl:text>
                                                    </xsl:attribute> <i class="fa fa-trash-o btn_color_red"></i>
                                                </button>
                                            </xsl:if>
                                        </div>   
                                    </td> 
                                </xsl:if>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <xsl:for-each select="parameter">
                <xsl:if test="@type = &apos;button&apos; and @name != &apos;edit&apos; and @name != &apos;delete&apos; and @name != &apos;Add&apos;">
                    <xsl:call-template  name="button" />
                </xsl:if>
            </xsl:for-each>
            
        </div>
    </xsl:template>
    <xsl:template match="object[@viewtype='EditableTable']">
        <div class="panel panel-default panel-bg1">
            <xsl:if test="@dependsonparam and @dependsonobject and @dependsonparamvalue">
                <xsl:attribute name="ng-show">
                    <xsl:choose>
                        <xsl:when test="contains(@dependsonparamvalue, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@depends and @parentname and @parent">
                <xsl:attribute name="ng-show">
                    <xsl:choose>
                        <xsl:when test="contains(@parent, ',')">
                            <xsl:call-template name="multiplevalues">
                                <xsl:with-param name="list" select="@parent"/>
                                <xsl:with-param name="delimiter" select="','"/>
                                <xsl:with-param name="dependsobjectname" select="@parentname" />
                                <xsl:with-param name="dependsparamname" select="@depends" />
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/> 
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@title">
                <div  class="block-heading-two">
                    <h3>
                        <span>
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="@title"/>' | translate
                            </xsl:attribute>
                        </span>
                    </h3> 
                </div>
            </xsl:if>
            <div class="panel-body">    
                <xsl:variable name="objectname">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>
                    </xsl:if>
                    <xsl:for-each select="./object">
                        <xsl:value-of select="@name"/>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="name">
                    <xsl:for-each select=". | object">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                <xsl:value-of select="@name"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:variable name="urlobjects">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name and @url">
                            <xsl:value-of select="@name" />:<xsl:value-of select="@url" />
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>	
                <xsl:variable name="hiddenparams">
                    <xsl:for-each select=". | object">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button' and @Display">
                                <xsl:value-of select="@name"/>__<xsl:value-of select="@Value"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>	
                <xsl:variable name="filterData">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                            <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                            <xsl:if test="position() != last()">
                                <xsl:text>&amp;</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>	
                <div class="table-responsive table-scroll-vr" >
                    <table  class="table table-bordered tableCount" componentviewtype="{@viewtype}" formname="{@form}" buttonstatus="{@buttons}">
                        <xsl:if test="@dependsonparam and @dependsonobject">
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'!=')"/>
                                <xsl:text>undefined</xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:if test="@depends and @parentname">
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'!=')"/>
                                <xsl:text>undefined</xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="name">
                            <xsl:copy-of select="$name"/>
                        </xsl:attribute>
                        <xsl:attribute name="reqcall">
                            <xsl:value-of select="boolean(@onload)" />
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                        </xsl:attribute>
                        <xsl:if test="$urlobjects !=''">
                            <xsl:attribute name="urlobjs">
                                <xsl:value-of select="$urlobjects" />
                            </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="filterdata">
                            <xsl:copy-of select="$filterData"/>
                        </xsl:attribute>
                        <thead>
                            <tr>
                                <xsl:for-each select="parameter | object/parameter">
                                    <!--                                    <xsl:if test="@type != 'button' and @Display">
                                        <th id="{../@name}?{@name}">
                                            <xsl:value-of select="@webname"/>
                                        </th>
                                    </xsl:if>-->
                                    <xsl:if test="@type !='button'">
                                        <th>
                                            <xsl:choose>
                                                <xsl:when test="@Display">
                                                    <xsl:attribute name="ng-init" >
                                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','false')" />
                                                    </xsl:attribute>
                                                    <xsl:attribute name="ng-hide" >
                                                        true
                                                    </xsl:attribute>
                                                    <xsl:value-of select="@webname" />
                                                
                                                </xsl:when>
                                                <xsl:when test="not(@Display)">
                                                    <xsl:attribute name="ng-init" >
                                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />
                                                    </xsl:attribute>
                                                    <xsl:value-of select="@webname" />
                                                </xsl:when>
                                            </xsl:choose>
                                        </th>
                                    </xsl:if>
                                </xsl:for-each>
                                <xsl:if test="parameter/@name='edit' or parameter/@name='delete' or parameter/@name='Add'">
                                    <xsl:if test="parameter/@name='Add'">
                                        <th>
                                            <a id="{@name}"   class="btn btn-sm btn-info" >
                                               <xsl:if test="@dependsonparamvalue">
                                            <xsl:attribute name="ng-if">
                                                <xsl:choose>
                                                    <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                        <xsl:call-template name="multiplevalues">
                                                            <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                            <xsl:with-param name="delimiter" select="','"/>
                                                            <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                            <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                        </xsl:call-template>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                           </xsl:attribute>
                                    </xsl:if>
                                        <xsl:if test="@access">
                                            <xsl:attribute name="ng-disabled">
                                               true
                                            </xsl:attribute>
                                        </xsl:if>
                                                <xsl:attribute name="ng-click">
                                                    <xsl:value-of select="concat('editabletableformdisplaystatus(&quot;',translate(translate($objectname,'*',''),'.',''),'showstatus','&quot;)')"/>
                                                </xsl:attribute>
                                                <i class="fa fa-plus icontxtgap"></i>
                                                <span></span>Add</a>
                                        </th>
                                    </xsl:if>
                                </xsl:if>
                            </tr>
                        </thead>
                        <tbody id="bodyData">
                            <tr> 
                                <xsl:attribute name="ng-show">
                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>
                                </xsl:attribute>
                                <xsl:for-each select="parameter | object/parameter">
                                    <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                        <xsl:if test="not(@Display)">
                                            <td>
                                            <form class="add-ip-addr-form"> 
                                                <xsl:attribute name="name">
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_editabletableform')"/>
                                                </xsl:attribute>
                                                <xsl:if test="@type = &apos;stringA&apos;">
                                                    <xsl:call-template name="stringA" />
                                                </xsl:if>
                                                <xsl:if test="@type = &apos;dropdown&apos;">
                                                    <xsl:call-template name="dropdown" />
                                                </xsl:if>
                                                <xsl:if test="@type = &apos;dropdown1&apos;">
                                                    <xsl:call-template name="dropdown1" />
                                                </xsl:if>
                                                <xsl:if test="@type = &apos;multiselect&apos;">
                                                    <xsl:call-template name="multiselect" />
                                                </xsl:if>

                                                <xsl:if test="@type = &apos;checkbox&apos;">
                                                    <xsl:call-template name="checkbox" />
                                                </xsl:if>
                                                <xsl:if test="@type = &apos;checkbox1&apos;">
                                                    <xsl:call-template name="checkbox1" />
                                                </xsl:if>
                                                <xsl:if test="@type = &apos;uint&apos;">
                                                    <xsl:call-template name="string" />
                                                </xsl:if>
                                                <xsl:if test="@type = &apos;macaddress&apos;">
                                                <xsl:call-template name="macaddress" >
                                                    <xsl:with-param name="formname">
                                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:value-of select="../@name" />                                                      
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramoriginalobjectname">
                                                        <xsl:value-of select="../@originalobject" />
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparent">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:value-of select="../@dependsonparamvalue" />
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@parent" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentname">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:value-of select="../@dependsonobject" />
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@parentname" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdepends">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:value-of select="../@dependsonparam" />
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="../@depends" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparamvalue or ../../../@dependsonparamvalue"> 
                                                                <xsl:value-of select="boolean(../@dependsonparamvalue)" />
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="boolean(../@parent)" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectparentnamestatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonobject or ../../../@dependsonobject"> 
                                                                <xsl:value-of select="boolean(../@dependsonobject)" />
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="boolean(../@parentname)" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="parentobjectdependsstatus">
                                                        <xsl:choose>
                                                            <xsl:when test="../@dependsonparam or ../../../@dependsonparam"> 
                                                                <xsl:value-of select="boolean(../@dependsonparam)" />
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:value-of select="boolean(../@depends)" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:with-param>
                                                    <xsl:with-param name="paramobjectpreviousname">
                                                        <xsl:value-of select="../@previousname" />
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            </form>
                                            </td>
                                        </xsl:if>
                                    </xsl:if>
                                </xsl:for-each>
                                <td style="vertical-align: middle;">
                                    <a class="btn table-btn" source="{@viewtype}" data-ng-click="macrowApply($event)" >
                                        <xsl:attribute name="showstatus">
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>
                                        </xsl:attribute>
                                        <xsl:attribute name="id">
                                            <!-- <xsl:value-of select="translate(@name,'.*','')"/>
                                            <xsl:value-of select="@viewtype"/> -->
                                            <xsl:text>Add</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="source">
                                            <xsl:value-of select="$name" />
                                        </xsl:attribute>
                                        <xsl:attribute name="hiddenparams">
                                            <xsl:value-of select="$hiddenparams" />
                                        </xsl:attribute>
                                        <xsl:attribute name="formname">
                                            <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                                        </xsl:attribute>
                                        <span class="fa fa-check btn_color_grn"></span>
                                    </a>
                                    <a class="btn table-btn">
                                        <xsl:attribute name="ng-click">
                                            <xsl:value-of select="concat('rowcancel(&quot;',translate(translate($objectname,'*',''),'.',''),'showstatus','&quot;)')"/>
                                        </xsl:attribute>
                                        <span class="fa fa-times btn_color_red" ></span>
                                    </a>
                                </td>
                            </tr>
                            <tr ng-init="sectionIndex = $index">
                                <xsl:attribute name="ng-repeat" >
                                    user in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                                </xsl:attribute>
                                <td ng-repeat="key in user | keys" ng-if="false==$last" >
                                    <xsl:attribute name="ng-show">
                                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')" />{{$index+1}}
                                    </xsl:attribute>
                                    <span  e-form="rowform" >
                                        <xsl:attribute name="editable-text">
                                            user.{{key}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-name">
                                            {{key}}
                                        </xsl:attribute>
                                        {{user[key]}}   
                                    </span>
                                </td>
                                <td ng-repeat="(key, value) in user" ng-if="true==$last" style="display:none" >
                                    <span  e-form="rowform">
                                        <xsl:attribute name="editable-text">
                                            user.{{key}}
                                        </xsl:attribute>
                                        <xsl:attribute name="e-name">
                                            {{key}}
                                        </xsl:attribute>
                                        {{value}}   
                                    </span>
                                </td>
                                <!-- <td ng-repeat="td in user" ng-if="true==$last" style="white-space: nowrap"> -->
                                <xsl:if test="parameter/@name='edit' or parameter/@name='delete' or parameter/@name='Add'">    
                                    <td>
                                        <form  name="rowform"    onaftersave="editableApply($data)"  ng-show="rowform.$visible"  class="form-buttons form-inline editable-form" shown="inserted == user">
                                            <button type="submit"  ng-disabled="rowform.$waiting"  class="btn btn-info">
                                                <xsl:attribute name="name">
                                                    <xsl:text>save</xsl:text>
                                                </xsl:attribute>
                                                <xsl:text>save</xsl:text>
                                            </button>&#xA0;&#xA0;&#xA0;
                                            <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-info">
                                                <xsl:attribute name="name">
                                                    <xsl:text>cancel</xsl:text>
                                                </xsl:attribute>
                                                <xsl:text>cancel</xsl:text>
                                            </button>  
                                        </form>  
                                        <div class="buttons" ng-show="!rowform.$visible">
                                            <xsl:if test="parameter/@name='edit'">
                                                <button class="btn btn-info" ng-click="rowform.$show()">
                                                    <xsl:attribute name="name">
                                                        <xsl:text>edit</xsl:text>
                                                    </xsl:attribute>
                                                    <i class="fa fa-edit"></i></button>&#xA0;&#xA0;&#xA0;
                                            </xsl:if>
                                            <xsl:if test="parameter/@name='delete'">
                                                <button class="btn btn-info">
                                                    <xsl:attribute name="name">
                                                        <xsl:text>delete</xsl:text>
                                                    </xsl:attribute>
                                                    <xsl:attribute name="data-ng-click">
                                                        deletemacrow(user,sectionIndex)
                                                    </xsl:attribute>
                                                    <xsl:attribute name="id">
                                                        <xsl:text>{{user.z}}</xsl:text>
                                                    </xsl:attribute>Delete</button>
                                            </xsl:if>
                                        </div>   
                                    </td> 
                                </xsl:if>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <xsl:for-each select="parameter">
                <xsl:if test="@type = &apos;button&apos; and @name != &apos;edit&apos; and @name != &apos;delete&apos; and @name != &apos;Add&apos;">
                    <xsl:call-template  name="button" />
                </xsl:if>
            </xsl:for-each>
            
        </div>
    </xsl:template>
<xsl:template match="object[@viewtype='rowtable']">
        <div class="panel">
            <xsl:if test="@title">
                <div class="block-heading-two1 panel-heading blu_bg">
                    <xsl:if test="@icon">
                        <img class="panel_icons">
                            <xsl:attribute name="src">
                                <xsl:value-of select="concat('images/icons/',@icon,'.png')" />
                            </xsl:attribute>
                        </img>
                    </xsl:if> 
                    <span>                        
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="@title"/>' | translate
                            </xsl:attribute>
                        </span>            
                </div>
            </xsl:if>
            <xsl:variable name="objectname">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <xsl:value-of select="@name"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="name">
                <xsl:for-each select=". | object">
                    <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                        <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                            <xsl:value-of select="@name"/>
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                    <xsl:if test="position() != last()">
                        <xsl:text>&amp;</xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="filterData">
                <xsl:for-each select=". | object">
                    <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                        <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <div class="panel-body">
                <div class="table-responsive table-scroll-vr">
                    <table  class="table table-bordered tableCount theme_intel" componenttype="{@viewtype}" name="{@name}">
                        <xsl:attribute name="name">
                            <xsl:copy-of select="$name"/>
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                        </xsl:attribute>
                        <xsl:attribute name="filterdata">
                            <xsl:copy-of select="$filterData"/>
                        </xsl:attribute>
                        <tbody id="bodyData">
                            <tr ng-if="false==$last" > 
                                <xsl:attribute name="ng-repeat">
                                    (key,value) in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                                    <xsl:text>[0]</xsl:text>
                                </xsl:attribute>
                                <td>{{key | split:'__':1 | translate}}</td>
                                <td>{{value}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
            </div>
        <div class="row">
            <div class="col-lg-12">
                <xsl:for-each select="parameter">
                    <xsl:if test="@type = &apos;button&apos; and @name != &apos;edit&apos; and @name != &apos;delete&apos;">
                        <xsl:call-template  name="button" />
                    </xsl:if>
                </xsl:for-each>
            </div>            
        </div>
    </xsl:template>
<xsl:template match="object[@viewtype='tabview']">
        <div class="tabs-container">
           <xsl:variable name="name">
                    <xsl:for-each select=". | object">
                        <xsl:if test="@name">
                            <xsl:value-of select="@name"/>?<xsl:for-each select="parameter | row/col/parameter">
                                <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                    <xsl:value-of select="@name"/>
                                    <xsl:if test="position() != last()">
                                        <xsl:text>,</xsl:text>
                                    </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            <xsl:if test="position() != last()">
                                <xsl:text>&amp;</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
            </xsl:variable>
            <ul class="nav nav-tabs pull-left ipvbtn">
                <xsl:attribute name="ng-init">
                       <xsl:value-of select="concat('initTabs(&quot;',$name,'&quot;);initevent(&quot;',@title,'&quot;)')"/>
                </xsl:attribute>
                <xsl:for-each select="tabs/tab">
                    <li>
                        <xsl:if test="position()=1">
                            <xsl:attribute name="class">
                                active
                            </xsl:attribute>
                        
                        </xsl:if>
                        <xsl:if test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                                <xsl:attribute name="ng-if">
                                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                                </xsl:attribute>
                        </xsl:if>
                        <a data-toggle="tab" aria-expanded="false"> 
                            <xsl:attribute name="source">
                                <xsl:value-of select="@formtoopen"/>
                            </xsl:attribute>
                            <xsl:attribute name="href">
                               <xsl:value-of select="concat('#',translate(translate(@title,'.$',''),' ',''))"/>
                            </xsl:attribute>
                            <xsl:value-of select="@title" />
                        </a>
                    </li>
                </xsl:for-each>
            </ul>
            <div class="tab-content ipvtabcontent">
                <xsl:for-each select="tabs/tab">
                    <div >
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="position()=1">
                                    panel-body tab-pane fade in active
                                </xsl:when>
                                <xsl:otherwise>
                                    panel-body tab-pane fade
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="translate(translate(@title,'.$',''),' ','')"/>
                        </xsl:attribute>
                    </div>
                </xsl:for-each>
            </div>
        </div>
    </xsl:template>
<xsl:template match="object[@viewtype='accordionComponent']">
        <div class="panel panel-default panel-bg1">
            <h2>
                <xsl:attribute name="ng-bind">
                    '<xsl:value-of select="@title"/>' | translate
                </xsl:attribute>
            </h2>
            <xsl:variable name="objectname">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <xsl:value-of select="translate(translate(@name,'.$',''),'*','')"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="AccordionObj">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <!--<xsl:value-of select="translate(translate(@name,'.$',''),'*','')"/>-->
                    <xsl:value-of select="@name"/>
                    <xsl:if test="position() != last()">
                        <xsl:text>,</xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="name">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                <xsl:value-of select="@name"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="modifyObjects">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name and @operationtype">
                        <xsl:value-of select="@name"/>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="filterData">
                <xsl:for-each select=". | object">
                    <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                        <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <div class="panel-body">
                <table class="table table-bordered theme_intel">  
                    <xsl:attribute name="name">
                        <xsl:copy-of select="$name"/>
                    </xsl:attribute> 
                    <xsl:attribute name="id">
                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                    </xsl:attribute>
                    <xsl:attribute name="ModifyObjects">
                        <xsl:value-of select="$modifyObjects"/>
                    </xsl:attribute>
                    <xsl:attribute name="filterdata">
                        <xsl:copy-of select="$filterData"/>
                    </xsl:attribute>                 
                    <thead>
                        <tr>
                            <xsl:for-each select="parameter | object/parameter">
                                <xsl:if test="@type !='button'">
                                    <th>
                                        <xsl:choose>
                                            <xsl:when test="@Display">
                                                <xsl:attribute name="ng-init" >
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','false')" />
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-hide" >
                                                    true
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                                
                                            </xsl:when>
                                            <xsl:when test="not(@Display)">
                                                <xsl:attribute name="ng-init" >
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                            </xsl:when>
                                        </xsl:choose>
                                    </th>
                                </xsl:if>	
                            </xsl:for-each> 
                        </tr>
                    
                    </thead>
                    <tbody ng-init="sectionIndex = $index">
                        <!--<xsl:for-each select="parameter | object/parameter">-->	
                        <xsl:attribute name="ng-repeat">
                            user in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                        </xsl:attribute>
                        <tr class="main-row">
                            <td ng-repeat="key in user | keys" ng-if="false==$last">{{user[key]}}</td>
                            <td>
                                <!--<button class="btn btn-info" ng-click="accordiontabledetail($index,$event)" ng-init="toggleText[$index] = 'More'">-->
                                <button class="btn btn-info" ng-click="accordiontabledetail($index,$event)">
                                    <xsl:attribute name="ng-init">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[$index]='More'
                                    </xsl:attribute>
                                    <xsl:attribute name="source">
                                        <xsl:value-of select="@formToOpen" />
                                    </xsl:attribute>
                                    <xsl:attribute name="targetId">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>{{$index}}
                                    </xsl:attribute>
                                    <xsl:attribute name="tabletoggleText">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="objectname">
                                        {{user.z}}
                                    </xsl:attribute>
                                    <!--{{toggleText[$index]}}-->
                                    {{<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[$index]}}
                                </button>
                            </td>
                        </tr>
                        <tr class="extra-row" ng-show="accordion.activePosition==$index" >
                            <td colspan="5">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>{{$index}}
                                </xsl:attribute>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </xsl:template>
<xsl:template match="object[@viewtype='accordion1']">
        <div class="panel panel-default panel-bg1">
            <h2>
                <xsl:attribute name="ng-bind">
                    '<xsl:value-of select="@title"/>' | translate
                </xsl:attribute>
            </h2>
            <xsl:variable name="objectname">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <xsl:value-of select="translate(translate(@name,'.',''),'*','')"/>
                </xsl:for-each>
            </xsl:variable>
            <div class="panel-body">
                <table class="table table-bordered theme_intel">  
                    <thead>
                        <tr>
                            <th>
                                <xsl:attribute name="ng-bind">
                                    'Component' | translate
                                </xsl:attribute>
                            </th>
                            <th>
                                <xsl:attribute name="ng-bind">
                                    'Expand' | translate
                                </xsl:attribute>
                            </th>
                        </tr>
                    </thead>
                    <xsl:for-each select="parameter">
                        <tbody>
                            <tr class="main-row">
                                <td>
                                    <xsl:attribute name="ng-bind">
                                        '<xsl:value-of select="@webname" /> '|translate
                                    </xsl:attribute>
                                </td>
                                <td>
                                    <button class="btn btn-info">
                                        <xsl:attribute name="ng-init">
                                            <!--                                            <xsl:text>toggleText[</xsl:text>
                                            <xsl:value-of select="position()" />
                                            <xsl:text>] = 'More'</xsl:text>                                            -->
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[<xsl:value-of select="position()" />]='More'
                                        </xsl:attribute>
                                        <xsl:attribute name="ng-click">
                                            <xsl:text>accordionparametertoggledetail(</xsl:text>
                                            <xsl:value-of select="position()" />
                                            <xsl:text>,$event)</xsl:text>
                                        </xsl:attribute>
                                        <xsl:attribute name="objectname">
                                            <xsl:value-of select="$objectname" />
                                        </xsl:attribute>
                                        <xsl:attribute name="source">
                                            <xsl:value-of select="@formToOpen" />
                                        </xsl:attribute>
                                        <xsl:attribute name="targetId">
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                                            <xsl:value-of select="position()" />
                                        </xsl:attribute>
                                        <xsl:attribute name="tabletoggleText">
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>
                                        </xsl:attribute>
                                        <!--                                        <xsl:text>{{toggleText[</xsl:text>
                                        <xsl:value-of select="position()" />
                                        <xsl:text>]}}</xsl:text> -->
                                        {{<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>
                                        <xsl:text>[</xsl:text>
                                        <xsl:value-of select="position()" />
                                        <xsl:text>]}}</xsl:text>
                                    </button>
                                </td>
                            </tr>
                            <tr class="extra-row" >
                                <xsl:attribute name="ng-show">
                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'accordion')"/>
                                    <xsl:text>==</xsl:text>
                                    <xsl:value-of select="position()" />
                                </xsl:attribute>
                                <td colspan="2">
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                                        <xsl:value-of select="position()" />
                                    </xsl:attribute>
                                </td>
                            </tr>
                        </tbody>
                    </xsl:for-each>
                </table>
            </div>
        </div>
    </xsl:template>
<xsl:template match="object[@viewtype='accordion']">
        <div class="panel panel-default panel-bg1">
            <xsl:if test="@dependsonparamvalue and @dependsonobject and @dependsonparam">
                <xsl:attribute name="ng-if">
                    <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@parent and @parentname and @depends">
                <xsl:attribute name="ng-show">
                    <xsl:value-of select="concat(translate(translate(@parentname,'.',''),'*',''),'.',@depends,'==',@parent)"/>
                </xsl:attribute>
            </xsl:if>
            <div class="block-heading-two1 panel-heading blu_bg">
                    <xsl:if test="@icon">
                        <img class="panel_icons">
                            <xsl:attribute name="src">
                                <xsl:value-of select="concat('images/icons/',@icon,'.png')" />
                            </xsl:attribute>
                        </img>
                    </xsl:if> 
                    <span>                        
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="@title"/>' | translate
                            </xsl:attribute>
                        </span>            
                </div>             
            <xsl:variable name="objectname">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <xsl:value-of select="translate(translate(@name,'.$',''),'*','')"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="AccordionObj">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <!--<xsl:value-of select="translate(translate(@name,'.$',''),'*','')"/>-->
                    <xsl:value-of select="@name"/>
                    <xsl:if test="position() != last()">
                        <xsl:text>,</xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="obj-param-type">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:value-of select="translate(translate(../@name,'*',''),'.','')"/>__<xsl:if test="@type != 'pushbutton' and @type != 'button'">
                        <xsl:value-of select="@name"/>__<xsl:value-of select="@type" />
                        <xsl:if test="position() != last()">
                            <xsl:text>,</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
             <xsl:variable name="obj-param-details">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:value-of select="concat(@name, '?access:',@access, '-')"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="name">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                <xsl:value-of select="@name"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="urlobjects">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name and @url">
                        <xsl:value-of select="@name" />:<xsl:value-of select="@url" />
                        <xsl:if test="position() != last()">
                            <xsl:text>,</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="modifyObjects">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name and @operationtype">
                        <xsl:value-of select="@name"/>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="filterData">
                <xsl:for-each select=". | object">
                    <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                        <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <div class="alert alert-danger">
                <xsl:attribute name="ng-show">
                    <xsl:value-of select="concat('accordion.',translate(translate($objectname,'*',''),'.',''),'popup')"/>
                </xsl:attribute>
                <xsl:attribute name="ng-init">
                    <xsl:value-of select="concat('accordion.',translate(translate($objectname,'*',''),'.',''),'popup','=false')"/>
                </xsl:attribute>
                <a class="close" aria-label="close">
                    <xsl:attribute name="ng-click">
                        <xsl:value-of select="concat('popupclose(&quot;','accordion.',translate(translate($objectname,'*',''),'.',''),'popup','&quot;)')"/>;
                    </xsl:attribute>&#10006;
                </a>
                <p>
                    <xsl:attribute name="ng-bind-html">
                        <xsl:value-of select="concat('accordion.',translate(translate($objectname,'*',''),'.',''),'popupval',' | unsafe')"/>
                    </xsl:attribute>
                </p>
            </div>
            <div class="panel-body">
                <table class="table table-bordered theme_intel table-column-4" loadstatus="{@onload}">  
                    <xsl:attribute name="name">
                        <xsl:copy-of select="$name"/>
                    </xsl:attribute> 
                    <xsl:attribute name="objparamrelation">
                        <xsl:copy-of select="$obj-param-type"/>
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                    </xsl:attribute>
                    <xsl:if test="$urlobjects !=''">
                        <xsl:attribute name="urlobjs">
                            <xsl:value-of select="$urlobjects" />
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:attribute name="ModifyObjects">
                        <xsl:value-of select="$modifyObjects"/>
                    </xsl:attribute>
                    <xsl:attribute name="filterdata">
                        <xsl:copy-of select="$filterData"/>
                    </xsl:attribute>
                    <xsl:variable name="hiddenparams">
                        <xsl:for-each select="parameter | object/parameter">
                            <xsl:if test="@type !='button' and @Display" >
                                <xsl:value-of select="../@name" />?<xsl:value-of select="@name" />__<xsl:value-of select="@Value" />
                                <xsl:if test="position() != last()">
                                    <xsl:text>&amp;</xsl:text>
                                </xsl:if>
                            </xsl:if>	
                        </xsl:for-each>    
                    </xsl:variable>
                    <thead>
                        <tr>
                            <xsl:for-each select="parameter | object/parameter">
                                <xsl:if test="@type !='button'">
                                    <th>
                                        <!--                                        <xsl:attribute name="ng-init">
                                            <xsl:value-of select="concat('test',position(),'=','true')" />
                                        </xsl:attribute>
                                        <xsl:value-of select="@name" />-->
                                        <xsl:choose>
                                            <xsl:when test="@Display">
                                                <xsl:attribute name="ng-init" >
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','false')" />
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-hide" >
                                                    true
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                                
                                            </xsl:when>
                                            <xsl:when test="not(@Display)">
                                                <xsl:attribute name="ng-init" >
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                            </xsl:when>
                                        </xsl:choose>
                                    </th>
                                </xsl:if>	
                            </xsl:for-each> 
                            <!--                            <xsl:for-each select="parameter | object/parameter">
                                <xsl:choose>
                                    <xsl:when test="not(@type = 'button') and not(@Display = 'No')">
                                        <th id="{../@name}?{@name}">
                                            <xsl:value-of select="@webname"/>
                                        </th>
                                    </xsl:when>
                                    <xsl:when test="@Display='No'">
                                        <th id="{../@name}?{@name}">
                                            <xsl:attribute name="ng-hide">
                                                <xsl:text>true</xsl:text>
                                            </xsl:attribute>
                                        </th>
                                    </xsl:when>
                                </xsl:choose>
                            </xsl:for-each>-->
                            <xsl:for-each select="parameter | object/parameter">
                            <xsl:if test="@name='Add'">
                                <th>
                                    <a id="{@name}" name="{@name}"  class="btn btn-sm btn-info">
                                        <xsl:attribute name="ng-click">
                                            <xsl:value-of select="concat('editabletableformdisplaystatus(&quot;',translate(translate($objectname,'*',''),'.',''),'showstatus','&quot;,&quot;',$AccordionObj,'&quot;)')"/>
                                        </xsl:attribute>
                                        <xsl:if test="@dependsonparamvalue">
                                            <xsl:attribute name="ng-if">
                                                <xsl:choose>
                                                    <xsl:when test="contains(@dependsonparamvalue, ',')">
                                                        <xsl:call-template name="multiplevalues">
                                                            <xsl:with-param name="list" select="@dependsonparamvalue"/>
                                                            <xsl:with-param name="delimiter" select="','"/>
                                                            <xsl:with-param name="dependsobjectname" select="@dependsonobject" />
                                                            <xsl:with-param name="dependsparamname" select="@dependsonparam" />
                                                        </xsl:call-template>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <xsl:value-of select="concat(translate(translate(@dependsonobject,'.',''),'*',''),'.',@dependsonparam,'==',@dependsonparamvalue)"/> 
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                           </xsl:attribute>
                                    </xsl:if>
                                        <xsl:if test="@access">
                                            <xsl:attribute name="ng-disabled">
                                               true
                                            </xsl:attribute>
                                        </xsl:if>
                                        <!--                                        <xsl:attribute name="ng-click">
                                            tableplusAddAccordion(<xsl:value-of select="concat('&quot;',translate(translate($name,'*',''),'.',''),'&quot;')" />)
                                        </xsl:attribute>-->
                                        <i class="fa fa-plus table_plusicon"></i><span>                                            
                                            <xsl:attribute name="ng-bind">
                                                ' Add' | translate
                                            </xsl:attribute>
                                        </span>
                                    </a>
                                </th>
                            </xsl:if>
                            </xsl:for-each>
                        <th></th>
                        </tr>
                        <tr> 
                            <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>
                            </xsl:attribute>
                            <xsl:for-each select="parameter | object/parameter">
                               <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                    <xsl:if test="not(@Display)">
                                        <td>
                                            <xsl:if test="@type = &apos;stringA&apos;">
                                                <xsl:call-template name="stringA" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;passwordA&apos;">
                                                <xsl:call-template name="passwordA" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;dropdown&apos;">
                                                <xsl:call-template name="dropdown" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;dropdown1&apos;">
                                                <xsl:call-template name="dropdown1" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;multiselect&apos;">
                                                <xsl:call-template name="multiselect" />
                                            </xsl:if>

                                            <xsl:if test="@type = &apos;checkbox&apos;">
                                                <xsl:call-template name="checkbox" />
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;checkboxwithoutlabel&apos;">
                                                <xsl:call-template name="checkboxwithoutlabel">
                                                    <xsl:with-param name="paramobjectname">
                                                        <xsl:value-of select="../@name" />
                                                    </xsl:with-param>
                                                </xsl:call-template>
                                            </xsl:if>
                                            <xsl:if test="@type = &apos;uint&apos;">
                                                <xsl:call-template name="string" />
                                            </xsl:if>
                                        </td>
                                    </xsl:if>
                                </xsl:if>
                            </xsl:for-each>
                            <td style="vertical-align:middle">
                                <a class="btn btn-xs table-btn" source="{@viewtype}" >
                                    <xsl:attribute name="showstatus">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'showstatus')"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="data-ng-click">
                                        addObject(<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;,','&quot;',$AccordionObj,'&quot;')"/>,$event);Apply($event,true,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>)
                                    </xsl:attribute>
                                    
                                    <xsl:attribute name="hiddenparams">
                                        <xsl:value-of select="$hiddenparams" />
                                    </xsl:attribute>
                                    <xsl:attribute name="id">
                                        <!-- <xsl:value-of select="translate(@name,'.*','')"/>
                                        <xsl:value-of select="@viewtype"/> -->
                                        <xsl:text>Add</xsl:text>
                                    </xsl:attribute>
                                    <xsl:attribute name="source">
                                        <xsl:value-of select="$name" />
                                    </xsl:attribute>
                                    <xsl:attribute name="childparentrelation">
                                        <xsl:value-of select="@childparentrelation" />
                                    </xsl:attribute>

                                    <span class="fa fa-check btn_color_grn"></span>
                                </a>&#xA0;&#xA0;&#xA0;
                                <a class="btn btn-xs table-btn"  >
                                    <xsl:attribute name="ng-click">
                                        <xsl:value-of select="concat('rowcancel(&quot;',translate(translate($objectname,'*',''),'.',''),'showstatus','&quot;)')"/>
                                    </xsl:attribute>
                                    <span class="fa fa-times btn_color_red" ></span>
                                </a>
                            </td>
                        </tr>
                    </thead>
                    <tbody ng-init="sectionIndex = $index">
                        <xsl:attribute name="obj-param-details"> 
                            <xsl:value-of select="$obj-param-details"/>
                        </xsl:attribute>
                        <xsl:attribute name="ng-repeat">
                            user in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                        </xsl:attribute>
                        <tr class="main-row">
                            <td  ng-if="false==$last">
                                <xsl:attribute name="ng-repeat">
                                    key in user | keys:'<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'')"/>'
                                </xsl:attribute>
                                <xsl:attribute name="ng-show">
                                    <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>{{$index+1}}
                                </xsl:attribute>
                                <!--                                <xsl:attribute  name="ng-hide">
                                    {{key | split:'__':1}}==Alias
                                </xsl:attribute>-->
                                <span  e-form="rowform" >
                                   <xsl:attribute name="ng-if">
                                        <xsl:text>'stringA' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>||<xsl:text>'passwordA' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                    </xsl:attribute>
                                    <xsl:attribute name="editable-text">
                                        user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-name">
                                        {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-disabled">
                                        checkEditableDisable(key,$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-blur">
                                        textchangeEditable(key,$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}  
                                </span>
                                <span  e-form="rowform">
                                    <xsl:attribute name="ng-if">
                                        <xsl:text>'dropdown1' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                    </xsl:attribute>
                                    <xsl:attribute name="editable-select">
                                        user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-disabled">
                                        checkEditableDisable(key,$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    <xsl:attribute name="e-name">
                                        {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-options" >
                                        <xsl:text>obj.name as obj.name for obj in {{keyname(key)}}</xsl:text>   
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-change">
                                        dropdownchangeEditable(key,$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    {{urldropdownvalue(keyname(key),user[key.split('__')[0]+"__"+key.split('__')[1]])}}   
                                </span>
                                <span  e-form="rowform">
                                   <xsl:attribute name="ng-if">
                                        <xsl:text>'checkboxwithoutlabel' == elementtype(</xsl:text>key<xsl:text>)</xsl:text>
                                    </xsl:attribute>
                                    <xsl:attribute name="editable-checkbox">
                                        user.{{key.split('__')[0]+"__"+key.split('__')[1]}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-disabled">
                                        checkEditableDisable(key,$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-true-value">
                                        'true'
                                    </xsl:attribute>
                                    <xsl:attribute name="e-for">
                                         user.{{key.split('__')[0]+"__"+key.split('__')[1] + sectionIndex}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-id">
                                         user.{{key.split('__')[0]+"__"+key.split('__')[1] + sectionIndex}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-name">
                                        {{key.split('__')[0]+"__"+key.split('__')[1]}}
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-false-value">
                                        'false'
                                    </xsl:attribute>
                                    <xsl:attribute name="e-ng-change">
                                       checkboxchangeEditable(key,$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    {{user[key.split('__')[0]+"__"+key.split('__')[1]]}}    
                                </span>
                            </td>
                            <td ng-repeat="(key, value) in user" ng-if="true==$last" style="display:none" >
                                <span  e-form="rowform">
                                    <xsl:attribute name="editable-text">
                                        user.{{key}}
                                    </xsl:attribute>
                            
                                    <xsl:attribute name="e-name">
                                        {{key}}
                                    </xsl:attribute>
                                    {{value}}   
                                </span>
                            </td>
                            <!--<xsl:if test="parameter/@name='edit' or parameter/@name='delete' or parameter/@name='Add'">-->    
                            <td style="vertical-align:middle">
                                <xsl:if test="parameter/@name='delete'">
                                    <button ng-init="rowform.$show()" class="btn table-btn"  >
                                        <!--data-ng-click="remove($index)"-->   
                                        <xsl:attribute name="ng-click">
                                            removeRow(<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,$index)
                                        </xsl:attribute>
                                        <xsl:attribute name="ng-disabled">
                                            checkEditableDisable('delete',$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                        </xsl:attribute>
                                        <xsl:attribute name="id">
                                            <xsl:text>{{user.z}}</xsl:text>
                                        </xsl:attribute><span class="fa fa-trash-o btn_color_red"></span>
                                        </button>
                                </xsl:if>
                            </td> 
                            <!--</xsl:if>-->
                            <td>
                                <!--<button class="btn btn-info" ng-click="accordionformdetailtoggleDetail($index,$event)" ng-init="toggleText[$index] = 'More'">-->
                                <button class="btn btn-info" ng-click="accordionformdetail($index,$event)">
                                    <xsl:attribute name="ng-init">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[$index]='More'
                                    </xsl:attribute>
                                    <xsl:attribute name="source">
                                        <xsl:value-of select="@formToOpen" />
                                    </xsl:attribute>
                                    <xsl:attribute name="ng-disabled">
                                        checkEditableDisable('edit',$data,user.z,<xsl:value-of select="concat('&quot;',translate(translate($objectname,'*',''),'.',''),'&quot;')"/>,sectionIndex)
                                    </xsl:attribute>
                                    
                                    <xsl:attribute name="targetId">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>{{$index}}
                                    </xsl:attribute>
                                    <xsl:attribute name="tabletoggleText">
                                        <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="childparentrelation">
                                        <xsl:value-of select="@childparentrelation" />
                                    </xsl:attribute>
                                    <xsl:attribute name="objectIndex">
                                        {{user.objectIndex}}
                                    </xsl:attribute>
                                    <xsl:attribute name="objectname">
                                        {{user.z}}
                                    </xsl:attribute>
                                    <!--{{toggleText[$index]}}-->
                                    {{<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[$index]}}
                                </button>
                            </td>
                        </tr>
                        <tr class="extra-row" ng-show="accordion.activePosition==$index" >
                            <!--                    <xsl:attribute name="ng-show">
                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'accordion')"/>
                                <xsl:text>==</xsl:text>
                                {{$index}}
                            </xsl:attribute>-->
                            <!--<div class="row">-->
                            <td colspan="5">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>{{$index}}
                                </xsl:attribute>
                            </td>
                            
                            <!--</div>-->
                            
                        </tr>
                        
                    </tbody>
                    
                </table>
                <form name="rowform" onaftersave="bulkapply()" class="form-buttons form-inline editable-form" >
                    <!--    
                        nolocaladdapply="true" in XML will remove the Apply button 
                        locally available in Accordion.
                        This one used only when Global Apply button is used,
                        and also accordion is one of the element with other elements.
                    -->
                    <xsl:if test="not(@nolocaladdapply)">
                        <div class="btn-form text-right" ng-show="rowform.$visible" ng-init="rowform.$visible = 'true'">
                            <button class="btn btn-info" ng-disabled="tableform.$waiting">
                                <xsl:attribute name="ng-bind">
                                    'Apply' | translate
                                </xsl:attribute>
                            </button>
                        </div>
                    </xsl:if>
                </form>
            </div>
        </div>
                
    </xsl:template>
<xsl:template match="row">
        <xsl:param name="layoutstatus" />
        <div class="row">
            <xsl:for-each select="col">
                <xsl:apply-templates>  
                    <xsl:with-param name="layout" select="$layoutstatus"/>
                </xsl:apply-templates>
            </xsl:for-each>
        </div>
        
    </xsl:template>

    <xsl:template match="view">
<div class="row ltq_breadcrumbs">    
 <div  ng-repeat="breadcrumb in $root.breadcrumbs" >
 <ng-switch on="$first">
 <div class="btn-group btn-breadcrumb1" ng-switch-when="true">
  <div class="ltq_brd_home" >
      <a  class="btn" ng-click="homefun()" >
      <xsl:attribute name="ng-href">                        
      #/{{breadcrumb.path}}                                 
      </xsl:attribute>
      <i class="fa fa-home"></i>
      {{breadcrumb.name}} 
      </a>
  </div>
 </div> 
<div class="btn-group btn-breadcrumb" ng-switch-when="false" >
<span class="btn btn-default not-active" ng-if="breadcrumb.path=='nothing' || $last==true" >
{{breadcrumb.name}} 
</span>
<span ng-if ="breadcrumb.path!='nothing' &amp;&amp; $last==false">
 <a  class="btn">                                        
       <xsl:attribute name="ng-href">                          
             #/{{breadcrumb.path}}                                   
                   </xsl:attribute>                                        
                         <i></i>                              
                               {{breadcrumb.name}}                                     
                                     </a>   
                                     </span>
</div>

</ng-switch>
</div>
</div>
        <div id="translation" class="ng-hide">
            <xsl:value-of select="@viewid" />
        </div>
        <div id="headername" class="ng-hide">
            <xsl:value-of select="header/name/text()"/>
        </div>
        <div id="headerdescription" class="ng-hide">
            <xsl:value-of select="header/description/text()"/>
        </div>
        <xsl:variable name="layoutstat">
            <xsl:choose>
                <xsl:when test="@layout='2column'">
                    <xsl:value-of select="boolean(@layout)" />
                </xsl:when>
                <xsl:otherwise>
                    false
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:if test="boolean(./helptext)">
            <xsl:variable name="helpkey">{{'<xsl:value-of select="concat(@viewid,'.','helpkey')" />' | translate}}</xsl:variable>
            <div class="help_toggle helpshow" ng-init="scopevariable=true"  ng-class="scopevariable ? 'helpshow' : 'helphide'">
                
                <div class="help_txtcontent">
                   
                    <a href="" ng-click="helpDetail($event)" >
                        <xsl:attribute name="helpfile">
                            <xsl:value-of select="concat('languages/*/',$helpkey)" />
                        </xsl:attribute>
                        <i class="fa fa-info circle_bg"></i>
                    </a>
                    <div class="help_content">
                        <xsl:attribute name="ng-include">
                            helpfile   
                        </xsl:attribute>
                    </div>
                </div>
            </div>
        </xsl:if>
         <xsl:if test="boolean(./helptour)">
            <xsl:variable name="helpkey">'<xsl:value-of select="helptour" />'</xsl:variable>
            <div class="help_tour_toggle helpshow" ng-init="scopevariable=true">
                <div class="help_txtcontent">
                   
                    <a href="">
                        <xsl:attribute name="ng-click">
                            startTour(<xsl:value-of select="$helpkey" />)
                        </xsl:attribute>
                       <i class="fa fa-question circle_bg"></i>
                    </a>
                    
                </div>
            </div>
        </xsl:if>
        <xsl:variable name="pageLevelApply" >
            <xsl:for-each select="object[@viewtype='form'] | object[@viewtype='form']/object">
                <xsl:if test="@name">
                    <xsl:value-of select="@name" />?<xsl:for-each select="parameter">
                        <xsl:if test="@type!='button'">
                            <xsl:value-of select="@name" />
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                    <xsl:if test="position() != last()">
                        <xsl:text>&amp;</xsl:text>
                    </xsl:if>
                </xsl:if>
            </xsl:for-each>
        </xsl:variable>
        <xsl:variable name="pageLevelId" >
            <xsl:for-each select="object[@viewtype='form'] | object[@viewtype='form']/object">
                <xsl:if test="@name">
                    <xsl:value-of select="@name" />
                </xsl:if>
            </xsl:for-each>
        </xsl:variable>
        <xsl:variable name="relationpageLevelId" >
             <xsl:for-each select="object[@viewtype='form'] | object[@viewtype='form']/object">
                <xsl:if test="@name">
                    <xsl:value-of select="@name" />
                     <xsl:for-each select="./object">
                        <xsl:value-of select="@name"/>
                     </xsl:for-each>
                    <xsl:text>,</xsl:text>
                </xsl:if>
            </xsl:for-each>
        </xsl:variable>
        <xsl:apply-templates>
            <xsl:with-param name="layoutstatus">
                <xsl:value-of select="$layoutstat" />
            </xsl:with-param>  
        </xsl:apply-templates>
        <xsl:for-each select="parameter">
            
            <xsl:call-template name="pagelevelButton">
                <xsl:with-param name="param" select="$pageLevelApply"/>
                <xsl:with-param name="param1">
                    <xsl:value-of select="./@routeurl" />
                </xsl:with-param>
                <xsl:with-param name="formname">
                    <xsl:value-of select="translate(translate($pageLevelId,'*',''),'.','')" />
                </xsl:with-param>
                <xsl:with-param name="relationformname">
                    <xsl:value-of select="translate(translate($relationpageLevelId,'*',''),'.','')" />
                </xsl:with-param>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>
     <xsl:template match="helptour">
            <xsl:copy>
            </xsl:copy>
    </xsl:template>
    <xsl:template match="object[@viewtype='tableaccordion']">
        <div class="panel panel-default panel-bg1">
            <div class="block-heading-two1 panel-heading blu_bg">
                    <xsl:if test="@icon">
                        <img class="panel_icons">
                            <xsl:attribute name="src">
                                <xsl:value-of select="concat('images/icons/',@icon,'.png')" />
                            </xsl:attribute>
                        </img>
                    </xsl:if> 
                    <span>                        
                            <xsl:attribute name="ng-bind">
                                '<xsl:value-of select="@title"/>' | translate
                            </xsl:attribute>
                        </span>            
                </div>             
            <xsl:variable name="objectname">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <xsl:value-of select="translate(translate(@name,'.$',''),'*','')"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="AccordionObj">
                <xsl:if test="@name">
                    <xsl:value-of select="@name"/>
                </xsl:if>
                <xsl:for-each select="./object">
                    <!--<xsl:value-of select="translate(translate(@name,'.$',''),'*','')"/>-->
                    <xsl:value-of select="@name"/>
                    <xsl:if test="position() != last()">
                        <xsl:text>,</xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="name">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name">
                        <xsl:value-of select="@name"/>?<xsl:for-each select="parameter">
                            <xsl:if test="@type != 'pushbutton' and @type != 'button'">
                                <xsl:value-of select="@name"/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>,</xsl:text>
                                </xsl:if>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="modifyObjects">
                <xsl:for-each select=". | object">
                    <xsl:if test="@name and @operationtype">
                        <xsl:value-of select="@name"/>
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="deleteValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='delete'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="editValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='edit'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable> 
            <xsl:variable name="viewValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='view'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="downloadValue">
                <xsl:for-each select="./parameter | object/parameter">
                    <xsl:if test="@name='download'">
                        <xsl:value-of select="@routeurl" />
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="filterData">
                <xsl:for-each select=". | object">
                    <xsl:if test="@ifparam and @ifvalue and @ifcondition">
                        <xsl:value-of select="concat(@name,'?',@ifparam,'__',@ifvalue,'__',@ifcondition)" />
                        <xsl:if test="position() != last()">
                            <xsl:text>&amp;</xsl:text>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:variable name="iconicparams">
                <xsl:for-each select=". | object">
                    <xsl:for-each select="parameter">
                        <xsl:if test="@type != 'pushbutton' and @type != 'button' and @iconicurl">
                            <xsl:value-of select="@name"/>
                            <xsl:if test="position() != last()">
                                <xsl:text>,</xsl:text>
                            </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:for-each>
            </xsl:variable>
            <div class="panel-body">
                <table class="table table-bordered theme_intel">  
                    <xsl:attribute name="name">
                        <xsl:copy-of select="$name"/>
                    </xsl:attribute> 
                    <xsl:attribute name="id">
                        <xsl:value-of select="translate(translate($objectname,'*',''),'.','')"/>
                    </xsl:attribute>
                    <xsl:attribute name="iconicparams">
                        <xsl:copy-of select="$iconicparams"/>
                    </xsl:attribute>
                    <xsl:attribute name="ModifyObjects">
                        <xsl:value-of select="$modifyObjects"/>
                    </xsl:attribute>
                    <xsl:attribute name="filterdata">
                        <xsl:copy-of select="$filterData"/>
                    </xsl:attribute>                 
                    <thead>
                        <tr>
                            <xsl:for-each select="parameter | object/parameter">
                                <xsl:if test="@type !='button'">
                                    <th>
                                        <xsl:choose>
                                            <xsl:when test="@Display">
                                                <xsl:attribute name="ng-init" >
                                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','false')" />
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-hide" >
                                                    true
                                                </xsl:attribute>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                                
                                            </xsl:when>
                                            <xsl:when test="not(@Display)">                                                
                                                <xsl:choose>
                                                    <xsl:when test="@type='dropdown1'">
                                                        <xsl:attribute name="ng-init" >
                                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat('dropdownUrlReq(&quot;',translate(translate(../@name,'*',''),'.',''),'&quot;,','&quot;',@name,'&quot;,','&quot;',@url,'&quot;,&quot;&quot;,&quot;&quot;,&quot;',@urlparam,'&quot;',')')"/>	
                                                            <xsl:if test="@multiple='true'">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                            </xsl:if>
                                                        </xsl:attribute>
                                                    </xsl:when>
                                                    <xsl:when test="@iconicurl">
                                                         <xsl:attribute name="ng-init" >
                                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat('jsonreq(&quot;',@name,'&quot;,','&quot;',@iconicurl,'&quot;',')')"/>;<xsl:value-of select="concat(@name,'displaystatus','=','false')" />;	
                                                            <xsl:if test="@multiple='true'">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                            </xsl:if>
                                                         </xsl:attribute>
                                                    </xsl:when>
                                                    <xsl:otherwise>                                                        
                                                        <xsl:attribute name="ng-init">
                                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),position(),'=','true')" />;<xsl:value-of select="concat(@name,'displaystatus','=','true')" />;
                                                            <xsl:if test="@multiple='true'">
                                                                <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'_multiple','=','true')" />;
                                                            </xsl:if>
                                                        </xsl:attribute>
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                                <xsl:attribute name="ng-bind">
                                                    '<xsl:value-of select="concat(../@name,'.',@webname)"/>' | translate
                                                </xsl:attribute>
                                            </xsl:when>
                                        </xsl:choose>                                        
                                    </th>
                                </xsl:if>                                	
                            </xsl:for-each>
                            <xsl:if test="parameter/@name='edit' or parameter/@name='delete'">
                                <th>
                                    <xsl:text>Actions</xsl:text>
                                </th>
                            </xsl:if> 
                        </tr>
                    
                    </thead>
                    <tbody ng-init="sectionIndex = $index">
                        <!--<xsl:for-each select="parameter | object/parameter">-->	
                        <xsl:attribute name="ng-repeat">
                            (userkey, user) in <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>
                        </xsl:attribute>
                        <tr class="main-row">
                            <td ng-repeat="key in user | keys" ng-if="false==$last">
                                <!--{{user[key]}}-->
                                <span>
                                    <xsl:attribute name="class">
                                        {{iconictext(user[key],key.split('__')[1])}}
                                    </xsl:attribute>
                                    <span>  
                                        <xsl:attribute name="ng-if">
                                            <xsl:text>iconicstatus(</xsl:text>key.split('__')[1]<xsl:text>)</xsl:text>
                                        </xsl:attribute>
                                        {{user[key]}}
                                    </span>
                                </span>
                            </td>
                            <xsl:if test="parameter/@name='edit' or parameter/@name='delete'">
                                <td ng-repeat="td in user" ng-if="true==$last" class="table-button-group">
                                <!--<td class="table-button-group">-->
                                    <xsl:if test="parameter/@name='edit'">
                                        <button  class="btn btn-xs table-btn">
                                            <xsl:attribute name="ng-click">
                                                <xsl:value-of select="$editValue" />
                                            </xsl:attribute>
                                            <xsl:attribute name="name">
                                                <xsl:text>edit</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="id">
                                                {{td}}
                                            </xsl:attribute>
                                            <span class="fa fa-edit btn_color_grn"> </span>
                                        </button> 
                                    </xsl:if>
                                    <xsl:if test="parameter/@name='view'">
                                        <button  class="btn btn-xs table-btn">
                                            <xsl:attribute name="data-ng-click" >
                                                <xsl:value-of select="$viewValue" />
                                            </xsl:attribute>
                                            <xsl:attribute name="id">{{td}}</xsl:attribute>
                                            <span class="fa fa-file-text-o btn_color_blue"></span>
                                        </button>
                                    </xsl:if>
                                    <xsl:if test="parameter/@name='delete'">
                                        <button  class="btn btn-xs table-btn">
                                            <xsl:attribute name="popupinfo">
                                                <xsl:value-of select="translate(translate($objectname,'*',''),'.','')" />
                                            </xsl:attribute>
                                            <xsl:choose>
                                                <xsl:when test="$deleteValue!=''">
                                                    <xsl:attribute name="ng-click">
                                                        <xsl:value-of select="$deleteValue" />
                                                    </xsl:attribute>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:attribute name="ng-click">
                                                        delete($event)
                                                    </xsl:attribute> 
                                                </xsl:otherwise>
                                            </xsl:choose>
                                            <xsl:attribute name="name">
                                                <xsl:text>delete</xsl:text>
                                            </xsl:attribute>
                                            <xsl:attribute name="id">{{td}}</xsl:attribute>
                                            <span class="fa fa-trash-o btn_color_red"></span>
                                        </button>
                                    </xsl:if>
                                    <button class="btn btn-info" ng-click="accordiontableload(userkey,$event)">
                                        <xsl:attribute name="ng-init">
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[userkey]='More'
                                        </xsl:attribute>
                                        <xsl:attribute name="source">
                                            <xsl:value-of select="@formToOpen" />
                                        </xsl:attribute>
                                        <xsl:attribute name="targetId">
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>{{userkey}}
                                        </xsl:attribute>
                                        <xsl:attribute name="tabletoggleText">
                                            <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>
                                        </xsl:attribute>
                                        <xsl:attribute name="objectname">
                                            {{user.z}}
                                        </xsl:attribute>
                                        <!--{{toggleText[$index]}}-->
                                        {{<xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'toggle')"/>[userkey]}}
                                    </button>
                                </td>
                            </xsl:if>                            
                        </tr>
                        <tr class="extra-row" ng-show="accordion.activePosition==$index" >
                            <td colspan="5">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="concat(translate(translate($objectname,'*',''),'.',''),'table')"/>{{$index}}
                                </xsl:attribute>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> 
        <div class="row">
            <div class="col-lg-12 col-md-12 text-right">
                <xsl:for-each select="parameter">
                    <xsl:if test="@type = &apos;button&apos; and @name != &apos;edit&apos; and @name != &apos;delete&apos; and @name != &apos;view&apos; and @name != &apos;download&apos;">
                        <xsl:call-template  name="button" />
                    </xsl:if>
                </xsl:for-each>
            </div>            
        </div>
    </xsl:template>
</xsl:stylesheet>

