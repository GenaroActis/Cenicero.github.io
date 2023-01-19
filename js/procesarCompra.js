const procesarCompra = document.querySelector("#procesarCompra");
const botonCarrito = document.querySelector("#botonCarrito");
const precio = document.querySelector("#totalPrecio");


productosElegidos = JSON.parse(localStorage.getItem("productosElegidos"));
productosElegidos.forEach((producto) => {
    const {id, nombre, precio, img, elegidos, precioSubTotal} = producto
    const divCompra = document.createElement('tr');
    divCompra.classList.add('divCompra');
    divCompra.innerHTML += `
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" id="imgProcesar" src="${img}"/>
            </div>
            <div>
                <td>${nombre}</td>
                <td>${precio}</td>
                <td>${elegidos}</td>
                <td>${precioSubTotal}</td>
            </div>
        </div>
        `
    procesarCompra.append(divCompra);
});
const totalPrecio = productosElegidos.reduce((acumulador, producto) => acumulador + producto.precioSubTotal, 0);
precio.textContent = totalPrecio

