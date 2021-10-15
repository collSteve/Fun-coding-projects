
function constructDeck(nSuits, nValues) {
  let cards = [];
  for (var i = 1; i < nSuits + 1; i++) {
    for (var j = 1; j < nValues + 1; j++) {
      cards.push([i, j]);
    }
  }
  return cards;
}

// Construct the Deck of Cards (4 suits, 13 values)
let wholeDeck = constructDeck(4, 13);
let suitDict = {1 : "club ♧",
                2 : "diamond ♢",
                3 : "heart ♥",
                4 : "shade ♤"};

let valueDict = {1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:"Jack", 12:"Queen", 13:"King"};
let simpleSuitDict = {1 : "♧",
                2 : "♢",
                3 : "♥",
                4 : "♤"};
let simpleValueDict = {1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:"J", 12:"Q", 13:"K"};

// Select a single card from a deck
function selectCard(cards, deck) {
  let tempCards = JSON.parse(JSON.stringify(cards));
  let tempDeck = JSON.parse(JSON.stringify(deck));
//  window.prompt("Press enter to select a card...");

  let chosenCard = random(deck);
  tempCards.push(chosenCard);

  // Remove the chosen card from the deck
  for( var i = 0; i < tempDeck.length; i++) {

    if (JSON.stringify(tempDeck[i]) == JSON.stringify(chosenCard)) {
      tempDeck.splice(i, 1);
      i--;
    }
  }

  let suitText = suitDict[chosenCard[0]].toString();
  let valueText = valueDict[chosenCard[1]].toString();
  let displayText = "You selected a " + suitText + valueText;

  // console.log(displayText);

  return [tempCards, tempDeck];
}

function textCards(cards) {
  let displayV = [];
  for (var i = 0; i < cards.length; i++) {
    let suitText = suitDict[cards[i][0]].toString();
    let valueText = valueDict[cards[i][1]].toString();

    displayV.push(suitText + valueText);
  }
  return displayV.join(", ");
}

function selectMultiCards(cards, deck, num) {
  let tempCards = JSON.parse(JSON.stringify(cards));
  let tempDeck = JSON.parse(JSON.stringify(deck));

  for (var i = 0; i < num; i++) {
    let newSelect = selectCard(tempCards, tempDeck);
    tempCards = JSON.parse(JSON.stringify(newSelect[0]));
    tempDeck = JSON.parse(JSON.stringify(newSelect[1]));
  }

  // console.log("You have selected: ");
  // console.log(textCards(tempCards));
  return [tempCards, tempDeck];
}

// draw cards
function shapeCard(cardIndex, pos, rectW) {
  rect(pos.x, pos.y, rectW, rectW*4/3);
  let suit = simpleSuitDict[cardIndex[0]];
  let value = simpleValueDict[cardIndex[1]].toString();
  let textDisplay = suit+value;

  //Text
  push();
  textSize(rectW/3);
  push();
  textAlign(LEFT, TOP);
  text(textDisplay, pos.x+rectW/10, pos.y+rectW/10);
  pop();
  push();
  textAlign(RIGHT, BOTTOM);
  text(textDisplay, pos.x+rectW-rectW/10, pos.y+rectW*4/3 - rectW/10);
  pop();
  pop();
}

function shapeCards(cards, pos, rectW, gap) {
  for (var i = 0; i < cards.length; i++) {
    shapeCard(cards[i], createVector(pos.x + i*gap, pos.y), rectW);
  }
}
