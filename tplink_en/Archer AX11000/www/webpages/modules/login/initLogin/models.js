$.su.define("initProxy",{extend:"IPFProxy",url:$.su.url("/login?form=initial_login"),api:{login:{writeFilter:function(i){return i.operation="login",i.confirm=!0,i},isLogin:!0}}}),$.su.modelManager.define("initLoginModel",{type:"model",fields:[{name:"password"},{name:"confirm"}],proxy:"initProxy",methods:{login:function(i){var n=this.getData("submit");i.data=n,this.getProxy().login(i)}}}),$.su.modelManager.define("initLoginControl",{type:"model",fields:[{name:"password",vtype:$.su.IS_RG_SEC?{vtype:"ascii_visible&&string_no_spaces&&symbols_combined_pws&&noConsecutive"}:{vtype:"ascii_visible&&string_no_spaces&&symbols_combined_pws"},maxLength:32,minLength:$.su.IS_RG_SEC?10:6,allowBlank:!1},{name:"confirm",allowBlank:!1}]});