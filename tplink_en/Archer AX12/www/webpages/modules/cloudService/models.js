$.su.modelManager.define("modifyEmailModel",{type:"model",fields:[{name:"email",vtype:"cloud_email",allowBlank:!1},{name:"password",vtype:"string_no_spaces&&cloud_pwd",allowBlank:!1}]}),$.su.modelManager.define("modifyPasswordModel",{type:"model",fields:[{name:"oldPassword",vtype:"string_no_spaces&&cloud_pwd",allowBlank:!1},{name:"newPassword",vtype:$.su.IS_RG_SEC?"string_no_spaces&&cloud_pwd&&symbols_combined_pws&&noConsecutive":"string_no_spaces&&cloud_pwd",minLength:$.su.IS_RG_SEC?10:6,maxLength:32,allowBlank:!1},{name:"confirmPassword",allowBlank:!1}]}),$.su.modelManager.define("bindAccountModel",{type:"model",fields:[{name:"email",vtype:"cloud_email",allowBlank:!1}]}),$.su.define("tokenProxyLogin",{extend:"IPFProxy",url:$.su.url("/login?form=get_eweb_url")});