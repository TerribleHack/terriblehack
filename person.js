function person(walking) {
  noStroke();
  ambientMaterial(250);
  //specularMaterial(250);
  
  // Head
  push();
  translate(0, -200, 0);
  scale(0.5);
  sphere(50, 10, 10);
  pop();
  
  push();
  translate(0, -120, 0);
  scale(0.5, 1, 0.5);
  sphere(50, 10, 10);
  pop();
  
  [-1, 1].forEach(side => {
    ambientMaterial(250);
    stroke(200, 50, 50);
    noFill();
    
    // arm
    line(
      side*20, -150, 0,
      side*50, -50,
        walking ?
        sin(side + frameCount/10)*50 :
        0
    );
    
    // leg
    line(
      side*10, -80, 0,
      side*20, 0,
        walking ?
        sin(side + frameCount/10)*50 :
        0
    );
    
    // eyes
    noStroke();
    fill(255);
    emissiveMaterial(255);
    push();
    translate(side*15, -200, 20);
    sphere(10, 5, 5);
    pop();
  });
}
