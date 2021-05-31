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
          <p class="paragraph">Congratulations! You successfully found all matches on ${localStorage.getItem(
            'scoreMinutes'
          )} minutes.</p>
          <div class="btn-container">
            <a href="#score" class="btn btn-ok">OK</a>
            <div class="btn btn-register">Register new score</div>
          </div>
        </div>
      </div>
      `
    );
  }
}
