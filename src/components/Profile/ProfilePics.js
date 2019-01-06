import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import { updateUser } from '../../Redux/actions/authActions';
import * as routes from '../../constants/routes';
import { storage } from '../../firebase';


class ProfilePics extends Component {
	constructor(props) {
		super(props)
    
		this.state = {
			pic_1: '',
			pic_2: '',
			pic_3: '',
			error: null,
		};
		
		this.onSubmit = this.onSubmit.bind(this);
	}
	
    onSubmit = (event) => {
    const {
      pic_1,
      pic_2,
	  pic_3,
    } = this.state;
	
    const { history, user } = this.props;	
	
	event.preventDefault();
	
	const refer = `${user.emailReff} ${user.displayName}`;
	// console.log(refer)	
	
	storage.imagesRef.child(`images/${refer}/pic_1`).put(pic_1)
	.then((snapshot) => {		
	  snapshot.ref.getDownloadURL()
	  .then((pic1) => {
		this.props.updateUser({ ...user, pic1});
		storage.imagesRef.child(`images/${refer}/pic_2`).put(pic_2)
		.then((snapshot) => {
		  snapshot.ref.getDownloadURL()
		  .then((pic2) => {
			this.props.updateUser({ ...user, pic1, pic2});
			storage.imagesRef.child(`images/${refer}/pic_3`).put(pic_3)
			.then((snapshot) => {
			  snapshot.ref.getDownloadURL()
			  .then((pic3) => {
				this.props.updateUser({ ...user, pic1, pic2, pic3}); 
				console.log('Uploaded 3 files!');
				history.push(routes.PROFILE_3);
			  })
			  .catch(error => {
				console.log(error);    
			  });	
			})
		  })
		})	
	  })
	})	
  }	
	
  render() {
	const { 
		pic_1, 
		pic_2,
		pic_3,
		error,
	} = this.state;
	
	// console.log(this.state);
	
    const isInvalid =
      pic_1 === '' ||
	  pic_2 === '' ||
      pic_3 === '';	
	
    return (
      <form onSubmit={this.onSubmit}>	
		<h1 className='App'>Profile Screen</h1>	
		<ListGroup>
		<ListGroupItem>
		<input 
			name="pic_1"
			type='file'
			accept="image/*"
			onChange={(event) => this.setState({ pic_1: event.target.files[0] })}
		/>
		</ListGroupItem>
		<ListGroupItem>
		<input 
			name="pic_2"
			type='file'
			accept="image/*"
			onChange={(event) => this.setState({ pic_2: event.target.files[0] })}
		/>
		</ListGroupItem>
		<ListGroupItem>
		<input 
			name="pic_3"
			type='file'
			accept="image/*"
			onChange={(event) => this.setState({ pic_3: event.target.files[0] })}
		/>		
		</ListGroupItem>
		</ListGroup>
		<div className='App'>
		<Button disabled={isInvalid} type="submit" bsStyle="primary">
			Next
		</Button>				
		</div>
		
		{error && <p>{error.message}</p>}
      </form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ProfilePics));