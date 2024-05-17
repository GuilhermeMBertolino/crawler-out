function loadhelp(fname,anchname)
{
    var imgSrc = $('#help-button');
    var lastURL = fname + '_h.htm';
    var topHelpFramUnexist = (top.helpframe == undefined) ? true : false;

    if ( (loadhelp.arguments.length == 1 ) || (anchname == '' ) )
    {
        if(topHelpFramUnexist){
            $('#helpframe').attr('src', lastURL);
        }else{
            top.helpframe.location.href = lastURL;
        }
    }
    else
    {
        if(topHelpFramUnexist){
            $('#helpframe').attr('src', lastURL + '#' + anchname);
        }else{
            top.helpframe.location.href = lastURL + '#' + anchname;
        }
    }

    if(imgSrc.length)
    {
        if(imgSrc.attr('src').search('up') < 0)
        {
            $('.help-frame-div').show();
        }else{
            $('.help-frame-div').hide();
        }
    }
}

function sAlert(str){  
    var msgw,msgh,bordercolor;  msgw=420;//提示窗口的宽度
    msgh=100;//提示窗口的高度  
    msgh=100;//提示窗口的高度
    titleheight=25//提示窗口标题高度 
    var sWidth,sHeight;  
    sWidth=document.body.offsetWidth;//浏览器工作区域内页面宽度 或使用 screen.width//屏幕的宽度
    sHeight=screen.height;//屏幕高度（垂直分辨率）
    //背景层（大小与窗口有效区域相同，即当弹出对话框时，背景显示为放射状透明灰色）
    var bgObj=document.createElement("div");//创建一个div对象（背景层） //动态创建元素，这里创建的是 div  
    //定义div属性，即相当于(相当于，但确不是，必须对对象属性进行定义  
    bgObj.setAttribute('id','bgDiv');  
    bgObj.style.position="absolute";
    bgObj.style.top="0";  
    bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";  
    bgObj.style.opacity="0.6";  
    bgObj.style.left="0";  
    bgObj.style.width=sWidth + "px"; 
    bgObj.style.height=sHeight + "px";  
    bgObj.style.zIndex = "10000";  
    document.body.appendChild(bgObj);//在body内添加该div对象
    //创建一个div对象（提示框层）
    var msgObj=document.createElement("div")  
    msgObj.setAttribute("id","msgDiv"); 
    msgObj.setAttribute("align","center"); 
    msgObj.style.background=" url(img/confirm.gif) no-repeat"; 
    msgObj.style.position = "absolute";  
    msgObj.style.left = "70%";  
    msgObj.style.top = "10%"; 
    msgObj.style.marginLeft = "-225px" ; 
    msgObj.style.width = msgw + "px";  
    msgObj.style.height ="160px";
    msgObj.style.zIndex = "10001"; 
    var div1=document.createElement("div");//创建一个h4对象（提示框标题栏）
    //定义h4的属性，即相当于
    div1.setAttribute("id","msgTitle"); 
    div1.setAttribute("align","left");
    div1.style.marginTop="30px"
    div1.style.marginLeft="30px"
    div1.style.marginRight="30px"
    div1.style.marginBottom="10px";
    div1.style.padding="0px"; 
    div1.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);"; 
    div1.style.opacity="0.75"; 
    div1.style.height="85px";  
    div1.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif"; 
    div1.style.cursor="pointer";  
    div1.innerHTML=str
    var button=document.createElement("input");//创建一个input对象（提示框按钮） 
    //定义input的属性，即相当于  
    button.setAttribute("type","button"); 
    button.setAttribute("value","应用"); 
    button.style.width="80px"; 
    button.style.marginLeft="140px";  
    button.style.background=" #702b86"; 
    button.style.border="1px solid "+ " #702b86";  
    button.style.color="white"; 
    button.onclick=submit_button;
    var button1=document.createElement("input");//创建一个input对象（提示框按钮） 
    //定义input的属性，即相当于  
    button1.setAttribute("type","button"); 
    button1.setAttribute("value","取消"); 
    button1.style.width="80px"; 
    button1.style.marginLeft="10px";  
    button1.style.background="#5bb6e5"; 
    button1.style.border="1px solid "+ "#5bb6e5";  
    button1.style.color="white"; 
    button1.onclick=removeObj;

    function removeObj(){//点击标题栏触发的事件   
    document.body.removeChild(bgObj);//删除背景层Div 
    document.getElementById("msgDiv").removeChild(div1);//删除提示框的标题栏 
    document.body.removeChild(msgObj);//删除提示框层 
    }  
    function submit_button(){//点击标题栏触发的事件   
        form.submit();
    }  

    document.body.appendChild(msgObj);//在body内添加提示框div对象msgObj 
    document.getElementById("msgDiv").appendChild(div1);//在提示框div中添加标题栏对象title 
    var txt=document.createElement("p");//创建一个p对象（提示框提示信息） 
    document.getElementById("msgDiv").appendChild(div1);
    document.getElementById("msgDiv").appendChild(button);//在提示框div中添加按钮对象button 
    document.getElementById("msgDiv").appendChild(button1);
}  

function inIframe(){
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function applyDialog(id, msg, applyFun) {
    // var inIfram = inIframe();
    // if(inIfram){
    //     parent.applyDialog(id, msg, applyFun);
    //     return true;
    // }
    $('#' + id).remove();
    $('<div>').attr('id', id).appendTo('body');
    $('#' + id).bsDialog({
        title: '',
        modalClass: 'modal-lg',
        autoShow: true,
        showFooterBtn: true,
        hideTitle:true,
        buttonCenter: true,
        start: function(){
            // var text = 'You must enter the download and upload speed before enabling Quality of Service.';
            var text = msg;
            $('#'+id).find('.modal-body').prop('id','msgTitle').text(text);
        },
        button:[
            {
                text: 'OK',
                className: 'button-apply',
                idName: 'ok_bt',
                click: function(){
                    if(typeof applyFun != 'undefined'){
                        applyFun();
                    }
                    $('#'+id).bsDialog('close');
                }

            }
        ]
    });
}

function confirmDialog(id, msg, applyFun) {
    // var inIfram = inIframe();
    // if(inIfram){
    //     parent.confirmDialog(id, msg, applyFun);
    //     return true;
    // }
    $('#' + id).remove();
    $('<div>').attr('id', id).appendTo('body');
    $('#' + id).bsDialog({
        title: '',
        modalClass: 'modal-lg',
        autoShow: true,
        showFooterBtn: true,
        hideTitle:true,
        buttonCenter: true,
        start: function(){
            // var text = 'You must enter the download and upload speed before enabling Quality of Service.';
            var text = msg;
            $('#'+id).find('.modal-body').prop('id','msgTitle').text(text);
        },
        button:[
            {
                text: 'Cancel',
                className: 'new_cancel_bt',
                idName: 'cancel_bt',
                click: function(){
                    $('#'+id).bsDialog('close');
                }

            },
            {
                text: 'OK',
                className: 'button-apply',
                idName: 'ok_bt',
                click: function(){
                    if(typeof applyFun != 'undefined'){
                        applyFun();
                    }
                    $('#'+id).bsDialog('close');
                }

            }
        ]
    });
}