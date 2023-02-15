import PubSub from 'pubsub-js';
import {
    list,projectBtn,addProjectBtn,cancleProjectBtn,secondList,projectRename, projectForm,updateProjectBtn, projectUl, addTaskButton
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




addProjectBtn.addEventListener('click',(event)=>{
  event.preventDefault()
  PubSub.publish('addProject')

})
       

cancleProjectBtn.addEventListener('click',(event)=>{

  event.preventDefault()
  PubSub.publish('closeForm')
  
})



updateProjectBtn.addEventListener('click',(Event)=>{
  Event.preventDefault()
  let updateBtnCurrentId = updateProjectBtn.id
  PubSub.publish('projectUpdateBtnClicked',updateBtnCurrentId)
})


projectUl.addEventListener('click',(event)=>{
let targetedElement = event.target
PubSub.publish('targetedListClicked',targetedElement)
 
})   
      

addTaskButton.addEventListener('click',(Event)=>{

  PubSub.publish('addTaskButtonClicked')
})

 



