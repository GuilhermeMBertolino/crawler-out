!function(o){jQuery.plot.plugins.push({init:function(o){function e(e){i.locked||-1!=i.x&&(i.x=-1,o.triggerRedrawOverlay())}function t(e){if(!i.locked)if(o.getSelection&&o.getSelection())i.x=-1;else{var t=o.offset();i.x=Math.max(0,Math.min(e.pageX-t.left,o.width())),i.y=Math.max(0,Math.min(e.pageY-t.top,o.height())),o.triggerRedrawOverlay()}}var i={x:-1,y:-1,locked:!1};o.setCrosshair=function(e){if(e){var t=o.p2c(e);i.x=Math.max(0,Math.min(t.left,o.width())),i.y=Math.max(0,Math.min(t.top,o.height()))}else i.x=-1;o.triggerRedrawOverlay()},o.clearCrosshair=o.setCrosshair,o.lockCrosshair=function(e){e&&o.setCrosshair(e),i.locked=!0},o.unlockCrosshair=function(){i.locked=!1},o.hooks.bindEvents.push(function(o,i){o.getOptions().crosshair.mode&&(i.mouseout(e),i.mousemove(t))}),o.hooks.drawOverlay.push(function(o,e){var t=o.getOptions().crosshair;if(t.mode){var r=o.getPlotOffset();if(e.save(),e.translate(r.left,r.top),-1!=i.x){var n=o.getOptions().crosshair.lineWidth%2?.5:0;if(e.strokeStyle=t.color,e.lineWidth=t.lineWidth,e.lineJoin="round",e.beginPath(),-1!=t.mode.indexOf("x")){var s=Math.floor(i.x)+n;e.moveTo(s,0),e.lineTo(s,o.height())}if(-1!=t.mode.indexOf("y")){var a=Math.floor(i.y)+n;e.moveTo(0,a),e.lineTo(o.width(),a)}e.stroke()}e.restore()}}),o.hooks.shutdown.push(function(o,i){i.unbind("mouseout",e),i.unbind("mousemove",t)})},options:{crosshair:{mode:null,color:"rgba(170, 0, 0, 0.80)",lineWidth:1}},name:"crosshair",version:"1.0"})}();