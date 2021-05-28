export default class Game {
  game: HTMLElement;

  pageTitle: string;

  gameSize: number;

  typeOfCards: string;

  arrayOfCardNumber: number[];

  constructor(gameSize: number, typeOfCards: string) {
    this.game = document.createElement('div');
    this.pageTitle = `Let's play!`;
    this.gameSize = gameSize;
    this.typeOfCards = typeOfCards;
    this.arrayOfCardNumber = Array(gameSize / 2);
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
            <div class="card">
              <div class="card__front">
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
