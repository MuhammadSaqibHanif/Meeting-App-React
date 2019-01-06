import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, Panel } from 'react-bootstrap';

import { updateUser } from '../../Redux/actions/authActions';
import * as routes from '../../constants/routes';

class MeetingPoint extends Component {
	constructor(props) {
		super(props)

		this.state = {
			point: [],
			error: null,
		}

		this.getDirections = this.getDirections.bind(this);
		this.goNextPage = this.goNextPage.bind(this);
	}

	componentDidMount() {
		const { myLat, myLng } = this.props.user;

		axios(`https://api.foursquare.com/v2/venues/explore?client_id=RMYJWGPIVUN4OCYHLADEVG0G1LZFEONSHQA3CBPKNMRUGRVL&client_secret=C2FLL2JQA1PPLC132UTZOHDDEFR2QE1B2XSMQEUSYAET1CFK&v=20180323&limit=3&ll=${myLat},${myLng}`)
			.then(result => {
				// console.log(result.data.response.groups)	

				this.setState({
					point: [
						{
							name: result.data.response.groups[0].items[0].venue.name,
							lat: result.data.response.groups[0].items[0].venue.location.lat,
							lng: result.data.response.groups[0].items[0].venue.location.lng,
						},
						{
							name: result.data.response.groups[0].items[1].venue.name,
							lat: result.data.response.groups[0].items[1].venue.location.lat,
							lng: result.data.response.groups[0].items[1].venue.location.lng,
						},
						{
							name: result.data.response.groups[0].items[2].venue.name,
							lat: result.data.response.groups[0].items[2].venue.location.lat,
							lng: result.data.response.groups[0].items[2].venue.location.lng,
						}
					]
				})
			})
			.catch(error => {
				this.setState({ error })
			});
	}

	getDirections(lat, lng, placeName) {
		// console.log(lat, lng)
		const { history, user, updateUser } = this.props;

		updateUser({
			...user,
			placeName,
			placeLat: lat,
			placeLng: lng,
		})

		history.push(routes.MAPDIRECTION);
	}

	goNextPage(lat, lng, placeName) {
		const { history, user, updateUser } = this.props;

		updateUser({
			...user,
			placeName,
			placeLat: lat,
			placeLng: lng,
		})

		history.push(routes.DATETIME);		
	}
	
	render() {
		const { point, error } = this.state;
		// console.log(nameRec, refEmail)

		return (
			<div className='App'>
				<h1>Meeting Point Screen</h1>
				{point.map((value, index) =>
					<div key={index}>
						<Panel eventKey="1" bsStyle="primary" style={{ marginRight: 20, marginLeft: 20 }}>
							<Panel.Heading>
								<Panel.Title componentClass="h3" toggle><span style={{ fontSize: '150%' }}>{value.name}</span></Panel.Title>
							</Panel.Heading>
							<Panel.Body collapsible>
								<Button bsStyle="primary" onClick={() => this.goNextPage(value.lat, value.lng, value.name)}>Next</Button>
								&nbsp;&nbsp;&nbsp;
									<Button bsStyle="primary" onClick={() => this.getDirections(value.lat, value.lng, value.name)}>Get Directions</Button>
							</Panel.Body>
						</Panel>
					</div>
				)}

				{error && <p>{error}</p>}
			</div>
		);
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MeetingPoint));