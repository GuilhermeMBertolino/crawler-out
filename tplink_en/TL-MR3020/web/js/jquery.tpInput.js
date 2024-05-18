/**
 * Created by hewenlin on 2016/5/20.
 * use in login.htm
 * add tpPassword's function on 2016/10/14.
 */
(function($) {
    function tpInput(id, options) {
        this.element = $('#' + id);
        this.options = $.extend({}, tpInput.prototype.options, options);
        this._create(options);
        if ($.isFunction(this._init)) {
            this.init();
        }
    }

    tpInput.prototype = {
        constructor: tpInput,
        options: {
            placeholder: null,
            isPassword: null,
            visible: false,
            classFocus: 'focus',
            classVisible: 'visible',
            classInvisible: 'invisible'
        },
        _create: function() {
            this.id = this.element.attr('id');

            if (this.element.parent('.input-container').length == 0) {
                this.element.wrap('<div class="input-container"></div>');
            }
            this.container = this.element.parent('.input-container');        //全控件的包裹层
            this.element.wrap('<div class="input-wrapper"></div>');  //边框层
            this.wrapper = this.element.parent('.input-wrapper');

            this.hint = $('<label class="input-placeholder" for="' + this.id + '"></label>').appendTo(this.container).css({
                left: this.element.css('paddingLeft'),
                height: this.element.css('height'),
                lineHeight: this.element.css('height')
            }).show();

            this.options.isPassword = (this.options.isPassword !== null ? this.options.isPassword : this.element.is(':password'));
            if (this.options.isPassword) {
                this.container.addClass('tpPassword');
                this.vInput = $('<input type="text">').appendTo(this.wrapper)
                    .attr('maxlength', this.element.attr('maxlength'))
                    .attr('id', this.id + '_v')
                    .prop('disabled', this.element.prop('disabled'))
                    .addClass(this.element.attr('class'))
                    .hide();

                this.visible = this.options.visible || (this.element.attr('data-visible') == "true" ? true : false);
                this._setOption('visible', this.visible);

                this.eyeIcon = $('<span class="icon-eye"></span>').appendTo(this.wrapper);
            }

            this.error = $('<div class="input-err-container">' +
                ' <div class="shadow-top-left"></div>' +
                '<div class="shadow-top"></div>' +
                '<div class="shadow-top-right"></div>' +
                '<div class="shadow-left">' +
                '<div class="shadow-right">' +
                '<span class="input-err-delta"></span><div class="input-err-content"><span class="text"></span></div>' +
                '</div>' +
                '</div>' +
                '<div class="shadow-bot-left"></div>' +
                '<div class="shadow-bot"></div>' +
                '<div class="shadow-bot-right"></div>'+
                '</div>').appendTo(this.container);
                    //添加hint，用于代替placeholder
//            this._setOption('width', this.options.width || this.element.width());

            this.options.placeholder = this.options.placeholder || this.element.attr('placeholder');
            this._setOption('placeholder', this.options.placeholder);

//            var isIE8 = ( navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" );
//            if (isIE8 && this.options.placeholder && this.element.val() == '') {
//                this.hint.show()
//            }
            this._registerHandler();
        },

        _registerHandler: function() {
            var me = this;
//            var isIE8 = ( navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" );

            this.container.on('blur.tpInput', 'input[type=password], input[type=text]', function() {
                me.container.removeClass(me.options.classFocus);
                if (!me.options.isPassword && me.element.val() == '' ||
                    me.options.isPassword && me.visible == false && me.element.val() == '' ||
                    me.options.isPassword && me.visible == true && me.vInput.val() == '') {
                    me.hint.show();
                }
            });


            //获取焦点时，根据输入框当前的值显示相关选项
            this.container.on('focus.tpInput', 'input[type=password], input[type=text]', function() {
                if (!me.container.hasClass('disabled')) {
                    me.container.addClass(me.options.classFocus).removeClass('err');
                    me.hint.hide();
                }
                me.error.hide();
                me.element.trigger('ev_focus');
            });

            if (this.options.isPassword) {
                //当点击眼睛图标时，切换显示隐藏，同步两框的值
                $(this.container).on('click.tpPassword', 'span.icon-eye', function() {
                    if (me.container.hasClass('disabled')) {
                        return;
                    }
                    if (me.visible === true) {
                        me._setOption('visible', false);
                        //set try catch to fixed bug in ie8
                        try {
                            me.element.val(me.vInput.val()).focus();
                        } catch (e) {
                        }
                    } else {
                        me._setOption('visible', true);
                        try {
                            me.vInput.val(me.element.val()).focus();
                        } catch (e) {
                        }
                        me.disabled(me.element.prop('disabled'));
                    }
                });

                //为支持web端直接通过password来获取值，失去焦点时，同步两框值
                $(this.container).on('blur.tpPassword', 'input[type=password], input[type=text]', function() {
                    if(me.visible === true) {
                        me.element.val(me.vInput.val());
                    } else {
                        me.vInput.val(me.element.val());
                    }
                });

                //主要用于适配页面上通过js调用原元素focus
                $(this.element).on('focus.tpPassword', function() {
                    if(me.visible === true) {
                        me.vInput.show().focus();
                    }
                });
                $(this.vInput).on('keydown.tpPassword keyup.tpPassword', function(e) {
                    e.stopPropagation();
                    me.element.trigger(e.type);
                });
            }
        },

        _unregisterHandlers: function() {
            this.element.off('.tpInput .tpPassword');
        },

        _setOption: function(key, value) {
            if(key == 'placeholder') {
                if (value !== null && value !== undefined) {
                    this.hint.text(value);
                }
            } else if (key == 'value') {
                this.val(value);
            } else if (key == 'disabled') {
                this.disabled(value);
            } else if (key == 'visible') {
                if (value == true) {
                    this.visible = true;
                    this.container.addClass(this.options.classVisible).removeClass(this.options.classInvisible);
                    this.vInput.show();
                    this.element.hide();
                    this.hint.attr('for', this.vInput.attr('id'));
                } else {
                    this.visible = false;
                    this.container.addClass(this.options.classInvisible).removeClass(this.options.classVisible);
                    this.vInput.hide();
                    this.element.show();
                    this.hint.attr('for', this.element.attr('id'));
                }
            }
        },

        showError: function(text) {
            this.error.show().find('span.text').text(text);
            this.container.addClass('err');
        },

        hideError: function() {
            this.error.hide();
            this.container.removeClass('err');
        },

        disabled: function(flag) {
            if (flag === true) {
                this.container.addClass('disabled');
            } else {
                this.container.removeClass('disabled');
            }
            this.element.prop('disabled', flag);
            if (this.options.isPassword) {
                this.vInput.prop('disabled', flag);
            }

        },

        val: function(val) {
            if (val !== undefined) {
                this.element.val(val);
                if (this.options.isPassword) {
                    this.vInput.val(val);
                }
            }
            if (this.options.isPassword && this.visible === true) {
                return this.vInput.val();
            } else {
                return this.element.val();
            }
        },

        focus: function() {
            if (this.options.isPassword && this.visible == true) {
                this.vInput.focus();
            } else {
                this.element.focus();
            }
        },
        _destroy: function() {
            this._unregisterHandlers();
            this.error.remove();
            this.hint.remove();
            if (this.options.isPassword) {
                this.vInput.remove();
                this.eyeIcon.remove();
            }
            this.element.unwrap().unwrap();
        }

    };

    $.fn.tpInput = function(options) {
        var arg = arguments;
        var result;
        this.each(function() {
            var input = $(this).data('tpInput');
            if (!input && options != 'destroy') {
                var instance = new tpInput(this.id,  options);
                $(this).data('tpInput', instance);
            } else if(options == 'option') {
                result =  input._setOption.apply(input, Array.prototype.slice.call(arg, 1));
            } else if(options == 'destroy') {
                result =  input._destroy();
                $(this).removeData('tpInput');
            } else if($.isFunction(input[options])) {
                result =  input[options].apply(input, Array.prototype.slice.call(arg, 1));
            }
        });
        return result;
    }
})(jQuery);