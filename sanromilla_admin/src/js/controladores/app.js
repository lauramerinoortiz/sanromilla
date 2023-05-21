"use strict" //activo modo estricto
import {Router}  from './router.js'
import {Modelo}  from '../modelos/modelo.js'
import { VistaInscripcion } from '../vistas/inscripcion/vistainscripcion.js'
import {VistaPago} from '../vistas/pago/vistapago.js'
import {Confirmacion} from '../vistas/confirmacion/confirmacion.js'

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
        let home= document.getElementById('admin')
        home.onclick=this.mostrarHome.bind(this)
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
     * Método que muestra la vista Home
     */
    mostrarHome(datos){
        this.ocultarMenu()
        this.router.cargar("home")
        this.vistaHome=new VistaHome(this)
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

}
const app= new Controlador()