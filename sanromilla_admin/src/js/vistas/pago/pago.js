"use strict" //activo modo estricto
export class Pago{
      
    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    /**
     * Método que inicia la vista
     * @param {*} controlador 
     */
    async iniciar(controlador){
        this.div=document.getElementById('admin')
        // this.btnpagar=document.getElementById('btnPagar')
        // this.btnpagar.onclick=this.irPago.bind(this)
    }

}