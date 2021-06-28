import State from '../../state';
import CardsContainer from './cards-container/cards-container';
import StartButton from './startButton';

export default class Main {
  main: HTMLElement;

  stars: HTMLDivElement;

  cards: CardsContainer;

  startButton: StartButton;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.main = document.createElement('main');
    this.stars = document.createElement('div');
    this.cards = new CardsContainer();
    this.startButton = new StartButton();
    this.main.appendChild(this.stars);
    this.main.appendChild(this.cards.getCards());
    this.main.appendChild(this.startButton.getButton());
  }

  getMain(): HTMLElement {
    window.addEventListener('hashchange', () => {
      this.refreshMain();
    });
    window.addEventListener('playModeChange', () => {
      this.refreshMain();
    });
    return this.main;
  }

  refreshMain(): void {
    this.main.innerHTML = '';
    this.main.appendChild(this.stars);
    this.main.appendChild(this.cards.getCards());
    this.main.appendChild(this.startButton.getButton());
    this.cards.getCards();
    const hash = window.location.hash.slice(1).toLowerCase();
    if (!hash || !this.state.getPlayMode()) {
      this.startButton.removeVisibility();
    } else if (
      this.startButton.getButton().classList.contains('display-none') &&
      this.state.getPlayMode()
    ) {
      this.startButton.addVisibility();
    }
  }
}
