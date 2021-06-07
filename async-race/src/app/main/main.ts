import Garage from './garage/garage';
import Winners from './winners/winners';

export default class Main {
  main: HTMLDivElement;

  garage: HTMLDivElement;

  winners: HTMLDivElement;

  constructor() {
    this.main = document.createElement('div');
    this.main.classList.add('main');
    this.garage = new Garage().render();
    this.winners = new Winners().render();
  }

  render(): HTMLDivElement {
    this.main.appendChild(this.garage);
    this.main.appendChild(this.winners);

    return this.main;
  }
}
