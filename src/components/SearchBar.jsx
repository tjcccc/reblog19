import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends Component {
  render = () => {
    const { placeholder } = this.props;
    return (
      <form className='search-bar'>
        <input type='text' placeholder={placeholder} />
        <a href='/'><FontAwesomeIcon icon={faSearch} fixedWidth /></a>
      </form>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string
}

export default connect()(SearchBar);
