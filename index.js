const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const applyLink = document.getElementById('apply');

const getLink = () => {
  const name = encodeURIComponent(nameInput.value);
  const email = encodeURIComponent(emailInput.value);

  return `https://docs.google.com/forms/d/e/1FAIpQLSdzheaLsrUu-LhgnUhfoD6XvucNE_XIqUm8qyu767DgN3EzHw/viewform?usp=pp_url&entry.498838656=${name}&entry.932453923=${email}`
};

[nameInput, emailInput].forEach(input => {
  console.log(input)
  input.addEventListener('change', () => {
    applyLink.setAttribute('href', getLink());
  });
});
