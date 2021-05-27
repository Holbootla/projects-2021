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
      <div class="setting-size">
        <div class="setting-title">Game size</div>
        <select name="size" id="size">
          <option value="12">4x3</option>
          <option value="16">4x4</option>
        </select>
      </div>
      <div class="setting-type">
        <div class="setting-title">Cards type</div>
        <select name="type" id="type">
          <option value="animal">Animals</option>
          <option value="figure">Figures</option>
        </select>
      </div>
      <div class="submit-settings">Apply</div>
      `
    );
    return this.settings;
  }

  getPageTitle(): string {
    return this.pageTitle;
  }
}
