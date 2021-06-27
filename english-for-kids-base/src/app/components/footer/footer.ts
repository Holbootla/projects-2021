export default class Footer {
  footer: HTMLElement;

  constructor() {
    this.footer = document.createElement('footer');
    this.footer.innerHTML = `
      <a class="github" href="https://github.com/Holbootla" target="blank"><img src="GitHubLogo.png" alt="GitHub logo"></a>
      <div class="year">
        2021
      </div>
      <a class="rsschool" href="https://rs.school/js/" target="blank"><img src="RSSchoolLogo.png" alt="RSSchool logo"></a>
    `;
  }

  getFooter(): HTMLElement {
    return this.footer;
  }
}
