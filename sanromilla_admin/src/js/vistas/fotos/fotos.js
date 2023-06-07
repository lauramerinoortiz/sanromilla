"use strict" //activo modo estricto
export class Fotos {

    constructor(controlador) {
        this.controlador = controlador
        window.setTimeout(this.iniciar.bind(this), 500)
    }

    /**
     * Método que inicia la vista
     * @param {*} controlador
     */
    async iniciar(controlador) {
        this.div = document.getElementById('fotos')
        this.fotosFormData = new FormData;
        this.activeNavbar();
        //Guardar página para recargar
        this.saveViewState();


        const dropzone = document.getElementById("dropzone");
        const archivos = document.getElementById("archivos");
        const fotos = document.getElementById("fotos");

        document.getElementById('btnSubirImagenes').addEventListener('click', (event) =>
            subirImagenes(event, this.controlador, this.fotosFormData)
        );


        dropzone.addEventListener("dragover", handleDragOver);
        dropzone.addEventListener("drop", handleDrop);
        archivos.addEventListener("change", (event) =>
            handleFileSelect(event, this.controlador, this.fotosFormData)
        );

        const self = this;

        function handleDragOver(event) {
            event.preventDefault();
            dropzone.classList.add("dragover");
        }

        function handleDrop(event) {
            event.preventDefault();
            dropzone.classList.remove("dragover");
            handleFileSelect(event);
        }

        const handleFileSelect = (event) => {

            const listado_archivos =
                event.target.id == "archivos" ? archivos.files : event.dataTransfer.files;

            for (let file of listado_archivos) {
                this.fotosFormData.append("files[]", file);
                mostrarVistaPrevia(file);
            }
            console.log(this.fotosFormData);
        }

        const subirImagenes = (event) => {
            let categoria = document.getElementById('selectCategoria').value
            if (this.fotosFormData.entries().next().done){
                Swal.fire({
                    title: 'Aviso',
                    text: 'No ha seleccionado ninguna imagen.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                });
                return null;
            }

            Swal.fire({
                title: '¿Está seguro?',
                text: "Este cambio no podrá ser revertido",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, lo estoy'
            }).then((result) => {
                if (result.isConfirmed) {
                    self.controlador.subirFotos(this.fotosFormData, categoria)
                        .then(response => {
                            Swal.fire(
                                '¡Subidas!',
                                'Las imágenes han sido subidas',
                                'success'
                            )
                            this.fotosFormData.delete('files[]');
                            this.fotosFormData.delete('categoria');
                            document.getElementById("vistas-previas").innerHTML = "";
                        })
                        .catch(e => {
                            Swal.fire({
                                title: 'Subida fallida',
                                text: 'Inténtelo de nuevo más tarde.',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        })
                }
            })


            archivos.value = "";
        }

        function mostrarVistaPrevia(file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const vistaPrevia = document.createElement("img");
                vistaPrevia.style.width = "96px";
                vistaPrevia.style.height = "96px";
                vistaPrevia.style.margin = "8px";
                vistaPrevia.src = event.target.result;
                vistaPrevia.classList.add("vista-previa");

                // Evento click: aumentar el tamaño de la imagen al hacer clic
                vistaPrevia.addEventListener("click", function () {
                    this.style.width = "250px";
                    this.style.height = "250px";
                });

                // Evento mousedown: restaurar el tamaño original al hacer clic fuera de la imagen
                document.addEventListener("mousedown", function (event) {
                    if (!vistaPrevia.contains(event.target)) {
                        vistaPrevia.style.width = "96px";
                        vistaPrevia.style.height = "96px";
                    }
                });

                document.getElementById("vistas-previas").appendChild(vistaPrevia);
            };
            reader.readAsDataURL(file);
        }
    }



    /**
     * Para mostrar el item del navbar activo
     */
    activeNavbar() {
        document.getElementById('navTop').classList.remove('d-none');
        document.getElementById('linkHome').classList.remove('active');
        document.getElementById('linkFotos').classList.add('active');
        document.getElementById('linkPagos').classList.remove('active');
        document.getElementById('linkCarrera').classList.remove('active');
        document.getElementById('linkCategorias').classList.remove('active');
        document.getElementById('linkInscripciones').classList.remove('active');
    }

    /**
     * Guarda la vista antes de recargar
     */
    saveViewState() {
        var bodyHTML = document.body.innerHTML;
        localStorage.setItem('lastView', bodyHTML);
    }

}