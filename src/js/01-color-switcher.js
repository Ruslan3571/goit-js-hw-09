const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const INTERVAL_DELAY = 1000;
let interval = null;

btnStart.addEventListener('click', changeColor);
btnStop.addEventListener('click', onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);

  btnStart.disabled = true;
}

function onBtnStop() {
  clearInterval(interval);
  btnStart.disabled = false;
}
