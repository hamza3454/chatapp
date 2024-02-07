const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', userName => {
    appendMessage(`${userName} connected`)
})

socket.on('user-disconnected', userName => {
    appendMessage(`${userName} disconnected`)
})

// whenever form is submitted, stop page from posting to server
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // emit : sends info from client to server
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

