!function($){function tpAddress(id,options){this.element=$("#"+id),this.options=$.extend({},tpAddress.prototype.options,options),this._create(options),$.isFunction(this._init)&&this.init()}tpAddress.prototype={constructor:tpAddress,options:{textLabel:null,textLabelClass:"",textLabelConnector:":",parentClass:"pure-control-group",width:null,connectorWidth:6,connector:":",connectorReal:null,cellLength:2,cellNumber:6,value:"",cellSuffix:"-address-cell",cellClassName:"tpAddress-cell-input tp-input-text",disabled:!1,vtype:null,vtypeText:null,allowBlank:!0,blankText:null,validator:null,invalidText:null,suffix:null,clickHideError:!1},_create:function(){if(this.element.after('<div class="tpAddress-wrapper">'),this.element.hide(),this.options.textLabel||""==this.options.textLabel||0<this.element.prev("b").length){var tmpB=this.element.prev("b"),id=this.element.id+"-textLabel";0<tmpB.length&&(this.options.textLabel=this.options.textLabel||tmpB.text(),this.options.textLabelClass+=" "+tmpB.attr("class"),id=tmpB.attr("id"),this.element.prev("b").remove()),this.textLabel=$('<label class="label-title">'+this.options.textLabel+"</label>").addClass(this.options.textLabelClass).attr("id",id).insertBefore(this.element).after(" ")}null!==this.options.parentClass&&this.element.parent("div").addClass(this.options.parentClass),this.wrapper=this.element.next(".tpAddress-wrapper").addClass(this.element.attr("class")),this.wrapper.wrap('<div class="input-container"></div>'),this.container=this.wrapper.parent(".input-container"),this.options.width=this.options.width||this.wrapper.width(),this.options.value=this.options.value||this.element.val(),this.options.disabled=this.options.disabled||this.element.prop("disabled"),this.options.connectorReal=this.options.connectorReal||this.options.connector,this.options.cellSuffix=this.element.attr("id")+this.options.cellSuffix;for(var connectorWidth=this.options.connectorWidth,cellWidth=(this.options.width-(this.options.cellNumber-1)*this.options.connectorWidth)/this.options.cellNumber,i=0,len=this.options.cellNumber;i<len;i++){$('<input type="text">').appendTo(this.wrapper).addClass(this.options.cellClassName).addClass(this.options.cellSuffix).attr("maxlength",this.options.cellLength).css({width:cellWidth});i<len-1&&$('<span class="tpAddress-connector">'+this.options.connector+"</span>").appendTo(this.wrapper).css({width:connectorWidth})}if(this.options.suffix&&(this.suffix=$('<span class="input-suffix">'+this.options.suffix+"</span>").insertAfter(this.container)),this.error=$('<div class="input-err-container"><span class="widget-err icon-err"></span><span class="text"></span></div>').appendTo(this.container),this.options.vtype){var vtype=this.options.vtype;this.options.vtype=new $.su.vtype(vtype)}$.isIE&&this.wrapper.append("<span class='corner-left'></span><span class='corner-right'></span>"),this._registerHandler(),this.disabled(this.options.disabled),this.val(this.options.value,!1)},_registerHandler:function(){var me=this,isChange=("Microsoft Internet Explorer"==navigator.appName&&navigator.appVersion.split(";")[1].replace(/[ ]/g,""),!1);this.element.on("focus.tpAddress",function(){me.wrapper.find("."+me.options.cellSuffix+":last").focus()}),this.wrapper.on("focus.tpAddress","."+me.options.cellSuffix,function(){$(this).data("data-val",$(this).val()),me.wrapper.addClass("focus"),me.hideError()}),this.wrapper.on("blur.tpAddress","."+me.options.cellSuffix,function(){me.wrapper.removeClass("focus"),$(this).data("data-val")!=$(this).val()&&(isChange=!0),setTimeout(function(){me.wrapper.hasClass("focus")||!0!==isChange||(me.element.trigger("change"),isChange=!1)},50),setTimeout(function(){me.wrapper.hasClass("focus")||me.validate()},100)});var originalValue="";this.wrapper.on("keyup.tpAddress","."+me.options.cellSuffix,function(evt){evt=evt||window.event;var value=$(this).val();$(this).val(value=value.replace(/\s/g,""));var nextInput,key=evt.keyCode;190!=key&&110!==evt.keyCode||"."!=me.options.connector?value.length>=me.options.cellLength&&9!==key&&16!==key&&37!==key&&39!==key?nextInput=$(this).nextAll("input[type=text]."+me.options.cellSuffix+":enabled:first"):8!==key&&46!==key||0===originalValue.length&&(nextInput=$(this).prevAll("input[type=text]."+me.options.cellSuffix+":enabled:first")):(value=value.replace(new RegExp("\\"+me.options.connector,"g"),""),$(this).val(value),""!==value&&(nextInput=$(this).nextAll("input[type=text]."+me.options.cellSuffix+":enabled:first"))),nextInput&&0<nextInput.length&&($(this).blur(),nextInput.focus().select()),9!==key&&16!==key||$(this).select()}).on("keydown.tpAddress","."+me.options.cellSuffix,function(evt){originalValue=$(this).val()})},showError:function(text){this.error.show().find("span.text").text(text),this.container.addClass("err"),this.container.parent(".pure-control-group").addClass("err");var me=this;me.options.clickHideError&&$(window).one("click",function(){me.error.hide(),0==me.container.parent(".pure-control-group").find(".input-container.err").length&&me.container.parent(".pure-control-group").removeClass("err")})},hideError:function(){this.error.hide(),this.container.removeClass("err"),0==this.container.parent(".pure-control-group").find(".input-container.err").length&&this.container.parent(".pure-control-group").removeClass("err")},validate:function(isShowed){var errText,me=this,value=this.val();if(""===value){if(!0!==me.options.allowBlank)return errText=this.options.blankText||$.tpLang.VTYPETEXT.BLANKTEXT,!1!==isShowed&&me.showError(errText),errText}else{var vtype=me.options.vtype;if(vtype&&!0===vtype.isVtype&&!0!==(errText=vtype.validate(value)))return!1===errText&&(errText=me.options.vtypeText),!1!==isShowed&&me.showError(errText),errText;if(me.options.validator&&!0!==(errText=me.options.validator(value)))return!1===errText&&(errText=me.options.invalidText),!1!==isShowed&&me.showError(errText),errText}return me.hideError(),!0},_unregisterHandlers:function(){this.element.off(".tpAddress"),this.wrapper.off(".tpAddress")},_setOption:function(key,value){"disabled"==key?this.disabled(value):"value"==key&&this.val(value)},focus:function(){this.wrapper.find("input[type=text]."+this.options.cellSuffix+":last").focus()},disabled:function(flag){!0===(this.options.disabled=flag)?(this.wrapper.addClass("disabled"),this.wrapper.find("input[type=text]."+this.options.cellSuffix).prop("disabled",!0)):"string"==typeof flag?this.wrapper.find("input[type=text]."+this.options.cellSuffix).each(function(index){"1"===flag.charAt(index)?$(this).prop("disabled",!0):$(this).prop("disabled",!1)}):(this.wrapper.removeClass("disabled"),this.wrapper.find("input[type=text]."+this.options.cellSuffix).prop("disabled",!1))},_destroy:function(){this._unregisterHandlers(),this.element.show().next(".tpAddress-wrapper").remove()},val:function(value,validate){var i,c=this.options.connectorReal;if(void 0!==value){if(""==value)for(i=0;i<this.options.cellNumber;i++)this.wrapper.find("input[type=text]."+this.options.cellSuffix+":eq("+i+")").val("");else{value.match(new RegExp("\\"+c,"g"))||(c=this.options.connector);var valueArray=(value=value.replace(new RegExp("\\"+c+"$","g"),"")).split(c);for(i=0;i<valueArray.length&&i<this.options.cellNumber;i++)this.wrapper.find("input[type=text]."+this.options.cellSuffix+":eq("+i+")").val(valueArray[i])}return!1!==validate&&this.validate(),value}value="";var cells=this.wrapper.find("input[type=text]."+this.options.cellSuffix);for(i=0;i<cells.length;i++){var tmpValue=$(cells[i]).val();""!=tmpValue&&(value=value+tmpValue+c)}return""!=value&&(value=value.substr(0,value.length-c.length)),value},hide:function(){this.wrapper.hide()},show:function(){this.wrapper.show()}},$.fn.tpAddress=function(options){var result,arg=arguments;return this.each(function(){var input=$(this).data("tpAddress");if(input)"option"==options?result=input._setOption.apply(input,Array.prototype.slice.call(arg,1)):"destroy"==options?(result=input._destroy(),$(this).removeData("tpAddress")):$.isFunction(input[options])&&(result=input[options].apply(input,Array.prototype.slice.call(arg,1)));else{$(this).hasClass("ip-address")?$.extend(options,{connector:".",cellLength:3,cellNumber:4}):$(this).hasClass("mac-address")&&$.extend(options,{connector:"-",connectorReal:":",cellLength:2,cellNumber:6});var instance=new tpAddress(this.id,options);$(this).data("tpAddress",instance)}}),result}}(jQuery);