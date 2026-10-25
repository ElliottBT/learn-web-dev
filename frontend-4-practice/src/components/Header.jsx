const NAV_LINKS = ['Услуги', 'Галерея', 'Команда', 'Отзывы', 'Контакты'];

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="logo" href="#">
          <span className="logo__mark" aria-hidden="true">РЦ</span>
          <span className="logo__text">
            <span className="logo__title">Рыбинский Цирюльник</span>
            <span className="logo__subtitle">Барбершоп · Рыбинск</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Основное меню">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li className="site-nav__item" key={link}>
                <a className="site-nav__link" href="#">{link}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-contacts">
          <a className="header-contacts__phone" href="tel:+749551234567">
            +7 (4955) 123-45-67
          </a>
          <span className="header-contacts__address">ул. Стоялая, 15, Рыбинск</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
