let position, velocity, camera;
let lastHeading = 0;
let font;

let catHeading, catPosition;
let busPosition;

let prompts;

const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const catsInput = document.getElementById('cats');
const emailInput = document.getElementById('email');
const applyLink = document.getElementById('apply');

const getLink = () => {
  const name = encodeURIComponent(nameInput.value);
  const location = encodeURIComponent(locationInput.value);
  const cats = encodeURIComponent(catsInput.value);
  const email = encodeURIComponent(emailInput.value);

  return `https://docs.google.com/forms/d/e/1FAIpQLSclDdyQ1x8nYiKUfseDs4EJHjU1Vck8OHsh0iGy7PbM1tR2Qw/viewform?usp=pp_url&entry.1160134771=${name}&entry.1912821810=${email}&entry.2117272494=${location}&entry.42582944=${cats}`;
};

[nameInput, locationInput, catsInput, emailInput].forEach(input => {
  input.addEventListener('change', () => {
    applyLink.setAttribute('href', getLink());
  });
});

function preload() {
  font = loadFont('https://cdn.jsdelivr.net/npm/@typopro/dtp-e-b-garamond@3.7.5/TypoPRO-EBGaramond-Regular.ttf');
}

function setup() {
  const canvas = createCanvas(700, 400, WEBGL);
  canvas.parent('canvasContainer');

  // Keep it low-fi!!!
  pixelDensity(1);

  position = createVector(0, 0, 0);
  velocity = createVector(0, 0, 0);
  camera = createVector(0, 0, 0);
  textFont(font);

  catHeading = 0;
  catPosition = createVector(-800, 0, -100);

  busPosition = createVector(-1000, 0, 200);

  prompts = shuffle([
    "Wow, stuff in Animal Crossing is worth more than oil!",
    "Anyone got any sourdough starter?",
    "Maybe it's time I join this TikTok thing",
    "What even is a weekend any more?",
    "Dear past self: buy Zoom stock",
    "I should get good at darts",
    "I've never found the film Rear Window more relatable",
    "Can I order friends on Amazon?",
    "I hope my neighbours don't mind me learning the bagpipes",
  ]);
}

let tapStart = null;
function mousePressed() {
  tapStart = createVector(mouseX, mouseY);
}

function mouseReleased() {
  tapStart = null;
}

function update() {
  velocity.x = 0;
  velocity.y = 0;
  velocity.z = 0;
  
  const threshold = 40;
  if (keyIsDown(65) || (tapStart && mouseX < tapStart.x - threshold)) { 
    velocity.x -= 5; 
  }
  if (keyIsDown(68) || (tapStart && mouseX > tapStart.x + threshold)) { 
    velocity.x += 5; 
  }
  if (keyIsDown(87) || (tapStart && mouseY < tapStart.y - threshold)) { 
    velocity.z -= 5; 
  }
  if (keyIsDown(83) || (tapStart && mouseY > tapStart.y + threshold)) { 
    velocity.z += 5; 
  }
  
  position.add(velocity);
  
  camera.add(position.copy().sub(camera).mult(0.2));

  catHeading += map(noise(millis()/1000), 0, 1, -0.04, 0.04);
  catPosition.add(0.4*cos(catHeading), 0, 0.4*sin(catHeading));

  const inBusStop = position.copy().sub(createVector(500, 0, 300)).magSq() < 20000;
  if (inBusStop && abs(lastHeading) > PI/2) {
    if (busPosition.x < -900) {
      busPosition.x = 1000;
    }
    busPosition.add(createVector(300, 0, 300).sub(busPosition).mult(0.05));
  } else {
    busPosition.add(createVector(-1000, 0, 300).sub(busPosition).mult(0.05));
  }
}

function draw() {
  update();
  
  background(0);
  ambientLight(50);
  directionalLight(255, 0, 0, 0.25, 0.25, 0);
  pointLight(0, 0, 255, width/2, height/2, 250);
  
  scale(0.4);
  rotateX(-PI/8);
  translate(-camera.x, 100, -camera.z + 200);

  push();
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Welcome to TerribleHack:\nReal Life", -200, -300);
  textSize(30);
  text("Explore with WASD or tap & drag", -200, -150);
  pop();
  
  push();
  const walking = velocity.magSq() > 0;
  translate(position.x, position.y, position.z);
  
  push();
  if (walking) {
    lastHeading = PI/2 + atan2(-velocity.z, velocity.x);
  }
  rotateY(lastHeading);
  person(walking);
  pop();
  
  translate(0, -250, 0);
  textSize(24);
  fill(255);
  textAlign(CENTER);
  text("YOU", 0, 0);
  pop();
  
  push();
  translate(300, 0, 300);
  busStop(busPosition);
  pop();

  push();
  translate(catPosition.x, catPosition.y, catPosition.z);
  petCat(catHeading);
  pop();

  push();
  translate(-600, 0, 300);
  talkToStranger();
  pop();
}
