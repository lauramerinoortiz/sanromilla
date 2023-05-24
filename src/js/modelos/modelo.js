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

    /**
     * Método que pide los códigos de la bbdd
     * @returns array
     */
    async getCodigos(){
        return new Promise(resolve => {
            $.get(this.base_url + 'inscripciones/'+'getCodigos', {
                
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }

    /**
     * PRUEBA!!
     * método que guarda el codigo en la bbdd
     * @param {int} id 
     * @param {string} codigo 
     * @returns array
     */
    async insertarInscripciones(inscripciones,codigo){
        return new Promise(resolve => {
            $.get(this.base_url + 'inscripciones/'+'insertarInscripciones', {
                inscripciones:inscripciones,
                codigo:codigo,
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }

    /**
     * Método que pide las fotos a la bbdd
     * @returns array
     */
    async getFotos(){
        return new Promise(resolve => {
            $.get(this.base_url + 'imagenes/'+'getFotos', {
                
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }
}