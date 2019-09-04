import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileAction';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import RegisterShipment from './components/auth/RegisterShipment';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AssignShipment from './components/dashboard/AssignShipment';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Shipment from './components/shipment/Shipment';
import UpdateShipment from './components/shipment/UpdateShipment';
import Shipments from './components/shipments/Shipments';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <div className="container">
              
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <AdminRoute exact path="/register" component={Register}/>
                <AdminRoute exact path="/assignShipment" component={AssignShipment}/>
                <AdminRoute exact path="/registerShipment" component={RegisterShipment}/>
                <AdminRoute exact path="/profiles" component={Profiles} />
                <PrivateRoute exact path="/shipments" component={Shipments} />
                <PrivateRoute exact path="/profile/id/:id" component={Profile} />
                <PrivateRoute exact path="/updateShipment/id/:id" component={UpdateShipment} />
                <PrivateRoute exact path="/shipment/id/:id" component={Shipment} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
