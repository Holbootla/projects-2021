export default class Store {
  private static instance: Store;

  pageNumber: number;

  private constructor() {
    this.pageNumber = 1;
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
}
