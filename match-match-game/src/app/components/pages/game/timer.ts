export default class Timer {
  timer: HTMLElement;

  minutes: number;

  seconds: number;

  constructor() {
    this.timer = document.createElement('div');
    this.minutes = 0;
    this.seconds = 0;
  }

  render(): HTMLElement {
    this.timer.classList.add('timer');
    this.timer.insertAdjacentHTML(
      'beforeend',
      `
      ${this.minutes < 10 ? `0${this.minutes}` : this.minutes} : ${
        this.seconds < 10 ? `0${this.seconds}` : this.seconds
      }
    `
    );

    return this.timer;
  }
}
