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
     * PRUEBA!!!
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

    public function getInscripciones(){
        $datos= $this->modelo->getInscripciones();

        header('Content-type: application/json; charset=uft-8');
        // // print_r ($datos);
         $cosas= json_encode($datos);
         echo $cosas;
    }


}

?>