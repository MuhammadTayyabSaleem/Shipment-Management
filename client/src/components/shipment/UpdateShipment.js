import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getShipmentByHandle, updateShipmentStatus } from '../../actions/shipmentAction';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class UpdateShipment extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      shipmentId: this.props.match.params.id,
      shipmentStatus: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newShipment = {
      shipmentId: this.state.shipmentId,
      shipmentStatus: this.state.shipmentStatus
    };
    console.log(newShipment);
    this.props.updateShipmentStatus(newShipment, this.props.history);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getShipmentByHandle(this.props.match.params.id);
      console.log(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shipment.shipment === null && this.props.shipment.loading) {
      this.props.history.push('/not-found');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Shipment </h1>
              
              <form noValidate onSubmit={this.onSubmit}>
              
                <TextAreaFieldGroup
                  placeholder="Enter new shipment status"
                  name="shipmentStatus"
                  type="text"
                  value={this.state.shipmentStatus}
                  onChange={this.onChange}
                  error={errors.statusError}
                  info="The status must be 5 to 1500 characters"
                />
                
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateShipment.propTypes = {
  updateShipmentStatus: PropTypes.func.isRequired,
  getShipmentByHandle: PropTypes.func.isRequired,
  shipment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shipment: state.shipment,
  errors: state.errors
});

export default connect(mapStateToProps, { getShipmentByHandle,updateShipmentStatus })(UpdateShipment);
