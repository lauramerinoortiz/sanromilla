<?php

require_once('config/configdb.php');
class ModeloFotos
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

    public function subirFotos($archivos, $categoria){

        $this->conectar();

        /*if(
            isset($categoria) && !empty($categoria)
            && isset($archivos) && !empty($archivos)
        ){*/

            $consulta = $this->conexion->prepare("INSERT INTO imagenes (url, id_categoria)
														VALUES(?,?);");
            $categoriaRuta = '';
            switch ($categoria){
                case 1:
                    $categoriaRuta = 'babyrunner';
                    break;
                case 2:
                    $categoriaRuta = 'prebenjamin';
                    break;
                case 3:
                    $categoriaRuta = 'benjamin';
                    break;
                case 4:
                    $categoriaRuta = 'alevin';
                    break;
                case 5:
                    $categoriaRuta = 'infantil';
                    break;
                case 6:
                    $categoriaRuta = 'cadete';
                    break;
                case 7:
                    $categoriaRuta = 'juvenil';
                    break;
                case 8:
                    $categoriaRuta = 'absoluta';
                    break;

            }

            foreach ($archivos['tmp_name'] as $indice => $tmp_name) {
                $nombre_real = $archivos['name'][$indice];
                $ruta_destino = 'D:\PROGRAMAS\XAMPP\htdocs\sanromilla\sanromilla_admin\src\assets\images\categorias\\'.$categoriaRuta .'\\'. $nombre_real;
                move_uploaded_file($tmp_name, $ruta_destino);

                $consulta->bind_param("si", $nombre_real, $categoria);
                $consulta->execute();

            }
            $consulta->close();
            return true;
        //}
    }


}