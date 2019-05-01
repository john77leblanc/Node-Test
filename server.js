const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const port = 3000;

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/requestData', (req, res) => {
    let query = req.body;

    let findUser = name => name.toLowerCase() === query.name.toLowerCase();

    let users = fs.readFileSync('./lib/users.txt','utf8')
        .trim()
        .replace(/\r/g,"")
        .split(/\n/);

    let user = users.find(findUser);
    if (user && fs.existsSync(`./lib/userData/${user}.json`)) {
        let data = JSON.parse(fs.readFileSync(`./lib/userData/${user}.json`,'utf8')).data;
        res.status(200).send(data);
    } else {
        let data = "User not found";
        res.status(200).send(data);
    }
});

app.get('/names', (req, res) => {
    let users = fs.readFileSync('./lib/users.txt','utf8')
        .trim()
        .replace(/\r/g,"")
        .split(/\n/);
    res.status(200).send(users);
});

app.get('*', (req, res) => {
    res.status(404).send("Page not found");
});

http.listen(port, () => console.log("App listening on port", port));