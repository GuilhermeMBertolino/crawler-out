/**
 * Created by admin on 2015/3/31.
 */
//步骤
$.widget('tp.processFlow', {
    options: {
//        步骤的数量及内容
        stepsArr: ['1', '2', '3', '4', '5', '6'],
//        步骤的初始位置
        stepCount: 0,
//        是否打开动画
        animate: false
    },

    _create: function() {
        var html = '<div class="pf-stepContainer">';
        var steps = this.options.stepsArr;
        for(var i = 0;i < steps.length; i++) {
            if (!!steps[i]) {
            html += '<span class="sprite icon-processStep step-gray-a">' + steps[i] + '</span>';
            } else {
                html += '<span class="sprite icon-processStep step-gray-a nd">' + steps[i] + '</span>';
            }
        }
        html += '</div>';
        this.element.append(html);
        this.stepSpan = this.element.find('span.icon-processStep');
        this.element.find('span.icon-processStep:not(.nd):first').addClass('first step-yellow-p');
        this.setStep(this.options.stepCount);
    },
//    设置初始的位置
    setStep: function(s) {
        if (s == undefined || s >= this.options.stepsArr.length || s < 0 || !this.options.stepsArr[s]) {
            return false;
        }
        this.options.stepCount = s;
        this.stepSpan.removeClass('completed step-yellow-a');
        for (var i = 1; i <= s; i++) {
            $(this.stepSpan[i]).addClass('completed step-yellow-a');
        }
    },
//跳到下一步
    nextStep: function() {
        var sc = this.options.stepCount;
        do {
            sc++;
        } while (sc < this.options.stepsArr.length - 1 && !this.options.stepsArr[sc]);
        if (sc <= this.options.stepsArr.length - 1 && this.options.stepsArr[sc]) {
            this.options.stepCount = sc;
            if (this.options.animate) {
                this._animate($(this.stepSpan[++this.options.stepCount]));
            } else {
                $(this.stepSpan[sc]).addClass('completed step-yellow-a');

            }

            return true;
        } else {
            return false;
        }
    },
//    返回上一步
    lastStep: function() {
        var sc = this.options.stepCount;
        do {
            sc--;
        } while (sc > 0 && !this.options.stepsArr[sc]);
        if (sc >= 0 && this.options.stepsArr[sc]) {
            if (this.options.animate) {
                this._animate($(this.stepSpan[this.options.stepCount]));
            } else {
                $(this.stepSpan[this.options.stepCount]).removeClass('completed step-yellow-a');
            }
            this.options.stepCount = sc;
            return true;
        } else {
            return false;
        }
    },
    _setOption: function() {

    },
//给步骤切换时增加旋转动画
    _animate: function(span) {
        var deg = 0;
        var rotateDeg = 0;
        var increase = 90 / 3;
        var acceleration = 0;
        var ani = setInterval(function() {
            if (rotateDeg < 90) {

                rotateDeg += increase;
                increase += acceleration;
                $(span).css({
                    transform: 'rotateX(' + rotateDeg + 'deg)'
                });

            } else {
                clearInterval(ani);
                $(span).toggleClass('completed');
                var ani2 = setInterval(function() {
                    if (rotateDeg > 0) {
                        rotateDeg -= increase;
                        increase -= acceleration;
                        $(span).css({
                            transform: 'rotateX(' + rotateDeg + 'deg)'
                        });
                    } else {
                        $(span).css({
                            transform: 'rotateX(0deg)'
                        });
                        clearInterval(ani2);
                    }
                }, 50);
            }


        }, 50);
    },
    _destroy: function() {
        this.element.empty();
    }
});