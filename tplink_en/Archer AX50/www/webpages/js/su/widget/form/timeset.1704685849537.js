// JavaScript Document
(function($){

$.su.Widget("timeset", {
	defaults: {
		fieldLabel: "",
		cls: "",
		hour12: true,
		tips: "",
		hourExchange: function(hour){
			if(hour==0){
				return [12,"AM"];
			}if(hour==12){
				return [12,"PM"];
			}else if (hour<=11){
				return [hour,"AM"];						
			}else{
				return [hour%12,"PM"];						
			}
		},
		getCursortPosition: function(ctrl) {
	        var CaretPos = 0; // IE Support
	        if (document.selection) {
	            var Sel = document.selection.createRange();
	            Sel.moveStart('character', -ctrl.value.length);
	            CaretPos = Sel.text.length;
	        }
	        // Firefox support
	        else if (ctrl.selectionStart || ctrl.selectionStart == '0')
	            CaretPos = ctrl.selectionStart;
	        return (CaretPos);
		}
		
	},
	create: function(defaults, options){
		var me = this;
		me.each(function(i, obj){
			var tar = $(obj);
			$.extend(obj, defaults, options);

			var inHTML = 	"<div class=\"container widget-container text-container timeset-container "+this.cls+"\">";

			if (this.fieldLabel !== null){
				inHTML +=		"<div class=\"widget-fieldlabel-wrap "+this.labelCls+"\">";
				inHTML +=			"<label class=\"widget-fieldlabel text-fieldlabel\">"+this.fieldLabel+"</label>";
				if (this.fieldLabel !== ""){
					inHTML +=		"<span class=\"widget-separator\">"+this.separator+"</span>";
				};
				inHTML +=		"</div>";
			};

				inHTML +=		"<div class=\"widget-wrap-outer text-wrap-outer timeset-wrap-outer\">";
				inHTML +=			"<div class=\"timeset-mask hidden\"></div>";
				inHTML +=			"<div class=\"widget-wrap text-wrap timeset-wrap\">";
				inHTML +=				"<span class=\"text-wrap-before\"></span>";
				inHTML +=				"<span class=\"text-wrap timeset-wrap\">";
				inHTML +=					"<input type=\"text\" class=\"text-text timeset-text timeset-text-hour\" maxLength=\"2\" />";
				inHTML +=					"<span>:</span>";
				inHTML +=					"<input type=\"text\" class=\"text-text timeset-text timeset-text-minute\" maxLength=\"2\" />";
				inHTML +=					"<input class=\"text-text timeset-text hour12 "+(this.hour12?"inline-block":"hidden")+"\" />";
				inHTML +=					"<div class=\"arrow-wrap\">";
				inHTML +=						"<span class=\"arrow arrow-up\"></span>";
				inHTML +=						"<span class=\"arrow arrow-down\"></span>";
				inHTML +=					"</div>";
				inHTML +=				"</span>";
				inHTML +=				"<span class=\"text-wrap-after\"></span>";
				inHTML +=			"</div>";
				
				if (this.tips != null && this.tips != undefined){
					inHTML +=			"<div class=\"widget-tips textbox-tips "+this.tipsCls+"\">";
					inHTML +=				"<div class=\"content tips-content\">"+this.tips+"</div>";
					inHTML +=			"</div>";
				};
				
				inHTML +=		"</div>";

				inHTML +=			"<div class=\"widget-error-tips textbox-error-tips "+this.errorTipsCls+"\">";
				inHTML +=				"<span class=\"widget-error-tips-delta\"></span>";
				inHTML +=				"<div class=\"widget-error-tips-wrap\">";
				inHTML +=					"<div class=\"content error-tips-content\"></div>";
				inHTML +=				"</div>";
				inHTML +=			"</div>";


				inHTML +=	"</div>";

			var container = $(inHTML);
			tar.replaceWith(container);
			container.find("span.timeset-wrap").append(tar.addClass("hidden"));

		});

		//事件监听部分
		var container = me.closest("div.timeset-container"),
			timesetTextHour = container.find("input.timeset-text-hour"),
			timesetTextMinute = container.find("input.timeset-text-minute"),
			timesetTextAMPM = container.find("input.hour12"),
			position = 0,
			hourSelect = false,
			minuteSelect = false;

			container.delegate("div.widget-wrap", "focus", function(e){
				container.find("div.widget-wrap").addClass("focus");
			}).delegate("div.widget-wrap", "blur", function(e){
				container.find("div.widget-wrap").removeClass("focus");
			}).delegate("input.timeset-text-hour", "click", function(e){
				position = 0;
			}).delegate("input.timeset-text-hour", "blur", function(e){
				if(timesetTextHour.val()==""){
					timesetTextHour.val(me.val().split(me.get(0).separator)[0]);
				}

				var hour = 0;
				hour = parseInt(timesetTextHour.val());
				if(hour>=0&&hour<=9){
					hour = "0"+hour;
				}
				if(me.get(0).hour12 && hour==0){
					hour = 12;
				}
				timesetTextHour.val(hour);
				me.val(timesetTextHour.val()+":"+timesetTextMinute.val());
				me.trigger("ev_change");
			}).delegate("input.timeset-text-hour", "keydown", function(e){
				if(!(e.keyCode>=48&&e.keyCode<=57)&&!(e.keyCode>=96&&e.keyCode<=105)&&e.keyCode!=8&&e.keyCode!=46&&e.keyCode!=37&&e.keyCode!=39){
					e.preventDefault();
					return;
				}

				if(hourSelect){
					timesetTextHour.val("");
					hourSelect = false;
				}
				var hour = timesetTextHour.val();
				if(e.keyCode==8 || e.keyCode==46 || hour.length>=2){
					return;
				}
				var obj = me.get(0);
				var pos = obj.getCursortPosition($(e.target)[0]);
				//hour = parseInt(hour, 10) || 0;
				var key = e.key || (e.keyCode < 58 ? (e.keyCode - 48) : (e.keyCode - 96));
				var keyNum = parseInt(key, 10);
				if (pos == 0 && hour != "") {
					hour = parseInt(hour, 10);
		            hour = keyNum * 10 + hour;
		        } else {
		        	hour = parseInt(hour, 10) || 0;
		            hour = hour * 10 + keyNum;
		        }
				

				if(me.get(0).hour12 && (hour>12 || hour==0)){
					e.preventDefault();
					return;
				}
				if(hour>=24){
					e.preventDefault();
					return;
				}

				me.val(hour+":"+timesetTextMinute.val());
				me.trigger("ev_change");
			}).delegate("input.timeset-text-minute", "click", function(e){
				position = 1;
			}).delegate("input.timeset-text-minute", "blur", function(e){
				if(timesetTextMinute.val()==""){
					timesetTextMinute.val(me.val().split(me.get(0).separator)[1]);
				}

				var minute = 0;
				minute = parseInt(timesetTextMinute.val());
				if(minute>=0&&minute<=9){
					minute = "0"+minute;
				}
				timesetTextMinute.val(minute);
				me.val(timesetTextHour.val()+":"+timesetTextMinute.val());
				me.trigger("ev_change");
			}).delegate("input.timeset-text-minute", "keydown", function(e){
				if(!(e.keyCode>=48&&e.keyCode<=57)&&!(e.keyCode>=96&&e.keyCode<=105)&&e.keyCode!=8&&e.keyCode!=46&&e.keyCode!=37&&e.keyCode!=39){
					e.preventDefault();
					return;
				}

				if(minuteSelect){
					timesetTextMinute.val("");
					minuteSelect = false;
				}
				var minute = timesetTextMinute.val();
				if(e.keyCode==8 || e.keyCode==46 || minute.length>=2){
					return;
				}
				var obj = me.get(0);
				var pos = obj.getCursortPosition($(e.target)[0]);
				//minute = parseInt(minute, 10) || 0;
				var key = e.key || (e.keyCode < 58 ? (e.keyCode - 48) : (e.keyCode - 96));
				var keyNum = parseInt(key, 10);
				if (pos == 0 && minute != "") {
					minute = parseInt(minute, 10);
		            minute = keyNum * 10 + minute;
		        } else {
		        	minute = parseInt(minute, 10) || 0;
		            minute = minute * 10 + keyNum;
		        }

				if(minute>=60){
					e.preventDefault();
					return;
				}

				me.val(timesetTextHour.val()+":"+minute);
				me.trigger("ev_change");
			}).delegate("input.hour12", "click", function(e){
				position = 2;
			}).delegate("input.hour12", "keydown", function(e){
				e.preventDefault();
				if(e.keyCode==80 || e.keyCode==112){
					timesetTextAMPM.val("PM");
					me.trigger("ev_change");
				}else if(e.keyCode==65 || e.keyCode==97){
					timesetTextAMPM.val("AM");
					me.trigger("ev_change");
				}
				return;
			}).delegate("span.arrow-up", "click", function(e){
				if(container.hasClass("disabled")){
					return;
				}
				var hour = 0,
					minute = 0;
				if(position==0){
					hour = parseInt(timesetTextHour.val());
					hour++;
					
					if(me.get(0).hour12 && hour>12){
						hour = 1;
					}
					if(!me.get(0).hour12 && hour>=24){
						hour = 0;
					}
					if(hour>=0&&hour<=9){
						hour = "0"+hour;
					}

					if(me.get(0).hour12 && hour==12){
						if(timesetTextAMPM.val()=="AM"){
							timesetTextAMPM.val("PM");
						}else{
							timesetTextAMPM.val("AM");
						}
					}
					timesetTextHour.val(hour);
					timesetTextHour.select();
					hourSelect = true;
					me.val(timesetTextHour.val()+":"+timesetTextMinute.val());
				}
				else if(position==1){
					minute = parseInt(timesetTextMinute.val());
					minute++;
					if(minute>=60){
						minute = 0;
					}
					if(minute>=0&&minute<=9){
						minute = "0"+minute;
					}
					timesetTextMinute.val(minute);
					timesetTextMinute.select();
					minuteSelect = true;
					me.val(timesetTextHour.val()+":"+timesetTextMinute.val());
				}
				else if(position==2){
					if(timesetTextAMPM.val()=="AM"){
						timesetTextAMPM.val("PM");
					}else{
						timesetTextAMPM.val("AM");
					}
					timesetTextAMPM.select();
				}
				me.trigger("ev_change");
			}).delegate("span.arrow-down", "click", function(e){
				if(container.hasClass("disabled")){
					return;
				}
				var hour = 0,
					minute = 0;
				if(position==0){
					hour = parseInt(timesetTextHour.val());
					hour--;
					if(hour<=0){
						hour = me.get(0).hour12?12:23;
					}
					if(hour>=0&&hour<=9){
						hour = "0"+hour;
					}
					if(me.get(0).hour12 && hour==11){
						if(timesetTextAMPM.val()=="AM"){
							timesetTextAMPM.val("PM");
						}else{
							timesetTextAMPM.val("AM");
						}
					}
					timesetTextHour.val(hour);
					timesetTextHour.select();
					hourSelect = true;
					me.val(timesetTextHour.val()+":"+timesetTextMinute.val());
				}
				else if(position==1){
					minute = parseInt(timesetTextMinute.val());
					minute--;
					if(minute<=0){
						minute = 59;
					}
					if(minute>=0&&minute<=9){
						minute = "0"+minute;
					}
					timesetTextMinute.val(minute);
					timesetTextMinute.select();
					minuteSelect = true;
					me.val(timesetTextHour.val()+":"+timesetTextMinute.val());
				}
				else if(position==2){
					if(timesetTextAMPM.val()=="AM"){
						timesetTextAMPM.val("PM");
					}else{
						timesetTextAMPM.val("AM");
					}
					timesetTextAMPM.select();
				}
				me.trigger("ev_change");
			});

		return me;
	},
	setValue: function(me, _value){
		var me = me || this,
			container = me.closest("div.timeset-container"),
			obj = me.get(0),
			separator = obj.separator,
			value = _value[1];

		me.val(value);

		var values = value.split(separator);
		if(obj.hour12){
			container.find("input.timeset-text-hour").val((obj.hourExchange(values[0])[0]<10?("0"+obj.hourExchange(values[0])[0]*1):obj.hourExchange(values[0])[0]));
			container.find("input.hour12").val(obj.hourExchange(values[0])[1]);
		}else{
		container.find("input.timeset-text-hour").val(values[0]);
		}
		container.find("input.timeset-text-minute").val(values[1]);
	},
	getValue: function(me){
		var me = me || this,
			container = me.closest("div.timeset-container"),
			obj = me.get(0),
			separator = obj.separator;
		var hour,
			minute = container.find("input.timeset-text-minute").val();
		if(obj.hour12){
			if(container.find("input.hour12").val()=="AM"){
				hour = (container.find("input.timeset-text-hour").val()==12)?"00":container.find("input.timeset-text-hour").val();
			}else{
				hour = (container.find("input.timeset-text-hour").val()==12)?12:(container.find("input.timeset-text-hour").val()*1+12);				
			}
			me.val(hour+":"+minute);
		}
		return me.val();
	},
	enable: function(me){
		var me = me || this,
			container = me.closest("div.timeset-container");

		container.removeClass("disabled");
		container.find("div.timeset-mask").addClass("hidden");
		me.prop("disabled", false);

		return me;
	},
	disable: function(me){
		var me = me || this,
			container = me.closest("div.timeset-container");

		container.addClass("disabled");
		container.find("div.timeset-mask").removeClass("hidden");
		me.prop("disabled", true);

		return me;
	}
});
})(jQuery);
