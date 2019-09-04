import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
//import isEmpty from '../../validation/is-empty';
import {deleteUser} from '../../actions/profileAction';
import { connect } from 'react-redux';




class ProfileItem extends Component {
 
  componentDidMount() {
    //this.props.getProfiles();
  }
  onDeleteClick(id)
  {
    this.props.deleteUser(id ,this.props.history);
  }
  render() {
    const { profile } = this.props;

    return (
      <center>
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div className="col-lg-12 col-md-12 col-12">
            <h3>Name: {profile.name}</h3>
            <p>
              Type: {profile.type}{' '}  <p>User Id: {profile._id}{' '}</p> 
            </p>

          </div>
          
          <div className="col-md-12 d-inline">
          
          <Link to={`/profile/id/${profile._id}`} className="btn btn-info m-1">
               View Profile 
            </Link>
            
            <button className="btn btn-danger m-1" onClick={this.onDeleteClick.bind(this,profile._id )}>
              Delete Profile
            </button>
          </div>
          
        </div>
      </div>
      </center>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profileItems: state.profileItem
});

export default connect(mapStateToProps, { deleteUser })(withRouter(ProfileItem));
