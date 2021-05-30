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

const timer = new Timer();

let gameplay: Gameplay;

app.renderHeader();
app.renderBoard();
document.querySelector('#about')?.classList.add('nav__item_active');

const btns: Element | null = document.querySelector('.nav__list');

function openGame() {
  timer.stopAllTimers();
  currentPage = new Game(12, 'animal');
  app = new App(
    currentPage.render(),
    currentPage.getPageTitle(),
    timer.render()
  );
  setTimeout(() => {
    gameplay = new Gameplay();
    gameplay.flipAll();
  }, 100);
  timer.reverse();
  timer.render();
  timer.startGame();
  timer.resumeGame();
}

function openAbout() {
  timer.stopAllTimers();
  currentPage = new About();
  app = new App(currentPage.render(), currentPage.getPageTitle(), null);
}

function openScore() {
  timer.stopAllTimers();
  currentPage = new Score();
  app = new App(currentPage.render(), currentPage.getPageTitle(), null);
}

function openSettings() {
  timer.stopAllTimers();
  currentPage = new Settings();
  app = new App(currentPage.render(), currentPage.getPageTitle(), null);
}

btns?.addEventListener('click', (event: Event | null) => {
  app.clearBoard();
  if (
    (<HTMLElement>event?.target).id === 'game' ||
    (<HTMLElement>event?.target).parentElement?.id === 'game'
  ) {
    openGame();
  } else if (
    (<HTMLElement>event?.target).id === 'about' ||
    (<HTMLElement>event?.target).parentElement?.id === 'about'
  ) {
    openAbout();
  } else if (
    (<HTMLElement>event?.target).id === 'score' ||
    (<HTMLElement>event?.target).parentElement?.id === 'score'
  ) {
    openScore();
  } else if (
    (<HTMLElement>event?.target).id === 'settings' ||
    (<HTMLElement>event?.target).parentElement?.id === 'settings'
  ) {
    openSettings();
  }
  app.renderBoard();
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
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
