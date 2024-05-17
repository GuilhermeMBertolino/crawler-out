// JavaScript Document
/****************************************************
使用之前首先要把当前语言写入到COOKIE中
例如：document.cookie="language=en";

需要翻译的文件需要包含该JS文件，然后写如下面语句初始化字典
TranslateDictionary.XmlLoc("xmlfilename");
var value=_("key");

xml文件格式
<po>
<message msgid="key" msgstr="value" />
</po>
****************************************************/
var TranslateDictionary =new TranslateDictionary();
window._=function(key){return TranslateDictionary.getText(key);};

function TranslateDictionary()
{
	this.dict=	new DictionaryBuffer();
	this.language=function(){
		var start,end;
	//****************************************************************************
	//	var cook=document.cookie;
	//	if(-1==(start=cook.indexOf("language"))) return "en";
	//	if(-1==(end=cook.indexOf(";",start))) return "en";
	
/*
		if(window.navigator.systemLanguage)
		{
			if (window.navigator.systemLanguage=="zh-cn")
				return "cn";
		  else if(window.navigator.systemLanguage=="fr-FR")
		  	return "fr";
		  else if(window.navigator.systemLanguage=="es-ES")
		  	return "es";
		  else if(window.navigator.systemLanguage=="de-DE")
		  	return "de";
		  else
		  	return "en";
		}
		else
		{
		  if(window.navigator.language=="zh-CN"||window.navigator.browserLanguage=="zh-cn")
		    return "cn";
		  else if(window.navigator.language=="fr-FR"||navigator.browserLanguage=="fr-FR")
		  	return "fr";
		  else if(window.navigator.language=="es-ES"||navigator.browserLanguage=="es-ES")
		  	return "es";
		  else if(window.navigator.language=="de-DE"||navigator.browserLanguage=="de-DE")
		  	return "de";
		  else
		  	return "en";
		}
*/	
		var nav = window.navigator.browserLanguage;
		if(window.navigator.systemLanguage)
			nav = window.navigator.systemLanguage;
		else if(window.navigator.language)
			nav = window.navigator.language;
		else if(window.navigator.browserLanguage)
			nav = window.navigator.browserLanguage;
		var lg = nav.split("-");
		
		if(lg[0]=="zh")
			return "en";
		//	return "cn";
		else if(lg[0]=="fr")
			return "fr";
		else if(lg[0]=="de")
			return "de";
		else if(lg[0]=="es")
			return "es";
		else if(lg[0]=="pl")
			return "pl";
		else if(lg[0]=="ru")
			return "ru";
		else if(lg[0]=="pt")
			return "pt";
		else if(lg[0]=="ar")
			return "ar";
		else if(lg[0]=="tr")
			return "tr";
		else 
			return "en";
		
		
  
  
	//	return document.cookie.substring(start+9,end);
	//*****************************************************************************
	};

	this.po="";
	this.lang=this.language();
	this.XmlLoc=function(xmlfile){
		
		this.po=window.location.protocol+"//"+window.location.host+"/lang/"+xmlfile+"_"+this.lang+".xml";
		this.initDictionary();
	};
	this.initDictionary=function(){
		var req;
		try{req=new XMLHttpRequest();}catch(e1){
			try{req=new ActiveXObject("Msxml2.XMLHTTP");}catch(e2){
				try{req=new ActiveXObject("Microsoft.XMLHTTP");}catch(e3)
				{return;}
			}
		}
		req.open("GET",this.po,false);
		req.send(null);
		if(req.status==200){
			var itm=req.responseXML.documentElement.getElementsByTagName("message");
			for(var i=0;i<itm.length;i++)
			{
				this.dict.set(itm[i].getAttribute("msgid"),itm[i].getAttribute("msgstr"));
			}
		}
	};
	this.getText=function(key){ return this.dict.get(key);};
}


function DictionaryBuffer()
{
	this.key=new Array();
	this.value=new Array();
	this.set=function(key,value){
	var existflag=0;
		
    
		
		for(var i=0;i<this.key.length;i++)
		{
				 
			if(key==this.key[i])
				existflag=1;
		}
		if(0==existflag)
		{
			 
			this.key.push(key);this.value.push(value);	
		}
	};
	this.get=function(key){
		for(var i=0;i<this.key.length;i++)
		{
			if(key==this.key[i])
				return this.value[i];
		}
		return key;
	};
}

function isSysOrBrowerCN()
{
		if(window.navigator.systemLanguage)
		{
			if (window.navigator.systemLanguage=="zh-cn")
				return 1;
			else 
				return 0;
		}
		else
		{
		  if(window.navigator.language=="zh-CN"||window.navigator.browserLanguage=="zh-cn")
		    return 1;
		  else
		  	return 0;
		}
}