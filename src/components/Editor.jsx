import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateArticle } from '../redux/editing-post/actions';
import ReactMarkdown from 'react-markdown';
import '@github/markdown-toolbar-element';
import { FaHeading, FaBold, FaItalic, FaQuoteLeft, FaCode, FaLink, FaListUl, FaListOl, FaTasks, FaMarkdown } from 'react-icons/fa'
import terms from '../config/terms';
import logger from '../utilities/logger';

class Editor extends Component {
  constructor(props) {
    super(props);
    const { formId } = this.props;

    this.state = {
      isWriting: true,
      formId: formId
    }
  }

  switchWritingState = () => {
    this.setState({ isWriting: !this.state.isWriting });
  };

  updateArticle = (article) => {
    this.props.onUpdateArticle(article);
  };

  handleTextareaChange = (event) => {
    const textValue = event.target.value;
    this.updateArticle(textValue);
  }

  save = () => {
    const { article, categories, tags, postState } = this.props;
    const post = {
      article: article,
      categories: categories,
      tags: tags,
      postState: postState
    };
    logger.info(post);

    // TODO: POST to server.
  }

  render = () => {
    const { article } = this.props;

    const editorContent = (
      <div className='editor-body'>
        <textarea id='editor-body-content' placeholder='Write your blog post.' defaultValue={article} onChange={this.handleTextareaChange} />
        <div className='editor-actions'>
          <p><FaMarkdown size='2em' /><a rel='noopener noreferrer' href='https://guides.github.com/features/mastering-markdown/' target='_blank'>Styling with Markdown is supported</a></p>
          <div className='editor-actions-button-group'>
            <button className='commit' type='submit' htmlFor={this.state.formId} onClick={this.save}>{terms.label.save}</button>
          </div>
        </div>
      </div>
    );

    const previewContent = (
      <article className='editor-preview markdown-body post'>
        <ReactMarkdown source={article} />
      </article>
    );

    const editorBody = this.state.isWriting ? editorContent : previewContent;

    return (
      <div className='editor'>
        <div className='editor-head'>
          <nav className='editor-nav'>
            <button type='button' disabled={this.state.isWriting} onClick={this.switchWritingState}>{terms.label.write}</button>
            <button type='button' disabled={!this.state.isWriting} onClick={this.switchWritingState}>{terms.label.preview}</button>
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
  isWriting: PropTypes.bool,
  formId: PropTypes.string,
  article: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    order_id: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number
  })),
  tags: PropTypes.arrayOf(PropTypes.string),
  postState: PropTypes.number,
  onUpdateArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  article: state.editingPost.article,
  postState: state.editingPost.postState,
  categories: state.editingPost.categories,
  tags: state.editingPost.tags
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateArticle: (article) => {
    dispatch(updateArticle(article));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
