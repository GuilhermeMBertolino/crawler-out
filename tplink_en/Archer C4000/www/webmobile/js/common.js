/**
 * common
 */
var suCommon = angular.module('suCommon', []);

/*
 * 配置翻译文件信息
 */
suCommon.config(['$translateProvider', function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: './locale/',
		suffix: '.json'
	});

	$translateProvider.preferredLanguage("en_US");
	$translateProvider.fallbackLanguage('en_US');

}]);

/*
 * HTTPProvider
 * 配置数据格式为FormData格式
 */
suCommon.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	var param = function(obj) {
		var query = '';
		var name;
		var value;
		for (name in obj) {
			value = obj[name];
			if (value instanceof Array ){
				for (var i = 0; i < value.length; i++) {
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value[i]) + '&';
				};
			} else if (value instanceof Object) {
				query += encodeURIComponent(name) + '=' + encodeURIComponent(angular.toJson(value)) + '&';
			} else if (value !== undefined && value !== null) {
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
		}
		return query.length ? query.substr(0, query.length - 1) : query;
	};

	$httpProvider.defaults.transformRequest = [
		function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}
	];
}]);

/*
 * 数据代理的全局封装
 */
suCommon.factory('$proxy', ['$rootScope','$http', '$msg', function($rootScope, $http, $msg){

	var defaults = {
		url: null,
		timeout: 15 * 1000,
		type: "POST",
		data: {
			operation: "read"
		},
		showLoading: true
	};

	return {
		request: function(options, data, success, failure, error){
			var method = (options.type || defaults.type).toUpperCase();
			var data = angular.extend({}, defaults.data, data);
			var success = success || function(){};
			var failure = failure || function(){};
			var error = error || function(){};
			var showLoading = options.showLoading;

			if(showLoading !== false){
				$rootScope.pageLoading.show();
				$rootScope.pageLoadingCount++;
			}
			
			$http({
				method: method,
				url: options.url || defaults.url,
				data: method === "POST" ? data : "",
				params: method === "GET" ? data : "",
				timeout: options.timeout || defaults.timeout
			}).success(function(data, status, headers, config){
				if(showLoading !== false){
					if(--$rootScope.pageLoadingCount === 0){
						$rootScope.pageLoading.close();
					}
				}

				if(data.success) {
					success(data.data, data.others, status);
				}else{
					switch (data.errorcode) {
						case "timeout":
							location.href = "/";
							break;
						case "user conflict":
							//$msg.alert(USER_CONFLICT);
							break;
						case "permission denied":
							//$msg.alert(PERMISSION_DENY);
							break;
						default:
							break;
					}
					failure(data.errorcode, data.others, data.data);
				}
			}).error(function(data, status, headers, config) {
				if(showLoading !== false){
					if(--$rootScope.pageLoadingCount === 0){
						$rootScope.pageLoading.close();
					}
				}
				error(status);
			});
		}
	};
}]);

/*
 * 差错提示的全局封装
 */
suCommon.factory('$msg', ['$timeout','$tool', function($timeout, $tool){

	var globalMessage = [];
	var localMessage = [];
	var statusMessage = [];

	var defaults = {
		id: "",
		type: "alert", //alert, loading, success, failure
		iconCls: "",
		title: "",
		content: "",
		okBtn:{
			show: true,
			text: "FORM.OK",
			handler: null
		},
		cancelBtn:{
			show: false,
			text: "FORM.CANCEL",
			handler: null
		},
		timeout: 0, //0 为不自动消失
		autoDestory: true,
		autoClose: true,
		isShow: false
	};

	var statusDefaults = {
		id: "",
		type: "",
		text: "",
		timeout: 0,
		autoDestory: true,
		isShow: false
	}

	function indexOf(obj, arr){
		for (var index = 0, len = arr.length; index < len; index++) {
			if(arr[index].id == obj.id){
				return index;
			}
		};
		return -1;
	}

	function Message(options){
		
		var $msg = this;

		switch(options.type){
			case "waiting":
				angular.extend(this, statusDefaults, options);
				this.id = "sm" + $tool.randomId();
				this.mode = "status";
				break;
			case "success":
			case "failure":
				angular.extend(this, statusDefaults, options);
				this.id = "sm" + $tool.randomId();
				this.timeout = options.timeout?options.timeout: 1000;
				this.mode = "status";
				break;
			default:
				angular.extend(this, defaults, options);
				if(!options.id){
					this.id = "gm" + $tool.randomId();
					this.mode = "global";
				} else {
					this.mode = "local";
					// this.autoDestory = false;
				}

			var okHandler = this.okBtn.handler || function(ev){};
			this.okBtn.handler= function(ev){
				okHandler(ev);
				if($msg.autoClose){
					$msg.close();
				}
			}

			var cancelHandler = this.cancelBtn.handler || function(){};
			this.cancelBtn.handler = function(){
				cancelHandler();
				if($msg.autoClose){
					$msg.close();
				}
			}	
		}
	}

	Message.prototype = {
		constructor: Message,
		show: function(){
			var $msg = this;
			if($msg.isShow === true) return;
			
			if($msg.mode == "global"){
				if( indexOf($msg, globalMessage) == -1){
					globalMessage.push($msg);
				}
			};

			if($msg.mode == "local"){
				if( indexOf($msg, localMessage) == -1){
					localMessage.push($msg);
				}
			};

			if($msg.mode == "status"){
				if( indexOf($msg, statusMessage) == -1){
					statusMessage.push($msg);
				}

				if(arguments.length === 2){
					$msg.type = arguments[0];
					$msg.text = arguments[1];
				}
			};



			$msg.isShow = true;

			if($msg.timeout != 0){
				$timeout(function(){
					$msg.close();
				}, $msg.timeout);
			}
		},

		close: function(){
			var $msg = this;
			$msg.isShow = false;

			if($msg.autoDestory){
				$msg.destory();
			}
		},

		destory: function(){
			var $msg = this;
			if($msg.mode == "global"){
				var index = indexOf($msg, globalMessage);
				if(  index != -1){
					globalMessage.splice(index, 1);
				}
			};

			if($msg.mode == "local"){
				var index = indexOf($msg, localMessage);
				if( index != -1){
					localMessage.splice(index, 1);
				}
			};

			if($msg.mode == "status"){
				var index = indexOf($msg, statusMessage);
				if(  index != -1){
					statusMessage.splice(index, 1);
				}
			}
		}
	};

	return {
		globalMessage: globalMessage,
		localMessage: localMessage,
		statusMessage: statusMessage,
		create: function(options){
			if(options.id && indexOf(options, localMessage) != -1){
				var index = indexOf(options, localMessage);
				localMessage.splice(index, 1);
				// var newMsg = localMessage[indexOf(options, localMessage)];
			} 
			var newMsg = new Message(options);
			if(options.id){
				localMessage.push(newMsg);
			} else {
				if(options.type == "success" || options.type == "failure" || options.type == "waiting"){
					statusMessage.push(newMsg);
				} else {
					globalMessage.push(newMsg);
				}
			}
			

			return newMsg;
		}
	}
}]);

/*
 * 表单数据交互封装
 */
suCommon.factory('$form', ['$timeout', '$window', '$proxy', "$msg","$vtype", "$encrypt", "$format", "$tool", function($timeout, $window, $proxy, $msg, $vtype, $encrypt, $format, $tool) {

	var defaults = {
		proxy: null,
		fields: null,
		success: null,
		failure: null,
		error: null,
		validator: null,

		serials: null,
		autoLoad: true,
		autoInit: true,
		prompt: {
			show: true,
			success: "FORM.SAVED",
			failure: "FORM.FAILED"
		}

	};

	return {
		config: function(scope, options){
			scope.form = {};
			scope.form.proxy = angular.extend({}, defaults.proxy, options.proxy);
			scope.form.fields = angular.extend([], defaults.fields, options.fields);
			scope.form.serials = {};

			scope.form.success = options.success || function(){};
			scope.form.failure = options.failure || function(){};
			scope.form.error = options.error || function(){};
			scope.form.validator = options.validator || function(scope){return true};
			
			scope.form.autoLoad = angular.isDefined(options.autoLoad) ? options.autoLoad : defaults.autoLoad;
			scope.form.autoInit = angular.isDefined(options.autoInit) ? options.autoInit : defaults.autoInit;
			scope.form.prompt = angular.extend({}, defaults.prompt, options.prompt);

			scope.form.disabled = false;

			if (scope.form.autoLoad){
				this.init(scope);
				scope.form.load();
			}else{
				if (scope.form.autoInit){
					this.init(scope);
				};
			};
		},

		init: function(scope){
			var $form = this;
			scope.isForm = true;
			scope.form = scope.form || {};

			scope.form.load = function(data, success, failure, error, showLoading){
				$form.load(scope, data, success, failure, error, showLoading);
			};

			scope.form.submit = function(data, success, failure, error, showPrompt, loadData, showLoading, doValidate){
				$form.submit(scope, data, success, failure, error, showPrompt, loadData, showLoading, doValidate);
			};

			scope.form.loadData = function(data){
				$form.loadData(scope, data);
			};

			scope.form.reset = function(){
				$form.reset(scope);
			};

			scope.form.clear = function(){
				$form.clear(scope);
			};

			scope.form.disable = function(){
				$form.disable(scope);
			};

			scope.form.enable = function(){
				$form.enable(scope);
			};

			scope.form.serialize = function(data){
				$form.serialize(scope, data);
			};

			scope.form.unserialize = function(data){
				$form.unserialize(scope, data);
			};

			scope.form.validate = function(){
				return $form.validate(scope);
			};

			scope.form.setError = function(text){
				var formError = $msg.create({
					content: text
				});

				formError.show();
			};
			
			scope.form.validatePartial = function(fieldArray){
				return $form.validatePartial(scope, fieldArray);
			};

			scope.form.isDirty = function(data){
				return $form.isDirty(scope, data);
			};

			scope.form.back = function(okhandler, cancelhandler, data){
				return $form.back(scope, okhandler, cancelhandler, data);
			};

			scope.form.dirtyShowSave = function(button, data, compare){
				return $form.dirtyShowSave(scope, button, data, compare);
			}

			scope.form.setSnapshot = function(formData){
				return $form.setSnapshot(scope, formData);
			};

			scope.form.errorCount = 0;

			var fields = scope.form.fields;
			var data = {};
			var snapshot = [];

			for (var index = 0, len = fields.length; index < len; index++){
				var name = fields[index].name;
				fields[index].mapping = fields[index].mapping || name;

				data[name] = {};
				data[name].data = "";
				data[name].mapping = fields[index].mapping;

				data[name].disabled = fields[index].disabled || false;
				data[name].readOnly = fields[index].readOnly || false;
				data[name].autoTrim = angular.isDefined(fields[index].autoTrim) ? fields[index].autoTrim : true;
				data[name].valid = angular.isDefined(fields[index].valid) ? fields[index].valid : true;
				data[name].visible = angular.isDefined(fields[index].visible) ? fields[index].visible : true;
				data[name].validated = false;
				data[name].isDetect = angular.isDefined(fields[index].isDetect)?fields[index].isDetect:true;

				data[name].format = fields[index].format || null;
				data[name].vtype = fields[index].vtype || null;
				data[name].validatechange = fields[index].validatechange || null;
				data[name].allowBlank = angular.isDefined(fields[index].allowBlank) ? fields[index].allowBlank : true;
				data[name].maxLength = fields[index].maxLength || -1;
				data[name].minLength = fields[index].minLength || -1;
				data[name].errorMsg = fields[index].errorMsg || {
					content: "",
					visible: false
				};

				data[name].setError = (function(name){
					return function(){
						scope.form.data[name].valid = false;
						if(arguments.length == 1){
							scope.form.data[name].errorMsg = {
								content: arguments[0],
								visible: true
							}
						}


						$timeout(function(){
							var error = document.getElementById("error-msg");
							if(error){
								var yPos = error.offsetTop - document.body.scrollTop;

								if(yPos < 250 || yPos > $window.screen.height){
									$window.scrollTo(0, (yPos-250));
								}
							}
						}, 10, false);
					};
				})(name);

				data[name].setNormal = (function(name){
					return function(){
						scope.form.data[name].valid = true;
						scope.form.data[name].errorMsg = {
							content: "",
							visible: false
						};
						
						// if(--scope.form.errorCount === 0){
						// 	scope.form.submitBtn.disabled = false;
						// }
					}
				})(name);

				snapshot[name] = "";

			};

			scope.form.data = angular.extend(data, scope.form.data);
			scope.form.snapshot = snapshot;
			scope.form.passSnapshot = [];
		},

		formatData: function(fields, data){
			for (var index = 0, len = fields.length; index < len; index++){
				var name = fields[index].name;
				fields[index].mapping = fields[index].mapping || name;

				data[name] = angular.isDefined(data[name]) ? data[name]: {};
				data[name].data = angular.isDefined(data[name].data) ? data[name].data : "";
				data[name].mapping = fields[index].mapping;

				data[name].disabled = fields[index].disabled || false;
				data[name].readOnly = fields[index].readOnly || false;
				data[name].autoTrim = angular.isDefined(fields[index].autoTrim) ? fields[index].autoTrim : true;
				data[name].valid = angular.isDefined(fields[index].valid) ? fields[index].valid : true;
				data[name].visible = angular.isDefined(fields[index].visible) ? fields[index].visible : true;
				data[name].validated = false;
				data[name].isDetect = angular.isDefined(fields[index].isDetect) ? fields[index].isDetect : true;

				data[name].format = fields[index].format || null;
				data[name].vtype = fields[index].vtype || null;
				data[name].validatechange = fields[index].validatechange || null;
				data[name].allowBlank = angular.isDefined(fields[index].allowBlank) ? fields[index].allowBlank : true;
				data[name].maxLength = fields[index].maxLength || -1;
				data[name].minLength = fields[index].minLength || -1;
				data[name].errorMsg = fields[index].errorMsg || {
					content: "",
					visible: false
				};

				data[name].setError = (function(name){
					return function(){

						this.valid = false;
						if(arguments.length == 1){
							this.errorMsg = {
								content: arguments[0],
								visible: true
							}
						}
					};
				})(name);

				data[name].setNormal = (function(name){
					return function(){
						this.valid = true;
						this.errorMsg = {
							content: "",
							visible: false
						}
					}
					
				})(name);
			};
		},

		load: function(scope, data, success, failure, error, showLoading){
			
			if (scope.isForm){
				var data = angular.extend({
					"operation": "read"
				}, data);

				var success = success || function(){};
				var failure = failure || function(){};
				var error = error || function(){};

				angular.extend(scope.form.proxy, {
					showLoading: angular.isDefined(showLoading) ? showLoading : true
				});
				
				$proxy.request(scope.form.proxy, data, function(data, others){
					scope.form.loadData(data);
					
					success(data, others);
				}, function(errorcode, others, data){
					failure(errorcode, others, data);
				}, function(status){
					error(status);
				});
			};
		},

		submit: function(scope, data, success, failure, error, showPrompt, loadData, showLoading, doValidate){

			var doValidate = angular.isDefined(doValidate)?doValidate:true;

			if(scope.form.disabled){
				return;
			}

			if(doValidate !== false){
				if(!scope.form.validate()){
					return false;
				}
			}

			if (scope.isForm){
				var formData = {};
				var fields = scope.form.fields;
				var serials = scope.form.serials;
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					var mapping = fields[index].mapping || name;

					if(!serials[name] && !scope.form.data[name].disabled){
						// if(!scope.form.data[name].valid){
						// 	//scope.form.submitBtn.disabled = false;
						// 	return;
						// }
						if(angular.isObject(scope.form.data[name].encryption)){
							var encrypt = scope.form.data[name].encryption.method;
							var encryptParam = scope.form.data[name].encryption.params;
							/*var key = {}
							if(scope.form.data[name].encryption.name=="rsa"){
								key = {
									"n": scope.form.data[name].data[0],
									"e": scope.form.data[name].data[1]
								};
							}else if(scope.form.data[name].encryption.name=="md5"){
								key = {
									//md5 key
								};
							}*/

							var check = true;
							var param = [];
							for (var j = 0; j < encryptParam.length; j++) {
								var _name = encryptParam[j];
								if (scope.form.data[name].key[_name] == null || scope.form.data[name].key[_name] == undefined) {
									check = false;
									break;
								}else{
									param[j] = scope.form.data[name].key[_name];
								};
							};
							if (check&&scope.form.data[name].inputData!=undefined) {
								scope.form.data[name].data = encrypt(scope.form.data[name].inputData, param);
							}else{
								scope.form.data[name].data = scope.form.data[name].inputData;
							}
							//scope.form.data[name].inputData = "";
							//scope.form.data[name].setNormal();

						}else if(scope.form.data[name].encryption === null){
							scope.form.data[name].data = scope.form.data[name].inputData;
							//scope.form.data[name].inputData = "";
							//scope.form.data[name].setNormal();

						}
						
						// if(scope.form.data[name].format !== null){
						// 	formData[mapping] = scope.form.data[name].data.toLowerCase() || "";
						// } else {
						// 	formData[mapping] = scope.form.data[name].data || "";
						// }
						
						formData[mapping] = scope.form.data[name].data || "";
						
					}
				}
				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						var mapping = fields[index].mapping || name;

						if(!serials[name] && !scope.form.childScope.form.data[name].disabled){
							// if(!scope.form.childScope.form.data[name].valid){
							// 	//scope.form.submitBtn.disabled = false;
							// 	return;
							// }

							if(angular.isObject(scope.form.childScope.form.data[name].encryption)){
								var encrypt = scope.form.childScope.form.data[name].encryption.method;
								var encryptParam = scope.form.childScope.form.data[name].encryption.params;
								/*var key = {}
								if(scope.form.childScope.form.data[name].encryption.name=="rsa"){
									key = {
										"n": scope.form.childScope.form.data[name].data[0],
										"e": scope.form.childScope.form.data[name].data[1]
									};
								}else if(scope.form.childScope.form.data[name].encryption.name=="md5"){
									key = {
										//md5 key
									};
								}*/

								var check = true;
								var param = [];
								for (var j = 0; j < encryptParam.length; j++) {
									var _name = encryptParam[j];
									if (scope.form.childScope.form.data[name].key[_name] == null || scope.form.childScope.form.data[name].key[_name] == undefined) {
										check = false;
										break;
									}else{
										param[j] = scope.form.childScope.form.data[name].key[_name];
									};
								};
								if (check&&scope.form.childScope.form.data[name].inputData!=undefined) {
									scope.form.childScope.form.data[name].data = encrypt(scope.form.childScope.form.data[name].inputData, param);
								}else{
									scope.form.childScope.form.data[name].data = scope.form.childScope.form.data[name].inputData;
								}
								scope.form.childScope.form.data[name].inputData = "";
								scope.form.childScope.form.data[name].setNormal();


							}else if(scope.form.childScope.form.data[name].encryption === null){
								scope.form.childScope.form.data[name].data = scope.form.childScope.form.data[name].inputData;
								scope.form.childScope.form.data[name].inputData = "";
								scope.form.childScope.form.data[name].setNormal();

							}


							// if(scope.form.childScope.form.data[name].format !== null){
							// 	formData[mapping] = scope.form.childScope.form.data[name].data.toLowerCase() || "";
							// } else {
							// 	formData[mapping] = scope.form.childScope.form.data[name].data || "";
							// }
							
							formData[mapping] = scope.form.childScope.form.data[name].data || "";
						}
					}
				}

				scope.form.serials = {};

				if(scope.isGrid){
					formData = {
						"old": scope.form.old || "add",
						"new": formData
					}
				}

				var data = angular.extend({
					"operation": "write"
				}, formData, data);

				var success = success || function(){};
				var failure = failure || function(){};
				var error = error || function(){};

				if(scope.form.prompt.show && showPrompt != false){
					var successPrompt = $msg.create({
						type: "success",
						text: scope.form.prompt.success
					});

					var failurePrompt = $msg.create({
						type: "failure",
						text: scope.form.prompt.failure
					});
				}

				if(scope.form.submitBtn == undefined){
					scope.form.submitBtn = {};
				}
				scope.form.submitBtn.disabled = true;

				angular.extend(scope.form.proxy, {
					showLoading: angular.isDefined(showLoading) ? showLoading : true
				});

				$proxy.request(scope.form.proxy, data, function(data, others){
					if(loadData !== false){
						scope.form.loadData(data);
					}
					
					success(data, others);
					if(scope.form.prompt.show && showPrompt != false){
					 	successPrompt.show();
					}
					scope.form.submitBtn.disabled = false;
				}, function(errorcode, others, data){
					failure(errorcode, others, data);
					if(scope.form.prompt.show && showPrompt != false){
						failurePrompt.show();
					}
					scope.form.submitBtn.disabled = false;
				}, function(status){
					error(status);
					if(scope.form.prompt.show && showPrompt != false){
						failurePrompt.show();
					}
					scope.form.submitBtn.disabled = false;
				});
			};
		},

		loadData: function(scope, data){
			if (scope.isForm){
				var fields = scope.form.fields;
				var snapshot = {};
				var childSnapshot = {};
				var passSnapshot = [];
				var childPassSnapshot = [];

				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					var mapping = fields[index].mapping || name;
					//var format = scope.form.data[name].format;

					// if( format!== null){
					// 	scope.form.data[name].data = $format[format](data[mapping]) || "";
					// } else {
					// 	scope.form.data[name].data = data[mapping] || "";
					// }
					scope.form.data[name].data = data[mapping] || "";
					snapshot[name] = data[mapping] || "";

					if(scope.form.data[name].encryption){
						passSnapshot[name] = scope.form.data[name].inputData;
					}

					scope.form.data[name].setNormal();
				};

				scope.form.snapshot = snapshot;
				scope.form.passSnapshot = passSnapshot;

				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						var mapping = fields[index].mapping || name;
						//var format = scope.form.childScope.form.data[name].format;

						// if(format !== null){
						// 	scope.form.childScope.form.data[name].data = $format[format](data[mapping]) || "";
						// } else {
						// 	scope.form.childScope.form.data[name].data = data[mapping] || "";
						// }
						scope.form.childScope.form.data[name].data = data[mapping] || "";
						childSnapshot[name] = data[mapping] || "";

						if(scope.form.childScope.form.data[name].encryption){
							childPassSnapshot[name] = scope.form.childScope.form.data[name].inputData;
						}

						scope.form.childScope.form.data[name].setNormal();
					}

					scope.form.childScope.form.snapshot = childSnapshot;
					scope.form.childScope.form.passSnapshot = childPassSnapshot;
				}
			};
		},

		reset: function(scope){
			if (scope.isForm){
				var fields = scope.form.fields;
				var snapshot = scope.form.snapshot;
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					var mapping = fields[index].mapping || name;

					scope.form.data[name].data = snapshot[name];
				};

				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					var childSnapshot = scope.form.childScope.form.snapshot;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						var mapping = fields[index].mapping || name;

						scope.form.childScope.form.data[name].data = childSnapshot[name];
					}
				}
			}
		},

		clear: function(scope){
			if (scope.isForm){
				var fields = scope.form.fields;
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					var mapping = fields[index].mapping || name;

					scope.form.data[name].data = "";
					scope.form.data[name].valid =  true;

					scope.form.data[name].errorMsg = {
						content: "",
						visible: false
					};
				}

				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						var mapping = fields[index].mapping || name;

						scope.form.childScope.form.data[name].data = "";
						scope.form.childScope.form.data[name].valid =  true;

						scope.form.childScope.form.data[name].errorMsg = {
							content: "",
							visible: false
						};
					}
				}

				if(scope.form.old){
					scope.form.old = undefined;
				}
			}
		}, 

		disable: function(scope){
			if (scope.isForm){

				var fields = scope.form.fields;
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					scope.form.data[name].disabled = true;
				};

				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						scope.form.childScope.form.data[name].disabled = true;
					}
				}

				scope.form.disabled = true;
			}
		},

		enable: function(scope){
			if (scope.isForm){
				var fields = scope.form.fields;
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					scope.form.data[name].disabled = false;
				};

				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						scope.form.childScope.form.data[name].disabled = false;
					}
				}

				scope.form.disabled = false;
			}
		},

		serialize: function(scope, data){
			for(var index = 0, len = data.length; index < len; index++){
				scope.form.serials[data[index]] = 1;
			}
			
		},

		unserialize: function(scope, data){
			for(var index = 0, len = data.length; index < len; index++){
				// scope.form.serials[data[index]] = 0;
				if(scope.form.serials[data[index]]){
					delete scope.form.serials[data[index]];
				}
			}
		},

		validate: function(scope){
			if (scope.isForm){

				var fields = scope.form.fields;
				var serials = scope.form.serials;
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					var mapping = fields[index].mapping || name;

					if(!serials[name] && !scope.form.data[name].disabled){
						var value = scope.form.data[name].data;
						if(scope.form.data[name].encryption !== undefined){
							value = scope.form.data[name].inputData || "";
						}

						if(!scope.form.data[name].allowBlank){
							if(value === ""){
								scope.form.data[name].setError("ERROR.e000104");
								return false;
							}
						} else {
							if(value === ""){
								continue;
							}
						}
						
						if(scope.form.data[name].minLength != -1){
							if(angular.isString(value) && value.length < scope.form.data[name].minLength){
								scope.form.data[name].setError(scope.form.data[name].errorMsg.content || "ERROR.e000001");
								return false;
							}
						}

						if(scope.form.data[name].maxLength != -1){
							if(angular.isString(value) && value.length > scope.form.data[name].maxLength){
								scope.form.data[name].setError(scope.form.data[name].errorMsg.content || "ERROR.e000001")
								return false;
							}
						}

						var vtype = scope.form.data[name].vtype;
						if( vtype!= null){
							if(angular.isString(vtype)){
								var result = $vtype[vtype](value);
								if(result != true){
									scope.form.data[name].setError(result);
									return false;
								}
							} else {
								var vtype = scope.form.data[name].vtype.vtype;
								var config = scope.form.data[name].vtype.config;
								var result = $vtype[vtype](value, config);
								if(result != true){
									scope.form.data[name].setError(result);
									return false;
								}
							}
							
						}

						var validatechange = scope.form.data[name].validatechange;
						if(validatechange!=null){
							var valid = validatechange();
							if(!valid){
								return false;
							}
						}
					}
				}

				// 判断是否有子form
				if(angular.isDefined(scope.form.childScope)){
					var fields = scope.form.childScope.form.fields;
					var childScope = scope.form.childScope;
					for (var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						var mapping = fields[index].mapping || name;

						if(!serials[name] && !childScope.form.data[name].disabled){
							
							var value = childScope.form.data[name].data;

							if(childScope.form.data[name].encryption !== undefined){
								value = childScope.form.data[name].inputData || "";
							}

							if(!childScope.form.data[name].allowBlank){
								if(value === ""){
									childScope.form.data[name].setError("ERROR.e000104");
									return false;
								}
							} else {
								if(value == ""){
									continue;
								}
							}
							
							if(childScope.form.data[name].minLength != -1){
								if(angular.isString(value) && value.length < childScope.form.data[name].minLength){
									childScope.form.data[name].setError(childScope.form.data[name].errorMsg.content || "ERROR.e000001");
									return false;
								}
							}

							if(childScope.form.data[name].maxLength != -1){
								if(angular.isString(value) && value.length > childScope.form.data[name].maxLength){
									childScope.form.data[name].setError(childScope.form.data[name].errorMsg.content || "ERROR.e000001")
									return false;
								}
							}

							var vtype = childScope.form.data[name].vtype;
							
							if( vtype!= null){
								if(angular.isString(vtype)){
									var result = $vtype[vtype](value);
									if(result != true){
										childScope.form.data[name].setError(result);
										return false;
									}
								} else {
									var vtype = childScope.form.data[name].vtype.vtype;
									var config = childScope.form.data[name].vtype.config;
									var result = $vtype[vtype](value, config);
									if(result != true){
										childScope.form.data[name].setError(result);
										return false;
									}
								}
								
							}
						}
					}
				}
			}
			if(!scope.form.validator(scope)){
				return false;
			};

			if(scope.form.childScope && !scope.form.childScope.form.validator(scope.form.childScope)){
				return false;
			}

			return true;
		},
		
		validatePartial: function(scope, fieldArray){

			for (var index = 0, len = fieldArray.length; index < len; index++){
				var name = fieldArray[index];

				if((!scope.form.data[name].disabled)){
					var value = scope.form.data[name].data;
					if(scope.form.data[name].encryption !== undefined){
						value = scope.form.data[name].inputData || "";
					}

					if(!scope.form.data[name].allowBlank){
						if(value === ""){
							scope.form.data[name].setError("ERROR.e000104");
							return false;
						}
					} else {
						if(value === ""){
							continue;
						}
					}
					
					if(scope.form.data[name].minLength != -1){
						if(angular.isString(value) && value.length < scope.form.data[name].minLength){
							scope.form.data[name].setError(scope.form.data[name].errorMsg.content || "ERROR.e000001");
							return false;
						}
					}

					if(scope.form.data[name].maxLength != -1){
						if(angular.isString(value) && value.length > scope.form.data[name].maxLength){
							scope.form.data[name].setError(scope.form.data[name].errorMsg.content || "ERROR.e000001")
							return false;
						}
					}

					var vtype = scope.form.data[name].vtype;
					if( vtype!= null){
						if(angular.isString(vtype)){
							var result = $vtype[vtype](value);
							if(result != true){
								scope.form.data[name].setError(result);
								return false;
							}
						} else {
							var vtype = scope.form.data[name].vtype.vtype;
							var config = scope.form.data[name].vtype.config;
							var result = $vtype[vtype](value, config);
							if(result != true){
								scope.form.data[name].setError(result);
								return false;
							}
						}
						
					}
					
				}
			}
			return true;
		},

		isDirty: function(scope, data){
			if(scope.isForm){
				var snapshot = scope.form.snapshot;
				var childSnapshot;

				//比较数据
				for(var index in snapshot){
					if(scope.form.data[index].isDetect){
						if(snapshot[index] !== scope.form.data[index].data)
							return true;
						else if(scope.form.data[index].encryption){
							if(scope.form.passSnapshot[index]){
								if(scope.form.data[index].inputData !== scope.form.passSnapshot[index])
									return true;
							}
							else{
								if(scope.form.data[index].inputData !== undefined && scope.form.data[index].inputData != "")
									return true;
							}
						}
					}
				}

				if(angular.isDefined(scope.form.childScope)){
					childSnapshot = scope.form.childScope.form.snapshot;
					//比较子域的数据
					for(var index in childSnapshot){
						if(scope.form.childScope.form.data[index].isDetect){
							if(childSnapshot[index] !== scope.form.childScope.form.data[index].data)
								return true;
							else if(scope.form.childScope.form.data[index].encryption){
								if(scope.form.childScope.form.passSnapshot[index]){
									if(scope.form.childScope.form.data[index].inputData !== scope.form.childScope.form.passSnapshot[index])
										return true;
								}
								else{
									if(scope.form.childScope.form.data[index].inputData !== undefined && scope.form.childScope.form.data[index].inputData != "")
										return true;
								}
							}
						}
					}
				}
				// 比较附加数据
				for(var i in data){
					if(data[i]["old"] !== data[i]["new"]){
						return true;
					}
				}

				return false;
			}
			//return false;
		},

		back: function(scope, okhandler, cancelhandler, data){

			var okhandler = okhandler || function(){};
			var cancelhandler = cancelhandler || function(){};
			var data = data || [];
			var data_isDirty = false;

			var backConfirmMsg = $msg.create({
				content: "FORM.BACKCONFIRMNOTE",
				iconCls: "alert",
				okBtn: {
					show: true,
					text: "FORM.LEAVE",
					handler: function(){
						okhandler();
					}
				},
				cancelBtn: {
					show: true,
					text: "FORM.CANCEL",
					handler: function(){
						cancelhandler();
					}
				}
			});
			for(var index = 0; index < data.length; index++){
				if(data[index]["old"] !== data[index]["new"]){
					data_isDirty = true;
				}
			}

			if(data_isDirty || scope.form.isDirty())
				backConfirmMsg.show();
			else{
				okhandler();
			}
		},
		dirtyShowSave: function(scope, button, data, compare){
			var data_isDirty = false;
			scope.$watch(function(){
				/*var data_isDirty = false;
				for(var index in data){
					if(data[index]["old"] !== data[index]["new"]){
						data_isDirty = true;
					}
				}
				data_isDirty = data_isDirty || scope.form.isDirty();
				return data_isDirty;*/
				if(compare && (compare() === false)){
					data_isDirty = true;
				}else{
					data_isDirty = scope.form.isDirty(data);
				}
				return data_isDirty;
			}, function(){
				if(button){
					button.visible = data_isDirty;
				}
			});
		},
		setSnapshot: function(scope, formData){
			var snapshot = scope.form.snapshot;
			for(var name in scope.form.snapshot){
				snapshot[name] = formData[name].data;
			}
			for(var name in scope.form.passSnapshot){
				scope.form.passSnapshot[name] = formData[name].inputData;
			}
		}
	}
}]);

 /*
 * format函数
 */
suCommon.factory('$format', ["$rootScope", function($rootScope){
	return {
		upperCaseFirst: function(data){
			if(angular.isString(data) && data !== ""){
				return data.replace(/(\w)/, function(str){
					return str.toUpperCase();
				})
			}
		},

		upperCase: function(data){
			return data.toString().toUpperCase();
		}
	}
}]);

 /*
 * Encrypt
 */
suCommon.factory('$encrypt', ['$rootScope', function($rootScope){

	var _rsa = function (val, param){	//n, e, 
		// Copyright (c) 2005  Tom Wu
		// All Rights Reserved.
		// See "LICENSE" for details.

		// Basic JavaScript BN library - subset useful for RSA encryption.

		// Bits per digit
		var dbits;

		// JavaScript engine analysis
		var canary = 0xdeadbeefcafe;
		var j_lm = ((canary&0xffffff)==0xefcafe);

		// (public) Constructor
		function BigInteger(a,b,c) {
			if(a != null){
				if("number" == typeof a){
					this.fromNumber(a, b, c);
				}else if(b == null && "string" != typeof a){
					this.fromString(a, 256);
				}else{
					this.fromString(a, b);
				}
			}
		}

		// return new, unset BigInteger
		function nbi() {
			return new BigInteger(null);
		}

		// am: Compute w_j += (x*this_i), propagate carries,
		// c is initial carry, returns final carry.
		// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
		// We need to select the fastest one that works in this environment.

		// am1: use a single mult and divide to get the high bits,
		// max digit bits should be 26 because
		// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
		function am1(i,x,w,j,c,n) {
			while(--n >= 0) {
				var v = x*this[i++]+w[j]+c;
				c = Math.floor(v/0x4000000);
				w[j++] = v&0x3ffffff;
			}
			return c;
		}
		// am2 avoids a big mult-and-extract completely.
		// Max digit bits should be <= 30 because we do bitwise ops
		// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
		function am2(i,x,w,j,c,n) {
			var xl = x&0x7fff, xh = x>>15;
			while(--n >= 0) {
				var l = this[i]&0x7fff;
				var h = this[i++]>>15;
				var m = xh*l+h*xl;
				l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
				c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
				w[j++] = l&0x3fffffff;
			}
			return c;
		}
		// Alternately, set max digit bits to 28 since some
		// browsers slow down when dealing with 32-bit numbers.
		function am3(i,x,w,j,c,n) {
			var xl = x&0x3fff, xh = x>>14;
			while(--n >= 0) {
				var l = this[i]&0x3fff;
				var h = this[i++]>>14;
				var m = xh*l+h*xl;
				l = xl*l+((m&0x3fff)<<14)+w[j]+c;
				c = (l>>28)+(m>>14)+xh*h;
				w[j++] = l&0xfffffff;
			}
			return c;
		}
		
		if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
			BigInteger.prototype.am = am2;
			dbits = 30;
		}else if(j_lm && (navigator.appName != "Netscape")) {
			BigInteger.prototype.am = am1;
			dbits = 26;
		}else { // Mozilla/Netscape seems to prefer am3
			BigInteger.prototype.am = am3;
			dbits = 28;
		}

		BigInteger.prototype.DB = dbits;
		BigInteger.prototype.DM = ((1<<dbits)-1);
		BigInteger.prototype.DV = (1<<dbits);

		var BI_FP = 52;
		BigInteger.prototype.FV = Math.pow(2,BI_FP);
		BigInteger.prototype.F1 = BI_FP-dbits;
		BigInteger.prototype.F2 = 2*dbits-BI_FP;

		// Digit conversions
		var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
		var BI_RC = new Array();
		var rr,vv;
		rr = "0".charCodeAt(0);
		for(vv = 0; vv <= 9; ++vv){
			BI_RC[rr++] = vv;
		}
		rr = "a".charCodeAt(0);
		for(vv = 10; vv < 36; ++vv){
			BI_RC[rr++] = vv;
		}
		rr = "A".charCodeAt(0);
		for(vv = 10; vv < 36; ++vv){
			BI_RC[rr++] = vv;
		}

		function int2char(n) {
			return BI_RM.charAt(n);
		}
		function intAt(s,i) {
			var c = BI_RC[s.charCodeAt(i)];
			return (c==null)?-1:c;
		}

		// (protected) copy this to r
		function bnpCopyTo(r) {
			for(var i = this.t-1; i >= 0; --i){
				r[i] = this[i];
			};
			r.t = this.t;
			r.s = this.s;
		}

		// (protected) set from integer value x, -DV <= x < DV
		function bnpFromInt(x) {
			this.t = 1;
			this.s = (x<0)?-1:0;
			if(x > 0){
				this[0] = x;
			}else if(x < -1){
				this[0] = x+this.DV;
			}else{
				this.t = 0;
			}
		}

		// return bigint initialized to value
		function nbv(i) {
			var r = nbi();
			r.fromInt(i);
			return r;
		}

		// (protected) set from string and radix
		function bnpFromString(s,b) {
			var k;
			if(b == 16){
				k = 4;
			}else if(b == 8){
				k = 3;
			}else if(b == 256){
				k = 8; // byte array
			}else if(b == 2){
				k = 1;
			}else if(b == 32){
				k = 5;
			}else if(b == 4){
				k = 2;
			}else{
				this.fromRadix(s,b);
				return; 
			};
			
			this.t = 0;
			this.s = 0;
			
			var i = s.length, mi = false, sh = 0;
			while(--i >= 0) {
				var x = (k==8)?s[i]&0xff:intAt(s,i);
				if(x < 0) {
					if(s.charAt(i) == "-") {mi = true;}
					continue;
				};
				mi = false;
				if(sh == 0){
					this[this.t++] = x;
				}else if(sh+k > this.DB) {
					this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
					this[this.t++] = (x>>(this.DB-sh));
				}
				else
				this[this.t-1] |= x<<sh;
				sh += k;
				if(sh >= this.DB) sh -= this.DB;
			};
			if(k == 8 && (s[0]&0x80) != 0) {
				this.s = -1;
				if(sh > 0){
					this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
				}
			};
			this.clamp();
			
			if(mi){
				BigInteger.ZERO.subTo(this,this)
			};
		}

		// (protected) clamp off excess high words
		function bnpClamp() {
			var c = this.s&this.DM;
			while(this.t > 0 && this[this.t-1] == c){
				--this.t;
			}
		}

		// (public) return string representation in given radix
		function bnToString(b) {

			if(this.s < 0){ return "-"+this.negate().toString(b);}
			var k;
			if(b == 16){k = 4;}
			else if(b == 8){ k = 3;}
			else if(b == 2){ k = 1;}
			else if(b == 32){ k = 5;}
			else if(b == 4){ k = 2;}
			else{ return this.toRadix(b);}
			
			var km = (1<<k)-1, d, m = false, r = "", i = this.t;
			var p = this.DB-(i*this.DB)%k;
			if(i-- > 0) {
				if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
				while(i >= 0) {
					if(p < k) {
						d = (this[i]&((1<<p)-1))<<(k-p);
						d |= this[--i]>>(p+=this.DB-k);
					}else {
						d = (this[i]>>(p-=k))&km;
						if(p <= 0) { p += this.DB; --i; }
					}
					if(d > 0){ m = true;}
					if(m){ r += int2char(d);}
				}
			}
			return m?r:"0";
		}

		// (public) -this
		function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

		// (public) |this|
		function bnAbs() { return (this.s<0)?this.negate():this; }

		// (public) return + if this > a, - if this < a, 0 if equal
		function bnCompareTo(a) {
			var r = this.s-a.s;
			if(r != 0){ return r;}
			var i = this.t;
			r = i-a.t;
			if(r != 0){ return (this.s<0)?-r:r;}
			while(--i >= 0){ if((r=this[i]-a[i]) != 0) return r;}
			return 0;
		}

		// returns bit length of the integer x
		function nbits(x) {
			var r = 1, t;
			if((t=x>>>16) != 0) { x = t; r += 16; }
			if((t=x>>8) != 0) { x = t; r += 8; }
			if((t=x>>4) != 0) { x = t; r += 4; }
			if((t=x>>2) != 0) { x = t; r += 2; }
			if((t=x>>1) != 0) { x = t; r += 1; }
			return r;
		}

		// (public) return the number of bits in "this"
		function bnBitLength() {
			if(this.t <= 0) return 0;
			return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
		}

		// (protected) r = this << n*DB
		function bnpDLShiftTo(n,r) {
			var i;
			for(i = this.t-1; i >= 0; --i){ r[i+n] = this[i];}
			for(i = n-1; i >= 0; --i){ r[i] = 0;}
			r.t = this.t+n;
			r.s = this.s;
		}

		// (protected) r = this >> n*DB
		function bnpDRShiftTo(n,r) {
			for(var i = n; i < this.t; ++i){ r[i-n] = this[i];}
			r.t = Math.max(this.t-n,0);
			r.s = this.s;
		}

		// (protected) r = this << n
		function bnpLShiftTo(n,r) {
			var bs = n%this.DB;
			var cbs = this.DB-bs;
			var bm = (1<<cbs)-1;
			var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
			for(i = this.t-1; i >= 0; --i) {
				r[i+ds+1] = (this[i]>>cbs)|c;
				c = (this[i]&bm)<<bs;
			}
			for(i = ds-1; i >= 0; --i){ r[i] = 0;}
			r[ds] = c;
			r.t = this.t+ds+1;
			r.s = this.s;
			r.clamp();
		}

		// (protected) r = this >> n
		function bnpRShiftTo(n,r) {
			r.s = this.s;
			var ds = Math.floor(n/this.DB);
			if(ds >= this.t) { r.t = 0; return; }
			var bs = n%this.DB;
			var cbs = this.DB-bs;
			var bm = (1<<bs)-1;
			r[0] = this[ds]>>bs;
			for(var i = ds+1; i < this.t; ++i) {
				r[i-ds-1] |= (this[i]&bm)<<cbs;
				r[i-ds] = this[i]>>bs;
			}
			if(bs > 0){ r[this.t-ds-1] |= (this.s&bm)<<cbs;}
			r.t = this.t-ds;
			r.clamp();
		}

		// (protected) r = this - a
		function bnpSubTo(a,r) {
			var i = 0, c = 0, m = Math.min(a.t,this.t);
			while(i < m) {
			c += this[i]-a[i];
			r[i++] = c&this.DM;
			c >>= this.DB;
			}
			if(a.t < this.t) {
			c -= a.s;
			while(i < this.t) {
			c += this[i];
			r[i++] = c&this.DM;
			c >>= this.DB;
			}
			c += this.s;
			}
			else {
			c += this.s;
			while(i < a.t) {
			c -= a[i];
			r[i++] = c&this.DM;
			c >>= this.DB;
			}
			c -= a.s;
			}
			r.s = (c<0)?-1:0;
			if(c < -1) r[i++] = this.DV+c;
			else if(c > 0) r[i++] = c;
			r.t = i;
			r.clamp();
		}

		// (protected) r = this * a, r != this,a (HAC 14.12)
		// "this" should be the larger one if appropriate.
		function bnpMultiplyTo(a,r) {
			var x = this.abs(), y = a.abs();
			var i = x.t;
			r.t = i+y.t;
			while(--i >= 0) r[i] = 0;
			for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
			r.s = 0;
			r.clamp();
			if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
		}

		// (protected) r = this^2, r != this (HAC 14.16)
		function bnpSquareTo(r) {
			var x = this.abs();
			var i = r.t = 2*x.t;
			while(--i >= 0) {
				r[i] = 0;
			}
			for(i = 0; i < x.t-1; ++i) {
				var c = x.am(i,x[i],r,2*i,0,1);
				if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
					r[i+x.t] -= x.DV;
					r[i+x.t+1] = 1;
				}
			}
			if(r.t > 0) {
				r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
			}
			r.s = 0;
			r.clamp();
		}

		// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
		// r != q, this != m.  q or r may be null.
		function bnpDivRemTo(m,q,r) {
			var pm = m.abs();
			if(pm.t <= 0) {return;}
			var pt = this.abs();
			if(pt.t < pm.t) {
				if(q != null) {q.fromInt(0);}
				if(r != null) {this.copyTo(r);}
				return;
			}
			if(r == null) {r = nbi();}
			var y = nbi(), ts = this.s, ms = m.s;
			var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
			
			if(nsh > 0) {
				pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r);
			}else {
				pm.copyTo(y); pt.copyTo(r);
			}
			
			var ys = y.t;
			var y0 = y[ys-1];
			if(y0 == 0) {return;}
			var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
			var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
			var i = r.t, j = i-ys, t = (q==null)?nbi():q;
			y.dlShiftTo(j,t);
			
			if(r.compareTo(t) >= 0) {
				r[r.t++] = 1;
				r.subTo(t,r);
			}
			BigInteger.ONE.dlShiftTo(ys,t);
			t.subTo(y,y);	// "negative" y so we can replace sub with am later
			while(y.t < ys) {y[y.t++] = 0;}
			while(--j >= 0) {
				// Estimate quotient digit
				var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
				if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
					y.dlShiftTo(j,t);
					r.subTo(t,r);
					while(r[i] < --qd) {
						r.subTo(t,r);
					}
				}
			}
			if(q != null) {
				r.drShiftTo(ys,q);
				if(ts != ms) {BigInteger.ZERO.subTo(q,q);}
			}
			r.t = ys;
			r.clamp();
			if(nsh > 0) {
				r.rShiftTo(nsh,r);
			}	// Denormalize remainder
			if(ts < 0) {
				BigInteger.ZERO.subTo(r,r);
			}
		}

		// (public) this mod a
		function bnMod(a) {
			var r = nbi();
			this.abs().divRemTo(a,null,r);
			if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {a.subTo(r,r);}
			return r;
		}

		// Modular reduction using "classic" algorithm
		function Classic(m) { this.m = m; }
		function cConvert(x) {
			if(x.s < 0 || x.compareTo(this.m) >= 0) {return x.mod(this.m);}
			else {return x;}
		}
		function cRevert(x) { return x; }
		function cReduce(x) { x.divRemTo(this.m,null,x); }
		function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
		function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

		Classic.prototype.convert = cConvert;
		Classic.prototype.revert = cRevert;
		Classic.prototype.reduce = cReduce;
		Classic.prototype.mulTo = cMulTo;
		Classic.prototype.sqrTo = cSqrTo;

		// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
		// justification:
		//         xy == 1 (mod m)
		//         xy =  1+km
		//   xy(2-xy) = (1+km)(1-km)
		// x[y(2-xy)] = 1-k^2m^2
		// x[y(2-xy)] == 1 (mod m^2)
		// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
		// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
		// JS multiply "overflows" differently from C/C++, so care is needed here.
		function bnpInvDigit() {
			if(this.t < 1) {return 0;}
			var x = this[0];
			if((x&1) == 0) {return 0;}
			var y = x&3;		// y == 1/x mod 2^2
			y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
			y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
			y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
			// last step - calculate inverse mod DV directly;
			// assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
			y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
			// we really want the negative inverse, and -DV < y < DV
			return (y>0)?this.DV-y:-y;
		}

		// Montgomery reduction
		function Montgomery(m) {
			this.m = m;
			this.mp = m.invDigit();
			this.mpl = this.mp&0x7fff;
			this.mph = this.mp>>15;
			this.um = (1<<(m.DB-15))-1;
			this.mt2 = 2*m.t;
		}

		// xR mod m
		function montConvert(x) {
			var r = nbi();
			x.abs().dlShiftTo(this.m.t,r);
			r.divRemTo(this.m,null,r);
			if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {this.m.subTo(r,r);}
			return r;
		}

		// x/R mod m
		function montRevert(x) {
			var r = nbi();
			x.copyTo(r);
			this.reduce(r);
			return r;
		}

		// x = x/R mod m (HAC 14.32)
		function montReduce(x) {
			while(x.t <= this.mt2)	// pad x so am has enough room later
			x[x.t++] = 0;
			for(var i = 0; i < this.m.t; ++i) {
				// faster way of calculating u0 = x[i]*mp mod DV
				var j = x[i]&0x7fff;
				var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
				// use am to combine the multiply-shift-add into one call
				j = i+this.m.t;
				x[j] += this.m.am(0,u0,x,i,0,this.m.t);
				// propagate carry
				while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
			}
			x.clamp();
			x.drShiftTo(this.m.t,x);
			if(x.compareTo(this.m) >= 0) {x.subTo(this.m,x);}
		}

		// r = "x^2/R mod m"; x != r
		function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

		// r = "xy/R mod m"; x,y != r
		function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

		Montgomery.prototype.convert = montConvert;
		Montgomery.prototype.revert = montRevert;
		Montgomery.prototype.reduce = montReduce;
		Montgomery.prototype.mulTo = montMulTo;
		Montgomery.prototype.sqrTo = montSqrTo;

		// (protected) true iff this is even
		function bnpIsEven() {
			return ((this.t>0)?(this[0]&1):this.s) == 0;
		}

		// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
		function bnpExp(e,z) {
			if(e > 0xffffffff || e < 1){
				return BigInteger.ONE;
			}
			var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
			g.copyTo(r);
			while(--i >= 0){
				z.sqrTo(r,r2);
				
				if((e&(1<<i)) > 0){
					z.mulTo(r2,g,r);
				}else{
					var t = r;
					r = r2;
					r2 = t;
				}
			}
			return z.revert(r);
		}

		// (public) this^e % m, 0 <= e < 2^32
		function bnModPowInt(e,m) {
			var z;
			if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
			return this.exp(e,z);
		}

		// protected
		BigInteger.prototype.copyTo = bnpCopyTo;
		BigInteger.prototype.fromInt = bnpFromInt;
		BigInteger.prototype.fromString = bnpFromString;
		BigInteger.prototype.clamp = bnpClamp;
		BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
		BigInteger.prototype.drShiftTo = bnpDRShiftTo;
		BigInteger.prototype.lShiftTo = bnpLShiftTo;
		BigInteger.prototype.rShiftTo = bnpRShiftTo;
		BigInteger.prototype.subTo = bnpSubTo;
		BigInteger.prototype.multiplyTo = bnpMultiplyTo;
		BigInteger.prototype.squareTo = bnpSquareTo;
		BigInteger.prototype.divRemTo = bnpDivRemTo;
		BigInteger.prototype.invDigit = bnpInvDigit;
		BigInteger.prototype.isEven = bnpIsEven;
		BigInteger.prototype.exp = bnpExp;

		// public
		BigInteger.prototype.toString = bnToString;
		BigInteger.prototype.negate = bnNegate;
		BigInteger.prototype.abs = bnAbs;
		BigInteger.prototype.compareTo = bnCompareTo;
		BigInteger.prototype.bitLength = bnBitLength;
		BigInteger.prototype.mod = bnMod;
		BigInteger.prototype.modPowInt = bnModPowInt;

		// "constants"
		BigInteger.ZERO = nbv(0);
		BigInteger.ONE = nbv(1);

		//end of jsbn.js

		// prng4.js - uses Arcfour as a PRNG

		function Arcfour() {
			this.i = 0;
			this.j = 0;
			this.S = new Array();
		}

		// Initialize arcfour context from key, an array of ints, each from [0..255]
		function ARC4init(key) {
			var i, j, t;
			for(i = 0; i < 256; ++i)
			this.S[i] = i;
			j = 0;
			for(i = 0; i < 256; ++i) {
				j = (j + this.S[i] + key[i % key.length]) & 255;
				t = this.S[i];
				this.S[i] = this.S[j];
				this.S[j] = t;
			}
			this.i = 0;
			this.j = 0;
		}

		function ARC4next() {
			var t;
			this.i = (this.i + 1) & 255;
			this.j = (this.j + this.S[this.i]) & 255;
			t = this.S[this.i];
			this.S[this.i] = this.S[this.j];
			this.S[this.j] = t;
			return this.S[(t + this.S[this.i]) & 255];
		}

		Arcfour.prototype.init = ARC4init;
		Arcfour.prototype.next = ARC4next;

		// Plug in your RNG constructor here
		function prng_newstate() {
			return new Arcfour();
		}

		// Pool size must be a multiple of 4 and greater than 32.
		// An array of bytes the size of the pool will be passed to init()
		var rng_psize = 256;

		//end of prng4.js
		// Random number generator - requires a PRNG backend, e.g. prng4.js

		// For best results, put code like
		// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
		// in your main HTML document.

		var rng_state;
		var rng_pool;
		var rng_pptr;

		// Mix in a 32-bit integer into the pool
		function rng_seed_int(x) {
			rng_pool[rng_pptr++] ^= x & 255;
			rng_pool[rng_pptr++] ^= (x >> 8) & 255;
			rng_pool[rng_pptr++] ^= (x >> 16) & 255;
			rng_pool[rng_pptr++] ^= (x >> 24) & 255;
			
			if(rng_pptr >= rng_psize) {
				rng_pptr -= rng_psize;
			}
		}

		// Mix in the current time (w/milliseconds) into the pool
		function rng_seed_time() {
			rng_seed_int(new Date().getTime());
		}

		// Initialize the pool with junk if needed.
		if(rng_pool == null) {
			rng_pool = new Array();
			rng_pptr = 0;
			
			var t;
			if(window.crypto && window.crypto.getRandomValues) {
				// Use webcrypto if available
				var ua = new Uint8Array(32);
				window.crypto.getRandomValues(ua);
				for(t = 0; t < 32; ++t){
					rng_pool[rng_pptr++] = ua[t];
				}
			}
			if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
				// Extract entropy (256 bits) from NS4 RNG if available
				var z = window.crypto.random(32);
				for(t = 0; t < z.length; ++t)
				rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
			}  
			while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
				t = Math.floor(65536 * Math.random());
				rng_pool[rng_pptr++] = t >>> 8;
				rng_pool[rng_pptr++] = t & 255;
			}
			rng_pptr = 0;
			rng_seed_time();
			//rng_seed_int(window.screenX);
			//rng_seed_int(window.screenY);
		}

		function rng_get_byte() {
			if(rng_state == null) {
				rng_seed_time();
				rng_state = prng_newstate();
				rng_state.init(rng_pool);
				
				for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr){
					rng_pool[rng_pptr] = 0;
				}
				rng_pptr = 0;
					//rng_pool = null;
			}
			// TODO: allow reseeding after first request
			return rng_state.next();
		}

		function rng_get_bytes(ba) {
			var i;
			for(i = 0; i < ba.length; ++i){
				ba[i] = rng_get_byte();
			}
		}

		function SecureRandom() {}

		SecureRandom.prototype.nextBytes = rng_get_bytes;


		//end of rng.js

		// Depends on jsbn.js and rng.js

		// Version 1.1: support utf-8 encoding in pkcs1pad2

		// convert a (hex) string to a bignum object
		function parseBigInt(str,r) {
			return new BigInteger(str,r);
		}

		/*function linebrk(s,n) {
			var ret = "";
			var i = 0;
			while(i + n < s.length) {
				ret += s.substring(i,i+n) + "";
				i += n;
			};
			return ret + s.substring(i,s.length);
		}*/

		function byte2Hex(b) {
			if(b < 0x10){
				return "0" + b.toString(16);
			}else{
				return b.toString(16);
			}
		}

		// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
		function pkcs1pad2(s,n){
			if(n < s.length + 11) { // TODO: fix for utf-8
		//alert("Message too long for RSA");
		return null;
		}
		var ba = new Array();
		var i = s.length - 1;
		while(i >= 0 && n > 0) {
		var c = s.charCodeAt(i--);
		if(c < 128) { // encode using utf-8
		ba[--n] = c;
		}
		else if((c > 127) && (c < 2048)) {
		ba[--n] = (c & 63) | 128;
		ba[--n] = (c >> 6) | 192;
		}
		else {
		ba[--n] = (c & 63) | 128;
		ba[--n] = ((c >> 6) & 63) | 128;
		ba[--n] = (c >> 12) | 224;
		}
		}
		ba[--n] = 0;
		var rng = new SecureRandom();
		var x = new Array();
		while(n > 2) { // random non-zero pad
		x[0] = 0;
		while(x[0] == 0) rng.nextBytes(x);
		ba[--n] = x[0];
		}
		ba[--n] = 2;
		ba[--n] = 0;
		return new BigInteger(ba);
		}

		// "empty" RSA key constructor
		function RSAKey() {
			this.n = null;
			this.e = 0;
			this.d = null;
			this.p = null;
			this.q = null;
			this.dmp1 = null;
			this.dmq1 = null;
			this.coeff = null;
		}

		// Set the public key fields N and e from hex strings
		function RSASetPublic(N,E) {
			if(N != null && E != null && N.length > 0 && E.length > 0) {
				this.n = parseBigInt(N,16);
				this.e = parseInt(E,16);
			}else{
				alert("Invalid RSA public key");
			}
		}

		// Perform raw public operation on "x": return x^e (mod n)
		function RSADoPublic(x) {
			return x.modPowInt(this.e, this.n);
		}

		function nopadding(s,n) {
			if(n < s.length) { // TODO: fix for utf-8
				alert("Message too long for RSA");
				return null;
			};
			//console.log(s, n)
			var ba = new Array();
			var i = 0;
			var j = 0;
			while(i < s.length && j < n) {
				var c = s.charCodeAt(i++);
				if(c < 128) { // encode using utf-8
					ba[j++] = c;
				}else if((c > 127) && (c < 2048)){
					ba[j++] = (c & 63) | 128;
					ba[j++] = (c >> 6) | 192;
				}else{
					ba[j++] = (c & 63) | 128;
					ba[j++] = ((c >> 6) & 63) | 128;
					ba[j++] = (c >> 12) | 224;
				}
			};
			while (j < n) {
				ba[j++] = 0;
			};
			//console.log(ba)
			return new BigInteger(ba);
		}

		// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
		function RSAEncrypt(text) {
			//var m = nopadding(text, (this.n.bitLength()+7)>>3 );
			var m  = pkcs1pad2(text, (this.n.bitLength()+7)>>3 );
			if(m == null){
				return null
			};
			
			var c = this.doPublic(m);
			//console.log(c);
			if(c == null){
				return null
			};
			
			var h = c.toString(16);
			if((h.length & 1) == 0){
				return h;
			}else{
				return "0" + h
			};
		}

		// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
		//function RSAEncryptB64(text) {
		//  var h = this.encrypt(text);
		//  if(h) return hex2b64(h); else return null;
		//}

		// protected
		RSAKey.prototype.doPublic = RSADoPublic;

		// public
		RSAKey.prototype.setPublic = RSASetPublic;
		RSAKey.prototype.encrypt = RSAEncrypt;
		//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


		//calculate  rsa value
		var rsaObj = new RSAKey();
		var n = param[0];
		var e = param[1];
		rsaObj.setPublic(n, e);
		
		var result = rsaObj.encrypt(val);
		//var result = linebrk(res, 64);
		//console.log(result)
		if(result.length != 256){
			//$.su.encrypt(n,e,val);
			var l = Math.abs(256 - result.length);
			for (var i = 0; i < l; i++){
				result = "0" + result;
			};
		}
		return result;

	};

	var _md5 =  function (entree){
		
		function array(n)
		{
			for (i=0; i<n; i++) this[i]=0;
			this.length=n;
		}


		function integer(n) { return n%(0xffffffff+1); }

		function shr(a,b)
		{
			a=integer(a);
			b=integer(b);

			if (a-0x80000000>=0)
			{
				a   = a%0x80000000;
				a >>= b;
				a  += 0x40000000 >> (b-1);
			}
			else a >>= b;

			return a;
		}

		function shl1(a)
		{
			a = a%0x80000000;

			if (a&0x40000000==0x40000000)
			{
				a-=0x40000000;
				a*=2;
				a+=0x80000000;
			}
			else a*=2;

			return a;
		}

		function shl(a,b)
		{
			a = integer(a);
			b = integer(b);

			for (var i=0; i<b; i++)
				a=shl1(a);

			return a;
		}

		function and(a,b)
		{
			a = integer(a);
			b = integer(b);

			var t1 = (a-0x80000000);
			var t2 = (b-0x80000000);

			if (t1>=0)
				if (t2>=0)
					return ((t1&t2)+0x80000000);
				else
					return (t1&b);
			else
				if (t2>=0)
					return (a&t2);
				else
					return (a&b);
		}

		function or(a,b)
		{
			a = integer(a);
			b = integer(b);

			var t1 = (a-0x80000000);
			var t2 = (b-0x80000000);

			if (t1>=0)
				if (t2>=0)
					return ((t1|t2)+0x80000000);
				else
					return ((t1|b)+0x80000000);
			else
				if (t2>=0)
					return ((a|t2)+0x80000000);
				else
					return (a|b);
		}

		function xor(a,b)
		{
			a = integer(a);
			b = integer(b);

			var t1 = (a-0x80000000);
			var t2 = (b-0x80000000);

			if (t1>=0)
				if (t2>=0)
					return (t1^t2);
				else
					return ((t1^b)+0x80000000);
			else
				if (t2>=0)
					return ((a^t2)+0x80000000);
				else
					return (a^b);
		}

		function not(a)
		{
			a = integer(a);

			return (0xffffffff-a);
		}


			var state = new array(4);
			var count = new array(2);
				count[0] = 0;
				count[1] = 0;
			var buffer = new array(64);
			var transformBuffer = new array(16);
			var digestBits = new array(16);

			var S11 = 7;
			var S12 = 12;
			var S13 = 17;
			var S14 = 22;
			var S21 = 5;
			var S22 = 9;
			var S23 = 14;
			var S24 = 20;
			var S31 = 4;
			var S32 = 11;
			var S33 = 16;
			var S34 = 23;
			var S41 = 6;
			var S42 = 10;
			var S43 = 15;
			var S44 = 21;

		function F(x,y,z)
		{
			return or(and(x,y),and(not(x),z));
		}

		function G(x,y,z)
		{
			return or(and(x,z),and(y,not(z)));
		}

		function H(x,y,z)
		{
			return xor(xor(x,y),z);
		}

		function I(x,y,z)
		{
			return xor(y,or(x,not(z)));
		}

		function rotateLeft(a,n)
		{
			return or(shl(a,n),(shr(a,(32-n))));
		}

		function FF(a,b,c,d,x,s,ac)
		{
			a = a+F(b, c, d) + x + ac;
			a = rotateLeft(a, s);
			a = a+b;
			return a;
		}

		function GG(a,b,c,d,x,s,ac)
		{
			a = a+G(b,c,d)+x+ac;
			a = rotateLeft(a,s);
			a = a+b;
			return a;
		}

		function HH(a,b,c,d,x,s,ac)
		{
			a = a+H(b, c, d) + x + ac;
			a = rotateLeft(a, s);
			a = a+b;
			return a;
		}

		function II(a,b,c,d,x,s,ac)
		{
			a = a+I(b, c, d) + x + ac;
			a = rotateLeft(a, s);
			a = a+b;
			return a;
		}

		function transform(buf,offset)
		{
			var a=0, b=0, c=0, d=0;
			var x = transformBuffer;

			a = state[0];
			b = state[1];
			c = state[2];
			d = state[3];

			for (i = 0; i < 16; i++)
			{
				x[i] = and(buf[i*4+offset],0xff);

				for (j = 1; j < 4; j++)
				{
					x[i]+=shl(and(buf[i*4+j+offset] ,0xff), j * 8);
				}
			}

			/* Round 1 */
			a = FF ( a, b, c, d, x[ 0], S11, 0xd76aa478); /* 1 */
			d = FF ( d, a, b, c, x[ 1], S12, 0xe8c7b756); /* 2 */
			c = FF ( c, d, a, b, x[ 2], S13, 0x242070db); /* 3 */
			b = FF ( b, c, d, a, x[ 3], S14, 0xc1bdceee); /* 4 */
			a = FF ( a, b, c, d, x[ 4], S11, 0xf57c0faf); /* 5 */
			d = FF ( d, a, b, c, x[ 5], S12, 0x4787c62a); /* 6 */
			c = FF ( c, d, a, b, x[ 6], S13, 0xa8304613); /* 7 */
			b = FF ( b, c, d, a, x[ 7], S14, 0xfd469501); /* 8 */
			a = FF ( a, b, c, d, x[ 8], S11, 0x698098d8); /* 9 */
			d = FF ( d, a, b, c, x[ 9], S12, 0x8b44f7af); /* 10 */
			c = FF ( c, d, a, b, x[10], S13, 0xffff5bb1); /* 11 */
			b = FF ( b, c, d, a, x[11], S14, 0x895cd7be); /* 12 */
			a = FF ( a, b, c, d, x[12], S11, 0x6b901122); /* 13 */
			d = FF ( d, a, b, c, x[13], S12, 0xfd987193); /* 14 */
			c = FF ( c, d, a, b, x[14], S13, 0xa679438e); /* 15 */
			b = FF ( b, c, d, a, x[15], S14, 0x49b40821); /* 16 */

			/* Round 2 */
			a = GG ( a, b, c, d, x[ 1], S21, 0xf61e2562); /* 17 */
			d = GG ( d, a, b, c, x[ 6], S22, 0xc040b340); /* 18 */
			c = GG ( c, d, a, b, x[11], S23, 0x265e5a51); /* 19 */
			b = GG ( b, c, d, a, x[ 0], S24, 0xe9b6c7aa); /* 20 */
			a = GG ( a, b, c, d, x[ 5], S21, 0xd62f105d); /* 21 */
			d = GG ( d, a, b, c, x[10], S22,  0x2441453); /* 22 */
			c = GG ( c, d, a, b, x[15], S23, 0xd8a1e681); /* 23 */
			b = GG ( b, c, d, a, x[ 4], S24, 0xe7d3fbc8); /* 24 */
			a = GG ( a, b, c, d, x[ 9], S21, 0x21e1cde6); /* 25 */
			d = GG ( d, a, b, c, x[14], S22, 0xc33707d6); /* 26 */
			c = GG ( c, d, a, b, x[ 3], S23, 0xf4d50d87); /* 27 */
			b = GG ( b, c, d, a, x[ 8], S24, 0x455a14ed); /* 28 */
			a = GG ( a, b, c, d, x[13], S21, 0xa9e3e905); /* 29 */
			d = GG ( d, a, b, c, x[ 2], S22, 0xfcefa3f8); /* 30 */
			c = GG ( c, d, a, b, x[ 7], S23, 0x676f02d9); /* 31 */
			b = GG ( b, c, d, a, x[12], S24, 0x8d2a4c8a); /* 32 */

			/* Round 3 */
			a = HH ( a, b, c, d, x[ 5], S31, 0xfffa3942); /* 33 */
			d = HH ( d, a, b, c, x[ 8], S32, 0x8771f681); /* 34 */
			c = HH ( c, d, a, b, x[11], S33, 0x6d9d6122); /* 35 */
			b = HH ( b, c, d, a, x[14], S34, 0xfde5380c); /* 36 */
			a = HH ( a, b, c, d, x[ 1], S31, 0xa4beea44); /* 37 */
			d = HH ( d, a, b, c, x[ 4], S32, 0x4bdecfa9); /* 38 */
			c = HH ( c, d, a, b, x[ 7], S33, 0xf6bb4b60); /* 39 */
			b = HH ( b, c, d, a, x[10], S34, 0xbebfbc70); /* 40 */
			a = HH ( a, b, c, d, x[13], S31, 0x289b7ec6); /* 41 */
			d = HH ( d, a, b, c, x[ 0], S32, 0xeaa127fa); /* 42 */
			c = HH ( c, d, a, b, x[ 3], S33, 0xd4ef3085); /* 43 */
			b = HH ( b, c, d, a, x[ 6], S34,  0x4881d05); /* 44 */
			a = HH ( a, b, c, d, x[ 9], S31, 0xd9d4d039); /* 45 */
			d = HH ( d, a, b, c, x[12], S32, 0xe6db99e5); /* 46 */
			c = HH ( c, d, a, b, x[15], S33, 0x1fa27cf8); /* 47 */
			b = HH ( b, c, d, a, x[ 2], S34, 0xc4ac5665); /* 48 */

			/* Round 4 */
			a = II ( a, b, c, d, x[ 0], S41, 0xf4292244); /* 49 */
			d = II ( d, a, b, c, x[ 7], S42, 0x432aff97); /* 50 */
			c = II ( c, d, a, b, x[14], S43, 0xab9423a7); /* 51 */
			b = II ( b, c, d, a, x[ 5], S44, 0xfc93a039); /* 52 */
			a = II ( a, b, c, d, x[12], S41, 0x655b59c3); /* 53 */
			d = II ( d, a, b, c, x[ 3], S42, 0x8f0ccc92); /* 54 */
			c = II ( c, d, a, b, x[10], S43, 0xffeff47d); /* 55 */
			b = II ( b, c, d, a, x[ 1], S44, 0x85845dd1); /* 56 */
			a = II ( a, b, c, d, x[ 8], S41, 0x6fa87e4f); /* 57 */
			d = II ( d, a, b, c, x[15], S42, 0xfe2ce6e0); /* 58 */
			c = II ( c, d, a, b, x[ 6], S43, 0xa3014314); /* 59 */
			b = II ( b, c, d, a, x[13], S44, 0x4e0811a1); /* 60 */
			a = II ( a, b, c, d, x[ 4], S41, 0xf7537e82); /* 61 */
			d = II ( d, a, b, c, x[11], S42, 0xbd3af235); /* 62 */
			c = II ( c, d, a, b, x[ 2], S43, 0x2ad7d2bb); /* 63 */
			b = II ( b, c, d, a, x[ 9], S44, 0xeb86d391); /* 64 */

			state[0] +=a;
			state[1] +=b;
			state[2] +=c;
			state[3] +=d;

		}


		function init()
		{
			count[0]=count[1] = 0;
			state[0] = 0x67452301;
			state[1] = 0xefcdab89;
			state[2] = 0x98badcfe;
			state[3] = 0x10325476;
			for (i = 0; i < digestBits.length; i++)
				digestBits[i] = 0;
		}

		function update(b)
		{
			var index,i;

			index = and(shr(count[0],3) , 0x3f);
			if (count[0]<0xffffffff-7)
			  count[0] += 8;
			else {
			  count[1]++;
			  count[0]-=0xffffffff+1;
			  count[0]+=8;
			}
			buffer[index] = and(b,0xff);
			if (index  >= 63) {
				transform(buffer, 0);
			}
		}

		function finish()
		{
			var bits = new array(8);
			var padding;
			var i=0, index=0, padLen=0;

			for (i = 0; i < 4; i++)
			{
				bits[i] = and(shr(count[0],(i * 8)), 0xff);
			}

			for (i = 0; i < 4; i++)
			{
				bits[i+4]=and(shr(count[1],(i * 8)), 0xff);
			}

			index = and(shr(count[0], 3) ,0x3f);
			padLen = (index < 56) ? (56 - index) : (120 - index);
			padding = new array(64);
			padding[0] = 0x80;

			for (i=0;i<padLen;i++)
			  update(padding[i]);

			for (i=0;i<8;i++)
			  update(bits[i]);

			for (i = 0; i < 4; i++)
			{
				for (j = 0; j < 4; j++)
				{
					digestBits[i*4+j] = and(shr(state[i], (j * 8)) , 0xff);
				}
			}
		}

		function hexa(n) 
		{
			 var hexa_h = "0123456789abcdef";
			 var hexa_c="";
			 var hexa_m=n;
			 for (hexa_i=0;hexa_i<8;hexa_i++) {
			   hexa_c=hexa_h.charAt(Math.abs(hexa_m)%16)+hexa_c;
			   hexa_m=Math.floor(hexa_m/16);
			 }
			 return hexa_c;
		}

		var ascii="01234567890123456789012345678901" + " !\"#" + '\$' + "%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"+       "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
		
		var l,s,k,ka,kb,kc,kd;

		init();
		for (k=0;k<entree.length;k++) {
			l=entree.charAt(k);
			update(ascii.lastIndexOf(l));
		}
		finish();
		ka=kb=kc=kd=0;
		for (i=0;i<4;i++) ka+=shl(digestBits[15-i], (i*8));
		for (i=4;i<8;i++) kb+=shl(digestBits[15-i], ((i-4)*8));
		for (i=8;i<12;i++) kc+=shl(digestBits[15-i], ((i-8)*8));
		for (i=12;i<16;i++) kd+=shl(digestBits[15-i], ((i-12)*8));
		s=hexa(kd)+hexa(kc)+hexa(kb)+hexa(ka);

		return s;
	};

	return {
		rsa: _rsa,
		md5: _md5
	}
}]);

/*
 * 工具函数
 */
suCommon.factory('$tool', ['$rootScope', function($rootScope){

	return {
		ascSort: function(data){
			var compare = function(value1, value2){
				return value1 - value2;
			}
			return data.sort(compare);
		},
		desSort: function(data){
			var compare = function(value1, value2){
				return value2 - value1;
			}
			return data.sort(compare);
		},
		randomId: function(){
			return "id" + (new Date()).getTime() + parseInt(Math.random()*100000);
		},
		isEmptyObject: function(obj){ 
			for (var name in obj) 
			{ 
				return false; 
			} 
			return true; 
		},
		valInArray: function(val, obj){
			var len = obj.length;
			for(var index = 0; index < len; index++)
			{
				if(val == obj[index].value)
				{
					return index;
				}
			}
			return -1;
		},
		deleteInArray: function(arr, val){
			var arrCopy = angular.copy(arr);
			
			for(var index=0, len=val.length; index < len; index ++){
				for (var item = 0, count=arrCopy.length; item < count; item++) {
					if(arrCopy[item].value == val[index]){
						arrCopy.splice(item, 1);
						break;
					}
				};
			}

			return arrCopy;
		},

		isNetIpLegal: function(ip, mask){
			var ipToInt = this.ipToInt;

			if (!ip){
				return false;
			};

			var ipint = ipToInt(ip);
			var maskint = ipToInt(mask);
			var res = ipint & maskint;

			if (res == 0x00000000 || res == maskint){
				return false;
			};

			return true;
		},

		ipToInt: function(ip){
			var patternIp = /^\s*[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\.{1}[0-9]{1,3}\s*$/;
		    var ipArray = ip.split(".");
			
		    if(ipArray.length != 4){
		        return -1;      
		    }
			
		    if(!patternIp.test(ip)){
		        return -1;
		    }
			
		    return (Number(ipArray[0])*(1<<24)+(Number(ipArray[1])<<16 |Number(ipArray[2])<<8 |Number(ipArray[3])));
		},

		isNetIp: function(ip, mask){
			var ipToInt = this.ipToInt;

		    if(!ip){
				return false;
			};
			var ipint = ipToInt(ip);
			var maskint = ipToInt(mask);

			if(0x00000000 == (ipint & (~maskint))){
				return true;
			};

			return false;
		},

		isBroadCastIp: function(ip, mask){
			var ipToInt = this.ipToInt;

			if(!ip){
				return false;
			};

			var ipint = ipToInt(ip);
			var maskint = ipToInt(mask);

			if(((ipint & (~maskint)) == (~maskint))){
				return true;
			};

			return false;
		},

		isSameNet: function(ip1, ip2, mask){
			if(ip1 == ""){
		        return false;
		    };

		    var ipToInt = this.ipToInt;

		    var intIp1 = ipToInt(ip1);
		    var intIp2 = ipToInt(ip2);
		    var intMask = ipToInt(mask);

		    if(intMask == 0){
		    	return false;
		    }
			
		    /*if(((intIp1&intMask)!=(intIp2&intMask)) || ((intIp1&0xffffffff)==(intIp2&intMask))||((intIp1&(~intMask))==(~intMask))){
		        return false;
		    };*/

		    if ((intIp1&intMask)!=(intIp2&intMask)){
		    	return false;
			}
		    return true;
		},

		isHostIp: function(ip1, ip2, mask){ 
			if(ip1 == ""){
				return false;
			}; 

			var ipToInt = this.ipToInt;

			var intIp1 = ipToInt(ip1);
			var intIp2 = ipToInt(ip2);
			var intMask = ipToInt(mask);
			
			if(intMask == 0) { 
				return false; 
			};


			if( (intIp1&0xffffffff)!=(intIp2&intMask) ){
				return false;
			};
			
			return true; 
		},
		escapeHtml: function(string){
			if(string){
				var r = string.toString();
				r = r.replace(/\&/g, "&amp;");
				r = r.replace(/\</g, "&lt;");
				r = r.replace(/\>/g, "&gt;");
				r = r.replace(/\"/g, "&quot;");
				r = r.replace(/\s/g ,"&nbsp;");

				return r;
			}else{
				return string;
			}
			
		}
	}
}]);

/*
 * 工具函数
 */
suCommon.factory('$url', ["$user", function($user){

	return {
		format: function(oldUrl){
			var token = $user.getToken();
			var subs = "/cgi-bin/luci/;stok=";
			return subs + token + oldUrl;
		}
	}
}]);

/*
 * 表单验证封装
 */
suCommon.factory("$vtype", function() {
	var type = {
		ip: function(value) {
			var defaults = {
				allowAllZeroFlag: false,
				allowLoopFlag: false,
				allowDTypeFlag: false,
				allowETypeFlag: false,
				allowAllOneFlag: false
			};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001",
				disallowAllZeroText: "ERROR.e000002",
				disallowLoopText: "ERROR.e000003",
				disallowDTypeText: "ERROR.e000004",
				disallowETypeText: "ERROR.e000005",
				disallowAllOneText: "ERROR.e000006",
				disallowFirstZeroText: "ERROR.e000007",
				disallowFirstAllOneText: "ERROR.e000008"
			};
			var pattern = {
					regex: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/
				}
				//var vtypeText = " {{'ERROR_IP' | translate}}";


			var options = angular.extend({}, defaults, arguments[1]);

			if (pattern.regex.test(value)) {
				ipStr = value;
				var szarray = [0, 0, 0, 0];
				var remain;
				var i;
				for (i = 0; i < 3; i++) {
					var n = ipStr.indexOf('.');
					szarray[i] = ipStr.substring(0, n);
					remain = ipStr.substring(n + 1);
					ipStr = remain;
				}
				szarray[3] = remain;
				for (i = 0; i < 4; i++) {
					if (szarray[i] < 0 || szarray[i] > 255) {
						return errorcode.vtypeText;
						
					}
				}
				if (!options.allowLoopFlag) {
					if (szarray[0] == 127) {
						return errorcode.disallowLoopText;
						//return false;
					}
				}
				if (!options.allowDTypeFlag) {
					if (szarray[0] >= 224 && szarray[0] <= 239) {
						//return false;
						return errorcode.disallowDTypeText;
					}
				}
				if (!options.allowETypeFlag) {
					if (szarray[0] >= 240 && szarray[0] <= 254) {
						//return false;
						return errorcode.disallowETypeText;
					}
				}
				if (!options.allowAllOneFlag) {
					// if(szarray[0]==255) 
					// {
					// 	return this.disallowAllOneText;
					// }
					if (szarray[0] == 255 && szarray[1] == 255 && szarray[2] == 255 && szarray[3] == 255) {
						//return false;
						return errorcode.disallowAllOneText;
					}
					if(szarray[0]==255) 
					{
						return errorcode.disallowFirstAllOneText;
					}
				} else {
					if (szarray[0] == 255 && szarray[1] == 255 && szarray[2] == 255 && szarray[3] == 255) {} else {
						if (szarray[0] == 255) {
							//return false;
							return errorcode.disallowFirstAllOneText;
						}
					}
				}
				if (!options.allowAllZeroFlag) {
					if (szarray[0] == 0 && szarray[1] == 0 && szarray[2] == 0 && szarray[3] == 0) {
						//return false;
						return errorcode.disallowAllZeroText;
					}
				}
				if (!options.allowAllZeroFlag && !options.allowFirstZeroFlag) {
					if (szarray[0] == 0) {
						//return false;
						return errorcode.disallowFirstZeroText;
					}
				}
				return true;
			} else {
				return errorcode.vtypeText;
			}
		},
		mac: function(value) {
			var defaults = {
				allowMultiFlag: true
			};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001",
				disallowAllMultiText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[a-fA-F\d]{2}\-[a-fA-F\d]{2}\-[a-fA-F\d]{2}\-[a-fA-F\d]{2}\-[a-fA-F\d]{2}\-[a-fA-F\d]{2}$/,
				patternMulti: /^\s*[0-9A-Fa-f]{1}[13579bdfBDF]{1}(\-[A-Fa-f0-9]{2}){5}\s*$/,
				patternZero: /^(0{1,2}-){5}0{1,2}$/
			};

			var options = angular.extend({}, defaults, arguments[1]);
			if (pattern.regex.test(value)) {
				if (options.allowMultiFlag) {
					if (pattern.patternMulti.test(value)) {
						return errorcode.disallowAllMultiText;
					}
				}
				if (pattern.patternZero.test(value)) {
					return errorcode.vtypeText;
				}
				return true;
			} else {
				return errorcode.vtypeText;
			}

		},
		netmask: function(value) {
			var defaults = {
				allowAllOneFlag: false
			};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001",
				disallowAllOneText: "ERROR.e000012"
			};
			var pattern = {
				regex: /^(254|252|248|240|224|192|128)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$|^255.255.255.255$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				if (value == "255.255.255.255") {
					if (!options.allowAllOneFlag) {
						return errorcode.disallowAllOneText;
					}
				}
				return true;
			} else {
				return errorcode.vtypeText
			}

		},
		password: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\`\~\!\@\#\$\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\%\^\/\ ]+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		email: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000014"
			};
			var pattern = {
				regex: /^(\w)+((\.){0,1}[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		string_visible_allow_blank: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^(\S|\x20)+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		name: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\_]+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		name_special: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\_\-]+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		name_with_special_start: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001" //NAME_START
			};
			var pattern = {
				regex: /^[a-zA-Z_]/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		note: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]*$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		domain: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		ascii_visible: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[\x21-\x7e]+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		string_visible: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^\S+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		string_visible_no_comma: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^\S+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				if (value.indexOf(",") >= 0) {
					return errorcode.vtypeText
				}
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		ip_domain: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^.+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				if (this["ip"](value) === true) {
					return true;
				}
				if (this["domain"](value) === true) {

					return true;
				}
				return errorcode.vtypeText;
			} else {
				return errorcode.vtypeText
			}
		},
		string_ip_domain: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\_\-\.]+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		ipv6: function(value) {
			var defaults = {
				isPrefixFlag: false

			};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001",
				IPV6_NOT_GLOBAL: "ERROR.e000001",
				IPV6_NOT_PREFIX: "ERROR.e000001"
			};
			var pattern = {
				regex: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
				reg1: /^[2-3][0-9A-Fa-f]{1,3}:/,
				reg2: /::$/,
				reg3: /:/g
			};

			var options = angular.extend({}, defaults, arguments[1]);

			if (pattern.regex.test(value)) {
				if (!pattern.reg1.test(val)) {
					return errorcode.IPV6_NOT_GLOBAL;
				}
				if (options.isPrefixFlag) {
					if (!pattern.reg2.test(val)) {
						return errorcode.IPV6_NOT_PREFIX;
					}
				} else {
					if (pattern.reg2.test(val)) {
						return errorcode.IPV6_NOT_GLOBAL;
					}
				}
				var arr = val.match(pattern.reg3);
				if (options.isPrefixFlag) {
					if (arr.length > 5) {
						return errorcode.IPV6_NOT_PREFIX;
					}
				}
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		date: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{4})$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				var arr = value.split("/");
				if (parseInt(arr[2], 10) < 1970) {
					return errorcode.vtypeText;
				}
				if (parseInt(arr[2], 10) > 2030) {
					return errorcode.vtypeText;
				}
				var formatDate = arr[2] + "/" + arr[0] + "/" + arr[1];
				if (new Date(formatDate).getDate() == formatDate.substring(formatDate.length - 2)) {
					return true
				} else {
					return errorcode.vtypeText;
				}
			} else {
				return errorcode.vtypeText;
			}
		},
		float_number: function(value){
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001",
				NUMBER_MIN: "ERROR.e000030",
				NUMBER_MAX: "ERROR.e000031",
				NUMBER_MIN_MAX: "ERROR.e000032",
				AND: "ERROR.e000033"
			};
			var pattern = {
				regex: /^-?[0-9]\d*(.[0-9]\d{0,2})?$/
			};
			var options = angular.extend({}, defaults, arguments[1]);
			if(pattern.regex.test(value)){
				value = parseFloat(value);

				if(options.max !== null && options.max !== undefined){
					if(value > options.max){
						if(options.min !== null && options.min !== undefined){
							var str = errorcode.NUMBER_MIN_MAX + options.min.toString() + errorcode.AND + options.max.toString();
							return str;
						}else{
							var str = errorcode.NUMBER_MAX + options.max.toString();
							return str;
						}
					}
				}

				if(options.min !== null && options.min !== undefined){
					if(value < options.min){
						if(options.max !== null && options.max !== undefined){
							var str = errorcode.NUMBER_MIN_MAX + options.min.toString() + errorcode.AND + options.max.toString();
							return str;
						}else{
							var str = errorcode.NUMBER_MIN + options.min.toString();
							return str;
						}
					}
				}

				return true;

			}else{
				return errorcode.vtypeText;
			}

		},
		number: function(value) {
			var defaults = {};

			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001",
				NUMBER_MIN: "ERROR.e000030",
				NUMBER_MAX: "ERROR.e000031",
				NUMBER_MIN_MAX: "ERROR.e000032",
				AND: "ERROR.e000033"
			};
			var pattern = {
				regex: /^-?[0-9]\d*$/
			};

			var options = angular.extend({}, defaults, arguments[1]);

			if (pattern.regex.test(value)) {
				value = parseInt(value, 10);
				if (options.max !== null && options.max !== undefined) {
					if (value > options.max) {
						if (options.min !== null && options.min !== undefined) {
							var str = errorcode.NUMBER_MIN_MAX + options.min.toString() + errorcode.AND + options.max.toString();
							return str;
						} else {
							var str = errorcode.NUMBER_MAX + options.max.toString();
							return str;
						}
					};
				};

				if (options.min !== null && options.min !== undefined) {
					if (value < options.min) {
						if (options.max !== null && options.max !== undefined) {
							var str = errorcode.NUMBER_MIN_MAX + options.min.toString() + errorcode.AND + options.max.toString();
							return str;
						} else {
							var str = errorcode.NUMBER_MIN + options.min.toString();
							return str;
							//return 	$.su.CHAR.VTYPETEXT.NUMBER_MIN.replace("%options.min", options.min.toString());
						}
					};
				};

				return true;

			} else {
				return errorcode.vtypeText
			}
			/*			keybordHandler: function(e) {
				e.stopPropagation();
				var keyCode = e.keyCode,
					shiftKey = e.shiftKey,
					ctrlKey = e.ctrlKey;

				if (shiftKey) {
					return false;
				};

				if (keyCode == 37 || keyCode == 39) {
					return true;
				};

				if (keyCode == 38 || keyCode == 40) {
					var input = $(this),
						_value = input.val();

					if ($.su.vtype.types.number.regex.test(_value)) {
						if (keyCode == 38) {
							var _maxValue = input.hasClass("hour-text") ? 23 : 59;
							if (_value < _maxValue) {
								input.val(parseInt(_value, 10) + 1);
							} else {
								return false;
							};
						} else {
							if (_value == 0) {
								return false;
							} else {
								input.val(parseInt(_value, 10) - 1);
							}
						};
					} else {
						input.val(0);
					};
				};

				if (!ctrlKey) {
					if ((keyCode < 48 || keyCode > 57) && keyCode > 32) {
						return false;
					};
				};
			}*/
		}, 

		name_in_vpn: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[a-zA-Z_][A-Za-z0-9\_\-]{0,14}$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		pwd_in_vpn: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\_\-]{1,15}$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		},
		string_visible_username: function(value) {
			var defaults = {};
			var errorcode = {
				valid: "ERROR.e000000",
				vtypeText: "ERROR.e000001"
			};
			var pattern = {
				regex: /^[A-Za-z0-9\`\~\!\@\#\$\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\%\^\/\ ]+$/
			};

			var options = angular.extend({}, defaults, arguments[1]);


			if (pattern.regex.test(value)) {
				return true;
			} else {
				return errorcode.vtypeText
			}
		}
	}
	return type;
});


/*
 * 用户登陆状态管理
 */
suCommon.factory('$user', ['$form', function($form) {

	return {
		isLogin: false,

		getToken: function(){
			var token = localStorage.getItem("token");
			return  token ? token : "";
		},

		login: function(scope, data, success, failure, error) {
			var me = this;
			var success = success || function(){};
			var failure = failure || function(){};
			var error = error || function(){};

			$form.submit(scope, data, function(data, others){
				me.isLogin = true;
				success(data, others);
			}, failure, error, true, false);

		},

		checkCookie: function() {
			try {
				localStorage.setItem("private", 100);
				if (!navigator.cookieEnabled) {
					return false;
				};
			} catch (e) {
				return false;
			};
			return true;
		}
	}
}]);

/*
 * 表格数据交互封装
 */
suCommon.factory('$grid', ['$proxy', '$form', '$tool', "$format", "$msg", function ($proxy, $form, $tool, $format, $msg) {
	var defaults = {
		proxy: null,
		fields: null,
		columns: null,
		success: null,
		failure: null,
		error: null,

		autoload: true,
		autoInit: true,

		editor: null,
		maxRulesProperty: "max_rules"
	};
	return {
		config: function(scope, options) {
			scope.grid = {};
			scope.grid.proxy = angular.extend({}, defaults.proxy, options.proxy);
			scope.grid.fields = angular.extend([], defaults.fields, options.fields);
			scope.grid.columns = angular.extend([], defaults.columns, options.columns);
			
			scope.grid.success = options.success || function(){};
			scope.grid.failure = options.failure || function(){};
			scope.grid.error = options.error || function(){};

			scope.grid.autoLoad = angular.isDefined(options.autoLoad) ? options.autoLoad : defaults.autoLoad;
			scope.grid.autoInit = angular.isDefined(options.autoInit) ? options.autoInit : defaults.autoInit;
			scope.grid.maxRulesProperty = options.maxRulesProperty || defaults.maxRulesProperty;


			if(scope.grid.autoLoad){
				this.init(scope);
				scope.grid.load();
			} else if(scope.grid.autoInit){
				this.init(scope);
			}

			if(angular.isObject(options.editor)){
				var params = {};
				params.proxy = angular.extend({}, defaults.proxy, options.proxy, options.editor.proxy);
				params.fields = options.editor.fields ? angular.extend([], defaults.fields, options.editor.fields) : angular.extend([], defaults.fields, options.fields);
				params.success = options.editor.success || options.success || function(){};
				params.failure = options.editor.failure || options.failure || function(){};
				params.error = options.editor.error || options.error || function(){};
				params.autoLoad = false;
				params.autoInit = options.editor.autoInit || options.autoInit || defaults.autoInit;
				params.validator = options.editor.validator || null;

				$form.config(scope, params);
			};
			
		},

		init: function(scope) {
			var $grid = this;
			scope.isGrid = true;

			scope.grid.load = function(data, success, failure, error, showLoading){
				$grid.load(scope, data, success, failure, error, showLoading);
			};

			scope.grid.loadData = function(data, operation){
				$grid.loadData(scope, data, operation);
			};

			scope.grid.insert = function(data, success, failure, error){
				$grid.insert(scope, data, success, failure, error);
			};

			scope.grid.startEdit = function(index){
				$grid.startEdit(scope, index);
			};

			scope.grid.cancelEdit = function(){
				$grid.cancelEdit(scope);
			};

			scope.grid.saveEdit = function(data, success, failure, error){
				$grid.update(scope, data, success, failure, error);
			};

			scope.grid['delete'] = function(index, data, success, failure, error){
				$grid['delete'](scope, index, data, success, failure, error);
			};

			scope.grid.remove = function(scope, data, success, failure, error){
				$grid.remove(scope, data, success, failure, error)
			};

			scope.grid.initAddData = function(){
				return $grid.initAddData(scope);
			}

			scope.grid.isDirty = function(){
				return $grid.isDirty(scope);
			};

			scope.grid.data = angular.extend([], scope.grid.data);
			
		},

		load: function(scope, data, success, failure, error, showLoading) {
			if(scope.isGrid){
				var data = angular.extend({
					operation:"load"
				}, data);

				var success = success || function(){};
				var failure = failure || function(){};
				var error = error || function(){};

				angular.extend(scope.grid.proxy, {
					showLoading: angular.isDefined(showLoading) ? showLoading : true
				});

				$proxy.request(scope.grid.proxy, data, function(data, others){
					scope.grid.loadData(data, "load");
					success(data, others);
					if(others){
						var maxRules = others[scope.grid.maxRulesProperty];
						scope.grid.max = maxRules || 0;
					}
				}, function(errorcode, others, data){
					failure(errorcode, others, data);
				}, function(status){
					error(status);
				});
			}
		},

		loadData: function(scope, data, operation){
			if(scope.isGrid){
				var fields = scope.grid.fields;
				if(operation === "load"){
					scope.grid.data = [];
					scope.grid.mapping = {};
					scope.grid.count = 0;

					if(data){
						for(var row = 0, rowCount = data.length; row < rowCount; row++){
							var item = {};
							for(var index = 0, len = fields.length; index < len; index++){
								var name = fields[index].name;
								var mapping = fields[index].mapping || name;
								//var format = fields[index].format;

								item[name] = {};

								// if(angular.isString(format) && format !== ""){
								// 	item[name].data = $format[format](data[row][mapping]) || "";
								// } else {
								// 	item[name].data = data[row][mapping] || "";
								// }
								
								item[name].data = data[row][mapping] || "";
								item[name].format = fields[index].format || null;
								// item[name].mapping = fields[index].mapping;
								// item[name].vtypeConfig = fields[index].vtypeConfig;
								// item[name].disabled = fields[index].disabled || false;
								// item[name].readOnly = fields[index].readOnly || false;
								// item[name].valid = fields[index].valid || true;
								// item[name].visible = fields[index].visible || true;
								
							}
							if(angular.isUndefined(data[row].key)){
								var key = ("key-" + scope.grid.count++);
								item.key = key;
								scope.grid.mapping[key] = rowCount - row - 1 ;
							} else {
								item.key = data[row].key;
								scope.grid.mapping[data[row].key] = rowCount - row - 1;
							}

							scope.grid.data.push(item);
						}
					}
						
				} else if (operation === "insert") {
						var item = {};
						for(var index = 0, len = fields.length; index < len; index++){
							var name = fields[index].name;
							var mapping = fields[index].mapping || name;
							//var format = fields[index].format;

							item[name] = {};

							// if(angular.isString(format) && format !== ""){
							// 	item[name].data = $format[format](data[mapping]) || "";
							// } else {
							// 	item[name].data = data[mapping] || "";
							// }
							item[name].data = data[mapping] || "";
							item[name].format = fields[index].format || null;
							// item[name].mapping = fields[index].mapping;
							// item[name].vtypeConfig = fields[index].vtypeConfig;
							// item[name].disabled = fields[index].disabled || false;
							// item[name].readOnly = fields[index].readOnly || false;
							// item[name].valid = fields[index].valid || true;
							// item[name].visible = fields[index].visible || true;
						}

						if(angular.isUndefined(data.key)){
							var key = ("key-" + scope.grid.count++);
							item.key = key;
							scope.grid.mapping[key] = scope.grid.data.length;
						} else {
							item.key = data.key;
							scope.grid.mapping[data.key] = scope.grid.data.length;
						}

						scope.grid.data.unshift(item);

				} else if (operation === "update") {
					var updateIndex = scope.grid.updateIndex;
					for(var index = 0, len = fields.length; index < len; index++){
						var name = fields[index].name;
						var mapping = fields[index].mapping || name;
						//var format = fields[index].format;
						
						// if(angular.isString(format) && format !== ""){
						// 	scope.grid.data[updateIndex][name].data = $format[format](data[mapping]) || "";
						// } else {
						// 	scope.grid.data[updateIndex][name].data = data[mapping] || "";
						// }
						
						scope.grid.data[updateIndex][name].data = data[mapping] || "";
						
					}
					angular.isDefined(data.key) ? scope.grid.data[updateIndex].key = data.key : null;
				} else if (operation === "remove"){
					var removeItems = [];
					for(var index = 0, len = data.length; index < len; index++){
						if(data[index].success){
							if(angular.isDefined(data[index].key)){
								removeItems.push(scope.grid.data.length - scope.grid.mapping[data[index].key] - 1);
							} else {
								removeItems.push(data[index].index);
							}
						}	
					}

					removeItems= $tool.ascSort(removeItems);
					for (var len = removeItems.length, index = len - 1; index >= 0; index--) {
						scope.grid.data.splice(removeItems[index], 1);
					};
				}
			}
		},

		insert: function(scope, data, success, failure, error){
			if(scope.isGrid && scope.form.proxy.url !== null){
				var data = angular.extend({
					operation:"insert",
					index: 0,
					key: "add"
				}, data);
				if(scope.isForm){
					var success = success || function(){};
					var failure = failure || function(){};
					var error = error || function(){};

					scope.form.submit(data, function(data, others){
						var copyData = angular.copy(data);
						
						scope.grid.loadData(copyData, "insert");
						success(data, others);
						scope.form.clear();
					}, function(errorcode, others, data){
						failure(errorcode, others, data);
					}, function(status){
						error(status);
					});
				}
			} else if(scope.isGrid && scope.form.proxy.url === null){
				var success = success || function(){};

				if(!scope.form.validate(scope)){
					return false;
				};

				if(scope.form.childScope && !scope.form.childScope.form.validate(scope.form.childScope)){
					return false;
				}

				var addItem = {};
				var fields = scope.grid.fields;
				for(var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					addItem[name] = scope.form.data[name].data;
				}

				scope.grid.loadData(addItem, "insert");
				success();
				scope.form.clear();
			}
		},

		update: function(scope, data, success, failure, error){
			if(scope.isGrid && scope.form.proxy.url !== null){
				var data = angular.extend({
					operation:"update",
					index: scope.grid.updateIndex,
					key: scope.grid.data[scope.grid.updateIndex].key
				}, data);

				if(scope.isForm){
					var success = success || function(){};
					var failure = failure || function(){};
					var error = error || function(){};

					scope.form.submit(data, function(data, others){
						var copyData = angular.copy(data);
						
						scope.grid.loadData(copyData, "update");
						scope.grid.updateIndex = "";
						success(data, others);
						scope.form.clear();
					}, function(errorcode, others, data){
						failure(errorcode, others, data);
					}, function(status){
						error(status);
					});
				}
			} else if(scope.isGrid && scope.form.proxy.url === null){
				var success = success || function(){};
				if(!scope.form.validate(scope)){
					return false;
				};

				if(scope.form.childScope && !scope.form.childScope.form.validate(scope.form.childScope)){
					return false;
				}
				
				var data = {};
				var fields = scope.grid.fields;
				for(var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					data[name] = scope.form.data[name].data;
				}

				scope.grid.loadData(data, "update");
				scope.grid.updateIndex = "";
				scope.form.clear();
				success();
			}
		},

		remove: function(scope, data, success, failure, error){

			if(scope.isGrid && scope.form.proxy.url !== null){
				var data = angular.extend({
					operation:"remove"
				}, data);

				var success = success || function(){};
				var failure = failure || function(){};
				var error = error || function(){};

				var successPrompt = $msg.create({
					type: "success",
					text: "FORM.SUCCESS"
				});

				var failurePrompt = $msg.create({
					type: "failure",
					text: "FORM.FAILED"
				});

				$proxy.request(scope.grid.proxy, data, function(data, others){
					scope.grid.loadData(data, "remove");
					//scope.grid.deleteIndex = "";
					successPrompt.show();
					success(data, others);
				}, function(errorcode, others, data){
					failurePrompt.show();
					failure(errorcode, others, data);
				}, function(status){
					failurePrompt.show();
					error(status);
				});
			} else if (scope.isGrid && scope.form.proxy.url === null){
				var success = success || function(){};

				var removeItems = [];
				for(var index = 0, len = data.length; index < len; index++){
					var removeObj = {};
					removeObj["index"] = data[index];
					removeObj["key"] = scope.grid.data[data[index]].key;
					removeObj["success"] = true;

					removeItems.push(removeObj);
				};

				scope.grid.loadData(removeItems, "remove");
				//scope.grid.deleteIndex = "";
				success();
			}

		},

		startEdit: function(scope, index){
			if(scope.isGrid && scope.isForm){
				scope.grid.updateIndex = index;

				var fields = scope.form.fields;
				var data = {};
				scope.form.old = {};
				for (var index = 0, len = fields.length; index < len; index++){
					var name = fields[index].name;
					scope.form.data[name].data = scope.grid.data[scope.grid.updateIndex][name].data;
					scope.form.old[name] = scope.form.data[name].data;
				};
			}
		},

		cancelEdit: function(scope, index){
			if(scope.isGrid && scope.isForm){
				if(scope.grid.updateIndex !== undefined)
					scope.grid.updateIndex = "";
				scope.form.clear();
			}
		},

		'delete': function(scope, selected, data, success, failure, error){
			if(scope.isGrid){
				//scope.grid.deleteItems = index;
				var items = angular.copy(selected);
				var data = data || {};
				if(angular.isArray(selected)){
					var key = [];
					for(var index = 0, len = items.length; index < len; index++){
						key.push(scope.grid.data[items[index]].key);
					}
					data["index"] = items;
					data["key"] = key;
				} else {
					data["index"] = items;
					data["key"] = scope.grid.data[items].key;
				}

				if(scope.form.proxy.url !== null){
					scope.grid.remove(scope, data, success, failure, error);
				} else {
					if(!angular.isArray(items)){
						var array = [];
						array.push(items);
						scope.grid.remove(scope, array, success, failure, error);
					} else {
						scope.grid.remove(scope, items, success, failure, error);
					}
					
				}
				
			}
		},
		initAddData: function(scope){
			if(scope.isGrid && scope.isForm){
				for(var name in scope.form.data){
					scope.form.snapshot[name] = scope.form.data[name].data;
				}
			}
		},
		isDirty: function(scope){
			if(scope.isGrid && scope.isForm){
				if(scope.form.old){
					for(var index in scope.form.old){
						if(scope.form.old[index] !== scope.form.data[index].data){
							return true;
						}
					}
				}
				else{
					for(var index in scope.form.snapshot){
						if(scope.form.snapshot[index] !== scope.form.data[index].data)
							return true;
					}
				}
				return false;
			}
		}
	}
}]);

/*
* 常量
*/
suCommon.factory('$const', function(){
	return {
		COUNTRY: {
			ALBANIA: 					"REGION.ALBANIA",
			ALGERIA: 					"REGION.ALGERIA",
			AMERICAN_SAMOA: 			"REGION.AMERICAN_SAMOA",
			ARGENTINA: 					"REGION.ARGENTINA",
			ARMENIA: 					"REGION.ARMENIA",
			AUSTRALIA: 					"REGION.AUSTRALIA",
			AUSTRIA: 					"REGION.AUSTRIA",
			AZERBAIJAN: 				"REGION.AZERBAIJAN",
			BAHAMAS: 					"REGION.BAHAMAS",
			BAHRAIN: 					"REGION.BAHRAIN",
			BELARUS: 					"REGION.BELARUS",
			BANGLADESH: 				"REGION.BANGLADESH",
			BARBADOS: 					"REGION.BARBADOS",
			BELARUS: 					"REGION.BELARUS",
			BELGIUM: 					"REGION.BELGIUM",
			BELIZE: 					"REGION.BELIZE",
			BERUMUDA: 					"REGION.BERUMUDA",
			BOLIVIA: 					"REGION.BOLIVIA",
			BOSNIA_HERZEGOWINA: 		"REGION.BOSNIA_HERZEGOWINA",
			BRAZIL: 					"REGION.BRAZIL",
			BRUNEI_DARUSSALAM: 			"REGION.BRUNEI_DARUSSALAM",
			BULGARIA: 					"REGION.BULGARIA",
			CAMBODIA: 					"REGION.CAMBODIA",
			CANADA: 					"REGION.CANADA",
			CAYMAN_ISLANDS: 			"REGION.CAYMAN_ISLANDS",
			CHILE: 						"REGION.CHILE",
			CHINA: 						"REGION.CHINA",
			COLOMBIA: 					"REGION.COLOMBIA",
			COSTA_RICA: 				"REGION.COSTA_RICA",
			CROATIA: 					"REGION.CROATIA",
			CYPRUS: 					"REGION.CYPRUS",
			CZECH_REPUBLIC: 			"REGION.CZECH_REPUBLIC",
			DENMARK: 					"REGION.DENMARK",
			DOMINICAN_REPUBLIC: 		"REGION.DOMINICAN_REPUBLIC",
			ECUADOR: 					"REGION.ECUADOR",
			EGYPT: 						"REGION.EGYPT",
			EL_SALVADOR: 				"REGION.EL_SALVADOR",
			ETHIOPIA: 					"REGION.ETHIOPIA",
			ESTONIA: 					"REGION.ESTONIA",
			FAEROE_ISLANDS: 			"REGION.FAEROE_ISLANDS",
			FINLAND: 					"REGION.FINLAND",
			FRANCE: 					"REGION.FRANCE",
			FRENCH_GUIANA: 				"REGION.FRENCH_GUIANA",
			FRENCH_POLYNESIA: 			"REGION.FRENCH_POLYNESIA",
			GEORGIA: 					"REGION.GEORGIA",
			GERMANY: 					"REGION.GERMANY",
			GREECE: 					"REGION.GREECE",
			GREENLAND: 					"REGION.GREENLAND",
			GRENADA: 					"REGION.GRENADA",
			GUADELOUPE: 				"REGION.GUADELOUPE",
			GUAM: 						"REGION.GUAM",
			GUATEMALA: 					"REGION.GUATEMALA",
			HAITI: 						"REGION.HAITI",
			HONDURAS: 					"REGION.HONDURAS",
			HONG_KONG: 					"REGION.HONG_KONG",
			HUNGARY: 					"REGION.HUNGARY",
			ICELAND: 					"REGION.ICELAND",
			INDIA: 						"REGION.INDIA",
			INDONESIA: 					"REGION.INDONESIA",
			IRAN: 						"REGION.IRAN",
			IRAQ: 						"REGION.IRAQ",
			IRELAND: 					"REGION.IRELAND",
			ISRAEL: 					"REGION.ISRAEL",
			ITALY: 						"REGION.ITALY",
			JAMAICA: 					"REGION.JAMAICA",
			JAPAN: 						"REGION.JAPAN",
			JAPAN_1: 					"REGION.JAPAN_1",
			JAPAN_2: 					"REGION.JAPAN_2",
			JAPAN_3: 					"REGION.JAPAN_3",
			JAPAN_4: 					"REGION.JAPAN_4",
			JAPAN_5: 					"REGION.JAPAN_5",
			JAPAN_6: 					"REGION.JAPAN_6",
			JORDAN: 					"REGION.JORDAN",
			KAZAKHSTAN: 				"REGION.KAZAKHSTAN",
			KENYA: 						"REGION.KENYA",
			NORTH_KOREA: 				"REGION.NORTH_KOREA",
			KOREA_REPUBLIC: 			"REGION.KOREA_REPUBLIC",
			KOREA_REPUBLIC_3: 			"REGION.KOREA_REPUBLIC_3",
			KUWAIT: 					"REGION.KUWAIT",
			LATVIA: 					"REGION.LATVIA",
			LEBANON: 					"REGION.LEBANON",
			LIBYA: 						"REGION.LIBYA",
			LIECHTENSTEIN: 				"REGION.LIECHTENSTEIN",
			LITHUANIA: 					"REGION.LITHUANIA",
			LUXEMBOURG: 				"REGION.LUXEMBOURG",
			MACAU: 						"REGION.MACAU",
			MACEDONIA: 					"REGION.MACEDONIA",
			MALAWI: 					"REGION.MALAWI",
			MALAYSIA: 					"REGION.MALAYSIA",
			MALDIVES: 					"REGION.MALDIVES",
			MALTA: 						"REGION.MALTA",
			MARTHINIQUE: 				"REGION.MARTHINIQUE",
			MAURITIUS: 					"REGION.MAURITIUS",
			MAYOTTE: 					"REGION.MAYOTTE",
			MEXICO: 					"REGION.MEXICO",
			MONACO: 					"REGION.MONACO",
			MONGOLIA: 					"REGION.MONGOLIA",
			MOROCCO: 					"REGION.MOROCCO",
			NEPAL: 						"REGION.NEPAL",
			NETHERLANDS: 				"REGION.NETHERLANDS",
			NETHERLANDS_ANTILLES: 		"REGION.NETHERLANDS_ANTILLES",
			ARUBA: 						"REGION.ARUBA",
			NEW_ZEALAND: 				"REGION.NEW_ZEALAND",
			NICARAGUA: 					"REGION.NICARAGUA",
			NIGERIA: 					"REGION.NIGERIA",
			NORWAY: 					"REGION.NORWAY",
			NORTHERN_MARIANA_ISLANDS: 	"REGION.NORTHERN_MARIANA_ISLANDS",
			OMAN: 						"REGION.OMAN",
			PAKISTAN: 					"REGION.PAKISTAN",
			PANAMA: 					"REGION.PANAMA",
			PAPUA_NEW_GUINEA: 			"REGION.PAPUA_NEW_GUINEA",
			PARAGUAY: 					"REGION.PARAGUAY",
			PERU: 						"REGION.PERU",
			PHILIPPINES: 				"REGION.PHILIPPINES",
			POLAND: 					"REGION.POLAND",
			PORTUGAL: 					"REGION.PORTUGAL",
			PUERTO_RICO: 				"REGION.PUERTO_RICO",
			QATAR: 						"REGION.QATAR",
			REUNION: 					"REGION.REUNION",
			ROMANIA: 					"REGION.ROMANIA",
			RUSSIA: 					"REGION.RUSSIA",
			RWANDA: 					"REGION.RWANDA",
			SAMOA: 						"REGION.SAMOA",
			SAUDI_ARABIA: 				"REGION.SAUDI_ARABIA",
			SINGAPORE: 					"REGION.SINGAPORE",
			SLOVAK_REPUBLIC: 			"REGION.SLOVAK_REPUBLIC",
			SLOVENIA: 					"REGION.SLOVENIA",
			SOUTH_AFRICA: 				"REGION.SOUTH_AFRICA",
			SPAIN: 						"REGION.SPAIN",
			SRI_LANKA: 					"REGION.SRI_LANKA",
			SURINAME: 					"REGION.SURINAME",
			SWEDEN: 					"REGION.SWEDEN",
			SWITZERLAND: 				"REGION.SWITZERLAND",
			SYRIA: 						"REGION.SYRIA",
			TAIWAN: 					"REGION.TAIWAN",
			TANZANIA: 					"REGION.TANZANIA",
			THAILAND: 					"REGION.THAILAND",
			TRINIDAD_TOBAGO: 			"REGION.TRINIDAD_TOBAGO",
			TUNISIA: 					"REGION.TUNISIA",
			TURKEY: 					"REGION.TURKEY",
			UAE: 						"REGION.UAE",
			UGANDA: 					"REGION.UGANDA",
			UKRAINE: 					"REGION.UKRAINE",
			UNITED_ARAB_EMIRATES: 		"REGION.UNITED_ARAB_EMIRATES",
			UNITED_KINGDOM: 			"REGION.UNITED_KINGDOM",
			UNITED_STATES: 				"REGION.UNITED_STATES",
			URUGUAY: 					"REGION.URUGUAY",
			UZBEKISTAN: 				"REGION.UZBEKISTAN",
			VENEZUELA: 					"REGION.VENEZUELA",
			VIETNAM: 					"REGION.VIETNAM",
			VIRGIN_ISLANDS: 			"REGION.VIRGIN_ISLANDS",
			YEMEN: 						"REGION.YEMEN",
			ZIMBABWE: 					"REGION.ZIMBABWE"
		},
		/*ORDER: {
			"1ST": 						"ORDER.1ST",
			"2ND": 						"ORDER.2ND",
			"3RD": 						"ORDER.3RD",
			"4TH": 						"ORDER.4TH",
			"5TH": 						"ORDER.5TH",
			"1ST_": 					"ORDER.1ST_",
			TH: 						"ORDER.TH"
		},*/
		/*WEEKDAY: {
			MONDAY: 	"DATE.MONDAY",
			TUESDAY: 	"DATE.TUESDAY",
			WEDNESDAY: 	"DATE.WEDNESDAY",
			THURSDAY: 	"DATE.THURSDAY",
			FRIDAY: 	"DATE.FRIDAY",
			SATURDAY: 	"DATE.SATURDAY",
			SUNDAY: 	"DATE.SUNDAY"
		},*/
		/*WEEKDAY_SHORT: {
			MON: "DATE.MON",
			TUES: "DATE.TUES",
			WED: "DATE.WED",
			THUR: "DATE.THUR",
			FRI: "DATE.FRI",
			SAT: "DATE.SAT",
			SUN: "DATE.SUN"		
		},*/
		/*MONTH: {
			JAN: "DATE.JAN",
			FEB: "DATE.FEB",
			MAR: "DATE.MAR",
			APR: "DATE.APR",
			MAY: "DATE.MAY",
			JUN: "DATE.JUN",
			JUL: "DATE.JUL",
			AUG: "DATE.AUG",
			SEP: "DATE.SEP",
			OCT: "DATE.OCT",
			NOV: "DATE.NOV",
			DEC: "DATE.DEC"
		},*/
		/*HOUR: {
			AM_1: "HOUR.AM_1",
			AM_2: "HOUR.AM_2",
			AM_3: "HOUR.AM_3",
			AM_4: "HOUR.AM_4",
			AM_5: "HOUR.AM_5",
			AM_6: "HOUR.AM_6",
			AM_7: "HOUR.AM_7",
			AM_8: "HOUR.AM_8",
			AM_9: "HOUR.AM_9",
			AM_10: "HOUR.AM_10",
			AM_11: "HOUR.AM_11",
			AM_12: "HOUR.AM_12",
			PM_1: "HOUR.PM_1",
			PM_2: "HOUR.PM_2",
			PM_3: "HOUR.PM_3",
			PM_4: "HOUR.PM_4",
			PM_5: "HOUR.PM_5",
			PM_6: "HOUR.PM_6",
			PM_7: "HOUR.PM_7",
			PM_8: "HOUR.PM_8",
			PM_9: "HOUR.PM_9",
			PM_10: "HOUR.PM_10",
			PM_11: "HOUR.PM_11",
			PM_12: "HOUR.PM_12"
		},*/
		TIME_ZONE: {
			"DATELINE_STANDARD_TIME": 				"TIME_ZONE.DATELINE_STANDARD_TIME",
			"UTC-11": 								"TIME_ZONE.UTC-11",
			"UTC-10":								"TIME_ZONE.UTC-10",
			"ALEUTIAN_STANDARD_TIME": 				"TIME_ZONE.ALEUTIAN_STANDARD_TIME",
			"HAWAIIAN_STANDARD_TIME": 				"TIME_ZONE.HAWAIIAN_STANDARD_TIME",
			"MARQUESAS_STANDARD_TIME": 				"TIME_ZONE.MARQUESAS_STANDARD_TIME",
			"UTC-09": 								"TIME_ZONE.UTC-09",
			"ALASKAN_STANDARD_TIME": 				"TIME_ZONE.ALASKAN_STANDARD_TIME",
			"UTC-08": 								"TIME_ZONE.UTC-08",
			"PACIFIC_STANDARD_TIME": 				"TIME_ZONE.PACIFIC_STANDARD_TIME",
			"UTC-07": 								"TIME_ZONE.UTC-07",
			"US_MOUNTAIN_STANDARD_TIME": 			"TIME_ZONE.US_MOUNTAIN_STANDARD_TIME",
			"MOUNTAIN_STANDARD_TIME_(MEXICO)": 		"TIME_ZONE.MOUNTAIN_STANDARD_TIME_(MEXICO)",
			"MOUNTAIN_STANDARD_TIME": 				"TIME_ZONE.MOUNTAIN_STANDARD_TIME",
			"CENTRAL_AMERICA_STANDARD_TIME": 		"TIME_ZONE.CENTRAL_AMERICA_STANDARD_TIME",
			"CENTRAL_STANDARD_TIME": 				"TIME_ZONE.CENTRAL_STANDARD_TIME",
			"EASTER_ISLAND_STANDARD_TIME": 			"TIME_ZONE.EASTER_ISLAND_STANDARD_TIME",
			"CENTRAL_STANDARD_TIME_(MEXICO)": 		"TIME_ZONE.CENTRAL_STANDARD_TIME_(MEXICO)",
			"CANADA_CENTRAL_STANDARD_TIME": 		"TIME_ZONE.CANADA_CENTRAL_STANDARD_TIME",
			"UTC-05": 								"TIME_ZONE.UTC-05",
			"SA_PACIFIC_STANDARD_TIME": 			"TIME_ZONE.SA_PACIFIC_STANDARD_TIME",
			"EASTERN_STANDARD_TIME": 				"TIME_ZONE.EASTERN_STANDARD_TIME",
			"HAITI_STANDARD_TIME": 					"TIME_ZONE.HAITI_STANDARD_TIME",
			"CUBA_STANDARD_TIME": 					"TIME_ZONE.CUBA_STANDARD_TIME",
			"US_EASTERN_STANDARD_TIME": 			"TIME_ZONE.US_EASTERN_STANDARD_TIME",
			"UTC-04": 								"TIME_ZONE.UTC-04",
			"VENEZUELA_STANDARD_TIME": 				"TIME_ZONE.VENEZUELA_STANDARD_TIME",
			"PARAGUAY_STANDARD_TIME": 				"TIME_ZONE.PARAGUAY_STANDARD_TIME",
			"ATLANTIC_STANDARD_TIME": 				"TIME_ZONE.ATLANTIC_STANDARD_TIME",
			"CENTRAL_BRAZILIAN_STANDARD_TIME": 		"TIME_ZONE.CENTRAL_BRAZILIAN_STANDARD_TIME",
			"SA_WESTERN_STANDARD_TIME": 			"TIME_ZONE.SA_WESTERN_STANDARD_TIME",
			"PACIFIC_SA_STANDARD_TIME": 			"TIME_ZONE.PACIFIC_SA_STANDARD_TIME",
			"TURKS_AND_CAICOS_STANDARD_TIME": 		"TIME_ZONE.TURKS_AND_CAICOS_STANDARD_TIME",
			"NEWFOUNDLAND_STANDARD_TIME": 			"TIME_ZONE.NEWFOUNDLAND_STANDARD_TIME",
			"UTC-03": 								"TIME_ZONE.UTC-03",
			"TOCANTINS_STANDARD_TIME": 				"TIME_ZONE.TOCANTINS_STANDARD_TIME",
			"E._SOUTH_AMERICA_STANDARD_TIME":	 	"TIME_ZONE.E._SOUTH_AMERICA_STANDARD_TIME",
			"SA_EASTERN_STANDARD_TIME": 			"TIME_ZONE.SA_EASTERN_STANDARD_TIME",
			"ARGENTINA_STANDARD_TIME": 				"TIME_ZONE.ARGENTINA_STANDARD_TIME",
			"GREENLAND_STANDARD_TIME": 				"TIME_ZONE.GREENLAND_STANDARD_TIME",
			"MONTEVIDEO_STANDARD_TIME": 			"TIME_ZONE.MONTEVIDEO_STANDARD_TIME",
			"SAINT_PIERRE_STANDARD_TIME": 			"TIME_ZONE.SAINT_PIERRE_STANDARD_TIME",
			"BAHIA_STANDARD_TIME": 					"TIME_ZONE.BAHIA_STANDARD_TIME",
			"UTC-02": 								"TIME_ZONE.UTC-02",
			"UTC-01": 								"TIME_ZONE.UTC-01",
			"AZORES_STANDARD_TIME": 				"TIME_ZONE.AZORES_STANDARD_TIME",
			"CAPE_VERDE_STANDARD_TIME": 			"TIME_ZONE.CAPE_VERDE_STANDARD_TIME",
			"UTC": 									"TIME_ZONE.UTC",
			"MOROCCO_STANDARD_TIME": 				"TIME_ZONE.MOROCCO_STANDARD_TIME",
			"GMT_STANDARD_TIME": 					"TIME_ZONE.GMT_STANDARD_TIME",
			"GREENWICH_STANDARD_TIME": 				"TIME_ZONE.GREENWICH_STANDARD_TIME",
			"UTC+01": 								"TIME_ZONE.UTC+01",
			"W._EUROPE_STANDARD_TIME": 				"TIME_ZONE.W._EUROPE_STANDARD_TIME",
			"CENTRAL_EUROPE_STANDARD_TIME": 		"TIME_ZONE.CENTRAL_EUROPE_STANDARD_TIME",
			"ROMANCE_STANDARD_TIME": 				"TIME_ZONE.ROMANCE_STANDARD_TIME",
			"CENTRAL_EUROPEAN_STANDARD_TIME": 		"TIME_ZONE.CENTRAL_EUROPEAN_STANDARD_TIME",
			"NAMIBIA_STANDARD_TIME": 				"TIME_ZONE.NAMIBIA_STANDARD_TIME",
			"UTC+02": 								"TIME_ZONE.UTC+02",
			"JORDAN_STANDARD_TIME": 				"TIME_ZONE.JORDAN_STANDARD_TIME",
			"GTB_STANDARD_TIME": 					"TIME_ZONE.GTB_STANDARD_TIME",
			"MIDDLE_EAST_STANDARD_TIME": 			"TIME_ZONE.MIDDLE_EAST_STANDARD_TIME",
			"EGYPT_STANDARD_TIME": 					"TIME_ZONE.EGYPT_STANDARD_TIME",
			"E._EUROPE_STANDARD_TIME": 				"TIME_ZONE.E._EUROPE_STANDARD_TIME",
			"SYRIA_STANDARD_TIME": 					"TIME_ZONE.SYRIA_STANDARD_TIME",
			"WEST_BANK_STANDARD_TIME": 				"TIME_ZONE.WEST_BANK_STANDARD_TIME",
			"SOUTH_AFRICA_STANDARD_TIME": 			"TIME_ZONE.SOUTH_AFRICA_STANDARD_TIME",
			"FLE_STANDARD_TIME": 					"TIME_ZONE.FLE_STANDARD_TIME",
			"ISRAEL_STANDARD_TIME": 				"TIME_ZONE.ISRAEL_STANDARD_TIME",
			"KALININGRAD_STANDARD_TIME": 			"TIME_ZONE.KALININGRAD_STANDARD_TIME",
			"LIBYA_STANDARD_TIME": 					"TIME_ZONE.LIBYA_STANDARD_TIME",
			"UTC+03": 								"TIME_ZONE.UTC+03",
			"ARABIC_STANDARD_TIME": 				"TIME_ZONE.ARABIC_STANDARD_TIME",
			"TURKEY_STANDARD_TIME": 				"TIME_ZONE.TURKEY_STANDARD_TIME",
			"ARAB_STANDARD_TIME": 					"TIME_ZONE.ARAB_STANDARD_TIME",
			"BELARUS_STANDARD_TIME": 				"TIME_ZONE.BELARUS_STANDARD_TIME",
			"RUSSIAN_STANDARD_TIME": 				"TIME_ZONE.RUSSIAN_STANDARD_TIME",
			"E._AFRICA_STANDARD_TIME": 				"TIME_ZONE.E._AFRICA_STANDARD_TIME",
			"IRAN_STANDARD_TIME": 					"TIME_ZONE.IRAN_STANDARD_TIME",
			"UTC+04": 								"TIME_ZONE.UTC+04",
			"ARABIAN_STANDARD_TIME": 				"TIME_ZONE.ARABIAN_STANDARD_TIME",
			"ASTRAKHAN_STANDARD_TIME": 				"TIME_ZONE.ASTRAKHAN_STANDARD_TIME",
			"AZERBAIJAN_STANDARD_TIME": 			"TIME_ZONE.AZERBAIJAN_STANDARD_TIME",
			"RUSSIA_TIME_ZONE_3": 					"TIME_ZONE.RUSSIA_TIME_ZONE_3",
			"MAURITIUS_STANDARD_TIME": 				"TIME_ZONE.MAURITIUS_STANDARD_TIME",
			"GEORGIAN_STANDARD_TIME": 				"TIME_ZONE.GEORGIAN_STANDARD_TIME",
			"CAUCASUS_STANDARD_TIME": 				"TIME_ZONE.CAUCASUS_STANDARD_TIME",
			"AFGHANISTAN_STANDARD_TIME": 			"TIME_ZONE.AFGHANISTAN_STANDARD_TIME",
			"UTC+05": 								"TIME_ZONE.UTC+05",
			"WEST_ASIA_STANDARD_TIME": 				"TIME_ZONE.WEST_ASIA_STANDARD_TIME",
			"EKATERINBURG_STANDARD_TIME": 			"TIME_ZONE.EKATERINBURG_STANDARD_TIME",
			"PAKISTAN_STANDARD_TIME": 				"TIME_ZONE.PAKISTAN_STANDARD_TIME",
			"INDIA_STANDARD_TIME": 					"TIME_ZONE.INDIA_STANDARD_TIME",
			"SRI_LANKA_STANDARD_TIME": 				"TIME_ZONE.SRI_LANKA_STANDARD_TIME",
			"NEPAL_STANDARD_TIME": 					"TIME_ZONE.NEPAL_STANDARD_TIME",
			"UTC+06": 								"TIME_ZONE.UTC+06",
			"CENTRAL_ASIA_STANDARD_TIME": 			"TIME_ZONE.CENTRAL_ASIA_STANDARD_TIME",
			"BANGLADESH_STANDARD_TIME": 			"TIME_ZONE.BANGLADESH_STANDARD_TIME",
			"OMSK_STANDARD_TIME": 					"TIME_ZONE.OMSK_STANDARD_TIME",
			"MYANMAR_STANDARD_TIME": 				"TIME_ZONE.MYANMAR_STANDARD_TIME",
			"UTC+07": 								"TIME_ZONE.UTC+07",
			"SE_ASIA_STANDARD_TIME": 				"TIME_ZONE.SE_ASIA_STANDARD_TIME",
			"ALTAI_STANDARD_TIME": 					"TIME_ZONE.ALTAI_STANDARD_TIME",
			"W._MONGOLIA_STANDARD_TIME": 			"TIME_ZONE.W._MONGOLIA_STANDARD_TIME",
			"NORTH_ASIA_STANDARD_TIME": 			"TIME_ZONE.NORTH_ASIA_STANDARD_TIME",
			"N._CENTRAL_ASIA_STANDARD_TIME": 		"TIME_ZONE.N._CENTRAL_ASIA_STANDARD_TIME",
			"TOMSK_STANDARD_TIME": 					"TIME_ZONE.TOMSK_STANDARD_TIME",
			"UTC+08": 								"TIME_ZONE.UTC+08",
			"CHINA_STANDARD_TIME": 					"TIME_ZONE.CHINA_STANDARD_TIME",
			"NORTH_ASIA_EAST_STANDARD_TIME": 		"TIME_ZONE.NORTH_ASIA_EAST_STANDARD_TIME",
			"SINGAPORE_STANDARD_TIME": 				"TIME_ZONE.SINGAPORE_STANDARD_TIME",
			"W._AUSTRALIA_STANDARD_TIME": 			"TIME_ZONE.W._AUSTRALIA_STANDARD_TIMES",
			"TAIPEI_STANDARD_TIME": 				"TIME_ZONE.TAIPEI_STANDARD_TIME",
			"ULAANBAATAR_STANDARD_TIME": 			"TIME_ZONE.ULAANBAATAR_STANDARD_TIME",
			"NORTH_KOREA_STANDARD_TIME": 			"TIME_ZONE.NORTH_KOREA_STANDARD_TIME",
			"AUS_CENTRAL_W._STANDARD_TIME": 		"TIME_ZONE.AUS_CENTRAL_W._STANDARD_TIME",
			"UTC+09": 								"TIME_ZONE.UTC+09",
			"TRANSBAIKAL_STANDARD_TIME": 			"TIME_ZONE.TRANSBAIKAL_STANDARD_TIME",
			"TOKYO_STANDARD_TIME": 					"TIME_ZONE.TOKYO_STANDARD_TIME",
			"KOREA_STANDARD_TIME": 					"TIME_ZONE.KOREA_STANDARD_TIME",
			"YAKUTSK_STANDARD_TIME": 				"TIME_ZONE.YAKUTSK_STANDARD_TIME",
			"CEN._AUSTRALIA_STANDARD_TIME": 		"TIME_ZONE.CEN._AUSTRALIA_STANDARD_TIME",
			"AUS_CENTRAL_STANDARD_TIME": 			"TIME_ZONE.AUS_CENTRAL_STANDARD_TIME",
			"UTC+10": 								"TIME_ZONE.UTC+10",
			"E._AUSTRALIA_STANDARD_TIME": 			"TIME_ZONE.E._AUSTRALIA_STANDARD_TIME",
			"AUS_EASTERN_STANDARD_TIME": 			"TIME_ZONE.AUS_EASTERN_STANDARD_TIME",
			"WEST_PACIFIC_STANDARD_TIME": 			"TIME_ZONE.WEST_PACIFIC_STANDARD_TIME",
			"TASMANIA_STANDARD_TIME": 				"TIME_ZONE.TASMANIA_STANDARD_TIME",
			"VLADIVOSTOK_STANDARD_TIME": 			"TIME_ZONE.VLADIVOSTOK_STANDARD_TIME",
			"LORD_HOWE_STANDARD_TIME": 				"TIME_ZONE.LORD_HOWE_STANDARD_TIME",
			"UTC+11": 								"TIME_ZONE.UTC+11",
			"BOUGAINVILLE_STANDARD_TIME": 			"TIME_ZONE.BOUGAINVILLE_STANDARD_TIME",
			"MAGADAN_STANDARD_TIME": 				"TIME_ZONE.MAGADAN_STANDARD_TIME",
			"NORFOLK_STANDARD_TIME": 				"TIME_ZONE.NORFOLK_STANDARD_TIME",
			"SAKHALIN_STANDARD_TIME": 				"TIME_ZONE.SAKHALIN_STANDARD_TIME",
			"CENTRAL_PACIFIC_STANDARD_TIME": 		"TIME_ZONE.CENTRAL_PACIFIC_STANDARD_TIME",
			"UTC+12": 								"TIME_ZONE.UTC+12",
			"RUSSIA_TIME_ZONE_11": 					"TIME_ZONE.RUSSIA_TIME_ZONE_11",
			"NEW_ZEALAND_STANDARD_TIME": 			"TIME_ZONE.NEW_ZEALAND_STANDARD_TIME",
			"FIJI_STANDARD_TIME": 					"TIME_ZONE.FIJI_STANDARD_TIME",
			"CHATHAM_ISLANDS_STANDARD_TIME": 		"TIME_ZONE.CHATHAM_ISLANDS_STANDARD_TIME",
			"UTC+13": 								"TIME_ZONE.UTC+13",
			"TONGA_STANDARD_TIME": 					"TIME_ZONE.TONGA_STANDARD_TIME",
			"SAMOA_STANDARD_TIME": 					"TIME_ZONE.SAMOA_STANDARD_TIME",
			"LINE_ISLANDS_STANDARD_TIME": 			"TIME_ZONE.LINE_ISLANDS_STANDARD_TIME"
		},

		CONN_TYPE: {
			DHCP: "INTERNET.DYNAMIC_IP",
			STATIC: "INTERNET.STATIC_IP",
			BIGPOND: "INTERNET.BIGPOND",
			PPPOE: "INTERNET.PPPOE",
			L2TP: "INTERNET.L2TP",
			PPTP: "INTERNET.PPTP"
		},

		MODE: {
			MODE_B: "WIRELESS.MODE_B",
			MODE_G: "WIRELESS.MODE_G",
			MODE_N: "WIRELESS.MODE_N",
			MODE_BG: "WIRELESS.MODE_BG",
			MODE_GN: "WIRELESS.MODE_GN",
			MODE_BGN: "WIRELESS.MODE_BGN",
			MODE_A_5: "WIRELESS.MODE_A_5",
			MODE_AN_5: "WIRELESS.MODE_AN_5",
			MODE_N_5: "WIRELESS.MODE_N_5",
			MODE_AC_5: "WIRELESS.MODE_AC_5",
			MODE_NAC_5: "WIRELESS.MODE_NAC_5",
			MODE_ANAC_5: "WIRELESS.MODE_ANAC_5"
		},

		APP: {
			QQ:				"APPLIST.QQ",
			MSN:			"APPLIST.MSN",
			LINE:			"APPLIST.LINE",
			Skype:          "APPLIST.SKYPE",
			PPStream: 		"APPLIST.PPSTREAM",
			SIP:  			"APPLIST.SIP",
			PPTC: 			"APPLIST.PPTC", 
			H323: 			"APPLIST.H323",
			HTTPFD: 		"APPLIST.HTTPFD",
			PPTP: 			"APPLIST.PPTP",
			L2TP:  			"APPLIST.L2TP",
			IPSec:          "APPLIST.IPSEC",
			IMAP: 			"APPLIST.IMAP",
			XL_OTHERS:  	"APPLIST.XL_OTHERS",
			VONAGE:  		"APPLIST.VONAGE",
			NETTALK:  		"APPLIST.NETTALK",
			ITALKBB: 		"APPLIST.ITALKBB",
			HTTP: 			"APPLIST.HTTP",
			MMS:  			"APPLIST.MMS",
			RTSP:           "APPLIST.RTSP",
			WOW:			"APPLIST.WOW",
			LOL:			"APPLIST.LOL",
			SSH:			"APPLIST.SSH",
			TELNET:			"APPLIST.TELNET",
			VPN:			"APPLIST.VPN",
			FTP:			"APPLIST.FTP",
			WWW:			"APPLIST.WWW",
			DNS:			"APPLIST.DNS",
			ICMP:			"APPLIST.ICMP",
			SMTP:			"APPLIST.SMTP",
			NNTP:			"APPLIST.NNTP",
			POP3:			"APPLIST.POP3",
			HTTPS:  		"APPLIST.HTTPS",
		}
	}
});

/*
* 云功能
*/
suCommon.factory('$cloud', ['$url', '$proxy', '$timeout', '$msg', function ($url, $proxy, $timeout, $msg) {
	return {
		url: {
			"token": "",
			"cloudOrigin": ""
		},

		deviceInfo: {
			"cloudUserName": "",
			"mac": ""
		},

		globalVar: {
			"waitingId": false,
			"waitingTime": 10*1000
		},

		cloudErrorCode: [
			"E10000","E20002","E20003","E20107","E20200","E20502","E3002",
			"E20503","E20506","E20507","E20508","E20509","E20571","E20580",
			"E20600","E20601","E20602","E20603","E20604","E20606",
			"E20615","E20616","E20617","E20618","E20620","E20661",
			"E20662","E20671","E20672","E20673","E20674","E20675",
			"E22000","E22001","E22002","E22003","E22004","E22006",
			"E22007","E22008","E50101","E50102","E50103","E50111",
			"E50112","E50121","E50122","E50131","E50132","E50140",
			"E51215","E5000", "E5001", "E5002"
		],

		/*****************cloud common function**************************/
		setIframeSrc: function(module){
			var me = this;
			if(module){
				var url = me.url.cloudOrigin + "/cloud_ui_newVI/pages/mobile/index.html?module=" + module;
			    angular.element(document.querySelectorAll("#cloud-login")).attr("src",url);
			    me.setWaitingEvent("ev_watingTimeout");
			}
		},

		//get token from server; if success, set Iframe's src and set wating event(10s timeout)
		tokenRead: function(module, tryTime, proxy){
			var me = this;
			$proxy.request(proxy, {}, function(data){
		        me.url.token = data.token;
		        if(!me.url.token && ++tryTime < 3){
		            me.tokenRead(module, tryTime, proxy);
		        }
		        else{
		        	//tryTime limit, server error
		        	if(!me.url.token){
		                // $(window).trigger("ev_watingTimeout");
		                $timeout(function(){
		                	angular.element(window).triggerHandler('ev_watingTimeout');
		                }, 0);
		        	}else{
		        		//get token success
		        		me.url.cloudOrigin = data.origin_url;
		        		me.setIframeSrc(module);
		        	}
		        }
		    });
		},

		//getToken在云页面需要被内嵌时调用，来获取token和云origin；
		//module参数是将被内嵌的云页面模块，
		//updateFlag参数标记是否强制更新本地缓存token, 
		//hasStok参数用来区别login和index页面。
		getToken: function(module, updateFlag, hasStok){//login.html don't have stok,means it's proxy is different with index.html
			var me = this;
		    me.url = me.url || {};
		    var proxyToken;
		    if(hasStok === false){
		    	proxyToken = $url.format("/login?form=get_token");

		    }else{
			    proxyToken = $url.format("/admin/cloud_account?form=get_token");
			}
		    //don't have token in local web, or token need to be updated. so get token from server.
		    if(!me.url.token || updateFlag){
		        var tryTime = 0;
		        me.tokenRead(module, tryTime, {"url": proxyToken});
		    }
		    else{
				me.setIframeSrc(module);
		    }
		},

		postToken: function(){
			var me = this;
	        var param = {};
	        param.token = me.url.token;
	        param.eType = "ev_token";
	        var str = JSON.stringify(param);
	        window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, me.url.cloudOrigin);
	    },

		//other module will also call this function
		getDeviceInfo: function(hasStok){//login.html don't have stok,means it's proxy is different with index.html
			var me = this;
		    me.deviceInfo = me.deviceInfo || {};
		    if(me.deviceInfo.cloudUserName){
		        //we hava deviceInfo already, don't need to get it from server, send deviceInfo to web cloud directly
		        var params = {};
		        params = me.deviceInfo;
		        params.eType = "ev_deviceInfo";
		        var str = JSON.stringify(params);
		        window.frames["cloud-login"] && window.frames["cloud-login"].postMessage(str, me.url.cloudOrigin);
		        return;
		    }
		    //don't hava deviceInfo yet, get from server and send it to web cloud even deviceInfo is null
		    var proxyDeviceInfo;
		    if(hasStok === false){
		    	proxyDeviceInfo = $url.format("/login?form=get_deviceInfo");
		    }else{
				proxyDeviceInfo = $url.format("/admin/cloud_account?form=get_deviceInfo");
			}
		    $proxy.request({"url": proxyDeviceInfo}, {}, function(data){
		        me.deviceInfo = data;
		        proxyHandler();
		    },function(){
		    	me.deviceInfo = {};
		    	proxyHandler();
		    },function(){
		    	me.deviceInfo = {};
		    	proxyHandler();
		    });
		    var proxyHandler = function(){
		    	if(window.frames["cloud-login"]){
			    	var params = {};
			        params = me.deviceInfo;
			        params.eType = "ev_deviceInfo";
			        var str = JSON.stringify(params);
			        window.frames["cloud-login"].postMessage(str, me.url.cloudOrigin);
			    }
		    };
		},

		iframeResize: function(iframeObj, height){
		    // iframeObj.css({"height":height + 20});
		    // $.su.loading.hide("iframeResize");
		    // $.su.layout.doLayout();
		    for(var i=0; i<$msg.statusMessage.length; i++){
				if($msg.statusMessage[i].tag == "cloud-loading"){
					var waitingMsg = $msg.statusMessage[i];
				}
			}
			waitingMsg.close();
		},

		//after waitingTime, obj will trigger an event(eType), 
		//paramas obj & watingTime is optional, the default obj is $(window), and the defalut watingTime is 10s
		//be careful to use this function!!! only one global watingID!!!
		setWaitingEvent: function(eType, obj, waitingTime){
			var me = this;
			me.globalVar.waitingId= false;
			var time = waitingTime || me.globalVar.waitingTime;
			var tar = obj || window;
			me.globalVar.waitingId = setTimeout(function(){
				$timeout(function(){
                	angular.element(tar).triggerHandler('eType');
                }, 0);
			}, time);
			return true;// setWaiting success
		},

		//function to clear waitingEvent
		clearWaitingEvent: function(){
			var me = this;
			if(me.globalVar.waitingId){
				clearTimeout(me.globalVar.waitingId);
				me.globalVar.waitingId = false;
			}
		}
	}
}]);
