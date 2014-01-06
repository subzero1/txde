Ti.include('./basic/BasicMenuItem.js');
Ti.include('./basic/UI.js');
Ti.include('../service/user.js');
var dimention=ui_getDimension();
function MainView() {
    var win =  Ti.UI.createView({
        width:'100%',
    });
    var view = Ti.UI.createScrollView({
        backgroundImage : '/images/main.png'
    });
    //表格视图组件
    var tableData = [];
    var tableView = Ti.UI.createTableView({
        top : '100dip',
        backgroundImage : '/images/mainMenuItemBack.png',
        width : '95%',
        height : '237dip',
    });
    var decxRow=bmi_createMenuItemTableRow('/images/De.png', '定额查询', '', 1);
    var clcxRow=bmi_createMenuItemTableRow('/images/Material.png', '材料查询', '', 2);
    var jxcxRow=bmi_createMenuItemTableRow('/images/Machine.png', '机械查询', '', 3);
    var ybcxRow=bmi_createMenuItemTableRow('/images/Meter.png', '仪表查询', '', 4);
    tableData.push(decxRow);
    tableData.push(clcxRow);
    tableData.push(jxcxRow);
    tableData.push(ybcxRow);
    tableView.data = tableData;

    //左上角logo
    var headLogo = Ti.UI.createImageView({
        image : '/images/'+dimention+'headLogo.png',
        top : '0',
        zIndex : '1',
        height:'90dip'
    });
    //右下角版权信息
    var infoLabel = Ti.UI.createLabel({
        color : '#000',
        font : {
            fontFamily : 'Arial',
            fontSize : '16dip',
            fontWeight : 'normal'
        },
        text : '@ 2013 网天公司 版权所有',
        right : '8dip',
        bottom : '4dip',
        zIndex : '-1'
    });
    view.add(infoLabel);
    var ListWindow = require('ui/window/ListWindow');
    //选项点击事件
    tableView.addEventListener('touchend', function(e) {
        var index = e.index;
        if (index == '0') {
            var searchWindow = Ti.UI.createWindow({
                title : '查询类别',
                navBarHidden : false,
                backgroundColor : '#ffffff',
                url : 'ui/window/decx/DeSearch.js',
            });
            searchWindow.open();
        } else if (index == '1') {
            new ListWindow('TA_ZCDAK', '材料查询').open();
        } else if (index == '2') {
            new ListWindow('TA_JXDAK', '机械查询').open();
        } else if (index == '3') {
            new ListWindow('TA_YBDAK', '仪表查询').open();
        }
        ;
    });
    view.add(tableView);
    win.add(headLogo);
    win.add(view);
    return win;
};
module.exports = MainView;
