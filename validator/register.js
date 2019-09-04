const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.type = !isEmpty(data.type) ? data.type : '';

  if(!Validator.isLength(data.name,{min:3,max:20})){
    errors.name = 'Name must be atlest 3 and atmax 20 characters';
  }
  if(Validator.isEmpty(data.name)){
    errors.name = 'Name field is Required';
  }
  
  if(!Validator.isLength(data.username,{min:3,max:20})){
    errors.username = 'Username must be atlest 3 and atmax 20 characters';
  }
  if(Validator.isEmpty(data.username)){
    errors.username = 'Username field is Required';
  }
  
  if(!Validator.isLength(data.password,{min:6,max:20})){
    errors.password = 'Password must be atlest 6 and atmax 20 characters';
  }
  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is Required';
  }

  if((data.type.localeCompare('admin') == 0) || data.type.localeCompare('worker') ==0){
    
  }
  else{
    errors.type = 'Type must be admin or worker';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  
  if(Validator.isEmpty(data.type)){
    errors.type = 'Type field is Required';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}