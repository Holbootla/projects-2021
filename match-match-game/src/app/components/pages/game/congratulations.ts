export default class Congratulations {
  body: HTMLBodyElement | null;

  constructor() {
    this.body = document.querySelector('body');
  }

  render(): void {
    this.body?.insertAdjacentHTML(
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
  }
}
