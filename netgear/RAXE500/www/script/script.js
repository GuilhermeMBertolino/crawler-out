// load jquery to page
var headContent = document.getElementsByTagName('head')[0];
var jsArr = ['jquery.1.12.js','script/lib.js','script/bsDialog.js','script/bootstrap.min.js'];
var cssArr = ['css/bootstrap.min.css'];
var jsWithOut = ['UPG_upgrade','upgrade_check','DEV_name','UPG_fw_check','top','adv-wifi','CongratulationsFULL','start_CV'];
var jsWithOutAction = false;
var pathname = location.pathname;
// var jsArr = ['script/lib.js'];
// var cssArr = [];

for(var i = 0; i < jsWithOut.length; i++ ){
    if(pathname.search(jsWithOut[i]) >= 0){
        jsWithOutAction = true;
    }
}

// include js to page
if(jsArr.length > 0 && !jsWithOutAction){
    for(var i = 0; i < jsArr.length; i++){
        jsTags = document.createElement('script');
        jsTags.type = 'text/javascript';
        jsTags.src = jsArr[i];
        jsTags.async = false;
        headContent.appendChild(jsTags);
    }
}

// include css to page
if(cssArr.length > 0){
    for(var i = 0; i < cssArr.length; i++){
        cssTags = document.createElement('link');
        cssTags.type = 'text/css';
        cssTags.rel = 'stylesheet';
        cssTags.href = cssArr[i];
        headContent.appendChild(cssTags);
    }
}

function buttonFilter()
{
    var buttonElements,button;
    var name;


    buttonElements=document.getElementsByTagName('button');
    var i;
    for(i=0;i<buttonElements.length;i++)
    {
        if(buttonElements[i].type=='submit' || buttonElements[i].type=='button'|| buttonElements[i].type=='reset')
        {
            if((buttonElements[i].name!=document.forms[0].buttonHit.value)){
                buttonElements[i].disabled=1;
            }
            else
            {
                // buttonElements[i].value=document.forms[0].buttonValue.value;
                name=buttonElements[i].name;
                buttonElements[i].name='NoUse';
                buttonElements[i].disabled=1;
            }
        }
    }

    button=document.getElementsByName('buttonValue');
    button[0].name=name;
    button=document.getElementsByName('buttonHit');
    button[0].disabled=1;
}

function buttonClick(btn,value)
{

    var button;
    
    button=document.getElementsByName('buttonHit');
    button[0].value=btn.name;

    button=document.getElementsByName('buttonValue');
    button[0].value=value;
    return true;
}

function clickButton(message)
{
  alert(message);
}
  
function mainOnload()
{
    
}

function changeCursorPointer()
{
    document.body.style.cursor='pointer';
}

function changeCursorDefault()
{
    document.body.style.cursor='default';
}


function iframeResize(iframe){
    alert("Enter iframeResize "+iframe);
    if(iframe && !window.opera){
        if(iframe.contentDocument && iframe.contentDocument.body.offsetHeight){                         
            alert('before '+iframe.height+" document "+iframe.Document.body.offsetHeight);
            iframe.height=iframe.contentDocument.body.offsetHeight+80;  
            alert('after '+iframe.height);
        }
        else if(iframe.Document && iframe.Document.body.scrollHeight){
            alert('before '+iframe.style.height+" document "+iframe.Document.body.scrollHeight);

            iframe.style.height=iframe.Document.body.scrollHeight;
            alert('after '+iframe.style.height);
        }
    }
    alert("Exit iframeResize ");
}

function getElementsByName_iefix(tag, name) {
    var elem = document.getElementsByTagName(tag);
    var arr = new Array();
    for(i = 0,iarr = 0; i < elem.length; i++) {
        att = elem[i].getAttribute("name");
        if(att == name) {
            arr[iarr] = elem[i];
            iarr++;
        }
    }
    return arr;
}  
  
function grayout_button(ButtonName)
{
    var selectedButton=$('#'+ButtonName);  
    selectedButton[0].disabled = true;
}

function ungrayout_button(ButtonName)
{
    var selectedButton=$('#'+ButtonName);    
    selectedButton[0].disabled = false;
}  
function grayout_applybtn(ButtonName)
{
    var selectedButton=$('#'+ButtonName);
    var selectedButtonChildLeft = selectedButton.children(".roundleft_apply");
    var selectedButtonChildRight = selectedButton.children(".roundright_apply");
    
    selectedButton.attr('class', 'button-apply');
    selectedButtonChildLeft.attr('class', 'roundleft_grey');
    selectedButtonChildRight.attr('class', 'roundright_grey');
    
    selectedButton[0].disabled = true;
}

function ungrayout_applybtn(ButtonName)
{
    var selectedButton=$('#'+ButtonName);
    var selectedButtonChildLeft = selectedButton.children(".roundleft_grey");
    var selectedButtonChildRight = selectedButton.children(".roundright_grey");
    
    selectedButton.attr('class', 'button-apply');
    selectedButtonChildLeft.attr('class', 'roundleft_apply');
    selectedButtonChildRight.attr('class', 'roundright_apply');
    
    selectedButton[0].disabled = false;
}

function Security5G_disabled()
{
    $("input[name=security_type_an][type=radio]").attr("disabled", true);    
}

function Security5G_enabled()
{
    $("input[name=security_type_an][type=radio]").attr("disabled", false);
}

function Security5G2_disabled()
{
    $("input[name=security_type_an_2][type=radio]").attr("disabled", true);    
}

function Security5G2_enabled()
{
    $("input[name=security_type_an_2][type=radio]").attr("disabled", false);
}
function Security6G_disabled()
{
    $("input[name=security_type_an_2][type=radio]").attr("disabled", true);    
}
function Security6G_enabled()
{
    $("input[name=security_type_an_2][type=radio]").attr("disabled", false);
}
function WPS_wizard_grayout()
{
    if(parent.$('#adv-wps').hasClass('noSubLarge')){
        parent.$('#adv-wps').addClass('noSubGrayLarge');
        parent.$('#adv-wps').removeClass('noSub');
        parent.$('#adv-wps').removeClass('noSubLarge');
    } else if(parent.$('#adv-wps').hasClass('noSub')){
        parent.$('#adv-wps').addClass('noSubGray');
        parent.$('#adv-wps').removeClass('noSub');
        parent.$('#adv-wps').removeClass('noSubLarge');
    }
    parent.$('#adv-wps').bind('contextmenu', function(e) {
        return false;
    });
}

function WPS_wizard_ungrayout()
{
    if(parent.$('#adv-wps').hasClass('noSubGrayLarge')){
        parent.$('#adv-wps').addClass('noSubLarge');
        parent.$('#adv-wps').removeClass('noSubGrayLarge');
    } else if(parent.$('#adv-wps').hasClass('noSubGray')){
        parent.$('#adv-wps').addClass('noSub');
        parent.$('#adv-wps').removeClass('noSubGray');
    }
    parent.$('#adv-wps').unbind('contextmenu');
}

function WDS_wizard_grayout()
{
    if(parent.$("#basic-internet").hasClass("basic-menu-div")){
        parent.$("#basic-internet").addClass('basic-menu-div-gray');
        parent.$("#basic-internet").removeClass('basic-menu-div');
    } 

    if(parent.$('#setup-wizard').hasClass('noSubLarge')){
        parent.$('#setup-wizard').addClass('noSubGrayLarge');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubLarge');
    } else if(parent.$('#setup-wizard').hasClass('noSub')){
        parent.$('#setup-wizard').addClass('noSubGray');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubLarge');
    } 

    parent.$('.SubMenuWDS').each(function(){  
        if($(this).hasClass('SubMenuLarge')){
            $(this).addClass('SubMenuLargeDisable SubMenuLargeDisable_Grey');
            $(this).removeClass('SubMenu');
            $(this).removeClass('Large');
            $(this).removeClass('SubMenuLarge');
        }                
        else if($(this).hasClass('SubMenu')){ 
            $(this).addClass('SubMenuDisable SubMenuDisable_Grey');
            $(this).removeClass('SubMenu');
        }
    }); 
}

function WDS_wizard_ungrayout()
{
    if(parent.$("#basic-internet").hasClass("basic-menu-div-gray")){
        parent.$("#basic-internet").addClass('basic-menu-div');
        parent.$("#basic-internet").removeClass('basic-menu-div-gray');
    } 

    if(parent.$('#setup-wizard').hasClass('noSubGrayLarge')){
        parent.$('#setup-wizard').addClass('noSubLarge');
        parent.$('#setup-wizard').removeClass('noSubGrayLarge');
    } else if(parent.$('#setup-wizard').hasClass('noSubGray')){
        parent.$('#setup-wizard').addClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubGray');
    } 

    parent.$('.SubMenuWDS').each(function(){
        if($(this).hasClass('SubMenuLargeDisable')){
            $(this).addClass('SubMenuLarge');
            $(this).addClass('SubMenu');
            $(this).addClass('Large');
            $(this).removeClass('SubMenuLargeDisable SubMenuLargeDisable_Grey');
        }
        else if($(this).hasClass('SubMenuDisable')){
            $(this).addClass('SubMenu');
            $(this).removeClass('SubMenuDisable SubMenuDisable_Grey');
        }
    });
}

function sta_mode_grayout()
{
    if (parent.$("#basic-internet").hasClass("basic-menu-div")){
        parent.$("#basic-internet").addClass('basic-menu-div-gray');
        parent.$("#basic-internet").removeClass('basic-menu-div');
    }

    if (parent.$("#basic-wireless").hasClass("basic-menu-div")){
        parent.$("#basic-wireless").addClass('basic-menu-div-gray');
        parent.$("#basic-wireless").removeClass('basic-menu-div');
    }

    if (parent.$("#basic-par").hasClass("basic-menu-div")){
        parent.$("#basic-par").addClass('basic-menu-div-gray');
        parent.$("#basic-par").removeClass('basic-menu-div');
    }

    if ($("#basic-guest").hasClass("basic-menu-div")){
        parent.$("#basic-guest").addClass('basic-menu-div-gray');
        parent.$("#basic-guest").removeClass('basic-menu-div');
    }

    if (parent.$("#basic-qos").hasClass("basic-menu-div")){
        parent.$("#basic-qos").addClass('basic-menu-div-gray');
        parent.$("#basic-qos").removeClass('basic-menu-div');
    }

    if (parent.$("#basic-guest").hasClass("basic-menu-div")){
        parent.$("#basic-guest").addClass('basic-menu-div-gray');
        parent.$("#basic-guest").removeClass('basic-menu-div');
    }

    if (parent.$('#setup-wizard').hasClass('noSubLarge')){
        parent.$('#setup-wizard').addClass('noSubGrayLarge');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubLarge');
    } else if (parent.$('#setup-wizard').hasClass('noSub')){
        parent.$('#setup-wizard').addClass('noSubGray');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubLarge');
    }

    if (parent.$('#adv-wps').hasClass('noSubLarge')){
        parent.$('#adv-wps').addClass('noSubGrayLarge');
        parent.$('#adv-wps').removeClass('noSub');
        parent.$('#adv-wps').removeClass('noSubLarge');
    } else if (parent.$('#adv-wps').hasClass('noSub')){
        parent.$('#adv-wps').addClass('noSubGray');
        parent.$('#adv-wps').removeClass('noSub');
        parent.$('#adv-wps').removeClass('noSubLarge');
    }

    parent.$('#adv-wps').bind('contextmenu', function(e) {
        return false;
    });

    if (parent.$('#wireless-setup').hasClass('SubMenu')){
        parent.$('#wireless-setup').addClass('SubMenuWDS');
    }

    if (parent.$('#guest-network-setup').hasClass('SubMenu')){
        parent.$('#guest-network-setup').addClass('SubMenuWDS');
    }

    if (parent.$('#wds_head').hasClass('SubMenu')){
        parent.$('#wds_head').addClass('SubMenuWDS');
    }

    if (parent.$('#qos-setup').hasClass('SubMenu')){
        parent.$('#qos-setup').addClass('SubMenuWDS');
    }

    parent.$('.SubMenuWDS').each(function(){                
        if($(this).hasClass('SubMenuLarge')){
            $(this).addClass('SubMenuLargeDisable SubMenuLargeDisable_Grey');
            $(this).removeClass('SubMenu');
            $(this).removeClass('Large');
            $(this).removeClass('SubMenuLarge');
        }                
        else if($(this).hasClass('SubMenu')){ 
            $(this).addClass('SubMenuDisable SubMenuDisable_Grey');
            $(this).removeClass('SubMenu');
        }
    }); 
}

function sta_mode_ungrayout()
{
    if (parent.$("#basic-internet").hasClass("basic-menu-div-gray")){
        parent.$("#basic-internet").addClass('basic-menu-div');
        parent.$("#basic-internet").removeClass('basic-menu-div-gray');
    }

    if (parent.$("#basic-wireless").hasClass("basic-menu-div-gray")){
        parent.$("#basic-wireless").addClass('basic-menu-div');
        parent.$("#basic-wireless").removeClass('basic-menu-div-gray');
    }

    if (parent.$("#basic-par").hasClass("basic-menu-div-gray")){
        parent.$("#basic-par").addClass('basic-menu-div');
        parent.$("#basic-par").removeClass('basic-menu-div-gray');
    }

    if ($("#basic-guest").hasClass("basic-menu-div-gray")){
        parent.$("#basic-guest").addClass('basic-menu-div');
        parent.$("#basic-guest").removeClass('basic-menu-div-gray');
    }

    if (parent.$("#basic-qos").hasClass("basic-menu-div-gray")){
        parent.$("#basic-qos").addClass('basic-menu-div');
        parent.$("#basic-qos").removeClass('basic-menu-div-gray');
    }

    if (parent.$("#basic-guest").hasClass("basic-menu-div-gray")){
        parent.$("#basic-guest").addClass('basic-menu-div');
        parent.$("#basic-guest").removeClass('basic-menu-div-gray');
    }

    if (parent.$('#setup-wizard').hasClass('noSubGrayLarge')){
        parent.$('#setup-wizard').addClass('noSubLarge');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubGrayLarge');
    } else if (parent.$('#setup-wizard').hasClass('noSubGray')){
        parent.$('#setup-wizard').addClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubGray');
        parent.$('#setup-wizard').removeClass('noSubGrayLarge');
    }

    if (parent.$('#adv-wps').hasClass('noSubGrayLarge')){
        parent.$('#adv-wps').addClass('noSubLarge');
        parent.$('#adv-wps').removeClass('noSub');
        parent.$('#adv-wps').removeClass('noSubGrayLarge');
    } else if (parent.$('#adv-wps').hasClass('noSubGray')){
        parent.$('#adv-wps').addClass('noSub');
        parent.$('#adv-wps').removeClass('noSubGray');
        parent.$('#adv-wps').removeClass('noSubGrayLarge');
    }

    parent.$('#adv-wps').bind('contextmenu', function(e) {
        return true;
    });

    if (parent.$('#wireless-setup').hasClass('SubMenu')){
        parent.$('#wireless-setup').addClass('SubMenuWDS');
    }

    if (parent.$('#guest-network-setup').hasClass('SubMenu')){
        parent.$('#guest-network-setup').addClass('SubMenuWDS');
    }

    if (parent.$('#wds_head').hasClass('SubMenu')){
        parent.$('#wds_head').addClass('SubMenuWDS');
    }

    if (parent.$('#qos-setup').hasClass('SubMenu')){
        parent.$('#qos-setup').addClass('SubMenuWDS');
    }

    parent.$('.SubMenuWDS').each(function(){                
        if($(this).hasClass('SubMenuLargeDisable')){
            $(this).addClass('SubMenuLarge');
            $(this).addClass('SubMenu');
            $(this).addClass('Large');
            $(this).removeClass('SubMenuLargeDisable SubMenuLargeDisable_Grey');
        }                
        else if($(this).hasClass('SubMenuDisable')){ 
            $(this).addClass('SubMenu');
            $(this).removeClass('SubMenuDisable SubMenuDisable_Grey');
        }
    });
}

function ap_mode_grayout()
{
    if (parent.$("#basic-internet").hasClass("basic-menu-div")){
        parent.$("#basic-internet").addClass('basic-menu-div-gray');
        parent.$("#basic-internet").removeClass('basic-menu-div');
    }

    if (parent.$('#setup-wizard').hasClass('noSubLarge')){
        parent.$('#setup-wizard').addClass('noSubGrayLarge');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubLarge');
    } else if (parent.$('#setup-wizard').hasClass('noSub')){
        parent.$('#setup-wizard').addClass('noSubGray');
        parent.$('#setup-wizard').removeClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubLarge');
    }

    if (parent.$("#basic-qos").hasClass("basic-menu-div")){
        parent.$("#basic-qos").addClass('basic-menu-div-gray');
        parent.$("#basic-qos").removeClass('basic-menu-div');
    } 

    parent.$('.SubMenuWDS').each(function(){                
        if($(this).hasClass('SubMenuAP')){
            /* do nothing */
        }
        else if($(this).hasClass('SubMenuLarge')){
            $(this).addClass('SubMenuLargeDisable SubMenuLargeDisable_Grey');
            $(this).removeClass('SubMenu');
            $(this).removeClass('Large');
            $(this).removeClass('SubMenuLarge');
        }                
        else if($(this).hasClass('SubMenu')){ 
            $(this).addClass('SubMenuDisable SubMenuDisable_Grey');
            $(this).removeClass('SubMenu');
        }
    }); 
}

function ap_mode_ungrayout()
{
    if (parent.$("#basic-internet").hasClass("basic-menu-div-gray")){
        parent.$("#basic-internet").addClass('basic-menu-div');
        parent.$("#basic-internet").removeClass('basic-menu-div-gray');
    }

    if (parent.$('#setup-wizard').hasClass('noSubGrayLarge')){
        parent.$('#setup-wizard').addClass('noSubLarge');
        parent.$('#setup-wizard').removeClass('noSubGrayLarge');
    } else if (parent.$('#setup-wizard').hasClass('noSubGray')){
        parent.$('#setup-wizard').addClass('noSub');
        parent.$('#setup-wizard').removeClass('noSubGray');
    }

    if (parent.$("#basic-qos").hasClass("basic-menu-div-gray")){
        parent.$("#basic-qos").addClass('basic-menu-div');
        parent.$("#basic-qos").removeClass('basic-menu-div-gray');
    }
    
    parent.$('.SubMenuWDS').each(function(){
        if($(this).hasClass('SubMenuLargeDisable')){
            $(this).addClass('SubMenuLarge');
            $(this).addClass('SubMenu');
            $(this).addClass('Large');
            $(this).removeClass('SubMenuLargeDisable SubMenuLargeDisable_Grey');
        }
        else if($(this).hasClass('SubMenuDisable')){
            $(this).addClass('SubMenu');
            $(this).removeClass('SubMenuDisable SubMenuDisable_Grey');
        }
    });
}

function highLightMenu(title, subtitle)
{
    if(parent.load_page == 1 || !parent.load_page)
        return false;
        
    var checkElement = parent.$('#'+title).next();  
    parent.$("#first").hide();

    if((checkElement.is('li')) && (!checkElement.is(':visible'))) 
    { 
        parent.$('.subHeader:visible').slideUp('fast');
        checkElement.slideDown('normal');      
        parent.$('.SubActive').addClass('Sub');
        parent.$('.SubActive').removeClass('SubActive');
        parent.$('#'+title).addClass('SubActive');
        parent.$('#'+title).removeClass('Sub');
    }
       
    if( !parent.$('#'+subtitle).hasClass('SubMenuDisable') && !parent.$('#'+subtitle).hasClass('SubMenuLargeDisable'))
    {  
        parent.$('.noSubActive').removeClass('noSubActive');
        parent.$('.noSubActiveLarge').removeClass('noSubActiveLarge');
        parent.$('.SubMenuActive').addClass('SubMenu');
        parent.$('.SubMenuActive').removeClass('SubMenuActive');
        parent.$('.SubMenuActiveLarge').addClass('SubMenuLarge');
        parent.$('.SubMenuActiveLarge').addClass('SubMenu');
        parent.$('.SubMenuActiveLarge').addClass('Large');
        parent.$('.SubMenuActiveLarge').removeClass('SubMenuActiveLarge');
        if(parent.$('#'+subtitle).hasClass('Large'))
           parent.$('#'+subtitle).addClass('SubMenuActiveLarge');
        else
           parent.$('#'+subtitle).addClass('SubMenuActive');
        parent.$('#'+subtitle).removeClass('SubMenu');
        parent.$('#'+subtitle).removeClass('SubMenuLarge');

     }
     else
     {     
        return false;
     }                           
} 

function change_size(changeIframe)
{
    if(changeIframe == undefined){
        changeIframe = true;
    }
    var sep_border_num = $(".table-seperate-border").length;
    var sep_border2_num = $(".table-seperate-border2").length;
    /*
    var min_height = $('.scroll-pane').css("height");
    min_height = min_height.replace("px", "");
     */    

    var width = document.documentElement.clientWidth > 620 ? document.documentElement.clientWidth : 620;
    //var height = document.documentElement.clientHeight > min_height ? document.documentElement.clientHeight : min_height;
    var height = document.documentElement.clientHeight;
    
/*
    if(get_browser()=="iOS") {
        width = parent.document.documentElement.clientWidth - 25;
        height = parent.document.documentElement.clientHeight - 80;
    }
*/
    $('.subtop-image').css("width", width);
    $('.subtop-image').css("height", "51px");
    
    $('.body-image').css("width", width);
    $('.body-image').css("height", height-30);
    $('.body-image').css("position", "absolute");
    //$('.body-image').css("top", 5);
    
    $('.subfooter-image').css("width", width);
    $('.subfooter-image').css("height", "24px");   
    $('.subfooter-image').css("position", "relative");
    if(sep_border2_num==1) {
        $('.subfooter-image').css("top", 27);  
        $('.subhead2-bottom').css("top", 0); 
    } else {
        $('.subfooter-image').css("top", -3);    
    }
    
    $('.subhead2-table').css("position", "relative");
    //$('.subhead2-table').css("top", -3);
    
    if(get_browser()=="Netscape") 
        $('.subhead2-table').css("left", 1);
    $('.subhead2-table').css("width", width-27);
    $('.scroll-pane').css("width", width-27);
    
    if(document.getElementById("topframe")) {    
        //$('.subhead2-table').css("height", height-226);
        //$('.scroll-pane').css("height", height-226);
        $('.subhead2-table').css("height", height-276);
        $('.scroll-pane').css("height", height-352-56);
        $(".scroll-pane").parent().css("height", height-352);
    } else if(sep_border_num==2) {
        $('.subhead2-table').css("height", height-130);
        $('.scroll-pane').css("height", height-212);    
    } else if(sep_border2_num==1) {
        //$('full-page-container').css("height", height-157);
        $('.subhead2-table').css("height", height-187);
        $('.scroll-pane').css("height", height-187);
    } else {
        $('.subhead2-table').css("height", height-102);
        $('.scroll-pane').css("height", height-184);  
    }
    
    $('.subhead2-bottom').css("width", width);
    
    $('.button-help-arrow').css("position", "absolute");
    $('.button-help-arrow').css("left", width/2);
        
    
    $('.bas-help-frame-div').css("width", width-50); 
    $('.help-frame-div').css("width", width-50); 
    if(get_browser()=="Firefox"|| get_browser()=="Netscape") { 
        $('.bas-help-frame-div').css("top", height-225);
        $('.help-frame-div').css("top", height-225);
    }    
    else {
        $('.bas-help-frame-div').css("top", height-230);
        $('.help-frame-div').css("top", height-230);
    }
        
    $('#helpframe').css("width", width-50);


    
    
    if(changeIframe && document.getElementById('helpframe')) {
        try{
            document.getElementById('helpframe').contentWindow.change_size_helpPage(width);
        }catch(e){}
    }
    
    
    $('.cover-image').css("display", "none");    
        
}

function change_size_helpPage(width)
{
    $('#content').css("width", width -70+ "px");

    if(get_ie_ver() == 9){
       ;
    }else{
       $('#content').jScrollPane('scrollbarMargin:5px');
    }
    var isResizing;
    // IE triggers the onResize event internally when you do the stuff in this function
    // so make sure we don't enter an infinite loop and crash the browser
    if (!isResizing) { 
        isResizing = true;
        $w = $(window);
        $c = $('#container');
        var p = (parseInt($c.css('paddingLeft')) || 0) + (parseInt($c.css('paddingRight')) || 0);
        $('body>.jScrollPaneContainer').css({'width': $w.width() + 'px'});
        $c.css({'width': ($w.width() - p) + 'px', 'overflow':'auto'});
        $c.jScrollPane();
        isResizing = false; 
    } 
}   
function change_size_ADVPage()
{
    var isResizing;
    // IE triggers the onResize event internally when you do the stuff in this function
    // so make sure we don't enter an infinite loop and crash the browser
    if (!isResizing) {
        isResizing = true;
        $w = $(window);
        $c = $('#scroll-pane');
        var p = (parseInt($c.css('paddingLeft')) || 0) + (parseInt($c.css('paddingRight')) || 0);
        $('body>.jScrollPaneContainer').css({'height': $w.height() + 'px'});
        if(get_browser()=="Chrome")
            $c.css({'height': ($w.height()-p) + 'px', 'overflow':'no'});
        else
            $c.css({'height': ($w.height()-p) + 'px', 'overflow':'auto'});
        // $c.jScrollPane();
        isResizing = false;
    } 
}  
function get_browser()
{
    if(navigator.userAgent.indexOf("Navigator") != -1) 
        return "Netscape";
    else if(navigator.userAgent.indexOf("Android") != -1)
        return "Android";
    else if (!(false || !!document.documentMode) && !!window.StyleMedia)
        return "Edge";
    //else if(navigator.userAgent.indexOf("MSIE") != -1)
    else if(false || !!document.documentMode)
      return "IE";
    //else if(navigator.userAgent.indexOf("Chrome") != -1)
    else if(!!window.chrome && !!window.chrome.loadTimes)
        return "Chrome";//bug 21975:spec1.9-p228,[usb] the real links are different for different browsers
    //else if(navigator.userAgent.indexOf("Firefox") != -1)
    else if(typeof InstallTrigger !== 'undefined')
        return "Firefox";
    else if((navigator.userAgent.indexOf("iPad") != -1) ||
            (navigator.userAgent.indexOf("iPhone") != -1) ||
            (navigator.userAgent.indexOf("iPod") != -1))
        return "iOS";
    else if(navigator.userAgent.indexOf("Safari") != -1 )
        return "Safari";
    else if(navigator.userAgent.indexOf("Camino") != -1) 
        return "Camino"; 
    else if(navigator.userAgent.indexOf("Gecko/") != -1)
        return "Gecko"; 
    else if(navigator.userAgent.indexOf("Opera") != -1)
        return "Opera";
    else
        return "";      
} 

function get_ie_ver()
{
    var version = 999; // we assume a sane browser
    //if (navigator.appVersion.indexOf("MSIE") != -1)
        // bah, IE again, lets downgrade version number
        //version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    if (false || !!document.documentMode)
        // bah, IE again, lets downgrade version number
        version = parseFloat(document.documentMode);
    return version;
}

function setLanglistPosition()
{
    if(get_browser()=="Firefox")
    {
        if($('.tabs')[0].scrollHeight>40)
        {
            $('#lang_menu_li').css("position", "relative");
            $('#lang_menu_li').css("top", "0px");
            $('#firmware-update').css("position", "relative");
            $('#firmware-update').css("left", "-50px");
        }
        else
        {
            $('#lang_menu_li').css("position", "relative");
            $('#lang_menu_li').css("top", "0px"); 
            $('#firmware-update').css("position", "relative");
            $('#firmware-update').css("left", "0px");            
        }
    }
    else if(get_browser()=="IE")
    {
        if($('.tabs')[0].scrollHeight>40)
        {
            $('#lang_menu_li').css("position", "relative");
            $('#lang_menu_li').css("top", "-43px");
            $('#firmware-update').css("position", "relative");
            $('#firmware-update').css("left", "0px");
        }
        else
        {
            
            $('#lang_menu_li').css("position", "relative");
            $('#lang_menu_li').css("top", "0px"); 
            $('#firmware-update').css("position", "relative");
            $('#firmware-update').css("left", "0px");            
        }  
    }
}


function setFooterClass()
{
    var footer_div = top.document.getElementById("footer");
    var content = footer_div.innerHTML.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, "").replace(/\s+/g, "");
    var content_len = content.length;
    var width = document.body.clientWidth;


    if( width > 967 ){
        footer_div.className = "footer";
    }
    else{

        if(content_len > 75)
        {
            footer_div.className = "footer_double";
            $('#container').css("top", "653px");
        }
        else
        {
            footer_div.className = "footer";
            $('#container').css("top", "610px");
        }
    }
    
    var go_btn = top.document.getElementById("search_button");
    content_len = go_btn.value.length;
    
    if(content_len >= 7)
        go_btn.className = "search_button_long";
    else if(content_len >= 4)
        go_btn.className = "search_button_middle";
    else 
        go_btn.className = "search_button";
    
    var width = document.getElementById("support").clientWidth + document.getElementById("search").clientWidth;
    var screen_width = document.body.clientWidth;

    if( width < screen_width - 60 )
    {
        footer_div.className = "footer";
        $('#container').css("top", "710px");
    }
    else
    {
        footer_div.className = "footer_double";
        $('#container').css("top", "753px");
    }
}

function get_page_contain_width()
{
    var page_contain_width = document.body.clientWidth-220 > 735 ? document.body.clientWidth-220 : 735;
    var footer_div = document.getElementById("footer");
    var is_double = ( footer_div.className == "footer_double") ;

    if (is_double)
        page_contain_width = page_contain_width - 50 > 735 ? page_contain_width - 50 : 735;

    return page_contain_width;
}

function get_page_contain_height()
{
    var page_contain_height = document.documentElement.clientHeight-160 > 510+adjustPageHeight ? document.documentElement.clientHeight-160 : 510+adjustPageHeight;
    var footer_div = document.getElementById("footer");
    var is_double = ( footer_div.className == "footer_double");

    if (is_double)
        page_contain_height = page_contain_height - 50> 510+adjustPageHeight ? page_contain_height - 50 : 510+adjustPageHeight;

    return page_contain_height;
}

function subpage_resize()
{
    var page_contain_width = get_page_contain_width();
    var page_contain_height = get_page_contain_height();

    var page_width = page_contain_width - 50;
    var page_height = page_contain_height - 0;

    // if ($("#basic_label").hasClass('current')){
    if (document.getElementById('topframe').contentWindow.getCurrentLabel() == 'basic_label'){
        $('.basic-menu').css("height", page_contain_height);
        $('#page_contain').width(parseInt(page_contain_width));
        $('#page_contain').height(parseInt(page_contain_height));
        $('#page_contain').css("margin-top","5");
        $('#formframe').attr("scrolling","no");
        $('#formframe').width(parseInt(page_width));
        $('#formframe').height(parseInt(page_height));
        $('#formframe').css("margin-top","0");
        $('#formframe').css("margin-left","30");
    } else {
        $('.advance-menu').css("height", page_contain_height);
        $('#page_contain2').width(parseInt(page_contain_width));
        $('#page_contain2').height(parseInt(page_contain_height));
        $('#page_contain2').css("margin-top","5");
        $('#formframe').attr("scrolling","no");
        $('#formframe').width(parseInt(page_width));
        $('#formframe').height(parseInt(page_height));
        $('#formframe').css("margin-top","0");
        $('#formframe').css("margin-left","30");
    }

    var footer_div = document.getElementById("footer");
    var is_double = ( footer_div.className == "footer_double");

    if (!is_double) 
    {
        $('.container_center').css("width", document.body.clientWidth-40 > 925 ? document.body.clientWidth-40 : 925);
        if (get_browser()=="Netscape" || get_browser()=="Firefox")
            $('.container_center').css("top", document.body.scrollHeight > 670+adjustPageHeight ? document.body.scrollHeight : 670+adjustPageHeight);
        else if (get_browser()=="IE")
            $('.container_center').css("top", document.documentElement.clientHeight >  670+adjustPageHeight ? document.documentElement.clientHeight : 670+adjustPageHeight);
        else
            $('.container_center').css("top", document.documentElement.scrollHeight >  670+adjustPageHeight ? document.documentElement.scrollHeight : 670+adjustPageHeight);

    //$('#adv_settings_header').css("overflow-x":"hidden","overflow-y":"auto","overflow":"-moz-scrollbars-vertical !important");
    }
    else
    {
        $('.container_center').css("width", document.body.clientWidth-40 > 925 ? document.body.clientWidth-40 : 925);
        if (get_browser()=="Netscape" || get_browser()=="Firefox")
            $('.container_center').css("top", document.body.scrollHeight >  710+adjustPageHeight ? document.body.scrollHeight :  710+adjustPageHeight);
        else if(get_browser()=="IE")
            $('.container_center').css("top", document.documentElement.clientHeight >  710+adjustPageHeight ? document.documentElement.clientHeight :  710+adjustPageHeight);
        else
            $('.container_center').css("top", document.documentElement.scrollHeight >  710+adjustPageHeight ? document.documentElement.scrollHeight :  710+adjustPageHeight);
    }

    //document.getElementById('page').contentWindow.change_size(page_width, page_height);
}

function do_search()
{
    var key = document.getElementById("search_text").value.replace(/ /g,"%20");
    var winoptions = "width=960,height=800,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes";
    // var url="http://kb.netgear.com/app/answers/list/kw/"+key;
    var url="https://www.netgear.com/search.aspx?&query="+key;

    window.open(url,null,winoptions);
}
function detectEnter(type, e)
{
     var keycode, event;
     if (window.event)
        {
                event = window.event;
                keycode = window.event.keyCode;
        }
        else if (e)
        {
                event = e;
                keycode = e.which;
        }
        else 
            return true;
            
        if(type == "num")
        {
      if(keycode==13)
            do_search();
        }
        else
        return false;
}

function detectEnterV2(evt)
{
    var charCode = evt.charCode;
    if (charCode != 0) {
        if (charCode == 13) {
            do_search();
            evt.preventDefault();
        }
    }
}

function detectOS() 
{   // detect the system type of user computer
    var sUserAgent = navigator.userAgent;  
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Win64") || (navigator.platform == "Windows");  
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");  
    if (isMac) return "Mac";  
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;  
    if (isUnix) return "Unix";  
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);  
    if (isLinux) return "Linux";  
    if (isWin) {
        if(sUserAgent.indexOf("Windows Phone")!=-1){
            return "WinPhone";  
        }
            return "Win";  
    }  
    return "None";  
}

function changePwdVisibleStatus(id) {
    var type = document.getElementById(id).type;

    if (type == "password") {
        document.getElementById(id).type = "text";
        document.getElementById(id+"Slash").style.display = "none";
    }else {
        document.getElementById(id).type = "password";
        document.getElementById(id+"Slash").style.display = "";
    }
}

var SCROLL_TYPE = {
    NORMAL:         0,
    LARGE:          1,
    USB_adv_tab:    2,
};

function resize_scroll(type)
{
    switch(type)
    {
        case SCROLL_TYPE.NORMAL:
            if (get_browser() == "Safari")
                $('.scroll-pane').css('margin-top', '-44px');
            else
                $('.scroll-pane').css('margin-top', '-10px');
            break;
        case SCROLL_TYPE.LARGE:
            $('.scroll-pane').css('margin-top', '-66px');
            break;
        case SCROLL_TYPE.USB_adv_tab:
            if (get_browser() == "Chrome" || get_browser() == "Safari")
                $('.scroll-pane').css('margin-top', '-30px');
            else
                $('.scroll-pane').css('margin-top', '5px');
            break;
    }
}

function checkSetPassword(pwStr){
    var filterNumber = new RegExp("[G-Z]|[g-z]|[`~!@#$^&*()=|{}':;',\\[\\].<>!m!n/?~!I@#¢FD!K!K&*!]!^!X!X|{}!i!j!¢D!F!G!¡L!¡±'!C!A!B!H]");
    if(filterNumber.test(pwStr)){
        return false;
    }
    // after parse
    var pNumber = hexToAscii(pwStr);
    // revert number
    var rNumber = asciiToHex(pNumber);
    if(rNumber != pwStr){
        return false;
    }
    return true;
}

function asciiToHex(str)
{
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++) 
    {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}

function hexToAscii(str1)
{
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}
