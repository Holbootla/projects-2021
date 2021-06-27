export default class HeaderContainer {
  headerContainer: HTMLDivElement;

  constructor() {
    this.headerContainer = document.createElement('div');
    this.headerContainer.classList.add('header-container');
    this.headerContainer.innerHTML = `
    <div class="hamburger-menu-button">
      <div class="hamburger-menu-button-line-1"></div>
      <div class="hamburger-menu-button-line-2"></div>
      <div class="hamburger-menu-button-line-3"></div>
    </div>
    <div class="game-mode-button">
      <div class="game-mode-button-switcher"></div>
      <div class="game-mode-button-text"></div>
    </div>
    `;
  }

  getHeaderContainer(): HTMLDivElement {
    return this.headerContainer;
  }
}
