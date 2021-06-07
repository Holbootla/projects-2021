import Controls from './controls';

export default class Garage {
  garage: HTMLDivElement;

  controls: HTMLDivElement;

  constructor() {
    this.garage = document.createElement('div');
    this.garage.classList.add('garage');
    this.controls = new Controls().render();
  }

  render(): HTMLDivElement {
    this.garage.appendChild(this.controls);
    return this.garage;
  }
}
