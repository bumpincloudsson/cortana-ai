import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// loading animation for bot chat as we wait for the API to respond with an answer
function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

// types the bot response a letter at a time
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// generates a unique id per message to easily map them on the UI
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// returns the HTML skeleton for each message
function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img 
              src="${isAi ? bot : user}"
              alt="${isAi ? 'bot' : 'user'}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  // get data from the form (form argument comes from line 4)
  const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  // empty out the user textarea
  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);
  // scroll down as the bot's message is typed out
  chatContainer.scrollTop = chatContainer.scrollHeight;
  // create a message div for the bot message
  const messageDiv = document.getElementById(uniqueId);
  // start the loading animation for the bot's chat
  loader(messageDiv);

  // fetch the bot's response from our server
  // first we send the prompt from the user to the server
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });
  // stop the loading animation for the bot's chat
  clearInterval(loadInterval);
  // empty bot's chat
  messageDiv.innerHTML = '';

  // get the bot's response from the server
  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    console.log('bot response:', parsedData);
    // place the reponse from our server into the bot chat stripe
    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = 'Something went wrong';

    alert(err);

    console.log('New Error: ', err);
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
