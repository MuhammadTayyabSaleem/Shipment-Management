import {GET_ERRORS, SET_CURRENT_USER} from './types'; 
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
  
  axios
  .post('/api/users/register', userData)
  .then(res => {console.log(res); history.push('/dashboard');})
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
  );
};

// REGISTER Shipment
export const registerShipment = (shipmentData, history) => dispatch => {
  
  axios
  .post('/api/shipment/create-shipment', shipmentData)
  .then(res => {console.log(res); history.push('/dashboard');})
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
  );
};

//LOGIN
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login',userData)
  .then(res => {
    //save to local storage
    const {token} = res.data;
    localStorage.setItem('jwtToken', token);
    //set token to auth header
    setAuthToken(token);
    //decode token
    const decoded = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decoded)); 

  })
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};  

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};