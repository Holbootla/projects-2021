export default class Store {
  private static instance: Store;

  pageNumber: number;

  selectedCarId: number | undefined;

  private constructor() {
    this.pageNumber = 1;
    this.selectedCarId = undefined;
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

  public getSelectedCarId(): number | undefined {
    return this.selectedCarId;
  }

  public setSelectedCarId(carId: number): void {
    this.selectedCarId = carId;
  }
}
