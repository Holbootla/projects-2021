import Garage from './garage/garage';
import Winners from './winners/winners';

export default class Main {
  main: HTMLDivElement;

  garage: Garage;

  winners: HTMLDivElement;

  constructor() {
    this.main = document.createElement('div');
    this.main.classList.add('main');
    this.garage = new Garage();
    this.winners = new Winners().render();
  }

  render(): HTMLDivElement {
    this.main.appendChild(this.garage.render());
    this.main.appendChild(this.winners);
    const reRender = () => {
      this.garage.render();
    };
    this.main.addEventListener('removed', reRender);
    this.main.addEventListener('updated', reRender);
    this.main.addEventListener('created', reRender);
    this.main.addEventListener('generated', reRender);
    return this.main;
  }
}
