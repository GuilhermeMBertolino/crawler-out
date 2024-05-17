let snIndex = 0,
  sns = ["11", "22", "33", "44", "55", "66"];

module.exports = {
    sip_info:{
        "sip_en|1": ["1", "0"]
    },
  wan_info: {
    "array|1-2": [
      {
        "id|+1": 1,
        ip: "@IP('192.168.1.0-255')",
        mac: "@MAC",
        netmask: "255.255.254.254",
        gw: "@IP('192.168.0-1.0-255')",
        mode: "0",
        first_dns: "@IP",
        sec_dns: "@IP",
        ipv6: "@IP('192.168.1.0-255')",
        ipv6_gw: "@IP('192.168.1.0-255')",
        ipv6_first_dns: "@IP('192.168.1.0-255')",
        ipv6_sec_dns: "@IP('192.168.1.0-255')"
      }
    ]
  },
  wan_statistic: {
    "array|1-2": [
      {
        "id|+1": 1,
        "up_speed|1-10000": 1,
        "down_speed|1-10000": 1
      }
    ]
  },
  online_list: {
    "array|1-24": [
      {
        "factory|1": ["xiaomi", "huawei", "acer", "apple", "htc", "others"],
        "dev_ip": "@IP",
        "dev_mac": "@MAC",
        "dev_name": "@STRING(6, 12)",
        "download_speed|1-10000": 1,
        "upload_speed|1-10000": 1,
        "link_type|1": [ "1", "2", "0","3","4"], //    WIFI_24G: 1, WIFI_5G: 2, WIRE: 3
        "connect_time": '@STRING("number", 1, 6)',
        "is_guest|1": ["0", "1"],
        "rssi": '@STRING("number", 1, 2)',
        "tx_rate": "@natural(0, 5)",
        "wifi_mode|1":["bridge","AC"],
        sn() {
          snIndex = snIndex % 3;
          return sns[snIndex++];
        },
      }
    ]
  },
  node_info: {
    "array|1-5": [
      {
        "id|+1": 1,
        ip: "@IP",
        netmask: "@IP",
        gw: "@IP",
        first_dns: "@IP",
        sec_dns: "@IP",
        "role|1": ["1"],
        "net_status|1": ["1", "2"],
        "up_speed|1-10000": 1,
        "down_speed|1-10000": 1,
        serial_number: '@STRING("number", 6, 12)',
        "link_status|1": ["0", "1", "2", "3"], // 0离线设备, 1:good, 2:not bad, 3: off line
        "led|1": ["1", "0"],
        "location": "@STRING(6, 12)",
        lan_mac: "@MAC",
        wan_mac: "@MAC",
        "5Gwifi_mac": "@MAC",
        "2Gwifi_mac": "@MAC",
        dut_name: "@STRING(6, 12)",
        dut_version: "@STRING(6, 12)",
        Uptime: "234556",
        up_date:"2020-10-19",
        link_quality:"",
        sn() {
          snIndex = snIndex % 6;
          return sns[snIndex++];
        },
        groupsn() {
          return sns.slice(0, parseInt(Math.random() * 6)).join(",");
        }
      }
    ]
  },
  // "node_info": [
  //     {
  //         "id": "1",
  //         "ip": "192.168.5.1",
  //         "role": "1",
  //         "netmask": "",
  //         "gw": "",
  //         "first_dns": "",
  //         "sec_dns": "",
  //         "net_status": "1",
  //         "up_speed": "",
  //         "down_speed": "",
  //         "serial_number": "123456789XY565319",
  //         "link_status": "1",
  //         "led": "1",
  //         "location": "超长的地址超长的地址超长的地址超长的地址超长的地址超长的地址超长的地址超长的地址",
  //         "lan_mac": "C8:3A:35:F0:15:20",
  //         "wan_mac": "C8:3A:35:F0:15:20",
  //         "5Gwifi_mac": "C8:3A:35:F0:15:24",
  //         "2Gwifi_mac": "C8:3A:35:F0:15:21",
  //         "dut_name": "MW6v2",
  //         "dut_version": "V1.0.0.18(8593)",
  //         "sn": "123456789XY565319",
  //         "groupsn": "123456789XY565319"
  //     }, {
  //       "id": "2",
  //       "ip": "192.168.5.12",
  //       "role": "2",
  //       "netmask": "",
  //       "gw": "",
  //       "first_dns": "",
  //       "sec_dns": "",
  //       "net_status": "1",
  //       "up_speed": "",
  //       "down_speed": "",
  //       "serial_number": "123456789XY111111",
  //       "link_status": "0",
  //       "led": "1",
  //       "location": "超长的地址超长的地址超长的地址超长的地址超长的地址超长的地址超长的地址超长的地址",
  //       "lan_mac": "C8:3A:35:F0:15:20",
  //       "wan_mac": "C8:3A:35:F0:15:20",
  //       "5Gwifi_mac": "C8:3A:35:F0:15:24",
  //       "2Gwifi_mac": "C8:3A:35:F0:15:21",
  //       "dut_name": "MW6v2",
  //       "dut_version": "V1.0.0.18(8593)",
  //       "sn": "123456789XY111111",
  //       "groupsn": "123456789XY565319"
  //   }
  // ],
  wifi: {
    "ssid": "@FIRST",
    "pass": "567894432",
    "security":"psk",
    "type":"aes"
  },
  guest_info: {
    "guest_en|1": ["1", "0"],
    guest_ssid: "@FIRST",
    guest_pass: "12345678",
    guest_time: "4"
  },
  tr069_info: {
    refresh: true,
    tr069_en: "1",
    acs_addr: "abc.com",
    acs_user: "1",
    acs_pass: "2",
    notice_en: "0",
    con_req_en: "1",
    notice_time: "100",
    terminal_user: "3",
    terminal_pass: "4",
    port: "0",
    stun_en: "0",
    stun_addr: "1.1.1.1",
    stun_port: "0"
  },
  elink: {
    refresh: true,
    template: {
      "elink_en|1": ["1", "0"]
    }
  },
  upnp_info: {
    refresh: true,
    template: {
      "upnp_en|1": ["1", "0"]
    }
  },
  ipv6_info: {
    refresh: true,
    template: {
      "ipv6_en|1": ["1", "0"],
       link_mode:'3',
        "con_type": "6rd",
        "isp_username": "123456",
        "isp_password": "123456",
        "non_temp_addr": "0",
        "prefix_delegate": "0",
        "wan_addr": "2001:250:207:1::ff02/64",
        "gate_way": "3ff5:akj",
        "wan_pre_dns": "1111:444",
        "wan_alt_dns": "111233",
        "lan_type": "manual",
        "lan_addr": "2005:20::1/64",
        "prefix_type": "manual",
        "lan_prefix": "2005:20::1",
        "dhcp_en": "0",
        "dhcp_type": "manual",
        "start_id": "3333",
        "end_id": "6666",
        "dns_type_v6": "manual",
        "lan_pre_dns": "2005:20::1",
        "lan_alt_dns": "2005:20::1",
        "wan_type": "1",
        "lan_ip": "192.168.1.1",
        "lan_mask": "255.255.255.0",
        "wan_ip": "192.168.99.100"
    }
  },
  remote_web: {
    remote_en: "0",
    remote_ip: "0.0.0.0",
    remote_port: "8080",
  },
  dns_conf: {
    "mode|1": ["0", "1"],
    first_dns: "@IP",
    sec_dns: "@IP",
    first_dns_v6: "",
    sec_dns_v6: ""
  },
  serach_node: {
    refresh: true,
    delay: 4000,
    template: {
      "array": [
        {
          sn: '2222222222'
         },
         {
          sn: '1111111111'
         }
      ]
    }
  },
  link_module: {
    "array|1-2": [
      {
        "id|+1": 1,
        // "link_mode|1": ["0", "1", "2", "3"]
        "link_mode": '0'
      }
    ]
  },
  dynamic_wan_info: {
    "array|1-2": [
      {
        "id|+1": 1,
        ip: "@IP('192.168.0-255.1')",
        mac: "@MAC",
        netmask: "@IP",
        gw: "@IP"
      }
    ]
  },
  static_wan_info: {
    "array|1-2": [
      {
        "id|+1": 1,
        ip: "@IP('192.168.1.0-255')",
        mac: "@MAC",
        netmask: "255.255.254.254",
        gw: "@IP('192.168.0-1.0-255')"
      }
    ]
  },
  pppoe_cfg: {
    "array|1-2": [
      {
        "id|+1": 1,
        account: "@last",
        pass: "12345678",
        mtu: "1",
        mac: "@MAC"
      }
    ]
  },
  mac_clone: {
    "array|1-2": [
      {
        "id|+1": 1,
        "clone_type|1": ["0", "1", "2"],
        clone_mac: "@MAC",
        default_mac: "@MAC",
        dut_mac: "@MAC"
      }
    ]
  },
  net_link_status: {
    refresh: true,
    template: {
      "array|1-2": [
        {
          "net_status": '3'
          // "net_status|1": ["0", "1", "2", "3", "4"]
        }
      ]
    }
  },
  net_link_check: {
    refresh: true,
    delay: 5000,
    template: {
      "array|1-2": [
        {
          // "link_mode|1": ['-1', '0', '1', '2']
          link_mode: "0"
        }
      ]
    }
  },
  login_pwd: {
    login_pwd: ""
  },
  parental_list: {
    "list": [{
      control_name: "@string(32)",
      "enable|1": ["0", "1"],
      "control_list": [{
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:33",
        dev_name: "@string(32)",
      }, {
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:34",
        dev_name: "@string(32)",
      }, {
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:35",
        dev_name: "@string(32)",
      }],
      "allow_date": ["1", "2", "3", "4"],
      start_time: '@time("HH:mm")',
      end_time: '@time("HH:mm")',
      "url_type|1": ["black", "white"],
      "urlList": "baidu.com,google.com"
    }, {
      control_name: "@string(32)",
      "enable|1": ["0", "1"],
      "control_list": [{
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:36",
        dev_name: "@string(32)",
      }, {
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:37",
        dev_name: "@string(32)",
      }, {
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:38",
        dev_name: "@string(32)",
      }],
      "allow_date": ["1", "2", "4", "5", "6", "7"],
      start_time: '@time("HH:mm")',
      end_time: '@time("HH:mm")',
      "url_type|1": ["black", "white"],
      "urlList": "baidu.com,google.com"
    }, {
      control_name: "@string(32)",
      "enable|1": ["0", "1"],
      "control_list": [{
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:39",
        dev_name: "@string(32)",
      }, {
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:40",
        dev_name: "@string(32)",
      }, {
        dev_ip: "@IP('192.168.0.0-255')",
        dev_mac: "C8:3A:35:11:22:41",
        dev_name: "@string(32)",
      }],
      "allow_date": ["1", "2", "3", "5", "6", "7"],
      start_time: '@time("HH:mm")',
      end_time: '@time("HH:mm")',
      "url_type|1": ["black", "white"],
      "urlList": "baidu.com,google.com"
    }]
  },
  "device_list": {
    "array|15-20": [{
      "id|+1": 1,
      dev_name: "@string(0,32)",
      dev_ip: "@IP('192.168.0.0-255')",
      dev_mac: "C8:3A:35:11:22:@natural(31, 48)",
      link_type: "@natural(0, 3)",
      "factory|1": ["xiaomi", "huawei", "acer", "apple", "htc", "others"]
    }]
  },
  port_list: {
    "list|1-10": [{
      "id|+1": 1,
      intranet_ip: "@IP('192.168.0.0-255')",
      "intranet_port|1": ["@natural(1, 4094)", "@natural(100, 200)-@natural(200, 300)"],
      "extranet_port|1": ["@natural(1, 4094)", "@natural(500, 600)-@natural(700, 800)"],
      "protocol|1": ["TCP", "UDP", "TCP&UDP"]
    }]
  },
  localhost: {
    localhost_name: "@string(0,32)",
    localhost_ip: "@IP('192.168.0.0-255')",
    localhost_mac: "@MAC"
  },
  qos_info: {
    "qos_en|1": ["0", "1"],
    upload_limit: "@natural(1, 1000)",
    download_limit: "@natural(1, 1000)"
  },
  lan_info: {
    lan_ip: "@IP('192.168.0.0-255')",
    lan_mask: "255.255.255.0",
    "dhcp_en|1": ['0', '1'],
    start_ip: "@IP('192.168.0.0-100')",
    end_ip: "@IP('192.168.0.100-255')",
    lease_time: "86400",
    dns1: "@IP('192.168.0.0-100')",
    dns2: ""
  },
  mac_filter: {
    "filter_type|1": ['white', 'black'],
    "black_list|2-10": [{
      dev_name: "@string(0,32)",
      dev_mac: "@MAC"
    }],
    "white_list|2-10": [{
      dev_name: "@string(0,32)",
      dev_mac: "@MAC"
    }]
  },
  double_lan: {
    "double_lan_en|1": ['0', '1'],
    start_ip: "@IP('192.168.0.0-100')",
    end_ip: "@IP('192.168.0.100-255')",
    gateway: "192.168.0.1",
    mask: "255.255.255.0"
  },
  static_ip: {
    "array|12-20": [{
      dev_name: "@string(0,32)",
      dev_ip: "@IP('192.168.0.0-255')",
      dev_mac: "@MAC",
      "is_bind|1": ['0', '1'],
      "status|1": ['0', '1'],
    }]
  },
  online_upgrade: {
    refresh: true,
    delay: 4000,
    template: {
      systemVersion: "v2.3.4.6",
      wanStatus: "1",
      action: "getVersion/upgrade",
      versionInfo: {
        hasNewSoftVersion: "1",
        verErrCode: "0",
        updateContent: ["更新log1", "更新log2"]
      },
      upgradeInfo: { //升级模块
        upgradeStatus: "true",
        "downloadSize|+1": 1,
        totalSize: "5",
        upErrCode: "",
        downTime: '12'
      }
    }
  },
  login_type: {
    refresh: true,
    template: {
      "user_type|1": ["admin", "guest"]
    }
  },
  getversion: {
    hasNew: "1",
    sysHasNew: "1",
    version: "1.0.0",
    changelog: "test1\n test2\n test3\n"
  },
  getupgradestatus: {
    // "code|1": ['0', '1', '2', '3', '4']
    "code": '3'
  }
};
