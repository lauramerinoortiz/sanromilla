"use strict" //activo modo estricto
import {Router}  from './router.js'
import {Modelo}  from '../modelos/modelo.js'
import { Home } from '../vistas/home/home.js'
import { Pago } from '../vistas/pago/pago.js'
import { Carrera } from '../vistas/carrera/carrera.js'
import { Inicio } from "../vistas/inicio/inicio.js"
import { Fotos } from "../vistas/fotos/fotos.js"
import { EliminarFotos } from "../vistas/eliminarFotos/eliminarfotos.js";

export class Controlador{

    constructor() {
        this.controlador = this.controlador;
		$(document).ready(this.iniciar.bind(this))
        this.router=new Router;
        this.modelo=new Modelo;
        window.addEventListener('load', this.restoreLastView);
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
        let home= document.getElementById('linkHome')
        home.onclick=this.mostrarHome.bind(this)
        let pagos= document.getElementById('linkPagos')
        pagos.onclick=this.mostrarPagos.bind(this)
        let carrera= document.getElementById('linkCarrera')
        carrera.onclick=this.mostrarCarrera.bind(this)
        let cerrarSesion = document.getElementById('logout-nav')
        cerrarSesion.onclick = this.doLogout.bind(this)
        let fotos = document.getElementById('linkFotos')
        fotos.onclick = this.mostrarFotos.bind(this)
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

    /**
     * Muestra la vista de los datos generales de la carrera
     */
    mostrarCarrera(){
        this.ocultarMenu()
        this.router.cargar("carrera")
        this.vistaCarrera = new Carrera(this)
    }

    /**
     * Método que carga la vista de fotos
     */
    mostrarFotos(){
        this.ocultarMenu()
        this.router.cargar("fotos")
        this.vistaFotos = new Fotos(this)
    }

    /**
     * Método que carga la vista para eliminar fotos
     */
    mostrarEliminarFotos(){
        console.log('hola')
        this.ocultarMenu()
        this.router.cargar("eliminarfotos")
        this.vistaEliminarFotos = new EliminarFotos(this)
    }


    /**
     * Método para cerrar la sesión
     */
    doLogout(){
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
        this.mostrarInicio();
    }

    /**
     * Método que llama al modelo para obtener las inscripciones
     * @param {int} codigo 
     * @returns aray
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


    /**
     * Asigna un dorsal a un usuario
     * @param datos
     * @returns {Promise<unknown>}
     */
    async setDorsal(datos){
        let seteado = await this.modelo.setDorsal(datos)
        return seteado;
    }

    /**
     * Método que llama al modelo y recibe las categorias de la bbdd
     * @returns array de categorias
     */
    async getCategorias(){
        let datos = await this.modelo.getCategorias()
        console.log(datos)
        return datos;
    }

    /**
     * Método para realizar el login comprobando usuario en la bbdd
     * @param token
     * @returns {Promise<void>}
     */
    async loginGoogle(credenciales){
        return await this.modelo.doLogin(credenciales)
    }


    /**
     * Recupera la última vista de al recargar
     */
    restoreLastView = () => {
        var lastViewHTML = localStorage.getItem('lastView');
        if (lastViewHTML) {
            document.body.innerHTML = lastViewHTML;
            this.iniciar();
        }
    }

    /**
     * Subida de fotos al servidor
     * @param FD FormData con las imágenes
     * @param categoria id de la categoría elegida
     * @returns {Promise<*|undefined>}
     */
    async subirFotos(FD, categoria){
        return await this.modelo.subirFotos(FD, categoria)
    }

    /**
     * Trae fotos de la base de datos dependiendo de la categoría seleccionada
     * @param categoria
     * @returns {Promise<*>}
     */
    async traerFotos(categoria){
        let datos = await this.modelo.traerFotos(categoria)
        return datos.data
    }

    /**
     * Método para eliminar las fotos seleccionadas de una categoría
     * @param seleccionadas
     * @param categoria
     * @returns {Promise<void>}
     */
    async eliminarFotos(seleccionadas, categoria){
        await this.modelo.eliminarFotos(seleccionadas, categoria);
    }

    /**
     * Método para eliminar todas las fotos de una categoría
     * @param categoria
     * @returns {Promise<void>}
     */
    async eliminarAllFotos(categoria){
        console.log(categoria);
        this.data = await this.modelo.eliminarAllFotos(categoria);
        console.log(this.data)
    }

}
const app= new Controlador()