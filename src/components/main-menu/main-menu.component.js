import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './main-menu.scss';

class MainMenu extends Component {
  render = () => {
    const { items } = this.props;
    const menuItems = items.map((menuItem, index) =>
      <a href='/' key={index}>{menuItem.label}</a>
    );
    return (
      <nav className="main-menu">
        {menuItems}
      </nav>
    );
  }
}

MainMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string
  }))
}

export default connect()(MainMenu);
