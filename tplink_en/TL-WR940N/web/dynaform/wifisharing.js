
/* qr code */
var Wifisharing = (function () {
	function getElementsByClassName(element, className) {
		var result = [];
		if (element.getElementsByClassName) {
			result = element.getElementsByClassName(className);
			return result;
		} else {
			var nameList = className.split(/\s+/);
			var elements = element.getElementsByTagName('*');
			var patterns = [];
			var current, flag;
			// make regexg
			for(var i = nameList.length - 1; i >= 0; i--) {
				patterns.push(new RegExp('(^|\\s)' + nameList[i] + '(\\s|$)'));
			}
			for(var j = elements.length - 1; j >= 0; j--) {
				current = elements[j];
				flag = false;
				for (var k = 0, len = patterns.length; k < len; k++) {
					flag = patterns[k].test(current.className);
					if (!flag) break;
				}
				if (flag) result.push(current);
			}
		}
		return result;
	}
	function addEvents(target, eventType, handle) {
		if(document.addEventListener){
			addEvents = function(target, eventType, handle) {
				if(!target) return;
				target.addEventListener(eventType, handle, false);
			};
		} else {
			addEvents = function(target,eventType,handle) {
				if(!target) return;
				target.attachEvent('on' + eventType,function(e) {
					handle.apply(target, arguments);
				});
			};
		}
		addEvents(target, eventType, handle);
	}
	function addClass(el, className) {
		if(!(new RegExp("(\\s|^)" + className + "(\\s|$)")).test(el.className)) {
			el.className = el.className + " " + className;
		}
	}
	function removeClass(el, className) {
		el.className = el.className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), " ");
	}
	function hasClass(el, className) {
		return (new RegExp("(\\s|^)" + className + "(\\s|$)")).test(el.className);
	}
	function Wifisharing(el, options) {
		if(!el) {
			return false;
		}
		options = options || {};
		this.el = el;
		this.ssid = options.ssid || "";
		this.password = options.password || "";
		this.security = options.security || "";
		this.cls = options.cls || "";
		this.qrcodeEnable = true;
		this.textEnable = true;
		this._canvasSupport = this._isCanvasSupport();
		this._blobSupport = this._isBlobSupport();
		this.create();
		this.setData({
			ssid: this.ssid,
			password: this.password,
			security: this.security
		});
		return this;
	}
	Wifisharing.prototype.create = function() {
		var me = this;
		var inHTML = '<div class="wifisharing-container ' + this.cls + '">';
		inHTML +=   '<div class="widget-wrap-outer wifisharing-wrap-outer">';
		inHTML +=     '<div class="widget-wrap wifisharing-wrap">';
		inHTML +=       '<div class="wifisharing-sharing-btn-container">';
		inHTML +=         '<a href="javascript:void(0);" class="wifisharing-sharing-btn">Sharing Network</a>';
		inHTML +=       '</div>';
		inHTML +=       '<div class="wifisharing-main-container">';
		inHTML +=         '<div class="wifisharing-delta-container">';
		inHTML +=           '<span class="icon-delta"></span>';
		inHTML +=         '</div>';
		inHTML +=          '<div class="wifisharing-main-wrap">';
		inHTML +=            '<div class="wifisharing-content">';
		inHTML +=              '<div class="wifisharing-qrcode-container">';
		inHTML +=                '<div class="wifisharing-qrcode-wrap"></div>';

		if(this._blobSupport) {
			inHTML +=                '<div class="wifisharing-checkbox-container wifisharing-qrcode-checkbox-container">';
			inHTML +=                  '<input type="checkbox" value="1" name="wifisharing-qrcode">';
			inHTML +=                '</div>';
		}

		inHTML +=              '</div>';
		inHTML +=              '<div class="wifisharing-text-container">';
		inHTML +=                '<div class="wifisharing-text-wrap">';
		inHTML +=                  '<div class="wifisharing-ssid-container">';
		inHTML +=                    '<p class="wifisharing-ssid-label">SSID:</p>';
		inHTML +=                    '<p class="wifisharing-ssid-text"></p>';
		inHTML +=                  '</div>';
		inHTML +=                  '<div class="wifisharing-password-container">';
		inHTML +=                    '<div class="wifisharing-password-content">';
		inHTML +=                      '<p class="wifisharing-password-label">Password:</p>';
		inHTML +=                      '<p class="wifisharing-password-text"></p>';
		inHTML +=                    '</div>';
		inHTML +=                    '<div class="wifisharing-no-password-content hidden">';
		inHTML +=                      '<p class="wifisharing-no-password-text">No Password</p>';
		inHTML +=                    '</div>';
		inHTML +=                  '</div>';
		inHTML +=                '</div>';

		if(this._blobSupport) {
			inHTML += '<div class="wifisharing-checkbox-container wifisharing-text-checkbox-container">';
			inHTML +=   '<input type="checkbox" value="1" name="wifisharing-text">';
			inHTML += '</div>';
		}

		inHTML +=              '</div>';
		inHTML +=           '</div>';

		if(this._blobSupport) {
			inHTML +=           '<div class="wifisharing-save-btn-container">';
			inHTML +=             '<a href="javascript:void(0);" class="wifisharing-save-btn">Save Picture</a>';
			inHTML +=           '</div>';
		}

		inHTML +=         '</div>';
		inHTML +=       '</div>';
		inHTML +=     '</div>';
		inHTML +=   '</div>';

		this.el.innerHTML = inHTML;
		var container = getElementsByClassName(this.el, "wifisharing-container")[0];
		addEvents(container, "click", function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(!target) {
				return false;
			}
			// open content
			if (hasClass(target, "wifisharing-sharing-btn") && hasClass(container, "popup")) {
				var main = getElementsByClassName(me.el, "wifisharing-main-container")[0];
				main.style.display = "block";
				return true;
			}
			// save image
			if (hasClass(target, "wifisharing-save-btn")) {
				if(me.textEnable || me.qrcodeEnable) {
					me.saveImage();
				}
				return true;
			}
		});

		// close content
		if(hasClass(container, "popup")) {
			addEvents(document.documentElement, "click", function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;

				(function() {
					var node = target;
					while(node.parentNode && !hasClass(node, "wifisharing-container")) {
						node = node.parentNode;
					}
					if(!node.parentNode && !hasClass(target, "wifisharing-download-link")) {
						getElementsByClassName(me.el, "wifisharing-main-container")[0].style.display = "none";
					}
				})();
			});
		}

		if(this._blobSupport) {
			// checkbox left
			var qrcodeCheckbox = getElementsByClassName(container, "wifisharing-qrcode-checkbox-container")[0].childNodes[0];
			qrcodeCheckbox.checked = true;
			me.enableQrcode();
			qrcodeCheckbox.onchange = function(e) {
				if(e.target.checked) {
					me.enableQrcode();
				} else {
					me.disableQrcode();
				}
			};
			// checkbox right
			var textCheckbox = getElementsByClassName(container, "wifisharing-text-checkbox-container")[0].childNodes[0];
			textCheckbox.checked = true;
			me.enableText();
			getElementsByClassName(container, "wifisharing-text-checkbox-container")[0].childNodes[0].onchange = function(e) {
				if(e.target.checked) {
					me.enableText();
				} else {
					me.disableText();
				}
			};
		}
	};
	Wifisharing.prototype._isCanvasSupport = function() {
		var support = true;
		var canvas = document.createElement("canvas");
		canvas.style.width = 0;
		canvas.style.height = 0;
		canvas.style.display = "none";
		document.documentElement.appendChild(canvas);
		try {
			canvas.getContext("2d");
			support = true;
		} catch(e) {
			support = false;
		}
		document.documentElement.removeChild(canvas);
		return support;
	};
	Wifisharing.prototype._isBlobSupport = function() {
		var support = false;
		try {
			new Blob();
			support = true;
		} catch(e) {
			support = false;
		}
		return support;
	};
	Wifisharing.prototype.getBlob = function(base64) {
		// 获取base64中的数据
		var getData = function(base64) {
			return base64.substr(base64.indexOf("base64,") + 7, base64.length);
		};
		// 获取文件类型
		var getContentType = function(base64) {
			return /data:([^;]*);/i.exec(base64)[1];
		};
		// base64转Blob
		var b64toBlob = function(b64Data, contentType, sliceSize) {
			contentType = contentType || '';
			sliceSize = sliceSize || 512;
			var byteCharacters = atob(b64Data);
			var byteArrays = [];
			for(var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				var slice = byteCharacters.slice(offset, offset + sliceSize);
				var byteNumbers = new Array(slice.length);
				for(var i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}
				var byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			}
			var blob = new Blob(byteArrays, { type: contentType });
			return blob;
		};
		return b64toBlob(getData(base64), getContentType(base64));
	};
	Wifisharing.prototype.setSsid = function(val) {
		if(val === undefined || val === null) {
			val = "";
		}
		this.ssid = val;
		var dom = getElementsByClassName(this.el, "wifisharing-ssid-text")[0];
		if(typeof dom.innerText !== "undefined") {
			dom.innerText = val;
		} else {
			// 旧版firefox不支持innerText
			dom.textContent = val;
		}
	};
	Wifisharing.prototype.setPassword = function(val) {
		if(val === undefined || val === null) {
			val = "";
		}
		this.password = val;
		var noPassword = getElementsByClassName(this.el, "wifisharing-no-password-content")[0];
		var passwordContent = getElementsByClassName(this.el, "wifisharing-password-content")[0];
		var passwordText = getElementsByClassName(this.el, "wifisharing-password-text")[0];
		if(val.length === 0) {
			removeClass(noPassword, "hidden");
			addClass(passwordContent, "hidden");
		} else {
			addClass(noPassword, "hidden");
			removeClass(passwordContent, "hidden");
		}
		if(typeof passwordText.innerText !== "undefined") {
			passwordText.innerText = val;
		} else {
			// 旧版firefox不支持innerText
			passwordText.textContent = val;
		}
	};
	Wifisharing.prototype.setSecurity = function(val) {
		this.security = val;
	};
	Wifisharing.prototype.setData = function(data) {
		data.ssid = this.ssid || data.ssid;
		data.password = this.password || data.password;
		data.security = this.security || data.security;
		this.setSsid(data.ssid);
		this.setPassword(data.password);
		this.setSecurity(data.security);
		this.generateQRCode();
	};
	Wifisharing.prototype.enableQrcode = function() {
		var qrcodeContainer = getElementsByClassName(this.el, "wifisharing-qrcode-container")[0];
		removeClass(qrcodeContainer, "disabled");
		this.qrcodeEnable = true;
		this.generateQRCode({
			colorDark: "#000000"
		});
		this.refreshStatus();
	};
	Wifisharing.prototype.disableQrcode = function() {
		var qrcodeContainer = getElementsByClassName(this.el, "wifisharing-qrcode-container")[0];
		addClass(qrcodeContainer, "disabled");
		this.qrcodeEnable = false;
		this.generateQRCode({
			colorDark: "#a7a9ac"
		});
		this.refreshStatus();
	};
	Wifisharing.prototype.enableText = function() {
		var textContainer = getElementsByClassName(this.el, "wifisharing-text-container")[0];
		removeClass(textContainer, "disabled");
		this.textEnable = true;
		this.refreshStatus();
	};
	Wifisharing.prototype.disableText = function() {
		var textContainer = getElementsByClassName(this.el, "wifisharing-text-container")[0];
		addClass(textContainer, "disabled");
		this.textEnable = false;
		this.refreshStatus();
	};
	Wifisharing.prototype.enableSaveBtn = function() {
		var container = getElementsByClassName(this.el, "wifisharing-save-btn-container")[0];
		removeClass(container, "disabled");
	};
	Wifisharing.prototype.disableSaveBtn = function() {
		var container = getElementsByClassName(this.el, "wifisharing-save-btn-container")[0];
		addClass(container, "disabled");
	};
	Wifisharing.prototype.refreshStatus = function() {
		if(this.qrcodeEnable || this.textEnable) {
			this.enableSaveBtn();
		} else {
			this.disableSaveBtn();
		}
	};
	Wifisharing.prototype.generateQRCodeText = function(data) {
		data = data || {};
		data.ssid = data.ssid || '';
		data.password = data.password || '';
		data.security = data.security || '';
		var str = "";
		var securityStr;
		switch(data.security.toLowerCase()) {
			case "wpa":
			case "wpa2":
			case "psk":
				securityStr = "WPA";
				break;
			case "wep":
				securityStr = "WEP";
				break;
			default:
				securityStr = "nopass";
				break;
		}
		str += "WIFI:S:";
		str += data.ssid + ";";
		str += "T:";
		str += securityStr + ";";
		str += "P:";
		str += data.password + ";";
		return str;
	};
	Wifisharing.prototype.generateQRCode = function(options) {
		var utf16to8 = function(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for(i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else if(c > 0x07FF) {
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				} else {
					out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				}
			}
			return out;
		};
		var str = this.generateQRCodeText({
			ssid: this.ssid,
			password: this.password,
			security: this.security
		});
		options = options || {};
		options.width = options.width || 84;
		options.height = options.height || 84;
		options.colorDark = options.colorDark || "#000000";
		options.render = "table";
		options.text = utf16to8(str);

		var qrcodeWrap = getElementsByClassName(this.el, "wifisharing-qrcode-wrap")[0];
		qrcodeWrap.innerHTML = '';
		new QRCode(qrcodeWrap, options);
	};
	Wifisharing.prototype.saveImage = function() {
		// 1. clone dom保持样式
		// 2. 调整样式
		// 3. 生成canvas
		// 4. 删除clone的dom
		// 5. 保存图片文件
		var me = this;
		var fileName = "qrcode.png";
		var dom = getElementsByClassName(this.el, "wifisharing-container")[0];
		var imgContainer;
		if(!this._canvasSupport || !this._blobSupport) {
			return false;
		}
		var cloneDom = function(dom) {
			var ret = dom.cloneNode(true);
			var newCanvas = ret.getElementsByTagName("canvas")[0];
			var oldCanvas = dom.getElementsByTagName("canvas")[0];
			newCanvas.getContext("2d").drawImage(oldCanvas, 0, 0);
			ret.style.position = "fixed";
			ret.style.bottom = 0;
			ret.style.opacity = 0;
			return ret;
		};
		var clone = cloneDom(dom);
		removeClass(clone, "popup");
		var checkboxContainer = getElementsByClassName(clone, "wifisharing-checkbox-container");
		for(var len = checkboxContainer.length, i = len - 1; i >= 0; i--) {
			var item = checkboxContainer[i];
			item.parentNode.removeChild(item);
		}

		var old;
		if(this.qrcodeEnable && this.textEnable) {
			old = getElementsByClassName(dom, "wifisharing-content")[0];
			imgContainer = getElementsByClassName(clone, "wifisharing-content")[0];
		} else if(this.qrcodeEnable && !this.textEnable) {
			old = getElementsByClassName(dom, "wifisharing-qrcode-wrap")[0];
			imgContainer = getElementsByClassName(clone, "wifisharing-qrcode-wrap")[0];
		} else if(!this.qrcodeEnable && this.textEnable) {
			old = getElementsByClassName(dom, "wifisharing-text-wrap")[0];
			imgContainer = getElementsByClassName(clone, "wifisharing-text-wrap")[0];
		} else {
			return false;
		}

		// 添加内容的外边框
		imgContainer.style.width = old.offsetWidth + "px";
		imgContainer.style.height = old.offsetHeight + "px";
		imgContainer.style.backgroundColor = "#ffffff";
		imgContainer.style.border = "1px solid #cbcbcb";
		imgContainer.style.borderRadius = "5px";
		imgContainer.style.margin = "0 auto";
		imgContainer.style.padding = "18px";
		imgContainer.style.boxSizing = "content-box";
		imgContainer.style.textAlign = "left";

		document.documentElement.appendChild(clone);

		// 添加wrap，生成300x300的canvas
		var getWrapCanvas = function(canvas, options) {
			options = options || {};
			var width = options.width || 300;
			var height = options.height || 300;
			var newCanvas = document.createElement("canvas");
			newCanvas.width = width;
			newCanvas.height = height;
			newCanvas.getContext("2d").drawImage(canvas, (newCanvas.width - canvas.width) / 2, (newCanvas.height - canvas.height) / 2);
			return newCanvas;
		};
		var downloadFile = function(blob, fileName) {
			if(navigator.msSaveBlob) {
				navigator.msSaveBlob(blob, fileName);
			} else {
				var link = document.createElement('a');
				var href = window.URL.createObjectURL(blob);
				link.className = "wifisharing-download-link";
				link.href = href;
				link.download = fileName;
				document.documentElement.appendChild(link); // firefox需要添加到dom才能click
				link.click();
				setTimeout(function() {
					// 延时保证下载成功执行
					window.URL.revokeObjectURL(href);
					document.documentElement.removeChild(link);
				}, 100);
			}
		};
		var callback = function(canvas) {
			var base64Text = getWrapCanvas(canvas, { width: 300, height: 300 }).toDataURL("image/png");
			var blob = me.getBlob(base64Text);
			clone.remove();
			downloadFile(blob, fileName);
		};
		html2canvas(imgContainer, {
			letterRendering: true,
			onrendered: callback
		});
	};
	return Wifisharing;
})();
