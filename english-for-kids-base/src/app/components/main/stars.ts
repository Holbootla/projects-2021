import State from '../../state';

export default class Stars {
  stars: HTMLDivElement;

  state: State;

  starsArray: string[];

  MAX_STARS_TO_SHOW: number;

  constructor() {
    this.state = State.getInstance();
    this.stars = document.createElement('div');
    this.stars.classList.add('stars');
    this.stars.classList.add('display-none');
    this.MAX_STARS_TO_SHOW = 8;
    this.starsArray = [];
    this.stars.innerHTML = ``;
  }

  getStars(): HTMLDivElement {
    const hash = window.location.hash.slice(1).toLowerCase();
    if (!hash || !this.state.getPlayMode()) {
      this.removeVisibility();
    } else if (this.state.getPlayMode()) {
      this.addVisibility();
    }
    return this.stars;
  }

  removeVisibility(): void {
    this.stars.classList.add('display-none');
  }

  addVisibility(): void {
    this.stars.classList.remove('display-none');
  }

  addStar(isCorrect: boolean): void {
    if (isCorrect) {
      this.starsArray.push('&#9733');
      if (this.starsArray.length > this.MAX_STARS_TO_SHOW) {
        this.starsArray.shift();
      }
    } else {
      this.starsArray.push('&#9734');
      if (this.starsArray.length > this.MAX_STARS_TO_SHOW) {
        this.starsArray.shift();
      }
    }
    this.stars.innerHTML = `${this.starsArray.join('')}`;
  }

  refreshStars(): void {
    this.starsArray = [];
    this.stars.innerHTML = '';
  }
}
