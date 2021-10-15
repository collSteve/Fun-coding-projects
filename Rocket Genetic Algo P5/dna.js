

function createGene(magnitude) {
  let v = p5.Vector.random2D();
  v.setMag(magnitude);
  return v;
}

class DNA {
  constructor(geneLength, magnitude) {
    this.magnitude = magnitude;
    this.geneLength = geneLength;
    this.genes = [];
    for (let i = 0; i< geneLength; i++) {
      this.genes[i] = createGene(this.magnitude);
    }

  }

}
