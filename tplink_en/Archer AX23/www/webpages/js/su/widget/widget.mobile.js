!function(p){var e,t={combobox:{render:function(){var t=this,i=this.dom(),e=this.settings,s=!0===e.editable&&"single"===e.multiSelect?"":'readonly="true"',l=!1===e.labelField?" label-empty":"",a=e.readOnly?" readonly":"",n="single"===e.multiSelect?"":"multiple",l=(i.addClass(e.cls+"combobox-container combobox-mobile "+e.multiSelect+l+a),"");null!==e.labelField&&(l=(l+='<div class="widget-fieldlabel-wrap '+e.labelCls+'">')+'<div class="widget-fieldlabel-inner"><label class="widget-fieldlabel combobox-fieldlabel">'+("false"===e.labelField?"":e.labelField)+"</label>",e.labelField&&(l+='<span class="widget-separator">'+e.separator+"</span>"),l+="</div></div>"),l=(l=(l=(l=(l+='<div class="widget-wrap-outer combobox-wrap-outer"><div class="widget-wrap combobox-wrap"><span class="text-wrap-before"></span>')+'<span class="combobox-wrap-inner"><input class="combobox-text '+e.inputCls+'" type="text" tabindex="-1" '+s+' value="'+(e.noneSelectedRemind?e.noneSelectedText:"")+'" />')+'<select class="combobox-text '+e.inputCls+'" '+n+"></select></span>")+'<a class="combobox-switch" href="javascript:void(0);" tabindex="'+e.tabindex+'"><span class="icon"></span></a><div class="hidden combobox-lists"></div><span class="text-wrap-after"></span></div>')+'<div widget="errortip" error-cls="'+e.errorTipsCls+'"></div>',null!=e.tips&&e.tips!=undefined&&(l=(l+='<div class="widget-tips combobox-tips '+e.tipsCls+'">')+'<div class="content tips-content">'+e.tips+"</div></div>"),l+="</div>",e.tipText&&(l+='<div widget="toolTip"></div>'),i.append(l),e.items&&0<e.items.length&&this.loadItems(e.items),i.find("select").on("change",function(e){e.stopPropagation();e=t.getValue();i.triggerHandler("ev_view_change",[{"type":"value","value":e}])}),i.find("select").on("change",function(){var e=p(this).val();t.setValue(e)}),i.find("select").on("click",function(){p(this).find("option.not-selected").prop("disabled",!0)})},loadItems:function(e){var t,i=this.dom(),s=this.settings,l=this.getContainer(),a=(p.isArray(e)||(e=[]),s.items=e,"");a+='<option class="not-selected" value="not-selected" selected="selected">'+p.su.CHAR.COMMON.PLEASE_SELECT+"</option>";for(var n,o,d,r=0,c=e.length;r<c;r++)e[r]&&(n=e[r][s.displayField],o=e[r][s.valueField],d=e[r].disabled?"disabled":"",e[r].selected,a+='<option class="'+(e[r].cls||"")+'" '+d+' value="'+(this._dataMap[r]=o)+'" data-index="'+r+'">'+(this._displayMap[o]=n)+"</option>",e[r].selected&&(t=e[r][s.valueField]));i.find("select").html(a),this.settings.cacheItems=i.find("select option").not(".not-selected").clone(),this.setValue(t),0==e.length?l.addClass("none-items"):l.removeClass("none-items"),i.triggerHandler("ev_view_update")},getText:function(){for(var e=this.getValue(),t=[],i=0,s=(e=p.isArray(e)?e:[e]).length;i<s;i++)t.push(this._displayMap[e[i]]);return t.join(",")},enable:function(){this.dom();var e=this.getContainer();e.removeClass("disabled"),e.find("select").prop("disabled",!1),e.triggerHandler("ev_view_enable")},disable:function(){var e=this.getContainer();e.addClass("disabled"),e.find("select").prop("disabled","disabled"),e.triggerHandler("ev_view_disable")},enableItems:function(e){this.toggleItems(e,!0)},disableItems:function(e){this.toggleItems(e,!1)},showItems:function(e){for(var t=this.dom(),i=(e=p.isArray(e)?e:[e],this.settings.cacheItems),s=0,l=e.length;s<l&&!(0<t.find('select option[value="'+e[s]+'"]').length);s++)for(var a=0;a<i.length;a++)if(p(i[a]).attr("value")===e[s]){for(var n=+p(i[a]).attr("data-index");0<=n;){var o=0===n?'select option[value="not-selected"]':'select option[data-index="'+(n-1)+'"]';0<t.find(o).length?(t.find(o).after(p(i[a]).clone()),n=-1):n--}break}},hideItems:function(e){for(var t,i=this.dom(),s=0,l=(e=p.isArray(e)?e:[e]).length;s<l;s++)0<(t=i.find('select option[value="'+e[s]+'"]')).length&&t.remove()},toggleItems:function(e,t){if(e===undefined)return this.disable();for(var i,s=this.dom(),l=0,a=(e=p.isArray(e)?e:[e]).length;l<a;l++)0<(i=s.find('select option[value="'+e[l]+'"]')).length&&(t?i.prop("disabled",!1):i.prop("disabled","disabled"))},setValue:function(e){var t,i=this.dom(),s=this.settings;e=p.isArray(e)?e:[e],i.find("select option").prop("selected",!1);for(var l=0,a=e.length;l<a;l++)i.find('select option[value="'+e[l]+'"]').prop("selected","selected");if(this._value=p.su.clone(e),"multiple"===s.multiSelect){for(var n=[],o=0;o<e.length;o++)t=this._displayMap[e[o]]||e[o],n.push(t);n=n.join(",")}else"single"===s.multiSelect&&(n=this._displayMap[e]||s.noneSelectedText);this.setText(n)},getValue:function(){var t=[],i=this,e=this.settings;return this.dom().find("select option:selected").each(function(){var e=p(this).attr("data-index");t.push(i._dataMap[e])}),"single"===e.multiSelect?t[0]:t},setText:function(e){this.getContainer().find("input.combobox-text").val(e)}}};for(e in t)t.hasOwnProperty(e)&&(p.extend(p.su.widgets[e].prototype,t[e]),p.extend(p.su.Widget.regMap[e],t[e]))}(jQuery);