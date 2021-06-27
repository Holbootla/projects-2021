import cardsData from '../../../../data/cards-data';

export default class CardsContainer {
  cards: HTMLDivElement;

  constructor() {
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
      categoryCard.style.background = `url(${item.image})`;
      categoryCard.style.backgroundSize = 'cover';
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
      const wordCard = document.createElement('div');
      wordCard.classList.add('card-word');
      wordCard.innerHTML = `
        <div class="card-word-inner">
          <div class="card-word-front" style="background-image: url(${word.image})">
              <div class="card-word-title">${word.word}</div>
              <div class="card-word-flip-icon"></div>
          </div>
          <div class="card-word-back" style="background-image: url(${word.image})">
              <div class="card-word-title">${word.translation}</div>
          </div>
        </div>
      `;
      this.cards.appendChild(wordCard);
    });
  }
}
