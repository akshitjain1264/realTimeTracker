
const express = require("express");
const app = express();
const http = require('http');
const path = require('path');

//Socket.io for real-time tracking
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
// app.set(express.static(path.join(__dirname, 'views')));

//Handling socket io
io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("received-location", {id: socket.id, ...data});
    })

    //On disconnecting User
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });
    console.log("connected");
});

app.get("/", function(req, res){
    res.render("index");
})

server.listen(3000);