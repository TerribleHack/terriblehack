const setVisible = (roulette, visible) => {
  Array.from(roulette.children).forEach((child, i) => {
    if (i === visible) {
      child.classList.add('visible');
    } else {
      child.classList.remove('visible');
    }
  });
};

Array.from(document.querySelectorAll('span.roulette')).forEach(roulette => {
  Array.from(roulette.children).forEach(child => {
    child.dataset.text = child.innerHTML;
  });

  const pickOption = () => {
    let i = 20;
    const spin = () => {
      const picked = Math.floor(Math.random() * roulette.children.length);
      setVisible(roulette, picked);

      if (i > 1) {
        i--;
        setTimeout(spin, 1000/i);
      } else {
        setTimeout(pickOption, Math.random() * 10000 + 5000);
      }
    }

    spin();
  };

  pickOption();
});

const picker = document.getElementById('picker');
picker.addEventListener('change', () => {
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('uploading').innerText = 'Uploading...';
});

const portfolio = document.getElementById('portfolio');
portfolio.addEventListener('input', () => {
  const full = 'https://www.youtube.com/watch?v=CSmRCbjmjno';
  const typed = portfolio.value;

  const replaced = full.substring(0, typed.length);
  portfolio.value = replaced;
});

const nameInput = document.getElementById('name');
const companyInput = document.getElementById('company');
const geeseInput = document.getElementById('geese');
const emailInput = document.getElementById('email');
const applyLink = document.getElementById('apply');

const getLink = () => {
  const name = encodeURIComponent(nameInput.value);
  const company = encodeURIComponent(companyInput.value);
  const geese = encodeURIComponent(geeseInput.value);
  const email = encodeURIComponent(emailInput.value);

  return `https://docs.google.com/forms/d/e/1FAIpQLSdtcHShBKsvr_s-zsJf97dWL2HnjHgndAxl2hL8DWl1Q7x8DA/viewform?usp=pp_url&entry.252297171=${name}&entry.1661162452=${company}&entry.172297209=https://www.youtube.com/watch?v%3DCSmRCbjmjno&entry.825959223=${geese}&entry.1440109685=${email}`;
};

[nameInput, companyInput, geeseInput, emailInput].forEach(input => {
  input.addEventListener('change', () => {
    applyLink.setAttribute('href', getLink());
  });
});
