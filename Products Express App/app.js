const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const seqelize = require('./util/db.js');
const { Sequelize } = require('sequelize');

const User = require('./models/user.js');
const Product = require('./models/product.js');
//------------------------------------------------------------------------------
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    User.findByPk(1)
        .then((user)=>{
            req.user = user;
            next();
        })
        .catch(err => {
            console.error(err);
        })
})

//------------------------------------------------------------------------------
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

seqelize
    // .sync({force:true})
    .sync()
    .then(result=>{
        // console.log(result);
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name: "max", email: 'max@gmail.com'});
        }

        return Promise.resolve(user);
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(err => {
        console.error(err);
    });
