import React, { Component } from 'react';
import links from '../config/links';
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
        <a href={links.editor} className='special'>+ NEW POST</a>
        <a href={links.setting}>SETTING</a>
        <a href='/' onClick={this.signUserOut}>SIGN OUT</a>
      </nav>
    );
    const readerOptions = (
      <nav className='user-panel'>
        <a href={links.setting}>SETTING</a>
        <a href='/' onClick={this.signUserOut}>SIGN OUT</a>
      </nav>
    );
    const unsignedInOptions = (
      <nav className='user-panel'>
        <a href={links.login}>SIGN IN</a>
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

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => {
    dispatch(signOut());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
