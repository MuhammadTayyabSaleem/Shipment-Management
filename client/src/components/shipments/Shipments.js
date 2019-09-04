import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ShipmentItem from './ShipmentItem';
import { getShipments } from '../../actions/shipmentAction';

class Shipments extends Component {
  componentDidMount() {
    this.props.getShipments();
  }

  render() {
    const { user } = this.props.auth;
    const {shipments,  loading } = this.props.shipment;
    let shipmentItems;
    let count=[];
    

    if ( shipments === null || loading) {
      shipmentItems = <Spinner />;
    } else {

      if (user.type === 'admin'){

      if (shipments.length > 0) {
        shipmentItems = shipments.map(shipment => (
          <ShipmentItem key={shipments._id} shipment={shipment} />
          
        ));
        
      } else {
        shipmentItems = <h4>No Shipments found...</h4>;
      }}
      else{
        if (user.shipments.length > 0) {
          shipmentItems = user.shipments.map(shipment => (
            <ShipmentItem key={shipments._id} shipment={shipment} />
            
          ));
          
        } else {
          shipmentItems = <h4>No Shipments found...</h4>;
        }
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Shipments!</h1>
              {count}
              {shipmentItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Shipments.propTypes = {
  getShipments: PropTypes.func.isRequired,
  shipment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shipment: state.shipment,
  auth:state.auth
});

export default connect(mapStateToProps, { getShipments })(Shipments);
