
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: 'rootoor'
// });

// module.exports = pool.promise();
//----------------------------------------------------------------------

const Sequelize = require('sequelize');

const seqelize = new Sequelize('node_complete','root','rootoor',{
    dialect: 'mysql',
    hostname: 'localhost'
});

module.exports = seqelize;
