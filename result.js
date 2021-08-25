'use strict';
const result_button = document.getElementById('result-button');

//もう一度診断するボタンを表示
const button_area_elem = create_element('div', '', 'button-wrapper', '');
const move_top_button = create_element('button', 'move-top-button', '', 'もう一度診断する');
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

// 診断結果の表示
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

  // 質問項目の集計、コミュニケーションタイプを判定
  const communicationScore = calc_sum(score);
  const {x, y} = calc_coordinates(communicationScore);
  const communication_type = assess_communication_type(x, y);

  // 診断結果の表示
  const h2_elem_result = create_element('h2', '', '', '《診断結果》');
  fragment.append(h2_elem_result);
  const h3_elem_type = create_element('h3', '', '', `あなたは${communication_type}です`);
  fragment.append(h3_elem_type);
  const type_desc_elem = create_element('p', '', '', result[communication_type]);
  fragment.append(type_desc_elem);

  // 結果グラフの表示
  if (document.getElementById('canvas')) {document.getElementById('canvas').remove()};
  const plot_area = document.createElement('canvas');
  plot_area.id = 'canvas';
  plot_area.width = '500';
  plot_area.height = '500';
  fragment.append(plot_area);
  displayGraph(plot_area, x, y);

  // スコアの詳細を表示
  const h3_elem_score = create_element('h3', '', '', 'スコア');
  fragment.append(h3_elem_score);
  const score_area_elem = create_element('ul', '', '', '');
  fragment.append(score_area_elem);
  for (let key in communicationScore) {
    const score_list = create_element('li', '', '', `${key}スコア: ${communicationScore[key]}`);
    score_area_elem.appendChild(score_list);  
  }
  display_area.append(fragment);

  // 免責事項の表示
  const disclaimer_elem = create_element('div', 'disclaimer', '', '');
  const disclaimer = `【免責事項】
    当サイトの情報・診断について、さまざまな情報を参照し作成しておりますが、正確性を保証するものではありません。また、当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
    より詳しく知りたい方は「コミュニケーションタイプ」や「ソーシャルスタイル」で調べてみてください。`;
  const disclaimer_desc_elem = create_element('p', '', '', disclaimer);
  disclaimer_elem.append(disclaimer_desc_elem);
  display_area.append(disclaimer_elem);

  display_area.append(button_area_elem);
}

// もう一度診断するボタンを押したら、トップページに戻る
move_top_button.onclick = function () {
  doReload();
	window.scroll({top: 0, behavior: 'instant'});
}  

// <a href="https://twitter.com/intent/tweet?button_hashtag=コミュニケーションタイプ診断&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false">Tweet #コミュニケーションタイプ診断</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


