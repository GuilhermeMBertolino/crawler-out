
function liveMenuClick() {

  window.top.$('.noSub , .noSubLarge , .noSubActive, .noSubActiveLarge').off("click");
  window.top.$('.basic-menu-div').off("click");

  if( window.top.$('#wizard').hasClass('noSubGray')){
    window.top.$('#wizard').bind('contextmenu', function(e) {
     e.preventDefault();
   });
  }

  $('#AdvanceTab').on("click", function(){
    $(".current").removeClass("current");
    $(this).parent().addClass("current");
    window.top.$("#basic-pane").hide();
    window.top.$("#adv-pane").show();
    window.top.$('.subHeader').hide();
    window.top.$('.noSubActive').removeClass('noSubActive');
    window.top.$('.noSubActiveLarge').removeClass('noSubActiveLarge');
    window.top.$('.SubMenuActive').addClass('SubMenu');
    window.top.$('.SubMenuActive').removeClass('SubMenuActive');
    window.top.$('.SubMenuActiveLarge').addClass('SubMenuLarge');
    window.top.$('.SubMenuActiveLarge').addClass('SubMenu');
    window.top.$('.SubMenuActiveLarge').addClass('Large');
    window.top.$('.SubMenuActiveLarge').removeClass('SubMenuActiveLarge');
    window.top.$('.SubActive').addClass('Sub');
    window.top.$('.SubActive').removeClass('SubActive');
    if(window.top.$('#adv-home').hasClass('noSubLarge'))
      window.top.$('#adv-home').addClass('noSubActiveLarge');
    else
      window.top.$('#adv-home').addClass('noSubActive');
    window.top.$('.subHeader:visible').slideUp('fast');
    loadPage("ADVANCED_home.html");
  });

  $('#BasicTab').on("click", function(){
    $(".current").removeClass("current");
    $(this).parent().addClass("current");
    window.top.$("#adv-pane").hide();
    window.top.$("#basic-pane").show();
    window.top.$('.subHeader').hide();
    window.top.$('.menuActive').removeClass('menuActive');
    window.top.$('#basic-home').addClass('menuActive');
    loadPage("DashBoard.html");
  });

  window.top.$('.basic-menu-div').on("click", function(ev){
    if($(this)[0].getAttribute('id') != "basic-dlr")
    {
      window.top.$('.menuActive').removeClass('menuActive');
      $(this).addClass('menuActive');
      var path = $(this).children("a").attr("href");
      loadPage(path);
    }
    ev.preventDefault();
  });

  window.top.$('.noSub').on("click",function(ev){
    window.top.$("#basic-pane").hide();
    if( !$(this).hasClass('noSubGray') & !$(this).hasClass('noSubGrayLarge')){
      window.top.$('.noSubActive').removeClass('noSubActive');
      window.top.$('.noSubActiveLarge').removeClass('noSubActiveLarge');
      window.top.$('.SubActive').addClass('Sub');
      window.top.$('.SubActive').removeClass('SubActive');
      window.top.$('.SubMenuActive').addClass('SubMenu');
      window.top.$('.SubMenuActiveLarge').addClass('SubMenuLarge');
      window.top.$('.SubMenuActiveLarge').addClass('SubMenu');
      window.top.$('.SubMenuActiveLarge').addClass('Large');
      window.top.$('.SubMenuActiveLarge').removeClass('SubMenuActiveLarge');
      window.top.$('.SubMenuActive').removeClass('SubMenuActive');
      if($(this).hasClass('noSubLarge'))
        $(this).addClass('noSubActiveLarge');
      else
        $(this).addClass('noSubActive');
      $('.subHeader:visible').slideUp('fast');
      var path = $(this).children("a").attr("href");
      loadPage(path);
      ev.preventDefault();
    }else{
      return false;
    }
  });

  window.top.$('.noSubLarge').on("click",function(ev){
    window.top.$("#basic-pane").hide();
    if( !$(this).hasClass('noSubGray') & !$(this).hasClass('noSubGrayLarge')){
      window.top.$('.noSubActive').removeClass('noSubActive');
      window.top.$('.noSubActiveLarge').removeClass('noSubActiveLarge');
      window.top.$('.SubActive').addClass('Sub');
      window.top.$('.SubActive').removeClass('SubActive');
      window.top.$('.SubMenuActive').addClass('SubMenu');
      window.top.$('.SubMenuActiveLarge').addClass('SubMenuLarge');
      window.top.$('.SubMenuActiveLarge').addClass('SubMenu');
      window.top.$('.SubMenuActiveLarge').addClass('Large');
      window.top.$('.SubMenuActiveLarge').removeClass('SubMenuActiveLarge');
      window.top.$('.SubMenuActive').removeClass('SubMenuActive');
      if($(this).hasClass('noSubLarge'))
        $(this).addClass('noSubActiveLarge');
      else
        $(this).addClass('noSubActive');
      window.top.$('.subHeader:visible').slideUp('fast');
      var path = $(this).children("a").attr("href");
      loadPage(path);
      ev.preventDefault();
    }else{
      return false;
    }
  });

  window.top.$('.noSubGray').bind("click", function(e){
    e.preventDefault();
  });

  window.top.$('.noSubGray').bind("contextmenu", function(e){
    e.preventDefault();
  });

  window.top.$('.noSubGrayLarge').on("click",function(){
    return false;
  });

  window.top.$('.basic-menu-div-gray').bind("click", function(e){
    e.preventDefault();
  });

  window.top.$('.basic-menu-div-gray').bind("contextmenu", function(e){
    e.preventDefault();
  });

  window.top.$('.Sub').click(function(){
    adjustPageLayout();
  });
  
  window.top.$('.SubMenu').on("click",function(ev){
    window.top.$("#basic-pane").hide();
    if( !$(this).hasClass('SubMenuDisable') && !$(this).hasClass('SubMenuLargeDisable')){
      window.top.$('.noSubActive').removeClass('noSubActive');
      window.top.$('.noSubActiveLarge').removeClass('noSubActiveLarge');
      window.top.$('.SubMenuActive').addClass('SubMenu');
      window.top.$('.SubMenuActive').removeClass('SubMenuActive');
      window.top.$('.SubMenuActiveLarge').addClass('SubMenuLarge');
      window.top.$('.SubMenuActiveLarge').addClass('SubMenu');
      window.top.$('.SubMenuActiveLarge').addClass('Large');
      window.top.$('.SubMenuActiveLarge').removeClass('SubMenuActiveLarge');
      if($(this).hasClass('Large'))
        $(this).addClass('SubMenuActiveLarge');
      else
        $(this).addClass('SubMenuActive');
      $(this).removeClass('SubMenu');
      $(this).removeClass('SubMenuLarge');
      var path = $(this).children("a").attr("href");
      loadPage(path);
      ev.preventDefault();
    }else{
      return false;
    }
  });

  window.top.$('.SubMenuActive').on("click",function(ev){
    window.top.$("#basic-pane").hide();
    var path = $(this).children("a").attr("href");
    loadPage(path);
    ev.preventDefault();
  });

  window.top.$('.SubMenuActiveLarge').on("click",function(ev){
    window.top.$("#basic-pane").hide();
    var path = $(this).children("a").attr("href");
    loadPage(path);
    ev.preventDefault();
  });

  window.top.$('#go').click(function(ev){
    var text = $('#searchText').val();
    var URItext = encodeURIComponent(text);

    URItext =  "http://support.netgear.com/app/answers/list/kw/" + URItext;
    window.open(URItext,'_blank','fullscreen=yes,toolbar=yes,locaiton=yes,scrollbars=yes');
  });

  window.top.$('.SubMenuDisable').on("click",function(){
    return false;
  });

  window.top.$('.SubMenuLargeDisable').on("click",function(){
    return false;
  });

  window.top.$('.SubMenuDisable').on( "contextmenu", function(){
    return false;
  });

  window.top.$('.SubMenuLargeDisable').on( "contextmenu", function(){
    return false;
  });
}

function advanceMenu()
{
  $('.subHeader').hide();

  $('.Sub').click(function() {
    $('#basic-pane').hide();
    var checkElement = $(this).next();
    if((checkElement.is('li')) && (checkElement.is(':visible'))) {
      $('.subHeader:visible').slideUp('fast');
      $(this).removeClass('SubActive');
      $(this).addClass('Sub');
      return false;
    }
    if((checkElement.is('li')) && (!checkElement.is(':visible'))) {
      $('.subHeader:visible').slideUp('fast');
      checkElement.slideDown('normal');
      $('.SubActive').addClass('Sub');
      $('.SubActive').removeClass('SubActive');
      $(this).addClass('SubActive');
      $(this).removeClass('Sub');
      return false;
    }
  });
}

function adjustPageLayout() {
  var entry = 0;

  $('.subMenu_text').each(function(){
    if($(this)[0].clientHeight > 15){
      if($(this)[0].parentNode.parentNode.parentNode.getAttribute('id') == "adv_settings_header")
        window.top.num_submenuLarge++;
      var menuHeight = $($(this)[0].parentNode.parentNode.parentNode).css('height');
      var menuHeight2 = menuHeight.replace("px", "");
      $($(this)[0].parentNode.parentNode.parentNode).css('height',(parseInt(menuHeight2)+12)+"px");
      $($(this)[0].parentNode.parentNode).addClass('Large');
      if($($(this)[0].parentNode.parentNode).hasClass('SubMenuDisable')) {
        $($(this)[0].parentNode.parentNode).removeClass('SubMenuDisable');
        $($(this)[0].parentNode.parentNode).addClass('SubMenuLargeDisable');
      } else
        $($(this)[0].parentNode.parentNode).addClass('SubMenuLarge');
    }else{
      $($(this)[0].parentNode.parentNode).removeClass('Large');
      $($(this)[0].parentNode.parentNode).removeClass('SubMenuLarge');
    }
  });

  $('.nosub_text').each(function(){
    if($(this)[0].clientHeight > 16){
      window.top.num_nosubLarge++;
      if($($(this)[0].parentNode.parentNode).hasClass('noSubGray'))
        $($(this)[0].parentNode.parentNode).addClass('noSubGrayLarge');
      else
        $($(this)[0].parentNode.parentNode).addClass('noSubLarge');
      $($(this)[0].parentNode.parentNode).removeClass('noSub');
      $($(this)[0].parentNode.parentNode).removeClass('noSubGray');
    }else{
      $($(this)[0].parentNode.parentNode).removeClass('noSubLarge');
      $($(this)[0].parentNode.parentNode).removeClass('noSubGrayLarge');
    }
  });

  window.top.adjustPageHeight = 16 * window.top.num_nosubLarge + 15 * window.top.num_submenuLarge;
}
function doiFrameChangePage(path) {
    window.top.$('#formframe').attr("src",path);
}

function loadPage(path) {
  var page_contain_width = document.body.clientWidth-220 > 735 ? document.body.clientWidth-220 : 735;
  var page_contain_height = document.documentElement.clientHeight-160 > 470+window.top.adjustPageHeight ? document.documentElement.clientHeight-160 : 470+window.top.adjustPageHeight;
  if($("#BasicTab").hasClass('current')) {
    $('.basic-menu').css("height", page_contain_height);
  } else {
    $('.advance-menu').css("height", page_contain_height);
  }
  
  
  
  if(path.toString().indexOf("DashBoard.html") != -1){
    var page_width = page_contain_width - 130;
    var page_height = page_contain_height - 45;

    window.top.$('[name=page_contain]').width(parseInt(page_contain_width));
    //window.top.$('[name=page_contain]').height(parseInt(page_contain_height));
    window.top.$('[name=page_contain]').css("margin-top","5");
    if(navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/)) || navigator.userAgent.match(/rv:11/) || (typeof $.browser !== 'undefined' && $.browser.msie == 1)){
      window.top.$('[name=page_contain]').html("<iframe id=\"formframe\" src='' scrolling=\"no\" style=\" background-color:#E5E5E5;width:"+page_width+"px;height:"+page_height+"px;margin-top:0;margin-left:30px\" frameborder=\"0\" border=\"0\" cellspacing=\"0\" onFocus=\"this.blur()\"></iframe>");
    }else{
      window.top.$('#formframe').attr("scrolling","no");
      window.top.$('#formframe').width(parseInt(page_width));
      window.top.$('#formframe').height(parseInt(page_height));
      window.top.$('#formframe').css("margin-top","0");
      window.top.$('#formframe').css("margin-left","30");
    }
    window.top.$('#formframe').css("visibility","hidden");
    window.top.$('[name=page_contain]').addClass('main-page-contain-loading');
    window.top.$('#formframe').delay(1000).attr("src",path);

    window.top.$('#formframe').on("load", function(){
      window.top.$('#formframe').css("visibility","visible");
      window.top.$('[name=page_contain]').removeClass('main-page-contain-loading');
    });
  }else if(path.search("netgear") != -1){
    window.open(path,'_blank','fullscreen=yes,toolbar=yes,location=yes,scrollbars=yes');
  }else{
    var page_width = page_contain_width - 50;
    var page_height = page_contain_height - 0;

    window.top.$('[name=page_contain]').width(parseInt(page_contain_width));
    //window.top.$('[name=page_contain]').height(parseInt(page_contain_height));
    window.top.$('[name=page_contain]').css("margin-top","5");
    if(navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/)) || navigator.userAgent.match(/rv:11/) || (typeof $.browser !== 'undefined' && $.browser.msie == 1)){
      window.top.$('[name=page_contain]').html("<iframe id=\"formframe\" src='' scrolling=\"no\" style=\"background-color:#E5E5E5;width:"+page_width+"px;height:"+page_height+"px;margin-top:0px;margin-left:30px\" frameborder=\"0\" border=\"0\" cellspacing=\"0\" onFocus=\"this.blur()\"></iframe>");
    }else{
      window.top.$('#formframe').attr("scrolling","no");
      //window.top.$('#formframe').css("overflow-x","hidden");
      //window.top.$('#formframe').css("overflow-y","hidden");
      window.top.$('#formframe').width(parseInt(page_width));
      window.top.$('#formframe').height(parseInt(page_height));
      $('#formframe').css("margin-top","0");
      window.top.$('#formframe').css("margin-left","30");
    }
    window.top.$('#formframe').css("visibility","hidden");
    window.top.$('[name=page_contain]').addClass('main-page-contain-loading');
    window.top.$('#formframe').attr("src",path);
    window.top.$('#formframe').on("load", function()
    {
      window.top.$('#formframe').css("visibility","visible");
      window.top.$('[name=page_contain]').removeClass('main-page-contain-loading');
    });
    
    var containHeight = window.top.$("[name='page_contain']").css("height")
    window.top.$("iframe:eq(1)").height(containHeight);
    window.top.$("#container").height(containHeight);
  }
  return false;
}

function loadPage2(path) {
  while(is_loading_page == 1) {}
  is_loading_page = 1;
  var page_contain_width = document.body.clientWidth-220 > 735 ? document.body.clientWidth-220 : 735;
  var page_contain_height = document.documentElement.clientHeight-160 > 470+window.top.adjustPageHeight ? document.documentElement.clientHeight-160 : 470+window.top.adjustPageHeight;
  $('.advance-menu').css("height", page_contain_height);
  var gui_region = document.forms[0].curlang.value;
  if(gui_region=="Spanish"){
    $('.advance-menu li.SubMenuLarge span').css("width", "174px");
    $('.advance-menu li.SubMenuActiveLarge span').css("width", "174px");
  }
  if(path.search("ADVANCED_home.html") != -1){
    var page_width = page_contain_width - 130;
    var page_height = page_contain_height - 45;

    $('[name=page_contain]').width(parseInt(page_contain_width));
    $('[name=page_contain]').height(parseInt(page_contain_height));
    $('[name=page_contain]').css("margin-top","5");
    if(navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/)) || navigator.userAgent.match(/rv:11/) || (typeof $.browser !== 'undefined' && $.browser.msie == 1)){
    $('[name=page_contain]').html("<iframe id=\"formframe\" src='' scrolling=\"no\" style=\"background-color:#E5E5E5;width:"+page_width+"px;height:"+page_height+"px;margin-top:0;margin-left:30px\" frameborder=\"0\" border=\"0\" cellspacing=\"0\" onFocus=\"this.blur()\"></iframe>");
    }else{
      $('#formframe').attr("scrolling","no");
      $('#formframe').width(parseInt(page_width));
      $('#formframe').height(parseInt(page_height));
      $('#formframe').css("margin-top","0");
      $('#formframe').css("margin-left","50");
    }
    $('#formframe').css("visibility","hidden");
    $('[name=page_contain]').addClass('main-page-contain-loading');
    $('#formframe').attr("src",path);

    $('#formframe').on("load", function()
    {
      $('#formframe').css("visibility","visible");
      $('[name=page_contain]').removeClass('main-page-contain-loading');
    });
  }else if(path.search("netgear") != -1){
    window.open(path,'_blank','fullscreen=yes,toolbar=yes,location=yes,scrollbars=yes');
  }else{
    var page_width = page_contain_width - 50;
    var page_height = page_contain_height - 0;

    $('[name=page_contain]').width(parseInt(page_contain_width));
    $('[name=page_contain]').height(parseInt(page_contain_height));

    if(navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/)) || navigator.userAgent.match(/rv:11/) || (typeof $.browser !== 'undefined' && $.browser.msie == 1)){
      $('[name=page_contain]').html("<iframe id=\"formframe\" src='' scrolling=\"no\" style=\"background-color:#E5E5E5;width:"+page_width+"px;height:"+page_height+"px;overflow-x:hidden;margin-top:0px;margin-left:30px\" frameborder=\"0\" border=\"0\" cellspacing=\"0\" onFocus=\"this.blur()\"></iframe>");
    }else{
      $('#formframe').attr("scrolling","no");
      $('#formframe').css("overflow-x","hidden");
      $('#formframe').css("overflow-y","hidden");
      $('#formframe').width(parseInt(page_width));
      $('#formframe').height(parseInt(page_height));
      $('#formframe').css("margin-top","0");
      $('#formframe').css("margin-left","30");
    }
    $('#formframe').css("visibility","hidden");
    $('[name=page_contain]').addClass('main-page-contain-loading');
    $('#formframe').attr("src",path);
    $('#formframe').on("load", function()
    {
      $('#formframe').css("visibility","visible");
      $('[name=page_contain]').removeClass('main-page-contain-loading');
    });
  }
  is_loading_page=0;
  return false;
}

function change_size_ADVPage() {
  var isResizing;
  // IE triggers the onResize event internally when you do the stuff in this function
  // so make sure we don't enter an infinite loop and crash the browser
  if (!isResizing) {
    isResizing = true;
    $w = $(window);
    $c = $('#scroll-pane');
    var p = (parseInt($c.css('paddingLeft')) || 0) + (parseInt($c.css('paddingRight')) || 0);
    $('body>.jScrollPaneContainer').css({'height': $w.height() + 'px'});
    if(window.top.get_browser()=="Chrome")
        $c.css({'height': ($w.height()-p) + 'px', 'overflow':'no'});
    else
        $c.css({'height': ($w.height()-p) + 'px', 'overflow':'auto'});
    $c.jScrollPane();
    isResizing = false;
  } 
}

function highLightMenu(title, subtitle) {
    var checkElement = parent.$('#'+title).next();  
    parent.$("#basic-pane").hide();

    if((checkElement.is('li')) && (!checkElement.is(':visible'))) { 
        parent.$('.subHeader:visible').slideUp('fast');
        checkElement.slideDown('normal');      
        parent.$('.SubActive').addClass('Sub');
        parent.$('.SubActive').removeClass('SubActive');
        parent.$('#'+title).addClass('SubActive');
        parent.$('#'+title).removeClass('Sub');
    }
       
    if( !parent.$('#'+subtitle).hasClass('SubMenuDisable') && !parent.$('#'+subtitle).hasClass('SubMenuLargeDisable')) {  
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
     } else {     
        return false;
     }                           
}
