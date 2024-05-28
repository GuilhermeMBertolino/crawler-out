<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template name="string">
        <div class="form-group">
            <label for="{@name}" class="col-sm-4 col-lg-4 col-md-4 control-label">
                <xsl:value-of select="@webname"/>
            </label>
            <div class="col-sm-8 col-md-8 col-lg-8">
                <input ng-model='props.{@name}'  type="string" class="form-control" id="{@name}" />
            </div>                       
        </div>
    </xsl:template>
    <xsl:template name="button">
        
        <div class="col-lg-3 col-lg-offset-3">
            <div class="form-group">
                <input type="button" source="{../@name}" class="btn btn-info form-contol" id="{@name}" value="{@name}" >
                    <xsl:if test="@routeurl" >
                        <xsl:attribute name="ng-click" >
                            <xsl:value-of select="@routeurl" />
                        </xsl:attribute>
                    </xsl:if>
                </input>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="dropdown">
        <div class="form-group">
            <label for="{@name}" class="col-sm-4 col-md-4 col-lg-4 control-label">
                <xsl:value-of select="@webname"/>
            </label>
            <div class="col-sm-8 col-md-8 col-lg-8">
                <select class="dropdown-toggle form-control">
                    <xsl:call-template name="tokenizeString">
                        <xsl:with-param name="list" select="./@Value"/>
                        <xsl:with-param name="delimiter" select="','"/>
                    </xsl:call-template>
                </select>
            </div>                       
        </div>
    </xsl:template>
    <xsl:template name="checkbox">
        <div class="form-group">
            <label for="{@name}" class="col-sm-4 col-md-4 col-lg-4 control-label">
                <xsl:value-of select="@webname"/>
            </label>
            <div class="col-sm-2 col-md-2 col-lg-2">
                <input type="checkbox" class="form-control" id="{@name}" />
            </div>                        
        </div>
    </xsl:template>
    /////Split function  to get dropdown values from xml key value//////////
    <xsl:template name="tokenizeString">
        <!--passed template parameter -->
        <xsl:param name="list"/>
        <xsl:param name="delimiter"/>
        <xsl:choose>
            <xsl:when test="contains($list, $delimiter)">                
                <option class="form-control">
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
                        <option class="form-control">
                            <xsl:value-of select="$list"/>
                        </option>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
