function change_size_all() {
      //setFooterClass();
      subpage_resize();
}

function setLanglistPosition() {
  if(get_browser()=="Firefox") {
      if($('.tabs', window.top.frames[0].document)[0].scrollHeight > 40) {
          $('#language').css("position", "relative");
          $('#language').css("top", "0px");
          $("[name='firmware-update']").css("position", "relative");
          $("[name='firmware-update']").css("left", "0px");
      } else {
          $('#language').css("position", "relative");
          $('#language').css("top", "0px"); 
          $("[name='firmware-update']").css("position", "relative");
          $("[name='firmware-update']").css("left", "0px");
      }
  } else if(get_browser()=="IE") {
      if($('.tabs', window.top.frames[0].document)[0].scrollHeight > 40) {
          $('#language').css("position", "relative");
          $('#language').css("top", "-43px");
          $("[name='firmware-update']").css("position", "relative");
          $("[name='firmware-update']").css("left", "0px");
      } else {
          
          $('#language').css("position", "relative");
          $('#language').css("top", "0px"); 
          $("[name='firmware-update']").css("position", "relative");
          $("[name='firmware-update']").css("left", "0px");
      }
  }
}

function setFooterClass() {
  var footer_div = top.document.getElementById("footer");
  var content = footer_div.innerHTML.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, "").replace(/\s+/g, "");
  var content_len = content.length;
  var width = document.body.clientWidth;


  if( width > 967 ) {
    footer_div.className = "footer";
  } else{
    if(content_len > 75) {
      footer_div.className = "footer_double";
      $('#container').css("top", "653px");
    } else {
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

  if( width < screen_width - 60 ) {
    footer_div.className = "footer";
        $('#container').css("top", "710px");
  } else {
    footer_div.className = "footer_double";
        $('#container').css("top", "753px");
  }
}

function subpage_resize() {
  var page_contain_width = document.body.clientWidth-220 > 735 ? document.body.clientWidth-220 : 735;
  var page_contain_height = document.documentElement.clientHeight-190 > 710+adjustPageHeight ? document.documentElement.clientHeight-190 : 710+adjustPageHeight;
  var footer_div = document.getElementById("footer");
  //var is_double = ( footer_div.className == "footer_double") ;

    //if(is_double)
    //{
    //    page_contain_width = page_contain_width - 50 > 735 ? page_contain_width - 50 : 735;
    //    page_contain_height = page_contain_height - 50> 510+adjustPageHeight ? page_contain_height - 50 : 510+adjustPageHeight;
    //}
    $('.basic-menu').height(page_contain_height);
	//PEGA: Steven_ju, to fix RAXE300-177:Browser Zoom in/Zoom out display all issues, issue3-When zoom in 70% or 75% on browser, the tabs in ADVANCED page are not ordered correctly
    $('.advance-menu').height(page_contain_height);

    var page_width = page_contain_width - 50;
    var page_height = page_contain_height - 0;         
    
    $('[name=page_contain]').width(page_contain_width);  
    $('[name=page_contain]').height(page_contain_height);  

    $('#formframe').attr("scrolling","no");
    $('#formframe').width(parseInt(page_width));
    $('#formframe').height(parseInt(page_height));
    $('#formframe').css("margin-top","0");
    $('#formframe').css("margin-left","30");            
         

  var footer_div = document.getElementById("footer");
  var is_double = ( footer_div.className == "footer_double") ;    
    
    if(!is_double) {
        $('.container_center').css("width", document.body.clientWidth-40 > 925 ? document.body.clientWidth-40 : 925);
    if(get_browser()=="Netscape" || get_browser()=="Firefox")
      $('.container_center').css("top", document.body.scrollHeight >  670+adjustPageHeight ? document.body.scrollHeight :  670+adjustPageHeight); 
    else if(get_browser()=="IE")
      $('.container_center').css("top", document.documentElement.clientHeight >  670+adjustPageHeight ? document.documentElement.clientHeight :  670+adjustPageHeight); 
    else
      $('.container_center').css("top", document.documentElement.scrollHeight >  670+adjustPageHeight ? document.documentElement.scrollHeight :  670+adjustPageHeight); 

    //$('#adv_settings_header').css("overflow-x":"hidden","overflow-y":"auto","overflow":"-moz-scrollbars-vertical !important");
    } else{
        $('.container_center').css("width", document.body.clientWidth-40 > 925 ? document.body.clientWidth-40 : 925);
    if(get_browser()=="Netscape" || get_browser()=="Firefox")
      $('.container_center').css("top", document.body.scrollHeight >  710+adjustPageHeight ? document.body.scrollHeight :  710+adjustPageHeight);
    else if(get_browser()=="IE")
      $('.container_center').css("top", document.documentElement.clientHeight >  710+adjustPageHeight ? document.documentElement.clientHeight :  710+adjustPageHeight);   
    else
      $('.container_center').css("top", document.documentElement.scrollHeight >  710+adjustPageHeight ? document.documentElement.scrollHeight :  710+adjustPageHeight);    
    }         

}

function iframeResize(iframe) {
alert("Enter iframeResize "+iframe);
              if(iframe && !window.opera) {
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

function change_size(content) {
    //from different content, not a iframe.
    var target;

    try {
     target = content[0];
    } catch (e) {
      target = window;
    }

    if (target == undefined || target == null) {
      target = window;
    }
    var width = target.document.documentElement.clientWidth > 620 ? target.document.documentElement.clientWidth : 620;
    var height = target.document.documentElement.clientHeight;
  
/*
    if(get_browser()=="iOS") {
        width = parent.document.documentElement.clientWidth - 25;
        height = parent.document.documentElement.clientHeight - 80;
  }
*/
    
    if(get_browser()=="Netscape") 
        target.$('.subhead2-table').css("left", 1);
    target.$('.subhead2-table').css("width", width-27);
    target.$('.scroll-pane').css("width", width-27);
    
    //if top is present, then adjust form-sub-section.
    if(target.$('#form-top-section').get()) {    
        //$('.subhead2-table').css("height", height-226);
        //$('.scroll-pane').css("height", height-226);
        target.$('#form-sub-section').css("height", height -352 - 120);
        //$(".scroll-pane").parent().css("height", height-352);
    }

    // help section 
    if (target.$('.help-section').get().length != 0) {
        //help btns re-size
        target.$('.subhead2-bottom').css("width", width);
        target.$('.button-help-arrow').css("position", "absolute");
        target.$('.button-help-arrow').css("left", width / 2);

        //$('.help-main-content').css("width", width -70+ "px");
        if(get_ie_ver() != 9) {
           target.$('.help-main-content').jScrollPane('scrollbarMargin:5px');
        }

        var isResizing;
        if (!isResizing) {
            isResizing = true;
            target.$('.help-main-content').jScrollPane();
        }
    }
    var containHeight = window.top.$("[name='page_contain']").css("height");
    window.top.$("iframe:eq(1)").height(parseInt(containHeight));
    if(window.top.$("iframe:eq(1)")[0].contentWindow.location.pathname.indexOf("BAS_") != -1)
    {
        target.$("#main").height( parseInt(containHeight)-340);
    }
    else if(window.top.$("iframe:eq(1)")[0].contentWindow.location.pathname.indexOf("ADVANCED_home.html") != -1)
    {
        target.$("#main").height( parseInt(containHeight)-70); //for ADVANCED_home.html page resize
    }
    else
    {
        target.$("#main").height( parseInt(containHeight)-190);
        target.$("#main1").height( parseInt(containHeight)-190); // for WLG_wireless_adv.html
        target.$("#mainEdit").height( parseInt(containHeight)-190); // for BKS_service.html
        //target.$("#main").css("overflow","auto");
    }
    target.$('.cover-image').css("display", "none");
         
}

function get_browser() {
  if(navigator.userAgent.indexOf("Navigator") != -1) 
        return "Netscape";
    else if (!(false || !!document.documentMode) && !!window.StyleMedia)
        return "Edge";
    //else if(navigator.userAgent.indexOf("MSIE") != -1)
    else if(false || !!document.documentMode)
      return "IE";
  //else if(navigator.userAgent.indexOf("Chrome") != -1)
    else if(!!window.chrome && !!window.chrome.webstore)
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

function get_ie_ver() {
    var version = 999; // we assume a sane browser
    //if (navigator.appVersion.indexOf("MSIE") != -1)
    // bah, IE again, lets downgrade version number
    //version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    if (false || !!document.documentMode)
        // bah, IE again, lets downgrade version number
        version = parseFloat(document.documentMode);
    return version;
}
