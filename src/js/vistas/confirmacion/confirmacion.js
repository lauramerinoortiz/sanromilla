"use strict" //activo modo estricto
export class Confirmacion{

    inscripciones = null;
      
    constructor(controlador, datos){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
        this.inscripciones = datos;
        console.log('datos antonio: ', this.inscripciones);

    }

    async iniciar(controlador){
        this.div=document.getElementById('confirmacion')
        console.log(this.div)
        console.log(this.controlador)

        
        this.cargarDatos()
    }

    cargarDatos(){

        var grupoInscripciones = document.getElementById('grupoInscripciones')

        var contador = 1;

        this.inscripciones.forEach(function(dato) {

            // elemento div contenedor 
            var div = document.createElement('div');
            div.setAttribute('class', 'rounded bg-warning col-sm-3 m-1 p-3');

            // elemento h4
            var h4 = document.createElement('h4');
            h4.textContent = 'Inscripción ' + contador;
            div.appendChild(h4);

            // párrafos
            var p1 = document.createElement('p');
            p1.textContent = dato.nombre +' '+ dato.apellidos;
            div.appendChild(p1);

            // precio
            var p2 = document.createElement('p');
            p2.textContent = 'Inscripción: ';
            var b1 = document.createElement('b');
            b1.textContent = dato.precioDorsal + '€';
            p2.appendChild(b1);
            div.appendChild(p2);

            //camiseta y precio
            if(dato.camiseta != 'null'){
                var p3 = document.createElement('p');
                p3.textContent = 'Precio camiseta (' + dato.camiseta + '): ';
                var b2 = document.createElement('b');
                b2.textContent = '6€';
                p3.appendChild(b2);
                div.appendChild(p3);
            }
            
            // Agrega el div al contenedor
            if(dato.nombre != '' && dato.precioDorsal != ''){
                grupoInscripciones.appendChild(div);
                contador++
            }
        });
        this.precioTotal()
        return true;
    }

    precioTotal(){
        console.log('total...')
        var precioTotal = document.getElementById('precioTotal');
        var total = 0;
        for (let dato of this.inscripciones){
            if(dato.nombre != '' && dato.precioDorsal != ''){
                let dorsal = parseInt(dato.precioDorsal);
                console.log()
                let camiseta = 0
                if(dato.camiseta != 'null'){
                    camiseta = 6;
                }
                total += dorsal + camiseta;
            }
            
        }
        precioTotal.textContent = total + '€';
    }
}