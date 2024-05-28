(function($) {
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

                inHTML = '';

            inHTML += "<div class=\"msg-wrap\">";
            inHTML += !isProgressBar ? "<a class=\"widget-close msg-close\" href=\"javascript:void(0);\"></a>" : "";
            inHTML += "<div class=\"msg-content-wrap\">";
            if (!!this.title) {
                inHTML += "<h3 class=\"widget-title msg-title\">";
                inHTML += "<span class=\"msg-title-container\">" + "" + "</span>";
                inHTML += "</h3>";
            }
            inHTML += "<div class=\"widget-content msg-content-container\">";
            inHTML += "<div class=\"grid-warning-msg\">";
            inHTML += !isProgressBar ? "<span class=\"icon\"></span>" : "";
            inHTML += "<span class=\"text\"" + (isProgressBar ? "style=\"display:inline;\"" : "") + ">" + this.content + "</span>";
            inHTML += "</div>";
            inHTML += "</div>";
            inHTML += "</div>";
            inHTML += "</div>";

            if (this.type != "progress-bar") {
                inHTML += "<div class=\"msg-btn-container\">";
                inHTML += "<div class=\"msg-btn-wrap\">";
                if (this.type == 'confirm') {
                    inHTML += "<div class=\"button-container in-line\">";
                    inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-no btn-confirm\">"
                    inHTML += "<span>" + this.no + "</span>";
                    inHTML += "</button>";
                    inHTML += "</div>";
                }
                inHTML += "<div class=\"button-container in-line\">";
                inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-ok btn-confirm\">"
                inHTML += "<span>" + this.yes + "</span>";
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
            if (!!this.initialised) return;

            var self = this,

                defaultOps = function(e) {
                    e.preventDefault();
                    $.removeLoading();
                    $.hideCover();
                    this.elem.hide();
                    $('body').off('.tpMsg');
                    this.activeEl && this.activeEl.focus();
                };


            this.elem.on("click.tpMsg", "a.msg-close", function(e) {
                defaultOps.call(self, e);
                !!self.callbackNo && self.callbackNo();

            }).on("click.tpMsg", "button.btn-msg-ok", function(e) {
                defaultOps.call(self, e);
                !!self.callbackOk && self.callbackOk();
            });

            if (this.type == 'confirm') {
                this.elem.on("click.tpMsg", "button.btn-msg-cancel", function(e) {
                    defaultOps.call(self, e);
                }).on("click.tpMsg", "button.btn-msg-no", function(e) {
                    defaultOps.call(self, e);
                    !!self.callbackNo && self.callbackNo();
                });
            }
        },

        _getActiveEl: function() {
            var self = this;
            $('body').on('keydown.tpMsg', function() {
                self.activeEl === undefined && (self.activeEl = document.activeElement);
                return false;
            }).on('mousedown.tpMsg', function() {
                self.activeEl === undefined && (self.activeEl = document.activeElement);
            });

        },

        show: function() {
            this._getActiveEl();
            $.showCover();
            this.elem.show();
        },

        hide: function() {
            $.removeLoading();
            $.hideCover();
            this.elem.hide();
            $('body').off('.tpMsg');
            this.activeEl && this.activeEl.focus();
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

            var str = e_str[errno] || e_str[ERR_UNKOWN];

            for (i = 1; i < l; i++) {
                str = str.replace("$", arguments[i]);
            }

            var $alertContainer = $("div.alert-container"),
                options = {
                    type: 'alert',
                    content: '<strong>' + $.tpLang.m_str.errno + ": " + errno + "</strong><br />" + str,
                    yes: $.tpLang.m_str.ok
                };

            if (!$alertContainer.length) {
                $alertContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $alertContainer.tpMsg(options);
            } else {
                $alertContainer.tpMsg('destroy').tpMsg(options);
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
                    callbackNo: $.isFunction(no) ? no : ''
                };

            if (!$confirmContainer.length) {
                $confirmContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $confirmContainer.tpMsg(options);
            } else {
                $confirmContainer.tpMsg('destroy').tpMsg(options);
            }

            $confirmContainer.tpMsg('show');
        },

        progressBar: function() {
            var str = arguments[0],
                $barContainer = $("div.alert-container"),
                options = {
                    type: 'progress-bar',
                    content: str
                };

            if (!$barContainer.length) {
                $barContainer = $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body#mainBody"));
                $barContainer.tpMsg(options);
            } else {
                $barContainer.tpMsg('destroy').tpMsg(options);
            }

            $barContainer.tpMsg('show');

            return $barContainer;
        }
    });

})(jQuery);
