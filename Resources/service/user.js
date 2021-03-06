//通过GPS定位得到地点,经纬度
//var request_url = 'http://192.168.0.128:8080/gys/';
//var request_url = 'http://www.txgys.com.cn/';
var request_url = 'http://www.txgys.com.cn/txgys/';
function su_getUserLocation() {

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			Ti.API.info('error -------------' + JSON.stringify(e.error));
			//定位失败,置空值
			su_userLog('', '', '');
			return;
		}
		longitude = e.coords.longitude;
		latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
	});

	var locationCallback = function(e) {
		if (!e.success || e.error) {
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

		setTimeout(function() {

		}, 100);

		// reverse geo
		Titanium.Geolocation.reverseGeocoder(latitude, longitude, function(evt) {
			var _location;
			if (evt.success) {
				var places = evt.places;
				if (places && places.length) {
					//reverseGeo.text = places[0].address;
					var place = places[0].address;
					_location = place;
					// alert("Current location " + place);
				} else {
					//reverseGeo.text = "No address found";
					Ti.API.info("No address found");
					location = 'unknow location';
				}
			} else {
				_location = 'unviable';
			}
			//定位成功的情况
			su_userLog(latitude, longitude, place);
		});
	};
	Titanium.Geolocation.addEventListener('location', locationCallback);
}

//获取用户设备的各个参数
function su_userLog(latitude, longitude, location) {
	var url = request_url + "mobile/userLog.do";
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("return string --------------------------------------: " + this.responseText);
			if (this.responseText == 'false' || this.responseText == '0' || this.responseText == null) {
				Ti.API.info('----------------------------------------:update-pre');
				su_updateInstallInfo();
				client = null;
			};
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.info('****************************************************:' + e.error);
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	var param = {
		//硬件参数
		'device_id' : Ti.Platform.id,
		'processor_architecture' : Ti.Platform.architecture,
		'manufacturer' : Ti.Platform.manufacturer,
		'model' : Ti.Platform.model,
		'screen_width' : Ti.Platform.displayCaps.platformWidth,
		'screen_height' : Ti.Platform.displayCaps.platformHeight,
		//系统参数
		'os_name' : Ti.Platform.osname,
		'os_version' : Ti.Platform.version,
		//环境参数
		'user_name' : Ti.Platform.username,
		'address' : Ti.Platform.address,
		'locate' : Ti.Platform.locale,
		'mac_address' : Ti.Platform.macaddress,
		//地理位置
		'location' : location,
		'longitude' : longitude,
		'latitude' : latitude,
		'first_install' : su_isFirstInstall(),
		'session_id' : Ti.App.sessionId
	};
	client.send(param);
}

//检测是否第一次安装
function su_isFirstInstall() {
	var firstInstall = false;
	var db = Ti.Database.open('TXDE');
	var rows;
	var sql = "SELECT * FROM TX_APP t where t.id=1 ";
	Ti.API.info('SQL:' + sql);
	rows = db.execute(sql);
	while (rows.isValidRow()) {
		firstInstall = rows.field(1);
		rows.next();
	}
	Ti.API.info("是否第一次：" + firstInstall);
	return firstInstall;
	db.close();
}

/**
 *更新安装信息
 */
function su_updateInstallInfo() {
	Ti.API.info('----------------------------------------:update');
	var db = Ti.Database.open('TXDE');
	var currentDate = new Date();
	var dateString = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
	dateString += ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
	var sql = "update TX_APP set first_install='1',install_time='" + dateString + "' where id=1 ";
	Ti.API.info('SQL:' + sql);
	db.execute(sql);
	db.close();
}

//搜集使用用户的使用情况
/**
 *
 * @param {Object} menu 菜单index
 * @param {Object} opp 操作，0表示不更新数据库，1表示更新
 * @param {Object} label   设置显示的label
 */
function su_menuInfo(menu, opp, label) {
	var url = request_url + "mobile/menuCount.do";
	var json;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("AJAX返回信息: " + this.responseText);
			if (this.responseText == 'false' || this.responseText == '0' || this.responseText == null) {
				json = this.responseText;
			} else {
				json = JSON.parse(this.responseText);
				if (menu == 1) {
					label.text = '点击量：' + json.menux.menu1;
				} else if (menu == 2) {
					label.text = '点击量：' + json.menux.menu2;
				} else if (menu == 3) {
					label.text = '点击量：' + json.menux.menu3;
				} else if (menu == 4) {
					label.text = '点击量：' + json.menux.menu4;
				} else if (menu == 5) {
					label.text = '点击量：' + json.menux.menu5;
				} else if (menu == 6) {
					label.text = '点击量：' + json.menux.menu6;
				}
				;
			};
		},
		onerror : function(e) {
			Ti.API.info('****************************************************:' + e.error);
		},
		timeout : 5000 // in milliseconds
	});
	client.open("GET", url);
	var param = {
		'menu' : menu,
		'opp' : opp
	};
	client.send(param);
	return json;
}

/**
 * 根据路径标签得到单签版本
 * @param {Object} path
 * @param {Object} tagName
 */
function ui_getElementsByTagName(path, tagName) {
	var file = Ti.Filesystem.getFile(path);
	var xmltext = file.read().text;
	var doc = Ti.XML.parseString(xmltext);
	var str = doc.documentElement.getElementsByTagName(tagName).item(0).text;
	return str;
}

/**
 * 当前版本
 */
function u_getCurrentVersion() {
	var db = Ti.Database.open('TXDE');
	var version = '';
	var sql = "select * from TX_APP  where id=1 ";
	Ti.API.info('SQL:' + sql);
	var row = db.execute(sql);
	while (row.isValidRow()) {
		version = row.field(3);
		row.next();
	}
	return version;
	db.close();
}

/**
 * 更新当前版本
 */
function u_setCurrentVersion(version) {
	Ti.API.info('----------------------------------------:update');
	var db = Ti.Database.open('TXDE');
	var version = '';
	var sql = "update TX_APP  set version=" + version + "where id=1 ";
	Ti.API.info('SQL:' + sql);
	var row = db.execute(sql);
	return version;
	db.close();
}

/**
 * 是否是更新的版本
 */
function u_checkVersion(version) {
	var opp = false;
	if (u_getCurrentVersion() != version) {
		opp = true;
		u_setCurrentVersion(version);
	}
	return opp;
}

/**
 * app版本检测
 * 读取服务器上的版本信息，按时间排序取最大
 * 如果是旧版本弹出框提示
 * 比对vision
 * @param {Object} app_version
 */
function u_checkAPPVersion(app_version) {
	var url = request_url + "mobile/getAPPVersion.do";
	var json;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("AJAX返回信息: " + this.responseText);
			if (this.responseText == 'false' || this.responseText == '0' || this.responseText == null) {
				
				json = this.responseText;alert(json);
			} else {
				json = JSON.parse(this.responseText);
				var service_app_version = json.version.version;
				if (app_version != service_app_version) {

					setTimeout(function() {

						var dialog = Ti.UI.createAlertDialog({
							cancel : 1,
							buttonNames : ['确定', '取消'],
							message : "有新版本：版本号" + service_app_version,
							title : '温馨提示'
						});
						dialog.addEventListener('click', function(e) {
							if (e.index ==0) {
								Ti.Platform.openURL('http://www.tjnetsky.com.cn/txgys/netsky_txde.apk');
							}
						});
						dialog.show();
					}, 10000);
				}
			};
		},
		onerror : function(e) {
			Ti.API.info('****************************************************:' + e.error);
		},
		timeout : 5000 // in milliseconds
	});
	client.open("GET", url);
	var param = {
	};
	client.send(param);
	return json;

}

