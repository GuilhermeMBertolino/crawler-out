(function( $ ){

    $.fn.bsDialog = function(action, option) {
        // console.log(action, option);
        if(typeof action == "object"){
            option = $.extend({}, $.fn.bsDialog.defaults, action);
            action = "";
        }else{
            if(typeof option != "function"){
                option = $.extend(true, {}, $.fn.bsDialog.defaults, option);
            }
        }
        return new BsDialog(this, option, action);
    }

    $.fn.bsDialog.defaults = {
        headerCloseBtn: true,
        hideTitle: false,
        title: "&nbsp;",
        titleStyle: "",
        showFooterBtn: true,
        autoShow: true,
        width: null,
        height: null,
        modalClass: null,
        buttonCenter: false,
        button: [],
        start: function(){},
        close: function(){},
        complete: function($selector){}
    };

    function BsDialog($selector, option, action){
        var self = this;
        this.bsDialogShow = function(){     
            var nowModalIn = $(".modal-backdrop.fade.show").length + 1;
            // $(".modal.fade.in").eq(-2).fadeOut(300);
            $selector.modal({backdrop: 'static', keyboard: false, show: true}).on("shown.bs.modal",function(event){
                // console.log(event);
                // var lastBackdrop = $("body").find(".modal-backdrop").last();
                // var last2ItemBackdrop = $("body").find(".modal-backdrop").eq(-2);
                // var last2ItemBackdropZindex = parseInt(last2ItemBackdrop.css("z-index"));
                // $selector.css("z-index",last2ItemBackdropZindex+12)
                // lastBackdrop.css("z-index",last2ItemBackdropZindex + 10);
                // console.log($(".modal.fade.in").eq(-2).);
                // option["start"]();
                
                if($(".modal.fade.show").length == 1){
                    if($(".modal.fade.show").last().css("display") == "none"){
                        $(".modal.fade.show").last().fadeIn(300);
                    }
                }
                option.complete($selector);
            }).on("hidden.bs.modal",function(event){
                // console.log($(".modal.fade.in"));
                $(".modal.fade.show").eq(-1).fadeIn(300,function(){
                    $("body").addClass("modal-open");
                });
                $selector.off("showBSDialog");
                $("body").removeProp("style");
                // $selector.remove();
            });
            $selector.modal('show');
            if(nowModalIn > 1 && $(".modal.fade.show").length > 0){
                $(".modal.fade.show").last().fadeOut(300);
            }
            
        };

        this.bsDialogClose = function(){
            $selector.modal("hide");
            $selector.off("showBSDialog");
        };

        this.start = function(){

            if($selector.find(".modal-content").length){
                return;
            }
            
            $selector.addClass("modal fade").attr("aria-hidden","true");
            var originContent = $selector.html();
            $selector.empty();
            var bsModal = $("<div>").addClass("modal-dialog");
            if(option.width != null){
                bsModal.css("width", option.width);
            }

            if(option.height != null){
                bsModal.css("height", option.height);
            }

            if(option.modalClass != null){
                bsModal.addClass(option.modalClass);
            }

            bsModal.appendTo($selector);
            var bsModalContent = $("<div>").addClass("modal-content").appendTo(bsModal);
            var bsModalHeader = $("<div>").addClass("modal-header");
            // title
            var title = $("<h4>").addClass("modal-title").html(option.title);
            if(option.titleStyle){
                title.addClass(option.titleStyle);
            }

            title.appendTo(bsModalHeader);
            
            // title Button
            if(option.headerCloseBtn){
                $("<button>").addClass("close")
                .attr("data-dismiss","modal")
                .html("&times;")
                .click(function(){
                    $selector.off("showBSDialog");
                    $selector.bsDialog("close");
                    if(option.close){
                        option.close();
                    }
                })
                .appendTo(bsModalHeader);
            }
            if(!option.hideTitle){
                bsModalHeader.appendTo(bsModalContent);
            }
            // bodys
            $("<div>").addClass("modal-body").html(originContent).appendTo(bsModalContent);

            // footer Button
            if(option.showFooterBtn){
                var buttonArea = $("<div>").addClass("modal-footer border-0");
                    // console.log(typeof option.button, option.button);

                $.each(option.button,function(index,content){
                    var button = $("<button>");
                    
                    button.addClass("btn btn-default").text(content.text).click(function(){
                        if(typeof content["click"] != "undefined"){
                            content["click"]();
                        }
                    });
                    if(typeof content.className != "undefined"){
                        button.addClass(content.className);
                    }

                    if(typeof content.idName != "undefined"){
                        button.prop('id', content.idName);
                    }
                    
                    button.appendTo(buttonArea);
                        
                });
                if(option.buttonCenter){
                    buttonArea.addClass('justify-content-center');
                }
                buttonArea.appendTo(bsModalContent);
            }

            option["start"]();
        }

        this.deleteHash = function(){
            var orgSearch = window.location.search.substring(1);
            var sPageURL = decodeURIComponent(orgSearch);   
            sURLVariables = sPageURL.split('&');
            sParameterName = sURLVariables[0].split('=');
            if(orgSearch){
                orgSearch = "?"+orgSearch;
            }
            var organizePathname = window.location.pathname.substring(1);
            window.history.pushState(sParameterName[1],null, organizePathname+orgSearch);
        }

        switch(action){
            case "show":
                self.bsDialogShow();
                if(typeof option == "function"){
                    option();
                }
                return;
            break;
            case "close":
                self.bsDialogClose();
                if(typeof option == "function"){
                    option();
                }
                return;
            break;
        }
            
        
        if(option.autoShow){
            self.start();
            self.bsDialogShow();
        }else{
            self.start();
        }
    }
})(jQuery);