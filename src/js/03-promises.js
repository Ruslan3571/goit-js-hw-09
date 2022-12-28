import { Notify } from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const dataInfo = {
    position,
    delay,
  };

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(dataInfo);
      } else {
        reject(dataInfo);
      }
    }, delay);
  });
}

function handelSubmit(event) {
  event.preventDefault();

  const formEl = event.currentTarget.elements;

  let delay = +formEl.delay.value;
  let step = +formEl.step.value;
  let amount = +formEl.amount.value;

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 2000,
          width: '300px',
        });
      })
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 2000,
          width: '300px',
        })
      );
    delay += step;
  }
  form.reset();
}

form.addEventListener('submit', handelSubmit);
