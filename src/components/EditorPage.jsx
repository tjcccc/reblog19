import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go'
import Editor from './Editor';
import terms from '../config/terms';

class EditorPage extends Component {
  render = () => {
    const { isNew, post } = this.props;
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
              <a href='/'>{terms.setCategoriesLabel}</a>
            </p>
          </div>
          <div className='side-block'>
            <h2>Tags</h2>
            <ul>
              <li>
                <span>React</span>
                <a href='/'><GoX /></a>
              </li>
              <li><span>Design</span><a href='/'><GoX /></a></li>
              <li><span>UI</span><a href='/'><GoX /></a></li>
              <li><span>TypeScript</span><a href='/'><GoX /></a></li>
            </ul>
            <p>
              <input placeholder={terms.setTagsLabel} />
              <a href='/'>{terms.addLabel}</a>
            </p>
          </div>
        </aside>
      </form>
    );
  }
}

EditorPage.propTypes = {
  isNew: PropTypes.bool,
  post: PropTypes.string
}

export default connect()(EditorPage);
