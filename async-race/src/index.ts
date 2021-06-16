import App from './app/app';
import './style.scss';

const app = new App();
app.render();

let hash = window.location.hash.slice(1);

if (hash === 'winners') {
  app.addWinnersVisibility();
} else if (hash === 'garage' || hash === '') {
  app.addGarageVisibility();
}

window.addEventListener('hashchange', () => {
  hash = window.location.hash.slice(1);
  if (hash === 'winners') {
    app.addWinnersVisibility();
  } else if (hash === 'garage' || hash === '') {
    app.addGarageVisibility();
  }
});
