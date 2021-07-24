'use strict';
const assessmentButton = document.getElementById('assessment');
const resultArea = document.getElementById('result-area');

assessmentButton.onclick = function() {
  resultArea.innerText = "";
  let score = [];
  for (let question_num = 1; question_num <= 20; question_num++) {
    const key = `question${question_num}`;
    const value = document.getElementById('question')[key].value;
    score.push(parseInt(value));
  }

  const communicationScore = calc_sum(score);

  const resultFrame = document.createElement('p');
  resultFrame.innerText = '診断結果';
  resultArea.appendChild(resultFrame);
  const scoreFrame = document.createElement('ul');
  resultArea.appendChild(scoreFrame);
  for (let key in communicationScore) {
    const scoreList = document.createElement('li');
    scoreList.innerText = `${key}スコア: ${communicationScore[key]}`;
    scoreFrame.appendChild(scoreList);  
  }

  if (document.getElementById('canvas')) {document.getElementById('canvas').remove()};

  const plotArea = document.createElement('canvas');
  plotArea.id = 'canvas';
  plotArea.width = '500';
  plotArea.height = '500';
  resultArea.appendChild(plotArea);

  const {x, y} = calc_coordinates(communicationScore);

  displayGraph(plotArea, x, y);
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
 * @param {object} plotArea 
 * @param {integer} x 
 * @param {ineger} y 
 */
function displayGraph(plotArea, x, y) {
  const ctx=plotArea.getContext('2d');
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0, 500, 500);
    ctx.fillStyle = "#f72da574";
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