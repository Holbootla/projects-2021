export default class Game {
  game: HTMLElement;

  pageTitle: string;

  gameSize: number;

  typeOfCards: string;

  constructor(gameSize: number, typeOfCards: string) {
    this.game = document.createElement('div');
    this.pageTitle = `Let's play!`;
    this.gameSize = gameSize;
    this.typeOfCards = typeOfCards;
  }

  render(): HTMLElement {
    this.game.classList.add('cards');

    for (let i = 0; i < this.gameSize; i += 1) {
      this.game.insertAdjacentHTML(
        'beforeend',
        `
        <div class="card-container">
          <div class="card">
            <div class="card__front">
              <img src="images/${this.typeOfCards}/${this.typeOfCards}-${
          i + 1
        }.jpg" alt="">
            </div>
            <div class="card__back"></div>
            </div>
          </div>
        `
      );
    }

    return this.game;
  }

  getPageTitle(): string {
    return this.pageTitle;
  }
}
