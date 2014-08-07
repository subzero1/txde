//创建win对象指向当前窗口即登录窗口
Ti.include('../../basic/UI.js');
var win = Titanium.UI.currentWindow;
var db = Ti.Database.open('TXDE');

var height = Ti.Platform.displayCaps.platformHeight;
var width = Ti.Platform.displayCaps.platformWidth;
var top = height / 16;
var scrollView = Ti.UI.createScrollView({
});
//选择册
createTitleLabel('定额册:', scrollView, '48dip');
var bookPicker = Ti.UI.createPicker({
    top : '88dip',
    width : '95%',
});
setBookPicker();

//选择章
createTitleLabel('定额章:',scrollView, '143dip');
var chapterPicker = Ti.UI.createPicker({
    top : '183dip',
    width : '95%',
});
// chapterPicker.hide();

//选择节
createTitleLabel('定额节:', scrollView, '238dip');
var sectorPicker = Ti.UI.createPicker({
    top : '278dip',
    width : '95%',
});
//sectorPicker.hide();

var queryBtn = Titanium.UI.createButton({
    title : '定   额   查   询',
    top : '366dip',
    width : '95%',
    borderRadius : 1,
    font : {
        fontFamily : 'Arial',
        fontSize : '20dip'
    },
    verticalAlign : 'center'
});
scrollView.add(bookPicker);
scrollView.add(chapterPicker);
scrollView.add(sectorPicker);
scrollView.add(queryBtn);
//添加顶部工具条
var headView = fun_createHeadViewBar();
fun_createReturnBtn(headView, win);
win.add(headView);
win.add(scrollView);

//事件

//set the text of chapterPicker
bookPicker.addEventListener('change', function(e) {
    setChapterPicker(e.row.text);
    sectorPicker.setColumns({});
    if (bookPicker.getSelectedRow(0).text==null||bookPicker.getSelectedRow(0).text=='') {
        chapterPicker.hide();
        sectorPicker.hide();
    }else{
        chapterPicker.show(); 
    }
});

//set the text of sectorPicker
chapterPicker.addEventListener('change', function(e) {
    setSectorPicker(e.row.text);
    if(chapterPicker.getSelectedRow(0).text==null||chapterPicker.getSelectedRow(0).text==''){
        sectorPicker.hide();
    }else{
        sectorPicker.show();
    }
});
queryBtn.addEventListener('click', function(e) {
    win = Ti.UI.createWindow({
        title : '定额搜索结果',
        backgroundColor : 'white',
        url : '/ui/window/decx/deResult.js'
    });
    clearProperty();
    if (bookPicker.getSelectedRow(0).text==null||bookPicker.getSelectedRow(0).text=='') {
        alert('请选择定额册');
    }else if(chapterPicker.getSelectedRow(0).text==null||chapterPicker.getSelectedRow(0).text==''){
        alert('请选择定额章');
    }else{
        Ti.App.Properties.setString('book', bookPicker.getSelectedRow(0).text);
        Ti.App.Properties.setString('chapter', chapterPicker.getSelectedRow(0).text);
        if(sectorPicker.getSelectedRow(0).text!=null||sectorPicker.getSelectedRow(0).text!=''){
            Ti.App.Properties.setString('sector', sectorPicker.getSelectedRow(0).text);    
        } 
        win.open();     
    };
});

//设置册列表值
function setBookPicker() {
    var hql = 'select * from TA_BOOK order by id limit 0,10';
    Ti.API.info(hql);
    var bookRows = db.execute(hql);
    var bookData = [];
    var i = 1;
    bookData[0] = Ti.UI.createPickerRow({
        title : '请选择定额册',
        text : ''
    });
    while (bookRows.isValidRow()) {
        bookData[i] = Ti.UI.createPickerRow({
            title : (bookRows.field(0))+'、'+bookRows.field(2),
            text : bookRows.field(1)
        });
        i++;
        bookRows.next();
    }
    bookRows.close();
    bookPicker.add(bookData);
    bookPicker.selectionIndicator = true;
}

//设置章列表值
function setChapterPicker(param) {
    var hql = "select * from ta_chapter where 1=1 ";
    hql += "and book='" + param;
    hql += "' order by book,chapter limit 10 offset 0";
    Ti.API.info(hql);
    var chapterRows = db.execute(hql);
    var chapterDataColumns = Ti.UI.createPickerColumn();
    var chapterData;
    var i = 1;
    chapterData = Ti.UI.createPickerRow({
        title : '请选择定额章',
        text : ''
    });
    chapterDataColumns.add(chapterData);
    while (chapterRows.isValidRow()) {
        chapterData = Ti.UI.createPickerRow({
            title : chapterRows.field(2) + '、 ' + chapterRows.field(3),
            text : chapterRows.field(2)
        });
        chapterDataColumns.add(chapterData);
        i++;
        chapterRows.next();
    }
    chapterRows.close();
    // chapterPicker.add(chapterData);
    chapterPicker.setColumns(chapterDataColumns);
    chapterPicker.selectionIndicator = true;
}

//设置节列表值
function setSectorPicker(param) {
    var hql = "select * from TA_SECTOR where 1=1 ";
    hql += "and chapter='" + param;
    hql += "' order by book,chapter,sector,sectord limit 10 offset 0";
    Ti.API.info(hql);
    var sectorRows = db.execute(hql);
    var sectorData ;
    var sectorDataColumns=Ti.UI.createPickerColumn({ }) ;
    var i = 1;
    sectorData = Ti.UI.createPickerRow({
        title : '请选择定额节',
        text : ''
    });
    sectorDataColumns.add(sectorData);
    while (sectorRows.isValidRow()) {
        sectorData = Ti.UI.createPickerRow({
            title : sectorRows.field(4)+'/'+sectorRows.field(3) + ' ' + sectorRows.field(5),
            text : sectorRows.field(4)
        });
        sectorDataColumns.add(sectorData);
        i++;
        sectorRows.next();
    }
    sectorRows.close();
    sectorPicker.setColumns(sectorDataColumns);
    sectorPicker.selectionIndicator = true;
}

//建立标题标签
function createTitleLabel(title, view, height) {
    var top = height / 16;
    var titleLabel = Ti.UI.createLabel({
        color : '#000',
        font : {
            fontFamily : 'Arial',
            fontSize : '20dip',
            fontWeight : 'bold'
        },
        text : title,
        left : '5%',
        top : height,
    });
    view.add(titleLabel);
}

function clearProperty() {
    Ti.App.Properties.removeProperty('bhmc');
}
