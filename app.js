// Variables Globlales
const FormUI = document.querySelector('#form');
const TaskListUI = document.getElementById('TaskList');
let arrayTaskList = [];
// Funciones
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
                Producto: <b>${Element.producto}</b> - Marca: <b>${Element.marca}</b> - Cantidad: <b>${Element.cantidad}</b> - Estado: <b>${Element.estado}</b>
                <span class="float-lg-end"><span class="material-icons">done</span>
                <span class="material-icons">delete</span></span></div>`;
            }else if(Element.status == "not done"){
                TaskListUI.innerHTML += `<div class="alert alert-danger" role="alert">
                <span class="material-icons float-lg-start me-2">shopping_cart</span>
                Producto: <b>${Element.producto}</b> - Marca: <b>${Element.marca}</b> - Cantidad: <b>${Element.cantidad}</b> - Estado: <b>${Element.estado}</b>
                <span class="float-lg-end"><span class="material-icons">done</span>
                <span class="material-icons">delete</span></span></div>`;
            }
        })
    }
}

const DeleteDB = (task) =>{
    let indexArray;
    arrayTaskList.forEach((element,index) => {
        if(element.producto === producto && element.marca === marca && element.cantidad === cantidad){
            indexArray = index;
        }
    })
    arrayTaskList.splice(indexArray,1);
    SaveDB();
} 

const EditDB = (task) =>{
    let indexArray = arrayTaskList.findIndex((element) =>
        element.producto === producto && element.marca === marca && element.cantidad === cantidad);
    arrayTaskList[indexArray].estatus = "done";
    GuardarDB();
}
//EventListener
FormUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let productoUI = document.getElementById('producto').value;
    let cantidadUI = document.getElementById('cantidad').value;
    let marcaUI= document.getElementById('marca').value;
    
    if(cantidadUI=="" || productoUI==""){
        alert("Debe rellenar todos los campos con *");
    }else{
        if(marcaUI==""){
            marcaUI="No especificada";
        }
      
  CreateItem(taskUI);
        SaveDB();
        FormUI.reset();
    }
    
});

document.addEventListener('DOMContentLoaded', PintarDB);

ListadeComprasUI.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        let product = e.path[2].childNodes[3].innerHTML; 
        let marc = e.path[2].childNodes[5].innerHTML;
        let cantd = e.path[2].childNodes[7].innerHTML;
        if(e.target.innerHTML === 'delete'){
            // Acción de Eliminar
            EliminarDB(product, marc, cantd);
        }
        if(e.target.innerHTML === 'done'){
            // Acción de Editar
            EditarDB(product, marc, cantd);
        }
    }
})

