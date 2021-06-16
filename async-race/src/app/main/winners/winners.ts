/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { getCar, getWinners } from '../../api/api';
import Store from '../../store';

export default class Winners {
  store: Store;

  limit: number;

  btnPagePrev: HTMLDivElement;

  btnPageNext: HTMLDivElement;

  pageControls: HTMLDivElement;

  winnersContainer: HTMLDivElement;

  constructor() {
    this.limit = 10;
    this.store = Store.getInstance();
    this.pageControls = document.createElement('div');
    this.pageControls.classList.add('page-controls');
    this.btnPagePrev = document.createElement('div');
    this.btnPagePrev.classList.add('btn');
    this.btnPagePrev.classList.add('btnPagePrev');
    this.btnPagePrev.innerText = '<< Previous';
    this.btnPageNext = document.createElement('div');
    this.btnPageNext.classList.add('btn');
    this.btnPageNext.classList.add('btnPageNext');
    this.btnPageNext.innerText = 'Next >>';
    this.winnersContainer = document.createElement('div');
    this.winnersContainer.classList.add('winners');
    this.winnersContainer.classList.add('invisible');
  }

  render(): Promise<HTMLDivElement> {
    const constructWinners = async () => {
      const winnersPageNumber = this.store.getWinnersPageNumber();
      const winnersSort = this.store.getWinnersSort();
      const winnersOrder = this.store.getWinnersOrder();
      this.btnPagePrev.classList.remove('btn_disabled');
      this.btnPageNext.classList.remove('btn_disabled');
      if (winnersPageNumber === 1) {
        this.btnPagePrev.classList.add('btn_disabled');
      }
      (async () => {
        const { winners } = await getWinners(
          this.store.getWinnersPageNumber() + 1,
          this.limit,
          this.store.getWinnersSort(),
          winnersOrder
        );
        if (winners.length === 0) {
          this.btnPageNext.classList.add('btn_disabled');
        }
      })();
      let listNumber = (winnersPageNumber - 1) * this.limit + 1;
      const { winners, winnersCount } = await getWinners(
        winnersPageNumber,
        this.limit,
        winnersSort,
        winnersOrder
      );
      const scoreMain = document.createElement('div');
      scoreMain.classList.add('score-main');
      for (const el of winners) {
        scoreMain.insertAdjacentHTML(
          'beforeend',
          `
        <div class="score-result">
          <div class="score-item">${listNumber}</div>
          <div class="score-item"><svg height="50px" viewBox="-5 5 520 220" width="100px" xmlns="http://www.w3.org/2000/svg">
          <g style="fill:${
            (await getCar(el.id)).color
          }; stroke:black; stroke-width:5px">
          <path d="m498.542969 80.964844c-28.695313-20.128906-69.269531-24.351563-98.253907-24.351563h-6.351562l-101.007812-47.136719c-12.582032-5.875-26.574219-8.976562-40.457032-8.976562h-89.164062c-8.664063 0-17.09375 1.730469-25.058594 5.140625l-92.566406 39.671875c-5.082032 2.179688-10.460938 3.285156-15.992188 3.285156h-6.160156c-12.972656-.003906-23.53125 10.554688-23.53125 23.53125v50.914063c0 11.238281 8.007812 20.953125 19.039062 23.097656l29.679688 5.773437c3.667969 22.617188 23.324219 39.941407 46.957031 39.941407 17.679688 0 33.125-9.699219 41.328125-24.050781h254.023438c8.203125 14.351562 23.648437 24.050781 41.328125 24.050781 17.675781 0 33.125-9.699219 41.328125-24.050781h14.785156c12.972656 0 23.53125-10.554688 23.53125-23.53125v-37.441407c0-10.285156-5.03125-19.957031-13.457031-25.867187zm-211.957031-57.894532 71.882812 33.542969h-107.035156l-35.242188-41.113281h36.277344c11.710938 0 23.507812 2.617188 34.117188 7.570312zm-90.148438-7.570312 35.242188 41.113281h-12.714844c-4.835938 0-9.417969-2.105469-12.566406-5.78125l-30.285157-35.332031zm-53.960938 137.304688c.503907-2.769532.78125-5.617188.78125-8.53125 0-3.195313-.320312-6.394532-.953124-9.507813-.824219-4.058594-4.78125-6.679687-8.839844-5.859375-4.0625.824219-6.683594 4.785156-5.859375 8.84375.433593 2.128906.652343 4.324219.652343 6.523438 0 17.964843-14.617187 32.578124-32.582031 32.578124-17.964843 0-32.578125-14.613281-32.578125-32.578124 0-17.964844 14.613282-32.582032 32.578125-32.582032 4.550781 0 8.945313.917969 13.070313 2.726563 3.789062 1.660156 8.214844-.066407 9.878906-3.859375 1.664062-3.792969-.0625-8.214844-3.855469-9.878906-6.035156-2.644532-12.460937-3.988282-19.09375-3.988282-23.632812 0-43.289062 17.324219-46.957031 39.941406l-26.816406-5.214843c-4-.777344-6.90625-4.300781-6.90625-8.375v-27.382813h8.535156c4.140625 0 7.5-3.359375 7.5-7.5s-3.359375-7.5-7.5-7.5h-8.53125v-8.53125c0-4.707031 3.828125-8.53125 8.53125-8.53125h6.160156c7.574219 0 14.941406-1.515625 21.902344-4.496094l92.5625-39.671874c4.058594-1.738282 8.273438-2.890626 12.589844-3.476563l38.265625 44.640625c6 7.003906 14.730469 11.019531 23.953125 11.019531h181.324218c20.042969 0 55.804688 2.347657 82.300782 17.0625h-2.136719c-4.144531 0-7.5 3.359375-7.5 7.5 0 4.144531 3.355469 7.5 7.5 7.5h16.238281c.199219 1.03125.308594 2.085938.308594 3.15625v13.910157h-23.316406c-8.203125-14.351563-23.648438-24.046876-41.328125-24.046876-17.679688 0-33.125 9.695313-41.328125 24.046876h-14.78125c-4.144532 0-7.5 3.355468-7.5 7.5 0 4.140624 3.355468 7.5 7.5 7.5h9.308594c-.503907 2.769531-.78125 5.617187-.78125 8.53125 0 2.914062.277343 5.761718.78125 8.53125zm289.878907 24.046874c-17.964844 0-32.582031-14.613281-32.582031-32.578124 0-17.964844 14.617187-32.582032 32.582031-32.582032 17.964843 0 32.582031 14.617188 32.582031 32.582032 0 17.964843-14.617188 32.578124-32.582031 32.578124zm56.113281-24.046874h-9.3125c.503906-2.769532.78125-5.617188.78125-8.53125 0-2.914063-.277344-5.761719-.78125-8.53125h17.84375v8.53125c0 4.703124-3.828125 8.53125-8.53125 8.53125zm0 0"/><path d="m344.179688 120.742188h-100.460938l-16.988281-22.652344c-4.421875-5.894532-11.460938-9.414063-18.828125-9.414063h-32.0625c-2.84375 0-5.4375 1.605469-6.707032 4.148438-1.273437 2.539062-1 5.582031.707032 7.851562l19.238281 25.652344c4.417969 5.894531 11.457031 9.414063 18.824219 9.414063h136.277344c4.140624 0 7.5-3.359376 7.5-7.5 0-4.144532-3.359376-7.5-7.5-7.5zm-136.277344 0c-2.671875 0-5.222656-1.277344-6.824219-3.414063l-10.238281-13.652344h17.0625c2.671875 0 5.222656 1.277344 6.828125 3.414063l10.238281 13.652344zm0 0"/><path d="m95.675781 128.757812c-8.554687 0-15.515625 6.960938-15.515625 15.515626 0 8.554687 6.960938 15.515624 15.515625 15.515624 8.558594 0 15.515625-6.960937 15.515625-15.515624 0-8.554688-6.957031-15.515626-15.515625-15.515626zm0 0"/><path d="m432.355469 128.757812c-8.554688 0-15.515625 6.960938-15.515625 15.515626 0 8.554687 6.960937 15.515624 15.515625 15.515624 8.554687 0 15.515625-6.960937 15.515625-15.515624 0-8.554688-6.960938-15.515626-15.515625-15.515626zm0 0"/></g></svg></div>
          <div class="score-item">${(await getCar(el.id)).name}</div>
          <div class="score-item">${el.wins}</div>
          <div class="score-item">${el.time}</div>
        </div>
        `
        );
        listNumber += 1;
      }
      let winsName = 'Wins';
      let timeName = 'Best time (seconds)';
      if (winnersSort === 'wins' && winnersOrder === 'ASC') {
        winsName = 'Wins &#8595;';
      }
      if (winnersSort === 'wins' && winnersOrder === 'DESC') {
        winsName = 'Wins &#8593;';
      }
      if (winnersSort === 'time' && winnersOrder === 'ASC') {
        timeName = 'Best time (seconds) &#8595;';
      }
      if (winnersSort === 'time' && winnersOrder === 'DESC') {
        timeName = 'Best time (seconds) &#8593;';
      }
      this.winnersContainer.innerHTML = `
        <h2 class="title">Winners (${winnersCount})</h2>
        <h3 class="page">Page #${this.store.getWinnersPageNumber()}</h3>
        <div class="score-container">
          <div class="score-header">
            <div class="score-title">Number</div>
            <div class="score-title">Car</div>
            <div class="score-title">Name</div>
            <div class="score-title sort-wins">${winsName}</div>
            <div class="score-title sort-time">${timeName}</div>
          </div>
          <div class="score-main">
          ${scoreMain.innerHTML}
          </div>
        </div>
      `;
      this.winnersContainer
        .querySelector('.sort-wins')
        ?.addEventListener('click', (event) => {
          this.store.setWinnersSort('wins');
          if (winnersOrder === 'ASC') {
            this.store.setWinnersOrder('DESC');
          } else {
            this.store.setWinnersOrder('ASC');
          }
          event.target?.dispatchEvent(
            new Event('newWinners', { bubbles: true })
          );
        });
      this.winnersContainer
        .querySelector('.sort-time')
        ?.addEventListener('click', (event) => {
          this.store.setWinnersSort('time');
          if (winnersOrder === 'ASC') {
            this.store.setWinnersOrder('DESC');
          } else {
            this.store.setWinnersOrder('ASC');
          }
          event.target?.dispatchEvent(
            new Event('newWinners', { bubbles: true })
          );
        });
      this.pageControls.appendChild(this.btnPagePrev);
      this.pageControls.appendChild(this.btnPageNext);
      this.winnersContainer.appendChild(this.pageControls);
      return this.winnersContainer;
    };
    return constructWinners();
  }

  addBtnListeners(): void {
    this.btnPagePrev.addEventListener('click', () => {
      if (this.store.getWinnersPageNumber() > 1) {
        this.store.decWinnersPageNumber();
        this.btnPagePrev.dispatchEvent(
          new Event('newWinners', { bubbles: true })
        );
      }
    });
    this.btnPageNext.addEventListener('click', () => {
      this.store.incWinnersPageNumber();
      this.btnPageNext.dispatchEvent(
        new Event('newWinners', { bubbles: true })
      );
    });
    window.addEventListener('hashchange', () => {
      this.render();
    });
  }

  addVisibility(): void {
    this.winnersContainer.classList.remove('invisible');
    this.render();
  }

  removeVisibility(): void {
    this.winnersContainer.classList.add('invisible');
    this.render();
  }
}
