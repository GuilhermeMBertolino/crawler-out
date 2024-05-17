/**************** Page *******************************/
var ipv6lanPage;
var G = {};
var pageview = R.pageView({ //页面初始化
	init: initPage
}); //page view

//page model
var pageModel = R.pageModel({
	getUrl: "goform/getIPv6LanStatus", //获取数据接口
	setUrl: "goform/setIPv6LanStatus", //提交数据接口
	translateData: function (data) { //数据转换
		var newData = {};
		newData.ipv6lan = data;
		return newData;
	},
	afterSubmit: function (str) { //提交数据回调
		callback(str);
	}
});

//页面逻辑初始化
function initPage() {


	$("#submit").on("click", function () {
		G.validate.checkAll();
	});
}

//提交回调
function callback(str) {
	if (!top.isTimeout(str)) {
		return;
	}
	var num = $.parseJSON(str).errCode;
	top.showSaveMsg(num);
	/*if (num == 0) {
		$("#wrl_submit").blur();
		top.wrlInfo.initValue();
		top.staInfo.initValue();
	}*/
}

/****************** Page end ********************/

/****************** Module ipv6lan setting *****/

var view = R.moduleView({
	initHtml: initHtml,
	initEvent: initEvent
});

var moduleModel = R.moduleModel({
	initData: initValue,
	getSubmitData: function () { //获取模块提交数据

		var dataObj = {
				"lanType": $('[name="lanType"]').val(),
				"lanAddr": $("input[name=lanAddr]")[0].value + "/" + $("input[name=lanAddr]")[1].value,
				"prefixType": $("[name=prefixType]").val(),
				"lanPrefix": $("input[name=lanPrefix]")[0].value + "/" + $("input[name=lanPrefix]")[1].value,
				"dhcpEn": $("[name=dhcpEn]").val(),
				"dhcpType": $("[name=dhcpType]").val(),
				"startID": $("#startID").val(),
				"endID": $("#endID").val(),
				"dnsType": $("#dnsType").val(),
				"preDNS": $("#preDNS").val(),
				"altDNS": $("#altDNS").val()
			},
			dataStr;
		dataStr = objTostring(dataObj);
		return dataStr;
	}
});
//模块注册
R.module("ipv6lan", view, moduleModel);

//初始化页面
function initHtml() {
	top.$(".main-dailog").removeClass("none");
	top.$(".save-msg").addClass("none");

}

//事件初始化
function initEvent() {
	$("#lanType").on("change", showLanType);
	$("#prefixType").on("change", showPrefixType);
	$("#dhcpEn").on("change", showDhcpEn);
	$("#dhcpType").on("change", showDhcpType);
	$("#dnsType").on("change", showDnsType);

	top.loginOut();
	checkData();
}

function showLanType() {
	if ($("#lanType").val() == "auto") {
		$(".lan-manual").addClass("none");
	} else {
		$(".lan-manual").removeClass("none");
	}
}

function showPrefixType() {
	if ($("#prefixType").val() == "auto") {
		$(".prefix-manual").addClass("none");
	} else {
		$(".prefix-manual").removeClass("none");
	}
}

function showDhcpEn() {
	if ($("#dhcpEn").val() == "1") {
		$(".dhcp-set").removeClass("none");
	} else {
		$(".dhcp-set").addClass("none");
		/*$("#lanType").val("auto");
		$("#prefixType").val("auto");*/
	}
}

function showDhcpType() {
	if ($("#dhcpType").val() == "auto") {
		$(".dhcp-manual").addClass("none");
	} else {
		$(".dhcp-manual").removeClass("none");
	}
}

function showDnsType() {
	if ($("#dnsType").val() == "auto") {
		$(".dns-manual").addClass("none");
	} else {
		$(".dns-manual").removeClass("none");
	}
}

//模块数据验证
function checkData() {
	G.validate = $.validate({
		custom: function () {
			var starID = parseInt($("#startID").val(), 16),
				endID = parseInt($("#endID").val(), 16);

			if (starID > endID) {
				$(".errMsg").removeClass("none");
				setTimeout(function () {
					$(".errMsg").addClass("none");
				}, 3000)
				return _("wrong");
			}

		},

		success: function () {
			ipv6lanPage.submit();
		},

		error: function (msg) {
			if (msg) {
				$("#wrl_save_msg").html(msg);
				setTimeout(function () {
					$("#wrl_save_msg").html("&nbsp;");
				}, 3000);
			}
			return;
		}
	});
}

function changeIPv6En(ele) {
	var className = ele.attr("class");
	if (className == "btn-off") {
		ele.attr("class", "btn-on");
		ele.val(1);
		$(".ipv6-feature").removeClass("none");
	} else {
		ele.attr("class", "btn-off");
		ele.val(0);
		$(".ipv6-feature").addClass("none");
	}
	top.initIframeHeight();
}

function initEn(ele, en) {
	if (en === "on") {
		ele.attr("class", "btn-on");
		ele.val(1);
		$(".ipv6-feature").removeClass("none");
	} else {
		ele.attr("class", "btn-off");
		ele.val(0);
		$(".ipv6-feature").addClass("none");
	}
}

function initValue(obj) {
	inputValue(obj);


	showLanType();
	showPrefixType();
	showDhcpEn();
	showDhcpType();
	showDnsType();
};

/******************* Module wireless setting end ************/

window.onload = function () {
	ipv6lanPage = R.page(pageview, pageModel);
};