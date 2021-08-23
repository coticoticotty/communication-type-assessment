/**
 * 指定したHTMLエレメントを作成する関数。
 * 指定できるのはid、class、innerTextまでです。
 * @param {str} tag 
 * @param {str} id_name 
 * @param {str} class_name 
 * @param {str} inner_text 
 * @returns {obj} 指定したHTMLエレメントを返します
 */

function create_element(tag, id_name='', class_name='', inner_text='') {
    const elem = document.createElement(tag);
    if (id_name) {
        elem.id = id_name;
    }
    if (class_name) {
        elem.className = class_name;
    }
    if (inner_text) {
        elem.innerText = inner_text;
    }
    return elem
  }

/**
 * テキストノードを作成します。
 * @param {str} innner_text 
 * @returns {obj} 
 */
function create_node(inner_text) {
    const elem = document.createTextNode(inner_text)
    return elem
} 