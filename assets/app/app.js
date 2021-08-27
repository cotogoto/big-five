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
            $('#disp1').hide();
            $('#disp2').hide();
            $('#disp3').hide();
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
                let numAverage = average([agreeableness, conscientiousness, extroversion, neuroticism, openness]);
                console.log("agreeableness:" + agreeableness);
                console.log("conscientiousness:" + conscientiousness);
                console.log("extroversion:" + extroversion);
                console.log("neuroticism:" + neuroticism);
                console.log("openness:" + openness);
                console.log("average:" + numAverage);
                // console.log("count:" + count);
                const data = {
                    labels: ['A:協調性', 'C:誠実性', 'E:外向性', 'N:神経症傾向', 'O:開放性'],
                    datasets: [{
                        label: 'Big Five',
                        data: [agreeableness, conscientiousness, extroversion, neuroticism, openness]
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
                                suggestedMax: 50
                            }
                        }
                    },
                };

                TestCtrl._myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
                
                let agreeablenessFlg = false;
                let conscientiousnessFlg = false;
                let extroversionFlg = false;
                let neuroticismFlg = false;
                let opennessFlg = false;
                // 協調性 (A: Agreeableness)
                if (agreeableness >= numAverage) {
                    agreeablenessFlg = true;
                }
                // 誠実性 (C: Conscientiousness)
                if (conscientiousness >= numAverage) {
                    conscientiousnessFlg = true;
                }
                // 外向性 (E: Extroversion)
                if (extroversion >= numAverage) {
                    extroversionFlg = true;
                }
                // 神経症傾向 (N: Neuroticism)
                if (neuroticism >= numAverage) {
                    neuroticismFlg = true;
                }
                // 開放性 (O: Openness to Experience)
                if (openness >= numAverage) {
                    opennessFlg = true;
                }
                // AC
                let AC = '無謀、非協力的、信頼できない、疑い深い、思慮がない';
                if (agreeablenessFlg == true && conscientiousnessFlg == true) {
                    AC = '頼りになる、責任感がある、信頼できる、礼儀正しい、思いやりがある';
                } else if (agreeablenessFlg == false && conscientiousnessFlg == true) {
                    AC = '人を寄せ付けない、厳格、融通がきかない';
                } else if (agreeablenessFlg == true && conscientiousnessFlg == false) {
                    AC = '謙遜、でしゃばらない';
                }
                // AE
                let AE = '懐疑的、用心深い、引きこもりがち、無口、非社交的';
                if (agreeablenessFlg == true && extroversionFlg == true) {
                    AE = '社交的、精力的、熱狂的、話し好き、生き生きとした';
                } else if (agreeablenessFlg == false && extroversionFlg == true) {
                    AE = '意固地、強引、傲慢、高慢、威張り屋';
                } else if (agreeablenessFlg == true && extroversionFlg == false) {
                    AE = '非攻撃的、つつましい、従順、臆病、迎合的';
                }
                // AN
                let AN = '冷淡、無神経、愛情がない、情熱がない';
                if (agreeablenessFlg == true && neuroticismFlg == true) {
                    AN = '情にもろい、だまされやすい、優しい、敏感、柔和';
                } else if (agreeablenessFlg == false && neuroticismFlg == true) {
                    AN = '神経質、短気、けんか好き、せっかち、怒りっぽい';
                } else if (agreeablenessFlg == true && neuroticismFlg == false) {
                    AN = '忍耐強い、寛大な、多くを求めない、現実的';
                }
                // AO
                let AO = '粗野、機転が利かない、ぶっきらぼう、心が狭い、冷淡';
                if (agreeablenessFlg == true && opennessFlg == true) {
                    AO = '理想主義、外交的、深みがある、気が利く、愛想の良い';
                } else if (agreeablenessFlg == false && opennessFlg == true) {
                    AO = '抜けめがない、風変わり、個人主義';
                } else if (agreeablenessFlg == true && opennessFlg == false) {
                    AO = '単純、依存';
                }
                // CE
                let CE = 'ひねくれ、非精力的、怠惰、粘り強くない、どっちつかず';
                if (conscientiousnessFlg == true && extroversionFlg == true) {
                    CE = 'アクティブ、競争好き、粘り強い、野心的、目的を持つ';
                } else if (conscientiousnessFlg == false && extroversionFlg == true) {
                    CE = '乱暴、わんぱく、自己顕示、社交的、示威的';
                } else if (conscientiousnessFlg == true && extroversionFlg == false) {
                    CE = '控えめ、真面目、慎重、用心深い、信念を持つ';
                }
                // CN
                let CN = '形式張らない、控えめ';
                if (conscientiousnessFlg == true && neuroticismFlg == true) {
                    CN = '几帳面、神経質';
                } else if (conscientiousnessFlg == false && neuroticismFlg == true) {
                    CN = '無理強いする、せんさく好き、身勝手、忘れっぽい、直情的';
                } else if (conscientiousnessFlg == true && neuroticismFlg == false) {
                    CN = '理性がある、客観的、堅実、論理的、決断力がある';
                }
                // CO
                let CO = '近視眼的、無鉄砲、非論理的、未熟、行き当たりばったり';
                if (conscientiousnessFlg == true && opennessFlg == true) {
                    CO = '分析的、知覚が鋭い、情報通、歯切れが良い、威厳がある';
                } else if (conscientiousnessFlg == false && opennessFlg == true) {
                    CO = '型破り、風変わり';
                } else if (conscientiousnessFlg == true && opennessFlg == false) {
                    CO = '慣習的、伝統的';
                }
                // EN
                let EN = '控えめ、容易に興奮しない、穏やか、落ち着いた';
                if (extroversionFlg == true && neuroticismFlg == true) {
                    EN = '興奮しやすい、言葉数が多い、浮気な、激しやすい、とっぴな';
                } else if (extroversionFlg == false && neuroticismFlg == true) {
                    EN = '用心深い、気難しい、不安、悲観的、秘密主義';
                } else if (extroversionFlg == true && neuroticismFlg == false) {
                    EN = '自意識が強くない、うんざりしない、根気のよい';
                }
                // EO
                let EO = '予測可能、平凡、陰気、無感動、冒険心のない';
                if (extroversionFlg == true && opennessFlg == true) {
                    EO = '世俗的、演劇的、雄弁、詮索好き、熱烈';
                } else if (extroversionFlg == false && opennessFlg == true) {
                    EO = '内省的、瞑想的、熟慮、自省的、内面志向型';
                } else if (extroversionFlg == true && opennessFlg == false) {
                    EO = 'くどい、無節操、気取った';
                }
                // NO
                let NO = '冷静、鈍感';
                if (neuroticismFlg == true && opennessFlg == true) {
                    NO = '情熱的、興奮しやすい、官能的';
                } else if (neuroticismFlg == false && opennessFlg == true) {
                    NO = '創造的、知的、洞察力がある、多才、独創的';
                } else if (neuroticismFlg == true && opennessFlg == false) {
                    NO = '取り乱しやすい、腹を立てやすい、懸念深い';
                }
                // AC
                console.log("AC:" + AC);
                $('#AC').text(AC);
                // AE
                console.log("AE:" + AE);
                $('#AE').text(AE);
                // AN
                console.log("AN:" + AN);
                $('#AN').text(AN);
                // AO
                console.log("AO:" + AO);
                $('#AO').text(AO);
                // CE
                console.log("CE:" + CE);
                $('#CE').text(CE);
                // CN
                console.log("CN:" + CN);
                $('#CN').text(CN);
                // CO
                console.log("CO:" + CO);
                $('#CO').text(CO);
                // EN
                console.log("EN:" + EN);
                $('#EN').text(EN);
                // EO
                console.log("EO:" + EO);
                $('#EO').text(EO);
                // NO
                console.log("NO:" + NO);
                $('#NO').text(NO);
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
                $('#disp1').show();
                $('#disp2').show();
                $('#disp3').show();
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