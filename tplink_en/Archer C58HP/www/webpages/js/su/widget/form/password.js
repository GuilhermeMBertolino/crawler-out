(function(a){a.su.Widget("password",{defaults:{fieldLabel:"",tips:"",hint:null,validateIcon:false,showLevel:true,allowBlank:true,encrypt:a.su.encrypt,encryptParam:["n","e"],_minLength:2,_maxLength:16,vtype:"password",invalidText:a.su.CHAR.VTYPETEXT.INVALIDTEXT,blankText:a.su.CHAR.VTYPETEXT.BLANKTEXT,allowVisible:false},create:function(g,d){var e=this;e.each(function(l,n){var j=a(n);a.extend(n,g,d);var m='<div class="container widget-container text-container password-container '+n.cls+" "+(n.showLevel?"level":"")+'">';if(n.fieldLabel!==null){m+='<div class="widget-fieldlabel-wrap '+n.labelCls+'">';m+='<label class="widget-fieldlabel text-fieldlabel password-fieldlabel">'+n.fieldLabel+"</label>";if(n.fieldLabel!==""){m+='<span class="widget-separator">'+n.separator+"</span>"}m+="</div>"}m+='<div class="widget-wrap-outer text-wrap-outer password-wrap-outer">';m+='<div class="widget-wrap text-wrap password-wrap '+(n.allowVisible?"allow-visible":"")+'">';m+='<span class="text-wrap-before"></span>';m+='<span class="text-wrap password-wrap ">';m+='<input type="password" class="text-text password-text password-hidden '+n.inputCls+'" maxlength="'+n._maxLength+'"/>';if(n.allowVisible){n.passwordVisible=false;m+='<input type="text" class="text-text password-text password-visible hidden '+n.inputCls+'" maxlength="'+n._maxLength+'"/>';m+='<span class="icon allow-visible-btn"></span>'}m+="</span>";if(n.hint){m+='<span class="hint text-hint password-hint">';m+='<input class="text-hint password-hint '+n.inputCls+'" value="'+n.hint+'" contenteditable="false" readonly="readonly"/>';m+="</span>"}if(n.showLevel){m+='<div class="password-level '+n.inputCls+'">';m+='<span class="level low">'+a.su.CHAR.OPERATION.LOW+"</span>";m+='<span class="level middle">'+a.su.CHAR.OPERATION.MIDDLE+"</span>";m+='<span class="level high">'+a.su.CHAR.OPERATION.HIGH+"</span>";m+="</div>"}m+='<span class="text-wrap-after"></span>';m+="</div>";if(this.validateIcon){m+='<span class="widget-validate-icon"></span>'}if(this.tips!=null&&this.tips!=undefined){m+='<div class="widget-tips textbox-tips '+n.tipsCls+'">';m+='<div class="content tips-content"></div>';m+="</div>"}m+='<div class="widget-error-tips textbox-error-tips '+n.errorTipsCls+'">';m+='<span class="widget-error-tips-delta"></span>';m+='<div class="widget-error-tips-wrap">';m+='<div class="content error-tips-content"></div>';m+="</div>";m+="</div>";m+="</div>";m+="</div>";var k=a(m);j.replaceWith(k);k.find("span.password-wrap").append(j.addClass("hidden"));if(this.vtype){var o=this.vtype;if(this.vtypeText){this.vtype.vtypeText=this.vtypeText}this.vtype=new a.su.vtype(o)}});var c=e.closest("div.password-container"),i=c.find("input.password-hidden"),f=c.find("input.password-visible"),b=c.find("input.password-hint"),h=c.find("input.password-level");c.delegate("input.password-text","click",function(j){j.stopPropagation()}).delegate("span.allow-visible-btn","click",function(l){var k=e.get(0);var j=a(this);var m="";if(k.passwordVisible){m=f.val();i.val(m);f.css("display","none");i.css("display","inline-block");j.removeClass("visible");k.passwordVisible=false}else{m=i.val();f.val(m);i.css("display","none");f.css("display","inline-block");j.addClass("visible");k.passwordVisible=true}});e.on("ev_validatechange",function(l,k,j){l.stopPropagation();if(k){a(this).textbox("setValid")}else{a(this).textbox("setError",j)}});b.on("click focus",function(k){k.preventDefault();var j=e.get(0);a(this).fadeOut(50,function(){if(j.passwordVisible){f.focus()}else{i.focus()}});return false});c.delegate("input.password-text","click focus",function(j){j.preventDefault();b.fadeOut(50);e.password("setFocus")});c.delegate("input.password-text","blur",function(j){if(e.password("validate")){e.password("doEncrypt")}});c.delegate("input.password-text","keyup",function(k){var j=a(this).val();e.password("levelCheck");e.trigger("ev_change",[j,k.key,k.keyCode])});setTimeout(function(){if(i.val()!=""){b.css("display","none")}},100);e.password("setTips",d.tips);return e},levelCheck:function(s){var s=s||this,i=s.get(0),j=s.closest("div.password-container"),t=j.find("input.password-visible"),q=j.find("input.password-hidden"),k="";if(i.passwordVisible){k=t.val()}else{k=q.val()}var f=0;var h=0;var c=0;var n=0;var o=0;var b=0;var m=k.length;var p=/[a-z]/g;var l=/[A-Z]/g;var d=/[0-9]/g;var g=/[\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\x20]/g;if(l.test(k)){f=1}else{f=0}if(p.test(k)){h=1}else{h=0}if(d.test(k)){c=1}else{c=0}if(g.test(k)){n=1}else{n=0}if(m>=10){o=1}else{o=0}b=f+h+c+o+n;var e=0;if(m<=5){if(b<=2){e=1}else{if(b==3||b==4){e=2}}}else{if(b<=1){e=1}else{if(b==2||b==3){e=2}else{if(b>=4){e=3}}}}var r=j.find("div.password-level");r.removeClass("level-0 level-1 level-2 level-3");r.fadeIn(100).addClass("level-"+e);return s},validate:function(h,g){var h=h||this,f=h.get(0),b=h.closest("div.password-container"),d=b.find("input.password-visible"),i=b.find("input.password-hidden"),j="",k=true,g=(g[1]===false)?false:true;if(f.passwordVisible){j=d.val()}else{j=i.val()}var c=function(l,m){if(m===true){if(g){a(l).trigger("ev_validatechange",[true,l.tips])}return true}else{if(!m){m=l.tips}if(g){a(l).trigger("ev_validatechange",[false,m])}return false}};if(j===""){if(f.allowBlank!==true){k=false;return c(f,f.blankText)}else{k=true;return c(f,true)}}else{var e=f.vtype;if(e&&e.isVtype===true){k=e.validate(j);if(k!==true){if(k===false){return c(f,e.vtypeText)}else{return c(f,k)}}}if(f.validator){k=f.validator(j);if(a.type(k)!=="boolean"||k==false){k=false;return c(f,f.invalidText)}}return c(f,true)}},setValue:function(h,k){var h=h||this,d=h.get(0),c=d.encryptParam,j=k[1];if(a.type(d.encrypt)=="function"&&a.isArray(j)){var e=0;for(var f=0,g=c.length;f<g;f++){var b=c[f];d[b]=j[f]}}else{h.val(j);h.siblings("input").val(j)}return h},getValue:function(d){var d=d||this,b=d.closest("div.password-container"),c=b.find("input.password-text");return c.val()},doEncrypt:function(l){var h=l.get(0),k=h.encrypt,g=h.encryptParam;var c=l.closest("div.password-container"),e=c.find("input.password-hidden"),n=c.find("input.password-visible"),m=c.find("input.password-hint");var o=h.passwordVisible?n.val():e.val();l.password("removeFocus");if(!o){m.css("display","inline")}var d=true;var f=[];for(var j=0,i=g.length;j<i;j++){var b=g[j];if(h[b]==null||h[b]==undefined){d=false;break}else{f[j]=h[b]}}if(a.type(k)=="function"&&d){o=k(o,f)}l.val(o);return l},disable:function(d){var d=d||this,b=d.textbox("getContainer"),c=b.find("input.password-text");b.addClass("disabled");c.prop("disabled",true);return d},enable:function(d){var d=d||this,b=d.textbox("getContainer"),c=b.find("input.password-text");b.removeClass("disabled");c.prop("disabled",false);return d}})})(jQuery);