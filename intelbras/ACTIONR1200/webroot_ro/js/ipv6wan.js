/**************** Page *******************************/
var ipv6wanPage;
var G = {};
var pageview = R.pageView({ //页面初始化
	init: initPage
}); //page view

//page model
var pageModel = R.pageModel({
	getUrl: "goform/getIPv6WanStatus", //获取数据接口
	setUrl: "goform/setIPv6WanStatus", //提交数据接口
	translateData: function (data) { //数据转换
		var newData = {};
		newData.ipv6wan = data;
		return newData;
	},
	afterSubmit: function (str) { //提交数据回调
		callback(str);
	}
});

//页面逻辑初始化
function initPage() {
	$.validate.valid.ssid = {
		all: function (str) {
			var ret = this.specific(str);
			//ssid 前后不能有空格，可以输入任何字符包括中文，仅32个字节的长度
			if (ret) {
				return ret;
			}

			/*if (str.charAt(0) == " " || str.charAt(str.length - 1) == " ") {
				return _("The first and last characters of WiFi Name cannot be spaces.");
			}*/

			if (getStrByteNum(str) > 32) {
				return _("The WiFi name can contain only a maximum of %s bytes.", [32]);
			}
		},
		specific: function (str) {
			var ret = str;
			if ((null == str.match(/[^ -~]/g) ? str.length : str.length + str.match(/[^ -~]/g).length * 2) > 32) {
				return _("The WiFi name can contain only a maximum of %s bytes.", [32]);
			}
		}
	}
	$.validate.valid.ssidPwd = {
		all: function (str) {
			var ret = this.specific(str);

			if (ret) {
				return ret;
			}
			if ((/^[0-9a-fA-F]{1,}$/).test(str) && str.length == 64) { //全是16进制 且长度是64

			} else {
				if (str.length < 8 || str.length > 63) {
					return _("The password must consist of %s-%s characters.", [8, 63]);
				}
			}

		},
		specific: function (str) {
			var ret = str;
			if (/[^\x00-\x80]/.test(str)) {
				return _("Invalid characters are not allowed.");
			}
		}
	}

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

/****************** Module ipv6wan setting *****/

var view = R.moduleView({
	initHtml: initHtml,
	initEvent: initEvent
});

var moduleModel = R.moduleModel({
	initData: initValue,
	getSubmitData: function () { //获取模块提交数据

		getCheckbox(["nonTempAddr", "prefixDelegate"]);

		var dataObj = {
				"IPv6En": $('[name="IPv6En"]').val(),
				"conType": $('[name="conType"]').val(),
				"wanAddr": $("input[name=wanAddr]")[0].value + "/" + $("input[name=wanAddr]")[1].value,
				"gateway": $("input[name=gateway]").val(),
				"preDNS": $("input[name=preDNS]").val(),
				"altDNS": $("input[name=altDNS]").val(),
				"ISPusername": $("input[name=ISPusername]").val(),
				"ISPpassword": $("input[name=ISPpassword]").val(),
				"nonTempAddr": $("#nonTempAddr").val(),
				"prefixDelegate": $("#prefixDelegate").val()
			},
			dataStr;
		dataStr = objTostring(dataObj);
		return dataStr;
	}
});
//模块注册
R.module("ipv6wan", view, moduleModel);

//初始化页面
function initHtml() {
	top.$(".main-dailog").removeClass("none");
	top.$(".save-msg").addClass("none");

}

//事件初始化
function initEvent() {
	$("#conType").on("change", showConType);

	$('[name^="IPv6En"]').on("click", function () {
		changeIPv6En($(this));
	});

	top.loginOut();
	checkData();
}

function showConType() {
	if ($("#conType").val() == "PPPoE") {
		$(".ipv6-static").addClass("none");
		$(".ipv6-addrWay,.ipv6-pppoe").removeClass("none");
	} else if ($("#conType").val() == "DHCP") {
		$(".ipv6-static,.ipv6-pppoe").addClass("none");
		$(".ipv6-addrWay").removeClass("none");
	} else {
		$(".ipv6-addrWay,.ipv6-pppoe").addClass("none");
		$(".ipv6-static").removeClass("none");
	}
}

//模块数据验证
function checkData() {
	G.validate = $.validate({
		custom: function () {
			//if ($("#wrlEn").hasClass("btn-on")) {
			if (($("#security").val() !== "none") && ($("#wrlPwd").val() === "")) {
				return _("Please specify your 2.4 GHz WiFi password.");
			}
			//}

			//if ($("#wrlEn_5g").hasClass("btn-on")) {
			if (($("#security_5g").val() !== "none") && ($("#wrlPwd_5g").val() === "")) {
				return _("Please specify your 5 GHz WiFi password.");
			}
			//}
		},

		success: function () {
			ipv6wanPage.submit();
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
	if (obj.IPv6En === "1") {
		initEn($('[name="IPv6En"]'), "on");
	} else {
		initEn($('[name="IPv6En"]'), "off");
	}


	if (obj.nonTempAddr == "1") {
		$("#nonTempAddr")[0].checked = true;
	} else {
		$("#nonTempAddr")[0].checked = false;
	}

	if (obj.prefixDelegate == "1") {
		$("#prefixDelegate")[0].checked = true;
	} else {
		$("#prefixDelegate")[0].checked = false;
	}

	showConType();
};

/******************* Module wireless setting end ************/

window.onload = function () {
	ipv6wanPage = R.page(pageview, pageModel);
};