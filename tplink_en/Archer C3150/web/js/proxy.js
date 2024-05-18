/*Variable and methods for set/get DM */
var ACT_GET = 1;
var ACT_SET = 2;
var ACT_ADD = 3;
var ACT_DEL = 4;
var ACT_GL = 5;
var ACT_GS = 6;
var ACT_OP = 7;
var ACT_CGI = 8;

var ACT_OP_REBOOT = "ACT_REBOOT";
var ACT_OP_REBOOT2 = "ACT_REBOOT2";
var ACT_OP_RESET = "ACT_RESET";
var ACT_OP_FACTORY_RESET = "ACT_FACTORY_RESET";
var ACT_OP_DHCP_RENEW = "ACT_DHCP_RENEW";
var ACT_OP_DHCP_RELEASE = "ACT_DHCP_RELEASE";
var ACT_OP_PPP_CONN = "ACT_PPP_CONN";
var ACT_OP_PPP_DISCONN = "ACT_PPP_DISCONN";

/* luodan add 20150827 for iptv */
var	ACT_OP_WAN_CONN = "ACT_WAN_CONN"
var	ACT_OP_WAN_DISCONN = "ACT_WAN_DISCONN"
/* luodan add end */
var ACT_OP_DUAL_ACCESS_RENEW = "ACT_DUAL_ACCESS_RENEW";
var ACT_OP_DUAL_ACCESS_RELEASE = "ACT_DUAL_ACCESS_RELEASE";
var ACT_OP_WLAN_GET_NEW_PIN = "ACT_WLAN_GET_NEW_PIN";
var ACT_OP_WLAN_RESTORE_PIN = "ACT_WLAN_RESTORE_PIN";
var ACT_OP_WLAN_UPDATE_ASSOC = "ACT_WLAN_UPDATE_ASSOC";
var ACT_OP_WLAN_WPS_PBC = "ACT_WLAN_WPS_PBC";
var ACT_OP_WLAN_WPS_PIN = "ACT_WLAN_WPS_PIN";
var ACT_OP_WLAN_SCAN = "ACT_WLAN_SCAN";
var ACT_OP_NTP_REQUEST = "ACT_NTP_REQUEST";
var ACT_OP_DLNA_MANUAL_SCAN = "ACT_DLNA_MANUAL_SCAN";
var ACT_OP_L2TP_CONN = "ACT_L2TP_CONN";
var ACT_OP_L2TP_DISCONN = "ACT_L2TP_DISCONN";
var ACT_OP_PPTP_CONN = "ACT_PPTP_CONN";
var ACT_OP_PPTP_DISCONN = "ACT_PPTP_DISCONN";
var ACT_OP_DIAG_STARTDIAG = "ACT_DIAG_STARTDIAG";
var ACT_OP_DIAG_DNSDIAG = "ACT_DIAG_DNSDIAG";
var ACT_OP_DO_WAN_DETECT = "ACT_DO_WAN_DETECT"
var ACT_DECT_ALLOW_REGISTER = "ACT_DECT_ALLOW_REGISTER";
var ACT_DECT_HANDSET_PAGING = "ACT_DECT_HANDSET_PAGING";
var ACT_DECT_HANDSET_DATETIME_SYNC = "ACT_DECT_HANDSET_DATETIME_SYNC";
var ACT_DECT_HANDSET_UNREGISTER = "ACT_DECT_HANDSET_UNREGISTER";
var ACT_DECT_HANDSET_START_TEST = "ACT_DECT_HANDSET_START_TEST";
var ACT_DECT_HANDSET_STOP_TEST = "ACT_DECT_HANDSET_STOP_TEST";
var ACT_OP_IPPING = "ACT_OP_IPPING";
var ACT_OP_TRACERT = "ACT_OP_TRACERT";
var ACT_VOICEAPP_INFO_REMOVE = "ACT_VOICEAPP_INFO_REMOVE";
var ACT_OVPN_REGEN_KEYS = "ACT_OVPN_REGEN_KEYS";
var ACT_HOMECARE_UPDATE_CLIINFO_PC = "ACT_HOMECARE_UPDATE_CLIINFO_PC";
var ACT_HOMECARE_UPDATE_CLIINFO_QOS = "ACT_HOMECARE_UPDATE_CLIINFO_QOS";
$.extend({
    tokenid: token || 0,
    dhtml: function(str, hook, midhook) {
        $.div.innerHTML = "div" + str;
        $.div.removeChild($.div.firstChild);
        var scripts = [];
        $.chgChd($.div.childNodes, function() {
            if (this.nodeName && this.nodeName.toLowerCase() === "script")
                scripts.push(this);
            else {
                if (!$.isMobileFlag) {
                    $.trans($(this));
                }
                hook.call($(this).get(0));
            }
        });
        if (midhook) midhook();
        $.each(scripts, function() {
            $.script(this.text || this.textContent || this.innerHTML || "")
        });
        $.emptyElem($.div);
    },
    script: function(data) {
        if (data && /\S/.test(data)) {
            var script = $.d.createElement("script");

            script.type = "text/javascript";
            if (script.text === undefined)
                script.appendChild($.d.createTextNode(data));
            else
                script.text = data;

            $.head.insertBefore(script, $.head.firstChild);

            $.head.removeChild(script);
        }
    },

    tpAjax: function(s) {
        if (s.type)
            s.type = s.type.toUpperCase();
        else
            s.type = "GET";

        if (s.data && typeof s.data !== "string")
            return false;

        if (s.type == "GET")
            s.url += (s.url.match(/\?/) ? "&" : "?") + "_=" + (+new Date());

        var requestDone = false;

        var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

        try {
            xhr.open(s.type, s.url, s.async);
        } catch (e) {
            if (s.error) s.error(ERR_EXIT);
            return false;
        }

        xhr.setRequestHeader("TokenID", $.tokenid);

        xhr.setRequestHeader("Content-Type", "text/plain");
        var onreadystatechange = function() {
            if (xhr.readyState == 0) {
                if (ival) {
                    clearInterval(ival);
                    ival = null;
                }
            } else if (!requestDone && xhr && xhr.readyState == 4) {
                requestDone = true;

                if (ival) {
                    clearInterval(ival);
                    ival = null;
                }

                if ($.ajok(xhr)) {
                    if (s.bScript)
                        $.script(xhr.responseText);

                    if (s.success)
                        s.success(s.bScript ? 0 : xhr.responseText);
                } else if (s.error) {
                    s.error(typeof xhr.status !== "number" ? ERR_INTERNAL : (xhr.status + ERR_INTERNAL));
                }

                if (s.async)
                    xhr = null;
            }
        };

        if (s.async) {
            var ival = setInterval(onreadystatechange, 13);
        }

        try {
            xhr.send(s.data);
        } catch (e) {
            if (s.error) s.error(ERR_NONE_FILE);
        }

        if (!s.async)
            onreadystatechange();
    },

    ajok: function(xhr) {
        try {
            return !xhr.status && $.local ||
                (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || xhr.status === 0;
        } catch (e) {}
        return false;
    },

    io: function(path, bScript, hook, data, noquit, unerr) {
        var ret = 0;
        var async = !! hook;
        hook = typeof hook === "function" ? hook : null;
        var id;
        if (hook && !noquit) id = $.getAsync();
        $.tpAjax({
            type: data ? "POST" : "",
            url: path,
            bScript: bScript,
            async: async,
            data: data ? data : null,
            success: function(data) {
                if (hook) {
                    if ($.checkAsync(id) || noquit) hook(data);
                } else
                    ret = data;
            },
            error: function(errno) {
                if (errno == ERR_NOT_ACCEPTED) {
                    //                    $.deleteCookie("Authorization");
                    window.location.reload(true);
                } else {
                    if (errno > ERR_NETWORK) errno = ERR_NETWORK;
                    $.err("io", errno, unerr);
                }

                if (hook) {
                    if ($.checkAsync(id) || noquit) hook(data);
                } else
                    ret = errno;
            }
        });
        return ret;
    },

    stkPop: function(stack, times) {
        times = times ? times : 1;
        if (stack instanceof Array) stack = stack.join(",");
        stack = stack.split(",");
        for (var i = 1, l = stack.length; i < l; i++) {
            if (stack[i] == 0) break;
        }
        for (i--; times > 0; i--, times--)
            stack[i] = 0;
        return stack.join(",");
    },


    cgi: function(path, arg, hook, noquit, unerr) {
        var expr = /(^|\/)(\w+)\.htm$/;
        if ($.local || $.sim) path = $.params;
        else path = (path ? path : $.curPage.replace(/\.htm$/, ".cgi")) + (arg ? "?" + $.toStr(arg, "=", "&") : "");
        $.ret = 0;
        var func = hook ? function(ret) {
                if (!ret && (ret = $.ret)) $.err("cgi", $.ret, unerr);
                if (typeof hook === "function") hook(ret);
            } : null;
        var ret = $.io(path, true, func, null, noquit, unerr);

        if (!ret && (ret = $.ret))
            $.err("cgi", $.ret, unerr);
        return ret;
    },


    ansiarg: [],

    ansi: function(str) {
        var arr = str.split("\r\n");
        for (var i = 0, l = arr.length; i < l; i++) {
            var ret = arr[i].split('=');
            ret = [ret.shift(), ret.join("=")];
            if (ret[1] && $.asc(ret[1], true)) {
                arr[i] = "\\" + ret[0];
                $.ansiarg.push(ret);
            }
        }
        return arr.join("\r\n");
    },

    as: [],
    ds: [],

    act: function(type, oid, stack, pStack, attrs) {
        if (!type || !oid)
            return false;
        stack = stack ? stack : "0,0,0,0,0,0";
        pStack = pStack ? pStack : "0,0,0,0,0,0";
        attrs = $.toStr(attrs, "=", "\r\n", true);
        attrs = attrs.replace(/__stack=[0-9,]*\r\n/, "");
        var ret = null;
        switch (type) {
            case ACT_ADD:
                if ($.cn) attrs = $.ansi(attrs);
            case ACT_GET:
                ret = {};
                break;
            case ACT_GL:
            case ACT_GS:
                ret = [];
                break;
            case ACT_SET:
            case ACT_CGI:
            case ACT_DEL:
                oid = oid ? oid : $.curPage.replace(/\.htm$/, ".cgi");
                if ($.cn) attrs = $.ansi(attrs);
            case ACT_OP:
                break;
            default:
                return false;
        }
        $.as.push([type, null, oid, stack, pStack, attrs, attrs ? attrs.match(/\r\n/g).length : 0]);
        $.ds.push(ret);
        return ret;
    },

    exe: function(hook, unerr) {
        var url = "/cgi?";
        var data = "";
        var index = 0;
        var obj;
        var bAnsi = false;
        var ERR_HTTP_ERR_CGI_INVALID_ANSI = 71017;

        if ($.as.length == 0 || $.local || $.sim) {
            if (hook && typeof hook === "function") $.timeout(hook, 200);
            while ($.as.pop() !== undefined);
            while ($.ds.pop() !== undefined);
            return 0;
        }

        $.emptyElem($.id("ansiform"));
        while ($.ansiarg.length) {
            obj = $.ansiarg.shift();
            $.appendElem($.id("ansiform"), "<input type='hidden' name='" + obj[0] + "' value='" + obj[1].replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "&apos;") + "' />");
            bAnsi = true;
        }

        while (obj = $.as.shift()) {
            url += obj[0] + (obj[1] ? "=" + obj[1] : "") + "&";
            data += "[" + obj[2] + "#" + obj[3] + "#" + obj[4] + "]" + index + "," + obj[6] + "\r\n" + obj[5];
            index++;
        }
        url = url.substr(0, url.length - 1);

//        if (hook) {
            var tmpds = $.mkArr($.ds);
            while ($.ds.length) $.ds.pop();
//        }

        var resolve = function(ret, ds) {
            if (typeof ret !== "number") {
                var lines = ret.split('\n');
                ret = 0;
                $.ret = 0;
                var scripts = "";

                for (var i = 0, l = lines.length; i < l; i++) {
                    if (lines[i] == "") continue;
                    if (lines[i].charAt(0) == "[") {
                        if (scripts != "") {
                            $.script(scripts);
                            if ($.ret) {
                                ret = $.ret;
                                $.err("cgi", ret, unerr);
                                break;
                            }
                            scripts = "";
                        }
                        var n = lines[i].indexOf("]");
                        var j = parseInt(lines[i].substr(n + 1), 10);
                        var stack = lines[i].substr(1, n - 1);
                        var instance;
                        if (stack == "error") {
                            if (j) {
                                ret = j;
                                if (ret != ERR_HTTP_ERR_CGI_INVALID_ANSI) $.err("exe", ret, unerr);
                                break;
                            }
                        } else if (ds[j] instanceof Array) {
                            instance = {
                                __stack: stack
                            };
                            ds[j].push(instance);
                        } else if (ds[j] != null) {
                            instance = ds[j];
                            instance.__stack = stack;
                        }
                    } else {
                        if (stack == "cgi") {
                            scripts += lines[i] + '\n';
                        } else {
                            var attr = lines[i].split("=");
                            instance[attr[0]] = attr.slice(1).join('=');
                        }
                    }
                }
            }
            while (ds.length) ds.pop();
            return ret;
        };

        if (bAnsi) {
            var formObj = $.d.forms[0];
            try {
                formObj.target = "up_frame";
                formObj.action = "/cgi/ansi";
                formObj.submit();
            } catch (e) {}
        }

        if (hook) {
            var resolve2 = function() {
                $.io(url, false, function(ret) {
                    ret = resolve(ret, tmpds);
                    if (typeof hook === "function") hook(ret);
                }, data, false, unerr)
            };
            if (bAnsi) $.timeout(resolve2, 100);
            else resolve2();
            return 0;
        } else {
            while (ret = $.io(url, false, null, data, false, unerr)) {
                ret = resolve(ret, tmpds);
                if (ret != ERR_HTTP_ERR_CGI_INVALID_ANSI) return ret;
                count++;
                if (count > 3) return $.err("exe", ERR_HTTP_ERR_CGI_INVALID_ANSI, unerr);
            }
        }
    }

});
