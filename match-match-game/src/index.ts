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

const btns: Element | null = document.querySelector('.nav__list');

btns?.addEventListener('click', (event: Event | null) => {
  app.clearBoard();
  if (
    (<HTMLElement>event?.target).id === 'game' ||
    (<HTMLElement>event?.target).parentElement?.id === 'game'
  ) {
    currentPage = new Game(12, 'animal');
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
    const minusTimer = setInterval(() => {
      timer.minus();
      timer.render();
    }, 1000);
    setTimeout(() => {
      clearInterval(minusTimer);
      gameplay.flipAll();
      gameplay.flip();
    }, 15000);
    const plusTimer = setTimeout(() => {
      setInterval(() => {
        timer.plus();
        timer.render();
      }, 1000);
    }, 15000);
  } else if (
    (<HTMLElement>event?.target).id === 'about' ||
    (<HTMLElement>event?.target).parentElement?.id === 'about'
  ) {
    currentPage = new About();
    app = new App(currentPage.render(), currentPage.getPageTitle(), null);
  } else if (
    (<HTMLElement>event?.target).id === 'score' ||
    (<HTMLElement>event?.target).parentElement?.id === 'score'
  ) {
    currentPage = new Score();
    app = new App(currentPage.render(), currentPage.getPageTitle(), null);
  } else if (
    (<HTMLElement>event?.target).id === 'settings' ||
    (<HTMLElement>event?.target).parentElement?.id === 'settings'
  ) {
    currentPage = new Settings();
    app = new App(currentPage.render(), currentPage.getPageTitle(), null);
  }
  app.renderBoard();
});
