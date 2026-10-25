import { MONTHS_GENITIVE, DAYS_OF_WEEK_SHORT, getWeekdayIndex } from '../data/date.js';

function TimeSlots({ selectedDay, slots, selectedTime, onTimeSlotClick }) {
  const title =
    selectedDay.day + ' ' + MONTHS_GENITIVE[selectedDay.month - 1] + ', ' +
    DAYS_OF_WEEK_SHORT[getWeekdayIndex(selectedDay.day, selectedDay.month, selectedDay.year)];

  return (
    <section className="card slots">
      <div className="slots__head">
        <h2 className="card__title">{title}</h2>
        <p className="slots__subtitle">Начало визита · услуга 60 мин</p>
      </div>

      <div className="slots__grid">
        {slots.map((slot) => {
          if (!slot.available) {
            return (
              <button className="slot slot--busy" type="button" disabled key={slot.time}>
                <span className="slot__time">{slot.time}</span>
                <span className="slot__state">Занято</span>
              </button>
            );
          }

          const isSelected = slot.time === selectedTime;
          const stateClass = isSelected ? 'slot slot--selected' : 'slot slot--free';

          return (
            <button
              className={stateClass}
              type="button"
              aria-pressed={isSelected ? 'true' : undefined}
              key={slot.time}
              onClick={() => onTimeSlotClick(slot.time)}
            >
              <span className="slot__time">{slot.time}</span>
              <span className="slot__state">{isSelected ? 'Выбрано' : 'Свободно'}</span>
            </button>
          );
        })}
      </div>

      <p className="card__note">Занятые слоты недоступны. Медный слот — ваш выбор.</p>
    </section>
  );
}

export default TimeSlots;
