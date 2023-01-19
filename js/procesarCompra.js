const procesarCompra = document.querySelector("#procesarCompra");
const botonCarrito = document.querySelector("#botonCarrito");
const precio = document.querySelector("#totalPrecio");
const form = document.querySelector("#form");


productosElegidos = JSON.parse(localStorage.getItem("productosElegidos"));
// recorremos el array de productos 
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
                <td>$${precio}</td>
                <td>${elegidos}</td>
                <td>$${precioSubTotal}</td>
            </div>
        </div>
        `
    procesarCompra.append(divCompra);
});
// funcion del precio total
const totalPrecio = productosElegidos.reduce((acumulador, producto) => acumulador + producto.precioSubTotal, 0);
precio.textContent = "$" + totalPrecio

// funcion finalizar compra
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const btn = document.getElementById('button');
const persona = document.querySelector('#persona').value
const email = document.querySelector('#email').value
//si el usuario no llena el input que...
    if(!email === '' || persona === ''){
        Swal.fire({
        title: "¡Debes completar tu email y nombre!",
        text: "Rellena el formulario",
        icon: "error",
        confirmButtonText: "Aceptar",
    })
// si lo llena que se envie un email confirmando la compra
} else {
    emailjs.send("service_hk938ah","template_nv80xgt",{
        persona: persona,
        email: email,
        });

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_nv80xgt';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
        btn.value = 'Send Email';
        Toastify({
            text: "Email Enviado",
            duration: 3000,
            style: {
                background: "#da8a0d",
            }
            }).showToast();
    }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
    });


    const spin = document.querySelector("#spinner");
    spin.classList.add("spin");
    spin.classList.remove("hidden");
    setTimeout(() =>{
        form.reset();
        spin.classList.add("hidden");
        spin.classList.remove("spin");
        Swal.fire({
            icon: 'success',
            title: 'Tu Compra fue Realizada',
            showConfirmButton: false,
            timer: 1500
        });
    },3000);
    setTimeout(() =>{
        location.href = "productos.html";
    },4500);
    localStorage.clear();
}
});



