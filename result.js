'use strict';
const result_button = document.getElementById('result-button');

const button_area_elem = document.createElement('div');
button_area_elem.className = "button-wrapper";
const move_top_button = document.createElement('button');
move_top_button.id = 'move-top-button';
move_top_button.innerText = 'もう一度診断する';
button_area_elem.append(move_top_button);


const result = {
  "コントローラータイプ": "コントローラータイプのあなたは、頭の回転が速く、目標達成にコミットできる仕事人タイプです。自己主張が強い反面、他者の感情に寄り添うことは苦手なため、怖い人と思われやすい傾向にあります。負けん気が強く成果を出すことや勝負事には誰よりも熱心に取り組むことができます。",
  "プロモータータイプ": "プロモータータイプのあなたは、明るく元気にみんなを引っ張るリーダータイプで、人に影響を与えたいという欲求を強く持っています。同じことを繰り返す地道な作業や計画を立てて物事を実行していくことが苦手です。盛り上げ上手なあなたは、いつも親しい友人や仲間に囲まれているはず。",
  "サポータータイプ": "サポータータイプのあなたは、調和を重視し、他者への配慮を忘れない縁の下の力持ちタイプです。相手の感情を慮るあまり言いたいことを言えなかったり、人から反対されても物事を推し進めることは苦手な傾向にあります。場の空気を和らげること・人の感情を察知することが得意で、みんなが穏やかに過ごせる環境づくりに大きく貢献します。",
  "アナライザータイプ": "アナライザータイプのあなたが重視することは理論や正しさです。そのため、不確実なことにトライすることは苦手な傾向にあります。また、人の感情に寄り添うことが苦手なのでそれが原因で時にトラブルに発展することも。その代わり、情報収集をしっかりした上でコツコツと計画的に進めていくことが得意です。",
  "プロコンタイプ": "プロモータータイプとコントローラータイプを両有するあなたは、力強く仲間を引っ張るリーダータイプです。エネルギーが高く、チームを盛り上げながら、多少の反対はあっても突き進める意思の強さを持っています。ペースの遅い人を置いてけぼりにしがちなところがあるので、サポータータイプの人間と組めるとより強みを発揮できるかもしれません。",
  "プロサポタイプ": "プロモータータイプとサポータータイプを両有するあなたは、明るく元気で、他者への配慮も忘れない、理解力のあるリーダータイプです。ただし、人の感情や人からの信頼を大切にしすぎるあまり、仲間から反対される可能性のある行動を取るすることは苦手かもしれません。",
  "アナサポタイプ": "アナライザータイプとサポータータイプを両有するあなたは、客観的・論理的に考えることに長けながら、他者への配慮も忘れない、優しい先輩タイプです。持ち前の俯瞰力と分析力でを生かしつつ、優しく他者をサポートすることができます。ただし、感情や意見をストレートにぶつけてくる相手が苦手な傾向にあります。",
  "アナコンタイプ": "アナライザータイプとコントローラータイプを両有するあなたは、ロジカルに戦略を立て、目標達成にコミットができる仕事人です。頭の回転が早く、物言いも率直なため、周囲の人から怖い人と思われがちです。ただし、明晰な頭脳と強い意志を持って物事に取り組むことができるため、優秀でパフォーマンスの高く、組織や管理職には欠かせない存在です。",
  "バランサータイプ": "全てのタイプを有するあなたは、全てタイプの人に対応できる万能型です。おそらく、さまざまなタイプに適応せざるを得ないような環境で過ごしてきた経験があるのでしょう。もしくは、自己理解が足りない可能性があります。具体的な環境を思い浮かべた上で、改めて回答してみるのも良いかもしれません。"
};

result_button.onclick = function() {
	window.scroll({top: 0, behavior: 'instant'});
  const display_area = document.getElementById('display-area');  
  let fragment = new DocumentFragment();

  let score = [];
  for (let question_num = 1; question_num <= 20; question_num++) {
    const key = `question${question_num}`;
    const value = document.getElementById('question')[key].value;
    score.push(parseInt(value));
  }

  display_area.innerText = ""; // 説明文などの消去

  const communicationScore = calc_sum(score);
  const {x, y} = calc_coordinates(communicationScore);
  const communication_type = assess_communication_type(x, y);

  const result_frame_elem = document.createElement('h2');
  result_frame_elem.innerText = '《診断結果》';
  fragment.append(result_frame_elem);
  const type = document.createElement('h3');
  type.innerText = `あなたは${communication_type}です`;
  fragment.append(type);

  const type_description_elem = document.createElement('p');
  type_description_elem.innerText = result[communication_type];
  fragment.append(type_description_elem);

  if (document.getElementById('canvas')) {document.getElementById('canvas').remove()};
  const plot_area = document.createElement('canvas');
  plot_area.id = 'canvas';
  plot_area.width = '500';
  plot_area.height = '500';
  fragment.append(plot_area);
  displayGraph(plot_area, x, y);

  const score_frame_h3 = document.createElement('h3');
  score_frame_h3.innerText = "スコア";
  fragment.append(score_frame_h3);

  const scoreFrame = document.createElement('ul');
  fragment.append(scoreFrame);
  for (let key in communicationScore) {
    const scoreList = document.createElement('li');
    scoreList.innerText = `${key}スコア: ${communicationScore[key]}`;
    scoreFrame.appendChild(scoreList);  
  }
  display_area.append(fragment);

  const disclaimer_elem = document.createElement('div');
  disclaimer_elem.id = "disclaimer";
  const disclaimer = `【免責事項】
    当サイトの情報・診断について、さまざまな情報を参照し作成しておりますが、正確性や安全性を保証するものではありません。また、当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。`;
  const desc_elem_about_disclaimer = document.createElement('p');
  desc_elem_about_disclaimer.innerText = disclaimer;
  disclaimer_elem.append(desc_elem_about_disclaimer);
  display_area.append(disclaimer_elem);

  display_area.append(button_area_elem);
}

move_top_button.onclick = function () {
  doReload();
	window.scroll({top: 0, behavior: 'instant'});
}  

/**
 * ページを再読み込みする関数
 */
function doReload() {
  window.location.reload();
}

/**
 * 配列に含まれる数値の合計を計算し、その値を返す
 * @param {list} scoreList 
 * @returns {integer} 合計値
 */
function calculateSum (scoreList) {
  const sum = scoreList.reduce((a, b) => a + b, 0);
  return sum;
}

/**
 * communicationScoreオブジェクトに格納したコミュニケーションスコアを
 * 2次元座標にプロットするために、x軸、y軸に変換。
 * 1.44 = √2
 * 計算式
 * x = (プロモータースコア+サポータースコア-コントローラースコア-アナライザースコア) ÷ 1.44
 * y = (プロモータースコア-サポータースコア+コントローラースコア-アナライザースコア) ÷ 1.44
 * ただし、
 * -5 <= x <= 5
 * -5 <= y <= 5
 * @param {object} communicationScore
 * @returns {integer} x座標, y座標
 */
function calc_coordinates(communicationScore) {
  let x = (
    communicationScore['プロモーター'] +
    communicationScore['サポーター'] -
    communicationScore['コントローラー'] -
    communicationScore['アナライザー']) / 1.44;
  if (x > 5) {
    x = 5;
  } else if (x < -5) {
    x = -5;
  }
  let y = (
    communicationScore['プロモーター'] -
    communicationScore['サポーター'] +
    communicationScore['コントローラー'] -
    communicationScore['アナライザー']) / 1.44;

  if (y > 5) {
    y = 5;
  } else if (y < -5) {
    y = -5;
  }
  return {x, y};
}

/**
 * x,とyの値を受け取り、画像上に座標として表示する関数。
 * HTML5のCanvasを利用。
 * グラフエリアの画像サイズは500×500
 * 中心は(250,250)
 * ただし、プロットのサイズによって中心点がズレる。
 * プロットサイズ30の場合、(235, 235)が中心
 * グラフエリアに表示される座標の最大、最小値は以下
 * 最小 (60, 60)
 * 最大 (410, 410)
 * yは正の値でときに下に移動するので注意。
 * @param {object} plot_area 
 * @param {integer} x 
 * @param {ineger} y 
 */
function displayGraph(plot_area, x, y) {
  const ctx=plot_area.getContext('2d');
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0, 500, 500);
    ctx.fillStyle = "#f72da5a5";
    ctx.fillRect(235 + 35*x, 235 - 35*y, 30, 30);
  };
  img.src = 'communication-type.png';
}

/**
 * 質問の答えを格納したリスト、scoreから、それぞれのタイプのスコアの合計値を計算する。
 * 結果は、辞書型で返す。
 * Q1～5 コントローラータイプ
 * Q6～10 プロモータータイプ
 * Q11～15 サポータータイプ
 * Q16～20 アナライザータイプ
 * @param {list} score 
 * @returns {object} communicationScore
 */
function calc_sum(score) {
  let communicationScore = {"コントローラー": "", "プロモーター": "", "サポーター": "", "アナライザー": ""};
  const controlerScoreList = score.splice(0, 5);
  communicationScore['コントローラー'] = calculateSum(controlerScoreList);
  const promoterScoreList = score.splice(0, 5);
  communicationScore['プロモーター'] = calculateSum(promoterScoreList);
  const supporterScoreList = score.splice(0, 5);
  communicationScore['サポーター'] = calculateSum(supporterScoreList);
  const analyzerScoreList = score.splice(0, 5);
  communicationScore['アナライザー'] = calculateSum(analyzerScoreList);
  return communicationScore;
}

/**
 * 座標の位置から、コミュニケーションタイプを診断
 * コントローラータイプ x <= -2.5 かつ y >= 2.5
 * プロモータータイプ x >= 2.5 かつ y >= 2.5
 * サポータータイプ x >= 2.5 かつ y <= -2.5
 * アナライザータイプ x <= -2.5 かつ y <= -2.5
 * プロコンタイプ y >= 2.5 かつ -2.5 < x < 2.5
 * プロサポタイプ x >= 2.5 かつ -2.5 < y < 2.5
 * アナサポタイプ y <= -2.5 かつ -2.5 < x < 2.5
 * アナコンタイプ x <= -2.5 かつ -2.5 < y < 2.5
 * バランサータイプ -2.5 < x < 2.5 かつ -2.5 < y < 2.5
 * 
 * @param {integer} x
 * @param {integer} y
 * @return {string}　コミュニケーションタイプを判定して返す。
 */
function assess_communication_type (x, y) {
  if (x <= -2.5 && y >= 2.5){
    return 'コントローラータイプ';
  } else if (x >= 2.5 && y >= 2.5) {
    return 'プロモータータイプ';
  } else if (x >= 2.5 && y <= -2.5) {
    return 'サポータータイプ';
  } else if (x <= -2.5 && y <= -2.5) {
    return 'アナライザータイプ';
  } else if (y >= 2.5 && -2.5 < x < 2.5) {
    return 'プロコンタイプ';
  } else if (x >= 2.5 && -2.5 < y < 2.5) {
    return 'プロサポタイプ';
  } else if (y <= -2.5 && -2.5 < x < 2.5) {
    return 'アナサポタイプ';
  } else if (x <= -2.5 && -2.5 < y < 2.5) {
    return 'アナコンタイプ';
  } else if (-2.5 < x < 2.5 && -2.5 < y < 2.5) {
    return 'バランサータイプ';
  }
}