/*
 * タイトル：ユーティリティ処理JS
 * 説明    ：
 * 著作権  ：Copyright(c) 2019 rojineco project.
 * 会社名  ：ロジねこプロジェクト
 * 変更履歴：2015.01.27
 *         ：新規登録
 */
//34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
const logger = logdown('Emotional Expression')
logger.state.isEnabled = true;
const Util = {
//+----- ↓定数・変数の設定ココから -----------------------------------------------------------------+
    _className: 'Util',
//+----- ↓functionの記述ココから -----------------------------------------------------------------+
    startWriteLog: function UN_startWriteLog(className,functionName) {
        var _date = new Date(),
            _log = '';
        //2015-03-14 18:06:09,836 [chronos-pool-6-thread-1] INFO  jp.linedesign.noby.api.task.AutomaticTask - jp.ne.docomo.smt.dev.dialogue.data.DialogueResultData@4eb6e36b
        _log += formatDate(_date) + ' ';
        _log += '[' + className + '] ' + functionName + ' - Start';
        logger.info(_log);
    },

    endWriteLog: function UN_endWriteLog(className,functionName) {
        var _date = new Date(),
        _log = '';
        //2015-03-14 18:06:09,836 [chronos-pool-6-thread-1] INFO  jp.linedesign.noby.api.task.AutomaticTask - jp.ne.docomo.smt.dev.dialogue.data.DialogueResultData@4eb6e36b
        _log += formatDate(_date) + ' ';
        _log += '[' + className + '] ' + functionName + ' - End';
        logger.info(_log);
    },

    getColor: function UN_getColor(no) {
        var colors = ['#1abc9c',
                      '#f1c40f',
                      '#2ecc71',
                      '#e67e22',
                      '#3498db',
                      '#e74c3c',
                      '#9b59b6',
                      '#16a085',
                      '#f39c12',
                      '#27ae60',
                      '#d35400',
                      '#2980b9',
                      '#c0392b',
                      '#8e44ad'];
        var i = no % 14;

        return colors[i];
    },

    uuid: function UN_uuid() {
        var uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    },

    doTest: function UN_doTest() {
        alert('ようこそ！');
    },

};

/**
 * タイムスタンプ出力
 * @param date
 * @param format
 * @returns {String}
 */
function formatDate(date, format) {
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
}

String.prototype.trim = function() {
    return this.replace(/^[\s　]+|[\s　]+$/g, '');
}
String.prototype.ltrim = function() {
    return this.replace(/^[\s　]+/, '');
}
String.prototype.rtrim = function() {
    return this.replace(/[\s　]+$/, '');
}

function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function parseStrToBoolean(str) {
    // 文字列を判定
    return (str == 'true') ? true : false;
}

function printProperties(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + '=' + obj[prop] + '\n';
    }
    logger.log(properties);
}

function getUrlVars() {
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

        //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    hash  = url.slice(1).split('&');
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return vars;
}

var sum = function(arr, fn) {
    if (fn) {
        return sum(arr.map(fn));
    }
    else {
        return arr.reduce(function(prev, current, i, arr) {
                return prev+current;
        });
    }
};
var average = function(arr, fn) {
    return sum(arr, fn)/arr.length;
};
var median = function(arr, fn) {
    var half = (arr.length/2)|0;
    var temp = arr.sort(fn);
    if (temp.length%2) {
        return temp[half];
    }
    return (temp[half-1] + temp[half])/2;
};