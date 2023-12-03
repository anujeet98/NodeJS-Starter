

const {Sequelize} = require('sequelize');
const seqelize =  require('../util/db.js');


const CartItems = seqelize.define('cartItem',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});


module.exports = CartItems;