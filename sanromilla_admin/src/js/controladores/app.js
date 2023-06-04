"use strict" //activo modo estricto
import {Router}  from './router.js'
import {Modelo}  from '../modelos/modelo.js'
import { Home } from '../vistas/home/home.js'
import { Pago } from '../vistas/pago/pago.js'
import { Carrera } from '../vistas/carrera/carrera.js'
import {Inicio} from "../vistas/inicio/inicio.js"

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
        let titulo= document.getElementById('sanromillaTitulo')
        titulo.onclick=this.mostrarInicio.bind(this)

        // captura botones nav
        let home= document.getElementById('home')
        home.onclick=this.mostrarHome.bind(this)
        let pagos= document.getElementById('linkPagos')
        pagos.onclick=this.mostrarPagos.bind(this)
        let carrera= document.getElementById('linkCarrera')
        carrera.onclick=this.mostrarCarrera.bind(this)
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
        this.vistaInicio = new Inicio(this)
        this.ocultarMenu()
    }

    /**
     * Método que muestra la vista Home
     */
    mostrarHome(){
        this.ocultarMenu()
        this.router.cargar("home")
        this.vistaHome = new Home(this)
    }

    /**
     * Método que carga la vista de pagos
     */
    mostrarPagos(){
        this.ocultarMenu()
        this.router.cargar("pago")
        this.vistaPago = new Pago(this)
    }

    mostrarCarrera(){
        this.ocultarMenu()
        this.router.cargar("carrera")
        this.vistaCarrera = new Carrera(this)
    }

    /**
     * Método que llama al modelo para obtener las inscripciones
     * @param {int} codigo 
     * @returns 
     */
    async getInscripciones(tipoBusqueda, codigo){
        let datos = await this.modelo.getInscripciones(tipoBusqueda, codigo)
        return datos;
    }

    /**
     * Método para obtener la información de la carrera.
     * @returns {Promise<unknown>}
     */
    async getInformacion(){
        let datos = await this.modelo.getInformacion()
        return datos;
    }

    async setDorsal(datos){
        let seteado = await this.modelo.setDorsal(datos)
        return seteado;
    }

    /**
     * Método para realizar el login comprobando usuario en la bbdd
     * @param token
     * @returns {Promise<void>}
     */
    async loginGoogle(credenciales){
        return await this.modelo.doLogin(credenciales)
    }

}
const app= new Controlador()