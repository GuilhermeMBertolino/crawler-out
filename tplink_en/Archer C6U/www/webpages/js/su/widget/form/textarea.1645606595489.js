(function($){$.su.Widget("textarea",{defaults:{value:"",name:"",isdisabled:false,isvalid:false,fieldLabel:"",hint:"",tips:"",validator:null,invalidText:$.su.CHAR.INVALIDTEXT,vtype:null,vtypeText:null,allowBlank:true,blankText:$.su.CHAR.BLANKTEXT,cls:""},create:function(defaults,options){var me=this;me.each(function(i,obj){var input=$(this);if(!input.is("textarea")){return null}var id=options.id||this.id||"textarea-"+parseInt(Math.random()*1000*1000*1000,10).toString(),value=options.value||this.value||defaults.value,name=options.name||this.name||defaults.name;$.extend(this,defaults,options);$(this).attr({value:value,id:id,name:name}).val(value).addClass("textarea-text "+this.inputCls);if(this._maxLength){$(this).attr("maxlength",this._maxLength)}var inHTML='<div class="container widget-container textarea-container '+this.cls+'">';if(this.fieldLabel!==null){inHTML+='<div class="widget-fieldlabel-wrap '+this.labelCls+'">';inHTML+='<label class="widget-fieldlabel textarea-fieldlabel">'+this.fieldLabel+"</label>";if(this.fieldLabel!==""){inHTML+='<span class="widget-separator">'+this.separator+"</span>"}inHTML+="</div>"}inHTML+='<div class="widget-wrap-outer textarea-wrap-outer">';inHTML+='<div class="widget-wrap textarea-wrap">';if(this.hint){inHTML+='<span class="hint text-hint">'+this.hint+"</span>"}inHTML+='<span class="text-wrap"></span>';inHTML+="</div>";if(this.tips!=null&&this.tips!=undefined){inHTML+='<div class="widget-tips textbox-tips '+this.tipsCls+'">';inHTML+='<div class="content tips-content"></div>';inHTML+="</div>"}inHTML+='<div class="widget-error-tips textbox-error-tips '+this.errorTipsCls+'">';inHTML+='<span class="widget-error-tips-delta"></span>';inHTML+='<div class="widget-error-tips-wrap">';inHTML+='<div class="content error-tips-content"></div>';inHTML+="</div>";inHTML+="</div>";inHTML+="</div>";inHTML+="</div>";var container=$(inHTML);input.replaceWith(container);container.find("div.textarea-wrap span.text-wrap").append(input.detach());if(obj.readOnly){container.addClass("read-only");input.attr("readOnly",true)}if(this.vtype){var vtype=this.vtype;if($.type(vtype)==="string"){this.vtype=new $.su.vtype(vtype);if(this.vtypeText){this.vtype.vtypeText=this.vtypeText}}}});var container=$(me.parents("div.widget-container").get(0));container.delegate("textarea.textarea-text","focus",function(e){container.find("span.text-hint").fadeOut(50);$(this).textarea("setFocus")}).delegate("textarea.textarea-text","keyup blur",function(e){var t=$(this);if(!t.val()&&e.type=="focusout"){container.find("span.text-hint").fadeIn(50)}if(document.all){var m=t.attr("maxlength");if(m){var v=t.val();v=v.substring(0,m);t.val(v)}}t.textarea("validate")}).delegate("textarea.textarea-text","ev_validatechange",function(e,isValid,tips){e.stopPropagation();if(isValid){$(this).textarea("setNormal")}else{$(this).textarea("setError",tips)}}).delegate("span.text-hint","focus click",function(e){e.preventDefault();if(container.find("span.text-text").attr("readonly")!=="readonly"){$(this).fadeOut(50,function(e){me.focus()})}});me.textarea("setTips",options.tips);return me},validate:function(me,flag){var me=me||this,tar=me.get(0),result=false,value=$.trim(me.val()),flag=(flag[1]===false)?false:true;var returnResult=function(me,resultText,val){if(resultText===true){if(flag){$(tar).trigger("ev_validatechange",[true,tar.tips])}return true}else{if(!resultText){resultText=tar.tips}if(flag){$(tar).trigger("ev_validatechange",[false,resultText])}return false}me.isValid=result;return result};if(tar){if(value===""){if(tar.allowBlank!==true){result=false;return returnResult(tar,tar.blankText)}else{result=true;return returnResult(tar,true)}}else{var vtype=tar.vtype;if(vtype&&vtype.isVtype===true){result=vtype.validate(value);if(result!==true){if(result.result===false){return returnResult(tar,vtype.vtypeText)}else{return returnResult(tar,result)}}}if(tar.validator){result=tar.validator(tar.value);if($.type(result)!=="boolean"){return returnResult(tar,result)}if(result!==true){return returnResult(tar,tar.invalidText)}}}return returnResult(tar,true)}return result},setValue:function(me,params){var me=me||this,value=params[1]||"";me.val(value)}})})(jQuery);