import { getCars } from '../../api/api';
import Car from './car';

export default class Cars {
  page: HTMLElement;

  carsContainer: HTMLDivElement;

  carsArray: Car[];

  constructor() {
    this.page = document.createElement('h3');
    this.page.classList.add('page');
    this.carsContainer = document.createElement('div');
    this.carsContainer.classList.add('cars');
    this.carsArray = [];
  }

  renderPageNumber(pageNumber: number): HTMLElement {
    this.page.innerText = `Page #${pageNumber}`;
    return this.page;
  }

  render(pageNumber: number): DocumentFragment {
    const constructCarsContainer = async () => {
      const { cars } = await getCars(pageNumber);
      cars.forEach((el) => {
        const car = new Car(el.name, el.color, el.id);
        this.carsArray.push(car);
        this.carsContainer.appendChild(car.render());
      });
    };
    const fragmentCarsPage = document.createDocumentFragment();
    fragmentCarsPage.appendChild(this.renderPageNumber(pageNumber));
    constructCarsContainer();
    fragmentCarsPage.appendChild(this.carsContainer);

    return fragmentCarsPage;
  }

  clear(): void {
    this.carsArray.forEach((el) => {
      el.destroy();
    });
    this.carsArray = [];
    this.carsContainer.innerHTML = '';
  }
}
