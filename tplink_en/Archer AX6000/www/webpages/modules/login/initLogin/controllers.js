!function(a){a.su.moduleManager.define("initLogin",{services:["ajax"],stores:[],views:["initLoginView"],deps:["main"],models:["initLoginModel","initLoginControl"],listeners:{"ev_on_launch":function(n,o,e,i,t,r,a){a.ajax.request({proxy:"keyProxy",success:function(n){n&&n.password&&(o.encryptKey=n.password)}})}},init:function(o,n,e,i,t,r){this.control({"#init-login-confirm":{"keyup":function(n){n.preventDefault(),13==n.keyCode&&(a(n.target).blur(),o.doInitLogin())}},"#init-login-button":{"ev_button_click":function(){o.doInitLogin()}}})}},function(e,n,i,o,t,r){return{encryptKey:null,doInitLogin:function(){if(i.initLoginControl.validate()){var o=i.initLoginControl.password.getValue();if(i.initLoginControl.password.getValue()!=i.initLoginControl.confirm.getValue())return i.initLoginControl.confirm.setError(a.su.CHAR.ERROR["00000080"]),!1;var n=i.initLoginControl.password.doEncrypt(e.encryptKey);i.initLoginModel.password.setValue(n),r.ajax.request({proxy:"authProxy",success:function(n){a.su.encryptor.setRSAKey(n.key[0],n.key[1]),a.su.encryptor.setSeq(n.seq),a.su.encryptor.genAESKey(),a.su.encryptor.setHash("admin",o),a.encrypt.encryptManager.recordEncryptor(),i.initLoginModel.login({success:e.loginSuccessDealer,fail:e.loginFailDealer})}})}},loginSuccessDealer:function(n,o){var e,i=n.stok||(n="12345",e=top.location.href,i=e.indexOf("stok="),n=0<=i?e.substring(i+5):n);localStorage&&(t.main.setToken(i),t.main.reload())},loginFailDealer:function(n,o){var e=!(n.data&&n.data.failureCount&&5<=n.data.failureCount);n.data&&n.data.hasOwnProperty("errorcode")&&e&&(e=String(n.data.errorcode).replace(/^-/,"E"),i.localLoginControl.password.setErrorHtml(a.su.CHAR.ERROR[e]))}}})}(jQuery);