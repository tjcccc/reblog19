import React, { Component } from 'react';
import links from '../config/links';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut, check } from '../redux/authorization/actions';
import logger from '../utilities/logger';

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

  componentDidMount() {
    // Get token
    // Send to server
    // Get response
    // this.props.onCheck({
    //   userId: 'AAA',
    //   userLevel: 99,
    //   isLoginSuccessful: true,
    //   loginTime: null
    // });
  }
}

UserPanel.propTypes = {
  isSignedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  onSignOut: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isSignedIn: state.authorization.isSignedIn,
  isAdmin: state.authorization.isAdmin
});

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => {
    dispatch(signOut());
  },
  onCheck: (result) => {
    logger.trace(result);
    dispatch(check(result));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
