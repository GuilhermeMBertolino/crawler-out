//titleButton的初始化会默认被titleBar调用，不用手动初始化
//titleButton的   状态（data-status）      url，     文本（class="T_back"）     可以在html设置：
//<a id="back" data-status="A" url="quicksetup3.htm" class="T_back">back</a>
//也可以html中什么都不写，调用titleButton的方法设置：
//<a id="back"></a>
//$('#back').titleButton('status', '状态','文本').titleButton('url', 'quicksetup3.htm');
$.widget("tp.titleButton", {
    options: {
        position: 'left',
        disabled: false
    },

    _create: function() {
        var opt = this.options;

        this.element.attr('href', 'javascript:void(0);');
//        加样式
        if (opt.position == 'left') {
            this.element.wrap('<div class="top-titleBar-backContainer"></div>');
        } else if (opt.position == 'right'){
            this.element.wrap('<div class="top-titleBar-operationContainer"></div>');
        }

//       翻译部分,初始化时使用以下逻辑翻译，后续改变按钮状态时，在status方法中传入翻译后的字符串。
//       以下逻辑参考PC UI的逻辑，但不关联，也用到了T_xxx的类名
        var tag = this.element.prop('class').match(/\bT_(\w+)\b/);
//        如果有合法的翻译类则翻译
        if (tag && tag[1]) {
            if ($.tpLang.s_str[tag[1]] !== undefined) {
                this.element.html($.tpLang.s_str[tag[1]]);
            } else if($.tpLang.m_str[tag[1]] !== undefined) {
                this.element.html($.tpLang.m_str[tag[1]]);
            }
//        如果html中不包含带icon-类的span，则将内容置空
        } else if(this.element.find('span[class*="icon-"]').length == 0) {
//            this.element.html('');
        }

//        绑定事件
        this.registerHandlers();
    },

    hide: function() {
        this.element.parent().hide();
    },
    show: function() {
        this.element.parent().show();
    },
    disable: function(flag) {
        if (flag) {
//            增加disable的样式
        } else {
//            删除disable的样式
        }
    },

//    如果有参数传入，则设置状态为新状态。如果参数为空，返回当前状态
    status: function(status, text) {
        if (status == null || status == undefined) {
            return this.element.attr('data-status');
        } else {
            this.element.attr('data-status', status);
            if (text) {
            this.element.html(text);
        }
        }
    },
//    获取或设置url
    url: function(path) {
        if (path != null && path != undefined ) {
            this.element.attr('url',path);
        } else {
            return this.element.attr('url');
        }
    },
    registerHandlers: function() {
//        var move = false;
//        按钮被点击，触发绑定的事件，如果带有url属性，调用loadMain
        this.element.bind('click.titleButton', function(evt) {
            var url = $(this).attr('url');
            if (!!url && /\w+\.htm$/.test(url)) {
                $.loadPhoneMain(url);
            }
        }).bind('touchstart.titleButton', function() {
            $(this).addClass('touched');
        }).bind('touchmove.titleButton', function() {
            $(this).removeClass('touched');
        }).bind('touchend.titleButton', function() {
            $(this).removeClass('touched');
        }).bind('touchcancel.titleButton', function() {
            $(this).removeClass('touched');
        });
    },

    _destroy: function() {
        this.element.parent().unbind('.titleButton');
        this.element.unwrap();
    }

});
//在子页面定义titleBar时，它的正常html结构如下：
//<div class="titleBar">      //一定要有这个类
//    <a url=''>Back</a>     //此项不一定有，项中的url可选.a的内容可以是span图标
//    <h1>title</h1>          //此项一定有
//    <a id='done' data-status='done'>done</a>             //此项不一定有，项中的url可选
//</div>
//根据实际的html结构将标签内容添加到index头部的top-titleBar中，这样做的目的是为了：
// 1.各页面的titlebar内容可以在页面上定义
// 2.所有页面共用一个titleBar，在页面跳转时，titleBar不会闪跳
// 如果a中带url，给a添加跳转到url中的页面的事件
// 如果a带id，可以在页面上绑定click事件，使用titleButton.changeStatus('newStatus','text')改变a的状态
// 一个具体例子：
//===========================================================================
// <div class="titleBar">
//    <a id="back" url="quicksetup3.htm">back</a>
//    <h1>Access Controtfawawl</h1>
//    <a id="next"  data-status="A">Abt</a>
// </div>
//初始化titleBar，如果要隐藏则调用$('.titleBar').titleBar({hide:true});
//$('.titleBar').titleBar();
////给a绑定事件，一定要在titleBar初始化之后，或调用$('#next').titleButton()手动初始化
//$('#next').on('click', function() {
////        如果没有后续参数，是为获取当前状态
//    var status = $(this).titleButton('status');
//    console.log(status);
//    if (status == 'A') {
////            如果有后续参数，是为设置状态
//        $(this).titleButton('status', 'B', 'Bbt');
//        funA()
//    } else if (status == 'B'){
//        $(this).titleButton('status', 'C', 'Cbt');
//        funB()
//    } else if (status == 'C'){
//        $(this).titleButton('status', 'A', 'Abt');
//        funC()
//    }
//})
//===========================================================================

var titleButton = $.tp.titleButton;
$.widget("tp.titleBar", {
    options: {
        $tb: '#top-titleBar',
        hide: false,
        body: '#mainPhone',
        title: null,
        hideBackAuto: true
    },

    _create: function() {
//        获取顶部的top-titleBar
//        如果要隐藏
        this.options.$tb = $(this.options.$tb);
        if (this.options.hide){
            this.options.$tb.hide().empty();
            $('.hasTitleBar').removeClass('hasTitleBar');
            return;
        }
//        显示顶部的titleBar并清空
        this.options.$tb.show().empty();
//        给main添加一个上边距
        if($('.hasTitleBar').length == 0) {
            $(this.options.body).addClass('hasTitleBar');
        }

//      将当前页面的内容加进去
        this.element.addClass('top-titleBar')
            .show()
            .appendTo(this.options.$tb);

//找到大标题
        var h1 = this.element.find('h1');
        this.h1 = h1;
//        更改title
        if (this.options.title) {
            h1.html(this.options.title);
        }
        this.title(h1.html());
//向前找到back
        var back = h1.prev('a');
        if (back.length > 0) {

            back.titleButton({
                position: 'left'
            });
            this.back = back;
        }

//向后找到operation
        var operation = h1.next('a');
        if (operation.length > 0) {
            var self = this;
            operation.titleButton({
                position: 'right'
            });
            if (this.options.hideBackAuto === true) {
                operation.on('click.titleBar', function() {
//                这个事件作用是，当右边的按钮为edit时，隐藏左边的按钮，当为cancel时显示它。我觉得隐患好大。
//                要确保页面正确地用了status=edit和cancel
                    var status = $(this).titleButton('status');
                    var url = $(this).attr('url');
                    if (status == 'edit' && !url) {
                        if (self.back) {
                            self.back.titleButton('hide');
                        }
                    } else if (status == 'cancel' && !url) {
                        if (self.back) {
                            self.back.titleButton('show');
                        }
                    }
                });
            }

            this.operation = operation;
        }
    },

//    获取或更改title
    title: function(text) {
        if (text === null || text === undefined) {
            return this.h1.html();
        } else {
            this.h1.html(text);
            if (this.h1.height() > this.element.height()) {
                this.element.addClass('longTitle');
            } else {
                this.element.removeClass('longTitle');
            }

        }
    },
    _setOption: function(option, value) {
        if (option == 'title') {
            this.title(value);
        }
    },

    _destroy: function() {
        if (!!this.back) {
            this.back.titleButton('destroy');
        }
        if (!!this.operation) {
            this.operation.titleButton('destroy');
        }
    }
});