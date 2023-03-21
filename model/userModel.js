// userModel
const { Model, DataTypes } = require('sequelize')
const sequelize = require('./model')
class User extends Model { }
User.init({
  uid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('worker', 'admin', 'common'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user',
  freezeTableName: true,
  timestamps: false
})
module.exports = User


