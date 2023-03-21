// inoculatorModel
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./model')
class Inoculator extends Model { }
Inoculator.init({
  id: {
    type: DataTypes.CHAR,
    primaryKey: true,
    allowNull: false
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  tel: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  sex: {
    type: DataTypes.ENUM(['男', '女']),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
  },
  current: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reaction: {
    type: DataTypes.TEXT,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'inoculator',
  freezeTableName: true,
  timestamps: false
})


module.exports = Inoculator

