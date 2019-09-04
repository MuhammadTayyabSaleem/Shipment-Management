import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/users/current')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (id) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/users/id/${id}`)
    .then(res =>{console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })}
    )
    .catch(err =>{console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: null
      })}
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





// Delete User
export const deleteUser = (id , history) => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')){
  axios
    .delete(`/api/users/id/${id}`)
    .then(res =>{
      window.location.reload();
      dispatch({
        type: GET_PROFILE,
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

export const deleteExperience = (id, history) => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/users/all')
    .then(res => 
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};



// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
