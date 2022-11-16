import { saveTask, onGetTasks, deleteTask } from './firebase.js';

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
            html += `<li>${task.title} - ${task.description}
            <button class="delete" data-id="${doc.id}">Eliminar</button></li>`;
        });
        html += `</ul>`;
        div.innerHTML = html;
        taskContainer.appendChild(div);
    });

    document.querySelector('#tasks-container').addEventListener('click', ({target}) => {
        if(target.classList.contains('delete')){
            deleteTask(target.getAttribute('data-id'));
        }
    })
});

formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = formTask['task-title'];
    const description = formTask['task-description'];
    
    saveTask(title.value, description.value);

    formTask.reset();
});