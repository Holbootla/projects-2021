export default class SettingsService {
  settings: { size: number; type: string };

  settingSize: HTMLSelectElement | null;

  settingType: HTMLSelectElement | null;

  constructor() {
    this.settingSize = document.querySelector('#size');
    this.settingType = document.querySelector('#type');
    this.settings = { size: 16, type: 'animal' };
  }

  set(): void {
    this.settingSize?.addEventListener('change', () => {
      this.settings.size = Number(
        this.settingSize?.options[this.settingSize.selectedIndex].value
      );
      localStorage.setItem('size', `${this.settings.size}`);
    });
    this.settingType?.addEventListener('change', () => {
      this.settings.type =
        this.settingType?.options[this.settingType.selectedIndex].value || '';
      localStorage.setItem('type', `${this.settings.type}`);
    });
  }
}
