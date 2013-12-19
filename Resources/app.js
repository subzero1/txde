 
Ti.include('./service/user.js');
var db = Ti.Database.install('TXDE.sqlite', 'TXDE'); 
db.close();
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	var main = require('ui/main');
	var main_win=new main();
	main_win.open(); 
    su_getUserLocation();
})();
