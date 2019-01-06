import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as routes from '../../constants/routes';
import { Button, Col, Thumbnail } from 'react-bootstrap';

import { updateUser } from '../../Redux/actions/authActions';
import coffee from './images/Coffee.jpg';
import juice from './images/Juice.jpg';
import cocktail from './images/Cocktail.jpg';

class ProfileBeverages extends Component {
	constructor(props) {
		super(props)

		this.state = {
			beverages1: false,
			beverages2: false,
			beverages3: false,
			duration1: false,
			duration2: false,
			duration3: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = (event) => {
		const {
			beverages1,
			beverages2,
			beverages3,
			duration1,
			duration2,
			duration3,
		} = this.state;

		const {
			history,
			user,
		} = this.props;

		event.preventDefault();

		beverages1
			? localStorage.setItem("beverages1", 'Coffee')
			: localStorage.setItem("beverages1", beverages1)
		beverages2
			? localStorage.setItem("beverages2", 'Juice')
			: localStorage.setItem("beverages2", beverages2)

		beverages3
			? localStorage.setItem("beverages3", 'Cocktail')
			: localStorage.setItem("beverages3", beverages3)

		duration1
			? localStorage.setItem("duration1", '20min')
			: localStorage.setItem("duration1", duration1)

		duration2
			? localStorage.setItem("duration2", '60min')
			: localStorage.setItem("duration2", duration2)

		duration3
			? localStorage.setItem("duration3", '120min')
			: localStorage.setItem("duration3", duration3)

		this.props.updateUser({
			...user,
			beverages1: localStorage.getItem('beverages1'),
			beverages2: localStorage.getItem('beverages2'),
			beverages3: localStorage.getItem('beverages3'),
			duration1: localStorage.getItem('duration1'),
			duration2: localStorage.getItem('duration2'),
			duration3: localStorage.getItem('duration3'),
		});

		history.push(routes.MAP);
	}

	render() {
		const {
			beverages1,
			beverages2,
			beverages3,
			duration1,
			duration2,
			duration3,
		} = this.state;

		// console.log(this.state);	

		return (
			<div className='App'>
				<h1>Profile Screen</h1>
				<h2>Select Beverages</h2>
				<div>
					<Col xs={12} sm={4} md={4} lg={4}>
						<Thumbnail src={coffee} alt="Coffee" id='coffee'>
							<h3>Coffee</h3>
							<Button bsStyle="primary" onClick={() => this.setState(
								{ beverages1: !beverages1 },
								() => {
									if (beverages1 === true) { document.getElementById("coffee").style.border = ""; }
									else {
										document.getElementById("coffee").style.border = "thick solid red";
									}
								}
							)}>Click</Button>
						</Thumbnail>
					</Col>
					<Col xs={12} sm={4} md={4} lg={4} >
						<Thumbnail src={juice} alt="Juice" id='juice'>
							<h3>Juice</h3>
							<Button bsStyle="primary" onClick={() => this.setState({ beverages2: !beverages2 },
								() => {
									if (beverages2 === true) { document.getElementById("juice").style.border = ""; }
									else {
										document.getElementById("juice").style.border = "thick solid red";
									}
								})}>Click</Button>
						</Thumbnail>
					</Col>
					<Col xs={12} sm={4} md={4} lg={4} >
						<Thumbnail src={cocktail} alt="Cocktail" id='cocktail'>
							<h3>Cocktail</h3>
							<Button bsStyle="primary" onClick={() => this.setState({ beverages3: !beverages3 },
								() => {
									if (beverages3 === true) { document.getElementById("cocktail").style.border = ""; }
									else {
										document.getElementById("cocktail").style.border = "thick solid red";
									}
								})}>Click</Button>
						</Thumbnail>
					</Col>
				</div>
				<h2>Duration of meeting</h2>
				<div>
					<Col xs={12} sm={4} md={4} lg={4} >
						<Thumbnail id='dur1'>
							<h3>20_min</h3>
							<Button bsStyle="primary" onClick={() => this.setState({ duration1: !duration1 },
								() => {
									if (duration1 === true) { document.getElementById("dur1").style.border = ""; }
									else {
										document.getElementById("dur1").style.border = "thick solid red";
									}
								})}>Click</Button>
						</Thumbnail>
					</Col>
					<Col xs={12} sm={4} md={4} lg={4} >
						<Thumbnail id='dur2'>
							<h3>60_min</h3>
							<Button bsStyle="primary" onClick={() => this.setState({ duration2: !duration2 },
								() => {
									if (duration2 === true) { document.getElementById("dur2").style.border = ""; }
									else {
										document.getElementById("dur2").style.border = "thick solid red";
									}
								})}>Click</Button>
						</Thumbnail>
					</Col>
					<Col xs={12} sm={4} md={4} lg={4} >
						<Thumbnail id='dur3'>
							<h3>120_min</h3>
							<Button bsStyle="primary" onClick={() => this.setState({ duration3: !duration3 },
								() => {
									if (duration3 === true) { document.getElementById("dur3").style.border = ""; }
									else {
										document.getElementById("dur3").style.border = "thick solid red";
									}
								})}>Click</Button>
						</Thumbnail>
					</Col>
				</div>
				<br />
				{(beverages1 || beverages2 || beverages3) &&
					(duration1 || duration2 || duration3) &&
					<div>
						<Button onClick={this.onSubmit} bsStyle="primary">
							Next
						</Button>
					</div>
				}
				<br />
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

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(ProfileBeverages));