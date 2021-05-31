import Logo from './logo/logo';
import Navigation from './navigation/navigation';

export default class Header {
  header: HTMLElement;

  logo: HTMLElement;

  navigation: HTMLElement;

  constructor() {
    this.header = document.createElement('div');
    this.logo = new Logo().render();
    this.navigation = new Navigation().render();
  }

  render(): HTMLElement {
    this.header.classList.add('header');
    this.header.appendChild(this.logo);
    this.header.appendChild(this.navigation);
    this.header.insertAdjacentHTML(
      'beforeend',
      `
    <a href="#game" class="top-btn" id="game">Start game</a>
    `
    );
    return this.header;
  }
}
