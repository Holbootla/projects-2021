import Garage from './garage/garage';
import Winners from './winners/winners';

export default class Main {
  main: HTMLDivElement;

  garage: Garage;

  winners: Winners;

  constructor() {
    this.main = document.createElement('div');
    this.main.classList.add('main');
    this.garage = new Garage();
    this.winners = new Winners();
  }

  render(): HTMLDivElement {
    this.main.appendChild(this.garage.render());
    (async () => {
      this.main.appendChild(await this.winners.render());
      this.winners.addBtnListeners();
    })();
    const reRenderGarage = () => {
      this.garage.render();
    };
    this.main.addEventListener('removed', reRenderGarage);
    this.main.addEventListener('updated', reRenderGarage);
    this.main.addEventListener('created', reRenderGarage);
    this.main.addEventListener('generated', reRenderGarage);
    const reRenderWinners = () => {
      this.winners.render();
    };
    document.addEventListener('newWinners', reRenderWinners);
    return this.main;
  }

  reRenderWinners(): void {
    this.winners.render();
  }

  addGarageVisibility(): void {
    this.garage.addVisibility();
    this.winners.removeVisibility();
  }

  addWinnersVisibility(): void {
    this.garage.removeVisibility();
    this.winners.addVisibility();
  }
}
