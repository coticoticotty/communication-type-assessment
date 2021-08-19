'use strict';
const start_button = document.getElementById('start-button');

const questions = [
  '何事もしっかりやり遂げないと気がすまない',
  '情報を伝えるときは要点をまとめて結論から教えて欲しい',
  '競争心が強い・負けん気がある',
  '自分の弱みは決して人に見せない',
  '自分の考えや意見を率直に人に伝えることができる',
  '計画を立てて動くことが苦手だ',
  '周囲から、楽しい人だと思われている',
  '失敗してもくよくよしない・立ち直りが早い',
  '話を聞くよりも、自分の話ばかりをしてしまう',
  '新しいことにチャレンジすることが好きだ',
  '相手のためにやったことが感謝されないと嫌な気持ちになる',
  '相手の心情を考えるあまり、言いたいことが言えないことがよくある',
  '頼まれごとや誘いを断ることが苦手だ',
  'よく自分と他人を比較する',
  '人をサポートすることが好きだ',
  '自分の考えや感情を人に話すことが苦手だ',
  'ルーティーンワークは苦にならない',
  '計画通りに実行することが好きだ',
  '1人でいることが苦ではない',
  '納得できる理由でない限り、褒められても嬉しさを感じない'
];

const options = [
  "当てはまらない",
  "あまり当てはまらない",
  "どちらとも言えない",
  "当てはまる",
  "良く当てはまる"
];

start_button.onclick = function () {
	window.scroll({top: 0, behavior: 'instant'});
  const display_area = document.getElementById('display-area');  
  display_area.innerText = ""; // 説明文などの消去
  let fragment = new DocumentFragment();

  const page_desc_elem = document.createElement('p');
  page_desc_elem.innerText = "以下の質問に回答してください。コミュニケーションの傾向は環境によって大きく変わるため、特定の環境を想定して回答することをおすすめします。（例：職場にいる自分、学校にいる自分など）";
  fragment.append(page_desc_elem);

  const form = document.createElement('form');
  form.id = "question";
  fragment.append(form);
  
  for (let question_num = 1; question_num <= 20; question_num++) {
    const description = document.createElement('h3');
    description.innerText =`Q${question_num}. ${questions[question_num-1]}`;
    form.append(description);
    for (let option_i = 1; option_i <= 5; option_i++){
      const radio_button = document.createElement('input');
      const label = document.createElement('label');
      label.className = "radio-button";
      const text_node = document.createTextNode(options[option_i-1]);
      radio_button.type = "radio";
      radio_button.name = `question${question_num}`;
      radio_button.value = option_i;
      if (option_i === 3) {
        radio_button.checked = true;
      }
      form.append(label); 
      label.appendChild(radio_button); 
      label.appendChild(text_node); 
    }
  }
  const button_area_elem = document.createElement('div');
  button_area_elem.className = "button-wrapper";
  const result_button = document.createElement('button');
  result_button.id = 'result-button';
  result_button.innerText = "診断結果を見る";
  button_area_elem.append(result_button);
  fragment.append(button_area_elem);

  const result_js = document.createElement('script');
  result_js.src = "result.js";
  fragment.append(result_js);

  display_area.append(fragment);
}
