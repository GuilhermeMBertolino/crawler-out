var telephonyProvider = {
    "AT": {
        location_name: "Austria",
        location_sname: "AT",
        isps: [{
            name: "peoplefone",
            reg: ["sip.peoplefone.ch", "sip.peoplefone.de", "sip.peoplefone.at"],
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: ["sip.peoplefone.ch", "sip.peoplefone.de", "sip.peoplefone.at"],
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber
                },
                address: {},
                authID: {
                    label: $.tpLang.s_str.sipusername,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            }
        }, {
            name: "sipcall",
            reg: "free1.voipgateway.org",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {}
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "innosoft.at",
            reg: ["my.innofon.at", "pbx.innofon.at"],
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5160",
            outproxy: "0.0.0.0",
            outproxyPort: "5160",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                address: {},
                authID: {
                    label: $.tpLang.s_str.voipusername,
                    prefix: 'u'
                },
                password: {
                    label: $.tpLang.s_str.voippassword
                }
            },
            data: {
                multiExtension: ['u', {
                    authID: 0
                }]
            }
        }, {
            name: "Telecom",
            reg: "voice.at.telecom5.net",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "voice.at.telecom5.net",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.telenumber
                },
                password: {
                    label: $.tpLang.s_str.voippassword
                }
            },
            data: {
                multiAuthUserName: [{
                    numbers: 0
                }]
            }
        }, {
            name: "tele2",
            reg: ["sip1.tele2.at", "sip2.tele2.at", "sip3.tele2.at", "sip4.tele2.at", "sip5.tele2.at", "sip6.tele2.at", "sip7.tele2.at"],
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber
                },
                address: {},
                password: {}
            }
        }]
    },
    "AU": {
        location_name: "Australia",
        location_sname: "AU",
        isps: [{
            name: "AAPT",
            reg: "siptrunk.mel.aapt.com.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 4,
                "G.729a/b": 3,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "Anttel VoIP",
            reg: "sip.anttel.com.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 3,
                "G.711ALaw": 2,
                "G.726_32": 4,
                "G.729a/b": 1,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "Australian Phone",
            reg: "sip.australianphone.com.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 4,
                "G.711ALaw": 1,
                "G.726_32": 3,
                "G.729a/b": 2,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "DoDo VoIP",
            reg: "voip.dodo.com.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "ENGIN",
            reg: "byo.engin.com.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 2,
                "G.711ALaw": 3,
                "G.726_32": 4,
                "G.729a/b": 1,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                address: {},
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "FAKTORTEL",
            reg: "sip.faktortel.com.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 2,
                "G.711ALaw": 3,
                "G.726_32": 4,
                "G.729a/b": 1,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "iiTalk (VoIP)",
            reg: ["sip.act.iinet.net.au", "sip.nsw.iinet.net.au", "sip.nt.iinet.net.au", "sip.qld.iinet.net.au", "sip.sa.iinet.net.au", "sip.tas.iinet.net.au", "sip.vic.iinet.net.au", "sip.wa.iinet.net.au"],
            regPort: "5060",
            proxy: ["sip.act.iinet.net.au", "sip.nsw.iinet.net.au", "sip.nt.iinet.net.au", "sip.qld.iinet.net.au", "sip.sa.iinet.net.au", "sip.tas.iinet.net.au", "sip.vic.iinet.net.au", "sip.wa.iinet.net.au"],
            proxyPort: "5060",
            outproxy: ["sip.act.iinet.net.au", "sip.nsw.iinet.net.au", "sip.nt.iinet.net.au", "sip.qld.iinet.net.au", "sip.sa.iinet.net.au", "sip.tas.iinet.net.au", "sip.vic.iinet.net.au", "sip.wa.iinet.net.au"],
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.voipphonenumber
                },
                address: {},
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "NODEPHONE",
            reg: "sip.internode.on.net",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.voipphonenumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "iPrimus",
            reg: "bwas01.voip.iprimus.net.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 3,
                "G.711ALaw": 2,
                "G.726_32": 4,
                "G.729a/b": 1,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "SpinTel VoIP",
            reg: "voip.spintel.net.au",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 3,
                "G.711ALaw": 2,
                "G.726_32": 4,
                "G.729a/b": 1,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }, {
            name: "Gotalk",
            reg: "sip.gotalk.com",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 3,
                "G.711ALaw": 2,
                "G.726_32": 4,
                "G.729a/b": 1,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.sipnumber
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    password: 0
                }]
            }
        }]
    },
    "CH": {
        location_name: "Switzerland",
        location_sname: "CH",
        isps: [{
            name: "netvoip.ch",
            reg: "sip.netvoip.ch",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.netvoip+':'
                },
                password: {
                    label: $.tpLang.s_str.netvoipPasswd+':'
                }
            }
        }, {
            name: "iway.ch",
            reg: "sip.phone.iway.ch",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.telenumber
                },
                authID: {
                    label: $.tpLang.s_str.voipusername,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            }
        }, {
            name: "peoplefone",
            reg: ["sip.peoplefone.ch", "sip.peoplefone.de", "sip.peoplefone.at"],
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5160",
            outproxy: ["sip.peoplefone.ch", "sip.peoplefone.de", "sip.peoplefone.at"],
            outproxyPort: "5160",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber
                },
                address: {},
                authID: {
                    label: $.tpLang.s_str.sipusername,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            }
        }, {
            name: "telephoenix.ch",
            reg: "sip0x.telephoenix.com",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber
                },
                authID: {
                    label: $.tpLang.s_str.sipname,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            }
        }, {
            name: "green.ch",
            reg: "sip.green.ch",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber
                },
                authID: {
                    label: $.tpLang.s_str.sipname,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            }
        }]
    },
    "DE": {
        location_name: "Germany",
        location_sname: "DE",
        isps: [{
            name: "Telekom",
            reg: "tel.t-online.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    label: $.tpLang.s_str.emailaddress,
                    required: false
                },
                password: {}
            },
            validate: {
                numbers: [{
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [0, 10]
                }, {
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [3, 22]
                }]
            }
        }, {
            name: "1&1 Internet",
            reg: "sip.1und1.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.voipnumber,
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    label: $.tpLang.s_str.voippassword
                }
            },
            validate: {
                numbers: [{
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [0, 10]
                }, {
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [3, 22]
                }]
            },
            data: {
                multiExtension: ['49', {
                    numbers: 0
                }, {
                    numbers: 1
                }],
                multiAuthUserName: ['49', {
                    numbers: 0
                }, {
                    numbers: 1
                }]
            }
        }, {
            name: "Vodafone/Arcor",
            reg: ".sip.arcor.de",
            regPort: "5060",
            proxy: ".sip.arcor.de",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    label: $.tpLang.s_str.vodPasswort,
                    required: true
                },
                address: {}
            },
            validate: {
                numbers: [{
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [0, 10]
                }, {
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [3, 22]
                }]
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    numbers: 1
                }],
                multiAuthUserName: [{
                    numbers: 0
                }, {
                    numbers: 1
                }]
            }
        }, {
            name: "DUS.net",
            reg: "proxy.dus.net",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.dusnetnumber,
                    required: false
                },
                authID: {
                    label: $.tpLang.s_str.sipline,
                    prefix: '000387',
                    sizes: [24]
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            data: {
                multiExtension: ['000387', {
                    authID: 0
                }],
                multiAuthUserName: ['000387', {
                    authID: 0
                }]
            }
        }, {
            name: "easybell",
            reg: "sip.easybell.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    required: false
                },
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "congstar",
            reg: "tel2.congstar.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {},
                authID: {
                    label: $.tpLang.s_str.sipusername,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }]
            }
        }, /*{
            name: "congstar(via QSC)",
            reg: "tel2.congstar.qsc.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            configs: {
                numbers: {},
                authID: {
                    label: $.tpLang.s_str.sipusername,
                    required: false
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }]
            }
        },*/ {
            name: "QSC/Q-DSL home",
            reg: "sip.qsc.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            validate: {
                numbers: [{
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [0, 10]
                }, {
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [3, 22]
                }]
            },
            data: {
                multiExtension: [{
                    numbers: 0
                }, {
                    numbers: 1
                }],
                multiAuthUserName: [{
                    numbers: 0
                }, {
                    numbers: 1
                }]
            }
        }, {
            name: "sipgate",
            reg: "sipgate.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.telenumber
                },
                authID: {
                    label: $.tpLang.s_str.sipid
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "sipgate team",
            reg: "sipgate.de",
            regPort: "5060",
            proxy: "proxy.live.sipgate.de",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.telephoneno
                },
                authID: {
                    label: $.tpLang.s_str.sipid
                },
                password: {
                    label: $.tpLang.s_str.sippassword
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "sipload",
            reg: "sip.sipload.com",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "sip.sipload.com",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.intertelnumber,
                    required: false
                },
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "Ventengo",
            reg: "sip.ventengo.de",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.intertelnumber
                },
                authID: {
                    label: $.tpLang.s_str.sipname
                },
                password: {}
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "GMX",
            reg: "sip.gmx.net",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.voipnumber,
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    label: $.tpLang.s_str.voippassword
                }
            },
            validate: {
                numbers: [{
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [0, 10]
                }, {
                    trimBlank: true,
                    charRange: true,
                    middleBlank: true,
                    special: true,
                    lengthRange: [3, 22]
                }]
            },
            data: {
                multiExtension: ['49', {
                    numbers: 0
                }, {
                    numbers: 1
                }],
                multiAuthUserName: ['49', {
                    numbers: 0
                }, {
                    numbers: 1
                }]
            }
        }, {
            name: "Bellsip",
            reg: "bellsip.com",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.intertelnumber,
                    required: false
                },
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }]
    },
    "FR": {
        location_name: "France",
        location_sname: "FR",
        isps: [{
            name: "OVH",
            reg: "sip.ovh.net",
            regPort: "5060",
            proxy: "sip.ovh.net",
            proxyPort: "5060",
            outproxy: "sip.ovh.net",
            outproxyPort: "5962",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    label: $.tpLang.s_str.dscpassword
                }
            },
            data: {
                multiExtension: ['0033', {
                    numbers: 1
                }],
                multiAuthUserName: ['0033', {
                    numbers: 1 
                }]
            }
        }]
    },
    "GB": {
        location_name: "United Kingdom",
        location_sname: "GB",
        isps: [{
            name: "Sipgate",
            reg: "sipgate.co.uk",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Voipfone",
            reg: "sip.voipfone.net",
            regPort: "5060",
            proxy: "sip.voipfone.net",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "1VOC",
            reg: "sip.1voc.com",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Tel2",
            reg: "phone.tle2.co.uk",
            regPort: "5060",
            proxy: "phone.tle2.co.uk",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Voipcheap",
            reg: "sip.voipcheap.com",
            regPort: "5060",
            proxy: "sip.voipcheap.com",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Voiptalk",
            reg: "sip.voipcheap.com",
            regPort: "5060",
            proxy: "nat.voiptalk.org",
            proxyPort: "5065",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }]
    },
    "GR": {
        location_name: "Greece",
        location_sname: "GR",
        isps: [{
            name: "CIP Telecom",
            reg: "213.175.221.14",
            regPort: "5060",
            proxy: "213.175.221.147",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Inter Telecom",
            reg: "sip.intertelecom.gr",
            regPort: "5060",
            proxy: "sip.intertelecom.gr",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Viva",
            reg: "voip.viva.gr",
            regPort: "5060",
            proxy: "voip.viva.gr",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }]
    },
    "IT": {
        location_name: "Italy",
        location_sname: "IT",
        isps: [{
            name: "VoIPVoice",
            reg: "link.voipvoice.it",
            regPort: "5060",
            proxy: "link.voipvoice.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "BluFace (Kebu)",
            reg: "cust.it.blueface.com",
            regPort: "5060",
            proxy: "cust.it.blueface.com",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Messagenet(5060)",
            reg: "sip.messagenet.it",
            regPort: "5060",
            proxy: "sip.messagenet.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Messagenet(5061)",
            reg: "sip.messagenet.it",
            regPort: "5061",
            proxy: "sip.messagenet.it",
            proxyPort: "5061",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Clouditalia",
            reg: "voip.eutelia.it",
            regPort: "5060",
            proxy: "voip.eutelia.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Olimontel",
            reg: "sip2.olimontel.it",
            regPort: "5060",
            proxy: "sip2.olimontel.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "OpenVoIP",
            reg: "sip.openvoip.it",
            regPort: "5060",
            proxy: "sip.openvoip.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "OpenVoIP(Naked)",
            reg: "naked.openvoip.it",
            regPort: "5060",
            proxy: "naked.openvoip.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Neomedia",
            reg: "sip.neomedia.it",
            regPort: "5060",
            proxy: "sip.neomedia.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Teracom",
            reg: "voip.terastudio.it",
            regPort: "5060",
            proxy: "voip.terastudio.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }, {
            name: "Ehiweb",
            reg: "voip.vivavox.it",
            regPort: "5060",
            proxy: "voip.vivavox.it",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                authID: {
                    required: false
                },
                password: {}
            }
        }]
    },
    "PL": {
        location_name: "Poland",
        location_sname: "PL",
        isps: [{
            name: "Orange",
            reg: "neofon.tp.pl",
            regPort: "5060",
            proxy: "neofon.tp.pl",
            proxyPort: "5060",
            outproxy: "neofon.tp.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber,
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: ['48', {
                    numbers: 0
                }, {
                    numbers: 1
                }],
                multiAuthUserName: ['48', {
                    numbers: 0
                }, {
                    numbers: 1
                }, '@neofon.tp.pl']
            }
        }, {
            name: "IPFON",
            reg: "sip.ipfon.pl",
            regPort: "5060",
            proxy: "sip.ipfon.pl",
            proxyPort: "5060",
            outproxy: "sip.ipfon.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "FCN",
            reg: ["sip.fcn.pl", "sip.freeconet.pl"],
            regPort: "5060",
            proxy: ["sip.fcn.pl", "sip.freeconet.pl"],
            proxyPort: "5060",
            outproxy: ["sip.fcn.pl", "sip.freeconet.pl"],
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                address: {},
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "HaloNet",
            reg: "sip.halonet.pl",
            regPort: "5060",
            proxy: "sip.halonet.pl",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "Net4Call",
            reg: "voip.net4call.pl",
            regPort: "5060",
            proxy: "voip.net4call.pl",
            proxyPort: "5060",
            outproxy: "voip.net4call.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "Actio",
            reg: "sip.actio.pl",
            regPort: "5060",
            proxy: "sip.actio.pl",
            proxyPort: "5060",
            outproxy: "sip.actio.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber,
                    inputNum: 2,
                    sizes: [8, 19],
                    placeholders: ["Area Code", "Phone Number"]
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: ['48', {
                    numbers: 0
                }, {
                    numbers: 1
                }],
                multiAuthUserName: ['48', {
                    numbers: 0
                }, {
                    numbers: 1
                }]
            }
        }, {
            name: "FreeHalo.pl",
            reg: "sip.freehalo.eu",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "SPIKON",
            reg: "sip.spikon.pl",
            regPort: "5060",
            proxy: "sip.spikon.pl",
            proxyPort: "5060",
            outproxy: "sip.spikon.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "IPCall",
            reg: "voip.ipcall.pl",
            regPort: "5060",
            proxy: "voip.ipcall.pl",
            proxyPort: "5060",
            outproxy: "voip.ipcall.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "muff",
            reg: "sip.muff.pl",
            regPort: "5060",
            proxy: "sip.muff.pl",
            proxyPort: "5060",
            outproxy: "sip.muff.pl",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "SuperVoIP.pl",
            reg: "sip.supervoip.pl",
            regPort: "5060",
            proxy: "sip.supervoip.pl",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "iFON",
            reg: "sip.ifon.pl",
            regPort: "5060",
            proxy: "sip.ifon.pl",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }, {
            name: "easyCALL",
            reg: "sip.easycall.pl",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                authID: {
                    label: $.tpLang.s_str.voipusername
                },
                password: {
                    required: true
                }
            },
            data: {
                multiExtension: [{
                    authID: 0
                }]
            }
        }]
    },
    location500: {
        location_name: "Other country",
        location_sname: "",
        isps: [{
            name: $.tpLang.s_str.otherprovider || "Other",
            reg: "0.0.0.0",
            regPort: "5060",
            proxy: "0.0.0.0",
            proxyPort: "5060",
            outproxy: "0.0.0.0",
            outproxyPort: "5060",
            codec: {
                "G.711MuLaw": 1,
                "G.711ALaw": 2,
                "G.726_32": 3,
                "G.729a/b": 4,
                "G.722": 11,
                "X_TP_T38": 500
            },
            configs: {
                numbers: {
                    label: $.tpLang.s_str.phonenumber
                },
                address: {},
                authID: {
                    required: false
                },
                password: {},
                advanced: {}
            }
        }]
    }
};
