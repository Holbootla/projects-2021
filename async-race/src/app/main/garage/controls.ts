import { createCar, getCars } from '../../api/api';

export default class Controls {
  controls: HTMLDivElement;

  actionBtns: HTMLDivElement;

  formCreate: HTMLFormElement;

  formUpdate: HTMLFormElement;

  title: HTMLElement;

  constructor() {
    this.controls = document.createElement('div');
    this.controls.classList.add('controls');
    this.formCreate = document.createElement('form');
    this.formCreate.classList.add(`create-car`);
    this.formUpdate = document.createElement('form');
    this.formUpdate.classList.add(`update-car`);
    this.actionBtns = document.createElement('div');
    this.actionBtns.classList.add('action-btns');
    this.title = document.createElement('h2');
    this.title.classList.add('title');
  }

  createForm(action: 'create' | 'update'): HTMLFormElement {
    this.formCreate.innerHTML = `
        <input type="text" name="name" id="name-create" minlength="1" maxlength="35">
        <input type="color" name="color" id="color-create">
        <div class="btn btn-create">Create</div>
    `;

    this.formUpdate.innerHTML = `
        <input type="text" name="name" id="name-update" minlength="1" maxlength="35">
        <input type="color" name="color" id="color-update">
        <div class="btn btn-update">Update</div>
    `;

    const nameCreate: HTMLInputElement | null =
      this.formCreate.querySelector('input[type=text]');
    const colorCreate: HTMLInputElement | null =
      this.formCreate.querySelector('input[type=color]');
    const nameUpdate: HTMLInputElement | null =
      this.formUpdate.querySelector('input[type=text]');
    const colorUpdate: HTMLInputElement | null =
      this.formUpdate.querySelector('input[type=color]');
    const btnCreate: HTMLDivElement | null =
      this.formCreate.querySelector('.btn-create');
    const btnUpdate: HTMLDivElement | null =
      this.formUpdate.querySelector('.btn-update');

    let nameCreateValue: string;
    let colorCreateValue = '#000000';
    let nameUpdateValue: string;
    let colorUpdateValue = '#000000';

    nameCreate?.addEventListener('change', () => {
      nameCreateValue = nameCreate.value;
    });
    colorCreate?.addEventListener('change', () => {
      colorCreateValue = colorCreate.value;
    });
    nameUpdate?.addEventListener('change', () => {
      nameUpdateValue = nameUpdate.value;
    });
    colorUpdate?.addEventListener('change', () => {
      colorUpdateValue = colorUpdate.value;
    });
    btnCreate?.addEventListener('click', () => {
      if (nameCreateValue && colorCreateValue) {
        createCar({ name: nameCreateValue, color: colorCreateValue });
        if (nameCreate && colorCreate) {
          nameCreate.value = '';
          colorCreate.value = '#000000';
        }
        this.render();
      }
    });
    btnUpdate?.addEventListener('click', () => {});

    if (action === 'create') {
      return this.formCreate;
    }
    return this.formUpdate;
  }

  createActionBtns(): HTMLDivElement {
    this.actionBtns.innerHTML = `
      <div class="btn btn-race">Race!</div>
      <div class="btn btn-reset">Reset</div>
      <div class="btn btn-generate">Generate cars</div>
    `;

    const btnRace = this.actionBtns.querySelector('.btn-race');
    btnRace?.addEventListener('click', () => {
      console.log('1');
    });

    const btnReset = this.actionBtns.querySelector('.btn-reset');
    btnReset?.addEventListener('click', () => {
      console.log('2');
    });

    const btnGenerate = this.actionBtns.querySelector('.btn-generate');
    btnGenerate?.addEventListener('click', () => {
      console.log('3');
    });

    return this.actionBtns;
  }

  render(): HTMLDivElement {
    this.controls.insertAdjacentElement('beforeend', this.createForm('create'));
    this.controls.insertAdjacentElement('beforeend', this.createForm('update'));
    this.controls.insertAdjacentElement('beforeend', this.createActionBtns());
    (async () => {
      const { carsCount } = await getCars();
      this.title.innerText = `Garage (${carsCount})`;
    })();
    this.controls.appendChild(this.title);
    return this.controls;
  }
}
