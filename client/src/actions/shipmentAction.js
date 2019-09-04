import axios from 'axios';

import {
  GET_SHIPMENT,
  GET_SHIPMENTS,
  SHIPMENT_LOADING,
  GET_ERRORS,

} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setShipmentLoading());
  axios
    .get('/api/shipment')
    .then(res =>
      dispatch({
        type: GET_SHIPMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SHIPMENT,
        payload: {}
      })
    );
};

//assign shipment
export const assignShipment = (shipmentData, history) => dispatch => {
  console.log('assign shipment called')
  
  axios
  .post('/api/assign-shipment', shipmentData)
  .then(res => {
    window.alert(res.data.sucess);
     history.push('/dashboard');})
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
  );
};

//update shipment
export const updateShipmentStatus = (shipmentData, history) => dispatch => {
  console.log('update shipment called')
  
  axios
  .post('/api/shipment/update-shipment', shipmentData)
  .then(res => {
    console.log(res);
    window.alert(res.data.updateSuccessful);
    window.location.reload();
    })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
  );
};


// Get shipment by handle
export const getShipmentByHandle = (id) => dispatch => {
  dispatch(setShipmentLoading());
  axios
    .get(`/api/shipment/id/${id}`)
    .then(res =>{console.log(res);
      dispatch({
        type: GET_SHIPMENT,
        payload: res.data
      })}
    )
    .catch(err =>{console.log(err);
      dispatch({
        type: GET_SHIPMENT,
        payload: null
      })}
    );
};

// Delete Shipment
export const deleteShipment = (id , history) => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')){
  axios
    .delete(`/api/shipment/id/${id}`)
    .then(res =>{
      window.location.reload();
      dispatch({
        type: GET_SHIPMENT,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}};

// Get all Shipments
export const getShipments = () => dispatch => {
  dispatch(setShipmentLoading());
  axios
    .get('/api/shipment/all')
    .then(res => 
      dispatch({
        type: GET_SHIPMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SHIPMENTS,
        payload: null
      })
    );
};

// Profile loading
export const setShipmentLoading = () => {
  return {
    type: SHIPMENT_LOADING
  };
};

