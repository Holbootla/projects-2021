import Switcher from './switcher';

export default class HeaderContainer {
  headerContainer: HTMLDivElement;

  switcher: Switcher;

  constructor() {
    this.headerContainer = document.createElement('div');
    this.headerContainer.classList.add('header-container');
    this.switcher = new Switcher();
    this.headerContainer.insertAdjacentHTML(
      'beforeend',
      `
    <div class="hamburger-menu-button">
      <div class="hamburger-menu-button-line-1"></div>
      <div class="hamburger-menu-button-line-2"></div>
      <div class="hamburger-menu-button-line-3"></div>
    </div>
    `
    );
    this.headerContainer.insertAdjacentElement(
      'beforeend',
      this.switcher.getSwitcher()
    );
  }

  getHeaderContainer(): HTMLDivElement {
    return this.headerContainer;
  }
}
