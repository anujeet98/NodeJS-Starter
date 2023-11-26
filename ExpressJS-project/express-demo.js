// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//routes
const adminRoutes = require('./routes/adminRoutes.js');
const shopRoutes = require('./routes/shopRoutes.js');

//controller
const error404Controller = require('./controllers/404ErrorController.js');


const app = express();
//parse body
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, "public")));

app.use('/admin',adminRoutes);
app.use('/shop',shopRoutes);




//error Page handler MW
app.use(error404Controller.Error404);


app.listen(3000);
