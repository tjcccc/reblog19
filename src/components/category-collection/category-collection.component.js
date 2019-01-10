import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './category.scss';

class CategoryCollection extends Component {
  render = () => {
    const { items } = this.props;
    const categories = items.map((category, index) =>
      <li key={index}>{category.label}</li>
    );
    return (<ul className="category-collection">{categories}</ul>);
  }
}

CategoryCollection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
}

export default connect()(CategoryCollection);
