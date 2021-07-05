import State from '../../../state';
import cardsData from '../../../../data/cards-data';
import Card from './card';
import Statistics from '../statistics';

export default class CardsContainer {
  cards: HTMLDivElement;

  state: State;

  page: HTMLDivElement;

  pageTitle: HTMLDivElement;

  statistics: Statistics;

  constructor() {
    this.state = State.getInstance();
    this.statistics = new Statistics();
    this.page = document.createElement('div');
    this.page.classList.add('page');
    this.pageTitle = document.createElement('div');
    this.pageTitle.classList.add('theme-title');
    this.cards = document.createElement('div');
    this.cards.classList.add('cards-container');
  }

  getCards(): HTMLDivElement {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (hash === 'statistics') {
      this.getStatistics();
    } else if (hash === '') {
      this.getCategoryCards();
    } else {
      this.getWordCards();
    }
    this.page.appendChild(this.pageTitle);
    this.page.appendChild(this.cards);
    return this.page;
  }

  getCategoryCards(): void {
    this.cards.innerHTML = '';
    this.pageTitle.innerText = '';
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
    this.pageTitle.innerText = `- ${cardsData[currentCategoryIndex].category} -`;
    cardsData[currentCategoryIndex].words.forEach((word) => {
      this.cards.appendChild(
        new Card(
          cardsData[currentCategoryIndex].category,
          word.word,
          word.image,
          word.translation
        ).getCard()
      );
    });
  }

  getStatistics(): void {
    this.pageTitle.innerText = '- Statistics -';
    this.cards.innerHTML = '';
    this.cards.appendChild(this.statistics.getStatistics());
  }
}
