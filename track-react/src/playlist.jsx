import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Segment, Header, Menu, Grid, Embed } from 'semantic-ui-react';

import TrackContainer from './track';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      currentPlaylistID: '',
    };
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
    this.renderTracks = this.renderTracks.bind(this);
  }

  handlePlaylistClick = (e, { name, id }) => {
    this.setState({
      activeItem: name,
      currentPlaylistID: id
    });
    this.props.getTracks(id);
  }

  renderTracks(id) {
    return(
      <TrackContainer playlistID={id} />
    )
  }

  renderPlaylist(playlist) {
    return(
      <Menu.Item name={playlist.name} id={playlist.id} active={this.state.activeItem === playlist.name} onClick={this.handlePlaylistClick} />
    );
  }

  render() {
    return(
      <Grid>
        <Grid.Column width={3}>
          <Header as="h3">
            Playlists
            <Menu fluid vertical secondary color='violet'>
              {this.props.playlists.map(this.renderPlaylist)}
            </Menu>
          </Header>
        </Grid.Column>

        <Grid.Column floated="right" stretched width={13} style={{display: this.state.activeItem === '' ? 'none' : 'block'}}>
          <Segment color='violet' style={{display: this.state.activeItem === '' ? 'none' : 'block'}}>
            {this.state.activeItem !== '' && <TrackContainer playlistID={this.state.currentPlaylistID} tracks={this.props.tracks}/>}
              <Grid.Column floated="left" stretched width={4}>
                <Embed
                  defaultActive='true'
                  aspectRatio='4:3'
                  iframe={
                    {
                      src: `https://open.spotify.com/embed?uri=spotify:user:khuongtiet:playlist:${this.state.currentPlaylistID}`,
                      width: '300',
                      height: '380',
                    }}
                />
              </Grid.Column>
          </Segment>

        </Grid.Column>
      </Grid>
    );
  }
}

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPlaylists: [],
      displayTracks: [],
    }
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
  }

  componentDidMount() {
    fetch('/api/playlists')
      .then( res => res.json() )
      .then( playlists => this.setState({ userPlaylists: playlists.items })
    );
  }

  getPlaylistTracks(id) {
    fetch(`/api/playlists/${id}`)
      .then( res=> res.json() )
      .then( tracks => this.setState({ displayTracks: tracks.items }))
  }

  render() {
    return(
      <Playlist playlists={this.state.userPlaylists} tracks={this.state.displayTracks} getTracks={this.getPlaylistTracks} />
    );
  }
}


export default PlaylistContainer;
