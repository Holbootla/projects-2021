import SettingsService from './settings-service';

export default class Settings {
  pageTitle: string;

  settings: HTMLDivElement;

  currentSize: string | null;

  currentType: string | null;

  constructor() {
    this.settings = document.createElement('div');
    this.pageTitle = 'Settings';
    this.currentSize = localStorage.getItem('size');
    this.currentType = localStorage.getItem('type');
  }

  render(): HTMLElement {
    this.settings.classList.add('settings-container');
    this.settings.insertAdjacentHTML(
      'beforeend',
      `
      <form name="settings">
        <div class="setting-size">
          <div class="setting-title">Game size</div>
          <select name="size" id="size">
            <option value="${this.currentSize === '16' ? 16 : 36}">${
        this.currentSize === '16' ? '4x4' : '6x6'
      }</option>
            <option value="${this.currentSize === '16' ? 36 : 16}">${
        this.currentSize === '16' ? '6x6' : '4x4'
      }</option>
          </select>
        </div>
        <div class="setting-type">
          <div class="setting-title">Cards type</div>
          <select name="type" id="type">
            <option value="${
              this.currentType === 'animal' ? 'animal' : 'food'
            }">${this.currentType === 'animal' ? 'Animals' : 'Food'}</option>
            <option value="${
              this.currentType === 'animal' ? 'food' : 'animal'
            }">${this.currentType === 'animal' ? 'Food' : 'Animals'}</option>
          </select>
        </div>
      </form>
      `
    );
    setTimeout(() => {
      new SettingsService().set();
    }, 100);
    return this.settings;
  }

  getPageTitle(): string {
    return this.pageTitle;
  }
}
