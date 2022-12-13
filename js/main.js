const stockProductos = [
    { id:1, nombre:"Chomba Champion", precio:5000, img1:"../img/2.png", img2:"../img/1.png", stock: 2, talle:"M", elegidos:0, precioSubTotal:5000},
    { id:2, nombre:"Buzo Michigan", precio:7500, img1:"../img/4.png", img2:"../img/5.png", stock: 2, talle:"XL", elegidos:0, precioSubTotal:7500},
    { id:3, nombre:"Buzo Raiders", precio:8000, img1:"../img/6.png", img2:"../img/7.png", stock: 2, talle:"XL", elegidos:0, precioSubTotal:8000},
    { id:4, nombre:"Chomba Polo Ralph Lauren", precio:4000, img1:"../img/9.png", img2:"../img/10.png", stock: 2, talle:"L slim fit", elegidos:0, precioSubTotal:4000},
    { id:5, nombre:"Chomba Tommy Hilfiger", precio:3500, img1:"../img/11.png", img2:"../img/12.png", stock: 2, talle:"L", elegidos:0, precioSubTotal:3500},
    { id:6, nombre:"Chomba Tommy Hilfiger", precio:2500, img1:"../img/13.png", img2:"../img/14.png", stock: 2, talle:"M", elegidos:0, precioSubTotal:2500},
    { id:7, nombre:"Chomba Polo Ralph Lauren", precio:4500, img1:"../img/15.png", img2:"../img/16.png", stock: 2, talle:"L", elegidos:0, precioSubTotal:4500},
    { id:8, nombre:"Chomba RLX Ralph Lauren", precio:4500, img1:"../img/17.png", img2:"../img/18.png", stock: 2, talle:"M", elegidos:0, precioSubTotal:4500},
] 

const producto = document.querySelector("#productos");
const modalBody = document.querySelector("#modal-body");
const fotterModalPadre = document.querySelector("#modalFooter");

let carrito = [];
let productosElegidos = [];


// cards productos
stockProductos.forEach ((producto) =>{
    const divCard = document.createElement('div');
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');
    const divCardBody = document.createElement('div');
    const h5tag = document.createElement('h3');
    const ptagTalle = document.createElement('h4');
    const ptagPrecio = document.createElement('h4');
    const atag = document.createElement('button');
    const tagTalle = document.createElement('h5');

    divCard.classList.add('card','text-dark','mt-5');
    img1.classList.add('card-img-top','mt-2', 'img-fluid');
    img1.src = `${producto.img1}`;
    img2.classList.add('card-img', 'img-fluid');
    img2.src = `${producto.img2}`;
    divCardBody.classList.add('card-body');
    h5tag.classList.add('card-title');
    tagTalle.classList.add('card-text');
    ptagPrecio.classList.add('card-text');
    atag.classList.add('btn','btn-outline-primary');
    img2.setAttribute('id', 'img2');

    h5tag.innerHTML= `${producto.nombre}`;
    ptagTalle.innerHTML= `${producto.talle}`;
    ptagPrecio.innerHTML= `$${producto.precio}`;
    atag.textContent = 'Agregar';
    
    // funcion agregar producto
    atag.addEventListener("click", (e) => {
        agregarproducto()
    });


    let cantidadElegida = 0;
    

    const agregarproducto = () =>{
            cantidadElegida += 1;
            // si el elemento no existe ya en el array productosElegidos que....
        if (cantidadElegida <2){
            productosElegidos.push({
            id : producto.id,
            nombre : producto.nombre,
            precio : producto.precio,
            img : producto.img1,
            precioSubTotal : producto.precioSubTotal,
            elegidos : cantidadElegida,
            });
        }
        // si ya existe actualizamos cantidadElegida
        else{
            var productoParaActualizar = productosElegidos.find((prod) =>{
            return prod.id == producto.id
        });
        productoParaActualizar.precioSubTotal = cantidadElegida * productoParaActualizar.precio;
        productoParaActualizar.elegidos = productoParaActualizar.elegidos + 1;
        atag.innerHTML =  productoParaActualizar.elegidos;
        console.log(productosElegidos)
    }
}
        
    productos.append(divCard);
    divCard.append(img1,divCardBody);
    divCard.append(img2,divCardBody);
    divCardBody.append(h5tag,ptagTalle,ptagPrecio,atag);

    // funcion agregado
    
    atag.addEventListener('click',function(e){
        divCardBody.append(atag);
        atag.textContent = 'agregado';
        atag.classList.remove('btn-outline-primary');
        atag.classList.add('btn-warning');
    });

    // funcion selector de img 
    img2.addEventListener('click', function(){
        // img1.src = this.src
        // img2.src = producto.img1

        if (img1.src = producto.img1){
        img1.src = producto.img2
        img2.src = producto.img1
        }
        else if (img1.src = producto.img2){
            img1.src = producto.img1
            img2.src = producto.img2
        };
    });
    
});


// boton Carrito
const botonCarrito = document.querySelector("#botonCarrito");
if (botonCarrito){
    botonCarrito.innerHTML +=`
    <button id="buttonC" type="button" data-toggle="modal" data-target="#exampleModal"><img src="../img/carrito-de-compras.png" class="imgBoton"></button>`
}
botonCarrito.addEventListener ("click", () => {
    mostrarCarrito();
});


const mostrarCarrito = () => {
        modalBody.innerHTML='';
        productosElegidos.forEach ((producto) => {
            
            const {id, nombre, precio, img, elegidos} = producto
            
            const divCarrito = document.createElement('div');
            divCarrito.classList.add('divCarrito');
            
            divCarrito.innerHTML += `
            <div class="modal-contenedor">
                <div>
                <img class="img-fluid img-carrito" src="${img}"/>
                </div>
            <div>
                <p>Cantidad: ${elegidos}</p>
                <p>Producto: ${nombre}</p>
                <p>Precio: ${precio}</p>
                </div>
            </div>
            `;
            
            // eliminar producto
            
            const buttonEli = document.createElement('button');
            buttonEli.classList.add('btn', 'btn-danger');
            buttonEli.setAttribute('id', 'eliProd');
            buttonEli.textContent = 'Eliminar Producto';
            divCarrito.appendChild(buttonEli);
            buttonEli.addEventListener("click", () => {
                const prodId = id
                carrito = carrito.filter((producto) => producto.id !== prodId);
                console.log(carrito);
                modalBody.innerHTML = ""
                mostrarCarrito();
                total()
                });
                total()
            modalBody.append(divCarrito);
        });
    };
    

// totalPrecio
function total() {
const totalPrecio = productosElegidos.reduce((acumulador, producto) => acumulador + producto.precioSubTotal, 0);
console.log(totalPrecio);
fotterModalPadre.innerHTML= "";
const fotterModal = document.createElement('p');
fotterModal.classList.add('card','card-primary');
fotterModal.setAttribute('id', 'totalPrecio')
fotterModal.textContent = 'Total:$' + totalPrecio;

const botonVaciarCarrito = document.createElement('button');
botonVaciarCarrito.classList.add('btn', 'btn-danger');
botonVaciarCarrito.textContent = "Vaciar Carrito";
botonVaciarCarrito.addEventListener("click", () => {
    carrito = []
    mostrarCarrito()
    total()
});

fotterModalPadre.append(botonVaciarCarrito);
fotterModalPadre.append(fotterModal);
};