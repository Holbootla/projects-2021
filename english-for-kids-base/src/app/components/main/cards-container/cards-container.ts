import State from '../../../state';
import cardsData from '../../../../data/cards-data';

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
    const playMode = this.state.getPlayMode();
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
          <div class="card-word-front" style="background-image: url(${
            word.image
          })">
              <div class="card-word-title ${playMode ? 'z-index-1' : ''}">${
        word.word
      }</div>
              <div class="card-word-flip-icon ${
                playMode ? 'display-none' : ''
              }"></div>
          </div>
          <div class="card-word-back" style="background-image: url(${
            word.image
          })">
              <div class="card-word-title">${word.translation}</div>
          </div>
        </div>
      `;
      const rotateBtn = wordCard.querySelector('.card-word-flip-icon');
      rotateBtn?.addEventListener('click', (event) => {
        wordCard
          .querySelector('.card-word-inner')
          ?.classList.add('card-word-flip');
        wordCard.addEventListener('mouseleave', () => {
          wordCard
            .querySelector('.card-word-inner')
            ?.classList.remove('card-word-flip');
        });
        event.stopPropagation();
      });
      wordCard.addEventListener('click', () => {
        const audio = new Audio();
        audio.src = `https://wooordhunt.ru/data/sound/sow/us/${word.word}.mp3`;
        audio.autoplay = true;
      });
      this.cards.appendChild(wordCard);
    });
  }
}
