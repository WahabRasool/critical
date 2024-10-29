//#mathober2024

const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let w;
let gSpace;

function setup() {
  w = max(400, min(windowWidth, windowHeight) * 0.9);
  gSpace = (w / nGrid) * 0.95;
  describe(
    "a point on a wavy curve riding the wave from left to right with its tangent line as the curve changes. On a blueprint design."
  );
  createCanvas(w, w);
  rectMode(CENTER);
  d = w;
  angleMode(DEGREES);
  textSize(16);
  r = 4 * gSpace;
}

function draw() {
  background(bgCol);
  translate(w / 2, w / 2);
  drawGrid();
  t = frameCount / 3;
  t1 = -w / 2 + gSpace + (t % (w - 2 * gSpace));
  strokeWeight(1);
  noStroke();
  fill(255);
  a = 5 * gSpace;
  b = 2 + 2 * sin(t);
  c = 4 * gSpace;
  d = 1 / 6;

  function f(x) {
    return a * cos(x * b) * sin(x) - c * tan(x * d);
  }

  function fPrime(x) {
    return (
      a * (-b * sin(b * x) * sin(x) + cos(b * x) * cos(x)) -
      (c * d) / pow(cos(d * x), 2)
    );
  }
  // fill(gCol)
  noFill();
  stroke(gCol);
  beginShape();
  for (let i = -w / 2 + gSpace; i < w / 2 - gSpace; i++) {
    circle(i, f(i), 2);
    vertex(i, f(i));
  }
  endShape();

  x = t1;
  m = -fPrime(x);
  d1 = gSpace * 2;
  let scaleFactor = 2 / a;
  let scaledM = m * scaleFactor;
  let dx = d1 / sqrt(1 + scaledM * scaledM);
  let dy = (d1 * scaledM) / sqrt(1 + scaledM * scaledM);

  dy = -dy;
  let x4 = x + dx;
  let y4 = f(x) + dy;
  let x5 = x - dx;
  let y5 = f(x) - dy;
  stroke(255);
  strokeWeight(2);
  circle(x, f(x), 10);
  line(x5, y5, x4, y4);

  noStroke();
  fill(bgCol);
  rect(-width / 2 + gSpace / 2, 0, gSpace, height);
  rect(width / 2 - gSpace / 2, 0, gSpace, height);
  rect(0, -width / 2 + gSpace / 2, height, gSpace);
  rect(0, width / 2 - gSpace / 2, height, gSpace);

  fill(gCol);
  text("critical", -w / 2 + 10, w / 2 - 5);
}

function drawGrid() {
  stroke(gCol);
  strokeWeight(0.3);
  for (let i = 1; i <= nGrid; i++) {
    for (let j = 1; j <= nGrid; j++) {
      line(
        -w / 2 + gSpace * i,
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace
      );
      line(
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace,
        -w / 2 + gSpace * i
      );
    }
  }
  noFill();
  strokeWeight(3);
  rect(0, 0, w - 2 * gSpace);
}

function mousePressed() {
  setup();
  draw();
}

function windowResized() {
  setup();
  draw();
}
