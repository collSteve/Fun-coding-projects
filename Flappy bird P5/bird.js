function Bird(){
  this.y=height/2;
  this.x=width/4;

  this.gravity = 0.8;
  this.velocity=1;
  this.lift=-15;

  this.show = function(){
    fill(225);
    ellipse(this.x,this.y,25,25);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function(){
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y> height){
      this.y=height;
      this.velocity=0;
    }

    if (this.y< 0){
      this.y=0;
      this.velocity=0;
    }

  }
}
