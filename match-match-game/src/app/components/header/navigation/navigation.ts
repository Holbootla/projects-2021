export default class Navigation {
  navigation: HTMLElement;

  listItems: { itemName: string; itemIcon: string; id: string }[];

  constructor() {
    this.navigation = document.createElement('nav');
    this.listItems = [
      { itemName: 'About game', itemIcon: 'icon-about.svg', id: 'about' },
      { itemName: 'Best score', itemIcon: 'icon-score.svg', id: 'score' },
      {
        itemName: 'Game settings',
        itemIcon: 'icon-settings.svg',
        id: 'settings',
      },
      {
        itemName: 'Play game',
        itemIcon: 'null',
        id: 'game',
      },
    ];
  }

  render(): HTMLElement {
    this.listItems.forEach((el) => {
      this.navigation.insertAdjacentHTML(
        'beforeend',
        `
        <a href="#${el.id}" class="nav__item" id="${el.id}">
          <img src="${el.itemIcon}" alt="">
          <p>${el.itemName}</p>
        </a>
      `
      );
    });
    this.navigation.classList.add('nav__list');
    return this.navigation;
  }
}
