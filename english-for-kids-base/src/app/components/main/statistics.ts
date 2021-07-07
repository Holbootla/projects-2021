import State, { OrderType, Order } from '../../state';

export default class Statistics {
  state: State;

  table: HTMLTableElement;

  thead: HTMLTableSectionElement;

  tbody: HTMLTableSectionElement;

  tableContainer: HTMLDivElement;

  HUNDRED_PERCENT: number;

  categoryBtn: HTMLTableSectionElement | null;

  wordBtn: HTMLTableSectionElement | null;

  clicksBtn: HTMLTableSectionElement | null;

  rightBtn: HTMLTableSectionElement | null;

  wrongBtn: HTMLTableSectionElement | null;

  percentBtn: HTMLTableSectionElement | null;

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
        <td id="categoryBtn" class="btn-table">Category ↓</td>
        <td id="wordBtn" class="btn-table">Word</td>
        <td>Translation</td>
        <td id="clicksBtn" class="btn-table">Clicks</td>
        <td id="rightBtn" class="btn-table">Right answers</td>
        <td id="wrongBtn" class="btn-table">Wrong answers</td>
        <td id="percentBtn" class="btn-table">% of right answers</td>
      </tr>
    `;
    this.tbody = document.createElement('tbody');
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.tableContainer.appendChild(this.table);
    document.addEventListener('statisticsUpd', () => {
      this.getStatistics();
    });
    this.categoryBtn = this.thead.querySelector('#categoryBtn');
    this.wordBtn = this.thead.querySelector('#wordBtn');
    this.clicksBtn = this.thead.querySelector('#clicksBtn');
    this.rightBtn = this.thead.querySelector('#rightBtn');
    this.wrongBtn = this.thead.querySelector('#wrongBtn');
    this.percentBtn = this.thead.querySelector('#percentBtn');
    const sort = (orderType: OrderType) => {
      if (this.state.getOrderType() !== orderType) {
        this.state.setOrderType(orderType);
        this.getStatistics();
      } else if (this.state.getOrderType() === orderType) {
        if (this.state.getOrder() === 'ASC') {
          this.state.setOrder('DESC');
          this.getStatistics();
        } else {
          this.state.setOrder('ASC');
          this.getStatistics();
        }
      }
    };
    this.categoryBtn?.addEventListener('click', () => {
      sort('category');
    });
    this.wordBtn?.addEventListener('click', () => {
      sort('word');
    });
    this.clicksBtn?.addEventListener('click', () => {
      sort('clicks');
    });
    this.rightBtn?.addEventListener('click', () => {
      sort('right');
    });
    this.wrongBtn?.addEventListener('click', () => {
      sort('wrong');
    });
    this.percentBtn?.addEventListener('click', () => {
      sort('percent');
    });
  }

  getStatistics(): HTMLDivElement {
    const order = this.state.getOrder();
    const orderType = this.state.getOrderType();
    const arrow = order === 'ASC' ? ' &#8595;' : ' &#8593;';
    if (this.categoryBtn) {
      this.categoryBtn.innerHTML = `Category${
        orderType === 'category' ? arrow : ''
      }`;
    }
    if (this.wordBtn) {
      this.wordBtn.innerHTML = `Word${orderType === 'word' ? arrow : ''}`;
    }
    if (this.clicksBtn) {
      this.clicksBtn.innerHTML = `Clicks${orderType === 'clicks' ? arrow : ''}`;
    }
    if (this.rightBtn) {
      this.rightBtn.innerHTML = `Right answers${
        orderType === 'right' ? arrow : ''
      }`;
    }
    if (this.wrongBtn) {
      this.wrongBtn.innerHTML = `Wrong answers${
        orderType === 'wrong' ? arrow : ''
      }`;
    }
    if (this.percentBtn) {
      this.percentBtn.innerHTML = `% of right answers${
        orderType === 'percent' ? arrow : ''
      }`;
    }

    this.tbody.innerHTML = ``;
    const statisticsList = this.state.getStatisticsList(orderType, order);
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
