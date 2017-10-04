import React, { Component } from 'react';
import { Grid, Header, Form, Segment, Message, Button } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorizeURL: ''
    }
  }

  componentDidMount = (e) => {
    fetch('/login')
      .then(res => res.json())
      .then(authorizeURL => this.setState({ authorizeURL }));
  }

  authorize = (e) => {
    fetch(this.state.authorizeURL, { mode: 'cors' })
      .then(res => res.json())
      .then(data => console.log(data));
  }


  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%', background: '#a333c8' }}
        verticalAlign='middle'
      >
          <Grid.Column verticalAlign='middle' style={{ maxWidth: 450 }}>
            <Header size='huge' textAlign='center' style={{color: 'white'}}>
              Welcome to Track!
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Email Address'
                  type='email'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Button color='purple' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              <a href={this.state.authorizeURL}>
                <Button
                  inverted
                  color='green'
                  content='Login with Spotify'
                  icon='spotify'
                />
              </a>
            </Message>
          </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
