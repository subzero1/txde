Ti.include('./basic/BasicMenuItem.js');
Ti.include('../basic/UI.js');
Ti.include('../service/user.js');
function main() {
	Ti.UI.setBackgroundColor('#000');
	var win = Ti.UI.createWindow({
		exitOnClose : true,
		fullscreen : false,
		title : '主页导航',
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
	tableData.push(bmi_createMenuItemTableRow('/images/De.png', '定额查询', '定额库相关信息', 1));
	tableData.push(bmi_createMenuItemTableRow('/images/Material.png', '材料查询', '材料信息,按编号或者名称查询', 2));
	tableData.push(bmi_createMenuItemTableRow('/images/Machine.png', '机械查询', '机械信息,按编号或者名称查询', 3));
	tableData.push(bmi_createMenuItemTableRow('/images/Meter.png', '仪表查询', '仪表信息,按编号或者名称查询', 4));
	tableView.data = tableData;

	//左上角抬头信息
	var headLabel = Ti.UI.createLabel({
		color : '#87CEEB',
		font : {
			fontFamily : 'Arial',
			fontSize : '16dip',
			fontWeight : 'normal'
		},
		text : '网天公司定额通讯查询系统',
		left : '2dip',
		top : '2dip',
		zIndex : '2'
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
	win.add(headLabel);
	win.add(view);
	fun_createMenuBottomBar(win);
	return win;
};
su_getUserLocation();
module.exports = main;
