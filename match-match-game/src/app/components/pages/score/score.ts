export default class Score {
  score: HTMLDivElement;

  pageTitle: string;

  constructor() {
    this.score = document.createElement('div');
    this.pageTitle = 'Best results';
  }

  render(): HTMLElement {
    this.score.classList.add('score-container');
    this.score.insertAdjacentHTML(
      'beforeend',
      `
      <div class="result">
        <div class="profile">
          <img class="user-avatar" src="images/animal/animal-1.jpg" alt="">
          <div class="profile__bio">
            <div class="profile__name">Name Name</div>
            <div class="profile__email">Holbootla@gmail.com</div>
          </div>
        </div>
        <div class="score">Score: <span class="score__number">12398</span></div>
      </div>

      `
    );
    return this.score;
  }

  getPageTitle(): string {
    return this.pageTitle;
  }
}
