/**
 * Created by hwl on 2018/5/18.
 */
(function() {
	$ = $ || {};
    $.encrypt = $.encrypt || {};
    //------------------md5-------------------------
    $.encrypt.MD5 = function(text, option) {
        return CryptoJS.MD5(text, option).toString();
    };

    $.encrypt.rand = function() {
        var cryptoObj = window.crypto || window.msCrypto;
        if(cryptoObj && cryptoObj.getRandomValues){
        var randomBuffer= new Uint32Array(1);
            cryptoObj.getRandomValues(randomBuffer);
        return randomBuffer[0] / (0xFFFFFFFF + 1);
        }else{
            return Math.random();
    }
    }
    
    $.encrypt.getRandomIntInclusive = function(min, max){
        var minValue = Math.ceil(min);
        var maxValue = Math.floor(max);
      
        return Math.floor($.encrypt.rand() * (maxValue - minValue + 1)) + minValue;
    }
    $.encrypt.generateRandomIntString = function(length){
        var result = "";
        for(;length--;){
            result += $.encrypt.getRandomIntInclusive(0,9);
        }
        return result;
    }
    //------------------AES CBC Pkcs7-------------------------
    $.encrypt.AES = (function() {
        var KEY_LEN = 128 / 8;
        var IV_LEN = 16;
        var OPTIONS = {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        };
        var AES = function() {

        };

        AES.prototype.genKey = function() {
            var key = $.encrypt.generateRandomIntString(KEY_LEN);
            var iv = $.encrypt.generateRandomIntString(IV_LEN);
            this.key = key;
            this._keyUtf8 = CryptoJS.enc.Utf8.parse(key);
            this.iv = iv;
            this._ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
            return {
                key: key,
                iv: iv
            }
        };
        AES.prototype.setKey = function(key, iv) {
            if (typeof key == "string" && key.length == KEY_LEN) {
                this.key = key;
                this._keyUtf8 = CryptoJS.enc.Utf8.parse(key);
            }
            if (typeof iv == "string" && iv.length == IV_LEN) {
                this.iv = iv;
                this._ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
            }
        };
        AES.prototype.setStringKey = function(string) {
            var temp = string.split('&');
            var key = temp[0].split('=')[1];
            var iv = temp[1].split('=')[1];
            this.setKey(key, iv);
        };
        AES.prototype.getKey = function() {
            return {
                key: this.key,
                iv: this.iv
            }
        };
        AES.prototype.getKeyString = function(pattern) {
            pattern = pattern || "key=%key%&iv=%iv%"
            var result = pattern.replace("%key%", this.key).replace("%iv%", this.iv);
            return result;
        };
        AES.prototype.encrypt = function(plaintText) {
            var op = $.extend(OPTIONS,{
                iv: this._ivUtf8
            });

            var encryptedData = CryptoJS.AES.encrypt(plaintText, this._keyUtf8, op);

            return encryptedData.toString();
        };
        AES.prototype.decrypt = function(encrypted) {
            var op = $.extend(OPTIONS,{
                iv: this._ivUtf8
            });

            var decryptedData = CryptoJS.AES.decrypt(encrypted, this._keyUtf8, op);

            return decryptedData.toString(CryptoJS.enc.Utf8);
        };
        return AES;
    })();

    //------------------rsa-------------------------
    $.encrypt.RSA = (function() {
        var rsaEncrypt = $.rsa.encrypt;
        var RSA = function() {

        };
        RSA.prototype.setKey = function(nn, ee) {
            this.nn = nn;
            this.ee = ee;
        };
        RSA.prototype.setStringKey = function(string) {
            var temp = string.split('&');
            var nn = temp[0].split('=')[1];
            var ee = temp[1].split('=')[1];
            this.setKey(nn, ee);
        };
        RSA.prototype.encrypt = function(plaintText, nn, ee) {
            return rsaEncrypt(plaintText, this.nn || nn, this.ee || ee, 512, 1);
        };
        RSA.prototype.getKeyString = function(pattern) {
            pattern = pattern || "nn=%nn%&ee=%ee%";
            var result = pattern.replace("%nn%", this.nn).replace("%ee%", this.ee);
            return result
        };

        return RSA;
    })();
    
    //------------------encryptor----------------------
    $.encrypt.encryptor  = (function() {
        var Encryptor = function(encryptorStr) {
            this.aes = new $.encrypt.AES();
            this.rsa = new $.encrypt.RSA();
        };
        Encryptor.prototype.setHash = function(name, pwd) {
            this.hash = $.encrypt.MD5(name + pwd);
        };
        Encryptor.prototype.getHash = function(name, pwd) {
            return this.hash;
        };
		Encryptor.prototype.setHashString = function(hashstring) {
            this.hash = hashstring;
        };
        Encryptor.prototype.setSeq = function(seq) {
            this.seq = parseInt(seq);
        };
        Encryptor.prototype.getSeq = function(seq) {
            return this.seq;
        };
        Encryptor.prototype.genAESKey = function() {
            this.aes.genKey();
            this.aesKeyString = this.aes.getKeyString();
        };
        Encryptor.prototype.getAESKey = function() {
            return this.aes.getKeyString();
        };
        Encryptor.prototype.setAESStringKey = function(string) {
			this.aesKeyString  =  string;
            this.aes.setStringKey(string);
        };
        Encryptor.prototype.setRSAKey = function(nn, ee) {
            this.rsa.setKey(nn, ee);
        };
        Encryptor.prototype.setRSAStringKey = function(string) {
            this.rsa.setStringKey(string);
        };
        Encryptor.prototype.getRSAKey = function() {
            return this.rsa.getKeyString();
        };
        Encryptor.prototype.getSignature = function(seq, isLogin) {
			if(isLogin == 1)
			{
				var s = this.aesKeyString + "&h=" + this.hash + "&s=" + seq || this.seq;
			}
			else
			{
				var s = "h=" + this.hash + "&s=" + seq || this.seq;
			}

			var sign = this.rsa.encrypt(s);
            return sign;
        };
        Encryptor.prototype.AESEncrypt = function(data, isLogin) {
            var result = {};
            //var dataLen = data.length;
            result.data = this.aes.encrypt(data);
			var dataLen = result.data.length;
            result.sign = this.getSignature(this.seq + dataLen, isLogin);
            return result;
        };
        Encryptor.prototype.AESDecrypt = function(data) {
            var result = this.aes.decrypt(data);
            return result;
        };

        return Encryptor;
    })();

    //------------------encryptManager----------------------
    $.encrypt.encryptManager = (function() {
        var EncryptManager = function() {

        };

        EncryptManager.prototype.genEncryptor = function() {
            this.encryptor = new $.encrypt.encryptor();
            return this.encryptor;
        };
        EncryptManager.prototype.recordEncryptor = function() {
            if (this.encryptor) {
                localStorage.setItem('encryptorAES', this.encryptor.getAESKey());
                localStorage.setItem('encryptorSeq', this.encryptor.getSeq());
                localStorage.setItem('encryptorHash', this.encryptor.getHash());
                localStorage.setItem('encryptorRsa', this.encryptor.getRSAKey());
            }
        };
        EncryptManager.prototype.getEncryptor = function() {
            if (!this.encryptor) {
                this.encryptor = new $.encrypt.encryptor();
                this.encryptor.setAESStringKey(localStorage.getItem('encryptorAES'));
                this.encryptor.setSeq(localStorage.getItem('encryptorSeq'));
                this.encryptor.setHashString(localStorage.getItem('encryptorHash'));
                this.encryptor.setRSAStringKey(localStorage.getItem('encryptorRsa'));
            }
            return this.encryptor;
        };

        EncryptManager.prototype.cleanStorage = function() {
            localStorage.removeItem('encryptorAES');
            localStorage.removeItem('encryptorSeq');
            localStorage.removeItem('encryptorHash');
            localStorage.removeItem('encryptorRsa');
        };
        return new EncryptManager();
    })();
})();


// var encryptor = $.encrypt.encryptManager.genEncryptor(); //生成加密器
// encryptor.genAESKey(); //生成aes密码
// encryptor.setRSAKey("nn", "ee"); //设置rsakey
// encryptor.setSeq("123");   //设置seq
// encryptor.setHash("用户名","密码"); //设置用户名密码
//
//
// //以上都设置完后，可进行加密
// encryptor.AESEncrypt(data);
//
// //返回对象
// // {
// //     data:"加密后数据",
// //     sign: "签名"
// // }
//
//
// // 页面刷新前保存加密器
// $.encrypt.encryptManager.recordEncryptor();
//
// //再次获取加密器
// var encryptor = $.encrypt.encryptManager.getEncryptor();