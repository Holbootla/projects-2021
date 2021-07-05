import State from '../../state';

export default class Stars {
  state: State;

  table: HTMLTableElement;

  thead: HTMLTableSectionElement;

  tbody: HTMLTableSectionElement;

  tableContainer: HTMLDivElement;

  HUNDRED_PERCENT: number;

  constructor() {
    this.HUNDRED_PERCENT = 100;
    this.state = State.getInstance();
    this.tableContainer = document.createElement('div');
    this.tableContainer.classList.add('statistics-container');
    this.table = document.createElement('table');
    this.table.classList.add('statistics');
    this.thead = document.createElement('thead');
    this.thead.innerHTML = `
      <tr>
        <td>Category</td>
        <td>Word</td>
        <td>Translation</td>
        <td>Clicks</td>
        <td>Right answers</td>
        <td>Wrong answers</td>
        <td>% of right answers</td>
      </tr>
    `;
    this.tbody = document.createElement('tbody');
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.tableContainer.appendChild(this.table);
    document.addEventListener('statisticsUpd', () => {
      this.getStatistics();
    });
  }

  getStatistics(): HTMLDivElement {
    this.tbody.innerHTML = ``;
    console.log(this.tbody);
    const statisticsList = this.state.getStatisticsList();
    statisticsList.forEach((item) => {
      this.tbody.insertAdjacentHTML(
        'beforeend',
        `
        <tr>
          <td>${item.category}</td>
          <td>${item.word}</td>
          <td>${item.translation}</td>
          <td>${item.clicks}</td>
          <td>${item.right}</td>
          <td>${item.wrong}</td>
          <td>${
            Math.floor(
              (item.right / (item.right + item.wrong)) * this.HUNDRED_PERCENT
            ) || 0
          }</td>
        </tr>
      `
      );
    });
    return this.tableContainer;
  }
}
