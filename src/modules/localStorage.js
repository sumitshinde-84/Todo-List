import PubSub from "pubsub-js";

function updateProjectDom(_eventName,ProjectsListItem){
    localStorage.setItem('ProjectList',ProjectsListItem);
}

function updateProjectListArray(eventName,projectsArray){
    localStorage.setItem('ProjectListArray',JSON.stringify(projectsArray));
}

function updateProjectListDom(eventname,domArray){
    localStorage.setItem('ProjectListDomArray',domArray)
}

PubSub.subscribe('letsStoreProjectListItem',updateProjectDom)
PubSub.subscribe('updateProjectArray',updateProjectListArray)
PubSub.subscribe('letsUpdateProjectListDomArrAtLocalStorage',updateProjectListDom)
