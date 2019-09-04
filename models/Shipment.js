const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
  workers: {
    type:[Schema.Types.ObjectId],
    ref: 'users',
    default:[]
  },
  shipmentName:{
    type:String,
    required:true
  },
  status:{
    type: String,
    required: true,
    max: 1500
  },
  wait:{
    type: Boolean,
    default: false
  }
  
});

module.exports = Shipment = mongoose.model('shipments', ShipmentSchema, 'shipments');