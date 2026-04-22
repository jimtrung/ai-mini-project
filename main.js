import { initHome } from './src/modules/home.js';
import { initTicTacToe } from './src/modules/tic-tac-toe.js';
import { initSudoku } from './src/modules/sudoku.js';
import { initSpamDetector } from './src/modules/spam-detector.js';
import { initSmartHome } from './src/modules/smart-home.js';
import { t, setLanguage, getLanguage } from './src/i18n.js';

const contentArea = document.getElementById('content-area');
const navBtns = document.querySelectorAll('.nav-btn');
const langToggle = document.getElementById('lang-toggle');
const footerText = document.querySelector('footer p');
const mainTitle = document.getElementById('main-title');

const modules = {
  home: initHome,
  'tic-tac-toe': initTicTacToe,
  sudoku: initSudoku,
  'spam-detector': initSpamDetector,
  'smart-home': initSmartHome
};

let currentModule = 'home';

function updateStaticTranslations() {
  mainTitle.textContent = t('title');
  document.getElementById('nav-home').textContent = t('home');
  document.getElementById('nav-ttt').textContent = t('ttt');
  document.getElementById('nav-sudoku').textContent = t('sudoku');
  document.getElementById('nav-spam').textContent = t('spam');
  document.getElementById('nav-sh').textContent = t('smartHome');
  footerText.textContent = t('footer');
  langToggle.textContent = getLanguage() === 'vi' ? 'EN' : 'VI';
}

function loadModule(moduleName) {
  currentModule = moduleName;
  // Update UI
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === moduleName);
  });

  // Clear area
  contentArea.innerHTML = '';
  
  // Initialize module
  if (modules[moduleName]) {
    modules[moduleName](contentArea);
  }
}

// Event Listeners
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    loadModule(btn.dataset.module);
  });
});

langToggle.addEventListener('click', () => {
  const nextLang = getLanguage() === 'vi' ? 'en' : 'vi';
  setLanguage(nextLang);
});

document.addEventListener('langChange', () => {
  updateStaticTranslations();
  loadModule(currentModule);
});

// Initial Load
updateStaticTranslations();
loadModule('home');
