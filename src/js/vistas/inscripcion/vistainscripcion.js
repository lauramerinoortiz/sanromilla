"use strict" //activo modo estricto
import {InscripcionModel} from '../../modelos/inscripcionModel.js'
export class VistaInscripcion{

    constructor(controlador, datos){
        this.controlador=controlador

        /* Lista de inscripciones que vienen de vuelta */
        this.inscripcionesVolver = datos;
        console.log('datos que vienen de vuelta: ', this.inscripcionesVolver);

        window.setTimeout(this.iniciar.bind(this), 500)
    }

    async iniciar(controlador){
        this.div=document.getElementById('inscripcion')
        console.log(this.div)
        console.log(this.controlador)
        this.datos=await this.controlador.sacarCategorias()
        console.log(this.datos)
        this.aceptarInscripciones = document.getElementById('aceptarInscripciones')
        this.aceptarInscripciones.onclick = this.guardarDatosInscripciones.bind(this)
        this.fecha=document.getElementById('fecha')
        this.fecha.onchange=this.cargarCategoria.bind(this,this.datos)

        this.inscripciones = [];
        this.inscripcionCounter = 1;

        this.btnAnadirInscripcion = document.getElementById('btnAnadirInscripcion')
        this.btnAnadirInscripcion.onclick = this.anadirInscripcion.bind(this)

        await this.cargarInscripciones();
    }

    /**
     * Carga la categoría dependiendo del valor introducido en la feha de nacimiento
     * @param datos
     * @param event
     */
    cargarCategoria(datos, event) {

        this.categoria = '-Seleccione fecha-';
        this.precio = '-Seleccione fecha-';

        // console.log(datos.data)
        // console.log(this.fecha.value)
        let fechaIntroducida = new Date(event.target.value);
        let anio = fechaIntroducida.getFullYear();
        let anioActual = new Date().getFullYear();

        for(let dato of datos.data){
            // console.log(dato.edad)
            let edadPersona=anioActual-anio
            // console.log('edadPersona= '+edadPersona)

            if(dato.nombre=='BABYRUNNER' && edadPersona<=dato.edad){
                // console.log('entro en baby')
                this.categoria=dato.nombre
                this.precio=dato.precio+'€'
                break
            }
            else if(dato.nombre=='ABSOLUTA' && edadPersona>=dato.edad){
                // console.log('Entro en abs')
                this.categoria=dato.nombre
                this.precio=dato.precio+'€'
                break
            }
            else if(dato.nombre=='JUVENIL' && edadPersona==dato.edad){
                // console.log('entro en juvenil')
                this.categoria=dato.nombre
                this.precio=dato.precio+'€'
                break
            }
            else {
                if(dato.edad==edadPersona || edadPersona==dato.edad-1){
                    // console.log('entro en resto ')
                    this.categoria=dato.nombre
                    this.precio=dato.precio+'€'
                }
            }
        }
        console.log(this.categoria)
        let categoria = event.target.parentNode.parentNode.querySelector('#categoria');
        categoria.value = this.categoria;
        let precio = event.target.parentNode.parentNode.querySelector('#precio');
        precio.value = this.precio;
    }

    /**
     * Añade una inscripción más al componente
     */
    anadirInscripcion(){
        //Cierra todos los divs que estén abiertos.
        for(let i=1; i<=this.inscripcionCounter; i++){
            if (document.getElementById(`collapseInscripcion-inscripcion-${i}`).classList.contains('show')) {
                document.getElementById(`collapseInscripcion-inscripcion-${i}`).classList.remove('show');
            }
        }

        let newDiv = document.createElement('div');
        newDiv.classList.add('card','card-responsive','mt-5');
        newDiv.id = `divInscripcion-inscripcion-${this.inscripcionCounter + 1}`;
        let divInscripcion = document.getElementById(`divInscripcion-inscripcion-${this.inscripcionCounter}`);
        newDiv.innerHTML = divInscripcion.innerHTML;
        divInscripcion.after(newDiv);
        newDiv.children[0].querySelector('i').setAttribute('href',`#collapseInscripcion-inscripcion-${this.inscripcionCounter + 1}`);
        newDiv.children[1].id =`collapseInscripcion-inscripcion-${this.inscripcionCounter + 1}`;
        newDiv.querySelector('h1').textContent = `INSCRIPCIÓN ${this.inscripcionCounter + 1}`;
        newDiv.querySelector(`#collapseInscripcion-inscripcion-${this.inscripcionCounter + 1}`).classList.add('show');
        this.fecha1=newDiv.querySelector('input[type="date"]');
        this.fecha1.onchange = this.cargarCategoria.bind(this, this.datos);
        this.inscripcionCounter++;
    }

    /**
     * Guarda los datos de las incripciones en un array de objetos y los manda a la la vista de mostrar confirmación.
     */
    guardarDatosInscripciones() {
        // Seleccionar todos los div de inscripción
        const divsInscripcion = document.querySelectorAll('.card-responsive');

        // Iterar sobre cada div de inscripción y extraer la información de los campos de entrada
        for (let i = 0; i < divsInscripcion.length; i++) {
            const inputs = divsInscripcion[i].querySelectorAll('input');
            const textarea = divsInscripcion[i].querySelector('textarea');
            const generoRadios = divsInscripcion[i].querySelectorAll('input[type="radio"][name="genero"]');
            const camisetaSelect = divsInscripcion[i].querySelector('#camiseta');
            let generoSeleccionado = '';

            for (let j = 0; j < generoRadios.length; j++) {
                if (generoRadios[j].checked) {
                    generoSeleccionado = generoRadios[j].value;
                    break;
                }
            }

            const nuevaInscripcion = new InscripcionModel(
                inputs[0].value, // nombre
                inputs[1].value, // apellidos
                generoSeleccionado, // genero
                inputs[4].value, // fecha
                inputs[5].value, // categoria
                inputs[6].value.slice(0, -1),
                camisetaSelect.options[camisetaSelect.selectedIndex].value, // camiseta
                inputs[7].value, // dni
                inputs[8].value, // email
                inputs[9].value, // telefono
                textarea.value // info
            );
            this.inscripciones.push(nuevaInscripcion);
        }
        this.controlador.mostrarConfirmacion(this.inscripciones)
    }

    /**
     * Carga las incripciones que han sido rellenas con anterioridad, cuando un usuario vuelve desde la vista
     * confirmación.
     */
    cargarInscripciones(){
        // Como es una función que se carga al iniciar, primero si la variable ha sido devuelta desde la otra vista confirmación.
        if(this.inscripcionesVolver.length >=1){
            // Se recorren y se cargan todas las incripciones con los datos
            this.inscripcionesVolver.forEach((inscripcion, index) => {
                if(index == 0){
                    this.divInscripcion = document.getElementById('divInscripcion-inscripcion-1');
                }else{
                    this.divInscripcion = document.createElement('div');
                    this.divInscripcion.classList.add('card','card-responsive','mt-5');
                    this.divInscripcion.id = `divInscripcion-inscripcion-${index + 1}`;
                    let divInscripcionAnterior = document.getElementById(`divInscripcion-inscripcion-${index}`);
                    this.divInscripcion.innerHTML = divInscripcionAnterior.innerHTML;
                    divInscripcionAnterior.after(this.divInscripcion);
                    this.divInscripcion.children[0].querySelector('i').setAttribute('href',`#collapseInscripcion-inscripcion-${index + 1}`);
                    this.divInscripcion.children[1].id =`collapseInscripcion-inscripcion-${index + 1}`;
                    this.divInscripcion.querySelector('h1').textContent = `INSCRIPCIÓN ${index+ 1}`;
                    this.divInscripcion.querySelector(`#collapseInscripcion-inscripcion-${index + 1}`).classList.add('show');
                    this.fecha1=this.divInscripcion.querySelector('input[type="date"]');
                    this.fecha1.onchange = this.cargarCategoria.bind(this, this.datos);
                }
                //Establece los campos de tipo text
                this.divInscripcion.querySelector('input[name="nombre"]').value = inscripcion.nombre;
                this.divInscripcion.querySelector('input[name="apellidos"]').value = inscripcion.apellidos;
                this.divInscripcion.querySelector('input[name="fecha"]').value = inscripcion.fechaNac;
                this.divInscripcion.querySelector('input[name="categoria"]').value = inscripcion.categoria;
                this.divInscripcion.querySelector('input[name="precioDorsal"]').value = inscripcion.precioDorsal +'€';
                this.divInscripcion.querySelector('input[name="dni"]').value = inscripcion.dni;
                this.divInscripcion.querySelector('input[name="email"]').value = inscripcion.email;
                this.divInscripcion.querySelector('input[name="telefono"]').value = inscripcion.telefono;
                this.divInscripcion.querySelector('textarea[name="infoAdicional"]').value = inscripcion.infoAdicional;
                this.divInscripcion.querySelectorAll('input[type="radio"][name="genero"]').values();
                //Establece la opción seleccionada del campo género
                const generoRadios = this.divInscripcion.querySelectorAll('input[type="radio"][name="genero"]');
                for (let j = 0; j < generoRadios.length; j++) {
                    if (generoRadios[j].value === inscripcion.genero) {
                        generoRadios[j].checked = true;
                        break;
                    }
                }
                //Establecer la opción seleccionada del campo de selección de camiseta
                const camisetaSelect = this.divInscripcion.querySelector('#camiseta');
                for (let k = 0; k < camisetaSelect.options.length; k++) {
                    if (camisetaSelect.options[k].value === inscripcion.camiseta) {
                        camisetaSelect.selectedIndex = k;
                        break;
                    }
                }
                this.inscripcionCounter++;
                if(index == this.inscripciones.length){
                    this.inscripcionCounter--;
                }
            });
        }
    }
}