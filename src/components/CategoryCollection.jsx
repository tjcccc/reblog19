import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class CategoryCollection extends Component {
  render = () => {
    const { categories, selectedId } = this.props;
    const categoryList = categories.map((category, index) =>
      (<a href='/' key={index} className={category.id === selectedId ? 'disabled' : ''}>{category.label} ({category.postCount})</a>)
    );
    return (
      <nav className='side-block category-collection'>
        <h2>{terms.title.categoryCollection}</h2>
        {categoryList}
      </nav>
    );
  }
}

CategoryCollection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })),
  selectedId: PropTypes.string
}

export default connect()(CategoryCollection);
