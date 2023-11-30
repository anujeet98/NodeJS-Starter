const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const seqelize = require('./util/db.js');
const { Sequelize } = require('sequelize');
//------------------------------------------------------------------------------
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

//------------------------------------------------------------------------------
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


seqelize
    .sync()
    .then(result=>{
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.error(err);
    })
