!function($){"use strict";function TPTable(){}TPTable.prototype={constructor:TPTable,instances:[],init:function(id,options){this.id=id,this.options=options||{},$.isFunction(options)?(this.initFunc=options,this.initFunc()):options&&$.isFunction(options.initTable)&&(this.initFunc=options.initTable,this.initFunc()),this.initSetup(id,this.options)},initSetup:function(id,options){var tag;if(this.$table=$("#"+id),this.$table.addClass("pure-table pure-table-bordered"),this.$table.attr("width","100%"),this.$op=this.$table.prev("div.table-op"),this.$op.find("div.table-btn span").addClass("table-icon"),this.$refreshIcon=this.$op.find(".refresh-icon"),tag=this.$refreshIcon.next("label").first().html(),this.$refreshIcon.wrap("<div class='refresh-icon-wrap inline'></div>"),this.$refresh=this.$refreshIcon.parent("div.refresh-icon-wrap"),this.$refresh.append("<label class='table-icon-text'>"+tag+"</label>"),this.$refreshLabel=this.$refresh.find("label.table-icon-text"),this.$refresh.next("label").first().remove(),this.$addIcon=this.$op.find(".add-icon"),tag=this.$addIcon.next("label").first().html(),this.$addIcon.wrap("<div class='add-icon-wrap inline'></div>"),this.$add=this.$addIcon.parent("div.add-icon-wrap"),this.$add.append("<label class='table-icon-text'>"+tag+"</label>"),this.$addLabel=this.$add.find("label.table-icon-text"),this.$add.next("label").first().remove(),this.$deleteIcon=this.$op.find(".delete-icon"),tag=this.$deleteIcon.next("label").first().html(),this.$deleteIcon.wrap("<div class='del-icon-wrap inline'></div>"),this.$del=this.$deleteIcon.parent("div.del-icon-wrap"),this.$del.append("<label class='table-icon-text'>"+tag+"</label>"),this.$delLabel=this.$del.find("label.table-icon-text"),this.$deleteIcon.next("label").first().css("color","#c11c66"),this.$del.next("label").first().remove(),this.$deleteAllIcon=this.$op.find(".delete-all-icon"),tag=this.$deleteAllIcon.next("label").first().html(),this.$deleteAllIcon.wrap("<div class='del-all-icon-wrap inline'></div>"),this.$delAll=this.$deleteAllIcon.parent("div.del-all-icon-wrap"),this.$delAll.append("<label class='table-icon-text'>"+tag+"</label>"),this.$delAllLabel=this.$delAll.find("label.table-icon-text"),this.$deleteAllIcon.next("label").first().css("color","#c11c66"),this.$delAll.next("label").first().remove(),this.$resetIcon=this.$op.find(".reset-icon"),tag=this.$resetIcon.next("label").first().html(),this.$resetIcon.wrap("<div class='reset-icon-wrap inline'></div>"),this.$reset=this.$resetIcon.parent("div.reset-icon-wrap"),this.$reset.append("<label class='table-icon-text'>"+tag+"</label>"),this.$resetLabel=this.$reset.find("label.table-icon-text"),this.$reset.next("label").first().remove(),this.$blockIcon=this.$op.find(".block-icon"),tag=this.$blockIcon.next("label").first().html(),this.$blockIcon.wrap("<div class='block-icon-wrap inline'></div>"),this.$block=this.$blockIcon.parent("div.block-icon-wrap"),this.$block.append("<label class='table-icon-text'>"+tag+"</label>"),this.$blockLabel=this.$block.find("label.table-icon-text"),this.$block.next("label").first().remove(),this.$importIcon=this.$op.find(".import-icon"),this.$importLabel=this.$importIcon.next("label"),this.$importLabel.addClass("table-icon-text"),this.$importIcon.wrap("<div class='import-icon-wrap inline'></div>"),this.$importLabel.insertAfter(this.$importIcon),this.$exportIcon=this.$op.find(".export-icon"),this.$exportLabel=this.$exportIcon.next("label"),this.$exportLabel.addClass("table-icon-text"),this.$exportIcon.wrap("<div class='export-icon-wrap inline'></div>"),this.$exportLabel.insertAfter(this.$exportIcon),this.$backupIcon=this.$op.find(".backup-icon"),this.$backupLabel=this.$backupIcon.next("label"),this.$backupLabel.addClass("table-icon-text"),this.$backupIcon.wrap("<div class='backup-icon-wrap inline'></div>"),this.$backupLabel.insertAfter(this.$backupIcon),this.$tableIcon=this.$op.find("span.table-icon"),this.$selectAll=this.$table.find("thead input[type=checkbox].table-select-all"),this.$editArea=this.$table.find("tbody>tr.nd"),this.isEdit=!1,this.$tableMaskUp=this.$tableMaskUp||$('<div class = "table-mask"></div>').insertAfter(this.$table),this.$tableMaskDown=this.$tableMaskDown||$('<div class = "table-mask"></div>').insertAfter(this.$table),options.search){!0===options.search&&(options.search={});this.form=this.$table.parent("form"),this.form.prepend($('<div class="table-search-container"><div class="table-search-wrapper"><input type="text" class="table-search-input"><span class="search-icon"></span><span class="clear-icon"></span></div></div>')).addClass("table-search"),this.options.search.placeholder=this.options.search.placeholder||$.tpLang.s_str.search,this.tpSearchInput=this.form.find("input.table-search-input"),this.tpSearchInput.attr("placeholder",this.options.search.placeholder),this.tpSearchClearIcon=this.form.find("table-search-wrapper .clear-icon")}!0===$.isIE&&(this.$table.append('<td style="display: none">ie8hack</td><div class="corner-top-left"></div><div class="corner-top-right"></div><div class="corner-bot-left"></div><div class="corner-bot-right"></div>'),this.$table.find("tr.nd td").append('<div class="corner-bot-left"></div><div class="corner-bot-right"></div>')),this.registerHandlers()},filter:function(condition){$.isFunction(condition)||(condition=function(){return!0}),this.$table.find("tbody tr:not(.nd)").each(function(index,obj){condition($(obj),index)?$(obj).removeClass("not-match").show():$(obj).addClass("not-match").hide()}),$.tablePages(this.$table)},registerHandlers:function(){var self=this;self.unregisterHandlers(),self.options.search&&(self.tpSearchInput.on("keyup.tpTable",function(){var value=$(this).val();self.options.search.filter?self.filter(function($obj,index){return self.options.search.filter(value,$obj,index)}):self.filter(function($obj,index){var i;if(!self.options.search.column){self.options.search.column=[];var len=$obj.children().length;for(i=0;i<len;i++)self.options.search.column.push(i)}var regex=new RegExp(value,"ig");for(i=0;i<self.options.search.column.length;i++)if(regex.test($obj.children(":eq("+self.options.search.column[i]+")").text()))return!0;return!1})}),self.tpSearchClearIcon.on("click.tpTable",function(){self.tpSearchInput.val("").trigger("keyup")})),self.$refreshIcon.on("click.tpTable",function(){!0!==self.isEdit&&self.refreshIconClick()}),self.$addIcon.on("click.tpTable",function(){!0!==self.isEdit&&self.addIconClick()}),self.$deleteIcon.on("click.tpTable",function(){self.isEdit}),self.$deleteAllIcon.on("click.tpTable",function(){self.isEdit}),self.$blockIcon.on("click.tpTable",function(){self.isEdit}),self.$refreshLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$refreshIcon.click()}),self.$addLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$addIcon.click()}),self.$delLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$deleteIcon.click()}),self.$delAllLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$deleteAllIcon.click()}),self.$resetLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$resetIcon.click()}),self.$blockLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$blockIcon.click()}),self.$importLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$importIcon.click()}),self.$exportLabel.on("click.tpTable",function(){!0!==self.isEdit&&self.$exportIcon.click()}),self.$tableIcon.hover(function(){!0!==self.isEdit&&$(this).addClass("span-hover")},function(){!0!==self.isEdit&&$(this).removeClass("span-hover")}),self.$selectAll.on("click.tpTable",function(){var selectOne=self.$table.find("tbody td input.table-select-one"),isChecked=!!$(this).prop("data-checked");$.each(selectOne,function(){$(this).prop("checked",isChecked).data("tpCheckbox").refresh()})}),self.$table.on("click.tpTable","tbody input[type=checkbox].table-select-one",function(){var isChecked=!0;$.each(self.$table.find("tbody input[type=checkbox].table-select-one"),function(){$(this).prop("data-checked")||(isChecked=!1)}),self.$selectAll.prop("checked",isChecked).data("tpCheckbox").refresh()}),self.$table.on("click.tpTable","td.table-content>span.edit-modify-icon",function(){if(!0!==self.isEdit){var trEdit=$(this).closest("tr");self.showEditArea(trEdit)}})},unregisterHandlers:function(){this.$table.off(".tpTable"),this.$refreshIcon.off(".tpTable"),this.$refreshLabel.off(".tpTable"),this.$addIcon.off(".tpTable"),this.$addLabel.off(".tpTable"),this.$deleteIcon.off(".tpTable"),this.$delLabel.off(".tpTable"),this.$deleteAllIcon.off(".tpTable"),this.$delAllLabel.off(".tpTable"),this.$resetIcon.off(".tpTable"),this.$resetLabel.off(".tpTable"),this.options.search&&(this.tpSearchInput.off(".tpTable"),this.tpSearchClearIcon.off(".tpTable"))},refreshIconClick:function(){this.isEdit&&this.hideEditArea();var tr=this.$table.find("tbody tr:not(.nd)");this.$table.find("input[type=checkbox].table-select-all").prop("checked",!1).tpCheckbox(),tr.remove(),null!=this.initFunc&&this.initFunc()},hideEditArea:function(){if(this.isEdit=!1,0!=this.$editArea.length){var $rowEdit=this.$table.find(".edit-tr");$rowEdit.removeClass("edit-tr"),$rowEdit.find("td:first").removeClass("first-child"),$rowEdit.find("td:last").removeClass("last-child"),this.$editArea.addClass("nd").removeClass("editor-container"),this.$table.find("tr.edit-td-top").removeClass("edit-td-top"),$.unlock(),0<this.$table.find("tbody tr:has(td.table-content)").length&&this.$table.find("tbody tr.space-tr").remove(),this.$tableMaskUp.hide(),this.$tableMaskDown.hide()}},showEditArea:function($rowEdit){if(this.isEdit=!0,0!=this.$editArea.length){$rowEdit.addClass("edit-tr"),$rowEdit.find("td:first").addClass("first-child"),$rowEdit.find("td:last").addClass("last-child");var editArea=this.$editArea;editArea.removeClass("nd").addClass("editor-container").insertAfter($rowEdit),editArea.find("div.button-container").addClass("table-btn");var trPrev=$rowEdit.prev("tr:not(.nd)");0==trPrev.length&&0==$rowEdit.index()&&(trPrev=this.$table.find("tr.head")).find("th[colspan=1]").addClass("edit-td-top"),trPrev.addClass("edit-td-top"),$.lock();var turnpage=0;0!=this.$table.nextAll(".table-bottom-pages").length&&(turnpage=31),this.$tableMaskUp.show().css("top","0").height(this.$table.find(".editor-container").first().position().top+this.$table.position().top);var tmpHeight=this.$table.height()-this.$table.find(".editor-container").first().position().top-editArea.height()+turnpage;tmpHeight=10<tmpHeight?tmpHeight:0,this.$tableMaskDown.show().css("bottom","0").css("top","auto").height(tmpHeight)}},addIconClick:function(){this.$table.find("tbody tr.space-tr").remove(),$.addEmptyBody(this.$table,this.$table.find("thead tr th[colspan=1]").length),this.showEditArea(this.$table.find("tbody tr.space-tr"))},destroy:function(){try{this.unregisterHandlers(),delete Object.getPrototypeOf(this).instances[this.id],$(this).removeData("tpTable")}catch(e){}}},$.fn.tpTable=function(options){this.each(function(){var tptable=$(this).data("tpTable");if(tptable||"destroy"!==options)if(tptable)"destroy"===options?tptable.destroy():tptable.refreshIconClick();else{var instance=new TPTable;$(this).data("tpTable",instance),(instance.instances[this.id]=instance).init(this.id,options)}})},$(function(){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"==typeof"test".__proto__?function(object){return object.__proto__}:function(object){return object.constructor.prototype})})}(jQuery),jQuery.extend({tablePages:function(id,size){var pagerLength,$table=$(id);$table.data("pageSize")||$table.data("pageSize",size),size=size||$table.data("pageSize"),pagerLength=null==arguments[2]?7:arguments[2];var currentPage=0,pageSize=size;if($table.nextAll(".table-bottom-pages").remove(),!($table.find("tbody tr:not(.nd):not(.not-match)").length<=size||$table.find("tr").hasClass("space-tr")||0==pageSize)){$table.bind("repaginate",function(){$table.find("tbody tr:not(.nd):not(.not-match)").hide().slice(currentPage*pageSize,(currentPage+1)*pageSize).show();var page,leftLength=Math.floor((pagerLength-1)/2),rightLength=Math.round((pagerLength-1)/2);if($("span[id$="+prevIconId+"]").show(),leftDot.remove(),rightDot.remove(),pagerLength+2<numPages){if(leftLength+1<currentPage)for(leftDot.insertAfter($("#1-"+prevIconId)),page=2;page<Math.min(currentPage-leftLength+1,numPages-pagerLength);page++)$("#"+page+"-"+prevIconId).hide();if(currentPage<numPages-rightLength-2)for(rightDot.insertBefore($("#"+numPages+"-"+prevIconId)),page=Math.max(currentPage+rightLength+2,pagerLength+2);page<numPages;page++)$("#"+page+"-"+prevIconId).hide()}});for(var numRows=$table.find("tbody tr:not(.nd):not(.not-match)").length,numPages=Math.ceil(numRows/pageSize),prevIconId=$.randomId("prev"),nextIconId=$.randomId("next"),leftDot=$('<span id="left-'+prevIconId+'">...</span>'),rightDot=$('<span id="right-'+prevIconId+'">...</span>'),$pager=$("<div class='table-bottom-pages'><span id='"+prevIconId+"' class='page'></span></div>"),page=1;page<=numPages;page++)$("<span id='"+page+"-"+prevIconId+"'>"+page+"</span>").on("click",{newPage:page-1},function(event){currentPage=event.data.newPage,$(this).hasClass("click-page")||($(this).siblings("span").removeClass("click-page"),$(this).addClass("click-page"),$table.trigger("repaginate"),currentPage-1<0?($("#"+prevIconId).addClass("gray"),$("#"+nextIconId).removeClass("gray")):numPages<=currentPage+1?($("#"+nextIconId).addClass("gray"),$("#"+prevIconId).removeClass("gray")):($("#"+prevIconId).removeClass("gray"),$("#"+nextIconId).removeClass("gray")))}).appendTo($pager);var next=$("<span id='"+nextIconId+"' class='page right'></span>");$pager.append(next),$pager.insertAfter($table),$("#"+prevIconId).on("click",function(){var $spanBro=$(this).siblings("span"),prev=Number($(this).siblings("span.click-page").text())-1;(currentPage=prev-1)<0||($spanBro.removeClass("click-page"),$("#"+prev+"-"+prevIconId).addClass("click-page"),$table.trigger("repaginate"),currentPage-1<0&&$(this).addClass("gray"),$("#"+nextIconId).removeClass("gray"))}),$("#"+nextIconId).on("click",function(){var $spanBro=$(this).siblings("span"),next=Number($(this).siblings("span.click-page").text())+1;numPages<=(currentPage=next-1)||($spanBro.removeClass("click-page"),$("#"+next+"-"+prevIconId).addClass("click-page"),$table.trigger("repaginate"),numPages<=currentPage+1&&$(this).addClass("gray"),$("#"+prevIconId).removeClass("gray"))}),$("span#1-"+prevIconId).click(),$table.trigger("repaginate")}},initTableHead:function(table,array){var header=table.children("thead");header.empty(),array=function(array){for(var levelArray=[],traverseObject=function(obj,level){if(obj.children&&$.isArray(obj.children)&&0<obj.children.length){obj.colspan=0,obj.hasChildren=!0;for(var i=0,len=obj.children.length;i<len;i++)obj.colspan+=traverseObject(obj.children[i],level+1)}else obj.colspan=1;levelArray[level]=levelArray[level]||[];var clone=$.extend({},obj);return delete clone.children,levelArray[level].push(clone),obj.colspan},i=0,len=array.length;i<len;i++)traverseObject(array[i],0);return levelArray}(array);for(var i=0;i<array.length;i++)for(var row=$("<tr class='head'></tr>").appendTo(header),j=0;j<array[i].length;j++){var th,thObj=array[i][j];thObj&&thObj.text&&(th=$("<th class='table-head' rowspan='"+(thObj.hasChildren?1:array.length-i)+"' colspan='"+thObj.colspan+"'><span>"+thObj.text+"</span></th>")),thObj&&thObj.width&&th.css("width",thObj.width),row.append(th)}},initTableBodyArray:function(table,objArray){var tableCtn,html="<div class='table-tab-container'><ul></ul></div>",ul=(tableCtn=table.prev().is(".table-tab-container")?table.prev():table.prevAll(":eq(1)").is(".table-tab-container")?table.prevAll(":eq(1)"):table.prev().is(".table-op")?$(html).insertBefore(table.prev()):$(html).insertBefore(table)).find("ul");ul.empty();for(var i=0;i<objArray.length;i++)ul.append('<li data-index="'+i+'"><span class="text">'+objArray[i].tabName+"</span></li>");tableCtn.off(".tpTable").on("click.tpTable","li",function(){$(this).hasClass("selected")||($(this).siblings().removeClass("selected"),$(this).addClass("selected"),table.children("tbody").find("tr:not(.nd)").remove(),$.initTableBody(table,objArray[$(this).data("index")].data))}),ul.children("li:first").click(),i<2&&tableCtn.hide()},initTableBody:function(table,array){if(0!=array.length){var body=table.children("tbody");body.find("tr:not(.nd)").remove();for(var rowspanCount=0,i=0;i<array.length;i++){var tr=$("<tr></tr>"),td="";0!==rowspanCount&&rowspanCount--;for(var j=0;j<array[i].length;j++)void 0===array[i][j].rowspan?td=null!=array[i][j].classStr?"<td class='table-content "+array[i][j].classStr+"'>"+array[i][j].text+"</td>":"<td class='table-content'>"+array[i][j].text+"</td>":"number"==typeof array[i][j].rowspan&&0===rowspanCount&&(td=null!=array[i][j].classStr?"<td class='table-content "+array[i][j].classStr+"' rowspan='"+array[i][j].rowspan+"'>"+array[i][j].text+"</td>":"<td class='table-content' rowspan='"+array[i][j].rowspan+"'>"+array[i][j].text+"</td>",rowspanCount=array[i][j].rowspan),array[i][j]&&array[i][j].width&&$(td).width(array[i][j].width),tr.append(td),td=null;body.append(tr)}$.bodyStyleUpdate(table),body.children("tr:not(.nd)").find("input[type='checkbox']:not(.checkbox-checkbox)").tpCheckbox()}else{var grid=table.find("thead tr th[colspan=1]").length;0==table.find("tbody tr.space-tr").length&&$.addEmptyBody(table,grid)}},addEmptyBody:function(table,grid){for(var body=table.children("tbody"),trFirst=body.find("tr.first"),tr=$("<tr class='space-tr'></tr>"),i=0;i<grid;i++){tr.append("<td>--</td>")}0==trFirst.length?body.prepend(tr):trFirst.before(tr)},appendTableRow:function(table,data){for(var body=table.children("tbody"),tr=$("<tr></tr>"),j=0;j<data.length;j++){var td="<td class='table-content' width='"+data[j].width+"'>"+data[j].text+"</td>";tr.append(td)}body.append(tr)},bodyStyleUpdate:function(table){table.find("span.enable-icon").click(function(){$(this).removeClass("enable-icon"),$(this).addClass("disable-icon")}),table.find("span.disable-icon").click(function(){$(this).removeClass("disable-icon"),$(this).addClass("enable-icon")}),(table.find("td.table-content").find(".edit-modify-icon")||table.find("td.table-content").find(".disable-icon"))&&table.find("span.edit-modify-icon").parent("td.table-content").css({width:"60px"})},hideEditArea:function(table){var tpTable=table.data("tpTable");tpTable&&tpTable.hideEditArea()}});