const PI = Math.PI;

var weapons_dict = {
  0:{'name':'fist','type':'melee','attack_type':'swing','damage':1,'speed':3,'bullet_type':null},
  1:{'name':'pocket knife','type':'melee','attack_type':'swing','damage':3,'speed':5,'bullet_type':null},
  2:{'name':'baseball bat','type':'melee','attack_type':'swing','damage':4,'speed':3,'bullet_type':null},
  3:{'name':'iron axe','type':'melee','attack_type':'swing','damage':6,'speed':4,'bullet_type':null},
  4:{'name':'warrios sword','type':'melee','attack_type':'swing','damage':10,'speed':7,'bullet_type':null},

  5:{'name':'caplock','type':'range','attack_type':'bullet','speed':3},
  6:{'name':'M16','type':'range','attack_type':'bullet','speed':3},
  7:{'name':'RPG','type':'range','attack_type':'bullet','speed':3}
};

var swing_dict={
  'fist':{'damage':1,'line_stroke':3,'vr':1,'v_angle':0.1,'r':50,'angle':PI/5,'r_range':60,'angle_range':PI/4,'color':[156, 145, 90]},
  'pocket knife':{'damage':3,'line_stroke':1,'vr':3,'v_angle':0.1,'r':50,'angle':PI/5,'r_range':70,'angle_range':PI/4,'color':[181, 181, 181]},
  'baseball bat':{'damage':3,'line_stroke':3,'vr':1,'v_angle':0.1,'r':50,'angle'}
};

var bullet_dict={
  'caplock':{'v':10,'damage':5,'r':2,'color':[181, 181, 181]},
  'M16':{'v':20,'damage':15,'r':5,'color':[246, 255, 0]},
  'RPG':{'v':8,'damage':30,'r':15,'color':[158, 156, 152]}
};

function Bullet(x, y, px, py, weapon) {
  this.weapon = weapon;
  this.v = bullet_dict[this.weapon['name']]['v'];
  this.damage = bullet_dict[this.weapon['name']]['damage'];
  this.r = bullet_dict[this.weapon['name']]['r'];
  this.color = bullet_dict[this.weapon['name']]['color'];

  this.x = x;
  this.y = y;
  this.dx = px - x;
  this.dy = py - y;
  this.distance = Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));
  this.vx = this.dx*this.v/this.distance;
  this.vy = this.dy*this.v/this.distance;


  this.show = function(){
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    ellipse(this.x, this.y,this.r,this.r);
  }

  this.update = function(){
    this.x += this.vx;
    this.y += this.vy;


  }
}

function Swing(x, y, px, py, weapon) {
  this.weapon = weapon;

  this.x = x;
  this.y = y;
  this.dx = px - x;
  this.dy = py - y;

  if ((this.dx>0)){
    this.ini_angle = Math.atan(this.dy/this.dx);
  } else if ((this.dx<0)){
    this.ini_angle = Math.atan(this.dy/this.dx)+PI;
  }

  this.angle = swing_dict[this.weapon['name']]['angle'];
  this.damage = swing_dict[this.weapon['name']]['damage'];
  this.vr = swing_dict[this.weapon['name']]['vr'];
  this.v_angle = swing_dict[this.weapon['name']]['v_angle'];
  this.r = swing_dict[this.weapon['name']]['r'];
  this.r_range=swing_dict[this.weapon['name']]['r_range'];
  this.angle_range=swing_dict[this.weapon['name']]['angle_range'];
  this.line_stroke = swing_dict[this.weapon['name']]['line_stroke'];

  this.show = function() {
    push();
    noFill();
    stroke(255,255,255,100);
    strokeWeight(this.line_stroke);
    arc(this.x, this.y, this.r, this.r, this.ini_angle-this.angle, this.ini_angle+this.angle);
    pop();
  }

  this.update = function(){
    this.r+=this.vr;
    this.angle+=this.v_angle;
  }
}

function update_bullets(bullets) {
  for (var i = 0; i < bullets.length; i++){
    if (bullets[i].x>0 && bullets[i].x<windowWidth && bullets[i].y>0 && bullets[i].y<windowHeight){
      bullets[i].update();
      bullets[i].show();
    }
    else{
      bullets.splice(i,1);
      i-=1;
    }
  }
}

function update_swings(swings) {
  for (var i = 0; i < swings.length; i++){
    if (swings[i].angle<swings[i].angle_range && swings[i].r<swings[i].r_range){
      swings[i].update();
      swings[i].show();
    }
    else{
      swings.splice(i,1);
      i-=1;
    }
  }
}
