"use strict" //activo modo estricto
export class Usuarios {

    constructor(controlador) {
        this.controlador = controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    /**
     * Método que inicia la vista
     * @param {*} controlador
     */
    async iniciar() {
        this.usuarios = [];
        this.getUsuarios();

        this.montarNav()

        //Guardar página para recargar
        this.saveViewState();

        document.getElementById('btn-crear-usuario').addEventListener('click', (event) =>
            this.crearUsuario()
        );
    }

    /**
     * Método para traer un listado de usuarios y roles
     * @returns {Promise<void>}
     */
    async getUsuarios(){
        document.getElementById('tbody-usuarios').innerHTML = '';

        this.usuarios = await this.controlador.getUsuarios();
        console.log(this.usuarios)
        this.usuarios.forEach((usuario) => {
            // Crea una nueva fila en la tabla
            const fila = document.createElement('tr');


            const nombre = document.createElement('td');
            nombre.textContent = usuario.nombre;

            const correo = document.createElement('td');
            const correoCompleto = usuario.correo;
            correo.textContent = correoCompleto.length > 50 ? correoCompleto.substring(0, 35) + '...' : correoCompleto;
            correo.setAttribute('title', correoCompleto);

            const roles = document.createElement('td');
            roles.textContent = usuario.roles;

            const acciones = document.createElement('td');


            const iconoEditar = document.createElement('i');
            iconoEditar.className = 'fa-solid fa-pencil iconos-acciones';
            iconoEditar.classList.add('pointer');
            iconoEditar.setAttribute('id', `editar-${usuario.id_colaborador}`);
            iconoEditar.addEventListener('click', () => {
                this.editarUsuario(usuario.id_colaborador)
            });

            const iconoEliminar = document.createElement('i');
            iconoEliminar.className = 'fa-solid fa-trash-can iconos-acciones';
            iconoEliminar.setAttribute('id', `eliminar-${usuario.id_colaborador}`);
            iconoEliminar.classList.add('pointer');
            iconoEliminar.addEventListener('click', () => {
                this.eliminarUsuario(usuario.id_colaborador, usuario.nombre)
            });

            acciones.appendChild(iconoEditar);
            acciones.appendChild(iconoEliminar);

            // Agrega las celdas a la fila
            fila.appendChild(nombre);
            fila.appendChild(correo);
            fila.appendChild(roles);
            fila.appendChild(acciones);

            // Agrega la fila a la tabla
            const tbody = document.querySelector('tbody');
            tbody.appendChild(fila);
        });
    }

    /**
     * Método para guardar la vista antes de la recarga
     */
    saveViewState() {
        var bodyHTML = document.body.innerHTML;
        localStorage.setItem('lastView', bodyHTML);
    }

    eliminarUsuario(id, nombre){
        Swal.fire({
            title: '¿Está seguro?',
            text: "El colaborador " + nombre
                + " será eliminado y no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, lo estoy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await this.controlador.eliminarUsuario(id);
                    Swal.fire(
                        '¡Eliminado!',
                        'El colaborador ' + nombre
                        + ' ha sido eliminado',
                        'success'
                    );
                    this.getUsuarios();
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar al colaborador. Inténtelo de nuevo más tarde.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        });
    }

    editarUsuario(){
        console.log('editando usuario')
    }

    crearUsuario(){
        console.log('creando usuario')
    }

    montarNav(){
        document.getElementById('navTop').classList.remove('d-none');
        document.getElementById('linkHome').classList.remove('active');
        document.getElementById('linkFotos').classList.remove('active');
        document.getElementById('linkPagos').classList.remove('active');
        document.getElementById('linkCarrera').classList.remove('active');
        document.getElementById('linkCategorias').classList.remove('active');
        document.getElementById('linkInscripciones').classList.remove('active');
        document.getElementById('linkUsuarios').classList.add('active');
    }
}