/**
 * Created by admin on 2015/4/16.
 */
//1.把原本的隐藏
//2.在前面加上新的html结构，把原本的布局信息取过来
//3.根据option：disable 初始值 更改当前的样式
//4.绑定事件：
//  （1）可能有touchstart的样式
//  （2）点击替身时，真框出现。如果当前是disable，不出现
//  （3）真身改变时，替身的值改变
//5.实现接口：
//  （1）动态增加和删除选项
//  (2)改变选中值
$.widget('tp.selectMobile', {
    options: {
        disabled: false
    },

    _create: function() {
// 加样式
        this.element.wrap('<div class="tsm-selectContainer"></div>')
        this.element.before($('<div class="tsm-standIn"><span class="tsm-text"></span><span class="sprite c-arrow-gray-down"></span></div>'));
        var container = this.element.parent();
        this.container = container;
        container.addClass(this.element.prop('class'))
            .find('.tsm-text')
            .text(this.element.val());
        this.element.removeClass()
            .addClass('tsm-selectReal');
        if (this.element.prop('disabled')) {
            this._setOption('disabled', true);
        } else {
            this._setOption('disabled', false);
        }
        this.refresh();
    },

// 顾名思义了吧
    disabled: function(flag) {
        if (flag) {
            this._setOption('disabled', true);
        } else {
            this._setOption('disabled', false);
        }
    },

    _setOption: function(key, value) {
        if (key == 'disabled') {
            if (value == true || value == 'disabled') {
                this.options.disabled = true;
                this.element.prop('disabled', true);
                this.container.addClass('disabled');
                this.unregisterHandlers();
                $('label[for="' + this.element.attr('id') + '"]').addClass('disabled');
            } else if (value == false){
                this.options.disabled = false;
                this.element.prop('disabled', false);
                this.container.removeClass('disabled');
                this.registerHandlers();
                $('label[for="' + this.element.attr('id') + '"]').removeClass('disabled');
            }
        }
    },
//解除事件绑定
    unregisterHandlers: function() {
        this.element.unbind('.select');
    },

    registerHandlers: function() {
        var self = this;
        this.element.bind('click.select', function() {
//            self.element.click();
        }).bind('touchstart.select', function() {
            self.container.addClass('touched');
        }).bind('touchmove.select', function() {
            self.container.removeClass('touched');
        }).bind('touchend.select', function() {
            self.container.removeClass('touched');
        }).bind('touchcancel.select', function() {
            self.container.removeClass('touched');
        }).bind('change.select', function() {
            self.refresh();
        })
    },
//获取或设置当前的index。Index为非法值时，返回-1
    selectedIndex: function(newIndex) {
        if (newIndex !== null && newIndex !== undefined) {
            if (newIndex >= 0 && newIndex < this.element.find('option').length) {
//                get(0)获取到DOM对象而不是jq对象，设置这个dom对象selectedIndex可以设置选中项
                this.element.get(0).selectedIndex = newIndex;
                this.element.trigger('change');
                this.refresh();
            } else {
                return -1;
            }
        } else {
            return this.element.get(0).selectedIndex;
        }
    },
//    获取或设置value的值,设置value的时候，要保证option中设置了value属性
    value: function(val) {
        if (val !== null && val !== undefined) {
//            这种写法也行，但是如果val是不存在的，select会变成空值
//            this.element.prop('value',val);
//            这种写法不行，无论如何会选中最后一项
//            this.element.val(val);
//            下面这种写法可以，如果val不存在，select保持原来的值
            this.element.find('option[value="' + val + '"]').prop('selected', true);
            this.element.trigger('change');
            this.refresh();
        } else {
            return this.element.val();
        }
    },
//    获取选中项的文本
    text: function() {
        return this.element.find('option:selected').text();
    },

//    删除某项
    remove: function(val) {
        this.element.find('option[value="' + val + '"]').remove();
        this.refresh();
    },
//    删除全部
    removeAll: function() {
        this.element.find('option').remove();
        this.refresh();
    },
//    添加option
//   这样用：
//    ===========================================
//    var options = [
//        {
//            value: 'a',
//            text: 'A'
//        },
//        {
//            value: 'b',
//            text: 'B',
//            selected: true
//        },
//        {
//            value: 'c',
//            text: 'C'
//        },
//    ]
//    $('#mySelect').selectMobile('appendOptions', options);
//    ============================================
    appendOptions: function(opArr) {
        var render = function(op) {
            var html = '<option value="' + op.value + '">' + op.text + '</option>';
            return html;
        }

        for (var i = 0; i < opArr.length; i++) {
            this.element.append(render(opArr[i]));
//            如果该项selected，选中它
            if (opArr[i].selected == true || opArr[i].selected == 'selected') {
                this.element.find('option:last').prop('selected', true);
            }
        }

        this.refresh();
    },
    refresh: function() {
//        console.log('refresh:selectedIndex:' + this.element.find('option:selected').prop('index'));
//        console.log('refresh:val:' + this.element.val());
        this.container.find('.tsm-text').text(this.element.find('option:selected').text());
    },
    _destroy: function() {
        this.unregisterHandlers();
        this.element.removeClass('tsm-selectReal').addClass(this.container.attr('class')).replaceAll(this.container);

    }
});