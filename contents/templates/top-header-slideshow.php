<section class="slideshow" style="background-color: #011627; background-image: url( '<?= IMGS_PATH . "large/l-user-1.jpg" ?>' )">
  <div class="content-container">
    <?php get_arrows_set() ?>
    <header class="heading-container">
      <h1 class="title">Nossa especialidade:<br>experiência de compra.</h1>
    </header>
    <ul class="slides-menu">
      <?php foreach( $slides_set as $name => $data ): ?>
      <li class="<?= current( $slides_set )[ 'image' ] == $data[ 'image' ] ? "current" : "" ?>">
        <div class="slideshow-content <?= $name ?>">
          <picture class="slideshow-image" data-color: "<?= $data[ 'color' ] ?>">
            <img data-src="<?= $data[ 'image' ] ?> " alt="">
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
