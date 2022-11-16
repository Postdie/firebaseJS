import { getTasks, saveTask, onGetTasks } from './firebase.js';

const formTask = document.querySelector('#task-form');
const taskContainer = document.querySelector('#tasks-container');

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks(querySnapshot => {
        if(taskContainer.firstChild)
            taskContainer.removeChild(taskContainer.firstChild)
        const div = document.createElement('div');
        let html = '<ul>';
        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `<li>${task.title} - ${task.description}</li>`;
        });
        html += `</ul>`;
        div.innerHTML = html;
        taskContainer.appendChild(div);
    });

});

formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = formTask['task-title'];
    const description = formTask['task-description'];
    
    saveTask(title.value, description.value);

    formTask.reset();

})