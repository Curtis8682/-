const { Model, DataTypes } = require('sequelize')
const sequelize = require('./model')
class Feedback extends Model { }
Feedback.init({
  uid: { type: DataTypes.INTEGER },
  content: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('read', 'unread') },
  create_time: { type: DataTypes.TIME }
}, {
  sequelize,
  modelName: 'feedback',
  freezeTableName: true,
  timestamps: false
})
Feedback.removeAttribute('id');
module.exports = Feedback