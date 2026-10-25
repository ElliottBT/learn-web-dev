
const SLOTS = [
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '13:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true }
];


const MONTHS_NOMINATIVE = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const DAYS_OF_WEEK = [
  'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
];

const DAYS_OF_WEEK_SHORT = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];


const TODAY = {
  day: 9,
  month: 10,
  year: 2026
};


const state = {
  currentMonth: TODAY.month,
  currentYear: TODAY.year,
  selectedDay: { day: 12, month: 10, year: 2026 },
  selectedTime: '14:00',
  slots: SLOTS
};

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function compareDates(date1, date2) {
  if (date1.year !== date2.year) {
    return date1.year < date2.year ? -1 : 1;
  }
  if (date1.month !== date2.month) {
    return date1.month < date2.month ? -1 : 1;
  }
  if (date1.day !== date2.day) {
    return date1.day < date2.day ? -1 : 1;
  }
  return 0;
}

function isDateSelectable(day, month, year, today) {
  return compareDates({ day: day, month: month, year: year }, today) >= 0;
}

function getWeekdayIndex(day, month, year) {
  return (new Date(year, month - 1, day).getDay() + 6) % 7;
}

function renderCalendar() {
  const title = document.querySelector('#calendar-title');
  const grid = document.querySelector('#calendar-grid');

  title.textContent = MONTHS_NOMINATIVE[state.currentMonth - 1] + ' ' + state.currentYear;

  const weeks = buildCalendarGrid(state.currentYear, state.currentMonth - 1);

  let html = '';
  weeks.forEach(function (week) {
    week.forEach(function (cell) {
      if (cell.otherMonth) {
        html += '<button class="calendar__day calendar__day--muted" type="button" disabled>' +
          cell.day + '</button>';
        return;
      }

      const selectable = isDateSelectable(cell.day, state.currentMonth, state.currentYear, TODAY);
      if (!selectable) {
        html += '<button class="calendar__day calendar__day--muted" type="button" disabled>' +
          cell.day + '</button>';
        return;
      }

      const isSelected =
        state.selectedDay !== null &&
        cell.day === state.selectedDay.day &&
        state.currentMonth === state.selectedDay.month &&
        state.currentYear === state.selectedDay.year;

      if (isSelected) {
        html += '<button class="calendar__day calendar__day--selected" type="button" ' +
          'aria-pressed="true" data-day="' + cell.day + '">' + cell.day + '</button>';
      } else {
        html += '<button class="calendar__day calendar__day--free" type="button" ' +
          'data-day="' + cell.day + '">' + cell.day + '</button>';
      }
    });
  });

  grid.innerHTML = html;

  grid.querySelectorAll('[data-day]').forEach(function (btn) {
    btn.addEventListener('click', onDayClick);
  });
}

function renderTimeSlots() {
  const title = document.querySelector('#slots-title');
  const grid = document.querySelector('#slots-grid');
  const day = state.selectedDay;

  title.textContent =
    day.day + ' ' + MONTHS_GENITIVE[day.month - 1] + ', ' +
    DAYS_OF_WEEK_SHORT[getWeekdayIndex(day.day, day.month, day.year)];

  let html = '';
  state.slots.forEach(function (slot) {
    if (!slot.available) {
      html += '<button class="slot slot--busy" type="button" disabled>' +
        '<span class="slot__time">' + slot.time + '</span>' +
        '<span class="slot__state">Занято</span></button>';
      return;
    }

    if (slot.time === state.selectedTime) {
      html += '<button class="slot slot--selected" type="button" aria-pressed="true" ' +
        'data-time="' + slot.time + '">' +
        '<span class="slot__time">' + slot.time + '</span>' +
        '<span class="slot__state">Выбрано</span></button>';
    } else {
      html += '<button class="slot slot--free" type="button" data-time="' + slot.time + '">' +
        '<span class="slot__time">' + slot.time + '</span>' +
        '<span class="slot__state">Свободно</span></button>';
    }
  });

  grid.innerHTML = html;

  grid.querySelectorAll('.slot--free').forEach(function (btn) {
    btn.addEventListener('click', onTimeSlotClick);
  });
}

function updateBottomBar() {
  const bar = document.querySelector('#booking-summary');
  const day = state.selectedDay;

  let text = 'Вы выбрали: ' +
    DAYS_OF_WEEK[getWeekdayIndex(day.day, day.month, day.year)] + ', ' +
    day.day + ' ' + MONTHS_GENITIVE[day.month - 1] + ' ' + day.year;

  text += state.selectedTime ? ' • ' + state.selectedTime : ' • время не выбрано';

  bar.textContent = text;
}

function getEndTime(time) {
  const parts = time.split(':');
  const hour = Number(parts[0]) + 1;
  return hour + ':' + parts[1];
}

function renderSummary() {
  const dateEl = document.querySelector('#summary-date');
  const timeEl = document.querySelector('#summary-time');
  const day = state.selectedDay;

  dateEl.textContent =
    day.day + ' ' + MONTHS_GENITIVE[day.month - 1] + ' ' + day.year + ', ' +
    DAYS_OF_WEEK[getWeekdayIndex(day.day, day.month, day.year)].toLowerCase();

  timeEl.textContent = state.selectedTime
    ? state.selectedTime + '–' + getEndTime(state.selectedTime)
    : 'время не выбрано';
}

function onDayClick(event) {
  const day = Number(event.currentTarget.dataset.day);

  state.selectedDay = {
    day: day,
    month: state.currentMonth,
    year: state.currentYear
  };
  state.selectedTime = null;

  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
  renderSummary();
}

function onTimeSlotClick(event) {
  state.selectedTime = event.currentTarget.dataset.time;

  renderTimeSlots();
  updateBottomBar();
  renderSummary();
}

function setupMonthNavigation() {
  document.querySelector('#prev-month').addEventListener('click', function () {
    state.currentMonth -= 1;
    if (state.currentMonth < 1) {
      state.currentMonth = 12;
      state.currentYear -= 1;
    }
    renderCalendar();
  });

  document.querySelector('#next-month').addEventListener('click', function () {
    state.currentMonth += 1;
    if (state.currentMonth > 12) {
      state.currentMonth = 1;
      state.currentYear += 1;
    }
    renderCalendar();
  });
}


function setupNextStep() {
  document.querySelector('#next-step').addEventListener('click', function () {
    const day = state.selectedDay;

    if (!state.selectedTime) {
      alert('Выберите время визита — свободные слоты подсвечены.');
      return;
    }

    alert(
      'Запись подтверждена: ' +
      DAYS_OF_WEEK[getWeekdayIndex(day.day, day.month, day.year)] + ', ' +
      day.day + ' ' + MONTHS_GENITIVE[day.month - 1] + ' ' + day.year +
      ', ' + state.selectedTime + '.'
    );
  });
}

function init() {
  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
  renderSummary();
  setupMonthNavigation();
  setupNextStep();
}

document.addEventListener('DOMContentLoaded', init);
