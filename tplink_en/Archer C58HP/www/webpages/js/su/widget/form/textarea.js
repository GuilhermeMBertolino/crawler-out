(function(a){a.su.Widget("textarea",{defaults:{value:"",name:"",isdisabled:false,isvalid:false,fieldLabel:"",tips:"",validator:null,invalidText:a.su.CHAR.INVALIDTEXT,vtype:null,vtypeText:null,allowBlank:true,blankText:a.su.CHAR.BLANKTEXT,cls:""},create:function(e,c){var d=this;d.each(function(m,l){var n=a(this);if(!n.is("textarea")){return null}var j=c.id||this.id||"textarea-"+parseInt(Math.random()*1000*1000*1000,10).toString(),o=c.value||this.value||e.value,g=c.name||this.name||e.name;a.extend(this,e,c);a(this).attr({value:o,id:j,name:g}).val(o).addClass("textarea-text "+this.inputCls);if(this._maxLength){a(this).attr("maxlength",this._maxLength)}var f='<div class="container widget-container textarea-container '+this.cls+'">';if(this.fieldLabel!==null){f+='<div class="widget-fieldlabel-wrap '+this.labelCls+'">';f+='<label class="widget-fieldlabel textarea-fieldlabel">'+this.fieldLabel+"</label>";if(this.fieldLabel!==""){f+='<span class="widget-separator">'+this.separator+"</span>"}f+="</div>"}f+='<div class="widget-wrap-outer textarea-wrap-outer">';f+='<div class="widget-wrap textarea-wrap">';f+='<span class="text-wrap"></span>';f+="</div>";if(this.tips!=null&&this.tips!=undefined){f+='<div class="widget-tips textbox-tips '+this.tipsCls+'">';f+='<div class="content tips-content"></div>';f+="</div>"}f+='<div class="widget-error-tips textbox-error-tips '+this.errorTipsCls+'">';f+='<span class="widget-error-tips-delta"></span>';f+='<div class="widget-error-tips-wrap">';f+='<div class="content error-tips-content"></div>';f+="</div>";f+="</div>";f+="</div>";f+="</div>";var h=a(f);n.replaceWith(h);h.find("div.textarea-wrap span.text-wrap").append(n.detach());if(l.readOnly){h.addClass("read-only");n.attr("readOnly",true)}if(this.vtype){var k=this.vtype;if(a.type(k)==="string"){this.vtype=new a.su.vtype(k);if(this.vtypeText){this.vtype.vtypeText=this.vtypeText}}}});var b=a(d.parents("div.widget-container").get(0));b.delegate("textarea.textarea-text","focus",function(f){a(this).textarea("setFocus")}).delegate("textarea.textarea-text","keyup blur",function(i){var h=a(this);if(document.all){var f=h.attr("maxlength");if(f){var g=h.val();g=g.substring(0,f);h.val(g)}}h.textarea("validate")}).delegate("textarea.textarea-text","ev_validatechange",function(h,g,f){h.stopPropagation();if(g){a(this).textarea("setNormal")}else{a(this).textarea("setError",f)}});return d},validate:function(e,d){var e=e||this,c=e.get(0),b=false,f=a.trim(e.val()),d=(d[1]===false)?false:true;var h=function(j,i,k){if(i===true){if(d){a(c).trigger("ev_validatechange",[true,c.tips])}return true}else{if(!i){i=c.tips}if(d){a(c).trigger("ev_validatechange",[false,i])}return false}j.isValid=b;return b};if(c){if(f===""){if(c.allowBlank!==true){b=false;return h(c,c.blankText)}else{b=true;return h(c,true)}}else{var g=c.vtype;if(g&&g.isVtype===true){b=g.validate(f);if(b!==true){if(b.result===false){return h(c,g.vtypeText)}else{return h(c,b)}}}if(c.validator){b=c.validator(c.value);if(a.type(b)!=="boolean"){return h(c,b)}if(b!==true){return h(c,c.invalidText)}}}return h(c,true)}return b},setValue:function(b,d){var b=b||this,c=d[1]||"";b.val(c)}})})(jQuery);