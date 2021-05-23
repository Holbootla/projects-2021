import Header from './components/header/header';
import Board from './components/pages/board';

export default class App {
  body: HTMLBodyElement | null;

  header: HTMLElement;

  board: HTMLElement;

  page: HTMLElement;

  constructor(page: HTMLElement, pageTitle: string) {
    this.body = document.querySelector('body');
    this.header = new Header().createHeader();
    this.page = page;
    this.board = new Board(page, pageTitle).render();
  }

  render(): void {
    this.body?.appendChild(this.header);
    this.body?.appendChild(this.board);
  }
}
