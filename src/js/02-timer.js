import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnTimerStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

btnTimerStart.disabled = true;
let timerId = null;
const INTERVAL_DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      btnTimerStart.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future', {
        timeout: 5000,
        width: '300px',
      });
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();

    const countdown = selectedDate - startTime;
    btnTimerStart.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimeFace(convertMs(countdown));
  }, INTERVAL_DELAY);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimeFace({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

const fp = flatpickr('#datetime-picker', options);
console.log('fp', fp);
btnTimerStart.addEventListener('click', onTimerStart);
