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

        // links pagos
        let pagos=document.getElementById('pagos');
        pagos.onclick = this.goToPagos.bind(this);
        var linkPagos = document.getElementById('linkPagos');
        linkPagos.onclick = this.goToPagos.bind(this);

    }

    /**
     * Método para ir a la vista pagos.
     */
    goToPagos(){
        this.controlador.mostrarPagos();
    }

}