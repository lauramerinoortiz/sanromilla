<?php

require_once('config/configdb.php');
class ModeloInscripciones{
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
     * Método que llama a la base de datos y saca todas los códigos
     */
    function getCodigos(){
        $this->conectar();
        $consulta='SELECT codigo_inscripcion FROM inscripciones';
        $respuesta=$this->conexion->query($consulta);
        $this->conexion->close();
        return $respuesta;

    }

    /**
     * PRUEBA!!!
     * Método que inserta el código de inscripción en un registro
     */
    function insertarCodigo($id, $codigo){
        $this->conectar();
        $consulta=' UPDATE inscripciones SET codigo_inscripcion="'.$codigo.'" WHERE id_inscripcion='.$id.'; ';
        try{
            $respuesta=$this->conexion->query($consulta);
            $this->conexion->close();
            return $respuesta;
        }
        catch(Exception $e){
            return $e;
        }
    }

}

?>