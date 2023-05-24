<?php 
require_once('modelos/modeloinscripciones.php');
class inscripcionesController{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloInscripciones();
    }

    /**
     * Método que pide al modelo los códigos ya guardados en la bbdd
     */
    public function getCodigos(){
        $datos= $this->modelo->getCodigos();
        $datos=$datos->fetch_all($resulttype = MYSQLI_ASSOC);
        $array=[];
        // print_r($datos);
        for($i=0; $i<sizeof($datos); $i++){
            // echo '<br>';
            $array[]=$datos[$i]['codigo_inscripcion'];
        }
        // print_r($array) ;
        header('Content-type: application/json; charset=uft-8');
        // // print_r ($datos);
        $cosas= json_encode($array);
        echo $cosas;
    }

    /**
     * Método que inserta el codigo en la bbdd
     */
    public function insertarCodigo(){
        $id=$_GET['id'];
        $codigo=$_GET['codigo'];
        $datos= $this->modelo->insertarCodigo($id, $codigo);
        if($datos==1){
            echo $datos;
        }
        else{
            echo 0;
        }
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
}

?>