import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import '@github/markdown-toolbar-element';
import { FaHeading, FaBold, FaItalic, FaQuoteLeft, FaCode, FaLink, FaListUl, FaListOl, FaTasks, FaMarkdown } from 'react-icons/fa'
import terms from '../config/terms';

class Editor extends Component {
  render = () => {
    const { post, isWriting, formId } = this.props;
    const wroteContent = '# test\n\ntest preview';
    const editorContent = (
      <div className='editor-body'>
        <textarea id='editor-body-content' placeholder='Write your blog post.'>
          {post}
        </textarea>
        <div className='editor-actions'>
          <p><FaMarkdown size='2em' /><a rel='noopener noreferrer' href='https://guides.github.com/features/mastering-markdown/' target='_blank'>Styling with Markdown is supported</a></p>
          <div className='editor-actions-button-group'>
            <button className='commit' type='submit' htmlFor={formId}>{terms.saveLabel}</button>
          </div>
        </div>
      </div>
    );
    const previewContent = (
      <article className='editor-preview markdown-body post'>
        <ReactMarkdown source={wroteContent} />
      </article>
    );
    const editorBody = isWriting ? editorContent : previewContent;
    return (
      <div className='editor'>
        <div className='editor-head'>
          <nav className='editor-nav'>
            <button disabled>{terms.writeLabel}</button>
            <button>{terms.previewLabel}</button>
          </nav>
          <markdown-toolbar class='editor-toolbar' for='editor-body-content'>
            <div className='icon-button-group'>
              <md-header aria-label='Add header (H3) text' role='button'><FaHeading /></md-header>
              <md-bold aria-label='Add bold text' role='button'><FaBold /></md-bold>
              <md-italic aria-label='Add italic text' role='button'><FaItalic /></md-italic>
            </div>
            <div className='icon-button-group'>
              <md-quote aria-label='Insert a quote' role='button'><FaQuoteLeft /></md-quote>
              <md-code aria-label='Insert code' role='button'><FaCode /></md-code>
              <md-link aria-label='Add a link' role='button'><FaLink /></md-link>
            </div>
            <div className='icon-button-group'>
              <md-unordered-list aria-label='Add a bulleted list' role='button'><FaListUl /></md-unordered-list>
              <md-ordered-list aria-label='Add a numbered list' role='button'><FaListOl /></md-ordered-list>
              <md-task-list aria-label='Add a task list' role='button'><FaTasks /></md-task-list>
            </div>
          </markdown-toolbar>
        </div>
        {editorBody}
      </div>
    );
  }
}

Editor.propTypes = {
  post: PropTypes.string,
  isWriting: PropTypes.bool,
  formId: PropTypes.string
}

export default connect()(Editor);
