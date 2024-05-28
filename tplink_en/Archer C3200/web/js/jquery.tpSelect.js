(function($) {
    'use strict';
    $.fn.tpSelect = function(options) {
        options = $.extend({
            render: function(option) {
                return $("<li data-val='" + option.val() + "'>" + option.text() + "</li>");
            },
            className: '',
            refresh: 0
        }, options);

        return this.each(function() {

            var tpselect = $(this).data('tpSelect');
            var keyboardControlFlag = false;
            var namespace = options.namespace || 'tpSelect';
            namespace = '.' + namespace;
            if (!tpselect) {
                $(this).data('tpSelect', this.id);
                
            } else if (tpselect && options.refresh == 1) {
                $('#' + '_' + this.id).remove();
            } else {
                return;
            }

            var select = $(this);
            var bTmp = select.prev('b');
            var title = bTmp.html();
            var bClass = bTmp.prop('class');
            bTmp.addClass('nd');

            if (title){
            var str = '<div class="select-title"><label class="label-title">' + title +
                '</label></div><div class="tp-select"><div class="select-box"></div><div class="select-icon-container"><span class="select-icon"></span></div></div>';
            } else {
                var str = '<div class="tp-select"><div class="select-box"></div><div class="select-icon-container"><span class="select-icon"></span></div></div>';
            }
            var selectBoxContainer = $('<div>', {
                /* class: 'select-container',*/
                html: str
            });
            selectBoxContainer.addClass('select-container');
            selectBoxContainer.prop('id', '_' + this.id);

            /* add size class */
            selectBoxContainer.addClass(select.prop('class'));
            selectBoxContainer.find('div.select-title').addClass(bClass);

            if (select.prop('disabled')) {
                selectBoxContainer.addClass('disabled');
            }
            var dropDown = $('<ul>', {
                /* class: 'dropDown'*/
            });
            dropDown.addClass('drop-down');

            var selectBox = selectBoxContainer.find('.select-box');
            var iconContainer = selectBoxContainer.find('.select-icon-container');

            if (options.className) {
                dropDown.addClass(options.className);
            }

            select.find('option').each(function(i) {
                var option = $(this);

                var li = options.render(option);

                li.click(function() {

                    selectBox.html(option.text());
                    dropDown.trigger('hide');

                    li.siblings('li').removeClass('selected');
                    li.addClass('selected');

                    // When a click occurs, we add selected option to select's data.
                    if (select.data('value') === option.val()) {
                        return;
                    }
                    select.data('value', option.val());
                    select.data('text', option.text());
                    defaultSelectItem = $(this);
                    select.click();
                    return false;
                }).mouseenter(function() {
                    if (keyboardControlFlag) {
                        keyboardControlFlag = false;
                    } else {
                        dropDown.children('.hover').removeClass('hover');
                        $(this).addClass('hover');
                    }
                }).mouseleave(function() {
                    $(this).removeClass('hover');
                });
                if (i == select.prop('selectedIndex')) {
                    selectBox.html(option.text());
                    li.click();
                }

                // Skip the element, if it has 'skip' data.
                if (option.data('skip')) {
                    return true;
                }

                dropDown.append(li);
            });
            selectBoxContainer.find('.tp-select').append(dropDown.hide());
            select.hide().after(selectBoxContainer);

            //ban backspace
            function banBackSpace(e) {
                var ev = e || window.event;
                var obj = ev.target || ev.srcElement;
                var t = obj.type || obj.getAttribute('type');
                var vReadOnly = obj.getAttribute('readonly');
                var vEnable = obj.getAttribute('enabled');
                vReadOnly = (vReadOnly === undefined) ? false : vReadOnly;
                vEnable = (vEnable === undefined) ? true : vEnable;
                var flag1 = (ev.keyCode == 8 && (t == 'password' || t == 'text' || t == 'textarea') && (vReadOnly == true || vEnable == true));
                var flag2 = (ev.keyCode == 8 && t != 'password' && t != 'text' || t != 'textarea');
                if (flag2 || flag1)
                    return false;
            }

            //smart select
            var selectStr = '';
            var searchBar;
            var defaultSelectItem = dropDown.children('.selected');
            var selectItem;
            var hasMatched = false;

            function smartSelect(event) {
                $(document).on('keypress' + namespace, banBackSpace).on('keydown' + namespace, banBackSpace);
                $(window).on('keypress' + namespace, banBackSpace).on('keydown' + namespace, banBackSpace);
                keyboardControlFlag = true;
                if (event === undefined) {
                    selectStr = '';
                    searchBar.text(selectStr);
                } else {
                    if ($.code2key(event) == 'back') {
                        selectStr = selectStr.substr(0, selectStr.length - 1);
                        searchBar.text(selectStr);
                    } else if ($.code2key(event) == 'enter') {
                        selectItem = dropDown.children('.hover').length > 0 ? dropDown.children('.hover') : defaultSelectItem;
                        selectBox.html(selectItem.text());
                        defaultSelectItem = selectItem;
                        // When a click occurs, we add selected option to select's data.
                        //                        if (select.data('value') === selectItem.attr('data-val')) {
                        //                            return;
                        //                        }
                        select.data('value', selectItem.attr('data-val'));
                        select.data('text', selectItem.text());
                        select.click();
                        dropDown.trigger('hide');
                        return;
                    } else if (event.keyCode === 38 || event.keyCode === 40) {
                        //                        找到hover或selected
                        var oldOne = dropDown.children('li.hover').length > 0 ? dropDown.children('li.hover') : dropDown.children('li.selected');
                        var newOne;
                        //                        如果旧项不是隐藏的，且是在展示列表的可见范围内的。选中它的上一项或下一项。否则直接选中可见列表的第一�
                        if (oldOne.length > 0 && !oldOne.hasClass('nd') && oldOne.position().top < dropDown.height()) {

                            if (event.keyCode === 38) {
                                //                                不带nd的，不是最后一个节点（对父节点而言是第一个节点，但在prev中反过来），第一个节�
                                newOne = oldOne.prevAll(':not(.nd):not(:last):first');
                            } else if (event.keyCode === 40) {
                                newOne = oldOne.nextAll(':not(.nd):first');
                            }

                            if (newOne.length > 0) {
                                //                                影响变量selecteItem
                                dropDown.children('.hover').removeClass('hover');
                                newOne.addClass('hover');
                                //                                影响样式
                                //                              控制滚动条的位置�
                                if (newOne.position().top < 0) {
                                    dropDown.get(0).scrollTop = newOne.position().top - dropDown.children(':first').position().top;
                                } else if (newOne.position().top > dropDown.height() - newOne.height()) {
                                    dropDown.get(0).scrollTop = newOne.position().top - dropDown.children(':first').position().top - dropDown.height() + newOne.height();
                                }
                            }
                        } else {
                            oldOne.removeClass('hover');
                            dropDown.children(':not(.nd):eq(1)').addClass('hover');
                        }
                    } else {
                        selectStr += $.code2key(event);
                        searchBar.text(selectStr);
                        //                        滚动条回到顶�
                        dropDown.get(0).scrollTop = 0;
                    }
                }
                var drop_children = dropDown.children();
                var drop_children_show = [];
                for (var i = 0; i < drop_children.length; i++) {
                    var quote = /([^\w])/g;
                    var patternStr = selectStr.replace(quote, '\\$1');
                    var regex = new RegExp(patternStr, 'g');
                    var rs = regex.test(drop_children.eq(i).text().toUpperCase());
                    if (!rs) {
                        drop_children.eq(i).addClass('nd');
                    } else {
                        drop_children.eq(i).removeClass('nd');
                        drop_children_show.push(drop_children.eq(i));
                    }
                    //                    drop_children.eq(i).removeClass('selected');
                }

            }

            //select init

            (function selectInit() {
                searchBar = $('<li>', {
                    html: ''
                });
                searchBar.css({
                    'cursor': 'default',
                    'border-bottom': '1px solid #ccc'
                });
                dropDown.children().eq(0).before(searchBar);
                searchBar.mouseenter(function() {
                    $(this).css({
                        'background': '#fff',
                        'color': '#4d4d4d'
                    })
                });
                searchBar.click(function(e) {
                    e.preventDefault();
                    return false;
                });
            })();

            function selectReset() {
                searchBar.text('');
                selectStr = '';
                smartSelect();
                $(document).off('keypress' + namespace, banBackSpace).off('keydown' + namespace, banBackSpace);
                $(window).off('keypress' + namespace, banBackSpace).off('keydown' + namespace, banBackSpace);
            }

            //            var tips;
            //            var lastDrop = dropDown.children().last();
            //            dropDown.children().each(function () {
            //                $(this).hover(
            //                    function () {
            //                        tips = $('<div>', {
            //                            html: '<span class="widget-error-tips-delta"></span>' +
            //                                '<div class="widget-error-tips-wrap">' +
            //                                '<div class="content error-tips-content">' +
            //                                '<span >' + $(this).text() + '</span>' +
            //                                '</div>' +
            //                                '</div>',
            //                            'class': 'widget-error-tips'
            //                        })
            //                        $(this).append(tips);
            //                        if ($(this)[0] === lastDrop[0]) {
            //                            dropDown.append($('li', {html: '1'}))
            //                        }
            //                        $('.widget-error-tips').toggle("slow");
            //                    },
            //                    function () {
            //                        if ($(this) === lastDrop) {
            //                            dropDown.children().last().remove();
            //                        }
            //                        $('.widget-error-tips').remove();
            //                    }
            //                );
            //            });
            // Binding custom show and hide events on the dropDown:

            dropDown.on('show', function() {
                if (dropDown.is(':animated')) {
                    return false;
                }
                selectBox.addClass('expanded');
                dropDown.slideDown('fast', function() {
                    //                滚动条到合适位�
                    dropDown.get(0).scrollTop = tmp.position().top - dropDown.children(':first').position().top - dropDown.height() / 2;
                });
                var rows = dropDown.children('li');
                rows.each(function() {
                    if ($(this).height() > 40) {
                        $(this).css('line-height', '20px');
                    }
                });
                //               还原选中项的样式
                dropDown.children().removeClass('selected');
                var tmp = dropDown.children('[data-val="' + select.data('value') + '"]').addClass('selected');

                $(document).on("keyup.tpSelect", smartSelect);

            }).on('hide', function() {
                if (dropDown.is(':animated')) {
                    return false;
                }
                selectBox.removeClass('expanded');
                dropDown.slideUp('fast');
                $(document).off("keyup.tpSelect", smartSelect);
                selectReset();
            }).on('toggle', function() {
                if (selectBox.hasClass('expanded')) {
                    dropDown.trigger('hide');
                } else {
                    dropDown.trigger('show');
                }
            });

            // Do not return, cuz if there are more than one select, click one, another should slide up.
            selectBox.click(function() {
                if (select.prop('disabled')) {
                    return false;
                }
                dropDown.trigger('toggle');
                //return false; 
            });

            iconContainer.click(function() {
                if (select.prop('disabled')) {
                    return false;
                }
                dropDown.trigger('toggle');
                //return false;
            });

            $(document).on('click' + namespace, function() {
                dropDown.trigger('hide');
                //unbind the keyboard event
            });
        });
    }

})(jQuery);
