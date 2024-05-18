/**
 * Created by hewenlin on 2016/2/17.
 */
(function($) {
    function TpPassword(id, options) {
        this.element = $('#' + id);
        this.options = $.extend({}, TpPassword.prototype.options, options);
        this._create(options);
        if ($.isFunction(this._init)) {
            this.init();
        }
    }

    TpPassword.prototype = {
        constructor: TpPassword,
        options: {
            placeholder: null,
            disabled: false,
            visible: false,
            classFocus: 'focus',
            classVisible: 'visible',
            classInvisible: 'invisible'
        },
        _create: function() {
            this.visible = this.options.visible || (this.element.attr('data-visible') == "true" ? true : false);
            if (this.element.parent('div.input-wrapper').length > 0) {
                this.element.parent('div.input-wrapper').addClass('tpPassword').find('.corner-left, .corner-right').remove();
                this.element.off('.inputIE');
            } else {
                this.element.wrap('<div class="tpPassword"></div>');
            }

            this.wrapper = this.element.parent('div.tpPassword');
            this.vInput = $('<input type="text">').appendTo(this.wrapper)
                .attr('maxlength', this.element.attr('maxlength'))
                .prop('disabled', this.element.prop('disabled'))
                .addClass(this.element.attr('class'))
                .hide();

            this._setOption('visible', this.visible);

            this.eyeIcon = $('<span class="icon-eye"></span>').appendTo(this.wrapper);

            this._setOption('placeholder', this.options.placeholder || '');
            if ($.isIE) {
                this.wrapper.append("<span class='corner-left'></span><span class='corner-right'></span>");
            }
            this._registerHandler();
        },
        _registerHandler: function() {
            var me = this;

            //当点击眼睛图标时，切换显示隐藏，同步两框的值
            $(this.wrapper).on('click.tpPassword', 'span.icon-eye', function() {
                me.wrapper.toggleClass(me.options.classVisible)
                    .toggleClass(me.options.classInvisible);
                if (me.visible === true) {
                    me.visible = false;
                    try {
                        me.element.val(me.vInput.val()).show().focus();
                    } catch (e) {
                    }
                    me.vInput.hide();
                } else {
                    me.visible = true;
                    try {
                        me.vInput.val(me.element.val()).show().focus();
                    } catch (e) {
                    }
                    me.element.hide();
                    me.disabled(me.element.prop('disabled'));
                }
            });

            //为支持web端直接通过password来获取值，失去焦点时，同步两框值
            $(this.wrapper).on('blur.tpPassword', 'input[type=password], input[type=text]', function() {
                me.wrapper.removeClass(me.options.classFocus);
                if(me.visible === true) {
                    me.element.val(me.vInput.val());
                } else {
                    me.vInput.val(me.element.val());
                }
            });

            $(this.element).on('focus.tpPassword', function() {
                me.wrapper.addClass(me.options.classFocus);
                if(me.visible === true) {
                    me.vInput.show().focus();
                }
            });
            $(this.vInput).on('focus.tpPassword', function() {
                me.wrapper.addClass(me.options.classFocus);
            }).on('keydown.tpPassword keyup.tpPassword', function(e) {
                e.stopPropagation();
                me.element.trigger(e.type);
            });
        },

        _unregisterHandlers: function() {
            this.element.off('.tpPassword');
        },

        _setOption: function(key, value) {
            if (key === 'value') {
                this.val(value);
            } else if(key == 'disabled'){
                this.disabled(value);
            } else if (key == 'placeholder') {
                this.element.attr('placeholder', value);
                this.vInput.attr('placeholder', value);
            } else if (key == 'visible') {
                if (value == true) {
                    this.visible = true;
                    this.wrapper.addClass(this.options.classVisible).removeClass(this.options.classInvisible);
                    this.vInput.show();
                    this.element.hide();
                } else {
                    this.visible = false;
                    this.wrapper.addClass(this.options.classInvisible).removeClass(this.options.classVisible);
                    this.vInput.hide();
                    this.element.show();
                }
            }
        },

        disabled: function(flag) {
            this.element.prop('disabled', flag);
            this.vInput.prop('disabled', flag);
            if (flag) {
                this.wrapper.addClass('disabled');
            } else {
                this.wrapper.removeClass('disabled');
            }
        },
        _destroy: function() {
            this._unregisterHandlers();
            this.vInput.remove();
            this.eyeIcon.remove();
            this.element.unwrap();
        },
        val: function(val) {
            if (val !== undefined) {
                this.element.val(val);
                this.vInput.val(val);
            }
            if (this.visible === true) {
                return this.vInput.val();
            } else {
                return this.element.val();
            }
        }
    };

    $.fn.tpPassword = function(options) {
        var arg = arguments;
        var result;
        this.each(function() {
            var pd = $(this).data('tpPassword');
            if (!pd) {
                var instance = new TpPassword(this.id,  options);
                $(this).data('tpPassword', instance);
            } else if(options == 'option') {
                result =  pd._setOption.apply(pd, Array.prototype.slice.call(arg, 1));
            } else if(options == 'destroy') {
                result =  pd._destroy();
                $(this).removeData('tpPassword');
            } else if($.isFunction(pd[options])) {
                result =  pd[options].apply(pd, Array.prototype.slice.call(arg, 1));
            }
        });
        return result;
    }
})(jQuery);