import State from '../../state';
import CardsContainer from './cards-container/cards-container';
import Stars from './stars';
import StartButton from './startButton';

export default class Main {
  main: HTMLElement;

  stars: Stars;

  cards: CardsContainer;

  startButton: StartButton;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.main = document.createElement('main');
    this.stars = new Stars();
    this.cards = new CardsContainer();
    this.startButton = new StartButton();
    this.main.appendChild(this.stars.getStars());
    document.addEventListener('answer', (event) => {
      this.stars.addStar((<CustomEvent>event).detail.answer);
    });
    this.main.appendChild(this.cards.getCards());
    this.main.appendChild(this.startButton.getButton());
  }

  getMain(): HTMLElement {
    window.addEventListener('hashchange', () => {
      this.refreshMain();
      this.state.setGameStatus(false);
      this.state.resetAnswers();
      this.stars.refreshStars();
    });
    window.addEventListener('playModeChange', () => {
      this.refreshMain();
      this.stars.refreshStars();
    });
    return this.main;
  }

  refreshMain(): void {
    this.main.removeChild(this.stars.getStars());
    this.main.removeChild(this.cards.getCards());
    this.main.removeChild(this.startButton.getButton());
    this.main.appendChild(this.stars.getStars());
    this.main.appendChild(this.cards.getCards());
    this.main.appendChild(this.startButton.getButton());
    this.cards.getCards();
  }
}
