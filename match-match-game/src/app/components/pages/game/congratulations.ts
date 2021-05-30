import App from '../../../app';
import Score from '../score/score';

export default class Congratulations {
  main: HTMLBodyElement | null;

  constructor() {
    this.main = document.querySelector('.main');
  }

  render(): void {
    this.main?.insertAdjacentHTML(
      'beforeend',
      `
      <div class="congratulations-container">
        <div class="congratulations">
          <p class="paragraph">Congratulations! You successfully found all matches on 1.21 minutes.</p>
          <div class="btn">OK</div>
        </div>
      </div>
      `
    );
    this.main
      ?.querySelector('.congratulations')
      ?.querySelector('.btn')
      ?.addEventListener('click', () => {
        const app = new App(
          new Score().render(),
          new Score().getPageTitle(),
          null
        );
        app.clearBoard();
        app.renderBoard();
      });
  }
}
