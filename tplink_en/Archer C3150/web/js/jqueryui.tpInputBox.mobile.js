/*
    example html:
        <input id="testInputBox" type="text" value="a sentence" />

    example js:
        function testw (){
            if (this.inputBoxMobile('option', 'value') !== '123') {
                return false;
            }
            else {
                return true;
            }
        }
        function testw2 (){
            return false;
        }

        function testw3 (){
            return false;
        }

        $('#testInputBox').inputBoxMobile({
            'disabled': true, 
            'value': '123',
            'title': 'input title',
            'following': 'bytes', //text after inputBox
            'notice': 'notice information', // text in gray, notice information
            'warnings': {
                //the first line is text in red, warning information
                'Please input "123".': testw,
                'testWarning1 1111111111 11111111111 111 12222 2222222 222222222222 22222222 222212': testw2
            }
        });
*/

$.widget('tp.inputBoxMobile', {
    options: {
        value: null,
        ipOrMac: false,
        disabled: null,
        title: null,
        following: null,
        notice: null,
        warnings: null,
        placeholder: null
    },

    _create: function() {
        this.basicClass = 'inputBox-mobile';
        this.parentClass = this.basicClass + '-div';
        this.titleClass = this.basicClass + '-label';
        this.noticeClass = this.basicClass + '-notice';
        this.followingClass = this.basicClass + '-following';
        this.warningsClass = this.basicClass + '-warning';

        var inputBox = $(this.element).addClass(this.basicClass).wrap('<div class="' + this.parentClass + '"></div>');
        this.parentDiv = inputBox.parent();
        var parentDiv = this.parentDiv;

        if (this.options.ipOrMac == 'ip') {
            var id = $(this.element).attr('id');
            var container = 'inputBox-container-'+id;
            $(this.element).css('display', 'none').before('<div class="inputBox-ip-container" id="'+container+'"></div>');
            for (var i = 0; i < 4; i++) {
                $('#'+container).append('<input maxlength="3" type="text" class="inputBox-mobile inputBox-ip" >');
                (i !== 3) && $('#'+container).append('<span>.</span>');
            }

            var that = this;
            $('#'+container).find('.inputBox-ip').bind('blur' + this.eventNamespace, function(e) {
                    that.checkValue();
                })
                .bind('focus' + this.eventNamespace, function(e) {
                    that.hideWarnings();
                }).bind('keyup' + this.eventNamespace, function(e) {
                    var next = false;
                    if (e.keyCode == 190 || e.keyCode == 110 || $(this).val().substr(-1, 1) == '.') {
                        var newVal = $(this).val().replace(/\./g, '');
                        $(this).val(newVal);
                        if (newVal) {
                            next = $(this).nextAll('input[type=text]').eq(0);
                        } else {
                            next = false;
                        }
                    } else if ($(this).val().length == 3) {
                        next = $(this).nextAll('input[type=text]').eq(0);
                    } else if (e.keyCode == 8) {
                        if ($.trim($(this).val()) == '') {
                            next = $(this).prevAll('input[type=text]').eq(0);
                        }
                    }
                    if (next && next.length > 0) {
                        $(this).blur();
                        $(next).focus().select();
                    }
                });

        } else if (this.options.ipOrMac == 'mac') {
            var id = $(this.element).attr('id');
            var container = 'inputBox-container-'+id;
            $(this.element).css('display', 'none').before('<div class="inputBox-mac-container" id="'+container+'"></div>');
            for (var i = 0; i < 6; i++) {
                $('#'+container).append('<input maxlength="2" type="text" class="inputBox-mobile inputBox-mac" >');
                (i !== 5) && $('#'+container).append('<span></span>');
            }


            var that = this;
            $('#'+container).find('.inputBox-mac').bind('blur' + this.eventNamespace, function(e) {
                    that.checkValue();
                })
                .bind('focus' + this.eventNamespace, function(e) {
                    that.hideWarnings();
                }).bind('keyup' + this.eventNamespace, function(e) {
                    var next = false;
                    if (e.keyCode == 189 || e.keyCode == 101) {
                        var newVal = $(this).val().replace(/\-/g, '');
                        $(this).val(newVal);
                        if (newVal) {
                            next = $(this).nextAll('input[type=text]').eq(0);
                        } else {
                            next = false;
                        }
                    } else if ($(this).val().length == 2) {
                        next = $(this).nextAll('input[type=text]').eq(0);
                    } else if (e.keyCode == 8) {
                        if ($.trim($(this).val()) == '') {
                            next = $(this).prevAll('input[type=text]').eq(0);
                        }
                    }
                    if (next && next.length > 0) {
                        $(this).blur();
                        $(next).focus().select();
                    }
                });
        } else {
            var that = this;
            inputBox.bind('blur' + this.eventNamespace, function(e) {
                    that.checkValue();
                })
                .bind('focus' + this.eventNamespace, function(e) {
                    that.hideWarnings();
                });
        }

        //options.value
        if (this.options.value == null) {
            this.options.value = this._getValue();
        }
        //options.disabled
        if (this.options.disabled == null) {
            this.options.disabled = inputBox.is(':disabled');
        }
        //options.placeholder
        if (this.options.placeholder == null) {
            if (inputBox.prop('placeholder')) {
                this.options.placeholder = inputBox.prop('placeholder');
            }
        }

        //options.warnings
        var warnings = this.options.warnings;
        if (warnings !== null) {
            for (i in warnings) {
                if (typeof warnings[i].func !== 'function') {
                    warnings = null;
                }
            }
        }
    },

    _init: function() {
        this.refresh();
    },

    checkValue: function() {
        var inputBox = $(this.element);
        var parentDiv = this.parentDiv;
        this.options.value = this._getValue();
        if (this.options.warnings !== null) {
            var index = 0;
            for (var i in this.options.warnings) {
                var judging = (this.options.warnings[i].func).call(inputBox);
                if (judging !== true) {
                    if (typeof judging == 'string') {
                        this.options.warnings[i].text = judging;
                    }
                    inputBox.addClass('warning-red');
                    var parentDiv_temp = parentDiv;
                    if (inputBox.hasClass('grow-part')) {
                        parentDiv_temp = inputBox.parents('.flexible-box').last().parent();
                    }
                    var warningDiv = parentDiv_temp.find('.' + this.warningsClass + '.' + inputBox.prop('id') + 'warn' + index).first();
                    if (warningDiv.length > 0) {
                        $(warningDiv).find('.text').html(this.options.warnings[i].text);
                        $(warningDiv).show();
                    } else {
                        if (this.options.warnings[i].text !== '') {
                            warningDiv = $('<div class="'+inputBox.prop('id')+'warn' + index + ' ' + this.warningsClass + '">' +
                            '<span class="icon sprite b-error-alert"></span><span class="text">' + (this.options.warnings[i].text) + '</span>' + '</div>');
                            if (inputBox.hasClass('grow-part')) {
                                (inputBox.parents('.flexible-box').last()).after(warningDiv);
                            }
                            else {
                                if (this.options.following === null || this.options.following === '' ) {
                                    inputBox.after(warningDiv);
                                } else {
                                    var followTmp = parentDiv.find('.' + this.followingClass + '-div').first();
                                    followTmp.after(warningDiv);
                                }                                
                            }
                        }
                    }
                    return false;
                }
                else {
                    var parentDiv_temp = parentDiv;
                    if (inputBox.hasClass('grow-part')) {
                        parentDiv_temp = inputBox.parents('.flexible-box').last().parent();
                    }
                    var warningDiv = parentDiv_temp.find('.' + this.warningsClass + '.'+inputBox.prop('id')+'warn' + index).first();
                    if (warningDiv.length > 0) {
                        $(warningDiv).hide();
                    }
                    inputBox.removeClass('warning-red');
                }
                index++;
            }
        } else {
            return true;
        }
    },

    _setValue: function(val) {
        var inputBox = $(this.element);
        var id = '#inputBox-container-' + inputBox.attr('id');

        if (this.options.ipOrMac == 'ip') {
            if (val == '') {
                $.each($(id).find('.inputBox-ip'), function(index) {
                    $(this).prop('value', '');
                });
            } else {
                var vals = val.split('.');
                $.each($(id).find('.inputBox-ip'), function(index) {
                    $(this).prop('value', vals[index]);
                });
            }
        } else if (this.options.ipOrMac == 'mac') {
            if (val == '') {
                $.each($(id).find('.inputBox-mac'), function(index) {
                    $(this).prop('value', '');
                });
            } else {
                var vals = val.split(':');
                $.each($(id).find('.inputBox-mac'), function(index) {
                    $(this).prop('value', vals[index]);
                });
            }
        } else {
            inputBox.prop('value', val);
        }
    },

    _getValue: function() {
        var val = [];
        var value = '';
        var flag = false;
        var inputBox = $(this.element);
        var id = '#inputBox-container-' + inputBox.attr('id');

        if (this.options.ipOrMac == 'ip') {
            $.each($(id).find('.inputBox-ip'), function(index) {
                if ($.trim($(this).prop('value')) != '') {
                    flag = true;
                    val.push($(this).prop('value'));
                }
            });
            value = val.join('.');
        } else if (this.options.ipOrMac == 'mac') {
            $.each($(id).find('.inputBox-mac'), function(index) {
                if ($.trim($(this).prop('value')) != '') {
                    flag = true;
                    val.push($(this).prop('value'));
                }
            });
            value = val.join(':');
        } else {
            flag = true;
            value = inputBox.prop('value');
        }

        value = flag ? value : '';
        inputBox.prop('value', value);
        return value;
    },

    _setDisable: function(status) {
        var inputBox = $(this.element);
        var parentDiv = this.parentDiv;

        if (status == true) {
            parentDiv.addClass('disabled');
        } else {
            parentDiv.removeClass('disabled');
        }
        $(parentDiv).find('input').prop('disabled', status);
    },

    refresh: function() {
        var inputBox = $(this.element);
        var parentDiv = this.parentDiv;

        //options.value
        if (this.options.value !== null) {
            this._setValue(this.options.value);
        }
        //options.disabled
        this._setDisable(this.options.disabled);

        //options.placeholder
        if (this.options.placeholder !== null && this.options.placeholder !== '') {
            inputBox.prop('placeholder', this.options.placeholder);
        }
        else {
            inputBox.prop('placeholder', ' ');
        }

        if (this.options.title !== null) {
            if ((parentDiv.find('.' + this.titleClass)).length == 0) {
                var label = $('<label for="' + inputBox.prop('id') + '">' + this.options.title + '</label>');
                parentDiv.prepend(label);
                label.wrap('<div class="' + this.titleClass + '"></div>');
            } else {
                (parentDiv.find('.' + this.titleClass).find('label').first()).html(this.options.title);
            }
        } else {
            (parentDiv.find('.' + this.titleClass)).remove();
        }
        //options.notice
        if (this.options.notice !== null) {
            if ((parentDiv.find('.' + this.noticeClass)).length == 0) {
                var notice = $('<span>' + this.options.notice + '</span>');
                parentDiv.append(notice);
                notice.wrap('<div class="' + this.noticeClass + '"></div>');
            } else {
                (parentDiv.find('.' + this.noticeClass).find('span').first()).html(this.options.notice);
            }
        } else {
            (parentDiv.find('.' + this.noticeClass)).remove();
        }
        //options.following
        if (this.options.following !== null) {
            if ((parentDiv.find('.' + this.followingClass + '-div')).length == 0) {
                inputBox.wrap('<div class="' + this.followingClass + '-div"></div>');
                var following = '';
                if (typeof this.options.following == 'string') {
                    if (this.options.following.indexOf('</') < 0 && this.options.following.indexOf('/>') < 0) {
                        following = $('<span>' + this.options.following + '</span>');
                    } else {
                        following = $(this.options.following);
                    }
                } else {
                    following = this.options.following;
                }
                inputBox.after(following);
                var followingSize = '';
                if (following.attr('class') != null && following.attr('class') != undefined) {
                    followingSize = (following.attr('class')).match(/sz-\w*/); //size
                }
                following.wrap('<div class="' + this.followingClass + ' ' + followingSize + '"></div>');
            }
        } else {
            if (parentDiv.find('.' + this.followingClass + '-div')) {
                (parentDiv.find('.' + this.followingClass + '-div')).replaceWith(inputBox);
            }
        }
    },

    hideWarnings: function() {
        var parentDiv_temp = this.parentDiv;
        var inputBox = this.element;
        if (inputBox.hasClass('grow-part')) {
            parentDiv_temp = inputBox.parents('.flexible-box').last().parent();
        }
        var warningDivs = parentDiv_temp.find('.' + this.warningsClass);
        $.each(warningDivs, function() {
            $(this).hide();
        })
        inputBox.removeClass('warning-red');
    },

    _setOption: function(key, value) {
        var options = this.options;

        if (key === 'warnings') {
            if (value !== null) {
                for (i in value) {
                    if (typeof(value[i].func) !== 'function') {
                        value = null;
                    }
                }
            }
            (this.parentDiv.find('.' + this.warningsClass)).remove();
        } else if (key === 'value') {
            this._setValue(value);
        }

        this.options[key] = value;

        this.refresh();
        if (key == 'value') {
            this.checkValue();
        }
        return this;
    },

    _destroy: function() {
        var inputBox = $(this.element).removeClass(this.basicClass)
            .unbind('blur' + this.eventNamespace)
            .unbind('focus' + this.eventNamespace);
        var parentDiv = this.parentDiv;

        // parentDiv.find('.' + this.titleClass).remove();
        parentDiv.replaceWith(inputBox);
    }
});

var inputBoxMobile = $.tp.inputBoxMobile;

$.widget('tp.passwordLevel', {
    options: {
        checkPassword: null,
        disabled: null,
        hasConfirm: null,
        confirmTitle: null,
        nullWarning: null,
        differentWarning: null
    },

    _create: function() {
        this.basicClass = 'password-level';
        var inputTarget = $(this.element);
        var levelDiv =
            $('<div class="' + this.basicClass + '">' + '<span class="low">' + $.tpLang.s_str.low + '</span>' + '<span class="middle">' + $.tpLang.s_str.middle + '</span>' + '<span class="high">' + $.tpLang.s_str.high + '</span></div>');
        var parentDiv = inputTarget.parent();
        levelDiv.appendTo(parentDiv);

        //options.disabled
        if (this.options.disabled == null) {
            this.options.disabled = inputTarget.prop('disabled');
        }

        //options.hasConfirm
        if (this.options.hasConfirm == null) {
            this.options.hasConfirm = (inputTarget.hasClass('has-confirm')) ? true : false;
        }

        if (this.options.confirmTitle == null) {
            this.options.confirmTitle = $.tpLang.s_str.newPwdConfirm;
        }
        if (this.options.nullWarning == null) {
            // this.options.nullWarning = 
        }
        if (this.options.differentWarning == null) {
            // this.options.differentWarning = 
        }


        var that = this;
        inputTarget.bind('keyup' + this.eventNamespace, function(e) {
            var levelTmp;
            if (that.options.checkPassword === null) {
                levelTmp = that.passwordLevel(inputTarget.prop('value'));
            } else {
                var checkFunc = that.options.checkPassword;
                levelTmp = checkFunc.call(inputTarget.prop('value'));
            }
            levelDiv.find('span').removeClass('lighted');
            levelDiv.find('.' + levelTmp).addClass('lighted');
        })
    },

    _init: function() {
        var inputTarget = this.element;
        var options = this.options;
        var parentDiv = $(inputTarget).parent();

        var that = this;
        if (options.hasConfirm == true) {
            this.inputConfirm = $('<input type="password" />');
            parentDiv.after(this.inputConfirm);
            var nullWarning = options.nullWarning;
            var differentWarning = options.differentWarning;
            (this.inputConfirm).inputBoxMobile({
                title: options.confirmTitle,
                disabled: options.disabled,
                warnings: [{
                    func: function() {
                        if (!that.inputConfirm.prop('value')) return false;
                        else return true;
                    },
                    text: nullWarning
                }, {
                    func: function() {
                        if (that.inputConfirm.prop('value') && that.inputConfirm.prop('value') !== inputTarget.prop('value'))
                            return false;
                        else
                            return true;
                    },
                    text: differentWarning
                }]
            });
        }

        this.refresh();
    },

    refresh: function() {
        var levelDiv = ($(this.element).parent()).find('.' + this.basicClass);
        if (this.options.disabled == true) {
            levelDiv.addClass('disabled');
        }
    },

    passwordLevel: function(str) {
        var upperRe = /[A-Z]/;
        var lowerRe = /[a-z]/;
        var digitRe = /\d/;
        var otherRe = /(.[^a-zA-Z0-9])/;

        var hasUpper = 0;
        var hasLower = 0;
        var hasDigit = 0;
        var hasOther = 0;
        var largeLength = 0;

        var level = 0;

        if (upperRe.test(str)) {
            hasUpper = 1;
        } else {
            hasUpper = 0;
        }

        if (lowerRe.test(str)) {
            hasLower = 1;
        } else {
            hasLower = 0;
        }

        if (digitRe.test(str)) {
            hasDigit = 1;
        } else {
            hasDigit = 0;
        }

        if (otherRe.test(str)) {
            hasOther = 1;
        } else {
            hasOther = 0;
        }

        if (str.length > 10) {
            largeLength = 1;
        } else {
            largeLength = 0;
        }

        level = hasUpper + hasLower + hasDigit + largeLength + hasOther;

        if (str.length == 0) {
            return 'none';
        } else if (str.length <= 5) {
            if (level <= 2) {
                return 'low';
            } else if (level == 3 || level == 4) {
                return 'middle';
            }
        } else {
            if (level <= 1) {
                return 'low';
            } else if (level == 2 || level == 3) {
                return 'middle';
            } else if (level >= 4) {
                return 'high';
            }
        }
    },

    _destroy: function() {
        ((this.inputConfirm).inputBoxMobile('destroy')).remove();
        var levelDiv = ($(this.element).parent()).find('.' + this.basicClass);
        levelDiv.remove();
        $(this.element).unbind('keyup' + this.eventNamespace);
    }

});

var passwordLevel = $.tp.passwordLevel;
