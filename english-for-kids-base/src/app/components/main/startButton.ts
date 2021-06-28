import State from '../../state';

export default class StartButton {
  button: HTMLDivElement;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.button = document.createElement('div');
    this.button.classList.add('start-game-button');
    this.button.classList.add('display-none');
    this.button.innerText = 'Start game';
  }

  getButton(): HTMLDivElement {
    return this.button;
  }

  removeVisibility(): void {
    this.button.classList.add('display-none');
  }

  addVisibility(): void {
    this.button.classList.remove('display-none');
  }
}
