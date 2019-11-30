import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { checkAuthorization } from '../services/authorization.service';
// import logger from '../utilities/logger';
import { signOut, check } from '../redux/authorization/actions';
import { hostBasename } from '../server-config';
import links from '../config/links';

class UserPanel extends Component {

  signUserOut = () => {
    const { cookies } = this.props;
    cookies.remove('token');
    this.props.onSignOut();
  };

  componentDidMount = async () => {
    const { cookies } = this.props;
    // Get token
    // logger.trace(`token: ${cookies.get('token')}`);
    const token = cookies.get('token');
    const response = await checkAuthorization(token);
    const user = response.data.data.authorization;
    // logger.info(user);
    this.props.onCheck({
      userId: user._id,
      userLevel: user.level,
      isLoginSuccessful: user.level > 0,
      loginTime: new Date().toISOString()
    });
    this.setState({
      isChecked: true
    })
  }

  render = () => {
    const { isAccountChecked, isSignedIn, isAdmin } = this.props;

    const adminOptions = (
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <nav className='user-panel'>
          <Link to={links.createPost} className='special'>+ NEW POST</Link>
          <Link to={links.setting}>SETTING</Link>
          <Link to='/' onClick={this.signUserOut}>SIGN OUT</Link>
        </nav>
      </BrowserRouter>
    );
    const readerOptions = (
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <nav className='user-panel'>
          <Link to={links.setting}>SETTING</Link>
          <Link to='/' onClick={this.signUserOut}>SIGN OUT</Link>
        </nav>
      </BrowserRouter>
    );
    const unsignedInOptions = (
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <nav className='user-panel'>
          <Link to={links.login}>SIGN IN</Link>
        </nav>
      </BrowserRouter>
    );

    // logger.info(`Is Login status checked: ${isAccountChecked}`);

    return isAccountChecked ? (isSignedIn ? (isAdmin ? adminOptions : readerOptions) : unsignedInOptions) : null;
  }
}

UserPanel.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  isAccountChecked: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  onSignOut: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAccountChecked: state.authorization.isAccountChecked,
  isSignedIn: state.authorization.isSignedIn,
  isAdmin: state.authorization.isAdmin
});

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => {
    dispatch(signOut());
  },
  onCheck: (result) => {
    // logger.trace(result);
    dispatch(check(result));
  }
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UserPanel));
