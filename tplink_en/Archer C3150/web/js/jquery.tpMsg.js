﻿(function($) {
    'use strict';

    function TpMsg(elem, options) {
        this.type = options.type;
        this.title = options.title;
        this.initialised = false;
        this.elem = $(elem);
        this.content = options.content || '';
        this.yes = options.yes || '';
        this.no = options.no || '';
        this.callbackOk = options.callbackOk || '';
        this.callbackNo = options.callbackNo || '';
    }

    TpMsg.prototype = {
        constructor: TpMsg,

        init: function() {
            var isProgressBar = (this.type == "progress-bar"),
                isComplexMsg = (this.type == "complex-msg"),
                isSuccess = (this.type == "toast-success"),
                isFail = (this.type == "toast-fail"),
                inHTML = '';

            inHTML += "<div class=\"msg-wrap\">";
            inHTML += !isProgressBar ? "<a class=\"widget-close msg-close\" href=\"javascript:void(0);\"></a>" : "";
            inHTML += "<div class=\"msg-content-wrap\">";
            if ( !! this.title) {
                inHTML += "<h3 class=\"widget-title msg-title\">";
                inHTML += "<span class=\"msg-title-container\">" + this.title + "</span>";
                inHTML += "</h3>";
            }
            inHTML += "<div class=\"widget-content msg-content-container\">";

            if (!isComplexMsg) {
                inHTML += "<div class=\"grid-warning-msg\">";
                inHTML += (!isProgressBar) ? ("<span class=\"icon " + (isSuccess ? "icon-success" : (isFail ? "icon-fail" : "")) + "\"></span>") : "";
                inHTML += "<span class=\"text\"" + (isProgressBar ? "style=\"display:inline;\"" : "") + ">" + this.content + "</span>";
                inHTML += "</div>";
            } else {
                inHTML += "<div id=\"complexMsg\"></div>";
            }

            inHTML += "</div>";
            inHTML += "</div>";
            inHTML += "</div>";

            if (this.type != "progress-bar" && !isComplexMsg) {
                inHTML += "<div class=\"msg-btn-container\">";
                inHTML += "<div class=\"msg-btn-wrap\">";
                if (this.type == 'confirm' || isComplexMsg) {
                    inHTML += "<div class=\"button-container in-line\">";
                    inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-no btn-confirm\">"
                    inHTML += "<span>" + this.no + "</span>";
                    inHTML += "</button>";
                    inHTML += "</div>";
                }
                inHTML += "<div class=\"button-container in-line\">";
                inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-ok btn-confirm\">"
                inHTML += (isSuccess || isFail) ? "<span>" + $.tpLang.m_str.ok + "</span>" : "<span>" + this.yes + "</span>";
                inHTML += "</button>";
                inHTML += "</div>";
                inHTML += "</div>";
                inHTML += "</div>";
            }


            inHTML = '<div class="position-center-right">' + inHTML + '</div>';
            inHTML = '<div class="position-center-left">' + inHTML + '</div>';

            inHTML = '<div class="position-top-right"></div>' + inHTML;
            inHTML = '<div class="position-top-center"></div>' + inHTML;
            inHTML = '<div class="position-top-left"></div>' + inHTML;

            inHTML += '<div class="position-bottom-left"></div>';
            inHTML += '<div class="position-bottom-center"></div>';
            inHTML += '<div class="position-bottom-right"></div>';

            inHTML = '<div class="msg-container-wrapper">' + inHTML + '</div>';

            this.elem.html(inHTML).addClass("widget-container msg-container grid-popup-msg msg-container-center");

            this._attachEvent();

            return this;
        },

        destroy: function() {
            this.initialised = false;
            this.elem.off('.tpMsg').removeData('tpMsg').empty();
            return this;
        },

        _attachEvent: function() {
            if ( !! this.initialised) return;

            var self = this,

                defaultOps = function(e) {
                    e.preventDefault();
                    $.removeLoading();
                    if (this.type != "complex-msg") {
                        $.su.mask.hide('msg', true, this.elem);
                    } else { //complex-msg背后的mask与公共mask不是同一个
                        var tmp = $("div.mask#complex-mask").length == 0 ? $("<div id=\"complex-mask\" class=\"mask\"><div id=\"complex-cover-loading\"></div></div>").appendTo($("body#mainBody")) : $("div.mask#complex-mask");
                        tmp.fadeOut(200, function() {
                            $(this).css("display", "none");
                        })
                    }
                    this.elem.hide();
                    $('body').off('.tpMsg');
                    try {
                        this.activeEl && this.activeEl.focus();
                    } catch (e) {}

                };


            this.elem.on("click.tpMsg", "a.msg-close", function(e) {
                defaultOps.call(self, e); !! self.callbackNo && self.callbackNo();

            }).on("click.tpMsg", "button.btn-msg-ok", function(e) {
                defaultOps.call(self, e); !! self.callbackOk && self.callbackOk();
            });

            if (this.type == 'confirm') {
                this.elem.on("click.tpMsg", "button.btn-msg-cancel", function(e) {
                    defaultOps.call(self, e);
                }).on("click.tpMsg", "button.btn-msg-no", function(e) {
                    defaultOps.call(self, e); !! self.callbackNo && self.callbackNo();
                });
            }
        },

        _getActiveEl: function() {
            var self = this;
            $('body').on('keydown.tpMsg', function() {
                self.activeEl === undefined && (self.activeEl = document.activeElement);
                if (self.type != "complex-msg") {
                    return false;
                }
            }).on('mousedown.tpMsg', function() {
                self.activeEl === undefined && (self.activeEl = document.activeElement);
            });

        },

        show: function() {
            this._getActiveEl();
            if (this.type != "complex-msg") {
                $.su.mask.show('msg', true, this.elem);
            } else { //complex-msg背后的mask与公共mask不是同一个
                var tmp = $("div.mask#complex-mask").length == 0 ? $("<div id=\"complex-mask\" class=\"mask\"><div id=\"complex-cover-loading\"></div></div>").appendTo($("body#mainBody")) : $("div.mask#complex-mask");
                tmp.fadeIn(200, function() {
                    $(this).css("display", "block");
                    if ($.browser.msie) {
                        $(this).css("filter", "alpha(opacity=70)");
                    }
                });
            }
            this.elem.show();
        },

        hide: function() {
            $.removeLoading();
            if (this.type != "complex-msg") {
                $.su.mask.hide('msg');
            } else { //complex-msg背后的mask与公共mask不是同一个
                var tmp = $("div.mask#complex-mask").length == 0 ? $("<div id=\"complex-mask\" class=\"mask\"><div id=\"complex-cover-loading\"></div></div>").appendTo($("body#mainBody")) : $("div.mask#complex-mask");
                tmp.fadeOut(200, function() {
                    $(this).css("display", "none");
                })
            }
            this.elem.hide();
            $('body').off('.tpMsg');
            try {
                this.activeEl && this.activeEl.focus();
            } catch (e) {}

            this.destroy();
        }
    };

    TpMsg.options = {
        type: 'alert',
        yes: $.tpLang.m_str.yes,
        no: $.tpLang.m_str.no
    };

    $.fn.tpMsg = function(option) {
        return this.each(function() {

            var $this = $(this),
                data = $this.data('tpMsg'),
                options = typeof option === 'object' && option;

            options = $.extend(true, {}, TpMsg.options, options);

            if (!data) {
                data = new TpMsg(this, options);
                data.init();
                $this.data('tpMsg', data);
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    $.extend({
        alertPC: function() {
            var errno = arguments[0],
                l = arguments.length,
                i;

            if (arguments[l - 1] === true) return errno;

            var str;
            if (typeof errno === 'string') {
                str = errno
            } else {
                str = e_str[errno] || e_str[ERR_UNKOWN];
            }

            for (i = 1; i < l; i++) {
                str = str.replace("$", arguments[i]);
            }

            var content;
            if (typeof errno === 'string') {
                content = str
            } else {
                content = '<strong>' + $.tpLang.m_str.errno + ": " + errno + "</strong><br />" + str;
            }
            var $alertContainer = $("div.alert-container"),
                options = {
                    type: 'alert',
                    content: content,
                    yes: $.tpLang.m_str.ok
                };

            if (!$alertContainer.length) {
                $alertContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $alertContainer.tpMsg(options);
            } else {
                $alertContainer.tpMsg('destroy').tpMsg(options);
                $alertContainer.removeClass("progress-bar");
            }

            $alertContainer.tpMsg('show');

            return errno;
        },

        alertAsnycPC: function(args) {
            typeof args === 'number' && $.alert.call($, args);
        },

        confirm: function(str, ok, no, replaceStr, okStr, cancelStr) {
            if (replaceStr !== undefined) {
                var str = str.replace('$', replaceStr);
            }

            var $confirmContainer = $("div.alert-container"),
                options = {
                    type: 'confirm',
                    content: str,
                    callbackOk: $.isFunction(ok) ? ok : '',
                    callbackNo: $.isFunction(no) ? no : '',
                    yes: okStr,
                    no: cancelStr
                };

            if (!$confirmContainer.length) {
                $confirmContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $confirmContainer.tpMsg(options);
            } else {
                $confirmContainer.tpMsg('destroy').tpMsg(options);
                $confirmContainer.removeClass("progress-bar");
            }

            $confirmContainer.tpMsg('show');
        },

        complexMsg: function(path, title, ok, no, callbackOk, callbackNo) {
            var $confirmContainer = $("div.alert-container-complex-msg"),
                options = {
                    type: 'complex-msg'
                    /*,
                                            title: title,
                                            ok: ok,
                                            no: no,
                                            callbackOk: callbackOk,
                                            callbackNo: callbackNo*/
                };

            if (!$confirmContainer.length) {
                $confirmContainer = $("<div id=\"complex-msg-container\" class=\"alert-container-complex-msg\"></div>").appendTo($("body#mainBody"));
                $confirmContainer.tpMsg(options);
                $confirmContainer.find('.msg-container-wrapper').addClass('complex-msg');
            } else {
                $confirmContainer.tpMsg('destroy').tpMsg(options);
                $confirmContainer.find('.msg-container-wrapper').addClass('complex-msg');
            }

            $.loadPage("complexMsg", path);

            $confirmContainer.find('div.msg-wrap').css('max-height', $(window).height() - 150);
            $confirmContainer.tpMsg('show');
        },
        toast: function(success, str) {
            if (success == false) {
                if (str == undefined) {
                    var str = $.tpLang.m_str.fail;
                }
            } else {
                if (str == undefined) {
                    var str = $.tpLang.m_str.success;
                }
            }

            var options = {
                type: 'toast' + (success == false ? '-fail' : '-success'),
                content: str
            };
            var $toastContainer = $("div.alert-container");

            if (!$toastContainer.length) {
                $toastContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $toastContainer.tpMsg(options);
            } else {
                $toastContainer.tpMsg('destroy').tpMsg(options);
                $toastContainer.removeClass("progress-bar");
            }

            $toastContainer.tpMsg('show');

            return $toastContainer;
        },

        progressBar: function() {
            var str = arguments[0],
                $barContainer = $("div.alert-container"),
                options = {
                    type: 'progress-bar',
                    content: str
                };

            if (!$barContainer.length) {
                $barContainer = $("<div id=\"alert-container\" class=\"alert-container progress-bar\"></div>").appendTo($("body#mainBody"));
                $barContainer.tpMsg(options);
            } else {
                $barContainer.tpMsg('destroy').tpMsg(options);
                $barContainer.addClass("progress-bar");
            }

            $barContainer.tpMsg('show');

            return $barContainer;
        },
	

        hint: function(text) {
            var $alertContainer = $("div.alert-container"),
                options = {
                    type: 'alert',
                    content: text,
                    yes: $.tpLang.m_str.ok
                };

            if (!$alertContainer.length) {
                $alertContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $alertContainer.tpMsg(options);
            } else {
                $alertContainer.tpMsg('destroy').tpMsg(options);
            }

            $alertContainer.tpMsg('show');
        },
        hideMsg: function() {
            var $barContainer = $("div.alert-container");
            $barContainer.tpMsg('hide');
        },
        prompt: function(successed, text, time) {
            var html = '<div id="global-form-prompt" class="form-prompt" >' +
                '<div class="bg"></div>' +
                '<div class="content">' +
                '<span class="icon"></span>' +
                '<span class="text text-successed"></span>' +
                '<span class="text text-failed"></span>' +
                '</div>' +
                '</div>';

            var $prompt = $('#global-form-prompt');
            if ($prompt.length == 0) {
                $prompt = $(html).appendTo('body');
            }

            if (successed) {
                $prompt.removeClass("failed").addClass("successed");
                text = text || $.tpLang.s_str.saved;
                $prompt.find("span.text-successed").html(text);
            } else {
                $prompt.addClass("failed").removeClass("successed");
                text = text || $.tpLang.ddns_nstr.fail;     //temp
                $prompt.find("span.text-failed").html(text);
            }

            $.setFixedCentral($prompt);
            $prompt.showCold();
            setTimeout(function() {
                $prompt.hideCold();
            }, time || 900);
        }
    });

})(jQuery);
