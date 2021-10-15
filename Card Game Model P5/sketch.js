let selectButtons = [];

let selectedCards1 = [];
let decks = wholeDeck;

function buttonCreation(cards, deck) {
  console.log(cards);
  let newButton = createButton('Select New Card');

  selectButtons.push(newButton);
  function tempFun() {
    console.log(cards);
    let selected = selectMultiCards(cards, deck, 1);
    cards = JSON.parse(JSON.stringify(selected[0]));
    deck = JSON.parse(JSON.stringify(selected[1]));

    console.log(cards);
  }
  selectButtons[selectButtons.length-1].mousePressed(tempFun);
}

function setup() {
  createCanvas(1000, 400);
  buttonCreation(selectedCards1, decks);
}

function draw() {
  background(220);

  shapeCards(decks, createVector(0,100), 30, 20);
  shapeCards(selectedCards1, createVector(0,250), 50, 30);
}
