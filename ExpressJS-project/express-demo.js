// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//parse body
app.use(bodyParser.urlencoded({extended:false}));


app.use('/add-product', (req, res) => {
    res.send('<form method="post" action="/product"><input type="text" name="product" placeholder="product name"><input type="text" name="size" placeholder="size"><input type="submit" value="submit"></form>')
});

app.use('/product', (req,res)=>{
    console.log(req.body);
    console.log(req.body.product);
    console.log(req.body.size);
    res.redirect('/');
});

app.use('/', (req,res,next) => {
    //middleware
    console.log('welcome to express JS');
    res.send('<h1>Welcome to Express JS</h1>');
    // next();
});

// app.use((req,res,next) => {
//     //middleware
//     console.log('inside middleware 2');
//     res.send({'key':'value'});
// });

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);