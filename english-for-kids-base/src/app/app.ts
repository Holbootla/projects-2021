import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

export default class App {
  header: Header;

  main: Main;

  footer: Footer;

  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  render(): void {
    document.body.appendChild(this.header.getHeader());
    document.body.appendChild(this.main.getMain());
    document.body.appendChild(this.footer.getFooter());
  }
}
