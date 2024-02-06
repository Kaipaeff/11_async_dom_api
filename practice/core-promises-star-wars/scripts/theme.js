const themeToggle = document.getElementById('themeToggle');
const spinnerImage = document.querySelector('.spinner');


function handleDOMContentLoaded() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.className = savedTheme;
    updateButtonText(savedTheme);
    updateSpinnerImage(savedTheme);
  }
}

function handleThemeToggleClick() {
  document.body.className = document.body.className === 'light-theme' ? 'dark-theme' : 'light-theme';
  localStorage.setItem('theme', document.body.className);
  updateButtonText(document.body.className);
  updateSpinnerImage(document.body.className);
}

function updateButtonText(theme) {
  themeToggle.innerHTML = theme === 'light-theme' ? 'go to the dark side' : 'return to the light side';
}

function updateSpinnerImage(theme) {
  spinnerImage.src = theme === 'light-theme' ? './practice/core-promises-star-wars/images/yoda.png' : './practice/core-promises-star-wars/images/dvv.webp';
}


document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
themeToggle.addEventListener('click', handleThemeToggleClick);