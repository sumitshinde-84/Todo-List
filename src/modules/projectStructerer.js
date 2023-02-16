
import PubSub from "pubsub-js";
import project from './project'
import {projectInput,projectForm,projectRename, taskNameInput,taskDetailInput,taskDateInput, taskAddbutton} from "./domCollection"; 
import { task } from "./task";
 export const Projects = []
let count = 0;
let taskCount;

function createProject(){
    taskCount =0;
    const block = document.createElement('ul')
    block.className='task-list'
    block.id =`block${count}`
    const ProjectObj = project(projectInput.value,[],count,block) 
    Projects.push(ProjectObj)
    // projectForm.reset()
    count++;
}


function showProjectDetail(eventName ,targetedList){
    for (const ProjectObj of Projects ){
        if(ProjectObj.dataIndex == targetedList.target.dataset.index){
            PubSub.publish('foundTargetedObj',ProjectObj)
        }
    }}
    


function letsRenameProjectNameProperty(eventName,data){
    let targetedObjId = data
    for(let i=0;i<Projects.length;i++){
        if(Projects[i].dataIndex == targetedObjId){
            let project = Projects[i]
            project.name = projectInput.value
            console.log(Projects)
        }
    }
PubSub.publish('closeForm')
}


// ------------------------------------ create Task list -----------------------------------

function createTask(){
 
    const taskObj = task(taskNameInput.value,taskDateInput.value,taskDetailInput.value,taskCount)
    console.log(taskNameInput.value,'this is taskname input')
    let targetedId = taskAddbutton.id
    for (const task of Projects){
        if(task.dataIndex == targetedId){
            Projects[targetedId].task.push(taskObj)
          
            PubSub.publish('taskObjCreated',Projects[targetedId])

        }
    }
    
    taskCount++
}

PubSub.subscribe('projectSelected',showProjectDetail)
PubSub.subscribe('addProject',createProject)
PubSub.subscribe('projectTextcontentHasBeenRenamed',letsRenameProjectNameProperty)
PubSub.subscribe('taskAddButtonClicked',createTask)

