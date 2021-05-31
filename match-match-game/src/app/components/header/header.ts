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
    <div class="top-btn-container"></div>
    `
    );
    return this.header;
  }
}
