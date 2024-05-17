var mPreviousHelp = "";
var CSRF_TOKEN = "";
var CSRF_TOKEN_TOP = "";
var CSRF_TOKEN_SUB = "";

// Fix IE can't support remove()
// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

function escapeDollarSign(inputString) {
  let escapedString = '';

  if( !isNaN(inputString) ) {
    return inputString;
  }

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === '$') {
      escapedString += '$$'; // Replace $ with $$
    } else {
      escapedString += inputString[i]; // Keep other characters unchanged
    }
  }
  return escapedString;
}

/*
 * the fetch data is a josn string which conatin a "key -> value" and a "key-type(optional)"
 * the key is the smae of the input element's name.
 * so we can findout the element and fill out the form by specific type.
 */
function fillOutTableData(tableId, json, tableTemplate) {
  var tableData;
  if(json)
  {
      try{
          tableData = JSON.parse(json);
      }
      catch(e){
          console.log(e);
          return ;
      }
  }

  //var tbodyTag = '<tbody class="tbody_content"></tbody>';
  //$('#' + tableId).append(tbodyTag);
  for (index in tableData) {
    var tableStr = tableTemplate;

    data = tableData[index];
    for (key in data) {
      var regex = new RegExp(key, 'g');
      var newStr = tableStr.replace(regex, escapeDollarSign(data[key]));
      tableStr = newStr;
    }
    $('#'+ tableId).append(tableStr);
  }
  if(window.opener != null && !window.opener.closed)
  {
      window.opener.top.mlangInit($('#' + tableId));
  }
  else
  {
  window.top.mlangInit($('#' + tableId));
  }    
}

function fetchTableData(tableId, path, tableTemplate, preFilloutTableCallback, postFilloutTableCallback) {
  path = "php/db/" + path + "_data" + ".php";
  var jqxhr = $.ajax(path)
    .done(function(e) {
      if (preFilloutTableCallback != undefined && preFilloutTableCallback != null && preFilloutTableCallback != "") {
            eval(preFilloutTableCallback + "(e)");
      }
      fillOutTableData(tableId, e, tableTemplate);
    })
    .fail(function(e) {
      //addToast("warning", "<strong>Error:</strong>", 'now',  "<strong>\"" + path + "\"</strong> can't retrieve data");
      //addAlert("danger", "<strong>Error:</strong> \"" + path + "\" can't retrieve data");
      console.log( "ERROR: can't retrieve data" + e );
    })
    .always(function(e) {
      //alert( "complete" + e );
        if (postFilloutTableCallback != undefined && postFilloutTableCallback != null && postFilloutTableCallback != "") { 
            eval(postFilloutTableCallback + "()");
        }
    });
    // Perform other work here ...
} 
 
function fillOutData(formId, json) {
  var data;
  if(json)
  {
      try{
          data = JSON.parse(json);
      }
      catch(e){
          console.log(e);
          return ;
      }
  }

  for (key in data) {
    var type = data[key]['type'];
    if ( type == undefined || type == "input") {
      //normal input.
      $('#' + formId + ' input[name=' + key + ']').val(data[key]['value']);
    } else if (type == "switch") {
      //switch, 1 = true (on), 0 = false (off);
      var element = $('#' + formId + ' input[name=' + key + ']');
      var checked = (data[key]['enabled'] == 1);
      element.prop('checked', checked);
        element.val(data[key]['value']);
      element.change();
    } else if (type == "select") {
      $('#' + formId + ' [name=' + key + ']').val(data[key]['value']).change();
    } else if (type == "radio") {
       $('#' + formId + ' [name=' + key + ']').each(function() {
        if ($(this).val() == data[key]['value'])
          $(this).click();
        });
    } else if (type == "checkbox") {
      if (data[key]['value'] == $('#' + formId + ' [name=' + key + ']').val()) {
        $('#' + formId + ' [name=' + key + ']').prop("checked", true);
      }
      else {
        $('#' + formId + ' [name=' + key + ']').val(data[key]['value']);
      }
    } else if (type == "ip") {
        var ipAddr = $('#' + formId + ' #' + key + '-ip').ipInput();
        ipAddr.setIp(data[key]['value']);

        if(typeof data[key]['idStr_prefix'] == "string" && data[key]['idStr_prefix'].length > 0)
        {
            if (typeof data[key]['idStr_postfix'] == "string" && data[key]['idStr_postfix'].length > 0) {
                $('#' + key + '-ip :input').each(function(index){
                    $(this).attr("id", data[key]['idStr_prefix'] + (index+1) + data[key]['idStr_postfix']);  
                });
            }
            else {
                $('#' + key + '-ip :input').each(function(index){
                    $(this).attr("id", data[key]['idStr_prefix']+(index+1));  
                });
            }
        }
    } else if (type == "ipv6") {
        var ipv6Addr = $('#' + formId + ' #' + key + '-ipv6').ipv6Input();
        ipv6Addr.setIpv6(data[key]['value']);

        if(typeof data[key]['idStr_prefix'] == "string" && data[key]['idStr_prefix'].length > 0)
        {
            if (typeof data[key]['idStr_postfix'] == "string" && data[key]['idStr_postfix'].length > 0) {
                $('#' + key + '-ipv6 :input').each(function(index){
                    $(this).attr("id", data[key]['idStr_prefix'] + (index+1) + data[key]['idStr_postfix']);  
                });
            }
            else {
                $('#' + key + '-ipv6 :input').each(function(index){
                    $(this).attr("id", data[key]['idStr_prefix']+(index+1));  
                });
            }
        }
    } else if (type == "ipv6id") {
        var ipv6Id = $('#' + formId + ' #' + key + '-ipv6id').ipv6IdInput();
        ipv6Id.setIpv6Id(data[key]['value']);

        if(typeof data[key]['idStr_prefix'] == "string" && data[key]['idStr_prefix'].length > 0)
        {
            if (typeof data[key]['idStr_postfix'] == "string" && data[key]['idStr_postfix'].length > 0) {
                $('#' + key + '-ipv6id :input').each(function(index){
                    $(this).attr("id", data[key]['idStr_prefix'] + (index+1) + data[key]['idStr_postfix']);  
                });
            }
            else {
                $('#' + key + '-ipv6id :input').each(function(index){
                    $(this).attr("id", data[key]['idStr_prefix']+(index+1));  
                });
            }
        }
    } else if (type == "spantext") {
        var element = $('#' + formId + ' span[name=' + key + ']');
        element.html(data[key]['value']);
        if(data[key]['mlang'] !== undefined)
        {
            if(data[key]['mlang'] === null || data[key]['mlang'] === "")//define mlang object but get null or empty value;
                element.removeAttr("mlang");
            else
                element.attr("mlang", data[key]['mlang']);
        }
    } else if (type == "selectOptionList") {
        $.each(data[key]['value'],function (i, v){
           var o = new Option(v, i);
           $(o).html(v);
           $('#' + formId + ' select[name=' + key + ']').append(o);
        });
    } else if (type == "advTableRow") {//for Advanced Home
        var mlangTd = '';
        if(data[key]['mlang'] != "")
           mlangTd = '<td class="basic-text-menu" mlang="'+ data[key]['mlang'] +'"></td>\r\n';
        else if(data[key]['mlangText'] != "")
           mlangTd = '<td class="basic-text-menu">' + data[key]['mlangText'] + '</td>\r\n';
        else
           mlangTd = '<td class="basic-text-menu"></td>\r\n';
        var trRow = '<tr class="basic-text">\r\n' + mlangTd +
                    '<td class="basic-text-content" >' + data[key]['value'] + '</td>\r\n\
                    </tr>\r\n';

        $("#" + key.split("__")[0]).append(trRow);
    }
    else if (type == "nopost")
    {
        // do nothing
    }
  }
}

function fetchData(formId, path, preFilloutCallback, postFilloutCallback) {
  path = "php/db/" + path + "_data" + ".php";
  var jqxhr = $.ajax(path)
    .done(function(e) {
        if (preFilloutCallback != undefined && preFilloutCallback != null && preFilloutCallback != "") {
            eval(preFilloutCallback + "(e)");
        }          
        fillOutData(formId, e);
    })
    .fail(function(e) {
      //addToast("warning", "<strong>Error:</strong>", 'now',  "<strong>\"" + path + "\"</strong> can't retrieve data");
      //addAlert("danger", "<strong>Error:</strong> \"" + path + "\" can't retrieve data");
      console.log( "ERROR: can't retrieve data" + e );
    })
    .always(function(e) {
        //alert( "complete" + e );
        if (postFilloutCallback != undefined && postFilloutCallback != null && postFilloutCallback != "") { 
            eval(postFilloutCallback + "()");
        }
    });
    // Perform other work here ...
}



function observeHelpHash(hash) {
  //jump to anchor.
  if (hash != undefined &&  hash != '') {
    //move the pane to 100 first to solve the problem that anchor cannot be positioned correctly.
    //$('.jspPane').css("top", 0);
    $("#helpframe")[0].contentWindow.setTimeout(function(){
      $("#helpframe")[0].contentWindow.location.hash = 'help-' + hash;
    }, 150);
  }
}
function loadhelp(fname,anchname)
{
    var path = "help/" + fname + "_h" + ".html";
    var pane = $("#helpframe").contents().find("#content");
    
    $("#helpframe").on("load",function(){
        var pane = $("#helpframe").contents().find("#content");
        window.top.mlangInit(pane);
        pane.find('p, a').each(function() {
            var attrName = $(this).attr('name');
            if (attrName != undefined && attrName != '') {
               $(this).attr('id', 'help-' + attrName);
            }
        });
    });

    if (path == mPreviousHelp) {
      var imgSrc = document.getElementById('help-button');
  
      if(imgSrc.src.search("up") < 0) {
        observeHelpHash(anchname);
      } 
      return;
    }
  
    mPreviousHelp = path;
    document.getElementById("helpframe").src = path;
}
/*    
function loadhelp(path, anchname) {
  path = "help/" + path + "_h" + ".html";
  if (path == mPreviousHelp) {
    //when the help page is the same as previous, do not load again.
    observeHelpHash(anchname);
    return;
  }
  mPreviousHelp = path;
  var jqxhr = $.ajax(path)
  .done(function(data) {
    var jqObj = $('<div></div>').html(data);
    $('#help-text-content').html(''); //clean first.
    $('#help-text-content').append(window.top.mlangInit(jqObj.find('#content')).html());
    //currently the anchor is change to id, so we need a prefix to avoid collision with real elements.
    $('#help-text-content p,#help-text-content a').each(function() {
      var attrName = $(this).attr('name');
      if (attrName != undefined && attrName != '') {
        $(this).attr('id', 'help-' + attrName);
      }
    });

    observeHelpHash(anchname);
  })
  .fail(function(e) {
    //type, title, time, msg, autohide
    //addToast("warning", "<strong>Error:</strong>", 'now',  "<strong>\"" + path + "\"</strong> can't retrieve data");
    $(helpDivId).get(0).innerHTML = "";
    console.log( "ERROR: can't retrieve data" + e );
  });

}
*/

function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('.help-main-content').animate({scrollTop: aTag.offset().top},'slow');
}

function defaultHandler(json) {
  if (json.code == -1) {
    //ajax error, Check if the page exists
    console.log("ajax error : " + json.message);
    document.location.reload();
  } else if (json.code == 0 || json.status == "success") {
    //ajax done, and return success.
    document.location.reload();
  } else {
    if(json.code == undefined) {
      alert("Server error!");
      document.location.reload(); 
    }
    //json.code = (> 0) show the corresponding message.
  }
}

 /**
 * @function post form data.
 * @param {handler} - specify the cgi handler on the httpd server to handle the post.
 * @param {container id or class} - the id or class of the container
 * @param {url} - request url, if it's NULL or empty, it will auto get formId's action value.
 * @param {callback} - fired when ajax done.
 * @param {time} - the value of timeout
 */
$.postForm = function(handler, container, url, callback, time) {
  if (!$(container).length) {
      alert('Error form!');
      return;
  }

  //url
  if (url == '') {
    url = $(container).attr("action");
    if (url == '')
      url = $(container).parents('form').first().attr("action");
  }

  //post data
  var data = JSON.stringify($(container).serializeObject(handler));
  console.log(data);

  if(CSRF_TOKEN != undefined && CSRF_TOKEN != "")
      url = url +'?csrftoken=' + CSRF_TOKEN ;
  else if(CSRF_TOKEN_TOP != undefined && CSRF_TOKEN_TOP != "")
      url = url +'?csrftoken_top=' + CSRF_TOKEN_TOP ;
  else if(CSRF_TOKEN_SUB != undefined && CSRF_TOKEN_SUB != "")
      url = url +'?csrftoken_sub=' + CSRF_TOKEN_SUB ;
  //alert(url);

  $.ajax({
    url: url,
    type: "POST",
    data: data,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function(json) {
      (callback != null) ? eval(callback + "(json)") : defaultHandler(json);
    },
    error: function(xhr) {
      var json = {
        "code": "-1",
        "message": xhr.status + " " + xhr.statusText,
      };
      (callback != null) ? eval(callback + "(json)") : defaultHandler(json);
    },
    timeout: time ? time : 0,
  });
};

/*
 * @function to serialize a container.
 * @param {handler} - specify the cgi handler on the httpd server to handle the post.
 */
$.fn.serializeObject = function(handler) {
  var o = {};
  var a = this.serializeArray();
  
    /* Fix that the value of the unchecked checkbox is not pushed into serialize data. */
    var checkbox_list = $('input[type=checkbox]', this);
    $.each(checkbox_list, function () {
        /* The length of unchecked checkbox is seen as 0 by jquery, so serializeArray() would ignore the unchecked checkbox.
           Here add the ignored checkbox value into serialize data. */
        if (!a.hasOwnProperty(this.name)) {
            if ($("input[name='" + this.name + "']:checked").length == 0) {
                a.push({name: this.name, value: this.value});
            }
        }
    });
    
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  var wrapObj = {};
  wrapObj.function = handler;
  wrapObj.data = o;
  return wrapObj;
};

function do_search() {
  var key = document.getElementById("search_text").value.replace(/ /g,"%20");
  var winoptions = "width=960,height=800,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes";
  var url="";

  if(key == "" || key == "Enter%20Search%20Item") {
    url = "http://support.netgear.com/product/<?= getModelNameStr()?>";
  } else if(navigator.userAgent.search("Safari") > -1 && navigator.userAgent.search("Windows") > -1 && !(navigator.userAgent.search("Chrome") > -1)){
    url = "http://www.netgear.com/search.aspx?q="+key;
  } else {
    url = "http://kb.netgear.com/app/answers/list/kw/"+key;
  }

  window.open(url,'_blank',winoptions);
}

function changeCursorPointer() {
  document.body.style.cursor='pointer';
}

function changeCursorDefault() {
  document.body.style.cursor='default';
}

function showHelpIframe() {
  var pane = $("#helpframe").contents().find('body');
  var imgSrc = document.getElementById('help-button');

  if(imgSrc.src.search("up") >= 0) {
    $(".help-frame-div").show();
    //$('#help-text-content').jScrollPane({showArrows:false});
    //$('.help-main-content').jScrollPane({showArrows:false});
    imgSrc.src="images/helparrowdown-icon.png";
  } else {
    $("#helpframe").contents().find("#content").scrollTop(0);
    $("#helpframe")[0].contentWindow.location.hash = "";
    $(".help-frame-div").hide();
    imgSrc.src="images/helparrowup-icon.png";
  }

  if((navigator.appName.indexOf("Internet Explorer")==-1) ||
    (navigator.appVersion.indexOf("MSIE 9")==-1))
  window.top.change_size($(this));
}

function redirectProgressBar(barTitle, delayMilliSec, durationMilliSec, nextURL)
{
    if(barTitle != undefined && barTitle.valueOf().length > 0)
    {
        sessionStorage.setItem("barTitle", barTitle);
    }

    if(delayMilliSec != undefined && parseInt(delayMilliSec.valueOf()) > 100)
    {
        sessionStorage.setItem("delay", delayMilliSec);
    }

    if(durationMilliSec != undefined && parseInt(durationMilliSec.valueOf()) > 100)
    {
        sessionStorage.setItem("duration", durationMilliSec);
    }

    if(nextURL != undefined && nextURL.valueOf().length > 0)
    {
        sessionStorage.setItem("nextURL", nextURL);
    }
        
    window.location.replace("progressbar.html");
}

var skipPage = [
                "/",
                "/WIZ_sel.html",
                "/Add_WPS_Client.html",
                "/ramain.html",
                "/genie_optRA.html",
                "/genie_index.html",
                "/FW_check.html",
                "/pwd_reset/error-401.html",
                "/pwd_reset/error-423.html",
                "/pwd_reset/error-429.html",
                "/pwd_reset/pwd_reset_checkSN.html",
                "/pwd_reset/pwd_reset_checkSN1.html",
                "/pwd_reset/pwd_reset_checkSN5.html",
                "/pwd_reset/pwd_reset_checkAnswer.html",
                "/pwd_reset/pwd_reset_passwordReset.html",
                "/index.html",
                "/progressbar.html",
                "/UPG_upgrade.html",
                "/MNU_access_multiLogin2.html",
                "/APP_index.html",
                "/DEV_device.html",
                "/LAN_lan.html",
                "/DEV_control.html",
                "/DashBoard.html"
               ]; 

$(document).ajaxStart(function(){
    if(!window.opener)
    {
        var skip = false;
        $.each(skipPage, function(i,path){
           if(skip = (window.location.pathname == path))
              return false;
        });
        
        if(!skip)
        window.top.waitLoading();
    }
        
});
$(document).ajaxStop(function(){
    if(!window.opener)
    {
        if(window.location != window.parent.location && window.parent.location.pathname == "/start.html")
        {
            window.top.finishLoading();
        }
        
    } 
});

function openDataSubWin(filename,win_type)
{
    datSubWinVar = window.open(filename,'datasub_win',win_type);
    if (datSubWinVar && datSubWinVar.focus)
      setTimeout('datSubWinVar.focus()',200); 
}


function embedDataMlang(mlangTag, dataArray)
{
    //decodeHtml() is to fix issue that escape symbol "\" in the mlang original string can't show correctly 
    var mlang_tmp = decodeHtml(window.top.mlang[mlangTag]);
    var i;
    var mlang = mlang_tmp;
    
    //loop searching %s or %d , and replace them by the strings in dataArrary
    for (i = 0; i < dataArray.length; i++) {
        var replace_str = dataArray[i];
        
        if (mlang_tmp.indexOf("%s") != -1 && mlang_tmp.indexOf("%d") != -1) {
            //both %s, %d exists in the string, check which one is in front. Then repalace the front one.
            if (mlang_tmp.indexOf("%s") < mlang_tmp.indexOf("%d")) {
                mlang = mlang_tmp.replace("%s", replace_str);
            }
            else {
                mlang = mlang_tmp.replace("%d", replace_str);
            }
        }
        else if (mlang_tmp.indexOf("%s") != -1 || mlang_tmp.indexOf("%d") != -1) {
            //only one of %s, %d exists in the string, replace the existing one 
            if (mlang_tmp.indexOf("%s") != -1) {
                mlang = mlang_tmp.replace("%s", replace_str);
            }
            else {
                mlang = mlang_tmp.replace("%d", replace_str);
            }
        }
        else {
            //no %s, %d exists in the string, leave the loop
            break;
        }
        
        //For the new replaced string of this round loop can be used by the next round of the loop 
        mlang_tmp = mlang;
    }
    
    return mlang;
}

function decodeHtml(str)
{
    var txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function encodeHtml(s) 
{
  	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/>/g, '&gt;');
}

function month_to_mlang(abbr)
{
    var month_map = {"Jan" : "CSE017", "Feb" : "CSE018", "Mar" : "CSE019",
                     "Apr" : "CSE020", "May" : "CSE021", "Jun" : "CSE022",
                     "Jul" : "CSE023", "Aug" : "CSE024", "Sep" : "CSE025",
                     "Oct" : "CSE026", "Nov" : "CSE027", "Dec" : "CSE028"};
    var month = window.top.mlang[month_map[abbr]];
    return month;
}

function week_to_mlang(abbr)
{
    var week_map = {"Sun" : "CSE012", "Mon" : "CSE009", "Tue" : "CSE015",
                    "Wed" : "CSE016", "Thu" : "CSE013", "Fri" : "CSE006", "Sat" : "CSE010"};
    var week = window.top.mlang[week_map[abbr]];
    return week;
}

function sAlert(str, callback_ok, callback_cancel, dwidth, anc){
    var mode = "alert";
    callback_ok = callback_ok || 0;
    callback_cancel = callback_cancel || 0;
    
    var anc_v=anc || 0; // anc?? click apply button, not close div
    
    var msgw,msgh,bordercolor;
    msgw=dwidth||420;//warning width
    msgh=160;//warning height

    //if have cancel callback function, show cancel button
    if(typeof(callback_cancel) == "function" )
        mode = "confirm";
    
    if(document.getElementById("bgDiv") != undefined)
        removeObj();
    
    titleheight=25;//warning title height
    var sWidth,sHeight;
    sWidth=document.body.offsetWidth;//page width
    sHeight=screen.height;//page height
    //background div
    var bgObj=document.createElement("div");//create a div
    //setting div Attribute
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width=sWidth + "px";
    bgObj.style.height=sHeight + "px";
    bgObj.style.zIndex = "10000";
    document.body.appendChild(bgObj);//add this div into body
    //create warning div
    var msgObj=document.createElement("div");
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    //msgObj.style.background=" url(image/confirm.gif) no-repeat";
    msgObj.style.position = "absolute";
    msgObj.style.left = "40%";
    msgObj.style.top = "30%";
    msgObj.style.marginLeft = "-225px" ;
    msgObj.style.width = msgw + "px";
    //msgObj.style.height = msgh + "px";
    msgObj.style.zIndex = "10001";
    msgObj.className = msgObj.className+ " pop_box";
    var div1=document.createElement("div");//create msg div
    //setting msg div
    div1.setAttribute("id","msgTitle");
    div1.setAttribute("align","left");
    //div1.style.marginTop="30px";
    div1.style.marginLeft="30px";
    div1.style.marginRight="30px";
    div1.style.marginBottom="20px";
    div1.style.padding="0px";
    div1.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    div1.style.opacity="0.75";
    //div1.style.height="85px";
    div1.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    div1.style.cursor="pointer";
    div1.innerHTML=str;
    var button=document.createElement("input");//create ok button
    //setting ok button
    button.setAttribute("type","button");
    button.setAttribute("id","ok_bt");
    button.setAttribute("value",window.top.mlang["UAS020"]);
    button.style.width="80px";
    //button.style.marginLeft="140px";
    //button.style.marginBottom="10px";
    button.style.background = "#fff !important";
    button.style.border = "1px solid rgb(112, 43, 134)";
    button.style.color="#3f354b"+" !important;";
    button.style.cursor = "pointer"
    button.onclick=click_ok;
    var button1=document.createElement("input");//create cancel button
    //setting cancel button
    button1.setAttribute("type","button");
    button1.setAttribute("id","cancel_bt");
    button1.setAttribute("value",window.top.mlang["UAS021"]);
    button1.style.width="80px";
    button1.style.marginLeft="10px";
    //button1.style.marginBottom="10px";
    button1.style.background="#3f354b !important";
    button1.style.border="1px solid "+ "#3f354c";
    button1.style.color="white";
    button1.style.cursor = "pointer"
    button1.onclick=click_cancel;
    function removeObj(){//close warning
        document.body.removeChild(document.getElementById("bgDiv"));//delete background div
        document.getElementById("msgDiv").removeChild(document.getElementById("msgTitle"));//delete title
        document.forms[0].removeChild(document.getElementById("msgDiv"));//delete warning
    }

    function click_ok(){//for Ok button
        if(anc_v == 0 )
            removeObj();
        
        if(typeof(callback_ok)== "function")
            callback_ok();
        
    }

    function click_cancel(){// for cancel button
        if(typeof(callback_cancel) == "function")
            callback_cancel();
        removeObj();
    }

    document.forms[0].appendChild(msgObj);//add warning div into body
    document.getElementById("msgDiv").appendChild(div1);// add title into warning div
    var txt=document.createElement("p");//add warning infomation into warning div
    document.getElementById("msgDiv").appendChild(div1);
    document.getElementById("msgDiv").appendChild(button);//add ok button into warning div
    if(mode == "confirm")
        document.getElementById("msgDiv").appendChild(button1); //add cancel button into warning div
}
