$.widget('tp.buttonMobile', {
	options: {
		disabled: null,
		text: null
	},

	_create: function() {
		var basicClass = 'button-mobile';

		var options = this.options;
		if (options.disabled === null) {
			options.disabled = $(this.element).prop('disabled');
		}
		else {
			$(this.element).prop('disabled', options.disabled);
		}

		if (options.text === null) {
			options.text = $(this.element).prop('value');
		}

		$(this.element).addClass(basicClass);
		$(this.element).bind('click' + this.eventNamespace, function(e) {
            if (options.disabled == true) {
                return false;
            }
            $(this.element).trigger('click.buttonMobile');
		})
	},

	_init: function() {
		this.refresh();
	},

	refresh: function() {
		var buttonMobile = $(this.element);
		if (this.options.disabled == true) {
			buttonMobile.prop('disabled', true).addClass('disabled');
		}
		else {
			buttonMobile.prop('disabled', false).removeClass('disabled');
		}

		if (this.options.text) {
			buttonMobile.prop('value', this.options.text);
		}
	},

    _setOption: function(key, value) {
        var options = this.options;

        options[key] = value;

        this.refresh();
        return this;
    },

	_destroy: function() {
		var basicClass = 'button-mobile';

		$(this.element).removeClass(basicClass);
		$(this.element).unbind('click' + this.eventNamespace);

	}
});

var buttonMobile = $.tp.buttonMobile;