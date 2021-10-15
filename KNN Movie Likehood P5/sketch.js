var data;
var resultP;
var users = {};

function preload(){
  data = loadJSON('movies.json');
}

function setup() {
  noCanvas();

  var dropdown1 = createSelect('');
  var inputBox = createInput("5"); // input box for user to input top #

  for (var i = 0; i < data.users.length; i++){
    dropdown1.option(data.users[i].name);
    users[data.users[i].name] = data.users[i];  // better organization for looking up users information by their name
  }

  var button = createButton('Submit');
  button.mousePressed(displayNearestNeighbors);

  resultP = createP('');

  function displayNearestNeighbors() {
    similarityScores = findNearestNeighbors(dropdown1.value());

    data.users.sort(compareSimilarity);

    function compareSimilarity(a, b) { // sort be similarity from high to low
      var score1 = similarityScores[a.name];
      var score2 = similarityScores[b.name];
      return score2 - score1; //negative to go down, positive go up
    }

    var outputText = 'Top ' + inputBox.value().toString() + " similar users for " + dropdown1.value().toString() + ": <br>";

    for (var i = 0; i < inputBox.value(); i++) {
      var name = data.users[i].name;
      outputText += name.toString() + ", Similarity: " + similarityScores[name].toString() + "<br>";
    }
    resultP.html(outputText);
  }



}

function findNearestNeighbors(name) {

  var similarityScores = {};
  for (var i = 0; i < data.users.length; i++) {
    var other = data.users[i].name;

    if (other != name) {
      var similarity = euclideanDifference(name, other);
      similarityScores[other] = similarity;
    }
    else{
      similarityScores[other] = -1;
    }
  }
  return similarityScores
}

// a better, more function like euclideanDiff
function euclideanDifference(name1, name2) {
  var ratings1 = users[name1];
  var ratings2 = users[name2];

  var titles = Object.keys(ratings1);
  var nonUsefulTitiles = ['name', 'timestamp'];

  for (var i = 0; i < nonUsefulTitiles.length; i++){
    var nonUsefulTitile = nonUsefulTitiles[i];
    var j = titles.indexOf(nonUsefulTitile);
    titles.splice(j, 1);
  }

  var sum = 0;
  for (var i = 0; i < titles.length; i++){
    var title = titles[i];
    var rating1 = ratings1[title];
    var rating2 = ratings2[title];

    sum += (rating1 - rating2)*(rating1 - rating2);

  }

  var d = sqrt(sum);
  var similarity = 1/(d+1)
  return similarity;
}
