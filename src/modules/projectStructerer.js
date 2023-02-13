
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
    


function ProjectRename(eventName,data){

    
    let targetedProjectList = data.target
    for(let i=0;i<Projects.length;i++){
        if(Projects[i].dataIndex == targetedProjectList.dataset.index){
            let project = Projects[i]
           PubSub.publish('projectRenameFunctionHasBeenRun',project)
        
           
        }
    }
       
    
  

}


function letUpdateProjectObjNameProperty(eventName,project){
    console.log(project,'look i am heare')

project.name = projectInput.value

PubSub.publish('projectObjectRenamePropertyDone',project)
console.log(Projects)
}


PubSub.subscribe('projectSelected',showProjectDetail)
PubSub.subscribe('projectRenameUpdateButtonClicked',letUpdateProjectObjNameProperty)
PubSub.subscribe('projectRenameClicked',ProjectRename)
PubSub.subscribe('addProject',createProject)
