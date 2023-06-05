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
     * Método que asigna un dorsal a una participación
     * Si la modificación va bien devuelve 1
     * Si la modificación va mal devuelve -1
     * Si no se envían todos los datos devuelve 0
     */
    public function asignarDorsal($datos){

        if($datos){
            $this->conectar();

            try{
                foreach ($datos as $dato) {
                    $dorsal = $dato->dorsal;
                    $id_inscripcion = $dato->idInscripcion;
                    $upd = $this->conexion->prepare("UPDATE inscripciones SET dorsal = ?, estado_pago=1 WHERE id_inscripcion = ?");
                    $upd->bind_param('ii', $dorsal, $id_inscripcion);
                    $upd->execute();
                }
                $upd->close();
                return 1;
            }
            catch(Exception $e){
                return -1;
            }  
        }else{
                return 0;
        }
    }

    function getInformacion(){
        $this->conectar();

        $resultado= $this->conexion->prepare("SELECT * FROM informacion");
        $resultado->execute();
        $datos = $resultado->get_result();
        $array=$datos->fetch_all(MYSQLI_ASSOC);
        $resultado->close();
        return $array;

    }

}

?>