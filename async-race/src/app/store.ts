import { WinnersOrder, WinnersSort } from './api/api';

export default class Store {
  private static instance: Store;

  pageNumber: number;

  selectedCar: { name: string; color: string; id: number };

  isRace: boolean;

  winnersPageNumber: number;

  winnersSort: 'id' | 'wins' | 'time';

  winnersOrder: 'ASC' | 'DESC';

  private constructor() {
    this.pageNumber = 1;
    this.winnersPageNumber = 1;
    this.selectedCar = { name: 'Tesla', color: '#000000', id: 1 };
    this.isRace = false;
    this.winnersSort = 'time';
    this.winnersOrder = 'ASC';
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public getPageNumber(): number {
    return this.pageNumber;
  }

  public incPageNumber(): void {
    this.pageNumber += 1;
  }

  public decPageNumber(): void {
    this.pageNumber -= 1;
  }

  public getSelectedCar(): { name: string; color: string; id: number } {
    return this.selectedCar;
  }

  public setSelectedCar(name: string, color: string, id: number): void {
    this.selectedCar = { name, color, id };
  }

  public getIsRace(): boolean {
    return this.isRace;
  }

  public setIsRace(flag: boolean): void {
    this.isRace = flag;
  }

  public getWinnersPageNumber(): number {
    return this.winnersPageNumber;
  }

  public incWinnersPageNumber(): void {
    this.winnersPageNumber += 1;
  }

  public decWinnersPageNumber(): void {
    this.winnersPageNumber -= 1;
  }

  public getWinnersSort(): WinnersSort {
    return this.winnersSort;
  }

  public setWinnersSort(string: WinnersSort): void {
    this.winnersSort = string;
  }

  public getWinnersOrder(): WinnersOrder {
    return this.winnersOrder;
  }

  public setWinnersOrder(string: WinnersOrder): void {
    this.winnersOrder = string;
  }
}
