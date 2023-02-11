
import PubSub from "pubsub-js";

import project from './project'
import {projectInput,projectForm} from "./domCollection"; 

let Projects = []


function createProject(){

    
    let ProjectObj = project(projectInput.value,[]) 

    Projects.push(ProjectObj)
    projectForm.reset()
    console.log(Projects)

}

PubSub.subscribe('addProject',createProject)