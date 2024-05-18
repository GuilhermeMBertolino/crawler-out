/**
 * Created by hewenlin on 2016/2/24.
 */
/**
 * Created by hewenlin on 2016/2/17.
 */
(function($) {
    function tpAddress(id, options) {
        this.element = $('#' + id);
        this.options = $.extend({}, tpAddress.prototype.options, options);
        this._create(options);
        if ($.isFunction(this._init)) {
            this.init();
        }
    }

    tpAddress.prototype = {
        constructor: tpAddress,
        options: {
            width: null,
            connectorWidth: 6,
            connector: ':',
            connectorReal: null,       //后台值
            cellLength: 2,
            cellNumber: 6,
            value: '',
            cellSuffix: '-address-cell',
            cellClassName: 'tpAddress-cell-input tp-input-text',
            disabled: false
        },
        _create: function() {
            this.element.after('<div class="tpAddress-wrapper">');
            this.element.hide();
            this.wrapper = this.element.next('.tpAddress-wrapper').addClass(this.element.attr('class'));  //把原控件的类添加到插件上
            this.options.width = this.options.width || this.wrapper.width();
//            this.wrapper.width(this.options.width);
            this.options.value = this.options.value || this.element.val();
            this.options.disabled = this.options.disabled || this.element.prop('disabled');
            this.options.connectorReal = this.options.connectorReal || this.options.connector;
            //构建html
            this.options.cellSuffix = this.element.attr('id') + this.options.cellSuffix;
            var connectorWidth = this.options.connectorWidth;
            var cellWidth = ((this.options.width - (this.options.cellNumber - 1) * this.options.connectorWidth) / this.options.cellNumber);
            for (var i = 0, len = this.options.cellNumber; i < len; i++) {
                var cell = $('<input type="text">').appendTo(this.wrapper)
                    .addClass(this.options.cellClassName)
                    .addClass(this.options.cellSuffix)
                    .attr('maxlength', this.options.cellLength)
                    .css({
                        width: cellWidth
//                        left: i * cellWidth + i * connectorWidth       //通过绝对定位控制输入框排列在一行内
                    });
                if (i < len - 1) {
                    //不是最后一个，添加链接符
                    $('<span class="tpAddress-connector">' + this.options.connector + '</span>').appendTo(this.wrapper)
                        .css({
                            width: connectorWidth
//                            left: (i + 1) * cellWidth + i * connectorWidth       //通过绝对定位控制输入框排列在一行内
                        });

                }
            }

            if ($.isIE) {
                this.wrapper.append("<span class='corner-left'></span><span class='corner-right'></span>");
            }
            this._registerHandler();
            this.disabled(this.options.disabled);
            this.val(this.options.value);

        },

        _registerHandler: function() {
            var me = this;
            var isIE8 = ( navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" );
            var KEY_TAB = 9,
                KEY_SHIFT = 16,
                KEY_BACKSPACE = 8,
                KEY_DELETE = 46,
                KEY_LEFT = 37,
                KEY_RIGHT = 39,
                KEY_DEC_POINT = 0x6E,
                KEY_POINT = 190;
            var isChange = false;
            this.element.on('focus.tpAddress', function() {
               me.wrapper.find('.' + me.options.cellSuffix + ':last').focus();
            });
            this.wrapper.on('focus.tpAddress', '.' + me.options.cellSuffix, function() {
               me.wrapper.addClass('focus');
            });

            this.wrapper.on('change.tpAddress', '.' + me.options.cellSuffix, function() {
                isChange = true;
            });

            this.wrapper.on('blur.tpAddress', '.' + me.options.cellSuffix, function() {
                me.wrapper.removeClass('focus');
                setTimeout(function() {
                    if (!me.wrapper.hasClass('focus') && isChange === true) {
                        me.element.trigger('change');
                        isChange = false;
                    }
                },50);
            });

            var originalValue = '';
            this.wrapper.on('keyup.tpAddress', '.' + me.options.cellSuffix, function(evt) {
                evt = evt || window.event;
                var value = $(this).val();
                $(this).val((value = value.replace(/\s/g, '')));  //去除空格
                var key = evt.keyCode;
                var nextInput;
                if ((key == KEY_POINT || evt.keyCode === KEY_DEC_POINT) && me.options.connector == '.') {
                    value = value.replace(new RegExp('\\' + me.options.connector, 'g'), '');
                    $(this).val(value);
                    if (value !== '') {
                        //如果当前输入框里有内容，则跳到下一个输入框
                        nextInput = $(this).nextAll('input[type=text].' + me.options.cellSuffix + ':enabled:first');
                    }
                } else if (value.length >= me.options.cellLength && key !== KEY_TAB && key !== KEY_SHIFT && key !== KEY_LEFT && key !== KEY_RIGHT) {
                    //输入框的值到达最大长度，且按键不是切换输入框和移动光标
                    nextInput = $(this).nextAll('input[type=text].' + me.options.cellSuffix + ':enabled:first');
                } else if (key === KEY_BACKSPACE || key === KEY_DELETE) {
                    //删除键，把当前输入框删空了
                    if (originalValue.length === 0) {
                        nextInput = $(this).prevAll('input[type=text].' + me.options.cellSuffix + ':enabled:first');
                    }
                }

                if (nextInput && nextInput.length > 0) {
                    $(this).blur();   //必须
                    nextInput.focus().select();
                }
                if (key === KEY_TAB || key === KEY_SHIFT) {
                    $(this).select();
                }
            }).on('keydown.tpAddress', '.' + me.options.cellSuffix, function(evt) {
                originalValue = $(this).val();
            });

        },

        _unregisterHandlers: function() {
            this.element.off('.tpAddress');
            this.wrapper.off('.tpAddress');
        },

        _setOption: function(key, value) {
            if (key == 'disabled') {
                this.disabled(value);
            } else if (key == 'value') {
                this.val(value);
            } else if (key == 'width') {

            }

        },

        focus: function() {
            this.wrapper.find('input[type=text].' + this.options.cellSuffix + ':last').focus();
        },
        disabled: function(flag) {
            this.options.disabled = flag;
            if (flag === true) {
                this.wrapper.addClass('disabled');
                this.wrapper.find('input[type=text].' + this.options.cellSuffix).prop('disabled', true);
            } else if (typeof flag === 'string') {
                this.wrapper.find('input[type=text].' + this.options.cellSuffix).each(function(index) {
                   if (flag.charAt(index) === '1') {
                       $(this).prop('disabled', true);
                   } else {
                       $(this).prop('disabled', false);
                   }
                });
            } else {
                this.wrapper.removeClass('disabled');
                this.wrapper.find('input[type=text].' + this.options.cellSuffix).prop('disabled', false);
            }
        },
        _destroy: function() {
            this._unregisterHandlers();
            this.element.show().next('.tpAddress-wrapper').remove();
        },
        val: function(value) {
            var i;
            var c = this.options.connectorReal;
            if (value !== undefined) {
                if (value == '') {
                    for (i = 0; i < this.options.cellNumber; i++) {
                        this.wrapper.find('input[type=text].' + this.options.cellSuffix + ':eq(' + i + ')').val('');
                    }
                } else {
                    if (!value.match(new RegExp('\\' + c, 'g'))) {
                        c = this.options.connector;
                    }
                    value = value.replace(new RegExp('\\' + c + '$', 'g'), ''); //去掉末尾的分隔符号
                    var valueArray = value.split(c);
                    for (i = 0; i < valueArray.length && i < this.options.cellNumber; i++) {
                        this.wrapper.find('input[type=text].' + this.options.cellSuffix + ':eq(' + i + ')').val(valueArray[i]);
                    }
                }

//                this.element.trigger('change');
                return value;
            } else {
                value = '';
                var cells = this.wrapper.find('input[type=text].' + this.options.cellSuffix);
                for (i = 0; i < cells.length; i++) {
                    var tmpValue = $(cells[i]).val();
                    if (tmpValue != '') {
                        value = value + tmpValue + c;
                    }
                }
                if (value != '') {
                    value = value.substr(0, value.length - c.length);//去除结尾的连接符

                }
                return value;
            }
        },
        hide: function() {
            this.wrapper.hide();
        },
        show: function() {
            this.wrapper.show();
        }
    };

    $.fn.tpAddress = function(options) {
        var arg = arguments;
        var result;

        this.each(function() {
            var input = $(this).data('tpAddress');
            if (!input) {
                var instance = new tpAddress(this.id,  options);
                $(this).data('tpAddress', instance);
            } else if(options == 'option') {
                result =  input._setOption.apply(input, Array.prototype.slice.call(arg, 1));
            } else if(options == 'destroy') {
                result =  input._destroy();
                $(this).removeData('tpAddress');
            } else if($.isFunction(input[options])) {
                result =  input[options].apply(input, Array.prototype.slice.call(arg, 1));
            }
        });
        return result;
    }
})(jQuery);