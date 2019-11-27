import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import levels from '../config/levels';

class MainMenu extends Component {
  render = () => {
    const { isAdmin, items } = this.props;
    const adminLevel = levels.adminLevel;
    const menuItems = items.map((menuItem, index) => {
      if (menuItem.authLevel !== adminLevel) {
        return <a href={menuItem.link} key={index}>{menuItem.label}</a>;
      } else {
        return isAdmin ? <a href={menuItem.link} key={index}>{menuItem.label}</a> : '';
      }
    });
    return (
      <div className='main-menu responsive-container'>
        <nav>{menuItems}</nav>
        <SearchBar placeholder='Don&#39;t use it...' />
      </div>
    );
  }
}

MainMenu.displayName = 'MainMenu';

MainMenu.propTypes = {
  isAdmin: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string
  }))
}

const mapStateToProps = state => ({
  isAdmin: state.authorization.isAdmin,
  allCategories: state.category.categories
});

export default connect(mapStateToProps, null)(MainMenu);
