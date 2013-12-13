//编号按钮
var osname = Ti.Platform.osname;
var version = Ti.Platform.version;
var height = Ti.Platform.displayCaps.platformHeight;
var width = Ti.Platform.displayCaps.platformWidth;

function fun_createBHMCTextField(top) {//按定额编号查询
    var _bhmc = Titanium.UI.createTextField({
        hintText : '编号或名称',
        width : '90%',
        top : top,
    });
    return _bhmc;
};

//查询按钮
function fun_createQueryButton(title, top) {
    var _queryBtn = Titanium.UI.createButton({
        title : title,
        top : top,
        width : '90%',
        borderRadius : 1,
        font : {
            fontFamily : 'Arial',
            fontSize : '16dip'
        },
        verticalAlign : 'center'
    });
    return _queryBtn;
}

//搜索头文件
function fun_createSearchHeadView() {
    var _headView = Ti.UI.createView({
        top : 0,
        height : '54dip',
        backgroundColor : '#fff',
        backgroundImage : '/images/searchTextBackground_05.png',
        zIndex : '1'
    });
    return _headView;
}

//顶部搜索框
function fun_createSearchText() {
    var _search = Titanium.UI.createTextField({
        left : '95dip',
        right : '40dip',
        hintText : '编号或名称',
        top : '15%',
        height : '38dip',
        color : '#dbdabb',
        font : {
            fontFamily : 'Arial',
            fontSize : '17dip',
            color : '#dbdabb',
        },
        backgroundImage : '/images/searchTextBackground_06.png',
        backgroundFocusedColor : 'white',
        zIndex : 2
        // backgroundColor:'#0c1d3e'
    });
    return _search;
}

//返回按钮
function fun_createBackButton(win) {
    var _arrow_left = Ti.UI.createImageView({
        image : '/images/searchBackground_01.png',
        zIndex : 2,
        left : '0',
        top : '0',
        width : '62dip',
        height : '100%',
        // backgroundColor:'green'
    });
    _arrow_left.addEventListener('click', function() {
        win.close();
    });
    return _arrow_left;
}

//修饰搜索框
function ui_searchTextStyle(view) {
    //文本域右侧
    var searchTextImg_03 = Ti.UI.createImageView({
        image : '/images/searchTextBackground_03.png',
        zIndex : -2,
        right : '0',
        top : '0',
        width : '42dip',
        height : '100%',
    });
    //文本域放大镜
    var searchTextImg_04 = Ti.UI.createImageView({
        image : '/images/searchTextBackground_04.png',
        zIndex : 2,
        left : '62dip',
        top : '0',
        width : '40dip',
        height : '100%',
    });
    //文本域大背景
    var searchTextImg_05 = Ti.UI.createImageView({
        image : '/images/searchTextBackground_05.png',
        zIndex : -2,
        left : '100dip',
        right : '42dip',
        width:'200dip',
        top : '0dip',
        bottom:'0dip',
        height : '54dip',
        // backgroundColor:'yellow'
    });
    view.add(searchTextImg_03);
    view.add(searchTextImg_04);
    // view.add(searchTextImg_05);
}

//重置按钮
function fun_createResetButton() {
    var _resetBtn = Ti.UI.createImageView({
        top : '38%',
        left : '90%',
        width : '17dip',
        height : '17dip',
        image : '/images/hdpi/reset.png'
    });
    return _resetBtn;
}

//顶部通用背景工具条
function fun_createHeadViewBar() {
    var _headView = Ti.UI.createView({
        top : 0,
        height : '48dip',
        // backgroundColor : '#dbdabb',
        zIndex : '1',
        backgroundImage : '/images/barBackground.png'
    });
    return _headView;
}

//底部背景工具栏
function fun_createBottomViewBar() {
    var _view = Ti.UI.createView({
        bottom : 0,
        height : '48dip',
        backgroundImage : '/images/barBackground.png',
        zIndex : '1'
    });
    return _view;
}

//建立左边工具栏
function fun_createLeftBar() {
    var _leftBar = Ti.UI.createImageView({
        image : '/images/return-btn_01.png',
        left : '12dip',
        width:'67dip',
        height : '38dip',
    });
    return _leftBar;
}

function fun_createReturnLabel() {
    var _returnLabel = Ti.UI.createLabel({
        text : '返回',
        left : '22dip',
        font : {
            fontFamily : 'Arial',
            fontSize : '18dip',
        },
        color : 'black',
        zIndex : '2'
    });
    return _returnLabel;
}

//构造右侧主页Label
function fun_createHomeLabel() {
    var _returnLabel = Ti.UI.createLabel({
        text : '主页',
        right : '22dip',
        font : {
            fontFamily : 'Arial',
            fontSize : '18dip',
        },
        color : 'black'
    });
    return _returnLabel;
}

//构造右侧主页按钮
function fun_createHomeImg() {
    var _returnLabel = Ti.UI.createImageView({
        right : '22dip',
        width:'72dip',
        height : '40dip',
        image : '/images/main-btn_01.png',
    });
    return _returnLabel;
}

//左侧返回按钮
function fun_createReturnBtn(view, win) {
    var _leftBar=fun_createLeftBar();
    var _rightBar=fun_createHomeImg();
    // var _returnLabel = fun_createReturnLabel();
    // var _HomeLabel = fun_createHomeLabel();
    view.add(_leftBar);
    view.add(_rightBar);
   // view.add(_returnLabel);
   // view.add(_HomeLabel);
    _leftBar.addEventListener('touchstart', function() {
        _leftBar.image='/images/return-btn_02.png';
        win.close();
    });
    _rightBar.addEventListener('touchstart', function() { 
        _rightBar.image='/images/main-btn_02.png';
        var main = require('ui/main');
        var main_win = new main();
        main_win.open();
    });
    // _returnLabel.addEventListener('touchstart', function() {
        // win.close();
    // });
    // _HomeLabel.addEventListener('touchstart', function() {
        // var main = require('ui/main');
        // var main_win = new main();
        // main_win.open();
    // });
}

function fun_createMenuExitBar(win) {

}

//建立Menu贱
function fun_createMenuBottomBar(win) {
    var dimention = ui_getDimension();
    // Create the Android menu.
    var SETTING = 1, EXIT = 2, ABOUT = 3;
    var activity = win.activity;
    activity.onCreateOptionsMenu = function(e) {
        var menu = e.menu;
        var menuItem = menu.add({
            title : '退出',
            itemId : EXIT
        });
        menuItem.setIcon('/images/' + dimention + 'exit.png');
        menuItem.addEventListener('click', function(e) {
            win.close();
        });

    };
}

//判断移动设备分辨率级别
function ui_getDimension() {
    var dimension;
    if (osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899))) {
        dimension = 'hdpi';
    } else if (osname === 'android' && (width < 899 || height < 899)) {
        dimension = 'mdpi';
    } else {
        dimension = 'ldpi';
    }
    ;
    return dimension + '/';
}

