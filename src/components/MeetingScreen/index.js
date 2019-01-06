import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Carousel, Col, Row, Modal, Image } from 'react-bootstrap';
import { Card, CardWrapper } from 'react-swipeable-cards';

import * as routes from '../../constants/routes';
import { db } from '../../firebase';
import { updateUser } from '../../Redux/actions/authActions';

let helper = [];

class Meeting extends Component {
	constructor(props) {
		super(props)

		this.state = {
			error: null,
			show: false,
			recieverName: null,
			recieverEmail: null,
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		// this.onSwipeLeft = this.onSwipeLeft.bind(this);
		this.onSwipeRight = this.onSwipeRight.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		const { myLat, myLng, beverages1, beverages2, beverages3, duration1, duration2, duration3, emailReff } = this.props.user;
		db.onceGetUsers()
			.then((snap) => {
				snap.forEach((childSnap) => {
					// console.log(childSnap.val())	
					const dbBev1 = childSnap.val().beverages1;
					const dbBev2 = childSnap.val().beverages2;
					const dbBev3 = childSnap.val().beverages3;
					const dbDur1 = childSnap.val().duration1;
					const dbDur2 = childSnap.val().duration2;
					const dbDur3 = childSnap.val().duration3;
					const dbEmailRef = childSnap.val().emailReff;
					const lat2 = childSnap.val().myLat;
					const lon2 = childSnap.val().myLng;

					const radlat1 = Math.PI * myLat / 180
					const radlat2 = Math.PI * lat2 / 180
					const theta = myLng - lon2
					const radtheta = Math.PI * theta / 180
					let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
					if (dist > 1) {
						dist = 1;
					}
					dist = Math.acos(dist)
					dist = dist * 180 / Math.PI
					dist = dist * 60 * 1.1515
					dist = dist * 1.609344;
					// console.log(dist, dbEmailRef)		

					if (dist <= 5) {

						if ((beverages1 && beverages1 === dbBev1 && dbEmailRef !== emailReff) || (beverages2 && beverages2 === dbBev2 && dbEmailRef !== emailReff) || (beverages3 && beverages3 === dbBev3 && dbEmailRef !== emailReff)) {
							if (duration1 && duration1 === dbDur1 && dbEmailRef !== emailReff) {
								// console.log(childSnap.val())
								helper.push({...childSnap.val(), duration: childSnap.val().duration1});
								this.setState({
									[dbEmailRef]: childSnap.val(),
									[dbEmailRef + 'duration']: childSnap.val().duration1,
								})
							}
							else if (duration2 && duration2 === dbDur2 && dbEmailRef !== emailReff) {
								helper.push({...childSnap.val(), duration: childSnap.val().duration2});
								this.setState({
									[dbEmailRef]: childSnap.val(),
									[dbEmailRef + 'duration']: childSnap.val().duration2,
								})
							}
							else if (duration3 && duration3 === dbDur3 && dbEmailRef !== emailReff) {
								helper.push({...childSnap.val(), duration: childSnap.val().duration3});
								this.setState({
									[dbEmailRef]: childSnap.val(),
									[dbEmailRef + 'duration']: childSnap.val().duration3,
								})
							}
						}
					}
				})
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	onSubmit(recieverEmail, recieverName, meetingDuration) {
		this.setState({ show: true, recieverName, recieverEmail, meetingDuration });
		// console.log(this.state.'recieverEmailduration')
	}

	onConfirm() {
		const { history, user, updateUser } = this.props;
		const { recieverName, recieverEmail, meetingDuration } = this.state;

		updateUser({
			...user,
			meetUserName: recieverName,
			meetUserEmail: recieverEmail,
			meetingDuration,
		})
		
		history.push(routes.MEETINGPOINT);
	}

	handleClose() {
		this.setState({ show: false });
	}

	onSwipeLeft() {
	 	console.log("I was swiped left.");
	}

	onSwipeRight(recieverEmail, recieverName) {
		this.onSubmit(recieverEmail, recieverName);
	}

	render() {
		const { error, recieverName } = this.state;
		// console.log(helper);

		const wrapperStyle = {
			// backgroundColor: "#024773",
			// width: 800,
			height: 1000,
		}

		const cardStyle = {
			// backgroundColor: "#059FFF",
			height: 950,
			// width: 600,
		}

		return (
			<div>
				<h1 className='App'>Meeting Screen</h1>
				{helper.length > 0 &&
					<CardWrapper
						style={wrapperStyle}
					>
						{helper.map((value, index) =>
							<Card
								key={index}
								helper={value}
								style={cardStyle}
								onSwipeLeft={this.onSwipeLeft}
								onSwipeRight={() => this.onSwipeRight(value.emailReff, value.displayName)}
							>
								<Carousel interval={null}>
									<Carousel.Item>
										<Image width={'100%'} height={'100%'} alt="pic1" src={value.pic1} responsive />
									</Carousel.Item>
									<Carousel.Item>
										<Image width={'100%'} height={'100%'} alt="pic2" src={value.pic2} responsive />
									</Carousel.Item>
									<Carousel.Item>
										<Image width={'100%'} height={'100%'} alt="pic3" src={value.pic3} responsive />
									</Carousel.Item>
								</Carousel>
								<Row>
									<Col xs={2} sm={2} md={2} lg={2} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1} style={{ marginTop: 30 }}>
										<Button bsStyle="danger">
											<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
										</Button>
									</Col>
									<Col xs={6} sm={6} md={6} lg={6}>
										<h1 className='App'>{value.displayName}</h1>
										<h3 className='App' style={{ color: 'grey' }}>{value.name}</h3>
									</Col>
									<Col xs={2} sm={2} md={2} lg={2} style={{ marginTop: 30 }}>
										<Button bsStyle="success" onClick={() => this.onSubmit(value.emailReff, value.displayName, value.duration)}>
											<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
										</Button>
									</Col>
								</Row>
							</Card>
						)}
					</CardWrapper>
				}

				<div>
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Confirm Meeting!</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h4>Do you want to meet {recieverName} ?</h4>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.onConfirm}>Confirm</Button>
							<Button onClick={this.handleClose}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Meeting));