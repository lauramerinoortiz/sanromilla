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
        document.getElementById('navTop').classList.remove('d-none');
        this.div=document.getElementById('home')

        this.comprobarRoles();

    }

    /**
     * Método para ir a la vista pagos.
     */
    goToPagos(){
        this.controlador.mostrarPagos();
    }

    comprobarRoles(){
        let token = sessionStorage.getItem('token')
        let datosToken= JSON.parse (atob (token.split('.')[1]));

        for (let rol of datosToken.roles){
            if (rol.id_rol === 1) {
                document.getElementById('div-principal-home').classList.remove('d-none');
                document.getElementById('item-nav-home').classList.remove('d-none');
                document.getElementById('item-nav-fotos').classList.remove('d-none');
                document.getElementById('linkPagos').classList.remove('d-none');
                document.getElementById('item-nav-datos').classList.remove('d-none');
                document.getElementById('item-nav-categorias').classList.remove('d-none');
                document.getElementById('item-nav-inscripciones').classList.remove('d-none');

                break;
            }

        }
        document.getElementById('div-principal-home').classList.remove('d-none');
    }

}