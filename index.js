'use strict';
window.onload = function() {
  const display_area = document.getElementById('display-area');

  const index_fragment = new DocumentFragment();
  
  const assessment_discription = document.createElement('p');
  assessment_discription.innerText = "あなたのコミュニケーションタイプを診断します。以下の質問に直感的に回答してください。";
  const start_button = document.createElement('button');
  start_button.id = 'start_button';
  start_button.innerText = '診断開始';
  
  index_fragment.append(assessment_discription);
  index_fragment.append(start_button);

  const question_js = document.createElement('script');
  question_js.src = "question.js";
  index_fragment.append(question_js);
  display_area.append(index_fragment);
}
