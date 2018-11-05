<section class="slideshow" style="background-color: #011627; background-image: url( '<?= IMGS_PATH . "large/l-user-1.jpg" ?>' )">
  <div class="content-container">
    <?php get_arrows_set() ?>
    <header class="heading-container">
      <h1 class="title"><?= current( $slides_set )[ 'text' ] ?></h1>
    </header>
    <ul class="slides-menu">
      <?php foreach( $slides_set as $name => $data ): ?>
      <li class="<?= current( $slides_set )[ 'text' ] == $data[ 'text' ] ? "current" : "" ?>">
        <div class="slideshow-content <?= $name ?>">
          <picture class="slideshow-image" data-color: "<?= $data[ 'color' ] ?>">
            <source data-srcset="<?= IMGS_PATH . $data[ 'image' ][2]?>" media="( max-width: 24.95em )">
            <source data-srcset="<?= IMGS_PATH . $data[ 'image' ][1]?>" media="( max-width: 37.45em )">
            <img data-src="<?= IMGS_PATH . $data[ 'image' ][0] ?> " alt="">
          </picture>
          <div class="slideshow-text">
            <?= $data[ 'text' ] ?>
          </div>
        </div>
      </li>
      <?php endforeach ?>
    </ul>
  </div>
</section>
