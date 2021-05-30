import Gameplay from './gameplay';

export default class Timer {
  timer: HTMLElement;

  minutes: number;

  seconds: number;

  minusTimer!: NodeJS.Timeout;

  plusTimer!: NodeJS.Timeout;

  startMinusTimerTimeout!: NodeJS.Timeout;

  stopMinusTimerTimeout!: NodeJS.Timeout;

  startPlusTimerTimeout!: NodeJS.Timeout;

  gameplay: Gameplay | undefined;

  scoreSeconds: number;

  constructor() {
    this.timer = document.createElement('div');
    this.timer.classList.add('timer');
    this.minutes = 0;
    this.seconds = 0;
    this.scoreSeconds = 0;
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
    this.scoreSeconds += 1;
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

  startMinusTimer(): void {
    this.minusTimer = setInterval(() => {
      this.minus();
      this.render();
    }, 1000);
  }

  startPlusTimer(): void {
    this.plusTimer = setInterval(() => {
      this.plus();
      this.render();
    }, 1000);
  }

  stopMinusTimer(): void {
    clearInterval(this.minusTimer);
  }

  stopPlusTimer(): void {
    clearInterval(this.plusTimer);
  }

  startGame(): void {
    this.startMinusTimerTimeout = setTimeout(() => {
      this.startMinusTimer();
    }, 500);
    this.stopMinusTimerTimeout = setTimeout(() => {
      this.stopMinusTimer();
    }, 16000);
  }

  resumeGame(): void {
    this.startPlusTimerTimeout = setTimeout(() => {
      this.startPlusTimer();
      this.gameplay = new Gameplay();
      this.gameplay.flipAll();
      this.gameplay.flip();
      this.stopIfFinish();
    }, 17000);
  }

  stopAllTimers(): void {
    clearInterval(this.minusTimer);
    clearInterval(this.plusTimer);
    clearInterval(this.startMinusTimerTimeout);
    clearInterval(this.stopMinusTimerTimeout);
    clearInterval(this.startPlusTimerTimeout);
  }

  stopIfFinish(): void {
    document.querySelectorAll('.card').forEach((el) => {
      el.addEventListener('click', () => {
        console.log(this.gameplay?.matchCounter, '1');
        if (this.gameplay?.matchCounter === 6) {
          this.stopAllTimers();
        }
      });
    });
  }
}
