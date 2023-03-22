
import PubSub, { publish } from 'pubsub-js';
import {
  mainContent,
  sideBar,
  projectInput,
  projectForm,
  projectUl,
  projectTitle,
  taskForm,
  taskNameInput,
  taskDetailInput,
  taskDateInput,
  taskMainDiv,
  addTaskButton,
  taskAddbutton,
  taskUpdateBtn,
} from './domCollection';
import project from './project';
import { Projects } from './projectStructerer';


let count = 1;
export const block = document.createElement('ul');
block.className = 'task-list';
const next7DaysUl = document.createElement('ul');
next7DaysUl.className = 'task-list';

// -------------------------this function is used for toggle menu--------------------
function toggle() {
  if (iconClick === 'false' || iconClick === undefined) {
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

PubSub.subscribe('mainMenuOptionClicked', (eventname, data) => {
  let targetedlist = data.target;
  targetedlist.className = 'antherClassForUl';
  projectTitle.textContent = targetedlist.textContent;
  const getSiblings = function (e) {
    // for collecting siblings
    const siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;
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
    iterator.removeAttribute('class');
    iterator.className = 'antherClassForUlOff';
  }
});

// ---------------------------function for open project detail form ---------------------------------------------
function openForm() {
  projectForm.style.display = 'grid';
  projectForm.reset();
}

// ---------------------------function for close project detail form ---------------------------------------------

function closeForm() {
  projectForm.style.display = 'none';
}

// ---------------------------function for add project in project-list detail form ---------------------------------------------

function addProject() {
  const project = document.createElement('li');
  project.setAttribute('ondblclick', 'ProjectEventlistner(event)');
  project.className = 'list';
  project.id = `list${count}`;
  project.innerHTML = `<p class="para" id="p${count}">${projectInput.value}</p> <select id="${count}"  value=none>
<option  style="background-color;border-radius:2px;position:relative;bottom:20px;outline:none;"class='project-rename' value='rename' >Rename</option>
<option style='display:none;' value='nothing' selected>Rename</option>
<option style="background-color;border-radius:2px;position:relative;bottom:20px;outline:none;" class='project-delete' value='delete'>Delete</option></select>`;
  projectUl.appendChild(project);
  PubSub.publish('letsStoreProjectListItem',projectUl.innerHTML)  // lets store project list dom to ls
  projectForm.style.display = 'none';
  count++;
 
}

// ---------------------------------it will fetch projectName on header----------------------------

function updateProjectName(eventName, targetProjectId) {
  console.log(targetProjectId);
  const project = projectUl.querySelector(`#list${targetProjectId}`);
  project.firstChild.textContent = projectInput.value;
  console.log(project);
  PubSub.publish('projectTextcontentHasBeenRenamed', targetProjectId);
}

function showProjectDetails(eventName, targetedElement) {
  // if(targetedElement.nodeType)
  console.log(targetedElement);
  if (targetedElement.className == 'list') {
    projectTitle.textContent = targetedElement.firstChild.textContent;
  } else if (targetedElement.className == 'para') {
    projectTitle.textContent = targetedElement.textContent;
  } else {
    return;
  }
}

//  --------------------------  function for open & closeform Task form ---------------------------------

function openTaskForm() {
  taskForm.style.scale = '1';
  taskForm.style.height = '250px';
}

function closeTaskForm() {
  taskForm.style.scale = '0';
  taskForm.style.height = '0px';
  taskUpdateBtn.style.display = 'none';
  taskAddbutton.style.display = 'block';
}

//  --------------------------  function create Task list as dom element ---------------------------------

function createTaskDom(eventName, project) {
  const taskList = document.createElement('li');
  taskList.setAttribute('ondblclick', 'taskListEventListnerFunction(event)');
  const statusCheckbox = document.createElement('div');
  statusCheckbox.dataset.ProjectId = project.dataIndex;
  statusCheckbox.className = 'status';
  statusCheckbox.id = `status${project.taskcount}`;
  statusCheckbox.setAttribute(
    'onClick',
    'statusInputEventListnerFunction(event)'
  );
  const threeDot = document.createElement('div');
  threeDot.className = 'threeDot';
  taskList.id = `taskList${project.taskcount}`;
  taskList.className = 'task-list-item';
  const blockForNameAndDetails = document.createElement('div');
  const blockForDateAndRestThing = document.createElement('div');
  const namePara = document.createElement('p');
  namePara.className = 'namePara';
  const dateBox = document.createElement('div');
  dateBox.className = 'dateBox';
  const datePara = document.createElement('p');
  const detailPara = document.createElement('p');
  detailPara.className = 'detailPara';
  detailPara.textContent = taskDetailInput.value;
  namePara.textContent = taskNameInput.value;
  datePara.textContent = taskDateInput.value;
  blockForNameAndDetails.appendChild(namePara);
  blockForNameAndDetails.appendChild(detailPara);
  blockForDateAndRestThing.appendChild(dateBox);
  dateBox.appendChild(datePara);
  taskList.appendChild(statusCheckbox);
  taskList.appendChild(blockForNameAndDetails);
  taskList.appendChild(blockForDateAndRestThing);
  taskList.appendChild(threeDot);
  project.block.appendChild(taskList);
  taskMainDiv.appendChild(project.block);
  project.taskcount++;
  
  PubSub.publish('taskCancleButtonClicked');
  
}

//  --------------------------  function to clear mainTaskDiv when user click on project ---------------------------------

function clearTaskMainBlock(eventName, targetedProject) {
  while (taskMainDiv.firstChild) {
    taskMainDiv.removeChild(taskMainDiv.firstChild);
  }
  PubSub.publish('taskMainDivCleared', targetedProject); // after clearing taskmaindiv it will call publish a function which finds targeted project and add ul block to maintask dib
}

//  --------------------------  function which finds targeted project and append block to taskmainidiv ---------------------------------

function addTargetedProjectListToTaskMainDiv(eventName, targetedProject) {
  for (const project of Projects) {
    if (
      project.dataIndex == targetedProject.id[targetedProject.id.length - 1]
    ) {
      taskMainDiv.appendChild(project.block);
    }
  }
  taskForm.reset();
}

function letsChangeCheckbox(eventName, checkbox) {
  let targetedProject = checkbox.dataset.ProjectId;
  let targetedCheckBoxId = checkbox.id[checkbox.id.length - 1];

  console.log(targetedProject);

  for (let i = 0; i < Projects[targetedProject].task.length; i++) {
    if (Projects[targetedProject].task[i].dataIndex == targetedCheckBoxId) {
      console.log(Projects[targetedProject]);
      let targetedTask = Projects[targetedProject].task[i];

      if (targetedTask.status == 'false') {
        checkbox.style.backgroundColor = '#2abd67';
        targetedTask.status = 'true';
        checkbox.style.border = '#2abd67';
        checkbox.nextSibling.firstChild.style = 'font-family: strikeout;';
      } else {
        checkbox.style.backgroundColor = '#fefcfe';
        checkbox.style.border = '2px solid #374958';
        targetedTask.status = 'false';
        checkbox.nextSibling.firstChild.style = 'font-family:monoBold';
      }
    }
  }
}


function updateTaskDetails(eventName, taskUpdateBtnCurrentId) {
  const Task = document.querySelector(`#taskList${taskUpdateBtnCurrentId}`);
  const namePara = Task.querySelector('.namePara');
  const detailPara = Task.querySelector('.detailPara');
  const datePara = document.querySelector('.dateBox');
  namePara.textContent = taskNameInput.value;
  detailPara.textContent = taskDetailInput.value;
  datePara.textContent = taskDateInput.value;
  taskUpdateBtn.style.display = 'none';
  taskAddbutton.style.display = 'block';
  PubSub.publish('taskDetailUpdateDone', taskUpdateBtnCurrentId);
}

function letsAddAllBlocksToMainTaskDiv() {
  for (let i = 0; i < Projects.length; i++) {
    taskMainDiv.appendChild(Projects[i].block);
    
  }
}

function letsClearMainTaskListForMain() {
  while (taskMainDiv.firstChild) {
    taskMainDiv.removeChild(taskMainDiv.firstChild);
  }
  letsAddAllBlocksToMainTaskDiv();
}

function letsClearMainTaskList() {
  while (taskMainDiv.firstChild) {
    taskMainDiv.removeChild(taskMainDiv.firstChild);
  }
}

function letsRemoveAddTaskBtn() {
  addTaskButton.style.display = 'none';
}

function letsShowAddTaskButton() {
  addTaskButton.style.display = 'block';
}


function resetDisplay() {
  for (let i = 0; i < Projects.length; i++) {
    let projectBlock = Projects[i].block.childNodes;
    projectBlock.forEach((item) => {
      item.style.display = 'flex';
    });
  }
}

function updateProjectListFromLocalStorage(){
  if(localStorage.getItem('ProjectList')==undefined){
   return
  }else{
    projectUl.innerHTML=localStorage.getItem('ProjectList')
  }
  

}

function updateTaskListDom(){


  letsAddAllBlocksToMainTaskDiv()
PubSub.publish('letsUpdateProjectListDomArrAtLocalStorage',taskMainDiv.innerHTML)

}

function filterBlocks(){
  let tempDiv = document.createElement('div')
  tempDiv.innerHTML = localStorage.getItem('ProjectListDomArray')
  let childNodeOfTempDiv = tempDiv.childNodes;
  for(let i =0; i<Projects.length;i++){
    if(Projects[i].dataIndex == childNodeOfTempDiv[i]){
      Projects[i].block = childNodeOfTempDiv[i]
    }
  }
  PubSub.publish('updateProjectArray',Projects)
  console.log(Projects)
}

PubSub.subscribe('ToggleMenuClicked', toggle);
PubSub.subscribe('clickAddProjectButton', openForm);
PubSub.subscribe('addProject', addProject);
PubSub.subscribe('closeForm', closeForm);
PubSub.subscribe('openForm', openForm);
PubSub.subscribe('projectUpdateBtnClicked', updateProjectName);
PubSub.subscribe('targetedListClicked', showProjectDetails);
PubSub.subscribe('addTaskButtonClicked', openTaskForm);
PubSub.subscribe('taskCancleButtonClicked', closeTaskForm);
PubSub.subscribe('targetedListClicked', clearTaskMainBlock);
PubSub.subscribe('taskObjCreated', createTaskDom);
PubSub.subscribe('taskMainDivCleared', addTargetedProjectListToTaskMainDiv);
PubSub.subscribe('checkBoxClicked', letsChangeCheckbox);
PubSub.subscribe('openTaskForm', openTaskForm);
PubSub.subscribe('taskUpdateClicked', updateTaskDetails);
PubSub.subscribe('mainListClicked', clearTaskMainBlock);
PubSub.subscribe('letsClearMainTaskMainList', letsClearMainTaskListForMain);
PubSub.subscribe('letsHideAddTaskBtn', letsRemoveAddTaskBtn);
PubSub.subscribe('letsShowAddTaskButton', letsShowAddTaskButton);
PubSub.subscribe('MainMenuClicked', letsClearMainTaskList);
PubSub.subscribe('MenuClicked', resetDisplay);
PubSub.subscribe('letsUpdateProjectListDomFromLocalStorage',updateProjectListFromLocalStorage)
PubSub.subscribe('letsStoreTaskListDom',updateTaskListDom)
PubSub.subscribe('letsFilterTempDiv',filterBlocks)

