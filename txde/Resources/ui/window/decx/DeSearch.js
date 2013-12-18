Ti.include('../../basic/BasicMenuItem.js');
Ti.include('../../basic/UI.js');
var win = Titanium.UI.currentWindow;

var scrollView = Ti.UI.createScrollView({
    backgroundColor : '#ebeceb'
});
//表格视图组件
var tableData = [];
var tableView = Ti.UI.createTableView({
    top : '100dip',
    backgroundImage : '/images/mainMenuItemBack.png',
    width : '95%',
    height : '119dip',
});
tableData.push(bmi_createMenuItemTableRow('/images/searchByNumber.png', '编号或名称', '', 5));
tableData.push(bmi_createMenuItemTableRow('/images/searchByBook.png', '册章节查询', '', 6));
tableView.data = tableData;
//返回按钮
scrollView.add(tableView);
//添加顶部工具条
var headView = fun_createHeadViewBar();
fun_createReturnBtn(headView, win);
win.add(headView);
win.add(scrollView);

tableView.addEventListener('touchend', function(e) {
    var index=e.index;
    if (index == '0') {
           var ListWindow = require('ui/window/DE_ListWindow');
    new ListWindow('TA_DEDAK', '定额查询').open();
    } else if (index == '1') {
       var searchByBookWin = Ti.UI.createWindow({
        title : '按册章节查询',
        navBarHidden : false,
        backgroundColor : '#ffffff',
        url : 'ui/window/decx/deQueryByBook.js'
    });
    searchByBookWin.open();
    }
});
