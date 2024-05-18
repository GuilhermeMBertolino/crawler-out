$.extend({
    w: window,
    d: document,
    c: function(obj) {
        return document.createElement(obj);
    },
    head: document.getElementsByTagName("head")[0],
    div: document.createElement("div"),
    bak: document.createElement("div"),
    ret: 0,

    sim: false,
    params: "./js/local.js",
    cn: false,
    qss: false,
    sysMode: "ETH",
    guageInterval: 700,

    magic: "0y8nc5094yeyrnoq",
    local: location.protocol == "file:",
    flag: navigator.appVersion.match(/MSIE/) ? parseInt(navigator.appVersion.match(/MSIE\s(\d)/)[1]) : 0,

    curPage: undefined,
    mainParam: undefined,
    diagParam: undefined,
    coverParam: undefined,
    accStack: [],

    model: "",
    desc: "",
    ports: 4,
    itv: 2,
    isFD: 0,
    isMobileFlag: 0,
    isIE: false,
    helpControl: {},

    chgChd: function(childs, handle) {
        var tmp = $.mkArr(childs);
        $.each(tmp, function() {
            if (this.nodeType == 1) return handle.call(this);
        });
        tmp = null;
    },

    id: function(id) {
        return $.d.getElementById(id);
    },

    mkArr: function(array) {
        if (!array) return [];
        var ret = [];
        for (var i = 0, l = array.length; i < l; i++)
            ret[i] = array[i];
        return ret;
    },

    inArray: function(elem, elems) {
        for (var i = 0, l = elems.length; i < l; i++)
            if (elems[i] === elem)
                return true;
        return false;
    },

    realLen: function(str) {
        var len = 0;
        for (var i = 0, l = str.length; i < l; i++) {
            len += str.charCodeAt(i) > 127 ? ($.cn ? 2 : 3) : 1;
        }
        return len;
    },

    attach: function(elem, type, data, handler) {
        var tmp;
        if (handler)
            tmp = data;
        else
            handler = data;
        var handle = function(e) {
            var event = event || e;
            var ret = handler.call(elem, event, tmp);
            return ret;
        };
        if (elem.addEventListener)
            elem.addEventListener(type, handle, false);
        else if (elem.attachEvent)
            elem.attachEvent("on" + type, handle);
    },

    hasElemClass: function(elem, className) {
        return elem && $.inArray(className, (elem.className ? elem.className : "").split(/\s+/));
    },

    addElemClass: function(elem, className) {
        if (elem && elem.nodeType == 1 && !$.hasElemClass(elem, className))
            elem.className += (elem.className ? " " : "") + className;
    },

    removeElemClass: function(elem, className) {
        if (elem && elem.nodeType == 1 && $.hasElemClass(elem, className)) {
            elem.className = elem.className.replace(className, "");
            elem.className = elem.className.replace(/\s+/, " ");
        }
    },

    cssFloat: function(elem, type) {
        var floattype = (elem.style.cssFloat === undefined ? "styleFloat" : "cssFloat");
        if (type == "left" || type == "right" || type == "none")
            elem.style[floattype] = type;
        else
            return elem.style[floattype];
    },

    opacity: function(elem, opacity) {
        if (!opacity)
            opacity = 0;
        if (elem.style.opacity === undefined) {
            elem.zoom = 1;
            elem.style.filter = (elem.style.filter || "").replace(/alpha\([^)]*\)/, "") +
                (parseInt(opacity) + '' == "NaN" ? "" : "alpha(opacity=" + opacity * 100 + ")");
        } else
            elem.style["opacity"] = opacity;
    },

    h: function(elem, value) {
        if (elem && elem.innerHTML !== undefined) {
            if (value === undefined)
                return elem.innerHTML;
            else
                elem.innerHTML = value;
        }
        return null;
    },


    appendElem: function(elem, value, midhook) {
        if (elem && elem.nodeType == 1 && typeof value === "string")
            $.dhtml(value, function() {
                elem.appendChild(this)
            }, midhook);
    },

    removeElem: function(elem) {
        if (elem && elem.parentNode)
            elem.parentNode.removeChild(elem);
    },

    emptyElem: function(elem) {
        while (elem && elem.firstChild)
            elem.removeChild(elem.firstChild);
    },

    asyncId: 1,
    asyncStack: {},

    getAsync: function() {
        var id = $.asyncId;
        $.asyncStack[id] = true;
        $.asyncId++;
        return id;
    },

    checkAsync: function(id) {
        return $.asyncStack[id];
    },

    clearAsync: function() {
        for (var i in $.asyncStack) delete $.asyncStack[i];
    },

    deleteCookie: function(name) {
        var LargeExpDate = new Date();
        document.cookie = name + "=; expires=" + LargeExpDate.toGMTString();
    },

    arr2obj: function(arr, param) {
        var ret = {};
        if (param === undefined) return ret;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i][param]) ret[arr[i][param]] = arr[i];
        }
        return ret;
    },

    obj2str: function(obj, sign1, sign2, tailing) {
        var ret = "";
        for (var i in obj)
            ret += i + (obj[i] || obj[i] === 0 || obj[i] === "" ? sign1 + obj[i] : "") + sign2;
        if (tailing)
            return ret;
        else
            return ret.substr(0, ret.length - sign2.length);
    },

    toStr: function(data, sign1, sign2, tailing) {
        return data ? (typeof data === "string" && data || data instanceof Array && data.join(sign2) + (tailing ? sign2 : "") || $.obj2str(data, sign1, sign2, tailing)) : "";
    },

    backup: function(id) {
        $.emptyElem($.bak);
        // IE will lost checked info after appendElem
        if ($.flag) {
            var con = $.id(id);
            var checks = [];
            var inputs = $.mkArr(con.getElementsByTagName("input"));
            $.each(inputs, function(arg, index) {
                if (this.checked) checks[index] = true;
            });
        }
        $.chgChd($.id(id).childNodes, function() {
            $.bak.appendChild(this)
        });
        if ($.flag) $.each(checks, function(arg, index) {
            if (this == true) {
                inputs[index].checked = true;
            }
        });
    },

    restore: function(id) {
        $.emptyElem($.id(id));
        if ($.flag) {
            var checks = [];
            var inputs = $.mkArr($.bak.getElementsByTagName("input"));
            $.each(inputs, function(arg, index) {
                if (this.checked) checks[index] = true;
            });
        }
        $.chgChd($.bak.childNodes, function() {
            $.id(id).appendChild(this)
        });
        if ($.flag) $.each(checks, function(arg, index) {
            if (this == true) {
                inputs[index].checked = true;
            }
        });
    },

    err: function(src, errno, unerr) {
        if (unerr) return errno;
        $.clearAsync();
        $.alertAsnyc(errno);
    },

    errBack: function(errno, dir) {
        $.clearAsync();
        $.alertAsnyc(errno)
    },

    tpLoad: function(html, id, resize, hook1, hook2, midhook) {
        var con = $.id(id);
        if (html.indexOf("<") < 0) {
            $.io(html, false, function(ret) {
                if (typeof ret !== "number")
                    $.fill(con, ret, hook1, hook2, resize, midhook);
                else
                    $.err(id, ret);
            }, null, id == "ban" || id == "menu" || id == "help" || id == "bot" || id == "top");
        } else
            $.fill(con, html, hook1, hook2, resize, midhook);
    },

    fill: function(container, content, hook1, hook2, resize, midhook) {
        if (hook1) hook1();
        $.emptyElem(container);
        $.appendElem(container, content, midhook);
        if (hook2) hook2();
        if (resize) $.resize();
    },

    loadBot: function(path) {
        $.tpLoad(path, "bot", false);
    },

    loadBanner: function(path, callback) {
        $.tpLoad(path, "top", false, null, callback);
    },

    loadMenu: function(path) {
        $.act(ACT_CGI, '/cgi/clearBusy');
        $.exe(function() {}, true);
        $.tpLoad(path, "menu", false, null, function() {
            $("#menu a:first").trigger("click")
        });
    },

    loadPage: function(id, path, hook1, hook2) {
        var bFile = (path.indexOf("<") < 0);
        $(window).trigger('beforeLoadPage', [$.curPage]);
        $.tpLoad(
            bFile ? "./main/" + path : path,
            id, true, hook1,
            function() { /*if (bFile) {*/
                $.upStyle(); /*$.trans();*/ /*} */
                $(window).trigger('loadPage', [[$.curPage]]);
                if (hook2) hook2();
            }
        );
    },

    loadMain: function(path, arg) {
        $("table").tpTable("destroy");
        $("input[type='checkbox']").tpCheckbox("destroy");
        $("input[type='radio']").tpRadio("destroy");
        $("div.button-group-container").tpBtnGroup("destroy");
        $('#main').empty();
        $('#quicksetup').empty();
        $(document).off('.tpSelect');
        $(window).off('.tpSelect');

        if (!path) path = $.curPage;
        var bFile = (path.indexOf("<") < 0);
        if (bFile) {
            $.emptyElem($.bak);
            $.clearAsync();
        }
        $.act(ACT_CGI, '/cgi/clearBusy');
        $.exe(function() {}, true);
        $.loadPage(
            "main",
            path,
            function() {
                if (bFile) {
                    $.curPage = path;
                    $.accStack.push(path);
                }
                $.mainParam = arg;
                while ($.as.length) $.as.pop();
                while ($.ds.length) $.ds.pop();
                while ($.ansiarg.length) $.ansiarg.pop();
                $.addElemClass($.id("main"), "nv");
                $.unlock();
            },
            function() {
                $.removeElemClass($.id("main"), "nv");
            }
        );
    },

    loadCover: function(path, opacity, arg) {
        $.tpLoad(path, "cover", false, function() {
            $.diagParam = arg;
            $.removeElemClass($.id("cover"), "nd");
            $.opacity($.id("cover"), opacity);
        });
    },

    reload: function(arg) {
        if ($.isMobileFlag) {
            $.loadPhoneMain(null, arg);
        } else {
            $.loadMain(null, arg);
        }
    },

    refresh: function(domain, port, frame, page) {
        if ($.local) location.reload(true);
        else {
            var ret = location.href.match(/(https?):\/\/([^:\/]+)(:\d+)?\/?([^?]*)/);
            location.href = ret[1] + "://" +
                (domain ? domain : ret[2]) +
                (port ? ":" + port : (ret[3] ? ret[3] : "")) + "/";
        }
    },

    resize: function() {
        //        此处与phone页面有影响所以修改
        /*        if ($('#mainBody').length > 0) {
                    $("#scroll").height(document.documentElement.clientHeight - 90);
                    var max = Math.max($("#scroll").height() - 56, $("#main").height() + 30, $("#menu").height() + 21);
                    $("#main").height('auto');
                    $("#menu").height('auto');
                    $.mainScroll();
                }*/
    },

    mainScroll: function() {
        /*        if ($("#bot").position().top > $(document).height() + 11) {
                    $("#menu").css({
                        bottom: "11px"
                    });
                } else {
                    $("#menu").css({
                        bottom: $(document).height() + 11 - $("#bot").position().top + "px"
                    });
                }*/
    },

    fixTbl: function() {
        $.each(document.getElementsByTagName("div"), function() {
            if (this.offsetWidth != 0 && ($.hasElemClass(this, "thead") || $.hasElemClass(this, "tbody")))
                this.getElementsByTagName("table")[0].style["width"] = this.offsetWidth - 20 + "px";
        });
    },

    //If the table list could not be edited, show the whole string.
    resizeStrList: function(val, num) {
        var tmpStr = "";
        var index = 0;
        while (val.length > index) {
            if (val.length > (index + num)) {
                tmpStr += val.slice(index, index + num);
                tmpStr += "<br/>";
                index += num;
            } else {
                tmpStr += val.slice(index, val.length);
                break;
            }
        }
        return tmpStr;
    },

    //If the table list could be edited,  show the string with ellipsis.
    resizeStr: function(val, num) {
        var tmpStr = "";
        if (val.length > num) {
            for (var i = 0; i < num; i++)
                tmpStr += val.charAt(i);
            tmpStr += "...";
        } else
            tmpStr = val;

        return tmpStr;
    },

    resizeTlb: function(tlb, rows, rowLines) {
        var div = tlb.parentNode;
        if (tlb.rows.length > rows) {
            div.style["height"] = ((rowLines ? rowLines : 1) * 22 + 3) * rows + "px";
            $.addElemClass(div, "scroll");
        } else {
            div.style["height"] = "auto";
            $.removeElemClass(div, "scroll");
        }
    },

    lock: function() {
        $.removeElemClass($.id("cover"), "nd");
        $.opacity($.id("cover"), 0);
    },

    unlock: function() {
        $.addElemClass($.id("cover"), "nd");
    },

    locked: function() {
        return $.hasElemClass($.id("cover"), "nd") ? false : true;
    },

    addLoading: function(object, interval, hook, isNoCover) {
        $.lock();
        var obj;
        if (object) {
            obj = $(object);
            if (obj.hasClass('button-group-button')) {
                $("<div style='display: inline-block; vertical-align: middle;position: relative;top: -10px;'><span class='load'></span></div>").appendTo(obj.closest("div.button-group-container"));
            } else {
                $("<div style='display: inline-block; vertical-align: middle;position: relative;top: -10px;'><span class='load'></span></div>").insertAfter(obj);
            }
        } else {
            obj = null;
        }

        if (interval) {
            $.timeout(function() {
                if (!hook || hook() !== false) $.removeLoading();
            }, interval);
        }
        $.showLoading(obj, isNoCover);
    },

    showLoading: function(obj, isNoCover) {
        if (obj) {
            if (obj.hasClass('button-group-button')) {
                obj.closest("div.button-group-container").find('.load').show();
            } else {
                obj.next('div').find('.load').show();
            }
            if (isNoCover === 1) {
                return;
            }
            var tmp = $("span.load");
            if (tmp.length > 0) {
                $.showCover('loading');
            }
        } else {
            var loadingObj = $('#g-loading-container').length > 0 ? $('#g-loading-container') :
                $('<div class="g-loading-container" id="g-loading-container" ><div class="g-loading-container-wrap"><div class="g-loading-container-inner"><div class="g-loading-waiting-icon"></div></div></div></div>').appendTo('body');
            loadingObj.show();
            $.showCover('loading');
        }


    },

    hideLoading: function() {
        $.hideCover();
        $("span.load").not('.wpsload').hide();
    },

    removeLoading: function() {
        $("span.load").closest('div').remove();
        $('#g-loading-container').hide();
        $.unlock();
        $.hideCover('loading');
        if ($.isFunction($.act)) {
            $.act(ACT_CGI, '/cgi/clearBusy');
            $.exe(function() {}, true);
        }
    },

    timeout: function(hook, interval) {
        var id = $.getAsync();
        return setTimeout(function() {
            if ($.checkAsync(id) && hook) hook();
        }, interval);
    },

    auto_interval: 0,
    auto: function(handle, interval, imediate, args, hook, id) {
        $.auto_interval = interval;

        if (id) {
            if (!$.checkAsync(id)) return;
        } else
            id = $.getAsync();
        if (imediate) {
            if (handle(args) === false) {
                if (hook) hook(args);
                return;
            }
        }

        return setTimeout(function() {
            $.auto(handle, $.auto_interval, 1, args, hook, id);
        }, $.auto_interval);
    },

    guage: function(strs, step, interval, hook, start, end, diag, note) {
        var progressBarMaxLength = 450;
        var note = note ? ("<p class='progressbar-note'><span class='progressbar-note-title'>" + m_str.note + ": </span>" + note + "</p>") : '';
        var str = "<div class='con2'><p class='center'>" + strs[1] + "</p><div class='gbar-parent' style='width:" + progressBarMaxLength + "px;'><div class='gbar' id='_gbar'><b class='gitem' id='gitem'></b></div></div>" + note + "</div>";

        if (diag) {
            $.loadCover(str, 1);
        } else {
            var alertContainer = $.progressBar(str);
        }
        var completed = false;
        var count = 0;
        var count_max = 5000 / interval;
        var retTmp = false;

        $.auto(function(args) {
            if (!completed) {
                if (args[2] >= (args[3] / 2)) {
                    if (count++ > count_max) {
                        count = 0;
                        type = "GET";
                        url = "?_=" + (+new Date());
                        var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
                        xhr.open(type, url, true);
                        xhr.setRequestHeader("Content-Type", "text/plain");
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                completed = true;
                            }
                        };
                        xhr.send(null);
                    }
                }
            } else {
                $.auto_interval = 5000 / step;
            }
            var percent = Math.floor(args[2] * 100 / args[3]);
            $(args[1]).animate({
                width: progressBarMaxLength / 100 * percent
            }, $.auto_interval, function() {
                $(args[0]).html(percent + "%");
            });
            if (args[2] >= args[3])
                return false;
            args[2]++;
        }, interval, true, [$.id("gitem"), $.id("_gbar"), start ? start : 0, step, end ? end : step], function(args) {
            $('#_gbar').animate({
                width: progressBarMaxLength
            }, 1, hook);
        });
    },

    guageWithRateControl: function(options) {
        options = $.extend({}, options);
        var percent = options.startRate || 0;
        var text = options.text || '';
        var note = options.note ? ("<p class='progressbar-note'><span class='progressbar-note-title'>" + m_str.note + ": </span>" + options.note + "</p>") : '';
        var updateImmediately = options.updateImmediately || true;
        var updateInterval = options.updateInterval || 1000;
        var rateControl = options.rateControl || function(percentOld, callback) {
                callback(percentOld + 1);
            };
        var callback_complete = options.callback_complete;
        var callback_error = options.callback_error;

        var isComplete = options.isComplete || function(percentOld, callback_complete) {
                if (percentOld >= 100) {
                    if (callback_complete) {
                        callback_complete();
                    }
                }
            };

        var updateIntervalHighSpeed = options.updateIntervalHighSpeed || 50;
        var autoEndFlag = false;
        var completeFlag = false;
        var errorFlag = false;
        var progressBarMaxLength = 450;
        var closeProgressBar = function() {
            var tmp = $("div.alert-container.progress-bar");
            tmp.hide();
            $('body').off('mousedown.focus');
            $('body').off('keydown.focus');
			$.hideCover('msg');
        };

        var str = "<div class='con2'><p class='center'>" + text + "</p><div class='gbar-parent' style='width:" + progressBarMaxLength + "px;'><div class='gbar' id='_gbar'><b class='gitem' id='gitem'>" + percent + "%</b></div></div>" + note + "</div>";
        $.progressBar(str);

        $.auto(function(args) {
            if (autoEndFlag) {
                return false;
            }

            var gbar = $('#_gbar');
            var gitem = $('#gitem');

            rateControl(percent, function(percentNew) {
                if (percentNew > 100) {
                    percentNew = 100;
                }
                percent = percentNew;
                gbar.animate({
                    width: progressBarMaxLength / 100 * percentNew
                }, $.auto_interval, function() {
                    gitem.html(percentNew + "%");
                    if (percentNew >= 100 && completeFlag) {
                        autoEndFlag = true
                    }
                });
            });
            isComplete(percent, function() {
                completeFlag = true;
                //                reset the rateControl method.
                rateControl = function(percentOld, callback) {
                    callback(percentOld + 1);
                };
                //                reset the the interval of $auto
                $.auto_interval = updateIntervalHighSpeed;
                //                reset isComplete. beacuse it has benn already completed, it don't need to judge again.
                isComplete = function() {};
            }, function(data) {
                autoEndFlag = true;
                errorFlag = true;
                callback_error.call($, data);
            });

        }, updateInterval, updateImmediately, [], function() {
            closeProgressBar();
            if (!errorFlag) {
                if (callback_complete) {
                    callback_complete();
                }
            }
        });
    },

    goToOtherPage: function(page, navName, callback) {
        var flag_channelChange = false;
        var askInterval = 200;
        if (!page || !navName) {
            return;
        }

        if ($.curPage == page) {
            if ($.isFunction(callback)) {
                callback();
            }
            return;
        }
        var timer1 = setInterval(function() {
            if ($('#top-nav').hasClass('disabled')) {
                return;
            }
            var navSelected = $('#ul-nav li.selected');
            if (navSelected.length == 0 || (!$('#quicksetup').text().match(/\S/) && (!$('#menu').data('tpMenu') || $('#main').is(':empty')))) {
                return;
            } else {
                clearInterval(timer1);
                if (navSelected.attr('id') != navName) {
                    $('#' + navName).click();
                    flag_channelChange = true;
                } else {
                    flag_channelChange = false;
                }

                var timer2 = setInterval(function() {
                    var li = $('#menuTree').find('a[url="' + page + '"]:not(.more)').parent('li');
                    if (li.length === 0) {
                        return;
                    }

                    clearInterval(timer2);
                    var parentScrollTop = 0;
                    if (li.hasClass('ml2') && li.is(':hidden')) {
                        var parentLi = li.parents('li.ml1');
                        parentScrollTop = parentLi.offset().top;
                        $('#menu').scrollTop(parentScrollTop);
                        (parentLi.find('a'))[0].click();
                    }
                    (li.find('a'))[0].click();
                    setTimeout(function() {
                        //                        $('#menu').scrollTop(li.offset().top + parentScrollTop);
                        $('#menu').scrollTop(li.position().top - $('#menu').children(':first').position().top);
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    }, 200);
                }, flag_channelChange ? askInterval : 10);
            }
        }, ($('#ul-nav li.selected').length > 0 ? 10 : askInterval));
    },

    turnqss: function(str) {
        if ($.qss) return str.replace(/\bWPS\b/g, "QSS");
        else return str.replace(/\bQSS\b/g, "WPS");
    },

    num: function() {
        var l = arguments.length - 1;
        var unalert = arguments[l];
        if (unalert !== true) {
            l++;
            unalert = false;
        }
        var val = arguments[0];
        if (typeof val === "string" && val.match(/\D/))
            return $.alert(ERR_NUM_INVAD, unalert);
        var val = parseInt(val, 10);
        if (isNaN(val)) return $.alert(ERR_NUM_INVAD, unalert);
        if (l == 1) return 0;
        for (var i = 1; i < l; i++) {
            if (val >= arguments[i][0] && val <= arguments[i][1] || val === arguments[i])
                return 0;
        }
        return $.alert(ERR_NUM_OUTRANGE, unalert);
    },

    step: function(num, step) {
        return Math.round(parseInt(num, 10) / step) * step;
    },

    asc: function(str, unalert) {
        for (var i = 0, l = str.length; i < l; i++)
            if (str.charCodeAt(i) > 127) return $.alert(90201, unalert);
        return 0;
    },

    ip2num: function(ip) {
        if (typeof ip === "number") return ip;
        var ret, val;
        if (!(ret = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/))) return false;
        for (var i = 1, val = 0; i <= 4; i++) {
            if (parseInt(ret[i], 10) > 255) return false;
            val = (val << 8) + parseInt(ret[i], 10);
        }
        return val;
    },

    num2ip: function(num) {
        if (typeof num !== "number") return false;
        return "" + ((num >> 24) + 256) % 256 + "." + (num >> 16 & 0xff) + "." + (num >> 8 & 0xff) + "." + (num & 0xff);
    },

    ifip: function(ip, unalert) {
        if ((ip = $.ip2num(ip)) === false) return $.alert(ERR_IP_FORMAT, unalert);
        if (ip == -1) return $.alert(ERR_IP_BROADCAST, unalert);
        var net = ip >> 24;
        if (net == 0) return $.alert(ERR_IP_SUBNETA_NET_0, unalert);
        if (net == 127) return $.alert(ERR_IP_LOOPBACK, unalert);
        if (net >= -32 && net < -16) return $.alert(ERR_IP_MULTICAST, unalert);
        if (net >= -16 && net < 0) return $.alert(ERR_IP_PRESERVED, unalert);
        return 0;
    },

    mask: function(mask, unalert) {
        if ((mask = $.ip2num(mask)) >= 0) return $.alert(ERR_MASK_INVAD, unalert);
        for (var i = 32; i > 0; i--, mask = mask >> 1)
            if (mask % 2) return mask == -1 ? 0 : $.alert(ERR_MASK_INVAD, unalert);
    },

    ipmask: function(ip, mask, unalert) {
        var temp;
        ip = $.ip2num(ip);
        mask = $.ip2num(mask);
        if ((ip & mask) == mask || (ip & mask) == 0) return $.alert(ERR_IPMASK_SUBNET_INVAD, unalert);
        if ((ip & ~mask) == ~mask || (ip & ~mask) == 0) return $.alert(ERR_IPMASK_HOST_INVAD, unalert);
        return 0;
    },

    ipmaskgw: function(ip, mask, gw, unalert) {
        ip = $.ip2num(ip);
        mask = $.ip2num(mask);
        gw = $.ip2num(gw);
        if ((ip & mask) != (gw & mask)) return $.alert(ERR_IPGW_NOT_SAME_SUBNET, unalert);
        return 0;
    },

    mac: function(mac, unalert) {
        if (!(ret = mac.match(/^([0-9a-fA-F]{2})(:[0-9a-fA-F]{2}){5}$/))) return $.alert(ERR_MAC_FORMAT, unalert);
        if (mac == "00:00:00:00:00:00") return $.alert(ERR_MAC_ZERO, unalert);
        if (mac.match(/^[fF]{2}(:[fF]{2}){5}$/)) return $.alert(ERR_MAC_BROADCAST, unalert);
        if (parseInt(ret[1], 16) % 2) return $.alert(ERR_MAC_MULTICAST, unalert);
        return 0;
    },

    ip2ip: function(ip) {
        var ipParts = ip.split(".");
        for (var i = 0; i < 4; i++) {
            ipParts[i] = parseInt(ipParts[i], 10);
        }
        var ipStr = ipParts[0] + "." + ipParts[1] + "." + ipParts[2] + "." + ipParts[3];
        return ipStr;
    },

    isname: function(pName) {
        return pName.length && (pName.match(/[\\\/\"\:\*\?\<\>\|\&]|\s$/) == null ? true : false);
    },

    isdomain: function(domain) {
        var c;
        var gotDot = false;
        var ch = "-.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if ((domain.charAt(0) == ".") || (domain.charAt(0) == "-") || ((domain.charAt(domain.length - 1) == ".")) || ((domain.charAt(domain.length - 1) == "-")))
            return false;
        for (var i = 0; i < domain.length; i++) {
            c = domain.charAt(i);
            if (ch.indexOf(c) == -1)
                return false;
            if ((c == "-") && (gotDot == true))
                return false;
            if ((c == ".") && (gotDot == true))
                return false;
            if ((c == ".") && (gotDot == false))
                gotDot = true;
            if ((c == "-") && (gotDot == false))
                gotDot = true;
            if ((c != ".") && (c != "-") && (gotDot == true))
                gotDot = false;
        }
        return true;
    },

    isnum: function(num_string) {
        var c;
        var ch = "0123456789";
        for (var i = 0; i < num_string.length; i++) {
            c = num_string.charAt(i);
            if (ch.indexOf(c) == -1)
                return false;
        }
        return true;
    },

    isSameLan: function(lan1Ip, lan1Mask, lan2Ip, lan2Mask) {
        var count = 0;
        lan1a = lan1Ip.split('.');
        lan1m = lan1Mask.split('.');
        lan2a = lan2Ip.split('.');
        lan2m = lan2Mask.split('.');
        for (i = 0; i < 4; i++) {
            l1a_n = parseInt(lan1a[i]);
            l1m_n = parseInt(lan1m[i]);
            l2a_n = parseInt(lan2a[i]);
            l2m_n = parseInt(lan2m[i]);
            if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
                count++;
        }
        if (count == 4) {
            var testIp = $.ip2num(lan1Ip);
            var lanMask = $.ip2num(lan1Mask);
            if (((testIp & (~lanMask)) == 0) || ((testIp & (~lanMask)) == (~lanMask)))
                return false;
            else
                return true;
        } else
            return false;
    },

    charCompareA: function(szname, en_limit, cn_limit) {
        var c;
        var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";
        if (szname.length > en_limit) {
            return false;
        }
        for (var i = 0; i < szname.length; i++) {
            c = szname.charAt(i);
            if (ch.indexOf(c) == -1) {
                if (szname.length > cn_limit) {
                    return false;
                }
            }
        }
        return true;
    },

    getrightfirstonebitpos: function(num) {
        var i;
        var pos = 0;
        var numArr = [1, 2, 4, 8, 16, 32, 64, 128];
        for (i = 0; i < 8; i++) {
            if (((num & numArr[i]) >> i) == 0)
                pos++;
        }
        return pos;
    },

    getmaskbit: function(mask) {
        var i, j;
        var pos = 0;
        var numArr = [1, 2, 4, 8, 16, 32, 64, 128];
        var maskPart = mask.split(".");
        for (i = 3; i >= 0; i--) {
            for (j = 0; j < 8; j++) {
                if (((maskPart[i] & numArr[j]) >> j) == 0)
                    pos++;
            }
        }
        return pos;
    },

    isOrderIp: function(ip1, ip2) {
        var ipS = ip1.split(".");
        var ipE = ip2.split(".");
        for (var i = 0; i < 4; i++) {
            if (parseInt(ipS[i], 10) < parseInt(ipE[i], 10))
                return true;
            else if (parseInt(ipS[i], 10) > parseInt(ipE[i], 10))
                return false;
        }
        return true;
    },

    reverseStr: function(str) {
        var newStr = "";
        for (var i = 0; i < str.length; i++) {
            newStr += str.substring(str.length - 1 - i, str.length - i);
        }
        return newStr;
    },

    formatNum: function(num) {
        var numNew = $.reverseStr(num.toString());
        if (numNew.length > 3) {
            numNew = numNew.replace(/(\d\d\d)/g, function($0, $1) {
                return $1 + ","
            });
        }
        numNew = (numNew.charAt(numNew.length - 1) == ',') ? numNew.substring(0, numNew.length - 1) : numNew;
        return $.reverseStr(numNew);
    },

    getWl24gMask: function(modeValue, chwidthValue) {
        var mask = 0x0;
        if ((modeValue == "n-only") || (modeValue == "n") || modeValue == "gn") //11n-only,11bgn,11gn
        {
            if (chwidthValue == "20M") //HT20
                mask = (1 << IEEE80211_MODE_11NG_HT20);
            else if (chwidthValue == "40M") //HT40
                mask = (1 << IEEE80211_MODE_11NG_HT40);
            else if (chwidthValue == "Auto") //Auto
                mask = (1 << IEEE80211_MODE_11NG_HT40) | (1 << IEEE80211_MODE_11NG_HT20);
        } else
            $.alert(ERR_WLAN_MODE_INVALID);

        return mask;
    },

    getWl5gMask: function(modeValue, chwidthValue) {
        var mask = 0x0;
        if ((modeValue == "n-only") || (modeValue == "an") || (modeValue == "ac") || (modeValue == "ac-only") || (modeValue == "nac")) //11na, 11n-only,11ac,11ac-only,11ac/n
        {
            if (chwidthValue == "20M") //HT20
                mask = (1 << IEEE80211_MODE_11NA_HT20);
            else if (chwidthValue == "40M" || chwidthValue == "80M") //HT40
                mask = (1 << IEEE80211_MODE_11NA_HT40);
            else if (chwidthValue == "Auto") //Auto
                mask = (1 << IEEE80211_MODE_11NA_HT40); //|(1<<IEEE80211_MODE_11NA_HT20)
        } else if (modeValue == "a") //11a
            mask = (1 << IEEE80211_MODE_11A);
        else
            $.alert(ERR_WLAN_MODE_INVALID);

        return mask;
    },

    is5GSupportRegion: function(standardArg, bandwidthArg, indexArg) {
        var flag = false;
        var enDFS = 0;
        var regionIndex = indexArg * region_chan_table_shift;
        var dfsMask = (1 << IEEE80211_CHAN_REQUIRED_DFS);
        var mask = $.getWl5gMask(standardArg, bandwidthArg);

        for (i = 1; i <= TOTAL_CHANNEL; i++) {
            if (Region_chan_table[regionIndex + i] & mask) {
                if (((Region_chan_table[regionIndex + i] & dfsMask) == 0) || ((Region_chan_table[regionIndex + i] & dfsMask) && (enDFS == 1))) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    },

    chgElem: function(elem, val) {
        if (elem && elem.nodeName) {
            switch (elem.nodeName.toLowerCase()) {
                case "input":
                    elem.value = val;
                    break;
                case "option":
                    elem.text = val;
                    break;
                default:
                    if ($.hasElemClass(elem, "item")) val = val.replace(/:?\s*$/, ":");
                    $(elem).html(val);
                    break;
            }
            //for localization
            //$.removeElemClass(elem, "T");
        }
    },

    upStyle: function() {
        $("h3").each(function() {
            if ($(this).parent('div').hasClass('header-container')) {
                return;
            } else {
                var str = "<div class='header-container'><h3><span class='T " + $(this).attr('class') + "'>" + $(this).html() + "</span></h3></div>";
                $(this).replaceWith(str);
            }
        });

        if (WEB_INCLUDE_HELP) {
            $.addHelp();
        }

        $("div.mode-change").tpModeSelect();

        $("input[type='text']").each(function() {
            var divTmp = $(this).parent('div');
            var bTmp = $(divTmp).find('b');
            $(this).addClass('tp-input-text');
            if (($.isIE) && $(this).is(':not(.mac-address):not(.ip-address)') && $(this).css('borderWidth').search('1px') == 0) {
                $(this).wrap('<div class="input-wrapper">').after('<span class="corner-left"></span><span class="corner-right"></span>');
                var wrap = $(this).parent('.input-wrapper');
                $(this).off('.inputIE').on('focus.inputIE', function() {
                    wrap.addClass('focus');
                }).on('blur.inputIE', function() {
                    wrap.removeClass('focus')
                });
            }
            if ($(bTmp).attr('class') == undefined) {
                if ($(bTmp).attr('id') == undefined) {
                    $(bTmp).replaceWith("<label class='label-title'>" + $(bTmp).html() + "</label>");
                } else {
                    $(bTmp).replaceWith("<label class='label-title' id='" + $(bTmp).attr('id') + "'>" + $(bTmp).html() + "</label>");
                }
            } else {
                if ($(bTmp).attr('id') == undefined) {
                    $(bTmp).replaceWith("<label class='label-title" + " " + $(bTmp).attr('class') + "'>" + $(bTmp).html() + "</label>");
                } else {
                    $(bTmp).replaceWith("<label class='label-title" + " " + $(bTmp).attr('class') + "' id='" + $(bTmp).attr('id') + "'>" + $(bTmp).html() + "</label>");
                }
            }

            $(divTmp).addClass('pure-control-group');
            $(this).keydown(function(e) {
                if (e.keyCode == 0xD) {
                    e.preventDefault();
                }
            });
        });

        $("input[type='password']").each(function() {
            var divTmp = $(this).closest('div:not(.tpPassword)');
            var bTmp = $(divTmp).find('b');
            $(this).addClass('tp-input-text');
            if (($.isIE) && $(this).css('borderWidth').search('1px') == 0) {
                $(this).wrap('<div class="input-wrapper">').after('<span class="corner-left"></span><span class="corner-right"></span>');
                var wrap = $(this).parent('.input-wrapper');
                $(this).off('.inputIE').on('focus.inputIE', function() {
                    wrap.addClass('focus');
                }).on('blur.inputIE', function() {
                    wrap.removeClass('focus')
                });
            }
            if ($(bTmp).attr('class') == undefined) {
                if ($(bTmp).attr('id') == undefined) { /* added by hx, 2015.05.28, to get "id" of tag <b> */
                    $(bTmp).replaceWith("<label class='label-title'>" + $(bTmp).html() + "</label>");
                } else {
                    $(bTmp).replaceWith("<label class='label-title' id='" + $(bTmp).attr('id') + "'>" + $(bTmp).html() + "</label>");
                }
            } else {
                if ($(bTmp).attr('id') == undefined) {
                    $(bTmp).replaceWith("<label class='label-title" + " " + $(bTmp).attr('class') + "'>" + $(bTmp).html() + "</label>");
                } else {
                    $(bTmp).replaceWith("<label class='label-title" + " " + $(bTmp).attr('class') + "' id='" + $(bTmp).attr('id') + "'>" + $(bTmp).html() + "</label>");
                }
            }

            $(divTmp).addClass('pure-control-group');
            $(this).keydown(function(e) {
                if (e.keyCode == 0xD) {
                    e.preventDefault();
                }
            });
        });

        $("div.steps").each(function() {
            $(this).children("h5").addClass("title");
            $(this).find("span[id*='step']").addClass("step");
        });

        $("button[type='submit']").not(".button-group-button").each(function() {
            var tag;
            if ($(this).hasClass("tp-btn-custom")) {
                return;
            }
            $(this).addClass("pure-button tp-btn-custom");
            nameTmp = $(this).html();
            if ((tag = this.className.match(/\b(T_|t_)(\w+)\b/) != null)) {
                tag = tag[0];
            }
            $(this).html('<span class="' + tag + '">' + nameTmp + '</span>');
            var str = "<div class='button-container'></div>";
            $(this).wrap(str);

            if ($(this).hasClass('inline')) {
                $(this).parent().addClass('inline');
            }
            if ($(this).hasClass('left')) {
                $(this).parent().addClass('left');
                $(this).removeClass('left'); // in chrome we should remove 'left', or the text will align left.
            }
            str = "<form class='pure-form'></form>";
            $(this).wrap(str);
        });
        $("button[type='submit']").click(function(e) {
            e.preventDefault();
        });
    },

    addHelp: function() {
        var curPageName = $.curPage.replace(/\.htm$/, '');
        if ( !! $.helpContent[curPageName] || !! $.helpContent[curPageName + $.sysMode]) {
            var helpstr = '<div class="help-container">' +
                '<div class="help-btn-container">' +
                '<a class="btn-help" href="javascript:void(0)"></a>' +
                '</div>' +
                '<div class="help-content-container">' +
                '<div class="position-top-left"></div>' +
                '<div class="position-top-center"></div>' +
                '<div class="position-top-right"></div>' +
                '<div class="position-center-left">' +
                '<div class="position-center-right">' +
                '<span class="help-content-delta"></span>' +
                '<div class="help-content-container-wrap">' +
                '<div class="help-content"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="position-bottom-left"></div>' +
                '<div class="position-bottom-center"></div>' +
                '<div class="position-bottom-right"></div>' +
                '</div>' +
                '</div>';
            $('div.help-container').remove();
            $("#verticalFixed-con").append(helpstr);

            $.loadHelp($.curPage.replace(/\.htm$/, ''));
            var $helpContainer = $('div.help-container');
            var $helpContent = $('.help-content-container');
            $('div.help-btn-container').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if ($helpContainer.hasClass('clicked')) {
                    $helpContainer.removeClass('clicked');
                    $helpContent.slideUp('fast');
                    $(document).off('click.closeHelp');
                } else {
                    $helpContainer.addClass('clicked');
                    $helpContent.slideDown('fast');
                    $(document).off('click.closeHelp').on('click.closeHelp', function() {
                        if ($helpContainer.hasClass('clicked')) {
                            $helpContainer.removeClass('clicked');
                            $helpContent.slideUp('fast');
                            $(document).off('click.closeHelp');
                        }
                    });
                }
            });
            $('div.help-btn-container').on('mouseenter.helpBtn', function(e) {
                $(this).find('a.btn-help').addClass('hover');
            });
            $('div.help-btn-container').on('mouseleave.helpBtn', function(e) {
                $(this).find('a.btn-help').removeClass('hover');
            });
            $helpContent.on('click', function(e) {
                e.stopPropagation();
            });

            var resizeHelp = function() {
                var wrap = $("div.help-content-container-wrap");
                var wh = $(window).height();
                //56是底部栏的高度
                wrap.css("max-height", wh - 290 - 56);


                if (($('#scroll').width() - $('#con').width()) / 2 >= $('.help-content-container').width()) {
                    $helpContent.addClass('right');
                } else {
                    $helpContent.removeClass('right');
                }
            };
            resizeHelp();

            $(window).off('resize.helpBtn').on('resize.helpBtn', function() {
                resizeHelp();
            });
        } else {
            $('div.help-container').hide();
        }

        $("tr.editor-container").children("td").find("div.help-container").remove();
    },

    loadHelp: function(name) {
        name = name || $.curPage.replace(/\.htm$/, '');
        var help = this;
        var index = 1;
        var sectionFlag = false;   //use to mark a section is start or end

        var render = function(contentObj) {
            var htmlStr = "";
            if (contentObj.TITLE) {
                sectionFlag = true;
                htmlStr += "<div class=\"section-container\">";
                htmlStr += "<h4 class=\"title\">" + contentObj.TITLE + "</h4>";
            }
            var objContent = contentObj.CONTENT;

/*
            if (name == 'wanBasic') {
                if ($.sysMode.toUpperCase() == 'ETH') {
                    objContent = contentObj.CONTENT_ETH;
                } else if ($.sysMode.toUpperCase() == 'DSL') {
                    objContent = contentObj.CONTENT_DSL;
                }
            }
*/

            if (objContent) {
                $(objContent).each(function(index, element) {
                    htmlStr += contentRender(element);
                })
            }
            if (sectionFlag == true) {
                //section end
                sectionFlag = false;
                htmlStr += "</div>";
            }
            return htmlStr;
        };

        var contentRender = function(obj) {
            if (obj.hasOwnProperty('display') && obj.display !== 1) {
                if ((typeof obj.display == 'string' && eval(obj.display) != true) || (typeof obj.display == 'undefined') ||
                    (obj.display == 0)) return '';
            }
            var htmlStr = "";
            var type = obj.type;
            var connector = obj.connector || " - ";
            switch (type) {
                case "title":
                    if (sectionFlag == true) {
                        //section end
                        htmlStr += "</div>";
                    }
                    //section start
                    sectionFlag = true;
                    htmlStr += "<div class=\"section-container\">";

                    htmlStr += "<div class=\"title-container\">";
                    if ( !! obj.title) {
                        htmlStr += "<h5 class=\"title title-title\">" + obj.title + "</h5>";
                        if ( !! obj.content) {
                            htmlStr += "<p>" + obj.content + "</p>";
                        }
                    } else {
                        htmlStr += "<h5 class=\"title title-title\">" + obj.content + "</h5>";
                    }
                    break;
                case "title2":
                    htmlStr += "<div class=\"title-container\">";
                    htmlStr += "<h5 class=\"title title-title2\">" + obj.content + "</h5>";
                    break;
                case "name":
                    if (index >= 2) {
                        var level = index;
                        htmlStr += "<div class=\"name-container" + level + "\">";
                        htmlStr += "<h5 class=\"title name-title" + level + "\">" + obj.title + "</h5>";
                        htmlStr += "<span class=\"connector\">" + connector + "</span>";
                        htmlStr += "<span>" + (obj.content ? obj.content : '') + "</span>";

                    } else {
                        htmlStr += "<div class=\"name-container\">";
                        htmlStr += "<h5 class=\"title name-title\"><span class=\"name-text\">" + obj.title + "</span><span class=\"help-arrow\">arrow</span></h5>";
                        htmlStr += "<div class=\"nd\"><p>" + (obj.content ? obj.content : '') + "</p>";
                    }

                    break;
                case "paragraph":
                    htmlStr += "<div class=\"paragraph-container\">";

                    if (obj.title) {
                        htmlStr += "<h5 class=\"title paragraph-title\">" + obj.title + "</h5>";
                    }

                    htmlStr += "<p class=\"paragraph\">" + obj.content + "</p>";
                    break;
                case "step":
                case "note":
                    htmlStr += "<div class=\"note-container\">";
                    htmlStr += "<h5 class=\"title note-title\">" + obj.title + "</h5>";
                    htmlStr += "<ol class=\"note\">";
                    $(obj.content).each(function(index, note) {
                        if (note === undefined) {
                            return;
                        }
                        if (typeof note === 'string') {
                            htmlStr += "<li>" + note + "</li>";
                        } else {
                            htmlStr += "<li>" + contentRender(note) + "</li>";
                        }
                    });
                    htmlStr += "</ol>";
                    break;

            }

            if (obj.children) {
                index++;
                htmlStr += "<div class=\"container sub-container  sub-container-" + index + "\">";
                $(obj.children).each(function(index, child) {
                    htmlStr += contentRender(child);
                });
                htmlStr += "</div>";
                index--;
            }
            if (obj.type == 'name' && index == 1) {
                htmlStr += "</div>";
            }
            htmlStr += "</div>";
            return htmlStr;
        };

        var contentObj;
        if ( !! $.helpContent[name]) {
            contentObj = $.helpContent[name];
        } else {
            name += $.sysMode.toUpperCase();
            contentObj = $.helpContent[name];
        }
        var htmlStr = "";
        htmlStr = render(contentObj);
        var content = $("div.help-content");
        content.html($(htmlStr));

        $('div.name-container h5.name-title').each(function() {
            var self = $(this);
            $(this).parent().on('click.help', function() {
                var tempDiv = self.next('div');
                var tempSpan = self.find('span');
                if (tempDiv.hasClass('nd')) {
                    self.addClass('h5-opened');
                    tempDiv.slideDown('fast', function() {
                        tempDiv.removeClass('nd');

                    });
                } else {
                    self.removeClass('h5-opened');
                    tempDiv.slideUp('fast', function() {
                        tempDiv.addClass('nd');
                    });
                }
            });
        });

        //            wrap.scrollTop(0);
    },

    /**
     * use to show/hide a section or some items of help
     * @param display {boolean} true for show, false for hide
     * @param sectionIndex {number} start from 0
     * @param itemIndex {number or array} index in a section, start from 0.
     */
    displayHelp: function(display, sectionIndex, itemIndex) {
        if (typeof sectionIndex !== 'number') {
            return;
        }
        //addHelp is executed after init. put this in setTimeout to ensure it is executed after addHelp.
        setTimeout(function() {
            var content = $("div.help-content");
            var section = content.find('.section-container:eq('+ sectionIndex + ')');
            if (itemIndex) {
                if (!$.isArray(itemIndex)) {
                    itemIndex = [itemIndex];
                }

                for (var i = 0, len = itemIndex.length; i < len; i++) {
                    if (typeof  itemIndex[i] !== 'number') {
                        continue;
                    }
                    //nth-child is start from 1
                    var item = section.find(':nth-child(' +  (itemIndex[i] + 1) + ')');
                    if (display === true) {
                        item.show();
                    } else {
                        item.hide();
                    }
                }
            } else {
                //no itemIndex, display the whole section
                if (display === true) {
                    section.show();
                } else {
                    section.hide();
                }
            }
        }, 100);

    },

    pwdIntensityCheck: function(div, val) {
        div.slideDown();
        div.find("span[class^=level]").addClass("ori").removeClass("green yellow red");
        if (!val) {
            return;
        }
        var upperRe = /[A-Z]/;
        var lowerRe = /[a-z]/;
        var digitRe = /\d/;
        var otherRe = /(.[^a-zA-Z0-9])/;

        var hasUpper = 0;
        var hasLower = 0;
        var hasDigit = 0;
        var hasOther = 0;
        var largeLength = 0;

        var level = 0;

        if (upperRe.test(val)) {
            hasUpper = 1;
        } else {
            hasUpper = 0;
        }

        if (lowerRe.test(val)) {
            hasLower = 1;
        } else {
            hasLower = 0;
        }

        if (digitRe.test(val)) {
            hasDigit = 1;
        } else {
            hasDigit = 0;
        }

        if (otherRe.test(val)) {
            hasOther = 1;
        } else {
            hasOther = 0;
        }

        if (val.length > 10) {
            largeLength = 1;
        } else {
            largeLength = 0;
        }

        level = hasUpper + hasLower + hasDigit + largeLength + hasOther;

        if (val.length <= 5) {
            if (level <= 2) {
                div.find("span.level1").addClass("red");
            } else if (level == 3 || level == 4) {
                div.find("span.level2").addClass("yellow");
            }
        } else {
            if (level <= 1) {
                div.find("span.level1").addClass("red");
            } else if (level == 2 || level == 3) {
                div.find("span.level2").addClass("yellow");
            } else if (level >= 4) {
                div.find("span.level3").addClass("green");
            }
        }
    },

    isValidGLUIP6Addr: function(ip6Addr) {
        var flag;
        var regExp = /^(:|[a-f]|[A-F]|[0-9]){1,39}$/;
        if (regExp.test(ip6Addr)) {
            flag = true;
        } else {
            flag = false;
        }

        regExp = /::/;
        if (flag) {
            if (regExp.test(ip6Addr)) {
                regExp = /^([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*$/;
                if (regExp.test(ip6Addr)) {
                    flag = false;
                } else {
                    var index = ip6Addr.indexOf("::");
                    var len = ip6Addr.length;
                    var substr1 = ip6Addr.substr(0, index);
                    var substr2 = ip6Addr.substr(index + 2, len - index - 2);
                    regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){0,6}([a-f]|[A-F]|[0-9]){1,4}$/;
                    var num = 0;

                    if ("" == substr1 && "" == substr2) {
                        return true;
                    } else if ("" == substr2) {
                        if (!regExp.test(substr1)) {
                            flag = false;
                        }
                    } else if ("" == substr1) {

                        if (!regExp.test(substr2)) {
                            flag = false;
                        }
                    } else if (!regExp.test(substr1) || !regExp.test(substr2)) {
                        flag = false;
                    } else if (regExp.test(substr1) && regExp.test(substr2)) {
                        for (var i = 0; i < substr1.length; i++) {
                            if (substr1.charAt(i) == ":") {
                                num += 1;
                            }
                        }

                        for (var i = 0; i < substr2.length; i++) {
                            if (substr1.charAt(i) == ":") {
                                num += 1;
                            }
                        }

                        if (num > 5) {
                            flag = false;
                        }
                    }
                }
            } else {
                regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){7}([a-f]|[A-F]|[0-9]){1,4}$/;
                if (!regExp.test(ip6Addr)) {
                    flag = false;
                }
            }
        }

        if (flag) {
            var index;
            index = ip6Addr.indexOf(":");
            var substr = ip6Addr.substr(0, index);
            if (0 == index || parseInt(substr, 16) == 0) {
                regExp = /^((0{0,4})|::|:)*$/;
                if (regExp.test(ip6Addr)) {
                    flag = false;
                }

                regExp = /^(((0){0,4})|::|:)*((0){0,3}(1))$/;
                if (regExp.test(ip6Addr)) {
                    flag = false;
                }
            } else if (parseInt(substr, 16) >= 65280) {
                flag = false;
            } else if (parseInt(substr, 16) >= 65152 && parseInt(substr, 16) <= 65215) {
                flag = true;
            } else {
                if (parseInt(substr, 16) >= 8192 && parseInt(substr, 16) <= 16383) {
                    flag = true;
                }
            }
        }

        return flag;
    },
    isValidGLUIP6AddrStrict: function(ip6Addr) {
        var flag;
        var regExp = /^(:|[a-f]|[A-F]|[0-9]){1,39}$/;
        if (regExp.test(ip6Addr)) {
            flag = true;
        } else {
            flag = false;
        }

        regExp = /::/;
        if (flag) {
            if (regExp.test(ip6Addr)) {
                regExp = /^([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*$/;
                if (regExp.test(ip6Addr)) {
                    flag = false;
                } else {
                    var index = ip6Addr.indexOf("::");
                    var len = ip6Addr.length;
                    var substr1 = ip6Addr.substr(0, index);
                    var substr2 = ip6Addr.substr(index + 2, len - index - 2);
                    regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){0,6}([a-f]|[A-F]|[0-9]){1,4}$/;
                    var num = 0;

                    if ("" == substr1 && "" == substr2) {
                        flag = false;
                    } else if ("" == substr2) {
                        flag = false;
                    } else if ("" == substr1) {
                        if (!regExp.test(substr2)) {
                            flag = false;
                        }
                    } else if (!regExp.test(substr1) || !regExp.test(substr2)) {
                        flag = false;
                    } else if (regExp.test(substr1) && regExp.test(substr2)) {
                        for (var i = 0; i < substr1.length; i++) {
                            if (substr1.charAt(i) == ":") {
                                num += 1;
                            }
                        }

                        for (var i = 0; i < substr2.length; i++) {
                            if (substr1.charAt(i) == ":") {
                                num += 1;
                            }
                        }

                        if (num > 5) {
                            flag = false;
                        }
                    }
                }
            } else {
                regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){7}([a-f]|[A-F]|[0-9]){1,4}$/;
                if (!regExp.test(ip6Addr)) {
                    flag = false;
                }
            }
        }

        if (flag) {
            var index;
            index = ip6Addr.indexOf(":");
            var substr = ip6Addr.substr(0, index);
            if (0 == index || parseInt(substr, 16) == 0) {
                regExp = /^((0{0,4})|::|:)*$/;
                if (regExp.test(ip6Addr)) {
                    flag = false;
                }

                regExp = /^(((0){0,4})|::|:)*((0){0,3}(1))$/;
                if (regExp.test(ip6Addr)) {
                    flag = false;
                }
            } else if (parseInt(substr, 16) >= 65280) {
                flag = false;
            } else if (parseInt(substr, 16) >= 65152 && parseInt(substr, 16) <= 65215) {
                flag = true;
            } else {
                if (parseInt(substr, 16) >= 8192 && parseInt(substr, 16) <= 16383) {
                    flag = true;
                }
            }
        }

        return flag;
    },

    isTimeVaild: function(time) {
        regExp = /^[0-9]{2}:[0-9]{2}$/;
        if (!regExp.test(time)) {
            return false;
        }
        var timePart = time.split(":");
        if (timePart[0] > 23 || timePart[1] > 59) {
            return false;
        }
        return true;
    },

    getDefaultHostname: function() {
        var c;
        var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";
        var i = 0;
        var hostname = "";
        var hostnameLen = 0;

        for (i = 0; i < $.model.length; i++) {
            c = $.model.charAt(i);
            if (ch.indexOf(c) == -1) {
                if (hostnameLen == 0 || (hostnameLen > 0 && hostname.charAt(hostnameLen - 1) == "_"))
                    continue;
                else {
                    hostname += "_";
                    hostnameLen++;
                }
            } else {
                hostname += c;
                hostnameLen++;
            }
        }

        return ((hostnameLen > 0 && hostname.charAt(hostnameLen - 1) == "_") ? hostname.substr(0, hostnameLen - 1) : hostname);
    },

    trans: function(obj) {
        var elems = ["input", "option", "span", "td", "th", "b", "p", "label", "h3", "h5", "button", "a"];
        var strs = $.curPage ? n_str[$.curPage.match(/(\w+)\.htm$/)[1]] : [];
        for (var i in strs) {
            if (obj.prop('id') == i) {
                $.chgElem(obj.get(0), strs[i]);
            } else {
                $.chgElem(obj.find('#' + i).get(0), strs[i]);
            }
        }

        $.each(elems, function() {
            if (obj.is('' + this)) {
                var tag;
                tag = obj.prop('class').match(/\bT_(\w+)\b/);
                if (tag && tag[1]) {
                    if (s_str[tag[1]] !== undefined) {
                        $.chgElem(obj.get(0), s_str[tag[1]]);
                    } else if (m_str[tag[1]] !== undefined) {
                        $.chgElem(obj.get(0), m_str[tag[1]]);
                    } else if (strs[tag[1]] !== undefined) {
                        $.chgElem(obj.get(0), strs[tag[1]]);
                    }
                }
            }
            $.each(obj.find('' + this), function() {
                var tag;
                tag = $(this).prop('class').match(/\bT_(\w+)\b/);
                if (tag && tag[1]) {
                    if (s_str[tag[1]] !== undefined) {
                        $.chgElem($(this).get(0), s_str[tag[1]]);
                    } else if (m_str[tag[1]] !== undefined) {
                        $.chgElem($(this).get(0), m_str[tag[1]]);
                    } else if (strs[tag[1]] !== undefined) {
                        $.chgElem($(this).get(0), strs[tag[1]]);
                    }
                }
            });
        });
    },

    randomId: function(type) {
        return type + "-" + parseInt(Math.random() * 1000 * 1000 * 1000 * 10, 10).toString();
    },

    setCentralPosition: function(me) {
        var me = me || this;

        var posX = parseInt(($(window).width() - me.width()) / 2, 10);
        var posY = parseInt(($(window).height() - me.height()) / 2, 10);

        me.css({
            left: posX,
            top: posY
        });

        return {
            x: posX,
            y: posY
        }
    },

    setFixedCentral: function(me) {
        var me = me || this;

        var posX = parseInt(($(window).width() - me.width()) / 2, 10);
        var posY = parseInt(($(window).height() - me.height()) / 2, 10);

        me.css({
            left: posX,
            top: posY,
            bottom: "auto",
            right: "auto",
            position: "fixed"
        });

        var changeSize = function() {
            posX = parseInt(($(window).width() - me.width()) / 2, 10);
            posY = parseInt(($(window).height() - me.height()) / 2, 10);

            me.css({
                left: posX,
                top: posY
            });
        };

        $(window).off("resize.setfixed");
        $("body#mainBody").off("resize.setfixed");
        $(window).on("resize.setfixed", changeSize);
        $("body#mainBody").on("resize.setfixed", changeSize);
    },

    showCover: function(name) {
        if ($.isMobileFlag) return;
        if ($.su && $.su.mask) {
            $.su.mask.show(name);
        } else {
            var mask = $('div.mask#mask');
            !!mask.length || (mask = $('<div id="mask" class="mask"><div id="cover-loading"></div></div>').appendTo($('body#mainBody')));
            mask.show();
        }

    },

    hideCover: function(name) {
        if ($.isMobileFlag) return;
        if ($.su && $.su.mask) {
            $.su.mask.hide(name);
        } else {
            var mask = $('div.mask#mask');
            !!mask.length && mask.hide();
        }
    },

    showWaiting: function() {
        var detBox = $("#cover-loading"),
            width = 0,
            height = 0,
            con = $("#mask"),
            docWidth = document.documentElement.clientWidth,
            docHeight = document.documentElement.clientHeight;

        detBox.css("display", "block");
        var width = detBox.get(0).offsetWidth;
        var height = detBox.get(0).offsetHeight;
        var marginX = docWidth > width ? -(width / 2) : 0;
        var marginY = docHeight > height ? -(height / 2) : 0;
        var left = marginX == 0 ? 0 : '50%';
        var top = marginY == 0 ? 0 : '50%';
        detBox.css({
            left: left,
            top: top
        });
    },

    /**
     * The base implementation of `_.indexOf` without support for binary searches
     * or `fromIndex` constraints.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     */
    baseIndexOf: function(array, value, fromIndex) {
        var index = (fromIndex || 0) - 1,
            length = array ? array.length : 0;

        while (++index < length) {
            if (array[index] === value) {
                return index;
            }
        }
        return -1;
    },

    errorTip: function(id, content) {
        var str;
        var errno = content;
        if ($.isNumeric(errno)) {
            if (e_str[errno]) {
                str = e_str[errno];
            } else {
                str = e_str[ERR_UNKOWN];
            }
        } else {
            str = content;
        }
        //        str += '&nbsp;<i>' + s_str.clickhide + '</i>';
        $('#' + id + '_tips').showCold('fast');
        $('#' + id + '_tips_content').html(str);
    },

    isMobile: function() {
        if (!("WEB_INCLUDE_MOBILE_UI" in window && window["WEB_INCLUDE_MOBILE_UI"] == 1)) {
            return false;
        }
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        $.isMobileFlag = check && (document.cookie.search('UserChange=true') === -1);
        return check;
    },

    alert: function() {
        if ($.isMobileFlag) {
            return $.alertMobile(arguments)
        } else {
            return $.alertPC.apply($, arguments);
        }
    },

    alertAsnyc: function() {
        if ($.isMobileFlag) {
            return $.alertMobile(arguments);
        } else {
            return $.alertPC.apply($, arguments);
        }
    },

    toastGlobal: function(options) {
        options = $.extend({}, options);
        options.className = options.className || '';
        options.text = options.text || '';

        var html = '<div id="global-toast-container">' +
            '<div class="global-toast-wrapper">' +
            '<div class="shadow-top-left"></div>' +
            '<div class="shadow-top"></div>' +
            '<div class="shadow-top-right"></div>' +
            '<div class="shadow-left">' +
            '<div class="shadow-right">' +
            '<div class="global-toast-inner">' +
            '<span id="global-toast-text"></span><span class="icon-close"></span> </span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="shadow-bot-left"></div>' +
            '<div class="shadow-bot"></div>' +
            '<div class="shadow-bot-right"></div>' +
            '</div>' +
            '</div>';
        var toast_container = $('#global-toast-container').length > 0 ? $('#global-toast-container') : $(html).appendTo('body');
        toast_container.removeClass().fadeInCold(400);
        if (options.className) {
            toast_container.addClass(options.className);
        }
        $('#global-toast-text').html(options.text);
        $('#global-toast-container .icon-close').off('click').on('click', function() {
            $('#global-toast-container').fadeOutCold(400);
            if ($.isFunction(options.callback_close)) {
                options.callback_close.call(window);
            }
        });
    },

    Base64Encoding: function(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = $.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    },

    utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    /*****************cloud common function**************************/
    setIframeSrc: function(module) {
        if (module) {
            var url = $.cloudOrigin + "/cloud_ui_newVI/pages/device/index.html?module=" + module + "&_=" + (new Date()).getTime();
            $("#cloud-login").attr("src", url);
            $.setWaitingEvent("ev_watingTimeout");
        }
    },

    getToken: function(module, updateFlag, cgi) {
        var getHttpObject = function(hook) {
            var xmlHttp = null;
            try {
                xmlHttp = new XMLHttpRequest();
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        /* How to handle this error? */
                    }
                }
            }
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                    if (hook)
                        hook();
                }
            };
            return xmlHttp;
        };
        var xmlHttpObj = getHttpObject(function() {
            if (xmlHttpObj.status == 200) {
                eval(xmlHttpObj.responseText);
                $.token = Token;
                $.cloudOrigin = EwebURL;
                if (!$.token) {
                    $(window).trigger("ev_watingTimeout");
                } else {
                    $.setIframeSrc(module);
                }
            } else {
                window.location.reload();
            }

        });

        xmlHttpObj.open("POST", window.location.protocol + "//" + window.location.host + "/cgi/getTokenc", true);
        xmlHttpObj.setRequestHeader("TokenID", $.tokenid || 0);

        xmlHttpObj.send(null);
    },

    postToken: function() {
        var param = {};
        param.token = $.token;
        param.eType = "ev_token";
        var str = JSON.stringify(param);
        window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, $.cloudOrigin);
    },

    //获取dut的deviceinfo发给云
    getDeviceInfo: function(hasStok) {
        $.cloud = $.cloud || {};
        var params = {};

        if ($.act) {
            var userObj = $.act(ACT_GET, CURRENT_USER);
            $.exe();
            if (userObj.userSetting == 2) {
                //此时是云登录，将用户名和role发给云端
                params.cloudUserName = userObj.userName;
                //在云端，0表示owner用户，1表示普通股用户。在本地，1表示owner用户，2表示普通用户
                if (userObj.userRole == 1) {
                    params.role = 0;
                } else if (userObj.userRole == 2) {
                    params.role = 1;
                }
            }
            params.model = $.model;
        }
        params.eType = "ev_deviceInfo";
        params.windowHeight = $(window).height() - 90; //window's height - headHeight
        params.windowWidth = $(window).width(); //window's width
        params.iframeTop = $("#cloud-login").offset().top //iframe top
        var str = JSON.stringify(params);
        window.frames["cloud-login"].postMessage(str, $.cloudOrigin);
    },

    iframeResize: function(iframeObj, height) {
        iframeObj.css({
            "height": height + 20
        });
        $.removeLoading();
    },

    waitingId: false,
    waitingTime: 10 * 1000,

    //after waitingTime, obj will trigger an event(eType),
    //paramas obj & watingTime is optional, the default obj is $(window), and the defalut watingTime is 10s
    //be careful to use this function!!! only one global watingID!!!
    setWaitingEvent: function(eType, obj, waitingTime) {
        $.waitingId = false;
        var time = waitingTime || $.waitingTime;
        var me = obj || window;
        me = me.jquery ? me : $(me);
        $.waitingId = setTimeout(function() {
            me.trigger(eType);
        }, time);
        return true; // setWaiting success
    },

    //function to clear waitingEvent
    clearWaitingEvent: function() {
        if ($.waitingId) {
            clearTimeout($.waitingId);
            $.waitingId = false;
        }
    },

    doInternetDiag: function(callCon, CallDis) {
        var diagTool = $.act(ACT_GET, DIAG_TOOL, null, null, ["LastResult"]);
        $.exe(function(err) {
            if (err) {
                return;
            }
            $.act(ACT_OP, ACT_OP_DIAG_DNSDIAG, diagTool.__stack);
            $.exe(function(err) {
                if (err) {
                    return;
                }
                setTimeout(function() {
                    diagTool = $.act(ACT_GET, DIAG_TOOL, null, null, ["LastResult"]);
                    $.exe(function() {
                        if (err) {
                            return;
                        }
                        if (diagTool.lastResult == 1) {
                            if (callCon) {
                                callCon();
                            }
                        } else {
                            if (CallDis) {
                                CallDis();
                            }
                        }
                    });
                }, 1000);
            });

        });
    }

    /*****************cloud common function end**************************/
});

(function($) {
    $.fn.divmask = function() {
        $(this).parent().append('<div class="div-mask"> </div>');
    };

    $.fn.unmask = function() {
        $(this).parent().find(".div-mask").remove();
    };
    $.fn.hideCold = function(speed, callback) {
        if ($.isIE) {
            $(this).hide(callback);
        } else {
            $(this).hide(speed, callback)
        }
    };
    $.fn.showCold = function(speed, callback) {
        if ($.isIE) {
            $(this).show(callback);
        } else {
            $(this).show(speed, callback);
    }
    };
    $.fn.fadeInCold = function(speed, callback) {
        if ($.isIE) {
            $(this).show(callback);
        } else {
            $(this).fadeIn(speed, callback);
    }
    };
    $.fn.fadeOutCold = function(speed, callback) {
        if ($.isIE) {
            $(this).hide(callback);
        } else {
            $(this).fadeOut(speed, callback);
        }
    };
})(jQuery);

function initIndex() {
    if ($('div')[0].style.borderRadius === undefined) {
        $.isIE = true;
    }
    $.unloadCover = $.unlock;
    try {
        document.execCommand('BackgroundImageCache', false, true);
    } catch (e) {}

    var newcss = function() {
        var link = $.c("link");
        link.rel = "Stylesheet";
        link.type = "text/css";
        return link;
    };
    var css = newcss();
    if ($.browser.msie) {
        switch (parseInt($.browser.version, 10)) {
            case 8:
            case 9:
            case 10:
                css.href = "./css/ie.file.css";
                break;
            default:
                break;
        }
    }


    $.head.insertBefore(css, $.head.firstChild);

    $.w.onresize = $.resize;

    $.attach(document.documentElement, "keydown", function(e) {
        var key = e.keyCode ? e.keyCode : e.charCode;
        if (key == 116) {
            $.refresh();
            if (document.all) {
                e.keyCode = 0;
                e.returnValue = false;
            } else {
                e.cancelBubble = true;
                e.preventDefault();
            }
        }
    });

    if ($.local)
        $.io($.params, true);

    var infoobj = $.act(ACT_GET, IGD_DEV_INFO, null, null, ["modelName", "description", "X_TP_IsFD"]);
    var ethobj = $.act(ACT_GET, ETH_SWITCH, null, null, ["numberOfVirtualPorts"]);
    var sysmodeobj;
    var routerModeObj;
    if (INCLUDE_WAN_MODE) {
        sysmodeobj = $.act(ACT_GET, SYS_MODE, null, null, ["mode"]);
    }
    if (INCLUDE_ROUTER_MODE) {
        routerModeObj = $.act(ACT_GET, ROUTER_MODE, null, null, null);
    }
    $.act(ACT_CGI, "/cgi/info");

    $.exe();
    if ($.local) {
        infoobj = {
            modelName: "TD-W89741N",
            description: "ADSL+ Router"
        };
        ethobj = {
            numberOfVirtualPorts: 4
        };
        sysmodeobj = {
            mode: "DSL"
        };
    }
    $.model = infoobj.modelName;
    $.desc = infoobj.description;
    $.ports = parseInt(ethobj.numberOfVirtualPorts, 10);

    if (INCLUDE_WAN_MODE)
        $.sysMode = sysmodeobj.mode;
    
    try {
        if ($.model) document.title = $.model;
    } catch (e) {}
    $.isFD = infoobj.X_TP_IsFD;

	if (INCLUDE_ROUTER_MODE) {
        $.routerMode = routerModeObj.mode;
		if ($.routerMode == "AP") {
			$.isFD = 3;
		}
    }
	
    /*preload image*/
    var img = new Image();
    img.src = '/img/loading.gif';
    delete img;

    $.cgi("/cgi/getParm");
    $.ee = ee;
    $.nn = nn;

    $(function() {
        if (typeof Object.getPrototypeOf !== 'function') {
            if (typeof 'test'.__proto__ === 'object') {
                Object.getPrototypeOf = function(object) {
                    return object.__proto__;
                };
            } else {
                Object.getPrototypeOf = function(object) {
                    return object.constructor.prototype;
                };
            }
        }
    });
}
