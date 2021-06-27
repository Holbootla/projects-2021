export default class CategoryItem {
  category: string;

  constructor(category: string) {
    this.category = category;
  }

  getNavigationListItem(): HTMLLIElement {
    const navigationListItem = document.createElement('li');
    navigationListItem.classList.add('navigation-item');
    navigationListItem.innerText = this.category;
    navigationListItem.addEventListener('click', () => {
      window.location.hash = this.category.toLowerCase();
    });
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash === this.category.toLowerCase()) {
        navigationListItem.className = 'navigation-item-current';
      } else {
        navigationListItem.className = 'navigation-item';
      }
    });
    return navigationListItem;
  }
}
