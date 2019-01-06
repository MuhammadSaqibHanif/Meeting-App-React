import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Button, Modal } from 'react-bootstrap';

import { updateUser } from '../../Redux/actions/authActions';
import * as routes from '../../constants/routes';
import { db } from '../../firebase';

// CSS Modules, react-datepicker-cssmodules.css

class DateTime extends Component {
	constructor(props) {
		super(props)

		this.state = {
			startDate: moment(),
			pickTimeDate: null,
			error: null,
			show: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleChange(date) {
		this.setState({
			startDate: date,
			// pickDate: date._d.toLocaleDateString(),
			pickTimeDate: date._d.toLocaleString(),
			// pickTime1: date._d.toLocaleTimeString(),
		});
	}

	onConfirm(pickDate) {
		const { history } = this.props;
		const { pickTimeDate } = this.state;
		const { placeName, placeLng, placeLat, meetUserEmail, emailReff, meetUserName, displayName, meetingDuration } = this.props.user;
		
		// console.log(placeName, placeLng, placeLat, meetUserEmail, emailReff, meetUserName, pickTimeDate); 

		db.meetingDataSave(emailReff, pickTimeDate, placeLat, placeLng, placeName, meetUserName, meetUserEmail)
			.then(() => {
				db.meetingInviteDataSave(emailReff, pickTimeDate, placeLat, placeLng, placeName, meetUserName, meetUserEmail, displayName, meetingDuration)
					.then(() => {
						history.push(routes.DASHBOARD);
					})
					.catch(error => {
						this.setState({ error })
					});
			})
			.catch(error => {
				this.setState({ error })
			});	
	}
	
	onSubmit() {
		this.setState({ show: true });		
	}	
	
	handleClose() {
		this.setState({ show: false });
	}	

	render() {
		const { pickTimeDate, error } = this.state;
		// console.log(this.state);  

		return (
			<div className='App'>
				<h1>Date & Time</h1>

				<DatePicker
					selected={this.state.startDate}
					onChange={this.handleChange}
					showTimeSelect
					dateFormat="LLL"
				/>

				<br /><br />
				<Button bsStyle="primary" onClick={() => this.onSubmit()}>Send Request</Button>
				
				<div>
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Confirmation</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h4>Confirm send request</h4>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={() => this.onConfirm(pickTimeDate)}>Confirm</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DateTime));
