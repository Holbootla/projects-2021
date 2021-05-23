export default class About {
  about: HTMLElement;

  pageTitle: string;

  constructor() {
    this.about = document.createElement('div');
    this.pageTitle = 'How to play?';
  }

  render(): HTMLElement {
    this.about.classList.add('rules');
    this.about.insertAdjacentHTML(
      'beforeend',
      `
      <div class="rules__rule grid-item-1">
            <div class="rules__rule__number">1</div>
            <p class="rules__rule__text">Register new player in game.</p>
          </div>
          <img src="image-register.png" alt="" class="rules__img grid-item-2">
          <div class="rules__rule grid-item-3">
            <div class="rules__rule__number">2</div>
            <p class="rules__rule__text">Configure your game settings.</p>
          </div>
          <img src="image-settings.png" alt="" class="rules__img grid-item-4">
          <div class="rules__rule grid-item-5">
            <div class="rules__rule__number">3</div>
            <p class="rules__rule__text">Start you new game! Remember card positions and match it before times up.</p>
          </div>
          <img src="image-game.png" alt="" class="rules__img grid-item-6">
      `
    );
    return this.about;
  }

  getPageTitle(): string {
    return this.pageTitle;
  }
}
