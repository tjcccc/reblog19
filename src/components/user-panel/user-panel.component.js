import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user-panel.scss';

class UserPanel extends Component {
  render = () => {
    const { isSignedIn } = this.props;

    const signedInOptions = (
      <nav className="user-panel">
        <a href='/' className='special'>+ NEW POST</a>
        <a href='/'>CONFIG</a>
        <a href='/'>SIGN OUT</a>
      </nav>
    );
    const unsignedInOptions = (
      <nav className="user-panel">
        <a href='/'>SIGN IN</a>
      </nav>
    );

    return isSignedIn ? signedInOptions : unsignedInOptions;
  }
}

export default connect()(UserPanel);
