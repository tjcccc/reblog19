import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTags } from '../redux/editing-post/actions';
import { GoX } from 'react-icons/go'
import terms from '../config/terms';

class TagPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTag: ''
    }
  }

  addTag = () => {
    const { tags, onUpdateTags } = this.props;
    const { newTag } = this.state;

    if (newTag === '' || tags.indexOf(newTag) !== -1) {
      this.setState({ newTag: '' });
      return;
    }

    onUpdateTags(tags.concat(newTag));
    this.setState({ newTag: '' });
  };

  removeTag = (event) => {
    const { tags, onUpdateTags } = this.props;
    const targetTag = event.currentTarget.id;

    if (tags.indexOf(targetTag) === -1) {
      return;
    }

    onUpdateTags(tags.filter(tag => tag !== targetTag));
  }

  handleTagChange = (event) => {
    this.setState({ newTag: event.target.value });
  }

  handleTagInputReturnKey = (event) => {
    if (event.key === 'Enter') {
      this.addTag();
    }
  }

  render = () => {

    const { tags } = this.props;

    const tagList = tags !== undefined ? tags.map((tag, index) => (
      <li key={index}>
        <span>{tag}</span>
        <button type='button' id={tag} onClick={this.removeTag}><GoX /></button>
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
            value={this.state.newTag}
            onChange={this.handleTagChange}
            onKeyPress={this.handleTagInputReturnKey}
          />
          <button type='button' onClick={this.addTag}>{terms.label.add}</button>
        </p>
      </div>
    );
  }

}

TagPin.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onUpdateTags: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tags: state.editingPost.tags
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateTags: (tags) => {
    dispatch(updateTags(tags));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPin);
