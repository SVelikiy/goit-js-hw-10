
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');


form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
    evt.preventDefault();
    const delay = parseInt(form.elements.delay.value);
    const chose = form.elements.state.value;

    setTimeout(() => {
      const promise = new Promise((res, rej) => {
        if (chose === 'fulfilled') {
          res(
            iziToast.show({
              message: `✅ Fulfilled promise in ${delay} ms`,
              backgroundColor: 'green',
              messageColor: '#fff',
              position: 'topRight',
            })
          );
        }
        else {
          rej(
            iziToast.show({
              message: `❌ Rejected promise in ${delay} ms`,
              backgroundColor: 'red',
              messageColor: '#fff',
              position: 'topRight',
            })
          );
        }
      })
          
        promise.then(value => {
          return value;
        })
        .catch(error => {
          return error;
        });  
    },`${delay}`)
    
}
