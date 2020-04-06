const c = document.getElementById('canvas');
const CTX = c.getContext('2d');
var SHAPE = -1;
const width = canvas.width, height = canvas.height;

function showDeck(deck) {
  window.onload = function() {
    var img = new Image;
    img.src = '../pictures/brown_deck/back.jpg';
    for (let i = 0; i < deck.cards.length; i++) {
      // drawImage(image)
      CTX.drawImage(img, 0, 0);
    }
  }
}
//
// function showfrontPlayer(player) {
//
// }
//
// function showRightPlayer(player) {
//
// }
//
// function showLeftPlayer(player) {
//
// }
