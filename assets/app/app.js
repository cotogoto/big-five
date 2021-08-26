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
            $("#result").html("");
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
                url:'https://app.cotogoto.ai/webapi/emotionalExpression',
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
                let joy1 = 0;
                let joy2 = 0;
                let joy3 = 0;
                let joy4 = 0;
                let joy5 = 0;
                let anger1 = 0;
                let anger2 = 0;
                let anger3 = 0;
                let anger4 = 0;
                let anger5 = 0;
                let sorrow1 = 0;
                let sorrow2 = 0;
                let sorrow3 = 0;
                let sorrow4 = 0;
                let sorrow5 = 0;
                let sorrow6 = 0;
                let fear1 = 0;
                let fear2 = 0;
                let fear3 = 0;
                let fear4 = 0;
                let fear5 = 0;
                let embarrassed1 = 0;
                let embarrassed2 = 0;
                let embarrassed3 = 0;
                let embarrassed4 = 0;
                let embarrassed5 = 0;
                let like1 = 0;
                let like2 = 0;
                let like3 = 0;
                let like4 = 0;
                let like5 = 0;
                let hate1 = 0;
                let hate2 = 0;
                let hate3 = 0;
                let hate4 = 0;
                let hate5 = 0;
                let hate6 = 0;
                let resentment1 = 0;
                let resentment2 = 0;
                let resentment3 = 0;
                let resentment4 = 0;
                let relief1 = 0;
                let relief2 = 0;
                let relief3 = 0;
                let relief4 = 0;
                let astonishment1 = 0;
                let astonishment2 = 0;
                let astonishment3 = 0;
                let astonishment4 = 0;
                let parent = [];
                let joy = { "name": "喜", "children": [] }
                let anger = { "name": "怒", "children": [] }
                let sorrow = { "name": "哀", "children": [] }
                let fear = { "name": "怖", "children": [] }
                let embarrassed = { "name": "恥", "children": [] }
                let like = { "name": "好", "children": [] }
                let hate = { "name": "厭", "children": [] }
                let resentment = { "name": "昂", "children": [] }
                let relief = { "name": "安", "children": [] }
                let astonishment = { "name": "驚", "children": [] }
          
                for (const item in ret) {
                    const param = ret[item];
                    joy1 += param.joy1;
                    joy2 += param.joy2;
                    joy3 += param.joy3;
                    joy4 += param.joy4;
                    joy5 += param.joy5;
                    anger1 += param.anger1;
                    anger2 += param.anger2;
                    anger3 += param.anger3;
                    anger4 += param.anger4;
                    anger5 += param.anger5;
                    sorrow1 += param.sorrow1;
                    sorrow2 += param.sorrow2;
                    sorrow3 += param.sorrow3;
                    sorrow4 += param.sorrow4;
                    sorrow5 += param.sorrow5;
                    sorrow6 += param.sorrow6;
                    fear1 += param.fear1;
                    fear2 += param.fear2;
                    fear3 += param.fear3;
                    fear4 += param.fear4;
                    fear5 += param.fear5;
                    embarrassed1 += param.embarrassed1;
                    embarrassed2 += param.embarrassed2;
                    embarrassed3 += param.embarrassed3;
                    embarrassed4 += param.embarrassed4;
                    embarrassed5 += param.embarrassed5;
                    like1 += param.like1;
                    like2 += param.like2;
                    like3 += param.like3;
                    like4 += param.like4;
                    like5 += param.like5;
                    hate1 += param.hate1;
                    hate2 += param.hate2;
                    hate3 += param.hate3;
                    hate4 += param.hate4;
                    hate5 += param.hate5;
                    hate6 += param.hate6;
                    resentment1 += param.resentment1;
                    resentment2 += param.resentment2;
                    resentment3 += param.resentment3;
                    resentment4 += param.resentment4;
                    relief1 += param.relief1;
                    relief2 += param.relief2;
                    relief3 += param.relief3;
                    relief4 += param.relief4;
                    astonishment1 += param.astonishment1;
                    astonishment2 += param.astonishment2;
                    astonishment3 += param.astonishment3;
                    astonishment4 += param.astonishment4;
                }

                if (joy1 > 0) {
                    joy.children.push({ "name": "楽（楽しさ）", "value": joy1 });
                }
                if (joy2 > 0) {
                    joy.children.push({ "name": "誇（誇らしい）", "value": joy2 });    
                }
                if (joy3 > 0) {
                    joy.children.push({ "name": "動（感動）", "value": joy3 });
                }
                if (joy4 > 0) {
                    joy.children.push({ "name": "喜（喜び）", "value": joy4 }); 
                }
                if (joy5 > 0) {
                    joy.children.push({ "name": "祝（祝う気持ち）", "value": joy5 }); 
                }
                if (anger1 > 0) {
                    anger.children.push({ "name": "憎（憎い）", "value": anger1 });
                }
                if (anger2 > 0) {
                    anger.children.push({ "name": "見（見下し）", "value": anger2 });
                }
                if (anger3 > 0) {
                    anger.children.push({ "name": "不（不満）", "value": anger3 });
                }
                if (anger4 > 0) {
                    anger.children.push({ "name": "怒（怒り）", "value": anger4 });  
                }
                if (anger5 > 0) {
                    anger.children.push({ "name": "恨（恨み）", "value": anger5 });
                }
                if (sorrow1 > 0) {
                    sorrow.children.push({ "name": "悲（悲しさ）", "value": sorrow1 });
                }
                if (sorrow2 > 0) {
                    sorrow.children.push({ "name": "寂（寂しさ）", "value": sorrow2 });    
                }      
                if (sorrow3 > 0) {
                    sorrow.children.push({ "name": "切（切なさ）", "value": sorrow3 });
                } 
                if (sorrow4 > 0) {
                    sorrow.children.push({ "name": "失（失望）", "value": sorrow4 });
                } 
                if (sorrow5 > 0) {
                    sorrow.children.push({ "name": "憐（あわれみ）", "value": sorrow5 });     
                } 
                if (sorrow6 > 0) {
                    sorrow.children.push({ "name": "情（情けない）", "value": sorrow6 });
                } 
                if (fear1 > 0) {
                    fear.children.push({ "name": "鬱（憂鬱）", "value": fear1 });    
                } 
                if (fear2 > 0) {
                    fear.children.push({ "name": "苦（苦しさ）", "value": fear2 });   
                } 
                if (fear3 > 0) {
                    fear.children.push({ "name": "ふ（不安）", "value": fear3 });  
                }  
                if (fear4 > 0) {
                    fear.children.push({ "name": "辛（辛さ）", "value": fear4 });   
                } 
                if (fear5 > 0) {
                    fear.children.push({ "name": "怖（恐怖）", "value": fear5 }); 
                } 
                if (embarrassed1 > 0) {
                    embarrassed.children.push({ "name": "謝（謝罪）", "value": embarrassed1 });
                } 
                if (embarrassed2 > 0) {
                    embarrassed.children.push({ "name": "恥（恥ずかしい）", "value": embarrassed2 });
                } 
                if (embarrassed3 > 0) {
                    embarrassed.children.push({ "name": "悔（悔しさ）", "value": embarrassed3 });
                } 
                if (embarrassed4 > 0) {
                    embarrassed.children.push({ "name": "き（きまずさ）", "value": embarrassed4 });
                } 
                if (embarrassed5 > 0) {
                    embarrassed.children.push({ "name": "悩（悩み）", "value": embarrassed5 }); 
                }
                if (like1 > 0) {
                    like.children.push({ "name": "親（親しみ）", "value": like1 });
                } 
                if (like2 > 0) {
                    like.children.push({ "name": "尊（尊敬・尊さ）", "value": like2 });
                } 
                if (like3 > 0) {
                    like.children.push({ "name": "感（感謝）", "value": like3 });    
                } 
                if (like4 > 0) {
                    like.children.push({ "name": "好（好き）", "value": like4 });  
                } 
                if (like5 > 0) {
                    like.children.push({ "name": "願（願望）", "value": like5 });
                } 
                if (hate1 > 0) {
                    hate.children.push({ "name": "た（ためらい）", "value": hate1 });
                } 
                if (hate2 > 0) {
                    hate.children.push({ "name": "Ｆ（不快）", "value": hate2 });  
                } 
                if (hate3 > 0) {
                    hate.children.push({ "name": "怠（怠さ）", "value": hate3 });
                } 
                if (hate4 > 0) {
                    hate.children.push({ "name": "あ（あきれ）", "value": hate4 });
                } 
                if (hate5 > 0) {
                    hate.children.push({ "name": "妬（妬み）", "value": hate5 }); 
                } 
                if (hate6 > 0) {
                    hate.children.push({ "name": "嫌（嫌悪）", "value": hate6 });
                }
                if (resentment1 > 0) {
                    resentment.children.push({ "name": "心（心配）", "value": resentment1 }); 
                }         
                if (resentment2 > 0) {
                    resentment.children.push({ "name": "焦（焦り）", "value": resentment2 });      
                }   
                if (resentment3 > 0) {
                    resentment.children.push({ "name": "興（興奮）", "value": resentment3 });
                }   
                if (resentment4 > 0) {
                    resentment.children.push({ "name": "緊（緊張）", "value": resentment4 });
                }   
                if (relief1 > 0) {
                    relief.children.push({ "name": "安（安らぎ）", "value": relief1 });   
                }   
                if (relief2 > 0) {
                    relief.children.push({ "name": "気（気持ちが良い）", "value": relief2 });       
                }   
                if (relief3 > 0) {
                    relief.children.push({ "name": "穏（穏やか）", "value": relief3 });      
                }   
                if (relief4 > 0) {
                    relief.children.push({ "name": "幸（幸福感）", "value": relief4 });
                }   
                if (astonishment1 > 0) {
                    astonishment.children.push({ "name": "驚（驚き）", "value": astonishment1 });
                }   
                if (astonishment2 > 0) {
                    astonishment.children.push({ "name": "困（困惑）", "value": astonishment2 });
                }   
                if (astonishment3 > 0) {
                    astonishment.children.push({ "name": "残（残念）", "value": astonishment3 });  
                }   
                if (astonishment4 > 0) {
                    astonishment.children.push({ "name": "恐（恐れ）", "value": astonishment4 });
                }   

                if (joy.children.length > 0) {
                    parent.push(joy);
                }
                if (anger.children.length > 0) {
                    parent.push(anger);
                }
                if (sorrow.children.length > 0) {
                    parent.push(sorrow);
                }
                if (fear.children.length > 0) {
                    parent.push(fear);
                }
                if (embarrassed.children.length > 0) {
                    parent.push(embarrassed);
                }
                if (like.children.length > 0) {
                    parent.push(like);
                }
                if (hate.children.length > 0) {
                    parent.push(hate);
                }
                if (resentment.children.length > 0) {
                    parent.push(resentment);
                }
                if (relief.children.length > 0) {
                    parent.push(relief);
                }
                if (astonishment.children.length > 0) {
                    parent.push(astonishment);
                }

                // 1. 描画用のデータ準備
                var width = 800;
                var height = 600;
                var radius = Math.min(width, height) / 2;
                
                var data = {
                    "name": "感情分類",
                    "children": parent,
                };
                
                // 2. SVG表示用要素の設定
                var svg = d3.select("#result").append("svg").attr("width", width).attr("height", height);
                g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
                
                // 3. 描画用スケールの設定
                var colorScale = d3.scaleOrdinal().range([
                    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
                ]);
                
                var rScale = d3.scaleLinear()
                    .domain([0, radius])
                    .range([0, radius]);
                
                // 4. 描画用のデータ変換
                root = d3.hierarchy(data);
                root.sum(function(d) { return d.value; })
                    .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
                
                var partition = d3.partition()
                    .size([2 * Math.PI, radius]);
                
                partition(root);
                
                // 5. SVG要素の設定
                var arc = d3.arc()
                    .startAngle(function(d) { return d.x0; })
                    .endAngle(function(d) { return d.x1; })
                    .innerRadius(function(d) { return rScale(d.y0); })
                    .outerRadius(function(d) { return rScale(d.y1); });
                
                g.selectAll("path")
                    .data(root.descendants())
                    .enter()
                    .append("path")
                    .attr("d", arc)
                    .attr('stroke', '#fff')
                    .attr("fill", function(d) {
                    while(d.depth > 1) d = d.parent;
                    if(d.depth == 0) return "lightgray";
                    return colorScale(d.value);
                    })
                    .attr("opacity", 0.8)
                    .append("title")
                    .text(function(d) { return d.data.name + "\n" + d.value; });
                
                g.selectAll("text")
                    .data(root.descendants())
                    .enter()
                    .append("text")
                    .attr("fill", "black")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("dy", "5px")
                    .attr("font", "10px")
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.data.name; });

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