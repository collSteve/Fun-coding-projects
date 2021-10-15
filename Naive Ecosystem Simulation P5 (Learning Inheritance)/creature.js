function collisionCreature(creature1, creature2) {
  if (abs(creature1.x-creature2.x) < (creature1.r + creature2.r) && abs(creature1.y-creature2.y) < (creature1.r + creature2.r)) {
    return true;
  }
  else {
      return false;
  }
}


class Creature {

  constructor(x, y, hunger) {
    this.m = 10;
    this.type = 'creature';
    this.x = x;
    this.y = y;
    this.r = 10;
    this.v = 4;
    this.hunger = hunger;

    this.reaction = {
      'fox': 0,
      'wolf': 0,
      'grass': 0,
      'carrot': 0
    };
  }

  update(others) {
    var deleteMeBool = false;
    var sheerForce = [0, 0];

    if (others != []){
      for (var i = 0; i < others.length; i++) {
        if (others[i] != this) { //not affect br itself
          var otherType = others[i].type;
          var otherX = others[i].x;
          var otherY = others[i].y;
          var displacement = [otherX - this.x, otherY - this.y];
          var megDisplacement = sqrt(pow(displacement[0],2) + pow(displacement[1],2));

          // if collision happens, one die or live
          if (collisionCreature(others[i], this)) {
            // check if they have dislike and like relation
            var predatorsList = Object.keys(predatingDict);

            // check if others[i] is a predator and this is others[i]'s prey
            if (predatorsList.includes(others[i].type) && predatingDict[others[i].type].includes(this.type)) {
              others.splice(others.indexOf(this), 1); // remove this from others list since it is eaten
              deleteMeBool = true;
            }
            // check if this is a predator and others[i] is this's prey
            else if (predatorsList.includes(this.type) && predatingDict[this.type].includes(others[i].type)) {
              others.splice(i, 1); // remove others[i] from others list since it is eaten
            }
            else {
              if (abs(displacement[0]) > abs(displacement[1])) {
                var move = this.r + others[i].r - abs(displacement[0]);
                this.x -= displacement[0]/abs(displacement[0]) * move;
                this.y -= displacement[1]/abs(displacement[1]) * move;
              } else {
                var move = this.r + others[i].r - abs(displacement[1]);
                this.x -= displacement[0]/abs(displacement[0]) * move;
                this.y -= displacement[1]/abs(displacement[1]) * move;
              }
            }
          }

          //update sheerForce
          sheerForce[0] += this.reaction[otherType]/(1 + abs(displacement[0])) * displacement[0]/megDisplacement;
          sheerForce[1] += this.reaction[otherType]/(1 + abs(displacement[1])) * displacement[1]/megDisplacement;
        }
      }
    }

    var magSheerForce = sqrt(pow(sheerForce[0],2) + pow(sheerForce[1],2));

    if (magSheerForce != 0) {
      var unitSheerForce = [sheerForce[0]/magSheerForce, sheerForce[1]/magSheerForce];
    }
    else {
      var unitSheerForce = [0,0];
    }

    this.x += this.v*unitSheerForce[0];
    this.y += this.v*unitSheerForce[1];

    // boundary check
    if (this.x + this.r> width) {
      this.x = width - this.r;
    } else if (this.x - this.r < 0) {
      this.x = 0 + this.r;
    }
    if (this.y + this.r > height) {
      this.y = height - this.r;
    } else if (this.y - this.r < 0) {
      this.y = 0 + this.r;
    }

    return deleteMeBool;
  }

  show() {
    rectMode(CENTER);
    fill(0,0,0);
    rect(this.x,this.y,2*this.r,2*this.r);
  }

}
