const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }, 
  shipments:[{
      type:Schema.Types.ObjectId,
      ref: 'shipments',
      default:''
  }]
});
module.exports = User = mongoose.model('users', UserSchema, 'users');