import State from '../../../state';
import Stars from '../stars';

export default class Card {
  card: HTMLDivElement;

  word: string;

  image: string;

  translation: string;

  state: State;

  stars: Stars;

  category: string;

  constructor(
    category: string,
    word: string,
    image: string,
    translation: string
  ) {
    this.state = State.getInstance();
    this.stars = new Stars();
    this.card = document.createElement('div');
    this.card.classList.add('card-word');
    this.category = category;
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
      this.card.classList.add('flipped');
      this.card.addEventListener('mouseleave', () => {
        this.card
          .querySelector('.card-word-inner')
          ?.classList.remove('card-word-flip');
        this.card.classList.remove('flipped');
      });
      event.stopPropagation();
    });
    this.card.addEventListener('click', () => {
      const gameStatus = this.state.getGameStatus();
      if (gameStatus === false) {
        if (!this.card.classList.contains('flipped')) {
          this.playAudio();
          this.state.setStatisticsList('clicks', this.category, this.word);
        }
      } else {
        this.chooseCard();
      }
    });
    return this.card;
  }

  playAudio(): void {
    const audio = new Audio();
    audio.src = `https://wooordhunt.ru/data/sound/sow/us/${this.word}.mp3`;
    audio.autoplay = true;
  }

  chooseCard(): void {
    if (this.word === this.state.getCurrentWord()) {
      this.state.setAnswer(true);
      this.state.incRightAnswers();
      this.card.innerHTML = `
        <div class="card-word-inner">
          <div class="card-word-front" style="background-image: url(${this.image})">
            <div class="card-word-title">${this.word}</div>
          </div>
        </div>
      `;
      this.card.classList.add('disabled');
      this.state.setStatisticsList('right', this.category, this.word);
    } else {
      this.state.setAnswer(false);
      this.state.incWrongAnswers();
      this.state.setStatisticsList('wrong', this.category, this.word);
    }
  }
}
