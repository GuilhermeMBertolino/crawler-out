$.su.storeManager.define("securityStore",{fields:[{name:"name"},{name:"value"},{name:"boxlabel"},{name:"selected"}],data:[{name:"No Security",value:0,selected:!0,boxlabel:"No Security"},{name:"WPA/WPA2-Personal",value:1,boxlabel:"WPA/WPA2-Personal"},{name:"WPA/WPA2-Enterprise",value:2,boxlabel:"WPA/WPA2-Enterprise"},{name:"WEP",value:3,boxlabel:"WEP"}]});for(var hours=[],i=0;i<24;i++)hours.push({name:i<10?"0"+i:i.toString(),value:i,boxlabel:i<10?"0"+i:i.toString()});$.su.storeManager.define("hourComboStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:hours});for(var minutes=[],i=0;i<60;i++)minutes.push({name:i<10?"0"+i:i.toString(),value:i,boxlabel:i<10?"0"+i:i.toString()});$.su.storeManager.define("minuteComboStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:minutes}),$.su.storeManager.define("ampmComboStore",{type:"store",fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:$.su.CHAR.COMBOBOX.AM_CAPITAL,value:"AM",boxlabel:$.su.CHAR.COMBOBOX.AM_CAPITAL},{name:$.su.CHAR.COMBOBOX.PM_CAPITAL,value:"PM",boxlabel:$.su.CHAR.COMBOBOX.PM_CAPITAL}]}),$.su.storeManager.define("commonEncryptionStore",{fields:[{name:"name"},{name:"value"},{name:"boxlabel"}],data:[{name:"English",value:0,boxlabel:"English"},{name:"Chinese",value:1,boxlabel:"Chinese"},{name:"Italy",value:2,boxlabel:"Italy"}]});