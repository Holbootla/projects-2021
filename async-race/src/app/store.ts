export default class Store {
  private static instance: Store;

  pageNumber: number;

  selectedCar: { name: string; color: string; id: number };

  private constructor() {
    this.pageNumber = 1;
    this.selectedCar = { name: 'Tesla', color: '#000000', id: 1 };
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
}
