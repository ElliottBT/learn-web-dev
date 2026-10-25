import { buildCalendarGrid, isDateSelectable, TODAY } from '../data/date.js';

function CalendarGrid({ year, month, selectedDay, onDayClick }) {
  const weeks = buildCalendarGrid(year, month - 1);

  return (
    <div className="calendar__grid">
      {weeks.map((week, weekIndex) =>
        week.map((cell, dayIndex) => {
          const key = weekIndex + '-' + dayIndex;

          const selectable =
            !cell.otherMonth && isDateSelectable(cell.day, month, year, TODAY);

          if (!selectable) {
            return (
              <button
                className="calendar__day calendar__day--muted"
                type="button"
                disabled
                key={key}
              >
                {cell.day}
              </button>
            );
          }

          const isSelected =
            selectedDay !== null &&
            cell.day === selectedDay.day &&
            month === selectedDay.month &&
            year === selectedDay.year;

          if (isSelected) {
            return (
              <button
                className="calendar__day calendar__day--selected"
                type="button"
                aria-pressed="true"
                key={key}
                onClick={() => onDayClick(cell.day)}
              >
                {cell.day}
              </button>
            );
          }

          return (
            <button
              className="calendar__day calendar__day--free"
              type="button"
              key={key}
              onClick={() => onDayClick(cell.day)}
            >
              {cell.day}
            </button>
          );
        })
      )}
    </div>
  );
}

export default CalendarGrid;
