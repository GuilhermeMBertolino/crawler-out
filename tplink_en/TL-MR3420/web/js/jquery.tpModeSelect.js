(function($) {
    'use strict';
    $.fn.tpModeSelect = function(options) {
        options = $.extend({}, options);

        var self = this;

        this.each(function() {
            if (!$(this).data('tpModeSelect')) {
                self.id = $.randomId('modeSelect');
                $(this).data('tpModeSelect', self.id);
            } else {
                return;
            }
			if($(this).find('span').first().next().hasClass('nd'))
			{
				$(this).find('span').first().addClass('first-mode');
			}else{
				$(this).find('span').first().addClass('first-mode').after('<span class="mode-seperate"> | </span>').next().next().addClass('second-mode');
			}
           
        });

        this.next('form').addClass('first-mode').next('form').addClass('second-mode');

        this.find('span.mode-select').each(function() {
            if ($(this).hasClass('first-mode')) {
                $("form.first-mode").fadeIn();
                $('form.second-mode').hide();
            } else {
                $("form.first-mode").hide();
                $('form.second-mode').fadeIn();
            }
        });

        this.find('span').click(function(e) {
            e.stopPropagation();
            if ($(this).hasClass('mode-select') || $(this).hasClass('mode-seperate')) {
                return;
            } else if ($(self).hasClass('load-page'))  {
                $(this).siblings('span.mode-select').removeClass('mode-select');
                $(this).addClass('mode-select');             
            } else {
                $(this).siblings('span.mode-select').removeClass('mode-select');
                $(this).addClass('mode-select');
                if ($(this).hasClass('first-mode')) {
                    $(this).parent('div.mode-change').next("form.first-mode").fadeIn();
                    $(this).parent('div.mode-change').next("form.first-mode").next('form.second-mode').hide();
                } else {
                    $(this).parent('div.mode-change').next("form.first-mode").hide();
                    $(this).parent('div.mode-change').next("form.first-mode").next('form.second-mode').fadeIn();
                }
            }
        });
    }

})(jQuery);
