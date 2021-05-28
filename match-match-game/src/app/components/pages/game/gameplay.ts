export default class Gameplay {
  cards: NodeListOf<Element>;

  constructor() {
    this.cards = document.querySelectorAll('.card');
  }

  flipAll(): void {
    this.cards?.forEach((element) => {
      element.classList.toggle('card_active');
    });
  }

  flip(): void {
    this.cards?.forEach((element) => {
      element.addEventListener('click', () => {
        if (element.classList.contains('card')) {
          element.classList.toggle('card_active');
        }
      });
    });
  }
}
