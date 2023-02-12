
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


function ProjectRename(eventName,data){
    
    let projectSelectValue = data.target;
    let projectName = projectSelectValue.parentElement.firstChild
    
    for (const project of Projects) {
        if(project.dataIndex == projectSelectValue.id){
            console.log('i am prStuct')
           PubSub.publish('prrenameClicked',projectName)
        }
    }
    console.log(projectSelectValue)

}



PubSub.subscribe('renameClicked',ProjectRename)
PubSub.subscribe('addProject',createProject)
