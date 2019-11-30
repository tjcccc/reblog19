import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import levels from '../config/levels';
import { hostBasename } from '../server-config';

class MainMenu extends Component {
  render = () => {
    const { isAdmin, items } = this.props;
    const adminLevel = levels.adminLevel;
    const menuItems = items.map((menuItem, index) => {
      if (menuItem.authLevel !== adminLevel) {
        return <Link to={menuItem.link} key={index}>{menuItem.label}</Link>;
      } else {
        return isAdmin ? <Link to={menuItem.link} key={index}>{menuItem.label}</Link> : '';
      }
    });
    return (
      <BrowserRouter basename={hostBasename} forceRefresh={true}>
        <div className='main-menu responsive-container'>
          <nav>{menuItems}</nav>
          <SearchBar placeholder='Don&#39;t use it...' />
        </div>
      </BrowserRouter>
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
