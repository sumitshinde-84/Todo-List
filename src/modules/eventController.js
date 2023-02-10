import PubSub, { publish } from 'pubsub-js';
import {
    list
 } from "./domCollection";

const menuIcon = document.querySelector('.menuImg');
menuIcon.addEventListener('click', ()=>{
    PubSub.publish("ToggleMenuClicked");
  });

for(let i = 0; i<list.length;i++)
 list[i].addEventListener('click', (event) => {
// Publish the "buttonClicked" event with some data
 PubSub.publish('buttonClicked', { target: event.target });
});
          

       
      
    



 



