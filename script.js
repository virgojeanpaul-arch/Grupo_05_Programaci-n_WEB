let carrito = [];
let total = 0;

function agregar() {
    let producto = document.getElementById("producto");
    let cantidad = Number(document.getElementById("cantidad").value);

    if (producto.value == "") {
        alert("Selecciona un producto");
        return;
    }

    if (cantidad < 1) {
        alert("La cantidad debe ser mayor a 0");
        return;
    }

    let nombre = producto.options[producto.selectedIndex].text;
    let precio = Number(producto.value);
    let encontrado = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == nombre) {
            carrito[i].cantidad += cantidad;
            encontrado = true;
            break;
        }
    }

    if (encontrado == false) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        });
    }

    mostrar();
}

function mostrar() {
    let lista = "";
    total = 0;

    for (let i = 0; i < carrito.length; i++) {
        let subtotal = carrito[i].precio * carrito[i].cantidad;
        total += subtotal;

        lista += `
        <div class="item">
            ${carrito[i].nombre} x${carrito[i].cantidad} - S/ ${subtotal}
            <button onclick="eliminar(${i})">🗑️ Eliminar</button>
        </div>`;
    }

    if (carrito.length == 0) {
        lista = "<p>No hay productos agregados.</p>";
    }

    document.getElementById("carrito").innerHTML = lista;
    document.getElementById("total").innerText = total;
}

function eliminar(indice) {
    carrito.splice(indice, 1);
    mostrar();
}

function confirmar() {
    let nombreCliente = document.getElementById("nombre").value;

    if (nombreCliente.trim() == "") {
        alert("Por favor, ingresa tu nombre");
        return;
    }

    if (carrito.length == 0) {
        alert("El carrito está vacío");
        return;
    }

    document.getElementById("mensaje").innerText =
        `¡Gracias por tu compra, ${nombreCliente}! Tu pedido ha sido confirmado por un total de S/ ${total}.`;

    carrito = [];
    total = 0;

    document.getElementById("carrito").innerHTML =
        "<p>No hay productos agregados.</p>";

    document.getElementById("total").innerText = "0";
}
