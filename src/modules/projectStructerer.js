import PubSub from 'pubsub-js';
import project from './project';
import {
  projectInput,
  projectForm,
  projectRename,
  taskNameInput,
  taskDetailInput,
  taskDateInput,
  taskAddbutton,
  addTaskButton,
} from './domCollection';
import { task } from './task';

let taskCount;
localStorage.setItem('count', 1);
const defaultProject = document.createElement('ul');
defaultProject.className = 'task-list';
defaultProject.id = `block${0}`;
let Projects ;
function starter(){

let visitor = localStorage.getItem('visitor')
 if(visitor === 'true'){
  Projects = localStorage.getItem('ProjectListArray')
  Projects = JSON.parse(Projects)
  console.log(Projects)
  console.log('++++++++++++++++++++++++++++++++++++++')
  
}else {
  Projects = [
     {
       name: 'Default',
       task: [],
       dataIndex: 0,
       block: defaultProject,
       taskcount: 0,
     },
   ];
   localStorage.setItem('visitor','true')
   console.log('------------------------------------')
 }
}
 function overRideProjectArray(eventName,projects){
  Projects = projects
  
 }



function createProject() {
  let count = JSON.parse(localStorage.getItem('count'));
  taskCount = 0;
  const block = document.createElement('ul');
  block.className = 'task-list';
  block.id = `block${count}`;
  const ProjectObj = project(projectInput.value, [], count, block);
  Projects.push(ProjectObj);
  // projectForm.reset()

  PubSub.publish('updateProjectArray',Projects)
  count++;
  console.log(Projects);
}

function showProjectDetail(eventName, targetedList) {
  for (const ProjectObj of Projects) {
    if (ProjectObj.dataIndex == targetedList.target.dataset.index) {
      PubSub.publish('foundTargetedObj', ProjectObj);
    }
  }
}

function letsRenameProjectNameProperty(eventName, data) {
  let targetedObjId = data;
  for (let i = 0; i < Projects.length; i++) {
    if (Projects[i].dataIndex == targetedObjId) {
      let project = Projects[i];
      project.name = projectInput.value;
      console.log(Projects);
    }
  }
  PubSub.publish('closeForm');
}

// ------------------------------------ create Task list -----------------------------------

function createTask() {
  if (!taskCount) {
    taskCount = 0;
    
  }
  console.log('this is task count', taskCount);
  const taskObj = task(
    taskNameInput.value,
    taskDateInput.value,
    taskDetailInput.value,
    'false',
    taskCount
  );
  console.log('This is taskCount', taskCount);
  console.log(taskNameInput.value, 'this is taskname input');
  let targetedId = taskAddbutton.id;
  for (const task of Projects) {
    if (task.dataIndex == targetedId) {
      Projects[targetedId].task.push(taskObj);

      PubSub.publish('taskObjCreated', Projects[targetedId]);
      PubSub.publish('updateProjectArray',Projects)
    }
  }

  taskCount++;
  console.log(Projects);
}

function updateTaskDetails(eventName, updateBtnCurrentId) {
  for (let i = 0; i < Projects[taskAddbutton.id].task.length; i++) {
    if (Projects[taskAddbutton.id].task[i].dataIndex == updateBtnCurrentId) {
      Projects[taskAddbutton.id].task[i].name = taskNameInput.value;
      Projects[taskAddbutton.id].task[i].desc = taskDetailInput.value;
      Projects[taskAddbutton.id].task[i].Date = taskDateInput.value;
      console.log(Projects[taskAddbutton.id].task[i]);
    }
  }
}

PubSub.subscribe('projectSelected', showProjectDetail);
PubSub.subscribe('addProject', createProject);
PubSub.subscribe(
  'projectTextcontentHasBeenRenamed',
  letsRenameProjectNameProperty
);

export {Projects} ;
PubSub.subscribe('taskAddButtonClicked', createTask);
PubSub.subscribe('taskDetailUpdateDone', updateTaskDetails);
PubSub.subscribe('letsOverRideProject',overRideProjectArray)
PubSub.subscribe('starter',starter)

