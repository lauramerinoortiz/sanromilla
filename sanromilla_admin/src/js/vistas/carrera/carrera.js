"use strict" //activo modo estricto
export class Carrera {

    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    /**
     * Método que inicia la vista
     * @param {*} controlador 
     */
    async iniciar(controlador){
        this.div=document.getElementById('carrera')

        this.getInformacion();

        this.btnModificar = document.getElementById('modificar');
        this.btnModificar.onclick = this.modificarInfo();
        this.btnModificar.addEventListener('keypress', function(event) {
            if (event.key === 'Enter'){this.modificarInfo();}
        }.bind(this));

        document.getElementById('navTop').classList.remove('d-none');
        document.getElementById('linkHome').classList.remove('active');
        document.getElementById('linkFotos').classList.remove('active');
        document.getElementById('linkPagos').classList.remove('active');
        document.getElementById('linkCarrera').classList.add('active');
        document.getElementById('linkCategorias').classList.remove('active');
        document.getElementById('linkInscripciones').classList.remove('active');

        //Guardar página para recargar
        this.saveViewState();
    }

    async getInformacion(){
        this.datos=await this.controlador.getInformacion()
        console.log('datos info: ', this.datos.data[0])
        this.introDatos(this.datos.data[0]);
    }

    /**
     * Método que setea los dorsales introducidos
     */
    async modificarInfo(){

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

    activeBtnConfirmar(importe) {
        console.log('quiero')
        console.log(this.btnConfirmar);
        (importe <= 0) ? this.btnConfirmar.classList.add('disabled') : this.btnConfirmar.classList.remove('disabled')
    }

    /**
     * Método para introducir los datos de la información general de la carrera.
     * @param datos
     */
    introDatos(datos) {
        var fechaInput = document.getElementById('fecha');
        var cartelInput = document.getElementById('cartel');
        var reglamentoInput = document.getElementById('reglamento');
        var inicioInscripcionInput = document.getElementById('inicio_inscripcion');
        var finInscripcionInput = document.getElementById('fin_inscripcion');
        var precioCamisetaInput = document.getElementById('precio_camiseta');
        var beneficioCamisetaInput = document.getElementById('beneficio_camiseta');

        var timestamp = datos.fecha;

        var partes = timestamp.split(' ');
        var fecha = partes[0];
        var hora = partes[1];

        var fechaInput = document.getElementById('fecha');
        var horaInput = document.getElementById('hora');

        fechaInput.value = fecha;
        horaInput.value = hora;
        //cartelInput.value = datos.cartel;
        //reglamentoInput.value = datos.reglamento;
        inicioInscripcionInput.value = datos.inicio_inscripcion;
        finInscripcionInput.value = datos.fin_inscripcion;
        precioCamisetaInput.value = datos.precio_camiseta;
        beneficioCamisetaInput.value = datos.beneficio_camiseta;

    }
}