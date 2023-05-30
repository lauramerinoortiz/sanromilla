"use strict" //activo modo estricto

export class Modelo{
    constructor(){
        this.base_url='./php/index.php/'
    }

    /**
     * Método que pide las categorías de la bbdd
     * @returns array
     */
    async getCategorias(){
        return new Promise(resolve => {
            $.get(this.base_url + 'categorias/'+'getCategorias', {
                
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }


    async getInscripciones(codigo){
        return new Promise(resolve => {
            $.get(this.base_url + 'inscripciones/'+'getInscripciones', {
                codigo:codigo,
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }
}