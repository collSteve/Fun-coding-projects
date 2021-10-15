
function Particle(x, y, m, vx, vy, density) {

  this.x = x;
  this.y = y;
  this.mass= m;
  this.density = density;
  this.r = Math.sqrt(this.mass/(Math.PI*this.density));
  this.g = 0.9;
  this.velocity_y = vy;
  this.velocity_x = vx;
  this.y_move = -15;
  this.x_move = 15;

  this.show = function() {
    fill(225);
    ellipse(this.x,this.y,2*this.r,2*this.r);
  }

  this.up = function() {
  this.velocity_y += this.y_move;
  }

  this.down = function() {
  this.velocity_y -= this.y_move;
  }

  this.left = function() {
  this.velocity_x -= this.x_move;
  }
  this.right = function() {
  this.velocity_x += this.x_move;
  }

  this.update = function(source_x,source_y,source_m,source_r) {

    //store
    var pre_x = this.x;
    var pre_y = this.y;
    //gravity setup
    this.x_dif = this.x - source_x;
    this.y_dif = this.y - source_y;
    this.g_cons=-this.g*source_m/Math.pow(Math.sqrt(Math.pow(this.x_dif,2)+Math.pow(this.y_dif,2)),3);

    this.gravity_x = this.g_cons*this.x_dif;
    this.gravity_y = this.g_cons*this.y_dif;


    //y
    this.velocity_y += this.gravity_y;
    this.y += this.velocity_y;

    //x
    this.velocity_x += this.gravity_x;
    this.x += this.velocity_x;

    //collison check
    this.collison_cons=Math.pow(this.x-source_x,2)+Math.pow(this.y-source_y,2)<=Math.pow(this.r+source_r,2);

    if (this.collison_cons){
      this.angle = Math.atan((source_y-this.y)/(source_x-this.x));
      this.dx = (this.r+source_r)*Math.cos(this.angle);
      this.dy = (this.r+source_r)*Math.sin(this.angle);

      if (this.x < source_x) {
        this.x = source_x - this.dx;
        this.y = source_y - this.dy;
      }
      else{
        this.x = source_x + this.dx;
        this.y = source_y + this.dy;
      }

      this.velocity_x = 0;
      this.velocity_y = 0;
    }



    if (this.y > height){
      this.y = height;
      this.velocity_y = 0;
    }

    if (this.y < 0){
      this.y = 0;
      this.velocity_y = 0;
    }
    if (this.x > width){
      this.x = width;
      this.velocity_x = 0;
    }

    if (this.x < 0){
      this.x = 0;
      this.velocity_x = 0;
    }
  }


}
