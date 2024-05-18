
$.widget('tp.flipSwitch', {
    options: {
        on: null,
        disabled: null,
        hasTitle: false,
        title: null
    },

    _create: function() {
        this.parentClass = 'flipSwitch-div';
        this.titleClass = 'flipSwitch-title';
        this.basicClass = 'flipSwitch-mobile';
        this.labelClass = 'flipSwitch-label';


        var checkboxTmp = $(this.element);
        if ((checkboxTmp.parent()).hasClass('checkbox-mobile')) {
            checkboxTmp.checkboxMobile('destroy');
        }

        //parent div
        this.parentDiv = $(this.element).parent();
        var thisDiv = this.parentDiv;


        if (this.options.hasTitle == true) {
            (this.parentDiv).addClass(this.parentClass);
            //title
            var titleTmp = thisDiv.find('div').first();
            titleTmp.addClass(this.titleClass);

            if (this.options.title !== null) {
                titleTmp.html(this.options.title);
            }
        } else {
            if (this.options.title !== null) {
            }
        }

        //mask
        if (document.getElementById('waitingMask')) {} else {
            var maskStr = '<div id="waitingMask"> </div>';
            $(maskStr).appendTo($('body'));
        }


        //create the flipBtn
        checkboxTmp.addClass('checkbox-hide');
        $(this.element).wrap('<div class="' + this.basicClass + '"></div>');
        var flipBtn = $('<label class="' + this.labelClass + '" for="' + checkboxTmp.prop('id') + '"></label>');
        checkboxTmp.after(flipBtn);
        var str = '<div class="flipSwitch-label-outside" ><div class="flipSwitch-label-inside" ></div></div>';
        $(str).appendTo(flipBtn);


        var options = this.options;
        //options.disabled
        if (options.disabled === null) {
            options.disabled = checkboxTmp.prop('disabled');
        } else {
            checkboxTmp.prop('disabled', options.disabled);
        }
        //options.on
        if (options.on === null) {
            if (checkboxTmp.is(':checked')) {
                options.on = true;
            } else {
                options.on = false;
            }
        } else {
            checkboxTmp.prop('checked', options.on);
        }

        //touch
        var that = this;
        var wrapDiv = $(this.element).parent();
        var x = 0;
        var change = 0;
        var bgTarget = wrapDiv.find('.flipSwitch-label-outside').first();
        var moveTarget = wrapDiv.find('.flipSwitch-label-inside').first();
        var time = 0;
        flipBtn.bind('click' + this.eventNamespace, function(e) {
                if (that.options.disabled) return false;
                e.preventDefault();
            })
            .bind('touchstart' + this.eventNamespace, function(e) {
                if (that.options.disabled) return false;
                x = e.originalEvent.targetTouches[0].pageX;
                change = 0;
                time = e.timeStamp;
            })
            .bind('touchmove' + this.eventNamespace, function(e) {
                if (that.options.disabled) return false;
                change = e.originalEvent.targetTouches[0].pageX - x;
                change = Math.max(Math.min(20, change), 0);
                bgTarget.css('background-position', change + 230 + 'px');
                moveTarget.css('margin-left', change + 'px');
                y = e.originalEvent.targetTouches[0].pageX;
            })
            .bind('touchend' + this.eventNamespace, function(e) {
                if (that.options.disabled) return false;
                var isOn = wrapDiv.hasClass('toggleOn');

                time = (e.timeStamp - time) * 0.001;
                if (change == 0 && time < 0.5) {
                    wrapDiv.toggleClass('toggleOn');
                } else {
                    if (change < 10) {
                        wrapDiv.removeClass('toggleOn');
                    } else {
                        wrapDiv.addClass('toggleOn');
                    }
                }

                var statusChanged = false;
                if (wrapDiv.hasClass('toggleOn') !== isOn) {
                    statusChanged = true;
                }

                if (wrapDiv.hasClass('toggleOn')) {
                    moveTarget.animate({
                        'margin-left': '1.3rem'
                    }, 50);
                    bgTarget.animate({
                        'background-position': '250px'
                    }, 50);
                    checkboxTmp.prop('checked', true);
                    //options.on
                    that.options.on = true;
                    //toggleOnDo

                    if (statusChanged) {
                        $('#waitingMask').css('display', 'block');
                        $(that.element).trigger('on.flipSwitch');
                        $('#waitingMask').css('display', 'none');
                    }


                } else {
                    moveTarget.animate({
                        'margin-left': '0px'
                    }, 50);
                    bgTarget.animate({
                        'background-position': '210px'
                    }, 50);
                    checkboxTmp.prop('checked', false);
                    //options.on
                    that.options.on = false;
                    //toggleOffDo

                    if (statusChanged) {
                        $('#waitingMask').css('display', 'block');
                        $(that.element).trigger('off.flipSwitch');
                        $('#waitingMask').css('display', 'none');
                    }

                }
            });

        //expand the touch area        
        var divForTouch = $('<div class="forTouch"></div>');
        var labelTarget = wrapDiv.find('label');
        var labelLeft = ((labelTarget).position())['left'];
        var labelTop = ((labelTarget).position())['top'];
        divForTouch.css({
            'left': labelLeft - 15 + 'px',
            'top': labelTop - 8 + 'px'
        });
        divForTouch.appendTo(wrapDiv);
        divForTouch.bind('touchend' + this.eventNamespace, function(e) {
            if (that.options.disabled) return false;

            var offToOn = wrapDiv.hasClass('toggleOn') ? false : true;

            if (offToOn) {
                checkboxTmp.prop('checked', true);
                //options.on
                that.options.on = true;

                moveTarget.animate({
                    'margin-left': '1.3rem'
                }, 50);
                bgTarget.animate({
                    'background-position': '250px'
                }, 50);

                $('#waitingMask').css('display', 'block');
                $(that.element).trigger('on.flipSwitch');
                $('#waitingMask').css('display', 'none');
            } else {
                checkboxTmp.prop('checked', false);
                //options.on
                that.options.on = false;

                moveTarget.animate({
                    'margin-left': '0px'
                }, 50);
                bgTarget.animate({
                    'background-position': '210px'
                }, 50);

                $('#waitingMask').css('display', 'block');
                $(that.element).trigger('off.flipSwitch');
                $('#waitingMask').css('display', 'none');
            }
            that.refresh();
        });

    },

    _init: function() {
        this.refresh();
    },

    refresh: function() {
        var options = this.options;
        var thisDiv = this.parentDiv;

        if (this.options.hasTitle) {
            var sectionBox = $(this.element).parents('.section-box').last();
            if (sectionBox.parent().hasClass('section-container') && sectionBox.index() == 0) {
                sectionBox.parent().addClass('noPaddingTop');
            }
        }

        //options.disabled
        if (options.disabled == true) {
            ($(this.element).parents('.section-container').last()).addClass('flipswitch-disabled');
            thisDiv.addClass('flipswitch-disabled');
        } else {
            ($(this.element).parents('.section-container').last()).removeClass('flipswitch-disabled');
            thisDiv.removeClass('flipswitch-disabled');
        }
        //options.on
        if (options.on == true) {
            ($(this.element).parent()).addClass('toggleOn');
        } else {
            ($(this.element).parent()).removeClass('toggleOn');
        }
    },

    _setOption: function(key, value) {
        var options = this.options;
        var checkboxTmp = (($(this.element).parent()).find('input[type="checkbox"]')).first();
        var flipBtn = (($(this.element).parent()).find('label')).first();
        var thisDiv = this.parentDiv;

        //options.disabled
        if (key === 'disabled') {
            checkboxTmp.prop('disabled', value);
            if (value == true) {
                ($(this.element).parent()).addClass('flipswitch-disabled');
                thisDiv.addClass('flipswitch-disabled');
            } else {
                ($(this.element).parent()).removeClass('flipswitch-disabled');
                thisDiv.addClass('flipswitch-disabled');
            }
        }
        //options.on
        if (key === 'on') {
            checkboxTmp.prop('checked', value);
            if (value == true) {
                ($(this.element).parent()).addClass('toggleOn');
            } else {
                ($(this.element).parent()).removeClass('toggleOn');
            }
        }
        //options.title
        if (key === 'title') {
            if (options.hasTitle !== true) {
            } else {
                var newTitle = value;
                if (typeof newTitle == 'string') {
                    if (newTitle.indexOf('</') < 0 && newTitle.indexOf('/>') < 0) {
                        newTitle = $('<span>' + newTitle + '</span>');
                    } else {
                        newTitle = $(value);
                    }
                } else {
                    newTitle = value;
                }
                value = newTitle;
                var tempDiv = $(this.element).parents('.flipSwitch-div').first();
                (tempDiv.find('.flipSwitch-title').first()).html(value);
            }
        }


        this.options[key] = value;

        this.refresh();
        return this;
    },

    _destroy: function() {
        var parentClass_all = this.parentClass + ' disabled flipswitch-disabled';
        var basicClass_all = this.basicClass + ' toggleOn disabled flipswitch-disabled';

        var thisDiv = this.parentDiv;

        if (this.options.hasTitle) {
            thisDiv.removeClass(parentClass_all);
            thisDiv.find('.flipSwitch-title').removeClass(this.titleClass);
        }

        ($(this.element).parent()).removeClass(basicClass_all);
        $(this.element).unwrap();

        var inputTmp = (($(this.element).parent()).find('input[type="checkbox"]').first());
        inputTmp.removeClass('checkbox-hide');

        var flipBtn = (($(this.element).parent()).find('label.' + this.labelClass)).first();
        flipBtn.remove();

        $('#waitingMask').remove();
    }

});

var flipSwitch = $.tp.flipSwitch;
