//定额详细页
Ti.include('../../basic/BasicTableList.js');
Ti.include('../../basic/UI.js');
function DE_Detail(tabGroup) {
    var win = Ti.UI.createWindow({
        backgroundColor:'#dbdabb'
    });

    var request = Ti.App.Properties.getList('request');
    var de_id = request.de_id;
    var de_bh;
    var tableData = [];
    var tableView = Ti.UI.createTableView({
        backgroundColor : 'white',
        top : 0,
    });
    var deDataSet = [];
    var i = 0;
    
    //添加底部工具条
    var bottomView=fun_createBottomViewBar();
    fun_createReturnBtn(bottomView,tabGroup);
    win.add(bottomView);
    doQuery(de_id);
    function doQuery(de_id) {
        var db = Ti.Database.open('TXDE');
        hql = "SELECT * FROM TA_DEDAK where 1=1 ";
        hql += ' and id=' + de_id;
        var rows = db.execute(hql);
        while (rows.isValidRow()) {
            var tableRow1 = fun_createTableDetailRow(rows, '编号：', 1);
            var tableRow2 = fun_createTableDetailRow(rows, '名称：', 2);
            var tableRow3 = fun_createTableDetailRow(rows, '单位：', 3);
            var tableRow4 = fun_createTableDetailRow(rows, '技工：', 4);
            var tableRow5 = fun_createTableDetailRow(rows, '普工：', 5);
            tableData.push(tableRow1);
            tableData.push(tableRow2);
            tableData.push(tableRow3);
            tableData.push(tableRow4);
            tableData.push(tableRow5);
            i++;
            de_bh = rows.field(1);
            rows.next();
        }
        tableView.data = tableData;
        win.add(tableView);
        Ti.App.Properties.setList('de_bh', de_bh);
        Ti.App.Properties.setList('startRow', 0);
        rows.close();
        db.close();
    } 
    return win; 
}

module.exports = DE_Detail;
