// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const loginRoute = require('./login');
const chatPageRoute = require('./chatPage');


const app = express();

//parsebody
app.use(bodyParser.urlencoded({extended: false}));

app.use(loginRoute);
app.use(chatPageRoute);

app.use((req,res) => {
    res.status(404).send('<h1>Error 404: page not found</h1>');
});

app.listen(3000);

