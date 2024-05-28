!function(l){l.su.modelManager.define("offlineEnableModel",{type:"model",fields:[{name:"enable"}],proxy:{url:l.su.url("/admin/offline_download?form=enable")}}),l.su.modelManager.define("offlineSettingModel",{type:"model",autoReload:!0,fields:[{name:"scheduleEnable",mapping:"schedule_enable"},{name:"schedule"},{name:"seedEnable",mapping:"seed_enable"},{name:"maxActiveNum",mapping:"max_active_num",vtype:{vtype:"number",min:1,max:10},allowBlank:!1},{name:"btMaxOpenFiles",mapping:"bt_max_open_files",vtype:{vtype:"number",min:1,max:500},allowBlank:!1},{name:"btMaxPeers",mapping:"bt_max_peers",allowBlank:!1},{name:"maxDownloadLimit",mapping:"max_down_limit"},{name:"maxUploadLimit",mapping:"max_up_limit"},{name:"maxDownload",mapping:"max_download",allowBlank:!1},{name:"maxUpload",mapping:"max_upload",allowBlank:!1},{name:"enableDht",mapping:"enable_dht"},{name:"enablePeerExchange",mapping:"enable_peer_exchange"},{name:"btForceEncrption",mapping:"bt_force_encryption"},{name:"amuleServer",mapping:"amule_server",vtype:"ip",allowBlank:!1},{name:"amulePort",mapping:"amule_port",vtype:{vtype:"number",min:0,max:65536},allowBlank:!1}],convert:function(e){var n=e.schedule||{};return e.schedule="string"==typeof n?n:JSON.stringify(n),e},serialize:function(e){var n=JSON.parse(e.schedule),a={};return l.each(n,function(e,n){n.length&&(a[e]=n)}),e.schedule=JSON.stringify(a),e},proxy:{url:l.su.url("/admin/offline_download?form=set")}}),l.su.modelManager.define("allocationModel",{type:"model",fields:[{name:"uuid",defaultValue:""},{name:"path",defaultValue:"",allowBlank:!1}],proxy:{url:l.su.url("/admin/offline_download?form=allocation")}}),l.su.modelManager.define("downloadTaskModel",{type:"model",fields:[{name:"type",defaultValue:"pc"},{name:"url",allowBlank:!1,vtype:"string_visible"},{name:"btFileVolumn",mapping:"bt_file_volumn",allowBlank:!1},{name:"btFile",mapping:"bt_file"},{name:"btFileUSB"},{name:"btFilePC"}],serialize:function(e){var n={},a={};switch(n.type=e.type,e.type){case"pc":n.bt_file="";break;case"usb":n.bt_file=e.btFileUSB,n.bt_file_volumn=e.bt_file_volumn;break;case"url":n.url=e.url}return a.operation="insert",a.key="add",a.index=0,a.old="add",a["new"]=JSON.stringify(n),a},proxy:"downloadTaskProxy"}),l.su.storeManager.define("downloadTaskStore",{type:"store",keyProperty:"key",fields:[{name:"file"},{name:"size"},{name:"completed"},{name:"downloadSpeed"},{name:"uploadSpeed"},{name:"status"},{name:"type"},{name:"numSeeders"},{name:"connections"},{name:"gid"}],proxy:"downloadTaskProxy"}),l.su.storeManager.define("usbVolumStore",{type:"store",keyProperty:"id",fields:[{name:"id"},{name:"value"},{name:"name"}],proxy:{preventSuccessEvent:!0,preventFailEvent:!0,preventErrorEvent:!0,url:l.su.url("/admin/offline_download?form=volumn")}}),l.su.storeManager.define("sourceStore",{type:"store",fields:[{name:"name"},{name:"value"}],data:[{value:"pc",name:l.su.CHAR.OFFLINE_DOWNLOAD.TORRENT_PC},{value:"usb",name:l.su.CHAR.OFFLINE_DOWNLOAD.TORRENT_USB},{value:"url",name:l.su.CHAR.OFFLINE_DOWNLOAD.SOURCE_URL}]}),l.su.storeManager.define("downloadTaskTreeStore",{type:"store",fields:[{name:"uuid"},{name:"name"},{name:"path"},{name:"hasBranch"},{name:"hasLeaves"},{name:"branches"},{name:"leaves"}],proxy:{preventSuccessEvent:!0,preventFailEvent:!0,preventErrorEvent:!0,url:l.su.url("/admin/folder_sharing?form=tree")},storeConvert:function(e){for(var n=this.getData(),a=0,l=n.length;a<l;a++)for(var r=0,o=n[a].branches.length;r<o;r++)e.path==n[a]["branches"][r].path&&(n[a]["branches"][r]=e);return n}}),l.su.define("downloadTaskProxy",{extend:"IPFProxy",preventSuccessEvent:!0,preventFailEvent:!0,preventErrorEvent:!0,url:l.su.url("/admin/offline_download?form=item")}),l.su.define("folderTreeProxy",{extend:"IPFProxy",preventSuccessEvent:!0,preventFailEvent:!0,preventErrorEvent:!0,url:l.su.url("/admin/folder_sharing?form=tree")}),l.su.define("amuleProxy",{extend:"IPFProxy",preventSuccessEvent:!0,preventFailEvent:!0,preventErrorEvent:!0,url:l.su.url("/admin/offline_download?form=amule")})}(jQuery);