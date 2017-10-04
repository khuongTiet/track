import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react'

import Dashboard from './dashboard';
import Navigation from './navigation';
import Login from './login';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPlaylists: [],
    }
  }

  render() {
    return (
      <div className="User" style={{background: 'white'}}>
        <Navigation id={this.state.userInfo.id}/>
        <div>{this.state.userInfo}</div>
        <Dashboard />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/user" component={User}/>
        </div>
      </Router>
    );
  }
}

export default App;
