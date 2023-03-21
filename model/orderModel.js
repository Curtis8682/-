const { Model, DataTypes, INTEGER } = require('sequelize')
const sequelize = require('./model')

class Order extends Model { }
Order.init({
  oid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  vid: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  date: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('待接种', '已接种', '已过期'),
    defaultValue: '待接种',
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'order',
  freezeTableName: true,
  timestamps: false
})

module.exports = Order