Ti.include('./ui/basic/UI.js');
Ti.include('./service/user.js');
var db = Ti.Database.install('TXDE.sqlite', 'TXDE');
db.close();
// var isFirst = su_isFirstInstall();
if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
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
        width : '84dip',
        height : '21dip',
        bottom : '21dip',
        zIndex : 2
    });

    var main = require('ui/MainView');
    var main_win = new main();
    var scrollableView = ui_createPreScrollableView(win, main_win,imageView);
    win.add(imageView);
    win.add(scrollableView);
    fun_createMenuBottomBar(win);
    win.open();
    // };
    su_getUserLocation();
})();
