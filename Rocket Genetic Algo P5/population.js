class Population {
  constructor(target, mutationRate, popMax, startPoint, parentsNum = 2) {
    this.generations = 0;  //keep track of generations
    this.lifeSpan = lifeSpan;
    this.startPoint = startPoint.copy();

    this.bestResult = 0;
    this.target = target.copy();
    this.mutationRate = mutationRate;
    this.popMax = popMax;
    this.parentsNum = parentsNum;
    this.completeNum = 0;

    this.population = [];
    for (let i = 0; i < this.popMax; i++) {
      this.population[i] = new Creature(this.lifeSpan, this.startPoint, target=this.target);

    }

    this.matepool = [];
    this.calcFitness();
  }

  run() {
    for (let i=0; i<this.population.length; i++) {
      this.population[i].update();
      this.population[i].show();
    }
    this.calcFitness();
    this.eleluate();

  }

  calcFitness() {
    for (let i=0; i<this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  // find the maximum fitness in the population
  getMaxFitness() {
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    return maxFitness;
  }

  naturalSelection() {
    this.matepool = [];
    // determine the maximum fitness now;
    let maxFitness = this.getMaxFitness();



    for (let i =0; i<this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1); // normalize the fitness for the ith pop, get pobalibility for it to be selected
      let likeHood = floor(fitness*100);
      for (let j=0; j<likeHood; j++) {
        this.matepool.push(this.population[i]);
      }
    }
  }

  // reproduction, then use the child as new population [by corss over parents]
  regenerate() {
    for (let i = 0; i< this.population.length; i++) {
      let parents = [];
      for (let j = 0; j < this.parentsNum; j++) {
        parents.push(random(this.matepool));  // randomly select parent from mating pool
      }
      let mother = parents.shift();
      let fathers = parents;
      let child = mother.crossOver(fathers);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations ++;
  }

  getBest() {
    let maxFitness = 0;
    let best;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
        best = this.population[i];
      }
    }
    return best;
  }

  eleluate() {
    let best = this.getBest();
    this.bestResult = dist(best.pos.x, best.pos.y, this.target.x, this.target.y).toFixed(1);

    this.completeNum = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].complete) {
        this.completeNum ++;
      }
      // change the color of the all population to be default
      this.population[i].color = [255,255,255];
    }
    best.color = [255, 0, 0];
  }


}
