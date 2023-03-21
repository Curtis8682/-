const { Model, DataTypes } = require('sequelize')
const sequelize = require('./model')
class Institution extends Model { }
Institution.init({
  iid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  name: {
    type: DataTypes.CHAR,
    allowNull: true
  },
  detail_address: {
    type: DataTypes.CHAR,
    allowNull: true
  },
  intro: {
    type: DataTypes.CHAR,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'institution',
  freezeTableName: true,
  timestamps: false
})
module.exports = Institution