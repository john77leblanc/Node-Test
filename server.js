const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const port = 3000;

const apiKey = "abc123";

// Spicy curry
let findUser = name => search => name.toLowerCase() === search.toLowerCase();

function removeSpaces(text) {
    return text.replace(/\s+/g,"_");
}

function addSpaces(text) {
    return text.replace(/"_"/g," ");
}

function getUserList() {
    return fs.readFileSync('./lib/users.txt','utf8')
        .trim()
        .replace(/\r/g,"")
        .split(/\n/)
        .map(addSpaces);
}

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/requestData', (req, res) => {
    let query = req.body;
    let users = getUserList();
    let user = users.find(findUser(query.name));

    if (user && fs.existsSync(`./lib/userData/${user}.json`)) {
        let data = JSON.parse(fs.readFileSync(`./lib/userData/${user}.json`,'utf8')).data;
        res.status(200).send(data);
    } else {
        let data = "User not found";
        res.status(200).send(data);
    }
});

app.post('/add-name', (req, res) => {
    let query = req.body;
        query.name = query.name.trim();
        query.saying = query.saying.trim();

    let uName = removeSpaces(query.name);

    let users = getUserList();
    let user = users.find(findUser(uName));

    let message ='';

    if (!query.name || !query.saying) {
        message = "Name or saying missing.";
    }
    else if (user) {
        message = "User already exists.";
    }
    else if (!user && query.name && query.saying) {
        fs.appendFileSync('./lib/users.txt', '\n'+uName);
        let content = `{"username":"${query.name}","data":"${query.saying}"}`;
        fs.writeFileSync(`./lib/userData/${uName}.json`, content);
        message = "User and saying added.";
    }
    res.status(200).send(message);
});

app.get('/names', (req, res) => {
    let api = req.query.apiKey;
    if (api === apiKey) {
        let users = getUserList();
        res.status(200).send(users);
    }
    else {
        res.status(200).send("Invalid API");
    }
});

app.get('*', (req, res) => {
    res.status(404).send("Page not found");
});

http.listen(port, () => console.log("App listening on port", port));