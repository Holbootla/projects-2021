import './style.scss';
import App from './app/app';
import About from './app/components/pages/about/about';

const currentPage = new About();

const app = new App(currentPage.render(), currentPage.getPageTitle());

app.render();

const btn: Element | null = document.querySelector('.nav__item');

btn?.addEventListener('click', () => {
  app.clearBoard();
  app.render();
});
