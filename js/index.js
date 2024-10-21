let productos = [
    {
        producto: 'bebida',
        tipo: 'coca',
        precio: 1500

    },
    {
        producto: 'bebida',
        tipo: 'pepsi',
        precio: 1000

    },
    {
        producto: 'bebida',
        tipo: 'manaos',
        precio: 710

    },
    {
        producto: 'almacen',
        tipo: 'pan',
        precio: 1200,

    },
    {
        producto: 'almacen',
        tipo: 'fiambre',
        precio: 900,

    },
    {
        producto: 'almacen',
        tipo: 'criollo',
        precio: 6000,

    },
    {
        producto: 'golosina',
        tipo: 'chupetin',
        precio: 300,

    },
    {
        producto: 'golosina',
        tipo: 'chicle',
        precio: 500,

    },
    {
        producto: 'golosina',
        tipo: 'alfajor',
        precio: 700,

    }]



const tipoDePago = [
    {
        tipoPago: "credito",
        interes: 1.50
    },
    {
        tipoPago: "transferencia",
        interes: 1.10
    },
    {
        tipoPago: "debito",
        interes: 1.15
    },
    {
        tipoPago: "efectivo",
        interes: 0.90
    },
]






let eventoARealizar = prompt("Que Operacion desea realizar Comprar o Agregar");
let productoElegido = "";

let eleccion = false;

while (eleccion == false) {




    switch (eventoARealizar.toLocaleLowerCase()) {
        case "comprar":
            productoElegido = prompt("Que producto desea comprar (GOLOSINA - ALMACEN - BEBIDA)");
            eleccion = true;
            break;
        case "agregar":
            productoElegido = prompt("Que tipo de producto desea agregar (GOLOSINA - ALMACEN - BEBIDA)")
            eleccion = true;
            break;



        default:
            alert("Los datos ingresados son incorrectos o la opcion ingresada no es valida")
            eventoARealizar = prompt("Que Operacion desea realizar Comprar o Agregar");
            eleccion = false;
    }

}



let formaDePago;
let precioCarrito = [];
let acumulado = 0;

let agregarACarrito = true;

console.log(productoElegido)

if (eventoARealizar.toLocaleLowerCase() === 'comprar') {
    while (agregarACarrito == true) {
        let nuevoArrayProducto = [];
        let productoIngresado = "";
        let cantidadProducto = 0;
        let anadirProducto;
        if ((productos.some((producto) => producto.producto === productoElegido.toLocaleLowerCase())) == true) {
            switch (productoElegido.toLocaleLowerCase()) {

                case "bebida":

                    for (const producto of productos) {
                        if (producto.producto === 'bebida') {

                            nuevoArrayProducto.push(producto.tipo),
                                alert(`Los productos disponbibles son:  ${producto.tipo} y su valor es de: ${producto.precio}`)
                        }

                    }


                    productoIngresado = prompt("Que bebida desea sumar al carrito: " + nuevoArrayProducto.join(" / ")).toLocaleLowerCase()

                    productos.forEach(producto => {
                        
                        if (producto.tipo.includes(productoIngresado)) {
                            cantidadProducto = parseInt(prompt("Ingrese la cantidad de producto que desea comprar"))
                            precioCarrito.push((producto.precio) * cantidadProducto)

                        }
                    })

                    break;
                case "almacen":

                    for (const producto of productos) {
                        if (producto.producto === 'almacen') {

                            nuevoArrayProducto.push(producto.tipo),
                                alert(`Las productos disponbibles son:  ${producto.tipo} y su valor es de: ${producto.precio}`)
                        }

                    }
                    productoIngresado = prompt("Que producto desea sumar al carrito: " + nuevoArrayProducto.join(" / ")).toLocaleLowerCase()

                    productos.forEach(producto => {

                        if (producto.tipo.includes(productoIngresado)) {
                            cantidadProducto = parseInt(prompt("Ingrese la cantidad de producto que desea comprar"))
                            precioCarrito.push((producto.precio) * cantidadProducto)
                        }
                    })
                    break;
                case "golosina":
                    for (const producto of productos) {
                        if (producto.producto === 'golosina') {

                            nuevoArrayProducto.push(producto.tipo),
                                alert(`Las bebidas disponbibles son:  ${producto.tipo} y su valor es de: ${producto.precio}`)
                        }

                    }

                    productoIngresado = prompt("Que golosina desea sumar al carrito: " + nuevoArrayProducto.join(" / ")).toLocaleLowerCase()

                    productos.forEach(producto => {
                        if (producto.tipo.includes(productoIngresado)) {
                            cantidadProducto = parseInt(prompt("Ingrese la cantidad de golosinas que desea comprar"))
                            precioCarrito.push((producto.precio) * cantidadProducto)
                        }
                    })
                    break;

                default:



            }
            acumulado = precioCarrito.reduce((acum, num) => acum + num, 0);


            anadirProducto = prompt("Desea añadir otro producto al carrito (SI - NO)");
            if (anadirProducto.toLocaleLowerCase() === 'si') {
                productoElegido = prompt("Que producto desea comprar (GOLOSINA - ALMACEN - BEBIDA");
            } else {
                agregarACarrito = false;

            }



           



        } else {

            productoElegido = prompt("Producto ingresado es incorrecto, por favor indique tipo de producto desea elegir (GOLOSINA - ALMACEN - BEBIDA")
        }
        
    }
    alert(acumulado)
    formaDePago = prompt("ingrese forma de pago (CREDITO , DEBITO , TRANSFERENCIA , EFECTIVO)").toLowerCase()

    tipoDePago.forEach(pago => {
        if (pago.tipoPago.includes(formaDePago)) {
            alert(`El monto total para la forma de pago seleccionada ${pago.tipoPago} , es de $ ${Math.ceil(acumulado * pago.interes)} `)
        }
    })
} else {
    let producto;
    let tipoProducto;
    let precioProducto;

    switch (productoElegido.toLocaleLowerCase()) {

        case "bebidas":

            tipoProducto = prompt("Ingrese el nombre del producto a agregar");
            precioProducto = parseInt(prompt("Ingrese precio del producto"));
            productos.push({ producto: 'bebida', tipo: tipoProducto, precio: precioProducto })
            console.log(productos)

            break;
        case "almacen":
            tipoProducto = prompt("Ingrese el nombre del producto a agregar");
            precioProducto = parseInt(prompt("Ingrese precio del producto"));
            productos.push({ producto: 'almacen', tipo: tipoProducto, precio: precioProducto })
            console.log(productos)
            break;
        case "golosinas":
            tipoProducto = prompt("Ingrese el nombre del producto a agregar");
            precioProducto = parseInt(prompt("Ingrese precio del producto"));
            productos.push({ producto: 'golosina', tipo: tipoProducto, precio: precioProducto })
            console.log(productos)
            break;

        default:
            alert("el producto ingresado no es valido")
            producto = prompt("Ingrese el nuevo producto")
            tipoProducto = prompt("Ingrese el nombre del producto a agregar");
            precioProducto = parseInt(prompt("Ingrese precio del producto"));
            productos.push({ producto: producto, tipo: tipoProducto, precio: precioProducto })
    }
}

