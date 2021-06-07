import { getCars } from '../../api/api';
import Controls from './controls';

export default class Garage {
  garage: HTMLDivElement;

  controls: HTMLDivElement;

  title: HTMLDivElement;

  constructor() {
    this.garage = document.createElement('div');
    this.garage.classList.add('garage');
    this.controls = new Controls().render();
    this.title = document.createElement('div');
    this.title.classList.add('title');
  }

  render(): HTMLDivElement {
    (async () => {
      const { carsCount } = await getCars();
      this.title.innerText = `Garage (${carsCount})`;
    })();

    this.garage.appendChild(this.controls);
    this.garage.appendChild(this.title);
    return this.garage;
  }
}
