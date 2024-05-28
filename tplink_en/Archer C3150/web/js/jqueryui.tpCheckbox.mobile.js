/*
if necessary, bind the checkbox element with the event 'check.checkboxMobile' / 'uncheck.checkboxMobile'，for example：
html:
<input type='checkbox' id='hideSSID' />
js:
$('#hideSSID').checkboxMobile({
    'hasTitle': true,
    'title': Hide SSID,
    'checked': true
}).bind('check.checkboxMobile', function(e) {
    console.log('check.checkboxMobile');
})
.bind('uncheck.checkboxMobile', function(e) {
    console.log('uncheck.checkboxMobile');
});

*/

$.widget('tp.checkboxMobile', {
    options: {
        label: null,
        title: null,
        disabled: null,
        checked: null,
        hasTitle: false,
        advanced: null
    },
    _create: function() {
        this.basicClass = 'checkbox-mobile';
        this.parentClass = 'checkbox-div';
        this.titleClass = 'checkbox-title';
        this.labelClass = 'checkbox-label';

        var checkbox = $(this.element).addClass('checkbox-hide');

        if (this.options.hasTitle == true) {
            (checkbox.parent()).addClass(this.parentClass);
            var titleDiv = (checkbox.parent()).find('div').first().addClass(this.titleClass);
            if (this.options.title == null) {
                this.options.title = titleDiv.find('span').last().html();
            }
        }


        //new label
        var str = '<label class="' + this.labelClass + '" for="' + checkbox.attr('id') + '">';
        str += '<span class="icon sprite"></span>';

        var ancestor = this.element.parents().last();
        var labelSelector = 'label[for="' + this.element.attr('id') + '"]';
        var labelTmp = ancestor.find(labelSelector);

        checkbox.wrap('<div></div>');
        var parentDiv = checkbox.parent();
        if (labelTmp.length !== 0) {
            //options.label
            if (this.options.label == null) {
                this.options.label = labelTmp.html();
            }
            var tag = '';
            var hasId = '';
            var classTmp = labelTmp.attr('class');
            if (classTmp !== undefined && classTmp !== '') {
                tag = classTmp;
            }
            if (labelTmp.attr('id')) hasId = 'id="' + labelTmp.attr('id') + '"';

            str += '<span class="text ' + tag + '" ' + hasId + ' >' + this.options.label + '</span></label>';
            labelTmp.remove();
        } else {
            this.options.label = null;
            // str += '<span class="text"></span></label>';
        }
        $(str).appendTo(parentDiv);

        this.buttonElement = parentDiv.find('label');

        //options.disabled
        if (typeof this.options.disabled !== 'boolean') {
            this.options.disabled = !!this.element.prop('disabled');
        } else {
            this.element.prop('disabled', this.options.disabled);
        }

        var that = this,
            options = this.options;

        //options.checked
        if (options.checked === null) {
            options.checked = checkbox.is(':checked');
        } else {
            checkbox.prop('checked', options.checked);
        }

        //basic class
        parentDiv.addClass(this.basicClass);
        //options.advanced
        if (this.options.advanced == null) {
            this.options.advanced = checkbox.attr('advanced');
        }
        if (this.options.advanced) {
            parentDiv.addClass(this.options.advanced);
            /*            if ((this.options.advanced) == 'wps') {
                            var spanText = parentDiv.find('span.text');
                            var spanIcon = parentDiv.find('span.icon');
                            spanText.appendTo(spanIcon);
                        }*/
        }

        //bind
        $(this.buttonElement).bind('click' + this.eventNamespace, function(e) {
            e.preventDefault();
            if (options.disabled) {
                return false;
            }
            if (options.checked) {
                //checkbox unchecked
                options.checked = false;
                checkbox.trigger('uncheck.checkboxMobile');
            } else {
                //checkbox checked
                options.checked = true;
                checkbox.trigger('check.checkboxMobile');
            }
            that.refresh();
            checkbox.prop('checked', options.checked);
        });

        //expand the touch area
        if (this.options.advanced !== 'wps') {
            var divForTouch = $('<div class="forTouch"></div>');
            var labelLeft = ((this.buttonElement).position())['left'];
            var labelTop = ((this.buttonElement).position())['top'];
            divForTouch.css({
                'left': labelLeft - 15 + 'px',
                'top': labelTop - 13 + 'px'
            });
            divForTouch.appendTo(parentDiv);

            var move;
            divForTouch.bind('click' + this.eventNamespace, function(e) {
                if (options.disabled) {
                    return false;
                }
                if (move == true) {
                    return false;
                }
                if (options.checked) {
                    //checkbox unchecked
                    options.checked = false;
                    checkbox.trigger('uncheck.checkboxMobile');
                } else {
                    //checkbox checked
                    options.checked = true;
                    checkbox.trigger('check.checkboxMobile');
                }
                that.refresh();
                checkbox.prop('checked', options.checked);
            });
        }

    },

    _init: function() {
        this.refresh();
    },

    refresh: function() {

        var checkbox = $(this.element);

        var parentDiv = $(this.element).parent();
        var options = this.options;

        if (this.options.hasTitle) {
            var sectionBox = $(this.element).parents('.section-box').last();
            if (sectionBox.index() == 0) {
                sectionBox.parent().addClass('noPaddingTop');
            }
        }

        if (options.disabled) {
            parentDiv.addClass('disabled');
        } else {
            parentDiv.removeClass('disabled');
        }

        if (options.checked) {
            parentDiv.addClass('checked');
        } else {
            parentDiv.removeClass('checked');
        }

        //adjust the position of divForTouch with the change of the position of checkbox
        var divForTouch = parentDiv.find('.forTouch');
        if (divForTouch.length !== 0) {
            var labelLeft = ((this.buttonElement).position())['left'];
            var labelTop = ((this.buttonElement).position())['top'];
            divForTouch.css({
                'left': labelLeft - 15 + 'px',
                'top': labelTop - 13 + 'px'
            });
            if ($(this.element).hasClass('select-li-div-checkboxHide')) {
                divForTouch.css({
                    'height': '45px'
                })
            }
        }

        if (options.title) {
            if (options.hasTitle !== true) return;

            var newTitle = options.title;
            if (typeof newTitle == 'string') {
                if (newTitle.indexOf('</') < 0 && newTitle.indexOf('/>') < 0) {
                    newTitle = $('<span>' + newTitle + '</span>');
                } else {
                    newTitle = $(options.title);
                }
            } else {
                newTitle = options.title;
            }
            // options.title = newTitle;
            var parentTmp = ($(this.element).parents('.checkbox-div')).last();
            (parentTmp.find('.checkbox-title').first()).html(options.title);
        }

        if (options.label) {
            var labelTextTmp = this.element.parent().find('span.text');
            if (labelTextTmp.length !== 0) {
                labelTextTmp.html(options.label);
            }
            if (options.advanced == 'wps') {
                (labelTextTmp.find('span').first()).addClass('large');
                (labelTextTmp.find('span').last()).addClass('small');
            }
        }

    },

    _setOption: function(key, value) {
        var options = this.options;

        options[key] = value;
        if (key == 'checked') {
            $(this.element).prop('checked', value);
        }

        this.refresh();
        return this;
    },

    _destroy: function() {

        if (this.options.title) {
            var parentDiv = ($(this.element).parents('.checkbox-div')).first();
            parentDiv.removeClass(this.parentClass);

            (parentDiv.find('.' + this.titleClass).first()).removeClass(this.titleClass);
        }

        //div
        var parentDiv = $(this.element).parent();
        parentDiv.removeClass(this.basicClass + ' ' + this.options.advanced);

        //label
        this.buttonElement.unbind('click' + this.eventNamespace);
        var labelTmp = parentDiv.find('label');
        var labelText = labelTmp.find('span.text');
        var label_original = '';
        if (this.options.label !== null) {
            var tag = '';
            var forId = '';
            var labelClass_original = $(labelText).prop('class');
            if (labelClass_original !== undefined && labelClass_original !== '') {
                tag = labelClass_original;
            }
            if ($(labelText).attr('id')) forId = 'id="' + $(labelText).attr('id') + '"';
            label_original = '<label class="' + labelClass_original + '" ' + forId + ' >' + labelText.html() + '</label>';
        }
        labelTmp.replaceWith(label_original);

        //checkbox
        $(this.element).removeClass('checkbox-hide');

        //div for touch
        var divForTouch = parentDiv.find('.forTouch');
        if (divForTouch.length !== 0) {
            (divForTouch.unbind('click' + this.eventNamespace)).remove();
        }

        $(this.element).unwrap();
    }

});

var checkboxMobile = $.tp.checkboxMobile;
