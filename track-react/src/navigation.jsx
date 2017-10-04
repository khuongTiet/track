import React, { Component } from 'react';
import { Segment, Menu } from 'semantic-ui-react';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      user: this.props.id
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    return (
      <Segment inverted>
        <Menu inverted fixed='top' size='massive'>
          <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='music' active={this.state.activeItem === 'music'} onClick={this.handleItemClick} />
          <Menu.Item name='options' active={this.state.activeItem === 'options'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item name={this.state.user} />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}

export default Navigation;
