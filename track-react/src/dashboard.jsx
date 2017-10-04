import React, { Component } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react'

import PlaylistContainer from './playlist';

const styles = {
  segmentStyling : {color : 'blue'}
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerVisible: false,
    }
  }

  render() {
    return (
      <div>
        <br/>
        <PlaylistContainer />
      </div>

    )
  }
}

export default Dashboard;
