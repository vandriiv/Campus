import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../nav-menu/';

export default class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu user = {this.props.user} userService = {this.props.userService}/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
