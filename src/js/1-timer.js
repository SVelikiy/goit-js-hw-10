import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  startbutton: document.querySelector('button'),
  timer: document.querySelector('.timer'),
  field: document.querySelector('.field'),
  values: document.querySelectorAll('.value'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userSelectedDate;
elements.startbutton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDate = selectedDates[0];
    const currentTime = Date.now();
    if (selectDate.getTime() < currentTime) {
      elements.startbutton.disabled = true;
      iziToast.show({
        title: 'ERROR',
        message: 'Please choose a date in the future',
        color: '#ef4040',
        titleSize: '40px',
        titleColor: '#fff',
        messageSize: '20px',
        messageColor: '#fff',
        position : 'topRight'
      });
    } else {
      userSelectedDate = selectDate;
      elements.startbutton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

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
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

elements.startbutton.addEventListener('click', handlerTimer);

function handlerTimer() {
  elements.startbutton.disabled = true;
  elements.input.disabled = true;
  const timer = setInterval(() => {
    const nowTime = Date.now();
    const timeOf = userSelectedDate.getTime() - nowTime;
    if (timeOf / 1000 <= 1) {
      elements.input.disabled = false;
      clearInterval(timer);
    }
    const dateEnd = convertMs(timeOf);
    elements.days.textContent = addLeadingZero(dateEnd.days);
    elements.hours.textContent = addLeadingZero(dateEnd.hours);
    elements.minutes.textContent = addLeadingZero(dateEnd.minutes);
    elements.seconds.textContent = addLeadingZero(dateEnd.seconds);
  }, 1000);
}
