export default class Board {
  main: HTMLElement;

  board: HTMLElement;

  pageTitle: HTMLElement;

  page: HTMLElement;

  timer: HTMLElement | null;

  currentMain: HTMLElement | null;

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
    this.currentMain = document.querySelector('.main');
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
    if (this.currentMain) {
      this.currentMain.remove();
    }
    this.main.remove();
  }
}
