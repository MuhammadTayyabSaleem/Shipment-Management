const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isLength(data.username,{min:3,max:30})){
    errors.username = 'Username must be atlest 3 and atmax 30 characters';
  }
  if(Validator.isEmpty(data.username)){
    errors.username = 'Username field is Required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }; 
};
