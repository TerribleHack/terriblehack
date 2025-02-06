function petCat(heading) {
  push();
  translate(-catPosition.x, -catPosition.y, -catPosition.z);
  translate(camera.x - 500, -450, camera.z);

  textSize(24);
  textAlign(CENTER);
  fill(255);
  text("Cat", 0, 0);

  const toCat = catPosition.copy().sub(camera.copy().add(-500, -450, 0)).setMag(25);
  translate(0, 30, 0);
  stroke(255);
  line(
    0, 0, 0,
    toCat.x, toCat.y, toCat.z
  );
  noStroke();
  translate(toCat.x, toCat.y, toCat.z);
  sphere(5, 5, 5);
  pop();

  push();
  translate(40, -250, 0);
  textSize(24);
  fill(255);
  textAlign(CENTER);
  text("Pet the cat", 0, 0);
  pop();

  push();
  rotateY(PI - heading);
  cat();
  pop();
}

function cat() {
  noStroke();
  ambientMaterial(250);

  push();
  translate(-40, -50, 0);

  // Head
  sphere(20, 5, 5);

  // Body
  push();
  translate(50, 0, 0);
  scale(2, 1, 1);
  sphere(20, 10, 10);
  pop();

  // Ears
  [-1, 1].forEach(side => {
    push();
    translate(-8, -15, side*8);
    scale(1, 1.8, 1);
    sphere(7, 5, 5);
    pop();
  });

  // Eyes
  [-1, 1].forEach(side => {
    noStroke();
    fill(255);
    emissiveMaterial(255);
    push();
    translate(-20, -5, side*8);
    sphere(5, 5, 5);
    pop();
  });

  stroke(200, 50, 50);
  ambientMaterial(250);
  noFill();

  // tail
  push();
  translate(90, 0, 0);
  beginShape();
  vertex(0, 0, 0);
  bezierVertex(
    20, 0, 0,
    20, -40, 0,
    40, -40, 0
  );
  endShape();
  pop();

  // Legs
  push();
  translate(50, 0, 0);
  [-1, 1].forEach(side1 => {
    [-1, 1].forEach(side2 => {
      line(
        side1*25, 0, side2*15,
        side1*25 + sin(3*side1 + 2*side2 + frameCount/10)*20,
        50, side2*15
      );
    });
  });
  pop();

  pop();
}
