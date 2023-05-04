"use strict" //activo modo estricto

export class Modelo{
    constructor(){
        this.base_url='./php/index.php/'
    }

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
    async insertarCodigo(id,codigo){
        return new Promise(resolve => {
            $.get(this.base_url + 'inscripciones/'+'insertarCodigo', {
                id:id,
                codigo:codigo,
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }
}