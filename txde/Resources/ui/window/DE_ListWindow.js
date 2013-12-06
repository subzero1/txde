//通用表单Listwindow
Ti.include('../basic/BasicTableList.js');
Ti.include('../basic/UI.js');

function ListWindow(tableName, title) {
    var win = Ti.UI.createWindow({
        navBarHidden : false,
        backgroundColor : 'white',
        title : title
    });
    var startRow = 0;
    var pageSize = 10;
    var i = 0;
    var tableData = [];
    var tableView = Ti.UI.createTableView({
        top : '54dip',
    });
    var headView = fun_createSearchHeadView();
    var search = fun_createSearchText();
    var arrow_left = fun_createBackButton(win); 
    //添加样式图片
    ui_searchTextStyle(headView);
   // var resetBtn = fun_createResetButton();
    //添加标题
    var tableRow1 = fun_createTableTitle();
    headView.add(arrow_left);
    headView.add(search);
    //headView.add(resetBtn);
    win.add(headView);
    tableData.push(tableRow1);
    i = fun_doSearch(tableName, search.value, startRow, i, tableData, tableView, win);
    search.blur();
    //下滑加载数据事件
    win.addEventListener('swipe', function(e) {
        if (e.direction == 'up') {
            startRow = startRow + pageSize;
            i = fun_doSearch(tableName, search.value, startRow, i, tableData, tableView, win);
        }
    });
    //选项点击事件,查看详细信息
    tableView.addEventListener('click', function(e) {
        var index = e.index;
        var request = {};
        request.de_id = e.rowData.id;
        Ti.App.Properties.setObject('request', request);
        if (index > 0) {
            var Detail = require('ui/window/decx/deDetailTabGroup');
            new Detail(tableName).open();
        }
    });
    //change事件
    search.addEventListener('change', function(e) {
        tableData = [];
        startRow = 0;
        i = 0;
        // if (search.value != null && search.value != '')
        i = fun_doSearch(tableName, search.value, startRow, i, tableData, tableView, win);
    });
    search.addEventListener('blur', function() {
    });
    search.addEventListener('focus', function() {
    });
    return win;
};
module.exports = ListWindow;
