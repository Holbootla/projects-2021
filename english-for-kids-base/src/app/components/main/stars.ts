import State from '../../state';

export default class Stars {
  stars: HTMLDivElement;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.stars = document.createElement('div');
    this.stars.classList.add('stars');
    this.stars.classList.add('display-none');
    this.stars.innerHTML = `&#9733&#9733&#9733&#9733&#9733&#9733`;
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
}
