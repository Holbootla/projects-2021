import cardsData from '../data/cards-data';

export type OrderType =
  | 'category'
  | 'word'
  | 'clicks'
  | 'right'
  | 'wrong'
  | 'percent';

export type Order = 'ASC' | 'DESC';

export default class State {
  private static instance: State;

  playMode: boolean;

  gameStatus: boolean;

  answer: boolean;

  wordsCounter: number;

  currentWords: string[];

  rightAnswers: number;

  wrongAnswers: number;

  statistics: {
    category: string;
    word: string;
    translation: string;
    clicks: number;
    right: number;
    wrong: number;
  }[];

  currentStatistics: {
    category: string;
    word: string;
    translation: string;
    clicks: number;
    right: number;
    wrong: number;
  }[];

  orderType: OrderType;

  order: Order;

  private constructor() {
    this.playMode = false;
    this.gameStatus = false;
    this.answer = false;
    this.wordsCounter = 0;
    this.currentWords = [];
    this.rightAnswers = 0;
    this.wrongAnswers = 0;
    this.statistics = [];
    if (!localStorage.getItem('statistics')) {
      cardsData.forEach((item) => {
        item.words.forEach((word) => {
          this.statistics.push({
            category: item.category,
            word: word.word,
            translation: word.translation,
            clicks: 0,
            right: 0,
            wrong: 0,
          });
        });
      });
      localStorage.setItem('statistics', `${JSON.stringify(this.statistics)}`);
    } else {
      this.statistics = JSON.parse(localStorage.getItem('statistics') ?? '');
    }
    this.currentStatistics = [];
    this.orderType = 'category';
    this.order = 'ASC';
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

  public getStatisticsList(
    orderType: OrderType = 'category',
    order: Order = 'ASC'
  ): {
    category: string;
    word: string;
    translation: string;
    clicks: number;
    right: number;
    wrong: number;
  }[] {
    this.orderType = orderType;
    this.order = order;
    this.currentStatistics = JSON.parse(
      localStorage.getItem('statistics') ?? ''
    );
    switch (this.orderType) {
      case 'category':
        return this.currentStatistics.sort((a, b) => {
          if (a.category < b.category) {
            return this.order === 'DESC' ? 1 : -1;
          }
          if (a.category > b.category) {
            return this.order === 'DESC' ? -1 : 1;
          }
          return 0;
        });
      case 'word':
        return this.currentStatistics.sort((a, b) => {
          if (a.word < b.word) {
            return this.order === 'DESC' ? 1 : -1;
          }
          if (a.word > b.word) {
            return this.order === 'DESC' ? -1 : 1;
          }
          return 0;
        });
      case 'clicks':
        return this.currentStatistics.sort((a, b) =>
          this.order === 'DESC' ? a.clicks - b.clicks : b.clicks - a.clicks
        );
      case 'right':
        return this.currentStatistics.sort((a, b) =>
          this.order === 'DESC' ? a.right - b.right : b.right - a.right
        );
      case 'wrong':
        return this.currentStatistics.sort((a, b) =>
          this.order === 'DESC' ? a.wrong - b.wrong : b.wrong - a.wrong
        );
      case 'percent':
        return this.currentStatistics.sort((a, b) =>
          this.order === 'DESC'
            ? Math.floor((a.right / (a.right + a.wrong) || 0) * 100) -
              Math.floor((b.right / (b.right + b.wrong) || 0) * 100)
            : Math.floor((b.right / (b.right + b.wrong) || 0) * 100) -
              Math.floor((a.right / (a.right + a.wrong) || 0) * 100)
        );
      default:
        return this.currentStatistics.sort((a, b) => {
          if (a.category < b.category) {
            return this.order === 'DESC' ? 1 : -1;
          }
          if (a.category > b.category) {
            return this.order === 'DESC' ? -1 : 1;
          }
          return 0;
        });
    }
  }

  public setStatisticsList(
    actionType: string,
    category: string,
    word: string
  ): void {
    const indexOfStatItem = this.statistics.findIndex(
      (item) => item.category === category && item.word === word
    );
    switch (actionType) {
      case 'clicks':
        this.statistics[indexOfStatItem].clicks += 1;
        break;
      case 'right':
        this.statistics[indexOfStatItem].right += 1;
        break;
      case 'wrong':
        this.statistics[indexOfStatItem].wrong += 1;
        break;
      default:
        break;
    }
    localStorage.setItem('statistics', `${JSON.stringify(this.statistics)}`);
    document.dispatchEvent(new Event('statisticsUpd'));
  }

  public getOrder(): Order {
    return this.order;
  }

  public getOrderType(): OrderType {
    return this.orderType;
  }

  public setOrder(order: Order): void {
    this.order = order;
  }

  public setOrderType(orderType: OrderType): void {
    this.orderType = orderType;
  }
}
