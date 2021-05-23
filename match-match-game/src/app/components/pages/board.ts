export default class Board {
  main: HTMLElement;

  board: HTMLElement;

  pageTitle: HTMLElement;

  page: HTMLElement;

  constructor(page: HTMLElement, pageTitleText: string) {
    this.main = document.createElement('div');
    this.board = document.createElement('div');
    this.pageTitle = document.createElement('div');
    this.pageTitle.insertAdjacentText('beforeend', pageTitleText);
    this.page = page;
  }

  render(): HTMLElement {
    this.main.classList.add('main');
    this.board.classList.add('board');
    this.pageTitle.classList.add('board__title');
    this.board.appendChild(this.pageTitle);
    this.board.appendChild(this.page);
    this.main.appendChild(this.board);
    return this.main;
  }
}
