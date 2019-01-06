/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps";
import { Button } from 'react-bootstrap';

import * as routes from '../../constants/routes';
import { updateUser } from '../../Redux/actions/authActions';

class MapDirectionsCheck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coords: {}
    };

    this.updateCoords = this.updateCoords.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
      this.getDirections();
    });
  }

  updateCoords({ latitude, longitude }) {
    this.setState({ coords: { latitude, longitude } })
  }

  onSubmit = () => {

    const { history } = this.props;

    history.push(routes.DASHBOARD);
  }

  getDirections() {
    let DirectionsService = new google.maps.DirectionsService();
    const { placeLat, placeLng, myLat, myLng } = this.props.user;

    DirectionsService.route({
      origin: new google.maps.LatLng(myLat, myLng),
      destination: new google.maps.LatLng(placeLat, placeLng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        alert("Sorry! Can't calculate directions!")
      }
    });
  }

  render() {
    const { coords, directions } = this.state;
    const { placeLat, placeLng, myLat, myLng } = this.props.user;
    // console.log(lngDest)

    return (
      <div>
        <MyMapComponent
          latDest={placeLat}
          lngDest={placeLng}
          myLat={myLat}
          myLng={myLng}
          isMarkerShown
          coords={coords}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyABuOTBtrZC2CiPulKk4xIpM1qQU25PZjE&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          directions={directions}
        />
        <div className='App'>
          <Button bsStyle="primary" onClick={() => this.onSubmit()}>Back</Button>
        </div>
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: Number(props.myLat), lng: Number(props.myLng) }}
  >

    <Marker position={{ lat: Number(props.myLat), lng: Number(props.myLng) }} />
    <Marker position={{ lat: Number(props.latDest), lng: Number(props.lngDest) }} />

    {props.directions && <DirectionsRenderer directions={props.directions} />}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MapDirectionsCheck));