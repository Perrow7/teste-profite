<?php

# Arquivo de Funções
require "functions.php";

/*---- Endereços ----*/

// Endereço Base
define( 'BASE_ADDR', dirname( __FILE__, 2 ) . "/" );
define( 'BASE_NAME', basename( BASE_ADDR ) );

// Templates
define( 'TEMPLATES_PATH', "contents/templates/" );

// Estilos
define( 'STYLES_PATH', "styles/" );

// Scripts
define( 'SCRIPTS_PATH', "scripts/" );
define( 'SCRIPTS_LIB_PATH', SCRIPTS_PATH . "global/libraries/" );

// Imagens
define( 'IMGS_PATH', "multimedia/images/" );

// Fontes
define( 'FONTS_PATH', "multimedia/fonts/" );

// Arquivos de Inclusão
set_include_path( BASE_ADDR . TEMPLATES_PATH );

?>
