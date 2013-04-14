/// <reference path="../../Lib/jquery-1.9.1.js" />
/// <reference path="../../UI/jquery-ui-1.10.2.custom/jquery-ui-1.10.2.custom/js/jquery-ui-1.10.2.custom.js" />
(function ($) {
    $.widget("itellu.pager", {
        options: {
            pageIndex: 1,
            pageCount: 100,
            pageSize: 20,
            pageNumberCount: 10,
            totalItemCount: 2000,
            prev: {
                text: "prev",
                visible: true,
                className: "ui-state-default prev"
            },
            next: {
                text: "next",
                visible: true,
                className: "ui-state-default next"
            },
            first: {
                text: "first",
                visible: true,
                className: "ui-state-default first"
            },
            last: {
                text: "last",
                visible: true,
                className: "ui-state-default last"
            }


        },
        _create: function () {
            this.$pagerLinks = $("<ul>").addClass("pager-links").appendTo(this.element);
            this.$pagerInfo = $("<span>").addClass("pager-info").appendTo(this.element);
            this.element.addClass(this.widgetFullName);
            this._on(this.$pagerLinks, {
                "click li": "_pagerClick"
            });
        },
        _init: function () {
            this._buildPager();
        },
        goTo: function (index) {
            this.option("pageIndex", index);
            this._trigger("indexChanged", null, index);
        },
        _pagerClick: function (event) {
            var $this = $(event.currentTarget);
            var index = $this.data("index");
            if (index) {
                this.goTo(index);
            }
        },
        _setOption: function (key, value) {
            this._super(key, value);
            if (key === "pageIndex") {
              
            }
            this._buildPager();
        },
        _buildPager: function () {

            this.$pagerLinks.empty();
            this.$pagerInfo.empty();

            this.$firstLink = this._buildLink($.extend({ index: 1 }, this.options.first));

            this.$prevLink = this._buildLink($.extend({ index: this.options.pageIndex - 1 }, this.options.prev));

            var startIndex = 1, half = Math.floor(this.options.pageNumberCount / 2);
            if (this.options.pageIndex > half) {
                startIndex = this.options.pageIndex - half + 1;
            }
            if (this.options.pageCount - this.options.pageIndex < this.options.pageNumberCount) {
                startIndex = this.options.pageCount - this.options.pageNumberCount + 1;
            }
            for (var i = 0; i < this.options.pageNumberCount; i++) {
                var index = startIndex + i;
                this._buildLink({ index: index, text: index, className: this.options.pageIndex == index ? "number-link ui-state-default ui-state-active" : "number-link ui-state-default" });
                if (index >= this.options.pageCount) {
                    break;
                }
            }

            this.$nextLink = this._buildLink($.extend({ index: this.options.pageIndex + 1 }, this.options.next));

            this.$lastLink = this._buildLink($.extend({ index: this.options.pageCount }, this.options.last));


        },

        _buildLink: function (linkInfo) {
            var $li = $("<li>").addClass("link").addClass(linkInfo.className).append($("<span>").text(linkInfo.text));
            if (linkInfo.visible === false) {
                $li.hide();
            }
            if (this.options.pageIndex == linkInfo.index ||
                linkInfo.index < 1 ||
                linkInfo.index > this.options.pageCount) {
                $li.addClass("ui-state-disabled");
            } else {
                $li.data("index", linkInfo.index);
            }

            this.$pagerLinks.append($li);
            return $li;
        }
    });
})(jQuery);