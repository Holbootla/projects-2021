export default class Game {
  game: HTMLElement;

  pageTitle: string;

  gameSize: number;

  typeOfCards: string | null;

  arrayOfCardNumber: number[];

  constructor() {
    this.game = document.createElement('div');
    this.pageTitle = `Let's play!`;
    this.gameSize = Number(localStorage.getItem('size'));
    this.typeOfCards = localStorage.getItem('type');
    this.arrayOfCardNumber = Array(this.gameSize / 2);
  }

  render(): HTMLElement {
    this.game.classList.add(`cards-${this.gameSize}`);

    for (let i = 0; i < this.arrayOfCardNumber.length; i += 1) {
      this.arrayOfCardNumber[i] = i;
    }

    this.arrayOfCardNumber
      .concat(this.arrayOfCardNumber)
      .sort(() => Math.random() - 0.5)
      .forEach((el) => {
        this.game.insertAdjacentHTML(
          'beforeend',
          `
          <div class="card-container">
            <div class="card" id="card-${el}">
              <div class="card__front">
                <div class=card__green></div>
                <div class=card__red></div>
                <img src="images/${this.typeOfCards}/${this.typeOfCards}-${
            el + 1
          }.jpg" alt="">
              </div>
              <div class="card__back"></div>
              </div>
            </div>
          `
        );
      });

    return this.game;
  }

  getPageTitle(): string {
    return this.pageTitle;
  }
}
