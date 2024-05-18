/*!
 * jQuery UI Progressbar 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/progressbar/
 */
//原本是jqui上的插件，删除和修改了一些样式类
//增加一个显示当前值div
//供guageMobile调用，也可以单独调用。
var progressbar = $.widget( "tp.progressbar", {
    options: {
        max: 100,
        value: 0,

        change: null,
        complete: null,
//        自动修改进度条的值的函数.这个方法的逻辑来自于lib.js的guage
        auto: function(valueChangeF, args) {
            var step = args[0];
            var interval = args[1];
            var start = args[2];
            var completed = false;
            var count = 0;
            var count_max = 5000/interval;
            $.auto(function(args){
                    var current = args[0];
                    var end = args[1];
                if (!completed) {
                    if (current >= (end / 2)) {
                        if (count++ > count_max) {
                                count = 0;
                                type = "GET";
                                url = "/main/status.htm?_=" + (+new Date());
                                var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
                                xhr.open(type, url, true);
                                xhr.setRequestHeader("Content-Type", "text/plain");
                            xhr.onreadystatechange = function() {
                                    if (xhr.readyState == 4) {
                                        if (xhr.status === 200) {
                                            completed = true;
                                        }
                                    }
                                }
                                xhr.send(null);
                            }
                        }
                } else {
                        $.auto_interval = 5000/step;
                    }
                    var percent = Math.floor(current * 100 / end);
                    valueChangeF(percent);
                    if (current >= end)
                        return false;
//                    current++;
                    args[0]++;
                }, interval, true,[ start ? start : 0, step],null);
        }
    },

    min: 0,
    start: function() {
        var self = this;
        if ($.isFunction(this.options.auto)) {
            this.options.auto(function(val) {
                self.value(val);
            }, arguments);
        }
    },
    _create: function() {
        // Constrain initial value
        this.oldValue = this.options.value = this._constrainedValue();

        this.element
            .addClass( "ui-progressbar" )
            .attr({
                // Only set static values, aria-valuenow and aria-valuemax are
                // set inside _refreshValue()
                role: "progressbar",
                "aria-valuemin": this.min
            });

        this.valueDiv = $( "<div class='ui-progressbar-value'></div>" )
            .appendTo( this.element );

        this.valueText = $("<div class='ui-progressbar-valueText'>")
            .appendTo ( this.element);

        this._refreshValue();
    },

    _destroy: function() {
        this.element
            .removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
            .removeAttr( "role" )
            .removeAttr( "aria-valuemin" )
            .removeAttr( "aria-valuemax" )
            .removeAttr( "aria-valuenow" );

        this.valueDiv.remove();
    },

    value: function( newValue ) {
        if ( newValue === undefined ) {
            return this.options.value;
        }

        this.options.value = this._constrainedValue( newValue );
        this._refreshValue();
    },

    _constrainedValue: function( newValue ) {
        if ( newValue === undefined ) {
            newValue = this.options.value;
        }

        this.indeterminate = newValue === false;

        // sanitize value
        if ( typeof newValue !== "number" ) {
            newValue = 0;
        }

        return this.indeterminate ? false :
            Math.min( this.options.max, Math.max( this.min, newValue ) );
    },

    _setOptions: function( options ) {
        // Ensure "value" option is set after other values (like max)
        var value = options.value;
        delete options.value;

        this._super( options );

        this.options.value = this._constrainedValue( value );
        this._refreshValue();
    },

    _setOption: function( key, value ) {
        if ( key === "max" ) {
            // Don't allow a max less than min
            value = Math.max( this.min, value );
        }
        if ( key === "disabled" ) {
            this.element
                .toggleClass( "ui-state-disabled", !!value )
                .attr( "aria-disabled", value );
        }
        this._super( key, value );
    },

    _percentage: function() {
        return this.indeterminate ? 100 : 100 * ( this.options.value - this.min ) / ( this.options.max - this.min );
    },



    _refreshValue: function() {
        var value = this.options.value,
            percentage = this._percentage();

        this.valueDiv
            .toggle( this.indeterminate || value > this.min )
//            .toggleClass( "ui-corner-right", value === this.options.max )
            .width( percentage.toFixed(0) + "%" );

        this.element.toggleClass( "ui-progressbar-indeterminate", this.indeterminate );

        if ( this.indeterminate ) {
            this.element.removeAttr( "aria-valuenow" );
            if ( !this.overlayDiv ) {
                this.overlayDiv = $( "<div class='ui-progressbar-overlay'></div>" ).appendTo( this.valueDiv );
            }
        } else {
            this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": value
            });
            if ( this.overlayDiv ) {
                this.overlayDiv.remove();
                this.overlayDiv = null;
            }
        }

        if ( this.oldValue !== value ) {
            this.oldValue = value;
            this._trigger( "change" );
        }
        if ( value === this.options.max ) {
            this._trigger( "complete" );
        }
        this._refreshValueText();
    },

    _refreshValueText: function() {
        var left;
        this.valueText
            .html(this.options.value + '%')
            .css({
                left: (left = this.valueDiv.width() - this.valueText.width()) < 0 ? 0 : left
            });
    }

});

$.widget("tp.tpDialog", {
    options: {
//     经过duration ms后自动消失，否则-调用this.element.trigger('disappear.tpDialog')消失
        autoHide: true,
//        点击屏幕消失
        clickToHide: true,
        duration: 3000,
        appendTo: "body",
//        遮罩
        modal: true,
//        遮罩是否透明
        transparent: false,
//        dialog消失时回调的函数
        hook: null

    },

    _create: function() {
        this.element.show()
            .appendTo(this._appendTo());
        $.setCentralPosition(this.element);

        var self = this;
        if (this.options.autoHide === true) {
            this.autoDisappear = setTimeout(function() {
                self.close();
            }, this.options.duration);
        }  else {
            this.element.bind('close.tpDialog', function() {
                self.close();
            })
        }

        this._createOverlay();

    },

    close: function() {
        var self = this;
        if ($.isFunction(this.options.hook)) {
            this.options.hook();
        }
        this.element.fadeOut(50, function() {
            self.element.remove();
            self._destroyOverlay();
        });
    },

    _destroy: function() {
        this.close();
    },
    _appendTo: function() {
        var element = this.options.appendTo;
        if ( element && (element.jquery || element.nodeType) ) {
            return $( element );
        }
        return this.document.find( element || "body" ).eq( 0 );
    },

    _createOverlay: function() {
        if (!this.options.modal && !this.options.clickToHide) {
            return;
        }
        var self = this;
//        this.mask = $('.msg-mask').length > 0 ? $('.msg-mask') : ($('<div class="msg-mask"></div>').appendTo(this._appendTo()));
        this.mask = $('<div class="msg-mask"></div>').appendTo(this._appendTo());

        if (this.options.transparent || !this.options.modal) {
            this.mask.addClass('transparent');

        } else {
            this.mask.removeClass('transparent');
        }

        this.mask.unbind('.tpDialog');
        if (this.options.clickToHide) {
            this.mask.bind('click.tpDialog', function() {
               self.close();
            });
            this.element.bind('click.tpDialog', function() {
                self.close();
            });
        }
        this.mask.show();
    },

    _destroyOverlay: function() {
        if (this.mask) {
            this.mask.remove();
        }
    }
});


jQuery.extend({

//    显示警告或错误信息。显示后用户点击屏幕才会消失。
//    传入参数长度任意，参数依次是错误码（或这届文本信息），替换信息1，替换信息2,替换信息3...
//    最后一个参数是true，表示不弹框直接返回错误码，为false，表示不弹框返回错误信息的内容
    alertMobile: function(args) {
        var errCode;
//        如果args是数组，则该方法是被$.alert调用的，args是$.alert的arguments
        if (isNaN(args) && typeof  args != 'string') {
            errCode = args[0];
            if ( args[args.length - 1] === true) {
                return errCode;
            }
        } else {
            errCode = args;
        }
        $.stopWaitingMobile();

        var html = '';
        html += '<div class="msg">';
            html += '<div class="msg-container toast">';
        html += '<span class="sprite d-status-failed"></span>';
        html += '<p class="msg-content"></p>';
        html += '</div>';
        html += '</div>';

        var node = $(html);


        var l = args.length;
        var msg;
//        如果最后一位是false，则false不用于替换，该位指明最后返回的是替换$后的信息，该方法用于兼容voice.js大量用alert报错
        if (args[l - 1] === false) {
            l--;
        }
//        如果是数字,取出str，替换里面的$
        if (!isNaN(errCode)) {
            if (e_str[errCode]) {
                msg = e_str[errCode];
                for (var i = 1; i < l; i++) {
                    msg = msg.replace("$", args[i]);
                }
            } else {
                msg = e_str[ERR_UNKOWN];
            }
        } else {
            msg = errCode;
        }
//不弹框，返回替换后的信息
        if (args[l] === false) {
            return msg;
        }
        node.find('.msg-content').text(msg);

        node.tpDialog({
            autoHide:false,
            clickToHide: true,
            modal:false
        });

        return errCode;
    },

//    add waiting icon and some message behind a button
    buttonWaiting: function(button, options) {
        if (button && typeof button === 'string') {
            if (button.search('#') < 0 && button.search('.')) {
                button = '#' + button;
            }
            button = $(button);
        }
        options = $.extend({}, options);

        var msgContainer = button.next('.button-waiting-container').length > 0 ? button.next('.button-waiting-container') : $('<div class="button-waiting-container"><span class="icon-waiting"></span><span class="button-waiting-msg"></span></div>').insertAfter(button);
        if (options.stop) {
            msgContainer.hide();
            return;
        }
        var msg = options.msg || '';
        msgContainer.show().find('.button-waiting-msg').html(msg);
    },
//toastMobile显示信息后会自动消失，iconHide为true时，隐藏icon图标
    toastMobile: function(msg, duration, iconHide) {
        $.stopWaitingMobile();
        var toast = $('body').data('toastMobile');
        if (toast) {
            return;
        }
        var html = '';
        html += '<div class="msg">';
        html += '<div class="msg-container toast">';
        if (!iconHide) {
            html += '<span class="sprite d-status-successful"></span>';
        }
        html += '<p class="msg-content"></p>';
        html += '</div>';
        html += '</div>';

        var node = $(html);

        node.find('.msg-content').text(msg);
        $('body').data('toastMobile', node);
        node.tpDialog({
            autoHide:true,
            clickToHide: true,
            modal:false,
            duration: duration ? duration :3000,
            hook: function() {
                $('body').removeData('toastMobile');
            }
        });
    },
//参数依次是，显示文本，ok回调函数，no回调函数，替代str中的$的字符串，ok按钮的文本，取消按钮的文本
    confirmMobile: function(str, callbackOk, callbackNo, replaceStr, okStr, cancelStr) {
        var html = '';
        html += '<div class="msg">';
        html += '<div class="msg-container confirm" id="confirm">';
        html += '<div class="msg-contentBox">';
        html += '<span class="sprite d-alert"></span>';
        html += '<p class="msg-content"></p>';
        html += '</div>';
        html += '<div class="msg-buttonBox">';
        html += '<ul>'
        html += '<li><a href="#" class="msg-buttonBox-l" id="confirm-ok"></a></li>';
        html += '<li><a href="#" class="msg-buttonBox-r" id="confirm-cancel"></a></li>';
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        var node = $(html);

        if (replaceStr !== undefined) {
            str = str.replace('$', replaceStr);
        }
//        设置显示的文本
        node.find('.msg-content').text(str);
//设置按钮的文本
        var okBtn = node.find('#confirm-ok');
        var cancelBtn = node.find('#confirm-cancel');
        if (okStr !== undefined) {
            okBtn.html(okStr);
        } else {
            okBtn.html($.tpLang.m_str.yes);
        }

        if (cancelStr !== undefined) {
            cancelBtn.html(cancelStr);
        } else {
            cancelBtn.html($.tpLang.m_str.no);
        }

        node.tpDialog({
            autoHide:false,
            clickToHide: false,
            modal:true
        });

        okBtn.on('click.ok', function(evt) {
            evt.preventDefault();
            node.trigger('close.tpDialog');
            if ($.isFunction(callbackOk)) {
                callbackOk();
            }
        });

        cancelBtn.on('click.cancel', function(evt) {
            evt.preventDefault();
            node.trigger('close.tpDialog');
            if ($.isFunction(callbackNo)) {
                callbackNo();
            }
        });
    },
//    在页面上显示waiting.如果设置duration，会自动消失，否则需要调用stopWaitingMobile才停止
    startWaitingMobile: function(str, duration, options) {
//        查看是否有waiting实例，有就返回
        var options = $.extend({}, options);
        var waiting = $('body').data('waitingMobile');
        if (waiting) {
            return;
        }
        $('body').data('waitingMobile', true);

        var html = '';
        html += '<div class="msg waiting">';
        html += '<div class="msg-container toast" >';
        html += '<span class="icon-bigWaiting"></span>';
        html += '<p class="msg-content"></p>';
        html += '</div>';
        html += '</div>';
        var node = $(html);
        var msg = str ? str : $.tpLang.m_str.waiting;
        node.find('.msg-content').text(msg);

            node.tpDialog({
            autoHide: duration && !isNaN(duration) ? true : false,
                duration: duration,
            clickToHide: options.clickToHide  === true ? true : false,
            modal: options.modal === false ? false : true,
            transparent: options.transparent === false ? false : true,
                hook: function() {
                    $('body').removeData('waitingMobile');
                }
            });

        $('body').data('waitingMobile', node);

    },

//关闭页面上的waiting
    stopWaitingMobile: function() {
        //        查看是否有waiting实例，没有就返回
        var waiting = $('.msg.waiting');
        if (!waiting) {
            return;
        }
        waiting.trigger('close.tpDialog');
    },

//    用法和lib.js中的guage一致。参数依次是，显示的文本，总步数，每步时间间隔，完成时的回调，开始时的步数
    guageMobile: function(strs, step, interval, hook, start) {
        var html = '';
        html += '<div class="msg msg-container msg-progressbar">';
        html += '<p class="msg-content"></p>';
        html += '<div class="progressbar"></div>';
        html += '</div>';

        var node = $(html);
        node.find('.msg-content').html(strs)
        var pb = node.find('.progressbar').progressbar({
            complete: function() {
                node.trigger('close.tpDialog');
                if (hook) {
                    hook();
                }
            }
        });

        node.tpDialog({
            autoHide:false,
            clickToHide: false,
            modal:true

        });
        node.find('.progressbar').progressbar('start',step, interval, start);
    }
});