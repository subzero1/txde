//构造表标题
function fun_createTableTitle() {
    var defaultFontSize = Ti.Platform.name === 'android' ? '18dip' : '16dip';
    var tableRow = Ti.UI.createTableViewRow({
        className : 'titleEvent', // used to improve table performance
        rowIndex : 0, // custom property, useful for determining the row during events
        // backgroundColor:'#dbdabb',
        backgroundImage : '/images/tableTitleBackground.png',
        top : '54dip',
        height : '28dip'
    });

    // Create a Label.
    var label1 = Ti.UI.createLabel({
        text : '序号',
        color : '#dbdabb',
        font : {
            fontSize : defaultFontSize
        },
        // width : '36dip',
        left : '8dip',
        textAlign : 'center',
    });
    //定额编号
    var label2 = Ti.UI.createLabel({
        text : '编号',
        color : '#dbdabb',
        font : {
            fontSize : defaultFontSize
        },
        width : '90dip',
        left : '46dip',
        textAlign : 'left',
    });

    // 定额名称
    var label3 = Ti.UI.createLabel({
        text : '名称',
        font : {
            fontSize : defaultFontSize
        },
        width : 800 / 16 + '%',
        left : '138dip',
        color : '#dbdabb',
        textAlign : 'left',
    });

    // Add to the parent view.
    tableRow.add(label1);
    tableRow.add(label2);
    tableRow.add(label3);
    return tableRow;
}

//构造表单行
function fun_createTableRow(rows, index) {
    var defaultFontSize = Ti.Platform.name === 'android' ? '18dip' : '16dip';
    var tableRow = Ti.UI.createTableViewRow({
        className : 'forumEvent', // used to improve table performance
        selectedBackgroundColor : 'pink',
        rowIndex : index, // custom property, useful for determining the row during events
        id : rows.field(0),
        height : '64dip',
        backgroundImage : ''
    });

    // Create a Label.
    var label1 = Ti.UI.createLabel({
        text : index + 1,
        color : '#cc0000',
        font : {
            fontSize : defaultFontSize
        },
        width : '36dip',
        left : '8dip',
        textAlign : 'center',
    });
    //定额编号
    var label2 = Ti.UI.createLabel({
        text : rows.field(1),
        color : '#000000',
        font : {
            fontSize : defaultFontSize
        },
        // width : '80dip',
        left : '46dip',
        top : '8dip',
        textAlign : 'left',
    });

    // 定额名称
    var label3 = Ti.UI.createLabel({
        text : rows.field(2),
        color : '#000000',
        font : {
            fontSize : defaultFontSize
        },
        left : '46dip',
        right : '22dip',
        top : '32dip',
        color : 'black',
        textAlign : 'left',
        backgroundcolor : 'red'
    });

    //右侧小箭头
    var rightImg = Ti.UI.createImageView({
        image : '/images/right.png',
        right : '10dip',
        width : '16dip',
        height : '16dip',
        zIndex : '1'
    });

    var bh = '' + rows.field(2);
    //表格适应性调整,名称大于15高度增加
    if (bh.length > 15) {
        Ti.API.info('表格高度:' + bh.length + (bh.length / 16));
        tableRow.height = (64 + bh.length ) + 'dip';
    }

    // Add to the parent view.
    tableRow.add(label1);
    tableRow.add(label2);
    tableRow.add(label3);
    tableRow.add(rightImg);
    return tableRow;
}

//构造表详细信息
function fun_createTableDetailRow(rows, title, index) {
    var defaultFontSize = Ti.Platform.name === 'android' ? '18dip' : '16dip';
    var tableRow = Ti.UI.createTableViewRow({
        className : 'forumEvent', // used to improve table performance
        selectedBackgroundColor : 'pink',
        rowIndex : index, // custom property, useful for determining the row during events
        id : rows.field(0)
    });

    // Create a Label.
    var label1 = Ti.UI.createLabel({
        text : title,
        color : '#cc0000',
        font : {
            fontSize : defaultFontSize
        },
        width : 300 / 16 + '%',
        left : 100 / 16 + '%',
        textAlign : 'left'
    });
    //其他选项
    var label2 = Ti.UI.createLabel({
        text : rows.field(index),
        color : 'black',
        font : {
            fontSize : defaultFontSize
        },
        width : 1100 / 16 + '%',
        left : 100 * 4 / 16 + '%',
        textAlign : 'left'
    });

    // Add to the parent view.
    tableRow.add(label1);
    tableRow.add(label2);
    return tableRow;
}

//构造搜索
function fun_doSearch(tableName, searchStr, startRow, index, tableData, tableView, win) {
    var db = Ti.Database.open('TXDE');
    var rows;
    var sql = "SELECT * FROM " + tableName + " t WHERE 1=1 ";
    if (searchStr != null && searchStr != '') {
        sql += " and (t.bh like '" + searchStr + "%' or t.mc like '" + searchStr + "%' ) ";
    }
    sql += " order by t.bh limit 10 offset " + startRow;
    Ti.API.info('SQL:' + sql);
    rows = db.execute(sql);
    while (rows.isValidRow()) {
        var tableRow2 = fun_createTableRow(rows, index);
        tableData.push(tableRow2);
        index++;
        rows.next();
    }
    tableView.data = tableData;
    win.add(tableView);
    rows.close();
    db.close();
    return index;
}

