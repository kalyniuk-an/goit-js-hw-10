import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const selector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      startBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      return;
    }
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
  },
};

flatpickr(selector, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  selector.disabled = true;

  const timerId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    const timeComponents = convertMs(timeDifference);

    if (timeDifference <= 0) {
      clearInterval(timerId);
      apdTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      selector.disabled = false;
      return;
    }
    
    apdTimer(timeComponents);
    
  }, 1000);
});

function apdTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  // return value.toString().padStart(2, '0');
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
