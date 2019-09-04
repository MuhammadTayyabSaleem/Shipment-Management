import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { assignShipment } from '../../actions/shipmentAction';
import TextFieldGroup from '../common/TextFieldGroup';


class AssignShipment extends Component {
  constructor() {
    super();
    this.state = {
      shipmentId: '',
      userId: '',
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
    console.log(this.state.shipmentId,this.state.workerId)
    const newAssign = {
      shipmentId: this.state.shipmentId,
      userId: this.state.userId
    };

    this.props.assignShipment(newAssign, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="assignShipment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">AssignShipment </h1>
              <p className="lead text-center">
                 by Worker and Shipment ID
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="Shipment ID"
                  name="shipmentId"
                  type="text"
                  value={this.state.shipmentId}
                  onChange={this.onChange}
                  error={errors.shipmentError}
                />
                <TextFieldGroup
                  placeholder="Worker ID"
                  name="userId"
                  type="text"
                  value={this.state.userId}
                  onChange={this.onChange}
                  error={errors.workerError}
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

AssignShipment.propTypes = {
  assignShipment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { assignShipment })(withRouter(AssignShipment));
