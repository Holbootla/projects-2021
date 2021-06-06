import Header from './header/header';

export default class App {
  body: HTMLBodyElement | null;

  header: HTMLDivElement;

  constructor() {
    this.body = document.querySelector('body');
    this.header = new Header().render();
  }

  render(): void {
    this.body?.appendChild(this.header);
  }
}
