export default class Logo {
  logo: HTMLElement;

  constructor() {
    this.logo = document.createElement('div');
  }

  render(): HTMLElement {
    this.logo.insertAdjacentHTML(
      'beforeend',
      `
      <div class="logo__top">Match</div>
      <div class="logo__bottom">Match</div>
      `
    );
    this.logo.classList.add('logo');
    return this.logo;
  }
}
