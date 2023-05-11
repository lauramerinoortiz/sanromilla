"use strict" //activo modo estricto
import {InscripcionModel} from '../../modelos/inscripcionModel.js'
export class VistaInscripcion{
    inscripciones = [];
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
        this.fecha=document.getElementById('fecha')
        fecha.onchange=this.cargarCategoria.bind(this,datos)
        this.btnAnadirInscripcion = document.getElementById('btnAnadirInscripcion')
        this.btnAnadirInscripcion.onclick = this.anadirInscripcion.bind(this)
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
            document.getElementsByTagName('input')[2].value,//fecha
            document.getElementsByTagName('input')[3].value,//categoria
            document.getElementsByTagName('input')[4].value,//precio
            tallaCamisetaSeleccionada,//camiseta
            document.getElementsByTagName('input')[6].value,//dni
            document.getElementsByTagName('input')[7].value,//email
            document.getElementsByTagName('input')[8].value,//telefono
            document.getElementsByTagName('input')[9].value,//info
        ))

        console.log(this.inscripciones)
    }
}