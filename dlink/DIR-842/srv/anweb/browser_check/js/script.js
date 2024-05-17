window.onload = function () {
	
	var GET = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
    
	document.getElementById('continue').onclick = function () {
		var origin = GET['origin']
		document.cookie = 'skip_browser_check=true'
		
		if(origin) window.location.href = origin;
		else window.location.href = '/';
	}
	
	if(navigator.userAgent.indexOf('MSIE') == -1) {
		document.getElementById('ie_warning').style.display = "none";
	}
}
