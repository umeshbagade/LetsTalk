const socket = io("https://letstalk-backend.onrender.com")
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')


// First time taking the name of the user
const username  =  prompt("Enter Your Name")

appendOne("You joined")
socket.emit('user-joined', username)


socket.on('chat-message', msg =>{
    appendMessage(msg.uname, msg.message)
})

socket.on('user-connected', name =>{
    appendOne(name +" joined")
})

socket.on('user-disconnected', name =>{
    appendOne(name+" disconnecetd")
})




messageForm.addEventListener('submit', e =>{
    e.preventDefault()

    const message = messageInput.value 
    // appendMessage("You", message)
    appendme(message)
    socket.emit('send-chat-message', message)
    messageInput.value = ""
})
function appendme(message) {
    const sender = document.createElement('div')
    sender.classList.add('sender')
    sender.classList.add('new-align')
    sender.innerText = "You"

    const msg = document.createElement('div')
    msg.classList.add('text')
    msg.classList.add('sent')
    msg.innerText = message;


    const messageElement = document.createElement('div')
    messageElement.classList.add('message')


    messageElement.append(sender);
    messageElement.append(msg)
    messageContainer.append(messageElement)
}
function appendOne(msg) {
    const sender = document.createElement('div')
    sender.classList.add('sender')
    sender.classList.add('atcenter')
    sender.innerText = msg

    const messageElement = document.createElement('div')
    messageElement.classList.add('message')


    messageElement.append(sender);
    messageContainer.append(messageElement)
}

function appendMessage(user, message) {


    const sender = document.createElement('div')
    sender.classList.add('sender')
    sender.innerText = user

    const msg = document.createElement('div')
    msg.classList.add('text')
    msg.innerText = message;


    const messageElement = document.createElement('div')
    messageElement.classList.add('message')


    messageElement.append(sender);
    messageElement.append(msg)
    messageContainer.append(messageElement)
}   
