(function($){
    'use strict';
    
    function TimeCircle() {};

    TimeCircle.prototype = {
        constructor : TimeCircle,
        instances : [],
        init : function(id, options) {
            var self = this;
            self.id  = $('#'+id);
            self.id.html('<div class="timeCircle"></div>');

            var circleText = "";
            var dayText = "";
            var circle = {};
            var line   = {};
            var path   = {};
            var arc    = {};
            var width = Math.floor($('#mainPhone').innerWidth() * 0.81);
            var selDiv = Math.floor(width/3);
            var selDivLeft = Math.floor(selDiv*0.8);
            var selDivTop  = Math.floor(selDiv*0.9);

            //circle.sw = Math.floor(width/35);
            circle.sw = 7;
            circle.r  = Math.floor(width/2 - circle.sw);
            circle.x0 = circle.r + circle.sw;
            circle.y0 = circle.r + circle.sw;
            
            var clockNumOffset = 2*circle.sw;

            line.r  = circle.r + circle.sw/2;
            //line.sw = circle.sw/2;
            line.sw = 2;
            line.l1 = {
                x1 : circle.x0,
                y1 : circle.y0 - line.r,
                x2 : circle.x0,
                y2 : circle.y0 + line.r,
                m  : 12,
                n  : 6,
                xm : function() {
                    return this.x1 - 5*line.sw;
                },
                ym : function() {
                    return this.y1 + clockNumOffset - line.sw;
                },
                xn : function() {
                    return this.x2 - 2*line.sw;
                },
                yn : function() {
                    return this.y2 - 2*clockNumOffset - 3*line.sw;
                }
            };
            line.l2 = {
                x1 : circle.x0 + (line.r/2),
                y1 : circle.y0 - Math.ceil((Math.cos(Math.PI/6)*line.r)),
                x2 : circle.x0 - (line.r/2),
                y2 : circle.y0 + Math.ceil((Math.cos(Math.PI/6)*line.r)),
                m  : 1,
                n  : 7,
                xm : function() {
                    return this.x1 - clockNumOffset - 2*line.sw;
                },
                ym : function() {
                    return this.y1 + (clockNumOffset-2*line.sw)*Math.cos(Math.PI/6);
                },
                xn : function() {
                    return this.x2 + clockNumOffset/2 + line.sw;
                },
                yn : function() {
                    return this.y2 - 2*clockNumOffset*Math.cos(Math.PI/6) - 3*line.sw;
                }
            };
            line.l3 = {
                x1 : circle.x0 + Math.ceil((Math.cos(Math.PI/6)*line.r)),
                y1 : circle.y0 - (line.r/2),
                x2 : circle.x0 - Math.ceil((Math.cos(Math.PI/6)*line.r)),
                y2 : circle.y0 + (line.r/2),
                m  : 2,
                n  : 8,
                xm : function() {
                    return this.x1 - 2*clockNumOffset*Math.cos(Math.PI/6) - 2*line.sw;
                },
                ym : function() {
                    return this.y1 + clockNumOffset/2 - 4*line.sw;
                },
                xn : function() {
                    return this.x2 + clockNumOffset*Math.cos(Math.PI/6) + 2*line.sw;
                },
                yn : function() {
                    return this.y2 - clockNumOffset - 4*line.sw;
                }
            };
            line.l4 = {
                x1 : circle.x0 + line.r,
                y1 : circle.y0,
                x2 : circle.x0 - line.r,
                y2 : circle.y0,
                m  : 3,
                n  : 9,
                xm : function() {
                    return this.x1 - 2*clockNumOffset;
                },
                ym : function() {
                    return this.y1 - 5*line.sw;
                },
                xn : function() {
                    return this.x2 + clockNumOffset + 2*line.sw;
                },
                yn : function() {
                    return this.y2 - 6*line.sw;
                }
            };
            line.l5 = {
                x1 : circle.x0 + Math.ceil((Math.cos(Math.PI/6)*line.r)),
                y1 : circle.y0 + (line.r/2),
                x2 : circle.x0 - Math.ceil((Math.cos(Math.PI/6)*line.r)),
                y2 : circle.y0 - (line.r/2),
                m  : 4,
                n  : 10,
                xm : function() {
                    return this.x1 - 2*clockNumOffset*Math.cos(Math.PI/6);
                },
                ym : function() {
                    return this.y1 - clockNumOffset - 4*line.sw;
                },
                xn : function() {
                    return this.x2 + clockNumOffset*Math.cos(Math.PI/6);
                },
                yn : function() {
                    return this.y2 + clockNumOffset/2 - 2*line.sw;
                }
            };
            line.l6 = {
                x1 : circle.x0 + (line.r/2),
                y1 : circle.y0 + Math.ceil((Math.cos(Math.PI/6)*line.r)),
                x2 : circle.x0 - (line.r/2),
                y2 : circle.y0 - Math.ceil((Math.cos(Math.PI/6)*line.r)),
                m  : 5,
                n  : 11,
                xm : function() {
                    return this.x1 - clockNumOffset - line.sw;
                },
                ym : function() {
                    return this.y1 - 2*clockNumOffset*Math.cos(Math.PI/6) - 3*line.sw;
                },
                xn : function() {
                    return this.x2 + clockNumOffset/2 - line.sw;
                },
                yn : function() {
                    return this.y2 + clockNumOffset*Math.cos(Math.PI/6) -line.sw;
                }
            };

            path.p1  = "M"+circle.x0+" "+circle.y0+" L"+line.l1.x1+" "+line.l1.y1+" A"+line.r+" "+line.r+" 0 0 1 "+line.l2.x1+" "+line.l2.y1+" L"+circle.x0+" "+circle.y0;
            path.p2  = "M"+circle.x0+" "+circle.y0+" L"+line.l2.x1+" "+line.l2.y1+" A"+line.r+" "+line.r+" 0 0 1 "+line.l3.x1+" "+line.l3.y1+" L"+circle.x0+" "+circle.y0;
            path.p3  = "M"+circle.x0+" "+circle.y0+" L"+line.l3.x1+" "+line.l3.y1+" A"+line.r+" "+line.r+" 0 0 1 "+line.l4.x1+" "+line.l4.y1+" L"+circle.x0+" "+circle.y0;
            path.p4  = "M"+circle.x0+" "+circle.y0+" L"+line.l4.x1+" "+line.l4.y1+" A"+line.r+" "+line.r+" 0 0 1 "+line.l5.x1+" "+line.l5.y1+" L"+circle.x0+" "+circle.y0;
            path.p5  = "M"+circle.x0+" "+circle.y0+" L"+line.l5.x1+" "+line.l5.y1+" A"+line.r+" "+line.r+" 0 0 1 "+line.l6.x1+" "+line.l6.y1+" L"+circle.x0+" "+circle.y0;
            path.p6  = "M"+circle.x0+" "+circle.y0+" L"+line.l6.x1+" "+line.l6.y1+" A"+line.r+" "+line.r+" 0 0 1 "+line.l1.x2+" "+line.l1.y2+" L"+circle.x0+" "+circle.y0;
            path.p7  = "M"+circle.x0+" "+circle.y0+" L"+line.l1.x2+" "+line.l1.y2+" A"+line.r+" "+line.r+" 0 0 1 "+line.l2.x2+" "+line.l2.y2+" L"+circle.x0+" "+circle.y0;
            path.p8  = "M"+circle.x0+" "+circle.y0+" L"+line.l2.x2+" "+line.l2.y2+" A"+line.r+" "+line.r+" 0 0 1 "+line.l3.x2+" "+line.l3.y2+" L"+circle.x0+" "+circle.y0;
            path.p9  = "M"+circle.x0+" "+circle.y0+" L"+line.l3.x2+" "+line.l3.y2+" A"+line.r+" "+line.r+" 0 0 1 "+line.l4.x2+" "+line.l4.y2+" L"+circle.x0+" "+circle.y0;
            path.p10 = "M"+circle.x0+" "+circle.y0+" L"+line.l4.x2+" "+line.l4.y2+" A"+line.r+" "+line.r+" 0 0 1 "+line.l5.x2+" "+line.l5.y2+" L"+circle.x0+" "+circle.y0;
            path.p11 = "M"+circle.x0+" "+circle.y0+" L"+line.l5.x2+" "+line.l5.y2+" A"+line.r+" "+line.r+" 0 0 1 "+line.l6.x2+" "+line.l6.y2+" L"+circle.x0+" "+circle.y0;
            path.p12 = "M"+circle.x0+" "+circle.y0+" L"+line.l6.x2+" "+line.l6.y2+" A"+line.r+" "+line.r+" 0 0 1 "+line.l1.x1+" "+line.l1.y1+" L"+circle.x0+" "+circle.y0;

            arc.r = line.r - circle.sw;
            arc.cosCircleSW  = Math.ceil((Math.cos(Math.PI/6)*circle.sw)/2);
            arc.sinCircleSW  = Math.ceil((circle.sw)/4);
            arc.cosLineSW    = Math.ceil((Math.cos(Math.PI/6)*line.sw)/2);
            arc.sinLineSW    = Math.ceil((line.sw)/4);
            arc.halfCircleSW = Math.ceil((circle.sw)/2);
            arc.halfLineSW   = Math.ceil((line.sw)/2);

            arc.a1 = "M"+(line.l1.x1+arc.halfLineSW)+" "+(line.l1.y1+arc.halfCircleSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l2.x1-arc.sinCircleSW-arc.cosLineSW)+" "+(line.l2.y1+arc.cosCircleSW-arc.sinLineSW);
            arc.a2 = "M"+(line.l2.x1-arc.sinCircleSW+arc.cosLineSW)+" "+(line.l2.y1+arc.cosCircleSW+arc.sinLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l3.x1-arc.cosCircleSW-arc.sinLineSW)+" "+(line.l3.y1+arc.sinCircleSW-arc.cosLineSW);
            arc.a3 = "M"+(line.l3.x1-arc.cosCircleSW+arc.sinLineSW)+" "+(line.l3.y1+arc.sinCircleSW+arc.cosLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l4.x1-arc.halfCircleSW)+" "+(line.l4.y1-arc.halfLineSW);
            
            arc.a4 = "M"+(line.l4.x1-arc.halfCircleSW)+" "+(line.l4.y1+arc.halfLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l5.x1-arc.cosCircleSW+arc.sinLineSW)+" "+(line.l5.y1-arc.sinCircleSW-arc.cosLineSW);
            arc.a5 = "M"+(line.l5.x1-arc.cosCircleSW-arc.sinLineSW)+" "+(line.l5.y1-arc.sinCircleSW+arc.cosLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l6.x1-arc.sinCircleSW+arc.cosLineSW)+" "+(line.l6.y1-arc.cosCircleSW-arc.sinLineSW);
            arc.a6 = "M"+(line.l6.x1-arc.sinCircleSW-arc.cosLineSW)+" "+(line.l6.y1-arc.cosCircleSW+arc.sinLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l1.x2+arc.halfLineSW)+" "+(line.l1.y2-arc.halfCircleSW);
            
            arc.a7 = "M"+(line.l1.x2-arc.halfLineSW)+" "+(line.l1.y2-arc.halfCircleSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l2.x2+arc.sinCircleSW+arc.cosLineSW)+" "+(line.l2.y2-arc.cosCircleSW+arc.sinLineSW);
            arc.a8 = "M"+(line.l2.x2+arc.sinCircleSW-arc.cosLineSW)+" "+(line.l2.y2-arc.cosCircleSW-arc.sinLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l3.x2+arc.cosCircleSW+arc.sinLineSW)+" "+(line.l3.y2-arc.sinCircleSW+arc.cosLineSW);
            arc.a9 = "M"+(line.l3.x2+arc.cosCircleSW-arc.sinLineSW)+" "+(line.l3.y2-arc.sinCircleSW-arc.cosLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l4.x2+arc.halfCircleSW)+" "+(line.l4.y2+arc.halfLineSW);
            
            arc.a10 = "M"+(line.l4.x2+arc.halfCircleSW)+" "+(line.l4.y2-arc.halfLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l5.x2+arc.cosCircleSW-arc.sinLineSW)+" "+(line.l5.y2+arc.sinCircleSW+arc.cosLineSW);
            arc.a11 = "M"+(line.l5.x2+arc.cosCircleSW+arc.sinLineSW)+" "+(line.l5.y2+arc.sinCircleSW-arc.cosLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l6.x2+arc.sinCircleSW-arc.cosLineSW)+" "+(line.l6.y2+arc.cosCircleSW+arc.sinLineSW);
            arc.a12 = "M"+(line.l6.x2+arc.sinCircleSW+arc.cosLineSW)+" "+(line.l6.y2+arc.cosCircleSW-arc.sinLineSW)+" A"+arc.r+" "+arc.r+" 0 0 1 "+(line.l1.x1-arc.halfLineSW)+" "+(line.l1.y1+arc.halfCircleSW);

            circleText += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg">'+
                self.circle(circle.x0, circle.y0, circle.r, circle.sw)+
                self.line(line.l1, line.sw)+
                self.line(line.l2, line.sw)+
                self.line(line.l3, line.sw)+
                self.line(line.l4, line.sw)+
                self.line(line.l5, line.sw)+
                self.line(line.l6, line.sw)+
                self.arc(arc.a1, circle.sw, 0)+self.arc(arc.a2, circle.sw, 1)+self.arc(arc.a3, circle.sw, 2)+
                self.arc(arc.a4, circle.sw, 3)+self.arc(arc.a5, circle.sw, 4)+self.arc(arc.a6, circle.sw, 5)+
                self.arc(arc.a7, circle.sw, 6)+self.arc(arc.a8, circle.sw, 7)+self.arc(arc.a9, circle.sw, 8)+
                self.arc(arc.a10, circle.sw, 9)+self.arc(arc.a11, circle.sw, 10)+self.arc(arc.a12, circle.sw, 11)+
                '</svg>'+
                self.selectedNum(selDiv, selDivLeft, selDivTop);
            circleText += self.clockNumber(line.l1) + self.clockNumber(line.l2) + self.clockNumber(line.l3) +
                self.clockNumber(line.l4) + self.clockNumber(line.l5) + self.clockNumber(line.l6);
            circleText += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg">'+
                self.path(path.p1, 0)+self.path(path.p2, 1)+self.path(path.p3, 2)+
                self.path(path.p4, 3)+self.path(path.p5, 4)+self.path(path.p6, 5)+
                self.path(path.p7, 6)+self.path(path.p8, 7)+self.path(path.p9, 8)+
                self.path(path.p10, 9)+self.path(path.p11, 10)+self.path(path.p12, 11)+
                '</svg>';
            circleText += '<div data-type="am" class="time-am-pm">'+
                '<span data-type="am" class="time-m time-am time-m-selected">AM</span>'+
                '<span data-type="pm" class="time-m time-pm">PM</span></div>';
            dayText += '<div class="time-day-select" data-type="sun"><div>'+
                '<div data-type="sun" class="time-week-day time-day-selected">'+$.tpLang.s_str.sun+'</div>'+
                '<div data-type="mon" class="time-week-day">'+$.tpLang.s_str.mon+'</div>'+
                '<div data-type="tue" class="time-week-day">'+$.tpLang.s_str.tues+'</div>'+
                '<div data-type="wed" class="time-week-day">'+$.tpLang.s_str.wed+'</div>'+
                '<div data-type="thu" class="time-week-day">'+$.tpLang.s_str.thur+'</div>'+
                '<div data-type="fri" class="time-week-day">'+$.tpLang.s_str.fri+'</div>'+
                '<div data-type="sat" class="time-week-day">'+$.tpLang.s_str.sat+'</div>'+
                '</div></div>';

            self.id.find(".timeCircle").html(circleText);
            self.id.append(dayText);

            if (options){
                self.id.data("schedule", options);
            }

            self.id.find(".time-path").on("click", function(){
                var a = self.id.find(".time-arc").eq(parseInt($(this).attr("data-arc")));
                var p = /\stime-arc-hide/;
                if (p.test(a.attr("class"))) {
                    a.attr("class", a.attr("class").replace(p, ''));
                } else {
                    a.attr("class", a.attr("class")+" time-arc-hide");
                }

                self.save(self);
                self.refresh(self);
            });
            self.id.on("click", ".time-m", function(){
                self.save(self);
                if (!$(this).hasClass('time-m-selected')) {
                    $(this).addClass('time-m-selected');
                    $(this).siblings('.time-m').eq(0).removeClass('time-m-selected');
                }
                self.id.find(".time-am-pm").attr("data-type", $(this).attr("data-type"));
                self.refresh(self);
            });
            self.id.on("click", ".time-week-day", function() {
                self.save(self);
                if (!$(this).hasClass('time-day-selected')) {
                    self.id.find(".time-week-day").removeClass('time-day-selected');
                    $(this).addClass('time-day-selected');
                }
                self.id.find(".time-day-select").attr("data-type", $(this).attr("data-type"));
                self.refresh(self);
            });
        },
        save : function(self) {
            var tempNum = 0;
            var data = self.id.data("schedule");
            var day = self.id.find(".time-day-select").eq(0).attr("data-type");
            var t = self.id.find(".time-am-pm").eq(0).attr("data-type");

            self.id.find(".time-arc:not(.time-arc-hide)").each(function() {
                var n = parseInt($(this).attr('data-arc'));
                if (t === 'pm') {
                    n += 12;
                }
                tempNum += Math.pow(2, n);
            });
            
            if (data) {
                if (t === 'am') {
                    data[day] = (data[day] & (Math.pow(2, 24) - Math.pow(2, 12))) + tempNum;
                } else {
                    data[day] = (data[day] & (Math.pow(2, 12) - 1)) + tempNum;
                }
            } else {
                data = {sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0};
                data[day] = tempNum;
            }
            self.id.data("schedule", data);
        },
        circle : function(cx, cy, r, sw) {
            return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke-width="'+sw+'" class="time-circle" />';
        },
        line : function(l, sw) {
            return '<line x1="'+l.x1+'" y1="'+l.y1+'" x2="'+l.x2+'" y2="'+l.y2+'" stroke-width="'+sw+'" class="time-line" />';
        },
        path : function(d, arc) {
            return '<path d="'+d+'" class="time-path" data-arc="'+arc+'"  />';
        },
        arc : function(d, sw, num) {
            return '<path d="'+d+'" stroke-width="'+sw+'" class="time-arc time-arc-hide" data-arc="'+num+'" />';
        },
        selectedNum : function(selDiv, selDivLeft, selDivTop) {
            return '<div class="time-selected-area" style="height:'+selDiv+'px;top:'+selDivTop+'px;">'+
                '<div class="time-selected-wrapper">'+
                '<span class="time-selected-num" style="font-size:'+(selDiv-10)+'px;">0</span>'+
                '<span class="time-selected-h" style="font-size:'+(selDiv-60)+'px;">h</span></div></div>';
        },
        clockNumber : function(l) {
            return '<span class="time-clock-num" style="left:'+l.xm()+'px;top:'+l.ym()+'px;">'+l.m+'</span>'+
                '<span class="time-clock-num" style="left:'+l.xn()+'px;top:'+l.yn()+'px;">'+l.n+'</span>';
        },
        getData : function(data) {
            var systemData = {sunAm: 0, sunPm: 0, monAm: 0, monPm: 0, tueAm: 0, tuePm: 0, wedAm: 0, wedPm: 0, thuAm: 0, thuPm: 0, friAm: 0, friPm: 0, satAm: 0, satPm: 0};
            var day, i;
            var tagAm, tagPm;
            if (data) {
                for (day in data) {
                    for (i = 0; i < 12; i++) {
                        tagAm = data[day] & Math.pow(2, i);
                        tagPm = data[day] & Math.pow(2, i + 12);
                        systemData[day + 'Am'] += tagAm === 0 ? 0 : (Math.pow(2, i * 2) + Math.pow(2, i * 2 + 1));
                        systemData[day + 'Pm'] += tagPm === 0 ? 0 : (Math.pow(2, i * 2) + Math.pow(2, i * 2 + 1));
                    }
                }
            }
            return systemData;
        },
        setData : function(data) {
            var localData = {sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0};
            var day, i;
            var tagAm, tagPm, am, pm;

            if (data) {
                for (day in localData) {
                    for (i = 0; i < 24; i += 2) {
                        tagAm = data[day + 'Am'] & Math.pow(2, i);
                        tagPm = data[day + 'Pm'] & Math.pow(2, i);
                        am = tagAm === 0 ? 0 : Math.pow(2, i / 2);
                        pm = tagPm === 0 ? 0 : Math.pow(2, i / 2 + 12);
                        localData[day] += (am + pm);
                    }
                }
            }
            return localData;
        },
        destory : function() {
            var self = this;
            $(self).off();
            delete Object.getPrototypeOf(self).instances[self.id];
            $(self).removeData('timeCircle');
        },
        refresh : function(self) {
            var data = self.id.data('schedule');
            if (!data) {
                data = this.setData();
            }
            var day = self.id.find(".time-day-select").attr("data-type");
            var num = parseInt(data[day]);
            var tag, node, len;
            var patten = /\stime-arc-hide/;
            
            self.id.find(".time-arc").each(function(){
                if (!patten.test($(this).attr("class"))) {
                    $(this).attr("class", $(this).attr("class")+" time-arc-hide");
                }
            });
            if (self.id.find(".time-am-pm").attr("data-type") === 'am') {
                for (var i = 0; i < 12; i++) {
                    tag = num & Math.pow(2, i);
                    if (tag) {
                        node = self.id.find(".time-arc[data-arc="+i+"]");
                        node.attr("class", node.attr("class").replace(patten, ''));
                    }
                }
            } else {
                for (var i = 0; i < 12; i++) {
                    tag = num & Math.pow(2, i+12);
                    if (tag) {
                        node = self.id.find(".time-arc[data-arc="+i+"]");
                        node.attr("class", node.attr("class").replace(patten, ''));
                    }
                }
            }
            
            len = self.id.find(".time-arc:not(.time-arc-hide)").length;
            self.id.find(".time-selected-num").eq(0).text(len);
        }
    };

    $.fn.timeCircle = function(options, d) {
        var data = false;
        this.each(function() {
            var self = {};
            self.id  = $('#'+this.id);
            var timecircle = $(this).data("timeCircle");
            if (!timecircle) {
                var instance = new TimeCircle();
                self.id.data("timeCircle", instance);
                instance.instances[this.id] = instance;
                instance.init(this.id, options);
            } else if (options === 'destory' && timecircle) {
                timecircle.destory();
            } else if (options === 'data') {
                data = timecircle.getData($(this).data("schedule"));
            } else if (options === 'set') {
                self.id.data('schedule', timecircle.setData(d));
                self.id.data("timeCircle").refresh(self);
            } else {
                self.id.data("timeCircle").refresh(self);
            }
        });
        return data;
    };
})(jQuery);