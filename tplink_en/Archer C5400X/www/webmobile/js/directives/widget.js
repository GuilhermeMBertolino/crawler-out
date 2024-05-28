// JavaScript Document
/*
 * menu
 */
su.directive("navigator", ["$route","$location","$module", "$window", "$document", function($route, $location, $module, $window, $document){
	var inHTML =	"<div class=\"widget-navigator-container {{showMenuStatus? '': 'closed'}}\">";
		inHTML +=		"<div class=\"widget-navigator-wrap\">"
		inHTML +=			"<div class=\"widget-navigator-content\">";
		inHTML +=				"<ul class=\"widget-navigator-ul\">";
		inHTML +=					"<li ng-repeat=\"navigator in navigators\" ng-if=\"navigator\" class=\"navigator {{navigator.name}} {{currentPath == navigator.path ? 'selected' : ''}}\" ng-click=\"href(navigator.path)\" >";
		inHTML +=							"<div translate>{{navigator.text}}</div>";
		inHTML +=					"</li>";
		inHTML +=				"</ul>";
		inHTML +=			"</div>";
		inHTML +=			"<div class=\"widget-navigator-end\" ng-click=\"endSelect()\"></div>";
		inHTML +=		"</div>";
		// inHTML +=		"<div class='navigator-mask mask' ng-click='endSelect()'></div>";
		inHTML +=	"</div>";
		
	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		scope: false,
		compile: function(ele,attr){
			 return function($scope,ele,attr){
				$scope.endSelect=function(){
					$scope.showMenuStatus=false;
				}
				// angular.element(ele.find('div')[2]).bind('touchstart',function(e){e.preventDefault();})
				$scope.href=function(a){
					$location.path(a);
					$route.reload();
			
					// $scope.showMenuStatus=false;
				}

				$scope.$on("$routeChangeSuccess", function(e){
					$scope.showMenuStatus=false;
				});

 				$scope.$watch(function(){return $location.$$path}, function(newValue,oldValue){
					$scope.currentPath = newValue;
				},true);
				
				// rebound
				var nav = angular.element(ele.find("div")[0]);

				var startY, deltY;
				var originalTop = 0;
				var touchFlag = false;
				var position;
				var bodyScrollTop, bodyScrollRange;

				function setTransform(obj,setting){
					if(typeof setting === "string"){
						obj.css("transform",setting);
						obj.css("-webkit-transform",setting);
						obj.css("-moz-transform",setting);
						obj.css("-o-transform",setting);
						obj.css("-ms-transform",setting);
					}
				}

				nav.bind("touchstart mousedown", function(e){
					touchFlag = true;
					startY = e.clientY || e.touches[0].clientY;
					position = (ele[0].currentStyle||document.defaultView.getComputedStyle(ele[0])).position;
					if(position !== "fixed"){
						bodyScrollTop = $window.pageYOffset || document.body.scrollTop;
						bodyScrollRange = $window.scrollMax || (document.body.scrollHeight - $window.innerHeight);
					}
				});
				nav.bind("touchmove mousemove", function(e){
					if(touchFlag){
						var scrollTop = ele[0].scrollTop;
						var scrollRange =  ele[0].scrollHeight - ele[0].clientHeight - 1;

						if(scrollTop == 0 && (e.clientY || e.touches[0].clientY)-startY > 0 && (!bodyScrollRange || (bodyScrollTop == 0))){
							e.preventDefault();
							deltY = (e.clientY || e.touches[0].clientY) - startY;
							if(deltY > 0){
								var translate3d = "translate3d(0,"+deltY+"px,0)";
								nav.css("transform", translate3d);
							}
						}else if(scrollTop >= scrollRange && (e.clientY || e.touches[0].clientY)-startY+10 < 0 && (!bodyScrollRange || (bodyScrollTop >= bodyScrollRange))){
							e.preventDefault();
							deltY = (e.clientY || e.touches[0].clientY) - startY;
							if(deltY < 0){
								var translate3d = "translate3d(0,"+deltY+"px,0)";
								nav.css("transform", translate3d);
							}
						}
					}
				});
				nav.bind("touchend mouseup", function(e){
					// e.preventDefault();
					// e.stopPropagation();
					touchFlag = false;
					// var translate3d = "translate3d(0,0,0)";
					nav.css("transform", "");
				});
				ele.bind("scroll", function(e){
					if(!touchFlag){
						if(!position){
							position = (ele[0].currentStyle||document.defaultView.getComputedStyle(ele[0])).position;
							if(position !== "fixed"){
								bodyScrollTop = $window.pageYOffset || document.body.scrollTop;
								bodyScrollRange = $window.scrollMax || (document.body.scrollHeight - $window.innerHeight);
							}
						}
						e.preventDefault();
						var scrollTop = ele[0].scrollTop;
						var scrollRange =  ele[0].scrollHeight - ele[0].offsetHeight - 2;
						if(scrollTop <= 10 && (!bodyScrollRange || bodyScrollTop == 0)){
							var translate3d = "translate3d(0,3rem,0)";
							nav.css("transform", translate3d);
							setTimeout(function(){nav.css("transform", "")},200);
						}else if(scrollTop >= scrollRange-8 && (!bodyScrollRange || (bodyScrollTop >= bodyScrollRange))){
							var translate3d = "translate3d(0,-4rem,0)";
							nav.css("transform", translate3d);
							setTimeout(function(){nav.css("transform", "")},200);
						}
					}
				});
			} 
		}
	}
}]);
/*
 * $msg Directive
 */
su.directive("message", ["$msg", function($msg){
	var inHTML = 	"<div>"
		inHTML += 	"<div ng-if=\"id == undefined\">"
		inHTML +=		"<div ng-repeat=\"message in messages\">"
		inHTML +=			"<div class=\"widget-container widget-message-container\" ng-show=\"message.isShow\">";
		inHTML +=				"<div class=\"mask\"></div>";
		inHTML +=				"<div class=\"widget-message-content-container\">";
		inHTML +=					"<div class=\"widget-message-content-wrap\">";
		inHTML +=						"<div class=\"widget-message-content-wrap-inner\">";
		inHTML += 							"<div class=\"widget-message-header\">";
		inHTML += 								"<h3 ng-if=\"message.title\" class=\"widget-message-title\">{{message.title | translate}}</h3>";
		inHTML += 							"</div>";
		inHTML += 							"<div ng-if=\"message.content\" class=\"widget-message-content\">";
		inHTML += 								"<div ng-if=\"message.iconCls\" class=\"widget-message-icon {{message.iconCls}}\">";
		inHTML +=									"<span class=\"icon\"></span>";
		inHTML +=								"</div>";
		inHTML += 								"<span class=\"widget-message-text\">{{message.content | translate}}</span>";
		inHTML += 							"</div>";
		inHTML += 							"<div class=\"widget-message-footer {{message.cancelBtn.show ? 'button-two' : 'button-one'}}\">"
		inHTML += 								"<div button class=\"widget-message-button left\" ng-if=\"message.okBtn.show\" ng-model=\"message.okBtn\" on-click=\"okHandler(ev,$index)\" text=\"{{message.okBtn.text}}\" cls=\"{{message.okBtn.cls}}\" btn-cls=\"{{message.okBtn.btnCls}}\"></div>";
		inHTML += 								"<div button class=\"widget-message-button right default-choice\" ng-if=\"message.cancelBtn.show\" ng-model=\"message.cancelBtn\" on-click=\"cancelHandler(ev,$index)\" text=\"{{message.cancelBtn.text}}\" cls=\"{{message.cancelBtn.cls}}\" btn-cls=\"{{message.cancelBtn.btnCls}}\"></div>";
		inHTML += 							"</div>";
		inHTML += 						"</div>";
		inHTML += 					"</div>";
		inHTML += 				"</div>";
		inHTML += 			"</div>";
		inHTML += 		"</div>"
		inHTML +=	"</div>"

		inHTML += 	"<div ng-if=\"id != undefined\">"
		inHTML +=		"<div class=\"widget-container widget-message-container\" ng-show=\"message.isShow\">";
		inHTML +=			"<div class=\"mask\"></div>";
		inHTML +=			"<div class=\"widget-message-content-container\">";
		inHTML +=				"<div class=\"widget-message-content-wrap\">";
		inHTML +=					"<div class=\"widget-message-content-wrap-inner\">";
		inHTML += 						"<div class=\"widget-message-header\">";
		inHTML += 							"<h3 ng-if=\"message.title\" class=\"widget-message-title\" translate>{{message.title}}</h3>";
		inHTML += 						"</div>";

		inHTML += 						"<div class=\"widget-message-content\">";
		inHTML += 							"<div ng-if=\"message.iconCls\" class=\"widget-message-icon {{message.iconCls}}\">";
		inHTML +=								"<span class=\"icon\"></span>";
		inHTML +=							"</div>";
		inHTML += 							"<div ng-if=\"message.content\" class=\"widget-message-text\">";
		inHTML += 								"<span>{{message.content | translate}}</span>";
		inHTML += 							"</div>";
		inHTML += 							"<div class=\"widget-message-transclude\" ng-transclude></div>"
		inHTML += 						"</div>";
		inHTML += 						"<div class=\"widget-message-footer {{message.cancelBtn.show ? 'button-two' : 'button-one'}}\">"
		inHTML += 							"<div button class=\"widget-message-button left\" ng-if=\"message.okBtn.show\" ng-model=\"message.okBtn\" on-click=\"okHandler(ev)\" text=\"{{message.okBtn.text}}\" cls=\"{{message.okBtn.cls}}\" btn-cls=\"{{message.okBtn.btnCls}}\"></div>";
		inHTML += 							"<div button class=\"widget-message-button right default-choice\" ng-if=\"message.cancelBtn.show\" ng-model=\"message.cancelBtn\" on-click=\"cancelHandler(ev)\" text=\"{{message.cancelBtn.text}}\" cls=\"{{message.cancelBtn.cls}}\" btn-cls=\"{{message.cancelBtn.btnCls}}\"></div>";
		inHTML += 						"</div>";
		inHTML += 					"</div>";
		inHTML += 				"</div>";
		inHTML += 			"</div>";
		inHTML += 		"</div>";
		inHTML +=	"</div>"
		inHTML +=	"</div>"
	
		return {
			restrict: "A", 	
			template: inHTML,
			replace: true,
			transclude: true,
			scope: {
				id: "@"
			},
			compile: function(tElement, tAttrs, transclude){
				return function(scope, iElement, iAttrs, controller){

					if(scope.id !== undefined){
						scope.$watch(function(){return $msg.localMessage}, function(){
							for (var index = 0, len = $msg.localMessage.length; index < len; index++) {
								if(scope.id == $msg.localMessage[index].id){
									scope.message = $msg.localMessage[index];
								}
							};
							
						}, true);
					} else {
						scope.messages = $msg.globalMessage;
					}	

					scope.okHandler = function(ev ,index){
						ev.preventDefault();
						ev.stopPropagation();
						if(scope.id !== undefined){
							scope.message.okBtn.handler(ev);
						}else{
							scope.messages[index].okBtn.handler(ev);
						}	
					}
					scope.cancelHandler = function(ev, index){
						ev.preventDefault();
						ev.stopPropagation();
						if(scope.id !== undefined){
							scope.message.cancelBtn.handler();
						}else{
							scope.messages[index].cancelBtn.handler();
						}
					}	
				}
			}
	};
}]);

/*
 * Vtype Directive
 */
su.directive("validType", ["$vtype", function($vtype) {

	var inHTML = 	"<div class=\"widget-valid-container\">";
		inHTML += 		"<div class=\"widget-valid-base\" translate ng-show=\"isShow && !isValid\">{{errorMsg | translate}}</div>";
		inHTML += 	"</div>";

	return {
		restrict: "A",
		replace: true,
		scope: {
			value: "=ngModel",
			validType: "@validType",
			validTypeConfig: "=validTypeConfig",
			validationChange: "=validationChange"
		},
		require: "ngModel",
		template: inHTML,
		link: function(scope, ele, attr, ngModel) {
			if (!ngModel) return;
			scope.isShow = false;

			scope.$watch(function() {
				return scope.validationChange;
			}, function() {
				scope.isShow = scope.validationChange;
			})
			scope.isValid = true;
			if (scope.validType) {
				var validator = function(value) {
					scope.isValid = $vtype[scope.validType](value, scope.validTypeConfig);
					if (scope.isValid === true) {
						ngModel.$setValidity(scope.validType, true);
					} else {
						ngModel.$setValidity(scope.validType, false);
						scope.errorMsg = scope.isValid
						scope.isValid = false;
					}
					return scope.isValid ? value : undefined;
				}
				ngModel.$formatters.push(validator);
				ngModel.$parsers.push(validator);
			}
		}
	}
}]);

/*
 *  Textfield Directive
 */
su.directive('textField', ["$timeout", function($timeout){
	var inHTML = 	"<div class=\"widget-container widget-text-container {{textField.valid==true?'ng-valid':'ng-invalid'}} {{unit !== undefined? 'widget-unit-textfield' : ''}}\" ng-class=\"textField.disabled?'widget-disabled-field':''\" ng-hide=\"textField.visible===false\">";
		inHTML +=		"<div label-field label=\"{{label}}\" separator=\"{{separator}}\"></div>";
		inHTML += 		"<div class=\"widget-content-container {{inputCls}}\">";
		inHTML +=			"<div class=\"widget-content {{textField.disabled===true ? 'disabled' : ''}}\">";
		inHTML +=				"<div ng-if=\"mask === 'true'\" class=\"input-mask\"></div>";
		inHTML += 				"<input type=\"{{type}}\" ng-readonly=\"textField.readOnly\" maxLength=\"textField.maxLength\" ng-disabled=\"textField.disabled===true\" class=\"widget-input-base\" placeholder=\"{{placeholder|translate}}\"  ng-model=\"textField.data\" ng-trim=\"{{textField.autoTrim}}\" />";
		inHTML += 			"</div>";
		inHTML += 		"</div>";
		inHTML +=		"<div unit-field unit=\"{{unit}}\"></div>";
		inHTML += 		"<div error-msg value=\"textField\" validation-change=\"validationChange\"></div>";
		inHTML +=		"<div tips-field tips=\"{{tips}}\"></div>";
		inHTML += 	"</div>";

	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		scope:{
			label: "@",
			separator: '@',
			placeholder: '@',
			unit: '@',
			tips: '@',
			textField:"=ngModel",
			inputCls: "@",
			type: "@",
			mask: "@"
		},
		compile: function(ele,attr){

			/*
			 *vlidationChange bind
			 */
			return function($scope, $ele, $attr) {
				/*$scope.$watch("textField.visible",function(){
				})*/	
				$scope.validationChange = false;
				$ele.find("input").bind("focus", function() {
					$scope.validationChange = false;
					$scope.textField.setNormal();
					$scope.$apply()
				}).bind("blur", function() {
					if($scope.textField.data==""){
						if($scope.textField.allowBlank==false){
							$scope.textField.setError("ERROR.e000218");
						}
					}else{
						$scope.validationChange = true;
					}
					$scope.$apply()
				});	
				$ele.find('input').bind('focus',function(e){
					var o=e.srcElement||e.target;
					if($scope.textField.maxLength>0)o.maxLength=$scope.textField.maxLength;
				});
				if($scope.mask && $scope.mask.toString() == "true"){
					$timeout(function(){
						angular.element($ele[0].querySelectorAll(".input-mask")).addClass("hidden");
					}, 500, false);
				}
			}
		}
	}
}]);
/*
*	display Directive
*/
su.directive('displayField', ["$translate", "$format", "$tool", function($translate, $format, $tool){
	var inHTML =	"<div class=\"widget-container widget-display-container\" ng-hide=\"config.visible===false\">";
		inHTML +=		"<div label-field label=\"{{label}}\"  separator=\"{{separator}}\" ></div>";
		inHTML += 		"<div class=\"widget-content-container\">";
		inHTML +=			"<div class=\"widget-content\">";
		inHTML += 				"<span translate class=\"widget-display-base\"></span>";
		inHTML +=			"</div>"
		inHTML += 		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: 'A',
		replace: true,
		template:inHTML,
		scope:{
			label:'@',
			separator:"@",
			config:'=ngModel'
		},
		compile: function(ele,attr){
			return function(scope, ele, attr) {
				scope.snapshot = "";
				scope.$watch(function(){return scope.config}, function(newVal, oldVal){
					if(angular.isObject(scope.config)){
						var format = scope.config.format;
						if(format !== undefined && format !== null){
							scope.snapshot = $format[format](scope.config.data);
						} else {
							scope.snapshot = scope.config.data;
						}

						$translate(scope.snapshot).then(function (data) {
							angular.element(ele.find("span")[2]).html($tool.escapeHtml(data));
						});
						
					}
				}, true)
				
			}
		}
	}
}]);
/*
 *  Labelfield Directive
 */
su.directive("labelField", function(){
	var inHTML = 	"<div class=\"widget-label-container\">";
		inHTML += 		"<label class=\"widget-label-base\">"
		inHTML +=			"<span translate class=\"widget-label-text\"></span>";
		inHTML +=			"<span class=\"widget-label-separator\"></span>";
		inHTML +=		"</label>";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		link: function($scope,ele, attr){
			var sep= attr.separator;
			var label=$scope.label||attr.label;
			if(label=='space'){
				
			}else if(label){
				angular.element(ele.find("span")[0]).html($scope.label||attr.label);
				if(sep === ""){
					sep = ":";
				} else if (sep === "space"){
					sep = "";
				}
				angular.element(ele.find("span")[1]).html(sep);
			}else{
				ele.addClass('hidden');
				
			}
		}
	};
});

/*
*unit
*/
su.directive("unitField", function(){
	var inHTML = 	"<div class=\"widget-unit-container\">";
		inHTML += 		"<div translate class=\"widget-unit-base\">"
		inHTML +=		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		link: function($scope, ele, attr){
			if(attr.unit){
				angular.element(ele.find("div")[0]).html(attr.unit);
			}else{
				ele.addClass('hidden');//如果没有单位就添加隐藏类
			}
		}
	};
});

/*
*tips
*/
su.directive("tipsField", function(){
	var inHTML = 	"<div class=\"widget-tips-container\">";
		inHTML += 		"<div translate class=\"widget-tips-base\">"
		inHTML +=		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		link: function($scope,ele, attr){
			if(attr.tips){
				angular.element(ele.find("div")[0]).html(attr.tips);
			}else{
				ele.addClass('hidden');
			}
		}
	};
});
	
su.directive("errorMsg", ["$vtype", function($vtype) {
	var inHTML = 	"<div class=\"widget-error-container\" ng-show=\"value.errorMsg.visible\" id=\"{{value.errorMsg.visible ? 'error-msg' : ''}}\">";
		//inHTML += 		"<div class=\"widget-error-base\" translate ng-show=\"validationChange && !value.valid && !value.errorMsg.visible\">{{vtypeMsg | translate}}</div>";
		inHTML += 		"<div class=\"widget-error-icon\"><span class=\"icon\"></span></div>";
		//inHTML += 		"<div class=\"widget-error-base\" translate>{{value.errorMsg.content | translate}}</div>";
		inHTML += 		"<div class=\"widget-error-base\" ng-show=\"numberMax\">";
		inHTML += 			"<span translate translate>ERROR.e000031</span>";
		inHTML += 			"<span translate>{{value.vtype.config.max}}</span>";
		inHTML += 		"</div>";
		inHTML += 		"<div class=\"widget-error-base\" ng-show=\"numberMin\">";
		inHTML += 			"<span translate translate>ERROR.e000030</span>";
		inHTML += 			"<span translate>{{value.vtype.config.min}}</span>";
		inHTML +=		"</div>";
		inHTML += 		"<div class=\"widget-error-base\" ng-show=\"numberBetween\">";
		inHTML += 			"<span translate translate>ERROR.e000032</span>";
		inHTML += 			"<span translate>{{value.vtype.config.min}}</span>";
		inHTML += 			"<span translate translate>ERROR.e000033</span>";
		inHTML += 			"<span translate>{{value.vtype.config.max}}</span>";
		inHTML +=		"</div>";
		inHTML += 		"<div class=\"widget-error-base\" ng-show=\"!numberMax&&!numberMin&&!numberBetween\">";
		inHTML += 			"<span translate>{{value.errorMsg.content | translate}}</span>";
		inHTML +=		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		scope: {
			//validType: "@type",//value.vtype.type
			//validTypeConfig: "=typeConfig",//value.vtype.config
			value: "=",
			validationChange: "="
		},
		template: inHTML,
		link: function(scope, ele, attr) {
			scope.isValid = true;

			scope.$watch("validationChange", function(newValue) {
				if(scope.validationChange == true){
					scope.numberBetween = false;
					scope.numberMax = false;
					scope.numberMin = false;
					var value = angular.isDefined(scope.value.encryption) ? scope.value.inputData : scope.value.data;
					if(scope.value.minLength != -1){
						if(angular.isString(value) && value.length < scope.value.minLength){
							scope.value.setError("ERROR.e000001");
							return;
						}
					}

					if(scope.value.maxLength != -1){
						if(angular.isString(value) && value.length > scope.value.maxLength){
							scope.value.setError("ERROR.e000001");
							return;
						}
					}

					if (angular.isObject(scope.value.vtype)) {
						if(scope.value.vtype.vtype){
							if(scope.value.vtype.config){
								scope.isValid = $vtype[scope.value.vtype.vtype](value, scope.value.vtype.config);
								if (scope.isValid !== true) {
									if(scope.value.vtype.vtype=="number" || scope.value.vtype.vtype=="float_number"){
										if(scope.isValid !== "ERROR.e000001"){
											if(scope.value.vtype.config.max!== null && scope.value.vtype.config.max !== undefined){
												if(scope.value.vtype.config.min!== null && scope.value.vtype.config.min !== undefined){
													scope.numberBetween = true;
												}else{
													scope.numberMax = true;
												}
											}else if(scope.value.vtype.config.min!== null && scope.value.vtype.config.min !== undefined){
												scope.numberMin = true;
											}
										}
									}
									scope.value.setError(scope.isValid || "ERROR.e000001");
									return;
										
								}
							}else{
								scope.isValid = $vtype[scope.value.vtype.vtype](value);
								if (scope.isValid !== true) {
									scope.value.setError(scope.isValid || "ERROR.e000001");
									return;
								}
							}
							
						}
					}else if(scope.value.vtype !== null){
						scope.isValid = $vtype[scope.value.vtype](value);
						if (scope.isValid !== true) {
							scope.value.setError(scope.isValid || "ERROR.e000001");
							return;
						}
					}else if(scope.value.validatechange !== null){
						scope.isValid = scope.value.validatechange();
						if (scope.isValid !== true) {
							return;
						}
					}

					if(scope.isValid){
						scope.value.setNormal()
					}
				}
			})
		}
	}
}]);
/*
 * Password Directive
 */
su.directive("password", ["$encrypt", function($encrypt) {
	var inHTML = 	"<div class=\"widget-container widget-password-container {{config.valid?'ng-valid':'ng-invalid'}}\" ng-class=\"config.disabled?'widget-disabled-field':''\"  ng-form=\"{{name}}_form\" ng-hide=\"config.visible===false\"> ";
		inHTML += 		"<div label-field label=\"{{label}}\"  separator=\"{{separator}}\"></div>";
		inHTML += 		"<div class=\"widget-content-container\">";
		inHTML +=			"<div class=\"widget-content {{config.disabled===true ? 'disabled' : ''}}\">";
		inHTML += 				"<input class=\"widget-input-base widget-input-password\" type=\"password\" ng-model=\"config.inputData\" ng-disabled=\"config.disabled===true\" maxLength=\"config.maxLength\" ng-readonly=\"config.readOnly===true\"/ placeholder=\"{{placeholder|translate}}\">";
		inHTML += 			"</div>";
		inHTML += 			"<div class=\"widget-visible-base\" ng-show=\"{{btnVisible==undefined ? true : btnVisible}}\"></div>";
		inHTML += 		"</div>";
		inHTML += 		"<div error-msg value=\"config\" validation-change=\"validationChange\"></div>";
		inHTML += 		"<div class=\"widget-password-level-container\"  ng-show=\"{{levelVisible==undefined?true:levelVisible}}\">";
		inHTML += 			"<span translate class=\"level low\">PASSWORD.LOW</span>";
		inHTML += 			"<span translate class=\"level middle\">PASSWORD.MIDDLE</span>";
		inHTML += 			"<span translate class=\"level high\">PASSWORD.HIGH</span>";
		inHTML += 		"</div>";
		inHTML += 	"</div>";


	return {
		restrict: "A",
		replace: true,
		scope: {
			config: "=ngModel",
			separator:"@",
			type: "@vtype",
			name: "@name",
			btnVisible: "=",
			levelVisible: "=",
			label: "@",
			placeholder:"@"
		},
		template: inHTML,
		controller: ["$scope",function($scope) {
			$scope.defaults = {
				readOnly: false,
				disabled: false,
				visible: true,
				valid:false
			}
			$scope.config.inputData = "";
			if(!angular.isObject($scope.config.encryption) && $scope.config.encryption!="confirm"){
				$scope.config.encryption = null;
			}else{
				$scope.config.key = {};
			}
		}],
		compile: function(ele, attr) {
			var children = ele.find('div');
			//var initFlag = false;




			ele.find("input").attr('name', ele.attr('name'));

			return function($scope, $ele, $attr) {
				//var key;
				
				$scope.isShow = false;

				var levelCheck = function(value) {
					//var point = 0;
					var level = 0;
					if (value) {

						/*
						var charLength = value.length;
						if (0 < charLength && charLength <= 4) {
							point += 5;
						} else if (4 < charLength && charLength <= 7) {
							point += 10;
						} else if (charLength > 7) {
							point += 25;
						};
						*/
						var flagUp = 0,
							flagLow = 0,
							flagNum = 0,
							flagSign = 0,
							largeLenghth = 0;

						var charLength = value.length;

						var patternLowCase = /[a-z]/g;
						var patternUpCase = /[A-Z]/g;
						var patternNum = /[0-9]/g;
						var patternSign = /[\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\x20]/g;

						flagLow = patternLowCase.test(value)?1:0;
						flagUp = patternUpCase.test(value)?1:0;
						flagNum = patternNum.test(value)?1:0;
						flagSign = patternSign.test(value)?1:0;
						largeLenghth = charLength>=10?1:0;

						level = flagLow + flagUp + flagNum + flagSign + largeLenghth;
					}

					var lv = 3;
					if(level <= 0){
						lv = 3;
					}else if(charLength <= 5){
						if(level <= 2){
							// low
							lv = 0;
						}
						else if(level >= 3 && level <= 4){
							// middle
							lv = 1;
						}
					}else if(charLength > 5){
						if(level <= 1){
							// low
							lv = 0;
						}else if(level >=2 && level <= 3){
							// middle
							lv = 1;
						}else if(level >= 4){
							// high
							lv = 2;
						}
					}
					/*
					 * computing level
					 */
					return lv
				};

				var setLevel = function(index) {
					var level = angular.element($ele.children()[3])
					if (index != 3) {
						level.children().removeClass("selected");
						angular.element(level.children()[index]).addClass("selected");
					} else {
						level.children().removeClass("selected");
					}
				};

				/*var doEncrypt = function() {
					var value = $scope.config.inputData;
					if(angular.isObject($scope.config.encryption)){
						var encrypt = $scope.config.encryption.method;
						var encryptParam = $scope.config.encryption.params;

						

						var check = true;
						var param = [];
						for (var index = 0, len = encryptParam.length; index < len; index++) {
							var name = encryptParam[index];
							if (key[name] == null || key[name] == undefined) {
								check = false;
								break;
							}else{
								param[index] = key[name];
							};
						};
						if (check&&value!=undefined) {
							$scope.config.data = encrypt(value, param);
						}else{
							$scope.config.data = value;
						};
					}else{
						$scope.config.data = value;
					}
				};*/
				$scope.$watch("config.data",function(newValue){
					if(angular.isArray(newValue)&&angular.isObject($scope.config.encryption)){
						if($scope.config.encryption.name=="rsa"){
							$scope.config.key = {
								"n": $scope.config.data[0],
								"e": $scope.config.data[1]
							};
						}
					}
				}, true)

				//$scope.encryptParameter = $scope.config.data;
				if (!($scope.config.disabled==undefined?$scope.defaults.disabled:$scope.config.disabled)) {
					angular.element(angular.element($ele.children()[1])[1]).find('div').bind("click", function() {
						if ($ele.find("input")[0].type == "password") {
							$ele.find("input")[0].type = "text";
						} else {
							$ele.find("input")[0].type = "password";
						}
					});
					$scope.$watch(function() {
						return $scope.config.inputData;
					}, function(newValue, oldValue) {
						/*if(initFlag==false){
							initFlag = true;
							return;
						}*/
						
						$scope.level = levelCheck($scope.config.inputData);
						setLevel($scope.level);
						
					});
				};

				$scope.validationChange = false;
				$ele.find("input").bind("focus", function() {
					$scope.validationChange = false;
					$scope.config.setNormal();
					$scope.$apply()
				}).bind("blur", function() {

					if($scope.config.inputData==""||$scope.config.inputData==undefined){
						if($scope.config.allowBlank==false){
							$scope.config.setError("ERROR.e000218");
						}
					}else{
						$scope.validationChange = true;
					}
					$scope.$apply()

					/*if(initFlag==false&&angular.isObject($scope.config.encryption)){
						initFlag = true;
						if($scope.config.encryption.name=="rsa"){
							key = {
								"n": $scope.config.data[0],
								"e": $scope.config.data[1]
							};
						}else if($scope.config.encryption.name=="md5"){
							key = {
								//md5 key
							};
						}
						
					}
					if($scope.config.valid&&$scope.config.validated){
						doEncrypt();
					}*/
				});
				$ele.find('input').bind('focus',function(e){
					var o=e.srcElement||e.target;
					if($scope.config.maxLength>0)o.maxLength=$scope.config.maxLength;
				});
			};
		}
	}
}]);
/*
*ipField 
*/
su.directive('ipField',["$swipe","$rootScope",function($swipe,$rootScope){

	
	var inHTML = 	"<div class=\"widget-container widget-ip-container {{ipAll.valid?'ng-valid':'ng-invalid'}}\" ng-class=\"ipAll.disabled?'widget-disabled-field':''\" ng-hide=\"ipAll.visible===false\" ng-form>";
		inHTML += 		"<div label-field label=\"{{label}}\" separator=\"{{separator}}\"></div>";
		inHTML +=		"<div class=\"widget-content-container\">";
		inHTML +=			"<div class=\"widget-content widget-content-ip {{ipAll.disabled?'disabled':''}}\">";
		inHTML +=				"<div class=\"widget-content-ip-wrapper\">";
		inHTML +=				"<div class=\"widget-ip-base\" ng-bind=\"ip.ip0\" ng-click=\"\">";
		inHTML +=				"</div>";
		inHTML +=				"<span class=\"widget-input-separator-base\">.</span>";
		inHTML +=				"<div class=\"widget-ip-base\" ng-bind=\"ip.ip1\">";
		inHTML +=				"</div>";
		inHTML +=				"<span class=\"widget-input-separator-base\">.</span>";
		inHTML +=				"<div class=\"widget-ip-base\" ng-bind=\"ip.ip2\">";
		inHTML +=				"</div>";
		inHTML +=				"<span class=\"widget-input-separator-base\">.</span>";
		inHTML +=				"<div class=\"widget-ip-base\" ng-bind=\"ip.ip3\">";
		inHTML +=				"</div>";
		
		inHTML +=				"</div>";
		inHTML +=				"<input type=\"num\" class=\"cover\" maxlength=\"3\"/>";
		inHTML +=			"</div>";
		inHTML +=			"<div ng-show=\"showPlaceholder\" ng-click=\"hidePlaceholder()\" class=\"widget-placeholder\">{{placeholder|translate}}</div>"
		inHTML +=		"</div>";
		inHTML += 		"<div error-msg value=\"ipAll\" validation-change=\"validationChange\"></div>";

		inHTML +=	"</div>";

	return {
		restrict: "A",
		replace: true,
		template:inHTML,
		//require: "ngModel",
		scope: {
			label:'@',
			separator:"@",
			placeholder:"@",
			ipAll: "=ngModel",
			type: "@vtype"
		},
		controller: ["$scope", function($scope){
			$scope.ip = {
				ip0: "",
				ip1: "",
				ip2: "",
				ip3: ""
			};
			$scope.showPlaceholder=false;
			$scope.validationChange = false;
		}],
		compile: function(ele, attr){
			return function($scope, ele, attr){
			
				$swipe.bind(ele.find("input"), {
					"end": function(coords,e){
						ele.find("input")[0].focus();
						var divWidth = ele[0].getElementsByClassName("widget-ip-base")[0].offsetWidth,
							divLeft = ele[0].getElementsByClassName("widget-content-ip-wrapper")[0].offsetLeft,
							spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;
						e.preventDefault();
						//if(coords.x>(divLeft+4*divWidth+3*spanWidth)) return;
						$scope.index=Math.floor((coords.x-divLeft)/(divWidth+0.5*$rootScope.rootFontSize));
						$scope.index=$scope.index>3?3:$scope.index;
						$scope.index=$scope.index<0?0:$scope.index;
						e.target.value=$scope['ip']['ip'+$scope.index];
						e.target.style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
						e.target.setSelectionRange(3,3);
						e.target.className='';
						e.preventDefault();
						$scope.validationChange = false;
						$scope.ipAll.setNormal();
						$scope.$apply();
					}
				});

				$swipe.bind(angular.element(ele[0].querySelectorAll(".widget-content-container")[0]), {
					"end": function(coords,e){
						var divWidth = ele[0].getElementsByClassName("widget-ip-base")[0].offsetWidth,
							divLeft = ele[0].getElementsByClassName("widget-content-ip-wrapper")[0].offsetLeft,
							spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;
						//if(coords.x>(divLeft+4*divWidth+3*spanWidth)) return;
						$scope.index=Math.floor((coords.x-divLeft)/(divWidth+0.5*$rootScope.rootFontSize));
						$scope.index=$scope.index>3?3:$scope.index;
						$scope.index=$scope.index<0?0:$scope.index;
						ele.find('input')[0].value=$scope['ip']['ip'+$scope.index];
						ele.find('input')[0].style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
						ele.find('input')[0].setSelectionRange(3,3);
						ele.find('input')[0].className='';
						e.preventDefault();
						$scope.validationChange = false;
						$scope.ipAll.setNormal();
						$scope.$apply();
					}
				});
				ele.find("input").bind('blur',function(e){
					e.preventDefault();
					this.style.left='';
					this.className='cover';
					if($scope.ipAll.data==""){
						if($scope.ipAll.allowBlank==false){
							$scope.ipAll.setError("ERROR.e000218");
						}										
					}else{
						$scope.validationChange = true;
					}
					$scope.showPlaceholder= ($scope.ipAll.data=='' && $scope.placeholder!=undefined);
					$scope.$apply();
				});

				var moveBefore = false;
				ele.find("input").bind('keydown',function(e){
					var divWidth = ele[0].getElementsByClassName("widget-ip-base")[0].offsetWidth,
						divLeft = ele[0].getElementsByClassName("widget-content-ip-wrapper")[0].offsetLeft,
						spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;
						
					if((e.keyCode<=57&&e.keyCode>=48)||e.keyCode==190||e.keyCode==8||(e.keyCode<=105&&e.keyCode>=96)||e.keyCode==229){
						if(e.keyCode==8&&this.value.length==0&&$scope.index>0){
							e.preventDefault();
							$scope.index--;
							this.value=$scope['ip']['ip'+$scope.index];
							this.setSelectionRange(0,3);
							moveBefore = true;
						}
						// else if($scope.index<3&&((e.keyCode==190&&this.value.length>0)||(this.value.length>2))&&e.keyCode!=8&&(this.selectionEnd-this.selectionStart==0)){
						// 	e.preventDefault();
						// 	$scope.index++;
						// 	this.value=$scope['ip']['ip'+$scope.index];
						// 	this.setSelectionRange(0,3);
						// }
						// else if($scope.index==3&&(this.value.length==3&&e.keyCode!=8&&(this.selectionEnd-this.selectionStart==0)||e.keyCode==190)||e.keyCode==190&&this.value.length==0){
						// 	e.preventDefault(); 
						// }
					}
					else{
						e.preventDefault();
					}
					this.style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
				});
				
				ele.find("input").bind('keyup',function(e){
					var inputData = this.value;
					var len = inputData.length;
					var lastChar = inputData.charAt(len-1);

					//this.value = this.value.match(/(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)/g);
					this.value = this.value.match(/(\d\d\d|\d\d|\d)/g);

					if(moveBefore){
						this.setSelectionRange(0,3);
						moveBefore = false;
					}

					var divWidth = ele[0].getElementsByClassName("widget-ip-base")[0].offsetWidth,
						divLeft = ele[0].getElementsByClassName("widget-content-ip-wrapper")[0].offsetLeft,
						spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;

					var moveNext = function(t){
						e.preventDefault();
						$scope.index++;
						t.value=$scope['ip']['ip'+$scope.index];
						t.setSelectionRange(0,3);
					};

					if($scope.index>=0 && $scope.index<=2){
						if(this.value.length>2&&(this.selectionEnd-this.selectionStart==0)){
							$scope['ip']['ip'+$scope.index]=this.value;
							moveNext(this);
						}
						else if(lastChar == "."){
							if(this.value.length>0&&this.value.length<3&&(this.selectionEnd-this.selectionStart==0)){
								moveNext(this);
							}
						};
						this.style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
					}

					e.preventDefault();
					$scope['ip']['ip'+$scope.index]=this.value;
					$scope.$apply();
				});

				$scope.$watch(function(){
					return $scope.ipAll.data;
				}, function(){
					if ($scope.ipAll){
						if($scope.ipAll.data){
							var ip = $scope.ipAll.data.split(".");
							$scope.ip.ip0 = ip[0]||'';
							$scope.ip.ip1 = ip[1]||'';
							$scope.ip.ip2 = ip[2]||'';
							$scope.ip.ip3 = ip[3]||'';
							$scope.showPlaceholder=false;
						}else{
							$scope.showPlaceholder= ($scope.ipAll.data=='' && $scope.placeholder!=undefined);
						}
					}
				});
				$scope.$watch(function(){
					return $scope.ip;
				},function(){
					if($scope.ip){
						for(var i in $scope.ip){
							$scope.ip[i] = $scope.ip[i].replace(/\D/g, '').slice(0,3);
						};

						var value = $scope.ip.ip0.replace(/\D/g, '') + '.';
							value += $scope.ip.ip1.replace(/\D/g, '') + '.';
							value += $scope.ip.ip2.replace(/\D/g, '') + '.';
							value += $scope.ip.ip3.replace(/\D/g, '') ;
						
						$scope.ipAll.data = (value=='0.0.0.0'||value=='...')?'':value;

					};
				}, true);

				$scope.hidePlaceholder = function(){
					$scope.showPlaceholder = false;					
				}
			}
			
		}
	}
}]);

/*
*macField
*/
su.directive('macField',["$swipe","$rootScope",function($swipe,$rootScope){
		
		var inHTML =	"<div class=\"widget-container widget-mac-container {{macAll.valid?'ng-valid':'ng-invalid'}}\" ng-class=\"macAll.disabled?'widget-disabled-field':''\" ng-hide=\"macAll.visible===false\" ng-form>";
			inHTML +=		"<div label-field label='{{label}}' separator=\"{{separator}}\"></div>";
			inHTML +=		"<div class=\"widget-content-container\">";
			inHTML +=			"<div class=\"widget-content widget-content-mac\">";
			inHTML +=				"<div class=\"widget-content-mac-wrapper\">";
			inHTML +=				"<div class=\"widget-mac-base\" ng-bind=\"mac.mac0\" ng-click=\"\">";
			inHTML +=				"</div>";
			inHTML +=				"<span class=\"widget-input-separator-base\">-</span>";
			inHTML +=				"<div class=\"widget-mac-base\" ng-bind=\"mac.mac1\">";
			inHTML +=				"</div>";
			inHTML +=				"<span class=\"widget-input-separator-base\">-</span>";
			inHTML +=				"<div class=\"widget-mac-base\" ng-bind=\"mac.mac2\">";
			inHTML +=				"</div>";
			inHTML +=				"<span class=\"widget-input-separator-base\">-</span>";
			inHTML +=				"<div class=\"widget-mac-base\" ng-bind=\"mac.mac3\">";
			inHTML +=				"</div>";
			inHTML +=				"<span class=\"widget-input-separator-base\">-</span>";
			inHTML +=				"<div class=\"widget-mac-base\" ng-bind=\"mac.mac4\">";
			inHTML +=				"</div>";
			inHTML +=				"<span class=\"widget-input-separator-base\">-</span>";
			inHTML +=				"<div class=\"widget-mac-base\" ng-bind=\"mac.mac5\">";
			inHTML +=				"</div>";
			
			inHTML +=				"</div>";
			inHTML +=				"<input type=\"url\" class=\"cover\"/>";
			inHTML +=			"</div>";
			inHTML +=		"</div>";
			inHTML +=		"<div error-msg value=\"macAll\" validation-change=\"validationChange\"></div>";
			inHTML +=	"</div>";

		return {
			restrict: "A",
			replace: true,
			template: inHTML,
			scope:{
				label: "@",
				separator:'@',
				macAll: "=ngModel",
				type: "@vtype"
			},
			controller: ["$scope", function($scope){
				$scope.mac={
					mac0: "",
					mac1: "",
					mac2: "",
					mac3: "",
					mac4: "",
					mac5: ""
				};
			}],
			compile: function(ele,attr){
				return function($scope,ele,attr){
					$swipe.bind(ele.find("input"), {
						"end": function(coords,e){
							ele.find("input")[0].focus();
							var divWidth = ele[0].getElementsByClassName("widget-mac-base")[0].offsetWidth,
								divLeft = ele[0].getElementsByClassName("widget-content-mac-wrapper")[0].offsetLeft,
								spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;
							e.preventDefault();
							//if(coords.x>(divLeft+divWidth*6+spanWidth*5)) return;
							$scope.index=Math.floor((coords.x-divLeft)/(divWidth+0.5*$rootScope.rootFontSize));
							$scope.index=$scope.index>5?5:$scope.index;
							$scope.index=$scope.index<0?0:$scope.index;
							e.target.value=$scope['mac']['mac'+$scope.index];
							e.target.style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
							e.target.setSelectionRange(2,2);
							e.target.className='';
							e.preventDefault();
							$scope.validationChange = false;
							$scope.macAll.setNormal();
							$scope.$apply();
						}
					});
				$swipe.bind(angular.element(ele[0].querySelectorAll(".widget-content-container")[0]), {
					"end": function(coords,e){
						var divWidth = ele[0].getElementsByClassName("widget-mac-base")[0].offsetWidth,
							divLeft = ele[0].getElementsByClassName("widget-content-mac-wrapper")[0].offsetLeft,
							spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;
						//if(coords.x>(divLeft+divWidth*6+spanWidth*5)) return;
						$scope.index=Math.floor((coords.x-divLeft)/(divWidth+0.5*$rootScope.rootFontSize));
						$scope.index=$scope.index>5?5:$scope.index;
						$scope.index=$scope.index<0?0:$scope.index;
						ele.find('input')[0].value=$scope['mac']['mac'+$scope.index];
						ele.find('input')[0].style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
						ele.find('input')[0].setSelectionRange(2,2);
						ele.find('input')[0].className='';
						e.preventDefault();
						$scope.validationChange = false;
						$scope.macAll.setNormal();
						$scope.$apply();
					}
				});
					ele.find("input").bind('blur',function(e){
						e.preventDefault();
						this.style.left='';
						this.className='cover';
						if($scope.macAll.data==""){
							if($scope.macAll.allowBlank==false){
								$scope.macAll.setError("ERROR.e000218");
							}										
						}else{
							$scope.validationChange = true;
						}
						$scope.showPlaceholder= ($scope.macAll.data=='' && $scope.placeholder!=undefined);
						$scope.$apply();
					});

					var moveBefore = false;
					ele.find("input").bind('keydown',function(e){
						var divWidth = ele[0].getElementsByClassName("widget-mac-base")[0].offsetWidth,
							divLeft = ele[0].getElementsByClassName("widget-content-mac-wrapper")[0].offsetLeft,
							spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;

						if((e.keyCode<=57&&e.keyCode>=48)||(e.keyCode<=90&&e.keyCode>=65)||e.keyCode==189||e.keyCode==8||e.keyCode==229){
							if(e.keyCode==8&&this.value.length==0&&$scope.index>0){
								e.preventDefault();
								$scope.index--;
								this.value=$scope['mac']['mac'+$scope.index];
								this.setSelectionRange(0,2);
								moveBefore = true;
							}
							// else if($scope.index<5&&(e.keyCode==189||this.value.length>1)&&e.keyCode!=8&&(this.selectionEnd-this.selectionStart==0)){
							// 	e.preventDefault();
							// 	$scope.index++;
							// 	this.value=$scope['mac']['mac'+$scope.index];
							// 	this.setSelectionRange(0,2);
							// }else if($scope.index==5&&(this.value.length==2&&e.keyCode!=8&&(this.selectionEnd-this.selectionStart==0)||e.keyCode==190)){
							// 	e.preventDefault();
							// }
						}
						else{
							e.preventDefault();
						}
						this.style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
					});
					
					ele.find("input").bind('keyup',function(e){

						var inputData = this.value;
						var len = inputData.length;
						var lastChar = inputData.charAt(len-1);

						//this.value = this.value.match(/(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)/g);
						this.value = this.value.match(/([0-9a-fA-F]{2,2}|[0-9a-fA-F]{1,1})/g);

						if(moveBefore){
							this.setSelectionRange(0,2);
							moveBefore = false;
						}

						var divWidth = ele[0].getElementsByClassName("widget-mac-base")[0].offsetWidth,
							divLeft = ele[0].getElementsByClassName("widget-content-mac-wrapper")[0].offsetLeft,
							spanWidth = ele[0].getElementsByClassName("widget-input-separator-base")[0].offsetWidth;

						var moveNext = function(t){
							e.preventDefault();
							$scope.index++;
							t.value=$scope['mac']['mac'+$scope.index];
							t.setSelectionRange(0,3);
						};

						if($scope.index>=0 && $scope.index<=4){
							if(this.value.length>1&&(this.selectionEnd-this.selectionStart==0)){
								$scope['mac']['mac'+$scope.index]=this.value;
								moveNext(this);
							}
							else if(lastChar == "-"){
								if(this.value.length>0&&this.value.length<2&&(this.selectionEnd-this.selectionStart==0)){
									moveNext(this);
								}
							};
							this.style.left=$scope.index*divWidth+$scope.index*spanWidth+divLeft+'px';
						}

						e.preventDefault();
						$scope['mac']['mac'+$scope.index]=this.value;
						$scope.$apply();
					});


					$scope.$watch(function(){
						return $scope.macAll.data;
					}, function(){
						if ($scope.macAll){
							if($scope.macAll.data){
								var mac = $scope.macAll.data.split("-");
								$scope.mac.mac0 = mac[0]||'';
								$scope.mac.mac1 = mac[1]||'';
								$scope.mac.mac2 = mac[2]||'';
								$scope.mac.mac3 = mac[3]||'';
								$scope.mac.mac4 = mac[4]||'';
								$scope.mac.mac5 = mac[5]||'';
								$scope.showPlaceholder=false;
							}else{
								$scope.showPlaceholder= ($scope.macAll.data=='' && $scope.placeholder!=undefined);
							}
						}
					});
					$scope.$watch(function(){
						return $scope.mac;
					},function(){
						if($scope.mac){
							for(var i in $scope.mac){
								$scope.mac[i]=$scope.mac[i].replace(/[^a-fA-F0-9]|\s/g,'').slice(0,2).toUpperCase();
							};

							var value = $scope.mac.mac0 + '-';
								value += $scope.mac.mac1 + '-';
								value += $scope.mac.mac2 + '-';
								value += $scope.mac.mac3 + '-';
								value += $scope.mac.mac4 + '-';
								value += $scope.mac.mac5 ;
							$scope.macAll.data = value=='-----'?'':value;
							ele.find('input')[0].value=$scope["mac"]["mac"+$scope.index];
						};
					}, true);

					$scope.hidePlaceholder = function(){
						$scope.showPlaceholder = false;					
					}
				}
			}
		}
	}]);
/*
 *  ipfield Directive
 */
/*
 *  macfield Directive
 */
/*
 * Button Directive
 */
su.directive("button", function() {
	var inHTML = 	"<div ng-disabled=\"config.disabled==undefined?defaults.disabled:config.disabled\" class=\"widget-container widget-button-container {{cls}}\" ng-class=\"config.disabled?'widget-disabled-field':''\" ng-click=\"onClick({ev:$event})\" ng-hide=\"config.visible===false\"> ";
		inHTML += 		"<div class=\"widget-icon-container \">";
		inHTML += 			"<div class=\"widget-icon-base {{iconCls}}\">";
		//inHTML += 				"<span class=\"icon\"></span>";
		inHTML += 			"</div>";
		inHTML += 		"</div>"
		inHTML += 		"<div class=\"widget-button-content\">";
		inHTML += 			"<button translate type=\"{{type || 'button'}}\" class=\"widget-button-base {{btnCls}}\" ng-disabled=\"config.disabled==undefined?defaults.disabled:config.disabled\">{{text?text:''|translate}}</button>";
		inHTML += 		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		scope: {
			config: "=ngModel",
			btnCls: "@btnCls",
			cls: "@cls",
			//pressedCls: "@pressedCls",
			iconCls: "@iconCls",
			text: "@text",
			onClick : "&onClick",
			type: "@"
		},
		template: inHTML,
		controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs){
			$scope.defaults = {
				disabled: false,
				visible: true
			};
		}],
		link:function($scope, $element, $attrs){
		}
	}
});

/*
*Switch Directive
*/
su.directive('switchField', ["$proxy", function($proxy){
		var inHTML=		"<div class=\"widget-container widget-switch-container\" ng-class=\"switchKv.disabled?'widget-disabled-field':''\" ng-hide=\"switchKv.visible===false\">";
			inHTML+=		"<div label-field label=\"{{label}}\" separator=\"space\"></div>";
			inHTML+=		"<div ng-disabled=\"switchKv.disabled\">";
			inHTML+=			"<div class='widget-switch-base' ng-switch on='status' ng-click=\"switchChange()\">";
			inHTML+=				"<div class='widget-switch-status-on' ng-switch-default value='{{switchKv.value.options.onValue}}'></div>";
			inHTML+=				"<div class='widget-switch-status-off' ng-switch-when=false value='{{switchKv.value.options.offValue}}'></div>";
			inHTML+=			"</div>";
			inHTML+=		"</div>";
			inHTML+=	"</div>";
		return {
			restrict: "A",
			scope:  {
				label: "@label",
				separator: "@",
				switchKv: "=ngModel"
			},
			replace: true,
			template:inHTML,
			/*controller: function($scope){

			},*/
			compile: function(ele,attr){
				//inputField
				return function($scope,ele,attr){


					$scope.status=$scope.switchKv.data==$scope.switchKv.options['onValue']?true:false;
					$scope.switchKv.data=$scope.status?$scope.switchKv.options['onValue']:$scope.switchKv.options['offValue'];
					ele[0].getElementsByClassName('widget-switch-base')[0].style.borderColor=$scope.status?'#96cc56':'#a5a5a5';
					$scope.switchChange = function(){

						if($scope.switchKv.disabled===true)return ;
						$scope.status=!$scope.status;
						$scope.switchKv.data=$scope.status?$scope.switchKv.options['onValue']:$scope.switchKv.options['offValue'];
						//$scope.$apply();
						ele[0].getElementsByClassName('widget-switch-base')[0].style.borderColor=$scope.status?'#96cc56':'#a5a5a5';
						
						if(angular.isDefined($scope.switchKv.proxy.field)){
							$scope.switchKv.proxy.data[$scope.switchKv.proxy.field] = $scope.switchKv.data;
						}
						
						$proxy.request($scope.switchKv.proxy.options, $scope.switchKv.proxy.data, $scope.switchKv.proxy.success, $scope.switchKv.proxy.failure, $scope.switchKv.proxy.error);
					};

					$scope.$watch(function(){return $scope.switchKv.data},function(){
						$scope.status=$scope.switchKv.data==$scope.switchKv.options['onValue']?true:false;
					}) 
				}
			}
		}
	}]);	
/*
*combo Directive
*/
su.directive('comboField', function(){

		var inHTML="<div class=\"widget-container widget-combo-container {{comboApp.valid?'ng-valid':'ng-invalid'}}\" ng-class=\"comboApp.disabled?'widget-disabled-field':''\" ng-hide=\"comboApp.visible===false\">";
			inHTML +=	"<div label-field label=\"{{label}}\"  separator=\"{{separator}}\"></div>";
			inHTML += 	"<div class=\"widget-content-container\">";
			inHTML +=		"<div class=\"widget-content {{comboApp.disabled===true ? 'disabled' : ''}}\">";
			inHTML +=			"<div class=\"widget-combo-base\">";
			inHTML +=				"<div class=\"widget-combo-select\">";
			/*inHTML+=					"<div class='comboPlaceholder' ng-click='show()'>";
			inHTML+=						"{{placeholder}}<span>icon</span>";
			inHTML+=					"</div>";
			inHTML+=					"<div class='comboOption-container' ng-show='selectMode'>";
			inHTML+=					"<div ng-click='select(key,value)' class='comboOption' ng-repeat='(value,key) in comboKv' value='{{value}}'>{{key}}</div>";
			inHTML+=					"</div>";*/
			inHTML +=					"<div class=\"widget-combo-text\">";
			inHTML +=						"<span class=\"text\">{{selectData.name||emptyText | translate}}</span>"
			inHTML +=					"</div>";
			inHTML +=					"<div class=\"widget-combo-icon\">";
			inHTML +=						"<span class=\"icon\"></span>";
			inHTML +=					"</div>";
			inHTML +=					"<select ng-change=\"onChange()\" ng-disabled=\"comboApp.options.length === 0 || comboApp.disabled===true\" ng-model=\"selectData\" ng-options=\"app.name | translate for app in comboApp.options\"><option value=\"\" disabled=\"true\" translate>FORM.SELECT_OPTIONS</option></select>";
			inHTML +=				"</div>";
			inHTML +=			"</div>";
			inHTML +=		"</div>";
			inHTML +=	"</div>";
			inHTML +=	"<div error-msg value=\"comboApp\" validation-change=\"validationChange\"></div>";
			inHTML +="</div>";

		return {
			scope:  {
				label:'@',
				separator: "@",
				comboApp:'=ngModel',
				onChange: "&onChange",
				type:'@'
			},
			restrict: 'A',
			replace: true,
			template:inHTML,
			compile: function(ele,attr){
				return function($scope,ele,attr){
					if(!$scope.selectData){
						//emptyText用于做combo空值显?
						$scope.emptyText = "FORM.SELECT_OPTIONS";
						$scope.selectData = {};
					}
					/*$scope.selectMode=false;
					$scope.placeholder='Select Options';*/
					$scope.$watch(function(){return $scope.selectData},function(){
						if($scope.selectData&&$scope.selectData.value)
						$scope.comboApp.data = $scope.selectData.value;
					})
					$scope.$watch(function(){return $scope.comboApp.data},function(newValue, oldValue){
						if (!$scope.comboApp.options){
							$scope.comboApp.options = [];
						};

						$scope.selectData = {};
						for(var i = 0;i< $scope.comboApp.options.length; i++){
							
							if($scope.comboApp.data == $scope.comboApp.options[i]['value']){
								$scope.selectData = $scope.comboApp.options[i];
								var j=1;
								// for(var j in $scope.comboApp.options[i])
								// $scope.selectData[j] = $scope.comboApp.options[i][j];
							}
						}
						if(!j){
							/*if(!$scope.comboApp.data)
								$scope.selectData = $scope.comboApp.options[0]
							else
								$scope.emptyText = $scope.comboApp.data;*/
							if($scope.type=='time')	$scope.emptyText = $scope.comboApp.data;
						}
						if(angular.isFunction($scope.comboApp.changeHandler)){
							$scope.comboApp.changeHandler(newValue, oldValue);
						}
						
						
					},true)

					// 下拉校验存在问题
					// angular.element(ele.find("select")[0]).bind("blur",function(){
					// 	if(!$scope.comboApp.allowBlank&&$scope.comboApp.data==""){
					// 		$scope.comboApp.valid = false
					// 	}else{
					// 		$scope.comboApp.valid = true
					// 	}
					// })
					angular.element(ele.find("select")[0]).bind("focus",function(){
						if($scope.comboApp.setNormal){
							$scope.comboApp.setNormal();
						}
						
					})
				}
			}
		}
	});

/*TimePicker 控件*/
su.directive('timePicker',["$swipe", function($swipe){
	var str='<div class="widget-time-picker-container">';
		str+='	<div class="widget-time-picker-clock">';
		str+='		<div class="event" value="{{$index}}" ng-repeat="a in [0,1,2,3,4,5,6,7,8,9,10,11]" >';
		//str+=			'<div class="event-wrapper">';
		str+=				'<div class="border" ng-class="showLi[$index]?\'selectTime\':\'\'" ng-click="singleTime($event)"></div>';
		//str+=			'</div>';
		str+=		'</div>';
		str+='		<div class="widget-time-picker-hour">{{sum[showWeek][showM]}}<span>h</span></div>';
		str+='		<div class="widget-time-picker-all-hour">';
		str+='			<span>1</span>';
		str+='			<span>2</span>';
		str+='			<span>3</span>';
		str+='			<span>4</span>';
		str+='			<span>5</span>';
		str+='			<span>6</span>';
		str+='			<span>7</span>';
		str+='			<span>8</span>';
		str+='			<span>9</span>';
		str+='			<span>10</span>';
		str+='			<span>11</span>';
		str+='			<span>12</span>';
		str+='		</div>';
		str+='	</div>';
		str+='	<div class="widget-time-picker-meridiem">';
		str+='		<span class="{{showM==\'AM\'?\'selectTime\':\'\'}}">AM</span>';
		str+='		<span class="{{showM==\'PM\'?\'selectTime\':\'\'}}">PM</span>';
		str+='	</div>';
		str+='	<div class="widget-mode-container">';
		str+='		<div class="widget-single-mode" ng-class="showSingleMode?\'\':\'marginleft\'">';
		str+='			<div class="widget-time-picker-mode">Single-Selection Mode</div>';
		str+='			<div class="widget-time-picker-week">';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'sun\'?\'selectTime\':\'\'"><span>Sun</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'mon\'?\'selectTime\':\'\'"><span>Mon</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'tue\'?\'selectTime\':\'\'"><span>Tue</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'wed\'?\'selectTime\':\'\'"><span>Wed</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'thu\'?\'selectTime\':\'\'"><span>Thu</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'fri\'?\'selectTime\':\'\'"><span>Fri</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showWeek==\'sat\'?\'selectTime\':\'\'"><span>Sat</span></div>';
		str+='			</div>';
		str+='		</div>';
		str+='		<div class="widget-multi-mode">';
		str+='			<div class="widget-time-picker-mode">Multi-Selection Mode</div>';
		str+='			<div class="widget-time-picker-week">';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'sun\')>-1?\'selectTime\':\'\'"><span>Sun</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'mon\')>-1?\'selectTime\':\'\'"><span>Mon</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'tue\')>-1?\'selectTime\':\'\'"><span>Tue</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'wed\')>-1?\'selectTime\':\'\'"><span>Wed</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'thu\')>-1?\'selectTime\':\'\'"><span>Thu</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'fri\')>-1?\'selectTime\':\'\'"><span>Fri</span></div>';
		str+='				<div class="widget-time-picker-week-cover" ng-class="showMultiWeek.indexOf(\'sat\')>-1?\'selectTime\':\'\'"><span>Sat</span></div>';
		str+='			</div>';
		str+='		</div>';
		str+='	</div>';
		str+='</div>';
	return {
		restrict: 'AE',
		template:str,
		replace:false,
		scope:{
			timeData:'=ngModel'
		},
		compile:function(){
			return function($scope,ele,attr){
				$scope.showDate={};//用于值与视图之间的转?
				$scope.sum={};
				/*
				 *值操作：获取值转化成视图
				*/
				$scope.dataToShowDate=function(){
					//0-1是给AM[0]赋值true
					var timeData = angular.copy($scope.timeData.data);
					
					timeData= timeData!=""?angular.fromJson(timeData):[];
					$scope.showDate={};
					var week=['sun','mon','tue','wed','thu','fri','sat'];
					for(var i in week){
						$scope.showDate[week[i]]={};
						$scope.showDate[week[i]]['AM']=[false,false,false,false,false,false,false,false,false,false,false,false]
						$scope.showDate[week[i]]['PM']=[false,false,false,false,false,false,false,false,false,false,false,false]
						
						$scope.sum[week[i]]={};
						$scope.sum[week[i]]['AM']=0;
						$scope.sum[week[i]]['PM']=0;
						for(var j=0;timeData[week[i]]&&j<timeData[week[i]].length;j++){
							for(var k=0;k<timeData[week[i]][j][1]-timeData[week[i]][j][0];k++){
								if(timeData[week[i]][j][0]+k<12){
									$scope.showDate[week[i]]['AM'][timeData[week[i]][j][0]+k]=true;
									$scope.sum[week[i]]['AM']++;

								}else{
									$scope.showDate[week[i]]['PM'][(timeData[week[i]][j][0]+k)%12]=true;
									$scope.sum[week[i]]['PM']++;
								}
							}
						}
					}
					
				}
				$scope.$watch(function(){return $scope.timeData.data},function(newValue){
					
					if(typeof newValue!='string')return;
					if($scope.timeData.save==1){
						$scope.timeData.save = 0;
						return;
					}
					$scope.dataToShowDate();
					$scope.showLi=$scope.showDate[$scope.showWeek][$scope.showM];
				});
				
				//将视图转化成?
				$scope.$watch(function(){return $scope.timeData.save},function(nv,ov){
					if(nv==1){
						var data={},tmp,tmpMatch,timeList=[],len;
						var outData = {};
						for(var i in $scope.showDate){
							tmp='';
							data[i]=$scope.showDate[i]['AM'].concat($scope.showDate[i]['PM']);
							for(var j in data[i])
								tmp+=j+data[i][j]
							tmpMatch=tmp.match(/(\d+true)+/g);
							for(var k=0;tmpMatch&&k<tmpMatch.length;k++){
								tmp=tmpMatch[k].split('true')[0];
								len=tmpMatch[k].split('true').length;
								timeList.push([tmp*1,tmp*1+len-1]);
							}
							
							data[i]=timeList;
							if(timeList.length !== 0){
								outData[i]=timeList;
							}
							timeList=[];
							
						}
						$scope.timeData.data = outData;

						$scope.timeData.data = angular.copy(angular.toJson($scope.timeData.data))
					}
				})
				/*
				 *	以下是view操作
				*/
				$scope.showWeek='sun';
				$scope.showMultiWeek=$scope.showWeek;
				$scope.showM='AM';
				$scope.showSingleMode=true;
				$scope.showLi;
				$scope.touchstart=false;
				$scope.changeTarget;
				ele.find('span').bind('touchstart',function(){
					var innerHTML;
					
					if(!$scope.touchstart){
						if(this.innerHTML=='AM'||this.innerHTML=='PM'){
							$scope.showM=this.innerHTML;
						}else{
							innerHTML = this.innerHTML.toLowerCase();
							if($scope.showSingleMode){
								$scope.showWeek=innerHTML;
								$scope.showMultiWeek=$scope.showWeek;
							}
							else{
								if($scope.showMultiWeek.indexOf(innerHTML)>-1){
									if($scope.showMultiWeek !== innerHTML){
										$scope.showMultiWeek=$scope.showMultiWeek.replace(innerHTML,'');
										$scope.showWeek = $scope.showMultiWeek.slice(0,3);
										for(var i=0;i<12;i++){
											$scope.showDate[innerHTML]["AM"][i]=false;
											$scope.showDate[innerHTML]["PM"][i]=false;
											$scope.sum[innerHTML]['AM']=0;
											$scope.sum[innerHTML]['PM']=0;
										}
									}
								}else{
									$scope.showMultiWeek+=innerHTML;
									$scope.showWeek = $scope.showMultiWeek.slice(0,3);
									$scope.sum[innerHTML]['AM']=0;
									$scope.sum[innerHTML]['PM']=0;
									for(var i=0;i<12;i++){
										$scope.showDate[innerHTML]["AM"][i]=$scope.showDate[$scope.showWeek]["AM"][i];
										$scope.showDate[innerHTML]["PM"][i]=$scope.showDate[$scope.showWeek]["PM"][i];
										$scope.showDate[$scope.showWeek]["AM"][i]?$scope.sum[innerHTML]['AM']++:123;
										$scope.showDate[$scope.showWeek]["PM"][i]?$scope.sum[innerHTML]['PM']++:123;
									}
								}
							}
						}
						$scope.showLi=$scope.showDate[$scope.showWeek][$scope.showM];
						$scope.$apply();
					}
				});

				var opertationToShow = function(o){
					if($scope.showSingleMode){
						$scope.showLi[o.parentNode.getAttribute('value')]=!$scope.showLi[o.parentNode.getAttribute('value')];
						$scope.showLi[o.parentNode.getAttribute('value')]?$scope.sum[$scope.showWeek][$scope.showM]++:$scope.sum[$scope.showWeek][$scope.showM]--;
					}else{
						if($scope.showMultiWeek){
							$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][o.parentNode.getAttribute('value')]=!$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][o.parentNode.getAttribute('value')];
							$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][o.parentNode.getAttribute('value')]?$scope.sum[$scope.showMultiWeek.slice(0,3)][$scope.showM]++:$scope.sum[$scope.showMultiWeek.slice(0,3)][$scope.showM]--;
							for(var i=1;i<$scope.showMultiWeek.length/3;i++){
								$scope.sum[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM]=0;
									for(var j=0;j<12;j++){
										$scope.showDate[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM][j]=$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][j];
										$scope.showDate[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM][j]?$scope.sum[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM]++:'';
									}
							}
						}
					}
				}
				angular.element(ele.find('div')[1]).bind('touchstart mousedown',function(event){
					$scope.touchstart=true;
				});
				angular.element(ele.find('div')[1]).bind('touchmove mousemove',function(event){
					if($scope.touchstart){
						event.preventDefault();
						var o=document.elementFromPoint(event.clientX||event.changedTouches[0].clientX,event.clientY||event.changedTouches[0].clientY);
						if(o && o.parentNode && o.parentNode.parentNode && o.nodeName === "DIV"){
							if(o.parentNode.parentNode.className=='widget-time-picker-clock'&&$scope.changeTarget!=o.parentNode.getAttribute('value')){
								/*
								if($scope.showSingleMode){
									$scope.showLi[o.parentNode.getAttribute('value')]=!$scope.showLi[o.parentNode.getAttribute('value')];
									$scope.showLi[o.parentNode.getAttribute('value')]?$scope.sum[$scope.showWeek][$scope.showM]++:$scope.sum[$scope.showWeek][$scope.showM]--;
								}else{
									if($scope.showMultiWeek){
										$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][o.parentNode.getAttribute('value')]=!$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][o.parentNode.getAttribute('value')];
										$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][o.parentNode.getAttribute('value')]?$scope.sum[$scope.showMultiWeek.slice(0,3)][$scope.showM]++:$scope.sum[$scope.showMultiWeek.slice(0,3)][$scope.showM]--;
										for(var i=1;i<$scope.showMultiWeek.length/3;i++){
											$scope.sum[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM]=0;
											for(var j=0;j<12;j++){
												$scope.showDate[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM][j]=$scope.showDate[$scope.showMultiWeek.slice(0,3)][$scope.showM][j];
												$scope.showDate[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM][j]?$scope.sum[$scope.showMultiWeek.slice(3*i,3*(i+1))][$scope.showM]++:'';
											}
										}
									}
								}
								*/
								opertationToShow(o);
								$scope.changeTarget=o.parentNode.getAttribute('value');
								$scope.$apply();
							}
						}
					}
					// }else if(!event.clientX){
						// o=event.target||event.srcElement;
						// if(o.className=='widget-mode-container'||o.className=='widget-single-mode'||o.className=='widget-multi-mode'){
							// event.preventDefault();
							// if(event.changedTouches){
							// 	if(event.changedTouches[0].clientX-$scope.touchX>50)
							// 		$scope.showSingleMode=true;
							// 	else if(event.changedTouches[0].clientX-$scope.touchX<-50)
							// 		$scope.showSingleMode=false;
							// }
							//$scope.touchX=event.changedTouches[0].clientX;
						// }
							
						// if($scope.showSingleMode)$scope.showWeek=$scope.showMultiWeek.slice(0,3);
						// else $scope.showMultiWeek=$scope.showWeek;
						// $scope.$apply();
					// }
					
				});
				// ele.bind('click',function(event){
					// o=event.target||event.srcElement;
					
					// if(o.className=='widget-time-picker-mode'){

						// $scope.showSingleMode=!$scope.showSingleMode;
					// }
					// if($scope.showSingleMode)$scope.showWeek=$scope.showMultiWeek.slice(0,3);
					// else $scope.showMultiWeek=$scope.showWeek;
					// $scope.$apply();
				// })
				angular.element(ele.find('div')[1]).bind('touchend mouseup',function(){
					$scope.touchstart=false;
				});

				$scope.singleTime = function(event){
					var o = event.target;
					opertationToShow(o);
				}

				var startX, startY;
				var modeEle = angular.element(ele[0].getElementsByClassName("widget-mode-container")[0]);
				$swipe.bind(modeEle, {
					"start": function(coords){
						startX = coords.x;
					},
					"move": function(coords){
						if(startX !== false){
							if(coords.x - startX > 62){
								$scope.showSingleMode=true;
							} else if (coords.x - startX < -62){
								$scope.showSingleMode=false;
							}
							$scope.$apply();
						}
					},
					"end":function(coords){
						startX = false;
					}
				})
				
				// setTimeout(function(){
				// 	for(var i=0; i<12; i++){
				// 		ele[0].getElementsByClassName("event")[i].style.overflow = "hidden";
				// 	}
				// },100);

			};
		}
	}
}])
/*
*FormHeader Directive
*/
su.directive("formHeader",function(){

	var inHTML = 	"<div class=\"form-header-container\">";
		inHTML +=		"<div class=\"form-header\">";
		inHTML += 			"<div class=\"form-header-left-container\">";
		inHTML += 		"</div>";
		inHTML += 			"<div class=\"form-header-center-container\">";
		inHTML += 			"<h3 translate class=\"title\"></h3>";
		inHTML += 		"</div>";
		inHTML += 			"<div class=\"form-header-right-container\">";
		inHTML += 			"</div>";
		inHTML += 		"</div>";
		inHTML += 	"</div>";

	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		transclude:true,
		scope:{
			title:"@"
		},
		controller:["$scope","$element","$attrs","$transclude", function($scope,$element,$attrs,$transclude){
			var leftBtn = null;
			var rightBtn = null;
			var children = $element.find('div').find("div");
			$transclude(function(clone){
				for(var index = 0;index<clone.length;index++){
					if(clone[index].nodeType=='1'&&clone[index].hasAttribute('button')){
						if(clone[index].attributes.position.value=="left"){
							if(!leftBtn){
								leftBtn = clone[index];
							}else{
								throw new Error('You have more than one left btn')
							}
						}else if(clone[index].attributes.position.value=="right") {
							if(!rightBtn){
								rightBtn = clone[index];
							}else{
								throw new Error('You have more than one right btn')
							}							
						}else{
							throw new Error('Button has no position');
						}
					}
				}
			})
			leftBtn?children[0].appendChild(leftBtn):null;
			rightBtn?children[2].appendChild(rightBtn):null;

			angular.element($element.find("h3")[0]).html($scope.title);
		}]
	}
});

/*
 *grid Directive
 */
su.directive("grid", ["$timeout", "$msg", function($timeout, $msg) {

	var inHTML  = 	"<div class=\"form-container widget-grid-container\">"
		inHTML += 		"<div form-header title=\"{{config.gridTitle}}\" ng-show=\"cancelBtn.visible&&!isEditing.showEditor\">";
		inHTML +=			"<div button position=\"left\" text=\"{{cancelBtn.text}}\" ng-model=\"cancelBtn\" on-click=\"hideSelectField()\" class=\"widget-grid-cancle\"></div>";
		inHTML +=			"<div button position=\"right\"text=\"{{editBtn.text}}\" ng-model=\"editBtn\" on-click=\"showSelectField()\"></div>";
		inHTML += 		"</div>";
		inHTML += 		"<div form-header title=\"{{config.gridTitle}}\" ng-show=\"!cancelBtn.visible&&!isEditing.showEditor\">";
		inHTML +=			"<div button position=\"left\" cls=\"button-back\" icon-cls=\"back-button\" text=\"{{backMenuBtn.text}}\" on-click=\"backMenuBtn.onClick()\" ng-model=\"backMenuBtn\"></div>";
		inHTML +=			"<div button position=\"right\"text=\"{{editBtn.text}}\" ng-model=\"editBtn\" on-click=\"showSelectField()\"></div>";
		inHTML += 		"</div>";
		inHTML += 		"<div class=\"widget-grid-content-container\"  on=\"config.editable && isEditing.showEditor\" ng-switch>";
		inHTML += 			"<div class=\"widget-grid-loading-container widget-status-container\">";
		inHTML += 				"<div class=\"widget-status-wrap\" ng-show=\"loading&&!isEditing.showEditor\">";
		inHTML += 					"<div class=\"widget-status-content\">";
		inHTML += 						"<div class=\"widget-status-icon-base widget-status-icon-waiting\"></div>";
		inHTML += 						"<div translate class=\"widget-status-text-base\">FORM.LOADING</div>";
		inHTML += 					"</div>";
		inHTML += 				"</div>";
		inHTML += 				"<div class=\"widget-grid-loading-content\" ng-show=\"pullDown&&!loading&&!isEditing.showEditor\">";
		inHTML += 					"<div translate class=\"widget-grid-loading-text\">FORM.PULL_TO_REFRESH</div>"
		inHTML += 				"</div>";
		inHTML += 			"</div>";
		inHTML += 			"<div class=\"fieldset-container widget-grid-content\" ng-show=\"!isEditing.showEditor\">";
		inHTML +=				"<div grid-legend-field title=\"{{config.legendTitle}}\" count=\"config.countable ? grid.data.length : null\" ng-if=\"config.legendTitle\" ng-show=\"grid.data.length !== 0\"></div>";
		inHTML += 				"<div class=\"fieldset-content-container\" ng-show=\"grid.data.length !== 0\">";
		inHTML += 					"<div class=\"widget-list-container\">";
		inHTML += 						"<div row ng-repeat=\"row in grid.data\" >";
		inHTML += 						"</div>";
		inHTML += 					"</div>";
		 					
		inHTML += 				"</div>";
		inHTML +=				"<div class=\"widget-list-null-container\" ng-show=\"grid.data.length === 0\">";
		inHTML += 					"<div class=\"widget-list-null-icon {{config.nullIconCls}}\">";
		inHTML += 					"</div>";
		inHTML += 					"<div class=\"widget-list-null-text\">";
		inHTML +=						"<span translate>{{config.nullText}}</span>"
		inHTML += 					"</div>";
		//inHTML += 					"<div class=\"widget-list-null-button\">";
		inHTML += 					"<div button cls=\"widget-list-null-btn-wrap\" btn-cls=\"widget-list-null-btn\" text=\"{{nullBtn.text}}\" ng-model=\"nullBtn\" on-click=\"startAddRow(ev)\"></div>";
		//inHTML += 					"</div>";
		inHTML += 				"</div>";
		inHTML += 			"</div>"


		inHTML += 			"<div class=\"widget-grid-button-container\" ng-show=\"!isEditing.showEditor && config.removable && showSelectFlag\">";
		inHTML +=				"<div class=\"button-group\">";
		inHTML += 					"<div button text=\"{{selectBtn.text}}\" btn-cls=\"widget-grid-btn\" cls=\"widget-grid-btn-wrapper\" icon-cls=\"selectAll\" ng-model=\"selectBtn\" on-click=\"selectAll()\"></div>";
		inHTML += 					"<div button text=\"{{addBtn.text}}\" btn-cls=\"widget-grid-btn\" cls=\"widget-grid-btn-wrapper\" icon-cls=\"add\" ng-model=\"addBtn\" on-click=\"startAddRow(ev)\"></div>";
		inHTML += 					"<div button text=\"{{removeBtn.text}}\" btn-cls=\"widget-grid-btn\" cls=\"widget-grid-btn-wrapper\" icon-cls=\"remove\" ng-model=\"removeBtn\" on-click=\"removeRows()\"></div>";
		inHTML +=				"</div>";
		inHTML += 			"</div>";
		inHTML += 			"<div class=\"\" ng-switch-when=\"true\" >";
		inHTML += 				"<div form-header title=\"{{title}}\" >";
		inHTML += 					"<div button cls=\"button-back\" icon-cls=\"back-button\" text=\"{{backBtn.text}}\" position=\"left\"  ng-model=\"backBtn\" on-click=\"cancelEditRow()\"></div>";
		inHTML += 					"<div button text=\"{{saveBtn.text}}\" position=\"right\" ng-model=\"saveBtn\" on-click=\"save()\"></div>";
		inHTML += 				"</div>";
		inHTML += 				"<div id=\"grid-form\" ng-transclude ng-if=\"config.editable && isEditing.showEditor\"></div>";
		inHTML += 			"</div>"
		inHTML +=		"</div>"
		inHTML += "</div>"

	return {
		restrict: "A",
		replace: true,
			
		transclude: true,
		scope: {
			//name: "=name",
			//config: "=config",
			//editBtnConfig: "=",
			form: "=editor",
			//editable: "=editable",
			//removable: "=removable",
			grid: "=grid",
			userSetting: "=config"
		},
		transclude: true,
		template: inHTML,
		controller: ["$scope","$element","$attrs", function($scope, $element, $attrs) {

			var defaults = {
				editable: true,
				removable: true,
				countable: true,
				dirtySave: true,
				addBtn: {
					disabled: false,
					visible: true, 
					text:"FORM.ADD"
				},
				editBtn: {
					disabled: false,
					visible: true,
					text:"FORM.EDIT"
				},
				cancelBtn: {
					disabled: false,
					visible: false,
					text:"FORM.CANCEL"
				},
				removeBtn: {
					disabled: true,
					visible: true,
					text:"FORM.REMOVE"
				},
				backBtn: {
					disabled: false,
					visible: true,
					text:"FORM.BACK"
				},
				backMenuBtn: {
					disabled: false,
					visible: true,
					text:"FORM.BACK"
				},
				saveBtn: {
					disabled: false,
					visible: true,
					text:"FORM.SAVE"
				},
				selectBtn: {
					disabled: false,
					visible: true,
					text:"FORM.SELECT_ALL"
				},
				nullBtn:{
					disabled: false,
					visible: true,
					text:""
				},
				gridTitle:"",
				formTitle:{
					add:"FORM.ADD",
					modify:"FORM.MODIFY"
				},
				nullIconCls: "",
				nullText: "",
				legendTitle: ""
			};

			var grid = $element.children()[2].childNodes[1];

			var startX, startY;
			var endX, endY;
			var originalTop = 0;
			var originalLeft = 0;
			var deltY,deltX;
			var sTime, eTime;
			$scope.removeFlag = -1;
			var rem = window.innerWidth / 20;
			var removeBtnWidth = 4.6875 * rem;
			

			var gridMsg = $msg.create({
				title: "ERROR.e000216"
			});

			$scope.rows = [];
			var initSwipeFlag = false;

			// var isMsg = false;
			/*var loadMsg = $msg.create({
				type: "waiting",
				text: "s000017"
			});
			var successMsg = $msg.create({
				type: "success",
				text: "s000015"
			});
			var failureMsg = $msg.create({
				type: "failure",
				text: "s000016"
			});*/
			
			$scope.$watch("grid.data.length",function(n,o){
				
				if(n==0){
					$scope.editBtn.visible = false;
					angular.element(grid).unbind("touchstart mousedown", touchStartControl);		
				}else{
					if($scope.config.editable&&!$scope.isEditing.showEditor&&!$scope.cancelBtn.visible){
						$scope.editBtn.visible = true;
					}else{
						$scope.editBtn.visible = false;
					}


					angular.element(grid).unbind("touchstart mousedown", touchStartControl);
					angular.element(grid).bind("touchstart mousedown", touchStartControl);
				}
			});

			var touchStartControl = function(e) {
				startX = (e.clientX||e.changedTouches[0].clientX);
				startY = (e.clientY||e.changedTouches[0].clientY);
				initSwipeFlag = false;
				//e.preventDefault();
				sTime = new Date().getTime();
				var rows = grid.querySelectorAll(".widget-row-container");

				if(originalLeft==0){
					$scope.removeFlag=-1
				}

				if($scope.removeFlag!=-1&&originalLeft<0){
					if(!rows[$scope.removeFlag].childNodes[1].contains(e.target)&&!rows[$scope.removeFlag].childNodes[2].contains(e.target)){
						$scope.stopRemoveRow();
						
					}else if(rows[$scope.removeFlag].childNodes[2].contains(e.target)){
						
						angular.element(grid).bind("touchend mouseup",touchClick);
					}else if(rows[$scope.removeFlag].childNodes[1].contains(e.target)){
						angular.element(grid).bind("touchmove mousemove",horizontalSwipe);
						angular.element(grid).bind("touchend mouseup",horizontalSwipeEnd);
					}
				}else if($scope.removeFlag==-1&&originalLeft==0){
					angular.element(grid).bind("touchend mouseup",touchClick);
					if($scope.showSelectFlag == false){
						angular.element(grid).bind("touchmove mousemove", initSwipe);
					}
				}

			}
			
			var horizontalSwipe = function(e){
				if ($scope.config.removable) {
					var rows = grid.querySelectorAll(".widget-row-container");
					var targetRowDom;
					for (var index = 0; index < rows.length; index++) {
						if (rows[index].contains(e.target)) {
							targetRowDom = rows[index].childNodes[1];
							break;
						}
					}
					e.preventDefault();
					deltX = originalLeft + (e.clientX||e.changedTouches[0].clientX) - startX;
					if(originalLeft<0){
						if((e.clientX||e.changedTouches[0].clientX) - startX>0&&(e.clientX||e.changedTouches[0].clientX) - startX<removeBtnWidth*1.4){
							var translate3d ="translate3d("+deltX+"px"+",0,0)";
							targetRowDom.style.transform = translate3d;
							targetRowDom.style["-webkit-transform"] = translate3d;
							targetRowDom.style["-ms-transform"] = translate3d;
							targetRowDom.style["-moz-transform"] = translate3d;
							targetRowDom.style["-o-transform"] = translate3d;
						}
					}else if(originalLeft==0){
						if(deltX<0&&deltX>-(removeBtnWidth*1.4)){
							var translate3d ="translate3d("+deltX+"px"+",0,0)";
							targetRowDom.style.transform = translate3d;
							targetRowDom.style["-webkit-transform"] = translate3d;
							targetRowDom.style["-ms-transform"] = translate3d;
							targetRowDom.style["-moz-transform"] = translate3d;
							targetRowDom.style["-o-transform"] = translate3d;
							if((-deltX)<=(removeBtnWidth*0.2)){
								var translate3d ="translate3d(0,0,0)";
								targetRowDom.style.transform = translate3d;
								targetRowDom.style["-webkit-transform"] = translate3d;
								targetRowDom.style["-ms-transform"] = translate3d;
								targetRowDom.style["-moz-transform"] = translate3d;
								targetRowDom.style["-o-transform"] = translate3d;
								
							}
						}
						
					}
				}
			}
			var verticalSwipe = function(e){
				deltY = originalTop+(e.clientY||e.changedTouches[0].clientY)-startY;
				if(deltY > 0){
					
					$scope.pullDown = true;
					$scope.$apply();
					var translate3d ="translate3d(0,"+deltY+"px"+",0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
				}
			}
			var initSwipe = function(e){
				if(!initSwipeFlag){
					if(Math.abs((e.clientY||e.changedTouches[0].clientY)-startY)>Math.abs((e.clientX||e.changedTouches[0].clientX) - startX)){
						angular.element(grid).unbind("touchend mouseup",touchClick);
						var scrollTop=window.pageYOffset||document.body.scrollTop;
						if(scrollTop==0&&(e.clientY||e.changedTouches[0].clientY)-startY>0){
							e.preventDefault();
							angular.element(grid).bind("touchmove mousemove",verticalSwipe);
							angular.element(grid).bind("touchend mouseup",verticalSwipeEnd);
						}
					}else if(Math.abs((e.clientY||e.changedTouches[0].clientY)-startY)<Math.abs((e.clientX||e.changedTouches[0].clientX) - startX)){
						angular.element(grid).unbind("touchend mouseup",touchClick);
						angular.element(grid).bind("touchmove mousemove",horizontalSwipe);
						angular.element(grid).bind("touchend mouseup",horizontalSwipeEnd);
						
					}
					initSwipeFlag = true;
					angular.element(grid).unbind("touchmove mousemove", initSwipe);
				}
			}

			var touchClick = function(e){
				//if(!isMsg){
				eTime = new Date().getTime();
				if(Math.abs((e.clientY||e.changedTouches[0].clientY)-startY)<10&&Math.abs((e.clientX||e.changedTouches[0].clientX) - startX)<10&&(eTime-sTime<300)){
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();

					var rows = grid.querySelectorAll(".widget-row-container");
					
					var targetRowScope;
					
					for (var index = 0; index < rows.length; index++) {
						if (rows[index].contains(e.target)) {
							targetRowScope = $scope.rows[index];
							break;
						}
					}

					if($scope.removeFlag!=-1){
						
						if(rows[$scope.removeFlag].childNodes[2].contains(e.target)){
							$scope.removeRow(targetRowScope);
						}else if(rows[$scope.removeFlag].childNodes[1].contains(e.target)){
							$scope.stopRemoveRow();
						}
						
					}else if($scope.showSelectFlag){
						if(targetRowScope.isSelected.data === "on"){
							$scope.deSelectRow(targetRowScope);
							$scope.$apply();
						}else if(targetRowScope.isSelected.data === "off"){
							$scope.selectRow(targetRowScope);
							$scope.$apply();
						}
					}else if(!$scope.showSelectFlag&&$scope.config.editable&&!targetRowScope.row.disabled){
						$scope.isEditing.showEditor = true;
						$scope.startEditRow(targetRowScope);
					}
					
				}
				angular.element(grid).unbind("touchend mouseup",touchClick);
				//}
				//isMsg = false;
			}
			var horizontalSwipeEnd = function(e){
				endX = (e.clientX||e.changedTouches[0].clientX);
				endY = (e.clientY||e.changedTouches[0].clientY);
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				if ($scope.config.removable) {
					

					if ((endX - startX) < -(removeBtnWidth * 0.2)) { //向右滑动

						/*originalLeft = 0;

						var rows = grid.querySelectorAll(".widget-row-container");


						for (var index = 0; index < rows.length; index++) {
							if (rows[index].contains(e.target)) {
								targetRowScope = $scope.rows[index];
								targetRowDom = rows[index].childNodes[1];
								break;
							}
						}

						var translate3d = "translate3d(0,0,0)";
						targetRowDom.style.transform = translate3d;
						targetRowDom.style["-webkit-transform"] = translate3d;
						targetRowDom.style["-ms-transform"] = translate3d;
						targetRowDom.style["-moz-transform"] = translate3d;
						targetRowDom.style["-o-transform"] = translate3d;

						if (!targetRowScope.row.disabled && !targetRowScope.isSelected.visible) {
							//targetRowScope.stopRemove()
							$scope.stopRemoveRow()
						}*/
						$scope.startRemoveRow(e);
						
					} else { //向左滑动
						$scope.stopRemoveRow();



							
							//targetRowScope.startRemove()

					}
				}
				angular.element(grid).unbind("touchmove mousemove", horizontalSwipe);
				angular.element(grid).unbind("touchend mouseup",horizontalSwipeEnd);
			}
			var verticalSwipeEnd = function(e){
				endX = (e.clientX||e.changedTouches[0].clientX);
				endY = (e.clientY||e.changedTouches[0].clientY);
				originalTop = deltY;
				$scope.pullDown = false;
				if (originalTop > 0 && originalTop < 100) {
					var translate3d = "translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					originalTop = 0;
				} else if (originalTop > 100) {
					$scope.loading = true;
					$scope.$apply()
					var translate3d = "translate3d(0,3.5rem,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					originalTop = 0;
					$scope.refresh();
				}
				if(originalTop==0&&originalLeft==0){
					angular.element(grid).unbind("touchend mouseup",verticalSwipeEnd);
					angular.element(grid).unbind("touchmove mousemove", verticalSwipe);
				}
			}
			
			
			
			$scope.selectAll = function(){
				if($scope.showSelectFlag){
					var rowCount = $scope.grid.data.length;
					if($scope.selectedRowId.length < rowCount){
						$scope.selectedRowId.length = 0;
						for (var index = 0; index < rowCount; index++) {
							//$scope.selectedRowId[index] = index;

							$scope.rows[index].select();
							$scope.selectedRowId.push($scope.rows[index].$index);
						};

						$scope.removeBtn.disabled = false;
					} else if($scope.selectedRowId.length == rowCount){
						$scope.removeBtn.disabled = true;
						for (var index = 0; index < rowCount; index++) {
							$scope.rows[index].cancelSelect();
						};
						$scope.selectedRowId.length = 0;
					}
				} 
			}
			$scope.showSelectField = function() {

				$scope.showSelectFlag = true;
				for(var index = 0; index<$scope.rows.length; index++){
					$scope.rows[index].showSelectField();
				}

				$scope.editBtn.visible = false;
				$scope.cancelBtn.visible = true;
				// $scope.removeBtn.visible = true;
				// $scope.addBtn.visible = false;
				$scope.stopRemoveRow();
			};
			$scope.hideSelectField = function() {
				$scope.showSelectFlag = false;
				for(var index = 0; index<$scope.rows.length; index++){
					$scope.rows[index].hideSelectField();
					$scope.rows[index].cancelSelect();
				}
				$scope.selectedRowId.length = 0;
				$scope.editBtn.visible = true;
				$scope.cancelBtn.visible = false;
				// $scope.removeBtn.visible = false;
				// $scope.addBtn.visible = true;
			};
			$scope.removeRows = function() {
				if($scope.showSelectFlag && $scope.selectedRowId.length !== 0){
					$scope.grid['delete']($scope.selectedRowId,{
						"operation": "remove"
					},function(data){
						if(data){
							function numberorder(a,b){return a.index-b.index;};
							data.sort(numberorder);
							for (var index = data.length-1; index >=0; index--){
								if(data[index].success==true){
									$scope.rows.splice(data[index].index, 1)
								}
							}
						}else{
							function numberorder(a,b){return a-b};
							$scope.selectedRowId.sort(numberorder);
							for (var index = $scope.selectedRowId.length-1; index >=0; index--){
								if($scope.selectedRowId[index].success==true){
									$scope.rows.splice($scope.selectedRowId[index].index, 1)
								}
							}
						}
						
						
						$scope.removeBtn.disabled = true;
						/*for (var index = 0; index < $scope.rows.length; index++) {
							$scope.deSelectRow($scope.rows[index])
						};*/
						$scope.hideSelectField();
						
					},function(){
						$scope.hideSelectField();
						$scope.removeBtn.disabled = true;
						/*for (var index = 0; index < $scope.rows.length; index++) {
							$scope.deSelectRow($scope.rows[index])
						};*/
					},function(){
						$scope.hideSelectField();
						$scope.removeBtn.disabled = true;
						/*for (var index = 0; index < $scope.rows.length; index++) {
							$scope.deSelectRow($scope.rows[index])
						};*/
					});
					
				}
			};
			$scope.insertRow = function() {
				
				$scope.grid.insert({
					operation: "insert"
				}, function(){
					$scope.title = $scope.config.gridTitle;
					$scope.isEditing.showEditor = false;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					/*$scope.insertWatch = $scope.$watch(function(){
						return $scope.rows
					}, function(newValue,oldValue){
						if(newValue[1]==oldValue[0]){
							newValue[0].showSelectField();

						}
					},true)*/
					//$scope.$apply()
				});
			};
			$scope.startAddRow = function(e) {
				e.preventDefault();
				//e.stopPropagation();
				//e.stopImmediatePropagation();
				$timeout.cancel(initDataTime)
				if($scope.grid.max && ($scope.grid.data.length == $scope.grid.max)){
					gridMsg.show();
				} else {
					$scope.isEditing.showEditor = true;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					$scope.title = $scope.config.formTitle.add;
					$scope.isEditing.id = -1;

					var initDataTime = $timeout(function(){
						$scope.grid.initAddData();
					},1);
				}
			};
			$scope.startEditRow = function(childScope) {
				//conosle.log("editItems", id);
				$scope.isEditing.showEditor = true;
				$scope.$emit("gridEditing",$scope.isEditing.showEditor);
				$scope.isEditing.id = childScope.$index;
				$scope.grid.startEdit(childScope.$index);
				$scope.title = $scope.config.formTitle.modify;
				$scope.$apply();
			};
			$scope.cancelEditRow = function() {
				var cancelConfirmMsg = $msg.create({
					content: "FORM.BACKCONFIRMNOTE",
					iconCls: "alert",
					okBtn: {
						show: true,
						text: "FORM.LEAVE",
						handler: function(ev){
							//isMsg = true;
							$scope.title = $scope.config.gridTitle;
							$scope.grid.cancelEdit();
							$scope.isEditing.showEditor = false;
							$scope.$emit("gridEditing",$scope.isEditing.showEditor);
							$scope.isEditing.id = -1;
							ev.preventDefault();
							ev.stopPropagation();
							ev.stopImmediatePropagation();
						}
					},
					cancelBtn: {
						show: true,
						text: "FORM.CANCEL",
						handler: function(){}
					}
				});

				if($scope.grid.isDirty()){
					cancelConfirmMsg.show();
				}
				else{
					$scope.title = $scope.config.gridTitle;
					$scope.grid.cancelEdit();
					$scope.isEditing.showEditor = false;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					$scope.isEditing.id = -1;
				}
			};
			$scope.saveEditRow = function() {
				
				$scope.grid.saveEdit({}, function(){
					
					
					$scope.isEditing.showEditor = false;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					$scope.title = $scope.config.gridTitle;
				});
				/*var index = $scope.isEditing.id;
				$scope.$watch(function() {
					return $scope.grid.data[index];
				}, function(newValue) {
					//$scope.$broadcast("editEnd", $scope.isEditing.id, newValue);
				}, true);*/
			};
			$scope.save = function() {
				if($scope.isEditing.id==-1){
					$scope.insertRow();
				}else{
					$scope.saveEditRow();
				}
			};
			$scope.selectRow = function(childScope){
				childScope.select();
				$scope.selectedRowId.push(childScope.$index);
				if ($scope.selectedRowId.length) {
					$scope.removeBtn.disabled = false;
				} else {
					$scope.removeBtn.disabled = true;
				}
			};
			$scope.deSelectRow = function(childScope){
				childScope.cancelSelect();
				for (var index = 0; index < $scope.selectedRowId.length; index++) {
					if ($scope.selectedRowId[index] == childScope.$index) {
						$scope.selectedRowId.splice(index, 1)
					}
				}
				if ($scope.selectedRowId.length == 0) {
					$scope.removeBtn.disabled = true;
				} else {
					$scope.removeBtn.disabled = false;
				}
			};
			$scope.removeRow = function(childScope){
				$scope.grid['delete'](childScope.$index,{},function(data){
					$scope.stopRemoveRow();
					if(data){
						function numberorder(a,b){return a.index-b.index};
						data.sort(numberorder);
						for (var index = data.length-1; index >=0; index--){
							if(data[index].success==true){
								$scope.rows.splice(data[index].index, 1)
							}
						}
					}else{
						$scope.rows.splice(childScope.$index, 1);
						$scope.$apply();
					}

				},function(){
					$scope.stopRemoveRow();
				},function(){
					$scope.stopRemoveRow();
				});
				//$scope.rows.splice(id, 1);				
			};
			$scope.startRemoveRow = function(e){


				//childScope.isRemoveVisible = true;
				
				var targetRowDom;
				originalLeft = -removeBtnWidth;
				var rows = grid.querySelectorAll(".widget-row-container");

				for (var index = 0; index < rows.length; index++) {
					if (rows[index].contains(e.target)) {
						targetRowScope = $scope.rows[index];
						targetRowDom = rows[index].childNodes[1];
						$scope.removeFlag =  $scope.rows[index].$index;
						break;
					}
				}

				if (!targetRowScope.row.disabled && !targetRowScope.isSelected.visible) {

					var translate3d = "translate3d(" + originalLeft + "px" + ",0,0)";
					targetRowDom.style.transform = translate3d;
					targetRowDom.style["-webkit-transform"] = translate3d;
					targetRowDom.style["-ms-transform"] = translate3d;
					targetRowDom.style["-moz-transform"] = translate3d;
					targetRowDom.style["-o-transform"] = translate3d;
					$scope.$apply();
				}
			};
			$scope.stopRemoveRow = function(){
				
				if($scope.removeFlag!=-1){
					
					var rows = grid.querySelectorAll(".widget-row-container");
					var removeActiveRowDom = rows[$scope.removeFlag].childNodes[1];
					var translate3d ="translate3d(0,0,0)";
					removeActiveRowDom.style.transform = translate3d;
					removeActiveRowDom.style["-webkit-transform"] = translate3d;
					removeActiveRowDom.style["-ms-transform"] = translate3d;
					removeActiveRowDom.style["-moz-transform"] = translate3d;
					removeActiveRowDom.style["-o-transform"] = translate3d;
					originalLeft = 0;


					$scope.rows[$scope.removeFlag].isRemoveVisible = false;
					$scope.removeFlag = -1;

				}
			};
			$scope.refresh = function() {
				
				$scope.grid.load({
				}, function() {
					$scope.rows.length = 0;

					var translate3d ="translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					$timeout(function(){
						$scope.loading = false;
					},1000)
					
				},function() {
					var translate3d ="translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					$timeout(function(){
						$scope.loading = false;
					},1000)
				},function() {
					var translate3d ="translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					$timeout(function(){
						$scope.loading = false;
					},1000)
				},false)
			};

			

			$scope.config = angular.extend({}, defaults, $scope.userSetting);
			/*$scope.config.editBtn.visible = $scope.form !== undefined ? true : false;
			$scope.config.editable = $scope.form !== undefined ? true : false;
			if( $scope.form !== undefined ){
				$scope.$watch(function(){return $scope.grid.data}, function(){
					if($scope.grid.data.length === 0){
						$scope.config.editBtn.visible = false;
					} else {
						$scope.config.editBtn.visible = true;
					}
				}, true);
			};*/

			$scope.title = $scope.config.gridTitle;
			//$scope.config.removable = $scope.removable != undefined ? ($scope.removable == "false" ? false : true) : $scope.config.removable;

			$scope.isEditing = {
				showEditor: false,
				id: -1
			};

			$scope.showSelectFlag = false;
			$scope.selectedRowId = [];
			$scope.removeFlag = -1;

			//$scope.hasId = $scope.hasId != undefined ? ($scope.hasId == "false" ? false : true) : true;
			/*
			 *button config
			 */
			$scope.addBtn = angular.extend({}, defaults.addBtn, $scope.userSetting.addBtn);
			$scope.editBtn = angular.extend({}, defaults.editBtn, $scope.userSetting.editBtn);
			$scope.removeBtn = angular.extend({}, defaults.removeBtn, $scope.userSetting.removeBtn);
			$scope.cancelBtn = angular.extend({}, defaults.cancelBtn, $scope.userSetting.cancelBtn);
			$scope.backBtn = angular.extend({}, defaults.backBtn, $scope.userSetting.backBtn);
			$scope.backMenuBtn = angular.extend({}, defaults.backMenuBtn, $scope.userSetting.backMenuBtn);
			$scope.saveBtn = angular.extend({}, defaults.saveBtn, $scope.userSetting.saveBtn);
			$scope.selectBtn = angular.extend({}, defaults.selectBtn, $scope.userSetting.selectBtn);
			$scope.nullBtn = angular.extend({}, defaults.nullBtn, $scope.userSetting.nullBtn);



			/*$scope.$on("rowEditingStart", function(event, rowEditingStart, id) {
				$scope.isEditing.showEditor = rowEditingStart;
				$scope.startEditRow(id);
			});*/
			
			if($scope.config.dirtySave && $scope.config.editable){
				$scope.$watch(function(){
					return $scope.grid.isDirty();
				}, function(){
					$scope.saveBtn.visible = $scope.grid.isDirty();
				});
			}

		}]
	}
}]);



/*
 *row Directive
 */
su.directive("row", function() {
		var	inHTML = 		"<div class=\"widget-row-container\">";
			//inHTML += 			"<div class=\"widget-row-inner\">";
			inHTML +=				"<div class=\"widget-row-select\" checkbox-switch ng-model=\"isSelected\" active-click=\"false\"></div>"
			inHTML += 				"<div class=\"widget-row-base\" ng-class=\"{'remove-active':isRemoveVisible,'select-active':isSelected.visible}\">";// ng-click=\"$parent.config.editable&&!row.disabled?edit():null\"
			inHTML += 					"<div class=\"widget-row-base-wrap\" ng-class=\"hasIcon?'icon':''\">";
			inHTML +=						"<div class=\"widget-row-content-container\" ng-repeat=\"column in $parent.grid.columns\" ng-switch=\"column.type\">"	
			inHTML += 							"<div class=\"widget-row-icon-container\" ng-switch-when=\"icon\">";
			inHTML += 								"<div class=\"widget-row-icon {{column.cls}}\"></div>";
			inHTML += 								"<div class=\"widget-row-icon-text\">{{column.name!=undefined?row[column.name].data:''}}</div>";
			inHTML += 							"</div>";
			inHTML += 							"<div class=\"widget-row-title {{column.cls}}\" ng-switch-when=\"title\">{{row[column.name].data | translate}}</div>";
			inHTML += 							"<div display-field row-id=\"{{$index}}\" class=\"column-{{$index+1}} widget-row-content {{column.cls}}\"  label=\"{{column.label}}\" ng-switch-when=\"text\" ng-model=\"row[column.name]\"></div>";
			inHTML += 						"</div>";
			inHTML += 						"<div class=\"widget-row-edit-icon\" ng-show=\"$parent.config.editable\"></div>";
			inHTML += 					"</div>";
			inHTML +=				"</div>";
			inHTML += 				"<div class=\"widget-remove-container\">";//ng-show=\"isRemoveVisible\"
			inHTML +=					"<div class=\"widget-remove-base\"><div translate>FORM.DELETE</div></div>";
			inHTML += 				"</div>";
			//inHTML += 			"</div>";
			inHTML += 		"</div>";
		return {
			//transclude:"element",
			restrict: "A",
			replace: true,
			scope: false,
			template: inHTML,
			//require: "^grid",
			controller:["$scope", function($scope){
				$scope.isSelected = {
					data: "off",
					visible: false
				};
				$scope.isSelected.data = "off";
				//$scope.row.iconCls = "row-icon";
				if($scope.row.disabled==undefined){
					$scope.row.disabled = false
				}
				//$scope.isRemoveVisible = false;
				//$scope.normalSatus = -1;
				$scope.$parent.rows.splice($scope.$index,0,$scope);
				if($scope.$parent.showSelectFlag){
					
					//$scope.isChooseVisible = true;
					$scope.isSelected.visible = true;
				}
			}],

			link: function($scope, $element, $attr) {

				for(var index in $scope.$parent.grid.columns){
					if($scope.$parent.grid.columns[index].type == "icon"){
						$scope.hasIcon = true;
					}
				}
				
				//$scope.$parent.rows[$scope.$index] = $scope;


				/*$scope.edit = function() {
					if($scope.$parent.removeFlag==-1){
						if ($scope.isChooseVisible == false) {
							if ($scope.isRemoveVisible) {
									//$scope.isRemoveVisible = false;
								$scope.stopRemove()
							} else {
								//var rowEditingStart = true;
								
								//$scope.$emit('rowEditingStart', rowEditingStart, $scope.$index);
								if($scope.$parent.config.editable){
									$scope.$parent.isEditing.showEditor = true;
									$scope.$apply();
									$scope.$parent.startEditRow($scope.$index);
								}
							}
						}else{
							if($scope.isSelected.data === "on"){
								$scope.cancelSelect()
							}else{
								$scope.select()
							}
							//$scope.isSelected.data = ($scope.isSelected.data === "on") ? "off" : "on";
								//$scope.$apply();
						}
					}else{
						$scope.stopRemove()
					}
					
				}*/
				/*$scope.showRemoveBtn = function() {

					$scope.isRemoveVisible = true;
			
				}
				$scope.hideRemoveBtn = function() {

					$scope.isRemoveVisible = false;
					
				}*/
				/*$scope.remove = function() {
					//$scope.$parent.setRemoveFlag($scope.normalSatus);
					$scope.$parent.removeRow($scope.$index)
				}*/

				/*$scope.$watch("isSelected.data",function(newValue){
					if(newValue=="on"){
						
					}else if(newValue=="off"){
						
					}
				})*/

				$scope.cancelSelect = function(){
					$scope.isSelected.data = "off";
					//$scope.$parent.deSelectRow($scope.$index)
				}
				/*$scope.startRemove = function(){
					if($scope.$parent.removeFlag==-1){
						$scope.isRemoveVisible = true;
						$scope.$apply();
						$scope.$parent.startRemoveRow($scope.$index);
					}else{
						$scope.stopRemove()
					}
				}
				$scope.stopRemove = function(){
					$scope.$parent.stopRemoveRow();
				}*/
				/*$scope.$watch("$parent.showSelectFlag",function(newValue, oldValue){
					if(newValue == true){
						$scope.isChooseVisible = true;
						$scope.isSelected.visible = true;
					}else{
						$scope.isChooseVisible = false;
						$scope.isSelected.visible = false;
					}
				})*/
				$scope.select = function(){
					$scope.isSelected.data = "on";
					//$scope.$parent.selectRow($scope.$index)
				}
				$scope.showSelectField = function(){
					//$scope.isChooseVisible = true;
					$scope.isSelected.visible = true;
				}
				$scope.hideSelectField = function(){
					//$scope.isChooseVisible = false;
					$scope.isSelected.visible = false;
				}

				/*var rstartX, rstartY;
				var rendX, rendY;
				$swipe.bind(angular.element($element.children()[1]),{
					start:function(coords,event){
						rstartX = coords.x;
						rstartY = coords.y;
					},
					move:function(coords){
					},
					end:function(coords,event){
						rendX = coords.x;
						rendY = coords.y;
						if(rendX-rstartX<-100){
							if($scope.$parent.config.removable&&!$scope.row.disabled){
								if($scope.$parent.removeFlag==-1){
									$scope.showRemoveBtn()
									$scope.startRemove()
								}
							}
						}else if(rendX-rstartX>100){
							if($scope.$parent.config.removable&&!$scope.row.disabled){
								$scope.hideRemoveBtn()
								$scope.stopRemove()
							}
						}else if(rendX-rstartX==0){
							if($scope.$parent.config.editable&&!$scope.row.disabled){
								if($scope.$parent.removeFlag==-1){
									$scope.edit()
								}else{
									$scope.stopRemove()
								}
							}
						}
						event.preventDefault()
						event.stopPropagation();
					}
				})*/
				
				/*$scope.$watch("$parent.selectedRowId.length", function(newValue){
					if(newValue==0){
						$scope.cancelSelect()
					}
				})*/
				/*$scope.$watch("$parent.removeFlag", function(newValue, oldValue){
					if(oldValue==$scope.$index&&newValue==-1){
						$scope.hideRemoveBtn()
					}
				})*/

				/*$scope.$watch("$parent.selectAllFlag", function(newValue,oldValue){
					if(newValue==true){
						$scope.select();
					}else{
						$scope.cancelSelect()
					}
				})*/
			}
		}
	}
);


/*
 *Qos grid Directive
 */
su.directive("qosGrid", ["$timeout", "$msg", function($timeout, $msg) {

	var inHTML  = 	"<div class=\"form-container widget-qos-grid-container\">"
		inHTML += 		"<div form-header title=\"{{config.gridTitle}}\" ng-show=\"cancelBtn.visible&&!isEditing.showEditor\">";
		inHTML +=			"<div button position=\"left\" text=\"{{cancelBtn.text}}\" ng-model=\"cancelBtn\" on-click=\"hideSelectField()\"></div>";
		inHTML +=			"<div button position=\"right\"text=\"{{editBtn.text}}\" ng-model=\"editBtn\" on-click=\"showSelectField()\"></div>";
		inHTML += 		"</div>";
		inHTML += 		"<div form-header title=\"{{config.gridTitle}}\" ng-show=\"!cancelBtn.visible&&!isEditing.showEditor\">";
		inHTML +=			"<div button position=\"left\" cls=\"button-back\" icon-cls=\"back-button\" text=\"{{backMenuBtn.text}}\" on-click=\"backMenuBtn.onClick()\" ng-model=\"backMenuBtn\"></div>";
		inHTML +=			"<div button position=\"right\"text=\"{{editBtn.text}}\" ng-model=\"editBtn\" on-click=\"showSelectField()\"></div>";
		inHTML += 		"</div>";
		inHTML += 		"<div class=\"widget-grid-content-container\"  on=\"config.editable && isEditing.showEditor\" ng-switch>";
		inHTML += 			"<div class=\"widget-grid-loading-container widget-status-container\">";
		inHTML += 				"<div class=\"widget-status-wrap\" ng-show=\"loading&&!isEditing.showEditor\">";
		inHTML += 					"<div class=\"widget-status-content\">";
		inHTML += 						"<div class=\"widget-status-icon-base widget-status-icon-waiting\"></div>"
		inHTML += 						"<div translate class=\"widget-status-text-base\">FORM.LOADING</div>"
		inHTML += 					"</div>";
		inHTML += 				"</div>";
		inHTML += 				"<div class=\"widget-grid-loading-content\" ng-show=\"pullDown&&!loading&&!isEditing.showEditor\">";
		inHTML += 					"<div translate class=\"widget-grid-loading-text\">FORM.PULL_TO_REFRESH</div>"
		inHTML += 				"</div>";
		inHTML += 			"</div>";
		inHTML +=			"<div class=\"widget-grid-content\">"
		inHTML += 				"<div class=\"fieldset-container device\" ng-show=\"!isEditing.showEditor && grid.deviceData.length\">";
		inHTML +=					"<div grid-legend-field title=\"QOS.DEVICE_NUMBER\" count=\"config.countable ? grid.deviceData.length : null\" ng-if=\"config.legendTitle\" ></div>";
		inHTML += 					"<div class=\"fieldset-content-container\" ng-show=\"!isEditing.showEditor\">";
		inHTML += 						"<div  class=\"widget-list-container\" ng-show=\"grid.data.length !== 0\">";
		inHTML += 							"<div qos-row ng-repeat=\"row in grid.deviceData\" rowname=\"device\">";
		inHTML += 							"</div>";
		inHTML +=	 					"</div>";
		inHTML += 					"</div>";
		inHTML += 				"</div>"

		inHTML += 				"<div class=\"fieldset-container app\" ng-show=\"!isEditing.showEditor && grid.appData.length\">";
		inHTML +=					"<div grid-legend-field title=\"QOS.APP_NUMBER\" count=\"config.countable ? grid.appData.length : null\" ng-if=\"config.legendTitle\" ></div>";
		inHTML += 					"<div class=\"fieldset-content-container\" ng-show=\"!isEditing.showEditor\">";
		inHTML += 						"<div  class=\"widget-list-container\" ng-show=\"grid.data.length !== 0\">";
		inHTML += 							"<div qos-row ng-repeat=\"row in grid.appData\" rowname=\"app\">";
		inHTML += 							"</div>";
		inHTML +=	 					"</div>";
		inHTML += 					"</div>";
		inHTML += 				"</div>"

		inHTML +=	 			"<div class=\"fieldset-container phy\" ng-show=\"!isEditing.showEditor && grid.phyData.length\">";
		inHTML +=					"<div grid-legend-field title=\"QOS.PHY_NUMBER\" count=\"config.countable ? grid.phyData.length : null\" ng-if=\"config.legendTitle\" ></div>";
		inHTML += 					"<div class=\"fieldset-content-container\" ng-show=\"!isEditing.showEditor\">";
		inHTML += 						"<div  class=\"widget-list-container\" ng-show=\"grid.data.length !== 0\">";
		inHTML += 							"<div qos-row ng-repeat=\"row in grid.phyData\" rowname=\"phy\">";
		inHTML += 							"</div>";
		inHTML += 						"</div>";
		inHTML += 					"</div>";
		inHTML += 				"</div>"

		inHTML += 				"<div class=\"fieldset-container widget-grid-content\" ng-show=\"!isEditing.showEditor && !grid.phyData.length && !grid.appData.length && !grid.deviceData.length\">";
		inHTML += 					"<div  class=\"widget-list-null-container\">";
		inHTML += 						"<div class=\"widget-list-null-icon {{config.nullIconCls}}\">";
		inHTML += 						"</div>";
		inHTML += 						"<div class=\"widget-list-null-text\">";
		inHTML +=							"<span translate>{{config.nullText}}</span>"
		inHTML += 						"</div>";
		//inHTML += 					"<div class=\"widget-list-null-button\">";
		inHTML += 						"<div button cls=\"widget-list-null-btn-wrap\" btn-cls=\"widget-list-null-btn\"  text=\"{{nullBtn.text}}\" ng-model=\"nullBtn\" on-click=\"startAddRow()\"></div>";
		//inHTML += 					"</div>";
		inHTML += 						"</div>";
		inHTML += 				"</div>"
		inHTML += 			"</div>"
		inHTML += 			"<div class=\"widget-grid-button-container\" ng-show=\"!isEditing.showEditor && config.removable && showSelectFlag\">";
		inHTML +=				"<div class=\"button-group\">";
		inHTML += 					"<div button text=\"{{selectBtn.text}}\" btn-cls=\"widget-grid-btn\" cls=\"widget-grid-btn-wrapper\" icon-cls=\"selectAll\" ng-model=\"selectBtn\" on-click=\"selectAll()\"></div>";
		inHTML += 					"<div button text=\"{{addBtn.text}}\" btn-cls=\"widget-grid-btn\" cls=\"widget-grid-btn-wrapper\" icon-cls=\"add\" ng-model=\"addBtn\" on-click=\"startAddRow()\"></div>";
		inHTML += 					"<div button text=\"{{removeBtn.text}}\" btn-cls=\"widget-grid-btn\" cls=\"widget-grid-btn-wrapper\" icon-cls=\"remove\" ng-model=\"removeBtn\" on-click=\"removeRows()\"></div>";
		inHTML +=				"</div>";
		inHTML += 			"</div>";
		inHTML += 			"<div class=\"\" ng-switch-when=\"true\" >";
		inHTML += 				"<div form-header title=\"{{title}}\" >";
		inHTML += 					"<div button cls=\"button-back\" icon-cls=\"back-button\" text=\"{{backBtn.text}}\" position=\"left\"  ng-model=\"backBtn\" on-click=\"cancelEditRow()\"></div>";
		inHTML += 					"<div button text=\"{{saveBtn.text}}\" position=\"right\" ng-model=\"saveBtn\" on-click=\"save()\"></div>";
		inHTML += 				"</div>";
		inHTML += 				"<div id=\"grid-form\" ng-transclude ng-if=\"config.editable && isEditing.showEditor\"></div>";
		inHTML += 			"</div>"
		inHTML +=		"</div>"
		inHTML += 	"</div>"

	return {
		restrict: "A",
		replace: true,
			
		transclude: true,
		scope: {
			//name: "=name",
			//config: "=config",
			//editBtnConfig: "=",
			form: "=editor",
			//editable: "=editable",
			//removable: "=removable",
			grid: "=qosGrid",
			userSetting: "=config"
		},
		transclude: true,
		template: inHTML,
		controller: ["$scope","$element","$attrs","$transclude", function($scope, $element, $attrs, $transclude) {
			/*$transclude(function(clone){
				var p = angular.element($element.children()[2].childNodes[0].childNodes[4])
				var c = angular.element()
				for(var index = 0; index<clone.children().length;index++){
					//p.append(clone.children()[index])
				}
				//$element.children()[2].childNodes[0].childNodes[4]).append(angular.element(clone.children()[1])//.appendChild()
			})*/
			var defaults = {
				editable: true,
				removable: true,
				countable: true,
				dirtySave: true,
				addBtn: {
					disabled: false,
					visible: true, 
					text:"FORM.ADD"
				},
				editBtn: {
					disabled: false,
					visible: true,
					text:"FORM.EDIT"
				},
				cancelBtn: {
					disabled: false,
					visible: false,
					text:"FORM.CANCEL"
				},
				removeBtn: {
					disabled: true,
					visible: true,
					text:"FORM.REMOVE"
				},
				backBtn: {
					disabled: false,
					visible: true,
					text:"FORM.BACK"
				},
				backMenuBtn: {
					disabled: false,
					visible: true,
					text:"FORM.BACK"
				},
				saveBtn: {
					disabled: false,
					visible: true,
					text:"FORM.SAVE"
				},
				selectBtn: {
					disabled: false,
					visible: true,
					text:"FORM.SELECT_ALL"
				},
				nullBtn:{
					disabled: false,
					visible: true,
					text:""
				},
				gridTitle:"",
				formTitle:{
					add:"FORM.ADD",
					modify:"FORM.MODIFY"
				},
				nullIconCls: "",
				nullText: "",
				legendTitle: ""
			};

			var grid = $element.children()[2].childNodes[1];

			var startX, startY;
			var endX, endY;
			var originalTop = 0;
			var originalLeft = 0;
			var deltY,deltX;
			var sTime, eTime;
			var rem = window.innerWidth / 20;
			var removeBtnWidth = 4.6875 * rem;
			var initSwipeFlag = false;


			var gridMsg = $msg.create({
				title: "ERROR.e000216"
			});

			$scope.rows = {};
			$scope.rows.device = [];
			$scope.rows.app = [];
			$scope.rows.phy = [];

			/**swipe start**/
			$scope.$watch("grid.actuallLength",function(n,o){
				if(n==0||n==undefined){
					$scope.editBtn.visible = false;
					angular.element(grid).unbind("touchstart mousedown", touchStartControl)				
				}else{
					if($scope.config.editable&&!$scope.isEditing.showEditor&&!$scope.cancelBtn.visible){
						$scope.editBtn.visible = true;
					}else{
						$scope.editBtn.visible = false;
					}
					angular.element(grid).unbind("touchstart mousedown", touchStartControl);
					angular.element(grid).bind("touchstart mousedown", touchStartControl);
				}
			});
			


			var touchStartControl = function(e) {
				startX = (e.clientX||e.changedTouches[0].clientX);
				startY = (e.clientY||e.changedTouches[0].clientY);
				//e.preventDefault();
				sTime = new Date().getTime();
				var subgrid = grid.querySelectorAll(".fieldset-container");
					
				for(var index = 0; index < 3; index++){
					if(subgrid[index].contains(e.target)){
						var rows = subgrid[index].querySelectorAll(".widget-row-container")
					}
				}

				if(originalLeft==0){
					$scope.removeFlag.index=-1
				}

				if($scope.removeFlag.index!=-1&&originalLeft<0){
					if(!rows[$scope.removeFlag.index].childNodes[1].contains(e.target)&&!rows[$scope.removeFlag.index].childNodes[2].contains(e.target)){
						$scope.stopRemoveRow();
						
					}else if(rows[$scope.removeFlag.index].childNodes[2].contains(e.target)){
						angular.element(grid).bind("touchend mouseup",touchClick);
					}else if(rows[$scope.removeFlag.index].childNodes[1].contains(e.target)){
						angular.element(grid).bind("touchmove mousemove",horizontalSwipe);
						angular.element(grid).bind("touchend mouseup",horizontalSwipeEnd);
					}
				}else if($scope.removeFlag.index==-1&&originalLeft==0){
					angular.element(grid).bind("touchend mouseup",touchClick);
					if($scope.showSelectFlag == false){
						angular.element(grid).bind("touchmove mousemove", initSwipe);
					}
				}
			};
			/**swipe move**/
			var horizontalSwipe = function(e){
				if ($scope.config.removable) {
					var subgrid = grid.querySelectorAll(".fieldset-container");

					for(var index = 0; index < 3; index++){
						if(subgrid[index].contains(e.target)){
							var rows = subgrid[index].querySelectorAll(".widget-row-container")
						}
					}
					var targetRowDom;
					for (var index = 0; index < rows.length; index++) {
						if (rows[index].contains(e.target)) {
							targetRowDom = rows[index].childNodes[1];
							break;
						}
					}
					e.preventDefault();
					deltX = originalLeft + (e.clientX||e.changedTouches[0].clientX) - startX;
					
					if(originalLeft<0){
						if((e.clientX||e.changedTouches[0].clientX) - startX>0&&(e.clientX||e.changedTouches[0].clientX) - startX<removeBtnWidth*1.4){
							var translate3d ="translate3d("+deltX+"px"+",0,0)";
							targetRowDom.style.transform = translate3d;
							targetRowDom.style["-webkit-transform"] = translate3d;
							targetRowDom.style["-ms-transform"] = translate3d;
							targetRowDom.style["-moz-transform"] = translate3d;
							targetRowDom.style["-o-transform"] = translate3d;
						}
					}else if(originalLeft==0){
						if(deltX<0&&deltX>-(removeBtnWidth*1.4)){
							var translate3d ="translate3d("+deltX+"px"+",0,0)";
							targetRowDom.style.transform = translate3d;
							targetRowDom.style["-webkit-transform"] = translate3d;
							targetRowDom.style["-ms-transform"] = translate3d;
							targetRowDom.style["-moz-transform"] = translate3d;
							targetRowDom.style["-o-transform"] = translate3d;
							if((-deltX)<=(removeBtnWidth*0.2)){
								var translate3d ="translate3d(0,0,0)";
								targetRowDom.style.transform = translate3d;
								targetRowDom.style["-webkit-transform"] = translate3d;
								targetRowDom.style["-ms-transform"] = translate3d;
								targetRowDom.style["-moz-transform"] = translate3d;
								targetRowDom.style["-o-transform"] = translate3d;
								
							}
						}
						
					}
				}
			};
			var verticalSwipe = function(e){
				deltY = originalTop+(e.clientY||e.changedTouches[0].clientY)-startY;
				if(deltY > 0){
					
					$scope.pullDown = true;
					$scope.$apply();
					var translate3d ="translate3d(0,"+deltY+"px"+",0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
				}
			};
			var initSwipe = function(e){
				if(!initSwipeFlag){
					if(Math.abs((e.clientY||e.changedTouches[0].clientY)-startY)>Math.abs((e.clientX||e.changedTouches[0].clientX) - startX)){
						
						angular.element(grid).unbind("touchend mouseup",touchClick);
						var scrollTop=window.pageYOffset||document.body.scrollTop;
						if(scrollTop==0&&(e.clientY||e.changedTouches[0].clientY)-startY>0){
							e.preventDefault();
							angular.element(grid).bind("touchmove mousemove",verticalSwipe);
							angular.element(grid).bind("touchend mouseup",verticalSwipeEnd);
						}
					}else if(Math.abs((e.clientY||e.changedTouches[0].clientY)-startY)<Math.abs((e.clientX||e.changedTouches[0].clientX) - startX)){
						angular.element(grid).unbind("touchend mouseup",touchClick);
						angular.element(grid).bind("touchmove mousemove",horizontalSwipe);
						angular.element(grid).bind("touchend mouseup",horizontalSwipeEnd);
					}
					angular.element(grid).unbind("touchmove mousemove", initSwipe);
				}
				
			};
			/**swipe end**/
			var touchClick = function(e){
				eTime = new Date().getTime()
				if(Math.abs((e.clientY||e.changedTouches[0].clientY)-startY)<10&&Math.abs((e.clientX||e.changedTouches[0].clientX) - startX)<10&&(eTime-sTime<300)){
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();

					var subgrid = grid.querySelectorAll(".fieldset-container");
					
					var targetRowScope;
					for(var index = 0; index < 3; index++){
						if(subgrid[index].contains(e.target)){
							var rows = subgrid[index].querySelectorAll(".widget-row-container")
						}
					}
					
					for (var index = 0; index < rows.length; index++) {
						if (rows[index].contains(e.target)) {
							targetRowScope = $scope.rows[rows[index].attributes.rowname.value][index];
							break;
						}
					}

					if($scope.removeFlag.index!=-1){
						
						if(rows[$scope.removeFlag.index].childNodes[2].contains(e.target)){
							$scope.removeRow(targetRowScope);
						}else if(rows[$scope.removeFlag.index].childNodes[1].contains(e.target)){
							$scope.stopRemoveRow();
						}
						
					}else if($scope.showSelectFlag){
						if(targetRowScope.isSelected.data === "on"){
							$scope.deSelectRow(targetRowScope);
							$scope.$apply();
						}else if(targetRowScope.isSelected.data === "off"){
							$scope.selectRow(targetRowScope);
							$scope.$apply();
						}
					}/*else if(!$scope.showSelectFlag&&$scope.config.editable&&!targetRowScope.row.disabled){
						$scope.isEditing.showEditor = true;
						$scope.startEditRow(targetRowScope);
					}*/
					angular.element(grid).unbind("touchend mouseup",touchClick);
				}
			};
			var horizontalSwipeEnd = function(e){
				endX = (e.clientX||e.changedTouches[0].clientX);
				endY = (e.clientY||e.changedTouches[0].clientY);
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				if ($scope.config.removable) {
					

					if ((endX - startX) < -(removeBtnWidth * 0.2)) { //left

						$scope.startRemoveRow(e);
						
					} else { //right
						$scope.stopRemoveRow();
					}
				}
				angular.element(grid).unbind("touchmove mousemove", horizontalSwipe);
				angular.element(grid).unbind("touchend mouseup",horizontalSwipeEnd);
			};
			var verticalSwipeEnd = function(e){
				endX = (e.clientX||e.changedTouches[0].clientX);
				endY = (e.clientY||e.changedTouches[0].clientY);
				originalTop = deltY;
				$scope.pullDown = false;
				if (originalTop > 0 && originalTop < 100) {
					var translate3d = "translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					originalTop = 0;
				} else if (originalTop > 100) {
					$scope.loading = true;
					$scope.$apply()
					var translate3d = "translate3d(0,3.5rem,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					originalTop = 0;
					$scope.refresh();
				}
				if(originalTop==0&&originalLeft==0){
					angular.element(grid).unbind("touchend mouseup",verticalSwipeEnd);
					angular.element(grid).unbind("touchmove mousemove", verticalSwipe);
				}
			};


			
			$scope.selectAll = function(){
				var deviceCount = $scope.grid.deviceData.length;
				var appCount = $scope.grid.appData.length;
				var phyCount = $scope.grid.phyData.length;
				var rowCount = deviceCount + appCount + phyCount;

				if($scope.showSelectFlag){

					if($scope.selectedRowId.length < rowCount){
						$scope.selectedRowId.length = 0;

						for (var index = 0; index < deviceCount; index++) {
							//$scope.selectedRowId[index] = index;
							$scope.rows.device[index].select();

							
							$scope.selectedRowId.push($scope.grid.transIndex[$scope.rows.device[index].row.id]);
						};

						for (var index = 0; index < appCount; index++) {
							//$scope.selectedRowId[index] = index;;
							$scope.rows.app[index].select();
							$scope.selectedRowId.push($scope.grid.transIndex[$scope.rows.app[index].row.id]);
						};

						for (var index = 0; index < phyCount; index++) {
							//$scope.selectedRowId[index] = index;
							$scope.rows.phy[index].select();
							$scope.selectedRowId.push($scope.grid.transIndex[$scope.rows.phy[index].row.id]);
						};

						$scope.removeBtn.disabled = false;

					} else if($scope.selectedRowId.length = rowCount){
						
						$scope.removeBtn.disabled = true;

						for (var index = 0; index < deviceCount; index++) {
							//$scope.selectedRowId[index] = index;
							$scope.rows.device[index].cancelSelect();
						};

						for (var index = 0; index < appCount; index++) {
							//$scope.selectedRowId[index] = index;;
							$scope.rows.app[index].cancelSelect();
						};

						for (var index = 0; index < phyCount; index++) {
							//$scope.selectedRowId[index] = index;
							$scope.rows.phy[index].cancelSelect();
						};
						$scope.selectedRowId.length = 0;
					}
				} 
			};
			$scope.showSelectField = function() {
				$scope.showSelectFlag = true;
				var deviceCount = $scope.grid.deviceData.length;
				var appCount = $scope.grid.appData.length;
				var phyCount = $scope.grid.phyData.length;
				var rowCount = deviceCount + appCount + phyCount;
				for (var index = 0; index < deviceCount; index++) {
					//$scope.selectedRowId[index] = index;
					$scope.rows.device[index].showSelectField();
				};

				for (var index = 0; index < appCount; index++) {
					//$scope.selectedRowId[index] = index;
					$scope.rows.app[index].showSelectField();
				};

				for (var index = 0; index < phyCount; index++) {
					//$scope.selectedRowId[index] = index;
					$scope.rows.phy[index].showSelectField();
				};

				$scope.editBtn.visible = false;
				$scope.cancelBtn.visible = true;
				// $scope.removeBtn.visible = true;
				// $scope.addBtn.visible = false;
				$scope.stopRemoveRow();
			};
			$scope.hideSelectField = function() {
				$scope.showSelectFlag = false;
				var deviceCount = $scope.grid.deviceData.length;
				var appCount = $scope.grid.appData.length;
				var phyCount = $scope.grid.phyData.length;
				var rowCount = deviceCount + appCount + phyCount;
				for (var index = 0; index < deviceCount; index++) {
					//$scope.selectedRowId[index] = index;
					$scope.rows.device[index].hideSelectField();
					$scope.rows.device[index].cancelSelect();
				};

				for (var index = 0; index < appCount; index++) {
					//$scope.selectedRowId[index] = index;
					$scope.rows.app[index].hideSelectField();
					$scope.rows.app[index].cancelSelect();
				};

				for (var index = 0; index < phyCount; index++) {
					//$scope.selectedRowId[index] = index;
					$scope.rows.phy[index].hideSelectField();
					$scope.rows.phy[index].cancelSelect();
				};
				$scope.selectedRowId.length = 0;
				$scope.editBtn.visible = true;
				$scope.cancelBtn.visible = false;
				// $scope.removeBtn.visible = false;
				// $scope.addBtn.visible = true;
			};
			$scope.removeRows = function() {
				var deviceCount = $scope.grid.deviceData.length;
				var appCount = $scope.grid.appData.length;
				var phyCount = $scope.grid.phyData.length;
				var rowCount = deviceCount + appCount + phyCount;
				if($scope.showSelectFlag && $scope.selectedRowId.length !== 0){
					
					$scope.removeBtn.disabled = true;

					$scope.grid['delete']($scope.selectedRowId,{
						operation: "del"
					},function(data){
						/*if(data){
							function numberorder(a,b){return a.index-b.index};
							data.sort(numberorder);
							for (var index = data.length-1; index >=0; index--){
								if(data[index].success==true){
									$scope.rows[data.type].splice(data[index].index, 1)
								}
							}
						}else{
							function numberorder(a,b){return a-b};
							$scope.selectedRowId.sort(numberorder);
							for (var index = $scope.selectedRowId.length-1; index >=0; index--){
								if($scope.selectedRowId[index].success==true){

									$scope.rows.splice($scope.selectedRowId[index].index, 1)
								}
							}
						}*/
						
						
						
						$scope.removeBtn.disabled = true;
						$scope.hideSelectField();
						$scope.rows.device.length = 0;
						$scope.rows.app.length = 0;
						$scope.rows.phy.length = 0;
						
					},function(){
						$scope.hideSelectField();
						$scope.removeBtn.disabled = true;
					},function(){
						$scope.hideSelectField();
						$scope.removeBtn.disabled = true;
					});
					
				}
			};
			$scope.insertRow = function() {
				$scope.grid.insert({
					operation: "add"
				}, function(){
					$scope.title = $scope.config.gridTitle;
					$scope.isEditing.showEditor = false;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					//$scope.rows.app.length = 0;
					$scope.rows.device.length = 0;
					$scope.rows.phy.length = 0;
				});
			};
			$scope.startAddRow = function() {
				clearTimeout(initAddData);
				if($scope.grid.max && ($scope.grid.data.length == $scope.grid.max)){
					gridMsg.show();
				} else {
					$scope.isEditing.showEditor = true;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					$scope.title = $scope.config.formTitle.add;
					$scope.isEditing.id = -1;
					$scope.stopRemoveRow();

					var initAddData = setTimeout(function(){
						$scope.grid.initAddData();
					},1);
				}
			};
			$scope.startEditRow = function(childScope) {
				//conosle.log("editItems", id);
				$scope.isEditing.showEditor = true;
				$scope.$emit("gridEditing",$scope.isEditing.showEditor);
				$scope.isEditing.id = $scope.grid.transIndex[childScope.row.id];
				$scope.grid.startEdit($scope.grid.transIndex[childScope.row.id]);
				$scope.title = $scope.config.formTitle.modify;
				$scope.stopRemoveRow();
			};
			$scope.cancelEditRow = function() {
				var cancelConfirmMsg = $msg.create({
					content: "FORM.BACKCONFIRMNOTE",
					iconCls: "alert",
					okBtn: {
						show: true,
						text: "FORM.LEAVE",
						handler: function(){
							$scope.title = $scope.config.gridTitle;
							$scope.grid.cancelEdit();
							$scope.isEditing.showEditor = false;
							$scope.$emit("gridEditing",$scope.isEditing.showEditor);
							$scope.isEditing.id = -1;
						}
					},
					cancelBtn: {
						show: true,
						text: "FORM.CANCEL",
						handler: function(){}
					}
				});

				if($scope.grid.isDirty()){
					cancelConfirmMsg.show();
				}
				else{
					$scope.title = $scope.config.gridTitle;
					$scope.grid.cancelEdit();
					$scope.isEditing.showEditor = false;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					$scope.isEditing.id = -1;
				}
			};
			/*$scope.saveEditRow = function() {
				$scope.grid.saveEdit({}, function(){
					
					
					$scope.isEditing.showEditor = false;
					$scope.$emit("gridEditing",$scope.isEditing.showEditor);
					$scope.title = $scope.config.gridTitle;
				});
			};*/
			$scope.save = function() {
				/*if($scope.isEditing.id==-1){
					$scope.insertRow()
				}else{
					$scope.saveEditRow();
				}*/
				$scope.insertRow()
			};
			$scope.selectRow = function(childScope){

				childScope.select();
				$scope.selectedRowId.push($scope.grid.transIndex[childScope.row.id]);
				if ($scope.selectedRowId.length) {
					$scope.removeBtn.disabled = false;
				} else {
					$scope.removeBtn.disabled = true;
				}
			};
			$scope.deSelectRow = function(childScope){
				childScope.cancelSelect();
				for (var index = 0; index < $scope.selectedRowId.length; index++) {
					if ($scope.selectedRowId[index] == $scope.grid.transIndex[childScope.row.id]) {
						$scope.selectedRowId.splice(index, 1)
					}
				}
				if ($scope.selectedRowId.length == 0) {
					$scope.removeBtn.disabled = true;
				} else {
					$scope.removeBtn.disabled = false;
				}
			};
			$scope.removeRow = function(childScope){

				$scope.grid['delete']($scope.grid.transIndex[childScope.row.id],{
					operation: "del"
				},function(data){

					$scope.stopRemoveRow();

					$scope.rows.device.length = 0;
					$scope.rows.app.length = 0;
					$scope.rows.phy.length = 0;
					/*if(data){
						function numberorder(a,b){return a.index-b.index};
						data.sort(numberorder);
						for (var index = data.length-1; index >=0; index--){
							if(data[index].success==true){
								$scope.rows[childScope.rowname].splice(data[index].index, 1)
							}
						}
					}else{
						$scope.rows[childScope.rowname].splice($scope.grid.transIndex[childScope.row.id], 1)
					}*/

				},function(){
					$scope.stopRemoveRow();
				},function(){
					$scope.stopRemoveRow();
				});
			};
			$scope.startRemoveRow = function(e){


					//childScope.isRemoveVisible = true;

				var subgrid = grid.querySelectorAll(".fieldset-container");
				
				var targetRowScope;
				var targetRowDom;
				originalLeft = -removeBtnWidth;
				for(var index = 0; index < 3; index++){
					if(subgrid[index].contains(e.target)){
						var rows = subgrid[index].querySelectorAll(".widget-row-container")
					}
				}
				
				for (var index = 0; index < rows.length; index++) {
					if (rows[index].contains(e.target)) {
						targetRowScope = $scope.rows[rows[index].attributes.rowname.value][index];
						targetRowDom = rows[index].childNodes[1];
						$scope.removeFlag.index = targetRowScope.$index;
						$scope.removeFlag.name = targetRowScope.rowname;
						break;
					}
				}
				
				if (!targetRowScope.row.disabled && !targetRowScope.isSelected.visible) {

					var translate3d = "translate3d(" + originalLeft + "px" + ",0,0)";
					targetRowDom.style.transform = translate3d;
					targetRowDom.style["-webkit-transform"] = translate3d;
					targetRowDom.style["-ms-transform"] = translate3d;
					targetRowDom.style["-moz-transform"] = translate3d;
					targetRowDom.style["-o-transform"] = translate3d;
					$scope.$apply();
				}
			};
			$scope.stopRemoveRow = function(){
				if($scope.removeFlag.index!=-1){
					var subgrid = grid.getElementsByClassName($scope.removeFlag.name);
					var rows = subgrid[0].querySelectorAll(".widget-row-container")


					var removeActiveRowDom = rows[$scope.removeFlag.index].childNodes[1];
					var translate3d ="translate3d(0,0,0)";
					removeActiveRowDom.style.transform = translate3d;
					removeActiveRowDom.style["-webkit-transform"] = translate3d;
					removeActiveRowDom.style["-ms-transform"] = translate3d;
					removeActiveRowDom.style["-moz-transform"] = translate3d;
					removeActiveRowDom.style["-o-transform"] = translate3d;
					originalLeft = 0;


					$scope.rows[$scope.removeFlag.name][$scope.removeFlag.index].isRemoveVisible = false;
					$scope.removeFlag.index = -1;
					$scope.removeFlag.name = "";
				}
			};
			$scope.refresh = function(index) {
				$scope.grid.load({
				}, function() {

					var translate3d ="translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					$timeout(function(){
						$scope.loading = false;
					},1000)
				},function() {
					var translate3d ="translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					$timeout(function(){
						$scope.loading = false;
					},1000)
				},function() {
					var translate3d ="translate3d(0,0,0)";
					grid.style.transform = translate3d;
					grid.style["-webkit-transform"] = translate3d;
					grid.style["-ms-transform"] = translate3d;
					grid.style["-moz-transform"] = translate3d;
					grid.style["-o-transform"] = translate3d;
					$timeout(function(){
						$scope.loading = false;
					},1000)
				},false)
			};

			

			$scope.config = angular.extend({}, defaults, $scope.userSetting);


			$scope.title = $scope.config.gridTitle;
			//$scope.config.removable = $scope.removable != undefined ? ($scope.removable == "false" ? false : true) : $scope.config.removable;

			$scope.isEditing = {
				showEditor: false,
				id: -1
			};

			$scope.showSelectFlag = false;
			$scope.selectedRowId = [];
			$scope.removeFlag = {
				index: -1,
				name: ""
			};

			//$scope.hasId = $scope.hasId != undefined ? ($scope.hasId == "false" ? false : true) : true;
			/*
			 *button config
			 */
			$scope.addBtn = angular.extend({}, defaults.addBtn, $scope.userSetting.addBtn);
			$scope.editBtn = angular.extend({}, defaults.editBtn, $scope.userSetting.editBtn);
			$scope.removeBtn = angular.extend({}, defaults.removeBtn, $scope.userSetting.removeBtn);
			$scope.cancelBtn = angular.extend({}, defaults.cancelBtn, $scope.userSetting.cancelBtn);
			$scope.backBtn = angular.extend({}, defaults.backBtn, $scope.userSetting.backBtn);
			$scope.backMenuBtn = angular.extend({}, defaults.backMenuBtn, $scope.userSetting.backMenuBtn);
			$scope.saveBtn = angular.extend({}, defaults.saveBtn, $scope.userSetting.saveBtn);
			$scope.selectBtn = angular.extend({}, defaults.selectBtn, $scope.userSetting.selectBtn);
			$scope.nullBtn = angular.extend({}, defaults.nullBtn, $scope.userSetting.nullBtn);



			/*$scope.$on("rowEditingStart", function(event, rowEditingStart, id) {
				$scope.isEditing.showEditor = rowEditingStart;
				$scope.startEditRow(id);
			});*/

			if($scope.config.dirtySave && $scope.config.editable){
				$scope.$watch(function(){
					return $scope.grid.isDirty();
				}, function(){
					$scope.saveBtn.visible = $scope.grid.isDirty();
				});
			}

		}],
		link: function($scope, $element, $attr) {

			// var hasForm = angular.element($element.children()[3]).find('form').length > 0
			// if ($scope.config.editable) {
			// 	if (!hasForm) {
			// 		throw new Error("Error, no form")
			// 	}
			// }

			
		}
	}
}]);

/*
 *qos row Directive
 */
su.directive("qosRow", function() {
		var	inHTML = 		"<div class=\"widget-row-container\">";
			inHTML +=			"<div class=\"widget-row-select\" checkbox-switch ng-model=\"isSelected\" active-click=\"false\"></div>"
			inHTML += 			"<div class=\"widget-row-base\" ng-class=\"{'remove-active':isRemoveVisible,'select-active':isSelected.visible}\">";
			inHTML += 				"<div class=\"widget-row-base-wrap\" ng-class=\"hasIcon?'icon':''\">";
			inHTML +=					"<div class=\"widget-row-content-container\" ng-repeat=\"column in row.columns\" ng-switch=\"column.type\">"	
			inHTML += 						"<div class=\"widget-row-icon-container\" ng-switch-when=\"icon\">";
			inHTML += 							"<div class=\"widget-row-icon {{column.cls}}\"></div>";
			inHTML += 							"<div class=\"widget-row-icon-text\">{{column.name!=undefined?row[column.name]:''}}</div>";
			inHTML += 						"</div>";
			inHTML += 						"<div translate class=\"widget-row-title {{column.cls}}\" ng-switch-when=\"title\">{{row[column.name].data}}</div>";
			inHTML += 						"<div display-field row-id=\"{{$index}}\" class=\"column-{{$index+1}} widget-row-content {{column.cls}}\"  label=\"{{column.label}}\" ng-switch-when=\"text\" ng-model=\"row[column.name]\"></div>";
			inHTML +=					"</div>";
			inHTML += 				"</div>";
			//inHTML += 				"<div class=\"widget-row-edit-icon\" ng-show=\"$parent.config.editable\"></div>";
			inHTML += 			"</div>";
			inHTML += 			"<div class=\"widget-remove-container\">";
			inHTML +=				"<div class=\"widget-remove-base\"><div translate>FORM.DELETE</div></div>";
			inHTML += 			"</div>";
			inHTML += 		"</div>";
		return {
			//transclude:"element",
			restrict: "A",
			replace: true,
			scope: false,
			template: inHTML,
			//require: "^grid",
			controller:["$scope","$attrs", function($scope,$attrs){
				$scope.isSelected = {
					data: "off",
					visible: false
				};

				//$scope.isRemoveVisible = false;
				//$scope.isChooseVisible = false;
				$scope.rowname = $attrs.rowname;

				$scope.$parent.rows[$attrs.rowname].splice($scope.$index,0,$scope);
				//$scope.row.iconCls = "row-icon";
				if($scope.row.disabled==undefined){
					$scope.row.disabled = false
				}
				if($scope.$parent.showSelectFlag){
					
					//$scope.isChooseVisible = true;
					$scope.isSelected.visible = true;
				}
			}],

			link: function($scope, $element, $attr) {			
				for(var index in $scope.row.columns){
					if($scope.row.columns[index].type == "icon"){
						$scope.hasIcon = true;
						break;
					}
				}

				$scope.cancelSelect = function(){
					$scope.isSelected.data = "off";
				}
				$scope.select = function(){
					$scope.isSelected.data = "on";
					//$scope.$parent.selectRow($scope.$parent.grid.transIndex[$scope.row.id], $attr.rowname)
				}
				$scope.showSelectField = function(){
					//$scope.isChooseVisible = true;
					$scope.isSelected.visible = true;
				}
				$scope.hideSelectField = function(){
					//$scope.isChooseVisible = false;
					$scope.isSelected.visible = false;
				}
			}
		}
	}
);
/*
 * Progress Bar
 */
su.directive('progressBar',["$timeout", "$rootScope", function($timeout, $rootScope){
	var inHTML =  	"<div class=\"widget-progress-container {{cls}}\" ng-show=\"proBar.visible===undefined?true:proBar.visible\">";
		inHTML += 		"<div label-field></div>";
		inHTML += 		"<div class=\"widget-progress-body-container\">";
		inHTML +=			"<div class=\"widget-progress-bar\">";
		inHTML += 				"<div class=\"widget-progress-finish\"></div>";
		inHTML += 				"<div class=\"widget-progress-value\"></div>";
		inHTML +=			"</div>";
		inHTML += 		"</div>";
		inHTML += "</div>";
	return {
		restrict: "AE",
		replace: true,
		scope :{
			proBar: "=ngModel",
			cls: "@"
		},
		template :inHTML,
		/*controller :function(){
		},*/
		compile: function(ele,attr){
	        var children = ele.find('div');
	        //label
			angular.element(children[0]).attr('label', ele.attr('label'));
			return function(scope,element,attrs,ctrl){

					scope.proBar.start = function(){
						scope.proBar.visible = true;
						scope.setID = [];
 						scope.setfnID = false;
 						//var barWidth = parseInt(scope.proBar.width);
 						var barWidth = scope.proBar.width * $rootScope.rootFontSize;
						var max = parseInt(scope.proBar.max) || 100;
						var value = parseInt(scope.proBar.value); //value 决定进度条终点

						element[0].getElementsByClassName("widget-progress-bar")[0].style.width = barWidth+2 + 'px';
						element[0].getElementsByClassName("widget-progress-value")[0].style.width = barWidth + 'px';

						var percent = (value / max * 100).toFixed(1);

						var finishedWidth = (percent / 100 * barWidth).toFixed(1);
						var currentWidth = element[0].getElementsByClassName("widget-progress-finish")[0].offsetWidth;
						currentPercent = parseInt((currentWidth / barWidth * 100).toFixed(1));
						var gap = Math.abs(finishedWidth - currentWidth);
						var offsetType = finishedWidth > currentWidth?true:false;//true->进度条增
						var offsetPx = offsetType?1:-1;//进度条渲染方向
						
						var obj = angular.element(element[0].getElementsByClassName("widget-progress-value"));
						obj.html(parseInt(currentPercent) + '%');

						var speed = parseInt(scope.proBar.speed) || 5;
						speed = speed / gap;

						if(arguments[0] === "success"){
							speed = 1;
						}

						for(i=0; i<gap; i++){
 							scope.setID[i] = $timeout(function() {
								currentWidth += offsetPx;
								currentPercent = (currentWidth / barWidth * 100).toFixed(1);
								if(offsetType){
									currentPercent = currentPercent > scope.percent ? scope.percent : currentPercent;
	 								} else {
									currentPercent = currentPercent < scope.percent ? scope.percent : currentPercent;
								}
								obj.html(parseInt(currentPercent) + '%');
								element[0].getElementsByClassName('widget-progress-finish')[0].style.width = currentWidth + 'px';
							},speed*i, false);
						}
	 					scope.setfnID = $timeout(function() {
							scope.proBar.handler();
							scope.proBar.reset();
						},speed*gap);
					};

					scope.proBar.reset = function(){
						for (var id = 0; id < scope.setID.length; ++id) {
 							$timeout.cancel(scope.setID[id]);
 						}
 						scope.setID = [];
 						$timeout.cancel(scope.setfnID);
 						scope.setfnID = false;

 						element[0].getElementsByClassName("widget-progress-finish")[0].offsetWidth = 0;
					};

					scope.proBar.close = function(){
						if(arguments[0] === "success"){
							for (var id = 0; id < scope.setID.length; ++id) {
	 							$timeout.cancel(scope.setID[id]);
	 						}
	 						scope.setID = [];
	 						$timeout.cancel(scope.setfnID);
	 						scope.setfnID = false;
							scope.proBar.start("success");
						} else {
							scope.proBar.reset();
							scope.proBar.visible = false;
						}
						
					}
 					
			}//return function
		}//compile
	}
}]);


/*
 * Legend Field
 */
su.directive("legendField", function(){

	var inHTML =  "<div class=\"widget-legend-container\">";
		inHTML += 	"<h5 translate class=\"widget-legend-base\" ></h5>";
		inHTML += "</div>";

	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		compile: function(ele, attr){
			var legendTitle = ele.attr("title");
			ele.find("h5").html(legendTitle);
		}
	};
});

/*
 * Expander Field
 */
su.directive("expanderField", function(){

	var inHTML =  	"<div class=\"widget-container widget-expander-container\">";
		inHTML += 		"<div class=\"widget-expander-title-base\">"
		inHTML +=			"<span class=\"widget-expander-icon icon\"></span>"
		inHTML += 			"<span translate class=\"widget-expander-title text\" ></span>";
		inHTML += 		"</div>";
		inHTML += 		"<div ng-transclude ng-show=\"expanderShow\" class=\"widget-expander-content\">";
		inHTML +=		"</div>"
		inHTML += 	"</div>";

	return {
		restrict: "A",
		replace: true,
		transclude: true,
		scope: {
			expanderFlag: "=ngModel"
		},
		template: inHTML,
		compile: function(ele, attr){
			return function(scope,ele,attr){
				var iconEle = angular.element(ele.find("span")[0]);
				var titleEle = angular.element(ele.find("span")[1]);

				var iconInitCls = ele.attr("iconInitCls");
				var iconClickCls = ele.attr("iconClickCls");
				iconEle.addClass(iconInitCls);
				var legendTitle = ele.attr("title");
				titleEle.html(legendTitle);

				scope.expanderFlag = false;
				scope.expanderShow = false;
				
				angular.element(ele.find('div')[0]).bind('click', function(){
					scope.expanderFlag = !scope.expanderFlag;
					scope.expanderShow = !scope.expanderShow;
					iconEle.toggleClass(iconInitCls);
					iconEle.toggleClass(iconClickCls);
					scope.$apply();
				});
				/*
				scope.expanderAction = function(){
					scope.expanderFlag = !scope.expanderFlag;
					scope.expanderShow = !scope.expanderShow;
					iconEle.toggleClass(iconInitCls);
					iconEle.toggleClass(iconClickCls);
					
					//if(scope.expanderShow)angular.element(ele.find('input')[0])[0].focus();
					
				};
				*/
			}
		}
	};
});
/*
*checkbox
*/
su.directive("checkboxGroup", function(){

	var inHTML = 	"<div class=\"widget-checkbox-group-container {{checkboxOption.valid==true?'ng-valid':'ng-invalid'}}\" ng-class=\"checkboxOption.disabled?'widget-disabled-field':''\" ng-hide=\"checkboxOption.visible===false\">";
		inHTML +=		"<div class=\"widget-checkbox-group-base\">";
		inHTML += 			"<div ng-if=\"option !== 'row'\">"
		inHTML +=				"<div ng-repeat=\"checkbox in checkboxOption.options\" class=\"checkbox\" checkbox-field ></div>";
		inHTML += 			"</div>"
		inHTML += 			"<div ng-if=\"option == 'row'\">"
		inHTML +=				"<div ng-repeat=\"checkbox in checkboxOption.options\" class=\"checkbox\" checkbox-row-field ></div>";
		inHTML += 			"</div>"
		inHTML +=		"</div>";
		inHTML +=	"</div>";

		return {
			restrict: "A",
			replace: true,
			scope:  {
				checkboxOption: "=ngModel",
				type: "@",
				option: "@",
				empty: "@"
			},
			template:inHTML,
			compile: function(ele,attr){
				return function($scope,ele,attr){
					// $scope.dataTmp='';
					// $scope.flag=false;
					// $scope.$watch(function(){return $scope.dataTmp},function(newValue,oldValue){	//这是根据数据变化视图
						// for(var i =0;i<$scope.checkboxOption.options.length;i++){
							// $scope.checkboxOption.options[i].status=false;
							// if($scope.option != "row"){
								// var data = newValue;
								// if(angular.isDefined(data) && newValue.toString().split(',').length<=1){
									// if(data === $scope.checkboxOption.options[i].value){
										// $scope.checkboxOption.options[i].status=true;
									// }
								// } else if(angular.isDefined(data)){
									// data=data.replace(/\./g,'');
									// for (var j = 0; j < data.split(',').length-1; j++) {
										// if(data.split(',')[j]===$scope.checkboxOption.options[i].value){
											// $scope.checkboxOption.options[i].status=true;
										// }
									// };
									// $scope.flag=true;
								// }

							// } else {
								// var data = newValue;
								// if(angular.isDefined(data) && data.toString().split(',').length<=1){
									// if(data === i){
										// $scope.checkboxOption.options[i].status=true;
									// }
								// } else if(angular.isDefined(data)){
									// data=data.replace(/\./g,'');
									// for (var j = 0; j < data.split(',').length-1; j++) {
										// if(data.split(',')[j]==i){
											// $scope.checkboxOption.options[i].status=true;
										// }
									// };
									// $scope.flag=true;
								// }
							// }
							
						// }
					// });
					//初始化
					$scope.$watch(function(){return $scope.checkboxOption.data},function(newValue){
						// if(!$scope.flag && newVal !== ""){
							// $scope.checkboxOption.data;
							// $scope.flag=true;
						// }
							if(angular.isDefined($scope.checkboxOption.data) && newValue.toString().split(',').length<=1){//单选
								if($scope.option == "row"){
									for(var i=0;i<$scope.checkboxOption.options.length;i++){
										$scope.checkboxOption.options[i].status=false;
									}
									if(newValue !== ""){
										$scope.checkboxOption.options[newValue].status=true;
									}
								}else{
									for(var i =0;i<$scope.checkboxOption.options.length;i++){
										$scope.checkboxOption.options[i].status=false;
										if($scope.checkboxOption.data === $scope.checkboxOption.options[i].value){
											$scope.checkboxOption.options[i].status=true;
										}
									}
								}
							}
							else if(angular.isDefined($scope.checkboxOption.data)){//多选
								if($scope.option == "row"){
									for(var i =0;i<$scope.checkboxOption.options.length;i++){
										$scope.checkboxOption.options[i].status=false;
										for(var j=0;j<$scope.checkboxOption.data.split(',').length;j++){
											if(i == $scope.checkboxOption.data.split(',')[j]){
												$scope.checkboxOption.options[i].status=true;
											}
										}
									}
								}else{
									for(var i =0;i<$scope.checkboxOption.options.length;i++){
										$scope.checkboxOption.options[i].status=false;
										for(var j=0;j<$scope.checkboxOption.data.split(',').length;j++){
											if($scope.checkboxOption.options[i].value==$scope.checkboxOption.data.split(',')[j]){
												$scope.checkboxOption.options[i].status=true;
											}
										}
									}
								}
							}
					 });

					$scope.$on("checkChange",function(evt,target,id){
						//禁用与否判断
						if(!($scope.checkboxOption.disabled===true)){
							
							if($scope.type == "radio"){//单选
								if(target.status){
									for(var i=0;i<$scope.checkboxOption.options.length;i++){
										$scope.checkboxOption.options[i].status=false;
									}
									$scope.checkboxOption.options[id].status=true;
									$scope.checkboxOption.data=$scope.option == "row"?id:target.value;
								}
								else if(angular.isDefined($scope.empty) &&  $scope.empty === "false"){
									if($scope.option === "row"){
										if($scope.checkboxOption.data === id){
											$scope.checkboxOption.options[id].status=true;
										}
									} else if($scope.checkboxOption.data === target.value){
										$scope.checkboxOption.options[id].status=true;
									}
									//$scope.checkboxOption.data='';
								}
								else{
									$scope.checkboxOption.data = "";
								}
							}
							
							else{//多选
								var dataArray=$scope.checkboxOption.data.split(',')[0]==''?[]:$scope.checkboxOption.data.split(',');
								if(target.status){
									if($scope.option=='row')
										dataArray.push(id)
									else
										dataArray.push(target.value)
								}
								else{
									if($scope.option=='row')
										dataArray=dataArray.filter(function(a){return (a!=id)})
									else
										dataArray=dataArray.filter(function(a){return (a!=target.value)})
								}
								$scope.checkboxOption.data=dataArray.join(',')
							}
							//$scope.$apply();
						}else{
							for(var i=0;i<$scope.checkboxOption.length;i++){
								$scope.checkboxOption.options[i].status=false;
							}
						}
					});
				}
			}
		}
	})
.directive("checkboxField", function(){
	var inHTML = 	"<div class=\"widget-container widget-checkbox-container\" ng-click=\"checkChange()\">";
		inHTML +=		"<div class=\"widget-checkbox-base\">";	
		inHTML +=			"<div ng-class=\" checkbox.status ? 'widget-checkbox-icon-base checked' : 'widget-checkbox-icon-base' \">";
		inHTML +=				"<span class=\"icon\"></span>";
		inHTML +=			"</div>";
		inHTML +=			"<div class=\"widget-checkbox-text-base\">"
		inHTML +=				"<span translate class=\"text\">{{checkbox.name}}</span>";
		inHTML +=			"</div>";
		inHTML +=		"</div>";
		inHTML +=	"</div>";
		return {
			restrict: "A",
			replace: true,
			template:inHTML,
			/*controller: function($scope){
					
			},*/
			compile: function(ele,attr){
				return function($scope,ele,attr){
					$scope.checkChange = function(){
						$scope.checkbox.status = !$scope.checkbox.status;
						$scope.$emit("checkChange", $scope.checkbox,$scope.$index);
					};
				}
			}
		}
})
.directive("checkboxRowField", function(){
	var inHTML = 	"<div class=\"widget-row-container\" ng-click=\"checkChange()\">";

		//inHTML +=		"<div class=\"widget-row-select\" checkbox-switch ng-model=\"isSelected\"></div>"
		inHTML +=		"<div class=\"widget-row-base\">";
		inHTML +=			"<div class=\"widget-row-base-wrap\" ng-class=\"hasIcon?'icon':''\">";	
		
		//inHTML +=				"<div class=\"widget-checkbox-text-base\">"
		inHTML +=					"<div class=\"widget-row-content-container\" ng-repeat=\"column in checkboxOption.columns\" ng-switch=\"column.type\">"
		inHTML += 						"<div class=\"widget-row-icon-container\" ng-switch-when=\"icon\">";
		inHTML += 							"<div class=\"widget-row-icon {{column.cls}}\"></div>";
		inHTML += 							"<div class=\"widget-row-icon-text\">{{column.name!=undefined?checkbox[column.name].data:''}}</div>";
		inHTML += 						"</div>";
		inHTML += 						"<div translate class=\"widget-row-title {{column.cls}}\" ng-switch-when=\"title\">{{checkbox[column.name].data}}</div>";
		inHTML += 						"<div display-field row-id=\"{{$index}}\" class=\"column-{{$index+1}} widget-row-content {{column.cls}}\"  label=\"{{column.label}}\" ng-switch-when=\"text\" ng-model=\"checkbox[column.name]\"></div>";			
		inHTML +=					"</div>"
		//inHTML +=				"</div>";
		inHTML +=				"<div ng-class=\" checkbox.status ? 'widget-checkbox-icon-base checked' : 'widget-checkbox-icon-base' \">";
		inHTML +=					"<span class=\"icon\"></span>";
		inHTML +=				"</div>";
		inHTML +=			"</div>";
		inHTML +=		"</div>";
		//inHTML +=		"<div class=\"widget-row-select\" checkbox-switch ng-model=\"isSelected\"></div>"
		inHTML +=	"</div>";
		return {
			restrict: "A",
			replace: true,
			template:inHTML,
			/*controller: function($scope){
					
			},*/
			compile: function(ele,attr){
				return function($scope,ele,attr){
					for(var index in $scope.checkboxOption.columns){
						if($scope.checkboxOption.columns[index].type == 'icon'){
							$scope.hasIcon = true;
							break;
						}
					}
					$scope.checkChange = function(){
						$scope.checkbox.status = !$scope.checkbox.status;
						$scope.$emit("checkChange",$scope.checkbox, $scope.$index);
					}
				}
			}
		}
});

/*
 * time period
 */
su.directive("timerField", function(){
	var inHTML = "<div class=\"widget-container widget-timer-container\">";
		inHTML +=	"<div label-field label=\"{{label}}\" separator=\"{{separator}}\"></div>";
		inHTML += 	"<div class=\"widget-timer-base column-{{partCount}}\">";
		inHTML +=		"<div class=\"widget-combo-base\"ng-hide=\"hour===false\">";
		inHTML +=			"<div class=\"widget-combo-text\">";
		inHTML +=				"<span class=\"text\">{{timeHour.data.name | translate}}</span>"
		inHTML +=			"</div>";
		inHTML +=			"<div class=\"widget-combo-icon\">";
		inHTML +=				"<span class=\"icon\"></span>";
		inHTML +=			"</div>";
		inHTML +=			"<select ng-change=\"onChange()\" ng-model=\"timeHour.data\" ng-options=\"hour.name | translate for hour in timeHour.options\"></select>";
		inHTML +=		"</div>"
		//inHTML += 		"<div combo-field ng-model=\"timeHour\"></div>";
		inHTML += 		"<span class=\"time-separator\" ng-hide=\"hour===false||min===false\">:</span>";
		//inHTML += 		"<div combo-field ng-model=\"timeMinute\"></div>";
		inHTML +=		"<div class=\"widget-combo-base\" ng-hide=\"min===false\">";
		inHTML +=			"<div class=\"widget-combo-text\">";
		inHTML +=				"<span class=\"text\">{{timeMinute.data.name | translate}}</span>"
		inHTML +=			"</div>";
		inHTML +=			"<div class=\"widget-combo-icon\">";
		inHTML +=				"<span class=\"icon\"></span>";
		inHTML +=			"</div>";
		inHTML +=			"<select ng-change=\"onChange()\" ng-model=\"timeMinute.data\" ng-options=\"min.name | translate for min in timeMinute.options\"></select>";
		inHTML +=		"</div>"
		inHTML += 		"<span class=\"time-separator\" ng-hide=\"min===false||sec===false\">:</span>";
		//inHTML += 		"<div combo-field ng-model=\"timeSecond\"></div>";
		inHTML +=		"<div class=\"widget-combo-base\" ng-hide=\"sec===false\">";
		inHTML +=			"<div class=\"widget-combo-text\">";
		inHTML +=				"<span class=\"text\">{{timeSecond.data.name | translate}}</span>"
		inHTML +=			"</div>";
		inHTML +=			"<div class=\"widget-combo-icon\">";
		inHTML +=				"<span class=\"icon\"></span>";
		inHTML +=			"</div>";
		inHTML +=			"<select  ng-model=\"timeSecond.data\" ng-options=\"sec.name | translate for sec in timeSecond.options\"></select>";
		inHTML +=		"</div>"

		inHTML += 	"</div>";
		inHTML += "</div>";

		return {
			scope: {
				label: "@",
				time: "=ngModel",
				hour: "=",
				min: "=",
				sec: "=",
				separator: "@"
			},
			restrict: "A",
			replace: true,
			template: inHTML,
			compile: function(ele, attr){
				return function(scope, ele, attr){
					scope.timeHour = {};
					scope.timeMinute = {};
					scope.timeSecond = {};
					// scope.timeHour.visible = scope.hour==undefined?true:scope.hour;
					// scope.timeMinute.visible = scope.min==undefined?true:scope.min;
					// scope.timeSecond.visible = scope.sec==undefined?true:scope.sec;

					scope.partCount = 0;

					if(scope.hour !== false){
						scope.partCount++;
					}
					if(scope.min !== false){
						scope.partCount++;
					}
					if(scope.sec !== false){
						scope.partCount++;
					}

					scope.timeHour.options = [
						{value:"00", name:"00"},
						{value:"01", name:"01"},
						{value:"02", name:"02"},
						{value:"03", name:"03"},
						{value:"04", name:"04"},
						{value:"05", name:"05"},
						{value:"06", name:"06"},
						{value:"07", name:"07"},
						{value:"08", name:"08"},
						{value:"09", name:"09"},
						{value:"10", name:"10"},
						{value:"11", name:"11"},
						{value:"12", name:"12"},
						{value:"13", name:"13"},
						{value:"14", name:"14"},
						{value:"15", name:"15"},
						{value:"16", name:"16"},
						{value:"17", name:"17"},
						{value:"18", name:"18"},
						{value:"19", name:"19"},
						{value:"20", name:"20"},
						{value:"21", name:"21"},
						{value:"22", name:"22"},
						{value:"23", name:"23"}
					];

					scope.timeMinute.options = [
						{value:"00", name:"00"},
						{value:"01", name:"01"},
						{value:"02", name:"02"},
						{value:"03", name:"03"},
						{value:"04", name:"04"},
						{value:"05", name:"05"},
						{value:"06", name:"06"},
						{value:"07", name:"07"},
						{value:"08", name:"08"},
						{value:"09", name:"09"},
						{value:"10", name:"10"},
						{value:"11", name:"11"},
						{value:"12", name:"12"},
						{value:"13", name:"13"},
						{value:"14", name:"14"},
						{value:"15", name:"15"},
						{value:"16", name:"16"},
						{value:"17", name:"17"},
						{value:"18", name:"18"},
						{value:"19", name:"19"},
						{value:"20", name:"20"},
						{value:"21", name:"21"},
						{value:"22", name:"22"},
						{value:"23", name:"23"},
						{value:"24", name:"24"},
						{value:"25", name:"25"},
						{value:"26", name:"26"},
						{value:"27", name:"27"},
						{value:"28", name:"28"},
						{value:"29", name:"29"},
						{value:"30", name:"30"},
						{value:"31", name:"31"},
						{value:"32", name:"32"},
						{value:"33", name:"33"},
						{value:"34", name:"34"},
						{value:"35", name:"35"},
						{value:"36", name:"36"},
						{value:"37", name:"37"},
						{value:"38", name:"38"},
						{value:"39", name:"39"},
						{value:"40", name:"40"},
						{value:"41", name:"41"},
						{value:"42", name:"42"},
						{value:"43", name:"43"},
						{value:"44", name:"44"},
						{value:"45", name:"45"},
						{value:"46", name:"46"},
						{value:"47", name:"47"},
						{value:"48", name:"48"},
						{value:"49", name:"49"},
						{value:"50", name:"50"},
						{value:"51", name:"51"},
						{value:"52", name:"52"},
						{value:"53", name:"53"},
						{value:"54", name:"54"},
						{value:"55", name:"55"},
						{value:"56", name:"56"},
						{value:"57", name:"57"},
						{value:"58", name:"58"},
						{value:"59", name:"59"}
					];

					scope.timeSecond.options = [
						{value:"00", name:"00"},
						{value:"01", name:"01"},
						{value:"02", name:"02"},
						{value:"03", name:"03"},
						{value:"04", name:"04"},
						{value:"05", name:"05"},
						{value:"06", name:"06"},
						{value:"07", name:"07"},
						{value:"08", name:"08"},
						{value:"09", name:"09"},
						{value:"10", name:"10"},
						{value:"11", name:"11"},
						{value:"12", name:"12"},
						{value:"13", name:"13"},
						{value:"14", name:"14"},
						{value:"15", name:"15"},
						{value:"16", name:"16"},
						{value:"17", name:"17"},
						{value:"18", name:"18"},
						{value:"19", name:"19"},
						{value:"20", name:"20"},
						{value:"21", name:"21"},
						{value:"22", name:"22"},
						{value:"23", name:"23"},
						{value:"24", name:"24"},
						{value:"25", name:"25"},
						{value:"26", name:"26"},
						{value:"27", name:"27"},
						{value:"28", name:"28"},
						{value:"29", name:"29"},
						{value:"30", name:"30"},
						{value:"31", name:"31"},
						{value:"32", name:"32"},
						{value:"33", name:"33"},
						{value:"34", name:"34"},
						{value:"35", name:"35"},
						{value:"36", name:"36"},
						{value:"37", name:"37"},
						{value:"38", name:"38"},
						{value:"39", name:"39"},
						{value:"40", name:"40"},
						{value:"41", name:"41"},
						{value:"42", name:"42"},
						{value:"43", name:"43"},
						{value:"44", name:"44"},
						{value:"45", name:"45"},
						{value:"46", name:"46"},
						{value:"47", name:"47"},
						{value:"48", name:"48"},
						{value:"49", name:"49"},
						{value:"50", name:"50"},
						{value:"51", name:"51"},
						{value:"52", name:"52"},
						{value:"53", name:"53"},
						{value:"54", name:"54"},
						{value:"55", name:"55"},
						{value:"56", name:"56"},
						{value:"57", name:"57"},
						{value:"58", name:"58"},
						{value:"59", name:"59"}
					];

					scope.timeHour.data = scope.timeHour.options[0];
					scope.timeMinute.data = scope.timeMinute.options[0];
					scope.timeSecond.data = scope.timeSecond.options[0];

					/*scope.timeHour.data = "00";
					scope.timeMinute.data = "00";
					scope.timeSecond.data = "00";*/


					/*var fields = [scope.timeHour,scope.timeMinute,scope.timeSecond];
					$form.formatData(fields, result);*/
					scope.time.getHour = function(){
						return scope.hour==false?"":scope.timeHour.data.value;
					}
					scope.time.getMin = function(){
						return scope.min==false?"":scope.timeMinute.data.value;
					}
					scope.time.getSec = function(){
						return scope.sec==false?"":scope.timeSecond.data.value;
					}

					var time = [];
					scope.$watch(function(scope){
						return scope.time.data;
					},function(){
						if(scope.time.data){
							time.length = 0;
							time = scope.time.data.split(":");
							if(scope.hour!=false){
								//scope.timeHour.data = time[0];
								for(var i = 0;i< scope.timeHour.options.length; i++){
									if(time[0] == scope.timeHour.options[i]['value']){
										scope.timeHour.data = scope.timeHour.options[i];
									}
								}
								if(scope.min!=false){
									//scope.timeMinute.data = time[1];
									for(var i = 0;i< scope.timeMinute.options.length; i++){
										if(time[1] == scope.timeMinute.options[i]['value']){
											scope.timeMinute.data = scope.timeMinute.options[i];
										}
									}
									if(scope.sec!=false){
										//scope.timeSecond.data.value = time[2];
										for(var i = 0;i< scope.timeSecond.options.length; i++){
											if(time[2] == scope.timeSecond.options[i]['value']){
												scope.timeSecond.data = scope.timeSecond.options[i];
											}
										}
									}
								}else if(scope.sec!=false){
									throw new Error("minute missing")
								}else{
									//scope.timeSecond.data.value = time[0];
									for(var i = 0;i< scope.timeSecond.options.length; i++){
										if(time[0] == scope.timeSecond.options[i]['value']){
											scope.timeSecond.data = scope.timeSecond.options[i];
										}
									}
								}					
							}else{
								if(scope.min!=false){
									scope.timeMinute.data.value = time[0];
										for(var i = 0;i< scope.timeMinute.options.length; i++){
										if(time[0] == scope.timeMinute.options[i]['value']){
											scope.timeMinute.data = scope.timeMinute.options[i];
										}
									}
									if(scope.sec!=false){
										//scope.timeSecond.data.value = time[1];
										for(var i = 0;i< scope.timeSecond.options.length; i++){
											if(time[1] == scope.timeSecond.options[i]['value']){
												scope.timeSecond.data = scope.timeSecond.options[i];
											}
										}
									}
								}else{
									if(scope.sec!=false){
										scope.timeSecond.data = time[0];
										for(var i = 0;i< scope.timeSecond.options.length; i++){
											if(time[0] == scope.timeSecond.options[i]['value']){
												scope.timeSecond.data = scope.timeSecond.options[i];
											}
										}
									}
								}
							}
						}
					});

					scope.$watch(function(scope){
						return scope.timeHour.data;
					},function(){
						var temp = "";
						if(scope.hour!=false){
							if(angular.isDefined(scope.timeHour.data)){
								temp += scope.timeHour.data.value;
							}	
						}

						if(scope.min!=false){
							if(angular.isDefined(scope.timeMinute.data)){
								temp += (temp!=""?":":"") + scope.timeMinute.data.value
							}
						}

						if(scope.sec!=false){
							if(angular.isDefined(scope.timeSecond.data)){
								temp += (temp!=""?":":"") + scope.timeSecond.data.value
							}
						}
						scope.time.data = temp;
					},true);

					scope.$watch(function(scope){
						return scope.timeMinute.data;
					},function(){
						var temp = "";
						if(scope.hour!=false){
							if(angular.isDefined(scope.timeHour.data)){
								temp += scope.timeHour.data.value;
						}
						}

						if(scope.min!=false){
							if(angular.isDefined(scope.timeMinute.data)){
								temp += (temp!=""?":":"") + scope.timeMinute.data.value
							}
						}

						if(scope.sec!=false){
							if(angular.isDefined(scope.timeSecond.data)){
								temp += (temp!=""?":":"") + scope.timeSecond.data.value
							}
						}
						scope.time.data = temp;
					},true);

					scope.$watch(function(scope){
						return scope.timeSecond.data;
					},function(){
						var temp = "";
						if(scope.hour!=false){
							if(angular.isDefined(scope.timeHour.data)){
								temp += scope.timeHour.data.value;
							}	
						}

						if(scope.min!=false){
							if(angular.isDefined(scope.timeMinute.data)){
								temp += (temp!=""?":":"") + scope.timeMinute.data.value
							}
						}

						if(scope.sec!=false){
							if(angular.isDefined(scope.timeSecond.data)){
								temp += (temp!=""?":":"") + scope.timeSecond.data.value
							}
						}
						scope.time.data = temp;
					},true);

				}
			}
		}
});
/*
*	status
*/
su.directive('status', ["$timeout","$msg", function($timeout,$msg){
	var inHTML =	"<div ng-repeat=\"statusMsg in statusMessages\">";
		inHTML +=	"<div class=\"widget-full-screen-mask\" ng-show=\"statusMsg.isShow\">";
		inHTML +=		"<div class=\"widget-container widget-status-container\">";
		inHTML +=			"<div class=\"widget-status-wrap\">";
		inHTML +=				"<div class=\"widget-status-content\">";
		inHTML +=					"<div class=\"widget-status-icon-base {{'widget-status-icon-'+statusMsg.type}}\">";
		inHTML +=					"</div>";
		inHTML +=					"<div class=\"widget-status-text-base\">{{statusMsg.text | translate}}";
		inHTML +=					"</div>";
		inHTML +=				"<div>";
		inHTML +=			"</div>";
		inHTML +=		"</div>";
		inHTML +=	"</div>";
		inHTML += 	"</div>";
	return {
		restrict: 'A',
		replace: true,
		template: inHTML,
		compile: function(tElement, tAttrs, transclude){
			return function(scope, iElement, iAttrs, controller){	
				scope.statusMessages = $msg.statusMessage;
			}
		}
	}
}]);	
/*
* buttobgroup
*/
su.directive('buttonGroup', function(){
	var inHTML="<div class=\"widget-container widget-button-group-container\" ng-hide=\"buttonGroup.visible===false\">";
		inHTML+=	"<div class=\"widget-content-container\">"
		inHTML+=		"<div ng-class=\"buttonGroup.options[0].disabled===true?'button-disabled':''\" value=\"{{buttonGroup.options[0].value}}\" class=\"widget-button-group-base widget-button-selected\">";
		inHTML+=		"{{buttonGroup.options[0].text|translate}}</div>";
		//inHTML+=		"<span>|</span>";
		inHTML+=		"<div ng-class=\"{'button-disabled':buttonGroup.options[1].disabled===true,'button-last':buttonGroup.options.length === 2}\" value=\"{{buttonGroup.options[1].value}}\" class=\"widget-button-group-base\">";
		inHTML+=		"{{buttonGroup.options[1].text|translate}}</div>";
		inHTML+=		"<div ng-class=\"buttonGroup.options[2].disabled===true?'button-disabled':''\" value=\"{{buttonGroup.options[2].value}}\" class=\"widget-button-group-base\" ng-show=\"buttonGroup.options[2] !== undefined\">";
		inHTML+=		"{{buttonGroup.options[2].text|translate}}</div>";
		inHTML+=	"</div>";
		inHTML+="</div>";
	return {
		restrict: 'A',
		scope:{
			buttonGroup : '=ngModel'
		},
		replace: true,
		template: inHTML,

		link: function($scope,ele,attr){
			$scope.buttonGroup.data=$scope.buttonGroup.options[0].value;

			var touchHandler = function(event ,index){
				var e = event||window.event;
				var o = e.target||e.srcElement;
				if(o.className.indexOf('button-disabled')>-1||o.className.indexOf('widget-button-group-base')<0)return ;

				// angular.element(ele.find('div')[1]).removeClass('widget-button-selected');
				// angular.element(ele.find('div')[2]).removeClass('widget-button-selected');
				//o.className = 'widget-button-group-base widget-button-selected';
				angular.element(o).addClass('widget-button-selected');
				//其余方法待补?
				for (var i = 0; i < $scope.buttonGroup.options.length; i++) {
					if(i !== index){
						angular.element(ele.find('div')[i+1]).removeClass('widget-button-selected');
					}

					if(angular.element(o).attr('value')==$scope.buttonGroup.options[i].value){
						$scope.buttonGroup.data=$scope.buttonGroup.options[i].value;
						$scope.$apply();
					}
				};
			};

			$scope.$watch("buttonGroup.data", function(newVal, oldVal){
				for(var index = 0; index < $scope.buttonGroup.options.length; index++){
					if(oldVal === $scope.buttonGroup.options[index].value){
						angular.element(ele.find('div')[index+1]).removeClass('widget-button-selected');
					}
					if(newVal === $scope.buttonGroup.options[index].value){
						angular.element(ele.find('div')[index+1]).addClass('widget-button-selected');
					}
				}
			});

			angular.element(ele.find('div')[1]).bind('click touchstart',function(event){//处理函数
				touchHandler(event, 0);
			});
			angular.element(ele.find('div')[2]).bind('click touchstart',function(event){//处理函数
				touchHandler(event, 1);
			});
			angular.element(ele.find('div')[3]).bind('click touchstart',function(event){//处理函数
				touchHandler(event, 2);
			});
		}
	}
});	
/*
*jump
*/
su.directive("jump", function() {
	var inHTML = 	"<div class=\"widget-container widget-jump-container\" on=\"isTarget\" ng-switch>";
	
	inHTML += 			"<div ng-switch-when=\"false\" class=\"widget-jump-href-container\">";
	inHTML +=				"<div class=\"widget-jump-href\" ng-click=\"toTarget()\">";
	inHTML += 					"<div label-field label=\"{{label}}\" separator=\"{{separator}}\"></div>";
	inHTML +=					"<div class=\"widget-jump-href-icon\">";
	inHTML += 						"<span class=\"icon\"></span>";
	inHTML +=					"</div>";
	inHTML +=				"</div>";
	inHTML += 			"</div>";

	inHTML += 			"<div ng-switch-when=\"true\" class=\"widget-jump-target-container\">";
	inHTML += 				"<div class=\"widget-jump-target\" ng-click=\"toHref()\">";
	inHTML +=					"<div class=\"widget-jump-target-icon\">";
	inHTML += 						"<span class=\"icon\"></span>";
	inHTML +=					"</div>";
	inHTML += 				"</div>"

	inHTML += 				"<div ng-transclude class=\"widget-jump-target-content\">";
	inHTML += 				"</div>";
	inHTML += 			"</div>";
		inHTML += 	"</div>";
	return {
		scope: {
			label: "@",
			separator: '@'
		},
		transclude: true,
		restrict: "A",
		replace: true,
		template: inHTML,
		compile: function(ele, attr) {
			return function($scope, ele, attr) {
				$scope.isTarget = false;
				$scope.action = function() {

				};
				$scope.toTarget = function() {
					$scope.isTarget = true;
				};
				$scope.toHref = function() {
					$scope.isTarget = false;
				};
			}
		}
	}
});

/*
*	CheckboxLabel
*/

su.directive("checkboxSwitch", function(){
	/*var inHTML =	"<div class=\"widget-container\" ng-hide=\"checkbox.visible===false\">";
		inHTML +=		"<div class=\"widget-check-switch-label-container\">";
		inHTML +=			"<div label-field label=\"{{label}}\" separator=\"{{separator}}\"></div>";
		inHTML +=			"<div tips-field tips=\"{{tips}}\"></div>";
		inHTML +=		"</div>";
		inHTML += 		"<div class=\"widget-check-switch-checkbox-container\">";
		inHTML +=			"<div class=\"widget-check-switch-base\">";	
		inHTML +=				"<span class=\"icon\"></span>";
		inHTML +=			"</div>";
		inHTML +=		"</div>";
		inHTML += 	"</div>";*/
	var inHTML =	"<div class=\"widget-container widget-checkbox-switch-container\" ng-class=\"checkbox.disabled?'widget-disabled-field':''\"  ng-hide=\"checkbox.visible===false\" ng-click=\"activeClick!==false?changeStatus():null\">";
		inHTML +=		"<div class=\"widget-checkbox-base\">";
		inHTML +=			"<div class=\"widget-checkbox-switch-text-base\">"
		inHTML +=				"<div label-field label=\"{{label}}\" separator=\"space\"></div>";
		inHTML +=				"<div tips-field tips=\"{{tips}}\"></div>";
		inHTML +=			"</div>";
		inHTML +=			"<div ng-class=\"{'checked': status}\" class=\"widget-checkbox-icon-base {{checkbox.disabled===true ? 'disabled' : ''}}\">";
		//inHTML +=			"<div ng-class=\" checkbox.status ? 'widget-checkbox-icon-base checked' : 'widget-checkbox-icon-base' \">";
		//inHTML +=				"<div class=\"icon-wrap\">";
		inHTML +=					"<span class=\"icon\"></span>";
		//inHTML +=				"</div>";
		inHTML +=			"</div>";
		inHTML +=		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: 'A',
		scope:{
			label:'@',
			separator:"@",
			tips:'@',
			checkbox:'=ngModel',
			activeClick: "="
		},
		replace: true,
		template:inHTML,
		compile: function(ele,attr){
			//if(attr.activeClick!=="false")
				return function($scope,ele,attr){
				var defaults = {
					"onValue": "on",
					"offValue": "off"
				}

				var config = angular.extend({}, defaults, $scope.checkbox.options);

				$scope.$watch(function(){return $scope.checkbox.data},function(newValue, oldValue){

					$scope.status=$scope.checkbox.data==config.onValue;
					if(angular.isFunction($scope.checkbox.changeHandler)){
						$scope.checkbox.changeHandler(newValue, oldValue);
					}
				});
				$scope.$watch(function(){return $scope.status},function(){
					$scope.checkbox.data=$scope.status?config.onValue:config.offValue;
				});
				//if($scope.activeClick!==false){
				$scope.changeStatus =  function(){
					if($scope.checkbox.disabled===true)return false;
					$scope.status = !$scope.status;					
				};
			
			}
		}
	}
});	


/*
 *	folder 
*/
su.directive('folderScan', function() {
	var inHTML = 	"<div class=\"widget-container widget-folder-scan-container\">";
		inHTML += 		"<div class=\"widget-folder-path-container\">";
		inHTML += 			"<div class=\"widget-folder-back-content\" cls=\"button-back\" icon-cls=\"back-button\" ng-click=\"back()\"><span class=\"widget-folder-back-icon\"></span></div>";
		inHTML += 			"<div class=\"widget-folder-path-content\">{{folder.path || 'No Path'}}</div>";
		inHTML += 		"</div>";
		inHTML += 		"<div class=\"fieldset-container\" ng-class=\"folder.showFolder.branches.length?'':'hidden'\">";
		inHTML += 			"<div class=\"fieldset-content-container\">";
		inHTML += 				"<div class=\"widget-folder-file-container\" ng-repeat=\"(index,a) in folder.showFolder.branches\">";
		inHTML += 					"<span class=\"widget-folder-file-icon\" ng-click=\"selectPath(a)\" ng-class=\"folder.data==a.path?'select':''\"></span>";
		inHTML += 					"<div class=\"widget-check-switch-base\" ng-click=\"openBranch(index,a)\">";
		inHTML +=						"<span class=\"widget-folder-file-info-name\">{{a.name}}</span>";
		inHTML += 						"<span class=\"widget-folder-file-info-icon\" ng-class=\"a.hasBranch?'hasBranch':''\"></span>";
		inHTML += 					"</div>";
		inHTML += 				"</div>";
		inHTML += 			"</div>";
		inHTML +=		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: 'A',
		scope: {
			folder: '=ngModel'
		},
		replace: true,
		template: inHTML,
		controller: ["$scope","$proxy", function($scope, $proxy) {
/*			$scope.folder = {};
			$scope.folder.data = {};*/
			$scope.folder.showFolder = {};
			$scope.step = [];
			$proxy.request({
				url: $scope.folder.url
			}, {
				"operation": "load",
				"path": "",
				"uuid": $scope.folder.uuid.data
			}, function(data){
				//$scope.folder.selectedData = data;
				//$scope.folder.showFolder = $scope.folder.selectedData;
				//$scope.folder.path = $scope.folder.selectedData.path;
				$scope.folder.selectedData = {"branches": [{"path": data.path, "name": data.name, "hasBranch": data.hasBranch}]};
				$scope.folder.showFolder = $scope.folder.selectedData;//{"branches": {"path": data.path, "name": data.name, "hasBranch": data.hasBranch}};
				$scope.folder.path = "";
			})
			//扩充对象！！
			$scope.openBranch = function(i, a) {
				if (a.hasBranch) {
					$proxy.request({
						url: $scope.folder.url
					}, {
						"operation": "load",
						"path": a.path,
						"uuid": $scope.folder.uuid.data
					}, function(data){
						$scope.step.push(i);
						var dataTemp = $scope.folder.selectedData;
						for (var j = 0; j < $scope.step.length; j++) {
							dataTemp = dataTemp.branches[$scope.step[j]];
						}
						dataTemp.branches = data.branches;
						$scope.folder.showFolder = dataTemp;
						$scope.folder.path = dataTemp.path;
					})
				} else {
					$scope.selectPath(a);
				}
			};
			$scope.back = function() {
				if($scope.step.length){
					$scope.step.pop();
					var dataTemp = $scope.folder.selectedData;
					for (var j = 0; j < $scope.step.length; j++) {
						dataTemp = dataTemp.branches[$scope.step[j]];
					}
					$scope.folder.showFolder = dataTemp;
					$scope.folder.path = dataTemp.path;
				}
			}
			$scope.selectPath = function(a) { //选中一个文件夹触发的事?
				//change icon and set data
				$scope.folder.data = a.path;
			};
		}],
		compile: function(ele, attr) {
			return function($scope, ele, attr) {

			}
		}
	}
});
/*
 * Jump list
 */
su.directive("jumpItem", function() {
	var inHTML = 	"<div class=\"widget-container widget-jump-container\">";
		inHTML += 		"<div  class=\"widget-jump-href-container\">";
		inHTML +=			"<div class=\"widget-jump-href\" ng-mouseup=\"menuSwitch()\">";
		inHTML += 				"<div label-field label=\"{{label}}\" separator=\"space\"></div>";
		inHTML += 				"<span translate class=\"widget-jump-href-content\">{{item.data}}</span>";
		inHTML +=				"<div class=\"widget-jump-href-icon\">";
		inHTML += 					"<span class=\"icon\"></span>";
		inHTML +=				"</div>";
		inHTML +=			"</div>";
		inHTML += 		"</div>";
		inHTML += 	"</div>";
	return {
		scope: {
			label: "@",
			separator: '@',
			value : "@",
			menuOption: "=menuOption",
			item: "=ngModel"
		},
		transclude: true,
		restrict: "A",
		replace: true,
		template: inHTML,
		compile: function(ele, attr) {
			return function(scope, ele, attr) {
				scope.menuSwitch = function() {
					// var e=window.event;
					// e.stopPropagation();
					// e.cancelBubble=true;
					scope.menuOption = scope.value;
				};
			}
		}
	}
});



/*
 *	step directive
*/

su.directive("step", function(){
	var inHTML =	"<div class=\"widget-step-container\" >";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		transclude:true,
		controller:["$scope","$element","$attrs","$transclude", function($scope,$element,$attrs,$transclude){
			//$element.attr("step",$attrs.step)

			var total = $attrs.total;
			var currentstep = $attrs.step;

			if(currentstep==1){
				angular.element($element.parent().children()[0]).addClass("current-step");
			}
			var procesHtml = 	"<div class=\"process-flow\">"
			for(var index = 1; index<= total;index++){
				procesHtml +=	"<div class=\"process-step"+(index<=currentstep?" process-step-passed":"")+"\"><span>"+index+"</span></div>";
			}
				procesHtml += 	"</div>"
			$transclude(function(clone){
				var divGroup = clone.find("div");
				var processPosition = [];

				for(var index = 0; index < divGroup.length; index++){
					if(divGroup[index].hasAttribute("process-position")){
						processPosition.push(divGroup[index])
					}
				}
				if(processPosition.length == 1){
					var processContainer = processPosition[0];
					angular.element(processContainer).append(angular.element(procesHtml));
				}else if(processPosition.length > 1 ){
					throw new Error("Multi process container")
				}else if(processPosition.length == 0){
					throw new Error("Not find process container")
				}
				$element.append(clone)
			})
			$scope.next = function(){
				if($scope.step<=total){
					angular.element($element.parent().children()[$scope.step-1]).removeClass("current-step");
					$scope.step++;
					angular.element($element.parent().children()[$scope.step-1]).addClass("current-step");
				}
			}
			$scope.back = function(){
				if($scope.step>0){
					angular.element($element.parent().children()[$scope.step-1]).removeClass("current-step");
					$scope.step--;
					angular.element($element.parent().children()[$scope.step-1]).addClass("current-step");
				}
			}
		}]
	}
});

/*
 * grid-Legend Field
 */
su.directive("gridLegendField", function(){

	var inHTML =  "<div class=\"widget-legend-container\">";
		inHTML += 	"<h5 class=\"widget-legend-base\"><span translate >{{title}}</span><span ng-if=\"count !== null\" class=\"widget-legend-count\">{{count}}</span></h5>";
		inHTML += "</div>";

	return {
		restrict: "A",
		replace: true,
		template: inHTML,
		scope: {
			count: "=",
			title: "@"
		}
		
	};
});
/*
* device directive
*/
su.directive("device", function() {

	var	inHTML = 		"<div class=\"form-content-container widget-device-container\">"
		inHTML += 			"<div ng-repeat=\"device in deviceList\" class=\"fieldset-container\" ng-hide=\"deviceList.length === 0\">"
		inHTML +=				"<div class=\"widget-device-control-container\" id=\"{{device.serial}}\" >"
		inHTML +=					"<div button text=\"USB.SAFELY_REMOVE\" on-click=\"remove(device.serial)\" btn-cls=\"device-remove-btn\" cls=\"device-remove-cls\" icon-cls=\"device-remove-icon\" ng-model=\"buttonConfig\"></div>"
		inHTML +=				"</div>";
		inHTML += 				"<div class=\"fieldset-content-container widget-device-content-container\">";
		inHTML += 					"<div class=\"widget-device-icon-container\">";
		//inHTML +=						"<div class=\"widget-device-icon-content\">"
		inHTML += 							"<div class=\"widget-device-icon\"></div>";
		inHTML += 							"<div class=\"widget-device-title\">{{device.title}}</div>";
		//inHTML +=						"</div>"
		inHTML += 					"</div>";
		inHTML += 					"<div class=\"widget-volumn-container\">";
		inHTML +=						"<div class=\"widget-volumn-content-container\" ng-repeat=\"vol in device.data\">";
		inHTML +=							"<div class=\"widget-volumn-content\">";
		inHTML += 								"<div class=\"widget-volumn-title\">{{vol.volumn.data}}</div>";
		inHTML += 								"<div display-field label=\"USB.CAPACITY\" class=\"widget-volumn-text\" ng-model=\"vol.capacity\"></div>";
		inHTML += 								"<div display-field label=\"USB.FREESPACE\" class=\"widget-volumn-text\" ng-model=\"vol.free\"></div>";
		inHTML += 							"</div>"
		inHTML +=							"<div class=\"widget-volumn-control\" ng-show=\"hasSwitch\">";
		inHTML +=								"<div switch-field label=\"\" ng-model=\"vol.enable\"></div>";
		inHTML += 							"</div>"
		inHTML +=						"</div>";
		inHTML += 					"</div>";

		inHTML += 				"</div>";

		inHTML += 			"</div>"
		inHTML +=			"<div class=\"widget-list-null-container\" ng-show=\"deviceList.length === 0\">";
		inHTML += 				"<div class=\"widget-list-null-icon widget-device-none-icon\">";
		inHTML += 				"</div>";
		inHTML += 				"<div class=\"widget-list-null-text\">";
		inHTML +=					"<span translate>USB.NO_CLIENT</span>"
		inHTML += 				"</div>";
		//inHTML += 					"<div class=\"widget-list-null-button\">";
		//inHTML += 					"<div button cls=\"widget-list-null-btn-wrap\" btn-cls=\"widget-list-null-btn\" text=\"{{nullBtn.text}}\" ng-model=\"nullBtn\" on-click=\"startAddRow()\"></div>";
		//inHTML += 					"</div>";
		inHTML += 			"</div>";
		inHTML +=		"</div>";

	return {
		restrict: "A",
		replace: true,
		scope: {
			deviceList: "=ngModel",
			safeRemove: "&safeRemove",
			hasSwitch: "@"
		},
		transclude: true,
		template: inHTML,
		controller: ["$scope","$element","$attrs", function($scope, $element, $attrs) {
			$scope.buttonConfig={
				visible:$scope.hasSwitch=="false"?false:true
			};
			$scope.remove = function(serial){

				$scope.$parent.removeDevice(serial);
				//$scope.safeRemove($scope.removeSerial)
			};
		}]
	};
});
/*
 * client
*/
su.directive("clientField", function() {

	var	inHTML = 		"<div class=\"widget-client-container\">";
		inHTML += 			"<div ng-repeat=\"client in clientList\" class=\"widget-client-base\" ng-class=\"type=='usb'?'usb-client':(type=='printer'?'printer-client':'')\">";
		inHTML +=				"<div class=\"widget-client-icon-base\"></div>";
		inHTML +=				"<div class=\"widget-client-info-container\">";
		inHTML +=					"<div class=\"widget-client-info-base widget-client-info-name\">"
		inHTML +=						"<span ng-bind=\"client.hostname\"></span>"
		inHTML +=					"</div>";
		inHTML +=					"<div class=\"widget-client-info-base widget-client-info-ip\">"
		inHTML +=						"<span class=\"widget-client-label\" translate>{{type==\"client\"?\"NETWORK.IP_ADDRESS\":(type==\"usb\"?\"NETWORK.TOTAL\":\" \")}}</span>"
		inHTML +=						"<span ng-bind=\"client.ipaddr\" class=\"widget-client-value\"></span>"
		inHTML +=					"</div>";
		inHTML +=					"<div class=\"widget-client-info-base widget-client-info-mac\">"
		inHTML +=						"<span class=\"widget-client-label\" translate>{{type==\"client\"?\"NETWORK.MAC_ADDRESS\":(type==\"usb\"?\"NETWORK.AVAILABLE\":\" \")}}</span>"
		inHTML +=						"<span ng-bind=\"client.macaddr\" class=\"widget-client-value\"></span>"
		inHTML +=					"</div>";
		inHTML +=				"</div>";
		inHTML += 			"</div>";
		inHTML +=		"</div>";

	return {
		restrict: "A",
		replace: true,
		scope: {
			clientList: "=ngModel",
			type:"@"
		},
		transclude: true,
		template: inHTML,
		link: function($scope, $element, $attr) {
			if($scope.type=='usb'){
				for(var i=0;i<$scope.clientList.length;i++){
					$scope.clientList[i].hostname=$scope.clientList[i].vendor;
					$scope.clientList[i].ipaddr=$scope.clientList[i].capacity+$scope.clientList[i].capacity_unit;
					$scope.clientList[i].macaddr=$scope.clientList[i].available+$scope.clientList[i].available_unit;
				}
			}else if($scope.type=='client'){
				for(var i=0;i<$scope.clientList.length;i++){
					$scope.clientList[i].macaddr=$scope.clientList[i].macaddr.toUpperCase();
				}
			}
			
			// for(var i=0;i<$scope.clientList.length;i++){
				// $scope.clientList[i].hostname={
					// 'data':$scope.clientList[i].hostname
				// };
				// $scope.clientList[i].ipaddr={
					// 'data':$scope.clientList[i].ipaddr
				// };
				// $scope.clientList[i].macaddr={
					// 'data':$scope.clientList[i].macaddr
				// };
			// }
		}
	}
});
/*
 *   slider
*/
su.directive('sliderField',["$swipe","$rootScope", function($swipe, $rootScope){
	var inHTML=	"<div class=\"widget-container widget-slider-container\">";
		inHTML+=	"<div label-field label=\"{{label}}\" separator=\"{{separator}}\"></div>";
		inHTML+=	"<div class=\"widget-percent-container\" ng-bind=\"percent\"></div>";
		inHTML+=	"<div class=\"widget-slider-base\">";
		inHTML+=		"<div class=\"widget-slider-background\">";
		inHTML+=			"<div class=\"widget-slider-inner-background\"></div>";
		inHTML+=			"<div class=\"widget-slider-ball\"></div>";
		inHTML+=		"</div>";
		inHTML+=	"</div>";
		inHTML+="</div>";
	
	return {
		restrict: 'AE',
		template:inHTML,
		replace:false,
		scope:{
			label: "@",
			separator: '@',
			sliderData:'=ngModel'
		},
		compile:function(){
			return function($scope,ele,attr){
				// var rootFontsize = $rootScope.rootFontSize;
				$scope.width=ele.find('div')[3].clientWidth/$rootScope.rootFontSize;
				$scope.$watch(function(){return $rootScope.rootFontSize},function(){
					ele.find('div')[3].clientWidth?$scope.width=ele.find('div')[3].clientWidth/$rootScope.rootFontSize:null;
				});
				$scope.$watch(function(){return $scope.sliderData.range},function(){
					$scope.range=$scope.sliderData.range===undefined?[5,100]:$scope.sliderData.range;
				});
				$scope.$watch(function(){return $scope.sliderData.data},function(){
					if($scope.sliderData.data < 0 ){
						$scope.sliderData.data = 0
					}
					$scope.percent=parseInt($scope.sliderData.data);
					ele.find('div')[5].style.width=$scope.percent/100*$scope.width+'rem';
					ele.find('div')[6].style.left=$scope.percent/100*$scope.width-1+'rem';
					$scope.percent+='%';
				});
				$scope.touchStart=false;
				angular.element(ele.find('div')[6]).bind('touchstart mousedown',function(e){
					//e.preventDefault();
					$scope.touchStart=true;
				});
				ele.bind('touchmove mousemove',function(e){
					//e.preventDefault();
					if($scope.touchStart){
						var x=e.clientX||(e.changedTouches?(e.clientX||e.changedTouches[0].clientX):0);
						if(e.clientY>=(ele[0].offsetTop+ele[0].clientHeight)||e.clientY<=(ele[0].offsetTop)||e.clientX<=(ele[0].offsetLeft)||e.clientX>=(ele[0].offsetLeft+ele[0].clientWidth)){
							$scope.touchStart=false;
							return;
						}
						var pos=Math.floor((x-ele.find('div')[4].offsetLeft)/$rootScope.rootFontSize*20/$scope.width);
						//pos 每一格多少距离
						
						if(pos<0||pos<$scope.range[0]/5){
							pos=$scope.range[0]/5||'0';
							this.style.left=pos*$scope.width/20-1+'rem';
						}else if(pos>20||pos>$scope.range[1]/5){
							if(pos>20&&!$scope.range[1]){
								this.style.left='17rem';
								pos=20;
							}else{
								pos=$scope.range[1]/5;
								this.style.left=pos*$scope.width/20-1+'rem';
							}
						}else{
							 this.style.left=pos*$scope.width/20-1+'rem'
						}
						ele.find('div')[5].style.width=pos*$scope.width/20+'rem';
						$scope.percent=Math.floor(pos/20*100)+'%';
						$scope.sliderData.data=Math.floor(pos/20*100);
						$scope.$apply();
					}
				});
				ele.bind('touchend mouseup',function(e){
					$scope.touchStart=false;
				});
			}
		}
	}
}]);


/*Note*/
su.directive("noteField", function(){
	var inHTML = 	"<div class=\"widget-note-container\">";
		inHTML += 		"<div class=\"widget-note-base\">"
		inHTML +=			"<h6 class=\"widget-note-title\" ng-show=\"title !== undefined\"><span translate>{{title}}</span><span>:</span></h6>";
		inHTML +=			"<span translate class=\"widget-note-content\">{{content | translate}}</span>";
		inHTML +=			"<div ng-transclude></div>"
		inHTML +=		"</div>";
		inHTML += 	"</div>";
	return {
		restrict: "A",
		replace: true,
		scope:{
			content: "@",
			title: "@"
		},
		template: inHTML,
		transclude: true
	};
});

su.directive("layout",["$rootScope", "$window", "$document", "$timeout", function($rootScope, $window, $document, $timeout){
	return{
		restrict: "A",
		link: function($scope, $ele, $attr){
			var devicePixelRatio = Math.floor($window.devicePixelRatio);
			var scale = 1 / devicePixelRatio; 

			var navigatorContainer = angular.element(document.getElementsByClassName("widget-navigator-container")[0]);
			var bodyHeight;
			
			$rootScope.viewport = "initial-scale=" + scale +", maximum-scale=" + scale + ", user-scalable=no";

			var setRootFontSize = function(){
				var winWidth = $window.innerWidth;

				if(winWidth / devicePixelRatio > 540){
					winWidth = 540 * devicePixelRatio;
				}

				var v = devicePixelRatio >= 3 ? 24 : 20;

				// var deviceWidth = document.body.offsetWidth;
				// var deviceHeight = document.body.offsetHeight;
				var deviceWidth = window.screen.width*devicePixelRatio;
				var deviceHeight = window.screen.height*devicePixelRatio;
				if($window.orientation == 90 || $window.orientation == -90 || deviceWidth > deviceHeight){
					$rootScope.rootFontSize = (winWidth / v) * 12 / 16 ;
				}else{
					$rootScope.rootFontSize = winWidth / v;
				};
				$rootScope.$apply();
				// return winWidth / v;
			}
			angular.element($window).bind("resize pageshow orientationchange", function(){
				setRootFontSize();
				var rootFontsize = $rootScope.rootFontSize;
				$ele.css("font-size", rootFontsize+"px");
				// angular.element($document.find("html")[0]).css("font-size", rootFontsize+"px");
				if($rootScope.currentPage === "network"){
					bodyHeight = document.body.offsetHeight/$rootScope.rootFontSize - 1.6 + "rem";
					navigatorContainer.css("height", bodyHeight);
				}
			});

			$scope.$watch(function(){return $rootScope.currentPage}, function(nVal, oVal){
				if(nVal != oVal){
					if(nVal !== "network"){
						// navigatorContainer.css("height", "");
					}else{
						if(!bodyHeight || ($window.orientation !== 90 || $window.orientation !== -90)){
							bodyHeight = document.body.offsetHeight/$rootScope.rootFontSize - 1.6 + "rem";
						}
						navigatorContainer.css("height", bodyHeight);
					}
				}
			});

			$scope.$broadcast("layoutExecuted");
		}
	}
}]);

/* landscape */
su.directive("orientate",["$window", "$rootScope", "$timeout", function($window, $rootScope, $timeout){
	var inHTML = "<div ng-class=\"landscape\" ng-transclude></div>";
	return {
		restrict: "A",
		replace: true,
		transclude: true,
		scope: false,
		transclude: true,
		template: inHTML,
		controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs){

		}],
		link: function($scope, $ele, $attr, ctrl){
			// var navigatorContainer = angular.element(document.getElementsByClassName("widget-navigator-container")[0]);
			var bodyHeight;
			var isOrientate = function(){
				var container = document.getElementsByClassName("widget-nav-content")[0];
				var centerContainer = document.getElementsByClassName("widget-nav-center-container")[0];
				var background = document.getElementsByClassName("widget-nav-inner-background");

				angular.element(container).addClass("animation");

				if(background){
					angular.element(background[0]).css("transform","scale(0)");
					angular.element(background[1]).css("transform","scale(0)");
				}

				if($window.orientation == 90 || $window.orientation == -90){
					$scope.landscape = "landscape";
				}else{
					$scope.landscape = " ";
				}

				if(centerContainer){
					$timeout.cancel(animation);
					angular.element(centerContainer).removeClass("popping")
					var animation = $timeout(function(){
						angular.element(centerContainer).css("opacity", "1");
						angular.element(centerContainer).addClass("popping")
					},10);

					angular.element(centerContainer).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
						e.stopPropagation();
						if(e && e.animationName == "popHalo"){
							// var background = document.getElementsByClassName("widget-nav-background")[0];
							if(background){
								angular.element(background[0]).addClass("last");
								angular.element(background[0]).css("transform","scale(1)");
								angular.element(background[1]).addClass("last");
							}
						}
						
					});

					angular.element(centerContainer).bind("animationstart webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart", function(e){
						e.stopPropagation();
						if(e && e.animationName == "popping"){
							// var background = document.getElementsByClassName("widget-nav-background")[0];
							if(background){
								angular.element(background[0]).css("transform","scale(0)");
								angular.element(background[1]).css("transform","scale(0)");
							}
						}
						
					});

					angular.element(background[1]).bind("animationstart webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart", function(e){
						angular.element(background[1]).css("transform","scale(1)");
					});

					angular.element(background[1]).bind("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend", function(e){
						if(angular.element(document.getElementsByClassName("widget-nav-inner-background")[1]).hasClass("last")){
							angular.element(document.querySelectorAll(".widget-nav-content")).removeClass("animation");
							angular.element(document.getElementsByClassName("widget-nav-inner-background")[0]).removeClass("last");
							angular.element(document.getElementsByClassName("widget-nav-inner-background")[1]).removeClass("last");
						}
					});
				}
				/*if($rootScope.currentPage == "network"){
					bodyHeight = document.body.offsetHeight/$rootScope.rootFontSize-3.26+"rem";
					navigatorContainer.css("height", bodyHeight);
				}*/


				$timeout(function(){
					var bodyWidth = document.body.offsetWidth;
					var bodyHeight = document.body.offsetHeight;
					var navConetntWidth = 93.75;

					if((bodyWidth/640 > bodyHeight/1136) && (bodyWidth < bodyHeight)){
						navConetntWidth = navConetntWidth / (bodyWidth / 640) * (bodyHeight / 1136);
						angular.element(document.querySelectorAll(".widget-nav-content")).css("width", navConetntWidth+"%");
					}
					if(bodyWidth >= bodyHeight){
						angular.element(document.querySelectorAll(".widget-nav-content")).css("width", "93.75%");
					}
				}, 1000);
				
			}
			
			isOrientate();
			angular.element($window).bind("orientationchange", function(){
				isOrientate();
				$scope.$apply();
			});

			/*if($rootScope.currentPage == "network"){
				$scope.$on("$destroy", function(){
					navigatorContainer.css("height", "");
				});
			}*/
		}
	}
}]);

/*
 * suShow
 */
su.directive("suShow", ["$window", "$parse", "$rootScope", function($window, $parse, $rootScope){
	var inHTML =	"<div class=\"su-show-container\">";
		inHTML +=		"<div class=\"su-show-body\">";
		inHTML +=			"<div class=\"su-show-content\" ng-transclude></div>";
		inHTML +=		"</div>";
		inHTML +=	"</div>";
		
	return	{
		restrict: "A",
		replace: true,
		transclude: true,
		template: inHTML,
		scope:  {
			showFlag: '=suShow',
			appearDivId: '@appearDivId',	//the div user want it to come in sight after slide animation
			appearDivCls: '@appearDicCls',
			scrollDIvId: '@scrollDivId',	////the div which is the base of the sroll animation after slide animation(will be the 'body' if not defined)
			scrollDivCls: '@scrollrDicCls'
		},
		link: function($scope,ele,attr){
			var suShowContainer = ele[0];
			var suShowBody = (ele[0]).querySelectorAll(".su-show-body")[0];
			var suShowContent = (ele[0]).querySelectorAll(".su-show-content")[0];
			
			var appearDiv;	//
			var scrollDiv;	//
			
			var strechTimeoutFunc1;
			var strechTimeoutFunc2;
			var scrollIntervalFunc;
			
			if($scope.appearDivId){
				appearDiv = document.getElementById($scope.appearDivId);
			}else if($scope.appearDivCls){
				appearDiv = document.getElementsByClassName($scope.appearDivCls)[0];	//left
			}
			
			if($scope.scrollDIvId){
				scrollDiv = document.getElementById($scope.scrollDIvId);
			}else if($scope.scrollDivCls){
				scrollDiv = document.getElementsByClassName($scope.scrollDivCls)[0];	//left
			}else{
				// scrollDiv = document.getElementsByClassName("module-container")[0];
				scrollDiv = document.getElementsByClassName("view-container")[0];
			}
			
			var changeView = function(value){
				clearTimeout(strechTimeoutFunc1);
				clearTimeout(strechTimeoutFunc2);
				clearInterval(scrollIntervalFunc);
				angular.element(suShowBody).removeClass("auto-height");
				angular.element(suShowBody).removeClass("show");
				suShowBody.style.height = suShowBody.offsetHeight + 'px';
				if(value){
					suShowBody.style.height = suShowContent.offsetHeight + 'px';
					
					angular.element(suShowContainer).addClass("opened");
					
					if(!appearDiv) {
						if(attr.appearDivId || attr.appearDivCls){
							if($scope.appearDivId){
								appearDiv = document.getElementById($scope.appearDivId);
							}else if($scope.appearDivCls){
								appearDiv = document.getElementsByClassName($scope.appearDivCls)[0];	//left
							}
						}
					};
					
					if(!appearDiv){
						strechTimeoutFunc1 = setTimeout(function(){
							angular.element(suShowBody).addClass("auto-height");
							angular.element(suShowBody).addClass("show");
						},205);
						return;
					};
					
					var windowHeight;
					var flagScrollDivNotDefine = false;
					
					if($scope.scrollDIvId || $scope.scrollDivCls){
						windowHeight = scrollDiv.clientHeight;
					}else{
						windowHeight = document.getElementsByTagName("html")[0].clientHeight;
						flagScrollDivNotDefine = true;
					}
					
					strechTimeoutFunc2 = setTimeout(function(){
						angular.element(suShowBody).addClass("auto-height");
						angular.element(suShowBody).addClass("show");
						if(scrollDiv.scrollHeight > windowHeight){
							var currentScrollTop = scrollDiv.scrollTop;
							var targetScrollTop = 0;
							var tmp = flagScrollDivNotDefine ? (scrollDiv.scrollHeight - appearDiv.offsetTop  + 2.4 * $rootScope.rootFontSize) : (scrollDiv.scrollHeight - appearDiv.offsetTop);
							if (tmp > windowHeight){
								targetScrollTop = flagScrollDivNotDefine ? (appearDiv.offsetTop  - 2.4 * $rootScope.rootFontSize) : appearDiv.offsetTop;
							}else {
								targetScrollTop = scrollDiv.scrollHeight - windowHeight;
							}
							
							var times = 20;
							
							scrollIntervalFunc = setInterval(function(){
								if (0 == times) {
									scrollDiv.scrollTop = targetScrollTop;
									clearInterval(scrollIntervalFunc);
								}else{
									scrollDiv.scrollTop += (targetScrollTop-currentScrollTop)/20;
									times-=1;
								}
							}, 10);
						};
					},205);
					
				}else{
					suShowBody.style.height = 0 + 'px';
					angular.element(suShowContainer).removeClass("opened");
				}
				
			};
			
			$scope.$watch( function(){ return $scope.showFlag}, function(nValue, oValue){
				changeView(nValue);
			}, true);
			
			angular.element($window).on('resize', function() {
				if($scope.showFlag){
					suShowBody.style.height = suShowContent.offsetHeight + 'px';
				}
			});

		}
	}
}]);