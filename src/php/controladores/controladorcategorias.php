<?php 
require_once('modelos/modelocategorias.php');
class ControladorCategorias{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloCategorias();
    }

    /**
     *Método para el envío de preguntas recibidas al modelo para su posterior insercción
        */
    public function getCategorias(){
        $datos= $this->modelo->getCategorias();
        $datos=$datos->fetch_all( $resulttype = MYSQLI_ASSOC);
        // print_r($datos) ;
        header('Content-type: application/json; charset=uft-8');
        // print_r ($datos);
         $cosas= json_encode($datos);
         echo $cosas;
    }
}

?>