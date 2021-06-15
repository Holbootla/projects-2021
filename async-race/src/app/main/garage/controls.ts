import { createCar, getCars, updateCar } from '../../api/api';
import Store from '../../store';
import GenerateCars from './generate-cars';

export default class Controls {
  controls: HTMLDivElement;

  actionBtns: HTMLDivElement;

  formCreate: HTMLFormElement;

  formUpdate: HTMLFormElement;

  title: HTMLElement;

  store: Store;

  generateCars: GenerateCars;

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
    this.store = Store.getInstance();
    this.generateCars = new GenerateCars();
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
    btnUpdate?.classList.add('btn_disabled');

    let nameCreateValue: string | undefined;
    let colorCreateValue = '#000000';
    let nameUpdateValue: string;
    let colorUpdateValue = '#000000';

    if (action === 'update') {
      document.addEventListener('updateSelect', () => {
        if (nameUpdate && colorUpdate) {
          nameUpdate.value = this.store.getSelectedCar().name;
          colorUpdate.value = this.store.getSelectedCar().color;
          nameUpdateValue = nameUpdate.value;
          colorUpdateValue = colorUpdate.value;
          btnUpdate?.classList.remove('btn_disabled');
        }
      });
    }

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
    btnCreate?.addEventListener('click', (event) => {
      if (nameCreateValue && colorCreateValue) {
        createCar({ name: nameCreateValue, color: colorCreateValue });
        if (nameCreate && colorCreate) {
          nameCreate.value = '';
          colorCreate.value = '#000000';
          nameCreateValue = '';
          colorCreateValue = '#000000';
        }
        this.getCarsCount();
        event.target?.dispatchEvent(new Event('created', { bubbles: true }));
      }
    });
    btnUpdate?.addEventListener('click', (event) => {
      const carId = this.store.getSelectedCar()?.id;
      if (carId) {
        updateCar(carId, { name: nameUpdateValue, color: colorUpdateValue });
      }
      if (nameUpdate && colorUpdate) {
        nameUpdate.value = '';
        colorUpdate.value = '#000000';
        nameUpdateValue = nameUpdate.value;
        colorUpdateValue = colorUpdate.value;
        btnUpdate?.classList.add('btn_disabled');
      }
      event.target?.dispatchEvent(new Event('updated', { bubbles: true }));
    });

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
      document.dispatchEvent(new Event('race', { bubbles: true }));
      btnRace?.classList.add('btn_disabled');
      this.store.setIsRace(true);
    });

    const btnReset = this.actionBtns.querySelector('.btn-reset');
    btnReset?.addEventListener('click', () => {
      document.dispatchEvent(new Event('reset', { bubbles: true }));
      btnRace?.classList.remove('btn_disabled');
    });

    const btnGenerate = this.actionBtns.querySelector('.btn-generate');
    btnGenerate?.addEventListener('click', (event) => {
      this.generateCars.generateCars();
      event.target?.dispatchEvent(new Event('generated', { bubbles: true }));
      this.getCarsCount();
    });

    return this.actionBtns;
  }

  getCarsCount(): void {
    (async () => {
      const { carsCount } = await getCars();
      this.title.innerText = `Garage (${carsCount})`;
    })();
  }

  render(): HTMLDivElement {
    this.controls.insertAdjacentElement('beforeend', this.createForm('create'));
    this.controls.insertAdjacentElement('beforeend', this.createForm('update'));
    this.controls.insertAdjacentElement('beforeend', this.createActionBtns());
    this.getCarsCount();
    this.controls.appendChild(this.title);
    document.addEventListener('removed', () => {
      this.getCarsCount();
    });
    return this.controls;
  }
}
