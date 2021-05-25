import Logo from './logo/logo';
import Navigation from './navigation/navigation';
import TopButton from './top-button/top-button';

export default class Header {
  header: HTMLElement;

  logo: HTMLElement;

  navigation: HTMLElement;

  topButton: HTMLElement;

  constructor() {
    this.header = document.createElement('div');
    this.logo = new Logo().render();
    this.navigation = new Navigation().render();
    this.topButton = new TopButton('Register new player').render();
  }

  render(): HTMLElement {
    this.header.classList.add('header');
    this.header.appendChild(this.logo);
    this.header.appendChild(this.navigation);
    this.header.appendChild(this.topButton);
    return this.header;
  }
}
