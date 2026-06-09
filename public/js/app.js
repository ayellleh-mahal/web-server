console.log('Client side javascript is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input[type="text"]');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

function handleSubmit(event) {
  event.preventDefault();
  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';

  const location = search.value;

  fetch(`/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    })
  );
}

weatherForm.addEventListener('submit', handleSubmit);
