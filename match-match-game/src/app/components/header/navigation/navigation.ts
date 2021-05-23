export default class Navigation {
  navigation: HTMLElement;

  listItems: { itemName: string; itemIcon: string }[];

  constructor() {
    this.navigation = document.createElement('nav');
    this.listItems = [
      { itemName: 'About game', itemIcon: 'icon-about.svg' },
      { itemName: 'Best score', itemIcon: 'icon-score.svg' },
      { itemName: 'Game settings', itemIcon: 'icon-settings.svg' },
    ];
  }

  render(): HTMLElement {
    this.listItems.forEach((el) => {
      this.navigation.insertAdjacentHTML(
        'beforeend',
        `
        <li class="nav__item">
          <img src="${el.itemIcon}" alt="">
          <p>${el.itemName}</p>
        </li>
      `
      );
    });
    this.navigation.classList.add('nav__list');
    return this.navigation;
  }
}
