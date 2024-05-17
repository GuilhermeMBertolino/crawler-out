/**************** Page *******************************/
var ipv6status;
var G = {};
var pageview = R.pageView({ //页面初始化
	init: initPage
}); //page view

//page model
var pageModel = R.pageModel({
	getUrl: "goform/getIPv6status", //获取数据接口
	setUrl: "goform/setIPv6LanStatus", //提交数据接口
	translateData: function (data) { //数据转换
		var newData = {};
		if(data.conType === 'Static'){
			data.conType = 'Estático';
		}
		newData.ipv6lan = data;
		return newData;
	},
	afterSubmit: function (str) { //提交数据回调
		callback(str);
	}
});

//页面逻辑初始化
function initPage() {

}

//提交回调
function callback(str) {

}

/****************** Page end ********************/

/****************** Module ipv6lan setting *****/

var view = R.moduleView({
	initHtml: initHtml,
	initEvent: initEvent
});

var moduleModel = R.moduleModel({
	initData: initValue,

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

	top.loginOut();
	checkData();
}



//模块数据验证
function checkData() {
	G.validate = $.validate({
		custom: function () {

		},

		success: function () {

		},

		error: function (msg) {

		}
	});
}


function initValue(obj) {
	var data = obj || {},
		innerHtml = "";
	for (var prop in data) {
		if (prop == "wanAddr" || prop == "lanAddr") {
			for (var i = 0; i < data[prop].length; i++) {
				if (i == 0) {
					innerHtml += "<div>" + data[prop][i] + "</div>";
				} else {
					innerHtml += "<div style='margin-top:7px'>" + data[prop][i] + "</div>";
				}
			}
			$("#" + prop).html(innerHtml);
			innerHtml = "";
		} else {
			$("#" + prop).text(data[prop]);
		}
	}
};

/******************* Module wireless setting end ************/

window.onload = function () {
	ipv6status = R.page(pageview, pageModel);
};