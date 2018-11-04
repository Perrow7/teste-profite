<?php require "config/config.php"; ?>
<!DOCTYPE html>
<html lang="pt-BR">
  <?php get_head( __DIR__, "Profite – Teste" ) ?>
  <body>
    <header id="top-header">
      <?php
        get_top_header_menu();
        get_top_header_slideshow( "home" );
      ?>
    </header>
    <main id="top-content">
      <?php get_feature_products() ?>
    </main>
    <footer id="top-footer">
      <?php get_top_footer() ?>
    </footer>
  </body>
</html>
