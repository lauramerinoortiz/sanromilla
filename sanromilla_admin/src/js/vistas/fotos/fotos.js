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

        this.activeNavbar();
        //Guardar página para recargar
        this.saveViewState();

        document.getElementById('photoInput').addEventListener('change', this.handlePhotoInputChange.bind(this));
        document.getElementById('uploadForm').addEventListener('submit', this.handleFormSubmit.bind(this));
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

    /**
     * Maneja el cambio de la imagen seleccionada
     * @param {*} event
     */
    handlePhotoInputChange(event) {
        var previewContainer = document.getElementById('previewContainer');
        previewContainer.innerHTML = '';

        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();

            reader.onload = function(e) {
                this.createImagePreview(previewContainer, file, e.target.result);
            }.bind(this);

            reader.readAsDataURL(file);
        }
    }

    /**
     * Crea una vista previa de la imagen seleccionada
     * @param {*} container
     * @param {*} file
     * @param {*} result
     */
    createImagePreview(container, file, result) {
        var card = document.createElement('div');
        card.classList.add('card', 'mb-5');
        card.style.width = '124px'; // Establece el ancho deseado para las imágenes
        card.style.height = '124px'; // Establece la altura deseada para las imágenes
        card.style.backgroundImage = `url(${result})`; // Establece la imagen como fondo del card
        card.style.backgroundSize = 'cover'; // Ajusta el tamaño de la imagen al card

        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'h-100');
        cardBody.style.padding = '0px'; // Ajusta el espacio interno del cuerpo de la tarjeta

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'w-100', 'mb-3'); // Agrega la clase 'btn-sm' para hacer el botón más pequeño
        deleteButton.style.position = 'absolute';
        deleteButton.style.bottom = '-48px';
        deleteButton.addEventListener('click', this.removeImagePreview.bind(this, card));

        cardBody.appendChild(deleteButton);
        card.appendChild(cardBody);

        container.appendChild(card);

        // Aplica estilos CSS para mostrar 4 imágenes por fila utilizando CSS Grid
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(8, 1fr)';
        container.style.gridGap = '10px';
    }

    /**
     * Elimina la vista previa de la imagen seleccionada
     * @param {*} img
     * @param {*} deleteButton
     */
    removeImagePreview(img, deleteButton) {
        var previewContainer = document.getElementById('previewContainer');
        previewContainer.removeChild(img);
        previewContainer.removeChild(deleteButton);

        var remainingImages = document.getElementsByClassName('preview-image');
        if (remainingImages.length === 0) {
            document.getElementById('photoInput').value = '';
        }
    }

    /**
     * Maneja el envío del formulario
     * @param {*} event
     */
    handleFormSubmit(event) {
        event.preventDefault();

        var files = document.getElementById('photoInput').files;
        // Aquí puedes agregar la lógica para enviar las fotos al servidor

        // Limpia el formulario y la vista previa
        document.getElementById('photoInput').value = '';
        document.getElementById('previewContainer').innerHTML = '';
    }
}