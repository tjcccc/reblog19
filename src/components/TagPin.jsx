import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go'
import terms from '../config/terms';

class TagPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagLabel: ''
    }
  }

  updatePostTags = (tags) => {
    const { handleUpdating } = this.props;

    if (!handleUpdating) {
      return;
    }

    this.setState({
      editingTags: tags
    });

    handleUpdating(tags);
  }

  addTag = () => {
    const { tags } = this.props;
    const { newTagLabel } = this.state;

    const trimmedNewTagLabel = newTagLabel.trim();

    if (!newTagLabel || !trimmedNewTagLabel || tags.some(tag => tag.label === trimmedNewTagLabel)) {
      return;
    }

    const newTag = {
      label: trimmedNewTagLabel
    }

    this.updatePostTags(tags.concat(newTag));
    this.setState({
      newTagLabel: ''
    });
  };

  removeTag = (event) => {
    const { tags } = this.props;
    const targetTagLabel = event.currentTarget.id;

    if (!tags.some(tag => tag.label === targetTagLabel)) {
      return;
    }

    this.updatePostTags(tags.filter(tag => tag.label !== targetTagLabel));
  }

  handleTagInputChange = (event) => {
    this.setState({ newTagLabel: event.target.value });
  }

  handleTagInputReturnKey = (event) => {
    if (event.key === 'Enter') {
      this.addTag();
      event.preventDefault();
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
            value={this.state.newTagLabel || ''}
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
