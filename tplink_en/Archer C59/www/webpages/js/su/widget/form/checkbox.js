// JavaScript Document
(function($){


$.su.Widget("checkbox", {
	defaults: {
		name: null,
		items: [],
		fieldLabel: null,
		cls: "",

		/*tips: "",*/
		columns: 1 //在几列中显示，默认为1
	},
	create: function(defaults, options){
		var me = this;
		me.each(function(i, obj){
			var input = $(this),
				id = options.id || this.id || defaults.id,
				value = options.value || this.value || defaults.value,
				name = options.name || this.name || defaults.name;

			input.addClass("hidden");
			//this.setAttribute("type", "hidden");
			$.extend(this, defaults, options);

			//重新初始化属性
			input.attr({
				value: value,
				id: id,
				name: name
			}).val(value).addClass("checkbox");

			//console.log(obj)

			var inHTML = 	"<div class=\"container widget-container checkbox-group-container "+this.cls+"\">";
				
			if (this.fieldLabel !== null){
				inHTML +=		"<div class=\"widget-fieldlabel-wrap "+this.labelCls+"\">";
				inHTML +=			"<label class=\"widget-fieldlabel checkbox-group-label\">"+this.fieldLabel+"</label>";
				if (this.fieldLabel !== ""){
					inHTML +=		"<span class=\"widget-separator\">"+this.separator+"</span>";
				};
				inHTML +=		"</div>";
			};

				inHTML +=		"<div class=\"widget-wrap-outer checkbox-group-wrap-outer\">";
				inHTML +=			"<div class=\"checkbox-group-wrap\">";
				
			var items = this.items,
				len = items.length,
				perColumnNum = Math.ceil(len/this.columns),
				_numFlag = 0;

				inHTML += 				"<ul class=\"checkbox-group-list-wrap\">";

			for (var index = 0; index < items.length; index++){
				var boxName = items[index].name || name || "",
					boxValue = items[index].inputValue || value || "on",
					uncheckedValue = items[index].uncheckedValue || "off",
					itemCls = items[index].itemCls || "",
					boxId = items[index].id || "checkbox-" + parseInt(Math.random()*1000*1000*1000, 10).toString();

				var checked = "",
					disabled = "",
					checkedCls = "";

				if (items[index].checked === "checked" || items[index].checked === true){
					checked = "checked=\"checked\"";
					disabled = "disabled=\"disabled\"";
					checkedCls = "checked";
				};

				var funcInitLi = function(boxName, boxValue, boxId, boxlabel){

					inHTML += 				"<li class=\"checkbox-list\">";
					inHTML += 					"<div class=\"widget-wrap\">";
					inHTML +=						"<label class=\"checkbox-label "+itemCls+" "+checkedCls+"\" for=\""+boxId+"\">";
					inHTML +=							"<input class=\"hidden\" type=\"hidden\" name=\""+boxName+"\" value=\""+uncheckedValue+"\" data-checked=\""+boxValue+"\" data-unchecked=\""+uncheckedValue+"\" "+disabled+" />";
					inHTML += 							"<input class=\"checkbox-checkbox\" type=\"checkbox\" name=\""+boxName+"\" value=\""+boxValue+"\" data-checked=\""+boxValue+"\" data-unchecked=\""+uncheckedValue+"\" id=\""+boxId+"\" "+checked+" />";
					inHTML +=							"<span class=\"icon\"></span>";
					inHTML +=							"<span class=\"text\">"+items[index].boxlabel+"</span>";
					inHTML +=						"</label>";
					inHTML += 					"</div>";
					inHTML += 				"</li>";
				};

				if (_numFlag < perColumnNum){
					funcInitLi(boxName, boxValue, boxId, items[index].boxlabel);
				}else{
					inHTML +=			"</ul>";
					inHTML +=			"<ul class=\"checkbox-group-list-wrap\">";
					funcInitLi(boxName, boxValue, boxId, items[index].boxlabel);
					_numFlag = 0;
				}
				_numFlag++;
			};

				inHTML += 				"</ul>";

				inHTML +=			"</div>";

			if (this.tips != null && this.tips != undefined){
				inHTML +=			"<div class=\"widget-tips textbox-tips "+obj.tipsCls+"\">";
				inHTML += 				"<div class=\"widget-tips-wrap\">";
				inHTML +=					"<div class=\"content tips-content\"></div>";
				inHTML +=				"</div>";
				inHTML +=			"</div>";
			};

				inHTML +=			"<div class=\"widget-error-tips textbox-error-tips "+obj.errorTipsCls+"\">";
				inHTML +=				"<span class=\"widget-error-tips-delta\"></span>";
				inHTML +=				"<div class=\"widget-error-tips-wrap\">";
				inHTML +=					"<div class=\"content error-tips-content\"></div>";
				inHTML +=				"</div>";
				inHTML +=			"</div>";
				
				inHTML +=		"</div>";
				inHTML +=	"</div>";

			var container = $(inHTML);
			input.prop("disabled", true).val("").replaceWith(container);
			container.prepend(input);
		});

		var container = me.closest("div.checkbox-group-container");
		container.delegate("label.checkbox-label", "click", function(e){
			e.preventDefault();

			var label = $(this),
				li = label.closest("li.checkbox-list");

			if (li.hasClass("disabled")){
				return;
			}

			var vOld = me.checkbox("getValue");

			label.toggleClass("checked");

			var checkbox = label.find("input[type=checkbox]").eq(0),
				unchecked = checkbox.prev("input[type=hidden]");

			if (checkbox.prop("checked")){
				checkbox.prop("checked", false);
				checkbox.prop("disabled", true);
				unchecked.prop("disabled", false);
			}else{
				checkbox.prop("checked", true);
				checkbox.prop("disabled", false);
				unchecked.prop("disabled", true);
			};

			/*if (checkbox.attr("data-unchecked") !== ""){
				if (checkbox.prop("checked")){
					checkbox.prop("checked", false);
					unchecked.prop("disabled", false);
				}else{
					checkbox.prop("checked", true);
					unchecked.prop("disabled", true);
				}
			}else{
				unchecked.prop("disabled", true);
				if (checkbox.prop("checked")){
					checkbox.prop("checked", false);
				}else{
					checkbox.prop("checked", true);
				}
			};*/

			var vNew = me.checkbox("getValue");
			if (vNew.sort().toString() !== vOld.sort().toString()){
				me.trigger("ev_change", [vOld, vNew]);
			};
			
			me.trigger("ev_click", vNew);
		});
		
		me.checkbox("setTips", options.tips);
		return me;
	},
	setValue: function(me, _value){
		var me = me || this,
			value = _value[1],
			vOld = me.checkbox("getValue"),
			vNew = [],
			container = me.checkbox("getContainer");

		if($.type(value) == "string" && me.get(0).items.length != 1){
			return false;
		}

		if($.type(value) == "string"){
			var tmpValue = {};
			tmpValue[container.find("input[type=checkbox]")[0].name] = value;		
			value = tmpValue;
		}else if($.type(value) != "object"){
			return false;
		}

		for(var name in value){
			var targetValue = value[name];
			var checkBox = container.find("input[name="+name+"][value="+targetValue+"][type=checkbox]");
			var hiddenBox = container.find("input[name="+name+"][value="+targetValue+"][type=hidden]");
			if (checkBox.length){
				checkBox.closest("label.checkbox-label").addClass("checked");
				vNew.push(checkBox.get(0).name);

				checkBox.get(0).checked = true;
				checkBox.get(0).disabled = false;

				container.find("input[name="+name+"][type=hidden]").get(0).checked = false;
				container.find("input[name="+name+"][type=hidden]").get(0).disabled = true;
			}

			if (hiddenBox.length){
				hiddenBox.closest("label.checkbox-label").removeClass("checked");
				hiddenBox.get(0).checked = true;
				hiddenBox.get(0).disabled = false;

				container.find("input.checkbox-checkbox[name="+name+"][type=checkbox]").get(0).checked = false;
				container.find("input.checkbox-checkbox[name="+name+"][type=checkbox]").get(0).disabled = true;
 			};
		}

		if (vNew.sort().toString() !== vOld.sort().toString()){
			me.trigger("ev_change", [vOld, vNew]);
		};

		return me;
	},
	/*getValue: function(me){
		var me = me || this;
		var	container = me.checkbox("getContainer");
		var	result = [];

		container.find("input[type=checkbox]").each(function(i, obj){
			var tar = $(obj);
			if (obj.checked){
				var v = tar.attr("data-checked");
				if (v){
					result.push(v);
				};
			}else{
				var v = tar.attr("data-unchecked")
				if (v){
					result.push(v);
				};
			};
		});
		//console.log(result)
		return result;
	},*/
	getValue: function(me) {
		var me = me || this,
			container = me.checkbox("getContainer"),
			result = [];

		container.find("input[type=checkbox]").each(function(i, obj){
			if (obj.checked){
				result.push(obj.name);
			};
		});

		return result;
	},
	reset: function(me){
		var me = me || this,
			obj = me.get(0),
			//items = obj.items,
			val = "";

		if (obj.defaultValue){
			val = obj.defaultValue;
		}/*else if (items[0]){
			val = items[0]["inputValue"];
		}*/;

		me.checkbox("setValue", val);
		return me;
	},
	disable: function(me){
		var me = me || this,
			obj = me.get(0),
			container = me.checkbox("getContainer").addClass("disabled"),
			checkboxs = container.find("input.checkbox-checkbox");

		checkboxs.each(function(i, obj){
			var tar = $(obj);
			
			tar.closest("li.checkbox-list").addClass("disabled");
			tar.closest("label.checkbox-label").addClass("disabled");
			tar.prev("input[type=hidden]").prop("disabled", true);
			tar.prop("disabled", true);
			
		});

		return me;
	},
	enable: function(me){
		var me = me || this,
			obj = me.get(0),
			container = me.checkbox("getContainer").removeClass("disabled"),
			checkboxs = container.find("input.checkbox-checkbox");

		checkboxs.each(function(i, obj){
			var tar = $(obj);

			tar.closest("li.checkbox-list").removeClass("disabled");
			tar.closest("label.checkbox-label").removeClass("disabled");
			tar.prev("input[type=hidden]").prop("disabled", false);
			tar.prop("disabled", false);
			
		});

		return me;
	},
	disableItem: function(me, valueArray){
		var me = me || this,
			obj = me.get(0),
			container = me.checkbox("getContainer"),
			checkboxs = container.find("input.checkbox-checkbox"),
			valueArray = valueArray[1];

		if ($.type(valueArray) === "string"){
			valueArray = [valueArray];
		};

		var valueObj = (function(){
			var valueObj = {};
			for (var index = 0; index < valueArray.length; index++){
				valueObj[valueArray[index]] = true;
			};
			return valueObj;
		})();

		checkboxs.each(function(i, obj){
			var tar = $(obj);
			if (tar.val() in valueObj){
				tar.closest("li.checkbox-list").addClass("disabled");
				tar.closest("label.checkbox-label").addClass("disabled");
				tar.prev("input[type=hidden]").prop("disabled", true);
				tar.prop("disabled", true);
			};
		});

		return me;
	},
	enableItem: function(me, valueArray){
		var me = me || this,
			obj = me.get(0),
			container = me.checkbox("getContainer"),
			checkboxs = container.find("input.checkbox-checkbox"),
			valueArray = valueArray[1];

		if ($.type(valueArray) === "string"){
			valueArray = [valueArray];
		};

		var valueObj = (function(){
			var valueObj = {};
			for (var index = 0; index < valueArray.length; index++){
				valueObj[valueArray[index]] = true;
			};
			return valueObj;
		})();

		checkboxs.each(function(i, obj){
			var tar = $(obj);
			if (tar.val() in valueObj){
				tar.closest("li.checkbox-list").removeClass("disabled");
				tar.closest("label.checkbox-label").removeClass("disabled");
				tar.prev("input[type=hidden]").prop("disabled", false);
				tar.prop("disabled", false);
			};
		});

		return me;
	},
	getContainer: function(me){
		var me = me || this;
		return me.closest("div.checkbox-group-container");
	}
	/*,
	selectAll: function(me){
		var me = me || this,
			container = me.checkbox("getContainer");
		container.find("input[type=checkbox]").attr("checked", "checked");
	},
	deselectAll: function(me){
		var me = me || this,
			container = me.checkbox("getContainer");
		container.find("input[type=checkbox]").removeAttr("checked");
	}*/
});

})(jQuery);
