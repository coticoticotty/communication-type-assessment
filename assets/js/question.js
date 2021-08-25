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

  // ページの概要説明
  const page_desc = "以下の質問に回答してください。コミュニケーションの傾向は環境によって大きく変わるため、特定の環境を想定して回答することをおすすめします。（例：職場にいる自分、学校にいる自分など）";
  const page_desc_elem = create_element('p', '', '', page_desc);
  fragment.append(page_desc_elem);

  const form = create_element('form', 'question', '', '');
  fragment.append(form);
  
  // 質問項目を表示
  for (let question_num = 1; question_num <= 20; question_num++) {
    const question = `Q${question_num}. ${questions[question_num-1]}`
    const question_elem = create_element('h3', '', '', question);
    form.append(question_elem);

    // ラジオボタン。選択項目の追加
    for (let option_i = 1; option_i <= 5; option_i++){
      const radio_button_elem = document.createElement('input');
      radio_button_elem.type = "radio";
      radio_button_elem.name = `question${question_num}`;
      radio_button_elem.value = option_i;

      const label_elem = create_element('label', '', 'radio-button', '');
      const options_elem = create_node(options[option_i-1]);
      if (option_i === 3) {
        radio_button_elem.checked = true;
      }
      form.append(label_elem); 
      label_elem.appendChild(radio_button_elem); 
      label_elem.appendChild(options_elem); 
    }
  }

  // 診断結果表示ボタンを追加
  const button_area_elem = create_element('div', '', 'button-wrapper', '');
  const result_button_elem = create_element('button', 'result-button', '', '診断結果を見る');
  button_area_elem.append(result_button_elem);
  fragment.append(button_area_elem);

  // 診断結果を表示するresult.jsの呼び出し
  const result_js = document.createElement('script');
  result_js.src = "./assets/js/result.js";
  fragment.append(result_js);

  display_area.append(fragment);
}
