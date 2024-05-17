var CountryList=new Array();
var ISPList=new Array();

var ispPrtcl;
var ispEncap;
var ispVPI;
var ispVCI;
var ispMTU;

var PPPoEPPPoA=new Array();
var Dynamic=new Array();
var Static=new Array();

var cn=0;
CountryList[cn++]=new Citem("Australia", 12);
CountryList[cn++]=new Citem("Bahrain",2);
CountryList[cn++]=new Citem("Belarus",5);
CountryList[cn++]=new Citem("Brasil",12);
CountryList[cn++]=new Citem("Canada",15);
CountryList[cn++]=new Citem("Chile", 2);
CountryList[cn++]=new Citem("Colombia", 2);
CountryList[cn++]=new Citem("Cyprus", 1);
CountryList[cn++]=new Citem("Egypt", 10);
CountryList[cn++]=new Citem("India", 7);
CountryList[cn++]=new Citem("Indonesia", 10);
CountryList[cn++]=new Citem("Iran", 5);
CountryList[cn++]=new Citem("Israel", 1);
CountryList[cn++]=new Citem("Japan", 15);
CountryList[cn++]=new Citem("Jordan", 5);
CountryList[cn++]=new Citem("Korea", 5);
CountryList[cn++]=new Citem("Kazakhstan", 1);
CountryList[cn++]=new Citem("KSA",9);
CountryList[cn++]=new Citem("Kuwait",5);
CountryList[cn++]=new Citem("Lithuania",1);
CountryList[cn++]=new Citem("Malaysia", 3);
CountryList[cn++]=new Citem("Morocco", 3);
CountryList[cn++]=new Citem("New Zealand", 2);
CountryList[cn++]=new Citem("Oman", 1);
CountryList[cn++]=new Citem("Pakistan", 10);
CountryList[cn++]=new Citem("Palestine", 1);
CountryList[cn++]=new Citem("Peru", 1);
CountryList[cn++]=new Citem("Philippines", 3);
CountryList[cn++]=new Citem("Qatar", 2);
CountryList[cn++]=new Citem("Russia", 35);
CountryList[cn++]=new Citem("Saudi Arabia", 1);
CountryList[cn++]=new Citem("Singapore", 6);
CountryList[cn++]=new Citem("South Africa",1);
CountryList[cn++]=new Citem("Syria", 5);
CountryList[cn++]=new Citem("Thailand", 9);
CountryList[cn++]=new Citem("Turkey", 2);
CountryList[cn++]=new Citem("UAE",1);
CountryList[cn++]=new Citem("Ukraine",2);
CountryList[cn++]=new Citem("Vietnam",4)
CountryList[cn++]=new Citem("Yemen",1);
CountryList[cn++]=new Citem("USA", 33);
var num=0;
//Australia
ISPList[num++]=new ISPitem("Australia", "AAPT", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "Dodo Internet", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "Internode", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "iinet", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "iPrimus", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "Netspace", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "Optus", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "OzEmail", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "Pacific Internet", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "TelPacific", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "Telstra BigPond", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Australia", "TPG", "PPPoE", "LLC", 8, 35, 1492);

//Bahrain
ISPList[num++]=new ISPitem("Bahrain", "Batelco(PPPoE)", "PPPoE", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Bahrain", "Batelco(PPPoA)", "PPPoA", "VC Mux", 8, 35, 0);

//Belarus
ISPList[num++]=new ISPitem("Belarus", "Anitex", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Belarus", "Atlant-telecom", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Belarus", "BN", "Static IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Belarus", "MGTS", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Belarus", "SOLO", "Static IP", "LLC", 0, 33, 0);

//Brasil 
ISPList[num++]=new ISPitem("Brasil", "Brasil Telecom Turbo(RS)", "PPPoE", "LLC", 1, 32, 0);
ISPList[num++]=new ISPitem("Brasil", "Brasil Telecom Turbo Empresas(RS)", "PPPoA", "VC Mux", 1, 32, 0);
ISPList[num++]=new ISPitem("Brasil", "Brasil Telecom Turbo Empresas", "PPPoA", "VC Mux", 0, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "Brasil Telecom Turbo", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "CTBC NetSuper - PPPoA", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "CTBC NetSuper", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "GVT TurboNet", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "Sercomtel Supervia (PPPoE)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "Sercomtel Supervia (MER)", "Dynamic IP", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "Telefonica Speedy Empresas", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "Telefonica Speedy", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Brasil", "Telemar Velox", "PPPoE", "LLC", 0, 33, 0);

//Canada 
ISPList[num++]=new ISPitem("Canada", "3WEB (West) (Cybersurf)", "Dynamic IP", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Canada", "3WEB (East) (Cybersurf)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "Bell", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "IGS (Cybersurf)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "iPrimus Canada (west)", "Dynamic IP", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Canada", "iPrimus Canada (east)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "LightSpeed Communications", "Dynamic IP", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Canada", "Look Communications (I.D. Internet Direct)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "MTS (Internet Service Division) - Primus", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "Nucleus Inc (Partner Telus)", "Dynamic IP", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Canada", "Telus Quebec", "Bridge", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Canada", "Trytel internet Inc.", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "Telus (West)", "Bridge", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Canada", "TekSavvy", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Canada", "Unitz", "PPPoE", "LLC", 0, 35, 0);

//Chile
ISPList[num++]=new ISPitem("Chile", "Telefonica Chile(Bridge)", "Static IP", "LLC", 8, 32, 0);
ISPList[num++]=new ISPitem("Chile", "Telefonica Chile(PPPoE)", "PPPoE", "LLC", 8, 34, 0);

//Colombia
ISPList[num++]=new ISPitem("Colombia", "Emcali(PPPoA)", "PPPoA", "VC Mux", 2, 35, 0);
ISPList[num++]=new ISPitem("Colombia", "Emcali(PPPoE)", "PPPoE", "LLC", 2, 35, 1492);

//Cyprus
ISPList[num++]=new ISPitem("Cyprus", "CYTA", "PPPoA", "VC Mux", 8, 35, 0);

//Egypt
ISPList[num++]=new ISPitem("Egypt", "EgyNet(PPPoA)", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "EgyNet(Static IP)", "Static IP", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "LINKdotNET(PPPoA)", "PPPoA", "VC Mux", 0, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "LINKdotNET(static IP)", "Static IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "LINKdotNET(PPPoE)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "Nile On Line", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "Raya Telecom(PPPoA)", "PPPoA", "VC Mux", 8, 81, 0);
ISPList[num++]=new ISPitem("Egypt", "Raya Telecom(Static IP)", "Static IP", "LLC", 8, 80, 0);
ISPList[num++]=new ISPitem("Egypt", "TeData(PPPoA)", "PPPoA", "VC Mux", 0, 35, 0);
ISPList[num++]=new ISPitem("Egypt", "TeData(Static IP)", "Static IP", "LLC", 0, 35, 0);

//India
ISPList[num++]=new ISPitem("India", "Airtel(PPPoE)", "PPPoE", "LLC", 1, 32, 1492);
ISPList[num++]=new ISPitem("India", "Airtel(Bridge)", "Static IP", "LLC", 1, 32, 0);
ISPList[num++]=new ISPitem("India", "BSNL", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("India", "MTNL(Bridge)", "Static IP", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("India", "MTNL(PPPoE)", "PPPoE", "LLC", 0, 32, 1492);
ISPList[num++]=new ISPitem("India", "VSNL(Bridge)", "Static IP", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("India", "VSNL(PPPoE)", "PPPoE", "LLC", 8, 35, 1492);

//Indonesia
/*
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 1 (Sumatra)", "PPPoE", "LLC", 8, 81, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 2 (Jakarta) Alcatel", "PPPoA", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 2 (Jakarta) Siemens", "PPPoA", "VC Mux", 1, 33, 0);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 2 (Jakarta) Huawei", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 3 (West Java)", "PPPoA", "LLC", 8, 81, 0);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 4 (Central Java)", "PPPoE", "LLC", 8, 81, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 5 (East Java) Ericsson", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 5 (East Java) Huawei", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 6 (Kalimantan)", "PPPoE", "LLC",0, 35, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom DIVRE 7 (East Indonesia)", "PPPoE", "LLC", 0, 35, 1492);
*/
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom (VPI/VCI: 0/35)", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom (VPI/VCI: 8/35)", "PPPoA", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom (VPI/VCI: 1/33)", "PPPoA", "VC Mux", 1, 33, 1492);
ISPList[num++]=new ISPitem("Indonesia", "PT Telkom (VPI/VCI: 8/81)", "PPPoE", "LLC", 8, 81, 1492);


//Iran
ISPList[num++]=new ISPitem("Iran", "Daade Gostar e Novin", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Iran", "DATAK-Telecom", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Iran", "Pars-Online", "Static IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Iran", "Pars On Line", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Iran", "Shatel", "PPPoE", "LLC", 0, 35, 0);

//Israel
ISPList[num++]=new ISPitem("Israel", "Bezeq", "PPPoE", "LLC", 8, 48, 1492);

//Japan
ISPList[num++]=new ISPitem("Japan", "ACCA", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Japan", "CTnet", "PPPoA", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("Japan", "DION (KDDI)", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Japan", "eAccess", "PPPoE", "LLC", 0, 32, 1492);
ISPList[num++]=new ISPitem("Japan", "eAccess (PPPoA)", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("Japan", "FLET's ADSL (NTT)", "PPPoE", "LLC", 0, 32, 1492);
ISPList[num++]=new ISPitem("Japan", "HTnet", "PPPoA", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("Japan", "KCN", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("Japan", "Nagoya", "PPPoE", "LLC", 0, 32, 1492);
ISPList[num++]=new ISPitem("Japan", "ODN (J-DSL Personal)", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("Japan", "ODN (J-DSL Business)", "PPPoA", "VC Mux", 0, 33, 0);
ISPList[num++]=new ISPitem("Japan", "OCN", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Japan", "RMC", "Dynamic IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Japan", "T-com", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("Japan", "Yahoo!BB (SoftBankBB)", "Dynamic IP", "LLC", 0, 35, 0);

//Jordan
ISPList[num++]=new ISPitem("Jordan", "Batelco-Jordan(PPPoE-LLC)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Jordan", "Batelco-Jordan(PPPoE-VCMUX)", "PPPoE", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Jordan", "Cyberia", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Jordan", "Orange Internet", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Jordan", "Wanadoo", "PPPoE", "LLC", 8, 35, 1492);

//Korea
ISPList[num++]=new ISPitem("Korea", "Hanaro Telecom(PPPoE)", "PPPoE", "LLC", 0, 67, 1492);
ISPList[num++]=new ISPitem("Korea", "Hanaro Telecom(PPPoA-LLC)", "PPPoA", "LLC", 0, 67, 0);
ISPList[num++]=new ISPitem("Korea", "Hanaro Telecom(PPPoA-VCMUX)", "PPPoA", "VC Mux", 0, 67, 0);
ISPList[num++]=new ISPitem("Korea", "KT(Korea Telecom) PPPoE", "PPPoE", "LLC", 0, 32, 1492);
ISPList[num++]=new ISPitem("Korea", "KT(Korea Telecom) PPPoA", "PPPoA", "LLC", 0, 32, 1492);

//Kazakhstan
ISPList[num++]=new ISPitem("Kazakhstan","Kazakhtelecom (MegaLine)",  "PPPoE", "LLC", 0, 40, 0);

//KSA
ISPList[num++]=new ISPitem("KSA","Atheer",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Awalnet",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Cyberia",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Nesma",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Sahara",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Saudinet", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Shabakah",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Zajil",  "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("KSA","Zajoul",  "PPPoE", "LLC", 0, 35, 0);

//Kuwait
ISPList[num++]=new ISPitem("Kuwait", "Fasttelco", "PPPoE", "VC Mux", 1, 100, 0);
ISPList[num++]=new ISPitem("Kuwait", "QualityNet(PPPoA-LLC)", "PPPoA", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Kuwait", "QualityNet(PPPoA-VCMUX)", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Kuwait", "United (Corporate)", "PPPoE", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("Kuwait", "United (Home)", "PPPoE", "LLC", 0, 33, 0);

//Lithuania
ISPList[num++]=new ISPitem("Lithuania", "Lietuvos Telekomas", "PPPoE", "LLC", 8, 35, 0);

//Malaysia
ISPList[num++]=new ISPitem("Malaysia", "Maxis", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Malaysia", "Streamyx (Telecom Malaysia - PPPoA)", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Malaysia", "Streamyx (Telecom Malaysia - PPPoE)", "PPPoE", "LLC", 0, 35, 1492);

//Morocco
ISPList[num++]=new ISPitem("Morocco", "MAROC Connect", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Morocco", "MAROC Telecom", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Morocco", "MAROC Telecom (IAM)", "PPPoE", "LLC", 8, 35, 0);


//New Zealand
ISPList[num++]=new ISPitem("New Zealand", "IHUG", "PPPoA", "VC Mux", 0, 100, 0);
ISPList[num++]=new ISPitem("New Zealand", "Telecom Xtra", "PPPoA", "VC Mux", 0, 100, 0);

//Oman
ISPList[num++]=new ISPitem("Oman", "Oman Tel", "PPPoE", "LLC", 0, 35, 1492);

//Pakistan
ISPList[num++]=new ISPitem("Pakistan", "CyberNet", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Pakistan", "Dancim", "PPPoE", "LLC", 8, 35, 1492);
ISPList[num++]=new ISPitem("Pakistan", "GerrysNet", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Pakistan", "LinkDotNet", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Pakistan", "Micronet", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Pakistan", "MicroNetBroadBand", "PPPoE", "LLC", 1, 32, 0);
ISPList[num++]=new ISPitem("Pakistan", "MultiNet", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Pakistan", "PAKNet", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Pakistan", "PTCL", "PPPoE", "LLC", 0, 103, 0);
ISPList[num++]=new ISPitem("Pakistan", "WolNet", "PPPoE", "LLC", 0, 35, 0);

//Palestine
ISPList[num++]=new ISPitem("Palestine", "PalTel/Hadara", "PPPoE", "LLC", 8, 35, 1492);

//Peru
ISPList[num++]=new ISPitem("Peru", "Telefonica Peru", "PPPoE", "LLC", 8, 60, 1492);

//Philippines
ISPList[num++]=new ISPitem("Philippines", "Globe", "PPPoA", "VC Mux", 0, 35, 0);
ISPList[num++]=new ISPitem("Philippines", "PLDT (Manila)", "PPPoE", "LLC", 0, 100, 1492);
ISPList[num++]=new ISPitem("Philippines", "PLDT (Provincial)", "PPPoE", "LLC", 0, 35, 1492);

//Qatar
ISPList[num++]=new ISPitem("Qatar", "Qtel(PPPoA-VCMUX)", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Qatar", "Qtel(PPPoE-LLC)", "PPPoE", "LLC", 8, 35, 0);

//Russia
ISPList[num++]=new ISPitem("Russia", "AAA-Internet", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Russia", "Agenstvo Delovoy Svyasi", "Static IP", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "BashInformSvyaz", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "CentrTelecom", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "DalSvyaz", "Static IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "DelovayaNetwork-Irkutsk", "Static IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "Infoline", "PPPoE", "LLC", 2, 32, 0);
ISPList[num++]=new ISPitem("Russia", "InformSvyaz-Chernozemye", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Russia", "Interkon", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Russia", "Kazakhtelecom (Megaline)", "PPPoE", "LLC", 0, 40, 0);
ISPList[num++]=new ISPitem("Russia", "Kominkom-Voroneg", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Russia", "Loktelekom (Chita)", "Bridge", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "Megapolis Telecom", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "NIS (NN Inform Networks)", "Static IP", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "Polarcom (Murmansk)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "Sandy", "Static IP", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Russia", "Sibirtelecom Irkutskaya Oblast", "PPPoE", "LLC", 0, 100, 0);
ISPList[num++]=new ISPitem("Russia", "Stream", "PPPoE", "LLC", 1, 50, 0);
ISPList[num++]=new ISPitem("Russia", "SZKTI (Murmansk)", "PPPoE", "LLC", 8, 81, 0);
ISPList[num++]=new ISPitem("Russia", "SZT-Avangard Unlimit (Murmansk)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UralSvyazInform", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Adigeya", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Astrahan", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Kabardini-Balkariya", "PPPoE", "LLC", 0, 67, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Karachaevo-Cherkesiya", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Krasnodar", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: North Ossetia-Alania", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Stavropol", "PPPoA", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "UTK: Volgograd", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Russia", "VeresADSL", "PPPoE", "LLC", 10, 40, 0);
ISPList[num++]=new ISPitem("Russia", "VolgaTelecom (Nizhniy Novgorod)", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Russia", "VolgaTelecom (Samara)", "PPPoE", "LLC", 1, 100, 0);
ISPList[num++]=new ISPitem("Russia", "VoronegSvyazInform", "Static IP", "LLC", 10, 40, 0);
ISPList[num++]=new ISPitem("Russia", "VostokTelecom", "Static IP", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("Russia", "WebPlus", "Static IP", "LLC", 1, 32, 0);

//Saudi Arabia
ISPList[num++]=new ISPitem("Saudi Arabia", "Saudi Telecom", "PPPoE", "LLC", 0, 35, 1492);

//Singapore
ISPList[num++]=new ISPitem("Singapore", "Pacific Internet Broad Band (PPPoE)", "PPPoE", "LLC", 0, 100, 1492);
ISPList[num++]=new ISPitem("Singapore", "Pacific Internet Broad Band (PPPoA-LLC)", "PPPoA", "LLC", 0, 100, 0);
ISPList[num++]=new ISPitem("Singapore", "Pacific Internet Broad Band (PPPoA-VCMux)", "PPPoA", "VC Mux", 0, 100, 0);
ISPList[num++]=new ISPitem("Singapore", "Singnet Broad Band (PPPoE)", "PPPoE", "LLC", 0, 100, 1492);
ISPList[num++]=new ISPitem("Singapore", "Singnet Broad Band (PPPoA-LLC)", "PPPoA", "LLC", 0, 100, 0);
ISPList[num++]=new ISPitem("Singapore", "Singnet Broad Band (PPPoA-VCMux)", "PPPoA", "VC Mux", 0, 100, 0);

//South Africa
ISPList[num++]=new ISPitem("South Africa", "Telkom SA", "PPPoE", "LLC", 8, 35, 0);

//Syria
ISPList[num++]=new ISPitem("Syria", "190-PDN", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Syria", "e-lcom", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Syria", "Sawa", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Syria", "Syrian Telecom-1", "PPPoE", "LLC", 0, 33, 1492);
ISPList[num++]=new ISPitem("Syria", "Syrian Telecom-2", "PPPoA", "LLC", 0, 35, 0);


//Thailand
ISPList[num++]=new ISPitem("Thailand", "ADC", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Thailand", "Qnet", "PPPoE", "LLC", 0, 40, 1492);
ISPList[num++]=new ISPitem("Thailand", "Samart", "PPPoE", "LLC", 0, 35, 1492);
ISPList[num++]=new ISPitem("Thailand", "TOT", "PPPoE", "LLC", 1, 32, 1492);
ISPList[num++]=new ISPitem("Thailand", "TRUE (Huawei)", "PPPoE", "LLC", 0, 100, 1492);
ISPList[num++]=new ISPitem("Thailand", "TRUE (Nokia)", "PPPoA", "VC Mux", 0, 100, 0);
ISPList[num++]=new ISPitem("Thailand", "TT&T (Hinet)", "PPPoE", "LLC", 0, 66, 1492);
ISPList[num++]=new ISPitem("Thailand", "TT&T (Normal)", "PPPoE", "LLC", 0, 33, 1492);
ISPList[num++]=new ISPitem("Thailand", "UCOM", "PPPoE", "LLC", 0, 100, 1492);

//Turkey
ISPList[num++]=new ISPitem("Turkey", "TTNET (PPPoA)", "PPPoA", "VC Mux", 8, 35, 0);
ISPList[num++]=new ISPitem("Turkey", "TTNET (PPPoE)", "PPPoE", "LLC", 8, 35, 1492);

//UAE
ISPList[num++]=new ISPitem("UAE", "Etisalat", "PPPoA", "LLC", 0, 50, 0);

//Vietnam
ISPList[num++]=new ISPitem("Vietnam", "FPT (PPPoE LLC)", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Vietnam", "SPT (PPPoE LLC)", "PPPoE", "LLC", 0, 33, 0);
ISPList[num++]=new ISPitem("Vietnam", "Viettel (PPPoE LLC)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Vietnam", "VNPT (PPPoE LLC)", "PPPoE", "LLC", 8, 35, 0);

//Ukraine
ISPList[num++]=new ISPitem("Ukraine", "Inter-Telecom", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("Ukraine", "Matrix", "Static IP", "LLC", 0, 33, 0);

//Yemen
ISPList[num++]=new ISPitem("Yemen", "Yemen Net", "PPPoA", "VC Mux", 8, 35, 0);

//USA
ISPList[num++]=new ISPitem("USA", "4DV.Net ", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "All Tel(PPPoE)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "All Tel(2)", "Bridge", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "AT&T (PPPoE)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "AT&T (Bridge Mode)", "Bridge", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "August.net(1)", "Bridge", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "August.net(2)", "Bridge", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "BellSouth", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "CenturyTel (PPPoE)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "CenturyTel (2)", "Bridge", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "Coqui.net ", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "Covad ", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "Earthlink(PPPoE-1)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "Earthlink(PPPoE-2)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "Earthlink(PPPoA)", "PPPoA", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "Embarq", "Bridge", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "GWI", "Bridge", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "QWest(PPPoA-1)", "PPPoA", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "QWest(PPPoA-2)", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "QWest(3)", "Bridge", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "SBC(PPPoE)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "SBC(2)", "Bridge", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "SBC(3)", "Bridge", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "SouthWestern Bell", "Bridge", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "Sprint(PPPoA)", "PPPoA", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "Sprint(PPPoE)", "PPPoE", "LLC", 8, 35, 0);
ISPList[num++]=new ISPitem("USA", "SureWest Communications(1)", "Bridge", "LLC", 0, 34, 0);
ISPList[num++]=new ISPitem("USA", "SureWest Communications(PPPoE)", "PPPoE", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "SureWest Communications(PPPoA)", "PPPoA", "LLC", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "Toast.Net", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "US West", "PPPoA", "VC Mux", 0, 32, 0);
ISPList[num++]=new ISPitem("USA", "Verizon(PPPoE)", "PPPoE", "LLC", 0, 35, 0);
ISPList[num++]=new ISPitem("USA", "Verizon(2)", "Bridge", "LLC", 0, 35, 0);

function Citem(scountry, iispcount)
{
    this.scountry=scountry;
    this.iispcount=iispcount;
}


function ISPitem(scountry,sname,sprtcl,sencap,ivpi, ivci, imtu)
{
    this.scountry=scountry;
    this.sname=sname;
    this.sprtcl=sprtcl;
    this.sencap=sencap;
    this.ivpi=ivpi;
    this.ivci=ivci;
    this.imtu=imtu;
}

function changeISP(cb1, cb2){

var value = cb1[cb1.selectedIndex].value;
	
	cb2.options.length=0;

	cb2.options[0]=new Option("(Click to select)", "-1");

	if ((value == -1)||(value == -2)){
		cb2.options[1]=new Option("Others", "-2");
		if ((value == -2))
			cb2.selectedIndex = cb2.length - 1;

		return;
	}

	var count =0;

	for (i=0; i < ISPList.length; i++){
		if (CountryList[cb1[cb1.selectedIndex].value].scountry == ISPList[i].scountry){
			cb2.options[count+1]=new Option(ISPList[i].sname, i);
			count++;
		}

		if (count == CountryList[cb1[cb1.selectedIndex].value].iispcount){
			break;
		}
	}

	cb2.options[count + 1]=new Option("Others", "-2");
	
}

function createCountry(cb){
	
	cb.options.length=0;

	cb.options[0]=new Option("(Click to select)", "-1");

	var count =0;

	for (i=0; i < CountryList.length; i++){
		cb.options[i+1]=new Option(CountryList[i].scountry, i);
		count++;
	}

	cb.options[count + 1]=new Option("Others", "-2");
	
}

function getISPDetails(cb){

var value = cb[cb.selectedIndex].value;

	if ((value == -1)||(value == -2)){
		ispPrtcl = "";
		ispEncap = "";
		ispVPI = 0;
		ispVCI = 35;
		ispMTU = 0;
		return;
	}

	ispPrtcl = ISPList[cb[cb.selectedIndex].value].sprtcl;
	ispEncap = ISPList[cb[cb.selectedIndex].value].sencap;
	ispVPI = ISPList[cb[cb.selectedIndex].value].ivpi;
	ispVCI = ISPList[cb[cb.selectedIndex].value].ivci;
	ispMTU = ISPList[cb[cb.selectedIndex].value].imtu;
	
}

function setContype(cb){
	
	cb.options.length = 0;

	cb.options[0] = new Option("(Click to Select)", "-1");
	cb.selectedIndex = 0;

	if (ispPrtcl == "PPPoA"){
		cb.options[1] = new Option("VC/MUX", "PPPoAVCMux");
		cb.options[2] = new Option("LLC/ENCAPSULATION", "PPPoALLC");
		if (ispEncap == "LLC")
			cb.selectedIndex = 2;
		else if (ispEncap == "VC Mux")
			cb.selectedIndex = 1;
	} else if (ispPrtcl == "PPPoE"){
		cb.options[1] = new Option("LLC/SNAP-BRIDGING", "PPPoELLC");
		cb.options[2] = new Option("VC/MUX", "PPPoEVCMux");
		if (ispEncap == "LLC")
			cb.selectedIndex = 1;
		else if (ispEncap == "VC Mux")
			cb.selectedIndex = 2;
	} else if (ispPrtcl == "Dynamic IP"){
		cb.options[1] = new Option("LLC/SNAP-BRIDGING", "PPPoELLC");
		cb.options[2] = new Option("VC/MUX", "PPPoEVCMux");
		if (ispEncap == "LLC")
			cb.selectedIndex = 1;
		else if (ispEncap == "VC Mux")
			cb.selectedIndex = 2;
	} else if (ispPrtcl == "Static IP"){
		cb.options[1] = new Option("LLC", "MerLLC");
		cb.options[1] = new Option("LLC/SNAP-BRIDGING", "PPPoELLC");
		cb.options[2] = new Option("VC/MUX", "PPPoEVCMux");
		if (ispEncap == "LLC")
			cb.selectedIndex = 1;
		else if (ispEncap == "VC Mux")
			cb.selectedIndex = 2;
	} else if (ispPrtcl == "Bridge"){
		cb.options[1] = new Option("LLC/SNAP-BRIDGING", "PPPoELLC");
		cb.options[2] = new Option("VC/MUX", "PPPoEVCMux");
		if (ispEncap == "LLC")
			cb.selectedIndex = 1;
		else if (ispEncap == "VC Mux")
			cb.selectedIndex = 2;
	} else if (ispPrtcl == "IPoA"){
		cb.options[1] = new Option("LLC/SNAP-ROUTING", "DynLLC");
		cb.options[2] = new Option("VC/MUX", "DynVCMux");
		if (ispEncap == "LLC")
			cb.selectedIndex = 1;
		else if (ispEncap == "VC Mux")
			cb.selectedIndex = 2;
	}
}
