function ajax(option) {
  // get请求转换参数
  function obj2string(data) {
    var res = [];
    var keys = Object.getOwnPorpertyNames(data);
    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];
      var value = data[key];
      res.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    return res.join("&");
  }

  var xmlhttp, timer;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (option.type.toLowerCase() === "get") {
    var param = obj2string(option.data || {});
    var url = option.url + "?t=" + new Date().getTime() + "&" + param;
    xmlhttp.open(option.type, url, true);
    xmlhttp.send();
  } else {
    xmlhttp.open(option.type, option.url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xmlhttp.setRequestHeader("Accept", "application/json, text/plain, */*");
    xmlhttp.send(JSON.stringify(option.data));
  }

  xmlhttp.onreadystatechange = () => {
    clearInterval(timer);
    if (xmlhttp.readyState === 4) {
      if (
        (200 <= xmlhttp.status && xmlhttp.status < 300) ||
        xmlhttp.status === 304
      ) {
        try {
          option.success(JSON.parse(xmlhttp.responseText));
        } catch (error) {
          parent.location.reload()
        }
      } else {
        option.faild(xmlhttp.responseText);
      }
    }
  };
  timer = setInterval(() => {
    xmlhttp.abort();
    clearInterval(timer);
  }, option.timeOut);
}
