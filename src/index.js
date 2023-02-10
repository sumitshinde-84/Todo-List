import './styles/main.css';
import './styles/varriables.css';
import './styles/header.css';
import './styles/sidebar.css';
import './styles/mainContent.css';
import './styles/footer.css';
import PubSub from 'pubsub-js';



const menuIcon = document.querySelector('.menuImg');
  
  menuIcon.addEventListener('click', () => {
    PubSub.publish('ToggleMenuClicked');
  });