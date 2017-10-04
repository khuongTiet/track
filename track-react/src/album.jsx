import React, { Component } from 'react';
import import logo from './logo.svg';
import './App.css';
import { Segment, Header, Menu, Grid, Image } from 'semantic-ui-react';

class Album extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return <Segment />
  }
}

class AlbumContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlbum: {},
    }
    this.getAlbumData = this.getAlbumData.bind(this);
  }

  getAlbumData(id) {
    fetch(`/api/albums/${id}`)
      .then( res => res.json() )
      .then( album => this.setState({currentAlbum : album}));
  }

  render() {
    return <Album />
  }
}


export default AlbumContainer;
