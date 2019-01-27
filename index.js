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
