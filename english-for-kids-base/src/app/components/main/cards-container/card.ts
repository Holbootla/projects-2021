import State from '../../../state';

export default class Card {
  card: HTMLDivElement;

  word: string;

  image: string;

  translation: string;

  state: State;

  constructor(word: string, image: string, translation: string) {
    this.state = State.getInstance();
    this.card = document.createElement('div');
    this.card.classList.add('card-word');
    this.word = word;
    this.image = image;
    this.translation = translation;
  }

  getCard(): HTMLDivElement {
    const playMode = this.state.getPlayMode();
    this.card.innerHTML = `
    <div class="card-word-inner">
      <div class="card-word-front" style="background-image: url(${this.image})">
        <div class="card-word-title ${playMode ? 'z-index-1' : ''}">${
      this.word
    }</div>
        <div class="card-word-flip-icon ${
          playMode ? 'display-none' : ''
        }"></div>
      </div>
      <div class="card-word-back" style="background-image: url(${this.image})">
        <div class="card-word-title">${this.translation}</div>
      </div>
    </div>
  `;
    const rotateBtn = this.card.querySelector('.card-word-flip-icon');
    rotateBtn?.addEventListener('click', (event) => {
      this.card
        .querySelector('.card-word-inner')
        ?.classList.add('card-word-flip');
      this.card.addEventListener('mouseleave', () => {
        this.card
          .querySelector('.card-word-inner')
          ?.classList.remove('card-word-flip');
      });
      event.stopPropagation();
    });
    this.card.addEventListener('click', () => {
      const audio = new Audio();
      audio.src = `https://wooordhunt.ru/data/sound/sow/us/${this.word}.mp3`;
      audio.autoplay = true;
    });
    return this.card;
  }
}
