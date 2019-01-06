import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { firebase } from '../../firebase';

import logo from './logo.svg';
import './index.css';
// import * as routes from '../../constants/routes';

const Header = ({ user }) =>
	<div className="App">
		{/*{console.log(user)}*/}
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
		</header>
	</div>

const mapStateToProps = (state) => ({
	user: state.authReducers.user,
});

export default connect(mapStateToProps)(Header);