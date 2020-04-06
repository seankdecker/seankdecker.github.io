/*
Class for a Hana game
  deal() deals out the cards to the players
  turn() has a player play their turn
*/
class Game {
  constructor(deck, oya, naka, biki) {
    this.turn = 0;
    this.players = [oya, naka, biki];
    this.deck = deck;
    this.feild = [];
    this.ame = false;
  }

  deal() {
    for (let i = 0; i < 3; i++) {
      for (let num_cards = 0; num_cards < 4; num_cards++) {
        this.players[i].takeCard(deck.draw());
      }
    }
    for (let num_cards = 0; num_cards < 3; num_cards++) {
      this.feild.push(deck.draw());
    }
    for (let i = 0; i < 3; i++) {
      for (let num_cards = 0; num_cards < 3; num_cards++) {
        this.players[i].takeCard(deck.draw());
      }
    }
    for (let num_cards = 0; num_cards < 3; num_cards++) {
      this.feild.push(deck.draw());
    }
    // check if ame game
    for (let k = 0; k < this.feild.length; k++) {
      if (this.feild[k].name == 'yanagi') { this.ame = true; }
    }
  }

  turn() {
    let play = this.players[this.turn % 3].playCard();
    if (play[1] == -1) {
      this.field.push(play[0]);
    } else {
      this.field.splice(i, 1);
      this.players[this.turn % 3].pot.push(this.feild[i], play[0])
    }
  }
}

/*
Class for a Hana player
  Starts with a hand of no cards
  add cards with takeCard(card)
  player returns a played card with playCard
*/
class Player {
  constructor() {
    this.hand = [];
    this.pot = [];
  }
  // choose card based on chooseCard()
  playCard(feild) {
    let card = this.hand.splice(this.chooseCard(), 1)[0];
    for (let i = 0; i < feild.length; i++) {
      if (feild[i].name == card.name) {
        return [card, i];
      }
    }
    return [card, null];
  }
  chooseCard() { return Math.floor(Math.random() * this.hand.length); }

  takeCard(card) { this.hand.push(card); }

  calPoints() {
    let points = 0;
    for (let i = 0; i < this.pot.length; i++) {
      points += this.pot[i].value;
    }
    return points;
  }
}

/*
Class for a Hana deck
  a new deck will be an ordered hana deck
  callable shuffle function makes a random permutation of the deck
*/
class Deck {
  constructor() {
    this.cards = this.makeCards();
  }
  // for each card in a hana deck, create a card
  makeCards() {
    var cards = [];
    var raw_cards = [['matsu',20],['matsu',5],['matsu',1],['matsu',1],['ume',10],
                    ['ume',5],['ume',1],['ume',1],['sakura',20],['sakura',5],
                    ['sakura',1],['sakura',1],['fuji',10],['fuji',5],['fuji',1],
                    ['fuji',1],['ayame',10],['ayame',5],['ayame',1],['ayame',1],
                    ['botan',10],['botan',5],['botan',1],['botan',1],['hagi',10],
                    ['hagi',5],['hagi',1],['hagi',1],['susuki',20],['susuki',10],
                    ['susuki',1],['susuki',1],['kiku',10],['kiku',5],['kiku',1],
                    ['kiku',1],['momiji',10],['momiji',5],['momiji',1],
                    ['momiji',1],['yanagi',20],['yanagi',10],['yanagi',5],
                    ['yanagi',1],['kiri',20],['kiri',1],['kiri',1],['kiri',1]];
    for (let i = 0; i < raw_cards.length; i++) {
      let newCard = new Card(raw_cards[i][0], raw_cards[i][1]);
      cards.push(newCard);
    }
    return cards;
  }
  // create random permutation of deck
  shuffle() {
    let len = this.cards.length;
    for (let i = 0; i < len; i++) {
      let j = len - 1 - Math.floor(Math.random() * (len  - i));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j]
      this.cards[j] = temp;
    }
  }
  draw(){
    return this.cards.pop();
  }
  printDeck(){
    // console.log(this.cards);
    for (let i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i]);
    }
  }
}

/*
Class for a Hana card
  a card includes a name, value, ans src
  src is the path to the card's corresponding image
*/
class Card {
  constructor(name, value) {
    this.name = name;
    this.value = parseInt(value);
    this.src = '../pictures/brown_deck/' + name + value + '.jpg';
  }
}
