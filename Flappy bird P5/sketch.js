var bird;
var pipes = [];
var bg;

function setup() {
  bg = loadImage('source/space_background.jpg');
  createCanvas(800,600);
  bird= new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(bg);

  for (var i = pipes.length-1; i >=0; i--){

    pipes[i].update();

    if (pipes[i].hits(bird)) {
      noLoop();
    }

    //might need to change order
    pipes[i].show();

    if (pipes[i].x < -pipes[i].w){
      pipes.splice(i,1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount%60 == 0){
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' '){
    bird.up();
  }

  if (key == 'q'){
    loop();
  }
}

function mousePressed() {
  bird.up();
}
