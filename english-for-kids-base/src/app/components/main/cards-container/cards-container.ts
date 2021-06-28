import State from '../../../state';
import cardsData from '../../../../data/cards-data';
import Card from './card';

export default class CardsContainer {
  cards: HTMLDivElement;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.cards = document.createElement('div');
    this.cards.classList.add('cards-container');
  }

  getCards(): HTMLDivElement {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (hash === '') {
      this.getCategoryCards();
    } else {
      this.getWordCards();
    }
    return this.cards;
  }

  getCategoryCards(): void {
    this.cards.innerHTML = '';
    cardsData.forEach((item) => {
      const categoryCard = document.createElement('div');
      categoryCard.classList.add('card-theme');
      categoryCard.style.backgroundImage = `url(${item.image})`;
      categoryCard.style.backgroundSize = 'cover';
      categoryCard.innerHTML = `
      <div class="card-theme-title">${item.category}</div>
      `;
      categoryCard.addEventListener('click', () => {
        window.location.hash = item.category;
      });
      this.cards.appendChild(categoryCard);
    });
  }

  getWordCards(): void {
    this.cards.innerHTML = '';
    const currentCategoryIndex = cardsData.findIndex(
      (item) =>
        item.category.toLowerCase() ===
        window.location.hash.slice(1).toLowerCase()
    );
    cardsData[currentCategoryIndex].words.forEach((word) => {
      this.cards.appendChild(
        new Card(word.word, word.image, word.translation).getCard()
      );
    });
  }
}
