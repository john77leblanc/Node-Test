const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://Master:12test345@testcluster-xdi1l.mongodb.net/test?retryWrites=true';

const Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    console.log(req);
})

app.get('/messages', (req, res)=>{
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res)=>{
    let message = new Message(req.body);

    message.save().then(err=>{
        if (err) sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

io.on('connection', socket => console.log('a user connected'));

mongoose.connect(dbUrl,{useNewUrlParser: true},err => console.log("Database connection", err));

const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
 
    console.log("Server listening at http://%s:%s", host, port)
 })