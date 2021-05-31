import Header from './components/header/header';
import Board from './components/pages/board';

export default class App {
  body: HTMLBodyElement | null;

  header: HTMLElement;

  board: Board;

  constructor(page: HTMLElement, pageTitle: string, timer: HTMLElement | null) {
    this.body = document.querySelector('body');
    this.header = new Header().render();
    this.board = new Board(page, pageTitle, timer);
  }

  renderHeader(): void {
    this.body?.appendChild(this.header);
  }

  renderBoard(): void {
    this.body?.appendChild(this.board.render());
    document.querySelectorAll('.nav__item').forEach((el) => {
      el.classList.remove('nav__item_active');
      if (window.location.hash.slice(1) === el.id) {
        el.classList.add('nav__item_active');
      }
    });
    if (window.location.hash.slice(0) === '') {
      document.querySelector('#about')?.classList.add('nav__item_active');
    }
  }

  clearBoard(): void {
    this.board.clear();
  }
}
