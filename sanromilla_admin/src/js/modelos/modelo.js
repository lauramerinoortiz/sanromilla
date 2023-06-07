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
     * @returns {Promise<unknown>}
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

    async subirFotos(FD, categoria) {
        console.log(FD, categoria);
        try {
            FD.append("categoria", categoria)
            const response = await $.ajax({
                url: `${this.base_url}fotos/subirFotos`,
                type: 'POST',
                data: FD,
                processData: false,
                contentType: false,
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log('Error en la solicitud:', error.responseText);
            return error;
        }
    }
}