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
        echo json_encode($datos);
        
    }
}

?>