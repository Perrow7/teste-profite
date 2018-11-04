<div class="menu">
  <div class="content-container">
    <a href="#" class="home-link">
      <picture class="logo">
        <img src="<?= IMGS_PATH . "x-small/S-profite-1.png" ?>" alt="Logo">
      </picture>
    </a>
    <form name="header-search-form" method="post">
      <div class="input-container">
        <label for="header-search-input">Informe o que está procurando.</label>
        <input id="header-search-input" name="header-search-input" type="search" placeholder="O que está procurando?">
        <button name="header-search-btn" type="submit">
          <picture class="lupe">
            <img src="<?= IMGS_PATH . "x-small/S-lupe-1.png" ?>" alt="Pesquisar">
          </picture>
        </button>
      </div>
    </form>
    <nav class="miscellaneous-links">
      <div class="login-container <?= $user ?? "" ?> ">
        <picture class="user">
          <img src="<?= IMGS_PATH . "x-small/S-user-1.png" ?>" alt="Conta">
        </picture>
        <span class="message">Minha conta</span>
      </div>
      <div class="buy-container">
        <picture class="cart">
          <img src="<?= IMGS_PATH . "x-small/S-cart-1.png" ?>" alt="Comprar">
        </picture>
        <data class="buy-amount" value="1">
          <span class="content">1</span>
        </data>
      </div>
      <ul class="idioms-list">
        <li>
          <a href="#" class="pt-br">
            <picture class="br-flag">
              <img src="<?= IMGS_PATH . "x-small/S-br-flag-1.png" ?>" alt="Pt">
            </picture>
          </a>
        </li>
        <li>
          <a href="#" class="es">
            <picture >
              <img src="<?= IMGS_PATH . "x-small/S-es-flag-1.png" ?>" alt="Es">
            </picture>
          </a>
        </li>
        <li>
          <a href="#" class="en-gb">
            <picture class="br-flag">
              <img src="<?= IMGS_PATH . "x-small/S-gb-flag-1.png" ?>" alt="En">
            </picture>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>
