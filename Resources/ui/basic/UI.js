//编号按钮
var osname = Ti.Platform.osname;
var version = Ti.Platform.version;
var height = Ti.Platform.displayCaps.platformHeight;
var width = Ti.Platform.displayCaps.platformWidth;
var animationsOn = true;

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
    });
    _arrow_left.addEventListener('touchstart', function() {
        _arrow_left.image = '/images/searchBackground_01_1.png';
    });
    _arrow_left.addEventListener('touchend', function() {
        win.close();
        _arrow_left.image = '/images/searchBackground_01.png';
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
        width : '200dip',
        top : '0dip',
        bottom : '0dip',
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
        left : '8dip',
        width : '67dip',
        height : '38dip',
    });
    return _leftBar;
}

//构造右侧主页按钮
function fun_createHomeImg() {
    var _returnLabel = Ti.UI.createImageView({
        right : '0',
        width : '72dip',
        height : '40dip',
        image : '/images/main-btn_01.png',
    });
    return _returnLabel;
}

//左侧返回按钮
function fun_createReturnBtn(view, win) {
    var _leftBar = fun_createLeftBar();
    var _rightBar = fun_createHomeImg();
    view.add(_leftBar);
    view.add(_rightBar);
    _leftBar.addEventListener('touchstart', function() {
        _leftBar.image = '/images/return-btn_02.png';
    });
    _leftBar.addEventListener('touchend', function() {
        win.close();
        _leftBar.image = '/images/return-btn_01.png';
    });
    _rightBar.addEventListener('touchstart', function() {
        _rightBar.image = '/images/main-btn_02.png';
    });
    _rightBar.addEventListener('touchend', function() {
        _rightBar.image = '/images/main-btn_01.png';
        var main = require('ui/main');
        var main_win = new main();
        main_win.open();
    });
}

//建立Menu贱
function fun_createMenuBottomBar(win) {
    var dimention = ui_getDimension();
    // Create the Android menu.
    var SETTING = 1, EXIT = 2, ABOUT = 3, UPDATE = 4;
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

        menuItem = menu.add({
            title : '更新',
            itemId : UPDATE,
        });
        menuItem.setIcon('/images/RightArrow.png');
        menuItem.addEventListener('click', function(e) {
            Ti.Platform.openURL('http://www.tjnetsky.com.cn/txgys/netsky_txde.apk');
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

//建立启动动画页面
function ui_createPreScrollableView(win, main_win, imageView) {
    // var img1 = Ti.UI.createImageView({
        // image : '/images/mdpi/main_pre1.png',
        // width : '100%',
        // height : '100%'
    // });
    // var img2 = Ti.UI.createImageView({
        // image : '/images/mdpi/main_pre2.png',
        // width : '100%',
        // height : '100%'
    // });
    // var img3 = Ti.UI.createImageView({
        // image : '/images/mdpi/main_pre3.png',
        // width : '100%',
        // height : '100%'
    // });
    // var view1 = Ti.UI.createView({
    // });
    // var view2 = Ti.UI.createView({
    // });
    // var view3 = Ti.UI.createView({
        // opacity : '0.75'
    // });
    // view1.add(img1);
    // view2.add(img2);
    // view3.add(img3);
    var img1 = Ti.UI.createImageView({
        image : '/images/mdpi/main_pre1.png',
        width : '100%',
        height : '100%'
    });
    var img2 = Ti.UI.createImageView({
        image : '/images/mdpi/main_pre2.png',
        width : '100%',
        height : '100%'
    });
    var img3 = Ti.UI.createImageView({
        image : '/images/mdpi/main_pre3.png',
        width : '100%',
        height : '100%'
    });
    var img4 = Ti.UI.createImageView({
        image : '/images/mdpi/main_pre4.png',
        width : '100%',
        height : '100%'
    });
    var view1 = Ti.UI.createView({
    });
    var view2 = Ti.UI.createView({
    });
    var view3 = Ti.UI.createView({
        opacity : '0.75'
    });
    var view4 = Ti.UI.createView({
        opacity : '0.75'
    });
    view1.add(img1);
    view2.add(img2);
    view3.add(img3);
    view4.add(img4);
    view4.addEventListener('click', function(e) {
        if (animationsOn) {
            setTimeout(function() {
                main_win.animate(Ti.UI.createAnimation({
                    opacity : 1,
                    duration : 4000
                }));
            }, 2000);
        }
        fun_createMenuBottomBar(win);
        win.add(main_win);
    });
    var scrollableView = Ti.UI.createScrollableView({
        views : [view1, view2, view3,view4],
        showPagingControl : false
    });
    scrollableView.addEventListener('scrollend', function(e) {
        imageView.image = '/images/mdpi/p' + e.currentPage + '.png';
        if (e.currentPage == 3) {
            imageView.addEventListener('click', function(e) {
                if (animationsOn) {
                    setTimeout(function() {
                        main_win.animate(Ti.UI.createAnimation({
                            opacity : 1,
                            duration : 4000
                        }));
                    }, 2000);
                }
                fun_createMenuBottomBar(win);
                win.add(main_win);
            });
        } else {
            imageView.removeEventListener('click',function(e){
                Ti.API.info('click Event Remove');
            });
        };
    });
    return scrollableView;
}

