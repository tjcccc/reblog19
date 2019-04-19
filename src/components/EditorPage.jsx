import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from './Editor';
import StatusSelector from './StatusSelector';
import CategorySelector from './CategorySelector';
import TagPin from './TagPin';

class EditorPage extends Component {
  constructor(props) {
    super(props);
    const { isNew, post } = this.props;

    const newPost = {
      content: '',
      status: 0,
      categories: [],
      tags: []
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
          <StatusSelector />
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
    content: PropTypes.string,
    status: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      order_id: PropTypes.number,
      label: PropTypes.string,
      count: PropTypes.number
    })),
    tags: PropTypes.arrayOf(PropTypes.string)
  })
}

export default connect()(EditorPage);
