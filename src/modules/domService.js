import PubSub from 'pubsub-js';

// const iconClick = 'false';



function toggle() {
  console.log('working');
//   if (iconClick === 'false') {
//     mainContent.style.gridColumn = '1/3';
//     sideBar.style.gridColumn = '';
//     sideBar.style.transform = 'translate(-110%,0%)';
//     iconClick = 'true';
//   } else if (iconClick === 'true') {
//     mainContent.style.gridColumn = '2/3';
//     sideBar.style.gridColumn = '1/2';
//     sideBar.style.transform = 'translate(0%,0%)';
//     iconClick = 'false';
//   }
}

PubSub.subscribe("ToggleMenuClicked", toggle);
