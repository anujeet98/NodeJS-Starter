// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
//parse body
app.use(bodyParser.urlencoded({extended:false}));


app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
    // next();
});


app.listen(3000);