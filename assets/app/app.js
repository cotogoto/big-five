/*
 * タイトル：テスト画面JS
 * 説明    ：
 * 著作権  ：Copyright(c) 2021 LivLog llc.
 * 会社名  ：リブログ合同会社
 * 変更履歴：2021.01.23
 *         ：新規登録
 */
//34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
const TestCtrl = {
//+----- ↓定数・変数の設定ココから -----------------------------------------------------------------+
    _className: 'TestCtrl',
    _myChart: null,
//+----- ↓functionの記述ココから -----------------------------------------------------------------+
    init: function UN_init() {
        const _functionName = 'UN_init';

        try {
            Util.startWriteLog(TestCtrl._className,_functionName);
            // 処理開始
            $('#send').click(function(e){
                TestCtrl.send(e);
            });
            $('#wagahaiwaNekodearu').click(function(e){
                $.get("wagahaiwa_nekodearu.txt", function(data){
                    $("#inputText").val(data);
                });
            });
            $('#sanshiro').click(function(e){
                $.get("sanshiro.txt", function(data){
                    $("#inputText").val(data);
                });
            });
            $('#freeText').click(function(e){
                $("#inputText").val("");
            });
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(TestCtrl._className,_functionName);
        }
    },

    send: function UN_send(e) {
        var _functionName = 'UN_send',
            _check ='',
            _text = '',
            _url = '';

        try {
            Util.startWriteLog(TestCtrl._className,_functionName);
            // 処理開始
            if (TestCtrl._myChart != null) {
                TestCtrl._myChart.destroy();
            }
            
            _check = $('input[name="inputCheck"]:checked').val();
            if (_check == '1') {
                _text = $('#inputText').val();
            } else {
                _url = $('#inputUrl').val();
                if (!validURL(_url)) {
                    alert('正しいURLを入力してください。');
                    return;
                }
            }

            $('#send').prop('disabled', true);
            $.ajax({
                url:'https://app.cotogoto.ai/webapi/bigFive',
                // url:'http://localhost:8080/webapi/emotionalExpression',
                dataType:'json',
                type:'post',
                data:{
                    'text': _text,
                    'url': _url,
                }
            })
            // Ajaxリクエストが成功した時発動
            .done( (ret) => {
                logger.info(ret);
                let agreeableness = 0;
                let conscientiousness = 0;
                let extroversion = 0;
                let neuroticism = 0;
                let openness = 0;
                let count = 0;
                for (row of ret) {
                    agreeableness += row.agreeableness;
                    conscientiousness += row.conscientiousness;
                    extroversion += row.extroversion;
                    neuroticism += row.neuroticism;
                    openness += row.openness;
                    count += row.count;
                }
                agreeableness = agreeableness / count * 100;
                conscientiousness = conscientiousness / count * 100;
                extroversion = extroversion / count * 100;
                neuroticism = neuroticism / count * 100;
                openness = openness / count * 100;
                console.log("agreeableness:" + agreeableness);
                console.log("conscientiousness:" + conscientiousness);
                console.log("extroversion:" + extroversion);
                console.log("neuroticism:" + neuroticism);
                console.log("openness:" + openness);
                // console.log("count:" + count);
                // 外向性 (E: Extroversion)
                // 協調性 (A: Agreeableness)
                // 勤勉性 (C: Conscientiousness)
                // 情緒不安定性 (N: Neuroticism)
                // 経験への開放性 (O: Openness to Experience)
                const data = {
                    labels: ['外向性', '協調性', '勤勉性', '情緒不安定性', '経験への開放性'],
                    datasets: [{
                        label: 'Big Five',
                        data: [extroversion, agreeableness, conscientiousness, neuroticism, openness]
                    }]
                }

                const config = {
                    type: 'radar',
                    data: data,
                    options: {
                        responsive: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            title: {
                                display: false,
                                text: 'Big Five'
                            },
                        },
                        scales: {
                            r: {
                                suggestedMin: 1,
                                suggestedMax: 100
                            }
                        }
                    },
                };

                TestCtrl._myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (jqXHR, textStatus, errorThrown) => {
                alert('感情分類の推定に失敗しました。');
                console.log("ajax通信に失敗しました");
                console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
                console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
                console.log("errorThrown    : " + errorThrown.message); // 例外情報
            })
            // Ajaxリクエストが成功・失敗どちらでも発動
            .always( (data) => {
                $('#send').prop('disabled', false);
            });
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
            $('#send').prop('disabled', false);
        }
        finally {
            Util.endWriteLog(TestCtrl._className,_functionName);
        }
    },

};

$(document).ready(function() {
    TestCtrl.init();
});

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}