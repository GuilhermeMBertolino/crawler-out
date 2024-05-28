(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "Kiểm soát băng thông",
            CONTENT: [{
                type: "paragraph",
                content: "Kiểm soát băng thông cho phép bạn cấu hình Băng thông tải lên và Băng thông tải về của mạng, và thông lượng kết hợp không được vượt quá 100000 Kbps. Đối với tùy chọn kiểm soát băng thông, vui lòng chọn đúng Dạng dây và tham khảo ý kiến ISP của bạn về thông tin tổng băng thông cho phép đối với tải lên và tải về."
            }, {
                type: "name",
                title: "Kích hoạt",
                content: "Chọn hộp chọn để kích hoạt tính năng Kiểm soát băng thông."
            }, {
                type: "name",
                title: "Tổng số Upstream băng thông",
                content: "Nhập tổng tốc độ tải lên thông qua cổng WAN."
            }, {
                type: "name",
                title: "Tổng băng thông hạ lưu",
                content: "Nhập tốc độ tải về thông qua cổng WAN."
            }, {
                type: "title",
                content: "Điều luật kiểm soát"
            }, {
                type: "name",
                title: "Mô tả",
                content: "Hiển thị dải IP hoặc dải cổng bị kiểm soát"
            }, {
                type: "name",
                title: "quyền ưu tiên",
                content: "Hiển thị cấp độ ưu tiên của điều luật, 1 là cấp độ ưu tiên cao nhất và 8 là cấp độ ưu tiên thấp nhất. Tổng băng thông tải lên và tải về  sẽ được phân bổ để đảm bảo tốc độ nhỏ nhất của tất cả các điều luật kiểm soát băng thông."
            }, {
                type: "name",
                title: "Up (min / max)",
                content: "Hiển thị băng thông tải lên nhỏ nhất và lớn nhất theo đơn vị Kbps"
            }, {
                type: "name",
                title: "Down (min / max)",
                content: "Hiển thị băng thông tải về nhỏ nhất và lớn nhất theo đơn vị Kbps"
            }, {
                type: "name",
                title: "Kích hoạt",
                content: "Báo hiệu trạng thái hiện tại của một điều luật. Bấm chọn biểu tượng Bóng đèn để kích hoạt hoặc vô hiệu hóa điều luật."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để Tùy chỉnh hoặc Xóa điều luật tương ứng."
            }, {
                type: "note",
                title: "Để thêm một quy tắc mới",
                content: [
                    "Bấm chọn Thêm.",
                    "Nhập dải địa chỉ IP bị kiểm soát",
                    "Nhập dải số cổng bị kiểm soát.",
                    "Chọn dạng giao thức cho điều luật này.",
                    "Chọn cấp độ ưu tiên cho điều luật này. (1 là cấp độ ưu tiên cao nhất.)",
                    "Nhập băng thông tải lên nhỏ nhất và lớn nhất (theo đơn vị Kbps) qua cổng WAN.",
                    "Nhập băng thông tải về nhỏ nhất và lớn nhất (theo đơn vị Kbps) qua cổng WAN.",
                    "Chọn Kích hoạt mục này.",
                    "Bấm chọn OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Để xóa nhiều mục</strong><br>trong danh sách Điều luật kiểm soát, chọn hộp chọn tương ứng của điều luật cần xóa và bấm chọn Xóa trên bảng."
            }]
        },
        accessControl: {
            TITLE: "Kiểm soát truy cập",
            CONTENT: [{
                type: "paragraph",
                content: "Kiểm soát truy cập được sử dụng để cho phép hoặc chặn các máy tính hoặc các thiết bị xác định khác truy cập mạng của bạn. Khi một thiết bị bị chặn, thiết bị này có thể nhận địa chỉ IP từ router, nhưng không thể liên lạc với các thiết bị khác trong mạng hoặc kết nối Internet."
            }, {
                type: "paragraph",
                content: "<strong>Lưu ý:</strong>Để sử dụng Kiểm soát truy cập, kích hoạt tính năng này và làm theo các bước trong Hướng dẫn ứng dụng. Nếu Kiểm soát truy cập bị vô hiệu hóa (Tắt), tất cả các thiết bị có thể truy cập mạng của bạn,  bao gồm cả các thiết bị trong danh sách đen."
            }, {
                type: "name",
                title: "Kiểm soát truy cập",
                content: "Chuyển sang Mở để kích hoạt tính năng Kiểm soát truy cập."
            }, {
                type: "title",
                content: "Chế độ truy cập"
            }, {
                type: "name",
                title: "Danh sách đen",
                content: "Chọn để chặn truy cập từ các thiết bị trong danh sách bên dưới."
            }, {
                type: "name",
                title: "Danh sách trắng",
                content: "Chọn để chỉ cho phép truy cập từ các thiết bị nằm trong danh sách bên dưới."
            }, {
                type: "title",
                content: "Thiết bị trong Danh sách đen/Danh sách trắng"
            }, {
                type: "note",
                title: "<strong> Để danh sách đen hoặc danh sách trắng một thiết bị </strong>",
                content: [
                    "Bấm chọn biểu tượng Thêm.",
                    "Nhập Tên thiết bị.",
                    "Nhập địa chỉ MAC của thiết bị.",
                    "Bấm chọn OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Để tùy chỉnh hoặc xóa một thiết bị trong Danh sách đen/Danh sách trắng</strong><br>Trong bảng Danh sách đen/Danh sách trắng, bấm chọn biểu tượng Chỉnh sửa hoặc Thùng rác tương ứng với thiết bị bạn muốn tùy chỉnh hoặc muốn xóa."
            }, {
                type: "paragraph",
                content: "<strong>Để xóa nhiều thiết bị trong Danh sách đen/Danh sách trắng</strong><br>Trong bảng Danh sách đen/Danh sách trắng, chọn tất cả thiết bị bạn muốn xóa , bấm chọn Xóa trên bảng."
            }, {
                type: "title",
                content: "Thiết bị trực tuyến"
            }, {
                type: "name",
                title: "Tên thiết bị",
                content: "Hiển thị tên của thiết bị kết nối."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Hiển thị địa chỉ IP của thiết bị kết nối."
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC của thiết bị kết nối."
            }, {
                type: "name",
                title: "Dạng kết nối",
                content: "Hiển thị dạng kết nối của thiết bị kết nối, có dây hoặc không dây."
            }, {
                type: "paragraph",
                content: "<strong>Để chặn nhiều thiết bị </strong><br>Trong bảng Thiết bị trực tuyến, chọn tất cả thiết bị bạn muốn chặn , bấm chọn Chặn trên bảng. Thiết bị được chọn sẽ tự động được thêm vào Thiết bị trong Danh sách đen."
            }]
        },
        arpBind: {
            TITLE: "Cài đặt",
            CONTENT: [{
                type: "paragraph",
                content: "Kết hợp IP & MAC (còn được gọi là Kết hợp ARP) rất hữu dụng để kiểm soát truy cập của một thiết bị xác định trong mạng LAN bằng cách kết hợp địa chỉ IP và địa chỉ MAC của thiết bị với nhau. Kết hợp IP & MAC còn ngăn chặn các thiết bị khác sử dụng một địa chỉ IP xác định."
            }, {
                type: "name",
                title: "Kết hợp IP & MAC",
                content: "Chuyển sang Mở để kích hoạt tính năng Kết hợp IP & MAC."
            }, {
                type: "title",
                title: "Danh sách kết hợp"
            }, {
                type: "note",
                title: "<strong> Để thiết lập một thiết bị với ARP ràng buộc </strong>",
                content: [
                    "Bấm chọn Thêm.",
                    "Nhập địa chỉ MAC của thiết bị.",
                    "Nhập một địa chỉ IP mà bạn muốn kết hợp với địa chỉ MAC ở trên.",
                    "Chọn Kích hoạt.",
                    "Bấm chọn OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Để tùy chỉnh hoặc xóa một mục</strong><br>Trong Danh sách kết hợp, bấm chọn biểu tượng Chỉnh sửa hoặc Thùng rác tương ứng với mục bạn muốn tùy chỉnh hoặc muốn xóa."
            }, {
                type: "paragraph",
                content: "<strong>Để xóa nhiều mục</strong><br>Trong Danh sách kết hợp, chọn tất cả mục bạn muốn xóa , bấm chọn Xóa trên bảng."
            }, {
                type: "title",
                title: "ARP Danh sách"
            }, {
                type: "paragraph",
                content: "Hiển thị địa chỉ IP và MAC của thiết bị hiện đang kết nối."
            }, {
                type: "name",
                title: "Tên thiết bị",
                content: "Hiển thị tên của thiết bị kết nối."
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC của thiết bị kết nối."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Hiển thị địa chỉ IP được phân bổ cho thiết bị kết nối."
            }, {
                type: "name",
                title: "giới hạn",
                content: "Báo hiệu địa chỉ MAC và địa chỉ IP có được kết hợp hay không."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để Xóa mục tương ứng khỏi danh sách."
            }, {
                type: "paragraph",
                content: "<strong>Lưu ý: </strong>Bạn không thể kết hợp cùng một địa chỉ IP cho nhiều hơn một địa chỉ MAC."
            }, {
                type: "paragraph",
                content: "<strong>Để kết hợp nhiều thiết bị</strong><br>trong danh sách ARP, chọn các thiết bị bạn muốn kết hợp địa chỉ IP của chúng với địa chỉ MAC của chúng, bấm chọn Kết hợp trên bảng."
            }]
        },
        alg: {
            TITLE: "Gateway lớp ứng dụng (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG cho phép tùy chỉnh bộ lọc truyền tải Network Address Translation (NAT) được cắm vào gateway để hổ trợ dịch địa chỉ và cổng cho các giao thức \"dữ liệu/kiểm soát\" lớp ứng dụng nhất định: FTP, TFTP, H323 vân vân… Chúng tôi khuyến nghị kích hoạt ALG."
            }, {
                type: "name",
                title: "PPTP Passthrough",
                content: "Chọn hộp chọn để kích hoạt tính năng PPTP Pass-through để cho phép phiên Điểm-đến-Điểm được đi xuyên qua mạng IP và đi qua router"
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Chọn hộp chọn để kích hoạt tính năng PPTP Pass-through để cho phép phiên Điểm-đến-Điểm Lớp 2 được đi xuyên qua mạng IP và đi qua router"
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Chọn hộp chọn để kích hoạt tính năng IPSec Pass-through để cho phép Internet Protocol Security (IPSec) được đi xuyên qua mạng IP và đi qua router. IPSec sử dụng dịch vụ bảo mật mã hóa để đảm bảo liên lạc riêng tư và bảo mật qua mạng IP."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Chọn hộp chọn để kích hoạt tính năng FTP ALG để cho phép máy chủ và máy khách FTP (File Transfer Protocol) truyền tải dữ liệu qua NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Chọn hộp chọn để kích hoạt tính năng TFTP ALG để cho phép máy chủ và máy khách TFTP (Trivial File Transfer Protocol) truyền tải dữ liệu qua NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "Nếu được chọn, thiết bị sẽ cho phép máy khách truyền thông liên lạc với máy chủ truyền thông thông qua NAT."
            }, {
                type: "name",
                title: "H 323 ALG",
                content: "Chọn hộp chọn để kích hoạt tính năng H323 ALG để cho phép máy khách Microsoft NetMeeting truyền tải dữ liệu qua NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Chọn hộp chọn để kích hoạt tính năng SIP ALG để cho phép máy khách và máy chủ SIP truyền tải dữ liệu qua NAT."
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm để lưu tất cả cài đặt của bạn."
            }]
        },
        virtualServer: {
            TITLE: "Máy chủ ảo",
            CONTENT: [{
                type: "paragraph",
                content: "Máy chủ ảo được sử dụng để thiết lập các dịch vụ công cộng trong mạng nội bộ của bạn. Một máy chủ ảo được định nghĩa là một cổng ngoài, và tất cả các yêu cầu từ Internet đến cổng ngoài này sẽ được định hướng lại đến một máy tính đã được cấu hình với địa chỉ IP tĩnh hoặc dành riêng được chỉ định."
            }, {
                type: "name",
                title: "Dạng dịch vụ",
                content: "Hiển thị tên máy chủ ảo của bạn."
            }, {
                type: "name",
                title: "Cổng ngoài",
                content: "Hiển thị số cổng hoặc khoảng cổng được sử dụng bởi máy chủ ảo."
            }, {
                type: "name",
                title: "IP nội bộ",
                content: "Hiển thị địa chỉ IP của máy tính chạy ứng dụng dịch vụ."
            }, {
                type: "name",
                title: "Cảng nội",
                content: "Hiển thị số cổng của máy tính chạy ứng dụng dịch vụ."
            }, {
                type: "name",
                title: "Giao thức",
                content: "Hiển thị giao thức sử dụng cho ứng dụng dịch vụ: TCP, UDP, hoặc Tất cả (Tất cả các giao thức được router hỗ trợ)."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Báo hiệu trạng thái hiện tại của máy chủ ảo. Bấm chọn biểu tượng Bóng đèn để kích hoạt (hoặc vô hiệu hóa) mục máy chủ ảo."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để Tùy chỉnh hoặc Xóa điều luật tương ứng."
            }, {
                type: "note",
                title: "<strong> Để thêm một mục nhập máy chủ ảo </strong>",
                content: [
                    "Bấm chọn Thêm.",
                    "Chọn một tên giao diện từ danh sách thả xuống.",
                    "Bấm chọn Xem ứng dụng hiện có để chọn một dịch vụ từ danh sách để tự động nhập số cổng tương ứng vào mục Cổng ngoài và Cổng trong. Nếu dịch vụ không được liệt kê trong danh sách, nhập số cổng ngoài (ví dụ: 21) hoặc một dãi cổng (ví dụ: 21-25). Để mục Cổng trong trống nếu Cổng trong giống Cổng ngoài hoặc nhập số cổng (ví dụ: 21) nếu Cổng ngoài là cổng đơn.",
                    "Nhập địa chỉ IP của máy tính chạy ứng dụng dịch vụ theo định dạng thập phân có dấu chấm vào mục IP nội bộ.",
                    "Chọn một giao thức cho ứng dụng dịch vụ: TCP, UDP, hoặc Tất cả từ danh sách Giao thức thả xuống.",
                    "Chọn Kích hoạt mục này.",
                    "Bấm chọn OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Để tùy chỉnh hoặc xóa một mục máy chủ ảo</strong><br>Bấm chọn biểu tượng Chỉnh sửa hoặc Thùng rác của mục tương ứng."
            }, {
                type: "paragraph",
                content: "<strong>Để xóa nhiều mục</strong><br>Chọn tất cả các mục máy chủ ảo bạn muốn xóa, bấm chọn Xóa trên bảng."
            }, {
                type: "paragraph",
                content: "<strong>Lưu ý:</strong><br>Nếu thiết bị máy chủ nội bộ của bạn làm máy chủ cho nhiều hơn một dạng dịch vụ khả dụng, bạn cần phải tại một máy chủ ảo chỗ mỗi dịch vụ."
            }]
        },
        portTrigger: {
            TITLE: "Kích hoạt cổng",
            CONTENT: [{
                type: "paragraph",
                content: "Kích hoạt cổng được sử dụng để chuyển tiếp lưu lượng trên một cổng đến một máy chủ xác định trong mạng."
            }, {
                type: "name",
                title: "Ứng dụng",
                content: "Hiển thị tên của ứng dụng."
            }, {
                type: "name",
                title: "Cổng kích hoạt",
                content: "Hiển thị cổng lưu lượng gửi đi được sử dụng để kích hoạt một điều luật lọc của một kết nối gửi đi."
            }, {
                type: "name",
                title: "Giao thức  kích hoạt",
                content: "Hiển thị giao thức được sử dụng cho Cổng kích hoạt. TCP, UDP, hoặc Tất cả (Tất cả các giao thức mà router hỗ trợ)."
            }, {
                type: "name",
                title: "Cổng ngoài",
                content: "Hiển thị cổng hoặc khoảng cổng được sử dụng bởi hệ thống từ xa. Một phản hồi sử dụng một trong số những cổng đó sẽ được chuyển tiếp đến máy tính kích hoạt điều luật này. Bạn có thể nhập tối đa 5 nhóm cổng (hoặc mục cổng). Mỗi nhóm cổng sẽ được phân cách bởi dấu phẩy, ví dụ, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Giao thức ngoài",
                content: "Hiển thị giao thức được sử dụng cho Cổng gửi đến: TCP, UDP, hoặc Tất cả (Tất cả các giao thức mà router hỗ trợ)."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Báo hiệu trạng thái hiện tại của mục kích hoạt cổng. Bấm chọn biểu tượng Bóng đèn để kích hoạt (hoặc vô hiệu hóa) mục này."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để Tùy chỉnh hoặc Xóa mục tương ứng."
            }, {
                type: "note",
                title: "<strong> Để thiết lập một cổng kích hoạt mục </strong> <br> <strong> Lưu ý: </strong> Mỗi mục chỉ có thể được sử dụng bởi một máy chủ tại một thời điểm.",
                content: [
                    "Bấm chọn Thêm.",
                    "Chọn một tên giao diện từ danh sách thả xuống.",
                    "Bấm chọn Xem ứng dụng hiện có để chọn một ứng dụng từ danh sách để tự động nhập giá trị mặc định vào ô tương ứng. Nếu bạn muốn thêm một ứng dụng ngoài danh sách, vui lòng nhập Ứng dụng, Cổng kích hoạt, Giao thức kích hoạt, Cổng ngoài và Giao thức ngoài theo cách thủ công. <br><strong>Lưu ý: </strong> Mục Kích hoạt cổng không thể có bất cứ khoảng cổng nào chồng lấp nhau (ví dụ: Mục 1 có khoảng cổng 4200-4205, có nghĩa là Mục 2 không thể có khoảng cổng 4203-4206).",
                    "Chọn Kích hoạt mục này.",
                    "Bấm chọn OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Để tùy chỉnh hoặc xóa một mục kích hoạt cổng</strong><br>Bấm chọn biểu tượng Chỉnh sửa hoặc Thùng rác của mục tương ứng với mục bạn muốn tùy chỉnh hoặc xóa."
            }, {
                type: "paragraph",
                content: "<strong>Để xóa nhiều mục kích hoạt cổng</strong><br>Trong bảng, chọn tất cả các mục bạn muốn xóa, bấm chọn Xóa trên bảng."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "Tính năng máy chủ DMZ (Demilitarized Zone) cho phép một máy chủ cục bộ giao tiếp với Internet cho một dịch vụ mục đích đặc biệt, như là Trò chơi Internet hoặc hội thảo video. Một cách cơ bản, DMZ cho phép một máy tính đơn trong mạng LAN mở tất cả các cổng của nó. Máy tính này cần được cấu hình với một địa chỉ IP tĩnh và tính năng máy khách DHCP của nó phải được vô hiệu hóa."
            }, {
                type: "note",
                title: "<strong> Để chỉ định một máy tính hoặc máy chủ là một máy chủ DMZ </strong>",
                content: [
                    "Chọn Kích hoạt DMZ",
                    "Nhập địa chỉ IP của máy tính cục bộ được chọn làm máy chủ DMZ.",
                    "Bấm chọn Lưu."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Mặc định, tính năng Universal Plug-and-Play (UPnP) được kích hoạt để cho phép các thiết bị, như máy tính và các thiết bị Internet, tự động tìm thấy và liên lạc với nhau trong mạng nội bộ."
            }, {
                type: "name",
                title: "UPnP",
                content: "Chuyển sang Mở để kích hoạt tính năng UPnP."
            }, {
                type: "title",
                content: "Danh sách Dịch vụ UPnP."
            }, {
                type: "paragraph",
                content: "Danh sách Dịch vụ UPnP hiển thị thông tin thiết bị UPnP."
            }, {
                type: "name",
                title: "Tổng số máy khách",
                content: "Hiển thị tổng số thiết bị UPnP."
            }, {
                type: "name",
                title: "Dịch vụ Mô tả",
                content: "Hiển thị một mô tả ngắn gọn của máy chủ cục bộ khởi tạo yêu cầu UPnP."
            }, {
                type: "name",
                title: "Cổng ngoài",
                content: "Hiển thị cổng ngoài được mở bởi máy chủ cục bộ."
            }, {
                type: "name",
                title: "Giao thức",
                content: "Hiển thị dạng giao thức mạng được sử dụng bởi máy chủ cục bộ."
            }, {
                type: "name",
                title: "Địa chỉ IP nội bộ",
                content: "Hiển thị địa chỉ IP của máy chủ cục bộ."
            }, {
                type: "name",
                title: "Cảng nội",
                content: "Hiển thị cổng trong được mở bới máy chủ cục bộ."
            }, {
                type: "paragraph",
                content: "Bấm chọn <strong>Làm mới</strong> để cập nhật Danh sách máy chủ UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Mạng khách",
            CONTENT: [{
                type: "paragraph",
                content: "Mạng khách cho phép bạn thiết lập một mạng không dây riêng biệt với tên không dây (SSID) và mật mã riêng biệt để khách của bạn có thể sử dụng để truy cập Internet."
            }, {
                type: "title",
                content: "Cài đặt"
            }, {
                type: "name",
                title: "Cho phép máy khách nhìn thấy nhau",
                content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách liên lạc với nhau."
            }, {
                type: "name",
                title: "Cho phép khách truy cập mạng nội bộ của tôi",
                content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách truy cập mạng nội bộ của bạn."
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm để lưu tất cả cài đặt của bạn."
            }, {
                type: "title",
                content: "Cài đặt không dây."
            }, {
                type: "name",
                title: "Mạng không dây 2.4GHz | 5GHz",
                content: "Bấm nút tương ứng để kích hoạt Mạng khách 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID mạng khách",
                content: "Hoặc sử dụng SSID mặc định hoặc tạo một tên mới sử dụng 1 đến 32 ký tự. Mục này phân biệt chữ hoa và chữ thường."
            }, {
                type: "name",
                title: "Bảo vệ",
                content: "Chọn tùy chọn bảo mật cho Mạng khách:",
                children: [{
                    type: "name",
                    title: "Không",
                    content: "Mặc định, bảo mật Mạng khách được cài đặt là Không; bất cứ ai cũng có thể truy cập."
                }, {
                    type: "name",
                    title: "WPA / WPA2 - Cá nhân",
                    content: "Chọn tùy chọn này để kích hoạt phương pháp xác thực chuẩn dựa trên một Pre-shared Key (PSK), còn được gọi là mật mã. Nếu chọn, cấu hình các mục sau.",
                    children: [{
                        type: "name",
                        title: "Phiên bản",
                        content: "Chọn phiên bản bảo mật cho Mạng khách của bạn.",
                        children: [{
                            type: "name",
                            title: "xe hơi",
                            content: "Lựa chọn này hỗ trợ đa thực thi của chuẩn WPA (Wi-Fi Protected Access), là WPA và WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Tùy chọn này hỗ trợ mã hóa AES cung cấp cấp độ bảo mật tốt hơn WPA-PSK và được khuyến nghị."
                        }]
                    }, {
                        type: "name",
                        title: "Mã hóa",
                        content: "Chọn một dạng mã hóa bảo mật: Tự động (cả TKIP và AES), TKIP (Temporal Key Integrity Protocol), hoặc AES (Advanced Encryption Standard). Chúng tôi không khuyến nghị sử dụng mã hóa TKIP nếu router hoạt động ở chế độ 802.11n, vì TKIP không được kỹ thuật 802.11n hỗ trợ. Nếu TKIP được chọn, tính năng WPS sẽ bị vô hiệu hóa."
                    }]
                }]
            }, {
                type: "name",
                title: "Mật mã",
                content: "Tạo một mật mã có từ 8 đến 63 ký tự ASCII hoặc 8 đến 64 ký tự thập lục phân (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "Hướng dẫn cho Mạng khách 2.4GHz ở trên cũng được áp dụng cho Mạng khách 5GHz."
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm để lưu tất cả cài đặt của bạn."
            }]
        },
        wirelessStat: {
            TITLE: "Thiết bị trực tuyến",
            CONTENT: [{
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC của máy khách không dây tương ứng."
            }, {
                type: "name",
                title: "Dạng kết nối",
                content: "Hiển thị băng tần (2.4GHz hoặc 5GHz) máy khách không dây đã kết nối đến."
            }, {
                type: "name",
                title: "Bảo vệ",
                content: "Hiển thị dạng bảo mật (Không, WEP, WPA/WPA2-Cá nhân, hoặc WPA/WPA2-Doanh nghiệp) của máy khách không dây tương ứng."
            }, {
                type: "name",
                title: "Các gói tin đã nhận",
                content: "Hiển thị số gói tin máy khách không dây tương ứng đã nhận."
            }, {
                type: "name",
                title: "Các gói tin gửi",
                content: "Hiển thị số gói tin máy khách không dây tương ứng đã gửi."
            }, {
				type: "name",
				title: "Tốc độ truyền tải",
				content: "Hiển thị tốc độ của gói tin cuối do máy khách không dây tương ứng nhận được."
			}, {
                type: "paragraph",
                content: "Bấm chọn <strong>Làm mới</strong> để cập nhật thông tin trang này."
            }]
        },
        wirelessAdv: {
            TITLE: "Cài đặt nâng cao",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Chọn 2.4GHz | 5GHz để thiết lập cài đặt không dây nâng cao."
            }, {
                type: "name",
                title: "Beacon Interval",
                content: "Nhập một giá trị từ 25 đến 1000 mili giây để xác định khoảng thời gian giữa các gói tin beacon được router quảng bá để đồng bộ mạng không dây. Giá trị mặc định là 100 mili giây."
            }, {
                type: "name",
                title: "RTS Threshold",
                content: "Nhập một giá trị từ 1 đến 2346 để xác định kích thước gói tin của truyền tải dữ liệu qua router. Mặc định, kích thước Ngưỡng RTS (Request to Send) là 2346. Nếu kích thước gói tin lớn hơn ngưỡng cài trước, router sẽ gửi khung Request to Send đến một trạm nhận đặc biệt và xác định khung dữ liệu gửi đi, ngược lại gói tin sẽ được gửi đi ngay lập tức."
            }, {
                type: "name",
                title: "DTIM Interval",
                content: "Nhập một giá trị từ 1 đến 255 để xác định khoảng thời gian của báo giao hàng Traffic Indication (DTIM). 1 cho biết các DTIM Interval là giống như Beacon Interval."
            }, {
                type: "name",
                title: "Nhóm chính Cập nhật Thời gian",
                content: "Nhập số giây (nhỏ nhất là 30) để kiểm soát khoảng thời gian mã mã hóa tự động gia hạn. Giá trị mặc định là 0, nghĩa là mã không tự gia hạn."
            }, {
                type: "name",
                title: "WMM",
                content: "Tính năng này đảm bảo gói tin với độ ưu tiên cao được ưu tiên truyền trước. WMM bắt buộc phải được kích hoạt ở chế độ 802.11n hoặc 802.11ac. Chúng tôi rất khuyến nghị kích hoạt WMM."
            }, {
                type: "name",
                title: "Short GI",
                content: "Tính năng này mặc định được kích hoạt và khuyến nghị để tăng dung lượng dữ liệu bằng cách giảm thời gian Guard Interval (GI)."
            }, {
                type: "name",
                title: "Cô lập AP",
                content: "Chọn hộp chọn này để kích hoạt tính năng Cô lập AP, cho phép bạn giới hạn và hạn chế tất cả các thiết bị không dây trong mạng của bạn tương tác với nhau, nhưng vẫn có thể truy cập Internet. Cô lập AP mặc định bị vô hiệu hóa."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "Cầu nối WDS",
                content: "Chọn hộp chọn này để kích hoạt tính năng Cầu nối WDS (Wireless Distribution System) để cho phép router bắt cầu với một điểm truy cập (AP) trong một mạng không dây nội bộ (WLAN). Nếu được kích hoạt, cấu hình như bên dưới:"
            }, {
                type: "name",
                title: "SSID (được bắc cầu)",
                content: "Nhập SSID của WAP (Điểm truy cập  không dây) mà router của bạn sẽ kết nối đến như một máy khách hoặc sử dụng tính năng Khảo sát để quét và hiển thị tất cả mạng khả dụng trong khu vực."
            }, {
                type: "name",
                title: "Địa chỉ MAC (được bắc cầu)",
                content: "Nhập 12 ký tự địa chỉ MAC theo định dạng thập lục phân (0-9, a-f, A-F) phân cách bằng dấu gạch giữa của WAP mà router sẽ kết nối đến như một máy khách. Nếu bạn chọn một mạng thông qua tính năng Khảo sát, địa chỉ MAC sẽ được điền tự động."
            }, {
                type: "name",
                title: "Khảo sát",
                content: "Bấm nút này để quét và hiển thị thông tin địa chỉ MAC, SSID, cường độ tín hiệu, kênh, và bảo mật của tất cả các mạng không dây khả dụng trong khu vực. Một khi bạn đã chọn một mạng, SSID, địa chỉ MAC, và Bảo mật sẽ được điền tự động.",
                children: [{
                    type: "name",
                    title: "Danh sách AP",
                    content: "Hiển thị thông tin của AP mà router của bạn kết nối đến."
                }, {
                    type: "name",
                    title: "Địa chỉ MAC",
                    content: "Hiển thị địa chỉ MAC của AP mà router của bạn sẽ kết nối đến như là một máy khách."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Hiển thị SSID của AP mà router của bạn sẽ kết nối đến như một máy khách."
                }, {
                    type: "name",
                    title: "Cường độ tín hiệu",
                    content: "Hiển thị Cường độ tín hiệu của AP mà router của bạn sẽ kết nối đến như một máy khách."
                }, {
                    type: "name",
                    title: "Kênh",
                    content: "Hiển thị Kênh của AP mà router của bạn sẽ kết nối đến như một máy khách."
                }, {
                    type: "name",
                    title: "Mã hóa",
                    content: "Hiển thị Mã hóa của AP mà router của bạn sẽ kết nối đến như một máy khách."
                }, {
                    type: "name",
                    title: "Kết nối",
                    content: "Bấm chọn biểu tượng để kết nối hoặc ngắt kết nối từ AP tương ứng."
                }]
            }, {
                type: "name",
                title: "Bảo vệ",
                content: "Chọn một trong số các tùy chọn bảo mật sau:",
                children: [{
                    type: "name",
                    title: "Không bảo mật",
                    content: "Chọn hộp chọn này để vô hiệu hóa bảo mật không dây. Chúng tôi rất khuyến nghị bạn kích hoạt bảo mật không dây để bảo vệ mạng không dây khỏi các truy cập trái phép."
                }, {
                    type: "name",
                    title: "WPA / WPA2 Cá nhân",
                    content: "Chọn hộp chọn này để kích hoạt phương pháp xác thực chuẩn dựa trên Pre-shared Key (PSK), còn được gọi là mật mã. Lựa chọn này được khuyến nghị. Nếu được chọn, cấu hình như sau. ",
                    children: [{
                        type: "name",
                        title: "Phiên bản",
                        content: "Chọn phiên bản bảo mật này cho mạng không dây của bạn.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Tùy chọn này hỗ trợ mã hóa AES cung cấp cấp độ bảo mật thấp hơn WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Lựa chọn hỗ trợ mã hóa AES cung cấp cấp độ bảo mật tốt hơn WPA-PSK, và được khuyến nghị."
                        }]
                    }, {
                        type: "name",
                        title: "Mã hóa",
                        content: "Chọn một dạng mã hóa bảo mật: TKIP (Temporal Key Integrity Protocol), hoặc AES (Advanced Encryption Standard). Chúng tôi không khuyến nghị sử dụng mã hóa TKIP nếu router hoạt động ở chế độ 802.11n, vì TKIP không được kỹ thuật 802.11n hỗ trợ. Nếu TKIP được chọn, tính năng WPS sẽ bị vô hiệu hóa."
                    }, {
                        type: "name",
                        title: "Mật mã",
                        content: "Nhập một mật mã không dây có từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký tự thập lục phân vào mục này."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Chọn tùy chọn này để kích hoạt phương pháp xác thực cơ bản nếu bất cứ phiên bản của thiết bị máy khách của bạn chỉ có thể truy cập mạng không dây bằng mã WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Kiểu",
                        content: "Chọn dạng xác thực cho mạng không dây. Chọn Hệ thống mở hoặc Mật mã chia sẻ dựa trên năng lực và yêu cầu truy cập của máy khách không dây."
                    }, {
                        type: "name",
                        title: "Định dạng WEP Key",
                        content: "Hoặc chọn định dạng ASCII hoặc Thập lục phân. Định dạng ASCII là sự kết hợp của chữ cái và ký tự số. Định dạng Thập lục phân là sự kết hợp của số (0-9) và ký tự (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Chỉ số chính",
                        content: "Chọn một trong bốn mật mã sẽ được dùng và nhập đúng mật mã WEP mà bạn đã tạo trong mục Giá trị mật mã. Vui lòng đảm bảo các giá trị này giống nhau trên tất cả các thiết bị không dây trong mạng của bạn."
                    }, {
                        type: "name",
                        title: "Giá trị cốt lõi",
                        content: "Nhập đúng mật mã WEP mà bạn đãn tạo."
                    }]
                }]
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm chọn để lưu cài đặt."
            }]
        },
        wirelessSchedule: {
            TITLE: "Thời gian biểu không dây",
            CONTENT: [{
                type: "paragraph",
                content: "Thời gian biểu hiệu lực dựa trên thời gian của router. Thời gian có thể được chỉnh tại mục Công cụ hệ thống -> Cài đặt thời gian"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Chọn 2.4GHz or 5GHz để cài đặt thời gian biểu không dây tương ứng."
            }, {
                type: "name",
                title: "Thời gian biểu không dây",
                content: "Chuyển sang Mở để kích hoạt tính năng này. Sau đó, bấm và kéo ngang các ô để thiết lập khoảng thời gian để tắt tính năng không dây."
            }, {
                type: "name",
                title: "khôi phục",
                content: "Bấm để chọn thời gian."
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm chọn để lưu cài đặt."
            }]
        },
        macFilter: {
            TITLE: "Cài đặt lọc địa chỉ MAC",
            CONTENT: [{
                type: "name",
                title: "Lọc địa chỉ MAC",
                content: "Chuyển sang Mở để kiểm soát truy cập không dây sử dụng địa chỉ MAC của thiết bị cá nhân."
            }, {
                type: "title",
                title: "Điều luật lọc"
            }, {
                type: "name",
                title: "Chặn truy cập không dây từ các thiết bị trong danh sách dưới đây.",
                content: "Chọn để chặn truy cập không dây từ thiết bị trong danh sách bên dưới"
            }, {
                type: "name",
                title: "Cho phép truy cập không dây từ các thiết bị duy nhất trong danh sách dưới đây.",
                content: "Chọn để chỉ cho phép truy cập không dây từ các thiết bị trong danh sách bên dưới."
            }, {
                type: "title",
                title: "Danh sách thiết bị"
            }, {
                type: "name",
                title: "Địa chỉ MAC / Mô tả",
                content: "Hiển thị địa chỉ MAC và mô tả của thiết bị."
            }, {
                type: "name",
                title: "Kích hoạt",
                content: "Bấm chọn biểu tượng Bóng đèn để kích hoạt hoặc vô hiệu hóa tính năng Lọc địa chỉ MAC của thiết bị."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để Tùy chỉnh hoặc Xóa mục tương ứng."
            }, {
                type: "note",
                title: "Để thêm một thiết bị mới",
                content: [
                    "Bấm chọn Thêm.",
                    "Nhập địa chỉ MAC của thiết bị.",
                    "Nhập một mô tả của thiết bị.",
                    "Bấm chọn Kích hoạt mục này.",
                    "Bấm chọn OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Cài đặt không dây",
            CONTENT: [{
                type: "name",
                title: "Kết nối thông minh",
                content: "Chọn hộp chọn này để kích hoạt Kết nối thông minh. Chức năng này giúp thiết bị chạy nhanh hơn bằng cách sử dụng băng tần không dây tốt nhất dựa trên tình trạng thực tế để cần bằng nhu cầu mạng."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Chọn 2.4GHz | 5GHz để thay đổi cài đặt tương ứng."
            }, {
                type: "name",
                title: "Vô tuyến không dây",
                content: "Chọn hộp chọn này để kích hoạt tần số vô tuyến không dây 2.4GHz | 5GHz ."
            }, {
                type: "name",
                title: "Tên mạng không dây (SSID)",
                content: "Bạn có thể dùng tên mạng mặc địng (SSID), hoặc tạo một tên mới (lên đến 32 ký tự). Mục này phân biệt chữ hoa và chữ thường."
            }, {
                type: "name",
                title: "ẩn SSID",
                content: "Chọn hộp chọn này nếu bạn muốn giấu tên mạng (SSID) 2.4GHz | 5GHz khỏi danh sách mạng Wi-Fi."
            }, {
                type: "name",
                title: "Bảo vệ",
                content: "Chọn một trong số các tùy chọn bảo mật sau:",
                children: [{
                    type: "name",
                    title: "Không bảo mật",
                    content: "Chọn hộp chọn này để vô hiệu hóa bảo mật không dây. Chúng tôi rất khuyến nghị bạn kích hoạt bảo mật không dây để bảo vệ mạng không dây khỏi các truy cập trái phép."
                }, {
                    type: "name",
                    title: "WPA / WPA2 Cá nhân",
                    content: "Chọn hộp chọn này để kích hoạt phương pháp xác thực chuẩn dựa trên Pre-shared Key (PSK), còn được gọi là mật mã. Lựa chọn này được khuyến nghị. Nếu được chọn, cấu hình như sau. ",
                    children: [{
                        type: "name",
                        title: "Phiên bản",
                        content: "Chọn phiên bản bảo mật này cho mạng không dây của bạn.",
                        children: [{
                            type: "name",
                            title: "xe hơi",
                            content: "Lựa chọn này hỗ trợ đa thực thi của chuẩn WPA (Wi-Fi Protected Access), là WPA và WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Lựa chọn hỗ trợ mã hóa AES cung cấp cấp độ bảo mật tốt hơn WPA-PSK, và được khuyến nghị."
                        }]
                    }, {
                        type: "name",
                        title: "Mã hóa",
                        content: "Chọn một dạng mã hóa bảo mật: Tự động (cả TKIP và AES), TKIP (Temporal Key Integrity Protocol), hoặc AES (Advanced Encryption Standard). Chúng tôi không khuyến nghị sử dụng mã hóa TKIP nếu router hoạt động ở chế độ 802.11n, vì TKIP không được kỹ thuật 802.11n hỗ trợ. Nếu TKIP được chọn, tính năng WPS sẽ bị vô hiệu hóa."
                    }, {
                        type: "name",
                        title: "Mật mã",
                        content: "Tạo một mật mã có từ 8 đến 63 ký tự ASCII hoặc 8 đến 64 ký tự thập lục phân vào trường này."
                    }]
                }, {
                    type: "name",
                    title: "WPA / WPA2 Enterprise",
                    content: "Chọn tùy chọn này để kích hoạt phương pháp xác thực cao cấp hơn sử dụng máy chủ RADIUS (Remote Authentication Dial In User Service). Nếu được chọn, tính năng WPS sẽ bị vô hiệu hóa.",
                    children: [{
                        type: "name",
                        title: "Phiên bản",
                        content: "Chọn phiên bản bảo mật này cho mạng không dây của bạn.",
                        children: [{
                            type: "name",
                            title: "xe hơi",
                            content: "Lựa chọn này hỗ trợ đa thực thi của chuẩn WPA (Wi-Fi Protected Access), là WPA và WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Lựa chọn hỗ trợ mã hóa AES cung cấp cấp độ bảo mật tốt hơn WPA, và được khuyến nghị."
                        }]
                    }, {
                        type: "name",
                        title: "Mã hóa",
                        content: "Chọn một dạng mã hóa bảo mật: Tự động (cả TKIP và AES), TKIP (Temporal Key Integrity Protocol), hoặc AES (Advanced Encryption Standard). Chúng tôi không khuyến nghị sử dụng mã hóa TKIP nếu router hoạt động ở chế độ 802.11n, vì TKIP không được kỹ thuật 802.11n hỗ trợ. Nếu TKIP được chọn, tính năng WPS sẽ bị vô hiệu hóa."
                    }, {
                        type: "name",
                        title: "RADIUS Server IP",
                        content: "Nhập địa chỉ IP của máy chủ RADIUS."
                    }, {
                        type: "name",
                        title: "Cảng RADIUS Server",
                        content: "Nhập số cổng của máy chủ RADIUS."
                    }, {
                        type: "name",
                        title: "RADIUS Server Password",
                        content: "Nhập mật mã chia sẻ của máy chủ RADIUS"
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Chọn tùy chọn này để kích hoạt phương pháp xác thực cơ bản nếu bất cứ phiên bản của thiết bị máy khách của bạn chỉ có thể truy cập mạng không dây bằng mã WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Kiểu",
                        content: "Chọn một dạng xác thực cho mạng không dây của bạn. Giá trị mặc định là Tự động, thiết bị sẽ tự động chọn Hệ thống mở hay Mật mã chia sẽ dựa trên năng lực và yêu cầu truy cập của máy khách không dây."
                    }, {
                        type: "name",
                        title: "Key được chọn",
                        content: "Chọn một trong bốn mật mã sẽ được dùng và tạo một mã WEP trong mục Giá trị mật mã. Máy khách không dây cần được nhập đúng mã WEP để kết nối đến mạng của bạn."
                    }, {
                        type: "name",
                        title: "Định dạng WEP Key",
                        content: "Hoặc sử dụng định dạng ASCII hoặc định dạng thập lục phân. Định dạng ASCII là sự kết hợp của ký tự chữ cái và ký tự số. Định dạng Thập lục phân là sự kết hợp của số (0-9) và chữ cái (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Loại khóa",
                        content: "Chọn độ dài mã WEP.",
                        children: [{
                            type: "name",
                            title: "mã hóa 64-bit",
                            content: "Cho phép bạn nhập 10 ký tự thập lục phân (0-9, A-F, a-f) hoặc 5 ký tự ASCII vào trường Giá trị WEP."
                        }, {
                            type: "name",
                            title: "mã hóa 128-bit",
                            content: "Cho phép bạn nhập 26 ký tự thập lục phân (0-9, A-F, a-f) hoặc 13 ký tự ASCII vào trường Giá trị WEP."
                        }]
                    }, {
                        type: "name",
                        title: "Giá trị cốt lõi",
                        content: "Tạo một mã WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Chế độ",
                content: "Chọn một chế độ truyền hỗn hợp"
            }, {
                type: "name",
                title: "Kênh",
                content: "Chọn một kênh hoạt động cho mạng không dây. Kênh mặc định là Tự động. Vui lòng không thay đổi trừ khi bạn gặp phải vấn đề về kết nối không dây gián đoạn."
            }, {
                type: "name",
                title: "Độ rộng kênh",
                content: "Chọn một độ rộng kênh (băng thông) cho mạng không dây."
            }, {
                type: "name",
                title: "Truyền điện",
                content: "Chọn hoặc Cao, Trung bình, hoặc Thấp cho công suất truyền tải. Giá trị mặc định và được khuyến nghị là Cao."
            }, {
                type: "paragraph",
                content: "Bấm chọn <strong>Lưu</strong> để lưu cài đặt của bạn."
            }]
        },
        wps: {
            TITLE: "Mã PIN router",
            CONTENT: [{
                type: "name",
                title: "Mã PIN router",
                content: "Chuyển sang Mở để cho phép thiết bị không dây kết nối đến router sử dụng PIN (Personal Identification Number) của router."
            }, {
                type: "name",
                title: "PIN hiện tại",
                content: "Hiển thị mã PIN hiện tại của router. Mã PIN mặc định có thể tìm thấy trên nhãn của router hoặc trong Hướng dẫn sử dụng. Bấm chọn Tạo để tạo mã PIN mới ngẫu nhiên hoặc bấm chọn khôi phục để khôi phục mã PIN hiện tại về lại mã PIN mặc định."
            }, {
                type: "title",
                content: "Cài đặt WPS"
            }, {
                type: "name",
                title: "Nút nhấn (Khuyến nghị)",
                content: "Chọn phương pháp cài đặt này để kích hoạt tính năng WPS để kết nối bất cứ thiết bị nào kích hoạt WPS đến mạng không dây của bạn một cách dễ dàng bằng cách sử dụng nút WPS hoặc bằng cách nhấn nút Kết nối."
            }, {
                type: "name",
                title: "Mã PIN router",
                content: "Chọn phương pháp cài đặt này để thêm một thiết bị theo cách thủ công bằng cách nhập mã PIN WPS của thiết bị không dây vào mục này."
            }, {
                type: "name",
                title: "Kết nối",
                content: "Bấm chọn nút này để khởi tạo WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Quyền kiểm soát của phụ huynh",
            CONTENT: [{
                type: "paragraph",
                content: "Với quyền kiểm soát của phụ huynh, bạn có thể chặn các trang web không phù hợp, xác định và độc hại; hạn chế truy cập tại các thời điểm nhất định trong ngày (ví dụ, Facebook hoặc YouTube khi làm bài)."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Chuyển sang Mở để kích hoạt tính năng quyền kiểm soát của phụ huynh. Mặc định tính năng này bị vô hiệu hóa."
            }, {
                type: "title",
                content: "Thiết bị dưới quyền kiểm soát của phụ huynh"
            }, {
                type: "paragraph",
                content: "Thiết bị dưới quyền kiểm soát của phụ huynh sẽ hiển thị danh sách các thiết bị hiện đang bị giới hạn bởi quyền kiểm soát của phụ huynh."
            }, {
                type: "name",
                title: "Tên thiết bị",
                content: "Hiển thị tên của tất cả các thiết bị máy khách kết nối hiện đang dưới quyền kiểm soát của phụ huynh."
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC của tất cả các thiết bị máy khách kết nối hiện đang dưới quyền kiểm soát của phụ huynh."
            }, {
                type: "name",
                title: "Thời gian hiệu quả",
                content: "Hiển thị khoảng thời gian hạn chế truy cập."
            }, {
                type: "name",
                title: "Mô tả",
                content: "Hiển thị một mô tả ngắn gọn về các thiết bị kết nối."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Cho biết nếu quyền kiểm soát của phụ huynh được kích hoạt cho các thiết bị tương ứng hay không. Bấm chọn biểu tượng Bóng đèn để kích hoạt (hoặc vô hiệu hóa) tính năng này."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để Tùy chỉnh hoặc Xóa các thiết bị tương ứng."
            }, {
                type: "note",
                title: "<String> Để hạn chế một thiết bị khách hàng mới </strong>",
                content: [
                    "Bấm chọn Thêm.",
                    "Bấm chọn Xem các thiết bị hiện có để chọn một thiết bị hiện đang kết nối từ Danh sách thiết bị truy cập; hoặc nhập tên thiết bị và địa chỉ MAC theo cách thủ công để thêm một thiết bị hiện đang không được kết nối.",
                    "Nhấp vào biểu tượng Thời gian hiệu lực để xác định khoảng thời gian các hạn chế được áp dụng.",
                    "Nhập một mô tả ngắn gọn vào Trường mô tả. Trường này là tùy chọn.",
                    "Chọn Kích hoạt.",
                    "Bấm chọn OK để lưu mục này."
                ]
            }, {
                type: "paragraph",
                content: "<b> Để tùy chỉnh hoặc xóa một thiết bị</b><br> Trong các thiết bị trong danh sách quyền kiểm soát của phụ huynh, chỉ đơn giản bấm chọn biểu tượng Chỉnh sửa hoặc biểu tượng Thùng rác tương ứng với thiết bị mà bạn muốn tùy chỉnh hoặc xóa."
            }, {
                type: "paragraph",
                content: "<b> Để xóa nhiều thiết bị</b><br> Trong các thiết bị dưới danh sách quyền kiểm soát của phụ huynh, chọn hộp chọn tương ứng của các thiết bị cần xóa và bấm chọn Xóa trên bảng."
            }, {
                type: "title",
                title: "Nội dung bị hạn chế"
            }, {
                type: "paragraph",
                content: "Nội dung Hạn chế cho phép bạn hạn chế truy cập vào các nội dung sử dụng các từ khóa và tên miền mà các thiết bị khách hàng được kiểm soát bởi quyền kiểm soát của phụ huynh có thể hoặc không thể truy cập tùy thuộc vào dạng hạn chế."
            }, {
                type: "name",
                title: "Dạng hạn chế",
                content: "Chọn dạng hạn chế sau:",
                children: [{
                    type: "name",
                    title: "Danh sách đen",
                    content: "Chứa từ khóa và tên miền sẽ được sử dụng để chặn truy cập trang web từ các thiết bị máy khách được xác định trong danh sách các thiết bị theo quyền kiểm soát của phụ huynh."
                }, {
                    type: "name",
                    title: "Danh sách trắng",
                    content: "Chứa từ khóa và tên miền mà các thiết bị máy khách được xác định trong danh sách các thiết bị theo quyền kiểm soát của phụ huynh được phép truy cập."
                }]
            }, {
                type: "name",
                title: "Thêm một từ khóa mới",
                content: "Bấm chọn để thêm một từ khóa hoặc tên miền mới vào Danh sách đen hoặc Danh sách trắng."
            }, {
                type: "paragraph",
                content: "Để xóa từ khóa hoặc tên miền, bấm chọn biểu tượng - (trừ) bên cạnh mục mà bạn muốn xóa."
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm chọn để lưu lại cấu hình của bạn."
            }]
        },
        parentCtrl: {
            TITLE: "Quyền kiểm soát của phụ huynh",
            CONTENT: [{
                type: "paragraph",
                content: "Với khả năng lọc theo độ tuổi, giới hạn truy cập và hồ sơ người dùng, Quyền kiểm soát của phụ huynh cung cấp cho gia đình bạn quyền truy cập Internet tùy chỉnh và phù hợp."
            }, {
                type: "note",
                title: "<strong>Để áp dụng Quyền kiểm soát của phụ huynh cho một thiết bị mới</strong>",
                content: [
                    "Bấm chọn Thêm.",
                    "Nhập tên cho hồ sơ này và bấm chọn \"+\" để thêm thiết bị cho hồ sơ này.",
                    "Chọn một Cấp độ lọc và tùy chỉnh nội dung lọc tùy theo yêu cầu của bạn. Bạn có thể nhập từ khóa để tìm kiếm một trang web mà bạn muốn lọc trong cơ sở dữ liệu của chúng tôi. Các trang web khác (URL) có thể được nhập theo cách thủ công. <br/> Tham khảo các giải thích bên dưới cho các danh mục lọc khác nhau:<p>Nội dung người lớn - Các trang web chứa nội dung đồi trụy, có hại hoặc nội dung bất hợp pháp bao gồm nội dung khiêu dâm, sử dụng chất gây nghiện, bạo lực và phân biệt đối xử</p><p>Cờ bạc - Trang web quảng bá hoặc cung cấp thông tin về cờ bạc, bao gồm cả các trang cờ bạc trực tuyến</p><p>Giao dục giới tính - Các trang web thảo luận về thông tin tình dục, bao gồm sinh sản, tình dục, tình dục an toàn và kiểm soát sinh sản, các bệnh lây lan qua đường tình dục và các ứng phó với các chấn thương tình dục</p><p>Liên lạc trực tuyến - Các trang web có máy chủ liên lạc với các trang web khác thông qua văn bản, thoại hoặc video, bao gồm email, diễn đàn trực tuyến, VoIP và các dịch vụ chat video</p><p>Mạng xã hội - Các trang web thể hiện cảm xác cá nhân hoặc thông tin liên lạc, kết nối mọi người và hoạt động cá nhân của họ dựa trên sở thích, nghề nghiệp, quê quán hoặc mối quan hệ thực tế</p><p>Chi trả để lướt - Trang web yêu cầu người dùng xem các trang web khác, hoặc tin nhắn email, hoặc quảng cáo, yêu cầu đường dẫn hoặc phản hồi khảo sát</p><p>Đa phương tiện - Trang Web cung cấp nội dung video hoặc âm thanh có phí hoặc miễn phí, bao gồm các dịch vụ trực tuyến, chương trình truyền hình hoặc tải nhạc</p><p>Tải về - Trang web cung cấp truy cập chia sẻ và phân phối tập tin, bao gồm chia sẻ điểm điểm, lưu trữ trực tuyến và nội dung thiết bị di động (ví dụ: nhạc & ứng dụng)</p><p>Trò chơi - Trang web cung cấp truy cập đến các máy chủ trò chơi web hoặc tải về, bao gồm trò chơi trực tuyến, mạng trò chơi console và trò chơi trên trình duyệt</p>",
                    "Nếu bạn muốn giới hạn tổng thời gian hồ sơ này có thể truy cập, vui lòng kích hoạt và xác định Thời gian giới hạn. Bạn cũng có thể sử dụng Thời gian ngủ để cài đặt khoảng thời gian hằng ngày mà các thiết bị trong hồ sơ này có thể sử dụng Internet.",
                    "5.Bấm Lưu."
                ]
            }, {
                type: "note",
                title: "<strong>Để xem lịch sử internet chi tiết của hồ sơ</strong>",
                content: [
                    "Ở cột Chi tiết, bấm chọn nút Chi tiết tương ứng.",
                    "Nếu bạn muốn xem thêm hồ sơ, bấm chọn nút Lịch sử<span class=\"ptl-ctr-help-icon history\"></span>.",
                    "Bạn có thể chặn hoặc bỏ chặn trang web bằng cách bấm nút <span class=\"ptl-ctr-help-icon block\"></span> hoặc nút <span class=\"ptl-ctr-help-icon unblock\"></span>."
                ]
            }, {
                type: "note",
                title: "<strong>Để vô hiệu hóa hoặc kích hoạt truy cập Internet ngay lập tức</strong>",
                content: [
                    "Tại cột Truy cập Internet, bấm chọn <span class=\"ptl-ctr-help-icon stop\"></span> để dừng thiết bị trong hồ sơ tương ứng truy cập internet và chọn <span class=\"ptl-ctr-help-icon enable\"></span> để kích hoạt lại truy cập."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "Tính năng QoS (Quality of Service) xác định độ ưu tiên cho các hoạt động và thiết bị để đảm bảo kết nối mạng nhanh hơn khi bạn cần."
            }, {
                type: "paragraph",
                content: "Chọn Ứng dụng ưu tiên để ưu tiên tốc độ mạng cho các hoạt động trực tuyến, và chọn Thiết bị ưu tiên để ưu tiên tốc độ mạng cho thiết bị."
            }, {
                type: "title",
                content: "Ứng dụng ưu tiên"
            }, {
                type: "paragraph",
                content: "Chọn hoạt động trực tuyến bạn muốn ưu tiên hoặc bấm chọn Tùy chỉnh để cài đặt cấp độ ưu tiên của mỗi hoạt động trực tuyến"
            }, {
                type: "title",
                content: "Thiết bị ưu tiên"
            }, {
                type: "paragraph",
                content: "Chọn thiết bị bạn muốn ưu tiên và thời gian thiết bị đó được ưu tiên."
            }, {
                type: "note",
                title: "<strong>Để ưu tiên một thiết bị</strong>",
                content: [
                    "Tìm thiết bị bạn muốn ưu tiên trong danh sách và mở tính năng Ưu tiên.",
                    "Chọn thời gian thiết bị được ưu tiên trong cột Thời gian."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Diệt virus",
            CONTENT: [{
                type: "paragraph",
                content: "Với việc quét mạng, phát hiện trang web độc hại và cô lập thiết bị nhiễm virus thường xuyên, tính năng Diệt virus giúp bảo mật thông tin cá nhân. Bạn cũng có thể kiểm tra mạng của bạn có được bảo mật không, và đã có cuộc tấn công nào vào mạng của bạn không."
            }, {
                type: "paragraph",
                content: "Lịch sử - Lưu lại thông tin thiết bị đã được bảo vệ bởi tính năng Diệt Virus và nguồn gốc và phân loại của cuộc tấn công."
            }, {
                type: "paragraph",
                content: "Kích hoạt tất cả - Chạm để kích hoạt tất cả Dạng bảo vệ nếu một hoặc vài dạng bảo vệ chưa được kích hoạt."
            }, {
                type: "paragraph",
                content: "Dạng bảo vệ - Kích hoạt Dạng bảo vệ bằng cách tham khảo các hướng dẫn. Chúng tôi khuyến nghị kích hoạt tất cả các dạng bảo vệ."
            }]
        },
        applicationPriority: {
            TITLE: "Ứng dụng ưu tiên",
            CONTENT: [{
                type: "paragraph",
                content: "Tính năng Ứng dụng ưu tiên ưu tiên các hoạt động trực tuyến để đảm bảo kết nối mạng nhanh hơn khi bạn cần. Chọn hoạt động trực tuyến bạn muốn ưu tiên hoặc bấm chọn Tùy chỉnh để cài đặt độ ưu tiên cho các hoạt động trực tuyến."
            }]
        },
        devicePriority: {
            TITLE: "Thiết bị ưu tiên",
            CONTENT: [{
                type: "paragraph",
                content: "Tính năng Thiết bị ưu tiên ưu tiên thiết bị để đảm bảo kết nối mạng nhanh hơn khi bạn cần. Chọn thiết bị bạn muốn ưu tiên và thời gian ưu tiên cho thiết bị đó."
            }, {
                type: "note",
                title: "<strong>Để ưu tiên một thiết bị</strong>",
                content: [
                    "Tìm thiết bị bạn muốn ưu tiên trong danh sách và mở tính năng Ưu tiên.",
                    "Chọn thời gian thiết bị được ưu tiên trong cột Thời gian."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Mạng khách",
            CONTENT: [{
                type: "paragraph",
                content: "Mạng khách cho phép bạn thiết lập một mạng không dây riêng biệt với tên không dây (SSID) và mật mã riêng biệt để khách của bạn có thể sử dụng để truy cập Internet."
            }, {
                type: "name",
                title: "Cho phép máy khách nhìn thấy nhau",
                content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách liên lạc với nhau."
            }, {
                type: "name",
                title: "Cho phép khách truy cập mạng nội bộ của tôi",
                content: "Chọn hộp chọn này để cho phép thiết bị không dây trong Mạng khách truy cập mạng nội bộ của bạn."
            }, {
                type: "name",
                title: "Mạng không dây 2.4GHz | 5GHz",
                content: "Bấm nút tương ứng để kích hoạt Mạng khách 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID mạng khách",
                content: "Hoặc sử dụng SSID mặc định hoặc tạo một tên mới sử dụng 1 đến 32 ký tự. Mục này phân biệt chữ hoa và chữ thường."
            }, {
                type: "name",
                title: "ẩn SSID",
                content: "Chọn hộp chọn này nếu bạn muốn giấu SSID Mạng khách."
            }, {
                type: "name",
                title: "Bảo vệ",
                content: "Chọn tùy chọn bảo mật cho Mạng khách:",
                children: [{
                    type: "name",
                    title: "Không bảo mật",
                    content: "Mặc định, bảo mật Mạng khách được cài đặt là Không; bất cứ ai cũng có thể truy cập."
                }, {
                    type: "name",
                    title: "Đặt mật khẩu",
                    content: "Tạo một mật mã có từ 8 đến 63 ký tự ASCII hoặc 8 đến 64 ký tự thập lục phân (0-9, a-f, A-F) trong mục Mật mã."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Tình trạng Internet",
                content: "Hiển thị trạng thái kết nối Internet hiện tại của router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Dạng kết nối",
                content: "Hiển thị dạng kết nối Internet của bạn."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Địa chỉ IP",
                content: "Hiển thị địa chỉ IP Internet hiện tại được gán cho router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Máy chủ DNS",
                content: "Hiển thị địa chỉ IP của máy chủ DNS chính và thứ hai."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Gateway",
                content: "Hiển thị địa chỉ IP của Gateway."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Địa chỉ MAC",
                "content": "Hiển thị địa chỉ vật lý duy nhất của router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Địa chỉ IP",
                "content": "Hiển thị địa chỉ IP của router được sử dụng để đăng nhập vào trang web quản lý của router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Subnet Mask",
                "content": "Hiển thị Subnet mask của router."
            }, {
				display: "$.routerMode == 'AP'",
				"type": "name",
                "title": "Dạng địa chỉ",
                "content": "Hiển thị dạng cấu hình của địa chỉ IP của router."
            }, {
	    display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
               type: 'title',
                title: 'Kiểm tra tốc độ'
		}, {
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",
                   type: "paragraph",
                   content: "This feature tests the current upload and download speeds you're getting from your service provider and provides helpful advice about your internet's capabilities."
               } ,{ 
	       display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                     
                   type: "paragraph",
                   content: "Tip: For a more accurate result, try closing down other apps and programs."
               } ,{
	       display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                      
                   type: "paragraph",
                   content: "History - A record of previous speed tests."
               } ,{     
	       display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                 
                   type: "paragraph",
                   content: "Test Again - Click to perform a speed test."
             	}, {
                type: "title",
                title: "Router"
            }, {
                type: "title2",
                content: "Không dây 2.4GHz | 5GHz"
            }, {/*
                type: "name",
                title: "Trạng thái",
                content: "Hiển thị nếu mạng không dây 2.4GHz | 5GHz đang mở (kích hoạt) hoặc tắt (vô hiệu hóa)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Hiển thị tên mạng không dây hiện tại của băng tần 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Kênh",
                content: "Hiện thị kênh mạng không dây 2.4GHz | 5GHz quảng bá."
            }, {
                type: "name",
                title: "MAC",
                content: "Hiển thị địa chỉ MAC hiện tại của mạng không dây 2.4GHz | 5GHz."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "Mạng khách 2.4GHz | 5GHz"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Trạng thái",
                content: "Hiển thị nếu Mạng khách 2.4GHz | 5GHz đang mở (kích hoạt) hoặc tắt (vô hiệu hóa)."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Hiển thị tên mạng không dây của Mạng khách."
            }, {
                type: "title",
                title: "Không dây / Máy khách có dây"
            }, {
                type: "name",
                title: "Tên",
                content: "Hiển thị tên máy khách kết nối đến router."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Hiển thị địa chỉ IP được gán của máy khách."
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC của máy khách."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Điện thoại"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Tên điện thoại",
                content: "Hiển thị tên điện thoại của bạn"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Số cuộc gọi đến",
                content: "Hiển thị số được sử dụng bởi thiết bị điện thoại của bạn để nhận cuộc gọi đến thông qua router của bạn"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Số nội bộ",
                content: "Hiển thị số được sử dụng để thực hiện cuộc gọi giữa các thiết bị điện thoại kết nối đến cùng router. Thông số này được cài đặt trước và không thể thay đổi"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Số gọi đi",
                content: "Hiển thị số được sử dụng bởi thiết bị điện thoại của bạn để thực hiện cuộc gọi đi thông qua router của bạn. Mặc định là Tự động, nghĩa là router sẽ chọn một số khả dụng để làm số gọi đi, số này có thể thay đổi tại trang VoIP."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Máy in"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Tên",
                content: "Hiển thị tên của máy in kết nối đến router qua cổng USB."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Ổ USB"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Nhãn hiệu",
                content: "Hiển thị thương hiệu của ổ cứng USB kết nối đến router."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Tổng số",
                content: "Hiển thị tổng dung lượng của ổ cứng USB."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "có sẵn",
                content: "Hiển thị dung lượng khả dụng của ổ cứng USB."
            }]
        },
		sysMode: {
            TITLE: "Chế độ hoạt động",
            CONTENT: [{
                type: "name",
                title: "Router",
                content: "Trong chế độ này, router của bạn kết nối trực tiếp đến Internet thông qua IP động , IP tĩnh, PPPoE, L2TP hoặc PPTP và chia sẻ truy cập Internet đến nhiều thiết bị có dây hoặc không dây. NAT, tường lửa và máy chủ DHCP được kích hoạt mặc định. Chọn chế độ này nếu bạn lần đầu tiên sử dụng thiết bị hoặc bạn hiện đang không sử dụng các router khác."
            }, {
                type: "name",
                title: "Điểm truy cập",
                content: "Trong chế độ này, router của bạn kết nối với router có dây hoặc không dây thông qua cáp Ethernet và mở rộng vùng phủ sóng không dây của mạng hiện tại của bạn. Các tính năng như NAT, quyền kiểm soát phụ huynh và QoS không được hỗ trợ trong chế độ này. Địa chỉ IP của router được gán bởi máy chủ DHCP của router gốc, bạn có thể đăng nhập vào trang web quản lý bằng địa chỉ http://tplinkwifi.net."
            }]
        },
        wirelessBasic: {
            TITLE: "Cài đặt không dây",
            CONTENT: [{
                type: "name",
                title: "Mạng không dây 2.4GHz | 5GHz",
                content: "Chọn hộp chọn này để kích hoạt tần số vô tuyến không dây 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Tên mạng không dây (SSID)",
                content: "Bạn có thể dùng tên mạng mặc địng (SSID), hoặc tạo một tên mới (lên đến 32 ký tự). Mục này phân biệt chữ hoa và chữ thường."
            }, {
                type: "name",
                title: "Mật mã",
                content: "Tạo một mật mã không dây từ 8 đến 63 ký tự ASCII, hoặc từ 8 đến 64 ký tự thập lục phân. Mục này phân biệt chữ hoa và chữ thường."
            }, {
                type: "name",
                title: "ẩn SSID",
                content: "Chọn hộp chọn này nếu bạn muốn giấu SSID 2.4GHz | 5GHz khỏi danh sách mạng Wi-Fi."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Hiển thị thông tin liên quan về kết nối Internet."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
               /* type: "name",
                title: "Tên",
                content: "Hiển thị tên cổng Internet của router"
            }, {*/
                type: "name",
                title: "Địa chỉ MAC",
                content: "Địa chỉ vật lý duy nhất được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Địa chỉ IP được gán cho cổng Internet (WAN) của router. Nếu địa chỉ IP là 0.0.0.0, nghĩa là không có kết nối Internet"
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Thông số này xác định phần mạng và phần máy chủ của một địa chỉ IP"
            }, {
                type: "name",
                title: "Gateway mặc định",
                content: "Địa chỉ IP thường dùng để kết nối router đến mạng."
            }, {
                type: "name",
                title: "DNS chính/ DNS thứ hai",
                content: "Hệ thống tên miền (DNS) dịch tên máy chủ và tên miền Internet thành địa chỉ IP. Thông tin các máy chủ DNS được gán bởi Nhà cung cấp dịch vụ Internet (ISP)."
            }, {
                type: "name",
                title: "Dạng kết nối",
                content: "Dạng kết nối Internet hiện tại của bạn."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Địa chỉ vật lý duy nhất được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Địa chỉ IPv6 được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Gateway mặc định",
                content: "Địa chỉ IP thường dùng để kết nối router đến mạng."
            }, {
                type: "name",
                title: "DNS chính/ DNS thứ hai",
                content: "Hệ thống tên miền (DNS) dịch tên máy chủ và tên miền Internet thành địa chỉ IP. Thông tin các máy chủ DNS được gán bởi Nhà cung cấp dịch vụ Internet (ISP)."
            }, {
                type: "name",
                title: "Dạng kết nối",
                content: "Dạng kết nối Internet hiện tại của bạn."
            }, {
                type: "title",
                title: "Không dây"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Chọn để xem cài đặt và thông tin không dây 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Tên mạng không dây (SSID)",
                content: "Tên mạng không dây, còn được gọi là SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Vô tuyến không dây",
                content: "Trạng thái hiện tại (Mở hay Tắt) của mạng không dây."
            }, {
                type: "name",
                title: "Chế độ",
                content: "Chế độ không dây hiện tại."
            }, {
                type: "name",
                title: "Độ rộng kênh",
                content: "Băng thông kênh của mạng không dây."
            }, {
                type: "name",
                title: "Kênh",
                content: "Kênh không dây hiện tại và tần số tương ứng của kênh (GHz)"
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Địa chỉ MAC của vô tuyến mạng không dây."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Hiển thị thông tin về cổng Ethernet (LAN)."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Địa chỉ vật lý duy nhất được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Địa chỉ IPv4 được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Thông số xác định phần mạng và phần máy chủ của một địa chỉ IP"
            }, {
                type: "name",
                title: "DHCP",
                content: "Hiển thị nếu máy chủ DHCP tích hợp của router có được kích hoạt cho các thiết bị trên cổng LAN hay không."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Địa chỉ vật lý duy nhất được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Địa chỉ IP",
                content: "Địa chỉ IPv6 được gán cho cổng Internet (WAN) của router."
            }, {
                type: "name",
                title: "Độ dài tiền tố",
                content: "Độ dài tiền tố địa chỉ IPv6"
            }, {
                type: "name",
                title: "Dạng gán",
                content: "Dạng địa chỉ IPv6 được gán cho giao diện LAN."
            }, {
                type: "title",
                title: "Mạng khách"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Chọn để xem cài đặt và thông tin không dây 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID mạng khách",
                content: "Tên mạng  không dây (SSID) mạng khách của bạn."
            }, {
                type: "name",
                title: "Ẩn SSID",
                content: "Hiển thị nếu tên mạng không dây (SSID) của Mạng khách được giấu (Mở) hay không (Tắt)."
            }, {
                type: "name",
                title: "Vô tuyến không dây",
                content: "Báo hiệu trạng thái hiện tại (Mở hoặc Tắt) của Mạng khách."
            }, {
                type: "name",
                title: "Có thể nhìn thấy nhau",
                content: "Hiển thị nếu tất cả thiết bị trong Mạng khách được cho phép liên lạc với nhau hay không."
            }]
        },
        time: {
            TITLE: "Cài đặt thời gian",
            CONTENT: [{
                type: "name",
                title: "Múi giờ",
                content: "Chọn múi giờ địa phương của bạn từ danh sách thả xuống."
            }, {
                type: "name",
                title: "Ngày",
                content: "Nhập ngày địa phương của bạn theo định dạng MM/DD/YY vào trường."
            }, {
                type: "name",
                title: "Thời gian",
                content: "Chọn thời gian địa phương của bạn từ danh sách thả xuống (Theo định dạng  24 giờ, ví dụ 16:00:00 là 04:00CH)."
            }, {
                type: "name",
                title: "NTP Server IN / NTP Server tôi",
                content: "Nhập địa chỉ IP của máy chủ NTP I hoặc máy chủ NTP II, và router sẽ lấy thời gian tự động từ máy chủ NTP. Ngoài ra, router có một số máy chủ NTP phổ biến được tích hợp, router sẽ tự động đồng bộ một khi router kết nối đến Internet."
            }, {
                type: "name",
                title: "Nhận từ máy tính",
                content: "Bấm chọn để đồng bộ với thời gian hệ thống máy tính."
            }, {
                type: "name",
                title: "Nhận GMT",
                content: "Bấm chọn để đồng bộ hóa với múi giờ GMT (Greenwich Mean Time) từ Internet."
            }, {
                type: "name",
                title: "Lưu",
                content: "Bấm chọn để lưu cài đặt."
            }, {
                type: "title",
                content: "Thời gian tiết kiệm ánh sáng ngày"
            }, {
                type: "note",
                title: "Để thiết lập thời gian tiết kiệm ánh sáng",
                content: [
                    "Chọn <b> Kích hoạt Thời gian tiết kiệm ánh sáng ngày </b>.",
                    "Chọn đúng ngày và thời gian <b> Bắt đầu </b> khi Thời gian tiết kiệm ánh sáng ngày bắt đầu theo giờ địa phương của bạn.",
                    "Chọn đúng ngày và thời gian <b> Kết thúc </b> khi Thời gian tiết kiệm ánh sáng ngày bắt đầu theo giờ địa phương của bạn.",
                    "Bấm chọn <b> Lưu </b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Công cụ chẩn đoán",
            CONTENT: [{
                type: "paragraph",
                content: "Router cung cấp hai công cụ chẩn đoán, ping và trace."
            }, {
                type: "note",
                title: "Để chẩn đoán sử dụng công cụ Ping:",
                content: [
                    "Kiểm tra nút vô tuyến trước khi ping.",
                    "Nhập địa chỉ IP hoặc tên miền.",
                    "Bấm chọn biểu tượng thả xuống trước Nâng cao để hiển thị Đếm Ping, kích thước Gói tin Ping và Ping Timeout. Giữ giá trị mặc định cho các thông số hoặc cấu hình theo nhu cầu của bạn.",
                    "Bấm chọn nút Bắt đầu để bắt đầu chẩn đoán."
                ]
            }, {
                type: "paragraph",
                content: "HOẶC"
            }, {
                type: "note",
                title: "Để chẩn đoán sử dụng công cụ Traceroute:",
                content: [
                    "Kiểm tra nút vô tuyến trước khi traceroute.",
                    "Nhập địa chỉ IP hoặc tên miền.",
                    "Nhấp vào biểu tượng thả xuống trước Nâng cao để hiển thị Traceroute Max TTL.Giữ giá trị mặc định cho thông số hoặc cấu hình theo nhu cầu của bạn.",
                    "Bấm chọn nút Bắt đầu để bắt đầu chẩn đoán."
                ]
            }]
        },
        softup: {
            TITLE: "Nâng cấp firmware",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Một firmware nâng cấp sẽ cập nhật hệ điều hành của router với các tính năng mới nhất, sửa một số lỗi và cải thiện hiệu suất. Khi một firmware nâng cấp khả dụng, bạn sẽ nhận được thông báo với biểu tượng Nâng cấp ở góc trên bên phải. Bấm chọn biểu tượng để đi đến trang Nâng cấp Firmware."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>QUAN TRỌNG: Vui lòng làm theo hướng dẫn để tránh việc nâng cấp thất bại.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Trước khi nâng cấp:",
                content: [
                    "Kết nối máy tính đến router với cáp Ethernet. Chúng tôi KHÔNG khuyến nghị nâng cấp firmware qua kết nối không dây ",
                    "Tháo tất cả thiết bị lưu trữ USB đang kết nối đến router.",
                    "Sao lưu cấu hình cài đặt của router."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Trong suốt quá trình nâng cấp:<br>Vui lòng đảm bảo nguồn điện cho router và không thực hiện bất cứ hành động nào."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Để nâng cấp firmware trực tuyến"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Bấm chọn Nâng cấp và xác nhận khi được yêu cầu. Router sẽ tự động tải về và nâng cấp firmware mới nhất, sau đó router sẽ khởi động lại.<br><b>Lưu ý</b>: Bạn có thể sẽ cần phải bấm chọn Kiểm tra cập nhật trước để kiểm tra liệu có bản firmware nâng cấp khả dụng nào hay không. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Để nâng cấp firmware theo cách thủ công"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Truy cập www.tp-link.com và tải về firmware mới nhất từ trang hỗ trợ của chúng tôi về máy tính của bạn. Vui lòng đảm bảo tập tin firmware bạn tải về phù hợp với phiên bản phần cứng đươc hiển thị trên trang web của router.",
                    "Bấm chọn <b>Duyệt</b> và chọn tập tin firmware đã tải về.",
                    "Bấm chọn <b>Nâng cấp</b>. Việc nâng cấp firmware sẽ mất vài phút để hoàn tất. Router sẽ tự động khởi động lại khi quá trình nâng cấp firmware đã hoàn tất."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Trước khi nâng cấp firmware của router, bạn sẽ cần phải tải về các bản cập nhật firmware mới nhất từ <a href='http://www.tp-link.com/en/download-center.html'> Trang Trung tâm tải về của TP-LINK </a> về máy tính của bạn."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B> QUAN TRỌNG: </B> Để ngăn chặn suy nâng cấp, xin vui lòng lưu ý những điều sau đây:",
                content: [
                    "Hãy chắc chắn rằng tập tin firmware mới nhất là phù hợp với phiên bản phần cứng (được hiển thị dưới trang <b> Nâng cấp Firmware </b> ).",
                    "Hãy chắc chắn rằng bạn có một kết nối ổn định giữa router và máy tính của bạn. Chúng tôi <b> KHÔNG</b> khuyến nghị bạn nâng cấp firmware qua kết nối không dây.",
                    "Hãy chắc chắn rằng bạn đã tháo tất cả các thiết bị lưu trữ USB kết nối với router trước khi nâng cấp firmware để đề phòng mất dữ liệu.",
                    "Sao lưu cấu hình router của bạn.",
                    "Không tắt nguồn Router trong khi nâng cấp firmware."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Để nâng cấp firmware của router",
                content: [
                    "Bấm chọn <b> Duyệt </b>.",
                    "Xác định vị trí và chọn tập tin firmware đã tải về.",
                    "Bấm chọn <b> Nâng cấp </b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Sao lưu",
            CONTENT: [{
                type: "paragraph",
                content: "Chúng tôi khuyến nghị bạn sao lưu cấu hình hiện tại trong trường hợp cần phục hồi để khôi phục hệ thống về trạng thái trước đó hoặc trạng thái mặc định."
            }, {
                type: "paragraph",
                content: "Bấm chọn <b>Sao lưu </b> để lưu cấu hình hiện tại của bạn vào máy tính của bạn. Hãy chắc chắn bạn đã lưu tập tin sao lưu vào một vị trí an toàn mà bạn có thể lấy lại và khôi phục lại Router sau nếu cần."
            }, {
                type: "title",
                content: "Khôi phục"
            }, {
                type: "note",
                title: "Để khôi phục lại từ một bản sao lưu",
                content: [
                    "Bấm chọn <b>Duyệt </b>.",
                    "Xác định vị trí và chọn tập tin sao lưu.",
                    "Bấm chọn <b>Khôi phục </b>."
                ]
            }, {
                type: "title",
                content: "Khôi phục cài đặt gốc"
            }, {
                type: "paragraph",
                content: "Bấm chọn <b> Cài đặt gốc </b> để thiết lập lại router về thiết lập mặc định."
            }, {
                type: "note",
                title: "Note:",
                content: [
                    "Khôi phục cài đặt gốc sẽ đặt lại tất cả các thiết lập mà bạn đã cấu hình cho router về cài đặt mặc định của nhà sản xuất. Một khi router được khôi phục cài đặt gốc và khởi động lại, vui lòng tạo một mật mã mới để đăng nhập lại vào trang web quản lý.",
                    "Xin vui lòng KHÔNG tắt nguồn router trong quá trình sao lưu hoặc khôi phục."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Quản lý tài khoản",
            CONTENT: [{
                type: "paragraph",
		display: "$.helpControl.cloudLogin",
                content: "Trang này cho phép bạn thay đổi mật mã đăng nhập của bạn."
            }, /*{
                type: "name",
                title: "Tên đăng nhập cũ",
                content: "Nhập tên đăng nhập hiện tại của bạn."
            }, */{
                type: "name",
                title: "Mật khẩu cũ",
                content: "Nhập mật mã hiện tại của bạn."
            }, /*{
                type: "name",
                title: "Tên đăng nhập mới",
                content: "Nhập tên đăng nhập mới của bạn."
            }, */{
                type: "name",
                title: "mật khẩu mới",
                content: "Nhập mật mã mới của bạn."
            }, {
                type: "name",
                title: "Xác nhận mật khẩu mới",
                content: "Nhập lại mật mã mới của bạn."
            }, {
                type: "title",
                content: "Quản lý nội bộ"
            }, {
                type: "paragraph",
                content: "Quản lý nội bộ cho phép bạn gán một thiết bị máy khách cụ thể trong mạng của bạn để truy cập và quản lý router bằng cách sử dụng xác thực dựa trên địa chỉ MAC."
            }, {
                type: "name",
                title: "Hải cảng",
                content: "Nhập số cổng được sử dụng để truy cập router từ 1024 đến 65535. Giá trị mặc định là 80."
            }, {
                type: "name",
                title: "Địa  chỉ IP/MAC",
                content: "Nhập một địa chỉ IP nội bộ hoặc địa chỉ MAC hợp lệ của thiết bị được phép truy cập vào router."
            }, {
                type: "title",
                content: "Quản lý từ xa"
            }, {
                type: "paragraph",
                content: "Tính năng quản lý từ xa cho phép bạn truy cập và cấu hình router từ xa qua Internet."
            }, {
                type: "name",
                title: "Quản lý từ xa",
                content: "Chọn hộp chọn để kích hoạt tính năng Quản lý từ xa."
            }, {
                type: "name",
                title: "Hải cảng",
                content: "Nhập số cổng được sử dụng để truy cập vào router với độ bảo mật tốt hơn từ 1024 đến 65535. Thông thường, trình duyệt web sử dụng cổng dịch vụ HTTP chuẩn 80."
            }, {
                type: "name",
                title: "Địa  chỉ IP/MAC",
                content: "Nhập một địa chỉ IP từ xa hoặc địa chỉ MAC hợp lệ được phép truy cập vào router."
            }]
        },
        log: {
            TITLE: "Bản ghi hệ thống",
            CONTENT: [{
                type: "paragraph",
                content: "Trang Bản ghi hệ thống hiển thị danh sách các hoạt động gần đây nhất (sự kiện) của router. Bạn có thể xác định dạng bản ghi và/hoặc cấp độ bản ghi bạn muốn xem. Trang này cũng cho phép router xuất bản ghi hệ thống đến một máy tính hoặc tự động gửi bản ghi hệ thống tới một máy chủ từ xa xác định."
            }, {
                type: "name",
                title: "Kiểu",
                content: "Chọn dạng bản ghi hệ thống cần hiển thị."
            }, {
                type: "name",
                title: "Cấp độ",
                content: "Chọn cấp độ bản ghi hệ thống cần hiển thị."
            }, {
                type: "name",
                title: "Làm mới",
                content: "Bấm chọn biểu tượng này để cập nhật bản ghi hệ thống."
            }, {
                type: "name",
                title: "Xóa hết",
                content: "Bấm chọn biểu tượng này để xóa tất cả bản ghi hệ thống."
            }, {
                type: "name",
                title: "Cài đặt bản ghi",
                content: "Bấm chọn để thiết lập cài đặt tập tin bản ghi.",
                children: [{
                    type: "name",
                    title: "lưu tại địa phương",
                    content: "Chọn để lưu bản ghi hệ thống vào máy tính. Bản ghi sẽ được hiển thị trên bảng tại trang Bản ghi hệ thống.",
                    children: [{
                        type: "name",
                        title: "Mức tối thiểu",
                        content: "Chọn cấp độ tối thiểu của bản ghi hệ thống được lưu từ danh sách thả xuống. Danh sách này được sắp xếp giảm dần, với cấp độ thấp nhất được liệt kê cuối cùng."
                    }]
                }, {
                    type: "name",
                    title: "lưu điều khiển từ xa",
                    content: "Chọn để gửi bản ghi hệ thống tới một máy chủ từ xa. Nếu máy chủ từ xa có một máy khách xem bản ghi hoặc một công cụ thực thi sniffer, bạn có thể xem và phân tích các bản ghi hệ thống từ xa theo thời gian thực.",
                    children: [{
                        type: "name",
                        title: "Mức tối thiểu",
                        content: "Chọn cấp độ tối thiểu của bản ghi hệ thống được lưu từ danh sách thả xuống. Danh sách này được sắp xếp giảm dần, với cấp độ thấp nhất được liệt kê cuối cùng."
                    }, {
                        type: "name",
                        title: "Server IP",
                        content: "Xác định địa chỉ IP của máy chủ bản ghi hệ thống từ xa."
                    }, {
                        type: "name",
                        title: "Cổng máy chủ",
                        content: "Xác định số cổng của máy chủ bản ghi hệ thống từ xa."
                    }, {
                        type: "name",
                        title: "Tên cơ sở địa phương",
                        content: "Chọn tên chức năng nội bộ của máy chủ từ xa từ danh sách thả xuống."
                    }]
                }]
            }, {
                type: "name",
                title: "Lưu Đăng Nhập",
                content: "Bấm chọn nút này để tải về tất cả các bản ghi hệ thống vào máy tính của bạn."
            }]
        },
        snmp: {
            TITLE: "Cài đặt SNMP",
            CONTENT: [{
                type: "name",
                title: "Đại diện SNMP",
                content: "Chuyển sang Mở để kích hoạt tính năng SNMP tích hợp cho phép router hoạt động với vai trò ư nhận và xử lý các tin nhắn SNMP, gửi phản hồi cho người quản lý SNMP, và kích hoạt bẫy SNMP khi một sự kiện xảy ra."
            }, {
                type: "name",
                title: "Chỉ đọc Cộng đồng",
                content: "Hiển thị chuỗi liên lạc công cộng mặc định bảo vệ router khỏi các truy cập trái phép."
            }, {
                type: "name",
                title: "viết Cộng đồng",
                content: "Hiển thị chuỗi liên lạc đọc và ghi mặc định bảo vệ router khỏi những thay đổi trái phép."
            }, {
                type: "name",
                title: "Name System",
                content: "Hiển thị tên quản trị được gán cho thiết bị quản lý này."
            }, {
                type: "name",
                title: "Sự mô tả hệ thống",
                content: "Hiển thị các mô tả văn bản của thiết bị quản lý. Giá trị này nên bao gồm tên đầy đủ và xác định phiên bản của dạng phần cứng hệ thống, phần mềm điều hành hệ thống, và phần mềm mạng."
            }, {
                type: "name",
                title: "Vị trí hệ thống",
                content: "Hiển thị vị trí vật lý của thiết bị này (ví dụ tủ điện thoại, tầng 3)."
            }, {
                type: "name",
                title: "hệ Liên hệ",
                content: "Hiển thị nhận dạng văn bản của người liên lạc cho thiết bị quản lý này, cùng với thông tin để liên lạc với người này."
            }, {
                type: "name",
                title: "Trap quản lý IP",
                content: "Hiển thị địa chỉ IP của máy chủ để nhận được những cái bẫy."
            }]
        },
        stat: {
            TITLE: "Thống kê giao thông",
            CONTENT: [{
                type: "name",
                title: "Thống kê giao thông",
                content: "Chuyển sang Mở để kích hoạt tính năng Thống kê lưu lượng."
            }, {
                type: "title",
                content: "Danh sách Thống kê lưu lượng."
            }, {
                type: "name",
                title: "IP / MAC Address",
                content: "Địa chỉ IP và MAC của máy khách kết nối."
            }, {
                type: "name",
                title: "Tổng số gói",
                content: "Tổng số gói tin nhận và truyền qua router."
            }, {
                type: "name",
                title: "Tổng số Bytes",
                content: "Tổng số byte được và truyền qua router."
            }, {
                type: "name",
                title: "gói hiện tại",
                content: "Tổng số gói tin nhận và truyền tại một khoảng thời gian xác định theo đơn vị giây giây."
            }, {
                type: "name",
                title: "Bytes hiện tại",
                content: "Tổng số byte nhận và truyền tại một khoảng thời gian xác định theo đơn vị giây giây."
            }, {
                type: "name",
                title: "Hiện tại ICMP Tx",
                content: "Hiển thị tốc độ truyền hiện tại của các gói tin ICMP được truyền tải qua cổng WAN trên tốc độ truyền tối đa mỗi giây."
            }, {
                type: "name",
                title: "Hiện UDP Tx",
                content: "Hiển thị tốc độ truyền hiện tại của các gói tin UDP truyền qua cổng WAN trên tốc độ truyền tối đa mỗi giây."
            }, {
                type: "name",
                title: "cú pháp hiện hành",
                content: "Hiển thị tốc độ truyền hiện tại của các gói tin TCP SYN truyền qua cổng WAN trên tốc độ truyền tối đa mỗi giây."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Bấm chọn biểu tượng <b> Thùng rác </b> để xóa các thống kê tương ứng."
            }, {
                type: "name",
                title: "Làm mới",
                content: "Bấm chọn để cập nhật các thông tin thống kê trên trang."
            }, {
                type: "name",
                title: "Thiết lập lại",
                content: "Bấm chọn để đặt lại tất cả các giá trị thống kê trong danh sách về không."
            }, {
                type: "name",
                title: "Xóa hết",
                content: "Bấm chọn để xóa tất cả các thông tin thống kê trong danh sách."
            }]
        },
        ethWan: {
            TITLE: "Giao diện WAN",
            CONTENT: [{
                type: "title2",
                content: "Dạng kết nối Internet: IP động"
            }, {
                type: "name",
                title: "IP động",
                content: "Chọn loại này nếu bạn được cung cấp một kết nối máy chủ DHCP của ISP (Internet Service Provider)."
            }, {
                type: "name",
                title: "Địa chỉ IP / Subnet Mask / Gateway / Gateway mặc định",
                content: "Các tham số này sẽ được tự động bởi máy chủ DHCP từ ISP của bạn được giao."
            }, {
                type: "name",
                title: "Đổi mới / phát hành",
                content: "Nhấn vào nút này để làm mới / phát hành các thông số IP từ ISP của bạn."
            }, {
                type: "name",
                title: "Nâng cao",
                children: [{
                    type: "name",
                    title: "Kích thước MTU (byte)",
                    content: "Các mặc định và MTU điển hình (Maximum Transmission Unit) kích thước cho hầu hết các mạng Ethernet là <b> 1500 Bytes </b>. Nó không được khuyến khích để thay đổi mặc định kích thước MTU trừ khi được yêu cầu bởi các ISP."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Management Group Protocol) được sử dụng để quản lý multicast trên mạng TCP / IP. Một số ISP sử dụng IGMP để thực hiện cấu hình từ xa trên router. Nó được kích hoạt theo mặc định."
                }, {
                    type: "name",
                    title: "Lấy IP bằng DHCP Unicast",
                    content: "Chọn hộp kiểm này nếu máy chủ DHCP của ISP của bạn không hỗ trợ các ứng dụng phát sóng và bạn không thể có được địa chỉ IP động."
                }, {
                    type: "name",
                    title: "Sử dụng DNS Địa chỉ sau",
                    content: "Chọn hộp kiểm này và nhập địa chỉ máy chủ DNS (es) trong ký hiệu dấu chấm thập phân được cung cấp bởi ISP của bạn. giao diện WAN này sẽ sử dụng các máy chủ DNS cụ thể cho ưu tiên."
                }, {
                    type: "name",
                    title: "Máy chủ",
                    content: "Nhập tên máy chủ của giao diện WAN này."
                }]
            }, {
                type: "title2",
                content: "Dạng kết nối Internet: IP tĩnh"
            }, {
                type: "name",
                title: "IP tĩnh",
                content: "Chọn loại này nếu bạn được cung cấp với một cụ thể (cố định) Địa chỉ IP, Subnet Mask, Gateway, và các thông số DNS của các ISP."
            }, {
                type: "name",
                title: "Địa chỉ IP / Subnet Mask / Gateway / Máy chủ DNS / Máy chủ DNS thứ hai",
                content: "Nhập các thông tin IP được cung cấp bởi ISP của bạn trong ký hiệu dấu chấm thập phân."
            }, {
                type: "paragraph",
                content: "Nhấp <b> Cao </b> để xem các thiết lập nâng cao hơn."
            }, {
                type: "name",
                title: "Nâng cao",
                children: [{
                    type: "name",
                    title: "Kích thước MTU (byte)",
                    content: "Các mặc định và MTU điển hình (Maximum Transmission Unit) kích thước cho hầu hết các mạng Ethernet là <b> 1500 Bytes </b>. Nó không được khuyến khích để thay đổi mặc định kích thước MTU trừ khi được yêu cầu bởi các ISP."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Management Group Protocol) được sử dụng để quản lý multicast trên mạng TCP / IP. Một số ISP sử dụng IGMP để thực hiện cấu hình từ xa trên router. Nó được kích hoạt theo mặc định."
                }]
            }, {
                type: "title2",
                content: "Connection Type: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Chọn loại này nếu bạn sử dụng dịch vụ DSL (Digital Subscriber Line) và được cung cấp với một tên người dùng và mật mã của các ISP."
            }, {
                type: "name",
                title: "Tên đăng nhập PPPoE/Mật mã PPPoE/Xác nhận mật mã",
                content: "Nhập tên người dùng và mật mã được cung cấp bởi ISP của bạn. Những trường này là trường hợp nhạy cảm."
            }, {
                type: "name",
                title: "Kết nối thứ hai",
                content: "Nó có sẵn chỉ cho PPPoE Connection. Nếu ISP của bạn cung cấp một loại kết nối thêm như Dynamic / Static IP để kết nối với một mạng lưới khu vực địa phương, sau đó bạn có thể chọn nút radio của Dynamic / Static IP để kích hoạt kết nối thứ hai này. <br> Các kết nối thứ hai được tắt theo mặc định , do đó, PPPoE kết nối duy nhất. Không cho phép nó, trừ khi cần thiết."
            }, {
                type: "name",
                title: "Chế độ kết nối",
                content: "Chọn một trong các phương thức kết nối dưới đây để xác định làm thế nào để kết nối với Internet:",
                children: [{
                    type: "name",
                    title: "Luôn kết nối",
                    content: "Chọn chế độ này để nối lại tự động bất cứ lúc nào kết nối được ngắt kết nối."
                }, {
                    type: "name",
                    title: "Kết nối theo yêu cầu",
                    content: "Chọn chế độ này để ngắt kết nối Internet dựa trên thời gian cụ thể không hoạt động (Max Nhàn rỗi Time). Các kết nối được tái lập khi bạn cố gắng để truy cập Internet một lần nữa."
                }, {
                    type: "name",
                    title: "Kết nối thủ công",
                    content: "Chọn chế độ này để kết nối hoặc ngắt kết nối Internet bằng tay hoặc dựa vào thời gian cụ thể không hoạt động (Max Nhàn rỗi Time)."
                }, {
                    type: "name",
                    title: "Max thời gian nhàn rỗi",
                    content: "<B> 15 phút </b> - Nhập một số phút kết nối Internet có thể được nhàn rỗi trước khi nó được chấm dứt. Thời gian nhàn rỗi mặc định là 15 phút."
                }]
            }, {
                type: "name",
                title: "Dạng xác thực",
                content: "Chọn một loại chứng thực từ danh sách thả xuống. Phương pháp mặc định là Tự động."
            }, {
                type: "name",
                title: "Kết nối/Ngắt kết nối",
                content: "Nhấn vào đây để kết nối / ngắt kết nối ngay lập tức."
            }, {
                type: "paragraph",
                content: "Nhấp <b> Cao </b> để xem các thiết lập nâng cao hơn."
            }, {
                type: "name",
                title: "Nâng cao",
                children: [{
                    type: "name",
                    title: "Tên dịch vụ",
                    content: "Nhập tên dịch vụ được cung cấp bởi ISP của bạn. Nếu không, để trống."
                }, {
                    type: "name",
                    title: "Tên máy chủ",
                    content: "Nhập tên máy chủ được cung cấp bởi ISP của bạn. Nếu không, để trống."
                }, {
                    type: "name",
                    title: "Kích thước MTU (byte)",
                    content: "Kích thước MTU (Maximum Transmission Unit) mặc định và điển hình cho hầu hết các mạng Ethernet là 1480 byte.",
                    children: [{
                        type: "paragraph",
                        content: "<B> Lưu ý </b>: Trong một số ít trường hợp, ISP của bạn có thể yêu cầu bạn điều chỉnh kích thước MTU để có hiệu suất mạng tốt hơn. Bạn không nên thay đổi các giá trị trừ khi thực sự cần thiết."
                    }]
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Management Group Protocol) được sử dụng để quản lý multicast trên mạng TCP / IP. Một số ISP sử dụng IGMP để thực hiện cấu hình từ xa trên router. Nó được kích hoạt theo mặc định."
                }, {
                    type: "name",
                    title: "Sử dụng các IP được chỉ định bởi ISP",
                    content: "Chọn tùy chọn này và nhập vào địa chỉ IP được cung cấp bởi ISP của bạn."
                }, {
                    type: "name",
                    title: "Yêu cầu Interval Echo",
                    content: "Nhập một giá trị khoảng thời gian giữa 0 và 120 (tính bằng giây) mà router yêu cầu truy cập Concentrator để echo tại mỗi khoảng thời gian. Giá trị mặc định là 30. 0 có nghĩa là không có phát hiện."
                }, {
                    type: "name",
                    title: "Sử dụng DNS Địa chỉ sau",
                    content: "Chọn hộp kiểm này và nhập địa chỉ máy chủ DNS (es) trong ký hiệu dấu chấm thập phân được cung cấp bởi ISP của bạn. giao diện WAN này sẽ sử dụng các máy chủ DNS cụ thể cho ưu tiên."
                }]
            }, {
                type: "title2",
                content: "Dạng kết nối Internet: L2TP / PPTP"
            }, {
                type: "name",
                title: "L2TP / PPTP",
                content: "Chọn loại này nếu bạn kết nối với một L2TP / PPTP VPN Server và được cung cấp với một tên người dùng, mật mã và địa chỉ IP / Domain Name của máy chủ của ISP của bạn."
            }, {
                type: "name",
                title: "Tên đăng nhập / Mật mã",
                content: "Nhập tên người dùng và mật mã được cung cấp bởi ISP của bạn. Những trường này là trường hợp nhạy cảm."
            }, {
                type: "name",
                title: "Địa chỉ IP / DNS Primary",
                content: "Các tham số này sẽ được tự động bởi máy chủ DHCP từ ISP của bạn được giao."
            }, {
                type: "name",
                title: "Kết nối thứ hai (IP động hoặc IP tĩnh)",
                children: [{
                    type: "name",
                    title: "IP động",
                    content: "Hãy chọn điều này nếu địa chỉ IP và Subnet Mask được gán tự động bởi ISP của bạn."
                }, {
                    type: "name",
                    title: "IP tĩnh",
                    content: "Hãy chọn điều này nếu địa chỉ IP, Subnet Mask, Gateway, DNS và địa chỉ được cung cấp bởi ISP của bạn, và nhập các thông tin vào các trường tương ứng."
                }]
            }, {
                type: "name",
                title: "Tên VPN Server IP / Domain",
                content: "Nhập địa chỉ hoặc miền tên IP của máy chủ VPN cung cấp bởi ISP của bạn."
            }, {
                type: "name",
                title: "MTU Kích",
                content: "Các mặc định và MTU điển hình (Maximum Transmission Unit) kích thước cho hầu hết các mạng Ethernet là 1460 Bytes (1420 cho PPTP). Không thay đổi mặc định kích thước MTU trừ khi được yêu cầu bởi ISP của bạn."
            }, {
                type: "name",
                title: "Chế độ kết nối",
                content: "Chọn một chế độ kết nối thích hợp để xác định làm thế nào để kết nối với Internet.",
                children: [{
                    type: "name",
                    title: "Luôn kết nối",
                    content: "Trong chế độ này, các kết nối Internet tự động kết nối lại bất cứ lúc nào nó bị ngắt kết nối."
                }, {
                    type: "name",
                    title: "Kết nối theo yêu cầu",
                    content: "Trong chế độ này, các kết nối Internet sẽ tự động bị ngắt sau một thời gian nhất định không hoạt động (Max Nhàn rỗi Time) đã trôi qua. Các kết nối được tái lập khi bạn cố gắng để truy cập Internet một lần nữa."
                }, {
                    type: "name",
                    title: "Kết nối thủ công",
                    content: "Trong chế độ này, các kết nối Internet được điều khiển bằng tay bằng cách nhấn vào chế độ kết nối hoặc ngắt kết nối button.This cũng hỗ trợ tối đa chức năng nhàn rỗi thời gian. Nhập thời gian nhàn rỗi Max (tính theo phút) để xác định thời gian tối đa các kết nối Internet có thể hoạt động trước khi nó được chấm dứt. Giá trị mặc định là 15 phút. Nếu bạn muốn kết nối Internet vẫn hoạt động ở tất cả các thời gian, nhập 0 (zero)."
                }]
            }, {
                type: "title",
                content: "Sao chép MAC"
            }, {
                type: "name",
                title: "Sử dụng địa chỉ MAC mặc định",
                content: "Chọn tùy chọn này để sử dụng địa chỉ MAC mặc định trong trường hợp các ISP đã không được gán một địa chỉ IP cho địa chỉ MAC của router."
            }, {
                type: "name",
                title: "Sử dụng địa chỉ MAC máy tính hiện tại",
                content: "Chọn tùy chọn này để sử dụng địa chỉ MAC của máy tính đang được kết nối trong trường hợp các ISP chỉ cho phép máy tính này để truy cập Internet."
            }, {
                type: "name",
                title: "Sử dụng địa chỉ MAC tùy chỉnh",
                content: "Chọn tùy chọn này để nhập địa chỉ MAC đã đăng ký bằng tay."
            }]
        },
        route: {
            TITLE: "Định tuyến nâng cao",
            CONTENT: [{
                type: "paragraph",
                content: "Advanced Routing được sử dụng để xác định trước một đường cố định cho các gói thông tin mạng để đạt được một máy chủ hoặc mạng cụ thể."
            }, {
                type: "title",
                content: " Định tuyến tĩnh"
            }, {
                type: "name",
                title: "Điểm đến Địa chỉ IP / Subnet Mask / Gateway",
                content: " Hiển thị Destination IP Address, Subnet Mask và Gateway của Route tĩnh."
            }, {
                type: "name",
                title: "Kích hoạt",
                content: " Cho biết tình trạng hiện tại của một tuyến tĩnh. Nhấp vào <b> Bóng </b> để bật (hoặc tắt) tuyến đường tĩnh."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: " Hiển thị tùy chọn để <b> Sửa </b> hoặc <b> Xóa </b> các mục tương ứng."
            }, {
                type: "note",
                title: "Để thiết lập một tuyến tĩnh",
                content: [
                    " Nhấp <b> Thêm </b>.",
                    " Nhập một địa chỉ IP đích để gán các tuyến tĩnh cho mục này.",
                    " Nhập một subnet mask trong dạng thập lục phân để xác định phần phần mạng và máy chủ của địa chỉ IP.",
                    " Nhập một định dạng địa chỉ IP gateway để kết nối router vào mạng hoặc máy chủ.",
                    " Chọn <b> LAN </b> hoặc một giao diện WAN để xác định loại địa chỉ IP đích.",
                    " Chọn <b> Bật mục này </b>.",
                    " Nhấp <b> OK </b>."
                ]
            }, {
                type: "title",
                content: " Bảng định tuyến hệ thống"
            }, {
                type: "paragraph",
                content: " Hệ thống định tuyến Bảng hiển thị tất cả các mục tuyến đường hợp lệ mà hiện nay đang được sử dụng."
            }, {
                type: "paragraph",
                content: " Bấm Refresh để cập nhật bảng định tuyến."
            }]
        },
        ddns: {
            TITLE: "Cài đặt DNS động",
            CONTENT: [{
                type: "paragraph",
                content: "DNS động cho phép bạn chỉ định một máy chủ cố định và tên miền đến một địa chỉ Internet IP động. Nó rất hữu ích khi bạn đang lưu trữ trang web của riêng bạn, máy chủ FTP, hoặc máy chủ khác ở phía sau router. Đầu tiên, bạn cần phải đăng ký với một nhà cung cấp dịch vụ DDNS như www.dyndns.com."
            }, {
                type: "step",
                title: "Để thiết lập một Dynamic DNS",
                content: [
                    "Chọn nhà cung cấp dịch vụ DNS động.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Nhập tên miền mà bạn nhận được từ các nhà cung cấp dịch vụ DDNS.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Note:",
                content: "Nếu bạn muốn sử dụng tài khoản DDNS mới, vui lòng đăng xuất trước, sau đó đăng nhập bằng tài khoản mới."
            }]
        },
        dhcp: {
            TITLE: "Máy chủ DHCP",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP (Dynamic Host Configuration Protocol) server tự động gán cấu hình TCP / IP cho các thiết bị khách hàng từ một hồ bơi địa chỉ IP. KHÔNG vô hiệu hóa các máy chủ DHCP mặc định trừ khi bạn có một máy chủ DHCP hoặc bạn muốn tự gán cấu hình TCP / IP cho các khách hàng cá nhân trên mạng của bạn."
            }, {
                type: "name",
                title: "IP Address Pool",
                content: "Nhập dải địa chỉ IP có thể được cho thuê đối với các khách hàng."
            }, {
                type: "name",
                title: "Thời gian thuê địa chỉ",
                content: "Nhập thời gian tương một địa chỉ IP được cho thuê đối với các khách hàng từ 1 đến 2880 phút."
            }, {
                type: "name",
                title: "Gateway mặc định",
                content: "Nhập địa chỉ IP của mạng LAN. (Không bắt buộc)"
            }, {
                type: "name",
                title: "Máy chủ DNS / Máy chủ DNS thứ hai",
                content: "Nhập địa chỉ máy chủ DNS được cung cấp bởi ISP của bạn. (Không bắt buộc)"
            }, {
                type: "title",
                content: "Danh sách máy khách"
            }, {
                type: "name",
                title: "Tổng số máy khách",
                content: "Hiển thị tổng số các khách hàng DHCP liên quan."
            }, {
                type: "name",
                title: "Tên khách  hàng",
                content: "Hiển thị tên của các DHCP client."
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC."
            }, {
                type: "name",
                title: "Giao Địa chỉ IP",
                content: "Hiển thị các địa chỉ IP được phân bổ cho các khách hàng bởi các máy chủ DHCP."
            }, {
                type: "name",
                title: "Thời gian cho thuê",
                content: "Hiển thị thời gian của các địa chỉ IP đã được cho thuê cho khách hàng."
            }, {
                type: "name",
                title: "Làm mới",
                content: "Nhấn vào đây để cập nhật các DHCP Client List."
            }, {
                type: "title",
                content: "Dành riêng địa chỉ"
            }, {
                type: "paragraph",
                content: "Bạn có thể tự dự trữ địa chỉ IP cho một khách hàng được kết nối với router. Một khi dự trữ, các địa chỉ IP sẽ chỉ được gán cho cùng một khách hàng bởi các máy chủ DHCP."
            }, {
                type: "name",
                title: "Địa chỉ MAC",
                content: "Hiển thị địa chỉ MAC của khách hàng với DHCP sử dụng địa chỉ IP."
            }, {
                type: "name",
                title: "IP dành riêng",
                content: "Hiển thị các địa chỉ IP dành riêng của khách hàng."
            }, {
                type: "name",
                title: "Mô tả",
                content: "Hiển thị mô tả của thiết bị."
            }, {
                type: "name",
                title: "Kích hoạt",
                content: "Nhấn vào đây để kích hoạt hoặc vô hiệu hóa các mục tương ứng."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để <b> Sửa </b> hoặc <b> Xóa </b> các khách hàng tương ứng."
            }, {
                type: "note",
                title: "Để đặt một địa chỉ IP cho một client DHCP",
                content: [
                    "Nhấp <b> Thêm </b>.",
                    "Nhập <b> địa chỉ MAC </b> của khách hàng.",
                    "Nhập địa chỉ IP mà bạn muốn dành cho khách hàng.",
                    "Nhập mô tả của các thiết bị.",
                    "Chọn <b> Bật mục này </b>.",
                    "Nhấp <b> OK </b>."
                ]
            }, {
                type: "note",
                title: "Để tùy chỉnh hoặc xóa một khách hàng hiện",
                content: [
                    "Nhấp vào <b> Chỉnh sửa </b> hoặc <b> Thùng rác </b> biểu tượng trong các mục tương ứng."
                ]
            }, {
                type: "title",
                content: "Vùng điều kiện"
            }, {
                type: "name",
                title: "ID Nhà cung cấp / IP bắt đầu / IP kết thúc / Chức năng",
                content: "Hiển thị ID Vender, Starting IP Address, Ending IP Address và cơ sở của các hồ điều kiện."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Cho biết tình trạng hiện tại của hồ bơi điều kiện. Nhấp vào biểu tượng bóng đèn để kích hoạt (hoặc vô hiệu hóa) các hồ điều kiện."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để <b> Sửa </b> hoặc <b> Xóa </b> các khách hàng tương ứng."
            }, {
                type: "note",
                title: "Để thêm một hồ điều kiện",
                content: [
                    "Nhấp <b> Thêm </b>.",
                    "Nhập tên thiết bị mạng LAN.",
                    "Nhập một giá trị để xác định các nhà cung cấp và chức năng của các máy khách DHCP.",
                    "Nhập địa chỉ IP bắt đầu các máy chủ DHCP gán cho các khách hàng.",
                    "Nhập địa chỉ IP kết thúc mà máy chủ DHCP gán cho các khách hàng.",
                    "Nhập gateway mặc định của máy chủ DHCP.",
                    "Chọn một loại thiết bị từ danh sách thả xuống.",
                    "Chọn một tùy chọn từ danh sách thả xuống.",
                    "Nhập giá trị tùy chọn.",
                    "Chọn <b> Bật mục này </b>.",
                    "Nhấp <b> OK </b>."
                ]
            }]
        },
        iptv: {
            TITLE: "Cài đặt IPTV",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Chọn để kích hoạt tính năng IPTV."
            }, {
                type: "name",
                title: "chế độ",
                content: "Chọn chế độ thích hợp theo ISP của bạn. Có sáu chế độ IPTV:",
                children: [{
                    type: "name",
                    title: "Cầu nối",
                    content: "Hãy chọn điều này nếu ISP của bạn không được liệt kê và không có thông số khác được xác định trước.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Gán cổng LAN của bạn cho dù có chức năng như các nhà cung cấp Internet hoặc là nhà cung cấp IPTV."
                    }]
                }, {
                    type: "name",
                    title: "Singapore-Singtel",
                    content: "Hãy chọn điều này nếu ISP của bạn là Exstream từ Singapore và các thông số cần thiết được xác định trước, bao gồm Internet ID / IPTV VLAN và ưu tiên, và (1/2/3/4) cổng LAN."
                }, {
                    type: "name",
                    title: "Malaysia-Unifi",
                    content: "Hãy chọn điều này nếu ISP của bạn là Unifi từ Malaysia và các thông số cần thiết được xác định trước, bao gồm Internet ID / IPTV VLAN và ưu tiên, và (1/2/3/4) cổng LAN."
                }, {
                    type: "name",
                    title: "Malaysia-Maxis",
                    content: "Hãy chọn điều này nếu ISP của bạn là Maxis từ Malaysia và các thông số cần thiết được xác định trước, bao gồm Internet / IP-Phone / IPTV VLAN ID và ưu tiên, và (1/2/3/4) cổng LAN."
                }, {
                    type: "name",
                    title: "Tùy chỉnh",
                    content: "Hãy chọn điều này nếu ISP của bạn không được liệt kê nhưng cung cấp các thông số cần thiết, bao gồm Internet / IP-Phone / IPTV VLAN ID và ưu tiên, và (1/2/3/4) cổng LAN.",
                    children: [{
                        type: "name",
                        title: "Internet / IP-Phone / IPTV VLAN ID / ưu tiên",
                        content: "Cấu hình VLAN ID được cung cấp bởi ISP của bạn."
                    }, {
                        type: "name",
                        title: "802.11Q Tag",
                        content: "Chọn có gắn thẻ các gói Internet với 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Gán cổng LAN của bạn để xem liệu có chức năng như các nhà cung cấp Internet hoặc là nhà cung cấp IPTV."
                    }, {
                        type: "name",
                        title: "IPTV Multicast VLAN ID / ưu tiên",
                        content: "Bạn có thể kích hoạt tính năng multicast IPTV như mong muốn, và cấu hình VLAN ID và ưu tiên theo ISP của bạn."
                    }]
                }]
            }, {
                type: "name",
                title: "IGMP Proxy",
                content: "Chọn phiên bản IGMP (Internet Group Management Protocol) Proxy, hoặc V2 hay V3, theo ISP của bạn."
            }]
        },
        usbManage: {
            TITLE: "Thiết bị lưu trữ USB",
            CONTENT: [{
                type: "paragraph",
                content: "Các <b> Thiết bị lưu trữ USB </b> màn hình hiển thị các thông tin cơ bản của thiết bị lưu trữ USB được kết nối thông qua cổng USB."
            }, {
                type: "name",
                title: "Quét",
                content: "Thông thường, các bộ định tuyến tự động phát hiện bất kỳ thiết bị mới được đính kèm. Nếu không, nhấp vào nút này để quét và làm mới màn hình với các thông tin cập nhật."
            }, {
                type: "name",
                title: "Tên ổ cứng",
                content: "Hiển thị tên của khối lượng USB."
            }, {
                type: "name",
                title: "Sức chứa",
                content: "Hiển thị tổng dung lượng lưu trữ của thiết bị USB."
            }, {
                type: "name",
                title: "Không gian trông",
                content: "Hiển thị có sẵn không gian lưu trữ miễn phí hiện nay."
            }, {
                type: "name",
                title: "hoạt động",
                content: "Tuỳ chọn này chỉ xuất hiện khi một thiết bị lưu trữ USB được kết nối với router. Chọn cho phép chia sẻ tập tin của thiết bị USB."
            }, {
                type: "name",
                title: "Tháo an toàn",
                content: "Nhấn vào nút này để tháo gắn một cách an toàn các thiết bị lưu trữ USB trước khi rút nó về thể chất từ ​​router. Xin lưu ý rằng nút Safely Remove chỉ xuất hiện khi có một thiết bị lưu trữ USB kết nối với router. Ngoài ra, hãy nhớ rằng bạn không thể gở bỏ thiết bị USB trong khi nó đang được sử dụng."
            }, {
                type: "title",
                content: "Cài đặt chia sẻ"
            }, {
                type: "name",
                title: "Tên mạng/Máy chủ đa phương tiện",
                content: "Hiển thị tên được sử dụng để truy cập vào thiết bị lưu trữ USB được kết nối."
            }, {
                type: "title",
                content: "Chia sẻ thư mục"
            }, {
                type: "name",
                title: "Chia sẻ tất cả",
                content: "Toggle On để chia sẻ tất cả các tập tin và thư mục hoặc Off để chỉ chia sẻ các thư mục đã chọn."
            }, {
                type: "name",
                title: "Kích hoạt xác thực",
                content: "Toggle On để kích hoạt tính năng xác thực mà đòi hỏi người sử dụng phải nhập tên người dùng và mật mã hợp lệ để truy cập vào tất cả các thư mục chia sẻ."
            }, {
                type: "name",
                title: "Tên thư mục",
                content: "Hiển thị tên của thư mục chia sẻ."
            }, {
                type: "name",
                title: "Đường dẫn thư mục",
                content: "Hiển thị đường dẫn đến thư mục chia sẻ."
            }, {
                type: "name",
                title: "Tên ổ cứng",
                content: "Hiển thị tên của khối lượng chia sẻ."
            }]
        },
        printSrv: {
            TITLE: "Máy chủ in ấn",
            CONTENT: [{
                type: "name",
                title: "Kích hoạt tính năng máy chủ in ấn",
                content: "Chuyển sang Mở để kích hoạt chức năng máy chủ in."
            }, {
                type: "name",
                title: "Tên máy in",
                content: "Hiển thị tên của máy in của bạn được kết nối với router."
            }]
        },
        diskSettings: {
            TITLE: "Thiết bị lưu trữ USB",
            CONTENT: [{
                type: "paragraph",
                content: "Các <b> Thiết bị lưu trữ USB </b> màn hình hiển thị các thông tin cơ bản của thiết bị lưu trữ USB được kết nối thông qua cổng USB."
            }, {
                type: "name",
                title: "Quét",
                content: "Thông thường, các bộ định tuyến tự động phát hiện bất kỳ thiết bị mới được đính kèm. Nếu không, nhấp vào nút này để quét và làm mới màn hình với các thông tin cập nhật."
            }, {
                type: "name",
                title: "Tên ổ cứng",
                content: "Hiển thị tên của khối lượng USB."
            }, {
                type: "name",
                title: "Sức chứa",
                content: "Hiển thị tổng dung lượng lưu trữ của thiết bị USB."
            }, {
                type: "name",
                title: "Không gian trông",
                content: "Hiển thị có sẵn không gian lưu trữ miễn phí hiện nay."
            }, {
                type: "name",
                title: "hoạt động",
                content: "Tuỳ chọn này chỉ xuất hiện khi một thiết bị lưu trữ USB được kết nối với router. Chọn cho phép chia sẻ tập tin của thiết bị USB."
            }, {
                type: "name",
                title: "Tháo an toàn",
                content: "Nhấn vào nút này để tháo gắn một cách an toàn các thiết bị lưu trữ USB trước khi rút nó về thể chất từ ​​router. Xin lưu ý rằng nút Safely Remove chỉ xuất hiện khi có một thiết bị lưu trữ USB kết nối với router. Ngoài ra, hãy nhớ rằng bạn không thể gở bỏ thiết bị USB trong khi khối lượng hiện tại đang bận."
            }, {
                type: "note",
                title: "Để thiết lập một máy chủ tập tin",
                content: [
                    "Gắn thiết bị lưu trữ USB vào cổng USB của router bằng cáp USB.",
                    "Các thiết bị USB mới được gắn kèm nên được tự động phát hiện bởi các bộ định tuyến và hiển thị các thông tin dưới <b> Cài đặt thiết bị </b>. Nếu không, hãy nhấp vào <b> Scan </b>.",
                    "Nhấp vào <b> hoạt động </b> biểu tượng để kích hoạt tính năng chia sẻ tập tin."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Tài khoản chia sẻ",
            CONTENT: [{
                type: "name",
                title: "Tài khoản",
                content: "Bạn có thể chọn <b> Sử dụng mặc định tài khoản </b> để đăng nhập vào các tập tin chia sẻ và thư mục hoặc <b> Sử dụng tài khoản mới </b> và nhập dưới đây để tạo một tài khoản người dùng mới."
            }, {
                type: "name",
                title: "Tên đăng nhập / Mật mã",
                content: "Nhập lên đến 15 ký tự có chứa chữ cái, số và / hoặc gạch chân chuỗi. Tên người dùng phải bắt đầu với một nhân vật bảng chữ cái. Những trường này là trường hợp nhạy cảm."
            }, {
                type: "paragraph",
                content: "Nhấn vào <b> Lưu </b> để lưu các thiết lập tài khoản."
            }, {
                type: "title",
                content: "Cài đặt chia sẻ"
            }, {
                type: "name",
                title: "Mạng / Tên Media Server",
                content: "Hiển thị tên được sử dụng để truy cập vào thiết bị lưu trữ USB được kết nối."
            }, {
                type: "name",
                title: "Kích hoạt",
                content: "Chọn hộp kiểm (s) để kích hoạt các phương pháp truy cập tương ứng (s)."
            }, {
                type: "name",
                title: "Phương pháp tiếp cận",
                content: "Có bốn phương pháp để truy cập các thiết bị lưu trữ USB chia sẻ.",
                children: [{
                    type: "name",
                    title: "Media server",
                    content: "Chọn tùy chọn này để cho phép người dùng trên mạng của bạn để xem ảnh, nghe nhạc, và xem phim trên thiết bị lưu trữ UBS chia sẻ của bạn từ các thiết bị DLNA hỗ trợ như máy tính, các thiết bị di động, và game console (PS2 / 3)."
                }, {
                    type: "name",
                    title: "Network Neighborhood",
                    content: "Chọn tùy chọn này để cho phép người dùng trên mạng của bạn để truy cập vào các nội dung được chia sẻ qua địa chỉ ghi dưới cột Địa chỉ."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Chọn tùy chọn này để kích hoạt tính năng máy chủ FTP cho phép khách hàng FTP và người sử dụng trên mạng của bạn để truy cập vào thiết bị lưu trữ USB thông qua địa chỉ FTP hiển thị dưới cột Địa chỉ. Để thay đổi cổng máy chủ FTP, nhập vào một số cổng mới và nhấp vào <b> Lưu </b> để áp dụng các thay đổi."
                }, {
			display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "FTP (qua Internet)",
                    content: "Chọn tùy chọn này để cho phép khách hàng FTP và người sử dụng truy cập từ xa, tải về và tải lên tập tin vào thiết bị lưu trữ USB chia sẻ thông qua FTP trên Internet."
                }]
            }, {
                type: "name",
                title: "Truy cập",
                content: "Hiển thị các địa chỉ sử dụng để truy cập vào thiết bị lưu trữ USB chia sẻ."
            }, {
                type: "name",
                title: "Hải cảng",
                content: "Hiển thị số cổng của máy chủ FTP."
            }, {
                type: "title",
                content: "Chia sẻ thư mục"
            }, {
                type: "name",
                title: "Chia sẻ tất cả",
                content: "Toggle On để chia sẻ tất cả các file và thư mục hoặc Off để chỉ chia sẻ các thư mục đã chọn."
            }, {
                type: "name",
                title: "Kích hoạt xác thực",
                content: "Toggle On để kích hoạt tính năng xác thực mà đòi hỏi người sử dụng phải nhập tên người dùng và mật mã hợp lệ để truy cập vào tất cả các thư mục chia sẻ."
            }, {
                type: "name",
                title: "Tên thư mục",
                content: "Hiển thị tên của thư mục chia sẻ."
            }, {
                type: "name",
                title: "Đường dẫn thư mục",
                content: "Hiển thị đường dẫn đến thư mục chia sẻ."
            }, {
                type: "name",
                title: "Media Sharing",
                content: "Hiển thị cho dù tính năng chia sẻ phương tiện truyền thông được kích hoạt (On) hay vô hiệu hóa (tắt)."
            }, {
                type: "name",
                title: "Tên ổ cứng",
                content: "Hiển thị tên của khối lượng chia sẻ."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Cho biết tình trạng hiện tại của một thư mục chia sẻ. Nhấp vào biểu tượng bóng đèn để kích hoạt (hoặc vô hiệu hóa) chia sẻ thư mục."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để <b> Sửa </b> hoặc <b> Xóa </b> vào thư mục tương ứng chia sẻ."
            }, {
                type: "note",
                title: "Để thêm một mục chia sẻ thư mục:",
                content: [
                    "Toggle Off <b> Chọn tất cả </b>.",
                    "Nhấp <b> Thêm </b>.",
                    "Chọn <b> Tên Tập </b> và <b> Đường dẫn thư mục </b>.",
                    "Tạo một thư mục tên.",
                    "Quyết định cách bạn chia sẻ các thư mục:. <br/> <B> Kích hoạt xác thực </b> - Chọn để yêu cầu người dùng xác thực với một tên người dùng hợp lệ và mật mã để truy cập vào các thư mục chia sẻ <br/> <b> Bật Viết truy cập </b> - Chọn cho phép người dùng thay đổi các nội dung thư mục <br/> <b> bật Media chia sẻ </b> -.. Chọn để kích hoạt tính năng chia sẻ truyền thông <br/>"
                ]
            }]
        },
        ipsec: {
            TITLE: "Cài đặt IPSec",
            CONTENT: [{
                type: "name",
                title: "Phát hiện điểm chết",
                content: "Chết Peer Detection (DPD) là một phương pháp phát hiện một Internet Key Exchange (IKE) ngang chết. DPD được sử dụng để đòi lại các nguồn lực bị mất trong trường hợp một mạng ngang hàng được tìm thấy đã chết và nó cũng được sử dụng để thực hiện IKE failover peer. Toggle On để kích hoạt tính năng phát hiện Peer Dead."
            }, {
                type: "name",
                title: "Tên kết nối / Gateway từ xa / Địa chỉ nội bộ / Địa chỉ từ xa",
                content: "Hiển thị Tên kết nối, Remote Gateway, Địa chỉ nội bộ, và địa chỉ từ xa của mục IPSec."
            }, {
                type: "name",
                title: "Trạng thái",
                content: "Hiển thị trạng thái của mục IPSec. Trạng thái bao gồm:",
                children: [{
                    type: "name",
                    title: "Tàn tật",
                    content: "Các mục bị vô hiệu hóa."
                }, {
                    type: "name",
                    title: "Xuống",
                    content: "Mục này sẽ được kích hoạt, nhưng không có kết nối."
                }, {
                    type: "name",
                    title: "Lên",
                    content: "Mục này sẽ được kích hoạt và kết nối được thực hiện thành công."
                }]
            }, {
                type: "name",
                title: "Kích hoạt",
                content: "Nhấp vào <b> Bóng </b> biểu tượng để kích hoạt hoặc vô hiệu hóa các mục nhập."
            }, {
                type: "name",
                title: "Tùy chỉnh",
                content: "Hiển thị tùy chọn để <b> Sửa </b> hoặc <b> Xóa </b> các mục tương ứng."
            }, {
                type: "name",
                title: "Thêm vào",
                content: "Nhấn vào đây để thêm một kết nối IPSec VPN mới."
            }, {
                type: "name",
                title: "Tên kết nối IPSec",
                content: "Nhập tên cho kết nối IPSec VPN."
            }, {
                type: "name",
                title: "Gateway IPSec từ xa (URL)",
                content: "Nhập địa chỉ IP gateway đích là WAN IP công cộng hoặc tên miền của máy chủ từ xa thiết bị đầu cuối VPN."
            }, {
                type: "name",
                title: "Đường hầm truy cập từ địa chỉ IP nội bộ",
                content: "Chọn Địa chỉ lớp mạng chỉ nếu bạn muốn toàn bộ mạng LAN để tham gia vào mạng VPN, hoặc chọn Địa chỉ đơn chỉ nếu bạn muốn có một IP duy nhất để tham gia vào mạng VPN."
            }, {
                type: "name",
                title: "Địa chỉ IP cho VPN",
                content: "Nhập địa chỉ IP của mạng LAN của bạn."
            }, {
                type: "name",
                title: "IP Subnet Mask",
                content: "Nhập subnet mask của mạng LAN của bạn."
            }, {
                type: "name",
                title: "Đường hầm truy cập từ địa chỉ IP từ xa",
                content: "Chọn Địa chỉ lớp mạng chỉ nếu bạn muốn toàn bộ mạng LAN từ xa đến các mạng VPN, hoặc chọn Địa chỉ đơn chỉ nếu bạn muốn có một IP duy nhất để tham gia vào mạng VPN."
            }, {
                type: "name",
                title: "Địa chỉ IP cho VPN",
                content: "Nhập địa chỉ IP của mạng LAN từ xa."
            }, {
                type: "name",
                title: "IP Subnet Mask",
                content: "Nhập subnet mask của mạng LAN từ xa."
            }, {
                type: "name",
                title: "Phương pháp trao đổi mã",
                content: "Chọn Tự động (IKE) hoặc Thủ công sẽ được sử dụng để xác thực các đồng nghiệp IPSec."
            }, {
                type: "name",
                title: "Phương pháp xác thực",
                content: "Chọn Mã chuyển tiếp tối ưu (đề nghị)."
            }, {
                type: "name",
                title: "Mật mã chia sẻ",
                content: "Tạo một khóa tiền chia sẻ được sử dụng để xác thực."
            }, {
                type: "name",
                title: "Mã chuyển tiếp tối ưu",
                content: "Chọn Enable (hoặc Disable) Perfect Forward Secrecy (PFS) là một giao thức bảo mật bổ sung cho các khóa tiền chia sẻ."
            }, {
                type: "name",
                title: "Nâng cao",
                content: "Nhấn vào đây để cấu hình các thiết lập nâng cao. Chúng tôi khuyên bạn nên giữ các cài đặt mặc định. Nếu bạn muốn thay đổi các thiết lập này, hãy chắc chắn rằng cả hai thiết bị đầu cuối máy chủ VPN sử dụng cùng một Encryption Algorithm, Liêm Algorithm, Diffie-Hellman Group và Lifetime chính trong cả hai phase1 và Phase2.",
                children: [{
                    type: "title2",
                    content: "Giai đoạn 1"
                }, {
                    type: "name",
                    title: "chế độ",
                    content: "Chọn <b> chính </b> để cấu hình các thông số tiêu chuẩn cho đàm phán IKE phase1. Chọn <b> Aggressive </b> cấu hình IKE Phase 1 của đường hầm VPN để thực hiện đàm phán trong một khoảng thời gian ngắn hơn. (Không xuất vì nó là kém an toàn.)"
                }, {
                    type: "name",
                    title: "Loại định danh địa phương",
                    content: "Chọn loại định danh địa phương để đàm phán IKE. WAN IP địa phương sử dụng một địa chỉ IP như nhận diện trong đàm phán IKE. FQDN (Fully Qualified Domain Name) sử dụng một tên người dùng như nhận diện."
                }, {
                    type: "name",
                    title: "Nhận diện địa phương",
                    content: "Từ định địa phương sẽ được điền tự động nếu <b> IP WAN địa phương </b> được chọn. Nếu <b> FQDN </b> được chọn, nhập tên người dùng của thiết bị địa phương được sử dụng như là indentifier đàm phán IKE."
                }, {
                    type: "name",
                    title: "Loại nhận diện từ xa",
                    content: "Chọn Loại số nhận dạng từ xa cho IKE. Từ xa WAN IP sử dụng một địa chỉ IP như nhận diện trong đàm phán IKE. FQDN sử dụng một tên người dùng như nhận diện."
                }, {
                    type: "name",
                    title: "Nhận dạng từ xa",
                    content: "Các cửa ngõ địa chỉ IP từ xa sẽ được điền tự động nếu <b> Remote WAN IP </b> được chọn. Nếu <b> FQDN </b> được chọn, nhập tên người dùng của các đồng đẳng từ xa được sử dụng như nhận diện để đàm phán IKE."
                }, {
                    type: "name",
                    title: "Thuật toán mã hóa",
                    content: "Chọn một trong những thuật toán mã hóa sau đây để đàm phán IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) mã hóa một khối 64-bit của đồng bằng văn bản với khóa 56-bit."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, mã hóa một văn bản đơn giản với phím 168-bit."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Sử dụng thuật toán AES và khóa 128-bit để mã hóa."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Sử dụng thuật toán AES và phím 192-bit để mã hóa."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Sử dụng thuật toán AES và khóa 256-bit để mã hóa."
                    }]
                }, {
                    type: "name",
                    title: "Liêm Algorithm",
                    content: "Chọn một trong những thuật toán toàn vẹn sau đàm phán IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) có một thông điệp có độ dài tùy ý và tạo ra một thông điệp 128-bit digest."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) đưa tin ít hơn 2 ^ 64 (2 đến sức mạnh của 64) trong bit và tạo ra một thông điệp 160-bit digest."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman Group cho Exchange chính",
                    content: "Chọn nhóm Diffie-Hellman được sử dụng trong giai đoạn đàm phán chính 1. Diffie-Hellman Group bộ sức mạnh của thuật toán trong bit."
                }, {
                    type: "name",
                    title: "Lifetime chính",
                    content: "Nhập khoảng thời gian (tính bằng giây) để thông qua trước khi thành lập một hiệp hội bảo mật mới IPSec (SA) với các thiết bị đầu cuối từ xa. Giá trị mặc định là 3600."
                }, {
                    type: "title2",
                    content: "Giai đoạn 2"
                }, {
                    type: "name",
                    title: "Thuật toán mã hóa",
                    content: "Chọn một trong những thuật toán mã hóa sau đây để đàm phán IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) mã hóa một khối 64-bit của đồng bằng văn bản với khóa 56-bit."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES, mã hóa một văn bản đơn giản với phím 168-bit."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Sử dụng thuật toán AES và khóa 128-bit để mã hóa."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Sử dụng thuật toán AES và phím 192-bit để mã hóa."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Sử dụng thuật toán AES và khóa 256-bit để mã hóa."
                    }]
                }, {
                    type: "name",
                    title: "Liêm Algorithm",
                    content: "Chọn một trong những thuật toán toàn vẹn sau đàm phán IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) có một thông điệp có độ dài tùy ý và tạo ra một thông điệp 128-bit digest."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) đưa tin ít hơn 2 ^ 64 (2 đến sức mạnh của 64) trong bit và tạo ra một thông điệp 160-bit digest."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman Group cho Exchange chính",
                    content: "Chọn nhóm Diffie-Hellman được sử dụng trong giai đoạn đàm phán chính 2. Diffie-Hellman Group bộ sức mạnh của thuật toán trong bit."
                }, {
                    type: "name",
                    title: "Key Life Time",
                    content: "Nhập khoảng thời gian (tính bằng giây) để thông qua trước khi thành lập một hiệp hội bảo mật mới IPSec (SA) với các thiết bị đầu cuối từ xa. Giá trị mặc định là 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Cài đặt kết nối Internet",
            CONTENT: [{
                type: "name",
                title: "Tự động phát hiện",
                content: "Nhấn vào nút này để có các bộ định tuyến tự động phát hiện loại kết nối Internet hiện tại của bạn."
            }, {
                type: "paragraph",
                title: "Chú ý",
                content: "Nếu bạn không chắc chắn mà kết nối Internet loại bạn có, sử dụng chức năng Auto Detect hoặc liên hệ với ISP của bạn để được giúp đỡ."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: IP tĩnh"
            }, {
                type: "name",
                title: "Địa chỉ IP / Subnet Mask / Gateway mặc định / DNS chính / DNS thứ hai",
                content: "Nhập các thông tin được cung cấp bởi ISP của bạn."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: IP động"
            }, {
                type: "name",
                title: "KHÔNG Clone MAC Address / Clone hiện tại MAC Địa chỉ",
                content: "Chọn định sao chép địa chỉ MAC của bạn hay không, theo ISP của bạn."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: PPPoE"
            }, {
                type: "name",
                title: "Tên đăng nhập / Mật mã",
                content: "Nhập tên người dùng và mật mã được cung cấp bởi ISP của bạn. Những trường này là trường hợp nhạy cảm."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: L2TP/PPTP"
            }, {
                type: "name",
                title: "Tên đăng nhập / Mật mã",
                content: "Nhập tên người dùng và mật mã được cung cấp bởi ISP của bạn. Những trường này là trường hợp nhạy cảm."
            }, {
                type: "name",
                title: "Kết nối thứ hai (IP động hoặc IP tĩnh)",
                children: [{
                    type: "name",
                    title: "IP động",
                    content: "Hãy chọn điều này nếu địa chỉ IP và Subnet Mask được gán tự động bởi ISP của bạn."
                }, {
                    type: "name",
                    title: "IP tĩnh",
                    content: "Hãy chọn điều này nếu địa chỉ IP, Subnet Mask, Gateway, DNS và địa chỉ được cung cấp bởi ISP của bạn, và nhập các thông tin vào các trường tương ứng."
                }]
            }, {
                type: "name",
                title: "Tên VPN Server IP / Domain",
                content: "Nhập địa chỉ VPN Server IP hoặc tên miền được cung cấp bởi ISP của bạn."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Máy chủ in ấn",
            CONTENT: [{
                type: "paragraph",
                content: "Bạn có thể cấu hình máy chủ in trên trang này."
            }, {
                type: "name",
                title: "Máy chủ in ấn",
                content: "Cho biết tình trạng hiện tại Enable / Disable của Print Server."
            }, {
                type: "name",
                title: "Tên máy in",
                content: "Đặt tên cho máy in kết nối với router."
            }, {
                type: "note",
                title: "Thực hiện theo các hướng dẫn dưới đây để thiết lập máy chủ in của bạn:",
                content: [
                    "Bước 1: Kết nối máy in USB vào cổng USB của router bằng cáp máy in USB.",
                    "Bước 2: Cài đặt trình điều khiển máy in trên máy tính của bạn.",
                    "Bước 3: Cài đặt bộ điều khiển USB Máy in TP-LINK trên máy tính của bạn. Hãy chạy đĩa CD tài nguyên hoặc tải về TP-LINK tiện ích điều khiển USB máy in từ trang web của chúng tôi: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Cài đặt nâng câo không dây 2.4GHz | 5GHz",
            CONTENT: [{
                type: "name",
                title: "Beacon Interval",
                content: "Nhập một giá trị từ 25 đến 1000 trong giây để xác định khoảng thời gian giữa các gói beacon được phát sóng của router để đồng bộ hóa các mạng không dây. Giá trị mặc định là 100 mili giây."
            }, {
                type: "name",
                title: "RTS Threshold",
                content: "nter một giá trị từ 1 đến 2346 trong byte để xác định kích thước gói dữ liệu truyền qua router. Theo mặc định, các RTS (Request gửi) kích thước Threshold là 2346. Nếu các gói kích thước là lớn hơn ngưỡng cài đặt trước, router sẽ gửi yêu cầu gửi các frame đến một trạm tiếp nhận nói riêng và thương lượng việc gửi một khung dữ liệu, hoặc người nào khác gói tin sẽ được gửi ngay lập tức."
            }, {
                type: "name",
                title: "DTIM Interval",
                content: "Nhập một giá trị từ 1 đến 255 để xác định khoảng thời gian của báo giao hàng Traffic Indication (DTIM). 1 cho biết các DTIM Interval là giống như Beacon Interval."
            }, {
                type: "name",
                title: "Nhóm chính Cập nhật Thời gian",
                content: "Nhập số giây (tối thiểu 30) để kiểm soát khoảng thời gian để mã hóa tự động gia hạn quan trọng. Giá trị mặc định là 0, cho thấy không có sự đổi mới quan trọng."
            }, {
                type: "name",
                title: "WMM Feature",
                content: "Các (đa phương tiện Wi-Fi) chức năng WMM đảm bảo các gói tin với những thông điệp ưu tiên cao được truyền ưu tiên. Nó là rất khuyến khích và được kích hoạt theo mặc định."
            }, {
                type: "name",
                title: "Tính năng GI ngắn",
                content: "Chức năng này làm tăng dung lượng dữ liệu bằng cách giảm thời gian Guard Interval (GI). Đó là đề nghị và được kích hoạt theo mặc định."
            }, {
                type: "name",
                title: "Tính năng cách ly AP",
                content: "Chọn hộp kiểm này để kích hoạt tính năng cách ly AP cho phép bạn giới hạn và hạn chế tất cả các thiết bị không dây trên mạng của bạn từ tương tác với nhau, nhưng vẫn có thể truy cập Internet. AP cô lập được tắt theo mặc định."
            }, {
        		display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Tính năng Fairness Feature",
                "content": "Chọn hộp chọn này để kích hoạt tính năng Airtime Fairness (ATF) cho phép bạn tối ưu hóa thông lượng của từng luồng. Bộ sắp xếp lưu lượng ATF sử dụng các đích đến airtime từng điểm để cân bằng việc sử dụng airtime  theo từng luồng."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Tiính năng Multi-User MIMO",
                "content": "Bấm chọn kích hoạt để sử dụng tính năng Multi-User MIMO."
			},  {
				"type": "name",
				"title": "Giảm nhiễu USB 3.0",
				"content": "Bấm chọn để Kích hoạt giảm nhiễu USB 3.0."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Kích hoạt tính năng WPS",
                content: "Chuyển sang Mở để kích hoạt tính năng WPS."
            }, {
                type: "paragraph",
                content: "Bấm Lưu để lưu cài đặt của bạn."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Chế độ ban đêm",
                content: "Khi kích hoạt tính năng này, đèn LED của router sẽ tự động được tắt trong suốt khoảng thời gian đã được xác định trước."
            }, {
                type: "name",
                title: "thời gian thời gian",
                content: "Nhập khoảng thời gian đèn LED của router sẽ được tắt."
            }, {
                type: "paragraph",
                content: "Bấm Lưu để lưu cài đặt của bạn."
            }, {
				display: "$.routerMode == 'Router'",
                type: "title",
                title: "Cài đặt bảo vệ DoS"
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Cấp độ bảo vệ DoS bảo vệ router khỏi các cuộc tấn công TCP-SYN-Flood, UDP-Flood, and ICMP-Flood."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "ICMP-FLOOD Gói Cấp",
                content: "Nhập một giá trị từ 5 đến 3600 để kích hoạt bảo vệ ICMP-FLOOD ngay lập tức khi số gói tin ICMP vượt quá giá trị ngưỡng được cài đặt trước."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "UDP-FLOOD Gói Cấp",
                content: "Nhập một giá trị từ 5 đến 3600 để kích hoạt bảo vệ UDP-FLOOD ngay lập tức khi số gói tin ICMP vượt quá giá trị ngưỡng được cài đặt trước."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "TCP-FLOOD Gói Cấp",
                content: "Nhập một giá trị từ 5 đến 3600 để kích hoạt bảo vệ TCP-SYN-FLOOD ngay lập tức khi số gói tin ICMP vượt quá giá trị ngưỡng được cài đặt trước."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Bấm Lưu để lưu cài đặt của bạn."
            }]
        },
        logConf: {
            TITLE: "Cài đặt bản ghi",
            CONTENT: [{
                type: "name",
                title: "lưu tại địa phương",
                content: "Chọn để lưu các bản ghi vào bộ nhớ địa phương của bạn.",
                children: [{
                    type: "name",
                    title: "Mức tối thiểu",
                    content: "Chọn mức tối thiểu trong danh sách thả xuống, và sau đó tất cả các sự kiện đăng nhập ở trên hoặc bằng mức được chọn sẽ được lưu lại."
                }]
            }, {
                type: "name",
                title: "lưu điều khiển từ xa",
                content: "Chọn để gửi các bản ghi vào địa chỉ IP cụ thể và cổng UDP của máy chủ đăng nhập hệ thống từ xa.",
                children: [{
                    type: "name",
                    title: "Mức tối thiểu",
                    content: "Chọn mức tối thiểu trong danh sách thả xuống, và sau đó tất cả các sự kiện đăng nhập ở trên hoặc bằng mức được chọn sẽ được lưu lại."
                }, {
                    type: "name",
                    title: "Server IP",
                    content: "Xác định địa chỉ IP của máy chủ đăng nhập hệ thống từ xa để mà các sự kiện sẽ được gửi đi."
                }, {
                    type: "name",
                    title: "Cổng máy chủ",
                    content: "Ghi rõ số cổng của máy chủ đăng nhập hệ thống từ xa để mà các sự kiện sẽ được gửi đi."
                }, {
                    type: "name",
                    title: "Tên cơ sở địa phương",
                    content: "Chọn tên cơ sở địa phương theo tên cơ sở máy chủ từ xa của bạn."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Không dây",
            CONTENT: [{
                type: "name",
                title: "Bảo vệ",
                content: "Bạn có thể chọn một trong các tùy chọn bảo mật sau đây.",
                children: [{
                    type: "name",
                    title: "Không bảo mật",
                    content: "Các trạm không dây sẽ kết nối đến Router mà không có bất cứ mã hóa nào. Chúng tôi đặc biệt khuyến nghị bạn chọn một trong các chế độ sau đây để kích hoạt bảo mật."
                }, {
                    type: "name",
                    title: "WPA / WPA2-Personal",
                    content: "Chọn WPA dựa vào mật mã chia sẻ trước.",
                    children: [{
                        type: "name",
                        title: "Phiên bản",
                        content: "Bạn có thể chọn một trong các phiên bản sau",
                        children: [{
                            type: "name",
                            title: "xe hơi",
                            content: "Chọn WPA-PSK hoặc WPA2-PSK tự động dựa trên năng lực và yêu cầu của trạm không dây ."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Mã WPA2 chia sẻ trước."
                        }]
                    }, {
                        type: "name",
                        title: "Mã hóa",
                        content: "Bạn có thể chọn một trong hai Auto, TKIP hoặc AES."
                    }, {
                        type: "name",
                        title: "Mật khẩu không dây",
                        content: "Bạn có thể nhập ASCII hoặc ký tự thập lục phân. Đối với hệ thập lục phân, chiều dài nên từ 8 đến 64 ký tự; cho ASCII, chiều dài nên từ 8 đến 63 ký tự."
                    }]
                }, {
                    type: "name",
                    title: "WPA / WPA2-Enterprise",
                    content: "Chọn WPA dựa trên Radius Server.",
                    children: [{
                        type: "name",
                        title: "Phiên bản",
                        content: "Bạn có thể chọn một trong các phiên bản sau",
                        children: [{
                            type: "name",
                            title: "xe hơi",
                            content: "Chọn WPA hoặc WPA2 tự động dựa trên năng lực trạm không dây và yêu cầu."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi Protected Access."
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA phiên bản 2."
                        }]
                    }, {
                        type: "name",
                        title: "Mã hóa",
                        content: "Bạn có thể chọn một trong hai Auto, TKIP hoặc AES."
                    }, {
                        type: "name",
                        title: "Radius Server IP",
                        content: "Nhập địa chỉ IP của Radius Server."
                    }, {
                        type: "name",
                        title: "Cảng Radius",
                        content: "Nhập cổng mà dịch vụ bán kính sử dụng."
                    }, {
                        type: "name",
                        title: "Radius Mật khẩu",
                        content: "Nhập mật khẩu cho Radius Server."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Chọn 802.11 bảo mật WEP.",
                    children: [{
                        type: "name",
                        title: "Kiểu",
                        content: "Bạn có thể chọn một trong các loại sau đây",
                        children: [{
                            type: "name",
                            title: "xe hơi",
                            content: "Chọn Shared Key hoặc mở hệ thống loại chứng thực tự động dựa trên khả năng và yêu cầu các trạm không dây của."
                        }, {
                            type: "name",
                            title: "Chìa khóa chung",
                            content: "Chọn 802.11 xác thực khóa chung."
                        }, {
                            type: "name",
                            title: "Hệ thống mở",
                            content: "Chọn 802.11 xác thực hệ thống mở."
                        }]
                    }, {
                        type: "name",
                        title: "Key được chọn",
                        content: "Chọn trong số bốn phím sẽ được sử dụng."
                    }, {
                        type: "name",
                        title: "Định dạng WEP Key",
                        content: "Bạn có thể chọn dạng ASCII hoặc Hexadecimal. ASCII dạng viết tắt của bất kỳ sự kết hợp của các ký tự bàn phím trong thời gian quy định. định dạng thập lục phân đại diện cho bất kỳ sự kết hợp của các chữ số thập lục phân (0-9, một-f, A-F) trong thời gian quy định."
                    }, {
                        type: "name",
                        title: "Loại khóa",
                        content: "Bạn có thể chọn chiều dài khóa WEP (64-bit hoặc 128-bit hoặc 152-bit.) Để mã hóa. \"Disabled\" có nghĩa là nhập WEP key này không hợp lệ.",
                        children: [{
                            type: "name",
                            title: "Đối với mã hóa 64-bit",
                            content: "Bạn có thể nhập 10 chữ số thập lục phân (bất kỳ sự kết hợp của 0-9, một-f, A-F, và quan trọng là null không được phép) hoặc 5 ký tự ASCII."
                        }, {
                            type: "name",
                            title: "Đối với mã hóa 128-bit",
                            content: "Bạn có thể nhập 26 chữ số thập lục phân (bất kỳ sự kết hợp của 0-9, một-f, A-F, và quan trọng là null không được phép) hoặc 13 ký tự ASCII."
                        }, {
                            type: "name",
                            title: "Đối với mã hóa 152-bit",
                            content: "Bạn có thể nhập 32 chữ số thập lục phân (bất kỳ sự kết hợp của 0-9, một-f, A-F, và quan trọng là null không được phép) hoặc 16 ký tự ASCII."
                        }]
                    }, {
                        type: "name",
                        title: "Giá trị cốt lõi",
                        content: "Nhập mật khẩu cho WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "chế độ",
                content: "Trường này xác định chế độ không dây mà router hoạt động trên."
            }, {
                type: "name",
                title: "Độ rộng kênh",
                content: "Băng thông của kênh vô tuyến."
            }, {
                type: "name",
                title: "Kênh",
                content: "Trường này xác định tần số vận hành sẽ được sử dụng. Nó không phải là cần thiết để thay đổi các kênh không dây trừ khi bạn nhận thấy các vấn đề can thiệp với một điểm truy cập gần đó. Nếu bạn chọn tự động, sau đó AP sẽ chọn kênh tự động tốt nhất."
            }, {
                type: "name",
                title: "Truyền điện",
                content: "Ở đây bạn có thể xác định công suất phát của các Router. Bạn có thể chọn Cao, Trung hay thấp mà bạn muốn. Cao là thiết lập mặc định và được khuyến khích."
            }, {
                type: "paragraph",
                content: "Nhấn Save để <strong> lưu </strong> và áp dụng các cấu hình"
            }]
        },
       diagnostic: {
            TITLE:  "Công cụ  chẩn đoán", 
            CONTENT: [{
                type: "paragraph",
                content: "Router cung cấp công cụ Ping và Traceroute để giúp bạn khắc phục các sự cố kết nối mạng. Công cụ Ping sẽ gửi các gói tin đến một địa chỉ IP đích hoặc tên miền và ghi lại kết quả, chẳng hạn như số lượng các gói dữ liệu gửi/nhận, và thời gian. Công cụ Traceroute gửi gói tin đến một địa chỉ IP đích hoặc tên miền và hiển thị số lượng trạm và thời gian để đạt đến đích."
             }, {
                type: "paragraph",
                content: "Bạn có thể ping và traceroute một thiết bị mạng bằng địa chỉ IP hoặc tên miền, chẳng hạn như google.com, yahoo.com, vv"
            }, {
                type: "note",
                title: "Để chẩn đoán sử dụng Ping",
                content: [
                    "Nhập địa IP chỉ đích hoặc tên miền.",
                    "Bấm chọn biểu tượng Mũi tên để mở trình đơn Nâng cao và chỉ định Đếm Ping, và Kích thước gói tin Ping. (Tùy chọn)",
                    "Bấm chọn Bắt đầu."
                ]
            }, {
                type: "note",
                title: "Để chẩn đoán sử dụng Traceroute",
                content: [
                    "Nhập địa IP chỉ đích hoặc tên miền.",
                    "Bấm chọn biểu tượng Mũi tên để mở trình đơn Nâng cao và chỉ định số trạm (đạt đến) trong trường Traceroute Max TTL (Time to Live). Giá trị mặc định là 20. (Tùy chọn)",
                    "Bấm chọn Bắt đầu."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "Địa chỉ MAC",
                content: "Địa chỉ vật lý duy nhất của router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IP LAN",
                content: "Giữ địa chỉ IP mặc định của router (192.168.0.1) hoặc nhập một địa chỉ mới. Địa chỉ IP này có thể được sử dụng để đăng nhập vào trang web quản lý của router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Dạng địa chỉ",
                "content": "Cách để cấu hình địa chỉ IP của router. Bạn có thể cấu hình bằng phương pháp thủ công (IP tĩnh) hoặc tự động (DHCP thông minh)."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "IP LAN",
                "content": "Giữ địa chỉ IP mặc định của router (192.168.0.254) hoặc nhập một địa chỉ mới. Địa chỉ IP này có thể được sử dụng để đăng nhập vào trang web quản lý của router."
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Chọn một định danh được sử dụng bởi cổng LAN để định tuyến lưu lượng bên trong và bên ngoài từ danh sách thả xuống hoặc nhập một định dạng subnet mask mới. Giá trị mặc định là 255.255.255.0."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IGMP Snooping",
                content: "IGMP (Internet Management Group Protocol) được sử dụng để quản lý multicast trên mạng TCP/IP. Một số ISP sử dụng IGMP để thực hiện cấu hình từ xa cho các thiết bị máy khách, chẳng hạn như router. IGMP được kích hoạt mặc định."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                title: "Chú ý",
                content: "Nếu địa chỉ IP LAN mới không nằm trong cùng một lớp mạng IP LAN cũ, dãy địa chỉ IP trong máy chủ DHCP sẽ được tự động thay đổi; Tuy nhiên, Máy chủ ảo và Máy chủ DMZ  sẽ không có hiệu lực cho đến khi chúng được cấu hình lại."
            }, {
				display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "title",
                content: "Link Aggregation"
            }, {
            	display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Link Aggregation kết hợp hai cổng với nhau để tạo ra một đường dẫn dữ liệu  băng thông lớn, giúp duy trì một hệ thống mạng dây tốc độ cao hơn và ổn định hơn."
			}, {
                display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "note",
                title: "Để áp dụng tính năng link aggregation",
                content: [
                    "Chuyển sang mở để kích hoạt tính năng Link Aggregation.",
                    "Chọn chế độ link aggregation<br><b> LACP active:</b> kích hoạt LCAP (Link Aggregation Control Protocol) vô điều kiện. .<br><b> LACP passive:</b> kích hoạt LCAP chỉ khi một thiết bị LACP được phát hiện.",
					"Xác định hai cổng cho link aggregation.",
					"Bấm chọn Lưu."
                ]
            }]
        },
        ddos: {
            TITLE: "Tường lửa",
            CONTENT: [{
                type: "name",
                title: "SPI Firewall",
                content: "Tường lừa SPI (Stateful Packet Inspection) ngăn chặn các cuộc tấn công không gian mạng và kiểm tra lưu lượng được truyền qua router. Tường lửa SPI được kích hoạt mặc định."
            }, {
                type: "title",
                title: "Bảo vệ Dos"
            }, {
                type: "name",
                title: "Bảo vệ DoS",
                content: "DoS (Denial of Service) bảo vệ bảo vệ mạng LAN của bạn chống lại các cuộc tấn công DoS khỏi việc gửi yêu cầu máy chủ đến mạng . Theo mặc định, Bảo vệ DoS bị vô hiệu hóa (tắt)."
            }, {
                type: "name",
                title: "ICMP-FLOOD Tấn lọc",
                content: "Kích hoạt tính năng để ngăn chặn các cuộc tấn công lũ ICMP (Internet Control Message Protocol)."
            }, {
                type: "name",
                title: "UDP-FLOOD Tấn lọc",
                content: "Kích hoạt tính năng để ngăn chặn các cuộc tấn công UDP (User Datagram Protocol)."
            }, {
                type: "name",
                title: "TCP-FLOOD Tấn lọc",
                content: "Kích hoạt tính năng để ngăn chặn các cuộc tấn công Transmission Control Protocol-Synchronize (TCP-SYN).",
                children: [{
                    type: "name",
                    title: "Tắt",
                    content: "Không có bảo vệ."
                }, {
                    type: "name",
                    title: "thấp",
                    content: "Cấp thấp của bảo vệ và ít ảnh hưởng đến hiệu suất router."
                }, {
                    type: "name",
                    title: "Trung bình",
                    content: "Cấp vừa của bảo vệ và tác động khá đáng kể về hiệu suất router."
                }, {
                    type: "name",
                    title: "Cao",
                    content: "Cấp độ bảo vệ cao nhưng tác động đáng kể về hiệu suất router."
                }]
            }, {
                type: "name",
                title: "Cấm LAN Ping",
                content: "Kích hoạt tính năng để cấm ping từ cổng LAN."
            }, {
                type: "name",
                title: "Cấm WAN Ping",
                content: "Kích hoạt tính năng để cấm ping từ cổng WAN."
            }, {
                type: "title",
                title: "Bị chặn Danh sách chủ DoS"
            }, {
                type: "name",
                title: "Bị chặn Danh sách chủ DoS",
                content: "Liệt kê các địa chỉ IP và địa chỉ MAC từ bất kỳ nguồn tấn công DoS bị chặn."
            }, {
                type: "name",
                title: "Để xóa một hoặc nhiều mục",
                content: "Trong danh sách máy chủ, chọn mục hoặc các mục mà bạn muốn xóa và nhấn Xóa trên bảng."
            }]
        },
        ipv6: {
            TITLE: "Internet IPv6",
            CONTENT: [{
                type: "name",
                title: "Kích hoạt IPv6",
                content: "Chọn để kích hoạt (Mở) hoặc vô hiệu hóa (Tắt) tính năng IPv6 của router."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: IP tĩnh"
            }, {
                type: "name",
                title: "IP tĩnh",
                content: "Chọn dạng này nếu ISP của bạn sử dụng gán địa chỉ IPv6 tĩnh."
            }, {
                type: "name",
                title: "IPv6 Địa chỉ / IPv6 Gateway  mặc định / IPv6  Máy chủ  DNS / Máy chủ  DNS thứ hai IPv6",
                content: "Nhập các thông số được cung cấp bởi ISP của bạn."
            }, {
                type: "name",
                title: "MTU (byte)",
                content: "Kích thước MTU (Maximum Transmission Unit) mặc định và điển hình cho hầu hết các mạng Ethernet là 1500 byte. Không thay đổi  kích thước MTU mặc định trừ khi được yêu cầu bởi ISP của bạn."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: IP động"
            }, {
                type: "name",
                title: "IP động",
                content: "Chọn dạng này nếu ISP của bạn sử dụng địa chỉ IPv6 động."
            }, {
                type: "name",
                title: "IPv6 Địa chỉ / IPv6 Cổng",
                content: "Các tham số này sẽ được gán tự động bởi máy chủ DHCPv6 từ ISP của bạn."
            }, {
                type: "name",
                title: "Giải quyết Loại",
                content: "Chọn kiểu kết nối của kết nối IPv6."
            }, {
                type: "name",
                title: "MTU (byte)",
                content: "Kích thước MTU (Maximum Transmission Unit) mặc định và điển hình cho hầu hết các mạng Ethernet là 1500 byte. Không thay đổi  kích thước MTU mặc định trừ khi được yêu cầu bởi ISP của bạn."
            }, {
                type: "name",
                title: "Sử dụng sau đây IPv6 DNS Địa chỉ",
                content: "Chọn hộp chọn này và nhập địa chỉ máy chủ DNS được cung cấp bởi ISP của bạn theo định dạng thập phân có chấm. Giao diện WAN này sẽ ưu tiên sử dụng các máy chủ DNS xác định này."
            }, {
                type: "name",
                title: "host Name",
                content: "Nhập một giá trị vào trường này để chỉ định tên máy chủ của router."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Chọn dạng này nếu ISP của bạn sử dụng PPPoEv6, và cung cấp cho bạn tên đăng nhập và mật mã."
            }, {
                type: "name",
                title: "Tên đăng nhập / Mật mã / Xác  nhận mật mã",
                content: "Nhập các thông số được cung cấp bởi ISP của bạn."
            }, {
                type: "name",
                title: "Giải quyết Loại",
                content: "Chọn kiểu kết nối của kết nối IPv6."
            }, {
                type: "name",
                title: "Tên dịch vụ",
                content: "Nhập tên dịch vụ được cung cấp bởi ISP của bạn. Nếu không được cung cấp, hãy để trống."
            }, {
                type: "name",
                title: "Tên máy chủ",
                content: "Nhập tên máy chủ được cung cấp bởi ISP của bạn. Nếu không được cung cấp, hãy để trống."
            }, {
                type: "name",
                title: "MTU (byte)",
                content: "Kích thước MTU (Maximum Transmission Unit) mặc định và điển hình cho hầu hết các mạng Ethernet là 1480 byte.",
                children: [{
                    type: "paragraph",
                    content: "<B> Lưu ý </b>: Trong một số ít trường hợp, ISP của bạn có thể yêu cầu bạn điều chỉnh kích thước MTU để có hiệu suất mạng tốt hơn. Bạn không nên thay đổi các giá trị trừ khi thực sự cần thiết."
                }]
            }, {
                type: "name",
                title: "Sử dụng các thông tin IPv6 chỉ định bởi ISP",
                content: "Chọn hộp chọn này và nhập vào địa chỉ IP và Gateway cung cấp bởi ISP của bạn."
            }, {
                type: "name",
                title: "Sử dụng sau đây IPv6 DNS Địa chỉ",
                content: "Chọn lựa chọn này nếu bạn muốn nhập địa chỉ DNS được cung cấp bởi ISP của bạn theo cách thủ công. Nếu không được chọn, router sẽ lấy địa chỉ DNS động từ ISP của bạn."
            }, {
                type: "title",
                title: "Dạng kết nối Internet: 6to4 Tunnel"
            }, {
                type: "name",
                title: "6to4 Tunnel",
                content: "Chọn dạng này nếu ISP của bạn sử dụng triển khai 6to4 để gán địa chỉ."
            }, {
                type: "title",
                title: "IPv6 LAN"
            }, {
                type: "name",
                title: "Giải quyết Loại",
                content: "Chọn một lựa chọn phù hợp theo ISP của bạn.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Chọn tùy chọn này để gán địa chỉ IPv6 đến các máy tính trong mạng LAN của bạn thông qua RADVD.",
                    children: [{
                        type: "name",
                        title: "Kích hoạt tính năng RDNSS",
                        content: "Chọn hộp chọn để kích hoạt tính năng RDNSS."
                    }, {
                        type: "name",
                        title: "Bật Ula Prefix",
                        content: "Chọn hộp chọn để kích hoạt tính năng Ula Prefix.",
                        children: [{
                            type: "name",
                            title: "Ula Prefix",
                            content: "Nhập Ula Prefix."
                        }, {
                            type: "name",
                            title: "Ula Prefix Chiều dài",
                            content: "Nhập Chiều dài Ula Prefix. Giá trị mặc định là 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6 server",
                    content: "Để tự động gán địa chỉ IP cho các máy khách trong mạng LAN.",
                    children: [{
                        type: "name",
                        title: "Bắt đầu IPv6 Địa chỉ",
                        content: "Nhập địa chỉ IPv6 bắt đầu."
                    }, {
                        type: "name",
                        title: "End IPv6 Địa chỉ",
                        content: "Nhập địa chỉ IPv6 kết thúc."
                    }, {
                        type: "name",
                        title: "Thời gian cho thuê",
                        content: "Nhập khoảng thời gian một máy khách DHCP có thể thuê địa chỉ IPv6 động hiện tại được gán bởi router. Sau khi địa chỉ IPv6 động hết hạn, người sử dụng sẽ được gán tự động một địa chỉ IPv6 động mới. Giá trị mặc định là 86400 giây."
                    }]
                }]
            }, {
                type: "name",
                title: "Site Loại Prefix",
                content: "Chọn dạng để gán tiền tố đến các địa chỉ IPv6. Dạng Ủy nhiệm và Tĩnh được cung cấp."
            }, {
                type: "name",
                title: "ủy nhiệm",
                children: [{
                    type: "name",
                    title: "Prefix ủy nhiệm WAN kết nối",
                    content: "Chọn một kết nối WAN từ danh sách thả xuống để gán tiền tố."
                }]
            }, {
                type: "name",
                title: "tĩnh",
                children: [{
                    type: "name",
                    title: "Site Prefix",
                    content: "Nhập giá trị cho các site prefix."
                }, {
                    type: "name",
                    title: "Site Prefix Chiều dài",
                    content: "Nhập giá trị cho chiều dài site prefix."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Kích hoạt máy chủ VPN",
				content: "Chọn hộp chọn này để kích hoạt máy chủ OpenVPN."
			},{
				type: "name",
				title: "Dạng dịch vụ",
				content: "Chọn giao thức liên lạc cho máy chủ OpenVPN: UDP hoặc TCP."
			},{
				type: "name",
				title: "Cổng dịch vụ",
				content: "Nhập sô cổng giao tiếp trong khoảng 1024 đến 65535. Giá trị mặc định và phổ biến của cổng dịch vụ là 1194."
			},{
				type: "name",
				title: "Subnet/Netmask VPN",
				content: "Nhập dải địa chỉ IP máy chủ OpenVPN có thể gán cho các máy khách."
			},{
				type: "name",
				title: "Máy khách truy cập",
				content: "CHọn dạng truy cập cho máy khách OpenVPN của bạn."
			},{
				type: "name",
				title: "Chỉ mạng gia đình",
				content: "Máy khách chỉ có thể truy cập router và mạng LAN. Định tuyến máy khách mặc định sẽ không thay đổi."
			},{
				type: "name",
				title: "Internet và Mạng gia đình",
				content: "Máy khách có thể truy cập router, mạng LAN và Internet. Định tuyến máy khách mặc định sẽ được thay đổi."
			},{
				type: "paragraph",
				content: "Bấm chọn Lưu để lưu cài đặt của bạn."
            },{
                type: "title",
                content: "Chứng nhận"
            },{
                type: "paragraph",
                content: "Sử dụng chứng nhận đối với thông tin và định danh của kết nối VPN cho máy tính từ xa."
            },{
                type: "name",
                title: "Tạo",
                content: "Bấm để tạo chứng nhận mới."
            },{
                type: "title",
                content: "Tập tin cấu hình"
            },{
                type: "name",
                title: "Xuất",
                content: "Bấm chọn nút này để lưu tập tin cấu hình OpenVPN được dùng để thêm một kết nối VPN mới."
 			},{
                type: "title",
                content: "Hướng dẫn cài đặt máy khách VPN"
			},{
				type: "step",
                title: "Để kích hoạt và kết nối thiết bị máy khách đến máy chủ OpenVPN:"
			},{
				type: "paragraph",
				content: "Trước khi bạn cấu hình máy chủ VPN, vui lòng cấu hình Dịch vụ DNS Động (khuyến nghị) hoặc gán một địa chỉ IP tĩnh cho cổng WAN. Vui lòng đảm bảo cổng ngoài của cài đặt NAT không phải là cổng dịch vụ, và Thời gian hệ thống của bạn đã được đồng bộ với Internet"
			},{
				type: "step",
				title:"",
				content:[
					"Chọn kích hoạt máy chủ VPN.",
					"Cấu hình thông số máy chủ OpenVPN (Dạng dịch vụ, Cổng dịch vụ và Máy khách truy cập) và bấm chọn Lưu.",
					"Bấm chọn Xuất để lưu tập tin cấu hình.",
					"Trên thiết bị máy khách, tải và cài đặt tiện ích máy khách OpenVPN từ <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Hỗ trợ các nền tảng bao gồm Windows, Mac OSX, Linux.",
					"Khởi chạy tiện ích máy khách OpenVPN và thêm một kết nối VPN mới bằng cách sử dụng tập tin cấu hình đã lưu để kết nối máy khách tới máy chủ VPN."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Để biết thêm về máy khách OpenVPN, vui lòng truy cập <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "name",
				title: "Kích hoạt máy chủ VPN",
				content: "CHọn hộp chọn này để kích hoạt máy chủ VPN PPTP"
			},{
				type: "name",
				title: "Địa chỉ IP máy khách",
				content: "Nhập khoảng địa chỉ IP (lên đến 10 máy khách) có thể được cấp phát cho máy khách từ máy chủ VPN PPTP."
			},{
				type: "name",
				title: "Tên đăng nhập và mật mã",
				content: "Nhập tên đăng nhập và mật mã để xác thực máy khách với máy chủ VPN PPTP."
			},{
				type: "paragraph",
				content: "Bấm chọn Lưu để lưu cài đặt của bạn."
			},{
                type: "title",
                content: "Hướng dẫn cài đặt máy khách VPN"
			},{
				type: "step",
                		title: "Để kích hoạt và kết nối thiết bị máy khách đến máy chủ VPN PPRP:"
			},{
				type: "paragraph",
				content: "Trước khi cấu hình máy chủ VPN PPTP, vui lòng cấu hình Dịch vụ DNS Động (khuyến nghị) hoặc gán một địa chỉ IP tĩnh cho cổng WAN. Vui lòng đảm bảo cổng ngoài của cài đặt NAT không phải là 1723 và Thời gian hệ thống của bạn đã được đồng bộ với Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Chọn kích hoạt máy chủ VPN.",
					"Cấu hình thông số máy chủ VPN PPTP và bấm chọn Lưu.",
					"Trên thiết bị máy khách, tạo một kết nối VPN PPTP. Các nền tảng được hỗ trợ bao gồm Windows, Mac OSX, Linux, iOS và Android.",
                    			"Khởi chạy chương trình VPN PPTP, thêm một kết nối mới và nhập tên miền dịch vụ DDNS đã được đăng ký hoặc địa chỉ IP tĩnh đã được gán cho cổng WAN, để kết nối thiết bị máy khách đến máy chủ VPN PPTP."
				]				
			}]
		},

		vpnServerStatus: {
			TITLE: "Kết nối VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Trang này hiển thị các máy khách hiện đang kết nối đến máy chủ VPN OpenVPN và PPTP được lưu trữ trên router."
			},{
				type: "paragraph",
				content: "Bấm chọn biể tượng dấu trừ để ngắt kết nối máy khách tương ứng."
			}]
		},
        cloudBasic: {
            TITLE: "Cloud TP-Link",
            CONTENT: [{
                type: "paragraph",
                content: "Dịch vụ Cloud của TP-Link sẽ cho phép bạn giám sát mạng của bạn từ xa theo thời gian thực, truy cập và quản lý thiết bị TP-Link của bạn từ Internet ở bất cứ nơi đâu vào bất cứ thời điểm nào."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Thông tin tài khoản"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Hiển thị thông tin ID TP-Link của bạn. Bạn có thể chỉnh sửa thông tin tài khoản bằng cách nhấp vào biểu tượng chỉnh sửa."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Thông tin thiết bị"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Hiển thị thông tin thiết bị của bạn, bao gồm tài khoản Cloud quản lý thiết bị."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Kết hợp tài khoản"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Bảng này hiển thị tất cả tài khoản cloud đang được liên kết với thiết bị."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "To bind a user account",
                content: [
                    "Bấm chọn Kết hợp.",
                    "Nhập email đã đăng ký mà bạn muốn kết hợp.",
                    "Bấm chọn Lưu."
                ]
            }]
        }
    };
})(jQuery);
