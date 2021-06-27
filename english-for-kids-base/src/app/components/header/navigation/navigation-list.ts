import cardsData from '../../../../data/cards-data';
import CategoryItem from './category-item';

export default class NavigationList {
  navigationList: HTMLUListElement;

  listItems: string[];

  constructor() {
    this.navigationList = document.createElement('ul');
    this.navigationList.classList.add('navigation-list');
    this.navigationList.appendChild(
      new CategoryItem('Main page').getNavigationListItem()
    );
    this.listItems = cardsData.map((card) => card.category);
    this.listItems.forEach((category) => {
      this.navigationList.appendChild(
        new CategoryItem(category).getNavigationListItem()
      );
    });
  }

  getNavigationList(): HTMLUListElement {
    return this.navigationList;
  }

  refreshListItems(): void {
    this.listItems = cardsData.map((card) => card.category);
  }
}
