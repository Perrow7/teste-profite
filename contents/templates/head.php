<head>
  <!-- Dados Gerais -->
  <meta charset="utf-8">
  <meta name="author" content="Pedro Lustosa">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">

  <!-- Endereço Base & Título -->
  <base href="<?= $rel_dir ?>" target="_self">
  <title><?= $title ?></title>

  <!-- Favicon -->
  <link rel="icon" href="<?= IMGS_PATH . "x-small/S-tag-1.png" ?>">

  <!-- Folhas de Estilo -->
  <link rel="stylesheet" href="<?= STYLES_PATH . "local/${page}/" . ( $dev ? "${page}.css" : "${page}-min.css" ) ?>">

  <!-- Scripts Internos -->
  <?php if( !$dev ): ?>
    <script src="<?= SCRIPTS_LIB_PATH . "theWheel/theWheel-min.js"?>" defer></script>
  <?php endif ?>
  <script src="<?= SCRIPTS_PATH . "local/${page}/" . ( $dev ? "_${page}.js" : "${page}-min.js" ) ?>" <?= $dev ? "type=module" : "defer" ?>></script>
</head>
