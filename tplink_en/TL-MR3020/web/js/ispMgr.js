/**
 * Manager of ISP VoIP.
 * Designed to resolve the complicated isp request in different countries.
 * Create by ZhaoPeng 24/06/2016
 *
 * Notice: if there is a select component, its id should be associated inputbox ID + '_select'
 */
(function($) {
    var _telP = telephonyProvider,

        _country = '',
        _ispIndex = 0,

        /* '_sipInfo' keeps settings info from ISP and defines the DOM structure, validate type and data combination method.
         * This property is configed in ispVoIP.js
         * {
                id:"0", name:"Telekom", reg:"tel.t-online.de", regPort:"5060", proxy:"0.0.0.0", proxyPort:"5060", outproxy:"0.0.0.0", outproxyPort:"5060",
                codec: {
                    "G.711MuLaw": 1,
                    "G.711ALaw": 2,
                    "G.726_32": 3,
                    "G.729a/b": 4,
                    "G.722": 11,
                    "X_TP_T38": 500
                },
                configs: {
                    numbers: {
                        inputNum: 2,
                        sizes: [8, 19],
                        placeholders: ["Area Code", "Phone Number"]
                    },
                    authID: {
                        label: $.tpLang.s_str.emailaddress,
                        required: false
                    },
                    password: {}
                },
                validate: {
                    // The key present a line, value can be a function or config(use default check function).
                    numbers: [{
                        trimBlank: true,
                        charRange: true,
                        middleBlank: true,
                        special: true,
                        lengthRange: [0, 10]
                    }, {
                        trimBlank: true,
                        charRange: true,
                        middleBlank: true,
                        special: true,
                        lengthRange: [3, 22]
                    }]
                },
                data: {
                    // The key is param name, value can be string or object. object: {field: index}
                    multiExtension: [{
                        numbers: 1
                    }, {
                        numbers: 0
                    }]
                }
            }
         */
        _sipInfo = {},

        /* '_options' keeps the configs from page init.
         * var configs = {                  // This is the default config, user param will be merged in this object.
                domID: '_isp_advanced',     // for advanced area ID.
                advIDs: {                   // item IDs.
                    regPort: 'regPort',
                    proxy: 'SipProxyAddr',
                    proxyPort: 'SipProxyPort',
                    outproxy: 'ObProxyAddr',
                    outproxyPort: 'ObProxyPort'
                },
                via: 'RegViaOB'             // Checkbox ID for 'Register via Outbound Proxy'
            }
            $(your ISP select ID).ispMgr(configs);
         */
        _options = {},

        _defaultOptions = {
            numbers: {
                label: $.tpLang.s_str.dscnumber,
                prefix: false,
                sizes: [30],
                inputNum: 1,
                placeholders: [""],
                required: true
            },
            address: {
                label: $.tpLang.s_str.registrar,
                sizes: [30],
                required: true
            },
            authID: {
                label: $.tpLang.s_str.auid,
                sizes: [30],
                prefix: false,
                required: true
            },
            password: {
                label: $.tpLang.s_str.dscpassword,
                sizes: [30],
                required: false
            },
            areaCode: {
                label: $.tpLang.s_str.areacode,
                sizes: [8],
                required: false,
                display: function() {
                    var areaCodeObj = $.act(ACT_GET, XTP_IGD_AREA_CODE_CFG, null, null, ["areaCode"]);
                    if (0 != $.exe() || !areaCodeObj.areaCode) {
                        return true;
                    }
                    return false;
                }
            }
        },

        _id = '_ispEditAttrs',
        _idMap = {
            numbers: ['_isp_number_0', '_isp_number_1'],
            address: '_isp_address_0',
            // Select ID must end with '_select', in order to recognise.
            address_select: '_isp_address_1_select',
            authID:  '_isp_authID_0',
            password: '_isp_password_0'
        },
        _attrsOptions = {},

        attrs = {
            numbers: function(options) {
                var show = true;
                var numbersArea = $('._isp_number');

                if (options === false) {
                    show = false;
                    numbersArea.hide();
                    options = {};
                } else {
                    numbersArea.show();
                }

                var op = $.extend({}, _defaultOptions.numbers, options);
                _attrsOptions.numbers = op;

                if (numbersArea.length === 0) {
                    var dom =
                        '<div class="_isp_number">'+
                            '<b></b><span class="_isp_prefix"></span>'+
                            ' <input type="text" id="_isp_number_0" />'+
                            '<span class="_two_input">-</span><input type="text" class="_two_input" id="_isp_number_1" />'+
                            '<span class="red"></span>'+
                        '</div>';

                    $('#'+_id).append(dom);
                    numbersArea = $('._isp_number');
                    !show && numbersArea.hide();
                }

                if (op.inputNum == 2) {
                    $('._two_input').show();
                } else {
                    $('._two_input').hide();
                }

                setInputAttrs({
                    ids: ['#_isp_number_0', '#_isp_number_1'],
                    attrs: {
                        placeholder: op.placeholders,
                        maxlength: op.sizes
                    },
                    other: {
                        areaID: numbersArea,
                        label: op.label,
                        prefix: op.prefix,
                        required: op.required
                    }
                });
            },

            address: function(sipInfo) {
                var options = sipInfo.configs.address ? sipInfo.configs.address : false;
                var show = true;
                var addressArea = $('._isp_address');

                if (options === false) {
                    show = false;
                    addressArea.hide();
                    options = {};
                } else {
                    addressArea.show();
                }

                var op = $.extend({}, _defaultOptions.address, options);
                _attrsOptions.address = op;

                if (addressArea.length === 0) {
                    var dom =
                        '<div class="_isp_address" id="_isp_address_input">'+
                            '<b></b>'+
                            ' <input type="text" id="_isp_address_0" />'+
                            '<span class="red"></span>'+
                        '</div>'+
                        '<div class="_isp_address nd" id="_isp_address_select">'+
                            '<b></b>'+
                            ' <select id="_isp_address_1_select"></select>'+
                        '</div>';

                    $('#'+_id).append(dom);
                    addressArea = $('._isp_address');
                    !show && addressArea.hide();
                }

                setInputAttrs({
                    ids: ['#_isp_address_0'],
                    attrs: {
                        value: [sipInfo.reg],
                        maxlength: op.sizes
                    },
                    other: {
                        areaID: addressArea,
                        label: op.label,
                        required: op.required
                    }
                });

                if (show && typeof sipInfo.reg === 'string') {
                    $('#_isp_address_input').show();
                    $('#_isp_address_select').hide();
                    $('#_isp_address_0').val(sipInfo.reg);
                } else if (show && $.isArray(sipInfo.reg)) {
                    var option = '';
                    for (var i = 0, len = sipInfo.reg.length; i < len; i++) {
                        option += '<option value="'+sipInfo.reg[i]+'">'+sipInfo.reg[i]+'</option>';
                    }
                    $('#_isp_address_input').hide();
                    $('#_isp_address_select').show();
                    $('#_isp_address_1_select').html(option).tpSelect({refresh:1});
                }
            },

            authID: function(options) {
                var show = true;
                var authIDArea = $('._isp_authID');

                if (options === false) {
                    show = false;
                    authIDArea.hide();
                    options = {};
                } else {
                    authIDArea.show();
                }

                var op = $.extend({}, _defaultOptions.authID, options);
                _attrsOptions.authID = op;

                if (authIDArea.length === 0) {
                    var dom =
                        '<div class="_isp_authID">'+
                            '<b></b><span class="_isp_prefix"></span>'+
                            ' <input type="text" id="_isp_authID_0" />'+
                            '<span class="red"></span>'+
                        '</div>';

                    $('#'+_id).append(dom);
                    authIDArea = $('._isp_authID');
                    !show && authIDArea.hide();
                }
                setInputAttrs({
                    ids: ['#_isp_authID_0'],
                    attrs: {
                        maxlength: op.sizes
                    },
                    other: {
                        areaID: authIDArea,
                        label: op.label,
                        prefix: op.prefix,
                        required: op.required
                    }
                });
            },

            password: function(options) {
                var show = true;
                var passwordArea = $('._isp_password');

                if (options === false) {
                    show = false;
                    passwordArea.hide();
                    options = {};
                } else {
                    passwordArea.show();
                }

                var op = $.extend({}, _defaultOptions.password, options);
                _attrsOptions.password = op;

                if (passwordArea.length === 0) {
                    var dom =
                        '<div class="_isp_password">'+
                            '<b></b>'+
                            ' <input type="password" id="_isp_password_0" />'+
                            '<span class="red"></span>'+
                        '</div>';

                    $('#'+_id).append(dom);
                    passwordArea = $('._isp_password');
                    !show && passwordArea.hide();
                }
                setInputAttrs({
                    ids: ['#_isp_password_0'],
                    attrs: {
                        maxlength: op.sizes
                    },
                    other: {
                        areaID: passwordArea,
                        label: op.label,
                        required: op.required
                    }
                });
            },

            advanced: function(sipInfo) {
                var options = sipInfo.configs.advanced ? sipInfo.configs.advanced : false;
                _attrsOptions.advanced = options;

                if (options === false) {
                    $('#'+_options.domID).addClass('nd');
                } else {
                    $('#'+_options.domID).removeClass('nd');
                }

                var sels = ['proxy', 'outproxy'];
                if ($.isArray(sipInfo.proxy) || $.isArray(sipInfo.outproxy)) {
                    setSelectVisible(true);
                } else {
                    setSelectVisible(false);
                }
                for (var i = 0, len = sels.length; i < len; i++) {
                    var a = sels[i];
                    var id = _options.advIDs[a];

                    if ($.isArray(sipInfo[a])) {
                        var str = '';
                        for (var j = 0, len2 = sipInfo[a].length; j < len2; j++) {
                            str += '<option value='+sipInfo[a][j]+'>'+sipInfo[a][j]+'</option>';
                        }

                        $('#'+id).parent().hide();
                        $('#'+id+'_select').html(str).tpSelect({refresh:1});
                        $('#'+id+'_select').parent().show();

                    } else {
                        $('#'+id).parent().show();
                        $('#'+id+'_select').parent().hide();
                    }
                }

                function setSelectVisible(flag) {
                    var a;
                    if (flag) {
                        for (a in _options.advIDs) {
                            if (_options.advIDs.hasOwnProperty(a)) {
                                $('#' + _options.advIDs[a]).parent().addClass('nd');
                            }
                        }
                        $('#'+_options.via).parent().addClass('nd');
                        $('#'+_options.domID).removeClass('nd');
                    } else {
                        for (a in _options.advIDs) {
                            if (_options.advIDs.hasOwnProperty(a)) {
                                $('#' + _options.advIDs[a]).parent().removeClass('nd');
                            }
                        }
                        $('#'+_options.via).parent().removeClass('nd');
                        (options === false) && $('#'+_options.domID).addClass('nd');
                    }
                }
            }
        },

        setInputAttrs = function(ats) {
            var i, len, id;
            for (i = 0, len = ats.ids.length; i < len; i++) {
                id = $(ats.ids[i]);
                for (var a in ats.attrs) {
                    if (ats.attrs.hasOwnProperty(a)) {
                        if (ats.attrs[a][i] !== undefined) {
                            $(id).prop(a, ats.attrs[a][i]);
                        }
                    }
                }
            }

            var area = ats.other.areaID;
            if (ats.other.label) {
                area.find('label, b').text(ats.other.label);
            }
            if (ats.other.required !== undefined) {
                if (ats.other.required) {
                    area.find('span.red').text('*');
                } else {
                    area.find('span.red').text('');
                }
            }
            if (ats.other.prefix !== undefined) {
                if (ats.other.prefix) {
                    area.find('span._isp_prefix').text(ats.other.prefix);
                } else {
                    area.find('span._isp_prefix').text('');
                }
            }

            for (id in _options.advIDs) {
                if (_options.advIDs.hasOwnProperty(id)) {
                    $('#' + _options.advIDs[id]).val(_sipInfo[id]);
                }
            }
        },

        getCountry = function() {
            var ispLocal = $.act(ACT_GET, LOCAL, null, null, ["Country"]);
            if (!$.exe()) {
                _country = ispLocal.country;
                return true;
            }
            return false;
        },

        getId = function(key) {
            if (key === undefined) {
                return _idMap;
            } else {
                if (key === 'address' && $.isArray(_sipInfo.reg)) {
                    return _idMap.address_select;
                }
                return _idMap[key];
            }
        },

        getIspIndex = function(name) {
            var isps = _telP[_country] && _telP[_country].isps;

            if (isps) {
                for (var i = 0, len = isps.length; i < len; i++) {
                    if (isps[i].name == name) {
                        return i;
                    }
                }
            }
            return 500;
        },

        clearForm = function() {
            var i, len, a, id,
                map = getId();
            for (a in map) {
                if (map.hasOwnProperty(a)) {
                    id = getId(a);
                    if ($.isArray(id)) {
                        for (i = 0, len = id.length; i < len; i++) {
                            $('#' + id[i]).val('');
                        }
                    } else {
                        $('#' + id).val('');
                    }
                }
            }
        },

        setFocus = function(ctrl, index) {
            var node;
            if (index === undefined) {
                if ($.isArray(ctrl)) {
                    node = $('#'+ctrl[0]);
                } else {
                    node = $('#'+ctrl);
                }
            } else {
                node = $('#'+ctrl[index]);
            }
            node.focus();
            if(node.select) {
                node.select();
            }
        },

        getLabelName = function(key) {
            var label = _attrsOptions[key].label;
            if (label[label.length - 1] === ':') {
                label = label.slice(0, label.length - 1);
            }
            return label;
        },

        checkValue = function(key, val, index, addon) {
            var nbsp = /\s/;
            // var size = _attrsOptions[key].sizes;

            addon && addon.trimBlank && (val = val.replace(/(^\s*)|(\s*$)/g,""));

            if (val == '') {
                if (_attrsOptions[key].required) {
                    setFocus(getId(key), index);
                    return false;
                } else {
                    return true;
                }
            }

            if (!addon) {
                return true;
            }

            if (addon.charRange && $.asc(val, true)) {
                $.alert(ERR_VOIP_CHAR_ERROR);
                setFocus(getId(key), index);
                return false;
            }

            if (addon.middleBlank && nbsp.test(val) == true) {
                $.alert(ERR_VOIP_VALUE_FORMAT_ERROR);
                setFocus(getId(key), index);
                return false;
            }

            if (addon.special && /["'\\;:<@]/.test(val)) {
                $.alert(ERR_VOIP_CONTAIN_ILLEGAL_CHAR);
                setFocus(getId(key), index);
                return false;
            }

            if (addon.lengthRange && (val.length < addon.lengthRange[0] || val.length > addon.lengthRange[1])) {
                var paraName = getLabelName(key);

                if (addon.lengthRange[0] != 0 && val.length == 0) {
                    $.alert(ERR_VOIP_NOT_EMPTY, "("+paraName+")");
                    setFocus(getId(key), index);
                    return false;
                }

                if (addon.lengthRange[0] == addon.lengthRange[1]) {
                    $.alert(ERR_VOIP_VALUE_LEN_ERROR, "(" + paraName + " " + s_str.len + ":" + addon.lengthRange[0] + ")");
                } else {
                    $.alert(ERR_VOIP_NUMBER_OUT_RANGE, "(" + paraName + " " + s_str.range + ":" + addon.lengthRange[0] + " - " + addon.lengthRange[1] + ")");
                }
                setFocus(getId(key), index);
                return false;
            }

            return val;
        },

        getValues = function(options) {
            var a, attrs = {};
            var configs = _sipInfo.configs;
            if (!options) {
                for (a in configs) {
                    if (configs.hasOwnProperty(a)) {
                        attrs[a] = getByID(a);
                    }
                }
            } else {
                for (a in options) {
                    if (options.hasOwnProperty(a)) {
                        if (options[a] !== false) {
                            attrs[a] = getByID(a);
                        }
                    }
                }
            }

            (function() {
                attrs.advanced = [];
                for (var id in _options.advIDs) {
                    if (_options.advIDs.hasOwnProperty(id)) {
                        attrs.advanced.push(getAdvancedValue(id));
                    }
                }
                attrs.advanced.unshift(getByID('address'));
                attrs.advanced.push($('#'+_options.via).prop('data-checked')?2:0);

                function getAdvancedValue(id) {
                    if ($.isArray(_sipInfo[id])) {
                        return $('#'+_options.advIDs[id]+'_select').data('value');
                    } else {
                        return $('#'+_options.advIDs[id]).val()
                    }
                }
            })();

            function getByID(a) {
                var id = getId(a), attr;
                if ($.isArray(id)) {
                    attr = [];
                    for (var i = 0, len = id.length; i < len; i++) {
                        var x = id[i];
                        attr.push($('#'+x).val());
                    }
                } else {
                    if (/_select/.test(id)) {
                        attr = $('#'+id).data('value');
                    } else {
                        attr = $('#'+id).val();
                    }
                }
                return attr;
            }

            return attrs;
        },

        setValues = function(attrs, selector) {
            var index = getIspIndex(attrs.multiIspName);
            var isp = (index === 500 ? _telP.location500.isps[0] : _telP[_country].isps[index]);
            var c = isp.configs;

            $(selector).find('option[value='+index+']').prop('selected', 'selected');
            $(selector).tpSelect({refresh:1});

            if (c.numbers && c.numbers.inputNum === 2) {
                $('#'+getId('numbers')[0]).val(attrs.multiVoipPrefixNum);
                $('#'+getId('numbers')[1]).val(attrs.multiVoipNum);
            } else {
                $('#'+getId('numbers')[0]).val(attrs.multiVoipNum);
            }
            if (c.authID) {
                $('#'+getId('authID')).val(c.authID.prefix ? attrs.multiAuthUserName.replace(c.authID.prefix, '') : attrs.multiAuthUserName);
            } else {
                $('#'+getId('authID')).val(attrs.multiAuthUserName);
            }
            $('#'+getId('password')).val(attrs.multiAuthPassword);

            if ($.isArray(isp.reg)) {
                var id = getId('address');
                $('#'+id).find('option[value="'+attrs.multiRegistrarServer+'"]').prop('selected', 'selected');
                $('#'+id).tpSelect({refresh: 1});
            } else {
                $('#'+getId('address')).val(attrs.multiRegistrarServer);
            }

            if ($.isArray(isp.proxy)) {
                $('#'+_options.advIDs.proxy+'_select').find('option[value="'+attrs.multiProxyServer+'"]').prop('selected', 'selected');
                $('#'+_options.advIDs.proxy+'_select').tpSelect({refresh: 1});
            } else {
                $('#'+_options.advIDs.proxy).val(attrs.multiProxyServer);
            }

            if ($.isArray(isp.outproxy)) {
                $('#'+_options.advIDs.outproxy+'_select').find('option[value="'+attrs.multiOutboundProxy+'"]').prop('selected', 'selected');
                $('#'+_options.advIDs.outproxy+'_select').tpSelect({refresh: 1});
            } else {
                $('#'+_options.advIDs.outproxy).val(attrs.multiOutboundProxy);
            }

            $('#'+_options.advIDs.regPort).val(attrs.multiRegistrarServerPort);
            $('#'+_options.advIDs.proxyPort).val(attrs.multiProxyServerPort);
            $('#'+_options.advIDs.outproxyPort).val(attrs.multiOutboundProxyPort);
            $('#'+_options.via).prop('checked', (attrs.multiRegisterViaOB == 2)).tpCheckbox();
        };

    var ISP = function (options, selector) {
        var that = this;
        this.selector = selector;
        getCountry();

        $(selector).click(function() {
            _ispIndex = $(this).data('value');
            that.init(options);
        });

        (function initIspSelect() {
            var opt = "";
            if (_telP[_country]) {
                for (var i = 0, len = _telP[_country].isps.length; i < len; i++) {
                    var isp = _telP[_country].isps[i];
                    if (isp["name"] == undefined) {
                        continue;
                    }

                    opt += "<option value='" + i + "' data-text='" + isp["name"] + "' >" + isp["name"] + "</option>";
                }
            }

            opt += "<option value='" + 500 + "' data-text='" + _telP.location500.isps[0]["name"] + "' >" + _telP.location500.isps[0]["name"] + "</option>";

            $(selector).empty().append(opt);
            $(selector).tpSelect({
                refresh: 1
            });
        })();
    };

    ISP.prototype = {
        init: function(options) {
            var configs;

            _options = $.extend({
                domID: '_isp_advanced',
                advIDs: {
                    regPort: 'regPort',
                    proxy: 'SipProxyAddr',
                    proxyPort: 'SipProxyPort',
                    outproxy: 'ObProxyAddr',
                    outproxyPort: 'ObProxyPort'
                },
                via: 'RegViaOB'
            }, options);

            if (_ispIndex === '500') {
                _sipInfo = telephonyProvider.location500.isps[0];
            } else {
                _sipInfo = telephonyProvider[_country].isps[_ispIndex];
            }

            // Init Advanced
            for (var id in _options.advIDs) {
                if (_options.advIDs.hasOwnProperty(id)) {
                    $('#' + _options.advIDs[id]).val(_sipInfo[id]);
                }
            }

            // Init Line
            configs = _sipInfo.configs;
            if (!$('#'+_id).length) {
                $(this.selector).parent().after('<div id="'+_id+'"></div>');
            }
            if (configs) {
                clearForm();
                for (var a in attrs) {
                    if (attrs.hasOwnProperty(a)) {
                        if (a === 'address' || a === 'advanced') {
                            attrs[a](_sipInfo);
                        } else {
                            attrs[a](configs[a] ? configs[a] : false);
                        }
                    }
                }
            } else {
                console.error('No ISP Config.');
            }

            $.tpInit(function() {}, $('._isp_password'));
        },

        validate: function() {
            var values, flag = true;
            var configs, defaultConfig = {
                numbers: [{
                    // Delete blanks from two sides of String.
                    trimBlank: true,
                    // Check whether the char code beyond 127.
                    charRange: true,
                    // Check blank in the String.
                    middleBlank: true,
                    // Check special char like ' " % e.g.
                    special: true,
                    // Check the length of String.
                    lengthRange: [3, 32]
                }, {
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [3, 22]
                }],
                address: {
                    trimBlank: true
                },
                authID: {
                    trimBlank: true,
                    lengthRange: [0, 32]
                },
                // Self defined validate function. Input value, output boolean.
                password: function(val) {
                    if ((val == '' && _sipInfo.configs.password.required) || val.length > 40) {
                        return false;
                    }
                },
                advanced: function() {
                    return true;
                }
            };

            if (_sipInfo.validate === false) {
                return true;
            } else {
                configs = getOptions(defaultConfig, _sipInfo.validate);
                values = getValues();
                for (var a in values) {
                    if (values.hasOwnProperty(a)) {
                        if (typeof configs[a] === 'function') {
                            if (configs[a](values[a]) === false) {
                                setFocus(getId(a));
                                flag = false;
                                break;
                            }
                        } else if (configs[a] === false) {
                        } else {
                            if (checkValueItem(a, values[a], configs[a]) === false) {
                                flag = false;
                                break;
                            }
                        }
                    }
                }
            }

            function getOptions(defaultConfig, customConfig) {
                var configs = {};

                for (var a in _sipInfo.configs) {
                    if (_sipInfo.configs.hasOwnProperty(a) && defaultConfig[a]) {
                        configs[a] = defaultConfig[a];
                    }
                }

                if (typeof customConfig === 'object') {
                    configs = $.extend(configs, customConfig);
                }
                configs.advanced = true;

                return configs;
            }

            function checkValueItem(key, val, addon) {
                // var flag;
                if ($.isArray(val)) {
                    for (var i = 0, len = val.length; i < len; i++) {
                        if (_attrsOptions[key].inputNum === 1 && i === 1) {
                            continue;
                        }
                        if (!addon[i]) {
                            console.warn('No validate config for second input. Key: ' + key + ', Index: ' + i);
                            return true;
                        }
                        if (checkValue(key, val[i], i, addon[i]) === false) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return checkValue(key, val, undefined, addon);
                }
            }

            return flag;
        },

        data: function(data) {
            var c = _sipInfo.configs;
            var d = _sipInfo.data || {};

            if (data === undefined) {
                var attrs = {};
                var values = getValues();

                attrs.multiIspName = _sipInfo.name;

                if (c.numbers) {
                    if (c.numbers.prefix) {
                        attrs.multiVoipPrefixNum = c.numbers.prefix;
                        attrs.multiVoipNum = values.numbers[0];
                    }else if (c.numbers.inputNum === 2) {
                        attrs.multiVoipPrefixNum = values.numbers[0];
                        attrs.multiVoipNum = values.numbers[1];
                    } else {
                        attrs.multiVoipPrefixNum = '';
                        attrs.multiVoipNum = values.numbers[0];
                    }
                }

                attrs.multiAuthUserName = values.authID ? values.authID : '';
                attrs.multiAuthPassword = values.password ? values.password : '';

                attrs.multiExtension = attrs.multiVoipPrefixNum + attrs.multiVoipNum;
                attrs.multiRegistrarServer = values.advanced[0];
                attrs.multiRegistrarServerPort = values.advanced[1];
                attrs.multiProxyServer = values.advanced[2];
                attrs.multiProxyServerPort = values.advanced[3];
                attrs.multiOutboundProxy = values.advanced[4];
                attrs.multiOutboundProxyPort = values.advanced[5];
                attrs.multiRegisterViaOB = values.advanced[6];

                attrs.multiDomain = '';

                (function() {
                    for (var param in d) {
                        if (d.hasOwnProperty(param) && $.isArray(d[param])) {
                            var tempParam = '';
                            for (var i = 0, len = d[param].length; i < len; i++) {
                                var item = d[param][i];
                                if (typeof item === 'string') {
                                    tempParam += item;
                                } else if (typeof item === 'object') {
                                    for (var field in item) {
                                        if (item.hasOwnProperty(field)) {
                                            if (typeof values[field] === 'string') {
                                                tempParam += values[field];
                                            } else if ($.isArray(values[field])) {
                                                var index = item[field];
                                                tempParam += values[field][index];
                                            }
                                        }
                                    }
                                }
                            }
                            attrs[param] = tempParam;
                        } else {
                            console.error('Config must be an array');
                        }
                    }
                })();

                return attrs;
            } else if (typeof data === 'object') {
                setValues(data, this.selector);
            }
        },

        selectOption: function(data) {
            if (typeof data === 'number') {
                $(this.selector).find('option:eq('+data+')').prop('selected', 'selected');
            } else if (typeof data === 'string') {
                $(this.selector).find('option[data-text='+data+']').prop('selected', 'selected');
            }
            $(this.selector).tpSelect({refresh: 1});
        },
        codecPriority: function(name) {
            var c = _sipInfo.codec;
            return c[name] || 500;
        }
    };

    $.fn.ispMgr = function(options, data) {
        var item = this;

        if (item.length && item.length != 1) {
            return false;
        }

        var obj = $(item.selector).data("ispList");

        if (obj) {
            if (options === 'check') {
                return obj.validate();
            } else if (options === 'data') {
                return obj.data(data);
            } else if (options === 'select') {
                return obj.selectOption(data);
            } else if (options === 'codec') {
                return obj.codecPriority(data);
            }
            return obj;
        } else {
            var list = new ISP(options, item.selector);
            $(item.selector).data("ispList", list);
            return list;
        }
    };
})(jQuery);
