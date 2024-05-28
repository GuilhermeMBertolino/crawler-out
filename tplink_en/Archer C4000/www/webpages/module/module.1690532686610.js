(function(){
    $.su.module = $.su.module || {};

    $.su.module = {
        isTriband: true,
        smartSupport: true,
        portalSupport: true,
        gfnSupport: false,
        support_usb: true,
        support_wds_show: true,
        airtime_fairness_support: true,
        airtime_fairness_support_2g4: true,
        support_guest_dynpasswd: false,
        support_dynamic_pwd_nevermode: true,
        mu_mimo_support: true,
        mu_mimo_support_2g4: false,
        support_wireless_schedule: true,
        support_wds_dualmode: true,
        boost_support: false,
        https_support: true,
        multi_core_support : false,
        wanAgg_support: true,
        linkAgg_support: true,
        igmpSnooping_support: true,
        igmpWifiSupport: true,
        iptvLan_support: true,
        link_agg_and_iptv_c9: false,                // no WAN Aggregation, LAN1~LAN4 for Link Aggregation, LAN1~LAN4 for IPTV
        link_agg_and_iptv_c4000v1: false,           // LAN1 for WAN Aggregation, LAN2~LAN5 for Link Aggregation, LAN2~LAN5 for IPTV
        link_agg_and_iptv_c4000v2: true,           // LAN1 for WAN Aggregation, LAN1~LAN4 for Link Aggregation, LAN1~LAN4 for IPTV
        link_agg_and_iptv_c5400x: false,             // LAN1 for WAN Aggregation, LAN2 and LAN3 for Link Aggregation, LAN5~LAN8 for IPTV

        printerSupport: false
    };
})();



(function(){
    $.su.module = $.su.module || {};
    $.su.module.commonApi = $.su.module.commonApi || {};

    var _fn = function(){
        return null;
    };

    var returnGet = function(variable){
        return variable;
    };

    $.su.module.createObject = function(type){
        var _private = function(){};
        _private.prototype = type == "empty" ? $.su.module.commonApi.empty : $.su.module.commonApi;
        return new _private();
    }

    $.su.module.commonApi.empty = {
        disable:_fn,
        enable:_fn,
        show:_fn,
        hide:_fn,
        setValue:_fn,
        setTipes:_fn,
        init: _fn,
        changeProxy:returnGet,
        extendField:returnGet,
        helpInit:_fn,
        addHelpContent: returnGet
    };

    $.su.module.commonApi.enable = function(params){
        var objType = "";
        if (!$.isArray(params)){
            params = [params];
        }
        for(var i= 0 ; i < params.length ; i++){
            params[i] = params[i].jquery ? params[i] : $(params[i]);
            objType = params[i].get(0).xtype;
            if(objType){
                params[i][objType]("enable");
            }else{
                return false;
            }
        }
    };

    $.su.module.commonApi.disable = function(params){
        var objType = "";
        if (!$.isArray(params)){
            params = [params];
        }
        for(var i= 0 ; i < params.length ; i++){
            params[i] = params[i].jquery ? params[i] : $(params[i]);
            objType = params[i].get(0).xtype;
            if(objType){
                params[i][objType]("disable");
            }else{
                return false;
            }
        }
    };

    $.su.module.commonApi.show = function(params){
        var objType = "";
        if (!$.isArray(params)){
            params = [params];
        }
        for(var i= 0 ; i < params.length ; i++){
            params[i] = params[i].jquery ? params[i] : $(params[i]);
            objType = params[i].get(0).xtype;
            if(objType){
                params[i][objType]("show");
            }else{
                params[i].show();
            }
        }
    };

    $.su.module.commonApi.hide = function(params){
        var objType = "";
        if (!$.isArray(params)){
            params = [params];
        }
        for(var i= 0 ; i < params.length ; i++){
            params[i] = params[i].jquery ? params[i] : $(params[i]);
            objType = params[i].get(0).xtype;
            if(objType){
                params[i][objType]("hide");
            }else{
                params[i].hide();
            }
        }
    };

    $.su.module.commonApi.setTips = function(selector,value){
        var objType = "";
        selector = selector.jquery ? selector : $(selector);
        objType = selector.get(0).xtype;
        if(objType){
            selector[objType]("setTips",value);
        }else{
            return false;
        }
    };

    $.su.module.commonApi.setValue = function(selector,value){
        var objType = "";
        selector = selector.jquery ? selector : $(selector);
        objType = selector.get(0).xtype;
        if(objType){
            selector[objType]("setValue",value);
        }else{
            return false;
        }
    };

    $.su.module.commonApi.val = function(selector,value){
        var objType = "";
        selector = selector.jquery ? selector : $(selector);
        selector.val(value);
    };
})();
(function(){
	$.su.module = $.su.module || {};
	$.su.module.triband = $.su.module.triband || {};

	var triband = {};

	var _fn = function(){
		return null;
	};

	//返回获取的参数，用于双频与三频切换form字段，proxy
	var returnGet = function(variable){
		return variable;
	};

	//wirelessSettings.html
	triband.wirelessSettings = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            modeHide : _fn,
        	initLoadForm : _fn
        });

		var smartModule;
		var form2g = $("form#wireless-setting-2g");
		var form5g = $("form#wireless-setting-5g");
		var form52g = $("form#wireless-setting-52g");
		
		/*triband*/
		var sys_wds_52g = 0;
		var disabled_52g = "";
		var skip_old_current_channel_52g = false;
		var lanIP = 0;
		var URL_WIRELESS_52G_NEW = $.su.url("/admin/wireless?form=wireless_5g_2");
		var SYS_WIRELESS_52G_URL_NEW = $.su.url("/admin/wireless?form=syspara_5g_2");

		var wireless52gProxy = new $.su.Proxy({
			url:URL_WIRELESS_52G_NEW
		});
        
		
		var lanProxy = new $.su.Proxy({
			url: $.su.url('/admin/network?form=lan_ipv4')
		});

		lanProxy.read({}, function(data){
			lanIP = data.ipaddr;
		});
		interfaces.init = function(val_in_objArr, get_ht_channel, cur_region_data,validator_wireless_form){
		smartModule = $.su.module.installedModule["smartModule"];	

			$("#show_5g").html($.su.CHAR.WIRELESS.MODE_51G);
			$("#show_52g").html($.su.CHAR.WIRELESS.MODE_52G);
			$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);

			$("#seprate_5g").show();
			$("#show_52g").show();

			$("input#status-52g").checkbox({
				fieldLabel: "",
				// cls: "inline",
				tips:"",
				tipsCls:"s",
				labelCls: "l",
				items: [
					{boxlabel: $.su.CHAR.WIRELESS.ENABLE_WIRELESS, uncheckedValue:"off", inputValue: "on", id: "chk-enable-wireless-52g"}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				if( (newValue.length == 0) || (newValue == "off")){
					$("#wireless_52g_disabled_all").val("on");
				}
				else{
					$("#wireless_52g_disabled_all").val("off");
				}
			});

			$("input#network-name-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.WIRELESS_NETWORK_NAME,
				labelCls: "l",
				vtype:{
					vtype:"string_visible_allow_blank",
					maxLength:32
				},
				maxLength:32,
				autoTrim:false,
				tipsCls:"after-checkbox",
				allowBlank:false,
				cls: 'inline-block'
			});
			
			$("input#enable-ssid-52g").checkbox({
				fieldLabel: null,
				labelCls: "l",
				cls: "inline",
				items: [
					{boxlabel: $.su.CHAR.WIRELESS.HIDE_SSID,  uncheckedValue:"off", inputValue: "on", id: "chk-enable-ssid-broadcast"}
				]
			});

			$('#wpa-personal-52g').fieldset({
				fields: [
					{name: "psk_version"},
					{name: "psk_cipher"},
					{name: "psk_key"}
				]
			}).hide();

			$('#wpa-enterprise-52g').fieldset({
				fields: [
					{name: "wpa_version"},
					{name: "wpa_cipher"},
					{name: "server"},
					{name: "port"},
					{name: "wpa_key"}
				]
			}).hide();

			$('#wep-52g').fieldset({
				fields: [
					{name: "wep_mode"},
					{name: "wep_format1"},
					{name: "wep_format2"},
					{name: "wep_format3"},
					{name: "wep_format4"},
					{name: "wep_select"},
					{name: "wep_type1"},
					{name: "wep_key1"},
					{name: "wep_type2"},
					{name: "wep_key2"},
					{name: "wep_type3"},
					{name: "wep_key3"},
					{name: "wep_type4"},
					{name: "wep_key4"}
				]
			});
		
			$("input#security-52g").combobox({
				fieldLabel: $.su.CHAR.WIRELESS.SECURITY,
				labelCls: "l",
				inputCls: "xxl",
				items: [
					{"value": "none", "name": $.su.CHAR.WIRELESS.NO_SECURITY},
					{"value": "psk", "name": $.su.CHAR.WIRELESS.WPA_WPA2_PERSONAL},
					{"value": "wpa", "name": $.su.CHAR.WIRELESS.WPA_WPA2_ENTERPRISE},
					{"value": "wep", "name": $.su.CHAR.WIRELESS.WEP}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				$('#wpa-personal-52g').fieldset("hide");
				$('#wpa-enterprise-52g').fieldset("hide");
				$('#wep-52g').fieldset("hide");
				$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
				switch(newValue[0])
				{
					case 'psk': 
						// $('div#wpa-personal-5g').show();
						$('#wpa-personal-52g').fieldset("show");
						$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
						var  personal_encryption_52g = $("input#personal-encryption-52g").radio("getValue");
						var  mode_52g = $("input#mode-52g").combobox("getValue");
						if( ((personal_encryption_52g == "tkip")&&(mode_52g == "n_5")) || ((personal_encryption_52g == "tkip")&&(mode_52g == "ac_5"))  || ((personal_encryption_52g == "tkip")&&(mode_52g == "nac_5")))
						{
							$("input#personal-encryption-52g").radio("setValue", "auto");
						}
						if(personal_encryption_52g == "tkip")
						{
							$('#mode-52g').combobox("disableItem",["n_5", "ac_5", "nac_5"]);
						}
						if( (mode_52g == "n_5") || (mode_52g == "ac_5") || (mode_52g == "nac_5") )
						{
							$("input#enterprise-encryption-52g").radio("disableItem", ["tkip"]);
							$("input#personal-encryption-52g").radio("disableItem", ["tkip"]);
						}
						break;
					case 'wpa': 
						// $('div#wpa-enterprise-5g').show();
						$('#wpa-enterprise-52g').fieldset("show");
						$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
						var  enterprise_encryption_52g = $("input#enterprise-encryption-52g").radio("getValue");
						var  mode_52g = $("input#mode-52g").combobox("getValue");
						if(  ((enterprise_encryption_52g == "tkip")&&(mode_52g == "n_5"))  || ((enterprise_encryption_52g == "tkip")&&(mode_52g == "ac_5")) || ((enterprise_encryption_52g == "tkip")&&(mode_52g == "nac_5")))
						{
							$("input#enterprise-encryption-52g").radio("setValue", "auto");
						}
						if(enterprise_encryption_52g == "tkip")
						{
							$('#mode-52g').combobox("disableItem",["n_5", "ac_5", "nac_5"]);
						}
						if((mode_52g == "n_5") || (mode_52g == "ac_5") || (mode_52g == "nac_5"))
						{
							$("input#enterprise-encryption-52g").radio("disableItem", ["tkip"]);
							$("input#personal-encryption-52g").radio("disableItem", ["tkip"]);
						}
						break;
					case 'wep': 
						// $('div#wep-5g').show();
						$('#wep-52g').fieldset("show");
						
						$('#mode-52g').combobox("disableItem",["n_5", "ac_5", "nac_5"]);
						if($("form#wireless-setting-52g").data("data"))
						{
							var keyIndex = $("form#wireless-setting-52g").data("data").wep_select;
							switch(keyIndex)
							{
								case '1': 
									// $('div#wpa-personal-5g').show();
									$('#key1_cnt_52g').fieldset("show");
									$('#key2_cnt_52g').fieldset("hide");
									$('#key3_cnt_52g').fieldset("hide");
									$('#key4_cnt_52g').fieldset("hide");
									break;
								case '2': 
									// $('div#wpa-personal-5g').show();
									$('#key1_cnt_52g').fieldset("hide");
									$('#key2_cnt_52g').fieldset("show");
									$('#key3_cnt_52g').fieldset("hide");
									$('#key4_cnt_52g').fieldset("hide");
									break;
								case '3': 
									// $('div#wpa-enterprise-5g').show();
									$('#key1_cnt_52g').fieldset("hide");
									$('#key2_cnt_52g').fieldset("hide");
									$('#key3_cnt_52g').fieldset("show");
									$('#key4_cnt_52g').fieldset("hide");
									break;
								case '4': 
									// $('div#wep-5g').show();
									$('#key1_cnt_52g').fieldset("hide");
									$('#key2_cnt_52g').fieldset("hide");
									$('#key3_cnt_52g').fieldset("hide");
									$('#key4_cnt_52g').fieldset("show");
									break;
							};
						}
						break;
				}
			});

			$("input#personal-version-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.VERSION,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.AUTO, inputValue: 'auto', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.WPA_PSK, inputValue: 'wpa'},
					{boxlabel: $.su.CHAR.WIRELESS.WPA2_PSK, inputValue: 'rsn'}
				]
			});
			
			$("input#personal-encryption-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.ENCRYPTION,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.AUTO, inputValue: 'auto'},
					{boxlabel: $.su.CHAR.WIRELESS.TKIP, inputValue: 'tkip'},
					{boxlabel: $.su.CHAR.WIRELESS.AES, inputValue: 'aes'}
				]
			}).on("ev_change",function(e, oldValue, newValue){
				switch(newValue)
				{
					case 'auto':
						$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
						break;
					case 'aes':
						$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
						break;
					case 'tkip':
						$('#mode-52g').combobox("disableItem",["n_5", "ac_5", "nac_5"]);
						break;
				}	
			});
			
			$("input#personal-password-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.WIRELESS_PASSWORD,
				labelCls: "l",
				autoTrim:false,
				maxLength:64
			});
			
			$("input#enterprise-version-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.VERSION,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.AUTO, inputValue: 'auto', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.WPA, inputValue: 'wpa'},
					{boxlabel: $.su.CHAR.WIRELESS.WPA2, inputValue: 'rsn'}
				]
			});
			
			$("input#enterprise-encryption-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.ENCRYPTION,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.AUTO, inputValue: 'auto'},
					{boxlabel: $.su.CHAR.WIRELESS.TKIP, inputValue: 'tkip'},
					{boxlabel: $.su.CHAR.WIRELESS.AES, inputValue: 'aes'}
				]
			}).on("ev_change",function(e, oldValue, newValue){
				switch(newValue)
				{
					case 'auto':
						$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
						break;
					case 'aes':
						$('#mode-52g').combobox("enableItem",["n_5", "ac_5", "nac_5"]);
						break;
					case 'tkip':
						$('#mode-52g').combobox("disableItem",["n_5", "ac_5", "nac_5"]);
						break;
				}		
			});
			
			$("input#enterprise-ip-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.RADIUS_SERVER_IP,
				textFormat:$.su.format.ip,
				labelCls: "l",
				maxLength:15,
				allowBlank:false,
				validator:function(val){

					if($.su.func.ipToInt(val) == $.su.func.ipToInt(lanIP))
					{
						return $.su.CHAR.ERROR["00000077"];
					}
					return true;
				},
				vtype:"ip"
			});
			
			$("input#enterprise-port-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.RADIUS_PORT,
				labelCls: "l",
				vtype:{
						vtype:"number",
						min:1,
						max:65535
				},
				maxLength:5,
				allowBlank:false
			});
			
			$("input#enterprise-password-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.RADIUS_PASSWORD,
				labelCls: "l",
				vtype:{
					vtype:"password",
					maxLength:64
				},
				maxLength:64,
				autoTrim:false,
				allowBlank:false
			});

			$("input#wep-type-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.TYPE,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.AUTO, inputValue: 'auto', itemCls:"fix_min", checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.OPEN_SYSTEM, inputValue: 'open'},
					{boxlabel: $.su.CHAR.WIRELESS.SHARED_KEY, inputValue: 'shared'}
				]
			});
			
			$("input#wep-key1-format-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.WEP_KEY_FORMAT,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.ASCII, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.HEXADECIMAL, inputValue: 'hex'}
				]
			});

			$("input#wep-key2-format-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.WEP_KEY_FORMAT,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.ASCII, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.HEXADECIMAL, inputValue: 'hex'}
				]
			});

			$("input#wep-key3-format-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.WEP_KEY_FORMAT,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.ASCII, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.HEXADECIMAL, inputValue: 'hex'}
				]
			});

			$("input#wep-key4-format-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.WEP_KEY_FORMAT,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.ASCII, inputValue: 'asic',  checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.HEXADECIMAL, inputValue: 'hex'}
				]
			});
			
			$("input#wep-key-select-52g").combobox({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_SELECTED,
				labelCls: "l",
				items: [
					{"value": "1", "name": $.su.CHAR.WIRELESS.KEY1},
					{"value": "2", "name": $.su.CHAR.WIRELESS.KEY2},
					{"value": "3", "name": $.su.CHAR.WIRELESS.KEY3},
					{"value": "4", "name": $.su.CHAR.WIRELESS.KEY4}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				var security = $("input#security-52g").combobox("getValue");
				if(security == "wep"){
				}
				else{
					return;
				}
				$('#key1_cnt_52g').fieldset("hide");
				$('#key2_cnt_52g').fieldset("hide");
				$('#key3_cnt_52g').fieldset("hide");
				$('#key4_cnt_52g').fieldset("hide");
				
				switch(newValue[0])
				{
					case '1': 
						// $('div#wpa-personal-5g').show();
						$('#key1_cnt_52g').fieldset("show");
						$('#key2_cnt_52g').fieldset("hide");
						$('#key3_cnt_52g').fieldset("hide");
						$('#key4_cnt_52g').fieldset("hide");
						break;
					case '2': 
						// $('div#wpa-personal-5g').show();
						$('#key1_cnt_52g').fieldset("hide");
						$('#key2_cnt_52g').fieldset("show");
						$('#key3_cnt_52g').fieldset("hide");
						$('#key4_cnt_52g').fieldset("hide");
						break;
					case '3': 
						// $('div#wpa-enterprise-5g').show();
						$('#key1_cnt_52g').fieldset("hide");
						$('#key2_cnt_52g').fieldset("hide");
						$('#key3_cnt_52g').fieldset("show");
						$('#key4_cnt_52g').fieldset("hide");
						break;
					case '4': 
						// $('div#wep-5g').show();
						$('#key1_cnt_52g').fieldset("hide");
						$('#key2_cnt_52g').fieldset("hide");
						$('#key3_cnt_52g').fieldset("hide");
						$('#key4_cnt_52g').fieldset("show");
						break;
				};
			});
		    
		    $("input#wep-key1-type-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_TYPE,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.BIT64, inputValue: '64', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.BIT128, inputValue: '128'}
				]
			});

			$("input#wep-key2-type-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_TYPE,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.BIT64, inputValue: '64', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.BIT128, inputValue: '128'}
				]
			});

			$("input#wep-key3-type-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_TYPE,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.BIT64, inputValue: '64', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.BIT128, inputValue: '128'}
				]
			});

			$("input#wep-key4-type-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_TYPE,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.BIT64, inputValue: '64', checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.BIT128, inputValue: '128'}
				]
			});

			$("input#wep-key1-value-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_VALUE,
				labelCls: "l",
				autoTrim:false,
				maxLength:64
			});

			$("input#wep-key2-value-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_VALUE,
				labelCls: "l",
				autoTrim:false,
				maxLength:64
			});

			$("input#wep-key3-value-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_VALUE,
				labelCls: "l",
				autoTrim:false,
				maxLength:64
			});

			$("input#wep-key4-value-52g").textbox({
				fieldLabel: $.su.CHAR.WIRELESS.KEY_VALUE,
				labelCls: "l",
				autoTrim:false,
				maxLength:64
			});

			$("#key1_cnt_52g").fieldset({
				fields: [
					{name: "wep_format1"},
					{name: "wep_type1"},
					{name: "wep_key1"}
				]
			}).hide();

			$("#key2_cnt_52g").fieldset({
				fields: [
					{name: "wep_format2"},
					{name: "wep_type2"},
					{name: "wep_key2"}
				]
			}).hide();

			$("#key3_cnt_52g").fieldset({
				fields: [
					{name: "wep_format3"},
					{name: "wep_type3"},
					{name: "wep_key3"}
				]
			}).hide();

			$("#key4_cnt_52g").fieldset({
				fields: [
					{name: "wep_format4"},
					{name: "wep_type4"},
					{name: "wep_key4"}
				]
			}).hide();
			
			$("input#mode-52g").combobox({
				fieldLabel: $.su.CHAR.WIRELESS.MODE,
				labelCls: "l"
			}).on("ev_change", function(e, oldValue, newValue){
				//$("input#enterprise-encryption-5g").radio
				switch(newValue[0])
				{
					case 'ac_5': 
					case 'n_5': 
					case 'nac_5': 
						$("input#security-52g").combobox("disableItem", ["wep"]);
						$("input#enterprise-encryption-52g").radio("disableItem", ["tkip"]);
						$("input#personal-encryption-52g").radio("disableItem", ["tkip"]);
						break;
					default: 
						$("input#security-52g").combobox("enableItem", ["wep"]);
						$("input#enterprise-encryption-52g").radio("enableItem", ["tkip"]);
						$("input#personal-encryption-52g").radio("enableItem", ["tkip"]);
						break;
				}
				switch(newValue[0])
				{
					case 'a_5':
						$("#channelwidth-52g").combobox("disableItem", ["40"]);
						$("#channelwidth-52g").combobox("disableItem", ["80"]);
						$("#channelwidth-52g").combobox("setValue", "auto");
						$("div#chwidth_52g").css({
							"display": "none"
						});
						break;
					case 'n_5':
					case 'an_5':
						var chwidth = $("#channelwidth-52g").combobox("getValue");
						$("#channelwidth-52g").combobox("enableItem", ["40"]);
						$("#channelwidth-52g").combobox("disableItem", ["80"]);
						if (chwidth == "80")$("#channelwidth-52g").combobox("setValue", "auto");
						$("div#chwidth_52g").fadeIn(150);
						break;
					case 'ac_5':
					case 'nac_5':
					case 'anac_5':
					default:
						$("#channelwidth-52g").combobox("enableItem", ["40"]);
						$("#channelwidth-52g").combobox("enableItem", ["80"]);
						$("div#chwidth_52g").fadeIn(150);
						break;
				}
			});

			$("#channelwidth-52g").combobox({
				fieldLabel: $.su.CHAR.WIRELESS.CHANNEL_WIDTH,
				labelCls: "l",
				columns:3
			}).on("ev_change", function(e, oldValue, newValue){
				var channel_val = $("#channel-52g").combobox("getValue");
				switch(newValue[0]){
					case "auto":
					case "20":
						var chan20 = get_ht_channel(cur_region_data.channel_5g_2, 20);
						$("#channel-52g").combobox("loadData",chan20);
						if(val_in_objArr(channel_val, chan20)){
							$("#channel-52g").combobox("setValue",channel_val);
						}
						else{
							$("#channel-52g").combobox("setValue","auto");
						}
						break;
					case "40":
						var chan40 = get_ht_channel(cur_region_data.channel_5g_2, 40);
						$("#channel-52g").combobox("loadData",chan40);
						if(val_in_objArr(channel_val, chan40)){
							$("#channel-52g").combobox("setValue",channel_val);
						}
						else{
							$("#channel-52g").combobox("setValue","auto");
						}
						break;
					case "80":
						var chan80 = get_ht_channel(cur_region_data.channel_5g_2, 80);
						$("#channel-52g").combobox("loadData",chan80);
						if(val_in_objArr(channel_val, chan80)){
							$("#channel-52g").combobox("setValue",channel_val);
						}
						else{
							$("#channel-52g").combobox("setValue","auto");
						}
						break;
				}
			});
			
			$("input#channel-52g").combobox({
				fieldLabel: $.su.CHAR.WIRELESS.CHANNEL,
				labelCls: "l"
			});	
			
			$("input#transmit-power-52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.TRANSMIT_POWER,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.WIRELESS.LOW, inputValue: 'low',  checked:true},
					{boxlabel: $.su.CHAR.WIRELESS.MIDDLE, inputValue: 'middle'},
					{boxlabel: $.su.CHAR.WIRELESS.HIGH, inputValue: 'high'}
				]
			});

			var form52g = $("form#wireless-setting-52g").form({
				proxy: wireless52gProxy,
				fields: [
					{name: "enable"},
					{name: "ssid"},
					{name: "hidden"},
					{name: "encryption"},
					
					{name: "psk_version"},
					{name: "psk_cipher"},
					{name: "psk_key"},
					
					{name: "wpa_version"},
					{name: "wpa_cipher"},
					{name: "server"},
					{name: "port"},
					{name: "wpa_key"},
					
					{name: "wep_mode"},
					
					{name: "wep_select"},
					{name: "wep_format1"},
					{name: "wep_type1"},
					{name: "wep_key1"},

					{name: "wep_format2"},
					{name: "wep_type2"},
					{name: "wep_key2"},

					{name: "wep_format3"},
					{name: "wep_type3"},
					{name: "wep_key3"},

					{name: "wep_format4"},
					{name: "wep_type4"},
					{name: "wep_key4"},
					
					{name: "hwmode"},
					{name: "htmode"},
					{name: "channel"},
					{name: "current_channel"},
					{name: "txpower"},

					{name: "airtime_fairness", mapping: "airtime_fairness"},
					{name: "mu_mimo", mapping: "mu_mimo"}
				],
				validator:function(){
					var validatorFlag = validator_wireless_form("52g");
					if(!validatorFlag){
						return false;
					}

					skip_old_current_channel_52g = true;
					return !smartModule.smartSubmit("52g");
				},
				autoLoad:false,
				submitBtn: "default"
			}).on("ev_loadData", function(e, data){
				// if(data.disabled == "on"){
				// 	if(data.disabled_by == 0){
				// 		$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);
				// 	}
				// 	else{
				// 		$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE2);
				// 	}
				// 	disabled_52g = "on"; 
				// 	$("#note_title_52g").removeClass("hidden");
				// 	$("form#wireless-setting-52g").form("disable");
				// }
				// else{
					disabled_52g = "off"; 
					$("#note_title_52g").addClass("hidden");
					$("form#wireless-setting-52g").form("enable");
				// }

				if (data.channel != "auto") {
					var numberTest = new $.su.vtype({
			            vtype: "number"
					});
					if (skip_old_current_channel_52g || (data.disabled == "off") || !numberTest.validate(data.current_channel)) {
						$("#channel-52g").combobox("setValue", data.channel);
					}
					else {
							$("#channel-52g").combobox("setValue", data.current_channel);
					}
				}

				$.post(SYS_WIRELESS_52G_URL_NEW, function(data){
					if(typeof data.data == "undefined"){
						return;
					}
					sys_wds_52g = data.data.enable;
					// if(disabled_52g == "on")
					// {
					// 	$("#note_title_52g").removeClass("hidden");
					// 	$("form#wireless-setting-52g").form("disable");
					// }
					// else{
						$("#note_title_52g").addClass("hidden");
						$("form#wireless-setting-52g").form("enable");
						if(sys_wds_52g == "on"){
							$("#channel-52g").combobox("disable");
						}
						else{
							$("#channel-52g").combobox("enable");
						}
					// }

					var security_52g = $("input#security-52g").combobox("getValue");
					if(security_52g == "wep"){
						$('#mode-52g').combobox("disableItem", ["ac_5", "nac_5"]);
					}
					else if(security_52g == "psk"){
						var personal_encryption_52g = $("input#personal-encryption-52g").radio("getValue");
						if(personal_encryption_52g == "tkip"){
							$('#mode-52g').combobox("disableItem", ["ac_5", "nac_5"]);
						}
					}

					var mode_52g = $("input#mode-52g").combobox("getValue");
					if((mode_52g == "n_5") || (mode_52g == "ac_5") || (mode_52g == "nac_5"))
					{
						$("input#enterprise-encryption-52g").radio("disableItem", ["tkip"]);
						$("input#personal-encryption-52g").radio("disableItem", ["tkip"]);
					}
				},"json");
			});

			$("span.third-mode").click(function(){
				if($(this).hasClass("mode-select")){
				}
				else{
					$(this).addClass("mode-select");
					$("span.first-mode").hasClass("mode-select")? $("span.first-mode").toggleClass("mode-select") : 1;
					$("span.second-mode").hasClass("mode-select")? $("span.second-mode").toggleClass("mode-select") : 1;
					form2g.form("hide");
					form5g.form("hide");
					form52g.form("show");
					form52g.form("load");
				}
			});

			$("input#wep-key-select-52g").combobox("hide");
			$("input#wep-key-select-52g").combobox("setValue", 1);
		}

		interfaces.modeHide = function(){
			$("span.third-mode").hasClass("mode-select")? $("span.third-mode").toggleClass("mode-select") : 1;
			form52g.form("hide");
		};

		interfaces.initLoadForm = function(cur_region_data){
			var hwmode_52g = cur_region_data.hwmode_5g_2;
			var htmode_52g = cur_region_data.htmode_5g_2;
			var channel_52g = cur_region_data.channel_5g_2;
			$("span.third-mode").hasClass("mode-select")? $("span.third-mode").toggleClass("mode-select") : 1;
			$("#wireless-setting-52g").form("hide");
			//如果该国家不支持5g-2
			if($.isEmptyObject(channel_52g)){
				$("span.third-mode").addClass("disabled");
				//$("span#not_support_tips").hide();
			}
			else{
				$("span.third-mode").removeClass("disabled");
				var hwmode_52g_item = [];
				var len = hwmode_52g.length;
				for(var k = 0; k < len; k++)
				{
					var tempObj = {};
					var lan_id = "MODE_" + hwmode_52g[k].toUpperCase();
					tempObj.name 	= $.su.CHAR.WIRELESS[lan_id];
					tempObj.value 	= hwmode_52g[k];
					hwmode_52g_item.push(tempObj);
				}
				$("#mode-52g").combobox("loadData",hwmode_52g_item);

				var htmode_52g_item = [];
				htmode_52g_item[0] = {"name":$.su.CHAR.WIRELESS.AUTO,"value":"auto"};
				var len = htmode_52g.length;
				for(var k = 0; k < len; k++)
				{
					var tempObj = {};
					tempObj.name 	= htmode_52g[k] + "MHz";
					tempObj.value 	= htmode_52g[k];
					htmode_52g_item.push(tempObj);
				}
				$("#channelwidth-52g").combobox("loadData",htmode_52g_item);
				
				var channel_width = "";
				var channel_val = "";
			
				
				if(typeof $("form#wireless-setting-52g").data("data") != "undefined")
				{
					channel_width = $("form#wireless-setting-52g").data("data").htmode;
					channel_val = $("form#wireless-setting-52g").data("data").channel;
				}
				
				switch(channel_width)
				{
					case "auto":
					case "20":
						var chan20 = get_ht_channel(channel_52g, 20);
						$("#channel-52g").combobox("loadData",chan20);
						if(val_in_objArr(channel_val, chan20))
						{
							$("#channel-52g").combobox("setValue",channel_val);
						}
						else
						{
							$("#channel-52g").combobox("setValue","auto");
						}
						break;
					case "40":
						var chan40 = get_ht_channel(channel_52g, 40);
						$("#channel-52g").combobox("loadData",chan40);
						if(val_in_objArr(channel_val, chan40))
						{
							$("#channel-52g").combobox("setValue",channel_val);
						}
						else
						{
							$("#channel-52g").combobox("setValue","auto");
						}
						break;
					case "80":
						var chan80 = get_ht_channel(channel_52g, 80);
						$("#channel-52g").combobox("loadData",chan80);
						if(val_in_objArr(channel_val, chan80))
						{
							$("#channel-52g").combobox("setValue",channel_val);
						}
						else
						{
							$("#channel-52g").combobox("setValue","auto");
						}
						break;
				}
			}
			$("form#wireless-setting-52g").form("load");
		};

		interfaces.helpInit = function(){
			$("h4.WIRELESS_5G").html($.su.CHAR.WIRELESS.HELP_TRIBAND_TITLE);
		}
		return $.su.module.isTriband ? interfaces : empty;
	};
	//basic_wireless.html
	triband.basicWireless = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            validatorFun : returnGet,
        	prepare_form_52g: _fn,
        	initLoadForm52g: _fn,
        	totalSaveHandler:_fn,
        	totalSaveEncrypt: _fn,
        	smartOn:_fn,
        	smartOff:_fn,
        	val:returnGet,
        	vertify52g: returnGet
        });

		var wep_select_52g    =  "";
		var wep_format_52g    =  "";
		var wep_type_52g    =  "";
		var ssid_52g = "";
		var wireless_52g_disabled = "off";
		var wireless_52g_disabled_all = "off";

		var encryption_52g = "";
		var new_encryption_52g = "";

		var status_label = $($("input#status_5g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");

		var URL_WIRELESS_2G_5G_52G_NEW = $.su.url("/admin/wireless?form=wireless_2g&form=wireless_5g&form=wireless_5g_2");

		var wireless2g5g52gProxy = new $.su.Proxy({
			url: URL_WIRELESS_2G_5G_52G_NEW
		});

		empty.init = function(){
			$("input#status_5g").closest(".checkbox-group-container").find(".checkbox-group-label").html($.su.CHAR.BASIC_WIRELESS.MODE_5G);
			$("#field_52g").hide();
			$("#status_52g").checkbox("disable");
			$("#network_name_52g").textbox("disable");
			$("#enable_ssid_52g").checkbox("disable");
			$("#encry_password_52g").textbox("disable");
		};

		function validator_form_52g(encryption_52g){
			var val = $("input#encry_password_52g").textbox("getValue");
			if(val == "")
			{
				$("#basic_wire_psk_key_52g").prop("disabled",true);
				$("#basic_wire_wpa_key_52g").prop("disabled",true);

				$("#wireless_52g_psk_version").prop("disabled",true);
				$("#wireless_52g_psk_cipher").prop("disabled",true);

				$("#wep_key1_52g").prop("disabled",true);
				$("#wep_key2_52g").prop("disabled",true);
				$("#wep_key3_52g").prop("disabled",true);
				$("#wep_key4_52g").prop("disabled",true);

				$("#wireless_52g_encryption").prop("disabled",false);
				$("#wireless_52g_encryption").val("none");
				new_encryption_52g = "none";
			}
			else
			{
				var encryption = encryption_52g;
				if( encryption == "none")
				{
					var val = $("input#encry_password_52g").textbox("getValue");
					if(val == "")
					{
						$("#wireless_52g_encryption").val("");
						$("#wireless_52g_psk_version").val("");
						$("#wireless_52g_psk_cipher").val("");
						$("#wireless_52g_psk_key").val("");

						$("#wireless_52g_encryption").prop("disabled",true);
						$("#wireless_52g_psk_version").prop("disabled",true);
						$("#wireless_52g_psk_cipher").prop("disabled",true);
						$("#basic_wire_psk_key_52g").prop("disabled",true);

						new_encryption_52g = "none";
					}
					else
					{
						var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
						if(reg.test(val))
						{
							//return true;
						}
						else
						{
							$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000066"]);
							return false;
						}

						$("#wireless_52g_encryption").val("psk");
						$("#wireless_52g_psk_version").val("auto");
						$("#wireless_52g_psk_cipher").val("auto");
						$("#basic_wire_psk_key_52g").val(val);

						$("#wireless_52g_encryption").prop("disabled",false);
						$("#wireless_52g_psk_version").prop("disabled",false);
						$("#wireless_52g_psk_cipher").prop("disabled",false);
						$("#basic_wire_psk_key_52g").prop("disabled",false);
						new_encryption_52g = "psk";
					}
				}
				if( encryption == "wpa")
				{
					var val = $("input#encry_password_52g").textbox("getValue");
					var reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{1,64}$/;
					if(reg.test(val))
					{
						// return true;
					}
					else
					{
						$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000073"]);
						return false;
					}

					$("#basic_wire_wpa_key_52g").val(val);
					new_encryption_52g = "wpa";
				}
				if(encryption == "psk")
				{
					var val = $("input#encry_password_52g").textbox("getValue");
					var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
					if(reg.test(val))
					{
						// return true;
					}
					else
					{
						$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000066"]);
						return false;
					}
					new_encryption_52g = "psk";
				}
				if(encryption == "wep")
				{
					var keyIndex = wep_select_52g;
					var format = wep_format_52g;
					var type = wep_type_52g;
					var key = $("input#encry_password_52g").textbox("getValue");
				
					var asc_64_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}$/;
					var asc_128_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13}$/;
					var asc_152_reg = /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{16}$/;
					

					var hex_64_reg = /^[0-9a-fA-F]{10}$/;
					var hex_128_reg = /^[0-9a-fA-F]{26}$/;
					var hex_152_reg = /^[0-9a-fA-F]{32}$/;

					if(format == "asic")
					{
						if(type == 64)
						{
							if(asc_64_reg.test(key))
							{
								// return true;
							}
							else
							{
								$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000068"]);
								return false;
							}
						}
						else if(type == 128)
						{
							if(asc_128_reg.test(key))
							{
								// return true;
							}
							else
							{
								$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000070"]);
								return false;
							}
						}
						else
						{
							if(asc_152_reg.test(key))
							{
								// return true;
							}
							else
							{
								$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000072"]);
								return false;
							}
						}
					}
					else
					{
						if(type == 64)
						{
							if(hex_64_reg.test(key))
							{
								// return true;
							}
							else
							{
								$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000067"]);
								return false;
							}
						}
						else if(type == 128)
						{
							if(hex_128_reg.test(key))
							{
								// return true;
							}
							else
							{
								$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000069"]);
								return false;
							}
						}
						else
						{
							if(hex_152_reg.test(key))
							{
								// return true;
							}
							else
							{
								$("input#encry_password_52g").textbox("setError",$.su.CHAR.ERROR["00000071"]);
								return false;
							}
						}
					}
					new_encryption_52g = "wep";
				}
			}
			return true;
		}

		interfaces.init = function(){
			$("input#status_52g").checkbox({
				fieldLabel: $.su.CHAR.BASIC_WIRELESS.MODE_52G,
				labelCls: "l",
				tips:"",
				tipsCls:"s",
				cls:"part-separate",
				items: [
					{boxlabel: $.su.CHAR.BASIC_WIRELESS.ENABLE_WIRELESS, uncheckedValue:"off", inputValue: "on", id: "chk_enable_wireless_52g"}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				if(newValue.length == 0)
				{
					$("#wireless_52g_disabled_all").val("on");
				}
				else
				{
					$("#wireless_52g_disabled_all").val("off");
				}
			});

			$("input#network_name_52g").textbox({
				fieldLabel: $.su.CHAR.BASIC_WIRELESS.WIRELESS_NETWORK_NAME,
				labelCls: "l",
				vtype:"string_visible_allow_blank",
				maxLength:32,
				allowBlank:false,
				autoTrim:false,
				tipsCls:"after-checkbox l",
				cls: 'inline'
			});

			$("input#enable_ssid_52g").checkbox({
				fieldLabel: null,
				cls: "inline-block",
				items: [
					{boxlabel: $.su.CHAR.BASIC_WIRELESS.HIDE_SSID,  uncheckedValue:"off", inputValue: "on", id: "chk_enable_ssid_broadcast_52g"}
				]
			});

			$("input#encry_password_52g").textbox({
				fieldLabel: $.su.CHAR.BASIC_WIRELESS.WIRELESS_PASSWORD,
				labelCls: "l",
				autoTrim:false,
				maxLength: 64
			});

			//这里我默认channel_52g为undefined时，频段属于三频

			$("#encryption_52g_notice").html($.su.CHAR.BASIC_WIRELESS.ENCRYPTION_52G_NOTICE);

			$("input#status_5g").closest(".checkbox-group-container").find(".checkbox-group-label").html($.su.CHAR.BASIC_WIRELESS.MODE_51G);
			$("#field_52g").show();

			$("#wireless_52g_disabled_all").prop("disabled",false);
			$("#status_52g").prop("disabled",false);
			$("#status_52g").checkbox("enable");
			$("#network_name_52g").textbox("enable");
			$("#enable_ssid_52g").checkbox("enable");
			$("#encry_password_52g").textbox("enable");
		};

		interfaces.validatorFun = function(){
			var result = validator_form_52g(encryption_52g);
			return result;
		};

		interfaces.changeProxy = function(){
			return wireless2g5g52gProxy;
		};

		interfaces.extendField = function(array){
			if($.type(array) != "array"){
				array = [array];
			}
			var form52gFields = [
				{name: "wireless_5g_2_enable", mapping: "wireless_5g_2_enable"},
				{name: "wireless_5g_2_ssid", mapping: "wireless_5g_2_ssid"},
				{name: "wireless_5g_2_hidden", mapping: "wireless_5g_2_hidden"}
			];
			return array.concat(form52gFields);
		};

		interfaces.prepare_form_52g = function(form2g5g_data){
			if(encryption_52g == "none")
			{
				$("#note").html($.su.CHAR.BASIC_WIRELESS.NOTE);

				$("#basic_wire_psk_key_52g").prop("disabled",false);
				$("#wep_key1_52g").prop("disabled",true);
				$("#wep_key2_52g").prop("disabled",true);
				$("#wep_key3_52g").prop("disabled",true);
				$("#wep_key4_52g").prop("disabled",true);

				$("#basic_wire_wpa_key_52g").prop("disabled",true);

				$("#wireless_52g_encryption").prop("disabled",false);
				$("#wireless_52g_psk_version").prop("disabled",false);
				$("#wireless_52g_psk_cipher").prop("disabled",false);

				$("#wireless_52g_encryption").val("psk");
				$("#wireless_52g_psk_version").val("auto");
				$("#wireless_52g_psk_cipher").val("auto");
			}
			if(encryption_52g == "psk")
			{
				$("#wireless_52g_encryption").prop("disabled",true);
				$("#wireless_52g_psk_version").prop("disabled",true);
				$("#wireless_52g_psk_key").prop("disabled",true);

				$("#basic_wire_wpa_key_52g").prop("disabled",true);

				$("#basic_wire_psk_key_52g").prop("disabled",false);
				$("#wep_key1_52g").prop("disabled",true);
				$("#wep_key2_52g").prop("disabled",true);
				$("#wep_key3_52g").prop("disabled",true);
				$("#wep_key4_52g").prop("disabled",true);
			}
			if(encryption_52g == "wpa")
			{
				$("#wireless_52g_encryption").prop("disabled",true);
				$("#wireless_52g_psk_version").prop("disabled",true);
				$("#wireless_52g_psk_key").prop("disabled",true);

				$("#basic_wire_wpa_key_52g").prop("disabled",false);

				$("#basic_wire_psk_key_52g").prop("disabled",true);
				$("#wep_key1_52g").prop("disabled",true);
				$("#wep_key2_52g").prop("disabled",true);
				$("#wep_key3_52g").prop("disabled",true);
				$("#wep_key4_52g").prop("disabled",true);
			}
			if(encryption_52g == "wep")
			{
				var index = form2g5g_data.wireless_5g_2_wep_select;

				$("#wireless_52g_encryption").prop("disabled",true);
				$("#wireless_52g_psk_version").prop("disabled",true);
				$("#wireless_52g_psk_key").prop("disabled",true);

				$("#basic_wire_wpa_key_52g").prop("disabled",true);

				$("#basic_wire_psk_key_52g").prop("disabled",true);
				for(var i = 1; i <= 4; i++)
				{
					var temp_id = "#wep_key" + i + "_52g";
					if(index == i)
					{
						$(temp_id).prop("disabled",false);
					}
					else
					{
						$(temp_id).prop("disabled",true);
					}
				}
			}
		};

		interfaces.initLoadForm52g = function(data,form2g5g_data){
			encryption_52g = data.wireless_5g_2_encryption;
			ssid_52g = data.wireless_5g_2_ssid;
			wep_select_52g = data.wireless_5g_2_wep_select;
			wep_format_52g = data["wireless_5g_2_wep_format"+wep_select_52g];
			wep_type_52g   = data["wireless_5g_2_wep_type"+wep_select_52g];

			if(data.wireless_5g_2_enable == "on")
			{
				$("#wireless_52g_disabled_all").val("off");
			}
			else
			{
				$("#wireless_52g_disabled_all").val("on");
			}

			// wireless_52g_disabled = data.wireless_5g_2_disabled;
			// if(data.wireless_5g_2_disabled == "on")
			// {	
			// 	$("input#status_52g").checkbox("disable");
			// 	$("input#network_name_52g").textbox("disable");
			// 	$("input#enable_ssid_52g").checkbox("disable");
			// 	$("input#encry_password_52g").textbox("disable");
			// 	$("#total_save").button("disable");
			// 	if(data.wireless_5g_2_disabled_by == 0){
			// 		$("span#note_title_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);
			// 	}
			// 	else{
			// 		$("span#note_title_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE2);
			// 	}
			// 	$("#note_title_all").removeClass("hidden");
			// }
			// else
			// {
				$("input#status_52g").checkbox("enable");
				$("input#network_name_52g").textbox("enable");
				$("input#enable_ssid_52g").checkbox("enable");
				$("input#encry_password_52g").textbox("enable");
				$("#total_save").button("enable");
				$("#note_title_all").addClass("hidden");
			// }

			$("#basic_wire_psk_key_52g").val(data.wireless_5g_2_psk_key);

			$("#wep_key1_52g").val(data.wireless_5g_2_wep_key1);
			$("#wep_key2_52g").val(data.wireless_5g_2_wep_key2);
			$("#wep_key3_52g").val(data.wireless_5g_2_wep_key3);
			$("#wep_key4_52g").val(data.wireless_5g_2_wep_key4);

			switch(encryption_52g){
				case 'psk':
					$("input#encry_password_52g").textbox("setValue", form2g5g_data.wireless_5g_2_psk_key);
					break;
				case 'wpa':
					$("input#encry_password_52g").textbox("setValue", form2g5g_data.wireless_5g_2_wpa_key);
					break;
				case 'wep':
					var index = data.wireless_5g_2_wep_select;
					var id = "wireless_5g_2_wep_key" + index;
					$("input#encry_password_52g").textbox("setValue", data[id]);
					break;
				default:;
			}
		};

		interfaces.totalSaveHandler = function(){
			switch(encryption_52g)
			{
				case "none":
					break;
				case "psk":
					$("#wireless_setting input[name='wireless_5g_2_psk_key']").val($("#encry_password_52g").textbox("getValue"));
					break;
				case "wpa":
					// $("#wireless_setting input[name='wireless_52g_wpa_key']").val($("#encry_password_52g").textbox("getValue"));
					break;
				case "wep":
					var id = "#wep_key" + wep_select_52g + "_52g";
					$(id).val($("#encry_password_52g").textbox("getValue"));
					break;
			};
		};

		interfaces.totalSaveEncrypt = function(){
			$("#encryption_52g_notice").css({"display":"block"});
			switch (new_encryption_52g){
				case "wep":
					text = $.su.CHAR.WIRELESS.WEP;
					$("#encryption_52g_notice").html($.su.CHAR.BASIC_WIRELESS.ENCRYPTION_52G_NOTICE.replace("%s", text));
					break;
				case "psk":
					text = $.su.CHAR.WIRELESS.WPA_WPA2_PERSONAL;
					$("#encryption_52g_notice").html("");
					$("#encryption_52g_notice").css({"display":"none"});
					break;
				case "wpa":
					text = $.su.CHAR.WIRELESS.WPA_WPA2_ENTERPRISE;
					$("#encryption_52g_notice").html($.su.CHAR.BASIC_WIRELESS.ENCRYPTION_52G_NOTICE.replace("%s", text));
					break;
				default:
					text = $.su.CHAR.WIRELESS.NO_SECURITY;
					$("#encryption_52g_notice").html($.su.CHAR.BASIC_WIRELESS.ENCRYPTION_52G_NO);
					break;
			}
		};

		interfaces.smartOn = function(){
			$("input#status_52g").checkbox("disable");
			$("input#network_name_52g").prop("disabled",true);
			$("input#enable_ssid_52g").checkbox("disable");
			$("input#encry_password_52g").prop("disabled",true);
			$("input#wireless_52g_disabled_all").prop("disabled",true);

			$("input#status_52g").checkbox("hide");
			$("input#network_name_52g").textbox("hide");
			$("input#enable_ssid_52g").checkbox("hide");
			$("input#encry_password_52g").textbox("hide");
		};

		interfaces.smartOff = function(){
			if($($("#network_name_5g").get(0)).closest("div.text-container").hasClass("disabled")){
				$("input#status_52g").checkbox("disable");
				$("input#enable_ssid_52g").checkbox("disable");
			}
			else{
				$("input#status_52g").checkbox("enable");
				$("input#enable_ssid_52g").checkbox("enable");
			}
			$("input#network_name_52g").prop("disabled",false);
			$("input#encry_password_52g").prop("disabled",false);
			$("input#wireless_52g_disabled_all").prop("disabled",false);

			$("input#status_52g").checkbox("show");
			$("input#network_name_52g").textbox("show");
			$("input#enable_ssid_52g").checkbox("show");
			$("input#encry_password_52g").textbox("show");
		};

		interfaces.val = function(selector){
			$(selector).val(encryption_52g);
		};

		interfaces.vertify52g = function(verify){
			verify = verify && new_encryption_52g=="psk";
			return verify;
		};
		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.basicGuest = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            disable52g: _fn,
        	wireless52gproxyRead: _fn
        });

		//变量保存
		var WIRELESS_GUEST_2G_5G_52G_URL_NEW = $.su.url("/admin/wireless?form=guest&form=guest_2g&form=guest_5g&form=guest_5g_2&form=guest_2g5g");
		var URL_WIRELESS_52G_NEW = $.su.url("/admin/wireless?form=wireless_5g_2");

		var URL_WIRELESS_52G_NEW = $.su.url("/admin/wireless?form=wireless_5g_2");

		var SYS_WIRELESS_52G_URL_NEW = $.su.url("/admin/wireless?form=syspara_5g_2");

		var sysWireless52gProxy = new $.su.Proxy({
			url : SYS_WIRELESS_52G_URL_NEW
		});

		var wireless2g5g52gProxy = new $.su.Proxy({
			url : WIRELESS_GUEST_2G_5G_52G_URL_NEW
		});

		var wireless52gProxy = new $.su.Proxy({
			url:URL_WIRELESS_52G_NEW
		});

        var status_label = $($("input#status_5g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");

		empty.init = function(){
			status_label.html($.su.CHAR.BASIC_GUEST.MODE_5G);
			$("#guest_52g_field").hide();
		};

		interfaces.init = function(){

			status_label.html($.su.CHAR.BASIC_GUEST.MODE_51G);

			$("#guest_52g_field").show();
			//5g_2
			$("input#status_52g").checkbox({
				fieldLabel : $.su.CHAR.BASIC_GUEST.MODE_52G,
				labelCls : 'l',
				// cls: "inline",
				tips : "",
				tipsCls : "s",
				cls : "part-separate",
				items : [{
					boxlabel : $.su.CHAR.BASIC_GUEST.ENABLE_WIRELESS,
					uncheckedValue : "off",
					inputValue : "on",
					id : "chk_enable_guest_52g"
				}
				]
			});

			$("input#network_name_52g").textbox({
				fieldLabel : $.su.CHAR.BASIC_GUEST.WIRELESS_NETWORK_NAME,
				labelCls : 'l',
				//	tips:$.su.CHAR.BANDWIDTHCTR.UNIT,
				vtype : "string_visible_allow_blank",
				maxLength : 32,
				allowBlank : false,
				autoTrim : false,
				tipsCls : "after-checkbox l",
				cls : 'inline'
			});
			$("input#enable_ssid_52g").checkbox({
				fieldLabel : null,
				cls : "inline-block",
				items : [{
					boxlabel : $.su.CHAR.BASIC_GUEST.HIDE_SSID,
					uncheckedValue : "off",
					inputValue : "on",
					id : "chk_enable_ssid_broadcast"
				}]
			});

			$("input#status_52g").prop("disabled",false);
			$("input#network_name_52g").prop("disabled",false);
			$("input#enable_ssid_52g").prop("disabled",false);

			
		};

		interfaces.changeProxy = function(){
			return wireless2g5g52gProxy;
		};

		interfaces.extendField = function(array){
			var fields = [
				{name: "guest_5g_2_enable"},
				{name: "guest_5g_2_ssid"},
				{name: "guest_5g_2_hidden"}
			];
			return array.concat(fields);
		};

		interfaces.disable52g = function(cur_region_data){
			var channel_52g = cur_region_data.channel_5g_2;
			if($.isEmptyObject(channel_52g)){
				$("input#status_52g").checkbox("disable");
				$("input#network_name_52g").textbox("disable");
				$("input#enable_ssid_52g").checkbox("disable");
			}
		};

		interfaces.wireless52gproxyRead = function(dynamicModule){
			wireless52gProxy.read({}, function (data) {
				if(typeof data == "undefined"){
					return;
				}
				wireless_52g_disabled = data.disabled;
				wireless_52g_disabled_all = data.disabled_all;
				var tempData = data.extinfo || {};
				var wds_guest_compatible = tempData.wds_guest_compatible || "no";

				// if(wireless_52g_disabled == "on"){
				// 	$("input#status_52g").checkbox("disable");
				// 	$("input#network_name_52g").textbox("disable");
				// 	$("input#enable_ssid_52g").checkbox("disable");
				// 	$("input#guest_static_password").textbox("disable");
				// 	if(data.disabled_by == 0){
				// 		$("span#note_title_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);
				// 	}
				// 	else{
				// 		$("span#note_title_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE2);
				// 	}
				// 	$("#note_title_all").removeClass("hidden");

				// 	dynamicModule.disable(["input#guest_password_cycle", "input#guest_dynamic_password"]);
				// }else{
					$("input#status_52g").checkbox("enable");
					$("input#network_name_52g").textbox("enable");
					$("input#enable_ssid_52g").checkbox("enable");
					$("input#guest_static_password").textbox("enable");
					$("#note_title_all").addClass("hidden");

					if(wireless_52g_disabled_all == "on"){
						$("#status_52g").checkbox("disable");
						$("#status_52g").checkbox("setTips", $.su.CHAR.WIRELESS.ENABLE_TIPS);
					}else{
						$("#status_52g").checkbox("enable");
						$("#status_52g").checkbox("setTips", "");
						if(wds_guest_compatible == "no"){
							sysWireless52gProxy.read({}, function (data) {
								enable = data.enable;

								if(enable == "on"){
									$("input#status_52g").checkbox("disable");
									$("input#status_52g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
								}else{
								}
							});
						}
					}

					dynamicModule.enable(["input#guest_password_cycle", "input#guest_dynamic_password"]);
				// }
			});
		};
		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.basicNetWork = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            evLoadData: _fn,
        	statusRead: _fn
        });

		var scheduleModule = $.su.module.wirelessSchedule.basicNetWork();

		empty.init = function(){
			$("div.map-router-bar-52g").hide();
			$("#map_router_52g").hide();
			$("#router_wireless_52g").hide();
			$("#router_guest_52g").hide();

			$("map_router_tip").removeClass("triband");
		};

		empty.helpInit = function(){
			$("#wifi_triband_title").hide();
			$("#guest_triband_title").hide();
		};

		interfaces.init = function(){
			$('p#map_router_52g_text').html($.su.CHAR.BASIC_NETWORK.GHZ52);
			$('h5#router_wireless_52g_title').html($.su.CHAR.BASIC_NETWORK.WIRELESS_52GHZ);
			$('h5#router_guest_52g_title').html($.su.CHAR.BASIC_NETWORK.GUEST_52GHZ);

			//if channel_52g == true triband init
			$("div.map-router-bar-52g").show();
			$("#map_router_52g").show();
			$('p#map_router_5g_text').html($.su.CHAR.BASIC_NETWORK.GHZ51);
			$('h5#router_wireless_5g_title').html($.su.CHAR.BASIC_NETWORK.WIRELESS_51GHZ);
			$('h5#router_guest_5g_title').html($.su.CHAR.BASIC_NETWORK.GUEST_51GHZ);
			$("#router_wireless_52g").show();
			$("#router_guest_52g").show();

			$("#map_router_tip").addClass("triband");

			$("#wireless_52g_ssid_label").html($.su.CHAR.BASIC_NETWORK.SSID+":");

			$("input#router_wireless_52g_channel").textbox({
				fieldLabel: $.su.CHAR.BASIC_NETWORK.CHANNEL,
				labelCls:"xxs",
				readOnly: true
			});

			$("input#router_wireless_52g_mac").textbox({
				fieldLabel: $.su.CHAR.BASIC_NETWORK.MAC,
				labelCls:"xxs",
				readOnly: true
			});

			$("input#router_guest_52g_status").textbox({
				fieldLabel: $.su.CHAR.BASIC_NETWORK.STATUS,
				labelCls:"xxs",
				readOnly: true
			});

			$("#guest_52g_ssid_label").html($.su.CHAR.BASIC_NETWORK.SSID+":");
		};

		interfaces.extendField = function(array){
			var fields = [
				{name: "wireless_5g_2_ssid", mapping: "wireless_5g_2_ssid"},
				{name: "wireless_5g_2_macaddr", mapping: "wireless_5g_2_macaddr"},
				{name: "guest_5g_2_ssid", mapping: "guest_5g_2_ssid"}
			];
			return fields.concat(array);
		};

		interfaces.evLoadData = function(data,onoffTrans){
			var guest_52g_radio_status = data.guest_5g_2_enable;
			if(data.wireless_5g_2_enable.toUpperCase() == 'OFF' || data.guest_5g_2_disabled.toUpperCase() == 'ON'){
				guest_52g_radio_status = 'OFF';
			}
			$("input#router_guest_52g_status").textbox("setValue", onoffTrans(guest_52g_radio_status));
			scheduleModule.resetStatus($("input#router_guest_52g_status"), guest_52g_radio_status);
			
			$("#wireless_52g_ssid").html($.su.func.escapeHtml(data.wireless_5g_2_ssid));
			$("#guest_52g_ssid").html($.su.func.escapeHtml(data.guest_5g_2_ssid));
		};

		interfaces.statusRead = function(data, numberTest, changeIcon){
			if( data.wireless_5g_2_channel.toUpperCase()=='AUTO' ){
				$("input#router_wireless_52g_channel").textbox('setValue', $.su.CHAR.BASIC_NETWORK.AUTO + ' (' + $.su.CHAR.STATUS.CURRENT_CHANNEL + ' ' + data.wireless_5g_2_current_channel + ')');
			}else if( numberTest.validate(data.wireless_5g_2_current_channel) ){
				$("input#router_wireless_52g_channel").textbox('setValue', data.wireless_5g_2_current_channel );
			}else{
				$("input#router_wireless_52g_channel").textbox('setValue', data.wireless_5g_2_channel );
			}

			changeIcon(data.wireless_5g_2_enable, data.wireless_5g_2_disabled, data.wireless_5g_2_encryption, $('div#map_router_52g_img'));
			scheduleModule.resetStatus(data, "52g");
		};

		interfaces.helpInit = function(){
			$("#wifi_triband_title h5").html($.su.CHAR.STATUS.HELP_TRIBAND_WIFI_TITLE);
			$("#guest_triband_title h5").html($.su.CHAR.STATUS.HELP_TRIBAND_GUEST_TITLE);
			$("#wifi_dblband_title").hide();
			$("#guest_dblband_title").hide();
		};
		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.status = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            evLoadData: _fn,
        	statusRead: _fn,
        	switchWirelessCard:_fn,
        	switchGuestCard:_fn
        });

        var scheduleModule = $.su.module.wirelessSchedule.status();
        var wdsModule = $.su.module.wds.status();

		empty.init = function(){
			$("#show_52g_wireless").hide();
			$("#show_52g_guest").hide();
		};

		interfaces.init = function(){
			$("#52g_wds_status").css({
				"display" : "none"
			});

			$("span.seprate_5g").show();
			$("#show_52g_guest").show();

			$('span#show_52g_wireless').html($.su.CHAR.STATUS.HZ52G);
			$('span#show_52g_guest').html($.su.CHAR.STATUS.HZ52G);
			//初始化三频状态
			$('span#show_5g_wireless').html($.su.CHAR.STATUS.HZ51G);
			$('span#show_5g_guest').html($.su.CHAR.STATUS.HZ51G);
			$(".seprate_5g").show();
			$("#show_52g_wireless").show();
			$("#show_52g_guest").show();

			$('label#wireless_52g_ssid_label').html($.su.CHAR.STATUS.NETWORK_NAME_SSID+':');
			$('label#guest_52g_ssid_label').html($.su.CHAR.STATUS.NETWORK_NAME_SSID+':');
			$('label#wireless_52g_channel_label').html($.su.CHAR.STATUS.CHANNEL+':');

			$("input#wireless_52g_radio").textbox({
				fieldLabel: $.su.CHAR.STATUS.RADIO,
				labelCls:"xs",
				readOnly: true
			});
			$("input#wireless_52g_mode").textbox({
				fieldLabel: $.su.CHAR.STATUS.MODE,
				labelCls:"xs",
				readOnly: true
			});
			$("input#wireless_52g_channelwidth").textbox({
				fieldLabel: $.su.CHAR.STATUS.CHANNEL_WIDTH,
				labelCls:"xs",
				readOnly: true
			});
			$("input#wireless_52g_mac").textbox({
				fieldLabel: $.su.CHAR.STATUS.MAC,
				labelCls:"xs",
				readOnly: true
			});
			$("input#wireless_52g_wds").textbox({
				fieldLabel: $.su.CHAR.STATUS.WDS_STATUS,
				labelCls:"xs",
				readOnly: true
			});

			$('span#show_52g_wireless').click(function(){
				$(this).addClass('mode-select');
				$('span#show_24g_wireless').removeClass('mode-select');
				$('span#show_5g_wireless').removeClass('mode-select');
				$('div#wireless_52g').fadeIn(200);
				$('div#wireless_24g').css("display", "none");
				$('div#wireless_5g').css("display", "none");
				$('span#conn_status_wireless_2g').hasClass('hidden')?1:$('span#conn_status_wireless_2g').addClass('hidden');
				$('span#conn_status_wireless_5g').hasClass('hidden')?1:$('span#conn_status_wireless_5g').addClass('hidden');
				$('span#conn_status_wireless_52g').hasClass('hidden')?$('span#conn_status_wireless_52g').removeClass('hidden'):1;
			});

			$("input#guest_52g_name").textbox({
				fieldLabel: $.su.CHAR.STATUS.NAME_SSID,
				labelCls:"m",
				inputCls: "m",
				readOnly: true
			});
			$("input#guest_52g_ssid").textbox({
				fieldLabel: $.su.CHAR.STATUS.HIDE_SSID,
				labelCls:"m",
				inputCls: "m",
				readOnly: true
			});
			$("input#guest_52g_radio").textbox({
				fieldLabel: $.su.CHAR.STATUS.RADIO,
				labelCls:"m",
				inputCls: "m",
				readOnly: true
			});
			$("input#guest_52g_allow").textbox({
				fieldLabel: $.su.CHAR.STATUS.ALLOW_TO_SEE_EACH,
				labelCls:"m",
				inputCls: "m",
				readOnly: true
			});

			$('span#show_52g_guest').click(function(){
				$(this).addClass('mode-select');
				$('span#show_24g_guest').removeClass('mode-select');
				$('span#show_5g_guest').removeClass('mode-select');
				$('div#guest_52g').fadeIn(200);
				$('div#guest_24g').css("display", "none");
				$('div#guest_5g').css("display", "none");
				$('span#conn_status_guest_2g').hasClass('hidden')?1:$('span#conn_status_guest_2g').addClass('hidden');
				$('span#conn_status_guest_5g').hasClass('hidden')?1:$('span#conn_status_guest_5g').addClass('hidden');
				$('span#conn_status_guest_52g').hasClass('hidden')?$('span#conn_status_guest_52g').removeClass('hidden'):1;
			});
		};

		interfaces.extendField = function(array){
			var fields = [
				{name: "wireless_52g_ssid", mapping: "wireless_5g_2_ssid"},
				{name: "wireless_52g_hwmode", mapping: "wireless_5g_2_hwmode"},
				{name: "wireless_52g_htmode", mapping: "wireless_5g_2_htmode"},
				{name: "wireless_52g_macaddr", mapping: "wireless_5g_2_macaddr"},
				{name: "guest_52g_ssid", mapping: "guest_5g_2_ssid"},
				{name: "guest_52g_hidden", mapping: "guest_5g_2_hidden"},
				{name: "guest_52g_enable", mapping: "guest_5g_2_enable"}
			];
			return array.concat(fields);
		}

		interfaces.evLoadData =  function(data){
			var lan_id = "MODE_" + data.wireless_5g_2_hwmode.toUpperCase();
			var str	= $.su.CHAR.WIRELESS[lan_id];
			$("#wireless_52g_mode").val(str);
		};

		interfaces.statusRead = function(data, transChar, numberTest, changeIcon){
			//wireless
			var wireless_52g_radio_status = data.wireless_5g_2_enable;
			if(data.wireless_5g_2_disabled.toUpperCase() == 'ON'){
				wireless_52g_radio_status = 'OFF';
			}
			transChar(wireless_52g_radio_status, 'wireless_52g_radio');
			scheduleModule.resetStatus($("input#wireless_52g_radio"), wireless_52g_radio_status);
			
			//guest
			var guest_52g_radio_status = data.guest_5g_2_enable;
			if(data.wireless_5g_2_enable.toUpperCase() == 'OFF' || data.guest_5g_2_disabled.toUpperCase() == 'ON'){
				guest_52g_radio_status = 'OFF';
			}
			transChar(data.guest_5g_2_hidden, 'guest_52g_ssid');
			transChar(guest_52g_radio_status, 'guest_52g_radio');
			transChar(data.guest_isolate, 'guest_52g_allow');
			scheduleModule.resetStatus($("input#guest_52g_radio"), guest_52g_radio_status);

			//channel
			flag = wdsModule.judgeStatus(data, "52g");
			if(flag){
				$('span#wireless_52g_channel').html( data.wireless_5g_2_current_channel );
			}
			else{
				if( data.wireless_5g_2_channel.toUpperCase()=='AUTO' ){
					if(data.wireless_5g_2_enable.toUpperCase() == 'OFF'){
						$('span#wireless_52g_channel').html("N/A");
					}else{
						$('span#wireless_52g_channel').html($.su.CHAR.STATUS.AUTO + ' (' + $.su.CHAR.STATUS.CURRENT_CHANNEL + ' ' + data.wireless_5g_2_current_channel + ')');
					}
				}else if( numberTest.validate(data.wireless_5g_2_current_channel) ){
					$('span#wireless_52g_channel').html( data.wireless_5g_2_current_channel );
				}else{
					$('span#wireless_52g_channel').html( data.wireless_5g_2_channel );
				}
			}

			//channelwidth
			if( (data.wireless_5g_2_hwmode=='a_5' ) &&  data.wireless_5g_2_htmode.toUpperCase() == 'AUTO' ){
				$('input#wireless_52g_channelwidth').textbox('setValue', '20' + $.su.CHAR.WIRELESS.MHZ);
			}else if( data.wireless_5g_2_htmode.toUpperCase() == 'AUTO' ){
				$('input#wireless_52g_channelwidth').textbox('setValue', $.su.CHAR.STATUS.AUTO);
			}else{
				$('input#wireless_52g_channelwidth').textbox('setValue', data.wireless_5g_2_htmode + $.su.CHAR.WIRELESS.MHZ);
			}

			//wds
			wdsModule.showMode(data, "52g");

			//52g name
			$('span#wireless_52g_name').html($.su.func.escapeHtml(data.wireless_5g_2_ssid));
			$('span#guest_52g_name').html($.su.func.escapeHtml(data.guest_5g_2_ssid));

			//icon
			changeIcon(data.wireless_5g_2_enable, data.wireless_5g_2_disabled, data.wireless_5g_2_encryption, $('span#conn_status_wireless_52g'));
			var guest_52g_radio_icon = data.guest_5g_2_enable;
			if(data.wireless_5g_2_enable.toUpperCase() == 'OFF'){
				guest_52g_radio_icon = 'OFF';
			}
			changeIcon(guest_52g_radio_icon, data.guest_5g_2_disabled, data.guest_2g5g_encryption, $('span#conn_status_guest_52g'));
			scheduleModule.resetIcon(data, changeIcon, "52g");
		};

		interfaces.switchWirelessCard = function(){
			$('span#show_52g_wireless').removeClass('mode-select');
			$('div#wireless_52g').css("display", "none");
			$('span#conn_status_wireless_52g').hasClass('hidden')?1:$('span#conn_status_wireless_52g').addClass('hidden');
		};

		interfaces.switchGuestCard = function(){
			$('span#show_52g_guest').removeClass('mode-select');
			$('div#guest_52g').css("display", "none");
			$('span#conn_status_guest_52g').hasClass('hidden')?1:$('span#conn_status_guest_52g').addClass('hidden');
		};

		interfaces.helpInit = function(){
			$("h4.STATUS_WIRELESS").html($.su.CHAR.STATUS.HELP_TRIBAND_WIFI_TITLE);
			$("h4.STATUS_GUEST").html($.su.CHAR.STATUS.HELP_TRIBAND_GUEST_TITLE);
		};
		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.guestSettings = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            wireless52gProxy : _fn
        });

		var WIRELESS_GUEST_2G_5G_52G_URL_NEW  = $.su.url("/admin/wireless?form=guest_2g&form=guest_5g&form=guest_5g_2&form=guest_2g5g");

		var URL_WIRELESS_52G_NEW = $.su.url("/admin/wireless?form=wireless_5g_2");

		var SYS_WIRELESS_52G_URL_NEW = $.su.url("/admin/wireless?form=syspara_5g_2");

		var sysWireless52gProxy = new $.su.Proxy({
			url: SYS_WIRELESS_52G_URL_NEW
		});

		var wireless52gProxy = new $.su.Proxy({
			url:URL_WIRELESS_52G_NEW
		});

		interfaces.init = function(cur_region_data){
			var channel_52g = cur_region_data.channel_5g_2;
			$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);

			$("input#status_52g").checkbox({
				fieldLabel: $.su.CHAR.GUEST_SETTINGS.WIRELESS_52G_RADIO,
				// cls: "inline",
				tips:"",
				tipsCls:"s",
				labelCls: 'l',
				items: [
					{boxlabel: $.su.CHAR.GUEST_SETTINGS.ENABLE_GUEST,  uncheckedValue:"off", inputValue: "on", id: "chk_enable_guest_52g"}
				]
			});
			$("input#network_name_52g").textbox({
				fieldLabel: $.su.CHAR.GUEST_SETTINGS.NAME_SSID,
				labelCls: "l",
				vtype:{
					vtype:"string_visible_allow_blank",
					maxLength:32
				},
				maxLength:32,
				autoTrim:false,
				tipsCls:"after-checkbox",
				allowBlank:false,
				cls: 'inline-block'
			});
			$("input#hide_ssid_52g").checkbox({
				fieldLabel: null,
				cls: 'inline',
				items:[
					{boxlabel: $.su.CHAR.GUEST_SETTINGS.HIDE_SSID,  uncheckedValue:"off", inputValue:'on' }
				]
			});

			$('#guest_setting_52g').fieldset({
				fields: [
					{name: "guest_5g_2_enable"},
					{name: "guest_5g_2_ssid"},
					{name: "guest_5g_2_hidden"}
				]
			});

			
			var status_label = $($("input#status_5g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");

			status_label.html($.su.CHAR.GUEST_SETTINGS.WIRELESS_51G_RADIO);
			$("#guest_setting_52g").show();
			$("#status_52g").checkbox("enable");
			$("#network_name_52g").textbox("enable");
			$("#hide_ssid_52g").checkbox("enable");

			if($.isEmptyObject(channel_52g))
			{
				$("input#status_52g").checkbox("disable");
				$("input#network_name_52g").textbox("disable");
				$("input#hide_ssid_52g").checkbox("disable");
			}
		};

		interfaces.wireless52gProxy = function(dynamicModule){
			wireless52gProxy.read({},function(data){
				if(typeof data == "undefined"){
					return;
				}
				var wireless_52g_disabled = data.disabled;
				var wireless_52g_disabled_all = data.disabled_all;
				var tempData = data.extinfo || {};
				var wds_guest_compatible = tempData.wds_guest_compatible || "no";

				// if(wireless_52g_disabled == "on"){
				// 	$("#guest_setting_52g").form("disable");
				// 	$("input#guest_2g5g_security").radio("disable");
				// 	$('#guest_2g5g_wpa').fieldset("disable");
				// 	$($("div#guest_2g5g").get(0).submitBtn).addClass("disabled");
				// 	if(data.disabled_by == 0){
				// 		$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);
				// 	}
				// 	else{
				// 		$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE2);
				// 	}
				// 	$("#note_title_all").removeClass("hidden");

				// 	dynamicModule.disable(["input#guest_password_cycle", "input#guest_dynamic_password"]);
				// }else{
					$("#guest_setting_52g").form("enable");
					$("input#guest_2g5g_security").radio("enable");
					$('#guest_2g5g_wpa').fieldset("enable");
					$("input#guest_2g5g_security").trigger("ev_change", ["", $("input#guest_2g5g_security").radio("getValue")]);
					$($("div#guest_2g5g").get(0).submitBtn).addClass("enable");
					$("#note_title_all").addClass("hidden");
					if(wireless_52g_disabled_all == "on"){
						$("#status_52g").checkbox("disable");
						$("#status_52g").checkbox("setTips", $.su.CHAR.WIRELESS.ENABLE_TIPS);
					}else{
						$("#status_52g").checkbox("enable");
						$("#status_52g").checkbox("setTips", "");
						if(wds_guest_compatible == "no"){
							sysWireless52gProxy.read({}, function(data){
								enable = data.enable;
								if(enable == "on"){
									$("input#status_52g").checkbox("disable");
									$("input#status_52g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
								}else{
								}
							});
						}
					}

					dynamicModule.enable(["input#guest_password_cycle", "input#guest_dynamic_password"]);
				// }
			});
		};

		interfaces.extendField = function(array){
			var fields = [
				{name: "guest_5g_2_enable"},
				{name: "guest_5g_2_ssid"},
				{name: "guest_5g_2_hidden"}
			];

			return array.concat(fields);
		};

		interfaces.changeProxy = function(){
			var guest2g5g52gProxy = new $.su.Proxy({
				url: WIRELESS_GUEST_2G_5G_52G_URL_NEW
			});
			return guest2g5g52gProxy;
		};

		interfaces.helpInit = function(){
			$("h4.GUEST_NETWORK_WIRELESS").html($.su.CHAR.GUEST_SETTINGS.HELP_TRIBAND_GUEST_TITLE);
		};

		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.systemParameters = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            setFiredArray : returnGet,
			initEnable : _fn,
			wds5g_Disable52g : _fn,
			wds_Enable52g : _fn,
			wds2g_Disable52g : _fn,
			wireless52gProxy : _fn,
			setWdsBandExist : returnGet,
			wds52gInit: _fn
        });

        var wdsModule = $.su.module.wds.systemParameters();

		var WIRELESS_GUEST_52G_URL_NEW = $.su.url("/admin/wireless?form=guest_5g_2");

		var SYS_WIRELESS_52G_URL_NEW = $.su.url("/admin/wireless?form=syspara_5g_2");
		var SYS_SURVEY_52G_URL_NEW = $.su.url("/admin/wireless?form=survey_5g_2");
		var URL_WIRELESS_52G_NEW = $.su.url("/admin/wireless?form=wireless_5g_2");

		var wds_52g = "";
		var wire_channel_52g = 0;
		var sys_slt_52g = 0;

		var wireless_52g_disabled = "off";
		var wireless_52g_disabled_all = "off";
		var w52g_wds_disabled = "off";

		var wds_52g_disable_step1 =  false;
		var wds_52g_disable_step2 =  false;
		var wds_52g_disable_step3 =  false;

		var wds_52g_enable = false;

		var guest52gProxy = new $.su.Proxy({
			url: WIRELESS_GUEST_52G_URL_NEW
		});

		var wireless_52g_proxy = new $.su.Proxy({
			url: URL_WIRELESS_52G_NEW,
			eventId:"wireless_52g"
		});

		function disable52g(wds_52g_disable_step1,wds_52g_disable_step2){
			$("form#w52g-wds-setting").form("disable");
			if(!wds_52g_disable_step1 && !wds_52g_disable_step2)
			{
				$("input#enable_52g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE);
			}
		}

		var survey_store_52g = null;

		interfaces.init = function(){
			//WDS
			//name Changed because of 52g
			// $("div#w5g-wds").get(0)._title = $.su.CHAR.SYSPARA.W51G_WDS;
			// $("div#w5g").get(0)._title = $.su.CHAR.SYSPARA.W51G;
			$("div#w5g-wds").panel("setTitle", $.su.CHAR.SYSPARA.W51G_WDS);
			$("div#w5g").panel("setTitle", $.su.CHAR.SYSPARA.W51G);


			$("#w52g").show();
			//5G_2
			$("div#w52g").panel({
				title: $.su.CHAR.SYSPARA.W52G,
				collapsible: false
			});

			$("input#beacon_int_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.BEACON,
				tips:$.su.CHAR.SYSPARA.BEACONUNIT,
				inputCls:'m',
				tipsCls:'xs',
				vtype:{
					vtype:"number",
					min:40,
					max:1000
				},
				maxLength:4,
				textFormat:$.su.format.number,
				min:40,
				max:1000,
				allowBlank:false,
				labelCls:'l'
			});

			$("input#rts_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.RTS,
				tips:$.su.CHAR.SYSPARA.RTSUNIT,
				inputCls:'m',
				tipsCls:'xs',
				vtype:{
					vtype:"number",
					min:1,
					max:2346
				},
				maxLength:4,
				textFormat:$.su.format.number,
				min:1,
				max:2346,
				allowBlank:false,
				labelCls:'l'
			});


			$("input#dtim_period_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.DTIM,
				tips:$.su.CHAR.SYSPARA.DTIMUNIT,
				inputCls:'m',
				tipsCls:'xs',
				vtype:{
					vtype:"number",
					min:1,
					max:15
				},
				maxLength:2,
				textFormat:$.su.format.number,
				min:1,
				max:15,
				allowBlank:false,
				labelCls:'l'
			});

			$("input#wpa_group_rekey_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.GROUP,
				tips:$.su.CHAR.SYSPARA.GROUPUNIT,
				inputCls:'m',
				tipsCls:'xs',
				vtype:"number",
				textFormat:$.su.format.number,
				allowBlank:false,
				maxLength:5,
				invalidText: $.su.CHAR.ERROR["00000039"],
				validator: function(val){
					if(val == 0)
					{
						return true;
					}

					if((val >= 30) && (val <= 86400))
					{
						return true;
					}
					return false;
				},
				labelCls:'l'
			});

			$("input#wmm_52g").checkbox({
				fieldLabel: $.su.CHAR.SYSPARA.WMM_FEATURE,
				labelCls:'l',
				cls:"part-separate",
				items: [
					{boxlabel: $.su.CHAR.SYSPARA.WMM, uncheckedValue:"off", inputValue: "on"}
				]
			});

			$("input#shortgi_52g").checkbox({
				fieldLabel: $.su.CHAR.SYSPARA.GI_FEATURE,
				labelCls:'l',
				items: [
					{boxlabel: $.su.CHAR.SYSPARA.GI, uncheckedValue:"off", inputValue: "on"}
				]
			});

			$("input#isolate_52g").checkbox({
				fieldLabel: $.su.CHAR.SYSPARA.AP_FEATURE,
				labelCls:'l',
				items: [
					{boxlabel: $.su.CHAR.SYSPARA.AP, uncheckedValue:"off", inputValue: "on"}
				]
			});

			$("span#note_title_52g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);

			$("#ssid_cnt_52g").fieldset({
				fields: [
					{name: "ssid"},
					{name: "bssid"},
					{name: "wds_mode"},
					{name: "encryption"}
				]
			}).hide();

			if($.su.module.support_wds_show){
				$("#w52g-wds").css({
					"display" : "block"
				});
			}
			
			var ipv4Proxy = new $.su.Proxy({
				url: SYS_WIRELESS_52G_URL_NEW
			});

			$("form#w52g-setting").form({
				proxy: ipv4Proxy,
				fields: [
					{name: "beacon_int", mapping: "beacon_int"},
					{name: "rts", mapping: "rts"},
					{name: "frag", mapping: "frag"},
					{name: "dtim_period", mapping: "dtim_period"},
					{name: "wpa_group_rekey", mapping: "wpa_group_rekey"},
					{name: "wmm", mapping: "wmm"},
					{name: "shortgi", mapping: "shortgi"},
					{name: "enable", mapping: "enable"},
					{name: "ssid", mapping: "ssid"},
					{name: "wds_mode", mapping: "wds_mode"},
					{name: "bssid", mapping: "bssid"},
					{name: "encryption", mapping: "encryption"},
					{name: "psk_key", mapping: "psk_key"},
					{name: "wep_key1", mapping: "wep_key1"},
					{name: "wep_key2", mapping: "wep_key2"},
					{name: "wep_key3", mapping: "wep_key3"},
					{name: "wep_key4", mapping: "wep_key4"},
					{name: "isolate", mapping: "isolate"},
					{name: "wep_format1", mapping: "wep_format1"},
					{name: "wep_format2", mapping: "wep_format2"},
					{name: "wep_format3", mapping: "wep_format3"},
					{name: "wep_format4", mapping: "wep_format4"},
					{name: "wep_select", mapping: "wep_select"},
					{name: "wep_mode", mapping: "wep_mode"}
				],
				submitBtn: "default"
			});

			survey_store_52g = new $.su.Store({
				proxy: {
					url: SYS_SURVEY_52G_URL_NEW,
					timeout:30000
				},
				fields: [
					{name: "bssid"},
					{name: "ssid"},
					{name: "signal"},
					{name: "channel"},
					{name: "encryption"}
				],
				autoLoad: false
			});

			var grid_suvery_52g = $("div#result_52g").grid({
				store:survey_store_52g,
				minLines:0,
				maxLines:5,
				columns: [
					{
						text: $.su.CHAR.GRID.ID,
						xtype: "rownumberer",
						width:40
					},
					{
						text: $.su.CHAR.SYSPARA.SSID,
						width:130,
						dataIndex: "ssid"
					},
					{
						text: $.su.CHAR.SYSPARA.MAC_ADDRESS,
						width:140,
						dataIndex: "bssid"
					},
					{
						text: $.su.CHAR.SYSPARA.SIGNAL,
						width:100,
						dataIndex: "signal",
						renderer: function(data){
							var inHTML = "";
							var realSig = parseInt(data);
							inHTML += "<span class=\"signal-level-" + signal_level(realSig) + " signal-icon\"></span>";
							return inHTML;
						}
					},
					{
						text: $.su.CHAR.SYSPARA.CHANNEL,
						width:100,
						dataIndex: "channel"
					},
					{
						text: $.su.CHAR.SYSPARA.SECURITY,
						width:100,
						dataIndex: "encryption",
						renderer:function(val)
						{
							if( val.toUpperCase()=='NONE' ){
								return $.su.CHAR.SYSPARA.NONE;
							}else{
								return val.toUpperCase();
							}
						}
					},
					{
						text: $.su.CHAR.GRID.OPERATION,
						renderer:function(e, index, obj){
							return "<a href=\"void(0);\" index=\""+index+"\" class=\"choose\" >"+$.su.CHAR.OPERATION.CHOOSE+"</a>"
						}
					}
				],
				operation: [{
					xtype: "totalCount",
					cls:"left",
					fieldLabel: $.su.CHAR.SYSPARA.AP_NUMBER
				},{
					xtype: "button",
					text: $.su.CHAR.OPERATION.REFRESH,
					id:"refreshBtn_52g",
					iconCls:"btn-refresh",
					handler:function(e){
						e.stopPropagation();
						e.preventDefault();
						$("#refreshBtn_52g").button("disable");
						grid_suvery_52g.grid("runProgress");
						grid_suvery_52g.grid("getStore").load({}, function(){
							grid_suvery_52g.grid("prompt", true);
							$("#refreshBtn_52g").button("enable");
						}, function(){
							grid_suvery_52g.grid("prompt", false);
							$("#refreshBtn_52g").button("enable");
						}, function(){
							grid_suvery_52g.grid("prompt", false);
							$("#refreshBtn_52g").button("enable");
						});
						return true;
					}
				}
				]
			}).on("ev_load", function(e, arr){
				var me = $(this);
				$(arr).each(function(index,data){
					var encryption = data.encryption.toUpperCase();
					if( encryption != "NONE" &&  encryption != "WEP" &&  encryption != "PSK")
					{
						me.grid("disableRow", index);
					}
				})

			});

			$("div#result_52g").delegate("a.choose","click",function(e){
				var store = $("div#result_52g").grid("getStore");
				var index = $(this).attr("index");
				e.preventDefault();
				var tr = $(this).parents("tr.grid-content-tr")[0];
				var bssid = store.data[index].bssid;
				var ssid = store.data[index].ssid;
				var channel = store.data[index].channel;
				sys_slt_52g = channel;
				var encryption = store.data[index].encryption;
				if( encryption != "none" &&  encryption != "wep" &&  encryption != "psk")
				{
					return;
				}
				$("input#ssid_52g").textbox("setValue", ssid);
				$("input#bssid_52g").textbox("setValue", bssid);
				$("#encryption_52g").radio("setValue", encryption);
				$("div#survey").msg("close");
			});

			

			$("#notice_content_52g").html($.su.CHAR.SYSPARA.NOTICE);

			$("#notice_52g").msg({
				autoshow:false,
				cls:"xl",
				okHandler:function(){
					$("#w52g-setting").form("submit");
				},
				cls:"m warning",
				cancelHandler:function(){
					return true;
				},
				type: "prompt"
			});
		};

		interfaces.wds52gInit = function(initEnable,wds_2g_disable_step1,wds_2g_disable_step2,wds_2g_disable_step3,wds_5g_disable_step1,wds_5g_disable_step2,wds_5g_disable_step3){

			var wds_mode_show = false;
			$("div#w52g-wds").panel({
				title: $.su.CHAR.SYSPARA.W52G_WDS,
				collapsible: false
			});

			$("input#enable_52g").checkbox({
				fieldLabel:$.su.CHAR.SYSPARA.WDS_FEATURE,
				labelCls:'l',
				cls:"part-separate",
				tips:"",
				tipsCls:"m",
				items: [
					{boxlabel: $.su.CHAR.SYSPARA.WDS, uncheckedValue:"off", inputValue: "on"}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				var val = (newValue[0]=="enable"||newValue[0]=="on") ? "on" : "off";
				var enc = $("input#encryption_52g").radio("getValue");
				var key = $("input#wep_select_52g").combobox("getValue")[0];

				var cnt = $("input#enable_52g").checkbox("getContainer");
				var isDisabled = $(cnt).hasClass("disabled");
				switch(val)
				{
					case "on":
						if(isDisabled)
						{
							return;
						}
						$("#ssid_cnt_52g").fieldset("show");
						$("#wpa_cnt_52g").fieldset((enc == "psk") ? "show" : "hide");
						$("#wep_cnt_52g").fieldset((enc == "wep") ? "show" : "hide");
						$('#key1_cnt_52g').fieldset(((enc == "wep") && key=='1') ? "show":"hide");
						$('#key2_cnt_52g').fieldset(((enc == "wep") && key=='2') ? "show":"hide");
						$('#key3_cnt_52g').fieldset(((enc == "wep") && key=='3') ? "show":"hide");
						$('#key4_cnt_52g').fieldset(((enc == "wep") && key=='4') ? "show":"hide");
						break;
					case "off":
						$("#ssid_cnt_52g").fieldset("hide");
						$("#wep_cnt_52g").fieldset("hide");
						$("#wpa_cnt_52g").fieldset("hide");
						$('#key1_cnt_52g').fieldset("hide");
						$('#key2_cnt_52g').fieldset("hide");
						$('#key3_cnt_52g').fieldset("hide");
						$('#key4_cnt_52g').fieldset("hide");
						break;
				}
			});

			$("input#ssid_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.SSID_BRIDEGE,
				labelCls:'l',
				vtype:"string_visible_allow_blank",
				allowBlank:false,
				maxLength:32,
				autoTrim:false,
				cls:"inline"
			});

			$("button#syspara_survey_52g").button({
				text:$.su.CHAR.SYSPARA.SURVEY,
				handler:function(){
					$("div#result_2g").hide();
					$("div#result_5g").hide();
					$("div#result_52g").show();
					$("div#result_52g").grid("runProgress");
					$("#refreshBtn_52g").button("disable");
					survey_store_52g.load({}, function(){
						$("div#result_52g").grid("prompt", true);
						$("#refreshBtn_52g").button("enable");
					});
					$("div#survey").msg("show");
				},
				cls:"inline-block more_pad ml5"
			});

			$("input#bssid_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.MAC,
				vtype:"mac",
				maxLength:17,
				allowBlank:false,
				labelCls:'l',
				tips:$.su.CHAR.SYSPARA.MACUNIT
			});

			$("#wds_mode_52g").combobox({
				fieldLabel: $.su.CHAR.SYSPARA.WDS_MODE,
				labelCls: "l",
				items: [
					{"value": "2", "name": $.su.CHAR.SYSPARA.AUTO},
					{"value": "1", "name": $.su.CHAR.SYSPARA.WDS1},
					{"value": "0", "name": $.su.CHAR.SYSPARA.WDS2}
				]
			});

			$("input#encryption_52g").radio({
				fieldLabel: $.su.CHAR.WIRELESS.SECURITY,
				columns:3,
				labelCls: "l",
				cls:"part-separate",
				items:[
					{boxlabel: $.su.CHAR.SYSPARA.NONE, inputValue: 'none'},
					{boxlabel: $.su.CHAR.SYSPARA.WPA, inputValue: 'psk'},
					{boxlabel: $.su.CHAR.SYSPARA.WEP, inputValue: 'wep'}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				var key = $("input#wep_select_52g").combobox("getValue")[0];
				$("#wpa_cnt_52g").fieldset((newValue == "psk") ? "show" : "hide");
				$("#wep_cnt_52g").fieldset((newValue == "wep") ? "show" : "hide");
				$('#key1_cnt_52g').fieldset(((newValue == "wep") && key=='1') ? "show":"hide");
				$('#key2_cnt_52g').fieldset(((newValue == "wep") && key=='2') ? "show":"hide");
				$('#key3_cnt_52g').fieldset(((newValue == "wep") && key=='3') ? "show":"hide");
				$('#key4_cnt_52g').fieldset(((newValue == "wep") && key=='4') ? "show":"hide");
			});


			$("input#psk_key_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
				maxLength:64,
				autoTrim:false,
				labelCls:'l'
			});

			$("#wpa_cnt_52g").fieldset({
				fields: [
					{name: "psk_key"}
				]
			});

			$("#wep_cnt_52g").fieldset({
				fields: [
					{name: "wep_select"},
					{name: "wep_mode"}

				]
			}).hide();


			$("input#wep_mode_52g").radio({
				fieldLabel: $.su.CHAR.SYSPARA.AUTH_TYPE,
				labelCls: "l",
				columns:3,
				items:[
					{boxlabel: $.su.CHAR.SYSPARA.AUTO, inputValue: 'auto'},
					{boxlabel: $.su.CHAR.SYSPARA.OPEN, inputValue: 'open', checked:true},
					{boxlabel: $.su.CHAR.SYSPARA.SHARED, inputValue: 'shared'}
				]
			});

			

			$("#key1_cnt_52g").fieldset({
				fields: [
					{name: "wep_format1"},
					{name: "wep_key1"}
				]
			}).hide();

			$("#key2_cnt_52g").fieldset({
				fields: [
					{name: "wep_format2"},
					{name: "wep_key2"}
				]
			}).hide();

			$("#key3_cnt_52g").fieldset({
				fields: [
					{name: "wep_format3"},
					{name: "wep_key3"}
				]
			}).hide();

			$("#key4_cnt_52g").fieldset({
				fields: [
					{name: "wep_format4"},
					{name: "wep_key4"}
				]
			}).hide();

			$("input#wep_key1_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
				maxLength:32,
				autoTrim:false,
				labelCls:'l'
			});

			$("input#wep_key2_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
				maxLength:32,
				autoTrim:false,
				labelCls:'l'
			});

			$("input#wep_key3_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
				maxLength:32,
				autoTrim:false,
				labelCls:'l'
			});

			$("input#wep_key4_52g").textbox({
				fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
				maxLength:32,
				autoTrim:false,
				labelCls:'l'
			});


			$("input#wep_format1_52g").radio({
				fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
				columns:3,
				labelCls: "l",
				items:[
					{boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
				]
			});

			$("input#wep_format2_52g").radio({
				fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
				columns:3,
				labelCls: "l",
				items:[
					{boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
				]
			});

			$("input#wep_format3_52g").radio({
				fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
				columns:3,
				labelCls: "l",
				items:[
					{boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
				]
			});

			$("input#wep_format4_52g").radio({
				fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
				columns:3,
				labelCls: "l",
				items:[
					{boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
					{boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
				]
			});

			$("input#wep_select_52g").combobox({
				fieldLabel: $.su.CHAR.SYSPARA.WEP_INDEX,
				labelCls: "l",
				items: [
					{"value": "1", "name": $.su.CHAR.SYSPARA.KEY1},
					{"value": "2", "name": $.su.CHAR.SYSPARA.KEY2},
					{"value": "3", "name": $.su.CHAR.SYSPARA.KEY3},
					{"value": "4", "name": $.su.CHAR.SYSPARA.KEY4}
				]
			}).on("ev_change", function(e, oldValue, newValue){
				var sec = $("input#encryption_52g").radio("getValue");
				var key = newValue[0];
				$("#wpa_cnt_52g").fieldset((sec == "psk") ? "show" : "hide");
				$("#wep_cnt_52g").fieldset((sec == "wep") ? "show" : "hide");
				$('#key1_cnt_52g').fieldset(((sec == "wep") && key=='1') ? "show":"hide");
				$('#key2_cnt_52g').fieldset(((sec == "wep") && key=='2') ? "show":"hide");
				$('#key3_cnt_52g').fieldset(((sec == "wep") && key=='3') ? "show":"hide");
				$('#key4_cnt_52g').fieldset(((sec == "wep") && key=='4') ? "show":"hide");
			});

			$("input#wep_select_52g").combobox("hide");
			$("input#wep_select_52g").combobox("setValue", "1");

			var ipv4Wds52gProxy = new $.su.Proxy({
				url: SYS_WIRELESS_52G_URL_NEW
			});

			var disableSurveyId_52g = false;
			$("form#w52g-wds-setting").form({
				proxy: ipv4Wds52gProxy,
				fields: [
					{name: "enable", mapping: "enable"},
					{name: "ssid", mapping: "ssid"},
					{name: "wds_mode", mapping: "wds_mode"},
					{name: "bssid", mapping: "bssid"},
					{name: "encryption", mapping: "encryption"},
					{name: "psk_key", mapping: "psk_key"},
					{name: "wep_key1", mapping: "wep_key1"},
					{name: "wep_key2", mapping: "wep_key2"},
					{name: "wep_key3", mapping: "wep_key3"},
					{name: "wep_key4", mapping: "wep_key4"},
					{name: "isolate", mapping: "isolate"},
					{name: "wep_format1", mapping: "wep_format1"},
					{name: "wep_format2", mapping: "wep_format2"},
					{name: "wep_format3", mapping: "wep_format3"},
					{name: "wep_format4", mapping: "wep_format4"},
					{name: "wep_select", mapping: "wep_select"},
					{name: "wep_mode", mapping: "wep_mode"},
					{name: "syspara_survey"}
				],
				validator:function(){
					var enable_52g = $("input#enable_52g").checkbox("getValue");
					var ssid = $("input#ssid_52g").textbox("getValue");
					var mac = $("input#bssid_52g").textbox("getValue");
					if(enable_52g == "enable")
					{
						if((ssid == "") && (mac == ""))
						{
							$("input#ssid_52g").textbox("setError",$.su.CHAR.ERROR["00000040"]);
							return false;
						}
					}

					var encryption = $("input#encryption_52g").radio("getValue");

					if(encryption == "none")
					{
						return true;
					}
					if(encryption == "psk")
					{
						var val = $("input#psk_key_52g").textbox("getValue");
						var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
						if(reg.test(val))
						{
							$("input#psk_key_52g").textbox("setNormal");
							return true;
						}
						else
						{
							$("input#psk_key_52g").textbox("setError",$.su.CHAR.ERROR["00000066"]);
							return false;
						}
					}
					if(encryption == "wep")
					{
						var keyIndex_arr = $("input#wep_select_52g").combobox("getValue");
						var keyIndex = keyIndex_arr[0];
						var id  = "input#wep_key" + keyIndex + "_52g";
						var formatId = "input#wep_format" + keyIndex + "_52g";
						var format = $(formatId).radio("getValue");

						var val = $(id).textbox("getValue");
						var asc_reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}|[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13})$/;
						var hex_reg = /^([0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/;
						if(format == "asic")
						{
							if(asc_reg.test(val))
							{
								$(id).textbox("setNormal");
								return true;
							}
							else
							{
								$(id).textbox("setError",$.su.CHAR.ERROR["00000120"]);
								return false;
							}
						}
						else
						{
							if(hex_reg.test(val))
							{
								$(id).textbox("setNormal");
								return true;
							}
							else
							{
								$(id).textbox("setError",$.su.CHAR.ERROR["00000121"]);
								return false;
							}
						}
					}
				},
				submitBtn: "default"
			}).on("ev_loadData", function(e, data){
				$("form#w24g-wds-setting").form("enable");
				$("form#w5g-wds-setting").form("enable");
				initEnable();
				var wds2g_wds5g_compatible = $.su.module.wds2g_wds5g_compatible || "no";
				var wds_2g_enable = wdsModule.getWdsData("wds_2g_enable");
				var wds_5g_enable = wdsModule.getWdsData("wds_5g_enable");
				if(wds2g_wds5g_compatible == "no")
				{
					wds_52g = data.enable;
					if(wds_52g == "on")
					{
						wds_52g_enable = true;
						$("form#w24g-wds-setting").form("disable");
						if(!wds_2g_disable_step1 && !wds_2g_disable_step2)
						{
							$("input#enable_2g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE);
						}
						$("form#w5g-wds-setting").form("disable");
						if(!wds_5g_disable_step1 && !wds_5g_disable_step2)
						{
							$("input#enable_5g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE);
						}
					}
					else
					{
						wds_52g_enable = false;
						var wds_enable_band_exist = wds_2g_enable || wds_5g_enable;
						if(!wds_2g_disable_step1 && !wds_2g_disable_step2 && !wds_2g_disable_step3 && !wds_enable_band_exist)
						{
							$("form#w24g-wds-setting").form("enable");
							$("input#enable_2g").checkbox("setTips", "");
						}
						if(!wds_5g_disable_step1 && !wds_5g_disable_step2 && !wds_5g_disable_step3 && !wds_enable_band_exist)
						{
							$("form#w5g-wds-setting").form("enable");
							$("input#enable_5g").checkbox("setTips", "");
						}
					}
				}

				if($.su.module.support_wds_dualmode){
					wds_mode_show = false;
					$("#wds_mode_52g").combobox("disable");
					$("#wds_mode_52g").combobox("hide");
				}
				w52g_wds_disabled = data.disabled;
			}).on("beforeSubmit", function(){
				if($("form#w52g-wds-setting").form("validate")){
					$("form#w24g-wds-setting").form("disable");
					$("form#w5g-wds-setting").form("disable");
					var enable = $("#enable_52g").checkbox("getValue");
					if(enable.length){
						$("#enable_2g").checkbox("setValue","off");
						$("#enable_5g").checkbox("setValue","off");
						$("#syspara_survey_52g").button("disable");
						clearTimeout(disableSurveyId_52g);
						var disableSurveyId_52g = setTimeout(function(){
							$("#syspara_survey_52g").button("enable");
						},6000);
					}
				}
			});

			return wds_mode_show;
		};

		interfaces.setFiredArray = function(array){
			var firedArray = ["wireless_52g"];
			return array.concat(firedArray);
		};

		interfaces.initEnable = function(){
			if(wds_52g_enable){
				$("form#w24g-wds-setting").form("disable");
				$("form#w5g-wds-setting").form("disable");
				if(wds_52g_disable_step1 || wds_52g_disable_step2 || wds_52g_disable_step3){
					$("form#w52g-wds-setting").form("disable");
				}
				return;
			}
		};

		interfaces.wds5g_Disable52g = function(wds_2g_disable_step1,wds_2g_disable_step2){
			$("form#w24g-wds-setting").form("disable");
			if(!wds_2g_disable_step1 && !wds_2g_disable_step2)
			{
				$("input#enable_2g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE);
			}
			disable52g(wds_52g_disable_step1,wds_52g_disable_step2);
		};

		interfaces.wds_Enable52g = function(wds_enable_band_exist){
			if(!wds_52g_disable_step1 && !wds_52g_disable_step2 && !wds_52g_disable_step3 && !wds_enable_band_exist)
			{
				$("form#w52g-wds-setting").form("enable");
				$("input#enable_52g").checkbox("setTips", "");
			}
		};

		interfaces.wds2g_Disable52g = function(wds_5g_disable_step1,wds_5g_disable_step2){
			$("form#w5g-wds-setting").form("disable");
			if(!wds_5g_disable_step1 && !wds_5g_disable_step2)
			{
				$("input#enable_5g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE);
			}
			disable52g(wds_52g_disable_step1,wds_52g_disable_step2);
		};

		interfaces.wireless52gProxy = function(){
			wireless_52g_proxy.read({},function(data){
				$("div#feature52g_container").show();
				if(typeof data == "undefined")
				{
					return;
				}
				var tempData = data.extinfo || {};
				var wds_guest_compatible = tempData.wds_guest_compatible || "no";

				wire_channel_52g = data.channel;
				wireless_52g_disabled = data.disabled;
				wireless_52g_disabled_all = data.disabled_all;

				$("input#shortgi_52g").checkbox('enable');
				if(data.hwmode == 'a_5'){
					$("input#shortgi_52g").checkbox('disable');
				}
				
				// if(wireless_52g_disabled == "on")
				// {
				// 	wds_52g_disable_step1 = true;
				// 	//$("form#w52g-setting").form("disable");
				// 	//$("#syspara_survey_52g").button("disable");
				// 	//$("#note_title_52g").removeClass("hidden");
				// }
				// else
				// {
					//$("#note_title_52g").addClass("hidden");
					if(wireless_52g_disabled_all == "on")
					{
						wds_52g_disable_step2 = true;
						$("input#enable_52g").checkbox("disable");
						$("form#w52g-wds-setting").form("disable");
						$("input#enable_52g").checkbox("setTips", $.su.CHAR.SYSPARA.ENABLE_TIPS);
						$("#ssid_cnt_52g").fieldset("hide");
					}
					else
					{
						if($("input#enable_52g").checkbox("getValue")[0] == "enable")
						{
							$("#ssid_cnt_52g").fieldset("show");
						}
						if(wds_guest_compatible == "no")
						{
							guest52gProxy.read({}, function(data){
								var tempData = data.extinfo || {};
								var wds_guest_compatible = tempData.wds_guest_compatible || "no";
								var enable = data.enable;
								if(wds_guest_compatible == "no")
								{
									if(enable == "on")
									{
										wds_52g_disable_step3 = true;
										$("input#enable_52g").checkbox("disable");
										$("input#enable_52g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
										$("form#w52g-wds-setting").form("disable");
                    					$("#ssid_cnt_5g").fieldset("hide");
									}
								}
							});
						}
					}
				// }
				// if(w52g_wds_disabled == "on"){
				// 	$("form#w52g-wds-setting").form("disable");
				// 	$("#syspara_survey_52g").button("disable");
				// 	$("#wds_note_title_52g").removeClass("hidden");
				// }
			});
		};

		interfaces.helpInit = function(){
			$("#help_syspara_wifi_title h5.title").html($.su.CHAR.SYSPARA.HELP_TRIBAND_WIFI_TITLE);
			$("#help_syspara_wds_title h5.title").html($.su.CHAR.SYSPARA.HELP_TRIBAND_WDS_TITLE);
		};

		interfaces.setWdsBandExist = function(wds_2g_enable){
			return wds_2g_enable || wds_52g_enable;
		};
		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.quickSetup = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            check52gRegionEnable : _fn,
			overWriteData : _fn,
			formLoadData : _fn,
			setWireless52g : _fn,
			htmlReplaceText : _fn,
			pswVertify : returnGet,
			encryptVertify : returnGet,
			htmlReplaceText : _fn,
			step4GetRes : returnGet,
			wirelessGoNext : returnGet,
			form2g5g_prepare_func : returnGet,
			wirelessStatusSet : _fn,
			hideEncryp52g : _fn,
			tribandVal : _fn,
			extendObj : _fn,
			changeStepStatus: _fn
        });

		var encryption_52g = "";
		var wep_select_52g =  "";
		var wep_format_52g =  "";
		var wep_type_52g =  "";
		var wireless_52g_region_enable = true;
		var v9 = false;
		var v10 = false;

		empty.doubleThridChange = function(){
			$("#encryption_52g_notice").css("display", "none");
			$("#display-wireless-52g-container-summary").hide();
			$("#quicksetup-wireless-settings-52g").hide();
			$("#quicksetup-summary52g-ssid").hide();

			$("#chk-enable-wireless-radio-52g").checkbox("disable");
			$("#txt-wireless-name-ssid-52g").textbox("disable");
			$("#chk-wireless-enable-ssid-52g").checkbox("disable");
			$("#txt-wireless-password-52g").textbox("disable");
			$("#wireless_52g_encryption").prop("disabled",true);
			$("#wireless_52g_region_enable").prop("disabled",true);
			$("#wireless_52g_disabled_all").prop("disabled",true);
		};

		interfaces.init = function(setButtonStatus){
			//5g_2
			$("input#chk-enable-wireless-radio-52g").checkbox({
				fieldLabel: $.su.CHAR.QUICK_SETUP.WIRELESS_52GHZ,
				cls:"part-separate",
				labelCls: "l",
				items: [
					{boxlabel: $.su.CHAR.QUICK_SETUP.ENABLE_WIRELESS_RADIO, uncheckedValue:"off", inputValue: "on", id: "chk_enable_wireless_52g"}
				]
			}).on("ev_change", function(e, vOld, vNew){
				if (vNew.length == 0){
					$("input#wireless_52g_disabled_all").val("on");
				}else{
					$("input#wireless_52g_disabled_all").val("off");
				};
			});
			$("input#txt-wireless-name-ssid-52g").textbox({
				fieldLabel: $.su.CHAR.QUICK_SETUP.NAME_SSID,
				cls: "inline-block",
				vtype:"string_visible_allow_blank",
				maxLength:32,
				allowBlank:false,
				autoTrim:false,
				labelCls: "l"
			}).on("ev_change", setButtonStatus.step4);
			$("input#chk-wireless-enable-ssid-52g").checkbox({
				fieldLabel: null,
				cls: "inline-block",
				items: [
					{boxlabel: $.su.CHAR.BASIC_WIRELESS.HIDE_SSID,  uncheckedValue:"off", inputValue: "on", id: "chk_enable_ssid_broadcast_52g"}
				]
			});
			$("input#txt-wireless-password-52g").textbox({
				fieldLabel: $.su.CHAR.QUICK_SETUP.PASSWORD,
				autoTrim:false,
				labelCls: "l",
				maxLength: 64
			}).on("ev_change", setButtonStatus.step4);


			$("h4#display-title-wireless-52g-summary").html($.su.CHAR.QUICK_SETUP.WIRELESS_52GHZ);

			$("input#display-wireless-enable-52g-summary").textbox({
				fieldLabel: $.su.CHAR.QUICK_SETUP.WIRELESS_52GHZ,
				readOnly: true,
				cls: "display-wireless-enable-summary",
				labelCls: "l"
			});

			$("#display-wireless-name-ssid-52g-summary_label").html($.su.CHAR.QUICK_SETUP.NAME_SSID + ":");
			$("#display-wireless-password-52g-summary_label").html($.su.CHAR.QUICK_SETUP.PASSWORD + ":");

			$("#reconnect-network-wireless-ssid-52g_label").html($.su.CHAR.QUICK_SETUP.WIRELESS_52GHZ_SSID + ":");
			$("#reconnect-network-wireless-password-52g_label").html($.su.CHAR.QUICK_SETUP.WIRELESS_52GHZ_PASSWORD + ":");

			$("#chk-enable-wireless-radio-52g").checkbox("enable");

		};

		interfaces.extendObj = function(obj){
			var temp = {
				enable52g: "",
			    ssid52g: "",
			    pwd52g: "",
			    hide52g: "",
			    wireless_52g_disable: ""
			};

			obj = $.extend(obj,temp);
		};

		interfaces.check52gRegionEnable = function(){
			if (wireless_52g_region_enable == false) {
				$("input#chk-enable-wireless-radio-52g").checkbox("setValue", "off").checkbox("disable");
				$("input#txt-wireless-name-ssid-52g").textbox("disable");
				$("input#chk-wireless-enable-ssid-52g").checkbox("disable");
				$("input#txt-wireless-password-52g").textbox("disable");
			}
		};

		interfaces.overWriteData = function(wireless_enable,wireless_name,hide_ssid,wireless_password, wireless_encryption, wireless_disabled_all){
			$("#chk-enable-wireless-radio-52g").checkbox("setValue",wireless_enable);
			$("#txt-wireless-name-ssid-52g").textbox("setValue",wireless_name);
			$("#chk-wireless-enable-ssid-52g").checkbox("setValue",hide_ssid);
			$("#txt-wireless-password-52g").textbox("setValue",wireless_password);

			$("#wpa_key_52g").val( $("#wpa_key_2g").val() ).prop( "disabled",$("#wpa_key_2g").prop("disabled") );
			$("#psk_key_52g").val( $("#psk_key_2g").val() ).prop( "disabled",$("#psk_key_2g").prop("disabled") );

			$("#wep_key1_52g").val( $("#wep_key1_2g").val() ).prop( "disabled",$("#wep_key1_2g").prop("disabled") );
			$("#wep_key2_52g").val( $("#wep_key2_2g").val() ).prop( "disabled",$("#wep_key2_2g").prop("disabled") );
			$("#wep_key3_52g").val( $("#wep_key3_2g").val() ).prop( "disabled",$("#wep_key3_2g").prop("disabled") );
			$("#wep_key4_52g").val( $("#wep_key4_2g").val() ).prop( "disabled",$("#wep_key4_2g").prop("disabled") );

			$("#wireless_52g_encryption").val(wireless_encryption);
			$("#wireless_52g_psk_version").val( $("#wireless_2g_psk_version").val() ).prop( "disabled",$("#wireless_2g_psk_version").prop("disabled") );
			$("#wireless_52g_psk_cipher").val( $("#wireless_2g_psk_cipher").val() ).prop( "disabled",$("#wireless_2g_psk_cipher").prop("disabled") );
			$("#wireless_52g_disabled_all").val(wireless_disabled_all);
		};

		interfaces.extendField = function(fields){
			var array = [
				{name: "wireless_5g_2_enable", mapping: "wireless_5g_2_enable"},
            	{name: "wireless_5g_2_ssid", mapping: "wireless_5g_2_ssid"},
            	{name: "wireless_5g_2_hidden", mapping: "wireless_5g_2_hidden"}
			];
			return fields.concat(array);
		};

		interfaces.formLoadData = function(data,wirelessSettings){
			if(data.wireless_5g_2_enable == "on")
			{
				$("#wireless_52g_disabled_all").val("off");
			}
			else
			{
				$("#wireless_52g_disabled_all").val("on");
			}
			encryption_52g = data.wireless_5g_2_encryption || "psk";
			wep_select_52g = data.wireless_5g_2_wep_select;
			wep_format_52g = data["wireless_5g_2_wep_format"+wep_select_52g];
			wep_type_52g   = data["wireless_5g_2_wep_type"+wep_select_52g];

			var keyContainer52g = $("input#txt-wireless-password-52g");
			var wpa52g = $("input#wpa_key_52g").val(data.wireless_5g_2_wpa_key).prop("disabled", true);
			var psk52g = $("input#psk_key_52g").val(data.wireless_5g_2_psk_key).prop("disabled", true);
			var wep15g_2 = $("input#wep_key1_52g").val(data.wireless_5g_2_wep_key1).prop("disabled", true);
			var wep25g_2 = $("input#wep_key2_52g").val(data.wireless_5g_2_wep_key2).prop("disabled", true);
			var wep35g_2 = $("input#wep_key3_52g").val(data.wireless_5g_2_wep_key3).prop("disabled", true);
			var wep45g_2 = $("input#wep_key4_52g").val(data.wireless_5g_2_wep_key4).prop("disabled", true);

			$("input#wireless_52g_encryption").val(encryption_52g);

			wirelessSettings.enable52g = data.wireless_5g_2_enable;
			wirelessSettings.ssid52g = data.wireless_5g_2_ssid;
			wirelessSettings.hide52g = data.wireless_5g_2_hidden;
			wirelessSettings.wireless_52g_disabled = data.wireless_5g_2_disabled;

			switch(encryption_52g){
				case "psk":
					keyContainer52g.textbox("setValue", data.wireless_5g_2_psk_key);
					wirelessSettings.pwd52g = data.wireless_5g_2_psk_key;
					psk52g.prop("disabled", false);
					break;
				case "wep":
					var keyIndex = data.wireless_5g_2_wep_select;
					keyContainer52g.textbox("setValue", data["wireless_5g_2_wep_key" + keyIndex]);
					wirelessSettings.pwd52g = data["wireless_5g_2_wep_key" + keyIndex];
					$("input#wep_key"+keyIndex+"_52g").attr("wep_key_selected", true).prop("disabled", false);
					break;
				case "wpa":
					keyContainer52g.textbox("setValue", data.wireless_5g_2_wpa_key);
					wirelessSettings.pwd52g = data.wireless_5g_2_wpa_key;
					wpa52g.prop("disabled", false);
					break;
				default:
					wirelessSettings.pwd52g = "";
					break;
			};
		};

		interfaces.doubleThridChange = function(regionCapability){
			var channel52g = regionCapability.channel_5g_2;
			var chk_radio_label = $($("#chk-enable-wireless-radio-5g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");
			var wireless_enable_label = $($("#display-wireless-enable-5g-summary").get(0)).closest(".text-container").find(".text-fieldlabel");
			var quicksetup_summary_ssid_label = $($("#reconnect-network-wireless-ssid-52g_label").get(0)).closest(".text-container").find(".text-fieldlabel");

			if ($.isEmptyObject(channel52g)){
				wireless_52g_region_enable = false;
				$("input#wireless_52g_region_enable").val("off");
			}else{
				wireless_52g_region_enable = true;
				$("input#wireless_52g_region_enable").val("on");
			};
			$("h4#display-title-wireless-5g-summary").html($.su.CHAR.QUICK_SETUP.WIRELESS_51GHZ);
			chk_radio_label.html($.su.CHAR.QUICK_SETUP.WIRELESS_51GHZ);
			wireless_enable_label.html($.su.CHAR.QUICK_SETUP.WIRELESS_51GHZ);
			quicksetup_summary_ssid_label.html($.su.CHAR.QUICK_SETUP.WIRELESS_51GHZ_SSID);
			$("#display-wireless-52g-container-summary").show();
			$("#quicksetup-wireless-settings-52g").show();
			$("#quicksetup-summary52g-ssid").show();
		};

		interfaces.setWireless52g = function(wirelessSettings,validteFunc){
		//	if(wirelessSettings.wireless_52g_disabled == "off"){
				var vValue =  validteFunc("52g",v9,v10,encryption_52g,wep_select_52g,wep_type_52g);
				v9 = vValue[0];
				v10 = vValue[1];
		//	}
		};

		interfaces.changeStepStatus = function(step){
			if(step == "step1"){
                 wds_52g_disable_step1 = true;
             }else if(step == "step2"){
                 wds_52g_disable_step2 = true;
             }else if(step == "step3"){
                 wds_52g_disable_step3 = true;
             }
		};

		interfaces.extendField = function(qsFromFields){
			var array = [
				{name: "wireless_5g_2_enable", mapping: "wireless_5g_2_enable"},
            	{name: "wireless_5g_2_ssid", mapping: "wireless_5g_2_ssid"},
            	{name: "wireless_5g_2_hidden", mapping: "wireless_5g_2_hidden"}
			];

			return qsFromFields.concat(array);
		};

		interfaces.htmlReplaceText = function(str){
			if(str){
				$("#encryption_5g_notice").html($.su.CHAR.BASIC_WIRELESS.ENCRYPTION_51G_NOTICE.replace("%s", str));
			}else{
				$("#encryption_5g_notice").html($.su.CHAR.BASIC_WIRELESS.ENCRYPTION_51G_NO);
			}
		};

		interfaces.pswVertify = function(pwd_verify){
			pwd_verify = pwd_verify && v9;
			return pwd_verify;
		};

		interfaces.encryptVertify = function(encrypt_verify){
			encrypt_verify = encrypt_verify && (v10 || (!wireless_52g_region_enable));
			return encrypt_verify;
		};

		interfaces.step4GetRes = function(res){
			var v5 = $("input#txt-wireless-name-ssid-52g").textbox("validate", false);
			var v6 = $("input#txt-wireless-password-52g").textbox("validate", false);

			v5 = $("input#txt-wireless-name-ssid-52g").prop("disabled") ? true : v5;
			v6 = $("input#txt-wireless-password-52g").prop("disabled") ? true : v6;

			wireless_52g_region_enable ? res = res && v5 && v6 : 1;

			return res;
		};

		interfaces.wirelessGoNext = function(){
			var wireless52g = $("input#chk-enable-wireless-radio-52g").checkbox("getValue");
			if (wireless52g[0]){
				$("input#display-wireless-enable-52g-summary").textbox("setValue", $.su.CHAR.QUICK_SETUP.ON);
				$("div#display-wireless-52g-container-summary").addClass("enabled").removeClass("disabled");
			}else{
				$("input#display-wireless-enable-52g-summary").textbox("setValue", $.su.CHAR.QUICK_SETUP.OFF);
				$("div#display-wireless-52g-container-summary").removeClass("enabled").addClass("disabled");
			};
			var ssid52g = $("input#txt-wireless-name-ssid-52g").textbox("getValue");
			$("#display-wireless-name-ssid-52g-summary").text(ssid52g);
			$("#reconnect-network-wireless-ssid-52g").text(ssid52g);

			var wirelessPassword52g = $("input#txt-wireless-password-52g").textbox("getValue");
			$("#display-wireless-password-52g-summary").text(wirelessPassword52g);
			$("#reconnect-network-wireless-password-52g").text(wirelessPassword52g);
		};

		interfaces.form2g5g_prepare_func = function(){
			$("input#wpa_key_52g").prop("disabled", true);
			$("input#psk_key_52g").prop("disabled", true);
			$("input#wep_key1_52g").prop("disabled", true);
			$("input#wep_key2_52g").prop("disabled", true);
			$("input#wep_key3_52g").prop("disabled", true);
			$("input#wep_key4_52g").prop("disabled", true);
			$("input#wireless_52g_encryption").val(encryption_52g);

			switch(encryption_52g){
				case "psk":
					$("input#psk_key_52g").prop("disabled", false);
					break;
				case "wep":
					var keyIndex = form2g5g_data.wireless_5g_2_wep_select;
					$("input#wep_key"+keyIndex+"_52g").prop("disabled", false);
					break;
				case "wpa":
					$("input#wpa_key_52g").prop("disabled", false);
					break;
				default:
					break;
			};
		};

		interfaces.wirelessStatusSet = function(data,result,t){
			var v3 = data.wireless_5g_2_disabled == "on";
			if(v3){
				$("#chk-enable-wireless-radio-52g").checkbox("disable");
				$("#txt-wireless-name-ssid-52g").textbox("disable");
				$("#chk-wireless-enable-ssid-52g").checkbox("disable");
				$("#txt-wireless-password-52g").textbox("disable");
			}
			else{
				$("#chk-enable-wireless-radio-52g").checkbox("enable");
				$("#txt-wireless-name-ssid-52g").textbox("enable");
				$("#chk-wireless-enable-ssid-52g").checkbox("enable");
				$("#txt-wireless-password-52g").textbox("enable");
			}

			if(result && v3){
				if(data.wireless_5g_2_disabled_by=="0"){
					t+= $.su.CHAR.SYSPARA.SWITCH_NOTICE;
				}else{
					t+= $.su.CHAR.SYSPARA.SWITCH_NOTICE2;
				}
			}

			return t;
		};

		interfaces.reSetVar = function(result,data){
			var v3 = data.wireless_5g_2_disabled == "on";
			return result && v3;
		};

		empty.reSetVar = function(result){
			return false;
		};

		empty.wirelessStatusSet = function(data,result,t){
			$("#chk-enable-wireless-radio-52g").checkbox("disable");
	        $("#txt-wireless-name-ssid-52g").textbox("disable");
	        $("#chk-wireless-enable-ssid-52g").checkbox("disable");
	        $("#txt-wireless-password-52g").textbox("disable");

	        if(result){
				if(data.wireless_2g_disabled_by=="0"){
					t+= $.su.CHAR.SYSPARA.SWITCH_NOTICE;
				}else{
					t+= $.su.CHAR.SYSPARA.SWITCH_NOTICE2;
				}
			}
			return t;
		};

		interfaces.hideEncryp52g = function(){
			if (wireless_52g_region_enable){
			}else{
				$("#encryption_52g_notice").css("display", "none");
			};
		};

		interfaces.tribandVal = function(){
			$("input#wireless_52g_encryption").val(encryption_52g);
		};


		return $.su.module.isTriband ? interfaces : empty;
	};

	triband.wps = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            init: _fn,
            isWireless52gDataGet: _fn,
            change51gTitle: _fn
        });

        var URL_WIRELESS_52G_NEW = $.su.url("/admin/wireless?form=wireless_5g_2");
        var wireless_52g_data,
        	wireless_52g_data_received = false;

        interfaces.init = function(){};

        interfaces.isWireless52gDataGet = function(){
        	var wireless52gProxy = new $.su.Proxy({
				url:URL_WIRELESS_52G_NEW
			});

        	wireless52gProxy.read({}, function(data){
				wireless_52g_data = data;
				wireless_52g_data_received = true;
			});
        };

        interfaces.returnReceivedTag = function(){
        	return wireless_52g_data_received;
        };

        interfaces.wireless52gDataInit = function(inHTML){
        	if(wireless_52g_data.enable=="off"||wireless_52g_data.hidden=="on"||wireless_52g_data.encryption!="psk"||(wireless_52g_data.encryption=="psk"&&wireless_52g_data.psk_cipher=="tkip")){
				inHTML	+=	"<p class=\"wps-disable-note-title\">"+$.su.CHAR.WPS.WPS_DISABLE_NOTE_TITLE_52G+"</p>";
				if(wireless_52g_data.enable=="off"){
					inHTML	+=	"<p><span>-</span><span class=\"wps-disable-note-step\">"+$.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP1+"</span></p>";
				}
				if(wireless_52g_data.hidden=="on"){
					inHTML	+=	"<p><span>-</span><span class=\"wps-disable-note-step\">"+$.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP2+"</span></p>";
				}
				if(wireless_52g_data.encryption!="psk"){
					inHTML	+=	"<p><span>-</span><span class=\"wps-disable-note-step\">"+$.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_2+"</span></p>";
				}
				if(wireless_52g_data.encryption=="psk"&&wireless_52g_data.psk_cipher=="tkip"){
					inHTML	+=	"<p><span>-</span><span class=\"wps-disable-note-step\">"+$.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_1+"</span></p>";
				}
			}
			return inHTML;
        };

        interfaces.change51gTitle = function(){
        	$(".wps-disable-note-title-51g").html($.su.CHAR.WPS.WPS_DISABLE_NOTE_TITLE_51G);
        }

        empty.returnReceivedTag = function(){
        	return true;
        };

        empty.wireless52gDataInit = function(inHTML){
        	return inHTML
        };

        return $.su.module.isTriband ? interfaces : empty;
	};

	$.su.module.triband = triband;

}());

(function(){
	$.su.module = $.su.module || {};
	$.su.module.mimo = $.su.module.mimo || {};

	var mimo = {};

	var _fn = function(){
		return null;
	};

	var returnGet = function(variable){
		return variable;
	};


	//wirelessSettings.html
	mimo.wirelessSettings = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

		var mu_mimo_support = $.su.module.mu_mimo_support;
		var mu_mimo_support_24g = $.su.module.mu_mimo_support_2g4;

		interfaces.init = function(){
			// mimo
			if(mu_mimo_support_24g){
				$("input#mimo_2g").checkbox({
					fieldLabel: $.su.CHAR.WIRELESS.MIMO_FEATURE,
					labelCls:'l',
					items: [
						{boxlabel: $.su.CHAR.WIRELESS.MIMO, uncheckedValue:"off", inputValue: "on"}
					]
				});
				$("span#mimo_note_title_2g_text").text($.su.CHAR.WIRELESS.MIMO_NOTICE);
				$("input#mimo_2g").prop("disabled",false);


				$("#mimo_note_title_2g").show();
			}

			if(mu_mimo_support){
				$("input#mimo_5g").checkbox({
					fieldLabel: $.su.CHAR.WIRELESS.MIMO_FEATURE,
					labelCls:'l',
					items: [
						{boxlabel: $.su.CHAR.WIRELESS.MIMO, uncheckedValue:"off", inputValue: "on"}
					]
				});
				
				$("span#mimo_note_title_5g_text").text($.su.CHAR.WIRELESS.MIMO_NOTICE);
				$("#mimo_note_title_5g").show();
				

				$("input#mimo_5g").prop("disabled",false);
				
				if($.su.module.isTriband){
					$("input#mimo_52g").checkbox({
						fieldLabel: $.su.CHAR.WIRELESS.MIMO_FEATURE,
						labelCls:'l',
						items: [
							{boxlabel: $.su.CHAR.WIRELESS.MIMO, uncheckedValue:"off", inputValue: "on"}
						]
					});

					$("span#mimo_note_title_52g_text").text($.su.CHAR.WIRELESS.MIMO_NOTICE);
					$("#mimo_note_title_52g").show();

					$("input#mimo_52g").prop("disabled",false);

				}
				
			}
		};

		interfaces.extendField = function(field){
			var mimoField = [{name: "mu_mimo", mapping: "mu_mimo"}];
			return field.concat(mimoField);
		};

		empty.helpInit = function(){
			if(!mu_mimo_support_24g){
				$("#mu_mimo_2g4").hide();
			}
            if(!mu_mimo_support){
            	$("#mu_mimo_5g").hide();
            }
        };

        interfaces.helpInit = _fn;
        
		return mu_mimo_support || mu_mimo_support_24g ? interfaces : empty;

	};

	$.su.module.mimo = mimo;

}());
(function(){
	$.su.module = $.su.module || {};
	$.su.module.smart = $.su.module.smart || {};

	var smart = {};

	var _fn = function(){
		return null;
	};

	var returnGet = function(variable){
		return variable;
	};

	var smartNotSupport = function(){
		var smart_enable = "off";
		return smart_enable;
	};
	

	smart.wirelessSettings = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            init: smartNotSupport,
			smartSubmit: _fn
        });

		var URL_WIRELESS_2G_5G_NEW =  $.su.url("/admin/wireless?form=wireless_2g&form=wireless_5g");
		var URL_WIRELESS_2G_5G_52g_NEW = $.su.url("/admin/wireless?form=wireless_2g&form=wireless_5g&form=wireless_5g_2");
		var wireless2g5gProxy = new $.su.Proxy({
			url:URL_WIRELESS_2G_5G_NEW
		});
		var wireless2g5g52gProxy = new $.su.Proxy({
			url:URL_WIRELESS_2G_5G_52g_NEW
		});

		var form2g = $("form#wireless-setting-2g");
		var form5g = $("form#wireless-setting-5g");
		var form52g = $("form#wireless-setting-52g");

		function init_mode_channel(frequency){
			$("#channelwidth-" + frequency).combobox("setValue","auto");
			$("#channel-" + frequency).combobox("setValue","auto");
		}
		function post_wireless_data(objForm){
			var obj = objForm.get(0);
			var fields = obj.fields;
			var me = objForm,
				form = me.is("form") ? me : me.find("form");
			var serializeArray = form.form("serialize"),
				params = {},
				key_2g = "",
				key_5g = "",
				key_52g = "";
				
			var wirelessProxy = wireless2g5gProxy;
			for (var key in serializeArray){
				key_2g = "wireless_2g_" + key;
				key_5g = "wireless_5g_" + key;
				params[key_2g] = serializeArray[key];
				params[key_5g] = serializeArray[key];
				if($.su.module.isTriband){
					key_52g = "wireless_5g_2_" + key;
					params[key_52g] = serializeArray[key];
				}
			};
			
			params["wireless_2g_hwmode"] = "bgn";
			params["wireless_5g_hwmode"] = "anac_5";
			if($.su.module.isTriband){
				params["wireless_5g_2_hwmode"] = "anac_5";
				wirelessProxy = wireless2g5g52gProxy;
			}
			objForm.form("showLoading");
			wirelessProxy.write(params,function(){
	            objForm.form("prompt",true);
				objForm.form("hideLoading");
			},function(){
	            objForm.form("prompt",false);
				objForm.form("hideLoading");
			},function(){
	            objForm.form("prompt",false);
				objForm.form("hideLoading");
			});
		}

		interfaces.init = function(){
			var smart_enable = "off";
			var URL_SMART_CONNECT_NEW = $.su.url("/admin/wireless?form=smart_connect");

			var smartConnProxy = new $.su.Proxy({
				url: URL_SMART_CONNECT_NEW,
				async: false
			});

			$("#smart_connect").show();
			$("#smart_connect").panel({
				title: $.su.CHAR.WIRELESS.SMART_CONNECT,
				collapsible: false
			});

			$("#enable_smart_connect").switchbutton({
				fieldLabel: $.su.CHAR.WIRELESS.ENABLE_SMART_CONNECT,
				labelCls: 'l',
				proxy: {
					url: URL_SMART_CONNECT_NEW
				},
				field: {
					"name": "smart_enable"
				},
				autoLoad: false,
				onHandler: function(){
					$(".mode-change").hide();
					$(".mode-channel").hide();
				},
				offHandler: function(){
					$(".mode-change").show();
					$(".mode-channel").show();
					form5g.form("load");
					form52g.form("load");
				}
			}).on("ev_change",function(e,dold,dnew){
				if( dold == $("#enable_smart_connect").get(0).offValue && dnew == $("#enable_smart_connect").get(0).onValue){
					form5g.form("hide");
					form52g.form("hide");
					form2g.form("load");
					form2g.form("show");
					$("span.first-mode").trigger("click");
					setTimeout(function(){form2g.form("submit");},500);
				}
			});

			smartConnProxy.read({},function(data){
	            if(data){
	                smart_enable = data.smart_enable || "off";
	                $("#enable_smart_connect").switchbutton("setValue",smart_enable);
	            }
	        });
		};
		interfaces.smartSubmit = function(frequent){
			if($("#enable_smart_connect").switchbutton("getValue") == "on"){
				//频段和信道置为默认值auto
				init_mode_channel(frequent);
				//覆盖三个表单数据
				post_wireless_data($("form#wireless-setting-" + frequent));
				//不再提交表单默认行为
				return true;
			}else{
				return false;
			}
		};

		interfaces.addHelpContent = function(content){
			var _content = "WIRELESS_SMART_CONNECT";
			content.splice(content.indexOf("WIRELESS_TITLE") + 1, 0, _content);
			return content;
		}

		return $.su.module.smartSupport ? interfaces : empty;
	};

	smart.basicWireless = function(tribandModule){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            init: smartNotSupport,
			smartInitFormStatus: _fn,
			validate5g : _fn,
			getVertify : returnGet
        });

		var smart_enable = "off";

		var URL_SMART_CONNECT_NEW = $.su.url("/admin/wireless?form=smart_connect");

		var smart_on_func = function(){
			smart_enable = "on";
			var wireless_label = $($("input#status_2g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");
			wireless_label.html($.su.CHAR.BASIC_WIRELESS.MODE);
			$("input#status_5g").checkbox("disable");
			$("input#network_name_5g").prop("disabled",true);
			$("input#enable_ssid_5g").checkbox("disable");
			$("input#encry_password_5g").prop("disabled",true);
			$("input#wireless_5g_disabled_all").prop("disabled",true);

			$("input#status_5g").checkbox("hide");
			$("input#network_name_5g").textbox("hide");
			$("input#enable_ssid_5g").checkbox("hide");
			$("input#encry_password_5g").textbox("hide");

			tribandModule.smartOn();
		};

		var smart_off_func = function(){
			smart_enable = "off";
			var wireless_label = $($("input#status_2g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");
			wireless_label.html($.su.CHAR.BASIC_WIRELESS.MODE_2G);
			if($($("#network_name_5g").get(0)).closest("div.text-container").hasClass("disabled")){
				$("input#status_5g").checkbox("disable");
				$("input#enable_ssid_5g").checkbox("disable");
			}
			else{
				$("input#status_5g").checkbox("enable");
				$("input#enable_ssid_5g").checkbox("enable");
			}
			$("input#network_name_5g").prop("disabled",false);
			$("input#encry_password_5g").prop("disabled",false);
			$("input#wireless_5g_disabled_all").prop("disabled",false);

			$("input#status_5g").checkbox("show");
			$("input#network_name_5g").textbox("show");
			$("input#enable_ssid_5g").checkbox("show");
			$("input#encry_password_5g").textbox("show");
			tribandModule.smartOff();
		};

		var setValue = function(str1,str2){
			return smart_enable == "on" ? str1 : str2;
		};

		var validate5gFunc = function(new_encryption_5g) {
			if (smart_enable != "on") {
				var encryption_5g_html = $.su.module.isTriband ? $.su.CHAR.BASIC_WIRELESS.ENCRYPTION_51G_NOTICE : $.su.CHAR.BASIC_WIRELESS.ENCRYPTION_5G_NOTICE;
				var encryption_5g_no_html = $.su.module.isTriband ? $.su.CHAR.BASIC_WIRELESS.ENCRYPTION_51G_NO : $.su.CHAR.BASIC_WIRELESS.ENCRYPTION_5G_NO;
				$("#encryption_5g_notice").css({"display": "block"});
				switch (new_encryption_5g) {
					case "wep":
						text = $.su.CHAR.WIRELESS.WEP;
						$("#encryption_5g_notice").html(encryption_5g_html.replace("%s", text));
						break;
					case "psk":
						text = $.su.CHAR.WIRELESS.WPA_WPA2_PERSONAL;
						$("#encryption_5g_notice").html("");
						$("#encryption_5g_notice").css({"display": "none"});
						break;
					case "wpa":
						text = $.su.CHAR.WIRELESS.WPA_WPA2_ENTERPRISE;
						$("#encryption_5g_notice").html(encryption_5g_html.replace("%s", text));
						break;
					default:
						text = $.su.CHAR.WIRELESS.NO_SECURITY;
						$("#encryption_5g_notice").html(encryption_5g_no_html);
						break;
				}
			}

			tribandModule.totalSaveEncrypt();
		};

		empty.setValue  = setValue;
		empty.validator_fun = function(validator_form_2g,validator_form_5g){
			var validator_flag = false;
			validator_flag = validator_form_2g() && validator_form_5g();
			if($.su.module.isTriband){
				validator_flag = validator_flag && tribandModule.validatorFun();
			}
			return validator_flag;
		};

		empty.reSetVar = function(str1,str2){
			return str2;
		};

		empty.postWirelessData = function(){
			$("form#wireless_setting").form('submit');
		};

		empty.validate5g = validate5gFunc;

		empty.prepareFormFunc = function(prepare_form_5g,form2g5g_data){
			if(smart_enable != "on"){
				prepare_form_5g();
				tribandModule.prepare_form_52g(form2g5g_data);
			}
		};
		
		empty.evLoadData = function(evLoadData,data){
			evLoadData(data);
		};
		
		interfaces.init = function(){

			$("#smart_connect").panel({
				title: $.su.CHAR.BASIC_WIRELESS.SMART_CONNECT,
				collapsible: false
			});

			$("#enable_smart_connect").switchbutton({
				fieldLabel: $.su.CHAR.BASIC_WIRELESS.ENABLE_SMART_CONNECT,
				labelCls: 'l',
				proxy: {
					url: URL_SMART_CONNECT_NEW
				},
				field: {
					"name": "smart_enable"
				},
				autoLoad: false,
				onHandler: function(){
					smart_on_func();
				},
				offHandler: function(){
					smart_off_func();
					$("form#wireless_setting").form("load");
				}
			});
			$("#enable_smart_connect").switchbutton("hide");

			var smartConnProxy = new $.su.Proxy({
				url: URL_SMART_CONNECT_NEW,
				async: false
			});

			smartConnProxy.read({},function(data){
				if(data){
					smart_enable = data.smart_enable || "off";
				}
			});

			$("#enable_smart_connect").switchbutton("setValue",smart_enable);
		};

		interfaces.smartInitFormStatus = function(){
			if(smart_enable == "on"){
				smart_on_func();
			}
			else{
				smart_off_func();
			}
		};

		interfaces.postWirelessData = function(wirelessProxy) {
			if (smart_enable == "on") {
				$("form#wireless_setting").form("showLoading");
				var params = {};
				params = $("form#wireless_setting").form('serialize');
				var wireless_5g_key = "",
					wireless_52g_key = "",
					data = params;
				for (var key in params) {
					wireless_5g_key = key.replace("_2g_", "_5g_");
					wireless_52g_key = key.replace("_2g_", "_5g_2_");
					data[wireless_5g_key] = params[key];
					data[wireless_52g_key] = params[key];
				}
				wirelessProxy.write(data, function () {
					$("form#wireless_setting").form("prompt", true);
					$("form#wireless_setting").form("hideLoading");
				}, function () {
					$("form#wireless_setting").form("prompt", false);
					$("form#wireless_setting").form("hideLoading");
				}, function () {
					$("form#wireless_setting").form("prompt", false);
					$("form#wireless_setting").form("hideLoading");
				});
				setTimeout(function () {
					$("form#wireless_setting").form("hideLoading");
				}, 500);
			}
			else {
				$("form#wireless_setting").form('submit');
			}
		};

		interfaces.validate5g = validate5gFunc;


		interfaces.reSetVar = function(str1,str2){
			return smart_enable == "on" ? str1 : str2;
		};

		interfaces.getVertify = function(verify,new_encryption_2g){
			var verify = verify;
			if(smart_enable == "on"){
            	verify = new_encryption_2g == "psk" ? true : false;
            }
            return verify;
		};

		interfaces.validator_fun = function(validator_form_2g,validator_form_5g){
			var validator_flag = false;
			if(smart_enable == "on"){
				validator_flag = validator_form_2g();
			}
			else{
				validator_flag = validator_form_2g() && validator_form_5g();
				if($.su.module.isTriband){
					validator_flag = tribandModule.validatorFun(validator_flag);
				}
			}
			return validator_flag;
		};

		interfaces.prepareFormFunc = function(prepare_form_5g,form2g5g_data){
			if(smart_enable != "on"){
				prepare_form_5g();
				tribandModule.prepare_form_52g(form2g5g_data);
			}
		};

		interfaces.evLoadData = function(evLoadData,data){
			evLoadData(data);
		};
		return $.su.module.smartSupport ? interfaces : empty;
	};

	smart.wirelessSchedule = function(){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

		var URL_SMART_CONNECT_NEW = $.su.url("/admin/wireless?form=smart_connect");

		var smart_connect = "off";


		interfaces.init = function(){
			var queryProxy = new $.su.Proxy({
				url: URL_SMART_CONNECT_NEW,
				async : false
			});
			queryProxy.read({},function(data){
				smart_connect = data.smart_enable || "off";
			});

			if(smart_connect == "on"){
				$("#mode_change").hide();
			}
			else{
				$("#mode_change").show();
			}
		};

		return $.su.module.smart_connect ? interfaces : empty;
	};

	smart.quickSetup = function(tribandModule){
		var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            formLoadData: _fn,
			overWriteData: _fn,
			summaryValue: _fn,
			wirelessGoNext: _fn
        });

		var smart_enable = "off";

		var over_write_data = function(){
	        var wireless_enable = $("#chk-enable-wireless-radio-2g").checkbox("getValue");
	        wireless_enable = wireless_enable[0] ? "on" : "off";

	        var wireless_name = $("#txt-wireless-name-ssid-2g").textbox("getValue");

	        var hide_ssid = $("#chk-wireless-enable-ssid-2g").checkbox("getValue");
	        hide_ssid = hide_ssid[0] ? "on" : "off";

	        var wireless_password = $("#txt-wireless-password-2g").textbox("getValue");
	        var wireless_encryption = $("#wireless_2g_encryption").val();
	        var wireless_disabled_all = $("#wireless_2g_disabled_all").val();
	        //覆盖5g
	        $("#chk-enable-wireless-radio-5g").checkbox("setValue",wireless_enable);
	        $("#txt-wireless-name-ssid-5g").textbox("setValue",wireless_name);
	        $("#chk-wireless-enable-ssid-5g").checkbox("setValue",hide_ssid);
	        $("#txt-wireless-password-5g").textbox("setValue",wireless_password);

	        $("#wpa_key_5g").val( $("#wpa_key_2g").val() ).prop( "disabled",$("#wpa_key_2g").prop("disabled") );
	        $("#psk_key_5g").val( $("#psk_key_2g").val() ).prop( "disabled",$("#psk_key_2g").prop("disabled") );

	        $("#wep_key1_5g").val( $("#wep_key1_2g").val() ).prop( "disabled",$("#wep_key1_2g").prop("disabled") );
	        $("#wep_key2_5g").val( $("#wep_key2_2g").val() ).prop( "disabled",$("#wep_key2_2g").prop("disabled") );
	        $("#wep_key3_5g").val( $("#wep_key3_2g").val() ).prop( "disabled",$("#wep_key3_2g").prop("disabled") );
	        $("#wep_key4_5g").val( $("#wep_key4_2g").val() ).prop( "disabled",$("#wep_key4_2g").prop("disabled") );

	        $("#wireless_5g_encryption").val(wireless_encryption);
	        $("#wireless_5g_psk_version").val( $("#wireless_2g_psk_version").val() ).prop( "disabled",$("#wireless_2g_psk_version").prop("disabled") );
	        $("#wireless_5g_psk_cipher").val( $("#wireless_2g_psk_cipher").val() ).prop( "disabled",$("#wireless_2g_psk_cipher").prop("disabled") );
	        $("#wireless_5g_disabled_all").val(wireless_disabled_all);

	        //覆盖5g_22
	        tribandModule.overWriteData(wireless_enable,wireless_name,hide_ssid,wireless_password, wireless_encryption, wireless_disabled_all);
	    };

		function pswVertify(v5,v6,tribandModule){
                    pwd_verify = v5 && v6;
                    pwd_verify = tribandModule.pswVertify(pwd_verify);
                    return pwd_verify;
		}

		function encryptVertify(v7,v8,wireless_5g_region_enable,tribandModule){
		    var encrypt_verify = "";
                    encrypt_verify = v7 && (v8 || (!wireless_5g_region_enable));
                    encrypt_verify = tribandModule.encryptVertify(encrypt_verify);

                    return encrypt_verify;
		}

		empty.step4GetRes = function(v1,v2,res){
			return res;
		};

		empty.init = function(){
			$("#chk-enable-smart-conn").checkbox("disable");
		};

		empty.pswVertify = function(v5,v6,tribandModule){
			return pswVertify(v5,v6,tribandModule);
		};
		
		empty.giveNotice = function(){
			$("#smart_enable_off_notice").show();
            $("#smart_enable_on_notice").hide();
		};

		empty.isDisabled = function(){
			return true;
		};

		empty.setWireless52g = function(wirelessSettings,validteFunc,tribandModule){

			tribandModule.setWireless52g(wirelessSettings,validteFunc);
		};

		empty.isSmartOff = function(){
			return smart_enable;
		};

		empty.encryptVertify = function(v7,v8,wireless_5g_region_enable,encrypt_verify){
			return encryptVertify(v7,v8,wireless_5g_region_enable,encrypt_verify,tribandModule);
		};

		interfaces.init = function(setButtonStatus){

			$("#smart-connect-summary-container").show();

			 $("input#chk-enable-smart-conn").checkbox({
		        fieldLabel: $.su.CHAR.QUICK_SETUP.SMART_CONN,
		        labelCls: "l",
		        cls:"part-seperate",
		        items: [
		            {boxlabel: $.su.CHAR.QUICK_SETUP.ENABLE, uncheckedValue:"off", inputValue: "on", id: "chk_enable_smart_conn"}
		        ]
		    }).on("ev_change", function(e, vOld, vNew){
		    	vNew = $("input#chk-enable-smart-conn").checkbox("getValue");
		        var chk_radio_label_2g = $($("#chk-enable-wireless-radio-2g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");
		        var wireless_label = $($("#chk-enable-wireless-radio-2g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");
		        var wireless_status_label = $($("#display-wireless-enable-2g-summary").get(0)).closest(".text-container").find(".text-fieldlabel");
		        if (vNew.length == 0){
		            smart_enable = "off";
		            $("#quicksetup-form").css("height","673px");
		            chk_radio_label_2g.html($.su.CHAR.QUICK_SETUP.WIRELESS_24GHZ);
		            wireless_label.html($.su.CHAR.QUICK_SETUP.WIRELESS_24GHZ);
		            $("#quicksetup-wireless-settings-5g").show();
		            $("#display-title-wireless-2g-summary").html($.su.CHAR.QUICK_SETUP.WIRELESS_24GHZ);
		            wireless_status_label.html($.su.CHAR.QUICK_SETUP.WIRELESS_24GHZ);
		            $("#display-wireless-5g-container-summary").show();

		            tribandModule.show("#quicksetup-wireless-settings-52g");
		            tribandModule.show("#display-wireless-52g-container-summary");
		        }else{
		            smart_enable = "on";
		            chk_radio_label_2g.html($.su.CHAR.QUICK_SETUP.WIRELESS);
		            wireless_label.html($.su.CHAR.QUICK_SETUP.WIRELESS);
		            $("#quicksetup-wireless-settings-5g").hide();
		            tribandModule.hide("#quicksetup-wireless-settings-52g");

		            $("#display-title-wireless-2g-summary").html($.su.CHAR.QUICK_SETUP.WIRELESS);
		            wireless_status_label.html($.su.CHAR.QUICK_SETUP.WIRELESS);
		            $("#display-wireless-5g-container-summary").hide();
		            tribandModule.hide("#display-wireless-52g-container-summary");
		        };
		        setButtonStatus.step4();
		    });	

			$("input#smart-connect-summary").textbox({
        		fieldLabel: $.su.CHAR.QUICK_SETUP.SMART_CONN,
        		readOnly: true,
        		labelCls: "l",
        		cls: "part-separate"
    		});

			 $("#chk-enable-smart-conn").checkbox("enable");
    	
		};

		interfaces.isSmartOff = function(){
			return smart_enable;
		};

		interfaces.extendField = function(formFileds){
            var array = [
                {name: "smart_enable"}
            ];
            return formFileds.concat(array);
        }

		interfaces.formLoadData = function(data){
			smart_enable = data.smart_enable;

	        $("#quicksetup-smart-conn").hide();
	        $("#smart-connect-summary-container").hide();

	        if(smart_enable == "on"){
	            $("#quicksetup-wireless-settings-5g").hide();
	            tribandModule.hide("#quicksetup-wireless-settings-52g");
	            var wireless_label = $($("#chk-enable-wireless-radio-2g").get(0)).closest(".checkbox-group-container").find(".checkbox-group-label");
	            wireless_label.html($.su.CHAR.QUICK_SETUP.WIRELESS);
	            tribandModule.hide("#display-wireless-52g-container-summary");
	        }
		};

		interfaces.wirelessGoNext = function(){
			var wireless_status_label = $($("#display-wireless-enable-2g-summary").get(0)).closest(".text-container").find(".text-fieldlabel");
			if(smart_enable == "on"){
	            $("#display-title-wireless-2g-summary").html($.su.CHAR.QUICK_SETUP.WIRELESS);
	            wireless_status_label.html($.su.CHAR.QUICK_SETUP.WIRELESS);
	            $("#display-wireless-5g-container-summary").hide();
	            tribandModule.hide("#display-wireless-52g-container-summary");
	        }
		};


		interfaces.step4GetRes = function(v1,v2,res){
			if(smart_enable == "on"){
                res = v1 && v2;
                return res;
            }else{
            	return res;
            }
		};

		interfaces.pswVertify = function(v5,v6,tribandModule){
			return pswVertify(v5,v6,tribandModule);
		};

		interfaces.encryptVertify = function(v7,v8,wireless_5g_region_enable,encrypt_verify,tribandModule){
			return encryptVertify(v7,v8,wireless_5g_region_enable,encrypt_verify,tribandModule);
		};

		interfaces.overWriteData = function(){
			if(smart_enable == "on"){
                over_write_data();
            }
            
        	$("#quicksetup-smart-conn").hide();
        	$("#smart-connect-summary-container").hide();
        	if(!$.su.module.smartSupport){
            	smart_enable = "off";
            	//$("#quicksetup-smart-conn").hide();
            	//$("#smart-connect-summary-container").hide();
            	$("#chk-enable-smart-conn").checkbox("disable");
        	}
		};

		interfaces.setWireless52g = function(wirelessSettings,validteFunc,tribandModule){

			if(smart_enable == "on"){
				return null;
			}else{
				tribandModule.setWireless52g(wirelessSettings,validteFunc);
			}
		};

		interfaces.summaryValue = function(){
			if(smart_enable == "on"){
	            $("input#smart-connect-summary").textbox("setValue",$.su.CHAR.QUICK_SETUP.ENABLED);
	        }
	        else{
	            $("input#smart-connect-summary").textbox("setValue",$.su.CHAR.QUICK_SETUP.DISABLED);
	        }
		};

		interfaces.giveNotice = function(){
			if(smart_enable == "on"){
                $("#smart_enable_off_notice").hide();
                $("#smart_enable_on_notice").show();
            }
            else{
                $("#smart_enable_off_notice").show();
                $("#smart_enable_on_notice").hide();
            }
		};


		interfaces.isDisabled = function(){
			if(smart_enable == "on"){
				return false;	
			}else{
				return true;
			}
		};

		return $.su.module.smartSupport ? interfaces : empty;
	};


	$.su.module.smart = smart;

}());
/**
 * Created by admin on 16-10-24.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.dynamic = $.su.module.dynamic || {};

    var _fn = function(){
        return null;
    };
    var returnGet = function(variable){
        return variable;
    };

    var dynamic = {};

    dynamic.basicGuest = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            getCycle: returnGet,
            getPasswordObj: returnGet
        });

        var rand_pwd = function(){
            var pwd = "";
            pwd += parseInt(Math.random()*100000000,10);
            while(pwd.length<8){
                pwd = '0' + pwd;
            }
            return pwd;
        }

        interfaces.init = function(){
            $("#guest_static_dynamic").show();
            var items = [
                {boxlabel: $.su.CHAR.BASIC_GUEST.PER_DAY, inputValue: 'daily'},
                {boxlabel: $.su.CHAR.BASIC_GUEST.PER_WEEK, inputValue: 'weekly'},
                {boxlabel: $.su.CHAR.BASIC_GUEST.PER_MONTH, inputValue: 'monthly'}
            ];
            if($.su.module.support_dynamic_pwd_nevermode){
                items.push({boxlabel: $.su.CHAR.BASIC_GUEST.NEVER, inputValue: 'never'});
            }
            $("input#guest_password_cycle").radio({
                fieldLabel: $.su.CHAR.BASIC_GUEST.PASSWORD_CHANGE_CYCLE,
                columns:4,
                labelCls: 'l',
                items: items
            }).on("ev_change",function(e, oldValue, newValue){
                switch(newValue){
                case 'never':
                    $("div#guest_password1").hide();
                    $("div#guest_password2").show();
                    break;
                default:
                    if(oldValue != 'never'){
                        break;
                    }
                    $("div#guest_password1").show();
                    $("div#guest_password2").hide();
                    $("input#guest_dynamic_password").textbox("setValue", rand_pwd());
                    break;
                }
            }).radio("enable");

            $("input#guest_dynamic_password").textbox({
                fieldLabel: $.su.CHAR.BASIC_GUEST.DYNAMIC_PASSWORD,
                labelCls: 'l',
                readOnly: true
            });
            $("input#guest_dynamic_password").css({
                "margin-left":"15px"
            });
        }

        interfaces.extendField = function(field){
            var array = [{name: "guest_2g5g_passwd_cycle"}];
            return field.concat(array);
        }

        interfaces.getPasswordObj = function(obj){
            var sel = $("input#guest_password_cycle").radio("getValue");
            if(sel == 'never'){
                return obj;
            }else{
                return $("input#guest_dynamic_password");
            }
        }

        interfaces.getCycle = function(cycle){
            var sel = $("input#guest_password_cycle").radio("getValue");
            return sel;
        }

        empty.helpInit = function(){
            $("#pwd_mode").hide();
            $("#pwd_no_random").show();
            $("#pwd_random").hide();
        };
        interfaces.helpInit = function(){
            $("#pwd_mode").show();
            $("#pwd_no_random").hide();
            $("#pwd_random").show();
        };

        return $.su.module.support_guest_dynpasswd ? interfaces : empty;
    };

    dynamic.guestSettings = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            formValidator: returnGet,
            getPasswordObj: returnGet
        });

        var rand_pwd = function(){
            var pwd = "";
            pwd += parseInt(Math.random()*100000000,10);
            while(pwd.length<8){
                pwd = '0' + pwd;
            }
            return pwd;
        };

        interfaces.init = function(){
            $("#guest_static_dynamic").show();
            var items = [
                {boxlabel: $.su.CHAR.GUEST_SETTINGS.PER_DAY, inputValue: 'daily'},
                {boxlabel: $.su.CHAR.GUEST_SETTINGS.PER_WEEK, inputValue: 'weekly'},
                {boxlabel: $.su.CHAR.GUEST_SETTINGS.PER_MONTH, inputValue: 'monthly'}
            ]
            if($.su.module.support_dynamic_pwd_nevermode){
                items.push({boxlabel: $.su.CHAR.GUEST_SETTINGS.NEVER, inputValue: 'never'});
            }
            $("input#guest_password_cycle").radio({
                fieldLabel: $.su.CHAR.BASIC_GUEST.PASSWORD_CHANGE_CYCLE,
                columns:4,
                labelCls: 'l',
                items: items
            }).on("ev_change",function(e, oldValue, newValue){
                switch(newValue){
                case 'never':
                    $("div#guest_password1").hide();
                    $("div#guest_password2").show();
                    break;
                default:
                    if(oldValue != 'never'){
                        break;
                    }
                    $("div#guest_password1").show();
                    $("div#guest_password2").hide();
                    $("input#guest_dynamic_password").textbox("setValue", rand_pwd());
                    break;
                }
            }).radio("enable");

            $("input#guest_dynamic_password").textbox({
                fieldLabel: $.su.CHAR.BASIC_GUEST.DYNAMIC_PASSWORD,
                labelCls: 'l',
                readOnly: true
            });
            $("input#guest_dynamic_password").css({
                "margin-left":"15px"
            });
            $("input#guest_dynamic_password").textbox("setValue", rand_pwd());
        };

        interfaces.extendField = function(field){
            var array = [{name: "guest_2g5g_passwd_cycle"}];
            return field.concat(array);
        }

        interfaces.formValidator = function(val){
            var sel = $("input#guest_password_cycle").radio("getValue");
            if(sel == "never"){
                val = $("input#guest_2g5g_static_password").textbox("getValue");
            }else{
                val = $("input#guest_dynamic_password").textbox("getValue");
                $("input#guest_2g5g_security").radio("setValue","psk");
                $("input#guest_2g5g_personal_version").radio("setValue","auto");
                $("input#guest_2g5g_personal_encryption").radio("setValue","auto");
            }
            return val;
        }

        interfaces.getPasswordObj = function(obj){
            var sel = $("input#guest_password_cycle").radio("getValue");
            if(sel == 'never'){
                return obj;
            }else{
                return $("input#guest_dynamic_password");
            }
        }

        empty.helpInit = function(){
            $("#pwd_mode").hide();
            $("#pwd_no_random").show();
            $("#pwd_random").hide();
        };
        interfaces.helpInit = function(){
            $("#pwd_mode").show();
            $("#pwd_no_random").hide();
            $("#pwd_random").show();
        };

        return $.su.module.support_guest_dynpasswd ? interfaces : empty;
    };

    $.su.module.dynamic = dynamic;
}());
/**
 * Created by admin on 16-10-24.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.wirelessSchedule = $.su.module.wirelessSchedule || {};

    var _fn = function(){
        return null;
    };

    var wirelessSchedule = {};

    wirelessSchedule.basicNetWork = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            statusRead: _fn,
            resetIcon : _fn,
            resetStatus: _fn
        });

        var schedule_disable = false;

        var URL_WIRELESS_SCHEDULE_NEW = $.su.url("/admin/wireless?form=wireless_schedule_wifi_disable");

        var scheduleProxy = new $.su.Proxy({
            url: URL_WIRELESS_SCHEDULE_NEW,
            async: false
        });

        interfaces.statusRead = function(){
            scheduleProxy.read({},function(data){
                schedule_disable = data.disable || false;
            });
        };

        interfaces.resetIcon = function(data, changeIcon, frequent){
            if(schedule_disable){
                switch(frequent){
                    case "2g": {
                        changeIcon("off", "on", data.wireless_2g_encryption, $('div#map_router_24g_img'));
                        break;
                    }
                    case "5g": {
                        changeIcon("off", "on", data.wireless_5g_encryption, $('div#map_router_5g_img'));
                        break;
                    }
                    case "52g": {
                        changeIcon("off", "on", data.wireless_5g_2_encryption, $('div#map_router_52g_img'));
                        break;
                    }
                }
            }
        };

        interfaces.resetStatus = function(obj, status){
            if(schedule_disable && status.toUpperCase() != 'OFF'){
                obj.textbox("setValue",$.su.CHAR.STATUS.OFF_SCHEDULE);
            }
        }

        if(!$.su.module.support_wireless_schedule){
            interfaces.init = _fn;
        }
        return interfaces;
    };

    wirelessSchedule.status = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            statusRead: _fn,
            resetStatus: _fn,
            resetIcon : _fn
        });

        var schedule_disable = false;

        var URL_WIRELESS_SCHEDULE_NEW = $.su.url("/admin/wireless?form=wireless_schedule_wifi_disable");

        var scheduleProxy = new $.su.Proxy({
            url: URL_WIRELESS_SCHEDULE_NEW,
            async: false
        });

        interfaces.statusRead = function(){
            scheduleProxy.read({},function(data){
                schedule_disable = data.disable || false;
            });
        };

        interfaces.resetStatus = function(obj, status){
            if(schedule_disable && status.toUpperCase() != 'OFF'){
                obj.textbox("setValue",$.su.CHAR.STATUS.OFF_SCHEDULE);
            }
        }

        interfaces.resetIcon = function(data, changeIcon, frequent){
            if(schedule_disable){
                switch(frequent){
                    case "2g": {
                        changeIcon("off","on",data.wireless_2g_encryption, $('span#conn_status_wireless_2g'));
                        changeIcon("off", "on", data.guest_2g5g_encryption, $('span#conn_status_guest_2g'));
                        break;
                    }
                    case "5g": {
                        changeIcon("off","on",data.wireless_5g_encryption, $('span#conn_status_wireless_5g'));
                        changeIcon("off", "on", data.guest_2g5g_encryption, $('span#conn_status_guest_5g'));
                        break;
                    }
                    case "52g": {
                        changeIcon("off","on",data.wireless_5g_2_encryption, $('span#conn_status_wireless_52g'));
                        changeIcon("off", "on", data.guest_2g5g_encryption, $('span#conn_status_guest_52g'));
                    }
                }
            }
        };

        return $.su.module.support_wireless_schedule ? interfaces : empty;
    };

    $.su.module.wirelessSchedule = wirelessSchedule;
}());
/**
 * Created by admin on 16-10-24.
 */
/**
 * Created by admin on 16-10-24.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.suppUsb = $.su.module.suppUsb || {};

    var _fn = function(){
        return null;
    };

    var suppUsb  = {};

    suppUsb.basicNetWork = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            setBrand : _fn
        });

        interfaces.init = function(data){
            $('div#map_usb_model').removeClass('hidden');
            $('div#map_line_branch').removeClass('hidden');
            $('div#map_line_vertical').removeClass('line-vertical-without-usb');
            $('div#map_wire_model').removeClass('wireless-without-usb');
        };

        interfaces.setBrand = function(data){
            var vendor = data["storage_vendor"] ? data["storage_vendor"] : "--";
            $("input#usb_storage_brand").textbox("setValue", vendor);
        };

        interfaces.addHelpContent = function(content){
            var arr = ["BASIC_NETWORK_USB"];
            return content.concat(arr);
        }

        return $.su.module.support_usb ? interfaces : empty;
    };

    suppUsb.status = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            showUsb:_fn
        });

        interfaces.init = function(){
            $('span#status_usb_title').html($.su.CHAR.STATUS.USB_TITLE);          
        };

        interfaces.showUsb = function(){
            $('div#usb').removeClass('hidden');
            $('div#performance').removeClass('performance-without-usb');
            $("form#status_form").removeClass('without-usb');
            var t = setTimeout( function(){ $('div#performance_panel').css('height',    $('div#usb-panel').css('height') ); }, 100 );
        };

        interfaces.extendField = function(formFileds){
            var array = [
                {name: "storage_capacity", mapping: "storage_capacity"},
                {name: "storage_capacity_unit", mapping: "storage_capacity_unit"},
                {name: "storage_available", mapping: "storage_available"},
                {name: "storage_available_unit", mapping: "storage_available_unit"}
            ];
            return formFileds.concat(array);
        }

        interfaces.addHelpContent = function(content){
            var _content = "STATUS_USB";
            content.splice(content.indexOf("STATUS_GUEST") + 1, 0, _content);
            return content;
        }

        return $.su.module.support_usb ? interfaces : empty;
    };
    $.su.module.suppUsb = suppUsb;
}());
(function(){
    $.su.module = $.su.module || {};
    $.su.module.atf = $.su.module.atf || {};

    var atf = {};

    var _fn = function(){
        return null;
    };
    
    //wirelessSettings.html
    atf.wirelessSettings = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        var airtime_fairness_support = $.su.module.airtime_fairness_support;
        var airtime_fairness_support_2g4 = $.su.module.airtime_fairness_support_2g4;

        interfaces.init = function(){
            // atf
            if(airtime_fairness_support_2g4){
                $("input#fairness_2g").removeClass("hidden");
                $("input#fairness_2g").checkbox({
                    fieldLabel: $.su.CHAR.WIRELESS.AF_FEATURE,
                    labelCls:'l',
                    items: [
                        {boxlabel: $.su.CHAR.WIRELESS.AF, uncheckedValue:"off", inputValue: "on"}
                    ]
                });

                $("input#fairness_2g").prop("disabled",false);
            }
            if (airtime_fairness_support) {
                $("input#fairness_5g").removeClass("hidden");
                $("input#fairness_5g").checkbox({
                    fieldLabel: $.su.CHAR.WIRELESS.AF_FEATURE,
                    labelCls:'l',
                    items: [
                        {boxlabel: $.su.CHAR.WIRELESS.AF, uncheckedValue:"off", inputValue: "on"}
                    ]
                });
                $("input#fairness_5g").prop("disabled",false);

                if($.su.module.isTriband){
                    $("input#fairness_52g").removeClass("hidden");
                    $("input#fairness_52g").checkbox({
                        fieldLabel: $.su.CHAR.WIRELESS.AF_FEATURE,
                        labelCls:'l',
                        items: [
                            {boxlabel: $.su.CHAR.WIRELESS.AF, uncheckedValue:"off", inputValue: "on"}
                        ]
                    });

                    $("input#fairness_52g").prop("disabled",false);
                }
                
            }
           
        };

        interfaces.extendField = function(field){
            var atfField = [{name: "airtime_fairness", mapping: "airtime_fairness"}];
            return field.concat(atfField);
        };

        empty.helpInit = function(){
            if(!airtime_fairness_support_2g4){
                $("#atf_2g4").hide();
            }
            if(!airtime_fairness_support){
                $("#atf_5g").hide();
            }
        };

        interfaces.helpInit = _fn;

        return airtime_fairness_support || airtime_fairness_support_2g4 ? interfaces : empty;

    };

    $.su.module.atf = atf;

}());
/**
 * Created by admin on 16-10-25.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.portal = $.su.module.portal || {};

    var _fn = function(){
        return null;
    };

    //返回获取的参数，用于双频与三频切换form字段，proxy
    var returnGet = function(variable){
        return variable;
    };

    var portal  = {};

    portal.guestSettings = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            extendItems : returnGet,
            setPortalSatus : _fn,
            redirectURL : _fn
        });

        empty.helpInit = function(){
            $("#portal-help-title").hide();
            $("#portal-help-content").hide();
        };

        interfaces.init = function(){
            var URL_CONTENT_UPLOAD = $.su.url("/admin/wireless?form=portal_content");
            var URL_LOGO_UPLOAD = $.su.url("/admin/wifidog?form=portal_logo");
            var URL_BACKGROUND_UPLOAD = $.su.url("/admin/wifidog?form=portal_background");
            var contentForm = null;

            var portalContentProxy = new $.su.Proxy({
                url: URL_CONTENT_UPLOAD
            });

            $("#login_page").html($.su.CHAR.GUEST_SETTINGS.LOGIN_PAGE);
            $("#edit_page").html($.su.CHAR.GUEST_SETTINGS.CLICK_TO_EDIT).on("click", function(e){
                if(!isIE8()){
                    $("#pre_browse_ctn").css({"background": "url(\"./themes/green/img/portal_back.jpg\") no-repeat", "background-size": "contain", "background-position": "center center"});
                }else{
                    $("#pre_browse_ctn").css({"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + "./themes/green/img/portal_back.jpg" + "\", sizingMethod='scale')"});
                }
                $("input#logo-upload-progressbar").progressbar("reset").progressbar("hide");
                $("input#back-upload-progressbar").progressbar("reset").progressbar("hide");
                $("#edit_page_msg").msg("show");

                //自动获取Portal 的tatle 和 content 信息
                contentForm = $("form#portal-content").form({
                    proxy: portalContentProxy,
                    fields: [
                        {name: "title" , mapping:"title"},
                        {name: "content" , mapping:"content"}
                    ],
                    autoLoad: true
                }).on("ev_loadData",function(e,data){

                    var content = data.content;
                    content = $.su.func.unEscapeHtml(content);
                    var temp =  content.replace(/<br\/>/g,'\n');
                    var title = $("input#title").textbox("getValue");
                    var content = $("textarea#term-of-use").textarea("getValue");
                    $("textarea#term-of-use").textarea("setValue",temp);
                    $("span#login_welcome_text").html(title);
                    if(title == ""){
                        $("input.text-hint").show();
                    }
                    if(content == ""){
                        $("span#term-hint").show();
                    }else{
                        $("span#term-hint").hide();
                    }
                });
            });

            $("#login_welcome_text").html($.su.CHAR.GUEST_SETTINGS.WELCOME);
            $("span#logo-tips").html($.su.CHAR.GUEST_SETTINGS.LOGO_TIPS);
            $("span#back-tips").html($.su.CHAR.GUEST_SETTINGS.BACK_TIPS);

            $("#portal_field").fieldset({
                fields: [
                    {name: "guest_2g5g_authentication_type"},
                    {name: "guest_2g5g_portal_password"},
                    {name: "guest_2g5g_authentication_timeout"},
                    {name: "guest_2g5g_redirect"},
                    {name: "guest_2g5g_redirect_url"}
                ]
            }).fieldset("enable");

            $("#authen_type").combobox({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.AUTHEN_TYPE,
                labelCls: 'l',
                allowBlank: false,
                items: [
                    {value: "none", name: $.su.CHAR.GUEST_SETTINGS.NO_AUTHEN},
                    {value: "simple", name: $.su.CHAR.GUEST_SETTINGS.SIMPLE_PASSWORD}
                ],
                noneSelectedText:$.su.CHAR.OPERATION.NOSELECTEDTEXT
            }).on("ev_change", function(e, dold, dnew){
                var type = dnew[0];
                switch(type){
                    case "simple": {
                        $("#portal_password").textbox("show");
                        $("#portal_password_view").textbox("show");
                        $("#portal_password").prop("disabled", false);
                        break;
                    }
                    case "none": {
                        $("#portal_password").textbox("hide");
                        $("#portal_password_view").textbox("hide");
                        $("#portal_password").prop("disabled", true);
                        break;
                    }
                }
            });

            $("#portal_password").textbox({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.PORTAL_PASSWORD,
                labelCls: 'l',
                allowBlank: false,
                vtype: "portal_password"
            });

            $("#authen_timeout").combobox({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.AUTHEN_TIMEOUT,
                labelCls: 'l',
                allowBlank: false,
                items: [
                    {value: "1hour", name:  $.su.CHAR.GUEST_SETTINGS.ONE_HOUR},
                    {value: "2hours", name: $.su.CHAR.GUEST_SETTINGS.TWO_HOURS},
                    {value: "4hours", name: $.su.CHAR.GUEST_SETTINGS.FOUR_HOURS},
                    {value: "8hours", name: $.su.CHAR.GUEST_SETTINGS.EIGHT_HOURS},
                    {value: "always", name: $.su.CHAR.GUEST_SETTINGS.ALWAYS}
                ],
                noneSelectedText:$.su.CHAR.OPERATION.NOSELECTEDTEXT
            });

            $("#redirect").checkbox({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.REDIRECT,
                labelCls: 'l',
                items: [
                    {boxlabel: $.su.CHAR.GUEST_SETTINGS.ENABLE_REDIRECT, inputValue: "on", uncheckedValue: "off"}
                ]
            }).on("ev_change", function(e, dold, dnew){
                if(dnew.length){ //enable
                    $("#redirect_url").textbox("show");
                    $("#redirect_url").textbox("enable");
                    if(dnew[dnew.length-1] == "off"){
                        $("#redirect_url").textbox("hide");
                        $("#redirect_url").textbox("disable");
                    }
                    if(dnew[dnew.length-1] == "on"){
                        $("#redirect_url").textbox("show");
                        $("#redirect_url").textbox("enable");
                    }
                }else{
                    $("#redirect_url").textbox("hide");
                    $("#redirect_url").textbox("disable");
                }
            }).on("ev_click",function(){
                var blank = $("#redirect_url").get(0).allowBlank;
                if(blank){
                    $("#redirect_url").get(0).allowBlank = false;
                }else{
                    $("#redirect_url").get(0).allowBlank = true;
                }
            });

            $("#redirect_url").textbox({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.REDIRECT_URL,
                labelCls: 'l',
                vtype: "portal_domain_name"
            }).textbox("hide").textbox("disable");

            $("#edit_page_msg").msg({
                type: "alert",
                cls: 'xxxl'
            }).msg("setTitle", $.su.CHAR.GUEST_SETTINGS.LOGIN_PAGE).msg("hideButtons");

            $("#portal_password_view").textbox({
                fieldLabel: null,
                hint: $.su.CHAR.GUEST_SETTINGS.WIRELESS_PASSWORD,
                cls: 'l',
                readOnly: true
            });

            $("#protal_login_btn").button({
                text: $.su.CHAR.GUEST_SETTINGS.LOGIN,
                btnCls: 'l'
            });

            $("#temp_of_use").radio({
                fieldLabel: null,
                columns: 1,
                items:[
                    {boxlabel: $.su.CHAR.GUEST_SETTINGS.ACCEPT_TERMS_OF_USE, name:'temp_of_use', inputValue:'accept', checked: 'checked'}
                ]
            });

            $("input#title").textbox({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.PORTAL_TITLE,
                labelCls: "s",
                inputCls: "l",
                maxLength:32,
                vtype:"protal_title",
                hint: $.su.CHAR.GUEST_SETTINGS.TITLE_DEFAULT
            });

            $("#term-of-use").textarea({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.TERM,
                labelCls: "s",
                maxLength:1024,
                vtype:"protal_content"
            }).on("focusin",function(){
                var value = $(this).textarea("getValue");
                if(value == ""){
                    $("span#term-hint").hide();
                }
            }).on("focusout",function(){
                var value = $(this).textarea("getValue");
                if(value == ""){
                    $("span#term-hint").show();
                }
            });
            $("span#term-hint").on("click",function(){
                var display = $(this).css("display")
                if(display != "none"){
                    $(this).hide();
                    $("#term-of-use").focus();
                }
            });

            $("span#term-hint").html($.su.CHAR.GUEST_SETTINGS.TERM_DEFAULT)
            $("#term-of-use").before($("span#term-hint"));

            $("input#logo-imge").file({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.LOGO_IMAGE,
                buttonText: $.su.CHAR.GUEST_SETTINGS.BROWSE,
                labelCls: "s",
                cls: "inline-block",
                extension: "jpg,png,JPG,PNG",
                inputCls: "l"
            }).on("change", function(){
                var ctn = $("#logo_image .icon");
                preView(this, ctn);
                $("input#logo-upload-progressbar").progressbar("reset");
            });

            $("input#background-imge").file({
                fieldLabel: $.su.CHAR.GUEST_SETTINGS.BACK_IMAGE,
                buttonText: $.su.CHAR.GUEST_SETTINGS.BROWSE,
                labelCls: "s",
                cls: "inline-block",
                extension: "jpg,png,JPG,PNG",
                inputCls: "l"
            }).on("change", function(){
                var ctn = $("#pre_browse_ctn");
                preView(this, ctn);
                $("input#back-upload-progressbar").progressbar("reset");
            });

            $("input#logo-upload-progressbar").progressbar({
                width: 184,
                height: 6,
                labelCls: 's',
                showPercentage: false
            }).progressbar("hide");

            $("input#back-upload-progressbar").progressbar({
                width: 184,
                height: 6,
                labelCls: 's',
                showPercentage: false
            }).progressbar("hide");

            var portalLogoProxy = new $.su.Proxy({
                url: URL_LOGO_UPLOAD
            });

            var logoForm = $("form#upload-logo").form({
                proxy: portalLogoProxy,
                traditional: true,
                hiddenFrame: true,
                formEnctype: "multipart/form-data",
                autoLoad: false,
                fields: [
                    {name: "logo"} //for validate
                ],
                validator: function(){
                    if(!isIE8()){
                        var size = Math.round($("input#logo-imge")[0].files[0].size / 1024 * 100) / 100;
                        if(size > 100){
                            $("input#logo-imge").file("setError", $.su.CHAR.ERROR["00000126"]);
                            return false;
                        }
                    }
                    return true;
                }
            }).on("ev_validatechange", function(e, result, fg){
                if(result){
                    $("input#logo-upload-progressbar").progressbar("show").progressbar("reset").progressbar("animate", 0, 0.5, 10*1000);
                }
            });

            var portalBackProxy = new $.su.Proxy({
                url: URL_BACKGROUND_UPLOAD
            });
            var backForm = $("form#upload-back").form({
                proxy: portalBackProxy,
                traditional: true,
                hiddenFrame: true,
                formEnctype: "multipart/form-data",
                autoLoad: false,
                fields: [
                    {name: "background"} //for validate
                ],
                validator: function(){
                    if(!isIE8()){
                        var size = Math.round($("input#background-imge")[0].files[0].size / 1024 * 100) / 100;
                        if(size > 2*1024){
                            $("input#background-imge").file("setError", $.su.CHAR.ERROR["00000126"]);
                            return false;
                        }
                    }
                    return true;
                }
            }).on("ev_validatechange", function(e, result, fg){
                if(result){
                    $("input#back-upload-progressbar").progressbar("show").progressbar("reset").progressbar("animate", 0, 0.5, 10*1000);
                }
            });

            $("input#logo-upload").button({
                text: $.su.CHAR.GUEST_SETTINGS.UPLOAD,
                cls: "inline-block",
                handler: function(){
                    $("input#logo-upload").button("disable");
                    $("input#logo-upload-progressbar").progressbar("reset");
                    var data = isIE8() ? {operation: "getSize"} : {operation: "upload"};
                    data["type"] = "logo";
                    var result = logoForm.form("submit", $.extend({}, data), function(){
                        var imgstatus = arguments[0].imgstatus;
                        if(imgstatus === "false"){
                            var error = $.su.CHAR.ERROR["00000126"];
                            $("input#logo-imge").file("setError",error);
                            $("input#logo-upload-progressbar").progressbar("stop");
                            $("input#logo-upload").button("enable");
                            return;
                        }
                        $("input#logo-upload-progressbar").progressbar("stop").progressbar("animate", null, 1, 0.5*1000, function(){
                            logoForm.form("prompt", true);
                            $("input#logo-upload-progressbar").progressbar("hide");
                        });
                        $("input#logo-upload").button("enable");
                    }, function(){

                        $("input#logo-upload-progressbar").progressbar("reset").progressbar("animate", 0, 0.1, 10*1000,function(){
                            logoForm.form("prompt", false);
                            $("input#logo-upload").button("enable");
                            $("input#logo-upload-progressbar").progressbar("reset")
                        });
                    }, function(){
                        $("input#logo-upload-progressbar").progressbar("stop");
                        logoForm.form("prompt", false);
                        $("input#logo-upload").button("enable");
                    });
                    if(result == false){
                        $("input#logo-upload").button("enable");
                    }
                }
            });

            $("input#back-upload").button({
                text:$.su.CHAR.GUEST_SETTINGS.UPLOAD,
                cls:"inline-block",
                handler:function(){
                    $("input#back-upload").button("disable");
                    var data = isIE8() ? {operation: "getSize"} : {operation: "upload"};
                    data["type"] = "background";
                    var result = backForm.form("submit", $.extend({}, data), function(){
                        var imgstatus = arguments[0].imgstatus;
                        if(imgstatus === "false"){
                            var error = $.su.CHAR.ERROR["00000126"];
                            $("input#background-imge").file("setError",error);
                            $("input#back-upload").button("enable");
                            $("input#back-upload-progressbar").progressbar("stop");
                            return;
                        }
                        $("input#back-upload-progressbar").progressbar("reset").progressbar("animate", null, 1, 1*1000, function(){
                            backForm.form("prompt", true);
                            $("input#back-upload-progressbar").progressbar("hide");
                        });
                        $("input#back-upload").button("enable");
                    }, function(){
                        $("input#back-upload-progressbar").progressbar("reset").progressbar("animate", 0, 0.2, 10*1000,function(){
                            backForm.form("prompt", false);
                            $("input#back-upload").button("enable");
                            $("input#back-upload-progressbar").progressbar("reset");
                        });
                    }, function(){
                        $("input#back-upload-progressbar").progressbar("stop");
                        backForm.form("prompt", false);
                        $("input#back-upload").button("enable");
                    });
                    if(result == false){
                        $("input#back-upload").button("enable");
                    }
                }
            });

            $("input#portal_save").button({
                text:$.su.CHAR.OPERATION.SAVE,
                cls: 'submit',
                handler:function(){

                    if(!contentForm.form("validate")){
                        return;
                    }
                    $("input#portal_save").button("disable");
                    var subContent = contentForm.form("serialize");
                    var data = {};
                    data.title   = subContent.title;
                    data.content = subContent.content.replace(/\r\n/g, '<br/>');
                    data.content = $.su.func.escapeHtml(data.content);
                    var result = portalContentProxy.write($.extend({},data),function(data,others,status,xhr){
                        contentForm.form("prompt", true);
                        var title = $("input#title").textbox("getValue");
                        var content = $("textarea#term-of-use").textarea("getValue");
                        $("span#login_welcome_text").html(title);
                        $("div#term").html(content);
                        $("input#portal_save").button("enable");
                    },function(errorcode, others, data){
                        contentForm.form("prompt", false);
                        $("input#portal_save").button("enable");
                    },function(xhr, status, type){
                        contentForm.form("prompt", false);
                        $("input#portal_save").button("enable");
                    });

                }
            });

            function isIE8(){
                var s = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/);
                return s ? s[1] <= 8 : false;
            }

            function preView(obj, ctn){
                obj = obj.jquery ? obj[0] : obj; //dom object
                ctn = ctn.jquery ? ctn : $(ctn); //jquery object
                if(!isIE8()){
                    var file = obj.files[0];
                    if(!file){
                        return false;
                    }
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload=function(e){
                        if(obj.id == "logo-imge"){
                            ctn.css({"background": "url(\"" + this.result + "\") no-repeat", "background-size": "88px 88px"});
                        }
                        if(obj.id == "background-imge"){
                            ctn.css({"background": "url(\"" + this.result + "\") no-repeat", "background-size": "contain", "background-position": "center center"});
                        }

                    }
                }else{
                    obj.select();
                    var imgSrc = document.selection.createRange().text; //real path
                    ctn.css({"background": "url(" + imgSrc + ")", "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + imgSrc + "\", sizingMethod='scale')"});
                }
            }

            $("input#logo-imge").on("change", function(){
                var ctn = $("#logo_image .icon");
                preView(this, ctn);
            });

            $("input#background-imge").on("change", function(){
                var ctn = $("#pre_browse_ctn");
                preView(this, ctn);
            });
        };

        interfaces.extendItems = function(items){
            var portalItems = [
                {boxlabel: $.su.CHAR.GUEST_SETTINGS.PORTAL, inputValue: 'portal'}
            ];
            return items.concat(portalItems);
        };

        interfaces.extendField = function(array){
            var fields =  [
                {name: "guest_2g5g_portal_password"},
                {name: "guest_2g5g_authentication_type"},
                {name: "guest_2g5g_authentication_timeout"},
                {name: "guest_2g5g_redirect"},
                {name: "guest_2g5g_redirect_url"}
            ];
            return array.concat(fields);
        };

        interfaces.setPortalSatus = function(newValue){
            if(newValue == "portal"){
                $("#portal_field").fieldset("show");
                $('#guest_2g5g_wpa').fieldset("hide");
                //设置portal简单密码输入框的状态
                $("#authen_type").trigger("ev_change", ["", $("#authen_type").combobox("getValue")]);
            }
        };

        interfaces.redirectURL = function(encryption){
            if(encryption == "portal"){
                var redirect = $("#redirect").checkbox("getValue");
                if(redirect.length){
                    $("#redirect_url").textbox("enable");
                }else{
                    $("#redirect_url").textbox("disable");
                }
            }
        };

        interfaces.helpInit = _fn;

        return $.su.module.portalSupport ? interfaces : empty;
    };

    $.su.module.portal = portal;
}());
/**
 * Created by admin on 16-10-25.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.wds = $.su.module.wds || {};

    var _fn = function(){
        return null;
    };
    var returnGet = function(param){
        return param;
    };
    var wds  = {};

    var wds_2g_enable = false;
    var wds_5g_enable = false;

    wds.systemParameters = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            setFiredArray: returnGet,
            wds2gProxyRead: _fn,
            wds5gProxyRead: _fn,
            wds5gLoadData: _fn,
            wds2gLoadData: _fn,
            changeStepStatus: _fn
        });

        var tribandModule;
        var wds_2g_disable_step1 =  false;
        var wds_2g_disable_step2 =  false;
        var wds_2g_disable_step3 =  false;

        var wds_5g_disable_step1 =  false;
        var wds_5g_disable_step2 =  false;
        var wds_5g_disable_step3 =  false;

        var SYS_WIRELESS_2G_URL_NEW = $.su.url("/admin/wireless?form=syspara_2g");
        var SYS_WIRELESS_5G_URL_NEW = $.su.url("/admin/wireless?form=syspara_5g");

        var ipv4Wds2gProxy = new $.su.Proxy({
            url: SYS_WIRELESS_2G_URL_NEW,
            eventId:"wds_mode"
        });

        var ipv4Wds5gProxy = new $.su.Proxy({
            url: SYS_WIRELESS_5G_URL_NEW
        });

        var initEnable = function(){
            if(wds_2g_enable){
                $("form#w5g-wds-setting").form("disable");
                tribandModule.disable("#w52g-wds-setting");
                if(wds_2g_disable_step1 || wds_2g_disable_step2 || wds_2g_disable_step3){
                    $("form#w24g-wds-setting").form("disable");
                }
                return;
            }
            if(wds_5g_enable){
                $("form#w24g-wds-setting").form("disable");
                tribandModule.disable("#w52g-wds-setting");
                if(wds_5g_disable_step1 || wds_5g_disable_step2 || wds_5g_disable_step3){
                    $("form#w5g-wds-setting").form("disable");
                }
                return;
            }
            tribandModule.initEnable();
        };


        interfaces.init = function(survey_store_2g,survey_store_5g){
			tribandModule = $.su.module.installedModule["tribandModule"];
            $("div#w24g-wds").removeClass("hidden");
            $("div#w5g-wds").removeClass("hidden");
            $("span#wds_note_title_2g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);
            $("span#wds_note_title_5g_text").text($.su.CHAR.SYSPARA.SWITCH_NOTICE);
            $("div#w24g-wds").panel({
                title: $.su.CHAR.SYSPARA.W24G_WDS,
                collapsible: false
            });

            $("input#enable_2g").checkbox({
                fieldLabel:$.su.CHAR.SYSPARA.WDS_FEATURE,
                labelCls:'l',
                cls:"part-separate",
                tips:"",
                tipsCls:"m",
                items: [
                    {boxlabel: $.su.CHAR.SYSPARA.WDS,  uncheckedValue:"off", inputValue: "on"}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var val = (newValue[0]=="enable"||newValue[0]=="on") ? "on" : "off";
                var enc = $("input#encryption_2g").radio("getValue");
                var key = $("input#wep_select_2g").combobox("getValue")[0];

                var cnt = $("input#enable_2g").checkbox("getContainer");
                var isDisabled = $(cnt).hasClass("disabled");
                switch(val)
                {
                    case "on":
                        if(isDisabled)
                        {
                            return;
                        }
                        $("#ssid_cnt_2g").fieldset("show");
                        $("#wpa_cnt_24g").fieldset((enc == "psk") ? "show" : "hide");
                        $("#wep_cnt_24g").fieldset((enc == "wep") ? "show" : "hide");
                        $('#key1_cnt_2g').fieldset(((enc == "wep") && key=='1') ? "show":"hide");
                        $('#key2_cnt_2g').fieldset(((enc == "wep") && key=='2') ? "show":"hide");
                        $('#key3_cnt_2g').fieldset(((enc == "wep") && key=='3') ? "show":"hide");
                        $('#key4_cnt_2g').fieldset(((enc == "wep") && key=='4') ? "show":"hide");
                        break;
                    case "off":
                        $("#ssid_cnt_2g").fieldset("hide");
                        $("#wep_cnt_24g").fieldset("hide");
                        $("#wpa_cnt_24g").fieldset("hide");
                        $('#key1_cnt_2g').fieldset("hide");
                        $('#key2_cnt_2g').fieldset("hide");
                        $('#key3_cnt_2g').fieldset("hide");
                        $('#key4_cnt_2g').fieldset("hide");
                        break;
                }
            });

            $("input#ssid_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.SSID_BRIDEGE,
                vtype:"string_visible_allow_blank",
                allowBlank:false,
                maxLength:32,
                autoTrim:false,
                labelCls:'l',
                cls:"inline"
            });

            $("button#syspara_survey_2g").button({
                text:$.su.CHAR.SYSPARA.SURVEY,
                handler:function(){
                    $("div#result_2g").show();
                    $("div#result_5g").hide();
                    tribandModule.hide("div#result_52g");
                    $("div#result_2g").grid("runProgress");
                    $("#refreshBtn_2g").button("disable");
                    survey_store_2g.load({}, function(){
                        $("div#result_2g").grid("prompt", true);
                        $("#refreshBtn_2g").button("enable");
                    });
                    $("div#survey").msg("show");
                },
                cls:"inline-block more_pad ml5"
            });

            $("input#bssid_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.MAC,
                vtype:"mac",
                maxLength:17,
                allowBlank:false,
                labelCls:'l',
                tips:$.su.CHAR.SYSPARA.MACUNIT
            });

            $("#wep_cnt_24g").fieldset({
                fields: [
                    {name: "wep_select"},
                    {name: "wep_mode"}
                ]
            }).hide();

            $("#wds_mode_2g").combobox({
                fieldLabel: $.su.CHAR.SYSPARA.WDS_MODE,
                labelCls: "l",
                items: [
                    {"value": "2", "name": $.su.CHAR.SYSPARA.AUTO},
                    {"value": "1", "name": $.su.CHAR.SYSPARA.WDS1},
                    {"value": "0", "name": $.su.CHAR.SYSPARA.WDS2}
                ]
            });

            $("input#encryption_2g").radio({
                fieldLabel: $.su.CHAR.WIRELESS.SECURITY,
                columns:3,
                labelCls: "l",
                cls:"part-separate",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.NONE, inputValue: 'none'},
                    {boxlabel: $.su.CHAR.SYSPARA.WPA, inputValue: 'psk'},
                    {boxlabel: $.su.CHAR.SYSPARA.WEP, inputValue: 'wep'}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var key = $("input#wep_select_2g").combobox("getValue")[0];
                $("#wpa_cnt_24g").fieldset((newValue == "psk") ? "show" : "hide");
                $("#wep_cnt_24g").fieldset((newValue == "wep") ? "show" : "hide");
                $('#key1_cnt_2g').fieldset(((newValue == "wep") && key=='1') ? "show":"hide");
                $('#key2_cnt_2g').fieldset(((newValue == "wep") && key=='2') ? "show":"hide");
                $('#key3_cnt_2g').fieldset(((newValue == "wep") && key=='3') ? "show":"hide");
                $('#key4_cnt_2g').fieldset(((newValue == "wep") && key=='4') ? "show":"hide");
            });

            $("#wpa_cnt_24g").fieldset({
                fields: [
                    {name: "psk_key"}
                ]
            }).hide();

            $("input#psk_key_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:64,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_mode_2g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.AUTH_TYPE,
                labelCls: "l",
                columns:3,
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.AUTO, inputValue: 'auto'},
                    {boxlabel: $.su.CHAR.SYSPARA.OPEN, inputValue: 'open', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.SHARED, inputValue: 'shared'}
                ]
            });

            $("#key1_cnt_2g").fieldset({
                fields: [
                    {name: "wep_format1"},
                    {name: "wep_key1"}
                ]
            }).hide();

            $("#key2_cnt_2g").fieldset({
                fields: [
                    {name: "wep_format2"},
                    {name: "wep_key2"}
                ]
            }).hide();

            $("#key3_cnt_2g").fieldset({
                fields: [
                    {name: "wep_format3"},
                    {name: "wep_key3"}
                ]
            }).hide();

            $("#key4_cnt_2g").fieldset({
                fields: [
                    {name: "wep_format4"},
                    {name: "wep_key4"}
                ]
            }).hide();

            $("input#wep_key1_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key2_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key3_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key4_2g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });


            $("input#wep_format1_2g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("input#wep_format2_2g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("input#wep_format3_2g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("input#wep_format4_2g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("#ssid_cnt_2g").fieldset({
                fields: [
                    {name: "ssid"},
                    {name: "wds_mode"},
                    {name: "bssid"},
                    {name: "encryption"}
                ]
            }).hide();

            $("input#wep_select_2g").combobox({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_INDEX,
                labelCls: "l",
                items: [
                    {"value": "1", "name": $.su.CHAR.SYSPARA.KEY1},
                    {"value": "2", "name": $.su.CHAR.SYSPARA.KEY2},
                    {"value": "3", "name": $.su.CHAR.SYSPARA.KEY3},
                    {"value": "4", "name": $.su.CHAR.SYSPARA.KEY4}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var sec = $("input#encryption_2g").radio("getValue");
                var key = newValue[0];
                $("#wpa_cnt_24g").fieldset((sec == "psk") ? "show" : "hide");
                $("#wep_cnt_24g").fieldset((sec == "wep") ? "show" : "hide");
                $('#key1_cnt_2g').fieldset(((sec == "wep") && key=='1') ? "show":"hide");
                $('#key2_cnt_2g').fieldset(((sec == "wep") && key=='2') ? "show":"hide");
                $('#key3_cnt_2g').fieldset(((sec == "wep") && key=='3') ? "show":"hide");
                $('#key4_cnt_2g').fieldset(((sec == "wep") && key=='4') ? "show":"hide");
            });

            $("input#wep_select_2g").combobox("hide");
            $("input#wep_select_2g").combobox("setValue", "1");

            $("#w24g-wds").css({
                "display" : "none"
            });

            //w5g-wds
            var w5g_wds_title = $.su.CHAR.SYSPARA.W5G_WDS;
            $("div#w5g-wds").panel({
                title: w5g_wds_title,
                collapsible: false
            });
            
            $("input#enable_5g").checkbox({
                fieldLabel:$.su.CHAR.SYSPARA.WDS_FEATURE,
                labelCls:'l',
                cls:"part-separate",
                tips:"",
                tipsCls:"m",
                items: [
                    {boxlabel: $.su.CHAR.SYSPARA.WDS, uncheckedValue:"off", inputValue: "on"}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var val = (newValue[0]=="enable"||newValue[0]=="on") ? "on" : "off";
                var enc = $("input#encryption_5g").radio("getValue");
                var key = $("input#wep_select_5g").combobox("getValue")[0];

                var cnt = $("input#enable_5g").checkbox("getContainer");
                var isDisabled = $(cnt).hasClass("disabled");
                switch(val)
                {
                    case "on":
                        if(isDisabled)
                        {
                            return;
                        }
                        $("#ssid_cnt_5g").fieldset("show");
                        $("#wpa_cnt_5g").fieldset((enc == "psk") ? "show" : "hide");
                        $("#wep_cnt_5g").fieldset((enc == "wep") ? "show" : "hide");
                        $('#key1_cnt_5g').fieldset(((enc == "wep") && key=='1') ? "show":"hide");
                        $('#key2_cnt_5g').fieldset(((enc == "wep") && key=='2') ? "show":"hide");
                        $('#key3_cnt_5g').fieldset(((enc == "wep") && key=='3') ? "show":"hide");
                        $('#key4_cnt_5g').fieldset(((enc == "wep") && key=='4') ? "show":"hide");
                        break;
                    case "off":
                        $("#ssid_cnt_5g").fieldset("hide");
                        $("#wep_cnt_5g").fieldset("hide");
                        $("#wpa_cnt_5g").fieldset("hide");
                        $('#key1_cnt_5g').fieldset("hide");
                        $('#key2_cnt_5g').fieldset("hide");
                        $('#key3_cnt_5g').fieldset("hide");
                        $('#key4_cnt_5g').fieldset("hide");
                        break;
                }
            });

            $("input#ssid_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.SSID_BRIDEGE,
                labelCls:'l',
                vtype:"string_visible_allow_blank",
                allowBlank:false,
                maxLength:32,
                autoTrim:false,
                cls:"inline"
            });

            $("#wds_mode_5g").combobox({
                fieldLabel: $.su.CHAR.SYSPARA.WDS_MODE,
                labelCls: "l",
                items: [
                    {"value": "2", "name": $.su.CHAR.SYSPARA.AUTO},
                    {"value": "1", "name": $.su.CHAR.SYSPARA.WDS1},
                    {"value": "0", "name": $.su.CHAR.SYSPARA.WDS2}
                ]
            });

            $("button#syspara_survey_5g").button({
                text:$.su.CHAR.SYSPARA.SURVEY,
                handler:function(){
                    $("div#result_2g").hide();
                    tribandModule.hide("div#result_52g");
                    $("div#result_5g").show();
                    $("div#result_5g").grid("runProgress");
                    $("#refreshBtn_5g").button("disable");
                    survey_store_5g.load({}, function(){
                        $("div#result_5g").grid("prompt", true);
                        $("#refreshBtn_5g").button("enable");
                    });
                    $("div#survey").msg("show");
                },
                cls:"inline-block more_pad ml5"
            });


            $("input#bssid_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.MAC,
                vtype:"mac",
                maxLength:17,
                allowBlank:false,
                labelCls:'l',
                tips:$.su.CHAR.SYSPARA.MACUNIT
            });

            $("#wpa_cnt_5g").fieldset({
                fields: [
                    {name: "psk_key"}
                ]
            });

            $("#wep_cnt_5g").fieldset({
                fields: [
                    {name: "wep_select"},
                    {name: "wep_mode"}

                ]
            }).hide();

            $("input#encryption_5g").radio({
                fieldLabel: $.su.CHAR.WIRELESS.SECURITY,
                columns:3,
                labelCls: "l",
                cls:"part-separate",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.NONE, inputValue: 'none'},
                    {boxlabel: $.su.CHAR.SYSPARA.WPA, inputValue: 'psk'},
                    {boxlabel: $.su.CHAR.SYSPARA.WEP, inputValue: 'wep'}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var key = $("input#wep_select_5g").combobox("getValue")[0];
                $("#wpa_cnt_5g").fieldset((newValue == "psk") ? "show" : "hide");
                $("#wep_cnt_5g").fieldset((newValue == "wep") ? "show" : "hide");
                $('#key1_cnt_5g').fieldset(((newValue == "wep") && key=='1') ? "show":"hide");
                $('#key2_cnt_5g').fieldset(((newValue == "wep") && key=='2') ? "show":"hide");
                $('#key3_cnt_5g').fieldset(((newValue == "wep") && key=='3') ? "show":"hide");
                $('#key4_cnt_5g').fieldset(((newValue == "wep") && key=='4') ? "show":"hide");
            });

            $("input#psk_key_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:64,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key1_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key2_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key3_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("input#wep_key4_5g").textbox({
                fieldLabel: $.su.CHAR.SYSPARA.PASSWORD,
                maxLength:32,
                autoTrim:false,
                labelCls:'l'
            });

            $("#key1_cnt_5g").fieldset({
                fields: [
                    {name: "wep_format1"},
                    {name: "wep_key1"}
                ]
            }).hide();

            $("#key2_cnt_5g").fieldset({
                fields: [
                    {name: "wep_format2"},
                    {name: "wep_key2"}
                ]
            }).hide();

            $("#key3_cnt_5g").fieldset({
                fields: [
                    {name: "wep_format3"},
                    {name: "wep_key3"}
                ]
            }).hide();

            $("#key4_cnt_5g").fieldset({
                fields: [
                    {name: "wep_format4"},
                    {name: "wep_key4"}
                ]
            }).hide();

            $("input#wep_mode_5g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.AUTH_TYPE,
                labelCls: "l",
                columns:3,
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.AUTO, inputValue: 'auto'},
                    {boxlabel: $.su.CHAR.SYSPARA.OPEN, inputValue: 'open', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.SHARED, inputValue: 'shared'}
                ]
            });

            $("input#wep_format1_5g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("input#wep_format2_5g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("input#wep_format3_5g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("input#wep_format4_5g").radio({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_KEY_FORMAT,
                columns:3,
                labelCls: "l",
                items:[
                    {boxlabel: $.su.CHAR.SYSPARA.ASC, inputValue: 'asic', checked:true},
                    {boxlabel: $.su.CHAR.SYSPARA.HEX, inputValue: 'hex'}
                ]
            });

            $("#ssid_cnt_5g").fieldset({
                fields: [
                    {name: "ssid"},
                    {name: "bssid"},
                    {name: "wds_mode"},
                    {name: "encryption"}
                ]
            }).hide();

            $("input#wep_select_5g").combobox({
                fieldLabel: $.su.CHAR.SYSPARA.WEP_INDEX,
                labelCls: "l",
                items: [
                    {"value": "1", "name": $.su.CHAR.SYSPARA.KEY1},
                    {"value": "2", "name": $.su.CHAR.SYSPARA.KEY2},
                    {"value": "3", "name": $.su.CHAR.SYSPARA.KEY3},
                    {"value": "4", "name": $.su.CHAR.SYSPARA.KEY4}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var sec = $("input#encryption_5g").radio("getValue");
                var key = newValue[0];
                $("#wpa_cnt_5g").fieldset((sec == "psk") ? "show" : "hide");
                $("#wep_cnt_5g").fieldset((sec == "wep") ? "show" : "hide");
                $('#key1_cnt_5g').fieldset(((sec == "wep") && key=='1') ? "show":"hide");
                $('#key2_cnt_5g').fieldset(((sec == "wep") && key=='2') ? "show":"hide");
                $('#key3_cnt_5g').fieldset(((sec == "wep") && key=='3') ? "show":"hide");
                $('#key4_cnt_5g').fieldset(((sec == "wep") && key=='4') ? "show":"hide");
            });

            $("input#wep_select_5g").combobox("hide");
            $("input#wep_select_5g").combobox("setValue", "1");

            //wds form 2g
            var disableSurveyId_2g = false;
            $("form#w24g-wds-setting").form({
                proxy: ipv4Wds2gProxy,
                fields: [
                    {name: "enable", mapping: "enable"},
                    {name: "ssid", mapping: "ssid"},
                    {name: "wds_mode", mapping: "wds_mode"},
                    {name: "bssid", mapping: "bssid"},
                    {name: "encryption", mapping: "encryption"},
                    {name: "psk_key", mapping: "psk_key"},
                    {name: "wep_key1", mapping: "wep_key1"},
                    {name: "wep_key2", mapping: "wep_key2"},
                    {name: "wep_key3", mapping: "wep_key3"},
                    {name: "wep_key4", mapping: "wep_key4"},
                    {name: "isolate", mapping: "isolate"},
                    {name: "wep_format1", mapping: "wep_format1"},
                    {name: "wep_format2", mapping: "wep_format2"},
                    {name: "wep_format3", mapping: "wep_format3"},
                    {name: "wep_format4", mapping: "wep_format4"},
                    {name: "wep_select", mapping: "wep_select"},
                    {name: "wep_mode", mapping: "wep_mode"},
                    {name: "syspara_survey"}
                ],
                validator:function(){
                    var enable_2g = $("input#enable_2g").checkbox("getValue");
                    var ssid = $("input#ssid_2g").textbox("getValue");
                    var mac = $("input#bssid_2g").textbox("getValue");
                    if(enable_2g == "enable")
                    {
                        if((ssid == "") && (mac == ""))
                        {
                            $("input#ssid_2g").textbox("setError",$.su.CHAR.ERROR["00000040"]);
                            return false;
                        }
                    }

                    var encryption = $("input#encryption_2g").radio("getValue");
                    if(encryption == "none")
                    {
                        return true;
                    }
                    if(encryption == "psk")
                    {
                        var val = $("input#psk_key_2g").textbox("getValue");
                        var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
                        if(reg.test(val))
                        {
                            return true;
                        }
                        else
                        {
                            $("input#psk_key_2g").textbox("setError",$.su.CHAR.ERROR["00000066"]);
                            return false;
                        }
                    }
                    if(encryption == "wep")
                    {
                        var keyIndex_arr = $("input#wep_select_2g").combobox("getValue");
                        var keyIndex = keyIndex_arr[0];
                        var id  = "input#wep_key" + keyIndex + "_2g";
                        var formatId = "input#wep_format" + keyIndex + "_2g";
                        var format = $(formatId).radio("getValue");

                        var val = $(id).textbox("getValue");
                        var asc_reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}|[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13})$/;
                        var hex_reg = /^([0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/;
                        if(format == "asic")
                        {
                            if(asc_reg.test(val))
                            {
                                return true;
                            }
                            else
                            {
                                $(id).textbox("setError",$.su.CHAR.ERROR["00000120"]);
                                return false;
                            }
                        }
                        else
                        {
                            if(hex_reg.test(val))
                            {
                                return true;
                            }
                            else
                            {
                                $(id).textbox("setError",$.su.CHAR.ERROR["00000121"]);
                                return false;
                            }
                        }
                    }
                },
                submitBtn: "default"
            }).on("ev_loadData", function(e, data){
                $("form#w5g-wds-setting").form("enable");

                tribandModule.enable("form#w52g-wds-setting");

                initEnable();
                var support_band = data.extinfo.support_band;
                if((support_band == "2G") || (support_band == "none"))
                {
                    $("div#w5g-wds").panel("hide");
                }
                var tempData = data.extinfo || {};
                var wds2g_wds5g_compatible = tempData.wds2g_wds5g_compatible || "no";
                if(wds2g_wds5g_compatible == "no")
                {
                    var wds_2g = data.enable;
                    if(wds_2g == "on")
                    {
                        wds_2g_enable = true;
                         $("form#w5g-wds-setting").form("disable");
                        //默认双频的代码运行
                        if(!wds_5g_disable_step1 && !wds_5g_disable_step2)
                        {
                            $("input#enable_5g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE2);
                        }
                        //如果支持三频，则覆盖上面的内容
                        tribandModule.wds2g_Disable52g(wds_5g_disable_step1,wds_5g_disable_step2);
                    }
                    else
                    {
                        wds_2g_enable = false;
                        var wds_enable_band_exist = wds_2g_enable || wds_5g_enable;
                        if(!wds_5g_disable_step1 && !wds_5g_disable_step2 && !wds_5g_disable_step3 && !wds_enable_band_exist)
                        {
                            $("form#w5g-wds-setting").form("enable");
                            $("input#enable_5g").checkbox("setTips", "");
                        }
                        tribandModule.wds_Enable52g(wds_enable_band_exist);
                    }
                }
                if($.su.module.support_wds_dualmode){
                    $("#wds_mode_2g").combobox("disable");
                    $("#wds_mode_2g").combobox("hide");
                }

                w24g_wds_disabled = data.disabled;
            }).on("beforeSubmit", function(){
                if($("form#w24g-wds-setting").form("validate")){
                    $("form#w5g-wds-setting").form("disable");
                    tribandModule.disable("form#w52g-wds-setting");
                    var enable = $("#enable_2g").checkbox("getValue");
                    if(enable.length){
                        $("#enable_5g").checkbox("setValue","off");
                        tribandModule.setValue("#enable_52g","off");
                        $("#syspara_survey_2g").button("disable");
                        clearTimeout(disableSurveyId_2g);
                        disableSurveyId_2g = setTimeout(function(){
                            $("#syspara_survey_2g").button("enable");
                        },6000);
                    }
                }
            });

            // wds form 5g
            var disableSurveyId_5g = false;
            $("form#w5g-wds-setting").form({
                proxy: ipv4Wds5gProxy,
                fields: [
                    {name: "enable", mapping: "enable"},
                    {name: "ssid", mapping: "ssid"},
                    {name: "wds_mode", mapping: "wds_mode"},
                    {name: "bssid", mapping: "bssid"},
                    {name: "encryption", mapping: "encryption"},
                    {name: "psk_key", mapping: "psk_key"},
                    {name: "wep_key1", mapping: "wep_key1"},
                    {name: "wep_key2", mapping: "wep_key2"},
                    {name: "wep_key3", mapping: "wep_key3"},
                    {name: "wep_key4", mapping: "wep_key4"},
                    {name: "isolate", mapping: "isolate"},
                    {name: "wep_format1", mapping: "wep_format1"},
                    {name: "wep_format2", mapping: "wep_format2"},
                    {name: "wep_format3", mapping: "wep_format3"},
                    {name: "wep_format4", mapping: "wep_format4"},
                    {name: "wep_select", mapping: "wep_select"},
                    {name: "wep_mode", mapping: "wep_mode"},
                    {name: "syspara_survey"}
                ],
                validator:function(){
                    var enable_5g = $("input#enable_5g").checkbox("getValue");
                    var ssid = $("input#ssid_5g").textbox("getValue");
                    var mac = $("input#bssid_5g").textbox("getValue");
                    if(enable_5g == "enable")
                    {
                        if((ssid == "") && (mac == ""))
                        {
                            $("input#ssid_5g").textbox("setError",$.su.CHAR.ERROR["00000040"]);
                            return false;
                        }
                    }

                    var encryption = $("input#encryption_5g").radio("getValue");

                    if(encryption == "none")
                    {
                        return true;
                    }
                    if(encryption == "psk")
                    {
                        var val = $("input#psk_key_5g").textbox("getValue");
                        var reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/;
                        if(reg.test(val))
                        {
                            $("input#psk_key_5g").textbox("setNormal");
                            return true;
                        }
                        else
                        {
                            $("input#psk_key_5g").textbox("setError",$.su.CHAR.ERROR["00000066"]);
                            return false;
                        }
                    }
                    if(encryption == "wep")
                    {
                        var keyIndex_arr = $("input#wep_select_5g").combobox("getValue");
                        var keyIndex = keyIndex_arr[0];
                        var id  = "input#wep_key" + keyIndex + "_5g";
                        var formatId = "input#wep_format" + keyIndex + "_5g";
                        var format = $(formatId).radio("getValue");

                        var val = $(id).textbox("getValue");
                        var asc_reg = /^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}|[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13})$/;
                        var hex_reg = /^([0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/;
                        if(format == "asic")
                        {
                            if(asc_reg.test(val))
                            {
                                $(id).textbox("setNormal");
                                return true;
                            }
                            else
                            {
                                $(id).textbox("setError",$.su.CHAR.ERROR["00000120"]);
                                return false;
                            }
                        }
                        else
                        {
                            if(hex_reg.test(val))
                            {
                                $(id).textbox("setNormal");
                                return true;
                            }
                            else
                            {
                                $(id).textbox("setError",$.su.CHAR.ERROR["00000121"]);
                                return false;
                            }
                        }
                    }
                },
                submitBtn: "default"
            }).on("ev_loadData", function(e, data){
                $("form#w24g-wds-setting").form("enable");

                tribandModule.enable("form#w52g-wds-setting");

                initEnable();
                var tempData = data.extinfo || {};
                var wds2g_wds5g_compatible = tempData.wds2g_wds5g_compatible || "no";
                if(wds2g_wds5g_compatible == "no")
                {
                    var wds_5g = data.enable;
                    if(wds_5g == "on")
                    {
                        wds_5g_enable = true;
                        $("input#enable_2g").checkbox("disable");
                        $("form#w24g-wds-setting").form("disable");
                        if(!wds_2g_disable_step1 && !wds_2g_disable_step2)
                        {
                            $("input#enable_2g").checkbox("setTips", $.su.CHAR.SYSPARA.WDS_BAND_NOTICE);
                        }

                        tribandModule.wds5g_Disable52g(wds_2g_disable_step1,wds_2g_disable_step2);
                    }
                    else
                    {
                        wds_5g_enable = false;
                        var wds_enable_band_exist = wds_2g_enable;
                        wds_enable_band_exist = tribandModule.setWdsBandExist(wds_2g_enable);
                        if(!wds_2g_disable_step1 && !wds_2g_disable_step2 && !wds_2g_disable_step3 && !wds_enable_band_exist)
                        {
                            $("form#w24g-wds-setting").form("enable");
                            $("input#enable_2g").checkbox("setTips", "");
                        }

                        tribandModule.wds_Enable52g(wds_enable_band_exist);
                    }
                }

                if($.su.module.support_wds_dualmode ){
                    $("#wds_mode_5g").combobox("disable");
                    $("#wds_mode_5g").combobox("hide");
                }
                w5g_wds_disabled = data.disabled;

            }).on("beforeSubmit", function(){
                if($("form#w5g-wds-setting").form("validate")){
                    $("form#w24g-wds-setting").form("disable");

                    tribandModule.disable("form#w52g-wds-setting");

                    var enable = $("#enable_5g").checkbox("getValue");
                    if(enable.length){
                        $("#enable_2g").checkbox("setValue","off");

                        tribandModule.setValue("#enable_52g","off");

                        $("#syspara_survey_5g").button("disable");
                        clearTimeout(disableSurveyId_5g);
                        disableSurveyId_5g = setTimeout(function(){
                            $("#syspara_survey_5g").button("enable");
                        },6000);
                    }
                }
            });

            tribandModule.wds52gInit(initEnable,wds_2g_disable_step1,wds_2g_disable_step2,wds_2g_disable_step3,wds_5g_disable_step1,wds_5g_disable_step2,wds_5g_disable_step3);
        };

        interfaces.changeStepStatus = function(band,step){
            wds_2g_disable_step1 = true;
            switch(band){
                case "2g":
                    if(step == "step1"){
                        wds_2g_disable_step1 = true;
                    }else if(step == "step2"){
                        wds_2g_disable_step2 = true;
                    }else if(step == "step3"){
                        wds_2g_disable_step3 = true;
                    }
                    break;
                case "5g":
                    if(step == "step1"){
                        wds_5g_disable_step1 = true;
                    }else if(step == "step2"){
                        wds_5g_disable_step2 = true;
                    }else if(step == "step3"){
                        wds_5g_disable_step3 = true;
                    }
                    break;
                case "52g":
                    tribandModule.changeStepStatus(step);
                    break;
            }
        };

        interfaces.wds2gProxyRead = function(guest2gProxy,data,wireless_2g_disabled,wireless_2g_disabled_all){
           var tempData = data.extinfo || {};

            var wds_guest_compatible = tempData.wds_guest_compatible || "no";

            // if(wireless_2g_disabled == "on")
            // {
            //     wds_2g_disable_step1 = true;
            //     //$("form#w24g-setting").form("disable");
            //     //$("#syspara_survey_2g").button("disable");
            //     //$("#note_title_2g").removeClass("hidden");
            // }
            // else
            // {
                //$("#note_title_2g").addClass("hidden");
                if(wireless_2g_disabled_all == "on")
                {
                    wds_2g_disable_step2 = true;
                    $("input#enable_2g").checkbox("disable");
                    $("form#w24g-wds-setting").form("disable");
                    $("input#enable_2g").checkbox("setTips", $.su.CHAR.SYSPARA.ENABLE_TIPS);
                    $("#ssid_cnt_2g").fieldset("hide");
                }
                else
                {
                    if($("input#enable_2g").checkbox("getValue")[0] == "enable")
                    {
                        $("#ssid_cnt_2g").fieldset("show");
                    }
                    if(wds_guest_compatible == "no")
                    {
                        guest2gProxy.read({}, function(data){
                 
                            var tempData = data.extinfo || {};

                            var wds_guest_compatible = tempData.wds_guest_compatible || "no";
                            var enable = data.enable;
                            if(wds_guest_compatible == "no")
                            {
                                if(enable == "on")
                                {
                                    wds_2g_disable_step3 = true;
                                    $("form#w24g-wds-setting").form("disable");
                                    $("input#enable_2g").checkbox("disable");
                                    $("input#enable_2g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
                                }
                            }
                        });
                    }
                }
            // }
            // if(w24g_wds_disabled == "on"){
            //     $("form#w24g-wds-setting").form("disable");
            //     $("#syspara_survey_2g").button("disable");
            //     $("#wds_note_title_2g").removeClass("hidden");
            // }
        };

        interfaces.wds5gProxyRead = function(guest5gProxy,data,wireless_5g_disabled,wireless_5g_disabled_all){

            var tempData = data.extinfo || {};

            var wds_guest_compatible = tempData.wds_guest_compatible || "no";
            // if(wireless_5g_disabled == "on")
            // {
            //     wds_5g_disable_step1 = true;
            //     //$("form#w5g-setting").form("disable");
            //     //$("#syspara_survey_5g").button("disable");
            //     //$("#note_title_5g").removeClass("hidden");
            // }
            // else
            // {
                //$("#note_title_5g").addClass("hidden");
                if(wireless_5g_disabled_all == "on")
                {
                    wds_5g_disable_step2 = true;
                    $("form#w5g-wds-setting").form("disable");
                    $("input#enable_5g").checkbox("setTips", $.su.CHAR.SYSPARA.ENABLE_TIPS);
                    $("#ssid_cnt_5g").fieldset("hide");
                }
                else
                {
                    if($("input#enable_5g").checkbox("getValue")[0] == "enable")
                    {
                        $("#ssid_cnt_5g").fieldset("show");
                    }
                    if(wds_guest_compatible == "no")
                    {
                        guest5gProxy.read({}, function(data){
       
                            var tempData = data.extinfo || {};

                            var wds_guest_compatible = tempData.wds_guest_compatible || "no";
                            var enable = data.enable;
                            if(wds_guest_compatible == "no")
                            {
                                if(enable == "on")
                                {
                                    wds_5g_disable_step3 = true;
                                    $("form#w5g-wds-setting").form("disable");
                                    $("input#enable_5g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
                                }
                            }
                        });
                    }
                }
            // }
            // if(w5g_wds_disabled == "on"){
            //     $("form#w5g-wds-setting").form("disable");
            //     $("#syspara_survey_5g").button("disable");
            //     $("#wds_note_title_5g").removeClass("hidden");
            // }
        };

        interfaces.addHelpContent = function(content){
            var wdsItem = "SYSTEM_PARA_WDS";
            content.splice(1, 0, wdsItem);
            return content;
        };

        interfaces.wds5gLoadData = function(data){
            var wds_5g = data.enable;
            if(wds_5g == "on")
            {
                //wds_2g_disable_step3 = true;
                $("input#enable_2g").checkbox("disable");
                $("form#w24g-wds-setting").form("disable");
                $("input#enable_2g").checkbox("setTips", $.su.CHAR.ERROR["00000112"]);
            }
            else
            {
                if(!wds_2g_disable_step1&&!wds_2g_disable_step2)
                {
                    $("input#enable_2g").checkbox("enable");
                    $("input#enable_2g").checkbox("setTips", "");
                }
                
            }
        };

        interfaces.wds2gLoadData = function(data){
            var wds_2g = data.enable;

            if(wds_2g == "on")
            {
                //wds_5g_disable_step3 = true;
                $("form#w5g-wds-setting").form("disable");
                $("input#enable_5g").checkbox("setTips", $.su.CHAR.ERROR["00000112"]);
            }
            else
            {
                if(!wds_5g_disable_step1&&!wds_5g_disable_step2)
                {
                    $("input#enable_5g").checkbox("enable");
                    $("input#enable_5g").checkbox("setTips", "");
                }

            }
        };

        interfaces.setFiredArray = function(array){
            var firedArray = ["wds_mode"];
            return array.concat(firedArray);
        };

        interfaces.getWdsData = function(type){
            var data;
            switch(type){
                case "wds_2g_enable":
                    data = wds_2g_enable;
                    break;
                case "wds_5g_enable":
                    data = wds_5g_enable;
                    break;
            }

            return data;
        };

        return $.su.module.support_wds_show ? interfaces : empty;
    };


    wds.guest = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            wds2gProxyRead : _fn,
            wds5gProxyRead : _fn
        });

        var SYS_WIRELESS_2G_URL_NEW = $.su.url("/admin/wireless?form=syspara_2g");
        var SYS_WIRELESS_5G_URL_NEW = $.su.url("/admin/wireless?form=syspara_5g");

        var sysWireless2gProxy = new $.su.Proxy({
            url: SYS_WIRELESS_2G_URL_NEW
        });
        var sysWireless5gProxy = new $.su.Proxy({
            url: SYS_WIRELESS_5G_URL_NEW
        });

        interfaces.wds5gProxyRead = function(data){
            var tempData = data.extinfo || {};

            var wds_guest_compatible = tempData.wds_guest_compatible || "no";
            if(wds_guest_compatible == "no")
            {
                sysWireless5gProxy.read({}, function(data){
                    enable = data.enable;
                    if(enable == "on")
                    {
                        $("input#status_5g").checkbox("disable");
                        $("input#status_5g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
                    }
                    else
                    {
                        // $("input#enable_2g").switchbutton("enable");
                        // $("input#enable_2g").switchbutton("setTips", "");
                    }
                });
            }
        };

        interfaces.wds2gProxyRead = function(data){
            var tempData = data.extinfo || {};

            var wds_guest_compatible = tempData.wds_guest_compatible || "no";
            if(wds_guest_compatible == "no")
            {
                sysWireless2gProxy.read({}, function(data){
                    enable = data.enable;
                    
                    if(enable == "on")
                    {
                        $("input#status_2g").checkbox("disable");
                        $("input#status_2g").checkbox("setTips", $.su.CHAR.ERROR["00000113"]);
                    }
                    else
                    {
                        // $("input#enable_2g").switchbutton("enable");
                        // $("input#enable_2g").switchbutton("setTips", "");
                    }
                });
            }
        };

        return $.su.module.support_wds_show ? interfaces : empty;
    };

    wds.wirelessSettings = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            wds2gProxyRead : _fn,
            wds5gProxyRead : _fn
        });

        var sys_wds_2g = 0;
        var sys_wds_5g = 0;

        interfaces.wds2gProxyRead = function(data){
            sys_wds_2g = data.data.enable;
            if(sys_wds_2g == "on")
            {
                // $("#channel-2g").combobox("reset");
                $("#channel-2g").combobox("disable");
            }
            else
            {
                $("#channel-2g").combobox("enable");
            }
        };

        interfaces.wds5gProxyRead = function(data){
            sys_wds_5g = data.data.enable;
            if(sys_wds_5g == "on")
            {
                // $("#channel-5g").combobox("initItem");
                $("#channel-5g").combobox("disable");
            }
            else
            {
                $("#channel-5g").combobox("enable");
            }
        };  

        return $.su.module.support_wds_show ? interfaces : empty;
    };

    wds.status = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            showMode : _fn,
            judgeStatus : _fn
        });

        empty.helpInit = function(){
            $("#status_wds").hide();
        };

        interfaces.init = function(){
            $("#2g_wds_status").css({
                "display" : "none"
            });

            $("#5g_wds_status").css({
                "display" : "none"
            });

            $("input#wireless_24g_wds").textbox({
                fieldLabel: $.su.CHAR.STATUS.WDS_STATUS,
                labelCls:"xs",
                readOnly: true
            });

            $("input#wireless_5g_wds").textbox({
                fieldLabel: $.su.CHAR.STATUS.WDS_STATUS,
                labelCls:"xs",
                readOnly: true
            });
        };

        interfaces.showMode = function(data, frequent){
            var container;
            var input;
            var wdsStatus;
            var str;
            if(frequent == "2g"){
                container = $("#2g_wds_status");
                input = $('input#wireless_24g_wds');
                wdsStatus = data.wireless_2g_wds_status;
            }else if(frequent == "5g"){
                container = $("#5g_wds_status");
                input = $('input#wireless_5g_wds');
                wdsStatus = data.wireless_5g_wds_status;
            }else if(frequent == "52g"){
                container = $("#52g_wds_status");
                input = $('input#wireless_52g_wds');
                wdsStatus = data.wireless_5g_2_wds_status;
            }

            container.css({
                "display" : "block"
            });
            switch(wdsStatus){
                case 'disable':
                    str = $.su.CHAR.STATUS.DISABLED;
                    break;
                case 'init':
                    str = $.su.CHAR.STATUS.INIT;
                    break;
                case 'scan':
                    str = $.su.CHAR.STATUS.SCAN;
                    break;
                case 'auth':
                    str = $.su.CHAR.STATUS.AUTH;
                    break;
                case 'assoc':
                    str = $.su.CHAR.STATUS.ASSOC;
                    break;
                case 'run_encrypt':
                     str = $.su.CHAR.STATUS.RUN;
                    break;
                case 'run_unencrypt':
                     str = $.su.CHAR.STATUS.RUN;
                    break;
            }
            input.textbox('setValue', str);
        };

        interfaces.judgeStatus = function(data,band){
            var result = false;
            if(data["wireless_"+band+"_wds_status"] =='run_encrypt' || data["wireless_"+band+"_wds_status"] == 'run_unencrypt' ){
                return true;
            }else{
                return false;
            }
        }

        interfaces.helpInit = function(){
            $("#status_wds").show();
        };

        return $.su.module.support_wds_show ? interfaces : empty;
    };

    $.su.module.wds = wds;
}());
/**
 * Created by admin on 16-10-30.
 */
(function() {
    $.su.module = $.su.module || {};
    $.su.module.linkAgg = $.su.module.linkAgg || {};

    var linkAgg = {};

    var _fn = function() {
        return null;
    };

    linkAgg.lan = function() {
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        var link_agg_and_iptv_c9 = $.su.module.link_agg_and_iptv_c9;
        var link_agg_and_iptv_c4000v1 = $.su.module.link_agg_and_iptv_c4000v1;
        var link_agg_and_iptv_c4000v2 = $.su.module.link_agg_and_iptv_c4000v2;
        var link_agg_and_iptv_c5400x = $.su.module.link_agg_and_iptv_c5400x;

        var linkAggDate = null;
        var iptvPortList = [];
        var otherPortList = [];

        var LINK_AGG_URL = $.su.url('/admin/network?form=lan_agg');
        var IPTV_STATUS_URL = $.su.url('/admin/iptv?form=setting');
        var REBOOT_URL = $.su.url('/admin/system?form=reboot');
        var WAN_AGG_URL = $.su.url('/admin/network?form=addl_wan');


        // IPTV状态查询代理
        var iptvStatusProxy = new $.su.Proxy({
            url: IPTV_STATUS_URL
        });
        var linkAggProxy = new $.su.Proxy({
            url: LINK_AGG_URL
        });
        var rebootProxy = new $.su.Proxy({
            url: REBOOT_URL
        });
        var wanAggProxy = new $.su.Proxy({
            url: WAN_AGG_URL
        });

        interfaces.init = function() {
            $("#link_Agg").show();

            $("#link_Agg").panel({
                title: $.su.CHAR.LAN.LINK_AGG,
                collapsible: false
            });

            $("#noteTitle").html($.su.CHAR.LAN.NOTE);
            $("#note").html($.su.CHAR.LAN.LINK_AGG_NOTE);

            $("#lan2to5_noteTitle").html($.su.CHAR.LAN.NOTE);
            $("#lan1to4_noteTitle").html($.su.CHAR.LAN.NOTE);
            $("#lan1to4_note").html($.su.CHAR.LAN.LINK_AGG_NOTE_1TO4_1);
            $("#lan1to4_warning").html($.su.CHAR.LAN.LINK_AGG_NOTE_1TO4_2);

            $("#lan2and3_noteTitle").html($.su.CHAR.LAN.NOTE);
            $("#lan2and3_note").html($.su.CHAR.LAN.LINK_AGG_NOTE_2AND3);



            if (link_agg_and_iptv_c5400x) {
                $("#link_Agg_Hidden").css("display", "none");

                $("#note_cnt").hide();
                $("#lan2to5_note_cnt").hide();
                $("#lan2and3_note_cnt").show();

                $("#link_Agg_switch").switchbutton({
                    fieldLabel: $.su.CHAR.LAN.LINK_AGG,
                    proxy: linkAggProxy,
                    onValue: "1",
                    offValue: "0",
                    field: {
                        name: "enable_agg",
                        mapping: "enable_agg"
                    },
                    beforeHandler: function() {
                        $("#portChanged").msg("show");
                        return true;
                    }
                });
            } else {
                $("#lan2and3_note_cnt").hide();

                $("#link_Agg_switch").checkbox({
                    fieldLabel: $.su.CHAR.LAN.LINK_AGG,
                    labelCls: 'm',
                    cls: "link-agg-new",
                    tips: "",
                    items: [{
                        boxlabel: $.su.CHAR.IPTV.ENABLE,
                        inputValue: "1",
                        uncheckedValue: "0",
                        name: "enable_agg"
                    }]
                }).on("ev_change", function(e, oldValue, newValue) {
                    if (newValue.length == 0) {
                        if (link_agg_and_iptv_c9) {
                            $("#note_cnt").show();
                        }
                        $("#link_Agg_Hidden").addClass("hidden");
                    } else {
                        $("#note_cnt").hide();
                        if (link_agg_and_iptv_c4000v1) {
                            $("#lan2to5_note_cnt").show();
                            $("#lan1to4_note_cnt").hide();
                            $("#lan1to4_warning_cnt").hide();
                        } else if (link_agg_and_iptv_c4000v2) {
                            $("#lan2to5_note_cnt").hide();
                            $("#lan1to4_note_cnt").show();
                            $("#lan1to4_warning_cnt").hide();
                            if(otherPortList.length < 2 ){
                                $("#lan1to4_note_cnt").hide();
                                $("#lan1to4_warning_cnt").show();
                            }
                        } else if(link_agg_and_iptv_c9){
                            $("#lan2to5_note_cnt").hide();
                            $("#lan1to4_note_cnt").hide();
                            $("#lan1to4_warning_cnt").hide();
                        }
                        $("#link_Agg_Hidden").removeClass("hidden");
                    }
                });
                $("#link_Agg_switch").checkbox("setItemTips", ["1"], $.su.CHAR.LAN.LINK_AGG_NOTICE);

                if (link_agg_and_iptv_c9) {
                    //IPTV状态查询
                    $(linkAggProxy).on("ev_read", function() {
                        iptvStatusProxy.read({}, function(data) {
                            if (data.enable == "on") {
                                $("#link_Agg_switch").checkbox("setValue", "0");
                                $("#link_Agg_switch").checkbox("disable");
                            }
                        });
                    });

                    $("#link_Agg_Mode").combobox({
                        fieldLabel: $.su.CHAR.LAN.MODE,
                        items: [{
                            name: $.su.CHAR.LAN.LACP_PASSIVE,
                            value: "0"
                        }, {
                            name: $.su.CHAR.LAN.LACP_ACTIVE,
                            value: "1"
                        }],
                        noneSelectedText: $.su.CHAR.OPERATION.NOSELECTEDTEXT
                    });
                }

                var cls = "";
                var items = [];
                if(link_agg_and_iptv_c9){
                    items = [{
                        name: $.su.CHAR.LAN.LAN1,
                        boxlabel: $.su.CHAR.LAN.LAN1,
                        inputValue: "LAN1"
                    }, {
                        name: $.su.CHAR.LAN.LAN2,
                        boxlabel: $.su.CHAR.LAN.LAN2,
                        inputValue: "LAN2"
                    }, {
                        name: $.su.CHAR.LAN.LAN3,
                        boxlabel: $.su.CHAR.LAN.LAN3,
                        inputValue: "LAN3"
                    }, {
                        name: $.su.CHAR.LAN.LAN4,
                        boxlabel: $.su.CHAR.LAN.LAN4,
                        inputValue: "LAN4"
                    }];
                }else if (link_agg_and_iptv_c4000v1) {
                    cls = "link-agg-new";
                    items = [{
                        name: $.su.CHAR.LAN.LAN2,
                        boxlabel: $.su.CHAR.LAN.LAN2,
                        inputValue: "LAN2"
                    }, {
                        name: $.su.CHAR.LAN.LAN3,
                        boxlabel: $.su.CHAR.LAN.LAN3,
                        inputValue: "LAN3"
                    }, {
                        name: $.su.CHAR.LAN.LAN4,
                        boxlabel: $.su.CHAR.LAN.LAN4,
                        inputValue: "LAN4"
                    }, {
                        name: $.su.CHAR.LAN.LAN5,
                        boxlabel: $.su.CHAR.LAN.LAN5,
                        inputValue: "LAN5"
                    }];

                    otherPortList = ["LAN2", "LAN3", "LAN4", "LAN5"];
                }else if (link_agg_and_iptv_c4000v2) {
                    cls = "link-agg-new";
                    items = [{
                        name: $.su.CHAR.LAN.LAN1,
                        boxlabel: $.su.CHAR.LAN.LAN1,
                        inputValue: "LAN1"
                    }, {
                        name: $.su.CHAR.LAN.LAN2,
                        boxlabel: $.su.CHAR.LAN.LAN2,
                        inputValue: "LAN2"
                    }, {
                        name: $.su.CHAR.LAN.LAN3,
                        boxlabel: $.su.CHAR.LAN.LAN3,
                        inputValue: "LAN3"
                    }, {
                        name: $.su.CHAR.LAN.LAN4,
                        boxlabel: $.su.CHAR.LAN.LAN4,
                        inputValue: "LAN4"
                    }];

                    otherPortList = ["LAN1", "LAN2", "LAN3", "LAN4"];
                }

                $("#link_Agg_port").checkbox({
                    fieldLabel: $.su.CHAR.LAN.LINK_AGG_PORTS,
                    cls: cls,
                    items: items,
                    columns: 4
                }).on("ev_click", function() {
                    var checkedList = $("#link_Agg_port").checkbox("getValue");
                    if (checkedList.length == 1) {
                        $("#link_Agg_port").checkbox("enableItem", otherPortList);
                    }
                    if (checkedList.length == 2) {
                        var itemList = $("#link_Agg_port").get(0).items;
                        var disableList = [];
                        $(itemList).each(function(i, obj) {
                            if (checkedList.indexOf(obj.name) == -1) {
                                disableList.push(obj.inputValue);
                            }
                        });
                        $("#link_Agg_port").checkbox("disableItem", disableList);
                    }
                });

                var fields = [{
                    name: "enable_agg",
                    mapping: "enable_agg"
                }];
                if (link_agg_and_iptv_c9) {
                    fields = fields.concat([{
                        name: "lacpmode",
                        mapping: "lacpmode"
                    }]);
                }

                var linkAggForm = $("#link_Agg_Form").form({
                    proxy: linkAggProxy,
                    fields: fields
                }).on("ev_loadData", function(e, data) {
                    linkAggDate = data;
                    var portList = [];

                    // if (link_agg_and_iptv_c4000v1) {
                    //     data.LAN5 == "0" ? "" : portList.push("LAN5");
                    // } else {
                    //     data.LAN1 == "0" ? "" : portList.push("LAN1");
                    // }
                    // data.LAN2 == "0" ? "" : portList.push("LAN2");
                    // data.LAN3 == "0" ? "" : portList.push("LAN3");
                    // data.LAN4 == "0" ? "" : portList.push("LAN4");
                    if (link_agg_and_iptv_c4000v1) {
                        iptvStatusProxy.read({}, function(data) {
                            if (data.enable === "on") {
                                $("#lan2to5_note").html($.su.CHAR.LAN.LINK_AGG_NOTE_2TO5_1 + $.su.CHAR.LAN.LINK_AGG_NOTE_2TO5_2);
                                otherPortList = [];
                                data.lan2 == "IPTV" ? iptvPortList.push("LAN2") : otherPortList.push("LAN2");
                                data.lan3 == "IPTV" ? iptvPortList.push("LAN3") : otherPortList.push("LAN3");
                                data.lan4 == "IPTV" ? iptvPortList.push("LAN4") : otherPortList.push("LAN4");
                                data.lan5 == "IPTV" ? iptvPortList.push("LAN5") : otherPortList.push("LAN5");

                                var disableList = [];
                                var itemList = $("#link_Agg_port").get(0).items;
                                $(itemList).each(function(i, obj) {
                                    if (iptvPortList.indexOf(obj.name) >= 0) {
                                        var temp = [];
                                        temp.push(obj.inputValue);
                                        $("#link_Agg_port").checkbox("disableItem", temp);
                                        $("#link_Agg_port").checkbox("setItemTips", temp, $.su.CHAR.LAN.IPTV_USED_NOTE);
                                    }
                                });
                            } else {
                                $("#lan2to5_note").html($.su.CHAR.LAN.LINK_AGG_NOTE_2TO5_1);
                            }
                        });
                        $("#link_Agg_port").checkbox("setValue", portList);

                        var checkedList = $("#link_Agg_port").checkbox("getValue");
                        if (checkedList.length == 2) {
                            var itemList = $("#link_Agg_port").get(0).items;
                            var disableList = [];
                            $(itemList).each(function(i, obj) {
                                if (checkedList.indexOf(obj.name) == -1) {
                                    disableList.push(obj.inputValue);
                                }
                            });
                            $("#link_Agg_port").checkbox("disableItem", disableList);
                        }
                    }else if(link_agg_and_iptv_c4000v2){
                        iptvStatusProxy.read({}, function(data) {
                            otherPortList = [];
                            data.enable == "on" && data.lan1 != "Internet" ? iptvPortList.push("LAN1") : otherPortList.push("LAN1");
                            data.enable == "on" && data.lan2 != "Internet" ? iptvPortList.push("LAN2") : otherPortList.push("LAN2");
                            data.enable == "on" && data.lan3 != "Internet" ? iptvPortList.push("LAN3") : otherPortList.push("LAN3");
                            data.enable == "on" && data.lan4 != "Internet" ? iptvPortList.push("LAN4") : otherPortList.push("LAN4");

                            (data.enable == "off" || (data.enable == "on" && data.lan1 == "Internet")) && linkAggDate.LAN1 == "1" ? portList.push("LAN1") : "";
                            (data.enable == "off" || (data.enable == "on" && data.lan2 == "Internet")) && linkAggDate.LAN2 == "1" ? portList.push("LAN2") : "";
                            (data.enable == "off" || (data.enable == "on" && data.lan3 == "Internet")) && linkAggDate.LAN3 == "1" ? portList.push("LAN3") : "";
                            (data.enable == "off" || (data.enable == "on" && data.lan4 == "Internet")) && linkAggDate.LAN4 == "1" ? portList.push("LAN4") : "";

                            var disableList = [];
                            var itemList = $("#link_Agg_port").get(0).items;
                            $(itemList).each(function(i, obj) {
                                if (iptvPortList.indexOf(obj.name) >= 0) {
                                    var temp = [];
                                    temp.push(obj.inputValue);
                                    $("#link_Agg_port").checkbox("disableItem", temp);
                                    $("#link_Agg_port").checkbox("setItemTips", temp, $.su.CHAR.LAN.IPTV_USED_NOTE_2);
                                }
                            });

                            wanAggProxy.read({}, function(data) {
                                if(data.addl_wan_enable == "1"){
                                    if(otherPortList.length > 0 && otherPortList[0] === "LAN1"){
                                        otherPortList.shift();
                                    }
                                    if(portList.length > 0 && portList[0] === "LAN1"){
                                        portList.shift();
                                    }

                                    $("#link_Agg_port").checkbox("disableItem", ["LAN1"]);
                                    $("#link_Agg_port").checkbox("setItemTips", ["LAN1"], $.su.CHAR.LAN.IPTV_USED_NOTE_3);

                                    if(otherPortList.length < 2 ){
                                        $("#lan2to5_note_cnt").hide();
                                        $("#lan1to4_note_cnt").hide();
                                        $("#lan1to4_warning_cnt").show();
                                    }
                                }

                                $("#link_Agg_port").checkbox("setValue", portList);

                                var checkedList = $("#link_Agg_port").checkbox("getValue");
                                if (checkedList.length == 2) {
                                    var itemList = $("#link_Agg_port").get(0).items;
                                    var disableList = [];
                                    $(itemList).each(function(i, obj) {
                                        if (checkedList.indexOf(obj.name) == -1) {
                                            disableList.push(obj.inputValue);
                                        }
                                    });
                                    $("#link_Agg_port").checkbox("disableItem", disableList);
                                }
                                
                            });
                        });
                    }else{
                        $("#link_Agg_port").checkbox("setValue", portList);

                        var checkedList = $("#link_Agg_port").checkbox("getValue");
                        if (checkedList.length == 2) {
                            var itemList = $("#link_Agg_port").get(0).items;
                            var disableList = [];
                            $(itemList).each(function(i, obj) {
                                if (checkedList.indexOf(obj.name) == -1) {
                                    disableList.push(obj.inputValue);
                                }
                            });
                            $("#link_Agg_port").checkbox("disableItem", disableList);
                        }
                    }
                });

                $("button#linkAggSubmit").button({
                    text: $.su.CHAR.LAN.SAVE,
                    cls: "submit",
                    handler: function() {
                        var resultList = [];
                        resultList = $("#link_Agg_port").checkbox("getValue");
                        if (resultList.length == 2 || $("#link_Agg_switch").checkbox("getValue").length == 0) {
                            var data = {};
                            if (!link_agg_and_iptv_c5400x) {
                                var result = $("#link_Agg_Form").form("validate");

                                if (!result) {
                                    return false;
                                }
                                var newData = linkAggForm.form("serialize");

                                
                                if (link_agg_and_iptv_c4000v1) {
                                    newData.LAN5 == "LAN5" ? data.LAN5 = "1" : data.LAN5 = "0";
                                } else if (link_agg_and_iptv_c4000v2){
                                    newData.LAN1 == "LAN1" ? data.LAN1 = "1" : data.LAN1 = "0";
                                } else if (link_agg_and_iptv_c9) {
                                    newData.LAN1 == "LAN1" ? data.LAN1 = "1" : data.LAN1 = "0";
                                    newData.lacpmode == "1" ? data.lacpmode = "1" : data.lacpmode = "0";
                                }
                                newData.LAN2 == "LAN2" ? data.LAN2 = "1" : data.LAN2 = "0";
                                newData.LAN3 == "LAN3" ? data.LAN3 = "1" : data.LAN3 = "0";
                                newData.LAN4 == "LAN4" ? data.LAN4 = "1" : data.LAN4 = "0";
                                
                                data.enable_agg = newData.enable_agg;
                                
                                if (linkAggDate.enable_agg == "0" && data.enable_agg == "0") {
                                    if (!$("#link_Agg_Form").form("validate")) {
                                        return;
                                    };
                                    $("button#linkAggSubmit").button("disable");
                                    linkAggProxy.write(data, function() {
                                        $("button#linkAggSubmit").button("enable");
                                        $("#link_Agg_Form").form("prompt", true);
                                    }, function() {
                                        $("button#linkAggSubmit").button("enable");
                                        $("#link_Agg_Form").form("prompt", false);
                                    }, function() {
                                        $("button#linkAggSubmit").button("enable");
                                        $("#link_Agg_Form").form("prompt", false);
                                    });
                                } else {
                                    $("#portChanged").msg("show");
                                }
                            }else{
                                $("#portChanged").msg("show");
                            }
                            return true;
                        } else {
                            $("#portLimted").msg("show");
                            return false;
                        }
                    }
                });

                $("div#portLimted span.msg-content-container").html($.su.CHAR.ERROR["00000214"]);
                $("#portLimted").show();
                $("#portLimted").msg({
                    type: "alert",
                    cls: "l"
                });
            }

            $("div#portChanged span.msg-content-container").html($.su.CHAR.LAN.REBOOT_CONFIRM);
            $('p#link_agg_reboot_progressbar_text').html($.su.CHAR.INDEX.REBOOTING);
            $("#portChanged").show();
            $("#portChanged").msg({
                type: "confirm",
                cls: "l",
                okHandler: function() {
                    //监听数据改变
                    var data = {}; //暂存格式化后的数据
                    if (!link_agg_and_iptv_c5400x) {
                        var result = $("#link_Agg_Form").form("validate");

                        if (!result) {
                            return false;
                        }
                        var newData = linkAggForm.form("serialize");

                        if (link_agg_and_iptv_c4000v1) {
                            newData.LAN5 == "LAN5" ? data.LAN5 = "1" : data.LAN5 = "0";
                        } else if (link_agg_and_iptv_c4000v2){
                            newData.LAN1 == "LAN1" ? data.LAN1 = "1" : data.LAN1 = "0";
                        } else if (link_agg_and_iptv_c9) {
                            newData.LAN1 == "LAN1" ? data.LAN1 = "1" : data.LAN1 = "0";
                            newData.lacpmode == "1" ? data.lacpmode = "1" : data.lacpmode = "0";
                        }
                        newData.LAN2 == "LAN2" ? data.LAN2 = "1" : data.LAN2 = "0";
                        newData.LAN3 == "LAN3" ? data.LAN3 = "1" : data.LAN3 = "0";
                        newData.LAN4 == "LAN4" ? data.LAN4 = "1" : data.LAN4 = "0";

                        var value1 = JSON.stringify(linkAggDate);
                        var value2 = JSON.stringify(data);

                        data.enable_agg = newData.enable_agg;
                        if (value1 == value2) {
                            $("#link_Agg_Form").form("prompt", true);
                            // $("#portChanged").msg("show");
                        } else {
                            if (!$("#link_Agg_Form").form("validate")) {
                                return;
                            };
                            $("button#linkAggSubmit").button("disable");
                            linkAggProxy.write(data, function() {
                                $("button#linkAggSubmit").button("enable");
                                // $("#link_Agg_Form").form("prompt", true);
                                rebootProxy.write({}, function(data) {
                                    $('div#link_agg_reboot_note').hide();
                                    $('div#link_agg_loading_msg').show();
                                    $("#portChanged").msg('hideButtons');
                                    link_agg_reboot_pro_bar.progressbar("reset").progressbar('animate', 0, 1, parseInt(data.reboot_time) * 1000, function() {
                                        if (localStorage) {
                                            localStorage.setItem("token", "");
                                        };
                                        location.href = "/";
                                    });
                                });
                            }, function() {
                                $("button#linkAggSubmit").button("enable");
                                $("#link_Agg_Form").form("prompt", false);
                            }, function() {
                                $("button#linkAggSubmit").button("enable");
                                $("#link_Agg_Form").form("prompt", false);
                            });
                        }
                    } else {
                        if ($("#link_Agg_switch").switchbutton("getValue") == 1) {
                            data.enable_agg = "0";
                        } else {
                            data.enable_agg = "1";
                        }
                        linkAggProxy.write(data, function() {
                            rebootProxy.write({}, function(data) {
                                $('div#link_agg_reboot_note').hide();
                                $('div#link_agg_loading_msg').show();
                                $("#portChanged").msg('hideButtons');
                                link_agg_reboot_pro_bar.progressbar("reset").progressbar('animate', 0, 1, parseInt(data.reboot_time) * 1000, function() {
                                    if (localStorage) {
                                        localStorage.setItem("token", "");
                                    };
                                    location.href = "/";
                                });
                            });
                        }, function() {}, function() {});
                    }
                    return false;
                }
            });

            var link_agg_reboot_pro_bar = $('input#link_agg_reboot_loading_progressbar').progressbar({
                width: 397,
                height: 6,
                isProgressbar: true,
                cls: 'reboot-loading-probar'
            });
        };

        interfaces.helpInit = function(){
            if(link_agg_and_iptv_c4000v2){
                $("#link_agg_step_help").show();
            }else{
                $("#link_agg_step_help").hide();
            }
        };
        return $.su.module.linkAgg_support ? interfaces : empty;
    };

    linkAgg.iptv = function() {
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        var link_agg_and_iptv_c9 = $.su.module.link_agg_and_iptv_c9;

        var LINK_AGG_SWITCH_URL = $.su.url('/admin/network?form=lan_agg');

        interfaces.init = function() {
            var linkAggSwitchProxy = new $.su.Proxy({
                url: LINK_AGG_SWITCH_URL
            });

            if (link_agg_and_iptv_c9) {
                linkAggSwitchProxy.read({}, function(data) {
                    if (data.enable_agg == "1") {
                        $("#note_cnt").show();
                        $("form#iptv-setting").form("disable")
                    } else if (data.enable_agg == "0") {
                        $("#note_cnt").hide();
                    }
                });
            }
        };

        return $.su.module.linkAgg_support ? interfaces : empty;
    };

    $.su.module.linkAgg = linkAgg;
}());

/**
 * Created by admin on 16-10-30.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.igmpSnooping = $.su.module.igmpSnooping || {};

    var igmpSnooping  = {};

    var _fn = function(){
        return null;
    };

    igmpSnooping.iptv = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(interfaces, {
            helpInit: _fn
        });
        $.extend(empty, {
            helpInit: function(){
                $("#igmp-snooping").hide();
            }
        });


        interfaces.init = function(){
            $("#igmp_snooping_enable").removeClass("hidden");
            $("#igmp_snooping_enable").prop("disabled",false);
            
            $("#igmp_snooping_enable").checkbox({
                fieldLabel: $.su.CHAR.IPTV.IGMP_SNOOPING,
                labelCls: 'm',
                tips:"",
                items: [
                    {boxlabel: $.su.CHAR.IPTV.ENABLE, inputValue: "on", uncheckedValue: "off"}
                ]
            });
        };

        interfaces.extendField = function(formFields){
            var array = {name: "igmp_snooping_enable", mapping: "igmp_snooping_enable"};
            return formFields.concat(array);
        };

        return $.su.module.igmpSnooping_support ? interfaces : empty;
    };

    $.su.module.igmpSnooping = igmpSnooping;
}());
/**
 * Created by admin on 16-10-30.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.igmpWifi= $.su.module.igmpWifi || {};

    var modules  = {};

    var _fn = function(){
        return null;
    };

    modules.iptv = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(interfaces, {
            helpInit: _fn
        });
        $.extend(empty, {
            helpInit: function(){
                $("#igmp-wifi").hide();
            }
        });

        interfaces.init = function(){
            $("#mcwifi_enable").checkbox({
                fieldLabel: $.su.CHAR.IPTV.WIRELESS_MULTI_FORWARDING,
                labelCls: 'm',
                items: [
                    {boxlabel:$.su.CHAR.IPTV.ENABLE, inputValue:"on", uncheckedValue: "off"}
                ]
            });
        };

        interfaces.extendField = function(formFields){
            var object = {name: "mcwifi_enable", mapping: "mcwifi_enable"};
            return formFields.concat(object);
        };

        return $.su.module.igmpWifiSupport ? interfaces : empty;
    };

    $.su.module.igmpWifi = modules;
}());
/**
 * Created by admin on 16-11-1.
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.suppUsb = $.su.module.suppUsb || {};

    var _fn = function(){
        return null;
    };

    var boost  = {};

    boost.systemParameters = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            loadData : _fn,
            saveBtn : _fn
        });

        var nat_boost_ori = "";
        var qosEnable = "";
        var nat_reboot_time = 10*1000;

        var URL_STA_SET_NEW = $.su.url("/admin/traffic?form=status");
        var sysStaProxy = new $.su.Proxy({
            url: URL_STA_SET_NEW
        });

        var URL_QOS_SET_NEW = $.su.url("/admin/qos?form=settings");
        var qosProxy = new $.su.Proxy({
            url: URL_QOS_SET_NEW
        });

        interfaces.init = function(){
            $("#notice_nat_boost").removeClass("hidden");
            $("#reboot_nat_boost").removeClass("hidden");

            $("#factory_note").html($.su.CHAR.SYSPARA.NOTICE_NAT_REBOOT);       

            $("input#nat_boost_enable").checkbox({
                fieldLabel: $.su.CHAR.SYSPARA.NAT_BOOST,
                tips:"",
                labelCls:'l',
                items: [
                    {boxlabel: $.su.CHAR.SYSPARA.ENABLE_NAT_BOOST,  uncheckedValue:"off", inputValue: "on"}
                ]
            });

            qosProxy.read({}, function(data){
                var boost_qos_compatible = data.boost_qos_compatible || "no";
                if(boost_qos_compatible == "no")
                {
                    qosenable = data.enable;
                    if(qosenable == "on")
                    {
                        $("input#nat_boost_enable").checkbox("disable");
                        $("input#nat_boost_enable").checkbox("setTips", $.su.CHAR.ERROR["00000119"]);
                    }
                    else
                    {
                        sysStaProxy.read({}, function(data){
                            var boost_traffic_compatible = data.boost_traffic_compatible || "no";
                            if(boost_traffic_compatible == "no")
                            {
                                if(data.enable == "on")
                                {
                                    $("input#nat_boost_enable").checkbox("disable");
                                    $("input#nat_boost_enable").checkbox("setTips", $.su.CHAR.ERROR["00000119"]);
                                }
                            }
                        });
                    }
                }
            });

            $("#notice_content_nat_boost").html($.su.CHAR.SYSPARA.NOTICE_NAT_BOOST);
            $("#notice_nat_boost").msg({
                autoshow:false,
                cls:"xl",
                okHandler:function(){
                    $("#nat-setting").form("submit", {}, function(){}, null, null, false);
                    factory_pro_bar.progressbar("animate", 0, 1, nat_reboot_time,function(){
                        if(localStorage){
                            localStorage.setItem("token", "");
                        };
                        location.href = "http://tplinkwifi.net";
                    });
                    factory_pro_bar.progressbar("show");
                    $("#reboot_nat_boost").msg("show");
                    $("#notice_nat_boost").msg("hide");
                
                },
                cls:"m warning",
                cancelHandler:function(){
                    return true;
                },
                type: "confirm"
            });

            $("#reboot_nat_boost").msg({
                autoshow:false,
                cls:"xl",
                cls:"m warning",
                type: "confirm"
            }).msg("hideButtons");

            var factory_pro_bar  = $('input#factory_pro_bar').progressbar({
                fieldLabel: null,
                cls: 'inline',
                width: 300,
                height: 6,
                value: 0
            });
        };

        interfaces.extendField = function(formFields){
            var array = [
                {name: "boost_enable", mapping: "hw_enable"}
            ];
            return formFields.concat(array);
        }

        interfaces.loadData = function(data){
            nat_reboot_time = data.reboot_time*1000 || nat_reboot_time;
            nat_boost_ori =  data.hw_enable;
            $("input#nat_boost_enable").checkbox("show");
        };

        interfaces.saveBtn = function(){
            var nat_boost_trans = "";
            var nat_boost_new = $("#nat_boost_enable").checkbox("getValue");
            if(nat_boost_new.length == 0){
                nat_boost_trans = "off";
            }else{
                nat_boost_trans = "on";
            }

            if(nat_boost_ori != nat_boost_trans){
                $("#notice_nat_boost").msg("show");
            }else{
                $("#nat-setting").form("submit");
            }
        };

        interfaces.helpInit = function(){
            $("#sys_para_nat_boost").show();
            $("#sys_para_nat_boost_note").show();
        };
        
        empty.saveBtn = function(){
            $("#nat-setting").form("submit");
        };
        empty.helpInit = function(){
            $("#sys_para_nat_boost").hide();
            $("#sys_para_nat_boost_note").hide();
        };

        

        return $.su.module.boost_support ? interfaces : empty;
    };


    boost.qosSettings = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            loadData : _fn
        });

        var SYS_NAT_URL_NEW = $.su.url("/admin/nat?form=setting");

        var sysNatProxy = new $.su.Proxy({
            url: SYS_NAT_URL_NEW
        });

        interfaces.loadData = function(){
            sysNatProxy.read({}, function(data){
                var boost_traffic_compatible = data.boost_traffic_compatible || "no";
                if(boost_traffic_compatible == "no")
                {
                    var boost_enable = data.hw_enable;
                    if(boost_enable == "on")
                    {
                        $("input#enable").checkbox("disable");
                        $("input#enable").checkbox("setTips", $.su.CHAR.ERROR["00000111"]);
                    }
                }
            });
        };

        empty.helpInit = function(){
            $("#qos-boost").hide();
        };

        interfaces.helpInit = _fn;

        return $.su.module.boost_support ? interfaces : empty;
    };

    boost.sysStatistic = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        $.extend(empty, {
            loadData : _fn
        });

        var SYS_NAT_URL_NEW = $.su.url("/admin/nat?form=setting");

        var sysNatProxy = new $.su.Proxy({
            url: SYS_NAT_URL_NEW
        });

        interfaces.loadData = function(){
            sysNatProxy.read({}, function(data){
                var boost_traffic_compatible = data.boost_traffic_compatible || "no";
                if(boost_traffic_compatible == "no")
                {
                    var boost_enable = data.hw_enable;
                    if(boost_enable == "on")
                    {
                        $("input#statistic_statu").switchbutton("disable");
                        $("input#statistic_statu").switchbutton("setTips", $.su.CHAR.ERROR["00000114"]);

                        setTimeout(function(){
                            $("#statistic-setting .note").show();
                            if(window.myLine){
                                myLine.destroy();
                            }
                            grid.grid("removeAllData");
                            $("#chart").hide();
                            $("#intro").hide();
                            $("#time-interval").combobox("hide");
                            $("#device-usage").combobox("hide");
                            $("#folder").combobox("hide");
                            $("#device-name").hide();
                            clearInterval(refreshSysTraffic);
                        },100);
                    }
                    else
                    {
                        $("input#statistic_statu").switchbutton("enable");
                        $("input#statistic_statu").switchbutton("setTips", "");
                    }
                }
            });
        };

        empty.helpInit = function(){
            $("#statistic-boost").hide();
        };

        interfaces.helpInit = _fn;

        return $.su.module.boost_support ? interfaces : empty;
    };

    $.su.module.boost = boost;
}());

/**
 * Created by admin on 2017/03/01
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.multiCore = $.su.module.multiCore || {};

    var multiCore  = {};

    var _fn = function(){
        return null;
    };

    multiCore.status = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        $.extend(empty, {
            evLoadData: _fn
        });

        interfaces.init = function(){
            $("div.performance-switch").show();
            $("#performance-panel").hide();
            $("#performance-cpu-panel").show();

            $("span#performance_switch_cpu").html($.su.CHAR.STATUS.CPU);
            $("span#performance_switch_memory").html($.su.CHAR.STATUS.MEMORY);

            $('p#performance_cpu1_load').html($.su.CHAR.STATUS.CORE1);
            $('p#performance_cpu2_load').html($.su.CHAR.STATUS.CORE2);
            $('p#performance_cpu3_load').html($.su.CHAR.STATUS.CORE3);
            $('p#performance_cpu4_load').html($.su.CHAR.STATUS.CORE4);
            // $('p#multi_core_performance_memory_usage').html($.su.CHAR.STATUS.MEMORY_USAGE);

            $('input#performance_cpu1_load_bar').progressbar({
                text: "",
                fieldLabel: null,
                cls: 'performance-cpu-usage',
                unit: "%",
                expression: "percentage*100",
                // value: 0.1,
                isProgressbar: true,
                showPercentage: true,
                width: 213,
                height: 6
            });

            $('input#performance_cpu2_load_bar').progressbar({
                text: "",
                fieldLabel: null,
                cls: 'performance-cpu-usage',
                unit: "%",
                expression: "percentage*100",
                // value: 0.1,
                isProgressbar: true,
                showPercentage: true,
                width: 213,
                height: 6
            });

            $('input#performance_cpu3_load_bar').progressbar({
                text: "",
                fieldLabel: null,
                cls: 'performance-cpu-usage',
                unit: "%",
                expression: "percentage*100",
                // value: 0.1,
                isProgressbar: true,
                showPercentage: true,
                width: 213,
                height: 6
            });

            $('input#performance_cpu4_load_bar').progressbar({
                text: "",
                fieldLabel: null,
                cls: 'performance-cpu-usage',
                unit: "%",
                expression: "percentage*100",
                // value: 0.1,
                isProgressbar: true,
                showPercentage: true,
                width: 213,
                height: 6
            });

            $('input#multi_core_performance_memory_usage_bar').progressbar({
                text: "",
                fieldLabel: null,
                cls: 'performance-memory-usage',
                unit: "%",
                expression: "percentage*100",
                // value: 0.1,
                isProgressbar: true,
                showPercentage: true,
                width: 213,
                height: 6
            });

            $("span#performance_switch_cpu").click(function(){
                $(this).addClass('switch-select');
                $("span#performance_switch_memory").removeClass("switch-select");
                $("div#performance-memory-panel").css("display", "none");
                $("div#performance-cpu-panel").fadeIn(200);
            });

            $("span#performance_switch_memory").click(function(){
                $(this).addClass('switch-select');
                $("span#performance_switch_cpu").removeClass("switch-select");
                $("div#performance-cpu-panel").css("display", "none");
                $("div#performance-memory-panel").fadeIn(200);
            });
        };

        interfaces.extendField = function(array){
            var fields = [
                {name: "cpu1_usage", mapping: "cpu1_usage"},
                {name: "cpu2_usage", mapping: "cpu2_usage"},
                {name: "cpu3_usage", mapping: "cpu3_usage"},
                {name: "cpu4_usage", mapping: "cpu4_usage"},
                {name: "mem_usage", mapping: "mem_usage"}
            ];
            return array.concat(fields);
        };

        interfaces.evLoadData =  function(data){
            $('input#multi_core_performance_memory_usage_bar').progressbar("setValue", data.mem_usage);
        };

        interfaces.helpInit = _fn;
        return $.su.module.multi_core_support ? interfaces : empty;
    };    
    

    $.su.module.multiCore = multiCore;
}());
/**
 * Created by admin on 2017/03/01
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.wanAgg = $.su.module.wanAgg || {};

    var wanAgg  = {};

    var _fn = function(){
        return null;
    };

    wanAgg.internet = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        var link_agg_and_iptv_c4000v2 = $.su.module.link_agg_and_iptv_c4000v2;

        var WAN_AGG_URL = $.su.url('/admin/network?form=addl_wan');
        var REBOOT_URL = $.su.url('/admin/system?form=reboot');

        var LINK_AGG_URL = $.su.url('/admin/network?form=lan_agg');
        var IPTV_URL_NEW = $.su.url("/admin/iptv?form=setting");

        var wanAggProxy = new $.su.Proxy({
            url:WAN_AGG_URL
        });

        var rebootProxy = new $.su.Proxy({
            url:REBOOT_URL
        });

        var linkAggProxy = new $.su.Proxy({
            url: LINK_AGG_URL
        });

        var iptvProxy = new $.su.Proxy({
            url: IPTV_URL_NEW
        });

        interfaces.init = function(){
            $("#wan_Agg").show();

            $('p#wan_agg_reboot_progressbar_text').html($.su.CHAR.INDEX.REBOOTING);

            $("#wan_Agg").panel({
                title:$.su.CHAR.INTERNET.WAN_AGGREGATION,
                collapsible:false
            });
            

            $("#noteTitle").html($.su.CHAR.INTERNET.NOTE);
            $("#note").html($.su.CHAR.INTERNET.WAN_AGG_NOTE);

            $("#wan_Agg_switch").switchbutton({
                fieldLabel:$.su.CHAR.INTERNET.WAN_AGGREGATION,
                proxy:wanAggProxy,
                onValue:"1",
                offValue:"0",
                field: {
                    "name": "addl_wan_enable", mapping: "addl_wan_enable"
                },
                tips: "",
                tipsCls: "l",
                beforeHandler:function(){
                    $("#wanAggChanged").msg("show");
                    return true;
                }
            });

            if(link_agg_and_iptv_c4000v2){
                var linkAggData;
                linkAggProxy.read({}, function(data){
                    linkAggData = data;
                    iptvProxy.read({}, function(data){
                        var wanAggSwitch = $("#wan_Agg_switch").switchbutton("getValue");
                        if(((linkAggData.enable_agg == "1" && linkAggData.LAN1 == "1") || (data.enable == "on" && data.lan1 == "IPTV")) && wanAggSwitch != "1"){
                            $("#wan_Agg_switch").switchbutton("setTips", $.su.CHAR.INTERNET.WAN_AGG_NOTICE);
                            $("#wan_Agg_switch").switchbutton("disable");
                        }
                        else if(data.enable == "on" && data.lan2 != "Internet" && data.lan3 != "Internet" && data.lan4 != "Internet"){
                            $("#wan_Agg_switch").switchbutton("setTips", $.su.CHAR.ERROR["00000095"]);
                            $("#wan_Agg_switch").switchbutton("disable");
                        }
                        else{
                            $("#wan_Agg_switch").switchbutton("setTips", "");
                            $("#wan_Agg_switch").switchbutton("enable");
                        }
                    });
                });
            }

            $("div#wanAggChanged span.msg-content-container").html($.su.CHAR.INTERNET.REBOOT_CONFIRM);
            $("#wanAggChanged").show();
            $("#wanAggChanged").msg({
                type:"confirm",
                cls:"l",
                okHandler:function(){
                    var onValue = $("#wan_Agg_switch").get(0).onValue,
                        offValue = $("#wan_Agg_switch").get(0).offValue;
                        value = $("#wan_Agg_switch").switchbutton("getValue");

                    var dd = {},
                        name = $("#wan_Agg_switch").attr("name");

                    if (value == onValue){
                        dd[name] = offValue;
                    }
                    else if (value == offValue){
                        dd[name] = onValue;
                    }
                    $("#wan_Agg_switch").switchbutton("startWaiting");
                    wanAggProxy.write(dd, function(){
                        $("#wan_Agg_switch").switchbutton("stopWaiting");

                        rebootProxy.write({}, function(data){
                            $.su.app.runningModule.unload();
                            $('div#wan_agg_reboot_note').hide();
                            $('div#wan_agg_loading_msg').show();
                            $("#wanAggChanged").msg('hideButtons');
                            wan_agg_reboot_pro_bar.progressbar("reset").progressbar('animate',  0, 1, parseInt(data.reboot_time)*1000, function(){
                                if (localStorage){
                                    localStorage.setItem("token", "");
                                };
                                location.href = "/";
                            });
                        });
                    }, function(){
                        $("#wan_Agg_switch").switchbutton("stopWaiting");
                    }, function(){
                        $("#wan_Agg_switch").switchbutton("stopWaiting");
                    });
                    return false;
                }
            });

            var wan_agg_reboot_pro_bar = $('input#wan_agg_reboot_loading_progressbar').progressbar({
                width: 397,
                height: 6,
                isProgressbar: true,
                cls: 'reboot-loading-probar'
            });
        };

        empty.helpInit = function(){
            $("#internet_wan_aggregation_title").hide();
            $("#internet_wan_aggregation_detail").hide();
            $("#internet_wan_aggregation_note").hide();
            $("#internet_wan_aggregation_step").hide();
        };

        interfaces.helpInit = function(){
            $("#internet_wan_aggregation_title").show();
            $("#internet_wan_aggregation_detail").show();
            $("#internet_wan_aggregation_note").show();
            $("#internet_wan_aggregation_step").show();
        };

        return $.su.module.wanAgg_support ? interfaces : empty;
    };    
    

    $.su.module.wanAgg = wanAgg;
}());
/**
 * Created by admin on 2017/03/01
 */
(function(){
    $.su.module = $.su.module || {};
    $.su.module.port = $.su.module.port || {};

    var port  = {};

    var _fn = function(){
        return null;
    };

    port.iptv = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        var link_agg_and_iptv_c9 = $.su.module.link_agg_and_iptv_c9;
        var link_agg_and_iptv_c4000v1 = $.su.module.link_agg_and_iptv_c4000v1;
        var link_agg_and_iptv_c4000v2 = $.su.module.link_agg_and_iptv_c4000v2;
        var link_agg_and_iptv_c5400x = $.su.module.link_agg_and_iptv_c5400x;

        var innerHTML = "";
        var LINK_AGG_URL = $.su.url('/admin/network?form=lan_agg');
        var WAN_AGG_URL = $.su.url('/admin/network?form=addl_wan');

        var linkPortList = [];
        var wanAggEnable;

        var linkAggProxy = new $.su.Proxy({
            url:LINK_AGG_URL
        });

        var wanAggProxy = new $.su.Proxy({
            url: WAN_AGG_URL
        });

        interfaces.init = function(){
            if(link_agg_and_iptv_c4000v1){
                innerHTML += "<input type=\"text\" id=\"lan2\" name=\"lan2\" />";
                innerHTML += "<input type=\"text\" id=\"lan3\" name=\"lan3\" />";
                innerHTML += "<input type=\"text\" id=\"lan4\" name=\"lan4\" />";
                innerHTML += "<input type=\"text\" id=\"lan5\" name=\"lan5\" />";

                $("#lan_cnt").html(innerHTML);

                lan1_combo = $("#lan2").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN2,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan2_combo = $("#lan3").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN3,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan3_combo = $("#lan4").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN4,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });


                lan4_combo = $("#lan5").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN5,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE},
                        {"value": "Bridge",   "name":$.su.CHAR.IPTV.BRIDGE}
                    ]
                });

                linkAggProxy.read({}, function(data){
                    // data.LAN2 == "0" ? "" : linkPortList.push("LAN2");
                    // data.LAN3 == "0" ? "" : linkPortList.push("LAN3");
                    // data.LAN4 == "0" ? "" : linkPortList.push("LAN4");
                    // data.LAN5 == "0" ? "" : linkPortList.push("LAN5");
                    linkPortList = data;
                    interfaces.disablePort();
                });
            }
            else if(link_agg_and_iptv_c5400x){
                innerHTML += "<input type=\"text\" id=\"lan5\" name=\"lan5\" />";
                innerHTML += "<input type=\"text\" id=\"lan6\" name=\"lan6\" />";
                innerHTML += "<input type=\"text\" id=\"lan7\" name=\"lan7\" />";
                innerHTML += "<input type=\"text\" id=\"lan8\" name=\"lan8\" />";

                $("#lan_cnt").html(innerHTML);

                lan1_combo = $("#lan5").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN5,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan2_combo = $("#lan6").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN6,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan3_combo = $("#lan7").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN7,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });


                lan4_combo = $("#lan8").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN8,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE},
                        {"value": "Bridge",   "name":$.su.CHAR.IPTV.BRIDGE}
                    ]
                });
            }
            else if(link_agg_and_iptv_c4000v2 || link_agg_and_iptv_c9){
                innerHTML += "<input type=\"text\" id=\"lan1\" name=\"lan1\" />";
                innerHTML += "<input type=\"text\" id=\"lan2\" name=\"lan2\" />";
                innerHTML += "<input type=\"text\" id=\"lan3\" name=\"lan3\" />";
                innerHTML += "<input type=\"text\" id=\"lan4\" name=\"lan4\" />";

                $("#lan_cnt").html(innerHTML);

                lan1_combo = $("#lan1").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN1,
                    tipsCls: "l",
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan2_combo = $("#lan2").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN2,
                    tipsCls: "l",
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan3_combo = $("#lan3").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN3,
                    tipsCls: "l",
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });


                lan4_combo = $("#lan4").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN4,
                    tipsCls: "l",
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE},
                        {"value": "Bridge",   "name":$.su.CHAR.IPTV.BRIDGE}
                    ]
                });
            }

            if(link_agg_and_iptv_c4000v2){
                linkAggProxy.read({}, function(data){
                    linkPortList = data;
                    wanAggProxy.read({}, function(data){
                        wanAggEnable = data.addl_wan_enable;
                        interfaces.disablePort();
                    });
                });
            }
        };

        interfaces.extendField = function(formFields){
            var array = null;
            if(link_agg_and_iptv_c4000v1){
                var array = [
                    {name: "lan2", mapping: "lan2"},
                    {name: "lan3", mapping: "lan3"},
                    {name: "lan4", mapping: "lan4"},
                    {name: "lan5", mapping: "lan5"}
                ];
            }
            else if(link_agg_and_iptv_c5400x){
                var array = [
                    {name: "lan5", mapping: "lan5"},
                    {name: "lan6", mapping: "lan6"},
                    {name: "lan7", mapping: "lan7"},
                    {name: "lan8", mapping: "lan8"}
                ];
            }
            else if(link_agg_and_iptv_c4000v2 || link_agg_and_iptv_c9){
                var array = [
                    {name: "lan1", mapping: "lan1"},
                    {name: "lan2", mapping: "lan2"},
                    {name: "lan3", mapping: "lan3"},
                    {name: "lan4", mapping: "lan4"}
                ];
            }
            
            return formFields.concat(array);
        };

        interfaces.disablePort = function(){
            if(link_agg_and_iptv_c4000v1 && linkPortList.enable_agg === "1"){
                if(linkPortList.LAN2 == "1"){
                    lan1_combo.combobox("disable");
                    lan1_combo.combobox("setValue","Internet");
                    lan1_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
                if(linkPortList.LAN3 == "1"){
                    lan2_combo.combobox("disable");
                    lan2_combo.combobox("setValue","Internet");
                    lan2_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
                if(linkPortList.LAN4 == "1"){
                    lan3_combo.combobox("disable");
                    lan3_combo.combobox("setValue","Internet");
                    lan3_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
                if(linkPortList.LAN4 == "1"){
                    lan3_combo.combobox("disable");
                    lan3_combo.combobox("setValue","Internet");
                    lan3_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
            }else if(link_agg_and_iptv_c4000v2){
                if($("#mode").combobox("getValue")[0] == "Bridge" || $("#mode").combobox("getValue")[0] == "Custom"){
                    if(wanAggEnable == "1" || (linkPortList.LAN1 == "1" && linkPortList.enable_agg === "1")){
                        lan1_combo.combobox("disable");
                        lan1_combo.combobox("setValue","Internet");
                        lan1_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                    if(linkPortList.LAN2 == "1"  && linkPortList.enable_agg === "1"){
                        lan2_combo.combobox("disable");
                        lan2_combo.combobox("setValue","Internet");
                        lan2_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                    if(linkPortList.LAN3 == "1"  && linkPortList.enable_agg === "1"){
                        lan3_combo.combobox("disable");
                        lan3_combo.combobox("setValue","Internet");
                        lan3_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                    if(linkPortList.LAN4 == "1"  && linkPortList.enable_agg === "1"){
                        lan4_combo.combobox("disable");
                        lan4_combo.combobox("setValue","Internet");
                        lan4_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                }else{
                    lan1_combo.combobox("setTips", "");
                    lan2_combo.combobox("setTips", "");
                    lan3_combo.combobox("setTips", "");
                    lan4_combo.combobox("setTips", "");
                }
            }
        };

        interfaces.portConflict = function(){
            if(link_agg_and_iptv_c4000v1){
                var lan1 = lan1_combo.combobox("getValue");
                var lan2 = lan2_combo.combobox("getValue");
                var lan3 = lan3_combo.combobox("getValue");
                var lan4 = lan4_combo.combobox("getValue");
                if( linkPortList.LAN2 == "1" && ( lan1[0] == "IPTV" || lan1[0] == "IP-Phone") ){
                    lan1_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                if( linkPortList.LAN3 == "1" && ( lan2[0] == "IPTV" || lan2[0] == "IP-Phone") ){
                    lan2_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                if( linkPortList.LAN4 == "1" && ( lan3[0] == "IPTV" || lan3[0] == "IP-Phone") ){
                    lan3_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                if( linkPortList.LAN5 == "1" && ( lan4[0] == "IPTV" || lan4[0] == "IP-Phone") ){
                    lan4_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                return true;
            }else if(link_agg_and_iptv_c4000v2){
                var lan1 = lan1_combo.combobox("getValue");
                var lan2 = lan2_combo.combobox("getValue");
                var lan3 = lan3_combo.combobox("getValue");
                var lan4 = lan4_combo.combobox("getValue");
                if( linkPortList.LAN1 == "1"  && linkPortList.enable_agg === "1" && ( lan1[0] != "Internet") ){
                    lan1_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                if( wanAggEnable == "1" && ( lan1[0] != "Internet") ){
                    lan1_combo.combobox("setError", $.su.CHAR.ERROR["00000263"]);
                    $("a.iptv-port-conflict-2").on("mousedown", function(){
                        $.su.menu.advanced.goTo("internet");
                    });
                    return false;
                }
                if( linkPortList.LAN2 == "1" && linkPortList.enable_agg === "1" && ( lan2[0] != "Internet") ){
                    lan2_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                if( linkPortList.LAN3 == "1" && linkPortList.enable_agg === "1" && ( lan3[0] != "Internet") ){
                    lan3_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                if( linkPortList.LAN4 == "1" && linkPortList.enable_agg === "1" && ( lan4[0] != "Internet") ){
                    lan4_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    return false;
                }
                return true;
            }
            return true;
        };

        interfaces.getWanAggEnable = function(){
            return wanAggEnable;
        };

        interfaces.helpInit = function(){
            if($.su.module.link_agg_and_iptv_c4000v1){
                $("div#iptv_bridge_child_1to4").hide();
                $("div#iptv_bridge_child_2to5").show();
                $("div#iptv_bridge_child_5to8").hide();
                $("div#iptv_custom_1to4").hide();
                $("div#iptv_custom_2to5").show();
                $("div#iptv_custom_5to8").hide();
            }
            else if($.su.module.link_agg_and_iptv_c5400x){
                $("div#iptv_bridge_child_1to4").hide();
                $("div#iptv_bridge_child_2to5").hide();
                $("div#iptv_bridge_child_5to8").show();
                $("div#iptv_custom_1to4").hide();
                $("div#iptv_custom_2to5").hide();
                $("div#iptv_custom_5to8").show();
            }
            else{
                $("div#iptv_bridge_child_1to4").show();
                $("div#iptv_bridge_child_2to5").hide();
                $("div#iptv_bridge_child_5to8").hide();
                $("div#iptv_custom_1to4").show();
                $("div#iptv_custom_2to5").hide();
                $("div#iptv_custom_5to8").hide();
            }
        };

        return $.su.module.iptvLan_support ? interfaces : empty;
    };    
    
    port.quickSetup = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        var link_agg_and_iptv_c9 = $.su.module.link_agg_and_iptv_c9;
        var link_agg_and_iptv_c4000v1 = $.su.module.link_agg_and_iptv_c4000v1;
        var link_agg_and_iptv_c4000v2 = $.su.module.link_agg_and_iptv_c4000v2;
        var link_agg_and_iptv_c5400x = $.su.module.link_agg_and_iptv_c5400x;

        var innerHTML = "";
        var linkPortList = [];
        var wanAggEnable;
        var wanAggConflict = false;
        var linkAggConflict = false;

        var LINK_AGG_URL = $.su.url('/admin/network?form=lan_agg');
        var WAN_AGG_URL = $.su.url('/admin/network?form=addl_wan');

        var linkAggProxy = new $.su.Proxy({
            url:LINK_AGG_URL
        });

        var wanAggProxy = new $.su.Proxy({
            url: WAN_AGG_URL
        });

        interfaces.init = function(){
            if(link_agg_and_iptv_c4000v1){
                innerHTML += "<input type=\"text\" id=\"isp_special_lan2\" name=\"isp_special_lan2\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan3\" name=\"isp_special_lan3\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan4\" name=\"isp_special_lan4\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan5\" name=\"isp_special_lan5\" />";

                $("#lan_cnt").html(innerHTML);

                lan1_combo = $("#isp_special_lan2").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN2,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan2_combo = $("#isp_special_lan3").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN3,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan3_combo = $("#isp_special_lan4").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN4,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });


                lan4_combo = $("#isp_special_lan5").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN5,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE},
                        {"value": "Bridge",   "name":$.su.CHAR.IPTV.BRIDGE}
                    ]
                });

                linkAggProxy.read({}, function(data){
                    linkPortList = data;
                    interfaces.disablePort();
                });
            }
            else if(link_agg_and_iptv_c5400x){
                innerHTML += "<input type=\"text\" id=\"isp_special_lan5\" name=\"isp_special_lan5\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan6\" name=\"isp_special_lan6\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan7\" name=\"isp_special_lan7\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan8\" name=\"isp_special_lan8\" />";

                $("#lan_cnt").html(innerHTML);

                lan1_combo = $("#isp_special_lan5").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN5,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan2_combo = $("#isp_special_lan6").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN6,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan3_combo = $("#isp_special_lan7").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN7,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });


                lan4_combo = $("#isp_special_lan8").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN8,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE},
                        {"value": "Bridge",   "name":$.su.CHAR.IPTV.BRIDGE}
                    ]
                });
            }
            else if(link_agg_and_iptv_c4000v2 || link_agg_and_iptv_c9){
                innerHTML += "<input type=\"text\" id=\"isp_special_lan1\" name=\"isp_special_lan1\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan2\" name=\"isp_special_lan2\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan3\" name=\"isp_special_lan3\" />";
                innerHTML += "<input type=\"text\" id=\"isp_special_lan4\" name=\"isp_special_lan4\" />";

                $("#lan_cnt").html(innerHTML);

                lan1_combo = $("#isp_special_lan1").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN1,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan2_combo = $("#isp_special_lan2").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN2,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });

                lan3_combo = $("#isp_special_lan3").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN3,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "Internet-IPTV", "name": $.su.CHAR.IPTV.INTERNET_IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE}
                    ]
                });


                lan4_combo = $("#isp_special_lan4").combobox({
                    fieldLabel: $.su.CHAR.IPTV.LAN4,
                    items: [
                        {"value": "Internet", "name": $.su.CHAR.IPTV.INTERNET},
                        {"value": "IPTV", "name": $.su.CHAR.IPTV.IPTV},
                        {"value": "IP-Phone", "name": $.su.CHAR.IPTV.IP_PHONE},
                        {"value": "Bridge",   "name":$.su.CHAR.IPTV.BRIDGE}
                    ]
                });
            }

            if(link_agg_and_iptv_c4000v2){
                linkAggProxy.read({}, function(data){
                    linkPortList = data;
                    wanAggProxy.read({}, function(data){
                        wanAggEnable = data.addl_wan_enable;
                        interfaces.disablePort();
                    });
                });
            }
        };

        interfaces.extendField = function(formFields){
            var array = null;
            if(link_agg_and_iptv_c4000v1){
                var array = [
                    {name: "isp_special_lan2", mapping: "isp_special_lan2"},
                    {name: "isp_special_lan3", mapping: "isp_special_lan3"},
                    {name: "isp_special_lan4", mapping: "isp_special_lan4"},
                    {name: "isp_special_lan5", mapping: "isp_special_lan5"}
                ];
            }
            else if(link_agg_and_iptv_c5400x){
                var array = [
                    {name: "isp_special_lan5", mapping: "isp_special_lan5"},
                    {name: "isp_special_lan6", mapping: "isp_special_lan6"},
                    {name: "isp_special_lan7", mapping: "isp_special_lan7"},
                    {name: "isp_special_lan8", mapping: "isp_special_lan8"}
                ];
            }
            else if(link_agg_and_iptv_c4000v2 || link_agg_and_iptv_c9){
                var array = [
                    {name: "isp_special_lan1", mapping: "isp_special_lan1"},
                    {name: "isp_special_lan2", mapping: "isp_special_lan2"},
                    {name: "isp_special_lan3", mapping: "isp_special_lan3"},
                    {name: "isp_special_lan4", mapping: "isp_special_lan4"}
                ];
            }
            
            return formFields.concat(array);
        };

        interfaces.disablePort = function(){
            if(link_agg_and_iptv_c4000v1 && linkPortList.enable_agg === "1"){
                if(linkPortList.LAN2 == "1"){
                    lan1_combo.combobox("disable");
                    lan1_combo.combobox("setValue","Internet");
                    lan1_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
                if(linkPortList.LAN3 == "1"){
                    lan2_combo.combobox("disable");
                    lan2_combo.combobox("setValue","Internet");
                    lan2_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
                if(linkPortList.LAN4 == "1"){
                    lan3_combo.combobox("disable");
                    lan3_combo.combobox("setValue","Internet");
                    lan3_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
                if(linkPortList.LAN4 == "1"){
                    lan3_combo.combobox("disable");
                    lan3_combo.combobox("setValue","Internet");
                    lan3_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE);
                }
            }else if(link_agg_and_iptv_c4000v2){
                if($("#isp-special-mode").combobox("getValue")[0] == "Bridge" || $("#isp-special-mode").combobox("getValue")[0] == "Custom"){
                    if(wanAggEnable == "1" || (linkPortList.LAN1 == "1" && linkPortList.enable_agg === "1")){
                        lan1_combo.combobox("disable");
                        lan1_combo.combobox("setValue","Internet");
                        lan1_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                    if(linkPortList.LAN2 == "1"  && linkPortList.enable_agg === "1"){
                        lan2_combo.combobox("disable");
                        lan2_combo.combobox("setValue","Internet");
                        lan2_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                    if(linkPortList.LAN3 == "1"  && linkPortList.enable_agg === "1"){
                        lan3_combo.combobox("disable");
                        lan3_combo.combobox("setValue","Internet");
                        lan3_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                    if(linkPortList.LAN4 == "1"  && linkPortList.enable_agg === "1"){
                        lan4_combo.combobox("disable");
                        lan4_combo.combobox("setValue","Internet");
                        lan4_combo.combobox("setTips", $.su.CHAR.IPTV.LINK_AGG_NOTE_2);
                    }
                }else{
                    lan1_combo.combobox("setTips", "");
                    lan2_combo.combobox("setTips", "");
                    lan3_combo.combobox("setTips", "");
                    lan4_combo.combobox("setTips", "");
                }
            }
        };

        interfaces.portConflict = function(){
            if(link_agg_and_iptv_c4000v1){
                var lan1 = lan1_combo.combobox("getValue");
                var lan2 = lan2_combo.combobox("getValue");
                var lan3 = lan3_combo.combobox("getValue");
                var lan4 = lan4_combo.combobox("getValue");
                if( linkPortList.LAN1 == "1" && ( lan1[0] == "IPTV" || lan1[0] == "IP-Phone") ){
                    lan1_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.nav.goTo("advanced", "lan");
                    });
                    return false;
                }
                if( linkPortList.LAN3 == "1" && ( lan2[0] == "IPTV" || lan2[0] == "IP-Phone") ){
                    lan2_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.nav.goTo("advanced", "lan");
                    });
                    return false;
                }
                if( linkPortList.LAN4 == "1" && ( lan3[0] == "IPTV" || lan3[0] == "IP-Phone") ){
                    lan3_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.nav.goTo("advanced", "lan");
                    });
                    return false;
                }
                if( linkPortList.LAN5 == "1" && ( lan4[0] == "IPTV" || lan4[0] == "IP-Phone") ){
                    lan4_combo.combobox("setError", $.su.CHAR.ERROR["00000261"]);
                    $("a.iptv-port-conflict").on("mousedown", function(){
                        $.su.nav.goTo("advanced", "lan");
                    });
                    return false;
                }
                return true;
            }else if(link_agg_and_iptv_c4000v2){
                var lan1 = lan1_combo.combobox("getValue");
                var lan2 = lan2_combo.combobox("getValue");
                var lan3 = lan3_combo.combobox("getValue");
                var lan4 = lan4_combo.combobox("getValue");
                if( linkPortList.LAN1 == "1" && linkPortList.enable_agg === "1" && ( lan1[0] != "Internet") ){
                    lan1_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    linkAggConflict = true;
                }
                if( wanAggEnable == "1" && ( lan1[0] != "Internet") ){
                    lan1_combo.combobox("setError", $.su.CHAR.ERROR["00000263"]);
                    $("a.iptv-port-conflict-2").on("mousedown", function(){
                        $.su.menu.advanced.goTo("internet");
                    });
                    wanAggConflict = true;
                }
                if( linkPortList.LAN2 == "1" && linkPortList.enable_agg === "1" && ( lan2[0] != "Internet") ){
                    lan2_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    linkAggConflict = true;
                }
                if( linkPortList.LAN3 == "1" && linkPortList.enable_agg === "1" && ( lan3[0] != "Internet") ){
                    lan3_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    linkAggConflict = true;
                    return false;
                }
                if( linkPortList.LAN4 == "1" && linkPortList.enable_agg === "1" && ( lan4[0] != "Internet") ){
                    lan4_combo.combobox("setError", $.su.CHAR.ERROR["00000262"]);
                    $("a.iptv-port-conflict-1").on("mousedown", function(){
                        $.su.menu.advanced.goTo("lan");
                    });
                    linkAggConflict = true;
                }
                if(wanAggConflict || linkAggConflict){
                    return false;
                }else{
                    return true;
                }
            }
            return true;
        };

        interfaces.closeAgg = function(callback){
            if(wanAggConflict){
                wanAggProxy.write({
                    "addl_wan_enable": "0"
                }, function(data){
                    if(linkAggConflict){
                        linkPortList.enable_agg = "0";
                        linkAggProxy.write(linkPortList, function(data){
                            callback();
                        });
                    }else{
                        callback();
                    }
                });
            }else if(linkAggConflict){
                linkPortList.enable_agg = "0";
                linkAggProxy.write(linkPortList, function(data){
                    callback();
                });
            }else{
                callback();
            }
        };

        interfaces.getWanAggEnable = function(){
            return wanAggEnable;
        };


        interfaces.helpInit = _fn;

        return $.su.module.iptvLan_support ? interfaces : empty;
    }

    $.su.module.port = port;
}());
(function(){
    $.su.module = $.su.module || {};
    $.su.module.https= $.su.module.https || {};

    var modules  = {};

    var _fn = function(){
        return null;
    };

    modules.administration = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        var ACC_LOCAL_HTTPS_URL_NEW = $.su.url("/admin/administration?form=https");
        var URL_VIRTUAL = $.su.url("/admin/nat?form=vs"); //data/virtualServers.json
        var URL_PORT = $.su.url("/admin/nat?form=pt"); //data/portTriggering.json
        var ACC_REMOTE_URL_NEW = $.su.url("/admin/administration?form=remote");

        var localHttpsProxy = new $.su.Proxy({
            url: ACC_LOCAL_HTTPS_URL_NEW
        });

        var virtualProxy = new $.su.Proxy({
            url: URL_VIRTUAL
        });

        var portTriggeringProxy = new $.su.Proxy({
            url: URL_PORT
        });

        var remoteProxy = new $.su.Proxy({
            url: ACC_REMOTE_URL_NEW
        });

        var lanIP = 0;
        var lanMask = 0;

        var lanProxy = new $.su.Proxy({
            url: $.su.url('/admin/network?form=lan_ipv4')
        });

        lanProxy.read({}, function(data){
            lanIP = data.ipaddr;
            lanMask = data.mask_type.toUpperCase()=='CUSTOM'?data.custom_value:data.mask_type;
        });

        var virtual_port_list = [];
        virtualProxy.read({}, function(data){
            var len = data.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                var enable = data[i].enable;
                var protocol = data[i].protocol.toUpperCase();
                var port = data[i].external_port;
                if( (enable == "on") && (protocol != "UDP"))
                {
                    virtual_port_list.push(port);
                }
            };
        });

        $.extend(empty, {
            init: function(){
                var innerHTML =    '<input type="text"  id="port" name="port" value="" />';
                    innerHTML +=   '<input type="text"  id="ipaddr" name="ipaddr" value="" />';

                $("#ip_port_cnt").html(innerHTML);

                $("#ip_port_cnt").fieldset({
                    fields: [
                        {name: "ipaddr"},
                        {name: "port"}
                    ]
                });

                $("input#enable_remote").radio({
                    fieldLabel: "",
                    labelCls: 'l',
                    items:[
                        {boxlabel: $.su.CHAR.ACCOUNT.DISABLE_REMOTE_MANAGEMENR, inputValue: "off", id:"radio-1"},
                        {boxlabel: $.su.CHAR.ACCOUNT.ENABLE_REMOTE_MANAGEMENR_ALL, inputValue: "all", id:"radio-2"},
                        {boxlabel: $.su.CHAR.ACCOUNT.ENABLE_REMOTE_MANAGEMENR, inputValue: "partial", id:"radio-3"}
                    ],
                    column:1
                }).on("ev_change", function(e, oldValue, newValue){
                    if(newValue == "off")
                    {
                        $("#ip_port_cnt").fieldset("disable");
                    }
                    else if(newValue == "all")
                    {
                        $("#ip_port_cnt").fieldset("enable");
                        $("#ipaddr").textbox("disable");
                    }
                    else
                    {
                        $("#ip_port_cnt").fieldset("enable");
                    }
                    
                });


                $("input#port").textbox({
                    fieldLabel: $.su.CHAR.ACCOUNT.WEB,
                    vtype:"number",
                    textFormat: $.su.format.number,
                    allowBlank: false,
                    maxLength: 5,
                    validator:function(val){
                        var val = parseInt(val,10);
                        if( (val!=80) && (val<1024))
                        {
                            return $.su.CHAR.ERROR["00000042"]; 
                        }
                        if( val>=65536 )
                        {
                            return $.su.CHAR.ERROR["00000042"]; 
                        }
                        return true;
                    },
                    labelCls:'l'
                });

                $("input#ipaddr").textbox({
                    fieldLabel: $.su.CHAR.ACCOUNT.REMOTEIP,
                    labelCls:'l',
                    vtype:{
                        vtype:"ip",
                        allowAllOneFlag:false
                    },
                    textFormat:$.su.format.ip,
                    // tipsCls:"s",
                    maxLength:15,
                    allowBlank:false
                });

                function conflictPort(port, portListStr)
                {
                    var len = portListStr.length;
                    for (var i = len - 1; i >= 0; i--) 
                    {
                        if(portListStr[i].indexOf("-") >= 0)
                        {
                            var arr = portListStr[i].split("-");
                            if( (port >= arr[0]) && (port <= arr[1]))
                            {
                                return true;
                            }
                        }
                        else
                        {
                            if(port == portListStr[i])
                            {
                                return true;
                            }
                        }
                    }

                    return false;
                }


                $("form#remote-setting").form({
                    proxy: remoteProxy,
                    fields: [
                        {name: "enable", mapping: "enable"},
                        {name: "port", mapping: "port"},
                        {name: "ipaddr", mapping: "ipaddr"}
                    ],
                    // submitBtn: null
                    // submitBtn: "#submit-btn",
                    submitBtn: "#remote-setting-submit",
                    validator:function(){
                        var port = $("input#port").textbox("getValue");
                        // var enable = $("#enable_remote").checkbox("getValue");
                        var enable = $("#enable_remote").radio("getValue");
                        // if(enable[0] == "enable")
                        if(enable == "partial" || enable == "all")
                        {
                            if(conflictPort(port, virtual_port_list))
                            {
                                $("#virtual_alert_cnt").msg("show");
                                return false;
                            }
                        }
                        // console.log(lanIP, lanMask);
                        if( $("input#enable_remote").radio("getValue") == "partial" && $.su.func.isSameNet( $("#ipaddr").textbox('getValue'), lanIP, lanMask) ){
                            $("#ipaddr").textbox("setError");
                            $("#remote-setting").form('setError',  $.su.CHAR.ERROR['00000056']);
                            return false;
                        }


                        return true;
                    }
                    // submitBtn: "#submit-btn"
                });

                var isRemoteLogin = false;
                remoteProxy.read({}, function(data){
                    isRemoteLogin = data.remote;
                });

                function goToNewUrl()
                {
                    var oriUrl = top.location.href;
                    var stIindex = oriUrl.indexOf('//');
                    var port = $("input#port").textbox("getValue");

                    top.location.href = oriUrl.slice(0, stIindex+2) + oriUrl.slice(stIindex+2).split('/')[0].split(':')[0] + ':' + port;
                }

                function callback_remote_setting(data) {
                    if(isRemoteLogin){
                        var t = setTimeout(function(){
                            remoteProxy.read({}, null, null, function(data) {
                            goToNewUrl();
                            });
                        }, 1000);
                    }
                }

                $('button#remote-setting-submit').button({
                    text: $.su.CHAR.LAN.SAVE,
                    cls: "submit",
                    handler: function(){
                        $("form#remote-setting").form('submit', {}, callback_remote_setting);
                    }
                });

                $("#virtual_alert_cnt").msg({
                    okHandler:function(){
                        // restore_write();
                        // $($("div#virtualServersGrid").grid("getEditor")).form("submit", )
                        // console.log("form#remote-setting", $("form#remote-setting"));
                        if( $("input#enable_remote").radio("getValue") == "partial" && $.su.func.isSameNet( $("#ipaddr").textbox('getValue'), lanIP, lanMask) ){
                            $("#ipaddr").textbox("setError");
                            $("#remote-setting").form('setError',  $.su.CHAR.ERROR['00000056']);
                            $("#virtual_alert_cnt").msg("close");
                            return false;
                        }
                        $("form#remote-setting").form("submit",null,callback_remote_setting,null,null,true,false);
                        // console.log(22);
                    },
                    cls:"m warning",
                    cancelHandler:function(){
                        return true;
                    },
                    type: "prompt"
                });

                $("#virtual_confirm_content").html($.su.CHAR.ACCOUNT.NOTICE);

                $("#ip_port_cnt").fieldset("disable");
            },
            helpInit: function(){
                return "ADMIN_REMOTE_WITHOUT_HTTPS";
            },
            helpAfterLoad: function(){
                $("#local_management_https").hide();
            }
        });


        interfaces.init = function(){
            $("input#local_https").switchbutton({
                fieldLabel: $.su.CHAR.ACCOUNT.LOCAL_HTTPS,
                proxy: localHttpsProxy,
                onValue: "on",
                offValue: "off",
                labelCls: "m",
                cls: "form-inner",
                field: {
                    "name": "https_enable"
                }
            });

            var port_triggering_port_list = [];

            var innerHTML =    '<input type="text" id="web_address" name="web_address" value="" />';
                innerHTML +=   '<input type="text" id="https_port" name="https_port" value="" />';
                innerHTML +=   '<input type="text" id="http_port" name="http_port" value="" />';
                innerHTML +=   '<input type="text" id="managers" name="managers" value="" />';
                innerHTML +=   '<input type="text" id="ipaddr" name="ipaddr" value="" />';

            $("#ip_port_cnt").html(innerHTML);

            

            portTriggeringProxy.read({}, function(data){
                var len = data.length;
                var arr = [];
                for (var i = 0; i < len; i++) {
                    var enable = data[i].enable;
                    var protocol = data[i].external_protocol.toUpperCase();
                    var port = data[i].external_port;
                    if( (enable == "on") && (protocol != "UDP"))
                    {
                        port_triggering_port_list.push(port);
                    }
                };
            });

            $("#ip_port_cnt").fieldset({
                fields: [
                    {name: "web_address"},
                    {name: "https_port"},
                    {name: "http_port"},
                    {name: "managers"},
                    {name: "ipaddr"}
                ]
            });

            $("input#enable_remote").checkbox({
                fieldLabel: $.su.CHAR.ACCOUNT.REMOTE,
                labelCls: 'l',
                items: [
                    {boxlabel: $.su.CHAR.ACCOUNT.ENABLE, uncheckedValue:"off", inputValue: "on"}
                ]
            }).on("ev_change", function(e, oldValue, newValue){
                var val = (newValue[0]=="enable"||newValue[0]=="on") ? "on" : "off";
                switch(val)
                {
                    case 'on':
                        $("#ip_port_cnt").fieldset("show");
                        var managers = $("input#managers").combobox("getValue");
                        if(managers[0]=="all"){
                            $("#ipaddr").textbox("disable");
                            $("#ipaddr").textbox("hide");
                        }
                        if(managers[0]=="specified"){
                            $("#ipaddr").textbox("enable");
                            $("#ipaddr").textbox("show");
                        }
                        break;
                    case 'off':
                        $("#ip_port_cnt").fieldset("hide");
                        break;
                }
            });

            $("input#web_address").textbox({
                fieldLabel: $.su.CHAR.ACCOUNT.WEB_ADDRESS_FOR_MANAGEMENT,
                labelCls: "l",
                readOnly: true
            });

            $("input#https_port").textbox({
                fieldLabel: $.su.CHAR.ACCOUNT.HTTPS_PORT,
                vtype:"number",
                textFormat: $.su.format.number,
                allowBlank: false,
                maxLength: 5,
                validator:function(val){
                    var val = parseInt(val, 10);
                    
                    if( (val!=443) && (val<1024))
                    {
                        return $.su.CHAR.ERROR["00000043"]; 
                    }
                    if( val>=65536 )
                    {
                        return $.su.CHAR.ERROR["00000043"]; 
                    }

                    var http_port = parseInt($("input#http_port").textbox("getValue"), 10);
                    if(val == http_port)
                    {
                        return $.su.CHAR.ACCOUNT.HTTPS_PORT_CONFLICT_2;
                    }
                    return true;
                },
                labelCls:'l'
            });

            $("input#http_port").textbox({
                fieldLabel: $.su.CHAR.ACCOUNT.HTTP_PORT,
                vtype:"number",
                textFormat: $.su.format.number,
                allowBlank: false,
                maxLength: 5,
                validator:function(val){
                    var val = parseInt(val,10);
                    
                    if( (val!=80) && (val<1024))
                    {
                        return $.su.CHAR.ERROR["00000042"]; 
                    }
                    if( val>=65536 )
                    {
                        return $.su.CHAR.ERROR["00000042"]; 
                    }

                    var https_port = parseInt($("input#https_port").textbox("getValue"), 10);
                    if(val == https_port)
                    {
                        return $.su.CHAR.ACCOUNT.HTTP_PORT_CONFLICT_2;
                    }
                    return true;
                },
                labelCls:'l'
            });

            $("input#managers").combobox({
                fieldLabel: $.su.CHAR.ACCOUNT.REMOTE_MANAGERS,
                labelCls: "l",
                items: [{
                    name: $.su.CHAR.ACCOUNT.ALL_DEVICES,
                    value: "all"
                }, {
                    name: $.su.CHAR.ACCOUNT.SPECIFIED_DEVICE,
                    value: "specified"
                }],
                noneSelectedText: $.su.CHAR.OPERATION.NOSELECTEDTEXT
            }).on("ev_change", function(e, oldValue, newValue){
                switch(newValue[0])
                {
                    case 'all':
                        $("#ipaddr").textbox("disable");
                        $("#ipaddr").textbox("hide");
                        break;
                    case 'specified':
                        $("#ipaddr").textbox("enable");
                        $("#ipaddr").textbox("show");
                        break;
                }
            });

            $("input#ipaddr").textbox({
                fieldLabel: $.su.CHAR.ACCOUNT.ONLY_IP,
                labelCls:'l',
                vtype:{
                    vtype:"ip",
                    allowAllOneFlag:false
                },
                textFormat:$.su.format.ip,
                // tipsCls:"s",
                maxLength:15,
                allowBlank:false
            });

            function conflictPort(port, portListStr)
            {
                var len = portListStr.length;
                for (var i = len - 1; i >= 0; i--) 
                {
                    if(portListStr[i].indexOf("-") >= 0)
                    {
                        var arr = portListStr[i].split("-");
                        if( (port >= arr[0]) && (port <= arr[1]))
                        {
                            return true;
                        }
                    }
                    else
                    {
                        if(port == portListStr[i])
                        {
                            return true;
                        }
                    }
                }

                return false;
            }

            var isRemoteLogin = false;

            $("form#remote-setting").form({
                proxy: remoteProxy,
                fields: [
                    {name: "enable", mapping: "enable"},
                    {name: "web_address", mapping: "web_address"},
                    {name: "https_port", mapping: "https_port"},
                    {name: "http_port", mapping: "http_port"},
                    {name: "managers", mapping: "managers"},
                    {name: "ipaddr", mapping: "ipaddr"}
                ],
                submitBtn: "#remote-setting-submit",
                validator:function(){
                    var http_port = $("input#http_port").textbox("getValue");
                    var https_port = $("input#https_port").textbox("getValue");
                    
                    var enable_remote_value = $("#enable_remote").checkbox("getValue");
                    var enable = (enable_remote_value[0]=="enable"||enable_remote_value[0]=="on") ? "on" : "off";
                    if(enable == "on")
                    {
                        if(conflictPort(https_port, virtual_port_list)){
                            $("#virtual_confirm_content").html($.su.CHAR.ACCOUNT.HTTPS_PORT_CONFLICT_1);
                            $("#virtual_alert_cnt").msg("show");
                            return false;
                        }

                        if(conflictPort(http_port, virtual_port_list))
                        {
                            $("#virtual_confirm_content").html($.su.CHAR.ACCOUNT.HTTP_PORT_CONFLICT_1);
                            $("#virtual_alert_cnt").msg("show");
                            return false;
                        }

                        if(conflictPort(https_port, port_triggering_port_list)){
                            $("#virtual_confirm_content").html($.su.CHAR.ACCOUNT.HTTPS_PORT_CONFLICT_3);
                            $("#virtual_alert_cnt").msg("show");
                            return false;
                        }

                        if(conflictPort(http_port, port_triggering_port_list))
                        {
                            $("#virtual_confirm_content").html($.su.CHAR.ACCOUNT.HTTP_PORT_CONFLICT_3);
                            $("#virtual_alert_cnt").msg("show");
                            return false;
                        }
                    }
                    
                    if( $("input#managers").combobox("getValue")[0]=="specified" && $.su.func.isSameNet( $("#ipaddr").textbox('getValue'), lanIP, lanMask) ){
                        $("#ipaddr").textbox("setError");
                        $("#remote-setting").form('setError',  $.su.CHAR.ERROR['00000056']);
                        return false;
                    }

                    return true;
                }
            }).on("ev_loadData", function(e, data){
                if(data && data.remote){
                    isRemoteLogin = data.remote;
                }
            });

            $("#remote_disabled_msg_content").text($.su.CHAR.ACCOUNT.REMOTE_DISABLED_NOTICE);

            $("#remote_disabled_msg_container").msg({
                type: "confirm",
                cls: "l warning",
                noText: $.su.CHAR.ACCOUNT.CANCEL,
                yesText: $.su.CHAR.ACCOUNT.CONTINUE,
                closeBtn: false,
                // msg: $.su.CHAR.ACCOUNT.REMOTE_DISABLED_NOTICE,
                okHandler: function(){
                    $("form#remote-setting").form('submit', {}, null);
                    return true;
                }
            });


            $('button#remote-setting-submit').button({
                text: $.su.CHAR.LAN.SAVE,
                cls: "submit",
                handler: function(){
                    if(!isRemoteLogin){
                        $("form#remote-setting").form('submit', {}, null);
                    }else{
                        $("#remote_disabled_msg_container").msg("show");
                    }
                }
            });

            $("#virtual_alert_cnt").msg({
                okHandler:function(){
                    // restore_write();
                    // $($("div#virtualServersGrid").grid("getEditor")).form("submit", )
                    // console.log("form#remote-setting", $("form#remote-setting"));
                    if( $("input#managers").combobox("getValue")[0] == "specified" && $.su.func.isSameNet( $("#ipaddr").textbox('getValue'), lanIP, lanMask) ){
                        $("#ipaddr").textbox("setError");
                        $("#remote-setting").form('setError',  $.su.CHAR.ERROR['00000056']);
                        $("#virtual_alert_cnt").msg("close");
                        return false;
                    }
                    $("form#remote-setting").form("submit",null,null,null,null,true,false);
                    // console.log(22);
                },
                cls:"m warning",
                cancelHandler:function(){
                    return true;
                },
                type: "prompt"
            });

            $("#virtual_confirm_content").html($.su.CHAR.ACCOUNT.HTTP_PORT_CONFLICT_1);

            $("#ip_port_cnt").fieldset("hide");
        };

        interfaces.helpInit = function(){
            return "ADMIN_REMOTE";
        };

        interfaces.helpAfterLoad = function(){
            $("#local_management_https").show();
        };

        return $.su.module.https_support ? interfaces : empty;
    };

    modules.virtualServers = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        var ACC_REMOTE_URL_NEW = $.su.url("/admin/administration?form=remote");
        var remoteProxy = new $.su.Proxy({
            url: ACC_REMOTE_URL_NEW
        });

        var remote_https_port = 0;
        var remote_http_port = 0;
        var remote_enable = "on";
        var remote_port = 0;
        
        $.extend(empty, {
            init: function(){
                remoteProxy.read({}, function(data){
                    remote_port = data.port;
                    remote_enable = data.enable;
                });
            },
            remoteEnable: function(){
                if(remote_enable == "off"){
                    return true;
                }else{
                    return false;
                }
            },
            conflict: function(){
                if(sub_extport.length == 1)
                {
                    sub_extport[0] = parseInt(sub_extport[0], 10);
                    if(sub_extport[0] == remote_port)
                    {
                        $("#virtual_alert_cnt").msg("show");
                        return false;
                    }
                }
                if(sub_extport.length == 2)
                {
                    if( (sub_extport[0] <= remote_port) && (sub_extport[1] >= remote_port))
                    {
                        $("#virtual_alert_cnt").msg("show");
                        return false;
                    }
                } 
            }
        });

        interfaces.init = function(){
            remoteProxy.read({}, function(data){
                remote_https_port = data.https_port;
                remote_http_port = data.http_port;
                remote_enable = data.enable;
            });
        };

        interfaces.remoteEnable = function(){
            if(remote_enable == "off"){
                return true;
            }else{
                return false;
            }
        };

        interfaces.conflict = function(sub_extport){
            if(sub_extport.length == 1)
            {
                sub_extport[0] = parseInt(sub_extport[0], 10);
                if(sub_extport[0] == remote_https_port)
                {
                    $("#virtual_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE1);
                    $("#virtual_alert_cnt").msg("show");
                    return false;
                }

                if(sub_extport[0] == remote_http_port)
                {
                    $("#virtual_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE2);
                    $("#virtual_alert_cnt").msg("show");
                    return false;
                }
            }
            if(sub_extport.length == 2)
            {
                if( (sub_extport[0] <= remote_https_port) && (sub_extport[1] >= remote_https_port))
                {
                    $("#virtual_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE1);
                    $("#virtual_alert_cnt").msg("show");
                    return false;
                }

                if( (sub_extport[0] <= remote_http_port) && (sub_extport[1] >= remote_http_port))
                {
                    $("#virtual_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE2);
                    $("#virtual_alert_cnt").msg("show");
                    return false;
                }
            }
            return true;
        };

        return $.su.module.https_support ? interfaces : empty;
    };

    modules.portTriggering = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");
        
        $.extend(empty, {
            conflict: function(){}
        });

        var remote_https_port = 0;
        var remote_http_port = 0;
        var remote_enable = "on";

        var ACC_REMOTE_URL_NEW = $.su.url("/admin/administration?form=remote");

        var remoteProxy = new $.su.Proxy({
            url: ACC_REMOTE_URL_NEW
        });

        interfaces.init = function(){
            remoteProxy.read({}, function(data){
                remote_https_port = data.https_port;
                remote_http_port = data.http_port;
                remote_enable = data.enable;
            });
        };
        interfaces.conflict = function(){
            var port = $("input#external_port").textbox("getValue");
            var protocol = $("input#external_protocol").combobox("getValue")[0];
            var enable = $("#trigger_enable").checkbox("getValue")[0];

            var sub_extport = port.split("-");
            if (sub_extport.length == 2) {
                sub_extport[0] = parseInt(sub_extport[0], 10);
                sub_extport[1] = parseInt(sub_extport[1], 10);
                if (parseInt(sub_extport[0], 10) > parseInt(sub_extport[1], 10)) {
                    var temp_port = sub_extport[0];
                    sub_extport[0] = sub_extport[1];
                    sub_extport[1] = temp_port;
                }
            }

            if(remote_enable == "off")
            {
                return true;
            }

            if( (protocol != "UDP") && (enable))
            {
                // console.log(sub_extport.length);
                if(sub_extport.length == 1)
                {
                    sub_extport[0] = parseInt(sub_extport[0], 10);
                    if(sub_extport[0] == remote_https_port)
                    {
                        $("#trigger_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE1);
                        $("#trigger_alert_cnt").msg("show");
                        return false;
                    }

                    if(sub_extport[0] == remote_http_port)
                    {
                        $("#trigger_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE2);
                        $("#trigger_alert_cnt").msg("show");
                        return false;
                    }
                }
                if(sub_extport.length == 2)
                {
                    if( (sub_extport[0] <= remote_https_port) && (sub_extport[1] >= remote_https_port))
                    {
                        $("#trigger_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE1);
                        $("#trigger_alert_cnt").msg("show");
                        return false;
                    }

                    if( (sub_extport[0] <= remote_http_port) && (sub_extport[1] >= remote_http_port))
                    {
                        $("#trigger_confirm_content").html($.su.CHAR.VIRTUAL_SERVERS.NOTICE2);
                        $("#trigger_alert_cnt").msg("show");
                        return false;
                    }
                }
            }

            return true;
        };

        return $.su.module.https_support ? interfaces : empty;
    };

    $.su.module.https = modules;
}());
/**
 * Created by admin on 18-10-16.
 */
(function ($) {
   $.su.module = $.su.module || {};
   $.su.module.printer = $.su.module.printer || {};
   
   var printer = {};

   var _fn = function() {
       return null;
   };

   printer.basicNetWork = function(){
       var interfaces = $.su.module.createObject();
       var empty = $.su.module.createObject("empty");

       $.extend(empty, {
           show: _fn
       });

       interfaces.init = function(){
           $('p#map_printer_p').html($.su.CHAR.BASIC_NETWORK.PRINTER);
       };

       interfaces.show = function(){
           $("#map_printer").show();
           $("#map_usb_model").removeClass("no-printer");
       };

       return $.su.module.printerSupport ? interfaces : empty;
   };

   printer.status = function(){
       var interfaces = $.su.module.createObject();
       var empty = $.su.module.createObject("empty");

       $.extend(empty, {
           show: _fn
       });

       interfaces.init = function(){
           $('p#usb_storage_text_printer').html($.su.CHAR.STATUS.PRINTER);
       };

       interfaces.show = function(){
           $(".usb-form-printer").removeClass("hidden");
       };

       return $.su.module.printerSupport ? interfaces : empty;
   };

   $.su.module.printer = printer;
})(jQuery);
(function(){
    $.su.module = $.su.module || {};
    $.su.module.gfn = $.su.module.gfn || {};

    var gfn = {};

    var _fn = function(){
        return null;
    };
    
    //wirelessSettings.html
    gfn.applicationPriority = function(){
        var interfaces = $.su.module.createObject();
        var empty = $.su.module.createObject("empty");

        interfaces.init = function(){
            $("#application-kinds div.gfn-priority span.text").html($.su.CHAR.QOS.GFN_PRIORITY);

            $("h5#note_title").html($.su.CHAR.QOS.NOTES + ":");
            $("#note1").html($.su.CHAR.QOS.NOTE1);
            $("#note2").html($.su.CHAR.QOS.NOTE2);
            $("#note3").html($.su.CHAR.QOS.NOTE3);

            $("div.priority.gfn-priority").css("display", "inline-block");
            $("#qos_note_cnt").css("display", "block");
        };

        interfaces.updateIcon = function(type){
            if(type == "gfn"){
                $("div.priority").removeClass("click");
                $("div.priority.gfn-priority").addClass("click");
                return "gfn";
            }else{
                return null;
            }
        };

        interfaces.priorityClickHandler = function(target){
            if(target.hasClass("gfn-priority")){
                $("#application-priority-level").addClass("hidden");
                return true;
            }else{
                return false
            }
        };

        interfaces.formLoadHandler = function(type){
            if(type == "gfn"){
                $("#application-priority-level").addClass("hidden");
                return true;
            }else{
                return false;
            }
        }

        empty.init = function(){
            $("div.priority.gfn-priority").css("display", "none");
            $("#qos_note_cnt").css("display", "none");
        };
        empty.updateIcon = _fn;
        empty.priorityClickHandler = _fn;
        empty.formLoadHandler = _fn;

        return $.su.module.gfnSupport ? interfaces : empty;

    };

    $.su.module.gfn = gfn;

}());