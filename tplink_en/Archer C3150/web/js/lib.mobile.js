/**
 * Created by admin on 2015/3/9.
 */
/*
 *lib.js的phone版，这里用于实现一些与web版的lib相似但不同的方法
 * 如果是完全相同的方法，则共用pc版的方法
 */
$.extend({
    //    加载头部html，包括菜单按钮，logo
    loadPhoneTop: function(path) {
        $.tpLoadPhone(path, "topPhone", false);
    },
    //    加载菜单内容
    loadPhoneMenu: function() {

    },

    loadPhoneMain: function(path, arg) {
        $.startWaitingMobile($.tpLang.s_str.loading);
        //    可能前面会摆一堆当前页面控件destroy的方法，但目前没有
        $('#mainPhone').empty();
        if (!path) path = $.curPage;

        //        这段看不懂，拷贝过来的
        var bFile = (path.indexOf("<") < 0);
        if (bFile) {
            $.emptyElem($.bak);
            $.clearAsync();
        }

        $.loadPagePhone(
            'mainPhone',
            path,
            function() {
                if (bFile) {
                    $.curPage = path;
                    $.accStack.push(path);
                }
                $.mainParam = arg;
                while ($.as.length) $.as.pop();
                while ($.ds.length) $.ds.pop();
                while ($.ansiarg.length) $.ansiarg.pop();
                //                $.addElemClass($.id("main"), "nv");
                //                $.unlock();
            },
            function() {
                $.stopWaitingMobile();
                if (path == 'networkMap.mobile.htm') {
                    $('#topPhone').addClass('networkMap');
                    $('#mainPhone').addClass('networkMap');
                    $('body').addClass('networkMap');

                } else {
                    $('#topPhone').removeClass('networkMap');
                    $('#mainPhone').removeClass('networkMap');
                    $('body').removeClass('networkMap');
                }
                var menuItem = $('#top-menuList a[url="' + path + '"]');
                if (menuItem.length) {
                    $('#top-menuList a').removeClass('selected');
                    menuItem.addClass('selected');
                }
            }
        );
    },
    loadPagePhone: function(id, path, hook1, hook2) {
        var bFile = (path.indexOf("<") < 0);
        $.tpLoadPhone(
            bFile ? "./main/" + path : path,
            id, true, hook1,
            function() {
                /*if (bFile) {*/
                //                $.upStyle();
                /*$.trans();*/
                /*} */
                if (hook2) hook2();
            }
        );
    },
    //    从lib搬过来的方法，里面涉及到对id的判断，所以复制了一份并修改
    //    调用$.io读取指定路径的文件，如果成功，把数据填充到指定div
    //    失败则调用err报错
    //    如果id是某些特定id，证明需要异步调用io，所以io的参数noquit为true
    //    如果参数html是html代码，则直接填充
    tpLoadPhone: function(html, id, resize, hook1, hook2, midhook) {
        var con = $.id(id);
        if (html.indexOf("<") < 0) {
            $.io(html, false, function(ret) {
                if (typeof ret !== "number")
                    $.fill(con, ret, hook1, hook2, resize, midhook);
                else
                    $.err(id, ret);
            }, null, id == "ban" || id == "menu" || id == "help" || id == "bot" || id == "topPhone");
        } else
            $.fill(con, html, hook1, hook2, resizet, midhook);
    },
    //    //    切换背景色，参数是类名
    //    changeBodyColor: function(className) {
    //        $('#PhoneBody').removeClass().addClass(className);
    //    },

    /* added by zsj, 2015/5/7 */
    //hide the whole block of the seleted element
    hideBlock: function(id) {
        var target = $('#' + id).addClass('nd');
        var scrollDecrease = target.height();
        //section
        var targetBox = target.parents('.section-box').last();
        if (targetBox.length !== 0) {
            targetBox.addClass('nd');
            var targetContainer = targetBox.parents('.section-container').last();
            if (targetContainer.length !== 0 && targetContainer.children().length == 1) {
                targetContainer.addClass('nd');
                scrollDecrease = targetContainer.height();
            }
        } else {
            targetBox = target.parents('.section-title').last();
            if (targetBox) {
                targetBox.addClass('nd');
                scrollDecrease = targetBox.height();
            }
        }

        $('body').get(0).scrollTop -= scrollDecrease;
    },

    showBlock: function(id) {
        var target = $('#' + id).removeClass('nd');
        var scrollIncrease = target.height();
        //section
        var targetBox = target.parents('.section-box').last();
        if (targetBox.length !== 0) {
            targetBox.removeClass('nd');
            var targetContainer = targetBox.parents('.section-container').last();
            if (targetContainer.length !== 0) {
                targetContainer.removeClass('nd');
                scrollIncrease = targetContainer.height();
            }
        } else {
            targetBox = target.parents('.section-title').last();
            if (targetBox.length !== 0) {
                targetBox.removeClass('nd');
                scrollIncrease = targetBox.height();
            }
        }

        //        显示后增加滚动，避免内容在屏幕外
        $('body').get(0).scrollTop += scrollIncrease;
    },

    disableBlock: function(id) {
        var target = $('#' + id);
        if ($('#blockade_' + id).length > 0) {
            $('#blockade_' + id).show();
        }
        else {
            if (target.hasClass('section-container') == true) {
                target.css('position', 'relative').append($('<div id="blockade_' + id + '" class="blockade inside"></div>'));
            }
            else {
        var parentDiv = target.parents('.section-container').last().css('position', 'relative');
        if ($('#blockade_' + id).length == 0) {
                    target.after($('<div id="blockade_' + id + '" class="blockade outside"></div>'));
                }            
            }
        }

        if ($('#blockade_' + id).hasClass('outside')) {
        var newTop = target.position()['top'] + target.css('margin-top').replace('px', '')*1 + target.css('padding-top').replace('px', '')*1 + 'px';
        var newLeft = target.position()['left'] + target.css('margin-left').replace('px', '')*1 + target.css('padding-left').replace('px', '')*1 + 'px';
        $('#blockade_' + id).removeClass('nd').css({
            'width': target.css('width'),
            'height': target.css('height'),
            'top': newTop,
            'left': newLeft
        });
        }

    },

    enableBlock: function(id) {
        var target = $('#' + id);
        if ($('#blockade_' + id).length > 0) {
            $('#blockade_' + id).hide();
            if ($('#blockade_' + id).hasClass('section-container')) {
                target.css('position', '');
            }
            else {
                target.parents('.section-container').last().css('position', '');
            }
        }

        // $('#blockade_' + id).addClass('nd').css({
        //     'width': target.css('width'),
        //     'height': target.css('height'),
        //     'top': target.position()['top'] + target.css('margin-top').replace('px', '')*1 + target.css('padding-top').replace('px', '')*1 + 'px',
        //     'left': target.position()['left'] + target.css('margin-left').replace('px', '')*1 + target.css('padding-left').replace('px', '')*1 + 'px'
        // });
    },

    errorTipMobile: function(id, content) {
        var str;
        var errno = content;
        if ($.isNumeric(errno)) {
            if (e_str[errno]) {
                str = e_str[errno];
            } else {
                str = e_str[ERR_UNKOWN];
            }
        } else {
            str = content;
        }

        var tips = $('<p class="section-errTips">' + str + '</p>');
        if ($('#' + id).attr('type') == 'checkbox') {
            tips.addClass('section-checkboxErrTips');
        }
        var container = $('#' + id).parents('.section-box').last().after(tips);

    },

    initTurnPage: function(target) {
        $(target).addClass('grow-part');
        var parentDiv = $(target).parents('.section-box').last();
        if (parentDiv.length == 0) {
            $(target).wrap('<div></div>');
            parentDiv = $(target).parent();
        }
        var icon = $('<span class="sprite c-arrow-gray-right"></span>').addClass('fixed-part');
        icon.appendTo(parentDiv.addClass('turnPageParent flexible-box'));

        (parentDiv.parent()).bind('click', function() {
            if ($(target).attr('url') && $(target).attr('url') !== '#')
                $.loadPhoneMain($(target).attr('url'));
        });
    },

    checkAllInput: function(argument) {
        var allInputBox;
        if (argument == '' || argument == undefined) {
            allInputBox = $('.inputBox-mobile-div>input[type="text"], input[type="password"], .inputBox-mobile-following-div>input[type="text"]');
        } else {
            allInputBox = $('#' + argument).find('input[type="text"], input[type="password"]');
        }
        var okFlag = true;
        $.each(allInputBox, function() {
            var checkResult = $(this).inputBoxMobile('checkValue');
            if (checkResult == false) {
                $.stopWaitingMobile();
                okFlag = false;
                $(this).focus();
                $(this).blur();
                return false;
            }
        });
        return okFlag;
    },

    addRemoveIcon: function(target) {
        var div = $('<div class="icon-remove-div"></div>');
        $('<span class="icon-remove sprite b-remove"></span>').appendTo(div);
        $('<span class="text">' + $.tpLang.table_str.safelyRemove + '</span>').appendTo(div);
        $(target).before(div);
        return div;
        /*        if (func !== undefined && func !== null) {
                    div.on('click', function() {
                        if (typeof func == 'function') {
                            func.call();
                        }
                    });
                }*/
    },


    /*
    example html: 
        <div class="device-div">
            <div class="device-label">
                <span class="icon-usb"></span> <!-- 注意把class更改为你需要显示的设别图标的class -->
                <span class="text">device name</span> <!-- 如果没有此项，则去掉这个元素 -->
            </div>
            <div class="device-content">
                <div class="device-line"> 
                    <div class="device-info">
                        <div class="device-info-name">name1</div>
                        <div class="device-info-item">
                            <span class="device-info-title">title22:</span>
                            <span class="device-info-text">text00000</span>
                        </div>
                        <div class="device-info-item">
                            <span class="device-info-title">title1111:</span>
                            <span class="device-info-text">text1</span>
                        </div>
                    </div>
                    <div class="op"> <!-- 跟在后面的checkbox之类的，不需要则去掉这个元素 -->
                        <input type="checkbox" id="testDevice" /> <!-- 初始化插件时option'hasTitle': false -->
                    </div>
                </div>
                <div class="device-line"> <!-- 一个设备图标对应多块信息（比如一个usb分了几个卷）的情况 -->
                    <div class="device-info">
                        <div class="device-info-name">name2</div>
                        <div class="device-info-item">
                            <span class="device-info-title">title0:</span>
                            <span class="device-info-text">text222</span>
                        </div>
                        <div class="device-info-item">
                            <span class="device-info-title">title1111:</span>
                            <span class="device-info-text">text1</span>
                        </div>
                    </div>
                    <div class="op">
                        <input type="checkbox" id="testDevice2" />
                    </div>
                </div>
            </div>
        </div>

    usage:
            var allDevices = $('.device-div');
            $.each(allDevices, function() {
                $.addDeviceBlock(this);
            });
    */
    addDeviceBlock: function(target) {
        var contentDiv = $(target).find('.device-content').first();
        var lineDiv = contentDiv.find('.device-line');

        var nameDiv = contentDiv.find('.device-info-name');
        nameDiv.removeClass('device-info-name').wrap('<div class="device-info-name"></div>');
        var titleDiv = contentDiv.find('.device-info-title');
        titleDiv.removeClass('device-info-title').wrap('<div class="device-info-title"></div>');
        var textDiv = contentDiv.find('.device-info-text');
        textDiv.removeClass('device-info-text').wrap('<div class="device-info-text"></div>');
        $.each(lineDiv, function() {
            if ($(this).index() + 1 !== lineDiv.length) {
                $(this).addClass('notEnd');
            }
        });

        var parentDiv = contentDiv.parents('.device-div').last();
        var heightParent = parentDiv.css('height').replace('px', '');
        var labelDiv = $(target).find('.device-label').first();
        var heightLabel;
        if (labelDiv.length > 0) {
            heightLabel = labelDiv.css('height').replace('px', '');
        }
        else {
            $(target).addClass('noLabel')
        }
        var labelTop = (heightParent - heightLabel) * 0.5;
        if (labelTop < 0) {
            labelTop = 0;
            parentDiv.css({
                'height': heightLabel + 'px'
            });
        }
        labelDiv.css({
            'top': labelTop + 'px'
        });
    }

});

$(document).ready(function() {
    if (!$.isMobile()) {
        return;
    }
    if ($.local)
        $.io($.params, true);

    var infoobj = $.act(ACT_GET, IGD_DEV_INFO, null, null, ["modelName", "description", "X_TP_IsFD"]);
    var ethobj = $.act(ACT_GET, ETH_SWITCH, null, null, ["numberOfVirtualPorts"]);
    var sysmodeobj;
    var routerModeObj;
    if (INCLUDE_WAN_MODE) {
        sysmodeobj = $.act(ACT_GET, SYS_MODE, null, null, ["mode"]);
    }
    if (INCLUDE_ROUTER_MODE) {
        routerModeObj = $.act(ACT_GET, ROUTER_MODE, null, null, null);
    }

    $.act(ACT_CGI, "/cgi/info");

    $.exe();
    if ($.local) {
        infoobj = {
            modelName: "TD-W89741N",
            description: "ADSL+ Router"
        };
        ethobj = {
            numberOfVirtualPorts: 4
        };
        sysmodeobj = {
            mode: "ETH"
        };
    }
    $.model = infoobj.modelName;
    $.desc = infoobj.description;
    $.ports = parseInt(ethobj.numberOfVirtualPorts, 10);

    if (INCLUDE_WAN_MODE) {
        $.sysMode = sysmodeobj.mode;
    } else {
        $.sysMode = "ETH";
    }

    if (INCLUDE_ROUTER_MODE) {
        $.routerMode = routerModeObj.mode;
    }

    try {
        if ($.model) document.title = $.model;
    } catch (e) {}
    $.isFD = infoobj.X_TP_IsFD;

});
