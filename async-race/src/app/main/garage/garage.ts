import { getCars } from '../../api/api';
import Store from '../../store';
import Cars from './cars';
import Controls from './controls';

export default class Garage {
  garage: HTMLDivElement;

  pageControls: HTMLElement;

  store: Store;

  controls: Controls;

  controlsElement: HTMLDivElement;

  cars: Cars;

  constructor() {
    this.store = Store.getInstance();
    this.garage = document.createElement('div');
    this.garage.classList.add('garage');
    this.controls = new Controls();
    this.controlsElement = this.controls.render();
    this.pageControls = document.createElement('div');
    this.pageControls.classList.add('page-controls');
    this.cars = new Cars();
  }

  render(): HTMLDivElement {
    this.garage.innerHTML = '';
    this.cars.clear();
    const carsContainer = this.cars.render(this.store.getPageNumber());
    this.garage.appendChild(this.controlsElement);
    this.garage.appendChild(carsContainer);
    this.garage.appendChild(this.renderPageNavBtns());
    return this.garage;
  }

  renderPageNavBtns(): HTMLElement {
    this.pageControls.innerHTML = '';
    const btnNext = document.createElement('div');
    btnNext.classList.add('btn');
    btnNext.innerText = `Next >>`;
    const btnPrev = document.createElement('div');
    btnPrev.classList.add('btn');
    btnPrev.innerText = '<< Previous';
    btnPrev.addEventListener('click', () => {
      if (this.store.getPageNumber() > 1) {
        this.store.decPageNumber();
        this.render();
      }
    });
    if (this.store.getPageNumber() === 1) {
      btnPrev.classList.add('btn_disabled');
    }
    btnNext.addEventListener('click', () => {
      this.store.incPageNumber();
      this.render();
    });
    (async () => {
      const { cars } = await getCars(this.store.getPageNumber() + 1);
      if (cars.length === 0) {
        btnNext.classList.add('btn_disabled');
      }
    })();

    this.pageControls.appendChild(btnPrev);
    this.pageControls.appendChild(btnNext);

    return this.pageControls;
  }

  toggleVisibility(): void {
    this.garage.classList.toggle('invisible');
  }
}
