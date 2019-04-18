var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://Master:12test345@testcluster-xdi1l.mongodb.net/test?retryWrites=true';

const Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [];

app.get('/messages', (req, res)=>{
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res)=>{
    let message = new Message(req.body);

    message.save(err=>{
        if (err) sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

io.on('connection', socket => console.log('a user connected'));

mongoose.connect(dbUrl,{useNewUrlParser: true},err => console.log("Database connection", err));

var server = http.listen(3000, () => {
    console.log("Server running on port", server.address().port);
});