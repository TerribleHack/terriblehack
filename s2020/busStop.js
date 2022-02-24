function busStop(busPosition) {
  noStroke();
  
  // Sign pole
  push();
  translate(500, -250, 50);
  box(10, 500, 10);
  pop();
  
  // Sign
  push();
  translate(500, -450, 75);
  box(5, 50, 50);
  pop();
  
  // Walls
  push();
  translate(0, -200, 0);
  box(20, 400, 200);
  pop();
  
  push();
  translate(400, -200, 0);
  box(20, 400, 200);
  pop();
  
  // Top
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("Wait for bus", 200, -450);
  push();
  translate(200, -400, 0);
  box(500, 20, 200);
  pop();
  
  // Bench
  push();
  translate(250, -50, 0);
  box(300, 20, 100);
  pop();
  
  // Other person
  push();
  translate(280, 0, 0);
  person();
  pop();

  // Bus
  if (abs(busPosition.x) < 950) {
    push();
    translate(busPosition.x, busPosition.y + -300, busPosition.z);
    box(400, 250, 250);
    pop();
  }
}
