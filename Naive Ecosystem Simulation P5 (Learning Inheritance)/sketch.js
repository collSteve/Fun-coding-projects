var allCreatures = [];
var foxImage, rabbitImage, wolfImage;
var inputs = {};
var button;

// function for generate lists for creatures according to inputBoxes
function generateCreatures() {
  allCreatures = [];
  var creatureTypes = Object.keys(inputs);
  for (var i = 0; i < creatureTypes.length; i++) {

    var inputValue = inputs[creatureTypes[i]].value();
    for (var j = 0; j < inputValue; j++) {
      //create a type creatureTypes[i] creature
      var newCreature = new allCreatureClasses[creatureTypes[i]](random(width), random(height), 10);
      // put the new creature into allCreatures
      allCreatures.push(newCreature);
    }
  }
}

function preload() {
  foxImage = loadImage('Images/fox.png');
  rabbitImage = loadImage('Images/rabbit.png');
  wolfImage = loadImage('Images/wolf.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Inputboxes for numbers of creatures

  var creatureTypes = Object.keys(allCreatureClasses);
  // initial inputs positions, will update
  var inputTextPosition = [20, 20];

  for (var i = 0; i < creatureTypes.length; i++) {
    var inputText = createElement('p', 'Number of '+creatureTypes[i]+'s :');
    inputText.position(inputTextPosition[0], inputTextPosition[1]);
    var input = createInput('');
    input.position(inputText.x, inputText.y + 40);

    // put the input into input dict for it to be used in generateCreatures
    inputs[creatureTypes[i]] = input;

    // update next input text position
    inputTextPosition[1] = input.y + 20;
  }

  // create Submit button
  button = createButton('Submit');
  button.position(inputTextPosition[0], inputTextPosition[1]);
  button.mousePressed(generateCreatures);
}


function draw() {
  background(255);

  for (var i = 0; i < allCreatures.length; i++) {
    var deleteBool = allCreatures[i].update(allCreatures);
    if (deleteBool == false) {
      allCreatures[i].show();
    }
  }
}
