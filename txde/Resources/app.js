Ti.include('./ui/basic/UI.js');
Ti.include('./service/user.js');

var db = Ti.Database.install('TXDE.sqlite', 'TXDE');
db.close();
var app_version="1.1.2";//版本号
// var isFirst = su_isFirstInstall();
if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

(function() {
    // Ti.API.info('-=-=-=-==-==-=-=-=-===============:' + isFirst);
    // if (isFirst == "1") {
    // var main = require('ui/main');
    // var main_win = new main();
    // main_win.open();
    // } else {
    var win = Ti.UI.createWindow({
        exitOnClose : true,
        fullscreen : false,
        backgroundImage : '/images/main.png'
    });

    // Create an ImageView.
    var imageView = Ti.UI.createImageView({
        image : '/images/mdpi/p0.png',
        width : '192dip',
        height : '48dip',
        bottom : '21dip',
        zIndex : 2
    });
    var main = require('ui/MainView');
    var main_win = new main();
    var scrollableView = ui_createPreScrollableView(win, main_win,imageView);
    win.add(imageView);
    win.add(scrollableView);
    win.open();
    // };
    //搜集用户使用信息
    su_getUserLocation();
    //版本检测
    u_checkAPPVersion(app_version);
})();
