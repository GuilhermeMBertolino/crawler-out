var language = B.getLang();
var G = {};

function initDirectUpgrade() {
	/*$.getJSON("goform/getUpgradeInfo?rand=" + Math.random(), function (obj) {
		if (obj.wan_sta == 0) {
			$("#status_checking").html(_("Failed to access the internet. Please check the internet connection."));
		} else {
			$.getJSON("goform/cloudv2?module=olupgrade&opt=queryversion&rand=" + new Date().toTimeString(), onlineQueryVersion);
		}
	});*/

	$.getJSON("goform/getUpgradeInfo?rand=" + Math.random(), onlineQueryVersion);
}

function onlineErrCode(num) {
	var result = "";
	switch (num) {
	case 0:
		break;
	case 1:
		result = _("Unknown error.");
		break;
	case 2:
		result = _("JSON data is too long.");
		break;
	case 3:
		result = _("Failed to allocate memory. The available memory is not enough.");
		break;
	case 4:
		result = _("Connection failure.");
		break;
	case 5:
	case 6:
		result = _("Failed to connect to the socket.");
		break;
	case 7:
	case 8:
		result = _("Failed to run the command.");
		break;
	case 9:
		result = _("Invalid command.");
		break;
	case 10:
	case 11:
	case 12:
		result = _("Failed to analyze, package, or detect data.");
		break;
	case 13:
	case 14:
	case 17:
		result = _("Failed to connect to the server.");
		break;
	case 15:
		result = _("Authentication failure.");
		break;
	case 16:
		result = _("The Tenda App feature is disabled.");
		break;
	case 18:
		result = _("The cloud server is busy updating data or testing speeds.");
		break;
	case 19:
		result = _("Connecting to the server...");
		break;
	case "201":
		result = _("The file is malformed"); //文件格式错误
		break;
	case "202":
		result = _("When CRC checkout error."); //CRC校验错误
		break;
	case "203":
		result = _("The file size is illegal."); //文件大小不合法
		break;
	case "204":
		result = _("System memory not enough."); //系统内存不足
		break;
	case "205":
		result = _("MD5 Check failure."); //MD5校验失败
		break;
	}

	return result;

}

function onlineQueryVersion(obj) {
	var ver_info = obj.version,
		description = obj.summary;

	/*var result = onlineErrCode(ver_info.err_code);
	if (ver_info.err_code == 19) {
		$("#status_checking").removeClass("none").html(result);
		clearTimeout(G.onlineTimer);
		G.onlineTimer = setTimeout(function () {
			$.getJSON("goform/cloudv2?module=olupgrade&opt=queryversion&rand=" + new Date().toTimeString(), onlineQueryVersion);
		}, 2000);
		return;
	}*/

	/*if (result == "") {

		switch (ver_info.resp_type) {
		case 0:
			//获取到新版本，显示版本信息，根据当前语言来显示
			$("#status_checking, #status_progress, #download_note, #upgrade_err").addClass("none");
			$("#status_checked, #download_soft").removeClass("none");
			//显示信息
			$("#new_fw_ver").html(ver_info.detail.newest_ver);
			$("#new_fw_date").html(ver_info.detail.update_date);
			var description = ver_info.detail.description;
			if (language == "en") {
				description = ver_info.detail.description_en;
			} else if (language == "cn") {
				description = ver_info.detail.description;
			} else if (language == "zh") {
				description = ver_info.detail.description_zh_tw;
			}
			if (description) {
				descriptionArr = description.join("").split("\n");
			} else {
				descriptionArr = ver_info.detail.description[0].split("\n");
			}
			$("#releaseNote").html("");
			for (var i = 0; i < descriptionArr.length; i++) {
				$("#releaseNote").append("<li>" + descriptionArr[i] + "</li>");
			}

			break;
		case 1:
			//没有新版本
			$("#status_checking").html(_("No later version is available."));
			$("#download_soft").addClass("none");
			break;

		}
	} else {
		$("#status_checking").html(result);
	}*/

	if (ver_info == "") { //表示网络有问题
		$("#status_checking").html(_("Failed to access the internet. Please check the internet connection."));
		$("#download_soft").addClass("none");
	} else if (ver_info == "0") { //已经是最新版
		$("#status_checking").html(_("No later version is available."));
		$("#download_soft").addClass("none");
	} else {
		$("#status_checked, #download_soft").removeClass("none");
		//显示最新信息
		$("#new_fw_ver").html(ver_info);
		$("#releaseNote").html(description);
	}

	top.initIframeHeight();
}

function dowloadSoft() {

	//if (window.confirm(_("When download is complete, the router starts the upgrade automatically. Keep the router powered on during the upgrade to prevent damaging the router."))) {

	$("#download_soft").attr("disabled", true);
	$('input[name="upgradeType"]').attr("disabled", true);

	$("#download_soft, #status_progress, #download_note, #status_checked").addClass("none");

	//$("#status_checking").removeClass("none").html(_("Downloading..."));
	//不允许跳转页面
	top.$(".iframe-close").addClass("none");

	/*$.getJSON("goform/cloudv2?module=wansta&opt=query&rand=" + Math.random(), function (obj) {
		if (obj.wan_sta == 0) {

			$("#status_checking").html(_("Failed to access the internet. Please check the internet connection."));
			$("#download_soft").attr("disabled", false);
			$('input[name="upgradeType"]').attr("disabled", false);
			top.$(".iframe-close").removeClass("none");
		} else {

			$.getJSON("goform/cloudv2?module=olupgrade&opt=queryupgrade&rand=" + new Date().toTimeString(), queryUpgradeStatus);
		}
	});*/

	$.getJSON("goform/startUpgrade?rand=" + Math.random(), function (data) {
		$("#update").removeClass("none");
		$("#updateContent").html(data.changeLog);

		checkingStatus(2000);
	});

}


function queryUpgradeStatus(obj) {

	var num = 0;

	if (typeof obj == "string" && obj.indexOf("!DOCTYPE html") >= 0) {
		//被重置了页面，说明升级有问题
		num = -1;
	}
	if (num == 0) {

		clearTimeout(G.time);
		showOnlineUp(obj);
	} else {
		$("#download_soft").attr("disabled", false);
		top.$(".iframe-close").removeClass("none");
		top.$("#page-message").html(_("Upgrade error. Please check the internet connection status."));
		setTimeout(function () {
			top.$(".main-dailog").removeClass("none");
			//显示页面，隐藏保存进度条
			top.$(".save-msg").addClass("none");
		}, 1000);
	}
}

function showOnlineUp(obj) {

	if (obj.status == "0") { //下载中
		$("#status_progress").removeClass("none");
		$(".progressNum,#progress_bg").addClass("none");
		top.$("body").undelegate("#gbx_overlay", "click");
		checkingStatus(2000);
	} else if (obj.status == "1") { //下载完成
		var result = onlineErrCode(obj.errCode);
		if (result == "") {
			$(".progressNum,#progress_bg").removeClass("none");
			$("#status_progress").removeClass("none");
			onlineProgress();
		} else {
			$("#status_progress").addClass("none");
			$("#upgrade_err").html(result).removeClass("none");
		}
	} else { //下载失败
		$("#status_progress").addClass("none");
		$("#upgrade_err").html(_("Download failed.")).removeClass("none");
	}

	top.initIframeHeight();
}

function onlineProgress() {
	var rebootTimer = null,
		percent = 0;
	$("#progress_bar").css("width", 0);
	$("#progress_num .progressNum").text("0%");
	$("#progressMsg").html(_("Upgrading... Please wait."));
	$("#download_note").removeClass("none");

	top.$("body").undelegate("#gbx_overlay", "click");
	top.$(".iframe-close").addClass("none");

	function rebootTime(percent) {
		$("#progress_bar").css("width", percent + "%");
		$("#progress_num .progressNum").text(percent + "%");
		$("#progress_num").addClass("txt-center");
		rebootTimer = setTimeout(function () {
			rebootTime(percent);
		}, 1450);

		if (percent >= 100) {
			clearTimeout(rebootTimer);
			top.jumpTo(window.location.host);
			return;
		} else if (percent >= 80) {
			$("#progressMsg").html(_("Rebooting... Please wait."));
		}
		percent++;
	}

	rebootTime(0);
}

function checkingStatus(time) {
	clearTimeout(G.time);
	G.time = setTimeout(function () {
		$.getJSON("goform/getDownloadStatus?rand=" + new Date().toTimeString(), showOnlineUp);
	}, time);
}

function changeUpgradeType() {
	if ($("#local_upgrade").prop("checked")) {
		$("#local_upgrade_wrap").removeClass("none");
		$("#online_upgrade_wrap").addClass("none");

	} else {
		initDirectUpgrade();
		$("#online_upgrade_wrap").removeClass("none");
		$("#local_upgrade_wrap").addClass("none");
	}
	top.initIframeHeight();
}

function callback(obj) {
	$("#cur_fw_ver").html(obj.cur_fw_ver);
}

function noUpgradeFirm() {
	var dataStr = "";
	if ($("#noUpdateTips").length > 0 && $("#noUpdateTips")[0].checked) {
		dataStr = "action=1&newVersion=" + $("#new_fw_ver").html();
		$.GetSetData.setData("goform/setNotUpgrade", dataStr, function () {
			top.closeIframe();
		});
	} else {
		top.closeIframe();
	}
}

function initEvent() {
	$("[name='upgradeType']").on("click", changeUpgradeType);
	$("#sys_upgrade").on("click", function () {
		if ($("#upgradeFile").val() == "") {
			//if($("#cur_fw_ver").html() == $("#new_fw_ver").html()) {
			showErrMsg("msg-err", _("Please select a firmware file for upgrading the router."));
			G.index = 1;
			return false;
			//}
			//$.post("goform/SysToolSetUpgrade", "action=0",callbackUpgrade)
		} else {
			document.forms[0].submit();
			$("#sys_upgrade").attr("disabled", true);
		}
	});

	$("#noUpdate").on("click", noUpgradeFirm);

	$("#download_soft").on("click", dowloadSoft);

	//重新定义关闭弹出框事件
	top.$(".iframe-close").off("click");
	top.$(".iframe-close").on("click", function () {
		top.$(".iframe-close").off("click").on("click", top.closeIframe);
		noUpgradeFirm();
	});

	$.getJSON("goform/SysToolGetUpgrade?" + Math.random(), callback);
}

function initUpgrade() {
	var msg = location.search.substring(1) || "0";
	//1001 格式错误
	//1002 CRC校验失败
	//1003 文件大小错误
	//1004 升级失败
	//1005 内存不足，请重启路由器
	if ($("#local_upgrade").length > 0) {
		$("#local_upgrade").prop("checked", true);
		$("#local_upgrade_wrap").removeClass("none");
		$("#online_upgrade_wrap").addClass("none");
	}

	if (msg == "1001") {
		$("#msg-err").html(_("Format error!"));
	} else if (msg == "1002") {
		$("#msg-err").html(_("CRC check Failure"));
	} else if (msg == "1003") {
		$("#msg-err").html(_("File size error"));
	} else if (msg == "1004") {
		$("#msg-err").html(_("Fail to upgrade it!"));
	} else if (msg == "1005") {
		$("#msg-err").html(_("Internal memory is not enough. Please reboot the router before upgrading."));
	} else {
		if ($("#online_upgrade").length > 0) {
			$("#online_upgrade").prop("checked", true);
			$("#online_upgrade_wrap").removeClass("none");
			$("#local_upgrade_wrap").addClass("none");
		}
		initDirectUpgrade();
	}
	$("#sys_upgrade").removeAttr("disabled");
	top.$(".main-dailog").removeClass("none");
}

window.onload = function () {
	initUpgrade();
	initEvent();
}
window.onunload = function () {
	top.$(".iframe-close").off("click").on("click", top.closeIframe);
}