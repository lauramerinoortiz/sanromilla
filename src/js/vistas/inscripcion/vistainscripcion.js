"use strict" //activo modo estricto
export class VistaInscripcion{
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

        this.aceptarInscripciones = document.getElementById('aceptarInscripciones')
        this.aceptarInscripciones.onclick = this.guardarDatosInscripciones.bind(this)
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


    guardarDatosInscripciones(){
        this.controlador.mostrarConfirmacion()
    }

}