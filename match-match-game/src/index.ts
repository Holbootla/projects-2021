import './style.scss';
import App from './app/app';
import About from './app/components/pages/about/about';

const currentPage = new About();

new App(currentPage.render(), currentPage.getPageTitle()).render();
