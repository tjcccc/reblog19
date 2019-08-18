import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { loadPost } from '../redux/editing-post/actions';
import Editor from './Editor';
import StatusSelector from './StatusSelector';
import CategorySelector from './CategorySelector';
import TagPin from './TagPin';
import { fetchPostById } from '../services/post.service';

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
      post: newPost,
      content: ''
    };
  }

  getPostById = async (id) => {
    const fetchedPost = await fetchPostById(id)
    return fetchedPost.data.data.post;
  };

  loadPost = (post) => {
    this.setState({
      isNew: true,
      post: post
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
    console.log(remotePost);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextState.post.content !== this.state.post.content;
  };

  render = () => {
    const { post } = this.state;

    return (
      <form className='container responsive-container' id='blog-post' onSubmit={this.handleSubmit}>
        <article>
          <Editor content={post.content} formId='blog-post' />
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
