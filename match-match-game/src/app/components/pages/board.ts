export default class Board {
  main: HTMLElement;

  board: HTMLElement;

  pageTitle: HTMLElement;

  page: HTMLElement;

  timer: HTMLElement | null;

  constructor(
    page: HTMLElement,
    pageTitleText: string,
    timer: HTMLElement | null = null
  ) {
    this.main = document.createElement('div');
    this.board = document.createElement('div');
    this.pageTitle = document.createElement('h1');
    this.pageTitle.insertAdjacentText('beforeend', pageTitleText);
    this.page = page;
    this.timer = timer;
  }

  render(): HTMLElement {
    this.main.classList.add('main');
    this.board.classList.add('board');
    this.pageTitle.classList.add('board__title');
    this.board.appendChild(this.pageTitle);
    if (this.timer) {
      this.board.appendChild(this.timer);
    }
    this.board.appendChild(this.page);
    this.main.appendChild(this.board);
    return this.main;
  }

  clear(): void {
    this.main.remove();
  }
}
