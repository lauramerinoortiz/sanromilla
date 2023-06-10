<?php
require_once('modelos/modelousuarios.php');
class usuariosController{
    private $modelo;
    function __construct(){
        $this->modelo=new ModeloUsuarios();
    }

    /**
     * Obtiene las fotos de una categoría
     * @return void
     */
    public function getUsuarios(){
        $usuarios = $this->modelo->getUsuarios();

        header('Content-Type: application/json');
        echo json_encode($usuarios);
    }

    /**
     * Elimina un usuario a través de su id
     * @return void
     */
    public function eliminarUsuario(){
        $datos = json_decode(file_get_contents('php://input'), true);

        if ($datos !== null) {
            $id = $datos['id'];
            $this->modelo->eliminarUsuario($id);

            // Enviar una respuesta exitosa al cliente
            http_response_code(200);
        } else {
            // Enviar una respuesta de error al cliente
            http_response_code(400);
        }
    }

}
