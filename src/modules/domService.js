import PubSub, { publish } from 'pubsub-js';
import {
     mainContent, sideBar,projectInput,projectForm,projectUl,projectTitle,projectRename,addProjectBtn
  } from "./domCollection";

  
  let iconClick = 'false';
  let count =0;
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
project.innerHTML=`<p id="p${count}">${projectInput.value}</p> <select id="${count}"  value=none>
<option  style="background-color;border-radius:2px;position:relative;bottom:20px;outline:none;"class='project-rename' value='rename' >Rename</option>
<option style='display:none;' value='nothing' selected>Rename</option>
<option style="background-color;border-radius:2px;position:relative;bottom:20px;outline:none;" class='project-delete' value='delete'>Delete</option></select>`
projectUl.appendChild(project)
projectForm.style.display='none'
count++; 
PubSub.publish('addProjectFunctionHasbeenRun',project)

}

// ---------------------------------it will fetch projectName on header----------------------------

PubSub.subscribe('foundTargetedObj',(eventName,myObject)=>{
  
  projectTitle.textContent=myObject.name
}
)

function updateProjectName(eventName,targetProjectId){

  console.log(targetProjectId)
  const project = projectUl.querySelector(`#list${targetProjectId}`);  
  project.firstChild.textContent=projectInput.value
  console.log(project)
  PubSub.publish('projectTextcontentHasBeenRenamed',targetProjectId)

}

 
 


PubSub.subscribe("ToggleMenuClicked",toggle)
PubSub.subscribe('clickAddProjectButton',openForm)
PubSub.subscribe('addProject',addProject)
PubSub.subscribe('closeForm',closeForm)
PubSub.subscribe('openForm',openForm)
PubSub.subscribe('projectUpdateBtnClicked',updateProjectName)


