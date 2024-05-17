  var timer;
  var timeout = 1000;

  function key_check()
  {
    clearTimeout(timer);
    timer = setTimeout(function(){
      sendpasswdcheck();
    }, timeout);
    return true;
  }
/*
  function sendpasswdcheck()
  {
      var passwd = $("input[name='sysNewPasswd']").val();
      var check_result=true;
      if(passwd != "")
      {
          var conditions = 0;
          var containSpecial = RegExp(/[(\ )(\!)(\")(\#)(\)(\$)(\%)(\&)(\')(\()(\))(\*)(\+)(\,)(\-)(\.)(\/)(\:)(\;)(\<)(\=)(\>)(\?)(\@)(\[)(\\)(\])(\^)(\_)(\`)(\{)(\|)(\})(\~)]/);
  
          if (passwd.match(/[A-Z]/)) 
          {
              $("#weak_password_rule1_1").css("display", "table-cell");
              $("#weak_password_rule1_1_gray").css("display", "none");
              conditions += 1;
          }
          else
          {
              $("#weak_password_rule1_1").css("display", "none");
              $("#weak_password_rule1_1_gray").css("display", "table-cell");
          }
  
          if (passwd.match(/[a-z]/))
          {
              $("#weak_password_rule1_2").css("display", "table-cell");
              $("#weak_password_rule1_2_gray").css("display", "none");
              conditions += 1;
          }
          else
          {
              $("#weak_password_rule1_2").css("display", "none");
              $("#weak_password_rule1_2_gray").css("display", "table-cell");
          }
  
          if (passwd.match(/[0-9]/))
          {
              $("#weak_password_rule1_3").css("display", "table-cell");
              $("#weak_password_rule1_3_gray").css("display", "none");
              conditions += 1;
          }
          else
          {
              $("#weak_password_rule1_3").css("display", "none");
              $("#weak_password_rule1_3_gray").css("display", "table-cell");
          }
  
          if (containSpecial.test(passwd))
          {
              $("#weak_password_rule1_4").css("display", "table-cell");
              $("#weak_password_rule1_4_gray").css("display", "none");
              conditions += 1;
          }
          else
          {
              $("#weak_password_rule1_4").css("display", "none");
              $("#weak_password_rule1_4_gray").css("display", "table-cell");
          }
  
          if (conditions < 3)
          {
              $("#weak_password_rule1").css("display", "none");
              $("#weak_password_rule1_gray").css("display", "");
              check_result = false;
          }
          else
          {
              $("#weak_password_rule1").css("display", "table-cell");
              $("#weak_password_rule1_gray").css("display", "none");
  
          }
  
          if (passwd.length < 6 || passwd.length > 32 )
          {
              $("#weak_password_rule2").css("display", "none");
              $("#weak_password_rule2_gray").css("display", "table-cell");
              check_result = false;
          }
          else
          {
              $("#weak_password_rule2").css("display", "table-cell");
              $("#weak_password_rule2_gray").css("display", "none");
          }
  
          if (/(\W)\1\1/.test(passwd) || /(\w)\1\1/.test(passwd))
          {
              $("#weak_password_rule4").css("display", "none");
              $("#weak_password_rule4_gray").css("display", "table-cell");
              check_result = false;
          }
          else
          {
              $("#weak_password_rule4").css("display", "table-cell");
              $("#weak_password_rule4_gray").css("display", "none");
          }
  
          if (check_result == false)
          {
              $("#Netgear_img_blank").css("display", "none");
              $("#Netgear_img").css("display", "none");
              $("#Netgear_img_no").css("display", "table-cell");
              $("#passwd_hint_content").css("display", "table-row");
              $("input[name='sysPasswdWeak']").val(1);
          }
          else
          {
              $("#Netgear_img_blank").css("display", "none");
              $("#Netgear_img").css("display", "table-cell");
              $("#Netgear_img_no").css("display", "none");
              $("#Netgear_img_no").css("display", "none");
              $("#admin_account_next").prop("disabled", false);
              $("input[name='sysPasswdWeak']").val(0);
  
          }
      }
      else
      {
          $("#Netgear_img_blank").css("display", "table-cell");
          $("#Netgear_img").css("display", "none");
          $("#Netgear_img_no").css("display", "none");
          $("#passwd_hint_content").css("display", "none");
          $("#admin_account_next").css("background-color", "#E0E0E0");
          $("#admin_account_next").prop("disabled", true);
          $("input[name='sysPasswdWeak']").val(1);
      }
      return true;
  }
*/
function sendpasswdcheck()
  {
      var passwd = $("input[name='sysNewPasswd']").val();
      var check_result=true;
      if(passwd != "")
      {
          var conditions = 0;

          if (passwd.length < 10 || passwd.length > 32 )
          {
              $("#weak_password_rule2").css("display", "none");
              $("#weak_password_rule2_gray").css("display", "table-cell");
              check_result = false;
          }
          else
          {
              $("#weak_password_rule2").css("display", "table-cell");
              $("#weak_password_rule2_gray").css("display", "none");
              conditions += 1;
          }

          if (passwd.match(/[A-Z]/)) 
          {
              $("#weak_password_rule1_1").css("display", "table-cell");
              $("#weak_password_rule1_1_gray").css("display", "none");
              conditions += 1;
          }
          else
          {
              $("#weak_password_rule1_1").css("display", "none");
              $("#weak_password_rule1_1_gray").css("display", "table-cell");
          }
  
          if (passwd.match(/[a-z]/))
          {
              $("#weak_password_rule1_2").css("display", "table-cell");
              $("#weak_password_rule1_2_gray").css("display", "none");
              conditions += 1;
          }
          else
          {
              $("#weak_password_rule1_2").css("display", "none");
              $("#weak_password_rule1_2_gray").css("display", "table-cell");
          }
  
          //console.log("conditions:"+conditions);
          if (conditions < 3)
          {
              //$("#weak_password_rule1").css("display", "none");
              //$("#weak_password_rule1_gray").css("display", "");
              check_result = false;
          }
          else
          {
              //$("#weak_password_rule1").css("display", "table-cell");
              //$("#weak_password_rule1_gray").css("display", "none");
              check_result = true;
          }

          if (check_result == false)
          {
              $("#Netgear_img_blank").css("display", "none");
              $("#Netgear_img").css("display", "none");
              $("#Netgear_img_no").css("display", "table-cell");
              $("#passwd_hint_content").css("display", "table-row");
              $("input[name='sysPasswdWeak']").val(1);
              //$("#admin_account_next").prop("disabled", true);
              //$("#admin_account_next").css("background-color", "#E0E0E0");
          }
          else
          {
              $("#Netgear_img_blank").css("display", "none");
              $("#Netgear_img").css("display", "table-cell");
              $("#Netgear_img_no").css("display", "none");
              $("#Netgear_img_no").css("display", "none");
              $("input[name='sysPasswdWeak']").val(0);
          }
              $("#admin_account_next").prop("disabled", false);
              $("#admin_account_next").css("background-color", "transparent");
      }
      else
      {
          $("#Netgear_img_blank").css("display", "table-cell");
          $("#Netgear_img").css("display", "none");
          $("#Netgear_img_no").css("display", "none");
          $("#passwd_hint_content").css("display", "none");
          $("#admin_account_next").css("background-color", "#E0E0E0");
          $("#admin_account_next").prop("disabled", true);
          $("input[name='sysPasswdWeak']").val(1);
      }
      return true;
  }
  function change_display()
  {
      $("#admin_account_next").prop("disabled", false);
      $("#admin_account_next").css("background-color", "transparent");
      $("#passwd_hint_content").css("display", "none");
      return true;
  }

/*
  function checkAdminSettingData()
  {
      var newPasswd = $("input[name='sysNewPasswd']").val();
      var confirmPasswd = $("input[name='sysConfirmPasswd']").val();
      var answer1 = $("input[name='answer1']").val();
      var answer2 = $("input[name='answer2']").val();
      if (newPasswd == "")
      {
          alert(window.top.mlang["ADDE02"]);
          $("#admin_account_next").css("background-color", "#E0E0E0");
          $("#admin_account_next").prop("disabled", true);
          return false;
      }
      
      if(newPasswd == "password")
      {
          alert(window.top.mlang["SWP080"]);
          return false;
      }
      
      if(newPasswd.length < 6)
      {
          alert(window.top.mlang["PCVP_043"]);
          return false;
      }
      
      if (newPasswd.length >= 33 || confirmPasswd.length >= 33)
      {
          alert(window.top.mlang["MSPE01"]);
          return false;
      }
      
      if(newPasswd != confirmPasswd)
      {
          alert(window.top.mlang["SWPE13"]);
          $("input[name='sysConfirmPasswd']").focus();
          return false;
      }

      if(answer1.length < 1 || answer1.length > 64)
      {
          alert(window.top.mlang["genie_95"]);
          return false;
      }
      
      if(answer2.length < 1 || answer2.length > 64)
      {
          alert(window.top.mlang["genie_95"]);
          return false;
      }
      
      if($("select[name='question1']").val() == 0 || $("select[name='question2']").val() == 0)
      {
          alert(window.top.mlang["genie_97"]);
          return false;
      }

      return true;
  }
*/

  function checkAdminSettingData()
  {
      var newPasswd = $("input[name='sysNewPasswd']").val();
      var confirmPasswd = $("input[name='sysConfirmPasswd']").val();
      var answer1 = $("input[name='answer1']").val();
      var answer2 = $("input[name='answer2']").val();
      if (newPasswd == "")
      {
          alert(window.top.mlang["ADDE02"]);
          $("#admin_account_next").css("background-color", "#E0E0E0");
          $("#admin_account_next").prop("disabled", true);
          return false;
      }
      
      if(newPasswd == "password")
      {
          alert(window.top.mlang["SWP080"]);
          return false;
      }

      if(newPasswd.length < 10)
      {
          alert(window.top.mlang["PWD003"]);
          return false;
      }

      if (!newPasswd.match(/[A-Z]/))
      {
          alert(window.top.mlang["PWD006"]);
          return false;
      }

      if (!newPasswd.match(/[a-z]/))
      {
          alert(window.top.mlang["PWD007"]);
          return false;
      }
      if (newPasswd.length >= 33 || confirmPasswd.length >= 33)
      {
          alert(window.top.mlang["MSPE01"]);
          return false;
      }
      
      if(newPasswd != confirmPasswd)
      {
          alert(window.top.mlang["SWPE13"]);
          $("input[name='sysConfirmPasswd']").focus();
          return false;
      }

      if(answer1.length < 1 || answer1.length > 64)
      {
          alert(window.top.mlang["genie_95"]);
          return false;
      }
      
      if(answer2.length < 1 || answer2.length > 64)
      {
          alert(window.top.mlang["genie_95"]);
          return false;
      }
      
      if($("select[name='question1']").val() == 0 || $("select[name='question2']").val() == 0)
      {
          alert(window.top.mlang["genie_97"]);
          return false;
      }

      return true;
  }

  function checkStaticIpSettingData()
  {
      var msg = "";
      
      if(!$("#wanAddr-ip").validateIp() || checkIP($("#wanAddr-ip").getIp(),254) || $("#wanAddr-ip input").eq(3).val()== 0)
      {
          msg+= window.top.mlang["SWPE05"];  
      }

      if(!$("#wanMask-ip").validateIp() || checkIP($("#wanMask-ip").getIp(),255))
      {
          msg+= window.top.mlang["SWPE06"];  
      }

      if(!$("#gateway-ip").validateIp() || checkIP($("#gateway-ip").getIp(),255) || $("#gateway-ip input").eq(3).val()== 0)
      {
          msg+= window.top.mlang["SWPE04"];  
      }

      if(!$("#dns1-ip").validateIp() || checkIP($("#dns1-ip").getIp(),255) || $("#dns1-ip input").eq(3).val()== 0)
      {
          msg+= window.top.mlang["SWPE08"];  
      }

      var dns2Filled = $("#dns2-ip input").filter(function(){return ($(this).val().length > 0);}).length > 0;
      
      if(dns2Filled && (!$("#dns1-ip").validateIp() || checkIP($("#dns2-ip").getIp(),255)|| $("#dns2-ip input").eq(3).val()== 0))
      {
          msg+= window.top.mlang["SWPE09"];
      }
      
      if (msg.length > 1)
      {
          alert(msg);
          return false;
      }

      return true;
  }

  function checkStaticIpSettingData_v2()
  {
      var msg = "";
      var wanAddr = $("#wpethr").val();
      var wanMask = $("#wmask").val();
      var gateway = $("#wgateway").val();
      var dns1 = $("#daddr").val();
      var dns2 = $("#pdaddr").val();
      
      if(!isValidIpv4_str(wanAddr) || checkIP(wanAddr,254))
      {
          msg+= window.top.mlang["SWPE05"] + "\r\n";  
      }

      if(!isValidIpv4_str(wanMask) || !isValidNetmaskStr(wanMask))
      {
          msg+= window.top.mlang["SWPE06"] + "\r\n";  
      }

      if(!isValidIpv4_str(gateway) || checkIP(gateway,255))
      {
          msg+= window.top.mlang["SWPE04"] + "\r\n";  
      }

      if(!isValidIpv4_str(dns1) || checkIP(dns1,255))
      {
          msg+= window.top.mlang["SWPE08"] + "\r\n";  
      }

      var dns2Filled = dns2.length;
      
      if(dns2Filled && (!isValidIpv4_str(dns2) || checkIP(dns2,255)))
      {
          msg+= window.top.mlang["SWPE09"] + "\r\n";
      }
      
      if (msg.length > 1)
      {
          alert(msg);
          return false;
      }

      return true;
  }

  function checkWanMacSettingData()
  {
      var msg = "";
      var checkMac = $("[name='Spoofmac']");
      if( !checkMac.inputmask("isComplete") || checkMacStr(checkMac.get(0)) || MacStrallf(checkMac.get(0)) )
      {
          msg+= window.top.mlang["AAWE06"];  
      }
      
      if (msg.length > 1)
      {
          alert(msg);
          return false;
      }
      return true;
  }

  function checkPppoeSettingData()
  {
      var msg = "";
      if ($("#pppoe_name").val().length == 0 || $("#pppoe_name").val().trim() == "")
      {
          msg += window.top.mlang["SWP051"];
      }
   
      if (msg.length > 1)
      {
          alert(msg);
          return false;
      }
      return true;
  }

  function checkPptpSettingData()
  {
      var msg = "";
      
   
      if (msg.length > 1)
      {
          alert(msg);
          return false;
      }
      return true;
  }

  function findCurrentStep()
  {
      //return stepPage.find(x => x.pageId === $(".page-group:visible").attr('id')).step;
      return $.map(stepPage, function(obj){
                 if(obj.pageId === $(".page-group:visible").attr('id'))
                 return  obj.step;
             })[0];
  }

  function findCurrentPage()
  {
      return $.map(stepPage, function(obj){
                 if(obj.pageId === $(".page-group:visible").attr('id'))
                 return  obj.pageId;
             })[0];
  }

  function check_restore()
  {
      if($("[name='mtenRestoreCfg']").val().length == 0)
      {
          alert(window.top.mlang["MBSE01"]);
          return false;
      }
      if(confirm(window.top.mlang["MBSW01"]))
          return true;
      else
          return false;
  }

  function postConfig(callback)
  {
      var formData = new FormData();
      formData.append("wiz_config_file",$("#file_upgrade").prop("files")[0]);
      $.ajax({
        url : "/cgi-bin/restore.plua?csrftoken=" + CSRF_TOKEN,
        type : "POST",
        cache : false,
        dataType : "json",
        processData: false,
        contentType: false,
        data : formData,
        success : function(json) {
            if (callback != null) {
                eval(callback + "(json)");
            }
        },
        error : function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
      }); //ajax()
  }
  
  function postConfig_callback(json)
  {
      if (json.status == "success") {
          //system needs reboot for the config restore take effect, show progress bar
          //And after progress bar finish, jump back to wizard to finish the restore config wizard flow
          setTimeout("redirectProgressBar('D-genie_377', '2800', '180000', '/WIZ_sel.html.postConfig_callback')", 100);
      }
      else {
          console.log("Upload failed!");
          window.top.backUrl = "WIZ_sel.html";
          //window.top.errorStr = "MBSW02";
          //location.href ="ErrorMessage.html";
      }
  }

  function wizPost(postData)
  {
      $.ajax({
        url: "/cgi-bin/netgear.plua?csrftoken=" + CSRF_TOKEN,
        type: "POST",
        data: postData,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success : function(data) {
            if(data.status == "error")
            {   
                window.top.backUrl = "WIZ_sel.html";
                //window.top.errorStr = "MBSW02";
                //location.href ="ErrorMessage.html";
            }
        },
        error : function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            //console.log(thrownError);
        },
        beforeSend : function(json) {
            //setTimeout("redirectProgressBar('D-genie_377')", 100);
        }
      }); //ajax()
  }

  function postAdminSetting(defaultState)
  {
      var postData = {};

      if (defaultState == "0")
      {
          postData.function = "setPassword";
      }
      else
      {
          postData.function = "setPasswordWiz";
      }
      var o = {};
      o["oldPassword"] = window.btoa($("input[name='sysOldPasswd']").val());
      o["password"] = window.btoa($("input[name='sysNewPasswd']").val());
      o["enableReset"] = "true";
      o["question1"] = $("select[name='question1']").val();
      o["answer1"] = window.btoa($("input[name='answer1']").val());
      o["question2"] = $("select[name='question2']").val();
      o["answer2"] = window.btoa($("input[name='answer2']").val());
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postWifiSetup()
  {
      var postData = {};
      postData.function = "wizWifi";
      var o = {};
      o["smartConnect"] = String($("input[name='check_same']").prop("checked"));
      o["2GSsid"] = $("input[name='wl_ssid']").val();
      o["2GPassword"] = $("input[name='wl_password']").val();
      o["5GSsid"] = $("input[name='wla_ssid']").val();
      o["5GPassword"] = $("input[name='wla_password']").val();
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postDhcpSetting(client_Mac)
  {
      var postData = {};
      postData.function = "wanEtherSetup";
      var o = {};
      o["domain"] = "";
      o["ipType"] = "dynamic";
      o["ipAddr"] = "";
      o["netmask"] = "";
      o["gateway"] = "";
      o["dnsType"] = "dynamic";
      o["dns1"] = "";
      o["dns2"] = "";
      if(client_Mac != 'undefined' && client_Mac.length == 17)
      {
          o["macClone"] = "pc";
          o["cloneMac"] = $("input[name='clientMac']").val();
      }
      else
      {
          o["macClone"] = "default";
          o["cloneMac"] = $("input[name='wanMac']").val();
      }
      
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postStaticIpSetting()
  {
      var postData = {};
      postData.function = "wizStatic";
      var o = {};
      o["ipAddr"] = $("#wanAddr-ip").getIp();
      o["netmask"] = $("#wanMask-ip").getIp();
      o["gateway"] = $("#gateway-ip").getIp();
      o["dns1"] = $("#dns1-ip").getIp();
      o["dns2"] = $("#dns2-ip").getIp() == false ? "":$("#dns2-ip").getIp();
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postStaticIpSetting_v2()
  {
      var postData = {};
      postData.function = "wizStatic";
      var o = {};
      o["ipAddr"] = $("#wpethr").val();
      o["netmask"] = $("#wmask").val();
      o["gateway"] = $("#wgateway").val();
      o["dns1"] = $("#daddr").val();
      o["dns2"] = $("#pdaddr").val();
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postPppoeSetting()
  {
      var postData = {};
      postData.function = "wizPppoe";
      var o = {};
      o["username"] = $("#pppoe_name").val();
      o["password"] = $("#pppoe_password").val();
      o["mode"] = "onDemand";
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postPptpSetting()
  {
      var postData = {};
      postData.function = "wanPPTP";//wizPptp
      var o = {};
      o["login_type"] = "PPTP"
      o["mode_autoid"] = "Dail on Demand"
      o["username"] = $("input[name='pptp_username']").val();
      o["password"] = $("input[name='pptp_password']").val();
      o["mode"] = "onDemand";
      o["idleTimeout"] = $("input[name='pptp_idle']").val();
      o["ipType"] = "fixed";
      o["ipAddr"] = $("input[name='pptp_ipAddr']").val()
      o["netmask"] = $("input[name='pptp_mask']").val();
      o["gateway"] = $("input[name='pptp_gateway']").val();
      o["serverAddr"] = $("input[name='pptp_serverAddr']").val();
      o["dnsType"] = "dynamic";
      o["dns1"] = "";
      o["dns2"] = "";
      o["macClone"] = "default";
      o["cloneMac"] = $("input[name='wanMac']").val();
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function postMacSetting()
  {
      if(wanCurrentType == "cloneMac")
      {
          postDhcpSetting($("input[name='clientMac']").val());
      }
      else
      {
          postDhcpSetting($("input[name='Spoofmac']").val());
      }
  }

  function postGuiAccess(func_name)
  {
      var postData = {};
      postData.function = "wizGuiAccess";
      var o = {};
      o["funcName"] = func_name
      postData.data = o;
      //console.log(postData);
      wizPost(JSON.stringify(postData));
  }

  function findPageIdByStep(inputStep)
  {
      //return stepPage.find(x => x.step === inputStep).pageId;
      return $.map(stepPage, function(obj){
                 if(obj.step === inputStep)
                 return  obj.pageId;  
             })[0];
  }

  function findStepByPageId(inputPageId)
  {
      //return stepPage.find(x => x.pageId === inputPageId).step;
      return $.map(stepPage, function(obj){
                 if(obj.pageId === inputPageId)
                 return  obj.step;  
             })[0];
  }
  
  function findIndexByStep(inputStep)
  {
      //return stepPage.findIndex(x => x.step === inputStep);
      return $.map(stepPage, function(obj, idx){
                 if(obj.step === inputStep)
                 return  idx;  
             })[0];
  }

  function checkSmartConnect()
  {
    if($("#check_same")[0].checked == true)  {
        //sync value from 2.4G ssid/password
        $("#wla_ssid").val($("#wl_ssid").val());
        $("#wla_password").val($("#wl_password").val());
    }
  }

  function addWizardPage(pageId)
  {
      var newPageDiv = '<div class="page-group" id="'+pageId+'" style="display:none;">\r\n\
                        </div><!--page-group '+ pageId +'-->';
      $("#target").append(newPageDiv);
      var newDiv = '';
      switch(pageId)
      {
          case 'internetPing-page':
              newDiv = '<div class="form-group" align="center" style="height:365px;overflow:auto;scrolling:auto"> \r\n\
                    <div class="rowCenter" style="height: 25px;">\r\n\
                      <p class="wizardTitleBlack" mlang="genie_23">Checking the Internet connection; please wait �K</p>\r\n\
                    </div>\r\n\
                    <div class="form-row" style="height:30px;"></div>\r\n\
                    <div class="rowCenter">\r\n\
                      <img id="card-searching-internet" frameborder="0" border="0" src="/images/wait.gif">\r\n\
                      <button type="button" name="next" style="display: none;">Next</button>\r\n\
                    </div>\r\n\
                  </div>\r\n';
              break;
          case 'internetDetect-page':
              newDiv = '<div class="form-group" style="height:365px;overflow:auto;scrolling:auto"> \r\n\
                    <div class="rowCenter" style="height: 25px;">\r\n\
                      <p class="wizardTitleBlack" mlang="SWP057">Checking the Internet connection; please wait ...</p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter" style="height: 10px;"></div>\r\n\
                    <div class="rowCenter" style="height: 15px;">\r\n\
                      <p class="wizardTextBlack" style="font-size: 16px;" mlang="genie_130"></p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter" style="height:30px;"></div>\r\n\
                    <div class="rowCenter">\r\n\
                      <img id="card-searching-internet" frameborder="0" border="0" src="/images/wait.gif" style="position: absolute; padding-left: 50%;">\r\n\
                    </div>\r\n\
                    <button type="button" name="next" style="display: none;">Next</button>\r\n\
                  </div>\r\n';
              break;
          case 'internetDetectSuccess-page':
              newDiv = '<div class="form-group" align="center" style="height:550px;overflow:auto;scrolling:auto"> \r\n\
                    <div class="rowCenter" style="height:30px;"></div>\r\n\
                    <div class="rowCenter" style="height: 25px;">\r\n\
                      <img class="netgear-logo" src="images/netgear.svg">\r\n\
                      <span class="wizardTitleBlack"> Nighthawk® </span>\r\n\
                    </div>\r\n\
                    <div class="rowCenter"">\r\n\
                      <p class="wizardTitleBlack modelName"><?= getModelNameStr()?></p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter">\r\n\
                        <img src="images/RAX5_PRODUCT-FRONT.png">\r\n\
                    </div>\r\n\
                    <div class="rowCenter" style="height: 10px;"></div>\r\n\
                    <div class="rowCenter">\r\n\
                      <p style="font-size: 22px;" mlang="PCVP_102">Internet detected</p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter">\r\n\
                      <p id="internet_dect_info" style="font-size: 16px;" mlang="PCVP_103">You\'re just a few steps away from completing the installation.</p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter" style="height:30px;"></div>\r\n\
                    <button id="next" name="next" type="button" class= "next_bt mt-10">\r\n\
                        <span mlang="OTH011">NEXT</span>\r\n\
                    </button>\r\n\
                  </div>\r\n';
              break;
          case 'noCable-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                  <div class="rowCenter" style="height: 25px;">\r\n\
                    <p class="wizardTitleRed" mlang="genie_81"></p>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height: 10px;"></div>\r\n\
                  <div class="rowCenter" style="height: 15px;">\r\n\
                    <p class="wizardTextBlack" mlang="genie_76"></p>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height: 10px;"></div>\r\n\
                  <div class="rowCenter" style="height: 15px;">\r\n\
                    <p class="wizardTextBlack" mlang="genie_34"></p>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height:5px;"></div>\r\n\
                  <div class="rowCenter" style="height:20px;">\r\n\
                    <label align="left" class="checkbox-container">\r\n\
                      <input type="radio" checked name="no_cable_select" id="no_cable_yes" value="yes">\r\n\
                      <span mlang="SWP003"></span>\r\n\
                      <span class="radio-checkmark"></span>\r\n\
                    </label>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height:20px;">\r\n\
                    <label align="left"class="checkbox-container">\r\n\
                      <input type="radio" name="no_cable_select" id="no_cable_manual" value="manual">\r\n\
                      <span mlang="genie_84"></span>\r\n\
                      <span class="radio-checkmark"></span>\r\n\
                    </label>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height: 10px;"></div>\r\n\
                  <div class="rowCenter" style="display: flex!important;">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                  </div>\r\n\
                  </div>\r\n';
              break;
          case 'cableConnectionRetry-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                  <div class="rowCenter" style="height: 25px;">\r\n\
                    <p class="wizardTitleRed" mlang="genie_81"></p>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height: 10px;"></div>\r\n\
                  <div class="rowCenter" style="height: 15px;">\r\n\
                    <p class="wizardTextBlack" mlang="genie_76"></p>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height: 10px;"></div>\r\n\
                  <div class="rowCenter" style="height: 15px;">\r\n\
                    <p class="wizardTextBlack" mlang="genie_15"></p>\r\n\
                  </div>\r\n\
                  <div class="rowCenter" style="height: 10px;"></div>\r\n\
                  <div class="rowCenter" style="display: flex!important;">\r\n\
                    <button class="button-sty1" name="next" id="next" type="button"><span mlang="genie_135"></span></button>\r\n\
                  </div>\r\n\
                  </div>\r\n';
              break;
          case 'internetHelpChoose-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 20px;">\r\n\
                  <p class="wizardTitleBlack" mlang="genie_27">Configuring the Internet Connection</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_157"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_33"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:5px;"></div>\r\n\
                <div class="rowCenter" style="height:20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio" checked name="WANDetcHelp" id="help_auto_detc" value="AutoDetc">\r\n\
                    <span mlang="SWP003"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;">\r\n\
                  <label align="left"class="checkbox-container">\r\n\
                    <input type="radio" name="WANDetcHelp" id="help_my_detc" value="MyDetc">\r\n\
                    <span mlang="genie_84"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div id="help_restore_div" class="rowCenter" style="height:20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio" name="WANDetcHelp" id="help_restore" value="Restore">\r\n\
                    <span mlang="genie_55"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="left">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'adminSetting-page':
              newDiv = '<div class="form-group" style="height:600px;overflow:auto;scrolling:auto"> \r\n\
                  <div class="form-row" >\r\n\
                    <h2 mlang="pwr_001">Admin Account Settings</h2>\r\n\
                  </div>\r\n\
                  <table style="table-layout: auto; width:68%; border-spacing: 0px;">\r\n\
                    <tr>\r\n\
                      <td style="font-size: medium;font-family: \'Avenir Next\'; font-style: normal;padding-left: 5px;" mlang="pwr_002">The admin password is used to log in to your router��s web interface. Secure your Network by changing the admin password.</td>\r\n\
                    </tr>\r\n\
                    <tr>\r\n\
                      <td>\r\n\
                        <table style="table-layout: fixed; border-spacing: 0px;">\r\n\
                          <tr>\r\n\
                            <td width="30%" align="left" class="wizardTd appendColon" mlang="SWP051"></td>\r\n\
                            <td width="30%" align="left" class="wizardTd"> admin \r\n\
                            <input type="text" name="username_admin" style="display:none;" autocomplete="username">\r\n\
                            </td>\r\n\
                            <td width="40%" align="left" class="wizardTd"></td>\r\n\
                          </tr>\r\n\
                          <tr id="oldPasswordTr">\r\n\
                            <td width="30%" align="left" class="wizardTd appendColon" mlang="MSP001">Old Password</td>\r\n\
                            <td width="30%" align="left" class="wizardTd"><input class="input1" type="password" name="sysOldPasswd" id="sys_old_passwd" size="22" maxlength="130" autocomplete="new-password"></td>\r\n\
                            <td width="40%" align="left" class="wizardTd"></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td width="30%" align="left" class="wizardTd appendColon" mlang="pwr_003">New Password</td>\r\n\
                            <td width="30%" align="left" class="wizardTd"><input class="input1" type="password" name="sysNewPasswd" id="sys_new_passwd" size="22" maxlength="32" autocomplete="new-password" onkeyup="return key_check()"  onkeydown="return change_display()"></td>\r\n\
                            <td width="40%" align="left" id="Netgear_img_blank"></td>\r\n\
                            <td width="40%" align="left" id="Netgear_img" style="display: none; white-space: nowrap; font-size:12px; color: green"><img src="images/DDNS_Yes.png" style="vertical-align:middle; width:16px;height:16px"></td>\r\n\
                            <td width="40%" align="left" id="Netgear_img_no" style="display: none; white-space: nowrap; font-size:12px; color: red"><img src="images/warning.png" style="vertical-align:middle; width:16px;height:16px"></td>\r\n\
                          </tr>\r\n\
                          <tr id="passwd_hint_content" style="display: none">\r\n\
                            <td width="25%" align="left">&nbsp;</td>\r\n\
                            <td width="70%" class="wizardTd" align="left" colspan="2"><div style="border-radius:30px; background-color:#D3D3D3; font-size:11px">\r\n\
                              <table style="width:100%">\r\n\
                                <tbody><tr>\r\n\
                                  <td width="100%" align="left" colspan="3" style="display: table-cell;padding-left:20px;height:22px" mlang="PWD002">The password must meet the following conditions:</td>\r\n\
                                </tr>\r\n\
                                <tr>\r\n\
                                  <td width="5%" class="wizardTd" align="left"><img id="weak_password_rule2" src="images/DDNS_Yes.png" style="display: none; padding-left: 20px; height: 75%;"><img id="weak_password_rule2_gray" src="images/DDNS_Yes_gray.png" style="display: table-cell; padding-left: 20px; height: 75%;"></td>\r\n\
                                  <td width="95%" colspan="2" align="left" style="height:22px" mlang="PWD001">Contains 10 to 32 characters</td>\r\n\
                                </tr>\r\n\
                                <tr>\r\n\
                                  <td width="5%" class="wizardTd" align="left"><img id="weak_password_rule1_1" src="images/DDNS_Yes.png" style="display: none; padding-left: 20px; height: 75%;"><img id="weak_password_rule1_1_gray" src="images/DDNS_Yes_gray.png" style="display: table-cell; padding-left: 20px; height: 75%;"></td>\r\n\
                                  <td width="95%" align="left" mlang="PCVP_036">At least one uppercase character</td>\r\n\
                                </tr>\r\n\
                                <tr>\r\n\
                                  <td width="5%" class="wizardTd" align="left"><img id="weak_password_rule1_2" src="images/DDNS_Yes.png" style="display: table-cell; padding-left: 20px; height: 75%;"><img id="weak_password_rule1_2_gray" src="images/DDNS_Yes_gray.png" style="display: none; padding-left: 20px; height: 75%;"></td>\r\n\
                                  <td width="95%" align="left" mlang="PCVP_037">At least one lowercase character</td>\r\n\
                                </tr>\r\n\
                              </tbody></table>\r\n\
                            </div></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td width="30%" align="left" class="wizardTd appendColon" mlang="pwr_004">Confirm New Password</td>\r\n\
                            <td width="30%" align="left" class="wizardTd"><input class="input1" type="password" name="sysConfirmPasswd" id="sys_confirm_passwd" size="22" maxlength="130" autocomplete="new-password"></td>\r\n\
                            <td width="40%" align="left" class="wizardTd"></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td colspan=2>&nbsp;</td>\r\n\
                          </tr>\r\n\
                        </table>\r\n\
                      </td>\r\n\
                    </tr>\r\n\
                    <tr>\r\n\
                      <td>\r\n\
                        <table>\r\n\
                          <tr>\r\n\
                            <td width="30%" class="wizardTd appendStar appendColon" align="left" mlang="genie_117">Security Question #1</td>\r\n\
                            <td width="65%" class="wizardTd">\r\n\
                              <select name="question1" id="sec_question_one">\r\n\
                                <option selected value="0" mlang="genie_97"></option>\r\n\
                                <option value="1" mlang="genie_149"></option>\r\n\
                                <option value="2" mlang="genie_150"></option>\r\n\
                                <option value="3" mlang="genie_145"></option>\r\n\
                                <option value="4" mlang="genie_144"></option>\r\n\
                                <option value="5" mlang="genie_63"></option>\r\n\
                                <option value="6" mlang="genie_142"></option>\r\n\
                                <option value="7" mlang="genie_141"></option>\r\n\
                                <option value="8" mlang="genie_64"></option>\r\n\
                                <option value="9" mlang="genie_138"></option>\r\n\
                            </td>\r\n\
                            <td width="5%"></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td width="30%" class="wizardTd appendColon" align="left" mlang="genie_17">Answer</td>\r\n\
                            <td width="70%" class="wizardTd"><input class="input1" type="text" name="answer1" id="answer1" size="64" maxlength="64" value=""> </td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td width="30%" class="wizardTd appendStar appendColon" align="left" mlang="genie_118"Security Question #2</td>\r\n\
                            <td width="65%" class="wizardTd">\r\n\
                              <select name="question2" id="sec_question_two">\r\n\
                                <option selected value="0" mlang="genie_97"></option>\r\n\
                                <option value="1" mlang="genie_147"></option>\r\n\
                                <option value="2" mlang="genie_146"></option>\r\n\
                                <option value="3" mlang="genie_140"></option>\r\n\
                                <option value="4" mlang="genie_143"></option>\r\n\
                                <option value="5" mlang="genie_148"></option>\r\n\
                                <option value="6" mlang="genie_62"></option>\r\n\
                                <option value="7" mlang="genie_61"></option>\r\n\
                                <option value="8" mlang="genie_139"></option>\r\n\
                            </td>\r\n\
                            <td width="5%"></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td width="30%" class="wizardTd appendColon" align="left" mlang="genie_17">Answer</td>\r\n\
                            <td width="70%" class="wizardTd"><input class="input1" type="text" name="answer2" id="answer2"size="64" maxlength="64" value=""></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td width="30%" class="wizardTd" align="left" mlang="genie_6">*=required information</td>\r\n\
                            <td width="70%"></td>\r\n\
                          </tr>\r\n\
                          <tr>\r\n\
                            <td class="wizardTd pt-20"  align="left" colspan=2>\r\n\
                              <button type="button" style="width:100px; background-color:#e0e0e0;" value="submit" class="button-sty1" name="next" id="admin_account_next"><span mlang="OTH011">Next</span></button></td>\r\n\
                          </tr>\r\n\
                        </table>\r\n\
                      </td>\r\n\
                    </tr>\r\n\
                  </table>\r\n\
                  <input type="hidden" name="sysPasswdWeak" value="1">\r\n\
                  </div>\r\n';
              break;
          case 'restoreConfig-page':
              newDiv = '<div class="form-group" style="height:365px;overflow:auto;scrolling:auto"> \r\n\
                  <div class="rowCenter">\r\n\
                    <h2 class="wizardTitleBlack" mlang="genie_107"></h2>\r\n\
                  </div>\r\n\
                  <div class="form-row" style="height:10px;"></div>\r\n\
                  <div class="rowCenter">\r\n\
                    <b class="wizardTextBlack" mlang="genie_22"></b>\r\n\
                  </div>\r\n\
                  <div class="form-row" style="height:10px;"></div>\r\n\
                  <div class="rowCenter">\r\n\
                    <input type="FILE" style="border: initial;font-family: Arial;color:#404040;padding-left: 20px;" name="mtenRestoreCfg" id="file_upgrade" value="" size="40" maxlength="1024" contentEditable=false onkeydown="return false;" onbeforeeditfocus="return false;" onpaste="return false;">\r\n\
                  </div>\r\n\
                  <div class="form-row" style="height:30px;"></div>\r\n\
                  <div class="rowCenter" style="display: inline-block">\r\n\
                    <button value="back" name="back" id="back" type="button" onClick="togglePage(findCurrentPage(), \'internetHelpChoose-page\');" class="button-sty1 button-rule" mlang="SWP012"></button>\r\n\
                    <button value="submit" name="next" id="next" type="button" class="button-sty1 button-grey" mlang="OTH011"></button>\r\n\
                  </div>\r\n\
                  </div>\r\n';
              break;
          case 'wanTypeProblem-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleRed" mlang="genie_105">Problem Detecting the Internet Connection</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 10px;"></div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;margin-left: 0;" mlang="genie_128"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;margin-left: 0;" mlang="genie_7"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-left: 20px;" mlang="genie_134"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;margin-left: 0;" mlang="genie_8"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-left: 20px;" mlang="genie_133"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;margin-left: 0;" mlang="genie_122"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:5px;"></div>\r\n\
                <div class="rowCenter" style="height:20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio"  checked name="WANDetcProblem" id="static_ip_yes" value="reboot">\r\n\
                    <span mlang="genie_56"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio" name="WANDetcProblem" id="static_ip_no" value="fixCableRetry">\r\n\
                    <span mlang="genie_53"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio" name="WANDetcProblem" id="static_ip_unknown" value="unknowProblem">\r\n\
                    <span mlang="genie_86"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="left">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'wanTypeProblem-page_v2':
              newDiv = '<div class="form-group" align="center" style="height:550px;overflow:auto;scrolling:auto"> \r\n\
                <div class="rowCenter" style="height:30px;"></div>\r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                    <img class="netgear-logo" src="images/netgear.svg">\r\n\
                    <span class="wizardTitleBlack"> Nighthawk® </span>\r\n\
                </div>\r\n\
                <div class="rowCenter"">\r\n\
                    <p class="wizardTitleBlack modelName"><?= getModelNameStr()?></p>\r\n\
                </div>\r\n\
                <div class="rowCenter">\r\n\
                    <p style="font-size: 22px;" mlang="genie_105">Problem Detecting the Internet Connection</p>\r\n\
                </div>\r\n\
                <div class="rowCenter">\r\n\
                    <p style="font-size: 14px;" mlang="genie_128">This is most likely due to one of the following reasons:</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" >\r\n\
                    <table style="width:450px;">\r\n\
                        <td>\r\n\
                            <b style="font-size: 16px;" mlang="genie_7">1.? The modem was not power cycled during the cabling step.</b>\r\n\
                            <p style="font-size: 15px;padding-left: 20px;" mlang="genie_134">To solve this problem, power cycle the modem (turn it off and on). To power cycle a modem with battery backup, you might need to remove and reinsert its battery. After the power cycle, wait 2 minutes for the modem to completely start up.</p>\r\n\
                        </td>\r\n\
                        <tr>\r\n\
                        <td>\r\n\
                            <b style="font-size: 16px;" mlang="genie_8">2.? The yellow Ethernet cable is not fully inserted, or is inserted in the wrong place.</b>\r\n\
                            <p style="font-size: 15px;padding-left: 20px;" mlang="genie_133">To solve this problem, make sure that the yellow Ethernet cable is securely plugged in to the broadband modem port and the router Internet port.</p>\r\n\
                        </td>\r\n\
                    </table>\r\n\
                </div>\r\n\
                <div class="rowCenter">\r\n\
                    <button id="again" name="Try again" type="button" class= "next_bt mt-10" onClick="onClick_TryAgain();">\r\n\
                        <span mlang="genie_135">Try again</span>\r\n\
                    </button>\r\n\
                    <button id="static_next" name="static_next" type="button" class= "next_bt_invert mt-10" onClick="onClick_StaticNext();">\r\n\
                        <span mlang="PCVP_104">My problem isn\'t solved</span>\r\n\
                    </button>\r\n\
                    <button type="button" name="next" style="display: none;">Next</button>\r\n\
                    <input type="hidden" name="try_again" disabled>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'ipTypeChoose-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleRed" mlang="genie_103">Problem Detecting the Internet Connection - IP Address</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;"></div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;" mlang="genie_31"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;"></div>\r\n\
                <div class="rowCenter" style="height: 20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio"  checked name="ipProblem" id="static_ip_yes" value="staticIp">\r\n\
                    <span mlang="genie_155"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio" name="ipProblem" id="static_ip_no" value="noneIp" >\r\n\
                    <span mlang="genie_83"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 20px;">\r\n\
                  <label align="left" class="checkbox-container">\r\n\
                    <input type="radio" name="ipProblem" id="static_ip_unknown" value="unknow">\r\n\
                    <span mlang="genie_54"></span>\r\n\
                    <span class="radio-checkmark"></span>\r\n\
                  </label>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 10px;"></div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px" mlang="genie_120"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;"></div>\r\n\
                <div class="rowCenter" align="left">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'pppoeWanSetting-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleBlack" mlang="genie_99">PPPoE DSL Internet Connection Detected</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;" mlang="genie_42"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;"></div>\r\n\
                <div class="rowCenter" style="height:15px;">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 16px;font-family: Arial, Helvetica, sans-serif;min-width: 200px;text-align: left; line-height: 40px;">\r\n\
                    <span mlang="SWP051"></span>\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;width:340px;background:url(images/roundedcornr_input.gif) no-repeat left; line-height: 40px;">\r\n\
                    <input type="text" name="pppoe_username" id="pppoe_name" style="width:150px;position:relative; margin-left:20px; height:18px; box-sizing: border-box; padding: 1px 2px; border-radius: 1px;" size="15" maxlength="60" value="">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 16px;font-family: Arial, Helvetica, sans-serif;min-width: 200px;text-align: left; line-height: 40px;">\r\n\
                    <span mlang="SWP027"></span>\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;width:340px;background:url(images/roundedcornr_input.gif) no-repeat left; line-height: 45px;">\r\n\
                    <input type="password" name="pppoe_passwd" id="pppoe_password" style="width:150px;position:relative; margin-left:20px; height:18px; box-sizing: border-box; padding: 1px 2px; border-radius: 1px;" size="15" maxlength="50" value="" autocomplete="new-password">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="center">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'pptpWanSetting-page':
              newDiv = '<div class="form-group" style="margin: auto;height:430px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleBlack" mlang="genie_100">PPTP Internet Connection Detected</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_42">Enter the required information below.</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;"></div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="SWP051">User Name</span>\r\n\
                  </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <input class="input2" type="text" name="pptp_username" id="pptp_username" size="15" maxlength="60" value="">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="SWP027">Password</span>\r\n\
                  </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <input class="input2" type="password" name="pptp_password" id="pptp_passwd" size="15" maxlength="50" value="">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_58">Idle Time-Out(in minutes)</span>\r\n\
                  </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <input class="input2" type="text" class="num" name="pptp_idle" id="pptp_idletime" size="3" maxlength="3" value="5">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="SWP028">My IP Address</span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <input class="input2" type="text" class="num" name="pptp_ipAddr" id="myip" size="3" maxlength="15" value="">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="MRS016">Subnet Mask</span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <input class="input2" type="text" class="num" name="pptp_mask" id="mymask" size="3" maxlength="15" value="">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_844">Server Address</span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <input class="input2" type="text" class="num" name="pptp_serverAddr" id="pptp_serv_ip" size="3" maxlength="15" value="10.0.0.138">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="SWP034">Gateway IP Address</span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <input class="input2" type="text" class="num" name="pptp_gateway" id="mygw" size="3" maxlength="15" value="">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="center">\r\n\
                    <button type="Button" value="Next" name="next" id="pptp_next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
              break;         
          case 'staticWanSetting-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleBlack" mlang="genie_47">Fixed Internet IP Settings</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_47"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;"></div>\r\n\
                <div class="rowCenter" style="height:15px;">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="SWP030"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div id="wanAddr-ip" style="display: inline-block;"></div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="MRS016"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div id="wanMask-ip" style="display: inline-block;"></div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="MRS045"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div id="gateway-ip" style="display: inline-block;"></div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_101"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div id="dns1-ip" style="display: inline-block;"></div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_16"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div id="dns2-ip" style="display: inline-block;"></div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="left">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'staticWanSetting-page_v2':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleBlack" mlang="genie_47">Fixed Internet IP Settings</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_47"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;"></div>\r\n\
                <div class="rowCenter" style="height:15px;">\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="SWP030"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div>\r\n\
                    <input type="text" class="input3" style="display: inline-block;" id="wpethr" size="15" value="">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="MRS016"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div>\r\n\
                    <input type="text" class="input3" style="display: inline-block;" id="wmask" size="15" value="">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="MRS045"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div>\r\n\
                    <input type="text" class="input3" style="display: inline-block;" id="wgateway" size="15" value="">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_101"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div>\r\n\
                    <input type="text" class="input3" id="daddr" value="">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_16"></span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div>\r\n\
                    <input type="text" class="input3" id="pdaddr" value="">\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="left">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'macSetting-page':
              newDiv = '<div class="form-group" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 25px;">\r\n\
                  <p class="wizardTitleRed" mlang="genie_104">Problem Detecting the Internet Connection - MAC Address</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;" mlang="genie_60"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:10px;"></div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;" mlang="genie_9"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:10px;"></div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;" mlang="genie_40"></p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div class="ip-input-row" style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 150px;text-align: left;padding-bottom: 5px;width: 50%;">\r\n\
                    <input type="text" class="num ip-feild" name="Spoofmac" size="17" maxlength="17" value="" data-inputmask="\'alias\': \'mac\'" style="width: 95% !important;">\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;"><span id="macFormat" mlang="genie_4"></span></div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                <div class="rowCenter" align="left">\r\n\
                    <button type="Button" value="Next" name="next" id="next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
          case 'applySetting-page':
              newDiv = '<div class="form-group" align="center" style="height:365px;overflow:auto;scrolling:auto"> \r\n\
                    <div class="rowCenter" style="height: 25px;">\r\n\
                      <p class="wizardTitleBlack" mlang="genie_18">Applying Internet Connection Settings</p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter" style="height: 15px;">\r\n\
                      <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_130"></p>\r\n\
                    </div>\r\n\
                    <div class="rowCenter" style="height:30px;"></div>\r\n\
                    <div class="rowCenter">\r\n\
                      <img id="card-searching-internet" frameborder="0" border="0" src="/images/wait.gif">\r\n\
                    </div>\r\n\
                    <button type="button" name="next" style="display: none;">Next</button>\r\n\
                  </div>\r\n';
              break;
          case 'wifiSetup-page':
              newDiv = '<div class="form-group" style="text-align: center;height:auto;width:50%;min-height: 360px;margin: 10px auto;overflow: auto;">\r\n\
                    <div style="width: 100%; margin-left: auto; margin-right: auto;">\r\n\
                      <img  src="/images/netgear.svg">\r\n\
                      <span style="font-size:30px;color:black; margin-right:8px;">Nighthawk</span>\r\n\
                    </div>\r\n\
                    <div style="height:20px;"></div>\r\n\
                    <div style="width: 80%; margin-left: auto; margin-right: auto;font-family: system-ui;;font-size: 22px;font-weight: 400;color: #2C262D;" mlang="LUP046">Set Up Your WiFi</div>\r\n\
                    <div style="height:30px;"></div>\r\n\
                    <div id="card-orbi-setup-wifi" style="margin-left: auto; margin-right: auto;font-size: 14px; font-family: system-ui;color: #2C262D;" mlang="LUP047">Customize your network name and password</div>\r\n\
                    <div style="height:15px;"></div>\r\n\
                    <div class="wifi_content" style="width: 80%; margin-left: auto; margin-right: auto;">\r\n\
                      <div class="input_row">\r\n\
                      <label for="wl_ssid" class="input_label1" mlang="genie_1115"></label>\r\n\
                      <input class="input_field" style="padding-top: 15px;" type="text" name="wl_ssid" id="wl_ssid" maxlength="32" value="" onkeyup="checkSmartConnect();">\r\n\
                      </div>\r\n\
                      <div class="input_row">\r\n\
                      <label for="wl_password" class="input_label1" mlang="genie_1116"></label>\r\n\
                      <input class="input_field" style="padding-top: 10px;" type="password" name="wl_password" placeholder="Password" id="wl_password" maxlength="64" value="" onkeyup="checkSmartConnect();">\r\n\
                      <img src="images/pwdEyeSlash.png" id="pwd_display" class="input_image" onclick="onClick_pwdEye(\'wl_password\',\'pwd_display\');">\r\n\
                      </div>\r\n\
                      <div class="input_row" id="5gssid">\r\n\
                      <label for="wla_ssid" class="input_label1" mlang="genie_1117"></label>\r\n\
                      <input class="input_field" style="padding-top: 15px;" type="text" name="wla_ssid" id="wla_ssid" maxlength="32" value="">\r\n\
                      </div>\r\n\
                      <div class="input_row" id="5gpass">\r\n\
                      <label for="wla_password" class="input_label1" mlang="genie_1118"></label>\r\n\
                      <input class="input_field" style="padding-top: 10px;" type="password" name="wla_password" placeholder="Password" id="wla_password" maxlength="64" value="">\r\n\
                      <img src="images/pwdEyeSlash.png" id="pwd_an_display" class="input_image" onclick="onClick_pwdEye(\'wla_password\',\'pwd_an_display\');">\r\n\
                      </div>\r\n\
                    </div>\r\n\
                    <div style="margin-left: 10%; margin-right: auto; max-width: 80%; text-align: left;" id="samediv">\r\n\
                    <label class="checkbox-container">\r\n\
                    <input type="checkbox" id="check_same" name="check_same" onclick="onClick_check_same();">\r\n\
                    <span mlang="PCVP_059">Enable Smart Connect - Let the router intelligently select the best 2.4 GHz or 5 GHz WiFi band for your WiFi connections</span>\r\n\
                    <span class="checkbox-checkmark"></span>\r\n\
                    </label>\r\n\
                    </div>\r\n\
                    <div>\r\n\
                    <button id="setup_wifi_next" name="next" type="button" class= "next_bt mt-10">\r\n\
                    <span mlang="OTH011">NEXT</span>\r\n\
                    </button>\r\n\
                    </div>\r\n\
                  </div>\r\n';
              break;
          case 'congratulations-page':
              newDiv = '<div class="form-group" id="card-orbi-config-complete" style="margin: auto;height:365px;overflow:auto;scrolling:auto;display: table;"> \r\n\
                <div class="rowCenter" style="height: 20px;">\r\n\
                  <p class="wizardTitleBlack" style="padding: 50px 0px 30px; height: 25px;" mlang="PCVP_099">Configuration Complete</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_158" >You are successfully connected to the Internet.</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;"></div>\r\n\
                <div class="rowCenter" style="height: 15px;">\r\n\
                  <p class="wizardTextBlack" style="font-size: 14px;padding-bottom: 5px;" mlang="genie_1124" >Router wireless network name (SSID) and network key (password):</p>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;"></div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 300px;text-align: left;padding-bottom: 5px;">\r\n\
                    <u>2.4G </u>\r\n\
                    <u mlang="LUP009"></u>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 300px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_1115"></span>\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;">\r\n\
                    <span name="ssid_2g" id="wifi_ssid_info"></span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 300px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_154"></span>\r\n\
                    <span title="Your router is preset with WPA2-PSK wireless security to protect your network from unwanted access. To join the wireless network, you must enter the network key (password). These preset settings are unique to this device, like a serial number.  If you want to change them, you can do so later in the Wireless Settings screen on the router web GUI." mlang="D-genie_267">Network Key (Password)</span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;">\r\n\
                    <span name="key_2g" id="wifi_pwd_info"></span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                 <div class="rowCenter" style="height:20px;" align="left">\r\n\
                  <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 300px;text-align: left;padding-bottom: 5px;">\r\n\
                    <u>5G </u>\r\n\
                    <u mlang="LUP009"></u>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 300px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_1117"></span>\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;">\r\n\
                    <span name="ssid_5g" id="wifi_5g_ssid_info"></span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:20px;" align="left">\r\n\
                   <div style="display: inline-block;font-size: 14px;font-family: Arial, Helvetica, sans-serif;min-width: 300px;text-align: left;padding-bottom: 5px;">\r\n\
                    <span mlang="genie_154"></span>\r\n\
                    <span title="Your router is preset with WPA2-PSK wireless security to protect your network from unwanted access. To join the wireless network, you must enter the network key (password). These preset settings are unique to this device, like a serial number.  If you want to change them, you can do so later in the Wireless Settings screen on the router web GUI." mlang="D-genie_267">Network Key (Password)</span>\r\n\
                    <span>:</span>\r\n\
                  </div>\r\n\
                  <div style="display: inline-block;">\r\n\
                    <span name="key_5g" id="wifi_5g_pwd_info"></span>\r\n\
                  </div>\r\n\
                </div>\r\n\
                <div class="rowCenter" style="height:25px;"></div>\r\n\
                  <div id="pls_wait_div" class="rowCenter wifiLoading" style="height:25px; display: block;"></div>\r\n\
                <div class="rowCenter">\r\n\
                    <div class="waitWifiSetting" style="display: none; float: left; min-width: 300px;">\r\n\
                   <button class = "button-sty1" id="print_cred" onclick="window.print();return false;" mlang="genie_102">Print this</button>\r\n\
                  </div>\r\n\
                    <div class="waitWifiSetting" style="display: none;">\r\n\
                    <button type="Button" value="Next" name="next" id="config_com_next" class="button-sty1 mt-20" mlang="OTH011">Next</button>\r\n\
                  </div>\r\n\
                </div>\r\n\
                </div>\r\n\
                </div>\r\n';
              break;
      }
      $("#" + pageId).append(newDiv);
      window.top.mlangInit($('#' + pageId));
      return true;
  }
  
  function addWizardPages()
  {
      addWizardPage("internetPing-page");
      addWizardPage("internetDetect-page");
      addWizardPage("internetDetectSuccess-page");
      addWizardPage("noCable-page");
      addWizardPage("cableConnectionRetry-page");
      addWizardPage("internetHelpChoose-page");
      addWizardPage("adminSetting-page");
      addWizardPage("restoreConfig-page");
      //addWizardPage("wanTypeProblem-page");
      addWizardPage("wanTypeProblem-page_v2");
      addWizardPage("ipTypeChoose-page");
      addWizardPage("pppoeWanSetting-page");
      addWizardPage("pptpWanSetting-page");
      //addWizardPage("staticWanSetting-page");
      addWizardPage("staticWanSetting-page_v2");
      addWizardPage("macSetting-page");
      addWizardPage("applySetting-page");
      addWizardPage("wifiSetup-page");
      addWizardPage("congratulations-page");
      
      //Modify model name string by title string 
      $(".modelName").text(document.title.split(" ")[2]);
  }
  
  function onClick_pwdEye(passwdId,eyeId)
  {
      if ($("#"+passwdId).prop("type") == "password") {
          $("#"+passwdId).prop("type", "text");
          $("#"+eyeId).attr("src","images/pwdEye.png");
      }
      else if ($("#"+passwdId).prop("type") == "text") {
          $("#"+passwdId).prop("type", "password");
          $("#"+eyeId).attr("src","images/pwdEyeSlash.png");
      }
  }
  
  var ori_5gssid;
  var ori_5gpass;
  function onClick_check_same()
  {
      if($("#check_same")[0].checked == true) {
          //greyout 5G ssid and password fields
          $('#5gssid :input').attr('readonly', true);
          $('#5gpass :input').attr('readonly', true);
          //save original 5G ssid and password
          ori_5gssid = $("#wla_ssid").val();
          ori_5gpass = $("#wla_password").val();
          //sync value from 2.4G ssid and password
          $("#wla_ssid").val($("#wl_ssid").val());
          $("#wla_password").val($("#wl_password").val());
          //hide 5G ssid and password fields
          $("#5gssid").hide();
          $("#5gpass").hide();
      }
      else {
          //un-greyout 5G ssid and password 
          $('#5gssid :input').attr('readonly', false);
          $('#5gpass :input').attr('readonly', false);
          //restore original 5G ssid and password
          $("#wla_ssid").val(ori_5gssid);
          $("#wla_password").val(ori_5gpass);
          //show 5G ssid and password fields
          $("#5gssid").show();
          $("#5gpass").show();
      }
  }

  function onClick_TryAgain()
  {
      $("[name='try_again']").val("1");
      toggleNext();
  }
  
  function onClick_StaticNext()
  {
      $("[name='try_again']").val("0");
      toggleNext();
  }
  
  function checkWifiSetupData()
  {
      if(check_ssid($("#wl_ssid").val()) == false)
          return false;
      if( checkpsk($("#wl_password").val())== false)
          return false;
      if(check_ssid($("#wla_ssid").val()) == false)
          return false;
      if( checkpsk($("#wla_password").val())== false)
          return false;
      
      return true;
  }

  function check_ssid(ssid)
  {
      
      if(ssid == "" )
      {
          alert(window.top.mlang["SWSE07"]);
          return false;
      }
      
      if (ssid.match( /[^\x20-\x7E]/ ))
      {
          alert(window.top.mlang["SWSE02"]);
          return false;
      }
  
      return true;
  }

  function checkpsk(passphrase)
  {
      if(passphrase.length < 8)
      {
          alert(window.top.mlang["SWSE15"]);
          return false;
      }
      if(passphrase.length > 63)
      {
          if ( isHex(passphrase) == false)
          {
              alert(window.top.mlang["SWSE15"]);
              return false;
          }
      }

      if (passphrase.match( /[^\x20-\x7E]/ ))
      {
          alert(window.top.mlang["SWSE01"]);
          return false;
      }
      return true;
  }

  function checksameid()
  {
      if($("#check_same")[0].checked == false)
      {
          if($("#wla_ssid").val() == $("#wl_ssid").val())
          {
              if($("#wla_ssid").val().length < 30)
              $("#wla_ssid")[0].value += "-5G";
          }
          $("#5gssid").show();
          $("#5gpass").show();
      }
      else
      {
          $("#5gssid").hide();
          $("#5gpass").hide();
      }
  }

  function toggleNext()
  {
      $("div.page-group:visible").find("[name='next']").click();
  }
