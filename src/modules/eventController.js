import PubSub from 'pubsub-js';

import {
  menuIcon, mainContent, sideBar, list, check,
} from '../domCollection';

menuIcon.addEventListener('click', () => {
    PubSub.publish('menu icon clicked');

});
