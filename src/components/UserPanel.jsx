import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../redux/Login/actions';

class UserPanel extends Component {

  signUserOut = () => {
    this.props.onSignOut();
  };

  render = () => {
    const { isSignedIn, isAdmin } = this.props;

    const adminOptions = (
      <nav className='user-panel'>
        <a href='/' className='special'>+ NEW POST</a>
        <a href='/'>SETTING</a>
        <a href='/' onClick={this.signUserOut}>SIGN OUT</a>
      </nav>
    );
    const readerOptions = (
      <nav className='user-panel'>
        <a href='/'>SETTING</a>
        <a href='/' onClick={this.signUserOut}>SIGN OUT</a>
      </nav>
    );
    const unsignedInOptions = (
      <nav className='user-panel'>
        <a href='/'>SIGN IN</a>
      </nav>
    );

    return isSignedIn ? (isAdmin ? adminOptions : readerOptions) : unsignedInOptions;
  }
}

UserPanel.propTypes = {
  isSignedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  onSignOut: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isSignedIn: state.login.isSignedIn,
  isAdmin: state.login.isAdmin
});

const mapDisPatchToProps = (dispatch) => ({
  onSignOut: () => {
    dispatch(signOut());
  }
});

export default connect(mapStateToProps, mapDisPatchToProps)(UserPanel);
