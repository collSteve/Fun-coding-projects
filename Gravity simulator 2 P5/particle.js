var G = 10;

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

class Particle {
  constructor(x, y, m, vx=0, vy=0, density=4) {
    this.m = m;
    this.density = density;
    this.r = (this.m/(this.density));
    this.pos = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);

    // //for fun
    // this.timeLap = random(20,100);
  }

  show(showV=false, showA=false) {
    fill(0);
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    //debuging
    // var angle = frameCount/this.timeLap;
    // drawArrow(this.pos, p5.Vector.mult(createVector(cos(angle), sin(angle)), this.r), 'green');

    if (showV == true) {
      if (this.velocity.equals(0,0)){}
      else{
        drawArrow(this.pos, p5.Vector.mult(this.velocity,10), 'blue');  // enlarge velocity by 10 to better visualize
      }
    }
    if (showA == true) {
      if (this.acceleration.equals(0,0)){}
      else{
       drawArrow(this.pos, p5.Vector.mult(this.acceleration, 50), 'red'); // enlarge acceleration by 50 to better visualize
     }
    }
  }

  update(particles) {
    var force = this.exertForce(particles);
    this.acceleration = force.div(this.m);
    this.velocity = p5.Vector.add(this.velocity, this.acceleration);
    this.pos = this.pos.add(this.velocity);

    this.collisionUpdate(particles);

  }

  exertForce(particles) {
    // calculate force
    var totalForce = createVector(0,0);
    for (var i=0; i<particles.length; i++) {
      if (particles[i] != this) {
        var other = particles[i];
        var displacementV = p5.Vector.sub(other.pos, this.pos);
        var force = p5.Vector.mult(displacementV, G*other.m*this.m/pow(displacementV.mag(), 3));
        totalForce = p5.Vector.add(totalForce, force);
      }
    }
    return totalForce;
  }

  collisionUpdate(particles) {
    for (var i=0; i<particles.length; i++) {
      if (particles[i] != this) {
        var other = particles[i];
        var displacementV = p5.Vector.sub(this.pos, other.pos);

        var distance = p5.Vector.mag(displacementV);
        var unitDisplacement = p5.Vector.div(displacementV, distance);
        var r1 = this.r;
        var r2 = other.r;

        if (distance < r1+r2) {
          this.pos = p5.Vector.add(this.pos, p5.Vector.mult(unitDisplacement, r1+r2-distance));
          this.velocity.set(0,0);
        }
      }
    }
  }
}

class StatParticle extends Particle {
  constructor(x, y, m, vx=0, vy=0, density=4) {
    super(x, y, m, vx=vx, vy=vy, density=density);
  }

  update(particles) {
    this.pos = this.pos;
  }
}
