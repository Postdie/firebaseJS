import { saveTask, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js';

const formTask = document.querySelector('#task-form');
const taskContainer = document.querySelector('#tasks-container');
let editStatus = false;
let idForEdit = '';

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks(querySnapshot => {
        if(taskContainer.firstChild)
            taskContainer.removeChild(taskContainer.firstChild)
        const div = document.createElement('div');
        let html = '<ul>';
        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `<li>${task.title} - ${task.description}
            <button class="delete" data-id="${doc.id}">Eliminar</button>
            <button class="edit" data-id="${doc.id}">Editar</button></li>`;
        });
        html += `</ul>`;
        div.innerHTML = html;
        taskContainer.appendChild(div);
    });

    document.querySelector('#tasks-container').addEventListener('click', async ({target}) => {
        if(target.classList.contains('delete')){
            deleteTask(target.getAttribute('data-id'));
        }
        if(target.classList.contains('edit')){
            const id = target.getAttribute('data-id');
            const doc = await getTask(id);
            const task = doc.data();
            formTask['task-title'].value = task.title;
            formTask['task-description'].value = task.description;
            editStatus = true;
            idForEdit = id;
            document.querySelector('#btn-task-save').innerText = 'Update';
        }
    })
});

formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = formTask['task-title'];
    const description = formTask['task-description'];
    
    if(!editStatus){
        saveTask(title.value, description.value);   
    } else {
        updateTask(idForEdit, {
            'title': title.value, 'description': description.value
        });
        editStatus = false;
        document.querySelector('#btn-task-save').innerText = 'Save';
    }

    formTask.reset();
});