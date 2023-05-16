"use strict" //activo modo estricto
export class VistaPago{
    constructor(controlador,id){
        this.id_inscripcion=id
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    async iniciar(){
        
        this.codigo=document.getElementById('codigo')
        this.codigo.textContent='espere...'
        this.codigo_inscripcion=Math.floor(Math.random() * 99999);
        let valores=await this.controlador.sacarCodigos()
        // Guardamos los codigos que están en la base de datos en un set
        this.introducidos=new Set(valores)

        // Comprobamos que si el que se ha generado existe, vuelva a generar otro
        while(this.introducidos.has(this.codigo_inscripcion)){
            this.codigo_inscripcion=Math.floor(Math.random() * 99999);
        }

        // Lo insertamos en la vista
        this.codigo.textContent=this.codigo_inscripcion
        console.log(this.id_inscripcion)
        // Introducimos el codigo en el registro de la inscripción
        await this.controlador.insertarCodigo(this.id_inscripcion, this.codigo_inscripcion)
        
    }
}