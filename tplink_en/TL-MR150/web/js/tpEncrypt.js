$=$||{},$.encrypt=$.encrypt||{},$.encrypt.MD5=function(text,option){return CryptoJS.MD5(text,option).toString()},$.encrypt.AES=function(){var OPTIONS={mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7},AES=function(){};return AES.prototype.genKey=function(){var key=((new Date).getTime()+""+1e9*Math.random()).substr(0,16),iv=((new Date).getTime()+""+1e9*Math.random()).substr(0,16);return this.key=key,this._keyUtf8=CryptoJS.enc.Utf8.parse(key),this.iv=iv,this._ivUtf8=CryptoJS.enc.Utf8.parse(iv),{key:key,iv:iv}},AES.prototype.setKey=function(key,iv){"string"==typeof key&&16==key.length&&(this.key=key,this._keyUtf8=CryptoJS.enc.Utf8.parse(key)),"string"==typeof iv&&16==iv.length&&(this.iv=iv,this._ivUtf8=CryptoJS.enc.Utf8.parse(iv))},AES.prototype.setStringKey=function(string){var temp=string.split("&"),key=temp[0].split("=")[1],iv=temp[1].split("=")[1];this.setKey(key,iv)},AES.prototype.getKey=function(){return{key:this.key,iv:this.iv}},AES.prototype.getKeyString=function(pattern){return(pattern=pattern||"key=%key%&iv=%iv%").replace("%key%",this.key).replace("%iv%",this.iv)},AES.prototype.encrypt=function(plaintText){var op=$.extend(OPTIONS,{iv:this._ivUtf8});return CryptoJS.AES.encrypt(plaintText,this._keyUtf8,op).toString()},AES.prototype.decrypt=function(encrypted){var op=$.extend(OPTIONS,{iv:this._ivUtf8}),decryptedData=CryptoJS.AES.decrypt(encrypted,this._keyUtf8,op);try{return decryptedData.toString(CryptoJS.enc.Utf8)}catch(e){return decryptedData.toString(CryptoJS.enc.Latin1)}},AES}(),$.encrypt.RSA=function(){var rsaEncrypt=$.rsa.encrypt,RSA=function(){};return RSA.prototype.setKey=function(nn,ee){this.nn=nn,this.ee=ee},RSA.prototype.setStringKey=function(string){var temp=string.split("&"),nn=temp[0].split("=")[1],ee=temp[1].split("=")[1];this.setKey(nn,ee)},RSA.prototype.encrypt=function(plaintText,nn,ee){return rsaEncrypt(plaintText,this.nn||nn,this.ee||ee,512,0)},RSA.prototype.getKeyString=function(pattern){return(pattern=pattern||"nn=%nn%&ee=%ee%").replace("%nn%",this.nn).replace("%ee%",this.ee)},RSA}(),$.encrypt.encryptor=function(){var Encryptor=function(encryptorStr){this.aes=new $.encrypt.AES,this.rsa=new $.encrypt.RSA};return Encryptor.prototype.setHash=function(name,pwd){this.hash=$.encrypt.MD5(name+pwd)},Encryptor.prototype.getHash=function(name,pwd){return this.hash},Encryptor.prototype.setHashString=function(hashstring){this.hash=hashstring},Encryptor.prototype.setSeq=function(seq){this.seq=parseInt(seq)},Encryptor.prototype.getSeq=function(seq){return this.seq},Encryptor.prototype.genAESKey=function(){this.aes.genKey(),this.aesKeyString=this.aes.getKeyString()},Encryptor.prototype.getAESKey=function(){return this.aes.getKeyString()},Encryptor.prototype.setAESStringKey=function(string){this.aesKeyString=string,this.aes.setStringKey(string)},Encryptor.prototype.setRSAKey=function(nn,ee){this.rsa.setKey(nn,ee)},Encryptor.prototype.setRSAStringKey=function(string){this.rsa.setStringKey(string)},Encryptor.prototype.getRSAKey=function(){return this.rsa.getKeyString()},Encryptor.prototype.getSignature=function(seq,isLogin){if(1==isLogin)s=this.aesKeyString+"&h="+this.hash+"&s="+seq||this.seq;else var s="h="+this.hash+"&s="+seq||this.seq;return this.rsa.encrypt(s)},Encryptor.prototype.AESEncrypt=function(data,isLogin){var result={};result.data=this.aes.encrypt(data);var dataLen=result.data.length;return result.sign=this.getSignature(this.seq+dataLen,isLogin),result},Encryptor.prototype.AESDecrypt=function(data){return this.aes.decrypt(data)},Encryptor}(),$.encrypt.encryptManager=function(){var EncryptManager=function(){};return EncryptManager.prototype.genEncryptor=function(){return this.encryptor=new $.encrypt.encryptor,this.encryptor},EncryptManager.prototype.recordEncryptor=function(){this.encryptor&&(localStorage.setItem("encryptorAES",this.encryptor.getAESKey()),localStorage.setItem("encryptorSeq",this.encryptor.getSeq()),localStorage.setItem("encryptorHash",this.encryptor.getHash()),localStorage.setItem("encryptorRsa",this.encryptor.getRSAKey()))},EncryptManager.prototype.getEncryptor=function(){return this.encryptor||(this.encryptor=new $.encrypt.encryptor,this.encryptor.setAESStringKey(localStorage.getItem("encryptorAES")),this.encryptor.setSeq(localStorage.getItem("encryptorSeq")),this.encryptor.setHashString(localStorage.getItem("encryptorHash")),this.encryptor.setRSAStringKey(localStorage.getItem("encryptorRsa"))),this.encryptor},EncryptManager.prototype.cleanStorage=function(){localStorage.removeItem("encryptorAES"),localStorage.removeItem("encryptorSeq"),localStorage.removeItem("encryptorHash"),localStorage.removeItem("encryptorRsa")},new EncryptManager}();