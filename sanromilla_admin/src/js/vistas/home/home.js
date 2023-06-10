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
        //COGER DATOS USUARIO REGISTRADO
        let token = sessionStorage.getItem('token')
        let datosToken= JSON.parse (atob (token.split('.')[1]));

        document.getElementById('logout-nav').classList.remove('d-none');
        document.getElementById('sesion-nombre').classList.remove('d-none');
        document.getElementById('sesion-nombre').textContent ='Usuario conectado: ' + datosToken.nombre;
        document.getElementById('navTop').classList.remove('d-none');
        this.div=document.getElementById('home')

        this.comprobarRoles(datosToken);

        //CONTROL DE ACTIVE NAV
        document.getElementById('navTop').classList.remove('d-none');
        document.getElementById('linkHome').classList.add('active');
        document.getElementById('linkFotos').classList.remove('active');
        document.getElementById('linkPagos').classList.remove('active');
        document.getElementById('linkCarrera').classList.remove('active');
        document.getElementById('linkCategorias').classList.remove('active');
        document.getElementById('linkInscripciones').classList.remove('active');
        document.getElementById('linkUsuarios').classList.remove('active');

        //Guardar página para recargar
        this.saveViewState();


    }

    /**
     * Método para ir a la vista pagos.
     */
    goToPagos(){
        this.controlador.mostrarPagos();
    }

    comprobarRoles(datosToken){
        for (let rol of datosToken.roles){
            if (rol.id_rol === 1) {
                document.getElementById('item-nav-home').classList.remove('d-none');
                document.getElementById('linkFotos').classList.remove('d-none');
                document.getElementById('linkPagos').classList.remove('d-none');
                document.getElementById('linkCarrera').classList.remove('d-none');
                document.getElementById('linkCategorias').classList.remove('d-none');
                document.getElementById('linkInscripciones').classList.remove('d-none');
                document.getElementById('linkUsuarios').classList.remove('d-none');

                break;
            }

            if(rol.id_rol === 2){
                document.getElementById('linkFotos').classList.remove('d-none');
            }

            if(rol.id_rol === 3){
                document.getElementById('linkPagos').classList.remove('d-none');
            }

        }
        document.getElementById('div-principal-home').classList.remove('d-none');
    }

    saveViewState() {
        var bodyHTML = document.body.innerHTML;
        localStorage.setItem('lastView', bodyHTML);
    }

}