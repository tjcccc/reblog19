import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go'
import Editor from './Editor';
import terms from '../config/terms';

class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undesiredCategory: '',
      newTag: '',
      undesiredTag: ''
    };
  }

  blogPost = {
    article: '',
    categories: ['Development', 'Study'],
    tags: ['React', 'Design', 'UI', 'TypeScript', 'ES2015'],
    publishState: 0
  }

  handleSubmit= (event) => {
    event.preventDefault();
  }

  handleTagChange = (event) => {
    this.setState({ newTag: event.target.value });
  }

  removeCategory = (event) => {
    const id = event.currentTarget.id;
    this.setState({ undesiredCategory: id });

    const index = this.blogPost.categories.indexOf(id);

    if (index === -1) {
      this.setState({ undesiredCategory: '' });
      return;
    }

    this.blogPost.categories.splice(index, 1);
    this.setState({ undesiredCategory: '' });
  }

  addTag = () => {
    if (this.state.newTag === '' || this.blogPost.tags.indexOf(this.state.newTag) !== -1) {
      this.setState({ newTag: '' });
      return;
    }
    this.blogPost.tags.push(this.state.newTag);
    this.setState({ newTag: '' });
  };

  removeTag = (event) => {
    const id = event.currentTarget.id;
    this.setState({ undesiredTag: id });

    const index = this.blogPost.tags.indexOf(id);

    if (index === -1) {
      this.setState({ undesiredTag: '' });
      return;
    }

    this.blogPost.tags.splice(index, 1);
    this.setState({ undesiredTag: '' });
  }

  handleTagInputReturnKey = (event) => {
    if (event.key === 'Enter') {
      this.addTag();
    }
  }

  render = () => {
    const { isNew, post } = this.props;

    const categoryList = this.blogPost.categories.map((category, index) =>(
      <li key={index}>
        <span>{category}</span>
        <button type='button' id={category} onClick={this.removeCategory}><GoX /></button>
      </li>
    ));

    const tagList = this.blogPost.tags.map((tag, index) => (
      <li key={index}>
        <span>{tag}</span>
        <button type='button' id={tag} onClick={this.removeTag}><GoX /></button>
      </li>
    ));

    return (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor post={isNew ? '' : post} formId='blog-post' />
        </article>
        <aside className='editor-options'>
          <div className='side-block'>
            <h2>Post State</h2>
            <select>
              <option>{terms.draftStateLabel}</option>
              <option>{terms.publishStateLabel}</option>
            </select>
          </div>
          <div className='side-block'>
            <h2>Categories</h2>
            <ul>
              {categoryList}
            </ul>
            <p>
              <button type='button'>{terms.setCategoriesLabel}</button>
            </p>
          </div>
          <div className='side-block'>
            <h2>Tags</h2>
            <ul>
              {tagList}
            </ul>
            <p>
              <input
                id='post-tags'
                type='text'
                placeholder={terms.setTagsLabel}
                value={this.state.newTag}
                onChange={this.handleTagChange}
                onKeyPress={this.handleTagInputReturnKey}
              />
              <button type='button' onClick={this.addTag}>{terms.addLabel}</button>
            </p>
          </div>
        </aside>
      </form>
    );
  }
}

EditorPage.propTypes = {
  isNew: PropTypes.bool,
  post: PropTypes.string,
  undesiredCategory: PropTypes.string,
  newTag: PropTypes.string,
  undesiredTag: PropTypes.string
}

export default connect()(EditorPage);
