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





    public function subirCartel($arch){

            $this->conectar();
//            var_dump($arch);

            $archivos = $arch['cartel'];
            var_dump ($archivos);

            $consulta = $this->conexion->prepare("UPDATE informacion SET cartel = ?;");

            $archivos['tmp_name'];
            $nombre_real = $archivos['name'];
            $ruta_destino = 'C:\xampp\htdocs\san_romilla\sanromilla\sanromilla_admin\src\assets\carrera_archivos\\'. $nombre_real;
            move_uploaded_file($archivos['tmp_name'], $ruta_destino);

            $consulta->bind_param("s", $nombre_real);
            $consulta->execute();


            $consulta->close();
            return true;
        }


    public function subirReglamento($arch2){

            $this->conectar();
//            var_dump($arch2);

            $archivos2 = $arch2['reglamento'];
            var_dump ($archivos2);

            $consulta = $this->conexion->prepare("UPDATE informacion SET reglamento = ?;");

            $archivos2['tmp_name'];
            $nombre_real2 = $archivos2['name'];
            $ruta_destino = 'C:\xampp\htdocs\san_romilla\sanromilla\sanromilla_admin\src\assets\carrera_archivos\\'. $nombre_real2;
            move_uploaded_file($archivos2['tmp_name'], $ruta_destino);
            var_dump($nombre_real2);
            $consulta->bind_param("s", "hola");
            $consulta->execute();


            $consulta->close();
            return true;
    }

    public function holatio($arch2){

                $this->conectar();
    //            var_dump($arch2);

                $archivos2 = $arch2['reglamento'];
                var_dump ($archivos2);

                $consulta = $this->conexion->prepare("UPDATE informacion SET reglamento = ?;");

                $archivos2['tmp_name'];
                $nombre_real2 = $archivos2['name'];
                $ruta_destino = 'C:\xampp\htdocs\san_romilla\sanromilla\sanromilla_admin\src\assets\carrera_archivos\\'. $nombre_real2;
                move_uploaded_file($archivos2['tmp_name'], $ruta_destino);
                var_dump($nombre_real2);
                $consulta->bind_param("s", "hola");
                $consulta->execute();


                $consulta->close();
                return true;
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