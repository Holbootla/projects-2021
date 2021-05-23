export default class Board {
  main: HTMLDivElement;

  board: HTMLDivElement;

  constructor() {
    this.main = document.createElement('div');
    this.board = document.createElement('div');
  }

  render(): HTMLElement {
    this.main.classList.add('main');
    this.board.classList.add('board');
    this.main.appendChild(this.board);
    return this.main;
  }
}
