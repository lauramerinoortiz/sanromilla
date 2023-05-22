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
    function insertarInscripciones($inscripciones, $codigo){
        $this->conectar();
        if(!empty($inscripciones)){
            foreach($inscripciones as $item){
                //Miramos de que genero es
                $genero='M';
                if($item['genero']==1){
                    $genero='F';
                }

                //Buscamos el precio de cada camiseta
                $consulta='SELECT precio_camiseta FROM informacion';
                $result=$this->conexion->query($consulta);
                $precio=$result->fetch_all( $resulttype = MYSQLI_ASSOC);
                $precioCamiseta=$precio[0]['precio_camiseta'];
                // print_r($precioCamiseta);
                //Calculamos el total a pagar
                $importe=$item['precioDorsal'];
                if($item['camiseta']!='null'){
                    $importe=$item['precioDorsal']+$precioCamiseta;
                }
                else{
                    $camiseta='NULL';
                }

                if($item['infoAdicional']==''){
                    $adicional='NULL';
                }
                else{
                    $adicional=''.$item['infoAdicional'].'';
                }

                //buscamos la categoria
                $consulta="SELECT id_categoria FROM categorias WHERE nombre='".$item['categoria']."';";
                $result=$this->conexion->query($consulta);
                $id=$result->fetch_all( $resulttype = MYSQLI_ASSOC);
                $idCategoria=$id[0]['id_categoria'];
                $consulta="INSERT INTO `inscripciones`( `nombre`, `apellidos`, `genero`, 
                `fecha_nacimiento`, `dni`, `email`, `telefono`, `info_adicional`,  
                `codigo_inscripcion`, `talla_camiseta`, `importe`, `id_categoria`) 
                VALUES ('".$item['nombre']."','".$item['apellidos']."','".$genero."',".$item['fechaNac'].",'".$item['dni']."',
                '".$item['email']."',".$item['telefono'].",".$adicional.",".$codigo.",'".$item['camiseta']."',".$importe.",
                ".$idCategoria." )";
                echo $consulta;
                // try{
                //     $respuesta=$this->conexion->query($consulta);
                //     $this->conexion->close();
                //     return $respuesta;
                // }
                // catch(Exception $e){
                //     return $e;
                // }
            }
        }
        else{
            return 0;
        }
        
        
    }

}

?>