/**
 * Created by hwl on 2015/4/13.
 */
$.widget('tp.toolBar', {
    options: {
//        默认隐藏
        hide: true
    },

    _create: function() {
        //        如果隐藏
        if (this.options.hide) {
            this.hide();
        } else {
            this.show();
        }

        if (!this.options.buttonGroup) {
//buttonGroup中的每个对象的对象名要和id后半部分相同
            this.options.buttonGroup = {
            selectAll: {
//                按钮的id，调用页面可以通过id找到该按钮，绑定click事件
                id: 'tb-selectAll',
                //                按钮的文本
                text: $.tpLang.m_str.selectall,
                //                默认执行的方法，可选
                default: function() {
                    $('.edit-list.select-list').editList('selectAll');
                }
            },
            add: {
                id: 'tb-add',
                text: $.tpLang.m_str.add,
                default: function() {
                }
            },

            delete: {
                id: 'tb-delete',
                text: $.tpLang.m_str.del,
                default: function() {
                    var checked = $('.edit-list.select-list').find('.select-li-div-checkbox.checked');
                    var selectedElement = checked.siblings('.li-content-div');
                    $.each(selectedElement, function(){
                        deleteElement(this);
                    });
                }
            }
        }
        }
        var btG = this.options.buttonGroup;
//        统计按钮个数
        var liCount = 0;

        var html = '';
        html += '<ul>';
        for (var bt in btG) {
            liCount++;
            html += '<li>';
            html += '<a href="javascript:void(0);" id="' + btG[bt].id + '">' ;
            html += '<span class="sprite d-' + btG[bt].id.substr(3) + '"></span><span class="botP-toolBar-text">' + btG[bt].text +'</span>';
            html += '</a>';
            html += '</li>';
        }
        html += '</ul>';

        this.element.empty().append(html);
        //        使每个li的宽度相等
        this.element.find('ul li').css('width', 100 / liCount + '%');

        this._registerHandlers();
    },

    _setOption: function(key, value) {
        if (key === "hide") {
            if (value === true) {
                this.hide();
            } else if (value === false) {
                this.show();
            }
        }

    },
    _registerHandlers: function() {
        var self = this;
//        var move = false;
        this.element.find('a').bind('touchstart.toolBar', function(evt) {
//            move = false;
            $(this).addClass('touched');
        }).bind('touchend.toolBar', function(evt) {
            $(this).removeClass('touched');
        }).bind('touchcancel.toolBar', function(evt) {
            $(this).removeClass('touched');
        }).bind('touchmove.toolBar', function(evt) {
//            move = true;
            $(this).removeClass('touched');
        }).bind('click.toolBar', function(evt) {
//            evt.preventDefault();
            var objName = $(this).attr('id').substr(3);
//            调用当前按钮的default方法
            if ( !! self.options.buttonGroup[objName] && !! self.options.buttonGroup[objName].default &&
                typeof (self.options.buttonGroup[objName].default) == "function") {
                self.options.buttonGroup[objName].default();
            }
            $(this).removeClass('touched');
        });
    },

    hide: function() {
        $('.hasToolBar').removeClass('hasToolBar');
        this.element.hide();
    },

    show: function() {
        $('#mainPhone').addClass('hasToolBar');
        this.element.show();
    },
    _destroy: function() {
        $('.hasToolBar').removeClass('hasToolBar');
    }
});