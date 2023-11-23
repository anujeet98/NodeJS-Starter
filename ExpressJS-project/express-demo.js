const http = require('http');
const express = require('express');

const app = express();

app.use((req,res,next) => {
    //middleware
    console.log('inside middleware 1');
    next();
});

app.use((req,res,next) => {
    //middleware
    console.log('inside middleware 2');
    res.send('<h1>ExpressJS basics</h1>');
});

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);