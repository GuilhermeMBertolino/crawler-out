(function($) {
    // Calling the initiation function. Be careful the order.
    $.tpInit = function(callback, node) {
        node = node || 'body';
        node = $(node);
        node.find("input[type='text'].mac-address").tpAddress({
            connector: '-',
            connectorReal: ':',
            cellLength: 2,
            cellNumber: 6
        });
        node.find("input[type='text'].ip-address").tpAddress({
            connector: '.',
            cellLength: 3,
            cellNumber: 4
        });
        node.find("input[type='checkbox']").tpCheckbox();
        node.find("input[type='radio']").tpRadio();
        node.find("div.button-group-container").tpBtnGroup();
        if (callback !== undefined) {
            callback();
        }
        node.find('select').tpSelect();
        node.find("input[type='checkbox']").tpCheckbox();
        node.find("input[type='radio']").tpRadio();
        node.find("div.button-group-container").tpBtnGroup();
        node.find("input[type='password']").tpPassword();
        node.find("div.file-container").tpFile();

        node.find("span.advanced-icon").off('.tpAdvIcon');
        node.find("span.advanced-icon").siblings("span").off('.tpAdvIcon');
        node.find("span.advanced-icon").on('click.tpAdvIcon', function(e) {
            if ($(this).hasClass("advanced-hide-icon")) {
                $(this).removeClass("advanced-hide-icon").addClass("advanced-show-icon");
            } else {
                $(this).removeClass("advanced-show-icon").addClass("advanced-hide-icon");
            }
        });
        node.find("span.advanced-icon").siblings("span").on("click.tpAdvIcon", function(){
           $(this).prev("span.advanced-icon").trigger("click");
        });
        node.find("[id$='_tips']").click(function(e) {
            e.stopPropagation();
            $(this).hideCold('fast');
            return false;
        });
        $('body').off('click.errorTip').on('click.errorTip', function (e) {
            //close all tips,when click window
            if (e.target.nodeName.toLowerCase() == 'select' || e.target.nodeName.toLowerCase() == 'input') {
                return;
            }
            $("[id$='_tips']:visible").hideCold('fast');
        });
    };

})(jQuery);
