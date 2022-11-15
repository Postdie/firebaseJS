import { saveTask } from './firebase.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log('works!');
});

const formTask = document.querySelector('#task-form');

formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = formTask['task-title'];
    const description = formTask['task-description'];
    
    saveTask(title.value, description.value);

    formTask.reset();

})