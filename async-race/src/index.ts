import App from './app/app';
import './style.scss';

const app = new App();
app.render();

window.addEventListener('hashchange', () => {
  app.toggleVisibility();
});
