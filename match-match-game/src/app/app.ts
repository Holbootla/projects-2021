import Header from './components/header/header';
import Board from './components/pages/board';

export default class App {
  body: HTMLBodyElement | null;

  header: HTMLElement;

  board: HTMLElement;

  constructor() {
    this.body = document.querySelector('body');
    this.header = new Header().createHeader();
    this.board = new Board().render();
  }

  render(): void {
    this.body?.appendChild(this.header);
    this.body?.appendChild(this.board);
  }
}
