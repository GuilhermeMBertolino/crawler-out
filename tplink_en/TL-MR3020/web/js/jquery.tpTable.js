(function($) {
    'use strict';

    function TPTable() {}

    TPTable.prototype = {
        constructor: TPTable,
        instances: [],
        init: function(id, callback) {
            var self = this;
            self.id = id;
            if ($.isFunction(callback)) {
                self.initFunc = callback;
                self.initFunc();
            }

//            setTimeout(function() {self.initSetup(id)}, 100);
            self.initSetup(id);
        },
        initSetup: function(id) {
            var tag;
            var self = this;
            self.$table = $("#" + id);
            self.$table.addClass("pure-table pure-table-bordered");
            self.$table.attr("width", "100%");
            self.$op = self.$table.prev("div.table-op");
            self.$op.find("div.table-btn span").addClass("table-icon");

            self.$refreshIcon = self.$op.find(".refresh-icon");
            tag = self.$refreshIcon.next("label").first().html();
            self.$refreshIcon.wrap("<div class='refresh-icon-wrap inline'></div>");
            self.$refresh = self.$refreshIcon.parent("div.refresh-icon-wrap");
            self.$refresh.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$refreshLabel = self.$refresh.find("label.table-icon-text");
            self.$refresh.next("label").first().remove();

            self.$addIcon = self.$op.find(".add-icon");
            tag = self.$addIcon.next("label").first().html();
            self.$addIcon.wrap("<div class='add-icon-wrap inline'></div>");
            self.$add = self.$addIcon.parent("div.add-icon-wrap");
            self.$add.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$addLabel = self.$add.find("label.table-icon-text");
            self.$add.next("label").first().remove();

            self.$deleteIcon = self.$op.find(".delete-icon");
            tag = self.$deleteIcon.next("label").first().html();
            self.$deleteIcon.wrap("<div class='del-icon-wrap inline'></div>");
            self.$del = self.$deleteIcon.parent("div.del-icon-wrap");
            self.$del.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$delLabel = self.$del.find("label.table-icon-text");
            self.$deleteIcon.next("label").first().css("color", "#c11c66");
            self.$del.next("label").first().remove();

            self.$deleteAllIcon = self.$op.find(".delete-all-icon");
            tag = self.$deleteAllIcon.next("label").first().html();
            self.$deleteAllIcon.wrap("<div class='del-all-icon-wrap inline'></div>");
            self.$delAll = self.$deleteAllIcon.parent("div.del-all-icon-wrap");
            self.$delAll.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$delAllLabel = self.$delAll.find("label.table-icon-text");
            self.$deleteAllIcon.next("label").first().css("color", "#c11c66");
            self.$delAll.next("label").first().remove();

            self.$resetIcon = self.$op.find(".reset-icon");
            tag = self.$resetIcon.next("label").first().html();
            self.$resetIcon.wrap("<div class='reset-icon-wrap inline'></div>");
            self.$reset = self.$resetIcon.parent("div.reset-icon-wrap");
            self.$reset.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$resetLabel = self.$reset.find("label.table-icon-text");
            self.$reset.next("label").first().remove();

            self.$blockIcon = self.$op.find(".block-icon");
            tag = self.$blockIcon.next("label").first().html();
            self.$blockIcon.wrap("<div class='block-icon-wrap inline'></div>");
            self.$block = self.$blockIcon.parent("div.block-icon-wrap");
            self.$block.append("<label class='table-icon-text'>" + tag + "</label>");
            self.$blockLabel = self.$block.find("label.table-icon-text");
            self.$block.next("label").first().remove();

            self.$tableIcon = self.$op.find("span.table-icon");

            self.$selectAll = self.$table.find("thead input[type=checkbox].table-select-all");

            self.$editArea = self.$table.find('tbody>tr.nd');
            self.isEdit = false;

            self.$tableMaskUp = self.$tableMaskUp || $('<div class = "table-mask"></div>').insertAfter(self.$table);
            self.$tableMaskDown = self.$tableMaskDown || $('<div class = "table-mask"></div>').insertAfter(self.$table);

            if ($.isIE === true) {
                self.$table.append('<td style="display: none">ie8hack</td><div class="corner-top-left"></div><div class="corner-top-right"></div><div class="corner-bot-left"></div><div class="corner-bot-right"></div>');
                self.$table.find('tr.nd td').append('<div class="corner-bot-left"></div><div class="corner-bot-right"></div>');
            }
            self.registerHandlers();
        },
        registerHandlers: function() {
            var self = this;
            self.unregisterHandlers();

            self.$refreshIcon.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.refreshIconClick();
            });
            self.$addIcon.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.addIconClick();
            });
            self.$deleteIcon.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                /*self.deleteIconClick();*/
            });
            self.$deleteAllIcon.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                /*self.deleteAllIconClick();*/
            });
            self.$blockIcon.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
            });
            self.$refreshLabel.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.$refreshIcon.click();
            });
            self.$addLabel.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.$addIcon.click();
            });
            self.$delLabel.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.$deleteIcon.click();
            });
            self.$delAllLabel.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.$deleteAllIcon.click();
            });
            self.$resetLabel.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.$resetIcon.click();
            });
            self.$blockLabel.on('click.tpTable', function() {
                if (self.isEdit === true) {
                    return;
                }
                self.$blockIcon.click();
            });
            self.$tableIcon.hover(
                function() {
                    if (self.isEdit === true) {
                        return;
                    }
                    $(this).addClass('span-hover');
                },
                function() {
                    if (self.isEdit === true) {
                        return;
                    }
                    $(this).removeClass('span-hover');
                });

            self.$selectAll.on('click.tpTable', function() {
                var selectOne = self.$table.find('tbody td input.table-select-one');
                var isChecked = !!$(this).prop('data-checked');
                $.each(selectOne, function() {
                    $(this).prop('checked', isChecked).data('tpCheckbox').refresh();
                });
            });

            self.$table.on('click.tpTable', 'tbody input[type=checkbox].table-select-one', function() {
                var isChecked = true;
                $.each(self.$table.find("tbody input[type=checkbox].table-select-one"), function() {
                    $(this).prop('data-checked') || (isChecked = false);
                });

                self.$selectAll.prop('checked', isChecked).data('tpCheckbox').refresh();
            });

//            self.$table.on("click.tpTable", "td.table-content>span.enable-icon", function() {
//                if (self.isEdit === true) {
//                    return;
//                }
//                $(this).removeClass("enable-icon").addClass("disable-icon");
//            });
//
//            self.$table.on("click.tpTable", "td.table-content>span.disable-icon", function() {
//                if (self.isEdit === true) {
//                    return;
//                }
//                $(this).removeClass("disable-icon").addClass("enable-icon");
//            });

            self.$table.on("click.tpTable", "td.table-content>span.edit-modify-icon", function() {
                if (self.isEdit === true) {
                    return;
                }
                var trEdit = $(this).closest('tr');
                self.showEditArea(trEdit);
            });
        },
        unregisterHandlers: function() {
            var self = this;
            self.$table.off('.tpTable');
            self.$refreshIcon.off('.tpTable');
            self.$refreshLabel.off('.tpTable');
            self.$addIcon.off('.tpTable');
            self.$addLabel.off('.tpTable');
            self.$deleteIcon.off('.tpTable');
            self.$delLabel.off('.tpTable');
            self.$deleteAllIcon.off('.tpTable');
            self.$delAllLabel.off('.tpTable');
            self.$resetIcon.off('.tpTable');
            self.$resetLabel.off('.tpTable');
        },
        refreshIconClick: function() {
            var self = this;
            if (self.isEdit) {
                self.hideEditArea();
            }
            var tr = self.$table.find("tbody tr:not(.nd)");

            self.$table.find('input[type=checkbox].table-select-all').prop('checked', false).tpCheckbox();
            tr.remove();
            if (self.initFunc != undefined) {
                self.initFunc();
            }
        },
        hideEditArea: function() {
            var self = this;
            self.isEdit = false;
            if (self.$editArea.length == 0) {
                return;
            }
            //edit row
            var $rowEdit = self.$table.find('.edit-tr');
            $rowEdit.removeClass('edit-tr');
            $rowEdit.find('td:first').removeClass('first-child');
            $rowEdit.find('td:last').removeClass('last-child');

            //edit area
            var $editArea = self.$editArea;
            $editArea.addClass("nd").removeClass("editor-container");

            //previous row of edit row
            self.$table.find('tr.edit-td-top').removeClass('edit-td-top');

            $.unlock();

            //if the table is not empty, remove the empty row
            if (self.$table.find('tbody tr:has(td.table-content)').length > 0) {
                self.$table.find("tbody tr.space-tr").remove();
            }

            self.$tableMaskUp.hide();
            self.$tableMaskDown.hide();
        },
        showEditArea: function($rowEdit) {
            var self = this;
            self.isEdit = true;
            if (self.$editArea.length == 0) {
                return;
            }

            //add border
            $rowEdit.addClass('edit-tr');
            $rowEdit.find('td:first').addClass('first-child');
            $rowEdit.find('td:last').addClass('last-child');

            var editArea = self.$editArea;
            editArea.removeClass("nd").addClass("editor-container").insertAfter($rowEdit);
            editArea.find("div.button-container").addClass("table-btn");

            var trPrev = $rowEdit.prev("tr:not(.nd)");
            if (trPrev.length == 0 && $rowEdit.index() == 0) {
                trPrev = self.$table.find('tr.head');
                trPrev.find('th[colspan=1]').addClass('edit-td-top');
            }
            trPrev.addClass('edit-td-top');

            $.lock();

            //show mask
            var turnpage = 0;
            if (self.$table.nextAll('.table-bottom-pages').length != 0) {
                turnpage = 31;
            }

            self.$tableMaskUp.show().css('top', '0').height(self.$table.find('.editor-container').first().position().top + self.$table.position().top);
            var tmpHeight = self.$table.height() - self.$table.find('.editor-container').first().position().top - editArea.height() + turnpage;
            tmpHeight = tmpHeight > 10 ? tmpHeight : 0;
            self.$tableMaskDown.show().css('bottom', '0').css('top', 'auto').height(tmpHeight);

        },
        addIconClick: function() {
            var self = this;
            self.$table.find("tbody tr.space-tr").remove();
            $.addEmptyBody(self.$table, self.$table.find("thead tr th[colspan=1]").length);

            self.showEditArea(self.$table.find("tbody tr.space-tr"));
        },
        destroy: function() {
            try {
                var self = this;
                self.unregisterHandlers();
                delete Object.getPrototypeOf(self).instances[self.id];
                $(self).removeData('tpTable');
            }catch (e) {
                console.error(e)
            }
        }
    };

    $.fn.tpTable = function(options) {
        this.each(function() {
            var tptable = $(this).data('tpTable');
            if (!tptable && options === 'destroy') {
                return;
            }
            if (!tptable) {
                var instance = new TPTable();
                $(this).data('tpTable', instance);
                instance.instances[this.id] = instance;
                instance.init(this.id, options);
            } else if (options === 'destroy') {
                tptable.destroy();
            } else {
                tptable.refreshIconClick();
            }
        });
    };

    $(function() {
        if (typeof Object.getPrototypeOf !== 'function') {
            if (typeof 'test'.__proto__ === 'object') {
                Object.getPrototypeOf = function(object) {
                    return object.__proto__;
                };
            } else {
                Object.getPrototypeOf = function(object) {
                    return object.constructor.prototype;
                };
            }
        }
    });
})(jQuery);

jQuery.extend({
    tablePages: function(id, size) {
        var $table = $(id);
        var pagerLength;
        if (arguments[2] == null)
            pagerLength = 7;
        else
            pagerLength = arguments[2];

        var currentPage = 0;
        var pageSize = size;

        $table.nextAll(".table-bottom-pages").remove();

        if (($table.find("tbody tr:not(.nd)").length) <= size || $table.find('tr').hasClass('space-tr') || pageSize == 0) {
            return;
        }
        $table.bind("repaginate", function() {
            $table.find("tbody tr:not(.nd)").hide().slice(currentPage * pageSize, (currentPage + 1) * pageSize).show();
            var leftLength = Math.floor((pagerLength - 1) / 2);
            var rightLength = Math.round((pagerLength - 1) / 2);
            $("span[id$=" + prevIconId + "]").show();
            leftDot.remove();
            rightDot.remove();
            var page;
            if (numPages > pagerLength + 2) {
                if (currentPage > leftLength + 1) {
                    leftDot.insertAfter($('#1-' + prevIconId));
                    for (page = 2; page < Math.min(currentPage - leftLength + 1, numPages - pagerLength); page++) {
                        $("#" + page + "-" + prevIconId).hide();
                    }

                }
                if (currentPage < numPages - rightLength - 2) {
                    rightDot.insertBefore($('#' + numPages + '-' + prevIconId));
                    for (page = Math.max(currentPage + rightLength + 2, pagerLength + 2); page < numPages; page++) {
                        $("#" + page + "-" + prevIconId).hide();
                    }
                }
            }
        });
        var numRows = $table.find("tbody tr:not(.nd)").length;
        var numPages = Math.ceil(numRows / pageSize);
        var prevIconId = $.randomId('prev');
        var nextIconId = $.randomId('next');
        var leftDot = $('<span id="' + ("left-" + prevIconId) + '">...</span>');
        var rightDot = $('<span id="' + ("right-" + prevIconId) + '">...</span>');
        var $pager = $("<div class='table-bottom-pages'><span id='" + prevIconId + "' class='page'></span></div>");
        for (var page = 1; page <= numPages; page++) {
            $("<span id='" + (page + "-" + prevIconId) + "'>" + page + "</span>")
                .on("click", {
                    "newPage": page - 1
                }, function(event) {
                    currentPage = event.data["newPage"];
                    if ($(this).hasClass("click-page")) {
                        return;
                    }
                    $(this).siblings("span").removeClass("click-page");
                    $(this).addClass("click-page");
                    $table.trigger("repaginate");
                    if ((currentPage - 1) < 0) {
                        $("#" + prevIconId).addClass('gray');
                        $("#" + nextIconId).removeClass('gray');
                    } else if ((currentPage + 1) >= numPages) {
                        $("#" + nextIconId).addClass('gray');
                        $("#" + prevIconId).removeClass('gray');
                    } else {
                        $("#" + prevIconId).removeClass('gray');
                        $("#" + nextIconId).removeClass('gray');
                    }


                })
                .appendTo($pager);
        }
        var next = $("<span id='" + nextIconId + "' class='page right'></span>");
        $pager.append(next);
        $pager.insertAfter($table);

        $("#" + prevIconId).on("click", function() {
            var $spanBro = $(this).siblings("span");
            var prev = Number($(this).siblings("span.click-page").text()) - 1;
            currentPage = prev - 1;
            if (currentPage < 0) {
                return;
            }
            $spanBro.removeClass("click-page");
            $("#" + prev + "-" + prevIconId).addClass("click-page");
            $table.trigger("repaginate");
            if ((currentPage - 1) < 0) {
                $(this).addClass('gray');
            }
            $("#" + nextIconId).removeClass('gray');
        });

        $("#" + nextIconId).on("click", function() {
            var $spanBro = $(this).siblings("span");
            var next = Number($(this).siblings("span.click-page").text()) + 1;
            currentPage = next - 1;
            if (currentPage >= numPages) {
                return;
            }
            $spanBro.removeClass("click-page");
            $("#" + next + "-" + prevIconId).addClass("click-page");
            $table.trigger("repaginate");
            if ((currentPage + 1) >= numPages) {
                $(this).addClass('gray');
            }
            $("#" + prevIconId).removeClass('gray');
        });

        $("span#1-" + prevIconId).click();
        $table.trigger("repaginate");
    },

    initTableHead: function(table, array) {
        var header = table.children("thead");

        array = (function(array) {
            var levelArray = [];
            var traverseObject = function(obj, level) {
                if (obj.children && $.isArray(obj.children) && obj.children.length > 0) {
                    obj.colspan = 0;
                    obj.hasChildren = true;
                    for (var i = 0, len = obj.children.length; i < len; i++) {
                        obj.colspan += traverseObject(obj.children[i], level + 1);
                    }
                } else {
                    obj.colspan = 1;
                }
                levelArray[level] = levelArray[level] || [];
                var clone = $.extend({}, obj);
                delete clone.children;
                levelArray[level].push(clone);
                return obj.colspan;
            };

            for (var i = 0, len = array.length; i < len; i++) {
                traverseObject(array[i], 0);
            }

            return levelArray;
        })(array);


        for (var i = 0; i < array.length; i++) {
            var row = $("<tr class='head'></tr>").appendTo(header);
            for (var j = 0; j < array[i].length; j++) {
                var th;
                var thObj = array[i][j];
                if (thObj && thObj.text) {
                    th = $("<th class='table-head' rowspan='" + (thObj.hasChildren ?  1 : array.length - i) + "' colspan='" + thObj.colspan + "'><span>" + thObj.text + "</span></th>");
                }
                if (thObj && thObj.width) {
                    th.css('width', thObj.width);
                }
                row.append(th);
            }

        }
    },

    initTableBody: function(table, array) {
        if (array.length == 0) {
            var grid = table.find("thead tr th[colspan=1]").length;
            if (table.find("tbody tr.space-tr").length == 0) {
                $.addEmptyBody(table, grid);
            }
            return;
        }
        var body = table.children("tbody");
        body.find('tr:not(.nd)').remove();
        var rowspanCount = 0;
        for (var i = 0; i < array.length; i++) {
            var tr = $("<tr></tr>");
            var td = "";

            rowspanCount !== 0 && rowspanCount--;

            for (var j = 0; j < array[i].length; j++) {
                if (array[i][j].rowspan === undefined) {
					if (array[i][j].classStr != undefined){
						td = "<td class='table-content "+array[i][j].classStr+"'>" + array[i][j].text + "</td>";
					}else {
						td = "<td class='table-content'>" + array[i][j].text + "</td>";
					}
                } else if (typeof array[i][j].rowspan === "number" && rowspanCount === 0) {
					if (array[i][j].classStr != undefined){
						td = "<td class='table-content "+array[i][j].classStr+"' rowspan='"+ array[i][j].rowspan + "'>" + array[i][j].text + "</td>";
					}else {
						td = "<td class='table-content' rowspan='" + array[i][j].rowspan + "'>" + array[i][j].text + "</td>";
					}
                    rowspanCount = array[i][j].rowspan;
                }

                if (array[i][j] && array[i][j].width) {
                    $(td).width(array[i][j].width);
                }
                tr.append(td);
                td = null;
            }

            body.append(tr);
        }
        $.bodyStyleUpdate(table);
        body.children("tr:not(.nd)").find("input[type='checkbox']:not(.checkbox-checkbox)").tpCheckbox();
    },

    addEmptyBody: function(table, grid) {
        var body = table.children("tbody");
        var trFirst = body.find("tr.first");
        var tr = $("<tr class='space-tr'></tr>");
        for (var i = 0; i < grid; i++) {
            var td = "<td>--</td>";
            tr.append(td);
        }
        if (trFirst.length == 0) {
            body.prepend(tr);
        } else {
            trFirst.before(tr);
        }
    },

    appendTableRow: function(table, data) {
        var body = table.children("tbody");
        var tr = $("<tr></tr>");
        for (var j = 0; j < data.length; j++) {
            var td = "<td class='table-content' width='" + data[j].width + "'>" + data[j].text + "</td>";
            tr.append(td);
        }
        body.append(tr);
    },

    bodyStyleUpdate: function(table) {
        table.find("span.enable-icon").click(function() {
            $(this).removeClass("enable-icon");
            $(this).addClass("disable-icon");
        });

        table.find("span.disable-icon").click(function() {
            $(this).removeClass("disable-icon");
            $(this).addClass("enable-icon");
        });

        if (table.find('td.table-content').find(".edit-modify-icon") || table.find('td.table-content').find(".disable-icon")) {
            table.find("span.edit-modify-icon").parent('td.table-content').css({
                width: "60px"
            });
        }
    },
    hideEditArea: function(table) {
        var tpTable = table.data('tpTable');
        if (!tpTable) {
            return;
        }

        tpTable.hideEditArea();
    }
});
