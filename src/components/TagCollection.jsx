import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class TagCollection extends Component {
  render = () => {
    const { items } = this.props;
    const tags = items.sort((a, b) => (b.postCount - a.postCount)).map((tag, index) =>
      <a href='/' key={index}>{tag.label} ({tag.postCount})</a>
    );
    return (
      <nav className='side-block tag-collection'>
        <h2>{terms.tagCollectionLabel}</h2>
        <div>{tags}</div>
      </nav>
    );
  }
}

TagCollection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number
  }))
}

export default connect()(TagCollection);