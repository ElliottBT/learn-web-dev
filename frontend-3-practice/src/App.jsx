import { useState } from 'react';
import Header from './components/Header.jsx';
import Stepper from './components/Stepper.jsx';
import Footer from './components/Footer.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BookingBottomBar from './components/BookingBottomBar.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import { TODAY, MONTHS_GENITIVE, DAYS_OF_WEEK, getWeekdayIndex } from './data/date.js';


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

function App() {
  const [currentMonth, setCurrentMonth] = useState(TODAY.month);
  const [currentYear, setCurrentYear] = useState(TODAY.year);
  const [selectedDay, setSelectedDay] = useState({ day: 12, month: 10, year: 2026 });
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [slots] = useState(SLOTS);

  function handlePrevMonth() {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleDayClick(day) {
    setSelectedDay({ day: day, month: currentMonth, year: currentYear });
    setSelectedTime(null);
  }

  function handleTimeSlotClick(time) {
    setSelectedTime(time);
  }

  function handleNextStep() {
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
