<?php
    /**
     * Archivo php que getionara los controladores del modelo MVC del servidor, será la entrada a las peticiones http
     */

    //Confirmamos que existe una sesión iniciada, sino, seria reenviado de vuelta a la página de juego
    session_start();
    if(isset($_SESSION['nombre'])){
        //Obtenemos el array de configuración descrito en config/config.php para así facilitar la gestión
        $config=require_once("config/config.php");
        $usuario=$_SESSION['nombre'];
        //Leemos el metodo de la petición que recibimos
        $metodo=$_SERVER['REQUEST_METHOD'];

        //Recogemos los pathparams, en nuestro caso, seran los indicadores de a que controlador deben de dirigirse dicha solicitud
        $pathParams=null;
        if(isset($_SERVER['PATH_INFO'])){//Estos parámetros si existen, estaran recogidos en ese elemento del array $_SERVER
            $pathParams=explode('/',$_SERVER['PATH_INFO']);//Con el siguiente método, estamos conformando un array que parte de $_SERVER['PATH_INFO'] y que
                                                            //y que separamos con / que es como viene en la petición
        }
        //El controlador siempre sera el primero en recibirse, no se pone el 0 por que viene vacío
        $controlador=$pathParams[1];
        $método=$pathParams[2];
        $parametrosQuery=null;
        //Función específica para la lectura de parametros query de las peticiones, lee dichos parámetros y los inserta en $paramQuery
        parse_str($_SERVER["QUERY_STRING"],$parametrosQuery);

       switch($controlador){
            case 'controladorpreguntas'://AQUI $FILE
                require_once($config['path_controladores'].'controladorpreguntas.php');
                // $controlador=new ControladorPreguntas();
                break;
            case 'controladorreflexiones':
                require_once($config['path_controladores'].'controladorreflexiones.php');
                // $controlador=new ControladorReflexiones();
                break;
            case 'obtenerreflexiones':
                require_once($config['path_controladores'].'controladorreflexiones.php');
                // $controlador=new ControladorReflexiones();
                $metodo='obtenerreflexiones';
                // $controlador->$metodo();
                break;
       }
       
    }else{
        header('location:../index/html/index.html');
    }
    
?>