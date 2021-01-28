// 六十干支(かんし)
var zodiac = [
    ['甲子', 1, 'きのえね', '木+水+'], ['乙丑', 2, 'きのとうし', '木-土-'],
    ['丙寅', 3, 'ひのえとら', '火+木+'], ['丁卯', 4, 'ひのとう', '火-木-'],
    ['戊辰', 5, 'つちのえたつ', '土+土+'], ['己巳', 6, 'つちのとみ', '土-火-'],
    ['庚午', 7, 'かのえうま', '金+火+'], ['辛未', 8, 'かのとひつじ', '金-土-'],
    ['壬申', 9, 'みずのえさる', '水+金+'], ['癸酉', 10, 'みずのととり', '水-金-'],
    ['甲戌', 11, 'きのえいぬ', '木+土+'], ['乙亥', 12, 'きのとい', '木-水-'],
    ['丙子', 13, 'ひのえね', '火+水+'], ['丁丑', 14, 'ひのとうし', '火-土-'],
    ['戊寅', 15, 'つちのえとら', '土+木+'], ['己卯', 16, 'つちのとう', '土-木-'],
    ['庚辰', 17, 'かのえたつ', '金+土+'], ['辛巳', 18, 'かのとみ', '金-火-'],
    ['壬午', 19, 'みずのえうま', '水+火+'], ['癸未', 20, 'みずのとひつじ', '水-土-'],
    ['甲申', 21, 'きのえさる', '木+金+'], ['乙酉', 22, 'きのととり', '木-金-'],
    ['丙戌', 23, 'ひのえいぬ', '火+土+'], ['丁亥', 24, 'ひのとい', '火-水-'],
    ['戊子', 25, 'つちのえね', '土+水+'], ['己丑', 26, 'つちのとうし', '土-土-'],
    ['庚寅', 27, 'かのえとら', '金+木+'], ['辛卯', 28, 'かのとう', '金-木-'],
    ['壬辰', 29, 'みずのえたつ', '水+土+'], ['癸巳', 30, 'みずのとみ', '水-火-'],
    ['甲午', 31, 'きのえうま', '木+火+'], ['乙未', 32, 'きのとひつじ', '木-土-'],
    ['丙申', 33, 'ひのえさる', '火+金+'], ['丁酉', 34, 'ひのととり', '火-金-'],
    ['戊戌', 35, 'つちのえいぬ', '土+土+'], ['己亥', 36, 'つちのとい', '土-水-'],
    ['庚子', 37, 'かのえね', '金+水+'], ['辛丑', 38, 'かのとうし', '金-土-'],
    ['壬寅', 39, 'みずのえとら', '水+'], ['癸卯', 40, 'みずのとう', '水-木-'],
    ['甲辰', 41, 'きのえたつ', '土+'], ['乙巳', 42, 'きのとみ', '木-火-'],
    ['丙午', 43, 'ひのえうま', '火+火+'], ['丁未', 44, 'ひのとひつじ', '火-土-'],
    ['戊申', 45, 'つちのえさる', '土+'], ['己酉', 46, 'つちのととり', '土-金-'],
    ['庚戌', 47, 'かのえいぬ', '金+土+'], ['辛亥', 48, 'かのとい', '金-水-'],
    ['壬子', 49, 'みずのえね', '水+水+'], ['癸丑', 50, 'みずのとうし', '水-土-'],
    ['甲寅', 51, 'きのえとら', '木+木+'], ['乙卯', 52, 'きのとう', '木-木-'],
    ['丙辰', 53, 'ひのえたつ', '火+土+'], ['丁巳', 54, 'ひのとみ', '火-火-'],
    ['戊午', 55, 'つちのえうま', '土+火+'], ['己未', 56, 'つちのとひつじ', '土-土-'],
    ['庚申', 57, 'かのえさる', '金+金+'], ['辛酉', 58, 'かのととり', '金-金-'],
    ['壬戌', 59, 'みずのえいぬ', '水+土+'], ['癸亥', 60, 'みずのとい', '水-水-'],
];

$(function() {
    makeDateSelectBox();
});

function check() {
    var birth_year = Number($("select[name=birth_year]").val());
    var birth_month = Number($("select[name=birth_month]").val());
    var birth_day = Number($("select[name=birth_day]").val());
    var year = Number($("select[name=year]").val());
    var month = Number($("select[name=month]").val());
    var day = Number($("select[name=day]").val());

    if(!checkdate(birth_year, birth_month, birth_day)) {
        alert("生年月日を正しく入力してください。");
        return false;
    }
    if(!checkdate(year, month, day)) {
        alert("調べたい日付を正しく入力してください。");
        return false;
    }

    var birthDayZoadicNumber = getDayZoadicNumber(birth_year, birth_month, birth_day);
    getZoadicNumbers(birthDayZoadicNumber, birth_year, birth_month, birth_day, year, month, day);

    checkIchiryuManbai(year, month, day);
}

function makeDateSelectBox() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // 生年月日：年
    var birthYearHtml = $("<select>", {
        style: "width: 100px;",
        name: "birth_year"
    });

    for (var i = 1900; i <= year; i++) {
        if(i == 1990) {
            birthYearHtml.append( $("<option>", { text: i, selected: true }) );
        }
        else {
            birthYearHtml.append( $("<option>", { text: i }) );
        }
    }

    $("#birth_year").append(birthYearHtml);

    // 生年月日：月
    var birthMonthHtml = $("<select>", {
        style: "width: 60px;",
        name: "birth_month"
    });

    for (var i = 1; i <= 12; i++) {
        birthMonthHtml.append( $("<option>", { text: i }) );
    }

    $("#birth_month").append(birthMonthHtml);

    // 生年月日：日
    var birthDayHtml = $("<select>", {
        style: "width: 60px;",
        name: "birth_day"
    });

    for (var i = 1; i <= 31; i++) {
        birthDayHtml.append( $("<option>", { text: i }) );
    }

    $("#birth_day").append(birthDayHtml);

    // 年
    var yearHtml = $("<select>", {
        style: "width: 100px;",
        name: "year"
    });

    for (var i = 1900; i <= year; i++) {
        if(i == year) {
            yearHtml.append( $("<option>", { text: i, selected: true }) );
        }
        else {
            yearHtml.append( $("<option>", { text: i }) );
        }
    }

    $("#year").append(yearHtml);

    // 生年月日：月
    var monthHtml = $("<select>", {
        style: "width: 60px;",
        name: "month"
    });

    for (var i = 1; i <= 12; i++) {
        if(i == month) {
            monthHtml.append( $("<option>", { text: i, selected: true }) );
        }
        else {
            monthHtml.append( $("<option>", { text: i }) );
        }
    }

    $("#month").append(monthHtml);

    // 生年月日：日
    var dayHtml = $("<select>", {
        style: "width: 60px;",
        name: "day"
    });

    for (var i = 1; i <= 31; i++) {
        if(i == day) {
            dayHtml.append( $("<option>", { text: i, selected: true }) );
        }
        else {
            dayHtml.append( $("<option>", { text: i }) );
        }
    }

    $("#day").append(dayHtml);
}


function checkdate(year, month, day) {
    var date = new Date(year, month - 1, day);
    return (date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day);
}

function getDayZoadicNumber(year, month, day) {
    // 一般法
    var a = (year % 12) * 5;
    var b1 = (month < 3) ? Math.floor((year - 1) / 4) : Math.floor(year / 4);
    var b2 = (month < 3) ? Math.floor((year - 1) / 100) : Math.floor(year / 100);
    var b3 = (month < 3) ? Math.floor((year - 1) / 400) : Math.floor(year / 400);

    if(month == 1 || month == 5) var c = 9;
    if(month == 2 || month == 6) var c = 40;
    if(month == 3)  var c = 8;
    if(month == 4)  var c = 39;
    if(month == 7)  var c = 10;
    if(month == 8)  var c = 41;
    if(month == 9)  var c = 12;
    if(month == 10) var c = 42;
    if(month == 11) var c = 13;
    if(month == 12) var c = 43;

    var d = day;

    var z = a + b1 - b2 + b3 + c + d;
    var jikkan = z % 10 + 1;
    var junishi = z % 12 + 1;

    var strJikkan;
    var strJunishi;
    var dayZoadicNumber;

    zodiac.forEach(function(value) {
        if(value[1] == jikkan)  strJikkan = value[0].substr(0, 1);
        if(value[1] == junishi) strJunishi = value[0].substr(1, 1);

        if(strJikkan != null && strJunishi != null) return;
    });

    zodiac.forEach(function(value) {
        if(value[0] == strJikkan + strJunishi) {
            dayZoadicNumber = value;
            return;
        }
    });

    return dayZoadicNumber;
}

function getZoadicNumbers(birthDayZoadicNumber, birth_year, birth_month, birth_day, year, month, day) {
    // 立春より前なら前の年で計算
    var rissyun = getRissyun(year);
    var birthday = String(year);
    birthday += String(month).length == 1 ? '0' + String(month) : String(month);
    birthday += String(day).length   == 1 ? '0' + String(day) : String(day);
    birthday += '0000';
    var searchYear = (birthday < `${rissyun}`) ? year - 1 : year;

    var yearZodiacNumber = searchYear % 60 - 3;
    if(yearZodiacNumber < 1) yearZodiacNumber += 60;

    // 節入り日より前なら前の月で計算
    var setsuiriKey = getSetsuiriKey(year, month);
    var s = setsuiri[setsuiriKey];

    if(birthday < `${s}`){
        var searchMonth = month - 1;
        var prevSetsuiriDay = setsuiri[setsuiriKey - 1].substr(0, 8);
    }
    else {
        var searchMonth = $month;
        var prevSetsuiriDay = setsuiri[setsuiriKey].substr(0, 8);
    }

    var monthZodiacNumber = ((year - 1) * 12 + searchMonth) % 60 + 25;
    if(monthZodiacNumber > 60) monthZodiacNumber -= 60;

    var zoadicNumbers = [
        zodiac[yearZodiacNumber - 1],
        zodiac[monthZodiacNumber - 1],
        getDayZoadicNumber(year, month, day)
    ];

    makeDescription(birthDayZoadicNumber, zoadicNumbers, birth_year, birth_month, birth_day, year, month, day);
}

function getRissyun(year) {
    var result;
    var target = year + "02";

    setsuiri.forEach(function(value) {
        if(value.indexOf(target) !== false) {
            result = value;
            return;
        }
    });

    return result;
}

function getSetsuiriKey(year, month) {
    if(month.length == 1) month = "0" . month;
    else month = month;

    var result;
    var target = year + month;

    setsuiri.forEach(function(value, key) {
        if(value.indexOf(target) !== false) {
            result = key;
            return;
        }
    });

    return result;
}

function makeDescription(birthDayZoadicNumber, zoadicNumbers, birth_year, birth_month, birth_day, year, month, day) {
    var rokusei = '';
    var gosei = '';

    if(year % 2 == 0) {
        gosei += '金の';
    } else {
        gosei += '銀の';
    }

    if(birthDayZoadicNumber[1] <= 10) {
        rokusei += '土星人';
        gosei += '羅針盤';
    }
    else if(birthDayZoadicNumber[1] <= 20) {
        rokusei += '金星人';
        gosei += 'インディアン';
    }
    else if(birthDayZoadicNumber[1] <= 30) {
        rokusei += '火星人';
        gosei += '鳳凰';
    }
    else if(birthDayZoadicNumber[1] <= 40) {
        rokusei += '天王星人';
        gosei += '時計';
    }
    else if(birthDayZoadicNumber[1] <= 50) {
        rokusei += '木星人';
        gosei += 'カメレオン';
    }
    else {
        rokusei += '水星人';
        gosei += 'イルカ';
    }

    if(year % 2 == 0) {
        rokusei += '(+)';
    } else {
        rokusei += '(-)';
    }

    var zodiacSign;
    var birthday = (String(birth_month).length == 1) ? '0' + String(birth_month) : String(birth_month);
    birthday += (String(birth_day).length == 1) ? '0' + String(birth_day) : String(birth_day);
    if(birthday <= '0119') {
        zodiacSign = '山羊座';
    } else if(birthday <= '0218') {
        zodiacSign = '水瓶座';
    } else if(birthday <= '0320') {
        zodiacSign = '魚座';
    } else if(birthday <= '0419') {
        zodiacSign = '牡羊座';
    } else if(birthday <= '0520') {
        zodiacSign = '牡牛座';
    } else if(birthday <= '0621') {
        zodiacSign = '双子座';
    } else if(birthday <= '0722') {
        zodiacSign = '蟹座';
    } else if(birthday <= '0822') {
        zodiacSign = '獅子座';
    } else if(birthday <= '0922') {
        zodiacSign = '乙女座';
    } else if(birthday <= '1023') {
        zodiacSign = '天秤座';
    } else if(birthday <= '1122') {
        zodiacSign = '蠍座';
    } else if(birthday <= '1221') {
        zodiacSign = '射手座';
    } else {
        zodiacSign = '山羊座';
    }

    var kyusei;
    switch(birth_year % 9) {
        case 0:
            kyusei = '二黒土星';
            break;
        case 1:
            kyusei = '一白水星';
            break;
        case 2:
            kyusei = '九紫火星';
            break;
        case 3:
            kyusei = '八白土星';
            break;
        case 4:
            kyusei = '七赤金星';
            break;
        case 5:
            kyusei = '六白金星';
            break;
        case 6:
            kyusei = '五黄土星';
            break;
        case 7:
            kyusei = '四緑木星';
            break;
        case 8:
            kyusei = '三碧木星';
            break;
    }

    var text1 = `${birth_year}年${birth_month}月${birth_day}日生まれ`;
    var text2 = `四柱推命では${birthDayZoadicNumber[0]}（${birthDayZoadicNumber[2]},${birthDayZoadicNumber[3]}）`;
    var text3 = `六星占術では${rokusei}`;
    var text4 = `五星三心占いでは${gosei}`;
    var text5 = `九星気学では${kyusei}`;
    var text6 = `西洋占星術では${zodiacSign}`;
    var text7 = `あなたの${year}年${month}月${day}日（${zoadicNumbers[2][0]},${zoadicNumbers[1][0]},${zoadicNumbers[0][0]}）の運勢は …`;

    var html1 = $('<p>', {text: text1});
    html1.append($('<br>'));
    html1.append(text2);
    html1.append($('<br>'));
    html1.append(text3);
    html1.append($('<br>'));
    html1.append(text4);
    html1.append($('<br>'));
    html1.append(text5);
    html1.append($('<br>'));
    html1.append(text6);
    
    var html2 = $('<p>', {text: text7});

    $('.top').empty();
    $('.top').append(html1);

    $('.description').empty();
    $('.description').append(html2);

    makeDescription2(gosei);
}

function makeDescription2(gosei) {
    switch(gosei) {
        case '金の羅針盤':
            console.log('bbb');
            break;
        case '銀の羅針盤':
            break;
        case '':
            break;
        case '':
            break;
        case '':
            break;
        case '':
            break;
        case '':
            break;
    }
}

/**
 * 一粒万倍日かどうかチェックする。
 */
function checkIchiryuManbai(year, month, day) {
    $('.ichiryu').hide();
    $('.ichiryu span.date').text(year + '年' + month + '月' + day + '日');

    var target = String(year);
    target += String(month).length == 1 ? '0' + String(month) : String(month);
    target += String(day).length   == 1 ? '0' + String(day) : String(day);
    if($.inArray(target, ichiryu) !== -1) $('.ichiryu').show();
}
