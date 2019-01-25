import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class CategoryCollection extends Component {
  render = () => {
    const { items, selectedId } = this.props;
    const categories = items.map((category, index) =>
    (<a href='/' key={index} className={category.id === selectedId ? 'disabled' : ''}>{category.label} ({category.postCount})</a>)
    );
    return (
      <nav className='side-block category-collection'>
        <h2>{terms.categoryCollectionLabel}</h2>
        {categories}
      </nav>
    );
  }
}

CategoryCollection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })),
  selectedId: PropTypes.string
}

export default connect()(CategoryCollection);
