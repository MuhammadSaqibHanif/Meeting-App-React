import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddToCalendar from 'react-add-to-calendar';
import { Button, Tabs, Tab } from 'react-bootstrap';

import DashboardData from './DashboardData';
import DashboardInvitationData from './DashboardInvitationData';
import DashboardProfileData from './DashboardProfileData';
import * as routes from '../../constants/routes';
import { db } from '../../firebase';
import { updateUser } from '../../Redux/actions/authActions';

class Dashboard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userData: [],
			invitationData: [],
			error: null,
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.profileChange = this.profileChange.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.getDirection = this.getDirection.bind(this);
	}

	componentDidMount() {
		const { emailReff } = this.props.user;
		db.meetingUsersData(emailReff)
			.then(snap => {
				snap.forEach(againSnap => {
					// console.log(againSnap.val().meetUserEmail)
					let meetUserEmail = againSnap.val().meetUserEmail;
					db.meetingUsersPic(meetUserEmail)
						.then(snaps => {
							// console.log(snaps.val())
							this.setState((prevState) => {
								let { userData } = prevState;
								return {
									userData: [
										...userData,
										{
											avatar: snaps.val(),
											name: againSnap.val().meetUserName,
											date: againSnap.val().pickTimeDate,
											place: againSnap.val().placeName,
											statuses: againSnap.val().statuses,
										},
									]
								};
							});
						})
				})
			})
			.catch(error => {
				this.setState({ error });
			});
		db.meetingInvitationData(emailReff)
			.then(snap => {
				snap.forEach(againSnap => {
					// console.log(againSnap.val().emailReff)
					let invitationUserEmail = againSnap.val().emailReff;
					db.meetingUsersPic(invitationUserEmail)
						.then(snaps => {
							// console.log(snaps.val())
							this.setState((prevState) => {
								let { invitationData } = prevState;
								return {
									invitationData: [
										...invitationData,
										{
											avatar: snaps.val(),
											emailReff: againSnap.val().emailReff,
											name: againSnap.val().displayName,
											date: againSnap.val().pickTimeDate,
											place: againSnap.val().placeName,
											placeLat: againSnap.val().placeLat,
											placeLng: againSnap.val().placeLng,
											statuses: againSnap.val().statuses,
											meetingDuration: againSnap.val().meetingDuration,
										},
									]
								};
							});
						})
				})
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	onSubmit() {
		const { history } = this.props;

		history.push(routes.MEETING);
	}

	profileChange() {
		const { history } = this.props;

		history.push(routes.PROFILE_1);
	}

	onConfirm(otherUserserEmailReff, status) {

		db.meetingInviteObjStatusChange(this.props.user.emailReff, otherUserserEmailReff, status)
			.then(snaps => {
				// console.log(snaps.val())
				db.meetingObjStatusChange(this.props.user.emailReff, otherUserserEmailReff, status)
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	getDirection(placeLat, placeLng) {
		const { history, user } = this.props;
		//console.log(placeLat, placeLng)
		//console.log(this.props.user.myLat, this.props.user.myLng)
		this.props.updateUser({
			...user,
			placeLat,
			placeLng,
		});

		history.push(routes.MAPDIRECTIONCHECK);
	}

	render() {
		const { userData, error, invitationData } = this.state;
		const { user } = this.props;
		// console.log(userData, invitationData)

		return (
			<div>
				<h1 className='App'>Dashboard Screen</h1>
				{userData.length > 0
					?	<div className='App'>
							<Button onClick={this.onSubmit} bsStyle="primary">
								Set another meeting!
							</Button>
						</div>
					:	<div>
							<h2 className='App'>You haven’t done any meeting yet!</h2>
							<div className='App'>
								<Button onClick={this.onSubmit} bsStyle="primary">
									Set a meeting!
								</Button>
							</div>
						</div>						
				}
				
				<hr />	
						<Tabs defaultActiveKey={7} id="uncontrolled-tab-example">
							<Tab eventKey={1} title="PENDING">
								<DashboardData 
									userData={userData}
									statusTitle='PENDING'	
								/>
							</Tab>
							<Tab eventKey={2} title="CANCELLED">
								<DashboardData 
									userData={userData}
									statusTitle='CANCELLED'	
								/>
							</Tab>
							<Tab eventKey={3} title="ACCEPTED">
								<DashboardData 
									userData={userData}
									statusTitle='ACCEPTED'	
								/>
							</Tab>
							<Tab eventKey={4} title="COMPLICATED ">
								<DashboardData 
									userData={userData}
									statusTitle='COMPLICATED'	
								/>
							</Tab>
							<Tab eventKey={5} title="DONE">
								<DashboardData 
									userData={userData}
									statusTitle='DONE'	
								/>
							</Tab>
							<Tab eventKey={6} title="INVITATION">
								<DashboardInvitationData 
									invitationData={invitationData}	
									user={user}
									getDirection={this.getDirection}
									onConfirm={this.onConfirm}
								/>								
							</Tab>
							<Tab eventKey={7} title="MY PROFILE">
								<DashboardProfileData 	
									user={user}
									profileChange={this.profileChange}
								/>																
							</Tab>
						</Tabs>

				{error && <p>{error}</p>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.authReducers.user)
	return {
		user: state.authReducers.user,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateUser: user => dispatch(updateUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));