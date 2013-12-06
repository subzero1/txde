Ti.include('../../basic/BasicTableList.js');
Ti.include('../../basic/UI.js');

function TabListWindow(tableName1, tableName2,tabGroup) {
    var win = Ti.UI.createWindow({
    });

    var session ={};
    var request = Ti.App.Properties.getObject('request');
    var de_id = request.de_id;

    var startRow = 0;
    var pageSize = 20;
    var rsCount = 0;
    var i = 0;
    var tableData = [];
    var tableView = Ti.UI.createTableView({
        backgroundColor : 'white',
    });
    //添加标题
    var tableRow1 = fun_createTableTitle();
    tableData.push(tableRow1);
     //添加底部工具条
    var bottomView=fun_createBottomViewBar();
    fun_createReturnBtn(bottomView,tabGroup);
    win.add(bottomView);
    
    doQuery();

    //下滑加载数据事件
    win.addEventListener('swipe', function(e) {
        if (e.direction == 'up') {
            startRow = startRow + pageSize;
            doQuery();
            pageSize=10;
        };
    });
    //选项点击事件
    tableView.addEventListener('click', function(e) {
        var index = e.index;
        request.id=e.rowData.id;
        Ti.App.Properties.setList('request', request);
        if (index > 0) {
             var Detail = require('ui/window/Detail');
             new Detail(tableName1).open();
        }
    });
    //查询
    function doQuery() {
        var db = Ti.Database.open('TXDE');
        var rows;
        var sql = "SELECT * FROM "+tableName1+" t WHERE 1=1 ";
        if (de_id != null && de_id != '') {
            sql += " and BH IN(select BH from "+tableName2+" where DEBH IN (";
            sql += "SELECT BH FROM TA_DEDAK WHERE ID=" + de_id;
            sql += ")) ";
        }
        sql += " order by t.bh limit "+pageSize+" offset " + startRow;
        rows = db.execute(sql);
        rsCount = rows.rowCount;
        Ti.API.info('SQL:' + sql);
        while (rows.isValidRow()) {
            var tableRow2 = fun_createTableRow(rows, i);
            tableData.push(tableRow2);
            i++;
            rows.next();
        }
        tableView.data = tableData;
        win.add(tableView);
        rows.close();
        db.close();
    }
    return win;
}

module.exports = TabListWindow;
