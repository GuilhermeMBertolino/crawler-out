!function($){var _telP=telephonyProvider,_country="",_ispIndex=0,_sipInfo={},_options={},_defaultOptions={numbers:{label:$.tpLang.s_str.dscnumber,prefix:!1,sizes:[30],inputNum:1,placeholders:[""],required:!0,defaultValue:[""]},address:{label:$.tpLang.s_str.registrar,sizes:[42],required:!0},authID:{label:$.tpLang.s_str.auid,sizes:[64],prefix:!1,required:!0,defaultValue:[""]},password:{label:$.tpLang.s_str.dscpassword,sizes:[64],required:!1,defaultValue:[""]},areaCode:{label:$.tpLang.s_str.areacode1,sizes:[8],required:!1,defaultValue:[""],display:function(){var areaCodeObj=$.act(ACT_GET,XTP_IGD_AREA_CODE_CFG,null,null,["areaCode"]);return 0!=$.exe()||!areaCodeObj.areaCode}}},_id="_ispEditAttrs",_idMap={numbers:["_isp_number_0","_isp_number_1"],address:"_isp_address_0",address_select:"_isp_address_1_select",authID:"_isp_authID_0",password:"_isp_password_0",areaCode:"_isp_areaCode_0"},_attrsOptions={},attrs={numbers:function(options){var show=!0,numbersArea=$("._isp_number");!1===options?(show=!1,numbersArea.hide(),options={}):numbersArea.show();var op=$.extend({},_defaultOptions.numbers,options);if(_attrsOptions.numbers=op,0===numbersArea.length){$("#"+_id).append('<div class="_isp_number"><b></b><span class="_isp_prefix"></span> <input type="text" id="_isp_number_0" /><span class="_two_input">-</span><input type="text" class="_two_input" id="_isp_number_1" /><span class="red"></span></div>'),numbersArea=$("._isp_number"),!show&&numbersArea.hide()}2==op.inputNum?$("._two_input").show():$("._two_input").hide(),setInputAttrs({ids:["#_isp_number_0","#_isp_number_1"],attrs:{placeholder:op.placeholders,maxlength:op.sizes,value:op.defaultValue},other:{areaID:numbersArea,label:op.label,prefix:op.prefix,required:op.required}})},address:function(sipInfo){var options=!!sipInfo.configs.address&&sipInfo.configs.address,show=!0,addressArea=$("._isp_address");!1===options?(show=!1,addressArea.hide(),options={}):addressArea.show();var op=$.extend({},_defaultOptions.address,options);if(_attrsOptions.address=op,0===addressArea.length){$("#"+_id).append('<div class="_isp_address" id="_isp_address_input"><b></b> <input type="text" id="_isp_address_0" /><span class="red"></span></div><div class="_isp_address nd" id="_isp_address_select"><b></b> <select id="_isp_address_1_select"></select></div>'),addressArea=$("._isp_address"),!show&&addressArea.hide()}if(setInputAttrs({ids:["#_isp_address_0"],attrs:{value:[sipInfo.reg],maxlength:op.sizes},other:{areaID:addressArea,label:op.label,required:op.required}}),show&&"string"==typeof sipInfo.reg)$("#_isp_address_input").show(),$("#_isp_address_select").hide(),$("#_isp_address_0").val(sipInfo.reg);else if(show&&$.isArray(sipInfo.reg)){for(var option="",i=0,len=sipInfo.reg.length;i<len;i++)option+='<option value="'+sipInfo.reg[i]+'">'+sipInfo.reg[i]+"</option>";$("#_isp_address_input").hide(),$("#_isp_address_select").show(),$("#_isp_address_1_select").html(option).tpSelect({refresh:1})}},authID:function(options){var show=!0,authIDArea=$("._isp_authID");!1===options?(show=!1,authIDArea.hide(),options={}):authIDArea.show();var op=$.extend({},_defaultOptions.authID,options);if(_attrsOptions.authID=op,0===authIDArea.length){$("#"+_id).append('<div class="_isp_authID"><b></b><span class="_isp_prefix"></span> <input type="text" id="_isp_authID_0" /><span class="red"></span></div>'),authIDArea=$("._isp_authID"),!show&&authIDArea.hide()}setInputAttrs({ids:["#_isp_authID_0"],attrs:{maxlength:op.sizes,value:op.defaultValue},other:{areaID:authIDArea,label:op.label,prefix:op.prefix,required:op.required}})},password:function(options){var show=!0,passwordArea=$("._isp_password");!1===options?(show=!1,passwordArea.hide(),options={}):passwordArea.show();var op=$.extend({},_defaultOptions.password,options);if(_attrsOptions.password=op,0===passwordArea.length){$("#"+_id).append('<div class="_isp_password"><b></b> <input type="password" id="_isp_password_0" /><span class="red"></span></div>'),passwordArea=$("._isp_password"),!show&&passwordArea.hide()}setInputAttrs({ids:["#_isp_password_0"],attrs:{maxlength:op.sizes,value:op.defaultValue},other:{areaID:passwordArea,label:op.label,required:op.required}})},areaCode:function(options){var show=!0,areaCode=$("._isp_areaCode"),op=$.extend({},_defaultOptions.areaCode,options);if(!1===options?(show=!1,areaCode.hide(),options={}):op.display?$.isFunction(op.display)?op.display()?areaCode.show():(show=!1,areaCode.hide()):op.display?areaCode.show():(show=!1,areaCode.hide()):areaCode.show(),_attrsOptions.areaCode=op,0===areaCode.length){var dom='<div class="_isp_areaCode"><div><b></b> <input type="text" id="_isp_areaCode_0" /><span class="red"></span></div><div>'+$.tpLang.c_str.voipAreaCode+"</div></div>";$("#"+_id).append(dom),areaCode=$("._isp_areaCode"),!show&&areaCode.hide()}setInputAttrs({ids:["#_isp_areaCode_0"],attrs:{maxlength:op.sizes,value:op.defaultValue},other:{areaID:areaCode,label:op.label,required:op.required}})},advanced:function(sipInfo){var options=!!sipInfo.configs.advanced&&sipInfo.configs.advanced;!1===(_attrsOptions.advanced=options)?$("#"+_options.domID).addClass("nd"):$("#"+_options.domID).removeClass("nd");var sels=["proxy","outproxy"];$.isArray(sipInfo.proxy)||$.isArray(sipInfo.outproxy)?setSelectVisible(!0):setSelectVisible(!1);for(var i=0,len=sels.length;i<len;i++){var a=sels[i],id=_options.advIDs[a];if($.isArray(sipInfo[a])){for(var str="",j=0,len2=sipInfo[a].length;j<len2;j++)str+="<option value="+sipInfo[a][j]+">"+sipInfo[a][j]+"</option>";$("#"+id).parent().hide(),$("#"+id+"_select").html(str).tpSelect({refresh:1}),$("#"+id+"_select").parent().show()}else $("#"+id).parent().show(),$("#"+id+"_select").parent().hide()}function setSelectVisible(flag){var a;if(flag){for(a in _options.advIDs)_options.advIDs.hasOwnProperty(a)&&$("#"+_options.advIDs[a]).parent().addClass("nd");$("#"+_options.via).parent().addClass("nd"),$("#"+_options.domID).removeClass("nd")}else{for(a in _options.advIDs)_options.advIDs.hasOwnProperty(a)&&$("#"+_options.advIDs[a]).parent().removeClass("nd");$("#"+_options.via).parent().removeClass("nd"),!1===options&&$("#"+_options.domID).addClass("nd")}}}},setInputAttrs=function(ats){var i,len,id;for(i=0,len=ats.ids.length;i<len;i++)for(var a in id=$(ats.ids[i]),ats.attrs)ats.attrs.hasOwnProperty(a)&&void 0!==ats.attrs[a][i]&&$(id).prop(a,ats.attrs[a][i]);var area=ats.other.areaID;for(id in ats.other.label&&area.find("label, b").text(ats.other.label),void 0!==ats.other.required&&(ats.other.required?area.find("span.red").text("*"):area.find("span.red").text("")),void 0!==ats.other.prefix&&(ats.other.prefix?area.find("span._isp_prefix").text(ats.other.prefix):area.find("span._isp_prefix").text("")),_options.advIDs)_options.advIDs.hasOwnProperty(id)&&$("#"+_options.advIDs[id]).val(_sipInfo[id])},getId=function(key){return void 0===key?_idMap:"address"===key&&$.isArray(_sipInfo.reg)?_idMap.address_select:_idMap[key]},setFocus=function(ctrl,index){var node;(node=void 0===index?$.isArray(ctrl)?$("#"+ctrl[0]):$("#"+ctrl):$("#"+ctrl[index])).focus(),node.select&&node.select()},checkValue=function(key,val,index,addon){if(addon&&addon.trimBlank&&(val=val.replace(/(^\s*)|(\s*$)/g,"")),""==val)return!_attrsOptions[key].required||(setFocus(getId(key),index),!1);if(!addon)return!0;if(addon.charRange&&$.asc(val,!0))return $.alert(ERR_VOIP_CHAR_ERROR),setFocus(getId(key),index),!1;if(addon.middleBlank&&1==/\s/.test(val))return $.alert(ERR_VOIP_VALUE_FORMAT_ERROR),setFocus(getId(key),index),!1;if(addon.special&&/["'\\;:<@]/.test(val))return $.alert(ERR_VOIP_CONTAIN_ILLEGAL_CHAR),setFocus(getId(key),index),!1;if(addon.lengthRange&&(val.length<addon.lengthRange[0]||val.length>addon.lengthRange[1])){var paraName=function(key){var label=_attrsOptions[key].label;return":"===label[label.length-1]&&(label=label.slice(0,label.length-1)),label}(key);return 0!=addon.lengthRange[0]&&0==val.length?($.alert(ERR_VOIP_NOT_EMPTY,"("+paraName+")"),setFocus(getId(key),index)):(addon.lengthRange[0]==addon.lengthRange[1]?$.alert(ERR_VOIP_VALUE_LEN_ERROR,"("+paraName+" "+s_str.len+":"+addon.lengthRange[0]+")"):$.alert(ERR_VOIP_NUMBER_OUT_RANGE,"("+paraName+" "+$.tpLang.s_str.len+" "+s_str.range+":"+addon.lengthRange[0]+" - "+addon.lengthRange[1]+")"),setFocus(getId(key),index)),!1}return val},getValues=function(options){var a,attrs={},configs=_sipInfo.configs;if(options)for(a in options)options.hasOwnProperty(a)&&!1!==options[a]&&(attrs[a]=getByID(a));else for(a in configs)configs.hasOwnProperty(a)&&(attrs[a]=getByID(a));function getByID(a){var attr,id=getId(a);if($.isArray(id)){attr=[];for(var i=0,len=id.length;i<len;i++){var x=id[i];attr.push($("#"+x).val())}}else attr=/_select/.test(id)?$("#"+id).data("value"):$("#"+id).val();return attr}return function(){for(var id in attrs.advanced=[],_options.advIDs)_options.advIDs.hasOwnProperty(id)&&attrs.advanced.push(getAdvancedValue(id));function getAdvancedValue(id){return $.isArray(_sipInfo[id])?$("#"+_options.advIDs[id]+"_select").data("value"):$("#"+_options.advIDs[id]).val()}attrs.advanced.unshift(getByID("address")),attrs.advanced.push($("#"+_options.via).prop("data-checked")?2:0)}(),attrs},setValues=function(attrs,selector){var index=function(name){var isps=_telP[_country]&&_telP[_country].isps;if(isps)for(var i=0,len=isps.length;i<len;i++)if(isps[i].name==name)return i;return 500}(attrs.multiIspName),isp=500===index?_telP.location500.isps[0]:_telP[_country].isps[index],c=isp.configs;if($(selector).find("option[value="+index+"]").prop("selected","selected"),$(selector).tpSelect({refresh:1}),c.numbers&&2===c.numbers.inputNum?($("#"+getId("numbers")[0]).val(attrs.multiVoipPrefixNum),$("#"+getId("numbers")[1]).val(attrs.multiVoipNum)):$("#"+getId("numbers")[0]).val(attrs.multiVoipNum),c.authID?$("#"+getId("authID")).val(c.authID.prefix?attrs.multiAuthUserName.replace(c.authID.prefix,""):attrs.multiAuthUserName):$("#"+getId("authID")).val(attrs.multiAuthUserName),$("#"+getId("password")).val(attrs.multiAuthPassword),$.isArray(isp.reg)){var id=getId("address");$("#"+id).find('option[value="'+attrs.multiRegistrarServer+'"]').prop("selected","selected"),$("#"+id).tpSelect({refresh:1})}else $("#"+getId("address")).val(attrs.multiRegistrarServer);$.isArray(isp.proxy)?($("#"+_options.advIDs.proxy+"_select").find('option[value="'+attrs.multiProxyServer+'"]').prop("selected","selected"),$("#"+_options.advIDs.proxy+"_select").tpSelect({refresh:1})):$("#"+_options.advIDs.proxy).val(attrs.multiProxyServer),$.isArray(isp.outproxy)?($("#"+_options.advIDs.outproxy+"_select").find('option[value="'+attrs.multiOutboundProxy+'"]').prop("selected","selected"),$("#"+_options.advIDs.outproxy+"_select").tpSelect({refresh:1})):$("#"+_options.advIDs.outproxy).val(attrs.multiOutboundProxy),$("#"+_options.advIDs.regPort).val(attrs.multiRegistrarServerPort),$("#"+_options.advIDs.proxyPort).val(attrs.multiProxyServerPort),$("#"+_options.advIDs.outproxyPort).val(attrs.multiOutboundProxyPort),$("#"+_options.via).prop("checked",2==attrs.multiRegisterViaOB).tpCheckbox()},ISP=function(options,selector){var ispLocal,that=this;this.selector=selector,ispLocal=$.act(ACT_GET,LOCAL,null,null,["Country"]),!$.exe()&&(_country=ispLocal.country),$(selector).click(function(){_ispIndex=$(this).data("value"),that.init(options)}),function(){var opt="";if(_telP[_country])for(var i=0,len=_telP[_country].isps.length;i<len;i++){var isp=_telP[_country].isps[i];null!=isp.name&&(opt+="<option value='"+i+"' data-text='"+isp.name+"' >"+isp.name+"</option>")}opt+="<option value='500' data-text='"+_telP.location500.isps[0].name+"' >"+_telP.location500.isps[0].name+"</option>",$(selector).empty().append(opt),$(selector).tpSelect({refresh:1})}()};ISP.prototype={init:function(options){var configs;for(var id in _options=$.extend({domID:"_isp_advanced",advIDs:{regPort:"regPort",proxy:"SipProxyAddr",proxyPort:"SipProxyPort",outproxy:"ObProxyAddr",outproxyPort:"ObProxyPort"},via:"RegViaOB"},options),_sipInfo="500"===_ispIndex?telephonyProvider.location500.isps[0]:telephonyProvider[_country].isps[_ispIndex],_options.advIDs)_options.advIDs.hasOwnProperty(id)&&$("#"+_options.advIDs[id]).val(_sipInfo[id]);if($("#"+_options.via).prop("checked",_sipInfo.via).tpCheckbox(),configs=_sipInfo.configs,1!==INCLUDE_AREACODE&&delete configs.areaCode,$("#"+_id).length||$(this.selector).parent().after('<div id="'+_id+'"></div>'),configs)for(var a in function(){var i,len,a,id,map=getId();for(a in map)if(map.hasOwnProperty(a))if(id=getId(a),$.isArray(id))for(i=0,len=id.length;i<len;i++)$("#"+id[i]).val("");else $("#"+id).val("")}(),attrs)attrs.hasOwnProperty(a)&&("address"===a||"advanced"===a?attrs[a](_sipInfo):attrs[a](!!configs[a]&&configs[a]));$.tpInit(function(){},$("._isp_password"))},validate:function(){var values,configs,flag=!0,defaultConfig={numbers:[{trimBlank:!0,charRange:!0,middleBlank:!0,special:!0,lengthRange:[3,32]},{trimBlank:!0,charRange:!0,middleBlank:!0,special:!0,lengthRange:[3,22]}],address:{trimBlank:!0},authID:{trimBlank:!0,lengthRange:[0,64]},password:function(val){if(""==val&&_sipInfo.configs.password.required||64<val.length)return!1},areaCode:function(val){return 1!=/\D/.test(val)||($.alert(ERR_VOIP_VALUE_INVALID,""),!1)},advanced:function(){return!0}};if(!1===_sipInfo.validate)return!0;for(var a in configs=function(defaultConfig,customConfig){var configs={};for(var a in _sipInfo.configs)_sipInfo.configs.hasOwnProperty(a)&&defaultConfig[a]&&(configs[a]=defaultConfig[a]);"object"==typeof customConfig&&(configs=$.extend(configs,customConfig));return configs.advanced=!0,configs}(defaultConfig,_sipInfo.validate),values=getValues())if(values.hasOwnProperty(a))if("function"==typeof configs[a]){if(!1===configs[a](values[a])){setFocus(getId(a)),flag=!1;break}}else if(!1===configs[a]);else if(!1===checkValueItem(a,values[a],configs[a])){flag=!1;break}function checkValueItem(key,val,addon){if($.isArray(val)){for(var i=0,len=val.length;i<len;i++)if(1!==_attrsOptions[key].inputNum||1!==i){if(!addon[i])return!0;if(!1===checkValue(key,val[i],i,addon[i]))return!1}return!0}return checkValue(key,val,void 0,addon)}return flag},data:function(data){var c=_sipInfo.configs,d=_sipInfo.data||{};if(void 0===data){var attrs={},values=getValues();return attrs.multiIspName=_sipInfo.name,c.numbers&&(c.numbers.prefix?(attrs.multiVoipPrefixNum=c.numbers.prefix,attrs.multiVoipNum=values.numbers[0]):2===c.numbers.inputNum?(attrs.multiVoipPrefixNum=values.numbers[0],attrs.multiVoipNum=values.numbers[1]):(attrs.multiVoipPrefixNum="",attrs.multiVoipNum=values.numbers[0])),attrs.multiAuthUserName=values.authID?values.authID:"",attrs.multiAuthPassword=values.password?values.password:"",attrs.multiExtension=attrs.multiVoipPrefixNum+attrs.multiVoipNum,attrs.multiRegistrarServer=values.advanced[0],attrs.multiRegistrarServerPort=values.advanced[1],attrs.multiProxyServer=values.advanced[2],attrs.multiProxyServerPort=values.advanced[3],attrs.multiOutboundProxy=values.advanced[4],attrs.multiOutboundProxyPort=values.advanced[5],attrs.multiRegisterViaOB=values.advanced[6],attrs.multiDomain="",function(){for(var param in d)if(d.hasOwnProperty(param)&&$.isArray(d[param])){for(var tempParam=[],i=0,len=d[param].length;i<len;i++){var item=d[param][i];if("string"==typeof item)tempParam.push(item);else if("object"==typeof item){for(var field in item)if(item.hasOwnProperty(field))if("string"==typeof values[field])tempParam.push(values[field]);else if($.isArray(values[field])){var index=item[field];tempParam.push(values[field][index])}}else"function"==typeof item&&(tempParam=item(tempParam))}attrs[param]=tempParam.join("")}}(),attrs}if("areaCode"===data)return(attrs=getValues()).areaCode;"object"==typeof data&&setValues(data,this.selector)},selectOption:function(data){"number"==typeof data?$(this.selector).find("option:eq("+data+")").prop("selected","selected"):"string"==typeof data&&$(this.selector).find("option[data-text="+data+"]").prop("selected","selected"),$(this.selector).tpSelect({refresh:1})},codecPriority:function(name){return _sipInfo.codec[name]||500}},$.fn.ispMgr=function(options,data){if(this.length&&1!=this.length)return!1;var obj=$(this.selector).data("ispList");if(obj)return"check"===options?obj.validate():"data"===options?obj.data(data):"select"===options?obj.selectOption(data):"codec"===options?obj.codecPriority(data):obj;var list=new ISP(options,this.selector);return $(this.selector).data("ispList",list),list}}(jQuery);