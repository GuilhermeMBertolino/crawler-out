(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin liên quan về kết nối mạng Internet"
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Không dây 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin liên quan về mạng không dây."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin liên quan đến cổng LAN (Ethernet)"
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Mạng khách 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin về mạng không dây cho khách."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Thiết bị USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin về thiết bị lưu trữ USB và/hoặc máy in hiện đang kết nối đến router qua cổng USB."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Hiệu suất",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị hiệu suất hiện tại của router"
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Máy khách nối dây",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin về các thiết bị có dây đang kết nối đến mạng."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Máy khách không dây",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin của thiết bị không dây kết nối đến mạng."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cấu hình thông số IPv4 và chọn phương thức Sao chép MAC thích hợp mà bạn cần."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn Dạng kết nối Internet và nhập thông số tương ứng."
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: IP Động"
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn dạng này nếu bạn được cung cấp một kết nối với máy chủ DHCP của ISP. "
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IP/Subnet Mask/Gateway mặc định/DNS thứ nhất/DNS thứ hai",
                           content: "Các thông số này sẽ được gán tự động từ máy chủ DHCP của ISP."
                       } ,{                      
                           type: "name",
                           title: "Làm mới",
                           content: "Bấm chọn để lấy thông số IP mới từ máy chủ DHCP."
                       } ,{                      
                           type: "name",
                           title: "Giải phóng",
                           content: "Bấm chọn để giải phóng địa chỉ IP đã được máy chủ DHCP gán."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ DNS",
                           content: "Nếu Nhà cung cấp dịch vụ Internet (ISP) của bạn cung cấp một hoặc hai địa chỉ DNS, chọn hộp chọn này nhập địa chỉ DNS thứ nhất và DNS thứ hai vào ô tương ứng; nếu không, địa chỉ DNS sẽ được Nhà cung cấp dịch vụ Internet (ISP) gán tự động"
                       } ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tải lớn nhất-Maximum Transmission Unit) mặc định và phổ biến cho hầu hết mạng Ethernet là 1500 Byte. Chúng tôi không khuyến nghị thay đổi giá trị MTU trừ khi Nhà cung cấp dịch vụ Internet của bạn yêu cầu"
                       } ,{                      
                           type: "name",
                           title: "Tên máy chủ",
                           content: "Nhập giá trị vào ô để xác định tên máy chủ của Router"
                       } ,{                      
                           type: "name",
                           title: "Lấy IP bằng DHCP Unicast",
                           content: "Chọn hộp chọn này nếu máy chủ DHCP của ISP không hỗ trợ quảng bá ứng dụng và bạn không thể lấy địa chỉ IP động."
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: IP Tĩnh"
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn dạng kết nối này nếu Nhà cung cấp dịch vụ Internet (ISP) của bạn cung cấp cho bạn một địa chỉ IP, Subnet Mask, Gateway và thông số DNS xác định (cố định)"
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IP/Subnet Mask/Gateway mặc định/DNS thứ nhất/DNS thứ hai",
                           content: "Nhập thông tin được cung cấp bởi ISP."
                       } ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tải lớn nhất-Maximum Transmission Unit) mặc định và phổ biến cho hầu hết mạng Ethernet là 1500 Byte. Chúng tôi không khuyến nghị thay đổi giá trị MTU trừ khi Nhà cung cấp dịch vụ Internet của bạn yêu cầu"
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: Cáp BigPond"
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn dạng này nếu ISP cung cấp kết nối Cáp BigPond."
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập tên đăng nhập và mật mã do ISP cung cấp. Các mục này phân biệt chữ hoa và chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Máy chủ xác thực",
                           content: "Nhập địa chỉ IP hoặc tên máy chủ xác thực"
                       } ,{                      
                           type: "name",
                           title: "Tên miền xác thực",
                           content: "Nhập hậu tố tên miền máy chủ (dựa trên khu vực). Ví dụ, nsw.bigpond.net.au cho NSW/ACT, vic.bigpond.net.au cho VIC/TAS/WA/SA/NT, hoặc qld.bigpond.net.au cho QLD."
                       } ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tải lớn nhất-Maximum Transmission Unit) mặc định và phổ biến cho hầu hết mạng Ethernet là 1500 Byte. Chúng tôi không khuyến nghị thay đổi giá trị MTU trừ khi Nhà cung cấp dịch vụ Internet của bạn yêu cầu"
                       } ,{                      
                           type: "name",
                           title: "Dạng kết nối",
                           content: "Chọn một chế độ kết nối thích hợp để xác định cách kết nối Internet",
       children: [{                      
                           type: "name",
                           title: "tự động",
                           content: "Ở chế độ này, kết nối Internet tự động kết nối lại mỗi khi bị mất kết nối"
                       } ,{                      
                           type: "name",
                           title: "Theo yêu cầu",
                           content: "Ở chế độ này, kết nối Internet sẽ bị ngắt tự động sau một khoảng thời gian không hoạt động (Thời gian nghỉ tối đa) xác định. Kết nối sẽ tự thiết lập lại khi bạn truy cập lại Internet"
                       } ,{                      
                           type: "name",
                           title: "Thủ công",
                           content: "Ở chế độ này, kết nối Internet được kiểm soát theo cách thủ công bằng việc nhấn nút Kết nối hoặc Ngắt kết nối. Chế độ này cũng hỗ trợ chức năng Thời gian nghỉ tối đa. Nhập giá trị tối đa (tính bằng phút) kết nối Internet có thể ngưng hoạt động trước khi chuyển vào Thời gian nghỉ tối đa. Giá trị mặc định là 15 phút. Nếu bạn muốn kết nối Internet của bạn luôn ở trạng thái được kích hoạt, nhập giá trị 0 vào phần Thời gian nghỉ tối đa"
                       }]
} ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn dạng kết nối này nếu bạn sử dụng dịch vụ DSL (Digital Subscriber Line) và Nhà cung cấp dịch vụ Internet của bạn cung cấp cho bạn Tên đăng nhập và mật mã"
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập tên đăng nhập và mật mã do ISP cung cấp. Các mục này phân biệt chữ hoa và chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IP/DNS thứ nhất/DNS thứ hai",
                           content: "Các thông số này được gán tự động từ máy chủ DHCP của ISP."
                       } ,{                      
                           type: "name",
                           title: "Kết nối thứ hai (Không, IP Động, IP Tĩnh)",
       children: [{                      
                           type: "name",
                           title: "Không",
                           content: "Chọn nếu bạn không sử dụng kết nối thứ hai"
                       } ,{                      
                           type: "name",
                           title: "IP Động",
                           content: "Chọn nếu địa chỉ IP và Subnet Mask được gán tự động từ Nhà cung cấp dịch vụ Internet của bạn",
       children: [{                      
                           type: "name",
                           title: "Làm mới",
                           content: "Bấm chọn để làm mới thông số IP từ ISP."
                       } ,{                      
                           type: "name",
                           title: "Giải phóng",
                           content: "Bấm chọn để giải phóng và gán thông số IP."
                       }]
} ,{                      
                           type: "name",
                           title: "IP Tĩnh",
                           content: "Chọn nếu địa chỉ IP và subnet mask được cung cấp bởi ISP, và nhập thông tin vào trường tương ứng."
                       }]
} ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tải lớn nhất-Maximum Transmission Unit) phổ biến cho mạng Ethernet là 1480 Byte.",
       children: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Trong một số ít trường hợp, ISP có thể sẽ yêu cầu bạn chỉnh sửa kích thước MTU để có hiệu suất mạng tốt hơn. Bạn không nên thay đổi giá trị này trừ khi thực sự cần thiết."
                       }]
} ,{                      
                           type: "name",
                           title: "Tên dịch vụ/Tên trung tâm truy cập",
                           content: "Mặc định, Tên dịch vụ và Tên trung tâm truy cập (AC) sẽ được để trống. Bạn không cần cấu hình trường này trừ khi ISP yêu cầu."
                       } ,{                      
                           type: "name",
                           title: "Phát hiện khoảng thời gian trực tuyến",
                           content: "Nhập một khoảng thời gian từ 0 đến 120 (tính theo giây) để router phát hiện truy cập tập trung trực tuyến. Giá trị mặc định là 10"
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IP",
                           content: "Nếu ISP cung cấp một địa chỉ IP tĩnh (cố định), chọn Sử dụng địa chỉ IP sau và nhập địa chỉ IP vào ô. Ngược lại, chọn Lấy địa chỉ động từ ISP để lấy địa chỉ IP được gán tự động từ máy chủ."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ DNS",
                           content: "Nếu ISP cung cấp địa chỉ IP DNS tĩnh (cố định), chọn Sử dụng địa chỉ DNS sau và nhập địa chỉ vào trường DNS thứ nhất và DNS thứ hai tương ứng. Ngược lại, chọn Lấy địa chỉ IP động từ ISP để lấy địa chỉ IP DNS được gán từ máy chủ tự động."
                       } ,{                      
                           type: "name",
                           title: "Dạng kết nối",
                           content: "Chọn một chế độ kết nối thích hợp để xác định cách kết nối Internet",
       children: [{                      
                           type: "name",
                           title: "tự động",
                           content: "Ở chế độ này, kết nối Internet tự động kết nối lại mỗi khi bị mất kết nối"
                       } ,{                      
                           type: "name",
                           title: "Theo yêu cầu",
                           content: "Ở chế độ này, kết nối Internet sẽ bị ngắt tự động sau một khoảng thời gian không hoạt động (Thời gian nghỉ tối đa) xác định. Kết nối sẽ tự thiết lập lại khi bạn truy cập lại Internet"
                       } ,{                      
                           type: "name",
                           title: "Theo thời gian",
                           content: "Ở chế độ này, kết nối Internet sẽ chỉ được thiết lập trong một khung thời gian xác định. Nếu chọn lựa chọn này, vui lòng nhập thời gian bắt đầu và thời gian kết thúc; cả hai theo định dạng HH:MM"
                       } ,{                      
                           type: "name",
                           title: "Thủ công",
                           content: "Ở chế độ này, kết nối Internet được kiểm soát theo cách thủ công bằng việc nhấn nút Kết nối hoặc Ngắt kết nối. Chế độ này cũng hỗ trợ chức năng Thời gian nghỉ tối đa. Nhập giá trị tối đa (tính bằng phút) kết nối Internet có thể ngưng hoạt động trước khi chuyển vào Thời gian nghỉ tối đa. Giá trị mặc định là 15 phút. Nếu bạn muốn kết nối Internet của bạn luôn ở trạng thái được kích hoạt, nhập giá trị 0 vào phần Thời gian nghỉ tối đa"
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Chỉ khi bạn đã thiết lập thời gian cho hệ thống ở trang Công cụ hệ thống -> Cài đặt thời gian, chức năng Kết nối theo thời gian mới có hiệu lực."
                       }]
} ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: L2TP/PP2P"
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn dạng kết nối này nếu bạn kết nối đến máy chủ VPN L2TP/PPTP và được cung cấp tên đăng nhập, mật mã và địa chỉ IP/Tên miền của máy chủ từ ISP"
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập tên đăng nhập và mật mã do ISP cung cấp. Các mục này phân biệt chữ hoa và chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IP/DNS thứ nhất/DNS thứ hai",
                           content: "Các thông số này sẽ được gán tự động từ máy chủ DHCP của ISP."
                       } ,{                      
                           type: "name",
                           title: "Kết nối thứ hai (IP Động hoặc IP Tĩnh)",
       children: [{                      
                           type: "name",
                           title: "IP Động",
                           content: "Chọn nếu địa chỉ IP và Subnet Mask được gán tự động từ Nhà cung cấp dịch vụ Internet của bạn"
                       } ,{                      
                           type: "name",
                           title: "IP Tĩnh",
                           content: "Chọn nếu địa chỉ IP, subnet mask, gateway, và địa chỉ DNS được ISP cung cấp, và nhập các thông tin này vào trường tương ứng."
                       }]
} ,{                      
                           type: "name",
                           title: "IP/Tên miền máy chủ VPN",
                           content: "Chọn nếu địa chỉ IP, subnet mask, gateway, và địa chỉ DNS được ISP cung cấp, và nhập các thông tin này vào trường tương ứng."
                       } ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tối đa) mặc định và thông thường cho hầu hết mạng Ethernet là 1460 Bytes cho L2TP và 1420 Bytes cho PPTP. Chúng tôi không khuyến nghị thay đổi kích thước MTU trừ phi nhà cung cấp dịch vụ Internet yêu cầu"
                       } ,{                      
                           type: "name",
                           title: "Dạng kết nối",
                           content: "Chọn một chế độ kết nối thích hợp để xác định cách kết nối Internet",
       children: [{                      
                           type: "name",
                           title: "tự động",
                           content: "Ở chế độ này, kết nối Internet tự động kết nối lại mỗi khi bị mất kết nối"
                       } ,{                      
                           type: "name",
                           title: "Theo yêu cầu",
                           content: "Ở chế độ này, kết nối Internet sẽ bị ngắt tự động sau một khoảng thời gian không hoạt động (Thời gian nghỉ tối đa) xác định. Kết nối sẽ tự thiết lập lại khi bạn truy cập lại Internet"
                       } ,{                      
                           type: "name",
                           title: "Thủ công",
                           content: "Ở chế độ này, kết nối Internet được kiểm soát theo cách thủ công bằng việc nhấn nút Kết nối hoặc Ngắt kết nối. Chế độ này cũng hỗ trợ chức năng Thời gian nghỉ tối đa. Nhập giá trị tối đa (tính bằng phút) kết nối Internet có thể ngưng hoạt động trước khi chuyển vào Thời gian nghỉ tối đa. Giá trị mặc định là 15 phút. Nếu bạn muốn kết nối Internet của bạn luôn ở trạng thái được kích hoạt, nhập giá trị 0 vào phần Thời gian nghỉ tối đa"
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Sao chép MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn phương pháp sao chép địa chỉ MAC thích hợp bạn cần."
                       } ,{                      
                           type: "name",
                           title: "Không sao chép địa chỉ MAC",
                           content: "KHÔNG thay đổi địa chỉ MAC mặc định của Router, trong trường hợp các ISP không ràng buộc các địa chỉ IP được gán cho địa chỉ MAC"
                       } ,{                      
                           type: "name",
                           title: "Sao chép địa chỉ MAC máy tính hiện hành",
                           content: "Chọn để sao chép MAC máy tính hiện tại đang kết nối đến Router, trong trường hợp ISP kết hợp địa chỉ IP và địa chỉ MAC"
                       } ,{                      
                           type: "name",
                           title: "Sử dụng địa chỉ MAC tùy chỉnh",
                           content: "Nhập MAC thủ công, trong trường hợp ISP kết hợp địa chỉ IP và địa chỉ MAC xác định"
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN tổng hợp",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "Cộng gộp WAN chuyển cổng LAN1 thành một cổng WAN mở rộng, tạo một đường dẫn dữ liệu đơn băng thông cao. Cho đường truyền Internet nhanh hơn từ các ISP hỗ trợ đường truyền cao hơn 1Gbps, bức giá giới hạn về phần cứng."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Lưu ý",
                           content: "Trước khi kích hoạt tính năng này, vui lòng đảm bảo ISP của bạn hỗ trợ Cộng gộp WAN và modem của bạn có hai cổng WAN."
                       } ,{                      
                           type: "step",
                           title: "Áp dụng cộng gộp cổng WAN",
       content: [ 
                "1.Chuyển sang mở Cộng gộp WAN để kích hoạt tính năng.",
                "2. Bấm chọn Lưu.",
                "3. Kết nối cổng WAN và cổng LAN1 của router đến hai cổng WAN của modem bằng hai cáp Ethernet."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị địa chỉ MAC, địa chỉ IP và subnet mask của router."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ MAC",
                           content: "Địa chỉ vật lý duy nhất được gán cho cổng Ethernet (LAN) của Router"
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IP",
                           content: "Hiển thị địa chỉ IP mặc định của router được sử dụng để đăng nhập vào trang web quản lý của router. Bạn có thể thay đổi địa chỉ IP này thành một địa chỉ khác."
                       } ,{                      
                           type: "name",
                           title: "Subnet Mask",
                           content: "Chọn một định danh được gán sử dụng bởi cổng LAN để định tuyến lưu lượng Trong và Ngoài hoặc nhập một subnet mask mới."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu địa chỉ IP mới mà bạn đặt không cùng lớp mạng với địa chỉ trước đó, vùng địa chỉ IP trong máy chủ DHCP sẽ bị cấu hình tự động, nhưng mạng ảo và máy chủ DNZ sẽ không bị ảnh hưởng cho đến khi chúng được cấu hình lại"
                       }]
},
       LINK_AGG :{ 
               TITLE:"Gộp băng thông",
               CONTENT: [{
                           type: "paragraph",
                           id: "link_agg_step_help",
                           content: "Link Aggregation kết hợp hai cổng với nhau để tạo ra một đường dẫn dữ liệu băng thông lớn, giúp duy trì một hệ thống mạng dây tốc độ cao hơn và ổn định hơn."
                       } ,{                      
                           type: "step",
                           title: "Để áp dụng tính năng link aggregation",
       content: [ 
                "1. Chuyển sang mở để kích hoạt tính năng Link Aggregation.",
                "2. Xác định hai cổng cho link aggregation.",
                "3. Bấm chọn Lưu."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) là một hệ thống truyền tải trong đó dịch vụ truyền hình được truyền tải bằng cách sử dụng giao thức internet qua mạng chuyển mạch gói như mạng LAN hoặc Internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "Tính năng IGMP (Giao thức quản lý nhóm Internet) Snooping cho phép router chỉ chuyển tiếp lưu lượng multicast đến cổng yêu cầu."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Chọn để kích hoạt tính năng IGMP Proxy nếu dịch vụ IPTV do ISP cung cấp dựa trên công nghệ IGMP."
                       } ,{                      
                           type: "name",
                           title: "Phiên bản IGMP",
                           content: "Chọn phiên bản IGMP theo ISP của bạn. Phiên bản IGMP mặc định là V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Chuyển tiếp Multicast không dây",
                           content: "Chọn để kích hoạt tính năng Chuyển tiếp Multicast Không dây cho phép gói tin multicast chuyển tiếp đến mạng không dây."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Chọn để kích hoạt tính năng IPTV nếu ISP cung cấp dịch vụ IPTV không dựa trên công nghệ IGMP."
                       } ,{                      
                           type: "name",
                           title: "Cấu hình ISP",
                           content: "Chọn cấu hình ISP phù hợp (ISP: nhà cung cấp dịch vụ internet) để hoàn tất việc cấu hình. Có ba loại cấu hình:",
       children: [{                      
                           type: "name",
                           title: "Quốc gia - Tên ISP",
                           content: "Cấu hình ISP với cài đặt mặc định có định dạng \"Quốc gia - Tên ISP\". Chỉ cần tìm và chọn ISP của bạn từ danh sách thả xuống."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Cầu nối",
                           content: "Nếu ISP của bạn không có trong danh sách và việc cài đặt IPTV không yêu cầu thông số nào, bạn có thể chọn cấu hình này và xác định cổng LAN được gán cho IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Xác định loại dữ liệu mà cổng LAN sẽ truyền. Ví dụ: nếu IPTV được chọn cho LAN1, LAN1 sẽ chỉ truyền dữ liệu IPTV và bạn cần kết nối set-top-box với LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Cầu nối",
                           content: "Nếu ISP của bạn không có trong danh sách và việc cài đặt IPTV không yêu cầu thông số nào, bạn có thể chọn cấu hình này và xác định cổng LAN được gán cho IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Xác định dạng dữ liệu cổng LAN sẽ truyền tải. Ví dụ, nếu IPTV được chọn cho cổng LAN2, cổng LAN2 sẽ chỉ truyền tải dữ liệu IPTV và bạn cần kết nối set-top-box đến cổng LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Cầu nối",
                           content: "Nếu ISP của bạn không có trong danh sách và việc cài đặt IPTV không yêu cầu thông số nào, bạn có thể chọn cấu hình này và xác định cổng LAN được gán cho IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Xác định dạng dữ liệu cổng LAN sẽ truyền tải. Ví dụ, nếu IPTV được chọn cho cổng LAN5, cổng LAN5 sẽ chỉ truyền tải dữ liệu IPTV và bạn cần kết nối set-top-box đến cổng LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Tùy chỉnh",
                           content: "Nếu ISP của bạn không có trong danh sách nhưng ISP có cung cấp cho bạn các thông số cần thiết, như ID và Priority VLAN Internet/VoIP/IPTV, vui lòng chọn cấu hình này.",
       children: [{                      
                           type: "name",
                           title: "ID/Độ ưu tiên VLAN Internet/VoIP/IPTV",
                           content: "Cấu hình ID và độ ưu tiên VLAN do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Chọn định khóa các gói Internet với 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID/Priority VLAN Multicast IPTV",
                           content: "Bạn có thể kích hoạt tính năng multicast IPTV nếu muốn, và cấu hình ID và Độ ưu tiên theo ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Xác định loại dữ liệu mà cổng LAN sẽ truyền. Ví dụ: nếu IPTV được chọn cho LAN1, LAN1 sẽ chỉ truyền dữ liệu IPTV và bạn cần kết nối set-top-box với LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Tùy chỉnh",
                           content: "Nếu ISP của bạn không có trong danh sách nhưng ISP có cung cấp cho bạn các thông số cần thiết, như ID và Priority VLAN Internet/VoIP/IPTV, vui lòng chọn cấu hình này.",
       children: [{                      
                           type: "name",
                           title: "ID/Độ ưu tiên VLAN Internet/VoIP/IPTV",
                           content: "Cấu hình ID và độ ưu tiên VLAN do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Chọn định khóa các gói Internet với 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID/Priority VLAN Multicast IPTV",
                           content: "Bạn có thể kích hoạt tính năng multicast IPTV nếu muốn, và cấu hình ID và Độ ưu tiên theo ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Xác định dạng dữ liệu cổng LAN sẽ truyền tải. Ví dụ, nếu IPTV được chọn cho cổng LAN2, cổng LAN2 sẽ chỉ truyền tải dữ liệu IPTV và bạn cần kết nối set-top-box đến cổng LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Tùy chỉnh",
                           content: "Nếu ISP của bạn không có trong danh sách nhưng ISP có cung cấp cho bạn các thông số cần thiết, như ID và Priority VLAN Internet/VoIP/IPTV, vui lòng chọn cấu hình này.",
       children: [{                      
                           type: "name",
                           title: "ID/Độ ưu tiên VLAN Internet/VoIP/IPTV",
                           content: "Cấu hình ID và độ ưu tiên VLAN do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Chọn định khóa các gói Internet với 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID/Priority VLAN Multicast IPTV",
                           content: "Bạn có thể kích hoạt tính năng multicast IPTV nếu muốn, và cấu hình ID và Độ ưu tiên theo ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Xác định dạng dữ liệu cổng LAN sẽ truyền tải. Ví dụ, nếu IPTV được chọn cho cổng LAN5, cổng LAN5 sẽ chỉ truyền tải dữ liệu IPTV và bạn cần kết nối set-top-box đến cổng LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Máy chủ DHCP",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Kích hoạt hoặc Vô hiệu hóa server.",
                "Nếu bạn vô hiệu hóa Server, bạn phải có một máy chủ DHCP khác trong mạng của bạn nếu không bạn sẽ phải cấu hình địa chỉ IP của máy tính một cách thủ công"]
} ,{                      
                           type: "name",
                           title: "Dãy địa chỉ IP",
                           content: "Nhập khoảng địa chỉ IP có thể được thuê bởi máy khách"
                       } ,{                      
                           type: "name",
                           title: "Thời gian thuê địa chỉ",
                           content: "Nhập khoảng thời gian (từ 1 đến 2880 phút) một địa chỉ IP được thuê bởi máy khách. Giá trị mặc định là 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Dành riêng địa chỉ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị các thông số tương ứng của thiết bị có IP dành riêng."
                       } ,{                      
                           type: "step",
                           title: "Để đặt một địa chỉ IP",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Bấm Quét để chọn thiết bị kết nối hiện tại từ Danh sách máy khách DHCP; hoặc nhập địa chỉ MAC của máy khách mong muốn vào trường Địa chỉ MAC và địa chỉ IP mà bạn muốn dành riêng cho máy khách trong trường Địa chỉ IP.",
                "3. Nhập một mô tả cho máy khách trong trường Mô tả.",
                "4. Chọn Kích hoạt.",
                "5.Bấm Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Danh sách máy khách DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin của thiết bị kết nối hiện tại."
                       }]
},
       DDNS :{ 
               TITLE:"DNS động",
               CONTENT: [{
                           type: "paragraph",
                           content: "DNS Động ( Hệ thống tên miền động) cho phép bạn gán một máy chủ hoặc tên miền cố định đến một địa chỉ IP Internet động. Tính năng này rất hữu ích khi bạn lưu trữ trang web, máy chủ FTP, hoặc dịch vụ khác của mình phía sau router.Để bắt đầu, bạn cần phải đăng nhập với nhà cung cấp dịch vụ DNS Động như www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Để thiết lập một Dynamic DNS",
       content: [ 
                "1. Chọn nhà cung cấp dịch vụ DNS động.",
                "2. Nhập Tên đăng nhập và Mật mã tài khoản DNS Động.",
                "3. Nhập tên miền mà bạn nhận được từ các nhà cung cấp dịch vụ DDNS.",
                "4.Chọn Khoảng thời gian cập nhật từ danh sách thả xuống.",
                "5. Nếu nhà cung cấp dịch vụ của bạn là NO-IP, Kết hợp IP WAN có thể đảm bảo tên miền được kết hợp với cổng WAN của router này.",
                "6. Bấm chọn Đăng nhập và Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn sử dụng một tài khoản DDNS mới, vui lòng đăng xuất trước, và sau đó đăng nhập tài khoản mới."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"DNS động",
               CONTENT: [{
                           type: "paragraph",
                           content: "DNS Động ( Hệ thống tên miền động) cho phép bạn gán một máy chủ hoặc tên miền cố định đến một địa chỉ IP Internet động. Tính năng này rất hữu ích khi bạn lưu trữ trang web, máy chủ FTP, hoặc dịch vụ khác của mình phía sau router.Để bắt đầu, bạn cần phải đăng nhập với nhà cung cấp dịch vụ DNS Động như www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Danh sách tên miền",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng này hiển thị thông tin của tất cả tên miền được đăng ký với tài khoản cloud của bạn."
                       } ,{                      
                           type: "step",
                           title: "Để đăng ký thêm một tên miền mới",
       content: [ 
                "1. Bấm chọn Đăng ký.",
                "2. Nhập tên miền bạn muốn đăng ký.",
                "3. Bấm chọn Lưu."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Định tuyến tĩnh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Định tuyến tĩnh được sử dụng để xác định trước một đường cố định cho các gói thông tin mạng để đạt được một máy chủ hoặc mạng cụ thể."
                       } ,{                      
                           type: "step",
                           title: "Để thiết lập một tuyến tĩnh",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Nhập địa chỉ IP vào trường Mạng đích đến để gán định tuyến tĩnh cho mục này.",
                "3. Nhập subnet mask vào trường Subnet Mask để xác định phần mạng và phần máy chủ của một địa chỉ IP.",
                "4. Nhập địa chỉ IP gateway vào trường Gateway mặc định để kết nối router đến mạng hoặc máy chủ.",
                "5.Chọn LAN hoặc WAN tại trường Giao diện để xác định dạng Mạng đích đến.",
                "6. Nhập một mô tả ngắn gọn cho mục này.",
                "7. Chọn Kích hoạt",
                "8. Bấm Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Bảng định tuyến hệ thống",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị tất cả mục định tuyến hợp lệ đang được sử dụng."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Cài đặt không dây",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cấu hình cài đặt không dây bạn cần."
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "OFDMA cho phép nhiều người dùng truyền tải dữ liệu cùng lúc, do đó cải thiện đáng kể tốc độ và hiệu suất. Vui lòng lưu ý là chỉ khi thiết bị kết nối của bạn cũng hỗ trợ OFDMA, bạn mới có thể hoàn toàn tận hưởng những lợi ích của OFDMA."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Kết Nối Thông Minh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn hộp chọn này để kích hoạt kết nối thông minh. Chức năng này giúp thiết bị chạy nhanh hơn bằng cách gán chúng cho băng tần không dây tốt nhất dựa theo điều kiện thực tế để cân bằng các nhu cầu về mạng."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Không dây2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Tên mạng không dây (SSID)",
                           content: "Chúng tôi khuyến nghị bạn thay đổi tên mạng (SSID). Trường này phân biệt chữ hoa chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Giấu SSID",
                           content: "Chọn nếu bạn muốn giấu tên mạng (SSID) 2.4GHz khỏi danh sách mạng không dây. Khi chọn, SSID sẽ không được quảng bá và bạn cần phải kết nối đến mạng theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Bảo mật",
                           content: "Chọn một trong các tùy chọn bảo mật sau đây:",
       children: [{                      
                           type: "name",
                           title: "Không Bảo mật",
                           content: "Chọn tùy chọn này để vô hiệu hóa bảo mật không dây. Việc này không được khuyến nghị."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Cá nhân",
                           content: "Chọn tùy chọn này để kích hoạt bảo mật không dây. Chúng tôi đặc biệt khuyến nghị việc kích hoạt để bảo vệ mạng không dây khỏi các truy cập trái phép. Nếu chọn, vui lòng cấu hình các mục sau.",
       children: [{                      
                           type: "name",
                           title: "Phiên bản",
                           content: "Chọn một phiên bản bảo mật.Chọn một phiên bản bảo mật. WPA-PSK bảo mật cao hơn. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mã hóa",
                           content: "Chọn một dạng mã hóa bảo mật. AES bảo mật hơn. Chúng tôi KHÔNG khuyến nghị sử dụng mã hóa TKIP nếu router đang hoạt động ở chế độ 802.11n. Bên cạnh đó, sử dụng TKIP sẽ vô hiệu hóa tính năng WPS. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mật mã",
                           content: "Nhập một mật khẩu không dây từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký tự thập lục phân vào lĩnh vực này."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Doanh nghiệp",
                           content: "Chọn tùy chọn này để cho phép các phương pháp xác thực cao cấp hơn sử dụng một máy chủ RADIUS (Từ xa Xác thực Quay Trong sử dụng dịch vụ) . Nếu được lựa chọn, chức năng WPS sẽ bị vô hiệu.",
       children: [{                      
                           type: "name",
                           title: "Phiên bản",
                           content: "Chọn một phiên bản bảo mật. WPA2 bảo mật cao hơn. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mã hóa",
                           content: "Chọn một dạng mã hóa bảo mật. AES bảo mật hơn. Chúng tôi KHÔNG khuyến nghị sử dụng mã hóa TKIP nếu router đang hoạt động ở chế độ 802.11n. Bên cạnh đó, sử dụng TKIP sẽ vô hiệu hóa tính năng WPS. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "RADIUS IP máy chủ",
                           content: "Nhập địa chỉ IP của máy chủ RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Cảng RADIUS",
                           content: "Nhập số cổng của máy chủ RADIUS"
                       } ,{                      
                           type: "name",
                           title: "RADIUS Mật mã",
                           content: "Nhập mật khẩu chia sẻ của máy chủ RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Chọn tùy chọn này để kích hoạt phương pháp xác thực cơ bản, bất kỳ máy khách cũng chỉ có thể truy cập Wi-Fi bằng cách sử dụng mã WEP (Wired Equivalent Privacy). Nếu được chọn, tính năng WPS sẽ bị vô hiệu hóa.",
       children: [{                      
                           type: "name",
                           title: "Dạng",
                           content: "Chọn một dạng xác thực cho mạng không dây. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Định dạng mã WEP",
                           content: "định dạng ASCII Hoặc sử dụng hoặc chọn Thập lục phân. Định dạng ASCII là một sự kết hợp của các ký tự chữ và số. Định dạng hệ thập lục phân là một sự kết hợp của các số (0-9) và chữ cái (AF, af)."
                       } ,{                      
                           type: "name",
                           title: "Loại khóa",
                           content: "Chọn độ dài của khoá WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Cho phép bạn nhập vào 10 chữ số thập lục phân (0-9, AF, af) hoặc 5 ký tự ASCII vào trường giá trị WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Cho phép bạn nhập vào 26 chữ số thập lục phân (0-9, AF, af) hoặc 13 ký tự ASCII vào trường giá trị WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Giá trị mã",
                           content: "Nhập mã WEP vào khung tương ứng"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kênh",
                           content: "Chọn kênh hoạt động cho mạng không dây tần số 2.4GHz. Chúng tôi khuyến nghị để mục chọn kênh là Tự động, nếu bạn không gặp vấn đề về kết nối không dây"
                       } ,{                      
                           type: "name",
                           title: "Công suất truyền tải",
                           content: "Chọn một trong cao, Trung, hoặc thấp để xác định dữ liệu truyền tải điện năng. Mặc định và thiết lập được đề nghị là cao."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Tính năng Airtime Fairness",
                           content: "Chọn hộp chọn này để kích hoạt tính năng Airtime Fairness (AFT), cho phép bạn tối ưu hóa thông lượng từng luồng dữ liệu. Lịch trình ATF sử dụng đích đến airtime để cân bằng việc sử dụng tại mỗi trạm."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Tính năng Multi-User MIMO",
                           content: "Bấm kích hoạt để sử dụng Tính năng Multi-User MIMO."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"không dây 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Tên mạng không dây (SSID)",
                           content: "Chúng tôi khuyến nghị bạn thay đổi tên mạng (SSID). Trường này phân biệt chữ hoa chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Giấu SSID",
                           content: "Chọn nếu bạn muốn giấu tên mạng (SSID) 5GHz khỏi danh sách mạng không dây. Khi chọn, SSID này sẽ không được quảng bá và bạn sẽ cần truy cập mạng theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Bảo mật",
                           content: "Chọn một trong các tùy chọn bảo mật sau đây:",
       children: [{                      
                           type: "name",
                           title: "Không Bảo mật",
                           content: "Chọn tùy chọn này để vô hiệu hóa bảo mật không dây. Việc này không được khuyến nghị."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Cá nhân",
                           content: "Chọn tùy chọn này để kích hoạt bảo mật không dây. Chúng tôi rất khuyến nghị bạn kích hoạt để bảo vê mạng không dây khỏi các truy cập trái phép. Nếu chọn, vui lòng cấu hình các mục sau.",
       children: [{                      
                           type: "name",
                           title: "Phiên bản",
                           content: "Chọn một phiên bản bảo mật. WPA2-PSK bảo mật hơn. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mã hóa",
                           content: "Chọn một dạng mã hóa bảo mật. AES bảo mật hơn. Chúng tôi KHÔNG khuyến nghị sử dụng mã hóa TKIP nếu router đang hoạt động ở chế độ 802.11n. Bên cạnh đó, sử dụng TKIP sẽ vô hiệu hóa tính năng WPS. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mật mã",
                           content: "Nhập một mật khẩu không dây từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký tự thập lục phân vào lĩnh vực này."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Doanh nghiệp",
                           content: "Chọn tùy chọn này để cho phép các phương pháp xác thực cao cấp hơn sử dụng một máy chủ RADIUS (Từ xa Xác thực Quay Trong sử dụng dịch vụ) . Nếu được lựa chọn, chức năng WPS sẽ bị vô hiệu.",
       children: [{                      
                           type: "name",
                           title: "Phiên bản",
                           content: "Chọn một phiên bản bảo mật. WPA2 bảo mật cao hơn. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mã hóa",
                           content: "Chọn một dạng mã hóa bảo mật. AES bảo mật hơn. Chúng tôi KHÔNG khuyến nghị sử dụng mã hóa TKIP nếu router đang hoạt động ở chế độ 802.11n. Bên cạnh đó, sử dụng TKIP sẽ vô hiệu hóa tính năng WPS. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "RADIUS IP máy chủ",
                           content: "Nhập địa chỉ IP của máy chủ RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Cảng RADIUS",
                           content: "Nhập số cổng của máy chủ RADIUS"
                       } ,{                      
                           type: "name",
                           title: "RADIUS Mật mã",
                           content: "Nhập mật khẩu chia sẻ của máy chủ RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Chọn tùy chọn này để kích hoạt phương pháp xác thực cơ bản, bất kỳ máy khách cũng chỉ có thể truy cập Wi-Fi bằng cách sử dụng mã WEP (Wired Equivalent Privacy). Nếu được chọn, tính năng WPS sẽ bị vô hiệu hóa.",
       children: [{                      
                           type: "name",
                           title: "Dạng",
                           content: "Chọn một dạng xác thực cho mạng không dây. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Định dạng mã WEP",
                           content: "định dạng ASCII Hoặc sử dụng hoặc chọn Thập lục phân. Định dạng ASCII là một sự kết hợp của các ký tự chữ và số. Định dạng hệ thập lục phân là một sự kết hợp của các số (0-9) và chữ cái (AF, af)."
                       } ,{                      
                           type: "name",
                           title: "Loại khóa",
                           content: "Chọn độ dài của khoá WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Cho phép bạn nhập vào 10 chữ số thập lục phân (0-9, AF, af) hoặc 5 ký tự ASCII vào trường giá trị WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Cho phép bạn nhập vào 26 chữ số thập lục phân (0-9, AF, af) hoặc 13 ký tự ASCII vào trường giá trị WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Giá trị mã",
                           content: "Nhập mã WEP vào khung tương ứng"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kênh",
                           content: "Chọn kênh hoạt động cho mạng không dây tần số 5GHz. Chúng tôi khuyến nghị để mục chọn kênh là Tự động, nếu bạn không gặp vấn đề về kết nối không dây"
                       } ,{                      
                           type: "name",
                           title: "Công suất truyền tải",
                           content: "Chọn một trong cao, Trung, hoặc thấp để xác định dữ liệu truyền tải điện năng. Mặc định và thiết lập được đề nghị là cao."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Tính năng Airtime Fairness",
                           content: "Chọn hộp chọn này để kích hoạt tính năng Airtime Fairness (AFT), cho phép bạn tối ưu hóa thông lượng từng luồng dữ liệu. Lịch trình ATF sử dụng đích đến airtime để cân bằng việc sử dụng tại mỗi trạm."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Tính năng Multi-User MIMO",
                           content: "Bấm kích hoạt để sử dụng Tính năng Multi-User MIMO."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) cung cấp cho bạn một phương thức cài đặt bảo mật mạng Wi-Fi dễ thực hiện hơn."
                       } ,{                      
                           type: "name",
                           title: "Nút nhấn (Khuyến nghị)",
       content: [ 
                "Phương pháp này cho phép bạn dễ dàng kết nối thiết bị WPS tới mạng không dây .",
                "Nhấp vào nút Start WPS (Bắt đầy WPS) trên màn hình. Trong vòng 2 phút, bấm vào nút WPS trên thiết bị khách."]
} ,{                      
                           type: "name",
                           title: "Mã PIN của Router",
       content: [ 
                "Mã PIN mặc định được in trên nhãn của Router",
                "Bấm chọn Generate (Tạo) để lấy mã PIN mới hoặc nhấp vào Default (Mặc định) để khôi phục mã PIN hiện tại trở về mã PIN mặc định."]
} ,{                      
                           type: "name",
                           title: "Nhập mã PIN máy khách",
       content: [ 
                "Phương pháp này cho phép bạn thêm vào một thiết bị không dây theo cách thủ công.",
                "Nhập mã PIN của thiết bị vào ô và sau đó bấm chọn Conncet(Kết nối)."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Máy khách không dây trực tuyến",
               CONTENT: [{
                           type: "name",
                           title: "Số lượng máy khách",
                           content: "Hiển thị số máy khách không dây liên kết"
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ MAC",
                           content: "Hiển thị địa chỉ MAC của các máy khách không dây đi kèm."
                       } ,{                      
                           type: "name",
                           title: "Dạng kết nối",
                           content: "Hiển thị các băng tần không dây (2.4GHz hoặc 5GHz) của các máy khách không dây đi kèm."
                       } ,{                      
                           type: "name",
                           title: "Bảo mật",
                           content: "Hiển thị dạng bảo mật của máy khách không dây liên kết"
                       } ,{                      
                           type: "name",
                           title: "Gói tin đã nhận",
                           content: "Hiển thị số lượng gói tin nhận được bởi các máy khách không dây đi kèm."
                       } ,{                      
                           type: "name",
                           title: "Gói tin đã gửi",
                           content: "Hiển thị số lượng các gói tin gửi của khách hàng không dây đi kèm."
                       } ,{                      
                           type: "paragraph",
                           content: "Nhấn Làm mới để cập nhật thông tin trên trang này."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Lịch Không Dây",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với Thời gian biểu không dây, bạn có thể vô hiệu hóa tín hiệu mạng không dây trong một khoảng thời gian xác định. Ví dụ, bạn có thể tắt tín hiệu không dây từ 00:00 tới 07:00."
                       } ,{                      
                           type: "name",
                           title: "Thời gian tắt Wi-Fi",
                           content: "Hiển thị khoảng thời gian tín hiệu không dây được tắt.",
       children: [{                      
                           type: "step",
                           title: "To set up wireless off time",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Thiết lập khoảng thời gian mà bạn muốn tắt tín hiệu không dây.",
                "3. Chọn lặp lại ngày. Bạn có thể chọn \"Mỗi ngày \" hoặc chỉ định một số ngày .",
                "4. Nhấp vào Lưu."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Cài đặt",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng này cho phép bạn cung cấp truy cập Wi-Fi cho khách mà không cần công khai mạng chính."
                       } ,{                      
                           type: "name",
                           title: "Cho phép Khách truy cập lẫn nhau",
                           content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách giao tiếp với nhau qua các phương pháp như Samba, Ping, và FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Cho phép Khách truy cập mạng nội bộ của tôi",
                           content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách giao tiếp với các thiết bị kết nối đến cổng LAN của router hoặc mạng chính thông qua các phương pháp như Samba, Ping và FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Không dây 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Kích hoạt Mạng khách",
                           content: "Chọn hộp chọn này để kích hoạt chức năng Mạng khách"
                       } ,{                      
                           type: "name",
                           title: "Tên mạng không dây (SSID)",
                           content: "Bạn có thể sử dụng tên Mạng khách mặc định hoặc tạo tên mới (tối đa 32 ký tự)"
                       } ,{                      
                           type: "name",
                           title: "Giấu SSID",
                           content: "Chọn hộp chọn này nếu bạn muốn giấu Tên Mạng khách (SSID)"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Khoảng thời gian cập nhật mật mã",
                           content: "Chọn thời gian cập nhật mật mã Mạng khách."
                       } ,{                      
                           type: "name",
                           title: "Bảo mật",
                           content: "Khi bạn chọn không bao giờ cập nhật mật mã, vui lòng chọn một trong số các tùy chọn bảo mật sau:",
       children: [{                      
                           type: "name",
                           title: "Không Bảo mật",
                           content: "Chọn tùy chọn này để vô hiệu hóa bảo mật không dây. Việc này không được khuyến nghị."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Cá nhân",
                           content: "Chọn tùy chọn này để kích hoạt bảo mật không dây. Chúng tôi đặc biệt khuyến nghị kích hoạt để bảo vệ Mạng khách khỏi các truy cập trái phép. Nếu chọn, vui lòng cấu hình các mục sau.",
       children: [{                      
                           type: "name",
                           title: "Phiên bản",
                           content: "Chọn một phiên bản bảo mật. WPA2-PSK bảo mật hơn. Nếu bạn không chắc, vui lòng chọn Tự động."
                       } ,{                      
                           type: "name",
                           title: "Mã hóa",
                           content: "Chọn một dạng mã hóa bảo mật. AES bảo mật hơn. Chúng tôi KHÔNG khuyến nghị sử dụng mã hóa TKIP nếu router đang hoạt động ở chế độ 802.11n. Bên cạnh đó, sử dụng TKIP sẽ vô hiệu hóa tính năng WPS. Nếu bạn không chắc, vui lòng chọn Tự động."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Xác thực portal tăng cường bảo mật mạng của bạn bằng cách yêu cầu xác thực từ các máy khách cần truy cập tạm vào mạng không dây của bạn."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Để cài đặt xác thực portal:",
       content: [ 
                "1. Chọn Portal cho bảo mật.",
                "2. Chọn Mật mã đơn giản hoặc Không xác thực cho Xác thực",
                "A. Mật mã đơn giản - Xác định một mật mã cho việc xác thực (8-16 ký tự la tinh, số và _).",
                "B. Không xác thực - Máy khách có thể truy cập mạng mà không cần xác thực.",
                "3. Chọn 1 giờ, 2 giờ, 4 giờ, 8 giờ hoặc Luôn luôn để xác định thời gian xác thực. Khi một máy khách hết thời gian xác thực, nó sẽ phải đăng nhập lại để truy cập xác thực.",
                "4. (Tùy chọn) Kích hoạt Chuyển hướng và nhập địa chỉ URL chuyển hướng cần thiết. Sau đó một máy khách vừa mới xác thực sẽ được chuyển hướng đến URL mà bạn đã chọn.",
                "5. (Tùy chọn) Bạn có thể tùy chỉnh trang đăng nhập xác thực.",
                "A. Tiêu đề Portal - Lên đến 31 ký tự.",
                "B. Điều khoản sử dụng - Lên đến 1023 ký tự.",
                "C. Hình ảnh Logo - Tải lên một hình ảnh JPG hoặc PNG (ít hơn 100KB) để tùy chỉnh logo.",
                "D. Hình nền - Tải lên một hình ảnh JPG hoặc PNG (Ít hơn 2MB) để tùy chỉnh hình nền.",
                "6. Bấm Lưu."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Mật mã",
                           content: "Tạo ra một mật khẩu từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký thự thập lục phân (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Mật mã",
                           content: "Hoặc sử dụng mật mã được tạo ngẫu nhiên, hoặc tạo mật mã từ 8 đến 63 ký tự ASCII hoặc từ 8 đến 64 ký tự thập lục phân (0-9, a-f, A-F)"
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Gateway lớp ứng dụng) cho phép bộ lọc truyền tải NAT (Dịch địa chỉ mạng)tùy chỉnh tích hợp vào gateway để hỗ trợ dịch địa chỉ và cổng cho các giao thức \"kiểm soát/dữ liệu\" lớp ứng dụng nhất định: FTP, TFTP, H323 vân vân. Kích hoạt ALG được khuyến nghị."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt FTP ALG",
                           content: "Nếu được chọn, nó cho phép FTP (File Transfer Protocol) khách hàng và máy chủ để chuyển dữ liệu thông qua NAT."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt TFTP ALG",
                           content: "Nếu được chọn, nó cho phép TFTP (Trivial File Transfer Protocol) khách hàng và máy chủ để chuyển dữ liệu thông qua NAT."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt H323 ALG",
                           content: "Nếu được chọn, nó cho phép khách hàng Microsoft NetMeeting để giao tiếp thông qua NAT."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt RTSP ALG",
                           content: "Nếu được chọn, nó cho phép các khách hàng phương tiện truyền thông máy nghe nhạc để giao tiếp với các máy chủ streaming phương tiện truyền thông qua NAT."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt SIP ALG",
                           content: "Nếu được chọn, thiết bị sẽ cho phép máy khách giao tiếp với máy chủ SIP (Giao thức khởi tạo phiên) qua NAT."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt PPTP Passthrough",
                           content: "Nếu được chọn, nó cho phép Point-to-Point phiên tới đường hầm thông qua một mạng IP và đi qua Router."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt L2TP Passthrough",
                           content: "Nếu được chọn, nó cho phép lớp 2 buổi Point-to-Point được tạo đường hầm qua một mạng IP và đi qua Router."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt IPSec Passthrough",
                           content: "Nếu được chọn, thiết bị sẽ cho phép IPSec (Giao thức Internet bảo mật) thực hiện một đường hầm qua mạng IP và đi qua router. IPSec sử dụng dịch vụ bảo mật mã hóa để đảm bảo giao tiếp cá nhân và bảo mật qua mạng IP."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Máy chủ ảo",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Máy chủ ảo được sử dụng để thiết lập các dịch vụ công trên mạng nội bộ của bạn. Một máy chủ ảo được định nghĩa như là một cổng bên ngoài, và tất cả các yêu cầu từ Internet đến cổng bên ngoài này sẽ được chuyển hướng đến một máy tính được, mà phải được cấu hình với một địa chỉ IP tĩnh hoặc được dự trữ.",
                "Khi bạn lắp đặt một máy chủ trong mạng nội bộ và muốn chia sẻ trên mạng Internet, Máy chủ ảo có thể nhận ra các dịch vụ và cung cấp nó cho người sử dụng Internet ."]
} ,{                      
                           type: "paragraph",
                           content: "Bảng hiển thị các thông số liên quan của máy chủ ảo."
                       } ,{                      
                           type: "name",
                           title: "Dạng dịch vụ",
                           content: "Hiển thị tên của máy chủ ảo."
                       } ,{                      
                           type: "name",
                           title: "Cổng ngoài",
                           content: "Hiển thị số cổng hoặc một dải các cổng được sử dụng bởi các máy chủ ảo."
                       } ,{                      
                           type: "name",
                           title: "IP nội bộ",
                           content: "Hiển thị các địa chỉ IP của máy tính đang chạy các ứng dụng dịch vụ."
                       } ,{                      
                           type: "name",
                           title: "Cổng trong",
                           content: "Hiển thị số cổng của máy tính đang chạy các ứng dụng dịch vụ."
                       } ,{                      
                           type: "name",
                           title: "Giao thức",
                           content: "Hiển thị các giao thức được sử dụng cho các ứng dụng dịch vụ: TCP, UDP, hoặc Tất cả (Tất cả các giao thức được hỗ trợ bởi các Router)."
                       } ,{                      
                           type: "name",
                           title: "Trạng thái",
                           content: "Hiển thị tình trạng hiện tại (kích hoạt hoặc vô hiệu hóa) của các quy tắc lọc cụ thể."
                       } ,{                      
                           type: "name",
                           title: "Tùy chỉnh",
                           content: "Hiển thị tùy chọn để sửa đổi hoặc xóa các quy tắc tương ứng."
                       } ,{                      
                           type: "step",
                           title: "Thiết lập một điều luật máy chủ ảo",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Nhấp vào Xem Dịch vụ hiện tại để chọn một dịch vụ từ danh sách để tự động cư số cổng thích hợp trong các lĩnh vực Cổng bên ngoài và cảng Nội bộ. Nếu dịch vụ không được liệt kê, nhập số bên ngoài cổng (ví dụ: 21) hoặc một loạt các cổng (ví dụ: 21-25). Để trống Cảng Nội bộ nếu nó là giống như Cổng bên ngoài hoặc nhập một số cổng cụ thể (ví dụ: 21) nếu Cổng bên ngoài là một cổng duy nhất. Nhập địa chỉ IP của máy tính đang chạy các ứng dụng dịch vụ trong các định dạng dấu chấm thập phân vào trường Nội bộ IP.",
                "3. Chọn một giao thức cho các ứng dụng dịch vụ: TCP, UDP, hoặc Tất cả từ danh sách thả xuống giao thức.",
                "4. Chọn Kích hoạt.",
                "5.Bấm Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
       content: [ 
                "1. Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn.",
                "2. Chúng tôi khuyến nghị giữ các cài đặt mặc định của Internal Port (cổng giao tiếp nội bộ) và Protocol (giao thức) nếu bạn không rõ về cổng và giao thức sử dụng.",
                "3. Nếu các máy chủ nội bộ có nhiều hơn một loại hình dịch vụ khả dụng, bạn cần phải tạo ra một điều luật cho mỗi dịch vụ. Xin lưu ý rằng các External Port (cổng giao tiếp với mạng bên ngoài) KHÔNG được chồng lấp."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Cổng kích hoạt",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cổng kích hoạt được sử dụng để chuyển tiếp lưu lượng trên một cổng nhất định để máy chủ cụ thể trên mạng."
                       } ,{                      
                           type: "paragraph",
                           content: "Bảng hiển thị các thông số liên quan của cổng kích hoạt."
                       } ,{                      
                           type: "name",
                           title: "Ứng dụng",
                           content: "Hiển thị tên của ứng dụng."
                       } ,{                      
                           type: "name",
                           title: "Cổng kích hoạt",
                           content: "Hiển thị các cổng giao thông đi sử dụng để kích hoạt một quy tắc lọc của một kết nối gửi đi."
                       } ,{                      
                           type: "name",
                           title: "Giao thức kích hoạt",
                           content: "Hiển thị các giao thức được sử dụng cho Cổng kích hoạt. TCP, UDP, hoặc Tất cả (Tất cả các giao thức được hỗ trợ bởi các Router."
                       } ,{                      
                           type: "name",
                           title: "Cổng ngoài",
                           content: "Hiển thị các cổng hoặc khoảng cổng được sử dụng bởi các hệ thống từ xa. Một phản ứng bằng cách sử dụng một trong các cổng này sẽ được chuyển tiếp đến máy tính mà gây nên nguyên tắc này. Bạn có thể nhập tối đa 5 nhóm cổng (hoặc phân cổng). Mỗi nhóm cổng phải được phân cách bằng \",\" (dấu phẩy), ví dụ, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Giao thức mở rộng",
                           content: "Hiển thị các giao thức được sử dụng cho cổng đến: TCP, UDP, hoặc tất cả (tất cả các giao thức được hỗ trợ bởi các bộ định tuyến)."
                       } ,{                      
                           type: "name",
                           title: "Trạng thái",
                           content: "Hiển thị tình trạng hiện tại (kích hoạt hoặc vô hiệu hóa) của các quy tắc lọc cụ thể."
                       } ,{                      
                           type: "name",
                           title: "Tùy chỉnh",
                           content: "Hiển thị tùy chọn để sửa đổi hoặc xóa các quy tắc tương ứng."
                       } ,{                      
                           type: "step",
                           title: "Để thiết lập một quy định cổng kích hoạt",
       content: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Mỗi quy tắc chỉ có thể được sử dụng bởi một máy chủ tại một thời điểm."
                       },
                "1. Bấm chọn Thêm.",
                "2. Nhấp vào Xem ứng dụng hiện có để lựa chọn một ứng dụng từ danh sách để tự động tạo các giá trị mặc định vào các trường thích hợp. Nếu bạn muốn thêm một ứng dụng chưa niêm yết, nhập thủ công các ứng dụng, cổng kích hoạt, giao thức kích hoạt, Cổng mở rộng và giao thức mở rộng.",
                "3. Chọn Kích hoạt.",
                "4. Nhấp vào Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn vô hiệu hóa điều luật này, bấm chọn biểu tượng Bóng đèn."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng máy chủ DMZ (Demilitarized Zone) cho phép một máy chủ cục bộ giao tiếp với Internet cho một dịch vụ mục đích đặc biệt, như trò chơi Internet hoặc hội thảo video. Về cơ bản, DMZ cho phép một máy tính trong mạng LAN mở tất cả các cổng. Máy tính này cần phải được cấu hình có một địa chỉ IP tĩnh và tắt tính năng DHCP máy khách của nó."
                       } ,{                      
                           type: "paragraph",
                           content: "Khi DMZ được kích hoạt, máy chủ DMZ sẽ có thể giao tiếp hoàn toàn với Internet, và có thể sẽ chứa đựng một số nguy hiểm tiềm tàng cho máy tính. Nếu DMZ không được sử dụng, vui lòng vô hiệu hóa tính năng này."
                       } ,{                      
                           type: "step",
                           title: "Để chỉ định một máy tính hoặc máy chủ là một máy chủ DMZ",
       content: [ 
                "1. Nhấp vào Cho phép DMZ.",
                "2. Trong mục địa chỉ IP máy chủ DMZ, nhập địa chỉ IP của một máy tính cục bộ để thiết lập như các máy chủ DMZ.",
                "3. Bấm chọn Lưu."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mặc định, tính năng UPnP (Universal Plug-and-Play) được kích hoạt để cho phép các thiết bị, như máy tính và các thiết bị Internet, tự động phát hiện và giao tiếp với nhau trong mạng nội bộ."
                       } ,{                      
                           type: "paragraph",
                           content: "Bạn có thể sẽ cần kích hoạt UpNP nếu bạn muốn sử dụng các ứng dụng như trò chơi nhiều người, kết nối điểm-đến-điểm, giao tiếp thời gian thực (như hội thảo VoIP hoặc hội thảo VoIP từ xa) hoặc hỗ trợ từ xa, vân vân..."
                       } ,{                      
                           type: "name",
                           title: "Danh sách dịch vụ UPnP",
                           content: "Danh sách dịch vụ UPnP hiển thị thông tin UPnP của máy chủ nội bộ."
                       }]
},
       MODEM :{ 
               TITLE:"Trợ Giúp về 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Hiện tình trạng của modem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Sử dụng thông số ISP nhận dạng tự động",
                           content: "Tính năng này mặc định được kích hoạt. Nếu kích hoạt, router có thể tự động xác định ISP của SIM/UIM và điền các thông số. Nếu nhận dạng thất bại, vui lòng chọn Khu vực và ISP di động theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Khu vực",
                           content: "Tự động chọn và hiển thị khu vực khi modem USB và thẻ SIM được nhận dạng thành công. Nếu không, vui lòng chọn khu vực từ trình đơn thả xuống."
                       } ,{                      
                           type: "name",
                           title: "ISP Mobile",
                           content: "Hiện ISP (Nhà Cung Cấp Dịch Vụ Internet) của mạng 3G/4G. Nếu không được phát hiện tự động, hãy chọn ISP từ menu xổ xuống. Số Quay mặc định và APN sẽ tự động được điền vào."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Nếu Bảo vệ SIM/UIM được kích hoạt, vui lòng nhập mã PIN. Bảo vệ SIM/UIM mặc định được vô hiệu hóa. Vui lòng lưu ý nếu bạn nhập mã PIN sai 3 lần, thẻ SIM/UIM sẽ tự động bị khóa. Bạn chỉ có thể mở khóa bằng cách nhập mã PUK từ PC/máy tính xách tay."
                       } ,{                      
                           type: "name",
                           title: "Tin nhắn",
                           content: "Hiển thị thông tin PIN của thẻ SIM/UIM nếu Bảo vệ PIN được kích hoạt."
                       } ,{                      
                           type: "name",
                           title: "Cài đặt Số quay,APN,Tên người dùng/Mật khẩu",
                           content: "Nếu ISP không được liệt kê trong danh sách <strong>ISP di động</strong>, chọn hộp chọn này và nhập Số dial, APN (Tên điểm truy cập), Tên đăng nhập và Mật mã do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "Số quay",
                           content: "Nhập Số dial do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Nhập APN (Tên điểm truy cập) do ISP cung cấp"
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập Tên đăng nhập và Mật mã do ISP cung cấp. Trường này phân biệt chữ hoa và chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Kết nối theo yêu cầu",
                           content: "Ở chế độ này, kết nối Internet sẽ bị ngắt tự động sau một khoảng thời gian không hoạt động (Thời gian nghỉ tối đa) xác định. Kết nối sẽ tự thiết lập lại khi bạn truy cập lại Internet"
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Thỉnh thoảng, kết nối này sẽ không thể ngắt được, mặc dù bạn đã đặt Thời Gian Không Hoạt Động Tối Đa, vì một số ứng dụng nào đó vẫn tiếp tục truy cập Internet ở hậu trường."
                       } ,{                      
                           type: "name",
                           title: "Kết nối tự động",
                           content: "Trong chế độ này, kết nối Internet sẽ tự động kết nối lại vào bất cứ lúc nào nó bị ngắt kết nối."
                       } ,{                      
                           type: "name",
                           title: "Kết nối thủ công",
                           content: "Trong chế độ này, bạn có thể bấm nút Kết Nối hoặc Ngắt Kết Nối để tự điều khiển kết nối Internet. Chế độ này cũng hỗ trợ chức năng Thời Gian Không Hoạt Động Tối Đa. Nhập vào thời gian tối đa (tính bằng phút) mà kết nối Internet có thể không hoạt động rồi sau đó kết thúc vào ô Thời Gian Không Hoạt Động Tối Đa. Giá trị mặc định là 15 phút. Nếu bạn muốn kết nối Internet liên tục hoạt động vào mọi lúc, nhập 0 (không)."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Thỉnh thoảng, kết nối này sẽ không thể ngắt được, mặc dù bạn đã đặt Thời Gian Không Hoạt Động Tối Đa, vì một số ứng dụng nào đó vẫn tiếp tục truy cập Internet ở hậu trường."
                       } ,{                      
                           type: "paragraph",
                           content: "Click the Save button to save the settings."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Trợ Giúp Cài Đặt Chuyên Sâu cho 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Hiện tình trạng của modem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Sử dụng thông số ISP nhận dạng tự động",
                           content: "Tính năng này mặc định được kích hoạt. Nếu kích hoạt, router có thể tự động xác định ISP của SIM/UIM và điền các thông số. Nếu nhận dạng thất bại, vui lòng chọn Khu vực và ISP di động theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Khu vực",
                           content: "Tự động chọn và hiển thị khu vực khi modem USB và thẻ SIM được nhận dạng thành công. Nếu không, vui lòng chọn khu vực từ trình đơn thả xuống."
                       } ,{                      
                           type: "name",
                           title: "ISP Mobile",
                           content: "Hiện ISP (Nhà Cung Cấp Dịch Vụ Internet) của mạng 3G/4G. Nếu không được phát hiện tự động, hãy chọn ISP từ menu xổ xuống. Số Quay mặc định và APN sẽ tự động được điền vào."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Nếu Bảo vệ SIM/UIM được kích hoạt, vui lòng nhập mã PIN. Bảo vệ SIM/UIM mặc định được vô hiệu hóa. Vui lòng lưu ý nếu bạn nhập mã PIN sai 3 lần, thẻ SIM/UIM sẽ tự động bị khóa. Bạn chỉ có thể mở khóa bằng cách nhập mã PUK từ PC/máy tính xách tay."
                       } ,{                      
                           type: "name",
                           title: "Tin nhắn",
                           content: "Hiển thị thông tin PIN của thẻ SIM/UIM nếu Bảo vệ PIN được kích hoạt."
                       } ,{                      
                           type: "name",
                           title: "Cài đặt Số quay,APN,Tên người dùng/Mật khẩu",
                           content: "Nếu ISP không được liệt kê trong danh sách <strong>ISP di động</strong>, chọn hộp chọn này và nhập Số dial, APN (Tên điểm truy cập), Tên đăng nhập và Mật mã do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "Số quay",
                           content: "Nhập Số dial do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Nhập APN (Tên điểm truy cập) do ISP cung cấp"
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập Tên đăng nhập và Mật mã do ISP cung cấp. Trường này phân biệt chữ hoa và chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Kết nối theo yêu cầu",
                           content: "Ở chế độ này, kết nối Internet sẽ bị ngắt tự động sau một khoảng thời gian không hoạt động (Thời gian nghỉ tối đa) xác định. Kết nối sẽ tự thiết lập lại khi bạn truy cập lại Internet"
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Thỉnh thoảng, kết nối này sẽ không thể ngắt được, mặc dù bạn đã đặt Thời Gian Không Hoạt Động Tối Đa, vì một số ứng dụng nào đó vẫn tiếp tục truy cập Internet ở hậu trường."
                       } ,{                      
                           type: "name",
                           title: "Kết nối tự động",
                           content: "Trong chế độ này, kết nối Internet sẽ tự động kết nối lại vào bất cứ lúc nào nó bị ngắt kết nối."
                       } ,{                      
                           type: "name",
                           title: "Kết nối thủ công",
                           content: "Trong chế độ này, bạn có thể bấm nút Kết Nối hoặc Ngắt Kết Nối để tự điều khiển kết nối Internet. Chế độ này cũng hỗ trợ chức năng Thời Gian Không Hoạt Động Tối Đa. Nhập vào thời gian tối đa (tính bằng phút) mà kết nối Internet có thể không hoạt động rồi sau đó kết thúc vào ô Thời Gian Không Hoạt Động Tối Đa. Giá trị mặc định là 15 phút. Nếu bạn muốn kết nối Internet liên tục hoạt động vào mọi lúc, nhập 0 (không)."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Thỉnh thoảng, kết nối này sẽ không thể ngắt được, mặc dù bạn đã đặt Thời Gian Không Hoạt Động Tối Đa, vì một số ứng dụng nào đó vẫn tiếp tục truy cập Internet ở hậu trường."
                       } ,{                      
                           type: "name",
                           title: "Dạng xác thực",
                           content: "Chọn dạng xác thực. Giá trị mặc định là Tự động. Một số ISP sẽ yêu cầu một dạng xác thực xác định, vui lòng xác nhận với ISP hoặc giữ cài đặt mặc định."
                       } ,{                      
                           type: "name",
                           title: "tự động",
                           content: "Nếu Tự động (mặc định), router sẽ tự động xác định dạng xác thực được ISP sử dụng."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Nếu chọn PAP (Phương Thức Xác Thực Mật Khẩu), router xác thực với người yêu cầu xác thực bằng phương thức bắt tay hai chiều. Chọn mục này nếu ISP yêu cầu phải dùng cách xác thực này."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Nếu chọn CHAP (Phương Thức Xác Thực Mật Khẩu Có Thử Thách), router sẽ xác thực với người yêu cầu xác thực bằng phương thức bắt tay 3 chiều và định kỳ xác nhận hợp lệ căn tính của người bắt tay. Chọn mục này nếu ISP yêu cầu phải dùng cách xác thực này."
                       } ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tải lớn nhất) mặc định là 1480 byte. Vui lòng không thay đổi trừ khi được ISP yêu cầu."
                       } ,{                      
                           type: "name",
                           title: "Sử dụng địa chỉ DNS sau",
                           content: "Nếu ISP cung cấp địa chỉ IP máy chủ DNS, chọn hộp chọn này và nhập địa chỉ IP <strong>DNS chính</strong> và DNS thứ hai (tùy chọn) bên dưới. Ngược lại, ISP sẽ tự động gán địa chỉ IP máy chủ DNS."
                       } ,{                      
                           type: "name",
                           title: "DNS thứ nhất",
                           content: "Nhập địa chỉ IP DNS theo định dạng thập phân có dấu chấm do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "DNS thứ hai",
                           content: "(Tùy chọn) Nhập một địa chỉ IP DNS khác theo định dạng thập phân có dấu chấm do ISP cung cấp."
                       } ,{                      
                           type: "paragraph",
                           content: "Bấm chọn nút <strong>Lưu</strong> để lưu cài đặt."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Cài đặt thiết bị",
               CONTENT: [{
                           type: "paragraph",
                           content: "Màn hình Cài đặt thiết bị hiển thị các thông tin liên quan đến các thiết bị USB kết nối đến router thông qua cổng USB"
                       } ,{                      
                           type: "name",
                           title: "Quét",
                           content: "Thông thường, Router sẽ tự động phát hiện thiết bị mới được kết nối. Nếu Router không tự phát hiện, vui lòng nhấn nút này để quét các thiết bị mới được kết nối và làm mới màn hình hiển thị với thông tin mới được cập nhật"
                       } ,{                      
                           type: "name",
                           title: "Nhãn",
                           content: "Hiển thị tên của nhãn USB"
                       } ,{                      
                           type: "name",
                           title: "Dung lượng",
                           content: "Hiển thị tổng dung lượng lưu trữ của USB"
                       } ,{                      
                           type: "name",
                           title: "Dung lượng trống",
                           content: "Hiển thị dung lượng lưu trữ trống khả dụng hiện tại"
                       } ,{                      
                           type: "name",
                           title: "Tháo an toàn",
                           content: "Bấm chọn nút này để gỡ thiết bị lưu trữ USB trước khi ngắt kết nối thiết bị về mặt vật lý với router"
                       } ,{                      
                           type: "paragraph",
                           content: "Nút Tháo chỉ xuất hiện khi thiết bị lưu trữ USB được kết nối đến router. Khi thiết bị lưu trữ đang bận, bạn sẽ không thể tháo thiết bị."
                       } ,{                      
                           type: "name",
                           title: "Trạng thái",
                           content: "Tuỳ chọn này chỉ xuất hiện khi có một thiết bị lưu trữ USB kết nối với Router. Chọn để cho phép chia sẻ tập tin của thiết bị USB."
                       } ,{                      
                           type: "step",
                           title: "Để thiết lập một máy chủ tập tin",
       content: [ 
                "1. Gắn thiết bị lưu trữ USB vào cổng USB của Router bằng cách sử dụng một cáp USB.",
                "2. Các thiết bị USB mới được gắn kèm nên được tự động phát hiện bởi các Router và hiển thị các thông tin trong phần Cài đặt Thiết bị. Nếu không, nhấn Quét.",
                "3. Chọn Kích hoạt để kích hoạt tính năng chia sẻ tập tin."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Tài khoản chia sẻ",
               CONTENT: [{
                           type: "name",
                           title: "Tài khoản",
                           content: "Bạn có thể chọn để sử dụng tài khoản mặc định để đăng nhập vào các tập tin và thư mục được chia sẻ hoặc sử dụng tài khoản mới và nhập vào dưới đây để tạo một tài khoản người dùng mới."
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập một tên người dùng từ 1 đến 15 ký tự cả chữ lẫn số hoặc nối chuỗi ký tự với một mật khẩu bằng ký tự gạch dưới với khoảng từ 1 đến 15 ký tự ASCII. Các ô này là có phân biệt chữ hoa và chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Xác nhận mật mã",
                           content: "Nhập lại mật khẩu để xác nhận không có lỗi đánh máy. Lĩnh vực này phân biệt chữ hoa."
                       } ,{                      
                           type: "paragraph",
                           content: "Bấm chọn Lưu để lưu tất cả cài đặt."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Cài đặt chia sẻ",
               CONTENT: [{
                           type: "name",
                           title: "Tên mạng/máy chủ đa phương tiện",
                           content: "Hiển thị tên sử dụng để truy cập thiết bị lưu trữ USB được kết nối"
                       } ,{                      
                           type: "name",
                           title: "Cho phép",
                           content: "Chọn để cho phép các phương pháp truy cập."
                       } ,{                      
                           type: "name",
                           title: "Phương pháp tiếp cận",
                           content: "Có ba phương pháp truy cập để cho phép truy cập vào các thiết bị lưu trữ USB kèm theo. Bạn có thể chọn một hoặc nhiều phương thức truy cập bằng cách chọn hộp kiểm tương ứng.",
       children: [{                      
                           type: "name",
                           title: "Mạng khu vực",
                           content: "Nếu được kích hoạt, người dùng trong mạng sẽ có thể truy cập thiết bị lưu trữ USB bằng địa chỉ IP được gán (ví dụ:\\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Nếu được kích hoạt, máy khách FTP trong mạng nội bộ sẽ có thể truy cập thiết bị lưu trữ USB bằng địa chỉ IP được gán, cùng với số cổng của máy chủ FTP (ví dụ:\\\\192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Qua Internet)",
                           content: "Nếu bật, người dùng từ xa có thể truy cập vào ổ lưu trữ USB thông qua FTP trên Internet. Tính năng này hỗ trợ cả tải xuống và tải lên tập tin. Để thay đổi số cổng FTP máy chủ, nhập một số cổng và nhấp vào Lưu để áp dụng các thay đổi."
                       }]
} ,{                      
                           type: "name",
                           title: "Liên kết",
                           content: "Hiển thị các địa chỉ được sử dụng để truy cập các thiết bị lưu trữ USB được chia sẻ."
                       } ,{                      
                           type: "name",
                           title: "Cổng",
                           content: "Hiện số cổng của máy chủ FTP. Sử dụng giá trị mặc định 21 hoặc một giá trị từ 1024 đến 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Bấm chọn Lưu để lưu tất cả cài đặt."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Chia sẻ thư mục",
               CONTENT: [{
                           type: "name",
                           title: "Chia sẻ tất cả",
                           content: "Chuyển sang chế độ Mở để chia sẻ tất cả các thư mục hoặc chuyển sang chế độ Tắt để chỉ chia sẻ các thư mục được chọn"
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt xác thực",
                           content: "Đó là khuyến khích mạnh mẽ để cho phép xác thực để yêu cầu người dùng nhập vào tên đăng nhập và mật mã hợp lệ để truy cập vào các thư mục chia sẻ."
                       } ,{                      
                           type: "name",
                           title: "Tên thư mục",
                           content: "Hiển thị tên thư mục được chia sẻ"
                       } ,{                      
                           type: "name",
                           title: "Đường dẫn thư mục",
                           content: "Hiển thị đường dẫn đến thư mục được chia sẻ"
                       } ,{                      
                           type: "name",
                           title: "Chia sẻ đa phương tiện",
                           content: "Cho biết thư mục được chia sẻ có cho phép chia sẻ đa phương tiện hay không"
                       } ,{                      
                           type: "name",
                           title: "Tên nhãn",
                           content: "Hiển thị tên của nhãn được chia sẻ"
                       } ,{                      
                           type: "name",
                           title: "Trạng thái",
                           content: "Hiển thị trạng thái của tập tin được chia sẻ bằng đèn hiệu"
                       } ,{                      
                           type: "name",
                           title: "Tùy chỉnh",
                           content: "Hiển thị tùy chọn để sửa đổi hoặc xóa các thư mục chia sẻ tương ứng."
                       } ,{                      
                           type: "name",
                           title: "Duyệt",
                           content: "Nhấn vào đây để tìm kiếm một thư mục chia sẻ."
                       } ,{                      
                           type: "name",
                           title: "Cho phép truy cập mạng khách",
                           content: "Chọn để cho phép máy khách ở Mạng khách truy cập thư mục được chia sẻ"
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt xác thực",
                           content: "Chọn để yêu cầu người dùng truy cập thư mục chia sẻ với tên đăng nhập và mật mã hợp lệ"
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt cho phép thay đổi",
                           content: "Chọn để cho phép người dùng được phép thay đổi trên thư mục chia sẻ"
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt chia sẻ đa phương tiện",
                           content: "Chọn để kích hoạt chia sẻ đa phương tiện"
                       } ,{                      
                           type: "name",
                           title: "Làm mới",
                           content: "Bấm chọn để cập nhật danh sách tập tin chia sẻ"
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Máy chủ in ấn",
               CONTENT: [{
                           type: "name",
                           title: "Máy chủ in ấn",
                           content: "Chuyển sang Mở để kích hoạt tính năng Máy chủ in ấn."
                       } ,{                      
                           type: "name",
                           title: "Tên máy in",
                           content: "Hiển thị tên máy in kết nối đến router."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine sao lưu toàn bộ tập tin trên máy tính Mac của bạn đến thiết bị lưu trữ USB đã kết nối đến router modem của bạn."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt",
                           content: "Chọn ô chọn này để kích hoạt tính năng Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Đĩa sao lưu",
                           content: "Chọn nơi để sao lưu Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Kích thước giới hạn cho sao lưu",
                           content: "Phân bổ sô không gian đĩa có thể được sử dụng để sao lưu Time Machine. 0 có nghĩa là không có giới hạn về không gian."
                       } ,{                      
                           type: "name",
                           title: "Lưu",
                           content: "Bấm để lưu các cài đặt của bạn."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Tải offline",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với việc kích hoạt tính năng Tải về Offline, router có thể tải tập tin mà không cần lúc nào cũng phải mở nguồn máy tính."
                       } ,{                      
                           type: "name",
                           title: "Trạng thái",
                           content: "Chuyển sang mở để kích hoạt tính năng Tải về Offline."
                       } ,{                      
                           type: "name",
                           title: "Đường dẫn thư mục",
                           content: "Chọn một đường dẫn thư mục để lưu trữ hoặc lưu trữ tạm các tập tin tải về.",
       children: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Vui lòng không thay đổi đường dẫn thư mục hoặc tháo ổ lưu trữ USB khi đang tải lên hoặc tải xuống tập tin, nếu không một số lỗi nghiêm trọng có thể xảy ra."
                       }]
} ,{                      
                           type: "name",
                           title: "Thời gian biểu",
                           content: "Chọn hộp chọn để kích hoạt tính năng Thời gian biểu, cho phép bạn xác định khoảng thời gian tải xuống/tải lên tập tin."
                       } ,{                      
                           type: "name",
                           title: "Tiếp tục tải lên sau khi hoàn tất tác vụ",
                           content: "Chọn hộp chọn để tiếp tục tải lên dữ liệu đã tải về hoàn tất đến các thiết bị khác."
                       } ,{                      
                           type: "name",
                           title: "Số tải về kích hoạt tối đa",
                           content: "Nhập một giá trị từ 1 đến 10 để cài đặt số tải về tối đa được kích hoạt. Giá trị mặc định là 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Tải về",
               CONTENT: [{
                           type: "note",
                           title: "Tập tin",
                           content: "Hiển thị tên và dạng tập tin tải về."
                       } ,{                      
                           type: "note",
                           title: "Tốc độ",
                           content: "Hiển thị tốc độ tải xuống (tải lên) hiện tại."
                       } ,{                      
                           type: "note",
                           title: "Đã hoàn tất",
                           content: "Hiển thị quá trình tải về."
                       } ,{                      
                           type: "note",
                           title: "Thời gian còn lại",
                           content: "Hiển thị thời gian tải về còn lại."
                       } ,{                      
                           type: "note",
                           title: "Điểm kết nối",
                           content: "Hiển thị số điểm kết nối của việc tải về."
                       } ,{                      
                           type: "note",
                           title: "Trạng thái",
                           content: "Hiển thị trạng thái hiện tại của việc tải về (đang tải, đang đợi, seeding, đã tạm dừng, đã hoàn tất, hoặc lỗi)."
                       } ,{                      
                           type: "name",
                           title: "Để thêm một tả về mới",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Chọn nguồn tải về, torrent từ máy tính , torrent từ USB , hoặc URL.",
                "3. Chọn vị trí torrent cho BT , hoặc nhập URL cho FTP , HTTP và aMule .",
                "4. Nhấp vào Lưu.",
                "5. Đối với aMule, xác định địa chỉ IP và cổng trong phần Advanced (Nâng cao) > aMule Server (Máy chủ aMule)."]
}]
} ,{                      
                           type: "name",
                           title: "Xóa tải về",
                           content: "Chọn hộp chọn tương ứng của tải về mà bạn muốn xóa, và sau đó bấm chọn nút Xóa trên bàng."
                       } ,{                      
                           type: "name",
                           title: "Tạm dừng tải về",
                           content: "Bấm chọn hộp chọn tương ứng của tải về mà bạn muốn tạm dừng, và sau đó bấm chọn Dừng trên bảng."
                       } ,{                      
                           type: "name",
                           title: "Tiếp tục tải về",
                           content: "Bấm chọn hộp chọn tương ứng của tải về mà bạn muốn tiếp tục, và sau đó bấm chọn Tiếp tục trên bảng."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Nâng cao",
               CONTENT: [{
                           type: "name",
                           title: "Giới hạn tốc độ",
                           content: "Xác định tốc độ tải lên và tải xuống cao nhất cho kết nối Internet."
                       } ,{                      
                           type: "name",
                           title: "Tốc độ tải về tối đa",
                           content: "Nhập một giá trị từ 1 đến 100000 kB/s để cài đặt tốc tộ tải về tối đa. Giá trị mặc định là 1024."
                       } ,{                      
                           type: "name",
                           title: "Tốc độ tải lên tối đa",
                           content: "Nhập một giá trị từ 1 đến 100000 kB/s để cài đặt tốc tộ tải lên tối đa. Giá trị mặc định là 512."
                       } ,{                      
                           type: "name",
                           title: "Số kết nối",
                           content: "Xác định số kết nối tối đa."
                       } ,{                      
                           type: "name",
                           title: "Sô kết nối toàn cầu tối đa",
                           content: "Nhập một giá trị từ 1 đến 200 để cài đặt số kết nối toàn cầu tối đa. Giá trị mặc định là 100."
                       } ,{                      
                           type: "name",
                           title: "Sô điểm kết nối tối đa trên một Torrent",
                           content: "Nhập một giá trị từ 1 đến 100 để cài đặt số điểm kết nối tối đa trên một torrent. Giá trị mặc định là 50."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt Mạng DHT",
                           content: "Kích hoạt tính năng này để nâng cao hiệu quả tìm kiếm điểm và tăng tốc độ tải về."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt thay đổi điểm",
                           content: "Kích hoạt tính năng này để nâng cao hiệu quả giao tiếp trong nhóm điểm, qua đó tăng tốc độ tải về."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt Mã hóa giao thức BitTorrent",
                           content: "Kích hoạt tính năng này để tăng cường tính bảo mật và riêng tư trong quá trình truyền tải dữ liệu."
                       } ,{                      
                           type: "name",
                           title: "Máy chủ aMule",
                           content: "Nhập địa chỉ IP và cổng của máy chủ aMule. Tải về aMule chỉ hoạt động khi router được kết nối đến máy chủ."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Quyền kiểm soát của phụ huynh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với Quyền kiểm soát của phụ huynh, bạn có thể chặn các trang web không rõ ràng, có nội dung đồi trụy hoặc độc hại; giới hạn truy cập theo từng thời điểm trong ngày (ví dụ, chặn Facebook hoặc Youtube trong thời gian làm việc)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Thiết bị dưới Quyền kiểm soát của phụ huynh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng này hiển thị thông tin và cài đặt của thiết bị hiện đang bị giới hạn bởi Quyền kiểm soát của Phụ huynh."
                       } ,{                      
                           type: "step",
                           title: "Để giới hạn một thiết bị mới",
       content: [ 
                "1. Chuyển sang Mở Quyền kiểm soát của phụ huynh.",
                "2. Bấm chọn Thêm.",
                "3. Bấm chọn Quét để chọn một thiết bị hiện đang kết nối từ Danh sách thiết bị truy cập; hoặc nhập Tên thiết bị và Địa chỉ MAC theo cách thủ công để thêm thiết bị hiện đang không kết nối.",
                "4. Bấm chọn biểu tượng Thời gian hiệu lực để xác định khoảng thời gian các giới hạn được áp dụng.",
                "5. Nhập một mô tả ngắn gọn vào trường Mô tả. Trường này là tùy chọn.",
                "6. Chọn Kích hoạt mục này.",
                "7. Nhấp vào Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Nội dung Giới hạn",
               CONTENT: [{
                           type: "paragraph",
                           content: "Giới hạn nội dung cho phép bạn giới hạn truy cập đến một trang web xác định bằng cách sử dụng từ khóa và tên miền. Máy khách bị kiểm soát bởi Quyền kiểm soát của phụ huynh có thể hoặc không thể truy cập các trang web tùy theo các điều luật giới hạn đã được bạn chọn."
                       } ,{                      
                           type: "step",
                           title: "Xác định nội dung truy cập",
       content: [ 
                "1. Chuyển sang Mở Giới hạn nội dung.",
                "2. Chọn Điều luật giới hạn tùy theo nhu cầu.",
                "A.Nếu bạn muốn thiết bị bị kiểm soát chỉ có thể truy cập tất cả các trang web ngoại trừ một số trang, chọn Danh sách đen.",
                "B. Nếu bạn muốn các thiết bị bị kiểm soát chỉ có thể truy cập một số trang web, chọn Danh sách trắng.",
                "3. Bấm chọn Thêm một Từ khóa mới để thêm một từ khóa địa chỉ trang web (ví dụ, wikipedia) hoặc tên miền vào danh sách đen hoặc danh sách trắng.",
                "4. Nhấp vào Lưu."]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"Quyền kiểm soát của phụ huynh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với hồ sơ người dùng, bộ lọc nội dung và giới hạn truy cập, Quyền kiểm soát của phụ huynh cung cấp cho mỗi thành viên trong gia đình bạn quyền truy cập internet được cá nhân hóa và phù hợp."
                       } ,{                      
                           type: "step",
                           title: "Để áp dụng Quyền kiểm soát của phụ huynh cho một thiết bị mới",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Nhập tên cho hồ sơ này và bấm chọn \"+\" để thêm thiết bị cho hồ sơ này.",
                "3. Tùy chỉnh Nội dung Bị chặn theo nhu cầu của bạn. Tất cả các trang web chứa từ khóa sẽ bị chặn.",
                "4. Nếu bạn muốn giới hạn tổng thời gian hồ sơ này có thể truy cập, vui lòng kích hoạt và xác định Thời gian giới hạn. Bạn cũng có thể sử dụng Thời gian ngủ để cài đặt khoảng thời gian hằng ngày mà các thiết bị trong hồ sơ này có thể sử dụng Internet.",
                "5.Bấm Lưu."]
} ,{                      
                           type: "step",
                           title: "Để xem lịch sử internet chi tiết của hồ sơ",
       content: [ 
                "1. Ở cột Chi tiết, bấm chọn nút Chi tiết tương ứng.",
                "2. Nếu bạn muốn xem thêm hồ sơ, bấm chọn nút Lịch sử<span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Bạn có thể chặn hoặc bỏ chặn trang web bằng cách bấm nút <span class=\"ptl-ctr-help-icon block\"></span> hoặc nút <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Để vô hiệu hóa hoặc kích hoạt truy cập Internet ngay lập tức",
       content: [ 
                "Tại cột Truy cập Internet, bấm chọn <span class=\"ptl-ctr-help-icon stop\"></span> để dừng thiết bị trong hồ sơ tương ứng truy cập internet và chọn <span class=\"ptl-ctr-help-icon enable\"></span> để kích hoạt lại truy cập."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Chất lượng dịch vụ) giúp xác định độ ưu tiên cho các lưu lượng Internet dựa trên nhu cầu. Bạn có thể xác định độ ưu tiên cho một thiết bị, một cổng vật lý, hoặc một ứng dụng trong danh sách điều luật QoS."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Lưu ý",
                           content: "Nếu kích hoạt NAT Boost, QoS sẽ được vô hiệu hóa."
                       } ,{                      
                           type: "name",
                           title: "Băng thông tải lên",
                           content: "Nhập băng thông tải lên tối đa do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "Băng thông tải xuống",
                           content: "Nhập băng thông tải xuống tối đa do ISP cung cấp."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Nâng cao",
               CONTENT: [{
                           type: "name",
                           title: "Độ ưu tiên",
                           content: "Xác định tỷ lệ phần trăm cho lưu lượng ưu tiên cao/trung bình/thấp.",
       children: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Tối đa(theo phần trăm) của tất cả các ưu tiên là 1"
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Danh sách điều luật QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tại đây bạn có thể thêm một điều luật QoS chi tiết để xác định độ ưu tiên cho lưu lượng Internet."
                       } ,{                      
                           type: "step",
                           title: "Cài đặt điều luật QoS",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Chọn dạng ưu tiên để thêm điều luật QoS.",
                "Theo thiểt bị - Bấm chọn Quét để chọn thiết bị mong muốn, hoặc nhập tên thiết bị và địa chỉ MAC theo cách thủ công.",
                "Theo ứng dụng - Chọn ứng dụng mong muốn hoặc tùy chỉnh một ứng dụng bằng cách cấu hình tên, giao thức và cổng đến (1-65535). Bạn có thể nhập một cổng đơn hoặc nhiều cổng hoặc dãy cổng, phân cách bằng dấu phấy (ví dụ: 21,36-105,111).",
                "Theo Cổng vật lý - Chọn cổng mong muốn.",
                "3. Bấm chọn Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Bạn có thể kéo một điều luật trong danh sách ưu tiên để thay đổi độ ưu tiên của nó."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Nâng cấp dữ liệu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chúng tôi sẽ phát hành phiên bản cơ sở dữ liệu mới nhất tại www.tp-link.com. Bạn có thể tải về và cập nhật cơ sở dữ liệu của router để mở rộng các ứng dụng được hỗ trợ."
                       } ,{                      
                           type: "name",
                           title: "Tập tin cơ sở dữ liệu mới",
                           content: "Bấm chọn Duyệt để xác định vị trí tập tin cơ sở dữ liệu mới nhất. Chọn tập tin và bấm chọn Nâng cấp để nâng cấp cơ sở dữ liệu lên phiên bản mới nhất."
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Ưu tiên Dịch vụ) cho phép bạn ưu tiên lưu lượng internet của thiết bị cụ thể để đảm bảo kết nối nhanh hơn khi bạn cần."
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"Cài đặt toàn cầu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Băng thông Tải lên - Nhập băng thông tải lên tối đa được cung cấp bởi ISP của bạn."
                       } ,{                      
                           type: "paragraph",
                           content: "Băng thông Tải xuống - Nhập băng thông tải xuống tối đa được cung cấp bởi ISP của bạn."
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"Thiết bị ưu tiên",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn thiết bị bạn muốn ưu tiên và thời gian thiết bị đó được ưu tiên."
                       } ,{                      
                           type: "step",
                           title: "Để ưu tiên một thiết bị",
       content: [ 
                "1. Tìm thiết bị bạn muốn ưu tiên trong danh sách và mở tính năng Ưu tiên.",
                "2. Chọn thời gian thiết bị được ưu tiên trong cột Thời gian."]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Tường lửa",
               CONTENT: [{
                           type: "name",
                           title: "Tường lửa SPI",
                           content: "Tường lửa SPI (Stateful Packet Inspection) ngăn chặn các cuộc tấn công mạng và kiểm tra lưu lượng truyền qua router dựa trên giao thức. Mặc định, tính năng này được kích hoạt."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Bảo vệ DoS",
               CONTENT: [{
                           type: "name",
                           title: "Bảo vệ DoS",
                           content: "Bảo vệ DoS (Denial of Service) bảo vệ mạng LAN khỏi các cuộc tấn công DoS với các yêu cầu được gửi tới máy chủ. Bạn có thể lọc ba dạng tấn công sau tùy theo nhu cầu. Mỗi bộ lọc có 4 cấp độ:",
       children: [{                      
                           type: "name",
                           title: "Tắt",
                           content: "Không có bảo vệ."
                       } ,{                      
                           type: "name",
                           title: "Thấp",
                           content: "thấp-mức độ bảo vệ và ít ảnh hưởng đến hiệu suất router."
                       } ,{                      
                           type: "name",
                           title: "Trung",
                           content: "vừa phải cấp bằng bảo hộ và tác động bán đáng chú ý về hiệu suất router."
                       } ,{                      
                           type: "name",
                           title: "cao",
                           content: "cao mức độ bảo vệ nhưng một tác động đáng kể về hiệu suất router."
                       }]
} ,{                      
                           type: "name",
                           title: "Lọc tấn công ICMP-FLOOD",
                           content: "Kích hoạt ngăn chặn tấn công IGMP (Giao thức tin nhắn kiểm soát Internet)."
                       } ,{                      
                           type: "name",
                           title: "Lọc tấn công UDP-FLOOD",
                           content: "Kích hoạt để ngăn chặn tấn công UDP (User Datagram Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Lọc tấn công TCP-SYN-FLOOD",
                           content: "Kích hoạt ngăn chặn tấn công TCP-SYN (Transmission Control Protocol-Synchronize)."
                       } ,{                      
                           type: "name",
                           title: "Bỏ qua gói tin Ping từ cổng WAN",
                           content: "Cho phép bỏ qua các gói tin ping từ cổng WAN"
                       } ,{                      
                           type: "name",
                           title: "Cấm gói tin Ping từ cổng LAN",
                           content: "Kích hoạt cấm các gói tin ping từ cổng LAN"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Danh sách máy chủ DoS bị cấm",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng hiển thị địa chỉ IP và địa chỉ MAC của các máy chủ DoS bị chặn."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Kiểm soát truy cập",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kiểm soát truy cập được sử dụng để cho phép hoặc chặn các máy khách xác định truy cập mạng. Khi một thiết bị bị chặn, nó sẽ ko thể giao tiếp với thiết bị khác hoặc kết nối đến Internet."
                       } ,{                      
                           type: "step",
                           title: "Kiểm soát truy cập",
       content: [ 
                "1. Chuyển sang Mở để kích hoạt Kiểm soát truy cập.",
                "2. Nếu bạn muốn kiểm soát cả thiết bị kết nối đến Mạng khách, chuyển sang Mở Kiểm soát thiết bị khách.",
                "3. Chọn một chế độ truy cập tùy theo nhu cầu và bấm chọn Lưu:",
                "A. Nếu bạn muốn chặn truy cập từ các thiết bị trong danh sách bên dưới, chọn Danh sách đen.",
                "B. Nếu bạn muốn cho phép truy cập chỉ từ thiết bị trong danh sách bên dưới, chọn Danh sách trắng.",
                "4. Trong khu vực thiết bị của Danh sách đen/Danh sách trắng, bấm chọn Thêm. Nhập Tên thiết bị và Địa chỉ MAC của thiết bị. Bấm chọn Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Thiết bị mạng",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng này hiển thị thông tin của tất cả các thiết bị kết nối (bao gồm thiết bị kết nối đến Mạng khách nếu Kiểm soát thiết bị khách được kích hoạt)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Kết hợp IP & MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kết hợp IP & MAC (Còn được gọi là Kêt hợp ARP) rất hữu ích cho việc kiểm soát truy cập của đối với một số thiết bị xác định trong mạng LAN bằng cách kết hợp địa chỉ IP và địa chỉ MAC của thiết bị với nhau. Kết hợp IP & MAC còn ngăn chặn các thiết bị khác sử dụng một địa chỉ IP đặc biệt."
                       } ,{                      
                           type: "step",
                           title: "Cài đặt thiết bị với Kết hợp IP & MAC",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Nhập địa chỉ MAC của thiết bị.",
                "3. Nhập một địa chỉ IP mà bạn muốn kết hợp với địa chỉ MAC ở trên.",
                "4. Chọn Kích hoạt.",
                "5.Bấm Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
       content: [ 
                "1. Bạn không thể ràng buộc các địa chỉ IP cùng với nhiều hơn một địa chỉ MAC.",
                "2. Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Danh sách ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng này hiển thị địa chỉ MAC và địa chỉ IP của thiết bị kết nối hiện tại."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Giao thức Internet phiên bản 6) là phiên bản mới nhất của IP (giao thức Internet) và có thể xử lý vấn đề cạn kiệt địa chỉ của IPv4 (Giao thức Internet phiên bản 4)."
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: IP Động"
                       } ,{                      
                           type: "name",
                           title: "IP Động",
                           content: "Chọn dạng này nếu ISP sử dụng gán địa chỉ IPv6 Động."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IPv6/Gateway mặc định/DNS thứ nhất/DNS thứ hai",
                           content: "Các thông số này được gán tự động bởi máy chủ DHCPv6 của ISP."
                       } ,{                      
                           type: "name",
                           title: "Làm mới",
                           content: "Bấm để lấy thông số IPv6 mới từ máy chủ DHCPv6 của ISP."
                       } ,{                      
                           type: "name",
                           title: "Giải phóng",
                           content: "Bấm để giải phóng tất cả địa chỉ IPv6 được gán bởi máy chủ DHCPv6 từ ISP."
                       } ,{                      
                           type: "name",
                           title: "Nhận địa chỉ IPv6",
                           content: "Chọn DHCPv6 để lấy địa chỉ IPv6 non-temporary hoặc SLAAC để lấy địa chỉ IPv6 được tạo từ gói tin quảng bá của router, tùy theo ISP."
                       } ,{                      
                           type: "name",
                           title: "Prefix Delegation",
                           content: "Chọn Kích hoạt để lấy prefix delegation từ Máy chủ DHCPv6 từ ISP, hoặc Vô hiệu hóa để chỉ định tiền tố địa chỉ theo cách thủ công. Máy khách trong LAN sẽ tạo địa chỉ IPv6 theo tiền tố này."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ DNS",
                           content: "Chọn Lấy địa chỉ động từ ISP hoặc Sử dụng địa chỉ DNS sau. Nếu chọn Sử dụng địa chỉ DNS sau, vui lòng nhập địa chỉ DNS do ISP cung cấp theo cách thủ công."
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: IP Tĩnh"
                       } ,{                      
                           type: "name",
                           title: "IP Tĩnh",
                           content: "Chọn dạng này nếu ISP sử dụng gán địa chỉ IPv6 Tĩnh."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IPv6/Gateway mặc định/DNS thứ nhất/DNS thứ hai",
                           content: "Nhập các thông số như được cung cấp bởi ISP."
                       } ,{                      
                           type: "name",
                           title: "Kích thước MTU",
                           content: "Kích thước MTU (Đơn vị truyền tải lớn nhất-Maximum Transmission Unit) mặc định và phổ biến cho hầu hết mạng Ethernet là 1500 Byte. Chúng tôi không khuyến nghị thay đổi giá trị MTU trừ khi Nhà cung cấp dịch vụ Internet của bạn yêu cầu"
                       } ,{                      
                           type: "title",
                            title: "Loại kết nối Internet: đường hầm 6to4"
                       } ,{                      
                           type: "name",
                           title: "Đường hầm6to4",
                           content: "Chọn dạng này nếu ISP sử dụng6to4 để gán địa chỉ."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IPv4/IPv4 Subnet Mask/Gateway mặc định IPv4/địa chỉ đường hầm",
                           content: "Các tham số này sẽ được tự động tạo ra bởi các thông tin IPv4 của cổng WAN sau khi bạn nhấn Kết nối."
                       } ,{                      
                           type: "name",
                           title: "Sử dụng máy chủ DNS sau",
                           content: "Chọn để nhập DNS chính và/hoặc DNS thứ hai do ISP cung cấp theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Kết nối",
                           content: "Bấm để kết nối đến Internet."
                       } ,{                      
                           type: "name",
                           title: "Ngắt kết nối",
                           content: "Bấm để ngắt kết nối Internet."
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Chọn dạng này nếu ISP sử dụng PPPoEv6, và cung cấp tên đăng nhập và mật mã."
                       } ,{                      
                           type: "name",
                           title: "Tên đăng nhập/Mật mã",
                           content: "Nhập các thông số như được cung cấp bởi ISP."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ IPv6",
                           content: "Địa chỉ này sẽ được gán tự động từ máy chủ DHCPv6 của ISP, sau khi bạn nhập tên đăng nhập và mật mã sau đó bấm Kết nối."
                       } ,{                      
                           type: "name",
                           title: "Nhận địa chỉ IPv6",
                           content: "Chọn DHCPv6 để lấy địa chỉ IPv6 non-temporary, hoặc SLAAC để lấy địa chỉ IPv6 tạo từ gói tin quảng bá của router, hoặc Xác định bởi ISP để nhập địa chỉ IPv6 tùy theo ISP theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Prefix Delegation",
                           content: "Chọn Kích hoạt để lấy prefix delegation từ Máy chủ DHCPv6 từ ISP, hoặc Vô hiệu hóa để chỉ định tiền tố địa chỉ theo cách thủ công. Máy khách trong LAN sẽ tạo địa chỉ IPv6 theo tiền tố này."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ DNS",
                           content: "Chọn để Lấy địa chỉ động từ ISP hoặc Sử dụng địa chỉ DNS sau. Nếu chọn Sử dụng địa chỉ DNS sau, vui lòng nhập địa chỉ DNS do ISP cung cấp theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Kết nối",
                           content: "Bấm để kết nối đến Internet."
                       } ,{                      
                           type: "name",
                           title: "Ngắt kết nối",
                           content: "Bấm để ngắt kết nối Internet."
                       } ,{                      
                           type: "title",
                            title: "Dạng kết nối Internet: Pass-Through (Cầu nối)"
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn dạng này nếu ISP sử dụng mạng Pass-Through (Cầu nối). Dạng kết nối này không yêu cầu cấu hình."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ngoại trừ dạng kết nối Internet Pass-through (Cầu nối), các dạng kết nối Internet khác sẽ yêu cầu cấu hình IPv6."
                       } ,{                      
                           type: "name",
                           title: "Dạng gán",
                           content: "Chọn dạng kết nối phù hợp tùy theo ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Để tự động gán địa chỉ IP cho các máy khách trong mạng LAN",
       children: [{                      
                           type: "name",
                           title: "Địa chỉ Prefix",
                           content: "Nhập tiền tố địa chỉ do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "Thời gian phát hành",
                           content: "Đây là thời gian hợp lệ của địa chỉ IP được gán. Hoặc giữ giá trị mặc định 86400 hoặc thay đổi nếu ISP yêu cầu."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ",
                           content: "Đây là địa chỉ IP được gán tự động từ máy chủ DHCPv6 của ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC + Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Địa chỉ Prefix",
                           content: "Nhập tiền tố địa chỉ do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ",
                           content: "Đây là địa chỉ IP được gán tự động bởi ISP"
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC + RDNSS",
       children: [{                      
                           type: "name",
                           title: "Địa chỉ Prefix",
                           content: "Nhập tiền tố địa chỉ do ISP cung cấp."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ",
                           content: "Đây là địa chỉ IP được gán tự động bởi ISP"
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Sao chép MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn phương pháp sao chép địa chỉ MAC thích hợp bạn cần."
                       } ,{                      
                           type: "name",
                           title: "Không sao chép địa chỉ MAC",
                           content: "KHÔNG thay đổi địa chỉ MAC mặc định của Router, trong trường hợp các ISP không ràng buộc các địa chỉ IP được gán cho địa chỉ MAC"
                       } ,{                      
                           type: "name",
                           title: "Sao chép địa chỉ MAC máy tính hiện hành",
                           content: "Chọn để sao chép MAC máy tính hiện tại đang kết nối đến Router, trong trường hợp ISP kết hợp địa chỉ IP và địa chỉ MAC"
                       } ,{                      
                           type: "name",
                           title: "Sử dụng địa chỉ MAC tùy chỉnh",
                           content: "Nhập MAC thủ công, trong trường hợp ISP kết hợp địa chỉ IP và địa chỉ MAC xác định"
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Cài đặt Thời gian",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cài đặt thời gian cho phép bạn cấu hình thời gian hệ thống của router. Một khi đã được chỉnh sửa, thời gian hệ thống sẽ được áp dụng cho các tính năng và cấu hình dựa trên thời gian như Quyền kiểm soát của phụ huynh."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Bạn có thể chuyển sang Mở để kích hoạt tính năng Thời gian 24 giờ trước khi cấu hình, tính năng này sẽ được áp dụng cho các tính năng và cấu hình dựa trên thời gian hệ thống."
                       } ,{                      
                           type: "title",
                            title: "Thời gian hệ thống"
                       } ,{                      
                           type: "step",
                           title: "Lấy thời gian từ Internet",
       content: [ 
                "Mặc định được chọn, Lấy từ Internet cho phép bạn lấy thời gian hệ thống từ Internet.",
                "1. Chọn Lấy từ Intenet.",
                "2. Chọn Múi giờ từ trình đơn thả xuống.",
                "3. Tại trường Máy chủ NTP I, nhập địa chỉ IP hoặc tên miền của máy chủ NTP mong muốn.",
                "4. Trong trường máy chủ NTP II, nhập vào địa chỉ IP hoặc tên miền của NTP máy chủ thứ hai. (Tùy chọn)",
                "5. Nhấp vào Lấy.",
                "6. Bấm Lưu."]
} ,{                      
                           type: "step",
                           title: "Lấy thời gian từ PC",
       content: [ 
                "Tính năng này cho phép bạn lấy thời gian hệ thống từ PC. Vui lòng xác nhận thời gian PC trước khi cấu hình.",
                "Chọn Lấy từ PC và bấm chọn Lưu."]
} ,{                      
                           type: "step",
                           title: "Cài đặt thời gian thủ công",
       content: [ 
                "Nếu thiết bị không thể nhận thời gian từ Internet hoặc PC, bạn có thể cấu hình thời gian hệ thống theo cách thủ công.",
                "1.Chọn Thủ công.",
                "2. Nhập Ngày và Thời gian hiện tại.",
                "3. Bấm chọn Lưu."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Chế độ tiết kiệm",
                           content: "Tính năng này có thể tự động đồng bộ hóa thời gian hệ thống với thời gian tiết kiệm ánh sáng ngày."
                       } ,{                      
                           type: "step",
                           title: "Để thiết lập thời gian tiết kiệm ánh sáng",
       content: [ 
                "1. Chọn Kích hoạt tiết kiệm ánh sáng.",
                "2. Xác định khoảng thời gian của thời gian tiết kiệm ánh sáng ngày tại múi giờ địa phương.",
                "3. Bấm chọn Lưu."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Chẩn đoán",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router cung cấp công cụ Ping và Traceroute giúp bạn xử lý sự cố vấn đề mạng."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Công cụ Ping gửi gói tin đến một địa chỉ IP hoặc tên miền đích đến và lưu lại kết quả, như số gói tin đã gửi và nhận, thời gian cho một chu trình."
                       } ,{                      
                           type: "paragraph",
                           content: "Công cụ Traceroute gửi gói tin đến một địa chỉ IP hoặc tên miền đích đến và hiển thị số bước nhảy và thời gian tới đích đến."
                       } ,{                      
                           type: "paragraph",
                           content: "Bạn có thể Ping hoặc Traceroute một thiết bị nội bộ bằng địa chỉ IP hoặc tên miền, như tp-link.com, yahoo.com, vân vân..."
                       } ,{                      
                           type: "step",
                           title: "Để chẩn đoán sử dụng Ping",
       content: [ 
                "1. Chọn Ping làm Công cụ chẩn đoán.",
                "2. Nhập địa chỉ IP hoặc tên miền đích đến.",
                "3. Bấm chọn Biểu tượng Mũi tên để mở trình đơn Nâng cao và xác định Số Ping, Kích thước gói tin Ping. (Tùy chọn)",
                "4. Bấm Bắt đầu."]
} ,{                      
                           type: "step",
                           title: "Để chẩn đoán sử dụng Traceroute",
       content: [ 
                "1. Chọn Traceroute làm Công cụ chẩn đoán.",
                "2. Nhập địa chỉ IP hoặc tên miền đích đến.",
                "3. Bấm chọn Biểu tượng Mũi tên để mở trình đơn Nâng cao và xác định số bước nhảy (cần đạt đến) tại trường Số TTL (Time to Live) tối đa. Giá trị mặc định là 20. (Tùy chọn)",
                "4. Bấm Bắt đầu."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Cổng sao chép"
                       } ,{                      
                           type: "paragraph",
                           content: "Sao chép cổng mô tả quá trình sao chép chuyển tiếp gói tin từ cổng được sao chép đến cổng sao chép. Thông thường, cổng sao chép được kết nối đến thiết bị chẩn đoán dữ liệu, dùng để phân tích gói tin được sao chép cho mục đích giám sát và xử lý sự cố mạng."
                       } ,{                      
                           type: "step",
                           title: "Chuyển tiếp bản sao gói tin đến cổng chỉ định",
       content: [ 
                "1. Kích hoạt Sao chép cổng.",
                "2. Chọn cổng bị sao chép mong muốn.",
                "3. Chọn cổng sao chép mong muốn.",
                "4. Nhấp vào Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Một cổng không thể vừa làm cổng bị sao chép và cổng sao chép cùng lúc."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Nâng cấp firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Nâng cấp firmware cập nhật firmware của router với các tính năng mới và sửa một số lỗi. Chúng tôi khuyến nghị nâng cấp router lên firmware mới nhất để có hiệu suất sử dụng tốt nhất."
                       } ,{                      
                           type: "step",
                           title: "Vui lòng chú ý các mục sau để tránh nâng cấp thất bại:",
       content: [ 
                "Trước khi nâng cấp",
                "1. Chắc chắn kết nối giữa router và máy tính ổn định. Chúng tôi không khuyến nghị việc nâng cấp firmware qua kết nối không dây.",
                "2. Chắc chắn bạn đã tháo tất cả các thiết bị USB kết nối đến router.",
                "3. Vui lòng sao lưu cấu hình của router.",
                "Trong khi nâng cấp",
                "CẤP NGUỒN cho router cho đến khi quá trình nâng cấp hoàn tất."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Nâng cấp firmware trực tuyến",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Bấm Nâng cấp và xác nhận khi được yêu cầu. Router sẽ tự động tải về và nâng cấp firmware mới nhất. Bạn cũng có thể bấm Kiểm tra cập nhật để kiểm tra phiên bản firmware mới nhất."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Nâng cấp firmware thủ công",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Bấm chọn Hỗ trợ ở cuối trang và tải về firmware mới nhất về máy tính. Vui lòng đảm bảo tập tin firmware mà bạn sẽ tải phù hợp với phiên bản phần cứng của router được hiển thị trên trang.",
                "2. Bấm chọn Duyệt và chọn tập tin firmware vừa tải.",
                "3. Bấm chọn Nâng cấp."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Việc nâng cấp firmware sẽ mất vài phút để hoàn thành. Router sẽ tự động khởi động lại sau khi firmware được nâng cấp."]
}]
},
       BACKUP :{ 
               TITLE:"Sao lưu & Phục hồi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng Sao lưu & Phục hồi cho phép bạn sao lưu cấu hình hiện tại của router để khôi phục, hoặc đơn giản là khôi phục router về cài đặt gốc."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Vui lòng KHÔNG tắt nguồn router trong quá trình sao lưu hoặc phục hồi."
                       } ,{                      
                           type: "title",
                           title: "Sao lưu",
                           content: "Chúng tôi đặc biệt khuyến nghị bạn sao lưu cấu hình, trong trường hợp cần khôi phục router về trạng thái trước đó."
                       } ,{                      
                           type: "step",
                           title: "Sao lưu cấu hình hiện tại",
       content: [ 
                "1. Bấm chọn Sao lưu.",
                "2. Chờ router sao lưu cấu hình hiện tại."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Khôi phục",
                           content: "Bạn có thể khôi phục router về trạng thái trước từ một tập tin sao lưu."
                       } ,{                      
                           type: "step",
                           title: "Để khôi phục lại từ một bản sao lưu",
       content: [ 
                "1. Nhấp vào Duyệt.",
                "2. Xác định vị trí và chọn tập tin sao lưu.",
                "3. Nhấp vào Khôi phục."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Khôi phục cài đặt gốc",
       content: [ 
                "Khôi phục cài đặt gốc sẽ xóa tất cả cấu hình và cài đặt của bạn trong router, đưa thiết bị về cài đặt gốc. Ví dụ, tất cả các thông tin về mạng không dây, quyền kiểm soát của phụ huynh và mạng sẽ bị xóa",
                "Sau khi khôi phục cài đặt gốc, bạn sẽ phải đặt mật mã mới để truy cập vào trang quản lý web của router."]
}]
},
       REBOOT :{ 
               TITLE:"Lịch khởi động lại",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng Lịch khởi động lại làm sạch bộ nhớ cache để nâng cao hiệu suất hoạt động của router. Bạn có thể khởi động lại router theo cách thủ công hoặc cài đặt khởi động lại theo lịch đặt sẵn."
                       } ,{                      
                           type: "step",
                           title: "Khởi động lại thủ công",
       content: [ 
                "Bấm Khởi động lại và đợi vài phút để router khởi động lại."]
} ,{                      
                           type: "step",
                           title: "Đặt lịch thời gian khởi động lại",
       content: [ 
                "1. Kích hoạt Lịch khởi động lại.",
                "2. Đặt thời gian và tần suất router khởi động lại bằng cách xác định các thông số trong các trường lặp và thời gian khởi động lại.",
                "3. Bấm chọn Lưu."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Quản trị viên",
               CONTENT: [{
                           type: "paragraph",
                           content: "Quyền quản trị cho phép bạn quản lý mật mã đăng nhập và quyền truy cập của các máy khách kết nối đến router."
                       } ,{                      
                           type: "name",
                           title: "Quản lý tài khoản",
                           content: "Tính năng này cho phép bạn thay đổi mật mã.",
       children: [{                      
                           type: "step",
                           title: "Thay đổi mật mã",
       content: [ 
                "1. Nhập mật mã cũ.",
                "2. Nhập mật mã mới.",
                "3. Xác nhận lại mật mã mới",
                "4. Nhấp vào Lưu."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Khôi phục mật khẩu",
               CONTENT: [{
                           type: "name",
                           title: "Khôi phục mật mã mặc định",
                           content: "Khôi phục mật mã mặc định cho phép bạn khôi phục lại mật mã đăng nhập mặc định mà không cần khôi phục router về cài đặt mặc định gốc.",
       children: [{                      
                           type: "step",
                           title: "Thay đổi mật mã",
       content: [ 
                "1. Kích hoạt tính năng khôi phục mật mã mặc định ",
                "2. Ở ô From (Từ): nhập địa chỉ email hợp lệ, địa chỉ này dùng để gửi mã xác nhận trong trường hợp cần khôi phục thông tin đăng nhập.",
                "3. Ở ô To (Đến): nhập địa chỉ email hợp lệ, địa chỉ này dùng để nhận mã xác nhận.",
                "4. Nhập máy chủ SMTP của các email được gửi đi (From)",
                "5. Nếu email ở ô From yêu cầu mã hóa , bạn phải chọn Enable Authentication (Kích hoạt xác thực) và nhập tên người dùng (địa chỉ email) và mật mã.",
                "6. Bấm Lưu."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Quản lý cục bộ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng này cho phép các thiết bị nội bộ truy cập và quản lý router."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Quản lý nội bộ thông qua HTTPS",
                           content: "Kích hoạt Quản lý nội bộ thông qua HTTPS nếu bạn muốn truy cập router thông qua HTTPS và HTTP, hoặc vô hiệu hóa nếu bạn chỉ muốn truy cập router thông qua HTTP."
                       } ,{                      
                           type: "name",
                           title: "Truy cập cho tất cả Thiết bị kết nối mạng LAN",
                           content: "Chuyển chế độ Mở cho phép quản lý đối với tất cả các thiết bị kết nối LAN hoặc Off để cho phép quản lý cho một thiết bị cụ thể."
                       } ,{                      
                           type: "name",
                           title: "Địa chỉ MAC",
                           content: "Hiển thị địa chỉ MAC của thiết bị truy cập hạn chế."
                       } ,{                      
                           type: "name",
                           title: "Mô tả",
                           content: "Hiển thị các mô tả của các thiết bị truy cập hạn chế."
                       } ,{                      
                           type: "name",
                           title: "Trạng thái",
                           content: "Hiển thị tình trạng hiện tại của các thiết bị truy cập hạn chế (kích hoạt hoặc vô hiệu hóa)."
                       } ,{                      
                           type: "name",
                           title: "Tùy chỉnh",
                           content: "Hiển thị tùy chọn để sửa đổi và xóa các thiết bị tương ứng từ danh sách."
                       } ,{                      
                           type: "step",
                           title: "Để thêm một thiết bị máy khách vào danh sách",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Nhấp vào Xem Thiết bị hiện để lựa chọn một thiết bị hiện có, hoặc nhập địa chỉ MAC của thiết bị vào trường Địa chỉ MAC.",
                "3. Nhập một mô tả cho thiết bị.",
                "4. Chọn Kích hoạt.",
                "5. Nhấn OK."]
} ,{                      
                           type: "step",
                           title: "Sửa đổi hoặc xóa một thiết bị trong danh sách",
                           content: "Trong bảng này, bấm chọn biểu tượng Chỉnh sửa hoặc biểu tượng Thùng rác tương ứng với từng mục để chỉnh sửa hoặc xóa mục đó"
                       } ,{                      
                           type: "step",
                           title: "Để xóa nhiều thiết bị",
                           content: "Chọn tất cả các thiết bị mà bạn muốn xóa, bấm Xóa"
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Quản lý từ xa",
               CONTENT: [{
                           type: "name",
                           title: "Quản lý từ xa",
                           content: "Tính năng Quản lý từ xa cho phép thiết bị từ xa truy cập và quản lý router.",
       children: [{                      
                           type: "step",
                           title: "Cấm tất cả thiết bị từ xa quản lý router",
                           content: "Chọn Vô hiệu hóa Quản lý từ xa và bấm Lưu."
                       } ,{                      
                           type: "step",
                           title: "Cho phép tất cả thiết bị từ xa quản lý router",
       content: [ 
                "1. Chọn Kích hoạt quản lý từ xa cho Tất cả các thiết bị.",
                "2. Nhập Cổng quản lý Web ( 1024-65535 hay 80 ) thông qua đó các thiết bị từ xa sẽ truy cập vào router.",
                "3. Bấm chọn Lưu."]
} ,{                      
                           type: "step",
                           title: "Cho phép thiết bị từ xa xác định quản lý router",
       content: [ 
                "1. Chọn Kích hoạt quản lý từ xa cho một Thiết bị cụ thể.",
                "2. Nhập Cổng quản lý Web ( 1024-65535 hay 80 ) thông qua đó các thiết bị từ xa sẽ truy cập vào router.",
                "3. Nhập Địa chỉ IP quản lý từ xa của các thiết bị từ xa để quản lý router.",
                "4. Nhấp vào Lưu."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Quản lý từ xa",
               CONTENT: [{
                           type: "paragraph",
                           content: "Các tính năng quản lý từ xa cho phép bạn truy cập và cấu hình Router từ xa từ Internet."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Để cài đặt Quản lý Từ xa"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Chọn vào ô để kích hoạt tính năng Quản lý Từ xa."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Giữ cổng HTTPS và cổng HTTP ở cài đặt mặc định."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Chọn để quyết định thiết bị từ xa nào có thể truy cập router từ xa:",
       children: [{                      
                           type: "name",
                           title: "Tất cả thiết bị",
                           content: "Tất cả các thiết bị từ xa có thể truy cập router."
                       } ,{                      
                           type: "name",
                           title: "Thiết bị cụ thể",
                           content: "Nhập địa chỉ IP của thiết bị từ xa để truy cập router."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Nhấp vào Lưu."
                       } ,{                      
                           type: "paragraph",
                           content: "Bây giờ bạn có thể quản lý từ xa router thông qua địa chỉ đã được hiển thị dưới địa chỉ Web để Quản lý."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu cảnh báo xuất hiện khi bạn truy cập vào địa chỉ trên từ xa, hãy nhấp vào Trust ( hoặc một tùy chọn tương tự) để tiếp tục. "
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chế độ ban đêm đã đươc kích hoạt, đèn LED sẽ được tắt trong khoảng thời gian đã xác định trước mỗi ngày mà không ảnh hưởng đến hiệu suất của router."
                       } ,{                      
                           type: "step",
                           title: "Để kích hoạt chế độ ban đêm",
       content: [ 
                "1. Chọn Kích hoạt Chế độ ban đêm.",
                "2. Xác định khoảng thời gian khi đèn LED bị tắt.",
                "3. Bấm chọn Lưu."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Bản ghi hệ thống",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bản ghi hệ thống hiển thị hầu hết các hoạt động gần đây của router. Bảng bao gồm dạng, cấp và nội dung bản ghi của bản ghi hệ thống có thể được lọc theo mục đích. Bạn cũng có thể lưu bản ghi hệ thống đến máy tính nội bộ hoặc gửi thông qua email."
                       } ,{                      
                           type: "step",
                           title: "Để lưu bản ghi hệ thống đến máy tính nội bộ",
       content: [ 
                "1. Cài đặt dạng và cấp độ thấp nhất để lọc bản ghi hệ thống mong muốn. Danh sách cấp độ được sắp xếp giảm dần, với cấp độ thấp nhất được liệt kê dưới cùng.",
                "2. Bấm chọn Lưu để lưu tập tin bản ghi hệ thống vào máy tính cục bộ."]
} ,{                      
                           type: "step",
                           title: "Để nhận bản ghi hệ thống qua email",
       content: [ 
                "1. Cài đặt dạng và Cấp độ đẻ lọc bản ghi hệ thống theo mong muốn. Danh sách cấp độ được sắp xếp giảm dần, với cấp độ thấp nhất được liệt kê dưới cùng.",
                "2. Bấm chọn Cài đặt Email.",
                "3. Tại trường Từ, nhập một địa chỉ email hợp lệ được sử dụng làm email gửi đi.",
                "4. Tại trường Đến, nhập một địa chỉ email hợp lệ được sử dụng làm email nhận.",
                "5. Nhập địa chỉ Máy chủ SMTP của hộp thư đi (Từ).",
                "Lưu ý: Nếu hộp thư đi yêu cầu xác thực, chọn hộp chọn Kích hoạt xác thực và nhập Tên đăng nhập (địa chỉ email) và mật mã.",
                "6. Nếu bạn muốn nhận bản ghi hệ thống thường xuyên qua email, chọn hộp chọn Kích hoạt thư tự động và cài đặt một thời gian xác định (theo định dạng 24 giờ) hoặc nhập một khoảng thời gian.",
                "Nếu bạn muốn ngay lập tức nhận bản ghi hệ thống hiện tại, bấm chọn Gửi bản ghi ngay.",
                "7. Nhấp vào Lưu."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Giám sát lưu lượng",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị lưu lượng sử dụng của thiết bị trong vòng 10 phút trước hoặc của tất cả thiết bị trong 10 phút trước/ 24 giờ trước/ 7 ngày trước."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Danh sách giám sát lưu lượng",
               CONTENT: [{
                           type: "paragraph",
                           content: "Danh sách này được nhóm theo dạng thiết bị: có dây hoặc không dây."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Thông số hệ thống",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Không dây 2.4GHz/5GHz",
                           content: "Phần này cho phép bạn cấu hình các thông số của điều luật truyền tải lưu lượng trong mạng không dây. Chúng tôi khuyến nghị giữ giá trị mặc định nếu bạn không chắc giá trị nào là đúng trong trường hợp này."
                       } ,{                      
                           type: "name",
                           title: "Khoảng thời gian Beacon",
                           content: "Nhập một giá trị giữa 40 và 1000 trong giây để xác định khoảng thời gian giữa các gói beacon được phát sóng bởi các Router để đồng bộ hóa các mạng không dây. Mặc định là 100 mili giây."
                       } ,{                      
                           type: "name",
                           title: "Ngưỡng RTS",
                           content: "Nhập một giá trị từ 1 đến 2346 để xác định kích thước gói tin truyền tải dữ liệu qua các Router. Theo mặc định, các RTS (Yêu cầu Gửi) kích thước Ngưỡng là 2346. Nếu các gói kích thước lớn hơn ngưỡng cài đặt trước, Router sẽ gửi yêu cầu của Gửi frame đến một trạm tiếp nhận nói riêng và thương lượng việc gửi một khung dữ liệu, hoặc người nào khác gói tin sẽ được gửi ngay lập tức."
                       } ,{                      
                           type: "name",
                           title: "Khoảng thời gian DTIM",
                           content: "Giá trị này xác định khoảng thời gian DITM (Tin nhắn báo hiệu lưu lượng truyền tải). Nhập một giá trị từ 1 đến 15 khoảng thời gian. Giá trị mặc định là 1, báo hiệu khoảng thời gian DTIM giống với khoảng thời gian Beacon."
                       } ,{                      
                           type: "name",
                           title: "Thời gian cập nhật mã nhóm",
                           content: "Nhập số giây (tối thiểu 30) để kiểm soát khoảng thời gian cho mã hóa khóa tự động gia hạn. Giá trị mặc định là 0, cho thấy không có sự đổi mới quan trọng."
                       } ,{                      
                           type: "name",
                           title: "Tính năng WMM",
                           content: "Chức năng WMM đảm bảo các gói tin với những thông điệp ưu tiên cao được truyền ưu tiên. Nó được kích hoạt theo mặc định và rất khuyến khích."
                       } ,{                      
                           type: "name",
                           title: "Tính năng Short GI",
                           content: "Tính năng này mặc định được kích hoạt và khuyến nghị để tăng dung lượng gói bằng thời gian GI (Guard Interval)."
                       } ,{                      
                           type: "name",
                           title: "Tính năng cô lập trạm không dây",
                           content: "Nếu bạn muốn giới hạn và hạn chế tất cả các thiết bị không dây kết nối đến mạng tương tác với nhau, nhưng vẫn có thể truy cập Internet, chọn hộp chọn Kích hoạt cô lập AP."
                       },{
                           type: "name",
                           title: "Giảm nhiễu USB 3.0",
                           content: "Bấm chọn Kích hoạt để giảm nhiễu USB 3.0."
                        }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "WDS của 2,4GHz/5GHz"
                       } ,{                      
                           type: "step",
                           title: "Để kích hoạt WDS",
                           content: "Tính năng cầu nối WDS (Hệ thống phân phối không dây) cho phép bạn mở rộng vùng phủ mạng không dây bằng cách bắt cầu với 1 AP (điểm truy cập) trong một mạng WLAN (mạng nội bộ)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Chọn để kích hoạt tính năng Cầu nối WDS.",
                "2. Để bắt cầu một mạng bằng tính năng Quét: bấm chọn Quét để quét và hiển thị tất cả mạng khả dụng và chọn mạng bạn muốn bắt cầu. SSID (tên mạng), địa chỉ MAC, và Bảo mật sẽ được tự động phân bổ.",
                "Hoặc để bắt cầu 1 mạng theo cách thủ công: nhập SSID (tên mạng), Địa chỉ MAC và chế độ WDS của mạng cần bắt cầu. Chọn một dạng bảo mật và nhập các thông số liên quan, các thông số này cần phải giống với mạng được bắt cầu. ",
                "3. Bấm chọn Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn không chắc về chế độ WDS, giữ giá trị tùy chọn mặc định là Tự động."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Cài đặt bảo vệ Wi-Fi) cho phép bạn dễ dàng kết nối thiết bị kích hoạt WPS đến router bằng cách nhấn nút WPS. Vui lòng kiểm tra tính năng WPS đã được kích hoạt và bấm chọn Lưu."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Tính năng này mặc định được kích hoạt. Chúng tôi khuyến nghị giữ giá trị cài đặt mặc định. Nếu bạn vô hiệu hóa, bạn có thể sẽ không thể truy cập Internet."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Khi tắt NAT, cấu hình trong Chuyển tiếp NAT sẽ không có tác dụng"
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "CHọn hộp chọn Kích hoạt NAT Boost và bấm Lưu để đảm bảo router có thông lượng tốt nhất."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Lưu ý",
                           content: "Khi NAT Boost được kích hoạt, QoS và giao thông Thống kê sẽ được vô hiệu hóa tự động"
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Cài đặt bảo vệ DOS",
                           content: "Bảo vệ DOS bảo vệ router khỏi các cuộc tấn công ICMP-FLOOD, UDP-FLOOD và TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "Cấp gói tin ICMP-FLOOD",
                           content: "Nhập một giá trị từ 5 đến 7200 để kích hoạt bảo vệ ICMP-FLOOD ngay lập tức khi số gói tin ICMP vượt quá ngưỡng cài đặt trước."
                       } ,{                      
                           type: "name",
                           title: "Cấp gói tin UDP-FLOOD",
                           content: "Nhập một giá trị từ 5 đến 7200 để kích hoạt bảo vệ UDP-FLOOD ngay lập tức khi số gói tin UDP vượt quá ngưỡng cài đặt trước."
                       } ,{                      
                           type: "name",
                           title: "Cấp gói tin TCP-FLOOD",
                           content: "Nhập một giá trị từ 5 đến 7200 gói tin TCP-SYN để kích hoạt bảo vệ TCP-SYN-FLOOD ngay lập tức khi số gói tin UDP vượt quá ngưỡng cài đặt trước."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Song công",
                           content: "Chọn chế độ song công từ danh sách thả xuống và bấm chọn Lưu."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Kích hoạt chế độ ban đêm",
                           content: "Chọn hộp chọn này để tắt các đèn LED trong Thời Gian ở Chế Độ Ban Đêm mà không ảnh hưởng đến hoạt động của router."
                       } ,{                      
                           type: "name",
                           title: "Khoảng chế độ ban đêm",
                           content: "Ấn định một thời gian cho chế độ ban đêm."
                       } ,{                      
                           type: "paragraph",
                           content: "Nhấn Lưu để lưu tất cả các thiết lập của bạn."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với OpenVPN, bạn có thể sử dụng Internet để bảo mật truy cập mạng khi bạn không ở nhà. Để sử dụng dịch vụ VPN, bạn cần phải cấu hình Dịch vụ DNS Động (khuyến nghị) hoặc gán một địa chỉ IP tĩnh cho cổng WAN của router. Và Thời gian hệ thống cần được đồng bộ với Internet."
                       } ,{                      
                           type: "name",
                           title: "Dạng dịch vụ",
                           content: "Chọn nghi thức giao tiếp cho máy chủ OpenVPN: UDP hoặc TCP."
                       } ,{                      
                           type: "name",
                           title: "Cổng Dịch Vụ",
                           content: "Nhập số cổng giao tiếp từ 1024 đến 65535. Cổng dịch vụ phổ biến và mặc định là 1194."
                       } ,{                      
                           type: "name",
                           title: "Subnet/Netmask của VPN",
                           content: "Nhập dãy các địa chỉ IP mà máy chủ OpenVPN có thể cấp cho các máy khách."
                       } ,{                      
                           type: "name",
                           title: "Đường Truy Cập của Máy Khách",
                           content: "Chọn dạng truy cập cho máy khách OpenVPN.",
       children: [{                      
                           type: "name",
                           title: "Chỉ Qua Mạng Gia Đình",
                           content: "Máy khách chỉ có thể truy cập mạng gia đình. Định tuyến mặc định của máy khách sẽ không bị thay đổi."
                       } ,{                      
                           type: "name",
                           title: "Internet và Mạng Gia Đình",
                           content: "Máy khách có thể truy cập mạng gia đình, và các trang web hoặc dịch vụ Internet với giới hạn địa lý khi bạn không ở trong quốc gia đó. Định tuyến mặc định của máy khách sẽ bị thay đổi."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Chứng nhận",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Sử dụng chứng nhận cho thông tin và căn cước của kết nối VPN cho máy tính từ xa.",
                "Bấm để phát sinh một chứng nhận mới."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Tập Tin Cấu Hình",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Máy khách từ xa sẽ sử dụng tập tin cấu hình để truy cập router của bạn.",
                "Bấm nút này để lưu lại tập tin cấu hình của OpenVPN để sử dụng cho việc thêm một kết nối VPN mới."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Hướng Dẫn Cài Đặt Máy Khách VPN",
               CONTENT: [{
                           type: "step",
                           title: "Để kết nối máy khách đến máy chủ OpenVPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Trước khi bạn cấu hình máy chủ OpenVPN, vui lòng cấu hình Dịch vụ DNS Động (Khuyến nghị) hoặc gán một địa chỉ IP Tĩnh cho cổng WAN. Và đảm bảo cổng ngoài của cài đặt NAT không phải là cổng dịch vụ, và Thời gian hệ thống được đồng bộ với Internet."
                       },
                "1. Chọn Kích hoạt Máy chủ VPN.",
                "2. Cấu hình thông số máy chủ VPN (Dạng dịch vụ, Cổng dịch vụ, Subnet/Netmask của máy khách truy cập và VPN) và bấm Lưu.",
                "3. Bấm Xuất để lưu tập tin cấu hình.",
                "4. Trên máy khách, tải và cài đặt tiện ích máy khách OpenVPN từ <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Các nền tảng chính thức được hỗ trợ bao gồm Windows, MAC OSX và Linux.",
                "5. Khởi chạy tiện ích máy khách OpenVPN và thêm một kết nối VPN mới bằng cách sử dụng tập tin cấu hình đã lưu để kết nối máy khách đến máy chủ VPN."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Để tìm hiểu thêm về máy khách OpenVPN, xin xem tại <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với VPN PPTP, bạn có thể dễ dàng và nhanh chóng sử dụng Internet để truy cập mạng khi bạn không ở nhà. Điều này có thể bị chặn bởi một số ISP. Để sử dụng dịch vụ VPN, bạn cần phải cấu hình Dịch vụ DNS Động (khuyến nghị) hoặc gán một địa chỉ IP tĩnh cho cổng WAN của router. Và Thời gian hệ thống cần được đồng bộ với Internet."
                       } ,{                      
                           type: "name",
                           title: "Địa Chỉ IP của Máy Khách",
                           content: "Nhập dãy các địa chỉ IP (tối đa 10 máy khách) mà máy chủ PPTP VPN có thể cấp cho các máy khách."
                       } ,{                      
                           type: "name",
                           title: "Tên người dùng và Mật khẩu",
                           content: "Nhập tên người dùng và mật khẩu để xác thực các khách đến máy chủ PPTP VPN."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Hướng Dẫn Cài Đặt Máy Khách VPN",
               CONTENT: [{
                           type: "step",
                           title: "Để kết nối máy khách đến máy chủ VPN PPTP:",
       content: [{                      
                           type: "paragraph",
                           content: "Trước khi bạn cấu hình máy chủ VPN PPTP, vui lòng cấu hình Dịch vụ DNS Động (Khuyến nghị) hoặc gán một địa chỉ IP Tĩnh cho cổng WAN. Vui lòng đảm bảo cổng ngoài của cài đặt NAT không phải là 1723, và Thời gian hệ thống được đồng bộ với Internet."
                       },
                "1. Chọn Kích hoạt Máy chủ VPN.",
                "2. Cấu hình thông số máy chủ VPN PPTP và bấm Lưu.",
                "3. Trên máy khách, tạo một kết nối VPN PPTP. Các nền tảng chính thức được hỗ trợ bao gồm Windows, MAC OSX, Linux, iOS và Android.",
                "4. Khởi chạy chương trình VPN PPTP, thêm một kết nối mới và nhập tên miền của dịch vụ DDNS đã đăng ký hoặc địa chỉ IP tĩnh đã được gán cho cổng WAN, để kết nối may khách đến máy chủ VPN PPTP."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Kết nối VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Trang này cho hiện các máy khách hiện đang kết nối đến máy chủ OpenVPN và PPTP VPN được đặt trên router."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Bản đồ mạng",
               CONTENT: [{
                           type: "paragraph",
                           content: "Trong Bản đồ mạng, bạn có thể xem trạng thái kết nối mạng hiện tại và thông tin không dây của router và thông tin của thiể bị kết nối."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin Internet."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin mạng hiện tại của mạng không dây và cổng LAN."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Máy khách có dây/không dây",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị tên mạng (có thể chỉnh sửa), địa chỉ IP được gán, địa chỉ MAC của máy khách kết nối đến router."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Máy in",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị tên máy in kết nối đến router qua cổng USB"
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Ổ cứng USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin liên quan của ổ cứng USB kết nối đến router thông qua cổng USB."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Kiểm tra tốc độ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng này kiểm tra tốc độ tải lên và tải xuống hiện tại mà bạn nhận được từ nhà cung cấp dịch vụ và cung cấp một số lời khuyên hữu ích về đường truyền internet của bạn"
                       } ,{                      
                           type: "paragraph",
                           content: "Mẹo: Để có kết quả chính xác hơn, xin vui lòng thử đóng các ứng dụng và chương trình khác."
                       } ,{                      
                           type: "paragraph",
                           content: "Lịch sử - Bản ghi các bài kiểm tra tốc độ trước đây."
                       } ,{                      
                           type: "paragraph",
                           content: "Kiểm tra lại - Bấm chọn để thực hiện kiểm tra tốc độ."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bấm Tự động phát hiện hoặc chọn dạng kết nối thủ công. Sau đó nhập thông số tương ứng do ISP cung cấp."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Kết Nối Thông Minh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn hộp chọn này để kích hoạt kết nối thông minh. Chức năng này giúp thiết bị chạy nhanh hơn bằng cách gán chúng cho băng tần không dây tốt nhất dựa theo điều kiện thực tế để cân bằng các nhu cầu về mạng."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Cài đặt không dây",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bạn có thể cấu hình cài đặt không dây (SSID, mật mã, vân vân)"
                       } ,{                      
                           type: "name",
                           title: "Tên mạng không dây (SSID)",
                           content: "Chúng tôi khuyến nghị bạn thay đổi tên mạng (SSID). Trường này phân biệt chữ hoa chữ thường."
                       } ,{                      
                           type: "name",
                           title: "Giấu SSID",
                           content: "Chọn nếu bạn muốn giấu tên mạng 2.4GHz/5GHz (SSID) khỏi danh sách mạng không dây. Khi đã chọn, SSID sẽ không được quản g bá và bạn sẽ cần truy cập mạng theo cách thủ công."
                       } ,{                      
                           type: "name",
                           title: "Mật mã",
                           content: "Nhập một mật mã không dây từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký tự thập lục phân. Trường hợp này phân biệt chữ hoa và chữ thường"
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Thiết bị lưu trữ USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng này cho phép bạn chia sẻ thiết bị lưu trữ USB giữa các máy khách khác nhau trong mạng nội bộ hoặc qua Internet."
                       } ,{                      
                           type: "title",
                           title: "Cài đặt thiết bị",
                           content: "Phần Cài đặt thiết bị hiển thị thông tin cơ bản của thiết bị lưu trữ USB kết nối đến cổng USB. Một ổ cứng USB thường chỉ có một dung lượng."
                       } ,{                      
                           type: "name",
                           title: "Quét",
                           content: "Thông thường, router sẽ tự động phát hiện các thiết bị mới được kết nối. Nếu không, vui lòng nhấn nút này để quét và làm mới màn hình với các thông tin được cập nhật.",
       children: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Khu vực màu xám đại diện cho dung lượng đã bị vô hiệu hóa. Bạn có thể bấm chọn khu vực để chia sẻ dung lượng xác định."
                       }]
} ,{                      
                           type: "name",
                           title: "Gỡ",
                           content: "Bấm nút này để tháo thiết bị lưu trữ USB an toàn trước khi tháo hẳn USB ra khỏi cổng vật lý.",
       children: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nút Tháo chỉ xuất hiện khi thiết bị lưu trữ USB được kết nối đến router. Khi thiết bị lưu trữ đang bận, bạn sẽ không thể tháo thiết bị."
                       }]
} ,{                      
                           type: "step",
                           title: "Để thiết lập một máy chủ tập tin",
       content: [ 
                "1. Gắn thiết bị lưu trữ USB đến cổng USB trực tiếp hoặc sử dụng cáp USB. Nếu thiết bị yêu cầu cấp nguồn bên ngoài, vui lòng đảm bảo nguồn đã được kết nối.",
                "2. Thiết bị USB mới được gắn sẽ được router phát hiện tự động và hiển thị ở khu vực Cài đặt thiết bị. Nếu không, vui lòng bấm nút Quét.",
                "Lưu ý: Khi biểu tượng Chia sẻ xuất hiện. Bạn có thể nhấp vào biểu tượng để vô hiệu hóa nội dung mà bạn không muốn chia sẻ."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Địa chỉ truy cập",
               CONTENT: [{
                           type: "name",
                           title: "Tên mạng/máy chủ đa phương tiện",
                           content: "Hiển thị tên được sử dụng để truy cập thiết bị lưu trữ USB đã kết nối thông qua phương pháp Mạng Neighborhood hoặc tính năng Chia sẻ đa phương tiện. Mặc định là TP-Share"
                       } ,{                      
                           type: "name",
                           title: "Phương pháp tiếp cận",
                           content: "Có 3 phương pháp để truy cập thiết bị lưu trữ USB chia sẻ.",
       children: [{                      
                           type: "name",
                           title: "Mạng khu vực",
                           content: "Chọn tùy chọn này để cho phép người dùng trong mạng truy cập nội dung đã chia sẻ thông qua địa chỉ hiển thị tại cột Địa chỉ."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Chọn tùy chọn này để kích hoạt tính năng máy chủ FTP cho phép máy khách và người dùng FTP trong mạng truy cập thiết bị lưu trữ USB thông qua địa chỉ FTP hiển thị ở cột Địa chỉ."
                       } ,{                      
                           type: "name",
                           title: "FTP (qua Internet)",
                           content: "Chọn tùy chọn này để cho phép máy khách và người dùng FTP truy cập, tải về và tải lên tập tin từ xa đến thiết bị lưu trữ USB thông qua giao thức FTP qua mạng Internet. Để tùy chỉnh địa chỉ truy cập, bấm Sửa và cài đặt DNS Động cho router. Để thay đổi cổng máy chủ FTP, nhập một cổng mới và bấm Lưu để áp dụng thay đổi."
                       }]
} ,{                      
                           type: "name",
                           title: "Địa chỉ",
                           content: "Hiển thị các địa chỉ được sử dụng để truy cập các thiết bị lưu trữ USB được chia sẻ."
                       } ,{                      
                           type: "name",
                           title: "Cổng",
                           content: "Hiển thị số cổng sử dụng để truy cập máy chủ FTP."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Nội dung chia sẻ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị tập tin bạn chia sẻ. Tất cả tập tin mặc định được chia sẻ. Bạn có thể bấm biểu tượng Sửa để chỉnh sửa thư mục chia sẻ."
                       } ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Biểu tượng Chia sẻ xuất hiện trong phần Cài Đặt Thiết Bị. Bạn có thể nhấp vào biểu tượng Chia sẻ để vô hiệu hóa nội dung mà bạn không muốn chia sẻ."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Nội dung chia sẻ và bảo mật",
               CONTENT: [{
                           type: "name",
                           title: "Nội dung chia sẻ",
                           content: "Hiển thị tập tin bạn chia sẻ. Tất cả tập tin mặc định được chia sẻ. Bạn có thể bấm biểu tượng Sửa để chỉnh sửa thư mục chia sẻ.",
       children: [{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Biểu tượng Chia sẻ xuất hiện trong phần Cài Đặt Thiết Bị. Bạn có thể nhấp vào biểu tượng Chia sẻ để vô hiệu hóa nội dung mà bạn không muốn chia sẻ."
                       }]
} ,{                      
                           type: "name",
                           title: "Xác thực truy cập",
       content: [ 
                "Chuyển sang Mở để kích hoạt xác thực, yêu cầu người dùng nhập tên đăng nhập và mật mã hợp lệ để truy cập các thư mục chia sẻ. Quản trị viên có thể đọc và chỉnh sửa tập tin trong khi Người dùng chỉ có thể đọc tập tin.",
                "Tên đăng nhập phải bắt đầu bằng một ký tự hoặc một gạch dưới và bao gồm 1-15 ký tự bằng chữ cái, chữ số và gạch dưới .",
                "Mật mã phải bao gồm 1 - 15 ký tự bằng chữ cái, chữ số và gạch dưới."]
} ,{                      
                           type: "name",
                           title: "Kích hoạt chia sẻ đa phương tiện",
                           content: "Với việc kích hoạt tính năng này, tất cả thiết bị hỗ trợ DLNA trong mạng nội bộ có thể truy cập tập tin đa phương tiện trong thư mục chia sẻ. Người dùng sẽ không bị yêu cầu nhập tên đăng nhập và mật mã ngay cả khi kích hoạt Xác thực truy cập."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Máy chủ in ấn",
               CONTENT: [{
                           type: "name",
                           title: "Máy chủ in ấn",
                           content: "Chuyển sang Mở để kích hoạt tính năng Máy chủ in ấn."
                       } ,{                      
                           type: "name",
                           title: "Tên máy in",
                           content: "Hiển thị tên máy in kết nối đến router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Quyền kiểm soát của phụ huynh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với cài đặt cơ bản của Quyền kiểm soát của phụ huynh, bạn có thể giới hạn truy cập theo từng khoảng thời gian trong ngày (ví dụ, không cho phép máy tính trẻ em truy cập Internet trong thời gian làm bài tập về nhà)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Thiết bị dưới Quyền kiểm soát của phụ huynh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng này hiển thị thông tin và cài đặt của thiết bị hiện đang bị giới hạn bởi Quyền kiểm soát của Phụ huynh."
                       } ,{                      
                           type: "step",
                           title: "Để giới hạn một thiết bị mới",
       content: [ 
                "1. Chuyển sang Mở Quyền kiểm soát của phụ huynh.",
                "2. Bấm chọn Thêm.",
                "3. Bấm chọn Quét để chọn một thiết bị hiện đang kết nối từ Danh sách thiết bị truy cập; hoặc nhập Tên thiết bị và Địa chỉ MAC theo cách thủ công để thêm thiết bị hiện đang không kết nối.",
                "4. Bấm chọn biểu tượng Thời gian hiệu lực để xác định khoảng thời gian các giới hạn được áp dụng.",
                "5. Nhập một mô tả ngắn gọn vào trường Mô tả. Trường này là tùy chọn.",
                "6. Chọn Kích hoạt mục này.",
                "7. Nhấp vào Lưu."]
} ,{                      
                           type: "note",
                           title: "Lưu ý",
                           content: "Nếu bạn muốn vô hiệu hóa mục này, bấm chọn biểu tượng Bóng đèn."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Mạng khách",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng này cho phép bạn cung cấp truy cập Wi-Fi cho khách mà không cần công khai mạng chính."
                       } ,{                      
                           type: "name",
                           title: "Cho phép Khách truy cập lẫn nhau",
                           content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách giao tiếp với nhau qua các phương pháp như Samba, Ping, và FTP."
                       } ,{                      
                           type: "name",
                           title: "Cho phép Khách truy cập mạng nội bộ của tôi",
                           content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách giao tiếp với các thiết bị kết nối đến cổng LAN của router hoặc mạng chính thông qua các phương pháp như Samba, Ping và FTP."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt Mạng khách",
                           content: "Chọn hộp chọn này để kích hoạt chức năng Mạng khách"
                       } ,{                      
                           type: "name",
                           title: "Tên mạng không dây (SSID)",
                           content: "Bạn có thể sử dụng tên Mạng khách mặc định hoặc tạo tên mới (tối đa 32 ký tự)"
                       } ,{                      
                           type: "name",
                           title: "Giấu SSID",
                           content: "Chọn hộp chọn này nếu bạn muốn giấu Tên Mạng khách (SSID)"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Khoảng thời gian cập nhật mật mã",
                           content: "Chọn thời gian cập nhật mật mã Mạng khách."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Mật mã",
                           content: "Tạo ra một mật khẩu từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký thự thập lục phân (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Mật mã",
                           content: "Hoặc sử dụng mật mã được tạo ngẫu nhiên, hoặc tạo mật mã từ 8 đến 63 ký tự ASCII hoặc từ 8 đến 64 ký tự thập lục phân (0-9, a-f, A-F)"
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"Cloud TP-Link",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dịch vụ Cloud của TP-Link sẽ cho phép bạn giám sát mạng của bạn từ xa theo thời gian thực, truy cập và quản lý thiết bị TP-Link của bạn từ Internet ở bất cứ nơi đâu vào bất cứ thời điểm nào."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Thông tin tài khoản",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin ID TP-Link của bạn. Bạn có thể chỉnh sửa thông tin tài khoản bằng cách nhấp vào biểu tượng chỉnh sửa."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Thông tin thiết bị",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hiển thị thông tin thiết bị của bạn, bao gồm tài khoản Cloud quản lý thiết bị."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Kết hợp tài khoản",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bảng này hiển thị tất cả tài khoản cloud đang được liên kết với thiết bị."
                       } ,{                      
                           type: "step",
                           title: "Để kết hợp một tài khoản người dùng",
       content: [ 
                "1. Bấm chọn Kết hợp.",
                "2. Nhập email đã đăng ký mà bạn muốn kết hợp.",
                "3. Bấm chọn Lưu."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Quyền kiểm soát của phụ huynh",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với khả năng lọc theo độ tuổi, giới hạn truy cập và hồ sơ người dùng, Quyền kiểm soát của phụ huynh cung cấp cho gia đình bạn quyền truy cập Internet tùy chỉnh và phù hợp."
                       } ,{                      
                           type: "step",
                           title: "Để áp dụng Quyền kiểm soát của phụ huynh cho một thiết bị mới",
       content: [ 
                "1. Bấm chọn Thêm.",
                "2. Nhập tên cho hồ sơ này và bấm chọn \"+\" để thêm thiết bị cho hồ sơ này.",
                "3. Chọn một Cấp độ lọc và tùy chỉnh nội dung lọc tùy theo yêu cầu của bạn. Bạn có thể nhập từ khóa để tìm kiếm một trang web mà bạn muốn lọc trong cơ sở dữ liệu của chúng tôi. Các trang web khác (URL) có thể được nhập theo cách thủ công. <br/> Tham khảo các giải thích bên dưới cho các danh mục lọc khác nhau:<p>Nội dung người lớn - Các trang web chứa nội dung đồi trụy, có hại hoặc nội dung bất hợp pháp bao gồm nội dung khiêu dâm, sử dụng chất gây nghiện, bạo lực và phân biệt đối xử</p><p>Cờ bạc - Trang web quảng bá hoặc cung cấp thông tin về cờ bạc, bao gồm cả các trang cờ bạc trực tuyến</p><p>Giao dục giới tính - Các trang web thảo luận về thông tin tình dục, bao gồm sinh sản, tình dục, tình dục an toàn và kiểm soát sinh sản, các bệnh lây lan qua đường tình dục và các ứng phó với các chấn thương tình dục</p><p>Liên lạc trực tuyến - Các trang web có máy chủ liên lạc với các trang web khác thông qua văn bản, thoại hoặc video, bao gồm email, diễn đàn trực tuyến, VoIP và các dịch vụ chat video</p><p>Mạng xã hội - Các trang web thể hiện cảm xác cá nhân hoặc thông tin liên lạc, kết nối mọi người và hoạt động cá nhân của họ dựa trên sở thích, nghề nghiệp, quê quán hoặc mối quan hệ thực tế</p><p>Chi trả để lướt - Trang web yêu cầu người dùng xem các trang web khác, hoặc tin nhắn email, hoặc quảng cáo, yêu cầu đường dẫn hoặc phản hồi khảo sát</p><p>Đa phương tiện - Trang Web cung cấp nội dung video hoặc âm thanh có phí hoặc miễn phí, bao gồm các dịch vụ trực tuyến, chương trình truyền hình hoặc tải nhạc</p><p>Tải về - Trang web cung cấp truy cập chia sẻ và phân phối tập tin, bao gồm chia sẻ điểm điểm, lưu trữ trực tuyến và nội dung thiết bị di động (ví dụ: nhạc & ứng dụng)</p><p>Trò chơi - Trang web cung cấp truy cập đến các máy chủ trò chơi web hoặc tải về, bao gồm trò chơi trực tuyến, mạng trò chơi console và trò chơi trên trình duyệt</p>",
                "4. Nếu bạn muốn giới hạn tổng thời gian hồ sơ này có thể truy cập, vui lòng kích hoạt và xác định Thời gian giới hạn. Bạn cũng có thể sử dụng Thời gian ngủ để cài đặt khoảng thời gian hằng ngày mà các thiết bị trong hồ sơ này có thể sử dụng Internet.",
                "5.Bấm Lưu."]
} ,{                      
                           type: "step",
                           title: "Để xem lịch sử internet chi tiết của hồ sơ",
       content: [ 
                "1. Ở cột Chi tiết, bấm chọn nút Chi tiết tương ứng.",
                "2. Nếu bạn muốn xem thêm hồ sơ, bấm chọn nút Lịch sử<span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Bạn có thể chặn hoặc bỏ chặn trang web bằng cách bấm nút <span class=\"ptl-ctr-help-icon block\"></span> hoặc nút <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Để vô hiệu hóa hoặc kích hoạt truy cập Internet ngay lập tức",
       content: [ 
                "Tại cột Truy cập Internet, bấm chọn <span class=\"ptl-ctr-help-icon stop\"></span> để dừng thiết bị trong hồ sơ tương ứng truy cập internet và chọn <span class=\"ptl-ctr-help-icon enable\"></span> để kích hoạt lại truy cập."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng QoS (Quality of Service) xác định độ ưu tiên cho các hoạt động và thiết bị để đảm bảo kết nối mạng nhanh hơn khi bạn cần."
                       } ,{                      
                           type: "paragraph",
                           content: "Chọn Ứng dụng ưu tiên để ưu tiên tốc độ mạng cho các hoạt động trực tuyến, và chọn Thiết bị ưu tiên để ưu tiên tốc độ mạng cho thiết bị."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Ứng dụng ưu tiên",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn hoạt động trực tuyến bạn muốn ưu tiên hoặc bấm chọn Tùy chỉnh để cài đặt cấp độ ưu tiên của mỗi hoạt động trực tuyến"
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Thiết bị ưu tiên",
               CONTENT: [{
                           type: "paragraph",
                           content: "Chọn thiết bị bạn muốn ưu tiên và thời gian thiết bị đó được ưu tiên."
                       } ,{                      
                           type: "step",
                           title: "Để ưu tiên một thiết bị",
       content: [ 
                "1. Tìm thiết bị bạn muốn ưu tiên trong danh sách và mở tính năng Ưu tiên.",
                "2. Chọn thời gian thiết bị được ưu tiên trong cột Thời gian."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Diệt virus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Với việc quét mạng, phát hiện trang web độc hại và cô lập thiết bị nhiễm virus thường xuyên, tính năng Diệt virus giúp bảo mật thông tin cá nhân. Bạn cũng có thể kiểm tra mạng của bạn có được bảo mật không, và đã có cuộc tấn công nào vào mạng của bạn không."
                       } ,{                      
                           type: "paragraph",
                           content: "Lịch sử - Lưu lại thông tin thiết bị đã được bảo vệ bởi tính năng Diệt Virus và nguồn gốc và phân loại của cuộc tấn công."
                       } ,{                      
                           type: "paragraph",
                           content: "Kích hoạt tất cả - Chạm để kích hoạt tất cả Dạng bảo vệ nếu một hoặc vài dạng bảo vệ chưa được kích hoạt."
                       } ,{                      
                           type: "paragraph",
                           content: "Dạng bảo vệ - Kích hoạt Dạng bảo vệ bằng cách tham khảo các hướng dẫn. Chúng tôi khuyến nghị kích hoạt tất cả các dạng bảo vệ."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Ứng dụng ưu tiên",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng Ứng dụng ưu tiên ưu tiên các hoạt động trực tuyến để đảm bảo kết nối mạng nhanh hơn khi bạn cần. Chọn hoạt động trực tuyến bạn muốn ưu tiên hoặc bấm chọn Tùy chỉnh để cài đặt độ ưu tiên cho các hoạt động trực tuyến."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Thiết bị ưu tiên",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tính năng Thiết bị ưu tiên ưu tiên thiết bị để đảm bảo kết nối mạng nhanh hơn khi bạn cần. Chọn thiết bị bạn muốn ưu tiên và thời gian ưu tiên cho thiết bị đó."
                       } ,{                      
                           type: "step",
                           title: "Để ưu tiên một thiết bị",
       content: [ 
                "1. Tìm thiết bị bạn muốn ưu tiên trong danh sách và mở tính năng Ưu tiên.",
                "2. Chọn thời gian thiết bị được ưu tiên trong cột Thời gian."]
}]
},
       FIREWALL :{ 
               TITLE:"Tường lửa",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tường lửa SPI (Stateful Packet Inspection) ngăn chặn các cuộc tấn công mạng và kiểm tra lưu lượng truyền qua router dựa trên giao thức. Mặc định, tính năng này được kích hoạt."
                       } ,{                      
                           type: "name",
                           title: "Kích hoạt tường lửa SPI",
                           content: "Không vô hiệu hóa tường lửa SPI trừ khi cần thiết."
                       } ,{                      
                           type: "name",
                           title: "Cho phép Pings từ Cổng WAN/Cho phép Ping từ cổng LAN",
                           content: "Kích hoạt để cho phép gói tin ping từ cổng WAN/LAN. Chúng tôi khuyến nghị giữ giá trị mặc định."
                       }]
},
       "" :     ""
    };
})(jQuery);
