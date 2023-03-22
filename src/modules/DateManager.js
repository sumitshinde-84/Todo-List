import { differenceInDays, parse, isToday } from 'date-fns';
import PubSub from 'pubsub-js';
import { Projects } from './projectStructerer';

function todayHasBeenClicked() {
  PubSub.publish('letsClearMainTaskMainList');

  let targetedTask;
  for (let i = 0; i < Projects.length; i++) {
    let projectBlock = Projects[i].block.childNodes;
    projectBlock.forEach((item) => {
      item.style.display = 'none';
    });
    for (let j = 0; j < Projects[i].task.length; j++) {
      let today = new Date();
      const date = Projects[i].task[j].Date;
      const dateValue = date.split('-').reverse().join('/');
      let result = parse(dateValue, 'dd/MM/yyyy', today);

      let isTodayResult = isToday(result);
      console.log(result);
      if (isTodayResult == true) {
        let targetedId = Projects[i].task[j].dataIndex;
        targetedTask = Projects[i].block.querySelector(
          `#taskList${targetedId}`
        );

        targetedTask.style.display = 'flex';
        console.log(targetedTask);
      }
    }
  }
}

function next7DaysClicked() {
  PubSub.publish('letsClearMainTaskMainList');
  let targetedTask;

  for (let i = 0; i < Projects.length; i++) {
    let projectBlock = Projects[i].block.childNodes;
    projectBlock.forEach((item) => {
      item.style.display = 'none';
    });
    for (let j = 0; j < Projects[i].task.length; j++) {
      const date = Projects[i].task[j].Date;
      const dateValue = date.split('-').reverse().join('/');
      console.log(dateValue);
      let today = new Date();
      let result = parse(dateValue, 'dd/MM/yyyy', today);

      let diffrence = differenceInDays(result, today);
      let isTodayResult = isToday(result);
      console.log(result);
      if (isTodayResult == true) {
        return;
      } else if (diffrence < 8) {
        let targetedId = Projects[i].task[j].dataIndex;
        targetedTask = Projects[i].block.querySelector(
          `#taskList${targetedId}`
        );

        targetedTask.style.display = 'flex';
      
      }
    }
  }
}

PubSub.subscribe('next7DaysClicked', next7DaysClicked);
PubSub.subscribe('todayHasBeenClicked', todayHasBeenClicked);
