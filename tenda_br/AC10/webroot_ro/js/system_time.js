var G = {};
var initObj = null;

var USDaylight = {
    //美国夏令时配置
    daylightStart: "3-2-7-2",
    daylightEnd: "11-1-7-2",
  },
  EPDaylight = {
    //欧洲夏令时配置
    daylightStart: "3-5-7-2",
    daylightEnd: "10-5-7-3",
  },
  EPTimezone = ["12:00", "11:00", "13:00", "14:00", "15:00"], //欧洲的时区
  USTimezone = ["7:00", "6:00", "5:00", "4:00", "3:00", "2:00"]; //美国的时区

G.defaultDaylight = USDaylight;

var sysTimeInfo;
var pageview = R.pageView({
  //页面初始化
  init: function() {
    top.loginOut();

    top.$(".main-dailog").removeClass("none");
    top.$(".save-msg").addClass("none");
    $("#submit").on("click", function() {
      G.validate.checkAll();
    });
    $("[name='timeType']").on("click", changeTimeType);
    $("#syncTime").on("click", copySyncTime);
    $("#timeZone").on("change", function(e) {
      if (EPTimezone.indexOf(e.target.value) != -1) {
        initDaylightTime(EPDaylight.daylightStart, EPDaylight.daylightEnd);
        initYear();
      } else if (USTimezone.indexOf(e.target.value) != -1) {
        initDaylightTime(USDaylight.daylightStart, USDaylight.daylightEnd);
        initYear();
      } else {
        initDaylightTime(
          G.defaultDaylight.daylightStart,
          G.defaultDaylight.daylightEnd
        );
        initYear();
      }
      hideStatus();
    });
  },
});
var pageModel = R.pageModel({
  getUrl: "goform/GetSysTimeCfg",
  setUrl: "goform/SetSysTimeCfg",
  translateData: function(data) {
    var newData = {};
    newData.sysTime = data;
    newData.dayLight = data;
    return newData;
  },
  afterSubmit: callback,
});

/************************/
var view = R.moduleView({
  initEvent: checkData,
});
var moduleModel = R.moduleModel({
  initData: initValue,
  getSubmitData: function() {
    var data,
      subObj = {},
      timeZone = $("#timeZone").val();

    subObj = {
      timeType: $("[name='timeType']:checked").val(),
      //"timePeriod": $("#timePeriod").val(initObj.timePeriod),
      //"ntpServer": $("#ntpServer").val(initObj.ntpServer),
      timePeriod: initObj.timePeriod,
      ntpServer: initObj.ntpServer,
      timeZone: timeZone,
      time:
        $("#year").val() +
        "-" +
        $("#month").val() +
        "-" +
        $("#day").val() +
        " " +
        $("#hour").val() +
        ":" +
        $("#minute").val() +
        ":" +
        $("#second").val(),
    };
    data = objTostring(subObj);
    return data;
  },
});

//模块注册
R.module("sysTime", view, moduleModel);

function checkData() {
  G.validate = $.validate({
    custom: function() {
      var dateReg = /^((((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9]))|(((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9]))|(((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9]))|(([2468][048]00)([-\/\._])(0?2)([-\/\._])(29))|(([3579][26]00)([-\/\._])(0?2)([-\/\._])(29))(([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29))|(([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29))|(([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29))|(([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29))|(([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29))|(([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)))$/;
      var year = $("#year").val(),
        month = $("#month").val(),
        day = $("#day").val(),
        hrs = +$("#hour").val(),
        min = +$("#minute").val(),
        sec = +$("#second").val();
      var timeType = $("[name='timeType']:checked")[0].value;

      if (timeType === "manual") {
        //日期不存在
        if (!dateReg.test(year + "-" + month + "-" + day)) {
          return _("Invalid date, Please re-enter");
        }
        //时间不存在
        //0, 23
        //0, 59
        //0, 59
        if (hrs > 23 || min > 59 || sec > 59) {
          return _("Invalid time, Please re-enter");
        }
      }
    },
    success: function() {
      sysTimeInfo.submit();
    },

    error: function(msg) {
      if (msg) {
        $("#msg-err").html(msg);
      }
      return;
    },
  });
}

function changeTimeType() {
  var val = $("[name='timeType']:checked")[0].value;
  $("#msg-err").html("");
  if (val === "sync") {
    $("#manual_set").addClass("none");
    $("#sync_set").removeClass("none");
  } else {
    $("#manual_set").removeClass("none");
    $("#sync_set").addClass("none");
  }
}

function copySyncTime() {
  var date = new Date();
  $("#year").val(date.getFullYear());
  $("#month").val(date.getMonth() + 1);
  $("#day").val(date.getDate());
  $("#hour").val(date.getHours());
  $("#minute").val(date.getMinutes());
  $("#second").val(date.getSeconds());
  //隐藏夏令时状态
  hideStatus();
}

function initValue(obj) {
  initObj = obj;

  var ruTimeZoneList = [
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
  ];
  var timeZoneTemp = obj.timeZone;
  var date = obj.time.split(" ")[0];
  var tm = obj.time.split(" ")[1];

  if (top.G.countryCode === "RU" || top.G.countryCode === "UA") {
    $("#timeZone").val(timeZoneTemp);
  } else {
    //非俄罗斯及乌克兰地区移除新增的时区
    $(".ruTimezone").remove();
    $("#timeZone").val(obj.timeZone);
  }

  $("#sysTime").text(obj.time);
  //2014-01-12 12:22:30
  $("#year").val(date.split("-")[0]);
  $("#month").val(date.split("-")[1]);
  $("#day").val(date.split("-")[2]);
  $("#hour").val(tm.split(":")[0]);
  $("#minute").val(tm.split(":")[1]);
  $("#second").val(tm.split(":")[2]);

  if (obj.isSyncInternetTime == "true") {
    $("#syncInternetTips").text(_("(synchronized with internet time)"));
  } else {
    $("#syncInternetTips").text(_("(unsynchronized with internet time)"));
  }
  /*$("#ntpServer").val(obj.ntpServer);
	$("#timePeriod").val(obj.timePeriod);*/
  $("[name=timeType][value=" + obj.timeType + "]").attr("checked", true);
  changeTimeType();
  top.initIframeHeight();
}

function callback(str) {
  if (!top.isTimeout(str)) {
    return;
  }
  var num = $.parseJSON(str).errCode;

  top.showSaveMsg(num);
  if (num == 0) {
    top.advInfo.initValue();
  }
}

var daylightView = R.moduleView({
  initEvent: function() {
    //夏令时开关
    $("#daylightEn").on("click", function() {
      var val = $("#daylightEn").attr("class") == "btn-off" ? "1" : "0";
      changeDaylightEn(val);
    });
    //夏令时配置切换
    $(".daylightWrap select").on("change", initYear);
  },
});

var daylightModel = R.moduleModel({
  initData: function(obj) {
    //开关
    changeDaylightEn(obj.daylightEn);
    //开始年份
    $("#startYear").html(obj.startYear);
    //结束年份
    $("#endYear").html(obj.endYear);
    //运行状态
    if (obj.daylightStatus == "1") {
      $("#daylightStatus").html(_("Daylight Saving Time is on"));
    } else {
      $("#daylightStatus").html(_("Daylight Saving Time is off"));
    }
    //初始化夏令时开始结束时间
    G.defaultDaylight = obj;
    initDaylightTime(obj.daylightStart, obj.daylightEnd);
  },
  getSubmitData: function() {
    var data,
      subObj = getDaylightValue();

    data = objTostring(subObj);
    return data;
  },
});

//初始化夏令时开始结束时间
function initDaylightTime(daylightStart, daylightEnd) {
  //开始时间
  var startInfo = daylightStart.split("-");
  $("#startMonth").val(startInfo[0]);
  $("#startNum").val(startInfo[1]);
  $("#startWeek").val(startInfo[2]);
  $("#startTime").val(startInfo[3]);
  //结束时间
  var endInfo = daylightEnd.split("-");
  $("#endMonth").val(endInfo[0]);
  $("#endNum").val(endInfo[1]);
  $("#endWeek").val(endInfo[2]);
  $("#endTime").val(endInfo[3]);
}

//开关函数
function changeDaylightEn(val) {
  if (val == "1") {
    $("#daylightEn").attr("class", "btn-on");
    $("#daylightEn").val("1");
    $(".daylightWrap").removeClass("none");
  } else {
    $("#daylightEn").attr("class", "btn-off");
    $("#daylightEn").val("0");
    $(".daylightWrap").addClass("none");
  }
  top.initIframeHeight();
}

//复制本地时间或着切换时区或者修改夏令时配置 夏令时状态隐藏
function hideStatus() {
  $(".runStatus").addClass("none");
}

//获取页面夏令时参数
function getDaylightValue() {
  var valueInfo = {
    daylightEn: $("#daylightEn").val(),
    startYear: $("#startYear").html(),
    endYear: $("#endYear").html(),
    daylightStart:
      $("#startMonth").val() +
      "-" +
      $("#startNum").val() +
      "-" +
      $("#startWeek").val() +
      "-" +
      $("#startTime").val(),
    daylightEnd:
      $("#endMonth").val() +
      "-" +
      $("#endNum").val() +
      "-" +
      $("#endWeek").val() +
      "-" +
      $("#endTime").val(),
  };
  return valueInfo;
}

//时间比较函数
function compareTime(startStr, endStr) {
  startTime = startStr.split("-");
  endTime = endStr.split("-");

  for (var i = 0; i < startTime.length; i++) {
    if (+startTime[i] > +endTime[i]) {
      return true;
    } else if (+startTime[i] < +endTime[i]) {
      return false;
    }
  }
  return true;
}

//初始化结束年份的值
function initYear() {
  //如果起始时间大于结束时间 结束年份比起始年份加一
  var currentValue = getDaylightValue();
  if (
    compareTime(currentValue["daylightStart"], currentValue["daylightEnd"]) &&
    $("#startYear").html() >= $("#endYear").html()
  ) {
    //结束年份
    $("#endYear").html(+currentValue["startYear"] + 1);
  }
  //如果夏令时跨度超过一年
  if (
    !compareTime(currentValue["daylightStart"], currentValue["daylightEnd"]) &&
    $("#startYear").html() < $("#endYear").html()
  ) {
    //结束年份
    $("#endYear").html(+currentValue["startYear"]);
  }
  hideStatus();
}

//模块注册
//夏令时加宏控
if (top.CONFIG_DAYLIGHTSAVINGTIME == "y") {
  $("#daylight_set").removeClass("none");
  R.module("dayLight", daylightView, daylightModel);
}

window.onload = function() {
  sysTimeInfo = R.page(pageview, pageModel);
};
