import Congratulations from './congratulations';

export default class Gameplay {
  cards: NodeListOf<Element>;

  cardId: string[];

  matchCounter: number;

  cardsActive: number[];

  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.cardsActive = [];
    this.cardId = [];
    this.matchCounter = 0;
  }

  flipAll(): void {
    this.cards?.forEach((element) => {
      element.classList.toggle('card_active');
    });
  }

  flip(): void {
    this.cards?.forEach((element, ind) => {
      element.addEventListener('click', () => {
        if (element.classList.contains('card')) {
          element.classList.toggle('card_active');
          element.classList.add('pointer-events-none');
          this.cardId.push(element.id);
          this.cardsActive.push(ind);
        }
        this.addColor();
        element.classList.add('pointer-events-none');
        if (this.matchCounter === 6) {
          new Congratulations().render();
        }
      });
    });
  }

  addColor(): void {
    if (this.cardId.length > 1) {
      if (this.cardId[0] === this.cardId[1]) {
        this.matchCounter += 1;
        this.cardsActive.forEach((el) => {
          this.cards[el]
            .querySelector('.card__green')
            ?.classList.add('display-block');
          this.cards[el].classList.add('pointer-events-none');
        });
      } else {
        this.cardsActive.forEach((el) => {
          this.cards[el]
            .querySelector('.card__red')
            ?.classList.add('display-block');
          this.cards[el].classList.add('pointer-events-none');
          setTimeout(() => {
            this.cards[el]
              .querySelector('.card__red')
              ?.classList.remove('display-block');
            this.cards[el].classList.remove('pointer-events-none');
            this.cards[el].classList.toggle('card_active');
          }, 500);
        });
      }
      this.cardId = [];
      this.cardsActive = [];
    }
  }
}
