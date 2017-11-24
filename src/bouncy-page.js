/**
 * the Pager Class
 * 
 * @class HappyPager
 */
class BouncyPage {

    /**
     * Creates an instance of HappyPager.
     * @param {String} target target id of div where the pager placed.
     * @param {function} [callback=() => {}]  
     * @param {JSON} [options={}] 
     * @memberof HappyPager
     */
    constructor(target, callback = () => {}, options = {}) {

        this.next = typeof (options.next) == 'undefined' ? 'Next' : options.next;
        this.prev = typeof (options.prev) == 'undefined' ? 'Prev' : options.prev;
        this.first = typeof (options.first) == 'undefined' ? 'First' : options.first;
        this.last = typeof (options.last) == 'undefined' ? 'Last' : options.last;
        this.totalPageFormat = typeof (options.totalPageFormat) == 'undefined' ? 'Page Count: {0} ' : options.totalPageFormat;
        this.totalCountFormat = typeof (options.totalCountFormat) == 'undefined' ? 'Record Count: {0} ' : options.totalCountFormat;
        this.displayPage = typeof (options.displayPage) == 'undefined' ? 5 : options.blockCount;
        this.pageSize = typeof (options.pageSize) == 'undefined' ? 10 : options.pageSize;
        this.target = $(`#${target}`);
        this.target.addClass("pager");
        this.callback = callback;
    }




    /**
     * Reander html
     * 
     * @param {Number} pageIndex 
     * @param {Number} totalCount 
     * @memberof HappyPager
     */
    render(pageIndex, totalCount) {
        pageIndex=Number.parseInt(pageIndex);
        totalCount=Number.parseInt(totalCount);
        this.currentPage = pageIndex;
        this.target.html(this.createHtml(pageIndex, totalCount));
        this.bindClick(pageIndex, totalCount);
    }
    /**
     * 
     * 
     * @param {Number} pageIndex 
     * @param {Number} totalCount 
     * @returns raw page html
     * @memberof HappyPager
     */
    createHtml(pageIndex, totalCount) {
        let pageCount = Math.ceil(totalCount / this.pageSize);
        let str = `<a class='prev'>${this.prev}</a>`;
        let preCount = Math.ceil((this.displayPage - 1) / 2);
        let nextCount = Math.floor((this.displayPage - 1) / 2);
        let startPage = pageIndex - preCount;
        startPage = startPage > 0 ? startPage : 1;
        let endPage = pageIndex + nextCount;
        endPage = endPage < pageCount ? endPage : pageCount;
        let prePoint = startPage > 1;
        let endPoint = endPage < pageCount;

        if (prePoint) {
            str += `<span class='point'>...</span>`;
        }
        str += `<span class='link'>`;
        for (let i = startPage; i < endPage + 1; i++) {
            if (i == pageIndex) {
                str += `<a class='active'>${i}</a>`
            } else {
                str += `<a >${i}</a>`
            }
        }
        str += `</span>`;
        if (endPoint) {
            str += `<span class='point'>...</span>`;
        }
        str += `<a class='next'>${this.next}</a>`;
        str += `&nbsp;&nbsp;`;
        str += `<a class='first'>${this.first}</a><a class='last'>${this.last}</a>`;
        str += `&nbsp;&nbsp;`;
        str += `<span class='total-page'> ${this.totalPageFormat.replace('{0}', '<span>' + pageCount + '</span>')} </span>`;
        str += `<span class='total-count'> ${this.totalCountFormat.replace('{0}', '<span>' + totalCount + '</span>')} </span>`;
        return str;
    }

    bindClick(pageIndex, totalCount) {

        let pageCount = Math.ceil(totalCount / this.pageSize);
        let me = this;
        me.target.find(".link a").click(function () {
            me.callback($(this).text());
        });
        me.target.find(">a").click(function () {
            let name = $(this).attr('class');
            let index = 1;
            switch (name) {
                case 'first':
                    index = 1;
                    break;
                case 'prev':
                    index = pageIndex - 1 < 1 ? 1 : pageIndex - 1;
                    break;
                case 'next':
                    index = pageIndex + 1 > pageCount ? pageCount : pageIndex + 1;
                    break;
                case 'last':
                    index = pageCount;
                    break;
            }
            me.callback(index);
        })
    }



}