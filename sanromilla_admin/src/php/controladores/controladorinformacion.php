<?php 
require_once('modelos/modeloinformacion.php');
class informacionController{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloInformacion();
    }


    /**
     * Método que modifica la información general de la carrera
     */
    public function modificarInfo(){

//        $datos = json_decode($_POST['datos']);
        $datos = $_POST['datos'];
        $result= $this->modelo->modificarInfo($datos);
//        echo $result;
        if($result >= 1){
            echo 6;
        }
        else if($result == -1){  //error
            echo -1;
        }
        else{       //falta algún dato
            echo 8;
        }
    }







    /**
    * Método para subir el cartel a bbdd.
    */
    public function subirCartel(){

            $archivos = $_FILES;

//            var_dump ($archivos);

            $this->modelo->subirCartel($archivos);

    }

    /**
    * Método para subir el reglamento a bbdd.
    */
    public function subirReglamento(){

            $archivos2 = $_FILES;

//            var_dump ($archivos);

            $this->modelo->subirReglamento($archivos2);

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

    /**
        * Método para obtener la el precio de la camiseta.
        */
        public function getPrecioCamiseta(){
            $datos= $this->modelo->getPrecioCamiseta();
            header('Content-type: application/json; charset=uft-8');
            $cosas= json_encode($datos);
            echo $cosas;
        }
}

?>