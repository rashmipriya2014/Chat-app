const  express =  require("express");
var session = require('express-session');
const app  =  express();
const  ejs   = require("ejs");
const routes = require("./routes/web");
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
const port = 3001;
const io = require('socket.io')(3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use('/',routes);

app.use(express.static('./public'));

// io.socket

io.on('connection', socket => {
    console.log('A new user connected');
    
    socket.on('send-chat-msg',data=>{
        console.log(data);
        socket.broadcast.emit('chat-message'+data.to_id,data);
    });
});



// io.socket ends


var server = app.listen(port,()=>console.log("Server is running "));

