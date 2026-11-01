import { MONTHS_GENITIVE, DAYS_OF_WEEK, getWeekdayIndex } from '../data/date.js';

function BookingBottomBar({ selectedDay, selectedTime, onNextStep }) {
  const text = selectedDay === null
    ? 'Выберите дату и время в календаре'
    : 'Вы выбрали: ' +
      DAYS_OF_WEEK[getWeekdayIndex(selectedDay.day, selectedDay.month, selectedDay.year)] + ', ' +
      selectedDay.day + ' ' + MONTHS_GENITIVE[selectedDay.month - 1] + ' ' + selectedDay.year +
      (selectedTime ? ' • ' + selectedTime : ' • время не выбрано');

  return (
    <div className="booking__actions">
      <p className="booking__summary">{text}</p>
      <button className="btn-primary" type="button" onClick={onNextStep}>
        Далее
        <svg className="btn-primary__icon" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
          <path d="M3 8.5H13.5M9.5 4.5L13.5 8.5L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default BookingBottomBar;
