
function createmenu(json) {
	//console.log(json['items'][0]);
	var basic = [];
	var advanced = [];
	var menufinal = [];
	var items = json['items']
	console.log(items)
	var globalorder;
	for (i = 0; i < items.length; ++i) {
		var menu = items[i]['menu']
		for (j = 0; j < menu.length; ++j) {
			var item = menu[j];
			var childs = item['childrens'].sort(function(a, b){
			                           return a.order - b.order
			                                                });
			for (k = 0; k < childs.length; ++k) {
				var child = childs[k];
				if(child.view !=undefined){
				if(item.name=="Basic"){
				dashboardname="Basic";
				itemviewnmae="tabHead/adv_homepage";
				}
				else{
				dashboardname="Advanced";
				itemviewnmae="tabHead/adv_homepage";
				}
				
				breadcrumbsdata[child.view]=[{"name":dashboardname,"path":itemviewnmae}];
				 globalorder=parseInt(child.order)-1;
				breadcrumbsdata[child.view].push(
				{
				"path":child.viewtype+"/"+child.view,
				"name":child.name,
				"index":globalorder,
				"order":globalorder
				}
				)
				}
				var gchild = child["childrens"];
				//gchild = gchild.sort(compare);
				gchild = gchild.sort(function(a, b){
				return a.order - b.order
				})
				child['childrens'] = gchild;
				for (l = 0; l < gchild.length; ++l) {
				if(gchild[l].view !=undefined){
				
				if(item.name=="Basic"){
				 dashboardname="Basic"; 
				 itemviewnmae="tabHead/adv_homepage";
				}
				 else{                   
				 dashboardname="Advanced";     
				itemviewnmae="tabHead/adv_homepage";
				}
				console.log(globalorder);
				breadcrumbsdata[gchild[l].view]=[{"name":dashboardname,"path":itemviewnmae}];
				 breadcrumbsdata[gchild[l].view].push({"name":child.name,"path":"nothing","index":parseInt(childs[k].order)-1,"order":parseInt(gchild[l].order)-1})
				 breadcrumbsdata[gchild[l].view].push({"name":gchild[l].name,"path":gchild[l].viewtype+"/"+gchild[l].view,"index":parseInt(childs[k].order)-1,"order":parseInt(gchild[l].order)-1})
				}
					// check for great grand children, VOIP case
					var ggchild = gchild[l]['childrens'];
					//ggchild = ggchild.sort(compare);
					ggchild = ggchild.sort(function(a, b){
					return a.order - b.order
					})
					gchild['childrens'] = ggchild;
					var voipchildrens=gchild['childrens']
					for(var m=0;m<voipchildrens.length;m++){
					
				if(voipchildrens[m].view !=undefined){
				
				if(item.name=="Basic"){
				 dashboardname="Basic"; 
				 itemviewnmae="tabHead/adv_homepage";
				}
				 else{                   
				 dashboardname="Advanced";     
				itemviewnmae="tabHead/adv_homepage";
				}
				breadcrumbsdata[voipchildrens[m].view]=[{"name":dashboardname,"path":itemviewnmae}];
				 breadcrumbsdata[voipchildrens[m].view].push({"name":child.name,"path":"nothing","index":parseInt(childs[k].order)-1,"order":parseInt(voipchildrens[m].order)-1})
				 breadcrumbsdata[voipchildrens[m].view].push({"name":gchild[l].name,"path":"nothing","index":parseInt(childs[k].order)-1,"order":parseInt(voipchildrens[m].order)-1})
				 breadcrumbsdata[voipchildrens[m].view].push({"name":voipchildrens[m].name,"path":voipchildrens[m].viewtype+"/"+voipchildrens[m].view,"index":parseInt(childs[k].order)-1,"order":parseInt(voipchildrens[m].order)-1})
				 
					}
				}
				}
				if (item['name'] === "Basic") {
					basic.push(child);
				} else {
					advanced.push(child);
				}
 			}
		}
	}
	jsonloadstatus=true;
	var advanced_sort = advanced.sort(function(a, b){
	                           return a.order - b.order
	                                                })
	var basic_sort = basic.sort(function(a, b){
	                           return a.order - b.order
	                                                })
	var basic_menu = {name: "Basic", id: "home", childrens: basic_sort};
	menufinal.push(basic_menu);
	var adv_menu = {name: "Advanced", id: "profile", childrens: advanced_sort};
	menufinal.push(adv_menu);
	var menu_json = {menu: menufinal};
	//console.log(JSON.stringify(menu_json));
	return menu_json;
}
