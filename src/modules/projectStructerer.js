
import PubSub from "pubsub-js";

import project from './project'
import {projectInput,projectForm} from "./domCollection"; 

const Projects = []
let count = 0;

function createProject(){
    
    const ProjectObj = project(projectInput.value,[],count) 
    Projects.push(ProjectObj)
    projectForm.reset()
    console.log(Projects)
    count++;
}



PubSub.subscribe('projectRenameClicked',(eventname,dataList)=>{
function showProjectDetail(targetedList){
for (const ProjectObj of Projects ){
    if(ProjectObj.dataIndex == targetedList.dataset.index){
     return ProjectObj
    }
}}
let targetedObject = showProjectDetail(dataList.target)
PubSub.publish('foundTargetedObj',targetedObject)
})


PubSub.subscribe('addProject',createProject)
