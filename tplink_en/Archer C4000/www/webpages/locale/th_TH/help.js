(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"อินเทอร์เน็ต",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays relevant information about the wide area network (Internet) connection."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"การเชื่อมต่อไวเลส 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays relevant information about the wireless network."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "แสดงข้อมูลเกี่ยวกับพอร์ตอีเทอเน็ต (LAN)"
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"เครือข่ายสำหรับบุคคลคนภายนอก  2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays information about the wireless networks for guests."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB Devices",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays information of the current USB storage devices and/or printer connected to the router via the USB ports."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"ประสิทธิภาพ",
               CONTENT: [{
                           type: "paragraph",
                           content: "แสดงสถานะประสิทธิภาพของเราท์เตอร์"
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"ผู้ใช้การเชื่อมต่อแบบใช้สาย",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays information of the wired devices connected to the network."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"ผู้ใช้การเชื่อมต่อแบบไวเลส",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays information of the wireless devices connected to the network."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"อินเทอร์เน็ต",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configure the IPv4 parameters and select the appropriate MAC Clone method as you need."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Select the Internet Connection Type and enter corresponding parameters."
                       } ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : Dynamic IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Select this type if you are provided with a DHCP server connection by the ISP."
                       } ,{                      
                           type: "name",
                           title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                           content: "These parameters are automatically assigned by the DHCP server from the ISP."
                       } ,{                      
                           type: "name",
                           title: "รับ IP ใหม่",
                           content: "Click to get new IP parameters from the DHCP server."
                       } ,{                      
                           type: "name",
                           title: "ปล่อย IP",
                           content: "Click to release all IP addresses assigned by the DHCP server."
                       } ,{                      
                           type: "name",
                           title: "ที่อยู่ DNS",
                           content: "ถ้าผู้ให้บริการอินเทอร์เน็ตเป็นคนจัดการ DNS Address,เลือกที่ช่องนี้และใส่ Primary DNS และ Secondary DNS Address ลงไปให้ถูกต้อง มิฉะนั้น DNS Address จะถูกระบุโดยผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "ค่าเริ่มต้นขนาดของ MTU ทั่วไปสำหรับเครือข่ายอีเทอเน็ตคือ 1,500 ไบต์ ไม่แนะนำให้เปลี่ยนค่าเริ่มต้นขนาดของ MTU เว้นแต่มีการขอจากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "ชื่อเราท์เตอร์",
                           content: "ใส่ชื่อของเราท์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "Get IP Using Unicast DHCP",
                           content: "Select this checkbox if the ISP's DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
                       } ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : Static IP"
                       } ,{                      
                           type: "paragraph",
                           content: "เลือกชนิดนี้ ถ้าคุณมีการจัดการกับหมายเลข (แบบกำหนด) IP Address,Subnet Mask,Gatewayและ DNS โดยผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                           content: "Enter the information provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "ค่าเริ่มต้นขนาดของ MTU ทั่วไปสำหรับเครือข่ายอีเทอเน็ตคือ 1,500 ไบต์ ไม่แนะนำให้เปลี่ยนค่าเริ่มต้นขนาดของ MTU เว้นแต่มีการขอจากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : BigPond Cable"
                       } ,{                      
                           type: "paragraph",
                           content: "Select this type if the ISP provides BigPond Cable connection."
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "Auth. Server",
                           content: "ใส่ชื่อIP address หรือโฮสเนมของauthentication"
                       } ,{                      
                           type: "name",
                           title: "Auth. Domain",
                           content: "Enter the server's domain name suffix (based on the location). For example, nsw.bigpond.net.au for NSW/ACT, vic.bigpond.net.au for VIC/TAS/WA/SA/NT, or qld.bigpond.net.au for QLD."
                       } ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "ค่าเริ่มต้นขนาดของ MTU ทั่วไปสำหรับเครือข่ายอีเทอเน็ตคือ 1,500 ไบต์ ไม่แนะนำให้เปลี่ยนค่าเริ่มต้นขนาดของ MTU เว้นแต่มีการขอจากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "โหมดการเชื่อมต่อ",
                           content: "เลือกโหมดการเชื่อมต่อให้เหมาะสมในการเชื่อมต่ออินเทอร์เน็ต",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะเชื่อมต่อใหม่อัตโนมัตเมื่อหลุดจากการเชื่อมต่อ"
                       } ,{                      
                           type: "name",
                           title: "ตามความต้องการ",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะถูกตัดโดยอัตโนมัติหลังจากกำหนดเวลา ได้ผ่านพ้นไป. การเชื่อมต่อจะถูกสร้างขึ้นเมื่อคุณพยายามจะเข้าสู่อินเทอร์เน็ตอีกครั้ง"
                       } ,{                      
                           type: "name",
                           title: "ด้วยตัวเอง",
                           content: "ในโหมดนี้, การเชื่อมต่ออินเทอร์เน็ตจะถูกควบคุมโดยคลิกที่ปุ่มเชื่อมต่อหรือตัดการเชื่อมต่อ โหมดนี้จะรองรับการใช้ \"Max Idle Time\" ใส่เวลาสูงสุด(ในหน่วยนาที)ที่การเชื่อมต่ออินเทอร์เน็ตที่ยังไม่สามารถใช้งานได้ก่อนมันจะถูกตัดลงใน \"Max Idle time\" ค่าทั่วไปคือ 15 นาที ถ้าคุณต้องการเชื่อมต่ออินเทอร์เน็ตตลอดเวลา ใส่ 0 (ศุนย์)"
                       }]
} ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "เลือกชนิดนี้ถ้าคุณใช้บริการ DSL (Digital Subscriber Line) และถูกกำหนดด้วย ชื่อผู้ใช้ และ รหัส จากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "IP Address/Primary DNS/Secondary DNS",
                           content: "These parameters are automatically assigned by the DHCP server on the ISP."
                       } ,{                      
                           type: "name",
                           title: "Secondary Connection (None, Dynamic IP, Static IP)",
       children: [{                      
                           type: "name",
                           title: "None",
                           content: "ให้ทำการเลือกเลือกนี้ถ้าไม่มีการเชื่อมต่อสำรอง"
                       } ,{                      
                           type: "name",
                           title: "Dynamic IP",
                           content: "ให้ทำการเลือกนี้ถ้าหมายเลขIPและซับเนสแมสถูกระบุโดยอัตโนมัติโดยผู้ให้บริการอินเทอร์เน็ต",
       children: [{                      
                           type: "name",
                           title: "รับ IP ใหม่",
                           content: "Click to renew the IP parameters from the ISP."
                       } ,{                      
                           type: "name",
                           title: "ปล่อย IP",
                           content: "Click to release the assigned IP parameters."
                       }]
} ,{                      
                           type: "name",
                           title: "Static IP",
                           content: "Select if the IP address and subnet mask are provided by the ISP, and enter the information in the corresponding fields."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "ขนาด MTU (Maximum Transmission Unit) สำหรับเครือข่ายอีเทอเน็ตคือ 1480 ไบต์",
       children: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "In a rare case, the ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                       }]
} ,{                      
                           type: "name",
                           title: "Service Name/Access Concentrator Name",
                           content: "By default, the Service Name and Access Concentrator (AC) Name are left blank. These fields should not be configured unless required by the ISP."
                       } ,{                      
                           type: "name",
                           title: "ตรวจสอบช่วงเวลาออนไลน์",
                           content: "ระบุช่วงเวลาที่ค่าระหว่าง 0 และ 120 ( หน่วยวินาที) ซึ่งเราท์เตอร์ตรวจสอบ ผู้ให้บริการออนไลน์ในทุกช่วง โดยค่าเริ่มต้นคือ 10 "
                       } ,{                      
                           type: "name",
                           title: "IP Address",
                           content: "If the ISP provides a specific (fixed) IP address, select Use the following IP Address and enter the IP address in the field. Otherwise select Get Dynamically from ISP to obtain a server-assigned IP address automatically."
                       } ,{                      
                           type: "name",
                           title: "ที่อยู่ DNS",
                           content: "If the ISP provides the specific (fixed) DNS IP addresses, select Use the Following DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise select Get Dynamically from ISP to obtain the server-assigned DNS IP address(es) automatically."
                       } ,{                      
                           type: "name",
                           title: "โหมดการเชื่อมต่อ",
                           content: "เลือกโหมดการเชื่อมต่อให้เหมาะสมในการเชื่อมต่ออินเทอร์เน็ต",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะเชื่อมต่อใหม่อัตโนมัตเมื่อหลุดจากการเชื่อมต่อ"
                       } ,{                      
                           type: "name",
                           title: "ตามความต้องการ",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะถูกตัดโดยอัตโนมัติหลังจากกำหนดเวลา ได้ผ่านพ้นไป. การเชื่อมต่อจะถูกสร้างขึ้นเมื่อคุณพยายามจะเข้าสู่อินเทอร์เน็ตอีกครั้ง"
                       } ,{                      
                           type: "name",
                           title: "พื้นฐานเวลา",
                           content: "ในโหมดนี้,การเชื่อมต่อจะถูกสร้างในระยะเวลาที่กำหนดเท่านั้น ถ้าตัวเลือกถูกเลือก ให้ใส่เวลาเริ่มต้นและเวลาสิ้นสุดในรูปแบบ ชั่วโมง:นาที"
                       } ,{                      
                           type: "name",
                           title: "ด้วยตัวเอง",
                           content: "ในโหมดนี้, การเชื่อมต่ออินเทอร์เน็ตจะถูกควบคุมโดยคลิกที่ปุ่มเชื่อมต่อหรือตัดการเชื่อมต่อ โหมดนี้จะรองรับการใช้ \"Max Idle Time\" ใส่เวลาสูงสุด(ในหน่วยนาที)ที่การเชื่อมต่ออินเทอร์เน็ตที่ยังไม่สามารถใช้งานได้ก่อนมันจะถูกตัดลงใน \"Max Idle time\" ค่าทั่วไปคือ 15 นาที ถ้าคุณต้องการเชื่อมต่ออินเทอร์เน็ตตลอดเวลา ใส่ 0 (ศุนย์)"
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "การเชื่อมต่อแบบโหมดบนฐานเวลาจะถูกอ้างอิงจากระบบเวลาบน Advance->System Tools->Time Settings สามารถตั้งต่าได้"
                       }]
} ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "เลือกชนิดนี้ถ้าคุณเชื่อมต่อ L2TP/PPTP VPN Server และถูกกำหนดด้วยชื่อผู้ใช้,รหัสผู้ใช้ และหมายเลขไอ/โดเมนเนมของเซิร์ฟเวอร์โดยผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "IP Address/Primary DNS/Secondary DNS",
                           content: "These parameters will be automatically assigned by the DHCP server from the ISP."
                       } ,{                      
                           type: "name",
                           title: "การเชื่อมต่อสำรอง (Dynamic IP หรือ Static IP)",
       children: [{                      
                           type: "name",
                           title: "Dynamic IP",
                           content: "ให้ทำการเลือกนี้ถ้าหมายเลขIPและซับเนสแมสถูกระบุโดยอัตโนมัติโดยผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "Static IP",
                           content: "Select if the IP address, subnet mask, gateway, and DNS addresses are provided by the ISP, and enter the information in the corresponding fields."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN Server IP/Domain Name",
                           content: "Enter the VPN server's IP address or domain name provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "ค่าเริ่มต้น และ ค่าทั่วไป MTU  (Maximum Transmission Unit) ขนาดสำหรับเครือข่ายอีเทอร์เน็ตมากที่สุดคือ 1,460 ไบต์สำหรับ L2TP หรือ 1,420 ไบต์สำหรับ PPTP จะไม่แนะนำให้เปลี่ยนค่าเริ่มต้นขนาด MTU เว้นแต่มีการร้องขอจาก ISP"
                       } ,{                      
                           type: "name",
                           title: "โหมดการเชื่อมต่อ",
                           content: "เลือกโหมดการเชื่อมต่อให้เหมาะสมในการเชื่อมต่ออินเทอร์เน็ต",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะเชื่อมต่อใหม่อัตโนมัตเมื่อหลุดจากการเชื่อมต่อ"
                       } ,{                      
                           type: "name",
                           title: "ตามความต้องการ",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะถูกตัดโดยอัตโนมัติหลังจากกำหนดเวลา ได้ผ่านพ้นไป. การเชื่อมต่อจะถูกสร้างขึ้นเมื่อคุณพยายามจะเข้าสู่อินเทอร์เน็ตอีกครั้ง"
                       } ,{                      
                           type: "name",
                           title: "ด้วยตัวเอง",
                           content: "ในโหมดนี้, การเชื่อมต่ออินเทอร์เน็ตจะถูกควบคุมโดยคลิกที่ปุ่มเชื่อมต่อหรือตัดการเชื่อมต่อ โหมดนี้จะรองรับการใช้ \"Max Idle Time\" ใส่เวลาสูงสุด(ในหน่วยนาที)ที่การเชื่อมต่ออินเทอร์เน็ตที่ยังไม่สามารถใช้งานได้ก่อนมันจะถูกตัดลงใน \"Max Idle time\" ค่าทั่วไปคือ 15 นาที ถ้าคุณต้องการเชื่อมต่ออินเทอร์เน็ตตลอดเวลา ใส่ 0 (ศุนย์)"
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Mac Clone",
               CONTENT: [{
                           type: "paragraph",
                           content: "Select the appropriate MAC Clone method as you need."
                       } ,{                      
                           type: "name",
                           title: "ไม่โคลน MAC Address",
                           content: "ไม่ทำการเปลี่ยนค่า MAC address เริ่มต้นของเราท์เตอร์ ในกรณีที่ผู้ให้บริการอินเทอร์เน็ต ไม่ได้ผูก IP address กับ MAC address ไว้ด้วยกัน"
                       } ,{                      
                           type: "name",
                           title: "โคลน MAC แอดเดรสของคอมพิวเตอร์เครื่องปัจจุบัน",
                           content: "เลือกที่การคัดลอก MAC Address ปัจจุบันของคอมพิวพ์เตอร์ที่ใช้เชื่อมต่อเราท์เตอร์ ในกรณีผู้ให้บริการระบุ IP Address นี้ให้ใช้ผูกอยู่กับ MAC Address ของคอมพิวพ์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "ใช้ตัวเลือก MAC Address",
                           content: "ใส่ MAC Address ด้วยตนเอง ในกรณีผู้ให้บริการระบุ IP Address นี้ให้ใช้ผูกอยู่กับ MAC Address ของคอมพิวพ์เตอร์ที่เฉพาะเจาะจง"
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"การรวมการเชื่อมต่อระยะไกล",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "การรวมลิงค์เครือข่ายระยะไกล แปลงพอร์ตแลน 1 ไปยังพอร์ต WAN และทำให้แบนด์วิธสูงโดยผ่านเส้นทางข้อมูลเส้นเดียว ให้ใช้งานอินเทอร์เน็ตได้เร็วขึ้นจากผู้ให้บริการอินเทอร์เน็ตที่ให้อัตราแบนด์วิดธ์มากกว่า 1Gbps และไม่ถูกจำกัด ด้วยฮาร์ดแวร์เครือข่ายของคุณ"
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "หมายเหตุ",
                           content: "ก่อนเปิดใช้งานคุณลักษณะนี้ ตรวจให้แน่ใจว่า ISP ของคุณสนับสนุนการรวมเครือข่ายระยะไกล และโมเด็มของคุณมีสองพอร์ต WAN"
                       } ,{                      
                           type: "step",
                           title: "To apply WAN aggregation",
       content: [ 
                "1. สลับในการรวมระบบ WAN เพื่อเปิดการใช้งาน",
                "2. คลิกบันทึก",
                "3. เชื่อมต่อพอร์ต WAN ของเราเตอร์และพอร์ต LAN1 กับโมเด็ม 2 พอร์ต WAN กับสายอีเธอร์เน็ตสองเส้น"]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the MAC address, IP address and subnet mask of the router."
                       } ,{                      
                           type: "name",
                           title: "MAC Address",
                           content: "เป็นหมายเลขที่ระบุคอมพิวเตอร์ที่ถูกใส่ลงไปในอินเทอร์เน็ตพอร์ต(LAN)ของเราท์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "IP Address",
                           content: "Displays the router's default IP address which is used to log in to the router's web management page. You can change it to another one."
                       } ,{                      
                           type: "name",
                           title: "Subnet Mask",
                           content: "Select an assigned identifier used by the LAN port to route Internal and External traffic or enter a new subnet mask."
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "ถ้า IP Address ใหม่ไม่ใช่ subnet เดียวกันกับอันเก่า , ที่จัดเก็บของ IP Address ใน DHCP Server จะถูกตั้งค่าโดยอัตโนมัติ อย่างไรก็ตาม การจำลงเซิร์ฟเวอร์และ DMZ host จะไม่มีผลกระทบอะไรจนกระทั่งพวกเขาแก้การตั้งค่ากลับมา."
                       }]
},
       LINK_AGG :{ 
               TITLE:"การรวมลิงค์",
               CONTENT: [{
                           type: "paragraph",
                           content: "Link Aggregation เป็นการรวมสองพอร์ตและจำลองเป็นเส้นทางการส่งข้อมูลความเร็วสูงเพียงเส้นทางเดียว เพื่อสนับสนุนเครือข่ายใช้สายให้มีความเร็วสูง และมีเสถียรภาพมากให้ดียิ่งขึ้น"
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "การตั้งค่า Link Aggregation:",
       content: [ 
                "1. เปิดการใช้งานคุณสมบัติ Link Aggregation",
                "2. ระบุพอร์ตสองพอร์ตที่ต้องการรวมลิงค์ ",
                "3. คลิกบันทึก"]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) is a system through which television services are delivered using the Internet protocol suite over a packet-switched network such as a LAN or the Internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "The IGMP (Internet Group Management Protocol) Snooping feature allows the router to only forward multicast traffic to ports that have requested them."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Select to enable the IGMP Proxy feature if the IPTV service provided by the ISP is IGMP technology-based."
                       } ,{                      
                           type: "name",
                           title: "รุ่น IGMP",
                           content: "เลือกรุ่น IGMP ตาม ISP ของคุณ ซึ่งเริ่มต้นรุ่น IGMP คือเวอร์ชั่น V2"
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "การส่งผ่านไวเลสแบบมัลติแคส",
                           content: "Select to enable the Wireless Multicast Forwarding feature which allows the multicast packets to be forwarded to the wireless network."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Select to enable the IPTV feature if the IPTV service provided by the ISP is non-IGMP technology-based."
                       } ,{                      
                           type: "name",
                           title: "โปรไฟล์ ISP",
                           content: "เลือกผู้ให้บริการอินเทอร์เน็ตที่เหมาะสม (Internet Service Provider) รายละเอียดที่จะเสร็จสิ้นการตั้งค่า ซึ่งจะมีโปรไฟล์สามประเภท:",
       children: [{                      
                           type: "name",
                           title: "ชื่อประเทศของผู้ให้บริการ",
                           content: "โปรไฟล์ ISP กับค่าเริ่มต้นในรูปแบบ \"ประเทศ , ชื่อ ISP \" เพียงแค่ค้นหาและเลือกผู้ให้บริการอินเทอร์เน็ตของคุณจากรายการแบบ Drop down"
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "ถ้าผู้ให้บริการอินเทอร์เน็ตไม่มีในรายชื่อและไม่มีค่าที่ต้องการ คุณสามารถเลือกโหมดนี้เพื่อตั้งค่าแลนพอร์ตบนเราท์เตอร์ได้.",
                           content: "ถ้า ISP ของคุณไม่ได้อยู่ในรายการและไม่มีพารามิเตอร์อื่น ๆ ที่จะต้องตั้งค่า IPTV คุณสามารถเลือกรูปแบบนี้และระบุพอร์ต LAN ที่ใช้งานให้กับ IPTV",
       children: [{                      
                           type: "name",
                           title: "พอร์ต LAN1/พอร์ตLAN2/พอร์ตLAN3/พอร์ตLAN4",
                           content: "ระบุประเภทของข้อมูลที่พอร์ต LAN จะส่ง ตัวอย่างเช่นถ้า IPTV ถูกเลือกสำหรับ LAN1 ก็จะส่งข้อมูล IPTV และคุณควรเชื่อมต่อ set-top box ที่พอร์ต LAN1"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "ถ้าผู้ให้บริการอินเทอร์เน็ตไม่มีในรายชื่อและไม่มีค่าที่ต้องการ คุณสามารถเลือกโหมดนี้เพื่อตั้งค่าแลนพอร์ตบนเราท์เตอร์ได้.",
                           content: "ถ้า ISP ของคุณไม่ได้อยู่ในรายการและไม่มีพารามิเตอร์อื่น ๆ ที่จะต้องตั้งค่า IPTV คุณสามารถเลือกรูปแบบนี้และระบุพอร์ต LAN ที่ใช้งานให้กับ IPTV",
       children: [{                      
                           type: "name",
                           title: "แลน2/แลน3/แลน4/แลน5",
                           content: "ระบุชนิดของข้อมูลที่พอร์ต LAN จะส่ง ตัวอย่างเช่น ถ้า IPTV ถูกเลือกสำหรับ LAN2 ก็จะส่งข้อมูล IPTV และคุณควรเชื่อมต่อ set-top box ที่ LAN2"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "ถ้าผู้ให้บริการอินเทอร์เน็ตไม่มีในรายชื่อและไม่มีค่าที่ต้องการ คุณสามารถเลือกโหมดนี้เพื่อตั้งค่าแลนพอร์ตบนเราท์เตอร์ได้.",
                           content: "ถ้า ISP ของคุณไม่ได้อยู่ในรายการและไม่มีพารามิเตอร์อื่น ๆ ที่จะต้องตั้งค่า IPTV คุณสามารถเลือกรูปแบบนี้และระบุพอร์ต LAN ที่ใช้งานให้กับ IPTV",
       children: [{                      
                           type: "name",
                           title: "แลน5/แลน6/แลน7/แลน8",
                           content: "ระบุชนิดของข้อมูลที่พอร์ต LAN จะส่ง ตัวอย่างเช่น ถ้า IPTV ถูกเลือกสำหรับ LAN5 ก็จะส่งข้อมูล IPTV และคุณควรเชื่อมต่อ set-top box ที่ LAN5"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "อื่นๆ",
                           content: "ถ้า ISP ของคุณไม่อยู่ในรายการ แต่มันช่วยให้คุณมีค่าพารามิเตอร์ที่จำเป็นบางอย่างเช่นอินเทอร์เน็ต / VoIP / IPTV VLAN รหัสและลำดับความสำคัญเลือกโปรไฟล์นี้",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "Configure the VLAN IDs and priorities as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "เลือกนี้เพื่อติดตามข้อมูลอินเทอร์เน็ตด้วย มาตรฐาน 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Priority",
                           content: "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to the ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "พอร์ต LAN1/พอร์ตLAN2/พอร์ตLAN3/พอร์ตLAN4",
                           content: "ระบุประเภทของข้อมูลที่พอร์ต LAN จะส่ง ตัวอย่างเช่นถ้า IPTV ถูกเลือกสำหรับ LAN1 ก็จะส่งข้อมูล IPTV และคุณควรเชื่อมต่อ set-top box ที่พอร์ต LAN1"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "อื่นๆ",
                           content: "ถ้า ISP ของคุณไม่อยู่ในรายการ แต่มันช่วยให้คุณมีค่าพารามิเตอร์ที่จำเป็นบางอย่างเช่นอินเทอร์เน็ต / VoIP / IPTV VLAN รหัสและลำดับความสำคัญเลือกโปรไฟล์นี้",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "Configure the VLAN IDs and priorities as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "เลือกนี้เพื่อติดตามข้อมูลอินเทอร์เน็ตด้วย มาตรฐาน 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Priority",
                           content: "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to the ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "แลน2/แลน3/แลน4/แลน5",
                           content: "ระบุชนิดของข้อมูลที่พอร์ต LAN จะส่ง ตัวอย่างเช่น ถ้า IPTV ถูกเลือกสำหรับ LAN2 ก็จะส่งข้อมูล IPTV และคุณควรเชื่อมต่อ set-top box ที่ LAN2"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "อื่นๆ",
                           content: "ถ้า ISP ของคุณไม่อยู่ในรายการ แต่มันช่วยให้คุณมีค่าพารามิเตอร์ที่จำเป็นบางอย่างเช่นอินเทอร์เน็ต / VoIP / IPTV VLAN รหัสและลำดับความสำคัญเลือกโปรไฟล์นี้",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "Configure the VLAN IDs and priorities as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "เลือกนี้เพื่อติดตามข้อมูลอินเทอร์เน็ตด้วย มาตรฐาน 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Priority",
                           content: "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to the ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "แลน5/แลน6/แลน7/แลน8",
                           content: "ระบุชนิดของข้อมูลที่พอร์ต LAN จะส่ง ตัวอย่างเช่น ถ้า IPTV ถูกเลือกสำหรับ LAN5 ก็จะส่งข้อมูล IPTV และคุณควรเชื่อมต่อ set-top box ที่ LAN5"
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP Server",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "ค่าเริ่มต้น DHCP Server จะถูกเปิดเอาไว้; มันระบุ TCP/IP ไปยังอุปกรณ์ผู้ใช้โดยอัตโนมัต.",
                "ห้ามปิด DHCP Server เว้นแต่คุณมี DHCP Server อื่น หรือคุณต้องระบุ TCP/IP ด้วยตัวเองกับทุกอุปกรณ์บนเครือข่ายของคุณ."]
} ,{                      
                           type: "name",
                           title: "IP Address Pool",
                           content: "ระบุช่วงของ IP address นั้น ที่สามารถปล่อยให้กับลูกค้า"
                       } ,{                      
                           type: "name",
                           title: "Address Lease Time",
                           content: "Enter the time duration (between 1 and 2880 minutes) in which an IP address is leased to a client. The default value is 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Address Reservation",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the corresponding parameters of IP-reserved devices."
                       } ,{                      
                           type: "step",
                           title: "การจอง IP Address",
       content: [ 
                "1. คลิก Add",
                "2. Click Scan to choose a currently connected device from the DHCP Client List; or enter the MAC address of your desired client in the MAC Address field and the IP address that you want to reserve for the client in the IP Address field.",
                "3. Enter a description for the client in the Description field.",
                "4. เลือก Enable",
                "5. Click Save."]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to disable this entry, click the Bulb icon."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"รายชื่อผู้ใช้ DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the information of currently connected devices."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamic DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamic DNS (Dynamic Domain Name System) allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting your own website, FTP server, or another server behind the router. To begin with, you need to sign up with a Dynamic DNS service provider such as www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "การติดตั้ง Dynamic DNS",
       content: [ 
                "1. เลือกผู้ให้บริการ DNS ",
                "2. Enter the Username and Password of the Dynamic DNS account.",
                "3. ใส่ Domain Name ที่คุณได้รับมาจากผู้ให้บริการ DDNS",
                "4. Select the Update Interval from the drop-down list.",
                "5. If your service provider is NO-IP, WAN IP Binding can ensure that the domain name is bound to the WAN IP of this router.",
                "6. คลิกเข้าสู่ระบบและบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to use a new DDNS account, please log out first, and then log in with the new account."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamic DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamic DNS (Dynamic Domain Name System) allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting your own website, FTP server, or another server behind the router. To begin with, you need to sign up with a Dynamic DNS service provider such as www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"รายชื่อ Domain Name",
               CONTENT: [{
                           type: "paragraph",
                           content: "This table displays the information of all the domain names that are registered with your cloud account."
                       } ,{                      
                           type: "step",
                           title: "การลงทะเบียนชื่อโดเมนใหม่",
       content: [ 
                "1. คลิกที่สมัครสมาชิก",
                "2. Enter the domain name that you want to register.",
                "3. คลิกบันทึก"]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"การกำหนดเส้นทางด้วยตัวเอง",
               CONTENT: [{
                           type: "paragraph",
                           content: "การกำหนดเส้นทางด้วยตัวเองเราคือการใช้การกำหนดเส้นทางไว้ล่วงหน้าเพื่อเป็นข้อมูลเส้นทางให้เครือข่ายเพื่อไปยังโฮสอื่นๆ"
                       } ,{                      
                           type: "step",
                           title: "การติดตั้งการกำหนดเส้นทางด้วยตัวเอง",
       content: [ 
                "1. คลิก Add",
                "2. Enter an IP address in the Network Destination field to assign the static route for this entry.",
                "3. Enter a subnet mask in the Subnet Mask field to determine the network portion and host portion of the IP address.",
                "4. Enter a gateway IP address in the Default Gateway field to connect the router to the network or host.",
                "5. Select LAN or WAN in the Interface field to specify the type of the Network Destination.",
                "6. Enter a brief description for this entry.",
                "7. เลือก Enable.",
                "8. Click Save."]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to disable this entry, click the Bulb icon."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"ระบบตารางเส้นทาง",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays all valid route entries that are currently in use."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"การตั้งค่าเครือข่ายไวเลส",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configure the wireless settings as you need."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"เชื่อมต่ออัจฉริยะ",
               CONTENT: [{
                           type: "paragraph",
                           content: "เลือกช่องกาเครื่องหมายนี้เพื่อเปิดใช้งานการเชื่อมต่ออัจฉริยะ ฟังก์ชันนี้ช่วยให้อุปกรณ์ทำงานได้เร็วขึ้นโดยมอบหมายอุปกรณ์ให้กับช่วงไวเลสที่ดีที่สุดตามสภาพที่แท้จริง เพื่ิอปรับสมดุลความต้องการเครือข่าย"
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"ไวเลส 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "ชื่อเครือข่าย (SSID)",
                           content: "You are recommended to change the network name (SSID). This field is case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "ซ่อน SSID",
                           content: "Select if you want to hide the 2.4GHz network name (SSID) from the wireless network list. When selected, the SSID will not be broadcast and you need to manually join the network."
                       } ,{                      
                           type: "name",
                           title: "การรักษาความปลอดภัย",
                           content: "เลือก 1 ตัวเลือกจากตัวเลือกความปลอดภัย",
       children: [{                      
                           type: "name",
                           title: "No Security",
                           content: "Select this option to disable the wireless security. This is not recommended."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
       children: [{                      
                           type: "name",
                           title: "a. Version",
                           content: "Select a security version. Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. การเข้ารหัส",
                           content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "รหัสผ่าน",
                           content: "ใส่รหัสผ่านของเครือข่ายไวเลสระหว่าง 8 และ 63 ASCII ตัวอักขระ หรือระหว่าง 8 และ 64 เลขฐานสิบหก ลงในช่องว่าง"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "เลือกตัวเลือกนี้เพื่อเปิดการยืนยันตัวตนที่ดียิ่งขึ้น โดยใช้วิธีเซิร์ฟเวอร์ RADIUS (Remote Authentication Dial In User Service) ถ้าเลือก, WPS จะไม่สามารถใช้งานได้",
       children: [{                      
                           type: "name",
                           title: "a. Version",
                           content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. การเข้ารหัส",
                           content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "c. RADIUS Server IP",
                           content: "ใส่ IP Address ของเซิร์ฟเวอร์ RADIUS"
                       } ,{                      
                           type: "name",
                           title: "d. RADIUS Port",
                           content: "ใส่ หมายเลขพอร์ตของเซิร์ฟเวอร์ RADIUS"
                       } ,{                      
                           type: "name",
                           title: "e. RADIUS Password",
                           content: "ใส่ รหัสของเซิร์ฟเวอร์ RADIUS"
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy). If selected, WPS function will be disabled.",
       children: [{                      
                           type: "name",
                           title: "a. ชนิด",
                           content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. WEP Key Format",
                           content: "ทั้งรูปแบบ ASCII หรือรูปแบบเลขฐานสิบหกถูก รูปแบบ ASCII เป็นการรวมกันของตัวอักขระและตัวเลข รูปแบบฐานสิบหกเป็นการวมกันของตัวเลข (0-9) และตัวอักขระ (A-F,a-f)"
                       } ,{                      
                           type: "name",
                           title: "c. Key Type -เลือกความยาวของรหัส WEP.",
                           content: "เลือกความยาวของรหัส WEP",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "อนุญาตให้ใส่เลขฐานสิบหกได้ 10 ตัว (0-9,A-F,a-f) หรือ 5 ASCII ตัว ลงในช่อง WEP Value Field"
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "อนุญาตให้ใส่เลขฐานสิบหกได้ 26 ตัว (0-9,A-F,a-f) หรือ 13 ASCII ตัว ลงในช่อง WEP Value Field"
                       }]
} ,{                      
                           type: "name",
                           title: "d. Key Value",
                           content: "ป้อนคีย์ WEP ลงในฟิลด์เกี่ยวข้อง"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "ช่องทางสื่อสาร",
                           content: "เลือกช่องสัญญาณสำหรับย่านความถี่เครือข่ายไวเลส 2.4GHz มันจะแนะนำให้ออกจากช่องทางอัตโนมัติ, ถ้าคุณไม่ได้ประสบปัญหาการเชื่อมต่อไวเลสเป็นระยะๆ"
                       } ,{                      
                           type: "name",
                           title: "กำลังส่งสัญญาณ",
                           content: "เลือก High Middle หรือ Low เพื่อระบุข้อมูลกำลังส่งสัญญาณ,เริ่มต้นแนะนำให้ตั้งค่าเป็น High"
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "ฟังก์ชัน Airtime Fairness",
                           content: "ติ๊กที่ช่องนี้เพื่อเปิดใช้งานฟังก์ชัน Airtime Fairness (ATF) ซึ่งจะช่วยให้คุณสามารถเพิ่มประสิทธิภาพการส่งผ่านข้อมูลของแต่ละเครื่อง โดย ATF จะกำหนดปริมาณการรับส่งข้อมูลต่างๆ ที่ส่งไปยังเครื่องปลายทาง"
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "ฟังก์ชัน Multi-User MIMO Feature",
                           content: "คลิกเพื่อเปิดใช้งานฟังก์ชัน Multi-User MIMO"
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"ไวเลส 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "ชื่อเครือข่าย (SSID)",
                           content: "You are recommended to change the network name (SSID). This field is case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "ซ่อน SSID",
                           content: "Select if you want to hide the 5GHz network name (SSID) from the wireless network list. When selected, the SSID will not be broadcast and you need to manually join the network."
                       } ,{                      
                           type: "name",
                           title: "การรักษาความปลอดภัย",
                           content: "เลือก 1 ตัวเลือกจากตัวเลือกความปลอดภัย",
       children: [{                      
                           type: "name",
                           title: "No Security",
                           content: "Select this option to disable the wireless security. This is not recommended."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Select this option to enable the wireless security. This is highly recommended to protect thewireless network from unauthorized access. If selected, configure the following.",
       children: [{                      
                           type: "name",
                           title: "a. Version",
                           content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. การเข้ารหัส",
                           content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "รหัสผ่าน",
                           content: "ใส่รหัสผ่านของเครือข่ายไวเลสระหว่าง 8 และ 63 ASCII ตัวอักขระ หรือระหว่าง 8 และ 64 เลขฐานสิบหก ลงในช่องว่าง"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "เลือกตัวเลือกนี้เพื่อเปิดการยืนยันตัวตนที่ดียิ่งขึ้น โดยใช้วิธีเซิร์ฟเวอร์ RADIUS (Remote Authentication Dial In User Service) ถ้าเลือก, WPS จะไม่สามารถใช้งานได้",
       children: [{                      
                           type: "name",
                           title: "a. Version",
                           content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. การเข้ารหัส",
                           content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "c. RADIUS Server IP",
                           content: "ใส่ IP Address ของเซิร์ฟเวอร์ RADIUS"
                       } ,{                      
                           type: "name",
                           title: "d. RADIUS Port",
                           content: "ใส่ หมายเลขพอร์ตของเซิร์ฟเวอร์ RADIUS"
                       } ,{                      
                           type: "name",
                           title: "e. RADIUS Password",
                           content: "ใส่ รหัสของเซิร์ฟเวอร์ RADIUS"
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy). If selected, WPS function will be disabled.",
       children: [{                      
                           type: "name",
                           title: "a. ชนิด",
                           content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. WEP Key Format",
                           content: "ทั้งรูปแบบ ASCII หรือรูปแบบเลขฐานสิบหกถูก รูปแบบ ASCII เป็นการรวมกันของตัวอักขระและตัวเลข รูปแบบฐานสิบหกเป็นการวมกันของตัวเลข (0-9) และตัวอักขระ (A-F,a-f)"
                       } ,{                      
                           type: "name",
                           title: "c. Key Type -เลือกความยาวของรหัส WEP.",
                           content: "เลือกความยาวของรหัส WEP",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "อนุญาตให้ใส่เลขฐานสิบหกได้ 10 ตัว (0-9,A-F,a-f) หรือ 5 ASCII ตัว ลงในช่อง WEP Value Field"
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "อนุญาตให้ใส่เลขฐานสิบหกได้ 26 ตัว (0-9,A-F,a-f) หรือ 13 ASCII ตัว ลงในช่อง WEP Value Field"
                       }]
} ,{                      
                           type: "name",
                           title: "d. Key Value",
                           content: "ป้อนคีย์ WEP ลงในฟิลด์เกี่ยวข้อง"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "ช่องทางสื่อสาร",
                           content: "เลือกช่องสัญญาณสำหรับย่านความถี่เครือข่ายไวเลส 5GHz มันจะแนะนำให้ออกจากช่องทางอัตโนมัติ, ถ้าคุณไม่มีประบการณ์ในการตั้งค่าการเชื่อมต่อไวเลสมาก่อน"
                       } ,{                      
                           type: "name",
                           title: "กำลังส่งสัญญาณ",
                           content: "เลือก High Middle หรือ Low เพื่อระบุข้อมูลกำลังส่งสัญญาณ,เริ่มต้นแนะนำให้ตั้งค่าเป็น High"
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "ฟังก์ชัน Airtime Fairness",
                           content: "ติ๊กที่ช่องนี้เพื่อเปิดใช้งานฟังก์ชัน Airtime Fairness (ATF) ซึ่งจะช่วยให้คุณสามารถเพิ่มประสิทธิภาพการส่งผ่านข้อมูลของแต่ละเครื่อง โดย ATF จะกำหนดปริมาณการรับส่งข้อมูลต่างๆ ที่ส่งไปยังเครื่องปลายทาง"
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "ฟังก์ชัน Multi-User MIMO Feature",
                           content: "คลิกเพื่อเปิดใช้งานฟังก์ชัน Multi-User MIMO"
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) provides you with an easier approach to set up a security-protected Wi-Fi connection."
                       } ,{                      
                           type: "name",
                           title: "Push Button (recommended)",
       content: [ 
                "This method allows you to easily connect any WPS-enabled device to the wireless network.",
                "Click the Start WPS button on the screen. Within two minutes, press the WPS button on the client device."]
} ,{                      
                           type: "name",
                           title: "Router's PIN",
       content: [ 
                "The default PIN can be found on the label of the router.",
                "Click Generate to get a new PIN or click Default to restore the current PIN to its factory default PIN."]
} ,{                      
                           type: "name",
                           title: "Client's PIN",
       content: [ 
                "This method allows you to add a wireless device manually.",
                "Enter the device's PIN in the field and then click Connect."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Wireless Stations Online",
               CONTENT: [{
                           type: "name",
                           title: "Client Number",
                           content: "แสดงจำนวนของผู้ใช้เครือข่ายไวเลส"
                       } ,{                      
                           type: "name",
                           title: "MAC Address",
                           content: "แสดง MAC Address ของผู้ใช้เครือข่ายไวเลส"
                       } ,{                      
                           type: "name",
                           title: "ชนิดการเชื่อมต่อ",
                           content: "แสดงย่านความถี่เครือข่ายไวเลส (2.4GHz หรือ 5GHz) ของผู้ใช้เครือข่ายไวเลส"
                       } ,{                      
                           type: "name",
                           title: "การรักษาความปลอดภัย",
                           content: "แสดงประเภทการรักษาความปลอดภัยของผู้ใช้เครือข่ายไวเลส"
                       } ,{                      
                           type: "name",
                           title: "ข้อมูลที่รับ",
                           content: "แสดงจำนวนข้อมูลที่รับของผู้ใช้เครือข่ายไวเลส"
                       } ,{                      
                           type: "name",
                           title: "ข้อมูลที่ส่ง",
                           content: "แสดงจำนวนข้อมูลที่ส่งของผู้ใช้เครือข่ายไวเลส"
                       } ,{                      
                           type: "paragraph",
                           content: "คลิก Refresh เพื่ออัพเดทข้อมูลในหน้านี้"
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"กำหนดเวลาไวเลส",
               CONTENT: [{
                           type: "paragraph",
                           content: "With Wireless Schedule, you can disable the wireless signal during a specific period. For example, you can turn off the wireless signal between 00:00 am and 07:00 am."
                       } ,{                      
                           type: "name",
                           title: "Wireless Off Time",
                           content: "Displays the period(s) during which the wireless signal is off.",
       children: [{                      
                           type: "step",
                           title: "To set up wireless off time",
       content: [ 
                "1. คลิก Add",
                "2. Set the time period during which you need the wireless signal to be off.",
                "3. Select repetition days. You can choose \"Every Day\" or specify certain days.",
                "4. คลิ๊กบันทึก"]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"การตั้งค่า",
               CONTENT: [{
                           type: "paragraph",
                           content: "This function allows you to provide Wi-Fi access for guests without disclosing the main network."
                       } ,{                      
                           type: "name",
                           title: "Allow Guests to Access Each Other",
                           content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with each other via methods such as network neighbors, Samba, Ping, and FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Allow Guests to Access My Local Network",
                           content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with the devices connected to the router's LAN ports or main network via methods such as network neighbors, Samba, Ping, and FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"การเชื่อมต่อไวเลส 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "เปิดการใช้งานเครือข่ายสำหรับคนภายนอก",
                           content: "เลือกช่องนี้เพื่อเปิดการใช้งานเครือข่ายสำหรับคนภายนอก"
                       } ,{                      
                           type: "name",
                           title: "ชื่อเครือข่าย (SSID)",
                           content: "คุณสามารถปล่อยให้ใช้ชื่อเดิมของมันเป็นชื่อเริ่มต้นได้ หรือใส่ชื่อใหม่ (สามารถใส่ได้ 32 ตัวอักขระ)"
                       } ,{                      
                           type: "name",
                           title: "ซ่อน SSID",
                           content: "เลือกนี้ถ้าคุณต้องการซ่อนเครือข่ายสำหรับคนภายนอกจากรายชื่อเครือข่าย Wi-Fi"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "ปรับปรุงรหัสผ่านตามช่วงเวลา",
                           content: "Select the update interval of the Guest Network password."
                       } ,{                      
                           type: "name",
                           title: "การรักษาความปลอดภัย",
                           content: "เมื่อคุณไม่ได้เลือกที่จะปรับปรุงรหัสผ่าน เลือกหนึ่งในตัวเลือกการรักษาความปลอดภัยดังต่อไปนี้",
       children: [{                      
                           type: "name",
                           title: "No Security",
                           content: "Select this option to disable the wireless security. This is not recommended."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Select this option to enable the wireless security. This is highly recommended to protect the Guest Network from unauthorized access. If selected, configure the following.",
       children: [{                      
                           type: "name",
                           title: "a. Version",
                           content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                       } ,{                      
                           type: "name",
                           title: "b. การเข้ารหัส",
                           content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "การยืนยันตัวตนด้วย Portal จะช่วยเพิ่มการรักษาความปลอดภัยในเครือข่ายของคุณ โดยการร้องขอการยืนยันตัวตนจากผู้ใช้งานชั่วคราวเพื่อเข้าถึงเครือข่ายไวเลสของคุณ"
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "สำหรับการตั้งค่าการยืนยันตัวตน Portal",
       content: [ 
                "1. เลือก Portal สำหรับรักษาความปลอดภัย",
                "2. เลือก Simple Password หรือ No Authentication สำหรับการยืนยันตัวตน",
                "A. Simple Password - ระบุรหัสผ่านสำหรับการยืนยันตัวตน (8-16 ตัวอักษร ตัวเลข และเครื่องหมาย _ )",
                "B. No Authentication - เครื่องลูกข่ายสามารถเข้าถึงเครือข่ายได้โดยไม่มีการตรวจสอบใดๆ",
                "3. เลือก 1 ชั่วโมง, 2 ชั่วโมง, 4 ชั่วโมง, 8 ชั่วโมง หรือระบุการตรวจสอบทุกครั้งเมื่อหมดเวลา ซึ่งเมื่อการตรวจสอบการใช้งานของเครื่องลูกข่ายหมดเวลาแล้ว เครื่องลูกข่ายจะต้องเข้าสู่ระบบอีกครั้งเพื่อทำการยืนยันตัวตนการเข้าถึง",
                "4. (ตัวเลือก) เปิดใช้งาน Redirect และป้อนที่อยู่ URL ที่ต้องการ จากนั้นเครื่องลูกข่ายจะเปลี่ยนไปใช้งานในเส้นทางตาม URL ที่คุณระบุ",
                "5. (ตัวเลือก) นอกจากนี้คุณยังสามารถปรับแต่งหน้าเข้าสู่ระบบของการยืนยันตัวตนได้",
                "A. ชื่อ Portal - ไม่เกิน 31 ตัวอักษร",
                "B. เงื่อนไขการใช้งาน - ไม่เกิน 1023 ตัวอักษร",
                "C. ภาพโลโก้ - อัปโหลดไฟล์ภาพ JPG หรือ PNG (ขนาดไม่เกิน 100 กิโลไบต์) เพื่อเปลี่ยนแปลงโลโก้",
                "D. ภาพพื้นหลัง - อัปโหลดไฟล์ JPG หรือ PNG (น้อยกว่า 2 เมกกะไบต์) ในการปรับแต่งพื้นหลัง",
                "6. คลิก Save"]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "รหัสผ่าน",
                           content: "สร้างรหัสผ่านที่ประกอบด้วยอักขระ ASCII ระหว่าง 8 - 63 ตัวหรืออักขระเลขฐานสิบหกระหว่าง 8 - 64 ตัว (0-9, a-f, A-F)"
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "รหัสผ่าน",
                           content: "ให้ใช้รหัสผ่านที่สร้างแบบสุ่มหรือสร้างรหัสผ่านระหว่าง 8 ถึง 63 ตัวอักขระ ASCII หรือระหว่าง 8 และ 64 อักขระเลขฐานสิบหก (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) allows customized NAT (Network Address Translation) traversal filters to be plugged into the gateway to support address and port translation for certain application layer \"control/data\" protocols: FTP, TFTP, H323 etc. Enabling ALG is recommended."
                       } ,{                      
                           type: "name",
                           title: "Enable FTP ALG",
                           content: "ถ้าเลือก, มันจะอนุญาต FTP ผู้ใช้ส่งข้อมูลไปยังเซิร์ฟเวอร์ผ่าน NAT"
                       } ,{                      
                           type: "name",
                           title: "Enable TFTP ALG",
                           content: "ถ้าเลือก, มันจะอนุญาต TFTP ผู้ใช้ส่งข้อมูลไปยังเซิร์ฟเวอร์ผ่าน NAT"
                       } ,{                      
                           type: "name",
                           title: "Enable H323 ALG",
                           content: "ถ้าเลือก, มันจะอนุญาต Microsoft NetMeeting ผู้ใช้ติดต่อกันโดยผ่าน NAT"
                       } ,{                      
                           type: "name",
                           title: "Enable RTSP ALG",
                           content: "ถ้าเลือก, มันจะอนุญาต ผู้ใช้ Media Player ติดต่อกันด้วยสตรีมมิ่งมีเดียร์เซิร์ฟเวอร์ผ่าน NAT"
                       } ,{                      
                           type: "name",
                           title: "เปิดใช้งาน SIP ALG",
                           content: "If selected, it allows clients communicate with SIP (Session Initiation Protocol) servers via NAT."
                       } ,{                      
                           type: "name",
                           title: "Enable PPTP Passthrough",
                           content: "ถ้าเลือก, มันจะอนุญาต Point-to-Point Sessions เพื่อเป็นช่องทางผ่านไปยังเครือข่าย IP และผ่านไปยังเราท์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "Enable L2TP Passthrough",
                           content: "ถ้าเลือก, มันจะอนุญาต Layer 2 Point-to-Point Sessions เพื่อเป็นช่องทางผ่านไปยังเครือข่าย IP และผ่านไปยังเราท์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "Enable IPSec Passthrough",
                           content: "If selected, it allows IPSec (Internet Protocol security) to be tunneled through an IP network and passed through the router. IPSec uses cryptographic security services to ensure private and secure communications over IP networks."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtual Servers",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "เซิร์ฟเวอร์เสมือน ถูกใช้เพื่อติดตั้งการบริการภายนอกเครือข่ายของคุณ เซิร์ฟเวอร์เสมือนเป็นการระบุ External Port และทุกคำขอทั้งหมดไปยัง External Port จะถูกนำไปยังคอมพิวเตอร์ที่กำหนดไว้ ซึ่งต้องตั้งด้วยการกำหนดเส้นทางหรือการจอง IP Address",
                "When you build up a server on the local network and want to share it on the Internet, Virtual Servers can realize the service and provide it to the Internet users."]
} ,{                      
                           type: "paragraph",
                           content: "The table displays the relevant parameters of the virtual server."
                       } ,{                      
                           type: "name",
                           title: "ชนิดการบริการ",
                           content: "Displays the name of the virtual server."
                       } ,{                      
                           type: "name",
                           title: "External Port",
                           content: "แสดงตัวเลขของพอร์ตหรือระยะของพอร์ตที่ใช้โดยเซิร์ฟเวอร์เสมือน"
                       } ,{                      
                           type: "name",
                           title: "Internal IP",
                           content: "แสดง IP Address ของคอมพิวพ์เตอร์ที่ใช้งานบริการแอพพลิเคชั่นนี้อยู่"
                       } ,{                      
                           type: "name",
                           title: "Internal Port",
                           content: "แสดงตัวเลขพอร์ตของคอมพิวพ์เตอร์ที่ใช้งานบริการแอพพลิเคชั่นนี้อยู่"
                       } ,{                      
                           type: "name",
                           title: "Protocol",
                           content: "แสดงโปรโตคอลที่ใช้สำหรับบริการแอพพลิเคชั่นนี้อยู่เช่น TCP,UDP หรือ ALL (ทุกโปรโตคอลที่รองรับโดยเราท์เตอร์)"
                       } ,{                      
                           type: "name",
                           title: "สถานะ",
                           content: "แสดงสถานะปัจจุบัน (เปิดใช้หรือปิดการใช้) ของ Rule ที่ระบุไว้"
                       } ,{                      
                           type: "name",
                           title: "แก้ไข",
                           content: "แสดงตัวเลือกเพื่อเปลี่ยนแปลงหรือลบ Rule ที่เกี่ยวข้อง"
                       } ,{                      
                           type: "step",
                           title: "การตั้งค่ากฎเซิร์ฟเวอร์จำลอง",
       content: [ 
                "1. คลิก Add",
                "2. Click Scan to select a service from the list to automatically populate the appropriate port number in the External Port and Internal Port fields. If the service is not listed, enter the External Port number (e.g. 21) or a range of ports (e.g. 21-25). Leave the Internal Port blank if it is the same as the External Port or enter a specific port number (e.g. 21) if the External Port is a single port. Enter the IP address of the computer running the service application in dotted decimal format into the Internal IP field.",
                "3. เลือก Protocol สำหรับบริการแอพลิเคชั่น TCP,UDP หรือ All จาก Protocol ในเมนูแบบแถบเลื่อน",
                "4. เลือก Enable",
                "5. Click Save."]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
       content: [ 
                "1. If you want to disable this entry, click the Bulb icon.",
                "2. It is recommended to keep the default settings of Internal Port and Protocol if you are not clear about which port or protocol to use.",
                "3. If the local host device is hosting more than one type of available services, you need to create a rule for each service. Please note that the External Port should NOT be overlapped."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "ถูกใช้เพื่อส่งข้อมูลบนพอร์ตเพื่อระบุเซิร์ฟเวอร์บนเครือข่าย."
                       } ,{                      
                           type: "paragraph",
                           content: "The table displays the relevant parameters of the port triggering."
                       } ,{                      
                           type: "name",
                           title: "Application",
                           content: "แสดงชื่อของแอพพลิเคชั่น"
                       } ,{                      
                           type: "name",
                           title: "Triggering Port",
                           content: "แสดงข้อมูลขาออกจากพอร์ตใช้เพื่อระบุกฎของการเชื่อมต่อขาออก"
                       } ,{                      
                           type: "name",
                           title: "Trigger Protocol",
                           content: "แสดงโปรโตคอลใช้เพื่อส่งผ่านพอร์ต TCP,UDP,หรือ ALL (ทุกโปรโตคอลรองรับโดยเราท์เตอร์)"
                       } ,{                      
                           type: "name",
                           title: "External Port",
                           content: "แสดงพอร์ตหรือช่วงของพอร์ตโดยระบบรีโมท ตอบสนองการใช้ 1 พอร์ตของพอร์ตทั้งหมดจะถูกส่งไปยัง PC ซึ่งส่งผ่าน Rule นี้. คุณสามารถใส่ได้มากกว่า 5 กล่มในแต่ละพอร์ต โดยทุกกลุ่มของพอร์ตต้องแยกด้วย \",\" (คอมมา) ยกตัวอย่างเช่น 2000-2038,2046,2050-2051,2085,3010-3030."
                       } ,{                      
                           type: "name",
                           title: "External Protocol",
                           content: "แสดงโปรโตคอลใช้สำหรับพอร์ตขาเข้า: TCP,UDP,หรือ ALL (ทุกโปรโตคอลรองรับโดยเราท์เตอร์)"
                       } ,{                      
                           type: "name",
                           title: "สถานะ",
                           content: "แสดงสถานะปัจจุบัน (เปิดใช้หรือปิดการใช้) ของ Rule ที่ระบุไว้"
                       } ,{                      
                           type: "name",
                           title: "แก้ไข",
                           content: "แสดงตัวเลือกเพื่อเปลี่ยนแปลงหรือลบ Rule ที่เกี่ยวข้อง"
                       } ,{                      
                           type: "step",
                           title: "การติดตั้ง Port Triggering Rule.",
       content: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "แต่ละ Rule สามารถใช้ได้ 1 Host เท่านั้น."
                       },
                "1. คลิก Add",
                "2. Click Scan to select an application from the list to automatically populate the default values into the appropriate fields. If you want to add an unlisted application, manually enter the Application, Triggering Port, Triggering Protocol, External Port and External Protocol.",
                "3. เลือก Enable",
                "4. คลิ๊กบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to disable this rule, click the Bulb icon."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "The DMZ (Demilitarized Zone) host feature allows a local host to be exposed to the Internet for a special-purpose service, such as Internet gaming or video conferencing. Basically, the DMZ allows a single computer on the LAN to open all its ports. This computer needs to be configured with a static IP address and has its DHCP client function disabled."
                       } ,{                      
                           type: "paragraph",
                           content: "When DMZ is enabled, the DMZ host is totally exposed to the Internet, which may bring some potential safety hazard to the computer. If DMZ is not in use, please disable it in time."
                       } ,{                      
                           type: "step",
                           title: "การระบุคอมพิวเตอร์หรือเซิร์ฟเวอร์เพื่อเป็น DMZ Server",
       content: [ 
                "1. คลิก Enable DMZ",
                "2. ในช่อง DMZ Host IP Address, ใส่ IP Address ของคอมพิวเตอร์เพื่อตั้งค่าเป็น DMZ Host.",
                "3. คลิกบันทึก"]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "By default, the UPnP (Universal Plug-and-Play) feature is enabled to allow devices, such as computers and Internet appliances, to automatically discover and communicate with each other on the local network."
                       } ,{                      
                           type: "paragraph",
                           content: "You may need to enable the UPnP if you want to use applications for multiplayer gaming, peer-to-peer connections, real-time communication (such as VoIP or teleVoIP conference) or remote assistance, etc."
                       } ,{                      
                           type: "name",
                           title: "รายการ UPnP",
                           content: "The UPnP Service List displays the UPnP information of the local host(s)."
                       }]
},
       MODEM :{ 
               TITLE:"วิธีใช้ 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "โมเด็ม 3G/4G USB",
                           content: "แสดงสถานะของโมเด็ม 3G/4G USB"
                       } ,{                      
                           type: "name",
                           title: "Use the auto-identified ISP parameters",
                           content: "This feature is enabled by default. If enabled, the router can identify the ISP for the SIM/UIM card and fill in the parameters automatically. If the identification fails, please select the Region and Mobile ISP manually."
                       } ,{                      
                           type: "name",
                           title: "ประเทศ",
                           content: "Automatically selects and displays the region when the USB modem and SIM card are successfully identified. If not select the region from the drop-down menu."
                       } ,{                      
                           type: "name",
                           title: "Mobile ISP",
                           content: "แสดง ISP (ผู้ให้บริการอินเทอร์เน็ต) ของเครือข่าย 3G/4G หากตรวจไม่พบโดยอัตโนมัติ ให้เลือก ISP จากเมนูดรอปดาวน์ จะีมีการรวมหมายเลขสำหรัับหมุนและ APN เริ่มต้นให้โดยอัตโนมัติ"
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "If the SIM/UIM Protection is enabled, enter the PIN code. The SIM/UIM Protection is disabled by default. Please note that if you enter invalid PIN 3 times, the SIM/UIM card will be locked automatically. You can only unlock it by entering the PUK code from the PC/laptop."
                       } ,{                      
                           type: "name",
                           title: "ข้อความ",
                           content: "แสดงข้อมูล PIN ของซิมการ์ด / UIM ของคุณหากคุ้มครอง PIN ถูกเปิดใช้งาน"
                       } ,{                      
                           type: "name",
                           title: "การตั้งค่า Dial NumberAPNชื่อผู้ใช้/รหัสผ่าน",
                           content: "If the ISP is not listed in the <strong>Mobile ISP</strong> list, select this checkbox and enter the Dial Number, APN (Access Point Name), Username and Password that are provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Dial Number",
                           content: "Enter the Dial Number provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Enter the APN (Access Point Name) provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "Enter the User Name and Password provided by the ISP. These fields are case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "เชื่อมต่อตามความต้องการ",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะถูกตัดโดยอัตโนมัติหลังจากกำหนดเวลา ได้ผ่านพ้นไป. การเชื่อมต่อจะถูกสร้างขึ้นเมื่อคุณพยายามจะเข้าสู่อินเทอร์เน็ตอีกครั้ง"
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "บางครั้งจะไม่สามารถตัดการเชื่อมต่ออินเทอร์เน็ตได้แม้คุณได้ระบุเวลาว่างสูงสุดแล้ว เนื่องจากบางแอพพลิเคชั่นพยายามใช้อินเทอร์เน็ตจากด้านหลัง"
                       } ,{                      
                           type: "name",
                           title: "เชื่อมต่ออัตโนมัติ",
                           content: "ในโหมดนี้ จะมีการเชื่อมต่ออินเทอร์เน็ตใหม่โดยอัตโนมัติทุกครั้งที่ถูกตัดการเชื่อมต่อ"
                       } ,{                      
                           type: "name",
                           title: "เชื่อมต่อด้วยตัวเอง",
                           content: "ในโหมดนี้ คุณสามารถคลิกที่ปุ่มเชื่อมต่อหรือตัดการเชื่อมต่อเพื่อควบคุมการเชื่อมต่ออินเทอร์เน็ตด้วยตัวเอง โหมดนี้ยังรองรับฟังก์ชันเวลาว่างสูงสุด ระบุขีดเวลาสูงสุด (เป็นนาที) ที่การเชื่อมต่ออินเทอร์เน็ตจะไม่ทำงานก่อนถูกตัดลงในช่องเวลาว่างสูงสุด ค่าเริ่มต้นคือ 15 นาที หากคุณต้องการให้เชื่อมต่ออินเทอร์เน็ตไว้ตลอดเวลา ให้ป้อน 0 (ศูนย์)"
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "บางครั้งจะไม่สามารถตัดการเชื่อมต่ออินเทอร์เน็ตได้แม้คุณได้ระบุเวลาว่างสูงสุดแล้ว เนื่องจากบางแอพพลิเคชั่นพยายามใช้อินเทอร์เน็ตจากด้านหลัง"
                       } ,{                      
                           type: "paragraph",
                           content: "Click the Save button to save the settings."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"วิธีใช้การตั้งค่าขั้นสูง 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "โมเด็ม 3G/4G USB",
                           content: "แสดงสถานะของโมเด็ม 3G/4G USB"
                       } ,{                      
                           type: "name",
                           title: "Use the auto-identified ISP parameters",
                           content: "This feature is enabled by default. If enabled, the router can identify the ISP for the SIM/UIM card and fill in the parameters automatically. If the identification fails, please select the Region and Mobile ISP manually."
                       } ,{                      
                           type: "name",
                           title: "ประเทศ",
                           content: "Automatically selects and displays the region when the USB modem and SIM card are successfully identified. If not, select the region from the drop-down menu."
                       } ,{                      
                           type: "name",
                           title: "Mobile ISP",
                           content: "แสดง ISP (ผู้ให้บริการอินเทอร์เน็ต) ของเครือข่าย 3G/4G หากตรวจไม่พบโดยอัตโนมัติ ให้เลือก ISP จากเมนูดรอปดาวน์ จะีมีการรวมหมายเลขสำหรัับหมุนและ APN เริ่มต้นให้โดยอัตโนมัติ"
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "If the SIM/UIM Protection is enabled, enter the PIN code. The SIM/UIM Protection is disabled by default. Please note that if you enter invalid PIN 3 times, the SIM/UIM card will be locked automatically. You can only unlock it by entering the PUK code from the PC/laptop."
                       } ,{                      
                           type: "name",
                           title: "ข้อความ",
                           content: "แสดงข้อมูล PIN ของซิมการ์ด / UIM ของคุณหากคุ้มครอง PIN ถูกเปิดใช้งาน"
                       } ,{                      
                           type: "name",
                           title: "การตั้งค่า Dial NumberAPNชื่อผู้ใช้/รหัสผ่าน",
                           content: "If the ISP is not listed in the <strong>Mobile ISP</strong> list, select this checkbox and enter the Dial Number, APN (Access Point Name), Username and Password that are provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Dial Number",
                           content: "Enter the Dial Number provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Enter the APN (Access Point Name) provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "Enter the User Name and Password provided by the ISP. These fields are case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "เชื่อมต่อตามความต้องการ",
                           content: "ในโหมดนี้การเชื่อมต่ออินเทอร์เน็ตจะถูกตัดโดยอัตโนมัติหลังจากกำหนดเวลา ได้ผ่านพ้นไป. การเชื่อมต่อจะถูกสร้างขึ้นเมื่อคุณพยายามจะเข้าสู่อินเทอร์เน็ตอีกครั้ง"
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "บางครั้งจะไม่สามารถตัดการเชื่อมต่ออินเทอร์เน็ตได้แม้คุณได้ระบุเวลาว่างสูงสุดแล้ว เนื่องจากบางแอพพลิเคชั่นพยายามใช้อินเทอร์เน็ตจากด้านหลัง"
                       } ,{                      
                           type: "name",
                           title: "เชื่อมต่ออัตโนมัติ",
                           content: "ในโหมดนี้ จะมีการเชื่อมต่ออินเทอร์เน็ตใหม่โดยอัตโนมัติทุกครั้งที่ถูกตัดการเชื่อมต่อ"
                       } ,{                      
                           type: "name",
                           title: "เชื่อมต่อด้วยตัวเอง",
                           content: "ในโหมดนี้ คุณสามารถคลิกที่ปุ่มเชื่อมต่อหรือตัดการเชื่อมต่อเพื่อควบคุมการเชื่อมต่ออินเทอร์เน็ตด้วยตัวเอง โหมดนี้ยังรองรับฟังก์ชันเวลาว่างสูงสุด ระบุขีดเวลาสูงสุด (เป็นนาที) ที่การเชื่อมต่ออินเทอร์เน็ตจะไม่ทำงานก่อนถูกตัดลงในช่องเวลาว่างสูงสุด ค่าเริ่มต้นคือ 15 นาที หากคุณต้องการให้เชื่อมต่ออินเทอร์เน็ตไว้ตลอดเวลา ให้ป้อน 0 (ศูนย์)"
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "บางครั้งจะไม่สามารถตัดการเชื่อมต่ออินเทอร์เน็ตได้แม้คุณได้ระบุเวลาว่างสูงสุดแล้ว เนื่องจากบางแอพพลิเคชั่นพยายามใช้อินเทอร์เน็ตจากด้านหลัง"
                       } ,{                      
                           type: "name",
                           title: "รูปแบบการเข้ารหัส",
                           content: "Select an authentication type. The default is Auto. Some ISPs require a specific authentication type, please confirm it with the ISP or keep the default settings."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "If Auto (default), the router automatically determines the authentication type used by the ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "หากตั้งเ็ป็น PAP (Password Authentication Protocol) เราเตอร์จะตรวจพิสูจน์โดยใช้ทูแฮนด์เช็ค เลือกตัวเลือกนี้หาก ISP กำหนดให้ใช้การตรวจพิสูจน์ประเภทนี้"
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "หากตั้งเป็น CHAP (Challenge Handshake Authentication Protocol) เราเตอร์จะตรวจพิสูจน์กับอีกเครื่องหนึ่งด้วยทรีแฮนด์เช็ค และยืนยันเอกลักษณ์ของอีกเครืืองหนึ่งเป็นระยะๆ เลือกตัวเลือกนี้หาก ISP กำหนดให้ใช้การตรวจพิสูจน์ประเภทนี้"
                       } ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "The default MTU (Maximum Transmission Unit) size is 1480 bytes. Do not change it unless required by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Use the Following DNS Servers",
                           content: "If the ISP provides DNS server IP addresses, select this checkbox and enter the <strong>Primary DNS</strong> and Secondary DNS (optional) IP addresses below. Otherwise, the DNS servers will be assigned dynamically by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Primary DNS",
                           content: "Enter the DNS IP address in dotted-decimal notation provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Secondary DNS",
                           content: "(Optional) Enter another DNS IP address in dotted-decimal notation provided by the ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Click the <strong>Save</strong> button to save the settings."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"ตั้งค่าอุปกรณ์",
               CONTENT: [{
                           type: "paragraph",
                           content: "การตั้งค่าอุปกรณ์การแสดงผลให้สอดคล้องกับข้อมูลอุปกรณ์ USB ผ่าน USB Port"
                       } ,{                      
                           type: "name",
                           title: "ค้นหา",
                           content: "โดยทั่วไป เราท์เตอร์ตรวจพบอุปกรณ์ที่เข้ามาเชื่อมต่อใหม่โดยอัตโนมัติ ถ้าไม่,ให้คลิกที่ปุ่ม Scan เพื่อหาอุปกรณ์ที่มาเชื่อมต่อใหม่และ Refresh หน้าจอเพื่ออัพเดทข้อมูล"
                       } ,{                      
                           type: "name",
                           title: "ปริมาณ",
                           content: "แสดงปริมาณของ USB."
                       } ,{                      
                           type: "name",
                           title: "ความจุ",
                           content: "แสดงปริมาณความจุรวมของ USB"
                       } ,{                      
                           type: "name",
                           title: "พื้นที่ว่าง",
                           content: "แสดงพื้นว่างที่สามารถใช้ได้ในปัจจุบัน"
                       } ,{                      
                           type: "name",
                           title: "ถอดอุปกรณ์อย่างปลอดภัย",
                           content: "คลิกปุ่มนี้เพื่อนำอุปกรณ์ออกจากการเชื่อมต่ออย่างปลอดภัยก่อนดึงอุปกรณ์ออกจากเราท์เตอร์"
                       } ,{                      
                           type: "paragraph",
                           content: "Remove button only appears when the USB storage device is connected to the router. When the current volume is busy, you are unable to unmount."
                       } ,{                      
                           type: "name",
                           title: "สถานะ",
                           content: "ช่องนี้จะปรากฎขึ้นต่อเมื่อ USB เชื่อมต่อกับเราท์เตอร์ เลือกเปิดแบ่งปันไฟล์ของ USB"
                       } ,{                      
                           type: "step",
                           title: "การตั้งค่าไฟล์เซิร์ฟเวอร์",
       content: [ 
                "1. เสียบอุปกรณ์ USB ลงใน USB Port ของเราท์เตอร์โดยใช้สาย USB",
                "2. ถ้ามีอุปกรณ์ USB ใหม่เข้ามาจะถูกตรวจพบอัตโนมัติโดยเราท์เตอร์และแสดงข้อมูลข้างล่าง Device Setting (การตั้งค่าอุปกรณ์). ถ้าไม่ , คลิก Scan (ค้นหา)",
                "3. เลือก Active เพื่อเปิดการใช้งานร่วมกัน"]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"บัญชีแบ่งปัน",
               CONTENT: [{
                           type: "name",
                           title: "บัญชี",
                           content: "คุณสามารถเลือก Use Default Account เพื่อล็อกอินเข้าสู่การใช้งานร่วมกันไฟล์และโฟลเดอร์หรือ Use New Account เพื่อสร้างบัญชีผู้ใช้ใหม่"
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "ป้อนชื่อผู้ใช้ด้วยอักขระที่เป็นตัวเลข 1 - 15 ตัวหรือสตริงของอักขระขีดเส้นใต้ และรหัสผ่านที่ประำกอบด้วยอักขระ ASCII จำนวน 1 -15 ตัว ระวังเรื่องตัวพิมพ์ใหญ่เล็กเมื่อป้อนช่องนี้"
                       } ,{                      
                           type: "name",
                           title: "ยืนยันรหัสผ่าน",
                           content: "ใส่รหัสผู้ใช้อีกครั้งเพื่อยืนยัน (case-sensitive) ตัวพิมใหญ่ ตัวพิมเล็ก."
                       } ,{                      
                           type: "paragraph",
                           content: "Click Save to save all the settings."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"ตั้งค่าการใช้งานร่วมกัน",
               CONTENT: [{
                           type: "name",
                           title: "ชื่อเครือข่าย/สื่อ",
                           content: "แสดงชื่อที่ถูกใช้เพื่อเข้าสู่การเชื่อมต่ออุปกรณ์ USB."
                       } ,{                      
                           type: "name",
                           title: "เปิดใช้งาน",
                           content: "เลือกเพื่อเปิดใช้วิธีการเข้าถึง."
                       } ,{                      
                           type: "name",
                           title: "วิธีการเข้าระบบ",
                           content: "มี 3 วิธีการเพื่ออนุญาตให้เข้าถึงอุปกรณ์ USB คุณสามารถเลือกได้มากกว่า 1 วิธีการโดยเลือกช่องที่เกี่ยวข้อง",
       children: [{                      
                           type: "name",
                           title: "Network Neighborhood",
                           content: "If enabled, users on the network can access the USB storage device using an assigned IP address (e.g. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "If enabled, the FTP clients on the local network can access the USB storage device using the assigned IP address, followed by the FTP server's port number (e.g. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Via Internet)",
                           content: "ถ้าอนุญาต,ผู้ใช้สามารถรีโมทเข้าสู่อุปกรณ์ USB ผ่าน FTP บนอินเทอร์เน็ต รูปแบบนี้รองรับการดาวนืโหลดและอัพโหลดไฟล์ การเปลี่ยนเลขพอร์ตของเซิร์ฟเวอร์ FTP ,ให้ใส่เลขพอร์ต และคลิก Save เพื่อนำไปใช้งาน"
                       }]
} ,{                      
                           type: "name",
                           title: "Link",
                           content: "แสดงที่อยู่ที่ใช้ในการเข้าถึงการใช้งานร่วมกันอุปกรณ์ USB"
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "แสดงหมายเลขพอร์ตของเซิร์ฟเวอร์ FTP ใช้ค่าเริ่มต้น 21 หรือค่าระหว่าง 1024 และ 65535"
                       } ,{                      
                           type: "paragraph",
                           content: "Click Save to save all the settings."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"แบ่งปันโฟลเดอร์",
               CONTENT: [{
                           type: "name",
                           title: "แบ่งปันทั้งหมด",
                           content: "เปิดเพื่อใช้ไฟล์และโฟลเดอร์ทั้งหมดร่วกันหรือปิดการใช้งานร่วมกันเพื่อแบ่งบันโฟลเดอร์ที่เลือกไว้"
                       } ,{                      
                           type: "name",
                           title: "เปิดการยืนยันตัวตน",
                           content: "ขอแนะนำให้เปิดระบบยืนยันตัวเพื่อต้องการให้ผู้ใช้เข้าถึงไฟล์ที่แบ่งบันโดยใช้ ชื่อผู้ใช้และรหัสผ่าน"
                       } ,{                      
                           type: "name",
                           title: "ชื่อโฟลเดอร์",
                           content: "แสดงชื่อโฟลเดอร์ที่ใช้งานร่วมกัน"
                       } ,{                      
                           type: "name",
                           title: "เส้นทางโฟลเดอร์",
                           content: "แสดงเส้นทางของโฟลเดอร์ที่ใช้งานร่วมกัน"
                       } ,{                      
                           type: "name",
                           title: "แบ่งปันสื่อ",
                           content: "บ่งบอกว่าอนุญาตให้ใช้งานร่วมกันของไฟล์สื่อหรือไม่"
                       } ,{                      
                           type: "name",
                           title: "ชื่อโฟลเดอร์ที่แบ่งปัน",
                           content: "แสดงชื่อของไฟล์ที่ใช้งานร่วมกัน"
                       } ,{                      
                           type: "name",
                           title: "สถานะ",
                           content: "แสดงสถานะของโฟลเดอร์ที่ใช้ร่วมกันโดยไฟแสดงสถานะ"
                       } ,{                      
                           type: "name",
                           title: "แก้ไข",
                           content: "แสดงพื้นว่างที่สามารถใช้ได้ในปัจจุบัน"
                       } ,{                      
                           type: "name",
                           title: "เลือก",
                           content: "คลิกเพื่อค้นหาโฟลเดอร์"
                       } ,{                      
                           type: "name",
                           title: "อนุญาตให้ผู้ใช้บนเครือข่ายสำหรับบุคคลภายนอกเข้าสู่ระบบ",
                           content: "เลือกเพื่ออนุญาตให้ผู้ใช้บนเครือข่ายสำหรับบุคคลภายนอกเข้าสู่ระบบการใช้งานร่วมกัน"
                       } ,{                      
                           type: "name",
                           title: "เปิดการยืนยันตัวตน",
                           content: "เลือกเพื่อให้ผู้ใช้เข้าสู่การใช้งานร่วมกันของโฟลเดอร์ด้วย ชื่อผู้ใช้ และ รหัสผู้ใช้"
                       } ,{                      
                           type: "name",
                           title: "เปิดเพื่ออนุญาตให้ผู้ใช้เปลี่ยนแปลงเนื้อหาโฟลเดอร์",
                           content: "เลือกเพื่ออนุญาตให้ผู้ใช้เปลี่ยนแปลงเนื้อหาโฟลเดอร์"
                       } ,{                      
                           type: "name",
                           title: "เปิดการแบ่งบันสื่อ",
                           content: "เลือกเพื่อเปิดให้ใช้การใช้งานร่วมกันของสื่อ"
                       } ,{                      
                           type: "name",
                           title: "รีเฟรช",
                           content: "คลิกเพื่ออัพเดทรายการโฟลเดอร์"
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Printer Server",
               CONTENT: [{
                           type: "name",
                           title: "Printer Server",
                           content: "Toggle On to enable the Printer Server function."
                       } ,{                      
                           type: "name",
                           title: "ชื่อปรินเตอร์",
                           content: "Displays the name of the printer connected to the router."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine ในการสำรองไฟล์ทั้งหมดบนคอมพิวเตอร์ Mac ของคุณ ที่เชื่อมต่อกับอุปกรณ์เก็บข้อมูล USB บนเราเตอร์โมเด็มของคุณ"
                       } ,{                      
                           type: "name",
                           title: "เปิด",
                           content: "เลือกที่ checkbox เพื่อเปิด ฟังก์ชัน Time machine"
                       } ,{                      
                           type: "name",
                           title: "สำรองข้อมูล",
                           content: "เลือกตำแหน่งที่เก็บไฟล์สำรองข้อมูลในการทำ Time Machine"
                       } ,{                      
                           type: "name",
                           title: "จำกัดขนาดการสำรองข้อมูล",
                           content: "จัดการความจุที่สามารถสำรองข้อมูลเพื่อทำ Time Machine (0 หมายถึงไม่จำกัด)"
                       } ,{                      
                           type: "name",
                           title: "บันทึก",
                           content: "เลือกเพื่อบันทึกการตั้งค่า"
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"การดาวน์โหลดออฟไลน์",
               CONTENT: [{
                           type: "paragraph",
                           content: "With Offline Download enabled, the router can download files without keeping the computer powered on all the time."
                       } ,{                      
                           type: "name",
                           title: "สถานะ",
                           content: "Toggle On to enable the Offline Download feature."
                       } ,{                      
                           type: "name",
                           title: "เส้นทางโฟลเดอร์",
                           content: "Select a directory path to store or cache the downloads.",
       children: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "Don't change the directory path or unmount the USB storage device when uploading and downloading files; otherwise some fatal errors may occur."
                       }]
} ,{                      
                           type: "name",
                           title: "Schedule",
                           content: "Select the checkbox to enable the Schedule feature that allows you to specify the time period(s) to download/upload files."
                       } ,{                      
                           type: "name",
                           title: "Keep Uploading After Task Completes",
                           content: "Select the checkbox to keep uploading data of the completed download(s) to others."
                       } ,{                      
                           type: "name",
                           title: "Maximum Number of Active Downloads",
                           content: "Enter a value between 1 and 10 to set the maximum number of active downloads. The default value is 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Downloads",
               CONTENT: [{
                           type: "note",
                           title: "ไฟล์",
                           content: "Displays the name and type of the download file."
                       } ,{                      
                           type: "note",
                           title: "Speed",
                           content: "Displays the current download (or upload) speed."
                       } ,{                      
                           type: "note",
                           title: "Completed",
                           content: "Displays the progress of the download."
                       } ,{                      
                           type: "note",
                           title: "Remaining Time",
                           content: "Displays the remaining time of the download."
                       } ,{                      
                           type: "note",
                           title: "Connected Peers",
                           content: "Displays the number of connected peers of the download."
                       } ,{                      
                           type: "note",
                           title: "สถานะ",
                           content: "Displays the current status of the download (downloading, waiting, seeding, paused, completed, or error)."
                       } ,{                      
                           type: "name",
                           title: "To add a new download",
       children: [{                      
                           type: "step",
       content: [ 
                "1. คลิก Add",
                "2. Select the source of download, torrent from PC, torrent from USB, or URL.",
                "3. Select the torrent location for BT, or enter the URL for FTP, HTTP and aMule.",
                "4. คลิ๊กบันทึก",
                "5. For aMule, specify the aMule server IP address and port under Advanced > aMule Server."]
}]
} ,{                      
                           type: "name",
                           title: "To delete downloads",
                           content: "Select the corresponding checkbox of the download(s) that you want to delete, and then click Delete above the table."
                       } ,{                      
                           type: "name",
                           title: "To pause downloads",
                           content: "Click the corresponding checkbox of the download(s) that you want to pause, and then click Pause above the table."
                       } ,{                      
                           type: "name",
                           title: "To resume downloads",
                           content: "Click the corresponding checkbox of the download(s) that you want to resume, and then click Resume above the table."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"ขั้นสูง",
               CONTENT: [{
                           type: "name",
                           title: "Speed Limits",
                           content: "Specify the maximum download and upload speed for the Internet connection."
                       } ,{                      
                           type: "name",
                           title: "Maximum Download Speed",
                           content: "Enter a value between 1 and 100000 kB/s to set the maximum download speed. The default value is 1024."
                       } ,{                      
                           type: "name",
                           title: "Maximum Upload Speed",
                           content: "Enter a value between 1 and 100000 kB/s to set the maximum upload speed. The default value is 512."
                       } ,{                      
                           type: "name",
                           title: "Number of Connections",
                           content: "Specify the maximum number of connections."
                       } ,{                      
                           type: "name",
                           title: "Global Maximum Number of Connections",
                           content: "Enter a value between 1 and 200 to set the global maximum number of connections. The default value is 100."
                       } ,{                      
                           type: "name",
                           title: "Maximum Number of Connected Peers per Torrent",
                           content: "Enter a value between 1 and 100 to set the maximum number of connected peers per torrent. The default value is 50."
                       } ,{                      
                           type: "name",
                           title: "Enable DHT Network",
                           content: "Enable this feature to improve efficiency to find peers so that you can increase the download speed."
                       } ,{                      
                           type: "name",
                           title: "Enable Peer Exchange",
                           content: "Enable this feature to improve the communication efficiency among the group of peers  so that you can increase the download speed."
                       } ,{                      
                           type: "name",
                           title: "Enable BitTorrent Protocol Encryption",
                           content: "Enable this feature to strengthen privacy and confidentiality during the process of data transmission."
                       } ,{                      
                           type: "name",
                           title: "aMule Server",
                           content: "Enter the IP address and port of the aMule server. The aMule download works only when the router is connected to the server."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Parental Control",
               CONTENT: [{
                           type: "paragraph",
                           content: "With Parental Controls, you can block inappropriate, explicit and malicious websites; restrict access by certain times of day (for example, Facebook or YouTube during homework time)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Devices Under Parental Control",
               CONTENT: [{
                           type: "paragraph",
                           content: "This table displays the information and settings of the devices that are currently restricted by Parental Controls."
                       } ,{                      
                           type: "step",
                           title: "หากต้องการจำกัดอุปกรณ์ใหม่",
       content: [ 
                "1. Toggle On Parental Controls.",
                "2. Click Add.",
                "3. Click Scan to choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.",
                "4. Click the Effective Time icon to specify a time period during which the restriction applies.",
                "5. Enter a brief description into the Description field. This field is optional.",
                "6. Select Enable This Entry.",
                "7 คลิ๊กบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to disable this entry, click the Bulb icon."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"รายละเอียดข้อจำกัด",
               CONTENT: [{
                           type: "paragraph",
                           content: "Content Restriction allows you to restrict access to specific websites using keywords and domain names. The client devices being controlled by Parental Controls can or cannot access these websites depending on the restriction policy you select."
                       } ,{                      
                           type: "step",
                           title: "To specify the content to access",
       content: [ 
                "1. Toggle On Content Restriction.",
                "2. Select the Restriction Policy according to the needs:",
                "A. If you want the controlled devices to have access to all websites except certain ones, select Blacklist.",
                "B. If you want the controlled devices to only have access to certain websites, select Whitelist.",
                "3. Click Add a New Keyword to add a web address keyword (for example, wikipedia) or domain name to the Blacklist or to the Whitelist.",
                "4. คลิ๊กบันทึก"]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "The QoS (Quality of Service) helps to prioritize the Internet traffic based on the needs. You can specify the priority level for a device, a physical port, or an application in the QoS rules list."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "หมายเหตุ",
                           content: "หากเปิดใช้ NAT Boost แนะนำให้ปิดการทำงานของ QoS"
                       } ,{                      
                           type: "name",
                           title: "การอัพโหลด Bandwidth",
                           content: "Enter the maximum upload bandwidth provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "ดาว์โหลด Bandwidth",
                           content: "Enter the maximum download bandwidth provided by the ISP."
                       }]
},
       QOS_ADV :{ 
               TITLE:"ขั้นสูง",
               CONTENT: [{
                           type: "name",
                           title: "High/Middle/Low Priority",
                           content: "Specify a percentage for the high/middle/low priority traffic.",
       children: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "ปริมาณสูงสุด ( ร้อยละ) ของลำดับความสำคัญคือ 1 "
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS Rule List",
               CONTENT: [{
                           type: "paragraph",
                           content: "Here you can add detailed QoS rules to proritize the Internet traffic."
                       } ,{                      
                           type: "step",
                           title: "To set up a QoS rule",
       content: [ 
                "1. คลิก Add",
                "2. Select a priority type to add the QoS rule.",
                "By Device - Click Scan to select the desired device, or manually enter a device name and its MAC address.",
                "By Application - Select the desired application or customize an application by configuring the name, protocol and destination port (1-65535).  You can enter a single port or multiple ports or port range, separated by commas (e.g. 21,36-105,111).",
                "By Physical Port - Select your desired port.",
                "3. คลิกบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "You can drag a rule among different priority lists to change its priority."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Database Upgrade",
               CONTENT: [{
                           type: "paragraph",
                           content: "We will release the latest database version on www.tp-link.com. You can download and update the router's database to extend its supported applications."
                       } ,{                      
                           type: "name",
                           title: "ไฟล์ Database ใหม่",
                           content: "Click Browse to locate the latest database file. Select it and click Upgrade to upgrade the database to the latest version."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"ไฟล์วอล",
               CONTENT: [{
                           type: "name",
                           title: "SPI firewall",
                           content: "SPI (Stateful Packet Inspection) Firewall ป้องกันไม่ให้ถูกโจมตี และตรวจสอบการจราจรที่จะผ่านเราเตอร์ให้อยู่บนพื้นฐานของโปรโตคอล โดยค่าเริ่มต้นเปิดใช้คุณลักษณะนี้"
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS Protection",
               CONTENT: [{
                           type: "name",
                           title: "DoS Protection",
                           content: "DoS (Denial of Service) Protection protects the LAN against DoS attacks from flooding the network with server requests. You can filter the following three kinds of attacks according to the needs. There are four levels for each filtering:",
       children: [{                      
                           type: "name",
                           title: "Off",
                           content: "ไม่มีการป้องกัน"
                       } ,{                      
                           type: "name",
                           title: "Low",
                           content: "ป้องกันในระดับต่ำและมีผลน้อยกับการทำงานของเราท์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "Middle",
                           content: "การป้องกันระดับปานกลางจะมีผลเห็นที่ได้ชัดขึ้นกับประสิทธิภาพการทำงานของเราท์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "High",
                           content: "การป้องกันระดับสูงมีผลที่เห็นได้ชัดเจนในการปฏิบัติงานเราท์เตอร์"
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP -FLOOD Attack Filtering",
                           content: "Enable to prevent the ICMP (Internet Control Message Protocol) flood attack."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Attack Filtering",
                           content: "Enable to prevent the UDP (User Datagram Protocol) flood attack."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD Attack Filtering",
                           content: "Enable to prevent the TCP-SYN (Transmission Control Protocol-Synchronize) flood attack."
                       } ,{                      
                           type: "name",
                           title: "Ignore Ping Packet from WAN Port",
                           content: "เมื่อเปิดใช้งานจะทำให้ไม่สนใจแพ็คเก็ต ping จากพอร์ต WAN"
                       } ,{                      
                           type: "name",
                           title: "Forbid Ping Packet from LAN Port",
                           content: "เมื่อเปิดใช้งานจะห้ามแพ็คเก็ต ping จากพอร์ต LAN."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Blocked DoS Host List",
               CONTENT: [{
                           type: "paragraph",
                           content: "This table displays the IP address and MAC address of the blocked DoS host(s)."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"การควบคุมการเข้าถึง",
               CONTENT: [{
                           type: "paragraph",
                           content: "Access Control is used to allow or block specific client devices from accessing the network. When a device is blocked, it is unable to communicate with other devices or connect to the Internet."
                       } ,{                      
                           type: "step",
                           title: "To control access",
       content: [ 
                "1. Toggle On to enable Access Control.",
                "2. If you also want to control access of the devices connected to Guest Network, toggle On Guest Devices Control.",
                "3. Select an access mode according to the needs and click Save:",
                "A. If you want to block access from the devices in the list below, select Blacklist.",
                "B. If you want to allow access only from the devices in the list below, select Whitelist.",
                "4. In Devices in Blacklist/Whitelist section, click Add. Enter the Device Name and MAC Address of the device. Click Save."]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to disable this entry, click the Bulb icon."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Device Online",
               CONTENT: [{
                           type: "paragraph",
                           content: "This table displays the information of all connected devices (including devices connected to the Guest Network if Guest Devices Control is enabled)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC Binding",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP & MAC Binding (also known as ARP Binding) is useful for controlling access of a specific device in the LAN by binding the IP address and the MAC address of the device together. IP & MAC binding also prevents other devices from using a specific IP address."
                       } ,{                      
                           type: "step",
                           title: "To set up a device with IP & MAC Binding",
       content: [ 
                "1. คลิก Add",
                "2. ใส่ MAC address ของอุปกรณ์",
                "3. Enter an IP Address that you want to bind to the above MAC address.",
                "4. เลือก Enable",
                "5. Click Save."]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
       content: [ 
                "1. คุณไม่สามารถผูกอยู่ IP เดียวกันมากกว่าหนึ่งที่อยู่ MAC",
                "2. If you want to disable this entry, click the Bulb icon."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP List",
               CONTENT: [{
                           type: "paragraph",
                           content: "This table displays the MAC address and IP address of the currently connected device(s)."
                       }]
},
       IPV6 :{ 
               TITLE:"อินเทอร์เน็ต",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion."
                       } ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : Dynamic IP"
                       } ,{                      
                           type: "name",
                           title: "Dynamic IP",
                           content: "Select this type if the ISP uses Dynamic IPv6 address assignment."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Address/Primary DNS/Secondary DNS",
                           content: "These parameters are automatically assigned by the DHCPv6 server from the ISP."
                       } ,{                      
                           type: "name",
                           title: "รับ IP ใหม่",
                           content: "Click to get new IPv6 parameters from the DHCPv6 server of the ISP."
                       } ,{                      
                           type: "name",
                           title: "ปล่อย IP",
                           content: "Click to release all IPv6 addresses assigned by the DHCPv6 server from the ISP."
                       } ,{                      
                           type: "name",
                           title: "การรับที่อยู่ IPv6",
                           content: "Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet, according to the ISP."
                       } ,{                      
                           type: "name",
                           title: "Prefix Delegation",
                           content: "เลือกเปิดใช้งานเพื่อจะได้รับ prefix delegation โดย DHCPv6 เซิร์ฟเวอร์จาก ISP หรือปิดการใช้งานเพื่อกำหนดที่อยู่ prefix ด้วยตนเอง ไคลเอนต์ในระบบ LAN จะสร้างที่อยู่ IPv6 กับ prefix นี้"
                       } ,{                      
                           type: "name",
                           title: "ที่อยู่ DNS",
                           content: "Select Get Dynamically from ISP or Use the Following DNS Addresses. If Use the Following DNS Addresses is selected, please manually enter the DNS address provided by the ISP."
                       } ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : Static IP"
                       } ,{                      
                           type: "name",
                           title: "Static IP",
                           content: "Select this type if the ISP uses Static IPv6 address assignment."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Address/Default Gateway/Primary DNS/Secondary DNS",
                           content: "ใส่ค่าเหล่านี้ซึ่งเป็นค่าที่ได้มาจากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "MTU Size",
                           content: "ค่าเริ่มต้นขนาดของ MTU ทั่วไปสำหรับเครือข่ายอีเทอเน็ตคือ 1,500 ไบต์ ไม่แนะนำให้เปลี่ยนค่าเริ่มต้นขนาดของ MTU เว้นแต่มีการขอจากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "title",
                            title: "รูปแบบการเชื่อมต่ออินเทอร์เน็ต: 6to4 ทันเนลลิ่ง"
                       } ,{                      
                           type: "name",
                           title: "6to4 ทันเนลลิ่ง",
                           content: "Select this type if the ISP uses 6to4 deployment for assigning address."
                       } ,{                      
                           type: "name",
                           title: "IPv4 Address/IPv4 Subnet Mask/IPv4 Default Gateway/Tunnel Address",
                           content: "ค่าเหล่านี้จะถูกสร้างขึ้นแบบไดนามิกจากข้อมูล IPV4 ที่พอร์ต WAN หลังจากคุณทำการเชื่อมต่อ"
                       } ,{                      
                           type: "name",
                           title: "Use the Following DNS Server",
                           content: "Select to manually enter the primary DNS and/or secondary DNS as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Connect",
                           content: "Click to connect to the Internet."
                       } ,{                      
                           type: "name",
                           title: "Disconnect",
                           content: "Click to disconnect from the Internet."
                       } ,{                      
                           type: "title",
                            title: "ชนิดการเชื่อมต่ออินเทอร์เน็ต : PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Select this type if the ISP uses PPPoEv6, and provides a username and password."
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้/รหัสผ่าน",
                           content: "ใส่ค่าเหล่านี้ซึ่งเป็นค่าที่ได้มาจากผู้ให้บริการอินเทอร์เน็ต"
                       } ,{                      
                           type: "name",
                           title: "IPv6 Address",
                           content: "This address will be automatically assigned by the DHCPv6 server from the ISP, after you enter the username and password and click Connect."
                       } ,{                      
                           type: "name",
                           title: "การรับที่อยู่ IPv6",
                           content: "Select DHCPv6 to get a non-temporary IPv6 address, or SLAAC to get an IPv6 address generate from the router advertisement packet, or Specified by ISP to manually enter the IPv6 address, according to the ISP."
                       } ,{                      
                           type: "name",
                           title: "Prefix Delegation",
                           content: "เลือกเปิดใช้งานเพื่อจะได้รับ prefix delegation โดย DHCPv6 เซิร์ฟเวอร์จาก ISP หรือปิดการใช้งานเพื่อกำหนดที่อยู่ prefix ด้วยตนเอง ไคลเอนต์ในระบบ LAN จะสร้างที่อยู่ IPv6 กับ prefix นี้"
                       } ,{                      
                           type: "name",
                           title: "ที่อยู่ DNS",
                           content: "Select to Get Dynamically from ISP or Use the Following DNS Addresses. If Use the Following DNS Addresses is selected, please manually enter the DNS address provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Connect",
                           content: "Click to connect to the Internet."
                       } ,{                      
                           type: "name",
                           title: "Disconnect",
                           content: "Click to disconnect from the Internet."
                       } ,{                      
                           type: "title",
                            title: "Internet Connection Type: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Select this type if the ISP uses Pass-Through (Bridge) network deployment. No configuration is required for this type of connection."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Except for the Internet Connection type Pass-Through (Bridge), the other types of Internet connection require the IPv6 configuration."
                       } ,{                      
                           type: "name",
                           title: "Assigned Type",
                           content: "Select the appropriate one according to the ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "กำหนดที่อยู่ IP โดยอัตโนมัติให้กับลูกค้าในระบบ LAN",
       children: [{                      
                           type: "name",
                           title: "Address Prefix",
                           content: "Enter the address prefix as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Release Time",
                           content: "It is the valid time of the assigned IP address. Either keep the default 86400 seconds or change it if required by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Address",
                           content: "It is the IP address assigned automatically by the DHCPv6 server from the ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Address Prefix",
                           content: "Enter the address prefix as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Address",
                           content: "เป็น IP address อัตโนมัติที่กำหนดโดย ISP"
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Address Prefix",
                           content: "Enter the address prefix as provided by the ISP."
                       } ,{                      
                           type: "name",
                           title: "Address",
                           content: "เป็น IP address อัตโนมัติที่กำหนดโดย ISP"
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Mac Clone",
               CONTENT: [{
                           type: "paragraph",
                           content: "Select the appropriate MAC Clone method as you need."
                       } ,{                      
                           type: "name",
                           title: "ไม่โคลน MAC Address",
                           content: "ไม่ทำการเปลี่ยนค่า MAC address เริ่มต้นของเราท์เตอร์ ในกรณีที่ผู้ให้บริการอินเทอร์เน็ต ไม่ได้ผูก IP address กับ MAC address ไว้ด้วยกัน"
                       } ,{                      
                           type: "name",
                           title: "โคลน MAC แอดเดรสของคอมพิวเตอร์เครื่องปัจจุบัน",
                           content: "เลือกที่การคัดลอก MAC Address ปัจจุบันของคอมพิวพ์เตอร์ที่ใช้เชื่อมต่อเราท์เตอร์ ในกรณีผู้ให้บริการระบุ IP Address นี้ให้ใช้ผูกอยู่กับ MAC Address ของคอมพิวพ์เตอร์"
                       } ,{                      
                           type: "name",
                           title: "ใช้ตัวเลือก MAC Address",
                           content: "ใส่ MAC Address ด้วยตนเอง ในกรณีผู้ให้บริการระบุ IP Address นี้ให้ใช้ผูกอยู่กับ MAC Address ของคอมพิวพ์เตอร์ที่เฉพาะเจาะจง"
                       }]
},
       TIME_SETTING :{ 
               TITLE:"การตั้งเวลา",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Settings allows you to configure the system time for the router. Once modified, the system time will be applied to time-based functions and configurations such as Parental Controls."
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "You can toggle on to enable 24-Hour Time feature before configuration, which will be applied to system-time-based functions and configurations."
                       } ,{                      
                           type: "title",
                            title: "เวลาของระบบ"
                       } ,{                      
                           type: "step",
                           title: "To get time from the Internet",
       content: [ 
                "Selected by default, Get from the Internet allows you to get the system time from the Internet.",
                "1. Select Get from the Internet.",
                "2. Select the local Time Zone from the drop-down menu.",
                "3. In the NTP Server I field, enter the IP address or domain name of the desired NTP Server.",
                "4. ในช่องเซิร์ฟเวอร์ NTP II ป้อนที่อยู่ IP หรือชื่อโดเมนของเซิร์ฟเวอร์ NTP ที่สอง (ถ้าต้องการ)",
                "5. คลิ๊กรับค่า",
                "6. คลิก Save"]
} ,{                      
                           type: "step",
                           title: "To get time from PC",
       content: [ 
                "This feature allows you to get the system time from the PC. Please confirm the PC time before configuration.",
                "Select Get from PC and Click Save."]
} ,{                      
                           type: "step",
                           title: "To manually set time",
       content: [ 
                "If the device cannot automatically obtain time from the Internet or PC, you can manually configure the system time.",
                "1. Select Manually.",
                "2. Enter the current Date and Time.",
                "3. คลิกบันทึก"]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Daylight Saving",
                           content: "This feature can automatically synchronize the system time with daylight saving time."
                       } ,{                      
                           type: "step",
                           title: "ตั้งเป็นเวลาออมแสง",
       content: [ 
                "1. เลือกเปิดใช้งานตามฤดูกาล",
                "2. Specify a time period of the daylight saving time in the local time zone.",
                "3. คลิกบันทึก"]
}]
},
       DIGNOSTIC :{ 
               TITLE:"การวินิจฉัย",
               CONTENT: [{
                           type: "paragraph",
                           content: "The router provides Ping and Traceroute tools to help you troubleshoot network problems."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "The Ping tool sends packets to a target IP address or domain name and logs the results, such as the number of packets sent and received, and the round-trip time."
                       } ,{                      
                           type: "paragraph",
                           content: "The Traceroute tool sends packets to a target IP address or domain name and displays the number of hops and time to reach the destination."
                       } ,{                      
                           type: "paragraph",
                           content: "You can ping or traceroute a local device by the IP address or a domain name, such as tp-link.com, yahoo.com, etc."
                       } ,{                      
                           type: "step",
                           title: "ในการวินิจฉัยโดยใช้ Ping",
       content: [ 
                "1. Select Ping as the Diagnostic Tool.",
                "2. Enter the target IP Address or Domain Name.",
                "3. Click the Arrow Icon to open the Advanced menu and specify the Ping Count, and Ping Packet Size. (Optional)",
                "4. Click Start."]
} ,{                      
                           type: "step",
                           title: "ในการวินิจฉัยโดยใช้ Traceroute",
       content: [ 
                "1. Select Traceroute as the Diagnostic Tool.",
                "2. Enter the target IP Address or Domain Name.",
                "3. Click the Arrow Icon to open the Advanced menu and specify the number of hops (to be reached) in the Traceroute Max TTL (Time to Live) field. The default is 20. (Optional)",
                "4. Click Start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Port Mirroring"
                       } ,{                      
                           type: "paragraph",
                           content: "Port Mirroring refers to the process of forwarding copies of packets from a mirrored port to a mirroring port. Usually, the mirroring port is connected to a data diagnose device, which is used to analyze the mirrored packets for monitoring and troubleshooting the network."
                       } ,{                      
                           type: "step",
                           title: "To forward copies of packets to the designated port",
       content: [ 
                "1. Enable Port Mirroring.",
                "2. Select the desired ports as the mirrored ports.",
                "3. Select a desired port as the mirroring port.",
                "4. คลิ๊กบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "A port cannot be set as the mirrored port and the mirroring port simultaneously."
                       }]
},
       FIRMWARE :{ 
               TITLE:"การอัพเกรดเฟิร์มแวร์",
               CONTENT: [{
                           type: "paragraph",
                           content: "Firmware Upgrade updates the router's firmware with new features or bug fixes. It's recommended to upgrade the router with the latest firmware file to have the best performance."
                       } ,{                      
                           type: "step",
                           title: "Noticing the following will help you avoid upgrade failure:",
       content: [ 
                "ก่อนอัพเกรด",
                "1. ตรวจสอบให้แน่ใจว่าคุณมีการเชื่อมต่อที่ถูกต้องระหว่างเราเตอร์และคอมพิวเตอร์ ไม่แนะนำให้อัพเกรดเฟิร์มแวร์ผ่านไวเลส",
                "2. ตรวจสอบให้แน่ใจว่าคุณได้ถอดอุปกรณ์ USB ทั้งหมดที่เชื่อมต่อกับเราเตอร์",
                "3. อย่าลืมสำรองข้อมูลแฟ้มการกำหนดค่าของเราเตอร์",
                "กำลังทำการอัพเกรด",
                "กรุณาอย่าปิดเราเตอร์จนกว่าการอัพเกรดเสร็จสมบูรณ์"]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"To upgrade the firmware online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "เมื่อระบบมีการแจ้งคลิกที่อัปเกรดและยืนยัน เราเตอร์จะทำการดาวน์โหลดและอัปเกรดเฟิร์มแวร์ล่าสุดโดยอัตโนมัติ นอกจากนี้คุณยังสามารถคลิกตรวจสอบสำหรับการอัปเกรดเพื่อตรวจสอบเวอร์ชั่นของเฟิร์มแวร์ล่าสุด"]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"To upgrade the firmware manually",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Click Support at the bottom of the page and download the latest firmware to the computer. Please make sure that the firmware file you are going to download matches with the router's hardware version as shown on the page.",
                "2. คลิกเรียกดูและเลือกไฟล์ที่ดาวโหลดเฟิร์มแวร์",
                "3. คลิกอัพเกรด"]
} ,{                      
                           type: "paragraph",
       content: [ 
                "การอัปเกรดเฟิร์มแวร์จะเสร็จสิ้นโดยใช้เวลาเพียงไม่กี่นาที เมื่ออัปเกรดเฟิร์มแวร์เรียบร้อยแล้วเราเตอร์จะทำการรีบูตโดยอัตโนมัติ"]
}]
},
       BACKUP :{ 
               TITLE:"Backup & Restore",
               CONTENT: [{
                           type: "paragraph",
                           content: "The Backup & Restore feature allows you to back up the router's current configuration for recovery, or simply restore the router to default settings."
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "Please do NOT power off the router during the backup or restore process."
                       } ,{                      
                           type: "title",
                           title: "การสำรองข้อมูล",
                           content: "ขอแนะนำการสำรองข้อมูลการตั้งค่าปัจจุบัน ซึ่งเป็นสิ่งจำเป็นเพื่อใช้สำหรับการกู้คืน เพื่อที่จะเรียกคืนค่าเราเตอร์ไปสู่สถานะเดิม"
                       } ,{                      
                           type: "step",
                           title: "การกำหนดค่าการสำรองข้อมูลปัจจุบัน",
       content: [ 
                "1. คลิกการสำรองข้อมูล",
                "2. รอสักครู่เพื่อให้เราเตอร์สำรองข้อมูลการตั้งค่าปัจจุบัน"]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "คืนค่า",
                           content: "You can restore the router to a previous status from a backup file."
                       } ,{                      
                           type: "step",
                           title: "การเรียกคืนจากการสำรองข้อมูล",
       content: [ 
                "1. คลิ๊กเรียกดู",
                "2. ค้นหาและเลือกแฟ้มสำรองข้อมูล",
                "3. คลิ๊ก Restore"]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "การคืนค่าโรงงาน",
       content: [ 
                "การคืนค่าโรงงานของเราเตอร์จะลบการกำหนดค่าและการตั้งค่าของคุณทั้งหมด และจะกลับสู่ค่าเริ่มต้นจากโรงงาน ตัวอย่างเช่น ข้อมูลเครือข่ายจะถูกลบ",
                "หลังจากคืนค่าโรงงาน คุณจะต้องตั้งรหัสผ่านใหม่เพื่อเข้าถึงหน้าจัดการเว็บของเราเตอร์"]
}]
},
       REBOOT :{ 
               TITLE:"ช่วงเวลาที่ทำการรีบูท",
               CONTENT: [{
                           type: "paragraph",
                           content: "คุณลักษณะกำหนดการรีบูท ลบค่าแคชเพื่อเพิ่มประสิทธิภาพการทำงานของเราเตอร์ คุณสามารถเริ่มต้นเราเตอร์ด้วยตนเองหรือตั้งค่าให้เริ่มต้นใหม่ได้อย่างสม่ำเสมอ"
                       } ,{                      
                           type: "step",
                           title: "To reboot manually",
       content: [ 
                "Click Reboot and wait a few minutes for the router to restart."]
} ,{                      
                           type: "step",
                           title: "กำหนดเวลาการรีบูต",
       content: [ 
                "เปิดกำหนดเวลาการรีบูต",
                "2. การตั้งค่าเวลาและความถี่ในการเริ่มต้นใหม่เราเตอร์โดยระบุพารามิเตอร์ในเวลารีบูท และทำซ้ำ",
                "3. คลิกบันทึก"]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administration",
               CONTENT: [{
                           type: "paragraph",
                           content: "การบริหารจัดช่วยให้คุณจัดการรหัสผ่านเข้าสู่ระบบและสิทธิ์ในการเข้าถึงของผู้ใช้บริการที่เชื่อมต่อกับเราเตอร์"
                       } ,{                      
                           type: "name",
                           title: "การจัดการบัญชี",
                           content: "This feature allows you to change the password.",
       children: [{                      
                           type: "step",
                           title: "To change the password",
       content: [ 
                "1. Enter Old Password.",
                "2. Enter New Password.",
                "3. Confirm New Password.",
                "4. คลิ๊กบันทึก"]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"กู้รหัสผ่าน",
               CONTENT: [{
                           type: "name",
                           title: "Default Password Recovery",
                           content: "เริ่มต้นกู้คืนรหัสผ่านช่วยให้คุณสามารถกู้คืนรหัสผ่านเข้าสู่ระบบเริ่มต้นโดยไม่ต้องคืนค่าเริ่มต้นโรงงาน",
       children: [{                      
                           type: "step",
                           title: "To change the password",
       content: [ 
                "1. Enable the Default Password Recovery feature.",
                "2. In the From field, enter a valid email address used for sending a vertification code for recovering login information.",
                "3. In the To field, enter a valid email address used for receiving the vertification code.",
                "4. Enter SMTP Server of the outgoing email (From).",
                "5. If the email in the From field requires encryption, you must select the Enable Authentication checkbox and enter its Username (email address) and Password.",
                "6. คลิก Save"]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"การบริหารจัดการท้องถิ่น",
               CONTENT: [{
                           type: "paragraph",
                           content: "คุณลักษณะนี้ช่วยให้อุปกรณ์ภายในสามารถเข้าถึงและจัดการเราเตอร์ได้"
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "การจัดการภายในเครือข่ายผ่าน HTTPS",
                           content: "เปิดใช้งานการจัดการภายในผ่าน HTTPS ถ้าคุณต้องการเข้าถึงเราเตอร์ผ่านทั้ง HTTPS และ HTTP หรือปิดใช้งานหากคุณต้องการเข้าถึงเราเตอร์ผ่านทาง HTTP เท่านั้น"
                       } ,{                      
                           type: "name",
                           title: "การเข้าถึงสำหรับทุกอุปกรณ์เชื่อมต่อ LAN",
                           content: "สลับบนเพื่อให้การจัดการท้องถิ่นสำหรับอุปกรณ์ทั้งหมดเชื่อมต่อ LAN หรือปิดเพื่อให้การจัดการสำหรับอุปกรณ์เฉพาะ"
                       } ,{                      
                           type: "name",
                           title: "MAC Address",
                           content: "แสดงที่อยู่MAC ของอุปกรณ์การจำกัดการเข้าถึง"
                       } ,{                      
                           type: "name",
                           title: "รายละเอียด",
                           content: "แสดงรายละเอียดของอุปกรณ์การจำกัดการเข้าถึง"
                       } ,{                      
                           type: "name",
                           title: "สถานะ",
                           content: "แสดงสถานะปัจจุบันของอุปกรณ์การจำกัดการเข้าถึง(เปิดใช้งานหรือปิดการใช้งาน)"
                       } ,{                      
                           type: "name",
                           title: "แก้ไข",
                           content: "ตัวเลือกการแสดงผลที่จะแก้ไขและลบทิ้งอุปกรณ์ที่เกี่ยวข้องจากรายการ"
                       } ,{                      
                           type: "step",
                           title: "ในการเพิ่มอุปกรณ์ไคลเอ็นต์ในรายการ",
       content: [ 
                "1. คลิก Add",
                "2. คลิ๊กดูอุปกรณ์ที่มีอยู่ในการเลือกอุปกรณ์ที่มีอยู่หรือป้อนที่อยู่ MAC ของอุปกรณ์ลงในช่องที่อยู่ MAC",
                "3. ใส่รายละเอียดสำหรับอุปกรณ์",
                "4. เลือก Enable",
                "5. คลิก OK"]
} ,{                      
                           type: "step",
                           title: "การปรับเปลี่ยนหรือลบอุปกรณ์ในรายการ",
                           content: "ในตารางคลิกไอคอน Edit หรือ ไอคอน Trash ที่สอดคล้องกับอุปกรณ์ที่คุณต้องการที่จะแก้ไขหรือลบ"
                       } ,{                      
                           type: "step",
                           title: "ในการลบอุปกรณ์หลาย",
                           content: "เลือกอุปกรณ์ทั้งหมดที่คุณต้องการลบ คลิ๊กลบ"
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"การจัดการระยะไกล",
               CONTENT: [{
                           type: "name",
                           title: "การจัดการระยะไกล",
                           content: "The Remote Management feature allows remote devices to access and manage the router.",
       children: [{                      
                           type: "step",
                           title: "To forbid all remote devices to manage the router",
                           content: "Select Disable Remote Management and click Save."
                       } ,{                      
                           type: "step",
                           title: "To allow all remote devices to manage the router",
       content: [ 
                "1. Select Enable Remote Mangement for ALL Devices.",
                "2. Enter Web Management Port (1024-65535 or 80) through which the remote devices will access the router.",
                "3. คลิกบันทึก"]
} ,{                      
                           type: "step",
                           title: "To allow a specific remote device to manage the router",
       content: [ 
                "1. Select Enable Remote Mangement for a Specific Device.",
                "2. Enter Web Management Port (1024-65535 or 80) through which the remote device will access the router.",
                "3. Enter the Remote Management IP Address of the remote device to manage the router.",
                "4. คลิ๊กบันทึก"]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"การจัดการระยะไกล",
               CONTENT: [{
                           type: "paragraph",
                           content: "คุณลักษณะการจัดการระยะไกลช่วยให้คุณเข้าถึงและกำหนดค่าเราท์เตอร์จากระยะไกลจากอินเทอร์เน็ต"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "การตั้งค่าการจัดการระยะไกล"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. เลือกช่องทำเครื่องหมายเพื่อเปิดใช้งานคุณลักษณะการจัดการระยะไกล"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. ให้พอร์ต HTTPS และ HTTP Port เป็นค่าเริ่มต้น"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. เลือกเพื่อตัดสินใจว่าอุปกรณ์ระยะไกลใดที่สามารถเข้าถึงเราเตอร์ได้จากระยะไกล:",
       children: [{                      
                           type: "name",
                           title: "All Devices",
                           content: "อุปกรณ์ระยะไกลทั้งหมดสามารถเข้าถึงเราเตอร์ได้"
                       } ,{                      
                           type: "name",
                           title: "ระบุอุปกรณ์",
                           content: "ป้อน IP แอดเดรสของอุปกรณ์ระยะไกลเพื่อเข้าถึงเราเตอร์"
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. คลิ๊กบันทึก"
                       } ,{                      
                           type: "paragraph",
                           content: "ตอนนี้คุณสามารถจัดการเราเตอร์จากระยะไกลผ่านทางที่อยู่ที่แสดงภายใต้ที่อยู่เว็บสำหรับการจัดการ"
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "หากมีคำเตือนปรากฎขึ้นเมื่อคุณไปที่ที่อยู่ข้างต้นจากระยะไกลให้คลิก Trust (หรือตัวเลือกที่คล้ายกัน) เพื่อดำเนินการต่อ"
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Once Night Mode is enabled, the LEDs will be off during the specified period everyday without affecting the router's performance."
                       } ,{                      
                           type: "step",
                           title: "To enable Night Mode",
       content: [ 
                "1. Select Enable Night Mode.",
                "2. Specify a time period when the LEDs will be off.",
                "3. คลิกบันทึก"]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"ค่าล็อกของระบบ",
               CONTENT: [{
                           type: "paragraph",
                           content: "The System Log displays the most recent activities of the router. The table consists of the type, level and log content of the system logs which can be filtered to be viewed. You can also save the system logs to the local computer or send them to the email."
                       } ,{                      
                           type: "step",
                           title: "To save system logs to the local computer",
       content: [ 
                "1. Set the Type and minimum level to filter the desired system logs. The Level list is in descending order, with the lowest level listed last.",
                "2. Click Save Log to save the system logs file to the local computer."]
} ,{                      
                           type: "step",
                           title: "To receive system logs via email",
       content: [ 
                "1. Set the Type and Level to filter the desired system logs. The Level list is in descending order, with the lowest level listed last.",
                "2. Click Email Settings.",
                "3. In the From field, enter a valid email address to be used as the outgoing email.",
                "4. In the To field, enter a valid email address to be used as the incoming email.",
                "5. Enter the SMTP Server address of the outgoing email (From).",
                "Note:If the outgoing email requires authentication, select the Enable Authentication checkbox and enter its Username (email address) and Password.",
                "6. If you want to receive system logs via email regularly, select the Enable Auto Mail checkbox and set a specific time (in 24-hour clock format) or a time interval.",
                "If you want to immediately receive the current system logs, click Mail Log Now.",
                "7 คลิ๊กบันทึก"]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Traffic Monitor",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the traffic usage of a device in the past 10 minutes or that of all devices in the past 10 minutes/24 hours/7 days."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Traffic Monitor List",
               CONTENT: [{
                           type: "paragraph",
                           content: "The list is grouped by the connection type of devices: wired or wireless."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"System Parameter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "การเชื่อมต่อไวเลส 2.4GHz/5GHz",
                           content: "This section allows you to configure the parameters of traffic transmission rules in wireless networks. It's recommended to keep the default settings if you are not sure of the proper ones in the case."
                       } ,{                      
                           type: "name",
                           title: "ช่วง Beacon",
                           content: "ป้อนค่าระหว่าง 40 และ 1000 มิลลิวินาทีในการกำหนดระยะเวลาระหว่างสัญญาณแพ็คเก็ตที่มีการออกอากาศโดย Router ในการประสานเครือข่ายไวเลสเริ่มต้นคือ 100 มิลลิวินาที"
                       } ,{                      
                           type: "name",
                           title: "RTS Threshold",
                           content: "ป้อนค่าระหว่าง 1 และ 2346 เพื่อกำหนดขนาดแพ็คเก็ตของการส่งข้อมูลผ่านเราท์เตอร์ โดยค่าเริ่มต้น RTS (ขอส่ง) ขนาดธรณีประตูเป็น 2346 ถ้าขนาดแพ็คเก็ตสูงกว่าเกณฑ์ที่ตั้งไว้ล่วงหน้า, Router ส่งคำขอของเฟรมที่จะส่งสถานีรับโดยเฉพาะอย่างยิ่งการเจรจาและการส่งของกรอบข้อมูลหรืออื่น ๆ แพ็คเก็ตจะถูกส่งทันที"
                       } ,{                      
                           type: "name",
                           title: "DTIM ช่วง",
                           content: "This value determines the internal of DTIM (Delivery Traffic Indication Message). Enter a value between 1 and 15 internals. The default interval is 1, indicating the DTIM interval is the same as Beacon Interval."
                       } ,{                      
                           type: "name",
                           title: "ปรับปรุงคีย์กลุ่มระยะเวลา",
                           content: "ใส่จำนวนวินาที (ขั้นต่ำ 30) ในการควบคุมช่วงเวลาสำหรับการเข้ารหัสที่สำคัญการต่ออายุโดยอัตโนมัติเริ่มต้นเป็น 0 บ่งชี้ที่สำคัญไม่มีการต่ออายุ"
                       } ,{                      
                           type: "name",
                           title: "ฟีเจอร์ WMM",
                           content: "ฟังก์ชั่น WMM รับประกันแพ็คเก็ตที่มีข้อความมีความสำคัญสูงถูกส่งพิเศษ มันถูกเปิดใช้งานโดยค่าเริ่มต้นและขอแนะนำ"
                       } ,{                      
                           type: "name",
                           title: "คุณสมบัติ GI สั้น",
                           content: "This function is enabled by default and recommended to increase the packet capacity by the GI (Guard Interval) time."
                       } ,{                      
                           type: "name",
                           title: "ฟีเจอร์การแยก AP",
                           content: "If you want to confine and restrict all wireless devices connected to the network from interacting with each other, but still able to access the Internet, select the Enable AP Isolation checkbox."
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "2.4GHz/5GHz WDS"
                       } ,{                      
                           type: "step",
                           title: "To enable WDS",
                           content: "WDS(Wireless Distribution System) Bridging feature allows you to extend the wireless network coverage by bridging with an AP (access point) in a wireless WLAN (local network)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Select to enable the WDS Bridging feature.",
                "2. To bridge a network by Scan feature: click Scan to scan and display all available networks and select the network you want to bridge with. The SSID (network name), MAC Address, and Security will be automatically populated.",
                "Or to bridge a network manually: enter the SSID (network name), MAC Address and WDS Mode of the network to be bridged. Select a Security type and enter related parameters, which should be the same as the network to be bridged.",
                "3. คลิกบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you are not sure of WDS Mode, keep the default option of Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup) allows you to easily connect the WPS-enabled devices to the router by pushing the WPS button. Check to enable the WPS feature and click Save."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "เมื่อ NAT ถูกปิดใช้งานการตั้งค่าในการ NAT Forwarding จะไม่มีผล"
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Select the Enable NAT Boost checkbox and click Save to ensure that the router has the best throughput."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "หมายเหตุ",
                           content: "เมื่อ NAT Boost ถูกเปิดใช้งาน QoS และสถิติการเข้าชมจะถูกปิดการใช้งานโดยอัตโนมัติ"
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS Protection Settings",
                           content: "The DOS Protection protects the router from ICMP-FLOOD, UDP-FLOOD and TCP-FLOOD attacks."
                       } ,{                      
                           type: "name",
                           title: "ICMP ระดับการฟลัดแพ็คเก็ต",
                           content: "Enter a value between 5 and 7200 to trigger the ICMP-FLOOD protection immediately when the number of ICMP packets exceeds the preset threshold value."
                       } ,{                      
                           type: "name",
                           title: "UDP ระดับการฟลัดแพ็คเก็ต",
                           content: "Enter a value between 5 and 7200 UDP packets to trigger the UDP-FLOOD protection immediately when the number of UDP packets exceeds the present threshold value."
                       } ,{                      
                           type: "name",
                           title: "TCP-ระดับการฟลัดแพ็คเก็ต",
                           content: "Enter a value between 5 and 7200 TCP-SYN packets to trigger the TCP-SYN-FLOOD protection immediately when the number of TCP packets exceeds the present threshold value."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Select the duplex type from the drop-down list and click Save."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "เปิดโหมดกลางคืน",
                           content: "เลือกช่องกาเครื่องหมายนี้เพื่อปิดไฟ LED ในช่วงโหมดกลางคืนโดยไมส่งผลต่อสมรรถนะของเราเตอร์"
                       } ,{                      
                           type: "name",
                           title: "ช่วงเวลาโหมดกลางคืน",
                           content: "ระบุช่วงเวลาที่จะใช้โหมดกลางคืน"
                       } ,{                      
                           type: "paragraph",
                           content: "คลิก Save เพื่อบันทึกทุกการตั้งค่าของคุณ"
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "With OpenVPN, you can use the Internet to securely access the network when you are out of home. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
                       } ,{                      
                           type: "name",
                           title: "ชนิดการบริการ",
                           content: "เืลือกโปรโตคอลการสื่อสารสำหรับเซิร์ฟเวอร์ OpenVPN: UDP หรือ TCP"
                       } ,{                      
                           type: "name",
                           title: "พอร์ตบริการ",
                           content: "Enter a communication port number between 1024 and 65535. The default and common service port is 1194."
                       } ,{                      
                           type: "name",
                           title: "ซับเน็ต/เน็ตมาส์ก VPN",
                           content: "ป้อนช่วงของ IP address ที่เซิร์ฟเวอร์ OpenVPN สามารถเช่าให้กับไคลเอนต์"
                       } ,{                      
                           type: "name",
                           title: "การเข้าถึงของไคลเอนต์",
                           content: "Select the access type for the OpenVPN client.",
       children: [{                      
                           type: "name",
                           title: "เครือข่ายโฮมเท่านั้น",
                           content: "Client can only access the home network. The client's default route will not be changed."
                       } ,{                      
                           type: "name",
                           title: "อินเทอร์เน็ตและเครือข่ายโฮม",
                           content: "Client can access the home network, and Internet sites or services with a geographic limitation when you are out of the country. The client's default route will be altered."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"ใบรับรอง",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "ใช้ใบรับรองสำหรับข้อมูลและการระบุลักษณะของการเชื่อมต่อ VPN สำหรับคอมพิวเตอร์ระยะไกล",
                "คลิกเพื่อสร้างใบรับรองใหม่"]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"ไฟล์การกำหนดค่า",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "ไคลเอนต์ระยะไกลจะใช้แฟ้มการกำหนดค่าการเข้าถึงเราเตอร์ของคุณ",
                "คลิกเพื่อบันทึกการกำหนดค่า OpenVPN"]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"คู่มือการติดตั้ง VPN Client",
               CONTENT: [{
                           type: "step",
                           title: "To connect the client devices to the OpenVPN server:",
       content: [{                      
                           type: "paragraph",
                           content: "Before you configure the OpenVPN server, please configure Dynamic DNS Service (recommended) or assign a static IP address for WAN port. And make sure the external port of NAT settings is not the service port, and the System Time is synchronized with Internet."
                       },
                "1. Select Enable VPN Server.",
                "2. Configure the OpenVPN server parameters (Service Type, Service Port, Client Access and VPN Subnet/Netmask) and click Save.",
                "3. Click Export to save the configuration file.",
                "4. On the client devices, download and install the OpenVPN client utility from <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "The official supported platforms include Windows, Mac OSX and Linux.",
                "5. Launch the OpenVPN client utility and add a new VPN connection using the saved configuration file to connect the client device to the VPN server."]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับไคลเอนต์ OpenVPN ให้คลิกที่ <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "With PPTP VPN, you can use the Internet to easily and rapidly access the network when you are out of home. It may be prevented by some ISP. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
                       } ,{                      
                           type: "name",
                           title: "IP Address ของไคลเอนต์",
                           content: "ป้อนช่วงของ IP address (ไคลเอนต์ไม่เกิน 10 เครื่อง) ที่เซิร์ฟเวอร์ PPTP VPN สามารถเช่าให้กับไคลเอนต์"
                       } ,{                      
                           type: "name",
                           title: "ชื่อผู้ใช้และรหัสผ่าน",
                           content: "ป้อนชื่อผู้ใช้และรหสผ่านเพื่อตรวจพิสูจน์ไคลเอนต์ต่อเซิร์ฟเวอร์ PPTP VPN"
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"คู่มือการติดตั้ง VPN Client",
               CONTENT: [{
                           type: "step",
                           title: "To connect the client devices to the PPTP VPN server:",
       content: [{                      
                           type: "paragraph",
                           content: "Before you configure the PPTP VPN server, please configure Dynamic DNS Service (recommended) or assign a static IP address for the WAN port. Please make sure the external port of NAT settings is not 1723 and the System Time is synchronized with Internet."
                       },
                "1. Select Enable VPN Server.",
                "2. Configure the PPTP VPN server parameters and click Save.",
                "3. On the client devices, create a PPTP VPN connection. The official supported platforms include Windows, Mac OSX, Linux, iOS, and Android.",
                "4. Launch the PPTP VPN program, add a new connection and enter the domain name of the registered DDNS service or the static IP address that is assigned to the WAN port, to connect the client device to the PPTP VPN server."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN Connections",
               CONTENT: [{
                           type: "paragraph",
                           content: "หน้านี้แสดงไคลเอนต์ที่กำลังเชื่อมต่อกับเซิร์ฟเวอร์ OpenVPN และ PPTP VPN ที่โฮสต์บนเราเตอร์"
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Network Map",
               CONTENT: [{
                           type: "paragraph",
                           content: "In Network Map, you can view the current network connection status and wireless information of the router and the information of connected devices."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"อินเทอร์เน็ต",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the Internet information."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"เราท์เตอร์",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the current network information of the wireless networks and the LAN ports."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Wired/Wireless Clients",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the network name (editable), assigned IP and MAC address of the connected clients of the router."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"ปรินเตอร์",
               CONTENT: [{
                           type: "paragraph",
                           content: "แสดงชื่อของปรินเตอร์ที่เชื่อมต่อกับเราท์เตอร์ผ่าน USB"
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB Disk",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays relevant information of USB disk connected to the router via USB port."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Speed Test",
               CONTENT: [{
                           type: "paragraph",
                           content: "คุณลักษณะนี้จะทดสอบความเร็วในการอัปโหลดและดาวน์โหลดที่ได้รับจากผู้ให้บริการและให้คำแนะนำที่เป็นประโยชน์เกี่ยวกับความสามารถของอินเทอร์เน็ต"
                       } ,{                      
                           type: "paragraph",
                           content: "เคล็ดลับ: สำหรับผลที่ถูกต้องมากขึ้น ลองปิดแอพลิเคชันและโปรแกรมอื่น ๆ"
                       } ,{                      
                           type: "paragraph",
                           content: "ประวัติ - บันทึกการทดสอบความเร็วก่อนหน้านี้"
                       } ,{                      
                           type: "paragraph",
                           content: "ทดสอบอีกครั้ง - คลิกเพื่อดำเนินการทดสอบความเร็ว"
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"อินเทอร์เน็ต",
               CONTENT: [{
                           type: "paragraph",
                           content: "Click Auto Detect or select the Internet connection type manually. Then enter corresponding parameters provided by the ISP."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"เชื่อมต่ออัจฉริยะ",
               CONTENT: [{
                           type: "paragraph",
                           content: "เลือกช่องกาเครื่องหมายนี้เพื่อเปิดใช้งานการเชื่อมต่ออัจฉริยะ ฟังก์ชันนี้ช่วยให้อุปกรณ์ทำงานได้เร็วขึ้นโดยมอบหมายอุปกรณ์ให้กับช่วงไวเลสที่ดีที่สุดตามสภาพที่แท้จริง เพื่ิอปรับสมดุลความต้องการเครือข่าย"
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"การตั้งค่าเครือข่ายไวเลส",
               CONTENT: [{
                           type: "paragraph",
                           content: "You can configure the wireless settings (SSID, password, etc.)"
                       } ,{                      
                           type: "name",
                           title: "ชื่อเครือข่าย (SSID)",
                           content: "You are recommended to change the network name (SSID). This field is case-sensitive."
                       } ,{                      
                           type: "name",
                           title: "ซ่อน SSID",
                           content: "Select if you want to hide the 2.4GHz/5GHz network name (SSID) from the wireless network list. Once selected, the SSID will not be broadcast and you need to manually join the network."
                       } ,{                      
                           type: "name",
                           title: "รหัสผ่าน",
                           content: "ใส่รหัสผ่านระหว่าง 8 และ 63 ตัวอักขระ ASCII , หรือระหว่าง 8 และ 64 ตัวอักขระเลขฐานสิบหก ซึ่งในส่วนนี้ต้องคำนึงถึง case-sensitive"
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB Storage Device",
               CONTENT: [{
                           type: "paragraph",
                           content: "This feature allows you to share USB storage devices among different clients in the local area network or through the Internet."
                       } ,{                      
                           type: "title",
                           title: "ตั้งค่าอุปกรณ์",
                           content: "The Device Settings section displays the basic information of the USB storage device connected via the USB port. A USB flash disk usually has only one volume."
                       } ,{                      
                           type: "name",
                           title: "ค้นหา",
                           content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan and refresh the screen with the updated information.",
       children: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "A gray area represents a volume that is disabled. You can click the area to share the specific volume."
                       }]
} ,{                      
                           type: "name",
                           title: "เอาออก",
                           content: "Click this button to safely unmount the USB storage device before physically unplugging it from the USB port.",
       children: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "Remove button only appears when the USB storage device is connected to the router. When the current volume is busy, you are unable to unmount."
                       }]
} ,{                      
                           type: "step",
                           title: "การตั้งค่าไฟล์เซิร์ฟเวอร์",
       content: [ 
                "1. Attach the USB storage device to the USB port directly or using a USB cable. If the device requires bundled external power, make sure the external power has been connected.",
                "2. The newly attached USB device should be automatically detected by the router and be displayed under the Device Settings section. If not, click Scan.",
                "Note: The Share icon appears when more than 5 volumes are connected to the router. You can click the icon to disable volumes you don't need to share."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Access Address",
               CONTENT: [{
                           type: "name",
                           title: "ชื่อเครือข่าย/สื่อ",
                           content: "Displays the name used to access the connected USB storage device through the Network Neighborhood method or Media Sharing feature. It is TP-Share by default."
                       } ,{                      
                           type: "name",
                           title: "วิธีการเข้าระบบ",
                           content: "มี 4 วิธีในการเข้าถึงอุปกรณ์เก็บข้อมูล USB ที่ใช้ร่วมกัน",
       children: [{                      
                           type: "name",
                           title: "Network Neighborhood",
                           content: "Select this option to allow users on the network to access the shared contents via the address shown under the Address column."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Select this option to enable the FTP server feature that allows FTP clients and users on the network to access the USB storage device via the FTP address shown under the Address column."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internet)",
                           content: "Select this option to allow FTP clients and users to remotely access, download and upload files to the shared USB storage device through FTP over the Internet. To customize the access address, click Edit and set up the Dynamic DNS for the router. To change the FTP server’s port, enter a new port number and click Save to apply the changes."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Select this option to enable the SFTP server feature that allows SFTP clients and users on the network to access the USB storage device via the SFTP address shown under the Address column."
                       }]
} ,{                      
                           type: "name",
                           title: "Address",
                           content: "แสดงที่อยู่ที่ใช้ในการเข้าถึงการใช้งานร่วมกันอุปกรณ์ USB"
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Displays the port number used to access the FTP server."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Sharing Contents",
               CONTENT: [{
                           type: "paragraph",
                           content: "Displays the folders you share. All folders are shared by default. You can click the Edit icon to customize the shared folders."
                       } ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "The Share icon appears in the Device Settings section when more than 5 volumes are connected to the router. You can click the Share icon to disable volumes you don't need to share."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Sharing Contents and Security",
               CONTENT: [{
                           type: "name",
                           title: "Sharing Contents",
                           content: "Displays the folders you share. All folders are shared by default. You can click the Edit icon to customize the shared folders.",
       children: [{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "The Share icon appears in the Device Settings section when more than 5 volumes are connected to the router. You can click the Share icon to disable volumes you don't need to share."
                       }]
} ,{                      
                           type: "name",
                           title: "Access Authentication",
       content: [ 
                "Toggle On to enable authentication which requires the users to enter a valid username and password to access all the shared folders. Accessing as Administrator can read and modify the files while the User can only read the files.",
                "Username should  begin with a letter or an underline and contain 1 to 15 characters using letters, digits and underlines.",
                "Password should contain 1 to 15 characters using letters, digits and underlines."]
} ,{                      
                           type: "name",
                           title: "อนุญาตให้ผู้ใช้บนเครือข่ายสำหรับบุคคลภายนอกเข้าสู่ระบบ",
                           content: "Toggle On to allow guest network users to access all the shared folders."
                       } ,{                      
                           type: "name",
                           title: "เปิดการแบ่งบันสื่อ",
                           content: "With this feature enabled, all DLNA-supported devices in the local network can access media files in all the shared folders. Users won't be required to enter username or password even if Access Authentication is enabled."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Printer Server",
               CONTENT: [{
                           type: "name",
                           title: "Printer Server",
                           content: "Toggle On to enable the Printer Server function."
                       } ,{                      
                           type: "name",
                           title: "ชื่อปรินเตอร์",
                           content: "Displays the name of the printer connected to the router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Parental Control",
               CONTENT: [{
                           type: "paragraph",
                           content: "With the basic settings of Parental Controls, you can restrict access by certain times of day (for example, no Internet access from the child's PC during homework time)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Devices Under Parental Control",
               CONTENT: [{
                           type: "paragraph",
                           content: "This table displays the information and settings of the devices that are currently restricted by Parental Controls."
                       } ,{                      
                           type: "step",
                           title: "หากต้องการจำกัดอุปกรณ์ใหม่",
       content: [ 
                "1. Toggle On Parental Controls.",
                "2. Click Add.",
                "3. Click Scan to choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.",
                "4. Click the Effective Time icon to specify a time period during which the restriction applies.",
                "5. Enter a brief description into the Description field. This field is optional.",
                "6. Select Enable This Entry.",
                "7 คลิ๊กบันทึก"]
} ,{                      
                           type: "note",
                           title: "หมายเหตุ",
                           content: "If you want to disable this entry, click the Bulb icon."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"เครือข่ายสำหรับบุคคลคนภายนอก",
               CONTENT: [{
                           type: "paragraph",
                           content: "This function allows you to provide Wi-Fi access for guests without disclosing the main network."
                       } ,{                      
                           type: "name",
                           title: "Allow Guests to Access Each Other",
                           content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with each other via methods such as network neighbors, Samba, Ping, and FTP."
                       } ,{                      
                           type: "name",
                           title: "Allow Guests to Access My Local Network",
                           content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with the devices connected to the router's LAN ports or main network via methods such as network neighbors, Samba, Ping, and FTP."
                       } ,{                      
                           type: "name",
                           title: "เปิดการใช้งานเครือข่ายสำหรับคนภายนอก",
                           content: "เลือกช่องนี้เพื่อเปิดการใช้งานเครือข่ายสำหรับคนภายนอก"
                       } ,{                      
                           type: "name",
                           title: "ชื่อเครือข่าย (SSID)",
                           content: "คุณสามารถปล่อยให้ใช้ชื่อเดิมของมันเป็นชื่อเริ่มต้นได้ หรือใส่ชื่อใหม่ (สามารถใส่ได้ 32 ตัวอักขระ)"
                       } ,{                      
                           type: "name",
                           title: "ซ่อน SSID",
                           content: "เลือกนี้ถ้าคุณต้องการซ่อนเครือข่ายสำหรับคนภายนอกจากรายชื่อเครือข่าย Wi-Fi"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "ปรับปรุงรหัสผ่านตามช่วงเวลา",
                           content: "Select the update interval of the Guest Network password."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "รหัสผ่าน",
                           content: "สร้างรหัสผ่านที่ประกอบด้วยอักขระ ASCII ระหว่าง 8 - 63 ตัวหรืออักขระเลขฐานสิบหกระหว่าง 8 - 64 ตัว (0-9, a-f, A-F)"
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "รหัสผ่าน",
                           content: "ให้ใช้รหัสผ่านที่สร้างแบบสุ่มหรือสร้างรหัสผ่านระหว่าง 8 ถึง 63 ตัวอักขระ ASCII หรือระหว่าง 8 และ 64 อักขระเลขฐานสิบหก (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link คลาวด์",
               CONTENT: [{
                           type: "paragraph",
                           content: "บริการ TP-Link Cloud ช่วยให้คุณสามารถตรวจสอบเครือข่ายระยะไกลของคุณในเวลาจริง ซึ่งสามารถเข้าถึงและจัดการอุปกรณ์ TP-Link ของคุณจากอินเทอร์เน็ตทุกที่ทุกเวลา"
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"ข้อมูลเกี่ยวกับบัญชี",
               CONTENT: [{
                           type: "paragraph",
                           content: "รูปภาพแสดงข้อมูลของ TP Link ID คุณสามารถแก้ไขข้อมูลได้โดยคลิกที่ ไอคอน Edit"
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"ข้อมูลอุปกรณ์",
               CONTENT: [{
                           type: "paragraph",
                           content: "แสดงข้อมูลของอุปกรณ์ของคุณรวมถึงบัญชีของ TP-Link Cloud สำหรับการจัดการอุปกรณ์"
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"บัญชีที่ถูกผูกไว้",
               CONTENT: [{
                           type: "paragraph",
                           content: "ตารางนี้จะแสดงทุกบัญชี TP-Link Cloud ที่ถูกผูกไว้ในปัจจุบันไปยังอุปกรณ์"
                       } ,{                      
                           type: "step",
                           title: "การผูกบัญชีผู้ใช้",
       content: [ 
                "1. คลิกผูกบัญชี",
                "2. ป้อนอีเมลที่ลงทะเบียนที่คุณต้องการที่จะผูก",
                "3. คลิกบันทึก"]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Parental Control",
               CONTENT: [{
                           type: "paragraph",
                           content: "ระดับตัวกรอง เพื่อจำกัดการเข้าถึงโปรไฟล์ผู้ใช้ ควบคุมโดยผู้ปกครองให้ครอบครัวใช้งานอินเตอร์เน็ตส่วนบุคคลได้อย่างเหมาะสม"
                       } ,{                      
                           type: "step",
                           title: "เพื่อนำไปใช้ในการควบคุมอุปกรณ์โดยผู้ปกครอง",
       content: [ 
                "1. คลิก Add",
                "2. ป้อนชื่อ สำหรับโปรไฟล์และคลิก \"+\" เพื่อเพิ่มอุปกรณ์ภายใต้โปรไฟล์นี้",
                "3. เลือกระดับการกรองและกำหนดกรองเนื้อหาตามความต้องการของคุณ  คุณสามารถป้อนคำหลักในการค้นหาเว็บไซต์ที่คุณต้องการกรองในฐานข้อมูลของเรา  เว็บไซต์อื่นๆ (URL)ที่สามารถป้อนด้วยตนเอง<br/>อ้างอิงคำอธิบายต่อไปนี้สำหรับตัวกรองแต่ละประเภท:<p>เนื้อหาสำหรับผู้ใหญ่ - เว็บไซต์หรือเนื้อหาทางเพศที่ผิดกฎหมายที่เป็นอันตรายรวมทั้งสื่อลามกมีการใช้สารเสพติดความรุนแรงและการเลือกปฏิบัติ</p><p>การเล่นการพนัน - เว็บไซต์ที่ส่งเสริมหรือให้ข้อมูลเกี่ยวกับการเล่นการพนันรวมทั้งเว็บไซต์พนันออนไลน์</p><p>เพศศึกษา - เว็บไซต์ที่หารือเกี่ยวกับความสัมพันธ์ทางเพศ รวมทั้งการสืบพันธุ์ เพศเพศสัมพันธ์ที่ไม่ปลอดภัยและการควบคุมการเกิดโรคติดต่อทางเพศสัมพันธ์และการใช้ความรุนแรงทางเพศ</p><p>การสื่อสารออนไลน์ - เว็บไซต์หรือโฮสต์ ที่มีรูปแบบการสื่อสารกับคนอื่นๆ ผ่านข้อความเสียงหรือวิดีโอรวมทั้งอีเมล, บล็อค, ฟอรั่มออนไลน์ VoIP และบริการวิดีโอแชท</p><p>เครือข่ายสังคม - เว็บไซต์ที่เผยแพร่การแสดงออกส่วนบุคคลหรือการสื่อสารกับผู้คน โดยเชื่อมโยงกับกิจกรรมส่วนตัวของพวกเขา ขึ้นอยู่กับความสนใจหรืออาชีพหรือคนรู้จักในชีวิตจริง</p><p>จ่ายเงินเพื่อโฆษณา - เว็บไซต์ที่ผู้ใช้ต้องเสียค่าบริการสำหรับดูเว็บไซต์ ข้อความ อีเมล์หรือโฆษณาโดยคลิกลิงก์หรือแบบสอบถามเพื่อการสำรวจ</p><p>สื่อ - เว็บไซต์ที่ให้บริการฟรี จ่ายหรือสมัครรับข้อมูลเสียงและ / หรือเนื้อหาวิดีโอรวมถึงบริการสตรีมมิ่ง,การเขียนโปรแกรมทีวีหรือดาวน์โหลดเพลง</p><p>ดาวน์โหลด - เว็บไซต์ที่เข้าถึงไฟล์ร่วมกันและการจัดจำหน่ายรวมถึงการใช้งานร่วมกันแบบ peer-to-peer ไฟล์ออนไลน์ การจัดเก็บและเนื้อหาของอุปกรณ์มือถือ (เช่น เพลงและแอป)</p><p>เกมส์ - เว็บไซต์ที่ให้เข้าถึงเว็บโฮสต์หรือสามารถดาวน์โหลดเกมรวมถึงการเล่นเกมออนไลน์, เครือข่ายเกมคอนโซลและเกมบราวเซอร์</p>",
                "4. ถ้าคุณต้องการที่จะจำกัดเวลาของโปรไฟล์นี้สามารถกำหนดเวลาออนไลน์เพื่อเปิดใช้งานและระบุเวลาจำกัดการใช้งานได้ นอกจากนี้คุณยังสามารถใช้เวลานอน กำหนดช่วงเวลาในชีวิตประจำวันใน สำหรับอุปกรณ์ภายใต้โปรไฟล์นี้ เพื่อให้ไม่สามารถใช้อินเทอร์เน็ตได้",
                "5. Click Save."]
} ,{                      
                           type: "step",
                           title: "สำหรับการดูประวัติรายละเอียดการใช้งานอินเทอร์เน็ต",
       content: [ 
                "1. บนคอลัมน์ คลิกปุ่มเพื่อดูข้อมูล",
                "2. ถ้าคุณต้องการที่จะเห็นบันทึกเพิ่มเติม คลิก <span class=\"ptl-ctr-help-icon history\"></span>",
                "3. คุณสามารถยกเลิกการปิดกั้นเว็บไซต์โดยคลิก<span class=\"ptl-ctr-help-icon block\"></span> or <span class=\"ptl-ctr-help-icon unblock\"></span>"]
} ,{                      
                           type: "step",
                           title: "เพื่อปิดการใช้งานหรือเปิดใช้งานอินเทอร์เน็ตได้ทันที",
       content: [ 
                "ในคอลัมน์อินเทอร์เน็ตคลิก<span class=\"ptl-ctr-help-icon stop\"></span>เพื่อหยุดอุปกรณ์จากการเข้าถึงอินเทอร์เน็ตและคลิก<span class=\"ptl-ctr-help-icon enable\"></span> เพื่อให้สามารถเข้าถึงได้อีกครั้ง"]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "ลำดับความสำคัญของกิจกรรมออนไลน์ (QoS) และอุปกรณ์ในการรับประกันการเชื่อมต่อเครือข่ายได้เร็วขึ้นเมื่อคุณต้องการความเร็วมากที่สุด"
                       } ,{                      
                           type: "paragraph",
                           content: "เลือกลำดับในการจัดลำดับความสำคัญความเร็วของเครือข่ายสำหรับกิจกรรมออนไลน์และเลือกลำดับความสำคัญของอุปกรณ์ที่จะจัดลำดับความสำคัญความเร็วของเครือข่ายสำหรับอุปกรณ์"
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"ลำดับความสำคัญของแอพลิเคชัน",
               CONTENT: [{
                           type: "paragraph",
                           content: "เลือกกิจกรรมออนไลน์ที่คุณต้องการจัดลำดับความสำคัญ หรือคลิกกำหนดเองเพื่อตั้งค่าระดับความสำคัญของแต่ละกิจกรรมออนไลน์"
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"ความสำคัญของอุปกรณ์",
               CONTENT: [{
                           type: "paragraph",
                           content: "เลือกอุปกรณ์ที่คุณต้องการจัดลำดับความสำคัญและระยะเวลาที่ถูกจัดระดับความสำคัญ"
                       } ,{                      
                           type: "step",
                           title: "การจัดลำดับความสำคัญของอุปกรณ์",
       content: [ 
                "1. หาอุปกรณ์ที่คุณต้องการที่จะจัดลำดับความสำคัญในรายการและสลับลำดับความสำคัญ",
                "2. เลือกระยะอุปกรณ์จะสามารถจัดระดับความสำคัญสำหรับในคอลัมน์เกี่ยวกับเวลา"]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"ป้องกันไวรัส",
               CONTENT: [{
                           type: "paragraph",
                           content: "การสแกนเครือข่ายที่ใช้บ่อย การตรวจจับเว็บไซต์ที่เป็นอันตราย และแยกอุปกรณ์ที่มีไวรัส เพื่อป้องกันไวรัสทำให้ข้อมูลส่วนบุคคลของคุณปลอดภัย นอกจากนี้คุณยังสามารถตรวจสอบวิธีการป้องกันเครือข่ายของคุณ และถ้ามีการโจมตีใดๆ บนเครือข่าย"
                       } ,{                      
                           type: "paragraph",
                           content: "ประวัติ - บันทึกอุปกรณ์ที่ได้รับการป้องกัน โดยการป้องกันไวรัส และแหล่งที่มา และประเภทของการโจมตี"
                       } ,{                      
                           type: "paragraph",
                           content: "เปิดใช้งานทั้งหมด - แตะเพื่อเปิดใช้งานการป้องกันทั้งหมด หากตัวใดตัวหนึ่งหรือมากกว่าไม่ได้เปิดใช้"
                       } ,{                      
                           type: "paragraph",
                           content: "ประเภทการป้องกัน - เปิดใช้งานชนิดป้องกัน โดยอ้างอิงถึงคำอธิบาย แนะนำการเปิดใช้งานการป้องกันทุกประเภท"
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"ลำดับความสำคัญของแอพลิเคชัน",
               CONTENT: [{
                           type: "paragraph",
                           content: "การจัดลำดับกิจกรรมออนไลน์เพื่อรับประกันการเชื่อมต่อเครือข่ายได้เร็วขึ้นเมื่อคุณต้องการมากสุด เลือกกิจกรรมออนไลน์ที่คุณต้องการจัดลำดับความสำคัญ หรือคลิกกำหนดเองเพื่อตั้งค่าระดับความสำคัญของแต่ละกิจกรรมออนไลน์"
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"ความสำคัญของอุปกรณ์",
               CONTENT: [{
                           type: "paragraph",
                           content: "ลักษณะการทำงานของอุปกรณ์ จัดลำดับอุปกรณ์เพื่อรับประกันการเชื่อมต่อเครือข่ายได้เร็วขึ้นเมื่อคุณต้องการมากสุด เลือกอุปกรณ์ที่คุณต้องการจัดลำดับความสำคัญและเวลา ซึ่งอุปกรณ์นั้นๆ จะถูกจัดระดับความสำคัญ"
                       } ,{                      
                           type: "step",
                           title: "การจัดลำดับความสำคัญของอุปกรณ์",
       content: [ 
                "1. หาอุปกรณ์ที่คุณต้องการที่จะจัดลำดับความสำคัญในรายการและสลับลำดับความสำคัญ",
                "2. เลือกระยะอุปกรณ์จะสามารถจัดระดับความสำคัญสำหรับในคอลัมน์เกี่ยวกับเวลา"]
}]
},
       FIREWALL :{ 
               TITLE:"ไฟล์วอล",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) Firewall ป้องกันไม่ให้ถูกโจมตี และตรวจสอบการจราจรที่จะผ่านเราเตอร์ให้อยู่บนพื้นฐานของโปรโตคอล โดยค่าเริ่มต้นเปิดใช้คุณลักษณะนี้"
                       } ,{                      
                           type: "name",
                           title: "เปิด SPI Firewall",
                           content: "อย่าปิดการใช้งาน SPI Firewall ถ้าไม่จำเป็น"
                       } ,{                      
                           type: "name",
                           title: "อนุญาตให้ Pings จาก WAN พอร์ต/อนุญาตให้ Pings จากพอร์ต LAN",
                           content: "เปิดใช้งานการอนุญาตแพคเก็ต ping จากพอร์ต WAN/LAN ขอแนะนำให้ตั้งค่าเริ่มต้น"
                       }]
},
       "" :     ""
    };
})(jQuery);