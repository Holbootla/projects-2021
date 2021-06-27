import CardsContainer from './cards-container/cards-container';

export default class Main {
  main: HTMLElement;

  stars: HTMLDivElement;

  cards: CardsContainer;

  constructor() {
    this.main = document.createElement('main');
    this.stars = document.createElement('div');
    this.cards = new CardsContainer();
    this.main.appendChild(this.stars);
    this.main.appendChild(this.cards.getCards());
  }

  getMain(): HTMLElement {
    window.addEventListener('hashchange', () => {
      this.cards.getCards();
    });
    return this.main;
  }
}
