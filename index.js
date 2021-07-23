'use strict';
const assessmentButton = document.getElementById('assessment');
const formArea = document.getElementById('form-area');

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

for (let question_i = 1; question_i <= 20; question_i++) {
  const questionFrame = document.createElement('p');
  questionFrame.innerText =`Q${question_i}. ${questions[question_i-1]}`;
  form.appendChild(questionFrame);
  for (let option_i = 1; option_i <= 5; option_i++){
    const row = document.createElement('input');
    const label = document.createElement('label');
    const textNode = document.createTextNode('');
    textNode.nodeValue = options[option_i-1];
    row.type = "radio";
    row.name = `question${question_i}`;
    row.value = option_i;
    if (option_i === 3) {
      row.checked = true;
    }
    form.appendChild(label); 
    label.appendChild(row); 
    label.appendChild(textNode);
  }
}

const question = document.getElementById('question').question1;

assessmentButton.onclick = function() {
  console.log(question.value);
}
