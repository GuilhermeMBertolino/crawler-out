var cur_id=0;
var cur_sub_id=0
function Node(id, pid, name, url, target) 
{
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.target = target;
};

function Menu(objName) 
{
	this.obj = objName;
	this.aNodes = [];
};

// Adds a new node to the node array

Menu.prototype.add = function(id, pid, name, url, target)
{   
    this.aNodes[this.aNodes.length] = new Node(id, pid, name,url, target);
};


Menu.prototype.toString = function()
{
    var str = '';
  
    var n=0;
    var id='';
    var pid='';
    var name='';
    var url=''; 
	var target='';
    for (n; n<this.aNodes.length; n++) 
    {
        id = this.aNodes[n].id;
        pid = this.aNodes[n].pid;
        name = this.aNodes[n].name;
        url = this.aNodes[n].url;
		target = this.aNodes[n].target;
        
        if(pid==0)
        {
            str += "<A href=";
            str += url;
            str += " target=";
			str += target;
			str += "><div id =";
            str += id;
			if(0==id)
				str += "  class=left_title  onmouseover=My_T_Over(";
			else if(20==id)
				str += "  class=left_title3  onmouseover=My_T_Over(";
			else
				str += "  class=left_title1  onmouseover=My_T_Over(";
            str += id;
            str += ")";
            str += " onmouseout=My_T_Out(";
            str += id;
            str += ")";
            str += " onclick=My_Open_T(";
            str += id;
            str += ")>";
            str += name;
            str += "</div></A><ul id=submenu_";
            str += id;
            str += " class=dis >";
            str += "</ul>";
        }
        else
        {
            str = str.substring(0, str.length-5);  
            str += "<li id=";
            str += id;
            str += "  class=left_link";
            str += ">";
            str += "<A href=";
            str += url;
            aid=id+"01";
            str += " id=";
            str += aid;
            str += " onclick=My_Open_A(";
            str += id;
            str += ",";
            str += aid;
            str += ")";
            str += " target=view> ";
            str += name;
            str += "</A>";
            str += "</li>";
            str += "</ul>";     
        }
    }
    return str;
};

function My_T_Over(id)
{
    var x=document.getElementById(id);
	if(0==id)
		x.className="left_title_over";
	else if(20==id)
		x.className="left_title3_over";
	else
	{
		//alert("cur_id:"+cur_id+"\nid:"+id+"\ncur_sub_id:"+cur_sub_id)
		if(cur_sub_id && (cur_id == id))
			x.className="left_title_over2";
		else
			x.className="left_title_over2";
	}
};

function My_T_Out(id)
{
    var x=document.getElementById(id);
    if(cur_id==id)
    {
		if(0==id)
			x.className= "left_title";
		else if(20==id)
			x.className="left_title3";
		else
		{
			if (0==cur_sub_id && (3==id || 4==id || 5==id))
				x.className= "left_title1";
			else
				x.className= "left_title_out2";
			//alert("cur_sub_id:"+cur_sub_id+"id:"+id);
		}
    }
    else
    {
		if(0==id)
			x.className= "left_title";
		else if(20==id)
			x.className="left_title3";
		else
			x.className= "left_title1";
    }
};

function My_Open_T(id)
{  
    var subnode;
	if(20==id)
		return;
    if(cur_id != id)
    {
        if(cur_id != 0)
        {
           	if (cur_sub_id != 0)
            {
				subnode=document.getElementById(cur_sub_id + "01");
				subnode.style.color = "";
				subnode.style.fontWeight = "";
            }
          	document.getElementById("submenu_"+cur_id).className="dis";
		  	//alert("cur_id="+cur_id+"id="+id);
		  	if(1==cur_id || 2==cur_id)
				document.getElementById(cur_id).className="left_title";
		  	else
				document.getElementById(cur_id).className="left_title1";
        };
        
        document.getElementById("submenu_"+id).className="block";
        
		if(0==id||20==id)
			;
		else
			document.getElementById(id).className ="left_title_over2";
        
        cur_id =id;
        cur_sub_id=cur_id+"01";
        subnode=document.getElementById(cur_sub_id + "01");
        if (subnode != null)
        {
            subnode.style.color = "#393939";
            subnode.style.fontWeight = "700";
        }
        else
        {
            cur_sub_id=0;
        }
    }
	else
	{
		if(0==id||20==id)
			;
		else
		{
			//alert("cur_id:"+cur_id+"\ncur_sub_id"+cur_sub_id+"\nid:"+id);
			if(cur_id != 0)
			{
				if(cur_id==id && 0==cur_sub_id)
				{
					document.getElementById("submenu_"+id).className="block";
					if(0==id)
						;
					else
						document.getElementById(id).className ="left_title_over2";
	
					cur_id =id;
					cur_sub_id=cur_id+"01";
					subnode=document.getElementById(cur_sub_id + "01");
					if (subnode != null)
					{
						subnode.style.color = "#393939";
						subnode.style.fontWeight = "700";
					}
					else
					{
						cur_sub_id=0;
					}
				}
				else
				{
					if (cur_sub_id != 0)
					{
						subnode=document.getElementById(cur_sub_id + "01");
						subnode.style.color = "";
						subnode.style.fontWeight = "";
					}
					document.getElementById("submenu_"+cur_id).className="dis";
					document.getElementById(cur_id).className="left_title1";
					cur_sub_id=0;
				}
			}
		}
	}
};

function My_Open_A(id,aid)
{  
    var x=document.getElementById(aid);
    if(cur_sub_id!=0)
    {
        var old=document.getElementById(cur_sub_id + "01");
        old.style.color = "";
        old.style.fontWeight = "";
    }
    x.style.color = "#393939";
    x.style.fontWeight = "700";
    cur_sub_id = id;
};
function addEventHandler(target, type, func){
	if (target.addEventListener) 
		target.addEventListener(type, func, false);
	else if (target.attachEvent) 
		target.attachEvent("on" + type, func);
	else 
		target["on" + type] = func;
}
var stopEvent = function(e){
    e = e || window.event;
    if(e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }else{
      e.returnValue = false;
      e.cancelBubble = true;
    }
  }
function resultFun(data){
	if(data.length>0){
		top.location.href='/login.asp';
	}
}

addEventHandler(window, "load", function() {	
		try{var logoutNode=document.getElementById("20");
		addEventHandler(logoutNode, "click", function(e){
			if(confirm(JS_logout)){
				Ajax.getInstance('/goform/logout','',0,resultFun);
				Ajax.get();
			}else{
				parent.frames["view"].window.location.reload();
			}
			e  = window.event || e; 
			var srcElement  =   e.srcElement || e.target; 
			if (window.event) {
				e.cancelBubble = true;
			}
			else {
				e.preventDefault();
				e.stopPropagation();
			}
			stopEvent(e);
		});
	}catch(e){} } );
