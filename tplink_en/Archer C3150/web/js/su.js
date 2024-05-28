(function($) {
	$.su = $.su || {};
    $.su.CHAR = $.su.CHAR || {};

    /* added by CCy for these strings only exist in IPF platform, not exist in BBA platform. */
	$.tpLang.VTYPETEXT = {
			INVALIDTEXT: 				"Invalid format.",
			BLANKTEXT: 					"This field is required.",

			EMAIL: 						"Invalid email format.",
			NUMBER: 					"Invalid format.",

			NUMBER_MIN: 				"This number should be greater than %min.",
			NUMBER_MAX: 				"This number should be less than %max.",

			NUMBER_MIN_MAX: 			"This number should be between %min and %max.",
			HEX: 						"This field should be a hexadecimal number.",

			IP: 						"Invalid format.",

			IP_NO_ALL_ZERO:				"The address cannot be 0.0.0.0.",
			IP_NO_LOOP:					"The address cannot be loopback address.",
			IP_NO_D_TYPE:				"The IP address cannot be a Class D address.",
			IP_NO_E_TYPE:				"The IP address cannot be a Class E address.",
			IP_NO_ALL_ONE:				"The address cannot be 255.255.255.255.",
			IP_NO_FIRST_ALL_ONE:		"The address cannot start with 255.",
			IP_NO_FIRST_ZERO:			"The address cannot start with 0.",
			MASK_NO_ALL_ONE:			"Subnet mask cannot be 255.255.255.255.",

			IPV6: 						"Invalid format.",
			IPV6_NOT_GLOBAL:			"Invalid format.",
			IPV6_NOT_PREFIX:			"Invalid format.",
			IP_DOMAIN: 					"Invalid format.",
			IPV6_DOMAIN: 				"Invalid format.",
			IPV6_PREFIX: 				"The IPv6 address prefix cannot start with 2002.",
			MAC: 						"Invalid format.",
			MULTI_MAC:					"Invalid format.",
			DATE: 						"Invalid format.",
			DATE_INVALID: 				"Please enter a valid date between 01/01/1970 and 12/31/2030.",
			MASK: 						"Invalid format.",
			DOMAIN: 					"Invalid format.",
			STRING_DOMAIN:              "Invalid format.",
			USER: 						"Invalid format.",
			NOTE: 						"Invalid format.",
			PWD: 						"Invalid format.",
			SSID: 						"Invalid format.",
			NAME:						"Invalid format.",
			ASCII_VISIBLE:				"Invalid format.",
			STRING_VISIBLE:				"Invalid format.",
			STRING_VISIBLE_NO_COMMA:    "Invalid format.",
			STRING_VISIBLE_ALLOW_BLANK: "Invalid format.",
			VPN_NAME_PWD: 				"Please enter 1-15 alpha characters, numbers, - and _.",
			SIM_PIN:                    "The PIN should consist of 4 digits.",
			SIM_DIALNUM:                "The dial number should only contain '#','*' or digits."			
		}; 

	$.su.CHAR.VTYPETEXT = $.tpLang.VTYPETEXT;
	$.su.vtype = function(options){
		var defaults = {
			type: "sample",
			regex: /^[a-zA-Z0-9]&/,
			vtypeText: "sample run!",
			validator: null
		};
		//$.extend(types, $.su.vtype);
		var name = "",
			opt = {};

		if ($.type(options) === "string"){
			name = options;
		}else if ($.type(options) === "object" && options.vtype){
			name = options.vtype;
			opt = options;
		}

		if (!$.su.vtype.types[name]){
			return null;
		}else{
			defaults = $.su.vtype.types[name];
		}

		$.extend(this, defaults, opt, {isVtype: true});
	};
	$.su.vtype.types = {
		email: {
			regex: /^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.EMAIL
		},
		float: {
			regex: /^-?[0-9]\d*(.[0-9]\d{0,2})?$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NUMBER,
			validator: function(value){
				value = parseFloat(value);
				if (this.max !== null || this.max !== undefined){
					if (value > this.max){
						if (this.min !== null || this.min !== undefined)
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MIN_MAX.replace("%min", this.min.toString()).replace("%max", this.max.toString());
							return str;
						}
						else
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MAX.replace("%max", this.max.toString());
							return 	str;
						}
					};
				};

				if (this.min !== null || this.min !== undefined){
					if (value < this.min){
						if (this.max !== null || this.max !== undefined)
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MIN_MAX.replace("%min", this.min.toString()).replace("%max", this.max.toString());
							return str;
						}
						else
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MIN.replace("%min", this.min.toString());
							return 	str;
							//return 	$.su.CHAR.VTYPETEXT.NUMBER_MIN.replace("%min", this.min.toString());
						}
					};
				};
				return true;
			}
		},
		number: {
			regex: /^-?[0-9]\d*$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NUMBER,
			validator: function(value){
				value = parseInt(value, 10);
				if (this.max !== null || this.max !== undefined){
					if (value > this.max){
						if (this.min !== null || this.min !== undefined)
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MIN_MAX.replace("%min", this.min.toString()).replace("%max", this.max.toString());
							return str;
						}
						else
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MAX.replace("%max", this.max.toString());
							return 	str;
						}
					}
				}

				if (this.min !== null || this.min !== undefined){
					if (value < this.min){
						if (this.max !== null || this.max !== undefined)
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MIN_MAX.replace("%min", this.min.toString()).replace("%max", this.max.toString());
							return str;
						}
						else
						{
							var str = $.su.CHAR.VTYPETEXT.NUMBER_MIN.replace("%min", this.min.toString());
							return 	str;
							//return 	$.su.CHAR.VTYPETEXT.NUMBER_MIN.replace("%min", this.min.toString());
						}
					};
				};

				return true;
			},
			keybordHandler: function(e){
				e.stopPropagation();
				var keyCode = e.keyCode,
					shiftKey = e.shiftKey,
					ctrlKey = e.ctrlKey;

				if (shiftKey){
					return false;
				};

				if (keyCode == 37 || keyCode == 39){
					return true;
				};

				if (keyCode == 38 || keyCode == 40){
					var input = $(this),
						_value = input.val();

					if ($.su.vtype.types.number.regex.test(_value)){
						if (keyCode == 38){
							var _maxValue = input.hasClass("hour-text") ? 23: 59;
							if (_value < _maxValue){
								input.val(parseInt(_value, 10)+1);
							}else{
								return false;
							};
						}else{
							if (_value == 0){
								return false;
							}else{
								input.val(parseInt(_value, 10)-1);
							}
						};
					}else{
						input.val(0);
					};
				};

				if (!ctrlKey){
					if ((keyCode < 48 || keyCode > 57) && keyCode > 32){
						return false;
					};
				};
			}
		},
		date:{
			//regex: /^[(0[0-9]{1})|(1[0,2]{1})]]$/,
			regex: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})$/,
			vtypeText: $.su.CHAR.VTYPETEXT.DATE,
			validator:function(val)
			{
				//format:  mm/dd/yy

				var arr = val.split("/");
				if(parseInt(arr[2],10) < 1970)
				{
					return $.su.CHAR.VTYPETEXT.DATE_INVALID;
				}
				if(parseInt(arr[2],10) > 2030)
				{
					return $.su.CHAR.VTYPETEXT.DATE_INVALID;
				}
				var formatDate = arr[2] + "/" + arr[0] + "/" + arr[1];
				return (new Date(formatDate).getDate()==formatDate.substring(formatDate.length-2));
			}
		},
		// ip_domain:{
		// 	regex: /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})$/,
		// 	vtypeText: $.su.CHAR.VTYPETEXT.IP_DOMAIN
		// },
		ipv6:{
			isPrefixFlag:false,
			regex: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
			vtypeText: $.su.CHAR.VTYPETEXT.IPV6,
			validator:function(val)
			{
				var reg1 = new RegExp("^[2-3][0-9A-Fa-f]{1,3}:");
				if(!reg1.test(val))
				{
					return $.su.CHAR.VTYPETEXT.IPV6_NOT_GLOBAL;
				}
				var reg2 = new RegExp("::$");
				if(this.isPrefixFlag)
				{
					if(!reg2.test(val))
					{
						return $.su.CHAR.VTYPETEXT.IPV6_NOT_PREFIX;
					}
				}
				else
				{
					if(reg2.test(val))
					{
						return $.su.CHAR.VTYPETEXT.IPV6_NOT_GLOBAL;
					}
				}

				var reg3 = /:/g;
				var arr =  val.match(reg3);
				if(this.isPrefixFlag)
				{
					if(arr.length > 5)
					{
						return $.su.CHAR.VTYPETEXT.IPV6_NOT_PREFIX;
					}
				}
				return true;
			}
		},
		ip: {
			//regex: /^[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}$/,
			//regex: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
			allowAllZeroFlag:false,
			disallowAllZeroText: $.su.CHAR.VTYPETEXT.IP_NO_ALL_ZERO,
			allowLoopFlag:false,
			disallowLoopText: $.su.CHAR.VTYPETEXT.IP_NO_LOOP,
			allowDTypeFlag:false,
			disallowDTypeText: $.su.CHAR.VTYPETEXT.IP_NO_D_TYPE,
			allowETypeFlag:false,
			disallowETypeText: $.su.CHAR.VTYPETEXT.IP_NO_E_TYPE,
			allowAllOneFlag:false,
			disallowAllOneText: $.su.CHAR.VTYPETEXT.IP_NO_ALL_ONE,
			disallowFirstZeroFlag:true,
			disallowFirstZeroText: $.su.CHAR.VTYPETEXT.IP_NO_FIRST_ZERO,
			disallowFirstAllOneText: $.su.CHAR.VTYPETEXT.IP_NO_FIRST_ALL_ONE,
			regex: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|0\d\d)(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|0\d\d)){3}$/,
			validator: function(value){
				var ipStr = value;
				var szarray = [0,0,0,0];
				var remain;
				var i;
				for(i = 0; i < 3; i++)
				{
					var n = ipStr.indexOf('.');
					szarray[i] = ipStr.substring(0,n);
					remain = ipStr.substring(n+1);
					ipStr = remain;
				}
				szarray[3] = remain;
				for(i = 0; i < 4; i++)
				{
					if (szarray[i] < 0 || szarray[i] > 255)
					{
						return false;
					}
				}

				if(!this.allowLoopFlag)
				{
					if(szarray[0]==127)
					{
						return this.disallowLoopText;
					}
				}
				if(!this.allowDTypeFlag)
				{
					if(szarray[0] >= 224 && szarray[0] <=239)
					{
						return this.disallowDTypeText;
					}
				}
				if(!this.allowETypeFlag)
				{
					if(szarray[0] >= 240 && szarray[0] <=254)
					{
						return this.disallowETypeText;
					}
				}

				if(!this.allowAllOneFlag)
				{
					// if(szarray[0]==255)
					// {
					// 	return this.disallowAllOneText;
					// }
					if(szarray[0]==255 && szarray[1] ==255 && szarray[2] ==255 && szarray[3] ==255)
					{
						return this.disallowAllOneText;
					}
					if(szarray[0]==255)
					{
						return this.disallowFirstAllOneText;
					}
				}
				else
				{
					if(szarray[0]==255 && szarray[1] ==255 && szarray[2] ==255 && szarray[3] ==255)
					{

					}
					else
					{
						if(szarray[0]==255)
						{
							return this.disallowFirstAllOneText;
						}
					}
				}
				if(!this.allowAllZeroFlag)
				{
					if(szarray[0]==0 && szarray[1] ==0 && szarray[2] ==0 && szarray[3] ==0)
					{
						return this.disallowAllZeroText;
					}
				}

				if(!this.allowAllZeroFlag && !this.allowFirstZeroFlag)
				{
					if(szarray[0]==0)
					{
						return this.disallowFirstZeroText;
					}
				}

				return true;
			},
			vtypeText: $.su.CHAR.VTYPETEXT.IP
		},
		ip_no_zero: {

		},
		mac: {
			regex: /^[a-fA-F\d]{2}\:[a-fA-F\d]{2}\:[a-fA-F\d]{2}\:[a-fA-F\d]{2}\:[a-fA-F\d]{2}\:[a-fA-F\d]{2}$/,
			disallowAllMultiText: $.su.CHAR.VTYPETEXT.MULTI_MAC,
			validator: function(value){
				var patternMulti = /^\s*[0-9A-Fa-f]{1}[13579bdfBDF]{1}(\-[A-Fa-f0-9]{2}){5}\s*$/;
				var flag = patternMulti.test(value);
				if(flag)
				{
					return this.disallowAllMultiText;
				}

				var patternZero = /^(0{1,2}-){5}0{1,2}$/;
				if(patternZero.test(value))
				{

					return false;
				}

				return true;
			},
			vtypeText: $.su.CHAR.VTYPETEXT.MAC
		},
		netmask: {
			//regex: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
			allowAllOneFlag:false,
			disallowAllOneText: $.su.CHAR.VTYPETEXT.MASK_NO_ALL_ONE,
			regex: /^(254|252|248|240|224|192|128)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$|^255.255.255.255$/ ,
			vtypeText: $.su.CHAR.VTYPETEXT.MASK,
			validator: function(value){
				if(value == "255.255.255.255")
				{
					if(this.allowAllOneFlag)
					{
						return true;
					}
					else
					{
						return this.disallowAllOneText;
					}
				}
				return true;

			}
		},
		string_ip_domain:{
			regex: /^[A-Za-z0-9\_\-\.]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.STRING_DOMAIN,
			validator: function(value){
				var regex = /^\S+$/;
				if(!regex.test(value)){
					return $.su.CHAR.VTYPETEXT.STRING_DOMAIN;
				}
				return true;
			}
		},
//		string_ip_domain_no_loop:{
//			regex: /^[A-Za-z0-9\_\-]+\.{1,}/,
//			validator: function(value){
//				if(value == '127.0.0.1'){
//					return $.su.CHAR.ERROR["00000131"];
//				}
//				return true;
//			},
//			vtypeText: $.su.CHAR.VTYPETEXT.STRING_DOMAIN
//		},
		ip_domain:{
			regex: /^.+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.IP_DOMAIN,
			validator:function(value){
				if( $.su.vtype.types["ip"].regex.test(value) && $.su.vtype.types["ip"].validator(value) )
				{
					return true;
				}
				if( $.su.vtype.types["domain"].regex.test(value) )
				{

					return true;
				}
				return false;
			}
		},
		domain: {
			regex: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.DOMAIN
		},
		domain_header: {
			regex: /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]*)$/,
			vtypeText: $.su.CHAR.VTYPETEXT.DOMAIN
		},
		ascii_visible:{
			regex: /^[\x21-\x7e]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.ASCII_VISIBLE
		},
		string_visible:{
			regex: /^\S+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.STRING_VISIBLE
		},
		string_visible_no_comma:{
			regex: /^\S+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.STRING_VISIBLE_NO_COMMA,
			validator: function(value){
				if(value.indexOf(",")>=0)
				{
					return false
				}
				return true;
			}
		},
		password:{
			regex: /^[A-Za-z0-9\`\~\!\@\#\$\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\%\^\/\ ]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.PWD
		},
//		portal_password: {
//			regex: /^[A-Za-z0-9_]+$/,
//			vtypeText: $.su.CHAR.ERROR["00000259"],
//			validator: function(value){
//				if(value.length < 8 || value.length > 16){
//					return false
//				}
//				return true;
//			}
//		},
		portal_domain_name: {
			regex:/((http|ftp|https):\/\/)*(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?/,
			vtypeText:$.su.CHAR.VTYPETEXT.INVALIDTEXT
		},
//		protal_title: {
//			regex: /^\S+$/,
//			vtypeText: $.su.CHAR.ERROR["00000256"],
//			validator: function(value){
//				if(value.length>31){
//					return false;
//				}
//				return true;
//			}
//		},
//		protal_content: {
//			vtypeText: $.su.CHAR.ERROR["00000257"],
//			validator:function(value){
//				if(value.length>1023){
//					return $.su.CHAR.ERROR["00000257"];
//				}
//				return true;
//			}
//
//		},
		string_visible_allow_blank:{
			regex: /^(\S|\x20)+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.STRING_VISIBLE_ALLOW_BLANK
		},
		string_visible_describe:{
			regex: /^[A-Za-z0-9\-\_]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.INVALIDTEXT
		},
		name:{
			regex: /^[A-Za-z0-9\_]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NAME
		},
		name_special:{
			regex: /^[A-Za-z0-9\_\-]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NAME
		},
		name_with_special_start:{
			regex: /^[a-zA-Z_]/,
			vtypeText: $.su.CHAR.VTYPETEXT.NAME_START
		},
		name_in_vpn:{
			regex: /^[a-zA-Z0-9\_][A-Za-z0-9\_\-]{0,14}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.VPN_NAME_PWD
		},
		pwd_in_vpn:{
			regex: /^[A-Za-z0-9\_\-]{1,15}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.VPN_NAME_PWD
		},
		cloud_username:	{
			regex: /^[\s\S]*?$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NAME
		},
		cloud_email:{
			regex: /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/,
			vtypeText: $.su.CHAR.VTYPETEXT.EMAIL
		},
		cloud_pwd:	{
			regex: /^[\x21-\x7E]{6,32}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.PWD
		},
		note: {
			regex: /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]*$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NOTE
		},
		floatNum: {
			regex: /^[0-9.]+$/,
			vtypeText: $.su.CHAR.VTYPETEXT.NUMBER
		},
		sim_pin: {
			regex: /^[0-9]{4}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.SIM_PIN
		},
		sim_dialnum: {
			regex: /^[0-9*#]{0,118}$/,
			vtypeText: $.su.CHAR.VTYPETEXT.SIM_DIALNUM
		}
	};
	$.su.vtype.prototype.validate = function(value){
		var resultVal = true;
		var resultReg = true;

		if (this.regex){
			resultReg = this.regex.test(value);
			if (resultReg !== true){
				return this.vtypeText;
			}
		}

		if (this.validator){
			resultVal = this.validator(value);
			if (resultVal !== true){
				return resultVal;
			}
		}

		return true;
	};

    $.su.mask = {
        displayed: false,
        process: {}, //记录有哪些元素在使用mask并记录他们的zIndex
        count: 0,
        height: 0,
        width: 0,
        zIndex: 890,
        show: function(name, autoIndex, $modal){
            var _this = this;
            _this.dom = $("div.mask#mask");
            var isEmpty = $.isEmptyObject(_this.process);
            if (autoIndex) {
                if (typeof autoIndex == 'number') {
                    //如果是数字，设置zIndex为该值
                    _this.dom.css('zIndex', autoIndex);
                    _this.process[name] = autoIndex;
                } else if (autoIndex === true && $modal) {
                    //如果是布尔值
                    _this.dom.css('zIndex', parseInt($modal.css('zIndex')) - 1);
                    _this.process[name] = parseInt($modal.css('zIndex')) - 1;
                } else {
                    _this.dom.css('zIndex', _this.zIndex);
                    _this.process[name] = _this.zIndex;
                }
            } else {
                _this.dom.css('zIndex', _this.zIndex);
                _this.process[name] = _this.zIndex;
            }
            if(isEmpty){
                _this.dom.show();
            }
        },
        hide: function(name, adjustZIndex){
            var _this = this;
            _this.dom = $("div.mask#mask");
            if(_this.process[name] && delete _this.process[name]){
                var isEmpty = $.isEmptyObject(_this.process);
                if(isEmpty){
                    //如果没有元素在使用mask，隐藏mask
                    _this.dom.hide();
                    _this.dom.css('zIndex', _this.zIndex);
                } else if(adjustZIndex !== false){
                    //如果还有元素在使用mask，设置Index为当前最大值
                    var maxZIndex = -100;
                    for (var i in _this.process) {
                        if (_this.process.hasOwnProperty(i)) {
                            if (_this.process[i] > maxZIndex) {
                                maxZIndex = _this.process[i];
                            }
                        }
                    }
                    _this.dom.css('zIndex', maxZIndex);
                }
            }
        },
        init: function(){
            var dom = $("div.mask#mask");
            if (dom.length == 0){
                dom = $('<div id="mask" class="mask"><div id="cover-loading"></div></div>');
                dom.appendTo($("body"));
            }
            this.zIndex = dom.css('zIndex') || this.zIndex;
            var _this = this;
            _this.dom = dom;
            dom.css("display", "none");

        }
    };
    $.su.mask.init();
})(jQuery);