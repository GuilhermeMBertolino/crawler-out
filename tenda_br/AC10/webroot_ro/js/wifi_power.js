var wrlPowerInfo;
var pageview = R.pageView({ //页面初始化
    init: function() {
        $("#submit").on("click", function() {
            wrlPowerInfo.submit();
        });
        top.loginOut();
        top.$(".main-dailog").removeClass("none");
        top.$(".save-msg").addClass("none");
        // eslint-disable-next-line no-constant-condition
        if(!(/*OEM_CONFIG_HAS_EXTENDER|true*/true/* OEMTAG 是否支持显示扩展器购买*/)) {
            $("#extendWrap").remove();
        }
    }
});

var pageModel = R.pageModel({
    getUrl: "goform/WifiPowerGet",
    setUrl: "goform/WifiPowerSet",
    translateData: function(data) {
        var newData = {};
        newData.wrlPower = data;
        return newData;
    },
    afterSubmit: callback
});

/************************/
var view = R.moduleView({
    initEvent: initEvent
});
var moduleModel = R.moduleModel({
    initData: initValue,
    getSubmitData: function() {
        return "power=" + $("[name='power']:checked").val() + "&power_5g=" + $("[name='power_5g']:checked").val();
    }
});

//模块注册
R.module("wrlPower", view, moduleModel);

function changeImg(imgID, powerValue) {
    var $imgDom = $("#"+imgID);

    if (powerValue == "low") {
        $imgDom.attr("src", "../img/icon-power-gray1.png");
    } else if (powerValue == "middle") {
        $imgDom.attr("src", "../img/icon-power-gray2.png");
    } else {
        $imgDom.attr("src", "../img/icon-power.png");
    }
}

function initEvent() {
    $("[name=power]").on("change", function() {
    	changeImg("powerImg",this.value);
    });

    $("[name=power_5g]").on("change", function() {
    	changeImg("powerImg5",this.value);
    });
}

function initValue(obj) {
    top.$(".main-dailog").removeClass("none");
    top.$("iframe").removeClass("none");
    top.$(".loadding-page").addClass("none");

    $("[name='power'][value='" + obj.power + "']").prop("checked", true);
    changeImg("powerImg",obj.power);

    $("[name='power_5g'][value='" + obj.power_5g + "']").prop("checked", true);
    changeImg("powerImg5",obj.power_5g);
    $.getJSON('goform/WifiRadioGet',function (data){
        if(data.adv_country == "EG"){
            $('.eg-show').show()
        }
    })
}

function callback(str) {
    if (!top.isTimeout(str)) {
        return;
    }
    var num = $.parseJSON(str).errCode;
    top.showSaveMsg(num);
    if (num == 0) {
        //getValue();
        top.advInfo.initValue();
        top.wrlInfo.initValue();
    }
}

function getHomePage() {
    var homePage = "";
    if (B.getLang() == "cn") {
        $("#goPage").addClass("disabled");
        $.GetSetData.getData("goform/getHomeLink", function (str) {
            var obj = $.parseJSON(str);
            homePage = obj.homePageLink;
            $("#goPage").attr("href", homePage);
            $("#goPage").removeClass("disabled");
        });
    } else {
        homePage = "http://www.tendacn.com/en/product/A9.html";
        $("#goPage").attr("href", homePage);
        return;
    }
}

window.onload = function() {
    wrlPowerInfo = R.page(pageview, pageModel);
    $("#goPage").attr("href", top.G.homePage);
    getHomePage();
};
