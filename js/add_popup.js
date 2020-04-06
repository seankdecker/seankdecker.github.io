'use strict';

// On document load, make body children opacity 0.5
// Then create popup element and append it to body
// args
//   - text - [str] - list of strings to fill popup
function addPopup(text) {
  document.addEventListener('DOMContentLoaded', (event) => {
    // let body = document.getElementsByTagName('BODY')[0];
    let children = document.body.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (children[i].style) {
        children[i].style.opacity = 0.5;
      }
    }
    let popup = document.createElement('DIV');
    popup.setAttribute('id', 'popup');
    for (let i = 0; i < text.length; i++) {
      let p = document.createElement('P');
      p.appendChild(document.createTextNode(text[i]));
      popup.appendChild(p);
    }
    let p = document.createElement('P');
    p.appendChild(document.createTextNode('Click anywhere to close me!'));
    p.setAttribute('class', 'message');
    popup.appendChild(p);
    document.body.appendChild(popup);
    document.body.setAttribute('onclick', 'removePopup();');
  });
}

// Delete popup
function removePopup() {
  let children = document.body.childNodes;
  for (let i = 0; i < children.length; i++) {
    if (children[i].style) {
      children[i].style.opacity = 1;
    }
  }
  let popup = document.getElementById('popup');
  document.body.removeChild(popup);
  document.body.removeAttribute('onclick');
}
