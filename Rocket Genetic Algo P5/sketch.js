let target;
let population;
let mutationRate;
let popMax;
let parentsNum;

let lifeSpan = 300;
let lifeCount = 0;

// display HTML
let bestScores;
let allPhrases;
let stats;

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent("displayRight")
  target =  createVector(width/2, 0);
  mutationRate = 0.01;
  popMax = 100;
  parentsNum = 2;
  population = new Population(target, mutationRate, popMax, createVector(width/2, height), parentsNum = parentsNum);

  //display
  bestPhrase = createP("bestPhrase");
  //stats.position(10,200);
  bestPhrase.class("bestPhrase");
  bestPhrase.parent("displayLeft");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");
  stats.parent("displayLeft");
}



function draw() {
  background(0);

  push();
  fill(255);
  ellipse(target.x, target.y, 20, 20);

  pop();

  population.run();
  //
  //

  lifeCount ++;
  display();

  // if (population.bestResult == target) {
  //   noLoop();
  // }
  //population.eleluate();

  if (lifeCount == lifeSpan) {
    //population.calcFitness();



    population.naturalSelection();

    population.regenerate();

    lifeCount = 0;
  }




}

function display() {
  let bestText = "";
  bestText += "Best: " + population.bestResult + "<br>";
  bestText += "Completed: " + population.completeNum;
  bestPhrase.html(bestText);

  let statText = "";
  statText = "population Length: " + population.popMax + "<br>";
  statText += "Parent Number: " + population.parentsNum + "<br>";
  statText += "Generation: " + population.generations + "<br>";
  statText += "Mutation Rate:" + floor(population.mutationRate *100) +"%" +"<br>";

  stats.html(statText);


}
