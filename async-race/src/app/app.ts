import Header from './header/header';
import Main from './main/main';

export default class App {
  body: HTMLBodyElement | null;

  header: HTMLDivElement;

  main: HTMLDivElement;

  mainInstance: Main;

  constructor() {
    this.body = document.querySelector('body');
    this.header = new Header().render();
    this.mainInstance = new Main();
    this.main = this.mainInstance.render();
  }

  render(): void {
    this.body?.appendChild(this.header);
    this.body?.appendChild(this.main);
  }

  addGarageVisibility(): void {
    this.mainInstance.addGarageVisibility();
  }

  addWinnersVisibility(): void {
    this.mainInstance.addWinnersVisibility();
  }
}
