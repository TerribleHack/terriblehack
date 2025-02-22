const elt = document.getElementById('chatbot')
const rsvp = document.getElementById('apply')
let opened = false

rsvp.addEventListener('mouseenter', startChatbot)
function startChatbot() {
  if (opened) return
  opened = true
  elt.setAttribute('style', '')
  setTimeout(() => {
    document.getElementById('speech').setAttribute('style', '')
  }, 1000)
}

document.getElementById('holp').addEventListener('click', () => {
  document.body.style.backgroundColor = '#0f0';
  document.body.style.color = '#f00';
  document.getElementById('p1').setAttribute('style', 'display: none')
  document.getElementById('p2').setAttribute('style', '')
  setTimeout(() => {
    elt.setAttribute('style', 'bottom: -200px')
  }, 2000)
})
