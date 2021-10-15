function Player(x, y, m, r, health, mana, defence, weapons, g) {

    this.x = x;
    this.y = y;
    this.m = m;
    this.vx = 0;
    this.vy = 0;
    this.r = r;
    this.defence = defence;
    this.x_friction = 0.5;
    this.y_up_friction = 0.9;
    this.y_down_friction = 0.9;
    this.weapons = weapons;

    this.current_weapon = weapons_dict[this.weapons[0]];

    this.g = g;

    this.show = function() {
    fill(225,0,0);
    stroke(225,0,0);
    rectMode(CENTER);
    //ellipse(this.x,this.y,2*this.r,2*this.r);
    rect(this.x,this.y,2*this.r,2*this.r);
    }

    this.update = function(){
      this.vy += this.g;

      //Apply friction
      if (this.vx != 0){
        this.vx *= this.x_friction;
      }
      if (this.vy > 0){
        this.vy *= this.y_down_friction;
      }
      else if (this.vy < 0){
        this.vy *= this.y_up_friction;
      }


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

    this.up = function(v){
      this.vy -= v;
    }
    this.down = function(v){
      this.vy += v;
    }
    this.left = function(v){
      this.vx -= v;
    }
    this.right = function(v){
      this.vx += v;
    }

}
