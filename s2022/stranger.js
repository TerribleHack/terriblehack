let talking = false;
let promptIdx = -1;

function talkToStranger() {
  const closeToStranger = createVector(-600, 0, 300).sub(position).magSq() < 20000;
  if (!talking && closeToStranger) {
    talking = true;
    promptIdx = (promptIdx + 1) % prompts.length;
  } else if (!closeToStranger) {
    talking = false;
  }

  person();
  push();
  translate(0, -350, 0);
  textSize(24);
  fill(255);
  textAlign(CENTER);
  text("Talk to a stranger", 0, 0);
  pop();
  if (talking) {
    push();
    translate(0, -300, 0);
    textSize(24);
    fill(255);
    textAlign(CENTER);
    text(`"${prompts[promptIdx]}"`, 0, 0);

    const bounds = font.textBounds(`"${prompts[promptIdx]}"`, 0, 0);
    translate(0, 0, -20);
    fill(0);
    rect(bounds.x-20, bounds.y-20, bounds.w+40, bounds.h+40);


    pop();
  }
}
