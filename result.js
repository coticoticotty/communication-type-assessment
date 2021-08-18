'use strict';
const result_button = document.getElementById('result-button');

const button_area_elem = document.createElement('div');
button_area_elem.className = "button-wrapper";
const move_top_button = document.createElement('button');
move_top_button.id = 'move-top-button';
move_top_button.innerText = 'もう一度診断する';
button_area_elem.append(move_top_button);


result_button.onclick = function() {
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

  const result_frame_elem = document.createElement('h2');
  result_frame_elem.innerText = '《診断結果》';
  fragment.append(result_frame_elem);
  const type = document.createElement('p');
  type.innerText = `あなたは${assess_communication_type(x, y)}です。`;
  fragment.append(type);

  if (document.getElementById('canvas')) {document.getElementById('canvas').remove()};
  const plot_area = document.createElement('canvas');
  plot_area.id = 'canvas';
  plot_area.width = '500';
  plot_area.height = '500';
  fragment.append(plot_area);
  displayGraph(plot_area, x, y);

  const scoreFrame = document.createElement('ul');
  fragment.append(scoreFrame);
  for (let key in communicationScore) {
    const scoreList = document.createElement('li');
    scoreList.innerText = `${key}スコア: ${communicationScore[key]}`;
    scoreFrame.appendChild(scoreList);  
  }
  display_area.append(fragment);
  display_area.append(button_area_elem);
}

move_top_button.onclick = function () {
  doReload();
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