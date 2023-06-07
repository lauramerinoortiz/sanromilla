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
     * Método par aretornar las inscripciones según el código.
     * @param tipoBusqueda
     * @param codigo
     * @returns array
     */
    async getInscripciones(tipoBusqueda, codigo){
        return new Promise(resolve => {
            $.get(this.base_url + 'inscripciones/'+'getInscripciones', {
                tipoBusqueda: tipoBusqueda,
                codigo:codigo,
            }, (data) => {
                resolve({
                    data
                });
            });
        });
    }

    /**
     * Método para obtener la información de la carrera
     * @param tipoBusqueda
     * @param codigo
     * @returns {Promise<unknown>}
     */
    async getInformacion(){
        return new Promise(resolve => {
            $.get(this.base_url + 'informacion/'+'getInformacion', (data) => {
                resolve({
                    data
                });
            });
        });
    }

    async getPrecioCamiseta(){
        return new Promise(resolve => {
            $.get(this.base_url + 'informacion/'+'getPrecioCamiseta', (data) => {
                resolve({
                    data
                });
            });
        });
    }

    async setDorsal(datos) {
        return new Promise(resolve => {
            $.ajax({
                url: this.base_url + 'inscripciones/asignarDorsal',
                type: 'POST',
                data: { datos: JSON.stringify(datos) },
                success: function(data) {
                    resolve({ data });
                }
            });
        });
    }

    async modificarInfo(datos) {
        console.log('datos modelojs: ', datos)
        return new Promise(resolve => {
            $.ajax({
                url: this.base_url + 'informacion/modificarInfo',
                type: 'POST',
                // data: { datos: JSON.stringify(datos) },
                data: { datos: datos },
                success: function(data) {
                    resolve({ data });
                }
            });
        });
    }

    async modCartel(datos) {
        console.log('cartel modelojs: ', datos)
        return new Promise(resolve => {
            $.ajax({
                url: this.base_url + 'informacion/modCartel',
                type: 'POST',
                // data: { datos: JSON.stringify(datos) },
                body: datos,
                success: function(data) {
                    resolve({ data });
                }
            });
        });
    }

    async doLogin(token) {
        return new Promise(resolve => {
            $.post({
                url: `${this.base_url}login/comprobarUsuario`,
                data: {token: token},
                success: (data) => {
                    resolve(data);
                    console.log(data)
                },
                error: (error) => {
                    console.log('Error en la solicitud:', error.responseText);
                    resolve(error);
                }
            });
        });
    }
}