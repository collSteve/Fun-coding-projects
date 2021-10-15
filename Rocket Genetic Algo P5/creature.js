class Creature {
  constructor(lifeSpan, startPoint, target = target) {
    this.target = target.copy(); //for graphing purpose (let it stop at target)
    this.complete = false;
    this.fitness = 0;
    this.lifeSpan = lifeSpan;
    this.magnitude = 0.1;
    this.DNA = new DNA(this.lifeSpan, this.magnitude);
    this.startPoint = startPoint.copy();
    this.pos = startPoint.copy();
    this.v = createVector(0, 0);
    this.life = 0;
    this.color = [255,255,255];
  }

  update() {
    let d = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    if (d < 10) {
      this.pos = this.target.copy();
      this.complete = true;
      this.color = [0, 255, 0];
    }
    else {
      this.a = this.DNA.genes[this.life];
      this.v.add(this.a);

      this.pos.add(this.v);

      this.life += 1;
    }

  }

  show() {
    push();
    fill(this.color[0], this.color[1], this.color[2], 50);
    //translate to the postion of rocket
    translate(this.pos.x, this.pos.y);
    //rotatates to the angle the rocket is pointing
    rotate(this.v.heading());
    //creates a rectangle shape for rocket
    rectMode(CENTER);
    rect(0, 0, 30, 10);
    pop();
  }

  calcFitness(target) {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);

    if (d == 0) {
      this.fitness = 1;
    }
    else {
      this.fitness = 1/d;
    }
  }

  crossOver(fathers) {
    let child = new Creature(this.lifeSpan, this.startPoint, target = this.target);

    let totalParents = [this].concat(fathers);

    // cross over methos Changable!!!
    let targetLen = this.DNA.genes.length;
    let parentsNum = totalParents.length;
    let fathersNum = fathers.length;

    let inteval = floor(targetLen/parentsNum);
    let thisInteval = targetLen - fathersNum*inteval;

    let index = 0;
    for (let i =0; i<fathers.length; i++) {
      for (let j = index; j < index + inteval; j++) {
        child.DNA.genes[j] = fathers[i].DNA.genes[j];
      }
      index += inteval;
    }

    for (let i = index; i < index + thisInteval; i++) {
      child.DNA.genes[i] = this.DNA.genes[i];
    }
    return child;

  }

  mutate(mutationRate) {
    for (let i = 0; i < this.DNA.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.DNA.genes[i] = createGene(this.magnitude);
      }
    }
  }
}
