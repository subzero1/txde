var height = Ti.Platform.displayCaps.platformHeight;
var width = Ti.Platform.displayCaps.platformWidth;
//构造菜单选项
function fun_createMenuItem(img_url, title, index) {
    var defaultFontSize = Ti.Platform.name === 'android' ? '16dip' : '14dip';
    var _view = Ti.UI.createView({
        width : '100%',
        height : 3 * height / 16,
        top : height * (1 + 2.4 * index) / 16,
    });
    var img = Ti.UI.createImageView({
        image : img_url,
        left : width * 4.5 / 16,
        top : 6,
        width : '54dip',
        height : '54dip'
    });
    var titleLabel = Ti.UI.createLabel({
        color : '#000',
        font : {
            fontFamily : 'Arial',
            fontSize : '22dip',
            fontWeight : 'bold'
        },
        text : title,
        left : width * 8 / 16,
        top : 6,
        width : 200,
        height : '48dip',
    });
    var labelDetails = Ti.UI.createLabel({
        color : '#222',
        font : {
            fontFamily : 'Arial',
            fontSize : defaultFontSize,
            fontWeight : 'normal'
        },
        text : 'Replied to post',
        left : width * 8 / 16,
        top : '40dip',
        width : 360
    });
    var lineImg = Ti.UI.createImageView({
        image : '/images/home_line_16.png',
        height : '1dip',
        width : '100%',
        bottom : '0'
    });
    _view.add(img);
    _view.add(titleLabel);
    _view.add(lineImg);
    _view.add(labelDetails);
    return _view;
}

//创建列表式菜单
function bmi_createMenuItemTableRow(img_url, title, subhead, index) {
    var tableRow = Ti.UI.createTableViewRow({
        className : 'forumEvent', // used to improve table performance
        selectedBackgroundColor : 'pink',
        rowIndex : index, // custom property, useful for determining the row during events
    });

    var img = Ti.UI.createImageView({
        image : img_url,
        left : '16dip',
        width : '42dip',
        height : '42dip'

    });
    var titleLabel = Ti.UI.createLabel({
        color : '#000',
        font : {
            fontFamily : 'Arial',
            fontSize : '22dip',
            fontWeight : 'bold'
        },
        text : title,
        left : '72dip',
        width : '256dip',
        height : '48dip',
    });
    var labelDetails = Ti.UI.createLabel({
        color : '#222',
        font : {
            fontFamily : 'Arial',
            fontSize : '13dip',
            fontWeight : 'normal'
        },
        text : subhead,
        left : '72dip',
        top : '40dip',
    });
    //右侧小箭头
    var rightImg = Ti.UI.createImageView({
        image : '/images/right.png',
        right : '10dip',
        width : '16dip',
        height : '16dip',
        zIndex : '1'
    });
    tableRow.add(img);
    tableRow.add(titleLabel);
    if (subhead != null && subhead != '') ;
    tableRow.add(labelDetails);
    tableRow.add(rightImg);
    return tableRow;
}