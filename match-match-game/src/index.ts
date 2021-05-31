import './style.scss';
import App from './app/app';
import About from './app/components/pages/about/about';
import Game from './app/components/pages/game/game';
import Timer from './app/components/pages/game/timer';
import Score from './app/components/pages/score/score';
import Settings from './app/components/pages/settings/settings';
import Gameplay from './app/components/pages/game/gameplay';

let currentPage: About | Game | Score | Settings = new About();

let app = new App(currentPage.render(), currentPage.getPageTitle(), null);

let hash = window.location.hash.slice(1);

const timer = new Timer();

let gameplay: Gameplay;

function topButtonChangeToStart() {
  const topButton = document.querySelector('.top-btn-container');
  if (topButton) {
    topButton.innerHTML = `<a href="#game" class="top-btn" id="game">Start game</a>`;
  }
}

function topButtonChangeToStop() {
  const topButton = document.querySelector('.top-btn-container');
  if (topButton) {
    topButton.innerHTML = `<a href="#about" class="top-btn" id="about">Stop game</a>`;
  }
}

function openGame() {
  timer.stopAllTimers();
  topButtonChangeToStop();
  currentPage = new Game();
  app = new App(
    currentPage.render(),
    currentPage.getPageTitle(),
    timer.render()
  );
  setTimeout(() => {
    gameplay = new Gameplay();
    gameplay.flipAll();
  }, 500);
  timer.reverse();
  timer.render();
  timer.startGame();
  timer.resumeGame();
}

function openAbout() {
  timer.stopAllTimers();
  topButtonChangeToStart();
  currentPage = new About();
  app = new App(currentPage.render(), currentPage.getPageTitle(), null);
}

function openScore() {
  timer.stopAllTimers();
  topButtonChangeToStart();
  currentPage = new Score();
  app = new App(currentPage.render(), currentPage.getPageTitle(), null);
}

function openSettings() {
  timer.stopAllTimers();
  topButtonChangeToStart();
  currentPage = new Settings();
  app = new App(currentPage.render(), currentPage.getPageTitle(), null);
}

app.renderHeader();

if (hash === 'game') {
  openGame();
} else if (hash === 'about' || hash === '') {
  openAbout();
} else if (hash === 'score') {
  openScore();
} else if (hash === 'settings') {
  openSettings();
}
app.renderBoard();

window.addEventListener('hashchange', () => {
  hash = window.location.hash.slice(1);
  app.clearBoard();
  if (hash === 'game') {
    openGame();
  } else if (hash === 'about') {
    openAbout();
  } else if (hash === 'score') {
    openScore();
  } else if (hash === 'settings') {
    openSettings();
  }
  app.renderBoard();
});
