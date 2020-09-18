phasor_array = [];
speed = 0.05;
wave = [];
N = 0;
slider = null;

function setup() {

  /* Setup the animation */
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB);
  textSize(15);
  translate(width / 2, height / 2);
  slider = createSlider(0, 20, 4);
  slider.position(30, 60);
  N = slider.value();

  for (var i = 0; i < N; i++){
    phasor_array = phasor_array.concat(new Phasor(0,0,coeff(0),0));
  }


}

function draw() {

  /* The draw loop which is called continuously */
  translate(width / 2, height / 2);
  background(51);
  stroke(0, 155, 255);
  fill(0, 155, 255);
  text("Slide to increase N", -550, -299);
  stroke(255, 0, 0);

  if (N != slider.value()){
    N = slider.value();
    phasor_array = [];
    for (var i = 0; i < N; i++){
      phasor_array = phasor_array.concat(new Phasor(0,0,coeff(0),0));
    }
  }

  for (var i = 0; i < phasor_array.length-1; i++){
    p = phasor_array[i];
    phasor_array[i+1] = new Phasor(p.x1, p.y1, coeff(i+1), phasor_array[i+1].theta);
    phasor_array[i+1].rotate((i+1)*speed);
  }

  for (var i = 0; i<phasor_array.length; i++){
    drawPhasor(phasor_array[i]);
  }

  first = phasor_array[0];
  last = phasor_array[phasor_array.length-1];

  stroke(0, 155, 255);
  line(last.x1, last.y1, 300, last.y1);
  //line(last.x1, last.y1, last.x1 + 1, last.y1)
  wave.unshift([last.x1, last.y1]);
  stroke(255, 0, 0);
  beginShape();

  for(var j = 0 ; j < wave.length; j++){
      noFill();
      vertex(300+j, wave[j][1]);
      //vertex(wave[j][0], wave[j][1]);
  }

  endShape();

  if(wave.length > 500){
    wave.pop();
  }

}



class Phasor {
  /* custom Phasor class */

  constructor(x0, y0 , r, theta){
    this.x0 = x0
    this.y0 = y0;
    this.r = r;
    this.theta = theta;
    this.x1 = x0+r*cos(this.theta);
    this.y1 = y0-r*sin(this.theta);
  }

  rotate(angle){
    this.theta += angle;
    this.x1 = this.x0+this.r*cos(this.theta);
    this.y1 = this.y0-this.r*sin(this.theta);
  }


}

function drawPhasor(p){
  stroke(255, 255, 255);
  noFill();
  circle(p.x0, p.y0, 2*p.r);
  drawArrow(p.x0, p.y0, p.x1, p.y1, [255,0,0]);
}

function drawArrow(x1, y1, x2, y2, color_array) {
  /* Function to draw an arrow */
  stroke(color_array[0], color_array[1], color_array[2]);
  fill(color_array[0], color_array[1], color_array[2]);
  s = dist(x1, y1, x2, y2) / 10;
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  triangle(-s * 2, -s, 0, 0, -s * 2, s);
  pop();
  line(x1, y1, x2, y2);
  stroke(0, 0, 0);
  fill(0, 0, 0);
}


function coeff(n){
  if(n > 0){
    return 100 * (4/(n*Math.PI));
  }
  return 0;
}
