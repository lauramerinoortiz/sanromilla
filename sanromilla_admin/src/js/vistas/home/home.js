"use strict" //activo modo estricto
export class Home{
      
    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    /**
     * Método que inicia la vista
     * @param {*} controlador 
     */
    async iniciar(controlador){
        this.div=document.getElementById('home')

        this.pagos=document.getElementById('pagos')
        console.log('btn: ', this.pagos)
        this.pagos.onclick=this.goToPagos.bind(this)
    }

    goToPagos(){
        console.log('hola')
        this.controlador.mostrarPagos();
    }

}