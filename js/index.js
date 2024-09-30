/* let usuario ;
 let contraseña;
 let intento=0;
 const maxIntentos=3;
 usuario = prompt("Ingrese Usuario");
 do{
    
     contraseña= prompt("ingresa la contraseña");
     intento++;
     if(usuario ==="Cristian Ruso" && contraseña==="lapyme"){
         console.log("Usuario Correcto")
         break;
     }
     if(usuario !=="Cristian Ruso"){
      
     }
   if(intento>= maxIntentos);{
         console.log("la cantidad de intentos se alcanzo");
         break;
     }
     
 }while(true);*/


let agregarProducto = "si";
let resultado = 0;

while (agregarProducto === "si") {
    let producto = prompt("Ingrese el producto que desea comprar (Golosina - Bebida - Almacen)");
    let cantidad = 0;
    if (producto !== "") {
        cantidad = parseFloat(prompt("ingrese un cantidad de producto"));
        let resultadoParcial = 0;
        switch (producto) {
            case "Golosina":
                resultadoParcial = cantidad * 100
                break;
            case "Bebida":
                resultadoParcial = cantidad * 500
                break;
            case "Almacen":
                resultadoParcial = cantidad * 1000
                break;



            default:
                alert("no encontramos el producto ingresado")

        }
        resultado = resultado + resultadoParcial
        agregarProducto = prompt("Desea Agregar mas Productos");
    } else {
        alert("INGRESE CORRECTAMENTE UN PRODUCTO")
    }
   

}
alert(resultado)

let formaDePago = prompt("ingrese forma de pago (CREDITO , DEBITO , TRANSFERENCIA , EFECTIVO)");

function calcularInteres(formadepago, montoParcial) {
    switch (formadepago) {
        case "CREDITO":
            montoParcial = montoParcial + (montoParcial * 0.20)
            break;
        case "DEBITO":
            montoParcial = montoParcial + (montoParcial * 0.10)
            break;
        case "TRANSFERENCIA":
            montoParcial = montoParcial + (montoParcial * 0.05)
            break;
        case "EFECTIVO":
            montoParcial = montoParcial + (montoParcial * 0.00)
            break;



        default:
            alert("no encontramos forma de pago")

    }
return ("El monto totala traves de " + formadepago + " es de $ "+ montoParcial);
}

alert(calcularInteres(formaDePago,resultado));