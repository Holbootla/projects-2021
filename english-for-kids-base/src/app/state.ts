export default class State {
  private static instance: State;

  playMode: boolean;

  gameStatus: boolean;

  answer: boolean;

  wordsCounter: number;

  currentWords: string[];

  rightAnswers: number;

  wrongAnswers: number;

  private constructor() {
    this.playMode = false;
    this.gameStatus = false;
    this.answer = false;
    this.wordsCounter = 0;
    this.currentWords = [];
    this.rightAnswers = 0;
    this.wrongAnswers = 0;
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
    this.resetAnswers();
    dispatchEvent(new Event('playModeChange', { bubbles: true }));
  }

  public getGameStatus(): boolean {
    return this.gameStatus;
  }

  public setGameStatus(gameStatus: boolean): void {
    this.gameStatus = gameStatus;
    this.resetAnswers();
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

  public incRightAnswers(): void {
    this.rightAnswers += 1;
  }

  public incWrongAnswers(): void {
    this.wrongAnswers += 1;
  }

  public resetAnswers(): void {
    this.rightAnswers = 0;
    this.wrongAnswers = 0;
  }

  public getRightAnswers(): number {
    return this.rightAnswers;
  }

  public getWrongAnswers(): number {
    return this.wrongAnswers;
  }
}
