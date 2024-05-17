"use strict";!function(){var nw=angular.module("nw-table");nw.directive("nwTableScheduleColumn",["$compile","scheduler",function($compile,scheduler){return{restrict:"A",require:"^^nwTable",link:function($scope,$element,$attrs,$nwTable){var indexElem,nameElem,findSeveralItems,item,isMini,rule=$nwTable.getAttr("schedule");if(scheduler.checkPageSchedulerSupported(rule)){var $scheduleItem,isHead="head"==$attrs.nwTableScheduleColumn;isHead?$scheduleItem=angular.element('<table><th class="schedule_column schedule--head"><div svg-icon="time"></div></th></table>').find("th"):(nameElem=$attrs.ngRepeat||$element[0].parentNode.parentNode.attributes["ng-repeat"].value,nameElem&&(findSeveralItems=/^\((.+)\).+$/.exec(nameElem),findSeveralItems?(item=findSeveralItems[1].split(","),nameElem=item[1],indexElem=item[0]):nameElem=nameElem.split(" ")[0]),isMini="mini"==$attrs.nwTableScheduleColumn,$scheduleItem=isMini?angular.element('<div class="schedule_column schedule--larger"ng-class="{\'schedule--added\': checkSchedule('+nameElem+", "+indexElem+')}"ng-click="selectSchedule($event, '+nameElem+", "+indexElem+')"><div class="wrap-icon"><div svg-icon="time"></div></div</div>'):angular.element('<table><td class="schedule_column schedule--small"ng-class="{\'schedule--added\': checkSchedule('+nameElem+", "+indexElem+')}"title="{{checkSchedule('+nameElem+", "+indexElem+") ? ('sched_edit' | translate) : ('sched_set' | translate)}}\"ng-click=\"selectSchedule($event, "+nameElem+", "+indexElem+')"><div class="wrap-icon"><div svg-icon="time"></div></div</td></table>').find("td")),$element.append($compile($scheduleItem)($scope)),"DIV"==$element[0].tagName?$element[0].setAttribute("class","nw-mini-table-schedule-column"):$element[0].setAttribute("class",$element[0].getAttribute("class")+" nw-mini-table-schedule-tr"),$scope.checkSchedule=function(elem,inxElem){return $nwTable.checkSchedule(elem,inxElem)},$scope.selectSchedule=function($event,item,index){return $event.stopPropagation(),$nwTable.action.setSchedule($event,item,index)},$scope.mouseEnter=function($event){"DIV"==$event.target.tagName?$event.target.parentElement.parentElement.parentElement.style.backgroundColor="#FFF":"svg"==$event.target.tagName?$event.target.parentElement.parentElement.parentElement.parentElement.style.backgroundColor="#FFF":"use"==$event.target.tagName&&($event.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.backgroundColor="#FFF")},$scope.mouseLeave=function($event){"DIV"==$event.target.nodeName&&$event.target.parentElement.parentElement.parentElement.removeAttribute("style")}}}}}]),nw.factory("nwTableScheduler",["scheduler","ngDialog",function(scheduler,ngDialog){function initIndexesLink(itemTable,indexes){var result=[];return indexes&&(result=_.map(indexes,function(i){var index=parseInt(i,10);return _.isNaN(index)?getIdBranch(itemTable,i):index})),result}function getIdBranch(el,nameInx){var result,inxs,i,nameIndex;if(nameInx)if(_.isArray(nameInx)){var result=[];_.each(nameInx,function(name){var id=el[name]?el[name]:name;result.push(id)})}else result=el[nameInx]?el[nameInx]:nameInx;else for(inxs=["__id","__inst","__index","__inx","__Inx","__ruleId","Inx","inx"],i=0;i<inxs.length;i++)if(nameIndex=inxs[i],!_.isUndefined(el[nameIndex])){result=el[nameIndex];break}return result?result:null}return{checkSchedule:function(rule,indexesLink,itemTable,inxRow,dynamicLink){var indexBranch,indexesLink=initIndexesLink(itemTable,indexesLink),arrIndexesLink=[];return _.isArray(indexesLink[0])?arrIndexesLink=scheduler.parseIndexesLink(indexesLink):(indexBranch=getIdBranch(itemTable)||inxRow,_.isArray(indexBranch)?arrIndexesLink=_.map(indexBranch,function(inx){var indexes=_.clone(indexesLink);return indexes.push(inx),indexes}):indexesLink.push(indexBranch)),dynamicLink&&(dynamicLink=itemTable[dynamicLink]),arrIndexesLink.length?_.some(arrIndexesLink,function(inxLink){return scheduler.isExists(rule,inxLink,dynamicLink)}):scheduler.isExists(rule,indexesLink,dynamicLink)},getIdBranch:getIdBranch,startScheduleDialog:function(options,$scope){return ngDialog.open({template:"dialogs/schedule_form/dialog.tpl.html",controller:"ScheduleFormDialogCtrl",scope:$scope,data:options,className:"schedule-dialog-width"}).closePromise.then(function(data){return data&&data.value?(options.isNeedReload||scheduler.getSchedulerData(),{isReset:!0}):void 0})},initIndexesLink:initIndexesLink}}])}();