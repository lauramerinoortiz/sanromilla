"use strict" //activo modo estricto
import {Router}  from './router.js'
import {Modelo}  from '../modelos/modelo.js'
import { VistaInscripcion } from '../vistas/inscripcion/vistainscripcion.js'
import {VistaPago} from '../vistas/pago/vistapago.js'
import {VistaConfirmacion} from '../vistas/confirmacion/vistaconfirmacion.js'

export class Controlador{

    constructor() {
		$(document).ready(this.iniciar.bind(this))
        this.router=new Router;
        this.modelo=new Modelo;
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
        let icono= document.getElementById('sanromilla')
        icono.onclick=this.mostrarInicio.bind(this)
        let clasificacion= document.getElementById('clasificacion')
        clasificacion.onclick=this.mostrarClasificacion.bind(this)
        let fotos= document.getElementById('fotos')
        fotos.onclick=this.mostrarFotos.bind(this)
        
    }

    /**
     * Método que oculta el menú
     * Como el menú está hecho con bootstrap, trae por defecto algunas clase como la de show que es la que muestra el desplegable del menu
     * Con este método le quitamos esa tabla cuando hacemos click a alguna opción del menu
     */
    ocultarMenu(){
        let desplegable=$('#collapsibleNavbar')
        desplegable.removeClass('show');
    }

    /**
     * Método que muestra la vista Inicio
     */
    async mostrarInicio(){
        this.router.cargar("inicio")
        this.ocultarMenu()
    }

    /**
     * Método que muestra la vista Inscripciones
     */
    mostrarInscripciones(datos){
        this.ocultarMenu()
        this.router.cargar("inscripcion")
        //Vista Inscripción
        this.vistaInscripcion=new VistaInscripcion(this, datos)
    }

    /**
     * Método que muestra la vista pago
     */
    mostrarPago(inscripciones){
        this.ocultarMenu()
        this.router.cargar("pago")
        this.vistaPago=new VistaPago(this,inscripciones)
    }

    /**
     * Método que muestra la vista fotos
     */
    mostrarFotos(){
        this.ocultarMenu()
        this.router.cargar("fotos")
    }

    /**
     * Método que muestra la vista clasificacion
     */
    mostrarClasificacion(){
        this.ocultarMenu()
        this.router.cargar('clasificacion')
    }

    /**
     * Método que muestra la vista confirmación
     * @param {array} datos 
     */
    mostrarConfirmacion(datos){
        this.ocultarMenu()
        this.router.cargar("confirmacion")
        this.vistaConfirmacion = new VistaConfirmacion(this, datos)
    }
    
    /**
     * Método que llama al modelo y recibe las categorias de la bbdd
     * @returns array de categorias
     */
    async sacarCategorias(){
        let datos = await this.modelo.getCategorias()
        return datos;
    }

    /**
     * Método que llama al modelo y recibe todos los códigos de la bbdd
     * @returns array
     */
    async sacarCodigos(){
        let datos =await this.modelo.getCodigos()
        return datos.data
    }

    /**
     * PRUEBA!!
     * Método que inserta el código de inscripción en la bbdd
     * @param {int} id 
     * @param {string} codigo 
     */
    async insertarInscripciones(inscripciones, codigo){
        let respuesta = await this.modelo.insertarInscripciones(inscripciones, codigo)
        console.log(respuesta.data);
        if(respuesta.data!=1){
            console.log('Ha ocurrido un error')
        }
    }
}
const app= new Controlador()