"use strict" //activo modo estricto
import {Router}  from './router.js'

class Controlador{

    constructor() {
		$(document).ready(this.iniciar.bind(this))
        this.router=new Router;
        //Ejecutamos el mostrarInicio para que muestre la vista del inicio
        this.mostrarInicio()
	}

    /**
     * Método que inicia la web y añede los métodos a los botones 
     */
    iniciar(){

        //Nav
        let boton= document.getElementById('inscripciones')
        console.log(boton)
        boton.onclick=this.mostrarInscripciones.bind(this)
        let inicio= document.getElementById('inicio')
        inicio.onclick=this.mostrarInicio.bind(this)
        let clasificacion= document.getElementById('clasificacion')
        clasificacion.onclick=this.mostrarClasificacion.bind(this)
        let fotos= document.getElementById('fotos')
        fotos.onclick=this.mostrarFotos.bind(this)
    }

    /**
     * Método que muestra la vista Inicio
     */
    mostrarInicio(){
        this.router.cargar("inicio")
    }

    /**
     * Método que muestra la vista Inscripciones
     */
    mostrarInscripciones(){
        this.router.cargar("inscripcion")
    }

    /**
     * Método que muestra la vista Clasificación
     */
    mostrarClasificacion(){
        this.router.cargar("clasificacion")
    }

    /**
     * Método que muestra la vista fotos
     */
    mostrarFotos(){
        this.router.cargar("fotos")
    }
    
}
const app= new Controlador()