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
 PubSub.publish('mainMenuOptionClicked', { target: event.target });
});}

projectBtn.addEventListener('click',()=>{
  addProjectBtn.style.display='block'
  updateProjectBtn.style.display='none'
  PubSub.publish('clickAddProjectButton')
})

PubSub.subscribe('projectRenameFunctionHasBeenRun',(eventName,project)=>{

  updateProjectBtn.addEventListener('click',(event)=>{
   
    event.preventDefault()
    console.log('i am eventController')
      PubSub.publish('projectRenameUpdateButtonClicked',project)
     PubSub.publish('ObjNameChange',project)
  
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
    
    PubSub.publish('projectSelected',{ target: e.target })

   
})

}


       
      
    



 



