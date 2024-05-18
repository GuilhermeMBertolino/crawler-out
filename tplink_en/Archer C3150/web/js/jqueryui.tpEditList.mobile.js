
function prevent_default(e) {
    e.preventDefault();
}

function disable_scroll() {
    $(document).bind('touchmove', prevent_default);
}

function enable_scroll() {
    $(document).unbind('touchmove', prevent_default);
}


function deleteElement(element) {
    $.startWaitingMobile($.tpLang.m_str.waiting);
    $(element).parents('li').slideUp('', function() {
        $(element).trigger('delete.editlist');
        $(this).remove();
    });

    $.stopWaitingMobile();

}

//this widget makes a div element be swiped left
$.widget('tp.swipeLiDiv', {
    options: {
        btnWidth: 75,
        btnText: $.tpLang.m_str.del
    },
    _create: function() {
        this.basicClass = 'swipe-li-div';
        this.parentClass = 'swipe-li-div-parent';
        var thisDiv = $(this.element).addClass(this.basicClass);
        var thisParent = ($(thisDiv).parent()).addClass(this.parentClass);

        var btnWidth = this.options.btnWidth;
        var minSwipeWidth = this.options.btnWidth * 0.4;

        //add a delete button
        thisDiv.before($('<div class="behind"></div>'));
        var divBehind = thisParent.find('div.behind');
        var btnDelete = $('<a class="btnOnRight"><span></span></a>');
        btnDelete.appendTo(divBehind);

        //touch
        var x = 0;
        //bind once
        var bindOnce = 0;
        thisDiv.bind('touchstart' + this.eventNamespace, function(e) {
                var opens = $('.swipe-li-div-parent > div.open');
                $.each(opens, function() {
                    if (e.currentTarget.id !== this.id) {
                        $(this).removeClass('open');
                    }
                    $(this).css('left', '0px');
                })
                x = e.originalEvent.targetTouches[0].pageX;
                bindOnce = 0;
            })
            .bind('touchmove' + this.eventNamespace, function(e) {
                $(e.currentTarget).addClass('open');
                var change = e.originalEvent.targetTouches[0].pageX - x;
                //at most the div can be swiped left [btnWidth]px
                change = Math.min(Math.max(-1 * btnWidth, change), 0);
                e.currentTarget.style.left = change + 'px';
                // disable scroll once we hit 10px horizontal slide
                if (bindOnce === 0) {
                    if (change < -10) disable_scroll();
                    bindOnce = 1;
                }
            })
            .bind('touchend' + this.eventNamespace, function(e) {
                e.preventDefault();
                if (thisDiv.hasClass('open') || thisDiv.css('left') != '0px') {
                    var left = parseInt(e.currentTarget.style.left);
                    var new_left;
                    if (left < -1 * minSwipeWidth) {
                        new_left = '-' + btnWidth + 'px';
                    } else {
                        new_left = '0px';
                    }
                    // e.currentTarget.style.left = new_left
                    $(e.currentTarget).animate({
                        left: new_left
                    }, 200);
                    enable_scroll();
                    if (thisDiv.css('left') == '0px') {
                        thisDiv.removeClass('open');
                    }
                    return false;
                }
                else {
                    thisDiv.trigger('click');
                    return false;
                }
            });

        var that = this;
        (thisParent.find('a.btnOnRight')).bind('click' + this.eventNamespace, function(e) {
            e.preventDefault();
            deleteElement(that.element);
        });
    },

    _init: function() {
        this.refresh();
    },

    refresh: function() {
        var btnWidth = this.options.btnWidth;
        var btnText = this.options.btnText;

        var btnOnRight = (this.element.parent()).find('.btnOnRight');
        btnOnRight.css('width', btnWidth + 'px');
        (btnOnRight.find('span')).html(btnText);
    },

    _setOption: function(key, value) {

        if (key === "btnText") {
            (this.element.parent()).find('.btnOnRight span').html(value);
        }

        if (key === "btnWidth") {
            $(this.element).unbind('touchstart' + this.eventNamespace)
                .unbind('touchmove' + this.eventNamespace)
                .unbind('touchend' + this.eventNamespace);

            var btnWidth = value;
            var minSwipeWidth = btnWidth * 0.4;

            var x = 0;
            //bind once
            var bindOnce = 0;
            $(this.element).bind('touchstart' + this.eventNamespace, function(e) {
                    $('.swipe-li-div-parent > div.open').css('left', '0px').removeClass('open');
                    $(e.currentTarget).addClass('open');
                    x = e.originalEvent.targetTouches[0].pageX;
                    bindOnce = 0;
                })
                .bind('touchmove' + this.eventNamespace, function(e) {
                    var change = e.originalEvent.targetTouches[0].pageX - x;
                    //at most the div can be swiped left [btnWidth]px
                    change = Math.min(Math.max(-1 * btnWidth, change), 0);
                    e.currentTarget.style.left = change + 'px';
                    // disable scroll once we hit 10px horizontal slide
                    if (bindOnce === 0) {
                        if (change < -10) disable_scroll();
                        bindOnce = 1;
                    }
                })
                .bind('touchend' + this.eventNamespace, function(e) {
                    var left = parseInt(e.currentTarget.style.left);
                    var new_left;
                    if (left < -1 * minSwipeWidth) {
                        new_left = '-' + btnWidth + 'px';
                    } else {
                        new_left = '0px';
                    }
                    // e.currentTarget.style.left = new_left
                    $(e.currentTarget).animate({
                        left: new_left
                    }, 200);
                    enable_scroll();
                });
        }

        this.options[key] = value;

        this.refresh();
        return this;
    },

    _destroy: function() {
        $(this.element.parent().find('a.btnOnRight')).unbind('touchend' + this.eventNamespace);
        $(this.element.parent().find('div.behind')).remove();
        $(this.element).unbind('touchstart' + this.eventNamespace)
            .unbind('touchmove' + this.eventNamespace)
            .unbind('touchend' + this.eventNamespace);

        $(this.element).removeClass(this.basicClass).css({
            'left': ''
        })
        $(this.element.parent()).removeClass(this.parentClass);
    }
});

var swipeLiDiv = $.tp.swipeLiDiv;

$.widget('tp.selectLiDiv', {
    _create: function() {
        this.basicClass = 'select-li-div';
        this.parentClass = 'select-li-div-parent';
        var thisDiv = $(this.element).addClass(this.basicClass);
        var thisParent = ($(thisDiv).parent()).addClass(this.parentClass);
        var divProtect = $('<div class="protect"></div>');
        thisParent.append(divProtect);

        //checkbox
        this.checkboxClass = 'select-li-div-checkbox';
        var thisDivId = '';
        if (thisDiv.prop('id')) {
            thisDivId = thisDiv.prop('id');
        }
        var checkboxBefore = $('<input type="checkbox" id="chk_' + thisDivId + '" />');
        $(thisDiv).before(checkboxBefore);
        checkboxBefore.checkboxMobile().addClass('select-li-div-checkboxHide');
        (checkboxBefore.parent('div')).addClass(this.checkboxClass);
        divProtect.bind('click', function() {
                var divForTouch = checkboxBefore.parent().find('.forTouch').first();
                divForTouch.trigger('click');
            })
            // (checkboxBefore.parent('div')).wrap('<div class="behind"></div>');
    },

    _init: function() {
        this.refresh();
    },

    refresh: function() {

        //checkbox
        var checkboxParent = $(this.element.parent()).find('.checkbox-mobile');
        var checkboxTmp = checkboxParent.find('input[type="checkbox"]');
        (checkboxTmp).checkboxMobile('refresh');
    },

    _destroy: function() {
        var thisDiv = $(this.element).removeClass(this.basicClass);
        var thisParent = ($(thisDiv).parent()).removeClass(this.parentClass);
        thisParent.find('.protect').remove();

        //checkbox
        var checkboxParent = $(thisParent).find('.select-li-div-checkbox');
        var checkboxTmp = checkboxParent.find('input[type="checkbox"]');
        (checkboxTmp).checkboxMobile('destroy').remove();
    }
});

var selectLiDiv = $.tp.selectLiDiv;

$.widget('tp.editList', {
    options: {
        //listType can be swipeList or selectList
        listType: 'swipeList'
    },

    _create: function() {
        this.basicClass = '';
        if (this.options.listType === 'swipeList') {
            this.basicClass = 'swipe-list edit-list';
            $(this.element).addClass(this.basicClass);
            ($(this.element).find('.li-content-div')).swipeLiDiv();
        }
        if (this.options.listType === 'selectList') {
            this.basicClass = 'select-list edit-list';
            $(this.element).addClass(this.basicClass);
            ($(this.element).find('.li-content-div')).selectLiDiv();
        }
    },

    _init: function() {
        this.refresh();
    },

    refresh: function() {
        if (this.options.listType === 'swipeList') {
            ($(this.element).find('.li-content-div')).swipeLiDiv('refresh');
        }
        if (this.options.listType === 'selectList') {
            ($(this.element).find('.li-content-div')).selectLiDiv('refresh');
        }
    },

    _setOption: function(key, value) {

        if (key === 'listType') {
            if (this.options.listType !== value) {
                if (value === 'swipeList') {
                    this._destroy();
                    this.basicClass = 'swipe-list';
                    $(this.element).addClass(this.basicClass);
                    ($(this.element).find('.li-content-div')).swipeLiDiv();
                } else if (value === 'selectList') {
                    this._destroy();
                    this.basicClass = 'select-list';
                    $(this.element).addClass(this.basicClass);
                    ($(this.element).find('.li-content-div')).selectLiDiv();
                } else {
                }
            }
        }
        this.options[key] = value;

        this.refresh();
        return this;
    },

    selectAll: function() {
        if (this.options.listType === 'selectList') {
            var allTheCheckboxes = $(this.element).find('.select-li-div-parent .select-li-div-checkbox input[type="checkbox"]');
            $.each(allTheCheckboxes, function() {
                if ($(this).checkboxMobile('option', 'checked') != true) {
                    $(this).checkboxMobile({
                        'checked': true
                    });
                    $(this).trigger('check.checkboxMobile');
                }
            });

            //add class 'selectList-li-selected' to the li.select-li-div-parent
            allTheCheckboxes.each(function() {
                var thisParentLi = $(this).parents('li').last();
                thisParentLi.addClass('selectList-li-selected');
            });
        } else {
        }
    },

    _destroy: function() {
        var basicClass = '';
        if (this.options.listType === 'swipeList') {
            basicClass = 'swipe-list';

            ($(this.element).find('.li-content-div')).swipeLiDiv('destroy');
            $(this.element).removeClass(basicClass);
        }
        if (this.options.listType === 'selectList') {
            basicClass = 'select-list';

            ($(this.element).find('.li-content-div')).selectLiDiv('destroy');
            $(this.element).removeClass(basicClass);
        }
    }
});

var swipeList = $.tp.swipeList;
