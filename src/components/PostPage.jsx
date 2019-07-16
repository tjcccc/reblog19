import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPostById } from '../services/post.service';

class PostPage extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props;
    this.state = { post: post };
  }
  displayName = 'PostPage';

  getPostById = async (id) => {
    const fetchedPost = await fetchPostById(id)
    return fetchedPost.data.data.post;
  };

  componentDidMount = async () => {
    const { id } = this.props.routeData.match.params;
    const remotePost = await this.getPostById(id);
    this.setState({ post: remotePost });
  };

  render = () => {
    const { post } = this.state;
    return (
      <div className='container'>
        <article className='post-single'>
          {(post === undefined || post === null) ? <h4>No content.</h4> : <Post data={post} key={0} />}
        </article>
        <aside>
          header list
        </aside>
      </div>
    );
  };
}

PostPage.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    createTime: PropTypes.string,
    postTime: PropTypes.string,
    updateTime: PropTypes.string,
    content: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  routeData: any
}

PostPage.displayName = 'PostPage';

export default connect()(PostPage);
