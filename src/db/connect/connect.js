
const { Sequelize } = require('sequelize');
const { nameDb, nameUser, password, host,dialect, port }  = require('./cofig');
       
        const sequelize = new Sequelize(nameDb, nameUser, password, { host, dialect, port });
        
        sequelize.authenticate().then(()=>console.log('connectDb')).catch((error=> console.error(error)));

module.exports = sequelize;

