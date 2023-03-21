const Sequelize = require('sequelize')
const sequelize = new Sequelize('bs', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
})
module.exports = sequelize