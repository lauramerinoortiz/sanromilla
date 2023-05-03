"use strict" //activo modo estricto

/**
 * Clase que hace de router entre las vistas
 * Su función es cargar en el div app-container del index.html las vistas de php según cuál se necesite
 */
export  class Router  {
    cargar(route){
        $('#app-container').load('././php/vistas/' + route + '.php?', () => {});
    }

}
