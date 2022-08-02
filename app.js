// Variables Globlales
const formularioUI = document.querySelector('#formulario');
const ListadeComprasUI = document.getElementById('ListadeCompras');
let arrayListadeCompras = [];
// Funciones
const CrearItem = (producto, cantidad, marca) => {
    let item = {
        producto: producto,
        cantidad: cantidad,
        marca: marca,
        estado: "No Comprado"
    }
    arrayListadeCompras.push(item);
    return item;
}
const GuardarDB = () => {
    localStorage.setItem('compras', JSON.stringify(arrayListadeCompras));
    PintarDB();
}
const PintarDB = () => {
    ListadeComprasUI.innerHTML = '';
    arrayListadeCompras = JSON.parse(localStorage.getItem('compras'));
    if(arrayListadeCompras === null){
        arrayListadeCompras = [];
    }else{
        arrayListadeCompras.forEach(Element => {
            if(Element.estado == "Comprado"){
                ListadeComprasUI.innerHTML += `<div class="alert alert-success" role="alert">
                <span class="material-icons float-lg-start me-2">check_circle_outline</span>
                Producto: <b>${Element.producto}</b> - Marca: <b>${Element.marca}</b> - Cantidad: <b>${Element.cantidad}</b> - Estado: <b>${Element.estado}</b>
                <span class="float-lg-end"><span class="material-icons">done</span>
                <span class="material-icons">delete</span></span></div>`;
            }else if(Element.estado == "No Comprado"){
                ListadeComprasUI.innerHTML += `<div class="alert alert-danger" role="alert">
                <span class="material-icons float-lg-start me-2">shopping_cart</span>
                Producto: <b>${Element.producto}</b> - Marca: <b>${Element.marca}</b> - Cantidad: <b>${Element.cantidad}</b> - Estado: <b>${Element.estado}</b>
                <span class="float-lg-end"><span class="material-icons">done</span>
                <span class="material-icons">delete</span></span></div>`;
            }
        })
    }
}

const EliminarDB = (producto, marca, cantidad) =>{
    let indexArray;
    arrayListadeCompras.forEach((elemento,index) => {
        if(elemento.producto === producto && elemento.marca === marca && elemento.cantidad === cantidad){
            indexArray = index;
        }
    })
    arrayListadeCompras.splice(indexArray,1);
    GuardarDB();
} 

const EditarDB = (producto, marca, cantidad) =>{
    let indexArray = arrayListadeCompras.findIndex((elemento) =>
        elemento.producto === producto && elemento.marca === marca && elemento.cantidad === cantidad);
    arrayListadeCompras[indexArray].estado = "Comprado";
    GuardarDB();
}
//EventListener
formularioUI.addEventListener('submit', (e) => {
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
      
  CrearItem(productoUI, cantidadUI, marcaUI);
        GuardarDB();
        formularioUI.reset();
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

