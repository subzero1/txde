//通过GPS定位得到地点,经纬度
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
    // var url = "http://192.168.0.132:8080/gys/mobile/userLog.do";
    var url = "http://tjnetsky.web.myjhost.net/gys/mobile/userLog.do";
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            Ti.API.info("Received text: " + this.responseText);
            if (this.responseText == 'false'||this.responseText=='0'||this.responseText==null) {
                su_updateInstallInfo();
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
    return firstInstall;
    db.close();
}

//更新安装信息
function su_updateInstallInfo() {
    var db = Ti.Database.open('TXDE');
    var currentDate = new Date();
    var dateString = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
    dateString += ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
    var sql = "update TX_APP set first_install='true',install_time='"+dateString+"' where id=1 ";
    Ti.API.info('SQL:'+sql);
    db.execute(sql);
    db.close();
}