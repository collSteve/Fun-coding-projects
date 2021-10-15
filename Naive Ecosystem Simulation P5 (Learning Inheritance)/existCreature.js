

class Rabbit extends Creature {
  constructor(x, y, hunger) {
    super(x, y, hunger);

    this.type = 'rabbit';
    this.m = 4;
    this.r = 10;
    this.v = 1;

    this.reaction = {
      'rabbit': 0.1,
      'fox': -4,
      'wolf': -10,
      'grass': 3,
      'carrot': 10
    };
  }
  show() {
    // rectMode(CENTER);
    // fill(0,225,0);
    // rect(this.x,this.y,2*this.r,2*this.r);
    imageMode(CENTER);
    image(rabbitImage, this.x,this.y,2*this.r,2*this.r);
  }
}

class Fox extends Creature {
  constructor(x, y, hunger) {
    super(x, y, hunger);

    this.type = 'fox';
    this.m = 5;
    this.r = 15;
    this.v = 3;

    this.reaction = {
      'rabbit': 5,
      'fox': 0.1,
      'wolf': -5,
      'grass': 0,
      'carrot': 0
    };
  }
  show() {
    // rectMode(CENTER);
    // fill(255,0,0);
    // rect(this.x,this.y,2*this.r,2*this.r);
    imageMode(CENTER);
    image(foxImage, this.x,this.y,2*this.r,2*this.r);
  }
}

class Wolf extends Creature {
  constructor(x, y, hunger) {
    super(x, y, hunger);

    this.type = 'wolf';
    this.m = 5;
    this.r = 20;
    this.v = 2;

    this.reaction = {
      'rabbit': 3,
      'fox': 6,
      'wolf': 0.1,
      'grass': 0,
      'carrot': 0
    };
  }
  show() {
    // rectMode(CENTER);
    // fill(0,0,255);
    // rect(this.x,this.y,2*this.r,2*this.r);
    imageMode(CENTER);
    image(wolfImage, this.x,this.y,2*this.r,2*this.r);
  }
}

var predatingDict = {
    'wolf': ['rabbit', 'fox'],
    'fox': ['rabbit'],
    'rabbit':['carrot', 'grass']
}

var allCreatureClasses = {
  'wolf': Wolf,
  'rabbit': Rabbit,
  'fox': Fox
}
