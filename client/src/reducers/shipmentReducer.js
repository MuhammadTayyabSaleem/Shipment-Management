import {GET_SHIPMENT,GET_SHIPMENTS, SHIPMENT_LOADING} from '../actions/types';

const initialState = {
  shipment: null,
  shipments: null,
  loading: false,
}

export default function(state = initialState, action){
  switch (action.type) {

      case SHIPMENT_LOADING:
      return {
        ...state,
        loading:true
      };

      case GET_SHIPMENT:
      return {
        ...state,
        shipment: action.payload,
        loading:false
      };

      case GET_SHIPMENTS:
      return {
        ...state,
        shipments: action.payload,
        loading:false
      };

      
    default:
    return state;
  }
}