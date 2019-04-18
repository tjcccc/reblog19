import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from './Editor';
import CategorySelector from './CategorySelector';
import TagPin from './TagPin';
import terms from '../config/terms';

class EditorPage extends Component {
  constructor(props) {
    super(props);
    const { isNew, post } = this.props;

    const newPost = {
      article: '',
      categories: [],
      tags: [],
      publishState: 0
    }

    this.state = {
      post: isNew ? newPost : post
    };
  }

  handleSubmit= (event) => {
    event.preventDefault();
  }

  render = () => {

    return (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor formId='blog-post' />
        </article>
        <aside className='editor-options'>
          <div className='side-block'>
            <h2>Post State</h2>
            <select>
              <option>{terms.label.draftState}</option>
              <option>{terms.label.publishState}</option>
            </select>
          </div>
          <CategorySelector />
          <TagPin />
        </aside>
      </form>
    );
  }
}

EditorPage.propTypes = {
  isNew: PropTypes.bool,
  post: PropTypes.shape({
    article: PropTypes.string,
    postState: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      order_id: PropTypes.number,
      label: PropTypes.string,
      count: PropTypes.number
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    publishState: PropTypes.number
  })
}

export default connect()(EditorPage);
