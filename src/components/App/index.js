import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import * as routes from '../../constants/routes';

import Header from '../Header';
import LoginFB from '../LoginFB';
import { ProfileData } from '../Profile';
import { ProfilePics } from '../Profile';
import { ProfileBeverages } from '../Profile';
import MapScreen from '../MapScreen';
import Dashboard from '../Dashboard';
import Meeting from '../MeetingScreen';
import MeetingPoint from '../MeetingPoint';
import MapDirections from '../MapDirections';
import MapDirectionsCheck from '../MapDirectionsCheck';
import DateTime from '../DateTime';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route
            exact path={routes.LANDING}
            component={LoginFB}
          />
          <Route exact path={routes.PROFILE_1} component={ProfileData} />
          <Route exact path={routes.PROFILE_2} component={ProfilePics} />
          <Route
            exact
            path={routes.PROFILE_3}
            component={ProfileBeverages}
          />
          <Route exact path={routes.MAP} component={MapScreen} />
          <Route exact path={routes.DASHBOARD} component={Dashboard} />
          <Route exact path={routes.MEETING} component={Meeting} />
          <Route
            exact
            path={routes.MEETINGPOINT}
            component={MeetingPoint}
          />
          <Route
            exact
            path={routes.MAPDIRECTION}
            component={MapDirections}
          />
          <Route exact path={routes.DATETIME} component={DateTime} />
          <Route exact path={routes.MAPDIRECTIONCHECK} component={MapDirectionsCheck} />
        </div>
      </Router>
    );
  }
}

export default App;
