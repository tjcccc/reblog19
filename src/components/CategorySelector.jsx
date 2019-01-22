import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
// import terms from '../config/terms';

class CategorySelector extends Component {
  render = () => {
    const { items } = this.props;
    const categories = items.map((category, index) =>
      <li className='selected' key={index}>
        {/* <FaCheck className='selected-mark' /> */}
        {category.label}
      </li>
    );
    return (
      <div className='category-selector'>
        <h3>Apply categories to this post</h3>
        <div className='filter-bar'>
          <input type='text' placeholder='Filter categories...' />
          <button type='button'>Create new category '???'</button>
        </div>
        <ul className='aside-optional-list'>
          <li className='selected'>
            <FaCheck className='selected-mark' />
            Test Category
          </li>
          {categories}

        </ul>
      </div>
    );
  }
}

CategorySelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
}

export default connect()(CategorySelector);
