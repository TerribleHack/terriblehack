const msgArea = document.querySelector('#msg-area');
const msgField = document.querySelector('#msg-box');
const sendBtn = document.querySelector('#msg-send-btn');
const botTypingArea = document.querySelector('#bot-is-typing-area');
const botStatusField = document.querySelector('#status');

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

function disconnectBot() {
  msgField.disabled = true;
  sendBtn.disabled = true;
  const msgElement = document.createElement('div');
  msgElement.appendChild(document.createTextNode('TerribleHack Bot has disconnected.'));
  msgElement.classList.add('msg', 'msg-announce');
  msgArea.appendChild(msgElement);
  botStatusField.classList.remove('status-online');
  botStatusField.classList.add('status-offline');
  botStatusField.textContent = ' Offline';
}

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
  if (isUnacceptable(message)) {
    disconnectBot();
    return;
  }

  const msg = message.toLowerCase();

  const patterns = [
    [/\b(hi|hello|hey|howdy)\b/g, 'Hello there!'],
    [/\b(when|where|time|place|shopify|spotify)\b/g, 'TerribleHack 7 will be on July 22 at Shopify Waterloo, from 10:00am to 6:00pm.'],
    [/\b(thank|goose)\b/g, 'thank mr goose'],
    [/(\bwater\b)+/g, 'loo loo loo'],
    [/^f$/, 'E'],
    [/^e$/, 'R'],
    [/^r$/, 'I'],
    [/^i$/, 'D'],
    [/^d$/, 'U'],
    [/^u$/, 'N'],
    [/^n$/, 'honk honk'],
    [/\bhonk\b/g, 'honk honk'],
    [/\( ͡° ͜ʖ ͡°\)/g, '( ͡° ͜ʖ ͡°)'],
    [/\b(htn|north)\b/g, 'Hack the North is at http://hackthenorth.com/!'],
    [/\b(remote|remotely|skype)\b/g, 'Yeah you can work remotely.'],
    [/\b(facebook|fb)\b/g, 'The event is at https://www.facebook.com/events/133574963908298/'],
    [/\b(free|food|pizza|catering|pay|money|tilt|gofundme|cash|credit|debit|watcard)\b/g, 'You can support TerribleHack 7 at the GoFundMe (https://www.gofundme.com/terriblehack-7)!'],
  ];

  const randomMsgs = [
    'honk',
    'thank mr goose',
    'Most hackathons are about coming up with innovative new ideas and making plausible startup prototypes. This one is different. This one is about having fun.',
    'F',
    'I am just a simple bot, my purpose is to direct you to https://www.facebook.com/events/133574963908298/',
    'TODO: come up with more answers',
    '( ͡° ͜ʖ ͡°)',
  ];

  const newMsgs = patterns.filter(p => p[0].test(msg)).map(p => p[1]);
  if (newMsgs.length) {
    pendingBotMessages.push(...newMsgs);
  } else {
    pendingBotMessages.push(randomMsgs[Math.floor(randomMsgs.length * Math.random())]);
  }
  doBotTalk();
}

function doBotTalk() {
  if (!pendingBotMessages.length) {
    botTypingArea.hidden = true;
    return;
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
    doBotTalk();
  }, responseDelay);
}

function isUnacceptable(message) {
  const badWords = [
    'uoft',
    'toronto',
    'panino',
  ]
  return badWords.some((word) => message.toLowerCase().indexOf(word) >= 0);
}
