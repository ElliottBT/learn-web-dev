
const NOW = new Date();

export const TODAY = {
  day: NOW.getDate(),
  month: NOW.getMonth() + 1,
  year: NOW.getFullYear()
};

const WEEKDAY_SLOTS = [
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '13:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true }
];

const WEEKEND_SLOTS = [
  { time: '10:00', available: false },
  { time: '11:00', available: true },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: false },
  { time: '15:00', available: true },
  { time: '16:00', available: false },
  { time: '17:00', available: true }
];

export function getSlotsForDate(day, month, year) {
  const weekday = new Date(year, month - 1, day).getDay();
  const source = weekday === 0 || weekday === 6 ? WEEKEND_SLOTS : WEEKDAY_SLOTS;
  return source.map((slot) => ({ time: slot.time, available: slot.available }));
}

export function firstAvailableDayOfMonth(month, year) {
  if (year < TODAY.year || (year === TODAY.year && month < TODAY.month)) {
    return null;
  }
  if (year === TODAY.year && month === TODAY.month) {
    return TODAY.day;
  }
  return 1;
}

export const MONTHS_NOMINATIVE = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const DAYS_OF_WEEK = [
  'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
];

export const DAYS_OF_WEEK_SHORT = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export function buildCalendarGrid(year, month) {
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

export function compareDates(date1, date2) {
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

export function isDateSelectable(day, month, year, today) {
  return compareDates({ day: day, month: month, year: year }, today) >= 0;
}

export function getWeekdayIndex(day, month, year) {
  return (new Date(year, month - 1, day).getDay() + 6) % 7;
}

export function getEndTime(time) {
  const parts = time.split(':');
  const hour = Number(parts[0]) + 1;
  return hour + ':' + parts[1];
}
