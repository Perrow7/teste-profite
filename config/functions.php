<?php

/*--- Endereços ----*/

function get_relative_dir( string $abs_dir )
  { if( $abs_dir . "/" == BASE_ADDR ) return "./";
    $deep = ""; $path = explode( "/", substr( $abs_dir, mb_strlen( BASE_ADDR ) ) );
    for( $i = 0; $i < count( $path ); $i++ ) $deep .= "../";
    return $deep; };

/*---- Templates ----*/

function get_head( string $abs_dir, string $title, bool $dev = true )
  { $rel_dir = get_relative_dir( $abs_dir );
    $page = $rel_dir == "./" ? "home" : basename( $abs_dir );
    include "head.php"; };

function get_top_header_menu( $user = null )
  { include "top-header-menu.php"; };

?>
