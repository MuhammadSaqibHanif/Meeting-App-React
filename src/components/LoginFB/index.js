import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import { firebase, auths, db } from '../../firebase';
import { updateUser } from '../../Redux/actions/authActions';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class LoginFB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.login = this.login.bind(this);
  }

  login() {
    const { history } = this.props;

    firebase
      .auth()
      .signInWithPopup(auths.provider)
      .then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        console.log(token)
        const user = result.user;
        // const user = {
         //  email: 'qaz@gmail.com',
        // }

        if (!!user.email) {
          const emailRef = user.email;
          const firstChar = emailRef.indexOf('.');
          if (firstChar !== -1) {
            let emailReff = emailRef.slice(0, firstChar);

            db.ifUserLogin(emailReff)
              .then(snap => {
                const loginEmailData = snap.val();

                if (!!loginEmailData) {
                  this.props.updateUser({
                    token: snap.val().token,
                    displayName: snap.val().displayName,
                    email: snap.val().email,
                    emailReff: snap.val().emailReff,
                    photoURL: snap.val().photoURL,
                    name: snap.val().name,
                    phoneNumber: snap.val().phoneNumber,
                    pic1: snap.val().pic1,
                    pic2: snap.val().pic2,
                    pic3: snap.val().pic3,
                    beverages1: snap.val().beverages1,
                    beverages2: snap.val().beverages2,
                    beverages3: snap.val().beverages3,
                    duration1: snap.val().duration1,
                    duration2: snap.val().duration2,
                    duration3: snap.val().duration3,
                    myLat: snap.val().myLat,
                    myLng: snap.val().myLng,
                  })
                  history.push(routes.DASHBOARD);
                } else {
                  this.props.updateUser({
                    token,
                    emailReff,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                  });
                  history.push(routes.PROFILE_1);
                }
              })
              .catch(err => {
                this.setState(byPropKey('error', err));
              });
          }
        } else {
          let nameReff = user.displayName;
          db.ifUserLogin(nameReff)
            .then(snap => {
              const loginNameData = snap.val();

              if (!!loginNameData) {
                this.props.updateUser({
                  token: snap.val().token,
                  displayName: snap.val().displayName,
                  email: snap.val().email,
                  emailReff: snap.val().emailReff,
                  photoURL: snap.val().photoURL,
                  name: snap.val().name,
                  phoneNumber: snap.val().phoneNumber,
                  pic1: snap.val().pic1,
                  pic2: snap.val().pic2,
                  pic3: snap.val().pic3,
                  beverages1: snap.val().beverages1,
                  beverages2: snap.val().beverages2,
                  beverages3: snap.val().beverages3,
                  duration1: snap.val().duration1,
                  duration2: snap.val().duration2,
                  duration3: snap.val().duration3,
                  myLat: snap.val().myLat,
                  myLng: snap.val().myLng,
                })
                history.push(routes.DASHBOARD);
              } else {
                this.props.updateUser({
                  token,
                  nameReff,
                  photoURL: user.photoURL,
                });
                history.push(routes.PROFILE_1);
              }
            })
            .catch(err => {
              this.setState(byPropKey('error', err));
            });
        }
      })
      .catch(error => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        this.setState(byPropKey('error', errorMessage));
        //console.log('***', errorMessage)
        // The email of the user's account used.
        //const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //const credential = error.credential;
      });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="App">
        <br />
        <Button onClick={this.login} bsStyle="primary" bsSize="large">
          Login with facebook
        </Button>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginFB));
