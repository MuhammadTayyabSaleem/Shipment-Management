import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShipmentHeader from './ShipmentHeader';
import Spinner from '../common/Spinner';
import { getShipmentByHandle } from '../../actions/shipmentAction';

class Shipment extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getShipmentByHandle(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shipment.shipment === null && this.props.shipment.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { shipment, loading } = this.props.shipment;
    let shipmentContent;

    if (shipment === null || loading) {
      shipmentContent = <Spinner />;
    } else {
      shipmentContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/shipments" className="btn btn-light mb-3 float-left">
                Back 
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          { <ShipmentHeader shipment={shipment} />}
          
        </div>
      );
    }

    return (
      <div className="shipment">
        <div className="container">
          <div className="row">
          
            <div className="col-md-12">{shipmentContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Shipment.propTypes = {
  getShipmentByHandle: PropTypes.func.isRequired,
  shipment: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  shipment: state.shipment,
  
});

export default connect(mapStateToProps, { getShipmentByHandle })(Shipment);
