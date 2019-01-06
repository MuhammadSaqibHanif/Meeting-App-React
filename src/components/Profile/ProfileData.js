import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Grid } from 'react-bootstrap';

import * as routes from '../../constants/routes';
import { updateUser } from '../../Redux/actions/authActions';

class ProfileData extends Component {
	constructor(props) {
		super(props)
    
		this.state = {
			name: '',
			phoneNumber: '',
		};
		
		this.onSubmit = this.onSubmit.bind(this);
	}
	
    onSubmit = (event) => {
    const {
      name,
      phoneNumber,
    } = this.state;
	
    const { history, user } = this.props;	

    this.props.updateUser({ 
		...user,
        name,
        phoneNumber,
    });		
	
	history.push(routes.PROFILE_2);

    event.preventDefault();
  }	
	
  render() {
	const { 
		name, 
		phoneNumber,
	} = this.state;
	
	// console.log(this.state);
	
    const isInvalid =
      name === '' ||
      phoneNumber === '';	
	
    return (	
      <Form horizontal onSubmit={this.onSubmit}>
		<Grid>
		  <h1 className='App'>Profile Screen</h1>	
		  <FormGroup>	
			<Col componentClass={ControlLabel} sm={2}>
				Nick Name
			</Col>
			<Col sm={10}>
				<FormControl 
					type="text" 
					placeholder="Nick Name" 
					value={name} 
					onChange={(event) => this.setState({ name: event.target.value })} 
				/>
			</Col>
		  </FormGroup>
		  <FormGroup>
			<Col componentClass={ControlLabel} sm={2}>
				Phone Number
			</Col>
			<Col sm={10}>
				<FormControl 
					type="text" 
					placeholder="Phone Number" 
					value={phoneNumber} 
					onChange={(event) => this.setState({ phoneNumber: event.target.value })} 
				/>
			</Col>
		  </FormGroup>
		  <FormGroup>
			<Col className='App'>
				<Button 
					type="submit"
					disabled={isInvalid}
					bsStyle="primary"
				>
					Next
				</Button>
			</Col>
		</FormGroup>					
		</Grid>
      </Form>	 
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
)(withRouter(ProfileData));