import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerShipment } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


class RegisterShipment extends Component {
  constructor() {
    super();
    this.state = {
      shipmentName: '',
      status: '',
      errors: {}
    };

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newShipment = {
      shipmentName: this.state.shipmentName,
      status: this.state.status
    };

    this.props.registerShipment(newShipment, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register Shipment </h1>
              
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="Shipment Name"
                  name="shipmentName"
                  type="text"
                  value={this.state.shipmentName}
                  onChange={this.onChange}
                  error={errors.shipmentName}
                  info="Use a unique shipment name"
                />
                <TextAreaFieldGroup
                  placeholder="Shipment status"
                  name="status"
                  type="text"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="The status must 5 to 1500 characters"
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

RegisterShipment.propTypes = {
  registerShipment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerShipment })(withRouter(RegisterShipment));
