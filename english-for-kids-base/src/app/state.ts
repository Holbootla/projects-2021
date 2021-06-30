export default class State {
  private static instance: State;

  playMode: boolean;

  gameStatus: boolean;

  answer: boolean;

  wordsCounter: number;

  currentWords: string[];

  private constructor() {
    this.playMode = false;
    this.gameStatus = false;
    this.answer = false;
    this.wordsCounter = 0;
    this.currentWords = [];
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

  public incWordCounter(): void {
    this.wordsCounter += 1;
  }

  public getCurrentWord(): string {
    return this.currentWords[this.wordsCounter];
  }

  public setCurrentWords(words: string[]): void {
    this.currentWords = words;
    this.wordsCounter = 0;
  }

  public isFinish(): boolean {
    return !(this.currentWords.length > this.wordsCounter);
  }
}
