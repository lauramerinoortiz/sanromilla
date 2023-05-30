"use strict" //activo modo estricto
export class Pago{
      
    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
        
    }

    /**
     * Método que inicia la vista
     * @param {*} controlador 
     */
    async iniciar(controlador){
        console.log('inicio')
        this.div=document.getElementById('pago')

        this.btnBuscar = document.getElementById('buscar');
        this.btnBuscar.onclick = this.buscarInscripciones.bind(this);
        

    }

    async buscarInscripciones(){
        console.log('Holaaaaa')
        var inputBuscar = $('#codigoBuscar').val();
        console.log(inputBuscar)

        this.datos=await this.controlador.getInscripciones(inputBuscar)
        console.log(this.datos.data)
        
        if(this.datos.data.length!=0){
            console.log('hay')
            this.introDatos(this.datos.data)
        }else{
            console.log('no hay')
            $('#tabla-datos > tbody').empty();
            var fila = document.createElement("tr")
            var inscripcion = document.createElement("td")
            inscripcion.colSpan =5
            inscripcion.textContent = 'No hay datos con esa búsqueda.'
            fila.appendChild(inscripcion)
            console.log(fila)
            var tbody= document.getElementById("tabla-datos").getElementsByTagName("tbody")[0]
            tbody.appendChild(fila)
            console.log(tbody)
            document.getElementsByClassName('card')[0].setAttribute('style', 'display:none !important');
            
        }
    }

    /**
     * Método para introducir los datos en la tabla
     * @param datos = array de datos
     */
    introDatos(datos){
        let importe=0
        console.log('voy a introducir los datos...')

        var tbody = document.getElementById("tabla-datos").getElementsByTagName("tbody")[0]

        $('#tabla-datos > tbody').empty();

        // Recorre el array de datos y agrega las filas a la tabla
        datos.forEach(function(dato) {
            importe+=dato.importe
            // Crea una nueva fila <tr>
            var fila = document.createElement("tr")

            // Agrega las celdas <td> con los datos correspondientes
            var inscripcion = document.createElement("td")
            inscripcion.textContent = dato.codigo_inscripcion
            fila.appendChild(inscripcion)

            var dorsal = document.createElement("td")
            var inputDorsal = document.createElement("input")
            inputDorsal.setAttribute("type", "text")
            inputDorsal.setAttribute("placeholder", "nº dorsal")
            inputDorsal.classList.add("text-center")
            dorsal.appendChild(inputDorsal)
            fila.appendChild(dorsal)

            var nombre = document.createElement("td")
            nombre.textContent = dato.nombre + ' ' + dato.apellidos
            fila.appendChild(nombre)

            var camiseta = document.createElement("td")

            camiseta.textContent = (dato.talla_camiseta == null) ? '-' : dato.talla_camiseta

            // camiseta.textContent = dato.talla_camiseta
            fila.appendChild(camiseta)

            var euros = document.createElement("td")
            euros.textContent = dato.importe
            fila.appendChild(euros)

            // Agrega la fila a la tabla
            tbody.appendChild(fila)
        })   
        document.getElementsByClassName('card')[0].setAttribute('style', 'display:block !important');
        
        $('#total').text(importe+'€')
    }

    

}