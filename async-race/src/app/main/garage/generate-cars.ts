import { createCar } from '../../api/api';

export default class GenerateCars {
  models: string[];

  series: string[];

  seriesNumbers: string[];

  HOW_MUCH_GENERATE: number;

  MAX_NUMBER_OF_HEX_COLOR: number;

  constructor() {
    this.models = [
      'Audi',
      'BMW',
      'Volkswagen',
      'Ford',
      'Porsche',
      'Ferrari',
      'Lamborghini',
      'Lada',
      'Honda',
      'Fiat',
      'Suzuki',
      'Seat',
      'Tesla',
    ];
    this.series = ['A', 'B', 'C', 'E', 'S', 'RX', 'RS', 'M', 'i', 'X'];
    this.seriesNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '666'];
    this.HOW_MUCH_GENERATE = 100;
    this.MAX_NUMBER_OF_HEX_COLOR = 16777215;
  }

  generateCars(): void {
    function getRandomIndex(max: number): number {
      return Math.floor(Math.random() * max);
    }

    for (let i = 1; i <= this.HOW_MUCH_GENERATE; i += 1) {
      const randomModel = this.models[getRandomIndex(this.models.length)];
      const randomSeries = this.series[getRandomIndex(this.series.length)];
      const randomSeriesNumber =
        this.seriesNumbers[getRandomIndex(this.seriesNumbers.length)];
      const randomColor = `#${Math.floor(
        Math.random() * this.MAX_NUMBER_OF_HEX_COLOR
      ).toString(16)}`;
      const randomCarName = `${randomModel} ${randomSeries}${randomSeriesNumber}`;

      const carToCreate = { name: randomCarName, color: randomColor };

      createCar(carToCreate);
    }
  }
}
