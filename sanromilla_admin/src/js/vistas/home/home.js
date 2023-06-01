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

        let pagos=document.getElementById('pagos')
        pagos.onclick=this.goToPagos.bind(this);
    }

    goToPagos(){
        this.controlador.mostrarPagos();
    }

}