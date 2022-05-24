const divProductos = document.getElementById("divProductos")
const contenedorTabla = document.getElementById("tablaCarrito")
const totalCarrito = document.getElementById("totalCarrito");


function mostrarProducto(array){
    array.forEach(producto => {
    divProductos.innerHTML += `
    <div class="col mb-5">
    <div class="card h-100">
        <img class="card-img-top" src="${producto.img}"/>
        <div class="card-body p-4">
            <div class="text-center">
                <h5 class="fw-bolder">${producto.nombre}</h5>
                <p>$${producto.precio}</p>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent"></div>
             <div class="text-center">
                <button onclick="agregar(${producto.id})" class="btn btn-outline-dark mt-auto">Agregar al carrito</button>
             </div>
                   
        </div>
    </div>
    </div>
 `

 }); 
}

function mostrarCarrito(){
    let carrito = capturarStorage()
    contenedorTabla.innerHTML =""
    carrito.forEach(producto => {
        contenedorTabla.innerHTML += ` 
        <tr>
            <th scope="row">${producto.cantidad}</th>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.precio * producto.cantidad}</td>
            <td><button onclick="eliminarCarrito(${producto.id})">Eliminar</button></td>            
        </tr>
       `
    })
}

function capturarStorage(){
    return JSON.parse(localStorage.getItem("carrito")) || []

}

function guardarStorage(array){
    localStorage.setItem("carrito", JSON.stringify(array))

}

function agregar(idParam){
    let carrito = capturarStorage()
    if(productoEnCarrito(idParam)){
        incrementarCantidad(idParam)

    }else{
    let productoEncontrado = productos.find(producto=>producto.id==idParam)
    carrito.push({...productoEncontrado, cantidad:1 })
    guardarStorage(carrito)
    mostrarCarrito(carrito)
    }
    totalProductos()
}

function incrementarCantidad(id){
    let carrito = capturarStorage()
    const indice = carrito.findIndex(producto=>producto.id==id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito(carrito)
}
function eliminarCarrito(id){
    let carrito = capturarStorage()
    let resultado = carrito.filter(producto=> producto.id !=id)
    guardarStorage(resultado)
    mostrarCarrito(carrito)
    totalProductos()
}

function productoEnCarrito(id){
    let carrito=capturarStorage()
    return carrito.some(producto=>producto.id==id)
}

function totalProductos(){
    let carrito=capturarStorage()
    let total = carrito.reduce(
        (acc, producto) => acc + producto.cantidad * producto.precio, 0

    );
    totalCarrito.innerHTML = total;
}
mostrarProducto(productos)
mostrarCarrito()
totalProductos()