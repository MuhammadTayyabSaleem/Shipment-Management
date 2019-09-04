import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getProfiles } from '../../actions/profileAction';
import { getShipments } from '../../actions/shipmentAction';


import isEmpty from '../../validation/is-empty'


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getProfiles();
    this.props.getShipments();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profiles, loading } = this.props.profile;
    const { shipments,loading2 } = this.props.shipment;

    let dashboardContent;
    let usersCount=0;
    let shipmentsCount=0;


    
    
    
    if (user.type === 'admin') {

      if(!loading && !isEmpty(profiles) ){
        usersCount=profiles.length;
      }
      if(!loading2 && !isEmpty(shipments) ){
        shipmentsCount=shipments.length;
      }
 
      dashboardContent = (
        
        <div>
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Here you can register user and shipments and assign shipments to workers.</p>
            <center></center>
              <Link to="/register" className="btn btn-lg btn-info m-1 text-center">
                Register User
              </Link>
              <Link to="/registerShipment" className="btn btn-lg btn-info m-1">
                Register Shipment
              </Link>
          </div>
              <div>
                <center>
              <Link to="/profiles" className="btn btn-lg btn-success text-center m-5" style={{height:"150px",width:"200px", color:"white"}}>
              Users
              <h1 style={{fontSize:'70px'}}>{usersCount}</h1>
            </Link>
            
            <Link to="/shipments" className="btn btn-lg text-center m-5" style={{height:"150px",width:"200px", color:"white", background:'#FFCC33'}}>
            Shipments
            <h1 style={{fontSize:'70px'}}>{shipmentsCount}</h1>
            </Link>

            <Link to="/assignShipment" className="btn btn-lg text-center m-5" style={{height:"150px",width:"200px", color:"white", background:'#FF8030'}}>
            Assign Shipments
            <h1 style={{fontSize:'70px'}}>{shipmentsCount}</h1>
            </Link>
            </center>
            </div>
        </div>
      );
    } else {
      if(!loading && !isEmpty(user) ){
        //var allshipment = shipments.id;
        shipmentsCount=user.shipments.length;
      }
      // User is logged in but has no profile
      dashboardContent = (
        <div>
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>Here you can view shipments assigned to you and update them</p>
          <Link to={`/profile/id/${user.id}`} className="btn btn-info m-1">
               View Profile 
            </Link>
            <div>
              <center>
              <Link to="/shipments" className="btn btn-lg btn-success text-center " style={{height:"130px",width:"200px", color:"white"}}>
           <h3> View Shipments
            and Update
            </h3>
            </Link>
            
            <Link to="/shipments" className="btn btn-lg text-center " style={{height:"130px",width:"100px", color:"white", background:'#FFCC33', overflow:true ,marginLeft:'-5px'}}>
            
            <h1 style={{fontSize:'70px'}}>{shipmentsCount}</h1>
            </Link>
            </center>
            </div>
        </div>
        </div>
      );
    }




    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getShipments: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  shipment: state.shipment
});

export default connect(mapStateToProps, { getCurrentProfile, getProfiles, getShipments })(
  Dashboard
);
