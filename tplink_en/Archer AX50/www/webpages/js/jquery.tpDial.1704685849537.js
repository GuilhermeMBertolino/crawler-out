/**
 * Created by hewenlin on 2016/10/17.
 * use for speedTest at the first time
 */

(function ($) {
    function tpDial(id, options) {
        this.element = $('#' + id);
        this.options = $.extend({}, tpDial.prototype.options, options);
        this._create(options);
        if ($.isFunction(this._init)) {
            this.init();
        }
    }

    tpDial.prototype = {
        constructor: tpDial,
        options: {
            graduation: [0, 1, 5, 10, 20, 50, 100],
            canvasWidth: 120,
            percentageInnerCutout: 93, //中间镂空部分占的比例
            value: null,
            bColor: "#c5c8c8",
            fColor: "#4acbd6",
            speedUnitText: "Mbps Download",
            downLoad: true
        },
        _create: function () {
            this.element.addClass('tpDial');

            this.canvasWrapper = $('<div class="tpDial-canvas-wrapper">').appendTo(this.element);
            this.bCanvas = document.createElement('canvas'); //background Canvas
            this.fCanvas = document.createElement('canvas'); //fill Canvas

            if (!this.bCanvas.getContext) {
                //support for ie 8
                window.G_vmlCanvasManager.initElement(this.bCanvas);
                window.G_vmlCanvasManager.initElement(this.fCanvas);
                this.noCanvas = true;
            }

            this.bCanvas.width = this.options.canvasWidth;
            this.bCanvas.height = this.options.canvasWidth;
            this.canvasWrapper.append(this.bCanvas);

            this.fCanvas.width = this.options.canvasWidth - 2;
            this.fCanvas.height = this.options.canvasWidth - 2;
            this.fCanvas.className = "tpDial-canvas-fillCanvas";

            this.canvasWrapper.append(this.fCanvas);

            //draw background
            var bctx = this.bCanvas.getContext('2d');
            new Chart(bctx).Doughnut([
                {
                    value: 100,
                    color: this.options.bColor
                }
            ], {
                showTooltips: false,
                segmentShowStroke: false,
                percentageInnerCutout: this.options.percentageInnerCutout - 1, //中间镂空部分占的比例
                animation: false,
                lineCap: this.noCanvas ? '': 'round',
                startAngle: Math.PI * 5 / 6,
                totalRadian: Math.PI * 4 / 3

            });

            //添加刻度
            var gradientDegree = Math.PI * 4 / 3 / (this.options.graduation.length - 1);
            for (var i = 0, len = this.options.graduation.length; i < len; i++) {

                var tempX = -Math.cos(Math.PI - (Math.PI * 5 / 6 + i * gradientDegree)) * (this.options.canvasWidth / 2 + 15) + this.options.canvasWidth / 2;
                var tempY = Math.sin(Math.PI - (Math.PI * 5 / 6 + i * gradientDegree)) * (this.options.canvasWidth / 2 + 15) + this.options.canvasWidth / 2;
                $('<div class="tpDial-canvas-graduation-wrapper"><span class="tpDial-canvas-graduation-inner">' + this.options.graduation[i] + (i == len - 1 ? '+' : '') + '</span></div>').appendTo(this.canvasWrapper).css({
                    position: 'absolute',
                    left: tempX,
                    top: tempY
                });
            }

            //添加文本
            var infoWrapper = $('<div class="tpDial-info-wrapper"></div>').appendTo(this.element);
            infoWrapper.css({
                width: this.options.canvasWidth
            });
            this.speedText = $('<span class="tpDial-info-speed">---</span>').appendTo(infoWrapper);
            this.speedText.after('<br>');
            this.speedUnitText = $('<span class="tpDial-info-unit">' + this.options.speedUnitText + '</span>').appendTo(infoWrapper);
            this.val(this.options.value);

            //添加箭头
            var arrowWrapper = $('<div class="tpDial-arrow-wrapper">').appendTo(this.element);
            if (this.options.downLoad) {
                $('<span class="sprite download3_nomal_light"></span>').appendTo(arrowWrapper);
                this.arrowInner = $('<div class="tpDial-arrow-inner downLoad"><span class="sprite download3_nomal"></span></div>').appendTo(arrowWrapper);
            } else {
                $('<span class="sprite upload3_nomal_light"></span>').appendTo(arrowWrapper);
                this.arrowInner = $('<div class="tpDial-arrow-inner upLoad"><span class="sprite upload3_nomal"></span></div>').appendTo(arrowWrapper);
            }

            this._registerHandler();
        },

//        speedTest: function(options) {
//
//            options = $.extend({
//                time: 3000,     //正常执行动画的时间
//                rushTime: 500,   //当result不为空时，加速执行动画的时间
//                result: null,   //表盘要显示的结果。如果为null，动画会以正常速度执行，且结束后不更新表盘结果。如果不为空，加速执行动画。
//                callback: null  //动画结束后的回调
//            }, options);
//
//            var maxHeight = 28;
//            var me = this;
//            if (options.result !== null) {
//                //测试结果已给出，加快结束动画，显示结果
//                if (this.arrowInner.is(':animated')) {
//                    //如果动画已经在进行，停止它，开始一个新的比较快的动画
//                    this.arrowInner.stop(true).animate({
//                        height: maxHeight
//                    },500, function() {
//                        me.val(options.result);
//                        if ($.isFunction(options.callback)) {
//                            options.callback();
//                        }
//                    })
//                } else {
//                    this.arrowInner.css({
//                        height: '0px'
//                    }).animate({
//                        height: maxHeight
//                    }, 500, function() {
//                        me.val(options.result);
//                        if ($.isFunction(options.callback)) {
//                            options.callback();
//                        }
//                    });
//                }
//
//            } else {
//                this.arrowInner.css({
//                    height: '0px'
//                }).animate({
//                    height: maxHeight
//                }, options.time, function() {
//                    if ($.isFunction(options.callback)) {
//                        options.callback();
//                    }
//                });
//            }
//
//        },

        testing: function (isTesting) {
            if (isTesting == true) {
                this.animate({
                    timeTotal: 0
                });
            } else {
                this.animate({
                    timeTotal: -1
                });
            }
        },
        animate: function (options) {
            options = $.extend({
                timeTotal: 0, //0表示无限，负数表示结束动画，正数表示指定时间后结束动画
                callback: null,
                timeAnimate: 800
            }, options);

            var me = this;
            var timeCount = 0;
            me.animateTimeTotal = options.timeTotal;
            me.animateCallback = options.callback;

            var arrowAnimate = function (callback) {
                if (me.arrowInner.is(':animated') || me.animateTimeTotal < 0) {
                    return;
                }

                me.arrowInner.css({
                    height: '0px'
                }).animate({
                    height: '28px'
                }, options.timeAnimate, function () {
                    timeCount += options.timeAnimate;
                    if (timeCount < me.animateTimeTotal || me.animateTimeTotal === 0) {
                        //动画循环
                        arrowAnimate(callback);
                    } else {
                        //动画结束
                        if ($.isFunction(me.animateCallback)) {
                            me.animateCallback();
                        }
                    }
                });
            };

            arrowAnimate(me.animateCallback);
        },

        _registerHandler: function () {

        },

        _unregisterHandlers: function () {
            this.element.off('.tpInput .tpPassword');
        },

        _setOption: function (key, value) {
        },

        _setFillArea: function (percent, animation) {
            var fctx = this.fCanvas.getContext('2d');
            if (typeof percent != "number") {
                if (this.fDoughnut) {
                    this.fDoughnut.clear();
                }
                return;
            }
            if (percent > 100) {
                percent = 100;
            }

            var sValue = 100;   //standard value
            var iValue = Number.POSITIVE_INFINITY; //infinite value,too big will cost bug in ie8
            if (this.noCanvas) {
                iValue = 100000;
            }
            if (!this.fDoughnut) {
                this.fDoughnut = new Chart(fctx).Doughnut([
                    {
                        value: sValue,
                        color: this.options.fColor
                    },
                    {
                        value: percent > 0 ? (sValue / percent * 100 - sValue) : iValue,
                        color: this.options.bColor
                    }
                ], {
                    showTooltips: false,
                    segmentShowStroke: false,
                    percentageInnerCutout: this.options.percentageInnerCutout, //中间镂空部分占的比例
                    animationSteps: 50, //帧间隔
                    animationEasing: "easeOutQuad",
                    animateRotate: animation !== false, //旋转动画开关
                    showScale: false,
                    segmentStrokeWidth: 0,
                    lineCap: this.noCanvas ? '': 'round',
                    startAngle: Math.PI * 5 / 6,
                    totalRadian: Math.PI * 4 / 3
                });
            } else {
                //只能通过移除和增加新数据去更新图表，改变不了第一个数据的值，所以需要根据基准值和百分比计算第二个值
                this.fDoughnut.removeData();
                this.fDoughnut.addData({
                    value: percent > 0 ? (sValue / percent * 100 - sValue) : iValue,
                    color: this.options.bColor
                });
            }
        },
        val: function (val, animation) {
            if (val !== undefined) {

                this.options.value = val;
                var graduation = this.options.graduation;
                var gradient = 100 / (graduation.length - 1);
                var result = 0;
                if (val !== null) {
                    if (val < 100) {
                        val = val.toFixed(1); //保留一位小数
                    } else {
                        val = val.toFixed(0); //保留整数
                    }
                    this.options.value = val;
                    for (var i = 1, len = this.options.graduation.length; i < len; i++) {
                        if (val >= graduation[i]) {
                            result += gradient;
                        } else {
                            result += (val - graduation[i - 1]) / (graduation[i] - graduation[i - 1]) * gradient;
                            break;
                        }
                    }
                }
                this._setFillArea(result, animation);

                this.canvasWrapper.find('.tpDial-canvas-graduation-wrapper').removeClass('reached');
                if (val === null) {
                    this.speedText.text('---');
                } else {
                    this.speedText.text(val);
                    this.canvasWrapper.find('.tpDial-canvas-graduation-wrapper:lt(' + i + ')').addClass('reached');
                }

            }

        },

        _destroy: function () {
            this.element.empty().removeClass('tpDial');
        }

    };

    $.fn.tpDial = function (options) {
        var arg = arguments;
        var result;
        
        this.each(function () {

            var input = $(this).data('tpDial');
            if (!input && options != 'destroy') {
                var instance = new tpDial(this.id, options);
                $(this).data('tpDial', instance);
            } else if (options == 'option') {
                result = input._setOption.apply(input, Array.prototype.slice.call(arg, 1));
            } else if (options == 'destroy') {
                result = input._destroy();
                $(this).removeData('tpInput');
            } else if ($.isFunction(input[options])) {
                result = input[options].apply(input, Array.prototype.slice.call(arg, 1));
            }
        });
        return result;
    }
})(jQuery);