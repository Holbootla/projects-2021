import HeaderContainer from './header-container/header-container';
import Navigation from './navigation/navigation';

export default class Header {
  header: HTMLElement;

  hamburger: Navigation;

  headerContainer: HeaderContainer;

  blackout: HTMLDivElement;

  constructor() {
    this.header = document.createElement('header');

    this.hamburger = new Navigation();
    this.headerContainer = new HeaderContainer();
    this.blackout = document.createElement('div');
    this.blackout.classList.add('blackout');

    this.header.appendChild(this.hamburger.getNavigation());
    this.header.appendChild(this.headerContainer.getHeaderContainer());
    this.header.appendChild(this.blackout);

    const hamburgerMenuButton = this.header.querySelector(
      '.hamburger-menu-button'
    );

    hamburgerMenuButton?.addEventListener('click', () => {
      const blackout = this.header.querySelector('.blackout');
      const hamburgerMenu = this.header.querySelector('.hamburger-menu');
      hamburgerMenu?.classList.toggle('hamburger-menu-opened');
      hamburgerMenuButton?.classList.toggle('hamburger-menu-button-close');
      blackout?.classList.toggle('blackout-on');
      document.body.classList.toggle('no-scroll');

      const closeHamburgerMenu = () => {
        hamburgerMenu?.classList.remove('hamburger-menu-opened');
        hamburgerMenuButton.classList.remove('hamburger-menu-button-close');
        blackout?.classList.remove('blackout-on');
        document.body.classList.remove('no-scroll');
      };

      blackout?.addEventListener('click', () => {
        closeHamburgerMenu();
      });

      window.addEventListener('hashchange', () => {
        closeHamburgerMenu();
      });
    });
  }

  getHeader(): HTMLElement {
    return this.header;
  }
}
