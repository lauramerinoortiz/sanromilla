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
    public function getCategorias()
    {
        $return = array('mensaje' => '');
        echo json_encode('holi');
        
    }
}

?>