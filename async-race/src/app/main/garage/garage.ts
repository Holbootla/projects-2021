import { getCars } from '../../api/api';
import Cars from './cars';
import Controls from './controls';

export default class Garage {
  garage: HTMLDivElement;

  controls: HTMLDivElement;

  title: HTMLElement;

  cars: DocumentFragment;

  constructor() {
    this.garage = document.createElement('div');
    this.garage.classList.add('garage');
    this.controls = new Controls().render();
    this.title = document.createElement('h2');
    this.title.classList.add('title');
    this.cars = new Cars().render(2);
  }

  render(): HTMLDivElement {
    (async () => {
      const { carsCount } = await getCars();
      this.title.innerText = `Garage (${carsCount})`;
    })();

    this.garage.appendChild(this.controls);
    this.garage.appendChild(this.title);
    this.garage.appendChild(this.cars);
    return this.garage;
  }
}
