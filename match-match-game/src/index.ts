import './style.scss';
import App from './app/app';
import About from './app/components/pages/about/about';
import Game from './app/components/pages/game/game';
import Timer from './app/components/pages/game/timer';
import Score from './app/components/pages/score/score';

let currentPage: About | Game | Score = new About();

let app = new App(currentPage.render(), currentPage.getPageTitle(), null);

app.renderHeader();
app.renderBoard();

const btns: Element | null = document.querySelector('.nav__list');

btns?.addEventListener('click', (event: Event | null) => {
  app.clearBoard();
  if (
    (<HTMLElement>event?.target).id === 'game' ||
    (<HTMLElement>event?.target).parentElement?.id === 'game'
  ) {
    currentPage = new Game(9, 'animal');
    app = new App(
      currentPage.render(),
      currentPage.getPageTitle(),
      new Timer().render()
    );
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
  }
  app.renderBoard();

  document.querySelectorAll('.card')?.forEach((element) => {
    element.addEventListener('click', () => {
      if (element.classList.contains('card')) {
        element.classList.toggle('card_active');
      }
    });
  });
});
