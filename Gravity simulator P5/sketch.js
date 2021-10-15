var particle;
var p1_mass = 500000;
var p2_mass = 500000;

function setup() {
createCanvas(windowWidth, windowHeight);
var p1_x = 0;
var p1_y = height/2.5;
var p2_x = width/2;
var p2_y = height/2;
var p1_vx = 80;
var p1_vy = 0;
var p2_vx = 0;
var p2_vy = 0;
var p1_density = 10;  //10 seems to work greatly
var p2_density = 30;

particle1 = new Particle(p1_x,p1_y,p1_mass,p1_vx,p1_vy,p1_density);
particle2 = new Particle(p2_x,p2_y,p2_mass,p2_vx,p2_vy,p2_density);
console.log("The raius of the p1 is")
console.log(particle1.r);
console.log("The raius of the p2 is")
console.log(particle2.r);

}

function draw() {
  background(0);

  particle1.update(particle2.x,particle2.y,p2_mass,particle2.r);
  particle2.update(particle1.x,particle1.y,p1_mass,particle1.r);
  particle1.show();
  particle2.show();
}

function keyPressed() {
  if (key == 'w'){
    particle1.up();
  }

  if (key == 's'){
    particle1.down();
  }

  if (key == 'a'){
    particle1.left();
  }

  if (key == 'd'){
    particle1.right();
  }

  if (keyCode === UP_ARROW){
    particle2.up();
  }

  if (keyCode === DOWN_ARROW){
    particle2.down();
  }

  if (keyCode === LEFT_ARROW){
    particle2.left();
  }

  if (keyCode === RIGHT_ARROW){
    particle2.right();
  }
}

function windowResized() {
  resizeCanvas(0.9*windowWidth, 0.9*windowHeight);
}
