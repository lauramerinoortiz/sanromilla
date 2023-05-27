<?php 
require_once('modelos/modeloinscripciones.php');
class inscripcionesController{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloInscripciones();
    }


    /**
     * Método que asigna un dorsal a una participación
     * Si la modificación va bien devuelve 1
     * Si la modificación va mal devuelve -1
     * Si no se envían todos los datos devuelve 0
     */
    public function asignarDorsal(){
        $datos= $this->modelo->asignarDorsal();
        if($datos>=1){
            echo $datos;
        }
        else if($datos== -1){  //error
            echo $datos;
        }
        else{       //falta algún dato
            echo 0;
        }
    }

    public function filtroInscripciones(){
        $datos= $this->modelo->filtroInscripciones();
        if($datos>=1){
            echo $datos;
        }
        else if($datos== -1){  //error
            echo $datos;
        }
        else{       //falta algún dato
            echo 0;
        }
    }
}

?>