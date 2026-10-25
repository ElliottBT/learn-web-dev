function CalendarHeader({ title, onPrevMonth, onNextMonth }) {
  return (
    <header className="card__head">
      <h2 className="card__title">{title}</h2>
      <div className="calendar__nav">
        <button className="icon-btn" type="button" aria-label="Предыдущий месяц" onClick={onPrevMonth}>
          <svg className="icon-btn__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="icon-btn" type="button" aria-label="Следующий месяц" onClick={onNextMonth}>
          <svg className="icon-btn__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default CalendarHeader;
