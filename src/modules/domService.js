import PubSub, { publish } from 'pubsub-js';
import {
     mainContent, sideBar,projectInput,projectForm,projectUl,
     projectTitle,projectRename,addProjectBtn,taskForm,taskNameInput
     ,taskDetailInput,taskDateInput,taskList, taskListSect,taskMainDiv, addTaskButton, taskAddbutton, taskUpdateBtn
  } from "./domCollection";
import { Projects } from './projectStructerer';
import { task } from './task';

  
  let iconClick = 'false';
  let count =0;
 
  let checkboxStatus = 'false'
// -------------------------this function is used for toggle menu--------------------
function toggle() {
  if (iconClick === 'false') {
    mainContent.style.gridColumn = '1/3';
    sideBar.style.gridColumn = '';
    sideBar.style.transform = 'translate(-110%,0%)';
    iconClick = 'true';
  } else if (iconClick === 'true') {
    mainContent.style.gridColumn = '2/3';
    sideBar.style.gridColumn = '1/2';
    sideBar.style.transform = 'translate(0%,0%)';
    iconClick = 'false';
  }
}
// ---------------------this function is to add click animation in list items --------------------------------

PubSub.subscribe('mainMenuOptionClicked', (eventname,data) => { 
    let targetedlist = data.target
    targetedlist.className = 'antherClassForUl'
    projectTitle.textContent=targetedlist.textContent 
    const getSiblings = function (e) {
        // for collecting siblings
        const siblings = []; 
        // if no parent, return no sibling
        if(!e.parentNode) {
            return siblings;
        }
        // first child of the parent node
        let sibling  = e.parentNode.firstChild; 
        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };
    let siblings = getSiblings(data.target);
    for (const iterator of siblings) {
       iterator.removeAttribute('class')
       iterator.className='antherClassForUlOff'
    }
        
  });

// ---------------------------function for open project detail form ---------------------------------------------
function openForm(){
projectForm.style.display='grid'
projectForm.reset()

}

// ---------------------------function for close project detail form ---------------------------------------------


function closeForm(){
  projectForm.style.display='none' 
  
}

// ---------------------------function for add project in project-list detail form ---------------------------------------------


function addProject(){

const project = document.createElement('li')
project.setAttribute('ondblclick','ProjectEventlistner(event)')
project.className='list'
project.id=`list${count}`
project.innerHTML=`<p class="para" id="p${count}">${projectInput.value}</p> <select id="${count}"  value=none>
<option  style="background-color;border-radius:2px;position:relative;bottom:20px;outline:none;"class='project-rename' value='rename' >Rename</option>
<option style='display:none;' value='nothing' selected>Rename</option>
<option style="background-color;border-radius:2px;position:relative;bottom:20px;outline:none;" class='project-delete' value='delete'>Delete</option></select>`
projectUl.appendChild(project)
projectForm.style.display='none'
count++; 
PubSub.publish('addProjectFunctionHasbeenRun',project)

}

// ---------------------------------it will fetch projectName on header----------------------------



function updateProjectName(eventName,targetProjectId){

  console.log(targetProjectId)
  const project = projectUl.querySelector(`#list${targetProjectId}`);  
  project.firstChild.textContent=projectInput.value
  console.log(project)
  PubSub.publish('projectTextcontentHasBeenRenamed',targetProjectId)

}


function showProjectDetails(eventName,targetedElement){
  // if(targetedElement.nodeType)
  console.log(targetedElement)
  if(targetedElement.className =='list'){
    projectTitle.textContent=targetedElement.firstChild.textContent
  }else if(targetedElement.className =='para'){
    projectTitle.textContent=targetedElement.textContent
  }else{
    return
  }
  
}


//  --------------------------  function for open & closeform Task form ---------------------------------
 
function openTaskForm(){
  taskForm.style.scale='1'
  taskForm.style.height='250px'
}

function closeTaskForm(){
  taskForm.style.scale='0'
  taskForm.style.height='0px'
}

//  --------------------------  function create Task list as dom element ---------------------------------


function createTaskDom(eventName,project){
  const taskList = document.createElement('li')
  taskList.setAttribute('ondblclick','taskListEventListnerFunction(event)')
  const statusCheckbox = document.createElement('div')
  statusCheckbox.className='status'
  statusCheckbox.id=`status${project.taskcount}`
  statusCheckbox.setAttribute('onClick','statusInputEventListnerFunction(event)')
  const threeDot = document.createElement('div')
  threeDot.className='threeDot'
  taskList.id = `taskList${project.taskcount}`
  taskList.className='task-list-item'
  const blockForNameAndDetails = document.createElement('div')
  const blockForDateAndRestThing = document.createElement('div')
  const namePara = document.createElement('p')
  namePara.className='namePara'
  const dateBox = document.createElement('div')
  dateBox.className='dateBox'
  const datePara = document.createElement('p')
  const detailPara = document.createElement('p')
  detailPara.className='detailPara'
  detailPara.textContent = taskDetailInput.value
  namePara.textContent = taskNameInput.value
  datePara.textContent = taskDateInput.value
  blockForNameAndDetails.appendChild(namePara)
  blockForNameAndDetails.appendChild(detailPara)
  blockForDateAndRestThing.appendChild(dateBox)
  dateBox.appendChild(datePara)
  taskList.appendChild(statusCheckbox)
  taskList.appendChild(blockForNameAndDetails)
  taskList.appendChild(blockForDateAndRestThing)
  taskList.appendChild(threeDot);
  project.block.appendChild(taskList)
  taskMainDiv.appendChild(project.block)
  project.taskcount++
  PubSub.publish('taskCancleButtonClicked')

}


//  --------------------------  function to clear mainTaskDiv when user click on project ---------------------------------


function clearTaskMainBlock(eventName,targetedProject){
  while (taskMainDiv.firstChild) {
    taskMainDiv.removeChild(taskMainDiv.firstChild);
    
}
PubSub.publish('taskMainDivCleared',targetedProject)  // after clearing taskmaindiv it will call publish a function which finds targeted project and add ul block to maintask dib

}


//  --------------------------  function which finds targeted project and append block to taskmainidiv ---------------------------------

function addTargetedProjectListToTaskMainDiv(eventName,targetedProject){

  for (const project of Projects) {
    if(project.dataIndex == targetedProject.id[targetedProject.id.length - 1]){
      taskMainDiv.appendChild(project.block)
    }
    
  }

}

function letsChangeCheckbox(eventName,checkbox){
   let targetedProject = taskAddbutton.id;
   let targetedCheckBoxId = checkbox.id[checkbox.id.length - 1]

   console.log(targetedProject)

   for(let i =0;i<Projects[targetedProject].task.length;i++){
      if(Projects[targetedProject].task[i].dataIndex == targetedCheckBoxId){
        console.log(Projects[targetedProject])
     let  targetedTask = Projects[targetedProject].task[i]
     
     if(targetedTask.status=='false'){
      checkbox.style.backgroundColor='#2abd67'
      targetedTask.status='true'
      checkbox.style.border='#2abd67'
      checkbox.nextSibling.firstChild.style='font-family: strikeout;'
    }else{
      checkbox.style.backgroundColor='#fefcfe'
      checkbox.style.border='2px solid #374958'
      targetedTask.status='false'
      checkbox.nextSibling.firstChild.style='font-family:monoBold'
      
    }
      }
    
   }

  
   
  
}


function updateTaskDetails(eventName,taskUpdateBtnCurrentId){
  const task = document.querySelector(`#taskList${taskUpdateBtnCurrentId}`)
  const namePara =task.querySelector('.namePara')
  const detailPara = task.querySelector('.detailPara')
  const datePara = document.querySelector('.dateBox')
  namePara.textContent = taskNameInput.value
  detailPara.textContent = taskDetailInput.value
  datePara.textContent = taskDateInput.value
  taskUpdateBtn.style.display='none'
  taskAddbutton.style.display='block'
    
  }


PubSub.subscribe("ToggleMenuClicked",toggle)
PubSub.subscribe('clickAddProjectButton',openForm)
PubSub.subscribe('addProject',addProject)
PubSub.subscribe('closeForm',closeForm)
PubSub.subscribe('openForm',openForm)
PubSub.subscribe('projectUpdateBtnClicked',updateProjectName)
PubSub.subscribe('targetedListClicked',showProjectDetails);
PubSub.subscribe('addTaskButtonClicked',openTaskForm)
PubSub.subscribe('taskCancleButtonClicked',closeTaskForm)
PubSub.subscribe('targetedListClicked',clearTaskMainBlock)
PubSub.subscribe('taskObjCreated',createTaskDom)
PubSub.subscribe('taskMainDivCleared',addTargetedProjectListToTaskMainDiv )
PubSub.subscribe('checkBoxClicked',letsChangeCheckbox)
PubSub.subscribe('openTaskForm',openTaskForm)
PubSub.subscribe('taskUpdateClicked',updateTaskDetails)
PubSub.subscribe('mainListClicked',clearTaskMainBlock)