(function () {
  if (top.GOAHEAD_AES_CRYPT == "y") {
    $.getJSON("goform/stokCfg" + "?" + Math.random(), function (data) {
      sessionStorage.setItem("sign_id", data.sign || "");
    });
  }

  var iv = CryptoJS.enc.Utf8.parse("EU5H62G9ICGRNI43"); //偏移iv
 
  // AES加密
  window.Encrypt = function (word) {
    var key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem("sign_id")); //密钥
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv, 
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  };

  // AES解密
  window.Decrypt = function (word) {
    // var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    // var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem("sign_id")); //密钥
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  };
})();
