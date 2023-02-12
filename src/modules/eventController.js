import PubSub from 'pubsub-js';
import {
    list,projectBtn,addProjectBtn,cancleProjectBtn,secondList,projectRename, projectForm,updateProjectBtn
 } from "./domCollection";

const menuIcon = document.querySelector('.menuImg');
menuIcon.addEventListener('click', ()=>{
    PubSub.publish("ToggleMenuClicked");
  });

for(let i = 0; i<list.length;i++){
 list[i].addEventListener('click', (event) => {
// Publish the "buttonClicked" event with some data
 PubSub.publish('buttonClicked', { target: event.target });
});}

projectBtn.addEventListener('click',()=>{
  addProjectBtn.style.display='block'
  updateProjectBtn.style.display='none'
  PubSub.publish('clickAddProject')
})

PubSub.subscribe('prrenameClicked',(eventName,projectName)=>{

  updateProjectBtn.addEventListener('click',(event)=>{
   
    event.preventDefault()
    console.log('i am eventController')
    PubSub.subscribe('prrenameClicked',(eventName,projectName)=>{
      PubSub.publish('updateClicked',projectName)
    })
  
  })

})

addProjectBtn.addEventListener('click',(event)=>{
  event.preventDefault()
  PubSub.publish('addProject')

})
       

cancleProjectBtn.addEventListener('click',(event)=>{
  event.preventDefault()
  PubSub.publish('closeForm')
})


for(let i=0; i<secondList.length;i++){

  secondList[i].addEventListener('click',(e)=>{
    
    PubSub.publish('projectRenameClicked',{ target: e.target })

   
})

}


       
      
    



 



