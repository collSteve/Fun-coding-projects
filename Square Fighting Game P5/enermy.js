function Enermy(x, y, m, r, health, mana, weapons, g) {

    this.x = x;
    this.y = y;
    this.m = m;
    this.vx = 0;
    this.vy = 0;
    this.r = r;
    this.health = health;
    this.mana = mana;
    this.weapons = weapons;

    this.g = g;

    this.show = function() {
      push();
      noStroke();
      textAlign(CENTER, CENTER);
      fill(225);
      rectMode(CENTER);
      text(this.health, this.x, this.y-2*this.r);
      pop();
      push();
      fill(225);
      stroke(0);
      ellipse(this.x,this.y,2*this.r,2*this.r);
      pop();
    }

    this.update = function(){
      this.vy += this.g;


      this.x += this.vx;
      this.y += this.vy;



      if ((this.y + this.r) > height){
        this.y = height - this.r;
        this.vy = 0;
      }

      if ((this.y - this.r) < 0){
        this.y = this.r;
        this.vy = 0;
      }
      if ((this.x+this.r) > width){
        this.x = width-this.r;
        this.vx = 0;
      }

      if ((this.x-this.r) < 0){
        this.x = this.r;
        this.vx = 0;
      }

    }

}
