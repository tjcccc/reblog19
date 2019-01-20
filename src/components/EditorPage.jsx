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
      newTag: ''
    };
  }

  blogPost = {
    article: '',
    categories: [],
    tags: ['React', 'Design', 'UI', 'TypeScript', 'ES2015'],
    publishState: 0
  }

  handleTagChange = (event) => {
    this.setState({ newTag: event.target.value });
  }

  addTag = () => {
    if (this.blogPost.tags.indexOf(this.state.newTag) !== -1) {
      this.setState({ newTag: '' });
      return;
    }
    this.blogPost.tags.push(this.state.newTag);
    this.setState({ newTag: '' });
  };

  render = () => {
    const { isNew, post } = this.props;

    const tagList = this.blogPost.tags.map((tag, index) => (
      <li key={index}>
        <span>{tag}</span>
        <a href='/'><GoX /></a>
      </li>
    ));

    return (
      <form className='container responsive-container' id='blog-post'>
        <article>
          <Editor post={isNew ? '' : post} isWriting={true} formId='blog-post' />
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
              <li>
                <span>Development</span>
                <a href='/'><GoX /></a>
              </li>
              <li><span>Study</span><a href='/'><GoX /></a></li>
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
              <input id='post-tags' placeholder={terms.setTagsLabel} value={this.state.newTag} onChange={this.handleTagChange} />
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
  newTag: PropTypes.string
}

export default connect()(EditorPage);
