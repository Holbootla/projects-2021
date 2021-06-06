export default class Header {
  header: HTMLDivElement;

  nav: HTMLElement;

  constructor() {
    this.header = document.createElement('div');
    this.header.classList.add('header');
    this.nav = document.createElement('nav');
    this.nav.classList.add('nav');
  }

  render(): HTMLDivElement {
    this.nav.innerHTML = `
    <a href="#garage" class="nav__item">Garage</a>
    <a href="#winners" class="nav__item">Winners</a>
    `;
    this.header.appendChild(this.nav);
    return this.header;
  }
}
