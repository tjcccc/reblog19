import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class CategoryCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: ''
    };
  }

  selectCategory = (id) => {
    this.setState({
      selectedId: id
    });
  }

  render = () => {
    const { categories } = this.props;
    const categoryList = categories === undefined ? null : categories.map((category, index) =>
      (<a href='#/' key={index} onClick={() => this.selectCategory(category._id)} className={category._id === this.state.selectedId ? 'disabled' : ''}>{category.label} ({category.count})</a>)
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
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  selectedId: PropTypes.string
}

export default connect()(CategoryCollection);
