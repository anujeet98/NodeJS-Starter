const {Sequelize} = require('sequelize');

const sequelize = require('../util/db.js');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:  Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;