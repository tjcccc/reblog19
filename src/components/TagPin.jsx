import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go'
import terms from '../config/terms';

class TagPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTag: {
        label: ''
      }
    }
  }

  updatePostTags = (tags) => {
    const { handleUpdating } = this.props;

    if (!handleUpdating) {
      return;
    }

    this.setState({
      editingTags: tags
    })

    handleUpdating(tags);
  }

  addTag = () => {
    const { tags } = this.props;
    const { newTag } = this.state;
    const trimedNewTag = {
      ...newTag,
      label: newTag.label.trim()
    };

    this.setState({
      newTag: {
        label: ''
      }
    });

    if (!newTag || tags.some(tag => tag.label === trimedNewTag.label)) {
      return;
    }

    this.updatePostTags(tags.concat(newTag));
  };

  removeTag = (event) => {
    const { tags } = this.props;
    const targetTag = event.currentTarget.id;

    if (!tags.some(tag => tag.label === targetTag)) {
      return;
    }

    this.updatePostTags(tags.filter(tag => tag.label !== targetTag));
  }

  handleTagInputChange = (event) => {
    this.setState({
      newTag:{
        label: event.target.value
      }
    });
  }

  handleTagInputReturnKey = (event) => {
    if (event.key === 'Enter') {
      this.addTag();
    }
  }

  render = () => {
    const { tags } = this.props;
    const { editingTags } = this.state;

    const pinnedTags = editingTags ? editingTags : tags;

    const tagList = Array.isArray(pinnedTags) && pinnedTags.length > 0 ? pinnedTags.map((tag, index) => (
      <li key={index}>
        <span>{tag.label}</span>
        <button type='button' id={tag.label} onClick={this.removeTag}><GoX /></button>
      </li>
    )) : null;

    return (
      <div className='side-block'>
        <h2>Tags</h2>
        <ul className='aside-selected-list'>
          {tagList}
        </ul>
        <p>
          <input
            id='post-tags'
            type='text'
            placeholder={terms.label.setTags}
            value={this.state.newTag.label || ''}
            onChange={this.handleTagInputChange}
            onKeyPress={this.handleTagInputReturnKey}
          />
          <button type='button' onClick={this.addTag}>{terms.label.add}</button>
        </p>
      </div>
    );
  }
}

TagPin.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  handleUpdating: PropTypes.func.isRequired
}

export default connect()(TagPin);
