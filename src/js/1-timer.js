import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

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

      window.alert('Please choose a date in the future');
      
      return;
    }
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
  },
};

flatpickr(selector, options);