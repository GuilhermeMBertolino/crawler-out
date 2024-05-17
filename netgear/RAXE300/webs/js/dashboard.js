var Speed=50;

var timer_internet=0;
var timer_wireless=0;
var timer_attached=0;
var timer_parental, timer_readyshare, timer_guest;

var Internet_bottom, Wireless_bottom, AttachedDevices_bottom;
var ParentalControls_bottom, ReadyShare_bottom, GuestNetwork_bottom;

var internet1, internet2;
var wireless1, wireless2, wireless3, wireless4;
var attached1, attached2;
var parental1, parental2;
var readyshare1, readyshare2;
var guest1, guest2, guest3, guest4;

var Internet_status;
var Wireless_status1, Wireless_status2;
var AttachedDevices_status;
var ParentalControls_status;
var ReadyShare_status;
var Guest_status1, Guest_status2;

function run_marquee() {
    Marquee_init();
    Marquee_set_timeInterval();
    Marquee_set_event();
}

function Marquee_init()
{
    Speed=50;

    timer_internet=0;
    timer_wireless=0;
    timer_attached=0;
    timer_parental=0;
    timer_readyshare=0;
    timer_guest=0;

    Internet_bottom = document.getElementById("Internet_bottom");
    Wireless_bottom = document.getElementById("Wireless_bottom");
    AttachedDevices_bottom = document.getElementById("AttachedDevices-bottom");
    ParentalControls_bottom = document.getElementById("ParentalControls-bottom");
    ReadyShare_bottom = document.getElementById("ReadyShare-bottom");
    GuestNetwork_bottom = document.getElementById("GuestNetwork-bottom");

    internet1= document.getElementById("internet1");
    internet2= document.getElementById("internet2");
    wireless1= document.getElementById("wireless1");
    wireless2= document.getElementById("wireless2");
    wireless3= document.getElementById("wireless3");
    wireless4= document.getElementById("wireless4");
    attached1= document.getElementById("attached1");
    attached2= document.getElementById("attached2");
    parental1= document.getElementById("parental1");
    parental2= document.getElementById("parental2");
    readyshare1= document.getElementById("readyshare1");
    readyshare2= document.getElementById("readyshare2");
    guest1= document.getElementById("guest1");
    guest2= document.getElementById("guest2");
    guest3= document.getElementById("guest3");
    guest4= document.getElementById("guest4");

    Internet_status= document.getElementById("Internet-status");
    Wireless_status1= document.getElementById("Wireless-status1");
    Wireless_status2= document.getElementById("Wireless-status2");
    AttachedDevices_status= document.getElementById("AttachedDevices-status");
    ParentalControls_status= document.getElementById("ParentalControls-status");
    ReadyShare_status= document.getElementById("ReadyShare-status");
    Guest_status1= document.getElementById("Guest-status1");
    Guest_status2= document.getElementById("Guest-status2");    
}

function Marquee_set_timeInterval()
{
    if(need_to_run_marquee("Internet")) {

        internet2.innerHTML=internet1.innerHTML;

        timer_internet=setInterval(picMarquee_interent,Speed);
    } 
    
   
    if(need_to_run_marquee("Wireless")) {
            $("#wireless1").css("text-align", "left");
            $("#wireless2").css("text-align", "left");  
            $("#wireless3").css("text-align", "left");  
            $("#wireless4").css("text-align", "left");  
            wireless2.innerHTML=wireless1.innerHTML;
            wireless4.innerHTML=wireless3.innerHTML;
            timer_wireless=setInterval(picMarquee_wireless,Speed);
        }    
        
    if(need_to_run_marquee("Attached")) {  
        attached2.innerHTML=attached1.innerHTML;
        timer_attached=setInterval(picMarquee_attached,Speed);
    }
        

    if(need_to_run_marquee("Parental")) {   
        parental2.innerHTML=parental1.innerHTML;
        timer_parental=setInterval(picMarquee_parental,Speed);
    }
    
    //alert(readyshare1.clientWidth + " " + ReadyShare_bottom.clientWidth);
    //alert(document.getElementById("ReadyShare-status").scrollWidth);
    //alert(document.getElementById("ReadyShare-condition").scrollWidth);
    
    if(need_to_run_marquee("ReadySHARE")) {
        readyshare2.innerHTML=readyshare1.innerHTML;
        timer_readyshare=setInterval(picMarquee_readyshare,Speed);
    }
    if(need_to_run_marquee("Guest1")) {
            $("#guest1").css("text-align", "left");
            $("#guest2").css("text-align", "left");
            guest2.innerHTML=guest1.innerHTML;
            timer_guest=setInterval(picMarquee_guest,Speed);
        }    
    if(need_to_run_marquee("Guest2")) {
            $("#guest3").css("text-align", "left");
            $("#guest4").css("text-align", "left");
            guest4.innerHTML=guest3.innerHTML;
            if(timer_guest==0)
                timer_guest=setInterval(picMarquee_guest,Speed);
        }  

}

/* handle mouseover and mouseout event */
function Marquee_set_event()
{
    if(timer_internet) {
        Internet_bottom.onmouseover=function(){
            clearInterval(timer_internet);
        }	
        Internet_bottom.onmouseout=function(){
            timer_internet=setInterval(picMarquee_interent,Speed);
        }        
    }
    if(wireless2 && wireless4 && timer_wireless) {
        Wireless_bottom.onmouseover=function(){
            clearInterval(timer_wireless);
        }
        Wireless_bottom.onmouseout=function(){
            timer_wireless=setInterval(picMarquee_wireless,Speed);
        }         
    }
    
    if(timer_attached) {
        AttachedDevices_bottom.onmouseover=function(){
            clearInterval(timer_attached);
        }
        AttachedDevices_bottom.onmouseout=function(){
            timer_attached=setInterval(picMarquee_attached,Speed);
        }        
    }
    if(timer_parental) {
        ParentalControls_bottom.onmouseover=function(){
            clearInterval(timer_parental);
        }
        ParentalControls_bottom.onmouseout=function(){
            timer_parental=setInterval(picMarquee_parental,Speed);
        }    
    }
    if(timer_readyshare) {
        ReadyShare_bottom.onmouseover=function(){
            clearInterval(timer_readyshare);
        }
        ReadyShare_bottom.onmouseout=function(){
            timer_readyshare=setInterval(picMarquee_readyshare,Speed);
        }    
    }
    
    if((guest2 || guest4) && timer_guest) {
        GuestNetwork_bottom.onmouseover=function(){
            clearInterval(timer_guest);
        }
        GuestNetwork_bottom.onmouseout=function(){
            timer_guest=setInterval(picMarquee_guest,Speed);
        }        
    }
}

function need_to_run_marquee(item)
{
    if(get_browser()=="Netscape") {
        if(item=="Internet" && Internet_status) {
            if (Internet_status.scrollWidth + 12 >
                Internet_bottom.clientWidth)
                return true;    
        } else if (item=="Wireless" && Wireless_status1) {
            if ((Wireless_status1.scrollWidth + 12 >
                Wireless_bottom.clientWidth) ||
                (Wireless_status2.scrollWidth + 12 >
                Wireless_bottom.clientWidth))
                return true;    
        } else if (item=="Attached" && AttachedDevices_status) {
            if (AttachedDevices_status.scrollWidth + 12 >
                AttachedDevices_bottom.clientWidth)
                return true;    
        } else if (item=="Parental" && ParentalControls_status) {      
            if (ParentalControls_status.scrollWidth + 12 >
                ParentalControls_bottom.clientWidth)
                return true;    
        } else if (item=="ReadySHARE" && ReadyShare_status) {
            if (ReadyShare_status.scrollWidth + 12 >
                ReadyShare_bottom.clientWidth)
                return true;
        } else if (item=="Guest1" && Guest_status1) {
            
            if (Guest_status1.scrollWidth + 12 >
                GuestNetwork_bottom.clientWidth)
                return true;    
        } else if (item=="Guest2" && Guest_status2) {
            if (Guest_status2.scrollWidth + 12 >
                GuestNetwork_bottom.clientWidth)
                return true;    
        }
    }
    else{
        if(item=="Internet") {
            if (internet1.clientWidth - Internet_bottom.clientWidth > 0)
                return true;    
        } else if (item=="Wireless") {
            if(wireless1 && wireless3 && wireless2 && wireless4 && Wireless_bottom &&
                (wireless1.clientWidth - Wireless_bottom.clientWidth > 0 ||
                wireless3.clientWidth - Wireless_bottom.clientWidth > 0) 
            ) 
                return true;    
        } else if (item=="Attached") {
            if (attached1.clientWidth - AttachedDevices_bottom.clientWidth > 0)
                return true;    
//        } else if (item=="Parental") {
//            if (parental1.clientWidth - ParentalControls_bottom.clientWidth > 0)
//                return true;    
       } else if (item=="ReadySHARE") {
           if (readyshare1.clientWidth - ReadyShare_bottom.clientWidth > 0)
              return true;
        } else if (item=="Guest1") {
            if(guest1 && guest2)  
                if(guest1.clientWidth - GuestNetwork_bottom.clientWidth > 0)
                    return true;    
        } else if (item=="Guest2") {
            if(guest3 && guest4)
                if(guest3.clientWidth - GuestNetwork_bottom.clientWidth > 0) 
                    return true;    
        }    
    }

    return false;
}

/* Internet */	
function picMarquee_interent(){
    if(internet2.offsetWidth - Internet_bottom.scrollLeft <= 0){
        Internet_bottom.scrollLeft = 0;
    }else{
        var temp = Internet_bottom.scrollLeft;
        Internet_bottom.scrollLeft++;
        if(temp==Internet_bottom.scrollLeft)
            Internet_bottom.scrollLeft=0;
    }
}

/* Wireless */    
function picMarquee_wireless(){
    if(wireless2.offsetWidth - Wireless_bottom.scrollLeft <= 0){
        Wireless_bottom.scrollLeft = 0;
    }else{
        var temp = Wireless_bottom.scrollLeft;
        Wireless_bottom.scrollLeft++;
        if(temp==Wireless_bottom.scrollLeft)
            Wireless_bottom.scrollLeft=0;
    }
}


/* Attached Devices */
function picMarquee_attached(){
    if(attached2.offsetWidth - AttachedDevices_bottom.scrollLeft <= 0){
        AttachedDevices_bottom.scrollLeft = 0;
    }else{
        var temp = AttachedDevices_bottom.scrollLeft;
        AttachedDevices_bottom.scrollLeft++;
        if(temp==AttachedDevices_bottom.scrollLeft)
            AttachedDevices_bottom.scrollLeft=0;
    }
}

/* Parental Controls */
function picMarquee_parental(){

    if(parental2.offsetWidth - ParentalControls_bottom.scrollLeft <= 0){
        ParentalControls_bottom.scrollLeft = 0;
    }else{
        var temp = ParentalControls_bottom.scrollLeft;
        ParentalControls_bottom.scrollLeft++;
        if(temp==ParentalControls_bottom.scrollLeft)
            ParentalControls_bottom.scrollLeft=0;
    }
}

/* ReadySHARE */
function picMarquee_readyshare(){
    if(readyshare2.offsetWidth - ReadyShare_bottom.scrollLeft <= 0){
        ReadyShare_bottom.scrollLeft = 0;
    }else{
        var temp = ReadyShare_bottom.scrollLeft;
        ReadyShare_bottom.scrollLeft++;
        if(temp==ReadyShare_bottom.scrollLeft)
            ReadyShare_bottom.scrollLeft=0;
    }
}

/* Guest Network */    
function picMarquee_guest(){
    if(guest2.offsetWidth - GuestNetwork_bottom.scrollLeft <= 0){
        GuestNetwork_bottom.scrollLeft = 0;
    }else{
        var temp = GuestNetwork_bottom.scrollLeft;
        GuestNetwork_bottom.scrollLeft++;
        if(temp==GuestNetwork_bottom.scrollLeft)
            GuestNetwork_bottom.scrollLeft=0;
    }
}

function get_browser() {
    if(navigator.userAgent.indexOf("Navigator") != -1) 
        return "Netscape";
    else if (!(false || !!document.documentMode) && !!window.StyleMedia)
        return "Edge";
    //else if(navigator.userAgent.indexOf("MSIE") != -1)
    else if(false || !!document.documentMode)
        return "IE";
    //else if(navigator.userAgent.indexOf("Chrome") != -1 )
    else if(!!window.chrome && !!window.chrome.webstore)
        return "Chrome";//bug 21975:spec1.9-p228,[usb] the real links are different for different browsers
    //else if(navigator.userAgent.indexOf("Firefox") != -1)
    else if(typeof InstallTrigger !== 'undefined')
        return "Firefox";
    else if((navigator.userAgent.indexOf("iPad") != -1) ||
            (navigator.userAgent.indexOf("iPhone") != -1) ||
            (navigator.userAgent.indexOf("iPod") != -1))
        return "iOS";
    else if(navigator.userAgent.indexOf("Safari") != -1 )
        return "Safari";
    else if(navigator.userAgent.indexOf("Camino") != -1) 
        return "Camino"; 
    else if(navigator.userAgent.indexOf("Gecko/") != -1)
        return "Gecko"; 
    else if(navigator.userAgent.indexOf("Opera") != -1)
        return "Opera";
    else
        return "";      
} 