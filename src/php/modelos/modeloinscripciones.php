<?php

require_once('config/configdb.php');
class ModeloInscripciones{
    private $servidor;
    private $usuario;
    private $contrasenia;
    private $bd;
    private $conexion;
    private $mysqli;
    function __construct(){
        $this->mysqli = new mysqli(SERVIDOR, USUARIO, CONTRASENIA, BD) or die("no hay conexion");
    	$this->mysqli->set_charset('utf8');
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
     * Método que inserta el código de inscripción en un registro
     */
    function insertarInscripciones($inscripciones, $codigo){
        if(empty($inscripciones)){
            return false;
        }

        $this->conectar();

        try{
            $consultaGetIdCategoria = $this->mysqli->prepare("SELECT id_categoria FROM categorias WHERE nombre = ? ");

            $consultaInsertInscripcion = $this->mysqli->prepare("INSERT INTO `inscripciones`( `nombre`, `apellidos`, `genero`,
                                                                             `fecha_nacimiento`, `dni`, `email`, `telefono`, `info_adicional`,
                                                                             `codigo_inscripcion`, `talla_camiseta`, `importe`, 
                                                                             `id_categoria`)
                                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?);");
            foreach($inscripciones as $item){
                //Miramos de qué genero es
                $genero='M';
                if($item['genero']==1){
                    $genero='F';
                }

                //Buscamos el precio de cada camiseta
                $consulta="SELECT precio_camiseta FROM informacion";
                $result=$this->conexion->query($consulta);
                $precio=$result->fetch_all( $resulttype = MYSQLI_ASSOC);
                $precioCamiseta=$precio[0]['precio_camiseta'];

                //Calculamos el total a pagar
                $importe=intval($item['precioDorsal']);
                if($item['camiseta']!='null'){
                    $importe += intval($precioCamiseta);
                    $camiseta = $item['camiseta'];
                }else{
                    $camiseta = NULL;
                }

                $adicional = !empty($item['infoAdicional']) ? $item['infoAdicional'] : NULL;

                //buscamos la categoria
                $consultaGetIdCategoria->bind_param("s", $item['categoria']);
                $consultaGetIdCategoria->execute();

                $resultado = $consultaGetIdCategoria->get_result();
                $id = $resultado->fetch_all(MYSQLI_ASSOC);
                $idCategoria = $id[0]['id_categoria'];

                $consultaInsertInscripcion->bind_param("ssssssssisii", $item["nombre"], $item["apellidos"], $genero,
                    $item["fechaNac"], $item["dni"], $item["email"], $item["telefono"], $adicional,
                    $codigo, $camiseta, $importe, $idCategoria);
                $consultaInsertInscripcion->execute();

                $consultaInsertInscripcion->reset();
                $consultaGetIdCategoria->reset();

            }

            $this->mysqli->close();
            return true;
        }catch(Exception $e){
            print_r($e);
        }
    }

    

}

?>