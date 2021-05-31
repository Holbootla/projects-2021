export default class Register {
  main: HTMLBodyElement | null;

  constructor() {
    this.main = document.querySelector('.main');
  }

  render(): void {
    this.main?.insertAdjacentHTML(
      'beforeend',
      `
      <div class="register-container">
        <h2 class="board__title">Register new score</h2>
        <div class="input-container">
          <input type="text" name="FirstName" id="FirstName" placeholder="First name" required pattern="[A-Za-z0-9]{1,32}">
          <input type="text" name="LastName" id="LastName" placeholder="Last name" required pattern="[A-Za-z0-9]{1,32}">
          <input type="email" name="Email" id="Email" placeholder="Email" required>
        </div>
        <div class="btn">Submit</div>
        <div class="btn">Cancel</div>
      </div>
      `
    );
  }
}
