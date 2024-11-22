let productos = [
  {
    id: 1,
    producto: 'bebida',
    tipo: 'coca',
    precio: 1500,
    img: "../img/coca.png"
  },
  {
    id: 2,
    producto: 'bebida',
    tipo: 'pepsi',
    precio: 1000,
    img: "../img/pepsi.png"
  },
  {
    id: 3,
    producto: 'bebida',
    tipo: 'sprite',
    precio: 710,
    img: "../img/sprite.png"

  },
  {
    id: 4,
    producto: 'almacen',
    tipo: 'pan',
    precio: 1200,
    img: "../img/pan.png"
  },
  {
    id: 5,
    producto: 'almacen',
    tipo: 'fiambre',
    precio: 900,
    img: "../img/fiambres.png"
  },
  {
    id: 6,
    producto: 'almacen',
    tipo: 'criollo',
    precio: 6000,
    img: "../img/criollo.png"
  },
  {
    id: 7,
    producto: 'golosina',
    tipo: 'chupetin',
    precio: 300,
    img: "../img/chupetin.png"
  },
  {
    id: 8,
    producto: 'golosina',
    tipo: 'chicle',
    precio: 500,
    img: "../img/chicles.png"
  },
  {
    id: 9,
    producto: 'golosina',
    tipo: 'alfajor',
    precio: 700,
    img: "../img/alfajor.png"
  }]


const cart = [];

const listaProductos = document.getElementById('list-producto');
const itemsCarrito = document.getElementById('items-carrito');
const precioSubTotal = document.getElementById('precio-subtotal');
const contadorCarrito = document.getElementById('contador-carrito');
const carritoSeccion = document.getElementById('carrito');
const carritoIcono = document.getElementById('icono-carrito');
const precioSubTotalPago = document.getElementById('precio-subtotal-pago');
const precioTotal = document.getElementById("precio-total-pago")
const seccionPago = document.getElementById('forma-pago');
const intereses = document.getElementById("intereses-forma-pago");






//Carga de productos
const seccionLista = document.getElementById('contenedor');
const contenedor = document.createElement('div');
seccionLista.appendChild(contenedor);
contenedor.className = "listaProductos"
contenedor.innerHTML = `
                          <h2>Elegir Productos</h2>
                          <select id="tipo">
                            <option selected value="bebida">Bebida</option>
                            <option value="golosina">Golosina</option>
                           <option value="almacen">Almacen</option>
                         </select>
`
function cargarProductos() {
  let select = document.getElementById('tipo');
  renderizarProductos('bebida')

  select.addEventListener('change',
    function () {
      let selectedOption = this.options[select.selectedIndex];

      renderizarProductos(selectedOption.value)
    });

}
cargarProductos();
function renderizarProductos(productoElegido) {
  vaciarLista()
  productos.forEach(producto => {
    if (producto.producto === productoElegido) {
      const listProducto = document.createElement('div');
      listProducto.innerHTML = ''
      listProducto.classList.add('card-producto');
      listProducto.innerHTML = `
          <img src="${producto.img}" alt="${producto.tipo}">
          <h3>${producto.tipo.toLocaleUpperCase()}</h3>
          <p >Precio: $${producto.precio}</p>
          <button id ="btnAgregarCarrito" onclick="agregarProductoLocalStorage(${producto.id})">Agregar al carrito</button>
      `;
      listaProductos.appendChild(listProducto);
    }
  });


}

//Carrito de Compras
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('historialCarrito')) || [];
  itemsCarrito.innerHTML = '';
  carrito.forEach((producto) => {


    const li = document.createElement('li');
    li.className = "li-carrito"
    if (producto.cantidad !== 0) {
      li.innerHTML = `
        ${producto.tipo.toLocaleUpperCase()} - $${producto.precio} x ${producto.cantidad}
        <button id="btnEliminarCarrito" onclick ="eliminarDelCarrito(${producto.id})"> Eliminar </button>`;

      itemsCarrito.appendChild(li)
      actualizarContador()
      actualizarTotal()
    }

  });

}
function eliminarDelCarrito(indice) {
  const carrito = JSON.parse(localStorage.getItem('historialCarrito')) || [];
  carrito.forEach((producto) => {
    if (producto.id === indice) {
      producto.cantidad -= 1;
      localStorage.setItem('historialCarrito', JSON.stringify(carrito));
      Toastify({
        text: `El producto fue eliminado correctamente`,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "black",
      }).showToast();
    }
  })
  actulizarCarrito()
}
function actulizarCarrito() {
  mostrarCarrito()
  actualizarTotal();
  actualizarContador();
}
function agregarProductoLocalStorage(id) {
  const carrito = JSON.parse(localStorage.getItem('historialCarrito')) || [];
  const producto = productos.find(prod => prod.id === id);
  Toastify({
    text: `Producto agregado al carrito`,
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "black",
  }).showToast();
  const productoEnCarrito = carrito.find(prod => prod.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 }); 
  }

  localStorage.setItem('historialCarrito', JSON.stringify(carrito));

  mostrarCarrito()
}
function actualizarLocalStorage(){

}

//Total y Forma de Pago
function actualizarTotal() {
  const carrito = JSON.parse(localStorage.getItem('historialCarrito')) || [];
  const total = carrito.reduce((acum, pruducto) => acum + (pruducto.precio * pruducto.cantidad), 0);
  precioSubTotal.textContent = total;
}
function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem('historialCarrito')) || [];
  let contadorProductos = 0;
  carrito.forEach((producto) => {
    contadorProductos += producto.cantidad
  })
  contadorCarrito.textContent = `${contadorProductos} `;

}
function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem('historialCarrito')) || [];
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrito Vacio',
      text: 'No existen productos'
    })
  } else {
    Swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Compra En Proceso',
      text: 'Reedireccionando a Forma de Pago'
    }).then(() => {
      carrito.length = 0;

    })
    precioSubTotalPago.textContent = precioSubTotal.textContent;
    precioTotal.textContent = precioSubTotal.textContent;
    formaPago()
  }

  mostrarCarrito()
  localStorage.clear()
  contadorCarrito.textContent = '0';
  precioSubTotal.textContent = 0
  carritoSeccion.style.display = 'none'


}
function formaPago() {
  seccionPago.style.display = 'flex';
  const seccionformaPago = document.getElementById('items-forma-pago');
  seccionformaPago.innerHTML = ""
  const liPago = document.createElement('li');
  seccionformaPago.appendChild(liPago);
  liPago.className = "liPago";
  liPago.innerHTML = `
  <select id="tipoPago">
              <option selected value=${50}>Credito</option>
              <option value=${15}>Debito</option>
               <option value=${10}>Transferencia</option>
               <option value=${-10} >Efectivo</option>
          </select>
  
  `
  let select = document.getElementById('tipoPago');
  calcularTotal(50);
  select.addEventListener('change',
    function () {
      let selectedOption = this.options[select.selectedIndex];
      console.log(selectedOption.value);
      calcularTotal(selectedOption.value);
    })
}

function calcularTotal(porcentaje) {
  let interes = 0;
  if (porcentaje >= 0) {
    interes = (parseInt(precioSubTotalPago.textContent) / 100) * porcentaje;
    intereses.textContent = `${interes} Recargo de ${porcentaje}%`
    precioTotal.textContent = (parseInt(precioSubTotalPago.textContent) + interes)
  } else {
    interes = (parseInt(precioSubTotalPago.textContent) / 100) * porcentaje;
    intereses.textContent = `${interes} Descuento de ${porcentaje}%`
    precioTotal.textContent = (parseInt(precioSubTotalPago.textContent) + interes)
  }
}

function finalizarPago() {
  localStorage.clear()
  mostrarCarrito()
  seccionPago.style.display = 'none';
  contadorCarrito.textContent = '0';
  precioSubTotal.textContent = 0
  Swal.fire({
    icon: 'success',
    title: 'Pago Aprobado',
    text: 'Lo Esperamos de Nuevo'
  })
}
//Funciones Auxiliares
function vaciarLista() {
  listaProductos.innerHTML = "";
}
function alternarCarrito() {
  carritoSeccion.style.display = carritoSeccion.style.display === 'none' || '' ? 'block' : 'none'
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarCarrito()
})
