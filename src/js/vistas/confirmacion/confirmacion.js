"use strict" //activo modo estricto
export class Confirmacion{

    datos = [
        { nombre: 'Laura Merino Ortiz', precio: 4, precio_camiseta: 6, talla: 'M' },
        { nombre: 'Antonio Moruno', precio: 4, precio_camiseta: 0, talla: '' },
        { nombre: 'Javier Florencio', precio: 4, precio_camiseta: 6, talla: 'M' }
    ];
      

    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
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

        this.datos.forEach(function(dato) {
            // elemento div contenedor 
            var div = document.createElement('div');
            div.setAttribute('class', 'rounded bg-warning col-sm-3 m-1 p-3');

            // elemento h4
            var h4 = document.createElement('h4');
            h4.textContent = 'Inscripción ' + contador;
            div.appendChild(h4);

            // párrafos
            var p1 = document.createElement('p');
            p1.textContent = dato.nombre;
            div.appendChild(p1);

            // precio
            var p2 = document.createElement('p');
            p2.textContent = 'Inscripción: ';
            var b1 = document.createElement('b');
            b1.textContent = dato.precio + '€';
            p2.appendChild(b1);
            div.appendChild(p2);

            //camiseta y precio
            if(dato.talla != ''){
                var p3 = document.createElement('p');
                p3.textContent = 'Precio camiseta (' + dato.talla + '): ';
                var b2 = document.createElement('b');
                b2.textContent = dato.precio_camiseta + '€';
                p3.appendChild(b2);
                div.appendChild(p3);
            }
            

            // Agrega el div al contenedor
            grupoInscripciones.appendChild(div);
            contador++
        });
        this.precioTotal()
    }

    precioTotal(){
        console.log('total...')
        var precioTotal = document.getElementById('precioTotal');
        var total = 0;
        for (let dato of this.datos){
            total += dato.precio + dato.precio_camiseta;
        }
        precioTotal.textContent = total + '€';
    }
}