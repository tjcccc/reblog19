import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { checkAuthorization } from '../services/authorization.service';
import logger from '../utilities/logger';
import { signOut, check } from '../redux/authorization/actions';
import links from '../config/links';


class UserPanel extends Component {

  signUserOut = () => {
    const { cookies } = this.props;
    cookies.remove('token');

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

  componentDidMount = async () => {
    const { cookies } = this.props;
    // Get token
    logger.trace(`token: ${cookies.get('token')}`);
    const token = cookies.get('token');
    const response = await checkAuthorization(token);
    const user = response.data.data.authorization;
    logger.info(user);
    this.props.onCheck({
      userId: user._id,
      userLevel: user.level,
      isLoginSuccessful: user.level > 0,
      loginTime: new Date().toISOString()
    });
  }
}

UserPanel.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
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

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UserPanel));
