//表单显示详细页面
Ti.include('../basic/BasicTableList.js');
Ti.include('../basic/UI.js');

function Detail(tableName) {
    var win = Ti.UI.createWindow({
        navBarHidden : false,
        backgroundColor : 'white',
        title : '详细信息'
    });
    var request = Ti.App.Properties.getObject('request');
    var de_bh;
    var tableData = [];
    var headView = fun_createHeadViewBar();
    var tableView = Titanium.UI.createTableView({
        backgroundColor : 'white',
        top : '50dip',
    });
    var deDataSet = [];
    var i = 0; 
    fun_createReturnBtn(headView,win);
    win.add(headView);
    doQuery();
    function doQuery() {
        var db = Ti.Database.open('TXDE');
        var sql = "SELECT * FROM " + tableName + " where 1=1 ";
        sql += ' and id=' + request.id;
        Ti.API.info('SQL:' + sql);
        var rows = db.execute(sql);
        while (rows.isValidRow()) {
            var tableRow1 = fun_createTableDetailRow(rows, '编码：', 1);
            var tableRow2 = fun_createTableDetailRow(rows, '名称：', 2);
            var tableRow3 = fun_createTableDetailRow(rows, '规格：', 3);
            var tableRow4 = fun_createTableDetailRow(rows, '单位：', 4);
            var tableRow5 = fun_createTableDetailRow(rows, '单价：', 5);
            tableData.push(tableRow1);
            tableData.push(tableRow2);
            tableData.push(tableRow3);
            tableData.push(tableRow4);
            tableData.push(tableRow5);
            de_bh = rows.field(1);
            rows.next();
        }
        tableView.data = tableData;
        win.add(tableView);
        Ti.App.Properties.setList('startRow', 0);
        rows.close();
        db.close();
    }

    return win;
}

module.exports = Detail;
