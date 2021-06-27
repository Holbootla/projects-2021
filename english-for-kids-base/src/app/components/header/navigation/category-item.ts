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
      if (this.category === 'Main page') {
        window.location.hash = '';
      } else {
        window.location.hash = this.category.toLowerCase();
      }
    });

    const hash = window.location.hash.slice(1).toLowerCase();
    if (
      hash === this.category.toLowerCase() ||
      (hash === '' && this.category === 'Main page')
    ) {
      navigationListItem.className = 'navigation-item-current';
    } else {
      navigationListItem.className = 'navigation-item';
    }

    window.addEventListener('hashchange', () => {
      const currentHash = window.location.hash.slice(1).toLowerCase();
      if (
        currentHash === this.category.toLowerCase() ||
        (currentHash === '' && this.category === 'Main page')
      ) {
        navigationListItem.className = 'navigation-item-current';
      } else {
        navigationListItem.className = 'navigation-item';
      }
    });
    return navigationListItem;
  }
}
