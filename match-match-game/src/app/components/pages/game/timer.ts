export default class Timer {
  timer: HTMLElement;

  minutes: number;

  seconds: number;

  constructor() {
    this.timer = document.createElement('div');
    this.timer.classList.add('timer');
    this.minutes = 0;
    this.seconds = 0;
  }

  render(): HTMLElement {
    this.timer.innerHTML = ``;
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

  plus(): void {
    this.seconds += 1;
    if (this.seconds === 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
  }

  minus(): void {
    this.seconds -= 1;
  }

  reverse(): void {
    this.seconds = 15;
  }
}
