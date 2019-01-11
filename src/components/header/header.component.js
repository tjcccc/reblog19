import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainMenu from '../main-menu/main-menu.component';
import './header.scss';

class Header extends Component {
  render = () => {
    const { blogInfo, menuItems } = this.props;
    return (
      <div className="header">
        <h1>{blogInfo.name}</h1>
        <MainMenu items={menuItems} />
      </div>
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
