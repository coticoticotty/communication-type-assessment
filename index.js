'use strict';
const question1 = document.getElementById('question');
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

const form = document.createElement('form');
form.id = "question1";
const questionFrame = document.createElement('p');
questionFrame.innerText = questions[0];
formArea.appendChild(form);
formArea.appendChild(questionFrame);

for (let i = 1; i <= 4; i++){
  const row = document.createElement('input');
  const label = document.createElement('label');
  row.type = "radio";
  row.name = `question1`;
  row.value = i;
  label.innerText = i;
  formArea.appendChild(row); 
  formArea.appendChild(label); 
}

assessmentButton.onclick = function() {
  const answers1 = question.question1;
  const answer1 = answers1.value;
  console.log(answer1);
  const answers2 = question.question2;
  const answer2 = answers2.value;
  console.log(answer2);
}
