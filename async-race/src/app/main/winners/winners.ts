export default class Winners {
  winners: HTMLDivElement;

  constructor() {
    this.winners = document.createElement('div');
    this.winners.classList.add('winners');
  }

  render(): HTMLDivElement {
    return this.winners;
  }
}
