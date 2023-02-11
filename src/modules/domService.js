import PubSub from 'pubsub-js';
import {
     mainContent, sideBar,projectInput,projectForm,projectUl,projectTitle
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

PubSub.subscribe('buttonClicked', (eventname,data) => { 
    let targetedlist = data.target
    targetedlist.className = 'antherClassForUl'
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

}

function closeForm(){
  projectForm.style.display='none' 
  projectForm.reset()
}

function addProject(){

const projectList = document.createElement('li')
projectList.dataset.index=count
projectList.innerHTML=
`<p>${projectInput.value}</p> 
<select>
<option>Rename</option>
<option>Delete</option>
</select>`
projectUl.appendChild(projectList)
projectForm.style.display='none'
count++;
}

// ---------------------------------it will fetch projectName on header----------------------------

PubSub.subscribe('foundTargetedObj',(eventName,myObject)=>[
  projectTitle.textContent=myObject.name

])


PubSub.subscribe("ToggleMenuClicked",toggle)
PubSub.subscribe('clickAddProject',openForm)
PubSub.subscribe('addProject',addProject)
PubSub.subscribe('closeForm',closeForm)