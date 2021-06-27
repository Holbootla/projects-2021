export default class CardsContainer {
  cards: HTMLDivElement;

  constructor() {
    this.cards = document.createElement('div');
    this.cards.classList.add('cards-container');
  }
}
