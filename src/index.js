import PubSub from 'pubsub-js';
import './styles/main.css';
import './styles/varriables.css';
import './styles/header.css';
import './styles/sidebar.css';
import './styles/mainContent.css';
import './styles/footer.css';
import { toggle } from './modules/domService';
const menuIcon = document.querySelector('.menuImg');

menuIcon.addEventListener('click', () => {
    console.log('hellow')
  PubSub.publish('ToggleMenuClicked');
});

