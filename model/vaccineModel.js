const { Model, DataTypes } = require('sequelize')
const sequelize = require('./model')
class Vaccine extends Model { }

Vaccine.init({
  vid: {
    type: DataTypes.CHAR,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  remain: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  method: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  company: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  produce_time: {
    type: DataTypes.TIME
  },
  in_time: {
    type: DataTypes.TIME
  }
}, {
  sequelize,
  modelName: 'vaccine',
  freezeTableName: true,
  timestamps: false
})

module.exports = Vaccine