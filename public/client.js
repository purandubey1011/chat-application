const socket = io()

let name;
const textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let username = document.querySelector('.username')
let brand = document.querySelector('.brand')

do{
    name = prompt('enter your name...').trim()
    let userDiv = document.createElement('b')
    userDiv.classList.add('username')
    userDiv.innerHTML = `${name}`
    brand.appendChild(userDiv) 
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
   let msg={
        user:name,
        message:message.trim()
    }

    // append 
    appendMessage(msg,'outgoing')
    textarea.value = ""
    scrollToBottom()

    // send to server 
    socket.emit("message",msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    // let userDiv = document.createElement('strong')

    let className = type;

    mainDiv.classList.add(className ,'message')


    let markup = `
    <h4 id="user_h4">${msg.user}</h4>
    <p>${msg.message}</p>
    `
    // userDiv.innerHTML = `${msg.user}`

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    // brand.appendChild(userDiv) 
    
}

// reciving msg 

socket.on("message",(msg)=>{
    // console.log(msg)
    appendMessage(msg,"incoming")
    scrollToBottom()
})

// scroll to bottom

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}