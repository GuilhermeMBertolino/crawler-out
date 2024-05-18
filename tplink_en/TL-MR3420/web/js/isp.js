var regionCodeInfo = [
    [8, "AL ", 0, 3, "Albania"],
    [12, "DZ ", 0, 3, "Algeria"],
    [32, "AR ", 0, 3, "Argentina"],
    [51, "AM ", 0, 3, "Armenia"],
    [36, "AU ", 0, 3, "Australia"],
    [40, "AT ", 0, 3, "Austria"],
    [31, "AZ ", 0, 3, "Azerbaijan"],
    [48, "BH ", 0, 3, "Bahrain"],
    [112, "BY ", 0, 3, "Belarus"],
    [56, "BE ", 0, 3, "Belgium"],
    [84, "BZ ", 0, 8, "Belize"],
    [68, "BO ", 0, 8, "Bolivia"],
    [76, "BR ", 0, 3, "Brazil"],
    [96, "BN ", 0, 3, "Brunei Darussalam"],
    [100, "BG ", 0, 3, "Bulgaria"],
    [124, "CA ", 0, 1, "Canada"],
    [152, "CL ", 0, 3, "Chile"],
    [156, "CN ", 0, 3, "China"],
    [170, "CO ", 0, 1, "Colombia"],
    [188, "CR ", 0, 3, "Costa Rica"],
    [191, "HR ", 0, 3, "Croatia"],
    [196, "CY ", 0, 3, "Cyprus"],
    [203, "CZ ", 0, 3, "Czech Republic"],
    [208, "DK ", 0, 3, "Denmark"],
    [214, "DO ", 0, 1, "Dominican Republic"],
    [218, "EC ", 0, 3, "Ecuador"],
    [818, "EG ", 0, 3, "Egypt"],
    [222, "SV ", 0, 3, "El Salvador"],
    [233, "EE ", 0, 3, "Estonia"],
    [246, "FI ", 0, 3, "Finland"],
    [250, "FR ", 0, 3, "France"],
    [268, "GE ", 0, 3, "Georgia"],
    [276, "DE ", 0, 3, "Germany"],
    [300, "GR ", 0, 3, "Greece"],
    [320, "GT ", 0, 1, "Guatemala"],
    [340, "HN ", 0, 3, "Honduras"],
    [344, "HK ", 0, 3, "Hong Kong"],
    [348, "HU ", 0, 3, "Hungary"],
    [352, "IS ", 0, 3, "Iceland"],
    [356, "IN ", 0, 3, "India"],
    [360, "ID ", 0, 3, "Indonesia"],
    [364, "IR ", 0, 3, "Iran"],
    [372, "IE ", 0, 3, "Ireland"],
    [376, "IL ", 0, 7, "Israel"],
    [380, "IT ", 0, 3, "Italy"],
    [392, "JP ", 3, 6, "Japan"],
    [400, "JO ", 0, 3, "Jordan"],
    [398, "KZ ", 0, 3, "Kazakhstan"],
    [410, "KR ", 2, 3, "Korea Republic"],
    [408, "KP ", 2, 3, "North Korea"],
    [414, "KW ", 0, 3, "Kuwait"],
    [428, "LV ", 0, 3, "Latvia"],
    [422, "LB ", 0, 3, "Lebanon"],
    [438, "LI ", 0, 3, "Liechtenstein"],
    [440, "LT ", 0, 3, "Lithuania"],
    [442, "LU ", 0, 3, "Luxembourg"],
    [446, "MO ", 0, 3, "Macau"],
    [807, "MK ", 0, 3, "Macedonia"],
    [458, "MY ", 0, 3, "Malaysia"],
    [470, "MT ", 0, 3, "Malta"],
    [484, "MX ", 0, 1, "Mexico"],
    [492, "MC ", 0, 3, "Monaco"],
    [504, "MA ", 0, 3, "Morocco"],
    [524, "NP ", 0, 3, "Nepal"],
    [528, "NL ", 0, 3, "Netherlands"],
    [554, "NZ ", 0, 8, "New Zealand"],
    [578, "NO ", 0, 3, "Norway"],
    [512, "OM ", 0, 3, "Oman"],
    [586, "PK ", 0, 3, "Pakistan"],
    [591, "PA ", 0, 1, "Panama"],
    [604, "PE ", 0, 3, "Peru"],
    [608, "PH ", 0, 3, "Philippines"],
    [616, "PL ", 0, 3, "Poland"],
    [620, "PT ", 0, 3, "Portugal"],
    [630, "PR ", 0, 1, "Puerto Rico"],
    [634, "QA ", 0, 3, "Qatar"],
    [642, "RO ", 0, 3, "Romania"],
    [643, "RU ", 0, 3, "Russia"],
    [682, "SA ", 0, 3, "Saudi Arabia"],
    [702, "SG ", 4, 3, "Singapore"],
    [688, "RS ", 0, 3, "Serbia"],
    [703, "SK ", 0, 3, "Slovakia"],
    [705, "SI ", 0, 3, "Slovenia"],
    [710, "ZA ", 0, 3, "South Africa"],
    [724, "ES ", 0, 3, "Spain"],
    [752, "SE ", 0, 3, "Sweden"],
    [756, "CH ", 0, 3, "Switzerland"],
    [760, "SY ", 0, 3, "Syria"],
    [158, "TW ", 1, 1, "Taiwan"],
    [764, "TH ", 0, 3, "Thailand"],
    [780, "TT ", 0, 3, "Trinidad And Tobago"],
    [788, "TN ", 0, 3, "Tunisia"],
    [792, "TR ", 0, 3, "Turkey"],
    [804, "UA ", 0, 3, "Ukraine"],
    [784, "AE ", 0, 3, "United Arab Emirates"],
    [826, "GB ", 0, 3, "United Kingdom"],
    [858, "UY ", 0, 3, "Uruguay"],
    [860, "UZ ", 0, 1, "Uzbekistan"],
    [862, "VE ", 0, 8, "Venezuela"],
    [704, "VN ", 0, 3, "Viet Nam"],
    [887, "YE ", 0, 3, "Yemen"],
    [716, "ZW ", 0, 3, "Zimbabwe"]
];

var ispList = {
    "Argentina": {
        "internet": [
            ["Telecom_VDSL", 150, "PPPoE"],
            ["Telefonica_VDSL", 20, "PPPoE"],
            ["Argentina Telecom_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Telefonica Speedy_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Telecom Arnet_ADSL", 0, 33, "PPPoE", "LLC"]
        ],
        "iptv": [],
        "voip": []
    },
    "Armenia": {
        "internet": [
            ["Beeline_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Australia": {
        "internet": [
            ["TransAct_VDSL", 10, "PPPoE"],
            ["NetSpeed_VDSL", 10, "PPPoE"],
            ["Boom Broadband_VDSL", 100, "PPPoE"],
            ["CBIT Internet_VDSL", 10, "PPPoE"],
            ["EveryNet_VDSL", 10, "PPPoE"],
            ["IINET_VDSL", 10, "PPPoE"],
            ["Infinite_VDSL", 10, "PPPoE"],
            ["Active Utilities_VDSL", 10, "PPPoE"],
            ["TPG_VDSL", 2, "PPPoE"],
            ["officelink_VDSL", 10, "PPPoE"],
            ["Velocitynet_VDSL", 10, "PPPoE"],
            ["aaNet(Preferred PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["AAPT(Preferred PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["AAPT(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Acenet Internet_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Adam Internet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Amnet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Anntel_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["AuNix(Preferred PPPoA)_ADSL", 8, 35, "PPPoA", "LLC"],
            ["AuNix(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Aussie Broadband_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Australia On Line_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Beagle Internet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Buroserv_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Barefoot_ADSL", 8, 35, "PPPoE", "LLC"],
            ["ClubTelco(Preferred PPPoA)_ADSL", 8, 35, "PPPoA", "LLC"],
            ["ClubTelco(PPPoE)_ADSL", 8, 35, "PPPoE", "VC-MUX"],
            ["DCSI_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Dodo_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Eftel_ADSL", 8, 35, "PPPoE", "LLC"],
            ["EscapeNet(Preferred PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["EscapeNet(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Exetel_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Hotkey Internet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["HugoNet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["IDXNET_ADSL", 8, 35, "PPPoE", "LLC"],
            ["iBoss_ADSL", 8, 35, "PPPoE", "LLC"],
            ["iiNet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Internode(Preferred PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Internode(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["iPrimus_ADSL", 8, 35, "PPPoE", "LLC"],
            ["iSage Internet_ADSL", 8, 35, "PPPoA", "LLC"],
            ["Lizzy Internet_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Locall Australis_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Mate_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Netbay Internet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Netspace(Preferred PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Netspace(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["OptusNet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Southern Cross Telco_ADSL", 8, 35, "PPPoE", "LLC"],
            ["NewSprout_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Telstra(recommend)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Telstra_ADSL", 8, 35, "PPPoE", "LLC"],
            ["TPG Internet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Vintek_ADSL", 8, 35, "PPPoE", "LLC"],
            ["VolPex_ADSL", 8, 35, "PPPoE", "LLC"],
            ["V4 Telecom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Vonex_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Winshop Internet(Preferred PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Winshop Internet(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Westnet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["ZettaNet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["SpinTel(Preferred PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["SpinTel(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Austria": {
        "internet": [
            ["Telekom_VDSL", 7, "PPPoE"],
            ["AON_ADSL", 8, 48, "PPPoA", "VC-MUX"],
            ["Tiscali_ADSL", 8, 48, "PPPoA", "LLC"],
            ["UTA_ADSL", 0, 32, "PPPoE", "LLC"],
            ["Utanet_ADSL", 8, 48, "PPPoA", "LLC"]
        ]
    },
    "Azerbaijan": {
        "internet": [
            ["AZSTARNET_ADSL", 0, 35, "PPPoE", "LLC"],
            ["ALFANET_ADSL", 0, 33, "PPPoE", "LLC"],
            ["AZERONLINE_ADSL", 0, 35, "PPPoE", "LLC"],
            ["BAKINTERNET_ADSL", 8, 35, "PPPoE", "LLC"],
            ["UNINET_ADSL", 0, 35, "PPPoE", "LLC"],
            ["SUPERONLINE_ADSL", 8, 35, "PPPoE", "LLC"],
            ["CONNECT_ADSL", 0, 33, "PPPoE", "LLC"]
        ]
    },
    "Bahrain": {
        "internet": [
            ["Batelco_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Belgium": {
        "internet": [
            ["Belgacom/Skynet_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Scarlet (1)_ADSL", 0, 35, "PPPoA", "LLC"],
            ["Scarlet (2)_ADSL", 5, 35, "PPPoA", "VC-MUX"],
            ["EDPnet_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Euphony_ADSL", 8, 35, "PPPoA", "LLC"]
        ]
    },
    "Brazil": {
        "internet": [
            ["GVT_VDSL", 600, "PPPoE"],
            ["VIVO_VDSL", 10, "PPPoE"],
            ["Oi_VDSL", 0, "PPPoE"],
            ["ALGAR_VDSL", 0, "PPPoE"],
            ["Sercomtel_VDSL", 0, "PPPoE"],
            ["Oi Velox (AC - DF - GO -  MS - MT - PR - RO – SC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Oi Velox (RS only)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Oi Velox (AL - BA - CE -  ES - MA - MG - PA - PB - PE - RJ - RN – SE)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["GVT_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Vivo Speedy_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Algar_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Sercomtel_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Brunei Darussalam": {
        "internet": [
            ["TelBru e-Speed(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"]
        ]
    },
    "Cambodia": {
        "internet": [
            ["Wicam_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Online_ADSL", 0, 32, "PPPoE", "LLC"],
            ["City Link_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Metfone_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Camitel_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Angkornet_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Ezecom_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Mfone_ADSL", 38, 100, "PPPoE", "LLC"],
            ["Opennet_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Camnet_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Canada": {
        "internet": [
            ["Bell_VDSL", 0, "PPPoE"],
            ["SaskTell_VDSL", 0, "PPPoE"],
            ["TELUS_VDSL", 0, "PPPoE"],
            ["MTS_VDSL", 0, "PPPoE"],
            ["Teksavvy_VDSL", 0, "PPPoE"],
            ["Velcom_VDSL", 0, "PPPoE"],
            ["Start Communications_VDSL", 0, "PPPoE"],
            ["Bell Canada_ADSL", 0, 35, "PPPoE", "LLC"],
            ["iPrimus Canada(west/Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["iPrimus Canada(west/Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["iPrimus Canada(east)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Telus Quebec_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Unitz_ADSL", 0, 35, "PPPoE", "LLC"],
            ["3WEB(West)(Sybersurf/Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["3WEB(West)(Sybersurf/Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["3WEB(East)(Sybersurf)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["8COM_ADSL", 0, 35, "PPPoE", "LLC"],
            ["MTS(Internet Service Division)-Primus_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Trytel internet Inc._ADSL", 0, 35, "PPPoE", "LLC"],
            ["Bell Sympatico_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Brama Telecom_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Telus West(Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Telus West(Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["Trytel internet Inc._ADSL", 0, 35, "PPPoE", "LLC"],
            ["IGS(Cybersurf)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["LightSpeed Communications(Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["LightSpeed Communications(Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["TekSavvy Solutions_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Telebec_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Nucleus Inc(Partner Telus/Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Nucleus Inc(Partner Telus/Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["SaskTel_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Secure by Designe_ADSL", 0, 35, "PPPoE", "LLC"],
            ["B2B2C_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Bell Aliant_ADSL", 0, 34, "PPPoE", "LLC"],
            ["Bell Aliant_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Fusion Telecom_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Can-Net Telecom_ADSL", 0, 35, "PPPoE", "LLC"],
            ["EBTech_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Tbaytel_ADSL", 0, 35, "PPPoE", "LLC"],
            ["In2net(West)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Inter-Active Telecom_ADSL", 0, 35, "PPPoE", "LLC"],
            ["MySignal_ADSL", 0, 35, "PPPoE", "LLC"],
            ["NCF (National Capital FreeNet)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["HyteK(west)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Zid internet_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Youmano_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Distributel(east)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Distributel(west/Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Distributel(west/Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["Montreal-DSL(east)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Montreal-DSL(west/Dynamic IP)_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Montreal-DSL(west/Static IP)_ADSL", 0, 33, "Static IP", "1483 Bridged IP LLC"],
            ["Netfox_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Velcon_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Acanac_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Electronic Box_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Start Communications_ADSL", 0, 35, "PPPoE", "LLC"],
            ["worldline_ADSL", 0, 35, "PPPoE", "LLC"],
            ["connectmoi_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Mustang Technologies Inc._ADSL", 0, 35, "PPPoE", "LLC"],
            ["Comwave_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Leopard Networks_ADSL", 0, 35, "PPPoE", "LLC"],
            ["LightSpeed Communications_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Switchworks_ADSL", 0, 35, "PPPoE", "LLC"],
            ["CIKTel_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Storm_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Sunsonic_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Vmedia_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Colombia": {
        "internet": [
            ["UNE_ADSL", 0, 35, "PPPoE", "LLC"],
            ["ETP_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Edatel_ADSL", 8, 35, "PPPoE", "LLC"],
            ["ETB_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Emcali_ADSL", 0, 33, "PPPoA", "VC-MUX"],
            ["Telebucaramanga_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Metrotel_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Telefonica_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Croatia": {
        "internet": [
            ["AMIS_VDSL", 0, "PPPoE"],
            ["Optima telekom_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Hrvatski telekom_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Iskon internet_ADSL", 0, 86, "PPPoE", "LLC"],
            ["VIP_ADSL", 0, 33, "PPPoE", "LLC"]
        ]
    },
    "Czech Republic": {
        "internet": [
            ["O2_VDSL", 848, "PPPoE"],
            ["T-Mobile_VDSL", 848, "PPPoE"],
            ["O2(Czech Republic)_ADSL", 8, 48, "PPPoE", "LLC"]
        ]
    },
    "Denmark": {
        "internet": [
            ["Cybercity_ADSL", 0, 35, "PPPoA", "VC-MUX"]
        ]
    },
    "Dominican Republic": {
        "internet": [
            ["Codetel_ADSL", 0, 33, "PPPoA", "VC-MUX"]
        ]
    },
    "Egypt": {
        "internet": [
            ["Etisalat_ADSL", 0, 35, "PPPoE", "LLC"],
            ["IM_ADSL", 0, 35, "PPPoE", "LLC"],
            ["LinkdotNet_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Noor ADSL_ADSL", 8, 35, "PPPoE", "LLC"],
            ["TE-Data_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Vodafone_ADSL", 7, 70, "PPPoA", "VC-MUX"]
        ]
    },
    "Finland": {
        "internet": [
            ["Partel_VDSL", 0, "Dynamic IP"],
            ["Sonera_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Elisa_ADSL", 0, 100, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Saunalahti_ADSL", 0, 100, "Dynamic IP", "1483 Bridged IP LLC"],
            ["DNA_ADSL", 0, 100, "Dynamic IP", "1483 Bridged IP LLC"],
            ["local operators_ADSL", 0, 100, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Partel_ADSL", 0, 100, "Dynamic IP", "1483 Bridged IP LLC"]
        ]
    },
    "France": {
        "internet": [
            ["Orange_VDSL", 835, "PPPoE"],
            ["Sfr(835)_VDSL", 835, "PPPoE"],
            ["Sfr(836)_VDSL", 836, "PPPoE"],
            ["Free_VDSL", 836, "Dynamic IP"],
            ["Bouygues Telecom_VDSL", 200, "Dynamic IP"],
            ["Numericable_VDSL", 200, "Dynamic IP"],
            ["Ovh_VDSL", 835, "PPPoE"],
            ["Nordnet_VDSL", 835, "PPPoE"],
            ["Orange(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Orange(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Orange(IP Dynamique)_ADSL", 8, 36, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Sfr(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Sfr(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Sfr(IP Dynamique)_ADSL", 8, 36, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Bouygues Telecom(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Bouygues Telecom(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Bouygues Telecom(IP Dynamique)_ADSL", 8, 36, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Numericable(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Numericable(PPPoA)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Numericable(IP Dynamique)_ADSL", 8, 36, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Free(PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Free(PPPoE VC-MUX)_ADSL", 8, 35, "PPPoE", "VC-MUX"],
            ["Free(IP Dynamique-Bridged)_ADSL", 8, 36, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Free(IP Dynamique-Routed)_ADSL", 8, 36, "Dynamic IP", "VC-MUX"],
            ["Ovh(PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Nordnet(PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Germany": {
        "internet": [
            ["Telekom(Privat)_VDSL", 7, "PPPoE"],
            ["Telekom(Business)_VDSL", 7, "PPPoE"],
            ["1&1_VDSL", 7, "PPPoE"],
            ["Vodafone/Arcor_VDSL", 132, "PPPoE"],
            ["Vodafone/Arcor_VDSL(DT Resale)", 7, "PPPoE"],
            ["O2_VDSL", 11, "PPPoE"],
            ["O2_VDSL(DT Resale)", 7, "PPPoE"],
            ["Congstar_VDSL", 7, "PPPoE"],
            ["Alice(HanseNet)_VDSL", 11, "PPPoE"],
            ["Alice(HanseNet)_VDSL(DT Resale)", 7, "PPPoE"],
            ["easybell_VDSL", 7, "PPPoE"],
            ["encoLine_VDSL", 142, "Dynamic IP"],
            ["EWE TEL_VDSL", 2011, "PPPoE"],
            ["EWE TEL(TR069)_VDSL", 2019, "PPPoE"],
            ["GMX_VDSL", 7, "PPPoE"],
            ["M-net_VDSL", 40, "PPPoE"],
            ["Osnatel_VDSL", 2019, "PPPoE"],
            ["swb(7)_VDSL", 7, "PPPoE"],
            ["swb(0)_VDSL", 0, "PPPoE"],
            ["Versatel_VDSL", 7, "PPPoE"],
            ["wilhelm.tel_VDSL", 7, "PPPoE"],
            ["Willy.tel_VDSL", 2511, "PPPoE"],
            ["KielNET DSL_VDSL", 7, "PPPoE"],
            ["NetCologne/NetAachen1_VDSL", 10, "PPPoE"],
            ["NetCologne/NetAachen2_VDSL", 7, "PPPoE"],
            ["QSC/Q-DSL home_VDSL", 7, "PPPoE"],
            ["Telekom(Privat)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Telekom(Business)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["1&1_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Vodafone/Arcor ADSL mit TV1_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Vodafone/Arcor ADSL mit TV2_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Vodafone/Arcor_ADSL(DT Resale)", 1, 32, "PPPoE", "LLC"],
            ["O2_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Congstar_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Alice(HanseNet)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Alice(HanseNet) 8/35_ADSL", 8, 35, "PPPoE", "LLC"],
            ["GMX_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Web.de_ADSL", 1, 32, "PPPoE", "LLC"],
            ["AOL_ADSL", 1, 32, "PPPoE", "LLC"],
            ["BITel_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Callando_ADSL", 1, 32, "PPPoE", "LLC"],
            ["CNE_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Compuserve_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Comtel_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Dokom_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Envia TEL_ADSL", 1, 32, "PPPoE", "LLC"],
            ["EWE TEL_ADSL", 0, 35, "PPPoE", "LLC"],
            ["EWE TEL 1/32_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Freenet_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Hansenet_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Helenet_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Infocity(PPPoE)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Infocity(Dynamic IP)_ADSL", 1, 32, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Lycos_ADSL", 1, 32, "PPPoE", "LLC"],
            ["M-net_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Mediacom_ADSL", 1, 32, "PPPoE", "LLC"],
            ["multikabel isdn_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Nefcom_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Neocom_ADSL", 1, 32, "PPPoE", "LLC"],
            ["net dsl_ADSL", 1, 32, "PPPoE", "LLC"],
            ["net cologne_ADSL", 8, 35, "PPPoE", "LLC"],
            ["new dsl_ADSL", 1, 32, "PPPoE", "LLC"],
            ["nordkom_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Primacom_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Primacom/Primaspeed_ADSL", 1, 32, "Dynamic IP", "1483 Bridged IP LLC"],
            ["QSC/QDSL home_ADSL", 1, 32, "PPPoE", "LLC"],
            ["R2 Online_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Schlund & Partner_ADSL", 1, 32, "PPPoE", "LLC"],
            ["T link_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Tiscali_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Versatel_ADSL", 1, 32, "PPPoE", "LLC"]
        ],
        "iptv": {
            "Telekom(Privat)_ADSL": {
                dslType: "adsl",
                vpi: 1,
                vci: 32,
                vtag: 8,
                connType: "Dynamic IP",
                encapMode: "LLC"
            },
            "Vodafone/Arcor ADSL mit TV1_ADSL": {
                dslType: "adsl",
                vpi: 3,
                vci: 32,
                vtag: -1,
                connType: "Dynamic IP",
                encapMode: "LLC"
            },
            "Vodafone/Arcor ADSL mit TV2_ADSL": {
                dslType: "adsl",
                vpi: 3,
                vci: 32,
                vtag: -1,
                connType: "Dynamic IP",
                encapMode: "LLC"
            },
            "Telekom(Privat)_VDSL": {
                dslType: "vdsl",
                vid: 8,
                connType: "Dynamic IP"
            },
            "Vodafone/Arcor_VDSL": {
                dslType: "vdsl",
                vid: 332,
                connType: "Dynamic IP"
            },
            "Vodafone/Arcor_VDSL(DT Resale)": {
                dslType: "vdsl",
                vid: 8,
                connType: "Dynamic IP"
            },
            "EWE TEL_VDSL": {
                dslType: "vdsl",
                vid: 2020,
                connType: "Dynamic IP"
            }
        },
        "voip": {
            "Vodafone/Arcor ADSL mit TV1_ADSL": {
                dslType: "adsl",
                vpi: 2,
                vci: 32,
                vtag: -1,
                priority: -1,
                connType: "PPPoE",
                encapMode: "LLC",
                bindToInternet: true
            },
            "Vodafone/Arcor ADSL mit TV2_ADSL": {
                dslType: "adsl",
                vpi: 2,
                vci: 32,
                vtag: -1,
                priority: -1,
                connType: "PPPoE",
                encapMode: "LLC",
                bindToInternet: true
            },
            "Vodafone/Arcor_VDSL": {
                dslType: "vdsl",
                vid: 232,
                priority: -1,
                connType: "PPPoE",
                bindToInternet: true
            },
            "Congstar_VDSL": {
                dslType: "vdsl",
                vid: 8,
                priority: -1,
                connType: "PPPoE",
                bindToInternet: false
            },
            "O2_VDSL": {
                dslType: "vdsl",
                vid: 12,
                priority: 5,
                connType: "PPPoE",
                bindToInternet: false
            },
            "Alice(HanseNet)_VDSL": {
                dslType: "vdsl",
                vid: 12,
                priority: 5,
                connType: "PPPoE",
                bindToInternet: true
            },
            "Willy.tel_VDSL": {
                dslType: "vdsl",
                vid: 1001,
                priority: -1,
                connType: "PPPoE",
                bindToInternet: true
            },
            "EWE TEL_VDSL": {
                dslType: "vdsl",
                vid: 2030,
                priority: -1,
                connType: "PPPoE",
                bindToInternet: false
            }
        }
    },
    "Greece": {
        "internet": [
            ["CYTA_VDSL", 835, "PPPoE"],
            ["Hellas Online_VDSL", 835, "PPPoE"],
            ["WIND_VDSL", 835, "PPPoE"],
            ["OTE_VDSL", 835, "PPPoE"],
            ["Forthnet_VDSL", 1102, "PPPoE"],
            ["OTE_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Forthnet_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Hellas Online_ADSL", 8, 35, "PPPoE", "LLC"],
            ["On Telecoms_ADSL", 8, 35, "PPPoE", "LLC"],
            ["CYTA_ADSL", 8, 35, "PPPoE", "LLC"],
            ["WIND_ADSL", 8, 35, "PPPoE", "LLC"],
            ["VODAFONE_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Hungary": {
        "internet": [
            ["Matav Telecom_ADSL", 1, 32, "PPPoE", "LLC"]
        ]
    },
    "Iceland": {
        "internet": [
            ["Iceland Telecom_ADSL", 8, 48, "PPPoA", "LLC"],
            ["1Islandssimi 1_ADSL", 8, 48, "PPPoA", "VC-MUX"],
            ["2Islandssimi 2_ADSL", 0, 35, "PPPoA", "VC-MUX"]
        ]
    },
    "India": {
        "internet": [
            ["BSNL(PPPoE)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["MTNL(PPPoE)_ADSL", 0, 32, "PPPoE", "LLC"],
            ["Airtel(PPPoE)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Reliance_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Tata(PPPoE)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Connect(PPPoE)_ADSL", 1, 32, "PPPoE", "LLC"]
        ]
    },
    "Indonesia": {
        "internet": [
            ["PT Telkom DIVER 1(Sumatra)_ADSL", 8, 81, "PPPoE", "LLC"],
            ["PT Telkom DIVER 2(Jakarta)Alcatel_ADSL", 0, 35, "PPPoE", "LLC"],
            ["PT Telkom DIVER 2(Jakarta)Siemens_ADSL", 0, 35, "PPPoE", "LLC"],
            ["PT Telkom DIVER 3(West Java)_ADSL", 8, 81, "PPPoE", "LLC"],
            ["PT Telkom DIVER 4(Central Java)_ADSL", 8, 81, "PPPoE", "LLC"],
            ["PT Telkom DIVER 5(East Java)_ADSL", 8, 81, "PPPoE", "LLC"],
            ["PT Telkom DIVER 7(East Indonesia)_ADSL", 8, 81, "PPPoE", "LLC"]
        ]
    },
    "Iran": {
        "internet": [
            ["Iran Telecom(Copper Lines)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Iran Telecom(PCM Lines)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Iran Telecom(Optical Fibre Lines)_ADSL", 8, 81, "PPPoE", "LLC"],
            ["Pars Online(Tehran)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Pars Online(Others)_ADSL", 0, 59, "PPPoE", "LLC"],
            ["Shatel(VIP Users)_ADSL", 0, 32, "PPPoE", "LLC"],
            ["Shatel(All around the Iran)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["DATAK(It gives service only to Shiraz)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["DATAK(It gives service only to Tehran)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Asre Telecom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Asiatech(All around the Iran)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["FANAVA(some part of Mazandaran& Gilan)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["FANAVA_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Hiweb_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Max Net(It gives service only to Tabriz,Oroumieh,Ardebil)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["SABA Net (All around the Iran)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Novin Net(Dadeh Gostar)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Shahrad(it gives service only to Tehran and small city near Tehran)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Pishgaman(Tehran)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Pishgaman Kavir Yazd_ADSL", 8, 81, "PPPoE", "LLC"],
            ["Yazd Telecom_ADSL", 8, 81, "PPPoE", "LLC"]
        ]
    },
    "Ireland": {
        "internet": [
            ["Pure Telecom_VDSL", 10, "PPPoE"],
            ["Eircom_VDSL", 10, "PPPoE"],
            ["BBnet_VDSL", 10, "Dynamic IP"],
            ["Eircom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["BT Ireland_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Vodafone Ireland_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Digiweb_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Irish Broadband_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Magnet_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Israel": {
        "internet": [
            ["BEZEQ_VDSL", 0, "PPPoE"],
            ["Bezeq_ADSL", 8, 48, "PPPoE", "LLC"],
            ["012 Partner_ADSL", 8, 48, "PPPoE", "LLC"],
            ["Bezeq International(014)_ADSL", 8, 48, "PPPoE", "LLC"],
            ["Netvision(013)_ADSL", 8, 48, "PPPoE", "LLC"],
            ["Golden Lines(012)_ADSL", 8, 48, "PPPoE", "LLC"],
            ["Triple C_ADSL", 8, 48, "PPPoE", "LLC"],
            ["Xphone(018)_ADSL", 8, 48, "PPPoE", "LLC"]
        ]
    },
    "Italy": {
        "internet": [
            ["TIM_VDSL", 835, "PPPoE"],
            ["Fastweb_VDSL", 0, "Dynamic IP"],
            ["WIND_VDSL", 835, "PPPoE"],
            ["Tiscali_VDSL", 835, "PPPoE"],
            ["TIM_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Fastweb_ADSL", 8, 36, "Dynamic IP", "1483 Routed IP LLC"],
            ["Infostrada1(WIND)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Infostrada2(WIND)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Tiscali_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["MC-link_ADSL", 8, 75, "PPPoA", "VC-MUX"],
            ["TeleTu1_ADSL", 8, 35, "PPPoE", "LLC"],
            ["TeleTu2_ADSL", 8, 35, "PPPoA", "VC-MUX"]
        ]
    },
    "Jordan": {
        "internet": [
            ["Orange_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Kazakhstan": {
        "internet": [
            ["Megaline_ADSL", 0, 40, "PPPoE", "LLC"]
        ]
    },
    "Lebanon": {
        "internet": [
            ["Terranet sal_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Broadband Plus_ADSL", 0, 35, "PPPoE", "LLC"],
            ["IncoNet-Data Management s.a.l_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Moscanet SAL_ADSL", 0, 32, "PPPoE", "LLC"],
            ["SODETEL S.A.L._ADSL", 0, 35, "PPPoE", "LLC"],
            ["Virtual ISP s.a.l._ADSL", 0, 35, "PPPoE", "LLC"],
            ["LIBANTELECOM_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Luxembourg": {
        "internet": [
            ["Online ANALOGUE_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["LuxDSL_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Online ISDN_ADSL", 8, 35, "PPPoA", "LLC"]
        ]
    },
    "Malaysia": {
        "internet": [
            ["Streamyx(Telecom Malaysia-TMNet)PPPoE_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Streamyx(Telecom Malaysia-TMNet)PPPoA_ADSL", 0, 35, "PPPoA", "LLC"],
            ["Maxis_ADSL", 0, 35, "PPPoA", "LLC"]
        ]
    },
    "Mexico": {
        "internet": [
            ["TELMEX_VDSL", 100, "PPPoE"],
            ["Telmex (1)_ADSL", 8, 81, "PPPoE", "LLC"],
            ["Telmex (2)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Maxcom_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Nepal": {
        "internet": [
            ["Nepal Telecom_ADSL", 8, 81, "PPPoE", "LLC"]
        ]
    },
    "Netherlands": {
        "internet": [
            ["KPN_VDSL", 6, "PPPoE"],
            ["Voiceworks_VDSL", 101, "Dynamic IP"],
            ["XS4ALL_VDSL", 6, "PPPoE"],
            ["Telfort_VDSL", 34, "PPPoE"],
            ["KPN_ADSL", 8, 48, "PPPoA", "VC-MUX"],
            ["Online_ADSL", 8, 48, "PPPoA", "VC-MUX"],
            ["Stipte_ADSL", 8, 35, "PPPoA", "LLC"],
            ["Tele2_ADSL", 0, 35, "Bridge", "1483 Bridged IP LLC"],
            ["TelFort_ADSL", 0, 34, "Bridge", "1483 Bridged IP LLC"],
            ["Solcon_ADSL", 0, 36, "PPPoA", "VC-MUX"],
            ["XS4ALL_ADSL", 8, 48, "PPPoA", "VC-MUX"]
        ]
    },
    "New Zealand": {
        "internet": [
            ["Spark/Telecom_VDSL", 10, "PPPoE"],
            ["KiwiLink_VDSL", 10, "PPPoE"],
            ["Slingshot_VDSL", 10, "PPPoE"],
            ["Vodafone NZ_VDSL", 10, "Dynamic IP"],
            ["Snap_VDSL", 10, "PPPoE"],
            ["Myrepublic_VDSL", 10, "Dynamic IP"],
            ["Callplus with PPPoE_VDSL", 10, "PPPoE"],
            ["Callplus with IPoE_VDSL", 10, "Dynamic IP"],
            ["BigPipe_VDSL", 10, "PPPoE"],
            ["Orcon_VDSL", 10, "PPPoE"],
            ["Voyager_VDSL", 10, "PPPoE"],
            ["Actrix_VDSL", 10, "PPPoE"],
            ["Lightwire_VDSL", 10, "PPPoE"],
            ["WorldNet_VDSL", 10, "PPPoE"],
            ["HD_VDSL", 10, "PPPoE"],
            ["New Zealand Telecom_ADSL", 0, 100, "PPPoA", "VC-MUX"],
            ["Telecom Xtra_ADSL", 0, 100, "PPPoA", "VC-MUX"],
            ["IHUG_ADSL", 0, 100, "PPPoA", "VC-MUX"],
            ["IGRIN Internet_ADSL", 0, 100, "PPPoA", "VC-MUX"],
            ["Actrix_ADSL", 0, 100, "PPPoA", "VC-MUX"]
        ]
    },
    "Norway": {
        "internet": [
            ["Telenor 1_ADSL", 0, 100, "PPPoE", "LLC"],
            ["Telenor 2_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Pakistan": {
        "internet": [
            ["PTCL_ADSL", 8, 81, "PPPoE", "LLC"]
        ]
    },
    "Palestinian Authority": {
        "internet": [
            ["Hadara_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Mada_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Call U_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Super Link_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Gemzo_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Zone_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Zaytona_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Peru": {
        "internet": [
            ["Telefonica_ADSL", 8, 60, "PPPoE", "LLC"]
        ]
    },
    "Poland": {
        "internet": [
            ["ORANGE_VDSL", 35, "PPPoE"],
            ["NETIA_VDSL", 35, "PPPoE"],
            ["Multimedia Polska_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Neostrada(ORANGE)(PPPoA)_ADSL", 0, 35, "PPPoA", "VC-MUX"],
            ["Neostrada(ORANGE)(PPPoE)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["GTS Energis_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Netia(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Netia(PPPoA)_ADSL", 0, 35, "PPPoA", "VC-MUX"]
        ]
    },
    "Portugal": {
        "internet": [
            ["ONI_ADSL", 0, 35, "PPPoE", "LLC"],
            ["PT(Internet)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["PT(MEO)(Single Edge 3PLAY - IPTV)_ADSL", 1, 35, "Static IP", "LLC"],
            ["PT(MEO)(Dual Edge 3PLAY - Internet)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["PT(MEO)(Dual Edge 3PLAY - IPTV)_ADSL", 1, 35, "Static IP", "LLC"],
            ["Vodafone(Internet)_ADSL", 0, 35, "IPoA", "LLC"],
            ["MEO(Internet)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["SAPO(Internet)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Clix(Internet)_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Qatar": {
        "internet": [
            ["Q-Tel/Ooreedo_VDSL", 8, "PPPoE"],
            ["Q-Tel/Ooreedo(PPPoA)_ADSL", 8, 35, "PPPoA", "LLC"],
            ["Q-Tel/Ooreedo(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Russia": {
        "internet": [
            ["Rostelecom(Domolink)_VDSL", 0, "PPPoE"],
            ["MTC_ADSL", 1, 50, "PPPoE", "LLC"],
            ["Домолинк-Москва_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Белгород_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Брянск_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Владимир_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Курск_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Тула_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Калуга_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Домолинк-Рязань_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Домолинк-Иваново_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Домолинк-Тамбов_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Домолинк-Ярославль_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Домолинк-Воронеж_ADSL", 10, 40, "PPPoE", "LLC"],
            ["Домолинк-Кострома_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Домолинк-Орёл_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Домолинк-Рыбинск_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Домолинк-Липецк_ADSL", 35, 33, "PPPoE", "LLC"],
            ["Домолинк-Смоленск_ADSL", 0, 100, "PPPoE", "LLC"],
            ["Домолинк-Тверь_ADSL", 8, 81, "PPPoE", "LLC"],
            ["Сибирь Телеком-Новосибирск_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Сибирь Телеком-Омск_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Сибирь Телеком-Томск_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Сибирь Телеком-Иркутск_ADSL", 0, 100, "PPPoE", "LLC"],
            ["Сибирь Телеком-Другие_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Saudi Arabia": {
        "internet": [
            ["STC_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Singapore": {
        "internet": [
            ["Singnet(PPPoE)_ADSL", 0, 100, "PPPoE", "LLC"],
            ["Singnet(PPPoA-LLC)_ADSL", 0, 100, "PPPoA", "LLC"],
            ["Singnet(PPPoA-VC/MUX)_ADSL", 0, 100, "PPPoA", "VC-MUX"],
            ["SingTel Magix_ADSL", 0, 101, "IPoA", "1483 Routed IP LLC"],
            ["SingTel MegaPOP(Biz Users)_ADSL", 8, 35, "IPoA", "1483 Routed IP LLC"]
        ]
    },
    "Slovakia": {
        "internet": [
            ["T-Com_VDSL", 2510, "PPPoE"],
            ["Orange_VDSL", 2510, "PPPoE"],
            ["T-Com(Slovakia)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Orange_ADSL", 1, 32, "PPPoE", "LLC"]
        ]
    },
    "Slovenia": {
        "internet": [
            ["AMIS_VDSL", 0, "PPPoE"]
        ]
    },
    "South Africa": {
        "internet": [
            ["Cybersmart_VDSL", 0, "PPPoE"],
            ["Axxess_VDSL", 0, "PPPoE"],
            ["Afrihost_VDSL", 0, "PPPoE"],
            ["Vox Telecom_VDSL", 0, "PPPoE"],
            ["Mweb_VDSL", 0, "PPPoE"],
            ["Telkom_VDSL", 0, "PPPoE"],
            ["Internet Solutions_VDSL", 0, "PPPoE"],
            ["Telkom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Mweb_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Afrihost_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Web Africa_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Open Web_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Axxess_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Vox Telecom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Crystal Web_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Cybersmart_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Internet Solutions_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Spain": {
        "internet": [
            ["Telefonica (ISP)_VDSL", 6, "PPPoE"],
            ["Vodafone (ISP) - Link Direct_VDSL", 100, "Dynamic IP"],
            ["Vodafone (ISP) - Link Indirect_VDSL", 100, "PPPoE"],
            ["Jazztel (ISP)_VDSL", 1074, "PPPoE"],
            ["Arrakis_ADSL", 0, 35, "PPPoA", "VC-MUX"],
            ["Auna_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Comunitel_ADSL", 0, 33, "PPPoA", "VC-MUX"],
            ["Eresmas_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["EuskalTel_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Jazztel_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Jazztel ADSL2+/Desagregado_ADSL", 8, 35, "PPPoE", "LLC"],
            ["OpenforYou_ADSL", 8, 32, "PPPoA", "VC-MUX"],
            ["Orange(IPoA/IP FIJA)_ADSL", 8, 32, "IPoA", "1483 Routed IP LLC"],
            ["Orange 20Mb(Direct Link)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Orange (Indirect Link)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Telefonica-Spain_ADSL", 8, 32, "PPPoE", "LLC"],
            ["Telefonica(IPoA/IP FIJA)_ADSL", 8, 32, "IPoA", "1483 Routed IP LLC"],
            ["Tele 2_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Tele 2 - Comunitel_ADSL", 0, 33, "PPPoA", "VC-MUX"],
            ["Terra_ADSL", 8, 32, "PPPoE", "LLC"],
            ["Terra(IPoA/IP FIJA)_ADSL", 8, 32, "IPoA", "1483 Routed IP LLC"],
            ["YA.COM ADSL(PPPoE)_ADSL", 8, 32, "PPPoE", "VC-MUX"],
            ["YA.COM ADSL(Static IP)_ADSL", 8, 32, "IPoA", "1483 Routed IP LLC"],
            ["YA.COM ADSL(PPPoA)_ADSL", 8, 32, "PPPoA", "VC-MUX"],
            ["Vodafone ADSL (Direct Link)_ADSL", 0, 44, "Dynamic IP", "1483 Routed IP LLC"],
            ["Vodafone ADSL (Indirect Link)_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Ono (ADSL)_ADSL", 8, 35, "PPPoA", "VC-MUX"],
            ["Pepephone ADSL_ADSL", 0, 33, "PPPoE", "LLC"]
        ]
    },
    "Sweden": {
        "internet": [
            ["Bredbandsbolaget(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Bredbandsbolaget(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Bredbandsbolaget(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Bredband2_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Glocalnet(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Glocalnet(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Glocalnet(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Net at Once_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["No Com_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Ownit(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Ownit(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Skanova_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Spray_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Tele2(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Tele2(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Telia(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Telia(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Universal Telecom(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Universal Telecom(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Teletek_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["Teleman_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["AllTele(Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["AllTele(Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"],
            ["AllTele(PPPoE)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Bjäre Kraft (Dynamic IP)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Bjäre Kraft (Static IP)_ADSL", 8, 35, "Static IP", "1483 Bridged IP LLC"]
        ]
    },
    "Switzerland": {
        "internet": [
            ["Swisscom_VDSL", 10, "PPPoE"],
            ["Swisscom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Green naked_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Cablecom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Sunrise_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Monzoon_ADSL", 8, 35, "PPPoE", "LLC"],
            ["M-Budget_ADSL", 8, 35, "PPPoE", "LLC"],
            ["DFI_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "Syria": {
        "internet": [
            ["STE_ADSL", 0, 33, "PPPoE", "LLC"]
        ]
    },
    "Taiwan": {
        "internet": [
            ["Hinet_ADSL", 0, 33, "PPPoE", "LLC"]
        ]
    },
    "Thailand": {
        "internet": [
            ["AIS_VDSL", 0, "PPPoE"],
            ["3BB_VDSL", 33, "PPPoE"],
            ["CAT_VDSL", 0, "PPPoE"],
            ["ToT_VDSL", 10, "PPPoE"],
            ["TRUE_VDSL", 0, "PPPoE"],
            ["TOT_ADSL", 1, 32, "PPPoE", "LLC"],
            ["CAT_ADSL", 0, 35, "PPPoE", "LLC"],
            ["3BB_ADSL", 0, 33, "PPPoE", "LLC"],
            ["TRUE_ADSL", 0, 100, "PPPoE", "LLC"],
            ["CS loxinfo(Ture)_ADSL", 0, 100, "PPPoE", "LLC"],
            ["CS loxinfo(TOT)_ADSL", 1, 32, "PPPoE", "LLC"],
            ["CS loxinfo_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Tunisia": {
        "internet": [
            ["Global Net_ADSL", 0, 35, "PPPoA", "LLC"]
        ]
    },
    "Turkey": {
        "internet": [
            ["TURK TELEKOM (TTNET)_VDSL", 35, "PPPoE"],
            ["TURKCELL SUPERONLINE_VDSL", 35, "PPPoE"],
            ["D-SMART_VDSL", 35, "PPPoE"],
            ["VODAFONE_VDSL", 35, "PPPoE"],
            ["MILLENICOM_VDSL", 35, "PPPoE"],
            ["TURKNET_VDSL", 35, "PPPoE"],
            ["TURK TELEKOM (TTNET)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["TURKCELL SUPERONLINE_ADSL", 8, 35, "PPPoE", "LLC"],
            ["D-SMART_ADSL", 8, 35, "PPPoE", "LLC"],
            ["VODAFONE_ADSL", 8, 35, "PPPoE", "LLC"],
            ["MILLENICOM_ADSL", 8, 35, "PPPoE", "LLC"],
            ["TURKNET_ADSL", 8, 35, "PPPoE", "LLC"]
        ]
    },
    "United Kingdom": {
        "internet": [
            ["BT_VDSL", 101, "PPPoE"],
            ["Plusnet_VDSL", 101, "PPPoE"],
            ["IDnet_VDSL", 101, "PPPoE"],
            ["TalkTalk_VDSL", 101, "Dynamic IP"],
            ["Sky(MER)_VDSL", 101, "Dynamic IP"],
            ["EE_VDSL", 101, "PPPoE"],
            ["Vispa_VDSL", 101, "PPPoE"],
            ["Zen_VDSL", 101, "PPPoE"],
            ["AAISP_VDSL", 101, "PPPoE"],
            ["Sky_VDSL", 101, "Dynamic IP"],
            ["Claranet_VDSL", 101, "PPPoE"],
            ["BT_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["AOL_ADSL", 0, 38, "PPPoE", "LLC"],
            ["KCOM(Rest of UK)_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["KCOM(Formerly Karoo)_ADSL", 1, 50, "PPPoA", "LLC"],
            ["Bulldog_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Demon_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Force 9_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["New Breed Telecom_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Nildram_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["O2(BE Broadband)_ADSL", 0, 101, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Pipex_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["PlusNet_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Sky Broadband(BSkyB)_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Supanet_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Talk Talk_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Tesco_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Tiscali/Lineone_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Virgin_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Wanadoo/Orange_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Chess Telecom_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Post Office_ADSL", 0, 38, "PPPoA", "VC-MUX"],
            ["Zen_ADSL", 0, 38, "PPPoA", "VC-MUX"]
        ]
    },
    "Ukraine": {
        "internet": [
            ["Matrix_ADSL", 0, 33, "Bridge", "1483 Bridged IP LLC"],
            ["Inter-Telecom_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Укртелеком - ОГО!_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Vega_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Cyfra_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Укртелеком - ОГО! Динамический IP_ADSL", 1, 40, "Dynamic IP", "LLC"],
            ["Datagroup_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Datagroup Khmelnitska_ADSL", 1, 32, "PPPoE", "LLC"],
            ["Datagroup Volynskaya_ADSL", 0, 32, "PPPoE", "LLC"],
            ["Datagroup Kyiv 1_ADSL", 0, 33, "PPPoE", "LLC"],
            ["Datagroup Kyiv 2_ADSL", 1, 32, "PPPoE", "LLC"]
        ]
    },
    "United States": {
        "internet": [
            ["All Tel(0/35 PPPoE LLC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["All Tel(0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["AT&T[SBC/Bellsouth](0/35 PPPoE LLC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["AT&T[SBC/Bellsouth](0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["AT&T[SBC/Bellsouth](8/35 PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["AT&T[SBC/Bellsouth](8/35 Dynamic IP LLC)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Augest.net(8/35 Dynamic IP LLC)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Augest.net(0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Bellsouth_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Casstle.net_ADSL", 0, 96, "Dynamic IP", "1483 Bridged IP LLC"],
            ["CenturyLink(8/35 PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["CenturyLink(8/35 Dynamic IP LLC)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["CenturyTel(8/35 PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["CenturyTel(8/35 Dynamic IP LLC)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Coqui.net_ADSL", 0, 35, "PPPoA", "LLC"],
            ["Covad_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Earthlink(0/35 PPPoE LLC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Earthlink(8/35 PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["Earthlink(8/35 PPPoE VC-MUX)_ADSL", 8, 35, "PPPoE", "VC-MUX"],
            ["Eastex_ADSL", 0, 100, "PPPoA", "LLC"],
            ["Embarq_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["4DV.net_ADSL", 0, 32, "PPPoA", "VC-MUX"],
            ["Grande Communications_ADSL", 1, 34, "PPPoE", "LLC"],
            ["GWI_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Hotwire_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["InReach(8/35 Dynamic IP LLC)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["InReach(0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Internet Junction_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["CenturyLink (Former Qwest 0/32 PPPoA VC-MUX)_ADSL", 0, 32, "PPPoA", "VC-MUX"],
            ["CenturyLink (Former Qwest 0/32 PPPoA LLC)_ADSL", 0, 32, "PPPoA", "LLC"],
            ["CenturyLink (Former Qwest 0/32 PPPoE LLC)_ADSL", 0, 32, "PPPoE", "LLC"],
            ["CenturyLink (Former Qwest 0/32 Dynamic IP LLC)_ADSL", 0, 32, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Socket(8/35 Dynamic IP LLC)_ADSL", 8, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Socket(0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Socket(0/35 PPPoE LLC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Sonic_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["South Western Bell_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Sprint(0/35 PPPoA LLC)_ADSL", 0, 35, "PPPoA", "LLC"],
            ["Sprint(8/35 PPPoE LLC)_ADSL", 8, 35, "PPPoE", "LLC"],
            ["SureWest Communications(0/34 Dynamic IP LLC)_ADSL", 0, 34, "Dynamic IP", "1483 Bridged IP LLC"],
            ["SureWest Communications(0/32 PPPoE LLC)_ADSL", 0, 32, "PPPoE", "LLC"],
            ["SureWest Communications(0/32 PPPoA LLC)_ADSL", 0, 32, "PPPoA", "LLC"],
            ["Toast.Net_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Uniserve_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"],
            ["US West_ADSL", 0, 32, "PPPoA", "VC-MUX"],
            ["Verizon(0/35 PPPoE LLC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Verizon(0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"],
            ["Windstream(0/35 PPPoE LLC)_ADSL", 0, 35, "PPPoE", "LLC"],
            ["Windstream(0/35 Dynamic IP LLC)_ADSL", 0, 35, "Dynamic IP", "1483 Bridged IP LLC"]
        ]
    },
    "Venezuela": {
        "internet": [
            ["CANTV_ADSL", 0, 33, "Dynamic IP", "1483 Bridged IP LLC"]
        ]
    },
    "Viet Nam": {
        "internet": [
            ["FPT_VDSL", 0, "PPPoE"],
            ["Viettel_ADSL", 8, 35, "PPPoE", "LLC"],
            ["FPT_ADSL", 0, 33, "PPPoE", "LLC"],
            ["VNPT Hanoi2_ADSL", 0, 35, "PPPoE", "LLC"],
            ["VNPT Hanoi3_ADSL", 0, 32, "PPPoE", "LLC"],
            ["VNPT HCMC_ADSL", 8, 35, "PPPoE", "LLC"],
            ["VNPT Thai Binh_ADSL", 0, 32, "PPPoE", "LLC"],
            ["VNPT Ninh Binh_ADSL", 0, 32, "PPPoE", "LLC"],
            ["VNPT Quang Tri_ADSL", 0, 35, "PPPoE", "LLC"]
        ]
    },
    "Hong Kong": {
        "internet": [
            ["WharfT&T_VDSL", 0, "PPPoE"],
            ["HGC/threebb_VDSL", 0, "PPPoE"],
            ["PCCW_VDSL", 0, "PPPoE"],
            ["PCCW Netvigator_ADSL", 1, 32, "PPPoE", "LLC"]
        ]
    }
};
