export default class TopButton {
  topButton: HTMLElement;

  topButtonText: string | null;

  constructor(topButtonText: string) {
    this.topButton = document.createElement('div');
    this.topButtonText = topButtonText;
  }

  render(): HTMLElement {
    this.topButton.textContent = this.topButtonText;
    this.topButton.classList.add('top-btn');
    return this.topButton;
  }
}
