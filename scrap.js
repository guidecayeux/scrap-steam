const result = {};


let domParser = new DOMParser();
let parsedData;
let categories = ['garage door', 'l96']

function getPage(categorie, page) {
    fetch(`https://steamcommunity.com/workshop/browse/?appid=252490&searchtext=&childpublishedfileid=0&browsesort=accepted&section=mtxitems&requiredtags%5B%5D=${categorie}&created_date_range_filter_start=0&created_date_range_filter_end=0&updated_date_range_filter_start=0&updated_date_range_filter_end=0&p=${page}`)
        .then((brutResponse) => {
            brutResponse.text().then((resultHtml) => {
                parsedData = domParser.parseFromString(resultHtml, 'text/html');
                parsedData.querySelectorAll('[data-publishedfileid]').forEach((item) => {
                    result[categorie].push(Number(item.getAttribute('data-publishedfileid')));
                })
                if (document.querySelectorAll('.pagelink').length > 0 && page <= document.querySelectorAll('.pagelink').length) {
                    getPage(categorie, page + 1)
                }
            });

        })
}
fetch(`https://steamcommunity.com/workshop/browse/?appid=252490&browsesort=accepted&section=mtxitems`)
    .then((pageGlobal) => {
        pageGlobal.text().then((pageGlobalHtml) => {
            parsedData = domParser.parseFromString(pageGlobalHtml, 'text/html');
            parsedData.querySelectorAll('.filterOption > label').forEach((item) => {
                categories.push(item.innerText.trim())
            });
            categories.forEach((categorie) => {
                result[categorie] = [];
                getPage(categorie, 1);
            })
        });
    })

console.log(result);

