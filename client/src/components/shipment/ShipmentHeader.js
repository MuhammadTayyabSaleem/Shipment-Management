import React, { Component } from 'react';
import image from './user.png';

class ShipmentHeader extends Component {
  render() {
    const { shipment } = this.props;

    return (
      <div className="row ">
        <div className="col-md-12 ">
          <div className="card card-body text-white mb-3 " style={{background:'#FFCC33'}}>
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={image}
                  alt=""
                  style={{background:'white'}}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">Title: <p>{shipment.shipmentName}</p></h1>
              <p className="lead text-center">
                {shipment.type}
              </p>
              <center>
              <p className="lead text-center col-md-8 ">
                Status: <p> {shipment.status}</p> 
              </p></center>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShipmentHeader;
