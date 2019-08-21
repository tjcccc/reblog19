import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { loadPost } from '../redux/editing-post/actions';
import { fetchPostById, createPost } from '../services/post.service';
import Editor from './Editor';
import StatusSelector from './StatusSelector';
import CategorySelector from './CategorySelector';
import TagPin from './TagPin';
import logger from '../utilities/logger';

class EditorPage extends Component {
  constructor(props) {
    super(props);

    const newPost = {
      content: '',
      status: 0,
      categories: [],
      tags: []
    }

    this.state = {
      isNew: false,
      editingPost: newPost,
      content: '',
      status: 0
    };
  }

  getPostById = async (id) => {
    const fetchedPost = await fetchPostById(id)
    return fetchedPost.data.data.post;
  };

  loadPost = (post) => {
    this.setState({
      isNew: true,
      editingPost: post,
      status: post.status
    });
    this.props.onLoadPost(post);
  };

  handleSubmit= (event) => {
    event.preventDefault();
  }

  componentDidMount = async () => {
    const { id } = this.props.routeData.match.params;

    if (!id) {
      return;
    }

    const remotePost = await this.getPostById(id);
    this.loadPost(remotePost);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextState.editingPost.content !== this.state.editingPost.content;
  };

  extractTitle = (content) => {
    let title = 'New Post';
    if (content.charAt(0) === '#') {
      const titleEndIndex = content.indexOf('\n');
      title = content.slice(2, titleEndIndex);
    } else if (content.length > 20) {
      title = content.slice(0, 20) + '...';
    } else {
      title = content;
    }
    return title;
  }

  updateStatus = (status) => {
    const { editingPost } = this.state;
    this.setState({
      editingPost: {
        ...editingPost,
        status: status
      }
    })
  };

  updateCategories = () => {};

  updateTags = () => {};

  save = async () => {
    const { editingPost } = this.state;
    const post = {
      ...editingPost,
      title: this.extractTitle(editingPost.content)
    }
    logger.info(post);
    return;

    // TODO: POST to server.

    const postChecking = await fetchPostById(post._id);

    if (postChecking.data.post === undefined) {
      // New post
      const newPost = await createPost(post);
      logger.info(newPost);
    } else {
      // TODO: Update old post.
    }
  }

  render = () => {
    const { editingPost, status } = this.state;
    console.log(`post status: ${status}`);

    return (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor content={editingPost.content} formId='blog-post' handleSaving={this.save} />
        </article>
        <aside className='editor-options'>
          <StatusSelector status={status} handleUpdating={this.updateStatus} />
          <CategorySelector categories={editingPost.categories} handleUpdating={this.updateCategories} />
          <TagPin tags={editingPost.tags} handleUpdating={this.updateTags} />
        </aside>
      </form>
    );
  }
}

EditorPage.propTypes = {
  isNew: PropTypes.bool,
  post: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      order_id: PropTypes.number,
      label: PropTypes.string,
      count: PropTypes.number
    })),
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  editingPost: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      order_id: PropTypes.number,
      label: PropTypes.string,
      count: PropTypes.number
    })),
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  status: PropTypes.number,
  routeData: any,
  onLoadPost: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onLoadPost: (post) => {
    dispatch(loadPost(post));
  }
});

EditorPage.displayName = 'EditorPage';

export default connect(null, mapDispatchToProps)(EditorPage);
