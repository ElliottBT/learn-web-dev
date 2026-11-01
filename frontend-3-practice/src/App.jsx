import { useState } from 'react';
import Header from './components/Header.jsx';
import Stepper from './components/Stepper.jsx';
import Footer from './components/Footer.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BookingBottomBar from './components/BookingBottomBar.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import {
  TODAY,
  compareDates,
  MONTHS_GENITIVE,
  DAYS_OF_WEEK,
  getWeekdayIndex,
  getSlotsForDate,
  firstAvailableDayOfMonth
} from './data/date.js';

function App() {
  const [currentMonth, setCurrentMonth] = useState(TODAY.month);
  const [currentYear, setCurrentYear] = useState(TODAY.year);
  const [selectedDay, setSelectedDay] = useState({ day: TODAY.day, month: TODAY.month, year: TODAY.year });
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState(getSlotsForDate(TODAY.day, TODAY.month, TODAY.year));

  function changeMonth(delta) {
    let month = currentMonth + delta;
    let year = currentYear;
    if (month < 1) {
      month = 12;
      year = year - 1;
    }
    if (month > 12) {
      month = 1;
      year = year + 1;
    }

    setCurrentMonth(month);
    setCurrentYear(year);

    const day = firstAvailableDayOfMonth(month, year);
    const nextDay = day === null ? null : { day: day, month: month, year: year };
    setSelectedDay(nextDay);
    setSelectedTime(null);
    setSlots(nextDay === null ? [] : getSlotsForDate(nextDay.day, month, year));
  }

  function handlePrevMonth() {
    changeMonth(-1);
  }

  function handleNextMonth() {
    changeMonth(1);
  }

  function handleDayClick(day) {
    setSelectedDay({ day: day, month: currentMonth, year: currentYear });
    setSelectedTime(null);
    setSlots(getSlotsForDate(day, currentMonth, currentYear));
  }

  function handleTimeSlotClick(time) {
    setSelectedTime(time);
  }

  function handleNextStep() {
    const dayOk =
      selectedDay !== null &&
      compareDates(selectedDay, TODAY) >= 0;
    if (!dayOk) {
      alert('Выберите доступную дату визита в календаре.');
      return;
    }

    if (!selectedTime) {
      alert('Выберите время визита — свободные слоты подсвечены.');
      return;
    }

    alert(
      'Запись подтверждена: ' +
      DAYS_OF_WEEK[getWeekdayIndex(selectedDay.day, selectedDay.month, selectedDay.year)] + ', ' +
      selectedDay.day + ' ' + MONTHS_GENITIVE[selectedDay.month - 1] + ' ' + selectedDay.year +
      ', ' + selectedTime + '.'
    );
  }

  return (
    <div className="app">
      <Header />
      <Stepper />

      <main>
        <div className="container page">
          <div className="page__head">
            <div className="page__head-row">
              <a className="back-link" href="#">← Назад</a>
              <span className="page__step-hint">Шаг 3 из 5</span>
            </div>
            <h1 className="page__title">Выберите время для себя</h1>
            <p className="page__subtitle">
              Дмитрий · Комплекс стрижка + борода · 60 мин. Время указано по Москве.
            </p>
          </div>

          <div className="booking">
            <section className="booking__main" aria-label="Выбор даты и времени">
              <div className="booking__panels">
                <Calendar
                  year={currentYear}
                  month={currentMonth}
                  selectedDay={selectedDay}
                  onDayClick={handleDayClick}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                />
                <TimeSlots
                  selectedDay={selectedDay}
                  slots={slots}
                  selectedTime={selectedTime}
                  onTimeSlotClick={handleTimeSlotClick}
                />
              </div>

              <BookingBottomBar
                selectedDay={selectedDay}
                selectedTime={selectedTime}
                onNextStep={handleNextStep}
              />
            </section>

            <SummaryCard selectedDay={selectedDay} selectedTime={selectedTime} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
