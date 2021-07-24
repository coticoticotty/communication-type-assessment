'use strict';
const assessmentButton = document.getElementById('assessment');
const formArea = document.getElementById('form-area');
const resultArea = document.getElementById('result-area');

const questions = [
  '何事も中途半端に終わらせることを好かない',
  '限られた時間の中でできるだけ多くの物事を行おうとする',
  '他人と比べて負けない・負けたくないという気持ちがある',
  '自分の価値基準が明確にあり、異なる意見に対して自分の意見を言える',
  '自分の考えや意見をそのまま口に出すことが多い',
  '未来に対してパッションを持ち、もっと良くしていきたいと強く思っている',
  '周りからは楽しい人だと思われている',
  '失敗を恐れず、仮に失敗したとしても次に進もうと思える',
  'よく自分の話ばかりをしすぎてしまう',
  '変化を恐れず、新しい場所でもすぐに馴染める',
  '相手のことを思ってしたことに対して感謝されないともどかしい気持ちになる',
  '基本人から頼まれたことや誘われたことにはNOと言わない',
  'よく自分と他人を比較する',
  '相手が誰であろうと自分にできることは最大限提供しようとする',
  '自分がやったことに対する他人からの評価をよく気にする',
  '自分の意見や好き嫌いを発言することが苦手',
  '人間関係において仲良くなるまで時間がかかる',
  'まずは情報を集めてから意思決定を行う',
  'どちらかと言うと人見知りをする方だ',
  '自分の感情を表現したり相手に伝えることが苦手だ'
];

const options = [
  "当てはまらない",
  "あまり当てはまらない",
  "どちらとも言えない",
  "当てはまる",
  "良く当てはまる"
];

const form = document.createElement('form');
form.id = "question";
formArea.appendChild(form);

for (let question_num = 1; question_num <= 20; question_num++) {
  const questionFrame = document.createElement('p');
  questionFrame.innerText =`Q${question_num}. ${questions[question_num-1]}`;
  form.appendChild(questionFrame);
  for (let option_i = 1; option_i <= 5; option_i++){
    const row = document.createElement('input');
    const label = document.createElement('label');
    const textNode = document.createTextNode('');
    textNode.nodeValue = options[option_i-1];
    row.type = "radio";
    row.name = `question${question_num}`;
    row.value = option_i;
    if (option_i === 3) {
      row.checked = true;
    }
    form.appendChild(label); 
    label.appendChild(row); 
    label.appendChild(textNode);
  }
}

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

// const W = 500;
// const H = 400
// // x軸の描画
// ctx.beginPath();
// ctx.moveTo(10, H-20);
// ctx.lineTo(W-10, H-20);
// ctx.closePath();
// ctx.stroke()
// // y軸の描画
// ctx.beginPath();
// ctx.moveTo(20, H-10);
// ctx.lineTo(20, 10);
// ctx.closePath();
// ctx.stroke();
// 
// ctx.fillRect(100,200,10,10);