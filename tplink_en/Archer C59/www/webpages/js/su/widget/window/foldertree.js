// JavaScript Document
(function($){

$.su.Widget("foldertree",{
	defaults: {
		store: null,
		routerName: "My Router",
		selectLeaves: false,
		extension:"*",
		multiple:false,
		multipleValue:[]
	},
	create: function(defaults, options){
		var me = this;
		me.each(function(i, obj){
			var tar = $(obj);
			$.extend(obj, defaults, options);

			var inHTML =	"<div class=\"container widget-container foldertree-container\">";
				inHTML +=		"<div class=\"router\">";
				inHTML +=			"<span class=\"icon\"></span>";
				inHTML +=			"<span class=\"text\">"+obj.routerName+"</span>";
				inHTML +=		"</div>";
				//inHTML +=		"<ul class=\"foldertree-wrap\"></ul>";
				inHTML +=	"</div>";

			var container = $(inHTML);
			tar.replaceWith(container);
			container.append(tar.addClass("hidden"));
		});

		//dom的事件监听
		var container = me.closest("div.foldertree-container");
		container.delegate("a.foldertree-text", "click", function(e){
			e.preventDefault();
			e.stopPropagation();

			var tar = $(this);
			var path = tar.attr("data-path");
			
			if(me.get(0).selectLeaves){
				if(tar.attr("data-type")!="leaf")return;
				container.find("li.foldertree-branch, a.foldertree-text").removeClass("selected");
				tar.closest("li.foldertree-branch").addClass("selected");
				tar.addClass("selected");
				
				me.foldertree("setValue", path);
				return;
			}
			if(me.get(0).multiple){
			
				var recursion = function(node, select){
					var currentNode = node;
					var currentPath = currentNode.attr("data-path");
					var endFlag = false;
					while(!currentNode.parent().hasClass("foldertree-root")){	//还没到root情况
						if(select){			//选中的情况
							//遍历兄弟节点来判断兄弟节点来给父节点添加选中
							currentNode.closest("ul").children("li").each(function(i,ele){
								//兄弟节点有非选中状态，直接在value添加自身。
								if(!$(ele).hasClass("selected")){
									if($.inArray(currentPath,me.get(0).multipleValue)==-1){
										var valueTmp = [];
										$.each(me.get(0).multipleValue,function(i,v) {   
											if(!new RegExp(path+"/").test(v))valueTmp.push(v);
										});
										me.get(0).multipleValue = valueTmp;
										me.get(0).multipleValue.push(currentPath);
									} 
									endFlag=true;
									return false;
								}else if(i==currentNode.closest("ul").children("li").length-1){
									//兄弟节点全选中，删除value中所有兄弟节点，添加父节点，然后删掉所有和父节点能匹配的
									currentNode.closest("ul").parent().addClass("selected");
									currentNode.closest("ul").parent().children("a").addClass("selected");
									currentNode.closest("ul").children("li").children("a").each(function(i,ele){
										if($.inArray($(ele).attr("data-path"),me.get(0).multipleValue)>-1){
											me.get(0).multipleValue.splice($.inArray($(ele).attr("data-path"),me.get(0).multipleValue),1);
										}
									});
									if($.inArray($(ele).closest("ul").parent().children("a").attr("data-path"),me.get(0).multipleValue)==-1)
										me.get(0).multipleValue.push(currentNode.closest("ul").parent().children("a").attr("data-path"));
									
									var valueTmp = []
									$.each(me.get(0).multipleValue,function(i,v) {   
										if(!new RegExp(path+"/").test(v))valueTmp.push(v);
									});  
									me.get(0).multipleValue = valueTmp;
								}
							});
						}else{			//取消选中的情况
							//遍历兄弟节点来判断兄弟节点来给父节点添加选中
							currentNode.closest("ul").children("li").each(function(i,ele){
								//兄弟节点有非选中状态，直接在value删去自身。
								if(!$(ele).hasClass("selected") && $(ele).children("a").attr("data-path") != currentNode.attr("data-path")){
									if($.inArray(currentPath,me.get(0).multipleValue)>-1)
										me.get(0).multipleValue.splice($.inArray(currentPath,me.get(0).multipleValue),1);
									endFlag=true;
									return false;
								}else if(i==currentNode.closest("ul").children("li").length-1){
									//兄弟节点全选中，删除父节点,value中添加所有兄弟节点
									currentNode.closest("ul").parent().removeClass("selected");
									currentNode.closest("ul").parent().children("a").removeClass("selected");
									currentNode.closest("ul").children("li").children("a").each(function(i,ele){
										if($.inArray($(ele).attr("data-path"),me.get(0).multipleValue) ==-1 && $(ele).attr("data-path") != currentNode.attr("data-path")){
											me.get(0).multipleValue.push($(ele).attr("data-path"));
										}
									});
									if($.inArray(currentNode.closest("ul").parent().children("a").attr("data-path"),me.get(0).multipleValue)>-1)
										me.get(0).multipleValue.splice($.inArray(currentNode.closest("ul").parent().children("a").attr("data-path"),me.get(0).multipleValue),1);
									
								}
							});
							
						}
						if(endFlag) return;
						currentNode = currentNode.parent().closest("ul").prev();
						currentPath = currentNode.attr("data-path");
					}
				};
				
				if(tar.closest("li.foldertree-branch").hasClass("selected")||tar.hasClass("selected")){
					//反选自身
					tar.parent().removeClass("selected");
					tar.removeClass("selected");
					//反选所有子节点
					tar.parent().find("li").removeClass("selected");
					tar.parent().find("a").removeClass("selected");
					if(tar.parent().hasClass("foldertree-root"))me.get(0).multipleValue=[];
					else recursion(tar,false);
				}else{
					//选中自身
					tar.closest("li.foldertree-branch").addClass("selected");
					tar.addClass("selected");
					//选中所有子节点
					tar.parent().find("li").addClass("selected");
					tar.parent().find("a").addClass("selected");
					if(tar.parent().hasClass("foldertree-root"))me.get(0).multipleValue=[path];
					else recursion(tar,true);
					
					
				}
				//console.log(me.get(0).multipleValue);
				return;
			}
			container.find("li.foldertree-branch, a.foldertree-text").removeClass("selected");
			tar.closest("li.foldertree-branch").addClass("selected");
			tar.addClass("selected");
			me.foldertree("setValue", path);
		}).delegate("span.foldertree-icon", "click", function(e){
			e.preventDefault();
			e.stopPropagation();

			var btn = $(this),
				path = btn.attr("data-path"),
				store = me.get(0).store,
				subBranch = btn.next("a.foldertree-text").next("ul.foldertree-wrap"),
				subLeaf = subBranch.next("ul.foldertree-wrap"),
				uuid = me.get(0).uuid;
			//console.log(store.data)
			if (btn.hasClass("foldertree-root")){
				return;
			};

			if (btn.hasClass("foldertree-has-branch")){
				//可以点
				if (btn.hasClass("opened")){
					//已经打开
					subBranch.slideUp(200, function(){
						btn.removeClass("opened");
					});
					if(subLeaf)
					subLeaf.slideUp(200, function(){
						btn.removeClass("opened");
					});
				}else{
					//已经关闭
					store.loadNode(path, {
						"path": path,
						"uuid": uuid
					}, function(){
						btn.addClass("opened");
						subBranch.slideDown(200);
						if(subLeaf)
						subLeaf.slideDown(200);
					});
				};
			};
			if(me.get(0).multiple){
				me.val(me.get(0).multipleValue);
			}
			//console.log("foldertree-icon clicked: ", path);
		});

		//store的事件监听
		var store = $(me.get(0).store);
		store.on("ev_loaddata", function(e, data){
			me.foldertree("load", data);
		}).on("ev_loadnode", function(e, store, nodeId, data){
			var Nodes = container.find("ul.foldertree-wrap"),
				parentNode = null;
			
			Nodes.each(function(i, obj){
				if ($(obj).attr("data-path") == nodeId){
					parentNode = $(obj);
					return false;
				};
			});
			if($.isArray(data.branches))
				me.foldertree("initBranch", data.branches, parentNode);
			if (me.get(0).selectLeaves){
				var leafUl;
				if(parentNode.siblings(".foldertree-leaf-wrap").length){
					leafUl=parentNode.siblings(".foldertree-leaf-wrap");
				}else{
					leafUl=$("<ul class=\"foldertree-wrap foldertree-leaf-wrap\" data-path=\""+nodeId+"\" ></ul>");
					parentNode.after(leafUl);
				}
				me.foldertree("initLeaf", data.leaves, leafUl);
			}
		});

		return me;
	},
	load: function(me, params){
		var me = me || this,
			container = me.closest("div.foldertree-container"),
			obj = me.get(0),
			data = params[1][0];

		me.foldertree("initRoot", data, container);
		me.trigger("ev_treeloaded", [me, data]);
		return me;
	},
	/*initLeaf: function(me, params){
		var me = me || this,
			data = params[1],
			parentBranch = params[2];

		var inHTML = 	"<li class=\"foldertree-leaf\">";
			inHTML +=		"<span class=\"foldertree-icon foldertree-leaf\"></span>";
			inHTML +=		"<a class=\"foldertree-text foldertree-leaf\">"+data.text+"</a>";
			inHTML +=	"</li>";

		parentBranch.append($(inHTML));
	},*/
	initRoot: function(me, params){
		var me = me || this,
			obj = me.get(0),
			container = me.closest("div.foldertree-container"),
			data = params[1] || {},
			parentNode = params[2],
			uuid = data.uuid || "0000000000";
		//console.log(data.uuid)
		obj.uuid = uuid;

		if (!data){
			//没有节点的状况
			return me;
		};

		container.find("div.foldertree-root").remove();

		var hasBranch = data.hasBranch ? "foldertree-has-branch" : "";

		var	inHTML =	"<div class=\"foldertree-root\">";
			inHTML +=		"<span class=\"foldertree-icon foldertree-root "+hasBranch+" opened\" data-path=\""+data.path+"\"></span>";
			if(me.get(0).multiple)
			inHTML +=		"<a href=\"javascript:void(0);\" class=\"foldertree-text\" data-path=\""+data.path+"\">";
			else
			inHTML +=		"<a href=\"javascript:void(0);\" class=\"foldertree-text foldertree-root\" data-path=\""+data.path+"\">";
			inHTML +=			"<span class=\"icon\"></span>";
			inHTML +=			"<span class=\"text\">"+data.name+"</span>";
			inHTML +=		"</a>";
			inHTML +=		"<ul class=\"foldertree-wrap foldertree-root-wrap\" data-path=\""+data.path+"\"></ul>";
			inHTML +=		"<ul class=\"foldertree-wrap foldertree-leaf-wrap\" data-path=\""+data.path+"\"></ul>";
			inHTML +=	"</div>";

		var currentNode = $(inHTML);
		parentNode.append(currentNode);

		if (data.hasBranch){
			//有子节点
			var childNode = currentNode.find("ul.foldertree-root-wrap");
			me.foldertree("initBranch", data.branches, childNode);

		};

		if (data.leavesInfo&&me.get(0).selectLeaves){
			//有子文件
			var childNode = currentNode.find("ul.foldertree-leaf-wrap");
			me.foldertree("initLeaf", data.leaves, childNode);
		};

		return me;
	},
	initBranch: function(me, params){
		var me = me || this,
			datas = params[1],
			parentBranch = params[2].empty(),
			span = parentBranch.prev("a.foldertree-text").prev("span.foldertree-icon");

		if (!$.isArray(datas)){
			/*if ($.isArray(datas.branches)){
				datas = datas.branches;
			}else{*/
				datas = [datas];
			/*};*/
		};

		var inHTML = "";
		if (datas.length == 0){
			span.removeClass("foldertree-has-branch");
		}else{
			for (var index = 0, len = datas.length; index < len; index++){
				var data = datas[index];
				var hasBranch = (data.hasBranch||data.hasLeaves) ? "foldertree-has-branch" : "foldertree-has-branch opened";
				var lst = (index == len - 1) ? "lst" : ""; 
					if(parentBranch.parent().hasClass("selected") || $.inArray(data.path,me.get(0).multipleValue)>-1)
						inHTML +=	"<li class=\"foldertree-branch selected"+lst+"\">";
					else
						inHTML +=	"<li class=\"foldertree-branch "+lst+"\">";
					inHTML +=		"<span class=\"foldertree-icon foldertree-branch "+hasBranch+"\" data-path=\""+data.path+"\"></span>";
					if(parentBranch.parent().hasClass("selected") || $.inArray(data.path,me.get(0).multipleValue)>-1)
						inHTML +=		"<a href=\"javascript:void(0);\" class=\"foldertree-text foldertree-branch selected\" data-path=\""+data.path+"\">";
					else
						inHTML +=		"<a href=\"javascript:void(0);\" class=\"foldertree-text foldertree-branch \" data-path=\""+data.path+"\">";
					inHTML +=			"<span class=\"icon\"></span>";
					inHTML +=			"<span class=\"text\">"+data.name+"</span>";
					inHTML +=		"</a>";
					inHTML +=		"<ul class=\"foldertree-wrap foldertree-branch-wrap\" data-path=\""+data.path+"\"></ul>";
					inHTML +=	"</li>";
			};

			var currentBranch = $(inHTML);
			parentBranch.append(currentBranch);
			span.addClass("foldertree-has-branch");
		};

		return me;
	},
	initLeaf: function(me, params){
		var me = me || this,
			extension=me.get(0).extension,
			datas = params[1],
			parentBranch = params[2].empty(),
			span = parentBranch.prev("a.foldertree-text").prev("span.foldertree-icon");

		if (!$.isArray(datas)){
			datas = [datas];
		};
		
		var inHTML = "";
		for (var index = 0, len = datas.length; index < len; index++){
			
			var data = datas[index];
			if(extension!="*"){
				if(extension==data.character);
				else continue;
			}
			var lst = (index == len - 1) ? "lst" : ""; 

				inHTML +=	"<li class=\"foldertree-branch "+lst+"\">";
				inHTML +=		"<span class=\"foldertree-icon foldertree-branch \" data-path=\""+data.path+"\"></span>";
				inHTML +=		"<a href=\"javascript:void(0);\" class=\"foldertree-text foldertree-leaf\" data-type=\"leaf\" data-path=\""+data.path+"\">";
				inHTML +=			"<span class=\"icon\"></span>";
				inHTML +=			"<span class=\"text\">"+data.name+"</span>";
				inHTML +=		"</a>";
				inHTML +=		"<ul class=\"foldertree-wrap foldertree-branch-wrap\" data-path=\""+data.path+"\"></ul>";
				inHTML +=	"</li>";
		};

		var currentBranch = $(inHTML);
		parentBranch.append(currentBranch);
		return me;
	},
	setValue: function(me, path){
		var me = me || this;
			path = path[1];
		//console.log("setValue:", path)
		if(me.get(0).multiple){
			me.get(0).multipleValue=path;
			me.closest(".foldertree-container").find("a.foldertree-text").removeClass("selected");
			me.closest(".foldertree-container").find("a.foldertree-text").parent().removeClass("selected");
			for(var i=0;i<me.get(0).multipleValue.length;i++){
				me.closest(".foldertree-container").find("a.foldertree-text[data-path='"+me.get(0).multipleValue[i]+"']").click();
			}
			return me;
		}
		me.val(path);

		return me;
	},
	getValue: function(me){
		var me = me || this;
		return me.val();
	},
	reset: function(me){
		var me = me || this;
		return me.val("");
	}
});

})(jQuery);