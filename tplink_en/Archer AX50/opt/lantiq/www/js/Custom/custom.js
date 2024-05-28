// detect IE
var IEversion = detectIE();
function detectIE() {
    var ua = window.navigator.userAgent;

    // test values
    // IE 10
    //ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    // IE 11
    //ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    // IE 12
    //ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function loadXMLDoc(filename)
{
    if (window.XMLHttpRequest)
    {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (IEversion == false || typeof XSLTProcessor !== undefined) {
        if( xhttp.overrideMimeType){
            xhttp.overrideMimeType('text/xml');
        }
    }
    try {
        xhttp.open("GET", filename, false);
        xhttp.send();
    }
    catch (e) {

    }
    return xhttp.responseXML;
}
function dotstarremove(editobjectname) {
    var objectname = editobjectname;
    var number = objectname.match(/\d+/g);
    if (number != null) {
        for (var k = 0; k < number.length; k++) {
            value = '.' + number[k]
            objectname = objectname.replace(value, '.*');
        }
    }
    return objectname;

}
function displayResult(page, page1) {
    var dropdownParameters = [];
    var IEbrowser = false;
    localStorage.setItem('xml', page)
    if (window.ActiveXObject || "ActiveXObject" in window)
    {
        IEbrowser = true;
        var xml = new ActiveXObject("Microsoft.XMLDOM")
        xml.async = false
        xml.load(page + ".xml")
    }else{
        xml = loadXMLDoc(page + ".xml");
    }
    
//    if (xml != null) {
    var formeditobjects;
    var formeditoriginalobjects = [];
    if (localStorage.getItem('formeditobjects') != null) {
        formeditobjects = localStorage.getItem('formeditobjects').split(',');
        var lastremoveobjects=[];
        for (var dsr = 0; dsr < formeditobjects.length; dsr++) {
            var objectname = formeditobjects[dsr];
            objectname=objectname.replace(/(^[.\s]+)|([.\s]+$)/g, '')
            lastremoveobjects.push(objectname)
            var number = objectname.match(/\d+/g);
            if (number != null) {
                for (var k = 0; k < number.length; k++) {
                    value = '.' + number[k]
                    objectname = objectname.replace(value, '.*');
                }
            }
            formeditoriginalobjects.push(objectname);
        }
        formeditobjects=lastremoveobjects
    }
    if (xml.documentElement.nodeName == "view") {
        x = xml.getElementsByTagName('object')
        var formInd = localStorage.getItem('formIndex');
        var tableIndex = localStorage.getItem('tableIndex');
//    alert(formInd);
        for (var i = 0; i < x.length; i++) {
            if (x[i].getAttribute('viewtype') != null) {
//            if (formInd != null)
//                x[i].setAttribute('formindex', formInd);
                if (x[i].getAttribute('name') != null) {
                    x[i].setAttribute('previousname',x[i].getAttribute('name'));
                }
                if (x[i].getAttribute('viewtype') == "form" && x[i].getAttribute('name') != null && localStorage.getItem('formeditobjects') != null) {
                    console.log(formeditoriginalobjects.indexOf(dotstarremove(x[i].getAttribute('name'))))
//                    x[i].setAttribute('previousname',x[i].getAttribute('name'));
                    x[i].setAttribute('name', formeditobjects[formeditoriginalobjects.indexOf(dotstarremove(x[i].getAttribute('name')))]);
                }
                var objectparams = [];
                xsl = x[i].getElementsByTagName('object');
                sectionxsl = x[i].getElementsByTagName('section');
                if (sectionxsl.length > 0)
                    xsl = sectionxsl
                var objectname = '';
                if (xsl.length < 1) {
                    objectname = x[i].getAttribute('name');
                    if( IEbrowser && objectname != null)
                        x[i].setAttribute('originalobject', objectname);
                    else if(!IEbrowser)
                        x[i].setAttribute('originalobject', objectname);
                    if (formInd != null) {
                        var objectname = x[i].getAttribute('name');
                        var number = objectname.match(/\*+/g);
                        if(localStorage.getItem('accordionchildparentrelation')){
                            if (number != null) {
                                objectname = objectname.replace('.' + number[0], "." + localStorage.getItem('accordionchildparentrelation'))
                            }
                            console.log('accordionchildparentrelation',localStorage.getItem('accordionchildparentrelation'));
                        }
                        if(localStorage.getItem('dyndnsClientEdit')){
                            if (number != null) {
                                objectname = objectname.replace('.' + number[0], "." + formInd)
                            }
                            console.log(localStorage.getItem('Accordiontable'));
                        }else{
                            if (number != null) {
                                for (var k = 0; k < number.length; k++) {
                                    value = '.' + number[k]
                                    objectname = objectname.replace(value, "." + formInd)
                                }
                            }
                        }
                        if( IEbrowser && objectname != null)
                            x[i].setAttribute("name", objectname);
                        else if(!IEbrowser)
                            x[i].setAttribute("name", objectname);
//                    x[i].setAttribute("name", x[i].getAttribute('name') + formInd);
                    }
                    if (tableIndex != null) {
                        tableIndex = tableIndex.split(',');
                        var objectname = x[i].getAttribute('name');
                        var number = objectname.match(/\*+/g);
                        if (number != null) {
                            for (var k = 0; k < number.length; k++) {
                                value = '.' + number[k]
                                objectname = objectname.replace(value, "." + tableIndex[k])
                            }
                        }
                        if( IEbrowser && objectname != null)
                            x[i].setAttribute("name", objectname);
                        else if(!IEbrowser)
                            x[i].setAttribute("name", objectname);
                    }
                    /* table acorrdion feature */
                    if(localStorage.getItem('Accordiontable') == "true" && localStorage.getItem('Accordiontableindex') != undefined){
                        var objectname = x[i].getAttribute('name');
                        objectname = objectname.replace('*',parseInt(localStorage.getItem('Accordiontableindex'))+1);
                        if( IEbrowser && objectname != null)
                            x[i].setAttribute("name", objectname);
                        else if(!IEbrowser)
                            x[i].setAttribute("name", objectname);
                        console.log("objectname",objectname,parseInt(localStorage.getItem('Accordiontableindex'))+1);
                        console.log(localStorage.getItem('formIndex'),localStorage.getItem('formMode'),localStorage.getItem('dyndnsClientEdit'), localStorage.getItem('Accordiontable'));
                    }
                    var params = x[i].getElementsByTagName('parameter');
                    for (var k = 0; k < params.length; k++) {
                        if (formInd != null && params[k].getAttribute('parentname') != null) {
                            params[k].setAttribute('parentname', params[k].getAttribute('parentname').replace(/\*/g, formInd))
                        }
                        if (formInd != null && params[k].getAttribute('dependsonobject') != null) {
                            params[k].setAttribute('dependsonobject', params[k].getAttribute('dependsonobject').replace(/\*/g, formInd))
                        }
                        if (params[k].getAttribute('type') != "button")
                            objectparams.push(x[i].getAttribute('name') + "?" + params[k].getAttribute('name'))
                        if (params[k].getAttribute('type') == "dropdown1")
                            dropdownParameters.push(x[i].getAttribute('name').replace(/\./g, "").replace(/\*/g, "") + "__" + params[k].getAttribute('name'))
                    }
                }
                else
                {
                    for (var j = 0; j < xsl.length; j++) {
                        xsl[j].setAttribute('originalobject', xsl[j].getAttribute('name'));
                        objectname += xsl[j].getAttribute('name') + ",";

                        if (formInd != null) {
                            var objectname = xsl[j].getAttribute('name');
                            var number = objectname.match(/\*+/g);
                            var arrayobjectindex = formeditoriginalobjects.indexOf(dotstarremove(objectname));
                            if (arrayobjectindex > -1) {
                                objectname = formeditobjects[arrayobjectindex];
                            } else {
                                if (number != null) {
                                 if(localStorage.getItem("ObjectsPassed")!==null){
									//getting the object list from accordion
										objectsaccordionarray=localStorage.getItem("ObjectsPassed").split(",");
										console.info("objectsaccordionarray :",objectsaccordionarray);
										
										for(li=0; li<objectsaccordionarray.length;li++){
											var originalelement=objectsaccordionarray[li];
											var withNoDigits = originalelement.replace(/[0-9]/g, '');
											modifiedobjectname = objectname.split("*").join("");
											var Result = withNoDigits.localeCompare(modifiedobjectname);

                                    		  if(Result==0 ){
												  objectname=originalelement;
												  var numberPattern = /\d+/;
												  
												  // changing the form index and object name for each object

												  formInd=originalelement.match(numberPattern);
												 
												  break;
											  }
											
										}
											 console.info( "final objectname ::", objectname); 
										
									}else{
                                    for (var k = 0; k < number.length; k++) {
                                        value = '.' + number[k]
                                        objectname = objectname.replace(value, "." + formInd)
                                    }
									}
                                }
                            }
                            xsl[j].setAttribute("name", objectname);
//                        xsl[j].setAttribute("name", xsl[j].getAttribute('name') + formInd);

                        }
                        if (tableIndex != null) {
                            tableIndex = tableIndex.split(',');
                            var objectname = xsl[j].getAttribute('name');
                            var number = objectname.match(/\*+/g);
                            if (number != null) {
                                for (var k = 0; k < number.length; k++) {
                                    value = '.' + number[k]
                                    objectname = objectname.replace(value, "." + tableIndex[k])
                                }
                            }
                            xsl[j].setAttribute("name", objectname);
                        }
                        var params = xsl[j].getElementsByTagName('parameter');
                        for (var l = 0; l < params.length; l++) {
//                        console.log(params[l].getAttribute('parentname'))
                            if (formInd != null && params[l].getAttribute('parentname') != null) {
                                params[l].setAttribute('parentname', params[l].getAttribute('parentname').replace(/\*/g, formInd))
                            }
                            if (formInd != null && params[l].getAttribute('dependsonobject') != null) {
                                params[l].setAttribute('dependsonobject', params[l].getAttribute('dependsonobject').replace(/\*/g, formInd))
                            }
                            if (params[l].getAttribute('name') != "button")
                                objectparams.push(xsl[j].getAttribute('name') + "?" + params[l].getAttribute('name'))
                            if (params[l].getAttribute('type') == "dropdown1") {
                                dropdownParameters.push(xsl[j].getAttribute('name').replace(/\./g, "").replace(/\*/g, "") + "__" + params[l].getAttribute('name'))
                            }
                        }
                    }
                }
                if (objectname != null)
                    localStorage.setItem(page + "" + x[i].getAttribute('viewtype'), objectname.replace(/(^[,\s]+)|([,\s]+$)/g, ''))
                localStorage.setItem(page + "" + x[i].getAttribute('viewtype') + "params", objectparams)

            }

        }
        localStorage.removeItem('tableIndex');
        xsl = loadXMLDoc(page1 + ".xsl");
        if (window.ActiveXObject || "ActiveXObject" in window)
        {
//            var xml = new ActiveXObject("Microsoft.XMLDOM")
//            xml.async = false
//            xml.load(page + ".xml")

// Load the XSL
            var xsl = new ActiveXObject("Microsoft.XMLDOM")
            xsl.async = false
            xsl.load(page1 + ".xsl")

// Transform
            return  (xml.transformNode(xsl))
        }
        else if ((document.implementation && document.implementation.createDocument) || typeof XSLTProcessor !== undefined)
        {
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            resultDocument = xsltProcessor.transformToFragment(xml, document);
        }
        console.log(dropdownParameters);
        localStorage.setItem('dropdown', dropdownParameters);
//    console.log(new XMLSerializer().serializeToString(resultDocument))
    }
    else
        location.href = "#/custom/error-404";
    localStorage.removeItem('formeditobjects');
    return (new XMLSerializer().serializeToString(resultDocument));
}


