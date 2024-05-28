$.widget('tp.radioMobile', {
    options: {
        disabled: null,
        label: null,
        advanced: null,
        checked: null,
        title: null,
        hasTitle: null
    },

    _create: function() {
        this.basicClass = 'radio-mobile';
        this.labelClass = 'radio-label';
        this.parentClass = 'radio-div';
        this.titleClass = 'radio-title';

        if (this.options.hasTitle == true) {
            ($(this.element).parent()).addClass(this.parentClass);
            ($(this.element).parent()).find('div').first().addClass(this.titleClass);
        }

        var radio = $(this.element).addClass('radio-hide');
        radio.wrap('<div class="' + this.basicClass + '"></div>');
        this.radioMobile = radio.parent();

        //radio-label
        var ancestor = radio.parents().last();
        var labelSelector = 'label[for="' + radio.attr('id') + '"]';
        var labelTmp = ancestor.find(labelSelector);
        if (labelTmp.length !== 0) {
            radio.after(labelTmp);
            if (this.options.label == null) {
                this.options.label = labelTmp.html();
            }
            var str = '<span class="icon sprite"></span><span class="text">' + labelTmp.html() + '</span>';
            labelTmp.addClass(this.labelClass).html(str);
        } else {
            var str = '<label class="' + this.labelClass + '" for="' + radio.attr('id') + '"><span class="icon sprite"></span></label>';
            labelTmp = $(str);
            radio.after(labelTmp);
        }

        //options.advanced
        if (this.options.advanced == null) {
            this.options.advanced = radio.attr('advanced');
        }

        var that = this;
        if (this.options.advanced) {
            this.radioMobile.addClass(this.options.advanced);
            if ((this.options.advanced).indexOf('button-group-') >= 0) {
            	var spanText = this.radioMobile.find('span.text');
            	var spanIcon = this.radioMobile.find('span.icon');
            	spanText.appendTo(spanIcon);
            }
            if (this.options.advanced == 'folder') {
                var divForTouch = $('<div class="forTouch"></div>');
                var labelLeft = ((labelTmp).position())['left'];
                var labelTop = ((labelTmp).position())['top'];
                divForTouch.css({
                    'left': labelLeft - 15 + 'px',
                    'top': labelTop - 15 + 'px'
                });
                divForTouch.appendTo(radio.parent().css({
                    'position': 'relative'
                }));

                var move;
                divForTouch.bind('click' + this.eventNamespace, function(e) {
                    if (that.options.disabled == true || that.options.checked == true) {
                        return false;
                    }

                    //other radios
                    var allRadios = $('input[type="radio"][name="' + radio.prop('name') + '"]');
                    $.each(allRadios, function() {
                        if ($(this).prop('id') == radio.prop('id')) return;
                        $(this).radioMobile('option', {
                            'checked': false
                        });
                        $(this).trigger('uncheck.radioMobile');
                    })

                    radio.prop('checked', true);
                    that.options.checked = true;
                    radio.trigger('check.radioMobile');

                    that.refresh();
                });
            }
        }

        //options.disabled
        if (this.options.disabled == null) {
            this.options.disabled = radio.prop('disabled');
        }
        if (this.options.checked == null) {
            this.options.checked = radio.prop('checked');
        }

        //bind
        var that = this;
        if (this.options.hasTitle) {
            var parentTmp = radio.parents('.radio-div').last();
            parentTmp.bind('click' + this.eventNamespace, function(e) {
                if (that.options.disabled == true || that.options.checked == true) {
                    return false;
                }
                radio.prop('checked', true);
                that.options.checked = true;
                radio.trigger('check.radioMobile');

                //other radios
                var allRadios = $('input[type="radio"][name="' + radio.prop('name') + '"]');
                $.each(allRadios, function() {
                    if ($(this).prop('id') == radio.prop('id')) return;
                    $(this).radioMobile('option', {
                        'checked': false
                    });
                    $(this).trigger('uncheck.radioMobile');
                })

                that.refresh();

            });
        }

        var label = this.radioMobile.find('label');
        label.bind('click' + this.eventNamespace, function(e) {
            if (that.options.disabled == true || that.options.checked == true) {
                return false;
            }
            radio.prop('checked', true);
            that.options.checked = true;

            //other radios
            var allRadios = $('input[type="radio"][name="' + radio.prop('name') + '"]');
            $.each(allRadios, function() {
                if ($(this).prop('id') == radio.prop('id')) return;
                $(this).radioMobile('option', {
                    'checked': false
                });
            })

            radio.trigger('check.radioMobile');
            that.refresh();
        });
    },

    _init: function() {
        this.refresh();
    },

    refresh: function() {
        var options = this.options;
        var radio = $(this.element);
        if (options.checked) {
            this.radioMobile.addClass('checked');
            radio.prop('checked', true);
            //other radios
            var allRadios = $('input[type="radio"][name="' + radio.prop('name') + '"]');
            $.each(allRadios, function() {
                if ($(this).prop('id') == radio.prop('id')) return;
                try {
                    $(this).radioMobile('option', {
                        'checked': false
                    });
                } catch(e) {
                    $(this).prop('checked', false);
                }
                $(this).trigger('uncheck.radioMobile');
            })
        } else {
            this.radioMobile.removeClass('checked');
            $(this.element).prop('checked', false);
        }

        if (options.disabled) {
            if (options.hasTitle) {
                ($(this.element).parents('.radio-div')).addClass('disabled');
            }
            this.radioMobile.addClass('disabled');
        } else {
            if (options.hasTitle) {
                ($(this.element).parents('.radio-div')).removeClass('disabled');
            }
            this.radioMobile.removeClass('disabled');
        }

        if (options.label) {
            var textLabel = ($(this.element).parent()).find('label span.text').first();
            if (textLabel) textLabel.html(options.label);
        }

        var labelTmp = $(this.element).parent().find('label').first();
        var divForTouch = $(this.element).parent().find('.forTouch');
        if (divForTouch.length !== 0) {
            var labelLeft = ((labelTmp).position())['left'];
            var labelTop = ((labelTmp).position())['top'];
            divForTouch.css({
                'left': labelLeft - 15 + 'px',
                'top': labelTop - 15 + 'px'
            });
        }
    },

    _setOption: function(key, value) {
        var options = this.options;

        options[key] = value;

        this.refresh();
        return this;
    },

    _destroy: function() {
        var radio = $(this.element);
        var options = this.options;

        if (options.label) {
            var label = this.radioMobile.find('label').first();
            var text = (label.find('span.text').first()).html();
            label.removeClass(this.labelClass).html(text);
        } else {
            var label = this.radioMobile.find('label').first();
            label.remove();
        }

        if (options.hasTitle) {
            var parentTmp = (radio.parents('.radio-div').last()).removeClass(this.parentClass);
            (parentTmp.find('.' + this.titleClass).last()).removeClass(this.titleClass);
        }

        this.radioMobile.removeClass(this.basicClass + ' ' + this.options.advanced + ' checked disabled');
        radio.removeClass('radio-hide').unwrap();
    }
});

var radioMobile = $.tp.radioMobile;
