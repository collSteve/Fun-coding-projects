var particles = [];
var showV = false;
var showA = false;

function generateParticles() {
  particles = [];
  for (var i=0; i<particlesInput.value(); i++) {
    particles.push(new Particle(random(width), random(height), random(50, 100)));
  }
  for (var i=0; i<statparticlesInput.value(); i++) {
    particles.push(new StatParticle(random(width), random(height), random(50, 100)));
  }
}

function changeShowV() {
  if (this.checked()) {
    showV = true;
  } else {
    showV = false;
  }
}

function changeShowA() {
  if (this.checked()) {
    showA = true;
  } else {
    showA = false;
  }
}


function setup() {

  particlesInput = createInput('');
  statparticlesInput = createInput('');
  button1 = createButton('Submit');
  button1.mousePressed(generateParticles);

  // checkBoxes to wheather show vectors or not
  velocityCheckbox = createCheckbox('show velocity', false);
  velocityCheckbox.changed(changeShowV);

  accelerationCheckbox = createCheckbox('show acceleration', false);
  accelerationCheckbox.changed(changeShowA);


  createCanvas(0.9*windowWidth, 0.9*windowHeight);

}



function draw() {
  background(220);
  //particle1.update();
  for (var i=0; i<particles.length; i++) {
    particles[i].update(particles);
    particles[i].show(showV=showV, showA=showA);

  }
}
