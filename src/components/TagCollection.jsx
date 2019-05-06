import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import terms from '../config/terms';

class TagCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: ''
    };
  }

  selectTag = (id) => {
    this.setState({
      selectedId: id
    });
  }

  render = () => {
    const { tags } = this.props;
    const tagList = tags === undefined ? null : tags.sort((a, b) => (b.count - a.count)).map((tag, index) =>
      <a href='#/' key={index} onClick={() => this.selectTag(tag._id)} className={tag._id === this.state.selectedId ? 'disabled' : ''}>{tag.label} ({tag.count})</a>
    );
    return (
      <nav className='side-block tag-collection'>
        <h2>{terms.title.tagCollection}</h2>
        <div>{tagList}</div>
      </nav>
    );
  }
}

TagCollection.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number
  }))
}

export default connect()(TagCollection);
