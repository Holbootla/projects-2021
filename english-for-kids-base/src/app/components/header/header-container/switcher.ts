import State from '../../../state';

export default class Switcher {
  switcher: HTMLDivElement;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.switcher = document.createElement('div');
    this.switcher.classList.add('game-mode-button');
    this.switcher.innerHTML = `
      <div class="game-mode-button-switcher"></div>
      <div class="game-mode-button-text"></div>
    `;
  }

  getSwitcher(): HTMLDivElement {
    const PLAY_TEXT = 'PLAY';
    const TRAIN_TEXT = 'TRAIN';

    const gameModeButtonSwitcher = this.switcher.querySelector(
      '.game-mode-button-switcher'
    );
    const gameModeButtonText = this.switcher.querySelector(
      '.game-mode-button-text'
    );
    if (gameModeButtonText) {
      gameModeButtonText.innerHTML = PLAY_TEXT;
    }

    this.switcher.addEventListener('click', () => {
      this.switcher.classList.toggle('game-mode-button-on');
      gameModeButtonSwitcher?.classList.toggle('game-mode-button-switcher-on');
      gameModeButtonText?.classList.toggle('game-mode-button-text-on');
      if (
        gameModeButtonText &&
        this.switcher.classList.contains('game-mode-button-on')
      ) {
        gameModeButtonText.innerHTML = TRAIN_TEXT;
        this.state.setPlayMode(true);
      } else if (gameModeButtonText) {
        gameModeButtonText.innerHTML = PLAY_TEXT;
        this.state.setPlayMode(false);
      }
    });
    return this.switcher;
  }
}
