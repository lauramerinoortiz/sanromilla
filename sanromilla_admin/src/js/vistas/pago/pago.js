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
        this.div=document.getElementById('pago')

        this.btnBuscar = document.getElementById('buscar');
        this.btnBuscar.onclick = this.buscarInscripciones.bind(this);

        this.btnCancelar = document.getElementById('confirmar');
        this.btnCancelar.onclick = function() {
            console.log('reeeeload')
            location.reload();
        };

        this.btnConfirmar = document.getElementById('confirmar');
        this.btnConfirmar.onclick = this.setDorsal.bind(this);

        var codigoBuscar = document.getElementById('codigoBuscar');
        codigoBuscar.addEventListener('keypress', function(event) {
            if (event.key === 'Enter'){this.buscarInscripciones();}
        }.bind(this));
    }

    async buscarInscripciones(){
        var tipoBusqueda = $('#tipoBusqueda').val();
        var inputBuscar = $('#codigoBuscar').val();

        this.datos=await this.controlador.getInscripciones(tipoBusqueda, inputBuscar)
        console.log(this.datos.data)
        
        if(this.datos.data.length!=0){
            this.introDatos(this.datos.data)
        }else{
            $('#tabla-datos > tbody').empty();
            var fila = document.createElement("tr")
            var inscripcion = document.createElement("td")
            inscripcion.colSpan =5
            inscripcion.textContent = 'No hay ninguna inscripción con ese código o dni.'
            fila.appendChild(inscripcion)
            var tbody= document.getElementById("tabla-datos").getElementsByTagName("tbody")[0]
            tbody.appendChild(fila)
            document.getElementsByClassName('card')[0].setAttribute('style', 'display:none !important');
        }
    }

    /**
     * Método que setea los dorsales introducidos
     */
    async setDorsal(){

        var tabla = document.getElementById("tabla-datos");
        var inputs = tabla.getElementsByTagName("input");
        var datos = [];

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var dorsal = input.value;
            var id = input.getAttribute("id");

            if (dorsal != ''){
                datos.push({ dorsal: dorsal, idInscripcion: id });
            }else{
                Swal.fire({
                    title: 'Dorsales vacíos',
                    text: 'Recuerde rellenar TODOS los dorsales.',
                    icon: 'warning',
                    confirmButtonText: 'Vale!'
                })
                return 0;
            }
        }

        var seteado = await this.controlador.setDorsal(datos);

        if (seteado.data >= 1){
            Swal.fire({
                title: '¡Dorsales asignados!',
                text: 'Se han registrado correctamente los dorsales.',
                icon: 'success',
                confirmButtonText: 'Vale!'
            })
            this.buscarInscripciones();
        }else{
            console.log('Error')
            Swal.fire({
                title: 'Error en la petición',
                text: 'Algo no ha ido bien.',
                icon: 'error',
                confirmButtonText: 'Vale!'
            })
        }
    }

    /**
     * Método para introducir los datos en la tabla
     * @param datos = array de datos
     */
    introDatos(datos){
        let importe=0

        var tbody = document.getElementById("tabla-datos").getElementsByTagName("tbody")[0]

        $('#tabla-datos > tbody').empty();

        // Recorre el array de inscripciones y agrega las filas a la tabla
        datos.forEach(function(dato) {

            // Crea una nueva fila <tr>
            var fila = document.createElement("tr")

            // Agrega las celdas <td> con los datos correspondientes

            // td nºinscripción
            var inscripcion = document.createElement("td")
            inscripcion.textContent = dato.codigo_inscripcion
            fila.appendChild(inscripcion)

            // td nombre
            var nombre = document.createElement("td")
            nombre.textContent = dato.nombre + ' ' + dato.apellidos
            fila.appendChild(nombre)

            // td dorsal
            var dorsal = document.createElement("td")
            if(dato.dorsal === null){
                var inputDorsal = document.createElement("input")
                inputDorsal.setAttribute("type", "text")
                var id = dato.id_inscripcion
                inputDorsal.setAttribute("id", id)
                inputDorsal.setAttribute("placeholder", "nº dorsal")
                inputDorsal.classList.add("text-center")
                dorsal.appendChild(inputDorsal)
                fila.appendChild(dorsal)
            }else{
                dorsal.textContent = dato.dorsal
                fila.appendChild(dorsal)
            }

            // td camiseta
            var camiseta = document.createElement("td")
            camiseta.textContent = (dato.talla_camiseta == null) ? '-' : dato.talla_camiseta
            fila.appendChild(camiseta)

            // td euros
            var euros = document.createElement("td")
            euros.textContent = dato.importe + '€'
            fila.appendChild(euros)

            //funcion para calcular el importe total
            if(dato.estado_pago === 0){
                importe+=dato.importe
            }else{
                fila.style.backgroundColor = 'lightgreen';
            }
            tbody.appendChild(fila)
        })
        document.getElementsByClassName('card')[0].setAttribute('style', 'display:block !important');

        this.activeBtnConfirmar(importe);

        $('#total').text(importe+'€')
    }


    activeBtnConfirmar(importe) {
        console.log('quiero')
        console.log(this.btnConfirmar);
        (importe <= 0) ? this.btnConfirmar.classList.add('disabled') : this.btnConfirmar.classList.remove('disabled')
    }
}