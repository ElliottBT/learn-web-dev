import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Stepper from './components/Stepper.jsx';
import Footer from './components/Footer.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BookingBottomBar from './components/BookingBottomBar.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import { fetchToday, fetchSlots } from './api.js';
import { MONTHS_GENITIVE, DAYS_OF_WEEK, getWeekdayIndex } from './data/date.js';

function App() {
  const [today, setToday] = useState(null);
  const [todayLoading, setTodayLoading] = useState(true);
  const [todayError, setTodayError] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState({ day: 12, month: 10, year: 2026 });
  const [selectedTime, setSelectedTime] = useState('14:00');

  const [slots, setSlots] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState(null);

  useEffect(() => {
    let actual = true;
    fetchToday()
      .then((data) => {
        if (!actual) return;
        setToday({ day: data.day, month: data.month + 1, year: data.year });
        setCurrentMonth(data.month + 1);
        setCurrentYear(data.year);
        setTodayError(null);
      })
      .catch((error) => {
        if (!actual) return;
        setTodayError(error.message);
      })
      .finally(() => {
        if (actual) setTodayLoading(false);
      });
    return () => {
      actual = false;
    };
  }, []);

  useEffect(() => {
    let actual = true;
    setSlotsLoading(true);
    fetchSlots(selectedDay)
      .then((data) => {
        if (!actual) return;
        const sameDate =
          data.date.day === selectedDay.day &&
          data.date.month === selectedDay.month - 1 &&
          data.date.year === selectedDay.year;
        if (!sameDate) return;
        setSlots(data.slots);
        setSlotsError(null);
      })
      .catch((error) => {
        if (!actual) return;
        setSlotsError(error.message);
      })
      .finally(() => {
        if (actual) setSlotsLoading(false);
      });
    return () => {
      actual = false;
    };
  }, [selectedDay]);

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

          {todayLoading ? (
            <p className="page__loading">Загрузка…</p>
          ) : todayError ? (
            <p className="page__error">Не удалось загрузить данные: {todayError}</p>
          ) : (
            <div className="booking">
              <section className="booking__main" aria-label="Выбор даты и времени">
                <div className="booking__panels">
                  <Calendar
                    year={currentYear}
                    month={currentMonth}
                    today={today}
                    selectedDay={selectedDay}
                    onDayClick={handleDayClick}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                  />
                  <TimeSlots
                    selectedDay={selectedDay}
                    slots={slots}
                    selectedTime={selectedTime}
                    loading={slotsLoading}
                    error={slotsError}
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
