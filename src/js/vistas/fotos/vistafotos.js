"use strict" //activo modo estricto

/**
 * Clase de Vista de Fotos
 */
export class VistaFotos{
    constructor(controlador){
        this.controlador=controlador
        window.setTimeout(this.iniciar.bind(this), 250)
    }

    /**
     * Método que inicia la vista 
     */
    async iniciar(){
        this.fotos= await this.controlador.getFotos()
        if(this.fotos.length>0){
            let div1=document.createElement('div')
            let titulo1=document.createElement('h4')
            titulo1.textContent='BabyRunner'
            titulo1.classList.add('titulosFotos')
            div1.classList.add('row','text-center','justify-content-around','mt-5')

            let div2=document.createElement('div')
            let titulo2=document.createElement('h4')
            titulo2.textContent='Prebenjamín'
            titulo2.classList.add('titulosFotos')
            div2.classList.add('row','text-center','justify-content-around','mt-5')

            let div3=document.createElement('div')
            let titulo3=document.createElement('h4')
            titulo3.textContent='Benjamín'
            titulo3.classList.add('titulosFotos')
            div3.classList.add('row','text-center','justify-content-around','mt-5')

            let div4=document.createElement('div')
            let titulo4=document.createElement('h4')
            titulo4.textContent='Alevín'
            titulo4.classList.add('titulosFotos')
            div4.classList.add('row','text-center','justify-content-around','mt-5')

            let div5=document.createElement('div')
            let titulo5=document.createElement('h4')
            titulo5.textContent='Intantil'
            titulo5.classList.add('titulosFotos')
            div5.classList.add('row','text-center','justify-content-around','mt-5')

            let div6=document.createElement('div')
            let titulo6=document.createElement('h4')
            titulo6.textContent='Cadete'
            titulo6.classList.add('titulosFotos')
            div6.classList.add('row','text-center','justify-content-around','mt-5')

            let div7=document.createElement('div')
            let titulo7=document.createElement('h4')
            titulo7.textContent='Juvenil'
            titulo7.classList.add('titulosFotos')
            div7.classList.add('row','text-center','justify-content-around','mt-5')

            let div8=document.createElement('div')
            let titulo8=document.createElement('h4')
            titulo8.textContent='Absoluta'
            titulo8.classList.add('titulosFotos')
            div8.classList.add('row','text-center','justify-content-around','mt-5')

            this.fotos.forEach(element => {
                console.log(element.id_categoria)
                let divFoto=document.createElement('div')
                divFoto.classList.add('rounded','col-sm-3','m-1','p-3', 'fotosCarrera')
                
                
                switch(element.id_categoria) {
                    case '1':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/babyrunner/'+element.url+')'
                        div1.appendChild(divFoto)
                        break;
                    case '2':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/prebenjamin/'+element.url+')'
                        div2.appendChild(divFoto)
                        break;
                    case '3':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/benjamin/'+element.url+')'
                        div3.appendChild(divFoto)
                        break;
                    case '4':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/alevin/'+element.url+')'
                        div4.appendChild(divFoto)
                        break;
                    case '5':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/infantil/'+element.url+')'
                        div5.appendChild(divFoto)
                        break;
                    case '6':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/cadete/'+element.url+')'
                        div6.appendChild(divFoto)
                        break;
                    case '7':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/juvenil/'+element.url+')'
                        div7.appendChild(divFoto)
                        break;
                    case '8':
                        divFoto.style.backgroundImage='url(./admin/assets/images/categorias/absoluta/'+element.url+')'
                        div8.appendChild(divFoto)
                        break;
                }
            });
            let divContenedor=document.getElementsByClassName('container')[0]
            divContenedor.appendChild(titulo1)
            divContenedor.appendChild(div1)
            if(div1.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div1.appendChild(h6)
            }

            divContenedor.appendChild(titulo2)
            divContenedor.appendChild(div2)
            if(div2.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div2.appendChild(h6)
            }

            divContenedor.appendChild(titulo3)
            divContenedor.appendChild(div3)
            if(div3.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div3.appendChild(h6)
            }

            divContenedor.appendChild(titulo4)
            divContenedor.appendChild(div4)
            if(div4.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div4.appendChild(h6)
            }

            divContenedor.appendChild(titulo5)
            divContenedor.appendChild(div5)
            if(div5.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div5.appendChild(h6)
            }

            divContenedor.appendChild(titulo6)
            divContenedor.appendChild(div6)
            if(div6.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div6.appendChild(h6)
            }

            divContenedor.appendChild(titulo7)
            divContenedor.appendChild(div7)
            if(div7.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div7.appendChild(h6)
            }

            divContenedor.appendChild(titulo8)
            divContenedor.appendChild(div8)
            if(div8.childNodes.length == 0){
                let h6=document.createElement('h6')
                h6.textContent='No hay fotos de esta categoría'
                div8.appendChild(h6)
            }

            
        }
        else{
            console.log('no hay')
            let div=document.getElementsByClassName('container')[0]
            console.log(div)
            let h6=document.createElement('h4')
            h6.classList.add('mt-4')
            h6.id='fotosNada'
            h6.textContent='Ups... aún no hay imágenes. Pero ¡no te preocupes! El dia de la carrera podrás ver todas las fotos que se hagan.'
            div.appendChild(h6)
            let divFoto=document.createElement('div')
            divFoto.id='divFotoNada'
            div.appendChild(divFoto)
        }
    }
}