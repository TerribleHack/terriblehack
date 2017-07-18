const msgArea = document.querySelector('#msg-area');
const msgField = document.querySelector('#msg-box');
const sendBtn = document.querySelector('#msg-send-btn');
const botTypingArea = document.querySelector('#bot-is-typing-area');

let pendingBotMessageCounter = 0;

sendBtn.disabled = true;

msgField.addEventListener('input', () => {
  sendBtn.disabled = !msgField.value;
});

msgField.addEventListener('keypress', (e) => {
  console.log(e);
  if (e.key === 'Enter' && !e.shiftKey) {
    event.preventDefault();
    sendUserMessage(msgField.value);
    msgField.value = '';
    sendBtn.disabled = true;
  }
});

function sendUserMessage(msg) {
  const m = msg || "";
  const newMsg = document.createElement('div');
  newMsg.appendChild(document.createTextNode(m.trim()));
  newMsg.classList.add('msg', 'msg-user');
  msgArea.appendChild(newMsg);

  getBotResponse(m);
}

function getBotResponse(msg) {
  // Display typing message
  const typingDelay = 500 + Math.random() * 1000;
  setTimeout(() => {
    botTypingArea.hidden = false;
    pendingBotMessageCounter++;
  }, typingDelay);

  // Send TH Bot response
  const responseDelay = 2000 + Math.random() * 3000;
  setTimeout(() => {
    const botMsg = "TODO: give an answer";
    const newMsg = document.createElement('div');
    newMsg.appendChild(document.createTextNode(botMsg));
    newMsg.classList.add('msg', 'msg-bot');
    msgArea.appendChild(newMsg);

    pendingBotMessageCounter--;
    if (!pendingBotMessageCounter) {
      botTypingArea.hidden = true;
    }
  }, responseDelay);
}
