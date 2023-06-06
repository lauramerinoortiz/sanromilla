<?php

require_once('config/configdb.php');
class ModeloInformacion{
    private $servidor;
    private $usuario;
    private $contrasenia;
    private $bd;
    private $conexion;
    function __construct(){
        $this->servidor = constant('SERVIDOR');
        $this->usuario = constant('USUARIO');
        $this->contrasenia = constant('CONTRASENIA');
        $this->bd = constant('BD');
    }

    /**
     * Iniciar conexión con la base de datos.
     */
    private function conectar()
    {     
        $this->conexion = new mysqli($this->servidor,  $this->usuario,  $this->contrasenia, $this->bd);
        $this->conexion->set_charset("utf8");
    }


    /**
     * Método que modifica la información general de la carrera.
     */
    public function modificarInfo($datos){


        if($datos){
            $this->conectar();
            try{
                $fecha = $datos['fecha'];
                $hora = $datos['hora'];
                $fechaCarrera = date("Y-m-d H:i:s", strtotime("$fecha $hora"));
//                $cartel = $datos['cartel'];
//                echo $cartel;
                $reglamento = $datos['reglamento'];
                $inicio_inscripcion = $datos['inicio_inscripcion'];
                $fin_inscripcion = $datos['fin_inscripcion'];
                $precio_camiseta = $datos['precio_camiseta'];
                $beneficio_camiseta = $datos['beneficio_camiseta'];

//                $upd = $this->conexion->prepare("UPDATE informacion SET fecha = ?, cartel = ?, reglamento = ?, inicio_inscripcion = ?, fin_inscripcion = ?, precio_camiseta = ?, beneficio_camiseta = ?");
                $upd = $this->conexion->prepare("UPDATE informacion SET fecha = ?, reglamento = ?, inicio_inscripcion = ?, fin_inscripcion = ?, precio_camiseta = ?, beneficio_camiseta = ?");
//                $upd->bind_param("sssssii", $fechaCarrera, $cartel, $reglamento, $inicio_inscripcion, $fin_inscripcion, $precio_camiseta, $beneficio_camiseta);
                $upd->bind_param("ssssii", $fechaCarrera, $reglamento, $inicio_inscripcion, $fin_inscripcion, $precio_camiseta, $beneficio_camiseta);
                $upd->execute();
                $upd->close();
                echo 1;
            }
            catch(Exception $e){
                echo -1;
            }  
        }else{
                echo 9;
        }
    }





    public function modCartel(){


    }
















    /**
    * Método para obtener la información general de la carrera
    */
    function getInformacion(){
        $this->conectar();

        $resultado= $this->conexion->prepare("SELECT * FROM informacion");
        $resultado->execute();
        $datos = $resultado->get_result();
        $array=$datos->fetch_all(MYSQLI_ASSOC);
        $resultado->close();
        return $array;
    }

    /**
    * Método para obtener el precio de la camiseta
    */
    function getPrecioCamiseta(){
        $this->conectar();

        $resultado= $this->conexion->prepare("SELECT precio_camiseta FROM informacion");
        $resultado->execute();
        $datos = $resultado->get_result();
        $array=$datos->fetch_all(MYSQLI_ASSOC);
        $resultado->close();
        return $array;
    }

}

?>