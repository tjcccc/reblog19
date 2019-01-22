import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UserPanel extends Component {
  render = () => {
    const { isSignedIn } = this.props;

    const signedInOptions = (
      <nav className='user-panel'>
        <a href='/' className='special'>+ NEW POST</a>
        <a href='/'>SETTING</a>
        <a href='/'>SIGN OUT</a>
      </nav>
    );
    const unsignedInOptions = (
      <nav className='user-panel'>
        <a href='/'>SIGN IN</a>
      </nav>
    );

    return isSignedIn ? signedInOptions : unsignedInOptions;
  }
}

UserPanel.propTypes = {
  isSignedIn: PropTypes.bool
}

export default connect()(UserPanel);
