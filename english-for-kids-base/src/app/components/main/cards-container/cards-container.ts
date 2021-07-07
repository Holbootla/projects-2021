import State from '../../../state';
import cardsData from '../../../../data/cards-data';
import Card from './card';
import Statistics from '../statistics';
import StartButton from '../startButton';

export default class CardsContainer {
  cards: HTMLDivElement;

  state: State;

  page: HTMLDivElement;

  pageTitle: HTMLDivElement;

  startButton: StartButton;

  statistics: Statistics;

  repeatDifficultWordsButton: HTMLDivElement;

  resetStatistics: HTMLDivElement;

  constructor() {
    this.state = State.getInstance();
    this.statistics = new Statistics();
    this.page = document.createElement('div');
    this.page.classList.add('page');
    this.pageTitle = document.createElement('div');
    this.pageTitle.classList.add('theme-title');
    this.cards = document.createElement('div');
    this.cards.classList.add('cards-container');
    this.startButton = new StartButton();
    this.repeatDifficultWordsButton = document.createElement('div');
    this.repeatDifficultWordsButton.classList.add('start-game-button');
    this.repeatDifficultWordsButton.innerText = 'REPEAT!';
    this.repeatDifficultWordsButton.addEventListener('click', () => {
      window.location.hash = 'repeat';
    });
    this.resetStatistics = document.createElement('div');
    this.resetStatistics.classList.add('start-game-button');
    this.resetStatistics.innerText = 'Reset';
    this.resetStatistics.addEventListener('click', () => {
      this.state.clearStatistics();
      window.dispatchEvent(new Event('hashchange'));
    });
  }

  getCards(): HTMLDivElement {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (hash === 'statistics') {
      this.getStatistics();
    } else if (hash === 'repeat') {
      this.getDifficultWordCards();
    } else if (hash === '') {
      this.getCategoryCards();
    } else {
      this.getWordCards();
    }
    this.page.appendChild(this.pageTitle);
    this.page.appendChild(this.cards);
    this.page.appendChild(this.startButton.getButton());
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
    this.cards.appendChild(this.repeatDifficultWordsButton);
    this.cards.appendChild(this.resetStatistics);
  }

  getDifficultWordCards(): void {
    this.cards.innerHTML = '';
    const currentStatistics = JSON.parse(
      localStorage.getItem('statistics') ?? ''
    );
    if (Array.isArray(currentStatistics)) {
      const sortedCurrentStatistics = currentStatistics
        .filter((word) => word.wrong > 0)
        .sort((a, b) => b.wrong - a.wrong);
      const MAX_WORDS =
        sortedCurrentStatistics.length > 8 ? 8 : sortedCurrentStatistics.length;
      for (let i = 0; i <= MAX_WORDS - 1; i += 1) {
        this.cards.appendChild(
          new Card(
            sortedCurrentStatistics[i].category,
            sortedCurrentStatistics[i].word,
            sortedCurrentStatistics[i].image,
            sortedCurrentStatistics[i].translation
          ).getCard()
        );
      }
      if (sortedCurrentStatistics.length) {
        this.pageTitle.innerText = `- Repeat difficult words -`;
      } else {
        this.pageTitle.innerText = `- There is no difficult words for you -`;
      }
    }
  }
}
