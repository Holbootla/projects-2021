export default class State {
  private static instance: State;

  playMode: boolean;

  gameStatus: boolean;

  answer: boolean;

  private constructor() {
    this.playMode = false;
    this.gameStatus = false;
    this.answer = false;
  }

  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new State();
    }
    return State.instance;
  }

  public getPlayMode(): boolean {
    return this.playMode;
  }

  public setPlayMode(playMode: boolean): void {
    this.playMode = playMode;
    dispatchEvent(new Event('playModeChange', { bubbles: true }));
  }

  public getGameStatus(): boolean {
    return this.gameStatus;
  }

  public setGameStatus(gameStatus: boolean): void {
    this.gameStatus = gameStatus;
    document.dispatchEvent(new Event('gameStatusChange', { bubbles: true }));
  }

  public setAnswer(answer: boolean): void {
    this.answer = answer;
    document.dispatchEvent(new CustomEvent('answer', { detail: { answer } }));
  }
}
