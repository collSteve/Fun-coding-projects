int cols, rows;
int scale = 20;
int delZ = 100;


float toff = 0;
float flying = 0;

void setup() {
  size(600, 600, P3D);
  int w = 1200;
  int h = 1200;
  cols = w/scale;
  rows = h/scale;
  
}

void draw() {
  flying -= 0.02;
  background(0);
  stroke(255);
  noFill();

  translate(0, height/2 + 50);
  
  rotateX(PI/3);
  
  translate(-width/2, -height/2);
  for (int y =0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (int x=0; x < cols; x++){
      float xoff = float(x)/10;
      float yoff = float(y)/10 + flying;
      float yPlusOff = float(y+1)/10 + flying;
    
      vertex(x*scale, y*scale, map(noise(xoff, yoff, toff), 0, 1, -delZ, delZ));
      vertex(x*scale, (y+1)*scale, map(noise(xoff, yPlusOff, toff), 0, 1, -delZ, delZ));
     // rect(x*scale, y*scale, scale,scale);
    
    }
    endShape();
  }
  
  if (frameCount%3 == 0) {
    toff += 0.01;
  }
}
