import NavigationList from './navigation-list';

export default class Navigation {
  hamburger: HTMLElement;

  navigationList: NavigationList;

  constructor() {
    this.hamburger = document.createElement('aside');
    this.hamburger.classList.add('hamburger-menu');
    this.navigationList = new NavigationList();
    this.hamburger.appendChild(this.navigationList.getNavigationList());
  }

  getNavigation(): HTMLElement {
    return this.hamburger;
  }
}
