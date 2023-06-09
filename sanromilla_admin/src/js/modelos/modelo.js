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

    /**
     * Método para obtener el precio de la camiseta
     * @returns {Promise<unknown>}
     */
    async getPrecioCamiseta(){
        return new Promise(resolve => {
            $.get(this.base_url + 'informacion/'+'getPrecioCamiseta', (data) => {
                resolve({
                    data
                });
            });
        });
    }

    /**
     * Método para setear el dorsal
     * @param datos
     * @returns {Promise<unknown>}
     */
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

    /**
     * Método para modificar la información de la carrera.
     * @param datos
     * @returns {Promise<unknown>}
     */
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

    /**
     * Método para modificar el cartel.
     * @param datos
     * @returns {Promise<unknown>}
     */
    async modCartel(datos) {
        console.log('cartel modelojsasdf: ', datos)
        try {
            const response = await $.ajax({
                url: `${this.base_url}informacion/subirCartel`,
                type: 'POST',
                data: datos,
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

    async modReglamento(datos) {
        console.log('reglamento modelojsasdf: ', datos)
        try {
            const response = await $.ajax({
                url: `${this.base_url}informacion/subirReglamento`,
                type: 'POST',
                data: datos,
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