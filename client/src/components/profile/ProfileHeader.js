import React, { Component } from 'react';
import image from './user.png';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row ">
        <div className="col-md-12 ">
          <div className="card card-body bg-info text-white mb-3 " >
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={image}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.name}</h1>
              <p className="lead text-center">
                {profile.type}
              </p>
              <p className="lead text-center">
                Username : {profile.username}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
