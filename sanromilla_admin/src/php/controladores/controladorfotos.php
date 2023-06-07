<?php
require_once('modelos/modelofotos.php');
class fotosController{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloFotos();
    }

    public function subirFotos(){

        $archivos = $_FILES['files'];
        $categoria = (int)$_POST['categoria'];

        $this->modelo->subirFotos($archivos, $categoria);

    }


}

