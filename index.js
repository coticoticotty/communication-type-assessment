'use strict';
const communicationtype_list = {
  'コントローラー': "自己主張が強く、感情開放度は弱い。直球勝負や成果を出すことを重視する。口数は少なく表情の変化も少ないため、怖い人と思われやすいが、負けん気が強く成果にコミットする仕事人。",
  'プロモーター': "自己主張が強く、感情開放度も強い。楽しさやチームワークを重視する。退屈なことが苦手で楽しくないと何事も続けられないタイプだが、行動力もあり、周囲をモチベートすることに長ける。",
  'アナライザー': "自己主張が弱く、感情開放度も弱い。正しさや論理性を重視する。不確実なことを実行に移すことが苦手で、行動力にかけるところはあるが、分析力があり、冷静に物事を進める能力がある。",
  'サポーター': "自己主張が弱く、感情開放度は強い。周囲との協調性を何よりも重視する。人の目を気にするあまり、自分の意見を主張できなかったり、ストレスを抱えやすかったりする面もあるが、面倒見もよく、他者への気配り上手である。"
};
const other_type_list = [
  'プロコン：プロモーター＋コントローラー',
  'アナコン：アナライザー＋コントローラー',
  'プロサポ：プロモーター＋サポーター',
  'アナサポ：アナライザー＋サポーター',
  'バランス：全てのタイプを有するバランスタイプ'];

window.onload = function() {
  const display_area = document.getElementById('display-area');

  const index_fragment = new DocumentFragment();
  
  // ページの概要説明を追加
  const description_elem_about_page = document.createElement('p');
  description_elem_about_page.innerText = "あなたのコミュニケーションタイプを診断することができます。";
  index_fragment.append(description_elem_about_page);

  // コミュニケーションタイプについての説明を追加
  const h2_elem_about_type = document.createElement('h2');
  h2_elem_about_type.innerText = "コミュニケーションタイプとは？";
  const description_elem_about_type = document.createElement('p');
  description_elem_about_type.innerText = "自己主張の強さと感情の開放度の2軸で人間のコミュニケーションの特性を4つに分類して分析する手法です。アメリカの産業心理学者、デビット・メリル氏によって提唱されました。";
  index_fragment.append(h2_elem_about_type);
  index_fragment.append(description_elem_about_type);

  // 4つのタイプについての説明を追加
  const h2_elem_about_4types = document.createElement('h2');
  h2_elem_about_4types.innerText = "4つのタイプ";
  index_fragment.append(h2_elem_about_4types);

  for (let type in communicationtype_list) {
    const h3_elem_about_type = document.createElement('h3');
    h3_elem_about_type.innerText = type;
    const description_elem_about_4types = document.createElement('p');
    description_elem_about_4types.innerText = communicationtype_list[type];
    index_fragment.append(h3_elem_about_type);
    index_fragment.append(description_elem_about_4types);
  }

  const appendix_elem = document.createElement('div');
  appendix_elem.id = "appendix";
  const other_type_desc = '一つのタイプが突出していることもあれば、複数を兼ね備えていることもあります。この診断では、上記4つ以外に以下5つのタイプに診断します。';
  const desc_elem_about_other_type = document.createElement('p');
  desc_elem_about_other_type.innerText = other_type_desc;
  appendix_elem.append(desc_elem_about_other_type);

  const list_elem = document.createElement('ul');
  for (let type of other_type_list) {
    const list_elem_about_other_type = document.createElement('li');
    list_elem_about_other_type.innerText = type;
    list_elem.append(list_elem_about_other_type);
  }
  appendix_elem.append(list_elem);
  index_fragment.append(appendix_elem);

  // 診断開始ボタンを追加
  const button_area_elem = document.createElement('div');
  button_area_elem.className = "button-wrapper";
  const start_button = document.createElement('button');
  start_button.id = 'start-button';
  start_button.innerText = '診断開始';
  button_area_elem.append(start_button);
  index_fragment.append(button_area_elem);

  // 質問項目を記述してあるquestion.jsの呼び出し
  const question_js = document.createElement('script');
  question_js.src = "question.js";
  index_fragment.append(question_js);
  display_area.append(index_fragment);
}

