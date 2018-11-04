<?php

/*--- Endereços ----*/

function get_relative_dir( string $abs_dir )
  { if( $abs_dir . "/" == BASE_ADDR ) return "./";
    $deep = ""; $path = explode( "/", substr( $abs_dir, mb_strlen( BASE_ADDR ) ) );
    for( $i = 0; $i < count( $path ); $i++ ) $deep .= "../";
    return $deep; };

/*---- Strings ----*/

function float_with_comma( float $number )
  { return str_replace( ".", ",", ( string ) $number ); };

/*---- Templates ----*/

function get_head( string $abs_dir, string $title, bool $dev = true )
  { $rel_dir = get_relative_dir( $abs_dir );
    $page = $rel_dir == "./" ? "home" : basename( $abs_dir );
    include "head.php"; };

function get_top_header_menu( $user = null )
  { include "top-header-menu.php"; };

function get_top_header_slideshow( string $version = 'random' )
  { $slides = [ 'expertise' => [ 'image' => IMGS_PATH . "large/l-user-1.jpg", 'color' => "#011627", 'text' => get_top_header_slideshow_text( 'expertise' ) ],
                'seo' => [ 'image' => IMGS_PATH . "large/l-user-2.jpg", 'color' => "#011627", 'text' => get_top_header_slideshow_text( 'seo' ) ],
                'conversions' => [ 'image' => IMGS_PATH . "large/l-user-3.jpg", 'color' => "#011627", 'text' => get_top_header_slideshow_text( 'conversions' ) ],
                'e-commerce' => [ 'image' => IMGS_PATH . "large/l-user-4.jpg", 'color' => "#011627", 'text' => get_top_header_slideshow_text( 'e-commerce' ) ] ];
    $versions = [ 'home' ];
    switch ( $version ):
      case 'home': $slides_set = [ 'expertise' => $slides[ 'expertise' ], 'seo' => $slides[ 'seo' ],
                                   'conversions' => $slides[ 'conversions' ], 'e-commerce' => $slides [ 'e-commerce' ] ];
                   break;
      default: shuffle( $versions ); return get_top_header_slideshow( $versions[0] );
    endswitch;
    include "top-header-slideshow.php"; };

function get_top_header_slideshow_text( string $slide )
  { $slides_texts =
      [ 'expertise' =>
          '<h1 class="title">Nossa especialidade:<br>experiência de compra.</h1>',
        'seo' =>
          '<h2 class="title">SEO &amp; E-commerce</h2>
           <p class="message">A chave do sucesso para o seu e-commerce.</p>',
        'conversions' =>
          '<h2 class="title">Evolução &amp; Inovação</h2>
           <p class="message">O segredo para a sua conversão.</p>',
        'e-commerce' =>
          '<h2 class="title">Implantação de e-commerce.</h2>
           <p class="message">Seus clientes merecem a melhor experiência de compra.</p>' ];
    return $slides_texts[ $slide ]; };

function get_feature_products()
  { $products_set = [ 'shoe-1' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R698 Q4 V2',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => false ],
                      'shoe-2' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => true ],
                      'shoe-3' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => false ],
                      'shoe-4' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => false ],
                      'shoe-5' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => true ],
                      'shoe-6' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => false ],
                      'shoe-7' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => false ],
                      'shoe-8' => [ 'image' => IMGS_PATH . 'small/s-product-1.png', 'title' => 'Tênis Couro Puma R623 K8 V1',
                                    'score' => 1, 'former-price' => 299, 'current-price' => 399, 'off_sale' => false ] ];
    include "featured-products.php"; };

function get_arrows_set()
  { include "arrows-set.php"; };

?>
