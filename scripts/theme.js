const themeToggle = document.getElementById('themeToggle');
const spinnerImage = document.querySelector('.spinner');
const title = document.querySelector('.main-title');


function handleDOMContentLoaded() {
  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    savedTheme = 'light-theme';
    localStorage.setItem('theme', savedTheme);
  }
  document.body.className = savedTheme;
  updateStyles(savedTheme);
  updateSpinnerImage(savedTheme);
}

function handleThemeToggleClick() {
  document.body.className = document.body.className === 'light-theme' ? 'dark-theme' : 'light-theme';
  localStorage.setItem('theme', document.body.className);
  updateStyles(document.body.className);
  updateSpinnerImage(document.body.className);
}


function updateStyles(theme) {
  const settings = {
    'light-theme': {
      toggleText: 'dark # side',
      buttonTextColor: '#767676',
      buttonBackgroundColor: 'black',
      titleText: '$'
    },
    'dark-theme': {
      toggleText: 'light $ side',
      buttonTextColor: '#a5a5a5',
      buttonBackgroundColor: 'white',
      titleText: '#'
    }
  };

  const { toggleText, buttonTextColor, buttonBackgroundColor, titleText } = settings[theme];
  themeToggle.innerText = toggleText;
  themeToggle.style.backgroundColor = buttonBackgroundColor;
  themeToggle.style.color = buttonTextColor;
  title.style.color = buttonTextColor;
  title.innerText = titleText;
}


function updateSpinnerImage(theme) {
  spinnerImage.src = theme === 'light-theme' ? 'images/yoda.png' : 'images/dvv.webp';
}


document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
themeToggle.addEventListener('click', handleThemeToggleClick);