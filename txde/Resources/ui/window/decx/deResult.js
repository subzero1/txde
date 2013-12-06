Ti.include('../../basic/BasicTableList.js');
Ti.include('../../basic/UI.js');
var win = Ti.UI.currentWindow;

var startRow = 0;
var pageSize = 20;
var i = 0;
var tableData = [];
var tableView = Ti.UI.createTableView({
    backgroundColor : 'white',
    top : '50dip',
});
//添加标题
var tableRow1 = fun_createTableTitle();
tableData.push(tableRow1);
var headView = fun_createHeadViewBar();
fun_createReturnBtn(headView, win);
win.add(headView);
doQuery();
//下滑加载数据事件
win.addEventListener('swipe', function(e) {
    pageSize=10;
    if (e.direction == 'up') {
        startRow = startRow + pageSize;
        doQuery();
    };
});
//选项点击事件
tableView.addEventListener('click', function(e) {
    var index = e.index;
    var request = {};
    request.de_id = e.rowData.id;
    Ti.App.Properties.setObject('request', request);
    var deDetailTabGroup = require('ui/window/decx/deDetailTabGroup');
    new deDetailTabGroup().open();
});
//分页查询
function doQuery() {
    var db = Ti.Database.open('TXDE');
    var bhmc = Ti.App.Properties.getList('bhmc');
    var book = Ti.App.Properties.getString('book');
    var chapter = Ti.App.Properties.getString('chapter');
    var sector = Ti.App.Properties.getString('sector');
    var rows;
    var hql = "SELECT * FROM TA_DEDAK where 1=1 "; 
    //按章节测查询
    if (book != null && book != '') {
        hql += "and BH BETWEEN (SELECT MIN(STARTCOPY) FROM TA_SECTOR  WHERE BOOK='" + book;
        if (chapter != null && chapter != '') {
            hql += "'AND CHAPTER=" + chapter;
        }
        if (sector != null && sector != '') {
            hql += " AND SECTOR=" + sector;
        }
        hql += ") AND (SELECT MAX(FINISH) FROM TA_SECTOR  WHERE BOOK='" + book;
        if (chapter != null && chapter != '') {
            hql += "' AND CHAPTER=" + chapter;
        }
        if (sector != null && sector != '') {
            hql += " AND SECTOR=" + sector;
        }
        hql += ")";
    };
    hql += " order by bh limit " + pageSize + " offset " + startRow;
    Titanium.API.info('hql:' + hql);
    rows = db.execute(hql);
    Titanium.API.info('记录数:' + rows.rowCount);
    if (rows.rowCount == 0)
        return;
    while (rows.isValidRow()) {
        var tableRow = fun_createTableRow(rows, i);
        tableData.push(tableRow);
        i++;
        rows.next();
    }
    tableView.data = tableData;
    win.add(tableView);
    rows.close();
    db.close();
}  