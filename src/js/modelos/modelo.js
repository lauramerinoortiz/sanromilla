"use strict" //activo modo estricto

export class Modelo{
    constructor(){
        this.base_url='http://localhost/san_romilla/src/php/index.php/'
    }

    getCategorias(){
        return new Promise(resolve => {
            $.get(this.base_url + 'categorias/'+'getCategorias', {
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }
}