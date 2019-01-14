import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPanel from '../user-panel/user-panel.component';
import MainMenu from '../main-menu/main-menu.component';
import './header.scss';
import logo from '../../logo.svg';

class Header extends Component {
  render = () => {
    const { blogInfo, menuItems } = this.props;
    return (
      <header>
        <div>
          <h1>
            <img src={logo} alt='reblog19' />
            {blogInfo.name}
          </h1>
          <UserPanel isSignedIn={true} />
        </div>
        <MainMenu items={menuItems} />
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
  }))
}

export default connect()(Header);
