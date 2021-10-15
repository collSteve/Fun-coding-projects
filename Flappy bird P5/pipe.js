
function Pipe() {
  this.pimg = loadImage('source/pipes(2).png');
  this.minTop=50
  this.gap = random(100,200);
  this.top = random(this.minTop,height*2/3);
  this.bottom = height-this.gap-this.top;
  this.x = width;
  this.w=40;

  this.speed=5;
  this.hitt = false;

  this.hits = function(bird) {
      if (bird.y < this.top || bird.y > height-this.bottom){
        if (bird.x > this.x && bird.x < this.x+this.w) {
          this.hitt=true
          return true;
        }
      }
    this.hitt=false;
    return false
  }

  this.show = function() {
    fill(225);
    if (this.hitt) {
      fill(225,0,0);
    }

    push();
    translate(0,this.top);
    scale(1,-1);
    image(this.pimg,this.x,0,this.w,this.top);
    pop();

    image(this.pimg,this.x,height-this.bottom,this.w,this.bottom);

    // rect(this.x,0,this.w,this.top);
    // rect(this.x,height-this.bottom,this.w,this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }
}
