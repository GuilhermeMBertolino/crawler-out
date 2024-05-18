(function($) {
	$.su = $.su || {};


    $.su.mask = {
        displayed: false,
        process: {}, //记录有哪些元素在使用mask并记录他们的zIndex
        count: 0,
        height: 0,
        width: 0,
        zIndex: 890,
        show: function(name, autoIndex, $modal){
            var _this = this;
            _this.dom = $("div.mask#mask");
            var isEmpty = $.isEmptyObject(_this.process);
            if (autoIndex) {
                if (typeof autoIndex == 'number') {
                    //如果是数字，设置zIndex为该值
                    _this.dom.css('zIndex', autoIndex);
                    _this.process[name] = autoIndex;
                } else if (autoIndex === true && $modal) {
                    //如果是布尔值
                    _this.dom.css('zIndex', parseInt($modal.css('zIndex')) - 1);
                    _this.process[name] = parseInt($modal.css('zIndex')) - 1;
                } else {
                    _this.dom.css('zIndex', _this.zIndex);
                    _this.process[name] = _this.zIndex;
                }
            } else {
                _this.dom.css('zIndex', _this.zIndex);
                _this.process[name] = _this.zIndex;
            }
            if(isEmpty){
                _this.dom.show();
            }
        },
        hide: function(name, adjustZIndex){
            var _this = this;
            _this.dom = $("div.mask#mask");
            if(_this.process[name] && delete _this.process[name]){
                var isEmpty = $.isEmptyObject(_this.process);
                if(isEmpty){
                    //如果没有元素在使用mask，隐藏mask
                    _this.dom.hide();
                    _this.dom.css('zIndex', _this.zIndex);
                } else if(adjustZIndex !== false){
                    //如果还有元素在使用mask，设置Index为当前最大值
                    var maxZIndex = -100;
                    for (var i in _this.process) {
                        if (_this.process.hasOwnProperty(i)) {
                            if (_this.process[i] > maxZIndex) {
                                maxZIndex = _this.process[i];
                            }
                        }
                    }
                    _this.dom.css('zIndex', maxZIndex);
                }
            }
        },
        init: function(){
            var dom = $("div.mask#mask");
            if (dom.length == 0){
                dom = $('<div id="mask" class="mask"><div id="cover-loading"></div></div>');
                dom.appendTo($("body"));
            }
            this.zIndex = dom.css('zIndex') || this.zIndex;
            var _this = this;
            _this.dom = dom;
            dom.css("display", "none");

        }
    };
    $.su.mask.init();
})(jQuery);