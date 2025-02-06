const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const spacejamInput = document.getElementById('spacejam');
const emailInput = document.getElementById('email');
const applyLink = document.getElementById('apply');

const getLink = () => {
  const name = encodeURIComponent(nameInput.value);
  const location = encodeURIComponent(locationInput.value);
  const spacejam = encodeURIComponent(spacejamInput.value);
  const email = encodeURIComponent(emailInput.value);

  return `https://docs.google.com/forms/d/e/1FAIpQLSdDoCWLhEOt_hVR04474f2xKHJe0jrEuoO87Ra5BQlXtXLyGQ/viewform?usp=pp_url&entry.1160134771=${name}&entry.1912821810=${email}&entry.2117272494=${location}&entry.42582944=${spacejam}`;
};

[nameInput, locationInput, spacejamInput, emailInput].forEach(input => {
  input.addEventListener('change', () => {
    applyLink.setAttribute('href', getLink());
  });
});
