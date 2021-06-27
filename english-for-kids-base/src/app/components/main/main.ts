export default class Main {
  main: HTMLElement;

  stars: HTMLDivElement;

  cardsContainer: HTMLDivElement;

  constructor() {
    this.main = document.createElement('main');
    this.stars = document.createElement('div');
    this.cardsContainer = document.createElement('div');
    this.main.appendChild(this.stars);
    this.main.appendChild(this.cardsContainer);
    // this.main.innerHTML = `
    //   <div class="stars"></div>
    //   <div class="cards-container"></div>
    // `;
  }

  getMain(): HTMLElement {
    return this.main;
  }
}
