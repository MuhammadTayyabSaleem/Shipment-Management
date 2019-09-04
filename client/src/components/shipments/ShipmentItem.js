import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {deleteShipment} from '../../actions/shipmentAction';
import { connect } from 'react-redux';




class ShipmentItem extends Component {
 
  componentDidMount() {
    //this.props.getProfiles();
  }
  onDeleteClick(id)
  {
    this.props.deleteShipment(id ,this.props.history);
  }
  render() {
    const { user } = this.props.auth;
    const { shipment } = this.props;
    let display;

      if (user.type === 'admin'){
        display=
        <div className="col-md-6 d-inline ">
          <Link to={`/shipment/id/${shipment._id}`} className="btn btn-info m-1">
               View Shipment
            </Link>
            <Link to={`/updateShipment/id/${shipment._id}`} className="btn btn-success m-1" style={{background:'#FFCC33', border:"0px"}}>
              Update Shipment
            </Link>
            <button className="btn btn-danger m-1" onClick={this.onDeleteClick.bind(this,shipment._id )}>
              Delete Shipment
            </button>
          </div>;
    
    }


      else{
        display=
        <div className="col-md-6 d-inline " >
          <Link to={`/shipment/id/${shipment._id}`} className="btn btn-success m-1">
               View Shipment
            </Link>
            <Link to={`/updateShipment/id/${shipment._id}`} className="btn btn-success m-1" style={{background:'#FFCC33', border:"0px"}}>
              Update Shipment
            </Link>
            
          </div>;
      }
    





    return (
      <center>      
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div className="col-lg-12 col-md-12 col-12 d-inline">
            <h3>Name: {shipment.shipmentName}</h3>
            <p>
              ID: {shipment._id}{' '}  
            </p>
            
            {display}
            
          </div>
          
        </div>
      </div>
      </center>
    );
  }
}

ShipmentItem.propTypes = {
  shipment: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  shipmentItems: state.shipmentItem,
  auth:state.auth
});

export default connect(mapStateToProps, { deleteShipment })(withRouter(ShipmentItem));
