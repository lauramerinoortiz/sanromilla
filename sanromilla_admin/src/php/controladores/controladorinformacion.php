<?php 
require_once('modelos/modeloinformacion.php');
class informacionController{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloInformacion();
    }


    /**
     * Método que asigna un dorsal a una participación
     * Si la modificación va bien devuelve 1
     * Si la modificación va mal devuelve -1
     * Si no se envían todos los datos devuelve 0
     */
    public function asignarDorsal(){

        $datos = json_decode($_POST['datos']);

        $datos= $this->modelo->asignarDorsal($datos);
        if($datos >= 1){
            echo $datos;
            return $datos;
        }
        else if($datos == -1){  //error
            echo $datos;
        }
        else{       //falta algún dato
            echo 0;
            return 0;
        }
    }

    /**
    * Método para obtener la información general de la carrera.
    */
    public function getInformacion(){
        $datos= $this->modelo->getInformacion();

        header('Content-type: application/json; charset=uft-8');
        $cosas= json_encode($datos);
        echo $cosas;
    }
}

?>