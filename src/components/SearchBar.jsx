import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSearch } from 'react-icons/fa'

class SearchBar extends Component {
  render = () => {
    const { placeholder } = this.props;
    return (
      <form className='search-bar'>
        <input type='text' placeholder={placeholder} />
        <a href='/'><FaSearch /></a>
      </form>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string
}

export default connect()(SearchBar);
