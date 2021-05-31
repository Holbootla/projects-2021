import SettingsService from './settings-service';

export default class Settings {
  pageTitle: string;

  settings: HTMLDivElement;

  constructor() {
    this.settings = document.createElement('div');
    this.pageTitle = 'Settings';
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
            <option value="16">4x4</option>
            <option value="36">6x6</option>
          </select>
        </div>
        <div class="setting-type">
          <div class="setting-title">Cards type</div>
          <select name="type" id="type">
            <option value="animal">Animals</option>
            <option value="food">Food</option>
          </select>
        </div>
      </form>
      <div class="submit-settings">Apply</div>
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
