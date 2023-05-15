"use strict" //activo modo estricto
import {InscripcionModel} from '../../modelos/inscripcionModel.js'
export class VistaInscripcion{
    inscripciones = [];
    inscripcionCounter = 1;
    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    async iniciar(controlador){
        this.div=document.getElementById('inscripcion')
        console.log(this.div)
        console.log(this.controlador)
        let datos=await this.controlador.sacarCategorias()
        console.log(datos)
        this.aceptarInscripciones = document.getElementById('aceptarInscripciones')
        this.aceptarInscripciones.onclick = this.guardarDatosInscripciones.bind(this)
        this.fecha=document.getElementById('fecha')
        fecha.onchange=this.cargarCategoria.bind(this,datos)
        this.btnAnadirInscripcion = document.getElementById('btnAnadirInscripcion')
        this.btnAnadirInscripcion.onclick = this.anadirInscripcion.bind(this)

        let h1 = document.createElement('h1');
        h1.classList.add('d-flex', 'flex-column', 'text-center');
        h1.textContent = `INSCRIPCIÓN ${this.inscripcionCounter}`;

        let divInscripcion = document.getElementById('divInscripcion-inscripcion-1');
        divInscripcion.children[0].appendChild(h1);
    }

    cargarCategoria(datos){

        this.categoria='-Seleccione fecha-'
        this.precio='-Seleccione fecha-'

        // console.log(datos.data)
        // console.log(this.fecha.value)
        let fechaIntroducida = new Date( this.fecha.value )
        let anio=fechaIntroducida.getFullYear()
        let anioActual= new Date().getFullYear();

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
        let categoria=document.getElementById('categoria')
        categoria.placeholder=this.categoria
        let precio=document.getElementById('precio')
        precio.placeholder=this.precio
    }

    anadirInscripcion(){
        this.inscripcionCounter ++;
        let id = `inscripcion-${this.inscripcionCounter}`;

        for(let i=1; i<this.inscripcionCounter; i++){
            if (document.getElementById(`collapseInscripcion-inscripcion-${i}`).classList.contains('show')) {
                document.getElementById(`collapseInscripcion-inscripcion-${i}`).classList.remove('show');
            }
        }

        let newDiv = document.createElement('div');
        newDiv.classList.add('card','card-responsive','mt-5');
        newDiv.id = `divInscripcion-inscripcion-${this.inscripcionCounter}`;

        let divInscripcion = document.getElementById(`divInscripcion-inscripcion-${this.inscripcionCounter-1}`);
        newDiv.innerHTML = divInscripcion.innerHTML;
        divInscripcion.after(newDiv);
        newDiv.children[0].querySelector('i').setAttribute('href',`#collapseInscripcion-${id}`);
        newDiv.children[1].id =`collapseInscripcion-${id}`;

        newDiv.querySelector('h1').textContent = `INSCRIPCIÓN ${this.inscripcionCounter}`;

        newDiv.querySelector('#collapseInscripcion-' + id).classList.add('show');
    }

    /*guardarDatosInscripciones(){
        console.log('Añadiendo inscripción...');
        console.log(document.getElementsByTagName('input')[1].value);

        //Valor radiobutton
        var generoRadios = document.getElementsByName('genero');
        var generoSeleccionado;
        for (var i = 0; i < generoRadios.length; i++) {
            if (generoRadios[i].checked) {
                generoSeleccionado = generoRadios[i].value;
                break;
            }
        }
        //Valor Select
        var camisetaSelect = document.getElementById('camiseta');
        var tallaCamisetaSeleccionada = camisetaSelect.options[camisetaSelect.selectedIndex].value;

        this.inscripciones.push(new InscripcionModel(
            document.getElementsByTagName('input')[0].value,//nombre
            document.getElementsByTagName('input')[1].value,//apellidos
            generoSeleccionado,//genero
            document.getElementsByTagName('input')[4].value,//fecha
            document.getElementsByTagName('input')[5].value,//categoria
            document.getElementsByTagName('input')[6].value,//precio
            tallaCamisetaSeleccionada,//camiseta
            document.getElementsByTagName('input')[7].value,//dni
            document.getElementsByTagName('input')[8].value,//email
            document.getElementsByTagName('input')[9].value,//telefono
            document.getElementsByTagName('textarea')[0].value,//info
        ))

        console.log(this.inscripciones)
    }*/

    guardarDatosInscripciones() {
        console.log('Guardando datos de inscripciones...');

        this.inscripciones = [];

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
                inputs[6].value, // precio
                camisetaSelect.options[camisetaSelect.selectedIndex].value, // camiseta
                inputs[7].value, // dni
                inputs[8].value, // email
                inputs[9].value, // telefono
                textarea.value // info
            );

            this.inscripciones.push(nuevaInscripcion);
        }

        console.log(this.inscripciones);
    }
}