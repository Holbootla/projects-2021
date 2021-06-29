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
    this.button.addEventListener('click', () => {
      const gameStatus = this.state.getGameStatus();
      if (gameStatus === false) {
        this.state.setGameStatus(true);
      } else {
        console.log('REPEAT WORD');
      }
    });
    document.addEventListener('gameStatusChange', () => {
      const gameStatus = this.state.getGameStatus();
      if (gameStatus) {
        this.button.classList.add('repeat-button');
        this.button.innerText = 'Repeat';
      } else {
        this.button.classList.remove('repeat-button');
        this.button.innerText = 'Start game';
      }
    });
  }

  getButton(): HTMLDivElement {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (!hash || !this.state.getPlayMode()) {
      this.removeVisibility();
    } else if (this.state.getPlayMode()) {
      this.addVisibility();
    }
    return this.button;
  }

  removeVisibility(): void {
    this.button.classList.add('display-none');
  }

  addVisibility(): void {
    this.button.classList.remove('display-none');
  }
}
