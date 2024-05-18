
(function($) {
    $.locale = {
        URL_STR_JS: "./locale/%LAN_TYPE%/str.js",
        URL_HELP_JS: "./locale/%LAN_TYPE%/help.js",
        URL_ARRAY_JS: "./locale/%LAN_TYPE%/array.js",
        URL_ERR_JS: "./locale/%LAN_TYPE%/err.js",
        URL_CSS: "./locale/%LAN_TYPE%/lan.css",
        DEFAULT_LAN_TYPE: "en_US",
        INCLUDE_NAME: "INCLUDE_LANGUAGE_%LAN_TYPE%"
    };

    $.locale._findLocale = function (lan) {
        lan = lan.replace('-', '_').toUpperCase();
        var result = null;
//        直接从LANGUAGE中匹配
        if ($.su.CHAR.LANGUAGE.hasOwnProperty(lan)) {
            result = lan;
        } else {
//            把lan作为一个片段来匹配
            lan = lan.split('_')[0];
            for (var i in $.su.CHAR.LANGUAGE) {
                if ($.su.CHAR.LANGUAGE.hasOwnProperty(i)) {
                    if (i.search(lan) === 0) {
                        result = i;
                        break;
                    }
                }
            }
        }
        if (result) {
//            查看该语言的宏是否等于1
            if (window[$.locale.INCLUDE_NAME.replace('%LAN_TYPE%', result)]) {
                var subs = result.split('_');
                result = subs[0].toLowerCase() + '_' + subs[1];
            } else {
                result = null;
            }

        }

        return result;

    };
    $.locale.get = function(callback_success, callback_failed) {
        var match;
        if ($.sim || $.local) {
            match = document.cookie.match(/locale=(?:(\w+);?)/);
            if (match && match[1] && (match[1] = this._findLocale(match[1]))) {
                $.locale.changeType({
                    locale: match[1]
                });
                if (callback_success) {
                    callback_success();
                }
                return;
            }
        }

        match = $.act(ACT_GET, LOCAL, null, null, ["language"]);
        if (!$.exe()) {
            if (match.language && (match.language = this._findLocale(match.language))) {                //赋值
                $.locale.changeType({
                    locale: match.language
                });
                if (callback_success) {
                    callback_success();
                }
            } else if ((match = this._findLocale(navigator.language || navigator.browserLanguage))){                //赋值
                $.locale.changeType({
                    locale: match
                });
            } else {
                $.locale.setDefault();
                if (callback_failed) {
                    callback_failed();
                }
            }
        }
    };

    $.locale.set = function(lanType, callback_success, callback_failed) {
        if (!lanType){
            return;
        }
        if ($.sim || $.local) {
            document.cookie = 'locale='+ lanType;
            if (callback_success) {
                callback_success();
            }
            location.reload();
        } else {
            $.act(ACT_SET, LOCAL, null, null, ["language=" + lanType]);
            $.exe(function(err) {
                if (!err) {
                    if (callback_success) {
                        callback_success();
                    }
                } else {
                    if (callback_failed) {
                        callback_failed();
                    }
                }
                location.reload();
            });
        }

    };

    $.locale.changeType = function(data) {
        var lanType = data.locale || $.locale.DEFAULT_LAN_TYPE;
        this.locale = lanType;
        var url_str_js = $.locale.URL_STR_JS.replace('%LAN_TYPE%', lanType);
        var url_help_js = $.locale.URL_HELP_JS.replace('%LAN_TYPE%', lanType);
        var url_array_js = $.locale.URL_ARRAY_JS.replace('%LAN_TYPE%', lanType);
        var url_err_js = $.locale.URL_ERR_JS.replace('%LAN_TYPE%', lanType);
        var url_css = $.locale.URL_CSS.replace('%LAN_TYPE%', lanType);

        $('#lan-str-js').remove();
        $('#lan-help-js').remove();
        $('#lan-array-js').remove();
        $('#lan-err-js').remove();
        $('#lan-css').remove();

        $('head').append('<script src="' + url_str_js + '" id="lan-str-js" type="text/javascript"></script>')
            .append('<script src="' + url_help_js + '" type="text/javascript" id="lan-help-js"></script>')
            .append('<script src="' + url_array_js + '" type="text/javascript" id="lan-array-js"></script>')
            .append('<script src="' + url_err_js + '" type="text/javascript" id="lan-err-js"></script>')
            .append('<link rel="stylesheet" type="text/css" id="lan-css" href="' + url_css +'"/>');

        $('#lan-css')[0].rel = 'stylesheet';
    };

    $.locale.setDefault = function() {
        $.locale.changeType({
            locale: this.DEFAULT_LAN_TYPE
        });
    };

    try {
        $.locale.get();
    } catch(e) {
        // location.href = "/";
    }
})(jQuery);
