import CalendarHeader from './CalendarHeader.jsx';
import CalendarGrid from './CalendarGrid.jsx';
import { MONTHS_NOMINATIVE } from '../data/date.js';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function Calendar({ year, month, selectedDay, onDayClick, onPrevMonth, onNextMonth }) {
  const title = MONTHS_NOMINATIVE[month - 1] + ' ' + year;

  return (
    <section className="card calendar">
      <CalendarHeader title={title} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />

      <div className="calendar__weekdays" aria-hidden="true">
        {WEEKDAYS.map((weekday) => (
          <span className="calendar__weekday" key={weekday}>{weekday}</span>
        ))}
      </div>

      <CalendarGrid
        year={year}
        month={month}
        selectedDay={selectedDay}
        onDayClick={onDayClick}
      />

      <p className="card__note">Медный — выбранная дата. Бледные даты — прошедшие или другой месяц.</p>
    </section>
  );
}

export default Calendar;
