const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateShipmentInput(data){
  let errors = {};

  data.shipmentName = !isEmpty(data.shipmentName) ? data.shipmentName : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  
  if(!Validator.isLength(data.shipmentName,{min:3,max:30})){
    errors.shipmentName = 'Shipment name must be atlest 3 and atmax 30 characters';
  }
  if(Validator.isEmpty(data.shipmentName)){
    errors.shipmentName = 'Shipment name is Required';
  }
  
  if(!Validator.isLength(data.status,{min:5,max:1500})){
    errors.status = 'Status must be atlest 5 and atmax 1500 characters';
  }
  if(Validator.isEmpty(data.status)){
    errors.status = 'Status field is Required';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}