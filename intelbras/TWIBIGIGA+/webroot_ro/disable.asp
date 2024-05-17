<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <meta name="screen-orientation" content="portrait" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
    <title>Intelbras</title>
    <script src="./lang/b28n.js"></script>
    <script>
        // 设置data-dpr属性，留作的css hack之用
        var dpr = window.devicePixelRatio || 1;
        document.documentElement.setAttribute('data-dpr', dpr);
        // 移动端禁止缩放，兼容ios10及以上无法禁止缩放问题
        window.onload = function () {
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            });
            var lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                var now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
            document.addEventListener('gesturestart', function (event) {
                event.preventDefault();
            });
        }
        B.setTextDomain(["translate"]);
    </script>
</head>

<body>
    <!-- Vue.$mount入口元素 -->
    <div id="app">
    </div>
<script type="text/javascript" src="/pages/disable.js?3788e67008282ff5e7d3"></script></body>

</html>
