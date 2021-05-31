export default class SettingsService {
  settings: { size: number; type: string };

  settingSize: HTMLSelectElement | null;

  settingType: HTMLSelectElement | null;

  constructor() {
    this.settingSize = document.querySelector('#size');
    this.settingType = document.querySelector('#type');
    this.settings = { size: 16, type: 'animal' };
  }

  get(): { size: number; type: string } {
    return this.settings;
  }

  set(): void {
    this.settingSize?.addEventListener('change', () => {
      this.settings.size = Number(
        this.settingSize?.options[this.settingSize.selectedIndex].value
      );
    });
    this.settingType?.addEventListener('change', () => {
      this.settings.type =
        this.settingType?.options[this.settingType.selectedIndex].value || '';
    });
  }
}
