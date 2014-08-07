//关联主材,机械,仪表
Ti.include('../../basic/UI.js');
//设备分辨率级别
var dimension=ui_getDimension();

function deDetailTabGroup() {
    var deDetailTab = Ti.UI.createTabGroup({
        backgroundColor : 'white',
        navBarHidden : true,
    });
    var DEDetail = require('ui/window/DE_Detail');
    var TabListWindow = require('ui/window/TabListWindow');
    var deTab = Ti.UI.createTab({
        title : '定额信息',
        icon : '/images/'+dimension+'de.png',
        window : new DEDetail(deDetailTab),
        font : {
            color : 'black'
        },
    });
      
    var clTab = Ti.UI.createTab({
        title : '关联主材',
        icon : '/images/'+dimension+'zc.png',
        window : new TabListWindow('TA_ZCDAK', 'TA_DEZCTMP', deDetailTab)
    });
    var jxTab = Ti.UI.createTab({
        title : '关联机械',
        icon : '/images/'+dimension+'jx.png',
        window : new TabListWindow('TA_JXDAK', 'TA_DEJXTMP', deDetailTab)
    });
    var ybTab = Ti.UI.createTab({
        title : '关联仪表',
        icon : '/images/'+dimension+'yb.png',
        window : new TabListWindow('TA_YBDAK', 'TA_DEYBTMP', deDetailTab)
    });
    deDetailTab.addTab(deTab);
    deDetailTab.addTab(clTab);
    deDetailTab.addTab(jxTab);
    deDetailTab.addTab(ybTab);
    return deDetailTab;
}

module.exports = deDetailTabGroup;
