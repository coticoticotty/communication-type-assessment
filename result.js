'use strict';
assessmentButton.onclick = function() {
  resultArea.innerText = "";
  let score = [];
  for (let question_num = 1; question_num <= 20; question_num++) {
    const key = `question${question_num}`;
    const value = document.getElementById('question')[key].value;
    score.push(parseInt(value));
  }
  let communicationScore = {"コントローラー": "", "プロモーター": "", "サポーター": "", "アナライザー": ""};
  const controlerScoreList = score.splice(0, 5);
  communicationScore['コントローラー'] = calculateSum(controlerScoreList);
  const promoterScoreList = score.splice(0, 5);
  communicationScore['プロモーター'] = calculateSum(promoterScoreList);
  const supporterScoreList = score.splice(0, 5);
  communicationScore['サポーター'] = calculateSum(supporterScoreList);
  const analyzerScoreList = score.splice(0, 5);
  communicationScore['アナライザー'] = calculateSum(analyzerScoreList);
  console.log(communicationScore);

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
  let x = (
    communicationScore['プロモーター'] +
    communicationScore['サポーター'] -
    communicationScore['コントローラー'] -
    communicationScore['アナライザー']) / 1.44;
  if (x > 5) {x = 5};

  let y = (
    communicationScore['プロモーター'] -
    communicationScore['サポーター'] +
    communicationScore['コントローラー'] -
    communicationScore['アナライザー']) / 1.44;
  if (y > 5) {y = 5};

  console.log(x, y);
  const canvas=document.getElementById('canvas');
  const ctx=canvas.getContext('2d');
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0, 500, 500);
  // ctx.fillRect(235,235,30,30);
    ctx.fillStyle = "#f72da574";
    ctx.fillRect(235 + 35*x, 235 - 35*y, 30, 30);
  // 中心(250, 250) ただし、マーカーのサイズ分ズレる。
  // MIN(60, 60)
  // MAX(410, 410)
  // グラフの幅、350
  // 1マス 35
  };
  img.src = 'communication-type.png';
  
}

function calculateSum (scoreList) {
  const sum = scoreList.reduce((a, b) => a + b, 0);
  return sum;
}