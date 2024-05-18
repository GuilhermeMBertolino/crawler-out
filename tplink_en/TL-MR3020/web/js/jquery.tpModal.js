/**
 * created by hwl on 2016/11/30.
 */
(function ($) {
	function TPModal(id, options) {
		this.element = $('#' + id);
        this.id = this.element.prop('id');
		this.options = $.extend({}, TPModal.prototype.options, options);
		this._create(options);
		if ($.isFunction(this._init)) {
			this.init();
		}
	}

    TPModal.prototype = {
		constructor: TPModal,
		options: {
			className: '',      //加在弹框上的类名
            confirmBtn: {
                str: $.tpLang.m_str.ok, //按钮的文字
                className: null,//加在按钮的类
                callback: null, //callback中return false可以阻止默认的关闭动作，如果要异步关闭，先return false，在异步结束后调用hide
                show: true,      //是否显示
                disabled: false //是否禁用
            },
            cancelBtn: {
                str: $.tpLang.m_str.cancel,
                callback: null, //callback中return false可以阻止默认的关闭动作
                className: null,
                show: true,
                disabled: false //是否禁用
            },
            closeIcon:{
                show: true,
                callback: null      //如果为空为调用cancel的callback
            },
            animation: false,      //显示动画，保留未用
            showCallback: null,   //显示时的回调
            hideCallback: null,  //隐藏时的回调
            zIndex: 'auto',       //弹窗的zIndex
            coverZIndex: 'auto',  //遮罩的zIndex
            cover: true,           //是否启用遮罩
            width: 'auto',        //弹框宽度
            global: false,        //是否插到body下
            init: null            //在控件初始化时被调用
//            autoDelete: true,     //modal需要提升到body下，设为true时，当离开指定页面时删除
//            pageRange: []           //当autoDelete==true，且$.curPage不在该数组内时删除modal
		},

		_create: function () {
            var inHTML = '';

            inHTML += "<div class=\"msg-wrap\">";
            inHTML += "<div class=\"msg-content-wrap\">";
            inHTML += "<div class=\"widget-content msg-content-container\">";
            inHTML += "</div>";
            inHTML += "</div>";
            inHTML += "</div>";
            inHTML = '<div class="scroll-outer"><div class="scroll-layer">' + inHTML + '</div></div>';
            inHTML = '<div class="position-center-right">' + inHTML + '</div>';
            inHTML = '<div class="position-center-left">' + inHTML + '</div>';
            inHTML = '<div class="position-top-right"></div>' + inHTML;
            inHTML = '<div class="position-top-center"></div>' + inHTML;
            inHTML = '<div class="position-top-left"></div>' + inHTML;
            inHTML += '<div class="position-bottom-left"></div>';
            inHTML += '<div class="position-bottom-center"></div>';
            inHTML += '<div class="position-bottom-right"></div>';
            inHTML = '<div class="modal-container"><div class="modal-wrapper">' + inHTML + '</div></div>';

            this.container = $(inHTML);
            this.container.prop('id', this.id + '-container').addClass(this.options.className);
            if (this.options.global) {
                this.container.appendTo($('body'));
            } else {
                this.container.insertBefore(this.element);
            }
            this.element.appendTo(this.container.find('.widget-content.msg-content-container'));
            this.container.addClass("widget-container msg-container");

            if (this.options.closeIcon && this.options.closeIcon.show) {
                this.closeIcon = $('<a class="widget-close msg-close" href="javascript:void(0);"></a>').appendTo(this.container.find('.position-center-right'));
            }

            if (this.options.confirmBtn) {
                inHTML =  '<div class="msg-btn-container">' +
                    '<div class="msg-btn-wrap"></div>' +
                    '</div>';
                $(inHTML).appendTo(this.container.find('.scroll-layer'));

                var tmpBtnCtn;
                if (this.options.cancelBtn) {
                    tmpBtnCtn =$('<div class="button-container in-line"><button type="button" class="green pure-button tp-btn-custom"></button></div>').appendTo(this.container.find('.msg-btn-wrap'));
                    this.cancelBtn = tmpBtnCtn.find('button');
                    this.cancelBtn.addClass(this.options.cancelBtn.className);

                    this._setOption('cancelBtn', this.options.cancelBtn);
                }

                if (this.options.confirmBtn) {
                    tmpBtnCtn =$('<div class="button-container in-line"><button type="button" class="green pure-button tp-btn-custom"></button></div>').appendTo(this.container.find('.msg-btn-wrap'));
                    this.confirmBtn = tmpBtnCtn.find('button');
                    this.confirmBtn.addClass(this.options.confirmBtn.className);
                    this._setOption('confirmBtn', this.options.confirmBtn);
                }

            }

            if (this.options.width != 'auto') {
                this.container.width(this.options.width);
            }

            if (typeof this.options.zIndex == 'number') {
                this.container.zIndex(this.options.zIndex);
            }
//            this._setFixedCentral();

            this._registerHandler();
            if ($.isFunction(this.options.init)) {
                this.options.init();
            }
        },

        show: function() {
            var me = this;
            this.container.show();
            if (me.options.width == 'auto') {
                me.container.css('minWidth', me.container.css('width'));
            }
            me._setFixedCentral();

            //scroll的初始化要写在show后否则会导致modal无法在屏幕居中
            this.container.find('.scroll-layer').niceScroll({
                cursorcolor: "#36444b",
                cursoropacitymax: 0.15,
                cursoropacitymin: 0.15,
                touchbehavior: false,
                cursorwidth: "8px",
                cursorborder: "0",
                cursorborderradius: "4px",
                horizrailenabled: false
            });

            if ($.isFunction(me.options.showCallback)) {
                me.options.showCallback();
            }
            if (me.options.cover) {
                $.su.mask.show(this.id, this.options.coverZIndex == 'auto' ? true : this.options.coverZIndex, this.container);
            }
        },

        hide: function() {
            var me = this;
            this.container.hide(0, function() {
                if ($.isFunction(me.options.hideCallback)) {
                    me.options.hideCallback();
                }
            });
            if (me.options.cover) {
                $.su.mask.hide(this.id);
            }
        },

        _setOption: function(key, value) {
            var me = this
            if (key == 'cancelBtn') {
                $.extend(me.options.cancelBtn, value);
                if (value.disabled !== undefined) {
                    me.cancelBtn.prop('disabled', me.options.cancelBtn.disabled);
                }
                if (value.str !== undefined) {
                    me.cancelBtn.html('<span>' + me.options.cancelBtn.str + '</span>');
                }

                if (value.show !== undefined) {
                    if (value.show) {
                        me.cancelBtn.show();
                    } else {
                        me.cancelBtn.hide();
                    }
                }
            } else if (key == 'confirmBtn') {
                $.extend(me.options.confirmBtn, value);
                if (value.disabled !== undefined) {
                    me.confirmBtn.prop('disabled', me.options.confirmBtn.disabled);
                }
                if (value.str !== undefined) {
                    me.confirmBtn.html('<span>' + me.options.confirmBtn.str + '</span>');
                }

                if (value.show !== undefined) {
                    if (value.show) {
                        me.confirmBtn.show();
                    } else {
                        me.confirmBtn.hide();
                    }
                }
            }
        },
		_registerHandler: function() {
            var me = this;
            if (me.options.global) {
                //监控window的loadPage事件，但离开指定页面时删除modal
                $(window).on('beforeLoadPage.'+ me.id, function() {
//                    var found = false;
//                    for (var i = 0, len = me.options.pageRange.length; i < len; i++) {
//                        if ($.curPage == me.options.pageRange[i]) {
//                            found = true;
//                            break;
//                        }
//                    }
//                    if (found === false) {
//                        me._destroy();
//                    }

                    // me._destroy();
                });
            }
            if (me.confirmBtn) {
                me.confirmBtn.on('click', function() {
                    var callback = me.options.confirmBtn.callback;
                    if ($.isFunction(callback)) {
                        if (callback() !== false) {
                            me.hide();
                        }
                    } else {
                        me.hide();
                    }
                });
            }

            if (me.cancelBtn) {
                me.cancelBtn.on('click', function() {
                    var callback = me.options.cancelBtn.callback;
                    if ($.isFunction(callback)) {
                        if (callback() !== false) {
                            me.hide();
                        }
                    } else {
                        me.hide();
                    }
                });
            }

            if (me.closeIcon) {
                me.closeIcon.on('click', function(e) {
                    e.stopPropagation();
                    var callback = me.options.closeIcon.callback;
                    if (!me.options.closeIcon.callback && me.options.cancelBtn && me.options.cancelBtn.callback) {
                        callback = me.options.cancelBtn.callback;
                    }
                    if ($.isFunction(callback)) {
                        if (callback() !== false) {
                            me.hide();
                        }
                    } else {
                        me.hide();
                    }
                });
            }

            $(window).on("resize." + this.id, function() {
                me._setFixedCentral();
            });
        },

        _setFixedCentral: function() {
            var me = this.container;
            var posX = parseInt(($(window).width() - me.width()) / 2, 10);
            var posY = parseInt(($(window).height() - me.height()) / 2, 10);
            (posX < 0) && (posX = 0);
            (posY < 50) && (posY = 50);
            me.css({
                left: posX,
                top: posY,
                bottom: "auto",
                right: "auto",
                position: "fixed"
            });
            me.find('.scroll-layer').css({
                maxHeight: $(window).height() - posY - 75
            });
        },
        _unregisterHandlers: function() {
            var me = this;
            $(window).off('.'+ me.id);
        },
		_destroy: function () {
			this._unregisterHandlers();
            $(this).removeData('tpModal');
            this.container.remove();

		},

        refresh: function() {}

	};

	$.fn.tpModal = function (options) {
		var arg = arguments;
		var result;
		this.each(function () {
			var obj = $(this).data('tpModal');
			if (!obj && options != 'destroy') {
				var instance = new TPModal(this.id, options);
				$(this).data('tpModal', instance);
			} else if (options == 'option') {
				result = obj._setOption.apply(obj, Array.prototype.slice.call(arg, 1));
			} else if (options == 'destroy') {
				result = obj._destroy();
				$(this).removeData('tpModal');
			} else if ($.isFunction(obj[options])) {
				result = obj[options].apply(obj, Array.prototype.slice.call(arg, 1));
			} else {
				obj.refresh();
			}
		});
		return result;
	};
})(jQuery);