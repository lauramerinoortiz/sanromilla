<?php

require_once('config/configdb.php');
class ModeloUsuarios
{
    private $servidor;
    private $usuario;
    private $contrasenia;
    private $bd;
    private $conexion;

    function __construct()
    {
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
        $this->conexion = new mysqli($this->servidor, $this->usuario, $this->contrasenia, $this->bd);
        $this->conexion->set_charset("utf8");
    }


    public function getUsuarios(){
        $this->conectar();
        $datos = array();

        $consulta = $this->conexion->query("SELECT t1.*, GROUP_CONCAT(t3.nombre SEPARATOR ', ') AS roles
                                        FROM colaboradores t1
                                        INNER JOIN roles_colaboradores t2 ON t1.id_colaborador = t2.id_colaborador
                                        INNER JOIN roles t3 ON t2.id_rol = t3.id_rol
                                        GROUP BY t1.id_colaborador");

        while ($fila = $consulta->fetch_assoc()) {
            $datos[] = $fila;
        }

        $consulta->close();
        $this->conexion->close();

        return $datos;
    }

    public function eliminarUsuario($id){
        $this->conectar();

        $consultaDelete = $this->conexion->prepare("DELETE FROM roles_colaboradores WHERE id_colaborador = ?");
        $consulta = $this->conexion->prepare("DELETE FROM colaboradores WHERE id_colaborador = ?");

        try {
            $consultaDelete->bind_param("i", $id);
            $consultaDelete->execute();
            $consulta->bind_param("i", $id);
            $consulta->execute();

        } catch (Exception $e) {
            echo 'Error al eliminar imágenes: ' . $e->getMessage();
        }

        $consulta->close();
        $consultaDelete->close();
        $this->conexion->close();

    }

}