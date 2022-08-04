// Global Variables
const FormUI = document.querySelector('#form');
const TaskListUI = document.getElementById('TaskList');
let arrayTaskList = [];
// Functions
const CreateItem = (task) => {
    let item = {
        task: task,
        status: "not done"
    }
    arrayTaskList.push(item);
    return item;
}
const SaveDB = () => {
    localStorage.setItem('tasks', JSON.stringify(arrayTaskList));
    PaintDB();
}
const PaintDB = () => {
    TaskListUI.innerHTML = '';
    arrayTaskList = JSON.parse(localStorage.getItem('tasks'));
    if(arrayTaskList === null){
        arrayTaskList = [];
    }else{
        arrayTaskList.forEach(Element => {
            if(Element.status == "done"){
                TaskListUI.innerHTML += `<div class="alert alert-success" role="alert">
                <span class="material-icons float-lg-start me-2">check_circle_outline</span>
                <span>${Element.task}</span>
                <span class="float-lg-end"><span class="material-icons">done</span>
                <span class="material-icons">delete</span></span></div>`;
            }else if(Element.status == "not done"){
                TaskListUI.innerHTML += `<div class="alert alert-danger" role="alert">
                <span class="material-icons float-lg-start me-2">article</span>
                <span>${Element.task}</span>
                <span class="float-lg-end"><span class="material-icons">done</span>
                <span class="material-icons">delete</span></span></div>`;
            }
        })
    }
}

const DeleteDB = (task) =>{
    let indexArray;
    arrayTaskList.forEach((element,index) => {
        if(element.task === task){
            indexArray = index;
        }
    })
    arrayTaskList.splice(indexArray,1);
    SaveDB();
} 

const ChangeStatusDB = (task) =>{
    let indexArray = arrayTaskList.findIndex((element) =>
        element.task === task);
    arrayTaskList[indexArray].status = "done";
    SaveDB();
}
//EventListener
FormUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskUI = document.getElementById('task').value;
    
    if(taskUI==""){
        alert("You must type the task before you can add it to the list");
    }else{
        CreateItem(taskUI);
        SaveDB();
        FormUI.reset();
    }
    
});

document.addEventListener('DOMContentLoaded', PaintDB);

TaskListUI.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        let task = e.path[2].childNodes[3].innerHTML;
        if(e.target.innerHTML === 'delete'){
            // Delete action
            DeleteDB(task);
        }
        if(e.target.innerHTML === 'done'){
            // Action to change status
            ChangeStatusDB(task);
        }
    }
})

