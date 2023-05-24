"use strict" //activo modo estricto
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
                divFoto.style.backgroundImage='url('+element.url+')'
                
                switch(element.id_categoria) {
                    case '1':
                        div1.appendChild(divFoto)
                        break;
                    case '2':
                        div2.appendChild(divFoto)
                        break;
                    case '3':
                        div3.appendChild(divFoto)
                        break;
                    case '4':
                        div4.appendChild(divFoto)
                        break;
                    case '5':
                        div5.appendChild(divFoto)
                        break;
                    case '6':
                        div6.appendChild(divFoto)
                        break;
                    case '7':
                        div7.appendChild(divFoto)
                        break;
                    case '8':
                        div8.appendChild(divFoto)
                        break;
                }
            });
            let divContenedor=document.getElementsByClassName('container')[0]
            divContenedor.appendChild(titulo1)
            divContenedor.appendChild(div1)

            divContenedor.appendChild(titulo2)
            divContenedor.appendChild(div2)

            divContenedor.appendChild(titulo3)
            divContenedor.appendChild(div3)

            divContenedor.appendChild(titulo4)
            divContenedor.appendChild(div4)

            divContenedor.appendChild(titulo5)
            divContenedor.appendChild(div5)

            divContenedor.appendChild(titulo6)
            divContenedor.appendChild(div6)

            divContenedor.appendChild(titulo7)
            divContenedor.appendChild(div7)

            divContenedor.appendChild(titulo8)
            divContenedor.appendChild(div8)
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