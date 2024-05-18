
(function(){
	var window = this,undefined;
	
	window.$ = {
		w: window,
		d: document,
		copyIsArray:null,
		toString: Object.prototype.toString,
		hasOwn:Object.prototype.hasOwnProperty,
		class2type:{
				'[object Boolean]':'boolean',
				'[object Number]':'number',
				'[object String]':'string',
				'[object Function]':'function',
				'[object Array]':'array',
				'[object Date]':'date',
				'[object RegExp]':'regExp',
				'[object Object]':'object'
		},
		type:function(obj){
			return obj==null?String(obj):$.class2type[$.toString.call(obj)] || "object";
		},
		isWindow:function(obj){
			return obj && typeof obj === "object" && "setInterval" in obj ;
				
		},
			
		isArray: Array.isArray || function(obj){
			return $.type(obj)==="array";
		},
			
		isPlainObject: function(obj){
			if(!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj))
			{
				return false;
			}
			if(obj.constructor && !$.hasOwn.call(obj, "contructor") &&!$.hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
			{
				
				return false;
			}
			var key;
			for (key in obj)
			{}
			return key===undefined || $.hasOwn.call(obj, key);
		},
		extendsimple: function(target, options){
			for (name in options)
			{
				target[name] = options[name];
			}
			return target;
		},
		extendtest: function(target, options, deep){
			
			deep = deep || false;
			
			for (name in options)
			{
				copy = options[name];
				if(target === copy)
				{
					continue;
				}
				if(deep && copy instanceof Array)
				{
					target[name] = $.extend([], copy);
				}
				else if( deep && copy instanceof Object)
				{
					target[name] = $.extend({}, copy);
				}
				else
				{
					target[name] = options[name];
				}
			}
			return target;
		},
		extendfun:function(){
			var options,name,src,copy,copyIsArry,clone,
				target = arguments[0] || {}, i = 1;
			var length = arguments.length;
			var deep = false;
			
			if(typeof target == "boolean")
			{
				deep = target;
				target = arguments[1] || {};
				i = 2;
			}	
			
			if(typeof target !== "object" )
			{
				target = {};
			}
			if(length === i)
			{
				target = this;
				--i;
			}				
			for (; i < length; i ++)
			{
				if((options = arguments[i]) != null)
				{
					for (name in options)
					{
						src  = target[name];
						copy = options[name];
						if(target === copy)
						{
							continue;
						}
						if(deep && copy instanceof Array)
						{
							target[name] = $.extend([], copy);
						}
						else if( deep && copy instanceof Object)
						{
							target[name] = $.extend({}, copy);
						}
						else if(copy !== undefined )
						{
							target[name] = options[name];
						}
				
					}
				}
				
			}
			return target;
		},
		extendall:function(target, options, deep){
			deep = deep || true;
			
			for (name in options)
			{
				src  = target[name];
				copy = options[name];
				if(target === copy)
				{
					continue;
				}
				
				if(deep && copy && ($.isPlainObject(copy) ||($.copyIsArray = $.isArray(copy))))
				{
					if($.copyIsArray)
					{
						$.copyIsArray = false;
						clone = src && $.isArray(src) ? src: [];
					}
					else{
						clone = src && $.isPlainObject(src) ? src: {};
					}
					
					target[name] = $.extend(clone, copy, deep);
				}
				else if(copy !== undefined )
				{
					target[name] = options[name];
				}
			}
			
			return target;
		},
		extend:function(){
			var options,name,src,copy,copyIsArry,clone,
				target = arguments[0] || {}, i = 1;
			var length = arguments.length;
			//var deep = false;
			var deep = true;
			
			if(typeof target == "boolean")
			{
				deep = target;
				target = arguments[1] || {};
				i = 2;
			}	
			
			if(typeof target !== "object" )
			{
				target = {};
			}
			if(length === i)
			{
				target = this;
				--i;
			}				
			for (; i < length; i ++)
			{
				if((options = arguments[i]) != null)
				{
					for (name in options)
					{
						src  = target[name];
						copy = options[name];
						/*
						if(target === copy)
						{
							continue;
						}
						*/
						if(deep && copy && ($.isPlainObject(copy) ||($.copyIsArray = $.isArray(copy))))
						{
							if($.copyIsArray)
							{
								$.copyIsArray = false;
								clone = src && $.isArray(src) ? src: [];
							}
							else{
								clone = src && $.isPlainObject(src) ? src: {};
							}
							
							target[name] = $.extend(clone, copy, deep);
						}
						else if(copy !== undefined )
						{
							target[name] = copy;
						}
				
					}
				}
				
			}
			return target;
		}
		
	};
	
})();