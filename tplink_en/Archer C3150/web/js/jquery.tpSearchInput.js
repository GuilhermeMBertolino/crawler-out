/**
 * Created by hewenlin on 2016/2/24.
 */
(function($) {
    function tpSearchInput(id, options) {
        this.element = $('#' + id);
        this.options = $.extend({}, tpSearchInput.prototype.options, options);
        this._create(options);
        if ($.isFunction(this._init)) {
            this.init();
        }
    }

    tpSearchInput.prototype = {
        constructor: tpSearchInput,
        options: {
            width: null,
            placeholder: null,
            searchButton: false,
            data: [{
                text: 'text',
                value: {}
            }, {
                text: 'text2',
                value: {}
            },{
                text: 'text3',
                value: {}
            },{
                text: 'text4',
                value: {}
            },{
                text: 'text5',
                value: {}
            },{
                text: 'text6',
                value: {}
            },{
                text: 'text7',
                value: {}
            },{
                text: 'text8',
                value: {}
            },{
                text: 'text9',
                value: {}
            },{
                text: 'text10',
                value: {}
            }],
            selectCallback: function(text, value) {
                console.log(text, value)
            }
        },
        _create: function() {
            this.id = this.element.attr('id');
            this.element.wrap('<div class="search-input-container"></div>');         //输入框
            this.wrapper = this.element.parent('div.search-input-container');        //全控件的包裹层
            this.element.wrap('<div class="search-input-wrapper"></div>');
            if ($.isIE) {
                this.element.after('<span class="corner-top-left"></span><span class="corner-top-right"></span><span class="corner-bot-left"></span><span class="corner-bot-right"></span>')
            }
            this.dropDownCon = $('<div class="search-input-drop-container"><ul class="search-input-drop"></ul></div>').appendTo(this.wrapper).hide();   //下拉列表的包裹层，用于控制显示隐藏
            this.dropDown = this.dropDownCon.find('.search-input-drop');             //下拉列表的ul，添加条目，控制翻页等时会用到
            this.dropDownDelta = $('<span class="search-input-drop-delta">').appendTo(this.dropDownCon);   //下拉列表那个三角形。要控制它的位置使它在输入框的右侧
            if (this.options.searchButton === true) {
                //有按钮的逻辑是，只有点按钮才会弹出下拉列表
                this.wrapper.append('<div class="search-input-button-container"><span class="search-icon"></span></div>').addClass('hasButton');
                this.button = this.wrapper.find(".search-input-button-container");  //搜索按钮
                this.element.addClass('hasButton');
            } else {
                //没按钮的话，显示的是一个背景图案。输入结果就出现下拉列表
                this.wrapper.append('<div class="search-input-button-container"><span class="search-icon"></span></div>').addClass('hasSearchIcon');
                this.button = this.wrapper.find(".search-input-button-container");  //搜索按钮
                this.element.addClass('hasSearchIcon');
            }
            //添加hint，用于代替placeholder
            this.hint = $('<span class="search-input-hint"></span>').appendTo(this.wrapper).hide().css({
                fontSize: this.element.css('fontSize'),
                left: this.element.css('paddingLeft'),
                height: this.element.css('height'),
                lineHeight: this.element.css('height')
            });

            this._createList(this.options.data);
            this._setOption('width', this.options.width || this.element.width());

            this.options.placeholder = this.options.placeholder || this.element.attr('placeholder');
            this._setOption('placeholder', this.options.placeholder);

            var isIE8 = (document.createElement('input').placeholder === undefined);
            if (isIE8 && this.options.placeholder && this.element.val() == '') {
                this.hint.show()
            }
            this._registerHandler();
        },

        _createList: function(dataArray, clear) {
            if (!$.isArray(dataArray)) {
                return false;
            }
            var drop = this.dropDown;
            if (clear === true) {
                drop.empty();
            }
            for (var i = 0, len = dataArray.length; i < len; i++) {
                $('<li>' + dataArray[i].text + '</li>').data('data', dataArray[i].value).appendTo(drop);
            }
//            $.each(dataArray, function(index, data) {
//                console.log(data);
//            })
        },


        _showRelativeItems: function() {
            var me = this;
            var inputValue = me.element.val();

            //把输入的内容除数字字母下划线外的字符替换成转义字符后，如输入'ab#c*'会被替换成'ab\#c\*',生成一个正则表达式
            var regex = new RegExp(inputValue.toLowerCase().replace(/([^\w])/g, '\\$1'), 'i');
            var items = me.dropDown.children();
            var isEmpty = true;
            for (var i = 0, len = items.length; i < len; i++) {
                var tmpItem = items.eq(i);
                var match;
                if (!(match = regex.exec(tmpItem.text()))) {
                    tmpItem.hide();
                } else {
                    isEmpty = false;
                    //将匹配到的文本高亮
                    tmpItem.html(match.input.replace(match[0], '<strong class="highlight">' + match + '</strong>'));
                    tmpItem.show();
                }
            }

            if (isEmpty) {
                me.dropDownCon.slideUp('fast');
            } else {
                me.dropDownCon.slideDown('fast');
            }
        },
        _registerHandler: function() {
            var me = this;
            var isKeyBoard = false;
            var isIE8 = (document.createElement('input').placeholder === undefined);
//            var hide=function() {
//                console.log('hide');
//                me.dropDown.hide();
//            };
            this.element.on('blur.tpSearchInput', function() {
                if (isIE8 && me.options.placeholder  && me.element.val() == '') {
                    me.hint.show();
                }
            });

            var _showDropDownList = function() {
                me._showRelativeItems();

                //点击除输入框外的地方时，隐藏输入框。点击列表的选项，事件会冒泡到这里。
                $(document).off('click.tpSearchInput').on('click.tpSearchInput', function() {
                    me.dropDownCon.slideUp('fast');
//                    hide();
                    $(document).off('click.tpSearchInput');
                });

            };

            //获取焦点时，根据输入框当前的值显示相关选项
            this.element.on('focus.tpSearchInput', function() {
                if (isIE8 && me.options.placeholder) {
                    me.hint.hide();
                }
                me.wrapper.addClass('focus');
                if (me.options.searchButton !== true) {
                    //如果有按钮，只有点击按钮才显示
                    _showDropDownList();
                }
            }).on('blur.tpSearchInput', function() {
                me.wrapper.removeClass('focus');
            });

            if (this.options.searchButton === true) {
                this.button.on('click.tpSearchInput', function() {
                    _showDropDownList();
                    return false;

                });
            }
            this.wrapper.on('mousemove.tpSearchInput', function() {
                //当用键盘操作选中上下项时，如果触发了滚动，鼠标当前悬停的项会触发mouseenter，造成闪跳。避免此问题加入isKeyBoard记录当前是键盘操作。
                isKeyBoard = false;
            });

            //获取键盘输入的值，控制上下键
            var keyEventObj = this.options.searchButton === true ? window : this.element;

            $(keyEventObj).off('keydown.' + this.id).on('keydown.' + this.id, function(e) {
                if (e.keyCode === 38 || e.keyCode === 40) {
                    isKeyBoard = true;
                    e.preventDefault();

                    var oldItem = me.dropDown.find('li.hover:visible');
                    var newItem;

                    //当有选项被选中时，选中它的邻近项
                    if (oldItem.length > 0) {
                        if (e.keyCode === 38) {
                            //向上选
                            newItem = oldItem.prevAll('li:visible:first');

                        } else if (e.keyCode === 40) {
                            //向下选
                            newItem = oldItem.nextAll('li:visible:first');
                        }
                    } else {
                        //选中第一项
                        newItem = me.dropDown.find('li:visible:eq(0)');
                    }

                    if (newItem.length > 0) {
                        me.dropDown.find('li.hover').removeClass('hover');
                        newItem.addClass('hover');

                        //新选项在显示区域外时，需要控制dropDown的滚动高度来使其显示。
                        var nit = newItem.position().top; //newItemTop
                        if (nit < 0) {
                            //新选项在可见区域的上面
                            me.dropDown[0].scrollTop = nit - me.dropDown.find('li:visible:first').position().top;
                        } else if (nit > me.dropDown.height() - newItem.height()) {
                            //新选项在可见区域的下面
//                            console.log(newItem.height())
                            //一定要获取可见项，隐藏项的top恒为0
                            me.dropDown[0].scrollTop = nit - me.dropDown.find('li:visible:first').position().top - me.dropDown.height() + newItem.height();
                        }
                    }
                }
            });

            //获取键盘输入的值

            $(keyEventObj).off('keyup.' + this.id).on('keyup.' + this.id, function(e) {
                var key = $.code2key(e);
                //通过键盘的上下键切换选项
                if (key == 'enter') {
                    //当用户按下回车键，触发被选中项的点击事件
                    var selectItem;
                    if (me.dropDownCon.is(':visible') && (selectItem = me.dropDown.find('li.hover:visible')) && selectItem.length > 0) {
                        selectItem.click();
                    } else if (me.element.is(':focus')){
                        //当在输入框点击enter
                        _showDropDownList();
                    }

                } else if(me.options.searchButton !== true){
                    //其他输入时，根据当前的值显示相关条目
                    _showDropDownList();
                }
            });

            this.element.on('click.tpSearchInput', function(e) {
                //阻止事件冒泡到document
                e.stopPropagation();
            });

            //鼠标移动到选项上时，添加一个悬停样式
            this.dropDown.on('mouseenter.tpSearchInput', 'li', function() {
                if (!isKeyBoard) {
                    me.dropDown.find('li.hover').removeClass('hover');
                    $(this).addClass('hover');
                }
            });

            //鼠标离开时移除样式
            this.dropDown.on('mouseleave.tpSearchInput', 'li', function() {
                $(this).removeClass('hover');
            });

            //点击选项时，把值填到输入框，触发selectCallback，同时事件冒泡到document，隐藏下拉列表
            this.dropDown.on('click.tpSearchInput', 'li', function(e) {
                e.stopPropagation();

                var text = $(this).text();
                var value = $(this).data('data');

                me.val(text, value);

                me.dropDownCon.slideUp('fast'); //不能靠冒泡到document来隐藏，否则连续用键盘操作的时候会有bug
                $(document).off('click.tpSearchInput');
            });

        },

        _unregisterHandlers: function() {
            this.element.off('.tpSearchInput').off('.' + this.id);
            this.dropDown.off('.tpSearchInput');
            this.wrapper.off('.tpSearchInput');
            this.button.off('.tpSearchInput');
            $(window).off('.' + this.id);
        },

        setData: function(dataArray, clear) {
            if (clear === true) {
                this.options.data = dataArray;
            } else {
                this.options.data = this.options.data.concat(dataArray);
            }

            this._createList(this.options.data, clear);
        },
        _setOption: function(key, value) {
            if (key == 'selectCallback') {
                if ($.isFunction(value)) {
                    this.options.selectCallback = value;
                }
            } else if (key == 'data') {
                this.setData.apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (key == 'width') {
                if (value !== null && value !== undefined) {
                    this.options.width = value;
                    this.element.css('width', value);
                    this.dropDown.css('min-width', value);
                    this.dropDownDelta.css('left', value - this.element.height() - this.dropDownDelta.width() / 2);
                }
            } else if(key == 'placeholder') {
                if (value !== null && value !== undefined) {
                    this.options.placeholder = value;
                    this.hint.text(value);
                    this.element.attr('placeholder', value);
                }
            }

        },

        disabled: function(flag) {
            this.element.prop('disabled', flag);
        },
        _destroy: function() {
            this._unregisterHandlers();
            this.dropDown.remove();
            this.element.unwrap();
        },
        val: function(text, data) {
            if (text !== undefined) {
                this.element.val(text);
                if (text) {   //此逻辑只在ie8下有意义
                    this.hint.hide();
                }
            }

            if (data) {
                if ($.isFunction(this.options.selectCallback)) {
                    this.options.selectCallback.call(this, text, data);
                }
            }
        }
    };

    $.fn.tpSearchInput = function(options) {
        var arg = arguments;
        var result;
        this.each(function() {
            var input = $(this).data('tpSearchInput');
            if (!input) {
                var instance = new tpSearchInput(this.id,  options);
                $(this).data('tpSearchInput', instance);
            } else if(options == 'option') {
                result =  input._setOption.apply(input, Array.prototype.slice.call(arg, 1));
            } else if(options == 'destroy') {
                result =  input._destroy();
                $(this).removeData('tpSearchInput');
            } else if($.isFunction(input[options])) {
                result =  input[options].apply(input, Array.prototype.slice.call(arg, 1));
            }
        });
        return result;
    }
})(jQuery);