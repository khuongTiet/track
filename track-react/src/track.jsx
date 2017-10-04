import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Segment, Header, Menu, Grid, Image, Card, Embed } from 'semantic-ui-react';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem : '',
    }
    this.renderTrack = this.renderTrack.bind(this);
    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.durationCalculation = this.durationCalculation.bind(this);
  }

  durationCalculation(duration) {
    var formattedDuration = '';
    const seconds = duration / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    if (hours > 1) {
      formattedDuration += `${hours} h`;
    }
    return formattedDuration += `${minutes}m ${seconds}s`;
  }

  handleTrackClick = (e, { name, track }) => {
    this.setState({
      activeItem: name,
      currentTrack: track,
    });
  }

  renderTrack(track) {
    const currentTrack = track.track;
    return (
      <Menu.Item name={currentTrack.name} track={currentTrack} active={this.state.activeItem === currentTrack.name} onClick={this.handleTrackClick} />
    )
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Header as="h3">
            Tracks
            <Menu fluid vertical secondary color='violet'>
              {this.props.tracks.map(this.renderTrack)}
            </Menu>
          </Header>
        </Grid.Column>

        <Grid.Column floated="right" stretched width={8} style={{display: this.state.activeItem === '' ? 'none' : 'block'}}>
          <Segment color='violet' floated='left' style={{display: this.state.activeItem === '' ? 'none' : 'block'}}>
            {
              this.state.activeItem !== '' &&
              <Card>
                <Image src={this.state.currentTrack.album.images[1].url} />
                <Card.Content>
                  <Card.Header>
                    {this.state.currentTrack.album.name}
                  </Card.Header>
                  <Card.Meta>
                    <a href={this.state.currentTrack.album.external_urls.spotify}>Open in spotify</a>
                  </Card.Meta>
                  <Card.Description>
                    {this.state.currentTrack.album.artists[0].name}
                  </Card.Description>
                </Card.Content>
              </Card>
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

class TrackContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistTracks : this.props.tracks,
      activeItem: '',
    }
  }

  render() {
    return (
      <Track tracks={this.props.tracks} />
    )
  }
}


export default TrackContainer;
