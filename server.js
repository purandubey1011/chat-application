const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 8000


http.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})

app.get('/',(req,res)=>{
    // res.send('hellow world')
    res.sendFile(__dirname + "/index.html")
})

// socket

const io = require('socket.io')(http)

    io.on('connection',(socket)=>{
        console.log('connected...')

    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })

})