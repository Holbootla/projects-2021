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
        </div>
      </div>
      `
    );
  }
}
