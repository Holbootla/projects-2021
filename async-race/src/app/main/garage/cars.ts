import { getCars } from '../../api/api';
import Car from './car';

export default class Cars {
  page: HTMLElement;

  carsContainer: HTMLDivElement;

  fragmentCarsPage: DocumentFragment;

  constructor() {
    this.fragmentCarsPage = document.createDocumentFragment();
    this.page = document.createElement('h3');
    this.page.classList.add('page');
    this.carsContainer = document.createElement('div');
    this.carsContainer.classList.add('cars');
  }

  renderPageNumber(pageNumber: number): HTMLElement {
    this.page.innerText = `Page #${pageNumber}`;
    return this.page;
  }

  render(pageNumber: number): DocumentFragment {
    const constructCarsContainer = async () => {
      this.carsContainer.innerHTML = '';
      const { cars } = await getCars(pageNumber);
      cars.forEach((el) => {
        this.carsContainer.insertAdjacentElement(
          'beforeend',
          new Car(el.name, el.color, el.id).render()
        );
      });
    };

    this.fragmentCarsPage.appendChild(this.renderPageNumber(pageNumber));
    constructCarsContainer();
    this.fragmentCarsPage.appendChild(this.carsContainer);

    return this.fragmentCarsPage;
  }
}
