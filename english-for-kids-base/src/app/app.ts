import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import gameProcess from './game-process';
import State from './state';

export default class App {
  header: Header;

  main: Main;

  footer: Footer;

  state: State;

  constructor() {
    this.state = State.getInstance();
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
    document.addEventListener('restart', () => {
      this.refresh();
      this.state.resetAnswers();
    });
  }

  render(): void {
    document.body.appendChild(this.header.getHeader());
    document.body.appendChild(this.main.getMain());
    document.body.appendChild(this.footer.getFooter());
    gameProcess();
  }

  refresh(): void {
    document.body.removeChild(this.header.getHeader());
    document.body.removeChild(this.main.getMain());
    document.body.removeChild(this.footer.getFooter());
    document.body.innerHTML = '';
    document.body.appendChild(this.header.getHeader());
    document.body.appendChild(this.main.getMain());
    document.body.appendChild(this.footer.getFooter());
  }
}
