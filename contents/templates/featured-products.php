<section id="featured-products">
  <div class="content-container">
    <header class="heading-container">
      <h3 class="title">Produtos</h3>
    </header>
    <div class="content-body">
      <?php get_arrows_set() ?>
      <ul class="products-list">
        <?php foreach( $products_set as $name => $data ): ?>
          <li>
            <section class="product <?= $name ?>">
              <picture class="ilustration">
                <img src="<?= $data[ 'image' ] ?>" alt="">
              </picture>
              <h4 class="title"><?= $data[ 'title' ] ?></h4>
              <ul class="rating">
                <?php for( $i = 1; $i <= 5; $i++ ): ?>
                  <li>
                    <data class="rate" value="<?= $i ?>">
                      <?php if( $data[ 'score' ] >= $i ): ?>
                        <picture class="star full">
                          <img src="<?= IMGS_PATH . "x-small/S-star-2.png" ?>" alt="">
                        </picture>
                      <?php else: ?>
                        <picture class="star empty">
                          <img src="<?= IMGS_PATH . "x-small/S-star-1.png" ?>" alt="">
                        </picture>
                      <?php endif; ?>
                    </data>
                  </li>
                <?php endfor; unset( $i ) ?>
              </ul>
              <div class="price-container">
                <?php if( $data[ 'former-price' ] ): ?>
                  <s class="former-price">de <data class="price" value="<?= $data[ 'former-price' ] ?>">R$ <?= float_with_comma( $data[ 'former-price' ] ) ?></data></s>
                <?php endif; ?>
                <?php
                  $divided_price[ 'normal' ] = round( $data[ 'current-price' ] / 3, 1, 2 );
                  $divided_price[ 'display' ] = float_with_comma( $divided_price[ 'normal' ] );
                ?>
                <strong class="current-price">por <data class="price" value="<?= $data[ 'current-price' ] ?>">R$ <?= float_with_comma( $data[ 'current-price' ] ) ?></data></strong>
                <span class="complement">ou em 3x de <data class="price" value="<?= $divided_price[ 'normal' ] ?>">R$ <?= $divided_price[ 'display' ] ?></data></span>
              </div>
              <?php if( $data[ 'off_sale' ] ): ?>
                <div class="off-sale">
                  <span class="message">Off</span>
                </div>
              <?php endif; ?>
              <button name="featured-products-buy-btn" type="button" value="<?= $name ?>">
                <span class="content-container">
                  <picture class="side-image">
                    <img src="<?= IMGS_PATH . "/x-small/S-cart-2.png" ?>" alt="">
                  </picture>
                  <span class="action">Comprar</span>
                </span>
              </button>
            </section>
          </li>
        <?php endforeach; unset( $divided_price ) ?>
      </ul>
    </div>
  </div>
</section>
