
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
    
    let projectSelectValue = data.target;
    let projectName = projectSelectValue.parentElement.firstChild
    
    for(let i=0;i<Projects.length;i++){

        if(Projects[i].dataIndex == projectSelectValue.id){
            let project = Projects[i]
            
           PubSub.publish('projectRenameFunctionHasBeenRun',project)
          
           
        }
    }
       
    
  

}


function letUpdateProjectObjNameProperty(eventName,project){

project.name = projectInput.value
console.log('this object i got',project)

PubSub.publish('projectObjectRenamePropertyDone',project)
console.log(Projects)
}


PubSub.subscribe('projectSelected',showProjectDetail)
PubSub.subscribe('projectRenameUpdateButtonClicked',letUpdateProjectObjNameProperty)
PubSub.subscribe('projectRenameClicked',ProjectRename)
PubSub.subscribe('addProject',createProject)
