
import PubSub from "pubsub-js";
import project from './project'
import {projectInput,projectForm,projectRename} from "./domCollection"; 

const Projects = []
let count = 0;

function createProject(){
    
    const ProjectObj = project(projectInput.value,[],count) 
    Projects.push(ProjectObj)
    projectForm.reset()
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




PubSub.subscribe('projectSelected',showProjectDetail)
PubSub.subscribe('addProject',createProject)
PubSub.subscribe('projectTextcontentHasBeenRenamed',letsRenameProjectNameProperty)
