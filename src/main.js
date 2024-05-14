import 'modern-normalize';

const linkDarkStyles = document.querySelectorAll(
  'link[rel="stylesheet"][media*="(prefers-color-scheme: dark)"][media*="dark"]'
);
const linkLightStyles = document.querySelectorAll(
  'link[rel="stylesheet"][media*="(prefers-color-scheme: light)"][media*="light"]'
);

const isDarkTheme = matchMedia('(prefers-color-scheme: dark)').matches;
const switcherList = document.querySelectorAll('.header-switcher-radio');

console.log(getSystemTheme());

switcherList.forEach(item => {
  item.addEventListener('change', event => {
    setTheme(event.target.value);
  });
});

// Run to check local storage
// setupScheme();

// Function: Check user OS theme settings and save it to the browser local storage
function setupScheme() {
  const browserTheme = getBrowserTheme();
  const systemTheme = getSystemTheme();

  if (browserTheme === null) {
    return;
  }

  if (localStorageSavedTheme !== systemTheme) {
    localStorage.setItem('colorScheme', systemTheme);
    setTheme(systemTheme);
  }
}

function setTheme(themeName) {
  let lightMedia;
  let darkMedia;

  if (themeName === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
    clearLocalStorage(); // write this function
  } else {
    if (themeName === 'light') {
      lightMedia = 'all';
      darkMedia = 'not all';
    } else {
      lightMedia = 'not all';
      darkMedia = 'all';
    }
  }

  linkDarkStyles.forEach(item => {
    localStorage.setItem('colorScheme', themeName);
    setLocalStorage(); // write this function
    item.media = darkMedia;
  });
  linkLightStyles.forEach(item => {
    localStorage.setItem('colorScheme', themeName);
    item.media = lightMedia;
  });
}
function getSystemTheme() {
  return isDarkTheme ? 'dark' : 'light';
}

// Todo: Move saving to localstore to separet function
// Todo: Separet function for local storage get theme
function getBrowserTheme() {
  return localStorage.getItem('colorScheme');
}
// Todo: Separet function for local storage save theme
// Todo: Separet function for local storage clear theme
