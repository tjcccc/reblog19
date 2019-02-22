import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPanel from './UserPanel';
import MainMenu from './MainMenu';
import logo from '../logo.svg';
import { signIn, signInAsReader } from '../redux/Login/actions';

class Header extends Component {

  testSignIn = () => {
    this.props.onSignIn();
  };

  testSignInAsReader = () => {
    this.props.onSignInAsReader();
  };

  render = () => {
    const { blogInfo, menuItems } = this.props;
    return (
      <header>
        <div>
          <h1>
            <img src={logo} alt='reblog19' />
            {blogInfo.name}
          </h1>
          <UserPanel />
        </div>
        <MainMenu items={menuItems} />
        <button onClick={this.testSignIn}>Test Sign In</button>
        <button onClick={this.testSignInAsReader}>Test Sign In As Reader</button>
      </header>
    );
  };
}

Header.propTypes = {
  blogInfo: PropTypes.shape({
    name: PropTypes.string
  }),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string
  })),
  onSignIn: PropTypes.func.isRequired,
  onSignInAsReader: PropTypes.func.isRequired
}

const mapDisPatchToProps = (dispatch) => ({
  onSignIn: () => {
    dispatch(signIn());
  },
  onSignInAsReader: () => {
    dispatch(signInAsReader());
  }
});

export default connect(null, mapDisPatchToProps)(Header);
