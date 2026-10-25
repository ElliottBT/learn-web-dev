function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="footer__columns">
          <div className="footer__brand">
            <a className="logo logo--light" href="#">
              <span className="logo__mark" aria-hidden="true">РЦ</span>
              <span className="logo__text">
                <span className="logo__title">Рыбинский Цирюльник</span>
                <span className="logo__subtitle">Барбершоп · Рыбинск</span>
              </span>
            </a>
            <p className="footer__tagline">
              Точные стрижки, ухоженные бороды и время для себя. Мастерство, которому можно доверять.
            </p>
          </div>

          <div className="footer__column footer__column--contacts">
            <p className="footer__heading">Контакты</p>
            <p className="footer__text">ул. Стоялая, 15, Рыбинск</p>
            <a className="footer__phone" href="tel:+749551234567">+7 (4955) 123-45-67</a>
          </div>

          <div className="footer__column footer__column--hours">
            <p className="footer__heading">Режим работы</p>
            <p className="footer__text">Пн–Пт 9:00–21:00</p>
            <p className="footer__text">Сб–Вс 10:00–19:00</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026. Все права защищены.</p>
          <a className="footer__privacy" href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
