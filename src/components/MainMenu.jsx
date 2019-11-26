import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';

class MainMenu extends Component {
  render = () => {
    const { items } = this.props;
    const menuItems = items.map((menuItem, index) =>
      <a href={menuItem.link} key={index}>{menuItem.label}</a>
    );
    return (
      <div className='main-menu responsive-container'>
        <nav>{menuItems}</nav>
        <SearchBar placeholder='Don&#39;t use it...' />
      </div>
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
