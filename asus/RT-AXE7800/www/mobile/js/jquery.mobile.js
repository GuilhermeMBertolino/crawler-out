﻿/*!
* jQuery Mobile 1.4.5
* Git HEAD hash: 68e55e78b292634d3991c795f06f5e37a512decc <> Date: Fri Oct 31 2014 17:33:30 UTC
* http://jquerymobile.com
*
* Copyright 2010, 2014 jQuery Foundation, Inc. and othercontributors
* Released under the MIT license.
* http://jquery.org/license
*
*/
(function ( root, doc, factory ) {
if ( typeof define === "function" && define.amd ) {
define( [ "jquery" ], function ( $ ) {
factory( $, root, doc );
return $.mobile;
});
} else {
factory( root.jQuery, root, doc );
}
}( this, document, function ( jQuery, window, document, undefined ) {
(function( $ ) {
$.mobile = {};
}( jQuery ));
/*!
* jQuery UI Core c0ab71056b936627e8a7821f03c044aec6280a40
* http://jqueryui.com
*
* Copyright 2013 jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/category/ui-core/
*/
(function( $, undefined ) {
var uuid = 0,
runiqueId = /^ui-id-\d+$/;
$.ui = $.ui || {};
$.extend( $.ui, {
version: "c0ab71056b936627e8a7821f03c044aec6280a40",
keyCode: {
BACKSPACE: 8,
COMMA: 188,
DELETE: 46,
DOWN: 40,
END: 35,
ENTER: 13,
ESCAPE: 27,
HOME: 36,
LEFT: 37,
PAGE_DOWN: 34,
PAGE_UP: 33,
PERIOD: 190,
RIGHT: 39,
SPACE: 32,
TAB: 9,
UP: 38
}
});
$.fn.extend({
focus: (function( orig ) {
return function( delay, fn ) {
return typeof delay === "number" ?
this.each(function() {
var elem = this;
setTimeout(function() {
$( elem ).focus();
if ( fn ) {
fn.call( elem );
}
}, delay );
}) :
orig.apply( this, arguments );
};
})( $.fn.focus ),
scrollParent: function() {
var scrollParent;
if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
scrollParent = this.parents().filter(function() {
return (/(relative|absolute|fixed)/).test($.css(this,"position")) && (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
}).eq(0);
} else {
scrollParent = this.parents().filter(function() {
return (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));
}).eq(0);
}
return ( /fixed/ ).test( this.css( "position") ) || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
},
uniqueId: function() {
return this.each(function() {
if ( !this.id ) {
this.id = "ui-id-" + (++uuid);
}
});
},
removeUniqueId: function() {
return this.each(function() {
if ( runiqueId.test( this.id ) ) {
$( this ).removeAttr( "id" );
}
});
}
});
function focusable( element, isTabIndexNotNaN ) {
var map, mapName, img,
nodeName = element.nodeName.toLowerCase();
if ( "area" === nodeName ) {
map = element.parentNode;
mapName = map.name;
if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
return false;
}
img = $( "img[usemap=#" + mapName + "]" )[0];
return !!img && visible( img );
}
return ( /input|select|textarea|button|object/.test( nodeName ) ?
!element.disabled :
"a" === nodeName ?
element.href || isTabIndexNotNaN :
isTabIndexNotNaN) &&
visible( element );
}
function visible( element ) {
return $.expr.filters.visible( element ) &&
!$( element ).parents().addBack().filter(function() {
return $.css( this, "visibility" ) === "hidden";
}).length;
}
$.extend( $.expr[ ":" ], {
data: $.expr.createPseudo ?
$.expr.createPseudo(function( dataName ) {
return function( elem ) {
return !!$.data( elem, dataName );
};
}) :
function( elem, i, match ) {
return !!$.data( elem, match[ 3 ] );
},
focusable: function( element ) {
return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
},
tabbable: function( element ) {
var tabIndex = $.attr( element, "tabindex" ),
isTabIndexNaN = isNaN( tabIndex );
return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
}
});
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
$.each( [ "Width", "Height" ], function( i, name ) {
var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
type = name.toLowerCase(),
orig = {
innerWidth: $.fn.innerWidth,
innerHeight: $.fn.innerHeight,
outerWidth: $.fn.outerWidth,
outerHeight: $.fn.outerHeight
};
function reduce( elem, size, border, margin ) {
$.each( side, function() {
size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
if ( border ) {
size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
}
if ( margin ) {
size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
}
});
return size;
}
$.fn[ "inner" + name ] = function( size ) {
if ( size === undefined ) {
return orig[ "inner" + name ].call( this );
}
return this.each(function() {
$( this ).css( type, reduce( this, size ) + "px" );
});
};
$.fn[ "outer" + name] = function( size, margin ) {
if ( typeof size !== "number" ) {
return orig[ "outer" + name ].call( this, size );
}
return this.each(function() {
$( this).css( type, reduce( this, size, true, margin ) + "px" );
});
};
});
}
if ( !$.fn.addBack ) {
$.fn.addBack = function( selector ) {
return this.add( selector == null ?
this.prevObject : this.prevObject.filter( selector )
);
};
}
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
$.fn.removeData = (function( removeData ) {
return function( key ) {
if ( arguments.length ) {
return removeData.call( this, $.camelCase( key ) );
} else {
return removeData.call( this );
}
};
})( $.fn.removeData );
}
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );
$.support.selectstart = "onselectstart" in document.createElement( "div" );
$.fn.extend({
disableSelection: function() {
return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
".ui-disableSelection", function( event ) {
event.preventDefault();
});
},
enableSelection: function() {
return this.unbind( ".ui-disableSelection" );
},
zIndex: function( zIndex ) {
if ( zIndex !== undefined ) {
return this.css( "zIndex", zIndex );
}
if ( this.length ) {
var elem = $( this[ 0 ] ), position, value;
while ( elem.length && elem[ 0 ] !== document ) {
position = elem.css( "position" );
if ( position === "absolute" || position === "relative" || position === "fixed" ) {
value = parseInt( elem.css( "zIndex" ), 10 );
if ( !isNaN( value ) && value !== 0 ) {
return value;
}
}
elem = elem.parent();
}
}
return 0;
}
});
$.ui.plugin = {
add: function( module, option, set ) {
var i,
proto = $.ui[ module ].prototype;
for ( i in set ) {
proto.plugins[ i ] = proto.plugins[ i ] || [];
proto.plugins[ i ].push( [ option, set[ i ] ] );
}
},
call: function( instance, name, args, allowDisconnected ) {
var i,
set = instance.plugins[ name ];
if ( !set ) {
return;
}
if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
return;
}
for ( i = 0; i < set.length; i++ ) {
if ( instance.options[ set[ i ][ 0 ] ] ) {
set[ i ][ 1 ].apply( instance.element, args );
}
}
}
};
})( jQuery );
(function( $, window, undefined ) {
var compensateToolbars = function( page, desiredHeight ) {
var pageParent = page.parent(),
toolbarsAffectingHeight = [],
noPadders = function() {
var theElement = $( this ),
widgetOptions = $.mobile.toolbar && theElement.data( "mobile-toolbar" ) ?
theElement.toolbar( "option" ) : {
position: theElement.attr( "data-" + $.mobile.ns + "position" ),
updatePagePadding: ( theElement.attr( "data-" + $.mobile.ns +
"update-page-padding" ) !== false )
};
return !( widgetOptions.position === "fixed" &&
widgetOptions.updatePagePadding === true );
},
externalHeaders = pageParent.children( ":jqmData(role='header')" ).filter( noPadders ),
internalHeaders = page.children( ":jqmData(role='header')" ),
externalFooters = pageParent.children( ":jqmData(role='footer')" ).filter( noPadders ),
internalFooters = page.children( ":jqmData(role='footer')" );
if ( internalHeaders.length === 0 && externalHeaders.length > 0 ) {
toolbarsAffectingHeight = toolbarsAffectingHeight.concat( externalHeaders.toArray() );
}
if ( internalFooters.length === 0 && externalFooters.length > 0 ) {
toolbarsAffectingHeight = toolbarsAffectingHeight.concat( externalFooters.toArray() );
}
$.each( toolbarsAffectingHeight, function( index, value ) {
desiredHeight -= $( value ).outerHeight();
});
return Math.max( 0, desiredHeight );
};
$.extend( $.mobile, {
window: $( window ),
document: $( document ),
keyCode: $.ui.keyCode,
behaviors: {},
silentScroll: function( ypos ) {
if ( $.type( ypos ) !== "number" ) {
ypos = $.mobile.defaultHomeScroll;
}
$.event.special.scrollstart.enabled = false;
setTimeout(function() {
window.scrollTo( 0, ypos );
$.mobile.document.trigger( "silentscroll", { x: 0, y: ypos });
}, 20 );
setTimeout(function() {
$.event.special.scrollstart.enabled = true;
}, 150 );
},
getClosestBaseUrl: function( ele ) {
var url = $( ele ).closest( ".ui-page" ).jqmData( "url" ),
base = $.mobile.path.documentBase.hrefNoHash;
if ( !$.mobile.dynamicBaseEnabled || !url || !$.mobile.path.isPath( url ) ) {
url = base;
}
return $.mobile.path.makeUrlAbsolute( url, base );
},
removeActiveLinkClass: function( forceRemoval ) {
if ( !!$.mobile.activeClickedLink &&
( !$.mobile.activeClickedLink.closest( "." + $.mobile.activePageClass ).length ||
forceRemoval ) ) {
$.mobile.activeClickedLink.removeClass( $.mobile.activeBtnClass );
}
$.mobile.activeClickedLink = null;
},
getInheritedTheme: function( el, defaultTheme ) {
var e = el[ 0 ],
ltr = "",
re = /ui-(bar|body|overlay)-([a-z])\b/,
c, m;
while ( e ) {
c = e.className || "";
if ( c && ( m = re.exec( c ) ) && ( ltr = m[ 2 ] ) ) {
break;
}
e = e.parentNode;
}
return ltr || defaultTheme || "a";
},
enhanceable: function( elements ) {
return this.haveParents( elements, "enhance" );
},
hijackable: function( elements ) {
return this.haveParents( elements, "ajax" );
},
haveParents: function( elements, attr ) {
if ( !$.mobile.ignoreContentEnabled ) {
return elements;
}
var count = elements.length,
$newSet = $(),
e, $element, excluded,
i, c;
for ( i = 0; i < count; i++ ) {
$element = elements.eq( i );
excluded = false;
e = elements[ i ];
while ( e ) {
c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";
if ( c === "false" ) {
excluded = true;
break;
}
e = e.parentNode;
}
if ( !excluded ) {
$newSet = $newSet.add( $element );
}
}
return $newSet;
},
getScreenHeight: function() {
return window.innerHeight || $.mobile.window.height();
},
resetActivePageHeight: function( height ) {
var page = $( "." + $.mobile.activePageClass ),
pageHeight = page.height(),
pageOuterHeight = page.outerHeight( true );
height = compensateToolbars( page,
( typeof height === "number" ) ? height : $.mobile.getScreenHeight() );
page.css( "min-height", "" );
if ( page.height() < height ) {
page.css( "min-height", height - ( pageOuterHeight - pageHeight ) );
}
},
loading: function() {
var loader = this.loading._widget || $( $.mobile.loader.prototype.defaultHtml ).loader(),
returnValue = loader.loader.apply( loader, arguments );
this.loading._widget = loader;
return returnValue;
}
});
$.addDependents = function( elem, newDependents ) {
var $elem = $( elem ),
dependents = $elem.jqmData( "dependents" ) || $();
$elem.jqmData( "dependents", $( dependents ).add( newDependents ) );
};
$.fn.extend({
removeWithDependents: function() {
$.removeWithDependents( this );
},
enhanceWithin: function() {
var index,
widgetElements = {},
keepNative = $.mobile.page.prototype.keepNativeSelector(),
that = this;
if ( $.mobile.nojs ) {
$.mobile.nojs( this );
}
if ( $.mobile.links ) {
$.mobile.links( this );
}
if ( $.mobile.degradeInputsWithin ) {
$.mobile.degradeInputsWithin( this );
}
if ( $.fn.buttonMarkup ) {
this.find( $.fn.buttonMarkup.initSelector ).not( keepNative )
.jqmEnhanceable().buttonMarkup();
}
if ( $.fn.fieldcontain ) {
this.find( ":jqmData(role='fieldcontain')" ).not( keepNative )
.jqmEnhanceable().fieldcontain();
}
$.each( $.mobile.widgets, function( name, constructor ) {
if ( constructor.initSelector ) {
var elements = $.mobile.enhanceable( that.find( constructor.initSelector ) );
if ( elements.length > 0 ) {
elements = elements.not( keepNative );
}
if ( elements.length > 0 ) {
widgetElements[ constructor.prototype.widgetName ] = elements;
}
}
});
for ( index in widgetElements ) {
widgetElements[ index ][ index ]();
}
return this;
},
addDependents: function( newDependents ) {
$.addDependents( this, newDependents );
},
getEncodedText: function() {
return $( "<a>" ).text( this.text() ).html();
},
jqmEnhanceable: function() {
return $.mobile.enhanceable( this );
},
jqmHijackable: function() {
return $.mobile.hijackable( this );
}
});
$.removeWithDependents = function( nativeElement ) {
var element = $( nativeElement );
( element.jqmData( "dependents" ) || $() ).remove();
element.remove();
};
$.addDependents = function( nativeElement, newDependents ) {
var element = $( nativeElement ),
dependents = element.jqmData( "dependents" ) || $();
element.jqmData( "dependents", $( dependents ).add( newDependents ) );
};
$.find.matches = function( expr, set ) {
return $.find( expr, null, null, set );
};
$.find.matchesSelector = function( node, expr ) {
return $.find( expr, null, null, [ node ] ).length > 0;
};
})( jQuery, this );
(function( $, window, undefined ) {
$.extend( $.mobile, {
version: "1.4.5",
subPageUrlKey: "ui-page",
hideUrlBar: true,
keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
activePageClass: "ui-page-active",
activeBtnClass: "ui-btn-active",
focusClass: "ui-focus",
ajaxEnabled: true,
hashListeningEnabled: true,
linkBindingEnabled: true,
defaultPageTransition: "fade",
maxTransitionWidth: false,
minScrollBack: 0,
defaultDialogTransition: "pop",
pageLoadErrorMessage: "Error Loading Page",
pageLoadErrorMessageTheme: "a",
phonegapNavigationEnabled: false,
autoInitializePage: true,
pushStateEnabled: true,
ignoreContentEnabled: false,
buttonMarkup: {
hoverDelay: 200
},
dynamicBaseEnabled: true,
pageContainer: $(),
allowCrossDomainPages: false,
dialogHashKey: "&ui-state=dialog"
});
})( jQuery, this );
/*!
* jQuery UI Widget c0ab71056b936627e8a7821f03c044aec6280a40
* http://jqueryui.com
*
* Copyright 2013 jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/jQuery.widget/
*/
(function( $, undefined ) {
var uuid = 0,
slice = Array.prototype.slice,
_cleanData = $.cleanData;
$.cleanData = function( elems ) {
for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
try {
$( elem ).triggerHandler( "remove" );
} catch( e ) {}
}
_cleanData( elems );
};
$.widget = function( name, base, prototype ) {
var fullName, existingConstructor, constructor, basePrototype,
proxiedPrototype = {},
namespace = name.split( "." )[ 0 ];
name = name.split( "." )[ 1 ];
fullName = namespace + "-" + name;
if ( !prototype ) {
prototype = base;
base = $.Widget;
}
$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
return !!$.data( elem, fullName );
};
$[ namespace ] = $[ namespace ] || {};
existingConstructor = $[ namespace ][ name ];
constructor = $[ namespace ][ name ] = function( options, element ) {
if ( !this._createWidget ) {
return new constructor( options, element );
}
if ( arguments.length ) {
this._createWidget( options, element );
}
};
$.extend( constructor, existingConstructor, {
version: prototype.version,
_proto: $.extend( {}, prototype ),
_childConstructors: []
});
basePrototype = new base();
basePrototype.options = $.widget.extend( {}, basePrototype.options );
$.each( prototype, function( prop, value ) {
if ( !$.isFunction( value ) ) {
proxiedPrototype[ prop ] = value;
return;
}
proxiedPrototype[ prop ] = (function() {
var _super = function() {
return base.prototype[ prop ].apply( this, arguments );
},
_superApply = function( args ) {
return base.prototype[ prop ].apply( this, args );
};
return function() {
var __super = this._super,
__superApply = this._superApply,
returnValue;
this._super = _super;
this._superApply = _superApply;
returnValue = value.apply( this, arguments );
this._super = __super;
this._superApply = __superApply;
return returnValue;
};
})();
});
constructor.prototype = $.widget.extend( basePrototype, {
widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
}, proxiedPrototype, {
constructor: constructor,
namespace: namespace,
widgetName: name,
widgetFullName: fullName
});
if ( existingConstructor ) {
$.each( existingConstructor._childConstructors, function( i, child ) {
var childPrototype = child.prototype;
$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
});
delete existingConstructor._childConstructors;
} else {
base._childConstructors.push( constructor );
}
$.widget.bridge( name, constructor );
return constructor;
};
$.widget.extend = function( target ) {
var input = slice.call( arguments, 1 ),
inputIndex = 0,
inputLength = input.length,
key,
value;
for ( ; inputIndex < inputLength; inputIndex++ ) {
for ( key in input[ inputIndex ] ) {
value = input[ inputIndex ][ key ];
if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
if ( $.isPlainObject( value ) ) {
target[ key ] = $.isPlainObject( target[ key ] ) ?
$.widget.extend( {}, target[ key ], value ) :
$.widget.extend( {}, value );
} else {
target[ key ] = value;
}
}
}
}
return target;
};
$.widget.bridge = function( name, object ) {
var fullName = object.prototype.widgetFullName || name;
$.fn[ name ] = function( options ) {
var isMethodCall = typeof options === "string",
args = slice.call( arguments, 1 ),
returnValue = this;
options = !isMethodCall && args.length ?
$.widget.extend.apply( null, [ options ].concat(args) ) :
options;
if ( isMethodCall ) {
this.each(function() {
var methodValue,
instance = $.data( this, fullName );
if ( options === "instance" ) {
returnValue = instance;
return false;
}
if ( !instance ) {
return $.error( "cannot call methods on " + name + " prior to initialization; " +
"attempted to call method '" + options + "'" );
}
if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
return $.error( "no such method '" + options + "' for " + name + " widget instance" );
}
methodValue = instance[ options ].apply( instance, args );
if ( methodValue !== instance && methodValue !== undefined ) {
returnValue = methodValue && methodValue.jquery ?
returnValue.pushStack( methodValue.get() ) :
methodValue;
return false;
}
});
} else {
this.each(function() {
var instance = $.data( this, fullName );
if ( instance ) {
instance.option( options || {} )._init();
} else {
$.data( this, fullName, new object( options, this ) );
}
});
}
return returnValue;
};
};
$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];
$.Widget.prototype = {
widgetName: "widget",
widgetEventPrefix: "",
defaultElement: "<div>",
options: {
disabled: false,
create: null
},
_createWidget: function( options, element ) {
element = $( element || this.defaultElement || this )[ 0 ];
this.element = $( element );
this.uuid = uuid++;
this.eventNamespace = "." + this.widgetName + this.uuid;
this.options = $.widget.extend( {},
this.options,
this._getCreateOptions(),
options );
this.bindings = $();
this.hoverable = $();
this.focusable = $();
if ( element !== this ) {
$.data( element, this.widgetFullName, this );
this._on( true, this.element, {
remove: function( event ) {
if ( event.target === element ) {
this.destroy();
}
}
});
this.document = $( element.style ?
element.ownerDocument :
element.document || element );
this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
}
this._create();
this._trigger( "create", null, this._getCreateEventData() );
this._init();
},
_getCreateOptions: $.noop,
_getCreateEventData: $.noop,
_create: $.noop,
_init: $.noop,
destroy: function() {
this._destroy();
this.element
.unbind( this.eventNamespace )
.removeData( this.widgetFullName )
.removeData( $.camelCase( this.widgetFullName ) );
this.widget()
.unbind( this.eventNamespace )
.removeAttr( "aria-disabled" )
.removeClass(
this.widgetFullName + "-disabled " +
"ui-state-disabled" );
this.bindings.unbind( this.eventNamespace );
this.hoverable.removeClass( "ui-state-hover" );
this.focusable.removeClass( "ui-state-focus" );
},
_destroy: $.noop,
widget: function() {
return this.element;
},
option: function( key, value ) {
var options = key,
parts,
curOption,
i;
if ( arguments.length === 0 ) {
return $.widget.extend( {}, this.options );
}
if ( typeof key === "string" ) {
options = {};
parts = key.split( "." );
key = parts.shift();
if ( parts.length ) {
curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
for ( i = 0; i < parts.length - 1; i++ ) {
curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
curOption = curOption[ parts[ i ] ];
}
key = parts.pop();
if ( value === undefined ) {
return curOption[ key ] === undefined ? null : curOption[ key ];
}
curOption[ key ] = value;
} else {
if ( value === undefined ) {
return this.options[ key ] === undefined ? null : this.options[ key ];
}
options[ key ] = value;
}
}
this._setOptions( options );
return this;
},
_setOptions: function( options ) {
var key;
for ( key in options ) {
this._setOption( key, options[ key ] );
}
return this;
},
_setOption: function( key, value ) {
this.options[ key ] = value;
if ( key === "disabled" ) {
this.widget()
.toggleClass( this.widgetFullName + "-disabled", !!value );
this.hoverable.removeClass( "ui-state-hover" );
this.focusable.removeClass( "ui-state-focus" );
}
return this;
},
enable: function() {
return this._setOptions({ disabled: false });
},
disable: function() {
return this._setOptions({ disabled: true });
},
_on: function( suppressDisabledCheck, element, handlers ) {
var delegateElement,
instance = this;
if ( typeof suppressDisabledCheck !== "boolean" ) {
handlers = element;
element = suppressDisabledCheck;
suppressDisabledCheck = false;
}
if ( !handlers ) {
handlers = element;
element = this.element;
delegateElement = this.widget();
} else {
element = delegateElement = $( element );
this.bindings = this.bindings.add( element );
}
$.each( handlers, function( event, handler ) {
function handlerProxy() {
if ( !suppressDisabledCheck &&
( instance.options.disabled === true ||
$( this ).hasClass( "ui-state-disabled" ) ) ) {
return;
}
return ( typeof handler === "string" ? instance[ handler ] : handler )
.apply( instance, arguments );
}
if ( typeof handler !== "string" ) {
handlerProxy.guid = handler.guid =
handler.guid || handlerProxy.guid || $.guid++;
}
var match = event.match( /^(\w+)\s*(.*)$/ ),
eventName = match[1] + instance.eventNamespace,
selector = match[2];
if ( selector ) {
delegateElement.delegate( selector, eventName, handlerProxy );
} else {
element.bind( eventName, handlerProxy );
}
});
},
_off: function( element, eventName ) {
eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
element.unbind( eventName ).undelegate( eventName );
},
_delay: function( handler, delay ) {
function handlerProxy() {
return ( typeof handler === "string" ? instance[ handler ] : handler )
.apply( instance, arguments );
}
var instance = this;
return setTimeout( handlerProxy, delay || 0 );
},
_hoverable: function( element ) {
this.hoverable = this.hoverable.add( element );
this._on( element, {
mouseenter: function( event ) {
$( event.currentTarget ).addClass( "ui-state-hover" );
},
mouseleave: function( event ) {
$( event.currentTarget ).removeClass( "ui-state-hover" );
}
});
},
_focusable: function( element ) {
this.focusable = this.focusable.add( element );
this._on( element, {
focusin: function( event ) {
$( event.currentTarget ).addClass( "ui-state-focus" );
},
focusout: function( event ) {
$( event.currentTarget ).removeClass( "ui-state-focus" );
}
});
},
_trigger: function( type, event, data ) {
var prop, orig,
callback = this.options[ type ];
data = data || {};
event = $.Event( event );
event.type = ( type === this.widgetEventPrefix ?
type :
this.widgetEventPrefix + type ).toLowerCase();
event.target = this.element[ 0 ];
orig = event.originalEvent;
if ( orig ) {
for ( prop in orig ) {
if ( !( prop in event ) ) {
event[ prop ] = orig[ prop ];
}
}
}
this.element.trigger( event, data );
return !( $.isFunction( callback ) &&
callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
event.isDefaultPrevented() );
}
};
$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
if ( typeof options === "string" ) {
options = { effect: options };
}
var hasOptions,
effectName = !options ?
method :
options === true || typeof options === "number" ?
defaultEffect :
options.effect || defaultEffect;
options = options || {};
if ( typeof options === "number" ) {
options = { duration: options };
}
hasOptions = !$.isEmptyObject( options );
options.complete = callback;
if ( options.delay ) {
element.delay( options.delay );
}
if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
element[ method ]( options );
} else if ( effectName !== method && element[ effectName ] ) {
element[ effectName ]( options.duration, options.easing, callback );
} else {
element.queue(function( next ) {
$( this )[ method ]();
if ( callback ) {
callback.call( element[ 0 ] );
}
next();
});
}
};
});
})( jQuery );
(function( $, window, undefined ) {
var nsNormalizeDict = {},
oldFind = $.find,
rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
jqmDataRE = /:jqmData\(([^)]*)\)/g;
$.extend( $.mobile, {
ns: "",
getAttribute: function( element, key ) {
var data;
element = element.jquery ? element[0] : element;
if ( element && element.getAttribute ) {
data = element.getAttribute( "data-" + $.mobile.ns + key );
}
try {
data = data === "true" ? true :
data === "false" ? false :
data === "null" ? null :
+data + "" === data ? +data :
rbrace.test( data ) ? JSON.parse( data ) :
data;
} catch( err ) {}
return data;
},
nsNormalizeDict: nsNormalizeDict,
nsNormalize: function( prop ) {
return nsNormalizeDict[ prop ] ||
( nsNormalizeDict[ prop ] = $.camelCase( $.mobile.ns + prop ) );
},
closestPageData: function( $target ) {
return $target
.closest( ":jqmData(role='page'), :jqmData(role='dialog')" )
.data( "mobile-page" );
}
});
$.fn.jqmData = function( prop, value ) {
var result;
if ( typeof prop !== "undefined" ) {
if ( prop ) {
prop = $.mobile.nsNormalize( prop );
}
if ( arguments.length < 2 || value === undefined ) {
result = this.data( prop );
} else {
result = this.data( prop, value );
}
}
return result;
};
$.jqmData = function( elem, prop, value ) {
var result;
if ( typeof prop !== "undefined" ) {
result = $.data( elem, prop ? $.mobile.nsNormalize( prop ) : prop, value );
}
return result;
};
$.fn.jqmRemoveData = function( prop ) {
return this.removeData( $.mobile.nsNormalize( prop ) );
};
$.jqmRemoveData = function( elem, prop ) {
return $.removeData( elem, $.mobile.nsNormalize( prop ) );
};
$.find = function( selector, context, ret, extra ) {
if ( selector.indexOf( ":jqmData" ) > -1 ) {
selector = selector.replace( jqmDataRE, "[data-" + ( $.mobile.ns || "" ) + "$1]" );
}
return oldFind.call( this, selector, context, ret, extra );
};
$.extend( $.find, oldFind );
})( jQuery, this );
(function( $, undefined ) {
var rcapitals = /[A-Z]/g,
replaceFunction = function( c ) {
return "-" + c.toLowerCase();
};
$.extend( $.Widget.prototype, {
_getCreateOptions: function() {
var option, value,
elem = this.element[ 0 ],
options = {};
if ( !$.mobile.getAttribute( elem, "defaults" ) ) {
for ( option in this.options ) {
value = $.mobile.getAttribute( elem, option.replace( rcapitals, replaceFunction ) );
if ( value != null ) {
options[ option ] = value;
}
}
}
return options;
}
});
$.mobile.widget = $.Widget;
})( jQuery );
(function( $ ) {
var loaderClass = "ui-loader", $html = $( "html" );
$.widget( "mobile.loader", {
options: {
theme: "a",
textVisible: false,
html: "",
text: "loading"
},
defaultHtml: "<div class='" + loaderClass + "'>" +
"<span class='ui-icon-loading'></span>" +
"<h1></h1>" +
"</div>",
fakeFixLoader: function() {
var activeBtn = $( "." + $.mobile.activeBtnClass ).first();
this.element
.css({
top: $.support.scrollTop && this.window.scrollTop() + this.window.height() / 2 ||
activeBtn.length && activeBtn.offset().top || 100
});
},
checkLoaderPosition: function() {
var offset = this.element.offset(),
scrollTop = this.window.scrollTop(),
screenHeight = $.mobile.getScreenHeight();
if ( offset.top < scrollTop || ( offset.top - scrollTop ) > screenHeight ) {
this.element.addClass( "ui-loader-fakefix" );
this.fakeFixLoader();
this.window
.unbind( "scroll", this.checkLoaderPosition )
.bind( "scroll", $.proxy( this.fakeFixLoader, this ) );
}
},
resetHtml: function() {
this.element.html( $( this.defaultHtml ).html() );
},
show: function( theme, msgText, textonly ) {
var textVisible, message, loadSettings;
this.resetHtml();
if ( $.type( theme ) === "object" ) {
loadSettings = $.extend( {}, this.options, theme );
theme = loadSettings.theme;
} else {
loadSettings = this.options;
theme = theme || loadSettings.theme;
}
message = msgText || ( loadSettings.text === false ? "" : loadSettings.text );
$html.addClass( "ui-loading" );
textVisible = loadSettings.textVisible;
this.element.attr("class", loaderClass +
" ui-corner-all ui-body-" + theme +
" ui-loader-" + ( textVisible || msgText || theme.text ? "verbose" : "default" ) +
( loadSettings.textonly || textonly ? " ui-loader-textonly" : "" ) );
if ( loadSettings.html ) {
this.element.html( loadSettings.html );
} else {
this.element.find( "h1" ).text( message );
}
this.element.appendTo( $.mobile.pagecontainer ?
$( ":mobile-pagecontainer" ) : $( "body" ) );
this.checkLoaderPosition();
this.window.bind( "scroll", $.proxy( this.checkLoaderPosition, this ) );
},
hide: function() {
$html.removeClass( "ui-loading" );
if ( this.options.text ) {
this.element.removeClass( "ui-loader-fakefix" );
}
this.window.unbind( "scroll", this.fakeFixLoader );
this.window.unbind( "scroll", this.checkLoaderPosition );
}
});
})(jQuery, this);
/*!
* jQuery hashchange event - v1.3 - 7/21/2010
* http://benalman.com/projects/jquery-hashchange-plugin/
*
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
(function($,window,undefined){
'$:nomunge'; // Used by YUI compressor.
var str_hashchange = 'hashchange',
doc = document,
fake_onhashchange,
special = $.event.special,
doc_mode = doc.documentMode,
supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
function get_fragment( url ) {
url = url || location.href;
return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
};
$.fn[ str_hashchange ] = function( fn ) {
return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
};
$.fn[ str_hashchange ].delay = 50;
/*
$.fn[ str_hashchange ].domain = null;
$.fn[ str_hashchange ].src = null;
*/
special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
setup: function() {
if ( supports_onhashchange ) { return false; }
$( fake_onhashchange.start );
},
teardown: function() {
if ( supports_onhashchange ) { return false; }
$( fake_onhashchange.stop );
}
});
fake_onhashchange = (function(){
var self = {},
timeout_id,
last_hash = get_fragment(),
fn_retval = function(val){ return val; },
history_set = fn_retval,
history_get = fn_retval;
self.start = function() {
timeout_id || poll();
};
self.stop = function() {
timeout_id && clearTimeout( timeout_id );
timeout_id = undefined;
};
function poll() {
var hash = get_fragment(),
history_hash = history_get( last_hash );
if ( hash !== last_hash ) {
history_set( last_hash = hash, history_hash );
$(window).trigger( str_hashchange );
} else if ( history_hash !== last_hash ) {
location.href = location.href.replace( /#.*/, '' ) + history_hash;
}
timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
};
window.attachEvent && !window.addEventListener && !supports_onhashchange && (function(){
var iframe,
iframe_src;
self.start = function(){
if ( !iframe ) {
iframe_src = $.fn[ str_hashchange ].src;
iframe_src = iframe_src && iframe_src + get_fragment();
iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
.one( 'load', function(){
iframe_src || history_set( get_fragment() );
poll();
})
.attr( 'src', iframe_src || 'javascript:0' )
.insertAfter( 'body' )[0].contentWindow;
doc.onpropertychange = function(){
try {
if ( event.propertyName === 'title' ) {
iframe.document.title = doc.title;
}
} catch(e) {}
};
}
};
self.stop = fn_retval;
history_get = function() {
return get_fragment( iframe.location.href );
};
history_set = function( hash, history_hash ) {
var iframe_doc = iframe.document,
domain = $.fn[ str_hashchange ].domain;
if ( hash !== history_hash ) {
iframe_doc.title = doc.title;
iframe_doc.open();
domain && iframe_doc.write( '\x3cscript>document.domain="' + domain + '"\x3c/script>' );
iframe_doc.close();
iframe.location.hash = hash;
}
};
})();
return self;
})();
})(jQuery,this);
(function( $, undefined ) {
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia = window.matchMedia || (function( doc, undefined ) {
var bool,
docElem = doc.documentElement,
refNode = docElem.firstElementChild || docElem.firstChild,
fakeBody = doc.createElement( "body" ),
div = doc.createElement( "div" );
div.id = "mq-test-1";
div.style.cssText = "position:absolute;top:-100em";
fakeBody.style.background = "none";
fakeBody.appendChild(div);
return function(q){
div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
docElem.insertBefore( fakeBody, refNode );
bool = div.offsetWidth === 42;
docElem.removeChild( fakeBody );
return {
matches: bool,
media: q
};
};
}( document ));
$.mobile.media = function( q ) {
return window.matchMedia( q ).matches;
};
})(jQuery);
(function( $, undefined ) {
var support = {
touch: "ontouchend" in document
};
$.mobile.support = $.mobile.support || {};
$.extend( $.support, support );
$.extend( $.mobile.support, support );
}( jQuery ));
(function( $, undefined ) {
$.extend( $.support, {
orientation: "orientation" in window && "onorientationchange" in window
});
}( jQuery ));
(function( $, undefined ) {
function propExists( prop ) {
var uc_prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
props = ( prop + " " + vendors.join( uc_prop + " " ) + uc_prop ).split( " " ),
v;
for ( v in props ) {
if ( fbCSS[ props[ v ] ] !== undefined ) {
return true;
}
}
}
var fakeBody = $( "<body>" ).prependTo( "html" ),
fbCSS = fakeBody[ 0 ].style,
vendors = [ "Webkit", "Moz", "O" ],
webos = "palmGetResource" in window, //only used to rule out scrollTop
operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]",
bb = window.blackberry && !propExists( "-webkit-transform" ), //only used to rule out box shadow, as it's filled opaque on BB 5 and lower
nokiaLTE7_3;
function inlineSVG() {
var w = window,
svg = !!w.document.createElementNS && !!w.document.createElementNS( "http://www.w3.org/2000/svg", "svg" ).createSVGRect && !( w.opera && navigator.userAgent.indexOf( "Chrome" ) === -1 ),
support = function( data ) {
if ( !( data && svg ) ) {
$( "html" ).addClass( "ui-nosvg" );
}
},
img = new w.Image();
img.onerror = function() {
support( false );
};
img.onload = function() {
support( img.width === 1 && img.height === 1 );
};
img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
}
function transform3dTest() {
var mqProp = "transform-3d",
ret = $.mobile.media( "(-" + vendors.join( "-" + mqProp + "),(-" ) + "-" + mqProp + "),(" + mqProp + ")" ),
el, transforms, t;
if ( ret ) {
return !!ret;
}
el = document.createElement( "div" );
transforms = {
"MozTransform": "-moz-transform",
"transform": "transform"
};
fakeBody.append( el );
for ( t in transforms ) {
if ( el.style[ t ] !== undefined ) {
el.style[ t ] = "translate3d( 100px, 1px, 1px )";
ret = window.getComputedStyle( el ).getPropertyValue( transforms[ t ] );
}
}
return ( !!ret && ret !== "none" );
}
function baseTagTest() {
var fauxBase = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
base = $( "head base" ),
fauxEle = null,
href = "",
link, rebase;
if ( !base.length ) {
base = fauxEle = $( "<base>", { "href": fauxBase }).appendTo( "head" );
} else {
href = base.attr( "href" );
}
link = $( "<a href='testurl' />" ).prependTo( fakeBody );
rebase = link[ 0 ].href;
base[ 0 ].href = href || location.pathname;
if ( fauxEle ) {
fauxEle.remove();
}
return rebase.indexOf( fauxBase ) === 0;
}
function cssPointerEventsTest() {
var element = document.createElement( "x" ),
documentElement = document.documentElement,
getComputedStyle = window.getComputedStyle,
supports;
if ( !( "pointerEvents" in element.style ) ) {
return false;
}
element.style.pointerEvents = "auto";
element.style.pointerEvents = "x";
documentElement.appendChild( element );
supports = getComputedStyle &&
getComputedStyle( element, "" ).pointerEvents === "auto";
documentElement.removeChild( element );
return !!supports;
}
function boundingRect() {
var div = document.createElement( "div" );
return typeof div.getBoundingClientRect !== "undefined";
}
$.extend( $.mobile, { browser: {} } );
$.mobile.browser.oldIE = (function() {
var v = 3,
div = document.createElement( "div" ),
a = div.all || [];
do {
div.innerHTML = "<!--[if gt IE " + ( ++v ) + "]><br><![endif]-->";
} while( a[0] );
return v > 4 ? v : !v;
})();
function fixedPosition() {
var w = window,
ua = navigator.userAgent,
platform = navigator.platform,
wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
wkversion = !!wkmatch && wkmatch[ 1 ],
ffmatch = ua.match( /Fennec\/([0-9]+)/ ),
ffversion = !!ffmatch && ffmatch[ 1 ],
operammobilematch = ua.match( /Opera Mobi\/([0-9]+)/ ),
omversion = !!operammobilematch && operammobilematch[ 1 ];
if (
( ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1 || platform.indexOf( "iPod" ) > -1 ) && wkversion && wkversion < 534 ) ||
( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
( operammobilematch && omversion < 7458 ) ||
( ua.indexOf( "Android" ) > -1 && wkversion && wkversion < 533 ) ||
( ffversion && ffversion < 6 ) ||
( "palmGetResource" in window && wkversion && wkversion < 534 ) ||
( ua.indexOf( "MeeGo" ) > -1 && ua.indexOf( "NokiaBrowser/8.5.0" ) > -1 ) ) {
return false;
}
return true;
}
$.extend( $.support, {
pushState: "pushState" in history &&
"replaceState" in history &&
!( window.navigator.userAgent.indexOf( "Firefox" ) >= 0 && window.top !== window ) &&
( window.navigator.userAgent.search(/CriOS/) === -1 ),
mediaquery: $.mobile.media( "only all" ),
cssPseudoElement: !!propExists( "content" ),
touchOverflow: !!propExists( "overflowScrolling" ),
cssTransform3d: transform3dTest(),
boxShadow: !!propExists( "boxShadow" ) && !bb,
fixedPosition: fixedPosition(),
scrollTop: ("pageXOffset" in window ||
"scrollTop" in document.documentElement ||
"scrollTop" in fakeBody[ 0 ]) && !webos && !operamini,
dynamicBaseTag: baseTagTest(),
cssPointerEvents: cssPointerEventsTest(),
boundingRect: boundingRect(),
inlineSVG: inlineSVG
});
fakeBody.remove();
nokiaLTE7_3 = (function() {
var ua = window.navigator.userAgent;
return ua.indexOf( "Nokia" ) > -1 &&
( ua.indexOf( "Symbian/3" ) > -1 || ua.indexOf( "Series60/5" ) > -1 ) &&
ua.indexOf( "AppleWebKit" ) > -1 &&
ua.match( /(BrowserNG|NokiaBrowser)\/7\.[0-3]/ );
})();
$.mobile.gradeA = function() {
return ( ( $.support.mediaquery && $.support.cssPseudoElement ) || $.mobile.browser.oldIE && $.mobile.browser.oldIE >= 8 ) && ( $.support.boundingRect || $.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null );
};
$.mobile.ajaxBlacklist =
window.blackberry && !window.WebKitPoint ||
operamini ||
nokiaLTE7_3;
if ( nokiaLTE7_3 ) {
$(function() {
$( "head link[rel='stylesheet']" ).attr( "rel", "alternate stylesheet" ).attr( "rel", "stylesheet" );
});
}
if ( !$.support.boxShadow ) {
$( "html" ).addClass( "ui-noboxshadow" );
}
})( jQuery );
(function( $, undefined ) {
var $win = $.mobile.window, self,
dummyFnToInitNavigate = function() {
};
$.event.special.beforenavigate = {
setup: function() {
$win.on( "navigate", dummyFnToInitNavigate );
},
teardown: function() {
$win.off( "navigate", dummyFnToInitNavigate );
}
};
$.event.special.navigate = self = {
bound: false,
pushStateEnabled: true,
originalEventName: undefined,
isPushStateEnabled: function() {
return $.support.pushState &&
$.mobile.pushStateEnabled === true &&
this.isHashChangeEnabled();
},
isHashChangeEnabled: function() {
return $.mobile.hashListeningEnabled === true;
},
popstate: function( event ) {
var newEvent = new $.Event( "navigate" ),
beforeNavigate = new $.Event( "beforenavigate" ),
state = event.originalEvent.state || {};
beforeNavigate.originalEvent = event;
$win.trigger( beforeNavigate );
if ( beforeNavigate.isDefaultPrevented() ) {
return;
}
if ( event.historyState ) {
$.extend(state, event.historyState);
}
newEvent.originalEvent = event;
setTimeout(function() {
$win.trigger( newEvent, {
state: state
});
}, 0);
},
hashchange: function( event /*, data */ ) {
var newEvent = new $.Event( "navigate" ),
beforeNavigate = new $.Event( "beforenavigate" );
beforeNavigate.originalEvent = event;
$win.trigger( beforeNavigate );
if ( beforeNavigate.isDefaultPrevented() ) {
return;
}
newEvent.originalEvent = event;
$win.trigger( newEvent, {
state: event.hashchangeState || {}
});
},
setup: function( /* data, namespaces */ ) {
if ( self.bound ) {
return;
}
self.bound = true;
if ( self.isPushStateEnabled() ) {
self.originalEventName = "popstate";
$win.bind( "popstate.navigate", self.popstate );
} else if ( self.isHashChangeEnabled() ) {
self.originalEventName = "hashchange";
$win.bind( "hashchange.navigate", self.hashchange );
}
}
};
})( jQuery );
(function( $, undefined ) {
var path, $base, dialogHashKey = "&ui-state=dialog";
$.mobile.path = path = {
uiStateKey: "&ui-state",
urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
getLocation: function( url ) {
var parsedUrl = this.parseUrl( url || location.href ),
uri = url ? parsedUrl : location,
hash = parsedUrl.hash;
hash = hash === "#" ? "" : hash;
return uri.protocol +
parsedUrl.doubleSlash +
uri.host +
( ( uri.protocol !== "" && uri.pathname.substring( 0, 1 ) !== "/" ) ?
"/" : "" ) +
uri.pathname +
uri.search +
hash;
},
getDocumentUrl: function( asParsedObject ) {
return asParsedObject ? $.extend( {}, path.documentUrl ) : path.documentUrl.href;
},
parseLocation: function() {
return this.parseUrl( this.getLocation() );
},
parseUrl: function( url ) {
if ( $.type( url ) === "object" ) {
return url;
}
var matches = path.urlParseRE.exec( url || "" ) || [];
return {
href: matches[ 0 ] || "",
hrefNoHash: matches[ 1 ] || "",
hrefNoSearch: matches[ 2 ] || "",
domain: matches[ 3 ] || "",
protocol: matches[ 4 ] || "",
doubleSlash: matches[ 5 ] || "",
authority: matches[ 6 ] || "",
username: matches[ 8 ] || "",
password: matches[ 9 ] || "",
host: matches[ 10 ] || "",
hostname: matches[ 11 ] || "",
port: matches[ 12 ] || "",
pathname: matches[ 13 ] || "",
directory: matches[ 14 ] || "",
filename: matches[ 15 ] || "",
search: matches[ 16 ] || "",
hash: matches[ 17 ] || ""
};
},
makePathAbsolute: function( relPath, absPath ) {
var absStack,
relStack,
i, d;
if ( relPath && relPath.charAt( 0 ) === "/" ) {
return relPath;
}
relPath = relPath || "";
absPath = absPath ? absPath.replace( /^\/|(\/[^\/]*|[^\/]+)$/g, "" ) : "";
absStack = absPath ? absPath.split( "/" ) : [];
relStack = relPath.split( "/" );
for ( i = 0; i < relStack.length; i++ ) {
d = relStack[ i ];
switch ( d ) {
case ".":
break;
case "..":
if ( absStack.length ) {
absStack.pop();
}
break;
default:
absStack.push( d );
break;
}
}
return "/" + absStack.join( "/" );
},
isSameDomain: function( absUrl1, absUrl2 ) {
return path.parseUrl( absUrl1 ).domain.toLowerCase() ===
path.parseUrl( absUrl2 ).domain.toLowerCase();
},
isRelativeUrl: function( url ) {
return path.parseUrl( url ).protocol === "";
},
isAbsoluteUrl: function( url ) {
return path.parseUrl( url ).protocol !== "";
},
makeUrlAbsolute: function( relUrl, absUrl ) {
if ( !path.isRelativeUrl( relUrl ) ) {
return relUrl;
}
if ( absUrl === undefined ) {
absUrl = this.documentBase;
}
var relObj = path.parseUrl( relUrl ),
absObj = path.parseUrl( absUrl ),
protocol = relObj.protocol || absObj.protocol,
doubleSlash = relObj.protocol ? relObj.doubleSlash : ( relObj.doubleSlash || absObj.doubleSlash ),
authority = relObj.authority || absObj.authority,
hasPath = relObj.pathname !== "",
pathname = path.makePathAbsolute( relObj.pathname || absObj.filename, absObj.pathname ),
search = relObj.search || ( !hasPath && absObj.search ) || "",
hash = relObj.hash;
return protocol + doubleSlash + authority + pathname + search + hash;
},
addSearchParams: function( url, params ) {
var u = path.parseUrl( url ),
p = ( typeof params === "object" ) ? $.param( params ) : params,
s = u.search || "?";
return u.hrefNoSearch + s + ( s.charAt( s.length - 1 ) !== "?" ? "&" : "" ) + p + ( u.hash || "" );
},
convertUrlToDataUrl: function( absUrl ) {
var result = absUrl,
u = path.parseUrl( absUrl );
if ( path.isEmbeddedPage( u ) ) {
result = u.hash
.split( dialogHashKey )[0]
.replace( /^#/, "" )
.replace( /\?.*$/, "" );
} else if ( path.isSameDomain( u, this.documentBase ) ) {
result = u.hrefNoHash.replace( this.documentBase.domain, "" ).split( dialogHashKey )[0];
}
return window.decodeURIComponent( result );
},
get: function( newPath ) {
if ( newPath === undefined ) {
newPath = path.parseLocation().hash;
}
return path.stripHash( newPath ).replace( /[^\/]*\.[^\/*]+$/, "" );
},
set: function( path ) {
location.hash = path;
},
isPath: function( url ) {
return ( /\// ).test( url );
},
clean: function( url ) {
return url.replace( this.documentBase.domain, "" );
},
stripHash: function( url ) {
return url.replace( /^#/, "" );
},
stripQueryParams: function( url ) {
return url.replace( /\?.*$/, "" );
},
cleanHash: function( hash ) {
return path.stripHash( hash.replace( /\?.*$/, "" ).replace( dialogHashKey, "" ) );
},
isHashValid: function( hash ) {
return ( /^#[^#]+$/ ).test( hash );
},
isExternal: function( url ) {
var u = path.parseUrl( url );
return !!( u.protocol &&
( u.domain.toLowerCase() !== this.documentUrl.domain.toLowerCase() ) );
},
hasProtocol: function( url ) {
return ( /^(:?\w+:)/ ).test( url );
},
isEmbeddedPage: function( url ) {
var u = path.parseUrl( url );
if ( u.protocol !== "" ) {
return ( !this.isPath(u.hash) && u.hash && ( u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ) ) );
}
return ( /^#/ ).test( u.href );
},
squash: function( url, resolutionUrl ) {
var href, cleanedUrl, search, stateIndex, docUrl,
isPath = this.isPath( url ),
uri = this.parseUrl( url ),
preservedHash = uri.hash,
uiState = "";
if ( !resolutionUrl ) {
if ( isPath ) {
resolutionUrl = path.getLocation();
} else {
docUrl = path.getDocumentUrl( true );
if ( path.isPath( docUrl.hash ) ) {
resolutionUrl = path.squash( docUrl.href );
} else {
resolutionUrl = docUrl.href;
}
}
}
cleanedUrl = isPath ? path.stripHash( url ) : url;
cleanedUrl = path.isPath( uri.hash ) ? path.stripHash( uri.hash ) : cleanedUrl;
stateIndex = cleanedUrl.indexOf( this.uiStateKey );
if ( stateIndex > -1 ) {
uiState = cleanedUrl.slice( stateIndex );
cleanedUrl = cleanedUrl.slice( 0, stateIndex );
}
href = path.makeUrlAbsolute( cleanedUrl, resolutionUrl );
search = this.parseUrl( href ).search;
if ( isPath ) {
if ( path.isPath( preservedHash ) || preservedHash.replace("#", "").indexOf( this.uiStateKey ) === 0) {
preservedHash = "";
}
if ( uiState && preservedHash.indexOf( this.uiStateKey ) === -1) {
preservedHash += uiState;
}
if ( preservedHash.indexOf( "#" ) === -1 && preservedHash !== "" ) {
preservedHash = "#" + preservedHash;
}
href = path.parseUrl( href );
href = href.protocol + href.doubleSlash + href.host + href.pathname + search +
preservedHash;
} else {
href += href.indexOf( "#" ) > -1 ? uiState : "#" + uiState;
}
return href;
},
isPreservableHash: function( hash ) {
return hash.replace( "#", "" ).indexOf( this.uiStateKey ) === 0;
},
hashToSelector: function( hash ) {
var hasHash = ( hash.substring( 0, 1 ) === "#" );
if ( hasHash ) {
hash = hash.substring( 1 );
}
return ( hasHash ? "#" : "" ) + hash.replace( /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1" );
},
getFilePath: function( path ) {
return path && path.split( dialogHashKey )[0];
},
isFirstPageUrl: function( url ) {
var u = path.parseUrl( path.makeUrlAbsolute( url, this.documentBase ) ),
samePath = u.hrefNoHash === this.documentUrl.hrefNoHash ||
( this.documentBaseDiffers &&
u.hrefNoHash === this.documentBase.hrefNoHash ),
fp = $.mobile.firstPage,
fpId = fp && fp[0] ? fp[0].id : undefined;
return samePath &&
( !u.hash ||
u.hash === "#" ||
( fpId && u.hash.replace( /^#/, "" ) === fpId ) );
},
isPermittedCrossDomainRequest: function( docUrl, reqUrl ) {
return $.mobile.allowCrossDomainPages &&
(docUrl.protocol === "file:" || docUrl.protocol === "content:") &&
reqUrl.search( /^https?:/ ) !== -1;
}
};
path.documentUrl = path.parseLocation();
$base = $( "head" ).find( "base" );
path.documentBase = $base.length ?
path.parseUrl( path.makeUrlAbsolute( $base.attr( "href" ), path.documentUrl.href ) ) :
path.documentUrl;
path.documentBaseDiffers = (path.documentUrl.hrefNoHash !== path.documentBase.hrefNoHash);
path.getDocumentBase = function( asParsedObject ) {
return asParsedObject ? $.extend( {}, path.documentBase ) : path.documentBase.href;
};
$.extend( $.mobile, {
getDocumentUrl: path.getDocumentUrl,
getDocumentBase: path.getDocumentBase
});
})( jQuery );
(function( $, undefined ) {
$.mobile.History = function( stack, index ) {
this.stack = stack || [];
this.activeIndex = index || 0;
};
$.extend($.mobile.History.prototype, {
getActive: function() {
return this.stack[ this.activeIndex ];
},
getLast: function() {
return this.stack[ this.previousIndex ];
},
getNext: function() {
return this.stack[ this.activeIndex + 1 ];
},
getPrev: function() {
return this.stack[ this.activeIndex - 1 ];
},
add: function( url, data ) {
data = data || {};
if ( this.getNext() ) {
this.clearForward();
}
if ( data.hash && data.hash.indexOf( "#" ) === -1) {
data.hash = "#" + data.hash;
}
data.url = url;
this.stack.push( data );
this.activeIndex = this.stack.length - 1;
},
clearForward: function() {
this.stack = this.stack.slice( 0, this.activeIndex + 1 );
},
find: function( url, stack, earlyReturn ) {
stack = stack || this.stack;
var entry, i, length = stack.length, index;
for ( i = 0; i < length; i++ ) {
entry = stack[i];
if ( decodeURIComponent(url) === decodeURIComponent(entry.url) ||
decodeURIComponent(url) === decodeURIComponent(entry.hash) ) {
index = i;
if ( earlyReturn ) {
return index;
}
}
}
return index;
},
closest: function( url ) {
var closest, a = this.activeIndex;
closest = this.find( url, this.stack.slice(0, a) );
if ( closest === undefined ) {
closest = this.find( url, this.stack.slice(a), true );
closest = closest === undefined ? closest : closest + a;
}
return closest;
},
direct: function( opts ) {
var newActiveIndex = this.closest( opts.url ), a = this.activeIndex;
if ( newActiveIndex !== undefined ) {
this.activeIndex = newActiveIndex;
this.previousIndex = a;
}
if ( newActiveIndex < a ) {
( opts.present || opts.back || $.noop )( this.getActive(), "back" );
} else if ( newActiveIndex > a ) {
( opts.present || opts.forward || $.noop )( this.getActive(), "forward" );
} else if ( newActiveIndex === undefined && opts.missing ) {
opts.missing( this.getActive() );
}
}
});
})( jQuery );
(function( $, undefined ) {
var path = $.mobile.path,
initialHref = location.href;
$.mobile.Navigator = function( history ) {
this.history = history;
this.ignoreInitialHashChange = true;
$.mobile.window.bind({
"popstate.history": $.proxy( this.popstate, this ),
"hashchange.history": $.proxy( this.hashchange, this )
});
};
$.extend($.mobile.Navigator.prototype, {
squash: function( url, data ) {
var state, href, hash = path.isPath(url) ? path.stripHash(url) : url;
href = path.squash( url );
state = $.extend({
hash: hash,
url: href
}, data);
window.history.replaceState( state, state.title || document.title, href );
return state;
},
hash: function( url, href ) {
var parsed, loc, hash, resolved;
parsed = path.parseUrl( url );
loc = path.parseLocation();
if ( loc.pathname + loc.search === parsed.pathname + parsed.search ) {
hash = parsed.hash ? parsed.hash : parsed.pathname + parsed.search;
} else if ( path.isPath(url) ) {
resolved = path.parseUrl( href );
hash = resolved.pathname + resolved.search + (path.isPreservableHash( resolved.hash )? resolved.hash.replace( "#", "" ) : "");
} else {
hash = url;
}
return hash;
},
go: function( url, data, noEvents ) {
var state, href, hash, popstateEvent,
isPopStateEvent = $.event.special.navigate.isPushStateEnabled();
href = path.squash( url );
hash = this.hash( url, href );
if ( noEvents && hash !== path.stripHash(path.parseLocation().hash) ) {
this.preventNextHashChange = noEvents;
}
this.preventHashAssignPopState = true;
window.location.hash = hash;
this.preventHashAssignPopState = false;
state = $.extend({
url: href,
hash: hash,
title: document.title
}, data);
if ( isPopStateEvent ) {
popstateEvent = new $.Event( "popstate" );
popstateEvent.originalEvent = {
type: "popstate",
state: null
};
this.squash( url, state );
if ( !noEvents ) {
this.ignorePopState = true;
$.mobile.window.trigger( popstateEvent );
}
}
this.history.add( state.url, state );
},
popstate: function( event ) {
var hash, state;
if ( !$.event.special.navigate.isPushStateEnabled() ) {
return;
}
if ( this.preventHashAssignPopState ) {
this.preventHashAssignPopState = false;
event.stopImmediatePropagation();
return;
}
if ( this.ignorePopState ) {
this.ignorePopState = false;
return;
}
if ( !event.originalEvent.state &&
this.history.stack.length === 1 &&
this.ignoreInitialHashChange ) {
this.ignoreInitialHashChange = false;
if ( location.href === initialHref ) {
event.preventDefault();
return;
}
}
hash = path.parseLocation().hash;
if ( !event.originalEvent.state && hash ) {
state = this.squash( hash );
this.history.add( state.url, state );
event.historyState = state;
return;
}
this.history.direct({
url: (event.originalEvent.state || {}).url || hash,
present: function( historyEntry, direction ) {
event.historyState = $.extend({}, historyEntry);
event.historyState.direction = direction;
}
});
},
hashchange: function( event ) {
var history, hash;
if (!$.event.special.navigate.isHashChangeEnabled() ||
$.event.special.navigate.isPushStateEnabled() ) {
return;
}
if ( this.preventNextHashChange ) {
this.preventNextHashChange = false;
event.stopImmediatePropagation();
return;
}
history = this.history;
hash = path.parseLocation().hash;
this.history.direct({
url: hash,
present: function( historyEntry, direction ) {
event.hashchangeState = $.extend({}, historyEntry);
event.hashchangeState.direction = direction;
},
missing: function() {
history.add( hash, {
hash: hash,
title: document.title
});
}
});
}
});
})( jQuery );
(function( $, undefined ) {
$.mobile.navigate = function( url, data, noEvents ) {
$.mobile.navigate.navigator.go( url, data, noEvents );
};
$.mobile.navigate.history = new $.mobile.History();
$.mobile.navigate.navigator = new $.mobile.Navigator( $.mobile.navigate.history );
var loc = $.mobile.path.parseLocation();
$.mobile.navigate.history.add( loc.href, {hash: loc.hash} );
})( jQuery );
(function( $, undefined ) {
var props = {
"animation": {},
"transition": {}
},
testElement = document.createElement( "a" ),
vendorPrefixes = [ "", "webkit-", "moz-", "o-" ];
$.each( [ "animation", "transition" ], function( i, test ) {
var testName = ( i === 0 ) ? test + "-" + "name" : test;
$.each( vendorPrefixes, function( j, prefix ) {
if ( testElement.style[ $.camelCase( prefix + testName ) ] !== undefined ) {
props[ test ][ "prefix" ] = prefix;
return false;
}
});
props[ test ][ "duration" ] =
$.camelCase( props[ test ][ "prefix" ] + test + "-" + "duration" );
props[ test ][ "event" ] =
$.camelCase( props[ test ][ "prefix" ] + test + "-" + "end" );
if ( props[ test ][ "prefix" ] === "" ) {
props[ test ][ "event" ] = props[ test ][ "event" ].toLowerCase();
}
});
$.support.cssTransitions = ( props[ "transition" ][ "prefix" ] !== undefined );
$.support.cssAnimations = ( props[ "animation" ][ "prefix" ] !== undefined );
$( testElement ).remove();
$.fn.animationComplete = function( callback, type, fallbackTime ) {
var timer, duration,
that = this,
eventBinding = function() {
clearTimeout( timer );
callback.apply( this, arguments );
},
animationType = ( !type || type === "animation" ) ? "animation" : "transition";
if ( ( $.support.cssTransitions && animationType === "transition" ) ||
( $.support.cssAnimations && animationType === "animation" ) ) {
if ( fallbackTime === undefined ) {
if ( $( this ).context !== document ) {
duration = parseFloat(
$( this ).css( props[ animationType ].duration )
) * 3000;
}
if ( duration === 0 || duration === undefined || isNaN( duration ) ) {
duration = $.fn.animationComplete.defaultDuration;
}
}
timer = setTimeout( function() {
$( that ).off( props[ animationType ].event, eventBinding );
callback.apply( that );
}, duration );
return $( this ).one( props[ animationType ].event, eventBinding );
} else {
setTimeout( $.proxy( callback, this ), 0 );
return $( this );
}
};
$.fn.animationComplete.defaultDuration = 1000;
})( jQuery );
(function( $, window, document, undefined ) {
var dataPropertyName = "virtualMouseBindings",
touchTargetPropertyName = "virtualTouchID",
virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
mouseEventProps = $.event.props.concat( mouseHookProps ),
activeDocHandlers = {},
resetTimerID = 0,
startX = 0,
startY = 0,
didScroll = false,
clickBlockList = [],
blockMouseTriggers = false,
blockTouchTriggers = false,
eventCaptureSupported = "addEventListener" in document,
$document = $( document ),
nextTouchID = 1,
lastTouchID = 0, threshold,
i;
$.vmouse = {
moveDistanceThreshold: 10,
clickDistanceThreshold: 10,
resetTimerDuration: 1500
};
function getNativeEvent( event ) {
while ( event && typeof event.originalEvent !== "undefined" ) {
event = event.originalEvent;
}
return event;
}
function createVirtualEvent( event, eventType ) {
var t = event.type,
oe, props, ne, prop, ct, touch, i, j, len;
event = $.Event( event );
event.type = eventType;
oe = event.originalEvent;
props = $.event.props;
if ( t.search( /^(mouse|click)/ ) > -1 ) {
props = mouseEventProps;
}
if ( oe ) {
for ( i = props.length, prop; i; ) {
prop = props[ --i ];
event[ prop ] = oe[ prop ];
}
}
if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
event.which = 1;
}
if ( t.search(/^touch/) !== -1 ) {
ne = getNativeEvent( oe );
t = ne.touches;
ct = ne.changedTouches;
touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );
if ( touch ) {
for ( j = 0, len = touchEventProps.length; j < len; j++) {
prop = touchEventProps[ j ];
event[ prop ] = touch[ prop ];
}
}
}
return event;
}
function getVirtualBindingFlags( element ) {
var flags = {},
b, k;
while ( element ) {
b = $.data( element, dataPropertyName );
for ( k in b ) {
if ( b[ k ] ) {
flags[ k ] = flags.hasVirtualBinding = true;
}
}
element = element.parentNode;
}
return flags;
}
function getClosestElementWithVirtualBinding( element, eventType ) {
var b;
while ( element ) {
b = $.data( element, dataPropertyName );
if ( b && ( !eventType || b[ eventType ] ) ) {
return element;
}
element = element.parentNode;
}
return null;
}
function enableTouchBindings() {
blockTouchTriggers = false;
}
function disableTouchBindings() {
blockTouchTriggers = true;
}
function enableMouseBindings() {
lastTouchID = 0;
clickBlockList.length = 0;
blockMouseTriggers = false;
disableTouchBindings();
}
function disableMouseBindings() {
enableTouchBindings();
}
function startResetTimer() {
clearResetTimer();
resetTimerID = setTimeout( function() {
resetTimerID = 0;
enableMouseBindings();
}, $.vmouse.resetTimerDuration );
}
function clearResetTimer() {
if ( resetTimerID ) {
clearTimeout( resetTimerID );
resetTimerID = 0;
}
}
function triggerVirtualEvent( eventType, event, flags ) {
var ve;
if ( ( flags && flags[ eventType ] ) ||
( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {
ve = createVirtualEvent( event, eventType );
$( event.target).trigger( ve );
}
return ve;
}
function mouseEventCallback( event ) {
var touchID = $.data( event.target, touchTargetPropertyName ),
ve;
if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
ve = triggerVirtualEvent( "v" + event.type, event );
if ( ve ) {
if ( ve.isDefaultPrevented() ) {
event.preventDefault();
}
if ( ve.isPropagationStopped() ) {
event.stopPropagation();
}
if ( ve.isImmediatePropagationStopped() ) {
event.stopImmediatePropagation();
}
}
}
}
function handleTouchStart( event ) {
var touches = getNativeEvent( event ).touches,
target, flags, t;
if ( touches && touches.length === 1 ) {
target = event.target;
flags = getVirtualBindingFlags( target );
if ( flags.hasVirtualBinding ) {
lastTouchID = nextTouchID++;
$.data( target, touchTargetPropertyName, lastTouchID );
clearResetTimer();
disableMouseBindings();
didScroll = false;
t = getNativeEvent( event ).touches[ 0 ];
startX = t.pageX;
startY = t.pageY;
triggerVirtualEvent( "vmouseover", event, flags );
triggerVirtualEvent( "vmousedown", event, flags );
}
}
}
function handleScroll( event ) {
if ( blockTouchTriggers ) {
return;
}
if ( !didScroll ) {
triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
}
didScroll = true;
startResetTimer();
}
function handleTouchMove( event ) {
if ( blockTouchTriggers ) {
return;
}
var t = getNativeEvent( event ).touches[ 0 ],
didCancel = didScroll,
moveThreshold = $.vmouse.moveDistanceThreshold,
flags = getVirtualBindingFlags( event.target );
didScroll = didScroll ||
( Math.abs( t.pageX - startX ) > moveThreshold ||
Math.abs( t.pageY - startY ) > moveThreshold );
if ( didScroll && !didCancel ) {
triggerVirtualEvent( "vmousecancel", event, flags );
}
triggerVirtualEvent( "vmousemove", event, flags );
startResetTimer();
}
function handleTouchEnd( event ) {
if ( blockTouchTriggers ) {
return;
}
disableTouchBindings();
var flags = getVirtualBindingFlags( event.target ),
ve, t;
triggerVirtualEvent( "vmouseup", event, flags );
if ( !didScroll ) {
ve = triggerVirtualEvent( "vclick", event, flags );
if ( ve && ve.isDefaultPrevented() ) {
t = getNativeEvent( event ).changedTouches[ 0 ];
clickBlockList.push({
touchID: lastTouchID,
x: t.clientX,
y: t.clientY
});
blockMouseTriggers = true;
}
}
triggerVirtualEvent( "vmouseout", event, flags);
didScroll = false;
startResetTimer();
}
function hasVirtualBindings( ele ) {
var bindings = $.data( ele, dataPropertyName ),
k;
if ( bindings ) {
for ( k in bindings ) {
if ( bindings[ k ] ) {
return true;
}
}
}
return false;
}
function dummyMouseHandler() {}
function getSpecialEventObject( eventType ) {
var realType = eventType.substr( 1 );
return {
setup: function(/* data, namespace */) {
if ( !hasVirtualBindings( this ) ) {
$.data( this, dataPropertyName, {} );
}
var bindings = $.data( this, dataPropertyName );
bindings[ eventType ] = true;
activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;
if ( activeDocHandlers[ eventType ] === 1 ) {
$document.bind( realType, mouseEventCallback );
}
$( this ).bind( realType, dummyMouseHandler );
if ( eventCaptureSupported ) {
activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;
if ( activeDocHandlers[ "touchstart" ] === 1 ) {
$document.bind( "touchstart", handleTouchStart )
.bind( "touchend", handleTouchEnd )
.bind( "touchmove", handleTouchMove )
.bind( "scroll", handleScroll );
}
}
},
teardown: function(/* data, namespace */) {
--activeDocHandlers[ eventType ];
if ( !activeDocHandlers[ eventType ] ) {
$document.unbind( realType, mouseEventCallback );
}
if ( eventCaptureSupported ) {
--activeDocHandlers[ "touchstart" ];
if ( !activeDocHandlers[ "touchstart" ] ) {
$document.unbind( "touchstart", handleTouchStart )
.unbind( "touchmove", handleTouchMove )
.unbind( "touchend", handleTouchEnd )
.unbind( "scroll", handleScroll );
}
}
var $this = $( this ),
bindings = $.data( this, dataPropertyName );
if ( bindings ) {
bindings[ eventType ] = false;
}
$this.unbind( realType, dummyMouseHandler );
if ( !hasVirtualBindings( this ) ) {
$this.removeData( dataPropertyName );
}
}
};
}
for ( i = 0; i < virtualEventNames.length; i++ ) {
$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}
if ( eventCaptureSupported ) {
document.addEventListener( "click", function( e ) {
var cnt = clickBlockList.length,
target = e.target,
x, y, ele, i, o, touchID;
if ( cnt ) {
x = e.clientX;
y = e.clientY;
threshold = $.vmouse.clickDistanceThreshold;
ele = target;
while ( ele ) {
for ( i = 0; i < cnt; i++ ) {
o = clickBlockList[ i ];
touchID = 0;
if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
$.data( ele, touchTargetPropertyName ) === o.touchID ) {
e.preventDefault();
e.stopPropagation();
return;
}
}
ele = ele.parentNode;
}
}
}, true);
}
})( jQuery, window, document );
(function( $, window, undefined ) {
var $document = $( document ),
supportTouch = $.mobile.support.touch,
scrollEvent = "touchmove scroll",
touchStartEvent = supportTouch ? "touchstart" : "mousedown",
touchStopEvent = supportTouch ? "touchend" : "mouseup",
touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
$.each( ( "touchstart touchmove touchend " +
"tap taphold " +
"swipe swipeleft swiperight " +
"scrollstart scrollstop" ).split( " " ), function( i, name ) {
$.fn[ name ] = function( fn ) {
return fn ? this.bind( name, fn ) : this.trigger( name );
};
if ( $.attrFn ) {
$.attrFn[ name ] = true;
}
});
function triggerCustomEvent( obj, eventType, event, bubble ) {
var originalType = event.type;
event.type = eventType;
if ( bubble ) {
$.event.trigger( event, undefined, obj );
} else {
$.event.dispatch.call( obj, event );
}
event.type = originalType;
}
$.event.special.scrollstart = {
enabled: true,
setup: function() {
var thisObject = this,
$this = $( thisObject ),
scrolling,
timer;
function trigger( event, state ) {
scrolling = state;
triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
}
$this.bind( scrollEvent, function( event ) {
if ( !$.event.special.scrollstart.enabled ) {
return;
}
if ( !scrolling ) {
trigger( event, true );
}
clearTimeout( timer );
timer = setTimeout( function() {
trigger( event, false );
}, 50 );
});
},
teardown: function() {
$( this ).unbind( scrollEvent );
}
};
$.event.special.tap = {
tapholdThreshold: 750,
emitTapOnTaphold: true,
setup: function() {
var thisObject = this,
$this = $( thisObject ),
isTaphold = false;
$this.bind( "vmousedown", function( event ) {
isTaphold = false;
if ( event.which && event.which !== 1 ) {
return false;
}
var origTarget = event.target,
timer;
function clearTapTimer() {
clearTimeout( timer );
}
function clearTapHandlers() {
clearTapTimer();
$this.unbind( "vclick", clickHandler )
.unbind( "vmouseup", clearTapTimer );
$document.unbind( "vmousecancel", clearTapHandlers );
}
function clickHandler( event ) {
clearTapHandlers();
if ( !isTaphold && origTarget === event.target ) {
triggerCustomEvent( thisObject, "tap", event );
} else if ( isTaphold ) {
event.preventDefault();
}
}
$this.bind( "vmouseup", clearTapTimer )
.bind( "vclick", clickHandler );
$document.bind( "vmousecancel", clearTapHandlers );
timer = setTimeout( function() {
if ( !$.event.special.tap.emitTapOnTaphold ) {
isTaphold = true;
}
triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
}, $.event.special.tap.tapholdThreshold );
});
},
teardown: function() {
$( this ).unbind( "vmousedown" ).unbind( "vclick" ).unbind( "vmouseup" );
$document.unbind( "vmousecancel" );
}
};
$.event.special.swipe = {
scrollSupressionThreshold: 30,
durationThreshold: 1000,
horizontalDistanceThreshold: 30,
verticalDistanceThreshold: 30,
getLocation: function ( event ) {
var winPageX = window.pageXOffset,
winPageY = window.pageYOffset,
x = event.clientX,
y = event.clientY;
if ( event.pageY === 0 && Math.floor( y ) > Math.floor( event.pageY ) ||
event.pageX === 0 && Math.floor( x ) > Math.floor( event.pageX ) ) {
x = x - winPageX;
y = y - winPageY;
} else if ( y < ( event.pageY - winPageY) || x < ( event.pageX - winPageX ) ) {
x = event.pageX - winPageX;
y = event.pageY - winPageY;
}
return {
x: x,
y: y
};
},
start: function( event ) {
var data = event.originalEvent.touches ?
event.originalEvent.touches[ 0 ] : event,
location = $.event.special.swipe.getLocation( data );
return {
time: ( new Date() ).getTime(),
coords: [ location.x, location.y ],
origin: $( event.target )
};
},
stop: function( event ) {
var data = event.originalEvent.touches ?
event.originalEvent.touches[ 0 ] : event,
location = $.event.special.swipe.getLocation( data );
return {
time: ( new Date() ).getTime(),
coords: [ location.x, location.y ]
};
},
handleSwipe: function( start, stop, thisObject, origTarget ) {
if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
var direction = start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight";
triggerCustomEvent( thisObject, "swipe", $.Event( "swipe", { target: origTarget, swipestart: start, swipestop: stop }), true );
triggerCustomEvent( thisObject, direction,$.Event( direction, { target: origTarget, swipestart: start, swipestop: stop } ), true );
return true;
}
return false;
},
eventInProgress: false,
setup: function() {
var events,
thisObject = this,
$this = $( thisObject ),
context = {};
events = $.data( this, "mobile-events" );
if ( !events ) {
events = { length: 0 };
$.data( this, "mobile-events", events );
}
events.length++;
events.swipe = context;
context.start = function( event ) {
if ( $.event.special.swipe.eventInProgress ) {
return;
}
$.event.special.swipe.eventInProgress = true;
var stop,
start = $.event.special.swipe.start( event ),
origTarget = event.target,
emitted = false;
context.move = function( event ) {
if ( !start || event.isDefaultPrevented() ) {
return;
}
stop = $.event.special.swipe.stop( event );
if ( !emitted ) {
emitted = $.event.special.swipe.handleSwipe( start, stop, thisObject, origTarget );
if ( emitted ) {
$.event.special.swipe.eventInProgress = false;
}
}
if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
event.preventDefault();
}
};
context.stop = function() {
emitted = true;
$.event.special.swipe.eventInProgress = false;
$document.off( touchMoveEvent, context.move );
context.move = null;
};
$document.on( touchMoveEvent, context.move )
.one( touchStopEvent, context.stop );
};
$this.on( touchStartEvent, context.start );
},
teardown: function() {
var events, context;
events = $.data( this, "mobile-events" );
if ( events ) {
context = events.swipe;
delete events.swipe;
events.length--;
if ( events.length === 0 ) {
$.removeData( this, "mobile-events" );
}
}
if ( context ) {
if ( context.start ) {
$( this ).off( touchStartEvent, context.start );
}
if ( context.move ) {
$document.off( touchMoveEvent, context.move );
}
if ( context.stop ) {
$document.off( touchStopEvent, context.stop );
}
}
}
};
$.each({
scrollstop: "scrollstart",
taphold: "tap",
swipeleft: "swipe.left",
swiperight: "swipe.right"
}, function( event, sourceEvent ) {
$.event.special[ event ] = {
setup: function() {
$( this ).bind( sourceEvent, $.noop );
},
teardown: function() {
$( this ).unbind( sourceEvent );
}
};
});
})( jQuery, this );
(function( $ ) {
$.event.special.throttledresize = {
setup: function() {
$( this ).bind( "resize", handler );
},
teardown: function() {
$( this ).unbind( "resize", handler );
}
};
var throttle = 250,
handler = function() {
curr = ( new Date() ).getTime();
diff = curr - lastCall;
if ( diff >= throttle ) {
lastCall = curr;
$( this ).trigger( "throttledresize" );
} else {
if ( heldCall ) {
clearTimeout( heldCall );
}
heldCall = setTimeout( handler, throttle - diff );
}
},
lastCall = 0,
heldCall,
curr,
diff;
})( jQuery );
(function( $, window ) {
var win = $( window ),
event_name = "orientationchange",
get_orientation,
last_orientation,
initial_orientation_is_landscape,
initial_orientation_is_default,
portrait_map = { "0": true, "180": true },
ww, wh, landscape_threshold;
if ( $.support.orientation ) {
ww = window.innerWidth || win.width();
wh = window.innerHeight || win.height();
landscape_threshold = 50;
initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;
initial_orientation_is_default = portrait_map[ window.orientation ];
if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
portrait_map = { "-90": true, "90": true };
}
}
$.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
setup: function() {
if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
return false;
}
last_orientation = get_orientation();
win.bind( "throttledresize", handler );
},
teardown: function() {
if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
return false;
}
win.unbind( "throttledresize", handler );
},
add: function( handleObj ) {
var old_handler = handleObj.handler;
handleObj.handler = function( event ) {
event.orientation = get_orientation();
return old_handler.apply( this, arguments );
};
}
});
function handler() {
var orientation = get_orientation();
if ( orientation !== last_orientation ) {
last_orientation = orientation;
win.trigger( event_name );
}
}
$.event.special.orientationchange.orientation = get_orientation = function() {
var isPortrait = true, elem = document.documentElement;
if ( $.support.orientation ) {
isPortrait = portrait_map[ window.orientation ];
} else {
isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
}
return isPortrait ? "portrait" : "landscape";
};
$.fn[ event_name ] = function( fn ) {
return fn ? this.bind( event_name, fn ) : this.trigger( event_name );
};
if ( $.attrFn ) {
$.attrFn[ event_name ] = true;
}
}( jQuery, this ));
(function( $, undefined ) {
var baseElement = $( "head" ).children( "base" ),
base = {
element: ( baseElement.length ? baseElement :
$( "<base>", { href: $.mobile.path.documentBase.hrefNoHash } ).prependTo( $( "head" ) ) ),
linkSelector: "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]",
set: function( href ) {
if ( !$.mobile.dynamicBaseEnabled ) {
return;
}
if ( $.support.dynamicBaseTag ) {
base.element.attr( "href",
$.mobile.path.makeUrlAbsolute( href, $.mobile.path.documentBase ) );
}
},
rewrite: function( href, page ) {
var newPath = $.mobile.path.get( href );
page.find( base.linkSelector ).each(function( i, link ) {
var thisAttr = $( link ).is( "[href]" ) ? "href" :
$( link ).is( "[src]" ) ? "src" : "action",
theLocation = $.mobile.path.parseLocation(),
thisUrl = $( link ).attr( thisAttr );
thisUrl = thisUrl.replace( theLocation.protocol + theLocation.doubleSlash +
theLocation.host + theLocation.pathname, "" );
if ( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
$( link ).attr( thisAttr, newPath + thisUrl );
}
});
},
reset: function(/* href */) {
base.element.attr( "href", $.mobile.path.documentBase.hrefNoSearch );
}
};
$.mobile.base = base;
})( jQuery );
(function( $, undefined ) {
$.mobile.widgets = {};
var originalWidget = $.widget,
keepNativeFactoryDefault = $.mobile.keepNative;
$.widget = (function( orig ) {
return function() {
var constructor = orig.apply( this, arguments ),
name = constructor.prototype.widgetName;
constructor.initSelector = ( ( constructor.prototype.initSelector !== undefined ) ?
constructor.prototype.initSelector : ":jqmData(role='" + name + "')" );
$.mobile.widgets[ name ] = constructor;
return constructor;
};
})( $.widget );
$.extend( $.widget, originalWidget );
$.mobile.document.on( "create", function( event ) {
$( event.target ).enhanceWithin();
});
$.widget( "mobile.page", {
options: {
theme: "a",
domCache: false,
keepNativeDefault: $.mobile.keepNative,
contentTheme: null,
enhanced: false
},
_createWidget: function() {
$.Widget.prototype._createWidget.apply( this, arguments );
this._trigger( "init" );
},
_create: function() {
if ( this._trigger( "beforecreate" ) === false ) {
return false;
}
if ( !this.options.enhanced ) {
this._enhance();
}
this._on( this.element, {
pagebeforehide: "removeContainerBackground",
pagebeforeshow: "_handlePageBeforeShow"
});
this.element.enhanceWithin();
if ( $.mobile.getAttribute( this.element[0], "role" ) === "dialog" && $.mobile.dialog ) {
this.element.dialog();
}
},
_enhance: function () {
var attrPrefix = "data-" + $.mobile.ns,
self = this;
if ( this.options.role ) {
this.element.attr( "data-" + $.mobile.ns + "role", this.options.role );
}
this.element
.attr( "tabindex", "0" )
.addClass( "ui-page ui-page-theme-" + this.options.theme );
this.element.find( "[" + attrPrefix + "role='content']" ).each( function() {
var $this = $( this ),
theme = this.getAttribute( attrPrefix + "theme" ) || undefined;
self.options.contentTheme = theme || self.options.contentTheme || ( self.options.dialog && self.options.theme ) || ( self.element.jqmData("role") === "dialog" && self.options.theme );
$this.addClass( "ui-content" );
if ( self.options.contentTheme ) {
$this.addClass( "ui-body-" + ( self.options.contentTheme ) );
}
$this.attr( "role", "main" ).addClass( "ui-content" );
});
},
bindRemove: function( callback ) {
var page = this.element;
if ( !page.data( "mobile-page" ).options.domCache &&
page.is( ":jqmData(external-page='true')" ) ) {
page.bind( "pagehide.remove", callback || function( e, data ) {
if( !data.samePage ){
var $this = $( this ),
prEvent = new $.Event( "pageremove" );
$this.trigger( prEvent );
if ( !prEvent.isDefaultPrevented() ) {
$this.removeWithDependents();
}
}
});
}
},
_setOptions: function( o ) {
if ( o.theme !== undefined ) {
this.element.removeClass( "ui-page-theme-" + this.options.theme ).addClass( "ui-page-theme-" + o.theme );
}
if ( o.contentTheme !== undefined ) {
this.element.find( "[data-" + $.mobile.ns + "='content']" ).removeClass( "ui-body-" + this.options.contentTheme )
.addClass( "ui-body-" + o.contentTheme );
}
},
_handlePageBeforeShow: function(/* e */) {
this.setContainerBackground();
},
removeContainerBackground: function() {
this.element.closest( ":mobile-pagecontainer" ).pagecontainer({ "theme": "none" });
},
setContainerBackground: function( theme ) {
this.element.parent().pagecontainer( { "theme": theme || this.options.theme } );
},
keepNativeSelector: function() {
var options = this.options,
keepNative = $.trim( options.keepNative || "" ),
globalValue = $.trim( $.mobile.keepNative ),
optionValue = $.trim( options.keepNativeDefault ),
newDefault = ( keepNativeFactoryDefault === globalValue ?
"" : globalValue ),
oldDefault = ( newDefault === "" ? optionValue : "" );
return ( ( keepNative ? [ keepNative ] : [] )
.concat( newDefault ? [ newDefault ] : [] )
.concat( oldDefault ? [ oldDefault ] : [] )
.join( ", " ) );
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.pagecontainer", {
options: {
theme: "a"
},
initSelector: false,
_create: function() {
this._trigger( "beforecreate" );
this.setLastScrollEnabled = true;
this._on( this.window, {
navigate: "_disableRecordScroll",
scrollstop: "_delayedRecordScroll"
});
this._on( this.window, { navigate: "_filterNavigateEvents" });
this._on({ pagechange: "_afterContentChange" });
this.window.one( "navigate", $.proxy(function() {
this.setLastScrollEnabled = true;
}, this));
},
_setOptions: function( options ) {
if ( options.theme !== undefined && options.theme !== "none" ) {
this.element.removeClass( "ui-overlay-" + this.options.theme )
.addClass( "ui-overlay-" + options.theme );
} else if ( options.theme !== undefined ) {
this.element.removeClass( "ui-overlay-" + this.options.theme );
}
this._super( options );
},
_disableRecordScroll: function() {
this.setLastScrollEnabled = false;
},
_enableRecordScroll: function() {
this.setLastScrollEnabled = true;
},
_afterContentChange: function() {
this.setLastScrollEnabled = true;
this._off( this.window, "scrollstop" );
this._on( this.window, { scrollstop: "_delayedRecordScroll" });
},
_recordScroll: function() {
if ( !this.setLastScrollEnabled ) {
return;
}
var active = this._getActiveHistory(),
currentScroll, minScroll, defaultScroll;
if ( active ) {
currentScroll = this._getScroll();
minScroll = this._getMinScroll();
defaultScroll = this._getDefaultScroll();
active.lastScroll = currentScroll < minScroll ? defaultScroll : currentScroll;
}
},
_delayedRecordScroll: function() {
setTimeout( $.proxy(this, "_recordScroll"), 100 );
},
_getScroll: function() {
return this.window.scrollTop();
},
_getMinScroll: function() {
return $.mobile.minScrollBack;
},
_getDefaultScroll: function() {
return $.mobile.defaultHomeScroll;
},
_filterNavigateEvents: function( e, data ) {
var url;
if ( e.originalEvent && e.originalEvent.isDefaultPrevented() ) {
return;
}
url = e.originalEvent.type.indexOf( "hashchange" ) > -1 ? data.state.hash : data.state.url;
if ( !url ) {
url = this._getHash();
}
if ( !url || url === "#" || url.indexOf( "#" + $.mobile.path.uiStateKey ) === 0 ) {
url = location.href;
}
this._handleNavigate( url, data.state );
},
_getHash: function() {
return $.mobile.path.parseLocation().hash;
},
getActivePage: function() {
return this.activePage;
},
_getInitialContent: function() {
return $.mobile.firstPage;
},
_getHistory: function() {
return $.mobile.navigate.history;
},
_getActiveHistory: function() {
return this._getHistory().getActive();
},
_getDocumentBase: function() {
return $.mobile.path.documentBase;
},
back: function() {
this.go( -1 );
},
forward: function() {
this.go( 1 );
},
go: function( steps ) {
if ( $.mobile.hashListeningEnabled ) {
window.history.go( steps );
} else {
var activeIndex = $.mobile.navigate.history.activeIndex,
index = activeIndex + parseInt( steps, 10 ),
url = $.mobile.navigate.history.stack[ index ].url,
direction = ( steps >= 1 )? "forward" : "back";
$.mobile.navigate.history.activeIndex = index;
$.mobile.navigate.history.previousIndex = activeIndex;
this.change( url, { direction: direction, changeHash: false, fromHashChange: true } );
}
},
_handleDestination: function( to ) {
var history;
if ( $.type(to) === "string" ) {
to = $.mobile.path.stripHash( to );
}
if ( to ) {
history = this._getHistory();
to = !$.mobile.path.isPath( to ) ? ( $.mobile.path.makeUrlAbsolute( "#" + to, this._getDocumentBase() ) ) : to;
}
return to || this._getInitialContent();
},
_transitionFromHistory: function( direction, defaultTransition ) {
var history = this._getHistory(),
entry = ( direction === "back" ? history.getLast() : history.getActive() );
return ( entry && entry.transition ) || defaultTransition;
},
_handleDialog: function( changePageOptions, data ) {
var to, active, activeContent = this.getActivePage();
if ( activeContent && !activeContent.data( "mobile-dialog" ) ) {
if ( data.direction === "back" ) {
this.back();
} else {
this.forward();
}
return false;
} else {
to = data.pageUrl;
active = this._getActiveHistory();
$.extend( changePageOptions, {
role: active.role,
transition: this._transitionFromHistory(
data.direction,
changePageOptions.transition ),
reverse: data.direction === "back"
});
}
return to;
},
_handleNavigate: function( url, data ) {
var to = $.mobile.path.stripHash( url ), history = this._getHistory(),
transition = history.stack.length === 0 ? "none" :
this._transitionFromHistory( data.direction ),
changePageOptions = {
changeHash: false,
fromHashChange: true,
reverse: data.direction === "back"
};
$.extend( changePageOptions, data, {
transition: transition
});
if ( history.activeIndex > 0 &&
to.indexOf( $.mobile.dialogHashKey ) > -1 ) {
to = this._handleDialog( changePageOptions, data );
if ( to === false ) {
return;
}
}
this._changeContent( this._handleDestination( to ), changePageOptions );
},
_changeContent: function( to, opts ) {
$.mobile.changePage( to, opts );
},
_getBase: function() {
return $.mobile.base;
},
_getNs: function() {
return $.mobile.ns;
},
_enhance: function( content, role ) {
return content.page({ role: role });
},
_include: function( page, settings ) {
page.appendTo( this.element );
this._enhance( page, settings.role );
page.page( "bindRemove" );
},
_find: function( absUrl ) {
var fileUrl = this._createFileUrl( absUrl ),
dataUrl = this._createDataUrl( absUrl ),
page, initialContent = this._getInitialContent();
page = this.element
.children( "[data-" + this._getNs() +
"url='" + $.mobile.path.hashToSelector( dataUrl ) + "']" );
if ( page.length === 0 && dataUrl && !$.mobile.path.isPath( dataUrl ) ) {
page = this.element.children( $.mobile.path.hashToSelector("#" + dataUrl) )
.attr( "data-" + this._getNs() + "url", dataUrl )
.jqmData( "url", dataUrl );
}
if ( page.length === 0 &&
$.mobile.path.isFirstPageUrl( fileUrl ) &&
initialContent &&
initialContent.parent().length ) {
page = $( initialContent );
}
return page;
},
_getLoader: function() {
return $.mobile.loading();
},
_showLoading: function( delay, theme, msg, textonly ) {
if ( this._loadMsg ) {
return;
}
this._loadMsg = setTimeout($.proxy(function() {
this._getLoader().loader( "show", theme, msg, textonly );
this._loadMsg = 0;
}, this), delay );
},
_hideLoading: function() {
clearTimeout( this._loadMsg );
this._loadMsg = 0;
this._getLoader().loader( "hide" );
},
_showError: function() {
this._hideLoading();
this._showLoading( 0, $.mobile.pageLoadErrorMessageTheme, $.mobile.pageLoadErrorMessage, true );
setTimeout( $.proxy(this, "_hideLoading"), 1500 );
},
_parse: function( html, fileUrl ) {
var page, all = $( "<div></div>" );
all.get( 0 ).innerHTML = html;
page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();
if ( !page.length ) {
page = $( "<div data-" + this._getNs() + "role='page'>" +
( html.split( /<\/?body[^>]*>/gmi )[1] || "" ) +
"</div>" );
}
page.attr( "data-" + this._getNs() + "url", this._createDataUrl( fileUrl ) )
.attr( "data-" + this._getNs() + "external-page", true );
return page;
},
_setLoadedTitle: function( page, html ) {
var newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1;
if ( newPageTitle && !page.jqmData("title") ) {
newPageTitle = $( "<div>" + newPageTitle + "</div>" ).text();
page.jqmData( "title", newPageTitle );
}
},
_isRewritableBaseTag: function() {
return $.mobile.dynamicBaseEnabled && !$.support.dynamicBaseTag;
},
_createDataUrl: function( absoluteUrl ) {
return $.mobile.path.convertUrlToDataUrl( absoluteUrl );
},
_createFileUrl: function( absoluteUrl ) {
return $.mobile.path.getFilePath( absoluteUrl );
},
_triggerWithDeprecated: function( name, data, page ) {
var deprecatedEvent = $.Event( "page" + name ),
newEvent = $.Event( this.widgetName + name );
( page || this.element ).trigger( deprecatedEvent, data );
this._trigger( name, newEvent, data );
return {
deprecatedEvent: deprecatedEvent,
event: newEvent
};
},
_loadSuccess: function( absUrl, triggerData, settings, deferred ) {
var fileUrl = this._createFileUrl( absUrl );
return $.proxy(function( html, textStatus, xhr ) {
if ( !/^text\/html\b/.test( xhr.getResponseHeader('Content-Type') ) ) {
if ( settings.showLoadMsg ) {
this._showError();
}
return;
}
var content,
pageElemRegex = new RegExp( "(<[^>]+\\bdata-" + this._getNs() + "role=[\"']?page[\"']?[^>]*>)" ),
dataUrlRegex = new RegExp( "\\bdata-" + this._getNs() + "url=[\"']?([^\"'>]*)[\"']?" );
if ( pageElemRegex.test( html ) &&
RegExp.$1 &&
dataUrlRegex.test( RegExp.$1 ) &&
RegExp.$1 ) {
fileUrl = $.mobile.path.getFilePath( $("<div>" + RegExp.$1 + "</div>").text() );
fileUrl = this.window[ 0 ].encodeURIComponent( fileUrl );
}
if ( settings.prefetch === undefined ) {
this._getBase().set( fileUrl );
}
content = this._parse( html, fileUrl );
this._setLoadedTitle( content, html );
triggerData.xhr = xhr;
triggerData.textStatus = textStatus;
triggerData.page = content;
triggerData.content = content;
triggerData.toPage = content;
if ( this._triggerWithDeprecated( "load", triggerData ).event.isDefaultPrevented() ) {
return;
}
if ( this._isRewritableBaseTag() && content ) {
this._getBase().rewrite( fileUrl, content );
}
this._include( content, settings );
if ( settings.showLoadMsg ) {
this._hideLoading();
}
deferred.resolve( absUrl, settings, content );
}, this);
},
_loadDefaults: {
type: "get",
data: undefined,
reloadPage: false,
reload: false,
role: undefined,
showLoadMsg: false,
loadMsgDelay: 50
},
load: function( url, options ) {
var deferred = ( options && options.deferred ) || $.Deferred(),
reloadOptionExtension =
( ( options && options.reload === undefined &&
options.reloadPage !== undefined ) ?
{ reload: options.reloadPage } : {} ),
settings = $.extend( {}, this._loadDefaults, options, reloadOptionExtension ),
content = null,
absUrl = $.mobile.path.makeUrlAbsolute( url, this._findBaseWithDefault() ),
fileUrl, dataUrl, pblEvent, triggerData;
if ( settings.data && settings.type === "get" ) {
absUrl = $.mobile.path.addSearchParams( absUrl, settings.data );
settings.data = undefined;
}
if ( settings.data && settings.type === "post" ) {
settings.reload = true;
}
fileUrl = this._createFileUrl( absUrl );
dataUrl = this._createDataUrl( absUrl );
content = this._find( absUrl );
if ( content.length === 0 &&
$.mobile.path.isEmbeddedPage(fileUrl) &&
!$.mobile.path.isFirstPageUrl(fileUrl) ) {
deferred.reject( absUrl, settings );
return deferred.promise();
}
this._getBase().reset();
if ( content.length && !settings.reload ) {
this._enhance( content, settings.role );
deferred.resolve( absUrl, settings, content );
if ( !settings.prefetch ) {
this._getBase().set(url);
}
return deferred.promise();
}
triggerData = {
url: url,
absUrl: absUrl,
toPage: url,
prevPage: options ? options.fromPage : undefined,
dataUrl: dataUrl,
deferred: deferred,
options: settings
};
pblEvent = this._triggerWithDeprecated( "beforeload", triggerData );
if ( pblEvent.deprecatedEvent.isDefaultPrevented() ||
pblEvent.event.isDefaultPrevented() ) {
return deferred.promise();
}
if ( settings.showLoadMsg ) {
this._showLoading( settings.loadMsgDelay );
}
if ( settings.prefetch === undefined ) {
this._getBase().reset();
}
if ( !( $.mobile.allowCrossDomainPages ||
$.mobile.path.isSameDomain($.mobile.path.documentUrl, absUrl ) ) ) {
deferred.reject( absUrl, settings );
return deferred.promise();
}
$.ajax({
url: fileUrl,
type: settings.type,
data: settings.data,
contentType: settings.contentType,
dataType: "html",
success: this._loadSuccess( absUrl, triggerData, settings, deferred ),
error: this._loadError( absUrl, triggerData, settings, deferred )
});
return deferred.promise();
},
_loadError: function( absUrl, triggerData, settings, deferred ) {
return $.proxy(function( xhr, textStatus, errorThrown ) {
this._getBase().set( $.mobile.path.get() );
triggerData.xhr = xhr;
triggerData.textStatus = textStatus;
triggerData.errorThrown = errorThrown;
var plfEvent = this._triggerWithDeprecated( "loadfailed", triggerData );
if ( plfEvent.deprecatedEvent.isDefaultPrevented() ||
plfEvent.event.isDefaultPrevented() ) {
return;
}
if ( settings.showLoadMsg ) {
this._showError();
}
deferred.reject( absUrl, settings );
}, this);
},
_getTransitionHandler: function( transition ) {
transition = $.mobile._maybeDegradeTransition( transition );
return $.mobile.transitionHandlers[ transition ] || $.mobile.defaultTransitionHandler;
},
_triggerCssTransitionEvents: function( to, from, prefix ) {
var samePage = false;
prefix = prefix || "";
if ( from ) {
if( to[0] === from[0] ){
samePage = true;
}
this._triggerWithDeprecated( prefix + "hide", {
nextPage: to,
toPage: to,
prevPage: from,
samePage: samePage
}, from );
}
this._triggerWithDeprecated( prefix + "show", {
prevPage: from || $( "" ),
toPage: to
}, to );
},
_cssTransition: function( to, from, options ) {
var transition = options.transition,
reverse = options.reverse,
deferred = options.deferred,
TransitionHandler,
promise;
this._triggerCssTransitionEvents( to, from, "before" );
this._hideLoading();
TransitionHandler = this._getTransitionHandler( transition );
promise = ( new TransitionHandler( transition, reverse, to, from ) ).transition();
promise.done( $.proxy( function() {
this._triggerCssTransitionEvents( to, from );
}, this ));
promise.done(function() {
deferred.resolve.apply( deferred, arguments );
});
},
_releaseTransitionLock: function() {
isPageTransitioning = false;
if ( pageTransitionQueue.length > 0 ) {
$.mobile.changePage.apply( null, pageTransitionQueue.pop() );
}
},
_removeActiveLinkClass: function( force ) {
$.mobile.removeActiveLinkClass( force );
},
_loadUrl: function( to, triggerData, settings ) {
settings.target = to;
settings.deferred = $.Deferred();
this.load( to, settings );
settings.deferred.done($.proxy(function( url, options, content ) {
isPageTransitioning = false;
options.absUrl = triggerData.absUrl;
this.transition( content, triggerData, options );
}, this));
settings.deferred.fail($.proxy(function(/* url, options */) {
this._removeActiveLinkClass( true );
this._releaseTransitionLock();
this._triggerWithDeprecated( "changefailed", triggerData );
}, this));
},
_triggerPageBeforeChange: function( to, triggerData, settings ) {
var returnEvents;
triggerData.prevPage = this.activePage;
$.extend( triggerData, {
toPage: to,
options: settings
});
if ( $.type(to) === "string" ) {
triggerData.absUrl = $.mobile.path.makeUrlAbsolute( to, this._findBaseWithDefault() );
} else {
triggerData.absUrl = settings.absUrl;
}
returnEvents = this._triggerWithDeprecated( "beforechange", triggerData );
if ( returnEvents.event.isDefaultPrevented() ||
returnEvents.deprecatedEvent.isDefaultPrevented() ) {
return false;
}
return true;
},
change: function( to, options ) {
if ( isPageTransitioning ) {
pageTransitionQueue.unshift( arguments );
return;
}
var settings = $.extend( {}, $.mobile.changePage.defaults, options ),
triggerData = {};
settings.fromPage = settings.fromPage || this.activePage;
if ( !this._triggerPageBeforeChange(to, triggerData, settings) ) {
return;
}
to = triggerData.toPage;
if ( $.type(to) === "string" ) {
isPageTransitioning = true;
this._loadUrl( to, triggerData, settings );
} else {
this.transition( to, triggerData, settings );
}
},
transition: function( toPage, triggerData, settings ) {
var fromPage, url, pageUrl, fileUrl,
active, activeIsInitialPage,
historyDir, pageTitle, isDialog,
alreadyThere, newPageTitle,
params, cssTransitionDeferred,
beforeTransition;
if ( isPageTransitioning ) {
pageTransitionQueue.unshift( [toPage, settings] );
return;
}
if ( !this._triggerPageBeforeChange(toPage, triggerData, settings) ) {
return;
}
triggerData.prevPage = settings.fromPage;
beforeTransition = this._triggerWithDeprecated( "beforetransition", triggerData );
if (beforeTransition.deprecatedEvent.isDefaultPrevented() ||
beforeTransition.event.isDefaultPrevented() ) {
return;
}
isPageTransitioning = true;
if ( toPage[ 0 ] === $.mobile.firstPage[ 0 ] && !settings.dataUrl ) {
settings.dataUrl = $.mobile.path.documentUrl.hrefNoHash;
}
fromPage = settings.fromPage;
url = ( settings.dataUrl && $.mobile.path.convertUrlToDataUrl(settings.dataUrl) ) ||
toPage.jqmData( "url" );
pageUrl = url;
fileUrl = $.mobile.path.getFilePath( url );
active = $.mobile.navigate.history.getActive();
activeIsInitialPage = $.mobile.navigate.history.activeIndex === 0;
historyDir = 0;
pageTitle = document.title;
isDialog = ( settings.role === "dialog" ||
toPage.jqmData( "role" ) === "dialog" ) &&
toPage.jqmData( "dialog" ) !== true;
if ( fromPage && fromPage[0] === toPage[0] &&
!settings.allowSamePageTransition ) {
isPageTransitioning = false;
this._triggerWithDeprecated( "transition", triggerData );
this._triggerWithDeprecated( "change", triggerData );
if ( settings.fromHashChange ) {
$.mobile.navigate.history.direct({ url: url });
}
return;
}
toPage.page({ role: settings.role });
if ( settings.fromHashChange ) {
historyDir = settings.direction === "back" ? -1 : 1;
}
try {
if ( document.activeElement &&
document.activeElement.nodeName.toLowerCase() !== "body" ) {
$( document.activeElement ).blur();
} else {
$( "input:focus, textarea:focus, select:focus" ).blur();
}
} catch( e ) {}
alreadyThere = false;
if ( isDialog && active ) {
if ( active.url &&
active.url.indexOf( $.mobile.dialogHashKey ) > -1 &&
this.activePage &&
!this.activePage.hasClass( "ui-dialog" ) &&
$.mobile.navigate.history.activeIndex > 0 ) {
settings.changeHash = false;
alreadyThere = true;
}
url = ( active.url || "" );
if ( !alreadyThere && url.indexOf("#") > -1 ) {
url += $.mobile.dialogHashKey;
} else {
url += "#" + $.mobile.dialogHashKey;
}
}
newPageTitle = ( !active ) ? pageTitle : toPage.jqmData( "title" ) ||
toPage.children( ":jqmData(role='header')" ).find( ".ui-title" ).text();
if ( !!newPageTitle && pageTitle === document.title ) {
pageTitle = newPageTitle;
}
if ( !toPage.jqmData( "title" ) ) {
toPage.jqmData( "title", pageTitle );
}
settings.transition = settings.transition ||
( ( historyDir && !activeIsInitialPage ) ? active.transition : undefined ) ||
( isDialog ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition );
if ( !historyDir && alreadyThere ) {
$.mobile.navigate.history.getActive().pageUrl = pageUrl;
}
if ( url && !settings.fromHashChange ) {
if ( !$.mobile.path.isPath( url ) && url.indexOf( "#" ) < 0 ) {
url = "#" + url;
}
params = {
transition: settings.transition,
title: pageTitle,
pageUrl: pageUrl,
role: settings.role
};
if ( settings.changeHash !== false && $.mobile.hashListeningEnabled ) {
$.mobile.navigate( this.window[ 0 ].encodeURI( url ), params, true);
} else if ( toPage[ 0 ] !== $.mobile.firstPage[ 0 ] ) {
$.mobile.navigate.history.add( url, params );
}
}
document.title = pageTitle;
$.mobile.activePage = toPage;
this.activePage = toPage;
settings.reverse = settings.reverse || historyDir < 0;
cssTransitionDeferred = $.Deferred();
this._cssTransition(toPage, fromPage, {
transition: settings.transition,
reverse: settings.reverse,
deferred: cssTransitionDeferred
});
cssTransitionDeferred.done($.proxy(function( name, reverse, $to, $from, alreadyFocused ) {
$.mobile.removeActiveLinkClass();
if ( settings.duplicateCachedPage ) {
settings.duplicateCachedPage.remove();
}
if ( !alreadyFocused ) {
$.mobile.focusPage( toPage );
}
this._releaseTransitionLock();
this._triggerWithDeprecated( "transition", triggerData );
this._triggerWithDeprecated( "change", triggerData );
}, this));
},
_findBaseWithDefault: function() {
var closestBase = ( this.activePage &&
$.mobile.getClosestBaseUrl( this.activePage ) );
return closestBase || $.mobile.path.documentBase.hrefNoHash;
}
});
$.mobile.navreadyDeferred = $.Deferred();
var pageTransitionQueue = [],
isPageTransitioning = false;
})( jQuery );
(function( $, undefined ) {
var domreadyDeferred = $.Deferred(),
loadDeferred = $.Deferred(),
pageIsFullyLoaded = function() {
loadDeferred.resolve();
loadDeferred = null;
},
documentUrl = $.mobile.path.documentUrl,
$lastVClicked = null;
/* Event Bindings - hashchange, submit, and click */
function findClosestLink( ele ) {
while ( ele ) {
if ( ( typeof ele.nodeName === "string" ) && ele.nodeName.toLowerCase() === "a" ) {
break;
}
ele = ele.parentNode;
}
return ele;
}
$.mobile.loadPage = function( url, opts ) {
var container;
opts = opts || {};
container = ( opts.pageContainer || $.mobile.pageContainer );
opts.deferred = $.Deferred();
container.pagecontainer( "load", url, opts );
return opts.deferred.promise();
};
/* internal utility functions */
$.mobile.back = function() {
var nav = window.navigator;
if ( this.phonegapNavigationEnabled &&
nav &&
nav.app &&
nav.app.backHistory ) {
nav.app.backHistory();
} else {
$.mobile.pageContainer.pagecontainer( "back" );
}
};
$.mobile.focusPage = function ( page ) {
var autofocus = page.find( "[autofocus]" ),
pageTitle = page.find( ".ui-title:eq(0)" );
if ( autofocus.length ) {
autofocus.focus();
return;
}
if ( pageTitle.length ) {
pageTitle.focus();
} else{
page.focus();
}
};
$.mobile._maybeDegradeTransition = $.mobile._maybeDegradeTransition || function( transition ) {
return transition;
};
$.mobile.changePage = function( to, options ) {
$.mobile.pageContainer.pagecontainer( "change", to, options );
};
$.mobile.changePage.defaults = {
transition: undefined,
reverse: false,
changeHash: true,
fromHashChange: false,
role: undefined, // By default we rely on the role defined by the @data-role attribute.
duplicateCachedPage: undefined,
pageContainer: undefined,
showLoadMsg: true, //loading message shows by default when pages are being fetched during changePage
dataUrl: undefined,
fromPage: undefined,
allowSamePageTransition: false
};
$.mobile._registerInternalEvents = function() {
var getAjaxFormData = function( $form, calculateOnly ) {
var url, ret = true, formData, vclickedName, method;
if ( !$.mobile.ajaxEnabled ||
$form.is( ":jqmData(ajax='false')" ) ||
!$form.jqmHijackable().length ||
$form.attr( "target" ) ) {
return false;
}
url = ( $lastVClicked && $lastVClicked.attr( "formaction" ) ) ||
$form.attr( "action" );
method = ( $form.attr( "method" ) || "get" ).toLowerCase();
if ( !url ) {
url = $.mobile.getClosestBaseUrl( $form );
if ( method === "get" ) {
url = $.mobile.path.parseUrl( url ).hrefNoSearch;
}
if ( url === $.mobile.path.documentBase.hrefNoHash ) {
url = documentUrl.hrefNoSearch;
}
}
url = $.mobile.path.makeUrlAbsolute( url, $.mobile.getClosestBaseUrl( $form ) );
if ( ( $.mobile.path.isExternal( url ) && !$.mobile.path.isPermittedCrossDomainRequest( documentUrl, url ) ) ) {
return false;
}
if ( !calculateOnly ) {
formData = $form.serializeArray();
if ( $lastVClicked && $lastVClicked[ 0 ].form === $form[ 0 ] ) {
vclickedName = $lastVClicked.attr( "name" );
if ( vclickedName ) {
$.each( formData, function( key, value ) {
if ( value.name === vclickedName ) {
vclickedName = "";
return false;
}
});
if ( vclickedName ) {
formData.push( { name: vclickedName, value: $lastVClicked.attr( "value" ) } );
}
}
}
ret = {
url: url,
options: {
type: method,
data: $.param( formData ),
transition: $form.jqmData( "transition" ),
reverse: $form.jqmData( "direction" ) === "reverse",
reloadPage: true
}
};
}
return ret;
};
$.mobile.document.delegate( "form", "submit", function( event ) {
var formData;
if ( !event.isDefaultPrevented() ) {
formData = getAjaxFormData( $( this ) );
if ( formData ) {
$.mobile.changePage( formData.url, formData.options );
event.preventDefault();
}
}
});
$.mobile.document.bind( "vclick", function( event ) {
var $btn, btnEls, target = event.target, needClosest = false;
if ( event.which > 1 || !$.mobile.linkBindingEnabled ) {
return;
}
$lastVClicked = $( target );
if ( $.data( target, "mobile-button" ) ) {
if ( !getAjaxFormData( $( target ).closest( "form" ), true ) ) {
return;
}
if ( target.parentNode ) {
target = target.parentNode;
}
} else {
target = findClosestLink( target );
if ( !( target && $.mobile.path.parseUrl( target.getAttribute( "href" ) || "#" ).hash !== "#" ) ) {
return;
}
if ( !$( target ).jqmHijackable().length ) {
return;
}
}
if ( !!~target.className.indexOf( "ui-link-inherit" ) ) {
if ( target.parentNode ) {
btnEls = $.data( target.parentNode, "buttonElements" );
}
} else {
btnEls = $.data( target, "buttonElements" );
}
if ( btnEls ) {
target = btnEls.outer;
} else {
needClosest = true;
}
$btn = $( target );
if ( needClosest ) {
$btn = $btn.closest( ".ui-btn" );
}
if ( $btn.length > 0 &&
!( $btn.hasClass( "ui-state-disabled" ||
$btn.hasClass( "ui-disabled" ) ) ) ) {
$.mobile.removeActiveLinkClass( true );
$.mobile.activeClickedLink = $btn;
$.mobile.activeClickedLink.addClass( $.mobile.activeBtnClass );
}
});
$.mobile.document.bind( "click", function( event ) {
if ( !$.mobile.linkBindingEnabled || event.isDefaultPrevented() ) {
return;
}
var link = findClosestLink( event.target ),
$link = $( link ),
httpCleanup = function() {
window.setTimeout(function() { $.mobile.removeActiveLinkClass( true ); }, 200 );
},
baseUrl, href,
useDefaultUrlHandling, isExternal,
transition, reverse, role;
if ( $.mobile.activeClickedLink &&
$.mobile.activeClickedLink[ 0 ] === event.target.parentNode ) {
httpCleanup();
}
if ( !link || event.which > 1 || !$link.jqmHijackable().length ) {
return;
}
if ( $link.is( ":jqmData(rel='back')" ) ) {
$.mobile.back();
return false;
}
baseUrl = $.mobile.getClosestBaseUrl( $link );
href = $.mobile.path.makeUrlAbsolute( $link.attr( "href" ) || "#", baseUrl );
if ( !$.mobile.ajaxEnabled && !$.mobile.path.isEmbeddedPage( href ) ) {
httpCleanup();
return;
}
if ( href.search( "#" ) !== -1 &&
!( $.mobile.path.isExternal( href ) && $.mobile.path.isAbsoluteUrl( href ) ) ) {
href = href.replace( /[^#]*#/, "" );
if ( !href ) {
event.preventDefault();
return;
} else if ( $.mobile.path.isPath( href ) ) {
href = $.mobile.path.makeUrlAbsolute( href, baseUrl );
} else {
href = $.mobile.path.makeUrlAbsolute( "#" + href, documentUrl.hrefNoHash );
}
}
useDefaultUrlHandling = $link.is( "[rel='external']" ) || $link.is( ":jqmData(ajax='false')" ) || $link.is( "[target]" );
isExternal = useDefaultUrlHandling || ( $.mobile.path.isExternal( href ) && !$.mobile.path.isPermittedCrossDomainRequest( documentUrl, href ) );
if ( isExternal ) {
httpCleanup();
return;
}
transition = $link.jqmData( "transition" );
reverse = $link.jqmData( "direction" ) === "reverse" ||
$link.jqmData( "back" );
role = $link.attr( "data-" + $.mobile.ns + "rel" ) || undefined;
$.mobile.changePage( href, { transition: transition, reverse: reverse, role: role, link: $link } );
event.preventDefault();
});
$.mobile.document.delegate( ".ui-page", "pageshow.prefetch", function() {
var urls = [];
$( this ).find( "a:jqmData(prefetch)" ).each(function() {
var $link = $( this ),
url = $link.attr( "href" );
if ( url && $.inArray( url, urls ) === -1 ) {
urls.push( url );
$.mobile.loadPage( url, { role: $link.attr( "data-" + $.mobile.ns + "rel" ),prefetch: true } );
}
});
});
$.mobile.pageContainer.pagecontainer();
$.mobile.document.bind( "pageshow", function() {
if ( loadDeferred ) {
loadDeferred.done( $.mobile.resetActivePageHeight );
} else {
$.mobile.resetActivePageHeight();
}
});
$.mobile.window.bind( "throttledresize", $.mobile.resetActivePageHeight );
};//navreadyDeferred done callback
$( function() { domreadyDeferred.resolve(); } );
if ( document.readyState === "complete" ) {
pageIsFullyLoaded();
} else {
$.mobile.window.load( pageIsFullyLoaded );
}
$.when( domreadyDeferred, $.mobile.navreadyDeferred ).done( function() { $.mobile._registerInternalEvents(); } );
})( jQuery );
(function( $, window, undefined ) {
$.mobile.Transition = function() {
this.init.apply( this, arguments );
};
$.extend($.mobile.Transition.prototype, {
toPreClass: " ui-page-pre-in",
init: function( name, reverse, $to, $from ) {
$.extend(this, {
name: name,
reverse: reverse,
$to: $to,
$from: $from,
deferred: new $.Deferred()
});
},
cleanFrom: function() {
this.$from
.removeClass( $.mobile.activePageClass + " out in reverse " + this.name )
.height( "" );
},
beforeDoneIn: function() {},
beforeDoneOut: function() {},
beforeStartOut: function() {},
doneIn: function() {
this.beforeDoneIn();
this.$to.removeClass( "out in reverse " + this.name ).height( "" );
this.toggleViewportClass();
if ( $.mobile.window.scrollTop() !== this.toScroll ) {
this.scrollPage();
}
if ( !this.sequential ) {
this.$to.addClass( $.mobile.activePageClass );
}
this.deferred.resolve( this.name, this.reverse, this.$to, this.$from, true );
},
doneOut: function( screenHeight, reverseClass, none, preventFocus ) {
this.beforeDoneOut();
this.startIn( screenHeight, reverseClass, none, preventFocus );
},
hideIn: function( callback ) {
this.$to.css( "z-index", -10 );
callback.call( this );
this.$to.css( "z-index", "" );
},
scrollPage: function() {
$.event.special.scrollstart.enabled = false;
if ( $.mobile.hideUrlBar || this.toScroll !== $.mobile.defaultHomeScroll ) {
window.scrollTo( 0, this.toScroll );
}
setTimeout( function() {
$.event.special.scrollstart.enabled = true;
}, 150 );
},
startIn: function( screenHeight, reverseClass, none, preventFocus ) {
this.hideIn(function() {
this.$to.addClass( $.mobile.activePageClass + this.toPreClass );
if ( !preventFocus ) {
$.mobile.focusPage( this.$to );
}
this.$to.height( screenHeight + this.toScroll );
if ( !none ) {
this.scrollPage();
}
});
this.$to
.removeClass( this.toPreClass )
.addClass( this.name + " in " + reverseClass );
if ( !none ) {
this.$to.animationComplete( $.proxy(function() {
this.doneIn();
}, this ));
} else {
this.doneIn();
}
},
startOut: function( screenHeight, reverseClass, none ) {
this.beforeStartOut( screenHeight, reverseClass, none );
this.$from
.height( screenHeight + $.mobile.window.scrollTop() )
.addClass( this.name + " out" + reverseClass );
},
toggleViewportClass: function() {
$.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + this.name );
},
transition: function() {
var none,
reverseClass = this.reverse ? " reverse" : "",
screenHeight = $.mobile.getScreenHeight(),
maxTransitionOverride = $.mobile.maxTransitionWidth !== false &&
$.mobile.window.width() > $.mobile.maxTransitionWidth;
this.toScroll = $.mobile.navigate.history.getActive().lastScroll || $.mobile.defaultHomeScroll;
none = !$.support.cssTransitions || !$.support.cssAnimations ||
maxTransitionOverride || !this.name || this.name === "none" ||
Math.max( $.mobile.window.scrollTop(), this.toScroll ) >
$.mobile.getMaxScrollForTransition();
this.toggleViewportClass();
if ( this.$from && !none ) {
this.startOut( screenHeight, reverseClass, none );
} else {
this.doneOut( screenHeight, reverseClass, none, true );
}
return this.deferred.promise();
}
});
})( jQuery, this );
(function( $ ) {
$.mobile.SerialTransition = function() {
this.init.apply(this, arguments);
};
$.extend($.mobile.SerialTransition.prototype, $.mobile.Transition.prototype, {
sequential: true,
beforeDoneOut: function() {
if ( this.$from ) {
this.cleanFrom();
}
},
beforeStartOut: function( screenHeight, reverseClass, none ) {
this.$from.animationComplete($.proxy(function() {
this.doneOut( screenHeight, reverseClass, none );
}, this ));
}
});
})( jQuery );
(function( $ ) {
$.mobile.ConcurrentTransition = function() {
this.init.apply(this, arguments);
};
$.extend($.mobile.ConcurrentTransition.prototype, $.mobile.Transition.prototype, {
sequential: false,
beforeDoneIn: function() {
if ( this.$from ) {
this.cleanFrom();
}
},
beforeStartOut: function( screenHeight, reverseClass, none ) {
this.doneOut( screenHeight, reverseClass, none );
}
});
})( jQuery );
(function( $ ) {
var defaultGetMaxScrollForTransition = function() {
return $.mobile.getScreenHeight() * 3;
};
$.mobile.transitionHandlers = {
"sequential": $.mobile.SerialTransition,
"simultaneous": $.mobile.ConcurrentTransition
};
$.mobile.defaultTransitionHandler = $.mobile.transitionHandlers.sequential;
$.mobile.transitionFallbacks = {};
$.mobile._maybeDegradeTransition = function( transition ) {
if ( transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ transition ] ) {
transition = $.mobile.transitionFallbacks[ transition ];
}
return transition;
};
$.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;
})( jQuery );
/*
* fallback transition for flip in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.flip = "fade";
})( jQuery, this );
/*
* fallback transition for flow in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.flow = "fade";
})( jQuery, this );
/*
* fallback transition for pop in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.pop = "fade";
})( jQuery, this );
/*
* fallback transition for slide in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;
$.mobile.transitionFallbacks.slide = "fade";
})( jQuery, this );
/*
* fallback transition for slidedown in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.slidedown = "fade";
})( jQuery, this );
/*
* fallback transition for slidefade in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.slidefade = "fade";
})( jQuery, this );
/*
* fallback transition for slideup in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.slideup = "fade";
})( jQuery, this );
/*
* fallback transition for turn in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/
(function( $, window, undefined ) {
$.mobile.transitionFallbacks.turn = "fade";
})( jQuery, this );
(function( $, undefined ) {
$.mobile.degradeInputs = {
color: false,
date: false,
datetime: false,
"datetime-local": false,
email: false,
month: false,
number: false,
range: "number",
search: "text",
tel: false,
time: false,
url: false,
week: false
};
$.mobile.page.prototype.options.degradeInputs = $.mobile.degradeInputs;
$.mobile.degradeInputsWithin = function( target ) {
target = $( target );
target.find( "input" ).not( $.mobile.page.prototype.keepNativeSelector() ).each(function() {
var element = $( this ),
type = this.getAttribute( "type" ),
optType = $.mobile.degradeInputs[ type ] || "text",
html, hasType, findstr, repstr;
if ( $.mobile.degradeInputs[ type ] ) {
html = $( "<div>" ).html( element.clone() ).html();
hasType = html.indexOf( " type=" ) > -1;
findstr = hasType ? /\s+type=["']?\w+['"]?/ : /\/?>/;
repstr = " type=\"" + optType + "\" data-" + $.mobile.ns + "type=\"" + type + "\"" + ( hasType ? "" : ">" );
element.replaceWith( html.replace( findstr, repstr ) );
}
});
};
})( jQuery );
(function( $, window, undefined ) {
$.widget( "mobile.page", $.mobile.page, {
options: {
closeBtn: "left",
closeBtnText: "Close",
overlayTheme: "a",
corners: true,
dialog: false
},
_create: function() {
this._super();
if ( this.options.dialog ) {
$.extend( this, {
_inner: this.element.children(),
_headerCloseButton: null
});
if ( !this.options.enhanced ) {
this._setCloseBtn( this.options.closeBtn );
}
}
},
_enhance: function() {
this._super();
if ( this.options.dialog ) {
this.element.addClass( "ui-dialog" )
.wrapInner( $( "<div/>", {
"role" : "dialog",
"class" : "ui-dialog-contain ui-overlay-shadow" +
( this.options.corners ? " ui-corner-all" : "" )
}));
}
},
_setOptions: function( options ) {
var closeButtonLocation, closeButtonText,
currentOpts = this.options;
if ( options.corners !== undefined ) {
this._inner.toggleClass( "ui-corner-all", !!options.corners );
}
if ( options.overlayTheme !== undefined ) {
if ( $.mobile.activePage[ 0 ] === this.element[ 0 ] ) {
currentOpts.overlayTheme = options.overlayTheme;
this._handlePageBeforeShow();
}
}
if ( options.closeBtnText !== undefined ) {
closeButtonLocation = currentOpts.closeBtn;
closeButtonText = options.closeBtnText;
}
if ( options.closeBtn !== undefined ) {
closeButtonLocation = options.closeBtn;
}
if ( closeButtonLocation ) {
this._setCloseBtn( closeButtonLocation, closeButtonText );
}
this._super( options );
},
_handlePageBeforeShow: function () {
if ( this.options.overlayTheme && this.options.dialog ) {
this.removeContainerBackground();
this.setContainerBackground( this.options.overlayTheme );
} else {
this._super();
}
},
_setCloseBtn: function( location, text ) {
var dst,
btn = this._headerCloseButton;
location = "left" === location ? "left" : "right" === location ? "right" : "none";
if ( "none" === location ) {
if ( btn ) {
btn.remove();
btn = null;
}
} else if ( btn ) {
btn.removeClass( "ui-btn-left ui-btn-right" ).addClass( "ui-btn-" + location );
if ( text ) {
btn.text( text );
}
} else {
dst = this._inner.find( ":jqmData(role='header')" ).first();
btn = $( "<a></a>", {
"href": "#",
"class": "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-" + location
})
.attr( "data-" + $.mobile.ns + "rel", "back" )
.text( text || this.options.closeBtnText || "" )
.prependTo( dst );
}
this._headerCloseButton = btn;
}
});
})( jQuery, this );
(function( $, window, undefined ) {
$.widget( "mobile.dialog", {
options: {
closeBtn: "left",
closeBtnText: "Close",
overlayTheme: "a",
corners: true
},
_handlePageBeforeShow: function() {
this._isCloseable = true;
if ( this.options.overlayTheme ) {
this.element
.page( "removeContainerBackground" )
.page( "setContainerBackground", this.options.overlayTheme );
}
},
_handlePageBeforeHide: function() {
this._isCloseable = false;
},
_handleVClickSubmit: function( event ) {
var attrs,
$target = $( event.target ).closest( event.type === "vclick" ? "a" : "form" );
if ( $target.length && !$target.jqmData( "transition" ) ) {
attrs = {};
attrs[ "data-" + $.mobile.ns + "transition" ] =
( $.mobile.navigate.history.getActive() || {} )[ "transition" ] ||
$.mobile.defaultDialogTransition;
attrs[ "data-" + $.mobile.ns + "direction" ] = "reverse";
$target.attr( attrs );
}
},
_create: function() {
var elem = this.element,
opts = this.options;
elem.addClass( "ui-dialog" )
.wrapInner( $( "<div/>", {
"role" : "dialog",
"class" : "ui-dialog-contain ui-overlay-shadow" +
( !!opts.corners ? " ui-corner-all" : "" )
}));
$.extend( this, {
_isCloseable: false,
_inner: elem.children(),
_headerCloseButton: null
});
this._on( elem, {
vclick: "_handleVClickSubmit",
submit: "_handleVClickSubmit",
pagebeforeshow: "_handlePageBeforeShow",
pagebeforehide: "_handlePageBeforeHide"
});
this._setCloseBtn( opts.closeBtn );
},
_setOptions: function( options ) {
var closeButtonLocation, closeButtonText,
currentOpts = this.options;
if ( options.corners !== undefined ) {
this._inner.toggleClass( "ui-corner-all", !!options.corners );
}
if ( options.overlayTheme !== undefined ) {
if ( $.mobile.activePage[ 0 ] === this.element[ 0 ] ) {
currentOpts.overlayTheme = options.overlayTheme;
this._handlePageBeforeShow();
}
}
if ( options.closeBtnText !== undefined ) {
closeButtonLocation = currentOpts.closeBtn;
closeButtonText = options.closeBtnText;
}
if ( options.closeBtn !== undefined ) {
closeButtonLocation = options.closeBtn;
}
if ( closeButtonLocation ) {
this._setCloseBtn( closeButtonLocation, closeButtonText );
}
this._super( options );
},
_setCloseBtn: function( location, text ) {
var dst,
btn = this._headerCloseButton;
location = "left" === location ? "left" : "right" === location ? "right" : "none";
if ( "none" === location ) {
if ( btn ) {
btn.remove();
btn = null;
}
} else if ( btn ) {
btn.removeClass( "ui-btn-left ui-btn-right" ).addClass( "ui-btn-" + location );
if ( text ) {
btn.text( text );
}
} else {
dst = this._inner.find( ":jqmData(role='header')" ).first();
btn = $( "<a></a>", {
"role": "button",
"href": "#",
"class": "ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-" + location
})
.text( text || this.options.closeBtnText || "" )
.prependTo( dst );
this._on( btn, { click: "close" } );
}
this._headerCloseButton = btn;
},
close: function() {
var hist = $.mobile.navigate.history;
if ( this._isCloseable ) {
this._isCloseable = false;
if ( $.mobile.hashListeningEnabled && hist.activeIndex > 0 ) {
$.mobile.back();
} else {
$.mobile.pageContainer.pagecontainer( "back" );
}
}
}
});
})( jQuery, this );
(function( $, undefined ) {
var rInitialLetter = /([A-Z])/g,
iconposClass = function( iconpos ) {
return ( "ui-btn-icon-" + ( iconpos === null ? "left" : iconpos ) );
};
$.widget( "mobile.collapsible", {
options: {
enhanced: false,
expandCueText: null,
collapseCueText: null,
collapsed: true,
heading: "h1,h2,h3,h4,h5,h6,legend",
collapsedIcon: null,
expandedIcon: null,
iconpos: null,
theme: null,
contentTheme: null,
inset: null,
corners: null,
mini: null
},
_create: function() {
var elem = this.element,
ui = {
accordion: elem
.closest( ":jqmData(role='collapsible-set')," +
":jqmData(role='collapsibleset')" +
( $.mobile.collapsibleset ? ", :mobile-collapsibleset" :
"" ) )
.addClass( "ui-collapsible-set" )
};
this._ui = ui;
this._renderedOptions = this._getOptions( this.options );
if ( this.options.enhanced ) {
ui.heading = this.element.children( ".ui-collapsible-heading" );
ui.content = ui.heading.next();
ui.anchor = ui.heading.children();
ui.status = ui.anchor.children( ".ui-collapsible-heading-status" );
} else {
this._enhance( elem, ui );
}
this._on( ui.heading, {
"tap": function() {
ui.heading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
},
"click": function( event ) {
this._handleExpandCollapse( !ui.heading.hasClass( "ui-collapsible-heading-collapsed" ) );
event.preventDefault();
event.stopPropagation();
}
});
},
_getOptions: function( options ) {
var key,
accordion = this._ui.accordion,
accordionWidget = this._ui.accordionWidget;
options = $.extend( {}, options );
if ( accordion.length && !accordionWidget ) {
this._ui.accordionWidget =
accordionWidget = accordion.data( "mobile-collapsibleset" );
}
for ( key in options ) {
options[ key ] =
( options[ key ] != null ) ? options[ key ] :
( accordionWidget ) ? accordionWidget.options[ key ] :
accordion.length ? $.mobile.getAttribute( accordion[ 0 ],
key.replace( rInitialLetter, "-$1" ).toLowerCase() ):
null;
if ( null == options[ key ] ) {
options[ key ] = $.mobile.collapsible.defaults[ key ];
}
}
return options;
},
_themeClassFromOption: function( prefix, value ) {
return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
},
_enhance: function( elem, ui ) {
var iconclass,
opts = this._renderedOptions,
contentThemeClass = this._themeClassFromOption( "ui-body-", opts.contentTheme );
elem.addClass( "ui-collapsible " +
( opts.inset ? "ui-collapsible-inset " : "" ) +
( opts.inset && opts.corners ? "ui-corner-all " : "" ) +
( contentThemeClass ? "ui-collapsible-themed-content " : "" ) );
ui.originalHeading = elem.children( this.options.heading ).first(),
ui.content = elem
.wrapInner( "<div " +
"class='ui-collapsible-content " +
contentThemeClass + "'></div>" )
.children( ".ui-collapsible-content" ),
ui.heading = ui.originalHeading;
if ( ui.heading.is( "legend" ) ) {
ui.heading = $( "<div role='heading'>"+ ui.heading.html() +"</div>" );
ui.placeholder = $( "<div></div>" ).insertBefore( ui.originalHeading );
ui.originalHeading.remove();
}
iconclass = ( opts.collapsed ? ( opts.collapsedIcon ? "ui-icon-" + opts.collapsedIcon : "" ):
( opts.expandedIcon ? "ui-icon-" + opts.expandedIcon : "" ) );
ui.status = $( "<span class='ui-collapsible-heading-status'></span>" );
ui.anchor = ui.heading
.detach()
.addClass( "ui-collapsible-heading" )
.append( ui.status )
.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
.find( "a" )
.first()
.addClass( "ui-btn " +
( iconclass ? iconclass + " " : "" ) +
( iconclass ? iconposClass( opts.iconpos ) +
" " : "" ) +
this._themeClassFromOption( "ui-btn-", opts.theme ) + " " +
( opts.mini ? "ui-mini " : "" ) );
ui.heading.insertBefore( ui.content );
this._handleExpandCollapse( this.options.collapsed );
return ui;
},
refresh: function() {
this._applyOptions( this.options );
this._renderedOptions = this._getOptions( this.options );
},
_applyOptions: function( options ) {
var isCollapsed, newTheme, oldTheme, hasCorners, hasIcon,
elem = this.element,
currentOpts = this._renderedOptions,
ui = this._ui,
anchor = ui.anchor,
status = ui.status,
opts = this._getOptions( options );
if ( options.collapsed !== undefined ) {
this._handleExpandCollapse( options.collapsed );
}
isCollapsed = elem.hasClass( "ui-collapsible-collapsed" );
if ( isCollapsed ) {
if ( opts.expandCueText !== undefined ) {
status.text( opts.expandCueText );
}
} else {
if ( opts.collapseCueText !== undefined ) {
status.text( opts.collapseCueText );
}
}
hasIcon =
( opts.collapsedIcon !== undefined ? opts.collapsedIcon !== false :
currentOpts.collapsedIcon !== false );
if ( !( opts.iconpos === undefined &&
opts.collapsedIcon === undefined &&
opts.expandedIcon === undefined ) ) {
anchor.removeClass( [ iconposClass( currentOpts.iconpos ) ]
.concat( ( currentOpts.expandedIcon ?
[ "ui-icon-" + currentOpts.expandedIcon ] : [] ) )
.concat( ( currentOpts.collapsedIcon ?
[ "ui-icon-" + currentOpts.collapsedIcon ] : [] ) )
.join( " " ) );
if ( hasIcon ) {
anchor.addClass(
[ iconposClass( opts.iconpos !== undefined ?
opts.iconpos : currentOpts.iconpos ) ]
.concat( isCollapsed ?
[ "ui-icon-" + ( opts.collapsedIcon !== undefined ?
opts.collapsedIcon :
currentOpts.collapsedIcon ) ] :
[ "ui-icon-" + ( opts.expandedIcon !== undefined ?
opts.expandedIcon :
currentOpts.expandedIcon ) ] )
.join( " " ) );
}
}
if ( opts.theme !== undefined ) {
oldTheme = this._themeClassFromOption( "ui-btn-", currentOpts.theme );
newTheme = this._themeClassFromOption( "ui-btn-", opts.theme );
anchor.removeClass( oldTheme ).addClass( newTheme );
}
if ( opts.contentTheme !== undefined ) {
oldTheme = this._themeClassFromOption( "ui-body-",
currentOpts.contentTheme );
newTheme = this._themeClassFromOption( "ui-body-",
opts.contentTheme );
ui.content.removeClass( oldTheme ).addClass( newTheme );
}
if ( opts.inset !== undefined ) {
elem.toggleClass( "ui-collapsible-inset", opts.inset );
hasCorners = !!( opts.inset && ( opts.corners || currentOpts.corners ) );
}
if ( opts.corners !== undefined ) {
hasCorners = !!( opts.corners && ( opts.inset || currentOpts.inset ) );
}
if ( hasCorners !== undefined ) {
elem.toggleClass( "ui-corner-all", hasCorners );
}
if ( opts.mini !== undefined ) {
anchor.toggleClass( "ui-mini", opts.mini );
}
},
_setOptions: function( options ) {
this._applyOptions( options );
this._super( options );
this._renderedOptions = this._getOptions( this.options );
},
_handleExpandCollapse: function( isCollapse ) {
var opts = this._renderedOptions,
ui = this._ui;
ui.status.text( isCollapse ? opts.expandCueText : opts.collapseCueText );
ui.heading
.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
.find( "a" ).first()
.toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapse )
.toggleClass( "ui-icon-" + opts.collapsedIcon, ( isCollapse || opts.expandedIcon === opts.collapsedIcon ) )
.removeClass( $.mobile.activeBtnClass );
this.element.toggleClass( "ui-collapsible-collapsed", isCollapse );
ui.content
.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
.attr( "aria-hidden", isCollapse )
.trigger( "updatelayout" );
this.options.collapsed = isCollapse;
this._trigger( isCollapse ? "collapse" : "expand" );
},
expand: function() {
this._handleExpandCollapse( false );
},
collapse: function() {
this._handleExpandCollapse( true );
},
_destroy: function() {
var ui = this._ui,
opts = this.options;
if ( opts.enhanced ) {
return;
}
if ( ui.placeholder ) {
ui.originalHeading.insertBefore( ui.placeholder );
ui.placeholder.remove();
ui.heading.remove();
} else {
ui.status.remove();
ui.heading
.removeClass( "ui-collapsible-heading ui-collapsible-heading-collapsed" )
.children()
.contents()
.unwrap();
}
ui.anchor.contents().unwrap();
ui.content.contents().unwrap();
this.element
.removeClass( "ui-collapsible ui-collapsible-collapsed " +
"ui-collapsible-themed-content ui-collapsible-inset ui-corner-all" );
}
});
$.mobile.collapsible.defaults = {
expandCueText: " click to expand contents",
collapseCueText: " click to collapse contents",
collapsedIcon: "plus",
contentTheme: "inherit",
expandedIcon: "minus",
iconpos: "left",
inset: true,
corners: true,
theme: "inherit",
mini: false
};
})( jQuery );
(function( $, undefined ) {
var uiScreenHiddenRegex = /\bui-screen-hidden\b/;
function noHiddenClass( elements ) {
var index,
length = elements.length,
result = [];
for ( index = 0; index < length; index++ ) {
if ( !elements[ index ].className.match( uiScreenHiddenRegex ) ) {
result.push( elements[ index ] );
}
}
return $( result );
}
$.mobile.behaviors.addFirstLastClasses = {
_getVisibles: function( $els, create ) {
var visibles;
if ( create ) {
visibles = noHiddenClass( $els );
} else {
visibles = $els.filter( ":visible" );
if ( visibles.length === 0 ) {
visibles = noHiddenClass( $els );
}
}
return visibles;
},
_addFirstLastClasses: function( $els, $visibles, create ) {
$els.removeClass( "ui-first-child ui-last-child" );
$visibles.eq( 0 ).addClass( "ui-first-child" ).end().last().addClass( "ui-last-child" );
if ( !create ) {
this.element.trigger( "updatelayout" );
}
},
_removeFirstLastClasses: function( $els ) {
$els.removeClass( "ui-first-child ui-last-child" );
}
};
})( jQuery );
(function( $, undefined ) {
var childCollapsiblesSelector = ":mobile-collapsible, " + $.mobile.collapsible.initSelector;
$.widget( "mobile.collapsibleset", $.extend( {
initSelector: ":jqmData(role='collapsible-set'),:jqmData(role='collapsibleset')",
options: $.extend( {
enhanced: false
}, $.mobile.collapsible.defaults ),
_handleCollapsibleExpand: function( event ) {
var closestCollapsible = $( event.target ).closest( ".ui-collapsible" );
if ( closestCollapsible.parent().is( ":mobile-collapsibleset, :jqmData(role='collapsible-set')" ) ) {
closestCollapsible
.siblings( ".ui-collapsible:not(.ui-collapsible-collapsed)" )
.collapsible( "collapse" );
}
},
_create: function() {
var elem = this.element,
opts = this.options;
$.extend( this, {
_classes: ""
});
if ( !opts.enhanced ) {
elem.addClass( "ui-collapsible-set " +
this._themeClassFromOption( "ui-group-theme-", opts.theme ) + " " +
( opts.corners && opts.inset ? "ui-corner-all " : "" ) );
this.element.find( $.mobile.collapsible.initSelector ).collapsible();
}
this._on( elem, { collapsibleexpand: "_handleCollapsibleExpand" } );
},
_themeClassFromOption: function( prefix, value ) {
return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
},
_init: function() {
this._refresh( true );
this.element
.children( childCollapsiblesSelector )
.filter( ":jqmData(collapsed='false')" )
.collapsible( "expand" );
},
_setOptions: function( options ) {
var ret, hasCorners,
elem = this.element,
themeClass = this._themeClassFromOption( "ui-group-theme-", options.theme );
if ( themeClass ) {
elem
.removeClass( this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
.addClass( themeClass );
}
if ( options.inset !== undefined ) {
hasCorners = !!( options.inset && ( options.corners || this.options.corners ) );
}
if ( options.corners !== undefined ) {
hasCorners = !!( options.corners && ( options.inset || this.options.inset ) );
}
if ( hasCorners !== undefined ) {
elem.toggleClass( "ui-corner-all", hasCorners );
}
ret = this._super( options );
this.element.children( ":mobile-collapsible" ).collapsible( "refresh" );
return ret;
},
_destroy: function() {
var el = this.element;
this._removeFirstLastClasses( el.children( childCollapsiblesSelector ) );
el
.removeClass( "ui-collapsible-set ui-corner-all " +
this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
.children( ":mobile-collapsible" )
.collapsible( "destroy" );
},
_refresh: function( create ) {
var collapsiblesInSet = this.element.children( childCollapsiblesSelector );
this.element.find( $.mobile.collapsible.initSelector ).not( ".ui-collapsible" ).collapsible();
this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
},
refresh: function() {
this._refresh( false );
}
}, $.mobile.behaviors.addFirstLastClasses ) );
})( jQuery );
(function( $, undefined ) {
$.fn.fieldcontain = function(/* options */) {
return this.addClass( "ui-field-contain" );
};
})( jQuery );
(function( $, undefined ) {
$.fn.grid = function( options ) {
return this.each(function() {
var $this = $( this ),
o = $.extend({
grid: null
}, options ),
$kids = $this.children(),
gridCols = { solo:1, a:2, b:3, c:4, d:5 },
grid = o.grid,
iterator,
letter;
if ( !grid ) {
if ( $kids.length <= 5 ) {
for ( letter in gridCols ) {
if ( gridCols[ letter ] === $kids.length ) {
grid = letter;
}
}
} else {
grid = "a";
$this.addClass( "ui-grid-duo" );
}
}
iterator = gridCols[grid];
$this.addClass( "ui-grid-" + grid );
$kids.filter( ":nth-child(" + iterator + "n+1)" ).addClass( "ui-block-a" );
if ( iterator > 1 ) {
$kids.filter( ":nth-child(" + iterator + "n+2)" ).addClass( "ui-block-b" );
}
if ( iterator > 2 ) {
$kids.filter( ":nth-child(" + iterator + "n+3)" ).addClass( "ui-block-c" );
}
if ( iterator > 3 ) {
$kids.filter( ":nth-child(" + iterator + "n+4)" ).addClass( "ui-block-d" );
}
if ( iterator > 4 ) {
$kids.filter( ":nth-child(" + iterator + "n+5)" ).addClass( "ui-block-e" );
}
});
};
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.navbar", {
options: {
iconpos: "top",
grid: null
},
_create: function() {
var $navbar = this.element,
$navbtns = $navbar.find( "a, button" ),
iconpos = $navbtns.filter( ":jqmData(icon)" ).length ? this.options.iconpos : undefined;
$navbar.addClass( "ui-navbar" )
.attr( "role", "navigation" )
.find( "ul" )
.jqmEnhanceable()
.grid({ grid: this.options.grid });
$navbtns
.each( function() {
var icon = $.mobile.getAttribute( this, "icon" ),
theme = $.mobile.getAttribute( this, "theme" ),
classes = "ui-btn";
if ( theme ) {
classes += " ui-btn-" + theme;
}
if ( icon ) {
classes += " ui-icon-" + icon + " ui-btn-icon-" + iconpos;
}
$( this ).addClass( classes );
});
$navbar.delegate( "a", "vclick", function( /* event */ ) {
var activeBtn = $( this );
if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||
activeBtn.hasClass( "ui-disabled" ) ||
activeBtn.hasClass( $.mobile.activeBtnClass ) ) ) {
$navbtns.removeClass( $.mobile.activeBtnClass );
activeBtn.addClass( $.mobile.activeBtnClass );
$( document ).one( "pagehide", function() {
activeBtn.removeClass( $.mobile.activeBtnClass );
});
}
});
$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
});
}
});
})( jQuery );
(function( $, undefined ) {
var getAttr = $.mobile.getAttribute;
$.widget( "mobile.listview", $.extend( {
options: {
theme: null,
countTheme: null, /* Deprecated in 1.4 */
dividerTheme: null,
icon: "carat-r",
splitIcon: "carat-r",
splitTheme: null,
corners: true,
shadow: true,
inset: false
},
_create: function() {
var t = this,
listviewClasses = "";
listviewClasses += t.options.inset ? " ui-listview-inset" : "";
if ( !!t.options.inset ) {
listviewClasses += t.options.corners ? " ui-corner-all" : "";
listviewClasses += t.options.shadow ? " ui-shadow" : "";
}
t.element.addClass( " ui-listview" + listviewClasses );
t.refresh( true );
},
_findFirstElementByTagName: function( ele, nextProp, lcName, ucName ) {
var dict = {};
dict[ lcName ] = dict[ ucName ] = true;
while ( ele ) {
if ( dict[ ele.nodeName ] ) {
return ele;
}
ele = ele[ nextProp ];
}
return null;
},
_addThumbClasses: function( containers ) {
var i, img, len = containers.length;
for ( i = 0; i < len; i++ ) {
img = $( this._findFirstElementByTagName( containers[ i ].firstChild, "nextSibling", "img", "IMG" ) );
if ( img.length ) {
$( this._findFirstElementByTagName( img[ 0 ].parentNode, "parentNode", "li", "LI" ) ).addClass( img.hasClass( "ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
}
}
},
_getChildrenByTagName: function( ele, lcName, ucName ) {
var results = [],
dict = {};
dict[ lcName ] = dict[ ucName ] = true;
ele = ele.firstChild;
while ( ele ) {
if ( dict[ ele.nodeName ] ) {
results.push( ele );
}
ele = ele.nextSibling;
}
return $( results );
},
_beforeListviewRefresh: $.noop,
_afterListviewRefresh: $.noop,
refresh: function( create ) {
var buttonClass, pos, numli, item, itemClass, itemTheme, itemIcon, icon, a,
isDivider, startCount, newStartCount, value, last, splittheme, splitThemeClass, spliticon,
altButtonClass, dividerTheme, li,
o = this.options,
$list = this.element,
ol = !!$.nodeName( $list[ 0 ], "ol" ),
start = $list.attr( "start" ),
itemClassDict = {},
countBubbles = $list.find( ".ui-li-count" ),
countTheme = getAttr( $list[ 0 ], "counttheme" ) || this.options.countTheme,
countThemeClass = countTheme ? "ui-body-" + countTheme : "ui-body-inherit";
if ( o.theme ) {
$list.addClass( "ui-group-theme-" + o.theme );
}
if ( ol && ( start || start === 0 ) ) {
startCount = parseInt( start, 10 ) - 1;
$list.css( "counter-reset", "listnumbering " + startCount );
}
this._beforeListviewRefresh();
li = this._getChildrenByTagName( $list[ 0 ], "li", "LI" );
for ( pos = 0, numli = li.length; pos < numli; pos++ ) {
item = li.eq( pos );
itemClass = "";
if ( create || item[ 0 ].className.search( /\bui-li-static\b|\bui-li-divider\b/ ) < 0 ) {
a = this._getChildrenByTagName( item[ 0 ], "a", "A" );
isDivider = ( getAttr( item[ 0 ], "role" ) === "list-divider" );
value = item.attr( "value" );
itemTheme = getAttr( item[ 0 ], "theme" );
if ( a.length && a[ 0 ].className.search( /\bui-btn\b/ ) < 0 && !isDivider ) {
itemIcon = getAttr( item[ 0 ], "icon" );
icon = ( itemIcon === false ) ? false : ( itemIcon || o.icon );
a.removeClass( "ui-link" );
buttonClass = "ui-btn";
if ( itemTheme ) {
buttonClass += " ui-btn-" + itemTheme;
}
if ( a.length > 1 ) {
itemClass = "ui-li-has-alt";
last = a.last();
splittheme = getAttr( last[ 0 ], "theme" ) || o.splitTheme || getAttr( item[ 0 ], "theme", true );
splitThemeClass = splittheme ? " ui-btn-" + splittheme : "";
spliticon = getAttr( last[ 0 ], "icon" ) || getAttr( item[ 0 ], "icon" ) || o.splitIcon;
altButtonClass = "ui-btn ui-btn-icon-notext ui-icon-" + spliticon + splitThemeClass;
last
.attr( "title", $.trim( last.getEncodedText() ) )
.addClass( altButtonClass )
.empty();
a = a.first();
} else if ( icon ) {
buttonClass += " ui-btn-icon-right ui-icon-" + icon;
}
a.addClass( buttonClass );
} else if ( isDivider ) {
dividerTheme = ( getAttr( item[ 0 ], "theme" ) || o.dividerTheme || o.theme );
itemClass = "ui-li-divider ui-bar-" + ( dividerTheme ? dividerTheme : "inherit" );
item.attr( "role", "heading" );
} else if ( a.length <= 0 ) {
itemClass = "ui-li-static ui-body-" + ( itemTheme ? itemTheme : "inherit" );
}
if ( ol && value ) {
newStartCount = parseInt( value , 10 ) - 1;
item.css( "counter-reset", "listnumbering " + newStartCount );
}
}
if ( !itemClassDict[ itemClass ] ) {
itemClassDict[ itemClass ] = [];
}
itemClassDict[ itemClass ].push( item[ 0 ] );
}
for ( itemClass in itemClassDict ) {
$( itemClassDict[ itemClass ] ).addClass( itemClass );
}
countBubbles.each( function() {
$( this ).closest( "li" ).addClass( "ui-li-has-count" );
});
if ( countThemeClass ) {
countBubbles.not( "[class*='ui-body-']" ).addClass( countThemeClass );
}
this._addThumbClasses( li );
this._addThumbClasses( li.find( ".ui-btn" ) );
this._afterListviewRefresh();
this._addFirstLastClasses( li, this._getVisibles( li, create ), create );
}
}, $.mobile.behaviors.addFirstLastClasses ) );
})( jQuery );
(function( $, undefined ) {
function defaultAutodividersSelector( elt ) {
var text = $.trim( elt.text() ) || null;
if ( !text ) {
return null;
}
text = text.slice( 0, 1 ).toUpperCase();
return text;
}
$.widget( "mobile.listview", $.mobile.listview, {
options: {
autodividers: false,
autodividersSelector: defaultAutodividersSelector
},
_beforeListviewRefresh: function() {
if ( this.options.autodividers ) {
this._replaceDividers();
this._superApply( arguments );
}
},
_replaceDividers: function() {
var i, lis, li, dividerText,
lastDividerText = null,
list = this.element,
divider;
list.children( "li:jqmData(role='list-divider')" ).remove();
lis = list.children( "li" );
for ( i = 0; i < lis.length ; i++ ) {
li = lis[ i ];
dividerText = this.options.autodividersSelector( $( li ) );
if ( dividerText && lastDividerText !== dividerText ) {
divider = document.createElement( "li" );
divider.appendChild( document.createTextNode( dividerText ) );
divider.setAttribute( "data-" + $.mobile.ns + "role", "list-divider" );
li.parentNode.insertBefore( divider, li );
}
lastDividerText = dividerText;
}
}
});
})( jQuery );
(function( $, undefined ) {
var rdivider = /(^|\s)ui-li-divider($|\s)/,
rhidden = /(^|\s)ui-screen-hidden($|\s)/;
$.widget( "mobile.listview", $.mobile.listview, {
options: {
hideDividers: false
},
_afterListviewRefresh: function() {
var items, idx, item, hideDivider = true;
this._superApply( arguments );
if ( this.options.hideDividers ) {
items = this._getChildrenByTagName( this.element[ 0 ], "li", "LI" );
for ( idx = items.length - 1 ; idx > -1 ; idx-- ) {
item = items[ idx ];
if ( item.className.match( rdivider ) ) {
if ( hideDivider ) {
item.className = item.className + " ui-screen-hidden";
}
hideDivider = true;
} else {
if ( !item.className.match( rhidden ) ) {
hideDivider = false;
}
}
}
}
}
});
})( jQuery );
(function( $, undefined ) {
$.mobile.nojs = function( target ) {
$( ":jqmData(role='nojs')", target ).addClass( "ui-nojs" );
};
})( jQuery );
(function( $, undefined ) {
$.mobile.behaviors.formReset = {
_handleFormReset: function() {
this._on( this.element.closest( "form" ), {
reset: function() {
this._delay( "_reset" );
}
});
}
};
})( jQuery );
/*
* "checkboxradio" plugin
*/
(function( $, undefined ) {
var escapeId = $.mobile.path.hashToSelector;
$.widget( "mobile.checkboxradio", $.extend( {
initSelector: "input:not( :jqmData(role='flipswitch' ) )[type='checkbox'],input[type='radio']:not( :jqmData(role='flipswitch' ))",
options: {
theme: "inherit",
mini: false,
wrapperClass: null,
enhanced: false,
iconpos: "left"
},
_create: function() {
var input = this.element,
o = this.options,
inheritAttr = function( input, dataAttr ) {
return input.jqmData( dataAttr ) ||
input.closest( "form, fieldset" ).jqmData( dataAttr );
},
label = this.options.enhanced ?
{
element: this.element.siblings( "label" ),
isParent: false
} :
this._findLabel(),
inputtype = input[0].type,
checkedClass = "ui-" + inputtype + "-on",
uncheckedClass = "ui-" + inputtype + "-off";
if ( inputtype !== "checkbox" && inputtype !== "radio" ) {
return;
}
if ( this.element[0].disabled ) {
this.options.disabled = true;
}
o.iconpos = inheritAttr( input, "iconpos" ) ||
label.element.attr( "data-" + $.mobile.ns + "iconpos" ) || o.iconpos,
o.mini = inheritAttr( input, "mini" ) || o.mini;
$.extend( this, {
input: input,
label: label.element,
labelIsParent: label.isParent,
inputtype: inputtype,
checkedClass: checkedClass,
uncheckedClass: uncheckedClass
});
if ( !this.options.enhanced ) {
this._enhance();
}
this._on( label.element, {
vmouseover: "_handleLabelVMouseOver",
vclick: "_handleLabelVClick"
});
this._on( input, {
vmousedown: "_cacheVals",
vclick: "_handleInputVClick",
focus: "_handleInputFocus",
blur: "_handleInputBlur"
});
this._handleFormReset();
this.refresh();
},
_findLabel: function() {
var parentLabel, label, isParent,
input = this.element,
labelsList = input[ 0 ].labels;
if( labelsList && labelsList.length > 0 ) {
label = $( labelsList[ 0 ] );
isParent = $.contains( label[ 0 ], input[ 0 ] );
} else {
parentLabel = input.closest( "label" );
isParent = ( parentLabel.length > 0 );
label = isParent ? parentLabel :
$( this.document[ 0 ].getElementsByTagName( "label" ) )
.filter( "[for='" + escapeId( input[ 0 ].id ) + "']" )
.first();
}
return {
element: label,
isParent: isParent
};
},
_enhance: function() {
this.label.addClass( "ui-btn ui-corner-all");
if ( this.labelIsParent ) {
this.input.add( this.label ).wrapAll( this._wrapper() );
} else {
this.element.wrap( this._wrapper() );
this.element.parent().prepend( this.label );
}
this._setOptions({
"theme": this.options.theme,
"iconpos": this.options.iconpos,
"mini": this.options.mini
});
},
_wrapper: function() {
return $( "<div class='" +
( this.options.wrapperClass ? this.options.wrapperClass : "" ) +
" ui-" + this.inputtype +
( this.options.disabled ? " ui-state-disabled" : "" ) + "' ></div>" );
},
_handleInputFocus: function() {
this.label.addClass( $.mobile.focusClass );
},
_handleInputBlur: function() {
this.label.removeClass( $.mobile.focusClass );
},
_handleInputVClick: function() {
this.element.prop( "checked", this.element.is( ":checked" ) );
this._getInputSet().not( this.element ).prop( "checked", false );
this._updateAll( true );
},
_handleLabelVMouseOver: function( event ) {
if ( this.label.parent().hasClass( "ui-state-disabled" ) ) {
event.stopPropagation();
}
},
_handleLabelVClick: function( event ) {
var input = this.element;
if ( input.is( ":disabled" ) ) {
event.preventDefault();
return;
}
this._cacheVals();
input.prop( "checked", this.inputtype === "radio" && true || !input.prop( "checked" ) );
input.triggerHandler( "click" );
this._getInputSet().not( input ).prop( "checked", false );
this._updateAll();
return false;
},
_cacheVals: function() {
this._getInputSet().each( function() {
$( this ).attr("data-" + $.mobile.ns + "cacheVal", this.checked );
});
},
_getInputSet: function() {
var selector, formId,
radio = this.element[ 0 ],
name = radio.name,
form = radio.form,
doc = this.element.parents().last().get( 0 ),
radios = this.element;
if ( name && this.inputtype === "radio" && doc ) {
selector = "input[type='radio'][name='" + escapeId( name ) + "']";
if ( form ) {
formId = form.getAttribute( "id" );
if ( formId ) {
radios = $( selector + "[form='" + escapeId( formId ) + "']", doc );
}
radios = $( form ).find( selector ).filter( function() {
return ( this.form === form );
}).add( radios );
} else {
radios = $( selector, doc ).filter( function() {
return !this.form;
});
}
}
return radios;
},
_updateAll: function( changeTriggered ) {
var self = this;
this._getInputSet().each( function() {
var $this = $( this );
if ( ( this.checked || self.inputtype === "checkbox" ) && !changeTriggered ) {
$this.trigger( "change" );
}
})
.checkboxradio( "refresh" );
},
_reset: function() {
this.refresh();
},
_hasIcon: function() {
var controlgroup, controlgroupWidget,
controlgroupConstructor = $.mobile.controlgroup;
if ( controlgroupConstructor ) {
controlgroup = this.element.closest(
":mobile-controlgroup," +
controlgroupConstructor.prototype.initSelector );
if ( controlgroup.length > 0 ) {
controlgroupWidget = $.data( controlgroup[ 0 ], "mobile-controlgroup" );
return ( ( controlgroupWidget ? controlgroupWidget.options.type :
controlgroup.attr( "data-" + $.mobile.ns + "type" ) ) !== "horizontal" );
}
}
return true;
},
refresh: function() {
var isChecked = this.element[ 0 ].checked,
active = $.mobile.activeBtnClass,
iconposClass = "ui-btn-icon-" + this.options.iconpos,
addClasses = [],
removeClasses = [];
if ( this._hasIcon() ) {
removeClasses.push( active );
addClasses.push( iconposClass );
} else {
removeClasses.push( iconposClass );
( isChecked ? addClasses : removeClasses ).push( active );
}
if ( isChecked ) {
addClasses.push( this.checkedClass );
removeClasses.push( this.uncheckedClass );
} else {
addClasses.push( this.uncheckedClass );
removeClasses.push( this.checkedClass );
}
this.widget().toggleClass( "ui-state-disabled", this.element.prop( "disabled" ) );
this.label
.addClass( addClasses.join( " " ) )
.removeClass( removeClasses.join( " " ) );
},
widget: function() {
return this.label.parent();
},
_setOptions: function( options ) {
var label = this.label,
currentOptions = this.options,
outer = this.widget(),
hasIcon = this._hasIcon();
if ( options.disabled !== undefined ) {
this.input.prop( "disabled", !!options.disabled );
outer.toggleClass( "ui-state-disabled", !!options.disabled );
}
if ( options.mini !== undefined ) {
outer.toggleClass( "ui-mini", !!options.mini );
}
if ( options.theme !== undefined ) {
label
.removeClass( "ui-btn-" + currentOptions.theme )
.addClass( "ui-btn-" + options.theme );
}
if ( options.wrapperClass !== undefined ) {
outer
.removeClass( currentOptions.wrapperClass )
.addClass( options.wrapperClass );
}
if ( options.iconpos !== undefined && hasIcon ) {
label.removeClass( "ui-btn-icon-" + currentOptions.iconpos ).addClass( "ui-btn-icon-" + options.iconpos );
} else if ( !hasIcon ) {
label.removeClass( "ui-btn-icon-" + currentOptions.iconpos );
}
this._super( options );
}
}, $.mobile.behaviors.formReset ) );
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.button", {
initSelector: "input[type='button'], input[type='submit'], input[type='reset']",
options: {
theme: null,
icon: null,
iconpos: "left",
iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
corners: true,
shadow: true,
inline: null,
mini: null,
wrapperClass: null,
enhanced: false
},
_create: function() {
if ( this.element.is( ":disabled" ) ) {
this.options.disabled = true;
}
if ( !this.options.enhanced ) {
this._enhance();
}
$.extend( this, {
wrapper: this.element.parent()
});
this._on( {
focus: function() {
this.widget().addClass( $.mobile.focusClass );
},
blur: function() {
this.widget().removeClass( $.mobile.focusClass );
}
});
this.refresh( true );
},
_enhance: function() {
this.element.wrap( this._button() );
},
_button: function() {
var options = this.options,
iconClasses = this._getIconClasses( this.options );
return $("<div class='ui-btn ui-input-btn" +
( options.wrapperClass ? " " + options.wrapperClass : "" ) +
( options.theme ? " ui-btn-" + options.theme : "" ) +
( options.corners ? " ui-corner-all" : "" ) +
( options.shadow ? " ui-shadow" : "" ) +
( options.inline ? " ui-btn-inline" : "" ) +
( options.mini ? " ui-mini" : "" ) +
( options.disabled ? " ui-state-disabled" : "" ) +
( iconClasses ? ( " " + iconClasses ) : "" ) +
"' >" + this.element.val() + "</div>" );
},
widget: function() {
return this.wrapper;
},
_destroy: function() {
this.element.insertBefore( this.wrapper );
this.wrapper.remove();
},
_getIconClasses: function( options ) {
return ( options.icon ? ( "ui-icon-" + options.icon +
( options.iconshadow ? " ui-shadow-icon" : "" ) + /* TODO: Deprecated in 1.4, remove in 1.5. */
" ui-btn-icon-" + options.iconpos ) : "" );
},
_setOptions: function( options ) {
var outer = this.widget();
if ( options.theme !== undefined ) {
outer
.removeClass( this.options.theme )
.addClass( "ui-btn-" + options.theme );
}
if ( options.corners !== undefined ) {
outer.toggleClass( "ui-corner-all", options.corners );
}
if ( options.shadow !== undefined ) {
outer.toggleClass( "ui-shadow", options.shadow );
}
if ( options.inline !== undefined ) {
outer.toggleClass( "ui-btn-inline", options.inline );
}
if ( options.mini !== undefined ) {
outer.toggleClass( "ui-mini", options.mini );
}
if ( options.disabled !== undefined ) {
this.element.prop( "disabled", options.disabled );
outer.toggleClass( "ui-state-disabled", options.disabled );
}
if ( options.icon !== undefined ||
options.iconshadow !== undefined || /* TODO: Deprecated in 1.4, remove in 1.5. */
options.iconpos !== undefined ) {
outer
.removeClass( this._getIconClasses( this.options ) )
.addClass( this._getIconClasses(
$.extend( {}, this.options, options ) ) );
}
this._super( options );
},
refresh: function( create ) {
var originalElement,
isDisabled = this.element.prop( "disabled" );
if ( this.options.icon && this.options.iconpos === "notext" && this.element.attr( "title" ) ) {
this.element.attr( "title", this.element.val() );
}
if ( !create ) {
originalElement = this.element.detach();
$( this.wrapper ).text( this.element.val() ).append( originalElement );
}
if ( this.options.disabled !== isDisabled ) {
this._setOptions({ disabled: isDisabled });
}
}
});
})( jQuery );
(function( $ ) {
var meta = $( "meta[name=viewport]" ),
initialContent = meta.attr( "content" ),
disabledZoom = initialContent + ",maximum-scale=1, user-scalable=no",
enabledZoom = initialContent + ",maximum-scale=10, user-scalable=yes",
disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test( initialContent );
$.mobile.zoom = $.extend( {}, {
enabled: !disabledInitially,
locked: false,
disable: function( lock ) {
if ( !disabledInitially && !$.mobile.zoom.locked ) {
meta.attr( "content", disabledZoom );
$.mobile.zoom.enabled = false;
$.mobile.zoom.locked = lock || false;
}
},
enable: function( unlock ) {
if ( !disabledInitially && ( !$.mobile.zoom.locked || unlock === true ) ) {
meta.attr( "content", enabledZoom );
$.mobile.zoom.enabled = true;
$.mobile.zoom.locked = false;
}
},
restore: function() {
if ( !disabledInitially ) {
meta.attr( "content", initialContent );
$.mobile.zoom.enabled = true;
}
}
});
}( jQuery ));
(function( $, undefined ) {
$.widget( "mobile.textinput", {
initSelector: "input[type='text']," +
"input[type='search']," +
":jqmData(type='search')," +
"input[type='number']," +
":jqmData(type='number')," +
"input[type='password']," +
"input[type='email']," +
"input[type='url']," +
"input[type='tel']," +
"textarea," +
"input[type='time']," +
"input[type='date']," +
"input[type='month']," +
"input[type='week']," +
"input[type='datetime']," +
"input[type='datetime-local']," +
"input[type='color']," +
"input:not([type])," +
"input[type='file']",
options: {
theme: null,
corners: true,
mini: false,
preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
wrapperClass: "",
enhanced: false
},
_create: function() {
var options = this.options,
isSearch = this.element.is( "[type='search'], :jqmData(type='search')" ),
isTextarea = this.element[ 0 ].tagName === "TEXTAREA",
isRange = this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='range']" ),
inputNeedsWrap = ( (this.element.is( "input" ) ||
this.element.is( "[data-" + ( $.mobile.ns || "" ) + "type='search']" ) ) &&
!isRange );
if ( this.element.prop( "disabled" ) ) {
options.disabled = true;
}
$.extend( this, {
classes: this._classesFromOptions(),
isSearch: isSearch,
isTextarea: isTextarea,
isRange: isRange,
inputNeedsWrap: inputNeedsWrap
});
this._autoCorrect();
if ( !options.enhanced ) {
this._enhance();
}
this._on( {
"focus": "_handleFocus",
"blur": "_handleBlur"
});
},
refresh: function() {
this.setOptions({
"disabled" : this.element.is( ":disabled" )
});
},
_enhance: function() {
var elementClasses = [];
if ( this.isTextarea ) {
elementClasses.push( "ui-input-text" );
}
if ( this.isTextarea || this.isRange ) {
elementClasses.push( "ui-shadow-inset" );
}
if ( this.inputNeedsWrap ) {
this.element.wrap( this._wrap() );
} else {
elementClasses = elementClasses.concat( this.classes );
}
this.element.addClass( elementClasses.join( " " ) );
},
widget: function() {
return ( this.inputNeedsWrap ) ? this.element.parent() : this.element;
},
_classesFromOptions: function() {
var options = this.options,
classes = [];
classes.push( "ui-body-" + ( ( options.theme === null ) ? "inherit" : options.theme ) );
if ( options.corners ) {
classes.push( "ui-corner-all" );
}
if ( options.mini ) {
classes.push( "ui-mini" );
}
if ( options.disabled ) {
classes.push( "ui-state-disabled" );
}
if ( options.wrapperClass ) {
classes.push( options.wrapperClass );
}
return classes;
},
_wrap: function() {
return $( "<div class='" +
( this.isSearch ? "ui-input-search " : "ui-input-text " ) +
this.classes.join( " " ) + " " +
"ui-shadow-inset'></div>" );
},
_autoCorrect: function() {
if ( typeof this.element[0].autocorrect !== "undefined" &&
!$.support.touchOverflow ) {
this.element[0].setAttribute( "autocorrect", "off" );
this.element[0].setAttribute( "autocomplete", "off" );
}
},
_handleBlur: function() {
this.widget().removeClass( $.mobile.focusClass );
if ( this.options.preventFocusZoom ) {
$.mobile.zoom.enable( true );
}
},
_handleFocus: function() {
if ( this.options.preventFocusZoom ) {
$.mobile.zoom.disable( true );
}
this.widget().addClass( $.mobile.focusClass );
},
_setOptions: function ( options ) {
var outer = this.widget();
this._super( options );
if ( !( options.disabled === undefined &&
options.mini === undefined &&
options.corners === undefined &&
options.theme === undefined &&
options.wrapperClass === undefined ) ) {
outer.removeClass( this.classes.join( " " ) );
this.classes = this._classesFromOptions();
outer.addClass( this.classes.join( " " ) );
}
if ( options.disabled !== undefined ) {
this.element.prop( "disabled", !!options.disabled );
}
},
_destroy: function() {
if ( this.options.enhanced ) {
return;
}
if ( this.inputNeedsWrap ) {
this.element.unwrap();
}
this.element.removeClass( "ui-input-text " + this.classes.join( " " ) );
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.slider", $.extend( {
initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
widgetEventPrefix: "slide",
options: {
theme: null,
trackTheme: null,
corners: true,
mini: false,
highlight: false
},
_create: function() {
var self = this,
control = this.element,
trackTheme = this.options.trackTheme || $.mobile.getAttribute( control[ 0 ], "theme" ),
trackThemeClass = trackTheme ? " ui-bar-" + trackTheme : " ui-bar-inherit",
cornerClass = ( this.options.corners || control.jqmData( "corners" ) ) ? " ui-corner-all" : "",
miniClass = ( this.options.mini || control.jqmData( "mini" ) ) ? " ui-mini" : "",
cType = control[ 0 ].nodeName.toLowerCase(),
isToggleSwitch = ( cType === "select" ),
isRangeslider = control.parent().is( ":jqmData(role='rangeslider')" ),
selectClass = ( isToggleSwitch ) ? "ui-slider-switch" : "",
controlID = control.attr( "id" ),
$label = $( "[for='" + controlID + "']" ),
labelID = $label.attr( "id" ) || controlID + "-label",
min = !isToggleSwitch ? parseFloat( control.attr( "min" ) ) : 0,
max = !isToggleSwitch ? parseFloat( control.attr( "max" ) ) : control.find( "option" ).length-1,
step = window.parseFloat( control.attr( "step" ) || 1 ),
domHandle = document.createElement( "a" ),
handle = $( domHandle ),
domSlider = document.createElement( "div" ),
slider = $( domSlider ),
valuebg = this.options.highlight && !isToggleSwitch ? (function() {
var bg = document.createElement( "div" );
bg.className = "ui-slider-bg " + $.mobile.activeBtnClass;
return $( bg ).prependTo( slider );
})() : false,
options,
wrapper,
j, length,
i, optionsCount, origTabIndex,
side, activeClass, sliderImg;
$label.attr( "id", labelID );
this.isToggleSwitch = isToggleSwitch;
domHandle.setAttribute( "href", "#" );
domSlider.setAttribute( "role", "application" );
domSlider.className = [ this.isToggleSwitch ? "ui-slider ui-slider-track ui-shadow-inset " : "ui-slider-track ui-shadow-inset ", selectClass, trackThemeClass, cornerClass, miniClass ].join( "" );
domHandle.className = "ui-slider-handle";
domSlider.appendChild( domHandle );
handle.attr({
"role": "slider",
"aria-valuemin": min,
"aria-valuemax": max,
"aria-valuenow": this._value(),
"aria-valuetext": this._value(),
"title": this._value(),
"aria-labelledby": labelID
});
$.extend( this, {
slider: slider,
handle: handle,
control: control,
type: cType,
step: step,
max: max,
min: min,
valuebg: valuebg,
isRangeslider: isRangeslider,
dragging: false,
beforeStart: null,
userModified: false,
mouseMoved: false
});
if ( isToggleSwitch ) {
origTabIndex = control.attr( "tabindex" );
if ( origTabIndex ) {
handle.attr( "tabindex", origTabIndex );
}
control.attr( "tabindex", "-1" ).focus(function() {
$( this ).blur();
handle.focus();
});
wrapper = document.createElement( "div" );
wrapper.className = "ui-slider-inneroffset";
for ( j = 0, length = domSlider.childNodes.length; j < length; j++ ) {
wrapper.appendChild( domSlider.childNodes[j] );
}
domSlider.appendChild( wrapper );
handle.addClass( "ui-slider-handle-snapping" );
options = control.find( "option" );
for ( i = 0, optionsCount = options.length; i < optionsCount; i++ ) {
side = !i ? "b" : "a";
activeClass = !i ? "" : " " + $.mobile.activeBtnClass;
sliderImg = document.createElement( "span" );
sliderImg.className = [ "ui-slider-label ui-slider-label-", side, activeClass ].join( "" );
sliderImg.setAttribute( "role", "img" );
sliderImg.appendChild( document.createTextNode( options[i].innerHTML ) );
$( sliderImg ).prependTo( slider );
}
self._labels = $( ".ui-slider-label", slider );
}
control.addClass( isToggleSwitch ? "ui-slider-switch" : "ui-slider-input" );
this._on( control, {
"change": "_controlChange",
"keyup": "_controlKeyup",
"blur": "_controlBlur",
"vmouseup": "_controlVMouseUp"
});
slider.bind( "vmousedown", $.proxy( this._sliderVMouseDown, this ) )
.bind( "vclick", false );
this._on( document, { "vmousemove": "_preventDocumentDrag" });
this._on( slider.add( document ), { "vmouseup": "_sliderVMouseUp" });
slider.insertAfter( control );
if ( !isToggleSwitch && !isRangeslider ) {
wrapper = this.options.mini ? "<div class='ui-slider ui-mini'>" : "<div class='ui-slider'>";
control.add( slider ).wrapAll( wrapper );
}
this._on( this.handle, {
"vmousedown": "_handleVMouseDown",
"keydown": "_handleKeydown",
"keyup": "_handleKeyup"
});
this.handle.bind( "vclick", false );
this._handleFormReset();
this.refresh( undefined, undefined, true );
},
_setOptions: function( options ) {
if ( options.theme !== undefined ) {
this._setTheme( options.theme );
}
if ( options.trackTheme !== undefined ) {
this._setTrackTheme( options.trackTheme );
}
if ( options.corners !== undefined ) {
this._setCorners( options.corners );
}
if ( options.mini !== undefined ) {
this._setMini( options.mini );
}
if ( options.highlight !== undefined ) {
this._setHighlight( options.highlight );
}
if ( options.disabled !== undefined ) {
this._setDisabled( options.disabled );
}
this._super( options );
},
_controlChange: function( event ) {
if ( this._trigger( "controlchange", event ) === false ) {
return false;
}
if ( !this.mouseMoved ) {
this.refresh( this._value(), true );
}
},
_controlKeyup: function(/* event */) { // necessary?
this.refresh( this._value(), true, true );
},
_controlBlur: function(/* event */) {
this.refresh( this._value(), true );
},
_controlVMouseUp: function(/* event */) {
this._checkedRefresh();
},
_handleVMouseDown: function(/* event */) {
this.handle.focus();
},
_handleKeydown: function( event ) {
var index = this._value();
if ( this.options.disabled ) {
return;
}
switch ( event.keyCode ) {
case $.mobile.keyCode.HOME:
case $.mobile.keyCode.END:
case $.mobile.keyCode.PAGE_UP:
case $.mobile.keyCode.PAGE_DOWN:
case $.mobile.keyCode.UP:
case $.mobile.keyCode.RIGHT:
case $.mobile.keyCode.DOWN:
case $.mobile.keyCode.LEFT:
event.preventDefault();
if ( !this._keySliding ) {
this._keySliding = true;
this.handle.addClass( "ui-state-active" ); /* TODO: We don't use this class for styling. Do we need to add it? */
}
break;
}
switch ( event.keyCode ) {
case $.mobile.keyCode.HOME:
this.refresh( this.min );
break;
case $.mobile.keyCode.END:
this.refresh( this.max );
break;
case $.mobile.keyCode.PAGE_UP:
case $.mobile.keyCode.UP:
case $.mobile.keyCode.RIGHT:
this.refresh( index + this.step );
break;
case $.mobile.keyCode.PAGE_DOWN:
case $.mobile.keyCode.DOWN:
case $.mobile.keyCode.LEFT:
this.refresh( index - this.step );
break;
}
}, // remove active mark
_handleKeyup: function(/* event */) {
if ( this._keySliding ) {
this._keySliding = false;
this.handle.removeClass( "ui-state-active" ); /* See comment above. */
}
},
_sliderVMouseDown: function( event ) {
if ( this.options.disabled || !( event.which === 1 || event.which === 0 || event.which === undefined ) ) {
return false;
}
if ( this._trigger( "beforestart", event ) === false ) {
return false;
}
this.dragging = true;
this.userModified = false;
this.mouseMoved = false;
if ( this.isToggleSwitch ) {
this.beforeStart = this.element[0].selectedIndex;
}
this.refresh( event );
this._trigger( "start" );
return false;
},
_sliderVMouseUp: function() {
if ( this.dragging ) {
this.dragging = false;
if ( this.isToggleSwitch ) {
this.handle.addClass( "ui-slider-handle-snapping" );
if ( this.mouseMoved ) {
if ( this.userModified ) {
this.refresh( this.beforeStart === 0 ? 1 : 0 );
} else {
this.refresh( this.beforeStart );
}
} else {
this.refresh( this.beforeStart === 0 ? 1 : 0 );
}
}
this.mouseMoved = false;
this._trigger( "stop" );
return false;
}
},
_preventDocumentDrag: function( event ) {
if ( this._trigger( "drag", event ) === false) {
return false;
}
if ( this.dragging && !this.options.disabled ) {
this.mouseMoved = true;
if ( this.isToggleSwitch ) {
this.handle.removeClass( "ui-slider-handle-snapping" );
}
this.refresh( event );
this.userModified = this.beforeStart !== this.element[0].selectedIndex;
return false;
}
},
_checkedRefresh: function() {
if ( this.value !== this._value() ) {
this.refresh( this._value() );
}
},
_value: function() {
return this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat( this.element.val() ) ;
},
_reset: function() {
this.refresh( undefined, false, true );
},
refresh: function( val, isfromControl, preventInputUpdate ) {
var self = this,
parentTheme = $.mobile.getAttribute( this.element[ 0 ], "theme" ),
theme = this.options.theme || parentTheme,
themeClass = theme ? " ui-btn-" + theme : "",
trackTheme = this.options.trackTheme || parentTheme,
trackThemeClass = trackTheme ? " ui-bar-" + trackTheme : " ui-bar-inherit",
cornerClass = this.options.corners ? " ui-corner-all" : "",
miniClass = this.options.mini ? " ui-mini" : "",
left, width, data, tol,
pxStep, percent,
control, isInput, optionElements, min, max, step,
newval, valModStep, alignValue, percentPerStep,
handlePercent, aPercent, bPercent,
valueChanged;
self.slider[0].className = [ this.isToggleSwitch ? "ui-slider ui-slider-switch ui-slider-track ui-shadow-inset" : "ui-slider-track ui-shadow-inset", trackThemeClass, cornerClass, miniClass ].join( "" );
if ( this.options.disabled || this.element.prop( "disabled" ) ) {
this.disable();
}
this.value = this._value();
if ( this.options.highlight && !this.isToggleSwitch && this.slider.find( ".ui-slider-bg" ).length === 0 ) {
this.valuebg = (function() {
var bg = document.createElement( "div" );
bg.className = "ui-slider-bg " + $.mobile.activeBtnClass;
return $( bg ).prependTo( self.slider );
})();
}
this.handle.addClass( "ui-btn" + themeClass + " ui-shadow" );
control = this.element;
isInput = !this.isToggleSwitch;
optionElements = isInput ? [] : control.find( "option" );
min = isInput ? parseFloat( control.attr( "min" ) ) : 0;
max = isInput ? parseFloat( control.attr( "max" ) ) : optionElements.length - 1;
step = ( isInput && parseFloat( control.attr( "step" ) ) > 0 ) ? parseFloat( control.attr( "step" ) ) : 1;
if ( typeof val === "object" ) {
data = val;
tol = 8;
left = this.slider.offset().left;
width = this.slider.width();
pxStep = width/((max-min)/step);
if ( !this.dragging ||
data.pageX < left - tol ||
data.pageX > left + width + tol ) {
return;
}
if ( pxStep > 1 ) {
percent = ( ( data.pageX - left ) / width ) * 100;
} else {
percent = Math.round( ( ( data.pageX - left ) / width ) * 100 );
}
} else {
if ( val == null ) {
val = isInput ? parseFloat( control.val() || 0 ) : control[0].selectedIndex;
}
percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
}
if ( isNaN( percent ) ) {
return;
}
newval = ( percent / 100 ) * ( max - min ) + min;
valModStep = ( newval - min ) % step;
alignValue = newval - valModStep;
if ( Math.abs( valModStep ) * 2 >= step ) {
alignValue += ( valModStep > 0 ) ? step : ( -step );
}
percentPerStep = 100/((max-min)/step);
newval = parseFloat( alignValue.toFixed(5) );
if ( typeof pxStep === "undefined" ) {
pxStep = width / ( (max-min) / step );
}
if ( pxStep > 1 && isInput ) {
percent = ( newval - min ) * percentPerStep * ( 1 / step );
}
if ( percent < 0 ) {
percent = 0;
}
if ( percent > 100 ) {
percent = 100;
}
if ( newval < min ) {
newval = min;
}
if ( newval > max ) {
newval = max;
}
this.handle.css( "left", percent + "%" );
this.handle[0].setAttribute( "aria-valuenow", isInput ? newval : optionElements.eq( newval ).attr( "value" ) );
this.handle[0].setAttribute( "aria-valuetext", isInput ? newval : optionElements.eq( newval ).getEncodedText() );
this.handle[0].setAttribute( "title", isInput ? newval : optionElements.eq( newval ).getEncodedText() );
if ( this.valuebg ) {
this.valuebg.css( "width", percent + "%" );
}
if ( this._labels ) {
handlePercent = this.handle.width() / this.slider.width() * 100;
aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100;
bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );
this._labels.each(function() {
var ab = $( this ).hasClass( "ui-slider-label-a" );
$( this ).width( ( ab ? aPercent : bPercent ) + "%" );
});
}
if ( !preventInputUpdate ) {
valueChanged = false;
if ( isInput ) {
valueChanged = parseFloat( control.val() ) !== newval;
control.val( newval );
} else {
valueChanged = control[ 0 ].selectedIndex !== newval;
control[ 0 ].selectedIndex = newval;
}
if ( this._trigger( "beforechange", val ) === false) {
return false;
}
if ( !isfromControl && valueChanged ) {
control.trigger( "change" );
}
}
},
_setHighlight: function( value ) {
value = !!value;
if ( value ) {
this.options.highlight = !!value;
this.refresh();
} else if ( this.valuebg ) {
this.valuebg.remove();
this.valuebg = false;
}
},
_setTheme: function( value ) {
this.handle
.removeClass( "ui-btn-" + this.options.theme )
.addClass( "ui-btn-" + value );
var currentTheme = this.options.theme ? this.options.theme : "inherit",
newTheme = value ? value : "inherit";
this.control
.removeClass( "ui-body-" + currentTheme )
.addClass( "ui-body-" + newTheme );
},
_setTrackTheme: function( value ) {
var currentTrackTheme = this.options.trackTheme ? this.options.trackTheme : "inherit",
newTrackTheme = value ? value : "inherit";
this.slider
.removeClass( "ui-body-" + currentTrackTheme )
.addClass( "ui-body-" + newTrackTheme );
},
_setMini: function( value ) {
value = !!value;
if ( !this.isToggleSwitch && !this.isRangeslider ) {
this.slider.parent().toggleClass( "ui-mini", value );
this.element.toggleClass( "ui-mini", value );
}
this.slider.toggleClass( "ui-mini", value );
},
_setCorners: function( value ) {
this.slider.toggleClass( "ui-corner-all", value );
if ( !this.isToggleSwitch ) {
this.control.toggleClass( "ui-corner-all", value );
}
},
_setDisabled: function( value ) {
value = !!value;
this.element.prop( "disabled", value );
this.slider
.toggleClass( "ui-state-disabled", value )
.attr( "aria-disabled", value );
this.element.toggleClass( "ui-state-disabled", value );
}
}, $.mobile.behaviors.formReset ) );
})( jQuery );
(function( $, undefined ) {
var popup;
function getPopup() {
if ( !popup ) {
popup = $( "<div></div>", {
"class": "ui-slider-popup ui-shadow ui-corner-all"
});
}
return popup.clone();
}
$.widget( "mobile.slider", $.mobile.slider, {
options: {
popupEnabled: false,
showValue: false
},
_create: function() {
this._super();
$.extend( this, {
_currentValue: null,
_popup: null,
_popupVisible: false
});
this._setOption( "popupEnabled", this.options.popupEnabled );
this._on( this.handle, { "vmousedown" : "_showPopup" } );
this._on( this.slider.add( this.document ), { "vmouseup" : "_hidePopup" } );
this._refresh();
},
_positionPopup: function() {
var dstOffset = this.handle.offset();
this._popup.offset( {
left: dstOffset.left + ( this.handle.width() - this._popup.width() ) / 2,
top: dstOffset.top - this._popup.outerHeight() - 5
});
},
_setOption: function( key, value ) {
this._super( key, value );
if ( key === "showValue" ) {
this.handle.html( value && !this.options.mini ? this._value() : "" );
} else if ( key === "popupEnabled" ) {
if ( value && !this._popup ) {
this._popup = getPopup()
.addClass( "ui-body-" + ( this.options.theme || "a" ) )
.hide()
.insertBefore( this.element );
}
}
},
refresh: function() {
this._super.apply( this, arguments );
this._refresh();
},
_refresh: function() {
var o = this.options, newValue;
if ( o.popupEnabled ) {
this.handle.removeAttr( "title" );
}
newValue = this._value();
if ( newValue === this._currentValue ) {
return;
}
this._currentValue = newValue;
if ( o.popupEnabled && this._popup ) {
this._positionPopup();
this._popup.html( newValue );
}
if ( o.showValue && !this.options.mini ) {
this.handle.html( newValue );
}
},
_showPopup: function() {
if ( this.options.popupEnabled && !this._popupVisible ) {
this.handle.html( "" );
this._popup.show();
this._positionPopup();
this._popupVisible = true;
}
},
_hidePopup: function() {
var o = this.options;
if ( o.popupEnabled && this._popupVisible ) {
if ( o.showValue && !o.mini ) {
this.handle.html( this._value() );
}
this._popup.hide();
this._popupVisible = false;
}
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.flipswitch", $.extend({
options: {
onText: "On",
offText: "Off",
theme: null,
enhanced: false,
wrapperClass: null,
corners: true,
mini: false
},
_create: function() {
if ( !this.options.enhanced ) {
this._enhance();
} else {
$.extend( this, {
flipswitch: this.element.parent(),
on: this.element.find( ".ui-flipswitch-on" ).eq( 0 ),
off: this.element.find( ".ui-flipswitch-off" ).eq(0),
type: this.element.get( 0 ).tagName
});
}
this._handleFormReset();
this._originalTabIndex = this.element.attr( "tabindex" );
if ( this._originalTabIndex != null ) {
this.on.attr( "tabindex", this._originalTabIndex );
}
this.element.attr( "tabindex", "-1" );
this._on({
"focus" : "_handleInputFocus"
});
if ( this.element.is( ":disabled" ) ) {
this._setOptions({
"disabled": true
});
}
this._on( this.flipswitch, {
"click": "_toggle",
"swipeleft": "_left",
"swiperight": "_right"
});
this._on( this.on, {
"keydown": "_keydown"
});
this._on( {
"change": "refresh"
});
},
_handleInputFocus: function() {
this.on.focus();
},
widget: function() {
return this.flipswitch;
},
_left: function() {
this.flipswitch.removeClass( "ui-flipswitch-active" );
if ( this.type === "SELECT" ) {
this.element.get( 0 ).selectedIndex = 0;
} else {
this.element.prop( "checked", false );
}
this.element.trigger( "change" );
},
_right: function() {
this.flipswitch.addClass( "ui-flipswitch-active" );
if ( this.type === "SELECT" ) {
this.element.get( 0 ).selectedIndex = 1;
} else {
this.element.prop( "checked", true );
}
this.element.trigger( "change" );
},
_enhance: function() {
var flipswitch = $( "<div>" ),
options = this.options,
element = this.element,
theme = options.theme ? options.theme : "inherit",
on = $( "<a></a>", {
"href": "#"
}),
off = $( "<span></span>" ),
type = element.get( 0 ).tagName,
onText = ( type === "INPUT" ) ?
options.onText : element.find( "option" ).eq( 1 ).text(),
offText = ( type === "INPUT" ) ?
options.offText : element.find( "option" ).eq( 0 ).text();
on
.addClass( "ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit" )
.text( onText );
off
.addClass( "ui-flipswitch-off" )
.text( offText );
flipswitch
.addClass( "ui-flipswitch ui-shadow-inset " +
"ui-bar-" + theme + " " +
( options.wrapperClass ? options.wrapperClass : "" ) + " " +
( ( element.is( ":checked" ) ||
element
.find( "option" )
.eq( 1 )
.is( ":selected" ) ) ? "ui-flipswitch-active" : "" ) +
( element.is(":disabled") ? " ui-state-disabled": "") +
( options.corners ? " ui-corner-all": "" ) +
( options.mini ? " ui-mini": "" ) )
.append( on, off );
element
.addClass( "ui-flipswitch-input" )
.after( flipswitch )
.appendTo( flipswitch );
$.extend( this, {
flipswitch: flipswitch,
on: on,
off: off,
type: type
});
},
_reset: function() {
this.refresh();
},
refresh: function() {
var direction,
existingDirection = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_right" : "_left";
if ( this.type === "SELECT" ) {
direction = ( this.element.get( 0 ).selectedIndex > 0 ) ? "_right": "_left";
} else {
direction = this.element.prop( "checked" ) ? "_right": "_left";
}
if ( direction !== existingDirection ) {
this[ direction ]();
}
},
_toggle: function() {
var direction = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_left" : "_right";
this[ direction ]();
},
_keydown: function( e ) {
if ( e.which === $.mobile.keyCode.LEFT ) {
this._left();
} else if ( e.which === $.mobile.keyCode.RIGHT ) {
this._right();
} else if ( e.which === $.mobile.keyCode.SPACE ) {
this._toggle();
e.preventDefault();
}
},
_setOptions: function( options ) {
if ( options.theme !== undefined ) {
var currentTheme = options.theme ? options.theme : "inherit",
newTheme = options.theme ? options.theme : "inherit";
this.widget()
.removeClass( "ui-bar-" + currentTheme )
.addClass( "ui-bar-" + newTheme );
}
if ( options.onText !== undefined ) {
this.on.text( options.onText );
}
if ( options.offText !== undefined ) {
this.off.text( options.offText );
}
if ( options.disabled !== undefined ) {
this.widget().toggleClass( "ui-state-disabled", options.disabled );
}
if ( options.mini !== undefined ) {
this.widget().toggleClass( "ui-mini", options.mini );
}
if ( options.corners !== undefined ) {
this.widget().toggleClass( "ui-corner-all", options.corners );
}
this._super( options );
},
_destroy: function() {
if ( this.options.enhanced ) {
return;
}
if ( this._originalTabIndex != null ) {
this.element.attr( "tabindex", this._originalTabIndex );
} else {
this.element.removeAttr( "tabindex" );
}
this.on.remove();
this.off.remove();
this.element.unwrap();
this.flipswitch.remove();
this.removeClass( "ui-flipswitch-input" );
}
}, $.mobile.behaviors.formReset ) );
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.rangeslider", $.extend( {
options: {
theme: null,
trackTheme: null,
corners: true,
mini: false,
highlight: true
},
_create: function() {
var $el = this.element,
elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
_inputFirst = $el.find( "input" ).first(),
_inputLast = $el.find( "input" ).last(),
_label = $el.find( "label" ).first(),
_sliderWidgetFirst = $.data( _inputFirst.get( 0 ), "mobile-slider" ) ||
$.data( _inputFirst.slider().get( 0 ), "mobile-slider" ),
_sliderWidgetLast = $.data( _inputLast.get(0), "mobile-slider" ) ||
$.data( _inputLast.slider().get( 0 ), "mobile-slider" ),
_sliderFirst = _sliderWidgetFirst.slider,
_sliderLast = _sliderWidgetLast.slider,
firstHandle = _sliderWidgetFirst.handle,
_sliders = $( "<div class='ui-rangeslider-sliders' />" ).appendTo( $el );
_inputFirst.addClass( "ui-rangeslider-first" );
_inputLast.addClass( "ui-rangeslider-last" );
$el.addClass( elClass );
_sliderFirst.appendTo( _sliders );
_sliderLast.appendTo( _sliders );
_label.insertBefore( $el );
firstHandle.prependTo( _sliderLast );
$.extend( this, {
_inputFirst: _inputFirst,
_inputLast: _inputLast,
_sliderFirst: _sliderFirst,
_sliderLast: _sliderLast,
_label: _label,
_targetVal: null,
_sliderTarget: false,
_sliders: _sliders,
_proxy: false
});
this.refresh();
this._on( this.element.find( "input.ui-slider-input" ), {
"slidebeforestart": "_slidebeforestart",
"slidestop": "_slidestop",
"slidedrag": "_slidedrag",
"slidebeforechange": "_change",
"blur": "_change",
"keyup": "_change"
});
this._on({
"mousedown":"_change"
});
this._on( this.element.closest( "form" ), {
"reset":"_handleReset"
});
this._on( firstHandle, {
"vmousedown": "_dragFirstHandle"
});
},
_handleReset: function() {
var self = this;
setTimeout( function() {
self._updateHighlight();
},0);
},
_dragFirstHandle: function( event ) {
$.data( this._inputFirst.get(0), "mobile-slider" ).dragging = true;
$.data( this._inputFirst.get(0), "mobile-slider" ).refresh( event );
$.data( this._inputFirst.get(0), "mobile-slider" )._trigger( "start" );
return false;
},
_slidedrag: function( event ) {
var first = $( event.target ).is( this._inputFirst ),
otherSlider = ( first ) ? this._inputLast : this._inputFirst;
this._sliderTarget = false;
if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
$.data( otherSlider.get(0), "mobile-slider" ).dragging = true;
$.data( otherSlider.get(0), "mobile-slider" ).refresh( event );
return false;
}
},
_slidestop: function( event ) {
var first = $( event.target ).is( this._inputFirst );
this._proxy = false;
this.element.find( "input" ).trigger( "vmouseup" );
this._sliderFirst.css( "z-index", first ? 1 : "" );
},
_slidebeforestart: function( event ) {
this._sliderTarget = false;
if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
this._sliderTarget = true;
this._targetVal = $( event.target ).val();
}
},
_setOptions: function( options ) {
if ( options.theme !== undefined ) {
this._setTheme( options.theme );
}
if ( options.trackTheme !== undefined ) {
this._setTrackTheme( options.trackTheme );
}
if ( options.mini !== undefined ) {
this._setMini( options.mini );
}
if ( options.highlight !== undefined ) {
this._setHighlight( options.highlight );
}
if ( options.disabled !== undefined ) {
this._setDisabled( options.disabled );
}
this._super( options );
this.refresh();
},
refresh: function() {
var $el = this.element,
o = this.options;
if ( this._inputFirst.is( ":disabled" ) || this._inputLast.is( ":disabled" ) ) {
this.options.disabled = true;
}
$el.find( "input" ).slider({
theme: o.theme,
trackTheme: o.trackTheme,
disabled: o.disabled,
corners: o.corners,
mini: o.mini,
highlight: o.highlight
}).slider( "refresh" );
this._updateHighlight();
},
_change: function( event ) {
if ( event.type === "keyup" ) {
this._updateHighlight();
return false;
}
var self = this,
min = parseFloat( this._inputFirst.val(), 10 ),
max = parseFloat( this._inputLast.val(), 10 ),
first = $( event.target ).hasClass( "ui-rangeslider-first" ),
thisSlider = first ? this._inputFirst : this._inputLast,
otherSlider = first ? this._inputLast : this._inputFirst;
if ( ( this._inputFirst.val() > this._inputLast.val() && event.type === "mousedown" && !$(event.target).hasClass("ui-slider-handle")) ) {
thisSlider.blur();
} else if ( event.type === "mousedown" ) {
return;
}
if ( min > max && !this._sliderTarget ) {
thisSlider.val( first ? max: min ).slider( "refresh" );
this._trigger( "normalize" );
} else if ( min > max ) {
thisSlider.val( this._targetVal ).slider( "refresh" );
setTimeout( function() {
otherSlider.val( first ? min: max ).slider( "refresh" );
$.data( otherSlider.get(0), "mobile-slider" ).handle.focus();
self._sliderFirst.css( "z-index", first ? "" : 1 );
self._trigger( "normalize" );
}, 0 );
this._proxy = ( first ) ? "first" : "last";
}
if ( min === max ) {
$.data( thisSlider.get(0), "mobile-slider" ).handle.css( "z-index", 1 );
$.data( otherSlider.get(0), "mobile-slider" ).handle.css( "z-index", 0 );
} else {
$.data( otherSlider.get(0), "mobile-slider" ).handle.css( "z-index", "" );
$.data( thisSlider.get(0), "mobile-slider" ).handle.css( "z-index", "" );
}
this._updateHighlight();
if ( min >= max ) {
return false;
}
},
_updateHighlight: function() {
var min = parseInt( $.data( this._inputFirst.get(0), "mobile-slider" ).handle.get(0).style.left, 10 ),
max = parseInt( $.data( this._inputLast.get(0), "mobile-slider" ).handle.get(0).style.left, 10 ),
width = (max - min);
this.element.find( ".ui-slider-bg" ).css({
"margin-left": min + "%",
"width": width + "%"
});
},
_setTheme: function( value ) {
this._inputFirst.slider( "option", "theme", value );
this._inputLast.slider( "option", "theme", value );
},
_setTrackTheme: function( value ) {
this._inputFirst.slider( "option", "trackTheme", value );
this._inputLast.slider( "option", "trackTheme", value );
},
_setMini: function( value ) {
this._inputFirst.slider( "option", "mini", value );
this._inputLast.slider( "option", "mini", value );
this.element.toggleClass( "ui-mini", !!value );
},
_setHighlight: function( value ) {
this._inputFirst.slider( "option", "highlight", value );
this._inputLast.slider( "option", "highlight", value );
},
_setDisabled: function( value ) {
this._inputFirst.prop( "disabled", value );
this._inputLast.prop( "disabled", value );
},
_destroy: function() {
this._label.prependTo( this.element );
this.element.removeClass( "ui-rangeslider ui-mini" );
this._inputFirst.after( this._sliderFirst );
this._inputLast.after( this._sliderLast );
this._sliders.remove();
this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
}
}, $.mobile.behaviors.formReset ) );
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.textinput", $.mobile.textinput, {
options: {
clearBtn: false,
clearBtnText: "Clear text"
},
_create: function() {
this._super();
if ( this.isSearch ) {
this.options.clearBtn = true;
}
if ( !!this.options.clearBtn && this.inputNeedsWrap ) {
this._addClearBtn();
}
},
clearButton: function() {
return $( "<a href='#' tabindex='-1' aria-hidden='true' " +
"class='ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all'>" +
"</a>" )
.attr( "title", this.options.clearBtnText )
.text( this.options.clearBtnText );
},
_clearBtnClick: function( event ) {
this.element.val( "" )
.focus()
.trigger( "change" );
this._clearBtn.addClass( "ui-input-clear-hidden" );
event.preventDefault();
},
_addClearBtn: function() {
if ( !this.options.enhanced ) {
this._enhanceClear();
}
$.extend( this, {
_clearBtn: this.widget().find("a.ui-input-clear")
});
this._bindClearEvents();
this._toggleClear();
},
_enhanceClear: function() {
this.clearButton().appendTo( this.widget() );
this.widget().addClass( "ui-input-has-clear" );
},
_bindClearEvents: function() {
this._on( this._clearBtn, {
"click": "_clearBtnClick"
});
this._on({
"keyup": "_toggleClear",
"change": "_toggleClear",
"input": "_toggleClear",
"focus": "_toggleClear",
"blur": "_toggleClear",
"cut": "_toggleClear",
"paste": "_toggleClear"
});
},
_unbindClear: function() {
this._off( this._clearBtn, "click");
this._off( this.element, "keyup change input focus blur cut paste" );
},
_setOptions: function( options ) {
this._super( options );
if ( options.clearBtn !== undefined &&
!this.element.is( "textarea, :jqmData(type='range')" ) ) {
if ( options.clearBtn ) {
this._addClearBtn();
} else {
this._destroyClear();
}
}
if ( options.clearBtnText !== undefined && this._clearBtn !== undefined ) {
this._clearBtn.text( options.clearBtnText )
.attr("title", options.clearBtnText);
}
},
_toggleClear: function() {
this._delay( "_toggleClearClass", 0 );
},
_toggleClearClass: function() {
this._clearBtn.toggleClass( "ui-input-clear-hidden", !this.element.val() );
},
_destroyClear: function() {
this.widget().removeClass( "ui-input-has-clear" );
this._unbindClear();
this._clearBtn.remove();
},
_destroy: function() {
this._super();
if ( this.options.clearBtn ) {
this._destroyClear();
}
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.textinput", $.mobile.textinput, {
options: {
autogrow:true,
keyupTimeoutBuffer: 100
},
_create: function() {
this._super();
if ( this.options.autogrow && this.isTextarea ) {
this._autogrow();
}
},
_autogrow: function() {
this.element.addClass( "ui-textinput-autogrow" );
this._on({
"keyup": "_timeout",
"change": "_timeout",
"input": "_timeout",
"paste": "_timeout"
});
this._on( true, this.document, {
"pageshow": "_handleShow",
"popupbeforeposition": "_handleShow",
"updatelayout": "_handleShow",
"panelopen": "_handleShow"
});
},
_handleShow: function( event ) {
if ( $.contains( event.target, this.element[ 0 ] ) &&
this.element.is( ":visible" ) ) {
if ( event.type !== "popupbeforeposition" ) {
this.element
.addClass( "ui-textinput-autogrow-resize" )
.animationComplete(
$.proxy( function() {
this.element.removeClass( "ui-textinput-autogrow-resize" );
}, this ),
"transition" );
}
this._prepareHeightUpdate();
}
},
_unbindAutogrow: function() {
this.element.removeClass( "ui-textinput-autogrow" );
this._off( this.element, "keyup change input paste" );
this._off( this.document,
"pageshow popupbeforeposition updatelayout panelopen" );
},
keyupTimeout: null,
_prepareHeightUpdate: function( delay ) {
if ( this.keyupTimeout ) {
clearTimeout( this.keyupTimeout );
}
if ( delay === undefined ) {
this._updateHeight();
} else {
this.keyupTimeout = this._delay( "_updateHeight", delay );
}
},
_timeout: function() {
this._prepareHeightUpdate( this.options.keyupTimeoutBuffer );
},
_updateHeight: function() {
var paddingTop, paddingBottom, paddingHeight, scrollHeight, clientHeight,
borderTop, borderBottom, borderHeight, height,
scrollTop = this.window.scrollTop();
this.keyupTimeout = 0;
if ( !( "onpage" in this.element[ 0 ] ) ) {
this.element.css({
"height": 0,
"min-height": 0,
"max-height": 0
});
}
scrollHeight = this.element[ 0 ].scrollHeight;
clientHeight = this.element[ 0 ].clientHeight;
borderTop = parseFloat( this.element.css( "border-top-width" ) );
borderBottom = parseFloat( this.element.css( "border-bottom-width" ) );
borderHeight = borderTop + borderBottom;
height = scrollHeight + borderHeight + 15;
if ( clientHeight === 0 ) {
paddingTop = parseFloat( this.element.css( "padding-top" ) );
paddingBottom = parseFloat( this.element.css( "padding-bottom" ) );
paddingHeight = paddingTop + paddingBottom;
height += paddingHeight;
}
this.element.css({
"height": height,
"min-height": "",
"max-height": ""
});
this.window.scrollTop( scrollTop );
},
refresh: function() {
if ( this.options.autogrow && this.isTextarea ) {
this._updateHeight();
}
},
_setOptions: function( options ) {
this._super( options );
if ( options.autogrow !== undefined && this.isTextarea ) {
if ( options.autogrow ) {
this._autogrow();
} else {
this._unbindAutogrow();
}
}
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.selectmenu", $.extend( {
initSelector: "select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",
options: {
theme: null,
icon: "carat-d",
iconpos: "right",
inline: false,
corners: true,
shadow: true,
iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
overlayTheme: null,
dividerTheme: null,
hidePlaceholderMenuItems: true,
closeText: "Close",
nativeMenu: true,
preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
mini: false
},
_button: function() {
return $( "<div/>" );
},
_setDisabled: function( value ) {
this.element.attr( "disabled", value );
this.button.attr( "aria-disabled", value );
return this._setOption( "disabled", value );
},
_focusButton : function() {
var self = this;
setTimeout( function() {
self.button.focus();
}, 40);
},
_selectOptions: function() {
return this.select.find( "option" );
},
_preExtension: function() {
var inline = this.options.inline || this.element.jqmData( "inline" ),
mini = this.options.mini || this.element.jqmData( "mini" ),
classes = "";
/* if ( $el[0].className.length ) {
classes = $el[0].className;
} */
if ( !!~this.element[0].className.indexOf( "ui-btn-left" ) ) {
classes = " ui-btn-left";
}
if ( !!~this.element[0].className.indexOf( "ui-btn-right" ) ) {
classes = " ui-btn-right";
}
if ( inline ) {
classes += " ui-btn-inline";
}
if ( mini ) {
classes += " ui-mini";
}
this.select = this.element.removeClass( "ui-btn-left ui-btn-right" ).wrap( "<div class='ui-select" + classes + "'>" );
this.selectId = this.select.attr( "id" ) || ( "select-" + this.uuid );
this.buttonId = this.selectId + "-button";
this.label = $( "label[for='"+ this.selectId +"']" );
this.isMultiple = this.select[ 0 ].multiple;
},
_destroy: function() {
var wrapper = this.element.parents( ".ui-select" );
if ( wrapper.length > 0 ) {
if ( wrapper.is( ".ui-btn-left, .ui-btn-right" ) ) {
this.element.addClass( wrapper.hasClass( "ui-btn-left" ) ? "ui-btn-left" : "ui-btn-right" );
}
this.element.insertAfter( wrapper );
wrapper.remove();
}
},
_create: function() {
this._preExtension();
this.button = this._button();
var self = this,
options = this.options,
iconpos = options.icon ? ( options.iconpos || this.select.jqmData( "iconpos" ) ) : false,
button = this.button
.insertBefore( this.select )
.attr( "id", this.buttonId )
.addClass( "ui-btn" +
( options.icon ? ( " ui-icon-" + options.icon + " ui-btn-icon-" + iconpos +
( options.iconshadow ? " ui-shadow-icon" : "" ) ) : "" ) + /* TODO: Remove in 1.5. */
( options.theme ? " ui-btn-" + options.theme : "" ) +
( options.corners ? " ui-corner-all" : "" ) +
( options.shadow ? " ui-shadow" : "" ) );
this.setButtonText();
if ( options.nativeMenu && window.opera && window.opera.version ) {
button.addClass( "ui-select-nativeonly" );
}
if ( this.isMultiple ) {
this.buttonCount = $( "<span>" )
.addClass( "ui-li-count ui-body-inherit" )
.hide()
.appendTo( button.addClass( "ui-li-has-count" ) );
}
if ( options.disabled || this.element.attr( "disabled" )) {
this.disable();
}
this.select.change(function() {
self.refresh();
if ( !!options.nativeMenu ) {
self._delay( function() {
self.select.blur();
});
}
});
this._handleFormReset();
this._on( this.button, {
keydown: "_handleKeydown"
});
this.build();
},
build: function() {
var self = this;
this.select
.appendTo( self.button )
.bind( "vmousedown", function() {
self.button.addClass( $.mobile.activeBtnClass );
})
.bind( "focus", function() {
self.button.addClass( $.mobile.focusClass );
})
.bind( "blur", function() {
self.button.removeClass( $.mobile.focusClass );
})
.bind( "focus vmouseover", function() {
self.button.trigger( "vmouseover" );
})
.bind( "vmousemove", function() {
self.button.removeClass( $.mobile.activeBtnClass );
})
.bind( "change blur vmouseout", function() {
self.button.trigger( "vmouseout" )
.removeClass( $.mobile.activeBtnClass );
});
self.button.bind( "vmousedown", function() {
if ( self.options.preventFocusZoom ) {
$.mobile.zoom.disable( true );
}
});
self.label.bind( "click focus", function() {
if ( self.options.preventFocusZoom ) {
$.mobile.zoom.disable( true );
}
});
self.select.bind( "focus", function() {
if ( self.options.preventFocusZoom ) {
$.mobile.zoom.disable( true );
}
});
self.button.bind( "mouseup", function() {
if ( self.options.preventFocusZoom ) {
setTimeout(function() {
$.mobile.zoom.enable( true );
}, 0 );
}
});
self.select.bind( "blur", function() {
if ( self.options.preventFocusZoom ) {
$.mobile.zoom.enable( true );
}
});
},
selected: function() {
return this._selectOptions().filter( ":selected" );
},
selectedIndices: function() {
var self = this;
return this.selected().map(function() {
return self._selectOptions().index( this );
}).get();
},
setButtonText: function() {
var self = this,
selected = this.selected(),
text = this.placeholder,
span = $( document.createElement( "span" ) );
this.button.children( "span" ).not( ".ui-li-count" ).remove().end().end().prepend( (function() {
if ( selected.length ) {
text = selected.map(function() {
return $( this ).text();
}).get().join( ", " );
} else {
text = self.placeholder;
}
if ( text ) {
span.text( text );
} else {
span.html( "&#160;" );
}
return span
.addClass( self.select.attr( "class" ) )
.addClass( selected.attr( "class" ) )
.removeClass( "ui-screen-hidden" );
})());
},
setButtonCount: function() {
var selected = this.selected();
if ( this.isMultiple ) {
this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
}
},
_handleKeydown: function( /* event */ ) {
this._delay( "_refreshButton" );
},
_reset: function() {
this.refresh();
},
_refreshButton: function() {
this.setButtonText();
this.setButtonCount();
},
refresh: function() {
this._refreshButton();
},
open: $.noop,
close: $.noop,
disable: function() {
this._setDisabled( true );
this.button.addClass( "ui-state-disabled" );
},
enable: function() {
this._setDisabled( false );
this.button.removeClass( "ui-state-disabled" );
}
}, $.mobile.behaviors.formReset ) );
})( jQuery );
(function( $, undefined ) {
$.mobile.links = function( target ) {
$( target )
.find( "a" )
.jqmEnhanceable()
.filter( ":jqmData(rel='popup')[href][href!='']" )
.each( function() {
var element = this,
idref = element.getAttribute( "href" ).substring( 1 );
if ( idref ) {
element.setAttribute( "aria-haspopup", true );
element.setAttribute( "aria-owns", idref );
element.setAttribute( "aria-expanded", false );
}
})
.end()
.not( ".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
.addClass( "ui-link" );
};
})( jQuery );
(function( $, undefined ) {
function fitSegmentInsideSegment( windowSize, segmentSize, offset, desired ) {
var returnValue = desired;
if ( windowSize < segmentSize ) {
returnValue = offset + ( windowSize - segmentSize ) / 2;
} else {
returnValue = Math.min( Math.max( offset, desired - segmentSize / 2 ), offset + windowSize - segmentSize );
}
return returnValue;
}
function getWindowCoordinates( theWindow ) {
return {
x: theWindow.scrollLeft(),
y: theWindow.scrollTop(),
cx: ( theWindow[ 0 ].innerWidth || theWindow.width() ),
cy: ( theWindow[ 0 ].innerHeight || theWindow.height() )
};
}
$.widget( "mobile.popup", {
options: {
wrapperClass: null,
theme: null,
overlayTheme: null,
shadow: true,
corners: true,
transition: "none",
positionTo: "origin",
tolerance: null,
closeLinkSelector: "a:jqmData(rel='back')",
closeLinkEvents: "click.popup",
navigateEvents: "navigate.popup",
closeEvents: "navigate.popup pagebeforechange.popup",
dismissible: true,
enhanced: false,
history: !$.mobile.browser.oldIE
},
_handleDocumentVmousedown: function( theEvent ) {
if ( this._isOpen && $.contains( this._ui.container[ 0 ], theEvent.target ) ) {
this._ignoreResizeEvents();
}
},
_create: function() {
var theElement = this.element,
myId = theElement.attr( "id" ),
currentOptions = this.options;
currentOptions.history = currentOptions.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;
this._on( this.document, {
"vmousedown": "_handleDocumentVmousedown"
});
$.extend( this, {
_scrollTop: 0,
_page: theElement.closest( ".ui-page" ),
_ui: null,
_fallbackTransition: "",
_currentTransition: false,
_prerequisites: null,
_isOpen: false,
_tolerance: null,
_resizeData: null,
_ignoreResizeTo: 0,
_orientationchangeInProgress: false
});
if ( this._page.length === 0 ) {
this._page = $( "body" );
}
if ( currentOptions.enhanced ) {
this._ui = {
container: theElement.parent(),
screen: theElement.parent().prev(),
placeholder: $( this.document[ 0 ].getElementById( myId + "-placeholder" ) )
};
} else {
this._ui = this._enhance( theElement, myId );
this._applyTransition( currentOptions.transition );
}
this
._setTolerance( currentOptions.tolerance )
._ui.focusElement = this._ui.container;
this._on( this._ui.screen, { "vclick": "_eatEventAndClose" } );
this._on( this.window, {
orientationchange: $.proxy( this, "_handleWindowOrientationchange" ),
resize: $.proxy( this, "_handleWindowResize" ),
keyup: $.proxy( this, "_handleWindowKeyUp" )
});
this._on( this.document, { "focusin": "_handleDocumentFocusIn" } );
},
_enhance: function( theElement, myId ) {
var currentOptions = this.options,
wrapperClass = currentOptions.wrapperClass,
ui = {
screen: $( "<div class='ui-screen-hidden ui-popup-screen " +
this._themeClassFromOption( "ui-overlay-", currentOptions.overlayTheme ) + "'></div>" ),
placeholder: $( "<div style='display: none;'></div>" ),
container: $( "<div class='ui-popup-container ui-popup-hidden ui-popup-truncate" +
( wrapperClass ? ( " " + wrapperClass ) : "" ) + "'></div>" )
},
fragment = this.document[ 0 ].createDocumentFragment();
fragment.appendChild( ui.screen[ 0 ] );
fragment.appendChild( ui.container[ 0 ] );
if ( myId ) {
ui.screen.attr( "id", myId + "-screen" );
ui.container.attr( "id", myId + "-popup" );
ui.placeholder
.attr( "id", myId + "-placeholder" )
.html( "" );
}
this._page[ 0 ].appendChild( fragment );
ui.placeholder.insertAfter( theElement );
theElement
.detach()
.addClass( "ui-popup " +
this._themeClassFromOption( "ui-body-", currentOptions.theme ) + " " +
( currentOptions.shadow ? "ui-overlay-shadow " : "" ) +
( currentOptions.corners ? "ui-corner-all " : "" ) )
.appendTo( ui.container );
return ui;
},
_eatEventAndClose: function( theEvent ) {
theEvent.preventDefault();
theEvent.stopImmediatePropagation();
if ( this.options.dismissible ) {
this.close();
}
return false;
},
_resizeScreen: function() {
var screen = this._ui.screen,
popupHeight = this._ui.container.outerHeight( true ),
screenHeight = screen.removeAttr( "style" ).height(),
documentHeight = this.document.height() - 1;
if ( screenHeight < documentHeight ) {
screen.height( documentHeight );
} else if ( popupHeight > screenHeight ) {
screen.height( popupHeight );
}
},
_handleWindowKeyUp: function( theEvent ) {
if ( this._isOpen && theEvent.keyCode === $.mobile.keyCode.ESCAPE ) {
return this._eatEventAndClose( theEvent );
}
},
_expectResizeEvent: function() {
var windowCoordinates = getWindowCoordinates( this.window );
if ( this._resizeData ) {
if ( windowCoordinates.x === this._resizeData.windowCoordinates.x &&
windowCoordinates.y === this._resizeData.windowCoordinates.y &&
windowCoordinates.cx === this._resizeData.windowCoordinates.cx &&
windowCoordinates.cy === this._resizeData.windowCoordinates.cy ) {
return false;
} else {
clearTimeout( this._resizeData.timeoutId );
}
}
this._resizeData = {
timeoutId: this._delay( "_resizeTimeout", 200 ),
windowCoordinates: windowCoordinates
};
return true;
},
_resizeTimeout: function() {
if ( this._isOpen ) {
if ( !this._expectResizeEvent() ) {
if ( this._ui.container.hasClass( "ui-popup-hidden" ) ) {
this._ui.container.removeClass( "ui-popup-hidden ui-popup-truncate" );
this.reposition( { positionTo: "window" } );
this._ignoreResizeEvents();
}
this._resizeScreen();
this._resizeData = null;
this._orientationchangeInProgress = false;
}
} else {
this._resizeData = null;
this._orientationchangeInProgress = false;
}
},
_stopIgnoringResizeEvents: function() {
this._ignoreResizeTo = 0;
},
_ignoreResizeEvents: function() {
if ( this._ignoreResizeTo ) {
clearTimeout( this._ignoreResizeTo );
}
this._ignoreResizeTo = this._delay( "_stopIgnoringResizeEvents", 1000 );
},
_handleWindowResize: function(/* theEvent */) {
if ( this._isOpen && this._ignoreResizeTo === 0 ) {
if ( ( this._expectResizeEvent() || this._orientationchangeInProgress ) &&
!this._ui.container.hasClass( "ui-popup-hidden" ) ) {
this._ui.container
.addClass( "ui-popup-hidden ui-popup-truncate" )
.removeAttr( "style" );
}
}
},
_handleWindowOrientationchange: function(/* theEvent */) {
if ( !this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0 ) {
this._expectResizeEvent();
this._orientationchangeInProgress = true;
}
},
_handleDocumentFocusIn: function( theEvent ) {
var target,
targetElement = theEvent.target,
ui = this._ui;
if ( !this._isOpen ) {
return;
}
if ( targetElement !== ui.container[ 0 ] ) {
target = $( targetElement );
if ( !$.contains( ui.container[ 0 ], targetElement ) ) {
$( this.document[ 0 ].activeElement ).one( "focus", $.proxy( function() {
this._safelyBlur( targetElement );
}, this ) );
ui.focusElement.focus();
theEvent.preventDefault();
theEvent.stopImmediatePropagation();
return false;
} else if ( ui.focusElement[ 0 ] === ui.container[ 0 ] ) {
ui.focusElement = target;
}
}
this._ignoreResizeEvents();
},
_themeClassFromOption: function( prefix, value ) {
return ( value ? ( value === "none" ? "" : ( prefix + value ) ) : ( prefix + "inherit" ) );
},
_applyTransition: function( value ) {
if ( value ) {
this._ui.container.removeClass( this._fallbackTransition );
if ( value !== "none" ) {
this._fallbackTransition = $.mobile._maybeDegradeTransition( value );
if ( this._fallbackTransition === "none" ) {
this._fallbackTransition = "";
}
this._ui.container.addClass( this._fallbackTransition );
}
}
return this;
},
_setOptions: function( newOptions ) {
var currentOptions = this.options,
theElement = this.element,
screen = this._ui.screen;
if ( newOptions.wrapperClass !== undefined ) {
this._ui.container
.removeClass( currentOptions.wrapperClass )
.addClass( newOptions.wrapperClass );
}
if ( newOptions.theme !== undefined ) {
theElement
.removeClass( this._themeClassFromOption( "ui-body-", currentOptions.theme ) )
.addClass( this._themeClassFromOption( "ui-body-", newOptions.theme ) );
}
if ( newOptions.overlayTheme !== undefined ) {
screen
.removeClass( this._themeClassFromOption( "ui-overlay-", currentOptions.overlayTheme ) )
.addClass( this._themeClassFromOption( "ui-overlay-", newOptions.overlayTheme ) );
if ( this._isOpen ) {
screen.addClass( "in" );
}
}
if ( newOptions.shadow !== undefined ) {
theElement.toggleClass( "ui-overlay-shadow", newOptions.shadow );
}
if ( newOptions.corners !== undefined ) {
theElement.toggleClass( "ui-corner-all", newOptions.corners );
}
if ( newOptions.transition !== undefined ) {
if ( !this._currentTransition ) {
this._applyTransition( newOptions.transition );
}
}
if ( newOptions.tolerance !== undefined ) {
this._setTolerance( newOptions.tolerance );
}
if ( newOptions.disabled !== undefined ) {
if ( newOptions.disabled ) {
this.close();
}
}
return this._super( newOptions );
},
_setTolerance: function( value ) {
var tol = { t: 30, r: 15, b: 30, l: 15 },
ar;
if ( value !== undefined ) {
ar = String( value ).split( "," );
$.each( ar, function( idx, val ) { ar[ idx ] = parseInt( val, 10 ); } );
switch( ar.length ) {
case 1:
if ( !isNaN( ar[ 0 ] ) ) {
tol.t = tol.r = tol.b = tol.l = ar[ 0 ];
}
break;
case 2:
if ( !isNaN( ar[ 0 ] ) ) {
tol.t = tol.b = ar[ 0 ];
}
if ( !isNaN( ar[ 1 ] ) ) {
tol.l = tol.r = ar[ 1 ];
}
break;
case 4:
if ( !isNaN( ar[ 0 ] ) ) {
tol.t = ar[ 0 ];
}
if ( !isNaN( ar[ 1 ] ) ) {
tol.r = ar[ 1 ];
}
if ( !isNaN( ar[ 2 ] ) ) {
tol.b = ar[ 2 ];
}
if ( !isNaN( ar[ 3 ] ) ) {
tol.l = ar[ 3 ];
}
break;
default:
break;
}
}
this._tolerance = tol;
return this;
},
_clampPopupWidth: function( infoOnly ) {
var menuSize,
windowCoordinates = getWindowCoordinates( this.window ),
rectangle = {
x: this._tolerance.l,
y: windowCoordinates.y + this._tolerance.t,
cx: windowCoordinates.cx - this._tolerance.l - this._tolerance.r,
cy: windowCoordinates.cy - this._tolerance.t - this._tolerance.b
};
if ( !infoOnly ) {
this._ui.container.css( "max-width", rectangle.cx );
}
menuSize = {
cx: this._ui.container.outerWidth( true ),
cy: this._ui.container.outerHeight( true )
};
return { rc: rectangle, menuSize: menuSize };
},
_calculateFinalLocation: function( desired, clampInfo ) {
var returnValue,
rectangle = clampInfo.rc,
menuSize = clampInfo.menuSize;
returnValue = {
left: fitSegmentInsideSegment( rectangle.cx, menuSize.cx, rectangle.x, desired.x ),
top: fitSegmentInsideSegment( rectangle.cy, menuSize.cy, rectangle.y, desired.y )
};
returnValue.top = Math.max( 0, returnValue.top );
returnValue.top -= Math.min( returnValue.top,
Math.max( 0, returnValue.top + menuSize.cy - this.document.height() ) );
return returnValue;
},
_placementCoords: function( desired ) {
return this._calculateFinalLocation( desired, this._clampPopupWidth() );
},
_createPrerequisites: function( screenPrerequisite, containerPrerequisite, whenDone ) {
var prerequisites,
self = this;
prerequisites = {
screen: $.Deferred(),
container: $.Deferred()
};
prerequisites.screen.then( function() {
if ( prerequisites === self._prerequisites ) {
screenPrerequisite();
}
});
prerequisites.container.then( function() {
if ( prerequisites === self._prerequisites ) {
containerPrerequisite();
}
});
$.when( prerequisites.screen, prerequisites.container ).done( function() {
if ( prerequisites === self._prerequisites ) {
self._prerequisites = null;
whenDone();
}
});
self._prerequisites = prerequisites;
},
_animate: function( args ) {
this._ui.screen
.removeClass( args.classToRemove )
.addClass( args.screenClassToAdd );
args.prerequisites.screen.resolve();
if ( args.transition && args.transition !== "none" ) {
if ( args.applyTransition ) {
this._applyTransition( args.transition );
}
if ( this._fallbackTransition ) {
this._ui.container
.addClass( args.containerClassToAdd )
.removeClass( args.classToRemove )
.animationComplete( $.proxy( args.prerequisites.container, "resolve" ) );
return;
}
}
this._ui.container.removeClass( args.classToRemove );
args.prerequisites.container.resolve();
},
_desiredCoords: function( openOptions ) {
var offset,
dst = null,
windowCoordinates = getWindowCoordinates( this.window ),
x = openOptions.x,
y = openOptions.y,
pTo = openOptions.positionTo;
if ( pTo && pTo !== "origin" ) {
if ( pTo === "window" ) {
x = windowCoordinates.cx / 2 + windowCoordinates.x;
y = windowCoordinates.cy / 2 + windowCoordinates.y;
} else {
try {
dst = $( pTo );
} catch( err ) {
dst = null;
}
if ( dst ) {
dst.filter( ":visible" );
if ( dst.length === 0 ) {
dst = null;
}
}
}
}
if ( dst ) {
offset = dst.offset();
x = offset.left + dst.outerWidth() / 2;
y = offset.top + dst.outerHeight() / 2;
}
if ( $.type( x ) !== "number" || isNaN( x ) ) {
x = windowCoordinates.cx / 2 + windowCoordinates.x;
}
if ( $.type( y ) !== "number" || isNaN( y ) ) {
y = windowCoordinates.cy / 2 + windowCoordinates.y;
}
return { x: x, y: y };
},
_reposition: function( openOptions ) {
openOptions = {
x: openOptions.x,
y: openOptions.y,
positionTo: openOptions.positionTo
};
this._trigger( "beforeposition", undefined, openOptions );
this._ui.container.offset( this._placementCoords( this._desiredCoords( openOptions ) ) );
},
reposition: function( openOptions ) {
if ( this._isOpen ) {
this._reposition( openOptions );
}
},
_safelyBlur: function( currentElement ){
if ( currentElement !== this.window[ 0 ] &&
currentElement.nodeName.toLowerCase() !== "body" ) {
$( currentElement ).blur();
}
},
_openPrerequisitesComplete: function() {
var id = this.element.attr( "id" ),
firstFocus = this._ui.container.find( ":focusable" ).first();
this._ui.container.addClass( "ui-popup-active" );
this._isOpen = true;
this._resizeScreen();
if ( !$.contains( this._ui.container[ 0 ], this.document[ 0 ].activeElement ) ) {
this._safelyBlur( this.document[ 0 ].activeElement );
}
if ( firstFocus.length > 0 ) {
this._ui.focusElement = firstFocus;
}
this._ignoreResizeEvents();
if ( id ) {
this.document.find( "[aria-haspopup='true'][aria-owns='" + id + "']" ).attr( "aria-expanded", true );
}
this._trigger( "afteropen" );
},
_open: function( options ) {
var openOptions = $.extend( {}, this.options, options ),
androidBlacklist = ( function() {
var ua = navigator.userAgent,
wkmatch = ua.match( /AppleWebKit\/([0-9\.]+)/ ),
wkversion = !!wkmatch && wkmatch[ 1 ],
androidmatch = ua.match( /Android (\d+(?:\.\d+))/ ),
andversion = !!androidmatch && androidmatch[ 1 ],
chromematch = ua.indexOf( "Chrome" ) > -1;
if ( androidmatch !== null && andversion === "4.0" && wkversion && wkversion > 534.13 && !chromematch ) {
return true;
}
return false;
}());
this._createPrerequisites(
$.noop,
$.noop,
$.proxy( this, "_openPrerequisitesComplete" ) );
this._currentTransition = openOptions.transition;
this._applyTransition( openOptions.transition );
this._ui.screen.removeClass( "ui-screen-hidden" );
this._ui.container.removeClass( "ui-popup-truncate" );
this._reposition( openOptions );
this._ui.container.removeClass( "ui-popup-hidden" );
if ( this.options.overlayTheme && androidBlacklist ) {
/* TODO: The native browser on Android 4.0.X ("Ice Cream Sandwich") suffers from an issue where the popup overlay appears to be z-indexed above the popup itself when certain other styles exist on the same page -- namely, any element set to `position: fixed` and certain types of input. These issues are reminiscent of previously uncovered bugs in older versions of Android's native browser: https://github.com/scottjehl/Device-Bugs/issues/3
This fix closes the following bugs ( I use "closes" with reluctance, and stress that this issue should be revisited as soon as possible ):
https://github.com/jquery/jquery-mobile/issues/4816
https://github.com/jquery/jquery-mobile/issues/4844
https://github.com/jquery/jquery-mobile/issues/4874
*/
this.element.closest( ".ui-page" ).addClass( "ui-popup-open" );
}
this._animate({
additionalCondition: true,
transition: openOptions.transition,
classToRemove: "",
screenClassToAdd: "in",
containerClassToAdd: "in",
applyTransition: false,
prerequisites: this._prerequisites
});
},
_closePrerequisiteScreen: function() {
this._ui.screen
.removeClass( "out" )
.addClass( "ui-screen-hidden" );
},
_closePrerequisiteContainer: function() {
this._ui.container
.removeClass( "reverse out" )
.addClass( "ui-popup-hidden ui-popup-truncate" )
.removeAttr( "style" );
},
_closePrerequisitesDone: function() {
var container = this._ui.container,
id = this.element.attr( "id" );
$.mobile.popup.active = undefined;
$( ":focus", container[ 0 ] ).add( container[ 0 ] ).blur();
if ( id ) {
this.document.find( "[aria-haspopup='true'][aria-owns='" + id + "']" ).attr( "aria-expanded", false );
}
this._trigger( "afterclose" );
},
_close: function( immediate ) {
this._ui.container.removeClass( "ui-popup-active" );
this._page.removeClass( "ui-popup-open" );
this._isOpen = false;
this._createPrerequisites(
$.proxy( this, "_closePrerequisiteScreen" ),
$.proxy( this, "_closePrerequisiteContainer" ),
$.proxy( this, "_closePrerequisitesDone" ) );
this._animate( {
additionalCondition: this._ui.screen.hasClass( "in" ),
transition: ( immediate ? "none" : ( this._currentTransition ) ),
classToRemove: "in",
screenClassToAdd: "out",
containerClassToAdd: "reverse out",
applyTransition: true,
prerequisites: this._prerequisites
});
},
_unenhance: function() {
if ( this.options.enhanced ) {
return;
}
this._setOptions( { theme: $.mobile.popup.prototype.options.theme } );
this.element
.detach()
.insertAfter( this._ui.placeholder )
.removeClass( "ui-popup ui-overlay-shadow ui-corner-all ui-body-inherit" );
this._ui.screen.remove();
this._ui.container.remove();
this._ui.placeholder.remove();
},
_destroy: function() {
if ( $.mobile.popup.active === this ) {
this.element.one( "popupafterclose", $.proxy( this, "_unenhance" ) );
this.close();
} else {
this._unenhance();
}
return this;
},
_closePopup: function( theEvent, data ) {
var parsedDst, toUrl,
currentOptions = this.options,
immediate = false;
if ( ( theEvent && theEvent.isDefaultPrevented() ) || $.mobile.popup.active !== this ) {
return;
}
window.scrollTo( 0, this._scrollTop );
if ( theEvent && theEvent.type === "pagebeforechange" && data ) {
if ( typeof data.toPage === "string" ) {
parsedDst = data.toPage;
} else {
parsedDst = data.toPage.jqmData( "url" );
}
parsedDst = $.mobile.path.parseUrl( parsedDst );
toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;
if ( this._myUrl !== $.mobile.path.makeUrlAbsolute( toUrl ) ) {
immediate = true;
} else {
theEvent.preventDefault();
}
}
this.window.off( currentOptions.closeEvents );
this.element.undelegate( currentOptions.closeLinkSelector, currentOptions.closeLinkEvents );
this._close( immediate );
},
_bindContainerClose: function() {
this.window
.on( this.options.closeEvents, $.proxy( this, "_closePopup" ) );
},
widget: function() {
return this._ui.container;
},
open: function( options ) {
var url, hashkey, activePage, currentIsDialog, hasHash, urlHistory,
self = this,
currentOptions = this.options;
if ( $.mobile.popup.active || currentOptions.disabled ) {
return this;
}
$.mobile.popup.active = this;
this._scrollTop = this.window.scrollTop();
if ( !( currentOptions.history ) ) {
self._open( options );
self._bindContainerClose();
self.element
.delegate( currentOptions.closeLinkSelector, currentOptions.closeLinkEvents, function( theEvent ) {
self.close();
theEvent.preventDefault();
});
return this;
}
urlHistory = $.mobile.navigate.history;
hashkey = $.mobile.dialogHashKey;
activePage = $.mobile.activePage;
currentIsDialog = ( activePage ? activePage.hasClass( "ui-dialog" ) : false );
this._myUrl = url = urlHistory.getActive().url;
hasHash = ( url.indexOf( hashkey ) > -1 ) && !currentIsDialog && ( urlHistory.activeIndex > 0 );
if ( hasHash ) {
self._open( options );
self._bindContainerClose();
return this;
}
if ( url.indexOf( hashkey ) === -1 && !currentIsDialog ) {
url = url + (url.indexOf( "#" ) > -1 ? hashkey : "#" + hashkey);
} else {
url = $.mobile.path.parseLocation().hash + hashkey;
}
this.window.one( "beforenavigate", function( theEvent ) {
theEvent.preventDefault();
self._open( options );
self._bindContainerClose();
});
this.urlAltered = true;
$.mobile.navigate( url, { role: "dialog" } );
return this;
},
close: function() {
if ( $.mobile.popup.active !== this ) {
return this;
}
this._scrollTop = this.window.scrollTop();
if ( this.options.history && this.urlAltered ) {
$.mobile.back();
this.urlAltered = false;
} else {
this._closePopup();
}
return this;
}
});
$.mobile.popup.handleLink = function( $link ) {
var offset,
path = $.mobile.path,
popup = $( path.hashToSelector( path.parseUrl( $link.attr( "href" ) ).hash ) ).first();
if ( popup.length > 0 && popup.data( "mobile-popup" ) ) {
offset = $link.offset();
popup.popup( "open", {
x: offset.left + $link.outerWidth() / 2,
y: offset.top + $link.outerHeight() / 2,
transition: $link.jqmData( "transition" ),
positionTo: $link.jqmData( "position-to" )
});
}
setTimeout( function() {
$link.removeClass( $.mobile.activeBtnClass );
}, 300 );
};
$.mobile.document.on( "pagebeforechange", function( theEvent, data ) {
if ( data.options.role === "popup" ) {
$.mobile.popup.handleLink( data.options.link );
theEvent.preventDefault();
}
});
})( jQuery );
/*
* custom "selectmenu" plugin
*/
(function( $, undefined ) {
var unfocusableItemSelector = ".ui-disabled,.ui-state-disabled,.ui-li-divider,.ui-screen-hidden,:jqmData(role='placeholder')",
goToAdjacentItem = function( item, target, direction ) {
var adjacent = item[ direction + "All" ]()
.not( unfocusableItemSelector )
.first();
if ( adjacent.length ) {
target
.blur()
.attr( "tabindex", "-1" );
adjacent.find( "a" ).first().focus();
}
};
$.widget( "mobile.selectmenu", $.mobile.selectmenu, {
_create: function() {
var o = this.options;
o.nativeMenu = o.nativeMenu || ( this.element.parents( ":jqmData(role='popup'),:mobile-popup" ).length > 0 );
return this._super();
},
_handleSelectFocus: function() {
this.element.blur();
this.button.focus();
},
_handleKeydown: function( event ) {
this._super( event );
this._handleButtonVclickKeydown( event );
},
_handleButtonVclickKeydown: function( event ) {
if ( this.options.disabled || this.isOpen || this.options.nativeMenu ) {
return;
}
if (event.type === "vclick" ||
event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE)) {
this._decideFormat();
if ( this.menuType === "overlay" ) {
this.button.attr( "href", "#" + this.popupId ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "popup" );
} else {
this.button.attr( "href", "#" + this.dialogId ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "dialog" );
}
this.isOpen = true;
}
},
_handleListFocus: function( e ) {
var params = ( e.type === "focusin" ) ?
{ tabindex: "0", event: "vmouseover" }:
{ tabindex: "-1", event: "vmouseout" };
$( e.target )
.attr( "tabindex", params.tabindex )
.trigger( params.event );
},
_handleListKeydown: function( event ) {
var target = $( event.target ),
li = target.closest( "li" );
switch ( event.keyCode ) {
case 38:
goToAdjacentItem( li, target, "prev" );
return false;
case 40:
goToAdjacentItem( li, target, "next" );
return false;
case 13:
case 32:
target.trigger( "click" );
return false;
}
},
_handleMenuPageHide: function() {
this._delayedTrigger();
this.thisPage.page( "bindRemove" );
},
_handleHeaderCloseClick: function() {
if ( this.menuType === "overlay" ) {
this.close();
return false;
}
},
_handleListItemClick: function( event ) {
var listItem = $( event.target ).closest( "li" ),
oldIndex = this.select[ 0 ].selectedIndex,
newIndex = $.mobile.getAttribute( listItem, "option-index" ),
option = this._selectOptions().eq( newIndex )[ 0 ];
option.selected = this.isMultiple ? !option.selected : true;
if ( this.isMultiple ) {
listItem.find( "a" )
.toggleClass( "ui-checkbox-on", option.selected )
.toggleClass( "ui-checkbox-off", !option.selected );
}
if ( !this.isMultiple && oldIndex !== newIndex ) {
this._triggerChange = true;
}
if ( this.isMultiple ) {
this.select.trigger( "change" );
this.list.find( "li:not(.ui-li-divider)" ).eq( newIndex )
.find( "a" ).first().focus();
}
else {
this.close();
}
event.preventDefault();
},
build: function() {
var selectId, popupId, dialogId, label, thisPage, isMultiple, menuId,
themeAttr, overlayTheme, overlayThemeAttr, dividerThemeAttr,
menuPage, listbox, list, header, headerTitle, menuPageContent,
menuPageClose, headerClose,
o = this.options;
if ( o.nativeMenu ) {
return this._super();
}
selectId = this.selectId;
popupId = selectId + "-listbox";
dialogId = selectId + "-dialog";
label = this.label;
thisPage = this.element.closest( ".ui-page" );
isMultiple = this.element[ 0 ].multiple;
menuId = selectId + "-menu";
themeAttr = o.theme ? ( " data-" + $.mobile.ns + "theme='" + o.theme + "'" ) : "";
overlayTheme = o.overlayTheme || o.theme || null;
overlayThemeAttr = overlayTheme ? ( " data-" + $.mobile.ns +
"overlay-theme='" + overlayTheme + "'" ) : "";
dividerThemeAttr = ( o.dividerTheme && isMultiple ) ? ( " data-" + $.mobile.ns + "divider-theme='" + o.dividerTheme + "'" ) : "";
menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' class='ui-selectmenu' id='" + dialogId + "'" + themeAttr + overlayThemeAttr + ">" +
"<div data-" + $.mobile.ns + "role='header'>" +
"<div class='ui-title'></div>"+
"</div>"+
"<div data-" + $.mobile.ns + "role='content'></div>"+
"</div>" );
listbox = $( "<div" + themeAttr + overlayThemeAttr + " id='" + popupId +
"' class='ui-selectmenu'></div>" )
.insertAfter( this.select )
.popup();
list = $( "<ul class='ui-selectmenu-list' id='" + menuId + "' role='listbox' aria-labelledby='" + this.buttonId + "'" + themeAttr + dividerThemeAttr + "></ul>" ).appendTo( listbox );
header = $( "<div class='ui-header ui-bar-" + ( o.theme ? o.theme : "inherit" ) + "'></div>" ).prependTo( listbox );
headerTitle = $( "<h1 class='ui-title'></h1>" ).appendTo( header );
if ( this.isMultiple ) {
headerClose = $( "<a>", {
"role": "button",
"text": o.closeText,
"href": "#",
"class": "ui-btn ui-corner-all ui-btn-left ui-btn-icon-notext ui-icon-delete"
}).appendTo( header );
}
$.extend( this, {
selectId: selectId,
menuId: menuId,
popupId: popupId,
dialogId: dialogId,
thisPage: thisPage,
menuPage: menuPage,
label: label,
isMultiple: isMultiple,
theme: o.theme,
listbox: listbox,
list: list,
header: header,
headerTitle: headerTitle,
headerClose: headerClose,
menuPageContent: menuPageContent,
menuPageClose: menuPageClose,
placeholder: ""
});
this.refresh();
if ( this._origTabIndex === undefined ) {
this._origTabIndex = ( this.select[ 0 ].getAttribute( "tabindex" ) === null ) ? false : this.select.attr( "tabindex" );
}
this.select.attr( "tabindex", "-1" );
this._on( this.select, { focus : "_handleSelectFocus" } );
this._on( this.button, {
vclick: "_handleButtonVclickKeydown"
});
this.list.attr( "role", "listbox" );
this._on( this.list, {
"focusin": "_handleListFocus",
"focusout": "_handleListFocus",
"keydown": "_handleListKeydown",
"click li:not(.ui-disabled,.ui-state-disabled,.ui-li-divider)": "_handleListItemClick"
});
this._on( this.menuPage, { pagehide: "_handleMenuPageHide" } );
this._on( this.listbox, { popupafterclose: "_popupClosed" } );
if ( this.isMultiple ) {
this._on( this.headerClose, { click: "_handleHeaderCloseClick" } );
}
return this;
},
_popupClosed: function() {
this.close();
this._delayedTrigger();
},
_delayedTrigger: function() {
if ( this._triggerChange ) {
this.element.trigger( "change" );
}
this._triggerChange = false;
},
_isRebuildRequired: function() {
var list = this.list.find( "li" ),
options = this._selectOptions().not( ".ui-screen-hidden" );
return options.text() !== list.text();
},
selected: function() {
return this._selectOptions().filter( ":selected:not( :jqmData(placeholder='true') )" );
},
refresh: function( force ) {
var self, indices;
if ( this.options.nativeMenu ) {
return this._super( force );
}
self = this;
if ( force || this._isRebuildRequired() ) {
self._buildList();
}
indices = this.selectedIndices();
self.setButtonText();
self.setButtonCount();
self.list.find( "li:not(.ui-li-divider)" )
.find( "a" ).removeClass( $.mobile.activeBtnClass ).end()
.attr( "aria-selected", false )
.each(function( i ) {
var item = $( this );
if ( $.inArray( i, indices ) > -1 ) {
item.attr( "aria-selected", true );
if ( self.isMultiple ) {
item.find( "a" ).removeClass( "ui-checkbox-off" ).addClass( "ui-checkbox-on" );
} else {
if ( item.hasClass( "ui-screen-hidden" ) ) {
item.next().find( "a" ).addClass( $.mobile.activeBtnClass );
} else {
item.find( "a" ).addClass( $.mobile.activeBtnClass );
}
}
} else if ( self.isMultiple ) {
item.find( "a" ).removeClass( "ui-checkbox-on" ).addClass( "ui-checkbox-off" );
}
});
},
close: function() {
if ( this.options.disabled || !this.isOpen ) {
return;
}
var self = this;
if ( self.menuType === "page" ) {
self.menuPage.dialog( "close" );
self.list.appendTo( self.listbox );
} else {
self.listbox.popup( "close" );
}
self._focusButton();
self.isOpen = false;
},
open: function() {
this.button.click();
},
_focusMenuItem: function() {
var selector = this.list.find( "a." + $.mobile.activeBtnClass );
if ( selector.length === 0 ) {
selector = this.list.find( "li:not(" + unfocusableItemSelector + ") a.ui-btn" );
}
selector.first().focus();
},
_decideFormat: function() {
var self = this,
$window = this.window,
selfListParent = self.list.parent(),
menuHeight = selfListParent.outerHeight(),
scrollTop = $window.scrollTop(),
btnOffset = self.button.offset().top,
screenHeight = $window.height();
if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {
self.menuPage.appendTo( $.mobile.pageContainer ).page();
self.menuPageContent = self.menuPage.find( ".ui-content" );
self.menuPageClose = self.menuPage.find( ".ui-header a" );
self.thisPage.unbind( "pagehide.remove" );
if ( scrollTop === 0 && btnOffset > screenHeight ) {
self.thisPage.one( "pagehide", function() {
$( this ).jqmData( "lastScroll", btnOffset );
});
}
self.menuPage.one( {
pageshow: $.proxy( this, "_focusMenuItem" ),
pagehide: $.proxy( this, "close" )
});
self.menuType = "page";
self.menuPageContent.append( self.list );
self.menuPage
.find( "div .ui-title" )
.text( self.label.getEncodedText() || self.placeholder );
} else {
self.menuType = "overlay";
self.listbox.one( { popupafteropen: $.proxy( this, "_focusMenuItem" ) } );
}
},
_buildList: function() {
var self = this,
o = this.options,
placeholder = this.placeholder,
needPlaceholder = true,
dataIcon = "false",
$options, numOptions, select,
dataPrefix = "data-" + $.mobile.ns,
dataIndexAttr = dataPrefix + "option-index",
dataIconAttr = dataPrefix + "icon",
dataRoleAttr = dataPrefix + "role",
dataPlaceholderAttr = dataPrefix + "placeholder",
fragment = document.createDocumentFragment(),
isPlaceholderItem = false,
optGroup,
i,
option, $option, parent, text, anchor, classes,
optLabel, divider, item;
self.list.empty().filter( ".ui-listview" ).listview( "destroy" );
$options = this._selectOptions();
numOptions = $options.length;
select = this.select[ 0 ];
for ( i = 0; i < numOptions;i++, isPlaceholderItem = false) {
option = $options[i];
$option = $( option );
if ( $option.hasClass( "ui-screen-hidden" ) ) {
continue;
}
parent = option.parentNode;
classes = [];
text = $option.text();
anchor = document.createElement( "a" );
anchor.setAttribute( "href", "#" );
anchor.appendChild( document.createTextNode( text ) );
if ( parent !== select && parent.nodeName.toLowerCase() === "optgroup" ) {
optLabel = parent.getAttribute( "label" );
if ( optLabel !== optGroup ) {
divider = document.createElement( "li" );
divider.setAttribute( dataRoleAttr, "list-divider" );
divider.setAttribute( "role", "option" );
divider.setAttribute( "tabindex", "-1" );
divider.appendChild( document.createTextNode( optLabel ) );
fragment.appendChild( divider );
optGroup = optLabel;
}
}
if ( needPlaceholder && ( !option.getAttribute( "value" ) || text.length === 0 || $option.jqmData( "placeholder" ) ) ) {
needPlaceholder = false;
isPlaceholderItem = true;
if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
this._removePlaceholderAttr = true;
}
option.setAttribute( dataPlaceholderAttr, true );
if ( o.hidePlaceholderMenuItems ) {
classes.push( "ui-screen-hidden" );
}
if ( placeholder !== text ) {
placeholder = self.placeholder = text;
}
}
item = document.createElement( "li" );
if ( option.disabled ) {
classes.push( "ui-state-disabled" );
item.setAttribute( "aria-disabled", true );
}
item.setAttribute( dataIndexAttr, i );
item.setAttribute( dataIconAttr, dataIcon );
if ( isPlaceholderItem ) {
item.setAttribute( dataPlaceholderAttr, true );
}
item.className = classes.join( " " );
item.setAttribute( "role", "option" );
anchor.setAttribute( "tabindex", "-1" );
if ( this.isMultiple ) {
$( anchor ).addClass( "ui-btn ui-checkbox-off ui-btn-icon-right" );
}
item.appendChild( anchor );
fragment.appendChild( item );
}
self.list[0].appendChild( fragment );
if ( !this.isMultiple && !placeholder.length ) {
this.header.addClass( "ui-screen-hidden" );
} else {
this.headerTitle.text( this.placeholder );
}
self.list.listview();
},
_button: function() {
return this.options.nativeMenu ?
this._super() :
$( "<a>", {
"href": "#",
"role": "button",
"id": this.buttonId,
"aria-haspopup": "true",
"aria-owns": this.menuId
});
},
_destroy: function() {
if ( !this.options.nativeMenu ) {
this.close();
if ( this._origTabIndex !== undefined ) {
if ( this._origTabIndex !== false ) {
this.select.attr( "tabindex", this._origTabIndex );
} else {
this.select.removeAttr( "tabindex" );
}
}
if ( this._removePlaceholderAttr ) {
this._selectOptions().removeAttr( "data-" + $.mobile.ns + "placeholder" );
}
this.listbox.remove();
this.menuPage.remove();
}
this._super();
}
});
})( jQuery );
(function( $, undefined ) {
var reverseBoolOptionMap = {
"ui-shadow" : "shadow",
"ui-corner-all" : "corners",
"ui-btn-inline" : "inline",
"ui-shadow-icon" : "iconshadow", /* TODO: Remove in 1.5 */
"ui-mini" : "mini"
},
getAttrFixed = function() {
var ret = $.mobile.getAttribute.apply( this, arguments );
return ( ret == null ? undefined : ret );
},
capitalLettersRE = /[A-Z]/g;
function optionsToClasses( options, existingClasses ) {
var classes = existingClasses ? existingClasses : [];
classes.push( "ui-btn" );
if ( options.theme ) {
classes.push( "ui-btn-" + options.theme );
}
if ( options.icon ) {
classes = classes.concat([
"ui-icon-" + options.icon,
"ui-btn-icon-" + options.iconpos
]);
if ( options.iconshadow ) {
classes.push( "ui-shadow-icon" ); /* TODO: Remove in 1.5 */
}
}
if ( options.inline ) {
classes.push( "ui-btn-inline" );
}
if ( options.shadow ) {
classes.push( "ui-shadow" );
}
if ( options.corners ) {
classes.push( "ui-corner-all" );
}
if ( options.mini ) {
classes.push( "ui-mini" );
}
return classes;
}
function classNameToOptions( classes ) {
var idx, map, unknownClass,
alreadyEnhanced = false,
noIcon = true,
o = {
icon: "",
inline: false,
shadow: false,
corners: false,
iconshadow: false,
mini: false
},
unknownClasses = [];
classes = classes.split( " " );
for ( idx = 0 ; idx < classes.length ; idx++ ) {
unknownClass = true;
map = reverseBoolOptionMap[ classes[ idx ] ];
if ( map !== undefined ) {
unknownClass = false;
o[ map ] = true;
} else if ( classes[ idx ].indexOf( "ui-btn-icon-" ) === 0 ) {
unknownClass = false;
noIcon = false;
o.iconpos = classes[ idx ].substring( 12 );
} else if ( classes[ idx ].indexOf( "ui-icon-" ) === 0 ) {
unknownClass = false;
o.icon = classes[ idx ].substring( 8 );
} else if ( classes[ idx ].indexOf( "ui-btn-" ) === 0 && classes[ idx ].length === 8 ) {
unknownClass = false;
o.theme = classes[ idx ].substring( 7 );
} else if ( classes[ idx ] === "ui-btn" ) {
unknownClass = false;
alreadyEnhanced = true;
}
if ( unknownClass ) {
unknownClasses.push( classes[ idx ] );
}
}
if ( noIcon ) {
o.icon = "";
}
return {
options: o,
unknownClasses: unknownClasses,
alreadyEnhanced: alreadyEnhanced
};
}
function camelCase2Hyphenated( c ) {
return "-" + c.toLowerCase();
}
$.fn.buttonMarkup = function( options, overwriteClasses ) {
var idx, data, el, retrievedOptions, optionKey,
defaults = $.fn.buttonMarkup.defaults;
for ( idx = 0 ; idx < this.length ; idx++ ) {
el = this[ idx ];
data = overwriteClasses ?
{ alreadyEnhanced: false, unknownClasses: [] } :
classNameToOptions( el.className );
retrievedOptions = $.extend( {},
( data.alreadyEnhanced ? data.options : {} ),
options );
if ( !data.alreadyEnhanced ) {
for ( optionKey in defaults ) {
if ( retrievedOptions[ optionKey ] === undefined ) {
retrievedOptions[ optionKey ] = getAttrFixed( el,
optionKey.replace( capitalLettersRE, camelCase2Hyphenated )
);
}
}
}
el.className = optionsToClasses(
$.extend( {},
defaults,
retrievedOptions
),
data.unknownClasses ).join( " " );
if ( el.tagName.toLowerCase() !== "button" ) {
el.setAttribute( "role", "button" );
}
}
return this;
};
$.fn.buttonMarkup.defaults = {
icon: "",
iconpos: "left",
theme: null,
inline: false,
shadow: true,
corners: true,
iconshadow: false, /* TODO: Remove in 1.5. Option deprecated in 1.4. */
mini: false
};
$.extend( $.fn.buttonMarkup, {
initSelector: "a:jqmData(role='button'), .ui-bar > a, .ui-bar > :jqmData(role='controlgroup') > a, button:not(:jqmData(role='navbar') button)"
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.controlgroup", $.extend( {
options: {
enhanced: false,
theme: null,
shadow: false,
corners: true,
excludeInvisible: true,
type: "vertical",
mini: false
},
_create: function() {
var elem = this.element,
opts = this.options,
keepNative = $.mobile.page.prototype.keepNativeSelector();
if ( $.fn.buttonMarkup ) {
this.element
.find( $.fn.buttonMarkup.initSelector )
.not( keepNative )
.buttonMarkup();
}
$.each( this._childWidgets, $.proxy( function( number, widgetName ) {
if ( $.mobile[ widgetName ] ) {
this.element
.find( $.mobile[ widgetName ].initSelector )
.not( keepNative )[ widgetName ]();
}
}, this ));
$.extend( this, {
_ui: null,
_initialRefresh: true
});
if ( opts.enhanced ) {
this._ui = {
groupLegend: elem.children( ".ui-controlgroup-label" ).children(),
childWrapper: elem.children( ".ui-controlgroup-controls" )
};
} else {
this._ui = this._enhance();
}
},
_childWidgets: [ "checkboxradio", "selectmenu", "button" ],
_themeClassFromOption: function( value ) {
return ( value ? ( value === "none" ? "" : "ui-group-theme-" + value ) : "" );
},
_enhance: function() {
var elem = this.element,
opts = this.options,
ui = {
groupLegend: elem.children( "legend" ),
childWrapper: elem
.addClass( "ui-controlgroup " +
"ui-controlgroup-" +
( opts.type === "horizontal" ? "horizontal" : "vertical" ) + " " +
this._themeClassFromOption( opts.theme ) + " " +
( opts.corners ? "ui-corner-all " : "" ) +
( opts.mini ? "ui-mini " : "" ) )
.wrapInner( "<div " +
"class='ui-controlgroup-controls " +
( opts.shadow === true ? "ui-shadow" : "" ) + "'></div>" )
.children()
};
if ( ui.groupLegend.length > 0 ) {
$( "<div role='heading' class='ui-controlgroup-label'></div>" )
.append( ui.groupLegend )
.prependTo( elem );
}
return ui;
},
_init: function() {
this.refresh();
},
_setOptions: function( options ) {
var callRefresh, returnValue,
elem = this.element;
if ( options.type !== undefined ) {
elem
.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
.addClass( "ui-controlgroup-" + ( options.type === "horizontal" ? "horizontal" : "vertical" ) );
callRefresh = true;
}
if ( options.theme !== undefined ) {
elem
.removeClass( this._themeClassFromOption( this.options.theme ) )
.addClass( this._themeClassFromOption( options.theme ) );
}
if ( options.corners !== undefined ) {
elem.toggleClass( "ui-corner-all", options.corners );
}
if ( options.mini !== undefined ) {
elem.toggleClass( "ui-mini", options.mini );
}
if ( options.shadow !== undefined ) {
this._ui.childWrapper.toggleClass( "ui-shadow", options.shadow );
}
if ( options.excludeInvisible !== undefined ) {
this.options.excludeInvisible = options.excludeInvisible;
callRefresh = true;
}
returnValue = this._super( options );
if ( callRefresh ) {
this.refresh();
}
return returnValue;
},
container: function() {
return this._ui.childWrapper;
},
refresh: function() {
var $el = this.container(),
els = $el.find( ".ui-btn" ).not( ".ui-slider-handle" ),
create = this._initialRefresh;
if ( $.mobile.checkboxradio ) {
$el.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
}
this._addFirstLastClasses( els,
this.options.excludeInvisible ? this._getVisibles( els, create ) : els,
create );
this._initialRefresh = false;
},
_destroy: function() {
var ui, buttons,
opts = this.options;
if ( opts.enhanced ) {
return this;
}
ui = this._ui;
buttons = this.element
.removeClass( "ui-controlgroup " +
"ui-controlgroup-horizontal ui-controlgroup-vertical ui-corner-all ui-mini " +
this._themeClassFromOption( opts.theme ) )
.find( ".ui-btn" )
.not( ".ui-slider-handle" );
this._removeFirstLastClasses( buttons );
ui.groupLegend.unwrap();
ui.childWrapper.children().unwrap();
}
}, $.mobile.behaviors.addFirstLastClasses ) );
})(jQuery);
(function( $, undefined ) {
$.widget( "mobile.toolbar", {
initSelector: ":jqmData(role='footer'), :jqmData(role='header')",
options: {
theme: null,
addBackBtn: false,
backBtnTheme: null,
backBtnText: "Back"
},
_create: function() {
var leftbtn, rightbtn,
role = this.element.is( ":jqmData(role='header')" ) ? "header" : "footer",
page = this.element.closest( ".ui-page" );
if ( page.length === 0 ) {
page = false;
this._on( this.document, {
"pageshow": "refresh"
});
}
$.extend( this, {
role: role,
page: page,
leftbtn: leftbtn,
rightbtn: rightbtn
});
this.element.attr( "role", role === "header" ? "banner" : "contentinfo" ).addClass( "ui-" + role );
this.refresh();
this._setOptions( this.options );
},
_setOptions: function( o ) {
if ( o.addBackBtn !== undefined ) {
this._updateBackButton();
}
if ( o.backBtnTheme != null ) {
this.element
.find( ".ui-toolbar-back-btn" )
.addClass( "ui-btn ui-btn-" + o.backBtnTheme );
}
if ( o.backBtnText !== undefined ) {
this.element.find( ".ui-toolbar-back-btn .ui-btn-text" ).text( o.backBtnText );
}
if ( o.theme !== undefined ) {
var currentTheme = this.options.theme ? this.options.theme : "inherit",
newTheme = o.theme ? o.theme : "inherit";
this.element.removeClass( "ui-bar-" + currentTheme ).addClass( "ui-bar-" + newTheme );
}
this._super( o );
},
refresh: function() {
if ( this.role === "header" ) {
this._addHeaderButtonClasses();
}
if ( !this.page ) {
this._setRelative();
if ( this.role === "footer" ) {
this.element.appendTo( "body" );
} else if ( this.role === "header" ) {
this._updateBackButton();
}
}
this._addHeadingClasses();
this._btnMarkup();
},
_setRelative: function() {
$( "[data-"+ $.mobile.ns + "role='page']" ).css({ "position": "relative" });
},
_btnMarkup: function() {
this.element
.children( "a" )
.filter( ":not([data-" + $.mobile.ns + "role='none'])" )
.attr( "data-" + $.mobile.ns + "role", "button" );
this.element.trigger( "create" );
},
_addHeaderButtonClasses: function() {
var headerAnchors = this.element.children( "a, button" );
this.leftbtn = headerAnchors.hasClass( "ui-btn-left" ) &&
!headerAnchors.hasClass( "ui-toolbar-back-btn" );
this.rightbtn = headerAnchors.hasClass( "ui-btn-right" );
this.leftbtn = this.leftbtn ||
headerAnchors.eq( 0 )
.not( ".ui-btn-right,.ui-toolbar-back-btn" )
.addClass( "ui-btn-left" )
.length;
this.rightbtn = this.rightbtn || headerAnchors.eq( 1 ).addClass( "ui-btn-right" ).length;
},
_updateBackButton: function() {
var backButton,
options = this.options,
theme = options.backBtnTheme || options.theme;
backButton = this._backButton = ( this._backButton || {} );
if ( this.options.addBackBtn &&
this.role === "header" &&
$( ".ui-page" ).length > 1 &&
( this.page ?
( this.page[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) !==
$.mobile.path.stripHash( location.hash ) ) :
( $.mobile.navigate && $.mobile.navigate.history &&
$.mobile.navigate.history.activeIndex > 0 ) ) &&
!this.leftbtn ) {
if ( !backButton.attached ) {
this.backButton = backButton.element = ( backButton.element ||
$( "<a role='button' href='javascript:void(0);' " +
"class='ui-btn ui-corner-all ui-shadow ui-btn-left " +
( theme ? "ui-btn-" + theme + " " : "" ) +
"ui-toolbar-back-btn ui-icon-carat-l ui-btn-icon-left' " +
"data-" + $.mobile.ns + "rel='back'>" + options.backBtnText +
"</a>" ) )
.prependTo( this.element );
backButton.attached = true;
}
} else if ( backButton.element ) {
backButton.element.detach();
backButton.attached = false;
}
},
_addHeadingClasses: function() {
this.element.children( "h1, h2, h3, h4, h5, h6" )
.addClass( "ui-title" )
.attr({
"role": "heading",
"aria-level": "1"
});
},
_destroy: function() {
var currentTheme;
this.element.children( "h1, h2, h3, h4, h5, h6" )
.removeClass( "ui-title" )
.removeAttr( "role" )
.removeAttr( "aria-level" );
if ( this.role === "header" ) {
this.element.children( "a, button" )
.removeClass( "ui-btn-left ui-btn-right ui-btn ui-shadow ui-corner-all" );
if ( this.backButton) {
this.backButton.remove();
}
}
currentTheme = this.options.theme ? this.options.theme : "inherit";
this.element.removeClass( "ui-bar-" + currentTheme );
this.element.removeClass( "ui-" + this.role ).removeAttr( "role" );
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.toolbar", $.mobile.toolbar, {
options: {
position:null,
visibleOnPageShow: true,
disablePageZoom: true,
transition: "slide", //can be none, fade, slide (slide maps to slideup or slidedown)
fullscreen: false,
tapToggle: true,
tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
hideDuringFocus: "input, textarea, select",
updatePagePadding: true,
trackPersistentToolbars: true,
supportBlacklist: function() {
return !$.support.fixedPosition;
}
},
_create: function() {
this._super();
this.pagecontainer = $( ":mobile-pagecontainer" );
if ( this.options.position === "fixed" && !this.options.supportBlacklist() ) {
this._makeFixed();
}
},
_makeFixed: function() {
this.element.addClass( "ui-"+ this.role +"-fixed" );
this.updatePagePadding();
this._addTransitionClass();
this._bindPageEvents();
this._bindToggleHandlers();
},
_setOptions: function( o ) {
if ( o.position === "fixed" && this.options.position !== "fixed" ) {
this._makeFixed();
}
if ( this.options.position === "fixed" && !this.options.supportBlacklist() ) {
var $page = ( !!this.page )? this.page: ( $(".ui-page-active").length > 0 )? $(".ui-page-active"): $(".ui-page").eq(0);
if ( o.fullscreen !== undefined) {
if ( o.fullscreen ) {
this.element.addClass( "ui-"+ this.role +"-fullscreen" );
$page.addClass( "ui-page-" + this.role + "-fullscreen" );
}
else {
this.element.removeClass( "ui-"+ this.role +"-fullscreen" );
$page.removeClass( "ui-page-" + this.role + "-fullscreen" ).addClass( "ui-page-" + this.role+ "-fixed" );
}
}
}
this._super(o);
},
_addTransitionClass: function() {
var tclass = this.options.transition;
if ( tclass && tclass !== "none" ) {
if ( tclass === "slide" ) {
tclass = this.element.hasClass( "ui-header" ) ? "slidedown" : "slideup";
}
this.element.addClass( tclass );
}
},
_bindPageEvents: function() {
var page = ( !!this.page )? this.element.closest( ".ui-page" ): this.document;
this._on( page , {
"pagebeforeshow": "_handlePageBeforeShow",
"webkitAnimationStart":"_handleAnimationStart",
"animationstart":"_handleAnimationStart",
"updatelayout": "_handleAnimationStart",
"pageshow": "_handlePageShow",
"pagebeforehide": "_handlePageBeforeHide"
});
},
_handlePageBeforeShow: function( ) {
var o = this.options;
if ( o.disablePageZoom ) {
$.mobile.zoom.disable( true );
}
if ( !o.visibleOnPageShow ) {
this.hide( true );
}
},
_handleAnimationStart: function() {
if ( this.options.updatePagePadding ) {
this.updatePagePadding( ( !!this.page )? this.page: ".ui-page-active" );
}
},
_handlePageShow: function() {
this.updatePagePadding( ( !!this.page )? this.page: ".ui-page-active" );
if ( this.options.updatePagePadding ) {
this._on( this.window, { "throttledresize": "updatePagePadding" } );
}
},
_handlePageBeforeHide: function( e, ui ) {
var o = this.options,
thisFooter, thisHeader, nextFooter, nextHeader;
if ( o.disablePageZoom ) {
$.mobile.zoom.enable( true );
}
if ( o.updatePagePadding ) {
this._off( this.window, "throttledresize" );
}
if ( o.trackPersistentToolbars ) {
thisFooter = $( ".ui-footer-fixed:jqmData(id)", this.page );
thisHeader = $( ".ui-header-fixed:jqmData(id)", this.page );
nextFooter = thisFooter.length && ui.nextPage && $( ".ui-footer-fixed:jqmData(id='" + thisFooter.jqmData( "id" ) + "')", ui.nextPage ) || $();
nextHeader = thisHeader.length && ui.nextPage && $( ".ui-header-fixed:jqmData(id='" + thisHeader.jqmData( "id" ) + "')", ui.nextPage ) || $();
if ( nextFooter.length || nextHeader.length ) {
nextFooter.add( nextHeader ).appendTo( $.mobile.pageContainer );
ui.nextPage.one( "pageshow", function() {
nextHeader.prependTo( this );
nextFooter.appendTo( this );
});
}
}
},
_visible: true,
updatePagePadding: function( tbPage ) {
var $el = this.element,
header = ( this.role ==="header" ),
pos = parseFloat( $el.css( header ? "top" : "bottom" ) );
if ( this.options.fullscreen ) { return; }
tbPage = ( tbPage && tbPage.type === undefined && tbPage ) || this.page || $el.closest( ".ui-page" );
tbPage = ( !!this.page )? this.page: ".ui-page-active";
$( tbPage ).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() + pos );
},
_useTransition: function( notransition ) {
var $win = this.window,
$el = this.element,
scroll = $win.scrollTop(),
elHeight = $el.height(),
pHeight = ( !!this.page )? $el.closest( ".ui-page" ).height():$(".ui-page-active").height(),
viewportHeight = $.mobile.getScreenHeight();
return !notransition &&
( this.options.transition && this.options.transition !== "none" &&
(
( this.role === "header" && !this.options.fullscreen && scroll > elHeight ) ||
( this.role === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
) || this.options.fullscreen
);
},
show: function( notransition ) {
var hideClass = "ui-fixed-hidden",
$el = this.element;
if ( this._useTransition( notransition ) ) {
$el
.removeClass( "out " + hideClass )
.addClass( "in" )
.animationComplete(function () {
$el.removeClass( "in" );
});
}
else {
$el.removeClass( hideClass );
}
this._visible = true;
},
hide: function( notransition ) {
var hideClass = "ui-fixed-hidden",
$el = this.element,
outclass = "out" + ( this.options.transition === "slide" ? " reverse" : "" );
if ( this._useTransition( notransition ) ) {
$el
.addClass( outclass )
.removeClass( "in" )
.animationComplete(function() {
$el.addClass( hideClass ).removeClass( outclass );
});
}
else {
$el.addClass( hideClass ).removeClass( outclass );
}
this._visible = false;
},
toggle: function() {
this[ this._visible ? "hide" : "show" ]();
},
_bindToggleHandlers: function() {
var self = this,
o = self.options,
delayShow, delayHide,
isVisible = true,
page = ( !!this.page )? this.page: $(".ui-page");
page
.bind( "vclick", function( e ) {
if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
self.toggle();
}
})
.bind( "focusin focusout", function( e ) {
if ( screen.width < 1025 && $( e.target ).is( o.hideDuringFocus ) && !$( e.target ).closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {
if ( e.type === "focusout" && !isVisible ) {
isVisible = true;
clearTimeout( delayHide );
delayShow = setTimeout( function() {
self.show();
}, 0 );
} else if ( e.type === "focusin" && !!isVisible ) {
clearTimeout( delayShow );
isVisible = false;
delayHide = setTimeout( function() {
self.hide();
}, 0 );
}
}
});
},
_setRelative: function() {
if( this.options.position !== "fixed" ){
$( "[data-"+ $.mobile.ns + "role='page']" ).css({ "position": "relative" });
}
},
_destroy: function() {
var pageClasses, toolbarClasses, hasFixed, header, hasFullscreen,
page = this.pagecontainer.pagecontainer( "getActivePage" );
this._super();
if ( this.options.position === "fixed" ) {
hasFixed = $( "body>.ui-" + this.role + "-fixed" )
.add( page.find( ".ui-" + this.options.role + "-fixed" ) )
.not( this.element ).length > 0;
hasFullscreen = $( "body>.ui-" + this.role + "-fixed" )
.add( page.find( ".ui-" + this.options.role + "-fullscreen" ) )
.not( this.element ).length > 0;
toolbarClasses = "ui-header-fixed ui-footer-fixed ui-header-fullscreen in out" +
" ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden";
this.element.removeClass( toolbarClasses );
if ( !hasFullscreen ) {
pageClasses = "ui-page-" + this.role + "-fullscreen";
}
if ( !hasFixed ) {
header = this.role === "header";
pageClasses += " ui-page-" + this.role + "-fixed";
page.css( "padding-" + ( header ? "top" : "bottom" ), "" );
}
page.removeClass( pageClasses );
}
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.toolbar", $.mobile.toolbar, {
_makeFixed: function() {
this._super();
this._workarounds();
},
_workarounds: function() {
var ua = navigator.userAgent,
platform = navigator.platform,
wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
wkversion = !!wkmatch && wkmatch[ 1 ],
os = null,
self = this;
if ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1 || platform.indexOf( "iPod" ) > -1 ) {
os = "ios";
} else if ( ua.indexOf( "Android" ) > -1 ) {
os = "android";
} else {
return;
}
if ( os === "ios" ) {
self._bindScrollWorkaround();
} else if ( os === "android" && wkversion && wkversion < 534 ) {
self._bindScrollWorkaround();
self._bindListThumbWorkaround();
} else {
return;
}
},
_viewportOffset: function() {
var $el = this.element,
header = $el.hasClass( "ui-header" ),
offset = Math.abs( $el.offset().top - this.window.scrollTop() );
if ( !header ) {
offset = Math.round( offset - this.window.height() + $el.outerHeight() ) - 60;
}
return offset;
},
_bindScrollWorkaround: function() {
var self = this;
this._on( this.window, { scrollstop: function() {
var viewportOffset = self._viewportOffset();
if ( viewportOffset > 2 && self._visible ) {
self._triggerRedraw();
}
}});
},
_bindListThumbWorkaround: function() {
this.element.closest( ".ui-page" ).addClass( "ui-android-2x-fixed" );
},
_triggerRedraw: function() {
var paddingBottom = parseFloat( $( ".ui-page-active" ).css( "padding-bottom" ) );
$( ".ui-page-active" ).css( "padding-bottom", ( paddingBottom + 1 ) + "px" );
setTimeout( function() {
$( ".ui-page-active" ).css( "padding-bottom", paddingBottom + "px" );
}, 0 );
},
destroy: function() {
this._super();
this.element.closest( ".ui-page-active" ).removeClass( "ui-android-2x-fix" );
}
});
})( jQuery );
( function( $, undefined ) {
var ieHack = ( $.mobile.browser.oldIE && $.mobile.browser.oldIE <= 8 ),
uiTemplate = $(
"<div class='ui-popup-arrow-guide'></div>" +
"<div class='ui-popup-arrow-container" + ( ieHack ? " ie" : "" ) + "'>" +
"<div class='ui-popup-arrow'></div>" +
"</div>"
);
function getArrow() {
var clone = uiTemplate.clone(),
gd = clone.eq( 0 ),
ct = clone.eq( 1 ),
ar = ct.children();
return { arEls: ct.add( gd ), gd: gd, ct: ct, ar: ar };
}
$.widget( "mobile.popup", $.mobile.popup, {
options: {
arrow: ""
},
_create: function() {
var ar,
ret = this._super();
if ( this.options.arrow ) {
this._ui.arrow = ar = this._addArrow();
}
return ret;
},
_addArrow: function() {
var theme,
opts = this.options,
ar = getArrow();
theme = this._themeClassFromOption( "ui-body-", opts.theme );
ar.ar.addClass( theme + ( opts.shadow ? " ui-overlay-shadow" : "" ) );
ar.arEls.hide().appendTo( this.element );
return ar;
},
_unenhance: function() {
var ar = this._ui.arrow;
if ( ar ) {
ar.arEls.remove();
}
return this._super();
},
_tryAnArrow: function( p, dir, desired, s, best ) {
var result, r, diff, desiredForArrow = {}, tip = {};
if ( s.arFull[ p.dimKey ] > s.guideDims[ p.dimKey ] ) {
return best;
}
desiredForArrow[ p.fst ] = desired[ p.fst ] +
( s.arHalf[ p.oDimKey ] + s.menuHalf[ p.oDimKey ] ) * p.offsetFactor -
s.contentBox[ p.fst ] + ( s.clampInfo.menuSize[ p.oDimKey ] - s.contentBox[ p.oDimKey ] ) * p.arrowOffsetFactor;
desiredForArrow[ p.snd ] = desired[ p.snd ];
result = s.result || this._calculateFinalLocation( desiredForArrow, s.clampInfo );
r = { x: result.left, y: result.top };
tip[ p.fst ] = r[ p.fst ] + s.contentBox[ p.fst ] + p.tipOffset;
tip[ p.snd ] = Math.max( result[ p.prop ] + s.guideOffset[ p.prop ] + s.arHalf[ p.dimKey ],
Math.min( result[ p.prop ] + s.guideOffset[ p.prop ] + s.guideDims[ p.dimKey ] - s.arHalf[ p.dimKey ],
desired[ p.snd ] ) );
diff = Math.abs( desired.x - tip.x ) + Math.abs( desired.y - tip.y );
if ( !best || diff < best.diff ) {
tip[ p.snd ] -= s.arHalf[ p.dimKey ] + result[ p.prop ] + s.contentBox[ p.snd ];
best = { dir: dir, diff: diff, result: result, posProp: p.prop, posVal: tip[ p.snd ] };
}
return best;
},
_getPlacementState: function( clamp ) {
var offset, gdOffset,
ar = this._ui.arrow,
state = {
clampInfo: this._clampPopupWidth( !clamp ),
arFull: { cx: ar.ct.width(), cy: ar.ct.height() },
guideDims: { cx: ar.gd.width(), cy: ar.gd.height() },
guideOffset: ar.gd.offset()
};
offset = this.element.offset();
ar.gd.css( { left: 0, top: 0, right: 0, bottom: 0 } );
gdOffset = ar.gd.offset();
state.contentBox = {
x: gdOffset.left - offset.left,
y: gdOffset.top - offset.top,
cx: ar.gd.width(),
cy: ar.gd.height()
};
ar.gd.removeAttr( "style" );
state.guideOffset = { left: state.guideOffset.left - offset.left, top: state.guideOffset.top - offset.top };
state.arHalf = { cx: state.arFull.cx / 2, cy: state.arFull.cy / 2 };
state.menuHalf = { cx: state.clampInfo.menuSize.cx / 2, cy: state.clampInfo.menuSize.cy / 2 };
return state;
},
_placementCoords: function( desired ) {
var state, best, params, elOffset, bgRef,
optionValue = this.options.arrow,
ar = this._ui.arrow;
if ( !ar ) {
return this._super( desired );
}
ar.arEls.show();
bgRef = {};
state = this._getPlacementState( true );
params = {
"l": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: 1, tipOffset: -state.arHalf.cx, arrowOffsetFactor: 0 },
"r": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: -1, tipOffset: state.arHalf.cx + state.contentBox.cx, arrowOffsetFactor: 1 },
"b": { fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: -1, tipOffset: state.arHalf.cy + state.contentBox.cy, arrowOffsetFactor: 1 },
"t": { fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: 1, tipOffset: -state.arHalf.cy, arrowOffsetFactor: 0 }
};
$.each( ( optionValue === true ? "l,t,r,b" : optionValue ).split( "," ),
$.proxy( function( key, value ) {
best = this._tryAnArrow( params[ value ], value, desired, state, best );
}, this ) );
if ( !best ) {
ar.arEls.hide();
return this._super( desired );
}
ar.ct
.removeClass( "ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b" )
.addClass( "ui-popup-arrow-" + best.dir )
.removeAttr( "style" ).css( best.posProp, best.posVal )
.show();
if ( !ieHack ) {
elOffset = this.element.offset();
bgRef[ params[ best.dir ].fst ] = ar.ct.offset();
bgRef[ params[ best.dir ].snd ] = {
left: elOffset.left + state.contentBox.x,
top: elOffset.top + state.contentBox.y
};
}
return best.result;
},
_setOptions: function( opts ) {
var newTheme,
oldTheme = this.options.theme,
ar = this._ui.arrow,
ret = this._super( opts );
if ( opts.arrow !== undefined ) {
if ( !ar && opts.arrow ) {
this._ui.arrow = this._addArrow();
return;
} else if ( ar && !opts.arrow ) {
ar.arEls.remove();
this._ui.arrow = null;
}
}
ar = this._ui.arrow;
if ( ar ) {
if ( opts.theme !== undefined ) {
oldTheme = this._themeClassFromOption( "ui-body-", oldTheme );
newTheme = this._themeClassFromOption( "ui-body-", opts.theme );
ar.ar.removeClass( oldTheme ).addClass( newTheme );
}
if ( opts.shadow !== undefined ) {
ar.ar.toggleClass( "ui-overlay-shadow", opts.shadow );
}
}
return ret;
},
_destroy: function() {
var ar = this._ui.arrow;
if ( ar ) {
ar.arEls.remove();
}
return this._super();
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.panel", {
options: {
classes: {
panel: "ui-panel",
panelOpen: "ui-panel-open",
panelClosed: "ui-panel-closed",
panelFixed: "ui-panel-fixed",
panelInner: "ui-panel-inner",
modal: "ui-panel-dismiss",
modalOpen: "ui-panel-dismiss-open",
pageContainer: "ui-panel-page-container",
pageWrapper: "ui-panel-wrapper",
pageFixedToolbar: "ui-panel-fixed-toolbar",
pageContentPrefix: "ui-panel-page-content", /* Used for wrapper and fixed toolbars position, display and open classes. */
animate: "ui-panel-animate"
},
animate: true,
theme: null,
position: "left",
dismissible: true,
display: "reveal", //accepts reveal, push, overlay
swipeClose: true,
positionFixed: false
},
_closeLink: null,
_parentPage: null,
_page: null,
_modal: null,
_panelInner: null,
_wrapper: null,
_fixedToolbars: null,
_create: function() {
var el = this.element,
parentPage = el.closest( ".ui-page, :jqmData(role='page')" );
$.extend( this, {
_closeLink: el.find( ":jqmData(rel='close')" ),
_parentPage: ( parentPage.length > 0 ) ? parentPage : false,
_openedPage: null,
_page: this._getPage,
_panelInner: this._getPanelInner(),
_fixedToolbars: this._getFixedToolbars
});
if ( this.options.display !== "overlay" ){
this._getWrapper();
}
this._addPanelClasses();
if ( $.support.cssTransform3d && !!this.options.animate ) {
this.element.addClass( this.options.classes.animate );
}
this._bindUpdateLayout();
this._bindCloseEvents();
this._bindLinkListeners();
this._bindPageEvents();
if ( !!this.options.dismissible ) {
this._createModal();
}
this._bindSwipeEvents();
},
_getPanelInner: function() {
var panelInner = this.element.find( "." + this.options.classes.panelInner );
if ( panelInner.length === 0 ) {
panelInner = this.element.children().wrapAll( "<div class='" + this.options.classes.panelInner + "' />" ).parent();
}
return panelInner;
},
_createModal: function() {
var self = this,
target = self._parentPage ? self._parentPage.parent() : self.element.parent();
self._modal = $( "<div class='" + self.options.classes.modal + "'></div>" )
.on( "mousedown", function() {
self.close();
})
.appendTo( target );
},
_getPage: function() {
var page = this._openedPage || this._parentPage || $( "." + $.mobile.activePageClass );
return page;
},
_getWrapper: function() {
var wrapper = this._page().find( "." + this.options.classes.pageWrapper );
if ( wrapper.length === 0 ) {
wrapper = this._page().children( ".ui-header:not(.ui-header-fixed), .ui-content:not(.ui-popup), .ui-footer:not(.ui-footer-fixed)" )
.wrapAll( "<div class='" + this.options.classes.pageWrapper + "'></div>" )
.parent();
}
this._wrapper = wrapper;
},
_getFixedToolbars: function() {
var extFixedToolbars = $( "body" ).children( ".ui-header-fixed, .ui-footer-fixed" ),
intFixedToolbars = this._page().find( ".ui-header-fixed, .ui-footer-fixed" ),
fixedToolbars = extFixedToolbars.add( intFixedToolbars ).addClass( this.options.classes.pageFixedToolbar );
return fixedToolbars;
},
_getPosDisplayClasses: function( prefix ) {
return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
},
_getPanelClasses: function() {
var panelClasses = this.options.classes.panel +
" " + this._getPosDisplayClasses( this.options.classes.panel ) +
" " + this.options.classes.panelClosed +
" " + "ui-body-" + ( this.options.theme ? this.options.theme : "inherit" );
if ( !!this.options.positionFixed ) {
panelClasses += " " + this.options.classes.panelFixed;
}
return panelClasses;
},
_addPanelClasses: function() {
this.element.addClass( this._getPanelClasses() );
},
_handleCloseClick: function( event ) {
if ( !event.isDefaultPrevented() ) {
this.close();
}
},
_bindCloseEvents: function() {
this._on( this._closeLink, {
"click": "_handleCloseClick"
});
this._on({
"click a:jqmData(ajax='false')": "_handleCloseClick"
});
},
_positionPanel: function( scrollToTop ) {
var self = this,
panelInnerHeight = self._panelInner.outerHeight(),
expand = panelInnerHeight > $.mobile.getScreenHeight();
if ( expand || !self.options.positionFixed ) {
if ( expand ) {
self._unfixPanel();
$.mobile.resetActivePageHeight( panelInnerHeight );
}
if ( scrollToTop ) {
this.window[ 0 ].scrollTo( 0, $.mobile.defaultHomeScroll );
}
} else {
self._fixPanel();
}
},
_bindFixListener: function() {
this._on( $( window ), { "throttledresize": "_positionPanel" });
},
_unbindFixListener: function() {
this._off( $( window ), "throttledresize" );
},
_unfixPanel: function() {
if ( !!this.options.positionFixed && $.support.fixedPosition ) {
this.element.removeClass( this.options.classes.panelFixed );
}
},
_fixPanel: function() {
if ( !!this.options.positionFixed && $.support.fixedPosition ) {
this.element.addClass( this.options.classes.panelFixed );
}
},
_bindUpdateLayout: function() {
var self = this;
self.element.on( "updatelayout", function(/* e */) {
if ( self._open ) {
self._positionPanel();
}
});
},
_bindLinkListeners: function() {
this._on( "body", {
"click a": "_handleClick"
});
},
_handleClick: function( e ) {
var link,
panelId = this.element.attr( "id" );
if ( e.currentTarget.href.split( "#" )[ 1 ] === panelId && panelId !== undefined ) {
e.preventDefault();
link = $( e.target );
if ( link.hasClass( "ui-btn" ) ) {
link.addClass( $.mobile.activeBtnClass );
this.element.one( "panelopen panelclose", function() {
link.removeClass( $.mobile.activeBtnClass );
});
}
this.toggle();
}
},
_bindSwipeEvents: function() {
var self = this,
area = self._modal ? self.element.add( self._modal ) : self.element;
if ( !!self.options.swipeClose ) {
if ( self.options.position === "left" ) {
area.on( "swipeleft.panel", function(/* e */) {
self.close();
});
} else {
area.on( "swiperight.panel", function(/* e */) {
self.close();
});
}
}
},
_bindPageEvents: function() {
var self = this;
this.document
.on( "panelbeforeopen", function( e ) {
if ( self._open && e.target !== self.element[ 0 ] ) {
self.close();
}
})
.on( "keyup.panel", function( e ) {
if ( e.keyCode === 27 && self._open ) {
self.close();
}
});
if ( !this._parentPage && this.options.display !== "overlay" ) {
this._on( this.document, {
"pageshow": function() {
this._openedPage = null;
this._getWrapper();
}
});
}
if ( self._parentPage ) {
this.document.on( "pagehide", ":jqmData(role='page')", function() {
if ( self._open ) {
self.close( true );
}
});
} else {
this.document.on( "pagebeforehide", function() {
if ( self._open ) {
self.close( true );
}
});
}
},
_open: false,
_pageContentOpenClasses: null,
_modalOpenClasses: null,
open: function( immediate ) {
if ( !this._open ) {
var self = this,
o = self.options,
_openPanel = function() {
self._off( self.document , "panelclose" );
self._page().jqmData( "panel", "open" );
if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
self._wrapper.addClass( o.classes.animate );
self._fixedToolbars().addClass( o.classes.animate );
}
if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
( self._wrapper || self.element )
.animationComplete( complete, "transition" );
} else {
setTimeout( complete, 0 );
}
if ( o.theme && o.display !== "overlay" ) {
self._page().parent()
.addClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
}
self.element
.removeClass( o.classes.panelClosed )
.addClass( o.classes.panelOpen );
self._positionPanel( true );
self._pageContentOpenClasses = self._getPosDisplayClasses( o.classes.pageContentPrefix );
if ( o.display !== "overlay" ) {
self._page().parent().addClass( o.classes.pageContainer );
self._wrapper.addClass( self._pageContentOpenClasses );
self._fixedToolbars().addClass( self._pageContentOpenClasses );
}
self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
if ( self._modal ) {
self._modal
.addClass( self._modalOpenClasses )
.height( Math.max( self._modal.height(), self.document.height() ) );
}
},
complete = function() {
if ( !self._open ) {
return;
}
if ( o.display !== "overlay" ) {
self._wrapper.addClass( o.classes.pageContentPrefix + "-open" );
self._fixedToolbars().addClass( o.classes.pageContentPrefix + "-open" );
}
self._bindFixListener();
self._trigger( "open" );
self._openedPage = self._page();
};
self._trigger( "beforeopen" );
if ( self._page().jqmData( "panel" ) === "open" ) {
self._on( self.document, {
"panelclose": _openPanel
});
} else {
_openPanel();
}
self._open = true;
}
},
close: function( immediate ) {
if ( this._open ) {
var self = this,
o = this.options,
_closePanel = function() {
self.element.removeClass( o.classes.panelOpen );
if ( o.display !== "overlay" ) {
self._wrapper.removeClass( self._pageContentOpenClasses );
self._fixedToolbars().removeClass( self._pageContentOpenClasses );
}
if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
( self._wrapper || self.element )
.animationComplete( complete, "transition" );
} else {
setTimeout( complete, 0 );
}
if ( self._modal ) {
self._modal
.removeClass( self._modalOpenClasses )
.height( "" );
}
},
complete = function() {
if ( o.theme && o.display !== "overlay" ) {
self._page().parent().removeClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
}
self.element.addClass( o.classes.panelClosed );
if ( o.display !== "overlay" ) {
self._page().parent().removeClass( o.classes.pageContainer );
self._wrapper.removeClass( o.classes.pageContentPrefix + "-open" );
self._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );
}
if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
self._wrapper.removeClass( o.classes.animate );
self._fixedToolbars().removeClass( o.classes.animate );
}
self._fixPanel();
self._unbindFixListener();
$.mobile.resetActivePageHeight();
self._page().jqmRemoveData( "panel" );
self._trigger( "close" );
self._openedPage = null;
};
self._trigger( "beforeclose" );
_closePanel();
self._open = false;
}
},
toggle: function() {
this[ this._open ? "close" : "open" ]();
},
_destroy: function() {
var otherPanels,
o = this.options,
multiplePanels = ( $( "body > :mobile-panel" ).length + $.mobile.activePage.find( ":mobile-panel" ).length ) > 1;
if ( o.display !== "overlay" ) {
otherPanels = $( "body > :mobile-panel" ).add( $.mobile.activePage.find( ":mobile-panel" ) );
if ( otherPanels.not( ".ui-panel-display-overlay" ).not( this.element ).length === 0 ) {
this._wrapper.children().unwrap();
}
if ( this._open ) {
this._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );
if ( $.support.cssTransform3d && !!o.animate ) {
this._fixedToolbars().removeClass( o.classes.animate );
}
this._page().parent().removeClass( o.classes.pageContainer );
if ( o.theme ) {
this._page().parent().removeClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
}
}
}
if ( !multiplePanels ) {
this.document.off( "panelopen panelclose" );
}
if ( this._open ) {
this._page().jqmRemoveData( "panel" );
}
this._panelInner.children().unwrap();
this.element
.removeClass( [ this._getPanelClasses(), o.classes.panelOpen, o.classes.animate ].join( " " ) )
.off( "swipeleft.panel swiperight.panel" )
.off( "panelbeforeopen" )
.off( "panelhide" )
.off( "keyup.panel" )
.off( "updatelayout" );
if ( this._modal ) {
this._modal.remove();
}
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.table", {
options: {
classes: {
table: "ui-table"
},
enhanced: false
},
_create: function() {
if ( !this.options.enhanced ) {
this.element.addClass( this.options.classes.table );
}
$.extend( this, {
headers: undefined,
allHeaders: undefined
});
this._refresh( true );
},
_setHeaders: function() {
var trs = this.element.find( "thead tr" );
this.headers = this.element.find( "tr:eq(0)" ).children();
this.allHeaders = this.headers.add( trs.children() );
},
refresh: function() {
this._refresh();
},
rebuild: $.noop,
_refresh: function( /* create */ ) {
var table = this.element,
trs = table.find( "thead tr" );
this._setHeaders();
trs.each( function() {
var columnCount = 0;
$( this ).children().each( function() {
var span = parseInt( this.getAttribute( "colspan" ), 10 ),
selector = ":nth-child(" + ( columnCount + 1 ) + ")",
j;
this.setAttribute( "data-" + $.mobile.ns + "colstart", columnCount + 1 );
if ( span ) {
for( j = 0; j < span - 1; j++ ) {
columnCount++;
selector += ", :nth-child(" + ( columnCount + 1 ) + ")";
}
}
$( this ).jqmData( "cells", table.find( "tr" ).not( trs.eq( 0 ) ).not( this ).children( selector ) );
columnCount++;
});
});
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.table", $.mobile.table, {
options: {
mode: "columntoggle",
columnBtnTheme: null,
columnPopupTheme: null,
columnBtnText: "Columns...",
classes: $.extend( $.mobile.table.prototype.options.classes, {
popup: "ui-table-columntoggle-popup",
columnBtn: "ui-table-columntoggle-btn",
priorityPrefix: "ui-table-priority-",
columnToggleTable: "ui-table-columntoggle"
})
},
_create: function() {
this._super();
if ( this.options.mode !== "columntoggle" ) {
return;
}
$.extend( this, {
_menu: null
});
if ( this.options.enhanced ) {
this._menu = $( this.document[ 0 ].getElementById( this._id() + "-popup" ) ).children().first();
this._addToggles( this._menu, true );
} else {
this._menu = this._enhanceColToggle();
this.element.addClass( this.options.classes.columnToggleTable );
}
this._setupEvents();
this._setToggleState();
},
_id: function() {
return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
},
_setupEvents: function() {
this._on( this.window, {
throttledresize: "_setToggleState"
});
this._on( this._menu, {
"change input": "_menuInputChange"
});
},
_addToggles: function( menu, keep ) {
var inputs,
checkboxIndex = 0,
opts = this.options,
container = menu.controlgroup( "container" );
if ( keep ) {
inputs = menu.find( "input" );
} else {
container.empty();
}
this.headers.not( "td" ).each( function() {
var input, cells,
header = $( this ),
priority = $.mobile.getAttribute( this, "priority" );
if ( priority ) {
cells = header.add( header.jqmData( "cells" ) );
cells.addClass( opts.classes.priorityPrefix + priority );
input = ( keep ? inputs.eq( checkboxIndex++ ) :
$("<label><input type='checkbox' checked />" +
( header.children( "abbr" ).first().attr( "title" ) ||
header.text() ) +
"</label>" )
.appendTo( container )
.children( 0 )
.checkboxradio( {
theme: opts.columnPopupTheme
}) )
.jqmData( "header", header )
.jqmData( "cells", cells );
header.jqmData( "input", input );
}
});
if ( !keep ) {
menu.controlgroup( "refresh" );
}
},
_menuInputChange: function( evt ) {
var input = $( evt.target ),
checked = input[ 0 ].checked;
input.jqmData( "cells" )
.toggleClass( "ui-table-cell-hidden", !checked )
.toggleClass( "ui-table-cell-visible", checked );
},
_unlockCells: function( cells ) {
cells.removeClass( "ui-table-cell-hidden ui-table-cell-visible");
},
_enhanceColToggle: function() {
var id , menuButton, popup, menu,
table = this.element,
opts = this.options,
ns = $.mobile.ns,
fragment = this.document[ 0 ].createDocumentFragment();
id = this._id() + "-popup";
menuButton = $( "<a href='#" + id + "' " +
"class='" + opts.classes.columnBtn + " ui-btn " +
"ui-btn-" + ( opts.columnBtnTheme || "a" ) +
" ui-corner-all ui-shadow ui-mini' " +
"data-" + ns + "rel='popup'>" + opts.columnBtnText + "</a>" );
popup = $( "<div class='" + opts.classes.popup + "' id='" + id + "'></div>" );
menu = $( "<fieldset></fieldset>" ).controlgroup();
this._addToggles( menu, false );
menu.appendTo( popup );
fragment.appendChild( popup[ 0 ] );
fragment.appendChild( menuButton[ 0 ] );
table.before( fragment );
popup.popup();
return menu;
},
rebuild: function() {
this._super();
if ( this.options.mode === "columntoggle" ) {
this._refresh( false );
}
},
_refresh: function( create ) {
var headers, hiddenColumns, index;
this._super( create );
if ( !create && this.options.mode === "columntoggle" ) {
headers = this.headers;
hiddenColumns = [];
this._menu.find( "input" ).each( function() {
var input = $( this ),
header = input.jqmData( "header" ),
index = headers.index( header[ 0 ] );
if ( index > -1 && !input.prop( "checked" ) ) {
hiddenColumns.push( index );
}
});
this._unlockCells( this.element.find( ".ui-table-cell-hidden, " +
".ui-table-cell-visible" ) );
this._addToggles( this._menu, create );
for ( index = hiddenColumns.length - 1 ; index > -1 ; index-- ) {
headers.eq( hiddenColumns[ index ] ).jqmData( "input" )
.prop( "checked", false )
.checkboxradio( "refresh" )
.trigger( "change" );
}
}
},
_setToggleState: function() {
this._menu.find( "input" ).each( function() {
var checkbox = $( this );
this.checked = checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
checkbox.checkboxradio( "refresh" );
});
},
_destroy: function() {
this._super();
}
});
})( jQuery );
(function( $, undefined ) {
$.widget( "mobile.table", $.mobile.table, {
options: {
mode: "reflow",
classes: $.extend( $.mobile.table.prototype.options.classes, {
reflowTable: "ui-table-reflow",
cellLabels: "ui-table-cell-label"
})
},
_create: function() {
this._super();
if ( this.options.mode !== "reflow" ) {
return;
}
if ( !this.options.enhanced ) {
this.element.addClass( this.options.classes.reflowTable );
this._updateReflow();
}
},
rebuild: function() {
this._super();
if ( this.options.mode === "reflow" ) {
this._refresh( false );
}
},
_refresh: function( create ) {
this._super( create );
if ( !create && this.options.mode === "reflow" ) {
this._updateReflow( );
}
},
_updateReflow: function() {
var table = this,
opts = this.options;
$( table.allHeaders.get().reverse() ).each( function() {
var cells = $( this ).jqmData( "cells" ),
colstart = $.mobile.getAttribute( this, "colstart" ),
hierarchyClass = cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
contents = $( this ).clone().contents(),
iteration, filter;
if ( contents.length > 0 ) {
if ( hierarchyClass ) {
iteration = parseInt( this.getAttribute( "colspan" ), 10 );
filter = "";
if ( iteration ) {
filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
}
table._addLabels( cells.filter( filter ),
opts.classes.cellLabels + hierarchyClass, contents );
} else {
table._addLabels( cells, opts.classes.cellLabels, contents );
}
}
});
},
_addLabels: function( cells, label, contents ) {
if ( contents.length === 1 && contents[ 0 ].nodeName.toLowerCase() === "abbr" ) {
contents = contents.eq( 0 ).attr( "title" );
}
cells
.not( ":has(b." + label + ")" )
.prepend( $( "<b class='" + label + "'></b>" ).append( contents ) );
}
});
})( jQuery );
(function( $, undefined ) {
var defaultFilterCallback = function( index, searchValue ) {
return ( ( "" + ( $.mobile.getAttribute( this, "filtertext" ) || $( this ).text() ) )
.toLowerCase().indexOf( searchValue ) === -1 );
};
$.widget( "mobile.filterable", {
initSelector: ":jqmData(filter='true')",
options: {
filterReveal: false,
filterCallback: defaultFilterCallback,
enhanced: false,
input: null,
children: "> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup-controls > .ui-btn, > .ui-controlgroup-controls > .ui-checkbox, > .ui-controlgroup-controls > .ui-radio"
},
_create: function() {
var opts = this.options;
$.extend( this, {
_search: null,
_timer: 0
});
this._setInput( opts.input );
if ( !opts.enhanced ) {
this._filterItems( ( ( this._search && this._search.val() ) || "" ).toLowerCase() );
}
},
_onKeyUp: function() {
var val, lastval,
search = this._search;
if ( search ) {
val = search.val().toLowerCase(),
lastval = $.mobile.getAttribute( search[ 0 ], "lastval" ) + "";
if ( lastval && lastval === val ) {
return;
}
if ( this._timer ) {
window.clearTimeout( this._timer );
this._timer = 0;
}
this._timer = this._delay( function() {
if ( this._trigger( "beforefilter", null, { input: search } ) === false ) {
return false;
}
search[ 0 ].setAttribute( "data-" + $.mobile.ns + "lastval", val );
this._filterItems( val );
this._timer = 0;
}, 250 );
}
},
_getFilterableItems: function() {
var elem = this.element,
children = this.options.children,
items = !children ? { length: 0 }:
$.isFunction( children ) ? children():
children.nodeName ? $( children ):
children.jquery ? children:
this.element.find( children );
if ( items.length === 0 ) {
items = elem.children();
}
return items;
},
_filterItems: function( val ) {
var idx, callback, length, dst,
show = [],
hide = [],
opts = this.options,
filterItems = this._getFilterableItems();
if ( val != null ) {
callback = opts.filterCallback || defaultFilterCallback;
length = filterItems.length;
for ( idx = 0 ; idx < length ; idx++ ) {
dst = ( callback.call( filterItems[ idx ], idx, val ) ) ? hide : show;
dst.push( filterItems[ idx ] );
}
}
if ( hide.length === 0 ) {
filterItems[ ( opts.filterReveal && val.length === 0 ) ?
"addClass" : "removeClass" ]( "ui-screen-hidden" );
} else {
$( hide ).addClass( "ui-screen-hidden" );
$( show ).removeClass( "ui-screen-hidden" );
}
this._refreshChildWidget();
this._trigger( "filter", null, {
items: filterItems
});
},
_refreshChildWidget: function() {
var widget, idx,
recognizedWidgets = [ "collapsibleset", "selectmenu", "controlgroup", "listview" ];
for ( idx = recognizedWidgets.length - 1 ; idx > -1 ; idx-- ) {
widget = recognizedWidgets[ idx ];
if ( $.mobile[ widget ] ) {
widget = this.element.data( "mobile-" + widget );
if ( widget && $.isFunction( widget.refresh ) ) {
widget.refresh();
}
}
}
},
_setInput: function ( selector ) {
var search = this._search;
if ( this._timer ) {
window.clearTimeout( this._timer );
this._timer = 0;
}
if ( search ) {
this._off( search, "keyup change input" );
search = null;
}
if ( selector ) {
search = selector.jquery ? selector:
selector.nodeName ? $( selector ):
this.document.find( selector );
this._on( search, {
keydown: "_onKeyDown",
keypress: "_onKeyPress",
keyup: "_onKeyUp",
change: "_onKeyUp",
input: "_onKeyUp"
});
}
this._search = search;
},
_onKeyDown: function( event ) {
if ( event.keyCode === $.ui.keyCode.ENTER ) {
event.preventDefault();
this._preventKeyPress = true;
}
},
_onKeyPress: function( event ) {
if ( this._preventKeyPress ) {
event.preventDefault();
this._preventKeyPress = false;
}
},
_setOptions: function( options ) {
var refilter = !( ( options.filterReveal === undefined ) &&
( options.filterCallback === undefined ) &&
( options.children === undefined ) );
this._super( options );
if ( options.input !== undefined ) {
this._setInput( options.input );
refilter = true;
}
if ( refilter ) {
this.refresh();
}
},
_destroy: function() {
var opts = this.options,
items = this._getFilterableItems();
if ( opts.enhanced ) {
items.toggleClass( "ui-screen-hidden", opts.filterReveal );
} else {
items.removeClass( "ui-screen-hidden" );
}
},
refresh: function() {
if ( this._timer ) {
window.clearTimeout( this._timer );
this._timer = 0;
}
this._filterItems( ( ( this._search && this._search.val() ) || "" ).toLowerCase() );
}
});
})( jQuery );
(function( $, undefined ) {
var replaceSetOptions = function( self, orig ) {
return function( options ) {
orig.call( this, options );
self._syncTextInputOptions( options );
};
},
rDividerListItem = /(^|\s)ui-li-divider(\s|$)/,
origDefaultFilterCallback = $.mobile.filterable.prototype.options.filterCallback;
$.mobile.filterable.prototype.options.filterCallback = function( index, searchValue ) {
return !this.className.match( rDividerListItem ) &&
origDefaultFilterCallback.call( this, index, searchValue );
};
$.widget( "mobile.filterable", $.mobile.filterable, {
options: {
filterPlaceholder: "Filter items...",
filterTheme: null
},
_create: function() {
var idx, widgetName,
elem = this.element,
recognizedWidgets = [ "collapsibleset", "selectmenu", "controlgroup", "listview" ],
createHandlers = {};
this._super();
$.extend( this, {
_widget: null
});
for ( idx = recognizedWidgets.length - 1 ; idx > -1 ; idx-- ) {
widgetName = recognizedWidgets[ idx ];
if ( $.mobile[ widgetName ] ) {
if ( this._setWidget( elem.data( "mobile-" + widgetName ) ) ) {
break;
} else {
createHandlers[ widgetName + "create" ] = "_handleCreate";
}
}
}
if ( !this._widget ) {
this._on( elem, createHandlers );
}
},
_handleCreate: function( evt ) {
this._setWidget( this.element.data( "mobile-" + evt.type.substring( 0, evt.type.length - 6 ) ) );
},
_trigger: function( type, event, data ) {
if ( this._widget && this._widget.widgetFullName === "mobile-listview" &&
type === "beforefilter" ) {
this._widget._trigger( "beforefilter", event, data );
}
return this._super( type, event, data );
},
_setWidget: function( widget ) {
if ( !this._widget && widget ) {
this._widget = widget;
this._widget._setOptions = replaceSetOptions( this, this._widget._setOptions );
}
if ( !!this._widget ) {
this._syncTextInputOptions( this._widget.options );
if ( this._widget.widgetName === "listview" ) {
this._widget.options.hideDividers = true;
this._widget.element.listview( "refresh" );
}
}
return !!this._widget;
},
_isSearchInternal: function() {
return ( this._search && this._search.jqmData( "ui-filterable-" + this.uuid + "-internal" ) );
},
_setInput: function( selector ) {
var opts = this.options,
updatePlaceholder = true,
textinputOpts = {};
if ( !selector ) {
if ( this._isSearchInternal() ) {
return;
} else {
updatePlaceholder = false;
selector = $( "<input " +
"data-" + $.mobile.ns + "type='search' " +
"placeholder='" + opts.filterPlaceholder + "'></input>" )
.jqmData( "ui-filterable-" + this.uuid + "-internal", true );
$( "<form class='ui-filterable'></form>" )
.append( selector )
.submit( function( evt ) {
evt.preventDefault();
selector.blur();
})
.insertBefore( this.element );
if ( $.mobile.textinput ) {
if ( this.options.filterTheme != null ) {
textinputOpts[ "theme" ] = opts.filterTheme;
}
selector.textinput( textinputOpts );
}
}
}
this._super( selector );
if ( this._isSearchInternal() && updatePlaceholder ) {
this._search.attr( "placeholder", this.options.filterPlaceholder );
}
},
_setOptions: function( options ) {
var ret = this._super( options );
if ( options.filterPlaceholder !== undefined ) {
if ( this._isSearchInternal() ) {
this._search.attr( "placeholder", options.filterPlaceholder );
}
}
if ( options.filterTheme !== undefined && this._search && $.mobile.textinput ) {
this._search.textinput( "option", "theme", options.filterTheme );
}
return ret;
},
_refreshChildWidget: function() {
this._refreshingChildWidget = true;
this._superApply( arguments );
this._refreshingChildWidget = false;
},
refresh: function() {
if ( !this._refreshingChildWidget ) {
this._superApply( arguments );
}
},
_destroy: function() {
if ( this._isSearchInternal() ) {
this._search.remove();
}
this._super();
},
_syncTextInputOptions: function( options ) {
var idx,
textinputOptions = {};
if ( this._isSearchInternal() && $.mobile.textinput ) {
for ( idx in $.mobile.textinput.prototype.options ) {
if ( options[ idx ] !== undefined ) {
if ( idx === "theme" && this.options.filterTheme != null ) {
textinputOptions[ idx ] = this.options.filterTheme;
} else {
textinputOptions[ idx ] = options[ idx ];
}
}
}
this._search.textinput( "option", textinputOptions );
}
}
});
$.widget( "mobile.listview", $.mobile.listview, {
options: {
filter: false
},
_create: function() {
if ( this.options.filter === true &&
!this.element.data( "mobile-filterable" ) ) {
this.element.filterable();
}
return this._super();
},
refresh: function() {
var filterable;
this._superApply( arguments );
if ( this.options.filter === true ) {
filterable = this.element.data( "mobile-filterable" );
if ( filterable ) {
filterable.refresh();
}
}
}
});
})( jQuery );
/*!
* jQuery UI Tabs fadf2b312a05040436451c64bbfaf4814bc62c56
* http://jqueryui.com
*
* Copyright 2013 jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/tabs/
*
* Depends:
* jquery.ui.core.js
* jquery.ui.widget.js
*/
(function( $, undefined ) {
var tabId = 0,
rhash = /#.*$/;
function getNextTabId() {
return ++tabId;
}
function isLocal( anchor ) {
return anchor.hash.length > 1 &&
decodeURIComponent( anchor.href.replace( rhash, "" ) ) ===
decodeURIComponent( location.href.replace( rhash, "" ) );
}
$.widget( "ui.tabs", {
version: "fadf2b312a05040436451c64bbfaf4814bc62c56",
delay: 300,
options: {
active: null,
collapsible: false,
event: "click",
heightStyle: "content",
hide: null,
show: null,
activate: null,
beforeActivate: null,
beforeLoad: null,
load: null
},
_create: function() {
var that = this,
options = this.options;
this.running = false;
this.element
.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" )
.toggleClass( "ui-tabs-collapsible", options.collapsible )
.delegate( ".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function( event ) {
if ( $( this ).is( ".ui-state-disabled" ) ) {
event.preventDefault();
}
})
.delegate( ".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
if ( $( this ).closest( "li" ).is( ".ui-state-disabled" ) ) {
this.blur();
}
});
this._processTabs();
options.active = this._initialActive();
if ( $.isArray( options.disabled ) ) {
options.disabled = $.unique( options.disabled.concat(
$.map( this.tabs.filter( ".ui-state-disabled" ), function( li ) {
return that.tabs.index( li );
})
) ).sort();
}
if ( this.options.active !== false && this.anchors.length ) {
this.active = this._findActive( options.active );
} else {
this.active = $();
}
this._refresh();
if ( this.active.length ) {
this.load( options.active );
}
},
_initialActive: function() {
var active = this.options.active,
collapsible = this.options.collapsible,
locationHash = location.hash.substring( 1 );
if ( active === null ) {
if ( locationHash ) {
this.tabs.each(function( i, tab ) {
if ( $( tab ).attr( "aria-controls" ) === locationHash ) {
active = i;
return false;
}
});
}
if ( active === null ) {
active = this.tabs.index( this.tabs.filter( ".ui-tabs-active" ) );
}
if ( active === null || active === -1 ) {
active = this.tabs.length ? 0 : false;
}
}
if ( active !== false ) {
active = this.tabs.index( this.tabs.eq( active ) );
if ( active === -1 ) {
active = collapsible ? false : 0;
}
}
if ( !collapsible && active === false && this.anchors.length ) {
active = 0;
}
return active;
},
_getCreateEventData: function() {
return {
tab: this.active,
panel: !this.active.length ? $() : this._getPanelForTab( this.active )
};
},
_tabKeydown: function( event ) {
var focusedTab = $( this.document[0].activeElement ).closest( "li" ),
selectedIndex = this.tabs.index( focusedTab ),
goingForward = true;
if ( this._handlePageNav( event ) ) {
return;
}
switch ( event.keyCode ) {
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
selectedIndex++;
break;
case $.ui.keyCode.UP:
case $.ui.keyCode.LEFT:
goingForward = false;
selectedIndex--;
break;
case $.ui.keyCode.END:
selectedIndex = this.anchors.length - 1;
break;
case $.ui.keyCode.HOME:
selectedIndex = 0;
break;
case $.ui.keyCode.SPACE:
event.preventDefault();
clearTimeout( this.activating );
this._activate( selectedIndex );
return;
case $.ui.keyCode.ENTER:
event.preventDefault();
clearTimeout( this.activating );
this._activate( selectedIndex === this.options.active ? false : selectedIndex );
return;
default:
return;
}
event.preventDefault();
clearTimeout( this.activating );
selectedIndex = this._focusNextTab( selectedIndex, goingForward );
if ( !event.ctrlKey ) {
focusedTab.attr( "aria-selected", "false" );
this.tabs.eq( selectedIndex ).attr( "aria-selected", "true" );
this.activating = this._delay(function() {
this.option( "active", selectedIndex );
}, this.delay );
}
},
_panelKeydown: function( event ) {
if ( this._handlePageNav( event ) ) {
return;
}
if ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {
event.preventDefault();
this.active.focus();
}
},
_handlePageNav: function( event ) {
if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {
this._activate( this._focusNextTab( this.options.active - 1, false ) );
return true;
}
if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {
this._activate( this._focusNextTab( this.options.active + 1, true ) );
return true;
}
},
_findNextTab: function( index, goingForward ) {
var lastTabIndex = this.tabs.length - 1;
function constrain() {
if ( index > lastTabIndex ) {
index = 0;
}
if ( index < 0 ) {
index = lastTabIndex;
}
return index;
}
while ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {
index = goingForward ? index + 1 : index - 1;
}
return index;
},
_focusNextTab: function( index, goingForward ) {
index = this._findNextTab( index, goingForward );
this.tabs.eq( index ).focus();
return index;
},
_setOption: function( key, value ) {
if ( key === "active" ) {
this._activate( value );
return;
}
if ( key === "disabled" ) {
this._setupDisabled( value );
return;
}
this._super( key, value);
if ( key === "collapsible" ) {
this.element.toggleClass( "ui-tabs-collapsible", value );
if ( !value && this.options.active === false ) {
this._activate( 0 );
}
}
if ( key === "event" ) {
this._setupEvents( value );
}
if ( key === "heightStyle" ) {
this._setupHeightStyle( value );
}
},
_tabId: function( tab ) {
return tab.attr( "aria-controls" ) || "ui-tabs-" + getNextTabId();
},
_sanitizeSelector: function( hash ) {
return hash ? hash.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
},
refresh: function() {
var options = this.options,
lis = this.tablist.children( ":has(a[href])" );
options.disabled = $.map( lis.filter( ".ui-state-disabled" ), function( tab ) {
return lis.index( tab );
});
this._processTabs();
if ( options.active === false || !this.anchors.length ) {
options.active = false;
this.active = $();
} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {
if ( this.tabs.length === options.disabled.length ) {
options.active = false;
this.active = $();
} else {
this._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );
}
} else {
options.active = this.tabs.index( this.active );
}
this._refresh();
},
_refresh: function() {
this._setupDisabled( this.options.disabled );
this._setupEvents( this.options.event );
this._setupHeightStyle( this.options.heightStyle );
this.tabs.not( this.active ).attr({
"aria-selected": "false",
tabIndex: -1
});
this.panels.not( this._getPanelForTab( this.active ) )
.hide()
.attr({
"aria-expanded": "false",
"aria-hidden": "true"
});
if ( !this.active.length ) {
this.tabs.eq( 0 ).attr( "tabIndex", 0 );
} else {
this.active
.addClass( "ui-tabs-active ui-state-active" )
.attr({
"aria-selected": "true",
tabIndex: 0
});
this._getPanelForTab( this.active )
.show()
.attr({
"aria-expanded": "true",
"aria-hidden": "false"
});
}
},
_processTabs: function() {
var that = this;
this.tablist = this._getList()
.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
.attr( "role", "tablist" );
this.tabs = this.tablist.find( "> li:has(a[href])" )
.addClass( "ui-state-default ui-corner-top" )
.attr({
role: "tab",
tabIndex: -1
});
this.anchors = this.tabs.map(function() {
return $( "a", this )[ 0 ];
})
.addClass( "ui-tabs-anchor" )
.attr({
role: "presentation",
tabIndex: -1
});
this.panels = $();
this.anchors.each(function( i, anchor ) {
var selector, panel, panelId,
anchorId = $( anchor ).uniqueId().attr( "id" ),
tab = $( anchor ).closest( "li" ),
originalAriaControls = tab.attr( "aria-controls" );
if ( isLocal( anchor ) ) {
selector = anchor.hash;
panel = that.element.find( that._sanitizeSelector( selector ) );
} else {
panelId = that._tabId( tab );
selector = "#" + panelId;
panel = that.element.find( selector );
if ( !panel.length ) {
panel = that._createPanel( panelId );
panel.insertAfter( that.panels[ i - 1 ] || that.tablist );
}
panel.attr( "aria-live", "polite" );
}
if ( panel.length) {
that.panels = that.panels.add( panel );
}
if ( originalAriaControls ) {
tab.data( "ui-tabs-aria-controls", originalAriaControls );
}
tab.attr({
"aria-controls": selector.substring( 1 ),
"aria-labelledby": anchorId
});
panel.attr( "aria-labelledby", anchorId );
});
this.panels
.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
.attr( "role", "tabpanel" );
},
_getList: function() {
return this.element.find( "ol,ul" ).eq( 0 );
},
_createPanel: function( id ) {
return $( "<div>" )
.attr( "id", id )
.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
.data( "ui-tabs-destroy", true );
},
_setupDisabled: function( disabled ) {
if ( $.isArray( disabled ) ) {
if ( !disabled.length ) {
disabled = false;
} else if ( disabled.length === this.anchors.length ) {
disabled = true;
}
}
for ( var i = 0, li; ( li = this.tabs[ i ] ); i++ ) {
if ( disabled === true || $.inArray( i, disabled ) !== -1 ) {
$( li )
.addClass( "ui-state-disabled" )
.attr( "aria-disabled", "true" );
} else {
$( li )
.removeClass( "ui-state-disabled" )
.removeAttr( "aria-disabled" );
}
}
this.options.disabled = disabled;
},
_setupEvents: function( event ) {
var events = {
click: function( event ) {
event.preventDefault();
}
};
if ( event ) {
$.each( event.split(" "), function( index, eventName ) {
events[ eventName ] = "_eventHandler";
});
}
this._off( this.anchors.add( this.tabs ).add( this.panels ) );
this._on( this.anchors, events );
this._on( this.tabs, { keydown: "_tabKeydown" } );
this._on( this.panels, { keydown: "_panelKeydown" } );
this._focusable( this.tabs );
this._hoverable( this.tabs );
},
_setupHeightStyle: function( heightStyle ) {
var maxHeight,
parent = this.element.parent();
if ( heightStyle === "fill" ) {
maxHeight = parent.height();
maxHeight -= this.element.outerHeight() - this.element.height();
this.element.siblings( ":visible" ).each(function() {
var elem = $( this ),
position = elem.css( "position" );
if ( position === "absolute" || position === "fixed" ) {
return;
}
maxHeight -= elem.outerHeight( true );
});
this.element.children().not( this.panels ).each(function() {
maxHeight -= $( this ).outerHeight( true );
});
this.panels.each(function() {
$( this ).height( Math.max( 0, maxHeight -
$( this ).innerHeight() + $( this ).height() ) );
})
.css( "overflow", "auto" );
} else if ( heightStyle === "auto" ) {
maxHeight = 0;
this.panels.each(function() {
maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
}).height( maxHeight );
}
},
_eventHandler: function( event ) {
var options = this.options,
active = this.active,
anchor = $( event.currentTarget ),
tab = anchor.closest( "li" ),
clickedIsActive = tab[ 0 ] === active[ 0 ],
collapsing = clickedIsActive && options.collapsible,
toShow = collapsing ? $() : this._getPanelForTab( tab ),
toHide = !active.length ? $() : this._getPanelForTab( active ),
eventData = {
oldTab: active,
oldPanel: toHide,
newTab: collapsing ? $() : tab,
newPanel: toShow
};
event.preventDefault();
if ( tab.hasClass( "ui-state-disabled" ) ||
tab.hasClass( "ui-tabs-loading" ) ||
this.running ||
( clickedIsActive && !options.collapsible ) ||
( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
return;
}
options.active = collapsing ? false : this.tabs.index( tab );
this.active = clickedIsActive ? $() : tab;
if ( this.xhr ) {
this.xhr.abort();
}
if ( !toHide.length && !toShow.length ) {
$.error( "jQuery UI Tabs: Mismatching fragment identifier." );
}
if ( toShow.length ) {
this.load( this.tabs.index( tab ), event );
}
this._toggle( event, eventData );
},
_toggle: function( event, eventData ) {
var that = this,
toShow = eventData.newPanel,
toHide = eventData.oldPanel;
this.running = true;
function complete() {
that.running = false;
that._trigger( "activate", event, eventData );
}
function show() {
eventData.newTab.closest( "li" ).addClass( "ui-tabs-active ui-state-active" );
if ( toShow.length && that.options.show ) {
that._show( toShow, that.options.show, complete );
} else {
toShow.show();
complete();
}
}
if ( toHide.length && this.options.hide ) {
this._hide( toHide, this.options.hide, function() {
eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
show();
});
} else {
eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
toHide.hide();
show();
}
toHide.attr({
"aria-expanded": "false",
"aria-hidden": "true"
});
eventData.oldTab.attr( "aria-selected", "false" );
if ( toShow.length && toHide.length ) {
eventData.oldTab.attr( "tabIndex", -1 );
} else if ( toShow.length ) {
this.tabs.filter(function() {
return $( this ).attr( "tabIndex" ) === 0;
})
.attr( "tabIndex", -1 );
}
toShow.attr({
"aria-expanded": "true",
"aria-hidden": "false"
});
eventData.newTab.attr({
"aria-selected": "true",
tabIndex: 0
});
},
_activate: function( index ) {
var anchor,
active = this._findActive( index );
if ( active[ 0 ] === this.active[ 0 ] ) {
return;
}
if ( !active.length ) {
active = this.active;
}
anchor = active.find( ".ui-tabs-anchor" )[ 0 ];
this._eventHandler({
target: anchor,
currentTarget: anchor,
preventDefault: $.noop
});
},
_findActive: function( index ) {
return index === false ? $() : this.tabs.eq( index );
},
_getIndex: function( index ) {
if ( typeof index === "string" ) {
index = this.anchors.index( this.anchors.filter( "[href$='" + index + "']" ) );
}
return index;
},
_destroy: function() {
if ( this.xhr ) {
this.xhr.abort();
}
this.element.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" );
this.tablist
.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
.removeAttr( "role" );
this.anchors
.removeClass( "ui-tabs-anchor" )
.removeAttr( "role" )
.removeAttr( "tabIndex" )
.removeUniqueId();
this.tabs.add( this.panels ).each(function() {
if ( $.data( this, "ui-tabs-destroy" ) ) {
$( this ).remove();
} else {
$( this )
.removeClass( "ui-state-default ui-state-active ui-state-disabled " +
"ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel" )
.removeAttr( "tabIndex" )
.removeAttr( "aria-live" )
.removeAttr( "aria-busy" )
.removeAttr( "aria-selected" )
.removeAttr( "aria-labelledby" )
.removeAttr( "aria-hidden" )
.removeAttr( "aria-expanded" )
.removeAttr( "role" );
}
});
this.tabs.each(function() {
var li = $( this ),
prev = li.data( "ui-tabs-aria-controls" );
if ( prev ) {
li
.attr( "aria-controls", prev )
.removeData( "ui-tabs-aria-controls" );
} else {
li.removeAttr( "aria-controls" );
}
});
this.panels.show();
if ( this.options.heightStyle !== "content" ) {
this.panels.css( "height", "" );
}
},
enable: function( index ) {
var disabled = this.options.disabled;
if ( disabled === false ) {
return;
}
if ( index === undefined ) {
disabled = false;
} else {
index = this._getIndex( index );
if ( $.isArray( disabled ) ) {
disabled = $.map( disabled, function( num ) {
return num !== index ? num : null;
});
} else {
disabled = $.map( this.tabs, function( li, num ) {
return num !== index ? num : null;
});
}
}
this._setupDisabled( disabled );
},
disable: function( index ) {
var disabled = this.options.disabled;
if ( disabled === true ) {
return;
}
if ( index === undefined ) {
disabled = true;
} else {
index = this._getIndex( index );
if ( $.inArray( index, disabled ) !== -1 ) {
return;
}
if ( $.isArray( disabled ) ) {
disabled = $.merge( [ index ], disabled ).sort();
} else {
disabled = [ index ];
}
}
this._setupDisabled( disabled );
},
load: function( index, event ) {
index = this._getIndex( index );
var that = this,
tab = this.tabs.eq( index ),
anchor = tab.find( ".ui-tabs-anchor" ),
panel = this._getPanelForTab( tab ),
eventData = {
tab: tab,
panel: panel
};
if ( isLocal( anchor[ 0 ] ) ) {
return;
}
this.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );
if ( this.xhr && this.xhr.statusText !== "canceled" ) {
tab.addClass( "ui-tabs-loading" );
panel.attr( "aria-busy", "true" );
this.xhr
.success(function( response ) {
setTimeout(function() {
panel.html( response );
that._trigger( "load", event, eventData );
}, 1 );
})
.complete(function( jqXHR, status ) {
setTimeout(function() {
if ( status === "abort" ) {
that.panels.stop( false, true );
}
tab.removeClass( "ui-tabs-loading" );
panel.removeAttr( "aria-busy" );
if ( jqXHR === that.xhr ) {
delete that.xhr;
}
}, 1 );
});
}
},
_ajaxSettings: function( anchor, event, eventData ) {
var that = this;
return {
url: anchor.attr( "href" ),
beforeSend: function( jqXHR, settings ) {
return that._trigger( "beforeLoad", event,
$.extend( { jqXHR : jqXHR, ajaxSettings: settings }, eventData ) );
}
};
},
_getPanelForTab: function( tab ) {
var id = $( tab ).attr( "aria-controls" );
return this.element.find( this._sanitizeSelector( "#" + id ) );
}
});
})( jQuery );
(function( $, undefined ) {
})( jQuery );
(function( $, window ) {
$.mobile.iosorientationfixEnabled = true;
var ua = navigator.userAgent,
zoom,
evt, x, y, z, aig;
if ( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test( ua ) && ua.indexOf( "AppleWebKit" ) > -1 ) ) {
$.mobile.iosorientationfixEnabled = false;
return;
}
zoom = $.mobile.zoom;
function checkTilt( e ) {
evt = e.originalEvent;
aig = evt.accelerationIncludingGravity;
x = Math.abs( aig.x );
y = Math.abs( aig.y );
z = Math.abs( aig.z );
if ( !window.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
if ( zoom.enabled ) {
zoom.disable();
}
} else if ( !zoom.enabled ) {
zoom.enable();
}
}
$.mobile.document.on( "mobileinit", function() {
if ( $.mobile.iosorientationfixEnabled ) {
$.mobile.window
.bind( "orientationchange.iosorientationfix", zoom.enable )
.bind( "devicemotion.iosorientationfix", checkTilt );
}
});
}( jQuery, this ));
(function( $, window, undefined ) {
var $html = $( "html" ),
$window = $.mobile.window;
function hideRenderingClass() {
$html.removeClass( "ui-mobile-rendering" );
}
$( window.document ).trigger( "mobileinit" );
if ( !$.mobile.gradeA() ) {
return;
}
if ( $.mobile.ajaxBlacklist ) {
$.mobile.ajaxEnabled = false;
}
$html.addClass( "ui-mobile ui-mobile-rendering" );
setTimeout( hideRenderingClass, 5000 );
$.extend( $.mobile, {
initializePage: function() {
var path = $.mobile.path,
$pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
hash = path.stripHash( path.stripQueryParams(path.parseLocation().hash) ),
theLocation = $.mobile.path.parseLocation(),
hashPage = hash ? document.getElementById( hash ) : undefined;
if ( !$pages.length ) {
$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
}
$pages.each(function() {
var $this = $( this );
if ( !$this[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) ) {
$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) ||
path.convertUrlToDataUrl( theLocation.pathname + theLocation.search ) );
}
});
$.mobile.firstPage = $pages.first();
$.mobile.pageContainer = $.mobile.firstPage
.parent()
.addClass( "ui-mobile-viewport" )
.pagecontainer();
$.mobile.navreadyDeferred.resolve();
$window.trigger( "pagecontainercreate" );
$.mobile.loading( "show" );
hideRenderingClass();
if ( ! ( $.mobile.hashListeningEnabled &&
$.mobile.path.isHashValid( location.hash ) &&
( $( hashPage ).is( ":jqmData(role='page')" ) ||
$.mobile.path.isPath( hash ) ||
hash === $.mobile.dialogHashKey ) ) ) {
if ( $.event.special.navigate.isPushStateEnabled() ) {
$.mobile.navigate.navigator.squash( path.parseLocation().href );
}
$.mobile.changePage( $.mobile.firstPage, {
transition: "none",
reverse: true,
changeHash: false,
fromHashChange: true
});
} else {
if ( !$.event.special.navigate.isPushStateEnabled() ) {
$window.trigger( "hashchange", [true] );
} else {
$.mobile.navigate.history.stack = [];
$.mobile.navigate( $.mobile.path.isPath( location.hash ) ? location.hash : location.href );
}
}
}
});
$(function() {
$.support.inlineSVG();
if ( $.mobile.hideUrlBar ) {
window.scrollTo( 0, 1 );
}
$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $.mobile.window.scrollTop() === 1 ) ? 0 : 1;
if ( $.mobile.autoInitializePage ) {
$.mobile.initializePage();
}
if ( $.mobile.hideUrlBar ) {
$window.load( $.mobile.silentScroll );
}
if ( !$.support.cssPointerEvents ) {
$.mobile.document.delegate( ".ui-state-disabled,.ui-disabled", "vclick",
function( e ) {
e.preventDefault();
e.stopImmediatePropagation();
}
);
}
});
}( jQuery, this ));
}));

