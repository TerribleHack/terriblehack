const msgArea = document.querySelector('#msg-area');
const msgField = document.querySelector('#msg-box');
const sendBtn = document.querySelector('#msg-send-btn');
const botTypingArea = document.querySelector('#bot-is-typing-area');

sendBtn.disabled = true;

msgField.addEventListener('input', () => {
  sendBtn.disabled = !msgField.value;
});

msgField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    event.preventDefault();
    sendUserMessage(msgField.value);
    msgField.value = '';
    sendBtn.disabled = true;
  }
});

function sendUserMessage(message) {
  const msg = message || "";
  const msgElement = document.createElement('div');
  msgElement.appendChild(document.createTextNode(msg.trim()));
  msgElement.classList.add('msg', 'msg-user');
  msgArea.appendChild(msgElement);

  getBotResponse(msg);
}

const pendingBotMessages = [];

function getBotResponse(message) {
  const msg = message.toLowerCase();

  const patterns = [
    [/\b(when|where)\b/g, 'TerribleHack 7 will be on July 22 at Shopify Waterloo, from 10:00am to 6:00pm.'],
    [/\b(thank|goose)\b/g, 'thank mr goose'],
    [/\b(facebook|fb)\b/g, 'The event is at https://www.facebook.com/events/133574963908298/'],
    [/\b(pay|money|tilt|gofundme|cash|credit|debit|watcard)\b/g, 'You can support TerribleHack 7 at the GoFundMe (https://www.gofundme.com/terriblehack-7)!'],
  ]

  const newMsgs = patterns.filter(p => p[0].test(msg)).map(p => p[1]);
  if (newMsgs.length) {
    pendingBotMessages.push(...newMsgs);
  } else {
    pendingBotMessages.push('TODO: give an answer');
  }


  const typingDelay = 500 + Math.random() * 1000;
  const responseDelay = 2000 + Math.random() * 3000;

  setTimeout(() => {
    botTypingArea.hidden = !pendingBotMessages.length
  }, typingDelay);

  setTimeout(() => {
    const botMsg = pendingBotMessages.shift();
    if (botMsg) {
      const newMsg = document.createElement('div');
      newMsg.appendChild(document.createTextNode(botMsg));
      newMsg.classList.add('msg', 'msg-bot');
      msgArea.appendChild(newMsg);
    }

    botTypingArea.hidden = !pendingBotMessages.length
  }, responseDelay);
}
