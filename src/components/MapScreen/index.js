import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Button } from 'react-bootstrap';

import { updateUser } from '../../Redux/actions/authActions';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';

class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coords: null,
      error: null,
    };

    this.updateCoords = this.updateCoords.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
    });
  }

  updateCoords({ latitude, longitude }) {
    this.setState({ coords: { latitude, longitude } })
  }

  onSubmit() {
    const {
      coords,
    } = this.state;

    const { history, user } = this.props;

    this.props.updateUser({
      ...user,
      myLat: coords.latitude,
      myLng: coords.longitude,
    });
	
	db.ifUserLogin(user.emailReff)
	   .then((snap) => {
			// console.log(!!snap.val())
			// console.log(snap.val())
			if (!!snap.val()) {
				// console.log('already')
    db.doUpdateUser(user.displayName, user.email, user.emailReff, user.photoURL, user.name, user.phoneNumber, user.pic1, user.pic2, user.pic3, user.beverages1, user.beverages2, user.beverages3, user.duration1, user.duration2, user.duration3, coords.latitude, coords.longitude)
      .then(() => {
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error: error });
      });	
	  
			}
			else{
				// console.log('new')
				
				    db.doCreateUser(user.token, user.displayName, user.email, user.emailReff, user.photoURL, user.name, user.phoneNumber, user.pic1, user.pic2, user.pic3, user.beverages1, user.beverages2, user.beverages3, user.duration1, user.duration2, user.duration3, coords.latitude, coords.longitude)
      .then(() => {
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error: error });
      });
	  
			}
      })
      .catch(error => {
        this.setState({ error: error });
      });	
	
  }

  render() {
    const { coords, error } = this.state;
    // console.log(coords)

    return (
      <div>
        {coords && <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coords={coords}
          updateCoords={this.updateCoords}
        />}
        <div className='App'>
          <Button onClick={this.onSubmit} bsStyle="primary">
            Select your Location
		</Button>

          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >

    {props.isMarkerShown &&
      <Marker
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        draggable={true}
        onDragEnd={position => {
          props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
        }}
      />}
  </GoogleMap>
))

const mapStateToProps = state => {
  // console.log(state.authReducers.user)
  return {
    user: state.authReducers.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MapScreen));