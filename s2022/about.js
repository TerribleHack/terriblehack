function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const peopleContainer = document.getElementById('people');
const people = [ ...peopleContainer.querySelectorAll('.person') ];

people.forEach(person => peopleContainer.removeChild(person));
shuffle(people).forEach(person => {
  const rotation = Math.random()*12 - 6;
  const hue = Math.random()*360;
  person.setAttribute('style', `transform: rotate(${rotation.toFixed(4)}deg); filter: hue-rotate(${hue.toFixed(4)}deg)`);
  peopleContainer.appendChild(person);
});
