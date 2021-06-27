export default class Main {
  main: HTMLElement;

  constructor() {
    this.main = document.createElement('main');
    this.main.innerHTML = `
      <div class="stars"></div>
      <div class="cards-container"></div>
    `;
  }

  getMain(): HTMLElement {
    return this.main;
  }
}
