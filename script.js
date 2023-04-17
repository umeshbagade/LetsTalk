const socket = io("https://letstalk-iemb.onrender.com")
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')


// First time taking the name of the user
const username  = prompt("Enter Your Name")
appendMessage("You joined")
socket.emit('user-joined', username)


socket.on('chat-message', msg =>{
    appendMessage(`${msg.uname} : ${msg.message}`)
})

socket.on('user-connected', name =>{
    appendMessage(` ${name}  joined`)
})

socket.on('user-disconnected', name =>{
    appendMessage(` ${name} disconnected`)
})




messageForm.addEventListener('submit', e =>{
    e.preventDefault()

    const message = messageInput.value 
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ""
})


function appendMessage(message) {

    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}   
