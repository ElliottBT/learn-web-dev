import photo from '../assets/barber-dmitry.jpg';
import { MONTHS_GENITIVE, DAYS_OF_WEEK, getWeekdayIndex, getEndTime } from '../data/date.js';

function SummaryCard({ selectedDay, selectedTime }) {
  const dateText =
    selectedDay.day + ' ' + MONTHS_GENITIVE[selectedDay.month - 1] + ' ' + selectedDay.year + ', ' +
    DAYS_OF_WEEK[getWeekdayIndex(selectedDay.day, selectedDay.month, selectedDay.year)].toLowerCase();

  const timeText = selectedTime
    ? selectedTime + '–' + getEndTime(selectedTime)
    : 'время не выбрано';

  return (
    <aside className="summary-card" aria-label="Ваша запись">
      <p className="summary-card__label">Ваша запись</p>

      <div className="summary-card__master">
        <img
          className="summary-card__photo"
          src={photo}
          alt="Дмитрий, барбер"
          width="64"
          height="64"
        />
        <div className="summary-card__master-info">
          <p className="summary-card__master-name">Дмитрий</p>
          <p className="summary-card__master-role">Барбер · 5 лет опыта</p>
        </div>
      </div>

      <hr className="summary-card__divider" />

      <div className="summary-card__block">
        <p className="summary-card__service">Комплекс стрижка + борода</p>
        <p className="summary-card__service-note">60 мин · Стрижка и оформление бороды</p>
      </div>

      <div className="summary-card__block">
        <p className="summary-card__date">{dateText}</p>
        <p className="summary-card__time">{timeText}</p>
      </div>

      <div className="summary-card__total">
        <span className="summary-card__total-label">Итого</span>
        <span className="summary-card__price">2200 ₽</span>
      </div>

      <p className="summary-card__note">Оплата в салоне после услуги. Без предоплаты.</p>
    </aside>
  );
}

export default SummaryCard;
